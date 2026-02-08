# Clean Code Principles - Interview Knowledge Base

## SOLID Principles

### S - Single Responsibility Principle
**A class should have only one reason to change**

```typescript
// BAD: Multiple responsibilities
class UserService {
  createUser(data: UserData) { /* ... */ }
  sendWelcomeEmail(user: User) { /* ... */ }
  generateReport(users: User[]) { /* ... */ }
}

// GOOD: Single responsibility each
class UserService {
  createUser(data: UserData) { /* ... */ }
}

class EmailService {
  sendWelcomeEmail(user: User) { /* ... */ }
}

class ReportService {
  generateUserReport(users: User[]) { /* ... */ }
}
```

### O - Open/Closed Principle
**Open for extension, closed for modification**

```typescript
// BAD: Modify class for new shapes
class AreaCalculator {
  calculate(shape: any): number {
    if (shape.type === 'circle') {
      return Math.PI * shape.radius ** 2;
    }
    if (shape.type === 'rectangle') {
      return shape.width * shape.height;
    }
    // Need to add more if statements for new shapes
  }
}

// GOOD: Extend without modifying
interface Shape {
  area(): number;
}

class Circle implements Shape {
  constructor(private radius: number) {}
  area(): number { return Math.PI * this.radius ** 2; }
}

class Rectangle implements Shape {
  constructor(private width: number, private height: number) {}
  area(): number { return this.width * this.height; }
}

class AreaCalculator {
  calculate(shape: Shape): number {
    return shape.area();
  }
}
```

### L - Liskov Substitution Principle
**Subtypes must be substitutable for base types**

```typescript
// BAD: Square breaks Rectangle contract
class Rectangle {
  constructor(protected width: number, protected height: number) {}

  setWidth(w: number) { this.width = w; }
  setHeight(h: number) { this.height = h; }
  area(): number { return this.width * this.height; }
}

class Square extends Rectangle {
  setWidth(w: number) {
    this.width = w;
    this.height = w;  // Violates expected behavior!
  }
}

// GOOD: Separate abstractions
interface Shape {
  area(): number;
}

class Rectangle implements Shape {
  constructor(private width: number, private height: number) {}
  area(): number { return this.width * this.height; }
}

class Square implements Shape {
  constructor(private side: number) {}
  area(): number { return this.side ** 2; }
}
```

### I - Interface Segregation Principle
**Clients shouldn't depend on interfaces they don't use**

```typescript
// BAD: Fat interface
interface Worker {
  work(): void;
  eat(): void;
  sleep(): void;
}

class Robot implements Worker {
  work() { /* ... */ }
  eat() { throw new Error('Robots dont eat'); }  // Forced to implement
  sleep() { throw new Error('Robots dont sleep'); }
}

// GOOD: Segregated interfaces
interface Workable {
  work(): void;
}

interface Eatable {
  eat(): void;
}

interface Sleepable {
  sleep(): void;
}

class Human implements Workable, Eatable, Sleepable {
  work() { /* ... */ }
  eat() { /* ... */ }
  sleep() { /* ... */ }
}

class Robot implements Workable {
  work() { /* ... */ }
}
```

### D - Dependency Inversion Principle
**Depend on abstractions, not concretions**

```typescript
// BAD: High-level depends on low-level
class UserService {
  private database = new MySQLDatabase();  // Concrete dependency

  getUser(id: string) {
    return this.database.query(`SELECT * FROM users WHERE id = ${id}`);
  }
}

// GOOD: Depend on abstraction
interface Database {
  query(sql: string): Promise<any>;
}

class UserService {
  constructor(private database: Database) {}  // Injected abstraction

  getUser(id: string) {
    return this.database.query(`SELECT * FROM users WHERE id = ${id}`);
  }
}

// Can now use any database
const userService = new UserService(new MySQLDatabase());
const testService = new UserService(new InMemoryDatabase());
```

---

## DRY (Don't Repeat Yourself)

```typescript
// BAD: Repeated validation logic
function createUser(data: UserData) {
  if (!data.email || !data.email.includes('@')) {
    throw new Error('Invalid email');
  }
  // ...
}

function updateUser(data: UserData) {
  if (!data.email || !data.email.includes('@')) {
    throw new Error('Invalid email');
  }
  // ...
}

// GOOD: Extract common logic
function validateEmail(email: string): void {
  if (!email || !email.includes('@')) {
    throw new ValidationError('Invalid email');
  }
}

function createUser(data: UserData) {
  validateEmail(data.email);
  // ...
}

function updateUser(data: UserData) {
  validateEmail(data.email);
  // ...
}
```

