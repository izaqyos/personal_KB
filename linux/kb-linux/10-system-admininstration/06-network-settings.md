---
type: reference
title: Network settings
description: Subsection 10.6 of System admininstration.
tags: [kb-linux]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "linux/KB_Linux#10.6"
---

# 10.6 Network settings

[↑ System admininstration](/linux/kb-linux/10-system-admininstration/README.md)

### 10.6.1 Linux Static IP Address Configuration

```text
How do I configure the Internet Protocol version 4 (IPv4) properties of a network connection with a static IP address for servers running Linux operating systems? How do I configure static IP address under Debian Linux or Redhat / RHEL / Fedora / Redhat Enterprise Linux server?

You need to update and/or edit the network configuration files. This tutorial provides procedures to configure a static IP address on a computer running the following operating systems:

RHEL / Red hat / Fedora / CentOS Linux eth0 config file - /etc/sysconfig/network-scripts/ifcfg-eth0
RHEL / Red hat / Fedora / CentOS Linux eth1 config file - /etc/sysconfig/network-scripts/ifcfg-eth1
Debian / Ubuntu Linux - /etc/network/interfaces
Sample Setup: Linux Static TCP/IP Settings

In this example you will use the following Internet Protocol Version 4 (TCP/IPv4) Properties including IP, default gateway, and preferred DNS servers:


IP address: 192.168.1.10
Netmask: 255.255.255.0
Hostname: server1.cyberciti.biz
Domain name: cyberciti.biz
Gateway IP: 192.168.1.254
DNS Server IP # 1: 192.168.1.254
DNS Server IP # 2: 8.8.8.8
DNS Server IP # 3: 202.54.2.5
RHEL / Red hat / Fedora / CentOS Linux Static IP Configuration


For static IP configuration you need to edit the following files using a text editor such as vi. Edit /etc/sysconfig/network as follows, enter:
# cat /etc/sysconfig/network

Sample static ip configuration:

 
NETWORKING=yes
HOSTNAME=server1.cyberciti.biz
GATEWAY=192.168.1.254
 
Edit /etc/sysconfig/network-scripts/ifcfg-eth0, enter:
# cat /etc/sysconfig/network-scripts/ifcfg-eth0

Sample static ip configuration:

 
# Intel Corporation 82573E Gigabit Ethernet Controller (Copper)
DEVICE=eth0
BOOTPROTO=static
DHCPCLASS=
HWADDR=00:30:48:56:A6:2E
IPADDR=192.168.1.10
NETMASK=255.255.255.0
ONBOOT=yes
 
Edit /etc/resolv.conf and setup DNS servers, enter:
# cat /etc/resolv.conf

Sample static IP configurations:

 
search cyberciti.biz
nameserver 192.168.1.254
nameserver 8.8.8.8
nameserver 202.54.2.5
 
Finally, you need to restart the networking service, enter:
# /etc/init.d/network restart

To verify new static ip configuration for eth0, enter:
# ifconfig eth0
# route -n
# ping 192.168.1.254
# ping google.com

Debian / Ubuntu Linux Static IP Configuration


Edit /etc/hostname, enter:
# cat /etc/hostname

Sample ip config:

 
server1.cyberciti.biz
 
Edit /etc/network/interfaces, enter:
# cat /etc/network/interfaces

Sample static ip config:

 
iface eth0 inet static
     address 192.168.1.10
     network 192.168.1.0
     netmask 255.255.255.0
     broadcast 192.168.1.255
     gateway 192.168.1.254
 
Edit /etc/resolv.conf and setup DNS servers, enter:
# cat /etc/resolv.conf

Sample dns static IP configurations:

 
search cyberciti.biz
nameserver 192.168.1.254
nameserver 8.8.8.8
nameserver 202.54.2.5
 
Finally, you need to restart the networking service under Debian / Ubuntu Linux, enter:
# /etc/init.d/networking restart

Type the following commands to verify your new setup, enter:
# ifconfig eth0
# route -n
# ping google.com

		10.6.2
	10.7
```
