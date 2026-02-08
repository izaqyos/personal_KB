# Scalability Patterns - Interview Knowledge Base

## Caching Strategies

### Redis Caching Layer
```typescript
class CacheService {
  constructor(private redis: Redis) {}

  async get<T>(key: string): Promise<T | null> {
    const cached = await this.redis.get(key);
    return cached ? JSON.parse(cached) : null;
  }

  async set<T>(key: string, value: T, ttlSeconds: number): Promise<void> {
    await this.redis.setex(key, ttlSeconds, JSON.stringify(value));
  }

  async invalidate(pattern: string): Promise<void> {
    const keys = await this.redis.keys(pattern);
    if (keys.length > 0) {
      await this.redis.del(...keys);
    }
  }
}
```

### Cache-Aside Pattern
```typescript
async function getRoomById(id: string): Promise<Room> {
  const cacheKey = `room:${id}`;

  // Try cache first
  const cached = await cache.get<Room>(cacheKey);
  if (cached) return cached;

  // Cache miss - fetch from DB
  const room = await prisma.room.findUnique({ where: { id } });
  if (!room) throw new NotFoundError();

  // Populate cache
  await cache.set(cacheKey, room, 3600); // 1 hour TTL

  return room;
}

// Invalidate on update
async function updateRoom(id: string, data: UpdateData): Promise<Room> {
  const room = await prisma.room.update({ where: { id }, data });
  await cache.invalidate(`room:${id}`);
  return room;
}
```

### Write-Through Cache
```typescript
async function createBooking(data: BookingData): Promise<Booking> {
  const booking = await prisma.booking.create({ data });

  // Update cache immediately
  await cache.set(`booking:${booking.id}`, booking, 3600);

  // Invalidate related caches
  await cache.invalidate(`room:${data.roomId}:bookings:*`);

  return booking;
}
```

---

## Database Optimization

### Connection Pooling
```typescript
// Prisma - connection pool configuration
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  // Connection pool settings via DATABASE_URL
  // postgresql://user:pass@host/db?connection_limit=20&pool_timeout=10
});

// Manual pool (e.g., pg)
import { Pool } from 'pg';
const pool = new Pool({
  max: 20,              // Max connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
```

### Indexing Strategies
```sql
-- Single column index for lookups
CREATE INDEX idx_bookings_room_id ON bookings(room_id);

-- Composite index for multi-column queries
CREATE INDEX idx_bookings_room_date ON bookings(room_id, date);

-- Partial index for common queries
CREATE INDEX idx_active_bookings ON bookings(room_id, date)
WHERE status = 'ACTIVE';

-- Covering index (includes data, avoids table lookup)
CREATE INDEX idx_bookings_covering ON bookings(room_id, date)
INCLUDE (user_id, status);
```

### Query Optimization
```typescript
// BAD: N+1 query
const rooms = await prisma.room.findMany();
for (const room of rooms) {
  room.bookings = await prisma.booking.findMany({ where: { roomId: room.id } });
}

// GOOD: Include related data
const rooms = await prisma.room.findMany({
  include: { bookings: true }
});

// GOOD: Select only needed fields
const rooms = await prisma.room.findMany({
  select: {
    id: true,
    name: true,
    _count: { select: { bookings: true } }
  }
});
```

---

## Pagination Patterns

### Cursor-Based Pagination (Recommended)
```typescript
interface PaginatedResult<T> {
  data: T[];
  nextCursor: string | null;
  hasMore: boolean;
}

async function getBookings(
  cursor?: string,
  limit = 20
): Promise<PaginatedResult<Booking>> {
  const bookings = await prisma.booking.findMany({
    take: limit + 1, // Fetch one extra to check hasMore
    ...(cursor && {
      cursor: { id: cursor },
      skip: 1, // Skip the cursor itself
    }),
    orderBy: { createdAt: 'desc' },
  });

  const hasMore = bookings.length > limit;
  const data = hasMore ? bookings.slice(0, -1) : bookings;

  return {
    data,
    nextCursor: hasMore ? data[data.length - 1].id : null,
    hasMore,
  };
}
```

**Benefits:**
- Consistent results even with concurrent writes
- Better performance on large datasets
- No "skipping" overhead

### Offset Pagination (Simple but Limited)
```typescript
async function getBookings(page = 1, limit = 20) {
  const [data, total] = await Promise.all([
    prisma.booking.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.booking.count(),
  ]);

  return {
    data,
    page,
    totalPages: Math.ceil(total / limit),
    total,
  };
}
```

**Limitations:**
- Slow on large offsets (has to skip rows)
- Inconsistent with concurrent modifications

---

## Horizontal Scaling

### Stateless Services
```typescript
// BAD: In-memory session storage
const sessions = new Map<string, Session>();

// GOOD: External session storage
class SessionService {
  constructor(private redis: Redis) {}

  async create(userId: string): Promise<string> {
    const sessionId = crypto.randomUUID();
    await this.redis.setex(
      `session:${sessionId}`,
      86400, // 24 hours
      JSON.stringify({ userId, createdAt: Date.now() })
    );
    return sessionId;
  }

  async get(sessionId: string): Promise<Session | null> {
    const data = await this.redis.get(`session:${sessionId}`);
    return data ? JSON.parse(data) : null;
  }
}
```

