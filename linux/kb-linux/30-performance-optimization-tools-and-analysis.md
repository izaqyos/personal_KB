---
type: reference
title: "Performance Optimization, tools and Analysis"
description: "Performance tools and analysis: uptime, cpuinfo and related commands."
tags: [linux, performance, monitoring, reference, legacy]
generated: { by: "human:izaqyos", at: "2026-10-14T00:00:00Z" }
stale_after: "2028-10-14T00:00:00Z"
sources:
  - { id: ip8, resource: "https://man7.org/linux/man-pages/man8/ip.8.html", title: "ip(8) — Linux manual page" }
  - { id: ss8, resource: "https://man7.org/linux/man-pages/man8/ss.8.html", title: "ss(8) — Linux manual page" }
  - { id: debian-nettools, resource: "https://wiki.debian.org/NetToolsDeprecation", title: "Debian Wiki: NetToolsDeprecation" }
status: stable
capture_type: source
legacy_source: "linux/KB_Linux#30"
---

# Performance Optimization, tools and Analysis

[↑ KB_Linux](/linux/kb-linux/README.md)

## 30.1 Tools

### 30.1.1 uptime

```text
# uptime 
 16:11:14 up 4 days, 5 min,  1 user,  load average: 0.01, 0.03, 0.00
In particular, the load average represents the average number of tasks that could be run over a period of 1, 5, and 15 minutes. Runnable tasks are those that either are currently running or those that can run but are waiting for a processor to be available. 

load should be less than # of CPUs as determined by next command:
```

### 30.1.2 cat /proc/cpuinfo

```text
# cat /proc/cpuinfo 
processor       : 0
vendor_id       : GenuineIntel
cpu family      : 6
model           : 44
model name      : Intel(R) Xeon(R) CPU           E5620  @ 2.40GHz
stepping        : 2
cpu MHz         : 2400.085
cache size      : 12288 KB
fdiv_bug        : no
hlt_bug         : no
f00f_bug        : no
coma_bug        : no
fpu             : yes
fpu_exception   : yes
cpuid level     : 11
wp              : yes
flags           : fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush dts acpi mmx fxsr sse sse2 ss nx rdtscp lm constant_tsc ida nonstop_tsc pni cx16 popcnt lahf_lm [8]
bogomips        : 4800.17

processor       : 1
vendor_id       : GenuineIntel
cpu family      : 6
model           : 44
model name      : Intel(R) Xeon(R) CPU           E5620  @ 2.40GHz
stepping        : 2
cpu MHz         : 2400.085
cache size      : 12288 KB
fdiv_bug        : no
hlt_bug         : no
f00f_bug        : no
coma_bug        : no
fpu             : yes
fpu_exception   : yes
cpuid level     : 11
wp              : yes
flags           : fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush dts acpi mmx fxsr sse sse2 ss nx rdtscp lm constant_tsc ida nonstop_tsc pni cx16 popcnt lahf_lm [8]
bogomips        : 4922.79
```

### 30.1.3 vmstat

```text
vmstat is a real-time performance monitoring tool. The vmstat command provides data that can be used to help find unusual system activity, such as high page faults or excessive context switches, which can degrade system performance. The frequency of data display is a user-specified parameter. A sample of the vmstat output is as follows:
Code View: Scroll / Show All

							procs -----------memory---------- ---swap-- -----io---- --system-- ----cpu----
							r   b   swpd  free   buff  cache   si   so    bi    bo   in    cs  us sy id wa
							18  8    0 5626196   3008 122788    0    0 330403   454 2575  4090 91  8  1  0
							18 15    0 5625132   3008 122828    0    0 328767   322 2544  4264 91  8  0  0
							17 12    0 5622004   3008 122828    0    0 327956   130 2406  3998 92  8  0  0
							22  2    0 5621644   3008 122828    0    0 327892   689 2445  4077 92  8  0  0
							23  5    0 5621616   3008 122868    0    0 323171   407 2339  4037 92  8  1  0
							21 14    0 5621868   3008 122868    0    0 323663    23 2418  4160 91  9  0  0
							22 10    0 5625216   3008 122868    0    0 328828   153 2934  4518 90  9  1  0
						

					  


vmstat produces the following information:

    The procs section reports the number of running processes (r) and blocked processes (b) at the time of reporting. You can use the information in this section to check whether the number of running and blocked processes is similar to what you expected. If it isn't, you can check a number of things: the parameters of the applications and kernel, system scheduler and I/O scheduler, the distribution of processes among available processors, and so on.

    The memory section reports the amount of memory being swapped out (swpd), free memory (free), buffer cache for I/O data structures (buff), and cached memory for files read from the disk (cache) in kilobytes. The value of swpd reflects kswapd activities.

    The swap section returns the amount of memory swapped in (si) from disk and swapped out (so) to disk, in kilobytes per second. Note that so reflects the kswapd activity as data is swapped out to the swap area. However, si reflects page fault activities as pages are swapped back to the physical memory.

    The io section reports the number of blocks read in (bi) from the devices and blocks written out (bo) to the devices in kilobytes per second. Pay particular attention to these two fields when running I/O-intensive applications.

    The system section reports the number of interrupts (in) and context switches (cs) per second.

    The cpu section reports the percentage of total CPU time in terms of user (us), system (sy), true idleness (id), and waiting for I/O completion (wa). Perhaps the most common metric is CPU utilization. If wa is large, examine the I/O subsystem—you may conclude, for example, that more I/O controllers and disks are needed to reduce the I/O wait time.

For I/O-intensive workloads, you can monitor bi and bo for the transfer rate and in for the interrupt rate. You can monitor swpd, si, and so to see whether the system is swapping. If so, you can check on the swapping rate. Perhaps the most common metric is CPU utilization and the monitoring of us, sy, id, and wa. If wa is large, you need to examine the I/O subsystem. You might come to the conclusion that more I/O controllers and disks are needed to reduce the I/O wait time.

Like uptime, when vmstat is run without options, it reports a single snapshot of the system. If you run uptime, followed by vmstat, you can get a quick snapshot of how busy the system is and some indication of what the processor is doing with the percentage breakdown of user, system, idle, and waiting on I/O times. In addition, vmstat provides an instantaneous count of the number of runnable processes. Note that uptime provides another view of the number of runnable processes across three time periods: 1 minute, 5 minutes, and 15 minutes. So, if the load average from uptime remains above 1 for any period of time, the number of runnable tasks reported by vmstat should also be near 1.

Because vmstat can also provide information at regular, repeated intervals, you can get a more dynamic view of the system with the following command:

$ vmstat 5 10


This command outputs vmstat information every 5 seconds for 10 iterations. Again, the output should generally show about one runnable task in each line of output if the load average has been 1 for the past 1/5/10 minutes per the output of uptime. Do not be surprised to see peaks of 5, 7, or even 20 in the output of vmstat! Remember that the load average is a calculated average as opposed to an instantaneous snapshot. Both views have their benefits to system performance analysis.

vmstat also provides a rough view of how much time the processor is spending in the operating system, how much time is spent in user application space (including libraries provided as part of the application or operating system), how much time is idle, and how much time the operating system is blocked waiting on I/O. Various workloads have different utilization patterns, so there are no definite rules as to what values are good or bad. In these cases, it is good to have developed a baseline for your workload to help you recognize how the workload has changed as the response time or system load increases. vmstat helps identify which tools can help drill down into any workload degradations or provide clues as to where tuning or reconfiguration can improve workload performance.

The remainder of this section explores a few examples. Imagine a scenario where users are reporting poor response times with a workload. Examining the load average via uptime shows the load average to be very low, possibly even well below the baseline times. Further, vmstat shows that the number of runnable jobs was very low and that the system was relatively idle from the percentage of CPU idle time. An analyst might be interpret these results as a sign that some key process had exited or was blocking waiting on some event that wasn't completing. For instance, some applications use a form of semaphore technique to dispatch work and wait for completion. Perhaps the work was dispatched to a back-end server or other application and that application has for some reason stopped processing all activity. As a result, the application closest to the user is blocked, not runnable, waiting on some semaphore to notify it of completion before it can return information to the user. This might cause the administrator to focus attention on the server application to see why it is unable to complete the requests being queued for it.

In another scenario, suppose that the load average is showing a load in excess of 1, possibly even a full point higher on average than established baselines. In addition, vmstat shows one or two processes always runnable, but the percentage of user time is nearly 100% over an extended period of time. Another tool might be necessary to find out what process or processes are using up 100% of the CPU time—for instance, ps(1) or top(1). ps(1) provides a listing of all processes that currently exist, or some selected subset of processes based on its options. top(1) (or gtop(1)) provides a constantly updating view of the most active processes, where most active can be defined as those processes that are using the most processor time. This data might help identify a runaway process that is doing nothing useful on the system. If vmstat(1) had reported that the processes were mostly running in user space, the administrator might want to connect a debugger such as gdb(1) to the process and use breakpoints, tracing, or other debugging means to understand what the application was doing. If vmstat had reported that most of the time was being consumed as “system” time, other tools such as strace(1) might be used to find out what system calls were being made. If vmstat(1) had reported that a large percentage of time was being spent waiting for I/O completion, tools such sar(1) could be used to see what devices were being used and also provide some possible insights into which applications or file systems were in use, whether the system was swapping or paging, and so on.

vmstat(1) provides some simple insights into the current state of the system. In this section, we looked at the areas that primarily interact with the CPU utilization. However, vmstat(1) also provides some insight into memory utilization, basic swapping activity, and I/O activity. Later sections in this chapter look at more of these areas in detail.
```

