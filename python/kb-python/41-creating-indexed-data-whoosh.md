---
type: reference
title: "Creating Indexed Data: Whoosh"
description: Section 1 of the legacy KB_python notes.
tags: [kb-python]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "python/KB_python#1"
---

# Creating Indexed Data: Whoosh

[↑ KB_python](/python/kb-python/README.md)

```text
It is easy to index all your text files with Whoosh. Initially, the schema of the index has to be defined. Schema defines list of fields to be indexed or stored for each text file. It’s similar to how we define it for database. A field is a piece of information for each document in the index, such as its title or text content. Indexing of a field means it can be searched and it is also returned with results if defined as argument (stored=True) in schema. You only need to create the schema once while creating the index.

Finally, all the text documents are added to index writer in loop. Documents are indexed as per schema and has to be added as per schema design. Below is the python implementation for indexing  all the text documents of a directory.

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
import os
from whoosh.index import create_in
from whoosh.fields import Schema, TEXT, ID
import sys
 
def createSearchableData(root):   
 
    '''
    Schema definition: title(name of file), path(as ID), content(indexed
    but not stored),textdata (stored text content)
    '''
    schema = Schema(title=TEXT(stored=True),path=ID(stored=True),\
              content=TEXT,textdata=TEXT(stored=True))
    if not os.path.exists("indexdir"):
        os.mkdir("indexdir")
 
    # Creating a index writer to add document as per schema
    ix = create_in("indexdir",schema)
    writer = ix.writer()
 
    filepaths = [os.path.join(root,i) for i in os.listdir(root)]
    for path in filepaths:
        fp = open(path,'r')
        print(path)
        text = fp.read()
        writer.add_document(title=path.split("\\")[1], path=path,\
          content=text,textdata=text)
        fp.close()
    writer.commit()
 
root = "corpus"
createSearchableData(root)
```
