---
type: reference
title: Compilation Errors FAQs
description: Section 11 of the legacy kb-cpp notes.
tags: [kb-cpp]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-cpp#11"
---

# Compilation Errors FAQs

[↑ kb-cpp](/kb-cpp/README.md)

## 11.1 GCC

### 11.1.1 undefined vtable

```text
		Example:
<internal-path>:116: undefined reference to `vtable for TimerCacheTest'

Solution:
That is the most obscure error message the gcc produces, but the reason
is usually simple:

The compiler has to put the vtable into an object file. It puts it into
the object file where the definition of the first non-inline member
function is. If it is missing, you get this rather unhelpful linker
error. Please check the existence of the definitions of your member
functions. For example, commonly absence of defenition of virtual functions (coming from base classes) will result in this error.
In one instance changing signature of DTOR to virtual resolved this error.
```

### 11.1.2 class has virtual functions but non-virtual destructor

```text
- Reason:
The thing is: without the destructor, GCC gives me a bunch of warnings "class has virtual functions but non-virtual destructor", but still compiles and my program works fine

This is an annoying warning in Modern C++, but in old object-style C++ it is generally correct.

The problem is about the way your objects are destructed. A simple test:

#include <iostream>

class Base {};
class Derived: public Base { public: ~Derived() { std::cout << "Aargh\n"; } };

int main() {
  Base* b = new Derived();
  Derived* d = new Derived();

  delete d;
  delete b;
}
This prints:

Aargh
Yep, only once.

The problem is that when you call delete on a variable of type Base*, the Base::~Base() method is called. If it is virtual, then the call is dynamically dispatched to the final method (based on the dynamic type), in this case Derived::~Derived(), but if it is not, then Derived::~Derived() is never called, thus never executed.

Therefore, if you wish to call delete (or use smart pointers which do it for you) on base types, then you need to add virtual ~Base() {} in their class definitions. This is why gcc warns you when you create a polymorphic class without a virtual destructor.


- Fix: define an empty DTOR
or If you insist on doing this, go ahead and pass -Wno-non-virtual-dtor to GCC. This warning doesn't seem to be turned on by default, so you must have enabled it with -Wall or -Weffc++. However, I think it's a useful warning, because in most situations this would be a bug.
ex:
                virtual ~CAD_DIAG() {};
```

### 11.1.3 may be used uninitialized in this function

#### 11.1.3.1 My example

```text
void f()
{
	if (cond) goto error;

	int * p = NULL;
	p = malloc(..);
	// some code w/ p
	//
error:
	free(p)
}

- Get this warn here since goto may take us to error: scope w/o declaring & Initializing p

			11.1.3.2
```

### 11.1.4 jump into scope of identifier with variably modified type

#### 11.1.4.1 Example

```text
int test_alloc_stack(int size){
    if(0) goto error; // same issue whatever conditional is used
    int apply[size];
    give_values(apply,size);
    return 1;
    error:
        return 0;
} 

a. The declaration:

int apply[size];
creates a variable length array. When it goes out of scope, the compiler must produce some code that cleans up the allocation for that array. Jumping into the scope of such an object is forbidden I imagine because some implementations might need to arrange for some initialization that the clean up code would require, and if you jump into the scope the initialization would be bypassed.

If you change to a dynamic allocation, the initialization and clean up become your responsibility instead of the compiler's.

b. It is forbidden by the standard:

C99 standard, paragraph 6.8.6.1

Constraints

[...] A goto statement shall not jump from outside the scope of an identiﬁer having a variably modiﬁed type to inside the scope of that identiﬁer.

Which is exactly what your goto is doing, namely, jumping from outside the scope of apply to inside it.

You can use the following workaround to limit the scope of apply:

if(0) goto error;

{
	    int apply[size];
	        give_values(apply,size);
		    return 1;
}

error:
return 0;

c. Your goto makes you skip the line that allocates apply (at runtime).

You can solve the problem in one of four ways:

1: Rewrite your code so you don't use goto.

2: Move the declaration of apply to before the goto.

3: Change the scope so that error: is outside the scope of apply:

int test_alloc_stack(int size){
	    if(0) goto error; // same issue whatever conditional is used
	        {
			        int apply[size];
				        give_values(apply,size);
					        return 1;
						    }
		    error:
		        return 0;
}
4: Change the variable declaration so its size can be determined at compile-time.

			11.1.4.2
```

### 11.1.5 gcc warning" 'will be initialized after'

```text
Make sure the members appear in the initializer list in the same order as they appear in the class

Class C {
   int a;
   int b;
   C():b(1),a(2){} //warning, should be C():a(2),b(1)
}
or you can turn -Wno-reorder
```

### 11.1.6 error: stropts.h: No such file or directory

```text
It is a known issue that modern Linux systems are missing stropts.h file. You will probably have some problems when trying to compile software like pppd, pptp, gftp, etc from sources. Seems to be a strange thing, as you won’t get any errors in previous versions of Linux. Most recent versions of Fedora don’t contain this file, that’s why we need to know what to do if software compilation fails because of missing stropts.h.

Let’s determine when we need to have this file on our machine.When we’re compiling any “old” package from sources, we may receive the following error:

error: stropts.h: No such file or directory

What could be the reason and why isn’t this file included into our Linux distribution?This error means that your system doesn’t support STREAMS.

Linux doesn’t support STREAMS (many years ago it was available as a third party module, but it hasn’t worked for years). stropts.h is part of a POSIX XSR option, which is not supported in modern Linux distributions. Do we really need it in Linux?

This means that software you’re trying to compile, will not use the functions listed under stropts.h as they’re not supported by the operating system. So we will do a simple trick that will let you to compile your software without these functions.

Since the stropts.h is required for a successful compilation, the most simple way to solve the issue is to create a blank file named stropts.h under /usr/include. You may want to put any comments there, this way you won’t forget what was the reason to create this file.

This simple trick will help you to compile pptp (1.7.2),  pppd (2.4.5), and I think that the list will be much bigger. That was just my experience, but the sense remains the same: you need this file for a successful compilation. Just create it and have fun! :)
		11.1.7
```