### 30.1.4 top and gtop

```text
top and gtop are very useful tools for understanding the tasks and processes that contribute to the high-level information provided by vmstat or uptime. They can show which processes are active and which ones over time are consuming the most processing time or memory.

The top command provides an updating overview of all running processes and the system load. top provides information on CPU load, memory usage, and usage per process, as detailed in the snapshot that follows. Note that it also provides load average snapshots much like uptime(1) does; however, top also provides a breakout of the number of processes that have been created but that are currently sleeping, and the number of processes that are running. “Sleeping” tasks are those that are blocked waiting on some activity, such as a key press from a user at a keyboard, data from a pipe or socket, requests from another host (such as a web server waiting for someone to request content), and so on. top(1) also shows load average for each processor independently, which can help identify any imbalances in scheduling tasks. By default, the output of top is refreshed frequently, and tasks are sorted by percentage of CPU consumption. Other sorting options are possible, such as cumulative CPU consumption or percentage of memory consumption.
Code View: Scroll / Show All

							4:52pm  up  5:08,  3 users,  load average: 2.77, 5.81, 3.15
							37 processes: 36 sleeping, 1 running, 0 zombie, 0 stopped
							CPU0 states:  5.1% user, 53.1% system,  0.0% nice, 41.1% idle
							CPU1 states:  5.0% user, 52.4% system,  0.0% nice, 41.4% idle
							Mem:   511480K av,   43036K used,  468444K free,       0K shrd,    2196K
							Swap:  263992K av,       0K used,  263992K free                 21432K
							PID USER   PRI  NI  SIZE  RSS SHARE STAT %CPU %MEM  TIME COMMAND
							1026 root    2   0   488  488   372  S    1.1  0.0   0:00 chat_s
							7490 root   11   0  1012 1012   816  R    0.5  0.1   0:00 top
							3 root   19  19     0    0     0  SWN  0.3  0.0   0:00 ksoftirqd_C
							4 root   19  19     0    0     0  SWN  0.1  0.0   0:00 ksoftirqd_C
							1 root    9   0   536  536   468  S    0.0  0.1   0:04 init
							2 root    9   0     0    0     0  SW   0.0  0.0   0:00 keventd
							5 root    9   0     0    0     0  SW   0.0  0.0   0:00 kswapd
							6 root    9   0     0    0     0  SW   0.0  0.0   0:00 bdflush
							7 root    9   0     0    0     0  SW   0.0  0.0   0:00 kupdated
							9 root    9   0     0    0     0  SW   0.0  0.0   0:00 scsi_eh_0
							10 root    9   0     0    0     0  SW   0.0  0.0   0:00 khubd
							331 root    9   0   844  844   712  S    0.0  0.1   0:00 syslogd
							341 root    9   0  1236 1236   464  S    0.0  0.2   0:00 klogd
							356 rpc     9   0   628  628   536  S    0.0  0.1   0:00 portmap
						

					  


top includes the following information in its output:

    Line 1 shows the system uptime, including the current time, how long the system has been up since the last reboot, the current number of users, and three load average numbers. The load average numbers represent the average number of processors ready to run during the previous 1, 5, and 15 minutes.

    Line 2 includes the process statistics, including the total number of processes running at the time of the last top screen update. This line also includes the number of sleeping, running, zombie, and stopped processes.

    Lines 3 and 4 display CPU statistics for individual CPUs, including the percentage of CPU time used by the user, system, niced, and idle processes.

    Line 5 provides memory statistics, including total memory available, used memory, free memory, shared memory by different processes, and memory used for buffers.

    Line 6 shows virtual memory or swap statistics, including total available swap space, used swap space, free swap space, and cached swap space.

    The remaining lines show statistics on the individual processes. Some of the more useful top parameters are as follows:

    d	Delay between updates to the data.
    p	Display only the processes specified. Up to 20 processes can be specified.
    S	Display a summary of time being spent by the process and its children. Also displays dead time.
    I	Do not report idle processes.
    H	Show all threads by process.
    N	Number of times to produce the reports.


top also has a dynamic mode to change report information. Activate dynamic mode by pressing the f key. By further pressing the j key, you can add a new column to show the CPU last used by an executing process. This additional information is particularly useful for understanding the process behavior in an SMP system.

This section barely scratches the surface of the types of information that top or gtop provide. For more information on top, see the corresponding man page; for more information on gtop, see the built-in help command.
```

### 30.1.5 sar

