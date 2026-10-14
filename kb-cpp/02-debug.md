---
type: reference
title: Debug
description: "Debugging C++: generating core dumps, and gdb usage including catching exceptions."
tags: [cpp, debugging, gdb, linux, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-cpp#2"
---

# Debug

[↑ kb-cpp](/kb-cpp/README.md)

## 2.1 Generate core dumps

```text
If you want to debug why your C/C++ application segfaults once in a while (daemon that segfaults once in few days) under Linux the obvious way is to tell your program to create core dump files on segfault. It took me few hours to make my program coredump - by default under Linux setuid programs do not dump core. To force a program to do so, you should execute this after setuid:
prctl(PR_SET_DUMPABLE, 1);
and include:
#include <sys/prctl.h>
Of course you should also enable core dump with setrlimit:
setrlimit(RLIMIT_CORE, &limit);
To tune where your core dumps are stored, search google for core_pattern or /proc/sys/kernel/core_pattern, I donÂ¿t feel like copy-pasting.
Hope this helps somebody.
```

## 2.2 gdb

### 2.2.1 catch exceptions in debugger instead of in code

```text
			do 
			> catch throw
```

### 2.2.2 My examples

#### 2.2.2.1 Debug optimised executables

```text
- Check CPU, then google for it, ex: "procedure calling convention Intel Xeon CPU"
Check manual for which registers contain what values 
ex, rdi, rsi, rdx, rsx hold 1st-4th arguments

- Check registers 
(gdb) info registers 
rax            0x0      0
rbx            0x7fff7c207d18   140735275891992
rcx            0xadf1a30        182393392
rdx            0x1      1
rsi            0xadf1b40        182393664
rdi            0xade1288        182325896
rbp            0x0      0x0
rsp            0x7fff7c207c98   0x7fff7c207c98
r8             0xadf1a40        182393408
r9             0x3      3
r10            0x0      0
r11            0x2b8e84936830   47891109603376
r12            0x0      0
r13            0x2b8e84e13d40   47891114704192
r14            0xade1700        182327040
r15            0xadf1740        182392640
rip            0x2b8e84936830   0x2b8e84936830 <LWNetDnsGetAddressesForDnsQueryList>
eflags         0x202    [ IF ]
cs             0x33     51
ss             0x2b     43
ds             0x0      0
es             0x0      0
fs             0x0      0
gs             0x0      0
fctrl          0x37f    895
fstat          0x0      0
ftag           0xffff   65535
fiseg          0x0      0
fioff          0x0      0
foseg          0x0      0
fooff          0x0      0
fop            0x0      0
mxcsr          0x1f80   [ IM DM ZM OM UM PM ]
(gdb)  p ((PLW_DLINKED_LIST)  0xade1288)->pNext
```

### 2.2.3 how to generate gcc debug symbol outside the build target

#### 2.2.3.1 http://stackoverflow.com/questions/866721/how-to-generate-gcc-debug-symbol-outside-the-build-target

```text
 Q: know I can generate debug symbol using -g option. However the symbol is embeded in the target file. Could gcc generate debug symbol outside the result executable/library? Like .pdb file of windows VC++ compiler did.

 A: You need to use objcopy to separate the debug information:

objcopy --only-keep-debug "${tostripfile}" "${debugdir}/${debugfile}"
strip --strip-debug --strip-unneeded "${tostripfile}"
objcopy --add-gnu-debuglink="${debugdir}/${debugfile}" "${tostripfile}"
I use the bash script below to separate the debug information into files with a .debug extension in a .debug directory. This way I can tar the libraries and executables in one tar file and the .debug directories in another. If I want to add the debug info later on I simply extract the debug tar file and voila I have symbolic debug information.

This is the bash script:

#!/bin/bash

scriptdir=`dirname ${0}`
scriptdir=`(cd ${scriptdir}; pwd)`
scriptname=`basename ${0}`

set -e

function errorexit()
{
  errorcode=${1}
  shift
  echo $@
  exit ${errorcode}
}

function usage()
{
  echo "USAGE ${scriptname} <tostrip>"
}

tostripdir=`dirname "$1"`
tostripfile=`basename "$1"`


if [ -z ${tostripfile} ] ; then
  usage
  errorexit 0 "tostrip must be specified"
fi

cd "${tostripdir}"

debugdir=.debug
debugfile="${tostripfile}.debug"

if [ ! -d "${debugdir}" ] ; then
  echo "creating dir ${tostripdir}/${debugdir}"
  mkdir -p "${debugdir}"
fi
echo "stripping ${tostripfile}, putting debug info into ${debugfile}"
objcopy --only-keep-debug "${tostripfile}" "${debugdir}/${debugfile}"
strip --strip-debug --strip-unneeded "${tostripfile}"
objcopy --add-gnu-debuglink="${debugdir}/${debugfile}" "${tostripfile}"
chmod -x "${debugdir}/${debugfile}"

Just add the .debug directory with the .debug files to your production box and GDB should pick them up. After the debug session you can remove them again.

A: Compile with debug information:

gcc -g -o main main.c
Separate the debug information:

objcopy --only-keep-debug main main.debug
or

cp main main.debug
strip --only-keep-debug main.debug
Strip debug information from origin file:

objcopy --strip-debug main
or

strip --strip-debug --strip-unneeded main
debug by debuglink mode:

objcopy --add-gnu-debuglink main.debug main
gdb main
You can also use exec file and symbol file separatly:

gdb -s main.debug -e main
or

gdb
(gdb) exec-file main
(gdb) symbol-file main.debug
For details:

(gdb) help exec-file
(gdb) help symbol-file
Ref:
https://sourceware.org/gdb/onlinedocs/gdb/Files.html#Files https://sourceware.org/gdb/onlinedocs/gdb/Separate-Debug-Files.html

			2.2.3.2

		2.2.4
```
