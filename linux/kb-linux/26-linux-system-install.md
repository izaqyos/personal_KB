---
type: reference
title: Linux system install
description: Linux system install from ISO and using kickstart.
tags: [linux, deployment, howto, guide, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "linux/KB_Linux#26"
---

# Linux system install

[↑ KB_Linux](/linux/kb-linux/README.md)

## 26.1 Install from ISO

### 26.1.1 Using kickstart

#### 26.1.1.1 How Kickstart Works http://kickstart-tools.sourceforge.net/howkickstartworks.html

```text
This document will describe the pieces involved in the kickstart process and how they work together.

    What is Kickstart?
    The Bootdisk
    The Kickstart Server
    Postinstall
    Making better use of KickStart

What is Kickstart?
Due to the need for automated installation, Red Hat has created the kickstart installation method. With this method, a system administrator can create a single file containing the answers to all the questions that would normally be asked during a typical Red Hat interactive Linux installation.

Kickstart files can be kept on single server system, and read by individual computers during the installation. The kickstart installation method is powerful enough that often a single kickstart file can be used to install Red Hat Linux on multiple machines, making it ideal for network and system administrators.

Kickstart lets you automate most of a Red Hat Linux installation, including:

    Language selection
    Network configuration
    Keyboard selection
    Boot loader installation (LILO)
    Disk partitioning
    Mouse Selection
    X Window System configuration

Kickstart installations can only be performed using a local CD-ROM, a local hard drive, or NFS installation methods. FTP and HTTP installations cannot be automated using kickstart mode. (Starting with RedHat 7.0 and higher, FTP and HTTP are now supported)

To use kickstart mode, you must first create a kickstart file (ks.cfg), and make it available to the Red Hat Linux installation program.

Where to put a KickStart File:

A KickStart file must be placed in one of two locations.

    On a network
    On a bootdisk

To do a network-based KickStart installation, you must have a BOOTP/DHCP server on your network, and it must include configuration information for the machine on which you are attempting to install Red Hat Linux. The BOOTP/DHCP server will be used to give the client its networking information as well as the location of the KickStart file.

To perform a diskette-based KickStart installation, the KickStart file must be named ks.cfg, and reside in the boot disk's top-level directory. Note that the RedHat Linux boot disks are in MS-DOS format, making it easy to copy the KickStart file under Linux using the mcopy command.

In the case of the KickStart-Tools package the we have put together it was decited that we would go with locating the ks.cfg file on the floppy bootdisk.
Even if we put the ks.cfg on the network somewhere, the client would still need to use a boot floppy to load the kernel so that it can ask the nework for the ks.cfg file. Since we have to use a boot floppy anyway, we figured it would be alot easier to just put the ks.cfg file on the floppy and not worry about changing the BOOTP/DHCP servers at all. As of RedHat Linux 7.0 there is now support for booting over the network using PXIE. However many of our systems don't support PXIE so we decided to still stay with the floppy bootdisk method.

( Go to top )


The Bootdisk

The Bootdisk accomplishes several things. It contains the Linux kernel which is booted so that it can run the KickStart process.
It also contains a configuration files that is used to tell KickStart what to do.
By default the "Redhat" bootdisk will do a regular interactive install.

If at the boot prompt you specify: linux ks=floppy the installer will switch into KickStart mode and install linux using the configuration recorded in the ks.cfg file on the floppy.

To simplify the creation of the boot disk a cgi was put together so that it would ask the user the pertinent questions, then create the ks.cfg file for them, and then create a batch/shell script that can be used to create the boot floppy.

Specifically, the batch file or shell script will create a basic boot floppy and then copy across 3 files. They are: syslinux.cfg, boot.msg, and the ks.cfg.

    syslinux.cfg is the file that is read before the kernel loads. It is similar in functionality to lilo.conf. We have modified syslinux.cfg so that it runs linux ks=floppy by default if you press enter at the boot prompt. If you want to do a regular interactive install using the floppy then you can just type linux at the boot prompt.
    boot.msg contains the text that is displayed at the boot prompt.
    ks.cfg is the KickStart configuration file.


The kernel that is on the standard bootnet.img bootdisk image has been designed to work specifically for desktop PC's. It will not work with notebooks that require PCMCIA services in order to get onto the network. for that you need to use pcmcia.img.
The various bootdisk images can be found the images directory on the RedHat installation CD.


( Go to top )
The KickStart Server

Once the bootdisk lauches the kernel, it looks in the ks.cfg file to figure out where it is going to get it's root file system.
This is specified in the NFS line in ks.cfg. For example, here is the default nfs line:

nfs --server <internal-host> --dir /export/ftp/pub/linux/redhat/linux/7.0/en/os/i386

It specify's the NFS server as well as the NFS export to be mounted from that server.

The directory /export/ftp/pub/linux/redhat/linux/7.0/en/os/i386 contains the following files and directories.

    COPYING
    README
    RELEASE-NOTES
    RPM-GPG-KEY
    RedHat/
    autorun*
    boot.cat*
    doc/
    dosutils/
    images/
    ls-lR.gz
    misc/


The only one that has to exist is the RedHat directory. Here is what is inside the RedHat directory and what each directory is for.

    RPMS/         Location of the RPMS that get installed during KickStart.
    base/         Location of RPMS database and comps file.
    i386          File used to identify this directory is for the i386 architecture.
    instimage/    Location of the files that get mounted as the root file system during KickStart.

The above layout is taken from what you would see on a RedHat Linux 6.2 CD. Starting with Redhat Linux 7.1 there is no longer an instimage directory. The instimage directory is now located in a file which is kept in the base directory.

The NFS server must be exported to the world so that KickStarts that are using DHCP address's (and therefore are not in the netgroup file) will be able to mount the share point. That is only if you are using netgroups to restrict access.




Postinstall

The end of the ks.cfg file contains a %post section. This is where the postinstall commands are kept.
If we put all the postinstall commands here, the ks.cfg file would become rather large and might not fit on the floppy disk anymore.

So instead we install an RPM during the KickStart and in the %post section of the ks.cfg file we run a script in the RPM and pass it various options. The RPM is called postinstall and contains all the various things we want done during the postinstall. The last thing that the postinstall script does is removes the postinstall package.




Making better use of kickstart

Being able to do kickstarts is OK, but there are a few problems.

    1. You may not want all the RPMS that RedHat provides
    2. You may want to add your own RPMS.
    3. If you list all the specific rpms you want in the %packages section of the ks.cfg then the ks.cfg file won't fit on boot floppy.
    4. If you put complex postinstall commands in the ks.cfg file then the file might not fit on the boot floppy.
    5. There are updates available for some packages. You don't won't to install old ones that would then need to be upgraded.

So, what if you could choose exactly the RPM's that were available for Kickstart? What if you could choose the grouping of RPM's? What if you could pull out old RPM's and replace them with newer versions?

Well, all of this is possible if you know how the inside of kickstart works and how to edit the files that kickstart uses. To make that much easier we have created some tools that do all of that for you.

Let me explain a few things about how the inside of kickstart works so that you understand what these new tools are doing for you.

The first thing you may want to do is replace some RPM's from the RPMS directory with your own versions or updated versions or whatever. So you cd into the RPMS directory that is described above. You remove a few RPM's and add a few.
If you tried to Kickstart now, it would fail because Kickstart knows exactly which RPM's are in the RPMS directory and expects  specific versions of RPM's to be there. It keeps track of all the RPM headers for each RPM in a file called hdlist in the base directory. Therefore, you need to generate a new hdlist. This is done by running a command that comes with anaconda-runtime called genhdlist . You also need to edit the comps file. The comps file is the file that lists all the packages that should get installed based on a particular profile. For example, when you do an interactive install and select Networked Workstation, that is a package group listed in the comps file. If you want to create your own package groups or make some new packages part of an existing package group then you would list those packages in the comps file. The comps file is located in the base directory.

One thing to note about this file is that the package names listed in it do not include the version number. This means that you could not use this file as an authorative list of packages installed by kickstart since you would only know the package name and not the package version.

Now that you understand the basics of how to make changes to kickstart, you can forget it. Build_ks takes care of building the installer based on a configuration file that list all the rpms and what groups they should be in. It takes care of putting the correct RPM's in the RPMS directory. In also creates a new comps file and hdlist.  

What you need to do now is find out how to define a distribution .

		26.1.2

	26.2
```
