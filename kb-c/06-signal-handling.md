---
type: reference
title: Signal handling
description: "Signal handling in C, including the Linux signalfd man page."
tags: [c, linux, legacy, reference, examples]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "c-kb#6"
---

# Signal handling

[↑ c-kb](/kb-c/README.md)

## 6.1 signalfd

### 6.1.1 Linux man page

```text
signalfd - create a file descriptor for accepting signals
Synopsis

#include <sys/signalfd.h>

int signalfd(int fd, const sigset_t *mask, int flags);
Description

signalfd() creates a file descriptor that can be used to accept signals targeted at the caller. This provides an alternative to the use of a signal handler or sigwaitinfo(2), and has the advantage that the file descriptor may be monitored by select(2), poll(2), and epoll(7). The mask argument specifies the set of signals that the caller wishes to accept via the file descriptor. This argument is a signal set whose contents can be initialized using the macros described in sigsetops(3). Normally, the set of signals to be received via the file descriptor should be blocked using sigprocmask(2), to prevent the signals being handled according to their default dispositions. It is not possible to receive SIGKILL or SIGSTOP signals via a signalfd file descriptor; these signals are silently ignored if specified in mask.

If the fd argument is -1, then the call creates a new file descriptor and associates the signal set specified in mask with that descriptor. If fd is not -1, then it must specify a valid existing signalfd file descriptor, and mask is used to replace the signal set associated with that descriptor.

The flags argument is currently unused, and must be specified as zero. In the future, it may be used to request additional functionality.

signalfd() returns a file descriptor that supports the following operations:

read(2)
    If one or more of the signals specified in mask is pending for the process, then the buffer supplied to read(2) is used to return one or more signalfd_siginfo structures (see below) that describe the signals. The read(2) returns information for as many signals as are pending and will fit in the supplied buffer. The buffer must be at least sizeof(struct signalfd_siginfo) bytes. The return value of the read(2) is the total number of bytes read. 
    As a consequence of the read(2), the signals are consumed, so that they are no longer pending for the process (i.e., will not be caught by signal handlers, and cannot be accepted using sigwaitinfo(2)).

    If none of the signals in mask is pending for the process, then the read(2) either blocks until one of the signals in mask is generated for the process, or fails with the error EAGAIN if the file descriptor has been made non-blocking (via the use of the fcntl(2) F_SETFL operation to set the O_NONBLOCK flag). 
poll(2), select(2) (and similar)
    The file descriptor is readable (the select(2) readfds argument; the poll(2) POLLIN flag) if one or more of the signals in mask is pending for the process. 
    The signalfd file descriptor also supports the other file-descriptor multiplexing APIs: pselect(2), ppoll(2), and epoll(7). 
close(2)
    When the file descriptor is no longer required it should be closed. When all file descriptors associated with the same signalfd object have been closed, the resources for object are freed by the kernel. 

The signalfd_siginfo structure

The format of the signalfd_siginfo structure(s) returned by read(2)s from a signalfd file descriptor is as follows:

    struct signalfd_siginfo {/
        uint32_t  ssi_signo;
        int32_t   ssi_errno;
        int32_t   ssi_code;
        uint32_t  ssi_pid;
        uint32_t  ssi_uid;
        int32_t   ssi_fd;
        uint32_t  ssi_tid;
        uint32_t  ssi_band;
        uint32_t  ssi_overrun;
        uint32_t  ssi_trapno;
        int32_t   ssi_status;
        int32_t   ssi_int;
        uintptr_t ssi_ptr;
        uint64_t  ssi_utime;
        uint64_t  ssi_stime;
        uint64_t  ssi_addr;
        uint8_t   pad[X];  /* Pad size to 128 bytes (allow space
                              additional fields in the future) */
    };

Each of the fields in this structure is analogous to the similarly named field in the siginfo_t structure. The siginfo_t structure is described in sigaction(2). Not all fields in the returned signalfd_siginfo structure will be valid for a specific signal; the set of valid fields can be determined from the value returned in the ssi_code field. This field is the analog of the siginfo_t si_code field; see sigaction(2) for details.

fork(2) semantics

After a fork(2), the child inherits a copy of the signalfd file descriptor. The file descriptor refers to the same underlying file object as the corresponding descriptor in the parent, and read(2)s in the child will return information about signals generated for the parent (the process that created the object using signalfd().

execve(2) semantics

Just like any other file descriptor, a signalfd file descriptor remains open across an execve(2), unless it has been marked for close-on-exec (see fcntl(2)). Any signals that were available for reading before the execve(2) remain available to the newly loaded program. (This is analogous to traditional signal semantics, where a blocked signal that is pending remains pending across an execve(2).) (This is analogous to traditional signal semantics, where a blocked signal that is pending remains pending across an execve(2).)

Thread semantics

The semantics of signalfd file descriptors in a multithreaded program mirror the standard semantics for signals. In other words, when a thread reads from a signalfd file descriptor, it will read the signals that are directed to the thread itself and the signals that are directed to the process (i.e., the entire thread group). (A thread will not be able to read signals that are directed to other threads in the process.)

Return Value

On success, signalfd() returns a signalfd file descriptor; this is either a new file descriptor (if fd was -1), or fd if fd was a valid signalfd file descriptor. On error, -1 is returned and errno is set to indicate the error.
Errors

EBADF

The fd file descriptor is not a valid file descriptor.

EINVAL

fd is not a valid signalfd file descriptor; or, flags is nonzero.

EMFILE

The per-process limit of open file descriptors has been reached.

ENFILE

The system-wide limit on the total number of open files has been reached.

ENODEV

Could not mount (internal) anonymous inode device.

ENOMEM

There was insufficient memory to create a new signalfd file descriptor.

Versions

signalfd() is available on Linux since kernel 2.6.22. Working support is provided in glibc since version 2.8.
Conforming To

signalfd() is Linux-specific.
Notes

The underlying Linux system call requires an additional argument, size_t sizemask, which specifies the size of the mask argument. The glibc signalfd() wrapper function does not include this argument, since it provides the required value for the underlying system call.

The flags argument is a glibc addition to the underlying system call.

A process can create multiple signalfd file descriptors. This makes it possible to accept different signals on different file descriptors. (This may be useful if monitoring the file descriptors using select(2), poll(2), or epoll(7): the arrival of different signals will make different descriptors ready.) If a signal appears in the mask of more than one of the file descriptors, then occurrences of that signal can be read (once) from any one of the descriptors.
Example

The program below accepts the signals SIGINT and SIGQUIT via a signalfd file descriptor. The program terminates after accepting a SIGQUIT signal. The following shell session demonstrates the use of the program:

    $ ./signalfd_demo
    ^C                    # Control-C generates SIGINT
    Got SIGINT
    ^C
    Got SIGINT
    ^\                    # Control-\ generates SIGQUIT
    Got SIGQUIT
    $

#include <sys/signalfd.h>
#include <signal.h>
#include <unistd.h>
#include <stdlib.h>
#include <stdio.h>

#define handle_error(msg) \
    do { perror(msg); exit(EXIT_FAILURE); } while (0)

int
main(int argc, char *argv[])
{
    sigset_t mask;
    int sfd;
    struct signalfd_siginfo fdsi;
    ssize_t s;

   sigemptyset(&mask);
    sigaddset(&mask, SIGINT);
    sigaddset(&mask, SIGQUIT);

   /* Block signals so that they aren't handled
       according to their default dispositions */

   if (sigprocmask(SIG_BLOCK, &mask, NULL) == -1)
        handle_error("sigprocmask");

   sfd = signalfd(-1, &mask, 0);
    if (sfd == -1)
        handle_error("signalfd");

   for (;;) {
        s = read(sfd, &fdsi, sizeof(struct signalfd_siginfo));
        if (s != sizeof(struct signalfd_siginfo))
            handle_error("read");

       if (fdsi.signo == SIGINT) {
            printf("Got SIGINT\n");
        } else if (fdsi.signo == SIGQUIT) {
            printf("Got SIGQUIT\n");
            exit(EXIT_SUCCESS);
        } else {
            printf("Read unexpected signal\n");
        }
    }
}

See Also

eventfd(2), poll(2), read(2), select(2), sigaction(2), sigprocmask(2), sigwaitinfo(2), timerfd_create(2), sigsetops(3), epoll(7), signal(7)
Colophon

This page is part of release 2.78 of the Linux man-pages project. A description of the project, and information about reporting bugs, can be found at http://www.kernel.org/doc/man-pages/.
die.net

    site search Google Custom Search

Library
    online dictionary
    linux docs
    linux man pages
    page load time

Toys
    world sunlight
    moon phase
    trace explorer
```

