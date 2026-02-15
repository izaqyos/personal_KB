# Saga Pattern Implementation in TypeScript

Implementation notes from Core V5 Flow PoC.

## Core Concept

Sagas manage distributed transactions by:
1. Breaking transaction into ordered steps
2. Each step has a compensating action
3. On failure, execute compensations in reverse order

## Implementation

### Step Definition

```typescript
interface SagaStep<TContext> {
  id: string;
  name: string;
  execute: (context: TContext) => Promise<void>;
  compensate: (context: TContext) => Promise<void>;
}
```

Key points:
- **Context** - Shared state passed through all steps. Accumulates results from each step.
- **execute()** - Forward action. Throws on failure.
- **compensate()** - Rollback action. Must be idempotent. Should not throw.

### Base Orchestrator Pattern

```typescript
abstract class BaseOrchestrator<TInput, TContext> {
  protected steps: SagaStep<TContext>[] = [];

  async execute(input: TInput): Promise<Result> {
    const context = await this.prepareContext(input);
    const completed: SagaStep<TContext>[] = [];

    for (const step of this.steps) {
      try {
        await step.execute(context);
        completed.push(step);
      } catch (error) {
        await this.rollback(completed, context);
        throw error;
      }
    }

    await this.finalize(context);
    return { success: true };
  }

  private async rollback(completed: SagaStep<TContext>[], context: TContext): Promise<void> {
    // CRITICAL: Reverse order
    for (const step of completed.reverse()) {
      try {
        await step.compensate(context);
      } catch (err) {
        // Log but continue - best effort
        console.error(`Compensation failed: ${step.name}`, err);
      }
    }
  }
}
```

### Concrete Orchestrator Example

```typescript
class NetworkOrchestrator extends BaseOrchestrator<CreateNetworkRequest, NetworkContext> {
  constructor() {
    super();
    this.steps = [
      {
        id: 'ipam',
        name: 'IPAM Allocation',
        execute: async (ctx) => {
          ctx.allocation = await ipamClient.allocate(ctx.input);
        },
        compensate: async (ctx) => {
          if (ctx.allocation) {
            await ipamClient.release(ctx.allocation.id);
          }
        },
      },
      // ... more steps
    ];
  }
}
```

## Design Decisions

### 1. Context Pattern

Use a mutable context object vs. returning results from each step:
- **Pros**: Steps can read prior results. Easy to pass accumulated state.
- **Cons**: Mutations can be hard to track.

### 2. Compensation Idempotency

Compensations should handle:
- Resource already deleted
- Resource never created (check for undefined)
- Partial state

```typescript
compensate: async (ctx) => {
  if (!ctx.allocation) return; // Never created
  try {
    await ipamClient.release(ctx.allocation.id);
  } catch (err) {
    if (err.code === 'NOT_FOUND') return; // Already deleted
    throw err;
  }
}
```

### 3. Event Emission

Emit events for observability:
- `RUNNING` - Step started
- `COMPLETED` - Step succeeded
- `FAILED` - Step threw
- `ROLLING_BACK` - Compensation starting
- `ROLLED_BACK` - Compensation completed

### 4. Failure Injection

For testing, add optional failure injection:

```typescript
if (this.injectFailureAtStep === index) {
  throw new Error('Injected failure for testing');
}
```

## Gotchas

1. **Reverse order for rollback** - Easy to forget. `completed.reverse()` modifies array in place.

2. **Don't stop on compensation failure** - Log and continue. Best effort cleanup.

3. **Guard compensation with existence check** - Step may not have populated context yet.

4. **Context type safety** - Use optional fields for step results that may not exist yet.

## References

- [Microservices.io - Saga Pattern](https://microservices.io/patterns/data/saga.html)
- [Chris Richardson - Sagas](https://www.youtube.com/watch?v=xDuwrtwYHu8)
