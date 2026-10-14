---
type: reference
title: "Linux, Detailed information in KB_Linux."
description: Section 24 of the legacy unix-kb notes.
tags: [kb-unix]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "unix-kb#24"
---

# Linux, Detailed information in KB_Linux.

[↑ unix-kb](/kb-unix/README.md)

## 24.1 Linux administration

### 24.1.1 Semaphors

```text
		 Shared memory and semaphores are collectively referred to as "System V IPC". When PostgreSQL exceeds one of the various hard limits of the IPC resources, the postmaster refuses to start up and leaves an error message about which problem was encountered and what needs to be done about it.

Table 1-2. System V IPC parameters
Name	Description							Reasonable Values
SHMMAX	Maximum size of shared memory segment (bytes)			250kB + 8.2kB * shared_buffers + 14.2kB * max_connections or infinity
SHMMIN	Minimum size of shared memory segment (bytes)			1
SHMALL	Total amount of shared memory available (bytes or pages)	if bytes, same as SHMMAX; if pages, ceil(SHMMAX/PAGE_SIZE)
SHMSEG	Maximum number of shared memory segments per process		only 1 segment is needed, but the default is much higher
SHMMNI	Maximum number of shared memory segments system-wide		like SHMSEG plus room for other applications
SEMMNI	Maximum number of semaphore identifiers (that is, sets)		>= ceil(max_connections / 16)
SEMMNS	Maximum number of semaphores system-wide			ceil(max_connections / 16) * 17 + room for other applications
SEMMSL	Maximum number of semaphores per set				>= 17
SEMMAP	Number of entries in semaphore map				see text
SEMVMX	Maximum value of semaphore					>= 255 (The default is often 32767, do not change unless asked to.)

The most important shared memory parameter is SHMMAX, the maximum size, in bytes, that a shared memory segment can have. If you get an error message from shmget along the lines of Invalid argument, it is possible that this limit has been exceeded. The size of the required shared memory segments varies both with the number of requested buffers (-B option) and the number of allowed connections (-N option), although the former is the dominant item. (You can therefore, as a temporary solution, lower these settings to get rid of the failures.) As a rough approximation you can estimate the required segment size as the number of buffers times the block size (8192 KB by default) plus ample overhead (at least half a megabyte). All error messages will contain the size of the failed allocation request.

Less likely to cause problems is the minimum size for shared memory segments (SHMMIN), which should be at most somewhere around 256 KB for PostgreSQL (it is usually just 1). The maximum number of segments system-wide (SHMMNI) or per-process (SHMSEG) should not cause a problem unless your system has them set to zero.

PostgreSQL uses one semaphore per allowed connection (-N option), in sets of 16. Each such set will also contain a 17th semaphore that contains a "magic number", to avoid collision with semaphore sets used by other applications. The maximum number of semaphores in the system is set by SEMMNS, which consequently must be at least as high as the connection setting plus one extra for each 16 allowed connections (see the formula in the section "System V IPC Parameters"). The parameter SEMMNI determines the limit on the number of semaphore sets that can exist on the system at one time. Hence this parameter must be at least ceil(max_connections / 16). Lowering the number of allowed connections is a temporary workaround for failures, which are usually confusingly worded "No space left on device", from the function semget().

In some cases it might also turn out to be necessary to increase SEMMAP to be at least on the order of SEMMNS. This parameter defines the size of the semaphore resource map, in which each contiguous block of available semaphores needs an entry. When a semaphore set is freed it is either added to an existing entry that is adjacent to the freed block or it is registered under a new map entry. If the map is full, the freed semaphores get lost (until reboot). Fragmentation of the semaphore space could therefore over time lead to less available semaphores than there should be.

The SEMMSL parameter, which determines how many semaphores can be in a set, must be at least 17 for PostgreSQL.

Various other settings related to "semaphore undo", such as SEMMNU and SEMUME, are not of concern for PostgreSQL.

The default shared memory limit for SHMMAX is 32 MB and for SHMALL is 2 MB, but it can be changed in the proc file system (without reboot). For example, to allow 128 MB:

$ echo 134217728 >/proc/sys/kernel/shmall
$ echo 134217728 >/proc/sys/kernel/shmmax

You could put these commands into a script run at boot-time.

Alternatively, you can use sysctl(8), if available, to control these parameters. Look for a file called /etc/sysctl.conf and add lines like the following to it:

kernel.shmall = 134217728
kernel.shmmax = 134217728

This file is usually processed at boot time, but sysctl can also be called explicitly later.

Other parameters are sufficiently sized for any application. If you want to see for yourself look into /usr/src/linux-2.4/include/asm-xxx/shmparam.h and /usr/src/linux-2.4/include/linux/sem.h.
Resource Limits

Linux enforces various kinds of resource limits that might interfere with the operation of your PostgreSQL server. Of importance are especially the limits on the number of processes per user, the number of open files per process, and the amount of memory available to a process. Each of these have a "hard" and a "soft" limit. The soft limit is what actually counts but it can be changed by the user up to the hard limit. The hard limit can only be changed by the root user. The system call setrlimit is responsible for setting these parameters. The shell's built-in command ulimit (Bourne shells) or limit (csh) is used to control the resource limits from the command line.

On Linux, /proc/sys/fs/file-max determines the maximum number of files that the kernel will allocate. It can be changed by writing a different number into the file or by adding an assignment in /etc/sysctl.conf. The maximum limit of files per process is fixed at the time the kernel is compiled.

The PostgreSQL server uses one process per connection so you should provide for at least as many processes as allowed connections, in addition to what you need for the rest of your system. This is usually not a problem but, if you run several servers on one machine, things might get tight.

The factory default limit on open files is often set to "socially friendly" values that allow many users to coexist on a machine without using an inappropriate fraction of the system resources. If you run many servers on a machine, this is perhaps what you want, but on dedicated servers you may want to raise this limit.
```

