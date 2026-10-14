---
type: reference
title: signals
description: "Legacy Python KB section: signals (capture SIGINT, ctrl-c)"
tags: [python, legacy, reference]
generated: { by: "human:izaqyos", at: "2026-10-14T00:00:00Z" }
stale_after: "2028-10-14T00:00:00Z"
sources:
  - { id: py-signal, resource: "https://docs.python.org/3/library/signal.html", title: "signal — Set handlers for asynchronous events (Python 3 documentation)" }
  - { id: py-asyncio-loop, resource: "https://docs.python.org/3/library/asyncio-eventloop.html#unix-signals", title: "asyncio Event Loop — Unix signals (Python 3 documentation)" }
status: stable
capture_type: source
legacy_source: "python/KB_python#49"
---

# signals

[↑ KB_python](/python/kb-python/README.md)

## 49.1 capture SIGINT, ctrl-c

> Updated 2026-10 to current practice.[^py-signal]

Source: [How do I capture SIGINT in Python? (Stack Overflow)](https://stackoverflow.com/questions/1112343/how-do-i-capture-sigint-in-python). The original snippets mixed Python 2 and 3. All three are Python 3 below. Python calls signal handlers only in the main thread. `signal.pause()` works only on Unix.[^py-signal]

**a. Install a handler with `signal.signal`:**

```python
#!/usr/bin/env python3
import signal
import sys


def signal_handler(sig, frame):
    print("You pressed Ctrl+C!")
    sys.exit(0)


signal.signal(signal.SIGINT, signal_handler)
print("Press Ctrl+C")
signal.pause()
```

**b. Treat it as an exception.** By default, Python turns SIGINT into `KeyboardInterrupt`, which you can catch like any other exception:

```python
import sys
import time

x = 1
while True:
    try:
        print(x)
        time.sleep(0.3)
        x += 1
    except KeyboardInterrupt:
        print("Bye")
        sys.exit()
```

**c. As a context manager** that defers Ctrl+C until a safe point:

```python
import signal
import time


class GracefulInterruptHandler:
    def __init__(self, sig=signal.SIGINT):
        self.sig = sig

    def __enter__(self):
        self.interrupted = False
        self.released = False
        self.original_handler = signal.getsignal(self.sig)

        def handler(signum, frame):
            self.release()
            self.interrupted = True

        signal.signal(self.sig, handler)
        return self

    def __exit__(self, exc_type, exc, tb):
        self.release()

    def release(self):
        if self.released:
            return False
        signal.signal(self.sig, self.original_handler)
        self.released = True
        return True
```

To use:

```python
with GracefulInterruptHandler() as h:
    for i in range(1000):
        print("...")
        time.sleep(1)
        if h.interrupted:
            print("interrupted!")
            time.sleep(2)
            break
```

Nested handlers:

```python
with GracefulInterruptHandler() as h1:
    while True:
        print("(1)...")
        time.sleep(1)
        with GracefulInterruptHandler() as h2:
            while True:
                print("\t(2)...")
                time.sleep(1)
                if h2.interrupted:
                    print("\t(2) interrupted!")
                    time.sleep(2)
                    break
        if h1.interrupted:
            print("(1) interrupted!")
            time.sleep(2)
            break
```

In asyncio code, use `loop.add_signal_handler(signal.SIGINT, callback)` (Unix only) rather than `signal.signal`.[^py-asyncio-loop]

[^py-signal]: signal — Set handlers for asynchronous events (Python 3 documentation)
[^py-asyncio-loop]: asyncio Event Loop — Unix signals (Python 3 documentation)
