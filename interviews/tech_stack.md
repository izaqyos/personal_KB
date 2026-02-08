# Technology Stack Comparisons - Interview Knowledge Base

## ORM Comparisons

### Prisma vs TypeORM vs Drizzle

| Feature | Prisma | TypeORM | Drizzle |
|---------|--------|---------|---------|
| Type Safety | Excellent (generated) | Good (decorators) | Excellent (inference) |
| Learning Curve | Low | Medium | Low |
| Raw SQL | `$queryRaw` | `query()` | Native SQL-like |
| Migrations | Built-in | Built-in | Kit (separate) |
| Performance | Good | Good | Excellent |
| Bundle Size | Large | Large | Small |
| Schema Definition | Prisma schema | Decorators/Entities | TypeScript |

### Prisma
**Pros:**
- Auto-generated types
- Intuitive query API
- Prisma Studio GUI
- Excellent documentation

**Cons:**
- No native `FOR UPDATE` (need raw queries)
- Large client bundle
- Schema changes require regeneration

```typescript
// Prisma
const user = await prisma.user.findUnique({
  where: { id },
  include: { posts: true },
});
```

### TypeORM
**Pros:**
- Mature ecosystem
- Active Record & Data Mapper patterns
- Complex queries support

**Cons:**
- Verbose configuration
- Less type-safe than Prisma
- Query builder learning curve

```typescript
// TypeORM
const user = await userRepository.findOne({
  where: { id },
  relations: ['posts'],
});
```

### Drizzle
**Pros:**
- SQL-like syntax
- Tiny bundle (~7kb)
- Excellent performance
- Type inference (no codegen)

**Cons:**
- Newer, smaller ecosystem
- Less documentation

```typescript
// Drizzle
const user = await db
  .select()
  .from(users)
  .where(eq(users.id, id))
  .leftJoin(posts, eq(posts.userId, users.id));
```

---

## Backend Frameworks

### NestJS vs Express vs Fastify

| Feature | NestJS | Express | Fastify |
|---------|--------|---------|---------|
| Architecture | Opinionated (Angular-like) | Minimal | Minimal |
| TypeScript | First-class | Middleware | Built-in |
| Performance | Good | Good | Excellent |
| Learning Curve | Steep | Low | Low |
| DI Container | Built-in | Manual | Manual |
| Validation | Built-in (class-validator) | Manual | Ajv |
| Testing | Built-in | Manual | Manual |

### When to Choose

**NestJS:**
- Large team projects
- Enterprise applications
- Need structure/conventions
- Microservices architecture

**Express:**
- Simple APIs
- Maximum flexibility
- Large middleware ecosystem
- Quick prototypes

**Fastify:**
- High-performance APIs
- JSON-heavy workloads
- Schema validation important
- Low memory footprint needed

---

## Database Comparisons

### PostgreSQL vs MySQL vs MongoDB

| Feature | PostgreSQL | MySQL | MongoDB |
|---------|------------|-------|---------|
| Type | Relational | Relational | Document |
| ACID | Full | Full | Multi-doc (4.0+) |
| JSON Support | JSONB (excellent) | JSON (good) | Native |
| Scaling | Vertical (+ Citus) | Vertical (+ sharding) | Horizontal |
| Use Case | Complex queries | Web apps | Flexible schema |

### When to Choose

**PostgreSQL:**
- Complex relationships
- JSONB with relational
- Advanced features (CTE, window functions)
- Data integrity critical

**MySQL:**
- Simple web applications
- Read-heavy workloads
- Large existing ecosystem
- Replication simplicity

**MongoDB:**
- Rapidly changing schema
- Document-centric data
- Horizontal scaling needed
- Geospatial queries

---

## Caching Solutions

### Redis vs Memcached

| Feature | Redis | Memcached |
|---------|-------|-----------|
| Data Structures | Rich (lists, sets, hashes) | Key-value only |
| Persistence | Optional | None |
| Pub/Sub | Yes | No |
| Clustering | Redis Cluster | Manual |
| Memory Efficiency | Less | More |
| Lua Scripting | Yes | No |

### When to Choose

**Redis:**
- Need data structures
- Pub/sub messaging
- Session storage
- Rate limiting
- Leaderboards

**Memcached:**
- Simple caching
- Memory efficiency critical
- Multi-threaded performance
- Simple key-value needs

---

## Message Queues

### RabbitMQ vs Kafka vs Redis Pub/Sub

| Feature | RabbitMQ | Kafka | Redis Pub/Sub |
|---------|----------|-------|---------------|
| Pattern | Message broker | Event streaming | Pub/Sub |
| Persistence | Configurable | Yes (log) | No |
| Throughput | ~50k msg/s | ~1M msg/s | ~100k msg/s |
| Ordering | Per queue | Per partition | None |
| Use Case | Task queues | Event sourcing | Real-time |

