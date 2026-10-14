---
type: reference
title: Memory mangament
description: "C++ memory management: pointers and smart pointers including auto_ptr."
tags: [cpp, memory, legacy, reference, tutorial]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-cpp#9"
---

# Memory mangament

[↑ kb-cpp](/kb-cpp/README.md)

## 9.1 Pointers, Smart pointers

### 9.1.1 Auto Ptr, Using auto_ptr Effectively

```text
This article appeared in C/C++ Users Journal, 17(10), October 1999.

Most people have heard of the standard auto_ptr smart pointer facility, but not everyone uses it daily. That's a shame, because it turns out that auto_ptr neatly solves common C++ design and coding problems, and using it well can lead to more robust code. This article shows how to use auto_ptr correctly to make your code safer--and how to avoid the dangerous but common abuses of auto_ptr that create intermittent and hard-to-diagnose bugs.
Why Call It an "Auto" Pointer?

auto_ptr is just one of a wide array of possible smart pointers. Many commercial libraries provide more sophisticated kinds of smart pointers that can do wild and wonderful things, from managing reference counts to providing advanced proxy services. Think of the Standard C++ auto_ptr as the Ford Escort of smart pointers: A simple general-purpose smart pointer that doesn't have all the gizmos and luxuries of special-purpose or high-performance smart pointers, but that does many common things well and is perfectly suitable for regular daily use.

What auto_ptr does is own a dynamically allocated object and perform automatic cleanup when the object is no longer needed. Here's a simple example of code that's unsafe without auto_ptr:

    // Example 1(a): Original code
    //
    void f()
    {
      T* pt( new T );

      /*...more code...*/

      delete pt;
    }

Most of us write code like this every day. If f() is a three-line function that doesn't do anything exceptional, this may be fine. But if f() never executes the delete statement, either because of an early return or because of an exception thrown during execution of the function body, then the allocated object is not deleted and we have a classic memory leak.

A simple way to make Example 1(a) safe is to wrap the pointer in a "smarter" pointer-like object that owns the pointer and that, when destroyed, deletes the pointed-at object automatically. Because this smart pointer is simply used as an automatic object (that is, one that's destroyed automatically when it goes out of scope), it's reasonably called an "auto" pointer:

    // Example 1(b): Safe code, with auto_ptr
    //
    void f()
    {
      auto_ptr<T> pt( new T );

      /*...more code...*/

    } // cool: pt's destructor is called as it goes out
      // of scope, and the object is deleted automatically

Now the code will not leak the T object, no matter whether the function exits normally or by means of an exception, because pt's destructor will always be called during stack unwinding. The cleanup happens automatically.

Finally, using an auto_ptr is just about as easy as using a built-in pointer, and to "take back" the resource and assume manual ownership again, we just call release():

    // Example 2: Using an auto_ptr
    //
    void g()
    {
      T* pt1 = new T;
      // right now, we own the allocated object

      // pass ownership to an auto_ptr
      auto_ptr<T> pt2( pt1 );

      // use the auto_ptr the same way
      // we'd use a simple pointer
      *pt2 = 12;       // same as "*pt1 = 12;"
      pt2->SomeFunc(); // same as "pt1->SomeFunc();"

      // use get() to see the pointer value
      assert( pt1 == pt2.get() );

      // use release() to take back ownership
      T* pt3 = pt2.release();

      // delete the object ourselves, since now
      // no auto_ptr owns it any more
      delete pt3;

    } // pt2 doesn't own any pointer, and so won't
      // try to delete it... OK, no double delete

Finally, we can use auto_ptr's reset() function to reset the auto_ptr to own a different object. If the auto_ptr already owned an object, though, it first deletes the already-owned object, so calling reset() is much the same as destroying the auto_ptr and creating a new one that owns the new object:

    // Example 3: Using reset()
    //
    void h()
    {
      auto_ptr<T> pt( new T(1) );

      pt.reset( new T(2) );
        // deletes the first T that was
        // allocated with "new T(1)"

    } // finally, pt goes out of scope and
      // the second T is also deleted
Wrapping Pointer Data Members

Similarly, auto_ptr can be used to safely wrap pointer data members. Consider the following common example that uses the Pimpl (or, compiler-firewall) Idiom:[1]

    // Example 4(a): A typical Pimpl
    //

    // file c.h
    //
    class C
    {
    public:
      C();
      ~C();
      /*...*/
    private:
      class CImpl; // forward declaration
      CImpl* pimpl_;
    };

    // file c.cpp
    //
    class C::CImpl { /*...*/ };

    C::C() : pimpl_( new CImpl ) { }
    C::~C() { delete pimpl_; }

In brief, C's private details are split off into a separate implementation object that's hidden behind an opaque pointer. The idea is that C's constructor is responsible for allocating the private helper "Pimpl" object that contains the class's hidden internals, and C's destructor is responsible for deallocating it. Using auto_ptr, however, we find an easier way:

    // Example 4(b): A safer Pimpl, using auto_ptr
    //

    // file c.h
    //
    class C
    {
    public:
      C();
      /*...*/
    private:
      class CImpl; // forward declaration
      auto_ptr<CImpl> pimpl_;
    };

    // file c.cpp
    //
    class C::CImpl { /*...*/ };

    C::C() : pimpl_( new CImpl ) { }

Now the destructor doesn't need to worry about deleting the pimpl_ pointer, because the auto_ptr will handle it automatically. In fact, if there's no other reason for explicitly writing a destructor, we don't need to bother with a custom destructor at all any more. Clearly, this is easier than managing the pointer manually, and it follows the good practice of wrapping resource ownership in objects--a job that auto_ptr is well suited to do. We'll revisit this example again at the end.
Ownership, Sources, and Sinks

This is nifty stuff all by itself, but it gets better: It's also very useful to pass auto_ptrs to and from functions, as function parameters and return values.

To see why, first consider what happens when you copy an auto_ptr: An auto_ptr owns the object that it holds a pointer to, and only one auto_ptr may own an object at a time. When you copy an auto_ptr, you automatically transfer ownership from the source auto_ptr to the target auto_ptr; if the target auto_ptr already owns an object, that object is first freed. After the copy, only the target auto_ptr owns the pointer and will delete it in due time, while the source is set back to a null state and can no longer be used to refer to the owned object.

For example:

    // Example 5: Transferring ownership from
    //            one auto_ptr to another
    //
    void f()
    {
      auto_ptr<T> pt1( new T );
      auto_ptr<T> pt2;

      pt1->DoSomething(); // OK

      pt2 = pt1;  // now pt2 owns the pointer,
                  // and pt1 does not

      pt2->DoSomething(); // OK

    } // as we go out of scope, pt2's destructor
      // deletes the pointer, but pt1's does nothing

But be careful to avoid the pitfall of trying to use a non-owning auto_ptr:

    // Example 6: Never try to do work through
    //            a non-owning auto_ptr
    //
    void f()
    {
      auto_ptr<T> pt1( new T );
      auto_ptr<T> pt2;

      pt2 = pt1;  // now pt2 owns the pointer, and
                  // pt1 does not

      pt1->DoSomething();
                  // error! following a null pointer
    }

With that in mind, we start to see how well auto_ptr works with sources and sinks. A "source" is a function or other operation that creates a new resource, and then typically hands off and relinquishes ownership of the resource. A "sink" is a function that does the reverse, namely that takes ownership of an existing object (and typically disposes of it). Instead of just having sources and sinks return and take bald pointers, though, it's usually better to return or take a smart pointer that owns the resource:

    // Example 7: Sources and sinks
    //

    // A creator function that builds a new
    // resource and then hands off ownership.
    //
    auto_ptr<T> Source()
    {
      return auto_ptr<T>( new T );
    }

    // A disposal function that takes ownership
    // of an existing resource and frees it.
    //
    void Sink( auto_ptr<T> pt )
    {
    }

    // Sample code to exercise the above:
    auto_ptr<T> pt( Source() ); // takes ownership

Note the elegance of what's going on here:

a.       Source() allocates a new object and returns it to the caller in a completely safe way, by letting the caller assume ownership of the pointer. Even if the caller ignores the return value (of course, you would never write code that ignores return values, right?), the allocated object will always be safely deleted.

At the end of this article, I'll demonstrate why returning an auto_ptr is an important idiom. It turns out that returning a result by wrapping it in something like an auto_ptr is sometimes the only way to make a function strongly exception-safe.

b.       Sink() takes an auto_ptr by value and therefore assumes ownership of it. When Sink() is done, the deletion is performed as the local auto_ptr object goes out of scope (as long as Sink() itself hasn't handed off ownership to someone else). The Sink() function as written above doesn't actually do anything with its parameter, so calling "Sink( pt );" is a fancy way of writing "pt.reset(0);", but normally a sink function would do some work with the object before freeing it.
Things Not To Do, and Why Not To Do Them

Beware: Never use auto_ptrs except in one of the ways I just described above. I have seen many programmers try to use auto_ptrs in other ways just as they would use any other object. The problem with this is that auto_ptrs are most assuredly not like any other object. Here's the fundamental issue, and I'll highlight it to make sure it stands out:

For auto_ptr, copies are NOT equivalent.

It turns out that this has important effects when you try to use auto_ptrs with generic code that does make copies and isn't necessarily aware that copies aren't equivalent (after all, usually copies are!).  Consider the following code that I regularly see posted on the C++ newsgroups:

    // Example 8: Danger, Will Robinson!
    //
    vector< auto_ptr<T> > v;

    /* ... */

    sort( v.begin(), v.end() );

It is never safe to put auto_ptrs into standard containers. Some people will tell you that their compiler and library compiles this fine, and others will tell you that they've seen exactly this example recommended in the documentation of a certain popular compiler; don't listen to them.

The problem is that auto_ptr does not quite meet the requirements of a type you can put into containers, because copies of auto_ptrs are not equivalent. For one thing, there's nothing that says a vector can't just decide to up and make an "extra" internal copy of some object it contains. For another, when you call generic functions that will copy elements, like sort() does, the functions have to be able to assume that copies are going to be equivalent. At least one popular sort internally takes a copy of a "pivot" element, and if you try to make it work on auto_ptrs it will merrily take a copy of the pivot auto_ptr object (thereby taking ownership and putting it in a temporary auto_ptr on the side), do the rest of its work on the sequence (including taking further copies of the now-non-owning auto_ptr that was picked as a pivot value), and when the sort is over the pivot is destroyed and you have a problem: At least one auto_ptr in the sequence (the one that was the pivot value) no longer owns the pointer it once held, and in fact the pointer it held has already been deleted!

So the standards committee bent over backwards to do everything it could to help you out: The Standard auto_ptr was deliberately and specifically designed to break if you try to use it with the standard containers (or, at least, to break with most natural implementations of the standard library). To do this, the committee used a trick: auto_ptr's copy constructor and copy assignment operator take references to non-const to the right-hand-side object. The standard containers' single-element insert() functions take a reference to const, and hence won't work with auto_ptrs.
Interlude: The const auto_ptr Idiom

One cute and intentional result of this engineering of auto_ptr is that const auto_ptrs never lose ownership: Copying a const auto_ptr is illegal, and in fact the only things you can do with a const auto_ptr are dereference it with operator*() or operator->() or call get() to inquire about the value of the contained pointer. This means that we have a clear and concise idiom to express that an auto_ptr can never lose ownership:

    // Example 9: The const auto_ptr idiom
    //
    const auto_ptr<T> pt1( new T );
        // making pt1 const guarantees that pt1 can
        // never be copied to another auto_ptr, and
        // so is guaranteed to never lose ownership

    auto_ptr<T> pt2( pt1 ); // illegal
    auto_ptr<T> pt3;
    pt3 = pt1;              // illegal
    pt1.release();          // illegal
    pt1.reset( new T );     // illegal

Now that's what I call const! So if you want to declare to the world that an auto_ptr can never be changed and will always delete what it owns, this is the way to do it. The const auto_ptr idiom is a useful and common technique, and one that you should keep in mind.
auto_ptr and Exception Safety

Finally, auto_ptr is sometimes essential to writing exception-safe code. Consider the following function:

    // Example 10(a): Exception-safe?
    //
    String f()
    {
      String result;
      result = "some value";
      cout << "some output";
      return result;
    }

This function has two visible side effects: It emits some output, and it returns a String. A detailed examination of exception safety is beyond the scope of this article,[2] but the goal we want to achieve is the strong exception-safety guarantee, which boils down to ensuring that the function acts atomically--even if there are exceptions, either all side effects happen or none of them do.

Although the code in Example 10(a) comes pretty close to achieving the strong exception-safety guarantee, there's still one minor quibble, as illustrated by the following client code:

    String theName;
    theName = f();

The String copy constructor is invoked because the result is returned by value, and the copy assignment operator is invoked to copy the result into theName. If either copy fails, then f() has completed all of its work and all of its side effects (good), but the result has been irretrievably lost (oops).

Can we do better, and perhaps avoid the problem by avoiding the copy?  For example, we could let the function take a non-const String reference parameter and place the return value in that:

    // Example 10(b): Better?
    //
    void f( String& result )
    {
      cout << "some output";
      result = "some value";
    }

This may look better, but it isn't, because the assignment to result might still fail which leaves us with one side effect complete and the other incomplete. Bottom line, this attempt doesn't really buy us much.

One way to solve the problem is to return a pointer to a dynamically allocated String, but the best solution is to go a step farther and return the pointer in an auto_ptr:

    // Example 10(c): Correct (finally!)
    //
    auto_ptr<String> f()
    {
      auto_ptr<String> result = new String;
      *result = "some value";
      cout << "some output";
      return result;  // rely on transfer of ownership;
                      // this can't throw
    }

This does the trick, since we have effectively hidden all of the work to construct the second side effect (the return value) while ensuring that it can be safely returned to the caller using only nonthrowing operations after the first side effect has completed (the printing of the message). We know that, once the cout is complete, the returned value will make it successfully into the hands of the caller, and be correctly cleaned up in all cases: If the caller accepts the returned value, the act of accepting a copy of the auto_ptr causes the caller to take ownership; and if the caller does not accept the returned value, say by ignoring the return value, the allocated String will be automatically cleaned up as the temporary auto_ptr holding it is destroyed. The price for this extra safety?  As often happens when implementing strong exception safety, the strong safety comes at the (usually minor) cost of some efficiency--here, the extra dynamic memory allocation. But, when it comes to trading off efficiency for correctness, we usually ought to prefer the latter!

Make a habit of using smart pointers like auto_ptr in your daily work. auto_ptr neatly solves common problems and will make your code safer and more robust, especially when it comes to preventing resource leaks and ensuring strong exception safety. Because it's standard, it's portable across libraries and platforms, and so it will be right there with you wherever you take your code.
Acknowledgments

This article is drawn from material in the new book Exceptional C++: 47 engineering puzzles, programming problems, and exception-safety solutions by Herb Sutter, Â© 2000 Addison Wesley Longman Inc., which contains further detailed treatments of points touched on briefly in this article, including exception safety, the Pimpl (compiler-firewall) Idiom, optimization, const-correctness, namespaces, and other C++ design and programming topics.

	9.2
```
