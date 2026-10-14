---
type: reference
title: Simplify unix file path
description: LeetCode Simplify Path solution in Python for canonicalizing unix file paths.
tags: [leetcode, python, string-algorithms, unix, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "leetcode-kb#10"
---

# Simplify unix file path

[↑ leetcode-kb](/kb-leetcode/README.md)

```text
https://leetcode.com/problems/simplify-path/submissions/


$ cat simplifyFIlePath.py
"""
Simplify Path
Medium

678

1621

Add to List

Share
Given an absolute path for a file (Unix-style), simplify it. Or in other words, convert it to the canonical path.

In a UNIX-style file system, a period . refers to the current directory. Furthermore, a double period .. moves the directory up a level.

Note that the returned canonical path must always begin with a slash /, and there must be only a single slash / between two directory names. The last directory name (if it exists) must not end with a trailing /. Also, the canonical path must be the shortest string representing the absolute path.

 

Example 1:

Input: "/home/"
Output: "/home"
Explanation: Note that there is no trailing slash after the last directory name.
Example 2:

Input: "/../"
Output: "/"
Explanation: Going one level up from the root directory is a no-op, as the root level is the highest level you can go.
Example 3:

Input: "/home//foo/"
Output: "/home/foo"
Explanation: In the canonical path, multiple consecutive slashes are replaced by a single one.
Example 4:

Input: "/a/./b/../../c/"
Output: "/c"
Example 5:

Input: "/a/../../b/../c//.//"
Output: "/c"
Example 6:

Input: "/a//b////c/d//././/.."
Output: "/a/b/c"
"""

from collections import deque

class Solution:
    def __init__(self):
        self.q = deque()

    def handle_dir(self, dir):
        if len(dir) == 0: 
            return

        if dir == '.':
            return
        elif dir == '..':
            if len(self.q) > 0:
                self.q.pop()
        else:
            self.q.append(dir)

    def finalize(self):
        """
        use dirs in stack to reconstruct path. if it weren't for deque o(1) popleft would have 
        used a 2nd stack to reverse order of dirs so root pops first etc. 
        """
        path = '/'
        while len(self.q) > 0:
            path+= self.q.popleft()
            if (len(self.q) > 0):
                path+='/'

        return path

    def simplifyPath(self, path):
        """
        rules, remove ending / if any
        scan path, consume patterns between / , 
        if pattern is . - noop
        if pattern is .. - pop stack if not empty
        if pattern is a word - push to stack
        if pattern is empty set ending / as starting / for next check
        """
        index = 0
        length = len(path)
        if path[-1] == '/':
            length-=1

        lslash = False
        left_slash = 0
        right_slash = 0
        while index < length:
            c = path[index]
            if c == '/':
                if lslash:
                    right_slash = index
                    self.handle_dir(path[left_slash+1: right_slash])
                    left_slash = index
                    lslash = True
                else:
                    lslash = True
                    left_slash = index
            index+=1

        if left_slash < length: #save call handle dir with empty dir 
            self.handle_dir(path[left_slash+1: length])

        return self.finalize()
    
def test():
    paths = ["/home/", "/../", "/home//foo/", "/a/./b/../../c/", "/a/../../b/../c//.//", "/a//b////c/d//././/.." ]
    expected = ["/home", "/", "/home/foo", "/c", "/c", "/a/b/c" ]

    sol = Solution()
    for i in range(len(paths)):
        cpath = sol.simplifyPath(paths[i])
        #print('canonizing path {} to {}'.format(paths[i], cpath ))
        assert( cpath == expected[i])


if __name__ == "__main__":
    test()


$ py3 simplifyFIlePath.py
$ 
```
