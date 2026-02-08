# Concurrency Patterns - Interview Knowledge Base

## Race Conditions & Prevention

### Time-of-Check to Time-of-Use (TOCTOU)
**Problem:** Gap between checking a condition and acting on it allows another process to change state.

**Example Scenario:** Double-booking in reservation systems
```
Thread A: Check if slot available → YES
Thread B: Check if slot available → YES
Thread A: Book the slot → SUCCESS
Thread B: Book the slot → SUCCESS (DOUBLE BOOKING!)
```

**Solutions:**
1. **Pessimistic Locking** - Lock before check
2. **Optimistic Locking** - Version field, retry on conflict
3. **Database Transactions** - SERIALIZABLE isolation

---

## Database-Level Locking

### Pessimistic Locking with SELECT FOR UPDATE
**When to use:** High contention, critical sections, can't afford conflicts

```sql
BEGIN;
SELECT * FROM bookings WHERE room_id = $1 AND date = $2 FOR UPDATE;
-- Row is now locked until COMMIT/ROLLBACK
-- Other transactions will WAIT here
INSERT INTO bookings (...) VALUES (...);
COMMIT;
```

**Prisma Implementation:**
```typescript
await prisma.$transaction(async (tx) => {
  // Lock the room row
  const room = await tx.room.findUnique({
    where: { id: roomId },
    // Prisma doesn't have native FOR UPDATE, use $queryRaw
  });

  // Or use raw query
  await tx.$queryRaw`SELECT * FROM rooms WHERE id = ${roomId} FOR UPDATE`;

  // Now safe to check and insert
  const existing = await tx.booking.findFirst({ where: { roomId, date } });
  if (existing) throw new Error('Already booked');

  return tx.booking.create({ data: { roomId, date, userId } });
});
```

### Row-Level vs Table-Level Locks
| Lock Type | Scope | Concurrency | Use Case |
|-----------|-------|-------------|----------|
| Row-level (FOR UPDATE) | Single row | High | Booking specific resource |
| Table-level (LOCK TABLE) | Entire table | Low | Schema migrations |
| Advisory locks | Custom | Varies | Application-defined critical sections |

---

## Optimistic Locking

### Version Field Pattern
```typescript
// Entity with version
interface Booking {
  id: string;
  version: number;
  // ... other fields
}

// Update with version check
async function updateBooking(id: string, data: UpdateData, expectedVersion: number) {
  const result = await prisma.booking.updateMany({
    where: {
      id,
      version: expectedVersion  // Only update if version matches
    },
    data: {
      ...data,
      version: { increment: 1 }
    }
  });

  if (result.count === 0) {
    throw new OptimisticLockError('Concurrent modification detected');
  }
}
```

**When to use:** Low contention, acceptable to retry, read-heavy workloads

---

## Idempotency Patterns

### Idempotency Key Pattern
**Purpose:** Safe retries, exactly-once semantics

```typescript
// Client sends unique idempotency key
POST /bookings
Headers: { "Idempotency-Key": "uuid-v4-here" }

// Server implementation
async function createBooking(data: BookingData, idempotencyKey: string) {
  // Check if already processed
  const existing = await prisma.idempotencyRecord.findUnique({
    where: { key: idempotencyKey }
  });

  if (existing) {
    return existing.response;  // Return cached response
  }

  // Process and store result
  const result = await prisma.$transaction(async (tx) => {
    const booking = await tx.booking.create({ data });
    await tx.idempotencyRecord.create({
      data: {
        key: idempotencyKey,
        response: JSON.stringify(booking),
        expiresAt: addHours(new Date(), 24)
      }
    });
    return booking;
  });

  return result;
}
```

### Database Unique Constraint as Idempotency
```sql
-- Partial unique index prevents double-booking
CREATE UNIQUE INDEX idx_unique_active_booking
ON bookings (room_id, date)
WHERE status = 'ACTIVE';
```

---

## Hold-Confirm-Release Pattern

**Use case:** Two-phase booking (reserve → confirm/cancel)

