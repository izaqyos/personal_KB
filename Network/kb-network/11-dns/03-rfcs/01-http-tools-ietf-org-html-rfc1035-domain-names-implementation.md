---
type: reference
title: "http://tools.ietf.org/html/rfc1035 DOMAIN NAMES - IMPLEMENTATION AND SPECIFICATION"
description: "RFC 1035 Domain Names Implementation and Specification, copied text."
tags: [dns, reference, networking, legacy, third-party]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "Network/NetworkKB#10.3.1"
---

# 10.3.1 http://tools.ietf.org/html/rfc1035 DOMAIN NAMES - IMPLEMENTATION AND SPECIFICATION

[↑ RFCs](/Network/kb-network/11-dns/03-rfcs/README.md)

```text
Network Working Group                                     P. Mockapetris
Request for Comments: 1035                                           ISI
                                                           November 1987
Obsoletes: RFCs 882, 883, 973

            DOMAIN NAMES - IMPLEMENTATION AND SPECIFICATION
```

#### 10.3.1.1. STATUS OF THIS MEMO

```text
This RFC describes the details of the domain system and protocol, and
assumes that the reader is familiar with the concepts discussed in a
companion RFC, "Domain Names - Concepts and Facilities" [RFC-1034].

The domain system is a mixture of functions and data types which are an
official protocol and functions and data types which are still
experimental.  Since the domain system is intentionally extensible, new
data types and experimental behavior should always be expected in parts
of the system beyond the official protocol.  The official protocol parts
include standard queries, responses and the Internet class RR data
formats (e.g., host addresses).  Since the previous RFC set, several
definitions have changed, so some previous definitions are obsolete.

Experimental or obsolete features are clearly marked in these RFCs, and
such information should be used with caution.

The reader is especially cautioned not to depend on the values which
appear in examples to be current or complete, since their purpose is
primarily pedagogical.  Distribution of this memo is unlimited.

                           Table of Contents
```

#### 10.3.1.1. STATUS OF THIS MEMO 1

#### 10.3.1.2. INTRODUCTION 3

#### 10.3.1.2.1. Overview 3

#### 10.3.1.2.2. Common configurations 4

#### 10.3.1.2.3. Conventions 7

#### 10.3.1.2.3.1. Preferred name syntax 7

#### 10.3.1.2.3.2. Data Transmission Order 8

#### 10.3.1.2.3.3. Character Case 9

#### 10.3.1.2.3.4. Size limits 10

#### 10.3.1.3. DOMAIN NAME SPACE AND RR DEFINITIONS 10

#### 10.3.1.3.1. Name space definitions 10

#### 10.3.1.3.2. RR definitions 11

#### 10.3.1.3.2.1. Format 11

#### 10.3.1.3.2.2. TYPE values 12

#### 10.3.1.3.2.3. QTYPE values 12

#### 10.3.1.3.2.4. CLASS values 13

```text
Mockapetris                                                     [Page 1]

RFC 1035        Domain Implementation and Specification    November 1987
```

#### 10.3.1.3.2.5. QCLASS values 13

#### 10.3.1.3.3. Standard RRs 13

#### 10.3.1.3.3.1. CNAME RDATA format 14

#### 10.3.1.3.3.2. HINFO RDATA format 14

#### 10.3.1.3.3.3. MB RDATA format (EXPERIMENTAL) 14

#### 10.3.1.3.3.4. MD RDATA format (Obsolete) 15

#### 10.3.1.3.3.5. MF RDATA format (Obsolete) 15

#### 10.3.1.3.3.6. MG RDATA format (EXPERIMENTAL) 16

#### 10.3.1.3.3.7. MINFO RDATA format (EXPERIMENTAL) 16

#### 10.3.1.3.3.8. MR RDATA format (EXPERIMENTAL) 17

#### 10.3.1.3.3.9. MX RDATA format 17

#### 10.3.1.3.3.10. NULL RDATA format (EXPERIMENTAL) 17

#### 10.3.1.3.3.11. NS RDATA format 18

#### 10.3.1.3.3.12. PTR RDATA format 18

#### 10.3.1.3.3.13. SOA RDATA format 19

#### 10.3.1.3.3.14. TXT RDATA format 20

#### 10.3.1.3.4. ARPA Internet specific RRs 20

#### 10.3.1.3.4.1. A RDATA format 20

#### 10.3.1.3.4.2. WKS RDATA format 21

#### 10.3.1.3.5. IN-ADDR.ARPA domain 22

#### 10.3.1.3.6. Defining new types, classes, and special namespaces 24

#### 10.3.1.4. MESSAGES 25

#### 10.3.1.4.1. Format 25

#### 10.3.1.4.1.1. Header section format 26

#### 10.3.1.4.1.2. Question section format 28

#### 10.3.1.4.1.3. Resource record format 29

#### 10.3.1.4.1.4. Message compression 30

#### 10.3.1.4.2. Transport 32

#### 10.3.1.4.2.1. UDP usage 32

#### 10.3.1.4.2.2. TCP usage 32

#### 10.3.1.5. MASTER FILES 33

#### 10.3.1.5.1. Format 33

#### 10.3.1.5.2. Use of master files to define zones 35

#### 10.3.1.5.3. Master file example 36

#### 10.3.1.6. NAME SERVER IMPLEMENTATION 37

#### 10.3.1.6.1. Architecture 37

#### 10.3.1.6.1.1. Control 37

#### 10.3.1.6.1.2. Database 37

#### 10.3.1.6.1.3. Time 39

#### 10.3.1.6.2. Standard query processing 39

#### 10.3.1.6.3. Zone refresh and reload processing 39

#### 10.3.1.6.4. Inverse queries (Optional) 40

#### 10.3.1.6.4.1. The contents of inverse queries and responses 40

#### 10.3.1.6.4.2. Inverse query and response example 41

#### 10.3.1.6.4.3. Inverse query processing 42

```text
Mockapetris                                                     [Page 2]

RFC 1035        Domain Implementation and Specification    November 1987
```

#### 10.3.1.6.5. Completion queries and responses 42

#### 10.3.1.7. RESOLVER IMPLEMENTATION 43

#### 10.3.1.7.1. Transforming a user request into a query 43

#### 10.3.1.7.2. Sending the queries 44

#### 10.3.1.7.3. Processing responses 46

#### 10.3.1.7.4. Using the cache 47

#### 10.3.1.8. MAIL SUPPORT 47

#### 10.3.1.8.1. Mail exchange binding 48

#### 10.3.1.8.2. Mailbox binding (Experimental) 48

#### 10.3.1.9. REFERENCES and BIBLIOGRAPHY 50

```text
  Index                                                              54
```

#### 10.3.1.2. INTRODUCTION

#### 10.3.1.2.1. Overview

```text
The goal of domain names is to provide a mechanism for naming resources
in such a way that the names are usable in different hosts, networks,
protocol families, internets, and administrative organizations.

From the user's point of view, domain names are useful as arguments to a
local agent, called a resolver, which retrieves information associated
with the domain name.  Thus a user might ask for the host address or
mail information associated with a particular domain name.  To enable
the user to request a particular type of information, an appropriate
query type is passed to the resolver with the domain name.  To the user,
the domain tree is a single information space; the resolver is
responsible for hiding the distribution of data among name servers from
the user.

From the resolver's point of view, the database that makes up the domain
space is distributed among various name servers.  Different parts of the
domain space are stored in different name servers, although a particular
data item will be stored redundantly in two or more name servers.  The
resolver starts with knowledge of at least one name server.  When the
resolver processes a user query it asks a known name server for the
information; in return, the resolver either receives the desired
information or a referral to another name server.  Using these
referrals, resolvers learn the identities and contents of other name
servers.  Resolvers are responsible for dealing with the distribution of
the domain space and dealing with the effects of name server failure by
consulting redundant databases in other servers.

Name servers manage two kinds of data.  The first kind of data held in
sets called zones; each zone is the complete database for a particular
"pruned" subtree of the domain space.  This data is called
authoritative.  A name server periodically checks to make sure that its
zones are up to date, and if not, obtains a new copy of updated zones



Mockapetris                                                     [Page 3]

RFC 1035        Domain Implementation and Specification    November 1987


from master files stored locally or in another name server.  The second
kind of data is cached data which was acquired by a local resolver.
This data may be incomplete, but improves the performance of the
retrieval process when non-local data is repeatedly accessed.  Cached
data is eventually discarded by a timeout mechanism.

This functional structure isolates the problems of user interface,
failure recovery, and distribution in the resolvers and isolates the
database update and refresh problems in the name servers.
```

#### 10.3.1.2.2. Common configurations

```text
A host can participate in the domain name system in a number of ways,
depending on whether the host runs programs that retrieve information
from the domain system, name servers that answer queries from other
hosts, or various combinations of both functions.  The simplest, and
perhaps most typical, configuration is shown below:

                 Local Host                        |  Foreign
                                                   |
    +---------+               +----------+         |  +--------+
    |         | user queries  |          |queries  |  |        |
    |  User   |-------------->|          |---------|->|Foreign |
    | Program |               | Resolver |         |  |  Name  |
    |         |<--------------|          |<--------|--| Server |
    |         | user responses|          |responses|  |        |
    +---------+               +----------+         |  +--------+
                                |     A            |
                cache additions |     | references |
                                V     |            |
                              +----------+         |
                              |  cache   |         |
                              +----------+         |

User programs interact with the domain name space through resolvers; the
format of user queries and user responses is specific to the host and
its operating system.  User queries will typically be operating system
calls, and the resolver and its cache will be part of the host operating
system.  Less capable hosts may choose to implement the resolver as a
subroutine to be linked in with every program that needs its services.
Resolvers answer user queries with information they acquire via queries
to foreign name servers and the local cache.

Note that the resolver may have to make several queries to several
different foreign name servers to answer a particular user query, and
hence the resolution of a user query may involve several network
accesses and an arbitrary amount of time.  The queries to foreign name
servers and the corresponding responses have a standard format described



Mockapetris                                                     [Page 4]

RFC 1035        Domain Implementation and Specification    November 1987


in this memo, and may be datagrams.

Depending on its capabilities, a name server could be a stand alone
program on a dedicated machine or a process or processes on a large
timeshared host.  A simple configuration might be:

                 Local Host                        |  Foreign
                                                   |
      +---------+                                  |
     /         /|                                  |
    +---------+ |             +----------+         |  +--------+
    |         | |             |          |responses|  |        |
    |         | |             |   Name   |---------|->|Foreign |
    |  Master |-------------->|  Server  |         |  |Resolver|
    |  files  | |             |          |<--------|--|        |
    |         |/              |          | queries |  +--------+
    +---------+               +----------+         |

Here a primary name server acquires information about one or more zones
by reading master files from its local file system, and answers queries
about those zones that arrive from foreign resolvers.

The DNS requires that all zones be redundantly supported by more than
one name server.  Designated secondary servers can acquire zones and
check for updates from the primary server using the zone transfer
protocol of the DNS.  This configuration is shown below:

                 Local Host                        |  Foreign
                                                   |
      +---------+                                  |
     /         /|                                  |
    +---------+ |             +----------+         |  +--------+
    |         | |             |          |responses|  |        |
    |         | |             |   Name   |---------|->|Foreign |
    |  Master |-------------->|  Server  |         |  |Resolver|
    |  files  | |             |          |<--------|--|        |
    |         |/              |          | queries |  +--------+
    +---------+               +----------+         |
                                A     |maintenance |  +--------+
                                |     +------------|->|        |
                                |      queries     |  |Foreign |
                                |                  |  |  Name  |
                                +------------------|--| Server |
                             maintenance responses |  +--------+

In this configuration, the name server periodically establishes a
virtual circuit to a foreign name server to acquire a copy of a zone or
to check that an existing copy has not changed.  The messages sent for



Mockapetris                                                     [Page 5]

RFC 1035        Domain Implementation and Specification    November 1987


these maintenance activities follow the same form as queries and
responses, but the message sequences are somewhat different.

The information flow in a host that supports all aspects of the domain
name system is shown below:

                 Local Host                        |  Foreign
                                                   |
    +---------+               +----------+         |  +--------+
    |         | user queries  |          |queries  |  |        |
    |  User   |-------------->|          |---------|->|Foreign |
    | Program |               | Resolver |         |  |  Name  |
    |         |<--------------|          |<--------|--| Server |
    |         | user responses|          |responses|  |        |
    +---------+               +----------+         |  +--------+
                                |     A            |
                cache additions |     | references |
                                V     |            |
                              +----------+         |
                              |  Shared  |         |
                              | database |         |
                              +----------+         |
                                A     |            |
      +---------+     refreshes |     | references |
     /         /|               |     V            |
    +---------+ |             +----------+         |  +--------+
    |         | |             |          |responses|  |        |
    |         | |             |   Name   |---------|->|Foreign |
    |  Master |-------------->|  Server  |         |  |Resolver|
    |  files  | |             |          |<--------|--|        |
    |         |/              |          | queries |  +--------+
    +---------+               +----------+         |
                                A     |maintenance |  +--------+
                                |     +------------|->|        |
                                |      queries     |  |Foreign |
                                |                  |  |  Name  |
                                +------------------|--| Server |
                             maintenance responses |  +--------+

The shared database holds domain space data for the local name server
and resolver.  The contents of the shared database will typically be a
mixture of authoritative data maintained by the periodic refresh
operations of the name server and cached data from previous resolver
requests.  The structure of the domain data and the necessity for
synchronization between name servers and resolvers imply the general
characteristics of this database, but the actual format is up to the
local implementor.




Mockapetris                                                     [Page 6]

RFC 1035        Domain Implementation and Specification    November 1987


Information flow can also be tailored so that a group of hosts act
together to optimize activities.  Sometimes this is done to offload less
capable hosts so that they do not have to implement a full resolver.
This can be appropriate for PCs or hosts which want to minimize the
amount of new network code which is required.  This scheme can also
allow a group of hosts can share a small number of caches rather than
maintaining a large number of separate caches, on the premise that the
centralized caches will have a higher hit ratio.  In either case,
resolvers are replaced with stub resolvers which act as front ends to
resolvers located in a recursive server in one or more name servers
known to perform that service:

                   Local Hosts                     |  Foreign
                                                   |
    +---------+                                    |
    |         | responses                          |
    | Stub    |<--------------------+              |
    | Resolver|                     |              |
    |         |----------------+    |              |
    +---------+ recursive      |    |              |
                queries        |    |              |
                               V    |              |
    +---------+ recursive     +----------+         |  +--------+
    |         | queries       |          |queries  |  |        |
    | Stub    |-------------->| Recursive|---------|->|Foreign |
    | Resolver|               | Server   |         |  |  Name  |
    |         |<--------------|          |<--------|--| Server |
    +---------+ responses     |          |responses|  |        |
                              +----------+         |  +--------+
                              |  Central |         |
                              |   cache  |         |
                              +----------+         |

In any case, note that domain components are always replicated for
reliability whenever possible.
```

#### 10.3.1.2.3. Conventions

```text
The domain system has several conventions dealing with low-level, but
fundamental, issues.  While the implementor is free to violate these
conventions WITHIN HIS OWN SYSTEM, he must observe these conventions in
ALL behavior observed from other hosts.
```

#### 10.3.1.2.3.1. Preferred name syntax

```text
The DNS specifications attempt to be as general as possible in the rules
for constructing domain names.  The idea is that the name of any
existing object can be expressed as a domain name with minimal changes.



Mockapetris                                                     [Page 7]

RFC 1035        Domain Implementation and Specification    November 1987


However, when assigning a domain name for an object, the prudent user
will select a name which satisfies both the rules of the domain system
and any existing rules for the object, whether these rules are published
or implied by existing programs.

For example, when naming a mail domain, the user should satisfy both the
rules of this memo and those in RFC-822.  When creating a new host name,
the old rules for HOSTS.TXT should be followed.  This avoids problems
when old software is converted to use domain names.

The following syntax will result in fewer problems with many

applications that use domain names (e.g., mail, TELNET).

<domain> ::= <subdomain> | " "

<subdomain> ::= <label> | <subdomain> "." <label>

<label> ::= <letter> [ [ <ldh-str> ] <let-dig> ]

<ldh-str> ::= <let-dig-hyp> | <let-dig-hyp> <ldh-str>

<let-dig-hyp> ::= <let-dig> | "-"

<let-dig> ::= <letter> | <digit>

<letter> ::= any one of the 52 alphabetic characters A through Z in
upper case and a through z in lower case

<digit> ::= any one of the ten digits 0 through 9

Note that while upper and lower case letters are allowed in domain
names, no significance is attached to the case.  That is, two names with
the same spelling but different case are to be treated as if identical.

The labels must follow the rules for ARPANET host names.  They must
start with a letter, end with a letter or digit, and have as interior
characters only letters, digits, and hyphen.  There are also some
restrictions on the length.  Labels must be 63 characters or less.

For example, the following strings identify hosts in the Internet:

A.ISI.EDU XX.LCS.MIT.EDU SRI-NIC.ARPA
```

#### 10.3.1.2.3.2. Data Transmission Order

```text
The order of transmission of the header and data described in this
document is resolved to the octet level.  Whenever a diagram shows a



Mockapetris                                                     [Page 8]

RFC 1035        Domain Implementation and Specification    November 1987


group of octets, the order of transmission of those octets is the normal
order in which they are read in English.  For example, in the following
diagram, the octets are transmitted in the order they are numbered.

     0                   1
     0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5
    +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
    |       1       |       2       |
    +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
    |       3       |       4       |
    +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
    |       5       |       6       |
    +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

Whenever an octet represents a numeric quantity, the left most bit in
the diagram is the high order or most significant bit.  That is, the bit
labeled 0 is the most significant bit.  For example, the following
diagram represents the value 170 (decimal).

     0 1 2 3 4 5 6 7
    +-+-+-+-+-+-+-+-+
    |1 0 1 0 1 0 1 0|
    +-+-+-+-+-+-+-+-+

Similarly, whenever a multi-octet field represents a numeric quantity
the left most bit of the whole field is the most significant bit.  When
a multi-octet quantity is transmitted the most significant octet is
transmitted first.
```

#### 10.3.1.2.3.3. Character Case

```text
For all parts of the DNS that are part of the official protocol, all
comparisons between character strings (e.g., labels, domain names, etc.)
are done in a case-insensitive manner.  At present, this rule is in
force throughout the domain system without exception.  However, future
additions beyond current usage may need to use the full binary octet
capabilities in names, so attempts to store domain names in 7-bit ASCII
or use of special bytes to terminate labels, etc., should be avoided.

When data enters the domain system, its original case should be
preserved whenever possible.  In certain circumstances this cannot be
done.  For example, if two RRs are stored in a database, one at x.y and
one at X.Y, they are actually stored at the same place in the database,
and hence only one casing would be preserved.  The basic rule is that
case can be discarded only when data is used to define structure in a
database, and two names are identical when compared in a case
insensitive manner.




Mockapetris                                                     [Page 9]

RFC 1035        Domain Implementation and Specification    November 1987


Loss of case sensitive data must be minimized.  Thus while data for x.y
and X.Y may both be stored under a single location x.y or X.Y, data for
a.x and B.X would never be stored under A.x, A.X, b.x, or b.X.  In
general, this preserves the case of the first label of a domain name,
but forces standardization of interior node labels.

Systems administrators who enter data into the domain database should
take care to represent the data they supply to the domain system in a
case-consistent manner if their system is case-sensitive.  The data
distribution system in the domain system will ensure that consistent
representations are preserved.
```

#### 10.3.1.2.3.4. Size limits

```text
Various objects and parameters in the DNS have size limits.  They are
listed below.  Some could be easily changed, others are more
fundamental.

labels          63 octets or less

names           255 octets or less

TTL             positive values of a signed 32 bit number.

UDP messages    512 octets or less
```

#### 10.3.1.3. DOMAIN NAME SPACE AND RR DEFINITIONS

#### 10.3.1.3.1. Name space definitions

```text
Domain names in messages are expressed in terms of a sequence of labels.
Each label is represented as a one octet length field followed by that
number of octets.  Since every domain name ends with the null label of
the root, a domain name is terminated by a length byte of zero.  The
high order two bits of every length octet must be zero, and the
remaining six bits of the length field limit the label to 63 octets or
less.

To simplify implementations, the total length of a domain name (i.e.,
label octets and label length octets) is restricted to 255 octets or
less.

Although labels can contain any 8 bit values in octets that make up a
label, it is strongly recommended that labels follow the preferred
syntax described elsewhere in this memo, which is compatible with
existing host naming conventions.  Name servers and resolvers must
compare labels in a case-insensitive manner (i.e., A=a), assuming ASCII
with zero parity.  Non-alphabetic codes must match exactly.



Mockapetris                                                    [Page 10]

RFC 1035        Domain Implementation and Specification    November 1987
```

#### 10.3.1.3.2. RR definitions

#### 10.3.1.3.2.1. Format

```text
All RRs have the same top level format shown below:

                                    1  1  1  1  1  1
      0  1  2  3  4  5  6  7  8  9  0  1  2  3  4  5
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                                               |
    /                                               /
    /                      NAME                     /
    |                                               |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                      TYPE                     |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                     CLASS                     |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                      TTL                      |
    |                                               |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                   RDLENGTH                    |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--|
    /                     RDATA                     /
    /                                               /
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+


where:

NAME            an owner name, i.e., the name of the node to which this
                resource record pertains.

TYPE            two octets containing one of the RR TYPE codes.

CLASS           two octets containing one of the RR CLASS codes.

TTL             a 32 bit signed integer that specifies the time interval
                that the resource record may be cached before the source
                of the information should again be consulted.  Zero
                values are interpreted to mean that the RR can only be
                used for the transaction in progress, and should not be
                cached.  For example, SOA records are always distributed
                with a zero TTL to prohibit caching.  Zero values can
                also be used for extremely volatile data.

RDLENGTH        an unsigned 16 bit integer that specifies the length in
                octets of the RDATA field.



Mockapetris                                                    [Page 11]

RFC 1035        Domain Implementation and Specification    November 1987


RDATA           a variable length string of octets that describes the
                resource.  The format of this information varies
                according to the TYPE and CLASS of the resource record.
```

#### 10.3.1.3.2.2. TYPE values

```text
TYPE fields are used in resource records.  Note that these types are a
subset of QTYPEs.

TYPE            value and meaning

A               1 a host address

NS              2 an authoritative name server

MD              3 a mail destination (Obsolete - use MX)

MF              4 a mail forwarder (Obsolete - use MX)

CNAME           5 the canonical name for an alias

SOA             6 marks the start of a zone of authority

MB              7 a mailbox domain name (EXPERIMENTAL)

MG              8 a mail group member (EXPERIMENTAL)

MR              9 a mail rename domain name (EXPERIMENTAL)

NULL            10 a null RR (EXPERIMENTAL)

WKS             11 a well known service description

PTR             12 a domain name pointer

HINFO           13 host information

MINFO           14 mailbox or mail list information

MX              15 mail exchange

TXT             16 text strings
```

#### 10.3.1.3.2.3. QTYPE values

```text
QTYPE fields appear in the question part of a query.  QTYPES are a
superset of TYPEs, hence all TYPEs are valid QTYPEs.  In addition, the
following QTYPEs are defined:



Mockapetris                                                    [Page 12]

RFC 1035        Domain Implementation and Specification    November 1987


AXFR            252 A request for a transfer of an entire zone

MAILB           253 A request for mailbox-related records (MB, MG or MR)

MAILA           254 A request for mail agent RRs (Obsolete - see MX)

*               255 A request for all records
```

#### 10.3.1.3.2.4. CLASS values

```text
CLASS fields appear in resource records.  The following CLASS mnemonics
and values are defined:

IN              1 the Internet

CS              2 the CSNET class (Obsolete - used only for examples in
                some obsolete RFCs)

CH              3 the CHAOS class

HS              4 Hesiod [Dyer 87]
```

#### 10.3.1.3.2.5. QCLASS values

```text
QCLASS fields appear in the question section of a query.  QCLASS values
are a superset of CLASS values; every CLASS is a valid QCLASS.  In
addition to CLASS values, the following QCLASSes are defined:

*               255 any class
```

#### 10.3.1.3.3. Standard RRs

```text
The following RR definitions are expected to occur, at least
potentially, in all classes.  In particular, NS, SOA, CNAME, and PTR
will be used in all classes, and have the same format in all classes.
Because their RDATA format is known, all domain names in the RDATA
section of these RRs may be compressed.

<domain-name> is a domain name represented as a series of labels, and
terminated by a label with zero length.  <character-string> is a single
length octet followed by that number of characters.  <character-string>
is treated as binary information, and can be up to 256 characters in
length (including the length octet).








Mockapetris                                                    [Page 13]

RFC 1035        Domain Implementation and Specification    November 1987
```

#### 10.3.1.3.3.1. CNAME RDATA format

```text
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    /                     CNAME                     /
    /                                               /
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+

where:

CNAME           A <domain-name> which specifies the canonical or primary
                name for the owner.  The owner name is an alias.

CNAME RRs cause no additional section processing, but name servers may
choose to restart the query at the canonical name in certain cases.  See
the description of name server logic in [RFC-1034] for details.
```

#### 10.3.1.3.3.2. HINFO RDATA format

```text
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    /                      CPU                      /
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    /                       OS                      /
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+

where:

CPU             A <character-string> which specifies the CPU type.

OS              A <character-string> which specifies the operating
                system type.

Standard values for CPU and OS can be found in [RFC-1010].

HINFO records are used to acquire general information about a host.  The
main use is for protocols such as FTP that can use special procedures
when talking between machines or operating systems of the same type.
```

#### 10.3.1.3.3.3. MB RDATA format (EXPERIMENTAL)

```text
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    /                   MADNAME                     /
    /                                               /
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+

where:

MADNAME         A <domain-name> which specifies a host which has the
                specified mailbox.



Mockapetris                                                    [Page 14]

RFC 1035        Domain Implementation and Specification    November 1987


MB records cause additional section processing which looks up an A type
RRs corresponding to MADNAME.
```

#### 10.3.1.3.3.4. MD RDATA format (Obsolete)

```text
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    /                   MADNAME                     /
    /                                               /
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+

where:

MADNAME         A <domain-name> which specifies a host which has a mail
                agent for the domain which should be able to deliver
                mail for the domain.

MD records cause additional section processing which looks up an A type
record corresponding to MADNAME.

MD is obsolete.  See the definition of MX and [RFC-974] for details of
the new scheme.  The recommended policy for dealing with MD RRs found in
a master file is to reject them, or to convert them to MX RRs with a
preference of 0.
```

#### 10.3.1.3.3.5. MF RDATA format (Obsolete)

```text
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    /                   MADNAME                     /
    /                                               /
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+

where:

MADNAME         A <domain-name> which specifies a host which has a mail
                agent for the domain which will accept mail for
                forwarding to the domain.

MF records cause additional section processing which looks up an A type
record corresponding to MADNAME.

MF is obsolete.  See the definition of MX and [RFC-974] for details ofw
the new scheme.  The recommended policy for dealing with MD RRs found in
a master file is to reject them, or to convert them to MX RRs with a
preference of 10.







Mockapetris                                                    [Page 15]

RFC 1035        Domain Implementation and Specification    November 1987
```

#### 10.3.1.3.3.6. MG RDATA format (EXPERIMENTAL)

```text
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    /                   MGMNAME                     /
    /                                               /
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+

where:

MGMNAME         A <domain-name> which specifies a mailbox which is a
                member of the mail group specified by the domain name.

MG records cause no additional section processing.
```

#### 10.3.1.3.3.7. MINFO RDATA format (EXPERIMENTAL)

```text
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    /                    RMAILBX                    /
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    /                    EMAILBX                    /
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+

where:

RMAILBX         A <domain-name> which specifies a mailbox which is
                responsible for the mailing list or mailbox.  If this
                domain name names the root, the owner of the MINFO RR is
                responsible for itself.  Note that many existing mailing
                lists use a mailbox X-request for the RMAILBX field of
                mailing list X, e.g., Msgroup-request for Msgroup.  This
                field provides a more general mechanism.


EMAILBX         A <domain-name> which specifies a mailbox which is to
                receive error messages related to the mailing list or
                mailbox specified by the owner of the MINFO RR (similar
                to the ERRORS-TO: field which has been proposed).  If
                this domain name names the root, errors should be
                returned to the sender of the message.

MINFO records cause no additional section processing.  Although these
records can be associated with a simple mailbox, they are usually used
with a mailing list.








Mockapetris                                                    [Page 16]

RFC 1035        Domain Implementation and Specification    November 1987
```

#### 10.3.1.3.3.8. MR RDATA format (EXPERIMENTAL)

```text
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    /                   NEWNAME                     /
    /                                               /
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+

where:

NEWNAME         A <domain-name> which specifies a mailbox which is the
                proper rename of the specified mailbox.

MR records cause no additional section processing.  The main use for MR
is as a forwarding entry for a user who has moved to a different
mailbox.
```

#### 10.3.1.3.3.9. MX RDATA format

```text
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                  PREFERENCE                   |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    /                   EXCHANGE                    /
    /                                               /
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+

where:

PREFERENCE      A 16 bit integer which specifies the preference given to
                this RR among others at the same owner.  Lower values
                are preferred.

EXCHANGE        A <domain-name> which specifies a host willing to act as
                a mail exchange for the owner name.

MX records cause type A additional section processing for the host
specified by EXCHANGE.  The use of MX RRs is explained in detail in
[RFC-974].
```

#### 10.3.1.3.3.10. NULL RDATA format (EXPERIMENTAL)

```text
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    /                  <anything>                   /
    /                                               /
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+

Anything at all may be in the RDATA field so long as it is 65535 octets
or less.




Mockapetris                                                    [Page 17]

RFC 1035        Domain Implementation and Specification    November 1987


NULL records cause no additional section processing.  NULL RRs are not
allowed in master files.  NULLs are used as placeholders in some
experimental extensions of the DNS.
```

