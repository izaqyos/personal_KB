---
type: reference
title: Introduction
description: "Subsection 10.5.7 of NTP, NTPD."
tags: [kb-linux]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "linux/KB_Linux#10.5.7"
---

# 10.5.7 Introduction

[↑ NTP, NTPD](/linux/kb-linux/10-system-admininstration/05-ntp-ntpd/README.md)

```text
This page lists the status words, event messages and error codes used for ntpd reporting and monitoring. Status words are used to display the current status of the running program. There is one system status word and a peer status word for each association. There is a clock status word for each association that supports a reference clock. There is a flash code for each association which shows errors found in the last packet received (pkt) and during protocol processing (peer). These are commonly viewed using the ntpq program.

Significant changes in program state are reported as events. There is one set of system events and a set of peer events for each association. In addition, there is a set of clock events for each association that supports a reference clock. Events are normally reported to the protostats monitoring file and optionally to the system log. In addition, if the trap facility is configured, events can be reported to a remote program that can page an administrator.

This page also includes a description of the error messages produced by the Autokey protocol. These messages are normally sent to the cryptostats monitoring file.

In the following tables the Event Field is the status or event code assigned and the Message Field a short string used for display and event reporting. The Description field contains a longer explanation of the status or event. Some messages include additional information useful for error diagnosis and performance assessment.

System Status Word

The system status word consists of four fields LI (0-1), Source (2-7), Count (8-11) and Event (12-15). It is reported in the first line of the rv display produced by the ntpq program.

Leap
Source
Count
Event
The Leap Field displays the system leap indicator bits coded as follows:

Code	Message	Description
0	leap_none	normal synchronized state
1	leap_add_sec	insert second after 23:59:59 of the current day
2	leap_del_sec	delete second 23:59:59 of the current day
3	leap_alarm	never synchronized
The Source Field displays the current synchronization source coded as follows:

Code	Message	Description
0	sync_unspec	not yet synchronized
1	sync_pps	pulse-per-second signal (Cs, Ru, GPS, etc.)
2	sync_lf_radio	VLF/LF radio (WWVB, DCF77, etc.)
3	sync_hf_radio	MF/HF radio (WWV, etc.)
4	sync_uhf_radio	VHF/UHF radio/satellite (GPS, Galileo, etc.)
5	sync_local	local timecode (IRIG, LOCAL driver, etc.)
6	sync_ntp	NTP
7	sync_other	other (IEEE 1588, openntp, crony, etc.)
8	sync_wristwatch	eyeball and wristwatch
9	sync_telephone	telephone modem (ACTS, PTB, etc.)
The Count Field displays the number of events since the last time the code changed. Upon reaching 15, subsequent events with the same code are ignored.

The Event Field displays the most recent event message coded as follows:

Code	Message	Description
00	unspecified	unspecified
01	freq_not_set	frequency file not available
02	freq_set	frequency set from frequency file
03	spike_detect	spike detected
04	freq_mode	initial frequency training mode
05	clock_sync	clock synchronized
06	restart	program restart
07	panic_stop	clock error more than 600 s
08	no_system_peer	no system peer
09	leap_armed	leap second armed from file or Autokey
0a	leap_disarmed	leap second disarmed
0b	leap_event	leap event
0c	clock_step	clock stepped
0d	kern	kernel information message
0e	TAI...	leapsecond values update from file
0f	stale leapsecond values	new NIST leapseconds file needed
Peer Status Word

The peer status word consists of four fields: Status (0-4), Select (5-7), Count (8-11) and Code (12-15). It is reported in the first line of the rv associd display produced by the ntpq program.

Status
Select
Count
Code
The Status Field displays the peer status code bits in hexadecimal; each bit is an independent flag. (Note this field is 5 bits wide, and combines with the the 3-bit-wide Select Field to create the first full byte of the peer status word.) The meaning of each bit in the Status Field is listed in the following table:

Code	Message	Description
08	bcst	broadcast association
10	reach	host reachable
20	authenb	authentication enabled
40	auth	authentication ok
80	config	persistent association
The Select Field displays the current selection status. (The T Field in the following table gives the corresponding tally codes used in the ntpq peers display.) The values are coded as follows:

Code	Message	T	Description
0	sel_reject	 	discarded as not valid (TEST10-TEST13)
1	sel_falsetick	x	discarded by intersection algorithm
2	sel_excess	.	discarded by table overflow (not used)
3	sel_outlyer	-	discarded by the cluster algorithm
4	sel_candidate	+	included by the combine algorithm
5	sel_backup	#	backup (more than tos maxclock sources)
6	sel_sys.peer	*	system peer
7	sel_pps.peer	o	PPS peer (when the prefer peer is valid)
The Count Field displays the number of events since the last time the code changed. Upon reaching 15, subsequent events with the same code are ignored.

The Event Field displays the most recent event message coded as follows:

Code	Message	Description
01	mobilize	association mobilized
02	demobilize	association demobilized
03	unreachable	server unreachable
04	reachable	server reachable
05	restart	association restart
06	no_reply	no server found (ntpdate mode)
07	rate_exceeded	rate exceeded (kiss code RATE)
08	access_denied	access denied (kiss code DENY)
09	leap_armed	leap armed from server LI code
0a	sys_peer	become system peer
0b	clock_event	see clock status word
0c	bad_auth	authentication failure
0d	popcorn	popcorn spike suppressor
0e	interleave_mode	entering interleave mode
0f	interleave_error	interleave error (recovered)
Clock Status Word

The clock status word consists of four fields: Unused (0-7), Count (8-11) and Code (12-15). It is reported in the first line of the clockvar associd display produced by the ntpq program.

Unused
Count
Code
The Count Field displays the number of events since the last lockvar command, while the Event Field displays the most recent event message coded as follows:

Code	Message	Description
00	clk_unspe	nominal
01	clk_noreply	no reply to poll
02	clk_badformat	bad timecode format
03	clk_fault	hardware or software fault
04	clk_bad_signal	signal loss
05	clk_bad_date	bad date format
06	clk_bad_time	bad time format
When the clock driver sets the code to a new value, a clock_alarm (11) peer event is reported.

Flash Status Word

The flash status word is displayed by the ntpq program rv command. It consists of a number of bits coded in hexadecimal as follows:

Code	Tag	Message	Description
0001	TEST1	pkt_dup	duplicate packet
0002	TEST2	pkt_bogus	bogus packet
0004	TEST3	pkt_unsync	server not synchronized
0008	TEST4	pkt_denied	access denied
0010	TEST5	pkt_auth	 authentication failure
0020	TEST6	pkt_stratum	invalid leap or stratum
0040	TEST7	pkt_header	 header distance exceeded
0080	TEST8	pkt_autokey	Autokey sequence error
0100	TEST9	pkt_crypto	Autokey protocol error
0200	TEST10	peer_stratum	 invalid header or stratum
0400	TEST11	peer_dist	 distance threshold exceeded
0800	TEST12	peer_loop	 synchronization loop
1000	TEST13	peer_unreach	 unreachable or nonselect
Kiss Codes

Kiss codes are used in kiss-o'-death (koD) packets, billboard displays and log messages. They consist of a string of four zero-padded ASCII charactes. In practice they are informal and tend to change with time and implementation. Some of these codes can appear in the reference identifier field in ntpq billboards. Following is the current list:

Code	Description
ACST	manycast server
AUTH	authentication error
AUTO	Autokey sequence error
BCST	broadcast server
CRYPT	Autokey protocol error
DENY	access denied by server
INIT	association initialized
MCST	multicast server
RATE	rate exceeded
TIME	association timeout
STEP	step time change
Crypto Messages

These messages are sent to the cryptostats file when an error is detected in the Autokey protocol.

Code	Message	Description
01	bad_format	bad extension field format or length
02	bad_timestamp	bad timestamp
03	bad_filestamp	bad filestamp
04	bad_public_key	bad or missing public key
05	bad_digest	unsupported digest type
06	bad_identity	unsupported identity type
07	bad_siglength	bad signature length
08	bad signature	extension field signature not verified
09	cert_not_verified	certificate signature not verified
0a	cert_expired	host certificate expired
0b	bad_cookie	bad or missing cookie
0c	bad_leapseconds	bad or missing leapseconds values
0d	cert_missing	bad or missing certificate
0e	bad_group_key	bad or missing group key
0f	proto_error	protocol error

		10.5.8 The NTP FAQ and HOWTO: Understanding and using the Network Time Protocol (A first try on a non-technical Mini-HOWTO and FAQ on NTP)
		http://www.ntp.org/ntpfaq/NTP-s-algo.htm
Prev		Next
This is the NTP home page that some people like to see here
| 5. How does it work?

This section will try to explain how NTP will construct and maintain a working time synchronization network.

| 5.1. Basic Concepts

To help understanding the details of planning, configuring, and maintaining NTP, some basic concepts are presented here. The focus in this section is on theory.

| 1. Time References
| 5.1.1.1. What is a reference clock?
| 5.1.1.2. How will NTP use a reference clock?
| 5.1.1.3. How will NTP know about Time Sources?
| 5.1.1.4. What happens if the Reference Time changes?
| 5.1.1.5. What is a stratum 1 Server?
| 2. Time Exchange
| 5.1.2.1. How is Time synchronized?
| 5.1.2.2. Which Network Protocols are used by NTP?
| 5.1.2.3. How is Time encoded in NTP?
| 5.1.2.4. When are the Servers polled?
| 3. Performance
| 5.1.3.1. How accurate will my Clock be?
| 5.1.3.2. How frequently will the System Clock be updated?
| 5.1.3.3. How frequently are Correction Values updated?
| 5.1.3.4. How reliable are those Error-Estimates?
| 5.1.3.5. What is the Limit for the Number of Clients?
| 4. Robustness
| 5.1.4.1. What is the stratum?
| 5.1.4.2. How are Synchronization Loops avoided?
| 5. Tuning
| 5.1.5.1. What is the allowed range for minpoll and maxpoll?
| 5.1.5.2. What is the best polling Interval?
| 6. Operating System Clock Interface
| 5.1.6.1. How will NTP discipline my Clock?
| 1. Time References

| 5.1.1.1. What is a reference clock?

A reference clock is some device or machinery that spits out the current time. The special thing about these things is accuracy: Reference clocks must be accurately following some time standard.

Typical candidates for reference clocks are (very expensive) cesium clocks. Cheaper (and thus more popular) ones are receivers for some time signals broadcasted by national standard agencies. A typical example would be a GPS (Global Positioning System) receiver that gets the time from satellites. These satellites in turn have a cesium clock that is periodically corrected to provide maximum accuracy.

Less expensive (and accurate) reference clocks use one of the terrestrial broadcasts known as DCF77, MSF, and WWV.

In NTP these time references are also named stratum 0, the highest possible quality. (Each system that has its time synchronized to some reference clock can also be a time reference for other systems, but the stratum will increase for each synchronization.)

| 5.1.1.2. How will NTP use a reference clock?

A reference clock will provide the current time, that's for sure. NTP will compute some additional statistical values that describe the quality of time it sees. Among these values are: offset (or phase), jitter (or dispersion), frequency error, and stability (See also Section 3.3). Thus each NTP server will maintain an estimate of the quality of its reference clocks and of itself.

| 5.1.1.3. How will NTP know about Time Sources?

There are serveral ways how a NTP client will know about NTP servers to use:

Servers to be polled can be configured manually
Servers can send the time directly to a peer
Servers may send out the time using multicast or broadcast addresses
| 5.1.1.4. What happens if the Reference Time changes?

Ideally the reference time is the same everywhere in the world. Once synchronized, there should not be any unexpected changes between the clock of the operating system and the reference clock. Therefore, NTP has no special methods to handle the situation.

Instead, ntpd's reaction will depend on the offset between the local clock and the reference time. For a tiny offset ntpd will adjust the local clock as usual; for small and larger offsets, ntpd will reject the reference time for a while. In the latter case the operation system's clock will continue with the last corrections effective while the new reference time is being rejected. After some time, small offsets (significantly less than a second) will be slewed (adjusted slowly), while larger offsets will cause the clock to be stepped (set anew). Huge offsets are rejected, and ntpd will terminate itself, believing something very strange must have happened.

Naturally, the algorithm is also applied when ntpd is started for the first time or after reboot.

| 5.1.1.5. What is a stratum 1 Server?

A server operating at stratum 1 belongs to the class of best NTP servers available, because it has a reference clock (See What is a reference clock?) attached to it. As accurate reference clocks are expensive, only rather few of these servers are publically available.

A stratum 1 server should not only have a precise and well-maintained and calibrated reference clock, but also should be highly available as other systems may rely on its time service. Maybe that's the reason why not every NTP server with a reference clock is publically available.

| 2. Time Exchange

| 5.1.2.1. How is Time synchronized?

Time can be passed from one time source to another, typically starting from a reference clock connected to a stratum 1 server. Servers synchronized to a stratum 1 server will be stratum 2. Generally the stratum of a server will be one more than the stratum of its reference (See also Q: 5.1.4.1.).

Synchronizing a client to a network server consists of several packet exchanges where each exchange is a pair of request and reply. When sending out a request, the client stores its own time (originate timestamp) into the packet being sent. When a server receives such a packet, it will in turn store its own time (receive timestamp) into the packet, and the packet will be returned after putting a transmit timestamp into the packet. When receiving the reply, the receiver will once more log its own receipt time to estimate the travelling time of the packet. The travelling time (delay) is estimated to be half of "the total delay minus remote processing time", assuming symmetrical delays.

Those time differences can be used to estimate the time offset between both machines, as well as the dispersion (maximum offset error). The shorter and more symmetric the round-trip time, the more accurate the estimate of the current time.

Time is not believed until several packet exchanges have taken place, each passing a set of sanity checks. Only if the replies from a server satisfy the conditions defined in the protocol specification, the server is considered valid. Time cannot be synchronized from a server that is considered invalid by the protocol. Some essential values are put into multi-stage filters for statistical purposes to improve and estimate the quality of the samples from each server. All used servers are evaluated for a consistent time. In case of disagreements, the largest set of agreeing servers (truechimers) is used to produce a combined reference time, thereby declaring other servers as invalid (falsetickers).

Usually it takes about five minutes (five good samples) until a NTP server is accepted as synchronization source. Interestingly, this is also true for local reference clocks that have no delay at all by definition.

After initial synchronization, the quality estimate of the client usually improves over time. As a client becomes more accurate, one or more potential servers may be considered invalid after some time.

| 5.1.2.2. Which Network Protocols are used by NTP?

NTP uses UDP/IP packets for data transfer because of the fast connection setup and response times. The official port number for the NTP (that ntpd and ntpdate listen and talk to) is 123.

| 5.1.2.3. How is Time encoded in NTP?

There was a nice answer from Don Payette in news://comp.protocols.time.ntp, slightly adapted:

The NTP timestamp is a 64 bit binary value with an implied fraction point between the two 32 bit halves. If you take all the bits as a 64 bit unsigned integer, stick it in a floating point variable with at least 64 bits of mantissa (usually double) and do a floating point divide by 2^32, you'll get the right answer.

As an example the 64 bit binary value:

00000000000000000000000000000001 10000000000000000000000000000000
equals a decimal 1.5. The multipliers to the right of the point are 1/2, 1/4, 1/8, 1/16, etc.
To get the 200 picoseconds, take a one and divide it by 2^32 (4294967296), you get 0.00000000023283064365386962890625 or about 233E-12 seconds. A picosecond is 1E-12 seconds.

In addition one should know that the epoch for NTP starts in year 1900 while the epoch in UNIX starts in 1970. Therefore the following values both correspond to 2000-08-31_18:52:30.735861

UNIX: 39aea96e.000b3a75
        00111001 10101110 10101001 01101110.
        00000000 00001011 00111010 01110101
NTP:  bd5927ee.bc616000
        10111101 01011001 00100111 11101110.
        10111100 01100001 01100000 00000000
| 5.1.2.4. When are the Servers polled?

When polling servers, a similar algorithm as described in Q: 5.1.3.3. is used. Basically the jitter (white phase noise) should not exceed the wander (random walk frequency noise). The polling interval tries to be close to the point where the total noise is minimal, known as Allan intercept, and the interval is always a power of two. The minimum and maximum allowable exponents can be specified using minpoll and maxpoll respectively (See Q: 5.1.5.1.). If a local reference clock with low jitter is selected to synchronize the system clock, remote servers may be polled more frequently than without a local reference clock in recent version of ntpd. The intended purpose is to detect a faulty reference clock in time.[1]

| 3. Performance

| 5.1.3.1. How accurate will my Clock be?

For a general discussion see Section 3. Also keep in mind that corrections are applied gradually, so it may take up to three hours until the frequency error is compensated (see Figure 3).

Figure 3. Initial Run of NTP



Of course the final achievable accuracy depends on the time source being used. Basically, no client can be more accurate than its server. In addition the quality of network connection also influences the final accuracy. Slow and non predictable networks with varying delays are very bad for good time synchronization.

A time difference of less than 128ms between server and client is required to maintain NTP synchronization. The typical accuracy on the Internet ranges from about 5ms to 100ms, possibly varying with network delays. A recent survey[2] suggests that 90% of the NTP servers have network delays below 100ms, and about 99% are synchronized within one second to the synchronization peer.

With PPS synchronization an accuracy of 50µs and a stability below 0.1 PPM is achievable on a Pentium PC (running Linux for example). However, there are some hardware facts to consider. Judah Levine wrote:

In addition, the FreeBSD system I have been playing with has a clock oscillator with a temperature coefficient of about 2 PPM per degree C. This results in time dispersions on the order of lots of microseconds per hour (or lots of nanoseconds per second) due solely to the cycling of the room heating/cooling system. This is pretty good by PC standards. I have seen a lot worse.

Terje Mathisen wrote in reply to a question about the actual offsets achievable: "I found that 400 of the servers had offsets below 2ms, (...)"

David Dalton wrote about the same subject:

The true answer is: It All Depends.....

Mostly, it depends on your networking. Sure, you can get your machines within a few milliseconds of each other if they are connected to each other with normal 10-Base-T Ethernet connections and not too many routers hops in between. If all the machines are on the same quiet subnet, NTP can easily keep them within one millisecond all the time. But what happens if your network get congested? What happens if you have a broadcast storm (say 1,000 broadcast packets per second) that causes your CPU to go over 100% load average just examining and discarding the broadcast packets? What happens if one of your routers loses its mind? Your local system time could drift well outside the "few milliseconds" window in situations like these.

| 5.1.3.2. How frequently will the System Clock be updated?

As time should be a continuous and steady stream, ntpd updates the clock in small quantities. However, to keep up with clock errors, such corrections have to be applied frequently. If adjtime() is used, ntpd will update the system clock every second. If ntp_adjtime() is available, the operating system can compensate clock errors automatically, requiring only infrequent updates. See also Section 5.2 and Q: 5.1.6.1..

| 5.1.3.3. How frequently are Correction Values updated?

NTP maintains an internal clock quality indicator. If the clock seems stable, updates to the correction parameters happen less frequent. If the clock seems instable, more frequent updates are scheduled. Sometimes the update interval is also termed stiffness of the PLL, because only small changes are possible for long update intervals.

There's a decision value named poll adjust that can be queried with ntpdc's loopinfo command. A value of -30 means to decrease the polling interval, while a value of 30 means to increase it (within the bounds of minpoll and maxpoll). The value of watchdog timer is the time since the last update.

ntpdc> loopinfo
offset:               -0.000102 s
frequency:            16.795 ppm
poll adjust:          6
watchdog timer:       63 s
Recent versions of ntpd (like 4.1.0) seem to update the correction values less frequently, possibly causing problems. Even if the reference time sources are polled more frequently, the local system clock is adjusted less often.

| 5.1.3.4. How reliable are those Error-Estimates?

While in theory estimates of the clock error are maintained, there were practically some software bugs that made these numbers questionable. For example the new kernel clock model dealing with nanosecond resolution (nanokernel) produced overly optimistic estimates regarding the clock offset. The bug has been fixed in August 2000, but also different versions of the NTP daemon may produce different estimates for the same hardware.

| 5.1.3.5. What is the Limit for the Number of Clients?

The limit actually depends on several factors, like speed of the main processor and network bandwidth, but the limit is quite high. Terje Mathisen once presented a calculation:

2 packets/256 seconds * 500 K machines -> 4 K packets/second (half in each direction).

Packet size is close to minimum, definitely less than 128 bytes even with cryptographic authentication:

4 K * 128 -> 512 KB/s.

So, as long as you had a dedicated 100 Mbit/s full duplex leg from the central switch for each server, it should see average networks load of maximim 2-3%.

| 4. Robustness

| 5.1.4.1. What is the stratum?

The stratum is a measure for synchronization distance. Opposed to jitter or delay the stratum is a more static measure. Basically (and from the perspective from a client) it is the number of servers to a reference clock. So a reference clock itself appears at stratum 0, while the closest servers are at stratum 1. On the network there is no valid NTP message with stratum 0.

A server synchronized to a stratum n server will be running at stratum n + 1. The upper limit for stratum is 15. The purpose of stratum is to avoid synchronization loops by preferring servers with a lower stratum.

| 5.1.4.2. How are Synchronization Loops avoided?

In a synchonization loop, the time derived from one source along a specific path of servers is used as reference time again within such a path. This may cause an excessive accumulation of errors that is to be avoided. Therefore NTP uses different means to accomplish that:

The Internet address of a time source is used as reference identifier to avoid duplicates. The reference identifier is limited to 32 bits however.

The stratum as described in Q: 5.1.4.1. is used to form an acyclic synchronization network.

More precisely[2], the algorithm finds a shortest path spanning tree with metric based on synchronization distance dominated by hop count. The reference identifier provides additional information to avoid neighbor loops under conditions where the topology is changing rapidly. This is a very well known problem with algorithms such as this. See any textbook on computer network routing algorithms. Computer Networks by Bertsekas and Gallagher is a good one.

In IPv6 the reference ID field is a timestamp that can be used for the same purpose.

| 5. Tuning

| 5.1.5.1. What is the allowed range for minpoll and maxpoll?

The default polling value after restart of NTP is the value specified by minpoll. The default values for minpoll and maxpoll are 6 (64 seconds) and 10 (1024 seconds) respectively.

For xntp3-5.93e the smallest and largest allowable polling values are 4 (16 seconds) and 14 (4.5 hours) respectively. For actual polling intervals larger than 1024 seconds the kernel discipline is switched to FLL mode.

For ntp-4.0.99f the smallest and largest allowable polling values are 4 (16 seconds) and 17 (1.5 days) respectively. These values come from the include file ntp.h. The revised kernel discipline automatically switches to FLL mode if the update interval is longer than 2048 seconds. Below 256 seconds PLL mode is used, and in between these limits the mode can be selected using the STA_FLL bit.

| 5.1.5.2. What is the best polling Interval?

Actually there is none: Short polling intervals update the parameters frequently and are sensitive to jitter and random errors. Long intervals may require larger corrections with significant errors between the updates. However there seems to be an optimum between those two. For common operating system clocks this value happens to be close to the default maximum polling time, 1024s. See also Q: 5.1.3.1..

| 6. Operating System Clock Interface

| 5.1.6.1. How will NTP discipline my Clock?

In order to keep the right time, xntpd must make adjustments to the system clock. Different operating systems provide different means, but the most popular ones are listed below.

Basically there are four mechanisms (system calls) an NTP implementation can use to discipline the system clock (For details see the different RFCs found in Table 4):

settimeofday(2) to step (set) the time. This method is used if the time if off by more than 128ms.

adjtime(2) to slew (gradually change) the time. Slewing the time means to change the virtual frequency of the software clock to make the clock go faster or slower until the requested correction is achieved. Slewing the clock for a larger amount of time may require some time, too. For example standard Linux adjusts the time with a rate of 0.5ms per second.

ntp_adjtime(2) to control several parameters of the software clock (also known as kernel discipline). Among these parameters are:

Adjust the offset of the software clock, possibly correcting the virtual frequency as well

Adjust the virtual frequency of the software clock directly

Enable or disable PPS event processing

Control processing of leap seconds

Read and set some related characteristic values of the clock

hardpps() is a function that is only called from an interrupt service routine inside the operating system. If enabled, hardpps() will update the frequency and offset correction of the kernel clock in response to an external signal (See also Section 6.2.4).

Notes

[1]	
This statement was derived from a mail message by Professor David L. Mills in response to a suspected bug in version 4.1.0.

[2]	
...says Professor David L. Mills...

This is the NTP home page that some people like to see here
Prev	Home	Next
Implementations and Platforms	 	The Kernel Discipline
```
