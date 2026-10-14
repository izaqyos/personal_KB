---
type: reference
title: SSH
description: "SSH tips: disabling session timeout and scp file copying with examples."
tags: [ssh, linux, tips, examples, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "linux/KB_Linux#16"
---

# SSH

[↑ KB_Linux](/linux/kb-linux/README.md)

## 16.1 Disable session timeout

```text
add to /etc/ssh/sshd_config:
TCPKeepAlive yes
ClientAliveInterval 30
ClientAliveCountMax 99999
```

## 16.2 copy files, scp

### 16.2.1 scp(1) - Linux man page

```text
Name

scp - secure copy (remote file copy program)
Synopsis

scp [-1246BCpqrv] [-c cipher] [-F ssh_config] [-i identity_file] [-l limit] [-o ssh_option] [-P port] [-S program] [

         [user@]host1:]file1 ... [                                    [user@]host2:]file2

Description

scp copies files between hosts on a network. It uses ssh(1) for data transfer, and uses the same authentication and provides the same security as ssh(1). Unlike rcp(1), scp will ask for passwords or passphrases if they are needed for authentication.

File names may contain a user and host specification to indicate that the file is to be copied to/from that host. Local file names can be made explicit using absolute or relative pathnames to avoid scp treating file names containing ':' as host specifiers. Copies between two remote hosts are also permitted.

When copying a source file to a target file which already exists, scp will replace the contents of the target file (keeping the inode).

If the target file does not yet exist, an empty file with the target file name is created, then filled with the source file contents. No attempt is made at "near-atomic" transfer using temporary files.

The options are as follows:

      -1'        Forces scp to use protocol 1.

    -2' Forces scp to use protocol 2.

    -4' Forces scp to use IPv4 addresses only.

    -6' Forces scp to use IPv6 addresses only.

    -B' Selects batch mode (prevents asking for passwords or passphrases).

    -C' Compression enable. Passes the -C flag to ssh(1) to enable compression.

    -c cipher
    Selects the cipher to use for encrypting the data transfer. This option is directly passed to ssh(1).

    -F ssh_config
    Specifies an alternative per-user configuration file for ssh. This option is directly passed to ssh(1).

    -i identity_file
    Selects the file from which the identity (private key) for public key authentication is read. This option is directly passed to ssh(1).

    -l limit
    Limits the used bandwidth, specified in Kbit/s.

    -o ssh_option
    Can be used to pass options to ssh in the format used in ssh_config(5). This is useful for specifying options for which there is no separate scp command-line flag. For full details of the options listed below, and their possible values, see ssh_config(5).

    AddressFamily
    BatchMode
    BindAddress
    ChallengeResponseAuthentication
    CheckHostIP
    Cipher
    Ciphers
    Compression
    CompressionLevel
    ConnectionAttempts
    ConnectTimeout
    ControlMaster
    ControlPath
    GlobalKnownHostsFile
    GSSAPIAuthentication
    GSSAPIDelegateCredentials
    HashKnownHosts
    Host'
    HostbasedAuthentication
    HostKeyAlgorithms
    HostKeyAlias
    HostName
    IdentityFile
    IdentitiesOnly
    KbdInteractiveDevices
    LogLevel
    MACs'
    NoHostAuthenticationForLocalhost
    NumberOfPasswordPrompts
    PasswordAuthentication
    Port'
    PreferredAuthentications
    Protocol
    ProxyCommand
    PubkeyAuthentication
    RekeyLimit
    RhostsRSAAuthentication
    RSAAuthentication
    SendEnv
    ServerAliveInterval
    ServerAliveCountMax
    SmartcardDevice
    StrictHostKeyChecking
    TCPKeepAlive
    UsePrivilegedPort
    User'
    UserKnownHostsFile
    VerifyHostKeyDNS

    -P port
    Specifies the port to connect to on the remote host. Note that this option is written with a capital 'P', because -p is already reserved for preserving the times and modes of the file in rcp(1).

    -p' Preserves modification times, access times, and modes from the original file.

    -q' Quiet mode: disables the progress meter as well as warning and diagnostic messages from ssh(1).

    -r' Recursively copy entire directories. Note that scp follows symbolic links encountered in the tree traversal.

    -S program
    Name of program to use for the encrypted connection. The program must understand ssh(1) options.

    -v' Verbose mode. Causes scp and ssh(1) to print debugging messages about their progress. This is helpful in debugging connection, authentication, and configuration problems.

    The scp utility exits 0 on success, and >0 if an error occurs.
    See Also

rcp(1), sftp(1), ssh(1), ssh-add(1), ssh-agent(1), ssh-keygen(1), ssh_config(5), sshd(8)
History

scp is based on the rcp(1) program in BSD source code from the Regents of the University of California.
Authors

Timo Rinne <tri@iki.fi>
Tatu Ylonen <ylo@cs.hut.fi>

BSD November 6, 2011 BSD
Referenced By
amaddclient(8), cpdup(1), darcs(1), htcp(1), mirrordir(1), openvpn(8), rbldnsd(8), rssh(1), rssh.conf(5), scponly(8), ztelnet(1) 
```

### 16.2.2 My examples

```text
copy to remote server:
$ scp calculateQuotas.sh  root@<internal-ip>:/opt/CSCOacs/config/calculateQuotas.sh
Warning: Permanently added '<internal-ip>' (RSA) to the list of known hosts.
Password: 
calculateQuotas.sh                                                              100% 1882     1.8KB/s   00:00    
```

### 16.2.3 Tips & Tricks with ssh and scp

```text
Quite a handy thing about scp is that it supports asterisks. You can copy all files in a remote directory in a way like this:

    [rechosen@localhost ~]$ scp yourusername@yourserver:/home/yourusername/* .

And you can also just copy a whole directory by specifying the -r (recursive) option:

    [rechosen@localhost ~]$ scp -r yourusername@yourserver:/home/yourusername/ .

Both of these also work when copying to a (remote) server or copying between a (remote) server and another (remote) server.

The ssh command can come in handy if you don't know the exact location of the file you want to copy with scp. First, ssh to the (remote) server:

    [rechosen@localhost ~]$ ssh yourusername@yourserver

Then browse to the right directory with cd. This is essential Linux terminal knowledge, so I won't explain it here. When you're in the right directory, you can get the full path with this command:

    [rechosen@localhost ~]$ pwd

Note: pwd is an abbreviation of Print Working Directory, which is a useful way to remember the command.

You can then copy this output, leave the ssh shell by pressing Ctrl + D, and then paste the full directory path in your scp command. This saves a lot of remembering and typing!

You can also limit the bandwidth scp may use when copying. This is very useful if you're wanting to copy a huge amount of data without suffering from slow internet for a long time. Limiting bandwidth is done this way:

    scp -l bandwidthlimit yourusername@yourserver:/home/yourusername/* .

The bandwidth is specified in Kbit/sec. What does this mean? Eight bits is one byte. If you want to copy no faster than 10 Kbyte/sec, set the limit to 80. If you want to copy no faster than 80 Kbyte/sec, set the limit to 640. Get it? You should set the limit to eight times the maximum Kbyte/sec you want it to be. I'd recommend to set the -l option with all scp'ing you do on a connection that other people need to use, too. A big amount of copying can virtually block a whole 10 Mbit network if you're using hubs.

*/
```

### 16.2.4 scp errors

#### 16.2.4.1 protocol error: bad mode

```text
- ex:
# scp <user>@<internal-host>:/tmp/libActiveDirectoryIDStore.so .
<user>@<internal-host>'s password: 
protocol error: bad mode

- reason some print from .bashrc is messing w/ scp protocol
- quick fix , use ssh
# ssh  <user>@<internal-host> "cat /tmp/libActiveDirectoryIDStore.so" > libActiveDirectoryIDStore.so
<user>@<internal-host>'s password: 
/users/<user>/.bashrc: line 59: /sw/licensed/rational/products/purifyplus_setup.sh: No such file or directory
/users/<user>/.aliases: line 1305: ct: command not found
# ls -l libAc*
-rw-r--r-- 1 root gadmin 1931366 Nov 19 03:53 libAcs.so
-rwxr-xr-x 1 root root    237126 Jul 24  2013 libAcsDebugLog.so
-rwxr-xr-x 1 root root    554470 Jul 24  2013 libAcsDebugLogConfig.so
-rwxr-xr-x 1 root gadmin 2206738 Feb 25 16:02 libActiveDirectoryIDStore.so
-rwxr-xr-x 1 root gadmin 2125697 Feb 25 15:44 libActiveDirectoryIDStore.so.orig

see more examples:
To send a file:

cat file | ssh ajw@dogmatix "cat > remote"
Or:

ssh ajw@dogmatix "cat > remote" < file
To receive a file:

ssh ajw@dogmatix "cat remote" > copy
		16.2.5
```

## 16.3 Read remote file via SSH

```text
ssh server "cat /path/to/file"

If you want paging..

ssh server "cat /path/to/file" |less
```

## 16.4 SSH login without password

### 16.4.1 explanation

```text
Your aim

You want to use Linux and OpenSSH to automize your tasks. Therefore you need an automatic login from host A / user a to Host B / user b. You don't want to enter any passwords, because you want to call ssh from a within a shell script.
How to do it

First log in on A as user a and generate a pair of authentication keys. Do not enter a passphrase:

a@A:~> ssh-keygen -t rsa
Generating public/private rsa key pair.
Enter file in which to save the key (/home/a/.ssh/id_rsa): 
Created directory '/home/a/.ssh'.
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /home/a/.ssh/id_rsa.
Your public key has been saved in /home/a/.ssh/id_rsa.pub.
The key fingerprint is:
3e:4f:05:79:3a:9f:96:7c:3b:ad:e9:58:37:bc:37:e4 a@A

Now use ssh to create a directory ~/.ssh as user b on B. (The directory may already exist, which is fine):

a@A:~> ssh b@B mkdir -p .ssh
b@B's password: 

Finally append a's new public key to b@B:.ssh/authorized_keys and enter b's password one last time:

a@A:~> cat .ssh/id_rsa.pub | ssh b@B 'cat >> .ssh/authorized_keys'
b@B's password: 

From now on you can log into B as b from A as a without password:

a@A:~> ssh b@B hostname
B

A note from one of our readers: Depending on your version of SSH you might also have to do the following changes:

    Put the public key in .ssh/authorized_keys2
    Change the permissions of .ssh to 700
    Change the permissions of .ssh/authorized_keys2 to 640
```

### 16.4.2 My example

```text
a. Make keys on source machine
$ ssh-keygen -t rsa
Generating public/private rsa key pair.
Enter file in which to save the key (/home/<user>/.ssh/id_rsa): 
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /home/<user>/.ssh/id_rsa.
Your public key has been saved in /home/<user>/.ssh/id_rsa.pub.
The key fingerprint is:
21:98:b3:4d:63:ad:a3:b4:2d:2d:ea:3f:1e:bf:9e:f9 <user>@<user>-WS
The key's randomart image is:
+--[ RSA 2048]----+
|                 |
|     o .         |
|    + = o        |
|     * + .       |
|    o + S        |
|   . = .         |
|    * o          |
|   ..= o         |
| .oooo*oE        |
+-----------------+

b. make .ssh on target machine
$ ssh root@<internal-ip> mkdir -p .ssh
Copyright(c) 2012 <employer> All rights Reserved

Password: 

c. copy public key to target machine
- From Cygwin
$ cat /home/<user>/.ssh/id_rsa.pub | ssh root@<internal-ip> 'cat >> .ssh/authorized_keys'
cat /home/<user>/.ssh/id_rsa.pub | ssh root@<internal-ip> 'cat >> .ssh/authorized_keys'
Copyright(c) 2012 <employer> All rights Reserved

Password: 

- From Linux
cat ~/.ssh/id_rsa.pub | ssh root@<internal-ip> 'cat >> .ssh/authorized_keys'

d. possible miscellaneous steps
$ ssh root@<internal-ip> chmod 700 .ssh
$ cat /home/<user>/.ssh/id_rsa.pub | ssh root@<internal-ip> 'cat >> .ssh/authorized_keys2'

	16.5
```
