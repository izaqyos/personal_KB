---
type: reference
title: facebook
description: Section 15 of the legacy leetcode-kb notes.
tags: [kb-leetcode]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "leetcode-kb#15"
---

# facebook

[↑ leetcode-kb](/kb-leetcode/README.md)

## 15.1 Facebook practice I

```text
$ lt
total 32
-rw-r--r--  1 <user>  staff   2.7K Jul 20 18:18 num_visible_nodes.py
-rw-r--r--  1 <user>  staff   1.7K Jul 20 18:20 contigous_subarray.py
-rw-r--r--  1 <user>  staff   2.2K Jul 20 18:21 median_stream.py
-rw-r--r--  1 <user>  staff   1.4K Jul 20 18:22 pairsums.py



Back to questions list
```

### 15.1.1 Contiguous Subarrays

```text
You are given an array arr of N integers. For each index i, you are required to determine the number of contiguous subarrays that fulfills the following conditions:
	•			The value at index i must be the maximum element in the contiguous subarrays, and 
	•			These contiguous subarrays must either start from or end on index i. 
Signature
int[] countSubarrays(int[] arr)
Input
	•			Array arr is a non-empty list of unique integers that range between 1 to 1,000,000,000 
	•			Size N is between 1 and 1,000,000 
Output
An array where each index i contains an integer denoting the maximum number of contiguous subarrays of arr[i]
Example:
arr = [3, 4, 1, 6, 2]
output = [1, 3, 1, 5, 1]
Explanation:
	•			For index 0 - [3] is the only contiguous subarray that starts (or ends) with 3, and the maximum value in this subarray is 3. 
	•			For index 1 - [4], [3, 4], [4, 1] 
	•			For index 2 - [1] 
	•			For index 3 - [6], [6, 2], [1, 6], [4, 1, 6], [3, 4, 1, 6] 
	•			For index 4 - [2] 
So, the answer for the above input is [1, 3, 1, 5, 1]


import math
# Add any extra import statements you may need here
# Add any helper functions you may need here


def count_subarrays(arr):
  counts = [1 for i in arr]
  for i in range(len(arr)):
    j=i-1
    while j>=0 and arr[j]<=arr[i]:
      counts[i]+=1
      j-=1
  
    k=i+1
    while k<len(arr) and arr[k]<=arr[i]:
      counts[i]+=1
      k+=1
     
  return counts
      
      # These are the tests we use to determine if the solution is correct.
# You can add your own at the bottom, but they are otherwise not editable!

def printInteger(n):
  print('[', n, ']', sep='', end='')

def printIntegerList(array):
  size = len(array)
  print('[', end='')
  for i in range(size):
    if i != 0:
      print(', ', end='')
    print(array[i], end='')
  print(']', end='')

test_case_number = 1

def check(expected, output):
  global test_case_number
  expected_size = len(expected)
  output_size = len(output)
  result = True
  if expected_size != output_size:
    result = False
  for i in range(min(expected_size, output_size)):
    result &= (output[i] == expected[i])
  rightTick = '\u2713'
  wrongTick = '\u2717'
  if result:
    print(rightTick, 'Test #', test_case_number, sep='')
  else:
    print(wrongTick, 'Test #', test_case_number, ': Expected ', sep='', end='')
    printIntegerList(expected)
    print(' Your output: ', end='')
    printIntegerList(output)
    print()
  test_case_number += 1

if __name__ == "__main__":
  test_1 = [3, 4, 1, 6, 2]
  expected_1 = [1, 3, 1, 5, 1]
  output_1 = count_subarrays(test_1)
  check(expected_1, output_1)
  
  test_2 = [2, 4, 7, 1, 5, 3]
  expected_2 = [1, 2, 6, 1, 3, 1]
  output_2 = count_subarrays(test_2)
  check(expected_2, output_2)

  # Add your own test cases here
```

### 15.1.2 Pair Sums

```text
Given a list of n integers arr[0..(n-1)], determine the number of different pairs of elements within it which sum to k.
If an integer appears in the list multiple times, each copy is considered to be different; that is, two pairs are considered different if one pair includes at least one array index which the other doesn't, even if they include the same values.
Signature
int numberOfWays(int[] arr, int k)
Input
n is in the range [1, 100,000].
Each value arr[i] is in the range [1, 1,000,000,000].
k is in the range [1, 1,000,000,000].
Output
Return the number of different pairs of elements which sum to k.
Example 1
n = 5
k = 6
arr = [1, 2, 3, 4, 3]
output = 2
The valid pairs are 2+4 and 3+3.
Example 2
n = 5
k = 6
arr = [1, 5, 3, 3, 3]
output = 4
There's one valid pair 1+5, and three different valid pairs 3+3 (the 3rd and 4th elements, 3rd and 5th elements, and 4th and 5th elements).

import math
# Add any extra import statements you may need here


# Add any helper functions you may need here


def numberOfWays(arr, k):
 	# Write your code here
  n = len(arr)
  
  #runtime O(n^2), space O(1) , can also use dict to reduce RT to O(N), space O(N)
  count = 0
  for i in range(n):
    for j in range(i+1, n):
      if arr[i]+arr[j] == k:
        count+=1
        
  return count
  

# These are the tests we use to determine if the solution is correct.
# You can add your own at the bottom, but they are otherwise not editable!

def printInteger(n):
  print('[', n, ']', sep='', end='')

test_case_number = 1

def check(expected, output):
  global test_case_number
  result = False
  if expected == output:
    result = True
  rightTick = '\u2713'
  wrongTick = '\u2717'
  if result:
    print(rightTick, 'Test #', test_case_number, sep='')
  else:
    print(wrongTick, 'Test #', test_case_number, ': Expected ', sep='', end='')
    printInteger(expected)
    print(' Your output: ', end='')
    printInteger(output)
    print()
  test_case_number += 1

if __name__ == "__main__":
  k_1 = 6
  arr_1 = [1, 2, 3, 4, 3]
  expected_1 = 2
  output_1 = numberOfWays(arr_1, k_1)
  check(expected_1, output_1)

  k_2 = 6
  arr_2 = [1, 5, 3, 3, 3]
  expected_2 = 4
  output_2 = numberOfWays(arr_2, k_2)
  check(expected_2, output_2)

  # Add your own test cases here
```

