---
type: reference
title: "Host name, hostname"
description: Section 2 of the legacy KB_Linux notes.
tags: [kb-linux]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "linux/KB_Linux#2"
---

# Host name, hostname

[↑ KB_Linux](/linux/kb-linux/README.md)

## 2.1 How to change the hostname of a Linux system

```text
Normally we will set the hostname of a system during the installation process. Many peoples don’t care about this, and don’t change the hostname even if for example this was set to something really stupid by the datacenter that installed the system (most likely they will set this to “debian” on any debian installation, etc). For me, it is important to see on each one of the ssh screens I will have open at any time a different hostname that is relevant and will give me quickly the information on what system I am logged in.
```

### 2.1.1 Change the hostname on a running system

```text
On any Linux system you can change its hostname with the command ‘hostname‘ (surprised?)… Here are some quick usages of the command line hostname:
hostname
without any parameter it will output the current hostname of the system.
hostname --fqd
it will output the fully qualified domain name (or FQDN) of the system.
hostname NEW_NAME
will set the hostname of the system to NEW_NAME. This is active right away and will remain like that until the system will be rebooted (because at system boot it will set this from some particular file configurations – see bellow how to set this permanently). You will most probably need to exit the current shell in order to see the change in your shell prompt.
```

### 2.1.2 Permanent hostname change on Debian based systems

```text
Debian based systems use the file /etc/hostname to read the hostname of the system at boot time and set it up using the init script /etc/init.d/hostname.sh
/etc/hostname
server
So on a Debian based system we can edit the file /etc/hostname and change the name of the system and then run:
/etc/init.d/hostname.sh start
to make the change active. The hostname saved in this file (/etc/hostname) will be preserved on system reboot (and will be set using the same script we used hostname.sh).
```

### 2.1.3 Permanent hostname change on RedHat based systems

```text
RedHat based system use the file /etc/sysconfig/network to read the saved hostname at system boot. This is set using the init script /etc/rc.d/rc.sysinit
/etc/sysconfig/network
NETWORKING=yes
HOSTNAME="plain.domainname.com"
GATEWAY="192.168.0.1"
GATEWAYDEV="eth0"
FORWARD_IPV4="yes"
So in order to preserve your change on system reboot edit this file and enter the appropriate name using the HOSTNAME variable.
```

### 2.1.4 Use sysctl to change the hostname

```text
Why would someone need a different method of doing the same thing as above? No idea, but here is anyway: use sysctl to change the variable kernel.hostname:
Use:
sysctl kernel.hostname
to read the current hostname, and
sysctl kernel.hostname=NEW_HOSTNAME
to change it.

		2.1.5

	2.2
```
