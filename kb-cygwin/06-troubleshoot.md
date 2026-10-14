---
type: reference
title: Troubleshoot
description: "Cygwin troubleshooting, e.g. gvim problems on Windows 7."
tags: [cygwin, windows, vim, troubleshooting, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-cygwin#6"
---

# Troubleshoot

[↑ kb-cygwin](/kb-cygwin/README.md)

## 6.1 Cygwin+Windows 7+gvim woes

```text
Yosi Izaq to vim_use
Hi,

I've upgrade from XP to windows 7 and now gvim launched from Cygwin
spews errors on startup.
Sometime gvim would load but at other times it would fail that.
An example of the errors:

0 [main] gvim 7404 exception::handle: Exception:
STATUS_ACCESS_VIOLATION
  4374 [main] gvim 7404 open_stackdumpfile: Dumping stack trace to
gvim.exe.stackdump
ShowFunc exting.  (Cleaning up functions)
Error detected while processing /home/<user>/.vim/plugin/ShowFunc.vim:
line  450:
E130: Unknown function: s:ShowFuncFoldText      0 [main] gvim 7980
exception::handle: Exception: STATUS_ACCESS_VIOLATION
  1695 [main] gvim 7980 open_stackdumpfile: Dumping stack trace to
gvim.exe.stackdump

     0 [main] gvim 7096 C:\cygwin\bin\gvim.exe: *** fatal error -
unable to remap \\?\C:\cygwin\lib\gtk-2.0\2.10.0\loaders
\cygpixbufloader-xpm.dll to same address as parent: 0x970000 !=
0xB50000
Stack trace:
Frame     Function  Args
0028B678  6102749B  (0028B678, 00000000, 00000000, 00000000)
0028B968  6102749B  (61177B80, 00008000, 00000000, 61179977)
0028C998  61004AFB  (611A136C, 612441C4, 00970000, 00B50000)
End of stack trace
     0 [main] gvim 4532 fork: child 7096 - died waiting for dll
loading, errno 11

In addition even when gvim does load the '!' doesn't work and gives a
"fail to fork" error.
I did some searching on the web and it looks likes many suspect a bug
in the Mcafee antivirus. I even tried some suggestions like excluding /
cygwin/bin from access scanning but it didn't really help.

Has anyone faced a similar issue?- I'd appreciate any information on
the matter.

TIA,
Yosi
---------------------------------------------------------------------------------
Bryan Hunt to me, vim_use

I hate this error, I used to get it before I did the smart thing and
dumped cygwin.

Cygwin does some wierd stuff with Dll's, I don't know exactly what and
I'm not entirely interested either.

The cure for your problem is to run ash ( a minimal shell that ships with
cygwin ) from the windows command prompt ( not from within Cygwin or an
xterm ).

Enter the following command.

/bin/rebaseall

You might need to reboot, it's windows after all.

I found that I was repeating this process once twice or thrice a month.

Here's more on the subject:

http://www.google.co.uk/search?q=cygwin+rebase+ash

Regards,

Bryan Hunt

---------------------------------------------------------------------------------
yosi izaq 
show details Jan 5 (1 day ago)
http://www.tishler.net/jason/software/rebase/rebase-2.4.2.README

---------------------------------------------------------------------------------
S. Cowles to vim_use
show details 9:04 AM (2 hours ago)
On Tue, 4 Jan 2011, Yosi Izaq wrote:

Date: Tue, 4 Jan 2011 02:04:43 -0800 (PST)
From: Yosi Izaq <izaqyos@gmail.com>
Reply-To: vim_use@googlegroups.com
To: vim_use <vim_use@googlegroups.com>
Subject: Cygwin+Windows 7+gvim woes
- Show quoted text -


i have found this problem with almost every project i build from source in win7 under cygwin.  the fix is rather straightforward, and is a cygwin issue, not a vim issue:  it is necessary to "rebase" all applications, libraries, and dll's in cygwin.

the simple cookbook is:

| 1.  do a shutdown of all cygwin services and apps.
| (http://www.heikkitoivonen.net/blog/2008/11/26/cygwin-upgrades-and-rebaseall/)
| for example:
| 
|        cygrunsrv --stop cron
|        cygrunsrv --stop exim
|        cygrunsrv --stop mountd
|        cygrunsrv --stop nfsd
|        cygrunsrv --stop portmap
|        cygrunsrv --stop sshd
|        cygrunsrv --stop cygserver
| 
| 2.  initiate a cmd session
| 3.  cd \cygwin\bin
| 4.  .\ash.exe
| 5.  PATH=/bin
| 6.  find /usr/local -name '*.dll' -o -name '*.so' > /tmp/lst
| 7.  rebaseall -v -T /tmp/lst

-- 
You received this message from the "vim_use" maillist.
Do not top-post! Type your reply below the text you are replying to.
For more information, visit http://www.vim.org/maillist.php

---------------------------------------------------------------------------------
yosi izaq to vim_use
|    S. Cowles: 
|    i have found this problem with almost every project i build from source in win7 under cygwin.  the fix is rather straightforward, and is a cygwin issue, not a vim issue:  it is necessary to "rebase" all applications, libraries, and dll's in cygwin.
|    
|    the simple cookbook is:
|    
|    1.  do a shutdown of all cygwin services and apps.
|    (http://www.heikkitoivonen.net/blog/2008/11/26/cygwin-upgrades-and-rebaseall/)
|    for example:
|    
|           cygrunsrv --stop cron
|           cygrunsrv --stop exim
|           cygrunsrv --stop mountd
|           cygrunsrv --stop nfsd
|           cygrunsrv --stop portmap
|           cygrunsrv --stop sshd
|           cygrunsrv --stop cygserver
|    
|    2.  initiate a cmd session
|    3.  cd \cygwin\bin
|    4.  .\ash.exe
|    5.  PATH=/bin
|    6.  find /usr/local -name '*.dll' -o -name '*.so' > /tmp/lst
|    7.  rebaseall -v -T /tmp/lst

Thank you and Bryan as well. Your suggestions solved the issue and I also read the related Cygwin article to better understand what the fuss is all about. The cookbook solution is especially effective. 

I have 2 follow-up questions if you may:
| 1. Should I repeat the rebase each time I upgrade a give cygwin lib or util?
| 2. Do you happen to know when will Cygwin include the rebase so that it's no longer required to perform this manually?

Thanks!
Yosi
---------------------------------------------------------------------------------

 
	6.2 C++ dev

	    6.2.1 Getting cout not found and loads of link errors on ostream
reason gcc doesn't link w/ standard lib. use g++ instead

see:
Compile the program with:

g++ -Wall -Wextra -Werror -c main.cpp -o main.o
     ^^^^^^^^^^^^^^^^^^^^ <- For listing all warnings when your code is compiled.
as cout is present in the C++ standard library, which would need explicit linking with -lstdc++ when using gcc; g++ links the standard library by default.

With gcc, (g++ should be preferred over gcc)

gcc main.cpp -lstdc++ -o main.o


	6.3

7. VIM

    7.1 setup
Basically copy from windows vim $VIMRUNTIME to cygwin

 86  ls /usr/share/vim/vim80/
   87  cd /usr/share/vim/vim80/
   90  cp -r  ~/.vim/* .

copy pathogen
   93  find /cygdrive/c/vim -iname pathogen
   94  find /cygdrive/c/vim -iname '*path*'
   95  cd autoload/
   96  cp /cygdrive/c/vim/vim80/autoload/pathogen.vim .
   97  vim
   98  vim pathogen.vim 
   set ff=unix

   99  vim
   
   copy colors
  100  cd ../colors/
  101  cp /cygdrive/c/vim/vim80/colors/
  102  ls /cygdrive/c/vim/vim80/colors/
  103  cp  /cygdrive/c/vim/vim80/colors/* .

8. Install packages

    8.1 wget 


wget is its own package -> http://cygwin.com/packages/wget/
$ cygcheck -f $( which wget )
wget-1.13.4-1
9.
```