### When to Choose

**RabbitMQ:**
- Complex routing
- Task queues
- Request/reply patterns
- Flexible acknowledgments

**Kafka:**
- Event sourcing
- Log aggregation
- High throughput
- Replay capability needed

**Redis Pub/Sub:**
- Real-time notifications
- Simple use cases
- Already using Redis
- Fire-and-forget OK

---

## Authentication

### JWT vs Sessions

| Aspect | JWT | Sessions |
|--------|-----|----------|
| Storage | Client (stateless) | Server (stateful) |
| Scalability | Excellent | Needs shared store |
| Revocation | Difficult | Easy |
| Size | Larger | Small ID |
| Mobile | Better | Cookie issues |

### When to Choose

**JWT:**
- Microservices
- Mobile apps
- Stateless architecture
- Cross-domain auth

**Sessions:**
- Traditional web apps
- Easy revocation needed
- Sensitive data
- Server-side control

---

## Testing Frameworks

### Jest vs Vitest vs Mocha

| Feature | Jest | Vitest | Mocha |
|---------|------|--------|-------|
| Speed | Good | Excellent | Good |
| Config | Zero-config | Zero-config | Manual |
| ESM Support | Limited | Native | Good |
| Mocking | Built-in | Built-in | Manual |
| Watch Mode | Yes | Yes (fast) | Plugin |

### When to Choose

**Jest:**
- React projects
- Comprehensive tooling
- Large ecosystem

**Vitest:**
- Vite projects
- Fast execution
- ESM-first

**Mocha:**
- Maximum flexibility
- Custom setup
- Legacy projects

---

## Validation Libraries

### Zod vs Yup vs class-validator

| Feature | Zod | Yup | class-validator |
|---------|-----|-----|-----------------|
| TypeScript | Excellent | Good | Decorators |
| Bundle Size | ~12kb | ~15kb | ~30kb |
| Schema Style | Chained | Chained | Decorators |
| Async | Yes | Yes | Yes |

### Zod Example
```typescript
const UserSchema = z.object({
  email: z.string().email(),
  age: z.number().min(0).optional(),
  role: z.enum(['admin', 'user']),
});

type User = z.infer<typeof UserSchema>;
```

### class-validator Example
```typescript
class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  age?: number;

  @IsEnum(Role)
  role: Role;
}
```

---

## HTTP Clients

### Axios vs Fetch vs Got

| Feature | Axios | Fetch (native) | Got |
|---------|-------|----------------|-----|
| Browser | Yes | Yes | No |
| Node.js | Yes | Node 18+ | Yes |
| Interceptors | Yes | Manual | Hooks |
| Timeout | Built-in | AbortController | Built-in |
| Retry | Plugin | Manual | Built-in |

### When to Choose

**Axios:**
- Browser + Node
- Interceptors needed
- Large existing codebase

**Fetch:**
- Modern browsers
- Minimal dependencies
- Simple requests

**Got:**
- Node.js only
- Advanced features
- Retry/pagination built-in

---

## Deployment Platforms

### Vercel vs AWS vs Railway

| Aspect | Vercel | AWS | Railway |
|--------|--------|-----|---------|
| Ease | Very easy | Complex | Easy |
| Serverless | Yes | Lambda | Yes |
| Containers | No | ECS/EKS | Yes |
| Databases | Postgres (preview) | RDS/Aurora | Built-in |
| Cost | Higher | Pay-per-use | Reasonable |
| Scale | Auto | Manual/Auto | Auto |

### When to Choose

**Vercel:**
- Next.js/React
- JAMstack
- Quick deployment
- Frontend-heavy

**AWS:**
- Full control
- Complex architecture
- Cost optimization
- Enterprise compliance

**Railway:**
- Quick start
- Full-stack apps
- Database included
- Small-medium projects

---

## State Management (Frontend)

### Redux vs Zustand vs Jotai

| Feature | Redux | Zustand | Jotai |
|---------|-------|---------|-------|
| Boilerplate | High | Low | Low |
| Bundle Size | Large | ~2kb | ~3kb |
| DevTools | Excellent | Good | Good |
| Learning Curve | Steep | Low | Low |
| Pattern | Flux | Simplified Flux | Atomic |

### When to Choose

**Redux:**
- Large applications
- Complex state logic
- Team familiarity
- Time-travel debugging

**Zustand:**
- Simple global state
- Minimal boilerplate
- Quick setup

**Jotai:**
- Atomic updates
- React Suspense
- Fine-grained reactivity

---

*Last updated: 2024-01*
