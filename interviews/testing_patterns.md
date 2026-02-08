# Testing Patterns - Interview Knowledge Base

## Test Pyramid

```
        /\
       /  \      E2E Tests (Few)
      /────\     - Full system tests
     /      \    - Slow, brittle
    /────────\   Integration Tests (Some)
   /          \  - Multiple components
  /────────────\ Unit Tests (Many)
 /              \ - Single function/class
/________________\ - Fast, isolated
```

---

## Unit Testing

### Pure Function Testing
```typescript
// Function
function calculatePrice(quantity: number, unitPrice: number, discount: number): number {
  if (quantity < 0 || unitPrice < 0 || discount < 0 || discount > 1) {
    throw new Error('Invalid input');
  }
  return quantity * unitPrice * (1 - discount);
}

// Tests
describe('calculatePrice', () => {
  it('should calculate price without discount', () => {
    expect(calculatePrice(5, 100, 0)).toBe(500);
  });

  it('should apply discount correctly', () => {
    expect(calculatePrice(5, 100, 0.2)).toBe(400);
  });

  it('should throw for negative quantity', () => {
    expect(() => calculatePrice(-1, 100, 0)).toThrow('Invalid input');
  });

  it('should throw for discount > 1', () => {
    expect(() => calculatePrice(5, 100, 1.5)).toThrow('Invalid input');
  });
});
```

### Service Testing with Mocks
```typescript
// Service
class BookingService {
  constructor(
    private bookingRepo: BookingRepository,
    private notificationService: NotificationService,
  ) {}

  async create(data: CreateBookingDto): Promise<Booking> {
    const booking = await this.bookingRepo.create(data);
    await this.notificationService.sendConfirmation(booking);
    return booking;
  }
}

// Test
describe('BookingService', () => {
  let service: BookingService;
  let mockRepo: jest.Mocked<BookingRepository>;
  let mockNotification: jest.Mocked<NotificationService>;

  beforeEach(() => {
    mockRepo = {
      create: jest.fn(),
      findById: jest.fn(),
    } as any;

    mockNotification = {
      sendConfirmation: jest.fn(),
    } as any;

    service = new BookingService(mockRepo, mockNotification);
  });

  it('should create booking and send notification', async () => {
    const dto = { roomId: 'room-1', date: new Date() };
    const createdBooking = { id: 'booking-1', ...dto };

    mockRepo.create.mockResolvedValue(createdBooking);

    const result = await service.create(dto);

    expect(mockRepo.create).toHaveBeenCalledWith(dto);
    expect(mockNotification.sendConfirmation).toHaveBeenCalledWith(createdBooking);
    expect(result).toEqual(createdBooking);
  });
});
```

---

## Integration Testing

### Database Integration Tests
```typescript
// Setup: Real database, test container
import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';

let prisma: PrismaClient;

beforeAll(async () => {
  // Use test database
  process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test_db';

  // Run migrations
  execSync('npx prisma migrate deploy', { env: process.env });

  prisma = new PrismaClient();
});

afterAll(async () => {
  await prisma.$disconnect();
});

beforeEach(async () => {
  // Clean database between tests
  await prisma.booking.deleteMany();
  await prisma.room.deleteMany();
  await prisma.user.deleteMany();
});

describe('BookingRepository', () => {
  it('should create and retrieve booking', async () => {
    // Arrange
    const user = await prisma.user.create({ data: { email: 'test@test.com' } });
    const room = await prisma.room.create({ data: { name: 'Room A' } });

    // Act
    const booking = await prisma.booking.create({
      data: {
        roomId: room.id,
        userId: user.id,
        date: new Date('2024-01-15'),
      },
    });

    // Assert
    const found = await prisma.booking.findUnique({ where: { id: booking.id } });
    expect(found).toBeDefined();
    expect(found!.roomId).toBe(room.id);
  });
});
```

### API Integration Tests
```typescript
import request from 'supertest';
import { app } from '../src/app';

describe('POST /bookings', () => {
  let authToken: string;

  beforeAll(async () => {
    // Get auth token
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'test@test.com', password: 'password' });
    authToken = res.body.token;
  });

  it('should create booking', async () => {
    const res = await request(app)
      .post('/bookings')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        roomId: 'room-123',
        date: '2024-01-15',
      });

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.status).toBe('CONFIRMED');
  });

  it('should return 401 without auth', async () => {
    const res = await request(app)
      .post('/bookings')
      .send({ roomId: 'room-123', date: '2024-01-15' });

    expect(res.status).toBe(401);
  });

  it('should return 409 for double booking', async () => {
    // First booking
    await request(app)
      .post('/bookings')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ roomId: 'room-123', date: '2024-01-15' });

    // Second booking (same room, same date)
    const res = await request(app)
      .post('/bookings')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ roomId: 'room-123', date: '2024-01-15' });

    expect(res.status).toBe(409);
  });
});
```

---

## Concurrency Testing

### Testing Race Conditions
```typescript
describe('Concurrent Bookings', () => {
  it('should prevent double booking under concurrent requests', async () => {
    const roomId = 'room-123';
    const date = '2024-01-15';

    // Fire 10 concurrent booking requests
    const requests = Array(10).fill(null).map(() =>
      request(app)
        .post('/bookings')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ roomId, date })
    );

    const results = await Promise.allSettled(requests);

    // Count successes and failures
    const responses = results.map((r) =>
      r.status === 'fulfilled' ? r.value : r.reason
    );

    const successes = responses.filter((r) => r.status === 201);
    const conflicts = responses.filter((r) => r.status === 409);

    // Exactly one should succeed
    expect(successes.length).toBe(1);
    expect(conflicts.length).toBe(9);

    // Verify only one booking exists
    const bookings = await prisma.booking.findMany({
      where: { roomId, date: new Date(date) },
    });
    expect(bookings.length).toBe(1);
  });
});
```

