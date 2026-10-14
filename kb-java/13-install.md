---
type: reference
title: Install
description: Installing Java on Linux and Mac.
tags: [java, howto, linux, macos, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: deprecated
capture_type: source
legacy_source: "java-kb#7"
---

# Install

> **Deprecated (2026-10):** Java 6 EOL. Current: Java 21/25 LTS via package manager. Source: <https://en.wikipedia.org/wiki/Java_version_history>

[↑ java-kb](/kb-java/README.md)

## 7.1 Linux

```text
a. http://www.oracle.com/technetwork/java/javase/install-linux-self-extracting-138783.html
Installation Instructions
This procedure installs the Java Development Kit (JDK) for 32-bit Linux, using a self-extracting binary file. The JDK download includes the Java SE Runtime Environment (JRE) – you do not have to download the JRE separately.

For RPM-based Linux distributions, like Red Hat or SuSE, refer to the RPM installation instructions.

The name of the downloaded file has the following format:

    jdk-6u
            
<version>-linux-i586.bin
          
<version>
    jdk-6u18-linux-i586.bin
To install, download this file and use the following instructions.


a1. Download and check the download file size. 
You can download to any directory that you can write to.

This bundle can be installed by anyone (not only root users), in any location that the user can write to. However, only the root user can displace the system version of the Java platform supplied by Linux.

a2. Make sure that execute permissions are set
Run this command: 
% chmod a+x jdk-6u <version>-linux-i586.bin
a3. Change directory to the location where you would like the files to be installed.

The next step installs the JDK into the current directory.
Note, on my box its /usr/java

a4. Run the self-extracting binary.

Execute the downloaded file, prepended by the path to it. For example, if the file is in the current directory, prepend it with " ./" (necessary if " ." is not in the PATH environment variable):
% ./jdk-6u <version>-linux-i586.bin

b. create symbolic links
$ sudo rm /usr/bin/java /usr/bin/javac
$ sudo ln -s /usr/java/jdk1.6.0_22/bin/java   /usr/bin/java
$ ls -l /usr/bin/java
lrwxrwxrwx  1 root root 30 Dec  2 17:46 /usr/bin/java -> /usr/java/jdk1.6.0_22/bin/java*
$ sudo ln -s /usr/java/jdk1.6.0_22/bin/javac   /usr/bin/javac
$ java -version
java version "1.6.0_22"
Java(TM) SE Runtime Environment (build 1.6.0_22-b04)
Java HotSpot(TM) Server VM (build 17.1-b03, mixed mode)

c. modify Environment variables
$ grep JAVA_HOME ~/.bashrc 
PATH=${PATH}:<internal-path>:/usr/atria/bin/:/sbin/:<internal-path>:JAVA_HOME/:auto/cwtools/perl/focus/bin/lnx:/usr/atria/bin:
JAVA_HOME=/usr/java/jdk1.5.0_10; export JAVA_HOME;
$ ed !$
ed ~/.bashrc
1510
/jdk1.5.0_10
JAVA_HOME=/usr/java/jdk1.5.0_10; export JAVA_HOME;
s/jdk1.5.0_10/jdk1.6.0_22/
p
JAVA_HOME=/usr/java/jdk1.6.0_22; export JAVA_HOME;
w
q
1510

d.  Fix GTK fonts issue
$ eclipse

** (Eclipse:8821): WARNING **: Cannot open font file for font Lucida Sans 10

** (Eclipse:8821): WARNING **: Cannot open fallback font, nothing to do
$ locate Lucida
/usr/java/jdk1.6.0_22/jre/lib/fonts/LucidaSansDemiBold.ttf
/usr/java/jdk1.6.0_22/jre/lib/fonts/LucidaTypewriterBold.ttf
/usr/java/jdk1.6.0_22/jre/lib/fonts/LucidaBrightDemiItalic.ttf
/usr/java/jdk1.6.0_22/jre/lib/fonts/LucidaBrightDemiBold.ttf
/usr/java/jdk1.6.0_22/jre/lib/fonts/LucidaTypewriterRegular.ttf
/usr/java/jdk1.6.0_22/jre/lib/fonts/LucidaBrightRegular.ttf
/usr/java/jdk1.6.0_22/jre/lib/fonts/LucidaBrightItalic.ttf
/usr/java/jdk1.6.0_22/jre/lib/fonts/LucidaSansRegular.ttf
/usr/java/jdk1.6.0_22/jre/lib/oblique-fonts/LucidaSansDemiOblique.ttf
/usr/java/jdk1.6.0_22/jre/lib/oblique-fonts/LucidaTypewriterOblique.ttf
/usr/java/jdk1.6.0_22/jre/lib/oblique-fonts/LucidaTypewriterBoldOblique.ttf
/usr/java/jdk1.6.0_22/jre/lib/oblique-fonts/LucidaSansOblique.ttf
$ sudo mkdir /usr/java/jdk1.5.0_10/
Password:
$ sudo mkdir /usr/java/jdk1.5.0_10/jre
$ sudo mkdir /usr/java/jdk1.5.0_10/jre/lib
$ sudo cp -r /usr/java/jdk1.6.0_22/jre/lib/fonts/ /usr/java/jdk1.5.0_10/jre/lib/

e. Fix vnc server issue (somehow depends on previous jre)
$ ln -s ../jdk1.6.0_22/jre/ jre
```

## 7.2 Mac. tags: install java MAC OSX

```text
install via brew:
 brew tap adoptopenjdk/openjdk
 brew install --cask adoptopenjdk8

	7.3
```
