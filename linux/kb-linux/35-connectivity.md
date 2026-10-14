---
type: reference
title: Connectivity
description: "Connectivity notes, including VNC GUI problems and xstartup fix."
tags: [linux, troubleshooting, howto, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "linux/KB_Linux#35"
---

# Connectivity

[↑ KB_Linux](/linux/kb-linux/README.md)

## 35.1 VNC

### 35.1.1 GUI problem - can't open gnome session

```text
fix:
vi ~/.vnc//xstartup
put content:
#!/bin/sh

# Uncomment the following two lines for normal desktop:
#unset SESSION_MANAGER
#exec /etc/X11/xinit/xinitrc

[ -x /etc/vnc/xstartup ] && exec /etc/vnc/xstartup
[ -r $HOME/.Xresources ] && xrdb $HOME/.Xresources
xsetroot -solid grey
vncconfig -nowin &
# xterm -geometry 80x24+10+10 -ls -title "$VNCDESKTOP Desktop" &
startkde &
# twm &

Then restart server:
$ vncserver -kill :4
Killing Xvnc process ID 10547
$ vnc_mac 

New '<internal-host>:4 (<user>)' desktop is <internal-host>:4
```

### 35.1.2 Login via SSH but show GUI on VNC

```text
$ ssh <user>@<internal-host>
Last login: Mon Feb 15 21:08:36 2016 from <internal-ip>
<employer> Linux 5.50-5Client Kickstarted on: Mon Nov 17 16:30:04 CET 2014.
-bash-3.2$ export DISPLAY=":2.0"

or export DISPLAY=<user>-dev01:2
```

### 35.1.3 tmux

#### 35.1.3.1 What is it

```text
TMUX – ALTERNATIVE TO VNC ??
JANUARY 8, 2014 SUDKS	LEAVE A COMMENT
Its a very good alternative to vnc if your daily work is more to do with commands, scripts on switches, routers or linux kinda environment.

This is very lightweight application and thats one reason which makes it very much usable across geographies with lesser bandwidth.

An intro into it….

tmux – instead of vnc —Install tmux on a remote linux machine.
just login to any linux servers say via ssh, hope tmux command exist.
then.. just run tmux new-session -d -s “some_name”
-d is for not using the current terminal where you are running the tmux. -s is for the name
tmux –help or man tmux is another key to know all commands.. some basics here…
ctrl+b and then type any of the following commands [ remember its not ctrl+b+c . its ctrl+b and then just c ]
c – for create new terminal
f – find the termnial
, – for renaming
: – takes other commands
n – next window
p – previous window
<- -> - move windows
split-windows – this is used after typing ctrl+b  :  this splits the screen
w – lists the windows
d – detach
To attach back .. you can use the following command from the same server.
tmux attach-session -t “some_name” – same as the old name.
It looks something like this….

-bash-4.1$ tmux new-session -d -s  "<internal-host>"
-bash-4.1$ tmux attach-session -t "<internal-host>"

Working flow:
a. Create session: tmux new -s "yosi1"
work, make windows etc. 
detach (ctrl-b d)
logout, disconnect

b. login to machine
tmux list-sessions
$ tmux list-sessions
<internal-host>: 3 windows (created Mon Aug 22 17:19:34 2016) [249x73]
yosi1: 1 windows (created Tue Sep  6 16:19:46 2016) [249x73] (attached)

c. Resume work
$ tmux attach-session -t "yosi1"
or
$ tmux attach -t "yosi1"
```

#### 35.1.3.2 install from source

```text
https://linoxide.com/how-tos/install-tmux-manage-multiple-linux-terminals/

Method 1: Binary package

On Debian / Ubuntu based

$ sudo apt-get install tmux
On RedHat / CentOS based

# yum install tmux
Method 2 : Compiling the source


 
If your Linux repositories does not provide the latest one, you can install the latest one manually. At this article is written, the latest version of tmux is 1.8. To get the latest one, you can download it from tmux website, compile it anda install it. Here are the steps on Linux CentOS 6.4.

a. Download the source file and requirement package

$ wget http://downloads.sourceforge.net/tmux/tmux-1.8.tar.gz
not working. fix.
$ wget http://downloads.sourceforge.net/tmux/tmux-1.8.tar.gz --no-check-certificate

Still not working. fix
$ git clone https://github.com/tmux/tmux.git^C
$ tar cvfz tmux.tarz tmux
$ scp tmux.tarz ${USER_UNX}@${DEVM3}:/home/${USER_UNX}/
tmux.tarz                                                                                                                                                                                                  100% 9802KB   1.1MB/s   00:09    
$ wget https://github.com/downloads/libevent/libevent/libevent-2.0.21-stable.tar.gz
b. Extract the files

tar zxvf tmux-18.tar.gz
tar zxfv libevent-2.0.21-stable.tar.gz
c. Install pre-requisites application

yum install gcc kernel-devel make ncurses-devel y
Those application is needed to compile the tmux source file.

d. Install libevent2 source

# cd libevent-2.0.21-stable
# ./configure --prefix=/usr/local
# make && make install
e. Install tmux source

# cd tmux-1.8
<user>@<internal-host>:/home/<user>/temp/tmux> export LDFLAGS='-L/home/<user>/.local -Wl,-rpath=/home/<user>/.local/'
 ./configure --prefix=/home/<user>/.local 
# make && make install
f. Add tmux into path environment

# cd ~
export PATH=$PATH:/usr/local/bin
Run tmux

After the installation is finish, then type tmux on your console to run tmux.

Tmux default

A new session is now started. At the bottom line, you will find a bar contains some information. Here’s how to read it :

[0] 0:bash* : is the window number and the window name
pungki@dev-machine : is the username and the hostname
01:30 : tell us the current time
12-Jan-14 : tell us the current date
Splitting tmux vertically

To split tmux vertically, just press (Ctrl-b) + % . Then the screen will be separated vertically.

Tmux vertically split

Splitting tmux horizontally

To split tmux horizontally, press (Ctrl-b) + “ . Then the sceen will be separated horizontally.

Tmux horizontally split

But of course we can mix them. Here’s another example.

Tmux mix split

Moving between panes

Of course you will need move between panes. Otherwise, there is no use to create panes. By default, Linux console does not support mouse. So we need to know how to move between panes manually. There are some ways move between panes. Here’s a list how to to that.

Move Left : (Ctrl-b) + Left arrow OR (Ctrl-b) + {
Move Right : (Ctrl-b) + Right arrow OR (Ctrl-b) + }
Move Up : (Ctrl-b) + + Up arrow
Move Down : (Ctrl-b) + Down arrow
Move to the next pane : (Ctrl-b) + o
Show number for each panes and press the number : (Ctrl-b) + b q + pane number. For example : (Ctrl-b) + b q + 1 will move you to pane number 1
Tmux window number

Resizing panes

You may want to resize panes to fit your need. Here’s a list how to do that :

(Ctrl-b) + : then type resize-pane -D (Resizes the current pane down)
(Ctrl-b) + : then type resize-pane -U (Resizes the current pane upward)
(Ctrl-b) + : then type resize-pane -L (Resizes the current pane left)
(Ctrl-b) + : then type resize-pane -R (Resizes the current pane right)
(Ctrl-b) + : then type resize-pane -D 5 (Resizes the current pane down by 5 cells)
(Ctrl-b) + : then type resize-pane -U 5 (Resizes the current pane upward by 5 cells)
(Ctrl-b) + : then type resize-pane -L 5 (Resizes the current pane left by 5 cells)
(Ctrl-b) + : then type resize-pane -R 5 (Resizes the current pane right by 5 cells)
(Ctrl-b) + : then type resize-pane -t 2 5 (Resizes the pane with the id of 2 down by 5 cells)
(Ctrl-b) + : then type resize-pane -t -L 5 (Resizes the pane with the id of 2 left by 5 cells)
Please note that you need to press the colon sign (:) after pressing Ctrl-b

From the screenshot above, we try to resize pane number 1. If the active pane is pane number 1 then we can press (Ctrl-b) + : resize pane -D 13 to make it down for 13 cells.

Tmux resize

Zoom panes

This feature is new at 1.8 version. You can now zoomed a pane without need to detach or break it into independent window. At the active pane, press (Ctrl-b) + z to zoom the pane. Pressing it again will bring the zoomed pane back.

Make a pane into window

If you wish to exclude your pane into window, then you can do this by pressing (Ctrl-b) + : then type break pane. Then your pane will become an independent window. Next, you are recommended to give it a name in order to make it easy to remember.

Closing panes

To close a pane, simply type exit from the pane. Then it will close.

$ exit
Detach and Re-attach Tmux

One of Tmux advantage is you can detach tmux without losing anything you are working on it. Then you can re-attach Tmux with the condition exactly before you detach it. This is very useful if you have to move between computers and don’t want to lose anything.

To detach it, use keystroke (Ctrl-b) + d

While re-attach the same window can be executed by typing tmux attach on your console.

$ tmux attach
If you - let say - remote your Linux machine from Windows client using putty, you still can use tmux. Here’s a sample of Putty client run Tmux.

Tmux using putty

Tmux is different with Terminator. Terminator is a local application which run on Linux terminal as a terminal multiplexerl. We can’t run Terminator on a remote machine because it’s a local application.

Create more window

We are sure that you won't mess your window with a lot of panes. 3 - 5 panes are may the maximum panes on a single window. More than 5 panes, can make you uncomfortable. To solve this situation, we can make more tmux window. To create new window, you can press (Ctrl-b) + c . Then you will see at the status bar, an info like this [0] 0:bash - 1:bash*

Tmus status bar

Rename a window name

To rename a window name, press Ctrl-b + , . (press Ctrl-b and press comma sign). Then provide the name and press Enter to confirm it.

Tmux renaming window

Tmux renaming windows success

An asterisk sign (*) means the current window.

Moving between Window

To move between window, we can use :

(Ctrl-b) + n : Move to next window
(Ctrl-b) + p : Move to previous window
(Ctrl-b) + w : Interactively choose the window (useful if you have more than 2 window)
Interactively choost the window
Tmux move windows interactively

Closing Window

If you want to close a window, simply press (Ctrl-b) + &

Configuring Tmux

Tmux is highly configurable. You can edit tmux.conf file to do this. If you don’t have the file, you can create it. For system wide, you can put the tmux.conf in /etc folder. Or put it on ~/.tmux.conf for user spesific settings. Here some example of tmux.conf content. Here are some example of tmux.conf configuration content.

Change the Prefix Key

By default, tmux prefix is Ctrl-b. Every command in tmux, must begin with Ctrl-b keystroke. If you don’t like it, you can change it. Let say you want to change it into Ctrl-a. Just put this line into your tmux.conf :

unbind C-b
set -g prefix C-a
Save the file and re-run tmux. Please note, that in order to make tmux.conf changes works, you need to exit all tmux sessions before. If you detach a tmux session, and re-attach it, the changes will not work.

Change the splitting panes

As mentioned above, tmux use % sign and “ sign to split panes. You may don’t like the combination. To change it, just put this line into tmux.conf

unbind %
bind h split-window -v
unbind ‘ ” ’
bind v split-window -h
The above configuration will change :

% sign into h letter for vertically split
“ sign into v letter for horizontally split
Change the status bar looks

# Status bar theme
set -g status-bg black
set -g status-fg white

# Highlight and Notify
set-window-option -g window-status-current-bg red
setw -g monitor-activity on
set -g visual-activity on
The above configuration will highlight the active window with red color.

Change the numbering system of panes and windows

By default, the numbering system of panes and windows are start from 0. If you want to start it from 1, you can put this line on your .tmux.conf file.

# start with window 1 (instead of 0)
set -g base-index 1

# start with pane 1
set -g pane-base-index 1
There are still a lot of configuration that can be made for tmux. More parameters can be found inside tmux manual section Options.

		    35.1.3.3
```

## 35.2 screen, similar tool to tmux

```text
Linux Screen Tips
We use screen daily, so as we keep adding new tips when we find good ones.
Installing Screen with Yum
Starting Linux Screen
Control Command
Creating Windows
Switching Between Windows
Detaching From Screen
Reattach to a Screen
Logging Output
Getting Alerts
Locking Screen
Stopping Screen
Video Tutorial
Installing Screen with Yum
Chances are that you already have screen on your system. On most Red Hat and CentOS distributions you can find Linux screen  in /usr/bin/screen. To see if screen is in your path, you can use the which command:
[root@office ~]# which screen
/usr/bin/screen
If you do not have screen, then you can install it easily from an RPM or the package file for your system. For example, on CentOS you can install screen with yum:
[root@office ~]# yum install screen
...
Complete!
As you probably already have Linux screen or can use an RPM, I am not going to cover the building of screen from source. Lets get on to how to use screen.
Starting Linux Screen
Screen is started from the command line just like any other command:
[root@office ~]# screen
You are now inside of a window within screen. This functions just like a normal shell except for a few special characters.
Control Command
Command: “Ctrl-a”
Screen uses the command “Ctrl-a” that’s the control key and a lowercase “a”  as a signal to send commands to screen instead of the shell.
For example, “Ctrl-a” then “?”. You should now have the screen help page.

Screen key bindings, page 1 of 4.
 
Command key:  ^A   Literal ^A:  a
 
break      ^B b          only       Q
clear      C             other      ^A
colon      :             pow_break  B
copy       ^[ [          pow_detach D
detach     ^D d          prev       ^P p ^?
digraph    ^V            readbuf    &amp;amp;amp;lt;
displays   *             redisplay  ^L l
fit        F             removebuf  =
flow       ^F f          reset      Z
focus      ^I            screen     ^C c
hardcopy   h             select     '
help       ?             silence    _
Key bindings are the commands the screen accepts after you hit “Ctrl-a”. You can reconfigure these keys to your liking using a .screenrc file, but I just use the defaults.
Creating Windows
Command: “Ctrl-a” “c”.
To create a new window, you just use “Ctrl-a” “c”.
This will create a new window for you with your default prompt.  Your old window is still active.
For example, I can be running top and then open a new window to do other things. Top stays running! It is still there. To try this for yourself, start up screen and then run top. (Note: I have truncated some screens to save space.)
Start top

top - 09:10:33 up 35 days, 17:26,  1 user,  load averag
Tasks: 131 total,   1 running, 130 sleeping,   0 stoppe
Cpu(s):  0.4%us,  0.2%sy,  0.0%ni, 99.4%id,  0.0%wa,  0
Mem:  12302040k total,  6363652k used,  5938388k free,
Swap:  1052248k total,       12k used,  1052236k free,
Now open a new window with: “Ctrl-a” “c”
Your top window is still running you just have to switch back to it.
Switching Between Windows
Command: “Ctrl-a” “n”
Screen allows you to move forward and back. In the example above, you could use “Ctrl-a “n” to get back to top. This command switches you to the next window.
The windows work like a carousel and will loop back around to your first window.
You can create several windows and toggle through them with “Ctrl-a” “n” for the next window or “Ctrl-a” “p” for the previous window.
Each process will keep running until you kill that window.
Detaching From Screen
Command: “Ctrl-a” “d”
Detaching is the most powerful part of screen.  Screen allows you to detach from a window and reattach later.
If your network connection fails, screen will automatically detach your session! 
You can detach from the window using “Ctrl-a” “d”.
This will drop you into your shell.
All screen windows are still there and you can re-attach to them later.
This is great when you are using rsync for server migration.
 
Reattach to Screen
If your connection drops or you have detached from a screen, you can re-attach by just running:
1
[jeffh@office ~]$ screen -r
This will re-attach to your screen.
However, if you have multiple screens you may get this:

[jeffh@office ~]$ screen -r
There are several suitable screens on:
31917.pts-5.office      (Detached)
31844.pts-0.office      (Detached)
Type "screen [-d] -r [pid.]tty.host" to resume one of them.
If you get this, just specify the screen you want.
1
[jeffh@office ~]$ screen -r  31844.pts-0.office
Logging Your Screen Output
As a consultant, I find it important to keep track of what I do to someone’s server. Fortunately, screen makes this easy.
Using “Ctrl-a” “H”, creates a running log of the session.
Screen will keep appending data to the file through multiple sessions. Using the log function is very useful for capturing what you have done, especially if you are making a lot of changes. If something goes awry, you can look back through your logs.
Getting Alerts
Screen can monitor a window for activity or inactivity. This is great if you are downloading large files, compiling, or waiting for output.
If you are waiting for output from a long running program, you can use “Ctrl-a” “M” to look for activity. Screen will then flash an alert at the bottom of the page when output is registered on that screen.
I use this when running a command that takes a long time to return data. I can just fire up the command, switch to another window and not have to keep switching back to check the status.
You can also monitor for inactivity. Why use this?
If you are downloading a large file or compiling a program, you can be notified when there is no more output. This is a great signal to when that job is done. To monitor for silence or no output use “Ctrl-A” “_”.
Locking Your Screen Session
If you need to step away from your computer for a minute, you can lock your screen session using “Ctrl-a” “x”.  This will require a password to access the session again.

Screen used by root &amp;amp;amp;lt;jeffh&amp;amp;amp;gt;.
Password:
Stopping Screen
When you are done with your work, I recommend you stop the session instead of saving it for later.  To stop screen you can usually just type exit from your shell. This will close that screen window.  You have to close all screen windows to terminate the session.
You should get a message about screen being terminated once you close all windows.

[screen is terminating]
Alternatively, you can use “Ctrl-a” “k”.  You should get a message if you want to kill the screen.

reattach session
screen -d -r
As screen -r says, there is one screen, but it is attached. To resume it on your current terminal, you have to detach it from the other one first: screen -d -r 27863, see manpage -d.
```

## 35.3 My screen commands

```text
a. new session: screen -S sessionname 
b. reattach: screen -r
c. detach+reattach: screen -d -r
d. list sessions: screen -ls
e. list windows and switch: ctrl+a+"
f. list windows : ctrl+a+w
g. ~/.screenrc, note ctrl-a mapped to ctrl-b
$ cat .screenrc 
# ===============================================================
# ESCAPE - the COMMAND CHARACTER
# ===============================================================
escape ^Bb  # suggested binding for emacs users

# ===============================================================
# BINDINGS
# ===============================================================
bindkey "^[Od" prev  # change window with ctrl-left
bindkey "^[Oc" next  # change window with ctrl-right

# ===============================================================
# VARIABLES - Number values
# ===============================================================
defscrollback       3000          # default: 100

# ===============================================================
# VARIABLES - Paths and Files (esp. programs)
# ===============================================================
#
# shell:  Default process started in screen's windows.
# Makes it possible to use a different shell inside screen
# than is set as the default login shell.  Halleluja! :-)
shell               bash


startup_message off

term screen-256color
setenv LC_CTYPE en_US.UTF-8

# ===============================================================
# status line setup
# ===============================================================
#hardstatus off
hardstatus alwayslastline
#hardstatus string '%{= kG}[ %{G}%H %{g}][%= %{= kw}%?%-Lw%?%{r}(%{W}%n*%f%t%?(%u)%?%{r})%{w}%?%+Lw%?%?%= %{g}][%{B} %m-%d %{W} %c %{g}]'
hardstatus string '%{= kG}[ %{G}%H %{g}][%{= kW}%?%-w%?%{= MK}%n*%t%{= kW} %?%+w%?%= %{g}][%{B} %m-%d %{W} %c %{g}]'
#hardstatus string "%{.kW}%-w%{.W}%n %t%{-}%{=b kw}%?%+w%? %=%c %d/%m/%Y" #B&W & date&time
#hardstatus alwayslastline '%{= G}[ %{G}%H %{g}][%= %{= w}%?%-Lw%?%{= R}%n*%f %t%?%{= R}(%u)%?%{= w}%+Lw%?%= %{= g}][ %{y}Load: %l %{g}][%{B}%Y-%m-%d %{W}%c:%s %{g}]'


windowlist string "%4n %h%=%f"

# Enable mouse scrolling and scroll bar history scrolling
termcapinfo xterm* ti@:te@
```

## 35.4 Screen status line

```text
summary:
hardstatus string "%{= KW} %H [%`] %{= Kw}|%{-} %-Lw%{= bW}%n%f %t%{-}%+Lw %=%C%a %Y-%M-%d"
backtick 0 30 30 sh -c 'screen -ls | grep --color=no -o "$PPID[^[:space:]]*"'

