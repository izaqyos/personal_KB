---
type: reference
title: tcpdump
description: Subsection 7.3 of Networking.
tags: [kb-linux]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "linux/KB_Linux#7.3"
---

# 7.3 tcpdump

[↑ Networking](/linux/kb-linux/07-networking/README.md)

### 7.3.1 tcpdump for Dummies

```text
Posted on May 18, 2008, 4:29 pm, by Alexander Sandler, under System Administrator Articles.
Table of contents

Introduction
tcpdump uses
Invocation
Simple filtering
Reading tcpdump¿s output
Invocation continued
Choosing an interface
Turning off name resolution
Limiting number of packets to intercept
Saving captured data
Changing packet size in the capture file
Reading from capture file
Looking into packets
Seeing Ethernet header for each packet
Controlling time stamp
Controlling verbosity
Printing content of the packet
Packet filtering
Packet matching
More qualifiers
Specifying addresses
Other qualifiers
Complex filter expressions
Repeating qualifiers
Afterword
```

#### 7.3.1.1 Introduction

```text
In this article  I would like to talk about one of the most useful tools in my networking toolbox and that is tcpdump. Unfortunately mastering this tool completely is not an easy task. Yet stuff you do the most is relatively simple and may become a good springboard when diving into more complex topics.
```

#### 7.3.1.2 tcpdump uses

```text
tcpdump is a packet sniffer. It is able to capture traffic that passes through a machine. It operates on a packet level, meaning that it captures the actual packets that fly in and out of your computer. It can save the packets into a file. You can save whole packets or only the headers. Later you can ¿play¿ recorded file and apply different filters on the packets, telling tcpdump to ignore packets that you are not interested to see.

Under the hood, tcpdump understands protocols and host names. It will do all in its power to see what host sent each packet and will tell you its name instead of the IP address.

It is exceptionally useful tool for debugging what might have caused certain networking related problem. It is an excellent tool to learn new things.
```

#### 7.3.1.3 Invocation

```text
Invoking tcpdump is easy. First thing that you have to remember is that you should either be logged in as root or  be a sudoer on the computer ¿ sudoer is someone who is entitled to gain administrator rights on computer for short period of time using sudo command.

Running tcpdump without any arguments makes it capture packets on first network interface (excluding lo) and print short description of each packet to output. This may cause a bit of a headache in case you are using network to connect to the machine. If you are connected with SSH or telnet (rlogin?), running tcpdump will produce a line of text for each incoming or outgoing packet. This line of text will cause SSH daemon to send a packet with this line, thus causing tcpdump to produce another line of text. And this will not stop until you do something about it.
```

#### 7.3.1.4 Simple filtering

```text
So first thing that we will learn about tcpdump is how to filter out SSH and telnet packets. We will study the basics of tcpdump filtering later in this guide, but for now just remember this syntax.
view source
print?
# tcpdump not port 22

¿not port 22¿ is a filter specification that tells tcpdump to filter out packets with IP source or destination port 22. As you know port 22 is SSH port. Basically, when you tell tcpdump something like this, it will make tcpdump ignore all SSH packets ¿ exactly what we needed.

Telnet on the other hand, uses port 23. So if you are connecting via telnet, you can filter that out with:
view source
print?
# tcpdump not port 23

Clear and simple!
```

#### 7.3.1.5 Reading tcpdump¿s output

```text
By default tcpdump produces one line of text per every packet it intercepts. Each line starts with a time stamp. It tells you very precise time when packet arrived.

Next comes protocol name. Unfortunately, tcpdump understands very limited number of protocols. It won¿t tell you the difference between packets belonging to HTTP and for instance FTP stream. Instead, it will mark such packets as IP packets. It does have some limited understanding of TCP. For instance it identifies TCP synchronization packets such as SYN, ACK, FIN and others. This information printed after source and destination IP addresses (if it IP packet).

Source and destination addresses follow protocol name. For IP packets, these are IP addresses. For other protocols, tcpdump does not print any identifiers unless explicitly asked to do so (see -e command line switch below).

Finally, tcpdump prints some information about the packet. For instance, it prints TCP sequence numbers, flags, ARP/ICMP commands, etc.

Here¿s an example of typical tcpdump output.
view source
print?
17:50:03.089893 IP 69.61.72.101.www > 212.150.66.73.48777: P 1366488174:1366488582
(408) ack 2337505545 win 7240 <nop,nop,timestamp 1491222906 477679143>

This packet is part of HTTP data stream. You can see meaning of each and every field in the packet description in tcpdump¿s manual page.

Here¿s another example
view source
print?
17:50:00.718266 arp who-has 69.61.72.185 tell 69.61.72.1

This is ARP packet. It¿s slightly more self explanatory than TCP packets. Again, to see exact meaning of each field in the packet description see tcpdump¿s manual page.
```

