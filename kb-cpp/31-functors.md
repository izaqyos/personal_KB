---
type: reference
title: functors
description: Section 32 of the legacy kb-cpp notes.
tags: [kb-cpp]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-cpp#32"
---

# functors

[↑ kb-cpp](/kb-cpp/README.md)

## 32.1 http://stackoverflow.com/questions/356950/c-functors-and-their-uses

```text
Q:I keep hearing a lot about functors in C++, can someone give me an overview as to what they are and in what cases they would be useful?	

A1: A functor is pretty much just a class which defines the operator(). That lets you create objects which "look like" a function:

// this is a functor
struct add_x {
  add_x(int x) : x(x) {}
  int operator()(int y) { return x + y; }

private:
  int x;
};

// Now you can use it like this:
add_x add42(42); // create an instance of the functor class
int i = add42(8); // and "call" it
assert(i == 50); // and it added 42 to its argument

std::vector<int> in; // assume this contains a bunch of values)
std::vector<int> out;
// Pass a functor to std::transform, which calls the functor on every element 
// in the input sequence, and stores the result to the output sequence
std::transform(in.begin(), in.end(), out.begin(), add_x(1)); 
assert(out[i] == in[i] + 1); // for all i
There are a couple of nice things about functors. One is that unlike regular functions, they can contain state. The above example creates a function which adds 42 to whatever you give it. But that value 42 is not hardcoded, it was specified as a constructor argument when we created our functor instance. I could create another adder, which added 27, just by calling the constructor with a different value. This makes them nicely customizable.

As the last lines show, you often pass functors as arguments to other functions such as std::transform or the other standard library algorithms. You could do the same with a regular function pointer except, as I said above, functors can be "customized" because they contain state, making them more flexible (If I wanted to use a function pointer, I'd have to write a function which added exactly 1 to its argument. The functor is general, and adds whatever you initialized it with), and they are also potentially more efficient. In the above example, the compiler knows exactly which function std::transform should call. It should call add_x::operator(). That means it can inline that function call. And that makes it just as efficient as if I had manually called the function on each value of the vector.

If I had passed a function pointer instead, the compiler couldn't immediately see which function it points to, so unless it performs some fairly complex global optimizations, it'd have to dereference the pointer at runtime, and then make the call.

A2: Little addition. You can use boost::function, to create functors from functions and methods, like this:

class Foo
{
    void operator () (int i) { printf("Foo %d", i); }
};
void Bar(int i) { printf("Bar %d", i); }
Foo foo;
boost::function<void (int)> f(foo);//wrap functor
f(1);//prints "Foo 1"
boost::function<void (int)> b(&Bar);//wrap normal function
b(1);//prints "Bar 1"
and you can use boost::bind to add state to this functor

boost::function<void ()> f1 = boost::bind(foo, 2);
f1();//no more argument, function argument stored in f1
//and this print "Foo 2" (:
//and normal function
boost::function<void ()> b1 = boost::bind(&Bar, 2);
b1();// print "Bar 2"
and most useful, with boost::bind and boost::function you can create functor from class method, actually this is a delegate:

class SomeClass
{
    std::string state_;
public:
    SomeClass(const char* s) : state_(s) {}

    void method( std::string param )
    {
        std::cout << state_ << param << std::endl;
    }
};
SomeClass *inst = new SomeClass("Hi, i am ");
boost::function< void (std::string) > callback;
callback = boost::bind(&SomeClass::method, inst, _1);//create delegate
//_1 is a placeholder it holds plase for parameter
callback("useless");//prints "Hi, i am useless"
You can create list or vector of functors

std::list< boost::function<void (EventArg e)> > events;
//add some events
....
//call them
std::for_each(
        events.begin(), events.end(), 
        boost::bind( boost::apply<void>(), _1, e));
There is one problem with all this stuff, compiler error messages is not human readable :)

A3: Used instead of plain function:

Pros:

Functor may have state
Functor fits into OOP
Cons:

There is more typing, a bit longer compilation time etc.
Used instead of function pointer:

Pros:

Functor often may be inlined
Cons:

Functor can not be swapped with other functor type during runtime (at least unless it extends some base class, which therefore gives some overhead)
Used instead of polymorphism:

Pros:

Functor (non-virtual) doesn't require vtable and runtime dispatching, thus it is more efficient in most cases
Cons:

Functor can not be swapped with other functor type during runtime (at least unless it extends some base class, which therefore gives some overhead)

	32.2
```
