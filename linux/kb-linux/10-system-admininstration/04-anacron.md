---
type: reference
title: anacron
description: anacron man page for running periodic commands.
tags: [linux, unix, reference, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "linux/KB_Linux#10.4"
---

# 10.4 anacron

[↑ System admininstration](/linux/kb-linux/10-system-admininstration/README.md)

### 10.4.1 anacron man page

```text
anacron(8) - Linux man page

Name

anacron - runs commands periodically
Synopsis

anacron [-s] [-f] [-n] [-d] [-q] [-t anacrontab] [job] ...
anacron -u [-t anacrontab] [job] ...
anacron [-V|-h]
Description


 Anacron can be used to execute commands periodically, with a frequency specified in days. Unlike cron(8), it does not assume that the machine is running continuously. Hence, it can be used on machines that aren't running 24 hours a day, to control daily, weekly, and monthly jobs that are usually controlled by cron.
When executed, Anacron reads a list of jobs from a configuration file, normally /etc/anacrontab (see anacrontab(5)). This file contains the list of jobs that Anacron controls. Each job entry specifies a period in days, a delay in minutes, a unique job identifier, and a shell command.

For each job, Anacron checks whether this job has been executed in the last n days, where n is the period specified for that job. If not, Anacron runs the job's shell command, after waiting for the number of minutes specified as the delay parameter.

After the command exits, Anacron records the date in a special timestamp file for that job, so it can know when to execute it again. Only the date is used for the time calculations. The hour is not used.

When there are no more jobs to be run, Anacron exits.

Anacron only considers jobs whose identifier, as specified in the anacrontab matches any of the job command-line arguments. The job arguments can be shell wildcard patterns (be sure to protect them from your shell with adequate quoting). Specifying no job arguments, is equivalent to specifying "*" (That is, all jobs will be considered).

Unless the -d option is given (see below), Anacron forks to the background when it starts, and the parent process exits immediately.

Unless the -s or -n options are given, Anacron starts jobs immediately when their delay is over. The execution of different jobs is completely independent.

If a job generates any output on its standard output or standard error, the output is mailed to the user running Anacron (usually root).

Informative messages about what Anacron is doing are sent to syslogd(8) under facility cron, priority notice. Error messages are sent at priority error.

"Active" jobs (i.e. jobs that Anacron already decided to run and now wait for their delay to pass, and jobs that are currently being executed by Anacron), are "locked", so that other copies of Anacron won't run them at the same time.

Options

-f
Force execution of the jobs, ignoring the timestamps.
-u
Only update the timestamps of the jobs, to the current date, but don't run anything.
-s
Serialize execution of jobs. Anacron will not start a new job before the previous one finished.
-n
Run jobs now. Ignore the delay specifications in the /etc/anacrontab file. This options implies -s.
-d
Don't fork to the background. In this mode, Anacron will output informational messages to standard error, as well as to syslog. The output of jobs is mailed as usual.
-q
Suppress messages to standard error. Only applicable with -d.
-t anacrontab
Use specified anacrontab, rather than the default
-V
Print version information, and exit.
-h
Print short usage message, and exit.
Signals

After receiving a SIGUSR1 signal, Anacron waits for running jobs, if any, to finish and then exits. This can be used to stop Anacron cleanly.
Notes

Make sure that the time-zone is set correctly before Anacron is started. (The time-zone affects the date). This is usually accomplished by setting the TZ environment variable, or by installing a /usr/lib/zoneinfo/localtime file. See tzset(3) for more information.
Files

/etc/anacrontab
Contains specifications of jobs. See anacrontab(5) for a complete description.
/var/spool/anacron
This directory is used by Anacron for storing timestamp files.
See Also

anacrontab(5), cron(8), tzset(3)
The Anacron README file.

Bugs

Anacron never removes timestamp files. Remove unused files manually.
Anacron uses up to two file descriptors for each active job. It may run out of descriptors if there are more than about 125 active jobs (on normal kernels).

Mail comments, suggestions and bug reports to Sean 'Shaleh' Perry <shaleh@(debian.org|valinux.com)>.

Author

Anacron was originally conceived and implemented by Christian Schwarz <schwarz@monet.m.isar.de>.
The current implementation is a complete rewrite by Itai Tzur <itzur@actcom.co.il>.

The code base is currently maintained by Sean 'Shaleh' Perry <shaleh@(debian.org|valinux.com)>.
```
