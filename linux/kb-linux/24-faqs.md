---
type: reference
title: FAQS
description: "Linux FAQs: killing defunct processes and logrotate/syslog troubleshooting."
tags: [linux, faq, logging, troubleshooting, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "linux/KB_Linux#24"
---

# FAQS

[↑ KB_Linux](/linux/kb-linux/README.md)

## 24.1 howto kill defunct processes

```text
Would anyone know the best procedure for killing "defunct" processes? I tried killing some but they reappear. I'm not sure how to locate their parent process and stop the "defunct" pid's from coming back.
  	
	
A process can't "come back". What happens is either 1) the process never really died, or 2) the parent process is intentionally monitoring it's children and actively spawning another process when the first one got killed. I suspect number one, as programs can handle a term signal without terminating. If it is number two, then the processes are very likely not defunct, as they are respawning other processes.
  	
	
You cannot kill a defunct process (a.k.a zombie) as it is already dead.
It doesn't take any resources so it's no big deal but if you really want it to disappear form the process table you need to have its parent procees reaping it.
"pstree" should give you the process hierarchy and "kill -1 <parent-pid>" is sometimes enough for the job.
  	



A couple of comments and the answer to your qestion:

a. If you want to kill a process first find out the pid. For example I want to kill "mythfrontend" process

tdec@amd:~> ps -C mythfrontend
PID TTY TIME CMD
11063 ? 00:01:05 mythfrontend
tdec@amd:~> kill -9 11063

b. Here a great tip from another user (Thxs Bill Dandreta):
Sometimes

kill -9 <pid>

will not kill a process. Run

ps -xal

the 4rd field is the parent process, kill all of a zombie's parents and the zombie dies!

Example

4 0 18581 31706 17 0 2664 1236 wait S ? 0:00 sh -c /usr/bin/gcc -fomit-frame-pointer -O -mfpmat
4 0 18582 18581 17 0 2064 828 wait S ? 0:00 /usr/i686-pc-linux-gnu/gcc-bin/3.3.6/gcc -fomit-fr
4 0 18583 18582 21 0 6684 3100 - R ? 0:00 /usr/lib/gcc-lib/i686-pc-linux-gnu/3.3.6/cc1 -quie

18581,18582,18583 are zombies -

kill -9 18581 18582 18583

has no effect.

kill -9 31706

removes the zombies.


In any case, try less extreme options before "kill -9". eg:
Code:

kill -1 31706
kill 31706
kill -2 31706

Check the zombies presence after each of these commands.
Use "kill -9" only if the zombies are still there.
```

## 24.2 logrotate and syslog Troubleshoot

```text
		24.2.1 CSCty31541 Log Rotation:Excess log file generated for Runtime, Mgmt & mgmtAudit log (blocker for testing?)
test fix:
# cat /etc/logrotate.d/acs-logrotate 
/opt/CSCOacs/logs/monit.log {
    rotate 9
    size=5M
    missingok
}

/opt/CSCOacs/logs/acsupgrade.log {
    rotate 9
    size=5M
    missingok
}

/opt/CSCOacs/mgmt/apache-tomcat-6.0.18/logs/catalina.out {
    rotate 9
    size=5M
    missingok
}

## <user>: File was previously managed by both logrotate & log4j configuration
## I removed this duplicity and left only the log4j configuration
#/opt/CSCOacs/logs/ACSManagementAudit.log {
#    rotate 9
#    size=5M
#    missingok
#}

/opt/CSCOacs/logs/MonitoringAndReportingProcess.log {
    rotate 9
    size=5M
    missingok
}


/opt/CSCOacs/logs/ACSADAgent.log {
    rotate 9
    size=5M
    missingok
}

/opt/CSCOacs/db/dberr.log {
    rotate 9
    size=10M
    missingok
}

	--> logrotate settings
# cat /etc/cron.minute/logrotate 
#!/bin/sh

/usr/sbin/logrotate /etc/logrotate.conf
EXITVALUE=$?
if [ $EXITVALUE != 0 ]; then
    /usr/bin/logger -t logrotate "ALERT exited abnormally with [$EXITVALUE]"
fi
exit 0
# cat /etc/logrotate.conf
# see "man logrotate" for details
# rotate log files weekly
weekly

# keep 4 weeks worth of backlogs
rotate 4

# create new (empty) log files after rotating old ones
create

# uncomment this if you want your log files compressed
#compress

# RPM packages drop log rotation information into this directory
include /etc/logrotate.d

# no packages own wtmp -- we'll rotate them here
/var/log/wtmp {
    monthly
    create 0664 root utmp
    rotate 1
}

# system-specific logs may be also be configured here.


	-->
inflate:
# while true; do  echo aaaaaaaaaaaaaaaaaaaaaaaa >>  /opt/CSCOacs/logs/acsupgrade.log; done

monitor:
# while true; do  ls -lh /opt/CSCOacs/logs/acsupgrade.log*; sleep 60; date; done
-rw-r--r-- 1 root root 2.4K Mar 21 16:49 /opt/CSCOacs/logs/acsupgrade.log
Wed Mar 21 17:39:11 IST 2012
-rw-r--r-- 1 root root 2.4K Mar 21 16:49 /opt/CSCOacs/logs/acsupgrade.log
...
Wed Mar 21 17:41:11 IST 2012
-rw-r--r-- 1 root root 43M Mar 21 17:41 /opt/CSCOacs/logs/acsupgrade.log
Wed Mar 21 17:42:12 IST 2012
-rw-r--r-- 1 root root 79M Mar 21 17:42 /opt/CSCOacs/logs/acsupgrade.log
Wed Mar 21 17:43:12 IST 2012
-rw-r--r-- 1 root root 99M Mar 21 17:42 /opt/CSCOacs/logs/acsupgrade.log
Wed Mar 21 17:44:12 IST 2012
-rw-r--r-- 1 root root 99M Mar 21 17:42 /opt/CSCOacs/logs/acsupgrade.log
Wed Mar 21 17:45:12 IST 2012
-rw-r--r-- 1 root root 99M Mar 21 17:42 /opt/CSCOacs/logs/acsupgrade.log
Wed Mar 21 17:46:12 IST 2012
-rw-r--r-- 1 root root 99M Mar 21 17:42 /opt/CSCOacs/logs/acsupgrade.log
Wed Mar 21 17:47:12 IST 2012
-rw-r--r-- 1 root root 99M Mar 21 17:42 /opt/CSCOacs/logs/acsupgrade.log
Wed Mar 21 17:48:12 IST 2012
-rw-r--r-- 1 root root 99M Mar 21 17:42 /opt/CSCOacs/logs/acsupgrade.log
Wed Mar 21 17:49:12 IST 2012
-rw-r--r-- 1 root root 99M Mar 21 17:42 /opt/CSCOacs/logs/acsupgrade.log


	--> That sucks - logrotate not working. why?
# tail -f /var/log/messages 
Mar 21 17:07:27 acs-<user>-02 SQLAnywhere(acssrvr): Starting checkpoint of "acsdb" (acs.db) at Wed Mar 21 2012 17:07
Mar 21 17:07:27 acs-<user>-02 SQLAnywhere(acssrvr): Finished checkpoint of "acsdb" (acs.db) at Wed Mar 21 2012 17:07
Mar 21 17:15:01 acs-<user>-02 logrotate: ALERT exited abnormally with [1]
Mar 21 17:27:28 acs-<user>-02 SQLAnywhere(acssrvr): Starting checkpoint of "acsdb" (acs.db) at Wed Mar 21 2012 17:27
Mar 21 17:27:28 acs-<user>-02 SQLAnywhere(acssrvr): Finished checkpoint of "acsdb" (acs.db) at Wed Mar 21 2012 17:27
Mar 21 17:30:01 acs-<user>-02 logrotate: ALERT exited abnormally with [1]
Mar 21 17:30:46 acs-<user>-02 sshd[6561]: Accepted keyboard-interactive/pam for root from 64.103.121.183 port 53913 ssh2
Mar 21 17:34:12 acs-<user>-02 sshd[6630]: error: PAM: Authentication failure for root from 64.103.121.183
Mar 21 17:34:16 acs-<user>-02 sshd[6630]: Accepted keyboard-interactive/pam for root from 64.103.121.183 port 53926 ssh2
Mar 21 17:45:01 acs-<user>-02 logrotate: ALERT exited abnormally with [1]
Mar 21 17:47:29 acs-<user>-02 SQLAnywhere(acssrvr): Starting checkpoint of "acsdb" (acs.db) at Wed Mar 21 2012 17:47
Mar 21 17:47:29 acs-<user>-02 SQLAnywhere(acssrvr): Finished checkpoint of "acsdb" (acs.db) at Wed Mar 21 2012 17:47
Mar 21 17:48:48 acs-<user>-02 SQLAnywhere(acsview): Starting checkpoint of "acsview" (acsview51.db) at Wed Mar 21 2012 17:48
Mar 21 17:48:55 acs-<user>-02 SQLAnywhere(acsview): Finished checkpoint of "acsview" (acsview51.db) at Wed Mar 21 2012 17:48


# /usr/sbin/logrotate -v /etc/logrotate.conf
reading config file /etc/logrotate.conf
including /etc/logrotate.d
reading config file ADE
reading config info for /var/log/ade/ADE.log 
reading config info for /var/log/backup*.log 
reading config info for /var/log/restore*.log 
reading config file acs-logrotate
reading config info for /opt/CSCOacs/logs/monit.log 
reading config info for /opt/CSCOacs/logs/acsupgrade.log 
reading config info for /opt/CSCOacs/mgmt/apache-tomcat-6.0.18/logs/catalina.out 
reading config info for /opt/CSCOacs/logs/MonitoringAndReportingProcess.log 
reading config info for /opt/CSCOacs/logs/ACSADAgent.log 
reading config info for /opt/CSCOacs/db/dberr.log 
reading config file conman
reading config info for /var/log/conman/* 
olddir is now /var/log/conman.old/
reading config file mgetty
reading config info for /var/log/mgetty.log.tty[^.] /var/log/mgetty.log.tty[^.][^.] /var/log/mgetty.log.tty[^.][^.][^.] /var/log/mgetty.log.tty[^.][^.][^.][^.] /var/log/mgetty.log.tty[^.][^.][^.][^.][^.] /var/log/mgetty.log.tty[^.][^.][^.][^.][^.][^.] /var/log/mgetty.log.tty[^.][^.][^.][^.][^.][^.][^.] /var/log/mgetty.log.tty[^.][^.][^.][^.][^.][^.][^.][^.] /var/log/mgetty.log.tty[^.][^.][^.][^.][^.][^.][^.][^.][^.] /var/log/mgetty.log.tty[^.][^.][^.][^.][^.][^.][^.][^.][^.][^.] /var/log/mgetty.log.unknown /var/log/mgetty.callback 
reading config file named
reading config info for /var/log/named.log 
error: named:3 unknown user 'named'

# grep named /etc/logrotate.d/*
/etc/logrotate.d/named:/var/log/named.log {
/etc/logrotate.d/named:    create 0644 named named
/etc/logrotate.d/named:        /sbin/service named reload  2> /dev/null > /dev/null || true
# cat /etc/logrotate.d/named
/var/log/named.log {
    missingok
    create 0644 named named
    postrotate
        /sbin/service named reload  2> /dev/null > /dev/null || true
    endscript
}

	--> Remove named to fix 
# rm !$
rm /etc/logrotate.d/named
rm: remove regular file `/etc/logrotate.d/named'? y
# /usr/sbin/logrotate -v /etc/logrotate.conf
reading config file /etc/logrotate.conf
including /etc/logrotate.d
reading config file ADE
reading config info for /var/log/ade/ADE.log 
reading config info for /var/log/backup*.log 
reading config info for /var/log/restore*.log 
reading config file acs-logrotate
reading config info for /opt/CSCOacs/logs/monit.log 
reading config info for /opt/CSCOacs/logs/acsupgrade.log 
reading config info for /opt/CSCOacs/mgmt/apache-tomcat-6.0.18/logs/catalina.out 
reading config info for /opt/CSCOacs/logs/MonitoringAndReportingProcess.log 
reading config info for /opt/CSCOacs/logs/ACSADAgent.log 
reading config info for /opt/CSCOacs/db/dberr.log 
reading config file conman
reading config info for /var/log/conman/* 
olddir is now /var/log/conman.old/
reading config file mgetty
reading config info for /var/log/mgetty.log.tty[^.] /var/log/mgetty.log.tty[^.][^.] /var/log/mgetty.log.tty[^.][^.][^.] /var/log/mgetty.log.tty[^.][^.][^.][^.] /var/log/mgetty.log.tty[^.][^.][^.][^.][^.] /var/log/mgetty.log.tty[^.][^.][^.][^.][^.][^.] /var/log/mgetty.log.tty[^.][^.][^.][^.][^.][^.][^.] /var/log/mgetty.log.tty[^.][^.][^.][^.][^.][^.][^.][^.] /var/log/mgetty.log.tty[^.][^.][^.][^.][^.][^.][^.][^.][^.] /var/log/mgetty.log.tty[^.][^.][^.][^.][^.][^.][^.][^.][^.][^.] /var/log/mgetty.log.unknown /var/log/mgetty.callback 
reading config file psacct
reading config info for /var/account/pacct 
reading config file rpm
reading config info for /var/log/rpmpkgs 
reading config file squid
reading config info for /var/log/squid/access.log 
reading config info for /var/log/squid/cache.log 
reading config info for /var/log/squid/store.log 
reading config file syslog
reading config info for /var/log/messages /var/log/secure /var/log/maillog /var/log/spooler /var/log/boot.log /var/log/cron 
reading config file yum
reading config info for /var/log/yum.log 
reading config info for /var/log/wtmp 

Handling 19 logs

rotating pattern: /var/log/ade/ADE.log  5242880 bytes (10 rotations)
empty log files are rotated, old logs are removed
considering log /var/log/ade/ADE.log
  log does not need rotating

rotating pattern: /var/log/backup*.log  5242880 bytes (10 rotations)
empty log files are rotated, old logs are removed
considering log /var/log/backup*.log
  log /var/log/backup*.log does not exist -- skipping

rotating pattern: /var/log/restore*.log  5242880 bytes (10 rotations)
empty log files are rotated, old logs are removed
considering log /var/log/restore*.log
  log /var/log/restore*.log does not exist -- skipping

rotating pattern: /opt/CSCOacs/logs/monit.log  5242880 bytes (9 rotations)
empty log files are rotated, old logs are removed
considering log /opt/CSCOacs/logs/monit.log
  log does not need rotating

rotating pattern: /opt/CSCOacs/logs/acsupgrade.log  5242880 bytes (9 rotations)
empty log files are rotated, old logs are removed
considering log /opt/CSCOacs/logs/acsupgrade.log
  log needs rotating
rotating log /opt/CSCOacs/logs/acsupgrade.log, log->rotateCount is 9
renaming /opt/CSCOacs/logs/acsupgrade.log.9 to /opt/CSCOacs/logs/acsupgrade.log.10 (rotatecount 9, logstart 1, i 9), 
old log /opt/CSCOacs/logs/acsupgrade.log.9 does not exist
renaming /opt/CSCOacs/logs/acsupgrade.log.8 to /opt/CSCOacs/logs/acsupgrade.log.9 (rotatecount 9, logstart 1, i 8), 
old log /opt/CSCOacs/logs/acsupgrade.log.8 does not exist
renaming /opt/CSCOacs/logs/acsupgrade.log.7 to /opt/CSCOacs/logs/acsupgrade.log.8 (rotatecount 9, logstart 1, i 7), 
old log /opt/CSCOacs/logs/acsupgrade.log.7 does not exist
renaming /opt/CSCOacs/logs/acsupgrade.log.6 to /opt/CSCOacs/logs/acsupgrade.log.7 (rotatecount 9, logstart 1, i 6), 
old log /opt/CSCOacs/logs/acsupgrade.log.6 does not exist
renaming /opt/CSCOacs/logs/acsupgrade.log.5 to /opt/CSCOacs/logs/acsupgrade.log.6 (rotatecount 9, logstart 1, i 5), 
old log /opt/CSCOacs/logs/acsupgrade.log.5 does not exist
renaming /opt/CSCOacs/logs/acsupgrade.log.4 to /opt/CSCOacs/logs/acsupgrade.log.5 (rotatecount 9, logstart 1, i 4), 
old log /opt/CSCOacs/logs/acsupgrade.log.4 does not exist
renaming /opt/CSCOacs/logs/acsupgrade.log.3 to /opt/CSCOacs/logs/acsupgrade.log.4 (rotatecount 9, logstart 1, i 3), 
old log /opt/CSCOacs/logs/acsupgrade.log.3 does not exist
renaming /opt/CSCOacs/logs/acsupgrade.log.2 to /opt/CSCOacs/logs/acsupgrade.log.3 (rotatecount 9, logstart 1, i 2), 
old log /opt/CSCOacs/logs/acsupgrade.log.2 does not exist
renaming /opt/CSCOacs/logs/acsupgrade.log.1 to /opt/CSCOacs/logs/acsupgrade.log.2 (rotatecount 9, logstart 1, i 1), 
old log /opt/CSCOacs/logs/acsupgrade.log.1 does not exist
renaming /opt/CSCOacs/logs/acsupgrade.log.0 to /opt/CSCOacs/logs/acsupgrade.log.1 (rotatecount 9, logstart 1, i 0), 
old log /opt/CSCOacs/logs/acsupgrade.log.0 does not exist
log /opt/CSCOacs/logs/acsupgrade.log.10 doesn't exist -- won't try to dispose of it
renaming /opt/CSCOacs/logs/acsupgrade.log to /opt/CSCOacs/logs/acsupgrade.log.1
creating new log mode = 0644 uid = 0 gid = 0

rotating pattern: /opt/CSCOacs/mgmt/apache-tomcat-6.0.18/logs/catalina.out  5242880 bytes (9 rotations)
empty log files are rotated, old logs are removed
considering log /opt/CSCOacs/mgmt/apache-tomcat-6.0.18/logs/catalina.out
  log does not need rotating

rotating pattern: /opt/CSCOacs/logs/MonitoringAndReportingProcess.log  5242880 bytes (9 rotations)
empty log files are rotated, old logs are removed
considering log /opt/CSCOacs/logs/MonitoringAndReportingProcess.log
  log does not need rotating

rotating pattern: /opt/CSCOacs/logs/ACSADAgent.log  5242880 bytes (9 rotations)
empty log files are rotated, old logs are removed
considering log /opt/CSCOacs/logs/ACSADAgent.log
  log does not need rotating

rotating pattern: /opt/CSCOacs/db/dberr.log  10485760 bytes (9 rotations)
empty log files are rotated, old logs are removed
considering log /opt/CSCOacs/db/dberr.log
  log does not need rotating

rotating pattern: /var/log/conman/*  weekly (4 rotations)
olddir is /var/log/conman.old/, empty log files are not rotated, old logs are removed
considering log /var/log/conman/*
  log /var/log/conman/* does not exist -- skipping
not running postrotate script, since no logs were rotated

rotating pattern: /var/log/mgetty.log.tty[^.] /var/log/mgetty.log.tty[^.][^.] /var/log/mgetty.log.tty[^.][^.][^.] /var/log/mgetty.log.tty[^.][^.][^.][^.] /var/log/mgetty.log.tty[^.][^.][^.][^.][^.] /var/log/mgetty.log.tty[^.][^.][^.][^.][^.][^.] /var/log/mgetty.log.tty[^.][^.][^.][^.][^.][^.][^.] /var/log/mgetty.log.tty[^.][^.][^.][^.][^.][^.][^.][^.] /var/log/mgetty.log.tty[^.][^.][^.][^.][^.][^.][^.][^.][^.] /var/log/mgetty.log.tty[^.][^.][^.][^.][^.][^.][^.][^.][^.][^.] /var/log/mgetty.log.unknown /var/log/mgetty.callback  weekly (4 rotations)
empty log files are rotated, old logs are removed
considering log /var/log/mgetty.log.tty[^.]
  log /var/log/mgetty.log.tty[^.] does not exist -- skipping
considering log /var/log/mgetty.log.tty[^.][^.]
  log /var/log/mgetty.log.tty[^.][^.] does not exist -- skipping
considering log /var/log/mgetty.log.tty[^.][^.][^.]
  log /var/log/mgetty.log.tty[^.][^.][^.] does not exist -- skipping
considering log /var/log/mgetty.log.tty[^.][^.][^.][^.]
  log /var/log/mgetty.log.tty[^.][^.][^.][^.] does not exist -- skipping
considering log /var/log/mgetty.log.tty[^.][^.][^.][^.][^.]
  log /var/log/mgetty.log.tty[^.][^.][^.][^.][^.] does not exist -- skipping
considering log /var/log/mgetty.log.tty[^.][^.][^.][^.][^.][^.]
  log /var/log/mgetty.log.tty[^.][^.][^.][^.][^.][^.] does not exist -- skipping
considering log /var/log/mgetty.log.tty[^.][^.][^.][^.][^.][^.][^.]
  log /var/log/mgetty.log.tty[^.][^.][^.][^.][^.][^.][^.] does not exist -- skipping
considering log /var/log/mgetty.log.tty[^.][^.][^.][^.][^.][^.][^.][^.]
  log /var/log/mgetty.log.tty[^.][^.][^.][^.][^.][^.][^.][^.] does not exist -- skipping
considering log /var/log/mgetty.log.tty[^.][^.][^.][^.][^.][^.][^.][^.][^.]
  log /var/log/mgetty.log.tty[^.][^.][^.][^.][^.][^.][^.][^.][^.] does not exist -- skipping
considering log /var/log/mgetty.log.tty[^.][^.][^.][^.][^.][^.][^.][^.][^.][^.]
  log /var/log/mgetty.log.tty[^.][^.][^.][^.][^.][^.][^.][^.][^.][^.] does not exist -- skipping
considering log /var/log/mgetty.log.unknown
  log /var/log/mgetty.log.unknown does not exist -- skipping
considering log /var/log/mgetty.callback
  log /var/log/mgetty.callback does not exist -- skipping

rotating pattern: /var/account/pacct  after 1 days (31 rotations)
empty log files are not rotated, old logs are removed
considering log /var/account/pacct
  log does not need rotating
not running postrotate script, since no logs were rotated

rotating pattern: /var/log/rpmpkgs  weekly (4 rotations)
empty log files are not rotated, old logs are removed
considering log /var/log/rpmpkgs
  log does not need rotating

rotating pattern: /var/log/squid/access.log  weekly (5 rotations)
empty log files are not rotated, old logs are removed
considering log /var/log/squid/access.log
  log /var/log/squid/access.log does not exist -- skipping

rotating pattern: /var/log/squid/cache.log  weekly (5 rotations)
empty log files are not rotated, old logs are removed
considering log /var/log/squid/cache.log
  log /var/log/squid/cache.log does not exist -- skipping

rotating pattern: /var/log/squid/store.log  weekly (5 rotations)
empty log files are not rotated, old logs are removed
considering log /var/log/squid/store.log
  log /var/log/squid/store.log does not exist -- skipping
not running postrotate script, since no logs were rotated

rotating pattern: /var/log/messages /var/log/secure /var/log/maillog /var/log/spooler /var/log/boot.log /var/log/cron  weekly (4 rotations)
empty log files are rotated, old logs are removed
considering log /var/log/messages
  log does not need rotating
considering log /var/log/secure
  log does not need rotating
considering log /var/log/maillog
  log does not need rotating
considering log /var/log/spooler
  log does not need rotating
considering log /var/log/boot.log
  log does not need rotating
considering log /var/log/cron
  log does not need rotating
not running postrotate script, since no logs were rotated

rotating pattern: /var/log/yum.log  yearly (4 rotations)
empty log files are not rotated, old logs are removed
considering log /var/log/yum.log
  log does not need rotating

rotating pattern: /var/log/wtmp  monthly (1 rotations)
empty log files are rotated, old logs are removed
considering log /var/log/wtmp
  log does not need rotating

	--> after succesful run:
Wed Mar 21 17:58:12 IST 2012
-rw-r--r-- 1 root root   0 Mar 21 17:57 /opt/CSCOacs/logs/acsupgrade.log
-rw-r--r-- 1 root root 99M Mar 21 17:42 /opt/CSCOacs/logs/acsupgrade.log.1
Wed Mar 21 17:59:12 IST 2012
-rw-r--r-- 1 root root   0 Mar 21 17:57 /opt/CSCOacs/logs/acsupgrade.log
-rw-r--r-- 1 root root 99M Mar 21 17:42 /opt/CSCOacs/logs/acsupgrade.log.1
Wed Mar 21 18:00:12 IST 2012
-rw-r--r-- 1 root root   0 Mar 21 17:57 /opt/CSCOacs/logs/acsupgrade.log
-rw-r--r-- 1 root root 99M Mar 21 17:42 /opt/CSCOacs/logs/acsupgrade.log.1

even rerun doesn't help
# /usr/sbin/logrotate -v /etc/logrotate.conf
...
rotating pattern: /opt/CSCOacs/logs/acsupgrade.log  5242880 bytes (9 rotations)
empty log files are rotated, old logs are removed
considering log /opt/CSCOacs/logs/acsupgrade.log
  log does not need rotating
  ...

	--> crontab settings
# cat /etc/crontab 
SHELL=/bin/bash
PATH=/sbin:/bin:/usr/sbin:/usr/bin
MAILTO=root
HOME=/

# run-parts
01 * * * * root run-parts /etc/cron.hourly
02 4 * * * root run-parts /etc/cron.daily
22 4 * * 0 root run-parts /etc/cron.weekly
42 4 1 * * root run-parts /etc/cron.monthly
0,15,30,45  * * * * root run-parts /etc/cron.minute
# crontab -l
00 5 * * * /opt/CSCOacs/bin/check-view-compress.sh
00 5 * * * /opt/CSCOacs/bin/check-view-compress.sh

logrotate runs every 15 minuts.

To fix: 
	a. check named problem
	b. change to run logrotate every minute
(so that files don't pass threshold so fast)
crontab -e 
*/1 * * * * echo "job every minute"

	c. Make syslog close fd (so doesn't get stuck on writing to xxx.log.1)
# cat /etc/syslog.conf 
local0.info                                                                     /var/log/ade/ADE.log
*.info;mail.none;news.none;authpriv.none;cron.none;local0.none;local1.none      /var/log/messages
authpriv.*                                                                      /var/log/secure
mail.*                                                                          -/var/log/maillog
cron.*                                                                          /var/log/cron
*.emerg                                                                         *
uucp,news.crit                                                                  /var/log/spooler
local7.*                                                                        /var/log/boot.log

#Application acs Generated config
# Centrify DirectControl logging (automatically added when ACS installed)
auth.debug                         -/opt/CSCOacs/logs/ACSADAgent.log

# monit logging - local6
# centrify - auth.*
local6.*                         /opt/CSCOacs/logs/monit.log
local6.*;auth.*                  /var/log/ade/ADE.log

remove the - so that syslog will flush on each write
```

### 24.2.2 logrotate keeps writing to xxx.log.1 file

```text
Hi,

I seem to be having a problem with logrotate, or not understanding the
way logrotate works.

I have a log that is created from a redirection in a script ( ... >
mylog.log)

The thing is, that when this log gets rotated, the wrong file keeps
growing. Something like this:

0 nov 3 17:24 mylog.log
422 nov 3 17:43 mylog.log.1

Instead of mylog.log growing, now mylog.log.1 grows. And tomorrow, I
will have 2 zero size files, and mylog.log.2 will grow.

Is there any way to make this work without having to restart my
process?

----------------------------------------------------------------
Put a SIGHUP handler and generate a PID file in the script. On the HUP
close and reopen the logfile. Tell logrotate in postrotate processing to
"kill -HUP `cat /the/PIF/file`" the script.

----------------------------------------------------------------
Not if you get the SIGHUP handler right. do 'info bash' and search for
`trap' (exactly as typed).

try this:

somewhere that gets executed once

trap 'SIGED=1' SIGHUP

then in your main processing loop

if [ $SIGED -eq 1 ] ; then
SIGED=0
close the logfile
open the logfile
fi
----------------------------------------------------------------
Here is my understanding of what is happening: logrotate seems like its doing an "mv" on mylog.log to mylog.log.1 but your program is just continuing to write its output, but now to a file named mylog.log.1. What is needed is for the logging to continue, but to to mylog.log. To do this, your program doing the logging needs to close its current log output file (which is now mylog.log.1) and (re)open mylog.log and write its output to mylog.log. If your program was created to accept the HUP signal, then upon receipt of that signal, it should close its log file and reopen it, then this should fix the problem - thats what the "kill -HUP pid" stuff is about and that's what programs are supposed to do with a HUP (in addition to rereading config files). I'm referring to a C program here (and you have referred to your shell script) because I was trying to figure the same thing out, but for a C program.
----------------------------------------------------------------
```

### 24.2.3 rsyslog and log rotate problem

```text
I have an Ubuntu 10.0.4 LTS server running as my syslog server for all my devices that can use it.

in /etc/rsyslog.d/50-default.conf I added these lines at the top:

Code:
:msg, contains, "atl1-wichorus" /var/log/wic1.atl.log
:msg, contains, "atl2-wichorus" /var/log/wic2.atl.log
:msg, contains, "jax1-wichorus" /var/log/wic1.jax.log
:msg, contains, "jax2-wichorus" /var/log/wic2.jax.log
incoming messages are directed to the proper log files. The problem is when the files rotate - /var/log/wic1.atl.log becomes /var/log/wic1.atl.log.1 like it's supposed to, and a new 0-byte /var/log/wic1.atl.log is created. However, syslog writes new messages to the /var/log/wic1.atl.log.1 file. Since the new /var/log/wic1.atl.log is always 0 bytes, it never gets rotated again.

I have a file in /etc/logrotate.d that contains:

Code:
/var/log/wic*.log {
        daily
        missingok
        rotate 8
        compress
        delaycompress
        notifempty
        create 640 root adm
        endscript
        postrotate
                reload rsyslog >/dev/null 2>&1 || true

}
So these files only start writing to the new file if I restart syslog.

Code:
-rw-r-----  1 root      adm             0 2012-02-16 04:37 wic1.atl.log
-rw-r-----  1 syslog    adm    4936864679 2012-02-23 08:14 wic1.atl.log.1
-rw-r-----  1 syslog    adm      35695955 2012-02-15 11:59 wic1.atl.log.2.gz
-rw-r-----  1 syslog    adm      29216126 2012-02-14 08:31 wic1.atl.log.3.gz
-rw-r-----  1 syslog    adm     174011677 2012-02-13 09:13 wic1.atl.log.4.gz
-rw-r-----  1 syslog    adm       2426022 2012-02-08 11:01 wic1.atl.log.5.gz
-rw-r-----  1 syslog    adm      24951368 2012-02-02 11:08 wic1.atl.log.6.gz
I even added "/etc/init.d/rsyslog restart" to the logrotate script, and that didn't work either! It does when I do it on a command line.. What am I missing here?
Last edited by suprstar; 02-23-2012 at 07:17 AM.
 	
 02-23-2012, 11:37 AM	   #2
pafoo
LQ Newbie
 
Registered: Jul 2011
Location: Alabama
Distribution: Red Hat/Ubuntu/Solaris
Posts: 27

Rep: 
Take the * out of your logrotate conf file and specify each file to get rotated. See if that helps.
 	
 02-24-2012, 04:29 AM	   #3
Reuti
Member
Contributing Member
 
Registered: Dec 2004
Location: Marburg, Germany
Distribution: openSUSE 11.4
Posts: 940

Rep: 
The endscript is missing below the reload command (man logrotate). Also the “|| true” shouldn’t be necessary.
 	
1 members found this post helpful.
 02-26-2012, 06:09 AM	   #4
suprstar
Member
 
Registered: Aug 2010
Location: Atlanta
Distribution: ubuntu, redhat
Posts: 132
Blog Entries: 2

Original Poster 
Rep: 
Quote:
Originally Posted by Reuti  
The endscript is missing below the reload command (man logrotate). Also the “|| true” shouldn’t be necessary.
That was it, the 'endscript' was in the middle of the config, not at the end. Thanks!
```

### 24.2.4 Run bash command for exactly X seconds time

#### 24.2.4.1 simplest approach

```text
You could run the command as a background job (i.e. with "&"), use the bash variable for "pid of last command run," sleep for the requisite amount of time, then run kill with that pid.

# while true; do  echo aaaaaaaaaaaaaaaaaaaaaaaa ; done & sleep 1 ; kill $!

this approach elaborated:
The following script shows how to do this using background tasks. The first section kills a 60-second process after the 10-second limit. The second attempts to kill a process that's already exited. Keep in mind that, if you set your timeout really high, the process IDs may roll over and you'll kill the wrong process but this is more of a theoretical issue - the timeout would have to be very large and you would have to be starting a lot of processes.

#!/usr/bin/bash

sleep 60 &
pid=$!
sleep 10
kill -9 $pid

sleep 3 &
pid=$!
sleep 10
kill -9 $pid

Here's the output on my Cygwin box:

$ ./limit10
./limit10: line 9:  4492 Killed sleep 60
./limit10: line 11: kill: (4560) - No such process

If you want to only wait until the process has finished, you need to enter a loop and check. This is slightly less accurate since sleep 1 and the other commands will actually take more than one second (but not much more). Use this script to replace the second section above (the "echo $proc" and "date" commands are for debugging, I wouldn't expect to have them in the final solution).

#!/usr/bin/bash

date
sleep 3 &
pid=$!
((lim = 10))
while [[ $lim -gt 0 ]] ; do
    sleep 1
    proc=$(ps -ef | awk -v pid=$pid '$2==pid{print}{}')
    echo $proc
    ((lim = lim - 1))
    if [[ -z "$proc" ]] ; then
            ((lim = -9))
    fi
done
date
if [[ $lim -gt -9 ]] ; then
    kill -9 $pid
fi
date

It basically loops, checking if the process is still running every second. If not, it exits the loop with a special value to not try and kill the child. Otherwise it times out and does kill the child.

Here's the output for a sleep 3:

Mon Feb  9 11:10:37 WADT 2009
pax 4268 2476 con 11:10:37 /usr/bin/sleep
pax 4268 2476 con 11:10:37 /usr/bin/sleep
Mon Feb  9 11:10:41 WADT 2009
Mon Feb  9 11:10:41 WADT 2009

and a sleep 60:

Mon Feb  9 11:11:51 WADT 2009
pax 4176 2600 con 11:11:51 /usr/bin/sleep
pax 4176 2600 con 11:11:51 /usr/bin/sleep
pax 4176 2600 con 11:11:51 /usr/bin/sleep
pax 4176 2600 con 11:11:51 /usr/bin/sleep
pax 4176 2600 con 11:11:51 /usr/bin/sleep
pax 4176 2600 con 11:11:51 /usr/bin/sleep
pax 4176 2600 con 11:11:51 /usr/bin/sleep
pax 4176 2600 con 11:11:51 /usr/bin/sleep
pax 4176 2600 con 11:11:51 /usr/bin/sleep
pax 4176 2600 con 11:11:51 /usr/bin/sleep
Mon Feb  9 11:12:03 WADT 2009
Mon Feb  9 11:12:03 WADT 2009
./limit10: line 20:  4176 Killed sleep 60
```

#### 24.2.4.2 More sophisticated

```text
- c:\work\scripts\bash\timeout3.sh 

- You are probably looking for the timeout command in coreutils. Since it's a part of coreutils, it is technically a C solution, but it's still coreutils. info timeout for more details. Here's an example:

timeout 5 /path/to/slow/command with options

	
- In Mac you can install this via Macports or homebrew. – Ivan Z. Siu Jan 31 at 5:00
feedback
up vote 6 down vote
	

I prefer "timelimit", which has a package at least in debian.

http://devel.ringlet.net/sysutils/timelimit/

It is a bit nicer than the coreutils "timeout" because it prints something when killing the process, and it also sends SIGKILL after some time by default.


			24.2.4.3
```

### 24.2.5 Limit find to only one file

```text
find . -type f -name $l | sed -e '1p' 
```

### 24.2.6 How to insert a date inside the filename with logrotate

```text
I need to set logrotate to rotate logs files from an application running on the server. I need the date inside the filename.

I set dateext and also dateformat to add a - in the date. The result filename is:whatever.csv_2012-03-03

I would like the timestamp to be part of the filename keeping safe the extension; Whatever_2012-03-03.csv.

----------------------------------------------------------------
You should be able to keep the extension apart, e.g. whatever.2012-03-03.csv, with the following configuration:

whatever.csv {
  dateext
  dateformat %Y-%m-%d.
  extension csv
  ...
}
Note the dateext is deliberately empty.

----------------------------------------------------------------
To insert the date within the filename (and not as extension) of a file under Linux while rotating a file it is correct to use:

# Daily rotation
    daily

# We keep original file live
    copytruncate

# Rotation is 1 so we have always .1 as extension
    rotate 1

# If file is missing keep working
    missingok

   sharedscripts
   postrotate
           day=$(date +%Y-%m-%d)
           mv blabla.csv.1 /var/www/gamelogs/dir/blabla$day.csv
   endscript
}
Simple and work fine.
----------------------------------------------------------------
```

## 24.3 how-to-list-just-directories-the-correct-way

```text
Before that I had tried hard to use ls -d to list just directories but failed, therefore I wrote a bash script uses find to do that. It seems Ntropia provided a better solution and it is straight to the point, so let just treat the previous post as examples of find command.
The simplest way of list just directories
ls -d */ 
You can list the directories start with letter b
ls -d b*/ 
Further more list the subdirectories of the directories start with letter b
ls -d b*/*/ 
The outcome will be look like this

backup/10-5-2007/  backup/lunatic/              bin/gdc/
backup/ccbe/       backup/wplbe/                bt/çŽ‹åŠ›å® - æ”¹å˜è‡ªå·±/
backup/full/       bin/ffmpeg-0.4.9-p20051216/
Bare in mind the command lines above do not list out the hidden directories, to list hidden directories
ls -d .*/
Yes, you can also list with details, and with nice colors.
ls -d .*/ -l
Manual of ls should at lease gives a line of example on how to list just directories, ls capable of doing that but it seems to like easter egg for me.
```

## 24.4 Linux: Find Out How Many File Descriptors Are Being Used

```text
hile administrating a box, you may wanted to find out what a processes is doing and find out how many file descriptors (fd) are being used. You will surprised to find out that process does open all sort of files:
=> Actual log file

=> /dev files

=> UNIX Sockets

=> Network sockets

=> Library files /lib /lib64

=> Executables and other programs etc

In this quick post, I will explain how to to count how many file descriptors are currently in use on your Linux server system.
Step # 1 Find Out PID

To find out PID for mysqld process, enter:
# ps aux | grep mysqld
OR
# pidof mysqld
Output:

28290

Step # 2 List File Opened By a PID # 28290

Use the lsof command or /proc/$PID/ file system to display open fds (file descriptors), run:
# lsof -p 28290
# lsof -a -p 28290
OR
# cd /proc/28290/fd
# ls -l | less
You can count open file, enter:
# ls -l | wc -l
Tip: Count All Open File Handles

To count the number of open file handles of any sort, type the following command:
# lsof | wc -l
Sample outputs:

5436

List File Descriptors in Kernel Memory

Type the following command:
# sysctl fs.file-nr
Sample outputs:

fs.file-nr = 1020	0	70000

Where,

    1020 The number of allocated file handles.
    0 The number of unused-but-allocated file handles.
    70000 The system-wide maximum number of file handles.

You can use the following to find out or set the system-wide maximum number of file handles:
# sysctl fs.file-max
Sample outputs:

fs.file-max = 70000

See how to set the system-wide maximum number of file handles under Linux for more information.
More about /proc/PID/file & procfs File System

/proc (or procfs) is a pseudo-file system that it is dynamically generated after each reboot. It is used to access kernel information. procfs is also used by Solaris, BSD, AIX and other UNIX like operating systems. Now, you know how many file descriptors are being used by a process. You will find more interesting stuff in /proc/$PID/file directory:

    /proc/PID/cmdline : process arguments
    /proc/PID/cwd : process current working directory (symlink)
    /proc/PID/exe : path to actual process executable file (symlink)
    /proc/PID/environ : environment used by process
    /proc/PID/root : the root path as seen by the process. For most processes this will be a link to / unless the process is running in a chroot jail.
    /proc/PID/status : basic information about a process including its run state and memory usage.
    /proc/PID/task : hard links to any tasks that have been started by this (the parent) process.

See also: /proc related FAQ/Tips

/proc is an essentials file system for sys-admin work. Just browser through our previous article to get more information about /proc file system:

    /proc/filesystems: Find out what filesystems supported by kernel
    Howto: Linux detect or find out a dual-core cpu
    Linux display CPU information - number of CPUs and their speed
    How to Scan new LUNs on Linux with QLogic driver
    Linux command to gathers up information about a Linux system
    Linux increase the maximum number of open files or file descriptors
    How to display or show information about a Linux Kernel module or drivers
    Linux scan wireless card for information
    Linux disable or drop / block ping packets all together
    How do I find out if my server CPU can run a 64 bit kernel version (apps) or not?
    Display Linux kernel slab cache information in real time
    Making changes to /proc filesystem permanently
    Howto rebuilding a RAID array after a disk fails
    Find out if my server is capable of running para-virtualized guest ( PAE support )
    Linux configure Network Address Translation or NAT
    Howto: Linux see new fiber channel attached disk LUNs without rebooting
    I also recommend reading /proc file system related document, and lsof man page to get a better understanding about fd and files.

Note, Putting it all together to debug fd leakage problem, in this example, of a process named adclient
 $ netstat  -anp | grep `ps -ef | grep adclient | grep -v grep | awk '{print $2}'`
 $ lsof -ap  `ps -ef | grep adclient | grep -v grep | awk '{print $2}'`
 $ lsof -ap  `ps -ef | grep adclient | grep -v grep | awk '{print $2}'` | wc -l
 $ strace -p `ps -ef | grep adclient | grep -v grep | awk '{print $2}'` >& adclient_strace_log 
the file adclient_strace_log)
 $  lsof | wc -l
 $ sysctl fs.file-max
 $ ulimit -n

And in script form:
#!/bin/bash

#check adclient FD/port usage. <user> - ACS R&D

ADC_PID=$( ps -ef | grep adclient | grep -v grep | awk '{print $2}' )
#echo "adclient pid is $ADC_PID "

echo "Gathering adclient FD/port usage"
echo "adclient port usage: "
netstat  -anp | grep $ADC_PID  
echo "--------------------" > adclient_fd_usage_report
echo "adclient port usage: " >> adclient_fd_usage_report
netstat  -anp | grep $ADC_PID  >> adclient_fd_usage_report

echo "--------------------" >> adclient_fd_usage_report
echo "adclient fd usage: "
lsof -ap $ADC_PID 
echo "adclient fd usage: " >> adclient_fd_usage_report
lsof -ap   $ADC_PID >> adclient_fd_usage_report


echo "--------------------" >> adclient_fd_usage_report
echo "adclient fd #: "
lsof -ap   $ADC_PID | wc -l
echo "adclient fd usage: " >> adclient_fd_usage_report
lsof -ap   $ADC_PID | wc -l >> adclient_fd_usage_report

echo "--------------------" >> adclient_fd_usage_report
echo "fd #: "
 lsof | wc -l
echo "fd #: " >> adclient_fd_usage_report
 lsof | wc -l >> adclient_fd_usage_report

echo "--------------------" >> adclient_fd_usage_report
echo "fd sys limit: "
sysctl fs.file-max
echo "fd sys limit: " >> adclient_fd_usage_report
sysctl fs.file-max >> adclient_fd_usage_report

echo "--------------------" >> adclient_fd_usage_report
echo "fd proc limit: "
ulimit -n
echo "fd proc limit: " >> adclient_fd_usage_report
ulimit -n >> adclient_fd_usage_report

echo "--------------------" >> adclient_fd_usage_report
echo "strace (plz wait 2 min): "
echo "strace (plz wait 2 min): " >> adclient_fd_usage_report
strace -p $ADC_PID >> adclient_fd_usage_report 2>&1 & sleep 60; kill $!
echo "--------------------" >> adclient_fd_usage_report

This command will check FD usage for all processes:
the following command will gather FD usage info on a machine:

cd /proc 
while true ; echo "checking for FDs, time is: "; date; do for proc in `ls  | grep '^[0-9]\+'`; do echo checking process $proc ; echo `ps -e | grep $proc | grep -v grep | awk '{print $4}'` using `ls -l ./$proc/fd/ | wc -l` fds ; echo --- ; done ; sleep 900 ; done   > /tmp/fds_report &

It will gather the info every 15 minutes.
Output ex:
“
checking for FDs, time is: 
Thu Feb 16 16:45:26 IST 2012
…
---
checking process 245
aio/1 using 1 fds
---
checking process 2497
syslogd using 12 fds
---
checking process 2501
klogd using 3 fds
---
checking process 2510
debugd using 57 fds 
…
“________

To stop it do
jobs 
kill %[job id] 
```

## 24.5 Check the open FD limit for a given process in Linux

```text
/proc/pid/limits

ulimit -n

The only interfaces provided by the Linux kernel to get resource limits are getrlimit() and /proc/pid/limits. getrlimit() can only get resource limits of the calling process. /proc/pid/limits allows you to get the resource limits of any process with the same user id, and is available on RHEL 5.2, RHEL 4.7, Ubuntu 9.04, and any distribution with a 2.6.24 or later kernel.

If you need to support older Linux systems then you will have to get the process itself to call getrlimit(). Of course the easiest way to do that is by modifying the program, or a library that it uses. If you are running the program then you could use LD_PRELOAD to load your own code into the program. If none of those are possible then you could attach to the process with gdb and have it execute the call within the process. You could also do the same thing yourself using ptrace() to attach to the process, insert the call in its memory, etc., however this is very complicated to get right and is not recommended.

With appropriate privileges, the other ways to do this would involve looking through kernel memory, loading a kernel module, or otherwise modifying the kernel, but I am assuming that these are out of the question

 On trying to find the resource limits of a running process on an old kernel

I had cause to try and get a core dump from a segfaulting process at work the other day, and I wanted to figure out if fiddling with /etc/security/limits.conf was going to do the trick (it didn't) or if I had to modify the initscript to include a ulimit -c unlimited call.

Of course, on a modern system (>= 2.6.24), one would just take a look at /proc/PID/limits and get on with life, but unfortunately the system in question was running 2.6.18, so more fiddling around was required.

I'd found something once before that told me how to do it with GDB, but all I could find this time around was a rather over-complicated Knol article, which made a bunch of assumptions (well mainly that the binary in question wasn't stripped). So with some help from the Knol article, I muddled through it.

Disclaimer: I don't profess to be an expert on system internals like this, so if this eats your first-born, don't come crying to me.

Firstly, you need to know that it's the getrlimit(2) system call that you want to be using, and then you need to figure out the number for the resource limit you want to retrieve. The man page for getrlimit(), tells you it's defined in /usr/include/sys/resource.h, but I've found that the actual useful bits end up being in /usr/include/bits/resource.h

I wanted the resource limit for the maximum core dump size, which is RLIMIT_CORE and has a value of 4.

Next, you need to know that the getrlimit() system call takes an integer and a pointer to an rlimit structure as arguments. We've just figured out the value for the integer, but we're also going to need to pass a pointer as the second parameter. A pointer to enough memory to hold an rlimit structure. Fortunately, the rlimit structure is pretty simple:

struct rlimit {
    rlim_t rlim_cur;  /* Soft limit */
    rlim_t rlim_max;  /* Hard limit (ceiling for rlim_cur) */
};

After a bit of grepping around in /usr/include, I determined that an rlim_t is essentially an unsigned long int, so we need to allocate a pointer big enough to hold two of them.

Note that if we had an unstripped binary, we could have saved a lot of faffing around by just going

print sizeof(struct rlimit)

in GDB (assuming that the binary has the getrlimit symbol in it)

The sure-fire way of figuring out how much memory we need for this pointer is to go

print sizeof(unsigned long int)

in GDB, and then double that (since we want two of them). On my system an unsigned long int is four bytes, so I'm going to want to allocate enough memory for 8 bytes.

Now it's time to attach GDB to the offending process and see what the resource limit currently is. (gdb -p PID)

(gdb) print malloc(8)
$1 = 152186904
(gdb) print getrlimit(4, $1)
$2 = 0
(gdb) x/2xw $1
0x9123018:	0x00000000	0x7fffffff
(gdb) quit

So in this particular case, we've retrieved the soft and hard limits of the RLIMIT_CORE resource limit, and you can see that the soft limit is zero, and the hard limit is unlimited. Note that the getrlimit() function returns an integer as its return code, which is what the $2 = 0 is above.

Now it's just a case of altering the the resource limits via the preferred mechanism, restarting the process and then repeating this GDB examination of the process to check they were changed successfully.

Circumstances where this can all fall down would appear to be ones where the getrlimit symbol isn't present in the binary, or the binary is compiled as a position-independent executable. I'd think that in the latter case, the system is probably modern enough to be running a kernel that supports directly examining the resource limits via the /proc filesystem.
```

## 24.6 Tip: Redirecting Multiple Command Outputs

```text
Let's imagine a simple script:

#!/bin/bash

echo 1
echo 2
echo 3

Simple enough. It produces three lines of output:

1
2
3

Now let's say we wanted to redirect the output of the commands to a file named foo.txt. We could change the script as follows:

#!/bin/bash

F=foo.txt

echo 1 >> $F
echo 2 >> $F
echo 3 >> $F

Again, pretty straightforward, but what if we wanted to pipe the output of all three echo commands into less? We would soon discover that this won't work:

#!/bin/bash

F=foo.txt

echo 1 | less
echo 2 | less
echo 3 | less

This causes less to be executed three times. Not what we want. We want a single instance of less to input the results of all three echo commands. There are four approaches to this:

Make A Separate Script
script1:

#!/bin/bash

echo 1
echo 2
echo 3

script2:

#!/bin/bash

script1 | less

By running script2, script1 is also executed and its output is piped into less. This works but it's a little clumsy.

Write A Shell Function
We could take the basic idea of the separate script and incorporate it into a single script by making script1 into a shell function:

#!/bin/bash

# shell function
run_echoes () {
   echo 1
   echo 2
   echo 3
}

# call shell function and redirect
run_echoes | less

This works too, but it's not the simplest way to do it.

Make A List
We could construct a compound command using {} characters to enclose a list of commands:

#!/bin/bash

{ echo 1; echo 2; echo 3; } | less

The {} characters allow us to group the three commands into a single output stream. Note that the spaces between the {} and the commands, as well as the trailing semicolon after the third echo, are required.

Launch A Subshell
Finally, we could do this:

#!/bin/bash

(echo 1; echo 2; echo 3) | less

Placing the list inside () creates a subshell, or another copy of bash and it executes the commands. This has the same result as enclosing the list of commands within {} but with more overhead. The real reason we would want to do this is if, instead of just redirecting the output, we wanted to put all three commands in the background:

#!/bin/bash

(echo 1; echo 2; echo 3) > foo.txt &

This doesn't make much sense for our echo commands (they execute too quickly to bother with), but if we have commands that take a long time to run, this technique can come in handy.

	24.7 Question BASH: How to Redirect Output to File, AND Still Have it on Screen

Hi,

Actually this is quite a straightforward question, but somehow i can't find the answer (maybe i'm searching the wrong places). The places i see all teach me how to redirect to file fullstop.

OK, the question...

I know that to redirect the output of a command to a file, i do this:

Code:

ls -l > filename

But what if i want to log the output to file, AND have it displayed on screen (as it would if it were not redirected) as well? Is it possible to do this?



TIA and Regards,
Edwin
  	
Old 02-07-2006, 09:43 AM 	  #2
homey
Senior Member
 
Registered: Oct 2003
Posts: 3,057

Rep: Reputation: 53
	
Try this

ls -al | tee file.txt
  	
	
Brilliant... thanks!



Regards,
Edwin
  	
Old 02-07-2006, 10:40 AM 	  #5
haertig
Senior Member
 
Registered: Nov 2004
Distribution: Debian, Ubuntu, Slackware, Slax, Knoppix, SysrescueCD
Posts: 1,328

Rep: Reputation: 51
	
If you want to capture error output (stderr) along with normal output (stdout):
Code:

ls -l 2>&1 | tee file.txt

  	
Old 02-07-2006, 11:50 PM 	  #6
edwin11
Member
 
Registered: Dec 2005
Distribution: Ubuntu 10.04 LTS
Posts: 119

Original Poster
Rep: Reputation: 15
	
Thanks,

Would the ordering between "| tee file.txt" and "2>&1" matter?

Asking as "ls -l > file.txt 2>&1 file.txt" is different from "ls -l 2>&1 > file.txt".



Regards,
Edwin
  	
Old 02-08-2006, 06:02 AM 	  #7
timmeke
Senior Member
 
Registered: Nov 2005
Location: Belgium
Distribution: Red Hat, Fedora
Posts: 1,515

Rep: Reputation: 59
	
Actually,
Code:

ls -l 2>&1 | tee file.txt

may not work as you expect it.
It is likely that you won't see the stderr and stdout messages in the order in which they were sent to your terminal, simply because stdout (file descriptor 1) is buffered and stderr (2) is not (or was that the other way around - I keep mixing that up). So you'll see the stderr messages first and then the stdout ones (or vice-versa).

If you want the stderr and stdout messages to appear in the right order, you'll need to use a subshell, like so:
(ls -l 2>&1) > file.txt
or
(ls -l 2>&1) | tee file.txt if you want it to appear on screen and in file.txt
This basically says that it should execute the ls -l command, sending stderr to stdout in a subshell. All output from the subshell then comes from the subshell's stdout, and you can capture it in a file or with "tee".
The subshell will only make sure that the stderr and stdout messages appear in the right order.
  	
Old 02-08-2006, 08:14 AM 	  #8
edwin11
Member
 
Registered: Dec 2005
Distribution: Ubuntu 10.04 LTS
Posts: 119

Original Poster
Rep: Reputation: 15
	
i just tried it out, using a simple self-written command.sh shell script which has a number of standard and error output.

Seems like

Code:

$ ./command.sh 2>&1 | tee command.log

works fine (even without the sub-shell). Both the terminal and the log file recorded output in the correct order. Of course, adding the parenthesis does no harm.

However,

Code:

$ ./command.sh | tee command.log 2>&1

(with or without parenthesis) displays all the error output followed by all the normal output, and logs only the normal output.


This behaviour seems to run opposite if i use "> command.log" instead of "| tee command.log".

Code:

$ ./command.sh > command.log 2>&1

logs both the normal and error output in the correct order.

Code:

$ (./command.sh > command.log) 2>&1

logs only the normal output and displays only the error output.

Code:

$ ./command.sh 2>&1 > command.log

also logs only the normal output and displays only the error output.

Code:

$ (./command.sh 2>&1) > command.log

logs both normal and error output in the correct order, and displays nothing.




Regards,
Edwin
  	
Old 02-08-2006, 10:30 AM 	  #9
haertig
Senior Member
 
Registered: Nov 2004
Distribution: Debian, Ubuntu, Slackware, Slax, Knoppix, SysrescueCD
Posts: 1,328

Rep: Reputation: 51
	
I have to admire you for running all these tests to try to learn. The three pieces I think you're missing in your analysis are "How many commands am I running?", "What order am I redirecting things in?" and "What does | do anyway?"

The first missing piece:
---

For example
Code:

./command.sh >file.txt 2>&1

is only running ONE command, namely "command.sh"

However
Code:

./command.sh 2>&1 | tee file.txt

is running TWO commands, namely "command.sh" and "tee"

When you are running more than one command, you have to remember that EACH command has it's own stdout and stderr. So depending on where you put that little "2>&1" thingy, for example, will determine whether you're redirecting stderr from "command.sh" or from "tee". The same goes for when you're running subshells. The subshell itself is a command so think about whether you're redirecting output from "command.sh" which is running within the subshell, or redirecting output from the subshell itself.

To the second missing piece:
---

Remember "1" = stdout and "2" = stderr. "1" is assumed if you don't provide a number.

Example: ls -l >file.txt is the same as ls -l 1>file.txt

An ampersand can be thought of as meaning: "to the same place as"

Example: ls -l >file.txt 2>&1 means "Send stdout to file.txt and send stderr to the same place as stdout

When we're talking ampersands, "to the same place as" has to also take into account "at this time"

Example
Code:

ls -l >file.txt 2>&1

will send both stdout and stderr to file.txt. Why? Because FIRST stdout was redirected to file.txt and THEN stderr was told to go to the same place as stdout.

On the other hand
Code:

ls -l 2>&1 >file.txt

will send stderr to your screen and stdout to file.txt. Why? Because stderr was redirected to the same place as stdout, but at this time stdout was still pointing to the console. stdout was not redirected to file.txt until AFTER stderr had been redirected. When we are talking AFTER in this example we are talking about placement on the command line. Things specified further to the right are thought of as coming after. So this example does nothing for stderr. stderr is indeed redirected to the same place as stdout, which is the console at the time of the redirection, but stderr was ALREADY pointing there in the first place - resulting in no perceivable change.

To the third missing piece:
---

The pipe symbol "|" can be thought of like a fancy redirection of stdout. It redirects stdout from the first command to the stdin of the second command. So ls -l | tee file.txt says "Take the stdout of ls and send it to the stdin of tee. "tee" is simply a program that takes its stdin and sends it to two places, stdout and also to a file.

The eagle-eyed observer will notice an apparent discrepancy for "|" ...

ls -l 2>&1 | tee file.txt will log BOTH stdout and stderr from ls to file.txt. But at this time, when stderr was redirected to the same place as stdout, stdout had not yet been redirected to tee via the "|". Hmmm ... gotcha! Just one of those things. Never fails - when you try to rationalize your way through something logically ... you run into an exception! This is one of those things were experience tells me "I know it works this way", but when you press me with the "why?" question, I have to hem and haw and say "Because that's the way it is!"

---

Now that you head is spining with this cryptic "explanation", maybe it will start making more sense why you're seeing what you're seeing in your tests.

[edit]Corrected a few of my spelling errors![/edit]
Last edited by haertig; 02-08-2006 at 10:33 AM.
  	
1 members found this post helpful.
Old 02-09-2006, 07:40 AM 	  #10
edwin11
Member
 
Registered: Dec 2005
Distribution: Ubuntu 10.04 LTS
Posts: 119

Original Poster
Rep: Reputation: 15
	
Thanks haertig for the explanation! The results of the tests that i ran certainly makes sense now.

As for

Code:

ls -l 2>&1 | tee file.txt

Can we say that:
First, the stderr is redirected to where the stdout goes.
Then we send whatever "comes out" of where stdout normally "comes out", and send it to tee.
And since at that point, both stdout and stderr "comes out" of that place, both are piped to tee, which both displays and sends it to file.
?



Thanks and Regards,
Edwin
  	
Old 02-09-2006, 09:25 AM 	  #11
haertig
Senior Member
 
Registered: Nov 2004
Distribution: Debian, Ubuntu, Slackware, Slax, Knoppix, SysrescueCD
Posts: 1,328

Rep: Reputation: 51
	
Quote:
Originally Posted by edwin11
Can we say that:
First, the stderr is redirected to where the stdout goes.
Then we send whatever "comes out" of where stdout normally "comes out", and send it to tee.
And since at that point, both stdout and stderr "comes out" of that place, both are piped to tee, which both displays and sends it to file.
Yes, I think we can say this!
  	
Old 02-27-2007, 11:31 AM 	  #12
na5m
Member
 
Registered: Jan 2005
Location: california
Distribution: O.A.M. (Overmonitoring Address Matrix) Release 2.2 with 2120 Patch
Posts: 37

Rep: Reputation: 17
	
ampersand
Actually, I don't think that the ampersand strictly means "to the same place as". I think that the ampersand is necessary so that "1" isn't interpreted as a file.
The code
Code:

ls 1>1

will redirect stdout to a file named "1"
Whereas
Code:

ls 1>&1

will redirect stdout to stdout.

ADDITION:
Try
Code:

ls 1>&1>&1>&1>&1

Last edited by na5m; 02-27-2007 at 11:39 AM.
  	
1 members found this post helpful.
Old 11-22-2010, 08:08 AM 	  #13
doru
Member
 
Registered: Sep 2008
Distribution: Ubuntu 8.04 LTS Server
Posts: 83

Rep: Reputation: 16
	
ampersand
Quote:
Originally Posted by na5m View Post
Actually, I don't think that the ampersand strictly means "to the same place as". I think that the ampersand is necessary so that "1" isn't interpreted as a file.
The code
Code:

ls 1>1

will redirect stdout to a file named "1"
Whereas
Code:

ls 1>&1

will redirect stdout to stdout. :)
Good point, see REDIRECTION in bash man. As you can see, the manual is far from clear on this:

Quote:
The general format for redirecting output is:

[n]>word
[...]
>&word
[...] is semantically equiva‐
lent to

>word 2>&1
[...]
The operator

[n]>&word

is used similarly to duplicate output file descriptors. (That is: "If word expands to one or
more digits, the file descriptor denoted by n is made to be a copy of
that file descriptor.", doru's note) If n is not
specified, the standard output (file descriptor 1) is used. If the
digits in word do not specify a file descriptor open for output, a re‐
direction error occurs. As a special case, if n is omitted, and word
does not expand to one or more digits, the standard output and standard
error are redirected as described previously.
Last edited by doru; 11-22-2010 at 11:12 AM. Reason: completion
  	
Old 11-22-2010, 09:27 AM 	  #14
catkin
LQ 5k Club
 
Registered: Dec 2008
Location: No fixed abode
Distribution: Slackware 13.37, Debian Squeeze
Posts: 8,105
Blog Entries: 25

Rep: Reputation: 1040Reputation: 1040Reputation: 1040Reputation: 1040Reputation: 1040Reputation: 1040Reputation: 1040Reputation: 1040
	
Quote:
Originally Posted by haertig View Post
The eagle-eyed observer will notice an apparent discrepancy for "|" ...

ls -l 2>&1 | tee file.txt will log BOTH stdout and stderr from ls to file.txt. But at this time, when stderr was redirected to the same place as stdout, stdout had not yet been redirected to tee via the "|". Hmmm ... gotcha! Just one of those things. Never fails - when you try to rationalize your way through something logically ... you run into an exception! This is one of those things were experience tells me "I know it works this way", but when you press me with the "why?" question, I have to hem and haw and say "Because that's the way it is!"
It makes sense in the light of the shell's operation. The "|" is actioned in "3. Parses the tokens into simple and compound commands" and the ">"s are actioned in "5. Performs any necessary redirections ..." so, in this case, the ls command's stdout is already configured for redirection to the tee command by the time the ">"s are processed.
  	
1 members found this post helpful.
Old 11-22-2010, 11:26 AM 	  #15
doru
Member
 
Registered: Sep 2008
Distribution: Ubuntu 8.04 LTS Server
Posts: 83

Rep: Reputation: 16
	
bash man
Quote:
Originally Posted by catkin View Post
It makes sense in the light of the shell's operation. The "|" is actioned in "3. Parses the tokens into simple and compound commands" and the ">"s are actioned in "5. Performs any necessary redirections ..." so, in this case, the ls command's stdout is already configured for redirection to the tee command by the time the ">"s are processed.
Thank you. My Ubuntu 10.04 bash man does not really say that.
```

## 24.8 Use find to test whether file found and exists

```text
clearly when path is known use -e and -f:

if [ -e "/abcd/efgh/xxxx" ] ; then
   echo "file exist"
else
   echo "file not exist"
fi



    -e: Returns true value if file exists
    -f: Return true value if file exists and regular file

When path not known use find + -z:
if [ ! -z `find /abcd/efgh -name "xxxx" 2>/dev/null` ] ; then
    some files found
else
    no files
fi
```

## 24.9 How to determine the Boost version on a system?

```text
- If you want to figure it out manually (rather than in-code), the go to the include directory, and open up version.hpp.
$ locate boost
$ cat /usr/include/boost/version.hpp 
//  Boost version.hpp configuration header file  ------------------------------//

//  (C) Copyright John maddock 1999. Distributed under the Boost
//  Software License, Version 1.0. (See accompanying file
//  LICENSE_1_0.txt or copy at http://www.boost.org/LICENSE_1_0.txt)

//  See http://www.boost.org/libs/config for documentation

#ifndef BOOST_VERSION_HPP
#define BOOST_VERSION_HPP

//
//  Caution, this is the only boost header that is guarenteed
//  to change with every boost release, including this header
//  will cause a recompile every time a new boost version is
//  released.
//
//  BOOST_VERSION % 100 is the sub-minor version
//  BOOST_VERSION / 100 % 1000 is the minor version
//  BOOST_VERSION / 100000 is the major version

#define BOOST_VERSION 103200

//
//  BOOST_LIB_VERSION must be defined to be the same as BOOST_VERSION
//  but as a *string* in the form "x_y" where x is the major version
//  number and y is the minor version number.  This is used by 
//  <config/auto_link.hpp> to select which library version to link to.

#define BOOST_LIB_VERSION "1_32"

#endif

- code
#include <boost/version.hpp>
#include <iostream>
#include <iomanip>

int main()
{
    std::cout << "Boost version: " << std::hex
              << ((BOOST_VERSION >> 20) & 0xF)
              << "."
              << ((BOOST_VERSION >> 8) & 0xFFF)
              << "."
              << (BOOST_VERSION & 0xFF)
              << std::endl;
    return 0;
}


- another way
std::cout << "Using Boost "     
          << BOOST_VERSION / 100000     << "."  // major version
          << BOOST_VERSION / 100 % 1000 << "."  // minior version
          << BOOST_VERSION % 100                // patch level
          << std::endl;
- Install boost: # yum install boost
```

## 24.10 Sort du output in Human-readable format

```text
Sort du output in Human-readable format

bash$ for i in $(echo -e 'G\nM\nK'); do du -hsx /* 2>/dev/null | grep '[0-9]'$i | sort -rn; done

— by jasembo on April 14, 2012, 4:02 a.m.
Explanation

    echo -e prints G for Gigabytes, M for Megabytes and K for Kilobytes in a line each.
    2>/dev/null send stderr to /dev/null
    sort -rn sorts in reverse numerical order. Largest first

Alternative one-liners
Sort du output in Human-readable format

bash$ for i in G M K; do du -hsx * | grep "[0-9]$i\b" | sort -nr; done 2>/dev/null

— by openiduser3 on April 14, 2012, 9:06 a.m.
Explanation

    The reason to use a for loop is to sort results with G or M or K values separately, otherwise sort -n would just sort everything by the numbers regardless of G M K suffix.
    grep "[0-9]$i\b" matches lines containing a digit followed by G or M or K followed by a "word boundary"


    */
```

## 24.11 How to: Mount an ISO image under Linux

```text
by NIX CRAFT on MARCH 29, 2004 · 58 COMMENTS· LAST UPDATED DECEMBER 11, 2008
in DEBIAN LINUX, FILE SYSTEM, HOWTO

An ISO image is an archive file (disk image) of an optical disc using a conventional ISO (International Organization for Standardization) format. ISO image files typically have a file extension of .ISO. The name "ISO" is taken from the ISO 9660 file system used with CD-ROM media, but an ISO image can also contain UDF file system because UDF is backward-compatible to ISO 9660.

You can mount an ISO images via the loop device under Linux. It is possible to specify transfer functions (for encryption/decryption or other purposes) using loop device.

But, how do you mount an ISO image under Linux? You need to use mount command as follows:

Procedure to mount ISO images under Linux

1) You must login as a root user, if not root user then switch to root user using following command:
$ su -

2) Create the directory i.e. mount point:
# mkdir -p /mnt/disk

3) Use mount command as follows to mount iso file called disk1.iso:
# mount -o loop disk1.iso /mnt/disk

4) Change directory to list files stored inside an ISO image:
# cd /mnt/disk
# ls -l

More about loop device

A loop device is a pseudo-device that makes a file accessible as a block device. Loop devices are often used for CD ISO images and floppy disc images. Mounting a file containing a filesystem via such a loop mount makes the files within that filesystem accessible. They appear in the mount point directory using above commands.
```

## 24.12 How big is the pipe buffer?

```text
------------------------------------------------------------------------------------------------------------------------

The capacity of a pipe buffer varies across systems (and can even vary on the same system). I am not sure there is a quick, easy, and cross platform way to just lookup the capacity of a pipe.

Mac OS X, for example, uses a capacity of 16384 bytes by default, but can switch to 65336 byte capacities if large write are made to the pipe, or will switch to a capacity of a single system page if too much kernel memory is already being used by pipe buffers (see xnu/bsd/sys/pipe.h, and xnu/bsd/kern/sys_pipe.c; since these are from FreeBSD, the same behavior may happen there, too).

One Linux pipe(7) man page says that pipe capacity is 65536 bytes since Linux 2.6.11 and a single system page prior to that (e.g. 4096 bytes on (32-bit) x86 systems). The code (include/linux/pipe_fs_i.h, and fs/pipe.c) seems to use 16 system pages (i.e. 64 KiB if a system page is 4 KiB), but the buffer for each pipe can be adjusted via a fcntl on the pipe (up to a maximum capacity which defaults to 1048576 bytes, but can be changed via /proc/sys/fs/pipe-max-size)).

Here is a little bash/*perl* combination that I used to test the pipe capacity on my system:

#!/bin/bash
test $# -ge 1 || { echo "usage: $0 write-size [wait-time]"; exit 1; }
test $# -ge 2 || set -- "$@" 1
bytes_written=$(
{
    exec 3>&1
    {
        perl -e '
            $size = $ARGV[0];
            $block = q(a) x $size;
            $num_written = 0;
            sub report { print STDERR $num_written * $size, qq(\n); }
            report; while (defined syswrite STDOUT, $block) {
                $num_written++; report;
            }
        ' "$1" 2>&3
    } | (sleep "$2"; exec 0<&-);
} | tail -1
)
printf "write size: %10d; bytes successfully before error: %d\n" \
    "$1" "$bytes_written"
Here is what I found running it with various write sizes on a Mac OS X 10.6.7 system (note the change for writes larger than 16KiB):

% /bin/bash -c 'for p in {0..18}; do /tmp/ts.sh $((2 ** $p)) 0.5; done'
write size:          1; bytes successfully before error: 16384
write size:          2; bytes successfully before error: 16384
write size:          4; bytes successfully before error: 16384
write size:          8; bytes successfully before error: 16384
write size:         16; bytes successfully before error: 16384
write size:         32; bytes successfully before error: 16384
write size:         64; bytes successfully before error: 16384
write size:        128; bytes successfully before error: 16384
write size:        256; bytes successfully before error: 16384
write size:        512; bytes successfully before error: 16384
write size:       1024; bytes successfully before error: 16384
write size:       2048; bytes successfully before error: 16384
write size:       4096; bytes successfully before error: 16384
write size:       8192; bytes successfully before error: 16384
write size:      16384; bytes successfully before error: 16384
write size:      32768; bytes successfully before error: 65536
write size:      65536; bytes successfully before error: 65536
write size:     131072; bytes successfully before error: 0
write size:     262144; bytes successfully before error: 0
Note: The PIPE_BUF value defined in the C header files (and the pathconf value for _PC_PIPE_BUF), does not specify the capacity of pipes, but the maximum number of bytes that can be written atomically (see POSIX write(2)).

Quote from include/linux/pipe_fs_i.h:

/* Differs from PIPE_BUF in that PIPE_SIZE is the length of the actual
   memory allocation, whereas PIPE_BUF makes atomicity guarantees.  */

------------------------------------------------------------------------------------------------------------------------
In bash, ulimit -p tells you.

$ ulimit -p
8

$ ulimit -a | grep pipe
pipe size            (512 bytes, -p) 8
so on my system it's 8 * 512 = 4096 bytes.

If you're not using bash, you can use either PIPE_BUF from <limits.h>, e.g.:

/usr/include/linux/limits.h: #define PIPE_BUF 4096
Or pathconf, e.g. using Python:

>>> os.pathconf('.', os.pathconf_names['PC_PIPE_BUF'])
4096
shareimprove this answer
edited Apr 24 '11 at 23:46

answered Apr 24 '11 at 23:29

Mikel
19.2k54168
2	 	
Since ulimit is a shell built-in, it matters which shell you do it from -- this appears to be bash. I tried it in zsh and it didn't recognize -p or output anything about pipe size with -a –  Michael Mrozek♦ Apr 24 '11 at 23:32 
  	 	
Updated to be bash specific. I guess zsh users should look at limits.h? –  Mikel Apr 24 '11 at 23:38
  	 	
Added pathconf and example Python program. –  Mikel Apr 24 '11 at 23:48
4	 	
Neither PIPE_BUF nor its pathconf equivalent are the same as the buffer capacity of a pipe (e.g. PATH_BUF is 512 on Mac OS X 10.6.7 (and bash -c 'ulimit -p' gives 1), but most pipes can actually buffer either 16Ki or 64Ki bytes). –  Chris Johnsen Apr 25 '11 at 5:34 
3	 	
PIPE_BUF is the largest size for which writes are guaranteed to be atomic. Your pipe size is probably 64k. See here: stackoverflow.com/questions/4624071/… –  stephenbez May 30 '13 at 17:54

------------------------------------------------------------------------------------------------------------------------

up vote
11
down vote
this shell-line can show pipe buffer size too:

M=0; while true; do dd if=/dev/zero bs=1k count=1 2>/dev/null; \
       M=$(($M+1)); echo -en "\r$M KB" 1>&2; done | sleep 999
(sending 1k chunks to blocked pipe until buffer full) ...some test outputs:

64K (intel-debian), 32K (aix-ppc), 64K (jslinux bellard.org)               ...Ctrl+C.
shareimprove this answer
edited Apr 17 '13 at 23:16

answered Apr 17 '13 at 22:52

Omer Merdan
16517
3	 	
Very nice! (dd if=/dev/zero bs=1 | sleep 999) & then wait a second and killall -SIGUSR1 dd gives 65536 bytes (66 kB) copied, 5.4987 s, 11.9 kB/s - same as your solution, but at 1 byte resolution ;) –  frostschutz Apr 17 '13 at 23:21
------------------------------------------------------------------------------------------------------------------------
# M=0; while true; do dd if=/dev/zero bs=1k count=1 2>/dev/null; \
>        M=$(($M+1)); echo -en "\r$M KB" 1>&2; done | sleep 999
64 KB
^C
# M=0; while true; do dd if=/dev/zero bs=1k count=1 2>/dev/null;        M=$(($M+1)); echo -en "\r$M KB" 1>&2; done | sleep 999
64 KB
^C
# (dd if=/dev/zero bs=1 | sleep 999) &
[1] 17147
# killall -SIGUSR1 dd
65537+0 records in
65536+0 records out
65536 bytes (66 kB) copied, 7.71049 s, 8.5 kB/s
```

## 24.13 Get exit status of process that's piped to another

```text
I have two processes foo and bar, connected with a pipe:

$ foo | bar
bar always exits 0; I'm interested in the exit code of foo. Is there any way to get at it?
------------------------------------------------------------------------------------------------------------------------
There are 3 common ways of doing this:

Pipefail
The first way is to set the pipefail option (ksh, zsh or bash). This is the simplest and what it does is basically set the exit status $? to the exit code of the last program to exit non-zero (or zero if all exited successfully).

# false | true; echo $?
0
# set -o pipefail
# false | true; echo $?
1
$PIPESTATUS
Bash also has an array variable called $PIPESTATUS ($pipestatus in zsh) which contains the exit status of all the programs in the last pipeline.

# true | true; echo "${PIPESTATUS[@]}"
0 0
# false | true; echo "${PIPESTATUS[@]}"
1 0
# false | true; echo "${PIPESTATUS[0]}"
1
# true | false; echo "${PIPESTATUS[@]}"
0 1
You can use the 3rd command example to get the specific value in the pipeline that you need.

Separate executions
This is the most unwieldy of the solutions. Run each command separately and capture the status

# OUTPUT="$(echo foo)"
# STATUS_ECHO="$?"
# printf '%s' "$OUTPUT" | grep -iq "bar"
# STATUS_GREP="$?"
# echo "$STATUS_ECHO $STATUS_GREP"
0 1
------------------------------------------------------------------------------------------------------------------------
If you are using bash, you can use the PIPESTATUS array variable to get the exit status of each element of the pipeline.

$ false | true
$ echo "${PIPESTATUS[0]} ${PIPESTATUS[1]}"
1 0
------------------------------------------------------------------------------------------------------------------------

	24.14 Find which user is running a process, also get user name from ID
# ps aux | grep lwsmd
318       7033  0.0  0.1 1826892 18264 ?       Sl   Sep10   0:01 /opt/pbis/sbin/lwsmd --start-as-daemon
root     27261  0.0  0.0 103212   840 pts/0    S+   18:52   0:00 grep lwsmd
# cat /etc/passwd | grep 318
iseadagent:x:318:300::/home/iseadagent:/bin/bash

	24.15
	24.16
	24.17
	24.18
	24.19
	24.20
	24.21
	24.22
	24.23
	24.24
	24.25
	24.26
	24.27
	24.28
	24.29
	24.30
	24.31
	24.32
	24.33
	24.34
	24.35
	24.36
	24.37
	24.38
	24.39
	24.40
	24.41
	24.42
	24.43
	24.44
	24.45
	24.46
	24.47
	24.48
	24.49
	24.50
	24.51
	24.52
	24.53
	24.54
	24.55
	24.56
	24.57
	24.58
	24.59
	24.60
	24.61
	24.62
	24.63
```