### 6.1.2 Code examples

#### 6.1.2.1 Waiting for a signal with timeout using sigtimedwait()

```text
Submitted by daper on Tue, 02/03/2009 - 00:28

/* The program creates a child process and waits for it to finish. If a timeout
 * elapses the child is killed. Waiting is done using sigtimedwait(). Race
 * condition is avoided by blocking the SIGCHLD signal before fork().
 */
#include <sys/types.h>
#include <sys/wait.h>
#include <signal.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>
#include <errno.h>
 
static pid_t fork_child (void)
{
	int p = fork ();
 
	if (p == -1) {
		perror ("fork");
		exit (1);
	}
 
	if (p == 0) {
		puts ("child: sleeping...");
		sleep (10);
		puts ("child: exiting");
		exit (0);
	}
 
	return p;
}
 
int main (int argc, char *argv[])
{
	sigset_t mask;
	sigset_t orig_mask;
	struct timespec timeout;
	pid_t pid;
 
	sigemptyset (&mask);
	sigaddset (&mask, SIGCHLD);
 
	if (sigprocmask(SIG_BLOCK, &mask, &orig_mask) < 0) {
		perror ("sigprocmask");
		return 1;
	}
 
	pid = fork_child ();
 
	timeout.tv_sec = 5;
	timeout.tv_nsec = 0;
 
	do {
		if (sigtimedwait(&mask, NULL, &timeout) < 0) {
			if (errno == EINTR) {
				/* Interrupted by a signal other than SIGCHLD. */
				continue;
			}
			else if (errno == EAGAIN) {
				printf ("Timeout, killing child\n");
				kill (pid, SIGKILL);
			}
			else {
				perror ("sigtimedwait");
				return 1;
			}
		}
 
		break;
	} while (1);
 
	if (waitpid(pid, NULL, 0) < 0) {
		perror ("waitpid");
		return 1;
	}
 
	return 0;
}
```

#### 6.1.2.2 Blocking signals with sigprocmask()

```text
Submitted by daper on Tue, 02/03/2009 - 00:21

/** This program blocks SIGTERM signal for 10 seconds using sigprocmask(2)
 * After that the signal is unblocked and the queued signal is handled.
 */
#include <signal.h>
#include <stdio.h>
#include <string.h>
#include <unistd.h>
 
static int got_signal = 0;
 
static void hdl (int sig)
{
	got_signal = 1;
}
 
int main (int argc, char *argv[])
{
	sigset_t mask;
	sigset_t orig_mask;
	struct sigaction act;
 
	memset (&act, 0, sizeof(act));
	act.sa_handler = hdl;
 
	if (sigaction(SIGTERM, &act, 0)) {
		perror ("sigaction");
		return 1;
	}
 
	sigemptyset (&mask);
	sigaddset (&mask, SIGTERM);
 
	if (sigprocmask(SIG_BLOCK, &mask, &orig_mask) < 0) {
		perror ("sigprocmask");
		return 1;
	}
 
	sleep (10);
 
	if (sigprocmask(SIG_SETMASK, &orig_mask, NULL) < 0) {
		perror ("sigprocmask");
		return 1;
	}
 
	sleep (1);
 
	if (got_signal)
		puts ("Got signal");
 
	return 0;
}
```

