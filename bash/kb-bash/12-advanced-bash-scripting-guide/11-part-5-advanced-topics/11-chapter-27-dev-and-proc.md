---
type: reference
title: Chapter 27. /dev and /proc
description: "ABS Guide chapter 27: the /dev and /proc filesystems."
tags: [bash, linux, legacy, book-notes, reference]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "bash/KB_bash#12.12.11"
---

# 12.12.11 Chapter 27. /dev and /proc

[↑ Part 5. Advanced Topics](/bash/kb-bash/12-advanced-bash-scripting-guide/11-part-5-advanced-topics/README.md)

#### 12.12.11.1 /dev

```text
The /dev directory contains entries for the physical devices  that may or may not be present in the hardware. [1]  For example, the hard drive partitions containing the mounted filesystem(s) have entries in /dev, as df shows.

bash$ df
Filesystem           1k-blocks      Used Available Use%
 Mounted on
 /dev/hda6               495876    222748    247527  48% /
 /dev/hda1                50755      3887     44248   9% /boot
 /dev/hda8               367013     13262    334803   4% /home
 /dev/hda5              1714416   1123624    503704  70% /usr
```

#### 12.12.11.1.1 loopback devices

```text
Among other things, the /dev directory contains loopback devices, such as /dev/loop0. A loopback device is a gimmick that allows an ordinary file to be accessed as if it were a block device. [2] This permits mounting an entire filesystem within a single large file. See Example 16-8 and Example 16-7.

A few of the pseudo-devices in /dev have other specialized uses, such as /dev/null, /dev/zero, /dev/urandom, /dev/sda1 (hard drive partition), /dev/udp (User Datagram Packet port), and /dev/tcp.

For instance:
```

#### 12.12.11.1.2 To mount a USB flash drive,

```text
				append the following line to /etc/fstab. [3]

/dev/sda1    /mnt/flashdrive    auto    noauto,user,noatime    0 0

(See also Example A-25.)

Checking whether a disk is in the CD-burner (soft-linked to /dev/hdc):

head -1 /dev/hdc


#  head: cannot open '/dev/hdc' for reading: No medium found
#  (No disc in the drive.)

#  head: error reading '/dev/hdc': Input/output error
#  (There is a disk in the drive, but it can't be read;
#+  possibly it's an unrecorded CDR blank.)   

#  Stream of characters and assorted gibberish
#  (There is a pre-recorded disk in the drive,
#+ and this is raw output -- a stream of ASCII and binary data.)
#  Here we see the wisdom of using 'head' to limit the output
#+ to manageable proportions, rather than 'cat' or something similar.


#  Now, it's just a matter of checking/parsing the output and taking
#+ appropriate action.
```

#### 12.12.11.1.3 /dev/tcp/$host/$port

```text
When executing a command on a /dev/tcp/$host/$port pseudo-device file, Bash opens a TCP connection to the associated socket.

A socket is a communications node associated with a specific I/O port. (This is analogous to a hardware socket, or receptacle, for a connecting cable.) It permits data transfer between hardware devices on the same machine, between machines on the same network, between machines across different networks, and, of course, between machines at different locations on the Internet.

The following examples assume an active Internet connection.

Getting the time from nist.gov:

bash$ cat </dev/tcp/time.nist.gov/13
53082 04-03-18 04:26:54 68 0 0 502.3 UTC(NIST) *
	      

[Mark contributed the above example.]

Downloading a URL:

bash$ exec 5<>/dev/tcp/www.net.cn/80
bash$ echo -e "GET / HTTP/1.0\n" >&5
bash$ cat <&5
	      

[Thanks, Mark and Mihai Maties.]
```

#### 12.12.11.1.4 Example 27-1. Using /dev/tcp for troubleshooting

