# Redlock Algorithm - Deep Explanation

## How It Works

Redlock is designed to provide distributed locking across multiple Redis instances, so no single Redis server is a point of failure.

### Step 1: Get current time

You record the start time before attempting to acquire locks. This is crucial because you'll need to calculate how long the acquisition process took.

```python
start_time = current_time_ms()
```

### Step 2: Try to acquire lock on majority of Redis instances

You attempt to set a lock key on each Redis instance (typically 5 instances, so you need at least 3):

```python
# On each Redis instance:
SET resource_name my_unique_token NX PX 30000
# NX = only if not exists
# PX 30000 = expires in 30 seconds
```

The "unique token" (usually a UUID) is critical—it proves *you* hold the lock when you later try to release it.

**Why majority?** If you required all 5, a single Redis failure would block all locking. With majority (3 of 5), you can tolerate 2 failures.

### Step 3: Check if total time < lock TTL

```python
elapsed = current_time_ms() - start_time
remaining_ttl = lock_ttl - elapsed

if locks_acquired >= 3 and remaining_ttl > 0:
    # Success! Lock is valid for remaining_ttl
else:
    # Failed - release any locks we did acquire
```

**Why this matters:** If network delays caused the acquisition to take 25 seconds, and your TTL is 30 seconds, you only have 5 seconds of useful lock time. If elapsed time exceeds TTL, the lock is worthless (or already expired on some nodes).

### Step 4: If successful, hold lock; otherwise release all

If you didn't get majority, you *must* release any locks you did acquire:

```python
# Release using Lua script to ensure atomicity
if redis.get(resource_name) == my_unique_token:
    redis.del(resource_name)
```

The token check prevents you from accidentally releasing someone else's lock if yours already expired.

---

## Node.js Implementation Example

Using the `redlock` package:

```javascript
const Redlock = require('redlock');
const Redis = require('ioredis');

// Create clients for multiple Redis instances
const redisA = new Redis({ host: 'redis-1.example.com', port: 6379 });
const redisB = new Redis({ host: 'redis-2.example.com', port: 6379 });
const redisC = new Redis({ host: 'redis-3.example.com', port: 6379 });
const redisD = new Redis({ host: 'redis-4.example.com', port: 6379 });
const redisE = new Redis({ host: 'redis-5.example.com', port: 6379 });

// Initialize Redlock with all instances
const redlock = new Redlock(
  [redisA, redisB, redisC, redisD, redisE],
  {
    // Expected clock drift; for more details see:
    // http://redis.io/topics/distlock
    driftFactor: 0.01, // multiplied by lock ttl to determine drift time

    // The max number of times Redlock will attempt to lock a resource
    retryCount: 10,

    // The time in ms between retry attempts
    retryDelay: 200,

    // The max time in ms randomly added to retries
    retryJitter: 200,

    // Time in ms after which to consider failed locks as expired
    automaticExtensionThreshold: 500
  }
);

// Error handling
redlock.on('error', (error) => {
  // Ignore cases where a resource is explicitly marked as locked
  if (error instanceof Redlock.ResourceLockedError) {
    return;
  }
  console.error('Redlock error:', error);
});

// Acquire and use a lock
async function processOrder(orderId) {
  const resource = `locks:order:${orderId}`;
  const ttl = 30000; // 30 seconds

  try {
    // Acquire lock
    const lock = await redlock.acquire([resource], ttl);

    try {
      // Critical section - only one process can execute this at a time
      console.log(`Processing order ${orderId}`);
      await chargePayment(orderId);
      await reduceInventory(orderId);
      await sendConfirmation(orderId);

    } finally {
      // Always release the lock
      await lock.release();
    }

  } catch (error) {
    if (error instanceof Redlock.ResourceLockedError) {
      console.log(`Order ${orderId} is being processed by another instance`);
      // Could retry later or return to queue
    } else {
      throw error;
    }
  }
}

// Using the "using" pattern (auto-release)
async function processOrderAuto(orderId) {
  const resource = `locks:order:${orderId}`;

  await redlock.using([resource], 30000, async (signal) => {
    // The lock will automatically be released when this function returns
    // or throws an error

    // Check if lock is still valid (e.g., after async operations)
    if (signal.aborted) {
      throw new Error('Lock was lost');
    }

    await chargePayment(orderId);

    // Check again before continuing
    if (signal.aborted) {
      throw new Error('Lock was lost');
    }

    await reduceInventory(orderId);
  });
}

// Lock extension for long-running operations
async function longRunningProcess(resourceId) {
  const resource = `locks:process:${resourceId}`;
  let lock = await redlock.acquire([resource], 10000);

  try {
    for (const step of longOperationSteps) {
      // Process step
      await processStep(step);

      // Extend lock before it expires
      lock = await lock.extend(10000);
    }
  } finally {
    await lock.release();
  }
}
```

