---
type: reference
title: HowTO
description: Section 32 of the legacy KB_Linux notes.
tags: [kb-linux]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "linux/KB_Linux#32"
---

# HowTO

[↑ KB_Linux](/linux/kb-linux/README.md)

## 32.1 HowTo: Debug Crashed Linux Application Core Files Like A Pro

```text
Core dumps are often used to diagnose or debug errors in Linux or UNIX programs. Core dumps can serve as useful debugging aids for sys admins to find out why Application like Lighttpd, Apache, PHP-CGI or any other program crashed. Many vendors and open source project author requests a core file to troubleshoot a program. A core file is generated when an application program abnormally terminates due to bug, operating system security protection schema, or program simply try to write beyond the area of memory it has allocated, and so on. This article explains how to turn on core file support and track down bugs in programs.
Turn On Core File Creation Support

By default most Linux distributions turn off core file creation (at least this is true for RHEL, CentOS, Fedora and Suse Linux). You need to use the ulimit command to configure core files.
See The Current Core File Limits

Type the following command:
# ulimit -c
Sample outputs:

0

The output 0 (zero) means core file is not created.
Change Core File Limits

In this example, set the size limit of core files to 75000 bytes:
# ulimit -c 75000
HowTo: Enable Core File Dumps For Application Crashes And Segmentation Faults

Edit /etc/profile file and find line that read as follows to make persistent configuration:

ulimit -S -c 0 > /dev/null 2>&1

Update it as follows:

ulimit -c unlimited >/dev/null 2>&1

Save and close the file. Edit /etc/sysctl.conf, enter:
# vi /etc/sysctl.conf
Append the following lines:

kernel.core_uses_pid = 1
kernel.core_pattern = /tmp/core-%e-%s-%u-%g-%p-%t
fs.suid_dumpable = 2

Save and close the file. Where,

    kernel.core_uses_pid = 1 - Appends the coring processes PID to the core file name.
    fs.suid_dumpable = 2 - Make sure you get core dumps for setuid programs.
    kernel.core_pattern = /tmp/core-%e-%s-%u-%g-%p-%t - When the application terminates abnormally, a core file should appear in the /tmp. The kernel.core_pattern sysctl controls exact location of core file. You can define the core file name with the following template whih can contain % specifiers which are substituted by the following values when a core file is created:
        %% - A single % character
        %p - PID of dumped process
        %u - real UID of dumped process
        %g - real GID of dumped process
        %s - number of signal causing dump
        %t - time of dump (seconds since 0:00h, 1 Jan 1970)
        %h - hostname (same as ’nodename’ returned by uname(2))
        %e - executable filename

Finally, enable debugging for all apps, enter (Redhat and friends specific):
# echo "DAEMON_COREFILE_LIMIT='unlimited'" >> /etc/sysconfig/init
Reload the settings in /etc/sysctl.conf by running the following command:
# sysctl -p
How Do I Enable Core Dumping For Specific Deamon?

To enable core dumping for specific deamons, add the following line in the /etc/sysconfig/daemon-file file. In this example, edit /etc/init.d/lighttped and add line as follows:

DAEMON_COREFILE_LIMIT='unlimited'

Please note that DAEMON_COREFILE_LIMIT is Redhat specific, for all other distro add configuration as follows:

ulimit -c unlimited >/dev/null 2>&1
echo /tmp/core-%e-%s-%u-%g-%p-%t > /proc/sys/kernel/core_pattern

Save and close the file. Restart / reload lighttpd:
# /etc/init.d/lighttpd restart
# su - lighttpd
$ ulimit -c
Sample outputs:

unlimited

Now, you can send core files to vendor or software writes.
How Do I Read Core Files?

You need use the gdb command as follows:
$ gdb /path/to/application /path/to/corefile
See the gdb command man page for more information.
strace command

System administrators, diagnosticians and trouble-shooters will find it invaluable for solving problems with programs for which the source is not readily available since they do not need to be recompiled in order to trace them. This is also useful to submit bug reports to open source developers. See how to use the strace command under Linux to debug the problems.
Recommended readings:

    Debugging Tip: Trace the Process and See What It is Doing with strace
    The Art of Debugging with GDB, DDD, and Eclipse
    man pages core(5), strace, and bash

Stay tunned for gdb tutorial which will explains how to use generated core file to track down problem.


	32.2 30 Handy Bash Shell Aliases For Linux / Unix / Mac OS X

by nixCraft on June 11, 2012 · 59 comments· Last updated November 23, 2012

An alias is nothing but shortcut to commands. The alias command allows user to launch any command or group of commands (including options and filenames) by entering a single word. Use alias command to display list of all defined aliases. You can add user defined aliases to ~/.bashrc file. You can cut down typing time with these aliases, work smartly, and increase productivity at the command prompt.
More about aliases

The general syntax for the alias command for the bash shell is as follows.
Task: List aliases

Type the following command:

 
alias
 

Sample outputs:

alias ..='cd ..'
alias amazonbackup='s3backup'
alias apt-get='sudo apt-get'
...

By default alias command shows a list of aliases that are defined for the current user.
Task: Define / create an alias (bash syntax)

To create the alias use the following syntax:

 
alias name=value
alias name='command'
alias name='command arg1 arg2'
alias name='/path/to/script'
alias name='/path/to/script.pl arg1'
 

In this example, create the alias c for the commonly used clear command, which clears the screen, by typing the following command and then pressing the ENTER key:

 
alias c='clear'
 

Then, to clear the screen, instead of typing clear, you would only have to type the letter 'c' and press the [ENTER] key:

 
c
 

Task: Disable an alias temporarily (bash syntax)

An alias can be disabled temporarily using the following syntax:

 
## path/to/full/command
/usr/bin/clear
## call alias with a backslash ##
\c
 

Task: Remove an alias (bash syntax)

You need to use the command called unalias to remove aliases. Its syntax is as follows:

 
unalias aliasname
 

In this example, remove the alias c which was created in an earlier example:

 
unalias c
 

You also need to delete the alias from the ~/.bashrc file using a text editor (see next section).
Task: Make aliases permanent (bash syntax)

The alias c remains in effect only during the current login session. Once you logs out or reboot the system the alias c will be gone. To avoid this problem, add alias to your ~/.bashrc file, enter:

 
vi ~/.bashrc
 

The alias c for the current user can be made permanent by entering the following line:

 
alias c='clear'
 

Save and close the file. System-wide aliases (i.e. aliases for all users) can be put in the /etc/bashrc file. Please note that the alias command is built into a various shells including ksh, tcsh/csh, ash, bash and others.
A note about privileged access

You can add code as follows in ~/.bashrc:

 
# if user is not root, pass all commands via sudo #
if [ $UID -ne 0 ]; then
    alias reboot='sudo reboot'
    alias update='sudo apt-get upgrade'
fi
 

A note about os specific aliases

You can add code as follows in ~/.bashrc using the case statement:

 
### Get os name via uname ###
_myos="$(uname)"
 
### add alias as per os using $_myos ###
case $_myos in
   Linux) alias foo='/path/to/linux/bin/foo';;
   FreeBSD|OpenBSD) alias foo='/path/to/bsd/bin/foo' ;;
   SunOS) alias foo='/path/to/sunos/bin/foo' ;;
   *) ;;
esac
 

30 uses for aliases

You can define various types aliases as follows to save time and increase productivity.
#1: Control ls command output

The ls command lists directory contents and you can colorize the output:

 
## Colorize the ls output ##
alias ls='ls --color=auto'
 
## Use a long listing format ##
alias ll='ls -la'
 
## Show hidden files ##
alias l.='ls -d .* --color=auto'
 

#2: Control cd command behavior

 
## get rid of command not found ##
alias cd..='cd ..'
 
## a quick way to get out of current directory ##
alias ..='cd ..'
alias ...='cd ../../../'
alias ....='cd ../../../../'
alias .....='cd ../../../../'
alias .4='cd ../../../../'
alias .5='cd ../../../../..'
 

#3: Control grep command output

grep command is a command-line utility for searching plain-text files for lines matching a regular expression:

 
## Colorize the grep command output for ease of use (good for log files)##
alias grep='grep --color=auto'
alias egrep='egrep --color=auto'
alias fgrep='fgrep --color=auto'
 

#4: Start calculator with math support

 
alias bc='bc -l'
 

#4: Generate sha1 digest

 
alias sha1='openssl sha1'
 

#5: Create parent directories on demand

mkdir command is used to create a directory:

 
alias mkdir='mkdir -pv'
 

#6: Colorize diff output

You can compare files line by line using diff and use a tool called colordiff to colorize diff output:

 
# install  colordiff package :)
alias diff='colordiff'
 

#7: Make mount command output pretty and human readable format

 
alias mount='mount |column -t'
 

#8: Command short cuts to save time

 
# handy short cuts #
alias h='history'
alias j='jobs -l'
 

#9: Create a new set of commands

 
alias path='echo -e ${PATH//:/\\n}'
alias now='date +"%T'
alias nowtime=now
alias nowdate='date +"%d-%m-%Y"'
 

#10: Set vim as default

 
alias vi=vim
alias svi='sudo vi'
alias vis='vim "+set si"'
alias edit='vim'
 

#11: Control output of networking tool called ping

 
# Stop after sending count ECHO_REQUEST packets #
alias ping='ping -c 5'
# Do not wait interval 1 second, go fast #
alias fastping='ping -c 100 -s.2'
 

#12: Show open ports

Use netstat command to quickly list all TCP/UDP port on the server:

 
alias ports='netstat -tulanp'
 

#13: Wakeup sleeping servers

Wake-on-LAN (WOL) is an Ethernet networking standard that allows a server to be turned on by a network message. You can quickly wakeup nas devices and server using the following aliases:

 
## replace mac with your actual server mac address #
alias wakeupnas01='/usr/bin/wakeonlan 00:11:32:11:15:FC'
alias wakeupnas02='/usr/bin/wakeonlan 00:11:32:11:15:FD'
alias wakeupnas03='/usr/bin/wakeonlan 00:11:32:11:15:FE'
 

#14: Control firewall (iptables) output

Netfilter is a host-based firewall for Linux operating systems. It is included as part of the Linux distribution and it is activated by default. This post list most common iptables solutions required by a new Linux user to secure his or her Linux operating system from intruders.

 
## shortcut  for iptables and pass it via sudo#
alias ipt='sudo /sbin/iptables'
 
# display all rules #
alias iptlist='sudo /sbin/iptables -L -n -v --line-numbers'
alias iptlistin='sudo /sbin/iptables -L INPUT -n -v --line-numbers'
alias iptlistout='sudo /sbin/iptables -L OUTPUT -n -v --line-numbers'
alias iptlistfw='sudo /sbin/iptables -L FORWARD -n -v --line-numbers'
alias firewall=iptlist
 

#15: Debug web server / cdn problems with curl

 
# get web server headers #
alias header='curl -I'
 
# find out if remote server supports gzip / mod_deflate or not #
alias headerc='curl -I --compress'
 

#16: Add safety nets

 
# do not delete / or prompt if deleting more than 3 files at a time #
alias rm='rm -I --preserve-root'
 
# confirmation #
alias mv='mv -i'
alias cp='cp -i'
alias ln='ln -i'
 
# Parenting changing perms on / #
alias chown='chown --preserve-root'
alias chmod='chmod --preserve-root'
alias chgrp='chgrp --preserve-root'
 

#17: Update Debian Linux server

apt-get command is used for installing packages over the internet (ftp or http). You can also upgrade all packages in a single operations:

 
# distro specific  - Debian / Ubuntu and friends #
# install with apt-get
alias apt-get="sudo apt-get"
alias updatey="sudo apt-get --yes"
 
# update on one command 
alias update='sudo apt-get update && sudo apt-get upgrade'
 

#18: Update RHEL / CentOS / Fedora Linux server

yum command is a package management tool for RHEL / CentOS / Fedora Linux and friends:

 
## distrp specifc RHEL/CentOS ##
alias update='yum update'
alias updatey='yum -y update'
 

#19: Tune sudo and su

 
# become root #
alias root='sudo -i'
alias su='sudo -i'
 

#20: Pass halt/reboot via sudo

shutdown command bring the Linux / Unix system down:

 
# reboot / halt / poweroff
alias reboot='sudo /sbin/reboot'
alias poweroff='sudo /sbin/poweroff'
alias halt='sudo /sbin/halt'
alias shutdown='sudo /sbin/shutdown'
 

#21: Control web servers

 
# also pass it via sudo so whoever is admin can reload it without calling you #
alias nginxreload='sudo /usr/local/nginx/sbin/nginx -s reload'
alias nginxtest='sudo /usr/local/nginx/sbin/nginx -t'
alias lightyload='sudo /etc/init.d/lighttpd reload'
alias lightytest='sudo /usr/sbin/lighttpd -f /etc/lighttpd/lighttpd.conf -t'
alias httpdreload='sudo /usr/sbin/apachectl -k graceful'
alias httpdtest='sudo /usr/sbin/apachectl -t && /usr/sbin/apachectl -t -D DUMP_VHOSTS'
 

#22: Alias into our backup stuff

 
# if cron fails or if you want backup on demand just run these commands # 
# again pass it via sudo so whoever is in admin group can start the job #
# Backup scripts #
alias backup='sudo /home/scripts/admin/scripts/backup/wrapper.backup.sh --type local --taget /raid1/backups'
alias nasbackup='sudo /home/scripts/admin/scripts/backup/wrapper.backup.sh --type nas --target nas01'
alias s3backup='sudo /home/scripts/admin/scripts/backup/wrapper.backup.sh --type nas --target nas01 --auth /home/scripts/admin/.authdata/amazon.keys'
alias rsnapshothourly='sudo /home/scripts/admin/scripts/backup/wrapper.rsnapshot.sh --type remote --target nas03 --auth /home/scripts/admin/.authdata/ssh.keys --config /home/scripts/admin/scripts/backup/config/adsl.conf'
alias rsnapshotdaily='sudo  /home/scripts/admin/scripts/backup/wrapper.rsnapshot.sh --type remote --target nas03 --auth /home/scripts/admin/.authdata/ssh.keys  --config /home/scripts/admin/scripts/backup/config/adsl.conf'
alias rsnapshotweekly='sudo /home/scripts/admin/scripts/backup/wrapper.rsnapshot.sh --type remote --target nas03 --auth /home/scripts/admin/.authdata/ssh.keys  --config /home/scripts/admin/scripts/backup/config/adsl.conf'
alias rsnapshotmonthly='sudo /home/scripts/admin/scripts/backup/wrapper.rsnapshot.sh --type remote --target nas03 --auth /home/scripts/admin/.authdata/ssh.keys  --config /home/scripts/admin/scripts/backup/config/adsl.conf'
alias amazonbackup=s3backup
 

#23: Desktop specific - play avi/mp3 files on demand

 
## play video files in a current directory ##
# cd ~/Download/movie-name 
# playavi or vlc 
alias playavi='mplayer *.avi'
alias vlc='vlc *.avi'
 
# play all music files from the current directory #
alias playwave='for i in *.wav; do mplayer "$i"; done'
alias playogg='for i in *.ogg; do mplayer "$i"; done'
alias playmp3='for i in *.mp3; do mplayer "$i"; done'
 
# play files from nas devices #
alias nplaywave='for i in /nas/multimedia/wave/*.wav; do mplayer "$i"; done'
alias nplayogg='for i in /nas/multimedia/ogg/*.ogg; do mplayer "$i"; done'
alias nplaymp3='for i in /nas/multimedia/mp3/*.mp3; do mplayer "$i"; done'
 
# shuffle mp3/ogg etc by default #
alias music='mplayer --shuffle *'
 

#24: Set default interfaces for sys admin related commands

vnstat is console-based network traffic monitor. dnstop is console tool to analyze DNS traffic. tcptrack and iftop commands displays information about TCP/UDP connections it sees on a network interface and display bandwidth usage on an interface by host respectively.

 
## All of our servers eth1 is connected to the Internets via vlan / router etc  ##
alias dnstop='dnstop -l 5  eth1'
alias vnstat='vnstat -i eth1'
alias iftop='iftop -i eth1'
alias tcpdump='tcpdump -i eth1'
alias ethtool='ethtool eth1'
 
# work on wlan0 by default #
# Only useful for laptop as all servers are without wireless interface
alias iwconfig='iwconfig wlan0'
 

#25: Get system memory, cpu usage, and gpu memory info quickly

 
## pass options to free ## 
alias meminfo='free -m -l -t'
 
## get top process eating memory
alias psmem='ps auxf | sort -nr -k 4'
alias psmem10='ps auxf | sort -nr -k 4 | head -10'
 
## get top process eating cpu ##
alias pscpu='ps auxf | sort -nr -k 3'
alias pscpu10='ps auxf | sort -nr -k 3 | head -10'
 
## Get server cpu info ##
alias cpuinfo='lscpu'
 
## older system use /proc/cpuinfo ##
##alias cpuinfo='less /proc/cpuinfo' ##
 
## get GPU ram on desktop / laptop## 
alias gpumeminfo='grep -i --color memory /var/log/Xorg.0.log'
 

#26: Control Home Router

The curl command can be used to reboot Linksys routers.

 
# Reboot my home Linksys WAG160N / WAG54 / WAG320 / WAG120N Router / Gateway from *nix.
alias rebootlinksys="curl -u admin 'http://192.168.1.2/setup.cgi?todo=reboot'"
 
# Reboot tomato based Asus NT16 wireless bridge 
alias reboottomato="ssh admin@192.168.1.1 /sbin/reboot"
 

#27 Resume wget by default

The GNU Wget is a free utility for non-interactive download of files from the Web. It supports HTTP, HTTPS, and FTP protocols, and it can resume downloads too:

 
## this one saved by butt so many times ##
alias wget='wget -c'
 

#28 Use different browser for testing website

 
## this one saved by butt so many times ##
alias ff4='/opt/firefox4/firefox'
alias ff13='/opt/firefox13/firefox'
alias chrome='/opt/google/chrome/chrome'
alias opera='/opt/opera/opera'
 
#default ff 
alias ff=ff13
 
#my default browser 
alias browser=chrome
 

#29: A note about ssh alias

Do not create ssh alias, instead use ~/.ssh/config OpenSSH SSH client configuration files. It offers more option. An example:

 
Host server10
  Hostname 1.2.3.4
  IdentityFile ~/backups/.ssh/id_dsa
  user foobar
  Port 30000
  ForwardX11Trusted yes
  TCPKeepAlive yes
 

You can now connect to peer1 using the following syntax:
$ ssh server10
#30: It's your turn to share...

 
## set some other defaults ##
alias df='df -H'
alias du='du -ch'
 
# top is atop, just like vi is vim
alias top='atop'
 
## nfsrestart  - must be root  ##
## refresh nfs mount / cache etc for Apache ##
alias nfsrestart='sync && sleep 2 && /etc/init.d/httpd stop && umount netapp2:/exports/http && sleep 2 && mount -o rw,sync,rsize=32768,wsize=32768,intr,hard,proto=tcp,fsc natapp2:/exports /http/var/www/html &&  /etc/init.d/httpd start'
 
## Memcached server status  ##
alias mcdstats='/usr/bin/memcached-tool 10.10.27.11:11211 stats'
alias mcdshow='/usr/bin/memcached-tool 10.10.27.11:11211 display'
 
## quickly flush out memcached server ##
alias flushmcd='echo "flush_all" | nc 10.10.27.11 11211'
 
## Remove assets quickly from Akamai / Amazon cdn ##
alias cdndel='/home/scripts/admin/cdn/purge_cdn_cache --profile akamai'
alias amzcdndel='/home/scripts/admin/cdn/purge_cdn_cache --profile amazon'
 
## supply list of urls via file or stdin
alias cdnmdel='/home/scripts/admin/cdn/purge_cdn_cache --profile akamai --stdin'
alias amzcdnmdel='/home/scripts/admin/cdn/purge_cdn_cache --profile amazon --stdin'
 

Conclusion

This post summaries several types of uses for *nix bash aliases:

    Setting default options for a command (e.g. set eth0 as default option - alias ethtool='ethtool eth0' ).
    Correcting typos (cd.. will act as cd .. via alias cd..='cd ..').
    Reducing the amount of typing.
    Setting the default path of a command that exists in several versions on a system (e.g. GNU/grep is located at /usr/local/bin/grep and Unix grep is located at /bin/grep. To use GNU grep use alias grep='/usr/local/bin/grep' ).
    Adding the safety nets to Unix by making commands interactive by setting default options. (e.g. rm, mv, and other commands).
    Compatibility by creating commands for older operating systems such as MS-DOS or other Unix like operating systems (e.g. alias del=rm ).

I've shared my aliases that I used over the years to reduce the need for repetitive command line typing. If you know and use any other bash/ksh/csh aliases that can reduce typing, share below in the comments.
```