#### 7.3.1.6 Invocation continued

```text
Now, when we know how to invoke tcpdump even when connecting to the computer over some net, let¿s see what command line switches are available for us.
```

#### 7.3.1.7 Choosing an interface

```text
We¿ll start with a simple one. How to dump packets that arrived and sent through a certain network interface. -i command line argument does exactly this.
view source
print?
# tcpdump -i eth1

Will cause tcpdump to capture packets from network interface eth1. Or, considering our SSH/telnet experience:
view source
print?
# tcpdump -i eth1 not port 22

Finally, you can specify any as interface name, to tell tcpdump to listen to all interfaces.
view source
print?
# tcpdump -i any not port 22
```

#### 7.3.1.8 Turning off name resolution

```text
As we debug networking issues, we may encounter a problem with how tcpdump works out of the box. The problem is that it tries to resolve every single IP address that it meets. I.e. when it sees an IP packet it asks DNS server for names of the computers behind IP address. It works flawlessly most of the time. However, there are two problems.

First, it slows down packet interception. It¿s not a big deal when there are only few packets, but when there are thousands and tens of thousands it introduces a delay into the process. Amount of delay can be different, depending on the traffic.

Another, much more serious problem occurs when there is no DNS server around or when DNS server is not working properly. If this is the case, tcpdump spends few seconds trying to figure out two hostnames for each IP packet. This means virtually stopping intercepting the traffic.

Luckily there is a way around. There is an option that causes tcpdump to stop detecting hostnames and that is -n.
view source
print?
# tcpdump -n

And here are few variations of how you can use this option in conjunction with options that we have learned already.
view source
print?
# tcpdump -n -i eth1
# tcpdump -ni eth1 not port 22
```

#### 7.3.1.9 Limiting number of packets to intercept

```text
Here are few more useful options. Sometimes amount of traffic that goes in and out of your computer is very high, while all you want to see is just few packets. Often you want to see who sends you the traffic, but when you try to capture anything with tcpdump it dumps so many packets that you cannot understand anything. This is the case when -c command line switch becomes handy.

It tells tcpdump to limit number of packets it intercepts. You specify number of packets you want to see. tcpdump will capture that number of packets and exit. This is how you use it.
view source
print?
# tcpdump -c 10

Or with options that we¿ve learned before.
view source
print?
# tcpdump -ni eth1 -c 10 not port 22

This will limit number of packets that tcpdump will receive to 10. Once received 10 packets, tcpdump will exit.
```

#### 7.3.1.10 Saving captured data

```text
			7.3.1.11 One of the most useful tcpdump features allows capturing incoming and outgoing packets into a file and then playing this file 

You can do this with -w command line switch. It should be followed by the name of the file that will contain the packets. Like this:
view source
print?
# tcpdump -w file.cap

Or adding options that we¿ve already seen
view source
print?
# tcpdump -ni eth1 -w file.cap not port 22
```

#### 7.3.1.11 Changing packet size in the capture file

```text
By default, when capturing packets into a file, it will save only 68 bytes of the data from each packet. Rest of the information will be thrown away.

One of the things I do often when capturing traffic into a file, is to change the saved packet size. The thing is that disk space that is required to save the those few bytes is very cheap and available most of the time. Spending few spare megabytes of your disk space on capture isn¿t too painful. On the other hand, loosing valuable portion of packets might be very critical.

So, what I usually do when capturing into a file is running tcpdump with -s command line switch. It tells tcpdump how many bytes for each packet to save. Specifying 0 as a packet¿s snapshot length tells tcpdump to save whole packet. Here how it works:
view source
print?
# tcpdump -w file.cap -s 0

And with conjunction with options that we already saw:
view source
print?
# tcpdump -ni eth1 -w file.cap -s 0 -c 1000 not port 22

Obviously you can save as much data as you want. Specifying 1000 bytes will do the job for you. Just keep in mind that there are so called jumbo frames those size can be as big as 8Kb.
```

