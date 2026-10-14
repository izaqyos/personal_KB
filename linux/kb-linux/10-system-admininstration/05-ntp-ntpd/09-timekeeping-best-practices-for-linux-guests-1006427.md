---
type: reference
title: Timekeeping best practices for Linux guests (1006427)
description: VMware knowledge base article on timekeeping best practices for Linux guests.
tags: [ntp, linux, reference, third-party, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "linux/KB_Linux#10.5.11"
---

# 10.5.11 Timekeeping best practices for Linux guests (1006427)

[↑ NTP, NTPD](/linux/kb-linux/10-system-admininstration/05-ntp-ntpd/README.md)

```text
http://kb.vmware.com/selfservice/microsites/search.do?language=en_US&cmd=displayKC&externalId=1006427
Purpose
This article presents best practices for Linux timekeeping. These recommendations include specifics on the particular kernel command line options to use for the Linux operating system of interest. There is also a description of the recommended settings and usage for NTP time sync, configuration of VMware Tools time synchronization, and Virtual Hardware Clock configuration, to achieve best timekeeping results.

Resolution
Linux Timekeeping Best Practices

Notes:

    When both SMP and UP kernels are available, they must be applied to the appropriate SMP and UP virtual machines, otherwise a mismatch may cause time to drift.
    The recommended kernel parameters must be added to the kernel parameters already configured by the distribution.


32-bit Kernels

Linux Flavor 	Version 	Kernel Parameters 	Notes
RHEL 	RHEL 6.x 		No additional kernel parameters required.
RHEL 5.8 		No additional kernel parameters required. See the note below about the optional use of divider=10.
RHEL 5.7 		No additional kernel parameters required. See the note below about the optional use of divider=10.
RHEL 5.6 		No additional kernel parameters required. See the note below about the optional use of divider=10.
RHEL 5.5 		No additional kernel parameters required. See the note below about the optional use of divider=10.
RHEL 5.4 		No additional kernel parameters required. See the note below about the optional use of divider=10.
RHEL 5.3 	divider=10 clocksource=acpi_pm 	
RHEL 5.2 	divider=10 clocksource=acpi_pm 	
RHEL 5.1 	divider=10 clocksource=acpi_pm 	
RHEL 5.0 	clocksource=acpi_pm 	
RHEL 4.9 	clock=pmtmr
divider=10
hpet=disable 	
RHEL 4.8 	clock=pmtmr
divider=10
hpet=disable 	
RHEL 4.7 	clock=pmtmr
divider=10
hpet=disable 	
RHEL 4.6 	clock=pmtmr
hpet=disable 	
RHEL 4.5 	clock=pmtmr
hpet=disable 	
RHEL 4.4 	clock=pmtmr
hpet=disable 	
RHEL 4.3 	clock=pmtmr
hpet=disable 	
RHEL 4.2 	clock=pmtmr
hpet=disable 	
RHEL 4.1 	clock=pmtmr
hpet=disable 	
RHEL 4.0 	clock=pmtmr
hpet=disable 	
RHEL 3 (All updates) 		No additional kernel parameters required.
RHEL 2.1 		No additional kernel parameters required.
Redhat 	Redhat 9.0 		No additional kernel parameters required.
Redhat 8.0 		No additional kernel parameters required.
Redhat 7.3 		No additional kernel parameters required.
Redhat 7.2 		No additional kernel parameters required.
Redhat 7.1 		No additional kernel parameters required.
Redhat 7.0 		No additional kernel parameters required.
Redhat 6.2 		No additional kernel parameters required.
SLES 	SLES 11 (All updates) 		No additional kernel parameters required.
SLES 10 SP4 on ESX 5.0 and later 	clock=pmtmr
hpet=disable 	
SLES 10 SP4 on ESX 4.x 		Use a VMI enabled kernel.
SLES 10 SP3 on ESXi 5.0 	clock=pmtmr
hpet=disable 	
SLES 10 SP3 on ESX 3.5 and 4.x 		Use a VMI enabled kernel.
SLES 10 SP3 on ESX 3.0.x and earlier 	clock=pmtmr
hpet=disable 	
SLES 10 SP2 on ESXi 5.0 	clock=pmtmr
hpet=disable 	
SLES 10 SP2 on ESX 3.5 and 4.x 		Use a VMI enabled kernel.
SLES 10 SP2 on ESX 3.0.x and earlier 	clock=pmtmr
hpet=disable 	
SLES 10 SP1 	clock=pmtmr
hpet=disable 	
SLES 10 	clock=pmtmr
hpet=disable 	
SLES 9 (All updates) 	clock=pmtmr
hpet=disable 	
SLES 8 		No additional kernel parameters required.
SLES 7 		No additional kernel parameters required.
SLED 	SLED 11 		No additional kernel parameters required.
SLED 10 	clock=pmtmr
hpet=disable 	
SLED 9 	clock=pmtmr
hpet=disable 	
Suse Linux 	Suse Linux 10.3 	clocksource=acpi_pm 	
Suse Linux 10.2 	clocksource=acpi_pm 	
Suse Linux 10.1 	clock=pmtmr
hpet=disable 	
Suse Linux 10 	clock=pmtmr
hpet=disable 	
Suse Linux 9.3 	clock=pmtmr
hpet=disable 	
Suse Linux 9.2 	clock=pmtmr
hpet=disable 	
Suse Linux 9.1 	clock=pmtmr
hpet=disable 	
Suse Linux 9.0 		Remove desktop kernel command line parameter.
Suse Linux 8.2 		No additional kernel parameters required.
Suse Linux 8.1 		No additional kernel parameters required.
Suse Linux 8.0 		No additional kernel parameters required.
Suse Linux 7.3 		No additional kernel parameters required.
Ubuntu 	Ubuntu 12.04 		No additional kernel parameters required.
Ubuntu 11.10 		No additional kernel parameters required.
Ubuntu 11.04 		No additional kernel parameters required.
Ubuntu 10.10 		No additional kernel parameters required.
Ubuntu 10.04 		No additional kernel parameters required.
Ubuntu 9.10 		No additional kernel parameters required.
Ubuntu 9.04 with kernel 2.6.28-7.18 or later on ESX 4.0 or later 		No additional kernel parameters required.
Ubuntu 9.04 with kernel prior to 2.6.28-7.18 on ESX 4.0 or later 		Avoid using if possible. May cause guest operating system to stop responding.
Ubuntu 8.10 with kernel 2.6.27-12.28 or later on ESX 4.0 or later 		No additional kernel parameters required.
Ubuntu 8.10 with kernel prior to 2.6.27-12.28 on ESX 4.0 or later 		Avoid using if possible. May cause guest operating system to stop responding.
Ubuntu 8.10 	clocksource=acpi_pm 	
Ubuntu 8.04 on ESXi 5.0 	clocksource=acpi_pm 	
Ubuntu 8.04 on ESX 3.5 and 4.x 		Use a VMI enabled kernel.
Ubuntu 8.04 on ESX 3.0.x and earlier 	clocksource=acpi_pm 	
Ubuntu 7.10 	clocksource=acpi_pm 	
Ubuntu 7.04 	clocksource=acpi_pm 	
Ubuntu 6.10 	clock=pmtmr
hpet=disable 	
Ubuntu 6.06 	clock=pmtmr
hpet=disable 	
Ubuntu 5.10 	clock=pmtmr
hpet=disable 	
Ubuntu 5.04 	clock=pmtmr
hpet=disable 	
Mandriva 	Mandriva Corporate Desktop 4.0 	clock=pmtmr
hpet=disable 	
Mandriva Corporate Server 4 	clock=pmtmr
hpet=disable 	
Mandriva Linux 2008 	clocksource=acpi_pm 	
Mandriva Linux 2007 	clock=pmtmr
hpet=disable 	
Mandriva Linux 2006 	clock=pmtmr
hpet=disable 	
Mandrake 10.1 		Does not support pmtmr. Avoid using if possible.
Mandrake 10 		Does not support pmtmr. Avoid using if possible.
Mandrake 9.2 		No additional kernel parameters required.
Mandrake 9.1 		No additional kernel parameters required.
Mandrake 9.0 		No additional kernel parameters required.
Mandrake 8.2 		No additional kernel parameters required.
Mandrake 8.1 		No additional kernel parameters required.
Mandrake 8.0 		No additional kernel parameters required.
Turbolinux 	Turbolinux 10 Desktop 		Does not support pmtmr. Avoid using if possible.
Turbolinux 10 Server 	clock=pmtmr
hpet=disable 	
Turbolinux Enterprise 8 		No additional kernel parameters required.
Turbolinux Workstation 8 		No additional kernel parameters required.
Turbolinux 7.0 		No additional kernel parameters required.
Asianux 	Asianux Server 4 (all updates) 		No additional kernel parameters required.
Asianux 3.0 SP4 		No additional kernel parameters required.
Asianux 3.0 SP3 		No additional kernel parameters required.
Asianux 3.0 SP2 		No additional kernel parameters required.
Asianux 3.0 SP1 		No additional kernel parameters required. Use kernel 2.6.18-53.17AXS3 or later.
Asianux 3.0 	divider=10 clocksource=acpi_pm 	
CentOS 	CentOS 6.x 		No additional kernel parameters required.
CentOS 5.8 		No additional kernel parameters required. See the note below about the optional use of divider=10.
CentOS 5.7 		No additional kernel parameters required. See the note below about the optional use of divider=10.
CentOS 5.6 		No additional kernel parameters required. See the note below about the optional use of divider=10.
CentOS 5.5 		No additional kernel parameters required. See the note below about the optional use of divider=10.
CentOS 5.4 		No additional kernel parameters required. See the note below about the optional use of divider=10.
CentOS 5.3 	divider=10 clocksource=acpi_pm 	
CentOS 5.2 	divider=10 clocksource=acpi_pm 	
CentOS 5.1 	divider=10 clocksource=acpi_pm 	
CentOS 5.0 	clocksource=acpi_pm 	
CentOS 4.9 	clock=pmtmr
divider=10
hpet=disable 	
CentOS 4.8 	clock=pmtmr
divider=10
hpet=disable 	
CentOS 4.7 	clock=pmtmr
divider=10
hpet=disable 	
CentOS 4.6 	clock=pmtmr
hpet=disable 	
CentOS 4.5 	clock=pmtmr
hpet=disable 	
CentOS 4.4 	clock=pmtmr
hpet=disable 	
CentOS 4.3 	clock=pmtmr
hpet=disable 	
CentOS 4.2 	clock=pmtmr
hpet=disable 	
CentOS 4.1 	clock=pmtmr
hpet=disable 	
CentOS 4.0 	clock=pmtmr
hpet=disable 	
Oracle 	Oracle Linux 6.x 		No additional kernel parameters required.
Oracle Linux 5.8 		No additional kernel parameters required. See the note below about the optional use of divider=10.
Oracle Linux 5.7 		No additional kernel parameters required. See the note below about the optional use of divider=10.
Oracle Linux 5.6 		No additional kernel parameters required. See the note below about the optional use of divider=10.
OEL 5.5 		No additional kernel parameters required. See the note below about the optional use of divider=10.
OEL 5.4 		No additional kernel parameters required. See the note below about the optional use of divider=10.
OEL 5.3 	divider=10 clocksource=acpi_pm 	
OEL 5.2 	divider=10 clocksource=acpi_pm 	
OEL 5.1 	divider=10 clocksource=acpi_pm 	
OEL 5.0 	clocksource=acpi_pm 	
OEL 4.9 	clock=pmtmr
divider=10
hpet=disable 	
OEL 4.8 	clock=pmtmr
divider=10
hpet=disable 	
OEL 4.7 	clock=pmtmr
divider=10
hpet=disable 	
OEL 4.6 	clock=pmtmr
hpet=disable 	
OEL 4.5 	clock=pmtmr
hpet=disable 	
Debian 	Debian 6.0 		No additional kernel parameters required.
Debian 5.0 		No additional kernel parameters required.
Debian 4.x 	divider=10 clocksource=acpi_pm 	


64-bit Kernels
Linux Flavor 	Version 	Kernel Parameters 	Notes
RHEL 	RHEL 6.x 		No additional kernel parameters required.
RHEL 5.8 		No additional kernel parameters required. See the note below about the optional use of divider=10.
RHEL 5.7 		No additional kernel parameters required. See the note below about the optional use of divider=10.
RHEL 5.6 		No additional kernel parameters required. See the note below about the optional use of divider=10.
RHEL 5.5 		No additional kernel parameters required. See the note below about the optional use of divider=10.
RHEL 5.4 		No additional kernel parameters required. See the note below about the optional use of divider=10.
RHEL 5.3 	notsc divider=10
nohpet 	
RHEL 5.2 	notsc divider=10
nohpet 	
RHEL 5.1 with RHSA-2007:0993-13 	notsc divider=10
nohpet 	
RHEL 5.1 without RHSA-2007:0993-13 	notsc
nohpet 	
RHEL 5.0 		No additional kernel parameters required.
RHEL 4.9 	notsc divider=10
nohpet 	
RHEL 4.8 	notsc divider=10
nohpet 	
RHEL 4.7 	notsc divider=10
nohpet 	
RHEL 4.6 	notsc
nohpet 	
RHEL 4.5 	notsc
nohpet 	
RHEL 4.4 	notsc
nohpet 	
RHEL 4.3 	notsc
nohpet 	
RHEL 4.2 	notsc
nohpet 	
RHEL 4.1 	nohpet 	Does not support notsc. Avoid using if possible.
RHEL 4.0 	nohpet 	Does not support notsc. Avoid using if possible.
RHEL 3 Update 9 with RHSA-2008-0973 	disable_lost_ticks 	
RHEL 3 through Update 8 		Has no workaround for lost tick overcompensation. Avoid using if possible.
SLES 	SLES 11 (All updates) 		No additional kernel parameters required.
SLES 10 SP4 on ESX 4.0 and later 		No additional kernel parameters required.
SLES 10 SP3 on ESX 3.5 and later 		No additional kernel parameters required.
SLES 10 SP3 on ESX 3.0.x and earlier 	notsc
nohpet 	
SLES 10 SP2 on ESX 3.5 and later 		No additional kernel parameters required.
SLES 10 SP2 on ESX 3.0.x and earlier 	notsc
nohpet 	
SLES 10 SP1 	notsc
nohpet 	
SLES 10 	notsc
nohpet 	
SLES 9 with kernel version 2.6.5-7.312 or later 	ignore_lost_ticks
nohpet 	
SLES 9 with kernel version 2.6.5-7.311 or earlier 	nohpet 	Has no workaround for lost tick overcompensation. Avoid using if possible.
SLED 	SLED 11 		No additional kernel parameters required.
SLED 10 	clock=pmtmr
nohpet 	
Suse Linux 	Suse Linux 10.3 	clocksource=acpi_pm 	
Suse Linux 10.2 	notsc
nohpet 	
Suse Linux 10.1 	notsc
nohpet 	
Suse Linux 10 	notsc
nohpet 	
Suse Linux 9.3 	notsc
nohpet 	
Suse Linux 9.2 	nohpet 	Does not support notsc. Avoid using if possible.
Suse Linux 9.1 	nohpet 	Does not support notsc. Avoid using if possible.
Ubuntu 	Ubuntu 12.04 		No additional kernel parameters required.
Ubuntu 11.10 		No additional kernel parameters required.
Ubuntu 11.04 		No additional kernel parameters required.
Ubuntu 10.10 		No additional kernel parameters required.
Ubuntu 10.04 		No additional kernel parameters required.
Ubuntu 9.10 		No additional kernel parameters required.
Ubuntu 9.04 with kernel 2.6.28-7.18 or later on ESX 4.0 or later 		No additional kernel parameters required.
Ubuntu 9.04 with kernel prior to 2.6.28-7.18 on ESX 4.0 or later 		Avoid using if possible. May cause guest operating system to stop responding.
Ubuntu 8.10 with kernel 2.6.27-12.28 or later on ESX 4.0 or later 		No additional kernel parameters required.
Ubuntu 8.10 with kernel prior to 2.6.27-12.28 on ESX 4.0 or later 		Avoid using if possible. May cause guest operating system to stop responding.
Ubuntu 8.10 	clocksource=acpi_pm 	
Ubuntu 8.04 with kernel 2.6.24-24.52 or later on ESX 4.0 or later 		No additional kernel parameters required.
Ubuntu 8.04 with kernel prior to 2.6.24-24.52 on ESX 4.0 or later 		Avoid using if possible. May cause guest operating system to stop responding.
Ubuntu 8.04 	clocksource=acpi_pm 	
Ubuntu 7.10 	clocksource=acpi_pm 	
Ubuntu 7.04 		No additional kernel parameters required.
Ubuntu 6.10 	notsc
nohpet 	
Ubuntu 6.06 	notsc
nohpet 	
Ubuntu 5.10 	notsc
nohpet 	
Ubuntu 5.04 	nohpet 	Does not support notsc. Avoid using if possible.
Mandriva 	Mandriva Corporate Desktop 4.0 	notsc
nohpet 	
Mandriva Corporate Server 4 	notsc
nohpet 	
Mandriva Linux 2008 	clocksource=acpi_pm 	
Mandriva Linux 2007 	notsc
nohpet 	
Mandriva Linux 2006 	notsc
nohpet 	
Mandrake Linux 10.1 	nohpet 	Does not support notsc. Avoid using if possible.
Turbolinux 	Turbolinux 10 Desktop 	nohpet 	Does not support notsc. Avoid using if possible.
Turbolinux 10 Server 	nohpet 	Does not support notsc. Avoid using if possible.
Asianux 	Asianux Server 4 (all updates) 		No additional kernel parameters required.
Asianux 3.0 SP4 		No additional kernel parameters required.
Asianux 3.0 SP3 		No additional kernel parameters required.
Asianux 3.0 SP2 		No additional kernel parameters required.
Asianux 3.0 SP1 		No additional kernel parameters required. Use kernel 2.6.18-53.17AXS3 or later.
Asianux 3.0 	notsc
nohpet 	
CentOS 	CentOS 6.x 		No additional kernel parameters required.
CentOS 5.8 		No additional kernel parameters required. See the note below about the optional use of divider=10.
CentOS 5.7 		No additional kernel parameters required. See the note below about the optional use of divider=10.
CentOS 5.6 		No additional kernel parameters required. See the note below about the optional use of divider=10.
CentOS 5.5 		No additional kernel parameters required. See the note below about the optional use of divider=10.
CentOS 5.4 		No additional kernel parameters required. See the note below about the optional use of divider=10.
CentOS 5.3 	notsc divider=10
nohpet 	
CentOS 5.2 	notsc divider=10
nohpet 	
CentOS 5.1 	notsc
nohpet 	
CentOS 5.0 		No additional kernel parameters required.
CentOS 4.9 	notsc divider=10
nohpet
	
CentOS 4.8 	notsc divider=10
nohpet
	
CentOS 4.7 	notsc divider=10
nohpet
	
CentOS 4.6 	notsc
nohpet
	
CentOS 4.5 	notsc
nohpet
	
CentOS 4.4 	notsc
nohpet
	
CentOS 4.3 	notsc
nohpet
	
CentOS 4.2 	notsc
nohpet
	
CentOS 4.1 	nohpet 	Does not support notsc. Avoid using if possible.
CentOS 4.0 	nohpet 	Does not support notsc. Avoid using if possible.
Oracle 	Oracle Linux 6.x 		No additional kernel parameters required.
Oracle Linux 5.8 		No additional kernel parameters required. See the note below about the optional use of divider=10.
Oracle Linux 5.7 		No additional kernel parameters required. See the note below about the optional use of divider=10.
Oracle Linux 5.6 		No additional kernel parameters required. See the note below about the optional use of divider=10.
OEL 5.5 		No additional kernel parameters required. See the note below about the optional use of divider=10.
OEL 5.4 		No additional kernel parameters required. See the note below about the optional use of divider=10.
OEL 5.3 	notsc divider=10
nohpet 	
OEL 5.2 	notsc divider=10
nohpet 	
OEL 5.1 	notsc
nohpet 	
OEL 5.0 		No additional kernel parameters required.
OEL 4.9 	notsc divider=10
nohpet 	
OEL 4.8 	notsc divider=10
nohpet 	
OEL 4.7 	notsc divider=10
nohpet 	
OEL 4.6 	notsc
nohpet 	
OEL 4.5 	notsc
nohpet 	
Debian 	Debian 6.0 		No additional kernel parameters required.
Debian 5.0 		No additional kernel parameters required.
Debian 4.x 	notsc
nohpet 	

Recommended Configurations
These configurations are expected to have the best timekeeping behavior:

    RHEL 6 32-bit or 64-bit running on ESX 4.0 or later
    RHEL 5.4 or later 32-bit or 64-bit running on ESX 3.5 or later
    SLES 10 SP2 or later 64-bit running on ESX 3.5 or later
    SLES 10 SP2 or later 32-bit running on ESX 3.5 or ESX 4.x
    SLES 11 32-bit or 64-bit running on ESX 4.0 or later
    Ubuntu 8.04 32-bit running on ESX 3.5 or later
    Ubuntu 8.04 or later 64-bit running on ESX 4.0 or later
    Ubuntu 8.04 or later 32-bit running on ESX 3.5 or ESX 4.x

Among different versions of RHEL 5 and RHEL 4, RHEL 5.4 or later has the best timekeeping behavior. For older versions, those supporting divider=10 have better timekeeping behavior than those that do not.

VMI is supported in ESX 3.5 and ESX 4.x. Support for VMI is not present in ESX 5.0. For more information related to VMI enabled kernels, see:

    Enabling Virtual Machine Interface (VMI) in a Linux kernel and in ESX 3.5 (1003644)
    Enabling VMI with SLES10 SP2 32bit virtual machines on ESX (1005701)

If you are running Java inside a virtual machine, some of the above parameters may affect the performance of your virtual machine. For more information, see:

    Best practices for running Java in a virtual machine (1008480)
    Time runs too fast in a Windows virtual machine when the Multimedia Timer interface is used (1005953)


Editing Kernel Configuration
Kernel command line parameters are specified in the /etc/lilo.conf or /boot/grub/grub.conf file, depending on your choice of boot loader.

For LILO, put the kernel command line parameters at the end of the append line. For example, if the append line looks like:

    append="resume=/dev/hda6 splash=silent"

and you want to add clock=pmtmr divider=10, the updated text is:

    append="resume=/dev/hda6 splash=silent clock=pmtmr divider=10"

Remember to run /sbin/lilo after editing lilo.conf, so that your edits take effect.

For GRUB, put the kernel command line parameters at the end of the kernel line. For example if the kernel line looks like:

    kernel /vmlinuz-2.6.18 ro root=/dev/hda2

and you want to add clock=pmtmr divider=10, the updated text is:

    kernel /vmlinuz-2.6.18 ro root=/dev/hda2 clock=pmtmr divider=10

For additional information about working with boot loaders, see your Linux distribution's documentation.

NTP Recommendations
Note: VMware recommends you to use NTP instead of VMware Tools periodic time synchronization. NTP is an industry standard and ensures accurate timekeeping in your guest. You may have to open the firewall (UDP 123) to allow NTP traffic.

This is a sample /etc/ntp.conf:

tinker panic 0
restrict 127.0.0.1
restrict default kod nomodify notrap
server 0.vmware.pool.ntp.org
server 1.vmware.pool.ntp.org
server 2.vmware.pool.ntp.org
driftfile /var/lib/ntp/drift

This is a sample (RedHat specific) /etc/ntp/step-tickers:

0.vmware.pool.ntp.org
1.vmware.pool.ntp.org

The configuration directive tinker panic 0 instructs NTP not to give up if it sees a large jump in time. This is important for coping with large time drifts and also resuming virtual machines from their suspended state.

Note: The directive tinker panic 0 must be at the top of the ntp.conf file.

It is also important not to use the local clock as a time source, often referred to as the Undisciplined Local Clock. NTP has a tendency to fall back to this in preference to the remote servers when there is a large amount of time drift.

An example of such a configuration is:

server 127.127.1.0
fudge 127.127.1.0 stratum 10

Comment out both lines.

After making changes to NTP configuration, the NTP daemon must be restarted. Refer to your operating system vendor’s documentation.

VMware Tools time synchronization configuration
When using NTP in the guest, disable VMware Tools periodic time synchronization.

To disable VMware Tools periodic time sync, perform one of these options:

    Set tools.syncTime = "FALSE" in the configuration file (.vmx file) of the virtual machine.

    OR

    Deselect Time synchronization between the virtual machine and the host operating system in the VMware Tools toolbox GUI of the guest operating system.

    OR

    Run the vmware-guestd --cmd "vmx.set_option synctime 1 0" command in the guest operating system. To enable time syncing again, use the same command with "0 1" instead of "1 0".


For ESX 4.1 and later, use these parameters for Linux, Solaris, and FreeBSD:

    To display the current status of the service:

    vmware-toolbox-cmd timesync status

    To disable periodic time synchronization:

    vmware-toolbox-cmd timesync disable

These options do not disable one-time synchronizations done by VMware Tools for events such as tools startup, taking a snapshot, resuming from a snapshot, resuming from suspend, or VMotion. These events synchronize time in the guest operating system with time in the host operating system, so it is important to make sure that the host operating system's time is correct.

To do this for VMware ACE, VMware Fusion, VMware GSX Server, VMware Player, VMware Server, and VMware Workstation, run time synchronization software such as NTP or w32time in the host. For VMware ESX run NTP in the service console. For VMware ESXi, run NTP in the VMkernel.

Note: VMware Tools one-time synchronization events should not disabled.

Virtual Hardware clock configuration
When configuring the Linux guest operating system, if you are given a choice between keeping the “hardware” clock (that is, the virtual CMOS time of day clock) in UTC or local time, choose UTC. This avoids any confusion when your local time changes between standard and daylight saving time (in England, "summer time").

For additional information, see Timekeeping in VMware Virtual Machines.

Note for uses on divider=10
For some operating systems, divider=10 is a supported kernel configuration option, but might not be necessary for accurate timekeeping. Using it reduces the frequency of timer interrupts by 10x, which reduces the CPU overhead of processing timer interrupts. This overhead is especially noticeable for idle virtual machines. The only drawback of using divider=10 is that the granularity of wakeups provided by the kernel changes from 1 ms to 10 ms. The vast majority of applications are not affected by this, but using divider=10 may not be the right tradeoff for some time sensitive applications. For some operating systems, specifically older versions, divider=10 greatly improves timekeeping accuracy and is strongly recommended.

Additional Information
For translated versions of this article, see:

    Español: Las mejores prácticas de medición de tiempo para huéspedes Linux (2016603)
    Português: Melhores práticas de controle de horário para convidados Linux (2016014)
    日本語: Linux ゲストの時刻管理のベスト プラクティス (1033498)
    Mandarin Chinese: Linux系统时间同步最佳实践 (2020975)

Tags
install-vmware-tools-linux  linux-guest-os-time 
```
