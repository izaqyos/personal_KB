---
type: reference
title: Lists
description: "Legacy Python KB section: Lists (An Introduction to Python Lists, Delete from list, delete range from list)"
tags: [data-structures, python, legacy]
generated: { by: "human:izaqyos", at: "2026-10-14T00:00:00Z" }
stale_after: "2028-10-14T00:00:00Z"
sources:
  - { id: py3-whatsnew-30, resource: "https://docs.python.org/3/whatsnew/3.0.html", title: "What's New In Python 3.0" }
  - { id: py-sorting-howto, resource: "https://docs.python.org/3/howto/sorting.html", title: "Python Sorting Techniques (HOWTO)" }
status: stable
capture_type: source
legacy_source: "python/KB_python#15"
---

# Lists

[↑ KB_python](/python/kb-python/README.md)

## 15.1 An Introduction to Python Lists

> Updated 2026-10 to current practice.[^py3-whatsnew-30] The 2006 text is Python 2; the Python 2-only snippets (print statement, `i.next()`, `cmp`-based sorting, list-returning `map`) were rewritten for Python 3 below, the rest is kept as written.

```text
Fredrik Lundh | August 2006
Overview #

The list type is a container that holds a number of other objects, in a given order. The list type implements the sequence protocol, and also allows you to add and remove objects from the sequence.
Creating Lists #

To create a list, put a number of expressions in square brackets:

    L = []
    L = [expression, ...]

This construct is known as a Â¿list displayÂ¿. Python also supports computed lists, called Â¿list comprehensionsÂ¿. In its simplest form, a list comprehension has the following syntax:

    L = [expression for variable in sequence]

where the expression is evaluated once, for every item in the sequence.

The expressions can be anything; you can put all kinds of objects in lists, including other lists, and multiple references to a single object.

You can also use the built-in list type object to create lists:

    L = list() # empty list
    L = list(sequence)
    L = list(expression for variable in sequence)

The sequence can be any kind of sequence object or iterable, including tuples and generators. If you pass in another list, the list function makes a copy.

Note that Python creates a single new list every time you execute the [] expression. No more, no less. And Python never creates a new list if you assign a list to a variable.

A = B = [] # both names will point to the same list

A = []
B = A # both names will point to the same list

A = []; B = [] # independent lists

For information on how to add items to a list once youÂ¿ve created it, see Modifying Lists below.
Accessing Lists #

size of list, len(list)

Lists implement the standard sequence interface; len(L) returns the number of items in the list, L[i] returns the item at index i (the first item has index 0), and L[i:j] returns a new list, containing the objects between i and j.

    n = len(L)

    item = L[index]

    seq = L[start:stop]

If you pass in a negative index, Python adds the length of the list to the index. L[-1] can be used to access the last item in a list.

For normal indexing, if the resulting index is outside the list, Python raises an IndexError exception. Slices are treated as boundaries instead, and the result will simply contain all items between the boundaries.

Lists also support slice steps:
 

    seq = L[start:stop:step]

    seq = L[::2] # get every other item, starting with the first
    seq = L[1::2] # get every other item, starting with the second

```

**Looping Over Lists** (Python 3: `print` is a function; iterators are advanced with the built-in `next()`)[^py3-whatsnew-30]

```python
for item in L:
    print(item)

# index and item
for index, item in enumerate(L):
    print(index, item)

# index only
for index in range(len(L)):
    print(index)

# explicit iterator
i = iter(L)
item = next(i)  # fetch first value  (Python 2: i.next())
item = next(i)  # fetch second value
```

```text

Python provides various shortcuts for common list operations. For example, if a list contains numbers, the built-in sum function gives you the sum:

    v = sum(L)

    total = sum(L, subtotal)

    average = float(sum(L)) / len(L)

If a list contains strings, you can combine the string into a single long string using the join string method:

    s = ''.join(L)

Python also provides built-in operations to search for items, and to sort the list. These operations are described later.
Modifying Lists #

The list type also allows you to assign to individual items or slices, and to delete them.

    L[i] = obj
    L[i:j] = sequence

Note that operations that modify the list will modify it in place. This means that if you have multiple variables that point to the same list, all variables will be updated at the same time.

    L = []
    M = L

    # modify both lists
    L.append(obj)

To create a separate list, you can use slicing or the list function to quickly create a copy:

    L = []
    M = L[:] # create a copy

    # modify L only
    L.append(obj)

You can also add items to an existing sequence. The append method adds a single item to the end of the list, the extend method adds items from another list (or any sequence) to the end, and insert inserts an item at a given index, and move the remaining items to the right.

    L.append(item)
    L.extend(sequence)
    L.insert(index, item)

To insert items from another list or sequence at some other location, use slicing syntax:

    L[index:index] = sequence
```

