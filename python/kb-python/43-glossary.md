---
type: reference
title: Glossary
description: "Legacy Python KB section: Glossary (my implementation)"
tags: [glossary, python, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "python/KB_python#3"
---

# Glossary

[↑ KB_python](/python/kb-python/README.md)

```text
Below are the basic terminologies you will always come across in discussions involving searching and indexing documents (taken from whoosh docs).

Corpus
The set of documents you are indexing.

Documents
The individual pieces of content you want to make searchable. The word “documents” might imply files, but the data source could really be anything – articles in a content management system, blog posts in a blogging system, chunks of a very large file, rows returned from an SQL query, individual email messages from a mailbox file, or whatever. When you get search results from Whoosh, the results are a list of documents, whatever “documents” means in your search engine.

Fields
Each document contains a set of fields. Typical fields might be “title”, “content”, “url”, “keywords”, “status”, “date”, etc. Fields can be indexed (so they’re searchable) and/or stored with the document. Storing the field makes it available in search results. For example, you typically want to store the “title” field so your search results can display it.

Forward index
A table listing every document and the words that appear in the document. Whoosh lets you store term vectors that are a kind of forward index.

Indexing
The process of examining documents in the corpus and adding them to the reverse index.

Postings
The reverse index lists every word in the corpus, and for each word, a list of documents in which that word appears, along with some optional information (such as the number of times the word appears in that document). These items in the list, containing a document number and any extra information, are called postings. In Whoosh the information stored in postings is customizable for each field.

Reverse Index
Basically a table listing every word in the corpus, and for each word, the list of documents in which it appears. It can be more complicated (the index can also list how many times the word appears in each document, the positions at which it appears, etc.) but that’s how it basically works.

Schema
Whoosh requires that you specify the fields of the index before you begin indexing. The Schema associates field names with metadata about the field, such as the format of the postings and whether the contents of the field are stored in the index.

Term vector
A forward index for a certain field in a certain document. You can specify in the Schema that a given field should store term vectors.

At the End
Hope it was an easy read and good heads-up to start with. So, what can we do more from here:

Searching for alike documents instead of exact term searches only.
Exploring hierarchical search in file system.
Correcting errors in the queries. Did you mean…?
Search N-grams for getting fast, “search as you type” functionality
Update: Readers can download the backup of QT application built from below link. It was a old work and don’t have a working app now. You may have to figure out codes in order to reproduce it. Good luck with that.
https://drive.google.com/open?id=1skp4JM6LT7ijJ2MF0qrBHTn-GDMkC1c-

If you liked the post, follow this blog to get updates about upcoming articles. Also, share it so that it can reach out to the readers who can actually gain from this. Please feel free to discuss anything regarding the post. I would love to hear feedback from you.

Happy machine learning
```

### 40.2.2 my implementation

```text
	    40.2.3

	40.3
```
