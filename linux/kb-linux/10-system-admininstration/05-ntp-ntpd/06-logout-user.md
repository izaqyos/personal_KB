---
type: reference
title: logout user
description: Forcefully logging out users on Linux with pkill and skill.
tags: [linux, unix, one-liners, tips, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "linux/KB_Linux#10.5.6"
---

# 10.5.6 logout user

[↑ NTP, NTPD](/linux/kb-linux/10-system-admininstration/05-ntp-ntpd/README.md)

```text
 root or admin user can logout any user forcefully. If you are logged in as vivek and just wanted to logout or logoff, type logout command or hit CTRL+D:
$ logout

You will be logout of a login shell session or secure shell session.
Task: Linux logout user

If you would like to logout other users, you must login as root user. Next you need to use pkill command.
pkill command syntax

pkill -KILL -u {username}

To see list of logged in user type who or w command:
# who
OR
# w
To logout user called raj, enter:
# pkill -KILL -u raj
OR
$ sudo pkill -KILL -u raj

------------------------------------------------------------------------------------------------------------------------
There is a package called procps. It includes various useful (nifty) utilities. One of such utility is skill which is responsible to send a signal to users and process such as:

    Halt user terminal
    Kill user and logout


The procps package contains utilities to browse the /proc filesystem, which is not a real file system but a way for the kernel to provide information about the status of entries in its process table. Procps includes ps, free, skill, pkill, pgrep, snice, tload, top, uptime, vmstat, w, watch and pdwx commands.
Task: How To Halt/Stop a User Called vivek

Open a command-line terminal (select Applications > Accessories > Terminal), and then type the following commands. First, switch to the root user by typing su - and entering the root password, when prompted (you can also use sudo if configured). Type the skill command as follows:
# skill -STOP -u vivek
The skill command sends a terminate command (or another specified signal) to a specified set of processes.
Task: Resume Halted User Called vivek

Send CONT single to user vivek, type the following command:
# skill -CONT -u vivek
Task: Kill and Logout a User Called vivek

You can send KILL single, type the following command:
# skill -KILL -u vivek
Task: Kill and Logout All Users

The ultimate command to kill and logout all users is as follows:
# skill -KILL -v /dev/pts/*
[Warning examples may crash your computer] WARNING! These tools are obsolete, unportable and it is here due to historical reasons. Consider using the killall, pkill, and pgrep commands instead as follows.
pkill command

*/



To halt or stop a user called vivek, enter:
# pkill -STOP -u vivek
To resume a user called vivek, enter:
# pkill -CONT -u vivek
To kill all php-cgi process owned by vivek user, enter:
# pkill -KILL -u vivek php-cgi
------------------------------------------------------------------------------------------------------------------------
```
