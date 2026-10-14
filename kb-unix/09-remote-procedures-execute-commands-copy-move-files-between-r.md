---
type: reference
title: Remote procedures (execute commands copy/move files between remote machines)
description: "Remote procedures: running commands and copying files between machines with rsh and ssh."
tags: [ssh, unix, howto, shell, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "unix-kb#8"
---

# Remote procedures (execute commands copy/move files between remote machines)

[↑ unix-kb](/kb-unix/README.md)

### 8.1.1 rsh a complicated command.

#### 8.1.1.1 for example a complicated kill of an application process on machine doh.

```text
		$  rsh doh ps -ef | grep sfe_main | grep -v grep | awk '{print $2}' | xargs rsh doh kill
		in this case there's a lookup in there's a lookup in the process table.
		then awk returns the process number then xargs will execute the next command with the result of the previous command.
		not that it's also possible to us '{}' like in find argument.
```

### 8.1.2 ssh

```text
	some systems don't allow rsh and rcp, instead they allow only ssh.
```

#### 8.1.2.1 execute remote command

```text
		ssh <remote machine> -l user
		ssh odermer-lnx -l <user> ls
```

#### 8.1.2.2 comprehensive guide to SSH usage for remote file operations

#### 8.1.2.2.1 PUSH

#### 8.1.2.2.1.1 push a compressed tar file

```text
				tar cvf - . will tar all the files in current dir into pipe (gzip). 
				Can replace with tar cvf - *.exe or something.
    * tar cvf - . | gzip -c -1 | ssh user@host cat ">" remotefile.gz
```

#### 8.1.2.2.1.2 push one file

```text
    * ssh target_address cat <localfile ">" remotefile
    * ssh target_address cat <localfile - ">" remotefile
    * cat localfile | ssh target_address cat ">" remotefile
    * cat localfile | ssh target_address cat - ">" remotefile
```

#### 8.1.2.2.1.3 advanced push commands

```text
    * dd if=localfile | ssh target_address dd of=remotefile
    * ssh target_address cat <localfile "|" dd of=remotefile
    * ssh target_address cat - <localfile "|" dd of=remotefile
    * ( cd SOURCEDIR && tar cf - . ) | ssh target_address "(cd DESTDIR && tar xvpf - )"
    * ( cd SOURCEDIR && tar cvf - . ) | ssh target_address "(cd DESTDIR && cat - > remotefile.tar )"
    * ( cd SOURCEDIR && tar czvf - . ) | ssh target_address "(cd DESTDIR && cat - > remotefile.tgz )"
    * ( cd SOURCEDIR && tar cvf - . | gzip -1 -) | ssh target_address "(cd DESTDIR && cat - > remotefile.tgz )"
    * ssh target_address "( nc -l -p 9210 > remotefile & )" && cat source-file | gzip -1 - | nc target_address 9210
```

#### 8.1.2.2.1.4 push one file and compress it on the way

```text
    * cat localfile | gzip -1 - | ssh target_address cat ">" remotefile.gz
```

#### 8.1.2.2.2 PULL:

#### 8.1.2.2.2.1 pull one file

```text
# ssh target_address cat remotefile > localfile
# ssh target_address dd if=remotefile | dd of=localfile
# ssh target_address cat "<" remotefile >localfile
```

#### 8.1.2.2.2.2 pull one compressed file and uncompress it on the way

```text
# ssh target_address cat "<" remotefile.gz | gunzip >localfile
```

#### 8.1.2.2.3 COMPARE:

```text
# ###This one uses CPU cycles on the remote server to compare the files:
# ssh target_address cat remotefile | diff - localfile
# cat localfile | ssh target_address diff - remotefile
# ###This one uses CPU cycles on the local server to compare the files:
# ssh target_address cat <localfile "|" diff - remotefile
```

#### 8.1.2.2.4 Further information

```text
Push: Push local file to remote server.
Pull: Pull remote file from remote server to local machine.

Of course there is always ftp, scp2, nfs, smb and other methods as well.

The above methods make a great Ghost replacement.
One can boot a system using standalone linux on a floppy, such as tomsrtbt and can then proceed to:

|   1. backup the local hard drive to a remote server or
|   2. download an image from the remote server and place it on the local hard drive.

RSH works just the same as SSH I'm sure, it's jut that ssh or ssh should give you better security.

Note: Compressing and then transferring data is faster than transferring uncompressed data. Use compression before sending data over the wire to achieve faster data transfer speeds.
```

#### 8.1.2.2.4.1 Tip, much more efficient way to do cp -r

```text
localfile and remotefile can be files, directories, images, hard drive partitions, or hard drives.
Moving files around on local filesystem:

    * ( cd SOURCEDIR && tar cf - . ) | (cd DESTDIR && tar xvpf - )
```

### 8.1.3 FTP

```text
FTP VIEW:

    * ftp> get file.gif "| xv -"
    * ftp> get README "| more"

FTP PUSH:

    * ftp> put "| tar cvf - ." myfile.tar
    * ftp> put "| tar cvf - . | gzip " myfile.tar.gz

FTP PULL:

    * ftp> get myfile.tar "| tar xvf -"
```

### 8.1.4 Pipes and Redirects

```text
    * zcat Fig.ps.Z | gv -
    * gunzip -c Fig.ps.gz | gv -
    * tar xvf mydir.tar
    * tar xvf - < mydir.tar
    * cat mydir.tar | tar xvf -
    * tar cvf mydir.tar .
    * tar cvf - . > mydir.tar
    * tar cf - . | (cd ~/newdir; tar xf -)
    * gunzip -c foo.gz > bar
    * cat foo.gz | gunzip > bar
    * zcat foo.gz > bar			//Useful when decompressed file should be in a different location and copy may take a long time
    * gzip -c foo > bar.gz
    * cat foo | gzip > bar.gz		//Useful when compressed file should be in a different location and copy may take a long time
```

### 8.1.5 Related bash operators

```text
see http://www.cpqlinux.com/sshkeys.html
```

### 8.1.6 && and || in bash CLI

```text
Explanation of &&, ||, and -
&& is shorthand for "if true then do"
|| is shorthand for "if false then do"
These can be used separately or together as needed. The following examples will attempt
to change directory to "/tmp/mydir"; you will get different results based on whether
"/tmp/mydir" exists or not.
cd /tmp/mydir && echo was able to change directory
cd /tmp/mydir || echo was not able to change directory
cd /tmp/mydir && echo was able to change directory || echo was not able to change to directory
cd /tmp/mydir && echo success || echo failure
cd /tmp/mydir && echo success || { echo failure; exit; }
```

### 8.1.7 The dash "-" in bash

```text
The dash "-" is used to reference either standard input or standard output. The context in which the dash is used is what determines whether it references standard input or standard output.
```
