---
type: reference
title: books
description: Subsection 35.1.2 of FAQ.
tags: [kb-cpp]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-cpp#35.1.2"
---

# 35.1.2 books

[↑ FAQ](/kb-cpp/34-c-11-c-14/01-faq/README.md)

#### 35.1.2.1 Effective modern c++

#### 35.1.2.1.1 auto

```text
Item 5: Prefer auto to explicit type declarations.

Ah, the simple joy of

int x;

Wait. Damn. I forgot to initialize x, so its value is indeterminate. Maybe. It might actually be initialized to zero. Depends on the context. Sigh.

Never mind. Let’s move on to the simple joy of declaring a local variable to be initialized by dereferencing an iterator:

template<typename It>    // algorithm to dwim ("do what I mean")
void dwim(It b, It e)    // for all elements in range from
{                        // b to e
  for (; b != e; ++b) {
    typename std::iterator_traits<It>::value_type
      currValue = *b;
    …
  }
}

Ugh. “typename std::iterator_traits<It>::value_type” to express the type of the value pointed to by an iterator? Really? I must have blocked out the memory of how much fun that is. Damn. Wait—didn’t I already say that?

Okay, simple joy (take three): the delight of declaring a local variable whose type is that of a closure. Oh, right. The type of a closure is known only to the compiler, hence can’t be written out. Sigh. Damn.

Damn, damn, damn! Programming in C++ is not the joyous experience it should be!

Well, it didn’t used to be. But as of C++11, all these issues go away, courtesy of auto. auto variables have their type deduced from their initializer, so they must be initialized. That means you can wave goodbye to a host of uninitialized variable problems as you speed by on the modern C++ superhighway:

int x1;                     // potentially uninitialized

auto x2;                    // error! initializer required

auto x3 = 0;                // fine, x3's value is well-defined

Said highway lacks the potholes associated with declaring a local variable whose value is that of a dereferenced iterator:

template<typename It>       // as before
void dwim(It b, It e)
{
  for (; b != e; ++b) {
    auto currValue = *b;
    …
  }
}

And because auto uses type deduction (see Item 2), it can represent types known only to compilers:

auto derefUPLess =                        // comparison func.
  [](const std::unique_ptr<Widget>& p1,   // for Widgets
     const std::unique_ptr<Widget>& p2)   // pointed to by
  { return *p1 < *p2; };                  // std::unique_ptrs

Very cool. In C++14, the temperature drops further, because parameters to lambda expressions may involve auto:

auto derefLess =                          // C++14 comparison
  [](const auto& p1,                      // function for
     const auto& p2)                      // values pointed
  { return *p1 < *p2; };                  // to by anything
                                          // pointer-like

Coolness notwithstanding, perhaps you’re thinking we don’t really need auto to declare a variable that holds a closure, because we can use a std::function object. It’s true, we can, but possibly that’s not what you were thinking. And maybe now you’re thinking “What’s a std::function object?” So let’s clear that up.

std::function is a template in the C++11 Standard Library that generalizes the idea of a function pointer. Whereas function pointers can point only to functions, however, std::function objects can refer to any callable object, i.e., to anything that can be invoked like a function. Just as you must specify the type of function to point to when you create a function pointer (i.e., the signature of the functions you want to point to), you must specify the type of function to refer to when you create a std::function object. You do that through std::function’s template parameter. For example, to declare a std::function object named func that could refer to any callable object acting as if it had this signature,

bool(const std::unique_ptr<Widget>&,  // C++11 signature for
     const std::unique_ptr<Widget>&)  // std::unique_ptr<Widget>
                                      // comparison function

you’d write this:

std::function<bool(const std::unique_ptr<Widget>&,
                   const std::unique_ptr<Widget>&)> func;

Because lambda expressions yield callable objects, closures can be stored in std::function objects. That means we could declare the C++11 version of derefUPLess without using auto as follows:

std::function<bool(const std::unique_ptr<Widget>&,
                   const std::unique_ptr<Widget>&)>
  derefUPLess = [](const std::unique_ptr<Widget>& p1,
                   const std::unique_ptr<Widget>& p2)
                  { return *p1 < *p2; };

It’s important to recognize that even setting aside the syntactic verbosity and need to repeat the parameter types, using std::function is not the same as using auto. An auto-declared variable holding a closure has the same type as the closure, and as such it uses only as much memory as the closure requires. The type of a std::function-declared variable holding a closure is an instantiation of the std::function template, and that has a fixed size for any given signature. This size may not be adequate for the closure it’s asked to store, and when that’s the case, the std::function constructor will allocate heap memory to store the closure. The result is that the std::function object typically uses more memory than the auto-declared object. And, thanks to implementation details that restrict inlining and yield indirect function calls, invoking a closure via a std::function object is almost certain to be slower than calling it via an auto-declared object. In other words, the std::function approach is generally bigger and slower than the auto approach, and it may yield out-of-memory exceptions, too. Plus, as you can see in the examples above, writing “auto” is a whole lot less work than writing the type of the std::function instantiation. In the competition between auto and std::function for holding a closure, it’s pretty much game, set, and match for auto. (A similar argument can be made for auto over std::function for holding the result of calls to std::bind, but in Item 34, I do my best to convince you to use lambdas instead of std::bind, anyway.)

The advantages of auto extend beyond the avoidance of uninitialized variables, verbose variable declarations, and the ability to directly hold closures. One is the ability to avoid what I call problems related to “type shortcuts.” Here’s something you’ve probably seen—possibly even written:

std::vector<int> v;
…
unsigned sz = v.size();

The official return type of v.size() is std::vector<int>::size_type, but few developers are aware of that. std::vector<int>::size_type is specified to be an unsigned integral type, so a lot of programmers figure that unsigned is good enough and write code such as the above. This can have some interesting consequences. On 32-bit Windows, for example, both unsigned and std::vector<int>::size_type are the same size, but on 64-bit Windows, unsigned is 32 bits, while std::vector<int>::size_type is 64 bits. This means that code that works under 32-bit Windows may behave incorrectly under 64-bit Windows, and when porting your application from 32 to 64 bits, who wants to spend time on issues like that?

Using auto ensures that you don’t have to:

auto sz = v.size();  // sz's type is std::vector<int>::size_type

Still unsure about the wisdom of using auto? Then consider this code:

std::unordered_map<std::string, int> m;
…

for (const std::pair<std::string, int>& p : m)
{
  …                   // do something with p
}

This looks perfectly reasonable, but there’s a problem. Do you see it?

Recognizing what’s amiss requires remembering that the key part of a std::unordered_map is const, so the type of std::pair in the hash table (which is what a std::unordered_map is) isn’t std::pair<std::string, int>, it’s std::pair<const std::string, int>. But that’s not the type declared for the variable p in the loop above. As a result, compilers will strive to find a way to convert std::pair<const std::string, int> objects (i.e., what’s in the hash table) to std::pair<std::string, int> objects (the declared type for p). They’ll succeed by creating a temporary object of the type that p wants to bind to by copying each object in m, then binding the reference p to that temporary object. At the end of each loop iteration, the temporary object will be destroyed. If you wrote this loop, you’d likely be surprised by this behavior, because you’d almost certainly intend to simply bind the reference p to each element in m.

Such unintentional type mismatches can be autoed away:

for (const auto& p : m)
{
  …                             // as before
}

This is not only more efficient, it’s also easier to type. Furthermore, this code has the very attractive characteristic that if you take p’s address, you’re sure to get a pointer to an element within m. In the code not using auto, you’d get a pointer to a temporary object—an object that would be destroyed at the end of the loop iteration.

The last two examples—writing unsigned when you should have written std::vector<int>::size_type and writing std::pair<std::string, int> when you should have written std::pair<const std::string, int>—demonstrate how explicitly specifying types can lead to implicit conversions that you neither want nor expect. If you use auto as the type of the target variable, you need not worry about mismatches between the type of variable you’re declaring and the type of the expression used to initialize it.

There are thus several reasons to prefer auto over explicit type declarations. Yet auto isn’t perfect. The type for each auto variable is deduced from its initializing expression, and some initializing expressions have types that are neither anticipated nor desired. The conditions under which such cases arise, and what you can do about them, are discussed in Items 2 and 6, so I won’t address them here. Instead, I’ll turn my attention to a different concern you may have about using auto in place of traditional type declarations: the readability of the resulting source code.

First, take a deep breath and relax. auto is an option, not a mandate. If, in your professional judgment, your code will be clearer or more maintainable or in some other way better by using explicit type declarations, you’re free to continue using them. But bear in mind that C++ breaks no new ground in adopting what is generally known in the programming languages world as type inference. Other statically typed procedural languages (e.g., C#, D, Scala, Visual Basic) have a more or less equivalent feature, to say nothing of a variety of statically typed functional languages (e.g., ML, Haskell, OCaml, F#, etc.). In part, this is due to the success of dynamically typed languages such as Perl, Python, and Ruby, where variables are rarely explicitly typed. The software development community has extensive experience with type inference, and it has demonstrated that there is nothing contradictory about such technology and the creation and maintenance of large, industrial-strength code bases.

Some developers are disturbed by the fact that using auto eliminates the ability to determine an object’s type by a quick glance at the source code. However, IDEs’ ability to show object types often mitigates this problem (even taking into account the IDE type-display issues mentioned in Item 4), and, in many cases, a somewhat abstract view of an object’s type is just as useful as the exact type. It often suffices, for example, to know that an object is a container or a counter or a smart pointer, without knowing exactly what kind of container, counter, or smart pointer it is. Assuming well-chosen variable names, such abstract type information should almost always be at hand.

The fact of the matter is that writing types explicitly often does little more than introduce opportunities for subtle errors, either in correctness or efficiency or both. Furthermore, auto types automatically change if the type of their initializing expression changes, and that means that some refactorings are facilitated by the use of auto. For example, if a function is declared to return an int, but you later decide that a long would be better, the calling code automatically updates itself the next time you compile if the results of calling the function are stored in auto variables. If the results are stored in variables explicitly declared to be int, you’ll need to find all the call sites so that you can revise them.
Things to Remember

    auto variables must be initialized, are generally immune to type mismatches that can lead to portability or efficiency problems, can ease the process of refactoring, and typically require less typing than variables with explicitly specified types.

    auto-typed variables are subject to the pitfalls described in Items 2 and 6.
```

#### 35.1.2.1.2 Distinguish between () and {} when creating objects.

```text
Depending on your perspective, syntax choices for object initialization in C++11 embody either an embarrassment of riches or a confusing mess. As a general rule, initialization values may be specified with parentheses, an equals sign, or braces:

int x(0);             // initializer is in parentheses

int y = 0;            // initializer follows "="

int z{ 0 };           // initializer is in braces

In many cases, it’s also possible to use an equals sign and braces together:

int z = { 0 };        // initializer uses "=" and braces

For the remainder of this Item, I’ll generally ignore the equals-sign-plus-braces syntax, because C++ usually treats it the same as the braces-only version.

The “confusing mess” lobby points out that the use of an equals sign for initialization often misleads C++ newbies into thinking that an assignment is taking place, even though it’s not. For built-in types like int, the difference is academic, but for user-defined types, it’s important to distinguish initialization from assignment, because different function calls are involved:

Widget w1;            // call default constructor

Widget w2 = w1;       // not an assignment; calls copy ctor

w1 = w2;              // an assignment; calls copy operator=

Even with several initialization syntaxes, there were some situations where C++98 had no way to express a desired initialization. For example, it wasn’t possible to directly indicate that an STL container should be created holding a particular set of values (e.g., 1, 3, and 5).

To address the confusion of multiple initialization syntaxes, as well as the fact that they don’t cover all initialization scenarios, C++11 introduces uniform initialization: a single initialization syntax that can, at least in concept, be used anywhere and express everything. It’s based on braces, and for that reason I prefer the term braced initialization. “Uniform initialization” is an idea. “Braced initialization” is a syntactic construct.

Braced initialization lets you express the formerly inexpressible. Using braces, specifying the initial contents of a container is easy:

std::vector<int> v{ 1, 3, 5 }; // v's initial content is 1, 3, 5

Braces can also be used to specify default initialization values for non-static data members. This capability—new to C++11—is shared with the “=” initialization syntax, but not with parentheses:

class Widget {
  …

private:
  int x{ 0 };                  // fine, x's default value is 0
  int y = 0;                   // also fine
  int z(0);                    // error!
};

On the other hand, uncopyable objects (e.g., std::atomics—see Item 40) may be initialized using braces or parentheses, but not using “=”: 

std::atomic<int> ai1{ 0 };     // fine

std::atomic<int> ai2(0);       // fine

std::atomic<int> ai3 = 0;      // error!

It’s thus easy to understand why braced initialization is called “uniform.” Of C++’s three ways to designate an initializing expression, only braces can be used everywhere.

A novel feature of braced initialization is that it prohibits implicit narrowing conversions among built-in types. If the value of an expression in a braced initializer isn’t guaranteed to be expressible by the type of the object being initialized, compilers are required to complain:

double x, y, z;

…

int sum1{ x + y + z };       // error! sum of doubles may
                             // not be expressible as int

Initialization using parentheses and “=” doesn’t check for narrowing conversions, because that could break too much legacy code:

int sum2(x + y + z);         // okay (value of expression
                             // truncated to an int)

int sum3 = x + y + z;        // ditto

Another noteworthy characteristic of braced initialization is its immunity to C++’s most vexing parse. A side effect of C++’s rule that anything that can be parsed as a declaration must be interpreted as one, the most vexing parse most frequently afflicts developers when they want to default-construct an object, but inadvertently end up declaring a function instead. The root of the problem is that if you want to call a constructor with an argument, you can do it like this,

Widget w1(10);     // call Widget ctor with argument 10

but if you try to call a Widget constructor with zero arguments using the analogous syntax, you declare a function instead of an object:

Widget w2();       // most vexing parse! declares a function
                   // named w2 that returns a Widget!

Functions can’t be declared using braces for the parameter list, so default-constructing an object using braces doesn’t have this problem:

Widget w3{};       // calls Widget ctor with no args

There’s thus a lot to be said for braced initialization. It’s the syntax that can be used in the widest variety of contexts, it prevents implicit narrowing conversions, and it’s immune to C++’s most vexing parse. A trifecta of goodness! So why isn’t this Item entitled something like “Prefer braced initialization syntax”?

The drawback to braced initialization is the sometimes-surprising behavior that accompanies it. Such behavior grows out of the unusually tangled relationship among braced initializers, std::initializer_lists, and constructor overload resolution. Their interactions can lead to code that seems like it should do one thing, but actually does another. For example, Item 2 explains that when an auto-declared variable has a braced initializer, the type deduced is std::initializer_list, even though other ways of declaring a variable with the same initializer would yield a more intuitive type. As a result, the more you like auto, the less enthusiastic you’re likely to be about braced initialization.

In constructor calls, parentheses and braces have the same meaning as long as std::initializer_list parameters are not involved:

class Widget {
public:
  Widget(int i, bool b);      // ctors not declaring
  Widget(int i, double d);    // std::initializer_list params
  …
};

Widget w1(10, true);          // calls first ctor

Widget w2{10, true};          // also calls first ctor

Widget w3(10, 5.0);           // calls second ctor

Widget w4{10, 5.0};           // also calls second ctor

If, however, one or more constructors declare a parameter of type std::initializer_list, calls using the braced initialization syntax strongly prefer the overloads taking std::initializer_lists. Strongly. If there’s any way for compilers to construe a call using a braced initializer to be to a constructor taking a std::initializer_list, compilers will employ that interpretation. If the Widget class above is augmented with a constructor taking a std::initializer_list<long double>, for example,

class Widget {
public:
  Widget(int i, bool b);                           // as before
  Widget(int i, double d);                         // as before

  Widget(std::initializer_list<long double> il);   // added

  …
};

Widgets w2 and w4 will be constructed using the new constructor, even though the type of the std::initializer_list elements (long double) is, compared to the non-std::initializer_list constructors, a worse match for both arguments! Look:

Widget w1(10, true);     // uses parens and, as before,
                         // calls first ctor

Widget w2{10, true};     // uses braces, but now calls
                         // std::initializer_list ctor
                         // (10 and true convert to long double)

Widget w3(10, 5.0);      // uses parens and, as before,
                         // calls second ctor

Widget w4{10, 5.0};      // uses braces, but now calls
                         // std::initializer_list ctor
                         // (10 and 5.0 convert to long double)

Even what would normally be copy and move construction can be hijacked by std::initializer_list constructors:

class Widget {
public:
  Widget(int i, bool b);                           // as before
  Widget(int i, double d);                         // as before
  Widget(std::initializer_list<long double> il);   // as before

  operator float() const;                          // convert
  …                                                // to float

};

Widget w5(w4);               // uses parens, calls copy ctor

Widget w6{w4};               // uses braces, calls
                             // std::initializer_list ctor
                             // (w4 converts to float, and float
                             // converts to long double)

Widget w7(std::move(w4));    // uses parens, calls move ctor

Widget w8{std::move(w4)};    // uses braces, calls
                             // std::initializer_list ctor
                             // (for same reason as w6)

Compilers’ determination to match braced initializers with constructors taking std::initializer_lists is so strong, it prevails even if the best-match std::initializer_list constructor can’t be called. For example:

class Widget {
public:
  Widget(int i, bool b);                   // as before
  Widget(int i, double d);                 // as before

  Widget(std::initializer_list<bool> il);  // element type is
                                           // now bool

  …                                        // no implicit
};                                         // conversion funcs

Widget w{10, 5.0};      // error! requires narrowing conversions

Here, compilers will ignore the first two constructors (the second of which offers an exact match on both argument types) and try to call the constructor taking a std::initializer_list<bool>. Calling that constructor would require converting an int (10) and a double (5.0) to bools. Both conversions would be narrowing (bool can’t exactly represent either value), and narrowing conversions are prohibited inside braced initializers, so the call is invalid, and the code is rejected.

Only if there’s no way to convert the types of the arguments in a braced initializer to the type in a std::initializer_list do compilers fall back on normal overload resolution. For example, if we replace the std::initializer_list<bool> constructor with one taking a std::initializer_list<std::string>, the non-std::initializer_list constructors become candidates again, because there is no way to convert ints and bools to std::strings:

class Widget {
public:
  Widget(int i, bool b);               // as before
  Widget(int i, double d);             // as before

  // std::initializer_list element type is now std::string
  Widget(std::initializer_list<std::string> il);
  …                                    // no implicit
};                                     // conversion funcs

Widget w1(10, true);     // uses parens, still calls first ctor

Widget w2{10, true};     // uses braces, now calls first ctor

Widget w3(10, 5.0);      // uses parens, still calls second ctor

Widget w4{10, 5.0};      // uses braces, now calls second ctor

This brings us near the end of our examination of braced initializers and constructor overloading, but there’s an interesting edge case that needs to be addressed. Suppose you use an empty set of braces to construct an object that supports default construction and also supports std::initializer_list construction. What do your empty braces mean? If they mean “no arguments,” you get default construction, but if they mean “empty std::initializer_list,” you get construction from a std::initializer_list with no elements.

The rule is that you get default construction. Empty braces mean no arguments, not an empty std::initializer_list:

class Widget {
public:
  Widget();                                // default ctor

  Widget(std::initializer_list<int> il);   // std::initializer
                                           // _list ctor

  …                                        // no implicit
};                                         // conversion funcs

Widget w1;            // calls default ctor

Widget w2{};          // also calls default ctor

Widget w3();          // most vexing parse! declares a function!

If you want to call a std::initializer_list constructor with an empty std::initializer_list, you do it by making the empty braces a constructor argument—by putting the empty braces inside the parentheses or braces demarcating what you’re passing:

Widget w4({});        // calls std::initializer_list ctor
                      // with empty list

Widget w5{{}};        // ditto

At this point, with seemingly arcane rules about braced initializers, std::initializer_lists, and constructor overloading burbling about in your brain, you may be wondering how much of this information matters in day-to-day programming. More than you might think, because one of the classes directly affected is std::vector. std::vector has a non-std::initializer_list constructor that allows you to specify the initial size of the container and a value each of the initial elements should have, but it also has a constructor taking a std::initializer_list that permits you to specify the initial values in the container. If you create a std::vector of a numeric type (e.g., a std::vector<int>) and you pass two arguments to the constructor, whether you enclose those arguments in parentheses or braces makes a tremendous difference:

std::vector<int> v1(10, 20);  // use non-std::initializer_list
                              // ctor: create 10-element
                              // std::vector, all elements have
                              // value of 20

std::vector<int> v2{10, 20};  // use std::initializer_list ctor:
                              // create 2-element std::vector,
                              // element values are 10 and 20

But let’s step back from std::vector and also from the details of parentheses, braces, and constructor overloading resolution rules. There are two primary takeaways from this discussion. First, as a class author, you need to be aware that if your set of overloaded constructors includes one or more functions taking a std::initializer_list, client code using braced initialization may see only the std::initializer_list overloads. As a result, it’s best to design your constructors so that the overload called isn’t affected by whether clients use parentheses or braces. In other words, learn from what is now viewed as an error in the design of the std::vector interface, and design your classes to avoid it.

An implication is that if you have a class with no std::initializer_list constructor, and you add one, client code using braced initialization may find that calls that used to resolve to non-std::initializer_list constructors now resolve to the new function. Of course, this kind of thing can happen any time you add a new function to a set of overloads: calls that used to resolve to one of the old overloads might start calling the new one. The difference with std::initializer_list constructor overloads is that a std::initializer_list overload doesn’t just compete with other overloads, it overshadows them to the point where the other overloads may hardly be considered. So add such overloads only with great deliberation.

The second lesson is that as a class client, you must choose carefully between parentheses and braces when creating objects. Most developers end up choosing one kind of delimiter as a default, using the other only when they have to. Braces-by-default folks are attracted by their unrivaled breadth of applicability, their prohibition of narrowing conversions, and their immunity to C++’s most vexing parse. Such folks understand that in some cases (e.g., creation of a std::vector with a given size and initial element value), parentheses are required. On the other hand, the go-parentheses-go crowd embraces parentheses as their default argument delimiter. They’re attracted to its consistency with the C++98 syntactic tradition, its avoidance of the auto-deduced-a-std::initializer_list problem, and the knowledge that their object creation calls won’t be inadvertently waylaid by std::initializer_list constructors. They concede that sometimes only braces will do (e.g., when creating a container with particular values). There’s no consensus that either approach is better than the other, so my advice is to pick one and apply it consistently.

If you’re a template author, the tension between parentheses and braces for object creation can be especially frustrating, because, in general, it’s not possible to know which should be used. For example, suppose you’d like to create an object of an arbitrary type from an arbitrary number of arguments. A variadic template makes this conceptually straightforward:

template<typename T,                // type of object to create
         typename... Ts>            // types of arguments to use
void doSomeWork(Ts&&... params)
{

  create local T object from params...
  …

}

There are two ways to turn the line of pseudocode into real code (see Item 25 for information about std::forward):

T localObject(std::forward<Ts>(params)...);    // using parens

T localObject{std::forward<Ts>(params)...};    // using braces

So consider this calling code:

std::vector<int> v;
…
doSomeWork<std::vector<int>>(10, 20);

If doSomeWork uses parentheses when creating localObject, the result is a std::vector with 10 elements. If doSomeWork uses braces, the result is a std::vector with 2 elements. Which is correct? The author of doSomeWork can’t know. Only the caller can.

This is precisely the problem faced by the Standard Library functions std::make_unique and std::make_shared (see Item 21). These functions resolve the problem by internally using parentheses and by documenting this decision as part of their interfaces.1
Things to Remember

    Braced initialization is the most widely usable initialization syntax, it prevents narrowing conversions, and it’s immune to C++’s most vexing parse.

    During constructor overload resolution, braced initializers are matched to std::initializer_list parameters if at all possible, even if other constructors offer seemingly better matches.

    An example of where the choice between parentheses and braces can make a significant difference is creating a std::vector<numeric type> with two arguments.

    Choosing between parentheses and braces for object creation inside templates can be challenging.
```

