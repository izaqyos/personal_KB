# Database Patterns - Interview Knowledge Base

## Transaction Management

### ACID Properties
- **Atomicity**: All or nothing
- **Consistency**: Valid state to valid state
- **Isolation**: Concurrent transactions don't interfere
- **Durability**: Committed data persists

### Transaction Isolation Levels
| Level | Dirty Read | Non-Repeatable Read | Phantom Read |
|-------|------------|---------------------|--------------|
| READ UNCOMMITTED | ✓ | ✓ | ✓ |
| READ COMMITTED | ✗ | ✓ | ✓ |
| REPEATABLE READ | ✗ | ✗ | ✓ |
| SERIALIZABLE | ✗ | ✗ | ✗ |

### Prisma Transactions
```typescript
// Interactive transaction
const result = await prisma.$transaction(async (tx) => {
  const user = await tx.user.update({
    where: { id: userId },
    data: { balance: { decrement: amount } },
  });

  if (user.balance < 0) {
    throw new Error('Insufficient funds');  // Rolls back
  }

  return tx.booking.create({ data: { userId, amount } });
});

// Sequential transaction (batch)
const [user, booking] = await prisma.$transaction([
  prisma.user.update({ ... }),
  prisma.booking.create({ ... }),
]);
```

### Best Practices
1. **Keep transactions short** - Reduces lock contention
2. **Avoid external calls** - Don't call APIs inside transactions
3. **Handle deadlocks** - Retry with backoff
4. **Use appropriate isolation** - READ COMMITTED is usually sufficient

---

## Indexing Strategies

### Types of Indexes
```sql
-- B-tree (default, most common)
CREATE INDEX idx_users_email ON users(email);

-- Hash (equality only, faster for exact match)
CREATE INDEX idx_users_id ON users USING HASH(id);

-- GIN (arrays, full-text search)
CREATE INDEX idx_posts_tags ON posts USING GIN(tags);

-- GiST (geometric, full-text)
CREATE INDEX idx_locations ON places USING GIST(location);
```

### Composite Indexes
```sql
-- Order matters! Left-to-right
CREATE INDEX idx_bookings_room_date ON bookings(room_id, date);

-- Efficient for:
-- WHERE room_id = ?
-- WHERE room_id = ? AND date = ?

-- NOT efficient for:
-- WHERE date = ?  (can't use index)
```

### Partial Indexes
```sql
-- Only index active records
CREATE INDEX idx_active_users ON users(email) WHERE status = 'ACTIVE';

-- Unique constraint with condition
CREATE UNIQUE INDEX idx_unique_active_booking
ON bookings(room_id, date)
WHERE status IN ('HELD', 'CONFIRMED');
```

### Covering Indexes
```sql
-- Include non-indexed columns to avoid table lookup
CREATE INDEX idx_users_covering ON users(email)
INCLUDE (name, created_at);

-- Query satisfied entirely from index:
SELECT name, created_at FROM users WHERE email = 'x@y.com';
```

---

## Unique Constraints

### Simple Unique
```sql
CREATE UNIQUE INDEX idx_users_email ON users(email);

-- Or in table definition
ALTER TABLE users ADD CONSTRAINT uq_email UNIQUE (email);
```

### Composite Unique
```sql
-- One booking per room per date
CREATE UNIQUE INDEX idx_unique_booking
ON bookings(room_id, date);
```

### Conditional Unique (Partial Index)
```sql
-- Only enforce uniqueness for non-deleted records
CREATE UNIQUE INDEX idx_unique_active_booking
ON bookings(room_id, date)
WHERE deleted_at IS NULL;
```

### Prisma Schema
```prisma
model Booking {
  id     String @id @default(uuid())
  roomId String
  date   DateTime
  status BookingStatus

  @@unique([roomId, date])  // Composite unique
}

// Or with condition (need raw SQL migration)
```

---

## Soft Deletes

### Pattern
```typescript
model User {
  id        String    @id @default(uuid())
  email     String
  deletedAt DateTime?  // null = not deleted

  @@unique([email, deletedAt])  // Allow same email after deletion
}

// Soft delete
async function deleteUser(id: string) {
  return prisma.user.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
}

// Query active only (middleware or explicit)
const activeUsers = await prisma.user.findMany({
  where: { deletedAt: null },
});
```

### Global Filter (Prisma Middleware)
```typescript
prisma.$use(async (params, next) => {
  if (params.model === 'User') {
    if (params.action === 'findMany' || params.action === 'findFirst') {
      params.args.where = {
        ...params.args.where,
        deletedAt: null,
      };
    }
  }
  return next(params);
});
```

---

## Audit Trails

### Automatic Timestamps
```prisma
model Booking {
  id        String   @id @default(uuid())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  createdBy String
  updatedBy String?
}
```

### Change History Table
```typescript
model BookingHistory {
  id         String   @id @default(uuid())
  bookingId  String
  action     String   // CREATE, UPDATE, DELETE
  changes    Json     // { field: { old, new } }
  changedBy  String
  changedAt  DateTime @default(now())
}

// Middleware to log changes
prisma.$use(async (params, next) => {
  if (params.model === 'Booking' && ['update', 'delete'].includes(params.action)) {
    const before = await prisma.booking.findUnique({
      where: params.args.where,
    });

    const result = await next(params);

    await prisma.bookingHistory.create({
      data: {
        bookingId: before.id,
        action: params.action.toUpperCase(),
        changes: computeDiff(before, result),
        changedBy: getCurrentUserId(),
      },
    });

    return result;
  }
  return next(params);
});
```

