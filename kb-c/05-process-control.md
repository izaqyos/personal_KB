---
type: reference
title: Process control
description: "Process control in C: fork, exec and wait, from the YoLinux tutorial."
tags: [c, unix, legacy, tutorial, examples]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "c-kb#5"
---

# Process control

[↑ c-kb](/kb-c/README.md)

## 5.1 YoLinux Tutorial: Fork, Exec and Process control

```text
fork():

The fork() system call will spawn a new child process which is an identical process to the parent except that has a new system process ID. The process is copied in memory from the parent and a new process structure is assigned by the kernel. The return value of the function is which discriminates the two threads of execution. A zero is returned by the fork function in the child's process.

The environment, resource limits, umask, controlling terminal, current working directory, root directory, signal masks and other process resources are also duplicated from the parent in the forked child process.

Example:

    #include <iostream>
    #include <string>
     
    // Required by for routine
    #include <sys/types.h>
    #include <unistd.h>
     
    #include <stdlib.h>   // Declaration for exit()
     
    using namespace std;
     
    int globalVariable = 2;
     
    main()
    {
       string sIdentifier;
       int    iStackVariable = 20;
     
       pid_t pID = fork();
       if (pID == 0)                // child
       {
          // Code only executed by child process
     
          sIdentifier = "Child Process: ";
          globalVariable++;
          iStackVariable++;
        }
        else if (pID < 0)            // failed to fork
        {
            cerr << "Failed to fork" << endl;
            exit(1);
            // Throw exception
        }
        else                                   // parent
        {
          // Code only executed by parent process
     
          sIdentifier = "Parent Process:";
        }
     
        // Code executed by both parent and child.
       
        cout << sIdentifier;
        cout << " Global variable: " << globalVariable;
        cout << " Stack variable: "  << iStackVariable << endl;
    }

    Compile: g++ -o ForkTest ForkTest.cpp
    Run: ForkTest

    Parent Process: Global variable: 2 Stack variable: 20
    Child Process:  Global variable: 3 Stack variable: 21

[Potential Pitfall]: Some memory duplicated by a forked process such as file pointers, will cause intermixed output from both processes. Use the wait() function so that the processes do not access the file at the same time or open unique file descriptors. Some like stdout or stderr will be shared unless synchronized using wait() or some other mechanism. The file close on exit is another gotcha. A terminating process will close files before exiting. File locks set by the parent process are not inherited by the child process.

[Potential Pitfall]: Race conditions can be created due to the unpredictability of when the kernel scheduler runs portions or time slices of the process. One can use wait(). the use of sleep() does not guarentee reliability of execution on a heavily loaded system as the scheduler behavior is not predictable by the application.

Note on exit() vs _exit(): The C library function exit() calls the kernel system call _exit() internally. The kernel system call _exit() will cause the kernel to close descriptors, free memory, and perform the kernel terminating process clean-up. The C library function exit() call will flush I/O buffers and perform aditional clean-up before calling _exit() internally. The function exit(status) causes the executable to return "status" as the return code for main(). When exit(status) is called by a child process, it allows the parent process to examine the terminating status of the child (if it terminates first). Without this call (or a call from main() to return()) and specifying the status argument, the process will not return a value.

    #include <stdlib.h>

    void exit(int status);
                    

    	

    #include <unistd.h>

    void _exit(int status);
                    

Man Pages:

    * fork - create a child process

vfork():

The vfork() function is the same as fork() except that it does not make a copy of the address space. The memory is shared reducing the overhead of spawning a new process with a unique copy of all the memory. This is typically used when using fork() to exec() a process and terminate. The vfork() function also executes the child process first and resumes the parent process when the child terminates.

    #include <iostream>
    #include <string>
     
    // Required by for routine
    #include <sys/types.h>
    #include <unistd.h>
     
    using namespace std;
     
     
    int globalVariable = 2;
     
    main()
    {
       string sIdentifier;
       int    iStackVariable = 20;
     
       pid_t pID = vfork();
       if (pID == 0)                // child
       {
          // Code only executed by child process
     
          sIdentifier = "Child Process: ";
          globalVariable++;
          iStackVariable++;
          cout << sIdentifier;
          cout << " Global variable: " << globalVariable;
          cout << " Stack variable: "  << iStackVariable << endl;
          _exit(0);
        }
        else if (pID < 0)            // failed to fork
        {
            cerr << "Failed to fork" << endl;
            exit(1);
            // Throw exception
        }
        else                                   // parent
        {
          // Code only executed by parent process
     
          sIdentifier = "Parent Process:";
        }
     
        // executed only by parent
     
        cout << sIdentifier;
        cout << " Global variable: " << globalVariable;
        cout << " Stack variable: "  << iStackVariable << endl;
        exit(0);
    }

    Compile: g++ -o VForkTest VForkTest.cpp
    Run: VForkTest

    Child Process:  Global variable: 3 Stack variable: 21
    Parent Process: Global variable: 3 Stack variable: 21
                    

Note: The child process executed first, updated the variables which are shared between the processes and NOT unique, and then the parent process executes using variables which the child has updated.

[Potential Pitfall]: A deadlock condition may occur if the child process does not terminate, the parent process will not proceed.

Man Pages:

    * vfork - create a child process and block parent
    * _exit - - terminate the current process

clone():

The function clone() creates a new child process which shares memory, file descriptors and signal handlers with the parent. It implements threads and thus launches a function as a child. The child terminates when the parent terminates.
See the YoLinux POSIX threads tutorial

Man Pages:

    * clone - create a child process

wait():

The parent process will often want to wait until all child processes have been completed. this can be implemented with the wait() function call.

wait(): Blocks calling process until the child process terminates. If child process has already teminated, the wait() call returns immediately. if the calling process has multiple child processes, the function returns when one returns.

waitpid(): Options available to block calling process for a particular child process not the first one.

    Code snipet:
    #include <sys/wait.h>
     
    ...
     
          pid_t pID = <i>set to child process id with call to fork OR:</i>
                      // If set <-1, wait for any child process whose process group ID = abs(pID)
                      // If = -1, wait  for  any child process. Same as wait().
                      // If =  0, wait for any child process whose process group ID is same as calling process.
                      // If >  0, wait for the child whose process ID = pID.
     
    ...
          int childExitStatus;
     
          pid_t ws = waitpid( pID, &childExitStatus, WNOHANG);
     
          if( WIFEXITED(childExitStatus) )
          {
             // Child process exited thus exec failed.
             // LOG failure of exec in child process.
             cout << "Result of waitpid: Child process exited thus exec failed." << endl;
          }
    OR
    ...
    int childExitStatus;
     
    pid_t ws = waitpid( pID, &childExitStatus, 0);
     
    if( !WIFEXITED(childExitStatus) )
    {
       cerr << "waitpid() exited with an error: Status= "
            << WEXITSTATUS(childExitStatus)
            << endl;
    }
    else if( WIFSIGNALED(childExitStatus) )
    {
       cerr << "waitpid() exited due to a signal: "
            << WTERMSIG(childExitStatus)
            << endl;
    }

Notes:

    * See man page for options: WNOHANG, WUNTRACED.
    * See man page for return macros: WIFEXITED(), WEXITSTATUS(), WIFSIGNALED(), WTERMSIG(), WIFSTOPPED(), WSTOPSIG().
    * See man page for errors: ECHILD, EINVAL, EINTR. (Also see sample of error processing below.)

Man Pages:

    * wait / waitpid - wait for process termination

Set system group ID and process ID:

Avoids orphaned process group when parent terminates. When parent dies, this will be a zombie. (No parent process. Parent=1) Instead, create a new process group for the child. Later process the group is terminated to stop all spawned processes. Thus all subsequent processes should be of this group if they are to be terminated by the process group id. Process group leader has the same process id and group process id. If not changed then the process group is that of the parent. Set the process group id to that of the child process.

    #include <sys/types.h>
    #include <unistd.h>
     
    #ifdef __gnu_linux__
          pid_t pgid = setpgid(child_pID, child_pID);
    #endif
     
          ...
          ...
     
          if( pgid < 0)
          {
            cout << "Failed to set process group ID" << endl;
            _exit(0);      // If exec fails then exit forked process.
          }
    Use the setgid call to set the group id of the current process. Requires root access.

    The macro testing for __gnu_linux__ is for cross platform support as man other OS's use a different system call.

Man Pages:

    * setpgid/getpgid setpgrp/getpgrp - set process group
    * setsid - creates a session and sets the process group ID
    * getuid/geteuid - get user identity
    * setgid - set group identity
    * getgid/getegid - get group (real/effective) identity
    * setreuid/setregid - set real user or group identity

Kill all processes in a process group:
This is the real reason to set up a process group. One may kill all the processes in the process group without having to keep track of how many processes have been forked and all of their process id's.

See /usr/include/bits/signum.h for list of signals.

    ...
     
    int  killReturn = killpg( pID, SIGKILL);  // Kill child process group
     
    if( killReturn == ESRCH)      // pid does not exist
    {
       cout << "Group does not exist!" << endl;
    }
    else if( killReturn == EPERM) // No permission to send signal
    {
       cout << "No permission to send signal!" << endl;
    }
    else
       cout << "Signal sent. All Ok!" << endl;
     
    ...

Man Pages:

    * killpg - send signal to a process group
    * kill - send signal to a process
    * signal (2) - ANSI C signal handling
    * signal (7) - List of available signals
    * sigaction - POSIX signal handling functions.
    * pause (2) - wait for signal
    * raise (3) - send a signal to a current process

system() and popen():

The system() call will execute an OS shell command as described by a character command string. This function is implemented using fork(), exec() and waitpid(). The command string is executed by calling /bin/sh -c command-string. During execution of the command, SIGCHLD will be blocked, and SIGINT and SIGQUIT will be ignored. The call "blocks" and waits for the task to be performed before continuing.

    #include <stdio.h>
    #include <stdlib.h>
    main()
    {
        system("ls -l");
        printf("Command done!");
    }
    The statement "Command done!" will not print untill the "ls -l" command has completed. 

The popen() call opens a process by creating a pipe, forking, and invoking the shell (bourne shell on Linux). The advantage to using popen() is that it will allow one to interrogate the results of the command issued.

This example opens a pipe which executes the shell command "ls -l". The results are read and printed out.

    #include <stdio.h>
    main()
    {
       FILE *fpipe;
       char *command="ls -l";
       char line[256];
     
       if ( !(fpipe = (FILE*)popen(command,"r")) )
       {  // If fpipe is NULL
          perror("Problems with pipe");
          exit(1);
       }
     
       while ( fgets( line, sizeof line, fpipe))
       {
         printf("%s", line);
       }
       pclose(fpipe);
    }

The second argument to popen:

    * r: Read from stdin (command results)
    * w: write to stdout (command)
    * For stderr: command="ls -l 2>&1","w");

Man Pages:

    * system - execute a shell command
    * popen - process I/O

exec() functions and execve():

The exec() family of functions will initiate a program from within a program. They are also various front-end functions to execve().

The functions return an integer error code. (0=Ok/-1=Fail).

execl() and execlp():
The function call "execl()" initiates a new program in the same environment in which it is operating. An executable (with fully qualified path. i.e. /bin/ls) and arguments are passed to the function. Note that "arg0" is the command/file name to execute.

int execl(const char *path, const char *arg0, const char *arg1, const char *arg2, ... const char *argn, (char *) 0);

    #include <unistd.h>
    main()
    {
       execl("/bin/ls", "/bin/ls", "-r", "-t", "-l", (char *) 0);
    }
    Where all function arguments are null terminated strings. The list of arguments is terminated by NULL. 

The routine execlp() will perform the same purpose except that it will use environment variable PATH to determine which executable to process. Thus a fully qualified path name would not have to be used. The first argument to the function could instead be "ls". The function execlp() can also take the fully qualified name as it also resolves explicitly.

Man Pages:

    * execl / execlp - execute

execv() and execvp():
This is the same as execl() except that the arguments are passed as null terminated array of pointers to char. The first element "argv[0]" is the command name.

int execv(const char *path, char *const argv[]);

    #include <unistd.h>
    main()
    {
       char *args[] = {"/bin/ls", "-r", "-t", "-l", (char *) 0 };
     
       execv("/bin/ls", args);
    }

The routine execvp() will perform the same purpose except that it will use environment variable PATH to determine which executable to process. Thus a fully qualified path name would not have to be used. The first argument to the function could instead be "ls". The function execvp() can also take the fully qualified name as it also resolves explicitly.

Man Pages:

    * execv / execvp - execute

execve():
The function call "execve()" executes a process in an environment which it assigns.

Set the environment variables:

Assignment:

       char *env[] = { "USER=user1", "PATH=/usr/bin:/bin:/opt/bin", (char *) 0 };
                    


OR

Read from file:

    #include <iostream>
    #include <fstream>
    #include <string>
    #include <vector>
     
    // Required by for routine
    #include <sys/types.h>
    #include <unistd.h>
     
    using namespace std;
     
    //   Class definition:
     
    class CReadEnvironmentVariablesFile
    {
     public:
        CReadEnvironmentVariablesFile() { m_NumberOfEnvironmentVariables=0; };
       ~CReadEnvironmentVariablesFile();
        char **ReadFile(string& envFile);
     private:
        int m_NumberOfEnvironmentVariables;
        char **m_envp;
    };
     
    //   Read environment variables:
     
    char **
    CReadEnvironmentVariablesFile::ReadFile(string& envFile)
    {
       int ii;
       string tmpStr;
       vector<string> vEnvironmentVariables;
     
       if( envFile.empty() ) return 0;
     
       ifstream inputFile( envFile.c_str(), ios::in);
       if( !inputFile )
       {
           cerr << "Could not open config file: " << envFile << endl;
           return 0;
       }
     
       while( !inputFile.eof() )
       {
           getline(inputFile, tmpStr);
           if( !tmpStr.empty() ) vEnvironmentVariables.push_back(tmpStr);
       }
     
       inputFile.close();
     
       m_NumberOfEnvironmentVariables = vEnvironmentVariables.size();
     
       // ---------------------------------------
       // Generate envp environment variable list
       // ---------------------------------------
     
       // Allocate pointers to strings.
       // +1 for array terminating NULL string
     
       m_envp = new char * [m_NumberOfEnvironmentVariables + 1];
     
       // Allocate arrays of character strings.
        
       for(ii=0; ii < m_NumberOfEnvironmentVariables; ii++)
       {
          // Character string terminated with a NULL character.
          m_envp[ii] = new char [vEnvironmentVariables[ii].size()+1];
          strcpy( m_envp[ii], vEnvironmentVariables[ii].c_str());
       }
     
       // must terminate array with null string
       m_envp[ii] = (char*) 0;
     
       return m_envp;
    }
     
    //   Free memory:
     
    CReadEnvironmentVariablesFile::~CReadEnvironmentVariablesFile()
    {
       int ii;
     
       // Free array's of characters
       for(ii=0; ii < m_NumberOfEnvironmentVariables; ii++)
       {
          delete [] m_envp[ii];
       }
     
       // Free array of pointers.
       delete [] m_envp;
    }

Call execve:

    string getErrMsg(int errnum);
     
    main()
    {
       string envFile("environment_variables.conf");
       CReadEnvironmentVariablesFile readEnvFile;
       char **Env_envp = readEnvFile.ReadFile(envFile);
     
       // Command to execute
       char *Env_argv[] = { "/bin/ls", "-l", "-a", (char *) 0 };
     
       pid_t pID = fork();
       if (pID == 0)                // child
       {
          // This version of exec accepts environment variables.
          // Function call does not return on success.
     
          int execReturn = execve (Env_argv[0], Env_argv, Env_envp);
     
          cout << "Failure! execve error code=" << execReturn << endl;
     
          cout << getErrMsg(execReturn) << endl;
     
          _exit(0); // If exec fails then exit forked process.
       }
       else if (pID < 0)             // failed to fork
       {
          cerr << "Failed to fork" << endl;
       }
       else                             // parent
       {
          cout << "Parent Process" << endl;
       }
    }

Handle errors:

    string getErrMsg(int errnum)
    {
     
        switch ( errnum ) {
     
    #ifdef EACCES
            case EACCES :
            {
                return "EACCES Permission denied";
            }
    #endif
     
    #ifdef EPERM
            case EPERM :
            {
                return "EPERM Not super-user";
            }
    #endif
     
    #ifdef E2BIG
            case E2BIG :
            {
                return "E2BIG Arg list too long";
            }
    #endif
     
    #ifdef ENOEXEC
            case ENOEXEC :
            {
                return "ENOEXEC Exec format error";
            }
    #endif
     
    #ifdef EFAULT
            case EFAULT :
            {
                return "EFAULT Bad address";
            }
    #endif
     
    #ifdef ENAMETOOLONG
            case ENAMETOOLONG :
            {
                return "ENAMETOOLONG path name is too long     ";
            }
    #endif
     
    #ifdef ENOENT
            case ENOENT :
            {
                return "ENOENT No such file or directory";
            }
    #endif
     
    #ifdef ENOMEM
            case ENOMEM :
            {
                return "ENOMEM Not enough core";
            }
    #endif
     
    #ifdef ENOTDIR
            case ENOTDIR :
            {
                return "ENOTDIR Not a directory";
            }
    #endif
     
    #ifdef ELOOP
            case ELOOP :
            {
                return "ELOOP Too many symbolic links";
            }
    #endif
     
    #ifdef ETXTBSY
            case ETXTBSY :
            {
                return "ETXTBSY Text file busy";
            }
    #endif
     
    #ifdef EIO
            case EIO :
            {
                return "EIO I/O error";
            }
    #endif
     
    #ifdef ENFILE
            case ENFILE :
            {
                return "ENFILE Too many open files in system";
            }
    #endif
     
    #ifdef EINVAL
            case EINVAL :
            {
                return "EINVAL Invalid argument";
            }
    #endif
     
    #ifdef EISDIR
            case EISDIR :
            {
                return "EISDIR Is a directory";
            }
    #endif
     
    #ifdef ELIBBAD
            case ELIBBAD :
            {
                return "ELIBBAD Accessing a corrupted shared lib";
            }
    #endif
             
            default :
            {
                std::string errorMsg(strerror(errnum));
                if ( errnum ) return errorMsg;
            }
         }
    }

Man Pages:

    * strerror / strerror_r - return string describing error code
    * errno - number of last error
    * perror - print a system error message

Data File: environment_variables.conf

    PATH=/usr/bin:/bin
    MANPATH=/opt/man
    LANG=C
    DISPLAY=:0.0

Man Pages:

    * execve - execute with given environment

Note: Don't mix malloc() and new. Choose one form of memory allocation and stick with it.

Malloc:

    ..
    ...
     
       int ii;
     
       m_envp = (char **) calloc((m_NumberOfEnvironmentVariables+1), sizeof(char **));
     
    ...
       // Allocate arrays of character strings.
       int ii;
       for(ii=0; ii < NumberOfEnvironmentVariables; ii++)
       {
          // NULL terminated
          m_envp[ii] = (char *) malloc(vEnvironmentVariables[ii].size()+1);
          strcpy( m_envp[ii], vEnvironmentVariables[ii].c_str());
       }
     
       // must terminate with null
       m_envp[ii] = (char*) 0;
     
       return m_envp;
    }
    ...

Free:

    ...
     
    // Free array's of characters
     
    for(ii=0; ii < m_NumberOfEnvironmentVariables; ii++)
    {
       free(m_envp[ii]);
    }
     
    // Free array of pointers.
     
    free(m_envp);
     
    ...
```