#### 35.1.2.1.3 Prefer nullptr to 0 and NULL.

```text
So here’s the deal: the literal 0 is an int, not a pointer. If C++ finds itself looking at 0 in a context where only a pointer can be used, it’ll grudgingly interpret 0 as a null pointer, but that’s a fallback position. C++’s primary policy is that 0 is an int, not a pointer.

Practically speaking, the same is true of NULL. There is some uncertainty in the details in NULL’s case, because implementations are allowed to give NULL an integral type other than int (e.g., long). That’s not common, but it doesn’t really matter, because the issue here isn’t the exact type of NULL, it’s that neither 0 nor NULL has a pointer type.

In C++98, the primary implication of this was that overloading on pointer and integral types could lead to surprises. Passing 0 or NULL to such overloads never called a pointer overload:

void f(int);        // three overloads of f
void f(bool);
void f(void*);

f(0);               // calls f(int), not f(void*)

f(NULL);            // might not compile, but typically calls
                    // f(int). Never calls f(void*)

The uncertainty regarding the behavior of f(NULL) is a reflection of the leeway granted to implementations regarding the type of NULL. If NULL is defined to be, say, 0L (i.e., 0 as a long), the call is ambiguous, because conversion from long to int, long to bool, and 0L to void* are considered equally good. The interesting thing about that call is the contradiction between the apparent meaning of the source code (“I’m calling f with NULL—the null pointer”) and its actual meaning (“I’m calling f with some kind of integer—not the null pointer”). This counterintuitive behavior is what led to the guideline for C++98 programmers to avoid overloading on pointer and integral types. That guideline remains valid in C++11, because, the advice of this Item notwithstanding, it’s likely that some developers will continue to use 0 and NULL, even though nullptr is a better choice.

nullptr’s advantage is that it doesn’t have an integral type. To be honest, it doesn’t have a pointer type, either, but you can think of it as a pointer of all types. nullptr’s actual type is std::nullptr_t, and, in a wonderfully circular definition, std::nullptr_t is defined to be the type of nullptr. The type std::nullptr_t implicitly converts to all raw pointer types, and that’s what makes nullptr act as if it were a pointer of all types.

Calling the overloaded function f with nullptr calls the void* overload (i.e., the pointer overload), because nullptr can’t be viewed as anything integral:

f(nullptr);         // calls f(void*) overload

Using nullptr instead of 0 or NULL thus avoids overload resolution surprises, but that’s not its only advantage. It can also improve code clarity, especially when auto variables are involved. For example, suppose you encounter this in a code base:

auto result = findRecord( /* arguments */ );

if (result == 0) {
  …
}

If you don’t happen to know (or can’t easily find out) what findRecord returns, it may not be clear whether result is a pointer type or an integral type. After all, 0 (what result is tested against) could go either way. If you see the following, on the other hand,

auto result = findRecord( /* arguments */ );

if (result == nullptr) {
  …
}

there’s no ambiguity: result must be a pointer type.

nullptr shines especially brightly when templates enter the picture. Suppose you have some functions that should be called only when the appropriate mutex has been locked. Each function takes a different kind of pointer:

int    f1(std::shared_ptr<Widget> spw);  // call these only when
double f2(std::unique_ptr<Widget> upw);  // the appropriate
bool   f3(Widget* pw);                   // mutex is locked

Calling code that wants to pass null pointers could look like this:

std::mutex f1m, f2m, f3m;         // mutexes for f1, f2, and f3

using MuxGuard =                  // C++11 typedef; see Item 9
  std::lock_guard<std::mutex>;
…

{
  MuxGuard g(f1m);            // lock mutex for f1
  auto result = f1(0);        // pass 0 as null ptr to f1
}                             // unlock mutex

…

{
  MuxGuard g(f2m);            // lock mutex for f2
  auto result = f2(NULL);     // pass NULL as null ptr to f2
}                             // unlock mutex

…

{
  MuxGuard g(f3m);            // lock mutex for f3
  auto result = f3(nullptr);  // pass nullptr as null ptr to f3
}                             // unlock mutex

The failure to use nullptr in the first two calls in this code is sad, but the code works, and that counts for something. However, the repeated pattern in the calling code—lock mutex, call function, unlock mutex—is more than sad. It’s disturbing. This kind of source code duplication is one of the things that templates are designed to avoid, so let’s templatize the pattern:

template<typename FuncType,
         typename MuxType,
         typename PtrType>
auto lockAndCall(FuncType func,
                 MuxType& mutex,
                 PtrType ptr) -> decltype(func(ptr))
{
  using MuxGuard = std::lock_guard<MuxType>;

  MuxGuard g(mutex);
  return func(ptr);
}

If the return type of this function (auto … -> decltype(func(ptr)) has you scratching your head, do your head a favor and navigate to Item 3, which explains what’s going on. There you’ll see that in C++14, the return type could be reduced to a simple decltype(auto):

template<typename FuncType,
         typename MuxType,
         typename PtrType>
decltype(auto) lockAndCall(FuncType func,        // C++14
                           MuxType& mutex,
                           PtrType ptr)
{
  using MuxGuard = std::lock_guard<MuxType>;
  
  MuxGuard g(mutex);
  return func(ptr);
}

Given the lockAndCall template (either version), callers can write code like this:

auto result1 = lockAndCall(f1, f1m, 0);          // error!

…

auto result2 = lockAndCall(f2, f2m, NULL);       // error!

…

auto result3 = lockAndCall(f3, f3m, nullptr);    // fine

Well, they can write it, but, as the comments indicate, in two of the three cases, the code won’t compile. The problem in the first call is that when 0 is passed to lockAndCall, template type deduction kicks in to figure out its type. The type of 0 is, was, and always will be int, so that’s the type of the parameter ptr inside the instantiation of this call to lockAndCall. Unfortunately, this means that in the call to func inside lockAndCall, an int is being passed, and that’s not compatible with the std::shared_ptr<Widget> parameter that f1 expects. The 0 passed in the call to lockAndCall was intended to represent a null pointer, but what actually got passed was a run-of-the-mill int. Trying to pass this int to f1 as a std::shared_ptr<Widget> is a type error. The call to lockAndCall with 0 fails because inside the template, an int is being passed to a function that requires a std::shared_ptr<Widget>.

The analysis for the call involving NULL is essentially the same. When NULL is passed to lockAndCall, an integral type is deduced for the parameter ptr, and a type error occurs when ptr—an int or int-like type—is passed to f2, which expects to get a std::unique_ptr<Widget>.

In contrast, the call involving nullptr has no trouble. When nullptr is passed to lockAndCall, the type for ptr is deduced to be std::nullptr_t. When ptr is passed to f3, there’s an implicit conversion from std::nullptr_t to Widget*, because std::nullptr_t implicitly converts to all pointer types.

The fact that template type deduction deduces the “wrong” types for 0 and NULL (i.e., their true types, rather than their fallback meaning as a representation for a null pointer) is the most compelling reason to use nullptr instead of 0 or NULL when you want to refer to a null pointer. With nullptr, templates pose no special challenge. Combined with the fact that nullptr doesn’t suffer from the overload resolution surprises that 0 and NULL are susceptible to, the case is ironclad. When you want to refer to a null pointer, use nullptr, not 0 or NULL.
Things to Remember

    Prefer nullptr to 0 and NULL.

    Avoid overloading on integral and pointer types.

				35.1.2.1.4   
Prefer alias declarations to typedefs.

I’m confident we can agree that using STL containers is a good idea, and I hope that Item 18 convinces you that using std::unique_ptr is a good idea, but my guess is that neither of us is fond of writing types like “std::unique_ptr<std::unordered_map<std::string, std::string>>” more than once. Just thinking about it probably increases the risk of carpal tunnel syndrome.

Avoiding such medical tragedies is easy. Introduce a typedef:

typedef
  std::unique_ptr<std::unordered_map<std::string, std::string>>
  UPtrMapSS;

But typedefs are soooo C++98. They work in C++11, sure, but C++11 also offers alias declarations:

using UPtrMapSS =
  std::unique_ptr<std::unordered_map<std::string, std::string>>;

Given that the typedef and the alias declaration do exactly the same thing, it’s reasonable to wonder whether there is a solid technical reason for preferring one over the other.

There is, but before I get to it, I want to mention that many people find the alias declaration easier to swallow when dealing with types involving function pointers:

// FP is a synonym for a pointer to a function taking an int and
// a const std::string& and returning nothing
typedef void (*FP)(int, const std::string&);      // typedef

// same meaning as above
using FP = void (*)(int, const std::string&);     // alias
                                                  // declaration

Of course, neither form is particularly easy to choke down, and few people spend much time dealing with synonyms for function pointer types, anyway, so this is hardly a compelling reason to choose alias declarations over typedefs.

But a compelling reason does exist: templates. In particular, alias declarations may be templatized (in which case they’re called alias templates), while typedefs cannot. This gives C++11 programmers a straightforward mechanism for expressing things that in C++98 had to be hacked together with typedefs nested inside templatized structs. For example, consider defining a synonym for a linked list that uses a custom allocator, MyAlloc. With an alias template, it’s a piece of cake:

template<typename T>                           // MyAllocList<T>
using MyAllocList = std::list<T, MyAlloc<T>>;  // is synonym for
                                               // std::list<T,
                                               //   MyAlloc<T>>

MyAllocList<Widget> lw;                        // client code

With a typedef, you pretty much have to create the cake from scratch:

template<typename T>                     // MyAllocList<T>::type
struct MyAllocList {                     // is synonym for
  typedef std::list<T, MyAlloc<T>> type; // std::list<T,
};                                       //   MyAlloc<T>>

MyAllocList<Widget>::type lw;            // client code

It gets worse. If you want to use the typedef inside a template for the purpose of creating a linked list holding objects of a type specified by a template parameter, you have to precede the typedef name with typename:

template<typename T>
class Widget {                         // Widget<T> contains
private:                               // a MyAllocList<T>
  typename MyAllocList<T>::type list;  // as a data member
  …
};

Here, MyAllocList<T>::type refers to a type that’s dependent on a template type parameter (T). MyAllocList<T>::type is thus a dependent type, and one of C++’s many endearing rules is that the names of dependent types must be preceded by typename.

If MyAllocList is defined as an alias template, this need for typename vanishes (as does the cumbersome “::type” suffix):

template<typename T>
using MyAllocList = std::list<T, MyAlloc<T>>;  // as before

template<typename T>
class Widget {
private:
  MyAllocList<T> list;                         // no "typename",
  …                                            // no "::type"
};

To you, MyAllocList<T> (i.e., use of the alias template) may look just as dependent on the template parameter T as MyAllocList<T>::type (i.e., use of the nested typedef), but you’re not a compiler. When compilers process the Widget template and encounter the use of MyAllocList<T> (i.e., use of the alias template), they know that MyAllocList<T> is the name of a type, because MyAllocList is an alias template: it must name a type. MyAllocList<T> is thus a non-dependent type, and a typename specifier is neither required nor permitted.

When compilers see MyAllocList<T>::type (i.e., use of the nested typedef) in the Widget template, on the other hand, they can’t know for sure that it names a type, because there might be a specialization of MyAllocList that they haven’t yet seen where MyAllocList<T>::type refers to something other than a type. That sounds crazy, but don’t blame compilers for this possibility. It’s the humans who have been known to produce such code.

 For example, some misguided soul may have concocted something like this:

class Wine { … };

template<>                       // MyAllocList specialization
class MyAllocList<Wine> {        // for when T is Wine
private:
  enum class WineType            // see Item 10 for info on
  { White, Red, Rose };          // "enum class"

  WineType type;                 // in this class, type is
  …                              // a data member!
};

As you can see, MyAllocList<Wine>::type doesn’t refer to a type. If Widget were to be instantiated with Wine, MyAllocList<T>::type inside the Widget template would refer to a data member, not a type. Inside the Widget template, then, whether MyAllocList<T>::type refers to a type is honestly dependent on what T is, and that’s why compilers insist on your asserting that it is a type by preceding it with typename.

If you’ve done any template metaprogramming (TMP), you’ve almost certainly bumped up against the need to take template type parameters and create revised types from them. For example, given some type T, you might want to strip off any const- or reference-qualifiers that T contains, e.g., you might want to turn const std::string& into std::string. Or you might want to add const to a type or turn it into an lvalue reference, e.g., turn Widget into const Widget or into Widget&. (If you haven’t done any TMP, that’s too bad, because if you want to be a truly effective C++ programmer, you need to be familiar with at least the basics of this facet of C++. You can see examples of TMP in action, including the kinds of type transformations I just mentioned, in Items 23 and 27.)

C++11 gives you the tools to perform these kinds of transformations in the form of type traits, an assortment of templates inside the header <type_traits>. There are dozens of type traits in that header, and not all of them perform type transformations, but the ones that do offer a predictable interface. Given a type T to which you’d like to apply a transformation, the resulting type is std::transformation<T>::type. For example:

std::remove_const<T>::type           // yields T from const T

std::remove_reference<T>::type       // yields T from T& and T&&

std::add_lvalue_reference<T>::type   // yields T& from T

The comments merely summarize what these transformations do, so don’t take them too literally. Before using them on a project, you’d look up the precise specifications, I know.

My motivation here isn’t to give you a tutorial on type traits, anyway. Rather, note that application of these transformations entails writing “::type” at the end of each use. If you apply them to a type parameter inside a template (which is virtually always how you employ them in real code), you’d also have to precede each use with typename. The reason for both of these syntactic speed bumps is that the C++11 type traits are implemented as nested typedefs inside templatized structs. That’s right, they’re implemented using the type synonym technology I’ve been trying to convince you is inferior to alias templates!

There’s a historical reason for that, but we’ll skip over it (it’s dull, I promise), because the Standardization Committee belatedly recognized that alias templates are the better way to go, and they included such templates in C++14 for all the C++11 type transformations. The aliases have a common form: for each C++11 transformation std::transformation<T>::type, there’s a corresponding C++14 alias template named std::transformation_t. Examples will clarify what I mean:

std::remove_const<T>::type           // C++11: const T → T
std::remove_const_t<T>               // C++14 equivalent

std::remove_reference<T>::type       // C++11: T&/T&& → T
std::remove_reference_t<T>           // C++14 equivalent

std::add_lvalue_reference<T>::type   // C++11: T → T&
std::add_lvalue_reference_t<T>       // C++14 equivalent

The C++11 constructs remain valid in C++14, but I don’t know why you’d want to use them. Even if you don’t have access to C++14, writing the alias templates yourself is child’s play. Only C++11 language features are required, and even children can mimic a pattern, right? If you happen to have access to an electronic copy of the C++14 Standard, it’s easier still, because all that’s required is some copying and pasting. Here, I’ll get you started:

template <class T>
using remove_const_t = typename remove_const<T>::type;

template <class T>
using remove_reference_t = typename remove_reference<T>::type;

template <class T>
using add_lvalue_reference_t =
  typename add_lvalue_reference<T>::type;

See? Couldn’t be easier.
Things to Remember

    typedefs don’t support templatization, but alias declarations do.

    Alias templates avoid the “::type” suffix and, in templates, the “typename” prefix often required to refer to typedefs.

    C++14 offers alias templates for all the C++11 type traits transformations.
```

#### 35.1.2.1.5 Prefer deleted functions to private undefined ones.

```text
If you’re providing code to other developers, and you want to prevent them from calling a particular function, you generally just don’t declare the function. No function declaration, no function to call. Easy, peasy. But sometimes C++ declares functions for you, and if you want to prevent clients from calling those functions, the peasy isn’t quite so easy any more.

The situation arises only for the “special member functions,” i.e., the member functions that C++ automatically generates when they’re needed. Item 17 discusses these functions in detail, but for now, we’ll worry only about the copy constructor and the copy assignment operator. This chapter is largely devoted to common practices in C++98 that have been superseded by better practices in C++11, and in C++98, if you want to suppress use of a member function, it’s almost always the copy constructor, the assignment operator, or both.

The C++98 approach to preventing use of these functions is to declare them private and not define them. For example, near the base of the iostreams hierarchy in the C++ Standard Library is the class template basic_ios. All istream and ostream classes inherit (possibly indirectly) from this class. Copying istreams and ostreams is undesirable, because it’s not really clear what such operations should do. An istream object, for example, represents a stream of input values, some of which may have already been read, and some of which will potentially be read later. If an istream were to be copied, would that entail copying all the values that had already been read as well as all the values that would be read in the future? The easiest way to deal with such questions is to define them out of existence. Prohibiting the copying of streams does just that.

To render istream and ostream classes uncopyable, basic_ios is specified in C++98 as follows (including the comments):

template <class charT, class traits = char_traits<charT> >
class basic_ios : public ios_base {
public:
  …

private:
  basic_ios(const basic_ios& );            // not defined
  basic_ios& operator=(const basic_ios&);  // not defined
};

Declaring these functions private prevents clients from calling them. Deliberately failing to define them means that if code that still has access to them (i.e., member functions or friends of the class) uses them, linking will fail due to missing function definitions.

In C++11, there’s a better way to achieve essentially the same end: use “= delete” to mark the copy constructor and the copy assignment operator as deleted functions. Here’s the same part of basic_ios as it’s specified in C++11:

template <class charT, class traits = char_traits<charT> >
class basic_ios : public ios_base {
public:
  …
  basic_ios(const basic_ios& ) = delete;
  basic_ios& operator=(const basic_ios&) = delete;
  …
};

The difference between deleting these functions and declaring them private may seem more a matter of fashion than anything else, but there’s greater substance here than you might think. Deleted functions may not be used in any way, so even code that’s in member and friend functions will fail to compile if it tries to copy basic_ios objects. That’s an improvement over the C++98 behavior, where such improper usage wouldn’t be diagnosed until link-time.

By convention, deleted functions are declared public, not private. There’s a reason for that. When client code tries to use a member function, C++ checks accessibility before deleted status. When client code tries to use a deleted private function, some compilers complain only about the function being private, even though the function’s accessibility doesn’t really affect whether it can be used. It’s worth bearing this in mind when revising legacy code to replace private-and-not-defined member functions with deleted ones, because making the new functions public will generally result in better error messages.

An important advantage of deleted functions is that any function may be deleted, while only member functions may be private. For example, suppose we have a non-member function that takes an integer and returns whether it’s a lucky number:

bool isLucky(int number);

C++’s C heritage means that pretty much any type that can be viewed as vaguely numerical will implicitly convert to int, but some calls that would compile might not make sense:

if (isLucky('a')) …            // is 'a' a lucky number?

if (isLucky(true)) …           // is "true"?

if (isLucky(3.5)) …            // should we truncate to 3
                               // before checking for luckiness?

If lucky numbers must really be integers, we’d like to prevent calls such as these from compiling.

One way to accomplish that is to create deleted overloads for the types we want to filter out:

bool isLucky(int number);            // original function

bool isLucky(char) = delete;         // reject chars

bool isLucky(bool) = delete;         // reject bools

bool isLucky(double) = delete;       // reject doubles and
                                     // floats

(The comment on the double overload that says that both doubles and floats will be rejected may surprise you, but your surprise will dissipate once you recall that, given a choice between converting a float to an int or to a double, C++ prefers the conversion to double. Calling isLucky with a float will therefore call the double overload, not the int one. Well, it’ll try to. The fact that that overload is deleted will prevent the call from compiling.)

Although deleted functions can’t be used, they are part of your program. As such, they are taken into account during overload resolution. That’s why, with the deleted function declarations above, the undesirable calls to isLucky will be rejected:

if (isLucky('a')) …           // error! call to deleted function

if (isLucky(true)) …          // error!

if (isLucky(3.5f)) …          // error!

Another trick that deleted functions can perform (and that private member functions can’t) is to prevent use of template instantiations that should be disabled. For example, suppose you need a template that works with built-in pointers (Chapter 4’s advice to prefer smart pointers to raw pointers notwithstanding):

template<typename T>
void processPointer(T* ptr);

There are two special cases in the world of pointers. One is void* pointers, because there is no way to dereference them, to increment or decrement them, etc. The other is char* pointers, because they typically represent pointers to C-style strings, not pointers to individual characters. These special cases often call for special handling, and, in the case of the processPointer template, let’s assume the proper handling is to reject calls using those types. That is, it should not be possible to call processPointer with void* or char* pointers.

That’s easily enforced. Just delete those instantiations:

template<>
void processPointer<void>(void*) = delete;

template<>
void processPointer<char>(char*) = delete;

Now, if calling processPointer with a void* or a char* is invalid, it’s probably also invalid to call it with a const void* or a const char*, so those instantiations will typically need to be deleted, too:

template<>
void processPointer<const void>(const void*) = delete;

template<>
void processPointer<const char>(const char*) = delete;

And if you really want to be thorough, you’ll also delete the const volatile void* and const volatile char* overloads, and then you’ll get to work on the overloads for pointers to the other standard character types: wchar_t, char16_t, and char32_t.

Interestingly, if you have a function template inside a class, and you’d like to disable some instantiations by declaring them private (à la classic C++98 convention), you can’t, because it’s not possible to give a member function template specialization a different access level from that of the main template. If processPointer were a member function template inside Widget, for example, and you wanted to disable calls for void* pointers, this would be the C++98 approach, though it would not compile:

class Widget {
public:
  …
  template<typename T>
  void processPointer(T* ptr)
  { … }

private:
  template<>                                 // error!
  void processPointer<void>(void*);

};

The problem is that template specializations must be written at namespace scope, not class scope. This issue doesn’t arise for deleted functions, because they don’t need a different access level. They can be deleted outside the class (hence at namespace scope):

class Widget {
public:
  …
  template<typename T>
  void processPointer(T* ptr)
  { … }
  …

};

template<>                                          // still
void Widget::processPointer<void>(void*) = delete;  // public,
                                                    // but
                                                    // deleted

The truth is that the C++98 practice of declaring functions private and not defining them was really an attempt to achieve what C++11’s deleted functions actually accomplish. As an emulation, the C++98 approach is not as good as the real thing. It doesn’t work outside classes, it doesn’t always work inside classes, and when it does work, it may not work until link-time. So stick to deleted functions.
Things to Remember

    Prefer deleted functions to private undefined ones.

    Any function may be deleted, including non-member functions and template instantiations.
```

#### 35.1.2.1.6 Declare overriding functions override.