---

## Migration Strategies

### Zero-Downtime Migrations
```sql
-- Phase 1: Add new column (nullable)
ALTER TABLE users ADD COLUMN new_email VARCHAR(255);

-- Phase 2: Backfill (in batches)
UPDATE users SET new_email = email WHERE new_email IS NULL LIMIT 1000;

-- Phase 3: Make non-nullable
ALTER TABLE users ALTER COLUMN new_email SET NOT NULL;

-- Phase 4: Drop old column
ALTER TABLE users DROP COLUMN email;
ALTER TABLE users RENAME COLUMN new_email TO email;
```

### Prisma Migrations
```bash
# Generate migration
npx prisma migrate dev --name add_user_email

# Apply in production
npx prisma migrate deploy
```

---

## Query Optimization

### EXPLAIN ANALYZE
```sql
EXPLAIN ANALYZE
SELECT * FROM bookings
WHERE room_id = 'room-123' AND date = '2024-01-15';

-- Output shows:
-- - Scan type (Index Scan vs Seq Scan)
-- - Rows estimated vs actual
-- - Execution time
```

### Common Optimizations
```typescript
// BAD: Select all columns
const bookings = await prisma.booking.findMany();

// GOOD: Select only needed
const bookings = await prisma.booking.findMany({
  select: { id: true, date: true, status: true },
});

// BAD: N+1 query
const rooms = await prisma.room.findMany();
for (const room of rooms) {
  room.bookings = await prisma.booking.findMany({ where: { roomId: room.id } });
}

// GOOD: Include relation
const rooms = await prisma.room.findMany({
  include: { bookings: true },
});

// GOOD: Use aggregations
const stats = await prisma.booking.groupBy({
  by: ['status'],
  _count: true,
});
```

---

## Connection Pooling

### Why Pool Connections?
- Creating connections is expensive (~50-100ms)
- Limited server connections
- Reuse reduces overhead

### Configuration
```
# Database URL with pool settings
DATABASE_URL="postgresql://user:pass@host/db?connection_limit=20&pool_timeout=10"
```

### Pool Sizing
```
Max Connections = (Number of cores * 2) + Effective Spindle Count

# For web servers:
# Small: 10-20 connections
# Medium: 20-50 connections
# Large: 50-100 connections
```

### Prisma Connection Management
```typescript
// Singleton pattern for Prisma
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query', 'error', 'warn'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
```

---

## Data Modeling

### One-to-Many
```prisma
model User {
  id       String    @id @default(uuid())
  bookings Booking[]
}

model Booking {
  id     String @id @default(uuid())
  userId String
  user   User   @relation(fields: [userId], references: [id])
}
```

### Many-to-Many
```prisma
model User {
  id    String @id @default(uuid())
  roles Role[]
}

model Role {
  id    String @id @default(uuid())
  users User[]
}

// Explicit join table for extra fields
model UserRole {
  userId    String
  roleId    String
  grantedAt DateTime @default(now())
  grantedBy String

  user User @relation(fields: [userId], references: [id])
  role Role @relation(fields: [roleId], references: [id])

  @@id([userId, roleId])
}
```

### Self-Referencing
```prisma
model Comment {
  id        String    @id @default(uuid())
  content   String
  parentId  String?
  parent    Comment?  @relation("CommentReplies", fields: [parentId], references: [id])
  replies   Comment[] @relation("CommentReplies")
}
```

---

## JSON Columns

### When to Use
- Flexible schema needs
- Metadata/settings storage
- Audit log payloads

### PostgreSQL JSONB
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  preferences JSONB DEFAULT '{}'
);

-- Query JSON fields
SELECT * FROM users WHERE preferences->>'theme' = 'dark';
SELECT * FROM users WHERE preferences @> '{"notifications": true}';

-- Index JSON
CREATE INDEX idx_users_prefs ON users USING GIN(preferences);
```

### Prisma
```prisma
model User {
  id          String @id @default(uuid())
  preferences Json   @default("{}")
}
```

```typescript
// Query
const darkThemeUsers = await prisma.user.findMany({
  where: {
    preferences: {
      path: ['theme'],
      equals: 'dark',
    },
  },
});

// Update
await prisma.user.update({
  where: { id },
  data: {
    preferences: {
      ...currentPrefs,
      theme: 'light',
    },
  },
});
```

---

## Database Anti-Patterns

❌ **Missing indexes on foreign keys**
```sql
-- BAD: Slow joins
CREATE TABLE bookings (
  room_id UUID REFERENCES rooms(id)  -- No index!
);

-- GOOD
CREATE INDEX idx_bookings_room ON bookings(room_id);
```

❌ **Using SELECT * in production**
```typescript
// BAD
const user = await prisma.user.findUnique({ where: { id } });

// GOOD
const user = await prisma.user.findUnique({
  where: { id },
  select: { id: true, email: true, name: true },
});
```

❌ **Large transactions**
```typescript
// BAD: Long transaction
await prisma.$transaction(async (tx) => {
  for (const item of items) {  // Could be thousands
    await tx.item.create({ data: item });
  }
});

// GOOD: Batch insert
await prisma.item.createMany({
  data: items,
  skipDuplicates: true,
});
```

---

*Last updated: 2024-01*
