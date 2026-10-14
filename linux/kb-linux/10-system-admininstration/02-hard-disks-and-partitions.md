---
type: reference
title: Hard disks and partitions
description: Subsection 10.2 of System admininstration.
tags: [kb-linux]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "linux/KB_Linux#10.2"
---

# 10.2 Hard disks and partitions

[↑ System admininstration](/linux/kb-linux/10-system-admininstration/README.md)

### 10.2.1 list partitions

```text
cat /etc/fstab

fdisk -l /dev/hda
```

#### 10.2.1.1 fstab(5) - Linux man page

```text
Name
fstab - static information about the filesystems
Synopsis
#include <fstab.h>
Description
The file fstab contains descriptive information about the various file systems. It is the duty of the system administrator to properly create and maintain this file. fstab can be modified by special utils (e.g. fstab-sync(8)). Each filesystem is described on a separate line; fields on each line are separated by tabs or spaces. Lines starting with '#' are comments. The order of records in fstab is important because fsck(8), mount(8), and umount(8) sequentially iterate through fstab doing their thing.

The first field, (fs_spec), describes the block special device or remote filesystem to be mounted.

For ordinary mounts it will hold (a link to) a block special device node (as created by mknod(8)) for the device to be mounted, like '/dev/cdrom' or '/dev/sdb7'. For NFS mounts one will have <host>:<dir>, e.g., 'knuth.aeb.nl:/'. For procfs, use 'proc'.

Instead of giving the device explicitly, one may indicate the (ext2 or xfs) filesystem that is to be mounted by its UUID or volume label (cf. e2label(8) or xfs_admin(8)), writing LABEL=<label> or UUID=<uuid>, e.g., 'LABEL=Boot' or 'UUID=3e6be9de-8139-11d1-9106-a43f08d823a6'. This will make the system more robust: adding or removing a SCSI disk changes the disk device name but not the filesystem volume label.

The second field, (fs_file), describes the mount point for the filesystem. For swap partitions, this field should be specified as 'none'. If the name of the mount point contains spaces these can be escaped as '\040'.

The third field, (fs_vfstype), describes the type of the filesystem. Linux supports lots of filesystem types, such as adfs, affs, autofs, coda, coherent, cramfs, devpts, efs, ext2, ext3, hfs, hpfs, iso9660, jfs, minix, msdos, ncpfs, nfs, ntfs, proc, qnx4, reiserfs, romfs, smbfs, sysv, tmpfs, udf, ufs, umsdos, vfat, xenix, xfs, and possibly others. For more details, see mount(8). For the filesystems currently supported by the running kernel, see /proc/filesystems. An entry swap denotes a file or partition to be used for swapping, cf. swapon(8). An entry ignore causes the line to be ignored. This is useful to show disk partitions which are currently unused.

The fourth field, (fs_mntops), describes the mount options associated with the filesystem.

It is formatted as a comma separated list of options. It contains at least the type of mount plus any additional options appropriate to the filesystem type. For documentation on the available options for non-nfs file systems, see mount(8). For documentation on all nfs-specific options have a look at nfs(5). Common for all types of file system are the options ''noauto'' (do not mount when "mount -a" is given, e.g., at boot time), ''user'' (allow a user to mount), ''owner'' (allow device owner to mount), ''pamconsole'' (allow a user at the console to mount), and ''comment'' (e.g., for use by fstab-maintaining programs). The ''owner'', ''pamconsole'' and ''comment'' options are Linux-specific. For more details, see mount(8).

The fifth field, (fs_freq), is used for these filesystems by the dump(8) command to determine which filesystems need to be dumped. If the fifth field is not present, a value of zero is returned and dump will assume that the filesystem does not need to be dumped.

The sixth field, (fs_passno), is used by the fsck(8) program to determine the order in which filesystem checks are done at reboot time. The root filesystem should be specified with a fs_passno of 1, and other filesystems should have a fs_passno of 2. Filesystems within a drive will be checked sequentially, but filesystems on different drives will be checked at the same time to utilize parallelism available in the hardware. If the sixth field is not present or zero, a value of zero is returned and fsck will assume that the filesystem does not need to be checked.

The proper way to read records from fstab is to use the routines getmntent(3).
Files
/etc/fstab
See Also
getmntent(3), mount(8), swapon(8), fs(5) nfs(5) fstab-sync(8)
History
The ancestor of this fstab file format appeared in 4.0BSD.
Referenced By
davfs2.conf(5), fsck.xfs(8), gentoo(1), getfsent(3), gkrellm(1), gnome-mount(1), mkdumprd(8), mkinitrd(8), mount.davfs(8), proc(5), quota(1), quotacheck(8), quotaon(8), umount.cifs(8), umount.davfs(8), usermount(1), xfs_fsr(8)

	"
```

#### 10.2.1.2 fdisk(8) - Linux man page

```text
Name
fdisk - Partition table manipulator for Linux
Synopsis
fdisk [-u] [-b sectorsize] [-C cyls] [-H heads] [-S sects] device

fdisk -l [-u] [device ...]

fdisk -s partition ...

fdisk -v
Description
Hard disks can be divided into one or more logical disks called partitions. This division is described in the partition table found in sector 0 of the disk.

In the BSD world one talks about 'disk slices' and a 'disklabel'.

Linux needs at least one partition, namely for its root file system. It can use swap files and/or swap partitions, but the latter are more efficient. So, usually one will want a second Linux partition dedicated as swap partition. On Intel compatible hardware, the BIOS that boots the system can often only access the first 1024 cylinders of the disk. For this reason people with large disks often create a third partition, just a few MB large, typically mounted on /boot, to store the kernel image and a few auxiliary files needed at boot time, so as to make sure that this stuff is accessible to the BIOS. There may be reasons of security, ease of administration and backup, or testing, to use more than the minimum number of partitions.

fdisk (in the first form of invocation) is a menu driven program for creation and manipulation of partition tables. It understands DOS type partition tables and BSD or SUN type disklabels.

fdisk doesn't understand GUID Partition Table (GPT) and it is not designed for large partitions. In particular case use more advanced GNU parted(8).

The device is usually one of the following:

/dev/hda
/dev/hdb
/dev/sda
/dev/sdb

(/dev/hd[a-h] for IDE disks, /dev/sd[a-p] for SCSI disks, /dev/ed[a-d] for ESDI disks, /dev/xd[ab] for XT disks). A device name refers to the entire disk.

The partition is a device name followed by a partition number. For example, /dev/hda1 is the first partition on the first IDE hard disk in the system. Disks can have up to 15 partitions. See also /usr/src/linux/Documentation/devices.txt.

A BSD/SUN type disklabel can describe 8 partitions, the third of which should be a 'whole disk' partition. Do not start a partition that actually uses its first sector (like a swap partition) at cylinder 0, since that will destroy the disklabel.

An IRIX/SGI type disklabel can describe 16 partitions, the eleventh of which should be an entire 'volume' partition, while the ninth should be labeled 'volume header'. The volume header will also cover the partition table, i.e., it starts at block zero and extends by default over five cylinders. The remaining space in the volume header may be used by header directory entries. No partitions may overlap with the volume header. Also do not change its type and make some file system on it, since you will lose the partition table. Use this type of label only when working with Linux on IRIX/SGI machines or IRIX/SGI disks under Linux.

A DOS type partition table can describe an unlimited number of partitions. In sector 0 there is room for the description of 4 partitions (called 'primary'). One of these may be an extended partition; this is a box holding logical partitions, with descriptors found in a linked list of sectors, each preceding the corresponding logical partitions. The four primary partitions, present or not, get numbers 1-4. Logical partitions start numbering from 5.

In a DOS type partition table the starting offset and the size of each partition is stored in two ways: as an absolute number of sectors (given in 32 bits) and as a Cylinders/Heads/Sectors triple (given in 10+8+6 bits). The former is OK - with 512-byte sectors this will work up to 2 TB. The latter has two different problems. First of all, these C/H/S fields can be filled only when the number of heads and the number of sectors per track are known. Secondly, even if we know what these numbers should be, the 24 bits that are available do not suffice. DOS uses C/H/S only, Windows uses both, Linux never uses C/H/S.

If possible, fdisk will obtain the disk geometry automatically. This is not necessarily the physical disk geometry (indeed, modern disks do not really have anything like a physical geometry, certainly not something that can be described in simplistic Cylinders/Heads/Sectors form), but is the disk geometry that MS-DOS uses for the partition table.

Usually all goes well by default, and there are no problems if Linux is the only system on the disk. However, if the disk has to be shared with other operating systems, it is often a good idea to let an fdisk from another operating system make at least one partition. When Linux boots it looks at the partition table, and tries to deduce what (fake) geometry is required for good cooperation with other systems.

Whenever a partition table is printed out, a consistency check is performed on the partition table entries. This check verifies that the physical and logical start and end points are identical, and that the partition starts and ends on a cylinder boundary (except for the first partition).

Some versions of MS-DOS create a first partition which does not begin on a cylinder boundary, but on sector 2 of the first cylinder. Partitions beginning in cylinder 1 cannot begin on a cylinder boundary, but this is unlikely to cause difficulty unless you have OS/2 on your machine.

A sync() and a BLKRRPART ioctl() (reread partition table from disk) are performed before exiting when the partition table has been updated. Long ago it used to be necessary to reboot after the use of fdisk. I do not think this is the case anymore - indeed, rebooting too quickly might cause loss of not-yet-written data. Note that both the kernel and the disk hardware may buffer data.
DOS 6.x WARNING

The DOS 6.x FORMAT command looks for some information in the first sector of the data area of the partition, and treats this information as more reliable than the information in the partition table. DOS FORMAT expects DOS FDISK to clear the first 512 bytes of the data area of a partition whenever a size change occurs. DOS FORMAT will look at this extra information even if the /U flag is given -- we consider this a bug in DOS FORMAT and DOS FDISK.

The bottom line is that if you use fdisk to change the size of a DOS partition table entry, then you must also use dd to zero the first 512 bytes of that partition before using DOS FORMAT to format the partition. For example, if you were using disk to make a DOS partition table entry for /dev/hda1, then (after exiting fdisk and rebooting Linux so that the partition table information is valid) you would use the command "dd if=/dev/zero of=/dev/hda1 bs=512 count=1" to zero the first 512 bytes of the partition.

BE EXTREMELY CAREFUL if you use the dd command, since a small typo can make all of the data on your disk useless.

For best results, you should always use an OS-specific partition table program. For example, you should make DOS partitions with the DOS FDISK program and Linux partitions with the Linux fdisk program.
Options

-b sectorsize
    Specify the sector size of the disk. Valid values are 512, 1024, or 2048. (Recent kernels know the sector size. Use this only on old kernels or to override the kernel's ideas.) 
-C cyls
    Specify the number of cylinders of the disk. I have no idea why anybody would want to do so. 
-H heads
    Specify the number of heads of the disk. (Not the physical number, of course, but the number used for partition tables.) Reasonable values are 255 and 16. 
-S sects
    Specify the number of sectors per track of the disk. (Not the physical number, of course, but the number used for partition tables.) A reasonable value is 63. 
-l
    List the partition tables for the specified devices and then exit. If no devices are given, those mentioned in /proc/partitions (if that exists) are used. 
-u
    When listing partition tables, give sizes in sectors instead of cylinders. 
-s partition
    The size of the partition (in blocks) is printed on the standard output. 
-v
    Print version number of fdisk program and exit.

Bugs
There are several *fdisk programs around. Each has its problems and strengths. Try them in the order parted, fdisk, sfdisk.

The IRIX/SGI type disklabel is currently not supported by the kernel. Moreover, IRIX/SGI header directories are not fully supported yet.

The option 'dump partition table to file' is missing.
See Also
mkfs(8), parted(8), sfdisk(8)
Referenced By
addpart(8), cfdisk(8), delpart(8), ext2online(8), gpart(8), lphdisk(8), mkswap(8), ntfsresize(8), partx(8), pvcreate(8), pvresize(8), resize2fs(8), sg_dd(8), sgm_dd(8), sgp_dd(8), syslinux(1) 
```

