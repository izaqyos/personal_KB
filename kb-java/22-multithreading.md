---
type: reference
title: multithreading
description: "Java multithreading: Thread class and related concurrency concepts."
tags: [java, multithreading, concurrency, guide, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "java-kb#15"
---

# multithreading, tags: multithreading

[↑ java-kb](/kb-java/README.md)

## 15.1 Multithreading in java , threading, threads, parallelization, concurrency , tags: Multithreading in java , threading, threads, parallelization, concurrency

### 15.1.1 https://www.geeksforgeeks.org/java-multithreading-tutorial/

#### 15.1.1.1 Using Thread Class

```text
Java provides Thread class to achieve programming invoking threads thereby some major methods of thread class are shown below in the tabular format with which we deal frequently along the action performed by them.
Methods	Action Performed
isDaemon()	It checks whether the current thread is daemon or not
start()	It starts the execution of the thread
run()	It does the executable operations statements in the body of this method over a thread
sleep()	It is a static method that puts the thread to sleep for a certain time been passed as an argument to it
wait()	It sets the thread back in waiting state.
notify()	It gives out a notification to one thread that is in waiting state
notifyAll()	It gives out a notification to all the thread in the waiting state
setDaemon()	It set the current thread as Daemon thread
stop()	It is used to stop the execution of the thread
resume()	It is used to resume the suspended thread.
Pre-requisites: Basic syntax and methods to deal with threads
Now let us come up with how to set the name of the thread. By default, threads are named thread-0, thread-1, and so on. But there is also a method that is often used  as setName() method. Also corresponding to it there is a method getName() which returns the name of the thread be it default or settled already by using setName() method. The syntax is as follows:
Syntax: 
(a) Returning the name of the thread
public String getName() ;
(b) Changing the name of the thread
 public void setName(String name);
My demo, 2 worker threads:
Run:
$ javac HelloWorldThreads.java 
$ java HelloWorldThreads
Thread 1 crunching input 0
Thread 2 crunching input 0
Thread 1 crunching input 1
Thread 2 crunching input 1
Thread 1 crunching input 2
Thread 2 crunching input 2
Thread 2 crunching input 3
Thread 1 crunching input 3
Thread 1 crunching input 4
…

Code:
$ for f in *.java; do echo $f; cat $f;echo "";  echo "------"; done
HelloWorldThreads.java

public class HelloWorldThreads extends Thread{

    public static void main(String[] args) {
        Thread1 myThread1 = new Thread1();
        Thread2 myThread2 = new Thread2();
        myThread1.start();
        myThread2.start();
        
    }
}
------
Thread1.java
public class Thread1 extends Thread{

    public void run(){
        for (int i=0; i<100; i++) {
            System.out.println(String.format("Thread 1 crunching input %d", i));
        }
    }

}
------
Thread2.java
public class Thread2 extends Thread{

    public void run(){
        for (int i=0; i<100; i++) {
            System.out.println(String.format("Thread 2 crunching input %d", i));
        }
    }

}
------
```

#### 15.1.1.2 Using Runnable Interface

```text
Another way to achieve multithreading in java is via the Runnable interface. Here as we have seen in the above example in way 1 where Thread class is extended. Here Runnable interface being a functional interface has its own run() method. Here classes are implemented to the Runnable interface. Later on, in the main() method, Runnable reference is created for the classes that are implemented in order to make bondage with Thread class to run our own corresponding run() methods. Further, while creating an object of Thread class we will pass these references in Thread class as its constructor allows only one runnable object, which is passed as a parameter while creating Thread class object in a main() method. Now lastly just like what we did in Thread class, start() method is invoked over the runnable object who are now already linked with Thread class objects, so the execution begins for our run() methods in case of Runnable interface. It is shown in the program below as follows:
$ cat RunnableThread1.java RunnableThread2.java  HelloWorldThreads.java 
public class RunnableThread1 implements Runnable{

    public void run(){
        for (int i=0; i<4; i++) {
            System.out.println(String.format("RunnableThread 1 crunching input %d", i));
        }
    }

}public class RunnableThread2 implements Runnable{

    public void run(){
        for (int i=0; i<4; i++) {
            System.out.println(String.format("RunnableThread 2 crunching input %d", i));
        }
    }
}
public class HelloWorldThreads extends Thread{

    public static void main(String[] args) {
        System.out.println("Running two threads to crunch some numbers...");
        Thread1 myThread1 = new Thread1();
        Thread2 myThread2 = new Thread2();
        myThread1.start();
        myThread2.start();

        System.out.println("Running two more threads to crunch some more numbers, this time the threads CTOR is passed a Runnable implementing class...");
        RunnableThread1 rt1 = new RunnableThread1();
        RunnableThread2 rt2 = new RunnableThread2();
        Thread t1 = new Thread(rt1);
        Thread t2 = new Thread(rt2);
        t1.start();
        t2.start();

    }
}
```

#### 15.1.1.3 Thread methods

#### 15.1.1.3.1 Sleep

```text
$ cat Thread1.java Thread2.java 
public class Thread1 extends Thread {

    public void run() {
        for (int i = 0; i < 100; i++) {
            System.out.println(String.format("Thread 1 crunching input %d", i));
            try {
                Thread.sleep(1000); // slow thread
            }
            catch (Exception e) {
                System.out.println("Caught exception "+ e);
            }
        }
    }

}public class Thread2 extends Thread{

    public void run(){
        for (int i=0; i<100; i++) {
            System.out.println(String.format("Thread 2 crunching input %d", i));
            try {
                Thread.sleep(200); //faster thread, sleeps 200 ms
            }
            catch (Exception e) {
                System.out.println("Caught exception " + e);
            }
        }
    }

}
Observe T2 faster than T1:
$ java HelloWorldThreads
Running two threads to crunch some numbers...
Running two more threads to crunch some more numbers, this time the threads CTOR is passed a Runnable implementing class...
RunnableThread 1 crunching input 0
Thread 1 crunching input 0
Thread 2 crunching input 0
RunnableThread 2 crunching input 0
RunnableThread 2 crunching input 1
RunnableThread 1 crunching input 1
RunnableThread 2 crunching input 2
RunnableThread 1 crunching input 2
RunnableThread 1 crunching input 3
RunnableThread 2 crunching input 3
Thread 2 crunching input 1
Thread 2 crunching input 2
Thread 2 crunching input 3
Thread 2 crunching input 4
Thread 1 crunching input 1
Thread 2 crunching input 5
Thread 2 crunching input 6
Thread 2 crunching input 7
Thread 2 crunching input 8
Thread 2 crunching input 9
Thread 1 crunching input 2
Thread 2 crunching input 10
Thread 2 crunching input 11
Thread 2 crunching input 12
...

For more information see: https://www.geeksforgeeks.org/thread-sleep-method-in-java-with-examples/
in short, calling it from main thread will put it to sleep.
ex:
// Java Program for sleeping the main thread.
import java.io.*;
import java.lang.Thread;
class GFG {
	public static void main(String[] args)
	{
		// we can also use throws keyword followed by
		// exception name for throwing the exception
	
		try {
			for (int i = 0; i < 5; i++) {
			
				// it will sleep the main thread for 1 sec
				// ,each time the for loop runs
				Thread.sleep(1000);
			
				// printing the value of the variable
				System.out.println(i);
			}
		}
		catch (Exception e) {
		
			// catching the exception
			System.out.println(e);
		}
	}
}

Calling it from thread will sleep the thread. 
Example, see above code. 

Flavors:
|1. public static void sleep(long millis)throws InterruptedException
|2. public static void sleep(long millis)throws IllegalArguementException
|3. public static void sleep(long millis, int nanos)throws InterruptedException
|4. public static void sleep(long millis, int nanos)throws  IllegalArguementException
```

#### 15.1.1.3.2 start

```text
https://www.geeksforgeeks.org/start-function-multithreading-java/
 Java threads are typically created using one of the two methods : (1) Extending thread class. (2) Implementing Runnable
In both the approaches, we override the run() function, but we start a thread by calling the start() function. So why don’t we directly call the overridden run() function? Why always the start function is called to execute a thread?
What happens when a function is called? 
When a function is called the following operations take place: 
 

The arguments are evaluated.
A new stack frame is pushed into the call stack.
Parameters are initialized.
Method body is executed.
Value is returned and current stack frame is popped from the call stack.
The purpose of start() is to create a separate call stack for the thread. A separate call stack is created by it, and then run() is called by JVM.
Let us see what happens if we don’t call start() and rather call run() directly. We have modified the first program discussed here. 

demo:
Illustrate that we cant call run directly. We need to call start to allocate a new call stuck and JVM calls run()
Thread 1 crunching input 0
Thread 1 crunching input 1
Thread 1 crunching input 2
Thread 1 crunching input 3
Thread 1 crunching input 4
Thread 1 crunching input 5
Thread 1 crunching input 6

code:
public class Thread3 extends Thread {

    public void run() {
        for (int i = 0; i < 100; i++) {
            System.out.println(String.format("Thread %d crunching input %d", Thread.currentThread().getId(), i));
            try {
                Thread.sleep(1000); // slow thread
            }
            catch (Exception e) {
                System.out.println("Caught exception "+ e);
            }
        }
    }

}public class HelloWorldThreads extends Thread{

    public static void main(String[] args) {
        System.out.println("Running two threads to crunch some numbers...");
        Thread1 myThread1 = new Thread1();
        Thread2 myThread2 = new Thread2();
        myThread1.start();
        myThread2.start();

        System.out.println("Running two more threads to crunch some more numbers, this time the threads CTOR is passed a Runnable implementing class...");
        RunnableThread1 rt1 = new RunnableThread1();
        RunnableThread2 rt2 = new RunnableThread2();
        Thread t1 = new Thread(rt1);
        Thread t2 = new Thread(rt2);
        t1.start();
        t2.start();

        System.out.println("Illustrate that we cant call run directly. We need to call start to allocate a new call stuck and JVM calls run()");
        Thread3 myThread3 = new Thread3();
        myThread3.run();
    }
}
```

#### 15.1.1.3.3 suspend

```text
https://www.geeksforgeeks.org/how-to-temporarily-stop-a-thread-in-java/
The suspend() method of thread class puts the thread from running to waiting state. This method is employed if you would like to prevent the thread execution and begin it again when a particular event occurs. This method allows a thread to temporarily cease execution. The suspended thread is often resumed using the resume() method. If the present thread cannot modify the target thread then it’ll throw Security Exception.
Note: suspend() method is deprecated in the latest Java version.

code:
// Java program to demonstrate suspend() method
// of Thread class

import java.io.*;

class GFG extends Thread {
	public void run()
	{
		for (int i = 1; i < 5; i++) {
			try {
				
				// thread to sleep for 500 milliseconds
				sleep(5);
				System.out.println(
					"Currently running - "
					+ Thread.currentThread().getName());
			}
			catch (InterruptedException e) {
				System.out.println(e);
			}
			System.out.println(i);
		}
	}
	public static void main(String args[])
	{
		// creating three threads
		GFG t1 = new GFG();
		GFG t2 = new GFG();
		GFG t3 = new GFG();
		
		// call run() method
		t1.start();
		t2.start();
		
		// suspend t2 thread
		t2.suspend();
		
		// call run() method
		t3.start();
	}
}

Note: Thread t2 can be resumed by resume() method.
t2.resume() 
```

#### 15.1.1.3.4 stop

```text
A thread is automatically destroyed when the run() method has completed. But it might be required to kill/stop a thread before it has completed its life cycle. Previously, methods suspend(), resume() and stop() were used to manage the execution of threads. But these methods were deprecated by Java 2 because they could result in system failures. Modern ways to suspend/stop a thread are by using a boolean flag and Thread.interrupt() method.
 

Using a boolean flag: We can define a boolean variable which is used for stopping/killing threads say ‘exit’. Whenever we want to stop a thread, the ‘exit’ variable will be set to true. 

 Using a volatile boolean flag: We can also use a volatile boolean flag to make our code thread safe. A volatile variable is directly stored in the main memory so that threads cannot have locally cached values of it. A situation may arise when more than one threads are accessing the same variable and the changes made by one might not be visible to other threads. In such a situation, we can use a volatile boolean flag. 

demo issue:
$ cat  KillThreadWrongWay.java
public class KillThreadWrongWay{

    static boolean exit = false; // We need static scope since main is static
                                 // and we want to access exit from main
                                 
    public static void main(String[] args) {
        System.out.println("Main thread starting...");
        new Thread() {
            public void run(){
                System.out.println("In thread run()");
                while (!exit){
                    System.out.println("Thread working. waiting for exit flag to finish");
                }
                System.out.println("Thread got exit flag. quitting.");
            }
        }.start();

        try {
            Thread.sleep(500);
        } catch(InterruptedException e){
            e.printStackTrace();
        }
        
        exit = true;
        System.out.println("Exiting main thread");
    }

}
$ javac KillThreadWrongWay.java
$ java KillThreadWrongWay
Thread working. waiting for exit flag to finish
Thread working. waiting for exit flag to finish
Thread working. waiting for exit flag to finish
...

Fix:
$ cat KillThread.java
public class KillThread{

    static volatile boolean exit = false; // We need static scope since main is static
                                 // and we want to access exit from main
                                 
    public static void main(String[] args) {
        System.out.println("Main thread starting...");
        new Thread() {
            public void run(){
                System.out.println("In thread run()");
                while (!exit){
                    System.out.println("Thread working. waiting for exit flag to finish");
                }
                System.out.println("Thread got exit flag. quitting.");
            }
        }.start();

        try {
            Thread.sleep(500);
        } catch(InterruptedException e){
            e.printStackTrace();
        }
        
        exit = true;
        System.out.println("Exiting main thread");
    }

}

Using Thread.interrupt() method: Whenever an interrupt has been sent to a thread, it should stop whatever task it is performing. It is very likely that whenever the thread receives an interrupt, it is to be terminated. This action can be done by using the interrupt() method. Whenever Thread.interrupt() is called, it sets a flag known as the interrupt status to true. This means that the thread has to stop performing further execution. The default value of this flag is false.
// Java program to illustrate
// stopping a thread
// using the interrupt() method

class MyThread implements Runnable {

	Thread t;

	MyThread()
	{
		t = new Thread(this);
		System.out.println("New thread: " + t);
		t.start(); // Starting the thread
	}

	// execution of thread starts from run() method
	public void run()
	{
		while (!Thread.interrupted()) {
			System.out.println("Thread is running");
		}
		System.out.println("Thread has stopped.");
	}
}

// Main class
public class Main {
	public static void main(String args[])
	{
		// creating objects t1 of MyThread
		MyThread t1 = new MyThread();

		try {
			Thread.sleep(1);

			// t1 is an object of MyThread
			// which has an object t
			// which is of type Thread
			t1.t.interrupt();

			Thread.sleep(5);
		}
		catch (InterruptedException e) {
			System.out.println("Caught:" + e);
		}
		System.out.println("Exiting the main Thread");
	}
}

source: https://www.geeksforgeeks.org/killing-threads-in-java/
```

#### 15.1.1.3.5 wait()

```text
The wait() and join() methods are used to pause the current thread. The wait() is used in with notify() and notifyAll() methods, but join() is used in Java to wait until one thread finishes its execution. wait() is mainly used for shared resources, a thread notifies other waiting thread when a resource becomes free. On the other hand join() is used for waiting a thread to die.
Similarities between wait() and join()

The method wait() and join() both are used to pause the current thread in Java.
Both wait() and join() can be interrupted by calling interrupt() method in Java.
Both wait() and join() are a non-static method.
Both wait() and join() are overloaded in Java. wait() and join() which without timeout as well as accepts a timeout parameter.
Difference between wait() and join() method

Most obvious difference, both are present different packages, the wait() method is declared in java.lang.Object class while join() is declared in java.lang.Thread class.
The wait() is used for inter-thread communication while the join() is used for adding sequencing between multiple threads, one thread starts execution after first thread execution finished.
We can start a waiting thread (went into this state by calling wait()) by using notify() and notifyAll() method but we can not break the waiting imposed by join without unless or interruption the thread on which join is called has execution finished.
One most important difference between wait() and join() that is wait() must be called from synchronized context i.e. synchronized block or method otherwise it will throw IllegalMonitorStateException but On the other hand, we can call join() method with and without synchronized context in Java.
```

#### 15.1.1.3.6 notify, notifyAll

```text
The notify() and notifyAll() methods with wait() methods are used for communication between the threads. A thread that goes into waiting for state by calling the wait() method will be in waiting for the state until any other thread calls either notify() or notifyAll() method on the same object. 

notify(): The notify() method is defined in the Object class, which is Java’s top-level class. It’s used to wake up only one thread that’s waiting for an object, and that thread then begins execution. The thread class notify() method is used to wake up a single thread.

notifyAll(): The notifyAll() wakes up all threads that are waiting on this object’s monitor. A thread waits on an object’s monitor by calling one of the wait methods. The awakened threads will not be able to proceed until the current thread relinquishes the lock on this object.




Now the question is both notify() and notifyAll() the method is used to give notification to the waiting thread, then what is the difference between them or where we should use notify() method and where we should go for the notifyAll() method? 

Sr. No.	Key	notify()	notifyAll() 
1	Notifications	In the case of the multiThreading, notify() method sends the notification to only one thread among the multiple waiting threads which are waiting for the send lock.	While notifyAll() methods in the same context send notifications to all waiting threads instead of a single thread.
2	Thread identifications	As in the case of notify() method, the notification is sent to a single thread among the multiple waiting threads, so it is sure that which of those waiting threads is going to receive the lock.	On the other hand, notifyAll() sends a notification to all waiting threads. Hence, it is not clear which of the thread is going to receive the lock.
3	Risk factor	In the case of notify() method, the risk of thread missing is high as notification is sent only a single thread, and if it misses that, then no other thread would get a notification and hence the lock.	While in the case of notifyAll(), it sends a notification to all the waiting threads, and hence if any thread misses the notification, there are other threads to do the job. Hence the risk is less.
4	Performance	Memory and CPU drain is less in notify() method as compared to notifyAll() method as notification is sent to single one thread so performance is better as compared to notifyAll().	On the other hand, the cost of no notification is dropped and notification is sent to all waiting threads, the memory and CPU drain is more as compared to notify() and hence performance of notifyAll() is lesser.
5	Interchangeable	In the case of the notify() method, only a single thread is in the picture hence no concept of thread Interchangeable is possible.	While we should go for notifyAll() if all your waiting threads are interchangeable (the order they wake up doesn’t matter).
Let’s understand how the notify() method behaves:

Java
// Java program to illustrate the
// behaviour of notify() method
class Geek1 extends Thread {
    public void run()
    {
        synchronized (this)
        {
            System.out.println(
                Thread.currentThread().getName()
                + "...starts");
            try {
                this.wait();
            }
            catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println(
                Thread.currentThread().getName()
                + "...notified");
        }
    }
}
class Geek2 extends Thread {
    Geek1 geeks1;
   
    Geek2(Geek1 geeks1){
      this.geeks1 = geeks1;
    }
   
    public void run()
    {
        synchronized (this.geeks1)
        {
            System.out.println(
                Thread.currentThread().getName()
                + "...starts");
 
            try {
                this.geeks1.wait();
            }
            catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println(
                Thread.currentThread().getName()
                + "...notified");
        }
    }
}
class Geek3 extends Thread {
    Geek1 geeks1;
    Geek3(Geek1 geeks1) { this.geeks1 = geeks1; }
    public void run()
    {
        synchronized (this.geeks1)
        {
            System.out.println(
                Thread.currentThread().getName()
                + "...starts");
            this.geeks1.notify();
            System.out.println(
                Thread.currentThread().getName()
                + "...notified");
        }
    }
}
class MainClass {
    public static void main(String[] args)
        throws InterruptedException
    {
 
        Geek1 geeks1 = new Geek1();
        Geek2 geeks2 = new Geek2(geeks1);
        Geek3 geeks3 = new Geek3(geeks1);
        Thread t1 = new Thread(geeks1, "Thread-1");
        Thread t2 = new Thread(geeks2, "Thread-2");
        Thread t3 = new Thread(geeks3, "Thread-3");
        t1.start();
        t2.start();
        Thread.sleep(100);
        t3.start();
    }
}
Output: 

Thread-1...start
Thread-2...starts
Thread-3...starts
Thread-3...notified
Thread-1...notified
Lets understand how notifyAll() method behaves:  

Java

// Java program to illustrate the
// behavior of notifyAll() method
 
class Geek1 extends Thread {
    public void run()
    {
        synchronized (this)
        {
            System.out.println(
                Thread.currentThread().getName()
                + "...starts");
            try {
                this.wait();
            }
            catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println(
                Thread.currentThread().getName()
                + "...notified");
        }
    }
}
class Geek2 extends Thread {
    Geek1 geeks1;
   
    Geek2(Geek1 geeks1){
      this.geeks1 = geeks1;
    }
   
    public void run()
    {
        synchronized (this.geeks1)
        {
            System.out.println(
                Thread.currentThread().getName()
                + "...starts");
 
            try {
                this.geeks1.wait();
            }
            catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println(
                Thread.currentThread().getName()
                + "...notified");
        }
    }
}
class Geek3 extends Thread {
    Geek1 geeks1;
    Geek3(Geek1 geeks1) { this.geeks1 = geeks1; }
    public void run()
    {
        synchronized (this.geeks1)
        {
            System.out.println(
                Thread.currentThread().getName()
                + "...starts");
 
            this.geeks1.notifyAll();
            System.out.println(
                Thread.currentThread().getName()
                + "...notified");
        }
    }
}
class MainClass {
    public static void main(String[] args)
        throws InterruptedException
    {
 
        Geek1 geeks1 = new Geek1();
        Geek2 geeks2 = new Geek2(geeks1);
        Geek3 geeks3 = new Geek3(geeks1);
        Thread t1 = new Thread(geeks1, "Thread-1");
        Thread t2 = new Thread(geeks2, "Thread-2");
        Thread t3 = new Thread(geeks3, "Thread-3");
        t1.start();
        t2.start();
        Thread.sleep(100);
        t3.start();
    }
}
Output
Thread-1...starts
Thread-2...starts
Thread-3...starts
Thread-3...notified
Thread-1...notified
Thread-2...notified
When to Use notify() method and notifyAll()?
In the case of mutually exclusive locking, only one of the waiting threads can do something useful after being notified (in this case acquire the lock). In such a case, you would rather use notify(). Properly implemented, you could use notifyAll() in this situation as well, but you would unnecessarily wake threads that can’t do anything anyway.
In some cases, all waiting threads can take useful action once the wait finishes. An example would be a set of threads waiting for a certain task to finish; once the task has finished, all waiting threads can continue with their business. In such a case you would use notifyAll() to wake up all waiting threads at the same time.
Applications of notify() and notifyAll()
A maintenance operation on a shared resource, where multiple threads are waiting for the operation to complete before accessing the resource; for these, we should go for notifyAll().
Let’s say we have a producer thread and a consumer thread. Each “packet” produced by the producer should be consumed by a consumer. The consumer puts something in a queue and then calls notify().
We want to have a notification when a lengthy process has finished. You want a beep and a screen update. The process performs notifyAll() to notify both the beeping thread and the screen-update-thread.

                15.1.1.3.7
```

#### 15.1.1.4 Priorities in threads, , tags: Priorities in threads

```text
Impact of Thread Priorities
Thread priorities influence how the JVM schedules and allocates resources to threads. A higher priority thread has a better chance of being executed before lower priority threads. However, it’s important to remember that priority alone does not determine the order of thread execution. The JVM’s thread scheduler takes other factors, such as the underlying operating system and thread states, into account.

Thread priority is useful when certain threads require more processing time or have critical tasks. By giving such threads a higher priority, developers can ensure that they receive enough CPU time to complete their tasks on time. It is not, however, recommended to rely solely on thread priorities to achieve specific execution behavior.
Priorities in threads is a concept where each thread is having a priority which is represented by numbers ranging from 1 to 10. 

The default priority is set to 5 as excepted.
Minimum priority is set to 0.
Maximum priority is set to 10.
Here 3 constants are defined in it namely as follows:

public static int NORM_PRIORITY
public static int MIN_PRIORITY
public static int MAX_PRIORITY
Let us discuss it with an example to get how internally the work is getting executed. Here we will be using the knowledge gathered above as follows:

We will use currentThread() method to get the name of the current thread. User can also use setName() method if he/she wants to make names of thread as per choice for understanding purposes.
getName() method will be used to get the name of the thread.

demo and code:
$ cat ThreadPriority.java 
// Java Program to illustrate Priority Threads
// Case 1: No priority is assigned (Default priority)

// Importing input output thread class
import java.io.*;
// Importing Thread class from java.util package
import java.util.*;

// Class 1
// Helper Class (Our thread class)
class MyThread extends Thread {

	public void run()
	{

		// Printing the current running thread via getName()
		// method using currentThread() method
		System.out.println("Running Thread : "
						+ currentThread().getName());

		// Print and display the priority of current thread
		// via currentThread() using getPriority() method
		System.out.println("Running Thread Priority : "
						+ currentThread().getPriority());
	}
}

class DefaultPriority {

	// Main driver method
	public static void main(String[] args)
	{

		// Creating objects of MyThread(above class)
		// in the main() method
		MyThread t1 = new MyThread();
		MyThread t2 = new MyThread();

		t1.start();
		t2.start();
	}
}

class NormalPriority {

	// Main driver method
	public static void main(String[] args)
	{

		// Creating objects of MyThread(above class)
		// in the main() method
		MyThread t1 = new MyThread();
		MyThread t2 = new MyThread();

       // Setting priority to thread via NORM_PRIORITY
        // which set priority to 5 as default thread
        t1.setPriority(Thread.NORM_PRIORITY);
        t2.setPriority(Thread.NORM_PRIORITY);

		// Case 1: Default Priority no setting
		t1.start();
		t2.start();
	}
}

class MinPriority {

	// Main driver method
	public static void main(String[] args)
	{

		// Creating objects of MyThread(above class)
		// in the main() method
		MyThread t1 = new MyThread();
		MyThread t2 = new MyThread();

       // Setting priority to thread via NORM_PRIORITY
        // which set priority to 5 as default thread
        t1.setPriority(Thread.MIN_PRIORITY);
        t2.setPriority(Thread.MIN_PRIORITY);

		// Case 1: Default Priority no setting
		t1.start();
		t2.start();
	}
}

class MaxPriority {

	// Main driver method
	public static void main(String[] args)
	{

		// Creating objects of MyThread(above class)
		// in the main() method
		MyThread t1 = new MyThread();
		MyThread t2 = new MyThread();

       // Setting priority to thread via NORM_PRIORITY
        // which set priority to 5 as default thread
        t1.setPriority(Thread.MAX_PRIORITY);
        t2.setPriority(Thread.MAX_PRIORITY);

		// Case 1: Default Priority no setting
		t1.start();
		t2.start();
	}
}

$ for f in *.class; do echo "Running ${f%.*}"; java "${f%.*}" ; echo "---------"; done
Running DefaultPriority
Running Thread : Thread-0
Running Thread : Thread-1
Running Thread Priority : 5
Running Thread Priority : 5
---------
Running MaxPriority
Running Thread : Thread-0
Running Thread : Thread-1
Running Thread Priority : 10
Running Thread Priority : 10
---------
Running MinPriority
Running Thread : Thread-0
Running Thread : Thread-1
Running Thread Priority : 1
Running Thread Priority : 1
---------
Running MyThread
Error: Main method not found in class MyThread, please define the main method as:
   public static void main(String[] args)
or a JavaFX application class must extend javafx.application.Application
---------
Running NormalPriority
Running Thread : Thread-0
Running Thread : Thread-1
Running Thread Priority : 5
Running Thread Priority : 5
---------
```

#### 15.1.1.5 daemon threads

```text
            15.1.1.6
```

### 15.1.2 Thread lifecycle and state-machine

```text
https://www.geeksforgeeks.org/lifecycle-and-states-of-a-thread-in-java/
A thread in Java at any point of time exists in any one of the following states. A thread lies only in one of the shown states at any instant: 
New
Runnable
Blocked
Waiting
Timed Waiting
Terminated
Life Cycle of a thread
New Thread: When a new thread is created, it is in the new state. The thread has not yet started to run when the thread is in this state. When a thread lies in the new state, its code is yet to be run and hasn’t started to execute.
Runnable State: A thread that is ready to run is moved to a runnable state. In this state, a thread might actually be running or it might be ready to run at any instant of time. It is the responsibility of the thread scheduler to give the thread, time to run. 
A multi-threaded program allocates a fixed amount of time to each individual thread. Each and every thread runs for a short while and then pauses and relinquishes the CPU to another thread so that other threads can get a chance to run. When this happens, all such threads that are ready to run, waiting for the CPU and the currently running thread lie in a runnable state.
Blocked/Waiting state: When a thread is temporarily inactive, then it’s in one of the following states: 
Blocked
Waiting
Timed Waiting: A thread lies in a timed waiting state when it calls a method with a time-out parameter. A thread lies in this state until the timeout is completed or until a notification is received. For example, when a thread calls sleep or a conditional wait, it is moved to a timed waiting state.
Terminated State: A thread terminates because of either of the following reasons: 
Because it exits normally. This happens when the code of the thread has been entirely executed by the program.
Because there occurred some unusual erroneous event, like segmentation fault or an unhandled exception.

| 1. New 
| Declaration: public static final Thread.State NEW
| Description: Thread state for a thread that has not yet started. 
| 
| 2. Runnable 
| Declaration: public static final Thread.State RUNNABLE
| Description: Thread state for a runnable thread. A thread in the runnable state is executing in the Java virtual machine but it may be waiting for other resources from the operating system such as a processor. 
| 
| 3. Blocked 
| Declaration: public static final Thread.State BLOCKED
| Description: Thread state for a thread blocked waiting for a monitor lock. A thread in the blocked state is waiting for a monitor lock to enter a synchronized block/method or reenter a synchronized block/method after calling Object.wait(). 
| 4. Waiting 
| Declaration: public static final Thread.State WAITING
| Description: Thread state for a waiting thread. A thread is in the waiting state due to calling one of the following methods: 
| 
| Object.wait with no timeout
| Thread.join with no timeout
| LockSupport.park
| 5. Timed Waiting 
| Declaration: public static final Thread.State TIMED_WAITING
| Description: Thread state for a waiting thread with a specified waiting time. A thread is in the timed waiting state due to calling one of the following methods with a specified positive waiting time: 
| 
| Thread.sleep
| Object.wait with timeout
| Thread.join with timeout
| LockSupport.parkNanos
| LockSupport.parkUntil
| 6. Terminated 
| Declaration: public static final Thread.State TERMINATED

demo:
$ cat Test.java 
// Java program to demonstrate thread states
class thread implements Runnable {
	public void run()
	{
		// moving thread2 to timed waiting state
		try {
			Thread.sleep(1500);
		}
		catch (InterruptedException e) {
			e.printStackTrace();
		}

		System.out.println(
			"State of thread1 while it called join() method on thread2 -"
			+ Test.thread1.getState());
		try {
			Thread.sleep(200);
		}
		catch (InterruptedException e) {
			e.printStackTrace();
		}
	}
}

public class Test implements Runnable {
	public static Thread thread1;
	public static Test obj;

	public static void main(String[] args)
	{
		obj = new Test();
		thread1 = new Thread(obj);

		// thread1 created and is currently in the NEW
		// state.
		System.out.println(
			"State of thread1 after creating it - "
			+ thread1.getState());
		thread1.start();

		// thread1 moved to Runnable state
		System.out.println(
			"State of thread1 after calling .start() method on it - "
			+ thread1.getState());
	}

	public void run()
	{
		thread myThread = new thread();
		Thread thread2 = new Thread(myThread);

		// thread1 created and is currently in the NEW
		// state.
		System.out.println(
			"State of thread2 after creating it - "
			+ thread2.getState());
		thread2.start();

		// thread2 moved to Runnable state
		System.out.println(
			"State of thread2 after calling .start() method on it - "
			+ thread2.getState());

		// moving thread1 to timed waiting state
		try {
			// moving thread1 to timed waiting state
			Thread.sleep(200);
		}
		catch (InterruptedException e) {
			e.printStackTrace();
		}
		System.out.println(
			"State of thread2 after calling .sleep() method on it - "
			+ thread2.getState());

		try {
			// waiting for thread2 to die
			thread2.join();
		}
		catch (InterruptedException e) {
			e.printStackTrace();
		}
		System.out.println(
			"State of thread2 when it has finished it's execution - "
			+ thread2.getState());
	}
}

$ javac Test.java
$ java Test
State of thread1 after creating it - NEW
State of thread1 after calling .start() method on it - RUNNABLE
State of thread2 after creating it - NEW
State of thread2 after calling .start() method on it - RUNNABLE
State of thread2 after calling .sleep() method on it - TIMED_WAITING
State of thread1 while it called join() method on thread2 -WAITING
State of thread2 when it has finished it's execution - TERMINATED

        15.1.3
    15.2
```