---

## KISS (Keep It Simple, Stupid)

```typescript
// BAD: Over-engineered
class UserValidatorFactory {
  createValidator(type: string): AbstractValidator {
    const strategy = ValidatorStrategyRegistry.getInstance().get(type);
    return new ValidatorBuilder()
      .withStrategy(strategy)
      .withRules(RulesEngine.getRules(type))
      .build();
  }
}

// GOOD: Simple and direct
function validateUser(user: User): ValidationResult {
  const errors: string[] = [];

  if (!user.email) errors.push('Email required');
  if (!user.name) errors.push('Name required');
  if (user.age && user.age < 0) errors.push('Invalid age');

  return { valid: errors.length === 0, errors };
}
```

---

## YAGNI (You Aren't Gonna Need It)

```typescript
// BAD: Building for hypothetical future
class UserService {
  private plugins: Plugin[] = [];
  private middleware: Middleware[] = [];
  private cache: Cache;
  private eventBus: EventBus;

  // Features nobody asked for yet
  enablePlugins() { /* ... */ }
  registerMiddleware() { /* ... */ }
  enableCaching() { /* ... */ }
  enableEvents() { /* ... */ }
}

// GOOD: Build what's needed now
class UserService {
  async getUser(id: string): Promise<User> {
    return this.repository.findById(id);
  }

  async createUser(data: CreateUserDto): Promise<User> {
    return this.repository.create(data);
  }
}
// Add caching, events, etc. when actually needed
```

---

## Naming Conventions

### Variables and Functions
```typescript
// BAD
const d = new Date();
const u = getU();
function proc(d) { /* ... */ }

// GOOD
const currentDate = new Date();
const activeUser = getActiveUser();
function processPayment(paymentData) { /* ... */ }
```

### Booleans
```typescript
// BAD
const open = true;
const status = false;

// GOOD
const isOpen = true;
const hasPermission = false;
const canEdit = true;
const shouldNotify = false;
```

### Functions Should Be Verbs
```typescript
// BAD
function user() { /* ... */ }
function data() { /* ... */ }

// GOOD
function getUser() { /* ... */ }
function fetchData() { /* ... */ }
function calculateTotal() { /* ... */ }
function validateInput() { /* ... */ }
```

### Classes Should Be Nouns
```typescript
// BAD
class DoPayment { /* ... */ }
class GetUser { /* ... */ }

// GOOD
class PaymentProcessor { /* ... */ }
class UserRepository { /* ... */ }
class OrderValidator { /* ... */ }
```

---

## Function Guidelines

### Keep Functions Small
```typescript
// BAD: 50+ lines doing multiple things
function processOrder(order: Order) {
  // Validate order (20 lines)
  // Calculate totals (15 lines)
  // Process payment (20 lines)
  // Send notifications (10 lines)
  // Update inventory (15 lines)
}

// GOOD: Small focused functions
function processOrder(order: Order) {
  validateOrder(order);
  const total = calculateTotal(order);
  const payment = processPayment(order, total);
  notifyCustomer(order, payment);
  updateInventory(order);
}
```

### Single Level of Abstraction
```typescript
// BAD: Mixed abstraction levels
function getUsers() {
  const connection = mysql.createConnection(config);  // Low-level
  connection.connect();                               // Low-level
  const users = await this.userRepository.findAll(); // High-level
  connection.end();                                  // Low-level
  return users;
}

// GOOD: Consistent abstraction
function getUsers() {
  return this.userRepository.findAll();
}
```

### Avoid Flag Arguments
```typescript
// BAD: Boolean flag changes behavior
function createUser(data: UserData, sendEmail: boolean) {
  // ...
  if (sendEmail) {
    this.emailService.sendWelcome(user);
  }
}

// GOOD: Separate functions
function createUser(data: UserData) {
  return this.userRepository.create(data);
}

function createUserWithWelcomeEmail(data: UserData) {
  const user = createUser(data);
  this.emailService.sendWelcome(user);
  return user;
}
```

---

## Error Handling

