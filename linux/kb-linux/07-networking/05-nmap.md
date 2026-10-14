---
type: reference
title: nmap
description: Subsection 7.5 of Networking.
tags: [kb-linux]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "linux/KB_Linux#7.5"
---

# 7.5 nmap

[↑ Networking](/linux/kb-linux/07-networking/README.md)

### 7.5.1 Linux / UNIX: Scanning network for open ports with nmap command

```text
by Vivek Gite on July 5, 2005 · 5 comments· Last updated August 12, 2007

You can use nmap tool for this job. It is flexible in specifying targets. User can scan entire network or selected host or single server. Nmap is also useful to test your firewall rules. namp is metwork exploration tool and security / port scanner. According to nmap man page:
It is an open source tool for network exploration and security auditing. It was designed to rapidly scan large networks, although it works fine against single hosts. Nmap uses raw IP packets in novel ways to determine what hosts are available on the network, what services (application name and version) those hosts are offering, what operating systems (and OS versions) they are running, what type of packet filters/firewalls are in use, and dozens of other characteristics. While Nmap is commonly used for security audits, many systems and network administrators find it useful for routine tasks such as network inventory, managing service upgrade schedules, and monitoring host or service uptime.
nmap port scanning

TCP Connect scanning for localhost and network 192.168.0.0/24
# nmap -v -sT localhost
# nmap -v -sT 192.168.0.0/24
nmap TCP SYN (half-open) scanning

# nmap -v -sS localhost
# nmap -v -sS 192.168.0.0/24
nmap TCP FIN scanning

# nmap -v -sF localhost
# nmap -v -sF 192.168.0.0/24
nmap TCP Xmas tree scanning

Useful to see if firewall protecting against this kind of attack or not:
# nmap -v -sX localhost
# nmap -v -sX 192.168.0.0/24
nmap TCP Null scanning

Useful to see if firewall protecting against this kind attack or not:
# nmap -v -sN localhost
# nmap -v -sN 192.168.0.0/24
nmap TCP Windows scanning

# nmap -v -sW localhost
# nmap -v -sW 192.168.0.0/24
nmap TCP RPC scanning

Useful to find out RPC (such as portmap) services
# nmap -v -sR localhost
# nmap -v -sR 192.168.0.0/24
nmap UDP scanning

Useful to find out UDP ports
# nmap -v -O localhost
# nmap -v -O 192.168.0.0/24
nmap remote software version scanning

You can also find out what software version opening the port.
# nmap -v -sV localhost
# nmap -v -sV 192.168.0.0/24
A note about Windows XP / 2003 / Vista version

Windows user can find ipEye and IPSecScan utilities useful. Please note that Nmap also runes on Windows OS.

Read the man page of nmap for more information:
$ man nmap

	7.6
```
