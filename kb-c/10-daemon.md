---
type: reference
title: Daemon
description: Creating a daemon process in C with an example program.
tags: [c, unix, legacy, examples, howto]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "c-kb#10"
---

# Daemon

[↑ c-kb](/kb-c/README.md)

## 10.1 Creating a Daemon Process in C Language with an Example Program

```text
A daemon process is a process which runs in background and has no controlling terminal.

Since a daemon process usually has no controlling terminal so almost no user interaction is required. Daemon processes are used to provide services that can well be done in background without any user interaction.

For example a process that runs in background and observes network activity and logs any suspicious communication can be developed as a daemon process.
Daemon Process Design

A daemon process can be developed just like any other process but there is one thing that differentiates it with any other normal process ie having no controlling terminal. This is a major design aspect in creating a daemon process. This can be achieved by :

    Create a normal process (Parent process)
    Create a child process from within the above parent process
    The process hierarchy at this stage looks like :  TERMINAL -> PARENT PROCESS -> CHILD PROCESS
    Terminate the the parent process.
    The child process now becomes orphan and is taken over by the init process.
    Call setsid() function to run the process in new session and have a new group.
    After the above step we can say that now this process becomes a daemon process without having a controlling terminal.
    Change the working directory of the daemon process to root and close stdin, stdout and stderr file descriptors.
    Let the main logic of daemon process run.

So we see that above steps mark basic design steps for creating a daemon.
C fork() Function

Before creating an actual running daemon following the above stated design steps, lets first learn a bit about the fork() system call.

fork() system creates a child process that is exact replica of the parent process. This new process is referred as ‘child’ process.

This system call gets called once (in parent process) but returns twice (once in parent and second time in child). Note that after the fork() system call, whether the parent will run first or the child is non-deterministic. It purely depends on the context switch mechanism. This call returns zero in child while returns PID of child process in the parent process.

Following are some important aspects of this call :

    The child has its own unique process ID, and this PID does not match the ID of any existing process group.
    The child’s parent process ID is the same as the parent’s process ID.
    The child does not inherit its parent’s memory locks.
    Process resource utilization and CPU time counters are reset to zero in the child.
    The child’s set of pending signals is initially empty.
    The child does not inherit semaphore adjustments from its parent.
    The child does not inherit record locks from its parent.
    The child does not inherit timers from its parent.
    The child does not inherit outstanding asynchronous I/O operations from its parent, nor does it inherit  any  asynchronous I/O contexts from its parent.

For more insight information, please read the man page of this system call.
The Implementation

Based on the design as mentioned in the first section. Here is the complete implementation :

#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <string.h>
int main(int argc, char* argv[])
{
FILE *fp= NULL;
pid_t process_id = 0;
pid_t sid = 0;
// Create child process
process_id = fork();
// Indication of fork() failure
if (process_id < 0)
{
printf("fork failed!\n");
// Return failure in exit status
exit(1);
}
// PARENT PROCESS. Need to kill it.
if (process_id > 0)
{
printf("process_id of child process %d \n", process_id);
// return success in exit status
exit(0);
}
//unmask the file mode
umask(0);
//set new session
sid = setsid();
if(sid < 0)
{
// Return failure
exit(1);
}
// Change the current working directory to root.
chdir("/");
// Close stdin. stdout and stderr
close(STDIN_FILENO);
close(STDOUT_FILENO);
close(STDERR_FILENO);
// Open a log file in write mode.
fp = fopen ("Log.txt", "w+");
while (1)
{
//Dont block context switches, let the process sleep for some time
sleep(1);
fprintf(fp, "Logging info...\n");
fflush(fp);
// Implement and call some function that does core work for this daemon.
}
fclose(fp);
return (0);
}

Following is the way through which the code was compiled and executed:

$ gcc -Wall deamon.c -o deamon
$ sudo ./deamon
process_id of child process 2936

Just observe that the control immediately came back to the terminal ie the daemon is now not associated to any terminal.

When you check the log.txt file located in the root directory, you could see that this daemon process is running.

$
$ tail -f /Log.txt
Logging info...
Logging info...
Logging info...
Logging info...
Logging info...
Logging info...
Logging info...
Logging info...
Logging info...
Logging info...
```

### 10.1.1 Also print pid of daemon

```text
add:

FILE *fp1= NULL;
...
// Open a log file in write mode.
fp = fopen ("Log.txt", "w+");
fp1 = fopen ("daemon.pid", "w+");
fprintf(fp1, "%d",getpid());
fclose(fp1);

		10.1.2
```

## 10.2 More Professional example, lwsmd

```text
static
DWORD
LwSmDaemonize(
    VOID
    )
{
    DWORD dwError = 0;
    pid_t pid = -1;
    int ret = 0;
    int devNull = -1;
    int i = 0;

    /* Open a pipe so the daemon process can notify us
       when it is ready to accept connections.  This means
       the foreground process will not exit until the daemon
       is fully usable */
    if (pipe(gState.notifyPipe) != 0)
    {
        dwError = LwMapErrnoToLwError(errno);
        BAIL_ON_ERROR(dwError);
    }

    pid = fork();

    if (pid < 0)
    {
        dwError = LwMapErrnoToLwError(errno);
        BAIL_ON_ERROR(dwError);
    }
    else if (pid > 0)
    {
        /* We are the foreground process */

        /* Close the write end of the pipe since we don't need it */
        close(gState.notifyPipe[1]);

        /* Wait until daemon process indicates it is fully started by sending error code */
        do
        {
            ret = read(gState.notifyPipe[0], &dwError, sizeof(dwError));
        } while (ret < 0 && errno == EINTR);

        if (dwError)
        {
            fprintf(stderr, "Error: %s (%d)\n", LwWin32ExtErrorToName(dwError), (int) dwError);
        }

        exit(dwError ? 1 : 0);
    }
    
    /* We are the intermediate background process.
       Isolate ourselves from the state of the foreground process
       by changing directory, becoming a session leader,
       redirecting stdout/stderr/stdin to /dev/null, and setting
       a reasonable umask */
    if (chdir("/") != 0)
    {
        dwError = LwMapErrnoToLwError(errno);
        BAIL_ON_ERROR(dwError);
    }

    if (setsid() < 0)
    {
        dwError = LwMapErrnoToLwError(errno);
        BAIL_ON_ERROR(dwError);
    }

    if ((devNull = open("/dev/null", O_RDWR)) < 0)
    {
        dwError = LwMapErrnoToLwError(errno);
        BAIL_ON_ERROR(dwError);
    }

    for (i = 0; i <= 2; i++)
    {
        if (dup2(devNull, i) < 0)
        {
            dwError = LwMapErrnoToLwError(errno);
            BAIL_ON_ERROR(dwError);
        }
    }

    close(devNull);
    umask(0022);

    /* Now that we are isolated, fork the actual daemon process and exit */
    pid = fork();

    if (pid < 0)
    {
        dwError = LwMapErrnoToLwError(errno);
        BAIL_ON_ERROR(dwError);
    }
    else if (pid > 0)
    {
        /* The intermediate background process exits here */
        exit(0);
    }

    /* We are the actual daemon process, continue with startup */

    /* Close the read end of the notification pipe now since we don't need it */
    close(gState.notifyPipe[0]);

    /* Prevent the write end of the notification pipe from being inherited by children */
    if (fcntl(gState.notifyPipe[1], F_SETFD, FD_CLOEXEC) < 0)
    {
        dwError = LwMapErrnoToLwError(errno);
        BAIL_ON_ERROR(dwError);
    }

error:

    return dwError;
}
	10.3
```