```text
The world of object-oriented programming in C++ revolves around classes, inheritance, and virtual functions. Among the most fundamental ideas in this world is that virtual function implementations in derived classes override the implementations of their base class counterparts. It’s disheartening, then, to realize just how easily virtual function overriding can go wrong. It’s almost as if this part of the language were designed with the idea that Murphy’s Law wasn’t just to be obeyed, it was to be honored.

Because “overriding” sounds a lot like “overloading,” yet is completely unrelated, let me make clear that virtual function overriding is what makes it possible to invoke a derived class function through a base class interface:

class Base {
public:
  virtual void doWork();         // base class virtual function
  …
};

class Derived: public Base {
public:
  virtual void doWork();         // overrides Base::doWork
  …                              // ("virtual" is optional
};                               // here)

std::unique_ptr<Base> upb =      // create base class pointer
  std::make_unique<Derived>();   // to derived class object;
                                 // see Item 21 for info on
…                                // std::make_unique

upb->doWork();                   // call doWork through base
                                 // class ptr; derived class
                                 // function is invoked

For overriding to occur, several requirements must be met:

    The base class function must be virtual.

    The base and derived function names must be identical (except in the case of destructors).

    The parameter types of the base and derived functions must be identical.

    The constness of the base and derived functions must be identical.

    The return types and exception specifications of the base and derived functions must be compatible.

To these constraints, which were also part of C++98, C++11 adds one more:

    The functions’ reference qualifiers must be identical. Member function reference qualifiers are one of C++11’s less-publicized features, so don’t be surprised if you’ve never heard of them. They make it possible to limit use of a member function to lvalues only or to rvalues only. Member functions need not be virtual to use them:

    class Widget {
    public:
      …
      void doWork() &;       // this version of doWork applies
                             // only when *this is an lvalue

      void doWork() &&;      // this version of doWork applies
    };                       // only when *this is an rvalue

    …

    Widget makeWidget();     // factory function (returns rvalue)

    Widget w;                // normal object (an lvalue)

    …

    w.doWork();              // calls Widget::doWork for lvalues
                             // (i.e., Widget::doWork &)

    makeWidget().doWork();   // calls Widget::doWork for rvalues
                             // (i.e., Widget::doWork &&)

    I’ll say more about member functions with reference qualifiers later, but for now, simply note that if a virtual function in a base class has a reference qualifier, derived class overrides of that function must have exactly the same reference qualifier. If they don’t, the declared functions will still exist in the derived class, but they won’t override anything in the base class.

All these requirements for overriding mean that small mistakes can make a big difference. Code containing overriding errors is typically valid, but its meaning isn’t what you intended. You therefore can’t rely on compilers notifying you if you do something wrong. For example, the following code is completely legal and, at first sight, looks reasonable, but it contains no virtual function overrides—not a single derived class function that is tied to a base class function. Can you identify the problem in each case, i.e., why each derived class function doesn’t override the base class function with the same name?

class Base {
public:
  virtual void mf1() const;
  virtual void mf2(int x);
  virtual void mf3() &;
  void mf4() const;
};

class Derived: public Base {
public:
  virtual void mf1();
  virtual void mf2(unsigned int x);
  virtual void mf3() &&;
  void mf4() const;
};

Need some help?

    mf1 is declared const in Base, but not in Derived.

    mf2 takes an int in Base, but an unsigned int in Derived.

    mf3 is lvalue-qualified in Base, but rvalue-qualified in Derived.

    mf4 isn’t declared virtual in Base.

You may think, “Hey, in practice, these things will elicit compiler warnings, so I don’t need to worry.” Maybe that’s true. But maybe it’s not. With two of the compilers I checked, the code was accepted without complaint, and that was with all warnings enabled. (Other compilers provided warnings about some of the issues, but not all of them.)

Because declaring derived class overrides is important to get right, but easy to get wrong, C++11 gives you a way to make explicit that a derived class function is supposed to override a base class version: declare it override. Applying this to the example above would yield this derived class:

class Derived: public Base {
public:
  virtual void mf1() override;
  virtual void mf2(unsigned int x) override;
  virtual void mf3() && override;
  virtual void mf4() const override;
};

This won’t compile, of course, because when written this way, compilers will kvetch about all the overriding-related problems. That’s exactly what you want, and it’s why you should declare all your overriding functions override.

The code using override that does compile looks as follows (assuming that the goal is for all functions in Derived to override virtuals in Base):

class Base {
public:
  virtual void mf1() const;
  virtual void mf2(int x);
  virtual void mf3() &;
  virtual void mf4() const;
};

class Derived: public Base {
public:
  virtual void mf1() const override;
  virtual void mf2(int x) override;
  virtual void mf3() & override;
  void mf4() const override;          // adding "virtual" is OK,
};                                    // but not necessary

Note that in this example, part of getting things to work involves declaring mf4 virtual in Base. Most overriding-related errors occur in derived classes, but it’s possible for things to be incorrect in base classes, too.

A policy of using override on all your derived class overrides can do more than just enable compilers to tell you when would-be overrides aren’t overriding anything. It can also help you gauge the ramifications if you’re contemplating changing the signature of a virtual function in a base class. If derived classes use override everywhere, you can just change the signature, recompile your system, see how much damage you’ve caused (i.e., how many derived classes fail to compile), then decide whether the signature change is worth the trouble. Without override, you’d have to hope you have comprehensive unit tests in place, because, as we’ve seen, derived class virtuals that are supposed to override base class functions, but don’t, need not elicit compiler diagnostics.

C++ has always had keywords, but C++11 introduces two contextual keywords, override and final.2 These keywords have the characteristic that they are reserved, but only in certain contexts. In the case of override, it has a reserved meaning only when it occurs at the end of a member function declaration. That means that if you have legacy code that already uses the name override, you don’t need to change it for C++11:

class Warning {           // potential legacy class from C++98
public:
  …
  void override();        // legal in both C++98 and C++11
  …                       // (with the same meaning)
};

That’s all there is to say about override, but it’s not all there is to say about member function reference qualifiers. I promised I’d provide more information on them later, and now it’s later.

If we want to write a function that accepts only lvalue arguments, we declare a non-const lvalue reference parameter:

void doSomething(Widget& w);      // accepts only lvalue Widgets

If we want to write a function that accepts only rvalue arguments, we declare an rvalue reference parameter:

void doSomething(Widget&& w);     // accepts only rvalue Widgets

Member function reference qualifiers simply make it possible to draw the same distinction for the object on which a member function is invoked, i.e., *this. It’s precisely analogous to the const at the end of a member function declaration, which indicates that the object on which the member function is invoked (i.e., *this) is const.

The need for reference-qualified member functions is not common, but it can arise. For example, suppose our Widget class has a std::vector data member, and we offer an accessor function that gives clients direct access to it:

class Widget {
public:
  using DataType = std::vector<double>;      // see Item 9 for
  …                                          // info on "using"

  DataType& data() { return values; }
  …

private:
  DataType values;
};

This is hardly the most encapsulated design that’s seen the light of day, but set that aside and consider what happens in this client code:

Widget w;
…

auto vals1 = w.data();               // copy w.values into vals1

The return type of Widget::data is an lvalue reference (a std::vector<double>&, to be precise), and because lvalue references are defined to be lvalues, we’re initializing vals1 from an lvalue. vals1 is thus copy constructed from w.values, just as the comment says.

Now suppose we have a factory function that creates Widgets,

Widget makeWidget();

and we want to initialize a variable with the std::vector inside the Widget returned from makeWidget:

auto vals2 = makeWidget().data();    // copy values inside the
                                     // Widget into vals2

Again, Widgets::data returns an lvalue reference, and, again, the lvalue reference is an lvalue, so, again, our new object (vals2) is copy constructed from values inside the Widget. This time, though, the Widget is the temporary object returned from makeWidget (i.e., an rvalue), so copying the std::vector inside it is a waste of time. It’d be preferable to move it, but, because data is returning an lvalue reference, the rules of C++ require that compilers generate code for a copy. (There’s some wiggle room for optimization through what is known as the “as if rule,” but you’d be foolish to rely on your compilers finding a way to take advantage of it.)

What’s needed is a way to specify that when data is invoked on an rvalue Widget, the result should also be an rvalue. Using reference qualifiers to overload data for lvalue and rvalue Widgets makes that possible:

class Widget {
public:
  using DataType = std::vector<double>;
  …

  DataType& data() &                // for lvalue Widgets, 
  { return values; }                // return lvalue

  DataType&& data() &&              // for rvalue Widgets,
  { return std::move(values); }     // return rvalue
  …

private:
  DataType values;
};

Notice the differing return types from the data overloads. The lvalue reference overload returns an lvalue reference (i.e., an lvalue), and the rvalue reference overload returns an rvalue reference (which, as a function return type, is an rvalue). This means that client code now behaves as we’d like:

auto vals1 = w.data();             // calls lvalue overload for
                                   // Widget::data, copy-
                                   // constructs vals1

auto vals2 = makeWidget().data();  // calls rvalue overload for
                                   // Widget::data, move-
                                   // constructs vals2

This is certainly nice, but don’t let the warm glow of this happy ending distract you from the true point of this Item. That point is that whenever you declare a function in a derived class that’s meant to override a virtual function in a base class, be sure to declare that function override.

By the way, if a member function is reference qualified, all overloads of that function must be reference qualified. That’s because a non-reference-qualified overload may be invoked on both lvalue and rvalue objects. Such an overload would compete with reference-qualified overloads, and all calls to the function would be ambiguous.
Things to Remember

    Declare overriding functions override.

    Member function reference qualifiers make it possible to treat lvalue and rvalue objects (*this) differently.
```

#### 35.1.2.1.7 Prefer const_iterators to iterators.

```text
const_iterators are the STL equivalent of pointers-to-const. They point to values that may not be modified. The standard practice of using const whenever possible dictates that you should use const_iterators any time you need an iterator, yet have no need to modify what the iterator points to.

That’s as true for C++98 as for C++11, but in C++98, const_iterators had only halfhearted support. It wasn’t that easy to create them, and once you had one, the ways you could use it were limited. For example, suppose you want to search a std::vector<int> for the first occurrence of 1983 (the year “C++” replaced “C with Classes” as the name of the programming language), then insert the value 1998 (the year the first ISO C++ Standard was adopted) at that location. If there’s no 1983 in the vector, the insertion should go at the end of the vector. Using iterators in C++98, that was easy:

std::vector<int> values;

…

std::vector<int>::iterator it =
  std::find(values.begin(),values.end(), 1983);
values.insert(it, 1998);

But iterators aren’t really the proper choice here, because this code never modifies what an iterator points to. Revising the code to use const_iterators should be trivial, but in C++98, it was anything but. Here’s one approach that’s conceptually sound, though still not correct:

typedef std::vector<int>::iterator IterT;             // type-
typedef std::vector<int>::const_iterator ConstIterT;  // defs

std::vector<int> values;

…

ConstIterT ci =
  std::find(static_cast<ConstIterT>(values.begin()),  // cast
            static_cast<ConstIterT>(values.end()),    // cast
            1983);

values.insert(static_cast<IterT>(ci), 1998);    // may not
                                                // compile; see
                                                // below

The typedefs aren’t required, of course, but they make the casts in the code easier to write. (If you’re wondering why I’m showing typedefs instead of following the advice of Item 9 to use alias declarations, it’s because this example shows C++98 code, and alias declarations are a feature new to C++11.)

The casts in the call to std::find are present because values is a non-const container and in C++98, there was no simple way to get a const_iterator from a non-const container. The casts aren’t strictly necessary, because it was possible to get const_iterators in other ways (e.g., you could bind values to a reference-to-const variable, then use that variable in place of values in your code), but one way or another, the process of getting const_iterators to elements of a non-const container involved some amount of contorting.

Once you had the const_iterators, matters often got worse, because in C++98, locations for insertions (and erasures) could be specified only by iterators. const_iterators weren’t acceptable. That’s why, in the code above, I cast the const_iterator (that I was so careful to get from std::find) into an iterator: passing a const_iterator to insert wouldn’t compile.

To be honest, the code I’ve shown might not compile, either, because there’s no portable conversion from a const_iterator to an iterator, not even with a static_cast. Even the semantic sledgehammer known as reinterpret_cast can’t do the job. (That’s not a C++98 restriction. It’s true in C++11, too. const_iterators simply don’t convert to iterators, no matter how much it might seem like they should.) There are some portable ways to generate iterators that point where const_iterators do, but they’re not obvious, not universally applicable, and not worth discussing in this book. Besides, I hope that by now my point is clear: const_iterators were so much trouble in C++98, they were rarely worth the bother. At the end of the day, developers don’t use const whenever possible, they use it whenever practical, and in C++98, const_iterators just weren’t very practical.

All that changed in C++11. Now const_iterators are both easy to get and easy to use. The container member functions cbegin and cend produce const_iterators, even for non-const containers, and STL member functions that use iterators to identify positions (e.g., insert and erase) actually use const_iterators. Revising the original C++98 code that uses iterators to use const_iterators in C++11 is truly trivial:

std::vector<int> values;                           // as before

…

auto it =                                          // use cbegin
  std::find(values.cbegin(),values.cend(), 1983);  // and cend

values.insert(it, 1998);

Now that’s code using const_iterators that’s practical!

About the only situation in which C++11’s support for const_iterators comes up a bit short is when you want to write maximally generic library code. Such code takes into account that some containers and container-like data structures offer begin and end (plus cbegin, cend, rbegin, etc.) as non-member functions, rather than members. This is the case for built-in arrays, for example, and it’s also the case for some third-party libraries with interfaces consisting only of free functions. Maximally generic code thus uses non-member functions rather than assuming the existence of member versions.

For example, we could generalize the code we’ve been working with into a findAndInsert template as follows:

template<typename C, typename V>
void findAndInsert(C& container,          // in container, find
                   const V& targetVal,    // first occurrence
                   const V& insertVal)    // of targetVal, then
{                                         // insert insertVal
  using std::cbegin;                      // there
  using std::cend;

  auto it = std::find(cbegin(container),  // non-member cbegin
                      cend(container),    // non-member cend
                      targetVal);

  container.insert(it, insertVal);
}

This works fine in C++14, but, sadly, not in C++11. Through an oversight during standardization, C++11 added the non-member functions begin and end, but it failed to add cbegin, cend, rbegin, rend, crbegin, and crend. C++14 rectifies that oversight.

If you’re using C++11, you want to write maximally generic code, and none of the libraries you’re using provides the missing templates for non-member cbegin and friends, you can throw your own implementations together with ease. For example, here’s an implementation of non-member cbegin:

template <class C>
auto cbegin(const C& container)->decltype(std::begin(container))
{
  return std::begin(container);         // see explanation below
}

You’re surprised to see that non-member cbegin doesn’t call member cbegin, aren’t you? So was I. But follow the logic. This cbegin template accepts any type of argument representing a container-like data structure, C, and it accesses this argument through its reference-to-const parameter, container. If C is a conventional container type (e.g., a std::vector<int>), container will be a reference to a const version of that container (e.g., a const std::vector<int>&). Invoking the non-member begin function (provided by C++11) on a const container yields a const_iterator, and that iterator is what this template returns. The advantage of implementing things this way is that it works even for containers that offer a begin member function (which, for containers, is what C++11’s non-member begin calls), but fail to offer a cbegin member. You can thus use this non-member cbegin on containers that directly support only begin.

This template also works if C is a built-in array type. In that case, container becomes a reference to a const array. C++11 provides a specialized version of non-member begin for arrays that returns a pointer to the array’s first element. The elements of a const array are const, so the pointer that non-member begin returns for a const array is a pointer-to-const, and a pointer-to-const is, in fact, a const_iterator for an array. (For insight into how a template can be specialized for built-in arrays, consult Item 1’s discussion of type deduction in templates that take reference parameters to arrays.)

But back to basics. The point of this Item is to encourage you to use const_iterators whenever you can. The fundamental motivation—using const whenever it’s meaningful—predates C++11, but in C++98, it simply wasn’t practical when working with iterators. In C++11, it’s eminently practical, and C++14 tidies up the few bits of unfinished business that C++11 left behind.
Things to Remember

    Prefer const_iterators to iterators.

    In maximally generic code, prefer non-member versions of begin, end, rbegin, etc., over their member function counterparts.
```

#### 35.1.2.1.8 Declare functions noexcept if they won’t emit exceptions.

```text
In C++98, exception specifications were rather temperamental beasts. You had to summarize the exception types a function might emit, so if the function’s implementation was modified, the exception specification might require revision, too. Changing an exception specification could break client code, because callers might be dependent on the original exception specification. Compilers typically offered no help in maintaining consistency among function implementations, exception specifications, and client code. Most programmers ultimately decided that C++98 exception specifications weren’t worth the trouble.

During work on C++11, a consensus emerged that the truly meaningful information about a function’s exception-emitting behavior was whether it had any. Black or white, either a function might emit an exception or it guaranteed that it wouldn’t. This maybe-or-never dichotomy forms the basis of C++11’s exception specifications, which essentially replace C++98’s. (C++98-style exception specifications remain valid, but they’re deprecated.) In C++11, unconditional noexcept is for functions that guarantee they won’t emit exceptions.

Whether a function should be so declared is a matter of interface design. The exception-emitting behavior of a function is of key interest to clients. Callers can query a function’s noexcept status, and the results of such a query can affect the exception safety or efficiency of the calling code. As such, whether a function is noexcept is as important a piece of information as whether a member function is const. Failure to declare a function noexcept when you know that it won’t emit an exception is simply poor interface specification.

But there’s an additional incentive to apply noexcept to functions that won’t produce exceptions: it permits compilers to generate better object code. To understand why, it helps to examine the difference between the C++98 and C++11 ways of saying that a function won’t emit exceptions. Consider a function f that promises callers they’ll never receive an exception. The two ways of expressing that are:

int f(int x) throw();     // no exceptions from f: C++98 style

int f(int x) noexcept;    // no exceptions from f: C++11 style

If, at runtime, an exception leaves f, f’s exception specification is violated. With the C++98 exception specification, the call stack is unwound to f’s caller, and, after some actions not relevant here, program execution is terminated. With the C++11 exception specification, runtime behavior is slightly different: the stack is only possibly unwound before program execution is terminated.

The difference between unwinding the call stack and possibly unwinding it has a surprisingly large impact on code generation. In a noexcept function, optimizers need not keep the runtime stack in an unwindable state if an exception would propagate out of the function, nor must they ensure that objects in a noexcept function are destroyed in the inverse order of construction should an exception leave the function. Functions with “throw()” exception specifications lack such optimization flexibility, as do functions with no exception specification at all. The situation can be summarized this way:

RetType function(params) noexcept;     // most optimizable

RetType function(params) throw();      // less optimizable

RetType function(params);              // less optimizable

This alone is sufficient reason to declare functions noexcept whenever you know they won’t produce exceptions.

For some functions, the case is even stronger. The move operations are the preeminent example. Suppose you have a C++98 code base making use of a std::vector<Widget>. Widgets are added to the std::vector from time to time via push_back:

std::vector<Widget> vw;

…

Widget w;

…                        // work with w

vw.push_back(w);         // add w to vw

…

Assume this code works fine, and you have no interest in modifying it for C++11. However, you do want to take advantage of the fact that C++11’s move semantics can improve the performance of legacy code when move-enabled types are involved. You therefore ensure that Widget has move operations, either by writing them yourself or by seeing to it that the conditions for their automatic generation are fulfilled (see Item 17).

When a new element is added to a std::vector, it’s possible that the std::vector lacks space for it, i.e., that the std::vector’s size is equal to its capacity. When that happens, the std::vector allocates a new, larger, chunk of memory to hold its elements, and it transfers the elements from the existing chunk of memory to the new one. In C++98, the transfer was accomplished by copying each element from the old memory to the new memory, then destroying the objects in the old memory. This approach enabled push_back to offer the strong exception safety guarantee: if an exception was thrown during the copying of the elements, the state of the std::vector remained unchanged, because none of the elements in the old memory were destroyed until all elements had been successfully copied into the new memory.

In C++11, a natural optimization would be to replace the copying of std::vector elements with moves. Unfortunately, doing this runs the risk of violating push_back’s exception safety guarantee. If n elements have been moved from the old memory and an exception is thrown moving element n+1, the push_back operation can’t run to completion. But the original std::vector has been modified: n of its elements have been moved from. Restoring their original state may not be possible, because attempting to move each object back into the original memory may itself yield an exception.

This is a serious problem, because the behavior of legacy code could depend on push_back’s strong exception safety guarantee. Therefore, C++11 implementations can’t silently replace copy operations inside push_back with moves unless it’s known that the move operations won’t emit exceptions. In that case, having moves replace copies would be safe, and the only side effect would be improved performance.

std::vector::push_back takes advantage of this “move if you can, but copy if you must” strategy, and it’s not the only function in the Standard Library that does. Other functions sporting the strong exception safety guarantee in C++98 (e.g., std::vector::reserve, std::deque::insert, etc.) behave the same way. All these functions replace calls to copy operations in C++98 with calls to move operations in C++11 only if the move operations are known to not emit exceptions. But how can a function know if a move operation won’t produce an exception? The answer is obvious: it checks to see if the operation  is declared noexcept.3

swap functions comprise another case where noexcept is particularly desirable. swap is a key component of many STL algorithm implementations, and it’s commonly employed in copy assignment operators, too. Its widespread use renders the optimizations that noexcept affords especially worthwhile. Interestingly, whether swaps in the Standard Library are noexcept is sometimes dependent on whether user-defined swaps are noexcept. For example, the declarations for the Standard Library’s swaps for arrays and std::pair are:

template <class T, size_t N>
void swap(T (&a)[N],                                    // see
          T (&b)[N]) noexcept(noexcept(swap(*a, *b)));  // below

template <class T1, class T2>
struct pair {
  …
  void swap(pair& p) noexcept(noexcept(swap(first, p.first)) &&
                              noexcept(swap(second, p.second)));
  …
};

These functions are conditionally noexcept: whether they are noexcept depends on whether the expressions inside the noexcept clauses are noexcept. Given two arrays of Widget, for example, swapping them is noexcept only if swapping individual elements in the arrays is noexcept, i.e., if swap for Widget is noexcept. The author of Widget’s swap thus determines whether swapping arrays of Widget is noexcept. That, in turn, determines whether other swaps, such as the one for arrays of arrays of Widget, are noexcept. Similarly, whether swapping two std::pair objects containing Widgets is noexcept depends on whether swap for Widgets is noexcept. The fact that swapping higher-level data structures can generally be noexcept only if swapping their lower-level constituents is noexcept should motivate you to offer noexcept swap functions whenever you can.

By now, I hope you’re excited about the optimization opportunities that noexcept affords. Alas, I must temper your enthusiasm. Optimization is important, but correctness is more important. I noted at the beginning of this Item that noexcept is part of a function’s interface, so you should declare a function noexcept only if you are willing to commit to a noexcept implementation over the long term. If you declare a function noexcept and later regret that decision, your options are bleak. You can remove noexcept from the function’s declaration (i.e., change its interface), thus running the risk of breaking client code. You can change the implementation such that an exception could escape, yet keep the original (now incorrect) exception specification. If you do that, your program will be terminated if an exception tries to leave the function. Or you can resign yourself to your existing implementation, abandoning whatever kindled your desire to change the implementation in the first place. None of these options is appealing.

The fact of the matter is that most functions are exception-neutral. Such functions throw no exceptions themselves, but functions they call might emit one. When that happens, the exception-neutral function allows the emitted exception to pass through on its way to a handler further up the call chain. Exception-neutral functions are never noexcept, because they may emit such “just passing through” exceptions. Most functions, therefore, quite properly lack the noexcept designation.

Some functions, however, have natural implementations that emit no exceptions, and for a few more—notably the move operations and swap—being noexcept can have such a significant payoff, it’s worth implementing them in a noexcept manner if at all possible.4 When you can honestly say that a function should never emit exceptions, you should definitely declare it noexcept.

Please note that I said some functions have natural noexcept implementations. Twisting a function’s implementation to permit a noexcept declaration is the tail wagging the dog. Is putting the cart before the horse. Is not seeing the forest for the trees. Is…choose your favorite metaphor. If a straightforward function implementation might yield exceptions (e.g., by invoking a function that might throw), the hoops you’ll jump through to hide that from callers (e.g., catching all exceptions and replacing them with status codes or special return values) will not only complicate your function’s implementation, it will typically complicate code at call sites, too. For example, callers may have to check for status codes or special return values. The runtime cost of those complications (e.g., extra branches, larger functions that put more pressure on instruction caches, etc.) could exceed any speedup you’d hope to achieve via noexcept, plus you’d be saddled with source code that’s more difficult to comprehend and maintain. That’d be poor software engineering.

For some functions, being noexcept is so important, they’re that way by default. In C++98, it was considered bad style to permit the memory deallocation functions (i.e., operator delete and operator delete[]) and destructors to emit exceptions, and in C++11, this style rule has been all but upgraded to a language rule. By default, all memory deallocation functions and all destructors—both user-defined and compiler-generated—are implicitly noexcept. There’s thus no need to declare them noexcept. (Doing so doesn’t hurt anything, it’s just unconventional.) The only time a destructor is not implicitly noexcept is when a data member of the class (including inherited members and those contained inside other data members) is of a type that expressly states that its destructor may emit exceptions (e.g., declares it “noexcept(false)”). Such destructors are uncommon. There are none in the Standard Library, and if the destructor for an object being used by the Standard Library (e.g., because it’s in a container or was passed to an algorithm) emits an exception, the behavior of the program is undefined.

It’s worth noting that some library interface designers distinguish functions with wide contracts from those with narrow contracts. A function with a wide contract has no preconditions. Such a function may be called regardless of the state of the program, and it imposes no constraints on the arguments that callers pass it.5 Functions with wide contracts never exhibit undefined behavior.

Functions without wide contracts have narrow contracts. For such functions, if a precondition is violated, results are undefined.

If you’re writing a function with a wide contract and you know it won’t emit exceptions, following the advice of this Item and declaring it noexcept is easy. For functions with narrow contracts, the situation is trickier. For example, suppose you’re writing a function f taking a std::string parameter, and suppose f’s natural implementation never yields an exception. That suggests that f should be declared noexcept.

Now suppose that f has a precondition: the length of its std::string parameter doesn’t exceed 32 characters. If f were to be called with a std::string whose length is greater than 32, behavior would be undefined, because a precondition violation by definition results in undefined behavior. f is under no obligation to check this precondition, because functions may assume that their preconditions are satisfied. (Callers are responsible for ensuring that such assumptions are valid.) Even with a precondition, then, declaring f noexcept seems appropriate:

void f(const std::string& s) noexcept;    // precondition:
                                          // s.length() <= 32

But suppose that f’s implementer chooses to check for precondition violations. Checking isn’t required, but it’s also not forbidden, and checking the precondition could be useful, e.g., during system testing. Debugging an exception that’s been thrown is generally easier than trying to track down the cause of undefined behavior. But how should a precondition violation be reported such that a test harness or a client error handler could detect it? A straightforward approach would be to throw a “precondition was violated” exception, but if f is declared noexcept, that would be impossible; throwing an exception would lead to program termination. For this reason, library designers who distinguish wide from narrow contracts generally reserve noexcept for functions with wide contracts.

As a final point, let me elaborate on my earlier observation that compilers typically offer no help in identifying inconsistencies between function implementations and their exception specifications. Consider this code, which is perfectly legal:

void setup();           // functions defined elsewhere
void cleanup();

void doWork() noexcept
{
  setup();              // set up work to be done

  …                     // do the actual work

  cleanup();            // perform cleanup actions
}

Here, doWork is declared noexcept, even though it calls the non-noexcept functions setup and cleanup. This seems contradictory, but it could be that setup and cleanup document that they never emit exceptions, even though they’re not declared that way. There could be good reasons for their non-noexcept declarations. For example, they might be part of a library written in C. (Even functions from the C Standard Library that have been moved into the std namespace lack exception specifications, e.g., std::strlen isn’t declared noexcept.) Or they could be part of a C++98 library that decided not to use C++98 exception specifications and hasn’t yet been revised for C++11.

Because there are legitimate reasons for noexcept functions to rely on code lacking the noexcept guarantee, C++ permits such code, and compilers generally don’t issue warnings about it.
Things to Remember

    noexcept is part of a function’s interface, and that means that callers may depend on it.

    noexcept functions are more optimizable than non-noexcept functions.

    noexcept is particularly valuable for the move operations, swap, memory deallocation functions, and destructors.

    Most functions are exception-neutral rather than noexcept.
```