## 15.2 Delete from list

```text
You can also remove items. The del statement can be used to remove an individual item, or to remove all items identified by a slice. The pop method removes an individual item and returns it, while remove searches for an item, and removes the first matching item from the list.

    del L[i]
```

### 15.2.1 delete range from list

> Updated 2026-10 to current practice.[^py3-whatsnew-30] The original copy idiom `L[:i].extend(L[j+1:])` was wrong: `extend()` returns `None`, and `j+1` would also drop item `j`, which `del L[i:j]` keeps.

```python
del L[i:j]                # in place: removes items i .. j-1

newlist = L[:i] + L[j:]   # or build a new list without items i .. j-1
```

#### 15.2.1.1 delete arbitrary indices in one go from list

> Updated 2026-10 to current practice.[^py3-whatsnew-30] Python 2-only snippets in the copied list tutorial below (print statement, `cmp` sorting, `map` returning a list) were rewritten for Python 3.

```text
https://stackoverflow.com/questions/497426/deleting-multiple-elements-from-a-list

You can use enumerate and remove the values whose index matches the indices you want to remove:

indices = 0, 2
somelist = [i for j, i in enumerate(somelist) if j not in indices]

For some reason I don't like any of the answers here. Yes, they work, but strictly speaking most of them aren't deleting elements in a list, are they? (But making a copy and then replacing the original one with the edited copy).

Why not just delete the higher index first?

Is there a reason for this? I would just do:

for i in sorted(indices, reverse=True):
    del somelist[i]
If you really don't want to delete items backwards, then I guess you should just deincrement the indices values which are greater than the last deleted index (can't really use the same index since you're having a different list) or use a copy of the list (which wouldn't be 'deleting' but replacing the original with an edited copy).

Am I missing something here, any reason to NOT delete in the reverse order?

            15.2.1.2

        15.2.2
    item = L.pop() # last item
    item = L.pop(0) # first item
    item = L.pop(index)
    L.remove(item)

The del statement and the pop method does pretty much the same thing, except that pop returns the removed item.

    15.3
Finally, the list type allows you to quickly reverse the order of the list.

    L.reverse()

Reversing is fast, so temporarily reversing the list can often speed things up if you need to remove and insert a bunch of items at the beginning of the list:

    L.reverse()
    # append/insert/pop/delete at far end
    L.reverse()

Note that the for-in statement maintains an internal index, which is incremented for each loop iteration. This means that if you modify the list youÂ¿re looping over, the indexes will get out of sync, and you may end up skipping over items, or process the same item multiple times. To work around this, you can loop over a copy of the list:

    for object in L[:]:
        if not condition:
            del L[index]

Alternatively, you can use create a new list, and append to it:

    out = []
    for object in L:
        if condition:
            out.append(object)

A common pattern is to apply a function to every item in a list, and replace the item with the return value from the function:

    for index, object in enumerate(L):
        L[index] = function(object)

    out = []
    for object in L:
        out.append(function(object))

```

The above can be better written as a list comprehension or with `map`. In Python 3 `map()` returns a lazy iterator, not a list; wrap it in `list()` if you need a list. The docs suggest a list comprehension is often the better fix, especially when you would otherwise need a `lambda`:[^py3-whatsnew-30]

```python
out = [function(obj) for obj in L]
out = list(map(function, L))   # Python 3: map() is lazy
```

```text
 

Again, if you need both the item and the index, use enumerate:

    out = [function(index, object) for index, object in enumerate(L)]

You can use the list type to implement simple data structures, such as stacks and queues.

    stack = []
    stack.append(object) # push
    object = stack.pop() # pop from end

    queue = []
    queue.append(object) # push
    object = queue.pop(0) # pop from beginning

The list type isnÂ¿t optimized for this, so this works best when the structures are small (typically a few hundred items or smaller). For larger structures, you may need a specialized data structure, such as collections.deque.

Another data structure for which a list works well in practice, as long as the structure is reasonably small, is a LRU (least-recently-used) container. The following statements moves an object to the end of the list:

    lru.remove(item)
    lru.append(item)

If you do the above every time you access an item in the LRU list, the least recently used items will move towards the beginning of the list. (for a simple cache implementation using this approach, see Caching.)
Searching Lists #

```

The `in` operator checks whether an item is present in the list:

```python
if value in L:
    print("list contains", value)
```

To get the index of the first matching item, use `index`. It does a linear search, stops at the first match, and raises `ValueError` if there is none:

```python
i = L.index(value)

try:
    i = L.index(value)
except ValueError:
    i = -1  # no match
```

To get the indices of all matching items (the original generator version had bugs: `i+i` and no loop):

```python
def findall(L, value, start=0):
    """Yield every index at which value occurs in L."""
    i = start - 1
    while True:
        try:
            i = L.index(value, i + 1)
        except ValueError:
            return
        yield i

for index in findall(L, value):
    print("match at", index)

# or simply
matches = [i for i, v in enumerate(L) if v == value]
```

```text

To count matching items, use the count method:

    n = L.count(value)

Note that count loops over the entire list, so if you just want to check if a value is present in the list, you should use in or, where applicable, index.

To get the smallest or largest item in a list, use the built-in min and max functions:

    lo = min(L)
    hi = max(L)

As with sort (see below), you can pass in a key function that is used to map the list items before they are compared:

    lo = min(L, key=int)
    hi = max(L, key=int)

Sorting Lists #

The sort method sorts a list in place.

    L.sort()

To get a sorted copy, use the built-in sorted function:

    out = sorted(L)

An in-place sort is slightly more efficient, since Python does not have to allocate a new list to hold the result.

```

Python 3 removed the `cmp()` built-in and the `cmp` argument of `sort()`/`sorted()`; pass a `key` function instead (`key` and `reverse` are keyword-only).[^py3-whatsnew-30] If you really have a two-argument comparison function, wrap it with `functools.cmp_to_key`.[^py-sorting-howto]

```python
L.sort(key=int)                 # compare as integers
out = sorted(L, key=int)

# sort on ascending index 0, descending index 2:
# sort stability lets you sort by the secondary key first, then the primary key
out = sorted(L, key=lambda row: row[2], reverse=True)
out.sort(key=lambda row: row[0])

# legacy comparison function, if you must
from functools import cmp_to_key

def compare_columns(a, b):
    return (a[0] > b[0]) - (a[0] < b[0]) or (b[2] > a[2]) - (b[2] < a[2])

out = sorted(L, key=cmp_to_key(compare_columns))
```

```text

Alternatively, you can specify a mapping between list items and search keys. If you do this, the sort algorithm will make one pass over the data to build a key array, and then sort both the key array and the list based on the keys.

    L.sort(key=int)

    out = sorted(L, key=int)

If the transform is complex, or the list is large, this can be a lot faster than using a compare function, since the items only have to be transformed once.

PythonÂ¿s sort is stable; the order of items that compare equal will be preserved.
Printing Lists #

By default, the list type does a repr on all items, and adds brackets and commas as necessary.

```

To control formatting, use the string `join` method, combined with either `map` or a list comprehension or generator expression:

```python
print("".join(L))                         # if all items are strings
print(", ".join(map(str, L)))
print("|".join(str(v) for v in L if v > 0))
print(*L, sep=", ")                       # Python 3 print() can do simple cases itself
```

```text

To print a list of string fragments to a file, you can use writelines instead of write:

    sys.stdout.writelines(L) # if all items are strings

Performance Notes #

The list object consists of two internal parts; one object header, and one separately allocated array of object references. The latter is reallocated as necessary.

The list has the following performance characteristics:

    * The list object stores pointers to objects, not the actual objects themselves. The size of a list in memory depends on the number of objects in the list, not the size of the objects.
    * The time needed to get or set an individual item is constant, no matter what the size of the list is (also known as Â¿O(1)Â¿ behaviour).
    * The time needed to append an item to the list is Â¿amortized constantÂ¿; whenever the list needs to allocate more memory, it allocates room for a few items more than it actually needs (this assumes that the memory allocator is fast; for huge lists, the allocation overhead may push the behaviour towards O(n*n)).
    * The time needed to insert an item depends on the size of the list, or more exactly, how many items that are to the right of the inserted item (O(n)). In other words, inserting items at the end is fast, but inserting items at the beginning can be relatively slow, if the list is large.
    * The time needed to remove an item is about the same as the time needed to insert an item at the same location; removing items at the end is fast, removing items at the beginning is slow.
    * The time needed to reverse a list is proportional to the list size (O(n)).
    * The time needed to sort a list varies; the worst case is O(n log n), but typical cases are often a lot better than that.
```

## See Also

[^py3-whatsnew-30]: What's New In Python 3.0
[^py-sorting-howto]: Python Sorting Techniques (HOWTO)

<!-- backlinks:start -->
### Backlinks

* [Arrays](/data-structures/linear/arrays.md)
<!-- backlinks:end -->
