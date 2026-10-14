---
type: reference
title: System management
description: Section 4 of the legacy unix-kb notes.
tags: [kb-unix]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "unix-kb#4"
---

# System management

[↑ unix-kb](/kb-unix/README.md)

## 4.1. crontab, order process or tasks to be performed automatically at given times.

### 4.1.1 to view:

```text
			$ crontab -l
```

### 4.1.2 to edit:

```text
			$ setenv EDITOR vi; crontab -e;
```

## 4.2. Change hostname.

### 4.2.1 become root ( su - )

### 4.2.2 uname -S <name>

### 4.2.3 netcfg; protocols->Modify-> now change host name

### 4.2.4 change IP.

```text
			netcfg->TCP/IP->(tab)protocol->modify protocol...->change host name; delete domain name; change IP; netmask (class c) 255.255.255.0; default router is 10.120.1.1;
```

## 4.3 RAID maintenance

### 4.3.1. determine whether or not a machine is working with RAID disk.

```text
			4.3.1.1 Type sdiconfig -l  you'll C that the device attached to c1 is the tape 
			And if U type df -k  you'll C that /home is mapped to c0..t0..s4 which means controller 0 scsi id 0 slice number 4
			To get a print of system contollers
```

#### 4.3.1.2 $ prtconf

### 4.3.2. RAID configuration

#### 4.3.2.1 0-fastest to 5-slowest.

#### 4.3.2.2 memory 128-512

#### 4.3.2.3 controller speed.

```text
			4.3.2.4 SCSI card speed. should be 160. 29160. 2940 or 2980 is a problem.
```

## 4.4. determine NIC speed.

```text
		$ vi /var/adm/log/osmlog
		$ netcfg-> view HW, should be 100 full duplex.
```

## 4.5 Process management

### 4.5.1 change process priority

```text
		$ renice -n -5 -p pid   
	    manage processes priority:
		priocntl -d -i pid <process id>
	also related commands.
	nice(1), ps(1), exec(2), fork(2), priocntl(2), rt_dptbl( 4),
	     attributes(5)
```

### 4.5.2 Send signal to process (like SIGTERM, or kill)

```text
		pkill
		pgrep
```

### 4.5.3 Zombie process (from wikipedia)

```text
On Unix and Unix-like computer operating systems, a zombie process or defunct process is a process that has completed execution but still has an entry in the process table. This entry is still needed to allow the process that started the (now zombie) process to read its exit status. The term zombie process derives from the common definition of zombiean undead person. In the term's colorful metaphor, the child process has died but has not yet been reaped.

When a process ends, all of the memory and resources associated with it are deallocated so they can be used by other processes. However, the process's entry in the process table remains. The parent can read the child's exit status by executing the wait system call, at which stage the zombie is removed. The wait call may be executed in sequential code, but it is commonly executed in a handler for the SIGCHLD signal, which the parent receives whenever a child has died.

After the zombie is removed, its process ID and entry in the process table can then be reused. However, if a parent fails to call wait, the zombie will be left in the process table. In some situations this may be desirable, for example if the parent creates another child process it ensures that it will not be allocated the same process ID. On modern UNIX-like systems (that comply with SUSv3 specification in this respect), the following special case applies: if the parent explicitly ignores SIGCHLD by setting its handler to SIG_IGN (rather than simply ignoring the signal by default) or has the SA_NOCLDWAIT flag set, all child exit status information will be discarded and no zombie processes will be left.

A zombie process is not the same as an orphan process. An orphan process is a process that is still executing, but whose parent has died. They do not become zombie processes; instead, they are adopted by init (process ID 1), which waits on its children.

Zombies can be identified in the output from the Unix ps command by the presence of a Â¿ZÂ¿ in the Â¿STATÂ¿ column. Zombies that exist for more than a short period of time typically indicate a bug in the parent program, or just an uncommon decision to reap children (see example). As with other leaks, the presence of a few zombies is not worrisome in itself, but may indicate a problem that would grow serious under heavier loads. Since there is no memory allocated to zombie processes except for the process table entry itself, the primary concern with many zombies is not running out of memory, but rather running out of process ID numbers.

To remove zombies from a system, the SIGCHLD signal can be sent to the parent manually, using the kill command. If the parent process still refuses to reap the zombie, the next step would be to remove the parent process. When a process loses its parent, init becomes its new parent. Init periodically executes the wait system call to reap any zombies with init as parent.

[edit] Examples

Synchronously waiting for specific child processes in a (specific) order may leave zombies present longer than the above-mentioned Â¿short period of timeÂ¿. It is not necessarily a program bug, but rather a programming paradigm that is not seen very often in the wild.

#include <sys/wait.h>
#include <stdlib.h>
#include <unistd.h>
 
int main(void)
{
        pid_t pids[5];
        int i;
 
        for (i = 4; i >= 0; --i) {
                pids[i] = fork();
                if (pids[i] == 0) {
                        sleep(i+1);
                        _exit(0);
                }
        }
 
        for (i = 4; i >= 0; --i)
                waitpid(pids[i], NULL, 0);
 
        return 0;
}


		4.5.4
```

## 4.6 remove user .

```text
		$userdel -r -n0
```

## 4.7 mounts.

### 4.7.1 /etc/vfstab - mount table.

```text
		4.7.2commands vfstab, mnttab, mount, umount
```

## 4.8 `chroot': Run a command with a different root directory

```text
	For more info:
$ man chroot
$ info coreutils chroot
	
	to limit a process visibility for file system.
	$ chroot  /tmp/empty /ls -Rl /
```

## 4.9 System information

### 4.9.1 process list

```text
			$ top
		in top do:
		space - refresh, h - help, k - kill a process, n - change # of displayed procs, u, M, P - sort by user, memory, cpu usage respectively.

			The same with GUI
			$ gnome-system-monitor
```

### 4.9.2 memory usage.

```text
			$free
```

### 4.9.3 File system.

```text
			$df
			(add -h for more readable output)
```

### 4.9.4 Hardware

```text
			(Linux only)
			$hwbrowser
```

## 4.10 administrator access on Linux

```text
	$ sudo <cmd>
```

## 4.11 Basic information of system status

### 4.11.1 Users online, $ who

### 4.11.2 User details, $ who am i

### 4.11.3 host name: $hostname, ID: $hostid, Data(requires root permission): $hoststat
