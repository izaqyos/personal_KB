---
type: reference
title: Featured Articles
description: Featured article on 20 Linux system monitoring tools such as top and vmstat.
tags: [linux, monitoring, performance, cheatsheet, legacy]
generated: { by: "human:izaqyos", at: "2026-10-14T00:00:00Z" }
stale_after: "2028-10-14T00:00:00Z"
sources:
  - { id: systemctl, resource: "https://man7.org/linux/man-pages/man1/systemctl.1.html", title: "systemctl(1) — Linux manual page" }
  - { id: rhel9-nftables, resource: "https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/configuring_firewalls_and_packet_filters/getting-started-with-nftables_firewall-packet-filters", title: "RHEL 9: Getting started with nftables" }
status: stable
capture_type: source
legacy_source: "linux/KB_Linux#29"
---

# Featured Articles

[↑ KB_Linux](/linux/kb-linux/README.md)

## 29.1 20 Linux System Monitoring Tools Every SysAdmin Should Know

```text
Need to monitor Linux server performance? Try these built-in command and a few add-on tools. Most Linux distributions are equipped with tons of monitoring. These tools provide metrics which can be used to get information about system activities. You can use these tools to find the possible causes of a performance problem. The commands discussed below are some of the most basic commands when it comes to system analysis and debugging server issues such as:

    Finding out bottlenecks.
    Disk (storage) bottlenecks.
    CPU and memory bottlenecks.
    Network bottlenecks.
```

### 29.1.1 #1: top - Process Activity Command

```text
The top program provides a dynamic real-time view of a running system i.e. actual process activity. By default, it displays the most CPU-intensive tasks running on the server and updates the list every five seconds.
Fig.01: Linux top command

Fig.01: Linux top command
Commonly Used Hot Keys

The top command provides several useful hot keys:
Hot Key	Usage
t	Displays summary information off and on.
m	Displays memory information off and on.
A	Sorts the display by top consumers of various system resources. Useful for quick identification of performance-hungry tasks on a system.
f	Enters an interactive configuration screen for top. Helpful for setting up top for a specific task.
o	Enables you to interactively select the ordering within top.
r	Issues renice command.
k	Issues kill command.
z	Turn on or off color/mono


=> Related: How do I Find Out Linux CPU Utilization?
```

### 29.1.2 #2: vmstat - System Activity, Hardware and System Information

```text
The command vmstat reports information about processes, memory, paging, block IO, traps, and cpu activity.
# vmstat 3
Sample Outputs:

procs -----------memory---------- ---swap-- -----io---- --system-- -----cpu------
 r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st
 0  0      0 2540988 529188 5130400    0    0     2    32    4    2  4  1 96  0  0
 1  0      0 2540988 522188 5130400    0    0     0   720 1199  665  1  0 99  0  0
 0  0      0 2540956 522188 5130400    0    0     0     0 1151 1569  4  1 95  0  0
 0  0      0 2540956 522188 5130500    0    0     0     6 1117  439  1  0 99  0  0
 0  0      0 2540940 522188 5130512    0    0     0   536 1189  932  1  0 98  0  0
 0  0      0 2538444 522188 5130588    0    0     0     0 1187 1417  4  1 96  0  0
 0  0      0 2490060 522188 5130640    0    0     0    18 1253 1123  5  1 94  0  0

Display Memory Utilization Slabinfo

# vmstat -m
Get Information About Active / Inactive Memory Pages

# vmstat -a
=> Related: How do I find out Linux Resource utilization to detect system bottlenecks?

		29.1.3 #3: w - Find Out Who Is Logged on And What They Are Doing

w command displays information about the users currently on the machine, and their processes.
# w username
# w vivek
Sample Outputs:

 17:58:47 up 5 days, 20:28,  2 users,  load average: 0.36, 0.26, 0.24
USER     TTY      FROM              LOGIN@   IDLE   JCPU   PCPU WHAT
root     pts/0    10.1.3.145       14:55    5.00s  0.04s  0.02s vim /etc/resolv.conf
root     pts/1    10.1.3.145       17:43    0.00s  0.03s  0.00s w
```

### 29.1.4 #4: uptime - Tell How Long The System Has Been Running

```text
The uptime command can be used to see how long the server has been running. The current time, how long the system has been running, how many users are currently logged on, and the system load averages for the past 1, 5, and 15 minutes.
# uptime
Output:

 18:02:41 up 41 days, 23:42,  1 user,  load average: 0.00, 0.00, 0.00

1 can be considered as optimal load value. The load can change from system to system. For a single CPU system 1 - 3 and SMP systems 6-10 load value might be acceptable.
```

### 29.1.5 #5: ps - Displays The Processes

