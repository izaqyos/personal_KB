---
type: reference
title: Java versions main features and tools
description: Java versions timeline with main features and tools of each release.
tags: [java, reference, comparison, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "java-kb#14"
---

# Java versions main features and tools, tags: Java versions main features and tools, tags: versions main features and tools

[↑ java-kb](/kb-java/README.md)

```text
https://pianalytix.com/java-versions-its-features/
```

## 14.1 Java version 1

```text
1995( JDK Alpha-Beta Version): 
It Consisted Of An Unstable API. It Is Not A Stable Version.


1995( JDK Alpha-Beta Version): 
Oak Changed To Java.
First Stable Version. 
Access Specifiers Were Added.

February 1997 (JDK 1.1) Java Versions:  
Language Changes: Inner Classes, JavaBeans.
Library Changes: AWT Event Changes, JDBC, And RMI( Remote Method Invocation), JIT(Just In Time Compiler For Microsoft Windows Platforms).
```

## 14.2 Java version 2

```text
J2SE 1.2 December 1998 Playground: 
Language Changes: The Strictfp Keyword.
Library Changes: Swing As A New UI-System On Top Of AWT. JVM Was Added With JIT Compiler, Java Plugins, And Java IDL (Technology For Distributed Objects, Similar To RMI But It Can Interact Regardless Of The Objects Written In Java Or C Or C++ Or COBOL, Etc). 
```

## 14.3 Java version 3

```text
    J2SE 1.3 May 2000 Kestral: 
Platform Changes: Hotspot JVM Included. RMI Was Modified To Be Compatible With CORBA (Design Specification For ORB (Object Request Broker)). 
Also, Language Changes: Java Naming And Directory Interface Added To The Core Libraries.
Library Changes:  Java Platform Debugger Architecture (JPDA), Java Sound, And Synthetic Proxy Classes Got Added.
```

## 14.4 Java version 4

```text
J2SE 1.4 February 2002 Merlin: 
Language Changes: The Assert Keyword. 
Library Changes: Regular Expressions, Exception Chaining, IPV6 Support, Non-Blocking IO, Logging API, Image I/O API, Integrated XML Parser, And XSLT(EXtensible Stylesheet Language Transformations) Processor, Integrated Security And Also Cryptography Extensions(JCE, JSSE, JAAS), Java Web Start Included, Java.Util.Prefs.
```

## 14.5 Java version 5

```text
 J2SE 5.0 September 2004 Tiger: 
Language Changes: Generics, Annotations, Enum Types.Var-Args, Enhanced For Loops. 
Library Changes: Concurrent Utilities In Java.Util.Concurrent. Scanner Class Joins For Parsing Data Thus From Different Input Streams And Buffers.
```

## 14.6 Java version 6

```text
Java SE6 December 2006 Mustang: 
Scripting Language Support I.E., Generic API For Tight Integration With Scripting Languages. JDBC 4.0 Support. Here, Improvements To The Existing Libraries No Extra Language Features Adds Up Except @Override.
```

## 14.7 Java version 7

```text
Java SE 7 July 2011 Dolphin: 
Language Changes: Project Coin(Small Changes/Enhancements And Bug Releases). Try-With-Resources, The Diamond Operator(“<TypeName>:  To Simplify The Use Of Generics ”).
Library Changes:  A New Abstracted File-System API With Support For Virtual File Systems. Improved Concurrency Libraries And Elliptic Curve Encryption.
Platform Changes: Support For Dynamic Languages.
```

## 14.8 Java version 8

```text
Java SE 8 (LTS) March 2014 Spider (Older But Maintained): 
Language Changes: Lambda Expressions, Annotation On Java Types. Improvements Or Development In Project Coin( Small Language Improvements).
Library Changes: Improved Data And Time API.
```

### 14.8.1 functional interfaces, tags: functional interfaces

#### 14.8.1.1 chatgpt, lambda expressions and functional interfaces

````text
lambda's are Java's anonymous functions. they are a Shortcut syntax for Functional interfaces.
syntax: (p1,p2,...,pn) -> { expression }
where expression will usually run a calculation on the passed params and return a result

In Java, a functional interface is an interface that contains only one abstract method. Functional interfaces are often used in conjunction with lambda expressions and method references to provide a concise way to define behavior for functions or operations.

Here's an example of a functional interface and its usage:

```java
// Define a functional interface with a single abstract method
@FunctionalInterface
interface Calculator {
    double calculate(double num1, double num2);
}

public class FunctionalInterfaceExample {
    public static void main(String[] args) {
        // Using a lambda expression to implement the Calculator functional interface
        Calculator addition = (a, b) -> a + b;
        Calculator subtraction = (a, b) -> a - b;
        Calculator multiplication = (a, b) -> a * b;
        Calculator division = (a, b) -> {
            if (b == 0) {
                throw new ArithmeticException("Division by zero is not allowed");
            }
            return a / b;
        };

        // Using the functional interfaces to perform calculations
        double result1 = addition.calculate(10, 5);
        double result2 = subtraction.calculate(10, 5);
        double result3 = multiplication.calculate(10, 5);
        double result4 = division.calculate(10, 5);

        System.out.println("Addition: " + result1);
        System.out.println("Subtraction: " + result2);
        System.out.println("Multiplication: " + result3);
        System.out.println("Division: " + result4);
    }
}
```

In this example:

|1. We define a functional interface called `Calculator` with a single abstract method `calculate`. We annotate it with `@FunctionalInterface` to indicate that it is a functional interface (though this annotation is optional).
|
|2. Inside the `main` method, we create lambda expressions to implement the `Calculator` functional interface for addition, subtraction, multiplication, and division operations.
|
|3. We then use these lambda expressions to perform calculations with different operations and print the results.

Functional interfaces are widely used in Java to work with lambdas and provide a more functional programming style when working with APIs that require passing behavior as parameters, such as the `java.util.function` package used in streams and functional programming constructs in Java.


my example:
code: 
$ cat FunctionalInterfaceExample.java 
// Define a functional interface with a single abstract method
@FunctionalInterface
interface Calculator {
    double calculate(double num1, double num2);
}

public class FunctionalInterfaceExample {
    public static void main(String[] args) {
        // Using a lambda expression to implement the Calculator functional interface
        Calculator addition = (a, b) -> a + b;
        Calculator subtraction = (a, b) -> a - b;
        Calculator multiplication = (a, b) -> a * b;
        Calculator division = (a, b) -> {
            if (b == 0) {
                throw new ArithmeticException("Division by zero is not allowed");
            }
            return a / b;
        };
        Calculator exponent = (a, b) -> {
            double ret = 1;
            if (b==0) {
                ret = 1;
            }
            else if (b >0) {
                ret = 1;
                for (int i = 0; i < b; i++) {
                    ret *= a;
                }
            }
            else {
                ret = 1;
                for (int i = 0; i < -b; i++) {
                    ret *= a;
                }
                ret = 1/a;
            }
            return ret;
        };

        // Using the functional interfaces to perform calculations
        double result1 = addition.calculate(10, 5);
        double result2 = subtraction.calculate(10, 5);
        double result3 = multiplication.calculate(10, 5);
        double result4 = division.calculate(10, 5);
        double result5 = exponent.calculate(10, 5);
        double result6 = exponent.calculate(3, 0);
        double result7 = exponent.calculate(2, -2);

        System.out.println("Addition: " + result1);
        System.out.println("Subtraction: " + result2);
        System.out.println("Multiplication: " + result3);
        System.out.println("Division: " + result4);
        System.out.println("Exponent: " + result5);
        System.out.println("Exponent: " + result6);
        System.out.println("Exponent: " + result7);
    }
}

run:
$ java FunctionalInterfaceExample
Addition: 15.0
Subtraction: 5.0
Multiplication: 50.0
Division: 2.0
Exponent: 100000.0
Exponent: 1.0
Exponent: 0.5
````

### 14.8.2 forEach

```text
$ cat ForEach.java 
import java.util.ArrayList;
import java.util.List;

/**
 * ForEach
 */
public class ForEach {

        public static void main(String[] args) {
            List<String> myList = new ArrayList<String>();
            myList.add("Dana");
            myList.add("Alice");
            myList.add("Bob");
            myList.add("Carol");
            myList.add("Eve");
            System.out.println("Family members names");
            myList.forEach(name -> System.out.println(name));
            System.out.println("Family members upper case");
            myList.forEach((name) -> System.out.println(name.toUpperCase()));
        }
}
$ java ForEach
Family members names
Dana
Alice
Bob
Carol
Eve
Family members upper case
DANA
ALICE
BOB
CAROL
EVE
```

### 14.8.3 optional class , tags: optional class

````text
In Java 8, the “java.util” package included an optional class. The public final class “Optional” is used to handle NullPointerException in a Java program. You may give other code or values to execute using Optional. Thus, optional reduces the number of null checks required to avoid a nullPointerException.

You may use the Optional class to prevent the application from crashing and terminating unexpectedly. The Optional class has methods for checking the existence of a value for a given variable.

`Optional.ofNullable` is a method provided by the `java.util.Optional` class in Java. It's used to create an `Optional` instance that may or may not contain a non-null value. The purpose of `Optional.ofNullable` is to handle cases where you have a potentially nullable value, and you want to wrap it in an `Optional` to work with it more safely and conveniently.

Here's how `Optional.ofNullable` works:

|1. If the provided value is not null, it creates an `Optional` containing that value.
|2. If the provided value is null, it creates an empty `Optional` (an `Optional` instance with no value).

Example:

```java
String value = "Hello, Optional!";
Optional<String> optionalWithValue = Optional.ofNullable(value);

String nullValue = null;
Optional<String> optionalWithNull = Optional.ofNullable(nullValue);
```

In the example above:

- `optionalWithValue` will contain an `Optional` with the value "Hello, Optional!" because the `value` variable is not null.
- `optionalWithNull` will contain an empty `Optional` because the `nullValue` variable is null.

Using `Optional.ofNullable` is especially useful when working with methods or APIs that may return null values. It allows you to avoid null checks and null pointer exceptions by providing a more structured and safe way to handle the absence of a value.

You can then use methods like `isPresent`, `ifPresent`, `orElse`, and others to work with the value or handle the absence of a value in a more controlled manner.

my demo:
$ cat OptionalDemo.java 
import java.util.Optional;

public class OptionalDemo{ 
 
   public static void main(String[] args) { 
        String[] str = new String[10]; 
        Optional<String> checkNull =
                       Optional.ofNullable(str[5]); 
        if (checkNull.isPresent()) { 
            String word = str[5].toLowerCase(); 
            System.out.print(str); 
         } else
           System.out.println("string is null"); 

          String nullVal = null;
          Optional<String> optionalStrWithNull = Optional.ofNullable(nullVal);

          if (optionalStrWithNull.isPresent()) {
            System.out.println("found non null value");
          }
          else {
            System.out.println("found null value");
          }
    } 
}$ javac OptionalDemo.java 
$ java OptionalDemo
string is null
found null value
````

### 14.8.4 Default And Static Methods In Interfaces, tags: Default And Static Methods In Interfaces

````text
In Java 8, you may add non-abstract methods to interfaces, allowing you to create interfaces with method implementation. To construct interfaces with method implementation, use the Default and Static keywords. Lambda Expression functionality is mostly enabled through default approaches.

You may extend the functionality of your libraries’ interfaces by using default methods. This ensures that the code created for previous versions is compatible with the newer interfaces (binary compatibility).
Default methods and static methods in interfaces were introduced in Java 8 to allow for the addition of new methods to existing interfaces without breaking backward compatibility. Here's an example of both default and static methods in interfaces:

```java
// Define an interface with a default and a static method
interface MyInterface {
    // Abstract method (no implementation required)
    void regularMethod();

    // Default method with implementation
    default void defaultMethod() {
        System.out.println("This is a default method.");
    }

    // Static method with implementation
    static void staticMethod() {
        System.out.println("This is a static method.");
    }
}

// Implement the interface in a class
class MyClass implements MyInterface {
    @Override
    public void regularMethod() {
        System.out.println("This is the regular method implementation.");
    }
}

public class InterfaceExample {
    public static void main(String[] args) {
        MyClass myClass = new MyClass();

        // Calling regularMethod from the implemented class
        myClass.regularMethod();

        // Calling defaultMethod from the interface
        myClass.defaultMethod();

        // Calling staticMethod from the interface
        MyInterface.staticMethod();
    }
}
```

In this example:

- `MyInterface` is an interface that defines three methods:
  - `regularMethod`: An abstract method that must be implemented by any class that implements `MyInterface`.
  - `defaultMethod`: A default method with a default implementation.
  - `staticMethod`: A static method with a static implementation.

- `MyClass` is a class that implements `MyInterface`. It provides an implementation for the `regularMethod` as required by the interface.

- In the `main` method of `InterfaceExample`, we create an instance of `MyClass` and demonstrate the usage of these methods:
  - We call `regularMethod`, which is implemented in `MyClass`.
  - We call `defaultMethod`, which is provided by the default implementation in the interface.
  - We call `staticMethod` directly on the interface itself.

Default methods provide a way to add new methods to existing interfaces without breaking the classes that already implement those interfaces. Static methods in interfaces can be used to provide utility methods that are associated with the interface but don't depend on an instance of the implementing class.

my demo:
$ cat InterfaceExample.java 
interface MyInterface {
    // Abstract method (no implementation required)
    void regularMethod();

    // Default method with implementation
    default void defaultMethod() {
        System.out.println("This is a default method.");
    }

    // Static method with implementation
    static void staticMethod() {
        System.out.println("This is a static method.");
    }
}

// Implement the interface in a class
class MyClass implements MyInterface {
    @Override
    public void regularMethod() {
        System.out.println("This is the regular method implementation.");
    }
}

// // Implement the interface in a class
// // uncomment will yeild error: InterfaceExample.java:25: error: MyClass2 is not abstract and does not override abstract method regularMethod() in MyInterface
// class MyClass2 implements MyInterface {
// }

public class InterfaceExample {
    public static void main(String[] args) {
        MyClass myClass = new MyClass();
        //MyClass2 myClass2 = new MyClass2();

        System.out.println("calling myClass methods:");
        // Calling regularMethod from the implemented class
        myClass.regularMethod();

        // Calling defaultMethod from the interface
        myClass.defaultMethod();

        // Calling staticMethod from the interface
        MyInterface.staticMethod();

        // System.out.println("calling myClass2 methods:");
        // myClass2.regularMethod();
        // myClass2.defaultMethod();
        // myClass2.staticMethod();
    }
}
$ javac InterfaceExample.java 
$ java InterfaceExample
calling myClass methods:
This is the regular method implementation.
This is a default method.
This is a static method.
````

### 14.8.4 Java Stream API For Bulk Data Operations On Collections , tags: Java Stream API For Bulk Data Operations On Collections

````text
In Java, the Stream API and bulk data operations provide a powerful and concise way to perform operations on collections of data. They were introduced in Java 8 and have since become an integral part of Java's functional programming features. The Stream API allows you to process collections of data in a more declarative and functional style, making your code more readable and efficient.

Here's an overview of the Stream API and some common bulk data operations:

| 1. **Stream API**:
|    - A `Stream` in Java represents a sequence of elements that can be processed in a functional style.
|    - You can create a Stream from various data sources, including collections, arrays, or by generating elements dynamically.
|    - Streams can be processed in a chain of operations like filtering, mapping, and reducing, without modifying the original data source.
| 
| 2. **Common Bulk Data Operations**:
   - **Filtering**: Use the `filter` operation to select elements from a Stream that satisfy a given condition.
   - **Mapping**: Use the `map` operation to transform elements in a Stream to another form.
   - **Reducing**: Use the `reduce` operation to combine elements of a Stream into a single result, such as summing all elements.
   - **Collecting**: Use the `collect` operation to accumulate elements from a Stream into a collection or other data structure.
   - **Sorting**: Use the `sorted` operation to sort elements in a Stream based on a specified comparator.

Here are some usage examples:

```java
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class StreamExample {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // Example 1: Filtering
        List<Integer> evenNumbers = numbers.stream()
                .filter(n -> n % 2 == 0)
                .collect(Collectors.toList());
        System.out.println("Even numbers: " + evenNumbers);

        // Example 2: Mapping
        List<String> squareStrings = numbers.stream()
                .map(n -> n * n)
                .map(Object::toString)
                .collect(Collectors.toList());
        System.out.println("Square strings: " + squareStrings);

        // Example 3: Reducing
        int sum = numbers.stream()
                .reduce(0, Integer::sum);
        System.out.println("Sum of numbers: " + sum);

        // Example 4: Sorting
        List<Integer> sortedNumbers = numbers.stream()
                .sorted((a, b) -> b.compareTo(a)) // Descending order
                .collect(Collectors.toList());
        System.out.println("Sorted numbers (descending): " + sortedNumbers);
    }
}
```

In this example, we have a list of numbers, and we use various Stream operations to filter, map, reduce, and sort the data. These operations allow you to express your intentions concisely and readably while performing complex data manipulations on collections.

my demo:
$ javac StreamExample.java 
$ java StreamExample
Even numbers: [2, 4, 6, 8, 10]
Square strings: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
Sum of numbers: 55
Sorted numbers (descending): [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
Sorted numbers (ascending): [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
Unique list of numbers is:
1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 
$ cat StreamExample.java 
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collector;
import java.util.stream.Collectors;

public class StreamExample {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // Example 1: Filtering
        List<Integer> evenNumbers = numbers.stream()
                .filter(n -> n % 2 == 0)
                .collect(Collectors.toList());
        System.out.println("Even numbers: " + evenNumbers);

        // Example 2: Mapping
        List<String> squareStrings = numbers.stream()
                .map(n -> n * n)
                .map(Object::toString)
                .collect(Collectors.toList());
        System.out.println("Square strings: " + squareStrings);

        // Example 3: Reducing
        int sum = numbers.stream()
                .reduce(0, Integer::sum);
        System.out.println("Sum of numbers: " + sum);

        // Example 4: Sorting
        List<Integer> sortedNumbers = numbers.stream()
                .sorted((a, b) -> b.compareTo(a)) // Descending order
                .collect(Collectors.toList());
        System.out.println("Sorted numbers (descending): " + sortedNumbers);

        // Example 4: Sorting ascending
        List<Integer> sortedNumbersAsc = numbers.stream()
                .sorted((a, b) -> a.compareTo(b)) // Descending order
                .collect(Collectors.toList());
        System.out.println("Sorted numbers (ascending): " + sortedNumbersAsc);

        List<Integer> numbers2 = Arrays.asList(1, 2,2,2, 3, 4, 5, 6, 6,7, 8, 8,8, 9, 10);
        Set<Integer> uniqNumbers = numbers.stream()
                .collect(Collectors.toSet());
                System.out.println("Unique list of numbers is:");
                uniqNumbers.forEach( elem -> System.out.printf("%d, ", elem));
                System.out.println("");
    }
}
````

### 14.8.5 java data time API usage, tags: java data time API usage

#### 14.8.5.1 gpt

````text
The Java Date and Time API, introduced in Java 8, provides a comprehensive and robust way to handle date and time operations. It's located in the `java.time` package. Here's an example of how to use the Java Date and Time API:

```java
import java.time.*;
import java.time.format.DateTimeFormatter;

public class DateTimeExample {
    public static void main(String[] args) {
        // Getting the current date and time
        LocalDateTime now = LocalDateTime.now();
        System.out.println("Current Date and Time: " + now);

        // Creating a specific date and time
        LocalDate date = LocalDate.of(2023, Month.JANUARY, 15);
        LocalTime time = LocalTime.of(14, 30);
        LocalDateTime dateTime = LocalDateTime.of(date, time);
        System.out.println("Specific Date and Time: " + dateTime);

        // Formatting date and time
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDateTime = dateTime.format(formatter);
        System.out.println("Formatted Date and Time: " + formattedDateTime);

        // Adding and subtracting time
        LocalDateTime futureDateTime = dateTime.plusDays(7).minusHours(2);
        System.out.println("Future Date and Time: " + futureDateTime);

        // Duration between two times
        Duration duration = Duration.between(dateTime, futureDateTime);
        System.out.println("Duration: " + duration.toHours() + " hours");

        // Working with time zones
        ZoneId newYorkZone = ZoneId.of("America/New_York");
        ZonedDateTime newYorkTime = ZonedDateTime.of(dateTime, newYorkZone);
        System.out.println("New York Time: " + newYorkTime);

        // Checking for leap years
        boolean isLeapYear = Year.of(2024).isLeap();
        System.out.println("Is 2024 a leap year? " + isLeapYear);
    }
}
```

In this example:

| 1. We get the current date and time using `LocalDateTime.now()`.
| 
| 2. We create a specific date and time using `LocalDate.of()` and `LocalTime.of()`.
| 
| 3. We format the date and time using `DateTimeFormatter`.
| 
| 4. We add and subtract time from a date and time using methods like `plusDays()` and `minusHours()`.
| 
| 5. We calculate the duration between two times using `Duration.between()`.
| 
| 6. We work with time zones using `ZoneId` and `ZonedDateTime`.
| 
| 7. We check if a year is a leap year using the `Year` class.

Make sure you have Java 8 or a later version installed to run this code because the Java Date and Time API was introduced in Java 8.
````

#### 14.8.5.2 my demo

```text
$ javac DateTimeExample.java
$ java DateTimeExample
Current Date and Time: 2023-09-11T18:36:58.252988
Demo Creation Specific Date and Time: 2023-09-11T18:37
Formatted Date and Time: 2023-09-11 18:37:00
Future Date and Time: 2024-09-18T16:37
Duration: 372 days
Duration: 8950 hours
Duration: 32220000 seconds
Duration: 32220000000 milliseconds
New York Time: 2023-09-11T18:37-04:00[America/New_York]
Is 2024 a leap year? true
$ cat DateTimeExample.java 
import java.time.*;
import java.time.format.DateTimeFormatter;

public class DateTimeExample {
    public static void main(String[] args) {
        // Getting the current date and time
        LocalDateTime now = LocalDateTime.now();
        System.out.println("Current Date and Time: " + now);

        // Creating a specific date and time
        LocalDate date = LocalDate.of(2023, Month.SEPTEMBER, 11); //the day this demo was created...
        LocalTime time = LocalTime.of(18, 37);
        LocalDateTime dateTime = LocalDateTime.of(date, time);
        System.out.println("Demo Creation Specific Date and Time: " + dateTime);

        // Formatting date and time
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDateTime = dateTime.format(formatter);
        System.out.println("Formatted Date and Time: " + formattedDateTime);

        // Adding and subtracting time
        LocalDateTime futureDateTime = dateTime.plusYears(1).plusDays(7).minusHours(2);
        System.out.println("Future Date and Time: " + futureDateTime);

        // Duration between two times
        Duration duration = Duration.between(dateTime, futureDateTime);
        System.out.println("Duration: " + duration.toDays() + " days");
        System.out.println("Duration: " + duration.toHours() + " hours");
        System.out.println("Duration: " + duration.toSeconds() + " seconds");
        System.out.println("Duration: " + duration.toMillis() + " milliseconds");

        // Working with time zones
        ZoneId newYorkZone = ZoneId.of("America/New_York");
        ZonedDateTime newYorkTime = ZonedDateTime.of(dateTime, newYorkZone);
        System.out.println("New York Time: " + newYorkTime);

        // Checking for leap years
        boolean isLeapYear = Year.of(2024).isLeap();
        System.out.println("Is 2024 a leap year? " + isLeapYear);
    }
}


            14.8.5.3 
```

### 14.8.6 Collection API Improvements, tags: Collection API Improvements

```text
The Collection API in Java 8 now includes the following new methods. A few of them are listed below.  

This is a default method for the Iterator. forEachRemaining (Consumer action): This is a default method for the Iterator. It repeats the “action” for the remaining items until all of them have been processed, or the “action” throws an exception.
The default technique for removing items from a collection is removed (Predicate filter). This removes all objects from the collection that satisfy the supplied “filter.”
Spliterator () This collection method returns a spliterator object that may be used to traverse the items sequentially or in parallel.
ReplaceAll (), calculate(), and merge() are methods in the Map collection.
The performance of the HashMap class with Key collisions has been enhanced etc.
```

### 14.8.7 Java IO Improvements

```text
The following are some of the IO enhancements made in Java 8:

Files.list (Path dir): Returns a lazily filled stream, each element of which represents a directory entry.
Files.lines (Path path): Reads all the lines from a stream.
Files.find (): Returns a stream filled by a path after searching for files in the file tree rooted at a provided beginning file and many more. 
BufferedReader.lines (): Returns a stream containing all of the elements of BufferedReader’s lines and much more
Buffered
```

### 14.8.8 Miscellaneous Core API Improvements

```text
 ThreadLocal’s static function with initial (Supplier supplier) allows you to build an instance quickly.
The default and static methods for natural ordering, reverse order, and other operations have been added to the “Comparator” interface.
The min (), max (), and sum () methods are available in the Integer, Long, and Double wrapper classes.
The logicalAnd (), logicalOr (), and logicalXor () methods have been added to the Boolean class.
The Math class introduces a number of useful techniques.
The JDBC-ODBC Bridge has been deactivated.
The memory space used by PermGen is no longer available.
```

### 14.8.9 Base64 Encode Decode

```text
For Base64 encoding, Java 8 has built-in encode and decode functions. The Base64 encoding class in Java.util.Base64.

Three Base64 encoders and decoders are provided in this class:

The output is mapped to a set of characters between A-Za-z0-9+/ in this version. The encoder does not add a line feed to the output, and the decoder rejects any character other than the above.
The filename safe is mapped to the set of characters between A-Za-z0-9+/, and the output is the URL.
The output of this sort of encoder is mapped to a MIME-friendly format.
```

#### 14.8.9.1 GTP example

````text
In Java, you can encode and decode data in Base64 using the `java.util.Base64` class, which was introduced in Java 8. Here's an example of how to do that:

**Encoding to Base64:**

```java
import java.util.Base64;

public class Base64Example {
    public static void main(String[] args) {
        // The string to be encoded
        String originalText = "Hello, World!";

        // Encoding to Base64
        byte[] encodedBytes = Base64.getEncoder().encode(originalText.getBytes());

        String encodedText = new String(encodedBytes);
        System.out.println("Encoded Text: " + encodedText);
    }
}
```

In this example, we use `Base64.getEncoder().encode()` to encode the string "Hello, World!" into Base64. The result is stored as a byte array, and we convert it back to a string for printing.

**Decoding from Base64:**

```java
import java.util.Base64;

public class Base64Example {
    public static void main(String[] args) {
        // The Base64 encoded string
        String encodedText = "SGVsbG8sIFdvcmxkIQ==";

        // Decoding from Base64
        byte[] decodedBytes = Base64.getDecoder().decode(encodedText);

        String decodedText = new String(decodedBytes);
        System.out.println("Decoded Text: " + decodedText);
    }
}
```

In this example, we use `Base64.getDecoder().decode()` to decode the Base64 encoded string "SGVsbG8sIFdvcmxkIQ==". The result is stored as a byte array, and we convert it back to a string for printing.

When you run these examples, you should see the original text "Hello, World!" after decoding the Base64-encoded string.
````

#### 14.8.9.2 my demo

```text
$ javac Base64Demo.java
$ java Base64Demo
Text: base64 demo, encode: [B@6b95977
Decoded Text: base64 demo
$ cat Base64Demo.java 
import java.util.Base64;

public class Base64Demo {
    public static void main(String[] args) {
        String text = "base64 demo";
        byte[] encoded_text = Base64.getEncoder().encode(text.getBytes());
        System.out.printf("Text: %s, encode: %s\n", text, encoded_text);
        byte[] decoded_text = Base64.getDecoder().decode(encoded_text);
        System.out.printf("Decoded Text: %s\n", text, decoded_text);
    }
}
            14.8.9.3
        14.8.10
```

## 14.10 Java version 9, tags: Java version 9

### 14.10.1 summary 9-17

```text
Java 9 (2017):
Module System (Project Jigsaw): Java 9 introduced the module system, which allows developers to create modular applications, making it easier to manage dependencies and encapsulate code.

JShell (Interactive REPL): The JShell tool provides an interactive Read-Eval-Print Loop (REPL) for Java, making it easier to experiment with code snippets and learn the language.

Improved Stream API: Java 9 enhanced the Stream API with additional methods for processing and transforming streams of data.

Private Methods in Interfaces: Interfaces could now have private methods, which can be used for code reuse and organization.

Java 10 (2018):
Local-Variable Type Inference (var): Java 10 introduced the var keyword, allowing type inference for local variables, reducing verbosity in code.

Application Class-Data Sharing: This feature enables the sharing of class metadata and can lead to improved application startup times.

Experimental JIT Compiler (Graal): The GraalVM Just-In-Time (JIT) compiler was made available for experimentation.

Java 11 (2018):
HTTP Client (Standard): Java 11 introduced a new, standardized HTTP client library, making it easier to make HTTP requests.

Local-Variable Syntax for Lambda Parameters: It extended the use of var for lambda parameters.

Epsilon Garbage Collector: This is a no-op garbage collector for performance testing and diagnostic purposes.

Java 12 (2019):
Switch Expressions (Preview): The switch statement was enhanced to be used as an expression, making code more concise and readable.

Shenandoah Garbage Collector (Experimental): Shenandoah is a low-pause-time garbage collector that was introduced as an experimental feature.

Java 13 (2019):
Text Blocks: Java 13 introduced text blocks, making it easier to write multi-line string literals in a more readable and maintainable way.

Dynamic CDS Archives: This feature extended the class-data sharing (CDS) functionality to allow dynamic archiving of classes at runtime.

Java 14 (2020):
Pattern Matching (Preview): This preview feature introduced the instanceof pattern matching for more concise and safer code.

Records (Preview): Records are a preview feature that simplifies the creation of immutable data classes.

Java 15 (2020):
Sealed Classes (Preview): Sealed classes and interfaces were introduced as a preview feature, restricting which classes can extend or implement a given type.

Text Blocks (Standard): Text blocks became a standard feature, making it easier to work with multi-line strings.

Java 16 (2021):
Records (Standard): Records were finalized as a standard feature, providing a concise way to define data classes.

Pattern Matching (Standard): The pattern matching feature was finalized, including the instanceof pattern matching and the switch expression.

Java 17 (2021):
Pattern Matching (Continued): Java 17 continued the pattern matching feature and introduced the "patterns" keyword.

Sealed Classes (Standard): Sealed classes and interfaces were finalized as a standard feature.

Strong encapsulation (Incubator): Strong encapsulation was introduced as an incubator feature, aiming to improve security and reliability.

Foreign Function and Memory API (Incubator): The Foreign Function and Memory API was introduced as an incubator feature for interaction with native code and memory.a

https://www.digitalocean.com/community/tutorials/java-9-features-with-examples
```

#### 14.10.1.1 other

### 14.10.1 REPL, jshell, tags: REPL, jshell

```text
example:
jshell> String s = "hello";
s ==> "hello"

jshell> import java.util.Base64;

jshell> Base64.GetEncoder().encode(s)
|  Error:
|  cannot find symbol
|    symbol:   method GetEncoder()
|  Base64.GetEncoder().encode(s)
|  ^---------------^

jshell> Base64.getEncoder().encode(s.getBytes())
$3 ==> byte[8] { 97, 71, 86, 115, 98, 71, 56, 61 }

jshell> System.out.pr
print(     printf(    println(   
jshell> System.out.println(s)
hello

jshell> byte[] s_enc = Base64.getEncoder().encode(s.getBytes())
s_enc ==> byte[8] { 97, 71, 86, 115, 98, 71, 56, 61 }

jshell> System.out.println(s_enc)
[B@1b2c6ec2
```

### 14.10.2 Factory Methods for Immutable List, Set, Map and Map.Entry, tags: Factory Methods for Immutable List

```text
Oracle Corp has introduced some convenient factory methods to create Immutable List, Set, Map and Map.Entry objects. These utility methods are used to create empty or non-empty Collection objects. In Java SE 8 and earlier versions, We can use Collections class utility methods like unmodifiableXXX to create Immutable Collection objects. For instance, if we want to create an Immutable List, then we can use Collections.unmodifiableList method. However, these Collections.unmodifiableXXX methods are a tedious and verbose approach. To overcome those shortcomings, Oracle Corp has added a couple of utility methods to List, Set and Map interfaces. List and Set interfaces have “of()” methods to create an empty or no-empty Immutable List or Set objects 

List immutableList = List.of();
Non-Empty List Example

List immutableList = List.of("one","two","three");
The Map has two sets of methods: of() methods and ofEntries() methods to create an Immutable Map object and an Immutable Map.Entry object respectively. Empty Map Example

jshell> Map emptyImmutableMap = Map.of()
emptyImmutableMap ==> {}
Non-Empty Map Example

jshell> Map nonemptyImmutableMap = Map.of(1, "one", 2, "two", 3, "three")
nonemptyImmutableMap ==> {2=two, 3=three, 1=one}
```

### 14.10.3 Private methods in Interfaces

```text
In Java 8, we can provide method implementation in Interfaces using Default and Static methods. However we cannot create private methods in Interfaces. To avoid redundant code and more re-usability, Oracle Corp is going to introduce private methods in Java SE 9 Interfaces. From Java SE 9 onwards, we can write private and private static methods too in an interface using a ‘private’ keyword. These private methods are like other class private methods only, there is no difference between them.

public interface Card{

  private Long createCardID(){
    // Method implementation goes here.
  }

  private static void displayCardDetails(){
    // Method implementation goes here.
  }

}
If you want to read more about this new feature, please go through this link: Java 9 Private methods in Interface.
```

### 14.10.4 Java 9 Module System

```text
One of the big changes or java 9 feature is the Module System. Oracle Corp is going to introduce the following features as part of Jigsaw Project.

Modular JDK
Modular Java Source Code
Modular Run-time Images
Encapsulate Java Internal APIs
Java Platform Module System
Before Java SE 9 versions, we are using Monolithic Jars to develop Java-Based applications. This architecture has a lot of limitations and drawbacks. To avoid all these shortcomings, Java SE 9 is coming with the Module System. JDK 9 is coming with 92 modules (may change in final release). We can use JDK Modules and also we can create our own modules as shown below
```

#### 14.10.4.1 GPT explanation

````text
As of my last knowledge update in September 2021, Java introduced a module system in Java 9 as part of the Java Platform Module System (JPMS). Modules help you modularize your Java applications by explicitly declaring dependencies, encapsulating code, and improving maintainability. Here's a basic example of how to create and use modules in Java:

Let's assume we have a simple Java application with two modules:

|1. **Module A (com.example.moduleA)**: This module contains a single class, `HelloA`, with a method that prints a message.
|
|2. **Module B (com.example.moduleB)**: This module depends on Module A and uses the `HelloA` class to print a message.

**Step 1: Create the Module A**

Create a directory structure like this:

```
module-example/
   ├── moduleA/
   │     ├── module-info.java
   │     └── com/
   │          └── example/
   │               └── moduleA/
   │                    └── HelloA.java
```

In `module-info.java` for Module A:

```java
module com.example.moduleA {
}
```

In `HelloA.java`:

```java
package com.example.moduleA;

public class HelloA {
    public void sayHello() {
        System.out.println("Hello from Module A!");
    }
}
```

**Step 2: Create Module B**

Create a directory structure like this:

```
module-example/
   ├── moduleA/
   ├── moduleB/
   │     ├── module-info.java
   │     └── com/
   │          └── example/
   │               └── moduleB/
   │                    └── HelloB.java
```

In `module-info.java` for Module B:

```java
module com.example.moduleB {
    requires com.example.moduleA;
}
```

In `HelloB.java`:

```java
package com.example.moduleB;

import com.example.moduleA.HelloA;

public class HelloB {
    public static void main(String[] args) {
        HelloA helloA = new HelloA();
        helloA.sayHello();
        System.out.println("Hello from Module B!");
    }
}
```

**Step 3: Compile and Run**

Compile the modules using the `javac` command:

```bash
javac -d out moduleA/module-info.java moduleA/com/example/moduleA/HelloA.java
javac --module-path out -d out moduleB/module-info.java moduleB/com/example/moduleB/HelloB.java
```

Run the `HelloB` class:

```bash
java --module-path out -m com.example.moduleB/com.example.moduleB.HelloB
```

You'll see the following output:

```
Hello from Module A!
Hello from Module B!
```

This example demonstrates a simple use case of creating and using modules in Java. Module A contains a class that Module B depends on, and the modules are compiled and run using the `--module-path` and `-m` options.

Please note that the module system is particularly useful for larger projects where you need to manage dependencies and encapsulate code more effectively. In smaller projects, traditional package organization may suffice. Additionally, Java may have introduced changes or improvements to the module system in versions beyond Java 9, so be sure to check the documentation for the latest updates.
````

#### 14.10.4.2 https://www.baeldung.com/java-9-modularity

```text
Java 9 introduces a new level of abstraction above packages, formally known as the Java Platform Module System (JPMS), or “Modules” for short.
In this tutorial, we’ll go through the new system and discuss its various aspects.

We’ll also build a simple project to demonstrate all concepts we’ll be learning in this guide.
First of all, we need to understand what a module is before we can understand how to use them.
A Module is a group of closely related packages and resources along with a new module descriptor file.
In other words, it’s a “package of Java Packages” abstraction that allows us to make our code even more reusable.
```

#### 14.10.4.2.1 Packages

```text
The packages inside a module are identical to the Java packages we’ve been using since the inception of Java.

When we create a module, we organize the code internally in packages just like we previously did with any other project.

Aside from organizing our code, packages are used to determine what code is publicly accessible outside of the module. We’ll spend more time talking about this later in the article.
```

#### 14.10.4.2.2 resources

```text
                Each module is responsible for its resources, like media or configuration files.
Previously we’d put all resources into the root level of our project and manually manage which resources belonged to different parts of the application.
With modules, we can ship required images and XML files with the module that needs it, making our projects much easier to manage.
```

#### 14.10.4.2.3 Module Descriptor

```text
When we create a module, we include a descriptor file that defines several aspects of our new module:

Name – the name of our module
Dependencies – a list of other modules that this module depends on
Public Packages – a list of all packages we want accessible from outside the module
Services Offered – we can provide service implementations that can be consumed by other modules
Services Consumed – allows the current module to be a consumer of a service
Reflection Permissions – explicitly allows other classes to use reflection to access the private members of a package
The module naming rules are similar to how we name packages (dots are allowed, dashes are not). It’s very common to do either project-style (my.module) or Reverse-DNS (com.baeldung.mymodule) style names. We’ll use project-style in this guide.

We need to list all packages we want to be public because by default all packages are module private.


The same is true for reflection. By default, we cannot use reflection on classes we import from another module.

Later in the article, we’ll look at examples of how to use the module descriptor file.
```

#### 14.10.4.2.4 java list-modules command

````text
The `java list-modules` command is used to list the modules available in a Java application. It is available starting from Java 9 and is a part of the Java Platform Module System (JPMS), which was introduced in Java 9 to improve modularity in Java applications.

Here's how you can use the `java list-modules` command:

a. Open your command prompt or terminal.

b. Run the `java list-modules` command followed by the options and arguments you want to use. The basic syntax is as follows:

```shell
java --list-modules
```

This command will list all the modules available in your Java installation.

You can also specify additional options to filter the list or get more detailed information about the modules. For example:

- To list only the non-system modules (modules not part of the Java SE Platform), you can use the `--limit-modules` option:

  ```shell
  java --list-modules --limit-modules java.se
  ```

- To get more detailed information about a specific module, you can use the `--describe-module` option followed by the module name. For example:

  ```shell
  java --describe-module java.base
  ```

The `java list-modules` command is useful for exploring the module system in Java, especially when you want to understand which modules are available and how they are structured in your Java runtime environment. It's commonly used in conjunction with Java 9 and later versions to work with modular Java applications.
````

#### 14.10.4.2.5 Module Types

```text
There are four types of modules in the new module system:

System Modules – These are the modules listed when we run the list-modules command above. They include the Java SE and JDK modules.
Application Modules – These modules are what we usually want to build when we decide to use Modules. They are named and defined in the compiled module-info.class file included in the assembled JAR.
Automatic Modules – We can include unofficial modules by adding existing JAR files to the module path. The name of the module will be derived from the name of the JAR. Automatic modules will have full read access to every other module loaded by the path.
Unnamed Module – When a class or JAR is loaded onto the classpath, but not the module path, it’s automatically added to the unnamed module. It’s a catch-all module to maintain backward compatibility with previously-written Java code.
```

#### 14.10.4.2.6 Distribution

```text
Modules can be distributed one of two ways: as a JAR file or as an “exploded” compiled project. This, of course, is the same as any other Java project so it should come as no surprise.

We can create multi-module projects comprised of a “main application” and several library modules.

We have to be careful though because we can only have one module per JAR file.

When we set up our build file, we need to make sure to bundle each module in our project as a separate jar.
```

#### 14.10.4.2.7 Default Modules

```text
When we install Java 9, we can see that the JDK now has a new structure.


They have taken all the original packages and moved them into the new module system.

We can see what these modules are by typing into the command line:

$java --list-modules
These modules are split into four major groups: java, javafx, jdk, and Oracle.

java modules are the implementation classes for the core SE Language Specification.

javafx modules are the FX UI libraries.

Anything needed by the JDK itself is kept in the jdk modules.

And finally, anything that is Oracle-specific is in the oracle modules.
```

#### 14.10.4.2.8 Module Declarations

```text
To set up a module, we need to put a special file at the root of our packages named module-info.java.
This file is known as the module descriptor and contains all of the data needed to build and use our new module.

We construct the module with a declaration whose body is either empty or made up of module directives:

module myModuleName {
    // all directives are optional
}
We start the module declaration with the module keyword, and we follow that with the name of the module.

The module will work with this declaration, but we’ll commonly need more information.

That is where the module directives come in.
```

#### 14.10.4.2.8.1 Requires

```text
Our first directive is requires. This module directive allows us to declare module dependencies:

module my.module {
    requires module.name;
}
Now, my.module has both a runtime and a compile-time dependency on module.name.

And all public types exported from a dependency are accessible by our module when we use this directive.
```

#### 14.10.4.2.8.2 Requires Static

```text
Sometimes we write code that references another module, but that users of our library will never want to use.

For instance, we might write a utility function that pretty-prints our internal state when another logging module is present. But, not every consumer of our library will want this functionality, and they don’t want to include an extra logging library.

In these cases, we want to use an optional dependency. By using the requires static directive, we create a compile-time-only dependency:

module my.module {
    requires static module.name;
}
```

#### 14.10.4.2.8.3 Requires Transitive

```text
We commonly work with libraries to make our lives easier.

But, we need to make sure that any module that brings in our code will also bring in these extra ‘transitive’ dependencies or they won’t work.

Luckily, we can use the requires transitive directive to force any downstream consumers also to read our required dependencies:

module my.module {
    requires transitive module.name;
}
Now, when a developer requires my.module, they won’t also have also to say requires module.name for our module to still work.
```

#### 14.10.4.2.8.4 Exports

```text
By default, a module doesn’t expose any of its API to other modules. This strong encapsulation was one of the key motivators for creating the module system in the first place.

Our code is significantly more secure, but now we need to explicitly open our API up to the world if we want it to be usable.

We use the exports directive to expose all public members of the named package:

module my.module {
    exports com.my.package.name;
}
Now, when someone does requires my.module, they will have access to the public types in our com.my.package.name package, but not any other package.
```

#### 14.10.4.2.8.5 Exports … To

```text
We can use exports…to to open up our public classes to the world.

But, what if we don’t want the entire world to access our API?

We can restrict which modules have access to our APIs using the exports…to directive.

Similar to the exports directive, we declare a package as exported. But, we also list which modules we are allowing to import this package as a requires. Let’s see what this looks like:

module my.module {
    export com.my.package.name to com.specific.package;
}
```

#### 14.10.4.2.8.6 Uses

```text
A service is an implementation of a specific interface or abstract class that can be consumed by other classes.
We designate the services our module consumes with the uses directive.

Note that the class name we use is either the interface or abstract class of the service, not the implementation class:

module my.module {
    uses class.name;
}
We should note here that there’s a difference between a requires directive and the uses directive.

We might require a module that provides a service we want to consume, but that service implements an interface from one of its transitive dependencies.

Instead of forcing our module to require all transitive dependencies just in case, we use the uses directive to add the required interface to the module path.
```

#### 14.10.4.2.8.7 Provides … With

```text
A module can also be a service provider that other modules can consume.

The first part of the directive is the provides keyword. Here is where we put the interface or abstract class name.

Next, we have the with directive where we provide the implementation class name that either implements the interface or extends the abstract class.
Here’s what it looks like put together:

module my.module {
    provides MyInterface with MyInterfaceImpl;
}
```

#### 14.10.4.2.8.8 Open

```text
We mentioned earlier that encapsulation was a driving motivator for the design of this module system.

Before Java 9, it was possible to use reflection to examine every type and member in a package, even the private ones. Nothing was truly encapsulated, which can open up all kinds of problems for developers of the libraries.

Because Java 9 enforces strong encapsulation, we now have to explicitly grant permission for other modules to reflect on our classes.

If we want to continue to allow full reflection as older versions of Java did, we can simply open the entire module up:

open module my.module {
}
```

#### 14.10.4.2.8.9 Opens

```text
If we need to allow reflection of private types, but we don’t want all of our code exposed, we can use the opens directive to expose specific packages.

But remember, this will open the package up to the entire world, so make sure that is what you want:

module my.module {
  opens com.my.package;
}
```

#### 14.10.4.2.8.10 Opens … To

```text
Okay, so reflection is great sometimes, but we still want as much security as we can get from encapsulation. We can selectively open our packages to a pre-approved list of modules, in this case, using the opens…to directive:

module my.module {
    opens com.my.package to moduleOne, moduleTwo, etc.;
}

                    14.10.4.2.8.11
```

#### 14.10.4.2.9 Command Line Options

```text
By now, support for Java 9 modules has been added to Maven and Gradle, so you won’t need to do a lot of manual building of your projects. However, it’s still valuable to know how to use the module system from the command line.

We’ll be using the command line for our full example down below to help solidify how the entire system works in our minds.

module-path – We use the –module-path option to specify the module path. This is a list of one or more directories that contain your modules.
add-reads – Instead of relying on the module declaration file, we can use the command line equivalent of the requires directive; –add-reads.
add-exports – Command line replacement for the exports directive.
add-opens – Replace the open clause in the module declaration file.
add-modules – Adds the list of modules into the default set of modules
list-modules – Prints a list of all modules and their version strings
patch-module – Add or override classes in a modules
illegal-access=permit|warn|deny – Either relax strong encapsulation by showing a single global warning, shows every warning, or fails with errors. The default is permit.
```

#### 14.10.4.2.10 Visibility

```text
We should spend a little time talking about the visibility of our code.

A lot of libraries depend on reflection to work their magic (JUnit and Spring come to mind).

By default in Java 9, we will only have access to public classes, methods, and fields in our exported packages. Even if we use reflection to get access to non-public members and call setAccessible(true), we won’t be able to access these members.

We can use the open, opens, and opens…to options to grant runtime-only access for reflection. Note, this is runtime-only!

We won’t be able to compile against private types, and we should never need to anyway.

If we must have access to a module for reflection, and we’re not the owner of that module (i.e., we can’t use the opens…to directive), then it’s possible to use the command line –add-opens option to allow own modules reflection access to the locked down module at runtime.


The only caveat here’s that you need to have access to the command line arguments that are used to run a module for this to work.
```

#### 14.10.4.2.11 Putting It All Together - java modules demo, tags: Putting It All Together - java modules demo

```text
Now that we know what a module is and how to use them let’s go ahead and build a simple project to demonstrate all the concepts we just learned.

To keep things simple, we won’t be using Maven or Gradle. Instead, we’ll rely on the command line tools to build our modules.
```

#### 14.10.4.2.11.1 directory structure

```text
$ mkdir simple-modules
$ mkdir simple-modules/hello.modules
$ mkdir simple-modules/hello.modules/com
$ mkdir simple-modules/hello.modules/com/baeldung
$ mkdir simple-modules/hello.modules/com/baeldung/modules
$ mkdir simple-modules/hello.modules/com/baeldung/modules/hello
$ mkdir simple-modules/main.app
$ mkdir simple-modules/main.app/com
$ mkdir simple-modules/main.app/com/baeldung
$ mkdir simple-modules/main.app/com/baeldung/modules
$ mkdir simple-modules/main.app/com/baeldung/modules/main
$ dir_tree 
   |-simple-modules
   |---hello.modules
   |-----com
   |-------baeldung
   |---------modules
   |-----------hello
   |---main.app
   |-----com
   |-------baeldung
   |---------modules
   |-----------main
```

#### 14.10.4.2.11.2 first module

```text
package:com.baeldung.modules.hello 
class: HelloModules.java 
package com.baeldung.modules.hello;

public class HelloModules {
    public static void doSomething() {
        System.out.println("Hello, Modules!");
    }
}

descriptor: module-info.java
module hello.modules {
    exports com.baeldung.modules.hello;
}
Note that this means we export all public members

all together:
$ ed simple-modules/hello.modules/com/baeldung/HelloModules.java 
simple-modules/hello.modules/com/baeldung/HelloModules.java: No such file or directory
a
package com.baeldung.modules.hello;

public class HelloModules {
    public static void doSomething() {
        System.out.println("Hello, Modules!");
    }
}
.
w
159
q
$ ed simple-modules/hello.modules/module-info.java
simple-modules/hello.modules/module-info.java: No such file or directory
a
module hello.modules {
    exports com.baeldung.modules.hello;
}
.
w
65
q
```

#### 14.10.4.2.11.3 second module

```text
- create module descriptor, note we don't export anything (no need), just importing hello.modules
$ ed simple-modules/main.app/module-info.java
simple-modules/main.app/module-info.java: No such file or directory
a
module main.app {
    requires hello.modules;
}
.
w
48
q

- create the using app
$ ed simple-modules/main.app/com/baeldung/MainApp.java
simple-modules/main.app/com/baeldung/MainApp.java: No such file or directory
a
package com.baeldung.modules.main;

import com.baeldung.modules.hello.HelloModules;

public class MainApp {
    public static void main(String[] args) {
        HelloModules.doSomething();
    }
}
.
w
197
q
```

#### 14.10.4.2.11.4 build

```text
$ ed compile-simple-modules.sh
compile-simple-modules.sh: No such file or directory
a
#!/usr/bin/env bash
javac -d outDir --module-source-path simple-modules $(find simple-modules -name "*.java")
.
w
110
q
$ . !$
. compile-simple-modules.sh
$ ls outDir/
hello.modules/	main.app/
```

#### 14.10.4.2.11.5 Run

```text
$ ed run-simple-module-app.sh
run-simple-module-app.sh: No such file or directory
a
#!/usr/bin/env bash
java --module-path outDir -m main.app/com.baeldung.modules.main.MainApp
.
w
92
q
$ . !$
. run-simple-module-app.sh
Hello, Modules!
```

#### 14.10.4.2.11.6 Adding a Service

```text
Now that we have a basic understanding of how to build a module, let’s make it a little more complicated.
We’re going to see how to use the provides…with and uses directives.
Start by defining a new file in the hello.modules module named HelloInterface.java, and adapting HelloModules class to implement it...
$ ed simple-modules/hello.modules/com/baeldung/HelloInterface.java
simple-modules/hello.modules/com/baeldung/HelloInterface.java: No such file or directory
a
public interface HelloInterface {
    void sayHello();
}
.
w
57
q
$ ed simple-modules/hello.modules/com/baeldung/HelloModules.java 
159
%d
a
public class HelloModules implements HelloInterface {
    public static void doSomething() {
        System.out.println("Hello, Modules!");
    }

    public void sayHello() {
        System.out.println("Hello!");
    }
}
.
w
222
q

That is all we need to do to create a service.
Now, we need to tell the world that our module provides this service.
Add the following to our module-info.java:
provides com.baeldung.modules.hello.HelloInterface with com.baeldung.modules.hello.HelloModules;
As we can see, we declare the interface and which class implements it.
$ cat simple-modules/hello.modules/module-info.java
module hello.modules {
    exports com.baeldung.modules.hello;
    provides com.baeldung.modules.hello.HelloInterface with com.baeldung.modules.hello.HelloModules;
}

As we can see, we declare the interface and which class implements it.

Next, we need to consume this service. In our main.app module, let’s add the following to our module-info.java:

uses com.baeldung.modules.hello.HelloInterface;

$ cat simple-modules/main.app/module-info.java
module main.app {
    requires hello.modules;
    uses com.baeldung.modules.hello.HelloInterface;
}

Finally, in our main method we can use this service via a ServiceLoader:
Iterable<HelloInterface> services = ServiceLoader.load(HelloInterface.class);
HelloInterface service = services.iterator().next();
service.sayHello();

$cat simple-modules/main.app/com/baeldung/modules/main/MainApp.java
package com.baeldung.modules.main;

import com.baeldung.modules.hello.HelloModules;

public class MainApp {
    public static void main(String[] args) {
        // HelloModules.doSomething();
        Iterable<HelloInterface> services = ServiceLoader.load(HelloInterface.class);
        HelloInterface service = services.iterator().next();
        service.sayHello();
    }
}
```

#### 14.10.4.2.12 Final demo structure and code

```text
$ dir_tree 
   |-outDir
   |---hello.modules
   |-----com
   |-------baeldung
   |---------modules
   |-----------hello
   |---main.app
   |-----com
   |-------baeldung
   |---------modules
   |-----------main
   |-simple-modules
   |---hello.modules
   |-----com
   |-------baeldung
   |---------modules
   |-----------hello
   |---main.app
   |-----com
   |-------baeldung
   |---------modules
   |-----------main
$ for file in $(find . -name '*.java'); do echo $file; cat $file; echo "--------"; done
./simple-modules/hello.modules/module-info.java
module hello.modules {
    exports com.baeldung.modules.hello;
    provides com.baeldung.modules.hello.HelloInterface with com.baeldung.modules.hello.HelloModules;
}
--------
./simple-modules/hello.modules/com/baeldung/modules/hello/HelloModules.java
package com.baeldung.modules.hello;
public class HelloModules implements HelloInterface {
    public static void doSomething() {
        System.out.println("Hello, Modules!");
    }

    public void sayHello() {
        System.out.println("Hello!");
    }
}
--------
./simple-modules/hello.modules/com/baeldung/modules/hello/HelloInterface.java
package com.baeldung.modules.hello;
public interface HelloInterface {
    void sayHello();
}
--------
./simple-modules/main.app/module-info.java
module main.app {
    requires hello.modules;
    uses com.baeldung.modules.hello.HelloInterface;
}
--------
./simple-modules/main.app/com/baeldung/modules/main/MainApp.java
package com.baeldung.modules.main;

import java.util.ServiceLoader;

import com.baeldung.modules.hello.HelloInterface;

public class MainApp {
    public static void main(String[] args) {
        // HelloModules.doSomething();
        Iterable<HelloInterface> services = ServiceLoader.load(HelloInterface.class);
        HelloInterface service = services.iterator().next();
        service.sayHello();
    }
}
--------
$ . compile-simple-modules.sh
$ . run-simple-module-app.sh
Hello!
```

#### 14.10.4.2.13 Adding Modules to the Unnamed Module

```text
The unnamed module concept is similar to the default package. Therefore, it’s not considered a real module, but can be viewed as the default module.

If a class is not a member of a named module, then it will be automatically considered as part of this unnamed module.

Sometimes, to ensure specific platform, library, or service-provider modules in the module graph, we need to add modules to the default root set. For example, when we try to run Java 8 programs as-is with Java 9 compiler we may need to add modules.

In general, the option to add the named modules to the default set of root modules is –add-modules <module>(,<module>)* where <module> is a module name.

For example, to provide access to all java.xml.bind modules the syntax would be:

--add-modules java.xml.bind
Copy
To use this in Maven, we can embed the same to the maven-compiler-plugin:

<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-compiler-plugin</artifactId>
    <version>3.8.0</version>
    <configuration>
        <source>9</source>
        <target>9</target>
        <compilerArgs>
            <arg>--add-modules</arg>
            <arg>java.xml.bind</arg>
        </compilerArgs>
    </configuration>
</plugin>

                14.10.4.2.14
            14.10.4.3
            14.10.4.4
```

### 14.10.5 Process API Improvements

```text
Java SE 9 is coming with some improvements in Process API. They have added couple new classes and methods to ease the controlling and managing of OS processes. Two new interfcase in Process API:

java.lang.ProcessHandle
java.lang.ProcessHandle.Info
```

#### 14.10.5.1 chatgpt

````text
Java 9 introduced several improvements to the Process API to enhance the interaction between Java applications and native processes, making it easier to manage and control external processes. These improvements include the introduction of the `ProcessHandle` interface and related methods. Here are some of the key enhancements:

| 1. **Introduction of `ProcessHandle` Interface**: Java 9 introduced the `java.lang.ProcessHandle` interface, which represents a native process. This interface provides methods for inspecting and controlling processes.
| 
| 2. **Listing All Processes**: You can use the `ProcessHandle.allProcesses()` method to obtain a stream of all currently running processes on the system. This allows you to inspect and interact with each process.
| 
| ```java
| ProcessHandle.allProcesses().forEach(process -> {
|     System.out.println("PID: " + process.pid());
|     System.out.println("Command: " + process.info().command().orElse("N/A"));
|     System.out.println("Arguments: " + String.join(" ", process.info().arguments().orElse(new String[] {})));
| });
| ```
| 
| 3. **Accessing Process Information**: The `ProcessHandle` interface provides methods to retrieve information about a process, such as its PID (Process ID), command, arguments, start time, user, and more.

```java
ProcessHandle process = ... // Obtain a ProcessHandle
System.out.println("PID: " + process.pid());
System.out.println("Command: " + process.info().command().orElse("N/A"));
System.out.println("Arguments: " + String.join(" ", process.info().arguments().orElse(new String[] {})));
System.out.println("Start Time: " + process.info().startInstant().orElse(null));
System.out.println("User: " + process.info().user().orElse("N/A"));
```

|4. **Destroying and Monitoring Processes**: You can use the `destroy()` and `destroyForcibly()` methods to terminate a process. Additionally, you can use the `isAlive()` method to check if a process is still running. These methods make it easier to manage external processes from Java.

```java
ProcessHandle process = ... // Obtain a ProcessHandle
boolean destroyed = process.destroy();
boolean forciblyDestroyed = process.destroyForcibly();
boolean isAlive = process.isAlive();
```

|5. **OnExit Callbacks**: You can register an `onExit` callback with a `ProcessHandle` to perform actions when a process exits. This allows you to respond to process termination events.

```java
ProcessHandle process = ... // Obtain a ProcessHandle
process.onExit().thenAccept(p -> System.out.println("Process exited with PID: " + p.pid()));
```

These enhancements to the Process API in Java 9 make it more powerful and versatile for managing external processes, inspecting process information, and responding to process events, improving the overall interaction between Java applications and the underlying operating system.
````

#### 14.10.5.2 demo

```text
$ cat ProcessHandleDemo.java 
class ProcessHandleDemo {
    public static void main(String[] args) {
        ProcessHandle.allProcesses().forEach(process -> {
            String user = process.info().user().orElse("N/A");
            if (user.equals("<user>")) { //print my processes 
                System.out.printf("PID=%d, Command=%s, Arguments=%s, Start time=%s, user=%s \n", process.pid(),
                        process.info().command().orElse("N/A"),
                        String.join(" ", process.info().arguments().orElse(new String[] {})),
                        process.info().startInstant().orElse(null),
                        process.info().user().orElse("N/A"));

            }
        });

    }
}$ javac ProcessHandleDemo.java 
$ java ProcessHandleDemo | head -n 4
PID=27795, Command=/opt/homebrew/Cellar/openjdk/20.0.2/libexec/openjdk.jdk/Contents/Home/bin/java, Arguments=ProcessHandleDemo, Start time=2023-09-19T15:30:58.289Z, user=<user> 
PID=27796, Command=/usr/bin/head, Arguments=-n 4, Start time=2023-09-19T15:30:58.291Z, user=<user> 
PID=27745, Command=/System/Library/Frameworks/CoreServices.framework/Frameworks/Metadata.framework/Versions/A/Support/mdworker_shared, Arguments=-s mdworker -c MDSImporterWorker -m com.apple.mdworker.shared, Start time=2023-09-19T15:30:15.186Z, user=<user> 
PID=27722, Command=/System/Library/PrivateFrameworks/HelpData.framework/Versions/A/Resources/helpd, Arguments=, Start time=2023-09-19T15:30:02.319Z, user=<user> 
```

#### 14.10.5.3 try-with-resources statement

#### 14.10.5.3.1 explanation

```text
The try-with-resources statement is a try statement with one or more resources duly declared. Here resource is an object which should be closed once it is no more required. The try-with-resources statement ensures that each resource is closed after the requirement finishes. Any object implementing java.lang.AutoCloseable or java.io.Closeable, interface can be used as a resource.

Prior to Java 9, resources are to be declared before try or inside try statement as shown below in given example. In this example, we'll use BufferedReader as resource to read a string and then BufferedReader is to be closed.

Tester.java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.Reader;
import java.io.StringReader;

public class Tester {
   public static void main(String[] args) throws IOException {
      System.out.println(readData("test"));
   } 
   static String readData(String message) throws IOException {
      Reader inputString = new StringReader(message);
      BufferedReader br = new BufferedReader(inputString);
      try (BufferedReader br1 = br) {
         return br1.readLine();
      }
   }
}

Output
test
Here we need to declare a resource br1 within try statment and then use it. In Java9, we don't need to declare br1 anymore and following program will give the same result.

Tester.java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.Reader;
import java.io.StringReader;

public class Tester {
   public static void main(String[] args) throws IOException {
      System.out.println(readData("test"));
   } 
   static String readData(String message) throws IOException {
      Reader inputString = new StringReader(message);
      BufferedReader br = new BufferedReader(inputString);
      try (br) {
         return br.readLine();
      }
   }
}

Output
test
```

#### 14.10.5.3.2 demo

```text
$ cat TryWithResourceDemo.java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.Reader;
import java.io.StringReader;

public class TryWithResourceDemo{
   public static void main(String[] args) throws IOException {
      System.out.println(readData("Try-With-Resource demo. resource will auto close after try clause"));
   } 

   static String readData(String message) throws IOException {
      Reader inputString = new StringReader(message);
      BufferedReader br = new BufferedReader(inputString);
      try (br) {
         return br.readLine();
      }
   }
}
$ javac TryWithResourceDemo.java 
$ java TryWithResourceDemo
Try-With-Resource demo. resource will auto close after try clause

                14.10.5.3.3
```

### 14.10.6 CompletableFuture API Improvements in java 9

#### 14.10.6.1 GPT

```text
Java 9 introduced several improvements to the `CompletableFuture` class, which is part of the Java Concurrency framework and is used for asynchronous and concurrent programming. These improvements aimed to enhance the usability and flexibility of the `CompletableFuture` API. Here are some of the key improvements:

**1. Factory Methods for `CompletableFuture`**

Java 9 introduced factory methods for creating instances of `CompletableFuture`. These methods simplify the creation of completed, exceptionally completed, and incomplete futures:

- `CompletableFuture.completedFuture(T value)`: Returns a new `CompletableFuture` that is already completed with the given value.
- `CompletableFuture.failedFuture(Throwable ex)`: Returns a new `CompletableFuture` that is already exceptionally completed with the given exception.
- `new CompletableFuture().obtrudeValue(T value)`: Explicitly sets the value of a `CompletableFuture`, making it completed.
- `new CompletableFuture().obtrudeException(Throwable ex)`: Explicitly sets an exception for a `CompletableFuture`, making it exceptionally completed.

**2. Improved `thenAccpet`, `thenApply`, and `thenRun` Variants**

In Java 9, the `thenAccept`, `thenApply`, and `thenRun` methods were enhanced to include async variants that allow you to specify an executor for the dependent action. This provides more control over the execution context:

- `thenAcceptAsync(Consumer<? super T> action, Executor executor)`: Executes the action asynchronously using the specified executor when the source `CompletableFuture` completes.
- `thenApplyAsync(Function<? super T,? extends U> fn, Executor executor)`: Applies the function asynchronously using the specified executor when the source `CompletableFuture` completes.
- `thenRunAsync(Runnable action, Executor executor)`: Runs the action asynchronously using the specified executor when the source `CompletableFuture` completes.

**3. `or` and `completeOnTimeout` Methods**

- `or`: Introduced as an alternative to `applyToEither` and `acceptEither`, `or` returns a new `CompletableFuture` that is completed with the result of the first of the given CompletableFutures to complete.
- `completeOnTimeout`: Allows you to complete a `CompletableFuture` with a default value if it hasn't completed within a specified timeout.

**4. `completeAsync` and `obtrudeAsync` Methods**

- `completeAsync`: Completes a `CompletableFuture` asynchronously using a supplied supplier or future supplier.
- `obtrudeAsync`: Similar to `obtrudeValue` and `obtrudeException`, but performs the operation asynchronously.

**5. `delayedExecutor` Method**

Introduced the `delayedExecutor` method in the `Executor` interface, which returns an executor that introduces a delay between submission and execution of tasks.

These improvements in Java 9 make working with `CompletableFuture` more powerful and flexible, allowing developers to write asynchronous and concurrent code more efficiently and effectively. They provide better control over execution contexts, handling exceptional cases, and specifying timeout behavior.
```

#### 14.10.6.2 GTP demo

````text
Certainly! Let's create a simple demo that showcases some of the `CompletableFuture` API improvements introduced in Java 9.

In this example, we'll cover the following features:
|1. Factory methods for `CompletableFuture`.
|2. Improved `thenAcceptAsync`, `thenApplyAsync`, and `thenRunAsync`.
|3. `or` method for handling the first completed future.
|4. `completeOnTimeout` for setting a timeout.
|5. `delayedExecutor` for introducing a delay.

```java
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class CompletableFutureDemo {
    public static void main(String[] args) throws Exception {
        // Factory methods
        CompletableFuture<Integer> completedFuture = CompletableFuture.completedFuture(42);
        CompletableFuture<String> failedFuture = CompletableFuture.failedFuture(new RuntimeException("Failed!"));

        // thenAcceptAsync with a custom executor
        Executor customExecutor = Executors.newSingleThreadExecutor();
        CompletableFuture<Void> thenAcceptAsyncDemo = completedFuture.thenAcceptAsync(result -> {
            System.out.println("Received result: " + result);
            System.out.println("Thread: " + Thread.currentThread().getName());
        }, customExecutor);

        // or method to handle the first completed future
        CompletableFuture<String> future1 = CompletableFuture.supplyAsync(() -> "Result from Future 1");
        CompletableFuture<String> future2 = CompletableFuture.supplyAsync(() -> "Result from Future 2");
        CompletableFuture<String> firstCompleted = future1.or(() -> future2);

        // completeOnTimeout to handle a timeout
        CompletableFuture<Integer> delayedFuture = CompletableFuture.supplyAsync(() -> {
            try {
                TimeUnit.SECONDS.sleep(2);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return 100;
        });

        CompletableFuture<Integer> result = delayedFuture.completeOnTimeout(42, 1, TimeUnit.SECONDS);

        // delayedExecutor to introduce a delay
        Executor delayedExecutor = Executors.newScheduledThreadPool(1);
        CompletableFuture<Void> delayedDemo = CompletableFuture.runAsync(() -> {
            try {
                TimeUnit.SECONDS.sleep(2);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println("Task executed after a delay.");
        }, delayedExecutor);

        // Wait for completion
        thenAcceptAsyncDemo.get();
        System.out.println("First completed: " + firstCompleted.join());
        System.out.println("Timeout result: " + result.join());
        delayedDemo.get();
    }
}
```

In this demo:

- We use factory methods to create completed and failed futures.
- `thenAcceptAsync` demonstrates asynchronous execution with a custom executor.
- `or` method allows us to choose the result from the first completed future.
- `completeOnTimeout` demonstrates setting a timeout for a future.
- `delayedExecutor` is used to introduce a delay in the execution of a task.

Make sure to replace the custom executor and file paths with appropriate values for your environment.
````

#### 14.10.6.3 my demo

```text
$ cat CompletableFutureDemo.java 
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class CompletableFutureDemo {
    public static void main(String[] args) throws Exception {
        
        // Factory methods
        CompletableFuture<Integer> completedFuture = CompletableFuture.completedFuture(42);
        CompletableFuture<String> failedFuture = CompletableFuture.failedFuture(new RuntimeException("Failed!"));

        // thenAcceptAsync with a custom executor
        Executor customExecutor = Executors.newSingleThreadExecutor();
        CompletableFuture<Void> thenAcceptAsyncDemo = completedFuture.thenAcceptAsync(result -> {
            System.out.println("Received result: " + result);
            System.out.println("Thread: " + Thread.currentThread().getName());
        }, customExecutor);

        // or method to handle the first completed future
        CompletableFuture<String> future1 = CompletableFuture.supplyAsync(() -> "Result from Future 1");
        CompletableFuture<String> future2 = CompletableFuture.supplyAsync(() -> "Result from Future 2");
        CompletableFuture<String> firstCompleted = future1.thenCombine(future2, (res1, res2) -> res1+" | "+res2);
        firstCompleted.thenAccept( res3 -> System.out.println("Combined result of two futures: " + res3));

        // completeOnTimeout to handle a timeout
        CompletableFuture<Integer> delayedFuture = CompletableFuture.supplyAsync(() -> {
            try {
                TimeUnit.SECONDS.sleep(2); //simulate long running task
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return 100; //return value
        });

        CompletableFuture<Integer> result = delayedFuture.completeOnTimeout(42, 1, TimeUnit.SECONDS); // 42 is value to return on TO, 1 is TO, in seconds

        // delayedExecutor to introduce a delay
        Executor delayedExecutor = Executors.newScheduledThreadPool(1); // 1 thread in executor thread pool
        CompletableFuture<Void> delayedDemo = CompletableFuture.runAsync(() -> {
            try {
                TimeUnit.SECONDS.sleep(2); // this is the delay
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println("Task executed after a delay."); // this is the task
        }, delayedExecutor);

        // Wait for completion
        thenAcceptAsyncDemo.get();
        System.out.println("First completed: " + firstCompleted.join());
        System.out.println("Timeout result: " + result.join());
        delayedDemo.get();
    }
}
$ javac CompletableFutureDemo.java 
$ java CompletableFutureDemo
Received result: 42
Thread: pool-1-thread-1
Combined result of two futures: Result from Future 1 | Result from Future 2
First completed: Result from Future 1 | Result from Future 2
Timeout result: 42
Task executed after a delay.
            14.10.6.4
```

### 14.10.7 java 9 reactive streams

#### 14.10.7.1 https://www.baeldung.com/java-9-reactive-streams

#### 14.10.7.1.1 Overview

```text
In this article, we’ll be looking at the Java 9 Reactive Streams. Simply put, we’ll be able to use the Flow class, which encloses the primary building blocks for building reactive stream processing logic.

Reactive Streams is a standard for asynchronous stream processing with non-blocking back pressure. This specification is defined in the Reactive Manifesto, and there are various implementations of it, for example, RxJava or Akka-Streams.
```

#### 14.10.7.1.2 Reactive API Overview

```text
To build a Flow, we can use three main abstractions and compose them into asynchronous processing logic.

Every Flow needs to process events that are published to it by a Publisher instance; the Publisher has one method – subscribe().

If any of the subscribers want to receive events published by it, they need to subscribe to the given Publisher.


The receiver of messages needs to implement the Subscriber interface. Typically this is the end for every Flow processing because the instance of it does not send messages further.

We can think about Subscriber as a Sink. This has four methods that need to be overridden – onSubscribe(), onNext(), onError(), and onComplete(). We’ll be looking at those in the next section.

If we want to transform incoming message and pass it further to the next Subscriber, we need to implement the Processor interface. This acts both as a Subscriber because it receives messages, and as the Publisher because it processes those messages and sends them for further processing.
```

#### 14.10.7.1.3 Publishing and Consuming Messages

```text
Let’s say we want to create a simple Flow, in which we have a Publisher publishing messages, and a simple Subscriber consuming messages as they arrive – one at the time.

Let’s create an EndSubscriber class. We need to implement the Subscriber interface. Next, we’ll override the required methods.
The onSubscribe() method is called before processing starts. The instance of the Subscription is passed as the argument. It is a class that is used to control the flow of messages between Subscriber and the Publisher:
public class EndSubscriber<T> implements Subscriber<T> {
    private Subscription subscription;
    public List<T> consumedElements = new LinkedList<>();

    @Override
    public void onSubscribe(Subscription subscription) {
        this.subscription = subscription;
        subscription.request(1);
    }
}
We also initialized an empty List of consumedElements that’ll be utilized in the tests.

Now, we need to implement the remaining methods from the Subscriber interface. The main method here is onNext() – this is called whenever the Publisher publishes a new message:
@Override
public void onNext(T item) {
    System.out.println("Got : " + item);
    consumedElements.add(item);
    subscription.request(1);
}
Note that when we started the subscription in the onSubscribe() method and when we processed a message we need to call the request() method on the Subscription to signal that the current Subscriber is ready to consume more messages.

Lastly, we need to implement onError() – which is called whenever some exception will be thrown in the processing, as well as onComplete() – called when the Publisher is closed:
@Override
public void onError(Throwable t) {
    t.printStackTrace();
}

@Override
public void onComplete() {
    System.out.println("Done");
}

Let’s write a test for the Processing Flow. We’ll be using the SubmissionPublisher class – a construct from the java.util.concurrent – which implements the Publisher interface.

We’re going to be submitting N elements to the Publisher – which our EndSubscriber will be receiving:
@Test
public void whenSubscribeToIt_thenShouldConsumeAll() 
  throws InterruptedException {
 
    // given
    SubmissionPublisher<String> publisher = new SubmissionPublisher<>();
    EndSubscriber<String> subscriber = new EndSubscriber<>();
    publisher.subscribe(subscriber);
    List<String> items = List.of("1", "x", "2", "x", "3", "x");

    // when
    assertThat(publisher.getNumberOfSubscribers()).isEqualTo(1);
    items.forEach(publisher::submit);
    publisher.close();

    // then
     await().atMost(1000, TimeUnit.MILLISECONDS)
       .until(
         () -> assertThat(subscriber.consumedElements)
         .containsExactlyElementsOf(items)
     );
}
                14.10.7.1.4
```

#### 14.10.7.2 chatgpt

````text
Java 9 introduced the Reactive Streams API as part of the `java.util.concurrent.Flow` package. Reactive Streams are a standard for asynchronous stream processing in Java, designed to handle asynchronous and backpressure-aware stream processing. Here's a simple example of using the Reactive Streams API in Java 9:

```java
import java.util.concurrent.Flow.*;
import java.util.concurrent.SubmissionPublisher;
import java.util.concurrent.TimeUnit;

public class ReactiveStreamsExample {
    public static void main(String[] args) throws InterruptedException {
        // Create a SubmissionPublisher
        SubmissionPublisher<Integer> publisher = new SubmissionPublisher<>();

        // Create a Subscriber
        Subscriber<Integer> subscriber = new Subscriber<Integer>() {
            private Subscription subscription;

            @Override
            public void onSubscribe(Subscription subscription) {
                this.subscription = subscription;
                subscription.request(1); // Request the first item
            }

            @Override
            public void onNext(Integer item) {
                System.out.println("Received: " + item);
                subscription.request(1); // Request the next item
            }

            @Override
            public void onError(Throwable throwable) {
                throwable.printStackTrace();
            }

            @Override
            public void onComplete() {
                System.out.println("Done");
            }
        };

        // Subscribe the subscriber to the publisher
        publisher.subscribe(subscriber);

        // Publish some items
        for (int i = 1; i <= 5; i++) {
            publisher.submit(i);
            TimeUnit.MILLISECONDS.sleep(500); // Sleep to simulate asynchronous processing
        }

        // Close the publisher (important to avoid resource leaks)
        publisher.close();

        // Wait for a while to let the processing complete
        TimeUnit.SECONDS.sleep(2);
    }
}
```

In this example:

|1. We create a `SubmissionPublisher<Integer>` to publish integer items.
|
|2. We create a `Subscriber<Integer>` to subscribe to the publisher.
|
|3. In the `onSubscribe()` method of the subscriber, we request the first item to start the flow.
|
|4. In the `onNext()` method, we process received items and request the next one.
|
|5. In the `onError()` method, we handle errors if they occur.
|
|6. In the `onComplete()` method, we handle the completion of the stream.
|
|7. We subscribe the subscriber to the publisher.
|
|8. We publish integer items from 1 to 5 to the publisher with a 500ms delay between each item to simulate asynchronous processing.
|
|9. Finally, we close the publisher and wait for a while to ensure that all items are processed.

This example demonstrates the basic usage of the Reactive Streams API in Java 9, including publishing, subscribing, and handling items in a reactive and backpressure-aware manner.

            14.10.7.3
````

### 14.10.8 Diamond Operator for Anonymous Inner Class

```text
We know, Java SE 7 has introduced one new feature: Diamond Operator to avoid redundant code and verbosity, to improve readability. However, in Java SE 8, Oracle Corp (Java Library Developer) has found that some limitations in the use of Diamond operator with Anonymous Inner Class. They have fixed those issues and going to release them as part of Java 9.

  public List getEmployee(String empid){
     // Code to get Employee details from Data Store
     return new List(emp){ };
  }
Here we are using just “List” without specifying the type parameter.
```

### 14.10.9 Optional Class Improvements

```text
In Java SE 9, Oracle Corp has added some useful new methods to java.util.Optional class. Here I’m going to discuss about one of those methods with some simple example: stream method If a value present in the given Optional object, this stream() method returns a sequential Stream with that value. Otherwise, it returns an empty Stream. They have added “stream()” method to work on Optional objects lazily as shown below:

Stream<Optional> emp = getEmployee(id)
Stream empStream = emp.flatMap(Optional::stream)
Here Optional.stream() method is used to convert a Stream of Optional of Employee object into a Stream of Employee so that we can work on this result lazily in the result code.
```

### 14.10.10 Stream API Improvements

```text
In Java SE 9, Oracle Corp has added four useful new methods to java.util.Stream interface. As Stream is an interface, all those new implemented methods are default methods. Two of them are very important: dropWhile and takeWhile methods If you are familiar with Scala Language or any Functions programming language, you will definitely know about these methods. These are very useful methods in writing some functional style code. Let us discuss the takeWhile utility method here. This takeWhile() takes a predicate as an argument and returns a Stream of the subset of the given Stream values until that Predicate returns false for the first time. If the first value does NOT satisfy that Predicate, it just returns an empty Stream.

jshell> Stream.of(1,2,3,4,5,6,7,8,9,10).takeWhile(i -> i < 5 )
                 .forEach(System.out::println);
```

### 14.10.11 Enhanced @Deprecated annotation

```text
In Java SE 8 and earlier versions, @Deprecated annotation is just a Marker interface without any methods. It is used to mark a Java API that is a class, field, method, interface, constructor, enum etc. In Java SE 9, Oracle Corp has enhanced @Deprecated annotation to provide more information about deprecated API and also provide a Tool to analyze an application’s static usage of deprecated APIs. They have add two methods to this Deprecated interface: forRemoval and since to serve this information
```

### 14.10.12 HTTP 2 Client

```text
In Java SE 9, Oracle Corp is going to release New HTTP 2 Client API to support HTTP/2 protocol and WebSocket features. As existing or Legacy HTTP Client API has numerous issues (like supports HTTP/1.1 protocol and does not support HTTP/2 protocol and WebSocket, works only in Blocking mode and lot of performance issues.), they are replacing this HttpURLConnection API with new HTTP client. They are going to introduce a new HTTP 2 Client API under the “java.net.http” package. It supports both HTTP/1.1 and HTTP/2 protocols. It supports both Synchronous (Blocking Mode) and Asynchronous Modes. It supports Asynchronous Mode using the WebSocket API. We can see this new API at https://download.java.net/java/jdk9/docs/api/java/net/http/package-summary.html HTTP 2 Client Example

jshell> import java.net.http.*

jshell> import static java.net.http.HttpRequest.*

jshell> import static java.net.http.HttpResponse.*

jshell> URI uri = new URI("https://rams4java.blogspot.co.uk/2016/05/java-news.html")
uri ==> https://rams4java.blogspot.co.uk/2016/05/java-news.html

jshell> HttpResponse response = HttpRequest.create(uri).body(noBody()).GET().response()
response ==> java.net.http.HttpResponseImpl@79efed2d

jshell> System.out.println("Response was " + response.body(asString()))
```

### 14.10.13 Multi-Resolution Image API

```text
In Java SE 9, Oracle Corp is going to introduce a new Multi-Resolution Image API. Important interface in this API is MultiResolutionImage . It is available in java.awt.image package. MultiResolutionImage encapsulates a set of images with different Height and Widths (that is different resolutions) and allows us to query them with our requirements.
```

### 14.10.14 Miscellaneous Java 9 Features

```text
In this section, I will just list out some miscellaneous Java SE 9 New Features. I’m NOT saying these are less important features. They are also important and useful to understand them very well with some useful examples. As of now, I did not get enough information about these features. That’s why I am going to list them here for a brief understanding. I will pick up these features one by one and add to the above section with a brief discussion and example. And finally write a separate tutorial later.

GC (Garbage Collector) Improvements
Stack-Walking API
Filter Incoming Serialization Data
Deprecate the Applet API
Indify String Concatenation
Enhanced Method Handles
Java Platform Logging API and Service
Compact Strings
Parser API for Nashorn
Javadoc Search
HTML5 Javadoc

        14.10.15
```

## 14.11 Java version 10, tags: Java version 10

```text
Language Changes: Local Variable Type Inference(Var Keyword), Garbage Collector Interface.
```

### 14.11.1 https://javagoal.com/java-10-features/

#### 14.11.1.1 Java 10 Features

```text
Java 10 was released on March 20, 2018, The JDK 10 is an implementation of JAVA SE 10. As we know, Java is slow in growth and evolution as compared to other languages.  But Java 10 was quick to release after Java 9. With this release, the six-month release cycle has begun. You must think about why I am saying the six-month release cycle. I will explain it below in detail. To understand this concept, we have to understand LTS (Long Term Support model). In this post, we will read the most common and useful Java 10 Features and Java 10 tutorial.
```

#### 14.11.1.2 Local Variable Type Inference

```text
Local variable type inference was the biggest feature of Java 10. As we know we have to define a variable with its data type but from Java 10 onward we can use the var keyword to declare the local variables. We don’t need to specify the data type with the variable name. Now it’s the compiler’s responsibility to infer the type of the variable using the value provided. We will discuss it in a separate post with various types of examples and what will be restrictions and rules. You can read it here.

// Declaring and initlizing an int variable with value
int i = 5;
// Declaring and initlizing an String variable with value
String hello = "Hello world!";
// Creating an ArrayList
ArrayList<String> list = new ArrayList<String>();
// Creating a HashMap 
HashMap<Integer, String> hashMap = new HashMap<Integer, String>()
// Declaring and initlizing variable with value
var i = 5;
// Declaring and initlizing variable with value
var hello = "Hello world!";
// Creating an ArrayList
var list = new ArrayList<String>();
// Creating a HashMap 
HashMap<Integer, String> hashMap = new HashMap<Integer, String>()

            14.11.1.3
        14.11.2
```

## 14.11 Java version 11

```text
    Language Changes: The Local Variable Syntax Adds Up For Lambda Parameters.

Library Changes: JEP 321 HTTP Client Standardized.
```

## 14.12 Java version 12

## 14.13 Java version 13

## 14.14 Java version 14

## 14.15 Java version 15

## 14.16 Java version 16

## 14.17 Java version 17

### 14.17.1 Java 17 vs Java 8

#### 14.17.1.1 https://pretius.com/blog/java-17-features/

```text
A few months from now – in March 2022 – Java 8 will lose its Oracle Premier Support. It doesn’t mean that it won’t receive any new updates, but Oracle’s effort put into maintaining it will likely be significantly smaller than it is right now.

That means there’ll be a good reason to make the move to a new version. Especially since just a month ago – on September 14th, 2021 – Java 17 was released. It’s the new Long Term Support version, with Oracle Premier Support to last until September 2026 (at least). What does Java 17 bring? How difficult will the migration be? Is it worth it? I’ll try to answer those questions in this article.

The popularity of Java 8 – a little bit of history
A screen showing Java logo with a looking glass.
Let’s take a look at some of the features.
Java 8, which was released in March 2014, is currently used by 69% of programmers in their main application. Why is it, after more than 7 years, still the most commonly used version? There are many reasons for that.

Java 8 provided lots of language features that made developers want to switch from previous versions. Lambdas, streams, functional programming, extensive API extensions – not to mention MetaSpace or G1 extensions. It was the Java version to use.

Java 9 appeared 3 years later, in September 2017, and for a typical developer, it changed next to nothing. A new HTTP client, process API, minor diamond operator and try-with-resources improvements. 

Sure, Java 9 did bring one significant change, groundbreaking even – the Jigsaw Project. It changed a lot, a great lot of things – but internally. Java modularization gives great possibilities, solves lots of technical problems, and applies to everyone, but only a relatively small group of users actually needed to deeply understand the changes. Due to the changes introduced with the Jigsaw Project lots of libraries required additional modifications, new versions were released, some of them did not work properly. 

Java 9 migration – in particular for large, corporate applications – was often difficult, time-consuming, and caused regression problems. So why do it, if there is little to gain and it costs a lot of time and money?

This brings us to the current day, October 2021. Java Development Kit 17 (JDK 17) was released just a month ago. Is it a good time to move on from the 7-year-old Java 8? First, let’s see what’s in Java 17. What does it bring to the programmer and admin or SRE, when compared to Java 8?

Java 17 vs Java 8 – the changes
This article covers only the changes that I deemed important enough or interesting enough to mention. They are not everything that was changed, improved, optimized in all the years of Java evolution. If you want to see a full list of changes to JDK, you should know that they are tracked as JEPs (JDK Enhancement Proposals). The list can be found in JEP-0.

Also, if you want to compare Java APIs between versions, there is a great tool called Java Version Almanac. There were many useful, small additions to Java APIs, and checking this website is likely the best option if someone wants to learn about all these changes.

As for now, let’s analyze the changes and new features in each iteration of Java, that are most important from the perspective of most of us Java Developers.

New var keyword
A new var keyword was added that allows local variables to be declared in a more concise manner. Consider this code:

// java 8 way
Map<String, List<MyDtoType>> myMap = new HashMap<String, List<MyDtoType>>();
List<MyDomainObjectWithLongName> myList = aDelegate.fetchDomainObjects();
// java 10 way
var myMap = new HashMap<String, List<MyDtoType>>();
var myList = aDelegate.fetchDomainObjects()
When using var, the declaration it’s much, much shorter and, perhaps, a bit more readable than before. One must make sure to take the readability into account first, so in some cases, it may be wrong to hide the type from the programmer. Take care to name the variables properly.

Unfortunately, it is not possible to assign a lambda to a variable using var keyword:

// causes compilation error: 
//   method reference needs an explicit target-type
var fun = MyObject::mySpecialFunction;
It is, however, possible to use the var in lambda expressions. Take a look at the example below:

boolean isThereAneedle = stringsList.stream()
  .anyMatch((@NonNull var s) -> s.equals(“needle”));
Using var in lambda arguments, we can add annotations to the arguments. 

Records
One may say Records are Java’s answer to Lombok. At least partly, that is. Record is a type designed to store some data. Let me quote a fragment of JEP 395 that describes it well: 

[…] a record acquires many standard members automatically:

A private final field for each component of the state description;
A public read accessor method for each component of the state description, with the same name and type as the component;
A public constructor, whose signature is the same as the state description, which initializes each field from the corresponding argument;
Implementations of equals and hashCode that say two records are equal if they are of the same type and contain the same state; and
An implementation of toString that includes the string representation of all the record components, with their names.
In other words, it’s roughly equivalent to Lombok’s @Value. In terms of language, it’s kind of similar to an enum. However, instead of declaring possible values, you declare the fields. Java generates some code based on that declaration and is capable of handling it in a better, optimized way. Like enum, it can’t extend or be extended by other classes, but it can implement an interface and have static fields and methods. Contrary to an enum, a record can be instantiated with the new keyword.

A record may look like this:

record BankAccount (String bankName, String accountNumber) implements HasAccountNumber {}
And this is it. Pretty short. Short is good!

Any automatically generated methods can be declared manually by the programmer. A set of constructors can be also declared. Moreover, in constructors, all fields that are definitely unassigned are implicitly assigned to their corresponding constructor parameters. It means that the assignment can be skipped entirely in the constructor!

record BankAccount (String bankName, String accountNumber) implements HasAccountNumber {
  public BankAccount { // <-- this is the constructor! no () !
    if (accountNumber == null || accountNumber.length() != 26) {
      throw new ValidationException(“Account number invalid”);
    }
    // no assignment necessary here!
  }
}
For all the details like formal grammar, notes on usage and implementation, make sure to consult the JEP 359. You could also check StackOverflow for the most upvoted questions on Java Records.

Extended switch expressions
Switch is present in a lot of languages, but over the years it got less and less useful because of the limitations it had. Other parts of Java grew, switch did not. Nowadays switch cases can be grouped much more easily and in a more readable manner (note there’s no break!) and the switch expression itself actually returns a result.

DayOfWeek dayOfWeek = LocalDate.now().getDayOfWeek();
boolean freeDay = switch (dayOfWeek) {
    case MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY -> false;
    case SATURDAY, SUNDAY -> true;
};
Even more can be achieved with the new yield keyword that allows returning a value from inside a code block. It’s virtually a return that works from inside a case block and sets that value as a result of its switch. It can also accept an expression instead of a single value. Let’s take a look at an example:

DayOfWeek dayOfWeek = LocalDate.now().getDayOfWeek();
boolean freeDay = switch (dayOfWeek) {
    case MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY -> {
      System.out.println("Work work work");
      yield false;
    }
    case SATURDAY, SUNDAY -> {
      System.out.println("Yey, a free day!");
      yield true;
    }
};
Instanceof pattern matching
While not a groundbreaking change, in my opinion, instanceof solves one of the more irritating problems with the Java language. Did you ever have to use such syntax?

if (obj instanceof MyObject) {
  MyObject myObject = (MyObject) obj;
  // … further logic
}
Now, you won’t have to. Java can now create a local variable inside the if, like this:

if (obj instanceof MyObject myObject) {
  // … the same logic
}
It is just one line removed, but it was a totally unnecessary line in terms of the code flow. Moreover, the declared variable can be used in the same if condition, like this:

if (obj instanceof MyObject myObject && myObject.isValid()) {
  // … the same logic
}
 

Are you looking for Java developers?
Schedule a call
Sealed classes
This is a tricky one to explain. Let’s start with this – did the “no default” warning in switch ever annoy you? You covered all the options that the domain accepted, but still, the warning was there. Sealed classes let you get rid of such a warning for the instanceof type checks.

If you have a hierarchy like this:

public abstract sealed class Animal
    permits Dog, Cat {
}
public final class Dog extends Animal {
}
public final class Cat extends Animal {
}
You will now be able to do this:

if (animal instanceof Dog d) {
    return d.woof();
} 
else if (animal instanceof Cat c) {
    return c.meow();
}
And you won’t get a warning. Well, let me rephrase that: if you get a warning with a similar sequence, that warning will be meaningful! And more information is always good.

I have mixed feelings about this change. Introducing a cyclic reference does not seem like a good practice. If I used this in my production code, I’d do my best to hide it somewhere deep and never show it to the outside world – I mean, never expose it through an API, not that I would be ashamed of using it in a valid situation.

TextBlocks
Declaring long strings does not often happen in Java programming, but when it does, it is tiresome and confusing. Java 13 came up with a fix for that, further improved in later releases. A multiline text block can now be declared as follows:

String myWallOfText = ”””
______         _   _           
| ___ \       | | (_)          
| |_/ / __ ___| |_ _ _   _ ___ 
|  __/ '__/ _ \ __| | | | / __|
| |  | | |  __/ |_| | |_| \__ \
\_|  |_|  \___|\__|_|\__,_|___/
”””
There is no need for escaping quotes or newlines. It is possible to escape a newline and keep the string a one-liner, like this:

String myPoem = ”””
Roses are red, violets are blue - \
Pretius makes the best software, that is always true
”””
Which is the equivalent of:

String myPoem = ”Roses are red, violets are blue - Pretius makes the best software, that still is true”.
Text blocks can be used to keep a reasonably readable json or xml template in your code. External files are still likely a better idea, but it’s still a nice option to do it in pure Java if necessary.

Better NullPointerExceptions
So, I had this chain of calls in my app once. And I think it may look familiar to you too:

company.getOwner().getAddress().getCity();
And I got an NPE that told me precisely in which line the null was encountered. Yes, it was that line. Without a debugger I couldn’t tell which object was null, or rather, which invoke operation has actually caused the problem. Now the message will be specific and it’ll tell us that the JVM “cannot invoke Person.getAddress()”. 

Actually, this is more of a JVM change than a Java one – as the bytecode analysis to build the detailed message is performed at runtime JVM – but it does appeal to programmers a lot.

New HttpClient
There are many libraries that do the same thing, but it is nice to have a proper HTTP client in Java itself. You can find a nice introduction to the new APIs in Baeldung.

New Optional.orElseThrow() method
A get() method on Optional is used to get the value under the Optional. If there is no value, this method throws an exception. Like in the code below.

MyObject myObject = myList.stream()
  .filter(MyObject::someBoolean)
  .filter((b) -> false)
  .findFirst()
  .get();
Java 10 introduced a new method in Optional, called orElseThrow(). What does it do? Exactly the same! But consider the readability change for the programmer.

MyObject myObject = myList.stream()
  .filter(MyObject::someBoolean)
  .filter((b) -> false)
  .findFirst()
  .orElseThrow();
Now, the programmer knows exactly what will happen when the object is not found. In fact, using this method is recommended instead of the simple – albeit ubiquitous – get().

Other small but nice API changes
Talk is cheap, this is the code. In bold are the new things.

// invert a Predicate, will be even shorter with static import
collection.stream()
  .filter(Predicate.not(MyObject::isEmpty))
  .collect(Collectors.toList());
// String got some new stuff too
“\nPretius\n rules\n  all!”.repeat(10).lines().
  .filter(Predictions.not(String::isBlank))
  .map(String::strip)
  .map(s -> s.indent(2))
  .collect(Collectors.toList());
// no need to have an instance of array passed as an argument
String[] myArray= aList.toArray(String[]::new);
// read and write to files quickly!
// remember to catch all the possible exceptions though
Path path = Files.writeString(myFile, "Pretius Rules All !");
String fileContent = Files.readString(path);
// .toList() on a stream()
String[] arr={"a", "b", "c"};
var list = Arrays.stream(arr).toList();
JVM 17 vs JVM 8 changes
Project Jigsaw
A screen showing a jigsaw puzzle.
Project Jigsaw turned some things on their heads, but now everything works well.
JDK 9’s Project Jigsaw significantly altered the internals of JVM. It changed both JLS and JVMS, added several JEPs (list available in the Project Jigsaw link above), and, most importantly, introduced some breaking changes, alterations that were incompatible with previous Java versions.

Java 9 modules were introduced, as an additional, highest level of jar and class organization. There’s lots of introductory content on this topic, like this one on Baeldung or these slides from Yuichi Sakuraba. 

The gains were significant, though not visible to the naked eye. So-called JAR hell is no more (have you been there? I was… and it was really a hell), though a module hell is now a possibility.

From the point of view of a typical programmer, these changes are now almost invisible. Only the biggest and the most complex projects may somehow be impacted. New versions of virtually all commonly used libraries adhere to the new rules and take them into account internally.

Garbage Collectors
As of Java 9, the G1 is the default garbage collector. It reduces the pause times in comparison with the Parallel GC, though it may have lower throughput overall. It has undergone some changes since it was made default, including the ability to return unused committed memory to the OS (JEP 346).

A ZGC garbage collector has been introduced in Java 11 and has reached product state in Java 15 (JEP 377). It aims to reduce the pauses even further. As of Java 13, it’s also capable of returning unused committed memory to the OS (JEP 351).

A Shenandoah GC has been introduced in JDK 14 and has reached product state in Java 15 (JEP 379). It aims to keep the pause times low and independent of the heap size.

Note that in Java 8 you had much fewer options, and if you did not change your GC manually, you still used the Parallel GC. Simply switching to Java 17 may cause your application to work faster and have more consistent method run times. Switching to, then unavailable, ZGC or Shenandoah may give even better results.

Finally, there’s a new No-Op Garbage Collector available (JEP 318), though it’s an experimental feature. This garbage collector does not actually do any work – thus allowing you to precisely measure your application’s memory usage. Useful, if you want to keep your memory operations throughput as low as possible.

If you want to learn more about available options, I recommend reading a great series of articles by Marko Topolnik that compares the GCs. 

Container awareness
In case you didn’t know, there was a time that Java was unaware that it was running in a container. It didn’t take into account the memory restrictions of a container and read available system memory instead. So, when you had a machine with 16 GB of RAM, set your container’s max memory to 1 GB, and had a Java application running on it, then often the application would fail as it would try to allocate more memory than was available on the container. A nice article from Carlos Sanchez explains this in more detail.

These problems are in the past now. As of Java 10, the container integration is enabled by default. However, this may not be a noticeable improvement for you, as the same change was introduced in Java 8 update 131, though it required enabling experimental options and using -XX:+UseCGroupMemoryLimitForHeap. 

PS: It’s often a good idea to specify the max memory for Java using an -Xmx parameter. The problem does not appear in such cases.

CDS Archives
In an effort to make the JVM start faster, the CDS Archives have undergone some changes in the time that passed since the Java 8 release. Starting from JDK 12, creating CDS Archives during the build process is enabled by default (JEP 341). An enhancement in JDK 13 (JEP 350) allowed the archives to be updated after each application run.

A great article from Nicolai Parlog demonstrates how to use this feature to improve startup time for your application.

Java Flight Recorder and Java Mission Control
Java Flight Recorder (JEP 328) allows monitoring and profiling of a running Java application at a low (target 1%) performance cost. Java Mission Control allows ingesting and visualizing JFR data. See Baeldung’s tutorial to get a general idea of how to use it and what one can get from it. 

Should you migrate from Java 8 to Java 17?
To keep it short: yes, you should. If you have a large, high-load enterprise application and still use Java 8, you will definitely see better performance, faster startup time, lower memory footprint after migrating. Programmers working on that application should also be happier, as there are many improvements to the language itself.

The cost of doing so, however, is difficult to estimate and varies greatly depending on used application servers, libraries, and the complexity of the application itself (or rather the number of low-level features it uses/reimplements).

If your applications are microservices, it’s likely that all you will need to do is to change the base docker image to 17-alpine, code version in maven to 17, and everything will work just fine. Some frameworks or library updates may come in handy (but you’re doing them periodically anyway, right?).

All popular servers and frameworks have the Java 9’s Jigsaw Project support by now. It’s production-grade, it has been heavily tested, and bugfixed over the years. Many products offer migration guides or at least extensive release notes for the Java 9-compatible version. See a nice article from OSGI or some release notes for Wildfly 15 mentioning modules support.

If you use Spring Boot as your framework, there are some articles available with migration tips, like this one in the spring-boot wiki, this one on Baeldung, and yet another one on DZone. There’s also an interesting case study from infoq. Migrating Spring Boot 1 to Spring Boot 2 is a different topic, it might be worth considering too. There’s a tutorial from Spring Boot itself, and an article on Baeldung covering this topic.

If your application didn’t have custom classloaders, didn’t heavily rely on Unsafe, lots of sun.misc or sun.security usages – you’re likely to be fine. Consult this article from JDEP on Java Dependency Analysis Tool, for some changes you may have to make.

Some things were removed from Java since version 8, including Nashorn JS Engine, Pack200 APIs and Tools, Solaris/Sparc ports, AOT and JIT compilers, Java EE, and Corba modules. Some things still remain but are deprecated for removal, like Applet API or Security Manager. And since there are good reasons for their removal, you should reconsider their use in your application anyway.

I asked our Project technical Leaders at Pretius about their experiences with Java 8 to Java 9+ migrations. There were several examples and none were problematic. Here, a library did not work and had to be updated;, there, some additional library or configuration was required but overall, it wasn’t a bad experience at all.

Conclusion
Java 17 LTS is out now, and it’s going to be supported for years to come. On the other hand, Java 8’s support is going to run out in just a few months. It’s certainly a solid reason to consider moving to the newest version of Java. In this article, I covered the most important language and JVM changes between versions 8 and 17 (including some information about the Java 8 to Java 9+ migration process), so that it’s easier to understand the differences between them – as well as to assess the risks and gains of migration.

If you happen to be a decision maker in your company, the question to ask yourself is this: will there ever be “a good time” to leave Java 8 behind? Some money will always have to be spent, some time will always have to be consumed and the risk of some additional work that needs to be done will always exist. If there’s never “a good time”, this particular window – the few months between Java 17 release and Java 8 losing Premier Support – is likely the best there’s ever going to be.
            14.17.1.2

        14.17.2
```

## 14.18 Java version 18

## 14.19 Java version 19

## 14.20 Java version 20

## 14.21 Java version 21

## 14.22 Java version 22

## 14.23 Java version 23

## 14.24 Java version 24

## 14.25 Java version 25

## 14.26 Java version 26

## 14.27 Java version 27

## 14.28 Java version 28

## 14.29 Java version 29

## 14.30 Java version 30

## 14.31 Java version 31

## 14.32 Java version 32

## 14.33 Java version 33

## 14.34 Java version 34

## 14.35 Java version 35

## 14.36 Java version 36

## 14.37 Java version 37

## 14.38 Java version 38

## 14.39 Java version 39

## 14.40 Java version 40

## 14.41 Java version 41