#### 6.1.2.3 Handling interruption of system calls by signals

```text
Submitted by daper on Tue, 02/03/2009 - 00:12

/** Example of handling cases when system calls are interrupted by
 * a signal. This program copies its standard input to the standard output.
 * Here read() and write() may be interrupted. Additionally after receiving
 * a signal the program prints how much data it transfered so far.
 */
#include <stdio.h>
#include <signal.h>
#include <unistd.h>
#include <errno.h>
#include <string.h>
 
static volatile int print_stats = 0;
 
size_t total_read = 0;
size_t total_write = 0;
 
static void hdl (int sig)
{
	print_stats = 1;
}
 
static void do_print_stats (void)
{
	if (print_stats) {
		print_stats = 0;
		fprintf (stderr, "Read: %zd, Write: %zd\n", total_read, total_write);
	}
}
 
int main (int argc, char *argv[])
{
	ssize_t nread;
	ssize_t nwrite;
	struct sigaction act;
 
	memset (&act, 0, sizeof(act));
 
	act.sa_handler = hdl;
 
	if (sigaction(SIGUSR1, &act, NULL) < 0) {
		perror ("sigaction");
		return 1;
	}
 
	do {
		char buf[512];
 
		nread = read (0, buf, sizeof(buf));
		if (nread < 0) {
			if (errno != EINTR) {
				perror ("read");
				return 1;
			}
 
			/* We are here because the read() call was interrupted before
			 * anything was read. */
 
			do_print_stats ();
		}
		else if (nread == 0)
			break;
		else {
			ssize_t written = 0;
			total_read += nread;
 
			while (written < nread) {
				nwrite = write (1, buf + written, nread - written);
				if (nwrite < 0) {
					if (errno != EINTR) {
						perror ("write");
						return 1;
					}
 
					/* We are here because write() call was interrupted
					 * before anything could be written. */
 
				}
				else {
					written += nwrite;
					total_write += nwrite;
				}
 
				do_print_stats ();
			}
		}
 
	} while (1);
 
	return 0;
}
```

#### 6.1.2.4 Example of using signalfd()

```text
Submitted by daper on Mon, 02/02/2009 - 18:32

/* Example of use of a Linux-specific call - signalfd() to handle signals using
 * a file descriptor.
 */
#include <stdio.h>
#include <unistd.h>
#include <signal.h>
#include <sys/signalfd.h>
#include <string.h>
 
int main (int argc, char *argv[])
{
	int sfd;
	sigset_t mask;
 
	/* We will handle SIGTERM and SIGINT. */
	sigemptyset (&mask);
	sigaddset (&mask, SIGTERM);
	sigaddset (&mask, SIGINT);
 
	/* Block the signals thet we handle using signalfd(), so they don't
	 * cause signal handlers or default signal actions to execute. */
	if (sigprocmask(SIG_BLOCK, &mask, NULL) < 0) {
		perror ("sigprocmask");
		return 1;
	}
 
	/* Create a file descriptor from which we will read the signals. */
	sfd = signalfd (-1, &mask, 0);
	if (sfd < 0) {
		perror ("signalfd");
		return 1;
	}
 
	while (1) {
 
		/** The buffor for read(), this structure contains information
		 * about the signal we've read. */
		struct signalfd_siginfo si;
 
		ssize_t res;
 
		res = read (sfd, &si, sizeof(si));
 
		if (res < 0) {
			perror ("read");
			return 1;
		}
		if (res != sizeof(si)) {
			fprintf (stderr, "Something wrong\n");
			return 1;
		}
 
		if (si.ssi_signo == SIGTERM)
			printf ("Got SIGTERM\n");
		else if (si.ssi_signo == SIGINT) {
 
 
			printf ("Bye!\n");
			break;
		}
		else {
			fprintf (stderr, "Got some unhandled signal\n");
			return 1;
		}
	}
 
	/* Close the file descriptor if we no longer need it. */
	close (sfd);
 
	return 0;
}
```

#### 6.1.2.5 Example of using sigaction()

```text
Submitted by daper on Mon, 02/02/2009 - 18:25

/* Example of using sigaction() to setup a signal handler with 3 arguments
 * including siginfo_t.
 */
#include <stdio.h>
#include <unistd.h>
#include <signal.h>
#include <string.h>
 
static void hdl (int sig, siginfo_t *siginfo, void *context)
{
	printf ("Sending PID: %ld, UID: %ld\n",
			(long)siginfo->si_pid, (long)siginfo->si_uid);
}
 
int main (int argc, char *argv[])
{
	struct sigaction act;
 
	memset (&act, '\0', sizeof(act));
 
	/* Use the sa_sigaction field because the handles has two additional parameters */
	act.sa_sigaction = &hdl;
 
	/* The SA_SIGINFO flag tells sigaction() to use the sa_sigaction field, not sa_handler. */
	act.sa_flags = SA_SIGINFO;
 
	if (sigaction(SIGTERM, &act, NULL) < 0) {
		perror ("sigaction");
		return 1;
	}
 
	while (1)
		sleep (10);
 
	return 0;
}
```

#### 6.1.2.6 SIGBUS handling