#### 35.1.2.1.9 Use constexpr whenever possible.

```text
If there were an award for the most confusing new word in C++11, constexpr would probably win it. When applied to objects, it’s essentially a beefed-up form of const, but when applied to functions, it has a quite different meaning. Cutting through the confusion is worth the trouble, because when constexpr corresponds to what you want to express, you definitely want to use it.

Conceptually, constexpr indicates a value that’s not only constant, it’s known during compilation. The concept is only part of the story, though, because when constexpr is applied to functions, things are more nuanced than this suggests. Lest I ruin the surprise ending, for now I’ll just say that you can’t assume that the results of constexpr functions are const, nor can you take for granted that their values are known during compilation. Perhaps most intriguingly, these things are features. It’s good that constexpr functions need not produce results that are const or known during compilation!

But let’s begin with constexpr objects. Such objects are, in fact, const, and they do, in fact, have values that are known at compile time. (Technically, their values are determined during translation, and translation consists not just of compilation but also of linking. Unless you write compilers or linkers for C++, however, this has no effect on you, so you can blithely program as if the values of constexpr objects were determined during compilation.)

Values known during compilation are privileged. They may be placed in read-only memory, for example, and, especially for developers of embedded systems, this can be a feature of considerable importance. Of broader applicability is that integral values that are constant and known during compilation can be used in contexts where C++ requires an integral constant expression. Such contexts include specification of array sizes, integral template arguments (including lengths of std::array objects), enumerator values, alignment specifiers, and more. If you want to use a variable for these kinds of things, you certainly want to declare it constexpr, because then compilers will ensure that it has a compile-time value:

int sz;                             // non-constexpr variable

…

constexpr auto arraySize1 = sz;     // error! sz's value not
                                    // known at compilation

std::array<int, sz> data1;          // error! same problem

constexpr auto arraySize2 = 10;     // fine, 10 is a
                                    // compile-time constant

std::array<int, arraySize2> data2;  // fine, arraySize2
                                    // is constexpr

Note that const doesn’t offer the same guarantee as constexpr, because const objects need not be initialized with values known during compilation:

int sz;                             // as before

…

const auto arraySize = sz;          // fine, arraySize is
                                    // const copy of sz

std::array<int, arraySize> data;    // error! arraySize's value
                                    // not known at compilation

Simply put, all constexpr objects are const, but not all const objects are constexpr. If you want compilers to guarantee that a variable has a value that can be used in contexts requiring compile-time constants, the tool to reach for is constexpr, not const.

Usage scenarios for constexpr objects become more interesting when constexpr functions are involved. Such functions produce compile-time constants when they are called with compile-time constants. If they’re called with values not known until runtime, they produce runtime values. This may sound as if you don’t know what they’ll do, but that’s the wrong way to think about it. The right way to view it is this:

    constexpr functions can be used in contexts that demand compile-time constants. If the values of the arguments you pass to a constexpr function in such a context are known during compilation, the result will be computed during compilation. If any of the arguments’ values is not known during compilation, your code will be rejected.

    When a constexpr function is called with one or more values that are not known during compilation, it acts like a normal function, computing its result at runtime. This means you don’t need two functions to perform the same operation, one for compile-time constants and one for all other values. The constexpr function does it all.

Suppose we need a data structure to hold the results of an experiment that can be run in a variety of ways. For example, the lighting level can be high, low, or off during the course of the experiment, as can the fan speed and the temperature, etc. If there are n environmental conditions relevant to the experiment, each of which has three possible states, the number of combinations is 3n. Storing experimental results for all combinations of conditions thus requires a data structure with enough room for 3n values. Assuming each result is an int and that n is known (or can be computed) during compilation, a std::array could be a reasonable data structure choice. But we’d need a way to compute 3n during compilation. The C++ Standard Library provides std::pow, which is the mathematical functionality we need, but, for our purposes, there are two problems with it. First, std::pow works on floating-point types, and we need an integral result. Second, std::pow isn’t constexpr (i.e., isn’t guaranteed to return a compile-time result when called with compile-time values), so we can’t use it to specify a std::array’s size.

Fortunately, we can write the pow we need. I’ll show how to do that in a moment, but first let’s look at how it could be declared and used:

constexpr                              // pow's a constexpr func
int pow(int base, int exp) noexcept    // that never throws
{
  …                                    // impl is below
}

constexpr auto numConds = 5;                 // # of conditions

std::array<int, pow(3, numConds)> results;   // results has
                                             // 3^numConds
                                             // elements

Recall that the constexpr in front of pow doesn’t say that pow returns a const value, it says that if base and exp are compile-time constants, pow’s result may be used as a compile-time constant. If base and/or exp are not compile-time constants, pow’s result will be computed at runtime. That means that pow can not only be called to do things like compile-time-compute the size of a std::array, it can also be called in runtime contexts such as this:

auto base = readFromDB("base");       // get these values
auto exp = readFromDB("exponent");    // at runtime

auto baseToExp = pow(base, exp);      // call pow function
                                      // at runtime

Because constexpr functions must be able to return compile-time results when called with compile-time values, restrictions are imposed on their implementations. The restrictions differ between C++11 and C++14.

In C++11, constexpr functions may contain no more than a single executable statement: a return. That sounds more limiting than it is, because two tricks can be used to extend the expressiveness of constexpr functions beyond what you might think. First, the conditional “?:” operator can be used in place of if-else statements, and second, recursion can be used instead of loops. pow can therefore be implemented like this:

constexpr int pow(int base, int exp) noexcept
{
  return (exp == 0 ? 1 : base * pow(base, exp - 1));
}

This works, but it’s hard to imagine that anybody except a hard-core functional programmer would consider it pretty. In C++14, the restrictions on constexpr functions are substantially looser, so the following implementation becomes possible:

constexpr int pow(int base, int exp) noexcept       // C++14
{
  auto result = 1;
  for (int i = 0; i < exp; ++i) result *= base;

  return result;
}

constexpr functions are limited to taking and returning literal types, which essentially means types that can have values determined during compilation. In C++11, all built-in types except void qualify, but user-defined types may be literal, too, because constructors and other member functions may be constexpr:

class Point {
public:
  constexpr Point(double xVal = 0, double yVal = 0) noexcept
  : x(xVal), y(yVal)
  {}

  constexpr double xValue() const noexcept { return x; }
  constexpr double yValue() const noexcept { return y; }

  void setX(double newX) noexcept { x = newX; }
  void setY(double newY) noexcept { y = newY; }

private:
  double x, y;
};

Here, the Point constructor can be declared constexpr, because if the arguments passed to it are known during compilation, the value of the data members of the constructed Point can also be known during compilation. Points so initialized could thus be constexpr:

constexpr Point p1(9.4, 27.7);      // fine, "runs" constexpr
                                    // ctor during compilation

constexpr Point p2(28.8, 5.3);      // also fine

Similarly, the getters xValue and yValue can be constexpr, because if they’re invoked on a Point object with a value known during compilation (e.g., a constexpr Point object), the values of the data members x and y can be known during compilation. That makes it possible to write constexpr functions that call Point’s getters and to initialize constexpr objects with the results of such functions:

constexpr
Point midpoint(const Point& p1, const Point& p2) noexcept
{
  return { (p1.xValue() + p2.xValue()) / 2,    // call constexpr
           (p1.yValue() + p2.yValue()) / 2 };  // member funcs
}

constexpr auto mid= midpoint(p1, p2);     // init constexpr
                                           // object w/result of
                                           // constexpr function

This is very exciting. It means that the object mid, though its initialization involves calls to constructors, getters, and a non-member function, can be created in read-only memory! It means you could use an expression like mid.xValue() * 10 in an argument to a template or in an expression specifying the value of an enumerator!6 It means that the traditionally fairly strict line between work done during compilation and work done at runtime begins to blur, and some computations traditionally done at runtime can migrate to compile time. The more code taking part in the migration, the faster your software will run. (Compilation may take longer, however.)

In C++11, two restrictions prevent Point’s member functions setX and setY from being declared constexpr. First, they modify the object they operate on, and in C++11, constexpr member functions are implicitly const. Second, they have void return types, and void isn’t a literal type in C++11. Both these restrictions are lifted in C++14, so in C++14, even Point’s setters can be constexpr:

class Point {
public:
  …

  constexpr void setX(double newX) noexcept     // C++14
  { x = newX; }

  constexpr void setY(double newY) noexcept     // C++14
  { y = newY; }

  …

};

That makes it possible to write functions like this:

// return reflection of p with respect to the origin (C++14)
constexpr Point reflection(const Point& p) noexcept
{
  Point result;                       // create non-const Point

  result.setX(-p.xValue());           // set its x and y values
  result.setY(-p.yValue());

  return result;                      // return copy of it
}

Client code could look like this:

constexpr Point p1(9.4, 27.7);        // as above
constexpr Point p2(28.8, 5.3);
constexpr auto mid= midpoint(p1, p2);

constexpr auto reflectedMid=         // reflectedMid's value is
  reflection(mid);                    // (-19.1 -16.5) and known
                                      // during compilation

The advice of this Item is to use constexpr whenever possible, and by now I hope it’s clear why: both constexpr objects and constexpr functions can be employed in a wider range of contexts than non-constexpr objects and functions. By using constexpr whenever possible, you maximize the range of situations in which your objects and functions may be used.

It’s important to note that constexpr is part of an object’s or function’s interface. constexpr proclaims “I can be used in a context where C++ requires a constant expression.” If you declare an object or function constexpr, clients may use it in such contexts. If you later decide that your use of constexpr was a mistake and you remove it, you may cause arbitrarily large amounts of client code to stop compiling. (The simple act of adding I/O to a function for debugging or performance tuning could lead to such a problem, because I/O statements are generally not permitted in constexpr functions.) Part of “whenever possible” in “Use constexpr whenever possible” is your willingness to make a long-term commitment to the constraints it imposes on the objects and functions you apply it to.
Things to Remember

    constexpr objects are const and are initialized with values known during compilation.

    constexpr functions can produce compile-time results when called with arguments whose values are known during compilation.

    constexpr objects and functions may be used in a wider range of contexts than non-constexpr objects and functions.

    constexpr is part of an object’s or function’s interface.
```

#### 35.1.2.1.10 Make const member functions thread safe.

```text
If we’re working in a mathematical domain, we might find it convenient to have a class representing polynomials. Within this class, it would probably be useful to have a function to compute the root(s) of a polynomial, i.e., values where the polynomial evaluates to zero. Such a function would not modify the polynomial, so it’d be natural to  declare it const:

class Polynomial {
public:
  using RootsType =          // data structure holding values
    std::vector<double>;     // where polynomial evals to zero
  …                          // (see Item 9 for info on "using")

  RootsType roots() const;

  …

};

Computing the roots of a polynomial can be expensive, so we don’t want to do it if we don’t have to. And if we do have to do it, we certainly don’t want to do it more than once. We’ll thus cache the root(s) of the polynomial if we have to compute them, and we’ll implement roots to return the cached value. Here’s the basic approach:

class Polynomial {
public:
  using RootsType = std::vector<double>;

  RootsType roots() const
  {
    if (!rootsAreValid) {            // if cache not valid

      …                              // compute roots,
                                     // store them in rootVals
      rootsAreValid= true;
    }

    return rootVals;
  }

private:
  mutable bool rootsAreValid{ false };    // see Item 7 for info
  mutable RootsType rootVals{};           // on initializers
};

Conceptually, roots doesn’t change the Polynomial object on which it operates, but, as part of its caching activity, it may need to modify rootVals and rootsAreValid. That’s a classic use case for mutable, and that’s why it’s part of the declarations for these data members.

Imagine now that two threads simultaneously call roots on a Polynomial object:

Polynomial p;

…


/*-----  Thread 1  ----- */     /*-------  Thread 2  ------- */

auto rootsOfP = p.roots();      auto valsGivingZero = p.roots();

This client code is perfectly reasonable. roots is a const member function, and that means it represents a read operation. Having multiple threads perform a read operation without synchronization is safe. At least it’s supposed to be. In this case, it’s not, because inside roots, one or both of these threads might try to modify the data members rootsAreValid and rootVals. That means that this code could have different threads reading and writing the same memory without synchronization, and that’s the definition of a data race. This code has undefined behavior.

The problem is that roots is declared const, but it’s not thread safe. The const declaration is as correct in C++11 as it would be in C++98 (retrieving the roots of a polynomial doesn’t change the value of the polynomial), so what requires rectification is the lack of thread safety.

The easiest way to address the issue is the usual one: employ a mutex:

class Polynomial {
public:
  using RootsType = std::vector<double>;

  RootsType roots() const
  {
    std::lock_guard<std::mutex> g(m);     // lock mutex

    if (!rootsAreValid) {                 // if cache not valid

      …                                   // compute/store roots

      rootsAreValid= true;
    }

    return rootVals;
  }                                       // unlock mutex

private:
  mutable std::mutex m;
  mutable bool rootsAreValid{ false };
  mutable RootsType rootVals{};
};

The std::mutex m is declared mutable, because locking and unlocking it are non-const member functions, and within roots (a const member function), m would otherwise be considered a const object.

It’s worth noting that because std::mutex can be neither copied nor moved, a side effect of adding m to Polynomial is that Polynomial loses the ability to be copied and moved.

In some situations, a mutex is overkill. For example, if all you’re doing is counting how many times a member function is called, a std::atomic counter (i.e, one where other threads are guaranteed to see its operations occur indivisibly—see Item 40) will often be a less expensive way to go. (Whether it actually is less expensive depends on the hardware you’re running on and the implementation of mutexes in your Standard Library.) Here’s how you can employ a std::atomic to count calls:

class Point {                                // 2D point
public:
  …

  double distanceFromOrigin() const noexcept     // see Item 14
  {                                              // for noexcept

    ++callCount;                             // atomic increment

    return std::hypot(x, y);                 // std::hypot is
  }                                          // new in C++11

private:
  mutable std::atomic<unsigned> callCount{ 0 };
  double x, y;
};

Like std::mutexes, std::atomics are uncopyable and unmovable, so the existence of callCount in Point means that Point is also neither copyable nor movable.

Because operations on std::atomic variables are often less expensive than mutex acquisition and release, you may be tempted to lean on std::atomics more heavily than you should. For example, in a class caching an expensive-to-compute int, you might try to use a pair of std::atomic variables instead of a mutex:

class Widget {
public:
  …

  int magicValue() const
  {
    if (cacheValid) return cachedValue;
    else {
      auto val1 = expensiveComputation1();
      auto val2 = expensiveComputation2();
      cachedValue = val1 + val2;               // uh oh, part 1
      cacheValid= true;                       // uh oh, part 2
      return cachedValue;
    }
  }

private:
  mutable std::atomic<bool> cacheValid{ false };
  mutable std::atomic<int> cachedValue;
};

This will work, but sometimes it will work a lot harder than it should. Consider:

    A thread calls Widget::magicValue, sees cacheValid as false, performs the two expensive computations, and assigns their sum to cachedValue.

    At that point, a second thread calls Widget::magicValue, also sees cacheValid as false, and thus carries out the same expensive computations that the first thread has just finished. (This “second thread” may in fact be several other threads.)

To eliminate this problem, you might consider reversing the order of the assignments to cachedValue and cacheValid, but you’d soon realize that (1) multiple threads could still compute val1 and val2 before cacheValid is set to true, thus defeating the point of the exercise, and (2) it would actually make things worse. Consider:

class Widget {
public:
  …

  int magicValue() const
  {
    if (cacheValid) return cachedValue;
    else {
      auto val1 = expensiveComputation1();
      auto val2 = expensiveComputation2();
      cacheValid= true;                        // uh oh, part 1
      return cachedValue = val1 + val2;         // uh oh, part 2
    }
  }

  …

};

Imagine that cacheValid is false, and then:

    One thread calls Widget::magicValue and executes through the point where cacheValid is set to true.

    At that moment, a second thread calls Widget::magicValue and checks cacheValid. Seeing it true, the thread returns cachedValue, even though the first thread has not yet made an assignment to it. The returned value is therefore incorrect.

There’s a lesson here. For a single variable or memory location requiring synchronization, use of a std::atomic is adequate, but once you get to two or more variables or memory locations that require manipulation as a unit, you should reach for a mutex. For Widget::magicValue, that would look like this:

class Widget {
public:
  …

  int magicValue() const
  {
    std::lock_guard<std::mutex> guard(m);   // lock m

    if (cacheValid) return cachedValue;
    else {
      auto val1 = expensiveComputation1();
      auto val2 = expensiveComputation2();
      cachedValue = val1 + val2;
      cacheValid= true;
      return cachedValue;
    }
  }                                         // unlock m
  …

private:
  mutable std::mutex m;
  mutable int cachedValue;                  // no longer atomic
  mutable bool cacheValid{ false };         // no longer atomic
};

Now, this Item is predicated on the assumption that multiple threads may simultaneously execute a const member function on an object. If you’re writing a const member function where that’s not the case—where you can guarantee that there will never be more than one thread executing that member function on an object—the thread safety of the function is immaterial. For example, it’s unimportant whether member functions of classes designed for exclusively single-threaded use are thread safe. In such cases, you can avoid the costs associated with mutexes and std::atomics, as well as the side effect of their rendering the classes containing them uncopyable and unmovable. However, such threading-free scenarios are increasingly uncommon, and they’re likely to become rarer still. The safe bet is that const member functions will be subject to concurrent execution, and that’s why you should ensure that your const member functions are thread safe.

 
Things to Remember

    Make const member functions thread safe unless you’re certain they’ll never be used in a concurrent context.

    Use of std::atomic variables may offer better performance than a mutex, but they’re suited for manipulation of only a single variable or memory location.
```

#### 35.1.2.1.11 Understand special member function generation.

