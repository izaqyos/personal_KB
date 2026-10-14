---
type: reference
title: FAQ
description: "Monit FAQ on pid file, connection and execution."
tags: [linux, monitoring, faq, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "linux/KB_Linux#21.2"
---

# 21.2 FAQ

[↑ Monit](/linux/kb-linux/21-monit/README.md)

```text
Table of Contents

    * Pid File
    * Connection
    * Execution
    * Running Monit from Init 

Pid file

top

Keywords: pid file
Q: If a program crashes without removing its pid file, will monit recognize that the program is not running?

A: Yes, Monit will always check that the pid number in a pid file belongs to a running process. If a program crashes and dies in a "normal" manner, then the process ID (pid) will not exist and monit will know that the program is not running and restart it even if a pid file exist. Some servers can crash and leave a zombie process, and appear to run. Monit also test for zombie processes and will raise an alert if a process has become a zombie.

Keywords: pid file
Q: I have a program that does not create its own pid file. Since monit requires all programs to have a pid file, what do I do?

A: Create a wrapper script and have the script create a pid file before it starts the program. Below you can find an example script for starting an imaginary program (a Java program in this case). Assuming that the script is saved in a file called /bin/xyz, you can call this script from monit by using the following in monitrc:

 check process xyz with pidfile /var/run/xyz.pid
       start = "/bin/xyz start"
       stop = "/bin/xyz stop"

The wrapper script:

 #!/bin/bash
 export JAVA_HOME=/usr/local/java/
 CLASSPATH=ajarfile.jar:.

 case $1 in
    start)
       echo $$ > /var/run/xyz.pid;
       exec 2>&1 java -cp ${CLASSPATH} org.something.with.main 1>/tmp/xyz.out 
       ;;
     stop)  
       kill `cat /var/run/xyz.pid` ;;
     *)  
       echo "usage: xyz {start|stop}" ;;
 esac
 exit 0

Keywords: pid file
Q: Tomcat (The Jakarta Servlet Container) does not create a pid file and will put the server in the background.

A: Edit The catalina.sh script and find and remove the '&' character which will put the Tomcat server in the background. Then call tomcats startup.sh and shutdown.sh scripts from a wrapper script like the one mentioned above.

or

If your catalina.sh contains lines with $CATALINA_PID, you can just set CATALINA_PID=/path/file.pid enviroment variable.
Connection

top

Keywords: Connection testing
Q: I have started monit with HTTP support, but when I telnet into the monit http port the connection closes.

A: If you use the host allow statement, monit will promptly close all connections from hosts it does not find in the host allow list. So make sure that you use the official name for your host or its IP address. If you have a firewall running also make sure that it does not block connections on the monit port.
Execution

top

Keywords: Executing programs
Q: I'm having trouble getting monit to execute any "start" or "stop" program commands. The log file says that they're being executed, and I can't find anything wrong when I run monit in verbose mode.

A: For security reasons monit purges the environment and only sets a spartan PATH variable that contains /bin, /usr/bin, /sbin and /usr/sbin. If your program or script dies, the reason could be that it expects certain environment variables or to find certain programs via PATH. If this is the case you should set the environment variables you need directly in the start or stop script called by monit.
Running Monit from Init

top

Keywords: init
Q: How can I run monit from init so it can be respawned in case monit dies unexpectedly?

A: It is recommended that you use Monit version 5 or later when running Monit from init. Use either the 'set init' statement in monits configuration file or use the -I option from the command line. Here's a sample /etc/inittab entry for monit:

 # Run monit in standard runlevels
 mo:2345:respawn:/usr/local/sbin/monit -Ic /etc/monitrc

After you have modified inits configuration file, you can run the following command to re-examine the runlevel and start monit:

 telinit q

If monit is used to monitor services that are also started at boot time (e.g. services started via SYSV init rc scripts or via inittab) then in some situations a special race condition can occur. That is; if a service is slow to start, monit can assume that the service is not running and possibly try to start it and raise an alert, while, in fact the service is already about to start or already in its startup sequence. If you experience this problem, here are a couple of strategies you can use to prevent this type of race condition:

|1. Start critical services directly from monit:

This is the recommended solution - let monit takeover the responsibility for starting services. To use this strategy you must turn off the systems automatic start and stop for all services handled by monit.

On RedHat, you can for example use:

  chkconfig myservice off

on Debian:

  update-rc.d -f myservice remove

a general example:

  mv /etc/rc2.d/S99myservice /etc/rc2.d/s99myservice

If monit is started from a rc script, then to start and stop the service at systems shutdown, you should add the following lines to monit's rc script:

on start:

  /usr/local/bin/monit -c /etc/monitrc start myprocess

on stop:

  /usr/local/bin/monit -c /etc/monitrc stop myprocess

or if monit handles more than one service, simply start/stop all services by using:

on start:

  /usr/local/bin/monit -c /etc/monitrc start all

on stop:

  /usr/local/bin/monit -c /etc/monitrc stop all

If monit instead is started from init then, add a second line to inittab to stop the service:

  mo:2345:respawn:/usr/local/bin/monit -Ic /etc/monitrc
  mon:2345:wait:/usr/local/bin/monit -Ic /etc/monitrc start myprocess
  moff:06:wait:/usr/local/bin/monit -Ic /etc/monitrc stop myprocess

or to stop all services handled by monit:

  mo:2345:respawn:/usr/local/bin/monit -Ic /etc/monitrc
  mon:2345:wait:/usr/local/bin/monit -Ic /etc/monitrc start all
  moff:06:wait:/usr/local/bin/monit -Ic /etc/monitrc stop all

Services handled by monit must have start and stop methods defined so monit can start and stop a service. For instance:

  check process myservice with pidfile /var/run/myservice.pid
        start program = "/etc/init.d/myservice start"
        stop program = "/etc/init.d/myservice stop"

|2. Make init wait for a service to start:

This solution will make the init process wait for the service to start before it will continue to start other services. If you are running monit from init, you must enter monit's line at the end of /etc/inittab (A short example):

  si::sysinit:/etc/init.d/rcS
  ...
  l2:2:wait:/etc/init.d/rc 2
  ...
  mo:2345:respawn:/usr/local/bin/monit -Ic /etc/monitrc

The rc script for the monitored service must be so, that it will not return unless the service was started or start of the service timed out. Creative use of sleep(1) may be sufficient.

As in the above example, services handled by monit must have start and stop methods defined.

id=__monit_man_page__
```