```text
ps command will report a snapshot of the current processes. To select all processes use the -A or -e option:
# ps -A
Sample Outputs:

  PID TTY          TIME CMD
    1 ?        00:00:02 init
    2 ?        00:00:02 migration/0
    3 ?        00:00:01 ksoftirqd/0
    4 ?        00:00:00 watchdog/0
    5 ?        00:00:00 migration/1
    6 ?        00:00:15 ksoftirqd/1
....
.....
 4881 ?        00:53:28 java
 4885 tty1     00:00:00 mingetty
 4886 tty2     00:00:00 mingetty
 4887 tty3     00:00:00 mingetty
 4888 tty4     00:00:00 mingetty
 4891 tty5     00:00:00 mingetty
 4892 tty6     00:00:00 mingetty
 4893 ttyS1    00:00:00 agetty
12853 ?        00:00:00 cifsoplockd
12854 ?        00:00:00 cifsdnotifyd
14231 ?        00:10:34 lighttpd
14232 ?        00:00:00 php-cgi
54981 pts/0    00:00:00 vim
55465 ?        00:00:00 php-cgi
55546 ?        00:00:00 bind9-snmp-stat
55704 pts/1    00:00:00 ps

ps is just like top but provides more information.
Show Long Format Output

# ps -Al
To turn on extra full mode (it will show command line arguments passed to process):
# ps -AlF
To See Threads ( LWP and NLWP)

# ps -AlFH
To See Threads After Processes

# ps -AlLm
Print All Process On The Server

# ps ax
# ps axu
Print A Process Tree

# ps -ejH
# ps axjf
# pstree
Print Security Information

# ps -eo euser,ruser,suser,fuser,f,comm,label
# ps axZ
# ps -eM
See Every Process Running As User Vivek

# ps -U vivek -u vivek u
Set Output In a User-Defined Format

# ps -eo pid,tid,class,rtprio,ni,pri,psr,pcpu,stat,wchan:14,comm
# ps axo stat,euid,ruid,tty,tpgid,sess,pgrp,ppid,pid,pcpu,comm
# ps -eopid,tt,user,fname,tmout,f,wchan
Display Only The Process IDs of Lighttpd

# ps -C lighttpd -o pid=
OR
# pgrep lighttpd
OR
# pgrep -u vivek php-cgi
Display The Name of PID 55977

# ps -p 55977 -o comm=
Find Out The Top 10 Memory Consuming Process

# ps -auxf | sort -nr -k 4 | head -10
Find Out top 10 CPU Consuming Process

# ps -auxf | sort -nr -k 3 | head -10
```

### 29.1.6 #6: free - Memory Usage

```text
The command free displays the total amount of free and used physical and swap memory in the system, as well as the buffers used by the kernel.
# free
Sample Output:

            total       used       free     shared    buffers     cached
Mem:      12302896    9739664    2563232          0     523124    5154740
-/+ buffers/cache:    4061800    8241096
Swap:      1052248          0    1052248

=> Related: :

    Linux Find Out Virtual Memory PAGESIZE
    Linux Limit CPU Usage Per Process
    How much RAM does my Ubuntu / Fedora Linux desktop PC have?
```

### 29.1.7 #7: iostat - Average CPU Load, Disk Activity

```text
The command iostat report Central Processing Unit (CPU) statistics and input/output statistics for devices, partitions and network filesystems (NFS).
# iostat
Sample Outputs:

| Linux 2.6.18-128.1.14.el5 (www03.nixcraft.in) 	06/26/2009
| avg-cpu:  %user   %nice %system %iowait  %steal   %idle
|            3.50    0.09    0.51    0.03    0.00   95.86
| Device:            tps   Blk_read/s   Blk_wrtn/s   Blk_read   Blk_wrtn
| sda              22.04        31.88       512.03   16193351  260102868
| sda1              0.00         0.00         0.00       2166        180
| sda2             22.04        31.87       512.03   16189010  260102688
| sda3              0.00         0.00         0.00       1615          0

=> Related: : Linux Track NFS Directory / Disk I/O Stats
```

### 29.1.8 #8: sar - Collect and Report System Activity

```text
The sar command is used to collect, report, and save system activity information. To see network counter, enter:
# sar -n DEV | more
To display the network counters from the 24th:
# sar -n DEV -f /var/log/sa/sa24 | more
You can also display real time usage using sar:
# sar 4 5
Sample Outputs:

Linux 2.6.18-128.1.14.el5 (www03.nixcraft.in) 		06/26/2009
06:45:12 PM       CPU     %user     %nice   %system   %iowait    %steal     %idle
06:45:16 PM       all      2.00      0.00      0.22      0.00      0.00     97.78
06:45:20 PM       all      2.07      0.00      0.38      0.03      0.00     97.52
06:45:24 PM       all      0.94      0.00      0.28      0.00      0.00     98.78
06:45:28 PM       all      1.56      0.00      0.22      0.00      0.00     98.22
06:45:32 PM       all      3.53      0.00      0.25      0.03      0.00     96.19
Average:          all      2.02      0.00      0.27      0.01      0.00     97.70

=> Related: : How to collect Linux system utilization data into a file
```

### 29.1.9 #9: mpstat - Multiprocessor Usage

```text
The mpstat command displays activities for each available processor, processor 0 being the first one. mpstat -P ALL to display average CPU utilization per processor:
# mpstat -P ALL
Sample Output:

Linux 2.6.18-128.1.14.el5 (www03.nixcraft.in)	 	06/26/2009
06:48:11 PM  CPU   %user   %nice    %sys %iowait    %irq   %soft  %steal   %idle    intr/s
06:48:11 PM  all    3.50    0.09    0.34    0.03    0.01    0.17    0.00   95.86   1218.04
06:48:11 PM    0    3.44    0.08    0.31    0.02    0.00    0.12    0.00   96.04   1000.31
06:48:11 PM    1    3.10    0.08    0.32    0.09    0.02    0.11    0.00   96.28     34.93
06:48:11 PM    2    4.16    0.11    0.36    0.02    0.00    0.11    0.00   95.25      0.00
06:48:11 PM    3    3.77    0.11    0.38    0.03    0.01    0.24    0.00   95.46     44.80
06:48:11 PM    4    2.96    0.07    0.29    0.04    0.02    0.10    0.00   96.52     25.91
06:48:11 PM    5    3.26    0.08    0.28    0.03    0.01    0.10    0.00   96.23     14.98
06:48:11 PM    6    4.00    0.10    0.34    0.01    0.00    0.13    0.00   95.42      3.75
06:48:11 PM    7    3.30    0.11    0.39    0.03    0.01    0.46    0.00   95.69     76.89

=> Related: : Linux display each multiple SMP CPU processors utilization individually.
```