#### 7.3.1.12 Reading from capture file

```text
Now, when we have captured some traffic into a file, we would like to play it back. -r command like switch tells tcpdump that it should read the data from a file, instead of capturing packets from interfaces. This is how it works.
view source
print?
# tcpdump -r file.cap

With capture file, we can easily analyze the packets and understand what¿s inside. tcpdump introduces several options that will help us with this task. Lets see few of them.
```

#### 7.3.1.13 Looking into packets

```text
There are several options that allow one to see more information about the packet. There is a problem though. tcpdump in general isn¿t giving you too much information about packets. It doesn¿t understand different protocols.

If you want to see packet¿s content, it is better to use tools like Wireshark. It does understand protocols, analyzes them and allows you to see different fields, not only in TCP header, but in layer 7 protocols headers.

tcpdump is a command line tool and as most of the command line tools, its ability to present information is quiet limited. Yet, it still has few options that control the way packets presented.
```

#### 7.3.1.14 Seeing Ethernet header for each packet

```text
-e command line switch, causes tcpdump to present Ethernet (link level protocol) header for each printed packet. Lets see an example.
view source
print?
# tcpdump -e -n not port 22
```

#### 7.3.1.15 Controlling time stamp

```text
There are four command line switches that control the way how tcpdump prints time stamp. First, there is -t option. It makes tcpdump not to print time stamps. Next comes -tt. It causes tcpdump to print time stamp as number of seconds since Jan. 1st 1970 and a fraction of a second. -ttt prints the delta between this line and a previous one. Finally, -tttt causes tcpdump to print time stamp in it¿s regular format preceeded by date.
```

#### 7.3.1.16 Controlling verbosity

```text
-v causes tcpdump to print more information about each packet. With -vv tcpdump prints even more information. As you could guess, -vvv produces even more information. Finally -vvvv will produce an error message telling you there is no such option :D
```

#### 7.3.1.17 Printing content of the packet

```text
-x command line switch will make tcpdump to print each packet in hexadecimal format. Number of bytes that will be printed remains somewhat a mystery. As is, it will print first 82 bytes of the packet, excluding ethernet header. You can control number of bytes printed using -s command line switch.

In case you want to see ethernet header as well, use -xx. It will cause tcpdump to print extra 14 bytes for ethernet header.

Similarily -X and -XX will print contents of packet in hexadecimal and ASCII formats. The later will cause tcpdump to include ethernet header into printout.
```

#### 7.3.1.18 Packet filtering

```text
We already saw a simple filter. It causes tcpdump to ignore SSH packets, allowing us to run tcpdump from remote. Now lets try to understand the language that tcpdump uses to evaluate filter expressions.
```

#### 7.3.1.19 Packet matching

```text
We should understand that tcpdump applies our filter on every single incoming and outgoing packet. If packet matches the filter, tcpdump aknownledges the packet and depending on command line switches either saves it to file or dumps it to the screen. Otherwise, tcpdump will ignore the packet and account it only when telling how many packets received, dropped and filtered out when it exits.

To demostrate this, lets go back to not port 22 expression. tcpdump ignores packets that either sourced or destined to port 22. When such packet arrives, tcpdump applies filter on it and since the result is false, it will drop the packet.
```

#### 7.3.1.20 More qualifiers

```text
So, from what we¿ve seen so far, we can conclude that tcpdump understands a word port and understands expression negation with not. Actually, negating an expression is part of complex expressions syntax and we will talk about complex expressions a little later. In the meantime, lets see few more packet qualifiers that we can use in tcpdump expressions.

We¿ve seen that port qualifier specifies either source or destination port number. In case we want to specify only the source port or only the destination port we can use src port or dst port. For instance, using following expression we can see all outgoing HTTP packets.
view source
print?
# tcpdump -n dst port 80

We can also specify ranges of ports. portrange, src portrange and dst portrange qualifiers do exactly this. For instance, lets see a command that captures all telnet and SSH packets.
view source
print?
# tcpdump -n portrange 22-23
```