```text
#!/bin/bash
# dev-tcp.sh: /dev/tcp redirection to check Internet connection.

# Script by Troy Engel.
# Used with permission.
 
TCP_HOST=www.dns-diy.com   # A known spam-friendly ISP.
TCP_PORT=80                # Port 80 is http.
  
# Try to connect. (Somewhat similar to a 'ping' . . .) 
echo "HEAD / HTTP/1.0" >/dev/tcp/${TCP_HOST}/${TCP_PORT}
MYEXIT=$?

: <<EXPLANATION
If bash was compiled with --enable-net-redirections, it has the capability of
using a special character device for both TCP and UDP redirections. These
redirections are used identically as STDIN/STDOUT/STDERR. The device entries
are 30,36 for /dev/tcp:

  mknod /dev/tcp c 30 36

>From the bash reference:
/dev/tcp/host/port
    If host is a valid hostname or Internet address, and port is an integer
port number or service name, Bash attempts to open a TCP connection to the
corresponding socket.
EXPLANATION

   
if [ "X$MYEXIT" = "X0" ]; then
  echo "Connection successful. Exit code: $MYEXIT"
else
  echo "Connection unsuccessful. Exit code: $MYEXIT"
fi

exit $MYEXIT
```

#### 12.12.11.1.5 Example 27-2. Playing music

```text
#!/bin/bash
# music.sh

# MUSIC WITHOUT EXTERNAL FILES

# Author: Antonio Macchi
# Used in ABS Guide with permission


#  /dev/dsp default = 8000 frames per second, 8 bits per frame (1 byte),
#+ 1 channel (mono)

duration=2000       # If 8000 bytes = 1 second, then 2000 = 1/4 second.
volume=$'\xc0'      # Max volume = \xff (or \x00).
mute=$'\x80'        # No volume = \x80 (the middle).

function mknote ()  # $1=Note Hz in bytes (e.g. A = 440Hz ::
                    #+ 8000 fps / 440 = 16 :: A = 16 bytes per second)
{
  for t in `seq 0 $duration`
  do
    test $(( $t % $1 )) = 0 && echo -n $volume || echo -n $mute
  done
 
}

e=`mknote 49`
g=`mknote 41`
a=`mknote 36`
b=`mknote 32`
c=`mknote 30`
cis=`mknote 29`
d=`mknote 27`
e2=`mknote 24`
n=`mknote 32767`
# European notation.

echo -n "$g$e2$d$c$d$c$a$g$n$g$e$n$g$e2$d$c$c$b$c$cis$n$cis$d \
$n$g$e2$d$c$d$c$a$g$n$g$e$n$g$a$d$c$b$a$b$c" > /dev/dsp
# dsp = Digital Signal Processor

exit $?   # A "bonny" example of a shell script!"

Notes
[1]	The entries in /dev provide mount points for physical and virtual devices. These entries use very little drive space.

Some devices, such as /dev/null, /dev/zero, and /dev/urandom are virtual. They are not actual physical devices and exist only in software.
[2]	A block device reads and/or writes data in chunks, or blocks, in contrast to a character device, which acesses data in character units. Examples of block devices are hard drives, CDROM drives, and flash drives. Examples of character devices are keyboards, modems, sound cards.
[3]	Of course, the mount point /mnt/flashdrive must exist. If not, then, as root, mkdir /mnt/flashdrive.

To actually mount the drive, use the following command: mount /mnt/flashdrive

Newer Linux distros automount flash drives in the /media directory without user intervention.
```

#### 12.12.11.2 /proc

```text
The /proc directory is actually a pseudo-filesystem. The files in /proc mirror currently running system and kernel processes  and contain information and statistics about them.
```

#### 12.12.11.2.1 Devices

```text
bash$ cat /proc/devices
Character devices:
|   1 mem
|   2 pty
|   3 ttyp
|   4 ttyS
|   5 cua
|   7 vcs
|  10 misc
|  14 sound
|  29 fb
|  36 netlink
| 128 ptm
| 136 pts
| 162 raw
| 254 pcmcia

 Block devices:
|   1 ramdisk
|   2 fd
|   3 ide0
|   9 md
```

#### 12.12.11.2.2 interrupts

```text
bash$ cat /proc/interrupts
           CPU0       
|   0:      84505          XT-PIC  timer
|   1:       3375          XT-PIC  keyboard
|   2:          0          XT-PIC  cascade
|   5:          1          XT-PIC  soundblaster
|   8:          1          XT-PIC  rtc
|  12:       4231          XT-PIC  PS/2 Mouse
|  14:     109373          XT-PIC  ide0
 NMI:          0 
 ERR:          0
```

#### 12.12.11.2.3 partitions

