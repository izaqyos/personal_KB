# Coding Idioms - Interview Knowledge Base

## TypeScript Idioms

### Type Guards
```typescript
// Custom type guard
function isUser(obj: unknown): obj is User {
  return typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'email' in obj;
}

// Usage
if (isUser(response)) {
  console.log(response.email);  // TypeScript knows it's User
}

// Discriminated unions
type Result<T, E> =
  | { success: true; data: T }
  | { success: false; error: E };

function handleResult(result: Result<User, Error>) {
  if (result.success) {
    console.log(result.data.name);  // TypeScript knows data exists
  } else {
    console.log(result.error.message);  // TypeScript knows error exists
  }
}
```

### Utility Types
```typescript
// Pick - select specific properties
type UserPreview = Pick<User, 'id' | 'name' | 'avatar'>;

// Omit - exclude properties
type CreateUserDto = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

// Partial - all properties optional
type UpdateUserDto = Partial<User>;

// Required - all properties required
type CompleteUser = Required<User>;

// Record - dictionary type
type UserRoles = Record<string, Role[]>;

// ReturnType - extract return type
type UserServiceReturn = ReturnType<typeof userService.getUser>;

// Parameters - extract parameter types
type CreateUserParams = Parameters<typeof userService.create>;
```

### Nullish Coalescing & Optional Chaining
```typescript
// Nullish coalescing (??)
const name = user.name ?? 'Anonymous';  // Only for null/undefined
const count = data.count ?? 0;

// vs Logical OR (||)
const name = user.name || 'Anonymous';  // Also for '', 0, false

// Optional chaining (?.)
const city = user?.address?.city;
const first = users?.[0];
const result = callback?.();

// Combined
const displayName = user?.profile?.displayName ?? user?.email ?? 'Unknown';
```

### Assertion Functions
```typescript
function assertDefined<T>(value: T | null | undefined, message?: string): asserts value is T {
  if (value === null || value === undefined) {
    throw new Error(message ?? 'Value is not defined');
  }
}

// Usage
const user = await findUser(id);
assertDefined(user, `User ${id} not found`);
// TypeScript knows user is defined after this line
console.log(user.name);
```

### Const Assertions
```typescript
// Without const assertion
const config = {
  endpoint: '/api',
  timeout: 5000,
};
// Type: { endpoint: string; timeout: number }

// With const assertion
const config = {
  endpoint: '/api',
  timeout: 5000,
} as const;
// Type: { readonly endpoint: '/api'; readonly timeout: 5000 }

// Array const assertion
const statuses = ['pending', 'active', 'completed'] as const;
type Status = typeof statuses[number];  // 'pending' | 'active' | 'completed'
```

---

## Async/Await Patterns

### Parallel Execution
```typescript
// BAD: Sequential (slow)
const user = await getUser(id);
const posts = await getPosts(id);
const comments = await getComments(id);

// GOOD: Parallel (fast)
const [user, posts, comments] = await Promise.all([
  getUser(id),
  getPosts(id),
  getComments(id),
]);
```

### Error Handling with Promise.allSettled
```typescript
const results = await Promise.allSettled([
  fetchUser(1),
  fetchUser(2),
  fetchUser(3),
]);

const successes = results
  .filter((r): r is PromiseFulfilledResult<User> => r.status === 'fulfilled')
  .map(r => r.value);

const failures = results
  .filter((r): r is PromiseRejectedResult => r.status === 'rejected')
  .map(r => r.reason);
```

### Async Iteration
```typescript
// Process items with concurrency limit
async function processWithLimit<T, R>(
  items: T[],
  fn: (item: T) => Promise<R>,
  limit: number
): Promise<R[]> {
  const results: R[] = [];
  const executing: Promise<void>[] = [];

  for (const item of items) {
    const promise = fn(item).then(result => {
      results.push(result);
    });

    executing.push(promise);

    if (executing.length >= limit) {
      await Promise.race(executing);
      executing.splice(executing.findIndex(p => p === promise), 1);
    }
  }

  await Promise.all(executing);
  return results;
}

// Usage
await processWithLimit(users, sendEmail, 10);  // Max 10 concurrent
```

### Retry Pattern
```typescript
async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  delay = 1000
): Promise<T> {
  let lastError: Error;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
      }
    }
  }

  throw lastError!;
}
```

---

## Array Methods

### Chaining
```typescript
const result = users
  .filter(u => u.isActive)
  .map(u => ({ id: u.id, name: u.name }))
  .sort((a, b) => a.name.localeCompare(b.name))
  .slice(0, 10);
```

### Reduce Patterns
```typescript
// Group by
const byDepartment = employees.reduce((acc, emp) => {
  (acc[emp.department] ??= []).push(emp);
  return acc;
}, {} as Record<string, Employee[]>);

// Count occurrences
const counts = items.reduce((acc, item) => {
  acc[item] = (acc[item] ?? 0) + 1;
  return acc;
}, {} as Record<string, number>);

// Build object from array
const userMap = users.reduce((acc, user) => {
  acc[user.id] = user;
  return acc;
}, {} as Record<string, User>);

// Or use Object.fromEntries
const userMap = Object.fromEntries(users.map(u => [u.id, u]));
```

### Find with Default
```typescript
// With optional chaining
const active = users.find(u => u.isActive)?.name ?? 'None';

// Or explicit
const activeUser = users.find(u => u.isActive);
const name = activeUser ? activeUser.name : 'None';
```

---

## Object Manipulation

