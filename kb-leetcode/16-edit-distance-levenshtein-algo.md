---
type: reference
title: "Edit distance, Levenshtein algo"
description: LeetCode Edit Distance with the Levenshtein algorithm and Python code.
tags: [leetcode, dynamic-programming, string-algorithms, python, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "leetcode-kb#11"
---

# Edit distance, Levenshtein algo

[↑ leetcode-kb](/kb-leetcode/README.md)

```text
￼

Code:

$ cat editDistance.py 
"""
Given two words word1 and word2, find the minimum number of operations required to convert word1 to word2.

You have the following 3 operations permitted on a word:

Insert a character
Delete a character
Replace a character
Example 1:

Input: word1 = "horse", word2 = "ros"
Output: 3
Explanation: 
horse -> rorse (replace 'h' with 'r')
rorse -> rose (remove 'r')
rose -> ros (remove 'e')
Example 2:

Input: word1 = "intention", word2 = "execution"
Output: 5
Explanation: 
intention -> inention (remove 't')
inention -> enention (replace 'i' with 'e')
enention -> exention (replace 'n' with 'x')
exention -> exection (replace 'n' with 'c')
exection -> execution (insert 'u')"

algorith. levenshtein dist.
recursion. dist of X[1..m] Y[1..n] = { one of:
1. max(m,n) if min(m,n) = 0. (this means either X is empty so |Y| insertions, or Y empty so |X| deletions). stop cond
if X[m] == Y[n] D(X[m],Y[n]) == D(X[m-1],Y[n-1]). since last characters are the same
else
```

## See Also

<!-- backlinks:start -->
### Backlinks

* [Edit Distance](/algorithms/strings/edit-distance.md)
* [LIS / LCS / Edit Distance (Sequence DP)](/algorithms/dp-patterns/lis-lcs.md)
<!-- backlinks:end -->