### 15.1.3 Rotational Cipher

```text
One simple way to encrypt a string is to "rotate" every alphanumeric character by a certain amount. Rotating a character means replacing it with another character that is a certain number of steps away in normal alphabetic or numerical order.
For example, if the string "Zebra-493?" is rotated 3 places, the resulting string is "Cheud-726?". Every alphabetic character is replaced with the character 3 letters higher (wrapping around from Z to A), and every numeric character replaced with the character 3 digits higher (wrapping around from 9 to 0). Note that the non-alphanumeric characters remain unchanged.
Given a string and a rotation factor, return an encrypted string.
Signature
string rotationalCipher(string input, int rotationFactor)
Input
1 <= |input| <= 1,000,000
0 <= rotationFactor <= 1,000,000
Output
Return the result of rotating input a number of times equal to rotationFactor.
Example 1
input = Zebra-493?
rotationFactor = 3
output = Cheud-726?
Example 2
input = abcdefghijklmNOPQRSTUVWXYZ0123456789
rotationFactor = 39
output = nopqrstuvwxyzABCDEFGHIJKLM9012345678
Need Hints?


import math
# Add any extra import statements you may need here
# Add any helper functions you may need here


def rotationalCipher(input, rotation_factor):
  # Write your code here
  if len(input) == 0:
    return 
  
  retStr= ""
    
  for i in range(len(input)):  
    if (ord(input[i]) >= ord('0')) and (ord(input[i]) <= ord('9')):
      retStr += chr ( (ord(input[i]) - ord('0') + rotation_factor) %10 +ord('0'))
      
    elif ((ord(input[i]) >= ord('a')) and (ord(input[i]) <= ord('z'))):
      retStr += chr ( (ord(input[i]) - ord('a') + rotation_factor) %26 +ord('a'))

    elif ((ord(input[i]) >= ord('A')) and (ord(input[i]) <= ord('Z'))):
      retStr += chr ( (ord(input[i]) - ord('A') + rotation_factor) %26 +ord('A'))

    else:
      retStr += input[i]
      
  return retStr
      
# These are the tests we use to determine if the solution is correct.
# You can add your own at the bottom, but they are otherwise not editable!

def printString(string):
  print('[\"', string, '\"]', sep='', end='')

test_case_number = 1

def check(expected, output):
  global test_case_number
  result = False
  if expected == output:
    result = True
  rightTick = '\u2713'
  wrongTick = '\u2717'
  if result:
    print(rightTick, 'Test #', test_case_number, sep='')
  else:
    print(wrongTick, 'Test #', test_case_number, ': Expected ', sep='', end='')
    printString(expected)
    print(' Your output: ', end='')
    printString(output)
    print()
  test_case_number += 1

if __name__ == "__main__":
  input_1 = "All-convoYs-9-be:Alert1."
  rotation_factor_1 = 4
  expected_1 = "Epp-gsrzsCw-3-fi:Epivx5."
  output_1 = rotationalCipher(input_1, rotation_factor_1)
  check(expected_1, output_1)

  input_2 = "abcdZXYzxy-999.@"
  rotation_factor_2 = 200
  expected_2 = "stuvRPQrpq-999.@"
  output_2 = rotationalCipher(input_2, rotation_factor_2)
  check(expected_2, output_2)
```

### 15.1.4 Median Stream