### 29.1.10 #10: pmap - Process Memory Usage

```text
The command pmap report memory map of a process. Use this command to find out causes of memory bottlenecks.
# pmap -d PID
To display process memory information for pid # 47394, enter:
# pmap -d 47394
Sample Outputs:

47394:   /usr/bin/php-cgi
Address           Kbytes Mode  Offset           Device    Mapping
0000000000400000    2584 r-x-- 0000000000000000 008:00002 php-cgi
0000000000886000     140 rw--- 0000000000286000 008:00002 php-cgi
00000000008a9000      52 rw--- 00000000008a9000 000:00000   [ anon ]
0000000000aa8000      76 rw--- 00000000002a8000 008:00002 php-cgi
000000000f678000    1980 rw--- 000000000f678000 000:00000   [ anon ]
000000314a600000     112 r-x-- 0000000000000000 008:00002 ld-2.5.so
000000314a81b000       4 r---- 000000000001b000 008:00002 ld-2.5.so
000000314a81c000       4 rw--- 000000000001c000 008:00002 ld-2.5.so
000000314aa00000    1328 r-x-- 0000000000000000 008:00002 libc-2.5.so
000000314ab4c000    2048 ----- 000000000014c000 008:00002 libc-2.5.so
.....
......
..
00002af8d48fd000       4 rw--- 0000000000006000 008:00002 xsl.so
00002af8d490c000      40 r-x-- 0000000000000000 008:00002 libnss_files-2.5.so
00002af8d4916000    2044 ----- 000000000000a000 008:00002 libnss_files-2.5.so
00002af8d4b15000       4 r---- 0000000000009000 008:00002 libnss_files-2.5.so
00002af8d4b16000       4 rw--- 000000000000a000 008:00002 libnss_files-2.5.so
00002af8d4b17000  768000 rw-s- 0000000000000000 000:00009 zero (deleted)
00007fffc95fe000      84 rw--- 00007ffffffea000 000:00000   [ stack ]
ffffffffff600000    8192 ----- 0000000000000000 000:00000   [ anon ]
mapped: 933712K    writeable/private: 4304K    shared: 768000K

The last line is very important:

    mapped: 933712K total amount of memory mapped to files
    writeable/private: 4304K the amount of private address space
    shared: 768000K the amount of address space this process is sharing with others

=> Related: : Linux find the memory used by a program / process using pmap command
```

### 29.1.11 #11 and #12: netstat and ss - Network Statistics

```text
The command netstat displays network connections, routing tables, interface statistics, masquerade connections, and multicast memberships. ss command is used to dump socket statistics. It allows showing information similar to netstat. See the following resources about ss and netstat commands:

    ss: Display Linux TCP / UDP Network and Socket Information
    Get Detailed Information About Particular IP address Connections Using netstat Command
```

### 29.1.12 #13: iptraf - Real-time Network Statistics

```text
The iptraf command is interactive colorful IP LAN monitor. It is an ncurses-based IP LAN monitor that generates various network statistics including TCP info, UDP counts, ICMP and OSPF information, Ethernet load info, node stats, IP checksum errors, and others. It can provide the following info in easy to read format:

    Network traffic statistics by TCP connection
    IP traffic statistics by network interface
    Network traffic statistics by protocol
    Network traffic statistics by TCP/UDP port and by packet size
    Network traffic statistics by Layer2 address

Fig.02: General interface statistics: IP traffic statistics by network interface

Fig.02: General interface statistics: IP traffic statistics by network interface
Fig.03 Network traffic statistics by TCP connection

Fig.03 Network traffic statistics by TCP connection
```

### 29.1.13 #14: tcpdump - Detailed Network Traffic Analysis

```text
The tcpdump is simple command that dump traffic on a network. However, you need good understanding of TCP/IP protocol to utilize this tool. For.e.g to display traffic info about DNS, enter:
# tcpdump -i eth1 'udp port 53'
To display all IPv4 HTTP packets to and from port 80, i.e. print only packets that contain data, not, for example, SYN and FIN packets and ACK-only packets, enter:
# tcpdump 'tcp port 80 and (((ip[2:2] - ((ip[0]&0xf)<<2)) - ((tcp[12]&0xf0)>>2)) != 0)'
To display all FTP session to 202.54.1.5, enter:
# tcpdump -i eth1 'dst 202.54.1.5 and (port 21 or 20'
To display all HTTP session to 192.168.1.5:
# tcpdump -ni eth0 'dst 192.168.1.5 and tcp and port http'
Use wireshark to view detailed information about files, enter:
# tcpdump -n -i eth1 -s 0 -w output.txt src or dst port 80
```

### 29.1.14 #15: strace - System Calls

```text
Trace system calls and signals. This is useful for debugging webserver and other server problems. See how to use to trace the process and see What it is doing.
```

### 29.1.15 #16: /Proc file system - Various Kernel Statistics

```text
/proc file system provides detailed information about various hardware devices and other Linux kernel information. See Linux kernel /proc documentations for further details. Common /proc examples:
# cat /proc/cpuinfo
# cat /proc/meminfo
# cat /proc/zoneinfo
# cat /proc/mounts

17#: Nagios - Server And Network Monitoring

Nagios is a popular open source computer system and network monitoring application software. You can easily monitor all your hosts, network equipment and services. It can send alert when things go wrong and again when they get better. FAN is "Fully Automated Nagios". FAN goals are to provide a Nagios installation including most tools provided by the Nagios Community. FAN provides a CDRom image in the standard ISO format, making it easy to easilly install a Nagios server. Added to this, a wide bunch of tools are including to the distribution, in order to improve the user experience around Nagios.

18#: Cacti - Web-based Monitoring Tool

Cacti is a complete network graphing solution designed to harness the power of RRDTool's data storage and graphing functionality. Cacti provides a fast poller, advanced graph templating, multiple data acquisition methods, and user management features out of the box. All of this is wrapped in an intuitive, easy to use interface that makes sense for LAN-sized installations up to complex networks with hundreds of devices. It can provide data about network, CPU, memory, logged in users, Apache, DNS servers and much more. See how to install and configure Cacti network graphing tool under CentOS / RHEL.
```

