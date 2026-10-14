---
type: reference
title: signals
description: Section 49 of the legacy KB_python notes.
tags: [kb-python]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "python/KB_python#49"
---

# signals

[↑ KB_python](/python/kb-python/README.md)

## 49.1 capture SIGINT, ctrl-c

```text
https://stackoverflow.com/questions/1112343/how-do-i-capture-sigint-in-python

a. 
#!/usr/bin/env python
import signal
import sys
def signal_handler(sig, frame):
        print('You pressed Ctrl+C!')
        sys.exit(0)
signal.signal(signal.SIGINT, signal_handler)
print('Press Ctrl+C')
signal.pause()

b.
You can treat it like an exception (KeyboardInterrupt), like any other. Make a new file and run it from your shell with the following contents to see what I mean:

import time, sys

x = 1
while True:
    try:
        print x
        time.sleep(.3)
        x += 1
    except KeyboardInterrupt:
        print "Bye"
        sys.exit()

c. 
And as a context manager:

import signal

class GracefulInterruptHandler(object):

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

    def __exit__(self, type, value, tb):
        self.release()

    def release(self):

        if self.released:
            return False

        signal.signal(self.sig, self.original_handler)

        self.released = True

        return True
To use:

with GracefulInterruptHandler() as h:
    for i in xrange(1000):
        print "..."
        time.sleep(1)
        if h.interrupted:
            print "interrupted!"
            time.sleep(2)
            break
Nested handlers:

with GracefulInterruptHandler() as h1:
    while True:
        print "(1)..."
        time.sleep(1)
        with GracefulInterruptHandler() as h2:
            while True:
                print "\t(2)..."
                time.sleep(1)
                if h2.interrupted:
                    print "\t(2) interrupted!"
                    time.sleep(2)
                    break
        if h1.interrupted:
            print "(1) interrupted!"
            time.sleep(2)
            break

    49.2
```
