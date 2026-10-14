---
type: cheatsheet
title: "Useful, Common procedures and shortcuts"
description: "Common Unix procedures and shortcuts: loops over files, directory listing, process tree and open files."
tags: [unix, shell, cheatsheet, one-liners, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "unix-kb#15"
---

# Useful, Common procedures and shortcuts

[↑ unix-kb](/kb-unix/README.md)

## 15.1 issue command on list of files.

### 15.1.1 in sh:

```text
			for file in *.c ; do wc -l $file ; done
			
			extract class name from java source files and grep it for usage in list of files
			for class in `grep class *.java | awk -F. '{print $1}'`; do echo $class; grep $class  ../../../data/brl/* ; done

			//ignore */
		15.1.2 Process the contents of a file and then run a list of commands:
			stam file contains a list of files in windows format, the files are converted to unix format and then the commands are ran.
			stam format is: "H:\ismg_israel_acs\Acs\Vendors\DzAttr.H@@\main\<internal-path>\CHECKEDOUT.359737"
			$ for file in `cat stam | awk -F"\\\@" '{print $1}' | sed 's/H:\\\ismg_israel_acs//' | sed 's_\\\_/_g' `; do echo $file; done

			$ for file in `cat stam | awk -F"\\\@" '{print $1}' | sed 's/H:\\\ismg_israel_acs\\\Acs//' | sed 's_\\\_/_g' `; do tkdiff /cygdrive/j/ismg_israel_acs/Acs$file /cygdrive/h/ismg_israel_acs/Acs$file ; done


			e\\\Acs//' | sed 's_\\\_/_g' `; do ls /cygdrive/h/ismg_israel_acs/Acs$file ; done
			extract links to local files from web page, change the path to be cygwin compatible, then copy the files to given location
	 for file in `grep "file:" Presentation.html | awk -F"\"" '{print $2}' | sed -e 's/^file.*d:/\/cygdrive\/d/g'`; do \cp $file ./presentation_doc/ ; done
		in tcsh
			foreach file ( * ) 
			foreach? echo $file
			foreach? end
	   on all lines of file.
		in sh:
			for line in `cat <file name>` ; do "echo line is: $line"; done
		in tcsh:
			foreach line ( `cat sm_mng.h.bak` )
			foreach? echo $line
			foreach? end

		example, change file JF_somesuffix to TC_lmsq_somesuffix
			foreach file ( `ls | grep JF | awk -F"_" '{print$2}' ` )
			foreach? mv JF_$file TC_lmsq_$file
			foreach? end
```

## 15.2 list directories.

```text
		$ ls -d *
```

## 15.3 process tree.

```text
	$pstree
```

## 15.4. List open files in system

```text
	$lsof 
```

## 15.5. Remove repeated lines from file:

```text
	$ uniq [file name]

		Usually this goes hand in hand with sort. sort a file then run uniq to remove repeated lines.
		like:
		awk '/pattern/ {print "$1"} file | sort | uniq
```

## 15.6 Encryption.

```text
		15.6.1 Don't use crypt!!! It is based on 56 bit DES and is easy to break.
```

### 15.6.2 Can use ccrypt (based on AES)

```text
			To encrypt
			$ ccrypt -e [file]

			To decrypt

			$ ccrypt -d [file].cpt
```

## 15.7 Create tarball backup of files according to file lists in a file.

```text
	$ tar cvf backup_files.tar `cat hijacked_files ; cat co_files ` ; bzip2 backup_files.tar
```

## 15.8 Create/modify a UNIX file with an arbitrary timestamp

```text
	The touch command in UNIX creates a file if it doesn't exist or updates the modification time of an existing file to the current time. An option of the touch command allows the modification timestamp to be set to any arbitrary time.

To change the modification time of a file (the time displayed in a long listing of the file) of a file called testfile to November 18, 2000, 2:30 PM, use the following command:

touch -t 200011181430


This will alter the modification time of an existing testfile or, if not present, will create an empty file with that timestamp.

The format of the timestamp is
[[CC]YY]MMDDhhmm [.SS]
```

## 15.2 Open remote graphical display

```text
		15.2.1 Directlym configure Manually, in may time won't work due to proxy or network configuration
	export DISPLAY=64.103.112.242:0.0 (my IP)
	xhost+ on 64.103.112.242
```

### 15.2.2 Using SSH with X forwarding for untrusted X11 display forwarding

```text
		The short story, use ssh -X <machine> and ssh will automatically set the display to the source machine.

		The details:
X11 DISPLAY variables and X forwarding

Assuming we are logged in via "ssh" from WOMBATNET to chinookfe, what are some of the possible problems we can encounter with X11 forwarding ? The first clue, in the following example, is the DISPLAY environment variable.

    [chinookfe:/home/chinook/wombat]
    $ xterm
    xterm Xt error: Can't open display: :0

Trying to execute a simple "xterm" on chinookfe through "ssh" yields the above error message, which shows that the DISPLAY environment variable is not set correctly. We can confirm this as follows:

    [chinookfe:/home/chinook/wombat]
    $ echo $DISPLAY
    :0

The immediate inclination is to manually set the DISPLAY variable on chinookfe using either "export" or "setenv", depending on your shell. This is not correct, in that the proper operation of "ssh" with X forwarding allows us to avoid setting or trying to set the DISPLAY variable manually, and it even bypasses the need to run the "xhost" command for the chinookfe session on your workstation. A correct DISPLAY setting, assuming a simple X forwarding operation between chinookfe and our hypothetical workstation WOMBATNET, would yield a value such as:

    [chinookfe:/home/chinook/wombat]
    $ echo $DISPLAY
    chinookfe:11.0

This varies from what you may have seen in the past, in that often users will place command lines into their login scripts on remote systems that set the DISPLAY variable upon login. Lines like:

      setenv DISPLAY myworkstation:0.0
                   or
      export DISPLAY=myworkstation:0.0

should be removed from your dot files (.cshrc, .kshrc, .login, etc.) on NCAR computer systems, as "ssh" will automatically handle forwarding X11 connections for us. This includes setting the DISPLAY environment variable on the remote host, in this case chinookfe.

Assuming we have removed the line(s) setting our DISPLAY variable from our dot files on chinookfe, how do we get "ssh" to do the work for us? Our recommended approach is to use the "-X" option of "ssh" to establish the connection from our hypothetical example workstation WOMBATNET to chinookfe, as follows:

    [WOMBATNET:/home/wombat]
    $ ssh -X chinookfe.ucar.edu

    wombat@chinookfe's password:

After entering our password, we receive the MOTD and are logged into the system.

    Last login: Wed Jul 17 10:34:08 2002 from WOMBATNET.net
    =======================================================================
    chinookfe: IRIX64 6.5.16, SGI Origin2000 (8 cpus, 8 GB's memory)
    =======================================================================
    THIS SYSTEM IS FOR THE USE OF AUTHORIZED USERS ONLY.  INDIVIDUALS USING
    THIS COMPUTER SYSTEM WITHOUT AUTHORITY, OR IN EXCESS OF THEIR AUTHORITY,
    ARE SUBJECT TO HAVING ALL THEIR ACTIVITIES ON THIS SYSTEM MONITORED AND
    RECORDED BY SYSTEM PERSONNEL.  IN THE COURSE OF MONITORING INDIVIDUALS
    IMPROPERLY USING THIS SYSTEM, OR IN THE COURSE OF SYSTEM MAINTENANCE,
    THE ACTIVITIES OF AUTHORIZED USERS MAY ALSO BE MONITORED.
    =========================================================================

    [chinookfe:/home/chinook/wombat]
    $

We should now have the correct DISPLAY variable set:

    [chinookfe:/home/chinook/wombat]
    $ echo $DISPLAY
    chinookfe:10.0

Note that the form of the DISPLAY variable will always be "HOSTNAME:x.y" where "HOSTNAME" is the host we just logged in to, in this case "chinookfe", "x" is a small integer, in this case "10", and "y" is usually "0". What this does, in general terms, is enable X11 forwarding across the established ssh tunnel. The upside is this means we don't have to set DISPLAY through either files or after login, and back on the workstation we don't have to issue a command like "xhost +chinookfe.ucar.edu". In addition, all of the X11 traffic is now encrypted. This effect provides better security than the more traditional techniques, and if your facility has a firewall, this may be the only way, because of the tunneling, to get X11 applications to display back to your workstation from the system at NCAR.

You should now be able to execute a simple X11 application like "xterm" and get the window back at your workstation:

    [chinookfe:/home/chinook/wombat]
    $ xterm &

If this fails to display the "xterm" window, then we need to employ remedial "ssh" diagnostics to try to determine where the X11 authorization problem may exist. With the OpenSSH client software, we can use the same verbose stream debugging we did in our previous example. 
```

### 15.2.3 ssh -Y

```text
e.g. $ ssh -Y <user>@3.87.209.39

		15.2.4
```

## 15.3 nohup

```text
nohup - run a command immune to hangups
nohup command [argument...]

The nohup utility invokes the named command with  the  argu-
     ments supplied.  When the command is invoked, nohup arranges
     for the SIGHUP signal to be ignored by the process.

     When invoked with the -p or -g  flags,  nohup  arranges  for
     processes already running as identified by a list of process
     IDs or a list of process group IDs to become immune to hang-
     ups.

     The nohup utility can be used when it is known that  command
     will  take  a long time to run and the user wants to log out
     of the terminal. When a shell exits, the  system  sends  its
     children  SIGHUP  signals, which by default cause them to be
     killed. All  stopped,  running,  and  background  jobs  will
     ignore  SIGHUP  and continue running, if their invocation is
     preceded by the nohup command or if the process programmati-
     cally has chosen to ignore SIGHUP.
```