```text
You're given a list of n integers arr[0..(n-1)]. You must compute a list output[0..(n-1)] such that, for each index i (between 0 and n-1, inclusive), output[i] is equal to the median of the elements arr[0..i] (rounded down to the nearest integer).
The median of a list of integers is defined as follows. If the integers were to be sorted, then:
	•			If there are an odd number of integers, then the median is equal to the middle integer in the sorted order. 
	•			Otherwise, if there are an even number of integers, then the median is equal to the average of the two middle-most integers in the sorted order. 
Signature
int[] findMedian(int[] arr)
Input
n is in the range [1, 1,000,000].
Each value arr[i] is in the range [1, 1,000,000].
Output
Return a list of n integers output[0..(n-1)], as described above.
Example 1
n = 4
arr = [5, 15, 1, 3]
output = [5, 10, 5, 4]
The median of [5] is 5, the median of [5, 15] is (5 + 15) / 2 = 10, the median of [5, 15, 1] is 5, and the median of [5, 15, 1, 3] is (3 + 5) / 2 = 4.
Example 2
n = 2
arr = [1, 2]
output = [1, 1]
The median of [1] is 1, the median of [1, 2] is (1 + 2) / 2 = 1.5 (which should be rounded down to 1).


Idea. 
Divide numbers from stream into two heaps.
The smaller than median would go to max heap
The bigger equal than median would go to min heap
At all times the difference in lengths between heaps is 0 or 1 
If we maintain this then the median at any given moment would be
The first elem in min heap if its longer than max
The first elem in max heap if its longer than min
The sum of the two first elems divided by 2.

Example 
8, 15, 3, 1, 7

Phase 1 
M  = []
m = [8]
Median = 8

Phase 2 
M  = [8]
m = [15]
Median = 12

Phase 3 
M  = [8, 3]
m = [15]
Median = 8


Phase 4 
M  = [3, 1]
m = [8, 15]
Median = 7

etc…


import math
# Add any extra import statements you may need here
import heapq

# Add any helper functions you may need here


def findMedian(arr):
  # Write your code here
  if (len(arr) == 0):
    return arr
  
  smaller = [] #max heap. don't forget negate in out...
  bigger = [] #min heap
  
  median = 0
  medians=[]

  for n in arr:
    if n < median:
      if len(smaller) > len(bigger): #maintain max 1 size diff
        heapq.heappush(bigger, -1*heapq.heappop(smaller))
      heapq.heappush(smaller, -1*n)
    else:
      if len(bigger) > len(smaller): #maintain max 1 size diff
        heapq.heappush(smaller, -1*heapq.heappop(bigger))
      heapq.heappush(bigger, n)
      
    if (len(bigger) < len(smaller)):
      median = -1*smaller[0]
    elif (len(smaller) < len(bigger)):
      median = bigger[0]
    else:
      median = (bigger[0] + (-1*smaller[0]))  // 2
    
    medians.append(median)
    
    
  return medians   


# These are the tests we use to determine if the solution is correct.
# You can add your own at the bottom, but they are otherwise not editable!

def printInteger(n):
  print('[', n, ']', sep='', end='')

def printIntegerList(array):
  size = len(array)
  print('[', end='')
  for i in range(size):
    if i != 0:
      print(', ', end='')
    print(array[i], end='')
  print(']', end='')

test_case_number = 1

def check(expected, output):
  global test_case_number
  expected_size = len(expected)
  output_size = len(output)
  result = True
  if expected_size != output_size:
    result = False
  for i in range(min(expected_size, output_size)):
    result &= (output[i] == expected[i])
  rightTick = '\u2713'
  wrongTick = '\u2717'
  if result:
    print(rightTick, 'Test #', test_case_number, sep='')
  else:
    print(wrongTick, 'Test #', test_case_number, ': Expected ', sep='', end='')
    printIntegerList(expected)
    print(' Your output: ', end='')
    printIntegerList(output)
    print()
  test_case_number += 1

if __name__ == "__main__":
  arr_1 = [5, 15, 1, 3]
  expected_1 = [5, 10, 5, 4]
  output_1 = findMedian(arr_1)
  check(expected_1, output_1)

  arr_2 = [2, 4, 7, 1, 5, 3]
  expected_2 = [2, 3, 4, 3, 4, 3]
  output_2 = findMedian(arr_2)
  check(expected_2, output_2)


  # Add your own test cases here
```

## 15.2 Facebook practice balance brackets

