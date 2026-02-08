# Resilience Patterns - Interview Knowledge Base

## Circuit Breaker

### Purpose
Prevent cascade failures by "tripping" when a service is unhealthy.

### States
```
       Success
    ┌───────────┐
    │           ▼
┌───────┐   ┌───────┐   ┌──────────┐
│ CLOSED│──▶│ OPEN  │──▶│HALF-OPEN │
└───────┘   └───────┘   └──────────┘
 Failures    Timeout      Test
 exceed      expires      request
 threshold
```

### Implementation
```typescript
enum CircuitState {
  CLOSED = 'CLOSED',
  OPEN = 'OPEN',
  HALF_OPEN = 'HALF_OPEN',
}

class CircuitBreaker {
  private state = CircuitState.CLOSED;
  private failures = 0;
  private lastFailure: Date | null = null;
  private successfulProbes = 0;

  constructor(
    private readonly threshold: number = 5,
    private readonly timeout: number = 30000,
    private readonly probeCount: number = 3,
  ) {}

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === CircuitState.OPEN) {
      if (Date.now() - this.lastFailure!.getTime() > this.timeout) {
        this.state = CircuitState.HALF_OPEN;
        this.successfulProbes = 0;
      } else {
        throw new CircuitOpenError('Circuit is open');
      }
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess() {
    if (this.state === CircuitState.HALF_OPEN) {
      this.successfulProbes++;
      if (this.successfulProbes >= this.probeCount) {
        this.state = CircuitState.CLOSED;
        this.failures = 0;
      }
    } else {
      this.failures = 0;
    }
  }

  private onFailure() {
    this.failures++;
    this.lastFailure = new Date();

    if (this.failures >= this.threshold) {
      this.state = CircuitState.OPEN;
    }
  }
}

// Usage
const paymentCircuit = new CircuitBreaker(5, 30000);

async function processPayment(data: PaymentData) {
  return paymentCircuit.execute(() => paymentApi.charge(data));
}
```

---

## Retry with Exponential Backoff

### Basic Pattern
```typescript
interface RetryOptions {
  maxRetries: number;
  baseDelay: number;
  maxDelay: number;
  retryableErrors?: (error: Error) => boolean;
}

async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions
): Promise<T> {
  const { maxRetries, baseDelay, maxDelay, retryableErrors } = options;

  let lastError: Error;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      // Check if should retry
      if (attempt === maxRetries) break;
      if (retryableErrors && !retryableErrors(error)) break;

      // Exponential backoff with jitter
      const delay = Math.min(
        baseDelay * Math.pow(2, attempt) + Math.random() * 1000,
        maxDelay
      );

      await sleep(delay);
    }
  }

  throw lastError!;
}

// Usage
const result = await withRetry(
  () => externalApi.fetchData(),
  {
    maxRetries: 3,
    baseDelay: 1000,
    maxDelay: 10000,
    retryableErrors: (e) => e.status >= 500 || e.code === 'ECONNRESET',
  }
);
```

### With Jitter (Prevent Thundering Herd)
```typescript
function calculateBackoff(attempt: number, baseDelay: number): number {
  // Full jitter
  const exponentialDelay = baseDelay * Math.pow(2, attempt);
  return Math.random() * exponentialDelay;

  // Or: Decorrelated jitter (better distribution)
  // return Math.min(maxDelay, Math.random() * baseDelay * 3 * Math.pow(2, attempt));
}
```

---

## Timeout Pattern

### Request Timeout
```typescript
async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  message = 'Operation timed out'
): Promise<T> {
  const timeout = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new TimeoutError(message)), timeoutMs);
  });

  return Promise.race([promise, timeout]);
}

// Usage
const data = await withTimeout(
  externalApi.fetchData(),
  5000,
  'External API timed out'
);
```

### Axios Timeout
```typescript
const client = axios.create({
  timeout: 5000,
  timeoutErrorMessage: 'Request timed out',
});
```

---

## Bulkhead Pattern

### Purpose
Isolate failures - don't let one slow operation consume all resources.

### Implementation
```typescript
class Bulkhead {
  private running = 0;
  private queue: Array<() => void> = [];

  constructor(
    private readonly maxConcurrent: number,
    private readonly maxQueue: number = 100,
  ) {}

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.running >= this.maxConcurrent) {
      if (this.queue.length >= this.maxQueue) {
        throw new BulkheadFullError('Bulkhead queue is full');
      }

      await new Promise<void>((resolve) => {
        this.queue.push(resolve);
      });
    }

    this.running++;
    try {
      return await fn();
    } finally {
      this.running--;
      const next = this.queue.shift();
      if (next) next();
    }
  }
}

// Separate bulkheads for different operations
const paymentBulkhead = new Bulkhead(10);  // Max 10 concurrent payments
const notificationBulkhead = new Bulkhead(50);  // Max 50 concurrent notifications

async function processPayment(data: PaymentData) {
  return paymentBulkhead.execute(() => paymentApi.charge(data));
}
```

---

## Fallback Pattern

### Graceful Degradation
```typescript
async function getProductRecommendations(userId: string): Promise<Product[]> {
  try {
    // Primary: ML-based recommendations
    return await recommendationService.personalized(userId);
  } catch (error) {
    logger.warn('Recommendation service failed, using fallback', { error });

    try {
      // Fallback: Popular products
      return await productService.getPopular();
    } catch (fallbackError) {
      logger.error('Fallback also failed', { fallbackError });

      // Last resort: Empty array (UI handles gracefully)
      return [];
    }
  }
}
```