### 29.1.16 #19: KDE System Guard - Real-time Systems Reporting and Graphing

```text
KSysguard is a network enabled task and system monitor application for KDE desktop. This tool can be run over ssh session. It provides lots of features such as a client/server architecture that enables monitoring of local and remote hosts. The graphical front end uses so-called sensors to retrieve the information it displays. A sensor can return simple values or more complex information like tables. For each type of information, one or more displays are provided. Displays are organized in worksheets that can be saved and loaded independently from each other. So, KSysguard is not only a simple task manager but also a very powerful tool to control large server farms.
Fig.05 KDE System Guard

Fig.05 KDE System Guard {Image credit: Wikipedia}

See the KSysguard handbook for detailed usage.
```

### 29.1.17 #20: Gnome System Monitor - Real-time Systems Reporting and Graphing

```text
The System Monitor application enables you to display basic system information and monitor system processes, usage of system resources, and file systems. You can also use System Monitor to modify the behavior of your system. Although not as powerful as the KDE System Guard, it provides the basic information which may be useful for new users:

    Displays various basic information about the computer's hardware and software.
    Linux Kernel version
    GNOME version
    Hardware
    Installed memory
    Processors and speeds
    System Status
    Currently available disk space
    Processes
    Memory and swap space
    Network usage
    File Systems
    Lists all mounted filesystems along with basic information about each.

Fig.06 The Gnome System Monitor application

Fig.06 The Gnome System Monitor application
Bonus: Additional Tools

A few more tools:

    nmap - scan your server for open ports.
    lsof - list open files, network connections and much more.
    ntop web based tool - ntop is the best tool to see network usage in a way similar to what top command does for processes i.e. it is network traffic monitoring software. You can see network status, protocol wise distribution of traffic for UDP, TCP, DNS, HTTP and other protocols.
    Conky - Another good monitoring tool for the X Window System. It is highly configurable and is able to monitor many system variables including the status of the CPU, memory, swap space, disk storage, temperatures, processes, network interfaces, battery power, system messages, e-mail inboxes etc.
    GKrellM - It can be used to monitor the status of CPUs, main memory, hard disks, network interfaces, local and remote mailboxes, and many other things.
    vnstat - vnStat is a console-based network traffic monitor. It keeps a log of hourly, daily and monthly network traffic for the selected interface(s).
    htop - htop is an enhanced version of top, the interactive process viewer, which can display the list of processes in a tree form.
    mtr - mtr combines the functionality of the traceroute and ping programs in a single network diagnostic tool.
```

## 29.2 Iptables

### 29.2.1 Linux: 20 Iptables Examples For New SysAdmins

```text
by Vivek Gite on December 13, 2011 ? 33 comments? Last updated March 20, 2012

Linux comes with a host based firewall called Netfilter. According to the official project site:

    netfilter is a set of hooks inside the Linux kernel that allows kernel modules to register callback functions with the network stack. A registered callback function is then called back for every packet that traverses the respective hook within the network stack.

This Linux based firewall is controlled by the program called iptables to handles filtering for IPv4, and ip6tables handles filtering for IPv6. I strongly recommend that you first read our quick tutorial that explains how to configure a host-based firewall called Netfilter (iptables) under CentOS / RHEL / Fedora / Redhat Enterprise Linux. This post list most common iptables solutions required by a new Linux user to secure his or her Linux operating system from intruders.
IPTABLES Rules Example

    Most of the actions listed in this post are written with the assumption that they will be executed by the root user running the bash or any other modern shell. Do not type commands on remote system as it will disconnect your access.
    For demonstration purpose I've used RHEL 6.x, but the following command should work with any modern Linux distro.
    This is NOT a tutorial on how to set iptables. See tutorial here. It is a quick cheat sheet to common iptables commands.
```

#### 29.2.1.1 #1: Displaying the Status of Your Firewall

