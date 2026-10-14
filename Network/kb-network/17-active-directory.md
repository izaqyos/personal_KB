---
type: reference
title: Active-Directory
description: Active Directory CLDAP/LDAP ping and determining the client site in Wireshark.
tags: [wireshark, authentication, networking, legacy, examples]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "Network/NetworkKB#16"
---

# Active-Directory

[↑ NetworkKB](/Network/kb-network/README.md)

## 16.1 CLDAP, LDAP Ping, AD Ping

```text
https://wiki.wireshark.org/MS-CLDAP
CLDAP is most commonly encountered on Microsoft Active Directory networks where clients use it to retrieve server information.

This particular operation is described in MS documentation as an "AD ping" but is perhaps more formally described as a RootDSE query for the Netlogon attribute. The Netlogon attribute value is not DER encoded. The operation is derived from an analogous SMB mailslot operation which is reflected in the encoding.

Windows 2000 Server requires UDP for the RootDSE Netlogon query (aka CLDAP "AD ping") whereas either TCP or UDP can be used with Windows 2003 Server.

The filter used by the RootDSE Netlogon query is (&(DnsDomain=example.com)(Host=XP123)(NtVer=\06\00\00\20)(DomainGuid=\01\02\03...) but the Host and DomainGuid are not required. It seems Wireshark may not display this filter correctly as the BER encoding does not reflect the nested & conditions displayed.

The DomainGuid is supplied in Little-Endian binary despite the fact that the BER encoding is otherwise Big-Endian.

The first 4 bits of the first byte of the NtVer value generates four different replies (\01\00\00\00, \02\00\00\00, \04\00\00\00, \08\00\00\00) but the author of this paragraph has only ever observed a value of \06\00\00\20. The mechanics behind these bits is not known but the structures seem to correspond to Netlogon mailslot operations.

Even though MS uses BER 1+4 byte length fields for non-primitive types, DER encoding works fine with both Windows 2000 Server and Windows 2003 Server.

Specifications

Microsoft now has specifications available in the [MS-ADTS] document (http://msdn.microsoft.com/en-us/library/cc223122%28PROT.10%29.aspx).
```

### 16.1.1 Determine Client Site in wireshark

```text
a. Filter cldap

b. Check searchResEntry (2) "ROOT" 
open attribute netlogon LOGON_SAM_LOGON_RESPONSE_EX
Check client site value 

		16.1.2


	16.2
```
