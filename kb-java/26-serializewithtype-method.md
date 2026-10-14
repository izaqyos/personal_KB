---
type: reference
title: "**`serializeWithType` Method:**"
description: "Jackson custom serializer: the serializeWithType method."
tags: [java, json, serialization, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "java-kb#3"
---

# **`serializeWithType` Method:**

[↑ java-kb](/kb-java/README.md)

````text
   - If the serialized type information is included in the JSON output, this method is used to add that information.

   ```java
   @Override
   public void serializeWithType(T value, JsonGenerator gen, SerializerProvider provider, TypeSerializer typeSer) throws IOException {
       // Custom serialization with type information
   }
   ```

### Example:

Let's say you want to create a custom serializer for a `Person` class:

```java
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.jsontype.TypeSerializer;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import java.io.IOException;

public class PersonSerializer extends StdSerializer<Person> {

    public PersonSerializer() {
        super(Person.class);
    }

    @Override
    public void serialize(Person person, JsonGenerator gen, SerializerProvider provider) throws IOException {
        // Custom serialization logic for Person class
        gen.writeStartObject();
        gen.writeStringField("name", person.getName());
        gen.writeNumberField("age", person.getAge());
        // Add other fields as needed
        gen.writeEndObject();
    }
}
```

In this example, `PersonSerializer` extends `StdSerializer<Person>`, and the `serialize` method is overridden to provide custom serialization logic for the `Person` class. You can then register this serializer with your Jackson `ObjectMapper` to use it during serialization.

```java
ObjectMapper objectMapper = new ObjectMapper();
SimpleModule module = new SimpleModule();
module.addSerializer(Person.class, new PersonSerializer());
objectMapper.registerModule(module);

String json = objectMapper.writeValueAsString(personInstance);
```

By creating custom serializers, you can tailor the JSON representation of your objects according to your application's needs.

            16.2.4.2

        16.2.5
    16.3
````