```text
In official C++ parlance, the special member functions are the ones that C++ is willing to generate on its own. C++98 has four such functions: the default constructor, the destructor, the copy constructor, and the copy assignment operator. There’s fine print, of course. These functions are generated only if they’re needed, i.e., if some code uses them without their being expressly declared in the class. A default constructor is generated only if the class declares no constructors at all. (This prevents compilers from creating a default constructor for a class where you’ve specified that constructor arguments are required.) Generated special member functions are implicitly public and inline, and they’re nonvirtual unless the function in question is a destructor in a derived class inheriting from a base class with a virtual destructor. In that case, the compiler-generated destructor for the derived class is also virtual.

But you already know these things. Yes, yes, ancient history: Mesopotamia, the Shang dynasty, FORTRAN, C++98. But times have changed, and the rules for special member function generation in C++ have changed with them. It’s important to be aware of the new rules, because few things are as central to effective C++ programming as knowing when compilers silently insert member functions into your classes.

As of C++11, the special member functions club has two more inductees: the move constructor and the move assignment operator. Their signatures are:

class Widget {
public:
  …
  Widget(Widget&& rhs);              // move constructor

  Widget& operator=(Widget&& rhs);   // move assignment operator
  …
};

The rules governing their generation and behavior are analogous to those for their copying siblings. The move operations are generated only if they’re needed, and if they are generated, they perform “memberwise moves” on the non-static data members of the class. That means that the move constructor move-constructs each non-static data member of the class from the corresponding member of its parameter rhs, and the move assignment operator move-assigns each non-static data member from its parameter. The move constructor also move-constructs its base class parts (if there are any), and the move assignment operator move-assigns its base class parts.

Now, when I refer to a move operation move-constructing or move-assigning a data member or base class, there is no guarantee that a move will actually take place. “Memberwise moves” are, in reality, more like memberwise move requests, because types that aren’t move-enabled (i.e., that offer no special support for move operations, e.g., most C++98 legacy classes) will be “moved” via their copy operations. The heart of each memberwise “move” is application of std::move to the object to be moved from, and the result is used during function overload resolution to determine whether a move or a copy should be performed. Item 23 covers this process in detail. For this Item, simply remember that a memberwise move consists of move operations on data members and base classes that support move operations, but a copy operation for those that don’t.

As is the case with the copy operations, the move operations aren’t generated if you declare them yourself. However, the precise conditions under which they are generated differ a bit from those for the copy operations.

The two copy operations are independent: declaring one doesn’t prevent compilers from generating the other. So if you declare a copy constructor, but no copy assignment operator, then write code that requires copy assignment, compilers will generate the copy assignment operator for you. Similarly, if you declare a copy assignment operator, but no copy constructor, yet your code requires copy construction, compilers will generate the copy constructor for you. That was true in C++98, and it’s still true in C++11.

The two move operations are not independent. If you declare either, that prevents compilers from generating the other. The rationale is that if you declare, say, a move constructor for your class, you’re indicating that there’s something about how move construction should be implemented that’s different from the default memberwise move that compilers would generate. And if there’s something wrong with memberwise move construction, there’d probably be something wrong with memberwise move assignment, too. So declaring a move constructor prevents a move assignment operator from being generated, and declaring a move assignment operator prevents compilers from generating a move constructor.

Furthermore, move operations won’t be generated for any class that explicitly declares a copy operation. The justification is that declaring a copy operation (construction or assignment) indicates that the normal approach to copying an object (memberwise copy) isn’t appropriate for the class, and compilers figure that if memberwise copy isn’t appropriate for the copy operations, memberwise move probably isn’t appropriate for the move operations.

This goes in the other direction, too. Declaring a move operation (construction or assignment) in a class causes compilers to disable the copy operations. (The copy operations are disabled by deleting them—see Item 11). After all, if memberwise move isn’t the proper way to move an object, there’s no reason to expect that memberwise copy is the proper way to copy it. This may sound like it could break C++98 code, because the conditions under which the copy operations are enabled are more constrained in C++11 than in C++98, but this is not the case. C++98 code can’t have move operations, because there was no such thing as “moving” objects in C++98. The only way a legacy class can have user-declared move operations is if they were added for C++11, and classes that are modified to take advantage of move semantics have to play by the C++11 rules for special member function generation.

Perhaps you’ve heard of a guideline known as the Rule of Three. The Rule of Three states that if you declare any of a copy constructor, copy assignment operator, or destructor, you should declare all three. It grew out of the observation that the need to take over the meaning of a copy operation almost always stemmed from the class performing some kind of resource management, and that almost always implied that (1) whatever resource management was being done in one copy operation probably needed to be done in the other copy operation and (2) the class destructor would also be participating in management of the resource (usually releasing it). The classic resource to be managed was memory, and this is why all Standard Library classes that manage memory (e.g., the STL containers that perform dynamic memory management) all declare “the big three”: both copy operations and a destructor. 

A consequence of the Rule of Three is that the presence of a user-declared destructor indicates that simple memberwise copy is unlikely to be appropriate for the copying operations in the class. That, in turn, suggests that if a class declares a destructor, the copy operations probably shouldn’t be automatically generated, because they wouldn’t do the right thing. At the time C++98 was adopted, the significance of this line of reasoning was not fully appreciated, so in C++98, the existence of a user-declared destructor had no impact on compilers’ willingness to generate copy operations. That continues to be the case in C++11, but only because restricting the conditions under which the copy operations are generated would break too much legacy code.

The reasoning behind the Rule of Three remains valid, however, and that, combined with the observation that declaration of a copy operation precludes the implicit generation of the move operations, motivates the fact that C++11 does not generate move operations for a class with a user-declared destructor.

So move operations are generated for classes (when needed) only if these three things are true:

    No copy operations are declared in the class.

    No move operations are declared in the class.

    No destructor is declared in the class.

At some point, analogous rules may be extended to the copy operations, because C++11 deprecates the automatic generation of copy operations for classes declaring copy operations or a destructor. This means that if you have code that depends on the generation of copy operations in classes declaring a destructor or one of the copy operations, you should consider upgrading these classes to eliminate the dependence. Provided the behavior of the compiler-generated functions is correct (i.e, if memberwise copying of the class’s non-static data members is what you want), your job is easy, because C++11’s “= default” lets you say that explicitly:

class Widget {
public:
  …
  ~Widget();                             // user-declared dtor

  …                                      // default copy ctor
  Widget(const Widget&) = default;       // behavior is OK

  Widget&                                // default copy assign
    operator=(const Widget&) = default;  // behavior is OK
  …
};

This approach is often useful in polymorphic base classes, i.e., classes defining interfaces through which derived class objects are manipulated. Polymorphic base classes normally have virtual destructors, because if they don’t, some operations (e.g., the use of delete or typeid on a derived class object through a base class pointer or reference) yield undefined or misleading results. Unless a class inherits a destructor that’s already virtual, the only way to make a destructor virtual is to explicitly declare it that way. Often, the default implementation would be correct, and “= default” is a good way to express that. However, a user-declared destructor suppresses generation of the move operations, so if movability is to be supported, “= default” often finds a second application. Declaring the move operations disables the copy operations, so if copyability is also desired, one more round of “= default” does the job:

class Base {
public:
  virtual ~Base() = default;                // make dtor virtual

  Base(Base&&) = default;                   // support moving
  Base& operator=(Base&&) = default;

  Base(const Base&) = default;              // support copying
  Base& operator=(const Base&) = default;

  …

};

In fact, even if you have a class where compilers are willing to generate the copy and move operations and where the generated functions would behave as you want, you may choose to adopt a policy of declaring them yourself and using “= default” for their definitions. It’s more work, but it makes your intentions clearer, and it can help you sidestep some fairly subtle bugs. For example, suppose you have a class representing a string table, i.e., a data structure that permits fast lookups of string values via an integer ID:

class StringTable {
public:
  StringTable() {}
  …                 // functions for insertion, erasure, lookup,
                    // etc., but no copy/move/dtor functionality

private:
  std::map<int, std::string> values;
};

Assuming that the class declares no copy operations, no move operations, and no destructor, compilers will automatically generate these functions if they are used. That’s very convenient.

But suppose that sometime later, it’s decided that logging the default construction and the destruction of such objects would be useful. Adding that functionality is easy:

class StringTable {
public:
  StringTable()
  { makeLogEntry("Creating StringTable object"); }     // added
  
  ~StringTable()                                       // also
  { makeLogEntry("Destroying StringTable object"); }   // added

  …                                     // other funcs as before

private:
  std::map<int, std::string> values;    // as before
};

This looks reasonable, but declaring a destructor has a potentially significant side effect: it prevents the move operations from being generated. However, creation of the class’s copy operations is unaffected. The code is therefore likely to compile, run, and pass its functional testing. That includes testing its move functionality, because even though this class is no longer move-enabled, requests to move it will compile and run. Such requests will, as noted earlier in this Item, cause copies to be made. Which means that code “moving” StringTable objects actually copies them, i.e., copies the underlying std::map<int, std::string> objects. And copying a std::map<int, std::string> is likely to be orders of magnitude slower than moving it. The simple act of adding a destructor to the class could thereby have introduced a significant performance problem! Had the copy and move operations been explicitly defined using “= default”, the problem would not have arisen.

Now, having endured my endless blathering about the rules governing the copy and move operations in C++11, you may wonder when I’ll turn my attention to the two other special member functions, the default constructor and the destructor. That time is now, but only for this sentence, because almost nothing has changed for these member functions: the rules in C++11 are nearly the same as in C++98.

The C++11 rules governing the special member functions are thus:

    Default constructor: Same rules as C++98. Generated only if the class contains no user-declared constructors.

    Destructor: Essentially same rules as C++98; sole difference is that destructors are noexcept by default (see Item 14). As in C++98, virtual only if a base class destructor is virtual.

    Copy constructor: Same runtime behavior as C++98: memberwise copy construction of non-static data members. Generated only if the class lacks a user-declared copy constructor. Deleted if the class declares a move operation. Generation of this function in a class with a user-declared copy assignment operator or destructor is deprecated.

    Copy assignment operator: Same runtime behavior as C++98: memberwise copy assignment of non-static data members. Generated only if the class lacks a user-declared copy assignment operator. Deleted if the class declares a move operation. Generation of this function in a class with a user-declared copy constructor or destructor is deprecated.

    Move constructor and move assignment operator: Each performs memberwise moving of non-static data members. Generated only if the class contains no user-declared copy operations, move operations, or destructor.

Note that there’s nothing in the rules about the existence of a member function template preventing compilers from generating the special member functions. That means that if Widget looks like this,

class Widget {
  …
  template<typename T>                // construct Widget
  Widget(const T& rhs);               // from anything

  template<typename T>                // assign Widget
  Widget& operator=(const T& rhs);    // from anything
  …
};

compilers will still generate copy and move operations for Widget (assuming the usual conditions governing their generation are fulfilled), even though these templates could be instantiated to produce the signatures for the copy constructor and copy assignment operator. (That would be the case when T is Widget.) In all likelihood, this will strike you as an edge case barely worth acknowledging, but there’s a reason I’m mentioning it. Item 26 demonstrates that it can have important consequences.
Things to Remember

    The special member functions are those compilers may generate on their own: default constructor, destructor, copy operations, and move operations.

    Move operations are generated only for classes lacking explicitly declared move operations, copy operations, or a destructor.

    The copy constructor is generated only for classes lacking an explicitly declared copy constructor, and it’s deleted if a move operation is declared. The copy assignment operator is generated only for classes lacking an explicitly declared copy assignment operator, and it’s deleted if a move operation is declared. Generation of the copy operations in classes with an explicitly declared destructor is deprecated.

    Member function templates never suppress generation of special member functions.

1 More flexible designs—ones that permit callers to determine whether parentheses or braces should be used in functions generated from a template—are possible. For details, see the 5 June 2013 entry of Andrzej’s C++ blog, “Intuitive interface — Part I.”

2 Applying final to a virtual function prevents the function from being overridden in derived classes. final may also be applied to a class, in which case the class is prohibited from being used as a base class.

3 The checking is typically rather roundabout. Functions like std::vector::push_back call std::move_if_noexcept, a variation of std::move that conditionally casts to an rvalue (see Item 23), depending on whether the type’s move constructor is noexcept. In turn, std::move_if_noexcept consults std::is_nothrow_move_constructible, and the value of this type trait (see Item 9) is set by compilers, based on whether the move constructor has a noexcept (or throw()) designation.

4 The interface specifications for move operations on containers in the Standard Library lack noexcept. However, implementers are permitted to strengthen exception specifications for Standard Library functions, and, in practice, it is common for at least some container move operations to be declared noexcept. That practice exemplifies this Item’s advice. Having found that it’s possible to write container move operations such that exceptions aren’t thrown, implementers often declare the operations noexcept, even though the Standard does not require them to do so.

5 “Regardless of the state of the program” and “no constraints” doesn’t legitimize programs whose behavior is already undefined. For example, std::vector::size has a wide contract, but that doesn’t require that it behave reasonably if you invoke it on a random chunk of memory that you’ve cast to a std::vector. The result of the cast is undefined, so there are no behavioral guarantees for the program containing the cast.

6 Because Point::xValue returns double, the type of mid.xValue() * 10 is also double. Floating-point types can’t be used to instantiate templates or to specify enumerator values, but they can be used as part of larger expressions that yield integral types. For example, static_cast<int>(mid.xValue() * 10) could be used to instantiate a template or to specify an enumerator value.
```

#### 35.1.2.1.12 Smart Pointers

```text
Poets and songwriters have a thing about love. And sometimes about counting. Occasionally both. Inspired by the rather different takes on love and counting by Elizabeth Barrett Browning (“How do I love thee? Let me count the ways.”) and Paul Simon (“There must be 50 ways to leave your lover.”), we might try to enumerate the reasons why a raw pointer is hard to love:

    Its declaration doesn’t indicate whether it points to a single object or to an array.

    Its declaration reveals nothing about whether you should destroy what it points to when you’re done using it, i.e., if the pointer owns the thing it points to.

    If you determine that you should destroy what the pointer points to, there’s no way to tell how. Should you use delete, or is there a different destruction mechanism (e.g., a dedicated destruction function the pointer should be passed to)?

    If you manage to find out that delete is the way to go, Reason 1 means it may not be possible to know whether to use the single-object form (“delete”) or the array form (“delete []”). If you use the wrong form, results are undefined.

    Assuming you ascertain that the pointer owns what it points to and you discover how to destroy it, it’s difficult to ensure that you perform the destruction exactly once along every path in your code (including those due to exceptions). Missing a path leads to resource leaks, and doing the destruction more than once leads to undefined behavior.

    There’s typically no way to tell if the pointer dangles, i.e., points to memory that no longer holds the object the pointer is supposed to point to. Dangling pointers arise when objects are destroyed while pointers still point to them.

Raw pointers are powerful tools, to be sure, but decades of experience have demonstrated that with only the slightest lapse in concentration or discipline, these tools can turn on their ostensible masters.

Smart pointers are one way to address these issues. Smart pointers are wrappers around raw pointers that act much like the raw pointers they wrap, but that avoid many of their pitfalls. You should therefore prefer smart pointers to raw pointers. Smart pointers can do virtually everything raw pointers can, but with far fewer opportunities for error.

There are four smart pointers in C++11: std::auto_ptr, std::unique_ptr, std::shared_ptr, and std::weak_ptr. All are designed to help manage the lifetimes of dynamically allocated objects, i.e., to avoid resource leaks by ensuring that such objects are destroyed in the appropriate manner at the appropriate time (including in the event of exceptions).

std::auto_ptr is a deprecated leftover from C++98. It was an attempt to standardize what later became C++11’s std::unique_ptr. Doing the job right required move semantics, but C++98 didn’t have them. As a workaround, std::auto_ptr co-opted its copy operations for moves. This led to surprising code (copying a std::auto_ptr sets it to null!) and frustrating usage restrictions (e.g., it’s not possible to store std::auto_ptrs in containers).

std::unique_ptr does everything std::auto_ptr does, plus more. It does it as efficiently, and it does it without warping what it means to copy an object. It’s better than std::auto_ptr in every way. The only legitimate use case for std::auto_ptr is a need to compile code with C++98 compilers. Unless you have that constraint, you should replace std::auto_ptr with std::unique_ptr and never look back.

The smart pointer APIs are remarkably varied. About the only functionality common to all is default construction. Because comprehensive references for these APIs are widely available, I’ll focus my discussions on information that’s often missing from API overviews, e.g., noteworthy use cases, runtime cost analyses, etc. Mastering such information can be the difference between merely using these smart pointers and using them effectively.
```

#### 35.1.2.1.12.1 Use std::unique_ptr for exclusive-ownership resource management.

```text
When you reach for a smart pointer, std::unique_ptr should generally be the one closest at hand. It’s reasonable to assume that, by default, std::unique_ptrs are the same size as raw pointers, and for most operations (including dereferencing), they execute exactly the same instructions. This means you can use them even in situations where memory and cycles are tight. If a raw pointer is small enough and fast enough for you, a std::unique_ptr almost certainly is, too.

std::unique_ptr embodies exclusive ownership semantics. A non-null std::unique_ptr always owns what it points to. Moving a std::unique_ptr transfers ownership from the source pointer to the destination pointer. (The source pointer is set to null.) Copying a std::unique_ptr isn’t allowed, because if you could copy a std::unique_ptr, you’d end up with two std::unique_ptrs to the same resource, each thinking it owned (and should therefore destroy) that resource. std::unique_ptr is thus a move-only type. Upon destruction, a non-null std::unique_ptr destroys its resource. By default, resource destruction is accomplished by applying delete to the raw pointer inside the std::unique_ptr.

A common use for std::unique_ptr is as a factory function return type for objects in a hierarchy. Suppose we have a hierarchy for types of investments (e.g., stocks, bonds, real estate, etc.) with a base class Investment.

class Investment { … };

class Stock:
  public Investment { … };

class Bond:
  public Investment { … };

class RealEstate:
  public Investment { … };

Image

A factory function for such a hierarchy typically allocates an object on the heap and returns a pointer to it, with the caller being responsible for deleting the object when it’s no longer needed. That’s a perfect match for std::unique_ptr, because the caller acquires responsibility for the resource returned by the factory (i.e., exclusive ownership of it), and the std::unique_ptr automatically deletes what it points to when the std::unique_ptr is destroyed. A factory function for the Investment hierarchy could be declared like this:

template<typename... Ts>              // return std::unique_ptr
std::unique_ptr<Investment>           // to an object created
makeInvestment(Ts&&... params);       // from the given args

Callers could use the returned std::unique_ptr in a single scope as follows,

{
  …
  auto pInvestment =              // pInvestment is of type
    makeInvestment( arguments );  // std::unique_ptr<Investment>

  …

}                                 // destroy *pInvestment

but they could also use it in ownership-migration scenarios, such as when the std::unique_ptr returned from the factory is moved into a container, the container element is subsequently moved into a data member of an object, and that object is later destroyed. When that happens, the object’s std::unique_ptr data member would also be destroyed, and its destruction would cause the resource returned from the factory to be destroyed. If the ownership chain got interrupted due to an exception or other atypical control flow (e.g., early function return or break from a loop), the std::unique_ptr owning the managed resource would eventually have its destructor called,1 and the resource it was managing would thereby be destroyed.

By default, that destruction would take place via delete, but, during construction, std::unique_ptr objects can be configured to use custom deleters: arbitrary functions (or function objects, including those arising from lambda expressions) to be invoked when it’s time for their resources to be destroyed. If the object created by makeInvestment shouldn’t be directly deleted, but instead should first have a log entry written, makeInvestment could be implemented as follows. (An explanation follows the code, so don’t worry if you see something whose motivation is less than obvious.)

auto delInvmt = [](Investment* pInvestment)       // custom
                {                                 // deleter
                  makeLogEntry(pInvestment);      // (a lambda
                  delete pInvestment;             // expression)
                };

template<typename... Ts>                          // revised
std::unique_ptr<Investment, decltype(delInvmt)>   // return type
makeInvestment(Ts&&... params)
{
  std::unique_ptr<Investment, decltype(delInvmt)> // ptr to be
    pInv(nullptr, delInvmt);                      // returned

  if ( /* a Stock object should be created */ )
  {
    pInv.reset(new Stock(std::forward<Ts>(params)...));
  }
  else if ( /* a Bond object should be created */ )
  {
    pInv.reset(new Bond(std::forward<Ts>(params)...));
  }
  else if ( /* a RealEstate object should be created */ )
  {
    pInv.reset(new RealEstate(std::forward<Ts>(params)...));
  }

  return pInv;
}

In a moment, I’ll explain how this works, but first consider how things look if you’re a caller. Assuming you store the result of the makeInvestment call in an auto variable, you frolic in blissful ignorance of the fact that the resource you’re using requires special treatment during deletion. In fact, you veritably bathe in bliss, because the use of std::unique_ptr means you need not concern yourself with when the resource should be destroyed, much less ensure that the destruction happens exactly once along every path through the program. std::unique_ptr takes care of all those things automatically. From a client’s perspective, makeInvestment’s interface is sweet.

The implementation is pretty nice, too, once you understand the following:

    delInvmt is the custom deleter for the object returned from makeInvestment. All custom deletion functions accept a raw pointer to the object to be destroyed, then do what is necessary to destroy that object. In this case, the action is to call makeLogEntry and then apply delete. Using a lambda expression to create delInvmt is convenient, but, as we’ll see shortly, it’s also more efficient than writing a conventional function.

    When a custom deleter is to be used, its type must be specified as the second type argument to std::unique_ptr. In this case, that’s the type of delInvmt, and that’s why the return type of makeInvestment is std::unique_ptr<Investment, decltype(delInvmt)>. (For information about decltype, see Item 3.)

    The basic strategy of makeInvestment is to create a null std::unique_ptr, make it point to an object of the appropriate type, and then return it. To associate the custom deleter delInvmt with pInv, we pass that as its second constructor argument.

    Attempting to assign a raw pointer (e.g., from new) to a std::unique_ptr won’t compile, because it would constitute an implicit conversion from a raw to a smart pointer. Such implicit conversions can be problematic, so C++11’s smart pointers prohibit them. That’s why reset is used to have pInv assume ownership of the object created via new.

    With each use of new, we use std::forward to perfect-forward the arguments passed to makeInvestment (see Item 25). This makes all the information provided by callers available to the constructors of the objects being created.

    The custom deleter takes a parameter of type Investment*. Regardless of the actual type of object created inside makeInvestment (i.e., Stock, Bond, or RealEstate), it will ultimately be deleted inside the lambda expression as an Investment* object. This means we’ll be deleting a derived class object via a base class pointer. For that to work, the base class—Investment—must have a virtual destructor:

    class Investment {
    public:
      …                                             // essential
      virtual ~Investment();                        // design
      …                                             // component!
    };

In C++14, the existence of function return type deduction (see Item 3) means that makeInvestment could be implemented in this simpler and more encapsulated fashion:

template<typename... Ts>
auto makeInvestment(Ts&&... params)              // C++14
{
  auto delInvmt = [](Investment* pInvestment)    // this is now
                  {                              // inside
                    makeLogEntry(pInvestment);   // make-
                    delete pInvestment;          // Investment
                  };

  std::unique_ptr<Investment, decltype(delInvmt)>   // as
    pInv(nullptr, delInvmt);                        // before

  if ( … )                                          // as before
  {
    pInv.reset(new Stock(std::forward<Ts>(params)...));
  }
  else if ( … )                                     // as before
  {
    pInv.reset(new Bond(std::forward<Ts>(params)...));
  }
  else if ( … )                                     // as before
  {
    pInv.reset(new RealEstate(std::forward<Ts>(params)...));
  }
  return pInv;                                      // as before
}

I remarked earlier that, when using the default deleter (i.e., delete), you can reasonably assume that std::unique_ptr objects are the same size as raw pointers. When custom deleters enter the picture, this may no longer be the case. Deleters that are function pointers generally cause the size of a std::unique_ptr to grow from one word to two. For deleters that are function objects, the change in size depends on how much state is stored in the function object. Stateless function objects (e.g., from lambda expressions with no captures) incur no size penalty, and this means that when a custom deleter can be implemented as either a function or a captureless lambda expression, the lambda is preferable:

auto delInvmt1 = [](Investment* pInvestment)      // custom
                 {                                // deleter
                   makeLogEntry(pInvestment);     // as
                   delete pInvestment;            // stateless
                 };                               // lambda

template<typename... Ts>                          // return type
std::unique_ptr<Investment, decltype(delInvmt1)>  // has size of
makeInvestment(Ts&&... args);                     // Investment*

void delInvmt2(Investment* pInvestment)           // custom
{                                                 // deleter
  makeLogEntry(pInvestment);                      // as function
  delete pInvestment;
}

template<typename... Ts>                 // return type has
std::unique_ptr<Investment,              // size of Investment*
                void (*)(Investment*)>   // plus at least size
makeInvestment(Ts&&... params);          // of function pointer!

Function object deleters with extensive state can yield std::unique_ptr objects of significant size. If you find that a custom deleter makes your std::unique_ptrs unacceptably large, you probably need to change your design.

Factory functions are not the only common use case for std::unique_ptrs. They’re even more popular as a mechanism for implementing the Pimpl Idiom. The code for that isn’t complicated, but in some cases it’s less than straightforward, so I’ll refer you to Item 22, which is dedicated to the topic.

std::unique_ptr comes in two forms, one for individual objects (std::unique_ptr<T>) and one for arrays (std::unique_ptr<T[]>). As a result, there’s never any ambiguity about what kind of entity a std::unique_ptr points to. The std::unique_ptr API is designed to match the form you’re using. For example, there’s no indexing operator (operator[]) for the single-object form, while the array form lacks dereferencing operators (operator* and operator->).

The existence of std::unique_ptr for arrays should be of only intellectual interest to you, because std::array, std::vector, and std::string are virtually always better data structure choices than raw arrays. About the only situation I can conceive of when a std::unique_ptr<T[]> would make sense would be when you’re using a C-like API that returns a raw pointer to a heap array that you assume ownership of.

std::unique_ptr is the C++11 way to express exclusive ownership, but one of its most attractive features is that it easily and efficiently converts to a std::shared_ptr:

std::shared_ptr<Investment> sp =    // converts std::unique_ptr
  makeInvestment( arguments );      // to std::shared_ptr

This is a key part of why std::unique_ptr is so well suited as a factory function return type. Factory functions can’t know whether callers will want to use exclusive-ownership semantics for the object they return or whether shared ownership (i.e., std::shared_ptr) would be more appropriate. By returning a std::unique_ptr, factories provide callers with the most efficient smart pointer, but they don’t hinder callers from replacing it with its more flexible sibling. (For information about std::shared_ptr, proceed to Item 19.)
Things to Remember

    std::unique_ptr is a small, fast, move-only smart pointer for managing resources with exclusive-ownership semantics.

    By default, resource destruction takes place via delete, but custom deleters can be specified. Stateful deleters and function pointers as deleters increase the size of std::unique_ptr objects.

    Converting a std::unique_ptr to a std::shared_ptr is easy.


- My example
r ~/Desktop/Work/code/C11/smartPtrs.cpp
/*
 * =====================================================================================
 *
 *       Filename:  smartPtrs.cpp
 *
 *    Description:  :Demo smart C11 pointers
 *
 *        Version:  1.0
 *        Created:  01/04/15 16:02:48
 *       Revision:  none
 *       Compiler:  gcc
 *
 *         Author:  YOSI IZAQ
 *   Organization:  
 *
 * =====================================================================================
 */
#include <stdlib.h>
#include <stdio.h>
#include <map>
#include <vector>
#include <string>
#include <iostream>

using namespace std;

class B 
{
	public:
		   virtual void f(int) {std::cout << "B::f" << std::endl;}
};

class D : public B
{
	public:
		   virtual void f(int) override final {std::cout << "D::f" << std::endl;}
};

//class F : public D
//{
//	public:
//		   virtual void f(int) override {std::cout << "F::f" << std::endl;}
//		   // Produces error :smartPtrs.cpp:42:19: error: declaration of 'f' overrides a 'final' function virtual void f(int) override {std::cout << "F::f" << std::endl;}
//};

enum class Options {None, One, All}; // scoped enum aka class enum
int main()
{
auto o = Options::All;
cout<<"Print scoped enum value: "<< static_cast<int>(o)<<endl; 

unique_ptr<int> iP;
iP.reset( new int{5}) ; // new universal initialization syntax
cout<<"Created unique_ptr to int, used reset to copy raw ptr: "<< *iP<<endl; 

auto iP2 = move(iP);
cout<<"Moved unique_ptr ownership, value: "<< *iP2<<endl; 

//"Custome delete function " 
auto delInt = [] (int * ip) {
	cout <<"Custome delete function called "<<endl;
	delete ip;
       };
unique_ptr<int, decltype(delInt)> iPD(nullptr, delInt);
iPD.reset( new int{4}) ; // new universal initialization syntax
cout<<"Created unique_ptr to int that has custome delete, value: "<< *iPD<<endl; 

}

$ clang++ -std=c++14 -stdlib=libc++ -Weverything smartPtrs.cpp -o smartPtrs
$ ./smartPtrs 
Print scoped enum value: 2
Created unique_ptr to int, used reset to copy raw ptr: 5
Moved unique_ptr ownership, value: 5
Created unique_ptr to int that has custome delete, value: 4
Custome delete function
```

