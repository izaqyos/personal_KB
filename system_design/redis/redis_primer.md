# Redis Primer

## What is Redis?

Redis (Remote Dictionary Server) is an open-source, in-memory data structure store that can be used as a database, cache, message broker, and queue. It stores data in memory for extremely fast read/write operations, typically achieving sub-millisecond latency.

### Key Characteristics

- **In-Memory Storage**: All data lives in RAM, making it extremely fast
- **Persistence Options**: Can persist data to disk (RDB snapshots, AOF logs)
- **Data Structures**: Supports strings, hashes, lists, sets, sorted sets, streams, and more
- **Atomic Operations**: All operations are atomic, ensuring data consistency
- **Single-Threaded**: Uses a single thread for command execution (simplifies concurrency)
- **Replication**: Supports master-replica architecture for high availability
- **Clustering**: Native support for horizontal scaling via Redis Cluster

---

## Core Data Types

### Strings

The simplest type. Can store text, numbers, or binary data (up to 512MB).

```javascript
const Redis = require('ioredis');
const redis = new Redis();

// Basic string operations
await redis.set('user:1:name', 'John Doe');
const name = await redis.get('user:1:name'); // 'John Doe'

// Set with expiration (seconds)
await redis.set('session:abc123', 'user_data', 'EX', 3600);

// Set with expiration (milliseconds)
await redis.set('temp:key', 'value', 'PX', 5000);

// Set only if key doesn't exist (NX)
const wasSet = await redis.set('lock:resource', 'locked', 'NX', 'EX', 30);
// Returns 'OK' if set, null if key already exists

// Increment/Decrement
await redis.set('counter', '10');
await redis.incr('counter');      // 11
await redis.incrby('counter', 5); // 16
await redis.decr('counter');      // 15
```

### Hashes

Maps of field-value pairs. Perfect for storing objects.

```javascript
// Set multiple fields at once
await redis.hset('user:1', {
  name: 'John Doe',
  email: 'john@example.com',
  age: '30',
  city: 'New York'
});

// Get single field
const email = await redis.hget('user:1', 'email'); // 'john@example.com'

// Get multiple fields
const [name, age] = await redis.hmget('user:1', 'name', 'age');

// Get all fields and values
const user = await redis.hgetall('user:1');
// { name: 'John Doe', email: 'john@example.com', age: '30', city: 'New York' }

// Increment a numeric field
await redis.hincrby('user:1', 'age', 1); // age becomes 31

// Check if field exists
const exists = await redis.hexists('user:1', 'email'); // 1 (true)

// Delete a field
await redis.hdel('user:1', 'city');
```

### Lists

Ordered collections of strings. Can be used as queues or stacks.

```javascript
// Push to the end (right)
await redis.rpush('queue:jobs', 'job1', 'job2', 'job3');

// Push to the beginning (left)
await redis.lpush('queue:jobs', 'job0');

// Get list elements (0-based index, -1 means last element)
const jobs = await redis.lrange('queue:jobs', 0, -1);
// ['job0', 'job1', 'job2', 'job3']

// Pop from left (queue behavior - FIFO)
const nextJob = await redis.lpop('queue:jobs'); // 'job0'

// Pop from right (stack behavior - LIFO)
const lastJob = await redis.rpop('queue:jobs'); // 'job3'

// Blocking pop - waits for element (useful for job queues)
const [list, element] = await redis.blpop('queue:jobs', 30); // 30 second timeout

// Get list length
const length = await redis.llen('queue:jobs');

// Get element by index
const secondElement = await redis.lindex('queue:jobs', 1);
```

### Sets

Unordered collections of unique strings.

```javascript
// Add members
await redis.sadd('tags:post:1', 'javascript', 'redis', 'nodejs', 'tutorial');

// Check membership
const isMember = await redis.sismember('tags:post:1', 'redis'); // 1 (true)

// Get all members
const tags = await redis.smembers('tags:post:1');
// ['javascript', 'redis', 'nodejs', 'tutorial'] (order not guaranteed)

// Get number of members
const count = await redis.scard('tags:post:1'); // 4

// Remove member
await redis.srem('tags:post:1', 'tutorial');

// Set operations
await redis.sadd('tags:post:2', 'javascript', 'python', 'docker');

// Intersection (common tags)
const common = await redis.sinter('tags:post:1', 'tags:post:2'); // ['javascript']

// Union (all tags)
const all = await redis.sunion('tags:post:1', 'tags:post:2');

// Difference (tags in post:1 but not in post:2)
const diff = await redis.sdiff('tags:post:1', 'tags:post:2');

// Random member
const random = await redis.srandmember('tags:post:1');
```

