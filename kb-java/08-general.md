---
type: reference
title: general
description: "Java general tips: manipulating jar files and remote debugging."
tags: [java, debugging, tips, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "java-kb#2"
---

# general

[↑ java-kb](/kb-java/README.md)

## 2.1. manipulate jar files.

```text
	help:
	$jar 

	list files in archive
	$jar -tvf <file>.jar
	
	searh for a specific class (in sh, bash ...)
	$for jar in *.jar;  do echo  $jar; jar tvf $jar | grep <class>; done
```

## 2.2. remote debug java application.

```text
first run jvm (java) with extra flags to open listen socket:
-Xdebug -Xnoagent -Djava.compiler=none -Xrunjdwp:transport=dt_socket,server=y,suspend=y

then connect via
jdb -connect com.sun.jdi.SocketAttach:hostname=localhost,port=XXXX

In case of C++ application with java parts, make sure the C++ app is running after socket is opened (like press enter in prompt).

For Eclipse connect to the port then switch to debug prespective.
Also make sure the code is compiled with debug flag:
 -g or for ant set <property name="javac.debug" value="on" /> and in the <javac> command add
  debug="on" property.
```

## 2.3. deploy JSP pages to web container.

```text
deploy war file reccomended but can deploy the whole dir instead.
project dir must contain WEB-INF,  WEB-INF/lib, WEB-INF/classes libs.
To include classes use the <import> directive.
If needed edit web server configuration to specify needed classpath ( for TOMCAT, config/web.xml, classpath).
x
```

## 2.4. Tomcat

````text
	1. listen port and shutdown port are defined in server.xml. 

    2.5.  Reverse engineer.
	$ use javap -c (that comes with java installation)
	$ also eclispse will do that.
	$ there are commercial tools. like DJ java. 

    2.6 Set java version, toggle java versions, switch jdk versions 

        2.6.1 mac, OS X
TLDR, use my aliases
$ java_versions 
Matching Java Virtual Machines (4):
    14.0.2, x86_64:	"OpenJDK 14.0.2"	/Library/Java/JavaVirtualMachines/openjdk-14.0.2.jdk/Contents/Home
    10.0.2, x86_64:	"Java SE 10.0.2"	/Library/Java/JavaVirtualMachines/jdk-10.0.2.jdk/Contents/Home
    1.8.0_265, x86_64:	"AdoptOpenJDK 8"	/Library/Java/JavaVirtualMachines/adoptopenjdk-8.jdk/Contents/Home
    1.8.0_241, x86_64:	"Java SE 8"	/Library/Java/JavaVirtualMachines/jdk1.8.0_241.jdk/Contents/Home

/Library/Java/JavaVirtualMachines/openjdk-14.0.2.jdk/Contents/Home
$ java_set1_8 
$ echo $JAVA_HOME 
/Library/Java/JavaVirtualMachines/adoptopenjdk-8.jdk/Contents/Home

long read:

Setting v 1.8 on my Mac:
$ /usr/libexec/java_home -V
Matching Java Virtual Machines (4):
    13.0.1, x86_64:	"OpenJDK 13.0.1"	/Library/Java/JavaVirtualMachines/openjdk-13.0.1.jdk/Contents/Home
    10.0.2, x86_64:	"Java SE 10.0.2"	/Library/Java/JavaVirtualMachines/jdk-10.0.2.jdk/Contents/Home
    1.8.0_241, x86_64:	"Java SE 8"	/Library/Java/JavaVirtualMachines/jdk1.8.0_241.jdk/Contents/Home
    1.8.0_232, x86_64:	"AdoptOpenJDK 8"	/Library/Java/JavaVirtualMachines/adoptopenjdk-8.jdk/Contents/Home

/Library/Java/JavaVirtualMachines/openjdk-13.0.1.jdk/Contents/Home
$ export JAVA_HOME=`/usr/libexec/java_home -v 1.8.0_232`


https://stackoverflow.com/questions/21964709/how-to-set-or-change-the-default-java-jdk-version-on-os-x

| First run /usr/libexec/java_home -V which will output something like the following:
| Matching Java Virtual Machines (3):
| 1.8.0_05, x86_64:   "Java SE 8" /Library/Java/JavaVirtualMachines/jdk1.8.0_05.jdk/Contents/Home
| 1.6.0_65-b14-462, x86_64:   "Java SE 6" /System/Library/Java/JavaVirtualMachines/1.6.0.jdk/Contents/Home
| 1.6.0_65-b14-462, i386: "Java SE 6" /System/Library/Java/JavaVirtualMachines/1.6.0.jdk/Contents/Home

/Library/Java/JavaVirtualMachines/jdk1.8.0_05.jdk/Contents/Home
Pick the version you want to be the default (1.6.0_65-b14-462 for arguments sake) then:
export JAVA_HOME=`/usr/libexec/java_home -v 1.6.0_65-b14-462`
or you can specify just the major version, like:
export JAVA_HOME=`/usr/libexec/java_home -v 1.8`
Now when you run java -version you will see:
java version "1.6.0_65"
Java(TM) SE Runtime Environment (build 1.6.0_65-b14-462-11M4609)
Java HotSpot(TM) 64-Bit Server VM (build 20.65-b04-462, mixed mode)
Add the export JAVA_HOME… line to your shell’s init file.
For Bash (as stated by antonyh):
export JAVA_HOME=$(/usr/libexec/java_home -v 1.8)
    
    2.7 chatgpt

        2.7.1 java set data structure, tags: java set data structure
In Java, the `Set` data structure is part of the Java Collections Framework and is used to store a collection of unique elements. It does not allow duplicate elements, and it does not guarantee the order of elements.

There are several classes in Java that implement the `Set` interface. Some commonly used implementations include:

|  1. `HashSet`: This implementation uses a hash table to store the elements. It provides constant-time performance for basic operations like add, remove, and contains, assuming a good hash function is used for the objects being stored.
|  
|  2. `TreeSet`: This implementation stores elements in a sorted tree structure. It maintains the elements in ascending order or according to a custom `Comparator` provided during creation. The add, remove, and contains operations have a time complexity of O(log n).
|  
|  3. `LinkedHashSet`: This implementation maintains a doubly-linked list of the elements in addition to using a hash table. It guarantees that the elements will be iterated in the order they were inserted. The time complexity for basic operations is similar to `HashSet`.
|  
|  Here's an example that demonstrates how to use the `HashSet` class:
|  
|  ```java
|  import java.util.HashSet;
|  import java.util.Set;
|  
|  public class SetExample {
|      public static void main(String[] args) {
|          Set<String> set = new HashSet<>();
|  
|          // Adding elements to the set
|          set.add("apple");
|          set.add("banana");
|          set.add("orange");
|  
|          // Adding a duplicate element (it will be ignored)
|          set.add("apple");
|  
|          // Printing the set
|          System.out.println(set); // Output: [orange, banana, apple]
|  
|          // Checking if an element exists in the set
|          boolean containsOrange = set.contains("orange");
|          System.out.println(containsOrange); // Output: true
|  
|          // Removing an element from the set
|          set.remove("banana");
|  
|          // Printing the set after removal
|          System.out.println(set); // Output: [orange, apple]
|  
|          // Getting the size of the set
|          int size = set.size();
|          System.out.println(size); // Output: 2
|      }
|  }
|  ```

This example demonstrates basic operations such as adding elements, checking for element existence, removing elements, and retrieving the size of the set using a `HashSet`.

        2.7.2  java Files  , tags: java Files  
In Java, the `java.nio.file.Files` class provides a set of static methods for working with files and directories. It is part of the Java NIO (New I/O) package and introduced in Java 7. The `Files` class provides various methods for common file operations such as creating, deleting, copying, moving, and reading files.

Here are some commonly used methods of the `Files` class:

| 1. `createFile(Path path, FileAttribute<?>... attrs)`: Creates a new empty file at the specified path.
| 
| 2. `createDirectory(Path dir, FileAttribute<?>... attrs)`: Creates a new directory at the specified path.
| 
| 3. `delete(Path path)`: Deletes a file or an empty directory at the specified path.
| 
| 4. `copy(Path source, Path target, CopyOption... options)`: Copies a file or a directory from the source path to the target path. The `CopyOption` parameter allows specifying options like replacing existing files or preserving file attributes.
| 
| 5. `move(Path source, Path target, CopyOption... options)`: Moves a file or a directory from the source path to the target path. This method can also be used for renaming files.
| 
| 6. `readAllLines(Path path, Charset cs)`: Reads all lines from a file and returns them as a `List` of strings.
| 
| 7. `write(Path path, byte[] bytes, OpenOption... options)`: Writes the specified byte array to a file.
| 
| 8. `isDirectory(Path path)`: Checks if the specified path represents a directory.
| 
| 9. `isRegularFile(Path path, LinkOption... options)`: Checks if the specified path represents a regular file.

These are just a few examples of the methods provided by the `Files` class. There are more methods available for various file operations. To use these methods, you need to import the `java.nio.file.Files` class and work with `java.nio.file.Path` objects to represent file and directory paths.

Here's an example that demonstrates the usage of some `Files` methods:

```java
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.charset.StandardCharsets;
import java.io.IOException;
import java.util.List;

public class FilesExample {
    public static void main(String[] args) {
        try {
            // Creating a new directory
            Path directoryPath = Paths.get("mydirectory");
            Files.createDirectory(directoryPath);

            // Creating a new file
            Path filePath = Paths.get("mydirectory/myfile.txt");
            Files.createFile(filePath);

            // Writing content to the file
            String content = "Hello, World!";
            Files.write(filePath, content.getBytes(StandardCharsets.UTF_8));

            // Reading all lines from the file
            List<String> lines = Files.readAllLines(filePath, StandardCharsets.UTF_8);
            for (String line : lines) {
                System.out.println(line);
            }

            // Deleting the file
            Files.delete(filePath);

            // Deleting the directory
            Files.delete(directoryPath);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

In this example, we create a directory called "mydirectory," create a file called "myfile.txt" inside the directory, write some content to the file, read the content back, and finally delete the file and directory.

        2.7.3 java Objects.requireNonNull , tags: java Objects.requireNonNull 
In Java, `Objects.requireNonNull` is a utility method provided by the `java.util.Objects` class. It is commonly used to check if an object reference is null and throw a `NullPointerException` if it is.

The `requireNonNull` method has the following signature:

```java
public static <T> T requireNonNull(T obj)
```

It takes an object reference `obj` as a parameter and returns the reference if it is not null. If `obj` is null, it throws a `NullPointerException`.

Here's an example to illustrate the usage of `Objects.requireNonNull`:

```java
import java.util.Objects;

public class Example {
    public static void main(String[] args) {
        String name = null;

        // Using Objects.requireNonNull to check if the reference is null
        String nonNullName = Objects.requireNonNull(name);

        System.out.println(nonNullName);
    }
}
```

In this example, the variable `name` is assigned a null value. When we pass `name` to `Objects.requireNonNull`, it will throw a `NullPointerException` because the reference is null.

If you want to provide a custom error message when a null value is encountered, you can use the overloaded version of `requireNonNull` that takes a message as the second parameter:

```java
public static <T> T requireNonNull(T obj, String message)
```

Here's an example using the overloaded `requireNonNull` method:

```java
import java.util.Objects;

public class Example {
    public static void main(String[] args) {
        String name = null;

        try {
            String nonNullName = Objects.requireNonNull(name, "Name cannot be null");
            System.out.println(nonNullName);
        } catch (NullPointerException e) {
            System.out.println(e.getMessage()); // Output: Name cannot be null
        }
    }
}
```

In this example, we pass the custom error message "Name cannot be null" as the second argument to `requireNonNull`. If the reference is null, it will throw a `NullPointerException` with the specified message.

        2.7.4 java File.toPath() , tags: java File.toPath() 
In Java, the `File` class represents a file or directory on the file system. Starting from Java 7, the `File` class has a method called `toPath()` which returns a `java.nio.file.Path` object representing the abstract path of the `File`.

The `toPath()` method has the following signature:

```java
public Path toPath()
```

Here's an example that demonstrates the usage of `toPath()`:

```java
import java.io.File;
import java.nio.file.Path;

public class Example {
    public static void main(String[] args) {
        File file = new File("path/to/file.txt");

        // Converting File to Path
        Path path = file.toPath();

        // Printing the Path
        System.out.println(path);
    }
}
```

In this example, we create a `File` object representing a file path "path/to/file.txt". We then call the `toPath()` method on the `File` object to convert it to a `Path` object. Finally, we print the `Path` object.

Note that `toPath()` is available starting from Java 7. If you are using an older version of Java, you can still convert a `File` to a `Path` by using the `Paths.get(String)` method, as shown below:

```java
import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;

public class Example {
    public static void main(String[] args) {
        File file = new File("path/to/file.txt");

        // Converting File to Path
        Path path = Paths.get(file.getPath());

        // Printing the Path
        System.out.println(path);
    }
}
```

In this example, we use the `Paths.get(String)` method and pass the file's path obtained from `file.getPath()` to convert the `File` object to a `Path`.

        2.7.5 java use class loader to read a file that contains a sql statement and then run it on a PG DB , tags: java use class loader to read a file that contains a sql statement and then run it on a PG DB 
To read a file containing an SQL statement using a class loader and execute it on a PostgreSQL database in Java, you can follow these steps:

| 1. Place the SQL file in the appropriate location within your project's resources. For example, you can create a folder called `sql` in the `src/main/resources` directory and place the SQL file there.
| 
| 2. Use the class loader to read the file as an input stream. Here's an example:

```java
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class SQLRunner {
    public static void main(String[] args) {
        // Load the SQL file using the class loader
        InputStream inputStream = SQLRunner.class.getClassLoader().getResourceAsStream("sql/myquery.sql");

        if (inputStream != null) {
            try {
                // Read the SQL file content as a string
                String sql = new String(inputStream.readAllBytes(), StandardCharsets.UTF_8);

                // Establish a connection to the PostgreSQL database
                Connection connection = DriverManager.getConnection("jdbc:postgresql://localhost:5432/mydb", "username", "password");

                // Create a statement
                Statement statement = connection.createStatement();

                // Execute the SQL statement
                statement.executeUpdate(sql);

                // Close the statement and connection
                statement.close();
                connection.close();

                System.out.println("SQL statement executed successfully.");
            } catch (IOException | SQLException e) {
                e.printStackTrace();
            }
        } else {
            System.out.println("SQL file not found.");
        }
    }
}
```

In this example, the SQL file `myquery.sql` is located in the `sql` folder under `src/main/resources`. The class loader is used to read the file as an input stream. The content of the SQL file is then converted to a string.

Next, a connection is established to the PostgreSQL database using the appropriate JDBC URL, username, and password. A `Statement` object is created from the connection, and the SQL statement is executed using `statement.executeUpdate(sql)`.

Finally, the statement and connection are closed, and a message is printed indicating the successful execution of the SQL statement.

Make sure to replace the JDBC URL, username, and password with the appropriate values for your PostgreSQL database.



        2.7.6 java org.stringtemplate.v4.ST , tags: java org.stringtemplate.v4.ST 
The `org.stringtemplate.v4.ST` class is part of the StringTemplate library, which is a powerful template engine for generating text-based output such as code, HTML, XML, etc., from templates. StringTemplate is available for Java and several other programming languages.

The `ST` class represents a single template and provides methods for setting template attributes, rendering the template, and retrieving the generated output. It allows you to dynamically populate placeholders in the template with values.

Here's an example that demonstrates the basic usage of `ST`:

```java
import org.stringtemplate.v4.ST;

public class STExample {
    public static void main(String[] args) {
        // Create a template with a placeholder
        ST template = new ST("Hello, <name>!");

        // Set the value for the placeholder
        template.add("name", "John");

        // Render the template and get the output
        String output = template.render();

        // Print the generated output
        System.out.println(output);
    }
}
```

In this example, we create an `ST` object with the template "Hello, \<name>!". The `<name>` part is a placeholder that will be dynamically replaced with a value. We set the value for the "name" placeholder using `template.add("name", "John")`. Finally, we call `template.render()` to generate the output, which is then printed to the console.

StringTemplate supports more advanced features like conditionals, loops, and template inheritance. You can define templates with more complex structures and use them to generate dynamic text output.

To use StringTemplate in your project, you need to include the StringTemplate library in your project dependencies. You can find the StringTemplate library and its documentation on the official website: http://www.stringtemplate.org/

        2.7.7 java StringBuilder, tags: java StringBuilder
In Java, `StringBuilder` is a class that provides a mutable sequence of characters. It is commonly used when you need to efficiently build or manipulate strings that can change frequently, especially when concatenating multiple strings or performing frequent modifications.

Here's an example of how to use `StringBuilder` in Java:

```java
StringBuilder sb = new StringBuilder();

// Appending strings
sb.append("Hello");
sb.append(" ");
sb.append("World");

// Inserting strings at a specific position
sb.insert(5, ","); // Output: Hello, World

// Replacing a portion of the string
sb.replace(7, 12, "There"); // Output: Hello, There

// Deleting characters from the string
sb.delete(5, 7); // Output: Hello There

// Getting the final string
String result = sb.toString();
System.out.println(result); // Output: Hello There
```

In this example, we create a `StringBuilder` object named `sb`. We then use various methods of the `StringBuilder` class to append, insert, replace, and delete characters or portions of the string. Finally, we convert the `StringBuilder` object to a regular `String` using the `toString()` method and store it in the `result` variable. The resulting string is then printed to the console.

`StringBuilder` provides efficient string manipulation operations because it internally maintains a mutable character array. This avoids unnecessary memory allocations and copying when performing concatenation or modifications. It is generally preferred over `String` concatenation using the `+` operator when you need to build or modify strings dynamically.

Note: `StringBuilder` is not thread-safe. If you require thread safety, you can use the `StringBuffer` class, which provides similar functionality but with thread-safe operations.


        2.7.8 java jackson @JsonCreator annotation, tags: java jackson @JsonCreator annotation
In Java with Jackson, the `@JsonCreator` annotation is used to mark a constructor or a static factory method as a creator for deserialization. It is used to specify how Jackson should create an instance of a class when deserializing JSON into Java objects.

Here's how the `@JsonCreator` annotation can be used:

|  1. Constructor-based deserialization:
|  ```java
|  public class MyClass {
|      private String property;
|  
|      @JsonCreator
|      public MyClass(@JsonProperty("property") String property) {
|          this.property = property;
|      }
|  }
|  ```
|  In this example, the `@JsonCreator` annotation is applied to the constructor of the `MyClass` class. It indicates that this constructor should be used during deserialization. The `@JsonProperty("property")` annotation is used to map the JSON property named "property" to the corresponding constructor parameter.
|  
|  2. Static factory method-based deserialization:
|  ```java
|  public class MyClass {
|      private String property;
|  
|      private MyClass(String property) {
|          this.property = property;
|      }
|  
|      @JsonCreator
|      public static MyClass createInstance(@JsonProperty("property") String property) {
|          return new MyClass(property);
|      }
|  }
|  ```
In this example, the `@JsonCreator` annotation is applied to a static factory method `createInstance()`. It specifies that this method should be used for deserialization. The `@JsonProperty("property")` annotation is used to map the JSON property named "property" to the corresponding method parameter.

Both approaches allow Jackson to create instances of the annotated class during deserialization by matching the JSON properties with the constructor parameters or factory method arguments based on their names.

The `@JsonCreator` annotation provides flexibility in deserialization, allowing you to customize how JSON data is converted into Java objects.

        2.7.9 how to read an array property into a List<String> in a @JsonCreator annotated class constructor, tags: how to read an array property into a List<String> in a @JsonCreator annotated class constructor
To read an array property into a `List<String>` in a `@JsonCreator` annotated class constructor, you can use the `@JsonProperty` annotation along with the `List` type.

Here's an example:

```java
public class MyClass {
    private List<String> values;

    @JsonCreator
    public MyClass(@JsonProperty("values") List<String> values) {
        this.values = values;
    }

    // Getter and Setter for values
}
```

In this example, the `MyClass` constructor is annotated with `@JsonCreator`, indicating that it should be used for deserialization. The `@JsonProperty("values")` annotation is applied to the constructor parameter `values`, specifying that the JSON property with the name "values" should be mapped to this parameter.

During deserialization, Jackson will automatically convert the JSON array property named "values" into a `List<String>` and pass it to the constructor.

Here's an example JSON that can be deserialized using the `MyClass` constructor:

```json
{
  "values": ["value1", "value2", "value3"]
}
```

When you deserialize this JSON using Jackson, the `values` property will be mapped to a `List<String>` in the `MyClass` instance, with each element of the JSON array becoming an element in the list.

Remember to include the necessary Jackson dependencies in your project for JSON serialization and deserialization, such as `jackson-core`, `jackson-databind`, and `jackson-annotations`.

        2.7.10
    2.8
````
