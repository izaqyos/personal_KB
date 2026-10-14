---
type: reference
title: swig-how-to
description: "Notes on building SWIG wrappers: follow the README, set SWIG_LIB, and compile with gcc."
tags: [cpp, build, gcc, howto]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: swig-how-to
---

# swig-how-to

```text
follow readme instructions.
probably need to update SWIG_LIB to my devel dir.
gcc:
swig -java <file_name>.i 
gcc -c example.c example_wrap.c -I$JAVA_HOME/include -I$JAVA_HOME/include/solaris
ld -G example_wrap.o -o libexample.so

g++
g++ -c example.c example_wrap.cxx  -I$JAVA_HOME/include -I$JAVA_HOME/include/solaris
ld -G example.o example_wrap.o -o libexample.so
javac *.java
java main 
```
