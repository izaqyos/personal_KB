---
type: reference
title: Verifying Which Ports Are Listening
description: Subsection 7.1 of Networking.
tags: [kb-linux]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "linux/KB_Linux#7.1"
---

# 7.1 Verifying Which Ports Are Listening

[↑ Networking](/linux/kb-linux/07-networking/README.md)

```text
Once you have configured services on the network, it is important to keep tabs on which ports are actually listening on the system's network interfaces. Any open ports can be evidence of an intrusion.

There are two basic approaches for listing the ports that are listening on the network. The less reliable approach is to query the network stack by typing commands such as netstat -an or usof -i. This method is less reliable since these programs do not connect to the machine from the network, but rather check to see what is running on the system. For this reason, these applications are frequent targets for replacement by attackers. In this way, crackers attempt to cover their tracks if they open unauthorized network ports.

A more reliable way to check which ports are listening on the network is to use a port scanner such as nmap.

The following command issued from the console determines which ports are listening for TCP connections from the network:

nmap -sT -O localhost

The output of this command looks like the following:

Starting nmap V. 3.00 ( www.insecure.org/nmap/ )
Interesting ports on localhost.localdomain (127.0.0.1):
(The 1596 ports scanned but not shown below are in state: closed)
Port       State       Service
22/tcp     open        ssh
111/tcp    open        sunrpc
515/tcp    open        printer
834/tcp    open        unknown
6000/tcp   open        X11
Remote OS guesses: Linux Kernel 2.4.0 or Gentoo 1.2 Linux 2.4.19 rc1-rc7)

Nmap run completed -- 1 IP address (1 host up) scanned in 5 seconds

This output shows the system is running portmap due to the presence of the sunrpc service. However, there is also a mystery service on port 834. To check if the port is associated with the official list of known services, type:

cat /etc/services | grep 834

This command returns no output. This indicates that while the port is in the reserved range (meaning 0 through 1023) and requires root access to open, it is not associated with a known service.

Next, you can check for information about the port using netstat or lsof. To check for port 834 using netstat, use the following command:

netstat -anp | grep 834

The command returns the following output:

tcp   0    0 0.0.0.0:834    0.0.0.0:*   LISTEN   653/ypbind

The presence of the open port in netstat is reassuring because a cracker opening a port surreptitiously on a hacked system would likely not allow it to be revealed through this command. Also, the [p] option reveals the process id (PID) of the service which opened the port. In this case the open port belongs to ypbind (NIS), which is an RPC service handled in conjunction with the portmap service.

The lsof command reveals similar information since it is also capable of linking open ports to services:

lsof -i | grep 834

Below is the relevant portion of the output for this command:

ypbind      653        0    7u  IPv4       1319                 TCP *:834 (LISTEN)
ypbind      655        0    7u  IPv4       1319                 TCP *:834 (LISTEN)
ypbind      656        0    7u  IPv4       1319                 TCP *:834 (LISTEN)
ypbind      657        0    7u  IPv4       1319                 TCP *:834 (LISTEN)

As you can see, these tools can reveal a great about the status of the services running on a machine. These tools are flexible and can provide a wealth of information about network services and configuration. Consulting the man pages for lsof, netstat, nmap, and services is therefore highly recommended
```
