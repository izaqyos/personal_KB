---
type: reference
title: RPMs
description: "RPM commands: query, uninstall, install, list contents and print package info."
tags: [rpm, linux, cheatsheet, one-liners, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "linux/KB_Linux#1"
---

# RPMs

[↑ KB_Linux](/linux/kb-linux/README.md)

## 1.1 query installed rpm

```text
	rpm -qa | grep <rpm name>
```

## 1.2 uninstall package

```text
	rpm -e <rpm name>
```

## 1.3 install RPM

```text
	rpm -ivh <rpm name>
```

## 1.4 Listing Contents of an RPM Package

```text
To list files archived in an RPM package, issue an RPM query command:

rpm -qlp myfile.rpm

Here command line parameters have the following meaning:
q	-	perform a query
l	-	list files
p	-	use the specified package file (myfile.rpm in this example)
```

## 1.5 . Printing Out an RPM Package Information

```text
To retrieve general information about a given RPM package, issue the following RPM query:

rpm -qip myfile.rpm

Here command line parameters have the following meaning:
q	-	perform a query
i	-	print out package information
p	-	use the specified package file (myfile.rpm in this example)

This query will print out all the essential information stored by the creator of the RPM package in question. This may contain such fields as package name and version, creator's name, build date and  what's most important for users  relocations. Section 7 explains how to make use of this information. 
```

## 1.6 Simple Unpacking(extract) of an RPM Archive

```text
In many cases you would only need to extract files from an RPM archive, without performing complex operations with an RPM database. There is a simple way to do it:

rpm2cpio < myfile.rpm | cpio -i --make-directories

This method makes use of the generic GNU CPIO utility, which deals with copying files to and from archives. The rpm2cpio command converts from RPM to CPIO format, and the output of this conversion is redirected to the cpio command. Command line parameters for the latter have the following meaning:
i	-	extract contents
make-directories	-	create directories when necessary

As a result, all the contents of the RPM package will be extracted into the current directory, creating relative paths. 
```

## 1.7 Creating a Private RPM Database

```text
To achieve a higher flexibility and to get access to more RPM functionality, you may want to make a step forward and create your own RPM database. You only have to do it once, by issuing the following instructions:

mkdir $HOME/myrpmdb
rpmdb --initdb --dbpath $HOME/myrpmdb

or, for older versions of RPM:

mkdir $HOME/myrpmdb
rpm --initdb --dbpath $HOME/myrpmdb

Mentioned in this example directory $HOME/myrpmdb can of course be substituted with any other location which suits you best. The only requirement is that you must have write permissions in this location.

Having such a personal RPM database allows you to perform more complex operations with RPM packages, without resorting to simple unpacking and manual installation. To simplify your life even further, do the following:

echo '%_dbpath /home/yourname/myrpmdb' | cat >> $HOME/.rpmmacros

This will create a file .rpmmacros in your $HOME directory, and add there the line specifying the database location. In this example, /home/yourname/myrpmdb should be substituted with your RPM database path. This will instruct RPM to use always your personal database. If you don't want to use this feature (for example, if you have several databases), take care to append

--dbpath $HOME/myrpmdb

to each RPM instruction which refers to such a database (e.g., package installation or removal) .

It may be useful to copy the system-wide database into your own one. RPM does not provide any tool for database synchronization (yet?), thus you have to do it hard way:

cp /var/lib/rpm/* $HOME/myrpmdb/.

Here /var/lib/rpm/ is a typical default location of the system-wide database (it could be different though on different systems). Having thus your private database initialized with the existing system information may help you in dealing with dependencies (see Section 8), but only for a while, since any system-wide upgrades will not be registered in your database, and there is no way to synchronize RPM databases in a clever manner.
```

## 1.8 Installing an RPM Package

```text
Having defined your private database (Section 4), you can attempt to install any RPM package by doing the following:

rpm -ivh myfile.rpm

Here command line parameters have the following meaning:
i	-	perform an installation procedure
v	-	print extra information
h	-	print progress bar with hash-marks

Keep in mind that if you didn't define a default database in $HOME/.rpmmacros, you'll have to append --dbpath $HOME/myrpmdb (or whatever is your private database location) to the directive.

Most likely, however, such a simple installation instruction will fail. There are two main reasons:

   -> RPM packages attempt to install themselves in locations defined by their creators, not by you. How to get around, read in Section 1.10.
   -> RPM checks for other software needed by the package  dependencies  in your private database; however, most likely, such software was not installed by you and can not be found in your database. How to deal with it, read in Section 1.11. 
```

## 1.9 Upgrading RPM Packages

```text
If you happened to have a package installed and simply want to upgrade it, issue the following instruction:

rpm -Uvh myfile.rpm

Here command line parameters have the following meaning:
U	-	upgrade the installation
v	-	print extra information
h	-	print progress bar with hash-marks

Since this operation needs to access a database, you either have to have the default database location specified in the $HOME/.rpmmacros file, or to append --dbpath $HOME/myrpmdb (or whatever is your private database location) to the directive (see Section 1.7 for details). 
```

## 1.10 Upgrading RPM Packages

```text
If you happened to have a package installed and simply want to upgrade it, issue the following instruction:

rpm -Uvh myfile.rpm

Here command line parameters have the following meaning:
U	-	upgrade the installation
v	-	print extra information
h	-	print progress bar with hash-marks

Since this operation needs to access a database, you either have to have the default database location specified in the $HOME/.rpmmacros file, or to append --dbpath $HOME/myrpmdb (or whatever is your private database location) to the directive (see Section 1.7 for details). 
```

## 1.11 Dealing with Dependencies

```text
Even when relocations proceeded smoothly, your package may still fail to get installed due to unsatisfied dependencies (this is the name for any other software needed by the package), which are absent from your private database (Section 4). A bold way to deal with it is to force the installation, e.g.:

rpm -ivh myfile.rpm --relocate /oldlocation=/newlocation --nodeps

The command line parameters have the following meaning:
i	-	perform an installation procedure
v	-	print extra information
h	-	print progress bar with hash-marks
relocate	-	instruct RPM to install files from /oldlocation into /newlocation
nodeps	-	ignore dependencies

This is an admittedly non-elegant way. A better solution may be to enter the necessary information into the database by installing "virtual" RPMs which only register a database record without actually installing software; however this is clearly package-dependent, thus you should request such a "fake" RPM from the package provider. An example of a shell script building such a virtual RPM can be found here.
```

## 1.12 Listing Installed Packages

```text
To list all the packages installed via RPM mechanisms, do:

rpm -qai

Here command line parameters have the following meaning:
q	-	perform a query
a	-	query all installed packages
i	-	print out package information

This command prints out the information stored in your RPM database, hence you either have to have the default database location specified in the $HOME/.rpmmacros file, or to append --dbpath $HOME/myrpmdb (or whatever is your private database location) to the directive
```

## 1.13 Building RPM from Source

```text
It may happen so that binary RPM packages for your system are unavailable, but a source RPM or a tarball is provided. You can build a binary RPM yourself from such sources, but some extra manipulations should be made first.

The default RPM top directory is /usr/src/redhat (for a RedHat system). Naturally, as a user, you have no write permission there. To solve the problem, start by creating a new directory structure in any place which has enough disk space and write permission:

mkdir -p rpmtop/RPMS/i386; mkdir rpmtop/SRPMS; mkdir rpmtop/SOURCES; mkdir rpmtop/BUILD; mkdir rpmtop/SPECS

Now you should instruct RPM to use this directory instead of the system-wide one (assuming you created the rpmtop structure in /home/yourname/):

echo '%_topdir /home/yourname/rpmtop' | cat >> $HOME/.rpmmacros

Next thing you should take care of, is the temporary directory for RPM builds, which by default is /var/tmp, also unavailable for users. The solution is similar to the above, to create your own directory in any place which has enough disk space and write permission:

mkdir mytmp

This directory should also be specified in your .rpmmacros file:

echo '%_tmppath /home/yourname/mytmp' | cat >> $HOME/.rpmmacros

That's it; from now on you should be able to build binary RPMs from source by using the command:

rpmbuild --rebuild mypackage.src.rpm

Here mypackage.src.rpm is a source RPM. If a source is provided as a tarball, e.g., mypackage.tar.gz, use

rpmbuild -ta mypackage.tar.gz

Your RPMs will be placed in /home/yourname/rpmtop/RPMS/i386/ directory of the example above. In case your architecture is different from i386, please take care of creating a corresponding subdirectory in rpmtop/RPMS (e.g., rpmtop/RPMS/alpha).

2  Read PDF
xpdf --- which should already be on your machine

acroread --- the official pdf viewer from Adobe.

 You can find RPM's from http://rpmfind.net/linux/rpm2html/search.php?query=acroread.

 To get acroread from Adobe and then set it up:
  -> Go to http://www.adobe.com/products/acrobat/readstep2.html 
      and choose "LINUX" as the platform under Step ->  
      This will let you download 
      a 6MB "tarball" with a name like linux-ar-40->tar.gz.  
  -> Open the archive:
           zcat linux-ar-40->tar.gz | tar xfv -
  -> In some subdirectory like ILINXR.install you'll find an INSTALL script.
      Run it as root:
          ./INSTALL
  -> By default, acroread will be installed as
          /usr/local/Acrobat4/bin/acroread
     You will probably want to put a link in /usr/local/bin:
        ln -s /usr/local/Acrobat4/bin/acroread /usr/local/bin/acroread
```

## 1.14 Tell to which RPM this file belongs to

```text
	rpm -qf <file>

	1.15
id=__hostname_lnx__
```