### Sorted Sets

Sets where each member has an associated score for ordering.

```javascript
// Add members with scores
await redis.zadd('leaderboard',
  100, 'player1',
  250, 'player2',
  175, 'player3',
  300, 'player4'
);

// Get members by rank (lowest to highest score)
const bottom3 = await redis.zrange('leaderboard', 0, 2);
// ['player1', 'player3', 'player2']

// Get members by rank with scores
const withScores = await redis.zrange('leaderboard', 0, -1, 'WITHSCORES');
// ['player1', '100', 'player3', '175', 'player2', '250', 'player4', '300']

// Get members by rank (highest to lowest)
const top3 = await redis.zrevrange('leaderboard', 0, 2);
// ['player4', 'player2', 'player3']

// Get member's rank (0-based)
const rank = await redis.zrank('leaderboard', 'player2'); // 2
const reverseRank = await redis.zrevrank('leaderboard', 'player2'); // 1

// Get member's score
const score = await redis.zscore('leaderboard', 'player2'); // '250'

// Increment score
await redis.zincrby('leaderboard', 50, 'player1'); // player1 now has 150

// Get members by score range
const midRange = await redis.zrangebyscore('leaderboard', 100, 200);

// Remove members
await redis.zrem('leaderboard', 'player1');

// Remove by rank range
await redis.zremrangebyrank('leaderboard', 0, 1); // Remove bottom 2
```

---

## Common Use Cases with Node.js Examples

### Caching

```javascript
const Redis = require('ioredis');
const redis = new Redis();

async function getUserWithCache(userId) {
  const cacheKey = `user:${userId}`;

  // Try cache first
  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  // Cache miss - fetch from database
  const user = await database.query('SELECT * FROM users WHERE id = ?', [userId]);

  // Store in cache for 1 hour
  await redis.set(cacheKey, JSON.stringify(user), 'EX', 3600);

  return user;
}

// Cache invalidation
async function updateUser(userId, data) {
  await database.query('UPDATE users SET ? WHERE id = ?', [data, userId]);
  await redis.del(`user:${userId}`); // Invalidate cache
}
```

### Session Storage

```javascript
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const Redis = require('ioredis');

const redisClient = new Redis();

app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));
```

### Rate Limiting

```javascript
async function checkRateLimit(userId, limit = 100, windowSecs = 60) {
  const key = `ratelimit:${userId}`;

  const current = await redis.incr(key);

  if (current === 1) {
    // First request in window - set expiry
    await redis.expire(key, windowSecs);
  }

  if (current > limit) {
    const ttl = await redis.ttl(key);
    return {
      allowed: false,
      retryAfter: ttl,
      remaining: 0
    };
  }

  return {
    allowed: true,
    remaining: limit - current
  };
}

// Sliding window rate limiter (more accurate)
async function slidingWindowRateLimit(userId, limit = 100, windowSecs = 60) {
  const key = `ratelimit:sliding:${userId}`;
  const now = Date.now();
  const windowStart = now - (windowSecs * 1000);

  // Remove old entries
  await redis.zremrangebyscore(key, 0, windowStart);

  // Count current requests
  const count = await redis.zcard(key);

  if (count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  // Add current request
  await redis.zadd(key, now, `${now}-${Math.random()}`);
  await redis.expire(key, windowSecs);

  return { allowed: true, remaining: limit - count - 1 };
}
```

### Job Queue

```javascript
const QUEUE_KEY = 'queue:jobs';
const PROCESSING_KEY = 'queue:processing';

// Producer: Add job to queue
async function enqueueJob(jobData) {
  const job = {
    id: crypto.randomUUID(),
    data: jobData,
    createdAt: Date.now()
  };

  await redis.rpush(QUEUE_KEY, JSON.stringify(job));
  return job.id;
}

// Consumer: Process jobs
async function processJobs() {
  while (true) {
    // Blocking pop with 30 second timeout
    const result = await redis.blpop(QUEUE_KEY, 30);

    if (!result) {
      continue; // Timeout, try again
    }

    const [, jobJson] = result;
    const job = JSON.parse(jobJson);

    try {
      // Move to processing set (for visibility)
      await redis.hset(PROCESSING_KEY, job.id, jobJson);

      // Process the job
      await handleJob(job);

      // Remove from processing
      await redis.hdel(PROCESSING_KEY, job.id);
    } catch (error) {
      console.error(`Job ${job.id} failed:`, error);
      // Could re-queue or move to dead letter queue
      await redis.rpush('queue:failed', jobJson);
      await redis.hdel(PROCESSING_KEY, job.id);
    }
  }
}
```

