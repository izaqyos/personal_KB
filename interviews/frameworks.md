# Frameworks Deep Dive - Interview Knowledge Base

## NestJS

### Module System
```typescript
@Module({
  imports: [DatabaseModule, CacheModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],  // Available to importing modules
})
export class UserModule {}
```

### Dependency Injection Scopes
```typescript
// Singleton (default) - one instance for entire app
@Injectable()
export class ConfigService {}

// Request - new instance per request
@Injectable({ scope: Scope.REQUEST })
export class RequestContextService {}

// Transient - new instance each injection
@Injectable({ scope: Scope.TRANSIENT })
export class HelperService {}
```

### Custom Decorators
```typescript
// Parameter decorator
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

// Usage
@Get('profile')
getProfile(@CurrentUser() user: User) {
  return user;
}

// Composite decorator
export function Auth(...roles: Role[]) {
  return applyDecorators(
    UseGuards(JwtAuthGuard, RolesGuard),
    Roles(...roles),
    ApiBearerAuth(),
  );
}
```

### Exception Filters
```typescript
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: exception.message,
    });
  }
}

// Global filter
app.useGlobalFilters(new HttpExceptionFilter());
```

### Interceptors
```typescript
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map(data => ({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      })),
    );
  }
}

// Timing interceptor
@Injectable()
export class TimingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - start;
        console.log(`Request took ${duration}ms`);
      }),
    );
  }
}
```

### Pipes
```typescript
// Validation pipe
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@Post()
create(@Body() dto: CreateUserDto) { }

// Custom pipe
@Injectable()
export class ParseUUIDPipe implements PipeTransform {
  transform(value: string): string {
    if (!isUUID(value)) {
      throw new BadRequestException('Invalid UUID');
    }
    return value;
  }
}
```

---

## Prisma

### Schema Definition
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  posts     Post[]
  profile   Profile?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([email])
  @@map("users")
}

model Post {
  id        String   @id @default(uuid())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  String

  @@index([authorId])
}
```

### Query Patterns
```typescript
// Include relations
const user = await prisma.user.findUnique({
  where: { id },
  include: {
    posts: { where: { published: true } },
    profile: true,
  },
});

// Select specific fields
const users = await prisma.user.findMany({
  select: {
    id: true,
    email: true,
    _count: { select: { posts: true } },
  },
});

// Nested writes
const user = await prisma.user.create({
  data: {
    email: 'user@example.com',
    profile: {
      create: { bio: 'Developer' },
    },
    posts: {
      create: [
        { title: 'First Post' },
        { title: 'Second Post' },
      ],
    },
  },
});

// Upsert
const user = await prisma.user.upsert({
  where: { email },
  update: { name },
  create: { email, name },
});
```

### Transactions
```typescript
// Interactive transaction
const result = await prisma.$transaction(async (tx) => {
  const user = await tx.user.create({ data: userData });
  const profile = await tx.profile.create({
    data: { ...profileData, userId: user.id },
  });
  return { user, profile };
});

// Sequential operations
const [user, post] = await prisma.$transaction([
  prisma.user.create({ data: userData }),
  prisma.post.create({ data: postData }),
]);

// With isolation level
await prisma.$transaction(
  async (tx) => { /* ... */ },
  { isolationLevel: Prisma.TransactionIsolationLevel.Serializable }
);
```

### Middleware
```typescript
// Soft delete middleware
prisma.$use(async (params, next) => {
  if (params.model === 'User') {
    if (params.action === 'delete') {
      params.action = 'update';
      params.args.data = { deletedAt: new Date() };
    }
    if (params.action === 'deleteMany') {
      params.action = 'updateMany';
      params.args.data = { deletedAt: new Date() };
    }
  }
  return next(params);
});

// Query logging
prisma.$use(async (params, next) => {
  const start = Date.now();
  const result = await next(params);
  const duration = Date.now() - start;

  console.log(`${params.model}.${params.action}: ${duration}ms`);

  return result;
});
```

---

## Express

### Middleware Chain
```typescript
// Application-level
app.use(express.json());
app.use(cors());
app.use(morgan('combined'));

// Router-level
const router = express.Router();
router.use(authMiddleware);

// Error handling (must be last)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});
```

### Async Handler Wrapper
```typescript
// Wrap async route handlers to catch errors
const asyncHandler = (fn: RequestHandler): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Usage
router.get('/users/:id', asyncHandler(async (req, res) => {
  const user = await userService.findById(req.params.id);
  res.json(user);
}));
```

### Request Validation
```typescript
import { z } from 'zod';