```text
Submitted by daper on Mon, 01/19/2009 - 19:46

/* Example of SIGBUS handling. A read from mmap()ed memory is invalid because
 * a file was shrinked. SIGBUS is sent to the process, but we handle it and
 * jump to another place in the program so it doesn't crash.
 *
 * Run this program with or without the 'shrink' argument.
 */
#include <sys/types.h>
#include <sys/mman.h>
#include <fcntl.h>
#include <signal.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>
#include <errno.h>
#include <setjmp.h>
 
/* Size of the file in pages. */
#define FILE_SIZE	4
 
/* Environment and blocked signal state for restoration in a signal handler. */
static sigjmp_buf sj_env;
 
static void sigbus_hdl (int sig, siginfo_t *siginfo, void *ptr)
{
 
	/* Jump (goto) to the saved program state where we don't use mmapped()
	 * memory. */
	siglongjmp (sj_env, 1);
}
 
int main (int argc, char *argv[])
{
	struct sigaction act;
	int fd = -1;
	char *mem = NULL;
	size_t file_size;
 
	memset (&act, 0, sizeof(act));
	act.sa_sigaction = sigbus_hdl;
	act.sa_flags = SA_SIGINFO;
 
	if (sigaction(SIGBUS, &act, 0)) {
		perror ("sigaction");
		return 1;
	}
 
	file_size = sysconf(_SC_PAGE_SIZE) * FILE_SIZE;
 
	fd = open ("file_for_mmap", O_RDWR | O_CREAT | O_TRUNC, 0644);
	if (fd < 0) {
		perror ("open");
		return 1;
	}
 
	/* Enlarge the file to file_size bytes. */
	if (ftruncate(fd, file_size) < 0) {
		perror ("ftruncate");
		return 1;
	}
 
	mem = mmap (NULL, file_size, PROT_READ | PROT_WRITE, MAP_PRIVATE, fd, 0);
	if (mem == MAP_FAILED) {
		perror ("mmap");
		return 1;
	}
 
	/* Remember this point as a state that we can return to using
	 * siglongjmp(). If this function returns a value other than 0
	 * it means that we are here because of siglongjmp().
	 */
	if (sigsetjmp(sj_env, 1)) {
		fprintf (stderr, "Failed to read from mapped file\n");
 
		if (mem) {
			if (munmap(mem, file_size) < 0) {
				perror ("munmap");
				return 1;
			}
		}
 
		if (fd >= 0)
			close (fd);
 
		return 1;
	}
 
	if (argc > 1 && !strcmp(argv[1], "shrink")) {
 
		/* Shrink the file to half of it's size. */
		if (ftruncate(fd, file_size / 2) < 0) {
			perror ("ftruncate");
			return 1;
		}
	}
 
	/* Read from mmapped() memory. */
	if (memchr(mem, 'd', file_size)) {
		puts ("found 'd'!");
	}
	else
		puts ("'d' not found");
 
	munmap (mem, FILE_SIZE);
	close (fd);
 
	return 0;
}
```

#### 6.1.2.7 SIGCHLD handler

```text
Submitted by daper on Sun, 01/18/2009 - 14:16

/* Simplest dead child cleanup in a SIGCHLD handler. Prevent zombie processes
 * but don't actually do anything with the information that a child died.
 */
#include <sys/types.h>
#include <sys/wait.h>
#include <signal.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>
#include <errno.h>
 
/* SIGCHLD handler. */
static void sigchld_hdl (int sig)
{
	/* Wait for all dead processes.
	 * We use a non-blocking call to be sure this signal handler will not
	 * block if a child was cleaned up in another part of the program. */
	while (waitpid(-1, NULL, WNOHANG) > 0) {
	}
}
 
int main (int argc, char *argv[])
{
	struct sigaction act;
	int i;
 
	memset (&act, 0, sizeof(act));
	act.sa_handler = sigchld_hdl;
 
	if (sigaction(SIGCHLD, &act, 0)) {
		perror ("sigaction");
		return 1;
	}
 
	/* Make some children. */
	for (i = 0; i < 50; i++) {
		switch (fork()) {
			case -1:
				perror ("fork");
				return 1;
			case 0:
				return 0;
		}
	}
 
	/* Wait until we get a sleep() call that is not interrupted by a signal. */
	while (sleep(1)) {
	}
 
	return 0;
}
```

#### 6.1.2.8 Using pselect() to avoid a signal race

```text
Submitted by daper on Tue, 01/13/2009 - 23:28

/* An example of a free of signal race program using sigprocmask() and
 * pselect(). */
#include <sys/select.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <netinet/in.h>
#include <netinet/ip.h>
#include <arpa/inet.h>
#include <signal.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>
#include <errno.h>
 
/* Flag that tells the daemon to exit. */
static volatile int exit_request = 0;
 
/* Signal handler. */
static void hdl (int sig)
{
	exit_request = 1;
}
 
/* Accept client on listening socket lfd and close the connection
 * immediatelly. */
static void handle_client (int lfd)
{
	int sock = accept (lfd, NULL, 0);
	if (sock < 0) {
		perror ("accept");
		exit (1);
	}
 
	puts ("accepted client");
 
	close (sock);
}
 
int main (int argc, char *argv[])
{
	int lfd;
	struct sockaddr_in myaddr;
	int yes = 1;
	sigset_t mask;
	sigset_t orig_mask;
	struct sigaction act;
 
	memset (&act, 0, sizeof(act));
	act.sa_handler = hdl;
 
	/* This server should shut down on SIGTERM. */
	if (sigaction(SIGTERM, &act, 0)) {
		perror ("sigaction");
		return 1;
	}
 
	sigemptyset (&mask);
	sigaddset (&mask, SIGTERM);
 
	if (sigprocmask(SIG_BLOCK, &mask, &orig_mask) < 0) {
		perror ("sigprocmask");
		return 1;
	}
 
	lfd = socket (AF_INET, SOCK_STREAM, 0);
	if (lfd < 0) {
		perror ("socket");
		return 1;
	}
 
	if (setsockopt(lfd, SOL_SOCKET, SO_REUSEADDR,
				&yes, sizeof(int)) == -1) {
		perror ("setsockopt");
		return 1;
	}
 
	memset (&myaddr, 0, sizeof(myaddr));
	myaddr.sin_family = AF_INET;
	myaddr.sin_addr.s_addr = INADDR_ANY;
	myaddr.sin_port = htons (10000);
 
	if (bind(lfd, (struct sockaddr *)&myaddr, sizeof(myaddr)) < 0) {
		perror ("bind");
		return 1;
	}
 
	if (listen(lfd, 5) < 0) {
		perror ("listen");
		return 1;
	}
 
	while (!exit_request) {
		fd_set fds;
		int res;
 
		/* BANG! we can get SIGTERM at this point, but it will be
		 * delivered while we are in pselect(), because now
		 * we block SIGTERM.
		 */
 
		FD_ZERO (&fds);
		FD_SET (lfd, &fds);
 
		res = pselect (lfd + 1, &fds, NULL, NULL, NULL, &orig_mask);
		if (res < 0 && errno != EINTR) {
			perror ("select");
			return 1;
		}
		else if (exit_request) {
			puts ("exit");
			break;
		}
		else if (exit_request)
			break;
		else if (res == 0)
			continue;
 
		if (FD_ISSET(lfd, &fds)) {
			handle_client (lfd);
		}
	}
 
	return 0;
}
```

