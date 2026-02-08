# Security Patterns - Interview Knowledge Base

## Authentication Security

### Timing Attack Prevention

**Problem:** Different response times leak information about what failed.

```typescript
// BAD: Timing attack vulnerable
async function login(email: string, password: string) {
  const user = await findUserByEmail(email);
  if (!user) {
    return { error: 'Invalid credentials' };  // Fast response
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return { error: 'Invalid credentials' };  // Slow response (bcrypt)
  }

  return { token: generateToken(user) };
}
```

**Attack:** Attacker measures response time. Fast = email doesn't exist. Slow = email exists.

**Solution:** Always perform bcrypt comparison
```typescript
// GOOD: Constant-time response
async function login(email: string, password: string) {
  const user = await findUserByEmail(email);

  // Always compare against something
  const hashToCompare = user?.passwordHash ?? DUMMY_HASH;
  const valid = await bcrypt.compare(password, hashToCompare);

  if (!user || !valid) {
    return { error: 'Invalid credentials' };
  }

  return { token: generateToken(user) };
}

// Pre-computed dummy hash for non-existent users
const DUMMY_HASH = await bcrypt.hash('dummy', 12);
```

### User Enumeration Prevention

**Vulnerable endpoints:**
- Login: "User not found" vs "Invalid password"
- Registration: "Email already exists"
- Password reset: "Email sent" vs "User not found"

**Secure patterns:**
```typescript
// Registration - always succeed externally
async function register(email: string, password: string) {
  const existing = await findUserByEmail(email);

  if (existing) {
    // Send "already registered" email instead of error
    await sendAlreadyRegisteredEmail(email);
  } else {
    await createUser(email, password);
    await sendVerificationEmail(email);
  }

  // Same response regardless
  return { message: 'Check your email to continue' };
}

// Password reset - always succeed externally
async function requestPasswordReset(email: string) {
  const user = await findUserByEmail(email);

  if (user) {
    const token = generateResetToken();
    await saveResetToken(user.id, token);
    await sendResetEmail(email, token);
  }
  // Don't send email if user doesn't exist, but same response

  return { message: 'If an account exists, reset instructions were sent' };
}
```

---

## Password Security

### Bcrypt Configuration
```typescript
// Cost factor recommendations
const BCRYPT_ROUNDS = 12;  // ~250ms on modern hardware

// Adjust based on server capacity
// Higher = more secure but slower
// 10 = ~100ms
// 12 = ~250ms (recommended minimum)
// 14 = ~1s

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_ROUNDS);
}
```

### Password Requirements
```typescript
const PASSWORD_POLICY = {
  minLength: 12,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecial: true,
  maxLength: 128,  // Prevent DoS via very long passwords
};

function validatePassword(password: string): ValidationResult {
  const errors: string[] = [];

  if (password.length < PASSWORD_POLICY.minLength) {
    errors.push(`Minimum ${PASSWORD_POLICY.minLength} characters`);
  }
  if (password.length > PASSWORD_POLICY.maxLength) {
    errors.push(`Maximum ${PASSWORD_POLICY.maxLength} characters`);
  }
  // ... other checks

  return { valid: errors.length === 0, errors };
}
```

---

## Rate Limiting

### Per-IP Rate Limiting (Redis)
```typescript
import { RateLimiterRedis } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: 100,          // Number of requests
  duration: 60,         // Per 60 seconds
  blockDuration: 60,    // Block for 60s when exceeded
});

async function rateLimitMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    await rateLimiter.consume(req.ip);
    next();
  } catch (error) {
    res.status(429).json({
      error: 'Too many requests',
      retryAfter: error.msBeforeNext / 1000
    });
  }
}
```

### Sliding Window Rate Limiter
```typescript
class SlidingWindowRateLimiter {
  constructor(
    private redis: Redis,
    private windowMs: number,
    private maxRequests: number
  ) {}

  async isAllowed(key: string): Promise<boolean> {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    // Use sorted set with timestamp as score
    const multi = this.redis.multi();
    multi.zremrangebyscore(key, 0, windowStart);  // Remove old entries
    multi.zadd(key, now.toString(), `${now}-${Math.random()}`);  // Add current
    multi.zcard(key);  // Count entries in window
    multi.expire(key, Math.ceil(this.windowMs / 1000));

    const results = await multi.exec();
    const count = results[2][1] as number;

    return count <= this.maxRequests;
  }
}
```

### Endpoint-Specific Limits
```typescript
const RATE_LIMITS = {
  'POST /auth/login': { points: 5, duration: 60 },      // 5 attempts/min
  'POST /auth/register': { points: 3, duration: 60 },   // 3 registrations/min
  'POST /auth/reset': { points: 2, duration: 300 },     // 2 resets/5min
  'GET /api/*': { points: 100, duration: 60 },          // 100 req/min
  'POST /api/*': { points: 30, duration: 60 },          // 30 writes/min
};
```