```text
$ cat !$
cat balanceBrackets.py
"""


Back to questions list
Balance Brackets
A bracket is considered to be any one of the following characters: (, ), {, }, [, or ].
We consider two brackets to be matching if the first element is an open-bracket, e.g., (, {, or [, and the second bracket is a close-bracket of the same type, e.g., ( and ), [ and ], and { and } are the only pairs of matching brackets.
Furthermore, a sequence of brackets is said to be balanced if the following conditions are met:
The sequence is empty, or
The sequence is composed of two, non-empty, sequences both of which are balanced, or
The first and last brackets of the sequence are matching, and the portion of the sequence without the first and last elements is balanced.
You are given a string of brackets. Your task is to determine whether each sequence of brackets is balanced. If a string is balanced, return true, otherwise, return false
Signature
bool isBalanced(String s)
Input
String s with length between 1 and 1000
Output
A boolean representing if the string is balanced or not
Example 1
s = {[()]}
output: true
Example 2
s = {}()
output: true
Example 3
s = {(})
output: false
Example 4
s = )
output: false
"""

import math
# Add any extra import statements you may need here


# Add any helper functions you may need here


def isBalanced(s):
  # Write your code here
  from collections import deque
  openingStack = deque()
  opening = ['(', '[', '{']
  closing = [')', ']', '}']
  
  def matchBracket(b1, b2):
    if b1=='{' and b2 == '}':
      return True
    if b1=='[' and b2 == ']':
      return True
    if b1=='(' and b2 == ')':
      return True
    return False
  
  for c in s:
    if c in opening:
      openingStack.append(c)
    elif c in closing:
      if len(openingStack) == 0:
        return False
      top = openingStack.pop()
      if not matchBracket(top, c):
        return False
    else:
      return False #not opening nor closing bracket
    
  if len(openingStack) == 0:
    return True
  else:
    return False












# These are the tests we use to determine if the solution is correct.
# You can add your own at the bottom, but they are otherwise not editable!

def printString(string):
  print('[\"', string, '\"]', sep='', end='')

test_case_number = 1

def check(expected, output):
  global test_case_number
  result = False
  if expected == output:
    result = True
  rightTick = '\u2713'
  wrongTick = '\u2717'
  if result:
    print(rightTick, 'Test #', test_case_number, sep='')
  else:
    print(wrongTick, 'Test #', test_case_number, ': Expected ', sep='', end='')
    printString(expected)
    print(' Your output: ', end='')
    printString(output)
    print()
  test_case_number += 1

if __name__ == "__main__":
  s1 = "{[(])}"
  expected_1 = False
  output_1 = isBalanced(s1)
  check(expected_1, output_1)

  s2 = "{{[[(())]]}}"
  expected_2 = True
  output_2 = isBalanced(s2)
  check(expected_2, output_2)

  # Add your own test cases here
```

## 15.3 Facebook practice reverse_even_subpart_list.py

```text
$ cat !$
cat reverse_even_subpart_list.py
"""


Back to questions list
Reverse Operations
You are given a singly-linked list that contains N integers. A subpart of the list is a contiguous set of even elements, bordered either by the end of the list or an odd element. For example, if the list is [1, 2, 8, 9, 12, 16], the subparts of the list are [2, 8] and [12, 16].
Then, for each subpart, the order of the elements is reversed. In the example, this would result in the new list, [1, 8, 2, 9, 16, 12].
The goal of this question is: given a resulting list, determine the original order of the elements.
Implementation detail:
You must use the following definition for elements in the linked list:
class Node {
    int data;
    Node next;
}
Signature
Node reverse(Node head)
Constraints
1 <= N <= 1000, where N is the size of the list
1 <= Li <= 10^9, where Li is the ith element of the list
Example
Input:
N = 6
list = [1, 2, 8, 9, 12, 16]
Output:
[1, 8, 2, 9, 16, 12]
"""
import math
# Add any extra import statements you may need here


class Node:
  def __init__(self, x):
    self.data = x
    self.next = None

# Add any helper functions you may need here


def reverse(head):
  # Write your code here
  from collections import deque
  
  subparthead = None
  cur = head
  subpartstack = deque()
  
  while cur != None:    
#    print ('elem ', cur.data)
    if subparthead == None:
      if cur.data%2 == 0:
        #print('start subpart. add elem ', cur.data)
        subparthead = cur
        subpartstack.append(cur.data)
    else:
      if cur.data%2 == 0:
       # print('cont subpart. add elem ', cur.data)
        subpartstack.append(cur.data)
      else:
      #  print('reversing subpart...')
        tempcur = subparthead
        subparthead = None
        for i in range(len(subpartstack)):
     #     print(' {} <-> {}'.format(tempcur.data, subpartstack[-1]))
          tempcur.data = subpartstack.pop()
          tempcur = tempcur.next
      
    cur = cur.next
    
  if subparthead != None:
   # print('reversing subpart...')
    for i in range(len(subpartstack)):
    #      print(' {} <-> {}'.format(subparthead.data, subpartstack[-1]))
          subparthead.data = subpartstack.pop()
          subparthead = subparthead.next
          
  
  return head
          
          
    
    
  










# These are the tests we use to determine if the solution is correct.
# You can add your own at the bottom, but they are otherwise not editable!

def printLinkedList(head):
  print('[', end='')
  while head != None:
    print(head.data, end='')
    head = head.next
    if head != None:
      print(' ', end='')
  print(']', end='')

test_case_number = 1

def check(expectedHead, outputHead):
  global test_case_number
  tempExpectedHead = expectedHead
  tempOutputHead = outputHead
  result = True
  while expectedHead != None and outputHead != None:
    result &= (expectedHead.data == outputHead.data)
    expectedHead = expectedHead.next
    outputHead = outputHead.next

  if not(outputHead == None and expectedHead == None):
    result = False

  rightTick = '\u2713'
  wrongTick = '\u2717'
  if result:
    print(rightTick, ' Test #', test_case_number, sep='')
  else:
    print(wrongTick, ' Test #', test_case_number, ': Expected ', sep='', end='')
    printLinkedList(tempExpectedHead)
    print(' Your output: ', end='')
    printLinkedList(tempOutputHead)
    print()
  test_case_number += 1

def createLinkedList(arr):
  head = None
  tempHead = head
  for v in arr:
    if head == None:
      head = Node(v)
      tempHead = head
    else:
      head.next = Node(v)
      head = head.next
  return tempHead

if __name__ == "__main__":
  head_1 = createLinkedList([1, 2, 8, 9, 12, 16])
  expected_1 = createLinkedList([1, 8, 2, 9, 16, 12])
  output_1 = reverse(head_1)
  check(expected_1, output_1)

  head_2 = createLinkedList([2, 18, 24, 3, 5, 7, 9, 6, 12])
  expected_2 = createLinkedList([24, 18, 2, 3, 5, 7, 9, 12, 6])
  output_2 = reverse(head_2)
  check(expected_2, output_2)

  # Add your own test cases here
$ py3 !$
py3 reverse_even_subpart_list.py
✓ Test #1
✓ Test #2
```