#### 10.2.1.3 df(1) - Linux man page

```text
Name
df - report file system disk space usage
Synopsis
df [OPTION]... [FILE]...
Description
This manual page documents the GNU version of df. df displays the amount of disk space available on the file system containing each file name argument. If no file name is given, the space available on all currently mounted file systems is shown. Disk space is shown in 1K blocks by default, unless the environment variable POSIXLY_CORRECT is set, in which case 512-byte blocks are used.

If an argument is the absolute file name of a disk device node containing a mounted file system, df shows the space available on that file system rather than on the file system containing the device node (which is always the root file system). This version of df cannot show the space available on unmounted file systems, because on most kinds of systems doing so requires very nonportable intimate knowledge of file system structures.
Options

Show information about the file system on which each FILE resides, or all file systems by default.

Mandatory arguments to long options are mandatory for short options too.

-a, --all
    include dummy file systems 
-B, --block-size=SIZE use SIZE-byte blocks
-h, --human-readable
    print sizes in human readable format (e.g., 1K 234M 2G) 
-H, --si
    likewise, but use powers of 1000 not 1024 
-i, --inodes
    list inode information instead of block usage 
-k
    like --block-size=1K 
-l, --local
    limit listing to local file systems 
--no-sync
    do not invoke sync before getting usage info (default) 
-P, --portability
    use the POSIX output format 
--sync
    invoke sync before getting usage info 
-t, --type=TYPE
    limit listing to file systems of type TYPE 
-T, --print-type
    print file system type 
-x, --exclude-type=TYPE
    limit listing to file systems not of type TYPE 
-v
    (ignored) 
--help
    display this help and exit 
--version
    output version information and exit

SIZE may be (or may be an integer optionally followed by) one of following: kB 1000, K 1024, MB 1000*1000, M 1024*1024, and so on for G, T, P, E, Z, Y.
Author
Written by Torbjorn Granlund, David MacKenzie, and Paul Eggert.
Reporting Bugs
Report bugs to <bug-coreutils@gnu.org>.
Copyright
Copyright � 2006 Free Software Foundation, Inc.
This is free software. You may redistribute copies of it under the terms of the GNU General Public License <http://www.gnu.org/licenses/gpl.html>. There is NO WARRANTY, to the extent permitted by law.
See Also
The full documentation for df is maintained as a Texinfo manual. If the info and df programs are properly installed at your site, the command

info df

should give you access to the complete manual.
Referenced By
cachefilesd.conf(5), inndf(8), virt-df(1), xfs_quota(8) 
```

### 10.2.2 list hard disks

```text
	ls /dev/hd*
```

### 10.2.3 Converting Ext2 Filesystems to Ext3

