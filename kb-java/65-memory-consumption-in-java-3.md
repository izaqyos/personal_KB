---
type: reference
title: Memory Consumption in Java
description: Section 2 of the legacy java-kb notes.
tags: [kb-java]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "java-kb#2"
---

# Memory Consumption in Java

[↑ java-kb](/kb-java/README.md)

```text
Although there is no sizeof operator in Java, we actually don't need one. All primitive types have a standard size, and there are typically no pad or alignment bytes. Still, this isn't always straightforward.

Although primitives must behave as if they have the official sizes, a JVM can store data in any way it pleases internally, with any amount of padding or overhead. It can choose to store a boolean[] in 64-bit long chunks like BitSet, allocate some temporary Objects on the stack or optimize some variables or method calls totally out of existence replacing them with constants, etc… But, as long as the program gives the same result, it's perfectly fine.

Taking also into the account hardware and OS caches impact (our data could be duplicated on every cache level), it means that we can only roughly predict RAM consumption..


Minimum object size is 16 bytes for modern 64-bit JDK since the object has 12-byte header, padded to a multiple of 8 bytes. In 32-bit JDK, the overhead is 8 bytes, padded to a multiple of 4 bytes.

References have a typical size of 4 bytes on 32-bit platforms and on 64-bits platforms with heap boundary less than 32Gb (-Xmx32G), and 8 bytes for this boundary above 32Gb.

This means that a 64-bit JVM usually requires 30-50% more heap space.

Especially relevant is to note that boxed types, arrays, Strings and other containers like multidimensional arrays are memory costly since they add certain overhead. For example, when we compare int primitive (which consumes only 4 bytes) to the Integer object which takes 16 bytes, we see that there is 300% memory overhead.


 Estimating Object Size Using Instrumentation
One way to get an estimate of an object's size in Java is to use getObjectSize(Object) method of the Instrumentation interface introduced in Java 5.


freestar
As we could see in Javadoc documentation, the method provides “implementation-specific approximation” of the specified object's size. It's noteworthy that a potential inclusion of overhead in the size exists and values can be different during single JVM invocation.

This approach only supports size estimation of the considered object itself and not the sizes of objects it references. To estimate a total size of the object, we would need a code that would go over those references and calculate the estimated size.

 Creating Instrumentation Agent
In order to call Instrumentation.getObjectSize(Object) to get object's size, we need to be able to access the instance of Instrumentation first. We need to use the instrumentation agent and there are two ways to do it, as described in the documentation for the java.lang.instrument package.

Instrumentation agent can be specified via the command-line or we can use it with an already running JVM. We'll focus on the first one.

To specify the instrumentation agent via the command-line, we'll need the implementation of the overloaded premain method that will be first invoked by the JVM when using instrumentation. Besides that, we need to expose a static method to be able to access Instrumentation.getObjectSize(Object).


freestar
Let's now create the InstrumentationAgent class:

public class InstrumentationAgent {
    private static volatile Instrumentation globalInstrumentation;

    public static void premain(final String agentArgs, final Instrumentation inst) {
        globalInstrumentation = inst;
    }

    public static long getObjectSize(final Object object) {
        if (globalInstrumentation == null) {
            throw new IllegalStateException("Agent not initialized.");
        }
        return globalInstrumentation.getObjectSize(object);
    }
}
Before we create a JAR for this agent, we need to make sure that a simple metafile, MANIFEST.MF is included in it:

Premain-class: com.baeldung.objectsize.InstrumentationAgent
Now we can make an Agent JAR with the MANIFEST.MF file included. One way is via command-line:

javac InstrumentationAgent.java
jar cmf MANIFEST.MF InstrumentationAgent.jar InstrumentationAgent.class
```

## 3.2. Example Class

```text
Let's see this in action by creating a class with sample objects that will make use of our agent class:

public class InstrumentationExample {

    public static void printObjectSize(Object object) {
        System.out.println("Object type: " + object.getClass() +
          ", size: " + InstrumentationAgent.getObjectSize(object) + " bytes");
    }

    public static void main(String[] arguments) {
        String emptyString = "";
        String string = "Estimating Object Size Using Instrumentation";
        String[] stringArray = { emptyString, string, "com.baeldung" };
        String[] anotherStringArray = new String[100];
        List<String> stringList = new ArrayList<>();
        StringBuilder stringBuilder = new StringBuilder(100);
        int maxIntPrimitive = Integer.MAX_VALUE;
        int minIntPrimitive = Integer.MIN_VALUE;
        Integer maxInteger = Integer.MAX_VALUE;
        Integer minInteger = Integer.MIN_VALUE;
        long zeroLong = 0L;
        double zeroDouble = 0.0;
        boolean falseBoolean = false;
        Object object = new Object();

        class EmptyClass {
        }
        EmptyClass emptyClass = new EmptyClass();

        class StringClass {
            public String s;
        }
        StringClass stringClass = new StringClass();

        printObjectSize(emptyString);
        printObjectSize(string);
        printObjectSize(stringArray);
        printObjectSize(anotherStringArray);
        printObjectSize(stringList);
        printObjectSize(stringBuilder);
        printObjectSize(maxIntPrimitive);
        printObjectSize(minIntPrimitive);
        printObjectSize(maxInteger);
        printObjectSize(minInteger);
        printObjectSize(zeroLong);
        printObjectSize(zeroDouble);
        printObjectSize(falseBoolean);
        printObjectSize(Day.TUESDAY);
        printObjectSize(object);
        printObjectSize(emptyClass);
        printObjectSize(stringClass);
    }

    public enum Day {
        MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
    }
}
For this to work, we need to include –javaagent option with the path to agent JAR when running our application:

VM Options: -javaagent:"path_to_agent_directory\InstrumentationAgent.jar"
The output of running our class will show us estimated object sizes:

Object type: class java.lang.String, size: 24 bytes
Object type: class java.lang.String, size: 24 bytes
Object type: class [Ljava.lang.String;, size: 32 bytes
Object type: class [Ljava.lang.String;, size: 416 bytes
Object type: class java.util.ArrayList, size: 24 bytes
Object type: class java.lang.StringBuilder, size: 24 bytes
Object type: class java.lang.Integer, size: 16 bytes
Object type: class java.lang.Integer, size: 16 bytes
Object type: class java.lang.Integer, size: 16 bytes
Object type: class java.lang.Integer, size: 16 bytes
Object type: class java.lang.Long, size: 24 bytes
Object type: class java.lang.Double, size: 24 bytes
Object type: class java.lang.Boolean, size: 16 bytes
Object type: class com.baeldung.objectsize.InstrumentationExample$Day, size: 24 bytes
Object type: class java.lang.Object, size: 16 bytes
Object type: class com.baeldung.objectsize.InstrumentationExample$1EmptyClass, size: 16 bytes
Object type: class com.baeldung.objectsize.InstrumentationExample$1StringClass, size: 16 bytes

        13.1.2

    13.2
```