### Manual Implementation (Without Library)

```javascript
const Redis = require('ioredis');
const crypto = require('crypto');

class SimpleRedlock {
  constructor(clients, options = {}) {
    this.clients = clients;
    this.quorum = Math.floor(clients.length / 2) + 1;
    this.clockDriftFactor = options.clockDriftFactor || 0.01;
  }

  async acquire(resource, ttl) {
    const token = crypto.randomUUID();
    const startTime = Date.now();

    // Try to acquire lock on all instances
    const results = await Promise.all(
      this.clients.map(async (client) => {
        try {
          const result = await client.set(resource, token, 'NX', 'PX', ttl);
          return result === 'OK';
        } catch {
          return false;
        }
      })
    );

    const locksAcquired = results.filter(Boolean).length;
    const elapsedTime = Date.now() - startTime;
    const drift = Math.round(ttl * this.clockDriftFactor) + 2;
    const validityTime = ttl - elapsedTime - drift;

    if (locksAcquired >= this.quorum && validityTime > 0) {
      return {
        resource,
        token,
        validityTime,
        release: () => this.release(resource, token)
      };
    }

    // Failed to get quorum - release any locks we did acquire
    await this.release(resource, token);
    throw new Error('Failed to acquire lock');
  }

  async release(resource, token) {
    // Lua script for atomic check-and-delete
    const script = `
      if redis.call("get", KEYS[1]) == ARGV[1] then
        return redis.call("del", KEYS[1])
      else
        return 0
      end
    `;

    await Promise.all(
      this.clients.map(async (client) => {
        try {
          await client.eval(script, 1, resource, token);
        } catch {
          // Ignore errors during release
        }
      })
    );
  }
}

// Usage
const clients = [
  new Redis({ host: 'redis-1.example.com' }),
  new Redis({ host: 'redis-2.example.com' }),
  new Redis({ host: 'redis-3.example.com' }),
];

const redlock = new SimpleRedlock(clients);

async function criticalSection() {
  const lock = await redlock.acquire('my-resource', 30000);

  try {
    // Do critical work
    console.log(`Lock acquired, valid for ${lock.validityTime}ms`);
  } finally {
    await lock.release();
  }
}
```

---

## Challenges

### Clock Drift: Different servers have different times

Each Redis instance uses its own clock to measure TTL expiration. If Server A's clock runs 2 seconds fast:

```
Timeline (real time):
0s: You acquire lock with 30s TTL on servers A, B, C
28s: Server A thinks 30s passed → expires your lock
28s: Another client acquires lock on A
29s: You still think you have the lock
→ TWO clients believe they hold the lock
```

Redlock assumes clock drift is bounded and small, but in practice, this assumption can be violated.

### Network Partitions: Can't reach majority

```
        [Your App]
            |
    Network Partition
            |
   ─────────┼─────────
   |        |        |
[Redis A] [Redis B] [Redis C] [Redis D] [Redis E]
   ✓        ✓         ✗         ✗         ✗
```

If you can only reach 2 of 5 Redis instances, you can't acquire the lock. This is actually *correct* behavior—it prevents split-brain scenarios. But it means your system can't make progress during network issues.

### Lock Renewal: Must refresh before TTL expires

For long-running operations:

```python
def do_work_with_lock():
    lock = acquire_lock(ttl=30)

    # Start background renewal
    while working:
        sleep(10)  # Renew at 1/3 of TTL
        lock.extend(30)  # Reset TTL to 30s

    lock.release()
```

**The danger:** If your renewal thread stalls (GC pause, CPU starvation), the lock expires while you're still working:

```
0s:  Acquire lock (TTL 30s)
10s: Renewal succeeds (TTL reset to 30s)
20s: GC pause starts (renewal thread frozen)
...
50s: GC pause ends
     - Lock expired at 40s
     - Another client acquired at 41s
     - You're now operating without the lock
```

### Fencing Tokens: Prevent stale lock holders

A fencing token is a monotonically increasing number issued with each lock acquisition:

```
Client A acquires lock → fencing token = 33
Client A stalls (GC pause)
Lock expires
Client B acquires lock → fencing token = 34
Client A wakes up, tries to write

Storage system checks:
  "Client A has token 33, but I last saw token 34"
  → Reject Client A's write
```

**The problem:** Redis/Redlock doesn't provide fencing tokens natively. You'd need to implement them separately, and every downstream system must check them.

```python
# Without fencing (unsafe):
write_to_database(data)

# With fencing (safe):
write_to_database(data, fencing_token=33)
# Database rejects if it's seen token > 33
```

### Node.js Fencing Token Implementation