```text
Contents:

    * Executive Summary
    * Disclaimer
    * Converting from Ext2 to Ext3
    * Converting from Ext3 back to Ext2
    * Summary

Executive Summary

Until recently, the Ext2 filesystem has been the Linux default. Ext2 is a technological miracle. Low fragmentation, redundant enough to be reliably regenerated on error yet diskspace efficient, fast, and adaptable. But when the computer is rebooted or powered off without correctly shutting down, Ext2 filesystems are placed in an error state. When the computer comes back up, the user is confronted with some mildly confusing, and very intimidating, messages and choices. Should he let the filesystem correct itself? Warning, this can lose data!

Journalized filesystems are made to eliminate such error messages. The Ext3 filesystem is an Ext2 filesystem with a journal file and some filesystem driver additions making the filesystem journalized.

My research and those of others, as well as limited experimentation by myself, indicate that the tune2fs -j command, which is the primary command for converting from Ext2 to Ext3, is safe to run even on writeable mounted partitions. However, when possible, I run the command on unmounted or read-only mounted partitions. It might be superstitious, but I feel that is playing it safe. Nevertheless, when confronted with situations making unmounting difficult, I run the command on writeable mounted partitions.

Converting the root directory from Ext2 to Ext3 is a little more difficult. Converting back from Ext3 to Ext2 is a hairy and dangerous procedure. Instructions for both are given in this document, but think long and hard before converting the root directory.
Disclaimer

Obviously, you use this document at your own risk. I am not responsible for any damage or injury caused by your use of this document, or caused by errors and/or omissions in this document. If that's not acceptable to you, you may not use this document. By using this document you are accepting this disclaimer.
Converting from Ext2 to Ext3

The conversion procedure is simple enough. Imagine /dev/hda10 mounted as /test ¿ the procedure would be as follows:

    * Log in as root
    * Make sure /etc/fstab has /dev/hda10 mounted to /test as ext2, read write
    * umount /dev/hda10
          o If you can't unmount it, then remount it read only (mount -o remount,ro /dev/hda10)
    * tune2fs -j /dev/hda10
    * Edit /etc/fstab, and for /dev/hda10, change ext2 to ext3
    * mount /dev/hda10
    * /sbin/shutdown -h now
    * mount | grep /dev/hda10
          o If it's not shown as ext3, reboot, if still not, troubleshoot
          o Otherwise, you're done.

A few explanations are in order. The tunefs command creates the journal file, which is kept in a special inode on the device (by default). You then must change the /etc/fstab entry to reflect it's a journalling filesystem, and then mount it.
Converting the /usr directory
This applies only to those systems in which the /usr tree has its own partition. Converting the /usr directory presents a challenge because commands like tune2fs are located in the /usr tree, so it must be mounted. Mount it read only with the following command:

mount -o remount,ro /usr

Then run tune2fs -j, edit /etc/fstab, and then unmount and remount /usr.
Converting the / directory
First, think long and hard before deciding to convert the root directory. Ext3's primary purpose is shorter recovery from disaster rather than data loss prevention. Converting the root directory from Ext2 to Ext3 isn't difficult, but converting it back from Ext3 to Ext2 is a treacherous process fraught with problems. But, if you really must perform the Ext2 to Ext3 conversion on the root directory, here's how, assuming /dev/hda2 is mounted as the root directory and /dev/hda1 is mounted as /boot:

    * Log in as root
    * Edit /etc/fstab and change ext2 to  ext3 on the line referencing the root directory.
    * tune2fs -j /dev/hda2
    * cd /boot
    * mv initrd-2.4.18-26.8.0.img initrd-2.4.18-26.8.0.img.ext2
    * mkinitrd initrd-2.4.18-26.8.0.img 2.4.18-26.8.0
    * reboot

In the preceding, you MUST perform all the steps, including the mkinitrd, before rebooting. Failing to perform all the steps before rebooting produces a "buried shovel" where if only you could boot the machine, you could run the mkinitrd command, and if only you could run the mkinitrd command, you could boot the machine.
Converting from Ext3 back to Ext2
There may come a time when you want to convert back to Ext2. For directories other than the root directory or /usr, it's pretty easy. The following once again uses the example of /dev/hda10 mounted to directory /test:

    * umount /dev/hda10
    * tune2fs -O ^has_journal /dev/hda10
    * e2fsck /dev/hda10
    * Edit /etc/fstab to change /dev/hda10 to mount type ext2
    * mount /dev/hda10

The tune2fs command removes the journal inode, and the e2fsck command completes that removal.
Back-Converting the root directory

The root directory is a challenge for a number of reasons. First, it must be mounted for the system to run, but it must be unmounted to run the e2fsck command. Also, different distros behave different ways. The mkinitrd command varies widely between distros. The preceding works on a Red Hat 8.0 machine, but other machines might require other solutions. We'll assume that /dev/hda1 is /boot, while /dev/hda2 is the root directory (/).

    * Log in as root
    * Edit /etc/fstab to change the /dev/hda2 line from ext3 to ext2
    * reboot
    * Log in as root
    * mv initrd-2.4.18-26.8.0.img initrd-2.4.18-26.8.0.img.ext3
    * mkinitrd initrd-2.4.18-26.8.0.img 2.4.18-26.8.0
    * Place your Knoppix CD in the CD drive
    * reboot
    * Notice you are now booted to Knoppix
    * Ctrl+Alt+F2 to access a root prompt
    * umount /dev/hda1
    * umount /dev/hda2
    * tune2fs -O ^has_journal /dev/hda2
    * e2fsck /dev/hda2
    * mount -t ext3 /dev/hda2 /mnt/hda2
          o This should fail. If it does, it proves that the partition no longer has a journaling inode.
    * reboot
    * Remove the Knoppix CD and press Enter as prompted
    * Notice you are now booted to the original operating system (hopefully)
    * Log in as root
    * Execute a mount command to verify an Ext2 root partition.

Back Converting the /usr directory
Assume that /usr is mounted by /dev/hda4

    * Place your Knoppix CD in the CD drive
    * reboot
    * Notice you are now booted to Knoppix
    * Ctrl+Alt+F2 to access a root prompt
    * umount /dev/hda4
    * tune2fs -O ^has_journal /dev/hda4
    * e2fsck /dev/hda4
    * mount -t ext3 /dev/hda4 /mnt/hda4
          o This should fail. If it does, it proves that the partition no longer has a journaling inode.
    * reboot
    * Remove the Knoppix CD and press Enter as prompted
    * Notice you are now booted to the original operating system (hopefully)
    * Log in as root
    * Execute a mount command to verify an Ext2 /usr partition.

Summary
Converting from Ext2 to Ext3 is usually easy, although converting the root partition is usually undesirable. From what I hear, and from my limited testing, the tune2fs -j command is so safe that it can be performed on a partition mounted read-write. However, it's usually easy to unmount the partition or mount it read-only, and when that's easy, I've done it that way.

Changing the filesystem type of the root directory requires rebuilding the initrd image. Those procedures are explained in this document.


		"
```

### 10.2.4 Increase partition size

#### 10.2.4.1 Example from ACS machine

```text
Basically the root cause is that less than 500gb server will gave only 2gb of /storeddata partition size which is not sufficient for upgrading 5.4.

If it is for our purpose you could increase the size by running below commands,

  lvextend -L5G /dev/smosvg/storeddatavol
  umount /dev/smosvg/storeddatavol
  e2fsck -f /dev/smosvg/storeddatavol
  resize2fs /dev/smosvg/storeddatavol
  mount /dev/smosvg/storeddatavol

			10.2.4.2
```

### 10.2.5 Linux Partition HOWTO