## 15.4 Facebook practice balanced split (sort practice)

```text
$ cat !$
cat balancedSplit.py
"""
Balanced Split
Given a set of integers (which may include repeated integers), determine if there's a way to split the set into two subsets A and B such that the sum of the integers in both sets is the same, and all of the integers in A are strictly smaller than all of the integers in B.
Note: Strictly smaller denotes that every integer in A must be less than, and not equal to, every integer in B.
Signature
bool balancedSplitExists(int[] arr)
Input
All integers in array are in the range [0, 1,000,000,000].
Output
Return true if such a split is possible, and false otherwise.
Example 1
arr = [1, 5, 7, 1]
output = true
We can split the set into A = {1, 1, 5} and B = {7}.
Example 2
arr = [12, 7, 6, 7, 6]
output = false
We can't split the set into A = {6, 6, 7} and B = {7, 12} since this doesn't satisfy the requirement that all integers in A are smaller than all integers in B.
"""

import math
# Add any extra import statements you may need here


# Add any helper functions you may need here


def balancedSplitExists(arr):
  # Write your code here
  arr.sort()

  total = sum(arr)
  A = set()
  B = set()
  for i in range(len(arr), 0 , -1):
    B.add(arr[i-1])
    bsum = sum(B)
    if bsum == (total -bsum):
      for j in range(i-1):
        A.add(arr[j])
      if arr[i-2] == arr[i-1]:
        return False
      else:
        return True
    elif bsum > (total -bsum):
      return False
  return False












# These are the tests we use to determine if the solution is correct.
# You can add your own at the bottom, but they are otherwise not editable!

def printString(string):
  print('[\"', string, '\"]', sep='', end='')

test_case_number = 1

def check(expected, output):
  global test_case_number
  result = False
  if expected == output:
    result = True
  rightTick = '\u2713'
  wrongTick = '\u2717'
  if result:
    print(rightTick, 'Test #', test_case_number, sep='')
  else:
    print(wrongTick, 'Test #', test_case_number, ': Expected ', sep='', end='')
    printString(expected)
    print(' Your output: ', end='')
    printString(output)
    print()
  test_case_number += 1

if __name__ == "__main__":
  arr_1 = [2, 1, 2, 5]
  expected_1 = True
  output_1 = balancedSplitExists(arr_1)
  check(expected_1, output_1)

  arr_2 = [3, 6, 3, 4, 4]
  expected_2 = False
  output_2 = balancedSplitExists(arr_2)
  check(expected_2, output_2)

  # Add your own test cases here



$ py3 !$
py3 balancedSplit.py
✓Test #1
✓Test #2
```

## 15.5 Facebook practice 1BillionUsersSearch.py (binary search practice)

```text
$ py3 !$
py3 1BillionUsersSearch.py
✓Test #1
✓Test #2
$ cat !$
cat 1BillionUsersSearch.py
"""
| 1 Billion Users
|    We have N different apps with different user growth rates. At a given time t, measured in days, the number of users using an app is g^t (for simplicity we'll allow fractional users), where g is the growth rate for that app. These apps will all be launched at the same time and no user ever uses more than one of the apps.
|    After how many full days will we have 1 billion total users across the N apps?
|    Signature
|    int getBillionUsersDay(float[] growthRates)
|    Input
|    1.0 < growthRate < 2.0 for all growth rates
|    1 <= N <= 1,000
|    Output
|    Return the number of full days it will take before we have a total of 1 billion users across all N apps.
|    Example 1
|    growthRates = [1.5]
|    output = 52
|    Example 2
|    growthRates = [1.1, 1.2, 1.3]
|    output = 79
|    Example 3
|    growthRates = [1.01, 1.02]
|    output = 1047
"""

import math
# Add any extra import statements you may need here


# Add any helper functions you may need here


def getBillionUsersDay(growthRates):
  # Write your code here
  def numusers(growthRates, t):
    nusers = [ pow(gr, t) for gr in growthRates]
    return sum(nusers)

  target = pow(10,9)
  gh = 50
  while numusers(growthRates, gh) < target:
    gh *=2

  gl = 0

  while gl < gh:
    if gl == gh-1:
      return gh
    guess = (gl+gh)//2
    nu = numusers(growthRates, guess)
    if nu == target:
      return guess
    elif nu > target:
      gh = guess
      #gl = gl + (guess-gl)//2
    else:
      gl = gl + (gh-gl)//2
















# These are the tests we use to determine if the solution is correct.
# You can add your own at the bottom, but they are otherwise not editable!

def printInteger(n):
  print('[', n, ']', sep='', end='')

test_case_number = 1

def check(expected, output):
  global test_case_number
  result = False
  if expected == output:
    result = True
  rightTick = '\u2713'
  wrongTick = '\u2717'
  if result:
    print(rightTick, 'Test #', test_case_number, sep='')
  else:
    print(wrongTick, 'Test #', test_case_number, ': Expected ', sep='', end='')
    printInteger(expected)
    print(' Your output: ', end='')
    printInteger(output)
    print()
  test_case_number += 1

if __name__ == "__main__":
  test_1 = [1.1, 1.2, 1.3]
  expected_1 = 79
  output_1 = getBillionUsersDay(test_1)
  check(expected_1, output_1)

  test_2 = [1.01, 1.02]
  expected_2 = 1047
  output_2 = getBillionUsersDay(test_2)
  check(expected_2, output_2)

  # Add your own test cases here
```