#### 35.1.2.1.12.2 Use std::shared_ptr for shared-ownership resource management.

```text
Programmers using languages with garbage collection point and laugh at what C++ programmers go through to prevent resource leaks. “How primitive!” they jeer. “Didn’t you get the memo from Lisp in the 1960s? Machines should manage resource lifetimes, not humans.” C++ developers roll their eyes. “You mean the memo where the only resource is memory and the timing of resource reclamation is nondeterministic? We prefer the generality and predictability of destructors, thank you.” But our bravado is part bluster. Garbage collection really is convenient, and manual lifetime management really can seem akin to constructing a mnemonic memory circuit using stone knives and bear skins.  Why can’t we have the best of both worlds: a system that works automatically (like garbage collection), yet applies to all resources and has predictable timing (like destructors)?

std::shared_ptr is the C++11 way of binding these worlds together. An object accessed via std::shared_ptrs has its lifetime managed by those pointers through shared ownership. No specific std::shared_ptr owns the object. Instead, all std::shared_ptrs pointing to it collaborate to ensure its destruction at the point where it’s no longer needed. When the last std::shared_ptr pointing to an object stops pointing there (e.g., because the std::shared_ptr is destroyed or made to point to a different object), that std::shared_ptr destroys the object it points to. As with garbage collection, clients need not concern themselves with managing the lifetime of pointed-to objects, but as with destructors, the timing of the objects’ destruction is deterministic.

A std::shared_ptr can tell whether it’s the last one pointing to a resource by consulting the resource’s reference count, a value associated with the resource that keeps track of how many std::shared_ptrs point to it. std::shared_ptr constructors increment this count (usually—see below), std::shared_ptr destructors decrement it, and copy assignment operators do both. (If sp1 and sp2 are std::shared_ptrs to different objects, the assignment “sp1 = sp2;” modifies sp1 such that it points to the object pointed to by sp2. The net effect of the assignment is that the reference count for the object originally pointed to by sp1 is decremented, while that for the object pointed to by sp2 is incremented.) If a std::shared_ptr sees a reference count of zero after performing a decrement, no more std::shared_ptrs point to the resource, so the std::shared_ptr destroys it.

The existence of the reference count has performance implications:

    std::shared_ptrs are twice the size of a raw pointer, because they internally contain a raw pointer to the resource as well as a raw pointer to the resource’s reference count.2

    Memory for the reference count must be dynamically allocated. Conceptually, the reference count is associated with the object being pointed to, but pointed-to objects know nothing about this. They thus have no place to store a reference count. (A pleasant implication is that any object—even those of built-in types—may be managed by std::shared_ptrs.) Item 21 explains that the cost of the dynamic allocation is avoided when the std::shared_ptr is created by std::make_shared, but there are situations where std::make_shared can’t be used. Either way, the reference count is stored as dynamically allocated data.

    Increments and decrements of the reference count must be atomic, because there can be simultaneous readers and writers in different threads. For example, a std::shared_ptr pointing to a resource in one thread could be executing its destructor (hence decrementing the reference count for the resource it points to), while, in a different thread, a std::shared_ptr to the same object could be copied (and therefore incrementing the same reference count). Atomic operations are typically slower than non-atomic operations, so even though reference counts are usually only a word in size, you should assume that reading and writing them is comparatively costly.

Did I pique your curiosity when I wrote that std::shared_ptr constructors only “usually” increment the reference count for the object they point to? Creating a std::shared_ptr pointing to an object always yields one more std::shared_ptr pointing to that object, so why mustn’t we always increment the reference count?

Move construction, that’s why. Move-constructing a std::shared_ptr from another std::shared_ptr sets the source std::shared_ptr to null, and that means that the old std::shared_ptr stops pointing to the resource at the moment the new std::shared_ptr starts. As a result, no reference count manipulation is required. Moving std::shared_ptrs is therefore faster than copying them: copying requires incrementing the reference count, but moving doesn’t. This is as true for assignment as for construction, so move construction is faster than copy construction, and move assignment is faster than copy assignment.

Like std::unique_ptr (see Item 18), std::shared_ptr uses delete as its default resource-destruction mechanism, but it also supports custom deleters. The design of this support differs from that for std::unique_ptr, however. For std::unique_ptr, the type of the deleter is part of the type of the smart pointer. For std::shared_ptr, it’s not:

auto loggingDel = [](Widget *pw)        // custom deleter
                  {                     // (as in Item 18)
                    makeLogEntry(pw);
                    delete pw;
                  };

std::unique_ptr<                        // deleter type is
  Widget, decltype(loggingDel)          // part of ptr type
  > upw(new Widget, loggingDel);

std::shared_ptr<Widget>                 // deleter type is not
  spw(new Widget, loggingDel);          // part of ptr type

The std::shared_ptr design is more flexible. Consider two std::shared_ptr<Widget>s, each with a custom deleter of a different type (e.g., because the custom deleters are specified via lambda expressions):

auto customDeleter1 = [](Widget *pw) { … };    // custom deleters,
auto customDeleter2 = [](Widget *pw) { … };    // each with a
                                               // different type

std::shared_ptr<Widget> pw1(new Widget, customDeleter1);
std::shared_ptr<Widget> pw2(new Widget, customDeleter2);

Because pw1 and pw2 have the same type, they can be placed in a container of objects of that type:

std::vector<std::shared_ptr<Widget>> vpw{ pw1, pw2 };

They could also be assigned to one another, and they could each be passed to a function taking a parameter of type std::shared_ptr<Widget>. None of these things can be done with std::unique_ptrs that differ in the types of their custom deleters, because the type of the custom deleter would affect the type of the std::unique_ptr.

In another difference from std::unique_ptr, specifying a custom deleter doesn’t change the size of a std::shared_ptr object. Regardless of deleter, a std::shared_ptr object is two pointers in size. That’s great news, but it should make you vaguely uneasy. Custom deleters can be function objects, and function objects can contain arbitrary amounts of data. That means they can be arbitrarily large. How can a std::shared_ptr refer to a deleter of arbitrary size without using any more memory?

It can’t. It may have to use more memory. However, that memory isn’t part of the std::shared_ptr object. It’s on the heap or, if the creator of the std::shared_ptr took advantage of std::shared_ptr support for custom allocators, it’s wherever the memory managed by the allocator is located. I remarked earlier that a std::shared_ptr object contains a pointer to the reference count for the object it points to. That’s true, but it’s a bit misleading, because the reference count is part of a larger data structure known as the control block. There’s a control block for each object managed by std::shared_ptrs. The control block contains, in addition to the reference count, a copy of the custom deleter, if one has been specified. If a custom allocator was specified, the control block contains a copy of that, too. The control block may also contain additional data, including, as Item 21 explains, a secondary reference count known as the weak count, but we’ll ignore such data in this Item. We can envision the memory associated with a std::shared_ptr<T> object as looking like this:
Image

An object’s control block is set up by the function creating the first std::shared_ptr to the object. At least that’s what’s supposed to happen. In general, it’s impossible for a function creating a std::shared_ptr to an object to know whether some other std::shared_ptr already points to that object, so the following rules for control block creation are used:

    std::make_shared (see Item 21) always creates a control block. It manufactures a new object to point to, so there is certainly no control block for that object at the time std::make_shared is called.

    A control block is created when a std::shared_ptr is constructed from a unique-ownership pointer (i.e., a std::unique_ptr or std::auto_ptr). Unique-ownership pointers don’t use control blocks, so there should be no control block for the pointed-to object. (As part of its construction, the std::shared_ptr assumes ownership of the pointed-to object, so the unique-ownership pointer is set to null.)

    When a std::shared_ptr constructor is called with a raw pointer, it creates a control block. If you wanted to create a std::shared_ptr from an object that already had a control block, you’d presumably pass a std::shared_ptr or a std::weak_ptr (see Item 20) as a constructor argument, not a raw pointer. std::shared_ptr constructors taking std::shared_ptrs or std::weak_ptrs as constructor arguments don’t create new control blocks, because they can rely on the smart pointers passed to them to point to any necessary control blocks.

A consequence of these rules is that constructing more than one std::shared_ptr from a single raw pointer gives you a complimentary ride on the particle accelerator of undefined behavior, because the pointed-to object will have multiple control blocks. Multiple control blocks means multiple reference counts, and multiple reference counts means the object will be destroyed multiple times (once for each reference count). That means that code like this is bad, bad, bad:

auto pw = new Widget;                          // pw is raw ptr

…

std::shared_ptr<Widget> spw1(pw, loggingDel);  // create control
                                               // block for *pw
…

std::shared_ptr<Widget> spw2(pw, loggingDel);  // create 2nd
                                               // control block
                                               // for *pw!

The creation of the raw pointer pw to a dynamically allocated object is bad, because it runs contrary to the advice behind this entire chapter: to prefer smart pointers to raw pointers. (If you’ve forgotten the motivation for that advice, refresh your memory here.) But set that aside. The line creating pw is a stylistic abomination, but at least it doesn’t cause undefined program behavior.

Now, the constructor for spw1 is called with a raw pointer, so it creates a control block (and thereby a reference count) for what’s pointed to. In this case, that’s *pw (i.e., the object pointed to by pw). In and of itself, that’s okay, but the constructor for spw2 is called with the same raw pointer, so it also creates a control block (hence a reference count) for *pw. *pw thus has two reference counts, each of which will eventually become zero, and that will ultimately lead to an attempt to destroy *pw twice. The second destruction is responsible for the undefined behavior.

There are at least two lessons regarding std::shared_ptr use here. First, try to avoid passing raw pointers to a std::shared_ptr constructor. The usual alternative is to use std::make_shared (see Item 21), but in the example above, we’re using custom deleters, and that’s not possible with std::make_shared. Second, if you must pass a raw pointer to a std::shared_ptr constructor, pass the result of new directly instead of going through a raw pointer variable. If the first part of the code above were rewritten like this,

std::shared_ptr<Widget> spw1(new Widget,    // direct use of new
                             loggingDel);

it’d be a lot less tempting to create a second std::shared_ptr from the same raw pointer. Instead, the author of the code creating spw2 would naturally use spw1 as an initialization argument (i.e., would call the std::shared_ptr copy constructor), and that would pose no problem whatsoever:

std::shared_ptr<Widget> spw2(spw1);     // spw2 uses same
                                        // control block as spw1

An especially surprising way that using raw pointer variables as std::shared_ptr constructor arguments can lead to multiple control blocks involves the this pointer. Suppose our program uses std::shared_ptrs to manage Widget objects, and we have a data structure that keeps track of Widgets that have been processed:

std::vector<std::shared_ptr<Widget>> processedWidgets;

Further suppose that Widget has a member function that does the processing:

class Widget {
public:
  …
  void process();
  …
};

Here’s a reasonable-looking approach for Widget::process:

void Widget::process()
{
  …                                       // process the Widget

  processedWidgets.emplace_back(this);    // add it to list of
}                                         // processed Widgets;
                                          // this is wrong!

The comment about this being wrong says it all—or at least most of it. (The part that’s wrong is the passing of this, not the use of emplace_back. If you’re not familiar with emplace_back, see Item 42.) This code will compile, but it’s passing a raw pointer (this) to a container of std::shared_ptrs. The std::shared_ptr thus constructed will create a new control block for the pointed-to Widget (*this). That doesn’t sound harmful until you realize that if there are std::shared_ptrs outside the member function that already point to that Widget, it’s game, set, and match for undefined behavior.

The std::shared_ptr API includes a facility for just this kind of situation. It has probably the oddest of all names in the Standard C++ Library: std::enable_shared_from_this. That’s a template for a base class you inherit from if you want a class managed by std::shared_ptrs to be able to safely create a std::shared_ptr from a this pointer. In our example, Widget would inherit from std::enable_shared_from_this as follows:

class Widget: public std::enable_shared_from_this<Widget> {
public:
  …
  void process();
  …
};

As I said, std::enable_shared_from_this is a base class template. Its type parameter is always the name of the class being derived, so Widget inherits from std::enable_shared_from_this<Widget>. If the idea of a derived class inheriting from a base class templatized on the derived class makes your head hurt, try not to think about it. The code is completely legal, and the design pattern behind it is so well established, it has a standard name, albeit one that’s almost as odd as std::enable_shared_from_this. The name is The Curiously Recurring Template Pattern (CRTP). If you’d like to learn more about it, unleash your search engine, because here we need to get back to std::enable_shared_from_this.

std::enable_shared_from_this defines a member function that creates a std::shared_ptr to the current object, but it does it without duplicating control blocks. The member function is shared_from_this, and you use it in member functions whenever you want a std::shared_ptr that points to the same object as the this pointer. Here’s a safe implementation of Widget::process:

void Widget::process()
{
  // as before, process the Widget
  …

  // add std::shared_ptr to current object to processedWidgets
  processedWidgets.emplace_back(shared_from_this());
}

Internally, shared_from_this looks up the control block for the current object, and it creates a new std::shared_ptr that refers to that control block. The design relies on the current object having an associated control block. For that to be the case, there must be an existing std::shared_ptr (e.g., one outside the member function calling shared_from_this) that points to the current object. If no such std::shared_ptr exists (i.e., if the current object has no associated control block), behavior is undefined, although shared_from_this typically throws an exception.

To prevent clients from calling member functions that invoke shared_from_this before a std::shared_ptr points to the object, classes inheriting from std::enable_shared_from_this often declare their constructors private and have clients create objects by calling factory functions that return std::shared_ptrs. Widget, for example, could look like this:

class Widget: public std::enable_shared_from_this<Widget> {
public:
  // factory function that perfect-forwards args
  // to a private ctor
  template<typename... Ts>
  static std::shared_ptr<Widget> create(Ts&&... params);

  …
  void process();             // as before
  …

private:
  …                           // ctors
};

By now, you may only dimly recall that our discussion of control blocks was motivated by a desire to understand the costs associated with std::shared_ptrs. Now that we understand how to avoid creating too many control blocks, let’s return to the original topic.

A control block is typically only a few words in size, although custom deleters and allocators may make it larger. The usual control block implementation is more sophisticated than you might expect. It makes use of inheritance, and there’s even a virtual function. (It’s used to ensure that the pointed-to object is properly destroyed.) That means that using std::shared_ptrs also incurs the cost of the machinery for the virtual function used by the control block.

Having read about dynamically allocated control blocks, arbitrarily large deleters and allocators, virtual function machinery, and atomic reference count manipulations, your enthusiasm for std::shared_ptrs may have waned somewhat. That’s fine. They’re not the best solution to every resource management problem. But for the functionality they provide, std::shared_ptrs exact a very reasonable cost. Under typical conditions, where the default deleter and default allocator are used and where the std::shared_ptr is created by std::make_shared, the control block is only about three words in size, and its allocation is essentially free. (It’s incorporated into the memory allocation for the object being pointed to. For details, see Item 21.) Dereferencing a std::shared_ptr is no more expensive than dereferencing a raw pointer. Performing an operation requiring a reference count manipulation (e.g., copy construction or copy assignment, destruction) entails one or two atomic operations, but these operations typically map to individual machine instructions, so although they may be expensive compared to non-atomic instructions, they’re still just single instructions. The virtual function machinery in the control block is generally used only once per object managed by std::shared_ptrs: when the object is destroyed.

In exchange for these rather modest costs, you get automatic lifetime management of dynamically allocated resources. Most of the time, using std::shared_ptr is vastly preferable to trying to manage the lifetime of an object with shared ownership by hand. If you find yourself doubting whether you can afford use of std::shared_ptr, reconsider whether you really need shared ownership. If exclusive ownership will do or even may do, std::unique_ptr is a better choice. Its performance profile is close to that for raw pointers, and “upgrading” from std::unique_ptr to std::shared_ptr is easy, because a std::shared_ptr can be created from a std::unique_ptr.

The reverse is not true. Once you’ve turned lifetime management of a resource over to a std::shared_ptr, there’s no changing your mind. Even if the reference count is one, you can’t reclaim ownership of the resource in order to, say, have a std::unique_ptr manage it. The ownership contract between a resource and the std::shared_ptrs that point to it is of the ’til-death-do-us-part variety. No divorce, no annulment, no dispensations.

Something else std::shared_ptrs can’t do is work with arrays. In yet another difference from std::unique_ptr, std::shared_ptr has an API that’s designed only for pointers to single objects. There’s no std::shared_ptr<T[]>. From time to time, “clever” programmers stumble on the idea of using a std::shared_ptr<T> to point to an array, specifying a custom deleter to perform an array delete (i.e., delete []). This can be made to compile, but it’s a horrible idea. For one thing, std::shared_ptr offers no operator[], so indexing into the array requires awkward expressions based on pointer arithmetic. For another, std::shared_ptr supports derived-to-base pointer conversions that make sense for single objects, but that open holes in the type system when applied to arrays. (For this reason, the std::unique_ptr<T[]> API prohibits such conversions.) Most importantly, given the variety of C++11 alternatives to built-in arrays (e.g., std::array, std::vector, std::string), declaring a smart pointer to a dumb array is almost always a sign of bad design.
Things to Remember

    std::shared_ptrs offer convenience approaching that of garbage collection for the shared lifetime management of arbitrary resources.

    Compared to std::unique_ptr, std::shared_ptr objects are typically twice as big, incur overhead for control blocks, and require atomic reference count manipulations.

    Default resource destruction is via delete, but custom deleters are supported. The type of the deleter has no effect on the type of the std::shared_ptr.

    Avoid creating std::shared_ptrs from variables of raw pointer type.
```

#### 35.1.2.1.13 Use std::weak_ptr for std::shared_ptr-like pointers that can dangle.