#### 6.1.2.9 Signal race with select() and accept()

```text
Submitted by daper on Tue, 01/13/2009 - 22:46

/* An example of a signal race condition using the traditional UNIX functions:
 * signal(), select(), accept ().
 */
#include <sys/select.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <netinet/in.h>
#include <netinet/ip.h>
#include <arpa/inet.h>
#include <signal.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>
#include <errno.h>
 
/* Flag that tells the daemon to exit. */
static volatile int exit_request = 0;
 
/* Signal handler. */
static void hdl (int sig)
{
	exit_request = 1;
}
 
/* Accept client on listening socket lfd and close the connection
 * immediatelly. */
static void handle_client (int lfd)
{
	int sock = accept (lfd, NULL, 0);
	if (sock < 0) {
		perror ("accept");
		exit (1);
	}
 
	puts ("accepted client");
 
	close (sock);
}
 
int main (int argc, char *argv[])
{
	int lfd;
	struct sockaddr_in myaddr;
	int yes = 1;
 
	/* This server should shut down on SIGTERM. */
	signal (SIGTERM, hdl);
 
	lfd = socket (AF_INET, SOCK_STREAM, 0);
	if (lfd < 0) {
		perror ("socket");
		return 1;
	}
 
	if (setsockopt(lfd, SOL_SOCKET, SO_REUSEADDR,
				&yes, sizeof(int)) == -1) {
		perror ("setsockopt");
		return 1;
	}
 
	memset (&myaddr, 0, sizeof(myaddr));
	myaddr.sin_family = AF_INET;
	myaddr.sin_addr.s_addr = INADDR_ANY;
	myaddr.sin_port = htons (10000);
 
	if (bind(lfd, (struct sockaddr *)&myaddr, sizeof(myaddr)) < 0) {
		perror ("bind");
		return 1;
	}
 
	if (listen(lfd, 5) < 0) {
		perror ("listen");
		return 1;
	}
 
	while (!exit_request) {
		fd_set fds;
		int res;
 
		/* BANG! we can get SIGTERM at this point. */
 
		FD_ZERO (&fds);
		FD_SET (lfd, &fds);
 
		res = select (lfd + 1, &fds, NULL, NULL, NULL);
		if (res < 0 && errno != EINTR) {
			perror ("select");
			return 1;
		}
		else if (exit_request) {
			puts ("exit");
			break;
		}
		else if (exit_request)
			break;
		else if (res == 0)
			continue;
 
		if (FD_ISSET(lfd, &fds)) {
			handle_client (lfd);
		}
	}
 
	return 0;
}


			6.1.2.10
```

## 6.2 Select

### 6.2.1 example