```javascript
const Redis = require('ioredis');
const redis = new Redis();

class FencedLock {
  constructor(redlock) {
    this.redlock = redlock;
    this.tokenCounterKey = 'global:fencing:counter';
  }

  async acquire(resource, ttl) {
    // Acquire the distributed lock first
    const lock = await this.redlock.acquire([resource], ttl);

    // Get a monotonically increasing fencing token
    const fencingToken = await redis.incr(this.tokenCounterKey);

    return {
      ...lock,
      fencingToken,
      resource
    };
  }
}

// Storage layer that checks fencing tokens
class FencedStorage {
  constructor() {
    this.lastSeenTokens = new Map();
  }

  async write(key, value, fencingToken) {
    const lastToken = this.lastSeenTokens.get(key) || 0;

    if (fencingToken < lastToken) {
      throw new Error(`Stale fencing token: ${fencingToken} < ${lastToken}`);
    }

    this.lastSeenTokens.set(key, fencingToken);
    // Perform actual write
    await this.performWrite(key, value);
  }
}

// Usage
async function safeOperation(orderId, data) {
  const fencedLock = new FencedLock(redlock);
  const storage = new FencedStorage();

  const lock = await fencedLock.acquire(`order:${orderId}`, 30000);

  try {
    // Pass fencing token to storage
    await storage.write(
      `order:${orderId}`,
      data,
      lock.fencingToken
    );
  } finally {
    await lock.release();
  }
}
```

---

## Martin Kleppmann's Critique

Martin Kleppmann (author of *Designing Data-Intensive Applications*) wrote a famous critique of Redlock. His core arguments:

### Timing assumptions can fail in real systems

Redlock assumes operations complete within bounded time. Reality:

```
Things that can cause unbounded delays:
- GC pauses (can be seconds in Java/Go)
- VM live migration
- Context switches under load
- Network retries
- Disk I/O stalls (especially with swap)
- CPU throttling (cloud environments)
```

If your process pauses after checking the lock but before doing work:

```python
if lock.is_valid():      # ← Pause happens here for 60 seconds
    do_critical_work()   # Lock expired 30 seconds ago
```

### Clock jumps (NTP sync) can break safety

NTP (Network Time Protocol) keeps clocks synchronized, but it can cause jumps:

```
Scenario:
- Server clock is 5 seconds ahead
- NTP daemon corrects by jumping back 5 seconds
- Your lock's "acquired at" timestamp is now in the future
- TTL calculations become wrong

Or worse:
- Admin manually adjusts clock
- Leap second handling
- VM clock sync after migration
```

Redlock's math depends on time moving forward predictably. Clock jumps violate this.

### Database-level locks are more reliable for single-DB scenarios

If all your data is in one PostgreSQL database, use PostgreSQL's locking:

```sql
-- Advisory lock (application-level, explicit)
SELECT pg_advisory_lock(12345);
-- ... do work ...
SELECT pg_advisory_unlock(12345);

-- Or row-level locking
SELECT * FROM bookings
WHERE room_id = 101
FOR UPDATE;  -- Blocks other transactions
```

**Why this is better:**

1. **Single source of truth:** The database that holds your data also holds the lock. No coordination needed.

2. **Transactional guarantees:** Lock release is tied to transaction commit/rollback. If your process crashes, the database automatically releases locks.

3. **No clock dependencies:** PostgreSQL uses transaction ordering, not wall-clock time.

4. **Proven correctness:** Database isolation levels have decades of research and testing.

```
Redlock:
[App] → [Redis 1]
      → [Redis 2]  → [Database]
      → [Redis 3]

Three systems that must coordinate correctly.

Database lock:
[App] → [Database]

One system. Database handles everything.
```

---

## When to Use Redis Locks

### Distributed system with multiple databases

```
                    [Redis Lock]
                         |
    ┌────────────────────┼────────────────────┐
    |                    |                    |
[Service A]         [Service B]          [Service C]
    |                    |                    |
[Postgres]          [MongoDB]             [MySQL]
```

When you need to coordinate across different data stores, there's no single database to use for locking. Redis (or similar) becomes necessary.

### Need to coordinate across services

```python
# Service A: Payment processor
with redis_lock("order:12345"):
    charge_credit_card()

# Service B: Inventory manager
with redis_lock("order:12345"):
    reduce_inventory()

# Service C: Shipping
with redis_lock("order:12345"):
    create_shipment()
```

Even if they share a database, microservices often use Redis locks for simplicity and to avoid tight database coupling.

### Can tolerate occasional failures

Redis locks are for **efficiency**, not **correctness**:

- **Efficiency use case:** Prevent duplicate work (e.g., don't send the same email twice). If the lock fails, worst case is two emails—annoying but not catastrophic.

- **Correctness use case:** Financial transactions, inventory that must not go negative. Lock failure = money lost or data corruption.

```python
# Efficiency (Redis lock OK):
with redis_lock("send_reminder:user123"):
    if not already_sent():
        send_reminder_email()  # Duplicate is annoying, not dangerous

# Correctness (need stronger guarantees):
with database_transaction():
    SELECT balance FROM accounts WHERE id=123 FOR UPDATE;
    if balance >= amount:
        UPDATE accounts SET balance = balance - amount;
```

---

## When NOT to Use

### Single database (use DB locks instead)

If everything is in PostgreSQL:

```python
# Don't do this:
redis_lock = acquire_redis_lock("booking:room101")
cursor.execute("INSERT INTO bookings ...")
redis_lock.release()

# Do this instead:
cursor.execute("""
    INSERT INTO bookings (room_id, check_in, check_out)
    SELECT 101, '2024-01-15', '2024-01-17'
    WHERE NOT EXISTS (
        SELECT 1 FROM bookings
        WHERE room_id = 101
        AND daterange(check_in, check_out) && daterange('2024-01-15', '2024-01-17')
        AND status != 'cancelled'
    )
""")
# Or use FOR UPDATE with explicit locking
```

Adding Redis just adds complexity and failure modes.

### Strict correctness required (use consensus like Raft/Paxos)

For truly critical coordination, use systems designed for consensus:

| System | Use Case |
|--------|----------|
| **etcd** | Kubernetes uses it for cluster state |
| **ZooKeeper** | Kafka, Hadoop coordination |
| **Consul** | Service discovery with strong consistency |

These implement Raft or Paxos algorithms that handle network partitions and failures with mathematical correctness proofs.

```python
# etcd example (strongly consistent):
lease = etcd_client.lease(ttl=30)
etcd_client.put("/locks/my-resource", "locked", lease=lease)
# If this succeeds, you definitely have the lock
# etcd's Raft consensus guarantees it
```

**The tradeoff:** Consensus systems are slower (multiple round-trips for agreement) but correct. Redis is faster but has edge cases.

---

## Node.js Alternatives to Redlock

### etcd with Node.js

```javascript
const { Etcd3 } = require('etcd3');
const client = new Etcd3();

async function withEtcdLock(resource, fn) {
  const lock = client.lock(resource);

  try {
    await lock.acquire();
    return await fn();
  } finally {
    await lock.release();
  }
}

// Usage
await withEtcdLock('my-resource', async () => {
  // Strongly consistent critical section
  await performCriticalWork();
});
```

### ZooKeeper with Node.js

```javascript
const zookeeper = require('node-zookeeper-client');

function createZkLock(client, path) {
  return new Promise((resolve, reject) => {
    client.create(
      path,
      Buffer.from('locked'),
      zookeeper.CreateMode.EPHEMERAL,
      (error) => {
        if (error) {
          if (error.getCode() === zookeeper.Exception.NODE_EXISTS) {
            reject(new Error('Lock already held'));
          } else {
            reject(error);
          }
        } else {
          resolve({
            release: () => new Promise((res) => {
              client.remove(path, -1, res);
            })
          });
        }
      }
    );
  });
}
```

### Consul with Node.js

```javascript
const Consul = require('consul');
const consul = new Consul();

async function withConsulLock(key, fn) {
  // Create session
  const session = await consul.session.create({
    ttl: '30s',
    behavior: 'delete'
  });

  try {
    // Acquire lock
    const acquired = await consul.kv.set({
      key: `locks/${key}`,
      value: 'locked',
      acquire: session.ID
    });

    if (!acquired) {
      throw new Error('Failed to acquire lock');
    }

    return await fn();
  } finally {
    // Release by destroying session
    await consul.session.destroy(session.ID);
  }
}
```

---

## Summary: Decision Framework

```
Do you need a distributed lock?
│
├─ No: All data in one DB → Use database locks
│
└─ Yes: Multiple DBs/services
    │
    ├─ Can tolerate occasional duplicate work?
    │   └─ Yes → Redis/Redlock is fine
    │
    └─ Need strict correctness?
        └─ Use consensus (etcd, ZooKeeper, Consul)
```

### Quick Reference Table

| Requirement | Solution |
|-------------|----------|
| Single PostgreSQL DB | `SELECT ... FOR UPDATE` or `pg_advisory_lock` |
| Single MongoDB | Unique indexes + findAndModify |
| Microservices, best-effort | Single Redis instance lock |
| Microservices, high availability | Redlock (5 Redis instances) |
| Financial transactions | Database transactions + consensus system |
| Kubernetes coordination | etcd (built-in) |
| Kafka/Hadoop coordination | ZooKeeper |

---

## Related Topics

- [Redis Primer](./redis_primer.md) - Basic Redis concepts and data types
