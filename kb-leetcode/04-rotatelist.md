---
type: reference
title: rotateList
description: Section 4 of the legacy leetcode-kb notes.
tags: [kb-leetcode]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "leetcode-kb#4"
---

# rotateList

[↑ leetcode-kb](/kb-leetcode/README.md)

```text
/Users/<user>/Library/Messages/Attachments/46/06/B2D46972-E457-494B-9F62-255C8040AA95/LeetCode\ Explore\ Problems.jpeg rotateList java

Java
￼
$ javac RotateList.java  && java RotateList
RotateList tester initialized
Manually created list: 1->2|||
created list: 1->2->3->4|||
Rotating List= [], by 0
empty or single element list. return head
|||
----------------------------------------------------------------------------------------------------
Rotating List= [0], by 2
empty or single element list. return head
0|||
----------------------------------------------------------------------------------------------------
Rotating List= [0, 1], by 1
1->0|||
----------------------------------------------------------------------------------------------------
Rotating List= [0, 1, 2], by 3
0->1->2|||
----------------------------------------------------------------------------------------------------
Rotating List= [0, 1, 2, 3], by 23
1->2->3->0|||
----------------------------------------------------------------------------------------------------

$ cat RotateList.java
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.lang.*;

class ListNode
{
        //private int val;
        //private ListNode next = null;

        //public ListNode getNext()
        //{
        //        return this.next ;
        //}

        //public void setNext(ListNode next)
        //{
        //        this.next = next;
        //}

        public  int val;
        public ListNode next;

        public ListNode(int val)
        {
                this.val = val;
                next = null;
        }

        public String toString()
        {
                return String.valueOf(val);
        }

}

class LinkedList
{
        private ListNode head = null;
        private int size = 0;
        private static final boolean bDebug = false;

        public String toString()
        {
                ListNode ptmp = head;
                String sRet="";
                while (ptmp != null)
                {
                        sRet+= ptmp.toString();
                        if (ptmp.next != null) sRet+="->";
                        ptmp = ptmp.next;
                }
                sRet+="|||";

                return sRet;
        }

        public static void printListByHead(ListNode head)
        {
                ListNode ptmp = head;
                String sRet="";
                while (ptmp != null)
                {
                        sRet+= ptmp.toString();
                        if (ptmp.next != null) sRet+="->";
                        ptmp = ptmp.next;
                }
                sRet+="|||";

                System.out.println(sRet);
        }

        public LinkedList(ListNode head)
        {
                this.head = head;
                while (head.next != null) this.size++;
        }

        public LinkedList(ArrayList<Integer> arrL)
        {
                if (bDebug) System.out.println("LinkedList CTOR called");
                ListNode tail = null;
                for (int val : arrL)
                {
                        ListNode lstNode = new ListNode(val);
                        if (head == null)
                        {
                                if (bDebug) System.out.println("LinkedList, add head "+val);
                                head = lstNode;
                                tail = head ;
                        }
                        else
                        {
                                if (bDebug) System.out.println("LinkedList, add node "+val);
                                tail.next=lstNode;
                                tail = lstNode;
                        }
                }
                size = arrL.size();
                if (this.bDebug) System.out.printf("LinkedList CTOR complete. size=%d%n", size);
        }

        public int getSize(){
                return size;
        }

        public ListNode getHead(){
                return head;
        }
}

/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
        boolean bDebug = false;
        public ListNode rotateRight(ListNode head, int k) {
                if (bDebug) System.out.println("rotateRight() called") ;
                if (head == null || (head.next == null) || (k < 1) )
                {
                        System.out.println("empty or single element list. return head") ;
                        return head;
                }

                if (bDebug)
                {
                        System.out.printf("Rotating list: %s, by %d%n",head,k);
                }

                //invariant.  runner points to last scanned node. size is list size (we know its >= 1)
                ListNode runner = head;
                ListNode tail = runner;
                int size = 1;
                while (runner.next != null)
                {
                        size++;
                        runner = runner.next;
                }

                k%=size;
                if (k == 0) return  head;

                tail = runner;
                if (bDebug) System.out.printf("input list size is %d%n",size);

                runner = head;
                for (int i = 0; i < size -k -1; i++) {
                        runner = runner.next;
                }

                tail.next=head;
                head = runner.next;
                runner.next=null;
                return head;
        }
}

public class RotateList
{
        public static void main (String[] args)
        {
                System.out.println("RotateList tester initialized");
                ListNode node1 = new ListNode(1);
                ListNode node2 = new ListNode(2);
                node1.next=node2;
                System.out.println("Manually created list: "+node1+"->"+node2+"|||");

                //LinkedList llist = new LinkedList(new ArrayList<>(1,2,3,4));
                ArrayList<Integer> nums  = new ArrayList<>();
                nums.addAll(Arrays.asList(1,2,3,4));

                LinkedList llist = new LinkedList(nums) ;
                System.out.println("created list: "+llist);

                List<Integer> emptyList = new ArrayList<>();
                List<Integer> ListJustZero = IntStream.range(0,1).boxed().collect(Collectors.toList()) ;
                List<Integer> ListZeroToOne = IntStream.range(0,2).boxed().collect(Collectors.toList()) ;
                List<Integer> ListZeroToTwo = IntStream.range(0,3).boxed().collect(Collectors.toList()) ;
                List<Integer> ListZeroToThree = IntStream.range(0,4).boxed().collect(Collectors.toList()) ;
                List<List<Integer>> ListOfRanges= new ArrayList<>();
                ListOfRanges.add(emptyList);
                ListOfRanges.add(ListJustZero);
                ListOfRanges.add(ListZeroToOne);
                ListOfRanges.add(ListZeroToTwo);
                ListOfRanges.add(ListZeroToThree);

                List<Integer> ks = Arrays.asList(0,2,1,3,23);
                int k = 0;
                List<LinkedList> listOfLinkedLists = new ArrayList<LinkedList>();

                Solution sol = new Solution();
                for (List<Integer> lst : ListOfRanges){
                        System.out.println ("Rotating List= "+lst+", by "+Integer.toString(ks.get(k)));
                        listOfLinkedLists.add( new LinkedList((ArrayList<Integer>) ListOfRanges.get(k))) ;
                        ListNode rList = sol.rotateRight( listOfLinkedLists.get(k).getHead(), ks.get(k));
                        LinkedList.printListByHead(rList);
                        k++;
                        System.out.println ("----------------------------------------------------------------------------------------------------");
                }
        }
}

5.Is valid number
Is valid number ￼
Tests:

$ ./isValidNumber.py
-. is a  invalid  number
-.3e6 is a  valid  number
.e1 is a  invalid  number
0 is a  valid  number
```

## 0.1 is a valid number

```text
abc is a  invalid  number
1 a is a  invalid  number
2e10 is a  valid  number
 -90e3    is a  valid  number
 1e is a  invalid  number
e3 is a  invalid  number
 6e-1 is a  valid  number
 99e2.5  is a  invalid  number
53.5e93 is a  valid  number
 --6  is a  invalid  number
-+3 is a  invalid  number
95a54e53 is a  invalid  number
. is a  invalid  number
.- is a  invalid  number
++4 is a  invalid  number
  is a  invalid  number
.5 is a  valid  number
```