```text
Socket flow of events: Server that uses non-blocking I/O and select()
The following calls are used in the example:

|   1. The socket() function returns a socket descriptor representing an endpoint. The statement also identifies that the INET (Internet Protocol) address family with the TCP transport (SOCK_STREAM) will be used for this socket.
|   2. The ioctl() function allows the local address to be reused when the server is restarted before the required wait time expires. In this example, it sets the socket to be non-blocking. All of the sockets for the incoming connections will also be non-blocking since they will inherit that state from the listening socket.
|   3. After the socket descriptor is created, the bind() function gets a unique name for the socket.
|   4. The listen() allows the server to accept incoming client connections.
|   5. The server uses the accept() function to accept an incoming connection request. The accept() call will block indefinitely waiting for the incoming connection to arrive.
|   6. The select() function allows the process to wait for an event to occur and to wake up the process when the event occurs. In this example, the select () function returns a number that represents the socket descriptors that are ready to be processed.

      0
          Indicates that the process will timeout. In this example, the timeout is set for 30 seconds. 

      -1
          Indicates that the process has failed. 

      1
          Indicates only one descriptor is ready to be processed. In this example, when a 1 is returned the FD_ISSET and the subsequent socket calls complete only once. 

      n
          Indicates multiple descriptors waiting to be processed. In this example, when an n is returned the FD_ISSET and subsequent code loops and completes the requests in the order they are received by the server. 

|   7. The accept() and recv() functions are completed when the EWOULDBLOCK is returned.
|   8. The send() function echoes the data back to the client.
|   9. The close() function closes any open socket descriptors. 

For information on the use of code examples, see the code disclaimer.

#include <stdio.h>
#include <stdlib.h>
#include <sys/ioctl.h>
#include <sys/socket.h>
#include <sys/time.h>
#include <netinet/in.h>
#include <errno.h>
 
#define SERVER_PORT  12345
 
#define TRUE             1
#define FALSE            0
 
main (int argc, char *argv[])
{
   int    i, len, rc, on = 1;
   int    listen_sd, max_sd, new_sd;
   int    desc_ready, end_server = FALSE;
   int    close_conn;
   char   buffer[80];
   struct sockaddr_in   addr;
   struct timeval       timeout;
   struct fd_set        master_set, working_set;
 
   /*************************************************************/
   /* Create an AF_INET stream socket to receive incoming       */
   /* connections on                                            */
   /*************************************************************/
   listen_sd = socket(AF_INET, SOCK_STREAM, 0);
   if (listen_sd < 0)
   {
      perror("socket() failed");
      exit(-1);
   }
 
   /*************************************************************/
   /* Allow socket descriptor to be reuseable                   */
   /*************************************************************/
   rc = setsockopt(listen_sd, SOL_SOCKET,  SO_REUSEADDR,
                   (char *)&on, sizeof(on));
   if (rc < 0)
   {
      perror("setsockopt() failed");
      close(listen_sd);
      exit(-1);
   }
 
   /*************************************************************/
   /* Set socket to be non-blocking.  All of the sockets for    */
   /* the incoming connections will also be non-blocking since  */
   /* they will inherit that state from the listening socket.   */
   /*************************************************************/
   rc = ioctl(listen_sd, FIONBIO, (char *)&on);
   if (rc < 0)
   {
      perror("ioctl() failed");
      close(listen_sd);
      exit(-1);
   }
 
   /*************************************************************/
   /* Bind the socket                                           */
   /*************************************************************/
   memset(&addr, 0, sizeof(addr));
   addr.sin_family      = AF_INET;
   addr.sin_addr.s_addr = htonl(INADDR_ANY);
   addr.sin_port        = htons(SERVER_PORT);
   rc = bind(listen_sd,
             (struct sockaddr *)&addr, sizeof(addr));
   if (rc < 0)
   {
      perror("bind() failed");
      close(listen_sd);
      exit(-1);
   }
 
   /*************************************************************/
   /* Set the listen back log                                   */
   /*************************************************************/
   rc = listen(listen_sd, 32);
   if (rc < 0)
   {
      perror("listen() failed");
      close(listen_sd);
      exit(-1);
   }
 
   /*************************************************************/
   /* Initialize the master fd_set                              */
   /*************************************************************/
   FD_ZERO(&master_set);
   max_sd = listen_sd;
   FD_SET(listen_sd, &master_set);
 
   /*************************************************************/
   /* Initialize the timeval struct to 3 minutes.  If no        */
   /* activity after 3 minutes this program will end.           */
   /*************************************************************/
   timeout.tv_sec  = 3 * 60;
   timeout.tv_usec = 0;
 
   /*************************************************************/
   /* Loop waiting for incoming connects or for incoming data   */
   /* on any of the connected sockets.                          */
   /*************************************************************/
   do
   {
      /**********************************************************/
      /* Copy the master fd_set over to the working fd_set.     */
      /**********************************************************/
      memcpy(&working_set, &master_set, sizeof(master_set));
 
      /**********************************************************/
      /* Call select() and wait 5 minutes for it to complete.   */
      /**********************************************************/
      printf("Waiting on select()...\n");
      rc = select(max_sd + 1, &working_set, NULL, NULL, &timeout);
 
      /**********************************************************/
      /* Check to see if the select call failed.                */
      /**********************************************************/
      if (rc < 0)
      {
         perror("  select() failed");
         break;
      }
 
      /**********************************************************/
      /* Check to see if the 5 minute time out expired.         */
      /**********************************************************/
      if (rc == 0)
      {
         printf("  select() timed out.  End program.\n");
         break;
      }
 
      /**********************************************************/
      /* One or more descriptors are readable.  Need to         */
      /* determine which ones they are.                         */
      /**********************************************************/
      desc_ready = rc;
      for (i=0; i <= max_sd  &&  desc_ready > 0; ++i)
      {
         /*******************************************************/
         /* Check to see if this descriptor is ready            */
         /*******************************************************/
         if (FD_ISSET(i, &working_set))
         {
            /****************************************************/
            /* A descriptor was found that was readable - one   */
            /* less has to be looked for.  This is being done   */
            /* so that we can stop looking at the working set   */
            /* once we have found all of the descriptors that   */
            /* were ready.                                      */
            /****************************************************/
            desc_ready -= 1;
 
            /****************************************************/
            /* Check to see if this is the listening socket     */
            /****************************************************/
            if (i == listen_sd)
            {
               printf("  Listening socket is readable\n");
               /*************************************************/
               /* Accept all incoming connections that are      */
               /* queued up on the listening socket before we   */
               /* loop back and call select again.              */
               /*************************************************/
               do
               {
                  /**********************************************/
                  /* Accept each incoming connection.  If       */
                  /* accept fails with EWOULDBLOCK, then we     */
                  /* have accepted all of them.  Any other      */
                  /* failure on accept will cause us to end the */
                  /* server.                                    */
                  /**********************************************/
                  new_sd = accept(listen_sd, NULL, NULL);
                  if (new_sd < 0)
                  {
                     if (errno != EWOULDBLOCK)
                     {
                        perror("  accept() failed");
                        end_server = TRUE;
                     }
                     break;
                  }
 
                  /**********************************************/
                  /* Add the new incoming connection to the     */
                  /* master read set                            */
                  /**********************************************/
                  printf("  New incoming connection - %d\n", new_sd);
                  FD_SET(new_sd, &master_set);
                  if (new_sd > max_sd)
                     max_sd = new_sd;
 
                  /**********************************************/
                  /* Loop back up and accept another incoming   */
                  /* connection                                 */
                  /**********************************************/
               } while (new_sd != -1);
            }
 
            /****************************************************/
            /* This is not the listening socket, therefore an   */
            /* existing connection must be readable             */
            /****************************************************/
            else
            {
               printf("  Descriptor %d is readable\n", i);
               close_conn = FALSE;
               /*************************************************/
               /* Receive all incoming data on this socket      */
               /* before we loop back and call select again.    */
               /*************************************************/
               do
               {
                  /**********************************************/
                  /* Receive data on this connection until the  */
                  /* recv fails with EWOULDBLOCK.  If any other */
                  /* failure occurs, we will close the          */
                  /* connection.                                */
                  /**********************************************/
                  rc = recv(i, buffer, sizeof(buffer), 0);
                  if (rc < 0)
                  {
                     if (errno != EWOULDBLOCK)
                     {
                        perror("  recv() failed");
                        close_conn = TRUE;
                     }
                     break;
                  }
 
                  /**********************************************/
                  /* Check to see if the connection has been    */
                  /* closed by the client                       */
                  /**********************************************/
                  if (rc == 0)
                  {
                     printf("  Connection closed\n");
                     close_conn = TRUE;
                     break;
                  }
 
                  /**********************************************/
                  /* Data was recevied                          */
                  /**********************************************/
                  len = rc;
                  printf("  %d bytes received\n", len);
 
                  /**********************************************/
                  /* Echo the data back to the client           */
                  /**********************************************/
                  rc = send(i, buffer, len, 0);
                  if (rc < 0)
                  {
                     perror("  send() failed");
                     close_conn = TRUE;
                     break;
                  }
 
               } while (TRUE);
 
               /*************************************************/
               /* If the close_conn flag was turned on, we need */
               /* to clean up this active connection.  This     */
               /* clean up process includes removing the        */
               /* descriptor from the master set and            */
               /* determining the new maximum descriptor value  */
               /* based on the bits that are still turned on in */
               /* the master set.                               */
               /*************************************************/
               if (close_conn)
               {
                  close(i);
                  FD_CLR(i, &master_set);
                  if (i == max_sd)
                  {
                     while (FD_ISSET(max_sd, &master_set) == FALSE)
                        max_sd -= 1;
                  }
               }
            } /* End of existing connection is readable */
         } /* End of if (FD_ISSET(i, &working_set)) */
      } /* End of loop through selectable descriptors */
 
   } while (end_server == FALSE);
 
   /*************************************************************/
   /* Cleanup all of the sockets that are open                  */
   /*************************************************************/
   for (i=0; i <= max_sd; ++i)
   {
      if (FD_ISSET(i, &master_set))
         close(i);
   }
}

		6.2.2
```

