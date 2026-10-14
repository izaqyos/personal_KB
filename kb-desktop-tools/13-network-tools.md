---
type: reference
title: Network tools.
description: "Network tools: Ethereal/Wireshark sniffer and RADIUS port filters."
tags: [wireshark, networking, packet-capture, reference, legacy]
generated: { by: "human:izaqyos", at: "2026-10-14T11:12:50Z" }
status: stable
capture_type: source
legacy_source: "kb-desktop-tools#15"
---

# Network tools.

[↑ kb-desktop-tools](/kb-desktop-tools/README.md)

## 15.1 ethereal sniffer (4 windows need wincap lib)

## 15.2 Wireshark

```text
reference: http://wiki.wireshark.org/Radius
```

### 15.2.1 Capture Filters

#### 15.2.1.1 RADIUS

```text
			port 1812 or port 1813
```

#### 15.2.1.2 RADIUS CoA (Dynamic Authorization)

```text
udp.port == 3799
```

### 15.2.2 Display Filters

#### 15.2.2.1 RADIUS

```text
A complete list of RADIUS display filter fields can be found in the display filter reference


Show only the RADIUS traffic:

radius 

Show only RADIUS Access-Request messages:

radius.code == 1 

Show only RADIUS Access-Accept messages:

radius.code == 2 

Show only RADIUS Access-Reject messages:

radius.code == 3 

Show only RADIUS Accounting-Request[start] messages:

radius.Acct_Status_Type == 1 

Show only RADIUS Accounting-Request[stop] messages:

radius.Acct_Status_Type == 2 

Show only RADIUS response messages that take longer than two seconds from the request:

radius.time >= 2 

Show only RADIUS Access-Reject messages that come with an Reply-Message attribute containing "password":

radius.code == 3 and radius.Reply_Message contains "password" 
```

### 15.2.3 Decode As

```text
Allows to see a network capture as a given protocol.
Example: right click any line in capture
in popup menu choose decode as
choose radius
apply
```

## 15.3 tshark (CLI version of Wireshark)

```text
Usage example:
tshark -i lo -x -R udp.port==20514

capture all packets on local loop sent on UDP port 20514 (ACS view syslog collector)
```

## 15.4 tcpdump

```text
Usage example:
tcpdump host <internal-ip>  -w /tmp/capture1.cap -i eth0 -s 0

use this comannd and then filter , radius, tcp ports, etc in wirshark
```
