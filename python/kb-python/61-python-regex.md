---
type: reference
title: python regex
description: "Legacy Python KB section: python regex (tags: python regex tutorial, simple examples)"
tags: [regex, python, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "python/KB_python#55"
---

# tags: python regex

[↑ KB_python](/python/kb-python/README.md)

## 55.1 tags: python regex tutorial

### 55.1.1 simple examples

#### 55.1.1.1 Extract number from string

```text
import sys
import re

def main():
    #print(sys.argv)
    arg1 = sys.argv[1]
    if arg1:
        print('arg1 '+arg1)
        match = re.match("\D*(\d+)",arg1)
        if match: 
            takt=int(match.group(1))
            print(f"extracted takt {takt}")
        else:
            print('could not detect takt number. ex: Takt02')
    else:
        print('Please provide takt name')

if __name__ == '__main__':
    main()

$ py3  roster.py takt01
arg1 takt01
extracted takt 1
            55.1.1.2

        55.1.2

    55.2
```