## 6.3 epoll

### 6.3.1 Description

```text
epoll is a scalable event notification mechanism for Linux, first introduced in Linux 2.5.44 [1]. It is meant to replace the older POSIX select(2) and poll(2) system calls, to achieve better performance in more demanding applications, where the number of watched file descriptors is large (unlike the older system calls, which operate at O(n), epoll operates in O(1) [2]). epoll is similar to FreeBSD's kqueue, in that it operates on a configurable kernel object, exposed to user space as a file descriptor of its own.

 API

int epoll_create(int size);

Creates an epoll object and returns its file descriptor.

int epoll_ctl(int epfd, int op, int fd, struct epoll_event *event);

Controls (configures) which file descriptors are watched by this object, and for which events.

int epoll_wait(int epfd, struct epoll_event *events, int maxevents, int timeout);

Waits for any of the registered events, until at least one occurs or the timeout elapses.

 Triggering Modes

epoll provides both edge-triggered and level-triggered modes. In edge-triggered mode, a call to epoll_wait will return only when a new event is enqueued with the epoll object, while in level-triggered mode, epoll_wait will return as long as the condition withholds.

For instance, if a pipe, registered with epoll, has received data, a call to epoll_wait will return, signaling that the presence of data to read. Suppose the reader only consumed part of data from the buffer. In level-triggered mode, further calls to epoll_wait will return immediately, as long as the pipe's buffer contains data to be read. In edge-triggered mode, however, epoll_wait will return only once new data is written to the pipe.

 See also

    * libevent
```

### 6.3.2 Using epoll() For Asynchronous Network Programming

```text
General way to implement tcp servers is “one thread/process per connection”. But on high loads this approach can be not so efficient and we need to use another patterns of connection handling. In this article I will describe how to implement tcp-server with synchronous connections handling using epoll() system call of Linux 2.6. kernel.

epoll is a new system call introduced in Linux 2.6. It is designed to replace the deprecated select (and also poll). Unlike these earlier system calls, which are O(n), epoll is an O(1) algorithm – this means that it scales well as the number of watched file descriptors increase. select uses a linear search through the list of watched file descriptors, which causes its O(n) behaviour, whereas epoll uses callbacks in the kernel file structure.

Another fundamental difference of epoll is that it can be used in an edge-triggered, as opposed to level-triggered, fashion. This means that you receive “hints” when the kernel believes the file descriptor has become ready for I/O, as opposed to being told “I/O can be carried out on this file descriptor”. This has a couple of minor advantages: kernel space doesn’t need to keep track of the state of the file descriptor, although it might just push that problem into user space, and user space programs can be more flexible (e.g. the readiness change notification can just be ignored).

To use epoll method you need to make following steps in your application:

    * Create specific file descriptor for epoll calls:

        epfd = epoll_create(EPOLL_QUEUE_LEN);


      where EPOLL_QUEUE_LEN is the maximum number of connection descriptors you expect to manage at one time. The return value is a file descriptor that will be used in epoll calls later. This descriptor can be closed with close() when you do not longer need it.
    * After first step you can add your descriptors to epoll with following call:

        static struct epoll_event ev;
        int client_sock;
        ...
        ev.events = EPOLLIN | EPOLLPRI | EPOLLERR | EPOLLHUP;
        ev.data.fd = client_sock;
        int res = epoll_ctl(epfd, EPOLL_CTL_ADD, client_sock, &ev);


      where ev is epoll event configuration sctucture, EPOLL_CTL_ADD – predefined command constant to add sockets to epoll. Detailed description of epoll_ctl flags can be found in epoll_ctl(2) man page. When client_sock descriptor will be closed, it will be automatically deleted from epoll descriptor.
    * When all your descriptors will be added to epoll, your process can idle and wait to something to do with epoll’ed sockets:

        while (1) {
          // wait for something to do...
          int nfds = epoll_wait(epfd, events,
                                      MAX_EPOLL_EVENTS_PER_RUN,
                                      EPOLL_RUN_TIMEOUT);
          if (nfds < 0) die("Error in epoll_wait!");

          // for each ready socket
          for(int i = 0; i < nfds; i++) {
            int fd = events[i].data.fd;
            handle_io_on_socket(fd);
          }
        }

Typical architecture of your application (networking part) is described below. This architecture allow almost unlimited scalability of your application on single and multi-processor systems:

    * Listener – thread that performs bind() and listen() calls and waits for incoming conncetions. Then new connection arrives, this thread can do accept() on listening socket an send accepted connection socket to one of the I/O-workers.
    * I/O-Worker(s) – one or more threads to receive connections from listener and to add them to epoll. Main loop of the generic I/O-worker looks like last step of epoll using pattern described above.
    * Data Processing Worker(s) – one or more threads to receive data from and send data to I/O-workers and to perform data processing.

As you can see, epoll() API is very simple but believe me, it is very powerful. Linear scalability allows you to manage huge amounts of parallel connections with small amout of worker processes comparing to classical one-thread per connection.

		6.3.3
```

