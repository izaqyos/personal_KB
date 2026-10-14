---
type: reference
title: add binary (encoded as strings)
description: LeetCode Add Binary solution in Python adding bit strings with carry.
tags: [leetcode, python, string-algorithms, algorithms, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "leetcode-kb#6"
---

# add binary (encoded as strings)

[↑ leetcode-kb](/kb-leetcode/README.md)

```text
https://leetcode.com/problems/add-binary/submissions/


#!/usr/local/bin/python3
"""
Given two binary strings, return their sum (also a binary string).

The input strings are both non-empty and contains only characters 1 or 0.

Example 1:

Input: a = "11", b = "1"
Output: "100"
Example 2:

Input: a = "1010", b = "1011"
Output: "10101"
"""

import pdb
class Solution:

    def addOneBit(self, b1, b2, carry):
        #print('addOneBit(b1={}, b2={}, carry={})'.format(b1, b2, carry))
        """
        does the equivalent of b1^b2, and then b1&b2 for carry calculation
        return bit, carry
        """
        #pdb.set_trace()
        if  carry == "0":
            if b1 == "0" and b2 == "0":
                return ("0","0")
            elif b1 == "1" and b2 == "1":
                return ("0","1")
            else:
                return ("1","0")
    
        elif  carry == "1":
            if b1 == "0" and b2 == "0":
                return ("1","0")
            elif b1 == "1" and b2 == "1":
                return ("1","1")
            else:
                return ("0","1")

    def addBinary(self, a, b):
        """
        input is non empty, and contains only 0,1 chars. no need to validate
        """
        #print('addBinary(a={}, b={})'.format(a,b))
        carry = "0"
        res = ""
        nchar = ""
        i = 0 #index for a
        shortest = min(len(a), len(b))
        while i<shortest:
            nchar, carry = self.addOneBit(a[len(a) - 1 - i], b[len(b) - 1 - i], carry)
            res = nchar + res
            i = i+1
            
        if len(a) < len (b):
            while i < len(b):
                nchar, carry = self.addOneBit("0" , b[len(b) - 1 - i], carry)
                res = nchar + res
                i = i+1
        else:
            while i < len(a):
                nchar, carry = self.addOneBit("0" , a[len(a) - 1 - i], carry)
                res = nchar + res
                i = i+1

        if carry == "1":
            res = "1" +res

        return res

def test():
    inputs = [ ("0", "1"), ("10", "11"), ("101", "1"), ("101101101101", "100111100011101")];
    sol = Solution()
    for inp in inputs:
        print('{} + {} = {}'.format(inp[0], inp[1], sol.addBinary(inp[0], inp[1])))

if __name__ == '__main__':
    test()#!/usr/local/bin/python3
"""
Given two binary strings, return their sum (also a binary string).

The input strings are both non-empty and contains only characters 1 or 0.

Example 1:

Input: a = "11", b = "1"
Output: "100"
Example 2:

Input: a = "1010", b = "1011"
Output: "10101"
"""

import pdb
class Solution:

    def addOneBit(self, b1, b2, carry):
        #print('addOneBit(b1={}, b2={}, carry={})'.format(b1, b2, carry))
        """
        does the equivalent of b1^b2, and then b1&b2 for carry calculation
        return bit, carry
        """
        #pdb.set_trace()
        if  carry == "0":
            if b1 == "0" and b2 == "0":
                return ("0","0")
            elif b1 == "1" and b2 == "1":
                return ("0","1")
            else:
                return ("1","0")
    
        elif  carry == "1":
            if b1 == "0" and b2 == "0":
                return ("1","0")
            elif b1 == "1" and b2 == "1":
                return ("1","1")
            else:
                return ("0","1")

    def addBinary(self, a, b):
        """
        input is non empty, and contains only 0,1 chars. no need to validate
        """
        #print('addBinary(a={}, b={})'.format(a,b))
        carry = "0"
        res = ""
        nchar = ""
        i = 0 #index for a
        shortest = min(len(a), len(b))
        while i<shortest:
            nchar, carry = self.addOneBit(a[len(a) - 1 - i], b[len(b) - 1 - i], carry)
            res = nchar + res
            i = i+1
            
        if len(a) < len (b):
            while i < len(b):
                nchar, carry = self.addOneBit("0" , b[len(b) - 1 - i], carry)
                res = nchar + res
                i = i+1
        else:
            while i < len(a):
                nchar, carry = self.addOneBit("0" , a[len(a) - 1 - i], carry)
                res = nchar + res
                i = i+1

        if carry == "1":
            res = "1" +res

        return res

def test():
    inputs = [ ("0", "1"), ("10", "11"), ("101", "1"), ("101101101101", "100111100011101")];
    sol = Solution()
    for inp in inputs:
        print('{} + {} = {}'.format(inp[0], inp[1], sol.addBinary(inp[0], inp[1])))

if __name__ == '__main__':
    test()




./addBinaryNums.py                                                                       
0 + 1 = 1
10 + 11 = 101
101 + 1 = 110
101101101101 + 100111100011101 = 101101010001010
```