## 15.6 Facebook practice encrypted words , simple recursion

```text
$ cat !$
cat simpleEncryptionRecursive.py
"""


Back to questions list
Encrypted Words
You've devised a simple encryption method for alphabetic strings that shuffles the characters in such a way that the resulting string is hard to quickly read, but is easy to convert back into the original string.
When you encrypt a string S, you start with an initially-empty resulting string R and append characters to it as follows:
Append the middle character of S (if S has even length, then we define the middle character as the left-most of the two central characters)
Append the encrypted version of the substring of S that's to the left of the middle character (if non-empty)
Append the encrypted version of the substring of S that's to the right of the middle character (if non-empty)
For example, to encrypt the string "abc", we first take "b", and then append the encrypted version of "a" (which is just "a") and the encrypted version of "c" (which is just "c") to get "bac".
If we encrypt "abcxcba" we'll get "xbacbca". That is, we take "x" and then append the encrypted version "abc" and then append the encrypted version of "cba".
Input
S contains only lower-case alphabetic characters
1 <= |S| <= 10,000
Output
Return string R, the encrypted version of S.
Example 1
S = "abc"
R = "bac"
Example 2
S = "abcd"
R = "bacd"
Example 3
S = "abcxcba"
R = "xbacbca"
Example 4
S = "facebook"
R = "eafcobok"
"""

import math
# Add any extra import statements you may need here


# Add any helper functions you may need here


def findEncryptedWord(s):
  # Write your code here
  if len(s) <=2:
    return s

  if len(s)%2 == 0:
    mid = len(s)//2-1
  else:
    mid = len(s)//2

  return s[mid] + findEncryptedWord(s[:mid]) +  findEncryptedWord(s[mid+1:])













# These are the tests we use to determine if the solution is correct.
# You can add your own at the bottom, but they are otherwise not editable!

def printString(string):
  print('[\"', string, '\"]', sep='', end='')

test_case_number = 1

def check(expected, output):
  global test_case_number
  result = False
  if expected == output:
    result = True
  rightTick = '\u2713'
  wrongTick = '\u2717'
  if result:
    print(rightTick, 'Test #', test_case_number, sep='')
  else:
    print(wrongTick, 'Test #', test_case_number, ': Expected ', sep='', end='')
    printString(expected)
    print(' Your output: ', end='')
    printString(output)
    print()
  test_case_number += 1

if __name__ == "__main__":
  s1 = "abc"
  expected_1 = "bac"
  output_1 = findEncryptedWord(s1)
  check(expected_1, output_1)

  s2 = "abcd"
  expected_2 = "bacd"
  output_2 = findEncryptedWord(s2)
  check(expected_2, output_2)

  # Add your own test cases here


$ py3 !$
py3 simpleEncryptionRecursive.py
✓Test #1
✓Test #2
```

## 15.7 Facebook practice Queue removals