linux screen status line
http://www.kilobitspersecond.com/2014/02/10/understanding-gnu-screens-hardstatus-strings/
My current development setup revolves mainly around Vim and GNU Screen. I use Screen only to keep sessions running between work days or in case I get disconnected, but lately I’ve been tempted to try using different windows inside Screen. In order to make this easier, I wanted one of those status lines that shows you all your windows as “tabs”.
Configuring this status line (the “hardware status line” or, as I’ll call it, “hardstatus”) is done with a single, often long string of characters in ~/.screenrc that at first can look entirely baffling:
hardstatus string "%{= KW} %H [%`] %{= Kw}|%{-} %-Lw%{= bW}%n%f %t%{-}%+Lw %=%C%a %Y-%M-%d"
Exactly.
To my dismay, almost everything I can find about hardstatus through Google are just dumps of other people’s strings, with little to no explanation about why they do what they do – it’s easy to imagine that the people who post them hardly know why they do what they do, either. GNU’s official documentation isn’t terribly helpful.
After finally deciphering a lot of what goes on in these strings, I wanted to spell it out to anybody else who might be hunting around for half a clue about this voodoo. There are (more than?) a few things I haven’t covered here, of course – truncation and conditionals, namely – but this should be enough to get you started.
Below is my current hardstatus string, with comments on each little unit inside it.
hardstatus string "%{= KW} %H [%`] %{= Kw}|%{-} %-Lw%{= bW}%n%f %t%{-}%+Lw %=%C%a %Y-%M-%d"
#
# http://www.gnu.org/software/screen/manual/html_node/String-Escapes.html
#
# %{= wK} : set colors to bright white (W) on bright black (K) and keep current text styles (=)
# %H      : hostname
# [       : opening bracket character
# %`      : print output of 'backtick' command (defined elsewhere in .screenrc)
# ]       : closing bracket character
# %{= wW} : set colors to white (w) on bright black (K) and keep current text styles (=)
# |       : bar character
# ${-}    : restore colors to previous colors / undo last color change
# %-Lw    : list windows before current window (L [optional] = "include flags")
# %{= bW} : set colors to bright white (W) on blue (b) and keep current text styles (=)
# %f      : window flags
# %t      : window title
# %{-}    : restore colors to previous colors / undo last color change
# %+Lw    : list windows after current window (L [optional] = "include flags")
# %=      : expand to fill all space (used here to make remaining content flush right)
# %C      : current time (12-hr; 24-hr is %c)
# %a      : am/pm (lowercase; uppercase is %A)
# %Y      : current year
# -       : hyphen character
# %m      : current month (0-padded; %M for "Jan" etc.)
# -       : hyphen character
# %d      : current date (0-padded)
This results in something like this:
hardstatus
Let’s take a closer look at the types of things that these units are doing.
Text Styles
Anything inside {curly braces} changes the way the text in hardstatus looks, and nothing more. I’ll get to this later, so for now, let’s just strip out these strings, making the rest of the code somewhat easier to understand. I recommend you do the same when studying anybody else’s hardstatus strings.
 %H [%`] | %-Lw%n%f %t%+Lw %=%C%a %Y-%M-%d
Windows
Anything with a w (or W) in it deals with displaying the Screen window titles themselves. Somewhere in the middle of most hardstatus strings will be something like this:
%-Lw%n%f %t%+Lw
Bookending this line are the strings %-Lw and %+Lw. These mean, simply, “Print the (previous/next) windows”: %-w for the previous ones, %+w for the next ones, and L to indicate that we want those windows’ flags to appear as well (although this is optional).
If we take these away, we’re left with this:
%n%f %t
This is the formatting of the title for our active window: Number, Flags, (space,) and Title. Simple!
System Info
Doing away with our window listing, we’re left with this:
 %H [%`] | %=%C%a %Y-%M-%d
