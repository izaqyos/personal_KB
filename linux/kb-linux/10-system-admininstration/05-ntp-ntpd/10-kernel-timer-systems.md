---
type: reference
title: Kernel Timer Systems
description: "Subsection 10.5.12 of NTP, NTPD."
tags: [kb-linux]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "linux/KB_Linux#10.5.12"
---

# 10.5.12 Kernel Timer Systems

[↑ NTP, NTPD](/linux/kb-linux/10-system-admininstration/05-ntp-ntpd/README.md)

```text
		http://elinux.org/Kernel_Timer_Systems
Jump to: navigation, search
Contents

|    1 Timer Wheel, Jiffies and HZ (or, the way it was)
|        1.1 Ingo Molnar's explanation of timer wheel performance
|    2 ktimers
|        2.1 Material needs rework
|        2.2 clock events
|        2.3 clock sources
|    3 Timer information
|        3.1 /proc/timer_list
|        3.2 /proc/timer_stats
|    4 Dynamic ticks
|        4.1 Testing
|        4.2 Powertop
|    5 timer API
|    6 time API
|    7 High Resolution Timers
|    8 Old timer wheel/jiffy replacement proposals
|        8.1 Jun Sun's "tock" proposal
|        8.2 John Stultz
|    9 Timer Tick Thread - LKML July 2005

Timer Wheel, Jiffies and HZ (or, the way it was)

The original kernel timer system (called the "timer wheel") was based on incrementing a kernel-internal value (jiffies) every timer interrupt. The timer interrupt becomes the default scheduling quamtum, and all other timers are based on jiffies. The timer interrupt rate (and jiffy increment rate) is defined by a compile-time constant called HZ. Different platforms use different values for HZ. Historically, the kernel used 100 as the value for HZ, yielding a jiffy interval of 10 ms. With 2.4, the HZ value for i386 was changed to 1000, yeilding a jiffy interval of 1 ms. Recently (2.6.13) the kernel changed HZ for i386 to 250. (1000 was deemed too high).
Ingo Molnar's explanation of timer wheel performance

Ingo Molnar did an in-depth explanation about the performance of the current "timer wheel" implementation of timers. This was part of a series of messages trying to justify the addition of ktimers (which have different characteristics).

It is possibly the best explanation of the timer wheel avaiable: See http://lkml.org/lkml/2005/10/19/46 and http://lwn.net/Articles/156329/
ktimers
Material needs rework

A bunch of material in this section needs to be created or expanded to take into account the new ktimer system by Thomas Gleixner.
clock events
clock sources
Timer information

There are two /proc files that are very useful for gathering information about timers on your system.
/proc/timer_list

/proc/timer_list has information about the currently configured clocks and timers on the system. This is useful for debugging the current status of the timer system (especially while you are developing clockevent and clocksource support for your platform.)

You can tell if high resolution is configured for you machine by looking at a few different things:

For standard resolution (at jiffy resolution), a clock will have a value for it's '.resolution' field equal to the period of a jiffy. For embedded machines, where HZ is typically 100, this will be 10 milliseconds, or 10000000 (ten million) nanoseconds.

Also for standard resolution, the Clock Event Device will have an event handler of "tick_handle_periodic".

For high resolution, the resolution of the clock will be listed as 1 nanosecond (which is ridiculous, but serves as an indicator of essentially arbitrary precision.) Also, the Clock Event Device will have an event handler of "hrtimer_interrupt".

[need more info here - and this should probably be written up and put in Documentation/filesystems/proc.txt]
/proc/timer_stats

/proc/timer_stats is a file in the /proc pseudo file system which allows you to see information about the routines that are requesting timers of the Linux kernel. By cat'ing this file, you can see which routines are using lots of timers, and how frequently they are requesting them. This can be of interest to see

To use /proc/timer_stats, configure the kernel with support for the feature. That is, set CONFIG_TIMER_STATS=y in your .config. This is on the Kernel Hacking menu, with the prompt: "Collect kernel timers statistics"

Compile and install your kernel, and reboot your machine.

To activate the collection of stats (and reset the counters), do "echo 1 >/proc/timer_stats"

To stop collecting stats, do "echo 0 >/proc/timer_stats"

You can dump the statistics either while the collection system is running or stopped. To dump the stats, use 'cat /proc/timer_stats'. This shows the average events/sec at the end as well so you get a rough idea of system activity.

/proc/timer_stats fields (for version 0.1 of the format) are:

<count>,  <pid> <command>   <start_func> (<expire_func>)

Dynamic ticks

Tickless kernel, dynamic ticks or NO_HZ is a config option that enables a kernel to run without a regular timer tick. The timer tick is a timer interrupt that is usually generated HZ times per second, with the value of HZ being set at compile time and varying between around 100 to 1500. Running without a timer tick means the kernel does less work when idle and can potentially save power because it does not have to wake up regularly just to service the timer. The configuration option is CONFIG_NO_HZ and is set by Tickless System (Dynamic Ticks), on the Kernel Features configuration menu.

    See the Clockevents and dyntick LNW.net article 

Testing

To tell if dynamic ticks is supported in your kernel you can:

Look in dmesg for a line like this one:

 # dmesg | grep -i nohz
 Switched to NOHz mode on CPU #0

Or look at the timer interrupts and compare to jiffies:

 # cat /proc/interrupts | grep -i time
 # sleep 10
 # cat /proc/interrupts | grep -i time

Powertop

Powertop is a tool that parses the /proc/timer_stats output and gives a picture of what is causing wakeups on your system. Minimizing these wakeups should allow you to decrease power consumption in your device. Powertop was originally written for the x86 architecture but also works for embedded processors. However, in order to get a clean display from it, you will need an ncurses lib with wide character support.

Here's a poor-man's version of powertop:

 # watch "cat /proc/timer_stats | sort -nr | head -n 20"

timer API

    interval timers
    posix timer API
    sleep, usleep and nanosleep 

time API

- do_gettimeofday

High Resolution Timers

See High Resolution Timers, which describe sub-jiffy timers. 
```
