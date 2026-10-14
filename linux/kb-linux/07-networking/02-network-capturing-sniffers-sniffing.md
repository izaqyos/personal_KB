---
type: reference
title: "Network capturing (sniffers, sniffing)"
description: Network capture on Linux with Wireshark and tshark.
tags: [packet-capture, wireshark, linux, networking, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "linux/KB_Linux#7.2"
---

# 7.2 Network capturing (sniffers, sniffing)

[↑ Networking](/linux/kb-linux/07-networking/README.md)

### 7.2.1 Wireshark

### 7.2.2 tshark

```text
Usage example:
tshark -i lo -x -R udp.port==20514

capture all packets on local loop sent on UDP port 20514 (ACS view syslog collector)
You need to run this as root!
```
