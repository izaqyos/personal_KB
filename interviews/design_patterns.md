# Design Patterns - Interview Knowledge Base

## Creational Patterns

### Factory Pattern
**Purpose:** Encapsulate object creation logic

```typescript
// Abstract Factory
interface NotificationFactory {
  createNotification(): Notification;
}

class EmailNotificationFactory implements NotificationFactory {
  createNotification(): Notification {
    return new EmailNotification();
  }
}

class SMSNotificationFactory implements NotificationFactory {
  createNotification(): Notification {
    return new SMSNotification();
  }
}

// Usage
function sendNotification(factory: NotificationFactory, message: string) {
  const notification = factory.createNotification();
  notification.send(message);
}

// Simple Factory Function
function createNotification(type: 'email' | 'sms' | 'push'): Notification {
  switch (type) {
    case 'email': return new EmailNotification();
    case 'sms': return new SMSNotification();
    case 'push': return new PushNotification();
    default: throw new Error(`Unknown type: ${type}`);
  }
}
```

### Builder Pattern
**Purpose:** Construct complex objects step by step

```typescript
class QueryBuilder {
  private query: string = '';
  private params: any[] = [];

  select(columns: string[]): this {
    this.query = `SELECT ${columns.join(', ')}`;
    return this;
  }

  from(table: string): this {
    this.query += ` FROM ${table}`;
    return this;
  }

  where(condition: string, value: any): this {
    this.query += this.params.length === 0 ? ' WHERE' : ' AND';
    this.query += ` ${condition}`;
    this.params.push(value);
    return this;
  }

  orderBy(column: string, direction: 'ASC' | 'DESC' = 'ASC'): this {
    this.query += ` ORDER BY ${column} ${direction}`;
    return this;
  }

  build(): { query: string; params: any[] } {
    return { query: this.query, params: this.params };
  }
}

// Usage
const { query, params } = new QueryBuilder()
  .select(['id', 'name', 'email'])
  .from('users')
  .where('status = $1', 'active')
  .where('created_at > $2', startDate)
  .orderBy('created_at', 'DESC')
  .build();
```

### Singleton Pattern
**Purpose:** Ensure single instance

```typescript
// Module pattern (Node.js)
// database.ts
let instance: DatabaseConnection | null = null;

export function getDatabase(): DatabaseConnection {
  if (!instance) {
    instance = new DatabaseConnection(config);
  }
  return instance;
}

// Class-based
class Logger {
  private static instance: Logger;

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }
}

// With DI container (preferred in modern apps)
@Injectable({ scope: Scope.DEFAULT })  // Singleton by default in NestJS
export class ConfigService {}
```

---

## Structural Patterns

### Adapter Pattern
**Purpose:** Convert interface to another interface

```typescript
// Old payment gateway
interface OldPaymentGateway {
  makePayment(amount: number, card: string): boolean;
}

// New payment interface we want
interface PaymentProcessor {
  process(payment: PaymentRequest): Promise<PaymentResult>;
}

// Adapter
class PaymentGatewayAdapter implements PaymentProcessor {
  constructor(private oldGateway: OldPaymentGateway) {}

  async process(payment: PaymentRequest): Promise<PaymentResult> {
    const success = this.oldGateway.makePayment(
      payment.amount,
      payment.cardNumber
    );

    return {
      success,
      transactionId: success ? generateId() : null,
    };
  }
}
```

### Decorator Pattern
**Purpose:** Add behavior dynamically

```typescript
// Function decorator
function withLogging<T extends (...args: any[]) => any>(fn: T): T {
  return ((...args: Parameters<T>) => {
    console.log(`Calling ${fn.name} with:`, args);
    const result = fn(...args);
    console.log(`Result:`, result);
    return result;
  }) as T;
}

// TypeScript decorator (for classes)
function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${propertyKey} with:`, args);
    return originalMethod.apply(this, args);
  };

  return descriptor;
}

class Calculator {
  @Log
  add(a: number, b: number): number {
    return a + b;
  }
}

