---
type: reference
title: Twosum
description: Section 13 of the legacy leetcode-kb notes.
tags: [kb-leetcode]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "leetcode-kb#13"
---

# Twosum

[↑ leetcode-kb](/kb-leetcode/README.md)

```text
https://leetcode.com/problems/two-sum/submissions/ ￼
Code:

$ cat !$
cat twoSum.py
#!/usr/local/bin/python3

import pdb
from random import randint
from timeit import default_timer as timer


def time_func_decorator(func):
    def wrapper(*args, **kwargs):
        start = timer()
        ret = func(*args, **kwargs)
        end = timer()
        print('function {} took {} seconds'.format(func, end-start))
        return ret

    return wrapper

"""
Given an array of integers, return indices of the two numbers such that they add up to a specific target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

Example:

Given nums = [2, 7, 11, 15], target = 9,

Because nums[0] + nums[1] = 2 + 7 = 9,
return [0, 1].
"""
class Solution:
    #def twoSum(self, nums: List[int], target: int) -> List[int]:
    @time_func_decorator
    def twoSum(self, nums, target):
        #twoSums={} #can be used if more than one pair is possible, like in amazon packages and truck question 
        #nums = sorted(nums) #0(nlogn) #, next simple optimization. sort, then take smallest elem. run from largest, if largest + smallest > target move left, mark largest possible and run only on this portion
        #
        return self.twoSum2pass(nums, target)


    def twoSum1pass(self, nums, target):
        """
        time complexity. o(n). we will use a dictionary of values to indices to check if there's a pair 
        memory complexity o(n). dictionary w/ up to n-1 values
        """ 
        nums2index = dict()
        for i in range(len(nums)):
            delta = target - nums[i]

            if (delta in nums2index):
                return [nums2index[delta], i]

            nums2index[nums[i]] = i
        
        return []

    def twoSum2pass(self, nums, target):
        """
        time complexity. o(n^2). since we must take into account all pairs.
        and selecting 2 from n is binomial coefficient so n*(n-1)/2
        memory complexity o(1)
        """ 
        for i in range(len(nums)):
            for j in range(i+1, len(nums)):
                sum = nums[i] + nums[j]
                if sum == target:
                    #print('twoSum found target at [{},{}]'.format(i,j))
                    return [i,j]

    @time_func_decorator
    def twoSumSort(self, nums, target):
        #twoSums={} #can be used if more than one pair is possible, like in amazon packages and truck question 
        #nums = sorted(nums) #0(nlogn) #, next simple optimization. sort, then take smallest elem. run from largest, if largest + smallest > target move left, mark largest possible and run only on this portion

        """
        worst time complexity. o(n^2). since we must take into account all pairs.
        and selecting 2 from n is binomial coefficient so n*(n-1)/2
        since we will sort and run from both ends we can improve to o(n*log(n))
        """

        #nums = sorted(nums)
        i = 0
        j = len(nums)-1
        while j>i: 
            if (nums[j] + nums[i]) == target:
                return [i,j]
            if (nums[j] + nums[i]) > target:
                j = j-1
            if (nums[j] + nums[i]) < target:
                i = i+1


def test():
    sol =Solution()
    rand_range = (1,500)
    nums = [ [randint(*rand_range) for _ in range(200)]  , [randint(*rand_range) for _ in range(500)], [randint(*rand_range) for _ in range(1000)] ]
    for num in nums:
        #target = randint(*rand_range) 
        i,j = randint(0,len(num)-1) , randint(0,len(num)-1)
        target = num[i] + num[j]
        #print('target is made of num[{}]={} + num[{}]={}'.format(i, num[i], j, num[j]))
        indices = sol.twoSum(num, target)
        sorted_nums = sorted(num)
        indices2 = sol.twoSumSort(sorted_nums, target)
        indices3 = sol.twoSum1pass(num, target)
        print('target={}, indices={}, val1={}, val2={}'.format(target, indices, num[indices[0]],num[indices[1]] ))
        #print('target={}, nums={}, indices={}'.format(target, num, indices))
        #print('target={}, sorted_nums={}, 2sum_sort indices={}'.format(target, sorted_nums, indices2))
        print('target={}, 2sum1pass ={}, val1={}, val2={}'.format(target, indices3, num[indices[0]],num[indices[1]] ))

if __name__ == '__main__':
    test()

Test:
$ py3 twoSum.py 
function <function Solution.twoSum at 0x10b2d4290> took 4.831899999999806e-05 seconds
function <function Solution.twoSumSort at 0x10b2d4e60> took 1.485300000000217e-05 seconds
target=416, indices=[1, 183], val1=351, val2=65
target=416, 2sum1pass =[4, 29], val1=351, val2=65
function <function Solution.twoSum at 0x10b2d4290> took 0.00010316200000000386 seconds
function <function Solution.twoSumSort at 0x10b2d4e60> took 8.065000000001543e-06 seconds
target=486, indices=[1, 324], val1=408, val2=78
target=486, 2sum1pass =[42, 51], val1=408, val2=78
function <function Solution.twoSum at 0x10b2d4290> took 8.410999999999835e-06 seconds
function <function Solution.twoSumSort at 0x10b2d4e60> took 6.472399999999517e-05 seconds
target=414, indices=[0, 54], val1=47, val2=367
target=414, 2sum1pass =[22, 30], val1=47, val2=367
```
