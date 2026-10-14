---
type: reference
title: 2 steps + 1 step
description: Section 3 of the legacy leetcode-kb notes.
tags: [kb-leetcode]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "leetcode-kb#3"
---

# 2 steps + 1 step

[↑ leetcode-kb](/kb-leetcode/README.md)

```text
"""

class Solution:
    def climbStairs(self, n):
        if n>=0 and n<=2  :
            return n

        ##o(n) space, o(n) time
        #ndp = [1,2]
        #for i in range(2, n):
        #    ndp.append(ndp[i-1] + ndp[i-2])
        #return ndp[n-1]
        
        #o(1) space, o(n) time
        fibLastTwo = [1,2]
        for i in range(2, n):
            cur = fibLastTwo[0] + fibLastTwo[1]
            fibLastTwo[0] = fibLastTwo[1]
            fibLastTwo[1] = cur
        return fibLastTwo[1]




def test():
    sol = Solution()
    for n in range(20):
        print('If I can climb 1 or two steps there are {} ways to climb {} stairs'.format(sol.climbStairs(n), n))

if __name__ == "__main__":
if __name__ == "__main__":


$ py3 climbStairs.py 
If I can climb 1 or two steps there are 0 ways to climb 0 stairs
If I can climb 1 or two steps there are 1 ways to climb 1 stairs
If I can climb 1 or two steps there are 2 ways to climb 2 stairs
If I can climb 1 or two steps there are 3 ways to climb 3 stairs
If I can climb 1 or two steps there are 5 ways to climb 4 stairs
If I can climb 1 or two steps there are 8 ways to climb 5 stairs
If I can climb 1 or two steps there are 13 ways to climb 6 stairs
If I can climb 1 or two steps there are 21 ways to climb 7 stairs
If I can climb 1 or two steps there are 34 ways to climb 8 stairs
If I can climb 1 or two steps there are 55 ways to climb 9 stairs
If I can climb 1 or two steps there are 89 ways to climb 10 stairs
If I can climb 1 or two steps there are 144 ways to climb 11 stairs
If I can climb 1 or two steps there are 233 ways to climb 12 stairs
If I can climb 1 or two steps there are 377 ways to climb 13 stairs
If I can climb 1 or two steps there are 610 ways to climb 14 stairs
If I can climb 1 or two steps there are 987 ways to climb 15 stairs
If I can climb 1 or two steps there are 1597 ways to climb 16 stairs
If I can climb 1 or two steps there are 2584 ways to climb 17 stairs
If I can climb 1 or two steps there are 4181 ways to climb 18 stairs
If I can climb 1 or two steps there are 6765 ways to climb 19 stairs

￼
```
