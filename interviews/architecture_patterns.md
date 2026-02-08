# Architecture Patterns - Interview Knowledge Base

## Layered Architecture

### Standard Layers
```
┌─────────────────────────────────────┐
│         Presentation Layer          │  Controllers, Routes, GraphQL Resolvers
├─────────────────────────────────────┤
│          Application Layer          │  Use Cases, Services, Orchestration
├─────────────────────────────────────┤
│           Domain Layer              │  Entities, Business Logic, Validation
├─────────────────────────────────────┤
│        Infrastructure Layer         │  DB, External APIs, Caching
└─────────────────────────────────────┘
```

### NestJS Implementation
```typescript
// Controller (Presentation)
@Controller('bookings')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() dto: CreateBookingDto, @User() user: AuthUser) {
    return this.bookingService.createBooking(dto, user.id);
  }
}

// Service (Application)
@Injectable()
export class BookingService {
  constructor(
    private bookingRepo: BookingRepository,
    private roomRepo: RoomRepository,
    private eventEmitter: EventEmitter2,
  ) {}

  async createBooking(dto: CreateBookingDto, userId: string): Promise<Booking> {
    const room = await this.roomRepo.findById(dto.roomId);
    if (!room) throw new NotFoundException('Room not found');

    const booking = await this.bookingRepo.create({
      ...dto,
      userId,
      status: BookingStatus.CONFIRMED,
    });

    this.eventEmitter.emit('booking.created', booking);
    return booking;
  }
}

// Repository (Infrastructure)
@Injectable()
export class BookingRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateBookingData): Promise<Booking> {
    return this.prisma.booking.create({ data });
  }

  async findById(id: string): Promise<Booking | null> {
    return this.prisma.booking.findUnique({ where: { id } });
  }
}
```

---

## Dependency Injection

### Constructor Injection (Preferred)
```typescript
@Injectable()
export class BookingService {
  constructor(
    private readonly bookingRepo: BookingRepository,
    private readonly cacheService: CacheService,
    private readonly logger: LoggerService,
  ) {}
}
```

### Benefits
- Testability: Easy to mock dependencies
- Loose coupling: Depend on abstractions
- Explicit dependencies: Clear what a class needs

### Interface-Based DI
```typescript
// Define interface
interface IBookingRepository {
  findById(id: string): Promise<Booking | null>;
  create(data: CreateBookingData): Promise<Booking>;
}

// Token for DI
const BOOKING_REPOSITORY = Symbol('BookingRepository');

// Module registration
@Module({
  providers: [
    {
      provide: BOOKING_REPOSITORY,
      useClass: PrismaBookingRepository, // or MockBookingRepository
    },
  ],
})

// Injection
@Injectable()
export class BookingService {
  constructor(
    @Inject(BOOKING_REPOSITORY)
    private readonly bookingRepo: IBookingRepository,
  ) {}
}
```

---

## Repository Pattern

### Purpose
- Abstract data access logic
- Single source of truth for entity queries
- Easy to swap implementations (SQL → NoSQL)

### Implementation
```typescript
// Base repository interface
interface IRepository<T, ID> {
  findById(id: ID): Promise<T | null>;
  findAll(filter?: Partial<T>): Promise<T[]>;
  create(data: Omit<T, 'id'>): Promise<T>;
  update(id: ID, data: Partial<T>): Promise<T>;
  delete(id: ID): Promise<void>;
}

// Concrete implementation
@Injectable()
export class BookingRepository implements IRepository<Booking, string> {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Booking | null> {
    return this.prisma.booking.findUnique({
      where: { id },
      include: { room: true, user: true },
    });
  }

  async findByRoomAndDate(roomId: string, date: Date): Promise<Booking | null> {
    return this.prisma.booking.findFirst({
      where: {
        roomId,
        date,
        status: { in: ['HELD', 'CONFIRMED'] },
      },
    });
  }

  async create(data: CreateBookingData): Promise<Booking> {
    return this.prisma.booking.create({ data });
  }

  // ... other methods
}
```

---

## Service Layer Pattern

### Responsibilities
- Business logic orchestration
- Transaction management
- Cross-cutting concerns

### Example
```typescript
@Injectable()
export class BookingService {
  constructor(
    private bookingRepo: BookingRepository,
    private roomRepo: RoomRepository,
    private userRepo: UserRepository,
    private notificationService: NotificationService,
    private prisma: PrismaService,
  ) {}

  async createBooking(dto: CreateBookingDto, userId: string): Promise<Booking> {
    // Validation
    const [room, user] = await Promise.all([
      this.roomRepo.findById(dto.roomId),
      this.userRepo.findById(userId),
    ]);

    if (!room) throw new NotFoundException('Room not found');
    if (!user) throw new NotFoundException('User not found');

    // Business logic in transaction
    const booking = await this.prisma.$transaction(async (tx) => {
      // Check availability with lock
      const existing = await tx.booking.findFirst({
        where: {
          roomId: dto.roomId,
          date: dto.date,
          status: { in: ['HELD', 'CONFIRMED'] },
        },
      });

      if (existing) {
        throw new ConflictException('Room already booked');
      }

      return tx.booking.create({
        data: {
          roomId: dto.roomId,
          userId,
          date: dto.date,
          status: 'CONFIRMED',
        },
      });
    });

    // Side effects (outside transaction)
    await this.notificationService.sendBookingConfirmation(booking);

    return booking;
  }
}
```