```text
Paradoxically, it can be convenient to have a smart pointer that acts like a std::shared_ptr (see Item 19), but that doesn’t participate in the shared ownership of the pointed-to resource. In other words, a pointer like std::shared_ptr that doesn’t affect an object’s reference count. This kind of smart pointer has to contend with a problem unknown to std::shared_ptrs: the possibility that what it points to has been destroyed. A truly smart pointer would deal with this problem by tracking when it dangles, i.e., when the object it is supposed to point to no longer exists. That’s precisely the kind of smart pointer std::weak_ptr is. 

You may be wondering how a std::weak_ptr could be useful. You’ll probably wonder even more when you examine the std::weak_ptr API. It looks anything but smart. std::weak_ptrs can’t be dereferenced, nor can they be tested for nullness. That’s because std::weak_ptr isn’t a standalone smart pointer. It’s an augmentation of std::shared_ptr.

The relationship begins at birth. std::weak_ptrs are typically created from std::shared_ptrs. They point to the same place as the std::shared_ptrs initializing them, but they don’t affect the reference count of the object they point to:

auto spw =                       // after spw is constructed,
  std::make_shared<Widget>();    // the pointed-to Widget's
                                 // ref count (RC) is 1. (See
                                 // Item 21 for info on
                                 // std::make_shared.)
…

std::weak_ptr<Widget> wpw(spw);  // wpw points to same Widget
                                 // as spw. RC remains 1
…

spw = nullptr;                   // RC goes to 0, and the
                                 // Widget is destroyed.
                                 // wpw now dangles

std::weak_ptrs that dangle are said to have expired. You can test for this directly,

if (wpw.expired()) …             // if wpw doesn't point
                                 // to an object…

but often what you desire is a check to see if a std::weak_ptr has expired and, if it hasn’t (i.e., if it’s not dangling), to access the object it points to. This is easier desired than done. Because std::weak_ptrs lack dereferencing operations, there’s no way to write the code. Even if there were, separating the check and the dereference would introduce a race condition: between the call to expired and the dereferencing action, another thread might reassign or destroy the last std::shared_ptr pointing to the object, thus causing that object to be destroyed. In that case, your dereference would yield undefined behavior.

What you need is an atomic operation that checks to see if the std::weak_ptr has expired and, if not, gives you access to the object it points to. This is done by creating a std::shared_ptr from the std::weak_ptr. The operation comes in two forms, depending on what you’d like to have happen if the std::weak_ptr has expired when you try to create a std::shared_ptr from it. One form is std::weak_ptr::lock, which returns a std::shared_ptr. The std::shared_ptr is null if the std::weak_ptr has expired:

std::shared_ptr<Widget> spw1 = wpw.lock();  // if wpw's expired,
                                            // spw1 is null

auto spw2 = wpw.lock();                     // same as above,
                                            // but uses auto

The other form is the std::shared_ptr constructor taking a std::weak_ptr as an argument. In this case, if the std::weak_ptr has expired, an exception is thrown:

std::shared_ptr<Widget> spw3(wpw);    // if wpw's expired,
                                      // throw std::bad_weak_ptr

But you’re probably still wondering about how std::weak_ptrs can be useful. Consider a factory function that produces smart pointers to read-only objects based on a unique ID. In accord with Item 18’s advice regarding factory function return types, it returns a std::unique_ptr:

std::unique_ptr<const Widget> loadWidget(WidgetID id);

If loadWidget is an expensive call (e.g., because it performs file or database I/O) and it’s common for IDs to be used repeatedly, a reasonable optimization would be to write a function that does what loadWidget does, but also caches its results. Clogging the cache with every Widget that has ever been requested can lead to performance problems of its own, however, so another reasonable optimization would be to destroy cached Widgets when they’re no longer in use.

For this caching factory function, a std::unique_ptr return type is not a good fit. Callers should certainly receive smart pointers to cached objects, and callers should certainly determine the lifetime of those objects, but the cache needs a pointer to the objects, too. The cache’s pointers need to be able to detect when they dangle, because when factory clients are finished using an object returned by the factory, that object will be destroyed, and the corresponding cache entry will dangle. The cached pointers should therefore be std::weak_ptrs—pointers that can detect when they dangle. That means that the factory’s return type should be a std::shared_ptr, because std::weak_ptrs can detect when they dangle only when an object’s lifetime is managed by std::shared_ptrs.

Here’s a quick-and-dirty implementation of a caching version of loadWidget:

std::shared_ptr<const Widget> fastLoadWidget(WidgetID id)
{
  static std::unordered_map<WidgetID,
                            std::weak_ptr<const Widget>> cache;

  auto objPtr = cache[id].lock();   // objPtr is std::shared_ptr
                                    // to cached object (or null
                                    // if object's not in cache)

  if (!objPtr) {                    // if not in cache,
    objPtr = loadWidget(id);        // load it
    cache[id] = objPtr;             // cache it
  }
  return objPtr;
}

This implementation employs one of C++11’s hash table containers (std::unordered_map), though it doesn’t show the WidgetID hashing and equality-comparison functions that would also have to be present.

The implementation of fastLoadWidget ignores the fact that the cache may accumulate expired std::weak_ptrs corresponding to Widgets that are no longer in use (and have therefore been destroyed). The implementation can be refined, but rather than spend time on an issue that lends no additional insight into std::weak_ptrs, let’s consider a second use case: the Observer design pattern. The primary components of this pattern are subjects (objects whose state may change) and observers (objects to be notified when state changes occur). In most implementations, each subject contains a data member holding pointers to its observers. That makes it easy for subjects to issue state change notifications. Subjects have no interest in controlling the lifetime of their observers (i.e., when they’re destroyed), but they have a great interest in making sure that if an observer gets destroyed, subjects don’t try to subsequently access it. A reasonable design is for each subject to hold a container of std::weak_ptrs to its observers, thus making it possible for the subject to determine whether a pointer dangles before using it.

As a final example of std::weak_ptr’s utility, consider a data structure with objects A, B, and C in it, where A and C share ownership of B and therefore hold std::shared_ptrs to it:
Image

Suppose it’d be useful to also have a pointer from B back to A. What kind of pointer should this be?
Image

There are three choices:

    A raw pointer. With this approach, if A is destroyed, but C continues to point to B, B will contain a pointer to A that will dangle. B won’t be able to detect that, so B may inadvertently dereference the dangling pointer. That would yield undefined behavior.

    A std::shared_ptr. In this design, A and B contain std::shared_ptrs to each other. The resulting std::shared_ptr cycle (A points to B and B points to A) will prevent both A and B from being destroyed. Even if A and B are unreachable from other program data structures (e.g., because C no longer points to B), each will have a reference count of one. If that happens, A and B will have been leaked, for all practical purposes: it will be impossible for the program to access them, yet their resources will never be reclaimed.

    A std::weak_ptr. This avoids both problems above. If A is destroyed, B’s pointer back to it will dangle, but B will be able to detect that. Furthermore, though A and B will point to one another, B’s pointer won’t affect A’s reference count, hence can’t keep A from being destroyed when std::shared_ptrs no longer point to it.

Using std::weak_ptr is clearly the best of these choices. However, it’s worth noting that the need to employ std::weak_ptrs to break prospective cycles of std::shared_ptrs is not terribly common. In strictly hierarchal data structures such as trees, child nodes are typically owned only by their parents. When a parent node is destroyed, its child nodes should be destroyed, too. Links from parents to children are thus generally best represented by std::unique_ptrs. Back-links from children to parents can be safely implemented as raw pointers, because a child node should never have a lifetime longer than its parent. There’s thus no risk of a child node dereferencing a dangling parent pointer.

Of course, not all pointer-based data structures are strictly hierarchical, and when that’s the case, as well as in situations such as caching and the implementation of lists of observers, it’s nice to know that std::weak_ptr stands at the ready.

From an efficiency perspective, the std::weak_ptr story is essentially the same as that for std::shared_ptr. std::weak_ptr objects are the same size as std::shared_ptr objects, they make use of the same control blocks as std::shared_ptrs (see Item 19), and operations such as construction, destruction, and assignment involve atomic reference count manipulations. That probably surprises you, because I wrote at the beginning of this Item that std::weak_ptrs don’t participate in reference counting. Except that’s not quite what I wrote. What I wrote was that std::weak_ptrs don’t participate in the shared ownership of objects and hence don’t affect the pointed-to object’s reference count. There’s actually a second reference count in the control block, and it’s this second reference count that std::weak_ptrs manipulate. For details, continue on to Item 21.
Things to Remember

    Use std::weak_ptr for std::shared_ptr-like pointers that can dangle.

    Potential use cases for std::weak_ptr include caching, observer lists, and the prevention of std::shared_ptr cycles.
```

#### 35.1.2.1.14 Prefer std::make_unique and std::make_shared to direct use of new.

```text
Let’s begin by leveling the playing field for std::make_unique and std::make_shared. std::make_shared is part of C++11, but, sadly, std::make_unique isn’t. It joined the Standard Library as of C++14. If you’re using C++11, never fear, because a basic version of std::make_unique is easy to write yourself. Here, look:

template<typename T, typename... Ts>
std::unique_ptr<T> make_unique(Ts&&... params)
{
  return std::unique_ptr<T>(new T(std::forward<Ts>(params)...));
}

As you can see, make_unique just perfect-forwards its parameters to the constructor of the object being created, constructs a std::unique_ptr from the raw pointer new produces, and returns the std::unique_ptr so created. This form of the function doesn’t support arrays or custom deleters (see Item 18), but it demonstrates that with only a little effort, you can create make_unique if you need to.3 Just remember not to put your version in namespace std, because you won’t want it to clash with a vendor-provided version when you upgrade to a C++14 Standard Library implementation.

std::make_unique and std::make_shared are two of the three make functions: functions that take an arbitrary set of arguments, perfect-forward them to the constructor for a dynamically allocated object, and return a smart pointer to that object. The third make function is std::allocate_shared. It acts just like std::make_shared, except its first argument is an allocator object to be used for the dynamic memory allocation.

Even the most trivial comparison of smart pointer creation using and not using a make function reveals the first reason why using such functions is preferable. Consider:

auto upw1(std::make_unique<Widget>());      // with make func

std::unique_ptr<Widget> upw2(new Widget);   // without make func


auto spw1(std::make_shared<Widget>());      // with make func

std::shared_ptr<Widget> spw2(new Widget);   // without make func

I’ve highlighted the essential difference: the versions using new repeat the type being created, but the make functions don’t. Repeating types runs afoul of a key tenet of software engineering: code duplication should be avoided. Duplication in source code increases compilation times, can lead to bloated object code, and generally renders a code base more difficult to work with. It often evolves into inconsistent code, and inconsistency in a code base often leads to bugs. Besides, typing something twice takes more effort than typing it once, and who’s not a fan of reducing their typing burden?

The second reason to prefer make functions has to do with exception safety. Suppose we have a function to process a Widget in accord with some priority:

void processWidget(std::shared_ptr<Widget> spw, int priority);

Passing the std::shared_ptr by value may look suspicious, but Item 41 explains that if processWidget always makes a copy of the std::shared_ptr (e.g., by storing it in a data structure tracking Widgets that have been processed), this can be a reasonable design choice.

Now suppose we have a function to compute the relevant priority,

int computePriority();

and we use that in a call to processWidget that uses new instead of std::make_shared:

processWidget(std::shared_ptr<Widget>(new Widget),  // potential
              computePriority());                   // resource
                                                    // leak!

As the comment indicates, this code could leak the Widget conjured up by new. But how? Both the calling code and the called function are using std::shared_ptrs, and std::shared_ptrs are designed to prevent resource leaks. They automatically destroy what they point to when the last std::shared_ptr pointing there goes away. If everybody is using std::shared_ptrs everywhere, how can this code leak?

The answer has to do with compilers’ translation of source code into object code. At runtime, the arguments for a function must be evaluated before the function can be invoked, so in the call to processWidget, the following things must occur before processWidget can begin execution:

    The expression “new Widget” must be evaluated, i.e., a Widget must be created on the heap.

    The constructor for the std::shared_ptr<Widget> responsible for managing the pointer produced by new must be executed.

    computePriority must run.

Compilers are not required to generate code that executes them in this order. “new Widget” must be executed before the std::shared_ptr constructor may be called, because the result of that new is used as an argument to that constructor, but computePriority may be executed before those calls, after them, or, crucially, between them. That is, compilers may emit code to execute the operations in this order:

    Perform “new Widget”.

    Execute computePriority.

    Run std::shared_ptr constructor.

If such code is generated and, at runtime, computePriority produces an exception, the dynamically allocated Widget from Step 1 will be leaked, because it will never be stored in the std::shared_ptr that’s supposed to start managing it in Step 3.

Using std::make_shared avoids this problem. Calling code would look like this:

processWidget(std::make_shared<Widget>(),   // no potential
              computePriority());           // resource leak

At runtime, either std::make_shared or computePriority will be called first. If it’s std::make_shared, the raw pointer to the dynamically allocated Widget is safely stored in the returned std::shared_ptr before computePriority is called. If computePriority then yields an exception, the std::shared_ptr destructor will see to it that the Widget it owns is destroyed. And if computePriority is called first and yields an exception, std::make_shared will not be invoked, and there will hence be no dynamically allocated Widget to worry about.

If we replace std::shared_ptr and std::make_shared with std::unique_ptr and std::make_unique, exactly the same reasoning applies. Using std::make_unique instead of new is thus just as important in writing exception-safe code as using std::make_shared.

A special feature of std::make_shared (compared to direct use of new) is improved efficiency. Using std::make_shared allows compilers to generate smaller, faster code that employs leaner data structures. Consider the following direct use of new:

std::shared_ptr<Widget> spw(new Widget);

It’s obvious that this code entails a memory allocation, but it actually performs two. Item 19 explains that every std::shared_ptr points to a control block containing, among other things, the reference count for the pointed-to object. Memory for this control block is allocated in the std::shared_ptr constructor. Direct use of new, then, requires one memory allocation for the Widget and a second allocation for the control block.

If std::make_shared is used instead,

auto spw = std::make_shared<Widget>();

one allocation suffices. That’s because std::make_shared allocates a single chunk of memory to hold both the Widget object and the control block. This optimization reduces the static size of the program, because the code contains only one memory allocation call, and it increases the speed of the executable code, because memory is allocated only once. Furthermore, using std::make_shared obviates the need for some of the bookkeeping information in the control block, potentially reducing the total memory footprint for the program.

The efficiency analysis for std::make_shared is equally applicable to std::allocate_shared, so the performance advantages of std::make_shared extend to that function, as well.

The arguments for preferring make functions over direct use of new are strong ones. Despite their software engineering, exception safety, and efficiency advantages, however, this Item’s guidance is to prefer the make functions, not to rely on them exclusively. That’s because there are circumstances where they can’t or shouldn’t be used.

For example, none of the make functions permit the specification of custom deleters (see Items 18 and 19), but both std::unique_ptr and std::shared_ptr have constructors that do. Given a custom deleter for a Widget,

auto widgetDeleter = [](Widget* pw) { … };

creating a smart pointer using it is straightforward using new:

std::unique_ptr<Widget, decltype(widgetDeleter)>
  upw(new Widget, widgetDeleter);

std::shared_ptr<Widget> spw(new Widget, widgetDeleter);

There’s no way to do the same thing with a make function.

A second limitation of make functions stems from a syntactic detail of their implementations. Item 7 explains that when creating an object whose type overloads constructors both with and without std::initializer_list parameters, creating the object using braces prefers the std::initializer_list constructor, while creating the object using parentheses calls the non-std::initializer_list constructor. The make functions perfect-forward their parameters to an object’s constructor, but do they do so using parentheses or using braces? For some types, the answer to this question makes a big difference. For example, in these calls,

auto upv = std::make_unique<std::vector<int>>(10, 20);

auto spv = std::make_shared<std::vector<int>>(10, 20);

do the resulting smart pointers point to std::vectors with 10 elements, each of value 20, or to std::vectors with two elements, one with value 10 and the other with value 20? Or is the result indeterminate?

The good news is that it’s not indeterminate: both calls create std::vectors of size 10 with all values set to 20. That means that within the make functions, the perfect forwarding code uses parentheses, not braces. The bad news is that if you want to construct your pointed-to object using a braced initializer, you must use new directly. Using a make function would require the ability to perfect-forward a braced initializer, but, as Item 30 explains, braced initializers can’t be perfect-forwarded. However, Item 30 also describes a workaround: use auto type deduction to create a std::initializer_list object from a braced initializer (see Item 2), then pass the auto-created object through the make function:

// create std::initializer_list
auto initList = { 10, 20 };

// create std::vector using std::initializer_list ctor
auto spv = std::make_shared<std::vector<int>>(initList);

For std::unique_ptr, these two scenarios (custom deleters and braced initializers) are the only ones where its make functions are problematic. For std::shared_ptr and its make functions, there are two more. Both are edge cases, but some developers live on the edge, and you may be one of them.

Some classes define their own versions of operator new and operator delete. The presence of these functions implies that the global memory allocation and deallocation routines for objects of these types are inappropriate. Often, class-specific routines are designed only to allocate and deallocate chunks of memory of precisely the size of objects of the class, e.g., operator new and operator delete for class Widget are often designed only to handle allocation and deallocation of chunks of memory of exactly size sizeof(Widget). Such routines are a poor fit for std::shared_ptr’s support for custom allocation (via std::allocate_shared) and deallocation (via custom deleters), because the amount of memory that std::allocate_shared requests isn’t the size of the dynamically allocated object, it’s the size of that object plus the size of a control block. Consequently, using make functions to create objects of types with class-specific versions of operator new and operator delete is typically a poor idea.

The size and speed advantages of std::make_shared vis-à-vis direct use of new stem from std::shared_ptr’s control block being placed in the same chunk of memory as the managed object. When that object’s reference count goes to zero, the object is destroyed (i.e., its destructor is called). However, the memory it occupies can’t be released until the control block has also been destroyed, because the same chunk of dynamically allocated memory contains both.

As I noted, the control block contains bookkeeping information beyond just the reference count itself. The reference count tracks how many std::shared_ptrs refer to the control block, but the control block contains a second reference count, one that tallies how many std::weak_ptrs refer to the control block. This second reference count is known as the weak count.4 When a std::weak_ptr checks to see if it has expired (see Item 19), it does so by examining the reference count (not the weak count) in the control block that it refers to. If the reference count is zero (i.e., if the pointed-to object has no std::shared_ptrs referring to it and has thus been destroyed), the std::weak_ptr has expired. Otherwise, it hasn’t.

As long as std::weak_ptrs refer to a control block (i.e., the weak count is greater than zero), that control block must continue to exist. And as long as a control block exists, the memory containing it must remain allocated. The memory allocated by a std::shared_ptr make function, then, can’t be deallocated until the last std::shared_ptr and the last std::weak_ptr referring to it have been destroyed.

If the object type is quite large and the time between destruction of the last std::shared_ptr and the last std::weak_ptr is significant, a lag can occur between when an object is destroyed and when the memory it occupied is freed:

class ReallyBigType { … };

auto pBigObj =                          // create very large
  std::make_shared<ReallyBigType>();    // object via
                                        // std::make_shared

…            // create std::shared_ptrs and std::weak_ptrs to
             // large object, use them to work with it

…            // final std::shared_ptr to object destroyed here,
             // but std::weak_ptrs to it remain

…            // during this period, memory formerly occupied
             // by large object remains allocated

…            // final std::weak_ptr to object destroyed here;
             // memory for control block and object is released

With a direct use of new, the memory for the ReallyBigType object can be released as soon as the last std::shared_ptr to it is destroyed:

class ReallyBigType { … };              // as before

std::shared_ptr<ReallyBigType> pBigObj(new ReallyBigType);
                                        // create very large
                                        // object via new

…            // as before, create std::shared_ptrs and
             // std::weak_ptrs to object, use them with it

…            // final std::shared_ptr to object destroyed here,
             // but std::weak_ptrs to it remain;
             // memory for object is deallocated

…            // during this period, only memory for the
             // control block remains allocated

…            // final std::weak_ptr to object destroyed here;
             // memory for control block is released

Should you find yourself in a situation where use of std::make_shared is impossible or inappropriate, you’ll want to guard yourself against the kind of exception-safety problems we saw earlier. The best way to do that is to make sure that when you use new directly, you immediately pass the result to a smart pointer constructor in a statement that does nothing else. This prevents compilers from generating code that could emit an exception between the use of new and invocation of the constructor for the smart pointer that will manage the newed object.

As an example, consider a minor revision to the exception-unsafe call to the processWidget function we examined earlier. This time, we’ll specify a custom deleter:

void processWidget(std::shared_ptr<Widget> spw,  // as before
                   int priority);

void cusDel(Widget *ptr);                        // custom
                                                 // deleter

Here’s the exception-unsafe call:

processWidget(                                   // as before,
  std::shared_ptr<Widget>(new Widget, cusDel),   // potential
  computePriority()                              // resource
);                                               // leak!

Recall: if computePriority is called after “new Widget” but before the std::shared_ptr constructor, and if computePriority yields an exception, the dynamically allocated Widget will be leaked.

Here the use of a custom deleter precludes use of std::make_shared, so the way to avoid the problem is to put the allocation of the Widget and the construction of the std::shared_ptr into their own statement, then call processWidget with the resulting std::shared_ptr. Here’s the essence of the technique, though, as we’ll see in a moment, we can tweak it to improve its performance:

std::shared_ptr<Widget> spw(new Widget, cusDel);

processWidget(spw, computePriority());     // correct, but not
                                           // optimal; see below

This works, because a std::shared_ptr assumes ownership of the raw pointer passed to its constructor, even if that constructor yields an exception. In this example, if spw’s constructor throws an exception (e.g., due to an inability to dynamically allocate memory for a control block), it’s still guaranteed that cusDel will be invoked on the pointer resulting from “new Widget”.

The minor performance hitch is that in the exception-unsafe call, we’re passing an rvalue to processWidget,

processWidget(
  std::shared_ptr<Widget>(new Widget, cusDel),  // arg is rvalue
  computePriority()
);

but in the exception-safe call, we’re passing an lvalue:

processWidget(spw, computePriority());          // arg is lvalue

Because processWidget’s std::shared_ptr parameter is passed by value, construction from an rvalue entails only a move, while construction from an lvalue requires a copy. For std::shared_ptr, the difference can be significant, because copying a std::shared_ptr requires an atomic increment of its reference count, while moving a std::shared_ptr requires no reference count manipulation at all. For the exception-safe code to achieve the level of performance of the exception-unsafe code, we need to apply std::move to spw to turn it into an rvalue (see Item 23):

processWidget(std::move(spw),            // both efficient and
              computePriority());        // exception safe

That’s interesting and worth knowing, but it’s also typically irrelevant, because you’ll rarely have a reason not to use a make function. And unless you have a compelling reason for doing otherwise, using a make function is what you should do.
Things to Remember

    Compared to direct use of new, make functions eliminate source code duplication, improve exception safety, and, for std::make_shared and std::allocate_shared, generate code that’s smaller and faster.

    Situations where use of make functions is inappropriate include the need to specify custom deleters and a desire to pass braced initializers.

    For std::shared_ptrs, additional situations where make functions may be ill-advised include (1) classes with custom memory management and (2) systems with memory concerns, very large objects, and std::weak_ptrs that outlive the corresponding std::shared_ptrs.

				35.1.2.1.15  When using the Pimpl Idiom, define special member functions in the implementation file.

If you’ve ever had to combat excessive build times, you’re familiar with the Pimpl (“pointer to implementation”) Idiom. That’s the technique whereby you replace the data members of a class with a pointer to an implementation class (or struct), put the data members that used to be in the primary class into the implementation class, and access those data members indirectly through the pointer. For example, suppose Widget looks like  this:

class Widget {                     // in header "widget.h"
public:
  Widget();
  …
private:
  std::string name;
  std::vector<double> data;
  Gadget g1, g2, g3;               // Gadget is some user-
};                                 // defined type

Because Widget’s data members are of types std::string, std::vector, and Gadget, headers for those types must be present for Widget to compile, and that means that Widget clients must #include <string>, <vector>, and gadget.h. Those headers increase the compilation time for Widget clients, plus they make those clients dependent on the contents of the headers. If a header’s content changes, Widget clients must recompile. The standard headers <string> and <vector> don’t change very often, but it could be that gadget.h is subject to frequent revision.

Applying the Pimpl Idiom in C++98 could have Widget replace its data members with a raw pointer to a struct that has been declared, but not defined:

class Widget {                 // still in header "widget.h"
public:
  Widget();
  ~Widget();                   // dtor is needed—see below
  …

private:
  struct Impl;                 // declare implementation struct
  Impl *pImpl;                 // and pointer to it
};

Because Widget no longer mentions the types std::string, std::vector, and Gadget, Widget clients no longer need to #include the headers for these types. That speeds compilation, and it also means that if something in these headers changes, Widget clients are unaffected.

A type that has been declared, but not defined, is known as an incomplete type. Widget::Impl is such a type. There are very few things you can do with an incomplete type, but declaring a pointer to it is one of them. The Pimpl Idiom takes advantage of that.

Part 1 of the Pimpl Idiom is the declaration of a data member that’s a pointer to an incomplete type. Part 2 is the dynamic allocation and deallocation of the object that holds the data members that used to be in the original class. The allocation and deallocation code goes in the implementation file, e.g., for Widget, in widget.cpp:

#include "widget.h"            // in impl. file "widget.cpp"
#include "gadget.h"
#include <string>
#include <vector>

struct Widget::Impl {          // definition of Widget::Impl
  std::string name;            // with data members formerly
  std::vector<double> data;    // in Widget
  Gadget g1, g2, g3;
};

Widget::Widget()               // allocate data members for
: pImpl(new Impl)              // this Widget object
{}

Widget::~Widget()              // destroy data members for
{ delete pImpl; }              // this object

Here I’m showing #include directives to make clear that the overall dependencies on the headers for std::string, std::vector, and Gadget continue to exist. However, these dependencies have been moved from widget.h (which is visible to and used by Widget clients) to widget.cpp (which is visible to and used only by the Widget implementer). I’ve also highlighted the code that dynamically allocates and deallocates the Impl object. The need to deallocate this object when a Widget is destroyed is what necessitates the Widget destructor.

But I’ve shown you C++98 code, and that reeks of a bygone millennium. It uses raw pointers and raw new and raw delete and it’s all just so…raw. This chapter is built on the idea that smart pointers are preferable to raw pointers, and if what we want is to dynamically allocate a Widget::Impl object inside the Widget constructor and have it destroyed at the same time the Widget is, std::unique_ptr (see Item 18) is precisely the tool we need. Replacing the raw pImpl pointer with a std::unique_ptr yields this code for the header file,

class Widget {                      // in "widget.h"
public:
  Widget();
  …

private:
  struct Impl; 
  std::unique_ptr<Impl> pImpl;      // use smart pointer
};                                  // instead of raw pointer

and this for the implementation file:

#include "widget.h"                 // in "widget.cpp"
#include "gadget.h"
#include <string>
#include <vector>

struct Widget::Impl {               // as before
  std::string name;
  std::vector<double> data;
  Gadget g1, g2, g3;
};

Widget::Widget()                    // per Item 21, create
: pImpl(std::make_unique<Impl>())   // std::unique_ptr
{}                                  // via std::make_unique

You’ll note that the Widget destructor is no longer present. That’s because we have no code to put into it. std::unique_ptr automatically deletes what it points to when it (the std::unique_ptr) is destroyed, so we need not delete anything ourselves. That’s one of the attractions of smart pointers: they eliminate the need for us to sully our hands with manual resource release.

This code compiles, but, alas, the most trivial client use doesn’t:

#include "widget.h"

Widget w;                           // error!

The error message you receive depends on the compiler you’re using, but the text generally mentions something about applying sizeof or delete to an incomplete type. Those operations aren’t among the things you can do with such types.

This apparent failure of the Pimpl Idiom using std::unique_ptrs is alarming, because (1) std::unique_ptr is advertised as supporting incomplete types, and (2) the Pimpl Idiom is one of std::unique_ptrs most common use cases. Fortunately, getting the code to work is easy. All that’s required is a basic understanding of the cause of the problem.

The issue arises due to the code that’s generated when w is destroyed (e.g., goes out of scope). At that point, its destructor is called. In the class definition using std::unique_ptr, we didn’t declare a destructor, because we didn’t have any code to put into it. In accord with the usual rules for compiler-generated special member functions (see Item 17), the compiler generates a destructor for us. Within that destructor, the compiler inserts code to call the destructor for Widget’s data member pImpl. pImpl is a std::unique_ptr<Widget::Impl>, i.e., a std::unique_ptr using the default deleter. The default deleter is a function that uses delete on the raw pointer inside the std::unique_ptr. Prior to using delete, however, implementations typically have the default deleter employ C++11’s static_assert to ensure that the raw pointer doesn’t point to an incomplete type. When the compiler generates code for the destruction of the Widget w, then, it generally encounters a static_assert that fails, and that’s usually what leads to the error message. This message is associated with the point where w is destroyed, because Widget’s destructor, like all compiler-generated special member functions, is implicitly inline. The message itself often refers to the line where w is created, because it’s the source code explicitly creating the object that leads to its later implicit destruction.

To fix the problem, you just need to make sure that at the point where the code to destroy the std::unique_ptr<Widget::Impl> is generated, Widget::Impl is a complete type. The type becomes complete when its definition has been seen, and Widget::Impl is defined inside widget.cpp. The key to successful compilation, then, is to have the compiler see the body of Widget’s destructor (i.e., the place where the compiler will generate code to destroy the std::unique_ptr data member) only inside widget.cpp after Widget::Impl has been defined.

Arranging for that is simple. Declare Widget’s destructor in widget.h, but don’t define it there:

class Widget {                     // as before, in "widget.h"
public:
  Widget();
  ~Widget();                       // declaration only
  …

private:                           // as before
  struct Impl;
  std::unique_ptr<Impl> pImpl;
};

Define it in widget.cpp after Widget::Impl has been defined:

#include "widget.h"                // as before, in "widget.cpp"
#include "gadget.h"
#include <string>
#include <vector>

struct Widget::Impl {              // as before, definition of
  std::string name;                // Widget::Impl
  std::vector<double> data;
  Gadget g1, g2, g3;
};

Widget::Widget()                   // as before
: pImpl(std::make_unique<Impl>())
{}

Widget::~Widget()                  // ~Widget definition
{}

This works well, and it requires the least typing, but if you want to emphasize that the compiler-generated destructor would do the right thing—that the only reason you declared it was to cause its definition to be generated in Widget’s implementation file, you can define the destructor body with “= default”:

Widget::~Widget() = default;       // same effect as above

Classes using the Pimpl Idiom are natural candidates for move support, because compiler-generated move operations do exactly what’s desired: perform a move on the underlying std::unique_ptr. As Item 17 explains, the declaration of a destructor in Widget prevents compilers from generating the move operations, so if you want move support, you must declare the functions yourself. Given that the compiler-generated versions would behave correctly, you’re likely to be tempted to implement them as follows:

class Widget {                                 // still in
public:                                        // "widget.h"
  Widget();
  ~Widget();

  Widget(Widget&& rhs) = default;              // right idea,
  Widget& operator=(Widget&& rhs) = default;   // wrong code!
 
  …

private:                                       // as before
  struct Impl;
  std::unique_ptr<Impl> pImpl;
};

This approach leads to the same kind of problem as declaring the class without a destructor, and for the same fundamental reason. The compiler-generated move assignment operator needs to destroy the object pointed to by pImpl before reassigning it, but in the Widget header file, pImpl points to an incomplete type. The situation is different for the move constructor. The problem there is that compilers typically generate code to destroy pImpl in the event that an exception arises inside the move constructor, and destroying pImpl requires that Impl be complete.

Because the problem is the same as before, so is the fix—move the definition of the move operations into the implementation file:

class Widget {                       // still in "widget.h"
public:
  Widget();
  ~Widget();

  Widget(Widget&& rhs);              // declarations
  Widget& operator=(Widget&& rhs);   // only

  …

private:                             // as before
  struct Impl;
  std::unique_ptr<Impl> pImpl;
};

#include <string>                    // as before,
…                                    // in "widget.cpp"

struct Widget::Impl { … };           // as before

Widget::Widget()                     // as before
: pImpl(std::make_unique<Impl>())
{}

Widget::~Widget() = default;         // as before

Widget::Widget(Widget&& rhs) = default;              // defini-
Widget& Widget::operator=(Widget&& rhs) = default;   // tions

The Pimpl Idiom is a way to reduce compilation dependencies between a class’s implementation and the class’s clients, but, conceptually, use of the idiom doesn’t change what the class represents. The original Widget class contained std::string, std::vector, and Gadget data members, and, assuming that Gadgets, like std::strings and std::vectors, can be copied, it would make sense for Widget to support the copy operations. We have to write these functions ourselves, because (1) compilers won’t generate copy operations for classes with move-only types like std::unique_ptr and (2) even if they did, the generated functions would copy only the std::unique_ptr (i.e., perform a shallow copy), and we want to copy what the pointer points to (i.e., perform a deep copy).

In a ritual that is by now familiar, we declare the functions in the header file and implement them in the implementation file:

class Widget {                         // still in "widget.h"
public:
  …                                    // other funcs, as before

  Widget(const Widget& rhs);              // declarations
  Widget& operator=(const Widget& rhs);   // only

private:                                  // as before
  struct Impl;
  std::unique_ptr<Impl> pImpl;
};


#include "widget.h"                  // as before,
…                                    // in "widget.cpp"

struct Widget::Impl { … };           // as before

Widget::~Widget() = default;         // other funcs, as before

Widget::Widget(const Widget& rhs)              // copy ctor
: pImpl(nullptr)
{ if (rhs.pImpl) pImpl = std::make_unique<Impl>(*rhs.pImpl); }

Widget& Widget::operator=(const Widget& rhs)   // copy operator=
{
  if (!rhs.pImpl) pImpl.reset();
  else if (!pImpl) pImpl = std::make_unique<Impl>(*rhs.pImpl);
  else *pImpl = *rhs.pImpl;

  return *this;
}

The implementations are straightforward, though we must handle cases where the parameter rhs or, in the case of the copy assignment operator, *this has been moved from and thus contains a null pImpl pointer. In general, we take advantage of the fact that compilers will create the copy operations for Impl, and these operations will copy each field automatically. We thus implement Widget’s copy operations by calling Widget::Impl’s compiler-generated copy operations. In both functions, note that we still follow the advice of Item 21 to prefer use of std::make_unique over direct use of new.

For purposes of implementing the Pimpl Idiom, std::unique_ptr is the smart pointer to use, because the pImpl pointer inside an object (e.g., inside a Widget) has exclusive ownership of the corresponding implementation object (e.g., the Widget::Impl object). Still, it’s interesting to note that if we were to use std::shared_ptr instead of std::unique_ptr for pImpl (i.e., if the values in an Impl struct could be shared by multiple Widgets), we’d find that the advice of this Item no longer applied. There’d be no need to declare a destructor in Widget, and without a user-declared destructor, compilers would happily generate the move operations, which would do exactly what we’d want them to. That is, given this code in widget.h,

class Widget {                     // in "widget.h"
public:
  Widget();
  …                                // no declarations for dtor
                                   // or move operations
private:
  struct Impl; 
  std::shared_ptr<Impl> pImpl;     // std::shared_ptr
};                                 // instead of std::unique_ptr

and this client code that #includes widget.h,

Widget w1;

auto w2(std::move(w1));            // move-construct w2

w1 = std::move(w2);                // move-assign w1

everything would compile and run as we’d hope: w1 would be default constructed, its value would be moved into w2, that value would be moved back into w1, and then both w1 and w2 would be destroyed (thus causing the pointed-to Widget::Impl object to be destroyed).

The difference in behavior between std::unique_ptr and std::shared_ptr for pImpl pointers stems from the differing ways these smart pointers support custom deleters. For std::unique_ptr, the type of the deleter is part of the type of the smart pointer, and this makes it possible for compilers to generate smaller runtime data structures and faster runtime code. A consequence of this greater efficiency is that pointed-to types must be complete when compiler-generated special functions (e.g., destructors or move operations) are used. For std::shared_ptr, the type of the deleter is not part of the type of the smart pointer. This necessitates larger runtime data structures and somewhat slower code, but pointed-to types need not be complete when compiler-generated special functions are employed.

For the Pimpl Idiom, there’s not really a trade-off between the characteristics of std::unique_ptr and std::shared_ptr, because the relationship between classes like Widget and classes like Widget::Impl is exclusive ownership, and that makes std::unique_ptr the proper tool for the job. Nevertheless, it’s worth knowing that in other situations—situations where shared ownership exists (and std::shared_ptr is hence a fitting design choice), there’s no need to jump through the function-definition hoops that use of std::unique_ptr entails.
Things to Remember

    The Pimpl Idiom decreases build times by reducing compilation dependencies between class clients and class implementations.

    For std::unique_ptr pImpl pointers, declare special member functions in the class header, but implement them in the implementation file. Do this even if the default function implementations are acceptable.

    The above advice applies to std::unique_ptr, but not to std::shared_ptr.

1 There are a few exceptions to this rule. Most stem from abnormal program termination. If an exception propagates out of a thread’s primary function (e.g., main, for the program’s initial thread) or if a noexcept specification is violated (see Item 14), local objects may not be destroyed, and if std::abort or an exit function (i.e., std::_Exit, std::exit, or std::quick_exit) is called, they definitely won’t be.

2 This implementation is not required by the Standard, but every Standard Library implementation I’m familiar with employs it.

3 To create a full-featured make_unique with the smallest effort possible, search for the standardization document that gave rise to it, then copy the implementation you’ll find there. The document you want is N3656 by Stephan T. Lavavej, dated 2013-04-18.

4 In practice, the value of the weak count isn’t always equal to the number of std::weak_ptrs referring to the control block, because library implementers have found ways to slip additional information into the weak count that facilitate better code generation. For purposes of this Item, we’ll ignore this and assume that the weak count’s value is the number of std::weak_ptrs referring to the control block.
```