### Load Balancer Health Checks
```typescript
// Health check endpoint
app.get('/health', async (req, res) => {
  const checks = {
    server: 'ok',
    database: 'unknown',
    redis: 'unknown',
  };

  try {
    await prisma.$queryRaw`SELECT 1`;
    checks.database = 'ok';
  } catch {
    checks.database = 'error';
  }

  try {
    await redis.ping();
    checks.redis = 'ok';
  } catch {
    checks.redis = 'error';
  }

  const healthy = Object.values(checks).every(v => v === 'ok');
  res.status(healthy ? 200 : 503).json(checks);
});
```

---

## Read Replicas

### Read/Write Splitting
```typescript
// Prisma with read replicas
const prisma = new PrismaClient({
  datasources: {
    db: { url: process.env.DATABASE_URL }, // Primary
  },
});

const prismaRead = new PrismaClient({
  datasources: {
    db: { url: process.env.DATABASE_READ_URL }, // Replica
  },
});

// Route queries appropriately
class BookingRepository {
  async findById(id: string): Promise<Booking | null> {
    return prismaRead.booking.findUnique({ where: { id } });
  }

  async create(data: BookingData): Promise<Booking> {
    return prisma.booking.create({ data }); // Primary
  }
}
```

### Replication Lag Considerations
```typescript
// After write, read from primary
async function createAndReturn(data: BookingData): Promise<Booking> {
  const booking = await prisma.booking.create({ data });

  // Read from primary immediately after write
  // (replica might have lag)
  return prisma.booking.findUnique({ where: { id: booking.id } });
}
```

---

## Async Processing

### Message Queue Pattern
```typescript
import { Queue, Worker } from 'bullmq';

// Producer
const emailQueue = new Queue('emails', { connection: redis });

async function sendWelcomeEmail(userId: string) {
  await emailQueue.add('welcome', { userId }, {
    attempts: 3,
    backoff: { type: 'exponential', delay: 1000 },
  });
}

// Consumer (separate process)
const worker = new Worker('emails', async (job) => {
  if (job.name === 'welcome') {
    const user = await prisma.user.findUnique({ where: { id: job.data.userId } });
    await emailService.sendWelcome(user.email);
  }
}, { connection: redis });
```

### Event-Driven Architecture
```typescript
import { EventEmitter } from 'events';

const events = new EventEmitter();

// Publish events
async function createBooking(data: BookingData): Promise<Booking> {
  const booking = await prisma.booking.create({ data });

  events.emit('booking.created', booking);

  return booking;
}

// Subscribe to events
events.on('booking.created', async (booking) => {
  await notificationService.notifyUser(booking.userId);
  await analyticsService.trackBooking(booking);
  await cache.invalidate(`room:${booking.roomId}:*`);
});
```

---

## Rate Limiting at Scale

### Distributed Rate Limiting
```typescript
// Token bucket in Redis
class DistributedRateLimiter {
  constructor(
    private redis: Redis,
    private tokensPerSecond: number,
    private bucketSize: number
  ) {}

  async consume(key: string, tokens = 1): Promise<boolean> {
    const now = Date.now();
    const script = `
      local key = KEYS[1]
      local rate = tonumber(ARGV[1])
      local capacity = tonumber(ARGV[2])
      local now = tonumber(ARGV[3])
      local tokens = tonumber(ARGV[4])

      local bucket = redis.call('HMGET', key, 'tokens', 'timestamp')
      local currentTokens = tonumber(bucket[1]) or capacity
      local lastUpdate = tonumber(bucket[2]) or now

      local elapsed = (now - lastUpdate) / 1000
      local newTokens = math.min(capacity, currentTokens + elapsed * rate)

      if newTokens >= tokens then
        redis.call('HMSET', key, 'tokens', newTokens - tokens, 'timestamp', now)
        redis.call('EXPIRE', key, 60)
        return 1
      end
      return 0
    `;

    const result = await this.redis.eval(
      script, 1, key,
      this.tokensPerSecond, this.bucketSize, now, tokens
    );

    return result === 1;
  }
}
```

---

## Performance Metrics

### Key Metrics to Monitor
```typescript
interface PerformanceMetrics {
  responseTime: {
    p50: number;  // Median
    p95: number;  // 95th percentile
    p99: number;  // 99th percentile
  };
  throughput: number;    // Requests per second
  errorRate: number;     // Percentage of 5xx
  saturation: {
    cpu: number;
    memory: number;
    dbConnections: number;
  };
}

// Prometheus-style metrics
import { Histogram, Counter, Gauge } from 'prom-client';

const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration',
  labelNames: ['method', 'route', 'status'],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5],
});

// Middleware to track
app.use((req, res, next) => {
  const end = httpRequestDuration.startTimer();
  res.on('finish', () => {
    end({ method: req.method, route: req.route?.path, status: res.statusCode });
  });
  next();
});
```

---

## Scalability Checklist

### Before Scaling
- [ ] Add appropriate database indexes
- [ ] Implement connection pooling
- [ ] Add caching layer (Redis)
- [ ] Optimize N+1 queries
- [ ] Use cursor-based pagination
- [ ] Profile slow queries

### Horizontal Scaling
- [ ] Make services stateless
- [ ] Externalize sessions
- [ ] Set up load balancer
- [ ] Add health check endpoints
- [ ] Configure read replicas
- [ ] Implement distributed caching

### Advanced Scaling
- [ ] Add message queues for async work
- [ ] Implement event-driven architecture
- [ ] Set up database sharding
- [ ] Add CDN for static assets
- [ ] Implement rate limiting
- [ ] Set up auto-scaling

---

*Last updated: 2024-01*
