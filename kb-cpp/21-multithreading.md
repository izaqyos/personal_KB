---
type: reference
title: Multithreading
description: "POSIX threads (pthreads) tutorial: thread basics, creation, synchronization with mutexes and condition variables in C/C++."
tags: [cpp, multithreading, concurrency, tutorial, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-cpp#21"
---

# Multithreading

[↑ kb-cpp](/kb-cpp/README.md)

## 21.1 POSIX thread (pthread) libraries

```text
http://www.yolinux.com/TUTORIALS/LinuxTutorialPosixThreads.html

Yolinux.com Linux logo 	
POSIX thread (pthread) libraries

The POSIX thread libraries are a standards based thread API for C/C++. It allows one to spawn a new concurrent process flow. It is most effective on multi-processor or multi-core systems where the process flow can be scheduled to run on another processor thus gaining speed through parallel or distributed processing. Threads require less overhead than "forking" or spawning a new process because the system does not initialize a new system virtual memory space and environment for the process. While most effective on a multiprocessor system, gains are also found on uniprocessor systems which exploit latency in I/O and other system functions which may halt process execution. (One thread may execute while another is waiting for I/O or some other system latency.) Parallel programming technologies such as MPI and PVM are used in a distributed computing environment while threads are limited to a single computer system. All threads within a process share the same address space. A thread is spawned by defining a function and its arguments which will be processed in the thread. The purpose of using the POSIX thread library in your software is to execute software faster.

Table of Contents:

    # Thread Basics
    # Thread Creation and Termination
    # Thread Synchronization
    # Thread Scheduling
    # Thread Pitfalls
    # Thread Debugging
    # Thread Man Pages
    # Links
    # Books
```

### 21.1.1 Thread Basics:

```text
    Thread operations include thread creation, termination, synchronization (joins,blocking), scheduling, data management and process interaction.
    A thread does not maintain a list of created threads, nor does it know the thread that created it.
    All threads within a process share the same address space.
    Threads in the same process share:
        Process instructions
        Most data
        open files (descriptors)
        signals and signal handlers
        current working directory
        User and group id
    Each thread has a unique:
        Thread ID
        set of registers, stack pointer
        stack for local variables, return addresses
        signal mask
        priority
        Return value: errno
    pthread functions return "0" if OK.
```

### 21.1.2 Thread Creation and Termination:

```text
Example: pthread1.c

    01	#include <stdio.h>
    02	#include <stdlib.h>
    03	#include <pthread.h>
    04	 
    05	void *print_message_function( void *ptr );
    06	 
    07	main()
    08	{
    09	     pthread_t thread1, thread2;
    10	     char *message1 = "Thread 1";
    11	     char *message2 = "Thread 2";
    12	     int  iret1, iret2;
    13	 
    14	    /* Create independent threads each of which will execute function */
    15	 
    16	     iret1 = pthread_create( &thread1, NULL, print_message_function, (void*) message1);
    17	     iret2 = pthread_create( &thread2, NULL, print_message_function, (void*) message2);
    18	 
    19	     /* Wait till threads are complete before main continues. Unless we  */
    20	     /* wait we run the risk of executing an exit which will terminate   */
    21	     /* the process and all threads before the threads have completed.   */
    22	 
    23	     pthread_join( thread1, NULL);
    24	     pthread_join( thread2, NULL);
    25	 
    26	     printf("Thread 1 returns: %d\n",iret1);
    27	     printf("Thread 2 returns: %d\n",iret2);
    28	     exit(0);
    29	}
    30	 
    31	void *print_message_function( void *ptr )
    32	{
    33	     char *message;
    34	     message = (char *) ptr;
    35	     printf("%s \n", message);
    36	}

Compile:

    C compiler: cc -lpthread pthread1.c
    or
    C++ compiler: g++ -lpthread pthread1.c


Run: ./a.out
Results:

    Thread 1
    Thread 2
    Thread 1 returns: 0
    Thread 2 returns: 0

Details:

    In this example the same function is used in each thread. The arguments are different. The functions need not be the same.

    Threads terminate by explicitly calling pthread_exit, by letting the function return, or by a call to the function exit which will terminate the process including any threads.

    Function call: pthread_create - create a new thread

        int pthread_create(pthread_t * thread, 
                           const pthread_attr_t * attr,
                           void * (*start_routine)(void *), 
                           void *arg);

    Arguments:
        thread - returns the thread id. (unsigned long int defined in bits/pthreadtypes.h)
        attr - Set to NULL if default thread attributes are used. (else define members of the struct pthread_attr_t defined in bits/pthreadtypes.h) Attributes include:
            detached state (joinable? Default: PTHREAD_CREATE_JOINABLE. Other option: PTHREAD_CREATE_DETACHED)
            scheduling policy (real-time? PTHREAD_INHERIT_SCHED,PTHREAD_EXPLICIT_SCHED,SCHED_OTHER)
            scheduling parameter
            inheritsched attribute (Default: PTHREAD_EXPLICIT_SCHED Inherit from parent thread: PTHREAD_INHERIT_SCHED)
            scope (Kernel threads: PTHREAD_SCOPE_SYSTEM User threads: PTHREAD_SCOPE_PROCESS Pick one or the other not both.)
            guard size
            stack address (See unistd.h and bits/posix_opt.h _POSIX_THREAD_ATTR_STACKADDR)
            stack size (default minimum PTHREAD_STACK_SIZE set in pthread.h),
        void * (*start_routine) - pointer to the function to be threaded. Function has a single argument: pointer to void.
        *arg - pointer to argument of function. To pass multiple arguments, send a pointer to a structure.

    Function call: pthread_join - wait for termination of another thread

        int pthread_join(pthread_t th, void **thread_return);

    Arguments:
        th - thread suspended until the thread identified by th terminates, either by calling pthread_exit() or by being cancelled.
        thread_return - If thread_return is not NULL, the return value of th is stored in the location pointed to by thread_return.

    Function call: pthread_exit - terminate the calling thread

        void pthread_exit(void *retval);

    Arguments:
        retval - Return value of thread.

    This routine kills the thread. The pthread_exit function never returns. If the thread is not detached, the thread id and return value may be examined from another thread by using pthread_join.
    Note: the return pointer *retval, must not be of local scope otherwise it would cease to exist once the thread terminates.

    [C++ pitfalls]: The above sample program will compile with the GNU C and C++ compiler g++. The following function pointer representation below will work for C but not C++. Note the subtle differences and avoid the pitfall below:

        1	void print_message_function( void *ptr );
        2	...
        3	...
        4	iret1 = pthread_create( &thread1, NULL, (void*)&print_message_function, (void*) message1);
        5	...
        6	...
```

### 21.1.3 Thread Synchronization:

```text
The threads library provides three synchronization mechanisms:

    mutexes - Mutual exclusion lock: Block access to variables by other threads. This enforces exclusive access by a thread to a variable or set of variables.
    joins - Make a thread wait till others are complete (terminated).
    condition variables - data type pthread_cond_t

Mutexes:
Mutexes are used to prevent data inconsistencies due to operations by multiple threads upon the same memory area performed at the same time or to prevent race conditions where an order of operation upon the memory is expected. A contention or race condition often occurs when two or more threads need to perform operations on the same memory area, but the results of computations depends on the order in which these operations are performed. Mutexes are used for serializing shared resources such as memory. Anytime a global resource is accessed by more than one thread the resource should have a Mutex associated with it. One can apply a mutex to protect a segment of memory ("critical region") from other threads. Mutexes can be applied only to threads in a single process and do not work between processes as do semaphores.

Example threaded function:

    Without Mutex 	With Mutex
    1	int counter=0;
    2	 
    3	/* Function C */
    4	void functionC()
    5	{
    6	 
    7	   counter++
    8	 
    9	}
    	
    01	/* Note scope of variable and mutex are the same */
    02	pthread_mutex_t mutex1 = PTHREAD_MUTEX_INITIALIZER;
    03	int counter=0;
    04	 
    05	/* Function C */
    06	void functionC()
    07	{
    08	   pthread_mutex_lock( &mutex1 );
    09	   counter++
    10	   pthread_mutex_unlock( &mutex1 );
    11	}
    Possible execution sequence
    Thread 1 	Thread 2 	Thread 1 	Thread 2
    counter = 0 	counter = 0 	counter = 0 	counter = 0
    counter = 1 	counter = 1 	counter = 1 	Thread 2 locked out.
    Thread 1 has exclusive use of variable counter

    	
    	
    	counter = 2

If register load and store operations for the incrementing of variable counter occurs with unfortunate timing, it is theoretically possible to have each thread increment and overwrite the same variable with the same value. Another possibility is that thread two would first increment counter locking out thread one until complete and then thread one would increment it to 2.

    Sequence 	Thread 1 	Thread 2
    1 	counter = 0 	counter=0
    2 	Thread 1 locked out.
    Thread 2 has exclusive use of variable counter 	counter = 1
    3 	counter = 2 	

Code listing: mutex1.c

    01	#include <stdio.h>
    02	#include <stdlib.h>
    03	#include <pthread.h>
    04	 
    05	void *functionC();
    06	pthread_mutex_t mutex1 = PTHREAD_MUTEX_INITIALIZER;
    07	int  counter = 0;
    08	 
    09	main()
    10	{
    11	   int rc1, rc2;
    12	   pthread_t thread1, thread2;
    13	 
    14	   /* Create independent threads each of which will execute functionC */
    15	 
    16	   if( (rc1=pthread_create( &thread1, NULL, &functionC, NULL)) )
    17	   {
    18	      printf("Thread creation failed: %d\n", rc1);
    19	   }
    20	 
    21	   if( (rc2=pthread_create( &thread2, NULL, &functionC, NULL)) )
    22	   {
    23	      printf("Thread creation failed: %d\n", rc2);
    24	   }
    25	 
    26	   /* Wait till threads are complete before main continues. Unless we  */
    27	   /* wait we run the risk of executing an exit which will terminate   */
    28	   /* the process and all threads before the threads have completed.   */
    29	 
    30	   pthread_join( thread1, NULL);
    31	   pthread_join( thread2, NULL);
    32	 
    33	   exit(0);
    34	}
    35	 
    36	void *functionC()
    37	{
    38	   pthread_mutex_lock( &mutex1 );
    39	   counter++;
    40	   printf("Counter value: %d\n",counter);
    41	   pthread_mutex_unlock( &mutex1 );
    42	}

Compile: cc -lpthread mutex1.c
Run: ./a.out
Results:

    Counter value: 1
    Counter value: 2

When a mutex lock is attempted against a mutex which is held by another thread, the thread is blocked until the mutex is unlocked. When a thread terminates, the mutex does not unless explicitly unlocked. Nothing happens by default.
Man Pages:

    pthread_mutex_lock() - acquire a lock on the specified mutex variable. If the mutex is already locked by another thread, this call will block the calling thread until the mutex is unlocked.
    pthread_mutex_unlock() - unlock a mutex variable. An error is returned if mutex is already unlocked or owned by another thread.
    pthread_mutex_trylock() - attempt to lock a mutex or will return error code if busy. Useful for preventing deadlock conditions.

Joins:
A join is performed when one wants to wait for a thread to finish. A thread calling routine may launch multiple threads then wait for them to finish to get the results. One waits for the completion of the threads with a join.

Sample code: join1.c

    01	#include <stdio.h>
    02	#include <pthread.h>
    03	 
    04	#define NTHREADS 10
    05	void *thread_function(void *);
    06	pthread_mutex_t mutex1 = PTHREAD_MUTEX_INITIALIZER;
    07	int  counter = 0;
    08	 
    09	main()
    10	{
    11	   pthread_t thread_id[NTHREADS];
    12	   int i, j;
    13	 
    14	   for(i=0; i < NTHREADS; i++)
    15	   {
    16	      pthread_create( &thread_id[i], NULL, thread_function, NULL );
    17	   }
    18	 
    19	   for(j=0; j < NTHREADS; j++)
    20	   {
    21	      pthread_join( thread_id[j], NULL);
    22	   }
    23	   
    24	   /* Now that all threads are complete I can print the final result.     */
    25	   /* Without the join I could be printing a value before all the threads */
    26	   /* have been completed.                                                */
    27	 
    28	   printf("Final counter value: %d\n", counter);
    29	}
    30	 
    31	void *thread_function(void *dummyPtr)
    32	{
    33	   printf("Thread number %ld\n", pthread_self());
    34	   pthread_mutex_lock( &mutex1 );
    35	   counter++;
    36	   pthread_mutex_unlock( &mutex1 );
    37	}

Compile: cc -lpthread join1.c
Run: ./a.out
Results:

    Thread number 1026
    Thread number 2051
    Thread number 3076
    Thread number 4101
    Thread number 5126
    Thread number 6151
    Thread number 7176
    Thread number 8201
    Thread number 9226
    Thread number 10251
    Final counter value: 10

Man Pages:

    pthread_create() - create a new thread
    pthread_join() - wait for termination of another thread
    pthread_self() - return identifier of current thread

Condition Variables:

A condition variable is a variable of type pthread_cond_t and is used with the appropriate functions for waiting and later, process continuation. The condition variable mechanism allows threads to suspend execution and relinquish the processor until some condition is true. A condition variable must always be associated with a mutex to avoid a race condition created by one thread preparing to wait and another thread which may signal the condition before the first thread actually waits on it resulting in a deadlock. The thread will be perpetually waiting for a signal that is never sent. Any mutex can be used, there is no explicit link between the mutex and the condition variable.

Man pages of functions used in conjunction with the condition variable:

    Creating/Destroying:
        pthread_cond_init
        pthread_cond_t cond = PTHREAD_COND_INITIALIZER;
        pthread_cond_destroy
    Waiting on condition:
        pthread_cond_wait - unlocks the mutex and waits for the condition variable cond to be signaled.
        pthread_cond_timedwait - place limit on how long it will block.
    Waking thread based on condition:
        pthread_cond_signal - restarts one of the threads that are waiting on the condition variable cond.
        pthread_cond_broadcast - wake up all threads blocked by the specified condition variable.

Example code: cond1.c

    01	#include <stdio.h>
    02	#include <stdlib.h>
    03	#include <pthread.h>
    04	 
    05	pthread_mutex_t count_mutex     = PTHREAD_MUTEX_INITIALIZER;
    06	pthread_cond_t  condition_var   = PTHREAD_COND_INITIALIZER;
    07	 
    08	void *functionCount1();
    09	void *functionCount2();
    10	int  count = 0;
    11	#define COUNT_DONE  10
    12	#define COUNT_HALT1  3
    13	#define COUNT_HALT2  6
    14	 
    15	main()
    16	{
    17	   pthread_t thread1, thread2;
    18	 
    19	   pthread_create( &thread1, NULL, &functionCount1, NULL);
    20	   pthread_create( &thread2, NULL, &functionCount2, NULL);
    21	 
    22	   pthread_join( thread1, NULL);
    23	   pthread_join( thread2, NULL);
    24	 
    25	   printf("Final count: %d\n",count);
    26	 
    27	   exit(0);
    28	}
    29	 
    30	// Write numbers 1-3 and 8-10 as permitted by functionCount2()
    31	 
    32	void *functionCount1()
    33	{
    34	   for(;;)
    35	   {
    36	      // Lock mutex and then wait for signal to relase mutex
    37	      pthread_mutex_lock( &count_mutex );
    38	 
    39	      // Wait while functionCount2() operates on count
    40	      // mutex unlocked if condition varialbe in functionCount2() signaled.
    41	      pthread_cond_wait( &condition_var, &count_mutex );
    42	      count++;
    43	      printf("Counter value functionCount1: %d\n",count);
    44	 
    45	      pthread_mutex_unlock( &count_mutex );
    46	 
    47	      if(count >= COUNT_DONE) return(NULL);
    48	    }
    49	}
    50	 
    51	// Write numbers 4-7
    52	 
    53	void *functionCount2()
    54	{
    55	    for(;;)
    56	    {
    57	       pthread_mutex_lock( &count_mutex );
    58	 
    59	       if( count < COUNT_HALT1 || count > COUNT_HALT2 )
    60	       {
    61	          // Condition of if statement has been met.
    62	          // Signal to free waiting thread by freeing the mutex.
    63	          // Note: functionCount1() is now permitted to modify "count".
    64	          pthread_cond_signal( &condition_var );
    65	       }
    66	       else
    67	       {
    68	          count++;
    69	          printf("Counter value functionCount2: %d\n",count);
    70	       }
    71	 
    72	       pthread_mutex_unlock( &count_mutex );
    73	 
    74	       if(count >= COUNT_DONE) return(NULL);
    75	    }
    76	 
    77	}

Compile: cc -lpthread cond1.c
Run: ./a.out
Results:

    Counter value functionCount1: 1
    Counter value functionCount1: 2
    Counter value functionCount1: 3
    Counter value functionCount2: 4
    Counter value functionCount2: 5
    Counter value functionCount2: 6
    Counter value functionCount2: 7
    Counter value functionCount1: 8
    Counter value functionCount1: 9
    Counter value functionCount1: 10
    Final count: 10

Note that functionCount1() was halted while count was between the values COUNT_HALT1 and COUNT_HALT2. The only thing that has been ensures is that functionCount2 will increment the count between the values COUNT_HALT1 and COUNT_HALT2. Everything else is random.

The logic conditions (the "if" and "while" statements) must be chosen to insure that the "signal" is executed if the "wait" is ever processed. Poor software logic can also lead to a deadlock condition.

Note: Race conditions abound with this example because count is used as the condition and can't be locked in the while statement without causing deadlock.
```

### 21.1.4 Thread Scheduling:

```text
When this option is enabled, each thread may have its own scheduling properties. Scheduling attributes may be specified:

    during thread creation
    by dynamically by changing the attributes of a thread already created
    by defining the effect of a mutex on the thread's scheduling when creating a mutex
    by dynamically changing the scheduling of a thread during synchronization operations.

The threads library provides default values that are sufficient for most cases.
```

### 21.1.5 Thread Pitfalls:

```text
    Race conditions: While the code may appear on the screen in the order you wish the code to execute, threads are scheduled by the operating system and are executed at random. It cannot be assumed that threads are executed in the order they are created. They may also execute at different speeds. When threads are executing (racing to complete) they may give unexpected results (race condition). Mutexes and joins must be utilized to achieve a predictable execution order and outcome.

    Thread safe code: The threaded routines must call functions which are "thread safe". This means that there are no static or global variables which other threads may clobber or read assuming single threaded operation. If static or global variables are used then mutexes must be applied or the functions must be re-written to avoid the use of these variables. In C, local variables are dynamically allocated on the stack. Therefore, any function that does not use static data or other shared resources is thread-safe. Thread-unsafe functions may be used by only one thread at a time in a program and the uniqueness of the thread must be ensured. Many non-reentrant functions return a pointer to static data. This can be avoided by returning dynamically allocated data or using caller-provided storage. An example of a non-thread safe function is strtok which is also not re-entrant. The "thread safe" version is the re-entrant version strtok_r.

    Mutex Deadlock: This condition occurs when a mutex is applied but then not "unlocked". This causes program execution to halt indefinitely. It can also be caused by poor application of mutexes or joins. Be careful when applying two or more mutexes to a section of code. If the first pthread_mutex_lock is applied and the second pthread_mutex_lock fails due to another thread applying a mutex, the first mutex may eventually lock all other threads from accessing data including the thread which holds the second mutex. The threads may wait indefinitely for the resource to become free causing a deadlock. It is best to test and if failure occurs, free the resources and stall before retrying.
    01	...
    02	pthread_mutex_lock(&mutex_1);
    03	while ( pthread_mutex_trylock(&mutex_2) )  /* Test if already locked   */
    04	{
    05	   pthread_mutex_unlock(&mutex_1);  /* Free resource to avoid deadlock */
    06	   ...
    07	   /* stall here   */
    08	   ...
    09	   pthread_mutex_lock(&mutex_1);
    10	}
    11	count++;
    12	pthread_mutex_unlock(&mutex_1);
    13	pthread_mutex_unlock(&mutex_2);
    14	...

    The order of applying the mutex is also important. The following code segment illustrates a potential for deadlock:
    01	void *function1()
    02	{
    03	   ...
    04	   pthread_mutex_lock(&lock1);           // Execution step 1
    05	   pthread_mutex_lock(&lock2);           // Execution step 3 DEADLOCK!!!
    06	   ...
    07	   ...
    08	   pthread_mutex_lock(&lock2);
    09	   pthread_mutex_lock(&lock1);
    10	   ...
    11	}
    12	 
    13	void *function2()
    14	{
    15	   ...
    16	   pthread_mutex_lock(&lock2);           // Execution step 2
    17	   pthread_mutex_lock(&lock1);
    18	   ...
    19	   ...
    20	   pthread_mutex_lock(&lock1);
    21	   pthread_mutex_lock(&lock2);
    22	   ...
    23	}
    24	 
    25	main()
    26	{
    27	   ...
    28	   pthread_create(&thread1, NULL, function1, NULL);
    29	   pthread_create(&thread2, NULL, function2, NULL);
    30	   ...
    31	}
    If function1 acquires the first mutex and function2 acquires the second, all resources are tied up and locked.

    Condition Variable Deadlock: The logic conditions (the "if" and "while" statements) must be chosen to insure that the "signal" is executed if the "wait" is ever processed.
```

### 21.1.6 Thread Debugging:

```text
    GDB:
```

#### 21.1.6.1 Debugging Programs with Multiple Threads

```text
Next: Forks, Previous: Inferiors and Programs, Up: Running
```

## 4.10 Debugging Programs with Multiple Threads

```text
In some operating systems, such as HP-UX and Solaris, a single program may have more than one thread of execution. The precise semantics of threads differ from one operating system to another, but in general the threads of a single program are akin to multiple processesexcept that they share one address space (that is, they can all examine and modify the same variables). On the other hand, each thread has its own registers and execution stack, and perhaps private memory.

gdb provides these facilities for debugging multi-thread programs:

    automatic notification of new threads
    `thread threadno', a command to switch among threads
    `info threads', a command to inquire about existing threads
    `thread apply [threadno] [all] args', a command to apply a command to a list of threads
    thread-specific breakpoints
    `set print thread-events', which controls printing of messages on thread start and exit.
    `set libthread-db-search-path path', which lets the user specify which libthread_db to use if the default choice isn't compatible with the program. 

    Warning: These facilities are not yet available on every gdb configuration where the operating system supports threads. If your gdb does not support threads, these commands have no effect. For example, a system without thread support shows no output from `info threads', and always rejects the thread command, like this:

              (gdb) info threads
              (gdb) thread 1
              Thread ID 1 not known.  Use the "info threads" command to
              see the IDs of currently known threads.
         

The gdb thread debugging facility allows you to observe all threads while your program runsbut whenever gdb takes control, one thread in particular is always the focus of debugging. This thread is called the current thread. Debugging commands show program information from the perspective of the current thread.

Whenever gdb detects a new thread in your program, it displays the target system's identification for the thread with a message in the form `[New systag]'. systag is a thread identifier whose form varies depending on the particular system. For example, on gnu/Linux, you might see

     [New Thread 0x41e02940 (LWP 25582)]

when gdb notices a new thread. In contrast, on an SGI system, the systag is simply something like `process 368', with no further qualifier.

For debugging purposes, gdb associates its own thread numberalways a single integerwith each thread in your program.

info threads [id...]
    Display a summary of all threads currently in your program. Optional argument id... is one or more thread ids separated by spaces, and means to print information only about the specified thread or threads. gdb displays for each thread (in this order):

        the thread number assigned by gdb
        the target system's thread identifier (systag)
        the thread's name, if one is known. A thread can either be named by the user (see thread name, below), or, in some cases, by the program itself.
        the current stack frame summary for that thread 

    An asterisk `*' to the left of the gdb thread number indicates the current thread.

    For example, 

     (gdb) info threads
       Id   Target Id         Frame
       3    process 35 thread 27  0x34e5 in sigpause ()
       2    process 35 thread 23  0x34e5 in sigpause ()
     * 1    process 35 thread 13  main (argc=1, argv=0x7ffffff8)
         at threadtest.c:68

On Solaris, you can display more information about user threads with a Solaris-specific command:

maint info sol-threads
    Display info on Solaris user threads. 

thread threadno
    Make thread number threadno the current thread. The command argument threadno is the internal gdb thread number, as shown in the first field of the `info threads' display. gdb responds by displaying the system identifier of the thread you selected, and its current stack frame summary:

              (gdb) thread 2
              [Switching to thread 2 (Thread 0xb7fdab70 (LWP 12747))]
              #0  some_function (ignore=0x0) at example.c:8
              8	    printf ("hello\n");
         

    As with the `[New ...]' message, the form of the text after `Switching to' depends on your system's conventions for identifying threads.

    The debugger convenience variable `$_thread' contains the number of the current thread. You may find this useful in writing breakpoint conditional expressions, command scripts, and so forth. See See Convenience Variables, for general information on convenience variables.


thread apply [threadno | all] command
    The thread apply command allows you to apply the named command to one or more threads. Specify the numbers of the threads that you want affected with the command argument threadno. It can be a single thread number, one of the numbers shown in the first field of the `info threads' display; or it could be a range of thread numbers, as in 2-4. To apply a command to all threads, type thread apply all command.


thread name [name]
    This command assigns a name to the current thread. If no argument is given, any existing user-specified name is removed. The thread name appears in the `info threads' display.

    On some systems, such as gnu/Linux, gdb is able to determine the name of the thread as given by the OS. On these systems, a name specified with `thread name' will override the system-give name, and removing the user-specified name will cause gdb to once again display the system-specified name.


thread find [regexp]
    Search for and display thread ids whose name or systag matches the supplied regular expression.

    As well as being the complement to the `thread name' command, this command also allows you to identify a thread by its target systag. For instance, on gnu/Linux, the target systag is the LWP id.

              (gdb) thread find 26688
              Thread 4 has target id 'Thread 0x41e02940 (LWP 26688)'
              (gdb) info thread 4
                Id   Target Id         Frame
                4    Thread 0x41e02940 (LWP 26688) 0x00000031ca6cd372 in select ()
         


set print thread-events
set print thread-events on
set print thread-events off
    The set print thread-events command allows you to enable or disable printing of messages when gdb notices that new threads have started or that threads have exited. By default, these messages will be printed if detection of these events is supported by the target. Note that these messages cannot be disabled on all targets.


show print thread-events
    Show whether messages will be printed when gdb detects that threads have started and exited. 

See Stopping and Starting Multi-thread Programs, for more information about how gdb behaves when you stop and start programs with multiple threads.

See Setting Watchpoints, for information about watchpoints in programs with multiple threads.

set libthread-db-search-path [path]
    If this variable is set, path is a colon-separated list of directories gdb will use to search for libthread_db. If you omit path, `libthread-db-search-path' will be reset to its default value ($sdir:$pdir on gnu/Linux and Solaris systems). Internally, the default value comes from the LIBTHREAD_DB_SEARCH_PATH macro.

    On gnu/Linux and Solaris systems, gdb uses a helper libthread_db library to obtain information about threads in the inferior process. gdb will use `libthread-db-search-path' to find libthread_db. gdb also consults first if inferior specific thread debugging library loading is enabled by `set auto-load libthread-db' (see libthread_db.so.1 file).

    A special entry `$sdir' for `libthread-db-search-path' refers to the default system directories that are normally searched for loading shared libraries. The `$sdir' entry is the only kind not needing to be enabled by `set auto-load libthread-db' (see libthread_db.so.1 file).

    A special entry `$pdir' for `libthread-db-search-path' refers to the directory from which libpthread was loaded in the inferior process.

    For any libthread_db library gdb finds in above directories, gdb attempts to initialize it with the current inferior process. If this initialization fails (which could happen because of a version mismatch between libthread_db and libpthread), gdb will unload libthread_db, and continue with the next directory. If none of libthread_db libraries initialize successfully, gdb will issue a warning and thread debugging will be disabled.

    Setting libthread-db-search-path is currently implemented only on some platforms.


show libthread-db-search-path
    Display current libthread_db search path.


set debug libthread-db
show debug libthread-db
    Turns on or off display of libthread_db-related events. Use 1 to enable, 0 to disable. 
```

#### 21.1.6.2 GDB: Stopping and starting multi-thread programs

```text
	http://sources.redhat.com/gdb/current/onlinedocs/gdb/Thread-Stops.html#Thread-Stops

gdb supports debugging programs with multiple threads (see Debugging Programs with Multiple Threads). There are two modes of controlling execution of your program within the debugger. In the default mode, referred to as all-stop mode, when any thread in your program stops (for example, at a breakpoint or while being stepped), all other threads in the program are also stopped by gdb. On some targets, gdb also supports non-stop mode, in which other threads can continue to run freely while you examine the stopped thread in the debugger.

    All-Stop Mode: All threads stop when GDB takes control
    Non-Stop Mode: Other threads continue to execute
    Background Execution: Running your program asynchronously
    Thread-Specific Breakpoints: Controlling breakpoints
    Interrupted System Calls: GDB may interfere with system calls
    Observer Mode: GDB does not alter program behavior 
```

#### 21.1.6.3 GDB/MI: Threads commands

```text
			21.1.6.4
    DDD:
        Examining Threads
```

### 21.1.7 Thread Man Pages:

```text
    pthread_atfork - register handlers to be called at fork(2) time
    pthread_attr_destroy [pthread_attr_init] - thread creation attributes
    pthread_attr_getdetachstate [pthread_attr_init] - thread creation attributes
    pthread_attr_getguardsize - get the guardsize attribute in the attr object.
    pthread_attr_getinheritsched [pthread_attr_init] - thread creation attributes
    pthread_attr_getschedparam [pthread_attr_init] - thread creation attributes
    pthread_attr_getschedpolicy [pthread_attr_init] - thread creation attributes
    pthread_attr_getscope [pthread_attr_init] - thread creation attributes
    pthread_attr_getstack - get the thread creation stack attributes stackaddr and stacksize in the attr object.
    pthread_attr_getstackaddr - get the thread creation stackaddr attributes stackaddr attribute in the attr object.
    pthread_attr_getstacksize - get the thread creation stacksize attribute in the attr object.
    pthread_attr_init - thread creation attributes
    pthread_attr_setdetachstate [pthread_attr_init] - thread creation attributes
    pthread_attr_setguardsize - set the guardsize attribute in the attr object.
    pthread_attr_setinheritsched [pthread_attr_init] - thread creation attributes
    pthread_attr_setschedparam [pthread_attr_init] - thread creation attributes
    pthread_attr_setschedpolicy [pthread_attr_init] - thread creation attributes
    pthread_attr_setscope [pthread_attr_init] - thread creation attributes
    pthread_attr_setstack - set the thread creation stack attributes stackaddr and stacksize in the attr object.
    pthread_attr_setstackaddr - set the thread creation stackaddr attributes stackaddr attribute in the attr object.
    pthread_attr_setstacksize - set the thread creation stacksize attribute in the attr object.
    pthread_cancel - thread cancellation
    pthread_cleanup_pop [pthread_cleanup_push] - install and remove cleanup handlers
    pthread_cleanup_pop_restore_np [pthread_cleanup_push] - install and remove cleanup handlers
    pthread_cleanup_push - install and remove cleanup handlers
    pthread_cleanup_push_defer_np [pthread_cleanup_push] - install and remove cleanup handlers
    pthread_condattr_destroy [pthread_condattr_init] - condition creation attributes
    pthread_condattr_init - condition creation attributes
    pthread_cond_broadcast [pthread_cond_init] - operations on conditions
    pthread_cond_destroy [pthread_cond_init] - operations on conditions
    pthread_cond_init - operations on conditions
    pthread_cond_signal [pthread_cond_init] - operations on conditions
    pthread_cond_timedwait [pthread_cond_init] - operations on conditions
    pthread_cond_wait [pthread_cond_init] - operations on conditions
    pthread_create - create a new thread
    pthread_detach - put a running thread in the detached state
    pthread_equal - compare two thread identifiers
    pthread_exit - terminate the calling thread
    pthread_getschedparam [pthread_setschedparam] - control thread scheduling parameters
    pthread_getspecific [pthread_key_create] - management of thread-specific data
    pthread_join - wait for termination of another thread
    pthread_key_create - management of thread-specific data
    pthread_key_delete [pthread_key_create] - management of thread-specific data
    pthread_kill_other_threads_np - terminate all threads in program except calling thread
    pthread_kill [pthread_sigmask] - handling of signals in threads
    pthread_mutexattr_destroy [pthread_mutexattr_init] - mutex creation attributes
    pthread_mutexattr_getkind_np [pthread_mutexattr_init] - mutex creation attributes
    pthread_mutexattr_init - mutex creation attributes
    pthread_mutexattr_setkind_np [pthread_mutexattr_init] - mutex creation attributes
    pthread_mutex_destroy [pthread_mutex_init] - operations on mutexes
    pthread_mutex_init - operations on mutexes
    pthread_mutex_lock [pthread_mutex_init] - operations on mutexes
    pthread_mutex_trylock [pthread_mutex_init] - operations on mutexes
    pthread_mutex_unlock [pthread_mutex_init] - operations on mutexes
    pthread_once - once-only initialization
    pthread_self - return identifier of current thread
    pthread_setcancelstate [pthread_cancel] - thread cancellation
    pthread_setcanceltype [pthread_cancel] - thread cancellation
    pthread_setschedparam - control thread scheduling parameters
    pthread_setspecific [pthread_key_create] - management of thread-specific data
    pthread_sigmask - handling of signals in threads
    pthread_testcancel [pthread_cancel] - thread cancellation

Links:

    Fundamentals Of Multithreading - Paul Mazzucco
    Native Posix Thread Library for Linux
    Posix threads for MS/Win32: [Announcement / description] sourceforge home page
    Introduction to Programming Threads
    Getting Started With POSIX Threads
    ITS: Introduction to Threads
    GNU Portable Threads
    Introduction of threads for Solaris, Linux, and Windows
    Comparison of thread implementations
    comp.programming.threads FAQ
    An in-depth description of PMPthread internal queue functions.
    Examples
    Pthreads tutorial and examples of thread problems - by Andrae Muys
    Valgrind KDE thread checker: Helgrind
    Sun's Multithreaded Programming Guide - Not Linux but a good reference.
    Linux-mag.com: Concurrent Programming Topics - semaphores, condition variables
    Linux-mag.com: The Fibers of Threads - Discussion of how Linux threads work
    Platform independent threads:
        Gnome GLib 2.0 threads - Thread abstraction; including mutexes, conditions and thread private data. [example]
        OmniORB (CORBA) Thread Library
        zThreads
    C++ Thread classes:
        GNU: Common C++ - support for threading, sockets, file access, daemons, persistence, serial I/O, XML parsing and system services
        ACE: Adaptive Communication Environment - C++ interface
            ACE programmers guide: [pdf] (see page 29 for threads)
            Thread management examples using ACE
        Hood - A C++ Threads Library for Multiprogrammed Multiprocessors
        C++ Thread classes - sourceforge
        QpThread

News Groups:

    comp.programming.threads
    comp.unix.solaris

Books:

    	Pthreads Programming A POSIX Standard for Better Multiprocessing
    By Bradford Nichols, Dick Buttlar, Jacqueline Proulx Farrell
    ISBN #1-56592-115-1, O'Reilly

    	Amazon.com
    	Programming with POSIX(R) Threads
    By David R. Butenhof
    ISBN #0201633922, Addison Wesley Pub. Co.

    	Amazon.com
    	C++ Network Programming Volume 1
    By Douglas C. Schmidt, Stephen D. Huston
    ISBN #0201604647, Addison Wesley Pub. Co.

    Covers ACE (ADAPTIVE Communication Environment) open-source framework view of threads and other topics.

    	Amazon.com
```

## 21.2 posix thread join thread timeout

```text
- Objective: run a thread but wait maximum of X seconds for it to complete
```

### 21.2.1 http://man7.org/linux/man-pages/man3/pthread_tryjoin_np.3.html

```text
       pthread_tryjoin_np,  pthread_timedjoin_np - try to join with a termi‐
       nated thread
SYNOPSIS         top

       #define _GNU_SOURCE             /* See feature_test_macros(7) */
       #include <pthread.h>

       int pthread_tryjoin_np(pthread_t thread, void **retval);

       int pthread_timedjoin_np(pthread_t thread, void **retval,
                                const struct timespec *abstime);

       Compile and link with -pthread.
DESCRIPTION         top

       These functions operate in the same way as pthread_join(3), except
       for the differences described on this page.

       The pthread_tryjoin_np() function performs a nonblocking join with
       the thread thread, returning the exit status of the thread in
       *retval.  If thread has not yet terminated, then instead of blocking,
       as is done by pthread_join(3), the call returns an error.

       The pthread_timedjoin_np() function performs a join-with-timeout.  If
       thread has not yet terminated, then the call blocks until a maximum
       time, specified in abstime.  If the timeout expires before thread
       terminates, the call returns an error.  The abstime argument is a
       structure of the following form, specifying an absolute time measured
       since the Epoch (see time(2)):

           struct timespec {
               time_t tv_sec;     /* seconds */
               long   tv_nsec;    /* nanoseconds */
           };
RETURN VALUE         top

       On success, these functions return 0; on error, they return an error
       number.
ERRORS         top

       These functions can fail with the same errors as pthread_join(3).
       pthread_tryjoin_np() can in addition fail with the following error:

       EBUSY  thread had not yet terminated at the time of the call.

       pthread_timedjoin_np() can in addition fail with the following error:

       ETIMEDOUT
              The call timed out before thread terminated.

       pthread_timedjoin_np() never returns the error EINTR.
VERSIONS         top

       These functions first appeared in glibc in version 2.3.3.
CONFORMING TO         top

       These functions are nonstandard GNU extensions; hence the suffix
       "_np" (nonportable) in the names.
EXAMPLE         top

       The following code waits to join for up to 5 seconds:

           struct timespec ts;
           int s;

           ...

           if (clock_gettime(CLOCK_REALTIME, &ts) == -1) {
            /* Handle error */
           }

           ts.tv_sec += 5;

           s = pthread_timedjoin_np(thread, NULL, &ts);
           if (s != 0) {
               /* Handle error */
           }
SEE ALSO         top

       clock_gettime(2), pthread_exit(3), pthread_join(3), pthreads(7)
		21.2.2
-
```

## 21.3 pthread idioms & FAQ

### 21.3.1 Pass member function to thread execution

#### 21.3.1.1 Pass member function to thread execution

#### 21.3.1.1.1 http://stackoverflow.com/questions/1151582/pthread-function-from-a-class

```text
You can't do it the way you've written it because C++ class member functions have a hidden this parameter passed in.  pthread_create() has no idea what value of this to use, so if you try to get around the compiler by casting the method to a function pointer of the appropriate type, you'll get a segmetnation fault. You have to use a static class method (which has no this parameter), or a plain ordinary function to bootstrap the class:

class C
{
public:
    void *hello(void)
    {
        std::cout << "Hello, world!" << std::endl;
        return 0;
    }

    static void *hello_helper(void *context)
    {
        return ((C *)context)->hello();
    }
};
...
C c;
pthread_t t;
pthread_create(&t, NULL, &C::hello_helper, &c);

				21.3.1.1.2

			21.3.1.2
```

### 21.3.2 Read-Write lock, pthread_rwlock_t

#### 21.3.2.1 API

```text
Read/Write Locks in PThreads
Defining a read/write lock variable in Pthreads:
 
   pthread_rwlock_t   x;         
Initializing a read/write lock variable:
After defining the read/write lock variable, you must initialized it using the following function:

 
 int pthread_rwlock_init(pthread_rwlock_t     *rwlock,
			 pthread_rwlockattr_t *attr    );      
rwlock: is the read/write lock that you want to initialize (pass the address !)
attr: is the set of initial property of the read/write lock.
The most common read/write lock is one where the lock is initially in the unlock.

This kind of mutex lock is created using the (default) attribute null:

Example: a read/write lock with an initial unlock state

   pthread_rwlock_init(&x, NULL);  /* Default initialization */    
Read lock a read/write lock:
 
   int pthread_rwlock_rdlock(pthread_rwlock_t *rwlock);
Example:
   pthread_rwlock_t   x;

   pthread_rwlock_init(&x, NULL);
   ...
   pthread_rwlock_rdlock(&x);         //lock for read, block if locked for write on other thread

NOTE: if a thread already hold a write lock on a read/write lock, and performs a pthread_rwlock_rdlock() on that lock, then the outcome if undefined (in order words: do NOT try !)
NOTE: A thread may hold multiple concurrent read locks on a read/write lock (that is, successfully call the pthread_rwlock_rdlock() function n times). If so, the thread must perform matching unlocks (that is, it must call the pthread_rwlock_unlock() function n times).
Write lock a read/write lock:
 
   int pthread_rwlock_wrlock(pthread_rwlock_t *rwlock);
Example:
   pthread_rwlock_t   x;

   pthread_rwlock_init(&x, NULL);
   ...
   pthread_rwlock_wrlock(&x);        //lock for write, block if locked for read or write on other thread
```

#### 21.3.2.2 Simple Example

```text
#define _MULTI_THREADED
#include <pthread.h>
#include <stdio.h>
#include "check.h"

pthread_rwlock_t       rwlock;

void *rdlockThread(void *arg)
{
  int rc;

  printf("Entered thread, getting read lock\n");
  rc = pthread_rwlock_rdlock(&rwlock);
  checkResults("pthread_rwlock_rdlock()\n", rc);
  printf("got the rwlock read lock\n");

  sleep(5);

  printf("unlock the read lock\n");
  rc = pthread_rwlock_unlock(&rwlock);
  checkResults("pthread_rwlock_unlock()\n", rc);
  printf("Secondary thread unlocked\n");
  return NULL;
}

void *wrlockThread(void *arg)
{
  int rc;

  printf("Entered thread, getting write lock\n");
  rc = pthread_rwlock_wrlock(&rwlock);
  checkResults("pthread_rwlock_wrlock()\n", rc);

  printf("Got the rwlock write lock, now unlock\n");
  rc = pthread_rwlock_unlock(&rwlock);
  checkResults("pthread_rwlock_unlock()\n", rc);
  printf("Secondary thread unlocked\n");
  return NULL;
}

int main(int argc, char **argv)
{
  int                   rc=0;
  pthread_t             thread, thread1;

  printf("Enter Testcase - %s\n", argv[0]);

  printf("Main, initialize the read write lock\n");
  rc = pthread_rwlock_init(&rwlock, NULL);
  checkResults("pthread_rwlock_init()\n", rc);

  printf("Main, grab a read lock\n");
  rc = pthread_rwlock_rdlock(&rwlock);
  checkResults("pthread_rwlock_rdlock()\n",rc);

  printf("Main, grab the same read lock again\n");
  rc = pthread_rwlock_rdlock(&rwlock);
  checkResults("pthread_rwlock_rdlock() second\n", rc);

  printf("Main, create the read lock thread\n");
  rc = pthread_create(&thread, NULL, rdlockThread, NULL);
  checkResults("pthread_create\n", rc);

  printf("Main - unlock the first read lock\n");
  rc = pthread_rwlock_unlock(&rwlock);
  checkResults("pthread_rwlock_unlock()\n", rc);

  printf("Main, create the write lock thread\n");
  rc = pthread_create(&thread1, NULL, wrlockThread, NULL);
  checkResults("pthread_create\n", rc);

  sleep(5);
  printf("Main - unlock the second read lock\n");
  rc = pthread_rwlock_unlock(&rwlock);
  checkResults("pthread_rwlock_unlock()\n", rc);

  printf("Main, wait for the threads\n");
  rc = pthread_join(thread, NULL);
  checkResults("pthread_join\n", rc);

  rc = pthread_join(thread1, NULL);
  checkResults("pthread_join\n", rc);

  rc = pthread_rwlock_destroy(&rwlock);
  checkResults("pthread_rwlock_destroy()\n", rc);

  printf("Main completed\n");
  return 0;
}
Output:

Enter Testcase - QP0WTEST/TPRWLINI0
Main, initialize the read write lock
Main, grab a read lock
Main, grab the same read lock again
Main, create the read lock thread
Main - unlock the first read lock
Main, create the write lock thread
Entered thread, getting read lock
got the rwlock read lock
Entered thread, getting write lock
Main - unlock the second read lock
Main, wait for the threads
unlock the read lock
Secondary thread unlocked
Got the rwlock write lock, now unlock
Secondary thread unlocked
Main completed
```

#### 21.3.2.3 Another example, using class ctor/dtor for auto lock/unlock in function scope

```text
cisco/build/stage/opt/pbis/include/lwrwlockguard.h
/*
 * lwrwlockguard.h
 *
 *  Created on: Feb 16, 2014
 *      Author: ashabano
 */

#ifndef LWRWLOCK_H_
#define LWRWLOCK_H_

#include <pthread.h>

class RwLockGuard
{
public:
    RwLockGuard(pthread_rwlock_t& lock, bool writer);
    ~RwLockGuard();

private:
    pthread_rwlock_t& m_lock;
    bool m_writer;
};

#endif /* LWRWLOCK_H_ */

lwadvapi/threaded/lwrwlockguard.cpp

/*
 * lwrwlockguard.cpp
 *
 *  Created on: Feb 16, 2014
 *      Author: ashabano
 */


#include "lwrwlockguard.h"

RwLockGuard::RwLockGuard(pthread_rwlock_t& lock, bool writer) :
    m_lock(lock),
    m_writer(writer)
{
    if (m_writer)
        pthread_rwlock_wrlock(&m_lock);
    else
        pthread_rwlock_rdlock(&m_lock);
}

RwLockGuard::~RwLockGuard()
{
    pthread_rwlock_unlock(&m_lock);
}

			21.3.2.4
		21.3.3


	21.4
```
