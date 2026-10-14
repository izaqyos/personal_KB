---
type: reference
title: "xargs, build and execute command lines from standard input"
description: "xargs for building command lines from standard input, with find examples."
tags: [xargs, find, linux, examples, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "linux/KB_Linux#5"
---

# xargs, build and execute command lines from standard input

[↑ KB_Linux](/linux/kb-linux/README.md)

## 5.1 examples with find

### 5.1.1 Code: Lists all directories

```text
	recall find . -exec echo '{}';
	xargs can do the same find . | xargs echo $1

	find . -type d -name ".svn" -print | xargs rm -rf

The above command will execute rm on each file found by 'find'. The above construct can be used to execute a command on multiple files. This is similar to the -exec argument find has but doesn't suffer from the "Too Many Arguments" problem. And xargs is easier to read than -exec in most cases.

Code: Lists all directories

find . -maxdepth 1 -type d -print | xargs echo Directories:

This will print all directories in the current folder. The command (echo) specified will recived the input from find and be executed once. That's why this code will output all directories on one line.
Code: Lists all directories using -I

A filter for feeding arguments to a command, and also a tool for assembling the commands themselves. It breaks a data stream into small enough chunks for filters and commands to process. Consider it as a powerful replacement for backquotes. In situations where command substitution fails with a too many arguments error, substituting xargs often works. [1]  Normally, xargs reads from stdin or from a pipe, but it can also be given the output of a file.

The default command for xargs is echo. This means that input piped to xargs may have linefeeds and other whitespace characters stripped out.

bash$ ls -l
total 0
 -rw-rw-r--    1 bozo  bozo         0 Jan 29 23:58 file1
 -rw-rw-r--    1 bozo  bozo         0 Jan 29 23:58 file2



bash$ ls -l | xargs
total 0 -rw-rw-r-- 1 bozo bozo 0 Jan 29 23:58 file1 -rw-rw-r-- 1 bozo bozo 0 Jan...
```

### 5.1.2 bash$ find ~/mail -type f | xargs grep "Linux"

```text
./misc:User-Agent: slrn/0.9.8.1 (Linux)
 ./sent-mail-jul-2005: hosted by the Linux Documentation Project.
 ./sent-mail-jul-2005: (Linux Documentation Project Site, rtf version)
 ./sent-mail-jul-2005: Subject: Criticism of Bozo's Windows/Linux article
 ./sent-mail-jul-2005: while mentioning that the Linux ext2/ext3 filesystem
 . . .
	      

ls | xargs -p -l gzip gzips every file in current directory, one at a time, prompting before each operation.

Note	

Note that xargs processes the arguments passed to it sequentially, one at a time.

bash$ find /usr/bin | xargs file
/usr/bin:          directory
 /usr/bin/foomatic-ppd-options:          perl script text executable
 . . .

		5.1.3 find . -maxdepth 1 -type d -print | xargs -I {} echo Directory: {}

This time we added -I {} to xargs. This is the replacement argument. The command specifed to xargs will now be executed once for each line of output from find and replace {} with that line.

So this time we get each directory printed on a separate line.
Note: If xargs -i fails you might need a newer version of xargs. The Gentoo package findutils contains xargs.


Keep this in mind when using xargs. When creating more complex commands you often need to use the -I argument. Like if you want to run multiple commands and/or pipe to another command.
```

### 5.1.4 find symbol in .so files

```text
find /opt/pbis/lib64/ -name '*.so' -print | xargs -I '{}' sh -c 'echo searching lib {} ; nm -C {} | grep LwWin32ExtErrorToName'
```

### 5.1.5 find symbol in binary file

```text
$ for f in $( ls ); do echo searching $f; nm $f | grep LsaDmpThreadRoutine ; done
searching lwsmd
00000000000cdc60 t LsaDmpThreadRoutine
```

## 5.2 Advanced usage

```text
An interesting xargs  option is -n NN, which limits to NN the number of arguments passed.

ls | xargs -n 8 echo lists the files in the current directory in 8 columns.

Tip	

Another useful option is -0, in combination with find -print0 or grep -lZ. This allows handling arguments containing whitespace or quotes.

find / -type f -print0 | xargs -0 grep -liwZ GUI | xargs -0 rm -f

grep -rliwZ GUI / | xargs -0 rm -f

Either of the above will remove any file containing "GUI". (Thanks, S.C.)

Or:

cat /proc/"$pid"/"$OPTION" | xargs -0 echo
#  Formats output:         ^^^^^^^^^^^^^^^
#  From Han Holl's fixup of "get-commandline.sh"
#+ script in "/dev and /proc" chapter.
```

## 5.3 run multiple commands

```text
	ex:
find . -name GNUmakefile | xargs -i bash -c 'echo {} ; grep lrpc {} '
```

## 5.4 advances usage

### 5.4.1 find all files who's 9th line contains a pattern

```text
$ find . -type f -name pom.xml  | xargs -ixxx echo xxx ; sed -e '9p' -n xxx | grep 2011 

use -i to specify to string to replace the list of files

To get the file name do:
$ find . -type f -name pom.xml   -exec  echo '{}' \;  -exec sed -e '9p' -n '{}' \; | grep -B 1 2011
```

### 5.4.2 xargs: unterminated quote problem

```text
- cause - a file containing '
ex:
$ search_in_files  CSCun25815
executing: find . -type f | xargs grep -s CSCun25815 
xargs: unterminated quote

see:
$ find . | grep \"
$ find . | grep \'
./acs/5.0/AD/troubleshoot/machine auth doesn't work 28_07_08
./acs/5.0/AD/troubleshoot/machine auth doesn't work 28_07_08/machine auth doesn't work 28_07_08.zip
./acs/5.0/AD/troubleshoot/Shachar's PEAP AUTH issue25_09
./acs/5.0/AD/troubleshoot/Shachar's PEAP AUTH issue25_09/ACSADAgent.zip
./acs/5.0/AD/troubleshoot/Shachar's PEAP AUTH issue25_09/acsRuntime.zip
...


- fix 
 find . -type f -print0 | xargs -0 grep -s CSCun25815 
		5.4.3
	5.5
```
