---
type: reference
title: Examples
description: Subsection 21.1 of Monit.
tags: [kb-linux]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "linux/KB_Linux#21.1"
---

# 21.1 Examples

[↑ Monit](/linux/kb-linux/21-monit/README.md)

```text
Configuration Examples
Real-world configuration examples

Here are some real-world configuration examples for monit. It can be helpful to look at the examples given here to see how a service is running, where it put its pidfile, how to call the start and stop methods for a service, etc.

You are welcome to cut & paste configuration into your own monitrc control file. Please check and edit as needed, some IP-addresses and paths mentioned here may or will differ from your system.

    * System Services 

Cron (program timer)
Gdm (gnome desktop manager)
Inetd (internet service manager)
Syslogd (system logfile daemon)
Xfs (X font server)
YPBind (Yellow page bind daemon)
Net-SNMP (SNMP agent)
NTP (time server)
Nscd (name service caching daemon)

    * Name Services 

Bind (chrooted)

    * AAA Services 

FreeRADIUS

    * FTP Services 

Proftpd

    * Login Services 

SSHD

    * WWW Services 

Apache (web server)
Mongrel Cluster
Zope (appication server)
Squid (http/ftp proxy)
Privoxy (spamfilter proxy)

    * Mail Services 

Postfix (mail server)
Exim (mail server)
sendmail (mail server)
Qpopper (pop3 server)
Dovecot (imap secure server)
Spamassassin daemon (spam scan daemon)
Amavis-new (mail virus scanner)
Policyd (Postfix access policy delegation daemon)

    * Virus Scanner 

Sophie (virus scan daemon)
Trophie (virus scan daemon)
Clamavd (virus scan daemon)

    * Printing Services 

LPRng (printer daemon)

    * Database Services 

MySQL Server
OpenLDAP Server
PostgreSQL Server

    * File Services 

Samba (windows file/domain server)

    * Sun ONE Services 

iPlanetDirectoryServer (Sun ONE)
iPlanetMessagingServer processes (Sun ONE)
iPlanetCalendarServer processes (Sun ONE)

    * Misc Services 

apcupsd (APC ups daemon)
Webmin (remote admin service)
STunnel (SSL tunnel)

    * Misc Usage 

Watch and analyze crashdumps (Solaris)
Watch and analyze crashdumps (Linux)
Start and stop tcpdump based on condition
Rotate tcpdump until condition occures
MySQL event driven process list
Logrotate configuration
aMule, p2p app.
Kissdx, network streaming server for some DVDs
Getting top otput by mail on event
System Services

Cron (program timer)

When used with Solaris the init.d script needs a modification. Add the following line after start of cron:

 /usr/bin/pgrep -x -u 0 -P 1 cron > /var/run/cron.pid 

 check process cron with pidfile /var/run/cron.pid
   group system
   start program = "/etc/init.d/cron start"
   stop  program = "/etc/init.d/cron stop"
   if 5 restarts within 5 cycles then timeout
   depends on cron_rc

 check file cron_rc with path /etc/init.d/cron
   group system
   if failed checksum then unmonitor
   if failed permission 755 then unmonitor
   if failed uid root then unmonitor
   if failed gid root then unmonitor

Gdm (gnome desktop manager)

 check process gdm with pidfile /var/run/gdm.pid
   start program = "/etc/init.d/gdm start"
   stop program = "/etc/init.d/gdm stop"
   if 5 restarts within 5 cycles then timeout

Inetd (internet service manager)

 check process inetd with pidfile /var/run/inetd.pid
   start program = "/etc/init.d/inetd start"
   stop program = "/etc/init.d/inetd stop"
   if failed host 192.168.1.1 port 25 protocol smtp then restart  # e.g. exim 
   if failed host 192.168.1.1 port 515 then restart               # e.g. cups-lpd
   if failed host 192.168.1.1 port 113 then restart               # e.g. ident
   if 5 restarts within 5 cycles then timeout

Syslogd (system logfile daemon)

 check process syslogd with pidfile /var/run/syslogd.pid
   start program = "/etc/init.d/sysklogd start"
   stop program = "/etc/init.d/sysklogd stop"
   if 5 restarts within 5 cycles then timeout

 check file syslogd_file with path /var/log/syslog
   if timestamp > 65 minutes then alert # Have you seen "-- MARK --"?

Xfs (X font server)

 check process xfs with pidfile /var/run/xfs.pid
   start program = "/etc/init.d/xfs start"
   stop program = "/etc/init.d/xfs stop"
   if 5 restarts within 5 cycles then timeout

YPBind (Yellow page bind daemon)

 check process ypbind with pidfile /var/run/ypbind.pid
   start program = "/etc/init.d/nis start"
   stop program = "/etc/init.d/nis stop"
   if 5 restarts within 5 cycles then timeout

Net-SNMP (SNMP agent)

 check process snmpd with pidfile /var/run/snmpd
   start program = "/etc/init.d/snmpd start"
   stop program = "/etc/init.d/snmpd stop"
   if failed host 192.168.1.1 port 161 type udp then restart
   if failed host 192.168.1.1 port 199 type tcp then restart
   if 5 restarts within 5 cycles then timeout

NTP (time server)

 check process ntpd with pidfile /var/run/ntpd.pid
   start program = "/etc/init.d/ntpd start"
   stop  program = "/etc/init.d/ntpd stop"
   if failed host 127.0.0.1 port 123 type udp then alert
   if 5 restarts within 5 cycles then timeout

Nscd (name service caching daemon)

 check process nscd with pidfile /var/run/nscd/nscd.pid
   start program = "/etc/init.d/nscd start"
   stop  program = "/etc/init.d/nscd stop"
   if 5 restarts within 5 cycles then timeout

Name Services

Bind (chrooted)

 check process named with pidfile /var/named/chroot/var/run/named/named.pid
   start program = "/etc/init.d/named start"
   stop program = "/etc/init.d/named stop"
   if failed host 127.0.0.1 port 53 type tcp protocol dns then alert
   if failed host 127.0.0.1 port 53 type udp protocol dns then alert
   if 5 restarts within 5 cycles then timeout

AAA Services

FreeRADIUS (SVN only, not Monit 5.0)

 check process radiusd with pidfile /var/named/chroot/var/run/radiusd/radiusd.pid
   start program = "/etc/init.d/radiusd start"
   stop program = "/etc/init.d/radiusd stop"
   if failed host 127.0.0.1 port 1812 type udp protocol radius secret testing123 then alert
   if failed host 127.0.0.1 port 1812 type udp protocol radius secret testing123 then alert
   if 5 restarts within 5 cycles then timeout

FTP Services

Proftpd

 check process proftpd with pidfile /var/run/proftpd.pid
   start program = "/etc/init.d/proftpd start"
   stop program  = "/etc/init.d/proftpd stop"
   if failed port 21 protocol ftp then restart
   if 5 restarts within 5 cycles then timeout

Login Services

SSHD

 check process sshd with pidfile /var/run/sshd.pid
   start program  "/etc/init.d/sshd start"
   stop program  "/etc/init.d/sshd stop"
   if failed port 22 protocol ssh then restart
   if 5 restarts within 5 cycles then timeout

WWW Services

Apache (web server)

Hint: It is recommended to use a "token" file (an empty file) for monit to request. That way, it is easy to filter out all the requests made by monit in the httpd access log file. Here's a trick shared by Marco Ermini, place the following in httpd.conf to stop apache from loggin any requests done by monit:

  SetEnvIf        Request_URI "^\/monit\/token$" dontlog
  CustomLog       logs/access.log common env=!dontlog

In some cases init scripts for apache and apache-ssl are separated, e.g. Debian Linux.

 check process apache with pidfile /opt/apache_misc/logs/httpd.pid
   group www
   start program = "/etc/init.d/apache start"
   stop  program = "/etc/init.d/apache stop"
   if failed host localhost port 80 
        protocol HTTP request "/~hauk/monit/token" then restart
   if failed host 192.168.1.1 port 443 type TCPSSL 
        certmd5 12-34-56-78-90-AB-CD-EF-12-34-56-78-90-AB-CD-EF
	protocol HTTP request http://localhost/~hauk/monit/token  then restart
   if 5 restarts within 5 cycles then timeout
   depends on apache_bin
   depends on apache_rc

 check file apache_bin with path /opt/apache/bin/httpd
   group www
   if failed checksum then unmonitor
   if failed permission 755 then unmonitor
   if failed uid root then unmonitor
   if failed gid root then unmonitor

 check file apache_rc with path /etc/init.d/apache
   group www
   if failed checksum then unmonitor
   if failed permission 755 then unmonitor
   if failed uid root then unmonitor
   if failed gid root then unmonitor

Mongrel Cluster

Each mongrel instance will need it's own entry, and make sure to change the port (8000 in this example) to reflect your mongrel_cluster.yml file.

check process mongrel8000
  with pidfile /path/to/pidfile/mongrel.8000.pid
  group mongrels
  start program = "/bin/mongrel_rails cluster::start -C /path/to/mongrel_cluster.yml --clean --only 8000"
  stop program = "/bin/mongrel_rails cluster::stop -C /path/to/mongrel_cluster.yml --clean --only 8000"
  if failed port 8000 protocol HTTP
    request /system/token
    with timeout 10 seconds
    then restart
  if 5 restarts within 5 cycles
    then timeout

Note: /system/token requests an empty file called token, as recommended in the apache section above.

Zope (application server)

 check process zope with pidfile /opt/Zope/var/zProcessManager.pid
   start program = "/etc/init.d/zope start"
   stop  program = "/etc/init.d/zope stop"
   group www
   if failed host 192.168.1.1 port 8080 protocol HTTP then restart
   if 5 restarts within 5 cycles then timeout
   every 5

Squid (http/ftp proxy)

 check process squid with pidfile /opt/squid/logs/squid.pid
   group www
   start program = "/etc/init.d/squid start"
   stop  program = "/etc/init.d/squid stop"
   if failed host 192.168.1.1 port 3128  then restart
   if 5 restarts within 5 cycles then timeout
   depends on squid_bin
   depends on squid_rc

 check file squid_bin with path /opt/squid/bin/squid
   group www
   if failed checksum then unmonitor
   if failed permission 755 then unmonitor
   if failed uid root then unmonitor
   if failed gid root then unmonitor

 check file squid_rc with path /etc/init.d/squid
   group www
   if failed checksum then unmonitor
   if failed permission 755 then unmonitor
   if failed uid root then unmonitor
   if failed gid root then unmonitor

Privoxy (spamfilter proxy)

 check process privoxy with pidfile /opt/privoxy/var/privoxy.pid
   group www
   start program = "/etc/init.d/privoxy start"
   stop  program = "/etc/init.d/privoxy stop"
   if 5 restarts within 5 cycles then timeout
   if failed host 192.168.1.1 port 8118  then restart
   depends on privoxy_bin
   depends on privoxy_rc

 check file privoxy_bin with path /opt/privoxy/sbin/privoxy
   group www
   if failed checksum then unmonitor
   if failed permission 755 then unmonitor
   if failed uid root then unmonitor
   if failed gid root then unmonitor

 check file privoxy_rc with path /etc/init.d/privoxy
   group www
   if failed checksum then unmonitor
   if failed permission 755 then unmonitor
   if failed uid root then unmonitor
   if failed gid root then unmonitor

Mail Services

Postfix (mail server)

 check process postfix with pidfile /var/spool/postfix/pid/master.pid
   group mail
   start program = "/etc/init.d/postfix start"
   stop  program = "/etc/init.d/postfix stop"
   if failed port 25 protocol smtp then restart
   if 5 restarts within 5 cycles then timeout
   depends on postfix_rc

 check file postfix_rc with path /etc/init.d/postfix
   group mail
   if failed checksum then unmonitor
   if failed permission 755 then unmonitor
   if failed uid root then unmonitor
   if failed gid root then unmonitor

Exim (mail server)

 check process exim with pidfile /var/run/exim.pid
   group mail
   start program = "/etc/init.d/exim start"
   stop  program = "/etc/init.d/exim stop"
   if failed port 25 protocol smtp then restart
   if 5 restarts within 5 cycles then timeout
   depends on exim_bin
   depends on exim_rc

 check file exim_bin with path /usr/sbin/exim
   group mail
   if failed checksum then unmonitor
   if failed permission 4755 then unmonitor
   if failed uid root then unmonitor
   if failed gid root then unmonitor

 check file exim_rc with path /etc/init.d/exim
   group mail
   if failed checksum then unmonitor
   if failed permission 755 then unmonitor
   if failed uid root then unmonitor
   if failed gid root then unmonitor 

Sendmail (mail server)

 check process sendmail with pidfile /var/run/sendmail.pid
   group mail
   start program = "/etc/init.d/sendmail start"
   stop  program = "/etc/init.d/sendmail stop"
   if failed port 25 protocol smtp then restart
   if 5 restarts within 5 cycles then timeout
   depends on sendmail_bin
   depends on sendmail_rc

 check file sendmail_bin with path /usr/lib/sendmail
   group mail
   if failed checksum then unmonitor
   if failed permission 755 then unmonitor
   if failed uid root then unmonitor
   if failed gid root then unmonitor

 check file sendmail_rc with path /etc/init.d/sendmail
   group mail
   if failed checksum then unmonitor
   if failed permission 755 then unmonitor
   if failed uid root then unmonitor
   if failed gid root then unmonitor

Qpopper (pop3 server)

 check process qpopper with pidfile /var/run/popper.pid
   group mail
   start program = "/etc/init.d/qpopper start"
   stop  program = "/etc/init.d/qpopper stop"
   if 5 restarts within 5 cycles then timeout
   if failed port 110 type TCP protocol POP then restart
   depends on qpopper_bin
   depends on qpopper_rc

 check file qpopper_bin with path /opt/sbin/popper
   group mail
   if failed checksum then unmonitor
   if failed permission 755 then unmonitor
   if failed uid root then unmonitor
   if failed gid root then unmonitor

 check file qpopper_rc with path /etc/init.d/qpopper
   group mail
   if failed checksum then unmonitor
   if failed permission 755 then unmonitor
   if failed uid root then unmonitor
   if failed gid root then unmonitor

Dovecot (imap secure server)

check process dovecot with pidfile /var/run/dovecot/master.pid
   start program = "/etc/init.d/dovecot start"
   stop program = "/etc/init.d/dovecot stop"
   group mail
   if failed host mail.yourdomain.tld port 993 type tcpssl sslauto protocol imap for 5 cycles then restart
   if 3 restarts within 5 cycles then timeout
   depends dovecot_init
   depends dovecot_bin
check file dovecot_init with path /etc/init.d/dovecot
   group mail
check file dovecot_bin with path /usr/sbin/dovecot
   group mail

Spamassassin daemon (spam scan daemon)

 check process spamd with pidfile /var/run/spamd.pid
   group mail
   start program = "/etc/init.d/spamd start"
   stop  program = "/etc/init.d/spamd stop"
   if 5 restarts within 5 cycles then timeout
   if cpu usage > 99% for 5 cycles then alert
   if mem usage > 99% for 5 cycles then alert
   depends on spamd_bin
   depends on spamd_rc

 check file spamd_bin with path /usr/local/bin/spamd
   group mail
   if failed checksum then unmonitor
   if failed permission 755 then unmonitor
   if failed uid root then unmonitor
   if failed gid root then unmonitor

 check file spamd_rc with path /etc/init.d/spamd
   group mail
   if failed checksum then unmonitor
   if failed permission 755 then unmonitor
   if failed uid root then unmonitor
   if failed gid root then unmonitor

Amavis-new (mail virus scanner)

 check process amavisd with pidfile /opt/virus/amavis-new/var/run/amavisd.pid
   group mail
   start program = "/etc/init.d/amavis-new start"
   stop  program = "/etc/init.d/amavis-new stop"
   if failed port 10024 protocol smtp then restart
   if 5 restarts within 5 cycles then timeout
   depends on amavisd_bin
   depends on amavisd_rc

 check file amavisd_bin with path /opt/virus/amavis-new/bin/amavisd
   group mail
   if failed checksum then unmonitor
   if failed permission 755 then unmonitor
   if failed uid root then unmonitor
   if failed gid root then unmonitor

 check file amavisd_rc with path /etc/init.d/amavis-new
   group mail
   if failed checksum then unmonitor
   if failed permission 755 then unmonitor
   if failed uid root then unmonitor
   if failed gid root then unmonitor

Policyd (Postfix policy delegation daemon)

 check process policyd with pidfile /var/run/policyd.pid
   group mail
   start program = "/etc/init.d/policyd start"
   stop  program = "/etc/init.d/policyd stop"
   if failed port 10031 protocol postfix-policy then restart
   if 5 restarts within 5 cycles then timeout
   depends on policyd_bin
   depends on policyd_rc
   depends on cleanup_bin

 check file policyd_bin with path /usr/local/policyd/policyd
   group mail
   if failed checksum then unmonitor
   if failed permission 755 then unmonitor
   if failed uid root then unmonitor
   if failed gid root then unmonitor

 check file policyd_rc with path /etc/init.d/policyd
   group mail
   if failed checksum then unmonitor
   if failed permission 755 then unmonitor
   if failed uid root then unmonitor
   if failed gid root then unmonitor

 check file cleanup_bin with path /usr/local/policyd/cleanup
   group mail
   if failed checksum then unmonitor
   if failed permission 755 then unmonitor
   if failed uid root then unmonitor
   if failed gid root then unmonitor

Virus Scanner

Sophie (virus scan daemon)

 check process sophie with pidfile /var/run/sophie.pid
   group virus
   start program = "/etc/init.d/sophie start"
   stop  program = "/etc/init.d/sophie stop"
   if failed unixsocket /var/run/sophie then restart
   if 5 restarts within 5 cycles then timeout

Virus Scanner

Sophie (virus scan daemon)

 check process sophie with pidfile /var/run/sophie.pid
   group virus
   start program = "/etc/init.d/sophie start"
   stop  program = "/etc/init.d/sophie stop"
   if failed unixsocket /var/run/sophie then restart
   if 5 restarts within 5 cycles then timeout
   depends on sophie_bin
   depends on sophie_rc

 check file sophie_bin with path /opt/virus/sophie/sophie
   group virus
   if failed checksum then unmonitor
   if failed permission 755 then unmonitor
   if failed uid root then unmonitor
   if failed gid root then unmonitor

 check file sophie_rc with path /etc/init.d/sophie
   group virus
   if failed checksum then unmonitor
   if failed permission 755 then unmonitor
   if failed uid root then unmonitor
   if failed gid root then unmonitor

Trophie (virus scan daemon)

 check process trophie with pidfile /var/run/trophie.pid
   group virus
   start program = "/etc/init.d/trophie start"
   stop  program = "/etc/init.d/trophie stop"
   if failed unixsocket /var/run/trophie then restart
   if 5 restarts within 5 cycles then timeout
   depends on trophie_bin
   depends on trophie_rc

 check file trophie_bin with path /opt/virus/trophie/trophie
   group virus
   if failed checksum then unmonitor
   if failed permission 755 then unmonitor
   if failed uid root then unmonitor
   if failed gid root then unmonitor

 check file trophie_rc with path /etc/init.d/trophie
   group virus
   if failed checksum then unmonitor
   if failed permission 755 then unmonitor
   if failed uid root then unmonitor
   if failed gid root then unmonitor

Clamav (virus scan daemon)

 check process clamavd with pidfile /var/run/clamd.pid
   group virus
   start program = "/etc/init.d/clamavd start"
   stop  program = "/etc/init.d/clamavd stop"
   if failed unixsocket /var/run/clamd then restart
   if 5 restarts within 5 cycles then timeout
   depends on clamavd_bin
   depends on clamavd_rc

 check file clamavd_bin with path /opt/virus/clamavd/clamavd
   group virus
   if failed checksum then unmonitor
   if failed permission 755 then unmonitor
   if failed uid root then unmonitor
   if failed gid root then unmonitor

 check file clamavd_rc with path /etc/init.d/clamavd
   group virus
   if failed checksum then unmonitor
   if failed permission 755 then unmonitor
   if failed uid root then unmonitor
   if failed gid root then unmonitor

Database Services

MySQL Server

The name of the pidfile consists usually of the fully quallified domainname and pidfile as extension.

check process mysql with pidfile /opt/mysql/data/myserver.mydomain.pid
   group database
   start program = "/etc/init.d/mysql start"
   stop program = "/etc/init.d/mysql stop"
   if failed host 192.168.1.1 port 3306 protocol mysql then restart
   if 5 restarts within 5 cycles then timeout
   depends on mysql_bin
   depends on mysql_rc

 check file mysql_bin with path /opt/mysql/bin/mysqld
   group database
   if failed checksum then unmonitor
   if failed permission 755 then unmonitor
   if failed uid root then unmonitor
   if failed gid root then unmonitor

 check file mysql_rc with path /etc/init.d/mysql
   group database
   if failed checksum then unmonitor
   if failed permission 755 then unmonitor
   if failed uid root then unmonitor
   if failed gid root then unmonitor

OpenLDAP slapd (Debian package)

check process slapd with pidfile /var/run/slapd.pid
   group database
   start program = "/etc/init.d/slapd start"
   stop program = "/etc/init.d/slapd stop"
   if failed host 192.168.1.1 port 389 protocol ldap3 then restart
   if 5 restarts within 5 cycles then timeout
   depends on slapd_bin
   depends on slapd_rc

 check file slapd_bin with path /usr/sbin/slapd
   group database
   if failed checksum then unmonitor
   if failed permission 755 then unmonitor
   if failed uid root then unmonitor
   if failed gid root then unmonitor

 check file slapd_rc with path /etc/init.d/slapd
   group database
   if failed checksum then unmonitor
   if failed permission 755 then unmonitor
   if failed uid root then unmonitor
   if failed gid root then unmonitor

PostgreSQL

Generally choosing either the socket or a TCP/IP connect is sufficient.

 check process postgres with pidfile /var/postgres/postmaster.pid
   group database
   start program = "/etc/init.d/postgresql start"
   stop  program = "/etc/init.d/postgresql stop"
   if failed unixsocket /var/run/postgresql/.s.PGSQL.5432 protocol pgsql 
      then restart
   if failed host 192.168.1.1 port 5432 protocol pgsql then restart
   if 5 restarts within 5 cycles then timeout

File Services

Samba (windows file/domain server)

Hint: For enhanced controllability of the service it is handy to split up the samba init file into two pieces, one for smbd (the file service) and one for nmbd (the name service).

 check process smbd with pidfile /opt/samba2.2/var/locks/smbd.pid
   group samba
   start program = "/etc/init.d/smbd start"
   stop  program = "/etc/init.d/smbd stop"
   if failed host 192.168.1.1 port 139 type TCP  then restart
   if 5 restarts within 5 cycles then timeout
   depends on smbd_bin

 check file smbd_bin with path /opt/samba2.2/sbin/smbd
   group samba
   if failed checksum then unmonitor
   if failed permission 755 then unmonitor
   if failed uid root then unmonitor
   if failed gid root then unmonitor

 check process nmbd with pidfile /opt/samba2.2/var/locks/nmbd.pid
   group samba
   start program = "/etc/init.d/nmbd start"
   stop  program = "/etc/init.d/nmbd stop"
   if failed host 192.168.1.1 port 138 type UDP  then restart
   if failed host 192.168.1.1 port 137 type UDP  then restart
   if 5 restarts within 5 cycles then timeout
   depends on nmbd_bin

 check file nmbd_bin with path /opt/samba2.2/sbin/nmbd
   group samba
   if failed checksum then unmonitor
   if failed permission 755 then unmonitor
   if failed uid root then unmonitor
   if failed gid root then unmonitor

Printing Services

LPRng (printer daemon)

 check process lprng with pidfile /var/run/lpd.515
   group printer
   start program = "/etc/init.d/lprng start"
   stop  program = "/etc/init.d/lprng stop"
   if failed host 192.168.1.1 port 515 type TCP  then restart
   if 5 restarts within 5 cycles then timeout
   depends on lprng_bin
   depends on lprng_rc

 check file lprng_bin with path /opt/lprng/sbin/lpd
   group printer
   if failed checksum then unmonitor
   if failed permission 755 then unmonitor
   if failed uid root then unmonitor
   if failed gid root then unmonitor

 check file lprng_rc with path /etc/init.d/lprng
   group printer
   if failed checksum then unmonitor
   if failed permission 755 then unmonitor
   if failed uid root then unmonitor
   if failed gid root then unmonitor

Sun ONE Services

iPlanetDirectoryServer slapd

 check process ldap-master
  with pidfile /usr/iplanet/ldapmaster/slapd-master-1/logs/pid
   start program  "/usr/iplanet/ldapmaster/slapd-master-1/start-slapd"
   stop program  "/usr/iplanet/ldapmaster/slapd-master-1/stop-slapd"
   if 5 restarts within 5 cycles then timeout
   if failed host 192.168.1.1 port 389 protocol ldap3 then restart

iPlanetMessagingServer MTA dispatcher

 check process mta-dispatcher 
  with pidfile /usr/iplanet/msg-ims-1/config/pidfile.imta_dispatch
   start program  "/usr/iplanet/msg-ims-1/imsimta start dispatcher"
   stop program  "/usr/iplanet/msg-ims-1/imsimta stop dispatcher"
   group messaging
   if 5 restarts within 5 cycles then timeout
   if failed host 192.168.1.1 port 25 protocol smtp then restart

iPlanetMessagingServer MTA job controler

 check process mta-job_controller 
  with pidfile /usr/iplanet/msg-ims-1/config/pidfile.imta_jbc
   start program  "/usr/iplanet/msg-ims-1/imsimta start job_controller"
   stop program  "/usr/iplanet/msg-ims-1/imsimta stop job_controller"
   group messaging
   if 5 restarts within 5 cycles then timeout
   if failed host 192.168.1.1 port 28442 then restart

iPlanetMessagingServer stored

 check process store with pidfile /usr/iplanet/msg-ims-1/config/pidfile.store
   start program  "/usr/iplanet/msg-ims-1/start-msg store"
   stop program  "/usr/iplanet/msg-ims-1/stop-msg store"
   if 5 restarts within 5 cycles then timeout
   group messaging

 check file stored.ckp with path /usr/iplanet/msg-ims-1/config/stored.ckp
   if timestamp > 10 minutes then alert
   group messaging

 check file stored.lcu with path /usr/iplanet/msg-ims-1/config/stored.lcu
   if timestamp > 15 minutes then alert
   group messaging

 check file stored.per with path /usr/iplanet/msg-ims-1/config/stored.per
   if timestamp > 70 minutes then alert
   group messaging

iPlanetMessagingServer mshttpd

 check process webmail with pidfile /usr/iplanet/msg-ims-1/config/pidfile.http
   start program  "/usr/iplanet/msg-ims-1/start-msg http"
   stop program  "/usr/iplanet/msg-ims-1/stop-msg http"
   group messaging
   if 5 restarts within 5 cycles then timeout
   if failed host 192.168.1.1 port 80 protocol http then restart

iPlanetMessagingServer popd

 check process pop3 with pidfile /usr/iplanet/msg-ims-1/config/pidfile.pop
   start program  "/usr/iplanet/msg-ims-1/start-msg pop"
   stop program  "/usr/iplanet/msg-ims-1/stop-msg pop"
   group messaging
   if 5 restarts within 5 cycles then timeout
   if failed host 192.168.1.1 port 110 protocol pop then restart

iPlanetMessagingServer imapd

 check process imap4 with pidfile /usr/iplanet/msg-ims-1/config/pidfile.imap
   start program  "/usr/iplanet/msg-ims-1/start-msg imap"
   stop program  "/usr/iplanet/msg-ims-1/stop-msg imap"
   group messaging
   if 5 restarts within 5 cycles then timeout
   if failed host 192.168.1.1 port 143 protocol imap then restart

iPlanetMessagingServer madmand (SNMP subagent)

 check process snmp-subagent 
   with pidfile /usr/iplanet/msg-ims-1/config/pidfile.snmp
   start program  "/usr/iplanet/msg-ims-1/start-msg snmp"
   stop program  "/usr/iplanet/msg-ims-1/stop-msg snmp"
   group messaging
   if 5 restarts within 5 cycles then timeout

iPlanetMessagingServer MMP (POP3/IMAP4/SMTP proxy)

 check process mmp with pidfile /usr/iplanet/mmp-ims2/pidfile
   start program  "/usr/iplanet/mmp-ims2/AService.rc start"
   stop program  "/usr/iplanet/mmp-ims2/AService.rc stop"
   group messaging
   if 5 restarts within 5 cycles then timeout
   if failed host 192.168.1.2 port 110 protocol pop then restart
   if failed host 192.168.1.2 port 143 protocol imap then restart

iPlanetCalendarServer csadmind

 check process calendar-admin 
   with pidfile /usr/iplanet/SUNWics5/cal/bin/config/pidfile.admin
   start program  "/usr/iplanet/SUNWics5/cal/bin/csstart service admin"
   stop program  "/usr/iplanet/SUNWics5/cal/bin/csstop service admin"
   group calendar
   if 5 restarts within 5 cycles then timeout

iPlanetCalendarServer cshttpd

 check process calendar-http 
   with pidfile /usr/iplanet/SUNWics5/cal/bin/config/pidfile.http
   start program  "/usr/iplanet/SUNWics5/cal/bin/csstart service http"
   stop program  "/usr/iplanet/SUNWics5/cal/bin/csstop service http"
   group calendar
   if 5 restarts within 5 cycles then timeout
   if failed host 192.168.1.3 port 80 protocol http then restart

iPlanetCalendarServer csdwpd (database wire protocol)

 check process calendar-dwp 
   with pidfile /usr/iplanet/SUNWics5/cal/bin/config/pidfile.dwp
   start program  "/usr/iplanet/SUNWics5/cal/bin/csstart service dwp"
   stop program  "/usr/iplanet/SUNWics5/cal/bin/csstop service dwp"
   group calendar
   if 5 restarts within 5 cycles then timeout
   if failed host 192.168.1.3 port 9779 protocol dwp then restart
   if cpu usage > 2% for 5 cycles then restart   # There's a leak in csdwpd

iPlanetCalendarServer csnotifyd

 check process calendar-notify 
   with pidfile /usr/iplanet/SUNWics5/cal/bin/config/pidfile.notify
   start program  "/usr/iplanet/SUNWics5/cal/bin/csstart service notify"
   stop program  "/usr/iplanet/SUNWics5/cal/bin/csstop service notify"
   group calendar
   if 5 restarts within 5 cycles then timeout

iPlanetCalendarServer enpd (event notification service broker)

 check process calendar-ens 
   with pidfile /usr/iplanet/SUNWics5/cal/bin/config/pidfile.ens
   start program  "/usr/iplanet/SUNWics5/cal/bin/csstart service ens"
   stop program  "/usr/iplanet/SUNWics5/cal/bin/csstop service ens"
   group calendar
   if 5 restarts within 5 cycles then timeout
   if failed host 192.168.1.3 port 7997 then restart

Misc Services

Apcupsd (APC ups daemon)

 check process apcupsd with pidfile /var/run/apcupsd.pid
   group ups
   start program = "/etc/init.d/apcupsd start"
   stop  program = "/etc/init.d/apcupsd stop"
   if 5 restarts within 5 cycles then timeout
   if failed host 192.168.1.3 port 7000 type TCP  then restart
   depends on apcupsd_bin
   depends on apcupsd_rc

 check file apcupsd_bin with path /opt/apcupsd/sbin/apcupsd
   group ups
   if failed checksum then unmonitor
   if failed permission 755 then unmonitor
   if failed uid root then unmonitor
   if failed gid root then unmonitor

 check file apcupsd_rc with path /etc/init.d/apcupsd
   group ups
   if failed checksum then unmonitor
   if failed permission 755 then unmonitor
   if failed uid root then unmonitor
   if failed gid root then unmonitor

Webmin (remote admin service)

 check process webmin with pidfile /var/webmin/miniserv.pid
   group webmin
   start program = "/etc/init.d/webmin start"
   stop  program = "/etc/init.d/webmin stop"
   if failed host 192.168.1.3 port 10000 then restart
   if 5 restarts within 5 cycles then timeout

 check file webmin_rc with path /etc/init.d/webmin
   group webmin
   if failed checksum then unmonitor
   if failed permission 755 then unmonitor
   if failed uid root then unmonitor
   if failed gid root then unmonitor

aMule (p2p program - daemon version)

  check process aMule with pidfile /home/$USER/.aMule/muleLock
    start program = "/etc/init.d/amule-daemon start"
    stop program  = "/etc/init.d/amule-daemon stop"

kissdx (Streaming app for some DVDs)

  check process kissdx with pidfile /var/run/kissdx
    start program = "/etc/init.d/kissdx"
    stop program  = "/usr/bin/killall kissdxp"
    if 5 restarts within 5 cycles then timeout

STunnel (SSL tunnel)

 check process stunnel_pop3 with pidfile /opt/var/stunnel/stunnel.110.pid
   start program = "/etc/init.d/stunnel start_pop3"
   stop  program = "/etc/init.d/stunnel stop_pop3"
   if failed host 192.168.1.1 port 143 type TCPSSL protocol POP then restart
   group stunnel
   depends stunnel_init
   depends stunnel_bin

 check process stunnel_swat with pidfile /opt/var/stunnel/stunnel.901.pid
   start program = "/etc/init.d/stunnel start_swat"
   stop  program = "/etc/init.d/stunnel stop_swat"
   if failed host 192.168.1.1 port 995 type TCPSSL then restart
   group stunnel
   depends stunnel_bin
   depends stunnel_rc

 check file stunnel_bin with path /opt/sbin/stunnel
   group stunnel
   if failed checksum then unmonitor
   if failed permission 755 then unmonitor
   if failed uid root then unmonitor
   if failed gid root then unmonitor

 check file stunnel_rc with path /etc/init.d/stunnel
   group stunnel
   if failed checksum then unmonitor
   if failed permission 755 then unmonitor
   if failed uid root then unmonitor
   if failed gid root then unmonitor

Misc Usage

Watch and analyze httpd crashdumps (Solaris) Setuid coredump allowed:

 coreadm -e proc-setid

Monit set to watch the core timestamp change and send the backtrace:

 check file httpd_core with path /usr/apache/core
   if changed timestamp
      then exec "/bin/bash -c '/usr/bin/pstack /usr/apache/core |\
           mailx -s httpd_crash foo@bar'"

Watch and analyze httpd crashdumps (Linux) Central coredump prepared:

 mkdir -p /var/crash/core
 chmod 1777 /var/crash/core
 sysctl -w kernel.core_pattern = /var/crash/core/core.%e.%t.%p
 sysctl -w kernel.core_setuid_ok = 0
 sysctl -w kernel.core_uses_pid = 1
 echo -e "bt\nquit" &gt; /etc/gdb.batch
 echo "ulimit -c unlimited" &gt;&gt; /etc/sysconfig/httpd
 echo "CoreDumpDirectory /var/crash/core" &gt; /etc/httpd/conf.d/core.conf

Crontab based core aging:

 10 1 * * * /usr/bin/find /var/crash/core/ -type f -mtime +1 -exec rm -f {} \;

Monit set to watch the directory timestamp change and send last core backtrace:

 check directory httpd_core with path /var/crash/core
   if changed timestamp then exec "/bin/bash -c 'if [ `/bin/cat /tmp/monit_httpd_core.tmp | head -1` != `/bin/ls /var/crash/core/core.httpd* | tail -1` ]; then /usr/bin/gdb -x /etc/gdb.batch /usr/sbin/httpd `/bin/ls /var/crash/core/core.httpd* | tail -1 | tee /tmp/monit_httpd_core.tmp` | mail -s httpd_crash admin@foo.bar webmaster@foo.bar; fi'"

Start and stop tcpdump based on condition As soon as the remote SMTP service of host bar is not available tcpdump is started. When the connection is available again, tcpdump is stopped. Only first ocurrence is catched (noexec flag is created to prevent another outage monitoring).

 check host bar with address 10.1.1.2
   if failed port 25 protocol smtp then exec "/bin/bash -c 'if [ ! -f /tmp/noexec ]; then touch /tmp/noexec; tcpdump -w /tmp/foo_bar.dump host bar; fi'" else if recovered then exec "killall tcpdump"

Rotate tcpdump until condition occures This allows to let tcpdump write the data to file and rotate it to keep the size of the dump small until network problem occures (we don't need to flood the filesystem with data which are ok). As soon as the problem occures, monit sets noexec flag => the dump contains the data which preceded the problem as well.

Script for tcpdump and rotation created (/tmp/dumprotate):

 #!/bin/bash
 killall tcpdump
 if [ ! -f /tmp/noexec ]
 then
   tcpdump -w /tmp/foo_bar.dump host bar
 fi

The script is started from cron each 30 minutes:

 0,30 * * * * /tmp/dumprotate

Monit watches the host availablity and as soon as it failed, sets noexec flag (with 5 minutes extent):

 check host bar with address 10.1.1.2
   if failed port 25 protocol smtp then exec "/bin/bash -c 'sleep 300; touch /tmp/noexec'"

MySQL event driven process list This allows to obtain process list of mysql threads as soon as mysql refuses connections. For example we needed to know why mysql returned "Too many connections" to clients occasionaly. (note that for simplicity in this example is showed mysql root account without password - you realy should use restricted account ;)

 check process mysqld with pidfile /var/run/mysqld.pid
   if failed port 3306 protocol mysql then exec "/bin/bash -c '(date && /usr/bin/mysqladmin -u root processlist && echo) >> /tmp/mysql_processlist'"

Logrotate configuration for monit

/var/log/monit.log {
    missingok
    notifempty
    size 100k
    create 0644 root root
    postrotate
        /bin/kill -HUP `cat /var/run/monit.pid 2>/dev/null` 2> /dev/null || true
    endscript
}

Getting top otput by mail on event

check file myfile with path /tmp/fo.bar
  if changed timestamp then exec "/bin/bash -c 'top -bn1 | mail -s top admin@foo.bar'"
```
