---
type: reference
title: "Word search, recursion"
description: "LeetCode Word Search solved with recursive backtracking in Python, with to-do improvements."
tags: [leetcode, python, backtracking, recursion, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "leetcode-kb#23"
---

# Word search, recursion

[↑ leetcode-kb](/kb-leetcode/README.md)

```text
￼

$ cat wordsearch.py | pbcopy 
$ py3 wordsearch.py | pbcopy 

"""
Add to List

Share
Given a 2D board and a word, find if the word exists in the grid.

The word can be constructed from letters of sequentially adjacent cell, where "adjacent" cells are those horizontally or vertically neighboring. The same letter cell may not be used more than once.

Example:

board =
[
  ['A','B','C','E'],
  ['S','F','C','S'],
  ['A','D','E','E']
]

Given word = "ABCCED", return true.
Given word = "SEE", return true.
Given word = "ABCB", return false.


Constraints:

board and word consists only of lowercase and uppercase English letters.
1 <= board.length <= 200
1 <= board[i].length <= 200
1 <= word.length <= 10^3
"""


#ToDo, a. instead of visited set i,j to ''
#b do for loop on directons [(1,0), (0,1), (-1, 0), (0,-1)]
#c. use index instead of slices
class Solution:
    def verifyPosition(self, board, word, windex, row, column):
        return row>=0 and row<len(board)\
            and column>=0 and column<len(board[0])\
            and windex<len(word) and (word[windex] == board[row][column])

    def matchword(self, board, word, windex, row, column):
        if len(word) == windex: #at this point we matched the whole word
            return True
        #print('matchword(self, board, word[{}]={}, visited, row={}, column={})'.format(windex, word[windex], row, column))
        directons = [(1,0), (0,1), (-1, 0), (0,-1)] 

        if not self.verifyPosition(board, word, windex, row, column ):
            return False
            
        prev = board[row][column]
        board[row][column] = ' ' #words don't contain space 
        ret = False
        for direction in directons:
            ret = ret or self.matchword(board, word, windex+1, row+direction[0], column+direction[1])
        
        board[row][column] = prev
        return ret
        
    def exist(self, board, word):
        if len(board) == 0 or len(board[0]) == 0 or len(word) == 0:
            return False

        for i in range(len(board)):
            for j in range(len(board[0])):
                match = self.matchword(board, word, 0, i, j)
                if match:
                    return True
                
        return False


def test():
    boards = [[], [[]], [['a']],
              [
              ['A', 'B', 'C', 'E'],
              ['S', 'F', 'C', 'S'],
              ['A', 'D', 'E', 'E']
              ],
              [["C","A","A"],
              ["A","A","A"],
              ["B","C","D"]],
            [["A","B","C","E"],
            ["S","F","E","S"],
            ["A","D","E","E"]] 
             ]
    words = ['', 'X', 'ABCCED', 'SEE', 'ABCB', 'AAB', 'ABCESEEEFS']
    inputs = [(boards[0], words[2]), (boards[1], words[2]),
              (boards[2], words[0]), (boards[3], words[2]),
              (boards[3], words[3]),
              (boards[3], words[4]),
              (boards[4], words[5]),
              (boards[5], words[6]),
              ]
    excepted = [False, False, False, False, True, True, False, True]
    sol = Solution()
    for inp, exp in zip(inputs, excepted):
        found = sol.exist(inp[0], inp[1])
        print('board={}, words={}, found word={}'.format(
            inp[0], inp[1], found))

    # assert


if __name__ == '__main__':
    test()


board=[], words=ABCCED, found word=False
board=[[]], words=ABCCED, found word=False
board=[['a']], words=, found word=False
board=[['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']], words=ABCCED, found word=True
board=[['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']], words=SEE, found word=True
board=[['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']], words=ABCB, found word=False
board=[['C', 'A', 'A'], ['A', 'A', 'A'], ['B', 'C', 'D']], words=AAB, found word=True
board=[['A', 'B', 'C', 'E'], ['S', 'F', 'E', 'S'], ['A', 'D', 'E', 'E']], words=ABCESEEEFS, found word=True
```

## See Also

<!-- backlinks:start -->
### Backlinks

* [Backtracking](/algorithms/paradigms/backtracking.md)
<!-- backlinks:end -->