#### 10.3.1.3.3.11. NS RDATA format

```text
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    /                   NSDNAME                     /
    /                                               /
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+

where:

NSDNAME         A <domain-name> which specifies a host which should be
                authoritative for the specified class and domain.

NS records cause both the usual additional section processing to locate
a type A record, and, when used in a referral, a special search of the
zone in which they reside for glue information.

The NS RR states that the named host should be expected to have a zone
starting at owner name of the specified class.  Note that the class may
not indicate the protocol family which should be used to communicate
with the host, although it is typically a strong hint.  For example,
hosts which are name servers for either Internet (IN) or Hesiod (HS)
class information are normally queried using IN class protocols.
```

#### 10.3.1.3.3.12. PTR RDATA format

```text
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    /                   PTRDNAME                    /
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+

where:

PTRDNAME        A <domain-name> which points to some location in the
                domain name space.

PTR records cause no additional section processing.  These RRs are used
in special domains to point to some other location in the domain space.
These records are simple data, and don't imply any special processing
similar to that performed by CNAME, which identifies aliases.  See the
description of the IN-ADDR.ARPA domain for an example.








Mockapetris                                                    [Page 18]

RFC 1035        Domain Implementation and Specification    November 1987
```

#### 10.3.1.3.3.13. SOA RDATA format

```text
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    /                     MNAME                     /
    /                                               /
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    /                     RNAME                     /
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                    SERIAL                     |
    |                                               |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                    REFRESH                    |
    |                                               |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                     RETRY                     |
    |                                               |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                    EXPIRE                     |
    |                                               |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                    MINIMUM                    |
    |                                               |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+

where:

MNAME           The <domain-name> of the name server that was the
                original or primary source of data for this zone.

RNAME           A <domain-name> which specifies the mailbox of the
                person responsible for this zone.

SERIAL          The unsigned 32 bit version number of the original copy
                of the zone.  Zone transfers preserve this value.  This
                value wraps and should be compared using sequence space
                arithmetic.

REFRESH         A 32 bit time interval before the zone should be
                refreshed.

RETRY           A 32 bit time interval that should elapse before a
                failed refresh should be retried.

EXPIRE          A 32 bit time value that specifies the upper limit on
                the time interval that can elapse before the zone is no
                longer authoritative.





Mockapetris                                                    [Page 19]

RFC 1035        Domain Implementation and Specification    November 1987


MINIMUM         The unsigned 32 bit minimum TTL field that should be
                exported with any RR from this zone.

SOA records cause no additional section processing.

All times are in units of seconds.

Most of these fields are pertinent only for name server maintenance
operations.  However, MINIMUM is used in all query operations that
retrieve RRs from a zone.  Whenever a RR is sent in a response to a
query, the TTL field is set to the maximum of the TTL field from the RR
and the MINIMUM field in the appropriate SOA.  Thus MINIMUM is a lower
bound on the TTL field for all RRs in a zone.  Note that this use of
MINIMUM should occur when the RRs are copied into the response and not
when the zone is loaded from a master file or via a zone transfer.  The
reason for this provison is to allow future dynamic update facilities to
change the SOA RR with known semantics.
```

#### 10.3.1.3.3.14. TXT RDATA format

```text
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    /                   TXT-DATA                    /
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+

where:

TXT-DATA        One or more <character-string>s.

TXT RRs are used to hold descriptive text.  The semantics of the text
depends on the domain where it is found.
```

#### 10.3.1.3.4. Internet specific RRs

#### 10.3.1.3.4.1. A RDATA format

```text
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                    ADDRESS                    |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+

where:

ADDRESS         A 32 bit Internet address.

Hosts that have multiple Internet addresses will have multiple A
records.





Mockapetris                                                    [Page 20]

RFC 1035        Domain Implementation and Specification    November 1987


A records cause no additional section processing.  The RDATA section of
an A line in a master file is an Internet address expressed as four
decimal numbers separated by dots without any imbedded spaces (e.g.,
"10.2.0.52" or "192.0.5.6").
```

#### 10.3.1.3.4.2. WKS RDATA format

```text
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                    ADDRESS                    |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |       PROTOCOL        |                       |
    +--+--+--+--+--+--+--+--+                       |
    |                                               |
    /                   <BIT MAP>                   /
    /                                               /
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+

where:

ADDRESS         An 32 bit Internet address

PROTOCOL        An 8 bit IP protocol number

<BIT MAP>       A variable length bit map.  The bit map must be a
                multiple of 8 bits long.

The WKS record is used to describe the well known services supported by
a particular protocol on a particular internet address.  The PROTOCOL
field specifies an IP protocol number, and the bit map has one bit per
port of the specified protocol.  The first bit corresponds to port 0,
the second to port 1, etc.  If the bit map does not include a bit for a
protocol of interest, that bit is assumed zero.  The appropriate values
and mnemonics for ports and protocols are specified in [RFC-1010].

For example, if PROTOCOL=TCP (6), the 26th bit corresponds to TCP port
25 (SMTP).  If this bit is set, a SMTP server should be listening on TCP
port 25; if zero, SMTP service is not supported on the specified
address.

The purpose of WKS RRs is to provide availability information for
servers for TCP and UDP.  If a server supports both TCP and UDP, or has
multiple Internet addresses, then multiple WKS RRs are used.

WKS RRs cause no additional section processing.

In master files, both ports and protocols are expressed using mnemonics
or decimal numbers.




Mockapetris                                                    [Page 21]

RFC 1035        Domain Implementation and Specification    November 1987
```

#### 10.3.1.3.5. IN-ADDR.ARPA domain

```text
The Internet uses a special domain to support gateway location and
Internet address to host mapping.  Other classes may employ a similar
strategy in other domains.  The intent of this domain is to provide a
guaranteed method to perform host address to host name mapping, and to
facilitate queries to locate all gateways on a particular network in the
Internet.

Note that both of these services are similar to functions that could be
performed by inverse queries; the difference is that this part of the
domain name space is structured according to address, and hence can
guarantee that the appropriate data can be located without an exhaustive
search of the domain space.

The domain begins at IN-ADDR.ARPA and has a substructure which follows
the Internet addressing structure.

Domain names in the IN-ADDR.ARPA domain are defined to have up to four
labels in addition to the IN-ADDR.ARPA suffix.  Each label represents
one octet of an Internet address, and is expressed as a character string
for a decimal value in the range 0-255 (with leading zeros omitted
except in the case of a zero octet which is represented by a single
zero).

Host addresses are represented by domain names that have all four labels
specified.  Thus data for Internet address 10.2.0.52 is located at
domain name 52.0.2.10.IN-ADDR.ARPA.  The reversal, though awkward to
read, allows zones to be delegated which are exactly one network of
address space.  For example, 10.IN-ADDR.ARPA can be a zone containing
data for the ARPANET, while 26.IN-ADDR.ARPA can be a separate zone for
MILNET.  Address nodes are used to hold pointers to primary host names
in the normal domain space.

Network numbers correspond to some non-terminal nodes at various depths
in the IN-ADDR.ARPA domain, since Internet network numbers are either 1,
2, or 3 octets.  Network nodes are used to hold pointers to the primary
host names of gateways attached to that network.  Since a gateway is, by
definition, on more than one network, it will typically have two or more
network nodes which point at it.  Gateways will also have host level
pointers at their fully qualified addresses.

Both the gateway pointers at network nodes and the normal host pointers
at full address nodes use the PTR RR to point back to the primary domain
names of the corresponding hosts.

For example, the IN-ADDR.ARPA domain will contain information about the
ISI gateway between net 10 and 26, an MIT gateway from net 10 to MIT's



Mockapetris                                                    [Page 22]

RFC 1035        Domain Implementation and Specification    November 1987


net 18, and hosts A.ISI.EDU and MULTICS.MIT.EDU.  Assuming that ISI
gateway has addresses 10.2.0.22 and 26.0.0.103, and a name MILNET-
GW.ISI.EDU, and the MIT gateway has addresses 10.0.0.77 and 18.10.0.4
and a name GW.LCS.MIT.EDU, the domain database would contain:

|    10.IN-ADDR.ARPA.           PTR MILNET-GW.ISI.EDU.
|    10.IN-ADDR.ARPA.           PTR GW.LCS.MIT.EDU.
|    18.IN-ADDR.ARPA.           PTR GW.LCS.MIT.EDU.
|    26.IN-ADDR.ARPA.           PTR MILNET-GW.ISI.EDU.
|    22.0.2.10.IN-ADDR.ARPA.    PTR MILNET-GW.ISI.EDU.
|    103.0.0.26.IN-ADDR.ARPA.   PTR MILNET-GW.ISI.EDU.
|    77.0.0.10.IN-ADDR.ARPA.    PTR GW.LCS.MIT.EDU.
|    4.0.10.18.IN-ADDR.ARPA.    PTR GW.LCS.MIT.EDU.
|    103.0.3.26.IN-ADDR.ARPA.   PTR A.ISI.EDU.
|    6.0.0.10.IN-ADDR.ARPA.     PTR MULTICS.MIT.EDU.
|
Thus a program which wanted to locate gateways on net 10 would originate
a query of the form QTYPE=PTR, QCLASS=IN, QNAME=10.IN-ADDR.ARPA.  It
would receive two RRs in response:

    10.IN-ADDR.ARPA.           PTR MILNET-GW.ISI.EDU.
    10.IN-ADDR.ARPA.           PTR GW.LCS.MIT.EDU.

The program could then originate QTYPE=A, QCLASS=IN queries for MILNET-
GW.ISI.EDU. and GW.LCS.MIT.EDU. to discover the Internet addresses of
these gateways.

A resolver which wanted to find the host name corresponding to Internet
host address 10.0.0.6 would pursue a query of the form QTYPE=PTR,
QCLASS=IN, QNAME=6.0.0.10.IN-ADDR.ARPA, and would receive:

    6.0.0.10.IN-ADDR.ARPA.     PTR MULTICS.MIT.EDU.

Several cautions apply to the use of these services:
   - Since the IN-ADDR.ARPA special domain and the normal domain
     for a particular host or gateway will be in different zones,
     the possibility exists that that the data may be inconsistent.

   - Gateways will often have two names in separate domains, only
     one of which can be primary.

   - Systems that use the domain database to initialize their
     routing tables must start with enough gateway information to
     guarantee that they can access the appropriate name server.

   - The gateway data only reflects the existence of a gateway in a
     manner equivalent to the current HOSTS.TXT file.  It doesn't
     replace the dynamic availability information from GGP or EGP.



Mockapetris                                                    [Page 23]

RFC 1035        Domain Implementation and Specification    November 1987
```

#### 10.3.1.3.6. Defining new types, classes, and special namespaces

```text
The previously defined types and classes are the ones in use as of the
date of this memo.  New definitions should be expected.  This section
makes some recommendations to designers considering additions to the
existing facilities.  The mailing list NAMEDROPPERS@SRI-NIC.ARPA is the
forum where general discussion of design issues takes place.

In general, a new type is appropriate when new information is to be
added to the database about an existing object, or we need new data
formats for some totally new object.  Designers should attempt to define
types and their RDATA formats that are generally applicable to all
classes, and which avoid duplication of information.  New classes are
appropriate when the DNS is to be used for a new protocol, etc which
requires new class-specific data formats, or when a copy of the existing
name space is desired, but a separate management domain is necessary.

New types and classes need mnemonics for master files; the format of the
master files requires that the mnemonics for type and class be disjoint.

TYPE and CLASS values must be a proper subset of QTYPEs and QCLASSes
respectively.

The present system uses multiple RRs to represent multiple values of a
type rather than storing multiple values in the RDATA section of a
single RR.  This is less efficient for most applications, but does keep
RRs shorter.  The multiple RRs assumption is incorporated in some
experimental work on dynamic update methods.

The present system attempts to minimize the duplication of data in the
database in order to insure consistency.  Thus, in order to find the
address of the host for a mail exchange, you map the mail domain name to
a host name, then the host name to addresses, rather than a direct
mapping to host address.  This approach is preferred because it avoids
the opportunity for inconsistency.

In defining a new type of data, multiple RR types should not be used to
create an ordering between entries or express different formats for
equivalent bindings, instead this information should be carried in the
body of the RR and a single type used.  This policy avoids problems with
caching multiple types and defining QTYPEs to match multiple types.

For example, the original form of mail exchange binding used two RR
types one to represent a "closer" exchange (MD) and one to represent a
"less close" exchange (MF).  The difficulty is that the presence of one
RR type in a cache doesn't convey any information about the other
because the query which acquired the cached information might have used
a QTYPE of MF, MD, or MAILA (which matched both).  The redesigned



Mockapetris                                                    [Page 24]

RFC 1035        Domain Implementation and Specification    November 1987


service used a single type (MX) with a "preference" value in the RDATA
section which can order different RRs.  However, if any MX RRs are found
in the cache, then all should be there.
```

#### 10.3.1.4. MESSAGES

#### 10.3.1.4.1. Format

```text
All communications inside of the domain protocol are carried in a single
format called a message.  The top level format of message is divided
into 5 sections (some of which are empty in certain cases) shown below:

    +---------------------+
    |        Header       |
    +---------------------+
    |       Question      | the question for the name server
    +---------------------+
    |        Answer       | RRs answering the question
    +---------------------+
    |      Authority      | RRs pointing toward an authority
    +---------------------+
    |      Additional     | RRs holding additional information
    +---------------------+

The header section is always present.  The header includes fields that
specify which of the remaining sections are present, and also specify
whether the message is a query or a response, a standard query or some
other opcode, etc.

The names of the sections after the header are derived from their use in
standard queries.  The question section contains fields that describe a
question to a name server.  These fields are a query type (QTYPE), a
query class (QCLASS), and a query domain name (QNAME).  The last three
sections have the same format: a possibly empty list of concatenated
resource records (RRs).  The answer section contains RRs that answer the
question; the authority section contains RRs that point toward an
authoritative name server; the additional records section contains RRs
which relate to the query, but are not strictly answers for the
question.












Mockapetris                                                    [Page 25]

RFC 1035        Domain Implementation and Specification    November 1987
```

#### 10.3.1.4.1.1. Header section format

```text
The header contains the following fields:

                                    1  1  1  1  1  1
      0  1  2  3  4  5  6  7  8  9  0  1  2  3  4  5
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                      ID                       |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |QR|   Opcode  |AA|TC|RD|RA|   Z    |   RCODE   |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                    QDCOUNT                    |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                    ANCOUNT                    |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                    NSCOUNT                    |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                    ARCOUNT                    |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+

where:

ID              A 16 bit identifier assigned by the program that
                generates any kind of query.  This identifier is copied
                the corresponding reply and can be used by the requester
                to match up replies to outstanding queries.

QR              A one bit field that specifies whether this message is a
                query (0), or a response (1).

OPCODE          A four bit field that specifies kind of query in this
                message.  This value is set by the originator of a query
                and copied into the response.  The values are:

                0               a standard query (QUERY)

                1               an inverse query (IQUERY)

                2               a server status request (STATUS)

                3-15            reserved for future use

AA              Authoritative Answer - this bit is valid in responses,
                and specifies that the responding name server is an
                authority for the domain name in question section.

                Note that the contents of the answer section may have
                multiple owner names because of aliases.  The AA bit



Mockapetris                                                    [Page 26]

RFC 1035        Domain Implementation and Specification    November 1987


                corresponds to the name which matches the query name, or
                the first owner name in the answer section.

TC              TrunCation - specifies that this message was truncated
                due to length greater than that permitted on the
                transmission channel.

RD              Recursion Desired - this bit may be set in a query and
                is copied into the response.  If RD is set, it directs
                the name server to pursue the query recursively.
                Recursive query support is optional.

RA              Recursion Available - this be is set or cleared in a
                response, and denotes whether recursive query support is
                available in the name server.

Z               Reserved for future use.  Must be zero in all queries
                and responses.

RCODE           Response code - this 4 bit field is set as part of
                responses.  The values have the following
                interpretation:

                0               No error condition

                1               Format error - The name server was
                                unable to interpret the query.

                2               Server failure - The name server was
                                unable to process this query due to a
                                problem with the name server.

                3               Name Error - Meaningful only for
                                responses from an authoritative name
                                server, this code signifies that the
                                domain name referenced in the query does
                                not exist.

                4               Not Implemented - The name server does
                                not support the requested kind of query.

                5               Refused - The name server refuses to
                                perform the specified operation for
                                policy reasons.  For example, a name
                                server may not wish to provide the
                                information to the particular requester,
                                or a name server may not wish to perform
                                a particular operation (e.g., zone



Mockapetris                                                    [Page 27]

RFC 1035        Domain Implementation and Specification    November 1987


                                transfer) for particular data.

                6-15            Reserved for future use.

QDCOUNT         an unsigned 16 bit integer specifying the number of
                entries in the question section.

ANCOUNT         an unsigned 16 bit integer specifying the number of
                resource records in the answer section.

NSCOUNT         an unsigned 16 bit integer specifying the number of name
                server resource records in the authority records
                section.

ARCOUNT         an unsigned 16 bit integer specifying the number of
                resource records in the additional records section.
```

#### 10.3.1.4.1.2. Question section format

```text
The question section is used to carry the "question" in most queries,
i.e., the parameters that define what is being asked.  The section
contains QDCOUNT (usually 1) entries, each of the following format:

                                    1  1  1  1  1  1
      0  1  2  3  4  5  6  7  8  9  0  1  2  3  4  5
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                                               |
    /                     QNAME                     /
    /                                               /
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                     QTYPE                     |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                     QCLASS                    |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+

where:

QNAME           a domain name represented as a sequence of labels, where
                each label consists of a length octet followed by that
                number of octets.  The domain name terminates with the
                zero length octet for the null label of the root.  Note
                that this field may be an odd number of octets; no
                padding is used.

QTYPE           a two octet code which specifies the type of the query.
                The values for this field include all codes valid for a
                TYPE field, together with some more general codes which
                can match more than one type of RR.



Mockapetris                                                    [Page 28]

RFC 1035        Domain Implementation and Specification    November 1987


QCLASS          a two octet code that specifies the class of the query.
                For example, the QCLASS field is IN for the Internet.
```

#### 10.3.1.4.1.3. Resource record format

```text
The answer, authority, and additional sections all share the same
format: a variable number of resource records, where the number of
records is specified in the corresponding count field in the header.
Each resource record has the following format:
                                    1  1  1  1  1  1
      0  1  2  3  4  5  6  7  8  9  0  1  2  3  4  5
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                                               |
    /                                               /
    /                      NAME                     /
    |                                               |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                      TYPE                     |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                     CLASS                     |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                      TTL                      |
    |                                               |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                   RDLENGTH                    |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--|
    /                     RDATA                     /
    /                                               /
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+

where:

NAME            a domain name to which this resource record pertains.

TYPE            two octets containing one of the RR type codes.  This
                field specifies the meaning of the data in the RDATA
                field.

CLASS           two octets which specify the class of the data in the
                RDATA field.

TTL             a 32 bit unsigned integer that specifies the time
                interval (in seconds) that the resource record may be
                cached before it should be discarded.  Zero values are
                interpreted to mean that the RR can only be used for the
                transaction in progress, and should not be cached.





Mockapetris                                                    [Page 29]

RFC 1035        Domain Implementation and Specification    November 1987


RDLENGTH        an unsigned 16 bit integer that specifies the length in
                octets of the RDATA field.

RDATA           a variable length string of octets that describes the
                resource.  The format of this information varies
                according to the TYPE and CLASS of the resource record.
                For example, the if the TYPE is A and the CLASS is IN,
                the RDATA field is a 4 octet ARPA Internet address.
```

#### 10.3.1.4.1.4. Message compression

```text
In order to reduce the size of messages, the domain system utilizes a
compression scheme which eliminates the repetition of domain names in a
message.  In this scheme, an entire domain name or a list of labels at
the end of a domain name is replaced with a pointer to a prior occurance
of the same name.

The pointer takes the form of a two octet sequence:

    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    | 1  1|                OFFSET                   |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+

The first two bits are ones.  This allows a pointer to be distinguished
from a label, since the label must begin with two zero bits because
labels are restricted to 63 octets or less.  (The 10 and 01 combinations
are reserved for future use.)  The OFFSET field specifies an offset from
the start of the message (i.e., the first octet of the ID field in the
domain header).  A zero offset specifies the first byte of the ID field,
etc.

The compression scheme allows a domain name in a message to be
represented as either:

   - a sequence of labels ending in a zero octet

   - a pointer

   - a sequence of labels ending with a pointer

Pointers can only be used for occurances of a domain name where the
format is not class specific.  If this were not the case, a name server
or resolver would be required to know the format of all RRs it handled.
As yet, there are no such cases, but they may occur in future RDATA
formats.

If a domain name is contained in a part of the message subject to a
length field (such as the RDATA section of an RR), and compression is



Mockapetris                                                    [Page 30]

RFC 1035        Domain Implementation and Specification    November 1987


used, the length of the compressed name is used in the length
calculation, rather than the length of the expanded name.

Programs are free to avoid using pointers in messages they generate,
although this will reduce datagram capacity, and may cause truncation.
However all programs are required to understand arriving messages that
contain pointers.

For example, a datagram might need to use the domain names F.ISI.ARPA,
FOO.F.ISI.ARPA, ARPA, and the root.  Ignoring the other fields of the
message, these domain names might be represented as:

       +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    20 |           1           |           F           |
       +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    22 |           3           |           I           |
       +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    24 |           S           |           I           |
       +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    26 |           4           |           A           |
       +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    28 |           R           |           P           |
       +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    30 |           A           |           0           |
       +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+

       +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    40 |           3           |           F           |
       +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    42 |           O           |           O           |
       +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    44 | 1  1|                20                       |
       +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+

       +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    64 | 1  1|                26                       |
       +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+

       +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    92 |           0           |                       |
       +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+

The domain name for F.ISI.ARPA is shown at offset 20.  The domain name
FOO.F.ISI.ARPA is shown at offset 40; this definition uses a pointer to
concatenate a label for FOO to the previously defined F.ISI.ARPA.  The
domain name ARPA is defined at offset 64 using a pointer to the ARPA
component of the name F.ISI.ARPA at 20; note that this pointer relies on
ARPA being the last label in the string at 20.  The root domain name is



Mockapetris                                                    [Page 31]

RFC 1035        Domain Implementation and Specification    November 1987


defined by a single octet of zeros at 92; the root domain name has no
labels.
```

#### 10.3.1.4.2. Transport

```text
The DNS assumes that messages will be transmitted as datagrams or in a
byte stream carried by a virtual circuit.  While virtual circuits can be
used for any DNS activity, datagrams are preferred for queries due to
their lower overhead and better performance.  Zone refresh activities
must use virtual circuits because of the need for reliable transfer.

The Internet supports name server access using TCP [RFC-793] on server
port 53 (decimal) as well as datagram access using UDP [RFC-768] on UDP
port 53 (decimal).
```

#### 10.3.1.4.2.1. UDP usage

```text
Messages sent using UDP user server port 53 (decimal).

Messages carried by UDP are restricted to 512 bytes (not counting the IP
or UDP headers).  Longer messages are truncated and the TC bit is set in
the header.

UDP is not acceptable for zone transfers, but is the recommended method
for standard queries in the Internet.  Queries sent using UDP may be
lost, and hence a retransmission strategy is required.  Queries or their
responses may be reordered by the network, or by processing in name
servers, so resolvers should not depend on them being returned in order.

The optimal UDP retransmission policy will vary with performance of the
Internet and the needs of the client, but the following are recommended:

   - The client should try other servers and server addresses
     before repeating a query to a specific address of a server.

   - The retransmission interval should be based on prior
     statistics if possible.  Too aggressive retransmission can
     easily slow responses for the community at large.  Depending
     on how well connected the client is to its expected servers,
     the minimum retransmission interval should be 2-5 seconds.

More suggestions on server selection and retransmission policy can be
found in the resolver section of this memo.
```

#### 10.3.1.4.2.2. TCP usage

```text
Messages sent over TCP connections use server port 53 (decimal).  The
message is prefixed with a two byte length field which gives the message



Mockapetris                                                    [Page 32]

RFC 1035        Domain Implementation and Specification    November 1987


length, excluding the two byte length field.  This length field allows
the low-level processing to assemble a complete message before beginning
to parse it.

Several connection management policies are recommended:

   - The server should not block other activities waiting for TCP
     data.

   - The server should support multiple connections.

   - The server should assume that the client will initiate
     connection closing, and should delay closing its end of the
     connection until all outstanding client requests have been
     satisfied.

   - If the server needs to close a dormant connection to reclaim
     resources, it should wait until the connection has been idle
     for a period on the order of two minutes.  In particular, the
     server should allow the SOA and AXFR request sequence (which
     begins a refresh operation) to be made on a single connection.
     Since the server would be unable to answer queries anyway, a
     unilateral close or reset may be used instead of a graceful
     close.
```

#### 10.3.1.5. MASTER FILES

```text
Master files are text files that contain RRs in text form.  Since the
contents of a zone can be expressed in the form of a list of RRs a
master file is most often used to define a zone, though it can be used
to list a cache's contents.  Hence, this section first discusses the
format of RRs in a master file, and then the special considerations when
a master file is used to create a zone in some name server.
```

#### 10.3.1.5.1. Format

```text
The format of these files is a sequence of entries.  Entries are
predominantly line-oriented, though parentheses can be used to continue
a list of items across a line boundary, and text literals can contain
CRLF within the text.  Any combination of tabs and spaces act as a
delimiter between the separate items that make up an entry.  The end of
any line in the master file can end with a comment.  The comment starts
with a ";" (semicolon).

The following entries are defined:

    <blank>[<comment>]




Mockapetris                                                    [Page 33]

RFC 1035        Domain Implementation and Specification    November 1987


    $ORIGIN <domain-name> [<comment>]

    $INCLUDE <file-name> [<domain-name>] [<comment>]

    <domain-name><rr> [<comment>]

    <blank><rr> [<comment>]

Blank lines, with or without comments, are allowed anywhere in the file.

Two control entries are defined: $ORIGIN and $INCLUDE.  $ORIGIN is
followed by a domain name, and resets the current origin for relative
domain names to the stated name.  $INCLUDE inserts the named file into
the current file, and may optionally specify a domain name that sets the
relative domain name origin for the included file.  $INCLUDE may also
have a comment.  Note that a $INCLUDE entry never changes the relative
origin of the parent file, regardless of changes to the relative origin
made within the included file.

The last two forms represent RRs.  If an entry for an RR begins with a
blank, then the RR is assumed to be owned by the last stated owner.  If
an RR entry begins with a <domain-name>, then the owner name is reset.

<rr> contents take one of the following forms:

    [<TTL>] [<class>] <type> <RDATA>

    [<class>] [<TTL>] <type> <RDATA>

The RR begins with optional TTL and class fields, followed by a type and
RDATA field appropriate to the type and class.  Class and type use the
standard mnemonics, TTL is a decimal integer.  Omitted class and TTL
values are default to the last explicitly stated values.  Since type and
class mnemonics are disjoint, the parse is unique.  (Note that this
order is different from the order used in examples and the order used in
the actual RRs; the given order allows easier parsing and defaulting.)

<domain-name>s make up a large share of the data in the master file.
The labels in the domain name are expressed as character strings and
separated by dots.  Quoting conventions allow arbitrary characters to be
stored in domain names.  Domain names that end in a dot are called
absolute, and are taken as complete.  Domain names which do not end in a
dot are called relative; the actual domain name is the concatenation of
the relative part with an origin specified in a $ORIGIN, $INCLUDE, or as
an argument to the master file loading routine.  A relative name is an
error when no origin is available.





Mockapetris                                                    [Page 34]

RFC 1035        Domain Implementation and Specification    November 1987


<character-string> is expressed in one or two ways: as a contiguous set
of characters without interior spaces, or as a string beginning with a "
and ending with a ".  Inside a " delimited string any character can
occur, except for a " itself, which must be quoted using \ (back slash).

Because these files are text files several special encodings are
necessary to allow arbitrary data to be loaded.  In particular:

                of the root.

@               A free standing @ is used to denote the current origin.

\X              where X is any character other than a digit (0-9), is
                used to quote that character so that its special meaning
                does not apply.  For example, "\." can be used to place
                a dot character in a label.

\DDD            where each D is a digit is the octet corresponding to
                the decimal number described by DDD.  The resulting
                octet is assumed to be text and is not checked for
                special meaning.

( )             Parentheses are used to group data that crosses a line
                boundary.  In effect, line terminations are not
                recognized within parentheses.

;               Semicolon is used to start a comment; the remainder of
                the line is ignored.
```

#### 10.3.1.5.2. Use of master files to define zones

```text
When a master file is used to load a zone, the operation should be
suppressed if any errors are encountered in the master file.  The
rationale for this is that a single error can have widespread
consequences.  For example, suppose that the RRs defining a delegation
have syntax errors; then the server will return authoritative name
errors for all names in the subzone (except in the case where the
subzone is also present on the server).

Several other validity checks that should be performed in addition to
insuring that the file is syntactically correct:

|   1. All RRs in the file should have the same class.
|
|   2. Exactly one SOA RR should be present at the top of the zone.
|
|   3. If delegations are present and glue information is required,
|      it should be present.



Mockapetris                                                    [Page 35]

RFC 1035        Domain Implementation and Specification    November 1987


|   4. Information present outside of the authoritative nodes in the
      zone should be glue information, rather than the result of an
      origin or similar error.
```

#### 10.3.1.5.3. Master file example

