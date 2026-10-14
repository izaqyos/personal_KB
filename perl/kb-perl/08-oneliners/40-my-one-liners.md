---
type: cheatsheet
title: My one liners
description: Subsection 8.19 of Oneliners.
tags: [kb-perl]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "perl/KB_perl#8.19"
---

# 8.19 My one liners

[↑ Oneliners](/perl/kb-perl/08-oneliners/README.md)

### 8.19.1 Delete line n, like sed -ie '1d'

```text
			say n=1 , delete line 1.
$ perl -i.bak -ne 'print if ($. != 1)  ' cctree.txt 
$ perl -ne ' print if ($. == 1)   ' cctree.txt 

$ diff cctree.txt cctree.txt.bak 
0a1
> *CCTree.txt*	Plugin for C Call-Tree Explorer *CCTree*

			8.19.2 Filter log files for patterns
$ perl -ne '/StepLatency=(.*?),/ && print "$_ \n latency: ",$1, "\n____________________\n"' *
____________________
AcsLogs,2017-01-10 14:02:55,447,DEBUG,0x2b21532a9940,cntx=0072338853,sesn=<session-id>,Log_Message=[2017-01-10 14:02:55.447 +08:00 0250449176 5440 NOTICE RADIUS: Endpoint abandoned EAP session and started new, ConfigVersionId=392, Device IP Address=192.0.2.10, DestinationIPAddress=192.0.2.10, UserName=<customer-user>, AcsSessionID=<session-id>, SelectedAccessService=Default Network Access, FailureReason=<code> Endpoint abandoned EAP session and started new, Step=11001, Step=11017, Step=15049, Step=15008, Step=15048, Step=15048, Step=15048, Step=15004, Step=11507, Step=12500, Step=12625, Step=11006, Step=11001, Step=11018, Step=12301, Step=12300, Step=12625, Step=11006, Step=11001, Step=11018, Step=12302, Step=12318, Step=12800, Step=12805, Step=12806, Step=12801, Step=12802, Step=12305, Step=11006, Step=5440, NetworkDeviceName=TW-TPE-NKB-11F-DS-3850-1, NetworkDeviceGroups=Location#All Locations#NKB#NKB-11F, NetworkDeviceGroups=Device Type#All Device Types#Wireless, EapTunnel=PEAP, User-Name=<customer-user>, NAS-IP-Address=192.0.2.10, Framed-IP-Address=192.0.2.10, Calling-Station-ID=48-45-20-3F-B1-FF, NAS-Port-Type=Wireless - IEEE 802.11, NAS-Port-Id=Capwap27, Airespace-Wlan-Id=1, CPMSessionID=0a225f0258743fff0001a68d, EndPointMACAddress=48-45-20-3F-B1-FF, ISEPolicySetName=Default, AllowedProtocolMatchedRule=Dot1X, StepLatency=29=18106, Location=Location#All Locations#NKB#NKB-11F, Device Type=Device Type#All Device Types#Wireless, Response={RadiusPacketType=Drop; },],MessageFormatter.cpp:75
 
 latency: 29=18106
____________________
AcsLogs,2017-01-10 14:07:03,398,DEBUG,0x2b21533aa940,cntx=0072341830,sesn=<session-id>,user=host/<endpoint>,Log_Message=[2017-01-10 14:07:03.397 +08:00 0250461050 5400 NOTICE Failed-Attempt: Authentication failed, ConfigVersionId=392, Device IP Address=192.0.2.10, Device Port=1645, DestinationIPAddress=192.0.2.10, DestinationPort=1645, RadiusPacketType=AccessRequest, UserName=host/<endpoint>, Protocol=Radius, RequestLatency=8, NetworkDeviceName=TW-TPE-NKB-18F-FS-2960x-1, User-Name=host/<endpoint>, NAS-IP-Address=192.0.2.10, NAS-Port=50112, Service-Type=Framed, Framed-IP-Address=192.0.2.10, Framed-MTU=1500, State=37CPMSessionID=0A22970B000000CD10089E8A\;40SessionID=<session-id>\;, Called-Station-ID=00-59-DC-D9-82-8C, Calling-Station-ID=40-A8-F0-48-70-E2, NAS-Port-Type=Ethernet, NAS-Port-Id=GigabitEthernet1/0/12, EAP-Key-Name=, cisco-av-pair=service-type=Framed, cisco-av-pair=audit-session-id=0A22970B000000CD10089E8A, cisco-av-pair=method=dot1x, AcsSessionID=<session-id>, SelectedAccessService=Default Network Access, FailureReason=<code> PEAP failed SSL/TLS handshake because the client rejected the ISE local-certificate, Step=11001, Step=11017, Step=15049, Step=15008, Step=15048, Step=15048, Step=15048, Step=15004, Step=11507, Step=12500, Step=12625, Step=11006, Step=11001, Step=11018, Step=12301, Step=12300, Step=12625, Step=11006, Step=11001, Step=11018, Step=12302, Step=12318, Step=12800, Step=12805, Step=12806, Step=12807, Step=12810, Step=12305, Step=11006, Step=11001, Step=11018, Step=12304, Step=12305, Step=11006, Step=11001, Step=11018, Step=12304, Step=12318, Step=12815, Step=12321, Step=12307, Step=11504, Step=11003, NetworkDeviceGroups=Location#All Locations#NKB-Agent, NetworkDeviceGroups=Device Type#All Device Types#Wired, EapTunnel=PEAP, OpenSSLErrorMessage=SSL alert: code=0x230=560 \; source=remote \; type=fatal \; message="unknown CA", OpenSSLErrorStack=  47422130268480:error:14094418:SSL routines:SSL3_READ_BYTES:tlsv1 alert unknown ca:s3_pkt.c:1102:SSL alert number 48, CPMSessionID=0A22970B000000CD10089E8A, EndPointMACAddress=40-A8-F0-48-70-E2, ISEPolicySetName=Default, AllowedProtocolMatchedRule=Dot1X, StepLatency=34=15004, Location=Location#All Locations#NKB-Agent, Device Type=Device Type#All Device Types#Wired, Response={RadiusPacketType=AccessReject; },],MessageFormatter.cpp:75
 
 latency: 34=15004
____________________
AcsLogs,2017-01-10 14:07:24,022,DEBUG,0x2b21530a7940,cntx=0072342012,sesn=<session-id>,Log_Message=[2017-01-10 14:07:24.022 +08:00 0250461791 5440 NOTICE RADIUS: Endpoint abandoned EAP session and started new, ConfigVersionId=392, Device IP Address=192.0.2.10, DestinationIPAddress=192.0.2.10, UserName=<customer-user>, AcsSessionID=<session-id>, SelectedAccessService=Default Network Access, FailureReason=<code> Endpoint abandoned EAP session and started new, Step=11001, Step=11017, Step=15049, Step=15008, Step=15048, Step=15048, Step=15048, Step=15004, Step=11507, Step=12500, Step=12625, Step=11006, Step=11001, Step=11018, Step=12301, Step=12300, Step=12625, Step=11006, Step=11001, Step=11018, Step=12302, Step=12318, Step=12800, Step=12805, Step=12806, Step=12801, Step=12802, Step=12305, Step=11006, Step=5440, NetworkDeviceName=TW-TPE-NKB-10F-DS-3850-1, NetworkDeviceGroups=Location#All Locations#NKB#NKB-10F, NetworkDeviceGroups=Device Type#All Device Types#Wireless, EapTunnel=PEAP, User-Name=<customer-user>, NAS-IP-Address=192.0.2.10, Framed-IP-Address=192.0.2.10, Calling-Station-ID=10-02-B5-70-7C-90, NAS-Port-Type=Wireless - IEEE 802.11, NAS-Port-Id=Capwap27, Airespace-Wlan-Id=1, CPMSessionID=0a225702587472c300074696, EndPointMACAddress=10-02-B5-70-7C-90, ISEPolicySetName=Default, AllowedProtocolMatchedRule=Dot1X, StepLatency=29=36451, Location=Location#All Locations#NKB#NKB-10F, Device Type=Device Type#All Device Types#Wireless, Response={RadiusPacketType=Drop; },],MessageFormatter.cpp:75
 
 latency: 29=36451
____________________

With filename and more data:
$ perl -ne '/StepLatency=(\d+)=(\d+),/ && print "File $ARGV\nLine: $_ \nStep $1 latency: ",$2, "\n____________________\n"' *

			8.19.3 Print file suffixes sorted lexicographically
.xml$ find -type f | perl -ne ' /.*(\.\w+$)/ && $suffix_hash{$1}++; END {$,="\n"; print sort keys  fix_hash} '

...
.cfg
.changes
.cmak
.codedemo
.cpp
.css
.dbi
.def
.dict
.diff
.dir
.doc
.dsp
.dummy
...
```