### Use Exceptions, Not Return Codes
```typescript
// BAD: Return codes
function withdraw(amount: number): number {
  if (this.balance < amount) return -1;  // Error code
  this.balance -= amount;
  return 0;  // Success
}

// GOOD: Exceptions
function withdraw(amount: number): void {
  if (this.balance < amount) {
    throw new InsufficientFundsError(this.balance, amount);
  }
  this.balance -= amount;
}
```

### Create Specific Exceptions
```typescript
// Define domain-specific errors
class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

class BookingNotFoundError extends DomainError {
  constructor(id: string) {
    super(`Booking not found: ${id}`);
  }
}

class DoubleBookingError extends DomainError {
  constructor(roomId: string, date: Date) {
    super(`Room ${roomId} already booked for ${date}`);
  }
}
```

### Don't Return Null
```typescript
// BAD: Returning null
function getUser(id: string): User | null {
  return this.users.find(u => u.id === id) ?? null;
}

// Caller must check
const user = getUser(id);
if (user !== null) {
  // use user
}

// GOOD: Throw or use Optional
function getUser(id: string): User {
  const user = this.users.find(u => u.id === id);
  if (!user) throw new UserNotFoundError(id);
  return user;
}

// Or use Result type
function getUser(id: string): Result<User, UserNotFoundError> {
  const user = this.users.find(u => u.id === id);
  return user ? ok(user) : err(new UserNotFoundError(id));
}
```

---

## Comments

### Good Comments
```typescript
// Explain WHY, not WHAT
// Using binary search because the list is always sorted
// and can contain millions of items
const index = binarySearch(items, target);

// Legal/license comments
// Copyright (c) 2024 Company Inc. All rights reserved.

// TODO with context
// TODO: Replace with proper rate limiter before production launch
const rateLimited = simpleRateLimit(request);

// Warning of consequences
// WARNING: Changing this timeout affects all downstream services
// Contact platform team before modifying
const TIMEOUT_MS = 30000;
```

### Bad Comments
```typescript
// BAD: Redundant
// Increment counter by 1
counter++;

// BAD: Misleading
// Returns the user's name
function getUser() {  // Returns entire user object!
  return this.user;
}

// BAD: Commented-out code
// function oldImplementation() {
//   // ...hundreds of lines...
// }

// BAD: Journal comments
// 2024-01-15: Fixed bug
// 2024-01-16: Added feature
// Use version control instead!
```

---

## Code Smells

### Long Parameter Lists
```typescript
// BAD
function createUser(
  name: string,
  email: string,
  age: number,
  address: string,
  phone: string,
  role: string
) { /* ... */ }

// GOOD: Use object
function createUser(data: CreateUserDto) { /* ... */ }

interface CreateUserDto {
  name: string;
  email: string;
  age?: number;
  address?: string;
  phone?: string;
  role: Role;
}
```

### Feature Envy
```typescript
// BAD: Method uses another class's data more than its own
class Order {
  calculateShipping(customer: Customer) {
    if (customer.address.country === 'US') {
      return customer.address.state === 'CA' ? 5 : 10;
    }
    return customer.address.isRemote ? 50 : 25;
  }
}

// GOOD: Move method to where data is
class Customer {
  calculateShipping(): number {
    if (this.address.country === 'US') {
      return this.address.state === 'CA' ? 5 : 10;
    }
    return this.address.isRemote ? 50 : 25;
  }
}
```

### Primitive Obsession
```typescript
// BAD: Using primitives for domain concepts
function createUser(email: string, phone: string) {
  if (!email.includes('@')) throw new Error('Invalid email');
  if (phone.length < 10) throw new Error('Invalid phone');
}

// GOOD: Value objects
class Email {
  constructor(private value: string) {
    if (!value.includes('@')) throw new InvalidEmailError();
  }
  toString() { return this.value; }
}

class Phone {
  constructor(private value: string) {
    if (value.length < 10) throw new InvalidPhoneError();
  }
  toString() { return this.value; }
}

function createUser(email: Email, phone: Phone) { /* ... */ }
```

---

## Testing Principles

- **F**ast: Tests should run quickly
- **I**ndependent: Tests shouldn't depend on each other
- **R**epeatable: Same result every time
- **S**elf-validating: Pass or fail, no manual interpretation
- **T**imely: Written before or with production code

---

*Last updated: 2024-01*
