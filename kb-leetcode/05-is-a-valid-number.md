---
type: reference
title: is a valid number
description: LeetCode Valid Number problem with accepted and rejected input cases and Python solution.
tags: [leetcode, python, string-algorithms, algorithms, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "leetcode-kb#6"
---

# is a valid number

[↑ leetcode-kb](/kb-leetcode/README.md)

```text
.2. is a  invalid  number
+.1 is a  valid  number
-.1 is a  valid  number
+2e- is a  invalid  number
46.e3 is a  valid  number

Code:

#!/usr/local/bin/python3

from collections import defaultdict
import pdb

class Solution:
    digits = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'}
    sign_chars = {'-', '+' }
    other_chars = {'e', '.', }
    special_chars =  other_chars | sign_chars
    allowedChars = digits | special_chars
    def isNumber(self, inp):
        start = 0
        end = len(inp)-1
        while start<=end and inp[start] == ' ':
            start = start+1
        while end>=start and inp[end] == ' ':
            end = end-1

        found_e=found_dot=found_sign=found_digit=False

        index = start
        while ( index <= end):
            if (inp[index] in self.digits):
                found_digit = True
            elif (inp[index] in self.sign_chars):
                if found_digit or found_sign or found_dot:
                    return False
                found_sign = True
            elif (inp[index] in '.'):
                if found_dot or found_e:
                    return False
                found_dot = True
            elif  (inp[index] in 'e'):
                if found_e or not found_digit:
                    return False
                found_e = True
                found_digit = found_sign = found_dot = False
            else:
                return False

            index = index +1

        return found_digit

    def isNumberComplicatedAlmostWorking(self, inp):
        """
        idea,
        a. trim spaces
        b. scan chars, compare w/ allowedChars dictionary {'0':True, ...
        ,'9':True, '-','e' ...
        c. For - . and e check if in allowed position (e.g. last char - is not
        number)
        """
        freqs = defaultdict(int)

        inp = inp.strip()
        if len(inp) == 0: #" "
            return False
        #print('testing stripped input ', inp)
        for index, char in enumerate(inp):
            freqs[char] = freqs[char]+1
            #pdb.set_trace()
            if not char in self.allowedChars:
                return False
            if char == 'e':
                if index == 0 or index == len(inp)-1: #3e, e3
                    return False
                if (inp[index-1] not in self.digits) or  (( inp[index+1] not in self.digits) and (inp[index+1] != '-' )): #-e, e+ etc
                    if inp[index-1] != '.': #   "46.e3" is valid
                        return False
                    else: #'.e' must have digit before .
                        if index < 2: #'.e' is invalid
                            return  False
                        elif inp[index-2] not in self.digits:
                            return  False
                postEindexscan = index +2
                while postEindexscan < len(inp):
                    if inp[postEindexscan] not in self.digits: #e-- e-+ etc
                        return False
                    postEindexscan = postEindexscan +1
            elif char == '.':
                if len(inp) == 1:
                    return False
                if (index > 0 and inp[index-1] in self.other_chars) or  ( index < len(inp)-1 and inp[index+1] not in self.digits): #e., .+
                    if inp[index+1] != 'e': #   "46.e3" is valid
                        return  False
            elif char == '-':
                if index == len(inp) -1:
                    return False
                if index != 0 and inp[index-1] != 'e' : #not one of -5, 4e-2
                    return False
                if inp[index+1] not in (self.digits | {'.'}) : #-+,  -e etc
                    return False
            elif char == '+':
                if index == len(inp) -1:
                    return False
                if index != 0: #+ is only valid at start
                    return False
                if inp[index+1] not in self.digits: #++, +e etc
                    if inp[index+1] != '.':  #+. is  allowed
                        return False

        for c in self.special_chars:
            if freqs[c] > 1:
                return False
        return True

def test():
    sol = Solution()

    inputs=[ "-.", "-.3e6", ".e1", "0" , " 0.1 " , "abc" , "1 a" , "2e10" , " -90e3   " , " 1e" ,
            "e3" , " 6e-1" , " 99e2.5 " , "53.5e93" , " --6 " , "-+3" ,
            "95a54e53" , ".", ".-", "++4", " ", ".5", "6.", ".2.", "+.1",
            "-.1", "+2e-", "46.e3"]
    validity=[False, True, False, True , True , False, False, True, True, False, False, True,
            False, True, False, False, False , False, False, False, False,
            True, True, False, True, True, False, True ]


    for index, inp in enumerate(inputs):
        print('{} is a '.format(inp), 'valid' if sol.isNumber(inp) else 'invalid', ' number')
        assert(sol.isNumber(inp) == validity[index])

if __name__== '__main__':
    test()
```
