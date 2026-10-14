---
type: reference
title: FAQ
description: "Monit FAQ on pid file, connection and execution."
tags: [linux, monitoring, faq, legacy]
generated: { by: "human:izaqyos", at: "2026-10-14T00:00:00Z" }
stale_after: "2028-10-14T00:00:00Z"
sources:
  - { id: monit-systemd, resource: "https://mmonit.com/wiki/Monit/Systemd", title: "Monit wiki: Systemd" }
  - { id: monit-manual, resource: "https://mmonit.com/monit/documentation/monit.html", title: "Monit manual" }
  - { id: systemctl-1, resource: "https://man7.org/linux/man-pages/man1/systemctl.1.html", title: "systemctl(1) - Linux manual page" }
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
```

### Running Monit from Init

> Updated 2026-10 to current practice.[^monit-systemd] The original answer used `/etc/inittab` respawn entries, `telinit q`, `chkconfig` and `update-rc.d`; current distributions use systemd for all of this.

Keywords: init, systemd

**Q:** How can I run monit so it is respawned if it dies unexpectedly?

**A:** Run monit in the foreground (`-I`, or `set init` in monitrc) under systemd. Distribution packages already ship a `monit.service`; for a source install the Monit wiki gives this unit (adjust the binary path), e.g. `/etc/systemd/system/monit.service`:[^monit-systemd]

```ini
[Unit]
Description=Pro-active monitoring utility for unix systems
After=network-online.target
Documentation=man:monit(1) https://mmonit.com/wiki/Monit/HowTo

[Service]
Type=simple
KillMode=process
ExecStart=/usr/local/bin/monit -I
ExecStop=/usr/local/bin/monit quit
ExecReload=/usr/local/bin/monit reload
Restart=on-abnormal
StandardOutput=null

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now monit.service
systemctl status monit.service
```

**Race with services also started at boot.** If monit monitors a service that the init system also starts, a slow-starting service can look "down" to monit, which may then try to start it and raise an alert. Two ways to avoid this:

1. **Let monit own the service (recommended by the original FAQ).** Stop systemd from starting it at boot, and have monit start/stop it through systemctl:[^systemctl-1]

   ```bash
   sudo systemctl disable myservice.service   # replaces: chkconfig myservice off / update-rc.d -f myservice remove
   ```

   ```text
   check process myservice with pidfile /run/myservice.pid
       start program = "/usr/bin/systemctl start myservice.service"
       stop program  = "/usr/bin/systemctl stop myservice.service"
   ```

   `monit start all` / `monit stop all` (or `monit start myprocess`) still work for manual control.

2. **Make monit start after the service.** Keep the service enabled and order monit after it with a drop-in (`sudo systemctl edit monit.service`):

   ```ini
   [Unit]
   After=myservice.service
   ```

   systemd only considers the dependency started when the unit reports ready, so the service's unit must have the right `Type=` (e.g. `notify` or `forking`) for this to help. Alternatively, give the check a start delay in monitrc (`set daemon 30 with start delay 60`).[^monit-manual]

Services handled by monit must have start and stop methods defined.

```text
id=__monit_man_page__
```

[^monit-systemd]: Monit wiki: Systemd
[^systemctl-1]: systemctl(1) - Linux manual page
[^monit-manual]: Monit manual