```text
$ cat !$
cat QRemovals.py
"""


Back to questions list
Queue Removals
You're given a list of n integers arr, which represent elements in a queue (in order from front to back). You're also given an integer x, and must perform x iterations of the following 3-step process:
Pop x elements from the front of queue (or, if it contains fewer than x elements, pop all of them)
Of the elements that were popped, find the one with the largest value (if there are multiple such elements, take the one which had been popped the earliest), and remove it
For each one of the remaining elements that were popped (in the order they had been popped), decrement its value by 1 if it's positive (otherwise, if its value is 0, then it's left unchanged), and then push it back onto the queue
Compute a list of x integers output, the ith of which is the 1-based index in the original array of the element which had been removed in step 2 during the ith iteration.
Signature
int[] findPositions(int[] arr, int x)
Input
x is in the range [1, 316].
n is in the range [x, x*x].
Each value arr[i] is in the range [1, x].
Output
Return a list of x integers output, as described above.
Example
n = 6
arr = [1, 2, 2, 3, 4, 5]
x = 5
output = [5, 6, 4, 1, 2]
The initial queue is [1, 2, 2, 3, 4, 5] (from front to back).
In the first iteration, the first 5 elements are popped off the queue, leaving just [5]. Of the popped elements, the largest one is the 4, which was at index 5 in the original array. The remaining elements are then decremented and pushed back onto the queue, whose contents are then [5, 0, 1, 1, 2].
In the second iteration, all 5 elements are popped off the queue. The largest one is the 5, which was at index 6 in the original array. The remaining elements are then decremented (aside from the 0) and pushed back onto the queue, whose contents are then [0, 0, 0, 1].
In the third iteration, all 4 elements are popped off the queue. The largest one is the 1, which had the initial value of 3 at index 4 in the original array. The remaining elements are pushed back onto the queue, whose contents are then [0, 0, 0].
In the fourth iteration, all 3 elements are popped off the queue. Since they all have an equal value, we remove the one that was popped first, which had the initial value of 1 at index 1 in the original array. The remaining elements are pushed backed onto the queue, whose contents are then [0, 0].
In the final iteration, both elements are popped off the queue. We remove the one that was popped first, which had the initial value of 2 at index 2 in the original array.
"""
import math
# Add any extra import statements you may need here


# Add any helper functions you may need here


def findPositions(arr, x):
  # Write your code here
  #print('arr {}, x {}'.format(arr, x))
  from collections import deque
  q = deque()
  for i in range(len(arr)):
    q.append( [arr.pop(0), i] )

  #print('q', q)
  
  ret=[]
  for i in range(x):
      poped = [ q.popleft() for i in range(x) if len(q) > 0 ]
      #print('poped: ', poped)
      mx = poped[0]
      mxi = 0
      for j in range(1, len(poped)):
        if poped[j][0] > mx[0]:
          mx = poped[j]
          mxi = j
      #print('max of poped {}, orig index {}'.format(poped[mxi][0], poped[mxi][1]))
      ret.append(poped[mxi][1]+1)
      poped.pop(mxi)
      for k in range(len(poped)):
        n = poped.pop(0)
        if n[0] > 0:
            n[0]-=1
        q.append(n)
      
  return ret
  

	









# These are the tests we use to determine if the solution is correct.
# You can add your own at the bottom, but they are otherwise not editable!

def printInteger(n):
  print('[', n, ']', sep='', end='')

def printIntegerList(array):
  size = len(array)
  print('[', end='')
  for i in range(size):
    if i != 0:
      print(', ', end='')
    print(array[i], end='')
  print(']', end='')

test_case_number = 1

def check(expected, output):
  global test_case_number
  expected_size = len(expected)
  output_size = len(output)
  result = True
  if expected_size != output_size:
    result = False
  for i in range(min(expected_size, output_size)):
    result &= (output[i] == expected[i])
  rightTick = '\u2713'
  wrongTick = '\u2717'
  if result:
    print(rightTick, 'Test #', test_case_number, sep='')
  else:
    print(wrongTick, 'Test #', test_case_number, ': Expected ', sep='', end='')
    printIntegerList(expected)
    print(' Your output: ', end='')
    printIntegerList(output)
    print()
  test_case_number += 1

if __name__ == "__main__":
  n_1 = 6
  x_1 = 5
  arr_1 = [1, 2, 2, 3, 4, 5]
  expected_1 = [5, 6, 4, 1, 2]
  output_1 = findPositions(arr_1, x_1)
  check(expected_1, output_1)

  n_2 = 13
  x_2 = 4
  arr_2 = [2, 4, 2, 4, 3, 1, 2, 2, 3, 4, 3, 4, 4]
  expected_2 = [2, 5, 10, 13]
  output_2 = findPositions(arr_2, x_2)
  check(expected_2, output_2)


  # Add your own test cases here
$ py3 QRemovals.py 
✓Test #1
✓Test #2


$ py3 QRemovals.py 
arr [1, 2, 2, 3, 4, 5], x 5
q deque([[1, 0], [2, 1], [2, 2], [3, 3], [4, 4], [5, 5]])
poped:  [[1, 0], [2, 1], [2, 2], [3, 3], [4, 4]]
max of poped 4, orig index 4
poped:  [[5, 5], [0, 0], [1, 1], [1, 2], [2, 3]]
max of poped 5, orig index 5
poped:  [[0, 0], [0, 1], [0, 2], [1, 3]]
max of poped 1, orig index 3
poped:  [[0, 0], [0, 1], [0, 2]]
max of poped 0, orig index 0
poped:  [[0, 1], [0, 2]]
max of poped 0, orig index 1
✓Test #1
arr [2, 4, 2, 4, 3, 1, 2, 2, 3, 4, 3, 4, 4], x 4
q deque([[2, 0], [4, 1], [2, 2], [4, 3], [3, 4], [1, 5], [2, 6], [2, 7], [3, 8], [4, 9], [3, 10], [4, 11], [4, 12]])
poped:  [[2, 0], [4, 1], [2, 2], [4, 3]]
max of poped 4, orig index 1
poped:  [[3, 4], [1, 5], [2, 6], [2, 7]]
max of poped 3, orig index 4
poped:  [[3, 8], [4, 9], [3, 10], [4, 11]]
max of poped 4, orig index 9
poped:  [[4, 12], [1, 0], [1, 2], [3, 3]]
max of poped 4, orig index 12
✓Test #2
```

