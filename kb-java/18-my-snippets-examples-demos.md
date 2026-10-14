---
type: reference
title: "My snippets, examples, demos"
description: Section 12 of the legacy java-kb notes.
tags: [kb-java]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "java-kb#12"
---

# My snippets, examples, demos

[↑ java-kb](/kb-java/README.md)

## 12.1 Performance tests

### 12.1.1 HashMap vs array contains

```text
code:
$ cat !$ | pbcopy 
cat arrayVsHashMapPerfTest.java | pbcopy 

import java.util.HashMap;
import java.util.concurrent.TimeUnit;

public class arrayVsHashMapPerfTest {

    public static void main(String[] args) {
        // Test which is more efficient for get key value
        // when there are multiple keys and only two values
        // #keys<=10
        HashMap<String, String> kvMap = new HashMap<String, String>();
        kvMap.put("k1", "v1");
        kvMap.put("k2", "v2");
        kvMap.put("k3", "v1");
        kvMap.put("k4", "v2");
        kvMap.put("k5", "v1");
        kvMap.put("k6", "v2");
        kvMap.put("k7", "v1");
        kvMap.put("k8", "v2");
        kvMap.put("k9", "v1");
        kvMap.put("k10", "v2");
        kvMap.put("k11", "v1");

        String[] val1Arr = {"k1", "k3", "k5", "k7", "k9", "k11"  };
        String[] val2Arr = {"k2", "k4", "k6", "k8", "k10"};

        long startTime = System.nanoTime();
        final int times = 100000000;
        System.out.println("Test "+times+" times test get map value");
        for (int i = 0; i < times; i++) {
            kvMap.containsKey("k1");
        }
        long endTime = System.nanoTime();

        long timeElapsed = endTime - startTime;
        System.out.println("HashMap Contains Run time "+timeElapsed/1000000000+" seconds, "+timeElapsed/1000000+" milliseconds");

        startTime = System.nanoTime();
        System.out.println("Test "+times+" times test get array value");
        boolean found = false;
        for (int i = 0; i < times; i++) {
            for (int j = 0; j < val1Arr.length; j++) {
                if (val1Arr[j].equals("k7")) {
                    found = true;
                }
            }
        }
        endTime = System.nanoTime();

        timeElapsed = endTime - startTime;
        System.out.println("Array Contains Run time "+timeElapsed/1000000000+" seconds, "+timeElapsed/1000000+" milliseconds");

    }
}

test:
$ javac arrayVsHashMapPerfTest.java 
$ java arrayVsHashMapPerfTest
Test 100000000 times test get map value
HashMap Contains Run time 0 seconds, 210 milliseconds
Test 100000000 times test get array value
Array Contains Run time 0 seconds, 522 milliseconds

        12.1.2

    12.2
```
