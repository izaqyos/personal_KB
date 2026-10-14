---
type: reference
title: Vector
description: "std::vector: types, constructors, size and altering operations."
tags: [cpp, stl, legacy, reference, examples]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-cpp#4.2"
---

# 4.2 Vector

[↑ Standard template library, STL, namespace std](/kb-cpp/04-standard-template-library-stl-namespace-std/README.md)

```text
The vector template class provides a form of dynamic array that expands at the end as necessary to accommodate additional elements.
```

### 4.2.1 Types

```text
Assume that T is some type (eg, int) and the following declarations:

   T e;
   vector<T> v, v1;
   vector<T>::iterator iter, iter2, beg, end;
   vector<T>::reverse_iterator riter;  /* beg, end could also be here */
   int i, n;
   bool b;
```

### 4.2.2 CTOR/DTOR

```text
Common vector constructors, functions, operators, etc
Result 	Method 	
	Description
Constructors and destructors
  	vector<T> v; 	L
	Creates an empty vector of T's.
  	vector<T> v(n); 	
	Creates vector of n default values.
  	vector<T> v(n, e); 	L
	Creates vector of n copies of e.
  	vector<T> v(beg, end); 	L
	Creates vector with elements copied from range beg..end.
  	v.~vector<T>(); 	L
	Destroys all elems and frees memory.
```

### 4.2.3 Size

```text
i =  	v.size(); 	L
	Number of elements.
i =  	v.capacity(); 	
	Max number of elements before reallocation.
i =  	v.max_size(); 	
	Implementation max number of elements.
b =  	v.empty(); 	L
	True if empty. Same as v.size()==0
  	v.reserve(n); 	
	Sets capacity to n before reallocation
```

### 4.2.4 Altering

```text
v =  	v1; 	L
	Assigns v1 to v.
v[i] =  	e; 	
	Sets ith element. Subscripts from zero.
v.at(i) =  	e; 	
	As subscription, but may throw out_of_range.
v.front() =  	e; 	L 	Same as v[0] = e.
v.back() =  	e; 	L 	Same as v[v.size()-1] = e.
  	v.push_back(e); 	L
	Adds e to end of v. Expands v if necessary.
  	v.pop_back(); 	L
	Removes last element of v.
  	v.clear(); 	L
	Removes all elements.
iter =  	v.assign(n, e); 	L
	Replaces existing elements with n copies of e.
iter =  	v.assign(beg, end); 	L
	Replaces existing elements with copies from range beg..end.
iter2 =  	v.insert(iter, e); 	L
	Inserts a copy of e at iter position and returns its position.
  	v.insert(iter, n, e); 	L
	Inserts n copies of e starting at iter position.
  	v.insert(iter, beg, end); 	L
	Inserts all elements in range beg..end, starting at iter position.
iter2 =  	v.erase(iter); 	L
	Removes element at iter position and returns position of next element.
iter =  	v.erase(beg, end); 	L
	Removes range beg..end and returns position of next element.
```

### 4.2.5 Access

```text
e =  	v[i]; 	
	ith element. No range checking.
e =  	v.at(i); 	
	As subscription, but may throw out_of_range.
e =  	v.front(); 	L
	First element. No range checking.
e =  	v.back(); 	L
	Last element. No range checking.
Iterators (operators apply to both forward and reverse iterators)
iter =  	v.begin(); 	L
	Returns iterator to first element.
iter =  	v.end(); 	L
	Returns iterator to after last element.
riter =  	v.rbegin(); 	L
	Returns iterator to first (in reverse order) element.
riter =  	v.rend(); 	L
	Returns iterator to after last (in reverse order) element.

	++iter; 	L
	Preincrement iter to next element. Use in both forward and reverse iterators normally. Can also postincrement. Returns value.

	--iter; 	L
	Predecrement iter. Can also postincrement. Returns value.
iter2 =  	iter + i; 	
	Iterator i elements after iter. += assigment also defined.
iter2 =  	iter - i; 	
	Iterator i elements before iter -= assignment also defined.
e =  	*iter; 	L
	Dereference the iterator to get the value.
```