### Pub/Sub Messaging

```javascript
const Redis = require('ioredis');

// Publisher
const publisher = new Redis();

async function publishEvent(channel, event) {
  await publisher.publish(channel, JSON.stringify(event));
}

// Example: Publish user signup event
await publishEvent('events:user', {
  type: 'USER_SIGNED_UP',
  userId: '12345',
  timestamp: Date.now()
});

// Subscriber
const subscriber = new Redis();

subscriber.subscribe('events:user', 'events:order', (err, count) => {
  console.log(`Subscribed to ${count} channels`);
});

subscriber.on('message', (channel, message) => {
  const event = JSON.parse(message);
  console.log(`Received on ${channel}:`, event);

  // Handle event based on channel
  switch (channel) {
    case 'events:user':
      handleUserEvent(event);
      break;
    case 'events:order':
      handleOrderEvent(event);
      break;
  }
});

// Pattern subscription (wildcards)
subscriber.psubscribe('events:*');
subscriber.on('pmessage', (pattern, channel, message) => {
  console.log(`Pattern ${pattern} matched channel ${channel}`);
});
```

### Simple Distributed Lock

```javascript
async function acquireLock(resource, ttlMs = 30000) {
  const token = crypto.randomUUID();
  const key = `lock:${resource}`;

  const result = await redis.set(key, token, 'NX', 'PX', ttlMs);

  if (result === 'OK') {
    return token;
  }
  return null;
}

async function releaseLock(resource, token) {
  const key = `lock:${resource}`;

  // Lua script ensures atomic check-and-delete
  const script = `
    if redis.call("get", KEYS[1]) == ARGV[1] then
      return redis.call("del", KEYS[1])
    else
      return 0
    end
  `;

  const result = await redis.eval(script, 1, key, token);
  return result === 1;
}

// Usage
async function doExclusiveWork(resourceId) {
  const token = await acquireLock(resourceId);

  if (!token) {
    throw new Error('Could not acquire lock');
  }

  try {
    // Do work that requires exclusive access
    await performCriticalOperation();
  } finally {
    await releaseLock(resourceId, token);
  }
}
```

---

## Transactions and Pipelines

### Pipelines (Batching)

Execute multiple commands in one round-trip for better performance.

```javascript
// Without pipeline: N round-trips
for (const key of keys) {
  await redis.get(key); // Each is a network round-trip
}

// With pipeline: 1 round-trip
const pipeline = redis.pipeline();
keys.forEach(key => pipeline.get(key));
const results = await pipeline.exec();
// results = [[null, 'value1'], [null, 'value2'], ...]
// Each result is [error, value]
```

### Transactions (MULTI/EXEC)

Execute multiple commands atomically.

```javascript
// Basic transaction
const results = await redis.multi()
  .set('key1', 'value1')
  .set('key2', 'value2')
  .incr('counter')
  .exec();

// Watch for optimistic locking
async function transferBalance(from, to, amount) {
  await redis.watch(`balance:${from}`);

  const balance = parseInt(await redis.get(`balance:${from}`));

  if (balance < amount) {
    await redis.unwatch();
    throw new Error('Insufficient balance');
  }

  // If balance:from changed since WATCH, EXEC returns null
  const results = await redis.multi()
    .decrby(`balance:${from}`, amount)
    .incrby(`balance:${to}`, amount)
    .exec();

  if (!results) {
    // Transaction failed due to concurrent modification
    throw new Error('Transaction conflict, please retry');
  }

  return true;
}
```

---

## Lua Scripting

Execute complex logic atomically on the server.

```javascript
// Define script
const incrementIfBelowScript = `
  local current = tonumber(redis.call('get', KEYS[1]) or '0')
  local max = tonumber(ARGV[1])

  if current < max then
    return redis.call('incr', KEYS[1])
  else
    return nil
  end