---

## Guard Pattern (NestJS)

### Authentication Guard
```typescript
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      request.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }

  private extractToken(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
```

### Role-Based Guard
```typescript
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some(role => user.roles?.includes(role));
  }
}

// Decorator
export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);

// Usage
@Post()
@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
async adminOnlyAction() {}
```

---

## Middleware vs Interceptor vs Guard

| Component | When | Use Case |
|-----------|------|----------|
| **Middleware** | Before routing | Logging, CORS, body parsing |
| **Guard** | After routing, before handler | Auth, authorization |
| **Interceptor** | Before/after handler | Response transformation, caching, timing |
| **Pipe** | Before handler | Validation, transformation |
| **Exception Filter** | On exception | Error formatting, logging |

```
Request → Middleware → Guard → Interceptor (before) → Pipe → Handler
Response ← Exception Filter ← Interceptor (after) ← Handler
```

---

## Event-Driven Architecture

### Event Emitter Pattern
```typescript
// Events
interface BookingCreatedEvent {
  bookingId: string;
  userId: string;
  roomId: string;
  date: Date;
}

// Emitting
@Injectable()
export class BookingService {
  constructor(private eventEmitter: EventEmitter2) {}

  async createBooking(data: CreateBookingDto): Promise<Booking> {
    const booking = await this.bookingRepo.create(data);

    this.eventEmitter.emit('booking.created', {
      bookingId: booking.id,
      userId: booking.userId,
      roomId: booking.roomId,
      date: booking.date,
    });

    return booking;
  }
}

// Listening
@Injectable()
export class BookingNotificationListener {
  constructor(private notificationService: NotificationService) {}

  @OnEvent('booking.created')
  async handleBookingCreated(event: BookingCreatedEvent) {
    await this.notificationService.sendConfirmation(event);
  }
}

@Injectable()
export class BookingAnalyticsListener {
  constructor(private analyticsService: AnalyticsService) {}

  @OnEvent('booking.created')
  async handleBookingCreated(event: BookingCreatedEvent) {
    await this.analyticsService.trackBooking(event);
  }
}
```

---

## CQRS (Command Query Responsibility Segregation)

### Separation of Concerns
```typescript
// Commands (Write)
interface CreateBookingCommand {
  roomId: string;
  userId: string;
  date: Date;
}

@Injectable()
export class BookingCommandHandler {
  constructor(private writeRepo: BookingWriteRepository) {}

  async handle(command: CreateBookingCommand): Promise<string> {
    const booking = await this.writeRepo.create(command);
    return booking.id;
  }
}

// Queries (Read)
interface GetBookingsQuery {
  userId?: string;
  roomId?: string;
  dateRange?: { from: Date; to: Date };
}

@Injectable()
export class BookingQueryHandler {
  constructor(private readRepo: BookingReadRepository) {}

  async handle(query: GetBookingsQuery): Promise<BookingView[]> {
    return this.readRepo.findByFilter(query);
  }
}
```

---

## Module Organization

### Feature-Based Structure
```
src/
├── booking/
│   ├── booking.module.ts
│   ├── booking.controller.ts
│   ├── booking.service.ts
│   ├── booking.repository.ts
│   ├── dto/
│   │   ├── create-booking.dto.ts
│   │   └── booking-response.dto.ts
│   ├── entities/
│   │   └── booking.entity.ts
│   └── guards/
│       └── booking-owner.guard.ts
├── room/
│   ├── room.module.ts
│   └── ...
├── user/
│   ├── user.module.ts
│   └── ...
└── common/
    ├── guards/
    ├── interceptors/
    ├── filters/
    └── decorators/
```

### Module Definition
```typescript
@Module({
  imports: [
    PrismaModule,
    CacheModule,
    EventEmitterModule,
  ],
  controllers: [BookingController],
  providers: [
    BookingService,
    BookingRepository,
    BookingNotificationListener,
  ],
  exports: [BookingService],
})
export class BookingModule {}
```

---

## Configuration Management

### Environment-Based Config
```typescript
// config/configuration.ts
export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    url: process.env.DATABASE_URL,
    poolSize: parseInt(process.env.DB_POOL_SIZE, 10) || 10,
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
  },
});

// Usage with ConfigService
@Injectable()
export class DatabaseService {
  constructor(private config: ConfigService) {
    const dbUrl = this.config.get<string>('database.url');
  }
}
```

### Validation with Joi
```typescript
import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
  PORT: Joi.number().default(3000),
  DATABASE_URL: Joi.string().required(),
  JWT_SECRET: Joi.string().min(32).required(),
});

// app.module.ts
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema,
      validationOptions: { abortEarly: true },
    }),
  ],
})
export class AppModule {}
```

---

## API Versioning

### URL-Based Versioning
```typescript
// NestJS
@Controller({ path: 'bookings', version: '1' })
export class BookingControllerV1 {}

@Controller({ path: 'bookings', version: '2' })
export class BookingControllerV2 {}

// main.ts
app.enableVersioning({
  type: VersioningType.URI,
  defaultVersion: '1',
});
// Results in: /v1/bookings, /v2/bookings
```

### Header-Based Versioning
```typescript
app.enableVersioning({
  type: VersioningType.HEADER,
  header: 'X-API-Version',
});
```

---

*Last updated: 2024-01*