```text
sar is part of the sysstat package. sar collects and reports a wide range of system activity in the operating system, including CPU utilization, the rate of context switches and interrupts, the rate of paging in and paging out, the shared memory usage, the buffer usage, and network usage. sar(1) is useful because it constantly collects and logs system activity information in a set of log files, which makes it possible to evaluate performance problems both prior to the reporting of a performance regression event as well as after the event. sar can often be used to pinpoint the time of the event and can also be used to identify specific changes in the system's behavior. sar can also output information with a shorter interval or a fixed number of intervals, much like vmstat. Based on the values in the count and interval parameters, the sar tool writes information the specified number of times spaced at the specified intervals in seconds. In addition, sar can provide averages for a number of data points that it collects. The following example provides statistics on a four-way SMP system by collecting data every 5 seconds:
CPU Utilization

								11:09:13   CPU  %user  %nice  %system %iowait  %idle
								11:09:18   all   0.00   0.00     4.70   52.45  42.85
								11:09:18     0   0.00   0.00     5.80   57.00  37.20
								11:09:18     1   0.00   0.00     4.80   49.40  45.80
								11:09:18     2   0.00   0.00     6.00   62.20  31.80
								11:09:18     3   0.00   0.00     2.40   41.12  56.49
								11:09:23   all   0.00   0.00     3.75   47.30  48.95
								11:09:23     0   0.00   0.00     5.39   37.33  57.29
								11:09:23     1   0.00   0.00     2.80   41.80  55.40
								11:09:23     2   0.00   0.00     5.40   41.60  53.00
								11:09:23     3   0.00   0.00     1.40   68.60  30.00
								. . .
								Average:   all   0.00   0.00     4.22   16.40  79.38
								Average:     0   0.00   0.00     8.32   24.33  67.35
								Average:     1   0.00   0.00     2.12   14.35  83.53
								Average:     2   0.01   0.00     4.16   12.07  83.76
								Average:     3   0.00   0.00     2.29   14.85  82.86
							


One component of CPU consumption by the system is the networking and disk servicing routines. As the operating system generates I/O, the corresponding device subsystems respond by signaling the completion of those I/O requests with hardware interrupts. The operating system counts each of these interrupts; the output can help you visualize the rate of networking and disk I/O activity. sar(1) provides this input. With baselines, it is possible to track the rate of system interrupts, which can be another source of system overhead or an indicator of possible changes to system performance. The –I SUM option can generate the following information, including the total number of interrupts per second. The –I ALL option can provide similar information for each interrupt source (not shown).
Interrupt Rate

								10:53:53         INTR    intr/s
								10:53:58          sum   4477.60
								10:54:03          sum   6422.80
								10:54:08          sum   6407.20
								10:54:13          sum   6111.40
								10:54:18          sum   6095.40
								10:54:23          sum   6104.81
								10:54:28          sum   6149.80
								. . .
								Average:          sum   4416.53
							


A per-CPU view of the interrupt distribution on an SMP machine is available through the sar –A command (the following example is an excerpt from the full output). Note that the IRQ values of the system are 0, 1, 2, 9, 12, 14, 17, 18, 21, 23, 24, and 25. Due to the limited width of the page, interrupts for 9, 12, 14, and 17 have been clipped away.
Interrupt Distribution
Code View: Scroll / Show All

								10:53:53  CPU  i000/s i001/s i002/s ... i018/s  i021/s i023/s i024/s  i025/s
								10:53:58    0 1000.20   0.00   0.00 ...  0.40    0.00    0.00   3.00    0.00
								10:53:58    1    0.00   0.00   0.00 ...  0.00    0.00    0.00   0.00 2320.00
								10:53:58    2    0.00   0.00   0.00 ...  0.00 1156.00    0.00   0.00    0.00
								10:53:58    3    0.00   0.00   0.00 ...  0.00    0.00    0.00   0.00    0.00
								Average:    0  999.94   0.00   0.00 ...  1.20  590.99    0.00   3.73    0.00
								Average:    1    0.00   0.00   0.00 ...  0.00    0.00    0.00   0.00  926.61
								Average:    2    0.00   0.00   0.00 ...  0.00  466.51    0.00   0.00 1427.48
								Average:    3    0.00   0.00   0.00 ...  0.00    0.00    0.00   0.00    0.00
							

					  


The study of interrupt distribution might reveal an imbalance in interrupt processing. The next step should be an examination of the scheduler. One way to tackle the problem is to bind IRQ processing to a specific processor or a number of processors by setting up an affinity for a particular device's interrupt (or IRQ) to a particular CPU or set of CPUs. For example, if 0x0001 is echoed to /proc/irq/ID, where ID corresponds to a device, only CPU 0 will process IRQ for this device. If 0x000f is echoed to /proc/irq/ID, CPU 0 through CPU 3 will be used to process IRQ for this device. For some workloads, this technique can reduce contention on certain heavily used processors. This technique allows I/O interrupts to be processed more efficiently; the I/O performance should increase accordingly.
```

### 30.1.6 Memory Utilization tools

```text
Workloads have a tendency to consume all available memory. Linux provides reasonably efficient access to physical memory and provides access to potentially huge amounts of “virtual” memory. Virtual memory is usually little more than a capability of an operating system to offload less frequently used data to disk storage while presenting the illusion that the system has an enormous amount of physical memory. Unfortunately, the price for offloading memory can be ten or a hundred times more expensive in terms of application latency. Those high latencies can impact application response times dramatically if the memory that is paged out to disk is the wrong memory, or if the application's active memory footprint is larger than the size of physical memory.
```

#### 30.1.6.1 /proc/meminfo and /proc/slabinfo

```text
Many performance problems are caused by insufficient memory, which triggers system swapping. Thus, it is useful to have tools that monitor memory utilization—for example, how the kernel memory is consumed per process or per thread, and how the memory is consumed by the kernel data structures along with their counts and sizes. As with CPU utilization, understanding how both the system and individual processes are behaving is key to tracking down any performance problems caused by memory shortages.
/proc/meminfo and /proc/slabinfo

Linux provides facilities to monitor the utilization of overall system memory resources under the /proc file system—namely, /proc/meminfo and /proc/slabinfo. These two files capture the state of the physical memory. A partial display of /proc/meminfo is as follows:

							MemTotal:      8282420 kB
							MemFree:       7942396 kB
							Buffers:         46992 kB
							Cached:         191936 kB
							SwapCached:          0 kB
							HighTotal:     7470784 kB
							HighFree:      7232384 kB
							LowTotal:       811636 kB
							LowFree:        710012 kB
							SwapTotal:      618492 kB
							SwapFree:       618492 kB
							Mapped:          36008 kB
							Slab:            36652 kB
						


MemTotal gives the total amount of physical memory of the system, whereas MemFree gives the total amount of unused memory.

Buffers corresponds to the buffer cache for I/O operations. Cached corresponds to the memory for reading files from the disk.

SwapCached represents the amount of cache memory that has been swapped out in the swap space.

SwapTotal represents the amount of disk memory for swapping purposes. If an IA32-based system has more than 1GB of physical memory, HighTotal is nonzero.

HighTotal corresponds to memory greater than ~860MB of the physical memory.

LowTotal is the memory used by the kernel. Mapped corresponds to the files that are memory-mapped.

Slab corresponds to the memory used for the kernel data structures. By capturing /proc/meminfo periodically, you can establish a pattern of memory utilization. With the aid of simple scripts and graphics tools, the pattern can be also summarized visually.

To understand kernel memory consumption, examine /proc/slabinfo. A partial display of /proc/slabinfo is as follows:

							tcp_bind_bucket       56    224     32    2    2    1
							tcp_open_request      16     58     64    1    1    1
							inet_peer_cache        0      0     64    0    0    1
							secpath_cache          0      0     32    0    0    1
							flow_cache             0      0     64    0    0    1
						


The first column lists the names of the kernel data structures. To further describe tcp_bind_bucket, there is a total of 224 tcp_bind_bucket objects, 56 of which are active. Each data structure takes up 32 bytes. There are two pages that have at least one active object, and there is a total of two allocated pages. Moreover, one page is allocated for each slab. This information highlights certain data structures that merit more focus, such as those with larger counts or sizes. Thus, by capturing meminfo and slabinfo together, you can begin to understand what elements of the operating system are consuming the most memory. If the values of LowFree or HighFree are relatively small (or smaller than usual), that might indicate that the system is running with more requests for memory than usual, which may lead to a reduction in overall performance or application response times.
ps

To find out how the memory is used within a particular process, use ps for an overview of memory used per process:
```

