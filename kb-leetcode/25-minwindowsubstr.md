---
type: reference
title: minWindowSubstr
description: LeetCode Minimum Window Substring solution in Python.
tags: [leetcode, python, sliding-window, string-algorithms, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "leetcode-kb#20"
---

# minWindowSubstr

[↑ leetcode-kb](/kb-leetcode/README.md)

```text
$ cat !$
cat minWindowSubstr.py
"""

Given a string S and a string T, find the minimum window in S which will contain all the characters in T in complexity O(n).

Example:

Input: S = "ADOBECODEBANC", T = "ABC"
Output: "BANC"
Note:

If there is no such window in S that covers all characters in T, return the empty string "".
If there is such window, you are guaranteed that there will always be only one unique minimum window in S.

Idea:
Keep to dictionaries of T chars freq. one as readonly and a second copy for running match candidate
scan S, keep track of i, lmi, hmi which are running index, low match index and high match index
lmi hmi start as -1
for each char if it is in T match dict if lmi is -1 set to i, update counter, check if full match,etc..
This will fail if matched overlap, e.g. 'bcab', 'ba'
instead sliding window. 
use same dict but once match found move left side index until first match. 
if len < min set as possible return
add back this char to dict and set left index +1
"""

from sys import maxsize

class Solution:

    def minWindow(self, s, t):

        if len(s) == 0 or len(t) == 0:
            return s
        
        if len(t) > len(s):
            return ''

        minLen = maxsize
        left = 0
        found = 0
        sRet = ""
        tCharFreqs = {} #match dictionary. 
        for c in t:
            if c in tCharFreqs:
                tCharFreqs[c] += 1 
            else:
                tCharFreqs[c] = 1

        for i,c in enumerate(s):
            if c in tCharFreqs:
                if tCharFreqs[c] > 0: #only contributes to found if seen up to tCharFreqs[c] times
                    found +=1
                tCharFreqs[c] -= 1 #extra matching chars 

            while found == len(t): #found match, now move left index to skip non match chars
                if (i - left +1) < minLen:
                    sRet = s[left: i+1]
                    minLen = i-left+1

                if s[left] in tCharFreqs: 
                    tCharFreqs[s[left]] += 1  #when we move forward, 'unsee' s[left] char
                    if tCharFreqs[s[left]] > 0: #now we no longer have a match.  
                        found -= 1
                left+=1
        return sRet



                


def test():
    inps = [ ['', 'a'], ['abc', ''], ['ADOBECODEBANC', 'ABC'], ['helloyossi','lsil'], ['bcccab','ba' ]]
    expected = ['', 'abc', 'BANC', 'lloyossi', 'ab']
    sol = Solution()
    for inp,exp in zip(inps, expected):
        print('check min window substr of {} in {}'.format(inp[1], inp[0]))
        minsubstr = sol.minWindow(inp[0], inp[1])
        print('min windows substr is', minsubstr)
        #assert( minsubstr == exp)

if __name__ == '__main__':
    test()

$ py3 minWindowSubstr.py
check min window substr of a in 
min windows substr is 
check min window substr of  in abc
min windows substr is abc
check min window substr of ABC in ADOBECODEBANC
min windows substr is BANC
check min window substr of lsil in helloyossi
min windows substr is lloyossi
check min window substr of ba in bcccab
min windows substr is ab

￼
```

## See Also

<!-- backlinks:start -->
### Backlinks

* [Sliding Window](/algorithms/patterns/sliding-window.md)
<!-- backlinks:end -->
