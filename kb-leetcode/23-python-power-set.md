---
type: reference
title: Python power set
description: Section 18 of the legacy leetcode-kb notes.
tags: [kb-leetcode]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "leetcode-kb#18"
---

# Python power set

[↑ leetcode-kb](/kb-leetcode/README.md)

```text
    18.1  Note, instead of set I work w/ list. As python  doesn’t support set of sets

$ cat !$
cat powerset.py
def psetarr(A): 
    if len(A)==0: 
        return [[]] 
    a=A[0] 
    #print('split to {} and {}'.format(A[0], A[1:]))
    pset1n = psetarr(A[1:]) 
    #print('pset1n', pset1n)
    psetwithA = [] 
    for s in pset1n: 
        #print('appen {} w {}'.format([a], s))
        psetwithA.append([a] + s) 
        #print('psetwithA', psetwithA)
    return pset1n + psetwithA 

def test():
    inputs = [ [], [1], [1,2,3] ]
    expected = [ [], [[], [1]], [[],[1], [2],[3], [1,2,3], [1,2], [1,3], [2,3]] ]
    for inp in inputs:
       print('power set of', inp)
       out = psetarr(inp)
       print('result', out)
       #for i,o in zip(inputs,expected):
       #    r = psetarr(i)
       #    assert(r == o)


if __name__ == '__main__':
     test()
$ py3 powerset.py 
power set of []
result [[]]
power set of [1]
result [[], [1]]
power set of [1, 2, 3]
result [[], [3], [2], [2, 3], [1], [1, 3], [1, 2], [1, 2, 3]]
[<user>@<internal-host>:2020-07-29 11:24:58:~/work/code/intervie
```

## 18.2 Power set , set of sets

```text
$ cat !$
cat powerset.py
"""
Given a set of distinct integers, nums, return all possible subsets (the power set).

Note: The solution set must not contain duplicate subsets.

Example:

Input: nums = [1,2,3]
Output:
[
  [3],
  [1],
  [2],
  [1,2,3],
  [1,3],
  [2,3],
  [1,2],
  []
]
"""


class Solution:
    def subsets(self, nums):
        if len(nums) == 0:
            return [[]]

        ret = []
        for i, n in enumerate(nums):
            rest = self.subsets(nums[i+1:])

            #rest = self.subsets(nums[:i]+nums[i+1:])
            for st in rest:
                if not st in ret:
                    ret.append(st)
                stplus = st[:]
                stplus.append(n)
                if not stplus in ret:
                    ret.append(stplus)

        return ret


def test():
    inputs = [[], [1], [1, 2], [1, 2, 3, 4]]
    expected = [ [[]], [[], [1]], [[], [1], [2], [1, 2]],
                [[], [1], [2], [2, 1], [3], [3, 1], [3, 2], [3, 2, 1], [4], [4, 1], [4, 2], [4, 2, 1], [4, 3], [4, 3, 1], [4, 3, 2], [4, 3, 2, 1]]]
    sol = Solution()
    for inp, exp in zip(inputs, expected):
        pset = sol.subsets(inp)
        print('power set of {} is {}, expected={}'.format(inp, pset, exp))


if __name__ == '__main__':
    test()
$ py3 powerset.py 
power set of [] is [[]], expected=[[]]
power set of [1] is [[], [1]], expected=[[], [1]]
power set of [1, 2] is [[], [1], [2], [2, 1]], expected=[[], [1], [2], [1, 2]]
power set of [1, 2, 3, 4] is [[], [1], [2], [2, 1], [3], [3, 1], [3, 2], [3, 2, 1], [4], [4, 1], [4, 2], [4, 2, 1], [4, 3], [4, 3, 1], [4, 3, 2], [4, 3, 2, 1]], expected=[[], [1], [2], [2, 1], [3], [3, 1], [3, 2], [3, 2, 1], [4], [4, 1], [4, 2], [4, 2, 1], [4, 3], [4, 3, 1], [4, 3, 2], [4, 3, 2, 1]]


￼
```