---

## JWT Security

### Token Structure
```typescript
interface JWTPayload {
  sub: string;        // User ID
  email: string;
  roles: string[];
  iat: number;        // Issued at
  exp: number;        // Expiration
  jti: string;        // JWT ID for revocation
}

const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY = '7d';

function generateTokens(user: User) {
  const accessToken = jwt.sign(
    { sub: user.id, email: user.email, roles: user.roles },
    process.env.JWT_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRY }
  );

  const refreshToken = jwt.sign(
    { sub: user.id, jti: crypto.randomUUID() },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRY }
  );

  return { accessToken, refreshToken };
}
```

### Token Revocation
```typescript
// Store revoked tokens (or use allowlist approach)
async function revokeToken(jti: string, expiresAt: Date) {
  await redis.set(
    `revoked:${jti}`,
    '1',
    'EXAT',
    Math.floor(expiresAt.getTime() / 1000)
  );
}

async function isTokenRevoked(jti: string): Promise<boolean> {
  return await redis.exists(`revoked:${jti}`) === 1;
}
```

---

## Input Validation & Sanitization

### Schema Validation (Zod)
```typescript
import { z } from 'zod';

const CreateUserSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(12).max(128),
  name: z.string().min(1).max(100).regex(/^[a-zA-Z\s]+$/),
});

// In controller
async function createUser(req: Request, res: Response) {
  const result = CreateUserSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: 'Validation failed',
      details: result.error.flatten()
    });
  }

  // result.data is typed and validated
  await userService.create(result.data);
}
```

### SQL Injection Prevention
```typescript
// BAD: String interpolation
const query = `SELECT * FROM users WHERE email = '${email}'`;

// GOOD: Parameterized queries
const user = await prisma.user.findUnique({ where: { email } });

// GOOD: Raw query with parameters
const users = await prisma.$queryRaw`
  SELECT * FROM users WHERE email = ${email}
`;
```

### XSS Prevention
```typescript
// Sanitize HTML output
import DOMPurify from 'isomorphic-dompurify';

function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p'],
    ALLOWED_ATTR: ['href']
  });
}

// Set security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    }
  },
  xssFilter: true,
}));
```

---

## CORS Configuration

```typescript
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      'https://app.example.com',
      'https://admin.example.com',
    ];

    // Allow requests with no origin (mobile apps, Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400, // 24 hours
};

app.use(cors(corsOptions));
```

---

## Authorization Patterns

### Role-Based Access Control (RBAC)
```typescript
enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

const PERMISSIONS = {
  'booking:create': [Role.USER, Role.ADMIN],
  'booking:delete': [Role.ADMIN],
  'user:manage': [Role.ADMIN, Role.SUPER_ADMIN],
  'system:config': [Role.SUPER_ADMIN],
};

function authorize(...requiredRoles: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRoles = req.user?.roles ?? [];

    const hasPermission = requiredRoles.some(role =>
      userRoles.includes(role)
    );

    if (!hasPermission) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    next();
  };
}

// Usage
router.delete('/bookings/:id', authorize(Role.ADMIN), deleteBooking);
```

### Resource-Based Authorization
```typescript
// Check ownership before allowing action
async function updateBooking(userId: string, bookingId: string, data: UpdateData) {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId }
  });

  if (!booking) {
    throw new NotFoundError('Booking not found');
  }

  if (booking.userId !== userId && !isAdmin(userId)) {
    throw new ForbiddenError('Not authorized to modify this booking');
  }

  return prisma.booking.update({
    where: { id: bookingId },
    data
  });
}
```

---

## Security Headers Checklist

```typescript
// helmet.js configuration
app.use(helmet({
  // Prevent clickjacking
  frameguard: { action: 'deny' },

  // Prevent MIME type sniffing
  noSniff: true,

  // XSS protection
  xssFilter: true,

  // HTTPS enforcement
  hsts: {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true,
  },

  // Referrer policy
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },

  // Content Security Policy
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'", 'https://api.example.com'],
    }
  },
}));
```

---

## Sensitive Data Handling

### Never Log Sensitive Data
```typescript
// BAD
logger.info('User login attempt', { email, password });

// GOOD
logger.info('User login attempt', { email, passwordProvided: !!password });
```

### Mask Sensitive Fields in Responses
```typescript
function sanitizeUser(user: User): SafeUser {
  const { passwordHash, resetToken, ...safeFields } = user;
  return safeFields;
}
```

### Secure Cookie Configuration
```typescript
res.cookie('session', sessionId, {
  httpOnly: true,       // Not accessible via JavaScript
  secure: true,         // HTTPS only
  sameSite: 'strict',   // CSRF protection
  maxAge: 3600000,      // 1 hour
  path: '/',
});
```

---

*Last updated: 2024-01*