```text
bash$ cat /proc/partitions
major minor  #blocks  name     rio rmerge rsect ruse wio wmerge wsect wuse running use aveq

|    3     0    3007872 hda 4472 22260 114520 94240 3551 18703 50384 549710 0 111550 644030
|    3     1      52416 hda1 27 395 844 960 4 2 14 180 0 800 1140
|    3     2          1 hda2 0 0 0 0 0 0 0 0 0 0 0
|    3     4     165280 hda4 10 0 20 210 0 0 0 0 0 210 210
    ...
```

#### 12.12.11.2.4 more /proc

```text
bash$ cat /proc/loadavg
|0.13 0.42 0.27 2/44 1119



bash$ cat /proc/apm
|1.16 1.2 0x03 0x01 0xff 0x80 -1% -1 ?
```

#### 12.12.11.2.5 battery

```text
bash$ cat /proc/acpi/battery/BAT0/info
present:                 yes
 design capacity:         43200 mWh
 last full capacity:      36640 mWh
 battery technology:      rechargeable
 design voltage:          10800 mV
 design capacity warning: 1832 mWh
 design capacity low:     200 mWh
 capacity granularity 1:  1 mWh
 capacity granularity 2:  1 mWh
 model number:            IBM-02K6897
 serial number:            1133
 battery type:            LION
 OEM info:                Panasonic
```

#### 12.12.11.2.6 Memory

```text
bash$ fgrep Mem /proc/meminfo
MemTotal:       515216 kB
 MemFree:        266248 kB
```

#### 12.12.11.2.7 Extract info from /proc