```text
The following is an example file which might be used to define the
ISI.EDU zone.and is loaded with an origin of ISI.EDU:

@   IN  SOA     VENERA      Action\.domains (
                                 20     ; SERIAL
                                 7200   ; REFRESH
                                 600    ; RETRY
                                 3600000; EXPIRE
                                 60)    ; MINIMUM

        NS      A.ISI.EDU.
        NS      VENERA
        NS      VAXA
        MX      10      VENERA
        MX      20      VAXA

A       A       26.3.0.103

VENERA  A       10.1.0.52
        A       128.9.0.32

VAXA    A       10.2.0.27
        A       128.9.0.33


$INCLUDE <SUBSYS>ISI-MAILBOXES.TXT

Where the file <SUBSYS>ISI-MAILBOXES.TXT is:

    MOE     MB      A.ISI.EDU.
    LARRY   MB      A.ISI.EDU.
    CURLEY  MB      A.ISI.EDU.
    STOOGES MG      MOE
            MG      LARRY
            MG      CURLEY

Note the use of the \ character in the SOA RR to specify the responsible
person mailbox "Action.domains@E.ISI.EDU".







Mockapetris                                                    [Page 36]

RFC 1035        Domain Implementation and Specification    November 1987
```

#### 10.3.1.6. NAME SERVER IMPLEMENTATION

#### 10.3.1.6.1. Architecture

```text
The optimal structure for the name server will depend on the host
operating system and whether the name server is integrated with resolver
operations, either by supporting recursive service, or by sharing its
database with a resolver.  This section discusses implementation
considerations for a name server which shares a database with a
resolver, but most of these concerns are present in any name server.
```

#### 10.3.1.6.1.1. Control

```text
A name server must employ multiple concurrent activities, whether they
are implemented as separate tasks in the host's OS or multiplexing
inside a single name server program.  It is simply not acceptable for a
name server to block the service of UDP requests while it waits for TCP
data for refreshing or query activities.  Similarly, a name server
should not attempt to provide recursive service without processing such
requests in parallel, though it may choose to serialize requests from a
single client, or to regard identical requests from the same client as
duplicates.  A name server should not substantially delay requests while
it reloads a zone from master files or while it incorporates a newly
refreshed zone into its database.
```

#### 10.3.1.6.1.2. Database

```text
While name server implementations are free to use any internal data
structures they choose, the suggested structure consists of three major
parts:

   - A "catalog" data structure which lists the zones available to
     this server, and a "pointer" to the zone data structure.  The
     main purpose of this structure is to find the nearest ancestor
     zone, if any, for arriving standard queries.

   - Separate data structures for each of the zones held by the
     name server.

   - A data structure for cached data. (or perhaps separate caches
     for different classes)

All of these data structures can be implemented an identical tree
structure format, with different data chained off the nodes in different
parts: in the catalog the data is pointers to zones, while in the zone
and cache data structures, the data will be RRs.  In designing the tree
framework the designer should recognize that query processing will need
to traverse the tree using case-insensitive label comparisons; and that



Mockapetris                                                    [Page 37]

RFC 1035        Domain Implementation and Specification    November 1987


in real data, a few nodes have a very high branching factor (100-1000 or
more), but the vast majority have a very low branching factor (0-1).

One way to solve the case problem is to store the labels for each node
in two pieces: a standardized-case representation of the label where all
ASCII characters are in a single case, together with a bit mask that
denotes which characters are actually of a different case.  The
branching factor diversity can be handled using a simple linked list for
a node until the branching factor exceeds some threshold, and
transitioning to a hash structure after the threshold is exceeded.  In
any case, hash structures used to store tree sections must insure that
hash functions and procedures preserve the casing conventions of the
DNS.

The use of separate structures for the different parts of the database
is motivated by several factors:

   - The catalog structure can be an almost static structure that
     need change only when the system administrator changes the
     zones supported by the server.  This structure can also be
     used to store parameters used to control refreshing
     activities.

   - The individual data structures for zones allow a zone to be
     replaced simply by changing a pointer in the catalog.  Zone
     refresh operations can build a new structure and, when
     complete, splice it into the database via a simple pointer
     replacement.  It is very important that when a zone is
     refreshed, queries should not use old and new data
     simultaneously.

   - With the proper search procedures, authoritative data in zones
     will always "hide", and hence take precedence over, cached
     data.

   - Errors in zone definitions that cause overlapping zones, etc.,
     may cause erroneous responses to queries, but problem
     determination is simplified, and the contents of one "bad"
     zone can't corrupt another.

   - Since the cache is most frequently updated, it is most
     vulnerable to corruption during system restarts.  It can also
     become full of expired RR data.  In either case, it can easily
     be discarded without disturbing zone data.

A major aspect of database design is selecting a structure which allows
the name server to deal with crashes of the name server's host.  State
information which a name server should save across system crashes



Mockapetris                                                    [Page 38]

RFC 1035        Domain Implementation and Specification    November 1987


includes the catalog structure (including the state of refreshing for
each zone) and the zone data itself.
```

#### 10.3.1.6.1.3. Time

```text
Both the TTL data for RRs and the timing data for refreshing activities
depends on 32 bit timers in units of seconds.  Inside the database,
refresh timers and TTLs for cached data conceptually "count down", while
data in the zone stays with constant TTLs.

A recommended implementation strategy is to store time in two ways:  as
a relative increment and as an absolute time.  One way to do this is to
use positive 32 bit numbers for one type and negative numbers for the
other.  The RRs in zones use relative times; the refresh timers and
cache data use absolute times.  Absolute numbers are taken with respect
to some known origin and converted to relative values when placed in the
response to a query.  When an absolute TTL is negative after conversion
to relative, then the data is expired and should be ignored.
```

#### 10.3.1.6.2. Standard query processing

```text
The major algorithm for standard query processing is presented in
[RFC-1034].

When processing queries with QCLASS=*, or some other QCLASS which
matches multiple classes, the response should never be authoritative
unless the server can guarantee that the response covers all classes.

When composing a response, RRs which are to be inserted in the
additional section, but duplicate RRs in the answer or authority
sections, may be omitted from the additional section.

When a response is so long that truncation is required, the truncation
should start at the end of the response and work forward in the
datagram.  Thus if there is any data for the authority section, the
answer section is guaranteed to be unique.

The MINIMUM value in the SOA should be used to set a floor on the TTL of
data distributed from a zone.  This floor function should be done when
the data is copied into a response.  This will allow future dynamic
update protocols to change the SOA MINIMUM field without ambiguous
semantics.
```

#### 10.3.1.6.3. Zone refresh and reload processing

```text
In spite of a server's best efforts, it may be unable to load zone data
from a master file due to syntax errors, etc., or be unable to refresh a
zone within the its expiration parameter.  In this case, the name server



Mockapetris                                                    [Page 39]

RFC 1035        Domain Implementation and Specification    November 1987


should answer queries as if it were not supposed to possess the zone.

If a master is sending a zone out via AXFR, and a new version is created
during the transfer, the master should continue to send the old version
if possible.  In any case, it should never send part of one version and
part of another.  If completion is not possible, the master should reset
the connection on which the zone transfer is taking place.
```

#### 10.3.1.6.4. Inverse queries (Optional)

```text
Inverse queries are an optional part of the DNS.  Name servers are not
required to support any form of inverse queries.  If a name server
receives an inverse query that it does not support, it returns an error
response with the "Not Implemented" error set in the header.  While
inverse query support is optional, all name servers must be at least
able to return the error response.
```

#### 10.3.1.6.4.1. The contents of inverse queries and responses Inverse

