---
type: reference
title: RADIUS
description: RADIUS FAQ on Calling-Station-Id values plus the Wikipedia overview of the protocol.
tags: [radius, aaa, eap, networking, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "Network/NetworkKB#8"
---

# RADIUS

[↑ NetworkKB](/Network/kb-network/README.md)

## 8.1 FAQ

### 8.1.1 Value of Calling-station-id ?

```text
- dial-up it is the caller-id  10:54 AM 
- 802.1x, EAP ->  MAC
  10:54 AM 
- tunnelling/CLI from NAS  - can be IP address.  
		8.1.2
```

## 8.2 RADIUS From Wikipedia, the free encyclopedia

```text
For other uses, see Radius (disambiguation).
Internet protocols
Application layer

    DHCP
    DHCPv6
    DNS
    FTP
    HTTP
    IMAP
    IRC
    LDAP
    MGCP
    NNTP
    NTP
    POP
    RPC
    RTP
    RTSP
    RIP
    SIP
    SMTP
    SNMP
    SOCKS
    SSH
    Telnet
    TLS/SSL
    XMPP
    (more)

Transport layer

    TCP
    UDP
    DCCP
    SCTP
    RSVP
    (more)

Internet layer

    IP
        IPv4
        IPv6
    ICMP
    ICMPv6
    OSPF
    BGP
    ECN
    IGMP
    IPsec
    (more)

Link layer

    ARP/InARP
    NDP
    Tunnels
        L2TP
    PPP
    Media access control
        Ethernet
        DSL
        ISDN
        FDDI
    (more)

    v
    t
    e

Remote Authentication Dial In User Service (RADIUS) is a networking protocol that provides centralized Authentication, Authorization, and Accounting (AAA) management for computers to connect and use a network service. RADIUS was developed by Livingston Enterprises, Inc., in 1991 as an access server authentication and accounting protocol and later brought into the Internet Engineering Task Force (IETF) standards.[1]

Because of the broad support and the ubiquitous nature of the RADIUS protocol, it is often used by ISPs and enterprises to manage access to the Internet or internal networks, wireless networks, and integrated e-mail services. These networks may incorporate modems, DSL, access points, VPNs, network ports, web servers, etc.[2]

RADIUS is a client/server protocol that runs in the application layer, using UDP as transport. The Remote Access Server, the Virtual Private Network server, the Network switch with port-based authentication, and the Network Access Server (NAS), are all gateways that control access to the network, and all have a RADIUS client component that communicates with the RADIUS server. The RADIUS server is usually a background process running on a UNIX or Microsoft Windows server.[3] RADIUS serves three functions:

    to authenticate users or devices before granting them access to a network,
    to authorize those users or devices for certain network services and
    to account for usage of those services.

Contents

|    1 AAA
|        1.1 Authentication and authorization
|        1.2 Accounting
|    2 Roaming
|        2.1 Realms
|        2.2 Proxy operations
|        2.3 Security
|    3 Packet structure
|        3.1 Attribute value pairs
|    4 Vendor-specific attributes
|    5 UDP port numbers
|    6 Security
|    7 RADIUS history
|    8 RFCs
|    9 See also
|    10 Bibliography
|    11 References
|    12 External links

AAA

RADIUS servers use the AAA concept to manage network access in the following two-step process, also known as an "AAA transaction". AAA stands for “authentication, authorization and accounting”. Authentication and Authorization characteristics in RADIUS are described in RFC 2865 while Accounting is described by RFC 2866.
Authentication and authorization

The user or machine sends a request to a Remote Access Server (RAS) to gain access to a particular network resource using access credentials. The credentials are passed to the RAS device via the link-layer protocol - for example, Point-to-Point Protocol (PPP) in the case of many dialup or DSL providers or posted in an HTTPS secure web form.

In turn, the RAS sends a RADIUS Access Request message to the RADIUS server, requesting authorization to grant access via the RADIUS protocol.[4]

This request includes access credentials, typically in the form of username and password or security certificate provided by the user. Additionally, the request may contain other information which the RAS knows about the user, such as its network address or phone number, and information regarding the user's physical point of attachment to the RAS.

The RADIUS server checks that the information is correct using authentication schemes such as PAP, CHAP or EAP. The user's proof of identification is verified, along with, optionally, other information related to the request, such as the user's network address or phone number, account status, and specific network service access privileges. Historically, RADIUS servers checked the user's information against a locally stored flat file database. Modern RADIUS servers can do this, or can refer to external sources — commonly SQL, Kerberos, LDAP, or Active Directory servers — to verify the user's credentials.
RADIUS Authentication and Authorization Flow

The RADIUS server then returns one of three responses to the RAS : 1) Access Reject, 2) Access Challenge, or 3) Access Accept.

    Access Reject - The user is unconditionally denied access to all requested network resources. Reasons may include failure to provide proof of identification or an unknown or inactive user account.
    Access Challenge - Requests additional information from the user such as a secondary password, PIN, token, or card. Access Challenge is also used in more complex authentication dialogs where a secure tunnel is established between the user machine and the Radius Server in a way that the access credentials are hidden from the RAS.
    Access Accept - The user is granted access. Once the user is authenticated, the RADIUS server will often check that the user is authorized to use the network service requested. A given user may be allowed to use a company's wireless network, but not its VPN service, for example. Again, this information may be stored locally on the RADIUS server, or may be looked up in an external source such as LDAP or Active Directory.

Each of these three RADIUS responses may include a Reply-Message attribute which may give a reason for the rejection, the prompt for the challenge, or a welcome message for the accept. The text in the attribute can be passed on to the user in a return web page.

Authorization attributes are conveyed to the RAS stipulating terms of access to be granted. For example, the following authorization attributes may be included in an Access-Accept:

    The specific IP address to be assigned to the user
    The address pool from which the user's IP should be chosen
    The maximum length that the user may remain connected
    An access list, priority queue or other restrictions on a user's access
    L2TP parameters
    VLAN parameters
    Quality of Service (QoS) parameters

Accounting
RADIUS Accounting Flow

Accounting is described in RFC 2866.

When network access is granted to the user by the NAS, an Accounting Start (a RADIUS Accounting Request packet containing an Acct-Status-Type attribute with the value "start") is sent by the NAS to the RADIUS server to signal the start of the user's network access. "Start" records typically contain the user's identification, network address, point of attachment and a unique session identifier.[5]

Periodically, Interim Update records (a RADIUS Accounting Request packet containing an Acct-Status-Type attribute with the value "interim-update") may be sent by the NAS to the RADIUS server, to update it on the status of an active session. "Interim" records typically convey the current session duration and information on current data usage.

Finally, when the user's network access is closed, the NAS issues a final Accounting Stop record (a RADIUS Accounting Request packet containing an Acct-Status-Type attribute with the value "stop") to the RADIUS server, providing information on the final usage in terms of time, packets transferred, data transferred, reason for disconnect and other information related to the user's network access.

Typically, the client sends Accounting-Request packets until it receives an Accounting-Response acknowledgement, using some retry interval.

The primary purpose of this data is that the user can be billed accordingly; the data is also commonly used for statistical purposes and for general network monitoring.
Roaming
Roaming using a proxy RADIUS AAA server.

RADIUS is commonly used to facilitate roaming between ISPs, for example:

    by companies which provide a single global set of credentials that are usable on many public networks;
    by independent, but collaborating, institutions issuing their own credentials to their own users, that allow a visitor from one to another to be authenticated by their home institution, such as in Eduroam.

RADIUS facilitates this by the use of realms, which identify where the RADIUS server should forward the AAA requests for processing.
Realms

A realm is commonly appended to a user's user name and delimited with an '@' sign, resembling an email address domain name. This is known as postfix notation for the realm. Another common usage is prefix notation, which involves prepending the realm to the username and using '\' as a delimiter. Modern RADIUS servers allow any character to be used as a realm delimiter, although in practice '@' and '\' are usually used.

Realms can also be compounded using both prefix and postfix notation, to allow for complicated roaming scenarios; for example, somedomain.com\username@anotherdomain.com could be a valid username with two realms.

Although realms often resemble domains, it is important to note that realms are in fact arbitrary text and need not contain real domain names.
Proxy operations

When a RADIUS server receives an AAA request for a user name containing a realm, the server will reference a table of configured realms. If the realm is known, the server will then proxy the request to the configured home server for that domain. The behaviour of the proxying server regarding the removal of the realm from the request ("stripping") is configuration-dependent on most servers. In addition, the proxying server can be configured to add, remove or rewrite AAA requests when they are proxied.
Security

Roaming with RADIUS exposes the users to various security and privacy concerns. More generally, some roaming partners establish a secure tunnel between the RADIUS servers to ensure that users' credentials cannot be intercepted while being proxied across the internet. This is a concern as the MD5 hash built into RADIUS is considered insecure.[6]
Packet structure
RADIUS packet data format.

The RADIUS packet data format is shown to the right. The fields are transmitted from left to right, starting with the code, the identifier, the length, the authenticator and the attributes.

RADIUS Codes (decimal) are assigned as follows:
Code 	Assignment
1 	Access-Request
2 	Access-Accept
3 	Access-Reject
4 	Accounting-Request
5 	Accounting-Response
11 	Access-Challenge
12 	Status-Server (experimental)
13 	Status-Client (experimental)
255 	Reserved

The Identifier field aids in matching requests and replies.

The Length field indicates the length of the entire RADIUS packet including the Code, Identifier, Length, Authenticator and optional Attribute fields.

The Authenticator is used to authenticate the reply from the RADIUS server, and is used in encrypting passwords; its length is 16 bytes.
Attribute value pairs
RADIUS AVP layout.

The RADIUS Attribute Value Pairs (AVP) carry data in both the request and the response for the authentication, authorization, and accounting transactions. The length of the radius packet is used to determine the end of the AVPs.
AVP Type 	Assignment
1 	User-Name
2 	User-Password
3 	CHAP-Password
4 	NAS-IP-Address
5 	NAS-Port
6 	Service-Type
7 	Framed-Protocol
8 	Framed-IP-Address
9 	Framed-IP-Netmask
10 	Framed-Routing
11 	Filter-Id
12 	Framed-MTU
13 	Framed-Compression
14 	Login-IP-Host
15 	Login-Service
16 	Login-TCP-Port
17 	(unassigned)
18 	Reply-Message
19 	Callback-Number
20 	Callback-Id
21 	(unassigned)
22 	Framed-Route
23 	Framed-IPX-Network
24 	State
25 	Class
26 	Vendor-Specific
27 	Session-Timeout
28 	Idle-Timeout
29 	Termination-Action
30 	Called-Station-Id
31 	Calling-Station-Id
32 	NAS-Identifier
33 	Proxy-State
34 	Login-LAT-Service
35 	Login-LAT-Node
36 	Login-LAT-Group
37 	Framed-AppleTalk-Link
38 	Framed-AppleTalk-Network
39 	Framed-AppleTalk-Zone
40 	Acct-Status-Type
41 	Acct-Delay-Time
42 	Acct-Input-Octets
43 	Acct-Output-Octets
44 	Acct-Session-Id
45 	Acct-Authentic
46 	Acct-Session-Time
47 	Acct-Input-Packets
48 	Acct-Output-Packets
49 	Acct-Terminate-Cause
50 	Acct-Multi-Session-Id
51 	Acct-Link-Count
52-59 	(reserved for accounting)
60 	CHAP-Challenge
61 	NAS-Port-Type
62 	Port-Limit
63 	Login-LAT-Port
Vendor-specific attributes

RADIUS is extensible; many vendors of RADIUS hardware and software implement their own variants using Vendor-Specific Attributes (VSAs). Microsoft has published some of their VSAs.[7] VSA definitions from many other companies remain proprietary and/or ad-hoc.
UDP port numbers

RADIUS has been officially assigned UDP ports 1812 for RADIUS Authentication and 1813 for RADIUS Accounting by the Internet Assigned Numbers Authority (IANA). However, prior to IANA allocation of ports 1812 and 1813, ports 1645 and 1646 (authentication and accounting, respectively) were used unofficially and became the default ports assigned by many RADIUS Client/Server implementations of the time. The tradition of using 1645 and 1646 for backwards compatibility continues to this day. For this reason many RADIUS Server implementations monitor both sets of UDP ports for RADIUS requests. Microsoft RADIUS servers default to 1812 and 1813. Cisco RADIUS servers listen on RADIUS ports UDP 1645 and UDP 1812 for authentication; on ports 1646 and 1813 for accounting and can be configured with non-standard ports. Juniper Networks' RADIUS servers listen on both unofficial and official ports 1645, 1812, 1646 and 1813 by default but can be configured with arbitrary ports.SBR. Cloudessa and Avaya virtual RADIUS solutions assign a pair of unique authentication and accounting ports to each virtual RADIUS server.
Security

The RADIUS protocol does not transmit passwords in cleartext between the NAS and RADIUS server (not even with PAP protocol). Rather, a shared secret is used along with the MD5 hashing algorithm to obfuscate passwords. Because this particular implementation is not considered to be a very strong protection of the user's credentials,[8] additional protection, such as IPsec tunnels or physically secured data-center networks, should be used to further protect the RADIUS traffic between the NAS device and the RADIUS server. Additionally, the user's security credentials are the only part protected by RADIUS itself, yet other user-specific attributes such as tunnel-group IDs or vlan memberships passed over RADIUS may be considered sensitive (helpful to an attacker) or private (sufficient to identify the individual client) information as well.[citation needed] The RadSec protocol claims to solve aforementioned security issues.
RADIUS history

RADIUS was originally specified in an RFI by Merit Network in 1991 to control dial-in access to NSFnet. Livingston Enterprises responded to the RFI with a description of a RADIUS server. Merit Network awarded the contract to Livingston Enterprises that delivered their PortMaster series of Network Access Servers and the initial RADIUS server to Merit. RADIUS was later (1997) published as RFC 2058 and RFC 2059 (current versions are RFC 2865 and RFC 2866).[1]

Now, several commercial and open-source RADIUS servers exist. Features can vary, but most can look up the users in text files, LDAP servers, various databases, etc. Accounting records can be written to text files, various databases, forwarded to external servers, etc. SNMP is often used for remote monitoring and keep-alive checking of a RADIUS server. RADIUS proxy servers are used for centralized administration and can rewrite RADIUS packets on the fly (for security reasons, or to convert between vendor dialects).

The Diameter protocol is the planned replacement for RADIUS. Diameter uses SCTP or TCP while RADIUS uses UDP as the transport layer.
RFCs

The RADIUS protocol is currently defined in the following IETF RFCs: Obsolete RFCs are indicated with strikethrough text.
# 	Title 	Date published 	Related article 	Obsoleted by 	Notes
RFC 2058 	Remote Authentication Dial In User Service (RADIUS) 	January 1997 	RADIUS 	RFC 2138 	
RFC 2059 	RADIUS Accounting 	January 1997 	RADIUS 	RFC 2139 	
RFC 2138 	Remote Authentication Dial In User Service (RADIUS) 	April 1997 	RADIUS 	RFC 2865 	
RFC 2139 	RADIUS Accounting 	April 1997 	RADIUS 	RFC 2866 	
RFC 2548 	Microsoft Vendor-specific RADIUS Attributes 	March 1999 	RADIUS 		
RFC 2607 	Proxy Chaining and Policy Implementation in Roaming 	June 1999 			
RFC 2618 	RADIUS Authentication Client MIB 		Management information base 	RFC 4668 	
RFC 2619 	RADIUS Authentication Server MIB 		Management information base 	RFC 4669 	
RFC 2620 	RADIUS Accounting Client MIB 	June 1999 	Management information base 	RFC 4670 	
RFC 2621 	RADIUS Accounting Server MIB 	June 1999 	Management information base 	RFC 4671 	
RFC 2809 	Implementation of L2TP Compulsory Tunneling via RADIUS 	April 2000 			
RFC 2865 	Remote Authentication Dial In User Service (RADIUS) 	June 2000 	RADIUS 		Updated by: RFC 2868, RFC 3575, RFC 5080
RFC 2866 	RADIUS Accounting 	June 2000 	RADIUS 		
RFC 2867 	RADIUS Accounting Modifications for Tunnel Protocol Support 	June 2000 	RADIUS 		Updates RFC 2866
RFC 2868 	RADIUS Attributes for Tunnel Protocol Support 	June 2000 			Updates RFC 2865
RFC 2869 	RADIUS Extensions 	June 2000 			updated by RFC 3579, RFC 5080
RFC 2882 	Network Access Servers Requirements: Extended RADIUS Practices 	July 2000 			
RFC 3162 	RADIUS and IPv6 	August 2001 			
RFC 3575 	IANA Considerations for RADIUS 	July 2003 			
RFC 3576 	Dynamic Authorization Extensions to RADIUS 	July 2003 		RFC 5176 	
RFC 3579 	RADIUS Support for EAP 	September 2003 	Extensible Authentication Protocol 		Updates: RFC 2869
RFC 3580 	IEEE 802.1X RADIUS Usage Guidelines 	September 2003 	802.1X 		
RFC 4014 	RADIUS Attributes Suboption for the DHCP Relay Agent Information Option 	February 2005 			
RFC 4372 	Chargeable User Identity 	January 2006 			
RFC 4590 	RADIUS Extension for Digest Authentication 	July 2006 		RFC 5090 	
RFC 4668 	RADIUS Authentication Client MIB for IPv6 	August 2006 	Management information base 		
RFC 4669 	RADIUS Authentication Server MIB for IPv6 	August 2006 	Management information base 		
RFC 4670 	RADIUS Accounting Client MIB for IPv6 	August 2006 	Management information base 		
RFC 4671 	RADIUS Accounting Server MIB for IPv6 	August 2006 	Management information base 		
RFC 4675 	RADIUS Attributes for Virtual LAN and Priority Support 	September 2006 			
RFC 4679 	DSL Forum Vendor-Specific RADIUS Attributes 	September 2006 			
RFC 4818 	RADIUS Delegated-IPv6-Prefix Attribute 	April 2007 			
RFC 4849 	RADIUS Filter Rule Attribute 	April 2007 			
RFC 5080 	Common RADIUS Implementation Issues and Suggested Fixes 	December 2007 			Updates RFC 3579
RFC 5090 	RADIUS Extension for Digest Authentication 	February 2008 			
RFC 5176 	Dynamic Authorization Extensions to RADIUS 	January 2008 			
RFC 5607 	RADIUS Authorization for NAS Management 	July 2009 			
RFC 5997 	Use of Status-Server Packets in the RADIUS Protocol 	August 2010 			Updates RFC 2866
```

## 8.3 Securing RADIUS

### 8.3.1 RADIUS/DTLS

#### 8.3.1.1 http://tools.ietf.org/html/draft-dekok-radext-dtls-03

```text
[Docs] [txt|pdf] [Tracker] [Email] [Diff1] [Diff2] [Nits]

Versions: 00 01 02 03

Network Working Group                                         Alan DeKok
INTERNET-DRAFT                                                FreeRADIUS
Category: Informational
<draft-dekok-radext-dtls-03.txt>
Expires: February 25, 2010
26 July 2010



                  
DTLS as a Transport Layer for RADIUS

                       
draft-dekok-radext-dtls-03



Abstract

   The RADIUS protocol [RFC2865] has limited support for authentication
   and encryption of RADIUS packets.  The protocol transports data "in
   the clear", although some parts of the packets can have "hidden"
   content.  Packets may be replayed verbatim by an attacker, and
   client-server authentication is based on fixed shared secrets.  This
   document specifies how the Datagram Transport Layer Security (DTLS)
   protocol may be used as a fix for these problems.  It also describes
   how implementations of this proposal can co-exist with current RADIUS
   systems.

Status of this Memo

   This Internet-Draft is submitted to IETF in full conformance with the
   provisions of BCP 78 and BCP 79.

   Internet-Drafts are working documents of the Internet Engineering
   Task Force (IETF), its areas, and its working groups.  Note that
   other groups may also distribute working documents as Internet-
   Drafts.

   Internet-Drafts are draft documents valid for a maximum of six months
   and may be updated, replaced, or obsoleted by other documents at any
   time.  It is inappropriate to use Internet-Drafts as reference
   material or to cite them other than as "work in progress."

   The list of current Internet-Drafts can be accessed at
   http://www.ietf.org/ietf/1id-abstracts.txt.

   The list of Internet-Draft Shadow Directories can be accessed at
   http://www.ietf.org/shadow.html.

   This Internet-Draft will expire on February 25, 2010

Copyright Notice



DeKok, Alan                   Informational                     [Page 1]

 
INTERNET-DRAFT    DTLS as a Transport Layer for RADIUS      26 July 2010


   Copyright (c) 2010 IETF Trust and the persons identified as the
   document authors.  All rights reserved.

   This document is subject to BCP 78 and the IETF Trust's Legal
   Provisions Relating to IETF Documents
   (http://trustee.ietf.org/license-info/) in effect on the date of
   publication of this document.  Please review these documents
   carefully, as they describe your rights and restrictions with respect
   to this document.  Code Components extracted from this document must
   include Simplified BSD License text as described in Section 4.e of
   the Trust Legal Provisions and are provided without warranty as
   described in the Simplified BSD License.

   This document may contain material from IETF Documents or IETF
   Contributions published or made publicly available before November
   10, 2008.  The person(s) controlling the copyright in some of this
   material may not have granted the IETF Trust the right to allow
   modifications of such material outside the IETF Standards Process.
   Without obtaining an adequate license from the person(s) controlling
   the copyright in such materials, this document may not be modified
   outside the IETF Standards Process, and derivative works of it may
   not be created outside the IETF Standards Process, except to format
   it for publication as an RFC or to translate it into languages other
   than English.



























DeKok, Alan                   Informational                     [Page 2]

 
INTERNET-DRAFT    DTLS as a Transport Layer for RADIUS      26 July 2010


Table of Contents

|| 1.  Introduction .............................................    4
|   1.1.  Terminology .........................................    4
|   1.2.  Requirements Language ...............................    5
|| 2.  Building on Existing Foundations .........................    6
|   2.1.  Changes to RADIUS ...................................    6
|   2.2.  Changes from RADIUS over TLS (RADIUS/TLS) ...........    6
|      2.2.1.  Changes from RADIUS/TLS to RADIUS/DTLS .........    7
|      2.2.2.  Reinforcement of RADIUS/TLS ....................    8
|| 3.  Reception of Packets .....................................    8
|   3.1.  Protocol Disambiguation .............................    9
|| 4.  Connection Management ....................................   10
|   4.1.  Server Connection Management ........................   10
|      4.1.1.  Table Management ...............................   10
|   4.2.  Client Connection Management ........................   11
|| 5.  Processing Algorithm .....................................   12
|| 6.  Diameter Considerations ..................................   14
|| 7.  IANA Considerations ......................................   14
|| 8.  Security Considerations ..................................   14
|   8.1.  Legacy RADIUS Security ..............................   14
|| 9.  References ...............................................   15
|   9.1.  Normative references ................................   15
|   9.2.  Informative references ..............................   16



























DeKok, Alan                   Informational                     [Page 3]

 
INTERNET-DRAFT    DTLS as a Transport Layer for RADIUS      26 July 2010


| 1. Introduction


   The RADIUS protocol as described in [RFC2865], [RFC2866], and
   [RFC5176] has traditionally used methods based on MD5 [RFC1321] for
   per-packet authentication and integrity checks.  However, the MD5
   algorithm has known weaknesses such as [MD5Attack] and [MD5Break].
   As a result, previous specifications such as [RFC5176] have
   recommended using IPSec to secure RADIUS traffic.

   While RADIUS over IPSec has been widely deployed, there are
   difficulties with this approach.  The simplest point against IPSec is
   that there is no straightforward way for a RADIUS application to
   control or monitor the network security policies.  That is, the
   requirement that the RADIUS traffic be encrypted and/or authenticated
   is implicit in the network configuration, and is not enforced by the
   RADIUS application.

   This specification takes a different approach.  We define a method
   for using DTLS [RFC4347] as a RADIUS transport protocol.  This
   approach has the benefit that the RADIUS application can directly
   monitor and control the security policies associated with the traffic
   that it processes.

   Another benefit is that RADIUS over DTLS continues to be a UDP-based
   protocol.  This continuity ensures that existing network-layer
   infrastructure (firewall rules, etc.) does not need to be changed
   when RADIUS clients and servers are upgraded to support RADIUS over
   DTLS.

   This specification does not, however, solve all of the problems
   associated with RADIUS.  The DTLS protocol does not add reliable or
   in-order transport to RADIUS.  DTLS also does not support
   fragmentation of application-layer messages, or of the DTLS messages
   themselves.  This specification therefore continues to have all of
   the issues that RADIUS currently has with order, reliability, and
   fragmentation.

| 1.1. Terminology


   This document uses the following terms:

RADIUS/DTLS
     This term is a short-hand for "RADIUS over DTLS".

RADIUS/DTLS client
     This term refers both to RADIUS clients as defined in [RFC2865],
     and to Dynamic Authorization clients as defined in [RFC5176], that
     implement RADIUS/DTLS.



DeKok, Alan                   Informational                     [Page 4]

 
INTERNET-DRAFT    DTLS as a Transport Layer for RADIUS      26 July 2010


RADIUS/DTLS server
     This term refers both to RADIUS servers as defined in [RFC2865],
     and to Dynamic Authorization servers as defined in [RFC5176], that
     implement RADIUS/DTLS.

silently discard
     This means that the implementation discards the packet without
     further processing.  The implementation MAY provide the capability
     of logging the error, including the contents of the silently
     discarded packet, and SHOULD record the event in a statistics
     counter.

| 1.2. Requirements Language


   In this document, several words are used to signify the requirements
   of the specification.  The key words "MUST", "MUST NOT", "REQUIRED",
   "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED",  "MAY",
   and "OPTIONAL" in this document are to be interpreted as described in
   [RFC2119].
































DeKok, Alan                   Informational                     [Page 5]

 
INTERNET-DRAFT    DTLS as a Transport Layer for RADIUS      26 July 2010


| 2. Building on Existing Foundations


   Adding DTLS as a RADIUS transport protocol requires a number of
   changes to systems implementing standard RADIUS. This section
   outlines those changes, and defines new behaviors necessary to
   implement DTLS.

| 2.1. Changes to RADIUS


   The RADIUS packet format is unchanged from [RFC2865], [RFC2866], and
   [RFC5176].  Specifically, all of the following portions of RADIUS
   MUST be unchanged when using RADIUS over DTLS:

      * Packet format
      * Permitted codes
      * Request Authenticator calculation
      * Response Authenticator calculation
      * Minimum packet length
      * Maximum packet length
      * Attribute format
      * Vendor-Specific Attribute (VSA) format
      * Permitted data types
      * Calculations of dynamic attributes such as CHAP-Challenge,
        or Message-Authenticator.
      * Calculation of "encrypted" attributes such as Tunnel-Password.
      * UDP port numbering and usage

   The RADIUS packets are encapsulated in DTLS, which acts as a
   transport layer for it. The requirements above ensure the simplest
   possible implementation and widest interoperability of this
   specification.

   The only changes made to RADIUS in this specification are the
   following two items:

      (1) The Length checks defined in [RFC2865] Section 3 MUST use the
      length of the decrypted DTLS data instead of the UDP packet
      length.

      (2) The shared secret secret used to compute the MD5 integrity
      checks and the attribute encryption MUST be "radsec".

   All other portions of RADIUS are unchanged.

| 2.2. Changes from RADIUS over TLS (RADIUS/TLS)


   While this specification is largely RADIUS/TLS over UDP instead of
   TCP, there are some differences between the two methods.



DeKok, Alan                   Informational                     [Page 6]

 
INTERNET-DRAFT    DTLS as a Transport Layer for RADIUS      26 July 2010


   This section goes through the [RADIUS/TLS] document in detail,
   explaining the differences between RADIUS/TLS and RADIUS/DTLS.  As
   most of [RADIUS/TLS] also applies to RADIUS/DTLS, we highlight only
   the changes here, explaining how to interpret [RADIUS/TLS] for this
   specification:

      * We replace references to "TCP" with "UDP"

      * We replace references to "RADIUS/TLS" with "RADIUS/DTLS"

      * We replace references to "TLS" with "DTLS"

   Those changes are sufficient to cover the majority of the differences
   between the two specifications.  The text below goes through some of
   the sections of [RADIUS/TLS], giving additional commentary only where
   necessary.

| 2.2.1. Changes from RADIUS/TLS to RADIUS/DTLS


   Section 2.1 does not apply to RADIUS/DTLS.  The relationship between
   RADIUS packet codes and UDP ports in RADIUS/DTLS is unchanged from
   RADIUS.

   Section 2.2 applies also to RADIUS/DTLS, except for the
   recommendation that implementations "SHOULD" support
   TLS_RSA_WITH_RC4_128_SHA, which does not apply to RADIUS/DTLS.

   Section 2.3 applies also to RADIUS/TLS.

   Section 2.4 does not apply to RADIUS/DTLS.  See the comments above on
   Section 2.1.  The relationship between RADIUS packet codes and UDP
   ports in RADIUS/DTLS is unchanged from RADIUS.

   Section 3.3 item (1) does not apply to RADIUS/DTLS.  Each RADIUS
   packet is encapsulated in one DTLS packet, and there is no "stream"
   of RADIUS packets inside of a TLS session.  Implementors MUST enforce
   the requirements of [RFC2865] Section 3 for the RADIUS Length field,
   using the length of the decrypted DTLS data for the checks.  This
   check replaces the RADIUS method of using the length field from the
   UDP packet.

   Section 3.3 item (3) does not apply to RTDLS.  The relationship
   between RADIUS packet codes and UDP ports in RADIUS/DTLS is unchanged
   from RADIUS.

   Section 3.3 item (4) does not apply to RADIUS/DTLS.  As RADIUS/DTLS
   still uses UDP for a transport, the use of negative ICMP responses is
   unchanged from RADIUS.



DeKok, Alan                   Informational                     [Page 7]

 
INTERNET-DRAFT    DTLS as a Transport Layer for RADIUS      26 July 2010


| 2.2.2. Reinforcement of RADIUS/TLS


   We wish to re-iterate that much of [RADIUS/TLS] applies to this
   document.  Specifically, Section 4 and Section 6 of that document are
   applicable in whole to RADIUS/DTLS.

| 3. Reception of Packets


   As this specification permits implementations to to accept both
   traditional RADIUS and DTLS packets on the same port, we define a
   method to disambiguate between packets for the two protocols.  This
   method is applicable only to RADIUS servers.  RADIUS/DTLS clients
   SHOULD use connected sockets, as discussed in Section X.Y, below.

   RADIUS/DTLS servers MUST maintain a boolean flag for each RADIUS
   client that indicates whether or not it supports RADIUS/DTLS.  The
   interpretation of this flag is as follows. If the flag is "false",
   then the client may support RADIUS/DTLS.  Packets from the client
   need to be examined to see if they are RADIUS or RADIUS/DTLS.  If the
   flag is "true" then the client supports RADIUS/DTLS, and all packets
   from that client MUST be processed as RADIUS/DTLS.

   Note that this last requirement can impose significant changes for
   RADIUS clients.  Clients can no longer have multiple independent
   RADIUS implementations or processes that originate packets.  We
   RECOMMEND that RADIUS/DTLS clients implement a local RADIUS proxy
   that arbitrates all RADIUS traffic.

   This flag MUST be exposed to administrators of the RADIUS server.  As
   RADIUS clients are upgraded, administrators can then manually mark
   them as supporting RADIUS/DTLS.

   We recognize, however, the upgrade path from RADIUS to RADIUS/DTLS is
   important.  This path requires an RADIUS/DTLS server to accept
   packets from a RADIUS client without knowing beforehand if they are
   RADIUS or DTLS.  The method to distinguish between the two is defined
   in the next section.

   Once an RADIUS/DTLS server has established a DTLS session with a
   client that had the flag set to "false", it MUST set the flag to
   "true".  This change forces all subsequent traffic from that client
   to use DTLS, and prevents bidding-down attacks.  The server SHOULD
   also notify the administrator that it has successfully established
   the first DTLS session with that client.







DeKok, Alan                   Informational                     [Page 8]

 
INTERNET-DRAFT    DTLS as a Transport Layer for RADIUS      26 July 2010


| 3.1. Protocol Disambiguation


   When a RADIUS client is not marked as supporting RADIUS/DTLS, packets
   from that client may be, or may not be DTLS.  In order to provide a
   robust upgrade path, the RADIUS/DTLS server MUST examine the packet
   to see if it is RADIUS or DTLS.  In order to justify the examination
   methods, we first examine the packet formats for the two protocols.

   The DTLS record format ([RFC4347] Section 4.1) is shown below, in
   pseudo-code:

         struct {
                 uint8 type;
                 uint16 version;
                 uint16 epoch;
                 uint48 sequence_number;
                 uint16 length;
                 uint8 fragment[DTLSPlaintext.length];
         } DTLSPlaintext;

   The RADIUS record format ([RFC2865] Section 3) is shown below, in
   pseudo-code, with AuthVector.length=16.

         struct {
                 uint8 code;
                 uint8 id;
                 uint16 length;
                 uint8 vector[AuthVector.length];
                 uint8 data[RadiusPacket.length - 20];
         } RadiusPacket;

   We can see here that a number of fields overlap between the two
   protocols.  The low byte of the DTLS version and the high byte of the
   DTLS epoch overlap with the RADIUS length field.  The DTLS length
   field overlaps with the RADIUS authentication vector.  At first
   glance, it may be difficult for an application to accept both
   protocols on the same port.  However, this is not the case.

   For the initial packet of a DTLS connection, the type field has value
   22 (handshake), and the epoch and sequence number fields are
   initialized to zero.  The RADIUS code value of 22 has been assigned
   as Resource-Free-Response, but it is not in wide use.  In addition,
   that packet code is a response packet, and would not be sent by a
   RADIUS client to a server.

   As a result, protocol disambiguation is straightforward.  If the
   first byte of the packet has value 22, it is a DTLS packet, and is a
   DTLS connection initiation request.  Otherwise, it is a RADIUS



DeKok, Alan                   Informational                     [Page 9]

 
INTERNET-DRAFT    DTLS as a Transport Layer for RADIUS      26 July 2010


   packet.

   Once a DTLS session has been established, a separate tracking table
   is used to disambiguate the protocols.  The definition of this
   tracking table is given in the next section.

   The full processing algorithm is given below, in Section X.Y.

| 4. Connection Management


   Where [RADIUS/TLS] can rely on the TCP state machine to perform
   connection tracking, this specification cannot.  As a result,
   implementations of this specification will need to perform connection
   management of the DTLS session in the application layer.

| 4.1. Server Connection Management


   An RADIUS/DTLS server MUST maintain a table that tracks ongoing DTLS
   sessions based on a key composed of the following 4-tuple:

      * source IP address
      * source port
      * destination IP address
      * destination port

   The contents of the tracking table are a implementation-specific
   value that describes an active DTLS session.  This connection
   tracking allows DTLS packets that have been received to be associated
   with an active DTLS session.

   RADIUS/DTLS servers SHOULD NOT use a "connect" API to manage DTLS
   connections, as a connected UDP socket will accept packets only from
   one source IP address and port.  This limitation would prevent the
   server from engaging in the normal RADIUS practice of accepting
   packets from multiple clients on the same port.

   Note that [RFC5080] Section 2.2.2 defines a duplicate detection cache
   which tracks packets by key similar to that defined above.

| 4.1.1. Table Management


   This tracking table is subject to Denial of Service (DoS) attacks.
   RADIUS/DTLS servers SHOULD use the stateless cookie tracking
   technique described in [RFC4347] Section 4.2.1.  DTLS sessions SHOULD
   NOT be added to the tracking table until a ClientHello packet has
   been received with an appropriate Cookie value.

   Entries in the tracking table MUST deleted when a TLS Closure Alert



DeKok, Alan                   Informational                    [Page 10]

 
INTERNET-DRAFT    DTLS as a Transport Layer for RADIUS      26 July 2010


   ([RFC5246] Section 7.2.1) or a TLS Error Alert ([RFC5246] Section
   7.2.2) is received.  Where the RADIUS specifications require that a
   RADIUS packet received via the DTLS session is to be "silently
   discarded", the entry in the tracking table corresponding to that
   DTLS session MUST also be deleted, the DTLS session MUST be closed,
   and any TLS session resumption parameters for that session MUST be
   discarded.

   As UDP does not offer guaranteed delivery of messages, RADIUS/DTLS
   servers MUST also maintain a timestamp per DTLS session.  The
   timestamp SHOULD be updated on reception of a valid DTLS packet.  The
   timestamp MUST NOT be updated in other situations.  When a session
   has not been used for a period of time, the server SHOULD pro-
   actively close it, and delete the DTLS session from the tracking
   table.  The server MAY cache the TLS session parameters, in order to
   provide for fast session resumption.

   This session lifetime SHOULD be exposed as configurable setting.  It
   SHOULD NOT be set to less than 60 seconds, and SHOULD NOT be set to
   more than 600 seconds (10 minutes).  The minimum value useful value
   for this timer is determined by the application-layer watchdog
   mechanism defined in the following section.

   RADIUS/DTLS servers SHOULD also keep track of the total number of
   sessions in the tracking table, and refuse to create new sessions
   when a large number are already being tracked.  As system
   capabilities vary widely, we can only recommend that this number
   SHOULD be exposed as a configurable setting.

| 4.2. Client Connection Management


   RADIUS/DTLS clients SHOULD use an operating system API to "connect" a
   UDP socket.  This "connected" socket will then rely on the operating
   system to perform connection tracking, and will be simpler than the
   method described above for servers.  RADIUS/DTLS clients SHOULD NOT
   use "unconnected" sockets, as it causes increased complexity in the
   client application.

   Once a DTLS session is established, an RADIUS/DTLS client SHOULD use
   the application-layer watchdog algorithm defined in [RFC3539] to
   determine server responsiveness.  The Status-Server packet defined in
   [STATUS] MUST be used as the "watchdog packet" in the watchdog
   algorithm.

   RADIUS/DTLS clients SHOULD pro-actively close sessions when they have
   been idle for a period of time.  We RECOMMEND that a session be
   closed when no traffic over than watchdog packets and (possibly)
   responses have been sent for three watchdog timeouts.  This behavior



DeKok, Alan                   Informational                    [Page 11]

 
INTERNET-DRAFT    DTLS as a Transport Layer for RADIUS      26 July 2010


   ensures that clients do not waste resources on the server by causing
   it to track idle sessions.

   RADIUS/DTLS clients SHOULD NOT send both normal RADIUS and
   RADIUS/DTLS packets from the same source socket.  This practice
   causes increased complexity in the client application, and increases
   the potential for security breaches due to implementation issues.

   RADIUS/DTLS clients MUST NOT send both normal RADIUS and RADIUS/DTLS
   packets over the same key as defined in Section 4.1, abovre (source
   IP, source port, destination IP, destination port).  Doing so would
   require that servers perform RADIUS and RADIUS/DTLS determination for
   every packet that has been received.

   RADIUS/DTLS clients SHOULD use TLS session resumption, where
   possible.  This practice lowers the time and effort required to start
   a DTLS session with a server, and increases network responsiveness.

| 5. Processing Algorithm


   The following algorithm MUST be used by an implementation of this
   protocol.  This algorithm is used to route packets to the appropriate
   destination.  We assume the following variables:

      D - implementation-specific handle to an existing DTLS session

      P - UDP packet received from the network.  This packet MUST
          also contain information about source IP/port, and
          destination IP/port.

      R - a RADIUS packet

      T - a tracking table used to manage ongoing DTLS sessions

   We also presume the following functions or functionality exists:

      receive_packet_from_network() - a function that reads a packet
      from the network, and returns P as above.  We presume also that
      this function performs the normal RADIUS client validation, and
      does not return P if the packet is from an unknown client.

      lookup_dtls_session() - a function that takes a packet P, a table
      T, and uses P to look up the corresponding DTLS session in T.  It
      returns either a session D, or a "null" indicator that no
      corresponding session exists.

      client_supports_rdtls() - a function that takes a packet P, and
      returns a boolean value as to whether or not the client



DeKok, Alan                   Informational                    [Page 12]

 
INTERNET-DRAFT    DTLS as a Transport Layer for RADIUS      26 July 2010


      originating the packet was marked as supporting RADIUS/DTLS.

      process_dtls_packet() - a function that takes a DTLS packet P, and
      a DTLS session D.  It performs all necessary steps to use D to
      setup a DTLS session, and to decode P (where possible) into a
      RADIUS packet.  This function is also expected to perform checks
      for TLS errors.  On any fatal errors, it closes the session, and
      deletes D from the tracking table T.  If a RADIUS packet is
      decoded from P, it is returned by the function as R, otherwise a
      "null" indicator is returned.

      process_dtls_clienthello() - a function that takes a DTLS packet
      P, and initiates a DTLS session.  If P contains a valid DTLS
      Cookie, a DTLS session D is created, and stored in the tracking
      table T.  If P does not contain a DTLS Cookie, no session is
      created, and instead a HelloVerifyRequest containing a cookie is
      sent in response.  Packets containing invalid cookies are
      discarded.

      process_radius_packet() - a function that takes a RADIUS packet P,
      and processes it using the normal RADIUS methods.

   The algorithm is as follows:

         P = receive_packet_from_network()
         D = lookup_dtls_session(T, P)

         if (D || client_supports_rdtls(P)) {
            R = process_dtls_packet(D, P)
            if (R) {
               process_radius_packet(R)
            }

         } else if (first_octet_of_packet_is_22(P)) {
            process_dtls_clienthello(P)

         } else {
            process_radius_packet(P)
         }

   For simplicity, the timers necessary to perform expiry of "old"
   sessions are not included in the above algorithm.  This algorithm may
   also need to be modified if the RADIUS/DTLS server supports client
   validation by methods other than source IP address.







DeKok, Alan                   Informational                    [Page 13]

 
INTERNET-DRAFT    DTLS as a Transport Layer for RADIUS      26 July 2010


| 6. Diameter Considerations


   This specification is for a transport layer specific to RADIUS.  As a
   result, there are no Diameter considerations.

| 7. IANA Considerations


   This specification does not create any new registries, nor does it
   require assignment of any protocol parameters.

| 8. Security Considerations


   This entire specification is devoted to discussing security
   considerations related to RADIUS.  However, we discuss a few
   additional issues here.

   This specification relies on the existing DTLS, RADIUS, and
   RADIUS/TLS specifications.  As a result, all security considerations
   for DTLS apply to the DTLS portion of RADIUS/DTLS.  Similarly, the
   TLS and RADIUS security issues discussed in [RADIUS/TLS] also apply
   to this specification.  All of the security considerations for RADIUS
   apply to the RADIUS portion of the specification.

   However, many security considerations raised in the RADIUS documents
   are related to RADIUS encryption and authorization.  Those issues are
   largely mitigated when DTLS is used as a transport method.  The
   issues that are not mitigated by this specification are related to
   the RADIUS packet format and handling, which is unchanged in this
   specification.

   The only new portion of the specification that could have security
   implications is a servers ability to accept both RADIUS and DTLS
   packets on the same port.  The filter that disambiguates the two
   protocols is simple, and is just a check for the value of one byte.
   We do not expect this check to have any security issues.

   We also note that nothing prevents malicious clients from sending
   DTLS packets to existing RADIUS implementations, or RADIUS packets to
   existing DTLS implementations.  There should therefore be no issue
   with clients sending RADIUS/DTLS packets to legacy servers that do
   not support the protocol.

| 8.1. Legacy RADIUS Security


   We reiterate here the poor security of the legacy RADIUS protocol.
   We RECOMMEND that all RADIUS clients and servers implement this
   specification as soon as possible.  New attacks on MD5 have appeared
   over the past few years, and there is a distinct possibility that MD5



DeKok, Alan                   Informational                    [Page 14]

 
INTERNET-DRAFT    DTLS as a Transport Layer for RADIUS      26 July 2010


   may be completely broken in the near future.

   The existence of fast and cheap attacks on MD5 could result in a loss
   of all network security that depends on RADIUS.  Attackers could
   obtain user passwords, and possibly gain complete network access.  It
   is difficult to overstate the disastrous consequences of a successful
   attack on RADIUS.

   We also caution implementors (especially client implementors) about
   using RADIUS/DTLS.  It may be tempting to use the shared secret as
   the basis for a TLS pre-shared key (PSK) method, and to leave the
   user interface otherwise unchanged.  This practice MUST NOT be used.
   The administrator MUST be given the option to use DTLS.  Any shared
   secret used for RADIUS MUST NOT be used for DTLS.  Re-using a shared
   secret between RADIUS and DTLS would negate all of the benefits found
   by using DTLS.

   When using PSK methods, RADIUS/DTLS clients MUST support keys (i.e.
   shared secrets) that are at least 32 characters in length.

   RADIUS/DTLS client implementors MUST expose a configuration that
   allows the administrator to choose the cipher suite.  RADIUS/DTLS
   client implementors SHOULD expose a configuration that allows an
   administrator to configure all certificates necessary for
   certificate-based authentication.  These certificates include client,
   server, and root certificates.

   When using PSK methods, RADIUS/DTLS servers MUST support keys (i.e.
   shared secrets) that are at least 32 characters in length.
   RADIUS/DTLS server administrators MUST use strong shared secrets for
   those PSK methods.  We RECOMMEND using keys derived from a
   cryptographically secure pseudo-random number generator (CSPRNG).
   For example, a reasonable key may be 32 characters of a SHA-256 hash
   of at least 64 bytes of data taken from a CSPRNG.  If this method
   seems too complicated, a certificate-based TLS method SHOULD be used
   instead.

   The previous RADIUS practice of using shared secrets that are minor
   variations of words is NOT RECOMMENDED, as it would negate nearly all
   of the security of DTLS.

| 9. References


| 9.1. Normative references


[RFC2865]
     Rigney, C., Willens, S., Rubens, A. and W. Simpson, "Remote
     Authentication Dial In User Service (RADIUS)", RFC 2865, June 2000.



DeKok, Alan                   Informational                    [Page 15]

 
INTERNET-DRAFT    DTLS as a Transport Layer for RADIUS      26 July 2010


[RFC3539]
     Aboba, B. et al., "Authentication, Authorization and Accounting
     (AAA) Transport Profile", RFC 3539, June 2003.

[RFC4347]
     Rescorla E., and Modadugu, N., "Datagram Transport Layer Security",
     RFC 4347, April 2006.

[RFC5246]
     Dierks, T. and E. Rescorla, "The Transport Layer Security (TLS)
     Protocol Version 1.2", RFC 5246, August 2008.

[RADIUS/TLS]
     Winter. S, et. al., "TLS encryption for RADIUS over TCP", draft-
     ietf-radext-radsec-06.txt, March 2010 (work in progress)

[STATUS]
     DeKok, A., "Use of Status-Server Packets in the Remote
     Authentication Dial In User Service (RADIUS) Protocol", draft-ietf-
     radext-status-server-09.txt, May 2010 (work in progress).

| 9.2. Informative references


[RFC1321]
     Rivest, R. and S. Dusse, "The MD5 Message-Digest Algorithm", RFC
     1321, April 1992.

[RFC2119]
     Bradner, S., "Key words for use in RFCs to Indicate Requirement
     Levels", RFC 2119, March, 1997.

[RFC2866]
     Rigney, C., "RADIUS Accounting", RFC 2866, June 2000.

[RFC5080]
     Nelson, D. and DeKok, A, "Common Remote Authentication Dial In User
     Service (RADIUS) Implementation Issues and Suggested Fixes", RFC
     5080, December 2007.

[RFC5176]
     Chiba, M. et al., "Dynamic Authorization Extensions to Remote
     Authentication Dial In User Service (RADIUS)", RFC 5176, January
     2008.

[MD5Attack]
     Dobbertin, H., "The Status of MD5 After a Recent Attack",
     CryptoBytes Vol.2 No.2, Summer 1996.




DeKok, Alan                   Informational                    [Page 16]

 
INTERNET-DRAFT    DTLS as a Transport Layer for RADIUS      26 July 2010


[MD5Break]
     Wang, Xiaoyun and Yu, Hongbo, "How to Break MD5 and Other Hash
     Functions", EUROCRYPT. ISBN 3-540-25910-4, 2005.

Acknowledgments

   Parts of the text in Section 3 defining the Request and Response
   Authenticators were taken with minor edits from [RFC2865] Section 3.

   The author would like to thank Mike McCauley of Open Systems
   Consultants for making a Radiator server available for inter-
   operability testing.

Authors' Addresses

   Alan DeKok
   The FreeRADIUS Server Project
   http://freeradius.org

   Email: aland@freeradius.org































DeKok, Alan                   Informational                    [Page 17]


Html markup produced by rfcmarkup 1.101, available from http://tools.ietf.org/tools/rfcmarkup/ 

			8.3.1.2 RADIUS/TCP

				8.3.1.2.1 http://tools.ietf.org/html/draft-ietf-radext-tcp-transport-09

[Docs] [txt|pdf] [Tracker] [WG] [Email] [Diff1] [Diff2] [Nits]

Versions: (draft-dekok-radext-tcp-transport) 00 01 02 03 04 05 06 07 08 09 RFC 6613

Network Working Group                                           A. DeKok
INTERNET-DRAFT                                                FreeRADIUS
Category: Experimental
<draft-ietf-radext-tcp-transport-09.txt>
Expires: April 12, 2011
12 October 2010



                            
RADIUS Over TCP

                   
draft-ietf-radext-tcp-transport-09


Abstract

   The Remote Authentication Dial In User Server (RADIUS) Protocol has
   until now required the User Datagram Protocol (UDP) as the underlying
   transport layer.  This document defines RADIUS over the Transmission
   Control Protocol (RADIUS/TCP), in order to address handling issues
   related to RADIUS over Transport Layer Security (RADIUS/TLS).  It
   permits TCP to be used as a transport protocol for RADIUS only when a
   transport layer such as TLS or IPsec provides confidentialy and
   security.

   Status of this Memo

      This Internet-Draft is submitted to IETF in full conformance with
      the provisions of BCP 78 and BCP 79.

      Internet-Drafts are working documents of the Internet Engineering
      Task Force (IETF), its areas, and its working groups.  Note that
      other groups may also distribute working documents as Internet-
      Drafts.

      Internet-Drafts are draft documents valid for a maximum of six
      months and may be updated, replaced, or obsoleted by other
      documents at any time.  It is inappropriate to use Internet-Drafts
      as reference material or to cite them other than as "work in
      progress."

      The list of current Internet-Drafts can be accessed at
      http://www.ietf.org/ietf/1id-abstracts.txt.

      The list of Internet-Draft Shadow Directories can be accessed at
      http://www.ietf.org/shadow.html.

      This Internet-Draft will expire on April 12, 2011

   Copyright Notice




DeKok, Alan                   Experimental                      [Page 1]

 
INTERNET-DRAFT               RADIUS Over TCP             12 October 2010


      Copyright (c) 2010 IETF Trust and the persons identified as the
      document authors.  All rights reserved.

      This document is subject to BCP 78 and the IETF Trust's Legal
      Provisions Relating to IETF Documents
      (http://trustee.ietf.org/license-info/) in effect on the date of
      publication of this document.  Please review these documents
      carefully, as they describe your rights and restrictions with
      respect to this document.  Code Components extracted from this
      document must include Simplified BSD License text as described in
      Section 4.e of the Trust Legal Provisions and are provided without
      warranty as described in the Simplified BSD License.







































DeKok, Alan                   Experimental                      [Page 2]

 
INTERNET-DRAFT               RADIUS Over TCP             12 October 2010


   Table of Contents

|| 1.  Introduction .............................................    4
|   1.1.  Applicability of Reliable Transport .................    5
|   1.2.  Terminology .........................................    6
|   1.3.  Requirements Language ...............................    7
|| 2.  Changes to RADIUS ........................................    7
|   2.1.  Packet Format .......................................    8
|   2.2.  Assigned Ports for RADIUS/TCP .......................    8
|   2.3.  Management Information Base (MIB) ...................    9
|   2.4.  Detecting Live Servers ..............................    9
|   2.5.  Congestion Control Issues ...........................   10
|   2.6.  TCP Specific Issues .................................   10
|      2.6.1.  Duplicates and Retransmissions .................   11
|      2.6.2.  Head of Line Blocking ..........................   12
|      2.6.3.  Shared Secrets .................................   12
|      2.6.4.  Malformed Packets and Unknown Clients ..........   12
|      2.6.5.  Limitations of the ID Field ....................   13
|      2.6.6.  EAP Sessions ...................................   14
|      2.6.7.  TCP Applications are not UDP Applications ......   15
|| 3.  Diameter Considerations ..................................   15
|| 4.  IANA Considerations ......................................   15
|| 5.  Security Considerations ..................................   15
|| 6.  References ...............................................   16
|   6.1.  Normative References ................................   16
|   6.2.  Informative References ..............................   16

























DeKok, Alan                   Experimental                      [Page 3]

 
INTERNET-DRAFT               RADIUS Over TCP             12 October 2010


| 1. Introduction


   The RADIUS Protocol is defined in [RFC2865] as using the User
   Datagram Protocol (UDP) for the underlying transport layer.  While
   there are a number of benefits to using UDP as outlined in [RFC2865]
   Section 2.4, there are also some limitations:

      * Unreliable transport.  As a result, systems using RADIUS have to
      implement application-layer timers and re-transmissions, as
      described in [RFC5080] Section 2.2.1.

      * Packet fragmentation.  [RFC2865] Section 3 permits RADIUS
      packets up to 4096 octets in length.  These packets are larger
      than the common Internet MTU (576), resulting in fragmentation of
      the packets at the IP layer when they are proxied over the
      Internet.  Transport of fragmented UDP packets appears to be a
      poorly tested code path on network devices.  Some devices appear
      to be incapable of transporting fragmented UDP packets, making it
      difficult to deploy RADIUS in a network where those devices are
      deployed.

      * Connectionless transport.  Neither clients nor servers receive
      positive statements that a "connection" is down.  This information
      has to be deduced instead from the absence of a reply to a
      request.

      * Lack of congestion control.  Clients can send arbitrary amounts
      of traffic with little or no feedback.  This lack of feedback can
      result in congestive collapse of the network.

   RADIUS has been widely deployed for well over a decade, and continues
   to be widely deployed.  Experience shows that these issues have been
   minor in some use-cases, and problematic in others.  For use-cases
   such as inter-server proxying, an alternative transport and security
   model -- RADIUS/TLS, as defined in [RADIUS/TLS].  That document
   describes the transport implications of running RADIUS/TLS.

   The choice of TCP as a transport protocol is largely driven by the
   desire to improve the security of RADIUS by using RADIUS/TLS.  For
   practical reasons, the transport protocol (TCP) is defined separately
   from the security mechanism (TLS).

   Since "bare" TCP does not provide for confidentiality or enable
   negotiation of credible ciphersuites, its use is not appropriate for
   inter-server communications where strong security is required.  As a
   result "bare" TCP transport MUST NOT be used without TLS, IPsec, or
   other secure upper layer.




DeKok, Alan                   Experimental                      [Page 4]

 
INTERNET-DRAFT               RADIUS Over TCP             12 October 2010


   "Bare" TCP transport MAY, however, be used when another method such
   as IPSec [RFC4301] is used to provide additional confidentiality and
   security.  Should experience show that such deployments are useful,
   this specification could be moved to standards track.

| 1.1. Applicability of Reliable Transport


   The intent of this document is to address transport issues related to
   RADIUS/TLS [RADIUS/TLS] in inter-server communications scenarios,
   such as inter-domain communication between proxies.  These situations
   benefit from the confidentiality and ciphersuite negotiation that can
   be provided by TLS. Since TLS is already widely available within the
   operating systems used by proxies, implementation barriers are low.

   In scenarios where RADIUS proxies exchange a large volume of packets,
   it is likely that there will be sufficient traffic to enable the
   congestion window to be widened beyond the minimum value on a long-
   term basis, enabling ACK piggy-backing.  Through use of an
   application-layer watchdog as described in [RFC3539], it is possible
   to address the objections to reliable transport described in
   [RFC2865] Section 2.4 without substantial watchdog traffic, since
   regular traffic is expected in both directions.

   In addition, use of RADIUS/TLS has been found to improve operational
   performance when used with multi-round trip authentication mechanisms
   such as EAP over RADIUS  [RFC3579].  In such exchanges, it is typical
   for EAP fragmentation to increase the number of round-trips required.
   For example, where EAP-TLS authentication [RFC5216] is attempted and
   both the EAP peer and server utilize certificate chains of 8KB, as
   many as 15 round-trips can be required if RADIUS packets are
   restricted to the common Ethernet MTU (1500 octets) for EAP over LAN
   (EAPoL) use-cases.  Fragmentation of RADIUS/UDP packets is generally
   inadvisable due to lack of fragmentation support within intermediate
   devices such as filtering routers, firewalls and NATs.  However,
   since RADIUS/UDP implementations typically do not support MTU
   discovery, fragmentation can occur even when the maximum RADIUS/UDP
   packet size is restricted to 1500 octets.

   These problems disappear if a 4096 application-layer payload can be
   used alongside RADIUS/TLS.  Since most TCP implementations support
   MTU discovery, the TCP MSS is automatically adjusted to account for
   the MTU, and the larger congestion window supported by TCP may allow
   multiple TCP segments to be sent within a single window.  Even those
   few TCP stacks which do not perform path MTU discovery can already
   support arbitrary payloads.

   Where the MTU for EAP packets is large, RADIUS/EAP traffic required
   for an EAP-TLS authentication with 8KB certificate chains may be



DeKok, Alan                   Experimental                      [Page 5]

 
INTERNET-DRAFT               RADIUS Over TCP             12 October 2010


   reduced to 7 round-trips or less, resulting in substantially reduced
   authentication times.

   In addition, experience indicates that EAP sessions transported over
   RADIUS/TLS are less likely to abort unsuccessfully.  Historically,
   RADIUS over UDP implementations have exhibited poor retransmission
   behavior.  Some implementations retransmit packets, others do not,
   and others send new packets rather then performing retransmission.
   Some implementations are incapable of detecting EAP retransmissions,
   and will instead treat the retransmitted packet as an error.  As a
   result, within RADIUS/UDP implementations, retransmissions have a
   high likeilhood of causing an EAP authentication session to fail.
   For a system with a million logins a day running EAP-TLS mutual
   authentication with 15 round-trips, and having a packet loss
   probability of P=0.01%, we expect that 0.3% of connections will
   experience at least one lost packet.  That is, 3,000 user sessions
   each day will experience authentication failure.  This is an
   unacceptable failure rate for a mass-market network service.

   Using a reliable transport method such as TCP means that RADIUS
   implementations can remove all application-layer retransmissions, and
   instead rely on the Operating System (OS) kernel's well-tested TCP
   transport to ensure Path MTU discovery and reliable delivery.  Modern
   TCP implementations also implement anti-spoofing provisions, which is
   more difficult to do in a UDP application.

   In contrast, use of TCP as a transport between a NAS and a RADIUS
   server is usually a poor fit.  As noted in [RFC3539] Section 2.1, for
   systems originating low numbers of RADIUS request packets, inter-
   packet spacing is often larger than the packet RTT, meaning that, the
   congestion window will typically stay below the minimum value on a
   long-term basis. The result is an increase in packets due to ACKs as
   compared to UDP, without a corresponding set of benefits.  In
   addition, the lack of substantial traffic implies the need for
   additional watchdog traffic to confirm reachability.

   As a result, the objections to reliable transport indicated in
   [RFC2865] Section 2.4 continue to apply to NAS-RADIUS server
   communications and UDP SHOULD continue to be used as the transport
   protocol in this scenario.  In addition, it is recommended that
   implementations of "RADIUS Dynamic AUthorization Extensions"
   [RFC5176] SHOULD continue to utilize UDP transport, since the volume
   of dynamic authorization traffic is usually expected to be small.

| 1.2. Terminology


   This document uses the following terms:




DeKok, Alan                   Experimental                      [Page 6]

 
INTERNET-DRAFT               RADIUS Over TCP             12 October 2010


RADIUS client
     A device that provides an access service for a user to a network.
     Also referred to as a Network Access Server, or NAS.

RADIUS server
     A device that provides one or more of authentication,
     authorization, and/or accounting (AAA) services to a NAS.

RADIUS proxy
     A RADIUS proxy acts as a RADIUS server to the NAS, and a RADIUS
     client to the RADIUS server.

RADIUS request packet
     A packet originated by a RADIUS client to a RADIUS server.  e.g.
     Access-Request, Accounting-Request, CoA-Request, or Disconnect-
     Request.

RADIUS response packet
     A packet sent by a RADIUS server to a RADIUS client, in response to
     a RADIUS request packet.  e.g. Access-Accept, Access-Reject,
     Access-Challenge, Accounting-Response, CoA-ACK, etc.

RADIUS/UDP
     RADIUS over UDP, as defined in [RFC2865].

RADIUS/TCP
     RADIUS over TCP, as defined in this document.

RADIUS/TLS
     RADIUS over TLS, as defined in [RADIUS/TLS].

| 1.3. Requirements Language


   The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT",
   "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this
   document are to be interpreted as described in [RFC2119].

| 2. Changes to RADIUS


   RADIUS/TCP involves sending RADIUS application messages over a TCP
   connection.  In the sections that follow, we discuss the implications
   for the RADIUS packet format (Section 2.1), port usage (Section 2.2),
   RADIUS MIBs (Section 2.3) and RADIUS proxies (Section 2.5).  TCP-
   specific issues are discussed in Section 2.6.







DeKok, Alan                   Experimental                      [Page 7]

 
INTERNET-DRAFT               RADIUS Over TCP             12 October 2010


| 2.1. Packet Format


   The RADIUS packet format is unchanged from [RFC2865], [RFC2866], and
   [RFC5176].  Specifically, all of the following portions of RADIUS
   MUST be unchanged when using RADIUS/TCP:

      * Packet format
      * Permitted codes
      * Request Authenticator calculation
      * Response Authenticator calculation
      * Minimum packet length
      * Maximum packet length
      * Attribute format
      * Vendor-Specific Attribute (VSA) format
      * Permitted data types
      * Calculations of dynamic attributes such as CHAP-Challenge,
        or Message-Authenticator.
      * Calculation of "encrypted" attributes such as Tunnel-Password.

   The use of TLS transport does not change the calculation of security-
   related fields (such as the Response-Authenticator) in RADIUS
   [RFC2865] or RADIUS Dynamic Authorization [RFC5176].  Calculation of
   attributes such as User-Password [RFC2865] or Message-Authenticator
   [RFC3579] also does not change.

   Clients and servers MUST be able to store and manage shared secrets
   based on the key described above, of (IP address, port, transport
   protocol).

   The changes to RADIUS implementations required to implement this
   specification are largely limited to the portions that send and
   receive packets on the network.

| 2.2. Assigned Ports for RADIUS/TCP


   IANA has already assigned TCP ports for RADIUS transport, as outlined
   below:

      * radius          1812/tcp
      * radius-acct     1813/tcp
      * radius-dynauth  3799/tcp

   Since these ports are unused by existing RADIUS implementations, the
   assigned values MUST be used as the default ports for RADIUS over
   TCP.

   The early deployment of RADIUS was done using UDP port number 1645,
   which conflicts with the "datametrics" service.  Implementations



DeKok, Alan                   Experimental                      [Page 8]

 
INTERNET-DRAFT               RADIUS Over TCP             12 October 2010


   using RADIUS/TCP MUST NOT use TCP ports 1645 or 1646 as the default
   ports for this specification.

   The "radsec" port (2083/tcp) SHOULD be used as the default port for
   RADIUS/TLS.  The "radius" port (1812/tcp) SHOULD NOT be used for
   RADIUS/TLS.

| 2.3. Management Information Base (MIB)


   The MIB Module definitions in [RFC4668], [RFC4669], [RFC4670],
   [RFC4671], [RFC4672], and [RFC4673] are intended to be used for
   RADIUS over UDP.  As such, they do not support RADIUS/TCP, and will
   need to be updated in the future.  Implementations of RADIUS/TCP
   SHOULD NOT re-use these MIB Modules to perform statistics counting
   for RADIUS/TCP connections.

| 2.4. Detecting Live Servers


   As RADIUS is a "hop by hop" protocol, a RADIUS proxy shields the
   client from any information about downstream servers.  While the
   client may be able to deduce the operational state of the local
   server (i.e. proxy), it cannot make any determination about the
   operational state of the downstream servers.

   Within RADIUS as defined in [RFC2865], proxies typically only forward
   traffic between the NAS and RADIUS server, and do not generate their
   own responses.  As a result, when a NAS does not receive a response
   to a request, this could be the result of packet loss between the NAS
   and proxy, a problem on the proxy, loss between the RADIUS proxy and
   server, or a problem with the server.

   When UDP is used as a transport protocol, the absence of a reply can
   cause a client to deduce (incorrectly) that the proxy is unavailable.
   The client could then fail over to another server, or conclude that
   no "live" servers are available (OKAY state in [RFC3539] Appendix A).
   This situation is made even worse when requests are sent through a
   proxy to multiple destinations.  Failures in one destination may
   result in service outages for other destinations, if the client
   erroneously believes that the proxy is unresponsive.

   For RADIUS/TLS, it is RECOMMENDED that implementations utilize the
   existence of a TCP connection along with the application layer
   watchdog defined in [RFC3539] Section 3.4 to determine that the
   server is "live".

   RADIUS clients using RADIUS/TCP MUST mark a connection DOWN if the
   network stack indicates that the connection is no longer active.  If
   the network stack indicates that connection is still active, Clients



DeKok, Alan                   Experimental                      [Page 9]

 
INTERNET-DRAFT               RADIUS Over TCP             12 October 2010


   MUST NOT decide that it is down until the application layer watchdog
   algorithm has marked it DOWN ([RFC3539] Appendix A).  RADIUS clients
   using RADIUS/TCP MUST NOT decide that a RADIUS server is unresponsive
   until all TCP connections to it have been marked DOWN.

   The above requirements do not forbid the practice of a client pro-
   actively closing connections, or marking a server as DOWN due to an
   administrative decision.

| 2.5. Congestion Control Issues


   Additional issues with RADIUS proxies involve transport protocol
   changes where the proxy receives packets on one transport protocol,
   and forwards them on a different transport protocol.  There are
   several situations in which the law of "conservation of packets"
   could be violated on an end-to-end basis (e.g. where more packets
   could enter the system than could leave it on a short-term basis):

      * Where TCP is used between proxies, it is possible that the
      bandwidth consumed by incoming UDP packets destined to a given
      upstream server could exceed the sending rate of a single TCP
      connection to that server, based on the window size/RTT estimate.

      * It is possible for the incoming rate of TCP packets destined to
      a given realm to exceed the UDP throughput achievable using the
      transport guidelines established in [RFC5080].  This could happen,
      for example, where the TCP window between proxies has opened, but
      packet loss is being experienced on the UDP leg, so that the
      effective congestion window on the UDP side is 1.

   Intrinsically, proxy systems operate with multiple control loops
   instead of one end-to-end loop, and so are less stable.  This is true
   even for TCP-TCP proxies.  As discussed in [RFC3539], the only way to
   achieve stability equivalent to a single TCP connection is to mimic
   the end-to-end behavior of a single TCP connection.  This typically
   is not achievable with an application-layer RADIUS implementation,
   regardless of transport.

| 2.6. TCP Specific Issues


   The guidelines defined in [RFC3539] for implementing a AAA protocol
   over reliable transport are applicable to RADIUS/TLS.

   The Application Layer Watchdog defined in [RFC3539] Section 3.4 MUST
   be used.  The Status-Server packet [RFC5997] MUST be used as the
   application layer watchdog message.  Implementations MUST reserve one
   RADIUS ID per connection for the application layer watchdog message.
   This restriction is described further below in Section 2.6.4.



DeKok, Alan                   Experimental                     [Page 10]

 
INTERNET-DRAFT               RADIUS Over TCP             12 October 2010


   RADIUS/TLS Implementations MUST support receiving RADIUS packets over
   both UDP and TLS transports originating from the same endpoint.
   RADIUS packets received over UDP MUST be replied to over UDP; RADIUS
   packets received over TLS MUST be replied to over TLS.  That is,
   RADIUS clients and servers MUST be treated as unique based on a key
   of the three-tuple (IP address, port, transport protocol).
   Implementations MUST permit different shared secrets to be used for
   UDP and TCP connections to the same destination IP address and
   numerical port.

   This requirement does not forbid the traditional practice of using
   primary and secondary servers in a fail-over relationship.  Instead,
   it requires that two services sharing an IP address and numerical
   port, but differing in transport protocol, MUST be treated as
   independent services for the purpose of fail-over, load-balancing,
   etc.

   Whenever the underlying network stack permits the use of TCP
   keepalive socket options, their use is RECOMMENDED.

| 2.6.1. Duplicates and Retransmissions


   As TCP is a reliable transport, implementations MUST NOT retransmit
   RADIUS request packets over a given TCP connection.  Similarly, if
   there is no response to a RADIUS packet over one TCP connection,
   implementations MUST NOT retransmit that packet over a different TCP
   connection to the same destination IP address and port, while the
   first connection is in the OKAY state ([RFC3539] Appendix A).

   However, if the TCP connection is broken or closed, retransmissions
   over new connections are permissible.  RADIUS request packets that
   have not yet received a response MAY be transmitted by a RADIUS
   client over a new TCP connection.  As this procedure involves using a
   new source port, the ID of the packet MAY change.  If the ID changes,
   any security attributes such as Message-Authenticator MUST be
   recalculated.

   If a TCP connection is broken or closed, any cached RADIUS response
   packets ([RFC5080] Section 2.2.2) associated with that connection
   MUST be discarded.  A RADIUS server SHOULD stop processing of any
   requests associated with that TCP connection.  No response to these
   requests can be sent over the TCP connection, so any further
   processing is pointless.  This requirement applies not only to RADIUS
   servers, but also to proxies.  When a client's connection to a proxy
   server is closed, there may be responses from a home server that were
   supposed to be sent by the proxy back over that connection to the
   client.  Since the client connection is closed, those responses from
   the home server to the proxy server SHOULD be silently discarded by



DeKok, Alan                   Experimental                     [Page 11]

 
INTERNET-DRAFT               RADIUS Over TCP             12 October 2010


   the proxy.

   Despite the above discussion, RADIUS servers SHOULD still perform
   duplicate detection on received packets, as described in [RFC5080]
   Section 2.2.2.  This detection can prevent duplicate processing of
   packets from non-conformant clients.

   RADIUS packets SHOULD NOT be re-transmitted to the same destination
   IP and numerical port, but over a different transport protocol.
   There is no guarantee in RADIUS that the two ports are in any way
   related.  This requirement does not, however, forbid the practice of
   putting multiple servers into a fail-over or load-balancing pool.  In
   that situation, RADIUS request MAY be retransmitted to another server
   that is known to be part of the same pool.

| 2.6.2. Head of Line Blocking


   When using UDP as a transport for RADIUS, there is no ordering of
   packets.  If a packet sent by a client is lost, that loss has no
   effect on subsequent packets sent by that client.

   Unlike UDP, TCP is subject to issues related to Head of Line (HoL)
   blocking.  This occurs when when a TCP segment is lost and a
   subsequent TCP segment arrives out of order.  While the RADIUS server
   can process RADIUS packets out of order, the semantics of TCP makes
   this impossible.  This limitation can lower the maximum packet
   processing rate of RADIUS/TCP.

| 2.6.3. Shared Secrets


   The use of TLS transport does not change the calculation of security-
   related fields (such as the Response-Authenticator) in RADIUS
   [RFC2865] or RADIUS Dynamic Authorization [RFC5176].  Calculation of
   attributes such as User-Password [RFC2865] or Message-Authenticator
   [RFC3579] also does not change.

   Clients and servers MUST be able to store and manage shared secrets
   based on the key described above, of (IP address, port, transport
   protocol).

| 2.6.4. Malformed Packets and Unknown Clients


   The RADIUS specifications ([RFC2865], etc.) say that an
   implementation should "silently discard" a packet in a number of
   circumstances.  This action has no further consequences for UDP
   transport, as the "next" packet is completely independent of the
   previous one.




DeKok, Alan                   Experimental                     [Page 12]

 
INTERNET-DRAFT               RADIUS Over TCP             12 October 2010


   When TCP is used as a transport, decoding the "next" packet on a
   connection depends on the proper decoding of the previous packet.  As
   a result, the behavior with respect to discarded packets has to
   change.

   Implementations of this specification SHOULD treat the "silently
   discard" texts referenced above as "silently discard and close the
   connection."  That is, the TCP connection MUST be closed if any of
   the following circumstances are seen:

      * Connection from an unknown client
      * Packet where the RADIUS "length" field is less than the minimum
        RADIUS packet length
      * Packet where the RADIUS "length" field is more than the maximum
        RADIUS packet length
      * Packet that has an Attribute "length" field has value of zero
        or one (0 or 1).
      * Packet where the attributes do not exactly fill the packet
      * Packet where the Request Authenticator fails validation
        (where validation is required).
      * Packet where the Response Authenticator fails validation
        (where validation is required).
      * Packet where the Message-Authenticator attribute fails
        validation (when it occurs in a packet).

   After applying the above rules, there are still two situations where
   the previous specifications allow a packet to be "silently discarded"
   on reception:

      * Packets with an invalid code field
      * Response packets that do not match any outstanding request

   In these situations, the TCP connections MAY remain open, or MAY be
   closed, as an implementation choice.  However, the invalid packet
   MUST be silently discarded.

   These requirements reduce the possibility for a misbehaving client or
   server to wreak havoc on the network.

| 2.6.5. Limitations of the ID Field


   The RADIUS ID field is one octet in size.  As a result, any one TCP
   connection can have only 256 "in flight" RADIUS packets at a time.
   If more than 256 simultaneous "in flight" packets are required,
   additional TCP connections will need to be opened.  This limitation
   is also noted in [RFC3539] Section 2.4.

   An additional limit is the requirement to send a Status-Server packet



DeKok, Alan                   Experimental                     [Page 13]

 
INTERNET-DRAFT               RADIUS Over TCP             12 October 2010


   over the same TCP connection as is used for normal requests.  As
   noted in [RFC5997], the response to a Status-Server packet is either
   an Access-Accept or an Accounting-Response.  If all IDs were
   allocated to normal requests, then there would be no free ID to use
   for the Status-Server packet, and it could not be sent over the
   connection.

   Implementations SHOULD reserve ID zero (0) on each TCP connection for
   Status-Server packets.  This value was picked arbitrarily, as there
   is no reason to choose any one value over another for this use.

   Implementors may be tempted to extend RADIUS to permit more than 256
   outstanding packets on one connection.  However, doing so is a
   violation of a fundamental part of the protocol and MUST NOT be done.
   Making that extension here is outside of the scope of this
   specification.

| 2.6.6. EAP Sessions


   When RADIUS clients send EAP requests using RADIUS/TCP, they SHOULD
   choose the same TCP connection for all packets related to one EAP
   session.  This practice ensures that EAP packets are transmitted in
   order, and that problems with any one TCP connection do affect the
   minimum number of EAP sessions.

   A simple method that may work in many situations is to hash the
   contents of the Calling-Station-Id attribute, which normally contains
   the MAC address.  The output of that hash can be used to select a
   particular TCP connection.

   However, EAP packets for one EAP session can still be transported
   from client to server over multiple paths.  Therefore, when a server
   receives a RADIUS request containing an EAP request, it MUST be
   processed without considering the transport protocol.  For TCP
   transport, it MUST be processed without considering the source port.
   The algorithm suggested in [RFC5080] Section 2.1.1 SHOULD be used to
   track EAP sessions, as it is independent of source port and transport
   protocol.

   The retransmission requirements of Section 2.6.1, above, MUST be
   applied to RADIUS encapsulated EAP packets.  That is, EAP
   retransmissions MUST NOT result in retransmissions of RADIUS packets
   over a particular TCP connection.  EAP retransmissions MAY result in
   retransmission of RADIUS packets over a different TCP connection, but
   only when the previous TCP connection is marked DOWN.






DeKok, Alan                   Experimental                     [Page 14]

 
INTERNET-DRAFT               RADIUS Over TCP             12 October 2010


| 2.6.7. TCP Applications are not UDP Applications


   Implementors should be aware that programming a robust TCP
   application can be very different from programming a robust UDP
   application.  It is RECOMMENDED that implementors of this
   specification familiarize themselves with TCP application programming
   concepts.

   Clients and servers SHOULD implement configurable connection limits.
   Clients and servers SHOULD implement configurable rate limiting on
   new connections.  Allowing an unbounded number or rate of TCP
   connections may result in resource exhaustion.

   Further discussion of implementation issues is outside of the scope
   of this document.

| 3. Diameter Considerations


   This document defines TCP as a transport layer for RADIUS.  It
   defines no new RADIUS attributes or codes.  The only interaction with
   Diameter is in a RADIUS to Diameter, or in a Diameter to RADIUS
   gateway.  The RADIUS side of such a gateway MAY implement RADIUS/TCP,
   but this change has no effect on Diameter.

| 4. IANA Considerations


   This document requires no action by IANA.

| 5. Security Considerations


   As the RADIUS packet format, signing, and client verification are
   unchanged from prior specifications, all of the security issues
   outlined in previous specifications for RADIUS/UDP are also
   applicable here.

   As noted above, clients and servers SHOULD support configurable
   connection limits.  Allowing an unlimited number of connections may
   result in resource exhaustion.

   Implementors should consult [RADIUS/TLS] for issues related the
   security of RADIUS/TLS, and [RFC5246] for issues related to the
   security of the TLS protocol.

   Since "bare" TCP does not provide for confidentiality or enable
   negotiation of credible ciphersuites, its use is not appropriate for
   inter-server communications where strong security is required.  As a
   result "bare" TCP transport MUST NOT be used without TLS, IPsec, or
   other secure upper layer.



DeKok, Alan                   Experimental                     [Page 15]

 
INTERNET-DRAFT               RADIUS Over TCP             12 October 2010


   There are no (at this time) other known security issues for RADIUS
   over TCP transport.

| 6. References


| 6.1. Normative References


[RFC2119] Bradner, S., "Key words for use in RFCs to Indicate
          Requirement Levels", BCP 14, RFC 2119, March 1997.

[RFC2865] Rigney, C., Willens, S., Rubens, A., and W. Simpson, "Remote
          Authentication Dial In User Service (RADIUS)", RFC 2865, June
          2000.

[RFC3539] Aboba, B. et al., "Authentication, Authorization and
          Accounting (AAA) Transport Profile", RFC 3539, June 2003.

[RADIUS/TLS]
          Winter, S. et. al., "TLS encryption for RADIUS over TCP
          (RadSec)", draft-ietf-radext-radsec-07.txt, July 2010 (work in
          progress).

[RFC5997] DeKok, A., "Use of Status-Server Packets in the Remote
          Authentication Dial In User Service (RADIUS) Protocol", RFC
          5997, August, 2010.

| 6.2. Informative References


[RFC2866] Rigney, C., "RADIUS Accounting", RFC 2866, June 2000.

[RFC3579] Aboba, B. and P. Calhoun, "RADIUS (Remote Authentication Dial
          In User Service) Support For Extensible Authentication
          Protocol (EAP)", RFC 3579, September 2003.

[RFC4301] Kent, S. and R. Atkinson, "Security Architecture for the
          Internet Protocol", RFC 4301, December, 2005.

[RFC4668] Nelson, D, "RADIUS Authentication Client MIB for IPv6", RFC
          4668, August 2006.

[RFC4669] Nelson, D, "RADIUS Authentication Server MIB for IPv6", RFC
          4669, August 2006.

[RFC4670] Nelson, D, "RADIUS Accounting Client MIB for IPv6", RFC 4670,
          August 2006.

[RFC4671] Nelson, D, "RADIUS Accounting Server MIB for IPv6", RFC 4671,
          August 2006.



DeKok, Alan                   Experimental                     [Page 16]

 
INTERNET-DRAFT               RADIUS Over TCP             12 October 2010


[RFC4672] Nelson, D, "RADIUS Dynamic Authorization Client MIB", RFC
          4672, August 2006.

[RFC4673] Nelson, D, "RADIUS Dynamic Authorization Server MIB", RFC
          4673, August 2006.

[RFC5080] Nelson, D. and DeKok, A, "Common Remote Authentication Dial In
          User Service (RADIUS) Implementation Issues and Suggested
          Fixes", RFC 5080, December 2007.

[RFC5176] Chiba, M. et al., "Dynamic Authorization Extensions to Remote
          Authentication Dial In User Service (RADIUS)", RFC 5176,
          January 2008.

[RFC5216] Simon, D., etc al., "The EAP-TLS Authentication Protocol", RFC
          5216, March 2008.

[RFC5246] Dierks, T., Rescorla, E., "The Transport Layer Security (TLS)
          Protocol Version 1.2", RFC 5246, August 2008.

Acknowledgments

   None at this time.

Authors' Addresses

   Alan DeKok
   The FreeRADIUS Server Project
   http://freeradius.org/

   Email: aland@freeradius.org




















DeKok, Alan                   Experimental                     [Page 17]

 
INTERNET-DRAFT               RADIUS Over TCP             12 October 2010


Open issues

   Open issues relating to this document are tracked on the following
   web site:

   http://www.drizzle.com/~aboba/RADEXT/













































DeKok, Alan                   Experimental                     [Page 18]


Html markup produced by rfcmarkup 1.101, available from http://tools.ietf.org/tools/rfcmarkup/ 

				8.3.1.2.2

			8.3.1.3

		8.3.2

	8.4
```
