---
type: reference
title: Cookbook solutions
description: "Bash cookbook solutions, such as reversing an array in pure bash."
tags: [bash, shell, legacy, howto, examples]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "bash/KB_bash#14"
---

# Cookbook solutions

[↑ KB_bash](/bash/kb-bash/README.md)

## 14.1 Reverse bash array (reverse list)

```text
Currently there's no reverse primitive (like in perl and python), so have to do it the manual way:
```

### 14.1.1 Pure Bash solution

```text
a=(alpha beta gamma delta epsilon);
len=${#a[@]};

echo ${a[@]};

i=0;
while (($i < $len/2 )); do
     tmp=${a[i]};
     a[i]=${a[$len-$i-1]};
     a[$len-$i-1]=$tmp;  
     ((i++));
done

echo ${a[@]};
```

### 14.1.2 Using AWK

```text
-> Possible solution
 vector=( one two three )
 echo ${vector[@]}
one two three
 vector=( $(echo ${vector[@]} | awk '{split($0,A); for (el in A) res = A[el]" "res; print res}') )
 echo ${vector[@]}
three two one

-> More consice:
 echo "one two three four" | awk '{for (i=NF;i>=1;i--) printf $i" "} END{print ""}'
four three two one
```

### 14.1.3 As a function

```text
function my_reverse(){

        local arr
        arr=( `echo "$1"` )
        echo ${arr[@]}| awk '{for (i=NF;i>=1;i--) printf $i" "} END{print ""}'
}

Using that function:
-> For just printing the reversed array:
#Just experminet with passing and retrieving arrays to/from function
# and checking that reverse utility function is working.
orig_arr=( aaa bbb ccc ddd )
argument=`echo ${orig_arr[@]}`
reversed_arr=( `my_reverse "$argument"` )
#echo "${reversed_arr[@]}"

-> For using a reversed array:
# uninstall in reverse order of installment
argument=`echo ${RPM_NAMES[@]}`
RPM_NAMES=( `my_reverse "$argument"` )
```

## 14.2 Monitor file size doesn't exceed given quota

```text
# while true; do if test $( stat  /opt/CSCOacs/logs/monit.log  | awk '/Size:/ { print $2}'  ) -gt 11535158999 ; then echo monit exceeds quota flushing it; echo /dev/null > /opt/CSCOacs/logs/monit.log ; fi ; sleep 60; done

You have new mail in /var/spool/mail/root
# while true; do if test $( stat  /opt/CSCOacs/logs/monit.log  | awk '/Size:/ { print $2}'  ) -gt 1153 ; then echo monit exceeds quota flushing it; echo /dev/null > /opt/CSCOacs/logs/monit.log ; fi ; sleep 60; done
monit exceeds quota flushing it

# ls -lrh /opt/CSCOacs/logs/monit.log
-rw------- 1 root root 10 Mar 19 17:47 /opt/CSCOacs/logs/monit.log
```

## 14.3 Time

### 14.3.1 Linux - bash script to calculate time elapsed

```text
ex:
# STARTTIME=$(date +%s)
# ENDTIME=$(date +%s)
# echo "Elapsed time is $((  $ENDTIME - $STARTTIME )) seconds"
Elapsed time is 8 seconds
# if (( $((  $ENDTIME - $STARTTIME )) < 10 )) 
> then
> echo "Elapsed time is less than 10 seconds"
> else
> echo "Elapsed time is more than or equal 10 seconds"
> fi
Elapsed time is less than 10 seconds
# STARTTIME=$(date +%s)
# ENDTIME=$(date +%s)
# echo "Elapsed time is $((  $ENDTIME - $STARTTIME )) seconds"
Elapsed time is 55 seconds
# if (( $((  $ENDTIME - $STARTTIME )) < 10 )) ; then echo "Elapsed time is less than 10 seconds"; else echo "Elapsed time is more than or equal 10 seconds"; fi
Elapsed time is more than or equal 10 seconds

		14.3.2
```

## 14.4 Locks

### 14.4.1 Lock your script (against parallel run)

#### 14.4.1.1 flock

#### 14.4.1.1.1 Elegant Locking of BASH Program

