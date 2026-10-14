---
type: reference
title: riddles
description: Section 35 of the legacy KB_python notes.
tags: [kb-python]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "python/KB_python#35"
---

# riddles

[↑ KB_python](/python/kb-python/README.md)

## 35.1 http://www.pythonchallenge.com/

### 35.1.1 2^34

```text
>>> 2**34
17179869184L
```

### 35.1.2 translation

```text
All letters +2. a->c, b->d etc

see 36.1.1.1    

next: http://www.pythonchallenge.com/pc/def/ocr.html

The picture and the hint imply that the encryption was done by replacing each letter by the the letter two places after it.


First, we load the text and create a translation table

>>> import string
>>> text = """g fmnc wms bgblr rpylqjyrc gr zw fylb. rfyrq ufyr
... amknsrcpq ypc dmp. bmgle gr gl zw fylb gq glcddgagclr ylb rfyr'q
 ... ufw rfgq rcvr gq qm jmle. sqgle qrpgle.kyicrpylq() gq pcamkkclbcb.
... lmu ynnjw ml rfc spj."""
>>> table = string.maketrans(
...   string.ascii_lowercase,
...   string.ascii_lowercase[2:]+string.ascii_lowercase[:2])

Now we apply the translation table on the string:

>>> string.translate(text,table) 
"i hope you didnt translate it by hand. thats what computers are for. 
doing it in by hand is inefficient and that's why this text is so long. 
using string.maketrans() is recommended. now apply on the url."

Alternatively, just use the translate on the "text" variable:

>>> text.translate(table)
"i hope you didnt translate it by hand. thats what computers are for. 
doing it in by hand is inefficient and that's why this text is so long. 
using string.maketrans() is recommended. now apply on the url."

scholi: Solved without translate

s="g fmnc wms bgblr rpylqjyrc gr zw fylb. rfyrq ufyr amknsrcpq ypc dmp. bmgle gr gl zw fylb gq glcddgagclr ylb rfyr'q ufw rfgq rcvr gq qm jmle. sqgle qrpgle.kyicrpylq() gq pcamkkclbcb.  lmu ynnjw ml rfc spj."
o=""
for x in s:
	if ord(x)>=ord('a') and ord(x)<=ord('z'):
		o+=chr((ord(x)+2-ord('a'))%26+ord('a'))
	else:
		o+=x
print o

The hint suggests to change the URL from map.html to ocr.jvon, but since there is no such thing as a .jvon file, try ocr.html.

Similar to above but with some of 2.5's nested ternary operators

for x in s:
    print  chr(ord(x) if ord(x)+2 < ord('a') else  ord(x)+2 if ord(x)+2 < ord('z') else ord(x)-24 ),

Foobat 09:00, 18 Jan 2008 (PST)


Additional:

If you are living in a *nix shell, this will do it in one shot.

$ curl http://www.pythonchallenge.com/pc/def/map.html | tr a-z c-za-b

		35.1.3
```

## 35.2 Find which digit is represented by which letter so that following is true:

```text
send + more = money


	35.3
```