#### 24.1.1.1 Determine system limits

```text
				cat /etc/sysctl.conf
```

#### 24.1.1.2 Setting semaphore system limits

```text
				Setting Semaphore Parameters 

				To determine the values of the four described semaphore parameters, run: 
				# cat /proc/sys/kernel/sem
				250     32000   32      128
				
				These values represent SEMMSL, SEMMNS, SEMOPM, and SEMMNI. 
				
				Alternatively, you can run: 
				# ipcs -ls
				All four described semaphore parameters can be changed in the proc file system without reboot: 
				# echo 250 32000 100 128 > /proc/sys/kernel/sem
				Alternatively, you can use sysctl(8) to change it: 
				sysctl -w kernel.sem="250 32000 100 128"
				To make the change permanent, add or change the following line in the file /etc/sysctl.conf. This file is used during the boot process. 
				echo "kernel.sem=250 32000 100 128" >> /etc/sysctl.conf

				To make sure initial higher values are not overwritten do:
				$ awk ' ($1 < 1000) ||  ($2 < 32000) || ($3 < 320) || ($4 < 4090) {print "INC_SEM"}'   /proc/sys/kernel/sem  | grep 'INC_SEM' && echo 1000 32000 320 4096 > /proc/sys/kernel/sem
```

#### 24.1.1.3 Monitoring semaphore usage

```text
				use ipcs -s to monitor semaphore usage
				use ipcrm -s to remove semaphores of killed processes
				ipcs - to monitor semaphore usage (for example: while [ 1 ]; do ipcs -su ; sleep 2; done )
				lsof - to monitor connections to db (for example: while [ 1 ]; do sudo lsof -i :2638 | grep rt_d | wc -l; sleep 1; done )
```

### 24.1.2 Debugging in Linux

#### 24.1.2.1 Get the trace from a running process

```text
				ptrace [pid] 
				or dump into file ptrace [pid] > file
```

#### 24.1.2.2 Get information about process (PID) and threads (TID)

```text
alias prstat='clear;PS -P `pgrep PROCESS_NAME` -Lo pid,tid,%cpu,vsize,psr,stat | grep PID; while [ 1 ]; do ps -p `pgrep PROCESS_NAME` -Lo pid,tid,%cpu,vsize,psr,stat | grep -v PID | sort -rnk3;tput cup 1 0;sleep 3;done'
```

#### 24.1.2.3 Debug a running process

```text
				gdb -p pid
```

#### 24.1.2.3 list open files, lsof

```text
			for more information: $ man lsof
			
			$lsof
```
