---
type: reference
title: plusOne
description: LeetCode Plus One solution in Python for a digit-array number.
tags: [leetcode, python, algorithms, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "leetcode-kb#7"
---

# plusOne

[↑ leetcode-kb](/kb-leetcode/README.md)

```text
cat plusOne.py                                                                            
#!/usr/local/bin/python3
"""
plus one
Given a non-empty array of digits representing a non-negative integer, plus one to the integer.

The digits are stored such that the most significant digit is at the head of the list, and each element in the array contain a single digit.

You may assume the integer does not contain any leading zero, except the number 0 itself.

Example 1:

Input: [1,2,3]
Output: [1,2,4]
Explanation: The array represents the integer 123.
Example 2:

Input: [4,3,2,1]
Output: [4,3,2,2]
Explanation: The array represents the integer 4321.
"""

import pdb

class Solution:
    def plusOne(self, digits):
        if len(digits) == 0:
            return digits

        #pdb.set_trace()
        end = len(digits)-1
        while (end >= 0 ):
            if digits[end]< 9:
                digits[end] = digits[end] +1
                return digits
            else:
                digits[end] = 0
            end = end -1
        if digits[0] == 0:
            digits.insert(0,1)
            return digits
        return digits

def test():
    inputs = [ [1,2,3], [], [0,0,1], [9], [9,9,9] ];
    sol = Solution()
    for inp in inputs:
        print('plus one to {}'.format(inp))
        print('is {}'.format(sol.plusOne(inp)))

if __name__ == '__main__':
    test()


./plusOne.py                                                                                 ✔  1861  18:56:12
plus one to [1, 2, 3]
is [1, 2, 4]
plus one to []
is []
plus one to [0, 0, 1]
is [0, 0, 2]
plus one to [9]
is [1, 0]
plus one to [9, 9, 9]
is [1, 0, 0, 0]
```
