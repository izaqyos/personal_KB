---
type: reference
title: min of following
description: "Recurrence for edit distance (delete, replace, insert cases) with a test harness in Python."
tags: [leetcode, dynamic-programming, string-algorithms, python, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "leetcode-kb#2"
---

# min of following

[↑ leetcode-kb](/kb-leetcode/README.md)

## 2.1 D(X[m-1], Y[n]) +1, del X[m]

```text
  2.2 D(X[m], Y[n-1]) +1,  insert Y[N] to end of X so X = X[1..m]Yn
```

## 2.2 D(X[m-1], Y[n-1]) +1, replace Xm w/ Xn

```text
}

can be imporved by DP, use matrix |X|+1 by |Y| +1 where m(i,j) is dist X[1..i]Y[1..j]
M[0][1..j] = j (insert j chars from Y to empty X)
M[1..i][0] = i (delete i chars from X to be empty as Y)
M[i][j] == M[i-1][j-1] if X[i] == Y[J] (take from diagonal)
M[i][j] == min of three option: 
  1 M[i-1][j]) +1, take row above when del X[i] 
  2 M[i][j-1]) +1, take left column when insert Y[j] to end of X
  2 M([i-1][j-1]) +1,  replace X[i] w/ Y[j]
"""
import pdb;
import numpy as np

class Solution:
    def __init__(self):
        self.expected = Solution.testExpectedRes([3, 5 ,2, 3, 4])

    def testExpectedRes(expected):
        index = 0
        expected_dists = expected 
        while index< len(expected_dists):
            yield expected_dists[index]
            index+=1

    def printMatrix(matrix):
        print(np.matrix(matrix))
        

    def minDistance(self, word1, word2): 
        """
        levenshtein algo. X stands for word1. Y for word2.
        """
        if len(word1) == 0:
            return len(word2)

        if len(word2) == 0:
            return len(word1)

        n1 = len(word1)
        n2 = len(word2)
        DistMtx = [ [ 0 for j in range(n2+1)]  for i in range(n1+1)]
        for j in range(n2):
            DistMtx[0][j+1] = j+1 #Delete i chars from X
        for i in range(n1):
            DistMtx[i+1][0] = i+1 #Insert j chars from Y to C
        for j in range(n2):
            for i in range(n1):
                if word1[i] == word2[j]:
                    DistMtx[i+1][j+1] = DistMtx[i][j] #If last char is same in X&Y solve subproblem X[1..i-1], Y[1..j-1] 
                else:
                    """
                    If last char is not same in X&Y take the min cost from one of three sub problems +1 for the 
                    del/insert/replace operation on last char
                    """
                    DistMtx[i+1][j+1] = min( DistMtx[i][j+1] , DistMtx[i+1][j] , DistMtx[i][j]) +1 #Last case. 
        #ret = self.expected.__next__() # for tests pre impl
        print('distance matrix {} X {}'.format(word1,word2))
        Solution.printMatrix(DistMtx)
        return DistMtx[n1][n2]

def test():
    words =  [('horse', 'ros'), ('intention', 'execution'), ('', 'hi'), ('bye', ''), ('krakovian', 'pablovian'), ('distance', 'springbok')];
    expected_dists = [3, 5 ,2, 3, 4, 9]
    # words =  [('distance', 'springbok')];
    # expected_dists = [9]
    sol = Solution()
    dists = [ sol.minDistance(*tup) for tup in words ]
    print('inputs: {}\nexpected distances: {}\nactual distances: {}'.format(words, expected_dists, dists))
    assert(expected_dists == dists)

if __name__ == '__main__':
    test()


Tests:

$ py3 editDistance.py 
distance matrix horse X ros
[[0 1 2 3]
 [1 1 2 3]
 [2 2 1 2]
 [3 2 2 2]
 [4 3 3 2]
 [5 4 4 3]]
distance matrix intention X execution
[[0 1 2 3 4 5 6 7 8 9]
 [1 1 2 3 4 5 6 6 7 8]
 [2 2 2 3 4 5 6 7 7 7]
 [3 3 3 3 4 5 5 6 7 8]
 [4 3 4 3 4 5 6 6 7 8]
 [5 4 4 4 4 5 6 7 7 7]
 [6 5 5 5 5 5 5 6 7 8]
 [7 6 6 6 6 6 6 5 6 7]
 [8 7 7 7 7 7 7 6 5 6]
 [9 8 8 8 8 8 8 7 6 5]]
distance matrix krakovian X pablovian
[[0 1 2 3 4 5 6 7 8 9]
 [1 1 2 3 4 5 6 7 8 9]
 [2 2 2 3 4 5 6 7 8 9]
 [3 3 2 3 4 5 6 7 7 8]
 [4 4 3 3 4 5 6 7 8 8]
 [5 5 4 4 4 4 5 6 7 8]
 [6 6 5 5 5 5 4 5 6 7]
 [7 7 6 6 6 6 5 4 5 6]
 [8 8 7 7 7 7 6 5 4 5]
 [9 9 8 8 8 8 7 6 5 4]]
distance matrix distance X springbok
[[0 1 2 3 4 5 6 7 8 9]
 [1 1 2 3 4 5 6 7 8 9]
 [2 2 2 3 3 4 5 6 7 8]
 [3 2 3 3 4 4 5 6 7 8]
 [4 3 3 4 4 5 5 6 7 8]
 [5 4 4 4 5 5 6 6 7 8]
 [6 5 5 5 5 5 6 7 7 8]
 [7 6 6 6 6 6 6 7 8 8]
 [8 7 7 7 7 7 7 7 8 9]]
inputs: [('horse', 'ros'), ('intention', 'execution'), ('', 'hi'), ('bye', ''), ('krakovian', 'pablovian'), ('distance', 'springbok')]
expected distances: [3, 5, 2, 3, 4, 9]
actual distances: [3, 5, 2, 3, 4, 9]
```
