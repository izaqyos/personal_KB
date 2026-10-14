---
type: reference
title: wireshark
description: "Wireshark filters, including CLDAP ping on Active Directory networks."
tags: [wireshark, packet-capture, networking, legacy, examples]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: deprecated
capture_type: source
legacy_source: "Network/NetworkKB#15"
---

# wireshark

> **Deprecated (2026-10):** EOL Windows Server. Current: Applies to supported Windows Server only; check MS docs. Source: <https://python.org/doc/sunset-python-2/>

[↑ NetworkKB](/Network/kb-network/README.md)

## 15.1 filters

### 15.1.1 CLDAP Ping

#### 15.1.1.1 What is it?

```text
CLDAP is most commonly encountered on Microsoft Active Directory networks where clients use it to retrieve server information.

This particular operation is described in MS documentation as an "AD ping" but is perhaps more formally described as a RootDSE query for the Netlogon attribute. The Netlogon attribute value is not DER encoded. The operation is derived from an analogous SMB mailslot operation which is reflected in the encoding.

Windows 2000 Server requires UDP for the RootDSE Netlogon query (aka CLDAP "AD ping") whereas either TCP or UDP can be used with Windows 2003 Server.

The filter used by the RootDSE Netlogon query is (&(DnsDomain=example.com)(Host=XP123)(NtVer=\06\00\00\20)(DomainGuid=\01\02\03...) but the Host and DomainGuid are not required. It seems Wireshark may not display this filter correctly as the BER encoding does not reflect the nested & conditions displayed.

The DomainGuid is supplied in Little-Endian binary despite the fact that the BER encoding is otherwise Big-Endian.

The first 4 bits of the first byte of the NtVer value generates four different replies (\01\00\00\00, \02\00\00\00, \04\00\00\00, \08\00\00\00) but the author of this paragraph has only ever observed a value of \06\00\00\20. The mechanics behind these bits is not known but the structures seem to correspond to Netlogon mailslot operations.

Even though MS uses BER 1+4 byte length fields for non-primitive types, DER encoding works fine with both Windows 2000 Server and Windows 2003 Server.
```

#### 15.1.1.2 Filter

```text
cldap
```

#### 15.1.1.3 example

```text
1077	55.029530	10.120.137.9	10.186.20.36	CLDAP	113	searchRequest(2) "<ROOT>" baseObject 
Filter: (&(DnsDomain=vwg)(NtVer=0x80000006))
Attribute: Netlogon
			15.1.1.4


		15.1.2
```

## 15.2 wireshark mac

### 15.2.1 install

```text
https://stackoverflow.com/questions/26242156/install-wireshark-on-macos-x-via-brew

A1.
brew cask install wireshark
A2. 
The homebrew package wireshark installs the command line util tshark. If you want to enable the GUI, then install wireshark like this:

brew install wireshark --with-qt
If you already have Wireshark installed, do

brew reinstall wireshark --with-qt

	    15.2.2

	15.3
```