### 4.2.6 Iteration

#### 4.2.6.1 C++ STL: Which method of iteration over a STL container is better?

```text
This may seem frivolous to some of you, but which of the following 2 methods of iteration over a STL container is better? Why?

class Elem;
typedef vector<Elem> ElemVec;
ElemVec elemVec;

// Method 0
for (ElemVec::iterator i = elemVec.begin(); i != elemVec.end(); ++i)
{
    Elem& e = *i;
    // Do something
}

// Method 1
for (int i = 0; i < elemVec.size(); ++i)
{
    Elem& e = elemVec.at(i);
    // Do something
}

Method 0 seems like cleaner STL, but Method 1 achieves the same with lesser code. Simple iteration over a container is what appears all over the place in any source code. So, I'm inclined to pick Method 1 which seems to reduce visual clutter and code size.


The first version works with any container and so is more useful in template functions that take any container a s a parameter. It is also conceivably slightly more efficient, even for vectors.

The second version only works for vectors and other integer-indexed containers. It'd somewhat more idiomatic for those containers, will be easily understood by newcomers to C++, and is useful if you need to do something else with the index, which is not uncommon.


If you don't mind a (very?) small loss of efficiency, i'd recommend using Boost.Foreach

BOOST_FOREACH( Elem& e, elemVec )
{
    // Your code
}



Some more advantages of method 0:

    if you move from vector to another container the loop remains the same,
    easy to move from iterator to const_iterator if you need,
    when c++0x will arive, auto typing will reduce some of the code clutter.

The main disadvantage is that in many cases you scan two containers, in which case an index is cleaner than keeping two iterators.
```

#### 4.2.6.2 std::for_each

```text
function template
<algorithm>
std::for_each
template <class InputIterator, class Function>
   Function for_each (InputIterator first, InputIterator last, Function fn);
Apply function to range
Applies function fn to each of the elements in the range [first,last).

The behavior of this template function is equivalent to:
1
2
3
4
5
6
7
8
9
template<class InputIterator, class Function>
  Function for_each(InputIterator first, InputIterator last, Function fn)
{
  while (first!=last) {
    fn (*first);
    ++first;
  }
  return fn;      // or, since C++11: return move(fn);
}


Parameters
first, last
Input iterators to the initial and final positions in a sequence. The range used is [first,last), which contains all the elements between first and last, including the element pointed by first but not the element pointed by last.
fn
Unary function that accepts an element in the range as argument.
This can either be a function pointer or a move constructible function object.
Its return value, if any, is ignored.

Return value
C++98C++11
Returns fn.

Example
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
// for_each example
#include <iostream>     // std::cout
#include <algorithm>    // std::for_each
#include <vector>       // std::vector

void myfunction (int i) {  // function:
  std::cout << ' ' << i;
}

struct myclass {           // function object type:
  void operator() (int i) {std::cout << ' ' << i;}
} myobject;

int main () {
  std::vector<int> myvector;
  myvector.push_back(10);
  myvector.push_back(20);
  myvector.push_back(30);

  std::cout << "myvector contains:";
  for_each (myvector.begin(), myvector.end(), myfunction);
  std::cout << '\n';

  // or:
  std::cout << "myvector contains:";
  for_each (myvector.begin(), myvector.end(), myobject);
  std::cout << '\n';

  return 0;
}


Output:
myvector contains: 10 20 30
myvector contains: 10 20 30

Complexity
Linear in the distance between first and last: Applies fn to each element.

Data races
The objects in the range [first,last) are accessed (each object is accessed exactly once).
These objects may be modified if InputIterator is a mutable iterator type and fn is not a constant function.

Exceptions
Throws if fn throws or if any of the operations on iterators throws.
Note that invalid arguments cause undefined behavior.

See also
transform
Transform range (function template )
find
Find value in range (function template )
search
Search range for subsequence (function template )
		4.2.7
```