## 15.8 Seating Arrangements

```text
$ cat seatingArrangments.py 
"""
Seating Arrangements
There are n guests attending a dinner party, numbered from 1 to n. The ith guest has a height of arr[i] inches.
The guests will sit down at a circular table which has n seats, numbered from 1 to n in clockwise order around the table. As the host, you will choose how to arrange the guests, one per seat. Note that there are n! possible permutations of seat assignments.
Once the guests have sat down, the awkwardness between a pair of guests sitting in adjacent seats is defined as the absolute difference between their two heights. Note that, because the table is circular, seats 1 and n are considered to be adjacent to one another, and that there are therefore n pairs of adjacent guests.
The overall awkwardness of the seating arrangement is then defined as the maximum awkwardness of any pair of adjacent guests. Determine the minimum possible overall awkwardness of any seating arrangement.
Signature
int minOverallAwkwardness(int[] arr)
Input
n is in the range [3, 1000].
Each height arr[i] is in the range [1, 1000].
Output
Return the minimum achievable overall awkwardness of any seating arrangement.
Example
n = 4
arr = [5, 10, 6, 8]
output = 4
If the guests sit down in the permutation [3, 1, 4, 2] in clockwise order around the table (having heights [6, 5, 8, 10], in that order), then the four awkwardnesses between pairs of adjacent guests will be |6-5| = 1, |5-8| = 3, |8-10| = 2, and |10-6| = 4, yielding an overall awkwardness of 4. It's impossible to achieve a smaller overall awkwardness.
"""
import math




def minOverallAwkwardness(arr):
    import sys
    def hsort(lst):
        import heapq
        h = []
        for elem in arr:
            heapq.heappush(h, elem) 
        return [ heapq.heappop(h) for x in  arr]

    #arr.sort() #ToDo, def heapsort  so as not to make it too easy
    arr = hsort(arr)
    
    #idea, sort so that height diff across adjacent guests is minimal.
    #problem are edges first and last elem will have the biggest awkwardness 
    # so we need to swap the first guest with another towards the middle so
    # that. the heigh diff between it and last and the first vs the next to the
    # right of the middle are miminal.
    # e.g. g0,g1,..,gj,gj+1,...gn  ascending. so that max(diff(gn,g0),
    # diff(gj,gj+1) ) is minimal
    #Try swap 0 and  jth elem. and calculate min max awkwardness
    j=1
    gmx=sys.maxsize
    while j<len(arr)-1: 
        arr[0], arr[j] = arr[j], arr[0]
        mx = max( abs(arr[len(arr)-1]-arr[0]), abs(arr[j+1]- arr[j]))
        #mx = 0
        #for i in range(len(arr)):
        #  j= (i+1)%(len(arr))
        #  if abs(arr[i]-arr[j]) > mx:
        #    mx= abs(arr[i]-arr[j])
        gmx = min( mx, gmx)
        arr[0], arr[j] = arr[j], arr[0]
        j+=1
    return gmx











# These are the tests we use to determine if the solution is correct.
# You can add your own at the bottom, but they are otherwise not editable!

def printInteger(n):
  print('[', n, ']', sep='', end='')

test_case_number = 1

def check(expected, output):
  global test_case_number
  result = False
  if expected == output:
    result = True
  rightTick = '\u2713'
  wrongTick = '\u2717'
  if result:
    print(rightTick, 'Test #', test_case_number, sep='')
  else:
    print(wrongTick, 'Test #', test_case_number, ': Expected ', sep='', end='')
    printInteger(expected)
    print(' Your output: ', end='')
    printInteger(output)
    print()
  test_case_number += 1

if __name__ == "__main__":
  arr_1 = [5, 10, 6, 8]
  expected_1 = 4
  output_1 = minOverallAwkwardness(arr_1)
  check(expected_1, output_1)

  arr_2 = [1, 2, 5, 3, 7]
  expected_2 = 4
  output_2 = minOverallAwkwardness(arr_2)
  check(expected_2, output_2)

$ py3 seatingArrangments.py 
✓Test #1
✓Test #2
```

## 15.9 facebook interview 29/07/2020

### 15.9.1 Write is sorted lexicographically using alphabet

```text
words[ w1,…,wn]
alpah[‘a,’b’, ‘c’]

Write is sorted lexicographically using alphabet


def smaller (w1,w2, charToindexDict):
	for I in range(min(len(w1), len(w2)):
		if charToindexDict[w1[I]] > charToindexDict[w2[I]]:
			return False 

	return True

Def isSorted(words, alpha):

	#build charToindexDict
	for I,c in enumerate(alpha):
		charToindexDict[c] = I

	for j in range(len(words)-1):
		if not smaller(words[j], words[j+1]):
			return False

	return True


complications. 
It is given that words are Lexi ordered. 
Output a possible alphabet.

Solution. Topological ordering.
Build directed graph chars to bigger chars 

G = defaultdict(list)
Def buildGraph(w1, w2, G): 
	//we know that w1[I] <= w2[I] 
	G[w1[I]].append[w2[I]

Then run DFS to topological sort.

    15.10
```
