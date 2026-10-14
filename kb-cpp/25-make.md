---
type: reference
title: Make
description: "Make tutorials and troubleshooting for gcc makefiles, including common makefile errors."
tags: [make, gcc, cpp, troubleshooting, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-cpp#26"
---

# Make

[↑ kb-cpp](/kb-cpp/README.md)

## 26.1 Tutorials

## 26.2 Troubleshooting

### 26.2.1 gcc makefile error: “No rule to make target …”

#### 26.2.1.1 Problem

```text
I'm trying to use GCC (linux) with a makefile to compile my project.

I get the following error which is can't seem to decipher in this context:
"No rule to make target vertex.cpp', needed by vertex.o'. Stop."

This is the makefile:

a.out: vertex.o edge.o elist.o main.o vlist.o enode.o vnode.o
    g++ vertex.o edge.o elist.o main.o vlist.o enode.o vnode.o

main.o: main.cpp main.h
    g++ -c main.cpp

vertex.o: vertex.cpp vertex.h
    g++ -c vertex.cpp

edge.o: edge.cpp edge.h
    g++ -c num.cpp

vlist.o: vlist.cpp vlist.h
    g++ -c vlist.cpp

elist.o: elist.cpp elist.h
    g++ -c elist.cpp

vnode.o: vnode.cpp vnode.h
    g++ -c vnode.cpp

enode.o: enode.cpp enode.h
    g++ -c node.cpp
```

#### 26.2.1.2 Solutions

```text
That's usually because you don't have a file called vertex.cpp available to make. Check that:

that file exists.
you're in the right directory when you make.
Other than that, I've not much else to suggest. Perhaps you could give us a directory listing of that directory.

-------------------------------------------------------
The more common reason for this message to be printed is because you forgot to include the directory in which the source file resides. As a result, gcc "thinks" this file does not exist.

You can add the directory using the -I argument to gcc.
-------------------------------------------------------
-------------------------------------------------------
			26.2.1.3
		26.2.2
```

## 26.3 Sergey's example

```text
c:\work\code\CPP\make\example\Makefile 
```

### 26.3.1 c:\work\code\CPP\make\example\Makefile

```text
SUBDIRS = main static dynamic

.PHONY: all clean depend $(SUBDIRS)

all : CMD=all
all : $(SUBDIRS)

clean : CMD=clean 
clean : $(SUBDIRS)

depend : CMD=depend
depend : $(SUBDIRS)

$(SUBDIRS):
	$(MAKE) -C $@ $(CMD)
    
main: static dynamic
```

### 26.3.2 c:\work\code\CPP\make\example\make-settings.gmk

```text
CC = g++
LINK = g++
CFLAGS += -g -fPIC
LFLAGS = -g 
```

### 26.3.3 dynamic/Makefile

```text
include ../make-settings.gmk

TARGET = libdynamic.so
FILES = dynamic.cpp
OFILES = $(FILES:.cpp=.o)
DFILES = $(FILES:.cpp=.d)

LIBS = 

.PHONY: all clean depend

all: $(TARGET)

clean:
	rm -f $(TARGET) $(OFILES) $(DFILES)

depend: $(DFILES)

$(DFILES): %.d: %.cpp
	@echo Building dependency file
	@set -e; rm -f $@; \
	$(CC) -MM $(CFLAGS) $< > $@; \
	sed -i 's,\($*\)\.o[ :]*,\1.o $@ : ,g' $@;

-include $(DFILES)

$(OFILES): %.o: %.cpp
	$(CC) -o $@ -c $(CFLAGS) $<

$(TARGET): $(OFILES)
	$(LINK) -o $@ -shared $(LFLAGS) $^ $(LIBS)

----------------------------
```

### 26.3.4 main/Makefile

```text
include ../make-settings.gmk

TARGET = main
FILES = main.cpp
OFILES = $(FILES:.cpp=.o)
DFILES = $(FILES:.cpp=.d)

CFLAGS += -I../static -I../dynamic
LIBS = -L../static -lstatic -L../dynamic -ldynamic

.PHONY: all clean depend

all: $(TARGET)

clean:
	rm -f $(TARGET) $(OFILES) $(DFILES)

depend: $(DFILES)

$(DFILES): %.d: %.cpp
	@echo Building dependency file
	@set -e; rm -f $@; \
	$(CC) -MM $(CFLAGS) $< > $@; \
	sed -i 's,\($*\)\.o[ :]*,\1.o $@ : ,g' $@;

-include $(DFILES)

$(OFILES): %.o: %.cpp
	$(CC) -o $@ -c $(CFLAGS) $< 

$(TARGET): $(OFILES)
	$(LINK) -o $@ $(LFLAGS) $^ $(LIBS) 

----------------------------
```

### 26.3.5 static/Makefile

```text
include ../make-settings.gmk

TARGET = libstatic.a
FILES = static.cpp
OFILES = $(FILES:.cpp=.o)
DFILES = $(FILES:.cpp=.d)

.PHONY: all clean depend

all: $(TARGET)

clean:
	rm -f $(TARGET) $(OFILES) $(DFILES)

depend: $(DFILES)

$(DFILES): %.d: %.cpp
	@echo Building dependency file
	@set -e; rm -f $@; \
	$(CC) -MM $(CFLAGS) $< > $@; \
	sed -i 's,\($*\)\.o[ :]*,\1.o $@ : ,g' $@;

-include $(DFILES)

$(OFILES): %.o: %.cpp
	$(CC) -o $@ -c $(CFLAGS) $<

$(TARGET): $(OFILES)
	ar rcs $@ $^ 

----------------------------

		26.3.6
	26.4
```

## See Also

<!-- backlinks:start -->
### Backlinks

* [swig-how-to](/swig-how-to.md)
<!-- backlinks:end -->
