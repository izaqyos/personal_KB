---
type: reference
title: Ubuntu
description: Section 27 of the legacy KB_Linux notes.
tags: [kb-linux]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "linux/KB_Linux#27"
---

# Ubuntu

[↑ KB_Linux](/linux/kb-linux/README.md)

## 27.1 Configuring

### 27.1.1 Install guide for VNC

```text
Virtual Network Computing (VNC) is a way to share the desktop of one computer (server) with a remote computer (client). The client's keyboard and mouse input are transmitted over a network and control the operation of the server. The server's graphics are transmitted back over the network. Except for some latency issues, it will appear as if you are working directly on the machine you are sitting at. However, all programs and commands are performed on the server side.

Difficulty:
    Moderately Easy

Instructions

        1

        Open a Terminal window. The Terminal window can be found under "Start" > "Utilities."
        2

        Download vnc4server and xinetd:

        sudo apt-get install vnc4server xinetd
        3

        Start the vnc4server:

        vnc4server

        You will be prompted for a password. This password will be used to log into the VNC session.

        After providing a password, you will get output that looks like:

        New 'laptop:3 (laptop)' desktop is laptop:3

        Take notice of the number after the colon (:), in this case it is "3."

        Starting the vnc4server will cause a .vnc directory to be placed in your home directory.
        4

        Stop the vnc4server

        vnc4server -kill :3

        Replace the number "3" with the number from Step 3.
        5

        Open the .vnc/xstartup file for editing:

        gedit ~/.vnc/xstartup

        The file will look like:

        #!/bin/sh

        # Uncomment the following two lines for normal desktop:

        #unset SESSION_MANAGER

        #exec /etc/X11/xinit/xinitrc

        [ -x /etc/vnc/xstartup ] && exec /etc/vnc/xstartup

        [ -r $HOME/.Xresources ] && xrdb $HOME/.Xresources

        xsetroot -solid grey

        vncconfig -iconic &

        xterm -geometry 80x24+10+10 -ls -title "$VNCDESKTOP Desktop" &

        twm &
        6

        Now, Change the .vnc/xstartup file and save it.

        Uncomment the lines that start with unset and exec. Comment out the lines that start with xsetroot, vncconfig, xterm and twm.

        The final file should look like:

        #!/bin/sh

        # Uncomment the following two lines for normal desktop:

        unset SESSION_MANAGER

        exec /etc/X11/xinit/xinitrc

        [ -x /etc/vnc/xstartup ] && exec /etc/vnc/xstartup

        [ -r $HOME/.Xresources ] && xrdb $HOME/.Xresources

        #xsetroot -solid grey

        #vncconfig -iconic &

        #xterm -geometry 80x24+10+10 -ls -title "$VNCDESKTOP Desktop" &

        #twm &
        7

        Change the permissions on the /etc/X11/xinit/xinitrc file to make it executable:

        sudo chmod 755 /etc/X11/xinit/xinitrc
        8

        Start the vnc4server:

        vnc4server

        Again, remember the number after the colon (:).
        9

        Log into your remote desktop to check the configuration:

        vncviewer localhost:3


Read more: How to Install a VNC Server in Ubuntu | eHow.com http://www.ehow.com/how_5089245_install-vnc-server-ubuntu.html#ixzz1ceDEfTvE
```

### 27.1.2 Change Ubuntu Server from DHCP to a Static IP Address

```text
If the Ubuntu Server installer has set your server to use DHCP, you will want to change it to a static IP address so that people can actually use it.

Changing this setting without a GUI will require some text editing, but that’s classic linux, right?

Let’s open up the /etc/network/interfaces file. I’m going to use vi, but you can choose a different editor

sudo vi /etc/network/interfaces

For the primary interface, which is usually eth0, you will see these lines:

auto eth0
iface eth0 inet dhcp

As you can see, it’s using DHCP right now. We are going to change dhcp to static, and then there are a number of options that should be added below it. Obviously you’d customize this to your network.

auto eth0
iface eth0 inet static
        address 192.168.1.100
        netmask 255.255.255.0
        network 192.168.1.0
        broadcast 192.168.1.255
        gateway 192.168.1.1

Now we’ll need to add in the DNS settings by editing the resolv.conf file:

sudo vi /etc/resolv.conf

On the line ‘name server xxx.xxx.xxx.xxx’ replace the x with the IP of your name server. (You can do ifconfig /all to find out what they are)

You need to also remove the dhcp client for this to stick (thanks to Peter for noticing). You might need to remove dhcp-client3 instead.

sudo apt-get remove dhcp-client
Now we’ll just need to restart the networking components:

sudo /etc/init.d/networking restart

Ping www.google.com. If you get a response, name resolution is working(unless of course if google is in your hosts file).
```

### 27.1.3 Login as root

```text
Don't. Use sudo instead
```

### 27.1.4 Disable firewall

#### 27.1.4.1 Disable / Turn Off Firewall in Ubuntu Linux Server

