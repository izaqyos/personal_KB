---
type: reference
title: My examples
description: Section 29 of the legacy unix-kb notes.
tags: [kb-unix]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "unix-kb#29"
---

# My examples

[↑ unix-kb](/kb-unix/README.md)

## 29.1 gather FD usage info on customer machine

```text
cd /proc 
while true ; echo "checking for FDs, time is: "; date; do for proc in `ls  | grep '^[0-9]\+'`; do echo checking process $proc ; echo `ps -e | grep $proc | grep -v grep | awk '{print $4}'` using `ls -l ./$proc/fd/ | wc -l` fds ; echo --- ; done ; sleep 900 ; done   > /tmp/fds_report &

It will gather the info every 15 minutes.
Output ex:
"
checking for FDs, time is: 
Thu Feb 16 16:45:26 IST 2012

---
checking process 245
aio/1 using 1 fds
---
checking process 2497
syslogd using 12 fds
---
checking process 2501
klogd using 3 fds
---
checking process 2510
debugd using 57 fds 

"________

To stop it do
jobs 
kill %[job id] 
```

## 29.2 Count all lines of code in whole project.

```text
- C++ 
$ find . -name *.h -o -name *.cpp | xargs wc -l
 161739 total

- C and C++
$ find . -name *.h -o -name *.cpp -o -name *.c | xargs wc -l
478781 total

- java
$ find . -name *.java | xargs wc -l
  37527 total

	29.3
```