```text
Type the following command as root:
# iptables -L -n -v
Sample outputs:

Chain INPUT (policy ACCEPT 0 packets, 0 bytes)
 pkts bytes target     prot opt in     out     source               destination
Chain FORWARD (policy ACCEPT 0 packets, 0 bytes)
 pkts bytes target     prot opt in     out     source               destination
Chain OUTPUT (policy ACCEPT 0 packets, 0 bytes)
 pkts bytes target     prot opt in     out     source               destination

Above output indicates that the firewall is not active. The following sample shows an active firewall:
# iptables -L -n -v
Sample outputs:

Chain INPUT (policy DROP 0 packets, 0 bytes)
 pkts bytes target     prot opt in     out     source               destination
    0     0 DROP       all  --  *      *       0.0.0.0/0            0.0.0.0/0           state INVALID
  394 43586 ACCEPT     all  --  *      *       0.0.0.0/0            0.0.0.0/0           state RELATED,ESTABLISHED
   93 17292 ACCEPT     all  --  br0    *       0.0.0.0/0            0.0.0.0/0
    1   142 ACCEPT     all  --  lo     *       0.0.0.0/0            0.0.0.0/0
Chain FORWARD (policy DROP 0 packets, 0 bytes)
 pkts bytes target     prot opt in     out     source               destination
    0     0 ACCEPT     all  --  br0    br0     0.0.0.0/0            0.0.0.0/0
    0     0 DROP       all  --  *      *       0.0.0.0/0            0.0.0.0/0           state INVALID
    0     0 TCPMSS     tcp  --  *      *       0.0.0.0/0            0.0.0.0/0           tcp flags:0x06/0x02 TCPMSS clamp to PMTU
    0     0 ACCEPT     all  --  *      *       0.0.0.0/0            0.0.0.0/0           state RELATED,ESTABLISHED
    0     0 wanin      all  --  vlan2  *       0.0.0.0/0            0.0.0.0/0
    0     0 wanout     all  --  *      vlan2   0.0.0.0/0            0.0.0.0/0
    0     0 ACCEPT     all  --  br0    *       0.0.0.0/0            0.0.0.0/0
Chain OUTPUT (policy ACCEPT 425 packets, 113K bytes)
 pkts bytes target     prot opt in     out     source               destination
Chain wanin (1 references)
 pkts bytes target     prot opt in     out     source               destination
Chain wanout (1 references)
 pkts bytes target     prot opt in     out     source               destination

Where,

    -L : List rules.
    -v : Display detailed information. This option makes the list command show the interface name, the rule options, and the TOS masks. The packet and byte counters are also listed, with the suffix 'K', 'M' or 'G' for 1000, 1,000,000 and 1,000,000,000 multipliers respectively.
    -n : Display IP address and port in numeric format. Do not use DNS to resolve names. This will speed up listing.

#1.1: To inspect firewall with line numbers, enter:

# iptables -n -L -v --line-numbers
Sample outputs:

Chain INPUT (policy DROP)
num  target     prot opt source               destination
1    DROP       all  --  0.0.0.0/0            0.0.0.0/0           state INVALID
2    ACCEPT     all  --  0.0.0.0/0            0.0.0.0/0           state RELATED,ESTABLISHED
3    ACCEPT     all  --  0.0.0.0/0            0.0.0.0/0
4    ACCEPT     all  --  0.0.0.0/0            0.0.0.0/0
Chain FORWARD (policy DROP)
num  target     prot opt source               destination
1    ACCEPT     all  --  0.0.0.0/0            0.0.0.0/0
2    DROP       all  --  0.0.0.0/0            0.0.0.0/0           state INVALID
3    TCPMSS     tcp  --  0.0.0.0/0            0.0.0.0/0           tcp flags:0x06/0x02 TCPMSS clamp to PMTU
4    ACCEPT     all  --  0.0.0.0/0            0.0.0.0/0           state RELATED,ESTABLISHED
5    wanin      all  --  0.0.0.0/0            0.0.0.0/0
6    wanout     all  --  0.0.0.0/0            0.0.0.0/0
7    ACCEPT     all  --  0.0.0.0/0            0.0.0.0/0
Chain OUTPUT (policy ACCEPT)
num  target     prot opt source               destination
Chain wanin (1 references)
num  target     prot opt source               destination
Chain wanout (1 references)
num  target     prot opt source               destination

You can use line numbers to delete or insert new rules into the firewall.
#1.2: To display INPUT or OUTPUT chain rules, enter:

# iptables -L INPUT -n -v
# iptables -L OUTPUT -n -v --line-numbers
```

#### 29.2.1.2 #2: Stop / Start / Restart the Firewall

> Updated 2026-10 to current practice.[^systemctl][^rhel9-nftables]

The `service iptables ...` SysV wrappers date from CentOS/RHEL 6. Current distributions use systemd, so services are controlled with `systemctl`. On RHEL/CentOS Stream/Fedora the firewall is usually firewalld, which uses nftables underneath. RHEL 9 deprecates the `iptables-nft` and `ipset` packages and recommends `nft` for complex firewalls.[^rhel9-nftables]

```bash
# firewalld (RHEL / Fedora default)
sudo systemctl stop firewalld
sudo systemctl start firewalld
sudo systemctl restart firewalld
sudo firewall-cmd --reload          # re-apply permanent config without dropping state

# plain nftables service (rules in /etc/sysconfig/nftables.conf or /etc/nftables.conf)
sudo systemctl restart nftables
sudo nft list ruleset               # show everything
sudo nft flush ruleset              # remove all rules (firewall effectively off)
```

Ubuntu usually manages the firewall with `ufw` (`sudo ufw disable` / `sudo ufw enable`).

```text
With legacy iptables (or the iptables-nft compatibility layer) you can use the iptables command itself to stop the firewall and delete all rules. Note: this does not remove rules created natively with nft or firewalld: the iptables command itself to stop the firewall and delete all rules:
# iptables -F
# iptables -X
# iptables -t nat -F
# iptables -t nat -X
# iptables -t mangle -F
# iptables -t mangle -X
# iptables -P INPUT ACCEPT
# iptables -P OUTPUT ACCEPT
# iptables -P FORWARD ACCEPT
Where,

    -F : Deleting (flushing) all the rules.
    -X : Delete chain.
    -t table_name : Select table (called nat or mangle) and delete/flush rules.
    -P : Set the default policy (such as DROP, REJECT, or ACCEPT).
```

#### 29.2.1.3 #3: Delete Firewall Rules