```text
How do I disable firewall in Ubuntu Linux server edition?

You can type the following command to see if firewall is active or not (open a terminal or ssh session and type the following command):
$ sudo iptables -L -n

Sample outputs:

Chain INPUT (policy ACCEPT)
target     prot opt source               destination
ACCEPT     udp  --  0.0.0.0/0            0.0.0.0/0           udp dpt:53
ACCEPT     tcp  --  0.0.0.0/0            0.0.0.0/0           tcp dpt:53
ACCEPT     udp  --  0.0.0.0/0            0.0.0.0/0           udp dpt:67
ACCEPT     tcp  --  0.0.0.0/0            0.0.0.0/0           tcp dpt:67
Chain FORWARD (policy ACCEPT)
target     prot opt source               destination
ACCEPT     all  --  0.0.0.0/0            192.168.122.0/24    state RELATED,ESTABLISHED
ACCEPT     all  --  192.168.122.0/24     0.0.0.0/0
ACCEPT     all  --  0.0.0.0/0            0.0.0.0/0
REJECT     all  --  0.0.0.0/0            0.0.0.0/0           reject-with icmp-port-unreachable
REJECT     all  --  0.0.0.0/0            0.0.0.0/0           reject-with icmp-port-unreachable
Chain OUTPUT (policy ACCEPT)
target     prot opt source               destination
You can save existing firewall rules as follows:
$ sudo iptables-save > firewall.rules

Finally, type the following commands to stop firewall:
$ sudo iptables -X
$ sudo iptables -t nat -F
$ sudo iptables -t nat -X
$ sudo iptables -t mangle -F
$ sudo iptables -t mangle -X
$ sudo iptables -P INPUT ACCEPT
$ sudo iptables -P FORWARD ACCEPT
$ sudo iptables -P OUTPUT ACCEPT

A Note About ufw

The latest version of Ubuntu comes with ufw (now it is the default firewall configuration tool for Ubuntu). It is developed to ease iptables firewall configuration, ufw provides a user friendly way to create an IPv4 or IPv6 host-based firewall. To disable ufw, enter:
$ sudo ufw disable

You can also use GUI tool to enable or disable Firewall under Ubuntu Linux desktop edition by visiting System > Administration > Firewall configuration option:


Fig.01: Disabling Firewall In Ubuntu Linux

Simply unselect "Enabled" option to turn off the firewall.

			27.1.4.2


		27.1.5
```

## 27.2 Troubleshooting

### 27.2.1 How To Fix “Problem with MergeList /var/lib/apt/lists” Error In Ubuntu 11.04

```text
While using the package manager or trying to install applications through Terminal, it is possible to get a nasty error which is something like this :

E:Encountered a section with no Package: header,

E:Problem with MergeList /var/lib/apt/lists /us.archive.ubuntu.com_ubuntu_dists_natty_main_binary-i386_Packages,

E:The package lists or status file could not be parsed or opened.

This  will prevent from  installing or upgrading any application in  Ubuntu 11.04.  Fortunately, the fix is simple for this.

From the Terminal type the following commands :

sudo rm /var/lib/apt/lists/* -vf
and

sudo apt-get update
This  will delete the older entries and download the latest ones after which the error should no longer be there.

[ In fact, to avoid remembering these commands, they can be put in a shell script and only that script needs to be executed. Check out this post on how to do that.]

Cheers.



*/
		27.2.2
```

## 27.3 packages

```text
id=__install_istapd_ubuntu__
```

### 27.3.1 istapd

```text
yosi@ubuntu11:~$ sudo apt-get install isatapd
[sudo] password for yosi: 
Reading package lists... Done
Building dependency tree       
Reading state information... Done
E: Unable to locate package isatapd

To fix:
cd /var/lib/apt
sudo mv lists lists.old
sudo mkdir -p lists/partial
sudo apt-get update

[yosi@ubuntu11:/var/lib/apt$ sudo apt-get install isatapd
Reading package lists... Done
Building dependency tree       
Reading state information... Done
The following NEW packages will be installed:
  isatapd
0 upgraded, 1 newly installed, 0 to remove and 0 not upgraded.
Need to get 18.5 kB of archives.
After this operation, 168 kB of additional disk space will be used.
Get:1 http://us.archive.ubuntu.com/ubuntu/ oneiric/universe isatapd i386 0.9.6-1 [18.5 kB]
Get:2 http://us.archive.ubuntu.com/ubuntu/ oneiric/universe isatapd i386 0.9.6-1 [18.5 kB]
Fetched 18.5 kB in 2min 0s (153 B/s)
Selecting previously deselected package isatapd.
(Reading database ... 125368 files and directories currently installed.)
Unpacking isatapd (from .../isatapd_0.9.6-1_i386.deb) ...
Processing triggers for man-db ...
Processing triggers for ureadahead ...
Setting up isatapd (0.9.6-1) ...
 * Starting ISATAP client isatapd                                                                                                    [ OK ] 
yosi@ubuntu11:/var/lib/apt$ ps -ef | grep isatapd
root     25202     1  0 01:15 ?        00:00:00 /usr/sbin/isatapd --daemon --pid /var/run/isatapd.pid --mtu 1280 isatap
nobody   25212 25202  0 01:15 ?        00:00:00 /usr/sbin/isatapd --daemon --pid /var/run/isatapd.pid --mtu 1280 isatap

		27.3.2

	27.4
```