#### 7.3.1.21 Specifying addresses

```text
Using dst host, src host and host qualifiers you can specify source, destination or any of them IP addresses. For example
view source
print?
# tcpdump src host alexandersandler.net

Will print all packets originating from alexandersandler.net computer.

You can also specify Ethernet addresses. You do that with ether src, ether dst and ether host qualifiers. Each should be followed by MAC address of either source, destination or source or destination machines.

You can specify networks as well. The net, src net and dst net qualifiers do exactly this. Their syntax however slighly more complex than those of a single host. This is due to a netmask that has to be specified.

You can use two basic forms of network specifications. One using netmask and the other so called CIDR notation. Here are few examples.
view source
print?
# tcpdump src net 67.207.148.0 mask 255.255.255.0

Or same command using CIDR notation.
view source
print?
# tcpdump src net 67.207.148.0/24

Note the word mask that does the job of specifying the network in first example. Second example is much shorter.
```

#### 7.3.1.22 Other qualifiers

```text
There are several useful qualifiers that don¿t fall under any of the categories I already covered.

For instance, you can specify that you are interested in packets with specific length. length qualifier does this. less and greater qualifiers tell tcpdump that you are interested in packets whose length is less or greater than value you specified.

Here¿s an example that demonstrates these qualifiers in use.
view source
print?
# tcpdump -ni eth1 greater 1000

Will capture only packets whose size is greater than 1000 bytes.
```

#### 7.3.1.23 Complex filter expressions

```text
As we already saw we can build more complex filter expressions using tcpdump filters language. Actually, tcpdump allows exceptionally complex filtering expressions.

We¿ve seen not port 22 expression. Applying this expression on certain packet will produce logical true for packets that are not sourced or destined to port 22. Or in two words, not negates the expression.

In addition to expression negation, we can build more complex expressions combining two smaller expression into one large using and and or keywords. In addition, you can use brackets to group several expressions together.

For example, lets see a tcpdump filter that causes tcpdump to capture packets larger then 100 bytes originating from google.com or from microsoft.com.
view source
print?
# tcpdump -XX greater 100 and \(src host google.com or src host microsoft.com\)

and and or keywords in tcpdump filter language have same precedence and evaluated left to right. This means that without brackets, tcpdump could have captured packets from microsoft.com disregarding packet size. With brackets, tcpdump first makes sure that all packets are greater than 100 bytes and only then checks their origin.

Note the backslash symbol (¿\¿) before brackets. We have to place them before brackets because of shell. Unix shell has special understanding of what brackets used for. Hence we have to tell shell to leave these particular brackets alone and pass them as they are to tcpdump. Backslash characters do exactly this.

Talking about precedence, we have to keep in mind that in tcpdump¿s filter expression language not has higher precedence than and and or. tcpdump¿s manual page has very nice example and emphasizes the meaning of this.
view source
print?
not host vs and host ace

and
view source
print?
not (host vs or host ace)

are two different expressions. Because not has higher precedence over and and or, filter from the first example will capture packets not to/from vs, but to/from ace. Second filter example on the other hand will capture packets that are not to/from vs and to/from ace. I.e. first will capture packet from ace to some other host (but not to vs). Yet second example won¿t capture this packet.
```

#### 7.3.1.24 Repeating qualifiers

```text
To conclude this article, I would like to tell you one more thing that may become handy when writing complex tcpdump filter expressions.

Take a look at the following example.
view source
print?
# tcpdump -XX greater 100 and \(src host google.com or microsoft.com\)

We already saw this example, with one little exception. In previous example we had a src host qualifier before microsoft.com and now its gone. The thing is that if we want to use same qualifier two times in a row, we don¿t have to specify it twice. Instead we can just write qualifier¿s parameter and tcpdump will know what to do.

This makes tcpdump filter expression language much easier to understand and much more readable.
```