```text
queries reverse the mappings performed by standard query operations;
while a standard query maps a domain name to a resource, an inverse
query maps a resource to a domain name.  For example, a standard query
might bind a domain name to a host address; the corresponding inverse
query binds the host address to a domain name.

Inverse queries take the form of a single RR in the answer section of
the message, with an empty question section.  The owner name of the
query RR and its TTL are not significant.  The response carries
questions in the question section which identify all names possessing
the query RR WHICH THE NAME SERVER KNOWS.  Since no name server knows
about all of the domain name space, the response can never be assumed to
be complete.  Thus inverse queries are primarily useful for database
management and debugging activities.  Inverse queries are NOT an
acceptable method of mapping host addresses to host names; use the IN-
ADDR.ARPA domain instead.

Where possible, name servers should provide case-insensitive comparisons
for inverse queries.  Thus an inverse query asking for an MX RR of
"Venera.isi.edu" should get the same response as a query for
"VENERA.ISI.EDU"; an inverse query for HINFO RR "IBM-PC UNIX" should
produce the same result as an inverse query for "IBM-pc unix".  However,
this cannot be guaranteed because name servers may possess RRs that
contain character strings but the name server does not know that the
data is character.

When a name server processes an inverse query, it either returns:

   1. zero, one, or multiple domain names for the specified
      resource as QNAMEs in the question section



Mockapetris                                                    [Page 40]

RFC 1035        Domain Implementation and Specification    November 1987


   2. an error code indicating that the name server doesn't support
      inverse mapping of the specified resource type.

When the response to an inverse query contains one or more QNAMEs, the
owner name and TTL of the RR in the answer section which defines the
inverse query is modified to exactly match an RR found at the first
QNAME.

RRs returned in the inverse queries cannot be cached using the same
mechanism as is used for the replies to standard queries.  One reason
for this is that a name might have multiple RRs of the same type, and
only one would appear.  For example, an inverse query for a single
address of a multiply homed host might create the impression that only
one address existed.

10.3.1.6.4.2. Inverse query and response example          The overall structure
of an inverse query for retrieving the domain name that corresponds to
Internet address 10.1.0.52 is shown below:

                         +-----------------------------------------+
           Header        |          OPCODE=IQUERY, ID=997          |
                         +-----------------------------------------+
          Question       |                 <empty>                 |
                         +-----------------------------------------+
           Answer        |        <anyname> A IN 10.1.0.52         |
                         +-----------------------------------------+
          Authority      |                 <empty>                 |
                         +-----------------------------------------+
         Additional      |                 <empty>                 |
                         +-----------------------------------------+

This query asks for a question whose answer is the Internet style
address 10.1.0.52.  Since the owner name is not known, any domain name
can be used as a placeholder (and is ignored).  A single octet of zero,
signifying the root, is usually used because it minimizes the length of
the message.  The TTL of the RR is not significant.  The response to
this query might be:














Mockapetris                                                    [Page 41]

RFC 1035        Domain Implementation and Specification    November 1987


                         +-----------------------------------------+
           Header        |         OPCODE=RESPONSE, ID=997         |
                         +-----------------------------------------+
          Question       |QTYPE=A, QCLASS=IN, QNAME=VENERA.ISI.EDU |
                         +-----------------------------------------+
           Answer        |  VENERA.ISI.EDU  A IN 10.1.0.52         |
                         +-----------------------------------------+
          Authority      |                 <empty>                 |
                         +-----------------------------------------+
         Additional      |                 <empty>                 |
                         +-----------------------------------------+

Note that the QTYPE in a response to an inverse query is the same as the
TYPE field in the answer section of the inverse query.  Responses to
inverse queries may contain multiple questions when the inverse is not
unique.  If the question section in the response is not empty, then the
RR in the answer section is modified to correspond to be an exact copy
of an RR at the first QNAME.

10.3.1.6.4.3. Inverse query processing

Name servers that support inverse queries can support these operations
through exhaustive searches of their databases, but this becomes
impractical as the size of the database increases.  An alternative
approach is to invert the database according to the search key.

For name servers that support multiple zones and a large amount of data,
the recommended approach is separate inversions for each zone.  When a
particular zone is changed during a refresh, only its inversions need to
be redone.

Support for transfer of this type of inversion may be included in future
versions of the domain system, but is not supported in this version.

10.3.1.6.5. Completion queries and responses

The optional completion services described in RFC-882 and RFC-883 have
been deleted.  Redesigned services may become available in the future.













Mockapetris                                                    [Page 42]

RFC 1035        Domain Implementation and Specification    November 1987


10.3.1.7. RESOLVER IMPLEMENTATION

The top levels of the recommended resolver algorithm are discussed in
[RFC-1034].  This section discusses implementation details assuming the
database structure suggested in the name server implementation section
of this memo.

10.3.1.7.1. Transforming a user request into a query

The first step a resolver takes is to transform the client's request,
stated in a format suitable to the local OS, into a search specification
for RRs at a specific name which match a specific QTYPE and QCLASS.
Where possible, the QTYPE and QCLASS should correspond to a single type
and a single class, because this makes the use of cached data much
simpler.  The reason for this is that the presence of data of one type
in a cache doesn't confirm the existence or non-existence of data of
other types, hence the only way to be sure is to consult an
authoritative source.  If QCLASS=* is used, then authoritative answers
won't be available.

Since a resolver must be able to multiplex multiple requests if it is to
perform its function efficiently, each pending request is usually
represented in some block of state information.  This state block will
typically contain:

   - A timestamp indicating the time the request began.
     The timestamp is used to decide whether RRs in the database
     can be used or are out of date.  This timestamp uses the
     absolute time format previously discussed for RR storage in
     zones and caches.  Note that when an RRs TTL indicates a
     relative time, the RR must be timely, since it is part of a
     zone.  When the RR has an absolute time, it is part of a
     cache, and the TTL of the RR is compared against the timestamp
     for the start of the request.

     Note that using the timestamp is superior to using a current
     time, since it allows RRs with TTLs of zero to be entered in
     the cache in the usual manner, but still used by the current
     request, even after intervals of many seconds due to system
     load, query retransmission timeouts, etc.

   - Some sort of parameters to limit the amount of work which will
     be performed for this request.

     The amount of work which a resolver will do in response to a
     client request must be limited to guard against errors in the
     database, such as circular CNAME references, and operational
     problems, such as network partition which prevents the



Mockapetris                                                    [Page 43]

RFC 1035        Domain Implementation and Specification    November 1987


     resolver from accessing the name servers it needs.  While
     local limits on the number of times a resolver will retransmit
     a particular query to a particular name server address are
     essential, the resolver should have a global per-request
     counter to limit work on a single request.  The counter should
     be set to some initial value and decremented whenever the
     resolver performs any action (retransmission timeout,
     retransmission, etc.)  If the counter passes zero, the request
     is terminated with a temporary error.

     Note that if the resolver structure allows one request to
     start others in parallel, such as when the need to access a
     name server for one request causes a parallel resolve for the
     name server's addresses, the spawned request should be started
     with a lower counter.  This prevents circular references in
     the database from starting a chain reaction of resolver
     activity.

   - The SLIST data structure discussed in [RFC-1034].

     This structure keeps track of the state of a request if it
     must wait for answers from foreign name servers.

10.3.1.7.2. Sending the queries

As described in [RFC-1034], the basic task of the resolver is to
formulate a query which will answer the client's request and direct that
query to name servers which can provide the information.  The resolver
will usually only have very strong hints about which servers to ask, in
the form of NS RRs, and may have to revise the query, in response to
CNAMEs, or revise the set of name servers the resolver is asking, in
response to delegation responses which point the resolver to name
servers closer to the desired information.  In addition to the
information requested by the client, the resolver may have to call upon
its own services to determine the address of name servers it wishes to
contact.

In any case, the model used in this memo assumes that the resolver is
multiplexing attention between multiple requests, some from the client,
and some internally generated.  Each request is represented by some
state information, and the desired behavior is that the resolver
transmit queries to name servers in a way that maximizes the probability
that the request is answered, minimizes the time that the request takes,
and avoids excessive transmissions.  The key algorithm uses the state
information of the request to select the next name server address to
query, and also computes a timeout which will cause the next action
should a response not arrive.  The next action will usually be a
transmission to some other server, but may be a temporary error to the



Mockapetris                                                    [Page 44]

RFC 1035        Domain Implementation and Specification    November 1987


client.

The resolver always starts with a list of server names to query (SLIST).
This list will be all NS RRs which correspond to the nearest ancestor
zone that the resolver knows about.  To avoid startup problems, the
resolver should have a set of default servers which it will ask should
it have no current NS RRs which are appropriate.  The resolver then adds
to SLIST all of the known addresses for the name servers, and may start
parallel requests to acquire the addresses of the servers when the
resolver has the name, but no addresses, for the name servers.

To complete initialization of SLIST, the resolver attaches whatever
history information it has to the each address in SLIST.  This will
usually consist of some sort of weighted averages for the response time
of the address, and the batting average of the address (i.e., how often
the address responded at all to the request).  Note that this
information should be kept on a per address basis, rather than on a per
name server basis, because the response time and batting average of a
particular server may vary considerably from address to address.  Note
also that this information is actually specific to a resolver address /
server address pair, so a resolver with multiple addresses may wish to
keep separate histories for each of its addresses.  Part of this step
must deal with addresses which have no such history; in this case an
expected round trip time of 5-10 seconds should be the worst case, with
lower estimates for the same local network, etc.

Note that whenever a delegation is followed, the resolver algorithm
reinitializes SLIST.

The information establishes a partial ranking of the available name
server addresses.  Each time an address is chosen and the state should
be altered to prevent its selection again until all other addresses have
been tried.  The timeout for each transmission should be 50-100% greater
than the average predicted value to allow for variance in response.

Some fine points:

   - The resolver may encounter a situation where no addresses are
     available for any of the name servers named in SLIST, and
     where the servers in the list are precisely those which would
     normally be used to look up their own addresses.  This
     situation typically occurs when the glue address RRs have a
     smaller TTL than the NS RRs marking delegation, or when the
     resolver caches the result of a NS search.  The resolver
     should detect this condition and restart the search at the
     next ancestor zone, or alternatively at the root.





Mockapetris                                                    [Page 45]

RFC 1035        Domain Implementation and Specification    November 1987


   - If a resolver gets a server error or other bizarre response
     from a name server, it should remove it from SLIST, and may
     wish to schedule an immediate transmission to the next
     candidate server address.

10.3.1.7.3. Processing responses

The first step in processing arriving response datagrams is to parse the
response.  This procedure should include:

   - Check the header for reasonableness.  Discard datagrams which
     are queries when responses are expected.

   - Parse the sections of the message, and insure that all RRs are
     correctly formatted.

   - As an optional step, check the TTLs of arriving data looking
     for RRs with excessively long TTLs.  If a RR has an
     excessively long TTL, say greater than 1 week, either discard
     the whole response, or limit all TTLs in the response to 1
     week.

The next step is to match the response to a current resolver request.
The recommended strategy is to do a preliminary matching using the ID
field in the domain header, and then to verify that the question section
corresponds to the information currently desired.  This requires that
the transmission algorithm devote several bits of the domain ID field to
a request identifier of some sort.  This step has several fine points:

   - Some name servers send their responses from different
     addresses than the one used to receive the query.  That is, a
     resolver cannot rely that a response will come from the same
     address which it sent the corresponding query to.  This name
     server bug is typically encountered in UNIX systems.

   - If the resolver retransmits a particular request to a name
     server it should be able to use a response from any of the
     transmissions.  However, if it is using the response to sample
     the round trip time to access the name server, it must be able
     to determine which transmission matches the response (and keep
     transmission times for each outgoing message), or only
     calculate round trip times based on initial transmissions.

   - A name server will occasionally not have a current copy of a
     zone which it should have according to some NS RRs.  The
     resolver should simply remove the name server from the current
     SLIST, and continue.




Mockapetris                                                    [Page 46]

RFC 1035        Domain Implementation and Specification    November 1987


10.3.1.7.4. Using the cache

In general, we expect a resolver to cache all data which it receives in
responses since it may be useful in answering future client requests.
However, there are several types of data which should not be cached:

   - When several RRs of the same type are available for a
     particular owner name, the resolver should either cache them
     all or none at all.  When a response is truncated, and a
     resolver doesn't know whether it has a complete set, it should
     not cache a possibly partial set of RRs.

   - Cached data should never be used in preference to
     authoritative data, so if caching would cause this to happen
     the data should not be cached.

   - The results of an inverse query should not be cached.

   - The results of standard queries where the QNAME contains "*"
     labels if the data might be used to construct wildcards.  The
     reason is that the cache does not necessarily contain existing
     RRs or zone boundary information which is necessary to
     restrict the application of the wildcard RRs.

   - RR data in responses of dubious reliability.  When a resolver
     receives unsolicited responses or RR data other than that
     requested, it should discard it without caching it.  The basic
     implication is that all sanity checks on a packet should be
     performed before any of it is cached.

In a similar vein, when a resolver has a set of RRs for some name in a
response, and wants to cache the RRs, it should check its cache for
already existing RRs.  Depending on the circumstances, either the data
in the response or the cache is preferred, but the two should never be
combined.  If the data in the response is from authoritative data in the
answer section, it is always preferred.

10.3.1.8. MAIL SUPPORT

The domain system defines a standard for mapping mailboxes into domain
names, and two methods for using the mailbox information to derive mail
routing information.  The first method is called mail exchange binding
and the other method is mailbox binding.  The mailbox encoding standard
and mail exchange binding are part of the DNS official protocol, and are
the recommended method for mail routing in the Internet.  Mailbox
binding is an experimental feature which is still under development and
subject to change.




Mockapetris                                                    [Page 47]

RFC 1035        Domain Implementation and Specification    November 1987


The mailbox encoding standard assumes a mailbox name of the form
"<local-part>@<mail-domain>".  While the syntax allowed in each of these
sections varies substantially between the various mail internets, the
preferred syntax for the ARPA Internet is given in [RFC-822].

The DNS encodes the <local-part> as a single label, and encodes the
<mail-domain> as a domain name.  The single label from the <local-part>
is prefaced to the domain name from <mail-domain> to form the domain
name corresponding to the mailbox.  Thus the mailbox HOSTMASTER@SRI-
NIC.ARPA is mapped into the domain name HOSTMASTER.SRI-NIC.ARPA.  If the
<local-part> contains dots or other special characters, its
representation in a master file will require the use of backslash
quoting to ensure that the domain name is properly encoded.  For
example, the mailbox Action.domains@ISI.EDU would be represented as
Action\.domains.ISI.EDU.

10.3.1.8.1. Mail exchange binding

Mail exchange binding uses the <mail-domain> part of a mailbox
specification to determine where mail should be sent.  The <local-part>
is not even consulted.  [RFC-974] specifies this method in detail, and
should be consulted before attempting to use mail exchange support.

One of the advantages of this method is that it decouples mail
destination naming from the hosts used to support mail service, at the
cost of another layer of indirection in the lookup function.  However,
the addition layer should eliminate the need for complicated "%", "!",
etc encodings in <local-part>.

The essence of the method is that the <mail-domain> is used as a domain
name to locate type MX RRs which list hosts willing to accept mail for
<mail-domain>, together with preference values which rank the hosts
according to an order specified by the administrators for <mail-domain>.

In this memo, the <mail-domain> ISI.EDU is used in examples, together
with the hosts VENERA.ISI.EDU and VAXA.ISI.EDU as mail exchanges for
ISI.EDU.  If a mailer had a message for Mockapetris@ISI.EDU, it would
route it by looking up MX RRs for ISI.EDU.  The MX RRs at ISI.EDU name
VENERA.ISI.EDU and VAXA.ISI.EDU, and type A queries can find the host
addresses.

10.3.1.8.2. Mailbox binding (Experimental)

In mailbox binding, the mailer uses the entire mail destination
specification to construct a domain name.  The encoded domain name for
the mailbox is used as the QNAME field in a QTYPE=MAILB query.

Several outcomes are possible for this query:



Mockapetris                                                    [Page 48]

RFC 1035        Domain Implementation and Specification    November 1987


|   1. The query can return a name error indicating that the mailbox
|      does not exist as a domain name.
|
|      In the long term, this would indicate that the specified
|      mailbox doesn't exist.  However, until the use of mailbox
|      binding is universal, this error condition should be
|      interpreted to mean that the organization identified by the
|      global part does not support mailbox binding.  The
|      appropriate procedure is to revert to exchange binding at
|      this point.
|
|   2. The query can return a Mail Rename (MR) RR.
|
|      The MR RR carries new mailbox specification in its RDATA
|      field.  The mailer should replace the old mailbox with the
|      new one and retry the operation.
|
|   3. The query can return a MB RR.
|
|      The MB RR carries a domain name for a host in its RDATA
|      field.  The mailer should deliver the message to that host
|      via whatever protocol is applicable, e.g., b,SMTP.
|
|   4. The query can return one or more Mail Group (MG) RRs.
|
|      This condition means that the mailbox was actually a mailing
|      list or mail group, rather than a single mailbox.  Each MG RR
|      has a RDATA field that identifies a mailbox that is a member
|      of the group.  The mailer should deliver a copy of the
|      message to each member.
|
|   5. The query can return a MB RR as well as one or more MG RRs.

      This condition means the the mailbox was actually a mailing
      list.  The mailer can either deliver the message to the host
      specified by the MB RR, which will in turn do the delivery to
      all members, or the mailer can use the MG RRs to do the
      expansion itself.

In any of these cases, the response may include a Mail Information
(MINFO) RR.  This RR is usually associated with a mail group, but is
legal with a MB.  The MINFO RR identifies two mailboxes.  One of these
identifies a responsible person for the original mailbox name.  This
mailbox should be used for requests to be added to a mail group, etc.
The second mailbox name in the MINFO RR identifies a mailbox that should
receive error messages for mail failures.  This is particularly
appropriate for mailing lists when errors in member names should be
reported to a person other than the one who sends a message to the list.



Mockapetris                                                    [Page 49]

RFC 1035        Domain Implementation and Specification    November 1987


New fields may be added to this RR in the future.


10.3.1.9. REFERENCES and BIBLIOGRAPHY

[Dyer 87]       S. Dyer, F. Hsu, "Hesiod", Project Athena
                Technical Plan - Name Service, April 1987, version 1.9.

                Describes the fundamentals of the Hesiod name service.

[IEN-116]       J. Postel, "Internet Name Server", IEN-116,
                USC/Information Sciences Institute, August 1979.

                A name service obsoleted by the Domain Name System, but
                still in use.

[Quarterman 86] J. Quarterman, and J. Hoskins, "Notable Computer Networks",
                Communications of the ACM, October 1986, volume 29, number
                10.

[RFC-742]       K. Harrenstien, "NAME/FINGER", RFC-742, Network
                Information Center, SRI International, December 1977.

[RFC-768]       J. Postel, "User Datagram Protocol", RFC-768,
                USC/Information Sciences Institute, August 1980.

[RFC-793]       J. Postel, "Transmission Control Protocol", RFC-793,
                USC/Information Sciences Institute, September 1981.

[RFC-799]       D. Mills, "Internet Name Domains", RFC-799, COMSAT,
                September 1981.

                Suggests introduction of a hierarchy in place of a flat
                name space for the Internet.

[RFC-805]       J. Postel, "Computer Mail Meeting Notes", RFC-805,
                USC/Information Sciences Institute, February 1982.

[RFC-810]       E. Feinler, K. Harrenstien, Z. Su, and V. White, "DOD
                Internet Host Table Specification", RFC-810, Network
                Information Center, SRI International, March 1982.

                Obsolete.  See RFC-952.

[RFC-811]       K. Harrenstien, V. White, and E. Feinler, "Hostnames
                Server", RFC-811, Network Information Center, SRI
                International, March 1982.




Mockapetris                                                    [Page 50]

RFC 1035        Domain Implementation and Specification    November 1987


                Obsolete.  See RFC-953.

[RFC-812]       K. Harrenstien, and V. White, "NICNAME/WHOIS", RFC-812,
                Network Information Center, SRI International, March 1982.

[RFC-819]       Z. Su, and J. Postel, "The Domain Naming Convention for
                Internet User Applications", RFC-819, Network
                Information Center, SRI International, August 1982.

                Early thoughts on the design of the domain system.
                Current implementation is completely different.

[RFC-821]       J. Postel, "Simple Mail Transfer Protocol", RFC-821,
                USC/Information Sciences Institute, August 1980.

[RFC-830]       Z. Su, "A Distributed System for Internet Name Service",
                RFC-830, Network Information Center, SRI International,
                October 1982.

                Early thoughts on the design of the domain system.
                Current implementation is completely different.

[RFC-882]       P. Mockapetris, "Domain names - Concepts and
                Facilities," RFC-882, USC/Information Sciences
                Institute, November 1983.

                Superceeded by this memo.

[RFC-883]       P. Mockapetris, "Domain names - Implementation and
                Specification," RFC-883, USC/Information Sciences
                Institute, November 1983.

                Superceeded by this memo.

[RFC-920]       J. Postel and J. Reynolds, "Domain Requirements",
                RFC-920, USC/Information Sciences Institute,
                October 1984.

                Explains the naming scheme for top level domains.

[RFC-952]       K. Harrenstien, M. Stahl, E. Feinler, "DoD Internet Host
                Table Specification", RFC-952, SRI, October 1985.

                Specifies the format of HOSTS.TXT, the host/address
                table replaced by the DNS.





Mockapetris                                                    [Page 51]

RFC 1035        Domain Implementation and Specification    November 1987


[RFC-953]       K. Harrenstien, M. Stahl, E. Feinler, "HOSTNAME Server",
                RFC-953, SRI, October 1985.

                This RFC contains the official specification of the
                hostname server protocol, which is obsoleted by the DNS.
                This TCP based protocol accesses information stored in
                the RFC-952 format, and is used to obtain copies of the
                host table.

[RFC-973]       P. Mockapetris, "Domain System Changes and
                Observations", RFC-973, USC/Information Sciences
                Institute, January 1986.

                Describes changes to RFC-882 and RFC-883 and reasons for
                them.

[RFC-974]       C. Partridge, "Mail routing and the domain system",
                RFC-974, CSNET CIC BBN Labs, January 1986.

                Describes the transition from HOSTS.TXT based mail
                addressing to the more powerful MX system used with the
                domain system.

[RFC-1001]      NetBIOS Working Group, "Protocol standard for a NetBIOS
                service on a TCP/UDP transport: Concepts and Methods",
                RFC-1001, March 1987.

                This RFC and RFC-1002 are a preliminary design for
                NETBIOS on top of TCP/IP which proposes to base NetBIOS
                name service on top of the DNS.

[RFC-1002]      NetBIOS Working Group, "Protocol standard for a NetBIOS
                service on a TCP/UDP transport: Detailed
                Specifications", RFC-1002, March 1987.

[RFC-1010]      J. Reynolds, and J. Postel, "Assigned Numbers", RFC-1010,
                USC/Information Sciences Institute, May 1987.

                Contains socket numbers and mnemonics for host names,
                operating systems, etc.

[RFC-1031]      W. Lazear, "MILNET Name Domain Transition", RFC-1031,
                November 1987.

                Describes a plan for converting the MILNET to the DNS.

[RFC-1032]      M. Stahl, "Establishing a Domain - Guidelines for
                Administrators", RFC-1032, November 1987.



Mockapetris                                                    [Page 52]

RFC 1035        Domain Implementation and Specification    November 1987


                Describes the registration policies used by the NIC to
                administer the top level domains and delegate subzones.

[RFC-1033]      M. Lottor, "Domain Administrators Operations Guide",
                RFC-1033, November 1987.

                A cookbook for domain administrators.

[Solomon 82]    M. Solomon, L. Landweber, and D. Neuhengen, "The CSNET
                Name Server", Computer Networks, vol 6, nr 3, July 1982.

                Describes a name service for CSNET which is independent
                from the DNS and DNS use in the CSNET.






































Mockapetris                                                    [Page 53]

RFC 1035        Domain Implementation and Specification    November 1987


Index

          *   13

          ;   33, 35

          <character-string>   35
          <domain-name>   34

          @   35

          \   35

          A   12

          Byte order   8

          CH   13
          Character case   9
          CLASS   11
          CNAME   12
          Completion   42
          CS   13

          Hesiod   13
          HINFO   12
          HS   13

          IN   13
          IN-ADDR.ARPA domain   22
          Inverse queries   40

          Mailbox names   47
          MB   12
          MD   12
          MF   12
          MG   12
          MINFO   12
          MINIMUM   20
          MR   12
          MX   12

          NS   12
          NULL   12

          Port numbers   32
          Primary server   5
          PTR   12, 18



Mockapetris                                                    [Page 54]

RFC 1035        Domain Implementation and Specification    November 1987


          QCLASS   13
          QTYPE   12

          RDATA   12
          RDLENGTH  11

          Secondary server   5
          SOA   12
          Stub resolvers   7

          TCP   32
          TXT   12
          TYPE   11

          UDP   32

          WKS   12


































Mockapetris                                                    [Page 55]


		10.3.2
	10.4 DNS tcp query timeout troubleshoot


		10.4.1 My examples
306  nslookup amer.acs.com
  307  nslookup  amer.acs.com
  308  nslookup  
  309  telnet a3-adf1.amer.acs.com -p 389
  310  telnet a3-adf1.amer.acs.com 389
  311  nmap a3-adf1.amer.acs.com 
  312  cat /etc/resolv.conf 
  313  nmap <internal-ip>
  314  whois <internal-ip>
  315  locate whois
  316  nslookup <internal-ip>
  317  nc -l <internal-ip> 53
  318  telnet <internal-ip> 53
  319  nc -l <internal-ip> 53
  320  dig <internal-ip> 
  321  dig +tcp <internal-ip> 
  322  dig +tcp canada.north.amer.acs.com
  323  dig +tcp +all canada.north.amer.acs.com
  324  dig +tcp +all canada.north.amer.acs.com ANY
  325  dig +tcp +all canada.north.amer.acs.com SRV
  326  dig +tcp +all canada.north.amer.acs.com SRV,A
  327  dig +tcp +all canada.north.amer.acs.com SRV
  328  dig +tcp +all canada.north.amer.acs.com 
  329  time dig +tcp  canada.north.amer.acs.com 
  330  time dig +tcp +all canada.north.amer.acs.com SRV
  331  time dig +tcp +all @<internal-ip> canada.north.amer.acs.com SRV
  332  time dig +tcp +all @<internal-ip> canada.north.amer.acs.com 

		10.4.2 dig Command
Purpose

DNS lookup utility.
Syntax

dig [@server] [-b address] [-c class] [-f filename] [-k filename] [-p port#] [-q name] [-t type] [-x addr] [-y [hmac:] name:key] [-4] [-6] [name] [type] [class] [queryopt...]

dig [-h]

dig [global-queryopt...] [query...]
Description

The dig (domain information groper) command is a flexible tool for interrogating DNS name servers. It performs DNS lookups and displays the answers that are returned from the queried name server(s). Most DNS administrators use the dig command to troubleshoot DNS problems because of its flexibility, ease of use, and clarity of output. Although dig is normally used with command-line arguments, it also has a batch mode for reading lookup requests from a file. Unlike earlier versions, the BIND9 implementation of dig allows multiple lookups to be issued from the command line. Unless it is told to query a specific name server, the dig command tries each of the servers listed in the /etc/resolv.conf file. If you specify no command line arguments or options, the dig command performs an NS query for "." (the root).

It is possible to set per-user defaults for the dig command through the ${HOME}/.digrc file. The dig command reads this file and applies any options in it before the command line arguments.

The IN and CH class names overlap with the IN and CH top level domains names. When you look up these top level domains, you can either use the -t and -c options to specify the type and class or use the -q option to specify the domain name or use the IN and CH names.
Flags

Item 	Description
-b address 	Sets the source IP address of the query-to address. This must be a valid address on one of the host's network interfaces or "0.0.0.0" or "::". You can specify an optional port by appending "#port".
-c class 	Overrides the default query class (IN for internet). The class parameter value is any valid class, such as HS for Hesiod records or CH for CHAOSNET records.
-f filename 	Makes the dig command operate in batch mode by reading a list of lookup requests to process from the specified file name. The file contains a number of queries; one per line. Each entry in the file must be organized in the same way they are presented as queries to the dig command using the command-line interface.
-h 	Prints a brief summary of command-line arguments and options.
-k filename 	Specifies a TSIG key file using the -k option to sign the DNS queries sent by the dig command.
-p port# 	Queries a non-standard port number. The port# parameter value is the port number that the dig command sends its queries to instead of the standard DNS port number 53. You can use this option to test a name server that has been configured to listen for queries on a non-standard port number.
-q name 	Distinguishes the name from other arguments. Sets the query name to the name parameter value specified.
-t type 	Sets the query type to the type parameter value. It can be any valid query type that is supported in BIND9. The default query type is A, unless the -x option is supplied to indicate a reverse lookup. A zone transfer can be requested by specifying a type of AXFR. When an incremental zone transfer (IXFR) is required, the type parameter value is set to ixfr=N. The incremental zone transfer contains the changes made to the zone because the serial number in the zone's SOA record was N.
-x addr 	Simplifies reverse lookups (mapping addresses to names). The addr parameter value is an IPv4 address in dotted-decimal notation, or a colon-delimited IPv6 address. When you use this option, there is no need to provide the name, class, and type arguments. The dig command automatically performs a lookup for a name like 11.12.13.10.in-addr.arpa and sets the query type and class to PTR and IN respectively.
-y [hmac:] name:key 	Specifies the TSIG key itself on the command line; hmac is the type of the TSIG. The default value is HMAC-MD5. The name parameter value is the name of the TSIG key and the key parameter value is the actual key. The key is a base-64 encoded string, typically generated by dnssec-keygen(8). Caution must be taken when using the -y option on multi-user systems as the key can be visible in the output from ps(1) or in the shell's history file. When using TSIG authentication with the dig command, the name server that is queried needs to know the key and algorithm that is being used. In BIND, this is done by providing appropriate key and server statements in the named.conf file.
-4 	Forces the dig command to only use the IPv4 query transport.
-6 	Forces the dig command to only use the IPv6 query transport.
Parameters
Item 	Description
global-queryopt... 	Global query option (see Multiple Queries).
query 	Query option (see Query Options).
Query Options
The dig command provides a number of query options that affect the way in which lookups are made and the results displayed. Some of these set or reset flag bits in the query header, some determine which sections of the answer get printed, and others determine the timeout and retry strategies. Each query option is identified by a keyword preceded by a plus sign (+). Some keywords set or reset an option. These can be preceded by the string no to negate the meaning of that keyword. Other keywords assign values to options like the timeout interval. They have the form +keyword=value. The query options are:

+[no]tcp
    Use or do not use TCP when querying name servers. The default behavior is to use UDP unless an AXFR or IXFR query is requested, in which case a TCP connection is used. 
+[no]vc
    Use or do not use TCP when querying name servers. This alternate syntax to +[no]tcp is provided for backwards compatibility. The vc stands for virtual circuit. 
+[no]ignore
    Ignore truncation in UDP responses instead of retrying with TCP. By default, TCP retries are performed. 
+domain=somename
    Set the search list to contain the single domain somename, as if specified in a domain directive in the /etc/resolv.conf file, and enable search list processing as if the +search option was given. 
+[no]search
    Use or do not use the search list defined by the search list or domain directive in the /etc/resolv.conf file (if any). The search list is not used by default. 
+[no]defname
    Deprecated, treated as a synonym for +[no]search.
+[no]aaonly
    Sets the "aa" flag in the query.
+[no]adflag
    Set or do not set the AD (authentic data) bit in the query. The AD bit currently has a standard meaning only in responses, not in queries, but the ability to set the bit in the query is provided for completeness. 
+[no]cdflag
    Set or do not set the CD (checking disabled) bit in the query. This requests the server to not perform DNSSEC validation of responses. 
+[no]cl
    Display or do not display the CLASS when printing the record.
+[no]ttlid
    Display or do not display the TTL when printing the record.
+[no]recursive
    Toggle the setting of the RD (recursion desired) bit in the query. This bit is set by default, which means dig normally sends recursive queries. Recursion is automatically disabled when the +nssearch or +trace query options are used. 
+[no]nssearch
    When this option is set, the dig command attempts to find the authoritative name servers for the zone containing the name being looked up and display the SOA record that each name server has for the zone. 
+[no]trace
    Toggle tracing of the delegation path from the root name servers for the name being looked up. Tracing is disabled by default. When tracing is enabled, the dig command makes iterative queries to resolve the name being looked up. It follows referrals from the root servers, showing the answer from each server that was used to resolve the lookup. 
+[no]cmd
    Toggle the printing of the initial comment in the output identifying the version of dig and the query options that have been applied. This comment is printed by default. 
+[no]short
    Provide a terse answer. The default is to print the answer in a verbose form.
+[no]identify
    Show or do not show the IP address and port number that supplied the answer when the +short option is enabled. If short form answers are requested, the default is not to show the source address and port number of the server that provided the answer. 
+[no]comments
    Toggle the display of comment lines in the output. The default is to print comments. 
+[no]stats
    Toggle the printing of statistics: when the query was made, the size of the reply, and so on. The default behavior is to print the query statistics. 
+[no]qr
    Print or do not print the query as it is sent. By default, the query is not printed. 
+[no]question
    Print or do not print the question section of a query when an answer is returned. The default is to print the question section as a comment. 
+[no]answer
    Display or do not display the answer section of a reply. The default is to display it. 
+[no]authority
    Display or do not display the authority section of a reply. The default is to display it. 
+[no]additional
    Display or do not display the additional section of a reply. The default is to display it. 
+[no]all
    Set or clear all display flags. 
+time=T
    Set the timeout for a query to T seconds. The default time out is 5 seconds. An attempt to set the T parameter value to less than 1 results in a query timeout of 1 second being applied. 
+tries=A
    Set the number of times to try UDP queries to server to the A parameter value instead of the default, 3. If the A parameter value is less than or equal to zero, the number of retries is silently rounded up to 1. 
+retry=T
    Set the number of times to retry UDP queries to server to the T parameter value instead of the default, 2. Unlike +tries, this does not include the initial query.
+ndots=D
    Set the number of dots that have to appear in name to the D parameter value as it is considered absolute. The default value is one that is defined using the ndots statement in the /etc/resolv.conf file, or 1 if no ndots statement is present. Names with fewer dots are interpreted as relative names and is searched for in the domains listed in the search or domain directive in the /etc/resolv.conf file. 
+bufsize=B
    Set the UDP message buffer size advertised using EDNS0 to B bytes. The maximum and minimum sizes of this buffer are 65535 and 0, respectively. Values outside of this range are rounded up or down appropriately. Values other than zero cause an EDNS query to be sent.
+edns=#
    Specify the EDNS version to query with. Valid values are 0 to 255. Setting the EDNS version causes a EDNS query to be sent. +noedns clears the remembered EDNS version.
+[no]multiline
    Print records like the SOA records in a verbose multi-line format with human-readable comments. The default is to print each record on a single line to facilitate machine parsing of the dig output. 
+[no]fail
    Do not try the next server if you receive a SERVFAIL. The default is not to try the next server which is the reverse of normal stub resolver behavior.
+[no]besteffort
    Attempt to display the contents of messages that are malformed. The default is not to display malformed answers.
+[no]dnssec
    Request DNSSEC records to be sent by setting the DNSSEC OK bit (DO) in the OPT record in the additional section of the query.
+[no]sigchase
    Chase DNSSEC signature chains. Require the dig command to be compiled with -DDIG SIGCHASE.
+trusted-key=####
    Specify a file containing trusted keys to be used with +sigchase. Each DNSKEY record must be on its own line. If not specified, the dig command looks for the /etc/trusted-key.key file then the trusted-key.key file in the current directory. Require the dig command to be compiled with -DDIG SIGCHASE.
+[no]topdown
    When chasing DNSSEC signature chains, perform a top down validation. Require the dig command to be compiled with -DDIG SIGCHASE.

Multiple Queries

The BIND 9 implementation of dig supports specifying multiple queries on the command line (in addition to supporting the -f batch file option). Each of those queries can be supplied with its own set of flags, options and query options.

In this case, each query argument represents an individual query in the command-line syntax. Each consists of any of the standard options and flags, the name to be looked up, an optional query type, class, and any query options that must be applied to that query.
A global set of query options, which must be applied to all queries, can also be supplied. These global query options must precede the first tuple of name, class, type, options, flags, and query options supplied on the command line. Any global query options (except the +[no]cmd option) can be overridden by a query-specific set of query options. For example:

dig +qr www.isc.org any -x 127.0.0.1 isc.org ns +noqr

This dig command string shows how the dig command could be used from the command line to make three lookups: an ANY query for www.isc.org, a reverse lookup of 127.0.0.1, and a query for the NS records of isc.org. A global query option of +qr is applied, so that the dig command shows the initial query it made for each lookup. The final query has a local query option of +noqr, which means that the dig command does not print the initial query when it looks up the NS records for isc.org.
IDN SUPPORT

If the dig command has been built with internationalized domain name (IDN) support, it can accept and display non-ASCII domain names. The dig command appropriately converts character encoding of domain name before sending a request to the DNS server or displaying a reply from the server. If you would like to turn off the IDN support for some reason, define the IDN DISABLE environment variable; the following IDN support is disabled if the variable is set when the dig command runs.
Examples
A typical invocation of dig looks like:

dig @server name type

where:

server
    The name or IP address of the name server to query. This can be an IPv4 address in dotted-decimal notation or an IPv6 address in colon-delimited notation. When the supplied server argument is a hostname, the dig command resolves that name before querying that name server. If no server argument is provided, the dig command consults the /etc/resolv.conf file and queries the name servers listed there. The reply from the name server that responds is displayed. 
name
    The name of the resource record that is to be looked up.
type
    Indicates what type of query is required — ANY, A, MX, SIG, and so on. The type argument value can be any valid query type. If no type argument is supplied, the dig command performs a lookup for an A record. 

Files
Item 	Description
/etc/resolv.conf 	 
${HOME}/.digrc 	 

		10.4.3
	10.5 Programming


		10.5.1 The RES Library Set
Pro DNS and BIND ->  Chapter 14. BIND APIs and Resolver Libraries > The RES Library Set

The functionality of this set of library calls is controlled by resolv.conf (normally /etc/resolv.conf), whose format and use is described in the section "RES Library Functions" later in the chapter. Additionally, the behavior may be modified by an available structure called _res, which is accessible by the library user.
| 14.4.1. Invoking the RES Library

Each function in this library is contained in libc (GLIBC on FreeBSD), and requires the following #includes in all modules:

#include <sys/types.h>
#include <netinet/in.h>
#include <arpa/nameser.h>
#include <resolv.h>


| 14.4.2. The _res Structure

Although most of the time the default behavior is acceptable, it is possible to modify the behavior of certain operations by manipulating the _res structure, which is contained in resolve.h (normally /usr/include/resolv.h), and is shown in the following code:
Code View: Scroll / Show All

struct __res_state {
 int    retrans;  /* retransmission interval */
 int    retry;  /* no. of retransmits */
 u_long options;  /* option flags */
 int    nscount;        /* number of name servers */

 struct sockaddr_in nsaddr_list[MAXNS];
/* address of name server */
#define nsaddr nsaddr_list[0]
/* for backward compatibility */
 u_short id;  /* current message id */
 char *dnsrch[MAXDNSRCH+1];
/* components of domain to search */
 char defdname[256]; /* default domain (deprecated) */
 u_long pfcode; /* RES_PRF_ flags - see below. */
 unsigned ndots:4;
/* threshold for initial abs. query */
 unsigned nsort:4; /* number of elements in sort_list[] */
 char unused[3];
 struct {
  struct in_addr addr;
  u_int32_t mask;
 } sort_list[MAXRESOLVSORT];
 char pad[72]; /* on an i386 this means 512b total */
};

					  


/* for INET6 */
/*
* replacement of __res_state, separated to
* keep binary compatibility.
*/
struct __res_state_ext {
 struct sockaddr_storage nsaddr_list[MAXNS];
  struct {
  int af;  /* address family for addr, mask */
  union {
  struct in_addr ina;
  struct in6_addr in6a;
  } addr, mask;
 } sort_list[MAXRESOLVSORT];
};


Various flags may be manipulated in the __res_state.options field to control system behavior:


    RES_INIT: Set when the structure has been initialized; that is, when res_init() has been called.

    RES_DEBUG: Display debug information.

    RES_AAONLY: Accept authoritative answers only. When this option is set, res_send() should continue until it finds an authoritative answer or finds an error. Currently, this is not implemented.

    RES_USEVC: Use TCP instead of UDP for queries.

    RES_STAYOPEN: Used with RES_USEVC to keep the TCP connection open between queries.

    RES_IGNTC: Unused currently. Ignore truncation errors; that is, don't retry with TCP.

    RES_RECURSE: Set the recursion-desired bit in queries. This is the default for res_query(), res_search(), and res_send(). If this bit is not set, the functions do not perform iterative queries, and expect the initiator to handle all referrals.

    RES_DEFNAMES: If set, res_search() appends the default domain name (from resolv.conf) to unqualified names (those that do not contain a dot). This option is enabled by default but is only used by res_search().

    RES_DNSRCH: If this option is set, res_search() searches for host names in the current domain and in parent domains. This option is enabled by default.

    RES_NOALIASES: This option turns off the user-level aliasing feature controlled by the 'HOSTALIASES' environment variable. Network daemons should set this option.

    RES_USE_INET6: Enables support for IPv6-only applications. This causes IPv4 addresses to be returned as an IPv4 mapped address. For example, 10.1.1.1 is returned as ::ffff:10.1.1.1 (see Chapter 5).

    RES_USE_EDNS0: Enables support for the OPT meta (pseudo) RR for the EDNS0 extension. With the option set, an OPT pseudo RR is added to the ADDITIONAL SECTION of all queries.

| 14.4.3. RES Library Functions

the res library provides a number of functions, each of which is described in the following sections.
| 14.4.3.1. dn_comp Function

The dn_comp() function converts an ASCII name to a form in which it can be used in a query. Depending on the calling parameters it may also compress a domain name by removing suffixes.

The prototype is as follows:

int dn_comp(const char *exp_dn, u_char *comp_dn, int length,
      u_chaq ar **dnptrs, u_char **lastdnptr);


Where

    The function returns the length of the compressed name, or −1 if an error occurs.

    exp_dn is a pointer to the name that needs to be compressed.

    comp_dn is a pointer to a buffer to contain the compressed name.

    length is the length of the comp_dn buffer.

    dnptrs is a pointer to an array of pointers that contain previous names in the query, which we'll call the compressed list array for ease of explanation. If dnptrs is NULL, then only conversion to uncompressed label format is performed (see the section "Name Field Format" in Chapter 15). However, if the value of dnptrs and lastdnptr is initialized to the address of the compressed list array, and the initial entry in the compressed list array is set to NULL, then the function dn_comp() will use the compressed list array as a list of name pointers that may be examined when searching for suffix compression possibilities. As each name is added, the dn_comp() function adds its pointer to the compressed list array, and lastdnptr is updated to point to the last entry in the compressed list array.

    lastdnptr is an address pointer that points to the last valid entry in the dnptrs array, and is updated on termination of the function. If lastdnptr is set to NULL, then the compressed list array is not updated.

| 14.4.3.2. dn_expand Function

The dn_expand() entry expands a compressed domain name returned in a query message.

The prototype is as follows:

int dn_expand(const u_char *msg, const u_char *eomorig,
      const u_char *comp_dn, char *exp_dn, int length);


Where

    The function returns the length of the expanded name supplied, or −1 if an error occurs.

    msg points to the buffer that contains the messages returned from a res_send(), res_query(), or res_search() function.

    eomorig is a pointer to the end of the query message, whose start is pointered to by msg, and which contains the name to be expanded.

    comp_dn is a pointer to the beginning of the name to be expanded.

    exp_dn is a pointer to a buffer that contains the expanded name on termination of the function.

    length is the size of the buffer exp_dn, and should be big enough to contain the largest possible expanded name.

| 14.4.3.3. dn_skipname Function

The dn_skipname() function skips over a compressed domain name in a query response and can be used to step through a message. By adding the returned value to a current pointer, an application can move through, or parse, a returned query.

The prototype is as follows:

int dn_skipname(const u_char *comp_dn, const u_char *eom);


Where

    The size of the compressed name is returned, or −1 if there is an error.

    comp_dn is a pointer to the beginning of the name to be skipped.

    eom is a pointer to the end of the query message containing the name to be skipped.

| 14.4.3.4. ns_get16 Function

The ns_get16() function gets a 16-bit quantity from a buffer pointed to by src.

The prototype is as follows:

u_int ns_get16(const u_char *src);


| 14.4.3.5. ns_get32 Function

The ns_get32() function gets a 32-bit quantity from a buffer pointed to by src.

The prototype is as follows:

u_long ns_get32(const u_char *src);


| 14.4.3.6. ns_put16 Function

The ns_put16() function puts a 16-bit quantity, src, into the buffer pointed to by dst.

The prototype is as follows:

void ns_put16(u_int src, u_char *dst);


| 14.4.3.7. ns_put32 Function

The ns_put32() function puts a 32-bit quantity, src, into the buffer pointed to by dst.

The prototype is as follows:

void ns_put32(u_long src, u_char *dst);


| 14.4.3.8. res_init() Function

res_init() reads resolv.conf to obtain the default domain name, search list, and the IP address(es) of the local name server(s). This function call should be issued first to initialize all necessary variables. However, if this is not done, it is called automatically by the res_send(), res_query(), or res_search() functions. On completion of this function RES_INIT is set.

The prototype is as follows:

int res_init();


The function takes no parameters, but returns 0 on success or −1 if there was insufficient memory or any other error.
| 14.4.3.9. res_mkquery Function

The res_mkquery() function constructs a standard query message in a user-supplied buffer, but does not send it. Instead, the res_send() function must be called to dispatch the query.

The prototype is as follows:

int res_mkquery(int op, const char *dname, int class,
      int type, const u_char *data, int datalen,
      const u_char *newrr_in, u_char *buf, int buflen);


Where

    The function returns the length of the created query or −1 if an error occurs.

    op is the type of operation required, and is normally set to QUERY (see Chapter 15).

    dname is a pointer to a null-terminated string containing the fully qualified name (FQDN) to be used in the query; for instance, "www.example.com."

    class is the binary value of the class type; for example, the value 1 is IN (Internet class).

    type is the binary value of the required RR type, including ANY (type = 255).

    data: Historical use with inverse queries (now obsoleted) should be set to NULL.

    datalen: Historical use with inverse queries should be set to 0.

    newrr_in is intended for use with DDNS, and is not currently supported.

    buf is a pointer to a buffer that contains the created query.

    buflen is the length of the query buffer, and should be long enough to contain the largest possible query.

| 14.4.3.10. res_query Function

The res_query() function takes the supplied parameters, automatically constructs a query, and awaits the reply. It bypasses any rules defined by RES_DEFNAMES and RES_DNSRCH. Thus, all supplied names should be fully qualified (FQDNs). It calls res_init() if RES_INIT is not set.

The prototype is as follows:

int res_query(const char *dname, int class, int type,
     u_char *answer, int anslen);


Where

    The function returns the length of the response or −1 if an error occurs.

    dname is a pointer to a null-terminated string containing the fully qualified name to be used in the query; for instance, www.example.com.

    class is the binary value of the class type; for example, the value 1 is IN (Internet class).

    type is the binary value of the required RR type, including ANY (type = 255).

    answer is a pointer to a buffer that contains the query response.

    anslen is the length of the answer buffer, and should be long enough to contain the largest possible response.

| 14.4.3.11. res_search Function

The res_search() function takes the supplied parameters and automatically constructs a query and awaits the reply, like res_query(). However, in addition, it implements the default name and search rules controlled by the RES_DEFNAMES and RES_DNSRCH options. It calls res_init() if RES_INIT is not set. It returns the first successful reply.

The prototype is as follows:

int res_search(const char *dname, int class, int type,
     u_char *answer, int anslen);


Where

    The function returns the length of the response, or −1 if an error occurs.

    dname is a pointer to a null-terminated string containing the FQDN or an unqualified name to be used in the query; for instance, "www".

    class is a binary value of the class type. For example, the value 1 is IN (Internet class).

    type is the binary value of the required RR type, including ANY (type = 255).

    answer is a pointer to a buffer to contain the response.

    anslen is the length of the answer buffer, and should be long enough to contain the largest possible response.

| 14.4.3.12. res_send Function

The res_send() function sends a preformatted query, typically created with res_mkquery(), and returns an answer. It calls res_init() if RES_INIT is not set, sends the query to the local name server, and handles timeouts and retries.

The prototype is as follows:

int res_send(const u_char *msg, int msglen, u_char *answer,
      int anslen);


Where

    The function returns the length of the reply message, or −1 if there were errors.

    msg is a pointer to the buffer containing the query.

    msglen is the length of the query in bytes.

    answer is a pointer to a buffer that contains the answer.

    anslen is the length of the buffer allocated to contain the answer, and should be large enough to contain the maximum size of the expected response.

		10.5.2 res_mkquery(3) - Linux man page
Name
res_init, res_query, res_search, res_querydomain, res_mkquery, res_send, dn_comp, dn_expand - resolver routines
Synopsis

#include <netinet/in.h>#include <arpa/nameser.h>#include <resolv.h>extern struct
state _res;
int res_init(void);
int res_query(const char *dname, int class, int type,unsigned char *answer,
int anslen);
int res_search(const char *dname, int class, int type,unsigned char *answer,
int anslen);
int res_querydomain(const char *name, const char *domain,int class, int
type, unsigned char *answer,int anslen);
int res_mkquery(int op, const char *dname, int class,int type, char *data,
int datalen, struct rrec *newrr,char *buf, int buflen);
int res_send(const char *msg, int msglen, char *answer,int anslen);
int dn_comp(unsigned char *exp_dn, unsigned char *comp_dn,int length, unsigned
char **dnptrs, unsigned char **lastdnptr);
int dn_expand(unsigned char *msg, unsigned char *eomorig,unsigned char
*comp_dn, char *exp_dn,int length);

Link with -lresolv.
Description
These functions make queries to and interpret the responses from Internet domain name servers.

The res_init() function reads the configuration files (see resolv.conf(5)) to get the default domain name, search order and name server address(es). If no server is given, the local host is tried. If no domain is given, that associated with the local host is used. It can be overridden with the environment variable LOCALDOMAIN. res_init() is normally executed by the first call to one of the other functions.

The res_query() function queries the name server for the fully qualified domain name name of specified type and class. The reply is left in the buffer answer of length anslen supplied by the caller.

The res_search() function makes a query and waits for the response like res_query(), but in addition implements the default and search rules controlled by RES_DEFNAMES and RES_DNSRCH (see description of _res options below).

The res_querydomain() function makes a query using res_query() on the concatenation of name and domain.

The following functions are lower-level routines used by res_query().

The res_mkquery() function constructs a query message in buf of length buflen for the domain name dname. The query type op is usually QUERY, but can be any of the types defined in <arpa/nameser.h>. newrr is currently unused.

The res_send() function sends a preformatted query given in msg of length msglen and returns the answer in answer which is of length anslen. It will call res_init(), if it has not already been called.

The dn_comp() function compresses the domain name exp_dn and stores it in the buffer comp_dn of length length. The compression uses an array of pointers dnptrs to previously compressed names in the current message. The first pointer points to the beginning of the message and the list ends with NULL. The limit of the array is specified by lastdnptr. If dnptr is NULL, domain names are not compressed. If lastdnptr is NULL, the list of labels is not updated.

The dn_expand() function expands the compressed domain name comp_dn to a full domain name, which is placed in the buffer exp_dn of size length. The compressed name is contained in a query or reply message, and msg points to the beginning of the message.

The resolver routines use global configuration and state information contained in the structure _res, which is defined in <resolv.h>. The only field that is normally manipulated by the user is _res.options. This field can contain the bitwise "OR" of the following options:

RES_INIT
    True if res_init() has been called. 
RES_DEBUG
    Print debugging messages. This option is only available if glibc was built with debugging enabled, which is not the default. 
RES_AAONLY
    Accept authoritative answers only. res_send() continues until it finds an authoritative answer or returns an error. [Not currently implemented]. 
RES_USEVC
    Use TCP connections for queries rather than UDP datagrams. 
RES_PRIMARY
    Query primary domain name server only. 
RES_IGNTC
    Ignore truncation errors. Don't retry with TCP. [Not currently implemented]. 
RES_RECURSE
    Set the recursion desired bit in queries. Recursion is carried out by the domain name server, not by res_send(). [Enabled by default]. 
RES_DEFNAMES
    If set, res_search() will append the default domain name to single component names, i.e., those that do not contain a dot. [Enabled by default]. 
RES_STAYOPEN
    Used with RES_USEVC to keep the TCP connection open between queries. 
RES_DNSRCH
    If set, res_search() will search for hostnames in the current domain and in parent domains. This option is used by gethostbyname(3). [Enabled by default].

This list is not complete. You can find some other flags described in resolv.conf(5).
Return Value
The res_init() function returns 0 on success, or -1 if an error occurs.

The res_query(), res_search(), res_querydomain(), res_mkquery() and res_send() functions return the length of the response, or -1 if an error occurs.

The dn_comp() and dn_expand() functions return the length of the compressed name, or -1 if an error occurs.
Files

/etc/resolv.conf          resolver configuration file
/etc/host.conf            resolver configuration file

Conforming to 4.3BSD.
See Also
gethostbyname(3), resolv.conf(5), resolver(5), hostname(7), named(8)
die.net

    site search Google Custom Search

Library
    linux docs
    linux man pages
    online dictionary
    page load time

Toys
    world sunlight
    moon phase
    trace explorer

Back

		10.5.3 C Programming with the Resolver Library Routines
DNS and BIND, Fifth Edition - Chapter 15. Programming with the Resolve... > C Programming with the Resolver Libr...
| 15.2. C Programming with the Resolver Library Routines

Before writing any code, though, you need to be familiar with the DNS message format and the resolver library routines. In the shell script we just wrote, nslookup parsed the DNS message. In a C program, though, you have to do the parsing. Let's start this section on programming by looking at the DNS message format.
| 15.2.1. DNS Message Format

You've seen the DNS message format before, in Chapter 12. It looks like this:

    Header section

    Question section

    Answer section

    Authority section

    Additional section

The format of the header section is described in RFC 1035 on pages 26–28, and in Appendix A of this book. It looks like this:

query identification number (2 octets)
query response (1 bit)
opcode (4 bits)
authoritative answer (1 bit)
truncation (1 bit)
recursion desired (1 bit)
recursion available (1 bit)
reserved (3 bits)
response code (4 bits)
question count (2 octets)
answer record count (2 octets)
name server record count (2 octets)
additional record count (2 octets)


You'll also find opcode, response code, type, and class values defined in arpa/nameser.h, as well as routines to extract this information from a message. We'll discuss these routines, part of the nameserver library, shortly.

The question section is described on pages 28–29 of RFC 1035. It looks like this:

domain name (variable length)
query type (2 octets)
query class (2 octets)


The answer, authority, and additional sections are described on pages 29–30 of RFC 1035. These sections comprise some number of resource records that look like this:

domain name (variable length)
type (2 octets)
class (2 octets)
TTL (4 octets)
resource data length (2 octets)
resource data (variable length)


The header section contains a count of how many of these resource records are in each section.
| 15.2.2. Domain Name Storage

As you can see, the names stored in the DNS message are of variable length. Unlike C, DNS does not store the names as null-terminated strings. Domain names are stored as a series of length/value pairs ending with an octet of 0. Each label in a domain name is composed of a length octet and a label. A name like venera.isi.edu is stored as:

6 venera  3  isi  3 edu 0


You can imagine how much of a DNS message could be devoted to storing names. The developers of DNS recognized this and came up with a simple way to compress domain names.
| 15.2.3. Domain Name Compression

Often, an entire domain name or, at least, the trailing labels of a domain name match a name already stored in the message. Domain name compression eliminates the repetition of domain names by storing a pointer to the earlier occurrence of the name instead of inserting the name again. Here is how it works. Suppose a response message already contains the name venera.isi.edu. If the name vaxa.isi.edu is added to the response, the label vaxa is stored, and then a pointer to the earlier occurrence of isi.edu is added. So how are these pointers implemented?

The first two bits of the length octet indicate whether a length/label pair or a pointer to a length/label pair follows. If the first two bits are zeros, then the length and label follow. As you may remember from way back in Chapter 2, a label is limited to 63 characters. That's because the length field has only the remaining six bits for the length of the label—enough to represent the lengths 0-63. If the first two bits of the length octet are ones, then what follows is not a length but a pointer. The pointer is the last 6 bits of the length octet and the next octet—14 bits in total. The pointer is an offset from the start of the DNS message. Now, when vaxa.isi.edu is compressed into a buffer containing only venera.isi.edu, this is what results:

 byte offset: 0 123456 7 890 1 234 5 6 7890 1    2
               -------------+--------------+--------
pkt contents: 6 venera 3 isi 3 edu 0 4 vaxa 0xC0 7


The 0xC0 is a byte with the high two bits ones and the rest of the bits zeros. Since the high two bits are ones, this is a pointer instead of a length. The pointer value is 7: the last six bits of the first octet are zeros and the second octet is 7. At offset seven in this buffer, you find the rest of the domain name that begins with vaxa, which is isi.edu.

In this example, we only showed the compression in two domain names in a buffer, not a whole DNS message. A DNS message would have had a header as well as other fields. This example is intended only to give you an idea of how the domain name compression works. Now the good news: you don't really need to care how names are compressed as long as the library routines do it properly. What you do need to know is how parsing a DNS response message can get messed up if you are off by one byte. For example, try to expand the name starting with byte two instead of byte one. You'll discover that "v" doesn't make a very good length octet or pointer.
| 15.2.4. The Resolver Library Routines

The resolver library contains the routines that you need to write your application. You'll use these routines to generate queries. You'll use the nameserver library routines, explained next, to parse the response.

In case you're wondering why we're not using the BIND 9 resolver routines in our code, BIND 9 includes library routines to perform lots of powerful DNS functions, but they're oriented toward the BIND 9 nameserver's needs and are very complicated to use, we're told. BIND 9 includes the BIND 8 resolver in lib/bind/resolv and we will continue to use that for now. A program linked against the BIND 8 library routines will work just fine with a BIND 9 nameserver.

Here are the header files you must include:

#include <sys/types.h>
#include <netinet/in.h>
#include <arpa/nameser.h>
#include <resolv.h>


Now let's look at the resolver library routines.
| 15.2.4.1. herror and h_errno

extern int h_errno;
int herror(const char *s)


herror is a routine like perror, except that it prints out a string based on the value of the external variable h_errno instead of errno. The only argument is:


s

    A string used to identify the error message. If a string s is supplied, it is printed first, followed by ":" and a string based on the value of h_errno.

Here are the possible values of h_errno:


HOST_NOT_FOUND

    The domain name does not exist. The return code in the nameserver response was NXDOMAIN.

TRY_AGAIN

    Either the nameserver is not running, or the nameserver returned SERVFAIL.

NO_RECOVERY

    Either the domain name could not be compressed because it was an invalid domain name (e.g., a name missing a label—..movie.edu) or the nameserver returned FORMERR, NOTIMP, or REFUSED.

NO_DATA

    The domain name exists, but there is no data of the requested type.

NETDB_INTERNAL

    There was a library error unrelated to the network or name service. Instead, see errno for the problem description.

| 15.2.4.2. res_init

int res_init(void)


res_init reads resolv.conf and initializes a data structure called _res (more about that later). All the previously discussed routines will call res_init if they detect that it hasn't been called previously. Or you can call it on your own; this is useful if you want to change some of the defaults before calling the first resolver library routine. If there are any lines in resolv.conf that res_init doesn't understand, it ignores them. res_init always returns 0, even if the manpage reserves the right to return -1.
| 15.2.4.3. res_mkquery

int res_mkquery(int op,
                const char *dname,
                int class,
                int type,
                const u_char *data,
                int datalen,
                const u_char *newrr,
                u_char *buf,
                int buflen)


res_mkquery creates the query message. It fills in all the header fields, compresses the domain name into the question section, and fills in the other question fields.

The dname, class, and type arguments are the same as for res_search and res_query. The remaining arguments are:


op

    The "operation" to be performed. This is normally QUERY, but it can be IQUERY (inverse query). However, as we've explained before, IQUERY is seldom used. BIND versions 4.9.4 and later, by default, do not even support IQUERY.

data

    A buffer containing the data for inverse queries. It is NULL when op is QUERY.

datalen

    The size of the data buffer. If data is NULL, then datalen is 0.

newrr

    A buffer used for the dynamic update code (covered in Chapter 10). Unless you are playing with this feature, it is always NULL.

buf

    A buffer in which res_mkquery places the query message. It should be PACKETSZ or larger, like the answer buffer in res_search and res_query.

buflen

    The size of the buf buffer (e.g., PACKETSZ).

res_mkquery returns the size of the query message or -1 if there was an error.
| 15.2.4.4. res_query

int res_query(const char *dname,
              int class,
              int type,
              u_char *answer,
              int anslen)


res_query is one of the "mid-level" resolver routines. It does all the real work in looking up the domain name: it makes a query message by calling res_mkquery, sends the query by calling res_send, and looks at enough of the response to determine whether your question was answered. In many cases, res_query is called by res_search, which just feeds it the different domain names to look up. As you'd expect, these two functions have the same arguments. res_query returns the size of the response, or it fills in h_errno and returns -1 if there was an error or the answer count was 0.
| 15.2.4.5. res_search

int res_search(const char *dname,
               int class,
               int type,
               u_char *answer,
               int anslen)


res_search is the "highest level" resolver routine, and is called by gethostbyname. res_search applies the search algorithm to the domain name passed to it. That is, it takes the domain name it receives (dname), "completes" the name (if it's not fully qualified) by adding the various domain names from the resolver search list, and calls res_query until it receives a successful response, indicating that it found a valid, fully qualified domain name. In addition to implementing the search algorithm, res_search looks in the file referenced by your HOSTALIASES environment variable. (The HOSTALIASES variable was described in Chapter 6.) So it also takes care of any "private" host aliases you might have. res_search returns the size of the response or fills in h_errno and returns -1 if there was an error or the answer count is 0. (h_errno is like errno, but for DNS lookups.)

Therefore, the only parameter that's really of interest to res_search is dname; the others are just passed through to res_query and the other resolver routines. The other arguments are:


class

    The class of the data you're looking up. This is almost always the constant C_IN, the Internet class. The class constants are defined in arpa/nameser.h.

type

    The type of data you're looking up. Again, this is a constant defined in arpa/ nameser.h. A typical value would be T_NS to retrieve a nameserver record, or T_MX to retrieve an MX record.

answer

    A buffer in which res_search will place the response message. Its size should be at least PACKETSZ (from arpa/nameser.h) bytes.

anslen

    The size of the answer buffer (e.g., PACKETSZ).

res_search returns the size of the response or -1 if there was an error.
| 15.2.4.6. res_send

int res_send(const u_char *msg,
             int msglen,
             u_char *answer,
             int anslen)


res_send implements the retry algorithm. It sends the query message, msg, in a UDP datagram, but it can also send it over a TCP stream. The response message is stored in answer. This routine, of all the resolver routines, is the only one to use black magic (unless you know all about connected datagram sockets). You've seen these arguments before in the other resolver routines:


msg

    The buffer containing the DNS query message

msglen

    The size of the message

answer

    The buffer in which to store the DNS response message

anslen

    The size of the answer message

res_send returns the size of the response or -1 if there was an error. If this routine returns -1 and errno is ECONNREFUSED, then there is no nameserver running on the target nameserver host.

You can look at errno to see if it is ECONNREFUSED after calling res_search or res_query. (res_search calls res_query, which calls res_send.) If you want to check errno after calling res_query, clear errno first. That way, you know the current call to res_send was the one that set errno. However, you don't have to clear errno before calling res_search. res_search clears errno itself before calling res_query.
| 15.2.5. The _res Structure

Each resolver routine (i.e., each routine whose name starts with res_) uses a common data structure called _res. You can change the behavior of the resolver routines by changing _res. If you want to change the number of times res_send retries a query, you can change the value of the retry field. If you want to turn off the resolver search algorithm, you turn off the RES_DNSRCH bit from the options mask. You'll find the all-important _res structure in resolv.h:

struct _  _res_state {
    int      retrans;   /* retransmission time interval */
    int      retry;     /* number of times to retransmit */
    u_long   options;   /* option flags - see below. */
    int      nscount;   /* number of name servers */
    struct sockaddr_in
             nsaddr_list[MAXNS];   /* address of name server */
#define nsaddr nsaddr_list[0]      /* for backward compatibility */
    u_short id;                    /* current packet id */
    char     *dnsrch[MAXDNSRCH+1]; /* components of domain to search */
    char     defdname[MAXDNAME];   /* default domain */
    u_long   pfcode;               /* RES_PRF_ flags - see below. */
    unsigned ndots:4;              /* threshold for initial abs. query */
    unsigned nsort:4;              /* number of elements in sort_list[] */
    char     unused[3];
    struct {
           struct in_addr  addr;   /* address to sort on */
           u_int32_t       mask;
    } sort_list[MAXRESOLVSORT];
};


The options field is a simple bit mask of the enabled options. To turn on a feature, turn on the corresponding bit in the options field. Bit masks for each of the options are defined in resolv.h; the options are:


RES_INIT

    If this bit is on, res_init has been called.

RES_DEBUG

    This bit causes resolver debugging messages to be printed—if the resolver routines were compiled with DEBUG, that is. Off is the default.

RES_AAONLY

    Requires the answer to be authoritative, not from a nameserver's cache. It's too bad this isn't implemented, as it would be a useful feature. Given the BIND resolver's design, this feature would have to be implemented in the nameserver, and it's not.

RES_PRIMARY

    Query the primary master nameserver only—again, not implemented.

RES_USEVC

    Turn on this bit if you'd like the resolver to make its queries over a virtual circuit (TCP) connection instead of with UDP datagrams. As you might guess, there is a performance penalty for setting up and tearing down a TCP connection. Off is the default.

RES_STAYOPEN

    If you are making your queries over a TCP connection, turning on this bit causes the connection to be left open, so you can use it to query the same remote nameserver again. Otherwise, the connection is torn down after the query has been answered. Off is the default.

RES_IGNTC

    If the nameserver response has the truncation bit set, then the default resolver behavior is to retry the query using TCP. If this bit is turned on, the truncation bit in the response message is ignored, and the query is not retried using TCP. Off is the default.

RES_RECURSE

    The default behavior for the BIND resolver is to send recursive queries. Turning off this bit turns off the "recursion desired" bit in the query message. On is the default.

RES_DEFNAMES

    The default behavior for the BIND resolver is to append the local domain name to any domain name that does not have a dot in it. Turning off this bit turns off appending the local domain name. On is the default.

RES_DNSRCH

    The default behavior for the BIND resolver is to append each element of the search list to a domain name that does not end in a dot. Turning off this bit turns off the search list function. On is the default.

RES_INSECURE1

    The default behavior for a 4.9.3 or later BIND resolver is to ignore answers from nameservers that were not queried. Turning on this bit disables this security check. Off (i.e., security check on) is the default.

RES_INSECURE2

    The default behavior for a 4.9.3 or later BIND resolver is to ignore answers in which the question section of the response does not match the question section of the original query. Turning on this bit disables this security check. Off (i.e., security check on) is the default.

RES_NOALIASES

    The default behavior for the BIND resolver is to use aliases defined in the file specified by the user's HOSTALIASES environment variable. Turning on this bit disables the HOSTALIASES feature for 4.9.3 and later BIND resolvers. Previous resolvers did not allow this feature to be disabled. Off is the default.

RES_USE_INET6

    Tells the resolver to return IPv6 addresses (in addition to IPv4 addresses) to the gethostbyname function.

RES_ROTATE

    Normally, a resolver that sends repeated queries always queries the first nameserver in resolv.conf first. With RES_ROTATE set, a BIND 8.2 or later resolver sends its first query to the first nameserver in resolv.conf, its second to the second nameserver, and so on. (See the options rotate directive in Chapter 6 for details.) The default is not to rotate nameservers.

RES_NOCHECKNAME

    Since BIND 4.9.4, resolvers have checked the domain names in responses to make sure they conform to the naming guidelines described in Chapter 4. BIND 8.2 resolvers offer the option of turning off the name-checking mechanism. Off (i.e., name check on) is the default.

RES_KEEPTSIG

    This option tells a BIND 8.2 or later resolver not to strip the TSIG record from a signed DNS message. This way, the application that called the resolver can examine it.

RES_BLAST

    "Blast" all recursive servers by sending queries to them simultaneously. Not implemented yet.

RES_DEFAULT

    This isn't a single option, but rather a combination of the RES_RECURSE, RES_DEFNAMES, and RES_DNSRCH options, all of which are on by default. You normally won't need to set RES_DEFAULT explicitly; it's set for you when you call res_init.

| 15.2.6. The Nameserver Library Routines

The nameserver library contains routines you need to parse response messages. Here are the header files you must include:

#include <sys/types.h>
#include <netinet/in.h>
#include <netdb.h>
#include <arpa/nameser.h>
#include <resolv.h>


Following are the nameserver library routines.
| 15.2.6.1. ns_get16 and ns_put16

u_int ns_get16(const u_char *cp)
void  ns_put16(u_int s, u_char *cp)


The DNS messages have fields that are unsigned short integer (type, class, and data length, to name a few). ns_get16 returns a 16-bit integer pointed to by cp, and ns_put16 assigns the 16-bit value of s to the location pointed to by cp.
| 15.2.6.2. ns_get32 and ns_put32

u_long ns_get32(const u_char *cp)
void   ns_put32(u_long l, u_char *cp)


These routines are like their 16-bit counterparts except that they deal with a 32-bit integer instead of a 16-bit integer. The TTL (time to live) field of a resource record is a 32-bit integer.
| 15.2.6.3. ns_initparse

int ns_initparse(const u_char *msg,
                  int msglen,
                  ns_msg *handle)


ns_initparse is the first routine you must call before you use the other nameserver library routines. ns_initparse fills in the data structure pointed to by handle, which is a parameter passed to other routines. The arguments are:


msg

    A pointer to the beginning of the response message buffer

msglen

    The size of the message buffer

handle

    A pointer to a data structure filled in by ns_initparse

ns_initparse returns 0 on success and -1 if it fails to parse the message buffer.
| 15.2.6.4. ns_msg_base, ns_msg_end, and ns_msg_size

const u_char *ns_msg_base(ns_msg handle)
const u_char *ns_msg_end(ns_msg handle)
int ns_msg_size(ns_msg handle)


These routines return a pointer to the start of the message, a pointer to the end of the message, and the size of the message. They return the data you passed into ns_initparse. The only argument is:


handle

    A data structure filled in by ns_initparse

| 15.2.6.5. ns_msg_count

u_int16_t ns_msg_count(ns_msg handle, ns_sect section)


ns_msg_count returns a counter from the header section of the response message. Its arguments are:


handle

    A data structure filled in by ns_initparse

section

    An enumerated type that can have the following values:

    ns_s_qd  /* Query: Question section */
    ns_s_zn  /* Update: Zone section */
    ns_s_an  /* Query: Answer section */
    ns_s_pr  /* Update: Prerequisite section */
    ns_s_ns  /* Query: Name Server section */
    ns_s_ud  /* Update: Update section */
    ns_s_ar  /* Query|Update: Additional records section */


| 15.2.6.6. ns_msg_get_flag

u_int16_t ns_msg_get_flag(ns_msg handle, ns_flag flag)


ns_msg _ get_ flag returns the "flag" fields from the header section of the response message. Its arguments are:


handle

    A data structure filled in by ns_initparse

flag

    An enumerated type that can have the following values:

    ns_f_qr     /* Question/Response */
    ns_f_opcode /* Operation Code */
    ns_f_aa     /* Authoritative Answer */
    ns_f_tc     /* Truncation Occurred */
    ns_f_rd     /* Recursion Desired */
    ns_f_ra     /* Recursion Available */
    ns_f_z      /* Must Be Zero */
    ns_f_ad     /* Authentic Data (DNSSEC) */
    ns_f_cd     /* Checking Disabled (DNSSEC) */
    ns_f_rcode  /* Response Code */
    ns_f_max


| 15.2.6.7. ns_msg_id

u_int16_t ns_msg_id(ns_msg handle)


ns_msg _id returns the identification from the header section (described earlier) of the response message. The only argument is:


handle

    A data structure filled in by ns_initparse

| 15.2.6.8. ns_name_compress

int ns_name_compress(const char *exp_dn,
                     u_char *comp_dn,
                     size_t length,
                     const u_char **dnptrs,
                     const u_char **lastdnptr)


ns_name_compress compresses a domain name. You won't normally call this routine yourself—you'll let res_mkquery do it for you. However, if you need to compress a name for some reason, this is the tool to do it. The arguments are:


exp_dn

    The "expanded" domain name that you supply—i.e., a normal, null-terminated string containing a fully qualified domain name.

comp_dn

    The place where ns_name_compress will store the compressed domain name.

length

    The size of the comp_dn buffer.

dnptrs

    An array of pointers to previously compressed domain names. dnptrs[0] points to the beginning of the message; the list ends with a NULL pointer. After you've initialized dnptrs[0] to the beginning of the message and dnptrs[1] to NULL, dn_comp updates the list each time you call it.

lastdnptr

    A pointer to the end of the dnptrs array. ns_name_compress needs to know where the end of the array is so it doesn't overrun it.

If you want to use this routine, look at how it is used in the BIND source in src/lib/resolv/res_mkquery.c (BIND 8) or res/res_mkquery.c (BIND 4). It's often easier to see how to use a routine from an example than from an explanation. ns_name_compress returns the size of the compressed name or -1 if there was an error.
| 15.2.6.9. ns_name_skip

int ns_name_skip(const u_char **ptrptr, const u_char *eom)


ns_name_skip is like ns_name_uncompress, but instead of uncompressing the name, it just skips over it. The arguments are:


ptrptr

    A pointer to a pointer to the name to skip over. The original pointer is advanced past the name.

eom

    A pointer to the first byte after the message. It is used to make sure that ns_name_skip doesn't go past the end of the message.

ns_name_skip returns 0 if successful. It returns -1 if it fails to uncompress the name.
| 15.2.6.10. ns_name_uncompress

int ns_name_uncompress(const u_char *msg,
                       const u_char *eomorig,
                       const u_char *comp_dn,
                       char *exp_dn,
                       size_t length)


ns_name_uncompress expands a "compressed" domain name. You'll use this routine if you parse a nameserver response message, as we do in check_soa, the C program that follows. The arguments are:


msg

    A pointer to the beginning of your response message.

eomorig

    A pointer to the first byte after the message. It is used to make sure that ns_name_uncompress doesn't go past the end of the message.

comp_dn

    A pointer to the compressed domain name within the message.

exp_dn

    The place where ns_name_uncompress will store the expanded name. You should always allocate an array of MAXDNAME characters for the expanded name.

length

    The size of the exp_dn buffer.

ns_name_uncompress returns the size of the compressed name or -1 if there was an error. You might wonder why ns_name_uncompress returns the size of the compressed name, not the size of the expanded name. It does this because when you call ns_name_uncompress, you are parsing a DNS message and need to know how much space the compressed name occupied in the message so that you can skip over it.
| 15.2.6.11. ns_parserr

int ns_parserr(ns_msg *handle,
               ns_sect section,
               int rrnum,
               ns_rr *rr)


ns_parserr extracts information about a response record and stores it in rr, which is a parameter passed to other nameserver libarary routines. The arguments are:


handle

    A pointer to a data structure filled in by ns_initparse.

section

    The same parameter described in ns_msg _count.

rrnum

    A resource record number for the resource records in this section. Resource records start numbering at 0. ns_msg _count tells you how many resource records are in this section.

rr

    A pointer to a data structure to be initialized.

ns_parserr returns 0 on success and -1 if it fails to parse the response buffer.
| 15.2.6.12. ns_rr routines

char *ns_rr_name(ns_rr rr)
u_int16_t ns_rr_type(ns_rr rr)
u_int16_t ns_rr_class(ns_rr rr)
u_int32_t ns_rr_ttl(ns_rr rr)
u_int16_t ns_rr_rdlen(ns_rr rr)
const u_char *ns_rr_rdata(ns_rr rr)


These routines return individual fields from a response record. Their only argument is:


rr

    A data structure filled in by ns_parserr

| 15.2.7. Parsing DNS Responses

The easiest way to learn how to parse a DNS message is to look at code that already does it. Assuming that you have the BIND source code, the best file to look through is src/lib/resolv/res_debug.c (BIND 8) or lib/bind/resolv/res_debug.c (BIND 8 resolver in the BIND 9 distribution). (If you're really determined to use BIND 9, you might have to read almost 3,000 lines of lib/dns/message.c.) res_debug.c contains fp_query (or res_pquery in BIND 8.2 and later), the function that prints out the DNS messages in the nameserver debugging output. Our sample program traces its parentage to code from this file.

You won't always want to parse the DNS response manually. An intermediate way to parse the response is to call p_query, which calls fp_query, to print out the DNS message. Then use Perl or awk to grab what you need. Cricket has been known to wimp out in this way.
| 15.2.8. A Sample Program: check_soa

Let's now look at a C program to solve the same problem for which we wrote a shell script earlier.

Here are the header files that are needed, the declarations for external variables, and the declarations of functions. Notice that we use both h_errno (for the resolver routines) and errno. We limit this program to checking 20 nameservers. You'll rarely see a zone with more than 10 nameservers, so an upper limit of 20 should suffice.
Code View: Scroll / Show All

/****************************************************************
 * check_soa -- Retrieve the SOA record from each name server   *
 *     for a given zone and print out the serial number.        *
 *                                                              *
 * usage: check_soa zone                                        *
 *                                                              *
 * The following errors are reported:                           *
 *     o There is no address for a server.                      *
 *     o There is no server running on this host.               *
 *     o There was no response from a server.                   *
 *     o The server is not authoritative for the zone.          *
 *     o The response had an error response code.               *
 *     o The response had more than one answer.                 *
 *     o The response answer did not contain an SOA record.     *
 *     o The expansion of a compressed domain name failed.      *
 ****************************************************************/

/* Various header files */
#include <sys/types.h>
#include <netinet/in.h>
#include <netdb.h>
#include <stdio.h>
#include <errno.h>
#include <arpa/nameser.h>
#include <resolv.h>

/* Error variables */
extern int h_errno;  /* for resolver errors */
extern int errno;    /* general system errors */

/* Our own routines; code included later in this chapter */
void nsError(  );            /* report resolver errors */
void findNameServers(  );    /* find a zone's name servers */
void addNameServers(  );     /* add name servers to our list */
void queryNameServers(  );   /* grab SOA records from servers */
void returnCodeError(  );    /* report response message errors */

/* Maximum number of name servers we will check */
#define MAX_NS 20

					  


The main body of the program is small. We have an array of string pointers, nsList, to store the names of the nameservers for the zone. We call the resolver function res_init to initialize the _res structure. It wasn't necessary for this program to call res_init explicitly because it would have been called by the first resolver routine that used the _res structure. However, if we had wanted to modify the value of any of the _res fields before calling the first resolver routine, we would have made the modifications right after calling res_init. Next, the program calls findNameServers to find all the nameservers for the zone referenced in argv[1] and to store them in nsList. Last, the program calls queryNameServers to query each nameserver in nsList for the SOA record for the zone:
Code View: Scroll / Show All

main(argc, argv)
int argc;
char *argv[];
{
    char *nsList[MAX_NS];  /* list of name servers */
    int  nsNum = 0;        /* number of name servers in list */

    /* sanity check: one (and only one) argument? */
    if(argc != 2){
        (void) fprintf(stderr, "usage: %s zone\n", argv[0]);
        exit(1);
    }

    (void) res_init(  );

    /*
     * Find the name servers for the zone.
     * The name servers are written into nsList.
     */
    findNameServers(argv[1], nsList, &nsNum);

    /*
     * Query each name server for the zone's SOA record.
     * The name servers are read from nsList.
     */
    queryNameServers(argv[1], nsList, nsNum);

    exit(0);
}

					  


The routine findNameServers follows. This routine queries the local nameserver for the NS records for the zone. It then calls addNameServers to parse the response message and store away all the nameservers it finds. The header files, arpa/nameser.h and resolv.h, contain declarations we make extensive use of:
Code View: Scroll / Show All

/****************************************************************
 * findNameServers -- find all of the name servers for the      *
 *     given zone and store their names in nsList.  nsNum is    *
 *     the number of servers in the nsList array.               *
 ****************************************************************/
void
findNameServers(domain, nsList, nsNum)
char *domain;
char *nsList[];
int  *nsNum;
{
    union {
        HEADER hdr;              /* defined in resolv.h */
        u_char buf[NS_PACKETSZ]; /* defined in arpa/nameser.h */
    } response;                  /* response buffers */
    int responseLen;             /* buffer length */

    ns_msg handle;  /* handle for response message */

    /*
     * Look up the NS records for the given domain name.
     * We expect the domain name to be a fully qualified, so
     * we use res_query(  ).  If we'd wanted the resolver search
     * algorithm, we would have used res_search(  ) instead.
     */
    if((responseLen =
           res_query(domain,      /* the zone we care about   */
                     ns_c_in,     /* Internet class records     */
                     ns_t_ns,     /* Look up name server records*/
                     (u_char *)&response,      /*response buffer*/
                     sizeof(response)))        /*buffer size    */
                                        < 0){  /*If negative    */
        nsError(h_errno, domain); /* report the error           */
        exit(1);                  /* and quit                   */
    }

    /*
     * Initialize a handle to this response.  The handle will
     * be used later to extract information from the response.
     */
    if (ns_initparse(response.buf, responseLen, &handle) < 0) {
        fprintf(stderr, "ns_initparse: %s\n", strerror(errno));
        return;
    }

    /*
     * Create a list of name servers from the response.
     * NS records may be in the answer section and/or in the
     * authority section depending on the DNS implementation.
     * Walk through both.  The name server addresses may be in
     * the additional records section, but we will ignore them
     * since it is much easier to call gethostbyname(  ) later
     * than to parse and store the addresses here.
     */

    /*
     * Add the name servers from the answer section.
     */
    addNameServers(nsList, nsNum, handle, ns_s_an);

    /*
     * Add the name servers from the authority section.
     */
    addNameServers(nsList, nsNum, handle, ns_s_ns);
}

/****************************************************************
 * addNameServers -- Look at the resource records from a        *
 *     section.  Save the names of all name servers.            *
 ****************************************************************/

void
addNameServers(nsList, nsNum, handle, section)
char *nsList[];
int  *nsNum;
ns_msg handle;
ns_sect section;
{
    int rrnum;  /* resource record number */
    ns_rr rr;   /* expanded resource record */

    int i, dup; /* misc variables */

    /*
     * Look at all the resource records in this section.
     */
    for(rrnum = 0; rrnum < ns_msg_count(handle, section); rrnum++)
    {
        /*
         * Expand the resource record number rrnum into rr.
         */
        if (ns_parserr(&handle, section, rrnum, &rr)) {
            fprintf(stderr, "ns_parserr: %s\n", strerror(errno));
        }

        /*
         * If the record type is NS, save the name of the
         * name server.
         */
        if (ns_rr_type(rr) == ns_t_ns) {

            /*
             * Allocate storage for the name.  Like any good
             * programmer should, we test malloc's return value,
             * and quit if it fails.
             */
            nsList[*nsNum] = (char *) malloc (MAXDNAME);
            if(nsList[*nsNum] == NULL){
                (void) fprintf(stderr, "malloc failed\n");
                exit(1);
            }

            /* Expand the name server's domain name */
            if (ns_name_uncompress(
                        ns_msg_base(handle),/* Start of the message    */
                        ns_msg_end(handle), /* End of the message      */
                        ns_rr_rdata(rr),    /* Position in the message */
                        nsList[*nsNum],     /* Result                  */
                        MAXDNAME)           /* Size of nsList buffer   */
                                  < 0) {    /* Negative: error         */
                (void) fprintf(stderr, "ns_name_uncompress failed\n");
                exit(1);
            }

            /*
             * Check the domain name we've just unpacked and add it to
             * the list of name servers if it is not a duplicate.
             * If it is a duplicate, just ignore it.
             */
            for(i = 0, dup=0; (i < *nsNum) && !dup; i++)
                dup = !strcasecmp(nsList[i], nsList[*nsNum]);
            if(dup)
                free(nsList[*nsNum]);
            else
                (*nsNum)++;
        }
    }
}

					  


Notice that we don't explicitly check for finding zero nameserver records. We don't need to check because res_query flags that case as an error; it returns -1 and sets herrno to NO_DATA. If res_query returns -1, we call our own routine, nsError, to print out an error string from h_errno instead of using herror. The herror routine isn't a good fit for our program because its messages assume you are looking up address data (e.g., if h_ errno is NO_DATA, the error message is "No address associated with name").

The next routine queries each nameserver that we've found for an SOA record. In this routine, we change the value of several of the _res structure fields. By changing the nsaddr_list field, we change which nameserver res_send queries. We disable the search list by turning off bits in the options field; all the domain names that this program handles are fully qualified:
Code View: Scroll / Show All

/******************************************************************
 * queryNameServers -- Query each of the name servers in nsList   *
 *     for the SOA record of the given zone.  Report any          *
 *     errors encountered  (e.g., a name server not running or    *
 *     the response not being an authoritative response).  If     *
 * there are no errors, print out the serial number for the zone. *
 ******************************************************************/

void
queryNameServers(domain, nsList, nsNum)
char *domain;
char *nsList[];
int nsNum;
{
    union {
        HEADER hdr;               /* defined in resolv.h */
        u_char buf[NS_PACKETSZ];  /* defined in arpa/nameser.h */
    } query, response;            /* query and response buffers */
    int responseLen, queryLen;    /* buffer lengths */

    u_char     *cp;       /* character pointer to parse DNS message */

    struct in_addr saveNsAddr[MAXNS];  /* addrs saved from _res */
    int nsCount;          /* count of addresses saved from _res */
    struct hostent *host; /* structure for looking up ns addr */
    int i;                /* counter variable */

    ns_msg handle;  /* handle for response message */
    ns_rr rr;       /* expanded resource record */

    /*
     * Save the _res name server list since
     * we will need to restore it later.
     */
    nsCount = _res.nscount;
    for(i = 0; i < nsCount; i++)
      saveNsAddr[i] = _res.nsaddr_list[i].sin_addr;

    /*
     * Turn off the search algorithm and turn off appending
     * the local domain name before we call gethostbyname(  );
     * the name server's domain names will be fully qualified.
     */
    _res.options &= ~(RES_DNSRCH | RES_DEFNAMES);

    /*
     * Query each name server for the zone's SOA record.
     */
    for(nsNum-- ; nsNum >= 0; nsNum--){

        /*
         * First, we have to get the IP address of every name server.
         * So far, all we have are domain names.  We use gethostbyname(  )
         * to get the addresses, rather than anything fancy.
         * But first, we have to restore certain values in _res
         * because _res affects gethostbyname(  ).  (We altered
         * _res in the previous iteration through the loop.)
         *
         * We can't just call res_init(  ) again to restore
         * these values since some of the _res fields are
         * initialized when the variable is declared, not when
         * res_init(  ) is called.
         */
        _res.options |= RES_RECURSE;  /* recursion on (default) */
        _res.retry = 4;               /* 4 retries (default)    */
        _res.nscount = nsCount;       /* original name servers  */
        for(i = 0; i < nsCount; i++)
            _res.nsaddr_list[i].sin_addr = saveNsAddr[i];

        /* Look up the name server's address */
        host = gethostbyname(nsList[nsNum]);
        if (host == NULL) {
            (void) fprintf(stderr,"There is no address for %s\n",
                                              nsList[nsNum]);
            continue; /* nsNum for-loop */
        }

        /*
         * Now get ready for the real fun.  host contains IP
         * addresses for the name server we're testing.
         * Store the first address for host in the _res
         * structure.  Soon, we'll look up the SOA record...
         */
        (void) memcpy((void *)&_res.nsaddr_list[0].sin_addr,
           (void *)host->h_addr_list[0], (size_t)host->h_length);
        _res.nscount = 1;

        /*
         * Turn off recursion.  We don't want the name server
         * querying another server for the SOA record; this name
         * server ought to be authoritative for this data.
         */
        _res.options &= ~RES_RECURSE;

        /*
         * Reduce the number of retries.  We may be checking
         * several name servers, so we don't want to wait too
         * long for any one server.  With two retries and only
         * one address to query, we'll wait at most 15 seconds.
         */
        _res.retry = 2;

        /*
         * We want to see the response code in the next
         * response, so we must make the query message and
         * send it ourselves instead of having res_query(  )
         * do it for us.  If res_query(  ) returned -1, there
         * might not be a response to look at.
         *
         * There is no need to check for res_mkquery(  )
         * returning -1.  If the compression was going to
         * fail, it would have failed when we called
         * res_query(  ) earlier with this domain name.
         */
        queryLen = res_mkquery(
                     ns_o_query,      /* regular query         */
                     domain,          /* the zone to look up */
                     ns_c_in,         /* Internet type         */
                     ns_t_soa,        /* look up an SOA record */
                     (u_char *)NULL,  /* always NULL       */
                     0,               /* length of NULL        */
                     (u_char *)NULL,  /* always NULL       */
                     (u_char *)&query,/* buffer for the query  */
                     sizeof(query));  /* size of the buffer    */

        /*
         * Send the query message.  If there is no name server
         * running on the target host, res_send(  ) returns -1
         * and errno is ECONNREFUSED.  First, clear out errno.
         */
        errno = 0;
        if((responseLen = res_send((u_char *)&query,/* the query  */
                                   queryLen,        /* true length*/
                                   (u_char *)&response,/*buffer  */
                                   sizeof(response)))  /*buf size*/
                                        < 0){          /* error  */
            if(errno == ECONNREFUSED) { /* no server on the host */
                (void) fprintf(stderr,
                    "There is no name server running on %s\n",
                    nsList[nsNum]);
            } else {                   /* anything else: no response */
                (void) fprintf(stderr,
                    "There was no response from %s\n",
                    nsList[nsNum]);
            }
            continue; /* nsNum for-loop */
        }

        /*
         * Initialize a handle to this response.  The handle will
         * be used later to extract information from the response.
         */
        if (ns_initparse(response.buf, responseLen, &handle) < 0) {
            fprintf(stderr, "ns_initparse: %s\n", strerror(errno));
            return;
        }

        /*
         * If the response reports an error, issue a message
         * and proceed to the next server in the list.
         */
        if(ns_msg_getflag(handle, ns_f_rcode) != ns_r_noerror){
            returnCodeError(ns_msg_getflag(handle, ns_f_rcode),
                                                  nsList[nsNum]);
            continue; /* nsNum for-loop */
        }

        /*
         * Did we receive an authoritative response?  Check the
         * authoritative answer bit.  If this name server isn't
         * authoritative, report it, and go on to the next server.
         */
        if(!ns_msg_getflag(handle, ns_f_aa)){
            (void) fprintf(stderr,
                "%s is not authoritative for %s\n",
                nsList[nsNum], domain);
            continue; /* nsNum for-loop */
        }

        /*
         * The response should only contain one answer; if more,
         * report the error, and proceed to the next server.
         */
        if(ns_msg_count(handle, ns_s_an) != 1){
            (void) fprintf(stderr,
                "%s: expected 1 answer, got %d\n",
                nsList[nsNum], ns_msg_count(handle, ns_s_an));
            continue; /* nsNum for-loop */
        }

        /*
         * Expand the answer section record number 0 into rr.
         */
        if (ns_parserr(&handle, ns_s_an, 0, &rr)) {
                if (errno != ENODEV){
                        fprintf(stderr, "ns_parserr: %s\n",
                                strerror(errno));
                }
        }

        /*
         * We asked for an SOA record; if we got something else,
         * report the error and proceed to the next server.
         */
        if (ns_rr_type(rr) != ns_t_soa) {
            (void) fprintf(stderr,
                "%s: expected answer type %d, got %d\n",
                nsList[nsNum], ns_t_soa, ns_rr_type(rr));
            continue; /* nsNum for-loop */
        }

        /*
         * Set cp to point the the SOA record.
         */
        cp = (u_char *)ns_rr_rdata(rr);

        /*
         * Skip the SOA origin and mail address, which we don't
         * care about.  Both are standard "compressed names."
         */
        ns_name_skip(&cp, ns_msg_end(handle));
        ns_name_skip(&cp, ns_msg_end(handle));

        /* cp now points to the serial number; print it. */
        (void) printf("%s has serial number %d\n",
            nsList[nsNum], ns_get32(cp));

    } /* end of nsNum for-loop */
}

					  


Notice that we use recursive queries when we call gethostbyname, but nonrecursive queries when we look up the SOA record. gethostbyname may need to query other nameservers to find the host's address. But we don't want the nameserver querying another server when we ask it for the SOA record; it's supposed to be authoritative for this zone, after all. Allowing the nameserver to ask another server for the SOA record would defeat the error check.

The next two routines print out error messages:
Code View: Scroll / Show All

/****************************************************************
 * nsError -- Print an error message from h_errno for a failure *
 *     looking up NS records.  res_query(  ) converts the DNS   *
 *     message return code to a smaller list of errors and      *
 *     places the error value in h_errno.  There is a routine   *
 *     called herror(  ) for printing out strings from h_errno  *
 *     like perror(  ) does for errno.  Unfortunately, the      *
 *     herror(  ) messages assume you are looking up address    *
 *     records for hosts.  In this program, we are looking up   *
 *     NS records for zones, so we need our own list of error   *
 *     strings.                                                 *
 ****************************************************************/
void
nsError(error, domain)
int error;
char *domain;
{
    switch(error){
        case HOST_NOT_FOUND:
          (void) fprintf(stderr, "Unknown zone: %s\n", domain);
          break;
        case NO_DATA:
          (void) fprintf(stderr, "No NS records for %s\n", domain);
          break;
        case TRY_AGAIN:
          (void) fprintf(stderr, "No response for NS query\n");
          break;
        default:
          (void) fprintf(stderr, "Unexpected error\n");
          break;
    }
}

/****************************************************************
 * returnCodeError -- print out an error message from a DNS     *
 *     response return code.                                    *
 ****************************************************************/
void
returnCodeError(rcode, nameserver)
ns_rcode rcode;
char *nameserver;
{
    (void) fprintf(stderr, "%s: ", nameserver);
    switch(rcode){
        case ns_r_formerr:
          (void) fprintf(stderr, "FORMERR response\n");
          break;
        case ns_r_servfail:
          (void) fprintf(stderr, "SERVFAIL response\n");
          break;
        case ns_r_nxdomain:
          (void) fprintf(stderr, "NXDOMAIN response\n");
          break;
        case ns_r_notimpl:
          (void) fprintf(stderr, "NOTIMP response\n");
          break;
        case ns_r_refused:
          (void) fprintf(stderr, "REFUSED response\n");
          break;
        default:
          (void) fprintf(stderr, "unexpected return code\n");
          break;
    }
}

					  


To compile this program using the resolver and nameserver routines in libc:

%cc -o check_soa check_soa.c


Or, if you've newly compiled the BIND code as we describe in Appendix C and want to use the latest header files and resolver library:

%cc -o check_soa -I/usr/local/src/bind/src/include \
					check_soa.c /usr/local/src/bind/src/lib/libbind.a


Here is what the output looks like:

%check_soa mit.edu

BITSY.MIT.EDU has serial number 1995
W20NS.MIT.EDU has serial number 1995
STRAWB.MIT.EDU has serial number 1995


If you look back at the shell script output, it looks the same, except that the shell script's output is sorted by the nameserver's name. What you can't see is that the C program ran much faster.

		10.5.4 res_init 
Initializes the Resolver
Portability:	UNIX compatible

SYNOPSIS
DESCRIPTION
IMPLEMENTATION
EXAMPLE
RELATED FUNCTIONS
SYNOPSIS


#include <sys/types.h>
#include <netinet/in.h>
#include <arpa/nameser.h>
#include <resolv.h>

void res_init(void);
DESCRIPTION

 res_init initializes the resolver. First, default options are set. Then, a system configuration file is read if one can be located. The configuration file may contain default resolver options for the local site. Refer to Network Administration for information on default resolver options.


After calling res_init , the program may override default site resolver options by accessing the _res structure described in The BSD UNIX Socket Library. The program does not need to call res_init if _res values will not be changed. This routine implements a part of the resolver, which is a set of routines providing a programming interface for communications with Internet name servers.


For information on buffer formats for Internet name servers, refer to Chapter 20, "The Domain Name System," in Internetworking with TCP/IP.

IMPLEMENTATION

The SAS/C version of res_init is a direct port from the BSD UNIX Socket Library.

EXAMPLE

In the following example, res_init is used to initialize the resolver.

/* Given a hostname as its first parameter, this program prints  */
/* the IP address.                                               */
/* Use of the following resolver options is illustrated:         */
/* The RES_DEBUG option turns on a resolver trace.               */
/* The RES_USEVC option requests use of virtual circuits (TCP)   */
/* when contacting the nameserver.                               */
/* This example assumes that the local site is configured to     */
/* use the resolver (instead of a host file).                    */
/* NOTE: The bitfield(1) compiler option is required.            */
#include <sys/types.h>
#include <netdb.h>
#include <stdlib.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <arpa/nameser.h>
#include <resolv.h>
#include <stdio.h>

main(int argc, char *argv[])
{
   struct hostent *hp;
   struct in_addr ip_addr;

      /* Host name should be first parameter.                    */
   if (argc <1 || *argv[1]  == '\0')
      exit(EXIT_FAILURE);

      /* Initialize the resolver, and then set options.          */
   res_init();
   _res.options |= (RES_DEBUG|RES_USEVC);

      /* When gethostbyname uses the resolver, it uses TCP       */
      /* and generates a trace.                                  */
   hp = gethostbyname(argv[1]);
   if (!hp) {
      printf("%s not found\n",argv[1]);
      exit(EXIT_FAILURE);
   }

      /* Host was found.  Print its IP address.                  */
   ip_addr = *(struct in_addr *)(hp->h_addr);
   printf("%s: %s\n",argv[1] ,inet_ntoa(ip_addr));

   exit(EXIT_SUCCESS);
}


		10.5.5 List of DNS record types

			10.5.5.1 Resource records [edit]

Type	Value (decimal)	Defining RFC	Description	Function
A	1	RFC 1035[1]	address record	Returns a 32-bit IPv4 address, most commonly used to map hostnames to an IP address of the host, but also used for DNSBLs, storing subnet masks in RFC 1101, etc.
AAAA	28	RFC 3596[2]	IPv6 address record	Returns a 128-bit IPv6 address, most commonly used to map hostnames to an IP address of the host.
AFSDB	18	RFC 1183	AFS database record	Location of database servers of an AFS cell. This record is commonly used by AFS clients to contact AFS cells outside their local domain. A subtype of this record is used by the obsolete DCE/DFS file system.
APL	42	RFC 3123	Address Prefix List	Specify lists of address ranges, e.g. in CIDR format, for various address families. Experimental.
CAA	257	RFC 6844	Certification Authority Authorization	CA pinning, constraining acceptable CAs for a host/domain
CERT	37	RFC 4398	Certificate record	Stores PKIX, SPKI, PGP, etc.
CNAME	5	RFC 1035[1]	Canonical name record	Alias of one name to another: the DNS lookup will continue by retrying the lookup with the new name.
DHCID	49	RFC 4701	DHCP identifier	Used in conjunction with the FQDN option to DHCP
DLV	32769	RFC 4431	DNSSEC Lookaside Validation record	For publishing DNSSEC trust anchors outside of the DNS delegation chain. Uses the same format as the DS record. RFC 5074 describes a way of using these records.
DNAME	39	RFC 2672	delegation name	DNAME creates an alias for a name and all its subnames, unlike CNAME, which aliases only the exact name in its label. Like the CNAME record, the DNS lookup will continue by retrying the lookup with the new name.
DNSKEY	48	RFC 4034	DNS Key record	The key record used in DNSSEC. Uses the same format as the KEY record.
DS	43	RFC 4034	Delegation signer	The record used to identify the DNSSEC signing key of a delegated zone
HIP	55	RFC 5205	Host Identity Protocol	Method of separating the end-point identifier and locator roles of IP addresses.
IPSECKEY	45	RFC 4025	IPsec Key	Key record that can be used with IPsec
KEY	25	RFC 2535[3] and RFC 2930[4]	key record	Used only for SIG(0) (RFC 2931) and TKEY (RFC 2930).[5] RFC 3445 eliminated their use for application keys and limited their use to DNSSEC.[6] RFC 3755 designates DNSKEY as the replacement within DNSSEC.[7] RFC 4025 designates IPSECKEY as the replacement for use with IPsec.[8]
KX	36	RFC 2230	Key eXchanger record	Used with some cryptographic systems (not including DNSSEC) to identify a key management agent for the associated domain-name. Note that this has nothing to do with DNS Security. It is Informational status, rather than being on the IETF standards-track. It has always had limited deployment, but is still in use.
LOC	29	RFC 1876	Location record	Specifies a geographical location associated with a domain name
MX	15	RFC 1035[1]	mail exchange record	Maps a domain name to a list of message transfer agents for that domain
NAPTR	35	RFC 3403	Naming Authority Pointer	Allows regular expression based rewriting of domain names which can then be used as URIs, further domain names to lookups, etc.
NS	2	RFC 1035[1]	name server record	Delegates a DNS zone to use the given authoritative name servers
NSEC	47	RFC 4034	Next-Secure record	Part of DNSSEC—used to prove a name does not exist. Uses the same format as the (obsolete) NXT record.
NSEC3	50	RFC 5155	NSEC record version 3	An extension to DNSSEC that allows proof of nonexistence for a name without permitting zonewalking
NSEC3PARAM	51	RFC 5155	NSEC3 parameters	Parameter record for use with NSEC3
PTR	12	RFC 1035[1]	pointer record	Pointer to a canonical name. Unlike a CNAME, DNS processing does NOT proceed, just the name is returned. The most common use is for implementing reverse DNS lookups, but other uses include such things as DNS-SD.
RRSIG	46	RFC 4034	DNSSEC signature	Signature for a DNSSEC-secured record set. Uses the same format as the SIG record.
RP	17	RFC 1183	Responsible person	Information about the responsible person(s) for the domain. Usually an email address with the @ replaced by a .
SIG	24	RFC 2535	Signature	Signature record used in SIG(0) (RFC 2931) and TKEY (RFC 2930).[7] RFC 3755 designated RRSIG as the replacement for SIG for use within DNSSEC.[7]
SOA	6	RFC 1035[1] and RFC 2308[9]	start of [a zone of] authority record	Specifies authoritative information about a DNS zone, including the primary name server, the email of the domain administrator, the domain serial number, and several timers relating to refreshing the zone.
SPF	99	RFC 4408	Sender Policy Framework	Specified as part of the SPF protocol as an alternative to of storing SPF data in TXT records. Uses the same format as the earlier TXT record.
SRV	33	RFC 2782	Service locator	Generalized service location record, used for newer protocols instead of creating protocol-specific records such as MX.
SSHFP	44	RFC 4255	SSH Public Key Fingerprint	Resource record for publishing SSH public host key fingerprints in the DNS System, in order to aid in verifying the authenticity of the host. RFC 6594 defines ECC SSH keys and SHA-256 hashes. See the IANA SSHFP RR parameters registry for details.
TA	32768	N/A	DNSSEC Trust Authorities	Part of a deployment proposal for DNSSEC without a signed DNS root. See the IANA database and Weiler Spec for details. Uses the same format as the DS record.
TKEY	249	RFC 2930	secret key record	A method of providing keying material to be used with TSIG that is encrypted under the public key in an accompanying KEY RR.[10]
TLSA	52	RFC 6698	TLSA certificate association	A record for DNS-based Authentication of Named Entities (DANE). RFC 6698 defines "The TLSA DNS resource record is used to associate a TLS server certificate or public key with the domain name where the record is found, thus forming a 'TLSA certificate association'".
TSIG	250	RFC 2845	Transaction Signature	Can be used to authenticate dynamic updates as coming from an approved client, or to authenticate responses as coming from an approved recursive name server[11] similar to DNSSEC.
TXT	16	RFC 1035[1]	Text record	Originally for arbitrary human-readable text in a DNS record. Since the early 1990s, however, this record more often carries machine-readable data, such as specified by RFC 1464, opportunistic encryption, Sender Policy Framework, DKIM, DMARC DNS-SD, etc.
Other types and pseudo resource records [edit]

Other types of records simply provide some types of information (for example, an HINFO record gives a description of the type of computer/OS a host uses), or others return data used in experimental features. The "type" field is also used in the protocol for various operations.
Code	Number	Defining RFC	Description	Function
*	255	RFC 1035[1]	All cached records	Returns all records of all types known to the name server. If the name server does not have any information on the name, the request will be forwarded on. The records returned may not be complete. For example, if there is both an A and an MX for a name, but the name server has only the A record cached, only the A record will be returned. Sometimes referred to as "ANY", for example in Windows nslookup and Wireshark.
AXFR	252	RFC 1035[1]	Authoritative Zone Transfer	Transfer entire zone file from the master name server to secondary name servers.
IXFR	251	RFC 1996	Incremental Zone Transfer	Requests a zone transfer of the given zone but only differences from a previous serial number. This request may be ignored and a full (AXFR) sent in response if the authoritative server is unable to fulfill the request due to configuration or lack of required deltas.
OPT	41	RFC 2671	Option	This is a "pseudo DNS record type" needed to support EDNS
Obsolete record types [edit]

Progress has rendered obsolete some of the originally defined record-types. Of the records listed at IANA, some have limited use, for various reasons. Some are marked obsolete in the list, some are for very obscure services, some are for older versions of services, and some have special notes saying they are "not right".
Obsoleted by RFC 973: MD(3), MF (4), MAILA (254)
Records to publish mailing list subscriber lists in the DNS: MB(7), MG(8), MR(9), MINFO(14), MAILB (253). The intent, as specified by RFC 883, was for MB to replace the SMTP VRFY command, MG to replace the SMTP EXPN command, and MR to replace the "551 User Not Local" SMTP error. Later, RFC 2505 recommended that both the VRFY and EXPN commands be disabled, making the use of MB and MG unlikely to ever be adopted.
Declared "not to be relied upon" by RFC 1123 (with further information in RFC 1127): WKS(11)[12]
Mistakes: NB(32), NBSTAT(33) (from RFC 1002); the numbers are now assigned to NIMLOC and SRV.
Obsoleted by RFC 1035: NULL(10) (RFC 883 defined "completion queries" (opcode 2 and maybe 3) which used this record, RFC 1035 later reassigned opcode 2 to be "status" and reserved opcode 3.)
Defined as part of early IPv6 but downgraded to experimental by RFC 3363: A6(38), Later downgraded to historic in RFC 6563.
Obsoleted by DNSSEC updates (RFC 3755): NXT(30). At the same time, the domain of applicability for KEY and SIG was also limited to not include DNSSEC use.
Part of the first version of DNSSEC (RFC 2065).
Not in current use by any notable application: HINFO(13), RP(17), X25(19), ISDN(20), RT(21), NSAP(22), NSAP-PTR(23), PX(26), EID(31), NIMLOC(32), ATMA(34), APL(42)
Defined by the Kitchen Sink internet draft, but never made it to RFC status: SINK(40)
A more limited early version of the LOC record: GPOS(27)
IANA reserved, no RFC documented them [1] and support was removed from BIND in the early 90s: UINFO(100), UID(101), GID(102), UNSPEC(103)
RP(17) may be used for certain human-readable information regarding a different contact point for a specific host, subnet, or other domain level label separate than that used in the SOA record.

		10.5.6 res_mkquery()--Place Domain Query in Buffer
http://pic.dhe.ibm.com/infocenter/iseries/v6r1m0/index.jsp?topic=/apis/resmkq.htm



  Syntax
 #include <sys/types.h>
 #include <netinet/in.h>
 #include <arpa/nameser.h>
 #include <resolv.h>

 int res_mkquery(int  operation,
                 char *domain_name,
                 int  class,
                 int  type,
                 char *search_data,
                 int  search_data_length,
                 struct rrec *reserved,
                 char *query_buffer,
                 int  query_buffer_length)

  Service Program Name: QSOSRV2

  Default Public Authority: *USE

  Threadsafe: Yes

The res_mkquery() function is used to make standard query messages (DNS packets) for name servers.


Parameters

operation
(Input) The query operation desired. This gets put into OPCODE in the header of the packet. Common values are listed below (see <arpa/nameser.h> for all possible values):
ns_o_query or QUERY	Standard query request. (This value is almost always used.)

domain_name
(Input) The pointer to the name of the domain.

class
(Input) The class of data being looked for. Common values are listed below (see <arpa/nameser.h> for all possible values):
ns_c_in or C_IN	Specifies the ARPA Internet.
ns_c_any or C_ANY	This is the wildcard match.

type
(Input) The type of request being made. Common values are listed below (see <arpa/nameser.h> for all possible values):
ns_t_a or T_A	Host address.
ns_t_aaaa	IPv6 address.
ns_t_ns or T_NS	Authoritative server.
ns_t_cname or T_CNAME	Canonical name.
ns_t_soa or T_SOA	Start of authority zone.
ns_t_wks or T_WKS	Well-known service.
ns_t_ptr or T_PTR	Domain name pointer.
ns_t_hinfo or T_HINFO	Host information.
ns_t_mx or T_MX	Mail routing information.
ns_t_txt or T_TXT	Text strings.
ns_t_any or T_ANY	Wildcard match.

search_data
(Input) A buffer containing the data for inverse queries. It is NULL for types other than IQUERY.

search_data_length
(Input) The length of search_data. It is NULL for types other than IQUERY.

reserved
(Input) A reserved and currently unused parameter. It is always a NULL pointer (defined for compatibility).

query_buffer
(Output) A pointer to a user-supplied location containing the query message.

query_buffer_length
(Input) The length of query_buffer.

Authorities:

No authorization is required.


Return Value

res_mkquery() returns an integer. Possible values are:

-1 (unsuccessful)

n (successful), where n is the size of the query.

Error Conditions

When the res_mkquery() function fails, errno can be set to one of the following:

[EFAULT]
The system detected a pointer that was invalid while attempting to access an input pointer.

[EINVAL]
The _res appears to be initialized but the reserved field is not set to zeros.

[EMSGSIZE]
The message buffer was too small. The query was larger than the value of query_buffer_length



Usage Notes

res_mkquery() creates a standard query message (DNS packet). It fills in the header fields, compresses the domain name into the question section, and fills in the other question fields. This query message is placed in query_buffer.

res_mkquery() calls res_init() if the _res structure has not been initialized.

res_mkquery() expects EBCDIC data as input. The output from res_mkquery() is also EBCDIC.

In a thread-enabled environment, the _res structure is shared among all threads within a process.

Related Information

res_nmkquery()--Place Domain Query in Buffer

res_hostalias()--Retrieve the host alias

res_init()--Initialize _res Structure

res_close()--Close Socket and Reset _res Structure

res_query()--Send Domain Query

res_search()--Search for Domain Name

res_send()--Send Buffered Domain Query

res_xlate()--Translate DNS Packets

		10.5.7 nameser.h

			10.5.7.1  old version


/*	$OpenBSD: nameser.h,v 1.3 1997/03/13 19:11:54 downsj Exp $	*/

/*
 * ++Copyright++ 1983, 1989, 1993
 * -
 * Copyright (c) 1983, 1989, 1993
 *    The Regents of the University of California.  All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 * 3. All advertising materials mentioning features or use of this software
 *    must display the following acknowledgement:
 * 	This product includes software developed by the University of
 * 	California, Berkeley and its contributors.
 * 4. Neither the name of the University nor the names of its contributors
 *    may be used to endorse or promote products derived from this software
 *    without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE REGENTS AND CONTRIBUTORS ``AS IS'' AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED.  IN NO EVENT SHALL THE REGENTS OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS
 * OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 * LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
 * OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
 * SUCH DAMAGE.
 * -
 * Portions Copyright (c) 1993 by Digital Equipment Corporation.
 * 
 * Permission to use, copy, modify, and distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies, and that
 * the name of Digital Equipment Corporation not be used in advertising or
 * publicity pertaining to distribution of the document or software without
 * specific, written prior permission.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS" AND DIGITAL EQUIPMENT CORP. DISCLAIMS ALL
 * WARRANTIES WITH REGARD TO THIS SOFTWARE, INCLUDING ALL IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS.   IN NO EVENT SHALL DIGITAL EQUIPMENT
 * CORPORATION BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL
 * DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR
 * PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS
 * ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS
 * SOFTWARE.
 * -
 * Portions Copyright (c) 1995 by International Business Machines, Inc.
 *
 * International Business Machines, Inc. (hereinafter called IBM) grants
 * permission under its copyrights to use, copy, modify, and distribute this
 * Software with or without fee, provided that the above copyright notice and
 * all paragraphs of this notice appear in all copies, and that the name of IBM
 * not be used in connection with the marketing of any product incorporating
 * the Software or modifications thereof, without specific, written prior
 * permission.
 *
 * To the extent it has a right to do so, IBM grants an immunity from suit
 * under its patents, if any, for the use, sale or manufacture of products to
 * the extent that such products are used for performing Domain Name System
 * dynamic updates in TCP/IP networks by means of the Software.  No immunity is
 * granted for any product per se or for any other function of any product.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", AND IBM DISCLAIMS ALL WARRANTIES,
 * INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
 * PARTICULAR PURPOSE.  IN NO EVENT SHALL IBM BE LIABLE FOR ANY SPECIAL,
 * DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER ARISING
 * OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE, EVEN
 * IF IBM IS APPRISED OF THE POSSIBILITY OF SUCH DAMAGES.
 * --Copyright--
 */

/*
 *      @(#)nameser.h	8.1 (Berkeley) 6/2/93
 *	$From: nameser.h,v 8.11 1996/10/08 04:51:02 vixie Exp $
 */

#ifndef _NAMESER_H_
#define _NAMESER_H_

#include <sys/param.h>
#if (!defined(BSD)) || (BSD < 199306)
# include <sys/bitypes.h>
#else
# include <sys/types.h>
#endif
#include <sys/cdefs.h>

#ifdef _AUX_SOURCE
# include <sys/types.h>
#endif

/*
 * revision information.  this is the release date in YYYYMMDD format.
 * it can change every day so the right thing to do with it is use it
 * in preprocessor commands such as "#if (__BIND > 19931104)".  do not
 * compare for equality; rather, use it to determine whether your resolver
 * is new enough to contain a certain feature.
 */

#define __BIND		19960801	/* interface version stamp */

/*
 * Define constants based on rfc883
 */
#define PACKETSZ	512		/* maximum packet size */
#define MAXDNAME	1025		/* maximum presentation domain name */
#define MAXCDNAME	255		/* maximum compressed domain name */
#define MAXLABEL	63		/* maximum length of domain label */
#define HFIXEDSZ	12		/* #/bytes of fixed data in header */
#define QFIXEDSZ	4		/* #/bytes of fixed data in query */
#define RRFIXEDSZ	10		/* #/bytes of fixed data in r record */
#define INT32SZ		4		/* for systems without 32-bit ints */
#define INT16SZ		2		/* for systems without 16-bit ints */
#define INADDRSZ	4		/* IPv4 T_A */
#define IN6ADDRSZ	16		/* IPv6 T_AAAA */

/*
 * Internet nameserver port number
 */
#define NAMESERVER_PORT	53

/*
 * Currently defined opcodes
 */
#define QUERY		0x0		/* standard query */
#define IQUERY		0x1		/* inverse query */
#define STATUS		0x2		/* nameserver status query */
/*#define xxx		0x3*/		/* 0x3 reserved */
#define NS_NOTIFY_OP	0x4		/* notify secondary of SOA change */
/*
 * Currently defined response codes
 */
#define NOERROR		0		/* no error */
#define FORMERR		1		/* format error */
#define SERVFAIL	2		/* server failure */
#define NXDOMAIN	3		/* non existent domain */
#define NOTIMP		4		/* not implemented */
#define REFUSED		5		/* query refused */

/*
 * Type values for resources and queries
 */
#define T_A		1		/* host address */
#define T_NS		2		/* authoritative server */
#define T_MD		3		/* mail destination */
#define T_MF		4		/* mail forwarder */
#define T_CNAME		5		/* canonical name */
#define T_SOA		6		/* start of authority zone */
#define T_MB		7		/* mailbox domain name */
#define T_MG		8		/* mail group member */
#define T_MR		9		/* mail rename name */
#define T_NULL		10		/* null resource record */
#define T_WKS		11		/* well known service */
#define T_PTR		12		/* domain name pointer */
#define T_HINFO		13		/* host information */
#define T_MINFO		14		/* mailbox information */
#define T_MX		15		/* mail routing information */
#define T_TXT		16		/* text strings */
#define T_RP		17		/* responsible person */
#define T_AFSDB		18		/* AFS cell database */
#define T_X25		19		/* X_25 calling address */
#define T_ISDN		20		/* ISDN calling address */
#define T_RT		21		/* router */
#define T_NSAP		22		/* NSAP address */
#define T_NSAP_PTR	23		/* reverse NSAP lookup (deprecated) */
#define T_SIG		24		/* security signature */
#define T_KEY		25		/* security key */
#define T_PX		26		/* X.400 mail mapping */
#define T_GPOS		27		/* geographical position (withdrawn) */
#define T_AAAA		28		/* IP6 Address */
#define T_LOC		29		/* Location Information */
#define T_NXT		30		/* Next Valid Name in Zone */
#define T_EID		31		/* Endpoint identifier */
#define T_NIMLOC	32		/* Nimrod locator */
#define T_SRV		33		/* Server selection */
#define T_ATMA		34		/* ATM Address */
#define T_NAPTR		35		/* Naming Authority PoinTeR */
	/* non standard */
#define T_UINFO		100		/* user (finger) information */
#define T_UID		101		/* user ID */
#define T_GID		102		/* group ID */
#define T_UNSPEC	103		/* Unspecified format (binary data) */
	/* Query type values which do not appear in resource records */
#define	T_IXFR		251		/* incremental zone transfer */
#define T_AXFR		252		/* transfer zone of authority */
#define T_MAILB		253		/* transfer mailbox records */
#define T_MAILA		254		/* transfer mail agent records */
#define T_ANY		255		/* wildcard match */

/*
 * Values for class field
 */

#define C_IN		1		/* the arpa internet */
#define C_CHAOS		3		/* for chaos net (MIT) */
#define C_HS		4		/* for Hesiod name server (MIT) (XXX) */
	/* Query class values which do not appear in resource records */
#define C_ANY		255		/* wildcard match */

/*
 * Flags field of the KEY RR rdata
 */
#define	KEYFLAG_TYPEMASK	0xC000	/* Mask for "type" bits */
#define	KEYFLAG_TYPE_AUTH_CONF	0x0000	/* Key usable for both */
#define	KEYFLAG_TYPE_CONF_ONLY	0x8000	/* Key usable for confidentiality */
#define	KEYFLAG_TYPE_AUTH_ONLY	0x4000	/* Key usable for authentication */
#define	KEYFLAG_TYPE_NO_KEY	0xC000	/* No key usable for either; no key */
/* The type bits can also be interpreted independently, as single bits: */
#define	KEYFLAG_NO_AUTH		0x8000	/* Key not usable for authentication */
#define	KEYFLAG_NO_CONF		0x4000	/* Key not usable for confidentiality */

#define	KEYFLAG_EXPERIMENTAL	0x2000	/* Security is *mandatory* if bit=0 */
#define	KEYFLAG_RESERVED3	0x1000  /* reserved - must be zero */
#define	KEYFLAG_RESERVED4	0x0800  /* reserved - must be zero */
#define	KEYFLAG_USERACCOUNT	0x0400	/* key is assoc. with a user acct */
#define	KEYFLAG_ENTITY		0x0200	/* key is assoc. with entity eg host */
#define	KEYFLAG_ZONEKEY		0x0100	/* key is zone key for the zone named */
#define	KEYFLAG_IPSEC		0x0080  /* key is for IPSEC use (host or user)*/
#define	KEYFLAG_EMAIL		0x0040  /* key is for email (MIME security) */
#define	KEYFLAG_RESERVED10	0x0020  /* reserved - must be zero */
#define	KEYFLAG_RESERVED11	0x0010  /* reserved - must be zero */
#define	KEYFLAG_SIGNATORYMASK	0x000F	/* key can sign DNS RR's of same name */

#define  KEYFLAG_RESERVED_BITMASK ( KEYFLAG_RESERVED3 | \
				    KEYFLAG_RESERVED4 | \
				    KEYFLAG_RESERVED10| KEYFLAG_RESERVED11) 

/* The Algorithm field of the KEY and SIG RR's is an integer, {1..254} */
#define	ALGORITHM_MD5RSA	1	/* MD5 with RSA */
#define	ALGORITHM_EXPIRE_ONLY	253	/* No alg, no security */
#define	ALGORITHM_PRIVATE_OID	254	/* Key begins with OID indicating alg */

/* Signatures */
					/* Size of a mod or exp in bits */
#define	MIN_MD5RSA_KEY_PART_BITS	 512
#define	MAX_MD5RSA_KEY_PART_BITS	2552
					/* Total of binary mod and exp, bytes */
#define	MAX_MD5RSA_KEY_BYTES		((MAX_MD5RSA_KEY_PART_BITS+7/8)*2+3)
					/* Max length of text sig block */
#define	MAX_KEY_BASE64			(((MAX_MD5RSA_KEY_BYTES+2)/3)*4)

/*
 * Status return codes for T_UNSPEC conversion routines
 */
#define CONV_SUCCESS	0
#define CONV_OVERFLOW	(-1)
#define CONV_BADFMT	(-2)
#define CONV_BADCKSUM	(-3)
#define CONV_BADBUFLEN	(-4)

#ifndef BYTE_ORDER
#if (BSD >= 199103)
# include <machine/endian.h>
#else
#ifdef linux
# include <endian.h>
#else
#define LITTLE_ENDIAN	1234	/* least-significant byte first (vax, pc) */
#define BIG_ENDIAN	4321	/* most-significant byte first (IBM, net) */
#define PDP_ENDIAN	3412	/* LSB first in word, MSW first in long (pdp)*/

#if defined(vax) || defined(ns32000) || defined(sun386) || defined(i386) || \
    defined(MIPSEL) || defined(_MIPSEL) || defined(BIT_ZERO_ON_RIGHT) || \
    defined(__alpha__) || defined(__alpha)
#define BYTE_ORDER	LITTLE_ENDIAN
#endif

#if defined(sel) || defined(pyr) || defined(mc68000) || defined(sparc) || \
    defined(is68k) || defined(tahoe) || defined(ibm032) || defined(ibm370) || \
    defined(MIPSEB) || defined(_MIPSEB) || defined(_IBMR2) || defined(DGUX) ||\
    defined(apollo) || defined(__convex__) || defined(_CRAY) || \
    defined(__hppa) || defined(__hp9000) || \
    defined(__hp9000s300) || defined(__hp9000s700) || \
    defined (BIT_ZERO_ON_LEFT) || defined(m68k)
#define BYTE_ORDER	BIG_ENDIAN
#endif
#endif /* linux */
#endif /* BSD */
#endif /* BYTE_ORDER */

#if !defined(BYTE_ORDER) || \
    (BYTE_ORDER != BIG_ENDIAN && BYTE_ORDER != LITTLE_ENDIAN && \
    BYTE_ORDER != PDP_ENDIAN)
	/* you must determine what the correct bit order is for
	 * your compiler - the next line is an intentional error
	 * which will force your compiles to bomb until you fix
	 * the above macros.
	 */
  error "Undefined or invalid BYTE_ORDER";
#endif

/*
 * Structure for query header.  The order of the fields is machine- and
 * compiler-dependent, depending on the byte/bit order and the layout
 * of bit fields.  We use bit fields only in int variables, as this
 * is all ANSI requires.  This requires a somewhat confusing rearrangement.
 */

typedef struct {
	unsigned	id :16;		/* query identification number */
#if BYTE_ORDER == BIG_ENDIAN
			/* fields in third byte */
	unsigned	qr: 1;		/* response flag */
	unsigned	opcode: 4;	/* purpose of message */
	unsigned	aa: 1;		/* authoritive answer */
	unsigned	tc: 1;		/* truncated message */
	unsigned	rd: 1;		/* recursion desired */
			/* fields in fourth byte */
	unsigned	ra: 1;		/* recursion available */
	unsigned	unused :1;	/* unused bits (MBZ as of 4.9.3a3) */
	unsigned	ad: 1;		/* authentic data from named */
	unsigned	cd: 1;		/* checking disabled by resolver */
	unsigned	rcode :4;	/* response code */
#endif
#if BYTE_ORDER == LITTLE_ENDIAN || BYTE_ORDER == PDP_ENDIAN
			/* fields in third byte */
	unsigned	rd :1;		/* recursion desired */
	unsigned	tc :1;		/* truncated message */
	unsigned	aa :1;		/* authoritive answer */
	unsigned	opcode :4;	/* purpose of message */
	unsigned	qr :1;		/* response flag */
			/* fields in fourth byte */
	unsigned	rcode :4;	/* response code */
	unsigned	cd: 1;		/* checking disabled by resolver */
	unsigned	ad: 1;		/* authentic data from named */
	unsigned	unused :1;	/* unused bits (MBZ as of 4.9.3a3) */
	unsigned	ra :1;		/* recursion available */
#endif
			/* remaining bytes */
	unsigned	qdcount :16;	/* number of question entries */
	unsigned	ancount :16;	/* number of answer entries */
	unsigned	nscount :16;	/* number of authority entries */
	unsigned	arcount :16;	/* number of resource entries */
} HEADER;

/*
 * Defines for handling compressed domain names
 */
#define INDIR_MASK	0xc0

extern	u_int16_t	_getshort __P((const u_char *));
extern	u_int32_t	_getlong __P((const u_char *));

/*
 * Inline versions of get/put short/long.  Pointer is advanced.
 *
 * These macros demonstrate the property of C whereby it can be
 * portable or it can be elegant but rarely both.
 */
#define GETSHORT(s, cp) { \
	register u_char *t_cp = (u_char *)(cp); \
	(s) = ((u_int16_t)t_cp[0] << 8) \
	    | ((u_int16_t)t_cp[1]) \
	    ; \
	(cp) += INT16SZ; \
}

#define GETLONG(l, cp) { \
	register u_char *t_cp = (u_char *)(cp); \
	(l) = ((u_int32_t)t_cp[0] << 24) \
	    | ((u_int32_t)t_cp[1] << 16) \
	    | ((u_int32_t)t_cp[2] << 8) \
	    | ((u_int32_t)t_cp[3]) \
	    ; \
	(cp) += INT32SZ; \
}

#define PUTSHORT(s, cp) { \
	register u_int16_t t_s = (u_int16_t)(s); \
	register u_char *t_cp = (u_char *)(cp); \
	*t_cp++ = t_s >> 8; \
	*t_cp   = t_s; \
	(cp) += INT16SZ; \
}

#define PUTLONG(l, cp) { \
	register u_int32_t t_l = (u_int32_t)(l); \
	register u_char *t_cp = (u_char *)(cp); \
	*t_cp++ = t_l >> 24; \
	*t_cp++ = t_l >> 16; \
	*t_cp++ = t_l >> 8; \
	*t_cp   = t_l; \
	(cp) += INT32SZ; \
}

#endif /* !_NAMESER_H_ */


			10.5.7.2 new version

#ifndef ARES_NAMESER_H
#define ARES_NAMESER_H

/* header file provided by liren@vivisimo.com */

#ifndef HAVE_ARPA_NAMESER_H

#define NS_PACKETSZ     512   /* maximum packet size */
#define NS_MAXDNAME     256   /* maximum domain name */
#define NS_MAXCDNAME    255   /* maximum compressed domain name */
#define NS_MAXLABEL     63
#define NS_HFIXEDSZ     12    /* #/bytes of fixed data in header */
#define NS_QFIXEDSZ     4     /* #/bytes of fixed data in query */
#define NS_RRFIXEDSZ    10    /* #/bytes of fixed data in r record */
#define NS_INT16SZ      2
#define NS_INADDRSZ     4
#define NS_IN6ADDRSZ    16
#define NS_CMPRSFLGS    0xc0  /* Flag bits indicating name compression. */
#define NS_DEFAULTPORT  53    /* For both TCP and UDP. */

typedef enum __ns_class {
    ns_c_invalid = 0,       /* Cookie. */
    ns_c_in = 1,            /* Internet. */
    ns_c_2 = 2,             /* unallocated/unsupported. */
    ns_c_chaos = 3,         /* MIT Chaos-net. */
    ns_c_hs = 4,            /* MIT Hesiod. */
    /* Query class values which do not appear in resource records */
    ns_c_none = 254,        /* for prereq. sections in update requests */
    ns_c_any = 255,         /* Wildcard match. */
    ns_c_max = 65536
} ns_class;

typedef enum __ns_type {
    ns_t_invalid = 0,       /* Cookie. */
    ns_t_a = 1,             /* Host address. */
    ns_t_ns = 2,            /* Authoritative server. */
    ns_t_md = 3,            /* Mail destination. */
    ns_t_mf = 4,            /* Mail forwarder. */
    ns_t_cname = 5,         /* Canonical name. */
    ns_t_soa = 6,           /* Start of authority zone. */
    ns_t_mb = 7,            /* Mailbox domain name. */
    ns_t_mg = 8,            /* Mail group member. */
    ns_t_mr = 9,            /* Mail rename name. */
    ns_t_null = 10,         /* Null resource record. */
    ns_t_wks = 11,          /* Well known service. */
    ns_t_ptr = 12,          /* Domain name pointer. */
    ns_t_hinfo = 13,        /* Host information. */
    ns_t_minfo = 14,        /* Mailbox information. */
    ns_t_mx = 15,           /* Mail routing information. */
    ns_t_txt = 16,          /* Text strings. */
    ns_t_rp = 17,           /* Responsible person. */
    ns_t_afsdb = 18,        /* AFS cell database. */
    ns_t_x25 = 19,          /* X_25 calling address. */
    ns_t_isdn = 20,         /* ISDN calling address. */
    ns_t_rt = 21,           /* Router. */
    ns_t_nsap = 22,         /* NSAP address. */
    ns_t_nsap_ptr = 23,     /* Reverse NSAP lookup (deprecated). */
    ns_t_sig = 24,          /* Security signature. */
    ns_t_key = 25,          /* Security key. */
    ns_t_px = 26,           /* X.400 mail mapping. */
    ns_t_gpos = 27,         /* Geographical position (withdrawn). */
    ns_t_aaaa = 28,         /* Ip6 Address. */
    ns_t_loc = 29,          /* Location Information. */
    ns_t_nxt = 30,          /* Next domain (security). */
    ns_t_eid = 31,          /* Endpoint identifier. */
    ns_t_nimloc = 32,       /* Nimrod Locator. */
    ns_t_srv = 33,          /* Server Selection. */
    ns_t_atma = 34,         /* ATM Address */
    ns_t_naptr = 35,        /* Naming Authority PoinTeR */
    ns_t_kx = 36,           /* Key Exchange */
    ns_t_cert = 37,         /* Certification record */
    ns_t_a6 = 38,           /* IPv6 address (deprecates AAAA) */
    ns_t_dname = 39,        /* Non-terminal DNAME (for IPv6) */
    ns_t_sink = 40,         /* Kitchen sink (experimentatl) */
    ns_t_opt = 41,          /* EDNS0 option (meta-RR) */
    ns_t_apl = 42,          /* Address prefix list (RFC3123) */
    ns_t_ds = 43,           /* Delegation Signer (RFC4034) */
    ns_t_sshfp = 44,        /* SSH Key Fingerprint (RFC4255) */
    ns_t_rrsig = 46,        /* Resource Record Signature (RFC4034) */
    ns_t_nsec = 47,         /* Next Secure (RFC4034) */
    ns_t_dnskey = 48,       /* DNS Public Key (RFC4034) */
    ns_t_tkey = 249,        /* Transaction key */
    ns_t_tsig = 250,        /* Transaction signature. */
    ns_t_ixfr = 251,        /* Incremental zone transfer. */
    ns_t_axfr = 252,        /* Transfer zone of authority. */
    ns_t_mailb = 253,       /* Transfer mailbox records. */
    ns_t_maila = 254,       /* Transfer mail agent records. */
    ns_t_any = 255,         /* Wildcard match. */
    ns_t_zxfr = 256,        /* BIND-specific, nonstandard. */
    ns_t_max = 65536
} ns_type;

typedef enum __ns_opcode {
    ns_o_query = 0,         /* Standard query. */
    ns_o_iquery = 1,        /* Inverse query (deprecated/unsupported). */
    ns_o_status = 2,        /* Name server status query (unsupported). */
                                /* Opcode 3 is undefined/reserved. */
    ns_o_notify = 4,        /* Zone change notification. */
    ns_o_update = 5,        /* Zone update message. */
    ns_o_max = 6
} ns_opcode;

typedef enum __ns_rcode {
    ns_r_noerror = 0,       /* No error occurred. */
    ns_r_formerr = 1,       /* Format error. */
    ns_r_servfail = 2,      /* Server failure. */
    ns_r_nxdomain = 3,      /* Name error. */
    ns_r_notimpl = 4,       /* Unimplemented. */
    ns_r_refused = 5,       /* Operation refused. */
    /* these are for BIND_UPDATE */
    ns_r_yxdomain = 6,      /* Name exists */
    ns_r_yxrrset = 7,       /* RRset exists */
    ns_r_nxrrset = 8,       /* RRset does not exist */
    ns_r_notauth = 9,       /* Not authoritative for zone */
    ns_r_notzone = 10,      /* Zone of record different from zone section */
    ns_r_max = 11,
    /* The following are TSIG extended errors */
    ns_r_badsig = 16,
    ns_r_badkey = 17,
    ns_r_badtime = 18
} ns_rcode;

#endif /* HAVE_ARPA_NAMESER_H */

#ifndef HAVE_ARPA_NAMESER_COMPAT_H

#define PACKETSZ         NS_PACKETSZ
#define MAXDNAME         NS_MAXDNAME
#define MAXCDNAME        NS_MAXCDNAME
#define MAXLABEL         NS_MAXLABEL
#define HFIXEDSZ         NS_HFIXEDSZ
#define QFIXEDSZ         NS_QFIXEDSZ
#define RRFIXEDSZ        NS_RRFIXEDSZ
#define INDIR_MASK       NS_CMPRSFLGS
#define NAMESERVER_PORT  NS_DEFAULTPORT

#define QUERY           ns_o_query

#define SERVFAIL        ns_r_servfail
#define NOTIMP          ns_r_notimpl
#define REFUSED         ns_r_refused
#undef NOERROR /* it seems this is already defined in winerror.h */
#define NOERROR         ns_r_noerror
#define FORMERR         ns_r_formerr
#define NXDOMAIN        ns_r_nxdomain

#define C_IN            ns_c_in
#define C_CHAOS         ns_c_chaos
#define C_HS            ns_c_hs
#define C_NONE          ns_c_none
#define C_ANY           ns_c_any

#define T_A             ns_t_a
#define T_NS            ns_t_ns
#define T_MD            ns_t_md
#define T_MF            ns_t_mf
#define T_CNAME         ns_t_cname
#define T_SOA           ns_t_soa
#define T_MB            ns_t_mb
#define T_MG            ns_t_mg
#define T_MR            ns_t_mr
#define T_NULL          ns_t_null
#define T_WKS           ns_t_wks
#define T_PTR           ns_t_ptr
#define T_HINFO         ns_t_hinfo
#define T_MINFO         ns_t_minfo
#define T_MX            ns_t_mx
#define T_TXT           ns_t_txt
#define T_RP            ns_t_rp
#define T_AFSDB         ns_t_afsdb
#define T_X25           ns_t_x25
#define T_ISDN          ns_t_isdn
#define T_RT            ns_t_rt
#define T_NSAP          ns_t_nsap
#define T_NSAP_PTR      ns_t_nsap_ptr
#define T_SIG           ns_t_sig
#define T_KEY           ns_t_key
#define T_PX            ns_t_px
#define T_GPOS          ns_t_gpos
#define T_AAAA          ns_t_aaaa
#define T_LOC           ns_t_loc
#define T_NXT           ns_t_nxt
#define T_EID           ns_t_eid
#define T_NIMLOC        ns_t_nimloc
#define T_SRV           ns_t_srv
#define T_ATMA          ns_t_atma
#define T_NAPTR         ns_t_naptr
#define T_KX            ns_t_kx
#define T_CERT          ns_t_cert
#define T_A6            ns_t_a6
#define T_DNAME         ns_t_dname
#define T_SINK          ns_t_sink
#define T_OPT           ns_t_opt
#define T_APL           ns_t_apl
#define T_DS            ns_t_ds
#define T_SSHFP         ns_t_sshfp
#define T_RRSIG         ns_t_rrsig
#define T_NSEC          ns_t_nsec
#define T_DNSKEY        ns_t_dnskey
#define T_TKEY          ns_t_tkey
#define T_TSIG          ns_t_tsig
#define T_IXFR          ns_t_ixfr
#define T_AXFR          ns_t_axfr
#define T_MAILB         ns_t_mailb
#define T_MAILA         ns_t_maila
#define T_ANY           ns_t_any

#endif /* HAVE_ARPA_NAMESER_COMPAT_H */

#endif /* ARES_NAMESER_H */

			10.5.7.3
		10.5.8 My code snippets

			10.5.8.1  get list of nameservers from _res (loaded from resolv.conf) 
int getConfiguredNameserversNames(vector<string> &sarr_ret_ns )
{
        printf("Loading list of configured nameserver names...\n");

        sockaddr_in addr ;
        char str[INET_ADDRSTRLEN];
        for ( int i=0; i < _res.nscount; ++i ) {
            addr = _res.nsaddr_list[i];
            inet_ntop(AF_INET,&(addr.sin_addr), str, INET_ADDRSTRLEN);
            sarr_ret_ns.push_back(str);
        }
}

			10.5.8.2 gethostbyname
int    DNS_DIAG::queryDomainArecordInAllNS(const TestParams & test_params, TestResults & test_res) 
{


        test_res.s_remediation = "Adress record found";
        test_res.s_result = DiagConsts::s_test_pass_status;
        test_res.t_elapsed_time = 0;
        string domain = test_params.s_joinpoint ;

        m_dLog->diagLog (DIAG_DEBUG,__FILE__, __LINE__, "DNS_DIAG::queryDomainArecordInAllNS() - gethostbyname query A record of domain %s in all configured nameservers...\n", domain.c_str());


        struct hostent *p_host; 

        struct timeval t_start, t_end;
        gettimeofday(&t_start, NULL);
        test_res.tval_start_time = t_start; 
 
        p_host = gethostbyname(domain.c_str());
        gettimeofday(&t_end, NULL);
        long long ms_interval = ((t_end.tv_sec * 1000000LL + t_end.tv_usec) - (t_start.tv_sec * 1000000LL + t_start.tv_usec)) ;
        m_dLog->diagLog (DIAG_DEBUG,__FILE__, __LINE__, "DNS_DIAG::queryDomainArecordInAllNS() - Took %ld microseconds\n", ms_interval);
        test_res.t_elapsed_time = ms_interval;

        if (p_host == NULL) {
             m_dLog->diagLog (DIAG_DEBUG,__FILE__, __LINE__, "There is no address for domain %s\n", domain.c_str() );
             
             test_res.s_remediation = rtype_ErrorParser( h_errno, ns_t_a, domain )  ;
             test_res.s_result = DiagConsts::s_test_fail_status;
            return 1;
            }
        else
        {
                m_dLog->diagLog (DIAG_DEBUG,__FILE__, __LINE__, "DNS_DIAG::queryDomainArecordInAllNS() - Found domain A record %s \n " , p_host->h_name);
                if (ms_interval > DNS_Consts::i_higher_threshold)
                {

                    m_dLog->diagLog (DIAG_DEBUG,__FILE__, __LINE__, "DNS_DIAG::queryDomainArecordInAllNS() - Higher threshold exceeded  for %s\n " , p_host->h_name);
                    test_res.s_remediation = "Query response is very slow. Please check DNS configuration";
                    test_res.s_result = DiagConsts::s_test_fail_status;
                }

                else if (ms_interval > DNS_Consts::i_lower_threshold)
                {
                    m_dLog->diagLog (DIAG_DEBUG,__FILE__, __LINE__, "DNS_DIAG::queryDomainArecordInAllNS() - Lower threshold exceeded  for %s%s\n " , p_host->h_name);
                    test_res.s_remediation = "Query response is slow. Please check DNS configuration";
                    test_res.s_result = DiagConsts::s_test_warn_status;
                }
                else
                {
                    m_dLog->diagLog (DIAG_DEBUG,__FILE__, __LINE__, "DNS_DIAG::queryDomainArecordInAllNS() - Query response is ok for %s.\n " , p_host->h_name);

                }
        }

        return 0;
}


			10.5.8.3 res_query A record
int    DNS_DIAG::res_queryDomainArecordInAllNS(const TestParams & test_params, TestResults & test_res) 
{
        test_res.s_remediation = "Adress record found";
        test_res.s_result = DiagConsts::s_test_pass_status;
        test_res.t_elapsed_time = 0;
        string domain = test_params.s_joinpoint ;

        m_dLog->diagLog (DIAG_DEBUG,__FILE__, __LINE__, "DNS_DIAG::res_queryDomainArecordInAllNS() - res_query A record of domain %s in all configured nameservers...\n", domain.c_str());

        union {
            HEADER hdr;               /* defined in resolv.h */
            u_char buf[NS_PACKETSZ];  /* defined in arpa/nameser.h */
        } query, response;            /* query and response buffers */
        int responseLen, queryLen;    /* buffer lengths */
        
        u_char     *cp;       /* character pointer to parse DNS message */
        
        ns_msg handle;  /* handle for response message */
        ns_rr rr;       /* expanded resource record */


       /*
        * Turn off the search algorithm and turn off appending
        * the local domain name before we call gethostbyname(  );
        * the name server's domain names will be fully qualified.
        */
        _res.options &= ~(RES_DNSRCH | RES_DEFNAMES);

 
        /*
         * Turn off recursion.  We don't want the name server
         * querying another server for the SOA record; this name
         * server ought to be authoritative for this data.
         */
        _res.options &= ~RES_RECURSE;

        /*
         * Reduce the number of retries.  We may be checking
         * several name servers, so we don't want to wait too
         * long for any one server.  With two retries and only
         * one address to query, we'll wait at most 15 seconds.
         */
        _res.retry = 2;

        m_dLog->diagLog (DIAG_DEBUG,__FILE__, __LINE__, "DNS_DIAG::res_queryDomainArecordInAllNS() - Preparing query\n" );
        queryLen = res_mkquery(
                     ns_o_query,      /* regular query         */
                     domain.c_str(),          /* the domain to look up */
                     ns_c_in,         /* Internet type         */
                     ns_t_a,        /* look up an A record */
                     (u_char *)NULL,  /* always NULL       */
                     0,               /* length of NULL        */
                     (u_char *)NULL,  /* always NULL       */
                     (u_char *)&query,/* buffer for the query  */
                     sizeof(query));  /* size of the buffer    */

        struct timeval t_start, t_end;
        gettimeofday(&t_start, NULL);
        test_res.tval_start_time = t_start; 
 
        /*
         * Send the query message.  If there is no name server
         * running on the target host, res_send(  ) returns -1
         * and errno is ECONNREFUSED.  First, clear out errno.
         */
        m_dLog->diagLog (DIAG_DEBUG,__FILE__, __LINE__, "DNS_DIAG::res_queryDomainArecordInAllNS() - Sending query\n" );
        errno = 0;
        if((responseLen = res_send((u_char *)&query,/* the query  */
                                   queryLen,        /* true length*/
                                   (u_char *)&response,/*buffer  */
                                   sizeof(response)))  /*buf size*/
                                        < 0){          /* error  */
            if(errno == ECONNREFUSED) { /* no server on the host */
                 m_dLog->diagLog (DIAG_DEBUG,__FILE__, __LINE__, "DNS_DIAG::res_queryDomainArecordInAllNS() -  Connection to name server refused \n");
                 test_res.s_remediation = string("Connection to name server refused. Please check network connectivity and name server is online");
            } else {                   /* anything else: no response */
                 m_dLog->diagLog (DIAG_DEBUG,__FILE__, __LINE__, "DNS_DIAG::res_queryDomainArecordInAllNS() -  No response from nameserver\n");
                 test_res.s_remediation = string("No response from nameserver. Please check server is configuration");
            }
            test_res.s_result = DiagConsts::s_test_fail_status;
            return 1;
        } //if((responseLen = res_send((u_char *)&query,/* the query  */

        gettimeofday(&t_end, NULL);
        long long ms_interval = ((t_end.tv_sec * 1000000LL + t_end.tv_usec) - (t_start.tv_sec * 1000000LL + t_start.tv_usec)) ;
        //LogPrintf (LOG_DEBUG, __LINE__, "DNS_DIAG::res_queryDomainArecordInAllNS() - Took %ld microseconds\n", ms_interval);
        m_dLog->diagLog (DIAG_DEBUG,__FILE__, __LINE__, "DNS_DIAG::res_queryDomainArecordInAllNS() - Took %ld microseconds\n", ms_interval);

        test_res.t_elapsed_time = ms_interval;
        /*
         * Initialize a handle to this response.  The handle will
         * be used later to extract information from the response.
         */

        if (ns_initparse(response.buf, responseLen, &handle) < 0) {
            m_dLog->diagLog (DIAG_DEBUG,__FILE__, __LINE__, "DNS_DIAG::res_queryDomainArecordInAllNS() -  ns_initparse: %s\n", strerror(errno));
            test_res.s_remediation = string("Failed to initialize response parser. Please contact TAC for assistance.");
            test_res.s_result = DiagConsts::s_test_fail_status;
            return 1;
        }

        m_dLog->diagLog (DIAG_DEBUG,__FILE__, __LINE__, "DNS_DIAG::res_queryDomainArecordInAllNS() - Parsing response of size %d, containing %d answer sections\n" , ns_msg_size(handle), ns_msg_count(handle, ns_s_an) );

        /*
         * If the response reports an error, issue a message
         */
        if(ns_msg_getflag(handle, ns_f_rcode) != ns_r_noerror){
            m_dLog->diagLog (DIAG_DEBUG,__FILE__, __LINE__, "DNS_DIAG::res_queryDomainArecordInAllNS() - Response contains an error\n" , ns_msg_size(handle), ns_msg_count(handle, ns_s_an) );
            
            test_res.s_remediation = returnCodeError((ns_rcode) ns_msg_getflag(handle, ns_f_rcode));
            test_res.s_result = DiagConsts::s_test_fail_status;
            return 1;
        }

        /*
         * If the response contains no answer, issue a message
         */
        if(ns_msg_count(handle, ns_s_an) == 0 ){
            m_dLog->diagLog (DIAG_DEBUG,__FILE__, __LINE__, "DNS_DIAG::res_queryDomainArecordInAllNS() - Response contains no answer\n");
            test_res.s_remediation = string( "Response contains no answer. Please check DNS configuration.");
            test_res.s_result = DiagConsts::s_test_fail_status;
            return 1;
        }
            
// Uncomment to handle unauthoratibe respons
//        /*
//         * Did we receive an authoritative response?  Check the
//         * authoritative answer bit.  If this name server isn't
//         * authoritative, report it, and go on to the next server.
//         */
//        if(!ns_msg_getflag(handle, ns_f_aa)){
//            (void) fprintf(stderr,
//                "%s is not authoritative for %s\n",
//                nsList[nsNum], domain);
//            continue; /* nsNum for-loop */
//        }

// Uncomment to handle multiple answers in respons
//        /*
//         * The response should only contain one answer; if more,
//         * report the error, and proceed to the next server.
//         */
//        if(ns_msg_count(handle, ns_s_an) != 1){
//            (void) fprintf(stderr,
//                "%s: expected 1 answer, got %d\n",
//                nsList[nsNum], ns_msg_count(handle, ns_s_an));
//            continue; /* nsNum for-loop */
//        }

        m_dLog->diagLog (DIAG_DEBUG,__FILE__, __LINE__, "DNS_DIAG::res_queryDomainArecordInAllNS() - Extracting an rr \n" , ns_msg_size(handle), ns_msg_count(handle, ns_s_an) );
        /*
         * Expand the answer section record number 0 into rr.
         */
        if (ns_parserr(&handle, ns_s_an, 0, &rr)) {
                if (errno != ENODEV){
                        m_dLog->diagLog (DIAG_DEBUG,__FILE__, __LINE__, "DNS_DIAG::res_queryDomainArecordInAllNS() -  ns_parserr: %s\n", strerror(errno));
                        test_res.s_remediation = string("rr rec # 0 is empty. Error: "+string(strerror(errno)));
                        test_res.s_result = DiagConsts::s_test_fail_status;
                        return 1;
                }
        }

        m_dLog->diagLog (DIAG_DEBUG,__FILE__, __LINE__, "DNS_DIAG::res_queryDomainArecordInAllNS() -  rr type %d, name %s, len %d\n" , ns_rr_type(rr),ns_rr_name(rr), ns_rr_rdlen(rr) );
        /*
         * We asked for an A record; if we got something else,
         * report the error
         */
        if (ns_rr_type(rr) != ns_t_a) {
            m_dLog->diagLog (DIAG_DEBUG,__FILE__, __LINE__, "DNS_DIAG::res_queryDomainArecordInAllNS() -   expected answer type %d, got %d\n", ns_t_a, ns_rr_type(rr));
            test_res.s_remediation = string("rr rec is not of type A");
            test_res.s_result = DiagConsts::s_test_fail_status;
            return 1;
        }

     //   //LogPrintf (LOG_DEBUG, __LINE__, "DNS_DIAG::res_queryDomainArecordInAllNS() - Found domain A record %s \n " , p_host->h_name);
     //   printf ("DNS_DIAG::res_queryDomainArecordInAllNS() - Found domain A record %s \n " , p_host->h_name);
          if (ms_interval > DNS_Consts::i_higher_threshold)
          {

              printf ("DNS_DIAG::res_queryDomainArecordInAllNS() - Higher threshold exceeded for %s query\n " ,ns_rr_name(rr));
              test_res.s_remediation = "Query response is very slow. Please check DNS configuration";
              test_res.s_result = DiagConsts::s_test_fail_status;
          }

          else if (ms_interval > DNS_Consts::i_lower_threshold)
          {
              m_dLog->diagLog (DIAG_DEBUG,__FILE__, __LINE__, "DNS_DIAG::res_queryDomainArecordInAllNS() - Lower threshold exceeded for %s query\n " ,ns_rr_name(rr));
              test_res.s_remediation = "Query response is slow. Please check DNS configuration";
              test_res.s_result = DiagConsts::s_test_warn_status;
          }
          else
          {
              m_dLog->diagLog (DIAG_DEBUG,__FILE__, __LINE__, "DNS_DIAG::res_queryDomainArecordInAllNS() - Query response is ok for %s query.\n", ns_rr_name(rr) );

          }

        return 0;

} //int    DNS_DIAG::res_queryDomainArecordInAllNS(const TestParams & test_params, TestResults & test_res) 

			10.5.8.4 Getaddrinfo for resolv hostname to IP

				10.5.8.4.1 Simple
/Users/<user>/Desktop/Work/code/CPP/dns
$ ls
GetAddr.cpp	a.out

Please provide name to resolv
kkk
name to resolv - kkk
getaddrinfo() failed with error code 8 - error nodename nor servname provided, or not known.
$ ./a.out 
Please provide name to resolv
google.com
name to resolv - google.com
Found domain IPv4 A record 74.125.195.139 
Found domain IPv4 A record 74.125.195.101 
Found domain IPv4 A record 74.125.195.100 
Found domain IPv4 A record 74.125.195.102 
Found domain IPv4 A record 74.125.195.138 
Found domain IPv4 A record 74.125.195.113 

/*
 * =====================================================================================
 *
 *       Filename:  GetAddr.cpp
 *
 *    Description:  GetAddrinfo 
 *
 *        Version:  1.0
 *        Created:  07/03/2014 10:49:08
 *       Revision:  none
 *       Compiler:  gcc
 *
 *         Author:  Yosi Izaq
 *   Organization:  
 *
 * =====================================================================================
 */
#include <stdlib.h>
#include <stdio.h>
#include <string.h>


// For getaddrinfo 
#include <sys/types.h>
#include <sys/socket.h>
#include <netdb.h>
#include <netinet/in.h> /* for sockaddr_in and sockaddr_in6 */
#include <arpa/inet.h> /* for sockaddr_in and sockaddr_in6 */

#define _PREF_DCS_RESOLVER_RETRIES 2
#define _PREF_DCS_RESOLVER_TIMEOUT 3
// For getaddrinfo 

int main(int argc, const char *argv[])
{
	char s_name[160];

	if (argc == 1) {
		printf("Please provide name to resolv\n");
		scanf("%s", s_name);
	}
	else if (argc == 2){

		strcpy(s_name, argv[1]);
	}
	printf("name to resolv - %s\n", s_name);

	struct addrinfo aiHints;
	struct addrinfo *pres, *aiList = NULL;
	int retVal;

	// Setup the hints address info structure
	// which is passed to the getaddrinfo() function
	memset(&aiHints, 0, sizeof(aiHints));
	aiHints.ai_family = AF_INET; // Only IPv4, for IPv6 also set PF_UNSPEC
	aiHints.ai_socktype = SOCK_STREAM; // TCP query
	aiHints.ai_protocol = IPPROTO_TCP;
	 
	// Call getaddrinfo(). If the call succeeds, the aiList variable
	// will hold a linked list f addrinfo structures containing
	// response information about the host
	if ((retVal = getaddrinfo(s_name, NULL, &aiHints, &aiList)) != 0)
	{
	  printf("getaddrinfo() failed with error code %d - error %s.\n", retVal, gai_strerror(retVal));
	}


         struct sockaddr_in  *p_sa4;        /* to manipulate IPv4 addresses */
         struct sockaddr_in6 *p_sa6;        /* to manipulate IPv6 addresses */
         char                 c_v6[42];     /* for max IPv6 address */

	for ( pres = aiList; pres ; pres = pres->ai_next) {
             switch(pres->ai_family)
             {
             case AF_INET: /* IPv4 type */
                 p_sa4 = (struct sockaddr_in *)pres->ai_addr; /* cast to IPv4 socket type */
                 printf("Found domain IPv4 A record %s \n" , inet_ntoa(p_sa4->sin_addr));
                 break;
             case AF_INET6: /* IPv6 type*/
                 p_sa6 = (struct sockaddr_in6 *)pres->ai_addr; /* cast to IPv6 socket type */
                 printf("Found domain IPv6 A record %s  \n", inet_ntop(pres->ai_family, &p_sa6->sin6_addr, c_v6,42) );
                 break;
             default:
                 printf("Found domain A record of unknown ai_family %d\n", pres->ai_family);
                 break;
             }// switch(p_results->ai_family)
	}

	return 0;
}

				10.5.8.4.2 Customized

/*
 * =====================================================================================
 *
 *       Filename:  GetAddr.cpp
 *
 *    Description:  GetAddrinfo 
 *
 *        Version:  1.0
 *        Created:  07/03/2014 10:49:08
 *       Revision:  none
 *       Compiler:  gcc
 *
 *         Author:  Yosi Izaq
 *   Organization:  
 *
 * =====================================================================================
 */
#include <stdlib.h>
#include <stdio.h>
#include <string.h>


// For getaddrinfo 
#include <sys/types.h>
#include <sys/socket.h>
#include <netdb.h>
#include <netinet/in.h> /* for sockaddr_in and sockaddr_in6 */
#include <arpa/inet.h> /* for sockaddr_in and sockaddr_in6 */

// For libresolv
#include <arpa/nameser.h>
#include <resolv.h>

#define _PREF_DCS_RESOLVER_RETRIES 2
#define _PREF_DCS_RESOLVER_TIMEOUT 3
// For getaddrinfo 

int main(int argc, const char *argv[])
{
	char s_name[160];

	if (argc == 1) {
		printf("Please provide name to resolv\n");
		scanf("%s", s_name);
	}
	else if (argc == 2){

		strcpy(s_name, argv[1]);
	}
	printf("name to resolv - %s\n", s_name);

	//Init resolver
	if (RES_INIT) {
		printf("Resolver already initialized \n");
	}
	else {
		
		printf("Resolver not initialized \n");
		if (res_init()) { 
			
			printf("Resolver init failed! \n");
			return 1;
		}
		else {
			
			printf("Resolver initialization succeeded \n");
		}
	}

	// set retries 2, TO 3
	_res.retrans = 3;
	_res.retry = 2;

	struct addrinfo aiHints;
	struct addrinfo *pres, *aiList = NULL;
	int retVal;

	// Setup the hints address info structure
	// which is passed to the getaddrinfo() function
	memset(&aiHints, 0, sizeof(aiHints));
	aiHints.ai_family = AF_INET; // Only IPv4, for IPv6 also set PF_UNSPEC
	aiHints.ai_socktype = SOCK_STREAM; // TCP query
	aiHints.ai_protocol = IPPROTO_TCP;
	 
	// Call getaddrinfo(). If the call succeeds, the aiList variable
	// will hold a linked list f addrinfo structures containing
	// response information about the host
	if ((retVal = getaddrinfo(s_name, NULL, &aiHints, &aiList)) != 0)
	{
	  printf("getaddrinfo() failed with error code %d - error %s.\n", retVal, gai_strerror(retVal));
	}


         struct sockaddr_in  *p_sa4;        /* to manipulate IPv4 addresses */
         struct sockaddr_in6 *p_sa6;        /* to manipulate IPv6 addresses */
         char                 c_v6[42];     /* for max IPv6 address */

	for ( pres = aiList; pres ; pres = pres->ai_next) {
             switch(pres->ai_family)
             {
             case AF_INET: /* IPv4 type */
                 p_sa4 = (struct sockaddr_in *)pres->ai_addr; /* cast to IPv4 socket type */
                 printf("Found domain IPv4 A record %s \n" , inet_ntoa(p_sa4->sin_addr));
                 break;
             case AF_INET6: /* IPv6 type*/
                 p_sa6 = (struct sockaddr_in6 *)pres->ai_addr; /* cast to IPv6 socket type */
                 printf("Found domain IPv6 A record %s  \n", inet_ntop(pres->ai_family, &p_sa6->sin6_addr, c_v6,42) );
                 break;
             default:
                 printf("Found domain A record of unknown ai_family %d\n", pres->ai_family);
                 break;
             }// switch(p_results->ai_family)
	}

	return 0;
}

				10.5.8.4.3
			10.5.8.5

		10.5.9 nslookup & dig sources

			10.5.9.1 http://www.isc.org/index.pl?/sw/bind/bind9.php
All is here> ftp://ftp.isc.org/isc/bind9/9.2.3/bind-9.2.3.tar.gz
Homepage> http://www.isc.org/index.pl?/sw/bind/bind9.php
c:\work\code\bind\bind-9.2.3\bin\dig\dig.c 


			10.5.9.2
		10.5.10 libresolv_query.c
/*
 * Copyright (c) 2013 by Wil Tan <wil@cloudregistry.net>
 *
 * Based on dump_dns.c from the dnscap <https://www.dns-oarc.net/tools/dnscap>
 * originally written by Paul Vixie.
 *
 * Copyright (c) 2007 by Internet Systems Consortium, Inc. ("ISC")
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND ISC DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS.  IN NO EVENT SHALL ISC BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT
 * OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */
 
#include <sys/types.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <arpa/nameser.h>
#include <resolv.h>
#include <errno.h>
#include <string.h>
#include <unistd.h>
 
 
extern const char *_res_opcodes[];
 
#define MY_GET16(s, cp) do { \
        register const u_char *t_cp = (const u_char *)(cp); \
        (s) = ((u_int16_t)t_cp[0] << 8) \
            | ((u_int16_t)t_cp[1]) \
            ; \
        (cp) += NS_INT16SZ; \
} while (0)
 
#define MY_GET32(l, cp) do { \
        register const u_char *t_cp = (const u_char *)(cp); \
        (l) = ((u_int32_t)t_cp[0] << 24) \
            | ((u_int32_t)t_cp[1] << 16) \
            | ((u_int32_t)t_cp[2] << 8) \
            | ((u_int32_t)t_cp[3]) \
            ; \
        (cp) += NS_INT32SZ; \
} while (0)
 
static void
dump_dns_rr(ns_msg *msg, ns_rr *rr, ns_sect sect, FILE *trace) {
	char buf[NS_MAXDNAME];
	u_int class, type;
	const u_char *rd;
	u_int32_t soa[5];
	u_int16_t mx;
	int n;
 
	class = ns_rr_class(*rr);
	type = ns_rr_type(*rr);
	fprintf(trace, "%s,%s,%s",
		ns_rr_name(*rr),
		p_class(class),
		p_type(type));
	if (sect == ns_s_qd)
		return;
	fprintf(trace, ",%lu", (u_long)ns_rr_ttl(*rr));
	rd = ns_rr_rdata(*rr);
	switch (type) {
	case ns_t_soa:
		n = ns_name_uncompress(ns_msg_base(*msg), ns_msg_end(*msg),
				       rd, buf, sizeof buf);
		if (n < 0)
			goto error;
		putc(',', trace);
		fputs(buf, trace);
		rd += n;
		n = ns_name_uncompress(ns_msg_base(*msg), ns_msg_end(*msg),
				       rd, buf, sizeof buf);
		if (n < 0)
			goto error;
		putc(',', trace);
		fputs(buf, trace);
		rd += n;
		if (ns_msg_end(*msg) - rd < 5*NS_INT32SZ)
			goto error;
		for (n = 0; n < 5; n++)
			MY_GET32(soa[n], rd);
		sprintf(buf, "%u,%u,%u,%u,%u",
			soa[0], soa[1], soa[2], soa[3], soa[4]);
		break;
	case ns_t_a:
		inet_ntop(AF_INET, rd, buf, sizeof buf);
		break;
	case ns_t_aaaa:
		inet_ntop(AF_INET6, rd, buf, sizeof buf);
		break;
	case ns_t_mx:
		MY_GET16(mx, rd);
		fprintf(trace, ",%u", mx);
		/* FALLTHROUGH */
	case ns_t_ns:
	case ns_t_ptr:
	case ns_t_cname:
		n = ns_name_uncompress(ns_msg_base(*msg), ns_msg_end(*msg),
				       rd, buf, sizeof buf);
		if (n < 0)
			goto error;
		break;
	case ns_t_txt:
		snprintf(buf, (size_t)rd[0]+1, "%s", rd+1);
		break;
	default:
 error:
		sprintf(buf, "[%u]", ns_rr_rdlen(*rr));
	}
	if (buf[0] != '\0') {
		putc(',', trace);
		fputs(buf, trace);
	}
}
 
 
static void
dump_dns_sect(ns_msg *msg, ns_sect sect, FILE *trace, const char *endline) {
        int rrnum, rrmax;
        const char *sep;
        ns_rr rr;
 
        rrmax = ns_msg_count(*msg, sect);
        if (rrmax == 0) {
                fputs(" 0", trace);
                return;
        }
        fprintf(trace, " %s%d", endline, rrmax);
        sep = "";
        for (rrnum = 0; rrnum < rrmax; rrnum++) {
                if (ns_parserr(msg, sect, rrnum, &rr)) {
                        fputs(strerror(errno), trace);
                        return;
                }
                fprintf(trace, " %s", sep);
                dump_dns_rr(msg, &rr, sect, trace);
                sep = endline;
        }
}
 
void
dump_dns(const u_char *payload, size_t paylen,
	  FILE *trace, const char *endline)
{
	u_int opcode, rcode, id;
	const char *sep;
	ns_msg msg;
 
	fprintf(trace, " %sdns ", endline);
	if (ns_initparse(payload, paylen, &msg) < 0) {
		fputs(strerror(errno), trace);
		return;
	}
	opcode = ns_msg_getflag(msg, ns_f_opcode);
	rcode = ns_msg_getflag(msg, ns_f_rcode);
	id = ns_msg_id(msg);
	fprintf(trace, "%s,%s,%u", _res_opcodes[opcode], p_rcode(rcode), id);
	sep = ",";
#define FLAG(t,f) if (ns_msg_getflag(msg, f)) { \
			fprintf(trace, "%s%s", sep, t); \
			sep = "|"; \
		  }
	FLAG("qr", ns_f_qr);
	FLAG("aa", ns_f_aa);
	FLAG("tc", ns_f_tc);
	FLAG("rd", ns_f_rd);
	FLAG("ra", ns_f_ra);
	FLAG("z", ns_f_z);
	FLAG("ad", ns_f_ad);
	FLAG("cd", ns_f_cd);
#undef FLAG
 
	dump_dns_sect(&msg, ns_s_an, trace, endline);
}
 
 
int main() {
	u_char answer[1024] = "";
	res_init();
	int rv = res_query("google.com", ns_c_in, ns_t_txt, answer, sizeof(answer));
	printf("rv=%d\n", rv);
	dump_dns(answer, rv, stdout, "\n");
	printf("\n");
 
}


		10.5.11
	10.6 DNS FAQ

		10.6.1 lookup domain controller srv record 
$ nslookup
(set nameserver - in this case domain nameserver)
> server <internal-ip>
Default Server:  [<internal-ip>]
Address:  <internal-ip>

> set type=srv
> _ldap._tcp.dc._msdcs.UK.com     SRV service location:
          priority       = 0
          weight         = 100
          port           = 389
          svr hostname   = ukdc4.uk.com
_ldap._tcp.dc._msdcs.UK.com     SRV service location:
          priority       = 0
          weight         = 100
          port           = 389
          svr hostname   = ukdc2.uk.com
_ldap._tcp.dc._msdcs.UK.com     SRV service location:
          priority       = 0
          weight         = 100
          port           = 389
          svr hostname   = ukdc1.uk.com
_ldap._tcp.dc._msdcs.UK.com     SRV service location:
          priority       = 0
          weight         = 100
          port           = 389
          svr hostname   = ukdc3.uk.com
ukdc4.uk.com    internet address = <internal-ip>
ukdc2.uk.com    internet address = <internal-ip>
ukdc1.uk.com    internet address = <internal-ip>
ukdc3.uk.com    internet address = <internal-ip>
> 

lookup GCs of domain
# nslookup 
> set type=srv
> _ldap._tcp.gc._msdcs.uk.com        
Server:         <internal-ip>
Address:        <internal-ip>#53

Non-authoritative answer:
_ldap._tcp.gc._msdcs.uk.com     service = 0 100 3268 ukdc1.uk.com.

Authoritative answers can be found from:
ukdc1.uk.com    internet address = <internal-ip>
		10.6.2 How do I find the authoritative name-server for a domain name?

--------------------------------------------------------------------------------
You'll want the SOA (Start of Authority) record for a given domain name, and this is how you accomplish it using the universally available nslookup command line tool:

command line> nslookup
> set querytype=soa
> stackoverflow.com
Server:         217.30.180.230
Address:        217.30.180.230#53

Non-authoritative answer:
stackoverflow.com
        origin = ns51.domaincontrol.com # ("primary name server" on Windows)
        mail addr = dns.jomax.net       # ("responsible mail addr" on Windows)
        serial = 2008041300
        refresh = 28800
        retry = 7200
        expire = 604800
        minimum = 86400
Authoritative answers can be found from:
stackoverflow.com       nameserver = ns52.domaincontrol.com.
stackoverflow.com       nameserver = ns51.domaincontrol.com.
The origin (or primary name server on Windows) line tells you that ns51.domaincontrol is the main name server for stackoverflow.com.

At the end of output all authoritative servers, including backup servers for the given domain, are listed.
--------------------------------------------------------------------------------
You used the singular in your question but there are typically several authoritative name servers, the RFC 1034 recommends at least two.

Unless you mean "primary name server" and not "authoritative name server". The secondary name servers are authoritative.

To find out the name servers of a domain on Unix:

  % dig +short NS stackoverflow.com
 ns52.domaincontrol.com.
 ns51.domaincontrol.com.
To find out the server listed as primary (the notion of "primary" is quite fuzzy these days and typically has no good answer):

% dig +short  SOA stackoverflow.com | cut -d' ' -f1
ns51.domaincontrol.com.
To check discrepencies between name servers, my preference goes to the old check_soa tool, described in Liu & Albitz "DNS & BIND" book (O'Reilly editor). The source code is available in http://examples.oreilly.com/dns5/

% check_soa stackoverflow.com
ns51.domaincontrol.com has serial number 2008041300
ns52.domaincontrol.com has serial number 2008041300
Here, the two authoritative name servers have the same serial number. Good.
--------------------------------------------------------------------------------
On *nix:

$ dig -t ns <domain name>
--------------------------------------------------------------------------------
The term you should be googling is "authoritative," not "definitive".

On Linux or Mac you can use the commands whois, dig, host, nslookup or several others. nslookup might also work on Windows.

An example:

$ whois stackoverflow.com
[...]
   Domain servers in listed order:
      NS51.DOMAINCONTROL.COM
      NS52.DOMAINCONTROL.COM
As for the extra credit: Yes, it is possible.

aryeh is definitely wrong, as his suggestion usually will only give you the IP address for the hostname. If you use dig, you have to look for NS records, like so:

dig ns stackoverflow.com
Keep in mind that this may ask your local DNS server and thus may give wrong or out-of-date answers that it has in its cache.
--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
		10.6.3 Find AD DC SRV records of given site
nslookup -q=SRV <internal-host>
nslookup -q=SRV <internal-host>

		10.6.4
	10.7 Linux admin


		10.7.1  nscd - name service cache daemon
Description


 Nscd is a daemon that provides a cache for the most common name service requests. The default configuration file, /etc/nscd.conf, determines the behavior of the cache daemon. See nscd.conf(5).
Nscd provides caching for accesses of the passwd(5), group(5), and hosts(5) databases through standard libc interfaces, such as getpwnam(3), getpwuid(3), getgrnam(3), getgrgid(3), gethostbyname(3), and others.

There are two caches for each database: a positive one for items found, and a negative one for items not found. Each cache has a separate TTL (time-to-live) period for its data. Note that the shadow file is specifically not cached. getspnam(3) calls remain uncached as a result.


			10.7.1.1  restart
service nscd restart
			10.7.1.2

	10.8
```

## See Also

<!-- backlinks:start -->
### Backlinks

* [Dynamic DNS (DDNS)](/Network/dynamic-dns-ddns.md)
<!-- backlinks:end -->
