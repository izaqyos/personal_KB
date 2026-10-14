---
type: reference
title: Services
description: "Linux services: chkconfig, service commands and GUI service tool."
tags: [linux, configuration-file, howto, reference, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "linux/KB_Linux#31"
---

# Services

[↑ KB_Linux](/linux/kb-linux/README.md)

## 31.1 Configuring services in Linux.

### 31.1.1 Overview of services in Linux.

```text
Services are programs (called daemons) that once started run continuously in the background and are ready for input or monitor changes in your computer and respond to them. For example 
the Apache server has a daemon called httpd (the d is for daemon) that listens on port 80 on your computer and when it receives a request for a page it sends the 
appropriate data back to the client machine.
Many services are required to run all the time however many can be safely turned of for both security reasons as running 
unnecessary services opens more doors into your computer, but also for performance reasons. It may not make much difference but your computer should boot slightly faster the less services 
it has to start on boot.
Even though I use my laptop as a development machine running Apache, PHP and MySQL and I am also connected to a home network I choose to start Apache, MySQL and 
Samba manually as required. This page explains how to start and stop services and how to control which services start automatically at boot time.
```

### 31.1.2 chkconfig and service commands.

```text
There are 2 commands used to control services:

/sbin/chkconfig - this controls which services are set to start on boot, by their nature these setting are saved and are applied at next boot. Changing these settings will not start 
the service immediately, it will just flag them to be started from the next boot.
/sbin/service - this controls the starting and stopping of services during a session, these setting are not saved. If you start Apache this way but it is not set to start 
on boot using the above method then it will continue to run but on next boot will not start automatically.
```

### 31.1.3 GUI tool - system-config-services.

```text
First of all we need to know which services are running and which are stopped. There are two ways of doing this, the graphical way is to open up system-config-services. 
If you look in the start menu it should be under Desktop > System > Administration > Services. You will be asked for your root password and then be presented 
with a screen like below. You can also start it from a terminal by typing 'system-config-services'.
system-config-services screenshot
From here you are able to tell which services are set to start on boot, those denoted with a tick in the checkbox, and also which are currently running by looking 
at the information in the bottom right panel. You can also start, stop and restart services from here. Note that if you start a service it will not be set to start on next boot 
unless you click the checkbox and then save your settings. Note that this graphical front end uses both chkconfig and service commands since you are able to control both in session starting 
and starting at next boot.
This is a good place to start looking at services but like many things in Linux it's actually easier to control services from the command line.
```

### 31.1.4 Commands

#### 31.1.4.1 Finding which services start on boot using chkconfig

```text
To get this information we use the chkconfig command, if you wish to see the status of all services then type:
$ /sbin/chkconfig --list
NetworkManager  0:off   1:off   2:off   3:off   4:off   5:on    6:off
NetworkManagerDispatcher        0:off   1:off   2:off   3:off   4:off   5:on    6:off
acpid           0:off   1:off   2:off   3:on    4:on    5:on    6:off
anacron         0:off   1:off   2:on    3:on    4:on    5:on    6:off
apmd            0:off   1:off   2:on    3:on    4:on    5:on    6:off
atd             0:off   1:off   2:off   3:on    4:on    5:on    6:off
ati-fglrx       0:off   1:off   2:on    3:on    4:on    5:on    6:off
auditd          0:off   1:off   2:on    3:on    4:on    5:on    6:off
autofs          0:off   1:off   2:off   3:on    4:on    5:on    6:off
bluetooth       0:off   1:off   2:on    3:on    4:on    5:off   6:off
cpuspeed        0:off   1:on    2:on    3:on    4:on    5:on    6:off
......................
As you can see this returns a long list of all the services, each column refers to a different run level. In most cases we boot into level 5 so this is the column 
we are most interested in (see below for the meaning of the different run levels). 
The on and off refer to whether the service is set to start on boot, it does not tell us whether the service is currently running.
Run levels.


0: Halt
1: Single User Mode
2: Basic Multi-user Mode
3: Full Multi-user without X
4: Not Used
5: Mutli-user with X
6: Reboot

This table just shows the meaning of different run levels. As you can see we normally boot into run level 5, multi-user with X.
To query the status of just one service we can use grep to filter the returned data. Here we use chkconfig but only want to see the Apache service.
$ /sbin/chkconfig --list|grep httpd
httpd           0:off   1:off   2:off   3:off   4:off   5:off   6:off

So this shows that Apache is not set to start on boot in all run levels.
```

#### 31.1.4.2 View only services not started on boot.

```text
We can use grep again to see only those services set to start on boot for a particular run level. Here we see services not set to start in run level 5.
$ /sbin/chkconfig --list|grep -v 5:on
bluetooth       0:off   1:off   2:on    3:on    4:on    5:off   6:off
cups-config-daemon      0:off   1:off   2:off   3:on    4:on    5:off   6:off
dc_client       0:off   1:off   2:off   3:off   4:off   5:off   6:off
dc_server       0:off   1:off   2:off   3:off   4:off   5:off   6:off
dhcdbd          0:off   1:off   2:off   3:off   4:off   5:off   6:off
diskdump        0:off   1:off   2:off   3:off   4:off   5:off   6:off
httpd           0:off   1:off   2:off   3:off   4:off   5:off   6:off
irda            0:off   1:off   2:off   3:off   4:off   5:off   6:off
lirc            0:off   1:off   2:off   3:off   4:off   5:off   6:off
mDNSResponder   0:off   1:off   2:off   3:on    4:on    5:off   6:off
.........................

This command uses the -v option for grep, meaning non matching lines. What this line does is get all services from chkconfig but then only shows the lines that do not include the term 5:on,
 i.e. it will only display lines where 5:off occurs meaning the service is not set to start on boot. You could replace '5:on' with '5:off' to get all services set to start on boot or just ':off' 
 would return all lines where the service is set to start in all run levels.
```

#### 31.1.4.3 Changing whether a service starts on boot.

```text
If you want to alter which services get started at boot time then we use chkconfig with different arguments. For example to set Apache to start on boot in run level 5:
$ /sbin/chkconfig --level 5 httpd on
To then stop it Apache starting on boot replace 'on' with 'off'.
$ /sbin/chkconfig --level 5 httpd off
If you wish to set more run levels just replace '5' with the run level required without spaces, e.g. '345'.So you can see that it's simple to configure which services start on boot, 
the next step is to manually start a service when required. This way we can turn off many services not actually required for the normal operation of the computer and just start 
them when the need arises.
```

#### 31.1.4.4 Starting and stopping services using the service command.

```text
To start a service simply use the service command, this example uses Apache (httpd service) as an example but the command is the same for any service.
$ /sbin/service httpd start
Starting httpd:                                            [  OK  ]

Stopping a service is just as easy
$ /sbin/service httpd stop
Stopping httpd:                                            [  OK  ]

As you may have guessed restarting just uses restart in place of start or stop. Note that this will start a service for this session but after rebooting this 
service will not automatically restart. In my case this is what I want, many times I start my laptop to check email but have no need for Apache, MySQL, Samba and 
so on. I find it much easier just to start them as required. It's also very easy to write a simple bash script that starts Apache and MySQL from one command.


			31.1.4.5
Get all running services.
To see a list of all the currently running services we can use grep again to filter the data for the word 'running'. Conversely we could use 'stopped' to see a list of all stopped services.
$ /sbin/service --status-all|grep running
acpid (pid 2146) is running...
anacron (pid 2236) is running...
atd (pid 2243) is running...
Init-Script is running.
auditd (pid 1944) is running...
cpuspeed (pid 1880) is running...
crond (pid 2206) is running...
cupsd (pid 2156) is running...
..........................

If we just use /sbin/service --status-all then we get a list of all services whether they are running or not.
If we just want to query the status of one service then do the following. In this case I'm getting the status of the Samba (smb) service.
$ /sbin/service smb status
smbd is stopped
nmbd is stopped

Which services do I need to run?
As I said earlier I tend to turn off as many services as I can while still being able to use my computer for day to day things. For this reason I've included the list off all services 
on my computer and whether they are set to start at boot or not. Also note that even though I have a laptop I have turned off pcmcia since I 
do not have any need for it, but if you use a pcmcia network card for example then you will need this service running.
Remember that it's easy to test this for yourself, since if you turn off a service and lose some functionality you can just turn it on again 
without doing any harm. This list of my running services allows me to do all basic activities including internet browsing and email. I do use my laptop as 
a web server running Apache and MySQL but I just start them as required, the same goes for SSH sessions. In this way I get a faster boot up time, 
increased security from less services open to attack and fewer ports open.

		31.1.5
```

## 31.2 Automatically load services (and scripts) after reboot

### 31.2.1 Get To Know Linux: The /etc/init.d Directory

```text
If you use Linux you most likely have heard of the init.d directory. But what exactly does this directory do? It ultimately does one thing but it does that one thing for your entire system, so init.d is very important. The init.d directory contains a number of start/stop scripts for various services on your system. Everything from acpid to x11-common is controlled from this directory. Of course it’s not exactly that simple.

If you look at the /etc directory you will find directories that are in the form rc#.d (Where # is a number reflects a specific initialization level – from 0 to 6). Within each of these directories is a number of other scripts that control processes. These scripts will either begin with a “K” or an “S”. All “K” scripts are run before “S” scripts. And depending upon where the scripts are located will determine when the scripts initiate. Between the directories the system services work together like a well-oiled machine. But there are times when you need to start or stop a process cleanly and without using the kill or killall commands. That is where the /etc/init.d directory comes in handy.

Now if you are using a distribution like Fedora you might find this directory in /etc/rc.d/init.d. Regardless of location, it serves the same purpose.

In order to control any of the scripts in init.d manually you have to have root (or sudo) access. Each script will be run as a command and the structure of the command will look like:

/etc/init.d/command OPTION

Where command is the actual command to run and OPTION can be one of the following:

    start
    stop
    reload
    restart
    force-reload

Most often you will use either start, stop, or restart. So if you want to stop your network you can issue the command:

/etc/init.d/networking stop

Or if you make a change to your network and need to restart it, you could do so with the following command:

/etc/init.d/networking restart

Some of the more common init scripts in this directory are:

    networking
    samba
    apache2
    ftpd
    sshd
    dovecot
    mysql

Of course there may be more often-used scripts in your directory – it depends upon what you have installed. The above list was taken from a Ubuntu Server 8.10 installation so a standard desktop installation would have a few less networking-type scripts.

But what about /etc/rc.local

There is a third option that I used to use quite a bit. This option is the /etc/rc.local script. This file runs after all other init level scripts have run, so it’s safe to put various commands that you want to have issued upon startup. Many times I will place mounting instructions for things like nfs in this script. This is also a good place to place “troubleshooting” scripts in. For instance, once I had a machine that, for some reason, samba seemed to not want to start. Even afer checking to make sure the Samba daemon was setup to initialize at boot up. So instead of spending all of my time up front with this I simply placed the line:

/etc/init.d/samba start

in the /etc/rc.local script and Samba worked like a charm. Eventually I would come back and trouble shoot this issue.

Final Thoughts

Linux is flexible. Linux is so flexible there is almost, inevitably, numerous ways to solve a single problem. Starting a system service is one such issue. With the help of the /etc/init.d system (as well as /etc/rc.local) you can pretty much rest assured your service will start.
```

### 31.2.2 Linux Init Process / PC Boot Procedure

#### 31.2.2.1 PC Boot and Linux Init Process:

```text
    BIOS: The Basic Input/Output System is the lowest level interface between the computer and peripherals.
    The BIOS performs integrity checks on memory and seeks instructions on the Master Boor Record (MBR) on the floppy drive or hard drive.
    The MBR points to the boot loader (GRUB or LILO: Linux boot loader).
    Boot loader (GRUB or LILO) will then ask for the OS label which will identify which kernel to run and where it is located (hard drive and partition specified). The installation process requires to creation/identification of partitions and where to install the OS. GRUB/LILO are also configured during this process. The boot loader then loads the Linux operating system.
        See the YoLinux tutorial on creating a boot disk for more information on GRUB and LILO and also to learn how to put the MBR and boot loader on a floppy for system recovery.
    The first thing the kernel does is to execute init program. Init is the root/parent of all processes executing on Linux.
    The first processes that init starts is a script /etc/rc.d/rc.sysinit
    Based on the appropriate run-level, scripts are executed to start various processes to run the system and make it functional.
```

#### 31.2.2.2 The Linux Init Processes:

```text
The init process is the last step in the boot procedure and identified by process id "1". Init is responsible for starting system processes as defined in the /etc/inittab file. Init typically will start multiple instances of "getty" which waits for console logins which spawn one's user shell process. Upon shutdown, init controls the sequence and processes for shutdown. The init process is never shut down. It is a user process and not a kernel system process although it does run as root.

System Processes:

    Process ID 	Description
    0 	The Scheduler
    1 	The init process
    2 	kflushd
    3 	kupdate
    4 	kpiod
    5 	kswapd
    6 	mdrecoveryd

Init config file (Red Hat 7.3-9.0, Fedora Core 1-3): /etc/inittab

    # Author:       Miquel van Smoorenburg, 
    #               Modified for RHS Linux by Marc Ewing and Donnie Barnes

    id:3:initdefault:

    # System initialization.
    si::sysinit:/etc/rc.d/rc.sysinit

    l0:0:wait:/etc/rc.d/rc 0
    l1:1:wait:/etc/rc.d/rc 1
    l2:2:wait:/etc/rc.d/rc 2
    l3:3:wait:/etc/rc.d/rc 3
    l4:4:wait:/etc/rc.d/rc 4
    l5:5:wait:/etc/rc.d/rc 5
    l6:6:wait:/etc/rc.d/rc 6

    # Things to run in every runlevel.  This line is only in Red Hat 7.X Used to flush disk buffers.
    ud::once:/sbin/update

    # Trap CTRL-ALT-DELETE
    ca::ctrlaltdel:/sbin/shutdown -t3 -r now

    # When our UPS tells us power has failed, schedule a shutdown for 2 minutes from now.
    pf::powerfail:/sbin/shutdown -f -h +2 "Power Failure; System Shutting Down"

    # If power was restored before the shutdown kicked in, cancel it.
    pr:12345:powerokwait:/sbin/shutdown -c "Power Restored; Shutdown Canceled"

    # Run gettys in standard runlevels
    1:2345:respawn:/sbin/mingetty tty1
    2:2345:respawn:/sbin/mingetty tty2
    3:2345:respawn:/sbin/mingetty tty3
    4:2345:respawn:/sbin/mingetty tty4
    5:2345:respawn:/sbin/mingetty tty5
    6:2345:respawn:/sbin/mingetty tty6

    # Run xdm in runlevel 5
    x:5:respawn:/etc/X11/prefdm -nodaemon

Note that this config file directs the init process to run the shell script /etc/rc.d/rc.sysinit. This script should be used as is and NOT changed. Extend rc.local and NOT this script. This will (not in exact order):

    Run /sbin/initlog
    Run devfs to generate/manage system devices
    Run network scripts: /etc/sysconfig/network
    Start graphical boot (If so configured): rhgb
    Start console terminals, load keymap, system fonts and print console greeting: mingetty, setsysfonts
    The various virtual console sessions can be viewed with the key-stroke:
        RHEL6: ctrl-alt-F2 through F7. F1 is reserved for the GUI screen invoked in run level 5.
        Older systems: ctrl-alt-F1 through F6. F7 is reserved for the GUI screen invoked in run level 5.
    Mount /proc and start device controllers.
    Done with boot configuration for root drive. (initrd) Unmount root drive.
    Re-mount root file system as read/write
    Direct kernel to load kernel parameters and modules: sysctl, depmod, modprobe
    Set up clock: /etc/sysconfig/clock
    Perform disk operations based on fsck configuration
    Check/mount/check/enable quotas non-root file systems: fsck, mount, quotacheck, quotaon
    Initialize logical volume management: vgscan, /etc/lvmtab
    Activate syslog, write to log files: dmesg
    Configure sound: sndconfig
    Activate PAM
    Activate swapping: swapon

Local system boot processes can be placed in file: /etc/rc.d/rc.local

The system will then boot to the runlevel set by the directive initdefault.

Also see:

    init man page
    inittab man page
```

#### 31.2.2.3 Linux init Run Levels:

```text
The Linux boot process has six states of operation of which "0" is the shutdown state and "3" and above are fully operational with all essential processes running for user interaction. Upon system boot the LINUX system /sbin/init program starts other processes by performing the following:

    Init will bring up the machine by starting processes as defined in the /etc/inittab file.

    The computer will be booted to the runlevel as defined by the initdefault directive in the /etc/inittab file.

            id:5:initdefault:
            

    In this example a runlevel of "5" is chosen. Runlevel "5" will boot the system into GUI mode using XDM and X-Windows. Booting to runlevel "3" (often called console mode) is often used by servers which do not need a graphical user interface. If booted to init level "3" one can promote the run level with the command [root prompt]# init 5. See the more detailed explanation of run levels below.

    The inittab file will allow you to capture key sequences (ctrl-alt-del), start dial in internet connections etc.

    One of these process started by init is /sbin/rc. This script runs a series of scripts in the directories /etc/rc.d/rc0.d/, /etc/rc.d/rc1.d/, /etc/rc.d/rc2.d/, etc

    Scripts in these directories are executed for each boot state of operation until it becomes fully operational. Scripts beginning with S denote startup scripts while scripts beginning with K denote shutdown (kill) scripts. Numbers follow these letters to denote the order of execution. (lowest to highest)

Runlevel "3" will boot to text or console mode and "5" will boot to the graphical login mode ( "4" for slackware)

    Runlevel 	Scripts Directory
    (Red Hat/Fedora Core) 	State
    0 	/etc/rc.d/rc0.d/ 	shutdown/halt system
    1 	/etc/rc.d/rc1.d/ 	Single user mode
    2 	/etc/rc.d/rc2.d/ 	Multiuser with no network services exported
    3 	/etc/rc.d/rc3.d/ 	Default text/console only start. Full multiuser
    4 	/etc/rc.d/rc4.d/ 	Reserved for local use. Also X-windows (Slackware/BSD)
    5 	/etc/rc.d/rc5.d/ 	XDM X-windows GUI mode (Redhat/System V)
    6 	/etc/rc.d/rc6.d/ 	Reboot
    s or S 	
    	Single user/Maintenance mode (Slackware)
    M 	
    	Multiuser mode (Slackware)

One may switch init levels by issuing the init command with the appropriate runlevel. Use the command "init #" where # is one of s,S,0,1,3,5,6. The command telinit does the same.

The scripts for a given run level are run during boot and shutdown. The scripts are found in the directory /etc/rc.d/rc#.d/ where the symbol # represents the run level. i.e. the run level "3" will run all the scripts in the directory /etc/rc.d/rc3.d/ which start with the letter "S" during system boot. This starts the background processes required by the system. During shutdown all scripts in the directory which begin with the letter "K" will be executed. This system provides an orderly way to bring the system to different states for production and maintenance modes.

If you installed all demons (background processes), Linux will run them all. To avoid slowing down your machine, remove unneeded services from the start-up procedure. You can start/stop individual demons by running service init scripts located in the /etc/init.d/ directory:

    /etc/rc.d/init.d/ (Red Hat/Fedora) Also /etc/init.d/ which is linked to /etc/rc.d/init.d/
    /etc/init.d/ (S.u.s.e.)
    /etc/init.d/ (Ubuntu / Debian)

and issuing the command and either the start, stop, status, restart or reload option i.e. to stop the web server:

    /etc/init.d/httpd stop

Use the command ps -aux to view all process on your machine.

TIP: List state and run level of all services which can be started by init: chkconfig --list
or
service --status-all | grep running (Red Hat/Fedora Core based systems)

GUI tool: /usr/X11R6/bin/tksysv
```

#### 31.2.2.4 Run Level Commands:

```text
    Shutdown:
        init 0
        shutdown -h now
            -a: Use file /etc/shutdown.allow
            -c: Cancel scheduled shutdown.
        halt -p
            -p: Turn power off after shutdown.
        poweroff
    Reboot:
        init 6
        shutdown -r now
        reboot
    Enter single user mode:
        init 1
```

#### 31.2.2.5 Init Script Activation:

```text
Adding a script to the /etc/rc.d/rc#.d/ directory with either an S or K prefix, adds the script to the boot or shutdown process. The scripts are run in numerical order. S20abc is run before S30xyz. The extensibility to the boot and shutdown procedures of the operating system is one of the strengths of UNIX. The orderly sequential initiation of processes can be coordinated for dependent processes. The orderly shutdown of processes is often required of complex programs such as databases. This is how it is done. Individual processes may be monitored, shutdown and started at any time using these scripts. i.e. /etc/rc.d/rc2.d/httpd start. The modifiers start, stop or status may be used.

The start/stop/status scripts actually reside in the directory:

    /etc/rc.d/init.d/ (Red Hat/Fedora) Also /etc/init.d/ which is linked to /etc/rc.d/init.d/
    /etc/init.d/ (S.u.s.e. and Ubuntu / Debian)

and are linked to the appropriate directories. These links may be created or destroyed using the chkconfig command. i.e. chkconfig --del httpd will remove the web server from the startup and shutdown process. Inversely chkconfig --add httpd will add it to the startup/shutdown process by generating links from the script in /etc/rc.d/init.d/ to the appropriate /etc/rc.d/rc#.d/ directory. For more information see the LINUX manual page on init.

Basic services include:

System Service 	Description
anacron 	Run jobs which were scheduled for execution while computer was turned off. Catch up with system duties.
arpwatch 	Keeps track of IP address to MAC address pairings
atd 	Run scheduled batch jobs.
autofs 	automounts file systems on demand.
bluetooth, pand, hidd, dund 	Bluetooth netwoork support.
crond 	Job sheduler for periodic tasks.
gpm 	Allows console terminal cut and paste. (Non X-window consoles)
https 	Apache web server.
iptables 	Firewall rules interface to kernel.
keytable 	Loads selected keyboard map as set in /etc/sysconfig/keyboard
kudzu 	New hardware probe/detection during system boot.
lpd or cups 	Network printer services.
microcode_ctl 	Uploads microcode to kernel and ultimately to the Intle Pentium processor. (Hardware specific.)
mysqld 	Database services
named 	DNS name services (Bind)
network 	Active network services during system boot. Required for network connectivity.
nfs 	Network file system. Unix file sharing services. Also uses services: nfslock, portmap, rpcgssd, rpcidmapd, rpcsvcgssd
nscd 	Password and group lookup services for use with network authentication (NIS, LDAP,...).
ntpd 	Network Time Protocol time synchronization services.
random 	Random number generation tool used for encryption.
rawdevices 	Enables raw IO. Useful for Oracle and software which utilizes this for high speed disk access.
smb 	SAMBA: MS/Windows PC file sharing services
syslog 	System log file facility.
ypbind 	NIS file sharing/authentication infrastructure service.
yppasswd 	NIS file sharing/authentication infrastructure service.
ypserv 	NIS file sharing/authentication infrastructure service.
xfs 	X-Windows font server.

Recommended basic services: anacron, ard, autofs, crond, gpm, iptables, keytable, kudzu, microcode_ctl (Intel32 hardware only), network, random. syslog
Graphics Workstation - add: xfs
File Server for PC clients - add: smb
Print Server - add: lpd or cups (hplip - HP Linux Imaging and Printing)
File server Linux/Unix clients - add: nfs, netfs, nfslock, portmap, ypbind, yppasswd, ypserv; NFSv4 add: rpcgssd, rpcidmapd, rpcsvcgssd
Web Server - add: httpd, tux, xinetdi, sshd

GUI configuration tools:
GUI tools can help you configure the appropriate services to start and provide a description of each service available:

    Fedora/RHEL: /usr/bin/system-config-services
    (Also /usr/sbin/serviceconf)
    Red Hat 8.0/9.0: /usr/bin/redhat-config-services
    Ubuntu / Debian:
        bum (Boot Up Manager) (GUI image)
        /usr/bin/services-admin (GUI image)
        /usr/sbin/sysv-rc-conf (console program - see below)

Red Hat / Fedora Core GUI: system-config-services (and redhat-config-services)

Red Hat/Fedora Core text console services selection tool: /usr/sbin/ntsysv

Debian/Ubuntu: sysv-rc-conf
(Install: aptget install sysv-rc-conf)
```

#### 31.2.2.6 Init Script:

```text
A single copy of the script is located in the directory: /etc/rc.d/init.d/script-name (Red Hat/Fedora) or /etc/init.d/script-name (Ubuntu / Debian).
Use the command chkconfig to generate soft links to the appropriate directories for the various run levels.

    #!/bin/sh
    #
    # Startup script for program
    #
    # chkconfig: 345 85 15     - start or stop process definition within the boot process
    # description: Description of program
    # processname: process-name
    # pidfile: /var/run/process-name.pid

    # Source function library.      This creates the operating environment for the process to be started
    . /etc/rc.d/init.d/functions

    case "$1" in
      start)
            echo -n "Starting  process-name: "
            daemon  process-name                 - Starts only one process of a given name.
            echo
            touch /var/lock/subsys/process-name
            ;;
      stop)
            echo -n "Shutting down process-name: "
            killproc process-name
            echo
            rm -f /var/lock/subsys/process-name
            rm -f /var/run/process-name.pid      - Only if process generates this file
            ;;
      status)
            status process-name
            ;;
      restart)
            $0 stop
            $0 start
            ;;
      reload)
            echo -n "Reloading process-name: "
            killproc process-name -HUP
            echo
            ;;
      *)
            echo "Usage: $0 {start|stop|restart|reload|status}"
            exit 1
    esac

    exit 0

The bash script functions daemon, killproc and status can all be found in the script /etc/rc.d/init.d/functions. (Red Hat/Fedora distributions)

The script must be executable to work. (chmod +x script-name).

The script may be used to start and stop processes. i.e.:

    /etc/rc.d/init.d/httpd restart
    (Ubuntu / Debian / S.u.s.e.: /etc/init.d/apache2 restart)
    /etc/rc.d/init.d/httpd stop
    /etc/rc.d/init.d/httpd start

OR use the Red Hat/Fedora core based service command:

    service httpd restart
    service httpd stop
    service httpd start

Note that two lines in the script enable the chkconfig command to control the script for the boot and shutdown process.

    # chkconfig: 345 85 15 
    # description: Description of program
              

When added to the boot process using the "chkconfig --add script-name" command the start order/priority will be set to 80 while the stop/shutdown order will be set to 15. The process will be added to runlevels 3, 4 and 5. This is enabled by generating links from the location of the script (/etc/rc.d/init.d/) to the directory for the appropriate run level: /etc/rc.d/rc#.d/. The file name in the run level directory will reflect if it is used for boot (starts with an "S") or shutdown (starts with a "K")
```

#### 31.2.2.7 chkconfig:

```text
The (Red Hat/Fedora/IRIX) chkconfig command generates and breaks links between the directory /etc/rc.d/init.d/ and the appropriate run level directory: /etc/rc.d/rc[0-6].d/ to control boot process initiation and process shutdown.

     chkconfig [--level ]  on | off | reset >
     chkconfig --list
     chkconfig --list
     chkconfig --add 

     chkconfig --del 
     chkconfig --level 0123456  off
      

Examples:

    chkconfig --level 345 httpd on - forces apache to be invoked for run levels 3, 4 and 5.
    chkconfig --add httpd - Start the web server daemon upon system boot.
    chkconfig --del sendmail - Do not start the sendmail daemon upon system boot.
    chkconfig --list - List all services and init levels.
    chkconfig --list | grep on - List all services to be started upon system boot.

Using chkconfig to administer xinetd processes.

    chkconfig wu-ftpd on - Turn on FTP service managed by xinetd.
    chkconfig ipop3 off - Turn off POP3 service managed by xinetd.

This will reconfigure the appropriate xinetd file (in directory /etc/xinetd.d/) and restart the xinetdprocess.

Also see: chkconfig - Linux man page.
```

#### 31.2.2.8 Related Commands:

```text
    service 	Display status of system services.
    Example: service --status-all
    Help: service --help

Also see: service - Linux man page. 

		31.2.3
	31.3
```
