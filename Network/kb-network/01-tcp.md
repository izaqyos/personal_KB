---
type: reference
title: TCP
description: Section 1 of the legacy NetworkKB notes.
tags: [kb-network]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "Network/NetworkKB#1"
---

# TCP

[↑ NetworkKB](/Network/kb-network/README.md)

## 1.1 TCP states

```text
States of a TCP connection. These can be seen with netstat -at

CLOSED
A theoretical state where a TCP connection doesnt exist yet.
LISTEN
A state where TCP connection is waiting for a connection to be made to it.
SYN_RCVD
A SYN has been received, a SYN ACK has been sent, and we are waiting for an ACK.
SYN_SENT
A SYN has been sent to start a connection, the SYN ACK hasnt yet been received.
ESTABLISHED
A connection has been established
CLOSE_WAIT
After a TCP connection has been closed, the spec says you should make sure that the connection is not reopened for a few minutes to prevent packets that were delayed in the Internet causing the connection to be reopened. These will disappear by themselves after a while. This can cause problems on servers that have lots of very short connections (such as a web server) by filling up the OSs connection table. See also EADDRINUSE
LAST_ACK
A FIN has been received, weve sent our own FIN, but we are waiting on the ACK before we can move to the closed state.
FIN_WAIT_1
A FIN has been sent, waiting for a ACK or FIN
FIN_WAIT_2
A FIN has been sent, and an ACK has been received. More data can be received. This connection is half open.
CLOSING
A FIN has been sent, and one received, the FIN hasnt been ACKed yet.
TIME_WAIT
The connection has closed, and is waiting for 2MSL

Tuning your systems settings

The amount of time that a connection waits in various stages is controlled by the OperatingSystem. Some OSes let you tune these settings. For example, for Linux-based OSes, look at the control files in /proc/sys/net/ipv4. According to /usr/src/linux/Documentation/filesystems/proc.txt:

tcp_syn_retries
Number of times initial SYNs for a TCP connection attempt will be retransmitted. Should not be higher than 255. This is only the timeout for outgoing connections, for incoming connections the number of retransmits is defined by tcp_retries1.
tcp_fin_timeout
The length of time in seconds it takes to receive a final FIN before the socket is always closed. This is strictly a violation of the TCP specification, but required to prevent denial-of-service attacks.
tcp_retries1
Defines how often an answer to a TCP connection request is retransmitted before giving up.
tcp_retries2
Defines how often a TCP packet is retransmitted before giving up.
```

## 1.2 Winsock FAQ

```text
# Problem: From the default CLOSED state, how does a client program normally get to the ESTABLISHED state?

Solution: The client calls the connect() function (or similar), which causes TCP to send an empty packet with the SYN control bit set (SYN_SENT). The remote peer's stack sees this "synchronize" request, and sends back an empty packet with the SYN and ACK bits set (i.e. "I acknowledge your synchronize request"). When the client receives the SYN/ACK packet, it sends back an ACK packet, and reports a successful connection to the client program.

# Problem: What is the normal TCP shutdown sequence?

Solution: The important thing to understand is that TCP is a bidirectional protocol. So, the connection is shut down in two identical stages, one for each "direction". One peer sends a packet with the FIN bit set, which the other end ACKnowledges; when the other end is also finished sending data, it sends out a FIN packet, which the other end ACKs, closing the connection.

# Problem: What is the significance of the RST bit?

Solution: This is an abnormal close, also called "slamming the connection shut." It happens under several circumstances, but none of the common ones are documented in the Stevens diagram. Two of these cases you can cause from Winsock: the first method is to set SO_LINGER to 0 with setsockopt() and then call closesocket(). The second method is to call shutdown() with how equal to 2, optionally followed by a closesocket() call.

From the Winsock client level, the two other common RST occurrences are "connection refused" and "remote peer terminated connection." The first happens when you try to connect to a port that isn't open on a remote machine. The second happens as a result of the remote peer using one of the two RST-forcing methods above; alternately, the application could have crashed, and the peer's stack sent out a RST for its connection. Another way this can happen is the remote peer catastrophically crashed, and then after the remote machine came back up, your program sent it a packet which the stack rightfully had no way of delivering, so it replied with a RST packet, because the connection's 5-tuple is now invalid.

Generally speaking, RST signals a problem of some kind: either something bad happened to the connection, or there's a bug somewhere. For example, some firewalls improperly use the RST bit to signal a closed connection. The solution, of course, is to replace the firewall product. :)

# Problem: Netstat shows lots of sockets in the TIME_WAIT state. What's wrong?

Solution: Nothing's wrong. TIME_WAIT is absolutely normal. If you go through the state-transition diagram above, you see that every socket that gets closed normally goes through this state after it's closed. The TIME_WAIT state is a safety mechanism, to catch stray packets for that connection after the connection is "officially" closed. Since the maximum time that such stray packets can exist is 2 times the "maximum segment lifetime" (the time for a packet to go from your machine to the remote peer and for the response to come back), the TIME_WAIT state lasts for 2 * MSL. The only tricky bit is, there is no easy way to estimate MSL on the fly, so stacks traditionally hard-code a value for it, from 15 to 60 seconds. Thus, TIME_WAIT usually lasts 30-120 seconds.

# Problem: My sockets keep getting into a FIN_WAIT_x state. What's wrong?

Solution: Either your program or the remote peer is not closing the socket properly. If you walk through the state-transition diagram above, you can see that FIN_WAIT_1 usually happens when the local program calls shutdown() with the "how" parameter set to 1 or SD_SEND, but the remote peer doesn't respond. Likewise FIN_WAIT_2 happens when the remote peer shuts down its sending half of the connection, and your program doesn't respond. Since FIN_WAIT states often last up to 10 minutes, it's well worth the effort to fix the problem that's causing these FIN_WAIT states. (The exact length of the state depends on the stack and the circumstances that got it into that state.)

# Problem: Often my calls to bind() fail when I try to re-bind to a port that I was just using. What's wrong?

Solution: The socket is probably in one of the FIN_WAIT states or in the TIME_WAIT state. If it's a FIN_WAIT problem and you can't fix it, or if it's the normal TIME_WAIT state, the best thing to do is to redesign your program so that it doesn't need to keep re-binding. For example, a server program generally keeps its listener socket alive so that it doesn't have to keep re-binding it to the port; if you closesocket() the listener for some reason after each successful connection, your listener socket will go into the TIME_WAIT state for somewhere between 30 and 120 seconds, during which you won't be able to re-bind to that port. However, if you find that re-binding is absolutely necessary, setting the SOREUSEADDR option with setsockopt() will usually get you around the problem.
```