Let’s get rid of the last half of it right away, the stuff that was to the right of the window list.  %C%a %Y-%M-%d is just the time and date, and %= just tells Screen to shove everything after it to the right edge of the terminal (more or less: this string “pushes” text away until it meets the screen edge or another %=).
Now all that remains is what was to the left of the window list:
 %H [%`] |
%H is the hostname of the server that we’re connected to; the square brackets are literally square brackets that get printed onto the screen, as is the vertical bar. (Anything that isn’t preceded by % will be printed out as-is.)
The backtick character, %`, prints the output of whatever you’ve assigned to the backtick command. In my case (in ~/.screenrc):
backtick 0 30 30 sh -c 'screen -ls | grep --color=no -o "$PPID[^[:space:]]*"'
This prints the name of my current Screen session. I have no idea why this does what it does; I confess I nicked it from Super User. My understanding is that later versions of Screen can or will be able to do this with a simple escape character similar to those above.
Text Styles (Again)
As I said, anything inside {curly braces} affects the way the text looks – this includes formatting (like bold, underline, etc) and color. Here’s an example:
%{+bu wW}
The first half of the string inside the braces (+bu) tells hardstatus to display the following text as bold and underlined. More styling codes are available and are listed in GNU’s documentation. The + indicates that we want to add this property; if we subsequently wanted to unbold text, we would do something like this: %{-b}.
The second half of the string (wW) tells hardstatus which colors to use, the first character being the background color and the second being the foreground color. In this case, we’re printing “bright white” on “white” (which is really more of a light gray). Again, more codes are available in GNU’s documentation.
To reset text styles to their previous state (before the most recent change), all you need is  %{-}.

	35.5
```
