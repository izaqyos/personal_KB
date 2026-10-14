---
type: reference
title: jackson
description: Section 16 of the legacy java-kb notes.
tags: [kb-java]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "java-kb#16"
---

# jackson

[↑ java-kb](/kb-java/README.md)

## 16.1 highlevel overview

````text
Jackson is a popular Java library for working with JSON data. It provides functionality to serialize Java objects to JSON and deserialize JSON to Java objects.

The core component of the Jackson library is the `ObjectMapper` class, which provides methods for converting between Java objects and JSON data. Here's an example of how to use `ObjectMapper` to serialize a Java object to JSON:

```java
import com.fasterxml.jackson.databind.ObjectMapper;

public class MyObject {
    private String name;
    private int age;
    
    public MyObject(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // Getters and setters
    
    public static void main(String[] args) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        MyObject obj = new MyObject("John Doe", 30);
        String json = mapper.writeValueAsString(obj);
        System.out.println(json); // {"name":"John Doe","age":30}
    }
}
```

In this example, we create a `MyObject` class with a name and age field, and then create an instance of this class with the name "John Doe" and age 30. We then create an `ObjectMapper` instance and use the `writeValueAsString()` method to serialize the `MyObject` instance to a JSON string.

Here's another example that demonstrates how to deserialize a JSON string to a Java object:

```java
import com.fasterxml.jackson.databind.ObjectMapper;

public class MyObject {
    private String name;
    private int age;
    
    public MyObject() {
        // Default constructor required for deserialization
    }
    
    // Getters and setters
    
    public static void main(String[] args) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        String json = "{\"name\":\"John Doe\",\"age\":30}";
        MyObject obj = mapper.readValue(json, MyObject.class);
        System.out.println(obj.getName()); // John Doe
        System.out.println(obj.getAge()); // 30
    }
}
```

In this example, we create a `MyObject` class with a default constructor (required for deserialization), and then create a JSON string representing a `MyObject` instance with the name "John Doe" and age 30. We then use the `readValue()` method of `ObjectMapper` to deserialize the JSON string to a `MyObject` instance.

Jackson also provides many annotations for customizing the serialization and deserialization of Java objects, such as `@JsonProperty`, `@JsonFormat`, and `@JsonIgnore`. You can find more information on how to use Jackson in the official documentation: https://github.com/FasterXML/jackson-databind.
````

## 16.2 ObjectMapper

### 16.2.1 valueToTree

````text
`ObjectMapper`'s `valueToTree` method is used to convert a Java object to a JSON tree representation. The resulting `JsonNode` object can be used to traverse and manipulate the JSON structure programmatically, which can be useful in certain scenarios.

Here's an example of using `ObjectMapper` to convert a Java object to a `JsonNode` object:

```java
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class MyObject {
    private String name;
    private int age;
    
    public MyObject(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // Getters and setters
    
    public static void main(String[] args) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        MyObject obj = new MyObject("John Doe", 30);
        JsonNode jsonNode = mapper.valueToTree(obj);
        System.out.println(jsonNode.toString()); // {"name":"John Doe","age":30}
    }
}
```

In this example, we create a `MyObject` class with a name and age field, and then create an instance of this class with the name "John Doe" and age 30. We then create an `ObjectMapper` instance and use the `valueToTree()` method to convert the `MyObject` instance to a `JsonNode` object. Finally, we print the JSON string representation of the `JsonNode` object.

The resulting `JsonNode` object can be further manipulated using the `JsonNode` API to extract or modify specific parts of the JSON structure. This can be useful when working with complex JSON structures that require programmatic manipulation.
````

### 16.2.2 JsonNode traversal

````text
Sure! Here's an example of how to traverse a `JsonNode` object using Jackson's `JsonNode` API:

```java
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonTraversalExample {
    public static void main(String[] args) throws Exception {
        String json = "{\"name\":\"John Doe\",\"age\":30,\"address\":{\"street\":\"123 Main St\",\"city\":\"Anytown\",\"state\":\"CA\",\"zip\":\"12345\"}}";
        ObjectMapper mapper = new ObjectMapper();
        JsonNode rootNode = mapper.readTree(json);
        JsonNode nameNode = rootNode.get("name");
        String name = nameNode.asText();
        System.out.println("Name: " + name); // Name: John Doe
        JsonNode ageNode = rootNode.get("age");
        int age = ageNode.asInt();
        System.out.println("Age: " + age); // Age: 30
        JsonNode addressNode = rootNode.get("address");
        String street = addressNode.get("street").asText();
        System.out.println("Street: " + street); // Street: 123 Main St
        String city = addressNode.get("city").asText();
        System.out.println("City: " + city); // City: Anytown
        String state = addressNode.get("state").asText();
        System.out.println("State: " + state); // State: CA
        String zip = addressNode.get("zip").asText();
        System.out.println("ZIP: " + zip); // ZIP: 12345
    }
}
```

In this example, we create a JSON string representing a person with a name, age, and address, and then parse it into a `JsonNode` object using `ObjectMapper`'s `readTree()` method. We then use the `get()` method of the `JsonNode` object to retrieve specific parts of the JSON structure, and use the `asText()` and `asInt()` methods to convert the values to Java strings and integers, respectively.

To traverse the nested `address` object, we first retrieve the `address` node using `get()`, and then use `get()` again to retrieve the individual fields within the `address` object.

Note that `JsonNode` also provides other methods for traversing JSON structures, such as `iterator()` and `fields()`, which can be useful in certain scenarios.
````

### 16.2.3 DFS traversal of JsonNode

````text
To perform a depth-first traversal of a `JsonNode` object using recursion, you can create a helper method that takes a `JsonNode` object as a parameter and then recursively calls itself for each child node. Here's an example:

```java
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonDfsTraversalExample {
    public static void main(String[] args) throws Exception {
        String json = "{\"name\":\"John Doe\",\"age\":30,\"address\":{\"street\":\"123 Main St\",\"city\":\"Anytown\",\"state\":\"CA\",\"zip\":\"12345\"}}";
        ObjectMapper mapper = new ObjectMapper();
        JsonNode rootNode = mapper.readTree(json);
        traverse(rootNode);
    }
    
    private static void traverse(JsonNode node) {
        if (node.isObject()) {
            System.out.println("Object: " + node);
            node.fields().forEachRemaining(entry -> traverse(entry.getValue()));
        } else if (node.isArray()) {
            System.out.println("Array: " + node);
            node.elements().forEachRemaining(JsonDfsTraversalExample::traverse);
        } else if (node.isValueNode()) {
            System.out.println("Value: " + node);
        } else if (node.isNull()) {
            System.out.println("Null: " + node);
        }
    }
}
```

In this example, we create a `traverse()` method that takes a `JsonNode` object as a parameter. If the node is an object, we print a message indicating that it's an object and then iterate over its fields using the `fields()` method, calling `traverse()` recursively for each value in the field. If the node is an array, we print a message indicating that it's an array and then iterate over its elements using the `elements()` method, again calling `traverse()` recursively for each element. If the node is a value node, we print a message indicating that it's a value node, and if it's null, we print a message indicating that it's null.

When we call the `traverse()` method on the root node of a JSON structure, it will recursively traverse the entire structure in a depth-first manner, printing out messages for each node type as it encounters them.

        16.2.4
    16.3
````