## 6.4 libevent

```text
libevent is an asynchronous event notification software library.

The libevent API provides a mechanism to execute a callback function when a specific event occurs on a file descriptor or after a timeout has been reached. Furthermore, libevent also supports callbacks due to signals or regular timeouts.

libevent is meant to replace the event loop found in event-driven network servers. An application just needs to call event_dispatch() and then add or remove events dynamically without having to change the event loop.

Currently, libevent supports /dev/poll, kqueue(2), select(2), poll(2), epoll(4) and Solaris's event ports. It also has experimental support for real-time signals. The internal event mechanism is completely independent of the exposed event API, and a simple update of libevent can provide new functionality without having to redesign the applications. As a result, libevent allows for portable application development and provides the most scalable event notification mechanism available on an operating system.

Using callbacks on signals, libevent makes it easy to write secure signal handlers as none of the user supplied signal handling code runs in the signal's context.
```

### 6.4.1 event-test.c

```text
/*
 * Compile with:
 * cc -I/usr/local/include -o event-test event-test.c -L/usr/local/lib -levent
 */

#include <sys/types.h>
#include <sys/stat.h>
#ifndef WIN32
#include <sys/queue.h>
#include <unistd.h>
#include <sys/time.h>
#else
#include <windows.h>
#endif
#include <fcntl.h>
#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <errno.h>

#include <event.h>

void
fifo_read(int fd, short event, void *arg)
{
	char buf[255];
	int len;
	struct event *ev = arg;
#ifdef WIN32
	DWORD dwBytesRead;
#endif

	/* Reschedule this event */
	event_add(ev, NULL);

	fprintf(stderr, "fifo_read called with fd: %d, event: %d, arg: %p\n",
		fd, event, arg);
#ifdef WIN32
	len = ReadFile((HANDLE)fd, buf, sizeof(buf) - 1, &dwBytesRead, NULL);

	// Check for end of file. 
	if(len && dwBytesRead == 0) {
		fprintf(stderr, "End Of File");
		event_del(ev);
		return;
	}

	buf[dwBytesRead + 1] = '\0';
#else
	len = read(fd, buf, sizeof(buf) - 1);

	if (len == -1) {
		perror("read");
		return;
	} else if (len == 0) {
		fprintf(stderr, "Connection closed\n");
		return;
	}

	buf[len] = '\0';
#endif
	fprintf(stdout, "Read: %s\n", buf);
}

int
main (int argc, char **argv)
{
	struct event evfifo;
#ifdef WIN32
	HANDLE socket;
	// Open a file. 
	socket = CreateFile("test.txt",     // open File 
			GENERIC_READ,                 // open for reading 
			0,                            // do not share 
			NULL,                         // no security 
			OPEN_EXISTING,                // existing file only 
			FILE_ATTRIBUTE_NORMAL,        // normal file 
			NULL);                        // no attr. template 

	if(socket == INVALID_HANDLE_VALUE)
		return 1;

#else
	struct stat st;
	char *fifo = "event.fifo";
	int socket;
 
	if (lstat (fifo, &st) == 0) {
		if ((st.st_mode & S_IFMT) == S_IFREG) {
			errno = EEXIST;
			perror("lstat");
			exit (1);
		}
	}

	unlink (fifo);
	if (mkfifo (fifo, 0600) == -1) {
		perror("mkfifo");
		exit (1);
	}

	/* Linux pipes are broken, we need O_RDWR instead of O_RDONLY */
#ifdef __linux
	socket = open (fifo, O_RDWR | O_NONBLOCK, 0);
#else
	socket = open (fifo, O_RDONLY | O_NONBLOCK, 0);
#endif

	if (socket == -1) {
		perror("open");
		exit (1);
	}

	fprintf(stderr, "Write data to %s\n", fifo);
#endif
	/* Initalize the event library */
	event_init();

	/* Initalize one event */
#ifdef WIN32
	event_set(&evfifo, (int)socket, EV_READ, fifo_read, &evfifo);
#else
	event_set(&evfifo, socket, EV_READ, fifo_read, &evfifo);
#endif

	/* Add it to the active events, without a timeout */
	event_add(&evfifo, NULL);
	
	event_dispatch();
#ifdef WIN32
	CloseHandle(socket);
#endif
	return (0);
}
```
