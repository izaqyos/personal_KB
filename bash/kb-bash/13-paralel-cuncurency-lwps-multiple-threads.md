---
type: reference
title: "Paralel, Cuncurency, LWPs, multiple threads"
description: "Bash parallelism and concurrency: waiting for background processes with a wait script."
tags: [bash, concurrency, multithreading, legacy, examples]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "bash/KB_bash#13"
---

# Paralel, Cuncurency, LWPs, multiple threads

[↑ KB_bash](/bash/kb-bash/README.md)

## 13.1 Wait for Background Process to complete

```text
$ ./wait.sh 
Thu Feb 10 15:59:50 CST 2005
Thu Feb 10 16:00:00 CST 2005
hello
$ cat wait.sh
date
sleep 10 &
wait $!
date
echo "hello"
$
```

### 13.1.1 Run multiple processes and wait for them to complete

```text
SingleTest(){

        (( limit = 5 ))
        (( iter = 0 ))

        while ((iter < limit ))
        do
                echo "iteration ${iter}"
                (( iter += 1 ))
        done
}

SingleTest &
SingleTest &
SingleTest &
SingleTest &
SingleTest &
SingleTest &

wait $!
echo "Terminated all tests"
```

### 13.1.2 parallelism or multiple threads in BASH

```text
I was working on a Nagios check the other day, which was looping over a number of items and assessing their status. I found that the check would routinely time out if the number of items was large. So, to make it scale I thought spawning the individual steps to run in parallel and then evaluating the status at the end would be a nice way to do it. There are many programming languagues that make this quite easy, but BASH isn't really know as one of those. Since the script was running pretty well as written in BASH I set out to try and stick with it rather than redoing the whole script. Here is what seems to work for this case.

Basically I rely on starting a background job, named pipe and the bash built in wait. The named pipe provides the ability to not have many individual output files, since I don't have much output to contend with.

Here is what the skeleton script looks like:


#!/bin/bash
 
OUTPUT="/tmp/.test"
mkfifo $OUTPUT &> /dev/null
 
# this is the slow running function
slow () {
  echo "begin $1"
  sleep 3;
  echo "slow $1" > $OUTPUT &
  echo "end $1"
}
 
# here the function is spwaned
for x in {1..3} ; do
  echo "spawn $x";
  slow $x &
done
 
# we wait for all the child processes to finish
echo waiting
wait
echo done waiting
 
# then we read the output
cat $OUTPUT
rm $OUTPUT

If you run the script you'll see something like this:

# ./foo.sh
spawn 1
spawn 2
begin 1
spawn 3
waiting
begin 3
begin 2
end 1
end 3
end 2
done waiting
slow 1
slow 2
slow 3
#

You can see that the processes don't even finish in order, which is exactly what I needed to deal with.

The interesting bits are that the function call must be backgrounded and the same with the output to the named pipe. It's also possible trap the exit code of the slow script.

One possible negative is that if the script is interrupted you might end up with some or all of the output from the last time the script was run. Then again, that may also be desirable outcome.

Here's to named pipes!
```

### 13.1.3 My example,

```text
#!/bin/bash
#===============================================================================
#
#          FILE:  multiple_slowFS_file_fetchers.bash
#       
#         USAGE:  multiple_slowFS_file_fetchers.bash
# 
#   DESCRIPTION:  Go to IPCentral and extract all ACS 5.1 libs
#   Must be done MT since the archive is extremely slow
# 
#       OPTIONS:  ---
#  REQUIREMENTS:  ---
#          BUGS:  ---
#         NOTES:  ---
#        AUTHOR:   Yosi Izaq 
#       COMPANY:  
#       VERSION:  1.0
#       CREATED:  06/06/2007 11:38:08 AM IDT
#      REVISION:  ---
#===============================================================================

ARCHIVE_LOC="<internal-path> 5.1"
TRG_LOC="/users/<user>/temp"
ARCHIVE_NAME="acs_5_1_src_publication_"

cd "$ARCHIVE_LOC"

ArchiveLibs(){


        echo "archiving libs starting with letter $1"
        echo "exec: tar cvhz ${TRG_LOC}/${ARCHIVE_NAME}$1.tarz $1*"
        #touch ${TRG_LOC}/${ARCHIVE_NAME}$1.tarz
        tar -zcvhf ${TRG_LOC}/${ARCHIVE_NAME}$1.tarz $1*
}

for let in {a..z} ; do
        ArchiveLibs "$let" &
        sleep 1
done

wait $!
echo "Terminated all archive threads"
		13.1.4
```