#### 30.1.6.2 ps memory info

```text
							$ ps aux
							USER PID %CPU %MEM   VSZ  RSS TTY STAT START TIME COMMAND
							root   1  0.0  0.0  1528  528 ?   S    15:24 0:00 init [2]
							root   2  0.0  0.0     0    0 ?   SN   15:24 0:00 [ksoftirqd/0]
							root   3  0.0  0.0     0    0 ?   S<   15:24 0:00 [events/0]
							root   4  0.0  0.0     0    0 ?   S<   15:24 0:00 [khelper]
							root   5  0.0  0.0     0    0 ?   S<   15:24 0:00 [kacpid]
							root  48  0.0  0.0     0    0 ?   S<   15:24 0:00 [kblockd/0]
							root  63  0.0  0.0     0    0 ?   S    15:24 0:00 [pdflush]
							root  64  0.0  0.0     0    0 ?   S    15:24 0:00 [pdflush]
						


The output of the ps aux command shows the total percentage of system memory that each process consumes, as well as its virtual memory footprint (VSZ) and the amount of physical memory that the process is currently using (RSS). You can also use top(1) to sort the process listing interactively to see which processes are consuming the most memory and how that consumption changes as the system runs.
```

#### 30.1.6.3 /proc/pid/maps

```text
After you have identified a few processes of interest, you can look into the specific allocations of memory that the process is using by looking at the layout of the processes' virtual address space. /proc/pid/maps, where pid is the process ID of a particular process as found through ps(1) or top(1), contains all mappings of the processes' address spaces and their sizes. Each map shows the address range that is allocated, the permissions on the page, and the location of the backing store associated with that address range (if any). /proc/pid/maps is not a performance tool per se; however, it provides insight into how memory is allocated. For example, for performance purposes, you can confirm whether a certain amount of shared memory is allocated between 1GB and 2GB in the virtual address space. The preceding map can be used to examine its utilization.

The following output is for process ID 3162:
Code View: Scroll / Show All

							$ cat /proc/3162/maps
							08048000-08056000 r-xp 00000000 03:05 33015   /usr/lib/gnome-applets/battstat-applet-2
							08056000-08058000 rw-p 0000d000 03:05 33015   /usr/lib/gnome-applets/battstat-applet-2
							08058000-08163000 rw-p 08058000 00:00 0
							40000000-40016000 r-xp 00000000 03:02 40006   /lib/ld-2.3.2.so
							40016000-40017000 rw-p 00015000 03:02 40006   /lib/ld-2.3.2.so
							40017000-40018000 rw-p 40017000 00:00 0
							40018000-4001a000 r-xp 00000000 03:05 578493  /usr/X11R6/lib/X11/locale/lib/common/xlcDef.so.2
							4001a000-4001b000 rw-p 00001000 03:05 578493  /usr/X11R6/lib/X11/locale/lib/common/xlcDef.so.2
							4001b000-4001d000 r-xp 00000000 03:05 128867  /usr/lib/gconv/ISO8859-1.so
							4001d000-4001e000 rw-p 00001000 03:05 128867  /usr/lib/gconv/ISO8859-1.so
						4001f000-40023000 r-xp 00000000 03:05 514375  /usr/lib/gtk-2.0/2.4.0/loaders/libpixbufloader-png.so
						40023000-40024000 rw-p 00003000 03:05 514375  /usr/lib/gtk-2.0/2.4.0/loaders/libpixbufloader-png.so
							40025000-40031000 r-xp 00000000 03:05 337881  /usr/lib/libpanel-applet-2.so.0.0.19
							40031000-40032000 rw-p 0000c000 03:05 337881  /usr/lib/libpanel-applet-2.so.0.0.19
							40032000-400d2000 r-xp 00000000 03:05 337625  /usr/lib/libgnomeui-2.so.0.600.1
							400d2000-400d6000 rw-p 0009f000 03:05 337625  /usr/lib/libgnomeui-2.so.0.600.1
							400d6000-400d7000 rw-p 400d6000 00:00 0
							400d7000-400df000 r-xp 00000000 03:05 53      /usr/X11R6/lib/libSM.so.6.0
							400df000-400e0000 rw-p 00007000 03:05 53      /usr/X11R6/lib/libSM.so.6.0
							400e0000-400f4000 r-xp 00000000 03:05 51      /usr/X11R6/lib/libICE.so.6.3
							400f4000-400f5000 rw-p 00013000 03:05 51      /usr/X11R6/lib/libICE.so.6.3
```

#### 30.1.6.4 vmstat

```text
vmstat was introduced in the section on CPU utilization. However, its primary purpose is to monitor memory availability and swapping activity, and it provides an overview of I/O activity. vmstat can be used to help find unusual system activity, such as high page faults or excessive context switches, that can lead to a degradation in system performance. A sample of the vmstat output is as follows:
Code View: Scroll / Show All

							procs -----------memory---------- ---swap-- -----io---- --system-- ----cpu----
							r   b   swpd   free   buff  cache  si   so    bi    bo  in    cs us sy id wa
							18  8      0 5626196   3008 122788  0   0  330403  454 2575  4090 91  8  1  0
							18 15      0 5625132   3008 122828  0   0  328767  322 2544  4264 91  8  0  0
							17 12      0 5622004   3008 122828  0   0  327956  130 2406  3998 92  8  0  0
							22  2      0 5621644   3008 122828  0   0  327892  689 2445  4077 92  8  0  0
							23  5      0 5621616   3008 122868  0   0  323171  407 2339  4037 92  8  1  0
							21 14      0 5621868   3008 122868  0   0  323663   23 2418  4160 91  9  0  0
							22 10      0 5625216   3008 122868  0   0  328828  153 2934  4518 90  9  1  0
						

					  


The memory-related data reported by vmstat includes the following:

    memory reports the amount of memory being swapped out (swpd), free memory (free), buffer cache for I/O data structures (buff), and cached memory for files read from the disk (cache) in kilobytes.

    swap, in kilobytes per second, is the amount of memory swapped in (si) from disk and swapped out (so) to disk.

    io reports the number of blocks read in (bi) from the devices and blocks written out (bo) to the devices in kilobytes per second.

For I/O-intensive workloads, you can monitor bi and bo for the transfer rate, and in for the interrupt rate. You can monitor swpd, si, and so to see whether the system is swapping. If so, you can check on the swapping rate. Perhaps the most common metric is CPU utilization and the monitoring of us, sy, id, and wa. If wa is large, you need to examine the I/O subsystem. You might come to the conclusion that more I/O controllers and disks are needed to reduce the I/O wait time.
```