## 32.3 Top 30 Nmap Command Examples For Sys/Network Admins

```text
by nixCraft on November 26, 2012 · 8 comments· Last updated December 11, 2012

in Command Line Hacks, Howto, Networking, Security

Nmap is short for Network Mapper. It is an open source security tool for network exploration, security scanning and auditing. However, nmap command comes with lots of options that can make the utility more robust and difficult to follow for new users.

The purpose of this post is to introduce a user to the nmap command line tool to scan a host and/or network, so to find out the possible vulnerable points in the hosts. You will also learn how to use Nmap for offensive and defensive purposes.
nmap in action

nmap in action
More about nmap

From the man page:

    Nmap ("Network Mapper") is an open source tool for network exploration and security auditing. It was designed to rapidly scan large networks, although it works fine against single hosts. Nmap uses raw IP packets in novel ways to determine what hosts are available on the network, what services (application name and version) those hosts are offering, what operating systems (and OS versions) they are running, what type of packet filters/firewalls are in use, and dozens of other characteristics. While Nmap is commonly used for security audits, many systems and network administrators find it useful for routine tasks such as network inventory, managing service upgrade schedules, and monitoring host or service uptime.

It was originally written by Gordon Lyon and it can answer the following questions easily:

    What computers did you find running on the local network?
    What IP addresses did you find running on the local network?
    What is the operating system of your target machine?
    Find out what ports are open on the machine that you just scanned?
    Find out if the system is infected with malware or virus.
    Search for unauthorized servers or network service on your network.
    Find and remove computers which don't meet the organization's minimum level of security.

Sample setup (LAB)

Port scanning may be illegal in some jurisdictions. So setup a lab as follows:

                              +---------+
        +---------+           | Network |         +--------+
        | server1 |-----------+ swtich  +---------|server2 |
        +---------+           | (sw0)   |         +--------+
                              +----+----+
                                   |
                                   |
                         +---------+----------+
                         | wks01 Linux/OSX    |
                         +--------------------+

Where,

    wks01 is your computer either running Linux/OS X or Unix like operating system. It is used for scanning your local network. The nmap command must be installed on this computer.
    server1 can be powered by Linux / Unix / MS-Windows operating systems. This is an unpatched server. Feel free to install a few services such as a web-server, file server and so on.
    server2 can be powered by Linux / Unix / MS-Windows operating systems. This is a fully patched server with firewall. Again, feel free to install few services such as a web-server, file server and so on.
    All three systems are connected via switch.

How do I install nmap?

See:

    Debian / Ubuntu Linux: Install nmap Software For Scanning Network
    CentOS / RHEL: Install nmap Network Security Scanner
    OpenBSD: Install nmap Network Security Scanner

#1: Scan a single host or an IP address (IPv4)

### Scan a single ip address ###
nmap 192.168.1.1
 
## Scan a host name ###
nmap server1.cyberciti.biz
 
## Scan a host name with more info###
nmap -v server1.cyberciti.biz
 

Sample outputs:
Fig.01: nmap output

Fig.01: nmap output

#2: Scan multiple IP address or subnet (IPv4)

nmap 192.168.1.1 192.168.1.2 192.168.1.3
## works with same subnet i.e. 192.168.1.0/24
nmap 192.168.1.1,2,3

You can scan a range of IP address too:

nmap 192.168.1.1-20

You can scan a range of IP address using a wildcard:

nmap 192.168.1.*

Finally, you scan an entire subnet:

nmap 192.168.1.0/24

#3: Read list of hosts/networks from a file (IPv4)

The -iL option allows you to read the list of target systems using a text file. This is useful to scan a large number of hosts/networks. Create a text file as follows:
cat > /tmp/test.txt
Sample outputs:

server1.cyberciti.biz
| 192.168.1.0/24
| 192.168.1.1/24
| 10.1.2.3
localhost

The syntax is:

nmap -iL /tmp/test.txt

#4: Excluding hosts/networks (IPv4)

When scanning a large number of hosts/networks you can exclude hosts from a scan:

nmap 192.168.1.0/24 --exclude 192.168.1.5
nmap 192.168.1.0/24 --exclude 192.168.1.5,192.168.1.254

OR exclude list from a file called /tmp/exclude.txt

nmap -iL /tmp/scanlist.txt --excludefile /tmp/exclude.txt

#5: Turn on OS and version detection scanning script (IPv4)

nmap -A 192.168.1.254
nmap -v -A 192.168.1.1
nmap -A -iL /tmp/scanlist.txt 

#6: Find out if a host/network is protected by a firewall

nmap -sA 192.168.1.254
nmap -sA server1.cyberciti.biz

#7: Scan a host when protected by the firewall

nmap -PN 192.168.1.1
nmap -PN server1.cyberciti.biz

#8: Scan an IPv6 host/address

The -6 option enable IPv6 scanning. The syntax is:

nmap -6 IPv6-Address-Here
nmap -6 server1.cyberciti.biz
nmap -6 2607:f0d0:1002:51::4
nmap -v A -6 2607:f0d0:1002:51::4

#9: Scan a network and find out which servers and devices are up and running

This is known as host discovery or ping scan:

nmap -sP 192.168.1.0/24

Sample outputs:

Host 192.168.1.1 is up (0.00035s latency).
MAC Address: BC:AE:C5:C3:16:93 (Unknown)
Host 192.168.1.2 is up (0.0038s latency).
MAC Address: 74:44:01:40:57:FB (Unknown)
Host 192.168.1.5 is up.
Host nas03 (192.168.1.12) is up (0.0091s latency).
MAC Address: 00:11:32:11:15:FC (Synology Incorporated)
Nmap done: 256 IP addresses (4 hosts up) scanned in 2.80 second

#10: How do I perform a fast scan?

nmap -F 192.168.1.1

#11: Display the reason a port is in a particular state

nmap --reason 192.168.1.1
nmap --reason server1.cyberciti.biz

#12: Only show open (or possibly open) ports

nmap --open 192.168.1.1
nmap --open server1.cyberciti.biz

#13: Show all packets sent and received

nmap --packet-trace 192.168.1.1
nmap --packet-trace server1.cyberciti.biz

14#: Show host interfaces and routes

This is useful for debugging (ip command or route command or netstat command like output using nmap)

nmap --iflist

Sample outputs:

| Starting Nmap 5.00 ( http://nmap.org ) at 2012-11-27 02:01 IST
| ************************INTERFACES************************
| DEV    (SHORT)  IP/MASK          TYPE        UP MAC
| lo     (lo)     127.0.0.1/8      loopback    up
| eth0   (eth0)   192.168.1.5/24   ethernet    up B8:AC:6F:65:31:E5
| vmnet1 (vmnet1) 192.168.121.1/24 ethernet    up 00:50:56:C0:00:01
| vmnet8 (vmnet8) 192.168.179.1/24 ethernet    up 00:50:56:C0:00:08
| ppp0   (ppp0)   10.1.19.69/32    point2point up
|  
| **************************ROUTES**************************
| DST/MASK         DEV    GATEWAY
| 10.0.31.178/32   ppp0
| 209.133.67.35/32 eth0   192.168.1.2
| 192.168.1.0/0    eth0
| 192.168.121.0/0  vmnet1
| 192.168.179.0/0  vmnet8
| 169.254.0.0/0    eth0
| 10.0.0.0/0       ppp0
| 0.0.0.0/0        eth0   192.168.1.2
 

#15: How do I scan specific ports?

map -p [port] hostName
## Scan port 80
nmap -p 80 192.168.1.1
 
## Scan TCP port 80
nmap -p T:80 192.168.1.1
 
## Scan UDP port 53
nmap -p U:53 192.168.1.1
 
## Scan two ports ##
nmap -p 80,443 192.168.1.1
 
## Scan port ranges ##
nmap -p 80-200 192.168.1.1
 
## Combine all options ##
nmap -p U:53,111,137,T:21-25,80,139,8080 192.168.1.1
nmap -p U:53,111,137,T:21-25,80,139,8080 server1.cyberciti.biz
nmap -v -sU -sT -p U:53,111,137,T:21-25,80,139,8080 192.168.1.254
 
## Scan all ports with * wildcard ##
nmap -p "*" 192.168.1.1
 
## Scan top ports i.e. scan $number most common ports ##
nmap --top-ports 5 192.168.1.1
nmap --top-ports 10 192.168.1.1
 

Sample outputs:

Starting Nmap 5.00 ( http://nmap.org ) at 2012-11-27 01:23 IST
Interesting ports on 192.168.1.1:
PORT     STATE  SERVICE
21/tcp   closed ftp
22/tcp   open   ssh
23/tcp   closed telnet
25/tcp   closed smtp
80/tcp   open   http
110/tcp  closed pop3
139/tcp  closed netbios-ssn
443/tcp  closed https
445/tcp  closed microsoft-ds
3389/tcp closed ms-term-serv
MAC Address: BC:AE:C5:C3:16:93 (Unknown)
 
Nmap done: 1 IP address (1 host up) scanned in 0.51 seconds
 

#16: The fastest way to scan all your devices/computers for open ports ever

nmap -T5 192.168.1.0/24

#17: How do I detect remote operating system?

You can identify a remote host apps and OS using the -O option:

 
nmap -O 192.168.1.1
nmap -O  --osscan-guess 192.168.1.1
nmap -v -O --osscan-guess 192.168.1.1

Sample outputs:

Starting Nmap 5.00 ( http://nmap.org ) at 2012-11-27 01:29 IST
NSE: Loaded 0 scripts for scanning.
Initiating ARP Ping Scan at 01:29
Scanning 192.168.1.1 [1 port]
Completed ARP Ping Scan at 01:29, 0.01s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 01:29
Completed Parallel DNS resolution of 1 host. at 01:29, 0.22s elapsed
Initiating SYN Stealth Scan at 01:29
Scanning 192.168.1.1 [1000 ports]
Discovered open port 80/tcp on 192.168.1.1
Discovered open port 22/tcp on 192.168.1.1
Completed SYN Stealth Scan at 01:29, 0.16s elapsed (1000 total ports)
Initiating OS detection (try #1) against 192.168.1.1
Retrying OS detection (try #2) against 192.168.1.1
Retrying OS detection (try #3) against 192.168.1.1
Retrying OS detection (try #4) against 192.168.1.1
Retrying OS detection (try #5) against 192.168.1.1
Host 192.168.1.1 is up (0.00049s latency).
Interesting ports on 192.168.1.1:
Not shown: 998 closed ports
PORT   STATE SERVICE
22/tcp open  ssh
80/tcp open  http
MAC Address: BC:AE:C5:C3:16:93 (Unknown)
Device type: WAP|general purpose|router|printer|broadband router
Running (JUST GUESSING) : Linksys Linux 2.4.X (95%), Linux 2.4.X|2.6.X (94%), MikroTik RouterOS 3.X (92%), Lexmark embedded (90%), Enterasys embedded (89%), D-Link Linux 2.4.X (89%), Netgear Linux 2.4.X (89%)
Aggressive OS guesses: OpenWrt White Russian 0.9 (Linux 2.4.30) (95%), OpenWrt 0.9 - 7.09 (Linux 2.4.30 - 2.4.34) (94%), OpenWrt Kamikaze 7.09 (Linux 2.6.22) (94%), Linux 2.4.21 - 2.4.31 (likely embedded) (92%), Linux 2.6.15 - 2.6.23 (embedded) (92%), Linux 2.6.15 - 2.6.24 (92%), MikroTik RouterOS 3.0beta5 (92%), MikroTik RouterOS 3.17 (92%), Linux 2.6.24 (91%), Linux 2.6.22 (90%)
No exact OS matches for host (If you know what OS is running on it, see http://nmap.org/submit/ ).
TCP/IP fingerprint:
OS:SCAN(V=5.00%D=11/27%OT=22%CT=1%CU=30609%PV=Y%DS=1%G=Y%M=BCAEC5%TM=50B3CA
OS:4B%P=x86_64-unknown-linux-gnu)SEQ(SP=C8%GCD=1%ISR=CB%TI=Z%CI=Z%II=I%TS=7
OS:)OPS(O1=M2300ST11NW2%O2=M2300ST11NW2%O3=M2300NNT11NW2%O4=M2300ST11NW2%O5
OS:=M2300ST11NW2%O6=M2300ST11)WIN(W1=45E8%W2=45E8%W3=45E8%W4=45E8%W5=45E8%W
OS:6=45E8)ECN(R=Y%DF=Y%T=40%W=4600%O=M2300NNSNW2%CC=N%Q=)T1(R=Y%DF=Y%T=40%S
OS:=O%A=S+%F=AS%RD=0%Q=)T2(R=N)T3(R=N)T4(R=Y%DF=Y%T=40%W=0%S=A%A=Z%F=R%O=%R
OS:D=0%Q=)T5(R=Y%DF=Y%T=40%W=0%S=Z%A=S+%F=AR%O=%RD=0%Q=)T6(R=Y%DF=Y%T=40%W=
OS:0%S=A%A=Z%F=R%O=%RD=0%Q=)T7(R=N)U1(R=Y%DF=N%T=40%IPL=164%UN=0%RIPL=G%RID
OS:=G%RIPCK=G%RUCK=G%RUD=G)IE(R=Y%DFI=N%T=40%CD=S)
Uptime guess: 12.990 days (since Wed Nov 14 01:44:40 2012)
Network Distance: 1 hop
TCP Sequence Prediction: Difficulty=200 (Good luck!)
IP ID Sequence Generation: All zeros
Read data files from: /usr/share/nmap
OS detection performed. Please report any incorrect results at http://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 12.38 seconds
           Raw packets sent: 1126 (53.832KB) | Rcvd: 1066 (46.100KB)

See also: Fingerprinting a web-server and a dns server command line tools for more information.
#18: How do I detect remote services (server / daemon) version numbers?

nmap -sV 192.168.1.1

Sample outputs:

Starting Nmap 5.00 ( http://nmap.org ) at 2012-11-27 01:34 IST
Interesting ports on 192.168.1.1:
Not shown: 998 closed ports
PORT   STATE SERVICE VERSION
22/tcp open  ssh     Dropbear sshd 0.52 (protocol 2.0)
80/tcp open  http?
1 service unrecognized despite returning data.

#19: Scan a host using TCP ACK (PA) and TCP Syn (PS) ping

If firewall is blocking standard ICMP pings, try the following host discovery methods:

nmap -PS 192.168.1.1
nmap -PS 80,21,443 192.168.1.1
nmap -PA 192.168.1.1
nmap -PA 80,21,200-512 192.168.1.1

#20: Scan a host using IP protocol ping

nmap -PO 192.168.1.1

#21: Scan a host using UDP ping

This scan bypasses firewalls and filters that only screen TCP:

nmap -PU 192.168.1.1
nmap -PU 2000.2001 192.168.1.1

#22: Find out the most commonly used TCP ports using TCP SYN Scan

 
### Stealthy scan ###
nmap -sS 192.168.1.1
 
### Find out the most commonly used TCP ports using  TCP connect scan (warning: no stealth scan)
###  OS Fingerprinting ###
nmap -sT 192.168.1.1
 
### Find out the most commonly used TCP ports using TCP ACK scan
nmap -sA 192.168.1.1
 
### Find out the most commonly used TCP ports using TCP Window scan
nmap -sW 192.168.1.1
 
### Find out the most commonly used TCP ports using TCP Maimon scan
nmap -sM 192.168.1.1
 

#23: Scan a host for UDP services (UDP scan)

Most popular services on the Internet run over the TCP protocol. DNS, SNMP, and DHCP are three of the most common UDP services. Use the following syntax to find out UDP services:

nmap -sU nas03
nmap -sU 192.168.1.1

Sample outputs:

 
Starting Nmap 5.00 ( http://nmap.org ) at 2012-11-27 00:52 IST
Stats: 0:05:29 elapsed; 0 hosts completed (1 up), 1 undergoing UDP Scan
UDP Scan Timing: About 32.49% done; ETC: 01:09 (0:11:26 remaining)
Interesting ports on nas03 (192.168.1.12):
Not shown: 995 closed ports
PORT     STATE         SERVICE
111/udp  open|filtered rpcbind
123/udp  open|filtered ntp
161/udp  open|filtered snmp
2049/udp open|filtered nfs
5353/udp open|filtered zeroconf
MAC Address: 00:11:32:11:15:FC (Synology Incorporated)
 
Nmap done: 1 IP address (1 host up) scanned in 1099.55 seconds
 

#24: Scan for IP protocol

This type of scan allows you to determine which IP protocols (TCP, ICMP, IGMP, etc.) are supported by target machines:

nmap -sO 192.168.1.1

#25: Scan a firewall for security weakness

The following scan types exploit a subtle loophole in the TCP and good for testing security of common attacks:

 
## TCP Null Scan to fool a firewall to generate a response ##
## Does not set any bits (TCP flag header is 0) ##
nmap -sN 192.168.1.254
 
## TCP Fin scan to check firewall ##
## Sets just the TCP FIN bit ##
nmap -sF 192.168.1.254
 
## TCP Xmas scan to check firewall ##
## Sets the FIN, PSH, and URG flags, lighting the packet up like a Christmas tree ##
nmap -sX 192.168.1.254
 

See how to block Xmas packkets, syn-floods and other conman attacks with iptables.
#26: Scan a firewall for packets fragments

The -f option causes the requested scan (including ping scans) to use tiny fragmented IP packets. The idea is to split up the TCP header over
several packets to make it harder for packet filters, intrusion detection systems, and other annoyances to detect what you are doing.

nmap -f 192.168.1.1
nmap -f fw2.nixcraft.net.in
nmap -f 15 fw2.nixcraft.net.in
## Set your own offset size with the --mtu option ##
nmap --mtu 32 192.168.1.1

#27: Cloak a scan with decoys

The -D option it appear to the remote host that the host(s) you specify as decoys are scanning the target network too. Thus their IDS might report 5-10 port scans from unique IP addresses, but they won't know which IP was scanning them and which were innocent decoys:

nmap -n -Ddecoy-ip1,decoy-ip2,your-own-ip,decoy-ip3,decoy-ip4 remote-host-ip
nmap -n -D192.168.1.5,10.5.1.2,172.1.2.4,3.4.2.1 192.168.1.5

#28: Scan a firewall for MAC address spoofing

 
### Spoof your MAC address ##
nmap --spoof-mac MAC-ADDRESS-HERE 192.168.1.1
 
### Add other options ###
nmap -v -sT -PN --spoof-mac MAC-ADDRESS-HERE 192.168.1.1
 
 
### Use a random MAC address ###
### The number 0, means nmap chooses a completely random MAC address ###
nmap -v -sT -PN --spoof-mac 0 192.168.1.1
 

#29: How do I save output to a text file?

The syntax is:

nmap 192.168.1.1 > output.txt
nmap -oN /path/to/filename 192.168.1.1
nmap -oN output.txt 192.168.1.1

#30: Not a fan of command line tools?

Try zenmap the official network mapper front end:

    Zenmap is the official Nmap Security Scanner GUI. It is a multi-platform (Linux, Windows, Mac OS X, BSD, etc.) free and open source application which aims to make Nmap easy for beginners to use while providing advanced features for experienced Nmap users. Frequently used scans can be saved as profiles to make them easy to run repeatedly. A command creator allows interactive creation of Nmap command lines. Scan results can be saved and viewed later. Saved scan results can be compared with one another to see how they differ. The results of recent scans are stored in a searchable database.

You can install zenmap using the following apt-get command:
$ sudo apt-get install zenmap
Sample outputs:

[sudo] password for vivek:
Reading package lists... Done
Building dependency tree
Reading state information... Done
The following NEW packages will be installed:
  zenmap
0 upgraded, 1 newly installed, 0 to remove and 11 not upgraded.
Need to get 616 kB of archives.
After this operation, 1,827 kB of additional disk space will be used.
Get:1 http://debian.osuosl.org/debian/ squeeze/main zenmap amd64 5.00-3 [616 kB]
Fetched 616 kB in 3s (199 kB/s)
Selecting previously deselected package zenmap.
(Reading database ... 281105 files and directories currently installed.)
Unpacking zenmap (from .../zenmap_5.00-3_amd64.deb) ...
Processing triggers for desktop-file-utils ...
Processing triggers for gnome-menus ...
Processing triggers for man-db ...
Setting up zenmap (5.00-3) ...
Processing triggers for python-central ...

Type the following command to start zenmap:
$ sudo zenmap
Sample outputs


	32.4
```