```typescript
enum BookingStatus {
  HELD = 'HELD',       // Temporarily reserved
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED'
}

// Phase 1: Hold
async function holdSlot(roomId: string, date: Date, userId: string) {
  return prisma.$transaction(async (tx) => {
    await tx.$queryRaw`SELECT 1 FROM rooms WHERE id = ${roomId} FOR UPDATE`;

    const existing = await tx.booking.findFirst({
      where: { roomId, date, status: { in: ['HELD', 'CONFIRMED'] } }
    });
    if (existing) throw new Error('Slot unavailable');

    return tx.booking.create({
      data: {
        roomId, date, userId,
        status: 'HELD',
        expiresAt: addMinutes(new Date(), 15)  // Auto-expire
      }
    });
  });
}

// Phase 2: Confirm
async function confirmBooking(bookingId: string) {
  const result = await prisma.booking.updateMany({
    where: {
      id: bookingId,
      status: 'HELD',
      expiresAt: { gt: new Date() }  // Not expired
    },
    data: { status: 'CONFIRMED' }
  });

  if (result.count === 0) {
    throw new Error('Booking expired or already processed');
  }
}

// Background job: Expire stale holds
async function expireStaleHolds() {
  await prisma.booking.updateMany({
    where: {
      status: 'HELD',
      expiresAt: { lt: new Date() }
    },
    data: { status: 'EXPIRED' }
  });
}
```

---

## Distributed Locking

### Redis-Based Distributed Lock (Redlock)
```typescript
import Redis from 'ioredis';

async function acquireLock(
  redis: Redis,
  key: string,
  ttlMs: number
): Promise<string | null> {
  const lockValue = crypto.randomUUID();
  const result = await redis.set(
    `lock:${key}`,
    lockValue,
    'PX', ttlMs,
    'NX'  // Only set if not exists
  );
  return result === 'OK' ? lockValue : null;
}

async function releaseLock(
  redis: Redis,
  key: string,
  lockValue: string
): Promise<boolean> {
  // Lua script for atomic check-and-delete
  const script = `
    if redis.call("get", KEYS[1]) == ARGV[1] then
      return redis.call("del", KEYS[1])
    else
      return 0
    end
  `;
  const result = await redis.eval(script, 1, `lock:${key}`, lockValue);
  return result === 1;
}
```

---

## Testing Concurrent Operations

### Real Database Testing (Not Mocks!)
```typescript
describe('Concurrent Booking', () => {
  it('should prevent double booking', async () => {
    const roomId = 'room-1';
    const date = new Date('2024-01-15');

    // Fire concurrent requests
    const results = await Promise.allSettled([
      bookingService.create({ roomId, date, userId: 'user-1' }),
      bookingService.create({ roomId, date, userId: 'user-2' }),
      bookingService.create({ roomId, date, userId: 'user-3' }),
    ]);

    const successes = results.filter(r => r.status === 'fulfilled');
    const failures = results.filter(r => r.status === 'rejected');

    expect(successes).toHaveLength(1);
    expect(failures).toHaveLength(2);

    // Verify only one booking exists
    const bookings = await prisma.booking.findMany({
      where: { roomId, date }
    });
    expect(bookings).toHaveLength(1);
  });
});
```

---

## Best Practices

1. **Keep transactions short** - Lock contention increases with duration
2. **Lock in consistent order** - Prevents deadlocks when locking multiple resources
3. **Use appropriate isolation level** - READ COMMITTED usually sufficient
4. **Always have a timeout** - For distributed locks and holds
5. **Test with real concurrency** - Mocks don't catch race conditions
6. **Log lock acquisition/release** - Helps debug deadlocks
7. **Consider lock granularity** - Finer locks = better concurrency but more complexity

---

## Anti-Patterns

❌ **Check-then-act without locking**
```typescript
// BAD: Race condition between check and insert
const existing = await prisma.booking.findFirst({ where: { roomId, date } });
if (!existing) {
  await prisma.booking.create({ data: { roomId, date } });
}
```

❌ **Locking outside transaction**
```typescript
// BAD: Lock released before insert
await prisma.$queryRaw`SELECT * FROM rooms WHERE id = ${id} FOR UPDATE`;
// Transaction auto-committed, lock released!
await prisma.booking.create({ data });  // Race condition possible
```

❌ **Long-held locks**
```typescript
// BAD: External API call while holding lock
await prisma.$transaction(async (tx) => {
  await tx.$queryRaw`SELECT ... FOR UPDATE`;
  await externalPaymentAPI.charge();  // Could take seconds!
  await tx.booking.create({ data });
});
```

---

*Last updated: 2024-01*