### 30.1.7 I/O Utilization

```text
Although the overall processor speeds, memory sizes, and I/O speeds continue to increase, I/O throughput and latency are still orders of magnitude slower than equivalent memory access. Additionally, because many workloads have a substantial I/O component, I/O can easily become a significant bottleneck to overall throughput and overall application response times. For I/O-intensive applications, the performance analyst must be able to access tools that help provide insights into the operations of the I/O subsystem.

This section initially looks at disk I/O. A future section looks at networking I/O because the tools to measure throughput and latency for each are different.

For disk I/O, performance is often evaluated in terms of throughput and latency. Disk drives tend to be able to handle large sequential transfers much better than small random transfers. Large sequential transfers allow optimizations such as read ahead or write behind, allow the storage system to reduce head movement and perform full track writes when possible. However, many applications rely on the capability to access data in disparate, often unpredictable locations on the media. As a result, the I/O patterns of various workloads are often a mix of sequential and random I/O, with varying sizes of block transfers.

When evaluating I/O performance on a system, the performance analyst needs to keep in mind several things. The first, and perhaps most obvious (although it is often forgotten), is that I/O performance cannot exceed the performance of the underlying hardware. Although we will not go into much detail on this aspect, it is very helpful when analyzing I/O throughput and latency to understand the system's underlying limitations. For instance, the performance aspects of the storage device, the I/O buses connecting the storage devices (for example, SCSI and Fibre Channel), any limitations imposed by the storage fabric (such as a Fibre Channel Switch), the host bus adapters, the systems interconnect bus (for example, PCI, PCI-X, and Infiniband), and in some cases the system's architecture (such as how host bus adapters perform DMA, how memory is interleaved, and NUMA connectivity) all contribute to the overall performance analysis of the I/O subsystem. In more complex system configurations, it may be helpful to maintain a list of “speeds and feeds” for the system to help distinguish between hardware bottlenecks and software bottlenecks.

To understand software bottlenecks and related performance impacts, the two major considerations are overall I/O throughput and latency of any individual I/O requests. Ideally, a system wants to optimize the data transfer rate to and from the media. However, because the latency of an individual request can be extremely long compared to the speed of the processor, applications can effectively stall waiting for I/O. Take, for example, an application that reads a block of data that provides information on how to access the next block of data, and so on. If the system or application is unable to optimize this pattern, performance is limited to the combined latencies of the I/O subsystem. One common solution to this problem is to perform many similar operations like this simultaneously. Multitasking—the capability of many tasks to run in parallel—allows an application or operating system to schedule many long latency I/O requests simultaneously, even when each application might spend a large portion of the time blocked on an individual request. As a result, the overall efficiency of the I/O subsystem, or the total I/O throughput, might approach the capacity of the underlying I/O subsystem. And, although it is always a goal of the operating system and the individual applications to optimize for overall system throughput, doing so at the expense of end-user response times is not usually an acceptable trade-off.

The underlying I/O subsystem latencies can be severely impacted by the incoming pattern of data transfer requests. For instance, if disk I/O requests alternately ask for a block of I/O at the “beginning” and “end” of the disk media, the physical disk arm may need to make relatively slow adjustments to position the disk head over the selected disk block. This type of access would obviously slow down all accesses to a given device, thereby reducing the number of I/O operations that could be completed over a period of time. Further, such a bizarre access pattern would likely reduce not just the number of devices per logical drive, but also the overall I/O transfer rate.

Another solution to multitasking is to ensure that the data requests from the applications and operating system are well distributed among the disks connected to the system. Distributing the I/O requests to multiple disks effects a level of parallelism that further reduces the performance impacts of the individual latencies of disk drives. Redistributing the application data among a number of disk devices often requires a solid understanding of the workload as well as an understanding of the data access patterns of that workload.

Although system monitoring tools do not provide the capability to track each I/O that a particular application issues, there are tools that allow a performance analyst to monitor the total number of I/Os processed by the system, the number of I/O operations per logical disk drive, and the overall I/O transfer rate. The two primary tools discussed in the next sections are iostat(1) and sar(1). You can use these tools to understand what the I/O bottlenecks are, what disks or interconnects are underutilized, and what the latencies are from a system perspective (as opposed to an application perspective).

Before exploring the specific tools, keep in mind that there are many techniques for increasing I/O performance. These techniques include purely hardware-related solutions (such as using disk drives that have higher revolutions per minute, thereby providing lower I/O latencies, larger disk cache sizes, or I/O controller cache sizes). They also include improved data transfer rates for both reads and writes, and/ increases in I/O bus speeds or I/O fabric speeds, which both increase data transfer rates and reduce I/O latencies. Also, some disk drives and disk storage subsystems provide multiported logical or physical disks, allowing parallel I/O from a single disk, which again increases potential I/O throughput. Additionally, hardware and software RAID (Redundant Array of Independent Disks) were designed to increase access parallelism by striping data across multiple disk drives.

The tools discussed in the following sections provide data that can be useful in considering hardware and software solutions as well as improvements in data layout.
```

#### 30.1.7.1 iostat

```text
The iostat command monitors system I/O activities by observing how long the physical disks are active in relation to their average transfer rates. The iostat command generates reports that can be used to change system configuration to better balance the I/O load among physical disks. iostat(1) also provides CPU utilization that can sometimes be useful in comparing directly against the I/O activities. If no display interval is given, iostat gives out I/O information since the system was last booted. If a display interval is given, the first set of output represents total activity since boot time, and subsequent displays only show the delta activities. The following display corresponds to copying files from /dev/sdo7 to /dev/sds7, /dev/sdp7 to /dev/sdt7, and /dev/sdr7 to /dev/sdu7:

							avg-cpu:  %user   %nice    %sys %iowait   %idle
						|	0.21    0.00    0.80    2.07   96.92
						|	Device:  tps Blk_read/s Blk_wrtn/s   Blk_read   Blk_wrtn
						|	sdx     0.00       0.00      0.00         32          0
						|	sdw     0.00       0.00      0.00         32          0
						|	sdv     0.00       0.00      0.00         32          0
						|	sdu     2.49       0.05   1443.46       2778   79552392
						|	sdt     4.94       0.10   2871.73       5322  158268008
						|	sds     4.95       0.10   2860.91       5330  157671720
						|	sdr    30.20    1518.55      0.42   83690898      23288
						|	sdq    60.25    2902.76      0.92  159978258      50896
						|	sdp     0.00       0.01      0.00        378         24
						|	sdo    59.49    2883.87      0.90  158937034      49520
						


iostat reports CPU utilization similar to how it is provided by the top tool. It splits the CPU time into user, nice, system, I/O wait, and system idle. It is followed by the disk utilization report. The disk header is followed by lines of disk statistics, where each line reports the activities of one logical disk that is configured. The tps column represents the number of I/O requests that are issued to the logical disk. However, the size of the I/O requests is not given. Blk_read/s and Blk_wrtn/s represent the amount of data read from and written to the logical drive in a number of blocks per second. Again, the block size is not given. Finally, Blk_read and Blk_wrtn correspond to the amount of data read from and written to the logical drive in a number of blocks per second, without specifying the block's size.

The –k option displays statistics in kilobytes, the -p option gets per-partition statistics, and the -x option gets information such as average wait time and average service time. In the data, the count on Blk_read of sdo is very close to the count of Blk_wrtn of sds, as data is copied from sdo7 to sds7. In addition, the rate of reads is slightly higher than the rate of writes. This report can highlight disk I/O bottlenecks, if any, and helps database designers lay out data to achieve higher access parallelism.
```

