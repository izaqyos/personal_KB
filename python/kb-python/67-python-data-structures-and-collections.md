---
type: reference
title: python data structures and collections
description: "Legacy Python KB section: python data structures and collections (named tuples)"
tags: [data-structures, python, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "python/KB_python#61"
---

# python data structures and collections, tags: python data structures and collections

[↑ KB_python](/python/kb-python/README.md)

## 61.1 named tuples

````text
Named tuples are a useful data structure in Python that provide a convenient way to define lightweight classes for storing data. They are similar to tuples, but with named fields, allowing you to access values by name rather than position.

To use named tuples in Python, you need to import the `namedtuple` function from the `collections` module. Here's an example:

```python
from collections import namedtuple

# Define a named tuple called 'Person' with fields 'name', 'age', and 'city'
Person = namedtuple('Person', ['name', 'age', 'city'])

# Create an instance of the named tuple
person1 = Person('Alice', 25, 'New York')

# Access the fields using dot notation
print(person1.name)  # Output: Alice
print(person1.age)   # Output: 25
print(person1.city)  # Output: New York

# Named tuples are immutable, just like regular tuples
# You cannot modify their fields directly, but you can create a new named tuple with updated values
person2 = person1._replace(age=30)

print(person2.name)  # Output: Alice
print(person2.age)   # Output: 30
print(person2.city)  # Output: New York
```

In the example above, we define a named tuple called 'Person' using the `namedtuple` function. The first argument is the name of the named tuple, and the second argument is a list of field names. We then create an instance of the named tuple, specifying values for each field.

You can access the fields of a named tuple using dot notation, just like accessing attributes of an object. Named tuples are immutable, so you cannot modify their fields directly. However, you can create a new named tuple with updated values using the `_replace` method, as shown in the example.

Named tuples are particularly useful when you want to store data records or define lightweight classes where you only need to store data without any additional methods. They provide a more readable and self-documenting alternative to using plain tuples or dictionaries.
    61.2
````
