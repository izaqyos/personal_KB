---
type: reference
title: strings
description: "Legacy Python KB section: strings (q. python check char is a-z)"
tags: [python, legacy, reference]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "python/KB_python#60"
---

# strings, tags: strings

[↑ KB_python](/python/kb-python/README.md)

## 60.1 q. python check char is a-z

```text
ChatGPT
In Python, you can check if a character is a lowercase alphabet (a-z) using the islower() method of the string class. Here's an example:

char = 'c'
if char.islower():
    print("The character is a lowercase alphabet.")
else:
    print("The character is not a lowercase alphabet.")
In this example, the islower() method checks if the character 'c' is a lowercase alphabet, and since it is, the output of the program will be "The character is a lowercase alphabet."

Note that the islower() method will return True for any lowercase alphabet and False for any other character, including uppercase alphabets, digits, punctuation marks, and whitespace characters. If you want to check for uppercase alphabets (A-Z), you can use the isupper() method instead.





User
alternative way
ChatGPT
Another way to check if a character is a lowercase alphabet in Python is to compare its ASCII code with the ASCII codes of lowercase alphabets. In ASCII, the lowercase alphabets 'a' to 'z' have the ASCII codes 97 to 122. Therefore, you can check if a character is a lowercase alphabet by checking if its ASCII code is between 97 and 122.

Here's an example:

char = 'c'
if ord(char) >= 97 and ord(char) <= 122:
    print("The character is a lowercase alphabet.")
else:
    print("The character is not a lowercase alphabet.")
In this example, the ord() function is used to get the ASCII code of the character 'c', which is 99. Then, the code checks if this value is between 97 and 122, which it is, so the output of the program will be "The character is a lowercase alphabet."

Note that this method can be used to check for uppercase alphabets by comparing the ASCII code with the ASCII codes of uppercase alphabets, which are 65 to 90.

    60.2
```