```text
To display line number along with other information for existing rules, enter:
# iptables -L INPUT -n --line-numbers
# iptables -L OUTPUT -n --line-numbers
# iptables -L OUTPUT -n --line-numbers | less
# iptables -L OUTPUT -n --line-numbers | grep 202.54.1.1
You will get the list of IP. Look at the number on the left, then use number to delete it. For example delete line number 4, enter:
# iptables -D INPUT 4
OR find source IP 202.54.1.1 and delete from rule:
# iptables -D INPUT -s 202.54.1.1 -j DROP
Where,

    -D : Delete one or more rules from the selected chain

		29.2.1.4
#4: Insert Firewall Rules

To insert one or more rules in the selected chain as the given rule number use the following syntax. First find out line numbers, enter:
# iptables -L INPUT -n --line-numbers
Sample outputs:

Chain INPUT (policy DROP)
num  target     prot opt source               destination
1    DROP       all  --  202.54.1.1           0.0.0.0/0
2    ACCEPT     all  --  0.0.0.0/0            0.0.0.0/0           state NEW,ESTABLISHED 

To insert rule between 1 and 2, enter:
# iptables -I INPUT 2 -s 202.54.1.2 -j DROP
To view updated rules, enter:
# iptables -L INPUT -n --line-numbers
Sample outputs:

Chain INPUT (policy DROP)
num  target     prot opt source               destination
1    DROP       all  --  202.54.1.1           0.0.0.0/0
2    DROP       all  --  202.54.1.2           0.0.0.0/0
3    ACCEPT     all  --  0.0.0.0/0            0.0.0.0/0           state NEW,ESTABLISHED
```

#### 29.2.1.5 #4: Insert Firewall Rules

```text
To insert one or more rules in the selected chain as the given rule number use the following syntax. First find out line numbers, enter:
# iptables -L INPUT -n --line-numbers
Sample outputs:

Chain INPUT (policy DROP)
num  target     prot opt source               destination
1
```

#### 29.2.1.6 #5: Save Firewall Rules

```text
To save firewall rules under CentOS / RHEL / Fedora Linux, enter:
# service iptables save
In this example, drop an IP and save firewall rules:
# iptables -A INPUT -s 202.5.4.1 -j DROP
# service iptables save
For all other distros use the iptables-save command:
# iptables-save > /root/my.active.firewall.rules
# cat /root/my.active.firewall.rules
```

#### 29.2.1.7 #6: Restore Firewall Rules

```text
To restore firewall rules form a file called /root/my.active.firewall.rules, enter:
# iptables-restore < /root/my.active.firewall.rules
To restore firewall rules under CentOS / RHEL / Fedora Linux, enter:
# service iptables restart
```

#### 29.2.1.8 #7: Set the Default Firewall Policies

```text
To drop all traffic:
# iptables -P INPUT DROP
# iptables -P OUTPUT DROP
# iptables -P FORWARD DROP
# iptables -L -v -n
#### you will not able to connect anywhere as all traffic is dropped ###
# ping cyberciti.biz
# wget http://www.kernel.org/pub/linux/kernel/v3.0/testing/linux-3.2-rc5.tar.bz2
#7.1: Only Block Incoming Traffic

To drop all incoming / forwarded packets, but allow outgoing traffic, enter:
# iptables -P INPUT DROP
# iptables -P FORWARD DROP
# iptables -P OUTPUT ACCEPT
# iptables -A INPUT -m state --state NEW,ESTABLISHED -j ACCEPT
# iptables -L -v -n
### *** now ping and wget should work *** ###
# ping cyberciti.biz
# wget http://www.kernel.org/pub/linux/kernel/v3.0/testing/linux-3.2-rc5.tar.bz2
```

#### 29.2.1.9 #8:Drop Private Network Address On Public Interface

```text
IP spoofing is nothing but to stop the following IPv4 address ranges for private networks on your public interfaces. Packets with non-routable source addresses should be rejected using the following syntax:
# iptables -A INPUT -i eth1 -s 192.168.0.0/24 -j DROP
# iptables -A INPUT -i eth1 -s 10.0.0.0/8 -j DROP
#8.1: IPv4 Address Ranges For Private Networks (make sure you block them on public interface)

|    10.0.0.0/8 -j (A)
|    172.16.0.0/12 (B)
|    192.168.0.0/16 (C)
|    224.0.0.0/4 (MULTICAST D)
|    240.0.0.0/5 (E)
|    127.0.0.0/8 (LOOPBACK)
```

#### 29.2.1.10 #9: Blocking an IP Address (BLOCK IP)

```text
To block an attackers ip address called 1.2.3.4, enter:
# iptables -A INPUT -s 1.2.3.4 -j DROP
# iptables -A INPUT -s 192.168.0.0/24 -j DROP
```

#### 29.2.1.11 #10: Block Incoming Port Requests (BLOCK PORT)

```text
To block all service requests on port 80, enter:
# iptables -A INPUT -p tcp --dport 80 -j DROP
# iptables -A INPUT -i eth1 -p tcp --dport 80 -j DROP

To block port 80 only for an ip address 1.2.3.4, enter:
# iptables -A INPUT -p tcp -s 1.2.3.4 --dport 80 -j DROP
# iptables -A INPUT -i eth1 -p tcp -s 192.168.1.0/24 --dport 80 -j DROP
```

#### 29.2.1.12 #11: Block Outgoing IP Address

```text
To block outgoing traffic to a particular host or domain such as cyberciti.biz, enter:
# host -t a cyberciti.biz
Sample outputs:

cyberciti.biz has address 75.126.153.206

Note down its ip address and type the following to block all outgoing traffic to 75.126.153.206:
# iptables -A OUTPUT -d 75.126.153.206 -j DROP
You can use a subnet as follows:
# iptables -A OUTPUT -d 192.168.1.0/24 -j DROP
# iptables -A OUTPUT -o eth1 -d 192.168.1.0/24 -j DROP
#11.1: Example - Block Facebook.com Domain

First, find out all ip address of facebook.com, enter:
# host -t a www.facebook.com
Sample outputs:

www.facebook.com has address 69.171.228.40

Find CIDR for 69.171.228.40, enter:
# whois 69.171.228.40 | grep CIDR
Sample outputs:

CIDR:           69.171.224.0/19

To prevent outgoing access to www.facebook.com, enter:
# iptables -A OUTPUT -p tcp -d 69.171.224.0/19 -j DROP
You can also use domain name, enter:
# iptables -A OUTPUT -p tcp -d www.facebook.com -j DROP
# iptables -A OUTPUT -p tcp -d facebook.com -j DROP

From the iptables man page:

    ... specifying any name to be resolved with a remote query such as DNS (e.g., facebook.com is a really bad idea), a network IP address (with /mask), or a plain IP address ...
```