#### 30.1.7.2 sar

```text
sar is included in the sysstat package. sar collects and reports a wide range of system activities in the operating system. Activities include I/O operations, CPU utilization, the rate of context switches and interrupts, the rate of paging in and paging out, and the use of shared memory, buffer, and network. Based on the values in the count and interval parameters, sar writes information the specified number of times spaced at the specified intervals in seconds. For example, the command sar –b 3 12 reports disk usage every 3 seconds for a total of 12 seconds. In addition, at the end of data collection, average statistics are given. sar is a very option-rich tool. The remainder of this section discusses a few features of the tool:

    sar displays I/O statistics similar to iostat. sar provides the total number of I/O operations (tps), which is further split into read operations (rtps) and write operations (wtps). sar also provides the rates of read and write operations under bread/s and bwrtn/s. The following data is collected every 2 seconds for a total of 18 seconds. At the end of the data collection, the averages of five fields are given. However, operations for individual logical drives are not given.

    									12:59:15       tps     rtps     wtps   bread/s   bwrtn/s
    									12:59:17     37.50    37.50     0.00    396.00      0.00
    									12:59:19     66.50    66.50     0.00  16140.00      0.00
    									12:59:21    268.50   268.50     0.00  66560.00      0.00
    									12:59:23    333.50   261.50    72.00  64548.00   9620.00
    									12:59:25    153.50    40.50   113.00   9728.00  27984.00
    									12:59:27    133.00     5.00   128.00   1024.00  31744.00
    									12:59:29    119.50     7.50   112.00   1536.00  27776.00
    									12:59:31    133.00     5.00   128.00   1024.00  31744.00
    									Average:    155.63    86.50    69.13  20119.50  16108.50
    								

    sar provides data on CPU utilization for individual processors as well as for the whole system. This particular feature is especially useful in multiprocessor environments. If some processors do more work than others, the display clearly shows. You can then check whether the imbalanced use of processors is from, for example, the applications or the scheduler of the kernel. The following data is collected from a four-way SMP system every 5 seconds:

    									11:09:13   CPU  %user  %nice   %system   %iowait  %idle
    									11:09:18   all   0.00   0.00      4.70     52.45  42.85
    									11:09:18     0   0.00   0.00      5.80     57.00  37.20
    									11:09:18     1   0.00   0.00      4.80     49.40  45.80
    									11:09:18     2   0.00   0.00      6.00     62.20  31.80
    									11:09:18     3   0.00   0.00      2.40     41.12  56.49
    									11:09:23   all   0.00   0.00      3.75     47.30  48.95
    									11:09:23     0   0.00   0.00      5.39     37.33  57.29
    									11:09:23     1   0.00   0.00      2.80     41.80  55.40
    									11:09:23     2   0.00   0.00      5.40     41.60  53.00
    									11:09:23     3   0.00   0.00      1.40     68.60  30.00
    									. . .
    									Average:   all   0.00   0.00      4.22     16.40  79.38
    									Average:     0   0.00   0.00      8.32     24.33  67.35
    									Average:     1   0.00   0.00      2.12     14.35  83.53
    									Average:     2   0.01   0.00      4.16     12.07  83.76
    									Average:     3   0.00   0.00      2.29     14.85  82.86
    								

    sar also provides interrupt information among the processors:
    Code View: Scroll / Show All

    									10:53:53  CPU  i000/s  i001/s  i002/s  i003/s  i004/s  i005/s  i006/s  i007/s
    									10:53:58    0 1000.20    0.00    0.00    0.40    0.00    0.00    3.00    0.00
    									10:53:58    1    0.00    0.00    0.00    0.00    0.00    0.00    0.00 2320.00
    									10:53:58    2    0.00    0.00    0.00    0.00 1156.00    0.00    0.00    0.00
    									10:53:58    3    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00
    									Average:    0  999.94    0.00    0.00    1.20  590.99    0.00    3.73    0.00
    									Average:    1    0.00    0.00    0.00    0.00    0.00    0.00    0.00  926.61
    									Average:    2    0.00    0.00    0.00    0.00  466.51    0.00    0.00 1427.48
    									Average:    3    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00
    								

    					  

The study of interrupt distribution reveals an imbalance of interrupt processing. One method to tackle this imbalance is to affinitize IRQ processing to a specific processor or to a number of processors. For example, if 0x0001 is echoed to /proc/irq/ID, where ID corresponds to a device, only CPU 0 will process IRQ for this device. If 0x000f is echoed to /proc/irq/ID, CPU 0 through CPU 3 will be used to process IRQ for this device. For some workloads, this technique can reduce contention on certain heavily used processors. This technique allows I/O interrupts to be processed more efficiently, causing the I/O performance to increase accordingly.
```

### 30.1.8 Network Utilization

> Updated 2026-10 to current practice.[^ip8][^ss8][^debian-nettools]

The article below predates the move away from **net-tools** (`ifconfig`, `netstat`, `route`, `arp`). net-tools is no longer actively developed and is often not installed by default on current distributions. Use **iproute2** instead (`ip`, `ss`, `nstat`), which talks to the kernel over netlink.[^debian-nettools][^ip8] Equivalents:

| net-tools (legacy) | iproute2 (current) |
|--------------------|--------------------|
| `ifconfig` / `ifconfig -a` | `ip addr` (`ip -br addr` for a short view), `ip link` |
| `netstat -i` (interface counters) | `ip -s link` |
| `netstat -tulpn` (listening sockets) | `ss -tulpn` |
| `netstat -an` (all sockets) | `ss -an` |
| `netstat -s` (protocol stats) | `nstat -az` (or `ss -s` for a socket summary) |
| `netstat -r` / `route -n` | `ip route` |
| `netstat -g` | `ip maddr` |
| `arp -a` / `arp -d <ip>` | `ip neigh` / `ip neigh del <ip> dev <iface>` |

```bash
ip -br addr                # interfaces, state, addresses
ip -s link show eth0       # per-interface RX/TX packets, errors, drops
ss -tulpn                  # listening TCP/UDP sockets with owning process
ss -tn state established   # established TCP connections
ip route get 1.1.1.1       # which route/interface a packet would use
```

Ethereal (mentioned below) was renamed **Wireshark** in 2006. `tshark` is its CLI.

