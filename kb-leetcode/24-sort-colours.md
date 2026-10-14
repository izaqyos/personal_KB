---
type: reference
title: Sort colours
description: LeetCode Sort Colors solution in Python with counting and in-place sort variants.
tags: [leetcode, python, sorting, two-pointers, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "leetcode-kb#19"
---

# Sort colours

[↑ leetcode-kb](/kb-leetcode/README.md)

```text
$ cat !$
cat sortColors.py
"""
Given an array with n objects colored red, white or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white and blue.

Here, we will use the integers 0, 1, and 2 to represent the color red, white, and blue respectively.

Note: You are not suppose to use the library's sort function for this problem.

Example:

Input: [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]
Follow up:

A rather straight forward solution is a two-pass algorithm using counting sort.
First, iterate the array counting number of 0's, 1's, and 2's, then overwrite array with total number of 0's, then 1's and followed by 2's.
Could you come up with a one-pass algorithm using only constant space?
BTW, can be expanded to sort more colors, by repeating the process
each pass sorts to low and high end colors then next pass repeats for remaining colors
in middle subarray (l+1, h-1)
"""

class Solution:
    def sortColors2N(self, nums):
        """
        as leet mentioned, counting sort. 1 pass count. 2nd pass fill.
        """
        reds = 0
        whites = 0
        blues = 0
        #count
        for color in nums:
            if color == 0:
                reds+=1
            elif color == 1:
                whites+=1
            elif color == 2:
                blues+=1

        #sort
        index = 0
        while index < reds:
            nums[index] = 0
            index+=1

        i = 0
        while i < whites:
            nums[i+index] = 1
            i+=1
        index+=i

        i=0
        while i< blues:
            nums[i+index] = 2
            i+=1

        
    def sortColors1N(self, nums):
        """
        original idea:
        will have three dynamic regions in original array.
        red, white, blue regions.
        init lower&upper indices to -1 (meaning no elements of corresponding color)
        sweep array. move each color to its region, expand and move regions as needed
        so, say first element is blue. set its region indices to 0,0. 
        next element is red. set its indices to 0,0. shift blue region 1 to right
        swap red and lowst blue elements.
        next elem is white. set its indices after red and right shift blue.
        keep adding elements and shifting as needed.

        can be simplified a lot. like this. first region is lower end of array. second is middle,
        last is higher end of array, 
        If we do one sweep and swap each red to buttom region, each blue to upper the whites will stay
        in middle (since not moved explicitly)
        """

        l,h,i=0,len(nums) -1, 0
        while i<=h:
            if nums[i] == 0: #red
                nums[i], nums[l] = nums[l], nums[i] 
                l+=1
                i+=1 
            elif nums[i] == 2: #blue 
                nums[i], nums[h] = nums[h], nums[i] 
                h-=1
            else: #white, just move
                i+=1
                     

    def sortColors(self, nums):
        """
        Do not return anything, modify nums in-place instead.
        """
        self.sortColors1N(nums)
        #self.sortColors2N(nums)

def test():
    inputs = [ [], [0,0], [2,1,0], [2,0,1], [1,2,0], [2,0,2,1,1,0], [2,1,0,1,1,0,0,2,2,1]]
    outputs = [ [], [0,0], [0,1,2], [0,1,2], [0,1,2],  [0,0,1,1,2,2], [0,0,0, 1,1,1,1,2,2,2]]

    sol = Solution()
    for (inp, outp) in zip(inputs,outputs):
        print("sort {}".format(inp))
        sol.sortColors(inp)
        print("sorted {}".format(inp))
        assert( inp == outp)


if __name__ == "__main__":
    test()$ py3 sortColors.py 
sort []
sorted []
sort [0, 0]
sorted [0, 0]
sort [2, 1, 0]
sorted [0, 1, 2]
sort [2, 0, 1]
sorted [0, 1, 2]
sort [1, 2, 0]
sorted [0, 1, 2]
sort [2, 0, 2, 1, 1, 0]
sorted [0, 0, 1, 1, 2, 2]
sort [2, 1, 0, 1, 1, 0, 0, 2, 2, 1]
sorted [0, 0, 0, 1, 1, 1, 1, 2, 2, 2]$ cat !$
cat sortColors.py
"""
Given an array with n objects colored red, white or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white and blue.

Here, we will use the integers 0, 1, and 2 to represent the color red, white, and blue respectively.

Note: You are not suppose to use the library's sort function for this problem.

Example:

Input: [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]
Follow up:

A rather straight forward solution is a two-pass algorithm using counting sort.
First, iterate the array counting number of 0's, 1's, and 2's, then overwrite array with total number of 0's, then 1's and followed by 2's.
Could you come up with a one-pass algorithm using only constant space?
BTW, can be expanded to sort more colors, by repeating the process
each pass sorts to low and high end colors then next pass repeats for remaining colors
in middle subarray (l+1, h-1)
"""

class Solution:
    def sortColors2N(self, nums):
        """
        as leet mentioned, counting sort. 1 pass count. 2nd pass fill.
        """
        reds = 0
        whites = 0
        blues = 0
        #count
        for color in nums:
            if color == 0:
                reds+=1
            elif color == 1:
                whites+=1
            elif color == 2:
                blues+=1

        #sort
        index = 0
        while index < reds:
            nums[index] = 0
            index+=1

        i = 0
        while i < whites:
            nums[i+index] = 1
            i+=1
        index+=i

        i=0
        while i< blues:
            nums[i+index] = 2
            i+=1

        
    def sortColors1N(self, nums):
        """
        original idea:
        will have three dynamic regions in original array.
        red, white, blue regions.
        init lower&upper indices to -1 (meaning no elements of corresponding color)
        sweep array. move each color to its region, expand and move regions as needed
        so, say first element is blue. set its region indices to 0,0. 
        next element is red. set its indices to 0,0. shift blue region 1 to right
        swap red and lowst blue elements.
        next elem is white. set its indices after red and right shift blue.
        keep adding elements and shifting as needed.

        can be simplified a lot. like this. first region is lower end of array. second is middle,
        last is higher end of array, 
        If we do one sweep and swap each red to buttom region, each blue to upper the whites will stay
        in middle (since not moved explicitly)
        """

        l,h,i=0,len(nums) -1, 0
        while i<=h:
            if nums[i] == 0: #red
                nums[i], nums[l] = nums[l], nums[i] 
                l+=1
                i+=1 
            elif nums[i] == 2: #blue 
                nums[i], nums[h] = nums[h], nums[i] 
                h-=1
            else: #white, just move
                i+=1
                     

    def sortColors(self, nums):
        """
        Do not return anything, modify nums in-place instead.
        """
        self.sortColors1N(nums)
        #self.sortColors2N(nums)

def test():
    inputs = [ [], [0,0], [2,1,0], [2,0,1], [1,2,0], [2,0,2,1,1,0], [2,1,0,1,1,0,0,2,2,1]]
    outputs = [ [], [0,0], [0,1,2], [0,1,2], [0,1,2],  [0,0,1,1,2,2], [0,0,0, 1,1,1,1,2,2,2]]

    sol = Solution()
    for (inp, outp) in zip(inputs,outputs):
        print("sort {}".format(inp))
        sol.sortColors(inp)
        print("sorted {}".format(inp))
        assert( inp == outp)


if __name__ == "__main__":
    test()$ py3 sortColors.py 
sort []
sorted []
sort [0, 0]
sorted [0, 0]
sort [2, 1, 0]
sorted [0, 1, 2]
sort [2, 0, 1]
sorted [0, 1, 2]
sort [1, 2, 0]
sorted [0, 1, 2]
sort [2, 0, 2, 1, 1, 0]
sorted [0, 0, 1, 1, 2, 2]
sort [2, 1, 0, 1, 1, 0, 0, 2, 2, 1]
sorted [0, 0, 0, 1, 1, 1, 1, 2, 2, 2]


￼
```

## See Also

<!-- backlinks:start -->
### Backlinks

* [Two Pointers](/algorithms/patterns/two-pointers.md)
<!-- backlinks:end -->
