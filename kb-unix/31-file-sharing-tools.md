---
type: reference
title: File sharing tools
description: "File sharing tools, including setting up vsftpd on Red Hat Linux."
tags: [linux, rpm, howto, configuration-file, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "unix-kb#31"
---

# File sharing tools

[↑ unix-kb](/kb-unix/README.md)

## 31.1 VSFTPD

### 31.1.1 Setup on RH linux

```text
-> Install:
yum install vsftpd

-> Verify:
rpm -q vsftpd

-> Start:
  service vsftpd start

-> Configuration
  354  ls /etc/vsftpd/
  355  vi /etc/vsftpd/vsftpd.conf 

-> Anonymous dir: 
  /var/ftp/


		31.1.2


	31.2
```
