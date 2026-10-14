---
type: reference
title: Terminal
description: Section 5 of the legacy kb-mac notes.
tags: [kb-mac]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-mac#5"
---

# Terminal

[↑ kb-mac](/kb-mac/README.md)

## 5.1 banner

### 5.1.1 Print clock

```text
$ for i in $(seq 360); do  clear ; date +" %H.%M.%S" | xargs banner ; sleep 1; done

		5.1.2
```

## 5.2 find

### 5.2.1 find + xargs

#### 5.2.1.1 xargs: unterminated quote

```text
- problem:
$ find . -type f | xargs grep -is 'CSCun25815'
xargs: unterminated quote
$ find . -type f | xargs grep -s 'CSCun25815'
xargs: unterminated quote

- reason: one of the files contains a quote.

- fix:
either unquote, eg:
$ find . -type f -print0 | xargs -0 grep -is 'CSCun25815'

or, remove offending file. eg:
\find . | grep \' 

		5.2.2
```

## 5.3 rpm2cpio

### 5.3.1 install

```text
Press Command+Space and type Terminal and press enter/return key.
Run in Terminal app:
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" < /dev/null 2> /dev/null
and press enter/return key. Wait for the command to finish.
Run:
brew install rpm2cpio
```

### 5.3.2 Extract RPM

```text
$ rpm2cpio.pl  oem17-open-7.1.1-0.x86_64.rpm  | cpio -i -d
108170 blocks
$ ls
etc				lib				lib64				oem17-open-7.1.1-0.x86_64.rpm	opt				var

		5.3.3
	5.4
```