### Stress Testing
```typescript
import { check, sleep } from 'k6';
import http from 'k6/http';

export const options = {
  stages: [
    { duration: '30s', target: 20 },  // Ramp up
    { duration: '1m', target: 20 },   // Stay at 20
    { duration: '30s', target: 0 },   // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],  // 95% under 500ms
    http_req_failed: ['rate<0.01'],    // Error rate < 1%
  },
};

export default function () {
  const res = http.get('http://localhost:3000/api/rooms');

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 200ms': (r) => r.timings.duration < 200,
  });

  sleep(1);
}
```

---

## Mocking Patterns

### Manual Mocks
```typescript
// __mocks__/prisma.ts
export const prismaMock = {
  booking: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  $transaction: jest.fn((fn) => fn(prismaMock)),
};

// In test
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(() => prismaMock),
}));
```

### Mock Factory
```typescript
function createMockBooking(overrides?: Partial<Booking>): Booking {
  return {
    id: 'booking-123',
    roomId: 'room-123',
    userId: 'user-123',
    date: new Date('2024-01-15'),
    status: 'CONFIRMED',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
}

// Usage in tests
const booking = createMockBooking({ status: 'CANCELLED' });
```

### Spy vs Mock vs Stub
```typescript
// Spy: Track calls to real implementation
const spy = jest.spyOn(service, 'method');
await service.method();
expect(spy).toHaveBeenCalled();

// Mock: Replace implementation
const mock = jest.fn().mockResolvedValue({ id: '123' });
service.method = mock;

// Stub: Provide canned responses
jest.spyOn(service, 'method').mockResolvedValue({ id: '123' });
```

---

## Test Fixtures

### Setup/Teardown
```typescript
describe('BookingService', () => {
  let testUser: User;
  let testRoom: Room;

  beforeAll(async () => {
    // One-time setup
    testUser = await createTestUser();
    testRoom = await createTestRoom();
  });

  afterAll(async () => {
    // Cleanup
    await prisma.user.delete({ where: { id: testUser.id } });
    await prisma.room.delete({ where: { id: testRoom.id } });
  });

  beforeEach(async () => {
    // Per-test cleanup
    await prisma.booking.deleteMany();
  });

  it('should create booking', async () => {
    // Test uses testUser and testRoom
  });
});
```

### Test Data Builders
```typescript
class BookingBuilder {
  private data: Partial<CreateBookingData> = {};

  withRoom(roomId: string): this {
    this.data.roomId = roomId;
    return this;
  }

  withUser(userId: string): this {
    this.data.userId = userId;
    return this;
  }

  withDate(date: Date): this {
    this.data.date = date;
    return this;
  }

  build(): CreateBookingData {
    return {
      roomId: this.data.roomId ?? 'default-room',
      userId: this.data.userId ?? 'default-user',
      date: this.data.date ?? new Date(),
    };
  }
}

// Usage
const data = new BookingBuilder()
  .withRoom('room-123')
  .withDate(new Date('2024-01-15'))
  .build();
```

---

## Test Organization

### AAA Pattern
```typescript
it('should calculate total with discount', () => {
  // Arrange
  const cart = new ShoppingCart();
  cart.addItem({ id: '1', price: 100, quantity: 2 });
  cart.applyDiscount(0.1);

  // Act
  const total = cart.getTotal();

  // Assert
  expect(total).toBe(180);
});
```

### Given-When-Then (BDD)
```typescript
describe('Shopping Cart', () => {
  describe('when calculating total', () => {
    describe('given a cart with items and discount', () => {
      it('then should apply discount to total', () => {
        // ...
      });
    });
  });
});
```

---

## Error Testing

### Testing Exceptions
```typescript
it('should throw for invalid input', async () => {
  await expect(service.create({ roomId: '' }))
    .rejects
    .toThrow('Room ID is required');
});

it('should throw specific error type', async () => {
  await expect(service.findById('non-existent'))
    .rejects
    .toBeInstanceOf(NotFoundException);
});
```

### Testing Error Handling
```typescript
it('should handle database errors gracefully', async () => {
  mockRepo.create.mockRejectedValue(new Error('DB connection failed'));

  const result = await service.create(data);

  expect(result.success).toBe(false);
  expect(result.error).toContain('Unable to create booking');
  expect(logger.error).toHaveBeenCalled();
});
```

---

## Test Coverage

### Configuration (Jest)
```javascript
// jest.config.js
module.exports = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
    '!src/main.ts',
  ],
};
```

### What to Test
- ✅ Business logic
- ✅ Edge cases
- ✅ Error handling
- ✅ Integration points
- ❌ Framework code
- ❌ Trivial getters/setters
- ❌ Third-party libraries

---

## Testing Anti-Patterns

❌ **Testing implementation details**
```typescript
// BAD: Testing internal state
expect(service['privateField']).toBe(5);

// GOOD: Testing behavior
expect(service.getResult()).toBe(5);
```

❌ **Flaky tests**
```typescript
// BAD: Time-dependent
expect(result.timestamp).toBe(new Date());

// GOOD: Use fixed time
jest.useFakeTimers().setSystemTime(new Date('2024-01-15'));
```

❌ **Too much mocking**
```typescript
// BAD: Mock everything
const service = new Service(mockA, mockB, mockC, mockD, mockE);

// GOOD: Use real implementations where practical
```

---

*Last updated: 2024-01*