#### 35.1.2.1.16 Rvalue References, Move Semantics, and Perfect Forwarding

```text
When you first learn about them, move semantics and perfect forwarding seem pretty straightforward:

    Move semantics makes it possible for compilers to replace expensive copying operations with less expensive moves. In the same way that copy constructors and copy assignment operators give you control over what it means to copy objects, move constructors and move assignment operators offer control over the semantics of moving. Move semantics also enables the creation of move-only types, such as std::unique_ptr, std::future, and std::thread.

    Perfect forwarding makes it possible to write function templates that take arbitrary arguments and forward them to other functions such that the target functions receive exactly the same arguments as were passed to the forwarding functions.

Rvalue references are the glue that ties these two rather disparate features together. They’re the underlying language mechanism that makes both move semantics and perfect forwarding possible.

The more experience you have with these features, the more you realize that your initial impression was based on only the metaphorical tip of the proverbial iceberg. The world of move semantics, perfect forwarding, and rvalue references is more nuanced than it appears. std::move doesn’t move anything, for example, and perfect forwarding is imperfect. Move operations aren’t always cheaper than copying; when they are, they’re not always as cheap as you’d expect; and they’re not always called in a context where moving is valid. The construct “type&&” doesn’t always represent an rvalue reference.

No matter how far you dig into these features, it can seem that there’s always more to uncover. Fortunately, there is a limit to their depths. This chapter will take you to the bedrock. Once you arrive, this part of C++11 will make a lot more sense. You’ll know the usage conventions for std::move and std::forward, for example. You’ll be comfortable with the ambiguous nature of “type&&”. You’ll understand the reasons for the surprisingly varied behavioral profiles of move operations. All those pieces will fall into place. At that point, you’ll be back where you started, because move semantics, perfect forwarding, and rvalue references will once again seem pretty straightforward. But this time, they’ll stay that way.

In the Items in this chapter, it’s especially important to bear in mind that a parameter is always an lvalue, even if its type is an rvalue reference. That is, given

void f(Widget&& w);

the parameter w is an lvalue, even though its type is rvalue-reference-to-Widget. (If this surprises you, please review the overview of lvalues and rvalues that begins here.)
```

#### 35.1.2.1.16.1 Understand std::move and std::forward.

```text
It’s useful to approach std::move and std::forward in terms of what they don’t do. std::move doesn’t move anything. std::forward doesn’t forward anything. At runtime, neither does anything at all. They generate no executable code. Not a single byte.

std::move and std::forward are merely functions (actually function templates) that perform casts. std::move unconditionally casts its argument to an rvalue, while std::forward performs this cast only if a particular condition is fulfilled. That’s it. The explanation leads to a new set of questions, but, fundamentally, that’s the complete story.

To make the story more concrete, here’s a sample implementation of std::move in C++11. It’s not fully conforming to the details of the Standard, but it’s very close.

template<typename T>                       // in namespace std
typename remove_reference<T>::type&&
move(T&& param)
{
  using ReturnType =                       // alias declaration;
    typename remove_reference<T>::type&&;  // see Item 9

  return static_cast<ReturnType>(param);
}

I’ve highlighted two parts of the code for you. One is the name of the function, because the return type specification is rather noisy, and I don’t want you to lose your bearings in the din. The other is the cast that comprises the essence of the function. As you can see, std::move takes a reference to an object (a universal reference, to be precise—see Item 24) and it returns a reference to the same object.

The “&&” part of the function’s return type implies that std::move returns an rvalue reference, but, as Item 28 explains, if the type T happens to be an lvalue reference, T&& would become an lvalue reference. To prevent this from happening, the type trait (see Item 9) std::remove_reference is applied to T, thus ensuring that “&&” is applied to a type that isn’t a reference. That guarantees that std::move truly returns an rvalue reference, and that’s important, because rvalue references returned from functions are rvalues. Thus, std::move casts its argument to an rvalue, and that’s all it does.

As an aside, std::move can be implemented with less fuss in C++14. Thanks to function return type deduction (see Item 3) and to the Standard Library’s alias template std::remove_reference_t (see Item 9), std::move can be written this way:

template<typename T>                          // C++14; still in
decltype(auto) move(T&& param)                // namespace std
{
  using ReturnType = remove_reference_t<T>&&;
  return static_cast<ReturnType>(param);
}

Easier on the eyes, no?

Because std::move does nothing but cast its argument to an rvalue, there have been suggestions that a better name for it might have been something like rvalue_cast. Be that as it may, the name we have is std::move, so it’s important to remember what std::move does and doesn’t do. It does cast. It doesn’t move.

Of course, rvalues are candidates for moving, so applying std::move to an object tells the compiler that the object is eligible to be moved from. That’s why std::move has the name it does: to make it easy to designate objects that may be moved from.

In truth, rvalues are only usually candidates for moving. Suppose you’re writing a class representing annotations. The class’s constructor takes a std::string parameter comprising the annotation, and it copies the parameter to a data member. Flush with the information in Item 41, you declare a by-value parameter:

class Annotation {
public:
  explicit Annotation(std::string text);  // param to be copied,
  …                                       // so per Item 41,
};                                        // pass by value

But Annotation’s constructor needs only to read text’s value. It doesn’t need to modify it. In accord with the time-honored tradition of using const whenever possible, you revise your declaration such that text is const:

class Annotation {
public:
  explicit Annotation(const std::string text);
  …
};

To avoid paying for a copy operation when copying text into a data member, you remain true to the advice of Item 41 and apply std::move to text, thus producing an rvalue:

class Annotation {
public:
  explicit Annotation(const std::string text)
  : value(std::move(text))  // "move" text into value; this code
  { … }                     // doesn't do what it seems to!
  
  …

private:
  std::string value;
};

This code compiles. This code links. This code runs. This code sets the data member value to the content of text. The only thing separating this code from a perfect realization of your vision is that text is not moved into value, it’s copied. Sure, text is cast to an rvalue by std::move, but text is declared to be a const std::string, so before the cast, text is an lvalue const std::string, and the result of the cast is an rvalue const std::string, but throughout it all, the constness remains.

Consider the effect that has when compilers have to determine which std::string constructor to call. There are two possibilities:

class string {            // std::string is actually a 
public:                   // typedef for std::basic_string<char>
  …
  string(const string& rhs);    // copy ctor
  string(string&& rhs);         // move ctor
  …
};

In the Annotation constructor’s member initialization list, the result of std::move(text) is an rvalue of type const std::string. That rvalue can’t be passed to std::string’s move constructor, because the move constructor takes an rvalue reference to a non-const std::string. The rvalue can, however, be passed to the copy constructor, because an lvalue-reference-to-const is permitted to bind to a const rvalue. The member initialization therefore invokes the copy constructor in std::string, even though text has been cast to an rvalue! Such behavior is essential to maintaining const-correctness. Moving a value out of an object generally modifies the object, so the language should not permit const objects to be passed to functions (such as move constructors) that could modify them.

There are two lessons to be drawn from this example. First, don’t declare objects const if you want to be able to move from them. Move requests on const objects are silently transformed into copy operations. Second, std::move not only doesn’t actually move anything, it doesn’t even guarantee that the object it’s casting will be eligible to be moved. The only thing you know for sure about the result of applying std::move to an object is that it’s an rvalue.

The story for std::forward is similar to that for std::move, but whereas std::move unconditionally casts its argument to an rvalue, std::forward does it only under certain conditions. std::forward is a conditional cast. To understand when it casts and when it doesn’t, recall how std::forward is typically used. The most common scenario is a function template taking a universal reference parameter that is to be passed to another function:

void process(const Widget& lvalArg);     // process lvalues
void process(Widget&& rvalArg);          // process rvalues

template<typename T>                     // template that passes
void logAndProcess(T&& param)            // param to process
{
  auto now =                             // get current time
    std::chrono::system_clock::now();

  makeLogEntry("Calling 'process'", now);
  process(std::forward<T>(param));
}

Consider two calls to logAndProcess, one with an lvalue, the other with an rvalue:

Widget w;

logAndProcess(w);                  // call with lvalue
logAndProcess(std::move(w));       // call with rvalue

Inside logAndProcess, the parameter param is passed to the function process. process is overloaded for lvalues and rvalues. When we call logAndProcess with an lvalue, we naturally expect that lvalue to be forwarded to process as an lvalue, and when we call logAndProcess with an rvalue, we expect the rvalue overload of process to be invoked.

But param, like all function parameters, is an lvalue. Every call to process inside logAndProcess will thus want to invoke the lvalue overload for process. To prevent this, we need a mechanism for param to be cast to an rvalue if and only if the argument with which param was initialized—the argument passed to logAndProcess—was an rvalue. This is precisely what std::forward does. That’s why std::forward is a conditional cast: it casts to an rvalue only if its argument was initialized with an rvalue.

You may wonder how std::forward can know whether its argument was initialized with an rvalue. In the code above, for example, how can std::forward tell whether param was initialized with an lvalue or an rvalue? The brief answer is that that information is encoded in logAndProcess’s template parameter T. That parameter is passed to std::forward, which recovers the encoded information. For details on exactly how that works, consult Item 28.

Given that both std::move and std::forward boil down to casts, the only difference being that std::move always casts, while std::forward only sometimes does, you might ask whether we can dispense with std::move and just use std::forward everywhere. From a purely technical perspective, the answer is yes: std::forward can do it all. std::move isn’t necessary. Of course, neither function is really necessary, because we could write casts everywhere, but I hope we agree that that would be, well, yucky.

std::move’s attractions are convenience, reduced likelihood of error, and greater clarity. Consider a class where we want to track how many times the move constructor is called. A static counter that’s incremented during move construction is all we need. Assuming the only non-static data in the class is a std::string, here’s the conventional way (i.e., using std::move) to implement the move constructor:

class Widget {
public:
  Widget(Widget&& rhs)
  : s(std::move(rhs.s))
  { ++moveCtorCalls; }

  …

private:
  static std::size_t moveCtorCalls;
  std::string s;
};

To implement the same behavior with std::forward, the code would look like this:

class Widget {
public:
  Widget(Widget&& rhs)                      // unconventional,
  : s(std::forward<std::string>(rhs.s))     // undesirable
  { ++moveCtorCalls; }                      // implementation

  …

};

Note first that std::move requires only a function argument (rhs.s), while std::forward requires both a function argument (rhs.s) and a template type argument (std::string). Then note that the type we pass to std::forward should be a non-reference, because that’s the convention for encoding that the argument being passed is an rvalue (see Item 28). Together, this means that std::move requires less typing than std::forward, and it spares us the trouble of passing a type argument that encodes that the argument we’re passing is an rvalue. It also eliminates the possibility of our passing an incorrect type (e.g., std::string&, which would result in the data member s being copy constructed instead of move constructed).

More importantly, the use of std::move conveys an unconditional cast to an rvalue, while the use of std::forward indicates a cast to an rvalue only for references to which rvalues have been bound. Those are two very different actions. The first one typically sets up a move, while the second one just passes—forwards—an object to another function in a way that retains its original lvalueness or rvalueness. Because these actions are so different, it’s good that we have two different functions (and function names) to distinguish them.
Things to Remember

    std::move performs an unconditional cast to an rvalue. In and of itself, it doesn’t move anything.

    std::forward casts its argument to an rvalue only if that argument is bound to an rvalue.

    Neither std::move nor std::forward do anything at runtime.


					35.1.2.1.16.2  
					35.1.2.1.16.3  
					35.1.2.1.16.4  
					35.1.2.1.16.5  
					35.1.2.1.16.6  
					35.1.2.1.16.7  


				35.1.2.1.17  
				35.1.2.1.18  
				35.1.2.1.19  
				35.1.2.1.20  
				35.1.2.1.21  
				35.1.2.1.22  
				35.1.2.1.23  
				35.1.2.1.24  
				35.1.2.1.25  
				35.1.2.1.26  
				35.1.2.1.27  
				35.1.2.1.28  
				35.1.2.1.29  
				35.1.2.1.30  
				35.1.2.1.31  
			35.1.2.2




		35.1.3
	35.2
```