// Rate limiting decorator
function RateLimit(limit: number, windowMs: number) {
  const requests = new Map<string, number[]>();

  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;

    descriptor.value = async function (this: any, ...args: any[]) {
      const key = this.userId || 'global';
      const now = Date.now();
      const windowStart = now - windowMs;

      // Get recent requests
      const recent = (requests.get(key) || []).filter(t => t > windowStart);

      if (recent.length >= limit) {
        throw new TooManyRequestsError();
      }

      recent.push(now);
      requests.set(key, recent);

      return original.apply(this, args);
    };

    return descriptor;
  };
}
```

### Facade Pattern
**Purpose:** Simplify complex subsystem

```typescript
// Complex subsystems
class InventoryService {
  checkStock(productId: string): boolean { /* ... */ }
  reserveStock(productId: string, quantity: number): void { /* ... */ }
}

class PaymentService {
  processPayment(amount: number, cardInfo: CardInfo): PaymentResult { /* ... */ }
}

class ShippingService {
  createShipment(orderId: string, address: Address): Shipment { /* ... */ }
}

class NotificationService {
  sendOrderConfirmation(email: string, orderId: string): void { /* ... */ }
}

// Facade
class OrderFacade {
  constructor(
    private inventory: InventoryService,
    private payment: PaymentService,
    private shipping: ShippingService,
    private notification: NotificationService,
  ) {}

  async placeOrder(orderRequest: OrderRequest): Promise<Order> {
    // Check stock
    if (!this.inventory.checkStock(orderRequest.productId)) {
      throw new OutOfStockError();
    }

    // Reserve stock
    this.inventory.reserveStock(orderRequest.productId, orderRequest.quantity);

    // Process payment
    const paymentResult = this.payment.processPayment(
      orderRequest.amount,
      orderRequest.cardInfo
    );

    if (!paymentResult.success) {
      throw new PaymentFailedError();
    }

    // Create shipment
    const shipment = this.shipping.createShipment(
      paymentResult.orderId,
      orderRequest.address
    );

    // Send notification
    this.notification.sendOrderConfirmation(
      orderRequest.email,
      paymentResult.orderId
    );

    return { orderId: paymentResult.orderId, shipment };
  }
}
```

---

## Behavioral Patterns

### Strategy Pattern
**Purpose:** Interchangeable algorithms

```typescript
// Strategy interface
interface PricingStrategy {
  calculatePrice(basePrice: number, quantity: number): number;
}

// Concrete strategies
class RegularPricing implements PricingStrategy {
  calculatePrice(basePrice: number, quantity: number): number {
    return basePrice * quantity;
  }
}

class BulkPricing implements PricingStrategy {
  calculatePrice(basePrice: number, quantity: number): number {
    if (quantity >= 100) return basePrice * quantity * 0.8;
    if (quantity >= 50) return basePrice * quantity * 0.9;
    return basePrice * quantity;
  }
}

class PremiumPricing implements PricingStrategy {
  calculatePrice(basePrice: number, quantity: number): number {
    return basePrice * quantity * 1.2; // 20% premium
  }
}

// Context
class ShoppingCart {
  constructor(private pricingStrategy: PricingStrategy) {}

  setPricingStrategy(strategy: PricingStrategy): void {
    this.pricingStrategy = strategy;
  }

  calculateTotal(items: CartItem[]): number {
    return items.reduce((total, item) =>
      total + this.pricingStrategy.calculatePrice(item.price, item.quantity),
      0
    );
  }
}

// Usage
const cart = new ShoppingCart(new RegularPricing());
cart.calculateTotal(items);

cart.setPricingStrategy(new BulkPricing());
cart.calculateTotal(items);
```

### Observer Pattern
**Purpose:** Notify dependents of state changes

```typescript
// Subject interface
interface Subject {
  subscribe(observer: Observer): void;
  unsubscribe(observer: Observer): void;
  notify(event: Event): void;
}

// Observer interface
interface Observer {
  update(event: Event): void;
}

// Implementation
class EventEmitter implements Subject {
  private observers: Observer[] = [];

  subscribe(observer: Observer): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: Observer): void {
    this.observers = this.observers.filter(o => o !== observer);
  }

  notify(event: Event): void {
    this.observers.forEach(o => o.update(event));
  }
}

// Concrete observers
class EmailNotifier implements Observer {
  update(event: Event): void {
    if (event.type === 'ORDER_PLACED') {
      sendEmail(event.data.email, 'Order confirmed');
    }
  }
}