### Spread and Destructuring
```typescript
// Shallow copy
const copy = { ...original };

// Merge objects
const merged = { ...defaults, ...overrides };

// Remove properties
const { password, ...safeUser } = user;

// Rename while destructuring
const { name: userName, email: userEmail } = user;

// Default values
const { name = 'Anonymous', role = 'user' } = config;
```

### Object.entries/fromEntries
```typescript
// Transform object values
const doubled = Object.fromEntries(
  Object.entries(prices).map(([key, value]) => [key, value * 2])
);

// Filter object
const filtered = Object.fromEntries(
  Object.entries(data).filter(([key, value]) => value !== null)
);

// Swap keys and values
const inverted = Object.fromEntries(
  Object.entries(original).map(([k, v]) => [v, k])
);
```

---

## String Manipulation

### Template Literals
```typescript
// Multi-line strings
const html = `
  <div class="user">
    <h2>${user.name}</h2>
    <p>${user.bio}</p>
  </div>
`;

// Tagged template literals
function sql(strings: TemplateStringsArray, ...values: any[]) {
  return {
    text: strings.join('$'),
    values,
  };
}

const query = sql`SELECT * FROM users WHERE id = ${userId}`;
// { text: 'SELECT * FROM users WHERE id = $1', values: [userId] }
```

### String Methods
```typescript
// Padding
const padded = '42'.padStart(5, '0');  // '00042'

// Includes, startsWith, endsWith
if (url.startsWith('https://')) { /* ... */ }
if (filename.endsWith('.ts')) { /* ... */ }
if (text.includes('error')) { /* ... */ }

// Repeat
const separator = '-'.repeat(20);
```

---

## Functional Patterns

### Pipe/Compose
```typescript
// Pipe: left to right
const pipe = <T>(...fns: Array<(arg: T) => T>) =>
  (value: T): T =>
    fns.reduce((acc, fn) => fn(acc), value);

const processUser = pipe(
  validateUser,
  normalizeEmail,
  hashPassword,
  createUser
);

// Compose: right to left
const compose = <T>(...fns: Array<(arg: T) => T>) =>
  (value: T): T =>
    fns.reduceRight((acc, fn) => fn(acc), value);
```

### Currying
```typescript
// Manual currying
const multiply = (a: number) => (b: number) => a * b;
const double = multiply(2);
double(5);  // 10

// Generic curry
function curry<A, B, C>(fn: (a: A, b: B) => C) {
  return (a: A) => (b: B) => fn(a, b);
}

const add = curry((a: number, b: number) => a + b);
const add5 = add(5);
add5(3);  // 8
```

### Memoization
```typescript
function memoize<Args extends unknown[], Result>(
  fn: (...args: Args) => Result
): (...args: Args) => Result {
  const cache = new Map<string, Result>();

  return (...args: Args): Result => {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

const expensiveCalculation = memoize((n: number) => {
  // Complex calculation
  return fibonacci(n);
});
```

---

## Error Handling Patterns

### Result Type
```typescript
type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

function ok<T>(value: T): Result<T, never> {
  return { ok: true, value };
}

function err<E>(error: E): Result<never, E> {
  return { ok: false, error };
}

// Usage
function divide(a: number, b: number): Result<number, string> {
  if (b === 0) return err('Division by zero');
  return ok(a / b);
}

const result = divide(10, 2);
if (result.ok) {
  console.log(result.value);
} else {
  console.error(result.error);
}
```

### Try-Catch Wrapper
```typescript
async function tryCatch<T>(
  promise: Promise<T>
): Promise<[T, null] | [null, Error]> {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    return [null, error as Error];
  }
}

// Usage
const [user, error] = await tryCatch(fetchUser(id));
if (error) {
  console.error('Failed:', error.message);
} else {
  console.log('User:', user);
}
```

---

## Class Patterns

### Private Fields (ES2022)
```typescript
class Counter {
  #count = 0;  // Truly private

  increment() {
    this.#count++;
  }

  get value() {
    return this.#count;
  }
}

const counter = new Counter();
counter.increment();
// counter.#count;  // SyntaxError: Private field
```

### Static Factory Methods
```typescript
class User {
  private constructor(
    public id: string,
    public email: string,
    public role: Role
  ) {}

  static createAdmin(email: string): User {
    return new User(generateId(), email, Role.ADMIN);
  }

  static createGuest(): User {
    return new User(generateId(), 'guest@example.com', Role.GUEST);
  }

  static fromJSON(json: UserJSON): User {
    return new User(json.id, json.email, json.role as Role);
  }
}
```

---

## Date/Time Patterns

### ISO String Handling
```typescript
// Always store as ISO string or timestamp
const created = new Date().toISOString();

// Parse safely
function parseDate(value: string | Date): Date {
  if (value instanceof Date) return value;
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date: ${value}`);
  }
  return date;
}
```

### Date Arithmetic
```typescript
// Add days
function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

// Start of day
function startOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

// Difference in days
function daysBetween(a: Date, b: Date): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.floor((b.getTime() - a.getTime()) / msPerDay);
}
```

---

## Module Patterns

### Barrel Exports
```typescript
// index.ts
export * from './user.service';
export * from './user.repository';
export * from './user.dto';
export type { User } from './user.entity';
```

### Lazy Loading
```typescript
// Lazy import
async function loadHeavyModule() {
  const { HeavyClass } = await import('./heavy-module');
  return new HeavyClass();
}

// Conditional import
const db = process.env.NODE_ENV === 'test'
  ? await import('./mock-db')
  : await import('./real-db');
```

---

*Last updated: 2024-01*