`;

// Execute script
const result = await redis.eval(incrementIfBelowScript, 1, 'counter', '100');

// For frequently used scripts, use EVALSHA with script caching
const sha = await redis.script('load', incrementIfBelowScript);
const result2 = await redis.evalsha(sha, 1, 'counter', '100');

// ioredis defineCommand for reusable commands
redis.defineCommand('incrementIfBelow', {
  numberOfKeys: 1,
  lua: incrementIfBelowScript
});

// Now use like a native command
const result3 = await redis.incrementIfBelow('counter', '100');
```

---

## Connection Management

```javascript
const Redis = require('ioredis');

// Basic connection
const redis = new Redis({
  host: 'localhost',
  port: 6379,
  password: 'your-password',
  db: 0
});

// Connection with retry strategy
const redis = new Redis({
  host: 'localhost',
  port: 6379,
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    return delay; // Retry after delay ms
  },
  maxRetriesPerRequest: 3
});

// Cluster connection
const cluster = new Redis.Cluster([
  { host: 'node1.redis.com', port: 6379 },
  { host: 'node2.redis.com', port: 6379 },
  { host: 'node3.redis.com', port: 6379 }
]);

// Sentinel connection (high availability)
const redis = new Redis({
  sentinels: [
    { host: 'sentinel1.redis.com', port: 26379 },
    { host: 'sentinel2.redis.com', port: 26379 },
    { host: 'sentinel3.redis.com', port: 26379 }
  ],
  name: 'mymaster'
});

// Event handlers
redis.on('connect', () => console.log('Connected to Redis'));
redis.on('ready', () => console.log('Redis ready'));
redis.on('error', (err) => console.error('Redis error:', err));
redis.on('close', () => console.log('Connection closed'));
redis.on('reconnecting', () => console.log('Reconnecting...'));

// Graceful shutdown
process.on('SIGTERM', async () => {
  await redis.quit();
  process.exit(0);
});
```

---

## Persistence Options

### RDB (Snapshotting)

- Point-in-time snapshots saved to disk
- Fast restarts (load single file)
- Some data loss possible (since last snapshot)

```
# redis.conf
save 900 1      # Save if 1 key changed in 900 seconds
save 300 10     # Save if 10 keys changed in 300 seconds
save 60 10000   # Save if 10000 keys changed in 60 seconds
```

### AOF (Append-Only File)

- Logs every write operation
- Better durability (configurable sync)
- Larger files, slower restarts

```
# redis.conf
appendonly yes
appendfsync everysec  # Sync every second (good balance)
# appendfsync always  # Sync every write (slowest, safest)
# appendfsync no      # Let OS decide (fastest, risky)
```

### Hybrid (RDB + AOF)

Modern Redis can use both: RDB for fast restarts, AOF for durability.

---

## Memory Management

```javascript
// Check memory usage
const info = await redis.info('memory');
console.log(info);

// Set key with memory-efficient expiration
await redis.set('key', 'value', 'EX', 3600);

// Memory usage of specific key
const bytes = await redis.memory('usage', 'key');
```

### Eviction Policies

When `maxmemory` is reached, Redis evicts keys based on policy:

| Policy | Description |
|--------|-------------|
| `noeviction` | Return errors when memory limit reached |
| `allkeys-lru` | Evict least recently used keys |
| `allkeys-lfu` | Evict least frequently used keys |
| `volatile-lru` | Evict LRU keys with expiration set |
| `volatile-lfu` | Evict LFU keys with expiration set |
| `volatile-ttl` | Evict keys with shortest TTL |
| `allkeys-random` | Evict random keys |
| `volatile-random` | Evict random keys with expiration set |

---

## Best Practices

1. **Use appropriate data structures**: Don't store JSON strings when hashes would be more efficient
2. **Set TTLs**: Always set expiration on cache keys to prevent memory bloat
3. **Use pipelines**: Batch operations to reduce network round-trips
4. **Avoid large keys/values**: Keep values under 100KB, key names short but descriptive
5. **Use key namespacing**: Prefix keys with type/category (e.g., `user:123:profile`)
6. **Monitor memory**: Set `maxmemory` and appropriate eviction policy
7. **Handle connection errors**: Implement retry logic and connection pooling
8. **Use Lua scripts**: For complex atomic operations
9. **Don't use KEYS in production**: Use SCAN for iterating keys
10. **Separate cache from data**: Use different Redis instances for ephemeral cache vs. persistent data

---

## Related Topics

- [Redlock Algorithm](./redlock.md) - Distributed locking with Redis