```text
Computer networking is a major computer discipline by itself as it has become ubiquitous. The government, private companies, and the mass media heavily rely on the Internet to function. The World Wide Web, e-mail, instant messaging, and so on have made the world much smaller, putting dispersed countries much closer than ever before. Search engines are very popular in getting information to your fingertips in a fraction of a second. eBusiness has taken business to the next level, where people, without leaving the place of their comfort, can shop, bank, trade stocks, play games with remote partners, collaborate on work, and so on. All these are made possible through advances in computer networking such as high-speed and high-bandwidth networks. Moreover, these advances facilitate new computer infrastructures such as cluster networks, storage networks, and multitiered setups. Tanenbaum has very good coverage of major topics in this field, such as the TCP/IP protocol suite, circuit and packet switching, wireless communications, security, and voice and data transmission.

Linux not only offers many of the powerful network capabilities that other major operating systems provide, but it also surpasses them through additional features such as masquerading. The Linux kernel supports several networking protocols such as TCP/IP, IPX (Internetwork Packet Exchange), and AppleTalk DDP, and it supports features such as packet forwarding, firewall operations, proxy, masquerading, tunneling, and aliasing.

Many network monitoring tools available in Linux help you evaluate the performance of any Linux network. Some of these tools can also be used to troubleshoot network problems along with monitoring performance. The Linux kernel makes a large amount of networking system information available to the user, helping you monitor the health of the network and detect problems in configuration, runtime, and performance.

This section explores only some of the tools that are readily available in most major Linux distributions. In this section, we look at the network tools netstat, nfsstat, tcpdump, ethtool, snmp, ifport, ifconfig, route, arp, ping, traceroute, host, and nslookup.

System and network administrators use some of these tools every day. Tools such as ping, route, arp, traceroute, ethtool, and tcpdump are used to determine network problems. These tools can be described as follows:

    The command ping ipaddress/hostname shows if a computer is operating and if network connections are intact. ping uses the Internet Control Message Protocol (ICMP) Echo function. A small packet is sent through the network for a given IP address. If a reply to the packet is received, the computer network connection is alive. It also tells how many hops lie between the source computer and the destination computer.

    The route command can be used to display the route table, add a route, delete a route to the table, and flush all the routes.

    The arp command is useful if ping does not work—that is, if the network connection is not alive—to determine the root cause of the problem. The arp -a command can be used to make sure that the hardware address is correctly associated with the right system. The other options available with this command include flushing the arp cache, adding to the cache.

    The IRRTToolset (Internet Routing Register Toolset) makes routing information more convenient and useful for network engineers by providing tools for automated router configuration, routing policies analysis, and maintenance.

    ifconfig determines a host's media access control address. If another host with a duplicate IP address exists on the network, the arp cache may have had the media access control address for the other computer placed in it, in which case, the arp command can be used to delete the saved address in the cache and add the correct address to the arp cache.

    traceroute tracks one of the possible routing pathways. It can measure the time taken to travel between each hop (router) and identify the hop's address as the packet travels through the network.

    ethtool queries and changes the settings of an Ethernet device. The devices are assigned a number for identification, such as eth0, eth1… ethn for n Ethernet devices in the system. This tool uses this device name to query/change the settings.

    tcpdump sniffs network packets. It captures all the packets that are seen at the computer. It can be used for network monitoring, protocol debugging, and data acquisition. tcpdump puts the NIC into promiscuous mode in order to capture all the packets going through the wire. Numerous options exist to filter the output down to only those packets of interest. The drawback with tcpdump is that the buffer can overflow and wrap around. tcpdump on high-bandwidth networks tends to drop packets—that is, tcpdump cannot keep up with the rate of the packets.

    ethereal is another network sniffing tool similar to tcpdump. ethereal can read capture files from tcpdump.

    host is a tool used to retrieve the host name for a given IP address from the Domain Name System. This tool is much more flexible than nslookup and is suited for use in shell scripts.

    Some of the network security tools that are available on Linux include tools such as snort (a network intrusion detection system), dsniff (a suite of powerful network auditing and penetrating-testing tools), and SAINT (Security Administrator's Integrated Network Tool).

Network Statistics

The netstat utility, available in the net-tools package, displays a large amount of information related to the networking subsystem.

netstat is one of the most frequently used tools for monitoring network connections on a Linux server. netstat displays a list of active sockets for each network protocol, such as TCP and UDP. It also provides information about network routes and cumulative statistics for network interfaces, including the number of incoming and outgoing packets and the number of packet collisions. The netstat output that follows shows a number of network protocol statistics and routing information, such as Internet protocol (IP), transport control protocol (TCP), and user datagram protocol (UDP). From the statistics, you can tell whether the number of packets received is higher or lower than expected. This tool can easily be used to investigate performance degradation between kernels.

Without any arguments, netstat displays a list of the existing network sockets and their connection information. All protocol families are displayed, including UNIX domain sockets. The following are typical lines from sample output:
Code View: Scroll / Show All

							$ netstat
							Active Internet connections (servers and established)
							Proto Recv-Q Send-Q Local Address     Foreign Address     State
							tcp        0      0 *:32768          *:*                LISTEN
							tcp        0      0 *:smux           *:*                LISTEN
							tcp        0      0 *:9099           *:*                LISTEN
							tcp        0      0 *:sunrpc         *:*                LISTEN
							tcp        0      0 *:x11            *:*                LISTEN
							tcp        0      0 *:http           *:*                LISTEN
							tcp        0      0 *:ftp            *:*                LISTEN
							tcp        0      0 *:ssh            *:*                LISTEN
							tcp        0      0 *:telnet         *:*                LISTEN
							tcp        0      0 nethostA:smtp    *:*                LISTEN
							tcp        0      0 nethostA:32974   nethostB:ssh       ESTABLISHED
							tcp        0      0 nethostA:32996   nethostB:ssh       ESTABLISHED
							tcp        0      0 nethostA:33002   64.233.161.99:http ESTABLISHED
							tcp        0      0 nethostA:33005   nethostB:ftp       ESTABLISHED
							udp        0      0 *:32768          *:*
							udp        0      0 *:snmp           *:*
							udp        0      0 *:sunrpc         *:*
							Active UNIX domain sockets (servers and established)
							Proto RefCnt Flags       Type       State         I-Node Path
							unix  2      [ ACC ]     STREAM     LISTENING     2012   /dev/gpmctl
							unix  2      [ ACC ]     STREAM     LISTENING     159792 /tmp/ksocket-nivedita/kdeinit-:0
							unix  2      [ ACC ]     STREAM     LISTENING     2210   /tmp/.X11-unix/X0
							unix  2      [ ACC ]     STREAM     LISTENING     79840  /tmp/.ICE-unix/dcop15789-1077867386
						

					  


The first column indicates the protocol family of the socket, which is commonly either tcp (transport control protocol), udp (user datagram protocol), or unix (UNIX domain socket). The second and third columns indicate the amount of data, in bytes, that is currently present in receive and send socket queues. The next columns list the local and remote address and port information. The last column displays the protocol state that the socket is currently in.

The IP addresses are normally translated into host names (nethostA, nethostB) unless the -n flag is provided to netstat.

To display only select address families, their corresponding flags can be provided. For example, netstat --tcp or -t displays only the TCP sockets present. A full listing of the flags for the individual families is available in the netstat man page.

The asterisk (*) indicates a wildcard. For the local address, this is typical of listener processes, which listen on all the local interfaces. Remote host address and port information is displayed when the socket has made a connection to a remote host and is in established state. You see ssh, http, and ftp connections in progress in the preceding display.
Displaying Interface Information

This information is identical to that displayed by the ifconfig command. It is a listing of the statistics provided by the interface. These include the MTU (maximum transmission unit) and counts of packets received and sent that were successful, erroneous in some way, dropped, or overflowed.
Code View: Scroll / Show All

$ netstat –i

Kernel Interface table
							Iface   MTU Met   RX-OK RX-ERR RX-DRP RX-OVR   TX-OK TX-ERR TX-DRP TX-OVR Flg
							eth0   1500 0     21941      0     0      0   11998      0     0      0 BMRU
							lo    16436 0       795      0     0      0     795      0     0      0 LRU
						

					  


TCP/IP Protocol Statistics

The Linux kernel supports the statistics counters specified in RFC 2012 as part of the Simple Network Management Protocol (SNMP) Management Information Base (MIB). It also implements a large number of counters that are Linux-specific and capture network protocol events, primarily TCP.

The netstat utility displays most, but not all, of the counters present in the kernel. To see the full list of the events being counted, view the content of the /proc/net/snmp and /proc/net/netstat files. The former contains the RFC 2012 counters, and the latter contains the extended Linux-specific MIB. The following is a sample listing of SNMP counters produced by the netstat –s command:
Code View: Scroll / Show All

							netstat -s
							Ip:
							662968 total packets received
							0 forwarded
							0 incoming packets discarded
							659592 incoming packets delivered
							162297 requests sent out
							Tcp:
							5721 active connections openings
							39 passive connection openings
							0 failed connection attempts
							0 connection resets received
							1 connections established
							136759 segments received
							152791 segments send out
							20660 segments retransmited
							3 bad segments received.
							1165 resets sent
							Udp:
							14031 packets received
							15 packets to unknown port received.
							0 packet receive errors
							7519 packets sent
						

					  


Moreover, network communication involves heavy interrupt processing. Thus, in conjunction with netstat, vmstat can be used to capture the number of interrupts, and sar can be used to determine the spread of interrupt processing.
nfsstat

Network File System (NFS) is a technique to incorporate a file system from a remote machine into the local file system—that is, NFS uses the same read and write interface to access data remotely as the one used locally. nfsstat is a simple tool that prints NFS kernel statistics. nfsstat prints the counts of NFS API calls during a workload. In the following example, the server is running an I/O workload. Output from nfsstat shows the counts of reads and writes, which can be used for debugging purposes. The counts of reads and writes can also be used to understand performance issues.

							Server nfs v3:
							null       getattr    setattr    lookup     access     readlink
							0       0% 8       0% 0       0% 6      0% 43      0% 0       0%
							read       write      create     mkdir      symlink    mknod
							262242 44% 328004  55% 2       0% 0       0% 0       0% 0       0%
							remove     rmdir      rename     link       readdir    readdirplus
							3       0% 0       0% 0       0% 0       0% 0       0% 0      0%
							fsstat     fsinfo     pathconf   commit
							1       0% 1       0% 0       0% 2586    0%
```

