---
type: reference
title: print in order
description: LeetCode Print in Order concurrency problem with solution notes.
tags: [leetcode, concurrency, multithreading, cpp, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "leetcode-kb#1"
---

# print in order

[↑ leetcode-kb](/kb-leetcode/README.md)

```text
Print in order

https://leetcode.com/problems/print-in-order/submissions/


Suppose we have a class:
public class Foo {
  public void first() { print("first"); }
  public void second() { print("second"); }
  public void third() { print("third"); }
}
The same instance of Foo will be passed to three different threads. Thread A will call first(), thread B will call second(), and thread C will call third(). Design a mechanism and modify the program to ensure that second() is executed after first(), and third() is executed after second().
 
Example 1:
Input: [1,2,3]
Output: "firstsecondthird"
Explanation: There are three threads being fired asynchronously. The input [1,2,3] means thread A calls first(), thread B calls second(), and thread C calls third(). "firstsecondthird" is the correct output.
Example 2:
Input: [1,3,2]
Output: "firstsecondthird"
Explanation: The input [1,3,2] means thread A calls first(), thread B calls third(), and thread C calls second(). "firstsecondthird" is the correct output.
 
Note:
We do not know how the threads will be scheduled in the operating system, even though the numbers in the input seems to imply the ordering. The input format you see is mainly to ensure our tests' comprehensiveness.

￼


Solution using cond_var
/Users/<user>/work/code/interviewQs/leetcode/concurrency
class Foo {
public:
    Foo() {
      state = 0;
    }

    void  first(function<void()> printFirst) {
        
        
        // printFirst() outputs "first". Do not change or remove this line.
        thread::id tid = this_thread::get_id();
        cout<<"First thread, id="<<tid;
        printFirst();
        state = 1;
        cond.notify_all();
    }

    void   second(function<void()> printSecond) {
        unique_lock<mutex> lock(mtx);
        //while (state !=1 ) cond.wait(lock); //c way
        cond.wait(lock, [this] {return this->state == 1;});
        // printSecond() outputs "second". Do not change or remove this line.
        thread::id tid = this_thread::get_id();
        cout<<"Seconde thread, id="<<tid;
        printSecond();
        state = 2; 
        cond.notify_all();
    }

    void  third(function<void()> printThird) {
        unique_lock<mutex> lock(mtx);
        // while (state !=2 ) cond.wait(lock); 
        cond.wait(lock, [this] {return this->state == 2;});
        
        // printThird() outputs "third". Do not change or remove this line.
        thread::id tid = this_thread::get_id();
        cout<<"Third thread, id="<<tid;
        printThird();
        state = 0;
    }

    private:
       unsigned int state;
       mutex mtx;
       condition_variable cond;
};
```

## See Also

<!-- backlinks:start -->
### Backlinks

* [Thread programming concepts (AIX)](/CPP/threads-cpp.md)
<!-- backlinks:end -->
