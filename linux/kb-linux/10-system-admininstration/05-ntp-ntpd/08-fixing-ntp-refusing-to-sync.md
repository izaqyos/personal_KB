---
type: reference
title: Fixing NTP Refusing to Sync
description: "Fixing NTP refusing to sync, with adjtimex and clocksource checks."
tags: [ntp, troubleshooting, linux, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "linux/KB_Linux#10.5.10"
---

# 10.5.10 Fixing NTP Refusing to Sync

[↑ NTP, NTPD](/linux/kb-linux/10-system-admininstration/05-ntp-ntpd/README.md)

```text
April 26th, 2010Leave a commentGo to comments
I have just been confronted by NTP absolutely refusing to touch my system’s clock. The trouble with NTP is that it is absolute PITA to debug it at all since when it does not get in sync with its peers, it goes at great lengths to make its reasons as incomprehensible as possible.

For some reason, my system had absolutely massive drift – something in the order of half a second per minute, making the clock drift by several tens of minutes per day. So I installed NTP and hoped that it would magically fix up the issue, but it turns out that NTP by itself is absolutely unhelpful not only in cases of big offset, but also in cases of big drift – it will fix your clock when it is slightly inaccurate, but not when it is inaccurate a lot (…that is, when you would want to use it all the more).

First thing I did was check the hardware’s opinion. Comparing date and hwclock --show has shown that the hardware clock is doing fine, only kernel’s idea of time is drifting off. Next, it’s time to see what NTP thinks about its peers:

ntpq> peers
     remote           refid      st t when poll reach   delay   offset  jitter
==============================================================================
 tik.cesnet.cz   .GPS.            1 u   12   64  377    0.641  8494.05 2911.29
 tak.cesnet.cz   .GPS.            1 u    2   64  377    0.636  8594.86 2945.05
NTP polls each peer every “poll” seconds, “when” is relative time of last poll; “reach” keeps track of last successful polls, 377 is best. “Delay” is network delay, this is fine. “Offset” is the offset between local and peer clock, it’s at 8.5s now – not so good, but trouble is it gets bigger quickly. But what’s the real culprit is “jitter” – it’s huge! This means that the variance of offsets is huge – to put it simply, the offset is very different each time it is measured. Since no symbols are printed in the first column of the output, there is no peer synchronization going on.

So if we know a lot about NTP already, the high jitter should hint us that the offset measurements are unreliable. But the network connection of our server is very good, it would be nice to look at the actual measurements. Instead of peers, let’s look at their associations:

ntpq> as

ind assID status  conf reach auth condition  last_event cnt
===========================================================
  1 55713  9014   yes   yes  none    reject   reachable  1
  2 55714  9014   yes   yes  none    reject   reachable  1
NTP is not liking our peers. No surprise, with the big jitter. But what we are after are the assID numbers:

ntpq> rv 55713
assID=55713 status=9014 reach, conf, 1 event, event_reach,
srcadr=tik.cesnet.cz, srcport=123, dstadr=195.113.20.142, dstport=123,
leap=00, stratum=1, precision=-20, rootdelay=0.000,
rootdispersion=0.000, refid=GPS, reach=377, unreach=0, hmode=3, pmode=4,
hpoll=6, ppoll=6, flash=400 peer_dist, keyid=0, ttl=0, offset=13041.231,
delay=0.602, dispersion=0.944, jitter=2918.331,
reftime=cf803b51.ddd3e70e  Mon, Apr 26 2010 18:18:25.866,
org=cf803b83.e9b29181  Mon, Apr 26 2010 18:19:15.912,
rec=cf803b76.df382c7c  Mon, Apr 26 2010 18:19:02.871,
xmt=cf803b76.df0d40c7  Mon, Apr 26 2010 18:19:02.871,
filtdelay=     0.60    0.64    0.60    0.51    0.82    0.67    0.69    0.64,
filtoffset= 13041.2 12385.8 11720.4 11075.2 10409.6 9774.54 9129.22 8494.06,
filtdisp=      0.00    0.98    1.97    2.93    3.92    4.86    5.82    6.77
Looking at the last three lines, the reason for the huge jitter finally seems clear! Our clock drifts so fast that the offset will go up by several seconds through our few measurements.

Unfortunately, NTP does not seem to be giving us the actual estimated drift value between local clock and the peer. This would be very useful since that’s actually what makes NTP decide whether go ahead and sync or keep its hands away from the clock; it is said that 500ppm is the max. drift value for possible synchronization, but I don’t know how to connect that to any of the other numbers I see; when the clock is already in sync, it is probably the ‘frequency’ value in ‘rv’ (and it is stored in the drift file), but this value stays untouched before synchronization. Too bad.

So, now we know the issue is that kernel clock is going too slow and that NTP is not going to fix it for ourselves. So, we must resort to manual tinkering using adjtimex:

# adjtimex -p
         mode: 0
       offset: 0
    frequency: 0
     maxerror: 0
     esterror: 0
       status: 64
time_constant: 4
    precision: 1
    tolerance: 32768000
         tick: 9900
     raw time:  1272299204s 17444us = 1272299204.017444
 return value = 5
Wow, a lot of numbers. But the one that tells how fast the clock is going is the ‘tick’ value, and you can adjust it using adjtimex -t 10000 – that will make the clock go a lot faster, and is also sort-of canonical value. Let’s just do that and restart ntpd:

     remote           refid      st t when poll reach   delay   offset  jitter
==============================================================================
 tik.cesnet.cz   .GPS.            1 u    1   64    7    0.659  16852.5   1.840
 tak.cesnet.cz   .GPS.            1 u    2   64    7    0.665  16852.5   1.863
This is MUCH better! In fact, after few minutes NTP will decide to step the clock to compensate the offset, and after another while it will finally get in sync with the peers. If the jitter is still too big (but different), keep tweaking the tick value.

EDIT: It seems that alternatively, you can try to change your clock source – this might help especially in case of virtualization:

# cat /sys/devices/system/clocksource/clocksource0/available_clocksource
hpet acpi_pm jiffies tsc
# cat /sys/devices/system/clocksource/clocksource0/current_clocksource
hpet

Hope this helps if your NTP also refuses to fix your clock.

Open questions remain:

Why was my tick value so off? I guess I will never know. Maybe a reboot would fix it too, but I wasn’t keen to do that.
How to determine drift-per-peer value to see how much out of bounds it is?
How to make NTP automatically fix even huge drifts?
Why is NTP crafted to be so hard to debug without spending tens of minutes googling, staring at bunches of floats and decoding bitmasks manually?
Thanks to prema and otis for ideas and help.

Categories: linuxTags: clock, debian, ntp
Comments (8)Trackbacks (2)Leave a commentTrackback

Stefan Seyfried
April 28th, 2010 at 18:58	 | #1 Reply | Quote
Hi pasky,
I have seen similar stuff when /etc/adjtime was totally off. /etc/adjtime is used to record the time drift and to initialize adjtimex values.
I think it should not be used when NTP is in use, unless the kernel time is off grossly, which is seldom the case nowadays.
Unfortunately, many distributions still do a “hwclock –systohc” on shutdown – which updates /etc/adjtime, even nowadays, where even the CMOS clocks on PCs are pretty accurate. I think this is a bug, but I gave up, at least for SUSE to argue, and I just disable it manually in the shutdown scripts.
Hope this helps,
seife

Stefan Seyfried
April 28th, 2010 at 18:59	 | #2 Reply | Quote
Oh, I forgot: usually just removing /etc/adjtime and doing “hwclock –systohc –utc” once is enough to get it fixed for all time.

Larry McCarthy
May 29th, 2010 at 17:56	 | #3 Reply | Quote
You asked: “Why was my tick value so off? I guess I will never know. Maybe a reboot would fix it too, but I wasn’t keen to do that.”
I was having drift problems, so installed adjtime. When adjtime installed is spent 70 seconds “initializing” itself and set ticks to 9768. As you can imagine, this made the problem waaaay worse, to the point that NTP wouldn’t sync and I’d lost ~30 minutes over night.
So, your excellent adjtime vs. NTP analysis was just the thing I needed! Thanks!

Larry McCarthy
May 29th, 2010 at 18:20	 | #4 Reply | Quote
So, based on this really excellent article (I’m stoked; this helped *a lot*), here’s a little trick (sorry; don’t know how to tag “code” here):
# /etc/init.d/ntp stop ; ntpd -q ; sleep 100s ; ntpd -q; /etc/init.d/ntp start
This stops NTP, forces it to sync the clock (to “prime the pump”), sleeps for 100 seconds, forces a second clock sync, and restarts NTP. It produces output like this:
Stopping NTP server: ntpd.
ntpd: time set +12.262938s
ntpd: time set +2.623381s <— drift per 100s
Starting NTP server: ntpd.
The second "time set" – +2.623381s – is your 100s drift. Take that drift, (as a proportion of the current ticks), add (use the sign of the drift – if the sign on the drift is "-", you'd subtract ticks) it to the adjtime adjustment, and repeat 'til satisfied, like so:
# adjtimex -p
[...]
tick: 10000
[...]
# # add (+2.62s / 100s) * 10000 = 262 ticks
# adjtimex -t 10262
# /etc/init.d/ntp stop ; ntpd -q ; sleep 100s ; ntpd -q; /etc/init.d/ntp start
Stopping NTP server: ntpd.
ntpd: time set +3.044932s
ntpd: time set -0.259021s
Starting NTP server: ntpd
Now, -0.26s drift per 100s is probably "correctable" by NTP. If not, repeat this process some more…
- Larry

Larry McCarthy
May 29th, 2010 at 18:53	 | #5 Reply | Quote
Sorry to go on, but just one more thing, I promise…
So, once you get the drift below a second, you probably want to do a longer drift sample. To keep the arithmetic simple, continuing with the above example:
# /etc/init.d/ntp stop ; ntpd -q ; sleep 1026s ; ntpd -q; /etc/init.d/ntp start
Stopping NTP server: ntpd.
ntpd: time set -1.428262s <– Remember, ignore this. Take a 17m coffee break.
ntpd: time set -2.333034s
Starting NTP server: ntpd.
# # OK, remember, [tick] is currently 10262, so ((-2.33 / 1026) * 10262) ~ (-23)
# # and 10262 + (-23) = 10239, so…
# adjtimex -t 10239
To watch the results, I do:
# watch -n 8 ntpq -p
Yeah, 8s is kinda fast, but I'm the kind of guy who takes surface streets when the freeway's slow, just to have something to do…
Thanks again for this great post!
- Larry

Larry McCarthy
May 29th, 2010 at 19:04	 | #6 Reply | Quote
I know I promised, but this is important:
Once you’re happy with your jitter values – Single digits! Finally! – as Stefan said, you MUST do:
# rm /etc/adjtime
# hwclock –systohc –utc
*NOTE*: Windows dual-booters probably want to do:
# hwclock –systohc –localtime
And those are double-dashes; WordPress turns them into a single em-dash. Sorry.
OK. That’s it. I promise. :)

Deiva
May 10th, 2013 at 07:27	 | #7 Reply | Quote
Hi,
For me manually the ntp service syncing using ntpdate -u but when we start the service its giving the below output…please advice should i need to change the adtimex here am using redhat linux
[root@deiva ~]# ntpq -pn
remote refid st t when poll reach delay offset jitter
==============================================================================
*127.127.1.0 .LOCL. 10 l 7 64 37 0.000 0.000 0.001
|   172.16.8.4 .GPS. 1 u 8 64 37 5.462 -3029.9 1910.44
|   172.16.8.5 .GPS. 1 u 3 64 37 5.198 -3091.9 1946.43
[root@deiva ~]# service ntpd restart
Shutting down ntpd: [ OK ]
ntpd: Synchronizing with time server: [ OK ]
Syncing hardware clock to system time [ OK ]
Starting ntpd: [ OK ]
[root@deiva ~]# date
Sat May 4 17:36:25 CEST 2013
[root@deiva ~]# date
Sat May 4 17:39:56 CEST 2013
[root@deiva ~]# ntpq -pn
remote refid st t when poll reach delay offset jitter
==============================================================================
*127.127.1.0 .LOCL. 10 l 33 64 17 0.000 0.000 0.001
|   172.16.8.4 .GPS. 1 u 32 64 17 4.721 -56.787 2147.63
|   172.16.8.5 .GPS. 1 u 31 64 17 4.971 -72.407 2161.70
[root@deiva ~]# exit
== manuall service ==
[root@deiva ~]# ntpdate -u 172.16.8.4
30 Apr 20:12:28 ntpdate[96890]: step time server 172.16.8.4 offset -0.975695 sec
[root@deiva ~]# ntpq -pn
remote refid st t when poll reach delay offset jitter
==============================================================================
|   127.127.1.0 .LOCL. 10 l 21 64 3 0.000 0.000 0.001
|   172.16.8.4 .GPS. 1 u 21 64 3 5.175 -55.482 0.702
|   172.16.8.5 .GPS. 1 u 19 64 3 5.673 -71.212 15.585
ntpq> as
ind assID status conf reach auth condition last_event cnt
===========================================================
1 56510 9614 yes yes none sys.peer reachable 1
2 56511 9014 yes yes none reject reachable 1
3 56512 9014 yes yes none reject reachable 1
ntpq> rv 56511
assID=56511 status=9014 reach, conf, 1 event, event_reach,
srcadr=172.16.8.4, srcport=123, dstadr=10.69.23.2, dstport=123, leap=00,
stratum=1, precision=-9, rootdelay=0.000, rootdispersion=5.676,
refid=GPS, reach=377, unreach=0, hmode=3, pmode=4, hpoll=10, ppoll=10,
flash=400 peer_dist, keyid=0, ttl=0, offset=-23003.227, delay=4.651,
dispersion=12.835, jitter=10710.871,
reftime=d529fedf.146a7ef9 Tue, Apr 30 2013 10:27:11.079,
org=d529fef8.9c49ba5e Tue, Apr 30 2013 10:27:36.610,
rec=d529ff17.88f783ee Tue, Apr 30 2013 10:28:07.535,
xmt=d529ff17.8242ad4e Tue, Apr 30 2013 10:28:07.508,
filtdelay= 4.95 4.65 5.95 6.56 4.99 4.82 5.27 5.94,
filtoffset= -30922. -23003. -19036. -15038. -13023
```