#### 29.2.1.13 #12: Log and Drop Packets

```text
Type the following to log and block IP spoofing on public interface called eth1
# iptables -A INPUT -i eth1 -s 10.0.0.0/8 -j LOG --log-prefix "IP_SPOOF A: "
# iptables -A INPUT -i eth1 -s 10.0.0.0/8 -j DROP
By default everything is logged to /var/log/messages file.
# tail -f /var/log/messages
# grep --color 'IP SPOOF' /var/log/messages
```

#### 29.2.1.14 #13: Log and Drop Packets with Limited Number of Log Entries

```text
The -m limit module can limit the number of log entries created per time. This is used to prevent flooding your log file. To log and drop spoofing per 5 minutes, in bursts of at most 7 entries .
# iptables -A INPUT -i eth1 -s 10.0.0.0/8 -m limit --limit 5/m --limit-burst 7 -j LOG --log-prefix "IP_SPOOF A: "
# iptables -A INPUT -i eth1 -s 10.0.0.0/8 -j DROP
```

#### 29.2.1.15 #14: Drop or Accept Traffic From Mac Address

```text
Use the following syntax:
# iptables -A INPUT -m mac --mac-source 00:0F:EA:91:04:08 -j DROP
## *only accept traffic for TCP port # 8080 from mac 00:0F:EA:91:04:07 * ##
# iptables -A INPUT -p tcp --destination-port 22 -m mac --mac-source 00:0F:EA:91:04:07 -j ACCEPT
```

#### 29.2.1.16 #15: Block or Allow ICMP Ping Request

```text
Type the following command to block ICMP ping requests:
# iptables -A INPUT -p icmp --icmp-type echo-request -j DROP
# iptables -A INPUT -i eth1 -p icmp --icmp-type echo-request -j DROP
Ping responses can also be limited to certain networks or hosts:
# iptables -A INPUT -s 192.168.1.0/24 -p icmp --icmp-type echo-request -j ACCEPT
The following only accepts limited type of ICMP requests:
### ** assumed that default INPUT policy set to DROP ** #############
iptables -A INPUT -p icmp --icmp-type echo-reply -j ACCEPT
iptables -A INPUT -p icmp --icmp-type destination-unreachable -j ACCEPT
iptables -A INPUT -p icmp --icmp-type time-exceeded -j ACCEPT
## ** all our server to respond to pings ** ##
iptables -A INPUT -p icmp --icmp-type echo-request -j ACCEPT
```

#### 29.2.1.17 #16: Open Range of Ports

```text
Use the following syntax to open a range of ports:
iptables -A INPUT -m state --state NEW -m tcp -p tcp --dport 7000:7010 -j ACCEPT
```

#### 29.2.1.18 #17: Open Range of IP Addresses

```text
Use the following syntax to open a range of IP address:
## only accept connection to tcp port 80 (Apache) if ip is between 192.168.1.100 and 192.168.1.200 ##
iptables -A INPUT -p tcp --destination-port 80 -m iprange --src-range 192.168.1.100-192.168.1.200 -j ACCEPT

## nat example ##
iptables -t nat -A POSTROUTING -j SNAT --to-source 192.168.1.20-192.168.1.25
```

#### 29.2.1.19 #18: Established Connections and Restaring The Firewall

```text
When you restart the iptables service it will drop established connections as it unload modules from the system under RHEL / Fedora / CentOS Linux. Edit, /etc/sysconfig/iptables-config and set IPTABLES_MODULES_UNLOAD as follows:

IPTABLES_MODULES_UNLOAD = no
```

#### 29.2.1.20 #19: Help Iptables Flooding My Server Screen

```text
Use the crit log level to send messages to a log file instead of console:
iptables -A INPUT -s 1.2.3.4 -p tcp --destination-port 80 -j LOG --log-level crit
```

#### 29.2.1.21 #20: Block or Open Common Ports

