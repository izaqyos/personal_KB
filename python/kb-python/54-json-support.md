---
type: reference
title: JSON support
description: Section 48 of the legacy KB_python notes.
tags: [kb-python]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "python/KB_python#48"
---

# JSON support

[↑ KB_python](/python/kb-python/README.md)

## 48.1 Validate JSON one liner

```text
$ cat  examples/designtime/3.0/site-default-entities/role.everyone.json | python -c "import sys,json;json.loads(sys.stdin.read());print 'OK'"

redirect to python -m json.tool
```

## 48.2 python jwt decoder

```text
https://pyjwt.readthedocs.io/en/latest/



 pip3 install pyjwt          
Collecting pyjwt
  Downloading https://files.pythonhosted.org/packages/87/8b/6a9f14b5f781697e51259d81657e6048fd31a113229cf346880bb7545565/PyJWT-1.7.1-py2.py3-none-any.whl
Installing collected packages: pyjwt
Successfully installed pyjwt-1.7.1

<internal-path>  printClientToken ✗                                                                             67d ⚑ ◒  
▶ pyjwt decode --no-verify 

$ pip install pyjwt
See Installation for more information.
Example Usage¶
>>> import jwt

>>> encoded_jwt = jwt.encode({'some': 'payload'}, 'secret', algorithm='HS256')
>>> encoded_jwt
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzb21lIjoicGF5bG9hZCJ9.4twFt5NiznN84AWoo1d7KO1T_yoc0Z6XOpOVswacPZg'

>>> jwt.decode(encoded_jwt, 'secret', algorithms=['HS256'])
{'some': 'payload'}
See Usage Examples for more examples.
Command line¶
Usage:
pyjwt [options] INPUT
Decoding examples:
pyjwt --key=secret decode TOKEN
pyjwt decode --no-verify TOKEN
```

### 48.2.1 my usage examples

```text
 pyjwt decode --no-verify <token> | python -m json.tool
 pyjwt decode --no-verify <redacted-jwt> | python -m json.tool

Or use printJwt alias
__printJWT__(){
     pyjwt decode --no-verify $1 | python -m json.tool
}
alias printJWT='__printJWT__'


        48.2.2
```

## 48.3 tutorials

### 48.3.1 https://realpython.com/python-json/#a-very-brief-history-of-json

#### 48.3.1.1 introduction

```text
Since its inception, JSON has quickly become the de facto standard for information exchange. Chances are you’re here because you need to transport some data from here to there. Perhaps you’re gathering information through an API or storing your data in a document database. One way or another, you’re up to your neck in JSON, and you’ve got to Python your way out.

Luckily, this is a pretty common task, and—as with most common tasks—Python makes it almost disgustingly easy. Have no fear, fellow Pythoneers and Pythonistas. This one’s gonna be a breeze!

So, we use JSON to store and exchange data? Yup, you got it! It’s nothing more than a standardized format the community uses to pass data around. Keep in mind, JSON isn’t the only format available for this kind of work, but XML and YAML are probably the only other ones worth mentioning in the same breath.


A (Very) Brief History of JSON
Not so surprisingly, JavaScript Object Notation was inspired by a subset of the JavaScript programming language dealing with object literal syntax. They’ve got a nifty website that explains the whole thing. Don’t worry though: JSON has long since become language agnostic and exists as its own standard, so we can thankfully avoid JavaScript for the sake of this discussion.

Ultimately, the community at large adopted JSON because it’s easy for both humans and machines to create and understand.


Look, it’s JSON!
Get ready. I’m about to show you some real life JSON—just like you’d see out there in the wild. It’s okay: JSON is supposed to be readable by anyone who’s used a C-style language, and Python is a C-style language…so that’s you!

{
    "firstName": "Jane",
    "lastName": "Doe",
    "hobbies": ["running", "sky diving", "singing"],
    "age": 35,
    "children": [
        {
            "firstName": "Alice",
            "age": 6
        },
        {
            "firstName": "Bob",
            "age": 8
        }
    ]
}
As you can see, JSON supports primitive types, like strings and numbers, as well as nested lists and objects.

Wait, that looks like a Python dictionary! I know, right? It’s pretty much universal object notation at this point, but I don’t think UON rolls off the tongue quite as nicely. Feel free to discuss alternatives in the comments.

Whew! You survived your first encounter with some wild JSON. Now you just need to learn how to tame it.

Python Supports JSON Natively!
Python comes with a built-in package called json for encoding and decoding JSON data.

Just throw this little guy up at the top of your file:

import json
A Little Vocabulary
The process of encoding JSON is usually called serialization. This term refers to the transformation of data into a series of bytes (hence serial) to be stored or transmitted across a network. You may also hear the term marshaling, but that’s a whole other discussion. Naturally, deserialization is the reciprocal process of decoding data that has been stored or delivered in the JSON standard.

Yikes! That sounds pretty technical. Definitely. But in reality, all we’re talking about here is reading and writing. Think of it like this: encoding is for writing data to disk, while decoding is for reading data into memory.
```

#### 48.3.1.2 Serializing JSON

```text
What happens after a computer processes lots of information? It needs to take a data dump. Accordingly, the json library exposes the dump() method for writing data to files. There is also a dumps() method (pronounced as “dump-s”) for writing to a Python string.

Simple Python objects are translated to JSON according to a fairly intuitive conversion.

Python	JSON
dict	object
list, tuple	array
str	string
int, long, float	number
True	true
False	false
None	null

ex:
$ cat json101_serialize1.py 
import json 

def main():
    json_data_str = '{"id": "foo", "age": 45, "city": "hadera"}'
    json_data = json.loads(json_data_str)
    with open("out.json", "w") as out:
        json.dump(json_data, out)
    with open("out_indent.json", "w") as out_indent:
        json.dump(json_data,out_indent, indent=4 )

if __name__ == "__main__":
    main()
$ py3 json101_serialize1.py 
$ cat out.json 
{"id": "foo", "age": 45, "city": "hadera"}$ cat out_indent.json 
{
    "id": "foo",
    "age": 45,
    "city": "hadera"
}
```

### 48.3.2 deserialization

```text
$ cat !$
cat json101_deserialize1.py
import json 

def main():
    json_data_str = '{"id": "foo", "age": 45, "city": "hadera"}'
    with open("out.json", "r") as infile:
        json_data=json.load(infile)
    print(f"read json from file: {json_data}")
    json_data_assert = json.loads(json_data_str)
    assert(json_data_assert == json_data)

if __name__ == "__main__":
    main()
$ py3 json101_deserialize1.py 
read json from file: {'id': 'foo', 'age': 45, 'city': 'hadera'}

        48.3.3
    48.4
```