```text
Anthony Lissot
Revision History
Revision 3.5	26 Dec 2005	
reorganized document page ordering. added page on setting up swap space. added page of partition labels. updated max swap size values in section 4. added instructions on making ext2/3 file systems. broken links identified by Richard Calmbach are fixed. created an XML version.
Revision 3.4.4	08 March 2004	
synchronized SGML version with HTML version. Updated lilo placement and swap size discussion.
Revision 3.3	04 April 2003	
synchronized SGML and HTML versions
Revision 3.3	10 July 2001	
Corrected Section 6, calculation of cylinder numbers
Revision 3.2	1 September 2000	
Dan Scott provides sgml conversion 2 Oct. 2000. Rewrote Introduction. Rewrote discussion on device names in Logical Devices. Reorganized Partition Types. Edited Partition Requirements. Added Recovering a deleted partition table.
Revision 3.1	12 June 2000	
Corrected swap size limitation in Partition Requirements, updated various links in Introduction, added submitted example in How to Partition with fdisk, added file system discussion in Partition Requirements.
Revision 3.0	1 May 2000	
First revision by Anthony Lissot based on Linux Partition HOWTO by Kristian Koehntopp.
Revision 2.4	3 November 1997	
Last revision by Kristian Koehntopp.

This Linux Mini-HOWTO teaches you how to plan and create partitions on IDE and SCSI hard drives. It discusses partitioning terminology and considers size and location issues. Use of the fdisk partitioning utility for creating and recovering of partition tables is covered. The most recent version of this document is here. The Turkish translation is here.

Table of Contents
| 1. Introduction
| 
|     1.1. What is a partition?
|     1.2. Other Partitioning Software:
|     1.3. Related HOWTOs
|     1.4. Additional information on your system:
| 
| 2. Devices
| 
|     2.1. Device names
|     2.2. Device numbers
| 
| 3. Partition Types
| 
|     3.1. Partition Types
|     3.2. Foreign Partition Types
|     3.3. Primary Partitions
|     3.4. Logical Partitions
|     3.5. Swap Partitions
| 
| 4. Partitioning requirements
| 
|     4.1. What Partitions do I need?
|     4.2. Discussion:
|     4.3. File Systems
|     4.4. Swap Partitions
| 
| 5. Partitioning with fdisk
| 
|     5.1. fdisk usage
|     5.2. Four primary partitions
|     5.3. Mixed primary and logical partitions
|     5.4. Submitted Examples
| 
| 6. Labels
| 
|     6.1. Volume Labels
|     6.2. Device Labels
| 
| 7. Formatting an ext2/3 partition
| 
|     .1. Simple Invocation
|     .2. Reserved blocks
| 
| 8. Recovering a Deleted Partition Table
| 9. Setting Up Swap Space
| 
|     9.1. Swap Files
|     9.2. Swap Files
|     9.3. Multiple Swap Areas
| 
| 10. Appendix
| 
|     10.1. Formating Partitions
|     10.2. Activating Swap Space
|     10.3. Mounting Partitions
|     10.4. Some facts about file systems and fragmentation

| 1. Introduction
| 1.1. What is a partition?

Partitioning is a means to divide a single hard drive into many logical drives. A partition is a contiguous set of blocks on a drive that are treated as an independant disk. A partition table (the creation of which is the topic of this HOWTO) is an index that relates sections of the hard drive to partitions.

Why have multiple partitions?

    Encapsulate your data. Since file system corruption is local to a partition, you stand to lose only some of your data if an accident occurs.

    Increase disk space efficiency. You can format partitions with varying block sizes, depending on your usage. If your data is in a large number of small files (less than 1k) and your partition uses 4k sized blocks, you are wasting 3k for every file. In general, you waste on average one half of a block for every file, so matching block size to the average size of your files is important if you have many files.

    Limit data growth. Runaway processes or maniacal users can consume so much disk space that the operating system no longer has room on the hard drive for its bookkeeping operations. This will lead to disaster. By segregating space, you ensure that things other than the operating system die when allocated disk space is exhausted. 

| 1.2. Other Partitioning Software:

    sfdisk: a command-line version of fdisk

    cfdisk: a curses-based version of fdisk

    parted: Gnu partition editor

    Partition Magic: a commercial utility to create, resize, merge and convert partitions, without destroying data.

    Disk Drake: a Perl/Gtk program to create, rsize, and delete partitions

| 1.3. Related HOWTOs

Table 1. Related HOWTOs
Title	Author	Description
Dual boot install strategies 	Gjoen Stein 	How to estimate the various size and speed requirements for different parts of the filesystem.
Linux Multiple Disk System Tuning	Gjoen Stein	How to estimate the various size and speed requirements for different parts of the filesystem.
Linux Large Disk 	Andries Brouwer 	Instructions and considerations regarding disks with more than 1024 cylinders
Linux Quota 	Ralf van Dooren 	Instructions on limiting disk space usage per user (quotas)
Partition-Rescue mini-HOWTO 	Jean-Daniel Dodin 	How to restore linux partitions after they have been deleted by a Windows install. Does not appear to preserve data.
Linux ADSM Backup 	Thomas Koenig 	Instructions on integrating Linux into an IBM ADSM backup environment.
Linux Backup with MSDOS 	Christopher Neufeld 	Information about MS-DOS driven Linux backups.
Linux HOWTO Index	Tim Bynum	Instructions on writing and submitting a HOWTO document

| 1.4. Additional information on your system:

    /usr/src/linux/Documentation

        ide.txt: Info about your IDE drivers

        scsi.txt: Info about your SCSI drivers 

| 2. Devices

There is a special nomenclature that linux uses to refer to hard drive partitions that must be understood in order to follow the discussion on the following pages.

In Linux, partitions are represented by device files. These are phoney files located in /dev. Here are a few entries:


brw-rw----    1 root     disk       3,   0 May  5  1998 hda
brw-rw----    1 root     disk       8,   0 May  5  1998 sda
crw-------    1 root     tty        4,  64 May  5  1998 ttyS0

A device file is a file with type c ( for "character" devices, devices that do not use the buffer cache) or b (for "block" devices, which go through the buffer cache). In Linux, all disks are represented as block devices only.
| 2.1. Device names
| 2.1.1. Naming Convention

By convention, IDE drives will be given device names /dev/hda to /dev/hdd. Hard Drive A (/dev/hda) is the first drive and Hard Drive C (/dev/hdc) is the third.

Table 2. IDE controller naming convention
drive name	drive controller	drive number
/dev/hda	1	1
/dev/hdb	1	2
/dev/hdc	2	1
/dev/hdd	2	2

A typical PC has two IDE controllers, each of which can have two drives connected to it. For example, /dev/hda is the first drive (master) on the first IDE controller and /dev/hdd is the second (slave) drive on the second controller (the fourth IDE drive in the computer).

You can write to these devices directly (using cat or dd). However, since these devices represent the entire disk, starting at the first block, you can mistakenly overwrite the master boot record and the partition table, which will render the drive unusable.

Table 3. partition names
drive name	drive controller	drive number	partition type	partition number
/dev/hda1	1	1	primary	1
/dev/hda2	1	1	primary	2
/dev/hda3	1	1	primary	3
/dev/hda4	1	1	swap	NA
/dev/hdb1	1	2	primary	1
/dev/hdb2	1	2	primary	2
/dev/hdb3	1	2	primary	3
/dev/hdb4	1	2	primary	4

Once a drive has been partitioned, the partitions will represented as numbers on the end of the names. For example, the second partition on the second drive will be /dev/hdb2. The partition type (primary) is listed in the table above for clarity, although the concept is not explained until Section 3.3.

Table 4. SCSI Drives
drive name	drive controller	drive number	partition type	partition number
/dev/sda1	1	6	primary	1
/dev/sda2	1	6	primary	2
/dev/sda3	1	6	primary	3

SCSI drives follow a similar pattern; They are represented by 'sd' instead of 'hd'. The first partition of the second SCSI drive would therefore be /dev/sdb1. In the table above, the drive number is arbitraily chosen to be 6 to introduce the idea that SCSI ID numbers do not map onto device names under linux.
| 2.1.2. Name Assignment

Under (Sun) Solaris and (SGI) IRIX, the device name given to a SCSI drive has some relationship to where you plug it in. Under linux, there is only wailing and gnashing of teeth.

Before


SCSI ID #2        SCSI ID #5       SCSI ID #7        SCSI ID #8
 /dev/sda          /dev/sdb         /dev/sdc          /dev/sdd

After


SCSI ID #2                         SCSI ID #7        SCSI ID #8
 /dev/sda                           /dev/sdb          /dev/sdc

SCSI drives have ID numbers which go from 1 through 15. Lower SCSI ID numbers are assigned lower-order letters. For example, if you have two drives numbered 2 and 5, then #2 will be /dev/sda and #5 will be /dev/sdb. If you remove either, all the higher numbered drives will be renamed the next time you boot up.

If you have two SCSI controllers in your linux box, you will need to examine the output of /bin/dmesg in order to see what name each drive was assigned. If you remove one of two controllers, the remaining controller might have all its drives renamed. Grrr...

There are two work-arounds; both involve using a program to put a label on each partition (see Section 6). The label is persistent even when the device is physically moved. You then refer to the partition directly or indirectly by label.
| 2.1.3. Logical Partitions

Table 5. Logical Partitions
drive name	drive controller	drive number	partition type	partition number
/dev/hdb1	1	2	primary	1
/dev/hdb2	1	2	extended	NA
/dev/hda5	1	2	logical	2
/dev/hdb6	1	2	logical	3

The table above illustrates a mysterious jump in the name assignments. This is due to the use of logical partitions (see Section 3.4, which always start with 5, for reasons explained later.

This is all you have to know to deal with linux disk devices. For the sake of completeness, see Kristian's discussion of device numbers below.
| 2.2. Device numbers

The only important thing with a device file are its major and minor device numbers, which are shown instead of the file size:


$ ls -l /dev/hda

Table 6. Device file attributes
brw-rw----	1	root	disk	3,	0	Jul 18 1994	/dev/hda
permissions	 	owner	group	major device number	minor device number	date	device name

When accessing a device file, the major number selects which device driver is being called to perform the input/output operation. This call is being done with the minor number as a parameter and it is entirely up to the driver how the minor number is being interpreted. The driver documentation usually describes how the driver uses minor numbers. For IDE disks, this documentation is in /usr/src/linux/Documentation/ide.txt. For SCSI disks, one would expect such documentation in /usr/src/linux/Documentation/scsi.txt, but it isn't there. One has to look at the driver source to be sure ( /usr/src/linux/driver/scsi/sd.c:184-196). Fortunately, there is Peter Anvin's list of device numbers and names in /usr/src/linux/Documentation/devices.txt; see the entries for block devices, major 3, 22, 33, 34 for IDE and major 8 for SCSI disks. The major and minor numbers are a byte each and that is why the number of partitions per disk is limited.
| 3. Partition Types
| 3.1. Partition Types

A partition is labeled to host a certain kind of file system (not to be confused with a volume label (see Section 6)). Such a file system could be the linux standard ext2 file system or linux swap space, or even foreign file systems like (Microsoft) NTFS or (Sun) UFS. There is a numerical code associated with each partition type. For example, the code for ext2 is 0x83 and linux swap is 0x82. To see a list of partition types and their codes, execute /sbin/sfdisk -T
| 3.2. Foreign Partition Types

The partition type codes have been arbitrarily chosen (you can't figure out what they should be) and they are particular to a given operating system. Therefore, it is theoretically possible that if you use two operating systems with the same hard drive, the same code might be used to designate two different partition types. OS/2 marks its partitions with a 0x07 type and so does Windows NT's NTFS. MS-DOS allocates several type codes for its various flavors of FAT file systems: 0x01, 0x04 and 0x06 are known. DR-DOS used 0x81 to indicate protected FAT partitions, creating a type clash with Linux/Minix at that time, but neither Linux/Minix nor DR-DOS are widely used any more.

OS/2 marks its partitions with a 0x07 type and so does Windows NT's NTFS. MS-DOS allocates several type codes for its various flavors of FAT file systems: 0x01, 0x04 and 0x06 are known. DR-DOS used 0x81 to indicate protected FAT partitions, creating a type clash with Linux/Minix at that time, but neither Linux/Minix nor DR-DOS are widely used any more.
| 3.3. Primary Partitions

The number of partitions on an Intel-based system was limited from the very beginning: The original partition table was installed as part of the boot sector and held space for only four partition entries. These partitions are now called primary partitions.
| 3.4. Logical Partitions

One primary partition of a hard drive may be subpartitioned. These are logical partitions. This effectively allows us to skirt the historical four partition limitation.

The primary partition used to house the logical partitions is called an extended partition and it has its own file system type (0x05). Unlike primary partitions, logical partitions must be contiguous. Each logical partition contains a pointer to the next logical partition, which implies that the number of logical partitions is unlimited. However, linux imposes limits on the total number of any type of partition on a drive, so this effectively limits the number of logical partitions. This is at most 15 partitions total on an SCSI disk and 63 total on an IDE disk.
| 3.5. Swap Partitions

Every process running on your computer is allocated a number of blocks of RAM. These blocks are called pages. The set of in-memory pages which will be referenced by the processor in the very near future is called a "working set." Linux tries to predict these memory accesses (assuming that recently used pages will be used again in the near future) and keeps these pages in RAM if possible.

If you have too many processes running on a machine, the kernel will try to free up RAM by writing pages to disk. This is what swap space is for. It effectively increases the amount of memory you have available. However, disk I/O is about a hundred times slower than reading from and writing to RAM. Consider this emergency memory and not extra memory.

If memory becomes so scarce that the kernel pages out from the working set of one process in order to page in for another, the machine is said to be thrashing. Some readers might have inadvertenly experienced this: the hard drive is grinding away like crazy, but the computer is slow to the point of being unusable. Swap space is something you need to have, but it is no substitute for sufficient RAM. See the discussion in Section 4.4 for tips on determining the size of swap space you need.
| 4. Partitioning requirements
| 4.1. What Partitions do I need?

For the Boot Drive: If you want to boot your operating system from the drive you are about to partition, you will need:

    A primary partition

    One or more swap partitions

    Zero or more primary/logical partitions

For any other drive:

    One or more primary/logical partitions

    Zero or more swap partitions

| 4.2. Discussion:

Boot Partition:

    Your boot partition ought to be a primary partition, not a logical partition. This will ease recovery in case of disaster, but it is not technically necessary. It must be of type 0x83 "Linux native". If you are using a version of lilo before 21-3 (ie, from the 1990s), your boot partition must be contained within the first 1024 cylinders of the drive. (Typically, the boot partition need only contain the kernel image.)

    If you have more than one boot partition (from other OSs, for example,) keep them all in the first 1024 cylinders (All DOS partitions must be within the first 1024). If you are using a modern version of lilo, or a means other than lilo to load your kernel (for example, a boot disk or the LOADLIN.EXE MS-DOS based Linux loader), the partition can be anywhere. See the Large-disk HOWTO for details. 
Swap Partition:

    Unless you swap to files (see Section 9.2) you will need a dedicated swap partition. It must be of type 0x82 "Linux swap". It may be positioned anywhere on the disk (but see Section 4.4.3). Either a primary or logical partition can be used for swap. More than one swap partition can exist on a drive. 8 total (across drives) are permitted. See notes on swap size below (Section 4.4). 
Logical Partition:

    A single primary partition must be used as a container (extended partition) for the logical partitions. The extended partition can go anywhere on the disk. The logical partitions must be contiguous, but needn't fill the extended partition. 

| 4.3. File Systems
| 4.3.1. Which file systems need their own partitions?

Everything in your linux file system can go in the same (single) partition. However, there are circumstances when you may want to restrict the growth of certain file systems. For example, if your mail spool was in the same partition as your root fs and it filled the remaining space in the partition, your computer would basically hang.

/var

    This fs contains spool directories such as those for mail and printing. In addition, it contains the error log directory. If your machine is a server and develops a chronic error, those msgs can fill the partition. Server computers ought to have /var in a different partition than /. 
/usr

    This is where most executable binaries go. In addition, the kernel source tree goes here, and much documentation. 
/tmp

    Some programs write temporary data files here. Usually, they are quite small. However, if you run computationally intensive jobs, like science or engineering applications, hundreds of megabytes could be required for brief periods of time. In this case, keep /tmp in a different partition than /. 
/home

    This is where users home directories go. If you do not impose quotas on your users, this ought to be in its own partition. 
/boot

    This is where your kernel images go. See discussion above for placement on old systems. 

| 4.3.2. File lifetimes and backup cycles as partitioning criteria

With ext2, partitioning decisions should be governed by backup considerations and to avoid external fragmentation Section 10.4 from different file lifetimes.

Files have lifetimes. After a file has been created, it will remain some time on the system and then be removed. File lifetime varies greatly throughout the system and is partly dependent on the pathname of the file. For example, files in /bin, /sbin, /usr/sbin, /usr/bin and similar directories are likely to have a very long lifetime: many months and above. Files in /home are likely to have a medium lifetime: several weeks or so. File in /var are usually short lived: Almost no file in /var/spool/news will remain longer than a few days, files in /var/spool/lpd measure their lifetime in minutes or less.

For backup it is useful if the amount of daily backup is smaller than the capacity of a single backup medium. A daily backup can be a complete backup or an incremental backup.

You can decide to keep your partition sizes small enough that they fit completely onto one backup medium (choose daily full backups). In any case a partition should be small enough that its daily delta (all modified files) fits onto one backup medium (choose incremental backup and expect to change backup media for the weekly/monthly full dump - no unattended operation possible).

Your backup strategy depends on that decision.

When planning and buying disk space, remember to set aside a sufficient amount of money for backup! Unbackuped data is worthless! Data reproduction costs are much higher than backup costs for virtually everyone!

For performance it is useful to keep files of different lifetimes on different partitions. This way the short lived files on the news partition may be fragmented very heavily. This has no impact on the performance of the / or /home partition.
| 4.4. Swap Partitions
| 4.4.1. How large should my swap space be?

Conventional wisdom creates swap space equal to the amount of RAM.

But keep in mind that this is just a rule of thumb. It is easily possible to create scenarios where programs have extremely large or extremely small working sets (see Section 3.5). For example, a simulation program with a large data set that is accessed in a very random fashion would have almost no noticeable locality of reference in its data segment, so its working set would be quite large.

On the other hand, a graphics program with many simultaneously opened JPEGs, all but one iconified, would have a very large data segment. But image transformations are all done on one single image, most of the memory occupied by the program is not accessed. The same is true for an editor with many editor windows where only one window is being modified at a time. These programs have - if they are designed properly - a very high locality of reference and large parts of them can be kept swapped out without too severe performance impact. A user who never never quits programs once launched would want a lot of swap space for the same reason.

Servers typically are configured with more swap space than their desktop counterparts. Even though a given amount of swap is sufficient for its operations, the server might come under transient heavy loads which cause it to page out at a high rate. Some administrators prefer this to the server crashing altogether. In these cases, swap might be several times the size of ram.
| 4.4.2. How large can my swap space be?

Currently, the maximum size of a swap partition is architecture-dependent. For i386, m68k, ARM and PowerPC, it is "officially" 2Gb. It is 128Gb on alpha, 1Gb on sparc, and 3Tb on sparc64. An opteron on the 2.6 kernel can write to a 16 Tb swap partition. For linux kernels 2.1 and earlier, the limit is 128Mb. The partition may be larger than 128 MB, but excess space is never used. If you want more than 128 MB of swap for a 2.1 and earlier kernel, you have to create multiple swap partitions (8 max). After 2.4, 32 swap areas are "officially" possible. See setting up swap for details.

footnote: "official" max swap size: With kernel 2.4, the limit is 64 swap spaces at a maximum of 64Gb each, although this is not reflected in the man page for mkswap. With the 64 bit opteron on the 2.6 kernel, 128 swap areas are permitted, each a whopping 16 Tb! (thanks to Peter Chubb for the calculation)
| 4.4.3. Where should I put my swap space?

The short answer is anywhere is fine. However, if you are interested in extracting as much speed as possible, there are two basic strategies (other than buying more RAM).

    Split the swap space across multiple drives, or at least on the drive you write to least.

    Put each swap partition on the outer tracks. 

Here are the considerations:

    If you have a disk with many heads and one with less heads and both are identical in other parameters, the disk with many heads will be faster. Reading data from different heads is fast, since it is purely electronic. Reading data from different tracks is slow, since it involves physically moving the head.

    It follows then that writing swap on a separate drive will be faster than moving the head back and forth on a single drive.

    Placement: Older disks have the same number of sectors on all tracks. With these disks it will be fastest to put your swap in the middle of the disks, assuming that your disk head will move from a random track towards the swap area.

    Newer disks use ZBR (zone bit recording). They have more sectors on the outer tracks. With a constant number of rpms, this yields a far greater performance on the outer tracks than on the inner ones. Put your swap on the fast tracks. (In general, low-numbered cylinders are associated low partition numbers. However, see Kristian's more recent comments on this issue. -Tony)

    Usage: Of course your disk head will not move randomly. If you have swap space in the middle of a disk between a constantly busy home partition and an almost unused archive partition, you would be better of if your swap were near the home partition for even shorter head movements. You would be even better off, if you had your swap on another otherwise unused disk, though.

    Striping: Speed can be increased by writing to multiple swap areas simultaneously. Swap spaces with the same priority will be written to like a RAID. See Section 9.3. 

Summary: Put your swap on a fast disk with many heads that is not busy doing other things. If you have multiple disks: Split swap and scatter it over all your disks or even different controllers.
| 5. Partitioning with fdisk

This section shows you how to actually partition your hard drive with the fdisk utility. Linux allows only 4 primary partitions. You can have a much larger number of logical partitions by sub-dividing one of the primary partitions. Only one of the primary partitions can be sub-divided.

Examples:

    Four primary partitions (see Section 5.2)

    Mixed primary and logical partitions (see Section 5.3) 

| 5.1. fdisk usage

fdisk is started by typing (as root) fdisk device at the command prompt. device might be something like /dev/hda or /dev/sda (see Section 2.1.1). The basic fdisk commands you need are:

p print the partition table

n create a new partition

d delete a partition

q quit without saving changes

w write the new partition table and exit

Changes you make to the partition table do not take effect until you issue the write (w) command. Here is a sample partition table:


Disk /dev/hdb: 64 heads, 63 sectors, 621 cylinders
Units = cylinders of 4032 * 512 bytes
 
   Device Boot    Start       End    Blocks   Id  System
/dev/hdb1   *         1       184    370912+  83  Linux
/dev/hdb2           185       368    370944   83  Linux
/dev/hdb3           369       552    370944   83  Linux
/dev/hdb4           553       621    139104   82  Linux swap

The first line shows the geometry of your hard drive. It may not be physically accurate, but you can accept it as though it were. The hard drive in this example is made of 32 double-sided platters with one head on each side (probably not true). Each platter has 621 concentric tracks. A 3-dimensional track (the same track on all disks) is called a cylinder. Each track is divided into 63 sectors. Each sector contains 512 bytes of data. Therefore the block size in the partition table is 64 heads * 63 sectors * 512 bytes er...divided by 1024. (See 4 for discussion on problems with this calculation.) The start and end values are cylinders.
| 5.2. Four primary partitions

The overview:

Decide on the size of your swap space (see Section 4.4) and where it ought to go (see Section 4.4.3). Divide up the remaining space for the three other partitions.

Example:

I start fdisk from the shell prompt:


# fdisk /dev/hdb 

which indicates that I am using the second drive on my IDE controller. (See Section 2.1.) When I print the (empty) partition table, I just get configuration information.


Command (m for help): p

Disk /dev/hdb: 64 heads, 63 sectors, 621 cylinders
Units = cylinders of 4032 * 512 bytes

I knew that I had a 1.2Gb drive, but now I really know: 64 * 63 * 512 * 621 = 1281982464 bytes. I decide to reserve 128Mb of that space for swap, leaving 1153982464. If I use one of my primary partitions for swap, that means I have three left for ext2 partitions. Divided equally, that makes for 384Mb per partition. Now I get to work.


Command (m for help): n
Command action
   e   extended
   p   primary partition (1-4)
p
Partition number (1-4): 1
First cylinder (1-621, default 1):<RETURN>
Using default value 1
Last cylinder or +size or +sizeM or +sizeK (1-621, default 621): +384M

Next, I set up the partition I want to use for swap:


Command (m for help): n
Command action
   e   extended
   p   primary partition (1-4)
p
Partition number (1-4): 2
First cylinder (197-621, default 197):<RETURN>
Using default value 197
Last cylinder or +size or +sizeM or +sizeK (197-621, default 621): +128M

Now the partition table looks like this:


   Device Boot    Start       End    Blocks   Id  System
/dev/hdb1             1       196    395104   83  Linux
/dev/hdb2           197       262    133056   83  Linux

I set up the remaining two partitions the same way I did the first. Finally, I make the first partition bootable:


Command (m for help): a
Partition number (1-4): 1

And I make the second partition of type swap:


Command (m for help): t
Partition number (1-4): 2
Hex code (type L to list codes): 82
Changed system type of partition 2 to 82 (Linux swap)      
Command (m for help): p

The end result:


Disk /dev/hdb: 64 heads, 63 sectors, 621 cylinders
Units = cylinders of 4032 * 512 bytes
 
   Device Boot    Start       End    Blocks   Id  System
/dev/hdb1   *         1       196    395104+  83  Linux
/dev/hdb2           197       262    133056   82  Linux swap
/dev/hdb3           263       458    395136   83  Linux
/dev/hdb4           459       621    328608   83  Linux          

Finally, I issue the write command (w) to write the table on the disk.

Side topics:

    Section 10.2

    Section 10.1

    Section 10.3

| 5.3. Mixed primary and logical partitions

The overview: create one use one of the primary partitions to house all the extra partitions. Then create logical partitions within it. Create the other primary partitions before or after creating the logical partitions.

Example:

I start fdisk from the shell prompt:


# fdisk /dev/sda

which indicates that I am using the first drive on my SCSI chain. (See Section 2.1.)

First I figure out how many partitions I want. I know my drive has a 183Gb capacity and I want 26Gb partitions (because I happen to have back-up tapes that are about that size).

183Gb / 26Gb = ~7

so I will need 7 partitions. Even though fdisk accepts partition sizes expressed in Mb and Kb, I decide to calculate the number of cylinders that will end up in each partition because fdisk reports start and stop points in cylinders. I see when I enter fdisk that I have 22800 cylinders.


> The number of cylinders for this disk is set to 22800.  There is
> nothing wrong with that, but this is larger than 1024, and could in
> certain setups cause problems with: 1) software that runs at boot
> time (e.g., LILO) 2) booting and partitioning software from other
> OSs  (e.g., DOS FDISK, OS/2 FDISK)

So, 22800 total cylinders divided by seven partitions is 3258 cylinders. Each partition will be about 3258 cylinders long. I ignore the warning msg because this is not my boot drive (Section 4).

Since I have 4 primary partitions, 3 of them can be 3258 long. The extended partition will have to be (4 * 3258), or 13032, cylinders long in order to contain the 4 logical partitions.

I enter the following commands to set up the first of the 3 primary partitions (stuff I type is bold ):


Command (m for help): n
Command action
   e   extended
   p   primary partition (1-4)
p
Partition number (1-4): 1
First cylinder (1-22800, default 1): <RETURN>
Using default value 1
Last cylinder or +size or +sizeM or +sizeK (1-22800, default 22800): 3258

The last partition is the extended partition:


Partition number (1-4): 4
First cylinder (9775-22800, default 9775): <RETURN>
Using default value 9775
Last cylinder or +size or +sizeM or +sizeK (9775-22800, default 22800): <RETURN>
Using default value 22800

The result, when I issue the print table command is:


/dev/sda1             1      3258  26169853+  83  Linux
/dev/sda2          3259      6516  26169885   83  Linux
/dev/sda3          6517      9774  26169885   83  Linux
/dev/sda4          9775     22800 104631345    5  Extended

Next I segment the extended partition into 4 logical partitions, starting with the first logical partition, into 3258-cylinder segments. The logical partitions automatically start from /dev/sda5.


Command (m for help):  n
First cylinder (9775-22800, default 9775): <RETURN>
Using default value 9775
Last cylinder or +size or +sizeM or +sizeK (9775-22800, default 22800): 13032

The end result is:


   Device Boot    Start       End    Blocks   Id  System
/dev/sda1             1      3258  26169853+  83  Linux
/dev/sda2          3259      6516  26169885   83  Linux
/dev/sda3          6517      9774  26169885   83  Linux
/dev/sda4          9775     22800 104631345    5  Extended
/dev/sda5          9775     13032  26169853+  83  Linux
/dev/sda6         13033     16290  26169853+  83  Linux
/dev/sda7         16291     19584  26459023+  83  Linux
/dev/sda8         19585     22800  25832488+  83  Linux

Finally, I issue the write command (w) to write the table on the disk. To make the partitions usable, I will have to format (Section 10.1) each partition and then mount (Section 10.3) it.
| 5.4. Submitted Examples

I'd like to submit my partition layout, because it works well with any distribution of Linux (even big RPM based ones). I have one hard drive that ... is 10 gigs, exactly. Windows can't see above 9.3 gigs of it, but Linux can see it all, and use it all. It also has much more than 1024 cylenders.

Table 7. Partition layout example
Partition	Mount point	Size
/dev/hda1	/boot	(15 megs)
/dev/hda2	windows 98 partition	(2 gigs)
/dev/hda3	extended	(N/A)
/dev/hda5	swap space	(64 megs)
/dev/hda6	/tmp	(50 megs)
/dev/hda7	/	(150 megs)
/dev/hda8	/usr	(1.5 gigs)
/dev/hda9	/home	(rest of drive)
I test new kernels for the USB mass storage, so that explains the large /boot partition. I install LILO into the MBR, and by default I boot windows (I'm not the only one to use this computer).

I also noticed that you don't have any REAL examples of partition tables, and for newbies I HIGHLY suggest putting quite a few up. I'm freshly out of the newbie stage, and partitioning was what messed me up the most.

Valkor
| 6. Labels

In linux, hard drives are referred to as devices, and devices are pseudo files in /dev. For example, the first partition of the second lowest numbered SCSI drive is /dev/sdb1. If the drive referred to as /dev/sda is removed from the chain, then the latter partition is automatically renamed /dev/sda1 at reboot.
| 6.1. Volume Labels

Volume labels make it possible for partitions to retain a consistent name regardless of where they are connected, and regardless of whatever else is connected. Labels are not mandatory for a linux volume. Each can be a maximum of 16 characters long.

There are three tools to make volume labels: mke2fs, tune2fs and e2label.
| 6.1.1. Simple Invocation

e2label /dev/hdb1 pubsw

tune2fs -L pubsw /dev/hdb1

Either of thse two commands will label the first partition of the second drive "pubsw". That label stays with that particular partition, even if the drive is moved to another controller or even another computer.

mke2fs	pubsw /dev/hdb1

mke2fs -L pubsw /dev/hdb1

will do the same thing as the first two commands - after they make the file system. This means that either of these last two commands will delete any existing data in the partition.
| 6.1.2. How to Use

Here is a sample fstab. This is a text file located in /etc, which is usually set up during the installation of the operating system. it describes where each partition wil be mounted, and how it will be mounted. It can be modified by you, either through a utility or manually, when you add/remove devices.


LABEL=/        /                    ext3    defaults        1 1
LABEL=/boot    /boot                ext2    defaults        1 2
none           /dev/pts             devpts  gid=5,mode=620  0 0
none           /dev/shm             tmpfs   defaults        0 0
LABEL=HOME     /home                ext3    defaults        1 2
none           /proc                proc    defaults        0 0
none           /sys                 sysfs   defaults        0 0
LABEL=/usr     /usr                 ext3    defaults        1 2
/dev/hdc1      /k-space             ext3    defaults        1 2
/dev/hda6      swap                 swap    defaults        0 0
/dev/hdd       /media/cdrecorder    auto    pamconsole,ro,exec,noauto,managed 0 0
/dev/fd0       /media/floppy        auto    pamconsole,exec,noauto,managed 0 0

The leftmost column lists devices and the second column lists mount points. This example contains a mixture of devices and labels. The master drive of the second controller is always mounted on /k-space. The partition labeled "HOME" is always mounted on /home, regardless of which drive it is on or which partition number it has. Notice that it is permissible to use mount points as labels, such as "/usr"
| 6.2. Device Labels

devlabel is a script which creates symbolic links to devices. For example,

devlabel -d /dev/hdb1 -s /dev/home

will create a link from /dev/hdb1 to /dev/home. Crucially, it stores a unique identifier for the hardware that was on /dev/hdb1 and stores that identifier along with the link name that you specified in /etc/sysconfig/devlabel. If the hardware is later moved to /dev/hdc1, its unique identifier will be queried (using /usr/bin/partition_uuid), matched to its entry in /etc/sysconfig/devlabel, and again linked to /dev/home.
| 7. Formatting an ext2/3 partition

When a hard drive is partitioned, it is mapped into sections, but the sections are empty. It is like a newly constructed library; shelves, signs, and a card catalogue system must be put in place before the books are put away.

The organizational structure inside a partition is called a file system. With Linux, the standard file system is ext2 and ext3. The ext3 file system is ext2, plus a log of disk writes called a journal. The journal allows the system to recover quickly from accidental power outages, among other things.

The principal tool for making an ext2/3 file system in a partition is mke2fs. It is usually found in /sbin. mkfs.ext2 and mkfs.ext3 are frontends which pass specific options to mke2fs.
| .1. Simple Invocation

mke2fs /dev/hdb1

mkfs.ext2 /dev/hdb1

both of which make an ext2 file system on the first partition of the second drive, and

mke2fs	-j /dev/hdb1

mkfs.ext3 /dev/hdb1

make an ext3 file system.
| .2. Reserved blocks

The -m option is probably the one of most use to non-experts. If the file system becomes filled and there is no more space to write, it is basically unusable because the operating system is constantly writing to disk. By default, five percent of the partition is reserved for use by the root user. This allows root to conduct administrative activities on the partition and perhaps move some data off. However, this is most critical when the partition contains / or home directories. For pure data partitions, this is just lost space. Five percent of a 250Gb partition is 12.5 Gb. Especially in the case of large partitions, it is safe to set the reserved space to the minimum, which is one percent.

mkfs.ext3 -m 1/dev/hdb1

creates a file system with only 1% of its space reserved for the root user. tune2fs -m can be used to adjust the reserved blocks after data is loaded on the partition.
| 8. Recovering a Deleted Partition Table

Below are instructions for manually recovering a deleted partition table. There are utilities such as gpart or TestDisk which can make this task considerably easier. If you are reading this, however, because you have run out of luck, this is what you will have to do:

    Make a partition that is at least as big as your first partition was. You can make it larger than the original partition by any amount. If you underestimate, there will be much wailing and gnashing of teeth.


    Command (m for help): n
    Command action
       e   extended
       p   primary partition (1-4)
    p
    Partition number (1-4): 1
    First cylinder (1-23361, default 1): <RETURN>
    Using default value 1
    Last cylinder or +size or +sizeM or +sizeK (1-22800, default 22800): 13032

    Command (m for help): w

    Run dumpe2fs on the first partition and grep out the block count.

    Example:


               % dumpe2fs /dev/sda1 | grep "Block count:"
               Block count:              41270953
          

    If you are uncertain about this value, repeat Step 1 with a bigger partition size. If the block count changes, then you underestimated the size of the original partition. Repeat Step 1 until you get a stable block count.

    Remove the partition you just created


             Command (m for help): d
             Partition number (1-4): 1
          

    Make a new partition with the exact size you got from the block count. Since you cannot enter block size in fdisk, you need to figure out how many cylinders to request. Here is the formula:


      (number of needed cylinders) = (number of blocks) / (block size)

      (block size) = (unit size) / 1024

      (unit size) = (number of heads) * (number of sectors/cylinder) * (number of bytes/sector)

    Consider the following example, where a hard drive has been partitioned into four primary partitions of 1, 2, 4, and 8 cylinders.


    disk /dev/sda: 16 heads, 63 sectors, 23361 cylinders
    Units = cylinders of 1008 * 512 bytes

       Device Boot    Start       End    Blocks   Id  System
    /dev/sda1             1         2       976+  83  Linux
    /dev/sda2             3         5      1512   83  Linux
    /dev/sda3             6        10      2520   83  Linux
    /dev/sda4            11        19      4536   83  Linux

    fdisk provides the configuration information I need in the head of the output. The unit size is 516096 ( 16 heads * 63 sectors/cyl * 512 bytes/sector ). The block size is 504 ( 516096 / 1024 ). The number of needed cylinders for the second partition is therefore 3 ( 1512 blocks / 504 ). The partition table shows that this is indeed the case: the first cylinder is 3, the second 4, and the last is 5, for a total of three cylinders. The number of needed cylinders for the third partition is calculated similarly: 2520 blocks / 504 = 5, which corresponds to blocks 6,7,8,9,10 . Notice that this calculation does not work for the first partition because the block count is wrong ( 976 instead of 1008 ). The plus sign indicates that not all the blocks are included in the fdisk value. When you try the calculation ( 976 / 504 ) you get 1.937. Knowing that the number of cylinders must be an integer, you can simply round up.

    Run e2fsck on it to verify that you can read the new partition.

    Repeat Steps 1-5 on remaining partitions. 

Remount your partitions. Amazingly, all of your data will be there.

Credit goes to: Mike Vevea, jedi sys admin, for providing the basic strategy.
| 9. Setting Up Swap Space
| 9.1. Swap Files

Normally, there are only two steps to setting up swap space, creating the partition and adding it to /etc/fstab. A typical fstab entry for a swap partition at /dev/hda6 would look like this:


/dev/hda6	swap	swap	defaults	0	0

The next time you reboot, the initialization scripts will activate it automatically and there's nothing more to be done.

However, if you want to make use of it right away, you'll need to activate it maually. As root, type:


mkswap -f /dev/hda6
swapon /dev/hda6

| 9.2. Swap Files

There might be times when you've run out of swap space and it is not practical to repartition a drive or add a new one. In this case, you can use a regular file in an ordinary partition. All you have to do is create a file of the size you want

dd if=/dev/zero of=/var/my_swap bs=1024 count=131072

and activate it


	mkswap -f /var/my_swap
	swapon /var/my_swap

This invocation creates a file called my_swap in /var. It is 128 Mb long (128 x 1024 = 131072). Initially, it is filled with zeros. However, mkswap marks it as swap space and swapon tells the kernel to start using it as swap space. When you are done with it,


swapoff /var/my_swap
rm /var/my_swap

| 9.3. Multiple Swap Areas

More than one swap partition can be used on the same system. Consider an example fstab where there is a single swap partition:


/dev/hda5   /        ext3   defaults        1	1
/dev/hda1   /boot    ext2   defaults        1	2
none        /dev/pts devpts gid=5,mode=620  0	0
none        /proc    proc   defaults        0	0
/dev/hda7   /usr     ext3   defaults        1	2
/dev/hda6   swap     swap   defaults        0	0

Imagine replacing the entry for the swap partition with these three lines:


/dev/hda6   none    swap    sw,pri=3    0	0
/dev/hdb2   none    swap    sw,pri=2    0	0
/dev/hdc2   none    swap    sw,pri=1    0	0

This configuration would cause the kernel to use /dev/hda6 first. it has the highest priority assigned to it (pri=3). The maximum priority can be 32767 and the lowest 0. If that space were to max out, the kernel would start using /dev/hdb2, and on to /dev/hdc2 after that. Why such a configuration? Imagine that the newest (fastest) drives are given the highest priority. This will minimize speed loss as swap space usage grows.

It is possible to write to all three simulataneously. If each has the same priority, the kernel will write to them much like a RAID, with commensurate speed increases.


/dev/hda6   none   swap   sw,pri=3   0   0
/dev/hdb2   none   swap   sw,pri=3   0   0
/dev/hdc2   none   swap   sw,pri=3   0   0

Notice that these three partitions are on separate drives, which is ideal in terms of speed enhancement.
| 10. Appendix
| 10.1. Formating Partitions

At the shell prompt, I begin making the file systems on my partitions. Continuing with the example in (see Section 5.3), this is:


# mke2fs /dev/sda1

I need to do this for each of my partitions, but not for /dev/sda4 (my extended partition). Linux supports types of file systems other than ext2. You can find out what kinds your kernel supports by looking in: /usr/src/linux/include/linux/fs.h

The most common file systems can be made with programs in /sbin that start with "mk" like mkfs.msdos and mke2fs.
| 10.2. Activating Swap Space

To set up a swap partition:


# mkswap -f /dev/hda5

To activate the swap area:


# swapon  /dev/hda5

Normally, the swap area is activated by the initialization scripts at boot time.
| 10.3. Mounting Partitions

Mounting a partition means attaching it to the linux file system. To mount a linux partition:


# mount -t ext2 /dev/sda1 /opt

-t ext2

    File system type. Other types you are likely to use are:

        ext3 (journaling sile system based on ext2)

        msdos (DOS)

        hfs (mac)

        iso9660 (CDROM)

        nfs (network file system)

/dev/sda1

    Device name. Other device names you are likely to use:

        /dev/hdb2 (second partition in second IDE drive)

        /dev/fd0 (floppy drive A)

        /dev/cdrom (CDROM)

/opt

    mount point. This is where you want to "see" your partition. When you type ls /opt, you can see what is in /dev/sda1. If there are already some directories and/or files under /opt, they will be invisible after this mount command. 

| 10.4. Some facts about file systems and fragmentation

Disk space is administered by the operating system in units of blocks and fragments of blocks. In ext2, fragments and blocks have to be of the same size, so we can limit our discussion to blocks.

Files come in any size. They don't end on block boundaries. So with every file a part of the last block of every file is wasted. Assuming that file sizes are random, there is approximately a half block of waste for each file on your disk. Tanenbaum calls this "internal fragmentation" in his book "Operating Systems".

You can guess the number of files on your disk by the number of allocated inodes on a disk. On my disk


# df -i
Filesystem           Inodes   IUsed   IFree  %IUsed Mounted on
/dev/hda3              64256   12234   52022    19%  /
/dev/hda5              96000   43058   52942    45%  /var

there are about 12000 files on / and about 44000 files on /var. At a block size of 1 KB, about 6+22 = 28 MB of disk space are lost in the tail blocks of files. Had I chosen a block size of 4 KB, I had lost 4 times this space.

Data transfer is faster for large contiguous chunks of data, though. That's why ext2 tries to preallocate space in units of 8 contigous blocks for growing files. Unused preallocation is released when the file is closed, so no space is wasted.

Noncontiguous placement of blocks in a file is bad for performance, since files are often accessed in a sequential manner. It forces the operating system to split a disk access and the disk to move the head. This is called "external fragmentation" or simply "fragmentation" and is a common problem with MS-DOS file systems. In conjunction with the abysmal buffer cache used by MS-DOS, the effects of file fragmentation on performance are very noticeable. DOS users are accustomed to defragging their disks every few weeks and some have even developed some ritualistic beliefs regarding defragmentation.

None of these habits should be carried over to Linux and ext2. Linux native file systems do not need defragmentation under normal use and this includes any condition with at least 5% of free space on a disk. There is a defragmentation tool for ext2 called defrag, but users are cautioned against casual use. A power outage during such an operation can trash your file system. Since you need to back up your data anyway, simply writing back from your copy will do the job.

The MS-DOS file system is also known to lose large amounts of disk space due to internal fragmentation. For partitions larger than 256 MB, DOS block sizes grow so large that they are no longer useful (This has been corrected to some extent with FAT32). Ext2 does not force you to choose large blocks for large file systems, except for very large file systems in the 0.5 TB range (that's terabytes with 1 TB equaling 1024 GB) and above, where small block sizes become inefficient. So unlike DOS there is no need to split up large disks into multiple partitions to keep block size down.

Use a 1Kb block size if you have many small files. For large partitions, 4Kb blocks are fine. 
```

### 10.2.6 Linux Logical Volume Extend Size

```text
You can extend a volume size in linux by just following the commands below

If you want to extend a size of volume /dev/mapper/volume-var to 400GB you need enter the following command.

lvextend -L400GB /dev/mapper/volume-var

O/P

Extending logical volume usr to 100.00 GiB
  Logical volume usr successfully resized

unmount the volume by

umount /dev/mapper/volume-var

Then resize the volume

resize2fs /dev/mapper/volume-var

O/P

resize2fs 1.41.12 (17-May-2010)
Filesystem at /dev/mapper/volume-var is mounted on /var; on-line resizing required
old desc_blocks = 1, new_desc_blocks = 7
Performing an on-line resize of /dev/mapper/volume-var to 26214400 (4k) blocks.
The filesystem on /dev/mapper/volume-var is now 26214400 blocks long.

Then mount the voulme file system

mount /dev/mapper/volume-var /var

You are done with lvm extending.
[Note: For /var and / partitions you will not be able to unmount them but you may resize the partition without unmounting and it is at your own risk of data loss].

		10.2.7
```