### Cache as Fallback
```typescript
async function getExchangeRates(): Promise<ExchangeRates> {
  const cacheKey = 'exchange-rates';

  try {
    const rates = await externalApi.getExchangeRates();
    await cache.set(cacheKey, rates, 3600);  // Cache for 1 hour
    return rates;
  } catch (error) {
    // Return stale cache if API fails
    const cached = await cache.get<ExchangeRates>(cacheKey);
    if (cached) {
      logger.warn('Using cached exchange rates due to API failure');
      return cached;
    }
    throw error;  // No fallback available
  }
}
```

---

## Health Checks

### Liveness vs Readiness
```typescript
// Liveness: Is the process running?
app.get('/health/live', (req, res) => {
  res.status(200).json({ status: 'alive' });
});

// Readiness: Can the service handle requests?
app.get('/health/ready', async (req, res) => {
  const checks = {
    database: false,
    redis: false,
    externalApi: false,
  };

  try {
    await prisma.$queryRaw`SELECT 1`;
    checks.database = true;
  } catch {}

  try {
    await redis.ping();
    checks.redis = true;
  } catch {}

  try {
    await withTimeout(externalApi.healthCheck(), 2000);
    checks.externalApi = true;
  } catch {}

  const allHealthy = Object.values(checks).every(Boolean);
  res.status(allHealthy ? 200 : 503).json({
    status: allHealthy ? 'ready' : 'degraded',
    checks,
  });
});
```

### Dependency Health
```typescript
interface HealthCheck {
  name: string;
  check: () => Promise<boolean>;
  critical: boolean;  // Service can't run without it
}

const healthChecks: HealthCheck[] = [
  {
    name: 'database',
    check: async () => {
      await prisma.$queryRaw`SELECT 1`;
      return true;
    },
    critical: true,
  },
  {
    name: 'redis',
    check: async () => {
      await redis.ping();
      return true;
    },
    critical: false,  // Service can run in degraded mode
  },
];
```

---

## Graceful Shutdown

### Pattern
```typescript
async function gracefulShutdown(signal: string) {
  logger.info(`Received ${signal}, starting graceful shutdown`);

  // Stop accepting new connections
  server.close();

  // Wait for in-flight requests (with timeout)
  await Promise.race([
    new Promise((resolve) => {
      server.on('close', resolve);
    }),
    new Promise((resolve) => setTimeout(resolve, 30000)),
  ]);

  // Close database connections
  await prisma.$disconnect();

  // Close Redis connections
  await redis.quit();

  logger.info('Graceful shutdown complete');
  process.exit(0);
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
```

### NestJS
```typescript
// main.ts
app.enableShutdownHooks();

// In module
@Injectable()
export class PrismaService implements OnModuleDestroy {
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
```

---

## Rate Limiting (Self-Protection)

### Protect Against Overload
```typescript
const rateLimiter = new RateLimiterRedis({
  storeClient: redis,
  points: 1000,        // Max requests
  duration: 1,         // Per second
  blockDuration: 10,   // Block for 10s when exceeded
});

app.use(async (req, res, next) => {
  try {
    await rateLimiter.consume(req.ip);
    next();
  } catch {
    res.status(429).json({
      error: 'Too many requests',
      retryAfter: 10,
    });
  }
});
```

---

## Load Shedding

### Priority-Based Shedding
```typescript
enum Priority {
  CRITICAL = 1,  // Health checks, auth
  HIGH = 2,      // User-facing operations
  MEDIUM = 3,    // Background jobs
  LOW = 4,       // Analytics, logging
}

class LoadShedder {
  private currentLoad = 0;
  private readonly maxLoad = 1000;

  async execute<T>(fn: () => Promise<T>, priority: Priority): Promise<T> {
    const loadThreshold = this.getThreshold(priority);

    if (this.currentLoad >= loadThreshold) {
      throw new LoadSheddingError(`Shedding priority ${priority} requests`);
    }

    this.currentLoad++;
    try {
      return await fn();
    } finally {
      this.currentLoad--;
    }
  }

  private getThreshold(priority: Priority): number {
    // Lower priority = lower threshold
    switch (priority) {
      case Priority.CRITICAL: return this.maxLoad;
      case Priority.HIGH: return this.maxLoad * 0.8;
      case Priority.MEDIUM: return this.maxLoad * 0.5;
      case Priority.LOW: return this.maxLoad * 0.3;
    }
  }
}
```

---

## Observability

### Structured Logging
```typescript
const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  formatters: {
    level: (label) => ({ level: label }),
  },
});

// Contextual logging
function createRequestLogger(req: Request) {
  return logger.child({
    requestId: req.headers['x-request-id'],
    userId: req.user?.id,
    path: req.path,
  });
}

// Usage
app.use((req, res, next) => {
  req.log = createRequestLogger(req);
  req.log.info('Request started');
  next();
});
```

### Metrics
```typescript
import { Counter, Histogram } from 'prom-client';

const httpRequests = new Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['method', 'path', 'status'],
});

const httpDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration',
  labelNames: ['method', 'path'],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5],
});

// Middleware
app.use((req, res, next) => {
  const end = httpDuration.startTimer({ method: req.method, path: req.path });
  res.on('finish', () => {
    end();
    httpRequests.inc({ method: req.method, path: req.path, status: res.statusCode });
  });
  next();
});
```

---

## Resilience Checklist

### External Dependencies
- [ ] Circuit breaker on all external calls
- [ ] Timeouts configured
- [ ] Retry with exponential backoff
- [ ] Fallback/degraded mode

### Self-Protection
- [ ] Rate limiting
- [ ] Load shedding for extreme cases
- [ ] Request validation/sanitization
- [ ] Resource limits (connections, memory)

### Operations
- [ ] Health check endpoints
- [ ] Graceful shutdown
- [ ] Structured logging
- [ ] Metrics collection
- [ ] Alerting configured

---

*Last updated: 2024-01*
