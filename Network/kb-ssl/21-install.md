---
type: reference
title: Install
description: Installing OpenSSL on Ubuntu via apt and from source code.
tags: [openssl, linux, howto, legacy, tips]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "Network/sslKB#20"
---

# Install

[↑ sslKB](/Network/kb-ssl/README.md)

## 20.1 Install from source code

### 20.1.1 Install on Ubunto

```text
- get latest
sudo apt-get install openssl

- install from sources
	-- show current
  25  apt-cache show openssl

	-- remove current
   26  sudo aptitude remove openssl libssl-dev

	-- install from source
   27  apt-get install aptitude
   28  cd
   29  pwd
   39  wget https://www.openssl.org/source/old/0.9.x/openssl-0.9.7l.tar.gz --no-check-certificate
   41  tar xvfz openssl-0.9.7l.tar.gz 
   42  cd openssl-0.9.7l
   43  ./config --prefix=/usr
   44  make
   46  apt-get install checkinstall
   47  checkinstall
   ...
**********************************************************************

 Done. The new package has been installed and saved to

 /root/openssl-0.9.7l/openssl_0.9.7l-1_amd64.deb

 You can remove it from your system anytime using: 

      dpkg -r openssl

**********************************************************************
$ apt-cache show openssl
Package: openssl
Status: install ok installed
Priority: extra
Section: checkinstall
Installed-Size: 11400
Maintainer: root@LDAP-server
Architecture: amd64
Version: 0.9.7l-1
Provides: openssl
Conffiles:
 /etc/ssl/openssl.cnf 7df26c55291b33344dc15e3935dabaf3 obsolete
Description: Package created with checkinstall 1.6.2
Description-md5: 556b8d22567101c7733f37ce6557412e

		20.1.2

	20.2
```
