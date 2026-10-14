---
type: reference
title: anyAllNone
description: Section 24 of the legacy leetcode-kb notes.
tags: [kb-leetcode]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "leetcode-kb#24"
---

# anyAllNone

[↑ leetcode-kb](/kb-leetcode/README.md)

```text
    24.1 My full solution 2020-09-03
$ cat !$
cat anyAllNone.py
"""
   list of vectors , list of lists
    v1 = [10,7, 12]
    v2 = [12, 15, 17, 4]
    v3 = [10,20,30,40]

    # vectors,  M  sum off all |Vi| i from 0 to len() -1
    data

    operations.
    all(vec) : # return all vectors containing
    all([10,12]) -> v1 (all vectors containing all input nums)
Idea . Build dict of num to ver indices set for all num in all vectors.
Then use it.
For all. Intersection of all sets of num in input (if num not in dictionary return empty set)
For any. union of all sets of num in input
For none.  call any. Then do set of all indices - (difference) any_set

    any([10,30]) -> 0,2 indexes


    none(v) -> return all vecors not containg none of nums in v
    none(10,7) -> return index 1
    ret = set()
    for n in in:
        for st in d




all complexit
all(iv) len(iv) = n
num of vectors = k
len(sum all vec lengths) = m



"""



from collections import defaultdict
class vecOps:
    def __init__(self, lists):
        """
        dictionary
        10: {0,2}
        7: {0}
        12: {0,1}
        """
        self.lists=lists
        self.nums2ListsDict= defaultdict(set)
        for i,lst in enumerate(lists):
            for n in lst:
                self.nums2ListsDict[n].add(i)
    
    def __str__(self):
        repr_str = "vecOps vectors:\n"
        repr_str += str(self.lists)
        repr_str += '\n'
        repr_str += "Numbers to vector indices dictionary:\n"
        repr_str += str(self.nums2ListsDict)
        return repr_str

    def any(self, iv):
       ret = set()
       
       #remove dupes in input
       ivset = set()
       for n in iv:
           ivset.add(n)
       
       for n in ivset:
           if n in self.nums2ListsDict:
               nset = self.nums2ListsDict[n]
               ret|=nset #ret.union(nset)
           #else: #if input number is not in vectors its containing set is empty so ret|{} is same as doing nothing
           #    return set()
       
       return ret

    def none(self, iv):
       anyset = self.any(iv)
       #allset = set.union(*self.nums2ListsDict.values()) #1 way 2 get all set. but much better:
       allset = {i for i in range(len(self.lists))}
       return allset-anyset
       


    def all(self, iv):
       ret = set()
       
       #remove dupes in input
       ivset = set()
       for n in iv:
           ivset.add(n)
       
       for n in ivset:
           if n in self.nums2ListsDict:
               nset = self.nums2ListsDict[n]
               if len(ret) == 0:
                   ret = nset
               else:
                   ret&=nset #ret.intersection(nset)
           else:
               return set()
       
       return ret

def test():
    lists=[ 
        [10,7, 12, 30],
    [12, 15, 17, 4],
    [10,20,30,40],
]

    ops = vecOps(lists)
    print("Testing vecOps instance: ", ops)

    ivs = [ [10, 30], [], [15], [3] ]
    expected = [ {0,2}, set(), {1}, set()]
    for inp,exp in zip(ivs, expected):
        res = ops.all(inp)
        print('all({})={}'.format(inp,res))
        assert(res == exp)
    
    any_ivs = [ [10, 12, 20], [], [15, 40], [3] ]
    any_expected = [ {0,1,2}, set(), {1,2}, set()]
    for inp,exp in zip(any_ivs, any_expected):
        res = ops.any(inp)
        print('any({})={}'.format(inp,res))
        assert(res == exp)

    none_ivs = [ [10, 12, 20], [], [15, 40], [3] ]
    none_expected = [ set(), {0,1,2}, {0}, {0,1,2}]
    for inp,exp in zip(none_ivs, none_expected):
        res = ops.none(inp)
        print('none({})={}'.format(inp,res))
        assert(res == exp)

if __name__ == "__main__":
    test()
$ py3 anyAllNone.py 
Testing vecOps instance:  vecOps vectors:
[[10, 7, 12, 30], [12, 15, 17, 4], [10, 20, 30, 40]]
Numbers to vector indices dictionary:
defaultdict(<class 'set'>, {10: {0, 2}, 7: {0}, 12: {0, 1}, 30: {0, 2}, 15: {1}, 17: {1}, 4: {1}, 20: {2}, 40: {2}})
all([10, 30])={0, 2}
all([])=set()
all([15])={1}
all([3])=set()
any([10, 12, 20])={0, 1, 2}
any([])=set()
any([15, 40])={1, 2}
any([3])=set()
none([10, 12, 20])=set()
none([])={0, 1, 2}
none([15, 40])={0}
none([3])={0, 1, 2}

    24.2 practice 13/09/22 19:03:01  
Practice 11.9.2022
$ py3 anyAllNonePractice.py                                                                                                                            
listsContainer sub lists are:                                                                                                                                                                                                        
[0, 1, 2, 3, 4, 5, 6, 7, 8]                                                                                                                                                                                                          
[0, 1, 2, 3, 4]                                                                                                                                                                                                                      
[0, 1, 2]                                                                                                                                                                                                                            
[3, 4, 5, 6, 7]                                                                                                                                                                                                                      
[]                                                                                                                                                                                                                                   
[12]                                                                                                                                                                                                                                 
listsContainer indices: {0: {0, 1, 2}, 1: {0, 1, 2}, 2: {0, 1, 2}, 3: {0, 1, 3}, 4: {0, 1, 3}, 5: {0, 3}, 6: {0, 3}, 7: {0, 3}, 8: {0}, 12: {5}}                                                                                     
any of [12,5] is {0, 3, 5}                                                                                                                                                                                                           
none set before empty lists {2}                                                                                                                                                                                                      
none of [12,5, 4] is {2, 4}                                                                                                                                                                                                          
all of [1,2] is {0, 1, 2}                                                                                                                                                                                                            
all of [12] is {5}                                                                                                                                                                                                                   
all of [1, 12] is set()

Code:
""" 
practice any all none 
"""
from typing import List, Set, Dict, Tuple, Optional

class listsContainer:

    def init_indices(self, numbers: List[int], index: int):
        if numbers:
            for n in numbers:
                self.indexNum(n, index)
        else: 
            # we need to keep track of indices of empty lists to add to none result (algorithm uses dictionary and relies on at least one value)
           self.emptyLists.add(index)

    def __init__(self, numbers: List[List[int]]):
        self.numbers:List[List[int]] = []
        self.nums2indices: Dict(int, Set[int]) = dict()
        self.emptyLists = set()
        for i,n in enumerate(numbers):
            # self.numbers.append(n) #ref copy
            self.numbers.append(n[:]) #shallow copy
            self.init_indices(n,i)


    def indexNum(self, number: int, index: int):
        if number in self.nums2indices:
            self.nums2indices[number].add(index)
        else:
            self.nums2indices[number] = {index};

    def printMe(self):
        print("listsContainer sub lists are:")
        for n in self.numbers:
            print(n)
        print(f"listsContainer indices: {self.nums2indices}")

    def all(self, nums: List[int]):
        """
        return set of indices of all lists that contain all of the numbers in nums
        """
        ret_set =  {_ for _ in range(len(self.numbers))}
        for n in nums:
            ret_set = ret_set.intersection(self.nums2indices[n])
        return ret_set

    def any(self, nums: List[int]):
        """
        return set of indices of all lists that contain any of the numbers in nums
        """
        ret_set = set()
        for n in nums:
            ret_set = ret_set.union(self.nums2indices[n])
        return ret_set

    #todo, cont. w/ none 
    def none(self, nums: List[int]):
        """
        return set of indices of all lists that contain none of the numbers in nums
        """
        ret_set = set()
        for aset in self.nums2indices.values():
            ret_set =  ret_set.union(aset)
        for n in nums:
            ret_set = ret_set - self.nums2indices[n]
        print(f"none set before empty lists {ret_set}")
        ret_set = ret_set.union(self.emptyLists)
        return ret_set



def test():
    l1 = [_ for _ in range(9)]
    l2 = [_ for _ in range(5)]
    l3 = [_ for _ in range(3)]
    l4 = [_ for _ in range(3,8)]
    l5 = []
    l6 = [12]
    inputs = [l1,l2,l3,l4,l5,l6]
    lc = listsContainer(inputs)
    lc.printMe()
    any1 = lc.any([12,5])
    print(f"any of [12,5] is {any1}")
    none1 = lc.none([12,5,4])
    print(f"none of [12,5, 4] is {none1}")
    all1 = lc.all([1,2])
    print(f"all of [1,2] is {all1}")
    all2 = lc.all([12])
    print(f"all of [12] is {all2}")
    all3 = lc.all([1, 12])
    print(f"all of [1, 12] is {all3}")

def main():
    test()

if __name__ == "__main__":
    main()


    24.3
```