### 30.1.9 perf stat

```text
https://man7.org/linux/man-pages/man1/perf-stat.1.html

performance analysis tool
|   examples:
|      $ perf stat — make
|   
|              Performance counter stats for 'make':
|   
|                 83723.452481      task-clock:u (msec)       #    1.004 CPUs utilized
|                            0      context-switches:u        #    0.000 K/sec
|                            0      cpu-migrations:u          #    0.000 K/sec
|                    3,228,188      page-faults:u             #    0.039 M/sec
|              229,570,665,834      cycles:u                  #    2.742 GHz
|              313,163,853,778      instructions:u            #    1.36  insn per cycle
|               69,704,684,856      branches:u                #  832.559 M/sec
|                2,078,861,393      branch-misses:u           #    2.98% of all branches
|   
|              83.409183620 seconds time elapsed
|   
|              74.684747000 seconds user
|               8.739217000 seconds sys
```

#### 30.1.9.1 user perf test to troubelshoot cache misses

```text
https://www.reddit.com/r/C_Programming/comments/hhpqh5/why_does_using_a_mutex_increase_execution_speed/

Q.
TL;DR - Why does using a mutex in the code below increase the execution speed?

Code

#include <stdio.h>
#include <pthread.h>
#include <time.h>
#include <string.h>
#include <stdbool.h>

int counter = 0;
bool use_lock = false;
pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;

void* increment_counter(void* arg) {
    if (use_lock)
        pthread_mutex_lock(&lock);

    for (int i = 0; i < 1e6; i++) {
        counter++;
    }

    if (use_lock)
        pthread_mutex_unlock(&lock);

    return NULL;
}

int main(int argc, char** argv) {
    if (argc != 2) {
        printf("Usage:\n"
               "To run using a mutex: ./main 1\n"
               "To run without using a mutex: ./main 0\n");
        return 0;
    }
    if (strcmp(argv[1], "1") == 0) {
        use_lock = true;
    }

    clock_t start, end;
    pthread_t p1, p2;

    start = clock();
    pthread_create(&p1, NULL, increment_counter, NULL);
    pthread_create(&p2, NULL, increment_counter, NULL);
    pthread_join(p1, NULL);
    pthread_join(p2, NULL);
    end = clock();

    printf("counter: %d\n", counter);
    printf("elapsed time: %fs\n", ((double)(end - start)) / CLOCKS_PER_SEC);
    return 0;
}
Build

Built on Ubuntu 18.04 with gcc version 7.5.0

$ gcc main.c -o main -pthread
Run

Here are the typical results after running each case many times:

$./main 0
counter: 1240895
elapsed time: 0.017318s

$./main 1
counter: 2000000
elapsed time: 0.007553s
Question

What makes ./main 1 consistently faster than ./main 0?

A.

Could be cache contention. If the cache line containing counter is continually bouncing between cores access to it will be slower.

Look at the L1D cache misses, for instance:

|  $ perf stat -e L1-dcache-loads,L1-dcache-load-misses ./main 0
|  counter: 1057748
|  elapsed time: 0.015411s
|  
|   Performance counter stats for './main 0':
|  
|           6,534,727      L1-dcache-loads:u                                             (58.37%)
|             537,865      L1-dcache-load-misses:u   #    8.23% of all L1-dcache hits    (66.33%)
|  
|         0.010624321 seconds time elapsed
|  
|         0.017009000 seconds user
|         0.001016000 seconds sys


|   $ perf stat -e L1-dcache-loads,L1-dcache-load-misses ./main 1
|   counter: 2000000
|   elapsed time: 0.010670s
|   
|    Performance counter stats for './main 1':
|   
|            6,298,272      L1-dcache-loads:u                                             (61.02%)
|                9,410      L1-dcache-load-misses:u   #    0.15% of all L1-dcache hits    (65.89%)
|   
|          0.011877574 seconds time elapsed
|   
|          0.009174000 seconds user
|          0.002786000 seconds sys
|   		30.1.10
	30.2
```

[^ip8]: ip(8) — Linux manual page
[^ss8]: ss(8) — Linux manual page
[^debian-nettools]: Debian Wiki: NetToolsDeprecation
