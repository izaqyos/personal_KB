---
type: reference
title: Logging
description: "Linux logging: logrotate settings and syslog."
tags: [logging, linux, configuration-file, reference, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "linux/KB_Linux#28"
---

# Logging

[↑ KB_Linux](/linux/kb-linux/README.md)

## 28.1 Logging, Log File Rotation, and Syslog Tutorial

```text
http://content.hccfl.edu/pollock/aunix2/logging.htm

Logging Overview:

To identify problems and trends, and to trouble-shoot them, requires observing events over a period of time (historical monitoring).  Since it is generally impossible to observe all events as they occur, most daemons record important events to files known as log files. 

Early services managed their own files.  Today most (but not all!) can use the logging daemon syslog to collect, filter, store, alert, and forward logging data.  Syslog has the added benefit of somewhat standardizing log file formats, making it much easier to examine log data with various standard tools.  However some daemons may need to have their default logging configuration changed to have them take advantage of syslog (or indeed, provide any log data at all).

An important part of a system administrator's job is to regularly check various log files.  Be sure to learn where your hosts keep their log files as the directory is different for different flavors of *nix.

For most distributions of Linux, you should examine various log files in /var/log, especially the main (default) log file messages.  Use the dmesg command (and /var/log/boot.log) to see boot problems, hardware issues (and identification).  Copy /tmp/install.log to someplace safe.  (Must do this on first boot as /tmp gets erased on reboot.)  The secure log is also very important to monitor.

Other log files include audit/* (for SE Linux and related log messages), wtmp is a log of who logged in and when (This is a binary file, so view with last command and manage with the Linux sessreg command).  utmp is a binary file (not a log) of who's logged in now.  Two related files may exist (create these as empty files to use): btmp (a log of failed login attempts) and lastlog (not a log file but a sparse file — examine it with ls -l and du), which shows the last login per user id (view with finger and lastlog commands).

				*/



Note that most network devices (routers, switches, printers) today can produce syslog data.  You should examine these log files too.

Collect logging data from all important sources, including network devices, printers, workstations, and Windows servers.

Log files need to be examined or they are useless.  However it would be foolish to try to read all log data, all the time.  Usually summaries of the data are sufficient to alert you to potential problems, at which time you would then examine the relevant log entries.  This can be partially automated with log alerting and parsing tools (such as logwatch, logcheck, swatch, logsurfer, and SEC), GUI tools to examine and mange log files, and standard text processing tools such as grep, tail, tail -f, and less  (For example:  grep service logFile |grep date |less.)

Use SNMP/RMON to monitor network devices and networks.

Most hosts today ship with a basic syslog daemon but a number of replacement versions (that are compatible) include many new features.  Some of these replacements are:

syslog-ng (the most popular replacement currently)
module syslog
SDSC-syslog
nsyslog
New syslog IETF standards (RFCs) for syslog are being developed, to address security issues.

Windows (and Macintosh) System Logs:

Non Unix/Linux systems also maintain log files, but usually not in syslog format.  Windows systems uses binary event logs, that automatically overwrite themselves (!) when full.  However binary the format is publicly available and a number of Perl and other tools exists to convert these to text.

Windows logs are consistent across all Windows versions and services (e.g., Event ID 529 always means a failed login).  And as event logging is built into the OS it is generally more secure than syslog.

Windows provides no mechanism to forward events to a central loghost.  Instead there are a number of third party tools for this such as Kiwi syslog for Windows, EventReporter, Snare for Windows, and even roll-your-own with Perl module Win32::EventLog.

The Windows event log is really 3 logs: the system log, the security log, and the application log.  (Think of these as 3 syslog facilities.)  Each log is stored in a separate file in ...\system32\conf\SysEvent.Evt, ...\SecEvent.Evt, and ...\AppEvent.Evt.

Applications must register themselves to be able to use the event log service (see registry key HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\Eventlog\Application).

System and service event logging is controlled by the Windows Audit Policy (Control Panel→Administrative Tools→Local Security Policy→Audit Policy).

Windows provides logevent (equivalent to the Unix/Linux logger command line tool) to create event log messages.

For older Macintosh systems (OS9 and earlier) you can use the syslog compatible netlogger tool.

Other Logging Issues:

IDS and NIDS aren't enough!  Don't rely on these tools exclusively.  The alerts they generate are often meaningless without log data to see if the unusual event has resulted in a failure or a security breach.  Only log data can tell you that.
Common IDSs include file integrity checkers such as tripwire, osiris, and samhain.  Snort is a common NIDS scanner.

When managing a network you will have many hosts and devices that generate log data.  It is usually best to funnel all the log data to a single host.  This loghost is often a dedicated host just for logging and should be secured by removing all unused services and access, and generally hardened.
With loghosts listening for both local and remote syslog data, make sure you open up the syslog port in all firewalls between you and the remote host: UDP/514.  Note UDP is not secure and you should only allow selected hosts to use that port.
Configure your services to use syslog.  Many services ship with logging off by default, or attempt to use a custom log file.  Each service should send all messages to syslog.  If this is too much data you can configure syslog to filter it out.  This means you don't need to continually remember how to configure every service when you need to change its log-level.  Just configure syslog for any service.
When initially installing a new server (or updating one) it will pay to crank up the amount of log data collected for that service until you are confident it is working correctly.
Send all data to a single central loghost.  If your network is spread out geographically, each location can have a local loghost and these in turn send data to the central loghost.  These relay loghosts should also store the log data, giving you a backup in case the central loghost fails or if a network connection goes down.
One problem with a central loghost is that the default syslog daemon (but not all newer versions) only reports the last hop IP address in the log, so the central loghost will lose the IP address of the original host that generated the message.  A good solution is to use a more modern syslog replacement, such as syslog-ng.
Loghosts are attacked by hackers so it is often worth the work to build a stealth loghost.  Such a host has one NIC connected to an inner network and is used for SSH connections by the administrator or to relay log data.  The other NIC is on the LAN from which you are collecting the log data.  This NIC is unnumbered and set in promiscuous mode.  You use various tools (netcat, a.k.a. nc) to monitor the network for UDP log data sent to a fictitious address.  The various hosts on the LAN will try to send their log data to that fictitious host.
Log data is usually send via UDP.  Modern syslog replacements (and soon syslog itself) will be able to use TCP, SSH/SSL/TLS encryption, and digitally signed log messages, to provide extra security.
Log files contain sensitive information, so:
Set the file permissions accordingly!  This includes the files and (usually) syslog's /dev/log device (and similar ones in chroot jails).
When a log file is closed (when rotated for instance) consider digitally signing and/or encrypting the log file to prevent tampering and/or unauthorized access.
When possible, don't collect data you don't need! The best way to keep data private is not to store it at all.  For example turn down the log level (amount of detail) produced after a daemon is setup completely.
Only keep data as long as you need to.  Most industry have standard limits on how long to keep different types of data.  Follow these guidelines.
Of the data you do keep, decide which data can be blinded, which data should be encrypted, and which data can be safely left open:
Blinding data means that it is destroyed, but in a way that makes it unique.  A hash (one-way) function is a good technique for this.
Blinding is a useful way to store personal data such as credit card numbers, phone numbers, addresses, customer ID numbers, etc.  Note that blinded data can still be used as a primary key for a database table, as a hash of a unique value is still unique.
If possible randomize the order of such data, to hide the sequence of data (not a good idea for system log files, but useful for, say, financial transaction logs).
Blinded data can't be recovered to its original form.  So if there is a requirement for sensitive (private) data that must be recoverable use encryption instead of data blinding.
Consider using digital signatures for each log entry.  (Some syslog replacements do this already, and syslog will soon).  A different key should be used to digitally sign the whole log, either after every entry or after the log file is closed/rotated.  This is an example of a dual control that prevents a single person working alone from falsifying data (e.g., hiding financial transactions to embezzle funds).
Without special hardware support encryption and digital signatures can take a long time.  This can cause a busy log server to fall behind, eventually losing log entries or crashing altogether!  Some modern syslog replacements report such lost log entry statistics, so you can test your system under a simulated load to make sure you won't lose valuable data.
Note that blinding, encrypting, and not keeping data are general techniques, not well suited to system log files.  However it still pays to consider these issues.

Log data can grow to fill even large disks quickly.  You must make sure large log files won't crash your system or result in some DOS (when sending log information across your network).  (See log rotation below.)  Consider various data reduction techniques: summarizing repetitive log entries, discarding low utility log messages, and data compression.
Old log data, at least some of it, has lasting value for baselining and auditing.  Consider archiving old log data, or filtering the logs and archiving important events and summary data (e.g., 208 SSH logins successful in past day).  One useful design would be to have old log data sent to a database.  Then you could easily get reports and make queries using SQL.
Syslog doesn't restrict which hosts can send log data or what data is sent.  This make all log data unreliable.  Hackers can easily generate fake log data and send it to your loghost.  This can reduce the evidentiary value of your data.  This can be partially mitigated using a careful firewall configuration, but this issue is better addressed by using one of the modern syslog replacements.
Some syslog replacements use TCP instead of UDP and support IPSec or SSL tunnels for the transport.  (This makes stealth loghosts both impossible and unnecessary.)  Digitally signing log entries can also reduce fake log entries (but not if the evil-doer has access to the remote system and can cause it to generate the correctly signed log entries!)
Newer syslog protocols use syslog-sign and syslog-reliable for safer transport and sender authentication, and are supported by some syslog replacements.
If you're not going to replace your current syslog, consider using SSH or SSL tunnels (see stunnel) for transport of syslog data.  Set up tunnel on each remote host so data send to localhost port 9999 (or any unprivileged port) gets automatically forwarded to the loghost via the secure tunnel:
On client:     nc -l -u -p syslog | nc locahost 9999
On loghost:    nc -l -p 999 | nc localhost -u syslog
Syslog time-stamps don't contain the year, so make sure the archived log files' names include the year.
Syslog time-stamps don't contain time zone information.  When data is sent to a central loghost from a wide geographical area, it is important to know the time zone of the original host that generated the log message.  Consider using one of the newer syslog replacements that does provide this information, or otherwise take care of this issue when performing data reduction and data parsing.
Accurate network-wide time is vital to correlating log events and for preserving their value as an audit trail and evidence in court.  Use NTP to synchronize your hosts and network devices to the same time.  If an external time server is not feasible for some reason, pick one (well-connected) host to act as your or4ganizatin's time server.  For about $100 you can install a GPS or radio-controlled clock.
Syslog Overview:

What gets logged by syslogd and where it goes is controlled by /etc/syslog.conf.  In the past (and to a small extent today), servers had hard-coded filenames to use for their log files.  This is a very inflexible scheme, and log files would wind up scattered all over the disk.  A modern system uses syslog to centralize logging.  A single configuration file can control what gets logged (and what gets ignored), and where the log messages should go. 

Here's how it works:  A developer uses the syslog API function (or uses the logger program in shell scripts) to send log messages to syslogd.  The information passed to syslogd includes the source of the log message (called a facility) and the priority of the log message.

syslogd then matches the facility and priority against selectors (combinations of facilities and priorities) in its configuration file.  For the selector(s) that match the messages is sent to the corresponding destination(s).

Note that many PAM modules send log messages to syslogd.  Also, some systems have a separate log daemon for the kernel, klogd, that you may need to configure.

Most log files go under /var/log directory.  Besides the more specific log files, there is a general system log file usually called messages.  Other important log files to monitor include: boot.log, dmesg (also the dmesg command), maillog, secure, wtmp (examine with the last command), and yum.log (or whatever system you use instead, to see what was installed recently).

Log files contain sensitive information!  You must protect these files by setting permissions carefully!

Syslog.conf Syntax:

Aside from blank lines and comment lines, syslog.conf has lines with two parts:

The selector says what messages to log
The action says what to do with them (i.e., where the message goes)
Each log message is matched against the selectors.  For each matching selector, the associated action is done.

Syslog Selectors — Facilities and Priorities:

The source of a log message is referred to as a facility.  For example any email related program that sends a log message uses the mail facility no matter what the name of the program actually was.

There is no way to define your own facilities but there are many predefined ones:

auth (Security events get logged with this)
authpriv (user access messages use this)
cron
daemon (other daemon programs without a facility of their own)
kern (kernel messages)
lpr
mail
mark (used by syslogd to produce timestamps in log files)
news
syslog
user (for user programs)
uucp
local0 – local7 (any use; RH uses local7 for boot messages)
* (for all)
Note that syslog trusts the software to use the correct facility when sending a log message.

Due to the limited number of facilities available, it is inevitable that some services will wind up using the same facility for their log messages.  Syslog allows programs to supply an identifying string, known as a tag, that syslog will prepend to each line of the log messages.  This permits easy selection using grep or other tools, to filter only the log messages of interest.

Priorities:

The priority is one of the following eight levels, which are ranked in order from high to low priority:

emerg
alert
crit
err
warning
notice
info
debug
When specifying a priority, that and all higher ones are selected too.  A selector is one or more facilities (separated by commas), a dot, then the priority.  More complex selectors are possible too; one such is shown below.)  Some example selectors:

mail.*       mail facility, any priority
mail.debug   mail facility, debug or higher priority (same as *)
mail,news.*  all messages from mail or news
auth.warning all security messages of warning or higher priority
*.info       all messages from any facility except debug msgs
*.=info      any facility, info msgs only (and not higher)
*.!err       any facility, pri <= err only
*.!=alert    any facility, any priority except alert
*.info;mail,news,authpriv.none
             all msgs with info or higher priority except
             mail, news, and authpriv
That last one is tricky.  Using multiple selectors on a single line this way allows you to specify a general category first, then for the matching log messages you can specify exceptions.  Always go from most general selector to most specific or your setup may not log what you think it should!

Syslog Actions — files, users, pipes:

Log messages don't only have to go to files, you can direct them to user terminals, run them through other programs (with a pipe, to email, pager, or just a log file analyzer), or send them to another host running syslogd.

(This last is handy if you have a network of computers you must monitor.  Besides consolidating many log files, there is great security in using a remote log server that has no other services on it.  This is because when a server is hacked the attacker usually destroys the log files.  This scheme protects against disk crashes too.)

Here's the syntax for the actions:

/complete/path/of/some/file
/dev/console 
(This is a link to the system console)
-/complete/path/of/some/file 
(Don't flush file each time; better performance but risks loss of some log info.)
username1[,username2 ...]
* 
(all logged in users)
@remotehost 
(e.g., @log.hcc.com; start the remote syslogd with -r option.)
|/path/to/named/pipe 
(To send output to a command you must create a named pipe, say /var/lib/cmd.pipe with the mkfifo command.  Then start the command with cmd </var/lib/cmd.pipe.)
Using logger:

   logger [-p facility.priority] [-t tag] message
The default selector is user.info, and the default tag is logger.

Log File Rotation:

One problem with log files is that over time they grow.  When a system is experiencing problems the log files can grow very large, very quickly.  Periodically trimming or removing log files is necessary.  This is known as log file rotation and is a service usually run via cron.

The most popular scheme is to rename a log file log as log.1 and to start a new log file.  Next time, log.1 is renamed to log.2, log is renamed to log.1, and a new log file is started.  This continues for N previous files.

Since dealing with log file rotation is a common problem most Unix systems have a standard way to deal with it.  On Solaris9 you have /usr/sbin/logadm (/usr/lib/newsyslog on earlier Solaris).

On Linux you have the logrotate command.  This command runs via the cron facility.  You can set your log rotation policy for any log file by editing the file logrotate.conf, or editing files in the /etc/logrotate.d directory.  Here's a sample logrotate.conf file:

#Global settings:

# rotate log files weekly
weekly
# keep 4 weeks worth of backlogs
rotate 4
# Create new (empty) log files after rotating old ones
create 0644 root root

# Per log file settings:

/var/log/cups/*_log {
    missingok
    notifempty
    errors root
    postrotate
        /etc/init.d/cups condrestart >/dev/null 2>&1 || true
    endscript
}
Links:


*/
```
