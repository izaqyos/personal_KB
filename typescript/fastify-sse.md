# Server-Sent Events with Fastify

Implementation notes from Core V5 Flow PoC.

## Setup

Fastify doesn't have native SSE support. Use raw response.

```typescript
import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

fastify.get('/api/events', async (request: FastifyRequest, reply: FastifyReply) => {
  // Set SSE headers
  reply.raw.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*', // For CORS
  });

  // Send initial connection confirmation
  reply.raw.write(`data: ${JSON.stringify({ type: 'connected' })}\n\n`);

  // ... setup event subscription ...

  // Keep connection open - don't call reply.send()
  await new Promise(() => {});
});
```

## SSE Message Format

```
data: {"key": "value"}\n\n
```

- `data:` prefix required
- JSON payload
- Double newline terminates message
- Can also use `event:` for named events, `id:` for event IDs

## Client Management

Track connected clients for broadcasting:

```typescript
class Store {
  private sseClients: Set<(event: Event) => void> = new Set();

  registerSSEClient(callback: (event: Event) => void): () => void {
    this.sseClients.add(callback);
    return () => this.sseClients.delete(callback); // Cleanup function
  }

  broadcastEvent(event: Event): void {
    for (const client of this.sseClients) {
      try {
        client(event);
      } catch (err) {
        this.sseClients.delete(client); // Remove dead clients
      }
    }
  }
}
```

## In Route Handler

```typescript
// Register this client
const unregister = store.registerSSEClient((event) => {
  reply.raw.write(`data: ${JSON.stringify(event)}\n\n`);
});

// Cleanup on disconnect
request.raw.on('close', () => {
  unregister();
});
```

## Heartbeat

Keep connection alive with periodic comments:

```typescript
const heartbeat = setInterval(() => {
  reply.raw.write(`: heartbeat\n\n`); // Comments start with :
}, 15000);

request.raw.on('close', () => {
  clearInterval(heartbeat);
  unregister();
});
```

## CORS

When using SSE with Vite proxy in dev:

```typescript
// vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
});
```

For production, ensure CORS headers are set on SSE endpoint.

## Gotchas

1. **Don't call `reply.send()`** - Ends the response. Use `await new Promise(() => {})` to keep open.

2. **Double newline required** - `\n\n` terminates each message.

3. **Use `reply.raw`** - Fastify's reply object doesn't support streaming directly.

4. **Client cleanup** - Always listen for `close` event to clean up subscriptions.

5. **Error handling in broadcast** - Wrap in try/catch, remove dead clients.

## Alternative: @fastify/eventsource

For more features, consider the plugin:

```bash
npm install @fastify/eventsource
```

But raw implementation is sufficient for most cases.
