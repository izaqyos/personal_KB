---
type: reference
title: Concurrency
description: "C++ concurrency theory and practice: mutexes, how they work, and synchronisation of threads."
tags: [cpp, concurrency, multithreading, guide, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-cpp#27"
---

# Concurrency

[↑ kb-cpp](/kb-cpp/README.md)

## 27.1 Theory

### 27.1.1 Mutex

#### 27.1.1.1 How does a mutex work? What does it cost?

```text
Concurrent programming requires synchronisation. We can’t have more than one thread accessing data at the same time otherwise we end up with a data race. The most common solution is to wrap the critical data access in a mutex. Mutexes are, of course, not free. How the mutex is used has a significant impact in the cost of the code we are writing. When used correctly we’ll barely notice the overhead. When used incorrectly it can cause a program to run worse in threaded mode than it would have single threaded!

Also view CPU Memory – Why do I need a mutex?

What is a mutex?

A mutex, in its most fundamental form, is just an integer in memory. This memory can have a few different values depending on the that state of the mutex. Though usually when we speak of mutexes we also talk of the locks which use the mutex. The integer in memory is not very interesting, but the operations around it are.

There are two fundamental operations which a mutex must provide to be useful:

lock
unlock
unlock is a simple case since it’s usually just one function. Unlocking a mutex makes it available for another process to lock. lock on the other hand usually has several variants. In most cases we’d like to wait until we can lock the mutex, so the most common lock operation does exactly this. Other users may wish to only wait for a given period of time, and yet some other users may not want to wait at all. Thus lock has a few variants, all of which have the goal to lock the mutex.

There can be only one lock on a mutex at any given time. If another thread wishes to lock the same mutex it must wait for the first to unlock it. This is the primary goal of the mutex. Attempting to lock an already locked mutex is called contention. In a well planned program contention should be quite low; you should be designing your code so that most attempts to lock the mutex will not block.

There are two reasons why you want to avoid contention. The first is simply that any thread waiting on a mutex is obviously not doing anything else — possibly resulting in unused CPU cycles. The second reason is more interesting for high performance code. Locking a currently unlocked mutex is extremely cheap compared to the contention case. We have to look at how the mutex works to understand why.

How does it work?

As mentioned before, the data of a mutex is simply an integer in memory. It’s value starts as 0, meaning that it is unlocked. If you wish to lock the mutex you can simply check if it is zero and then assign one. The mutex is now locked and you are the owner of it.

The trick is that the test and set operation has to be atomic. If two threads happen to read 0 at the exact same time, then both would write 1 and think they own the mutex. Without CPU support there is no way to implement a mutex in user space: this operation must be atomic with respect to the other threads. Fortunately CPUs has a function called “compare-and-set” or “test-and-set” which does exactly this. This function takes the address of the integer, and two integer values: a compare and set value. If the compare value matches the current value of the integer then it is replaced with the new value. In C style code this might like look this:

1
2
3
4
5
int compare_set( int * to_compare, int compare, int set );
 
int mutex_value;
int result = compare_set( &mutex_value, 0, 1 );
if( !result ) { /* we got the lock */ }
The caller determines what happens by the return value. It is the value at the pointer provided prior to the swap. If this value is equal to the test value the caller knows the set was successful. If the value is different then the caller knows the value has not changed. When the piece of code is done with the mutex it can simply set the value back to 0. This makes up the very basic part of our mutex.

Atomic increment/decrement functions could also be used and is the recommended way if using the Linux futex.
What about waiting?

Now comes the tricky part. Well, only in a way is it tricky, in another way it is simple. The above test-and-set mechanism provides no support for a thread to wait on the value (aside from a CPU intensive spin-lock). The CPU doesn’t really understand high-level threads and processes, so it isn’t in a position to implement waiting. The OS must provide the waiting functionality.

In order for the CPU to wait correctly a caller is going to need to go through a system call. It is the only thing that can synchronise the various threads and provide the waiting functionality. So if we have to wait on a mutex, or release a waiting mutex, we have no choice but to call the OS. Most OSs have built in mutex primitives. In some cases they provide full fledged mutexes. So if a system call does provide a full mutex why would we bother with any sort of test-and-set in user space? The answer is that system calls have quite a bit of overhead and should be avoided when possible.

Various operating systems diverge greatly at this point, and will likely change as time goes on. Under linux there is a system call futex which provides mutex like semantics. It is specifically designed so that non-contention cases can be completely resolved in user space. Contention cases are then delegated to the operating system to handle in a safe, albeit far costlier manner. The waiting is then handled as part of the OS process scheduler.

futex is actually quite flexible and various locking mechanisms could be build in addition to a mutex, such as a semaphore, a barrier, a read-write mutex, or any kind of signalling.
The Costs

There are a few points of interest when it comes to the cost of a mutex. The first, and very vital point, is waiting time. Your threads should spend only a fraction of their time waiting on mutexes. If they are waiting too often then you are losing concurrency. In a worst case scenario many threads always trying to lock the same mutex may result in performance worse than a single thread serving all requests. This really isn’t a cost of the mutex itself, but a serious concern with concurrent programming.

The overhead costs of a mutex relate to the test-and-set operation and the system call that implements a mutex. The test-and-set is likely very low cost; being essential to concurrent processing the CPUs have good reason to make it efficient. We’ve kind of omitted another important instruction however: the fence. This is used in all high-level mutexes and may have a higher cost than the test-and-set operation. More costlier than even that however is the system call. Not only do you suffer the context switch overhead of the system call, the kernel now spends some time in its scheduling code.

			27.1.1.2
		27.1.2

	27.2
```

## See Also

<!-- backlinks:start -->
### Backlinks

* [Concurrency Patterns - Interview Knowledge Base](/interviews/concurrency-patterns.md)
* [Thread programming concepts (AIX)](/CPP/threads-cpp.md)
<!-- backlinks:end -->
