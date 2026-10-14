---
type: reference
title: X user's guide
description: Section 4 of the legacy kb-cygwin notes.
tags: [kb-cygwin]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-cygwin#4"
---

# X user's guide

[↑ kb-cygwin](/kb-cygwin/README.md)

## 4.1 Display

### 4.1.1 Opening remote clients

```text
Displaying Remote Clients

Displaying remote X clients with Cygwin/X is nearly identical to displaying remote X clients with any other X Server. You may use the secure ssh method, or the unsecure telnet method (not recommended).
Secure ssh

On your Windows machine:

|   1.  Make sure you have the openssh package installed.
|   2.  Launch Cygwin/X, if not installed use the setup program to select xinit package under x11 category . Also install twm and fvwm
either launch xwin (windows key + xwin), then right click to open xterm. or use $ startx /usr/bin/fvwm2
|   3.  Run the following in an X terminal:
|Username@CygwinHost ~ $ ssh -Y -l username remote_hostname_or_ip_address
|
|   4.  Enter your password when prompted by ssh.
|   5.  Your ssh session should now show you a shell prompt for your remote machine.
|   6.  You can now launch remote X clients in your ssh session, for example, xterm& will launch an xterm running on your remote host that will display on your Cygwin/X screen.
|   7.  Launch other remote clients in the same manner. I recommend starting the remote clients in the background, by appending & to the command name, so that you don't have to open several ssh sessions.

Unsecure Telnet

On your Windows machine:

|   1.  Make sure you have the inetutils package installed.
|   2.  Launch Cygwin/X
|   3.  In an X terminal type /usr/X11R6/bin/xhost remote_hostname_or_ip_address
|   4.  In an X terminal type /usr/bin/telnet remote_hostname_or_ip_address. Use the explicit path to ensure that Cygwin's telnet is run instead of Microsoft's telnet; Microsoft's telnet will crash on startup when run from Cygwin/X.
|   5.  Login to your remote machine via your telnet session
|   6.  In your telnet session type, DISPLAY=windows_hostname_or_ip_address:0.0
|   7.  In your telnet session type, export DISPLAY
|   8.  You can now launch remote X clients in your telnet session, for example, xterm& will launch an xterm running on your remote host that will display on your Cygwin/X screen.
|   9.  Launch other remote clients in the same manner; I recommend starting the remote clients in the background, by appending & to the command name, so that you don't have to open several telnet sessions.

		4.1.2
```

## 4.2 X windows system

### 4.2.1 How to start

```text
$ startx 
Use a script for starting the X system. Very useful

In case it doesn't work use:
$ X -multiwindow -clipboard
And then right click the X server icon and choose Applications->xterm
From this xterm run the personal startup script:
$. ~/.bashrc
$. ~/.aliases
$start 
or 
$ mini_start


	4.3
```
