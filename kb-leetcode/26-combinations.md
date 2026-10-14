---
type: reference
title: Combinations
description: Section 21 of the legacy leetcode-kb notes.
tags: [kb-leetcode]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "leetcode-kb#21"
---

# Combinations

[↑ leetcode-kb](/kb-leetcode/README.md)

```text
Cnk , recursion solution inspired by  pascal triangle


￼
$ cat combinations.py
"""
Given two integers n and k, return all possible combinations of k numbers out of 1 ... n.

Example:

Input: n = 4, k = 2
Output:
[
  [2,4],
  [3,4],
  [2,3],
  [1,2],
  [1,3],
  [1,4],
]
idea, recursion. add ith elem to comb([rest of n], k-1) so long as len([rest of n]) >= k
stop cond n==k => 1, k=1 => n
"""


class Solution:
    def combineR(self, nums, k):
        n = len(nums)
        if n == k:
            return [nums]
        if k == 1:
            return [[i] for i in nums]

        final = []
        for i in range(len(nums) - k + 1):
            rest = self.combineR(nums[i+1:], k-1)
            for lst in rest:
                lst.append(nums[i])
                final.append(lst)

        return final

    def combine(self, n: int, k: int):
        if k == 0:
            return [[]]

        if  n == 0 or n < k:
            return []

        nlist = [i+1 for i in range(n)]
        return self.combineR(nlist, k)


def test():
    sol = Solution()
    inputs = [[0, 0], [1, 0], [0, 1], [1, 1], [
        2, 1], [1, 2], [4, 2], [5, 2], [5, 3]]
    expected = [
        [[]], [[]], [], [[1]], [[1], [2]], [],
        [[2, 1], [3, 1], [4, 1], [3, 2], [4, 2], [4, 3]],
        [[2, 1], [3, 1], [4, 1], [5, 1], [3, 2], [
            4, 2], [5, 2], [4, 3], [5, 3], [5, 4]],
        [[3, 2, 1], [4, 2, 1], [5, 2, 1], [4, 3, 1], [5, 3, 1], [
            5, 4, 1], [4, 3, 2], [5, 3, 2], [5, 4, 2], [4, 5, 3]]
    ]
    for inp,exp in zip(inputs, expected):
        comb = sol.combine(inp[0], inp[1])
        print('n={}, k={}, combinations={}'.format(inp[0], inp[1], comb))
        assert(comb == exp)


if __name__ == '__main__':
    test()
$ py3 combinations.py 
n=0, k=0, combinations=[[]]
n=1, k=0, combinations=[[]]
n=0, k=1, combinations=[]
n=1, k=1, combinations=[[1]]
n=2, k=1, combinations=[[1], [2]]
n=1, k=2, combinations=[]
n=4, k=2, combinations=[[2, 1], [3, 1], [4, 1], [3, 2], [4, 2], [4, 3]]
n=5, k=2, combinations=[[2, 1], [3, 1], [4, 1], [5, 1], [3, 2], [4, 2], [5, 2], [4, 3], [5, 3], [5, 4]]
n=5, k=3, combinations=[[3, 2, 1], [4, 2, 1], [5, 2, 1], [4, 3, 1], [5, 3, 1], [5, 4, 1], [4, 3, 2], [5, 3, 2], [5, 4, 2], [4, 5, 3]]
```
