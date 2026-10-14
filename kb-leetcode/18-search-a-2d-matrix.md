---
type: reference
title: Search a 2D Matrix
description: Section 12 of the legacy leetcode-kb notes.
tags: [kb-leetcode]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "leetcode-kb#12"
---

# Search a 2D Matrix

[↑ leetcode-kb](/kb-leetcode/README.md)

```text
https://leetcode.com/problems/search-a-2d-matrix/submissions/ ￼

Code:

$ cat search2DMatrix.py

"""
Write an efficient algorithm that searches for a value in an m x n matrix. This matrix has the following properties:

Integers in each row are sorted from left to right.
The first integer of each row is greater than the last integer of the previous row.
Example 1:

Input:
matrix = [
  [1,   3,  5,  7],
  [10, 11, 16, 20],
  [23, 30, 34, 50]
]
target = 3
Output: true
Example 2:

Input:
matrix = [
  [1,   3,  5,  7],
  [10, 11, 16, 20],
  [23, 30, 34, 50]
]
target = 13
Output: false
"""


class Solution:
    """
    binary search the matrix is if it were a list where
    MT is a MXN matrix
    MT[i][j] == L[i*N +j] 
    """

    def __init__(self):
        super().__init__()
        self.M = 0
        self.N = 0

    def convert2D(self, index):
        #print('converting {} using line size {}'.format( index, self.N))
        if self.N > 0:
            return index // (self.N), index % (self.N)

    def convert1D(self, i, j):
        #return i*(self.M) + j
        return i*(self.N) + j

    def bsearch(self, matrix, low, high, target):
        #print('bsearch(low={}, high={}'.format(low, high))
        found = False
        if (low > high):
            return found
        elif low == high:
            (i, j) = self.convert2D(low)
            return matrix[i][j] == target

        (i, j) = self.convert2D((low+high)//2)
        #print('middle={}, i={}, j={}, convert21D={}'.format((low+high)//2, i, j, self.convert1D(i,j)))
        if target == matrix[i][j]:
            return True
        elif target > matrix[i][j]:
            found = self.bsearch(matrix, self.convert1D(i, j)+1, high, target)
        else:
            found = self.bsearch(matrix, low, self.convert1D(i, j)-1, target)

        return found

    def searchMatrix(self, matrix, target):
        """
        basically, bsearch, reduce 2d to 1d indices wise
        """
        if (not isinstance(matrix, list)):
            return False

        self.M = len(matrix)
        if self.M == 0 or (not isinstance(matrix[0], list)):
            return False

        # list is invalid input
        if not isinstance(matrix, list):
            return False

        self.N = len(matrix[0])
        if self.N == 0:
            return False

        return self.bsearch(matrix, 0, (self.M)*(self.N)-1, target)



def test():
    sol = Solution()
    input = [
        1,
        [1],
        [[]],
        [
            [1,   3,  5,  7],
            [10, 11, 16, 20],
            [23, 30, 34, 50]
        ],
        [
            [1,   3,  5,  7],
            [10, 11, 16, 20],
            [23, 30, 34, 50]
        ],
        [[1]],
        [[1,3,5]],
        [[1],[3],[5]] 
    ]
    targets = [1, 2, 3, 3, 13, 1, 4, 0]
    expected = [False, False, False, True, False, True, False, False]
    for (matrix, target, expect) in zip(input, targets, expected):
        print('sol.searchMatrix({},{})'.format(matrix, target))
        print('returns {} '.format(sol.searchMatrix(matrix, target)))
        assert(sol.searchMatrix(matrix, target) == expect)


if __name__ == "__main__":
    test()

Test:
$ py3 search2DMatrix.py
sol.searchMatrix(1,1)
returns False 
sol.searchMatrix([1],2)
returns False 
sol.searchMatrix([[]],3)
returns False 
sol.searchMatrix([[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 50]],3)
returns True 
sol.searchMatrix([[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 50]],13)
returns False 
sol.searchMatrix([[1]],1)
returns True 
sol.searchMatrix([[1, 3, 5]],4)
returns False 
sol.searchMatrix([[1], [3], [5]],0)
returns False
```
