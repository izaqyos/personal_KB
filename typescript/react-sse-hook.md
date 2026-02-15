# React Hook for Server-Sent Events

Implementation notes from Core V5 Flow PoC.

## Basic Hook

```typescript
import { useState, useEffect, useCallback, useRef } from 'react';

interface UseSSEOptions {
  url: string;
  autoConnect?: boolean;
}

interface UseSSEReturn<T> {
  events: T[];
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
  clearEvents: () => void;
}

export function useSSE<T>({ url, autoConnect = true }: UseSSEOptions): UseSSEReturn<T> {
  const [events, setEvents] = useState<T[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);

  const connect = useCallback(() => {
    // Close existing connection
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    const eventSource = new EventSource(url);
    eventSourceRef.current = eventSource;

    eventSource.onopen = () => {
      setIsConnected(true);
    };

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as T;
        setEvents((prev) => [...prev, data]);
      } catch (err) {
        console.error('Failed to parse SSE event:', err);
      }
    };

    eventSource.onerror = () => {
      setIsConnected(false);
      // Auto-reconnect after delay
      setTimeout(() => {
        if (eventSourceRef.current === eventSource) {
          connect();
        }
      }, 3000);
    };
  }, [url]);

  const disconnect = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
      setIsConnected(false);
    }
  }, []);

  const clearEvents = useCallback(() => {
    setEvents([]);
  }, []);

  // Auto-connect on mount
  useEffect(() => {
    if (autoConnect) {
      connect();
    }
    return () => {
      disconnect();
    };
  }, [autoConnect, connect, disconnect]);

  return { events, isConnected, connect, disconnect, clearEvents };
}
```

## Usage

```typescript
function App() {
  const { events, isConnected, clearEvents } = useSSE<OrchestrationEvent>({
    url: '/api/events',
    autoConnect: true,
  });

  return (
    <div>
      <span>{isConnected ? '🟢 Connected' : '🔴 Disconnected'}</span>
      <button onClick={clearEvents}>Clear</button>
      {events.map((e, i) => (
        <div key={i}>{e.step}: {e.status}</div>
      ))}
    </div>
  );
}
```

## Event Filtering

Add helper to filter events:

```typescript
const getEventsForOrchestration = useCallback(
  (orchestrationId: string) => {
    return events.filter((e) => e.orchestrationId === orchestrationId);
  },
  [events]
);
```

## Key Design Decisions

### 1. useRef for EventSource

Store EventSource in ref, not state:
- Avoids re-renders on connection state
- Allows cleanup in useEffect
- Enables checking current instance in reconnect

### 2. Auto-Reconnect

EventSource doesn't auto-reconnect on all errors. Handle manually:

```typescript
eventSource.onerror = () => {
  setTimeout(() => {
    if (eventSourceRef.current === eventSource) { // Same instance check
      connect();
    }
  }, 3000);
};
```

### 3. Event Accumulation

Using `setEvents((prev) => [...prev, data])`:
- Preserves all events
- Functional update for safety
- Call `clearEvents()` when starting new operation

### 4. Connection Status

Expose `isConnected` for UI feedback:
- Show indicator
- Disable forms when disconnected

## Gotchas

1. **Cleanup on unmount** - Always close EventSource in useEffect cleanup.

2. **Duplicate connections** - Close existing before creating new.

3. **Same-instance check** - In reconnect, verify current ref matches to avoid double connections.

4. **Memory growth** - Events array grows unbounded. Clear periodically or cap length.

5. **SSE vs WebSocket** - SSE is one-way (server → client). For bidirectional, use WebSocket.

## Event Deduplication (Optional)

If events can duplicate:

```typescript
eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data) as T & { eventId: string };
  setEvents((prev) => {
    if (prev.some(e => e.eventId === data.eventId)) {
      return prev; // Skip duplicate
    }
    return [...prev, data];
  });
};
```

## Named Events

For multiple event types:

```typescript
eventSource.addEventListener('orchestration', (event) => {
  // Handle orchestration events
});

eventSource.addEventListener('heartbeat', (event) => {
  // Handle heartbeat
});
```

Server sends: `event: orchestration\ndata: {...}\n\n`