```text
Shell scripts may extract data from certain of the files in /proc. [1]

FS=iso                       # ISO filesystem support in kernel?

grep $FS /proc/filesystems   # iso9660

kernel_version=$( awk '{ print $3 }' /proc/version )

CPU=$( awk '/model name/ {print $5}' < /proc/cpuinfo )

if [ "$CPU" = "Pentium(R)" ]
then
  run_some_commands
  ...
else
  run_other_commands
  ...
fi



cpu_speed=$( fgrep "cpu MHz" /proc/cpuinfo | awk '{print $4}' )
#  Current operating speed (in MHz) of the cpu on your machine.
#  On a laptop this may vary, depending on use of battery
#+ or AC power.

#!/bin/bash
# get-commandline.sh
# Get the command-line parameters of a process.

OPTION=cmdline

# Identify PID.
pid=$( echo $(pidof "$1") | awk '{ print $1 }' )
# Get only first            ^^^^^^^^^^^^^^^^^^ of multiple instances.

echo
echo "Process ID of (first instance of) "$1" = $pid"
echo -n "Command-line arguments: "
cat /proc/"$pid"/"$OPTION" | xargs -0 echo
#   Formats output:        ^^^^^^^^^^^^^^^
#   (Thanks, Han Holl, for the fixup!)

echo; echo


# For example:
# sh get-commandline.sh xterm

+

devfile="/proc/bus/usb/devices"
text="Spd"
USB1="Spd=12"
USB2="Spd=480"


bus_speed=$(fgrep -m 1 "$text" $devfile | awk '{print $9}')
#                 ^^^^ Stop after first match.

if [ "$bus_speed" = "$USB1" ]
then
  echo "USB 1.1 port found."
  # Do something appropriate for USB 1.1.
fi

Note	

It is even possible to control certain peripherals with commands sent to the /proc directory.

	  root# echo on > /proc/acpi/ibm/light
          

This turns on the Thinklight in certain models of IBM/Lenovo Thinkpads. (May not work on all Linux distros.)

Of course, caution is advised when writing to /proc.

The /proc directory contains subdirectories with unusual numerical names. Every one of these names maps to the process ID of a currently running process. Within each of these subdirectories, there are a number of files that hold useful information about the corresponding process. The stat and status files keep running statistics on the process, the cmdline file holds the command-line arguments the process was invoked with, and the exe file is a symbolic link to the complete path name of the invoking process. There are a few more such files, but these seem to be the most interesting from a scripting standpoint.

Example 27-3. Finding the process associated with a PID

#!/bin/bash
# pid-identifier.sh:
# Gives complete path name to process associated with pid.

ARGNO=1  # Number of arguments the script expects.
E_WRONGARGS=65
E_BADPID=66
E_NOSUCHPROCESS=67
E_NOPERMISSION=68
PROCFILE=exe

if [ $# -ne $ARGNO ]
then
  echo "Usage: `basename $0` PID-number" >&2  # Error message >stderr.
  exit $E_WRONGARGS
fi  

pidno=$( ps ax | grep $1 | awk '{ print $1 }' | grep $1 )
# Checks for pid in "ps" listing, field #1.
# Then makes sure it is the actual process, not the process invoked by this script.
# The last "grep $1" filters out this possibility.
#
#    pidno=$( ps ax | awk '{ print $1 }' | grep $1 )
#    also works, as Teemu Huovila, points out.

if [ -z "$pidno" ]  #  If, after all the filtering, the result is a zero-length string,
then                #+ no running process corresponds to the pid given.
  echo "No such process running."
  exit $E_NOSUCHPROCESS
fi  

# Alternatively:
#   if ! ps $1 > /dev/null 2>&1
#   then                # no running process corresponds to the pid given.
#     echo "No such process running."
#     exit $E_NOSUCHPROCESS
#    fi

# To simplify the entire process, use "pidof".


if [ ! -r "/proc/$1/$PROCFILE" ]  # Check for read permission.
then
  echo "Process $1 running, but..."
  echo "Can't get read permission on /proc/$1/$PROCFILE."
  exit $E_NOPERMISSION  # Ordinary user can't access some files in /proc.
fi  

# The last two tests may be replaced by:
#    if ! kill -0 $1 > /dev/null 2>&1 # '0' is not a signal, but
                                      # this will test whether it is possible
                                      # to send a signal to the process.
#    then echo "PID doesn't exist or you're not its owner" >&2
#    exit $E_BADPID
#    fi



exe_file=$( ls -l /proc/$1 | grep "exe" | awk '{ print $11 }' )
# Or       exe_file=$( ls -l /proc/$1/exe | awk '{print $11}' )
#
#  /proc/pid-number/exe is a symbolic link
#+ to the complete path name of the invoking process.

if [ -e "$exe_file" ]  #  If /proc/pid-number/exe exists,
then                   #+ then the corresponding process exists.
  echo "Process #$1 invoked by $exe_file."
else
  echo "No such process running."
fi  


#  This elaborate script can *almost* be replaced by
#       ps ax | grep $1 | awk '{ print $5 }'
#  However, this will not work...
#+ because the fifth field of 'ps' is argv[0] of the process,
#+ not the executable file path.
#
# However, either of the following would work.
#       find /proc/$1/exe -printf '%l\n'
#       lsof -aFn -p $1 -d txt | sed -ne 's/^n//p'

# Additional commentary by Stephane Chazelas.

exit 0

Example 27-4. On-line connect status

#!/bin/bash

PROCNAME=pppd        # ppp daemon
PROCFILENAME=status  # Where to look.
NOTCONNECTED=65
INTERVAL=2           # Update every 2 seconds.

pidno=$( ps ax | grep -v "ps ax" | grep -v grep | grep $PROCNAME |
awk '{ print $1 }' )

# Finding the process number of 'pppd', the 'ppp daemon'.
# Have to filter out the process lines generated by the search itself.
#
#  However, as Oleg Philon points out,
#+ this could have been considerably simplified by using "pidof".
#  pidno=$( pidof $PROCNAME )
#
#  Moral of the story:
#+ When a command sequence gets too complex, look for a shortcut.


if [ -z "$pidno" ]   # If no pid, then process is not running.
then
  echo "Not connected."
  exit $NOTCONNECTED
else
  echo "Connected."; echo
fi

while [ true ]       # Endless loop, script can be improved here.
do

  if [ ! -e "/proc/$pidno/$PROCFILENAME" ]
  # While process running, then "status" file exists.
  then
    echo "Disconnected."
    exit $NOTCONNECTED
  fi

netstat -s | grep "packets received"  # Get some connect statistics.
netstat -s | grep "packets delivered"


  sleep $INTERVAL
  echo; echo

done

exit 0

# As it stands, this script must be terminated with a Control-C.

#    Exercises:
#    ---------
#    Improve the script so it exits on a "q" keystroke.
#    Make the script more user-friendly in other ways.

Warning	

In general, it is dangerous to write to the files in /proc, as this can corrupt the filesystem or crash the machine.
Notes
[1]	

Certain system commands, such as procinfo, free, vmstat, lsdev, and uptime do this as well.
```