const validateBody = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: result.error.flatten(),
      });
    }

    req.body = result.data;
    next();
  };
};

// Usage
const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
});

router.post('/users', validateBody(CreateUserSchema), createUser);
```

---

## React (Patterns for Full-Stack Context)

### Data Fetching with TanStack Query
```typescript
// Query
const { data, isLoading, error } = useQuery({
  queryKey: ['users', userId],
  queryFn: () => fetchUser(userId),
  staleTime: 5 * 60 * 1000,  // 5 minutes
});

// Mutation
const mutation = useMutation({
  mutationFn: createUser,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['users'] });
  },
});

// Optimistic update
const mutation = useMutation({
  mutationFn: updateUser,
  onMutate: async (newUser) => {
    await queryClient.cancelQueries({ queryKey: ['users', newUser.id] });
    const previous = queryClient.getQueryData(['users', newUser.id]);
    queryClient.setQueryData(['users', newUser.id], newUser);
    return { previous };
  },
  onError: (err, newUser, context) => {
    queryClient.setQueryData(['users', newUser.id], context?.previous);
  },
});
```

### Form Handling with React Hook Form
```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    // Handle login
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
      <input type="password" {...register('password')} />
      {errors.password && <span>{errors.password.message}</span>}
      <button type="submit">Login</button>
    </form>
  );
}
```

---

## Next.js (App Router)

### Server Components
```typescript
// app/users/page.tsx - Server Component by default
async function UsersPage() {
  const users = await prisma.user.findMany();  // Direct DB access

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### Server Actions
```typescript
// app/actions.ts
'use server'

export async function createUser(formData: FormData) {
  const email = formData.get('email') as string;

  await prisma.user.create({
    data: { email },
  });

  revalidatePath('/users');
}

// Usage in component
<form action={createUser}>
  <input name="email" type="email" />
  <button type="submit">Create</button>
</form>
```

### Route Handlers
```typescript
// app/api/users/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();
  const user = await prisma.user.create({ data: body });
  return NextResponse.json(user, { status: 201 });
}
```

---

## Zod

### Schema Composition
```typescript
// Base schemas
const EmailSchema = z.string().email();
const PasswordSchema = z.string().min(8).max(100);

// Object schema
const UserSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
  name: z.string().optional(),
  role: z.enum(['admin', 'user']).default('user'),
});

// Extend/merge
const CreateUserSchema = UserSchema.omit({ role: true });
const UpdateUserSchema = UserSchema.partial();

// Refinement
const RegistrationSchema = z.object({
  password: PasswordSchema,
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords must match',
  path: ['confirmPassword'],
});

// Transform
const DateSchema = z.string().transform(str => new Date(str));
```

### Integration with APIs
```typescript
// API response validation
const UserResponseSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  createdAt: z.string().datetime(),
});

async function fetchUser(id: string) {
  const response = await fetch(`/api/users/${id}`);
  const data = await response.json();
  return UserResponseSchema.parse(data);  // Throws if invalid
}

// Safe parse
const result = UserResponseSchema.safeParse(data);
if (result.success) {
  // result.data is typed
} else {
  // result.error contains validation errors
}
```

---

## BullMQ (Job Queues)

### Basic Setup
```typescript
import { Queue, Worker } from 'bullmq';

// Create queue
const emailQueue = new Queue('email', {
  connection: { host: 'localhost', port: 6379 },
});

// Add job
await emailQueue.add('welcome', {
  to: 'user@example.com',
  subject: 'Welcome!',
}, {
  attempts: 3,
  backoff: { type: 'exponential', delay: 1000 },
  removeOnComplete: true,
  removeOnFail: 100,
});

// Process jobs
const worker = new Worker('email', async (job) => {
  await sendEmail(job.data);
}, {
  connection: { host: 'localhost', port: 6379 },
  concurrency: 5,
});

// Events
worker.on('completed', (job) => console.log(`Job ${job.id} completed`));
worker.on('failed', (job, err) => console.error(`Job ${job?.id} failed`, err));
```

### Scheduled Jobs
```typescript
// Repeat every hour
await emailQueue.add('digest', { type: 'daily' }, {
  repeat: { every: 60 * 60 * 1000 },
});

// Cron expression
await emailQueue.add('report', {}, {
  repeat: { cron: '0 9 * * 1' },  // Every Monday at 9am
});
```

---

*Last updated: 2024-01*