```text
The following shows syntax for opening and closing common TCP and UDP ports:

 
Replace ACCEPT with DROP to block port:
## open port ssh tcp port 22 ##
iptables -A INPUT -m state --state NEW -m tcp -p tcp --dport 22 -j ACCEPT
iptables -A INPUT -s 192.168.1.0/24 -m state --state NEW -p tcp --dport 22 -j ACCEPT
 
## open cups (printing service) udp/tcp port 631 for LAN users ##
iptables -A INPUT -s 192.168.1.0/24 -p udp -m udp --dport 631 -j ACCEPT
iptables -A INPUT -s 192.168.1.0/24 -p tcp -m tcp --dport 631 -j ACCEPT
 
## allow time sync via NTP for lan users (open udp port 123) ##
iptables -A INPUT -s 192.168.1.0/24 -m state --state NEW -p udp --dport 123 -j ACCEPT
 
## open tcp port 25 (smtp) for all ##
iptables -A INPUT -m state --state NEW -p tcp --dport 25 -j ACCEPT
 
# open dns server ports for all ##
iptables -A INPUT -m state --state NEW -p udp --dport 53 -j ACCEPT
iptables -A INPUT -m state --state NEW -p tcp --dport 53 -j ACCEPT
 
## open http/https (Apache) server port to all ##
iptables -A INPUT -m state --state NEW -p tcp --dport 80 -j ACCEPT
iptables -A INPUT -m state --state NEW -p tcp --dport 443 -j ACCEPT
 
## open tcp port 110 (pop3) for all ##
iptables -A INPUT -m state --state NEW -p tcp --dport 110 -j ACCEPT
 
## open tcp port 143 (imap) for all ##
iptables -A INPUT -m state --state NEW -p tcp --dport 143 -j ACCEPT
 
## open access to Samba file server for lan users only ##
iptables -A INPUT -s 192.168.1.0/24 -m state --state NEW -p tcp --dport 137 -j ACCEPT
iptables -A INPUT -s 192.168.1.0/24 -m state --state NEW -p tcp --dport 138 -j ACCEPT
iptables -A INPUT -s 192.168.1.0/24 -m state --state NEW -p tcp --dport 139 -j ACCEPT
iptables -A INPUT -s 192.168.1.0/24 -m state --state NEW -p tcp --dport 445 -j ACCEPT
 
## open access to proxy server for lan users only ##
iptables -A INPUT -s 192.168.1.0/24 -m state --state NEW -p tcp --dport 3128 -j ACCEPT
 
## open access to mysql server for lan users only ##
iptables -I INPUT -p tcp --dport 3306 -j ACCEPT
 

		29.2.1.22 #21: Restrict the Number of Parallel Connections To a Server Per Client IP

You can use connlimit module to put such restrictions. To allow 3 ssh connections per client host, enter:
# iptables -A INPUT -p tcp --syn --dport 22 -m connlimit --connlimit-above 3 -j REJECT

Set HTTP requests to 20:
# iptables -p tcp --syn --dport 80 -m connlimit --connlimit-above 20 --connlimit-mask 24 -j DROP
Where,

    --connlimit-above 3 : Match if the number of existing connections is above 3.
    --connlimit-mask 24 : Group hosts using the prefix length. For IPv4, this must be a number between (including) 0 and 32.
```

#### 29.2.1.23 #22: HowTO: Use iptables Like a Pro

```text
For more information about iptables, please see the manual page by typing man iptables from the command line:
$ man iptables
You can see the help using the following syntax too:
# iptables -h
To see help with specific commands and targets, enter:
# iptables -j DROP -h
#22.1: Testing Your Firewall

Find out if ports are open or not, enter:
# netstat -tulpn
Find out if tcp port 80 open or not, enter:
# netstat -tulpn | grep :80
If port 80 is not open, start the Apache, enter:
# service httpd start
Make sure iptables allowing access to the port 80:
# iptables -L INPUT -v -n | grep 80
Otherwise open port 80 using the iptables for all users:
# iptables -A INPUT -m state --state NEW -p tcp --dport 80 -j ACCEPT
# service iptables save
Use the telnet command to see if firewall allows to connect to port 80:
$ telnet www.cyberciti.biz 80
Sample outputs:

Trying 75.126.153.206...
Connected to www.cyberciti.biz.
Escape character is '^]'.
^]
telnet> quit
Connection closed.

You can use nmap to probe your own server using the following syntax:
$ nmap -sS -p 80 www.cyberciti.biz
Sample outputs:

Starting Nmap 5.00 ( http://nmap.org ) at 2011-12-13 13:19 IST
Interesting ports on www.cyberciti.biz (75.126.153.206):
PORT   STATE SERVICE
80/tcp open  http
Nmap done: 1 IP address (1 host up) scanned in 1.00 seconds

I also recommend you install and use sniffer such as tcpdupm and ngrep to test your firewall settings.
Conclusion:

This post only list basic rules for new Linux users. You can create and build more complex rules. This requires good understanding of TCP/IP, Linux kernel tuning via sysctl.conf, and good knowledge of your own setup. Stay tuned for next topics:

    Stateful packet inspection.
    Using connection tracking helpers.
    Network address translation.
    Layer 2 filtering.
    Firewall testing tools.
    Dealing with VPNs, DNS, Web, Proxy, and other protocols.
```

### 29.2.2 My examples

#### 29.2.2.1 Block incoming traffic from given server

```text
- ex, block AD DC
a. Get DC IP address

# nslookup r1.dom
Server:		<internal-ip>
Address:	<internal-ip>#53

Name:	r1.dom
Address: <internal-ip>
Name:	r1.dom
Address: <internal-ip>

# nslookup 
> set type=SRV
>  _ldap._tcp.dc._msdcs.r1.dom 
Server:		<internal-ip>
Address:	<internal-ip>#53

_ldap._tcp.dc._msdcs.r1.dom	service = 0 100 389 r1dc01.r1.dom.
> exit

# nslookup r1dc01.r1.dom
Server:		<internal-ip>
Address:	<internal-ip>#53

Name:	r1dc01.r1.dom
Address: <internal-ip>

b. block DC

# iptables -I INPUT -s <internal-ip> -j DROP
# iptables -L INPUT -n --line-numbers

c. to unblock
#  iptables -L INPUT -n --line-numbers
Chain INPUT (policy DROP)
num  target     prot opt source               destination         
1    DROP       all  --  <internal-ip>          0.0.0.0/0           
2    RATELIMIT  all  --  0.0.0.0/0            0.0.0.0/0           
3    ACCEPT     all  --  0.0.0.0/0            0.0.0.0/0           state RELATED,ESTABLISHED 

# iptables -D INPUT 1

		29.2.2.2
	29.2.3
    29.3
```

[^systemctl]: systemctl(1) — Linux manual page
[^rhel9-nftables]: RHEL 9: Getting started with nftables
