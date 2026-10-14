---
type: reference
title: Useful tools
description: Section 9 of the legacy NetworkKB notes.
tags: [kb-network]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
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

```text
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
```