```text
NOV 6TH, 2012 | COMMENTS
Intro

I want to block program from running twice simultaneously. Why would I want such a thing? Lets say you have a program that creates the directory /tmp/prog and update files inside this directory. If you run the program twice at the same time, files inside this directory will get clobbered. Searching the net for solution, flock comes up as a good way to solve the problem. flock is part of the util-linux package.

Basic solution

Here is an example posted at stackoverflow:

1
2
3
4
5
6
7
8
9
10
11
12
#!/bin/bash

# Makes sure we exit if flock fails.
set -e

(
    # Wait for lock on /var/lock/.myscript.exclusivelock (fd 200) for 10 seconds
    flock -n 200

    # Do stuff

) 200>/var/lock/.myscript.exclusivelock
At the heart of the locking mechanizm is the last line, which create the file /var/lock/.myscript.exclusivelock using file descriptor 200. The syntax 9>textfile, is the way in BASH to create textfile using file descriptor 9. Then we check if the file is locked in line 8, flock -n 200 using the file descriptor 200 we used to create the lock file with. So while the critical code after line 8, that runs in the sub shell, is running, the file /var/lock/.myscript.exclusivelock stays locked, and will be released when the sub shell exits.

Next step

My first rule of programming in BASH, is to have all the code functional and the only line that is globally executed is main like this:

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
#!/bin/bash

do_A() {
    ...
}

do_B() {
    ...
}

main() {
    do_A
    do_B
}
main
So using this example, to lock the program we can do this:

1
2
3
4
5
6
7
8
9
10
main() {
    do_A
    do_B
}

(
    flock -n 200
    main

) 200>/var/lock/.myscript.exclusivelock
or:

1
2
3
4
5
6
7
8
9
main() {
    (
        flock -n 200
        do_A
        do_B

    ) 200>/var/lock/.myscript.exclusivelock
}
main
First example breaks my rule, and main is not the only global code, but is not too bad. The second example, does not look good to me. It seems that main have more syntax complexity then it should. What we really want, in order to keep the code clean, is creating a lock function that will behave like this:

1
2
3
4
5
main() {
    lock || exit 1
    do_A
    do_B
}
Creating a locking function

To move locking to a function, we’ll need to get rid of this sub shell syntax.

1
2
3
4
5
(
    flock -n 200
    ...

) 200>/var/lock/.myscript.exclusivelock
The answer is to be found in jdimpson’s blog post using flock to protect critical sections in shell scripts. Using exec to create the lock file:

exec 200>/var/lock/.myscript.exclusivelock
Now we can crate the lock file, and use flock to acquire it:

1
2
3
4
5
6
7
8
9
10
main() {
    exec 200>/var/lock/.myscript.exclusivelock

    flock -n 200 \
        || exit 1

    do_A
    do_B
}
main
Lets create the lock function:

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
lock() {
    exec 200>/var/lock/.myscript.exclusivelock

    flock -n 200 \
        && return 0 \
        || return 1
}

main() {
    lock || exit 1

    do_A
    do_B
}
main
So now we have hard coded function ;-) What can we do next? Lets get rid of the magic number 200 and the lock filename, and turn them to a variables.

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
#!/bin/bash

readonly PROGNAME=$(basename "$0")
readonly LOCKFILE_DIR=/tmp
readonly LOCK_FD=200

lock() {
    local prefix=$1
    local fd=${2:-$LOCK_FD}
    local lock_file=$LOCKFILE_DIR/$prefix.lock

    # create lock file
    eval "exec $fd>$lock_file"

    # acquier the lock
    flock -n $fd \
        && return 0 \
        || return 1
}

eexit() {
    local error_str="$@"

    echo $error_str
    exit 1
}

main() {
    lock $PROGNAME \
        || eexit "Only one instance of $PROGNAME can run at one time."

    do_A
    do_B
}
main
So now we have a lock function that does what we want. It gets the prefix of the lock filename, and then variable fd is 200 by default, but you can specify different file descriptor number like this lock $PROGNAME 500. The important change in the lock function is the turning of 200 to a variable $fd, and to be able to execute the lock file creation, we use eval. Try it without eval and see what happens. You will get error that there is no command 200.

Conclusion

We arrived from script like locking mechanism to a well closed lock function, that will create exclusivity of the program running. I would go further and paste this lock command to a library of its own. Then source it. i.e. source /usr/lib/lock.sh. Look again at the main function and see how elegant and expressive it is. i.e. lock program or exit the program, because another instance of the program is already running.

nJoy,
Kfir

			14.4.1.2
		14.4.2

	14.5
```