## 5.2 WAIT(2) Linux Programmer's Manual

```text
NAME
       wait, waitpid, waitid - wait for process to change state

SYNOPSIS
       #include <sys/types.h>
       #include <sys/wait.h>

       pid_t wait(int *status);

       pid_t waitpid(pid_t pid, int *status, int options);

       int waitid(idtype_t idtype, id_t id, siginfo_t *infop, int options);

   Feature Test Macro Requirements for glibc (see feature_test_macros(7)):

       waitid(): _SVID_SOURCE || _XOPEN_SOURCE

DESCRIPTION
       All of these system calls are used to wait for state changes in a child
       of the calling process, and obtain information about  the  child  whose
       state  has changed.  A state change is considered to be: the child ter-
       minated; the child was stopped by a signal; or the child was resumed by
       a  signal.  In the case of a terminated child, performing a wait allows
       the system to release the resources associated with  the  child;  if  a
       wait  is not performed, then terminated the child remains in a "zombie"
       state (see NOTES below).

       If a child has already changed state, then these calls  return  immedi-
       ately.	Otherwise  they  block until either a child changes state or a
       signal handler interrupts the call (assuming that system calls are  not
       automatically restarted using the SA_RESTART flag of sigaction(2)).  In
       the remainder of this page, a child whose state has changed  and  which
       has  not  yet  been  waited upon by one of these system calls is termed
       waitable.

   wait() and waitpid()
       The wait() system call suspends execution of the calling process  until
       one  of	its children terminates.  The call wait(&status) is equivalent
       to:

	   waitpid(-1, &status, 0);

       The waitpid() system call suspends execution  of  the  calling  process
       until a child specified by pid argument has changed state.  By default,
       waitpid() waits only for terminated children, but this behavior is mod-
       ifiable via the options argument, as described below.

       The value of pid can be:

       < -1   meaning  wait  for  any  child process whose process group ID is
	      equal to the absolute value of pid.

       -1     meaning wait for any child process.

       0      meaning wait for any child process whose	process  group	ID  is
	      equal to that of the calling process.

       > 0    meaning  wait  for  the  child  whose process ID is equal to the
	      value of pid.

       The value of options is an OR of zero or more  of  the  following  con-
       stants:

       WNOHANG	   return immediately if no child has exited.

       WUNTRACED   also  return  if  a	child  has stopped (but not traced via
		   ptrace(2)).	Status for traced children which have  stopped
		   is provided even if this option is not specified.

       WCONTINUED  (Since  Linux  2.6.10)  also  return if a stopped child has
		   been resumed by delivery of SIGCONT.

       (For Linux-only options, see below.)

       The  WUNTRACED  and  WCONTINUED	options  are  only  effective  if  the
       SA_NOCLDSTOP  flag  has not been set for the SIGCHLD signal (see sigac-
       tion(2)).

       If status is not NULL, wait() and waitpid() store status information in
       the  int  to  which  it points.	This integer can be inspected with the
       following macros (which take the integer itself as an argument,	not  a
       pointer to it, as is done in wait() and waitpid()!):

       WIFEXITED(status)
	      returns true if the child terminated normally, that is, by call-
	      ing exit(3) or _exit(2), or by returning from main().

       WEXITSTATUS(status)
	      returns the exit status of the  child.   This  consists  of  the
	      least  significant  8 bits of the status argument that the child
	      specified in a call to exit(3) or _exit(2) or  as  the  argument
	      for  a  return  statement  in main().  This macro should only be
	      employed if WIFEXITED returned true.

       WIFSIGNALED(status)
	      returns true if the child process was terminated by a signal.

       WTERMSIG(status)
	      returns the number of the signal that caused the	child  process
	      to terminate.  This macro should only be employed if WIFSIGNALED
	      returned true.

       WCOREDUMP(status)
	      returns true if the child produced  a  core  dump.   This  macro
	      should  only  be	employed  if  WIFSIGNALED returned true.  This
	      macro is not specified in POSIX.1-2001 and is not  available  on
	      some  Unix  implementations  (e.g.,  AIX, SunOS).  Only use this
	      enclosed in #ifdef WCOREDUMP ... #endif.

       WIFSTOPPED(status)
	      returns true if the child process was stopped by delivery  of  a
	      signal;  this  is  only possible if the call was done using WUN-
	      TRACED or when the child is being traced (see ptrace(2)).

       WSTOPSIG(status)
	      returns the number of the signal which caused the child to stop.
	      This  macro should only be employed if WIFSTOPPED returned true.

       WIFCONTINUED(status)
	      (Since Linux 2.6.10) returns  true  if  the  child  process  was
	      resumed by delivery of SIGCONT.

   waitid()
       The  waitid()  system  call (available since Linux 2.6.9) provides more
       precise control over which child state changes to wait for.

       The idtype and id arguments select the child(ren) to wait for, as  fol-
       lows:

       idtype == P_PID
	      Wait for the child whose process ID matches id.

       idtype == P_PGID
	      Wait for any child whose process group ID matches id.

       idtype == P_ALL
	      Wait for any child; id is ignored.

       The  child state changes to wait for are specified by ORing one or more
       of the following flags in options:

       WEXITED	   Wait for children that have terminated.

       WSTOPPED    Wait for children that have been stopped by delivery  of  a
		   signal.

       WCONTINUED  Wait  for  (previously  stopped)  children  that  have been
		   resumed by delivery of SIGCONT.

       The following flags may additionally be ORed in options:

       WNOHANG	   As for waitpid().

       WNOWAIT	   Leave the child in a waitable state; a later wait call  can
		   be used to again retrieve the child status information.

       Upon  successful  return, waitid() fills in the following fields of the
       siginfo_t structure pointed to by infop:

       si_pid	   The process ID of the child.

       si_uid	   The real user ID of the child.  (This field is not  set  on
		   most other implementations.)

       si_signo    Always set to SIGCHLD.

       si_status   Either  the	exit status of the child, as given to _exit(2)
		   (or exit(3)), or the signal that caused the child to termi-
		   nate,  stop, or continue.  The si_code field can be used to
		   determine how to interpret this field.

       si_code	   Set	to  one  of:  CLD_EXITED  (child   called   _exit(2));
		   CLD_KILLED  (child  killed  by  signal); CLD_STOPPED (child
		   stopped by signal); or CLD_CONTINUED  (child  continued  by
		   SIGCONT).

       If  WNOHANG  was  specified  in options and there were no children in a
       waitable state, then waitid() returns 0 immediately and	the  state  of
       the siginfo_t structure pointed to by infop is unspecified.  To distin-
       guish this case from that where a child was in a waitable  state,  zero
       out  the  si_pid field before the call and check for a nonzero value in
       this field after the call returns.

RETURN VALUE
       wait(): on success, returns the process ID of the terminated child;  on
       error, -1 is returned.

       waitpid():  on success, returns the process ID of the child whose state
       has changed; if WNOHANG was specified and one or more child(ren) speci-
       fied  by pid exist, but have not yet changed state, then 0 is returned.
       On error, -1 is returned.

       waitid(): returns 0 on success or  if  WNOHANG  was  specified  and  no
       child(ren)  specified  by  id  has  yet	changed state; on error, -1 is
       returned.

       Each of these calls sets errno to an appropriate value in the  case  of
       an error.

ERRORS
       ECHILD (for  wait()) The calling process does not have any unwaited-for
	      children.

       ECHILD (for waitpid() or waitid()) The process specified by pid	(wait-
	      pid())  or  idtype  and id (waitid()) does not exist or is not a
	      child of the calling process.  (This can happen  for  one's  own
	      child if the action for SIGCHLD is set to SIG_IGN.  See also the
	      Linux Notes section about threads.)

       EINTR  WNOHANG was not set and an unblocked signal  or  a  SIGCHLD  was
	      caught.

       EINVAL The options argument was invalid.

CONFORMING TO
       SVr4, 4.3BSD, POSIX.1-2001.

NOTES
       A  child  that  terminates, but has not been waited for becomes a "zom-
       bie".  The kernel maintains a minimal set of information about the zom-
       bie  process  (PID,  termination status, resource usage information) in
       order to allow the parent to later perform a wait to obtain information
       about  the  child.   As long as a zombie is not removed from the system
       via a wait, it will consume a slot in the kernel process table, and  if
       this  table fills, it will not be possible to create further processes.
       If a parent process terminates, then its "zombie" children (if any) are
       adopted	by  init(8), which automatically performs a wait to remove the
       zombies.

       POSIX.1-2001 specifies that if the disposition of  SIGCHLD  is  set  to
       SIG_IGN or the SA_NOCLDWAIT flag is set for SIGCHLD (see sigaction(2)),
       then children that terminate do not become zombies and a call to wait()
       or  waitpid()  will  block until all children have terminated, and then
       fail with errno set to ECHILD.  (The original POSIX standard  left  the
       behavior  of  setting  SIGCHLD to SIG_IGN unspecified.)	Linux 2.6 con-
       forms to this specification.  However, Linux  2.4  (and	earlier)  does
       not:  if  a  wait()  or	waitpid()  call is made while SIGCHLD is being
       ignored, the call  behaves  just  as  though  SIGCHLD  were  not  being
       ignored,  that  is, the call blocks until the next child terminates and
       then returns the process ID and status of that child.

   Linux Notes
       In the Linux kernel, a kernel-scheduled thread is not a	distinct  con-
       struct  from  a process.  Instead, a thread is simply a process that is
       created using the Linux-unique clone(2)	system	call;  other  routines
       such  as  the  portable	pthread_create(3)  call  are implemented using
       clone(2).  Before Linux 2.4, a thread was just a special case of a pro-
       cess, and as a consequence one thread could not wait on the children of
       another thread, even when the latter belongs to the same thread	group.
       However,  POSIX	prescribes  such  functionality, and since Linux 2.4 a
       thread can, and by default will, wait on children of other  threads  in
       the same thread group.

       The  following Linux-specific options are for use with children created
       using clone(2); they cannot be used with waitid():

       __WCLONE
	      Wait for "clone" children only.  If omitted then wait for  "non-
	      clone" children only.  (A "clone" child is one which delivers no
	      signal, or a signal  other  than	SIGCHLD  to  its  parent  upon
	      termination.)   This  option is ignored if __WALL is also speci-
	      fied.

       __WALL (Since Linux 2.4) Wait for  all  children,  regardless  of  type
	      ("clone" or "non-clone").

       __WNOTHREAD
	      (Since  Linux  2.4) Do not wait for children of other threads in
	      the same thread group.  This was the default before Linux 2.4.

EXAMPLE
       The following program demonstrates the use of  fork(2)  and  waitpid().
       The  program  creates  a child process.	If no command-line argument is
       supplied to the program, then the child suspends  its  execution  using
       pause(2),  to  allow the user to send signals to the child.  Otherwise,
       if a command-line argument is supplied, then the  child	exits  immedi-
       ately,  using the integer supplied on the command line as the exit sta-
       tus.  The parent process executes a loop that monitors the child  using
       waitpid(), and uses the W*() macros described above to analyze the wait
       status value.

       The following shell session demonstrates the use of the program:

       $ ./a.out &
       Child PID is 32360
       [1] 32359
       $ kill -STOP 32360
       stopped by signal 19
       $ kill -CONT 32360
       continued
       $ kill -TERM 32360
       killed by signal 15
       [1]+  Done		     ./a.out
       $

       #include <sys/wait.h>
       #include <stdlib.h>
       #include <unistd.h>
       #include <stdio.h>

       int
       main(int argc, char *argv[])
       {
	   pid_t cpid, w;
	   int status;

	   cpid = fork();
	   if (cpid == -1) {
	       perror("fork");
	       exit(EXIT_FAILURE);
	   }

	   if (cpid == 0) {	       /* Code executed by child */
	       printf("Child PID is %ld\n", (long) getpid());
	       if (argc == 1)
		   pause();		       /* Wait for signals */
	       _exit(atoi(argv[1]));

	   } else {		       /* Code executed by parent */
	       do {
		   w = waitpid(cpid, &status, WUNTRACED | WCONTINUED);
		   if (w == -1) {
		       perror("waitpid");
		       exit(EXIT_FAILURE);
		   }

		   if (WIFEXITED(status)) {
		       printf("exited, status=%d\n", WEXITSTATUS(status));
		   } else if (WIFSIGNALED(status)) {
		       printf("killed by signal %d\n", WTERMSIG(status));
		   } else if (WIFSTOPPED(status)) {
		       printf("stopped by signal %d\n", WSTOPSIG(status));
		   } else if (WIFCONTINUED(status)) {
		       printf("continued\n");
		   }
	       } while (!WIFEXITED(status) && !WIFSIGNALED(status));
	       exit(EXIT_SUCCESS);
	   }
       }

SEE ALSO
       _exit(2), clone(2), fork(2),  kill(2),  ptrace(2),  sigaction(2),  sig-
       nal(2), wait4(2), pthread_create(3), credentials(7), signal(7)

COLOPHON
       This  page  is  part of release 2.77 of the Linux man-pages project.  A
       description of the project, and information about reporting  bugs,  can
       be found at http://www.kernel.org/doc/man-pages/.
```