class InventoryUpdater implements Observer {
  update(event: Event): void {
    if (event.type === 'ORDER_PLACED') {
      decrementStock(event.data.productId, event.data.quantity);
    }
  }
}
```

### Template Method Pattern
**Purpose:** Define algorithm skeleton, let subclasses fill in steps

```typescript
abstract class DataExporter {
  // Template method
  async export(data: any[]): Promise<void> {
    const validated = this.validate(data);
    const transformed = this.transform(validated);
    const formatted = this.format(transformed);
    await this.save(formatted);
  }

  // Common implementation
  protected validate(data: any[]): any[] {
    return data.filter(item => item !== null);
  }

  // Abstract methods for subclasses
  protected abstract transform(data: any[]): any[];
  protected abstract format(data: any[]): string;
  protected abstract save(content: string): Promise<void>;
}

class CSVExporter extends DataExporter {
  protected transform(data: any[]): any[] {
    return data.map(row => Object.values(row));
  }

  protected format(data: any[]): string {
    return data.map(row => row.join(',')).join('\n');
  }

  protected async save(content: string): Promise<void> {
    await fs.writeFile('export.csv', content);
  }
}

class JSONExporter extends DataExporter {
  protected transform(data: any[]): any[] {
    return data; // No transformation needed
  }

  protected format(data: any[]): string {
    return JSON.stringify(data, null, 2);
  }

  protected async save(content: string): Promise<void> {
    await fs.writeFile('export.json', content);
  }
}
```

---

## Repository Pattern

**Purpose:** Abstract data access

```typescript
// Generic repository interface
interface IRepository<T, ID> {
  findById(id: ID): Promise<T | null>;
  findAll(filter?: Partial<T>): Promise<T[]>;
  create(data: Omit<T, 'id'>): Promise<T>;
  update(id: ID, data: Partial<T>): Promise<T>;
  delete(id: ID): Promise<void>;
}

// Implementation
class PrismaBookingRepository implements IRepository<Booking, string> {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<Booking | null> {
    return this.prisma.booking.findUnique({ where: { id } });
  }

  async findAll(filter?: Partial<Booking>): Promise<Booking[]> {
    return this.prisma.booking.findMany({ where: filter });
  }

  async create(data: Omit<Booking, 'id'>): Promise<Booking> {
    return this.prisma.booking.create({ data });
  }

  async update(id: string, data: Partial<Booking>): Promise<Booking> {
    return this.prisma.booking.update({ where: { id }, data });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.booking.delete({ where: { id } });
  }
}
```

---

## Unit of Work Pattern

**Purpose:** Track changes and commit atomically

```typescript
class UnitOfWork {
  private operations: Array<() => Promise<void>> = [];

  addOperation(operation: () => Promise<void>): void {
    this.operations.push(operation);
  }

  async commit(): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      for (const operation of this.operations) {
        await operation();
      }
    });
    this.operations = [];
  }

  rollback(): void {
    this.operations = [];
  }
}

// Usage
const uow = new UnitOfWork();
uow.addOperation(() => userRepo.create(userData));
uow.addOperation(() => profileRepo.create(profileData));
uow.addOperation(() => emailService.sendWelcome(email));
await uow.commit();
```

---

## Dependency Injection Container

**Purpose:** Manage object creation and dependencies

```typescript
// Simple container
class Container {
  private services = new Map<string, any>();
  private factories = new Map<string, () => any>();

  register<T>(token: string, factory: () => T): void {
    this.factories.set(token, factory);
  }

  registerSingleton<T>(token: string, instance: T): void {
    this.services.set(token, instance);
  }

  resolve<T>(token: string): T {
    // Check singletons first
    if (this.services.has(token)) {
      return this.services.get(token);
    }

    // Create from factory
    const factory = this.factories.get(token);
    if (!factory) {
      throw new Error(`Service not registered: ${token}`);
    }

    return factory();
  }
}

// Usage
const container = new Container();
container.registerSingleton('database', new PrismaClient());
container.register('bookingService', () =>
  new BookingService(
    container.resolve('database'),
    container.resolve('cache')
  )
);
```

---

## When to Use Which Pattern

| Pattern | Use When |
|---------|----------|
| Factory | Object creation is complex or varies by type |
| Builder | Object has many optional parameters |
| Singleton | Need exactly one instance globally |
| Adapter | Integrating incompatible interfaces |
| Decorator | Adding behavior without changing class |
| Facade | Simplifying complex subsystem |
| Strategy | Algorithm varies by context |
| Observer | Many objects need to react to changes |
| Repository | Abstracting data access layer |

---

*Last updated: 2024-01*
