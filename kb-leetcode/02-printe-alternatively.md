---
type: reference
title: Printe alternatively
description: Section 2 of the legacy leetcode-kb notes.
tags: [kb-leetcode]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "leetcode-kb#2"
---

# Printe alternatively

[↑ leetcode-kb](/kb-leetcode/README.md)

```text
solution w/ semaphores
#include <semaphore.h>

class FooBar
{
private:
    int n;

public:
    FooBar(int n)
    {
        this->n = n;
        sem_init(&sema1, 0, 0);
        sem_init(&sema2, 0, 1);
    }

    void foo(function<void()> printFoo)
    {

        for (int i = 0; i < n; i++)
        {

            sem_wait(&sema2);
            printFoo();
            sem_post(&sema1);
        }
    }

    void bar(function<void()> printBar)
    {
        for (int i = 0; i < n; i++)
        {
            sem_wait(&sema1);
        // printBar() outputs "bar". Do not change or remove this line.
            printBar();
            sem_post(&sema2);
        }
    }

private:
    sem_t sema1;
    sem_t sema2;
};




￼
```
