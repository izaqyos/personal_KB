---
type: reference
title: Partition List
description: LeetCode Partition List solution in Python with linked list helper and test inputs.
tags: [leetcode, python, data-structures, algorithms, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "leetcode-kb#3"
---

# Partition List

[↑ leetcode-kb](/kb-leetcode/README.md)

```text
Given the head of a linked list and a value x, partition it such that all nodes less than x come before nodes greater than or equal to x.
You should preserve the original relative order of the nodes in each of the two partitions.
 
Example 1:

Input: head = [1,4,3,2,5,2], x = 3
Output: [1,2,2,4,3,5]
Example 2:
Input: head = [2,1], x = 2
Output: [1,2]
 
Constraints:
	•	The number of nodes in the list is in the range [0, 200].
	•	-100 <= Node.val <= 100
	•	-200 <= x <= 200



Code:
$ cat partitionList.py  | pbcopy 
# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def partition(self, head, x):
        """
        use 2 aux lists. smaller and bigger. one pass build them. then connect smaller tail to node with x and node with x.next to bigger
        mem: o(n)
        runtime: o(n)
        """
        s, st, g, gt, prev= None, None, None, None, None #smaller head, smaller tail, greater head, greater tail, previous
        runner = head
        while runner:
            #print('at {}'.format(runner.val))
            if runner.val < x:
                if st:
                    st.next = runner
                    st = st.next
                else:
                    s = runner
                    st = s
                if prev and prev.val>=x: #if prev belongs to greater list, break the link, its ok b/c it would be greater tail
                    prev.next = None
            else:
                if gt:
                    gt.next = runner
                    gt = gt.next
                else:
                    g = runner
                    gt = g
                if prev and prev.val<x: #if prev belongs to smaller list, break the link, its ok b/c it would be smaller tail
                    prev.next = None
            prev = runner
            runner = runner.next
            #printList(s)
            #printList(g)

        if st:
            st.next = g
            return s
        else:
            return g

def makeList(elems):
    head = None
    prev = None
    for elem in elems:
        if prev:
            prev.next = ListNode(elem)
            prev = prev.next
        else:
            head = ListNode(elem)
            prev = head
    return head

def printList(head):
    runner = head
    while runner:
        print('{}->'.format(runner.val), end='')
        runner = runner.next
    print('||')
    
def areListsEqual(l1, l2):
    r1,r2 = l1, l2
    while r2!=None and r1!=None:
        if r1.val != r2.val:
            return False
        r1 = r1.next
        r2 = r2.next

    if r2 == None and r1 == None:
        return True
    else:
        return False

def test():
    # inputs array of list,x tuple
    inputs = [
            ([], 3),
            ([1,4,3,2,5,2], 6),
            ([1,4,3,2,5,2], 0),
            ([1,4,3,2,5,2], 3),
            ([1,4,3,2,5,3,3,2,7,1,0], 3),
            ([2,1] ,2),
            ([1] ,0),
            ]
    expected = [
                [],
                [1,4,3,2,5,2],
                [1,4,3,2,5,2],
                [1,2,2,4,3,5],
                [1,2,2,1,0,4,3,5,3,3,7],
                [1,2],
                [1],
            ]

    sol = Solution()
    for inp,exp in zip(inputs, expected):
        lst = makeList(inp[0])
        expected = makeList(exp)
        print('x={}, list='.format(inp[1]), end='')
        printList(lst)
        ans = sol.partition(lst, inp[1])
        print('partition list=', end='')
        printList(ans)
        printList(expected)
        assert(areListsEqual(expected, ans))

if __name__ == "__main__":
    test()


Test:

$ py3 partitionList.py 
x=3, list=||
partition list=||
||
x=6, list=1->4->3->2->5->2->||
partition list=1->4->3->2->5->2->||
1->4->3->2->5->2->||
x=0, list=1->4->3->2->5->2->||
partition list=1->4->3->2->5->2->||
1->4->3->2->5->2->||
x=3, list=1->4->3->2->5->2->||
partition list=1->2->2->4->3->5->||
1->2->2->4->3->5->||
x=3, list=1->4->3->2->5->3->3->2->7->1->0->||
partition list=1->2->2->1->0->4->3->5->3->3->7->||
1->2->2->1->0->4->3->5->3->3->7->||
x=2, list=2->1->||
partition list=1->2->||
1->2->||
x=0, list=1->||
partition list=1->||
1->||
```

## See Also

<!-- backlinks:start -->
### Backlinks

* [Fast / Slow Pointers (Floyd's Tortoise and Hare)](/algorithms/patterns/fast-slow-pointers.md)
* [Linked Lists](/data-structures/linear/linked-lists.md)
<!-- backlinks:end -->
