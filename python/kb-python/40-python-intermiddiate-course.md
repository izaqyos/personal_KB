---
type: reference
title: Python Intermiddiate course
description: "Legacy Python KB section: Python Intermiddiate course (Search Engine demo, REST demo, Run)"
tags: [course-notes, python, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "python/KB_python#40"
---

# Python Intermiddiate course

[↑ KB_python](/python/kb-python/README.md)

## 40.1 Search Engine demo

### 40.1.1 DB

```text
$ pwd
/Users/<user>/Desktop/Work/code/python/python_inter_course/SearchEngine/docs
$ sqlite3 documents.sqlite3 
```

### 40.1.2 REST demo

```text
    python3 -m httpie localhost:8080/df/v1/search?word=barry&word=zip
    python3 -m httpie localhost:8080/df/v1/search?word=barry&word=zip
    python3 -m httpie 'localhost:8080/df/v1/'
    python3 -m httpie POST 'localhost:8080/df/v1/aaa'
     echo 'Mary had a little lamb' | python3 -m httpie POST 'localhost:8080/df/v1/marry'
     python3 -m httpie 'localhost:8080/df/v1/search?word=barry&word=zip'
```

### 40.1.3 Run

```text
Open pycharm
Open SearchEngine project 
Run init 1/ 1 set in main to create db
then run httpd to start web server

		40.1.4
```

## 40.2 Lucene based, whoosh local files search engine

### 40.2.1 whoosh blog

```text
Developing a fast Indexing and Full text Search Engine with Whoosh: A Pure-Python Library
 by Abhijeet Kumar  July 31, 2018  Natural Language Processing

Problem Statement: To simply put, You have 1 million text files in a directory and your application must cater text query search on all files within few seconds (say ~1-2 seconds). How will you develop such system !!.

Motivation: The idea came from my previous post “Performing OCR by running parallel instances of Tesseract 4.0 : Python“. Saying that following could be some use cases where you may have to build such search engine on top of other applications. e.g.

You have built an OCR app and converted millions of images into text files. You may want to build a search engine over converted text files to search contents of images.
You have built a speech to text system where you are converting thousands of recorded audios into text data. You may like to search contents of audio in real time.
Here is a video demonstration of an desktop app developed in QT. It is a whoosh python implementation working in back end.


Introduction: Whoosh
Some of you might have heard about a popular java based library “Lucene” which is a search engine library written entirely in Java. You may find a python wrapper for Lucene. If you are looking for similar pythonic library, “Whoosh” is the one. Whoosh is a fast, featureful full-text indexing and searching library implemented in pure Python. Programmers can use it to easily add search functionality to their applications and websites.

Whoosh pypi package can simply be installed with pip:
pip install Whoosh

For the example demonstrated in this blog-post, You can download  a data-set of 70,000 text files which were taken from simple wiki articles from here.
```
