---
type: reference
title: Structure
description: Subsection 15.1.1 of Certificate.
tags: [kb-ssl]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "Network/sslKB#15.1.1"
---

# 15.1.1 Structure

[↑ Certificate](/Network/kb-ssl/16-x509/01-certificate/README.md)

#### 15.1.1.1 Wikipedia

```text
In cryptography, X.509 is an ITU-T standard for a public key infrastructure (PKI) and Privilege Management Infrastructure (PMI). X.509 specifies, amongst other things, standard formats for public key certificates, certificate revocation lists, attribute certificates, and a certification path validation algorithm.
Contents

|    1 History and usage
|    2 Certificates
|        2.1 Structure of a certificate
|        2.2 Extensions informing a specific usage of a certificate
|        2.3 Certificate filename extensions
|    3 Sample X.509 certificates
|    4 Security
|        4.1 Specification: complexity and lack of quality
|        4.2 Architectural weaknesses
|        4.3 Problems with certificate authorities
|        4.4 Implementation issues
|        4.5 Exploits
|    5 PKI standards for X.509
|    6 Certification authority
|    7 Public-Key Infrastructure (X.509) Working Group
|    8 See also
|    9 Protocols and standards supporting X.509 certificates
|    10 References
|    11 External links

History and usage

X.509 was initially issued on July 3, 1988 and was begun in association with the X.500 standard. It assumes a strict hierarchical system of certificate authorities (CAs) for issuing the certificates. This contrasts with web of trust models, like PGP, where anyone (not just special CAs) may sign and thus attest to the validity of others' key certificates. Version 3 of X.509 includes the flexibility to support other topologies like bridges and meshes (RFC 4158). It can be used in a peer-to-peer, OpenPGP-like web of trust[citation needed], but was rarely used that way as of 2004. The X.500 system has only ever been implemented by sovereign nations for state identity information sharing treaty fulfillment purposes, and the IETF's Public-Key Infrastructure (X.509), or PKIX, working group has adapted the standard to the more flexible organization of the Internet. In fact, the term X.509 certificate usually refers to the IETF's PKIX Certificate and CRL Profile of the X.509 v3 certificate standard, as specified in RFC 5280, commonly referred to as PKIX for Public Key Infrastructure (X.509).[citation needed]
Certificates

In the X.509 system, a certification authority issues a certificate binding a public key to a particular distinguished name in the X.500 tradition, or to an alternative name such as an e-mail address or a DNS-entry.[citation needed]

An organization's trusted root certificates can be distributed to all employees so that they can use the company PKI system. Browsers such as Internet Explorer, Netscape/Mozilla, Opera, Safari and Chrome come with a predetermined set of root certificates pre-installed, so SSL certificates from larger vendors will work instantly; in effect the browsers' developers determine which CAs are trusted third parties for the browsers' users.[citation needed]

X.509 also includes standards for certificate revocation list (CRL) implementations, an often neglected aspect of PKI systems. The IETF-approved way of checking a certificate's validity is the Online Certificate Status Protocol (OCSP). Firefox 3 enables OCSP checking by default along with versions of Windows including Vista and later.[citation needed]
Structure of a certificate

The structure foreseen by the standards is expressed in a formal language, namely Abstract Syntax Notation One.

The structure of an X.509 v3 digital certificate is as follows:

    Certificate
        Version
        Serial Number
        Algorithm ID
        Issuer
        Validity
            Not Before
            Not After
        Subject
        Subject Public Key Info
            Public Key Algorithm
            Subject Public Key
        Issuer Unique Identifier (optional)
        Subject Unique Identifier (optional)
        Extensions (optional)
            ...
    Certificate Signature Algorithm
    Certificate Signature

Each extension has its own id, expressed as Object identifier, which is a set of values, together with either a critical or non-critical indication. A certificate-using system MUST reject the certificate if it encounters a critical extension that it does not recognize, or a critical extension that contains information that it cannot process. A non-critical extension MAY be ignored if it is not recognized, but MUST be processed if it is recognized.[citation needed]

The structure of Version 1 is given in RFC 1422.

ITU-T introduced issuer and subject unique identifiers in version 2 to permit the reuse of issuer or subject name after some time. An example of reuse will be when a CA goes bankrupt and its name is deleted from the country's public list. After some time another CA with the same name may register itself, even though it is unrelated to the first one. However, IETF recommends that no issuer and subject names be reused. Therefore, version 2 is not widely deployed in the Internet.[citation needed]

Extensions were introduced in version 3. A CA can use extensions to issue a certificate only for a specific purpose (e.g. only for signing digital object). Each extension can be critical or non-critical. If an extension is critical and the system processing the certificate does not recognize the extension or cannot process it, the system MUST reject the entire certificate. A non-critical extension, on the other hand, can be ignored while the system processes the rest of the certificate.[citation needed]

In all versions, the serial number MUST be unique for each certificate issued by a specific CA (as mentioned in RFC 2459).
Extensions informing a specific usage of a certificate

RFC 5280 (and its predecessors) defines a number of certificate extensions which indicate how the certificate should be used. Most of them are arcs from the joint-iso-ccitt(2) ds(5) id-ce(29) OID. Some of the most common, defined in section 4.2.1, are:

    Basic Constraints, { id-ce 19 }, are used to indicate whether the certificate belongs to a CA.
    Key Usage, { id-ce 15 }, provides a bitmap specifying the cryptographic operations which may be performed using the public key contained in the certificate; for example, it could indicate that the key should be used for signatures but not for encipherment.
    Extended Key Usage, { id-ce 37 }, is used, typically on a leaf certificate, to indicate the purpose of the public key contained in the certificate. It contains a list of OIDs, each of which indicates an allowed use. For example, { id-pkix 3 1 } indicates that the key may be used on the server end of a TLS or SSL connection; { id-pkix 3 4 } indicates that the key may be used to secure email.

In general, if a certificate has several extensions restricting its use, all restrictions must be satisfied for a given use to be appropriate. RFC 5280 gives the specific example of a certificate containing both keyUsage and extendedKeyUsage: in this case, both must be processed and the certificate can only be used if both extensions are coherent in specifying the usage of a certificate. For example, NSS uses both extensions to specify certificate usage.[1]
Certificate filename extensions

Common filename extensions for X.509 certificates are:[citation needed]

    .pem - (Privacy Enhanced Mail) Base64 encoded DER certificate, enclosed between "-----BEGIN CERTIFICATE-----" and "-----END CERTIFICATE-----"
    .cer, .crt, .der - usually in binary DER form, but Base64-encoded certificates are common too (see .pem above)
    .p7b, .p7c - PKCS#7 SignedData structure without data, just certificate(s) or CRL(s)
    .p12 - PKCS#12, may contain certificate(s) (public) and private keys (password protected)
    .pfx - PFX, predecessor of PKCS#12 (usually contains data in PKCS#12 format, e.g., with PFX files generated in IIS)

PKCS#7 is a standard for signing or encrypting (officially called "enveloping") data. Since the certificate is needed to verify signed data, it is possible to include them in the SignedData structure. A .P7C file is a degenerated SignedData structure, without any data to sign.[citation needed]

PKCS#12 evolved from the personal information exchange (PFX) standard and is used to exchange public and private objects in a single file.[citation needed]
Sample X.509 certificates

This is an example of a decoded X.509 certificate for www.freesoft.org, generated with OpenSSL—the actual certificate is about 1 kB in size. It was issued by Thawte (since acquired by VeriSign and now owned by Symantec), as stated in the Issuer field. Its subject contains many personal details, but the most important part is usually the common name (CN), as this is the part that must match the host being authenticated. Also included is an RSA public key (modulus and public exponent), followed by the signature, computed by taking a MD5 hash of the first part of the certificate and signing it (applying the encryption operation) using Thawte's RSA private key.

Certificate:
   Data:
       Version: 1 (0x0)
       Serial Number: 7829 (0x1e95)
       Signature Algorithm: md5WithRSAEncryption
       Issuer: C=ZA, ST=Western Cape, L=Cape Town, O=Thawte Consulting cc,
               OU=Certification Services Division,
               CN=Thawte Server CA/emailAddress=server-certs@thawte.com
       Validity   
           Not Before: Jul  9 16:04:02 1998 GMT
           Not After : Jul  9 16:04:02 1999 GMT
       Subject: C=US, ST=Maryland, L=Pasadena, O=Brent Baccala,
                OU=FreeSoft, CN=www.freesoft.org/emailAddress=baccala@freesoft.org
       Subject Public Key Info:
           Public Key Algorithm: rsaEncryption
           RSA Public Key: (1024 bit)
               Modulus (1024 bit):
                   00:b4:31:98:0a:c4:bc:62:c1:88:aa:dc:b0:c8:bb:
                   33:35:19:d5:0c:64:b9:3d:41:b2:96:fc:f3:31:e1:
                   66:36:d0:8e:56:12:44:ba:75:eb:e8:1c:9c:5b:66:
                   70:33:52:14:c9:ec:4f:91:51:70:39:de:53:85:17:
                   16:94:6e:ee:f4:d5:6f:d5:ca:b3:47:5e:1b:0c:7b:
                   c5:cc:2b:6b:c1:90:c3:16:31:0d:bf:7a:c7:47:77:
                   8f:a0:21:c7:4c:d0:16:65:00:c1:0f:d7:b8:80:e3:
                   d2:75:6b:c1:ea:9e:5c:5c:ea:7d:c1:a1:10:bc:b8:
                   e8:35:1c:9e:27:52:7e:41:8f
               Exponent: 65537 (0x10001)
   Signature Algorithm: md5WithRSAEncryption
       93:5f:8f:5f:c5:af:bf:0a:ab:a5:6d:fb:24:5f:b6:59:5d:9d:
       92:2e:4a:1b:8b:ac:7d:99:17:5d:cd:19:f6:ad:ef:63:2f:92:
       ab:2f:4b:cf:0a:13:90:ee:2c:0e:43:03:be:f6:ea:8e:9c:67:
       d0:a2:40:03:f7:ef:6a:15:09:79:a9:46:ed:b7:16:1b:41:72:
       0d:19:aa:ad:dd:9a:df:ab:97:50:65:f5:5e:85:a6:ef:19:d1:
       5a:de:9d:ea:63:cd:cb:cc:6d:5d:01:85:b5:6d:c8:f3:d9:f7:
       8f:0e:fc:ba:1f:34:e9:96:6e:6c:cf:f2:ef:9b:bf:de:b5:22:
       68:9f

To validate this certificate, one needs a second certificate that matches the Issuer (Thawte Server CA) of the first certificate. First, one verifies that the second certificate is of a CA kind; that is, that it can be used to issue other certificates. This is done by inspecting a value of the CA attribute in the X509v3 extension section. Then the RSA public key from the CA certificate is used to decode the signature on the first certificate to obtain a MD5 hash, which must match an actual MD5 hash computed over the rest of the certificate. An example CA certificate follows:[citation needed]

Certificate:
   Data:
       Version: 3 (0x2)
       Serial Number: 1 (0x1)
       Signature Algorithm: md5WithRSAEncryption
       Issuer: C=ZA, ST=Western Cape, L=Cape Town, O=Thawte Consulting cc,
               OU=Certification Services Division,
               CN=Thawte Server CA/emailAddress=server-certs@thawte.com
       Validity
           Not Before: Aug  1 00:00:00 1996 GMT
           Not After : Dec 31 23:59:59 2020 GMT
       Subject: C=ZA, ST=Western Cape, L=Cape Town, O=Thawte Consulting cc,
                OU=Certification Services Division,
                CN=Thawte Server CA/emailAddress=server-certs@thawte.com
       Subject Public Key Info:
           Public Key Algorithm: rsaEncryption
           RSA Public Key: (1024 bit)
               Modulus (1024 bit):
                   00:d3:a4:50:6e:c8:ff:56:6b:e6:cf:5d:b6:ea:0c:
                   68:75:47:a2:aa:c2:da:84:25:fc:a8:f4:47:51:da:
                   85:b5:20:74:94:86:1e:0f:75:c9:e9:08:61:f5:06:
                   6d:30:6e:15:19:02:e9:52:c0:62:db:4d:99:9e:e2:
                   6a:0c:44:38:cd:fe:be:e3:64:09:70:c5:fe:b1:6b:
                   29:b6:2f:49:c8:3b:d4:27:04:25:10:97:2f:e7:90:
                   6d:c0:28:42:99:d7:4c:43:de:c3:f5:21:6d:54:9f:
                   5d:c3:58:e1:c0:e4:d9:5b:b0:b8:dc:b4:7b:df:36:
                   3a:c2:b5:66:22:12:d6:87:0d
               Exponent: 65537 (0x10001)
       X509v3 extensions:
           X509v3 Basic Constraints: critical
               CA:TRUE
   Signature Algorithm: md5WithRSAEncryption
       07:fa:4c:69:5c:fb:95:cc:46:ee:85:83:4d:21:30:8e:ca:d9:
       a8:6f:49:1a:e6:da:51:e3:60:70:6c:84:61:11:a1:1a:c8:48:
       3e:59:43:7d:4f:95:3d:a1:8b:b7:0b:62:98:7a:75:8a:dd:88:
       4e:4e:9e:40:db:a8:cc:32:74:b9:6f:0d:c6:e3:b3:44:0b:d9:
       8a:6f:9a:29:9b:99:18:28:3b:d1:e3:40:28:9a:5a:3c:d5:b5:
       e7:20:1b:8b:ca:a4:ab:8d:e9:51:d9:e2:4c:2c:59:a9:da:b9:
       b2:75:1b:f6:42:f2:ef:c7:f2:18:f9:89:bc:a3:ff:8a:23:2e:
       70:47

This is an example of a self-signed certificate, as the issuer and subject are the same. There's no way to verify this certificate except by checking it against itself; instead, these top-level certificates are manually stored by web browsers. Thawte is one of the root certificate authorities recognized by both Microsoft and Netscape. This certificate comes with the web browser and is trusted by default. As a long-lived, globally trusted certificate that can sign anything (as there are no constraints in the X509v3 Basic Constraints section), its matching private key has to be closely guarded.[citation needed]
Security

There are a number of publications about PKI problems by Bruce Schneier, Peter Gutmann and other security experts.[2][3][4]
Specification: complexity and lack of quality

The X.509 standard was primarily designed to support the X.500 structure, but today's use cases center around the web. Many features are of little or no relevance today. The X.509 specification suffers from being over-functional and underspecified and the normative information is spread across many documents from different standardization bodies. Several profiles were developed to solve this, but these introduce interoperability issues and did not fix the problem.
Architectural weaknesses

    Use of blacklisting invalid certificates (using CRLs and OCSP) instead of whitelisting
    CRLs are particularly poor because of size and distribution patterns
    Ambiguous OCSP semantics and lack of historical revocation status
    Revocation of root certificates not addressed
    Aggregation problem: Identity claim (authenticate with an identifier), attribute claim (submit a bag of vetted attributes) and policy claim are combined in a single container. This raises privacy, policy mapping and maintenance issues.
    Delegation problem: CAs cannot technically restrict subCAs to issue only certificates within a limited namespaces and attribute set – this feature of X.509 is not in use. Therefore a large number of CAs exist on the Internet, and classifying them and their policies is an insurmountable task. Delegation of authority within an organization cannot be handled at all, as in common business practice.
    Federation problem: Certificate chains that are the result of sub-CAs, bridge- and cross-signing make validation complex and expensive in terms of processing time. Path validation semantics may be ambiguous. Hierarchy with 3rd-party trusted party is the only model. This is inconvenient when a bilateral trust relationship is already in place.

Problems with certificate authorities

    The subject, not the relying party, purchases certificates. The subject will often utilize the cheapest issuer, so quality is not being paid for in the competing market. This is partly addressed by Extended Validation certificates.
    Certification authorities deny almost all warranties to the user (including subject or even relying parties).
    The expiration date should be used to limit the time the key strength is deemed sufficient. This parameter is abused by certification authorities to charge the client an extension fee. This places an unnecessary burden on user with key roll-over.
    "Users use an undefined certification request protocol to obtain a certificate which is published in an unclear location in a nonexistent directory with no real means to revoke it." [4]

Implementation issues

Implementations suffer from design flaws, bugs, different interpretations of standards and lack of interoperability of different standards. Some problems are:[citation needed]

    Many implementations turn off revocation check:
        Seen as obstacle, policies are not enforced
        If it was turned on in all browsers by default, including code signing, it would probably crash the infrastructure.
    DNs are complex and little understood (lack of canonicalization, internationalization problems, ..)
    rfc822Name has 2 notations
    Name and policy constraints hardly supported
    Key usage ignored, first certificate in a list being used
    Enforcement of custom OIDs is difficult
    Attributes should not be made critical because it makes clients crash.
    Unspecified length of attributes lead to product-specific limits

Exploits

    MD2-based certificates were used for a long time and were vulnerable to preimage attacks. Since the root certificate already had a self-signature, attackers could use this signature and use it for an intermediate certificate. Dan Kaminsky at 26C3.[citation needed]
    In 2005, Arjen Lenstra and Benne de Weger demonstrated "how to use hash collisions to construct two X.509 certificates that contain identical signatures and that differ only in the public keys", achieved using a collision attack on the MD5 hash function.[5]
    In 2008, Alexander Sotirov and Marc Stevens presented at the Chaos Communication Congress a practical attack that allowed them to create a rogue Certificate Authority, accepted by all common browsers, by exploiting the fact that RapidSSL was still issuing X.509 certificates based on MD5.[6]
    X.509 certificates based on SHA-1 had been deemed to be secure up until very recent times. In April 2009 at the Eurocrypt Conference, Australian Researchers of Macquarie University presented "Automatic Differential Path Searching for SHA-1". The researchers were able to deduce a method which increases the likelihood of a collision by several orders of magnitude.[7]
    Domain-validated certificates ("Junk certificates") are still trusted by web browsers, and can be obtained with little effort from commercial CAs.[citation needed]
    EV-certificates are of very limited help, because Browsers do not have policies that disallow DV-certificates, Zusman and Sotirov Blackhat 2009
    There are implementation errors with X.509 that allow e.g. falsified subject names using null-terminated strings Marlinspike Blackhat 2009 or code injections attacks in certificates.
    By using illegal[8] 0x80 padded subidentifiers of Object Identifiers, wrong implementations or by using integer-overflows of the client's browsers, an attacker can include an unknown attribute in the CSR, which the CA will sign, which the client wrongly interpretes as "CN" (OID=2.5.4.3). Dan Kaminsky at 26C3 "Black OPs of PKI"[9]

PKI standards for X.509

    PKCS7 (Cryptographic Message Syntax Standard - public keys with proof of identity for signed and/or encrypted message for PKI)[citation needed]
    Secure Sockets Layer (SSL) - cryptographic protocols for internet secure communications[citation needed]
    Online Certificate Status Protocol (OCSP) / Certificate Revocation List (CRL) - this is for validating proof of identity[citation needed]
    PKCS12 (Personal Information Exchange Syntax Standard) - used to store a private key with the appropriate public key certificate[citation needed]

Certification authority
Main article: Certificate authority

A certification authority (CA) is an entity which issues digital certificates for use by other parties. It is an example of a trusted third party. CAs are characteristic of many public key infrastructure (PKI) schemes.[citation needed]

There are many commercial CAs that charge for their services. Institutions and governments may have their own CAs, and there are free CAs.[citation needed]
Public-Key Infrastructure (X.509) Working Group
[icon] 	This section requires expansion. (May 2008)

The Public-Key Infrastructure (X.509) working group (PKIX) is a working group of the Internet Engineering Task Force dedicated to creating RFCs and other standard documentation on issues related to public key infrastructure based on X.509 certificates. PKIX was established in Autumn 1995 in conjunction with the National Institute of Standards and Technology.[10]
```

#### 15.1.1.2 RFC 5280

```text
Network Working Group                                          D. Cooper
Request for Comments: 5280                                          NIST
Obsoletes: 3280, 4325, 4630                                 S. Santesson
Category: Standards Track                                      Microsoft
                                                              S. Farrell
                                                  Trinity College Dublin
                                                               S. Boeyen
                                                                 Entrust
                                                              R. Housley
                                                          Vigil Security
                                                                 W. Polk
                                                                    NIST
                                                                May 2008


         Internet X.509 Public Key Infrastructure Certificate
             and Certificate Revocation List (CRL) Profile

Status of This Memo

   This document specifies an Internet standards track protocol for the
   Internet community, and requests discussion and suggestions for
   improvements.  Please refer to the current edition of the "Internet
   Official Protocol Standards" (STD 1) for the standardization state
   and status of this protocol.  Distribution of this memo is unlimited.

Abstract

   This memo profiles the X.509 v3 certificate and X.509 v2 certificate
   revocation list (CRL) for use in the Internet.  An overview of this
   approach and model is provided as an introduction.  The X.509 v3
   certificate format is described in detail, with additional
   information regarding the format and semantics of Internet name
   forms.  Standard certificate extensions are described and two
   Internet-specific extensions are defined.  A set of required
   certificate extensions is specified.  The X.509 v2 CRL format is
   described in detail along with standard and Internet-specific
   extensions.  An algorithm for X.509 certification path validation is
   described.  An ASN.1 module and examples are provided in the
   appendices.











Cooper, et al.              Standards Track                     [Page 1]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


Table of Contents
```

#### 15.1.1.2.1. Introduction ....................................................4

#### 15.1.1.2.2. Requirements and Assumptions ....................................6

#### 15.1.1.2.2.1. Communication and Topology .................................7

#### 15.1.1.2.2.2. Acceptability Criteria .....................................7

#### 15.1.1.2.2.3. User Expectations ..........................................7

#### 15.1.1.2.2.4. Administrator Expectations .................................8

#### 15.1.1.2.3. Overview of Approach ............................................8

#### 15.1.1.2.3.1. X.509 Version 3 Certificate ................................9

#### 15.1.1.2.3.2. Certification Paths and Trust .............................10

#### 15.1.1.2.3.3. Revocation ................................................13

#### 15.1.1.2.3.4. Operational Protocols .....................................14

#### 15.1.1.2.3.5. Management Protocols ......................................14

#### 15.1.1.2.4. Certificate and Certificate Extensions Profile .................16

#### 15.1.1.2.4.1. Basic Certificate Fields ..................................16

#### 15.1.1.2.4.1.1. Certificate Fields .................................17

#### 15.1.1.2.4.1.1.1. tbsCertificate ............................18

#### 15.1.1.2.4.1.1.2. signatureAlgorithm ........................18

#### 15.1.1.2.4.1.1.3. signatureValue ............................18

#### 15.1.1.2.4.1.2. TBSCertificate .....................................18

#### 15.1.1.2.4.1.2.1. Version ...................................19

#### 15.1.1.2.4.1.2.2. Serial Number .............................19

#### 15.1.1.2.4.1.2.3. Signature .................................19

#### 15.1.1.2.4.1.2.4. Issuer ....................................20

#### 15.1.1.2.4.1.2.5. Validity ..................................22

#### 15.1.1.2.4.1.2.5.1. UTCTime ........................23

#### 15.1.1.2.4.1.2.5.2. GeneralizedTime ................23

#### 15.1.1.2.4.1.2.6. Subject ...................................23

#### 15.1.1.2.4.1.2.7. Subject Public Key Info ...................25

#### 15.1.1.2.4.1.2.8. Unique Identifiers ........................25

#### 15.1.1.2.4.1.2.9. Extensions ................................26

#### 15.1.1.2.4.2. Certificate Extensions ....................................26

#### 15.1.1.2.4.2.1. Standard Extensions ................................27

#### 15.1.1.2.4.2.1.1. Authority Key Identifier ..................27

#### 15.1.1.2.4.2.1.2. Subject Key Identifier ....................28

#### 15.1.1.2.4.2.1.3. Key Usage .................................29

#### 15.1.1.2.4.2.1.4. Certificate Policies ......................32

#### 15.1.1.2.4.2.1.5. Policy Mappings ...........................35

#### 15.1.1.2.4.2.1.6. Subject Alternative Name ..................35

#### 15.1.1.2.4.2.1.7. Issuer Alternative Name ...................38

#### 15.1.1.2.4.2.1.8. Subject Directory Attributes ..............39

#### 15.1.1.2.4.2.1.9. Basic Constraints .........................39

#### 15.1.1.2.4.2.1.10. Name Constraints .........................40

#### 15.1.1.2.4.2.1.11. Policy Constraints .......................43

#### 15.1.1.2.4.2.1.12. Extended Key Usage .......................44

#### 15.1.1.2.4.2.1.13. CRL Distribution Points ..................45

#### 15.1.1.2.4.2.1.14. Inhibit anyPolicy ........................48

```text
Cooper, et al.              Standards Track                     [Page 2]

RFC 5280            PKIX Certificate and CRL Profile            May 2008
```

#### 15.1.1.2.4.2.1.15. Freshest CRL (a.k.a. Delta CRL

```text
                            Distribution Point) ......................48
```

#### 15.1.1.2.4.2.2. Private Internet Extensions ........................49

#### 15.1.1.2.4.2.2.1. Authority Information Access ..............49

#### 15.1.1.2.4.2.2.2. Subject Information Access ................51

#### 15.1.1.2.5. CRL and CRL Extensions Profile .................................54

#### 15.1.1.2.5.1. CRL Fields ................................................55

#### 15.1.1.2.5.1.1. CertificateList Fields .............................56

#### 15.1.1.2.5.1.1.1. tbsCertList ...............................56

#### 15.1.1.2.5.1.1.2. signatureAlgorithm ........................57

#### 15.1.1.2.5.1.1.3. signatureValue ............................57

#### 15.1.1.2.5.1.2. Certificate List "To Be Signed" ....................58

#### 15.1.1.2.5.1.2.1. Version ...................................58

#### 15.1.1.2.5.1.2.2. Signature .................................58

#### 15.1.1.2.5.1.2.3. Issuer Name ...............................58

#### 15.1.1.2.5.1.2.4. This Update ...............................58

#### 15.1.1.2.5.1.2.5. Next Update ...............................59

#### 15.1.1.2.5.1.2.6. Revoked Certificates ......................59

#### 15.1.1.2.5.1.2.7. Extensions ................................60

#### 15.1.1.2.5.2. CRL Extensions ............................................60

#### 15.1.1.2.5.2.1. Authority Key Identifier ...........................60

#### 15.1.1.2.5.2.2. Issuer Alternative Name ............................60

#### 15.1.1.2.5.2.3. CRL Number .........................................61

#### 15.1.1.2.5.2.4. Delta CRL Indicator ................................62

#### 15.1.1.2.5.2.5. Issuing Distribution Point .........................65

#### 15.1.1.2.5.2.6. Freshest CRL (a.k.a. Delta CRL Distribution

```text
                  Point) .............................................67
```

#### 15.1.1.2.5.2.7. Authority Information Access .......................67

#### 15.1.1.2.5.3. CRL Entry Extensions ......................................69

#### 15.1.1.2.5.3.1. Reason Code ........................................69

#### 15.1.1.2.5.3.2. Invalidity Date ....................................70

#### 15.1.1.2.5.3.3. Certificate Issuer .................................70

#### 15.1.1.2.6. Certification Path Validation ..................................71

#### 15.1.1.2.6.1. Basic Path Validation .....................................72

#### 15.1.1.2.6.1.1. Inputs .............................................75

#### 15.1.1.2.6.1.2. Initialization .....................................77

#### 15.1.1.2.6.1.3. Basic Certificate Processing .......................80

#### 15.1.1.2.6.1.4. Preparation for Certificate i+1 ....................84

#### 15.1.1.2.6.1.5. Wrap-Up Procedure ..................................87

#### 15.1.1.2.6.1.6. Outputs ............................................89

#### 15.1.1.2.6.2. Using the Path Validation Algorithm .......................89

#### 15.1.1.2.6.3. CRL Validation ............................................90

#### 15.1.1.2.6.3.1. Revocation Inputs ..................................91

#### 15.1.1.2.6.3.2. Initialization and Revocation State Variables ......91

#### 15.1.1.2.6.3.3. CRL Processing .....................................92

#### 15.1.1.2.7. Processing Rules for Internationalized Names ...................95

#### 15.1.1.2.7.1. Internationalized Names in Distinguished Names ............96

#### 15.1.1.2.7.2. Internationalized Domain Names in GeneralName .............97

```text
Cooper, et al.              Standards Track                     [Page 3]

RFC 5280            PKIX Certificate and CRL Profile            May 2008
```

#### 15.1.1.2.7.3. Internationalized Domain Names in Distinguished Names .....98

#### 15.1.1.2.7.4. Internationalized Resource Identifiers ....................98

#### 15.1.1.2.7.5. Internationalized Electronic Mail Addresses ..............100

#### 15.1.1.2.8. Security Considerations .......................................100

#### 15.1.1.2.9. IANA Considerations ...........................................105

#### 15.1.1.2.10. Acknowledgments ..............................................105

#### 15.1.1.2.11. References ...................................................105

#### 15.1.1.2.11.1. Normative References ....................................105

#### 15.1.1.2.11.2. Informative References ..................................107

```text
   Appendix A.  Pseudo-ASN.1 Structures and OIDs ....................110
      A.15.1.1.2.1. Explicitly Tagged Module, 1988 Syntax ....................110
      A.15.1.1.2.2. Implicitly Tagged Module, 1988 Syntax ....................125
   Appendix B. ASN.1 Notes ..........................................133
   Appendix C. Examples .............................................136
      C.15.1.1.2.1. RSA Self-Signed Certificate ..............................137
      C.15.1.1.2.2. End Entity Certificate Using RSA .........................140
      C.15.1.1.2.3. End Entity Certificate Using DSA .........................143
      C.15.1.1.2.4. Certificate Revocation List ..............................147
```

#### 15.1.1.2.1. Introduction

```text
   This specification is one part of a family of standards for the X.509
   Public Key Infrastructure (PKI) for the Internet.

   This specification profiles the format and semantics of certificates
   and certificate revocation lists (CRLs) for the Internet PKI.
   Procedures are described for processing of certification paths in the
   Internet environment.  Finally, ASN.1 modules are provided in the
   appendices for all data structures defined or referenced.

   Section 2 describes Internet PKI requirements and the assumptions
   that affect the scope of this document.  Section 3 presents an
   architectural model and describes its relationship to previous IETF
   and ISO/IEC/ITU-T standards.  In particular, this document's
   relationship with the IETF PEM specifications and the ISO/IEC/ITU-T
   X.509 documents is described.

   Section 4 profiles the X.509 version 3 certificate, and Section 5
   profiles the X.509 version 2 CRL.  The profiles include the
   identification of ISO/IEC/ITU-T and ANSI extensions that may be
   useful in the Internet PKI.  The profiles are presented in the 1988
   Abstract Syntax Notation One (ASN.1) rather than the 1997 ASN.1
   syntax used in the most recent ISO/IEC/ITU-T standards.

   Section 6 includes certification path validation procedures.  These
   procedures are based upon the ISO/IEC/ITU-T definition.
   Implementations are REQUIRED to derive the same results but are not
   required to use the specified procedures.



Cooper, et al.              Standards Track                     [Page 4]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   Procedures for identification and encoding of public key materials
   and digital signatures are defined in [RFC3279], [RFC4055], and
   [RFC4491].  Implementations of this specification are not required to
   use any particular cryptographic algorithms.  However, conforming
   implementations that use the algorithms identified in [RFC3279],
   [RFC4055], and [RFC4491] MUST identify and encode the public key
   materials and digital signatures as described in those
   specifications.

   Finally, three appendices are provided to aid implementers.  Appendix
   A contains all ASN.1 structures defined or referenced within this
   specification.  As above, the material is presented in the 1988
   ASN.15.1.1.2.1.  Appendix B contains notes on less familiar features of the
   ASN.1 notation used within this specification.  Appendix C contains
   examples of conforming certificates and a conforming CRL.

   This specification obsoletes [RFC3280].  Differences from RFC 3280
   are summarized below:

      * Enhanced support for internationalized names is specified in
        Section 7, with rules for encoding and comparing
        Internationalized Domain Names, Internationalized Resource
        Identifiers (IRIs), and distinguished names.  These rules are
        aligned with comparison rules established in current RFCs,
        including [RFC3490], [RFC3987], and [RFC4518].

      * Sections 15.1.1.2.4.1.2.4 and 15.1.1.2.4.1.2.6 incorporate the conditions for
        continued use of legacy text encoding schemes that were
        specified in [RFC4630].  Where in use by an established PKI,
        transition to UTF8String could cause denial of service based on
        name chaining failures or incorrect processing of name
        constraints.

      * Section 15.1.1.2.4.2.1.4 in RFC 3280, which specified the
        privateKeyUsagePeriod certificate extension but deprecated its
        use, was removed.  Use of this ISO standard extension is neither
        deprecated nor recommended for use in the Internet PKI.

      * Section 15.1.1.2.4.2.1.5 recommends marking the policy mappings extension
        as critical.  RFC 3280 required that the policy mappings
        extension be marked as non-critical.

      * Section 15.1.1.2.4.2.1.11 requires marking the policy constraints
        extension as critical.  RFC 3280 permitted the policy
        constraints extension to be marked as critical or non-critical.

      * The Authority Information Access (AIA) CRL extension, as
        specified in [RFC4325], was added as Section 15.1.1.2.5.2.7.



Cooper, et al.              Standards Track                     [Page 5]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


      * Sections 15.1.1.2.5.2 and 15.1.1.2.5.3 clarify the rules for handling unrecognized
        CRL extensions and CRL entry extensions, respectively.

      * Section 15.1.1.2.5.3.2 in RFC 3280, which specified the
        holdInstructionCode CRL entry extension, was removed.

      * The path validation algorithm specified in Section 6 no longer
        tracks the criticality of the certificate policies extensions in
        a chain of certificates.  In RFC 3280, this information was
        returned to a relying party.

      * The Security Considerations section addresses the risk of
        circular dependencies arising from the use of https or similar
        schemes in the CRL distribution points, authority information
        access, or subject information access extensions.

      * The Security Considerations section addresses risks associated
        with name ambiguity.

      * The Security Considerations section references RFC 4210 for
        procedures to signal changes in CA operations.

   The ASN.1 modules in Appendix A are unchanged from RFC 3280, except
   that ub-emailaddress-length was changed from 128 to 255 in order to
   align with PKCS #9 [RFC2985].

   The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT",
   "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this
   document are to be interpreted as described in [RFC2119].
```

#### 15.1.1.2.2. Requirements and Assumptions

```text
   The goal of this specification is to develop a profile to facilitate
   the use of X.509 certificates within Internet applications for those
   communities wishing to make use of X.509 technology.  Such
   applications may include WWW, electronic mail, user authentication,
   and IPsec.  In order to relieve some of the obstacles to using X.509
   certificates, this document defines a profile to promote the
   development of certificate management systems, development of
   application tools, and interoperability determined by policy.

   Some communities will need to supplement, or possibly replace, this
   profile in order to meet the requirements of specialized application
   domains or environments with additional authorization, assurance, or
   operational requirements.  However, for basic applications, common
   representations of frequently used attributes are defined so that





Cooper, et al.              Standards Track                     [Page 6]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   application developers can obtain necessary information without
   regard to the issuer of a particular certificate or certificate
   revocation list (CRL).

   A certificate user should review the certificate policy generated by
   the certification authority (CA) before relying on the authentication
   or non-repudiation services associated with the public key in a
   particular certificate.  To this end, this standard does not
   prescribe legally binding rules or duties.

   As supplemental authorization and attribute management tools emerge,
   such as attribute certificates, it may be appropriate to limit the
   authenticated attributes that are included in a certificate.  These
   other management tools may provide more appropriate methods of
   conveying many authenticated attributes.
```

#### 15.1.1.2.2.1. Communication and Topology

```text
   The users of certificates will operate in a wide range of
   environments with respect to their communication topology, especially
   users of secure electronic mail.  This profile supports users without
   high bandwidth, real-time IP connectivity, or high connection
   availability.  In addition, the profile allows for the presence of
   firewall or other filtered communication.

   This profile does not assume the deployment of an X.500 directory
   system [X.500] or a Lightweight Directory Access Protocol (LDAP)
   directory system [RFC4510].  The profile does not prohibit the use of
   an X.500 directory or an LDAP directory; however, any means of
   distributing certificates and certificate revocation lists (CRLs) may
   be used.
```

#### 15.1.1.2.2.2. Acceptability Criteria

```text
   The goal of the Internet Public Key Infrastructure (PKI) is to meet
   the needs of deterministic, automated identification, authentication,
   access control, and authorization functions.  Support for these
   services determines the attributes contained in the certificate as
   well as the ancillary control information in the certificate such as
   policy data and certification path constraints.
```

#### 15.1.1.2.2.3. User Expectations

```text
   Users of the Internet PKI are people and processes who use client
   software and are the subjects named in certificates.  These uses
   include readers and writers of electronic mail, the clients for WWW
   browsers, WWW servers, and the key manager for IPsec within a router.
   This profile recognizes the limitations of the platforms these users



Cooper, et al.              Standards Track                     [Page 7]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   employ and the limitations in sophistication and attentiveness of the
   users themselves.  This manifests itself in minimal user
   configuration responsibility (e.g., trusted CA keys, rules), explicit
   platform usage constraints within the certificate, certification path
   constraints that shield the user from many malicious actions, and
   applications that sensibly automate validation functions.
```

#### 15.1.1.2.2.4. Administrator Expectations

```text
   As with user expectations, the Internet PKI profile is structured to
   support the individuals who generally operate CAs.  Providing
   administrators with unbounded choices increases the chances that a
   subtle CA administrator mistake will result in broad compromise.
   Also, unbounded choices greatly complicate the software that process
   and validate the certificates created by the CA.
```

#### 15.1.1.2.3. Overview of Approach

```text
   Following is a simplified view of the architectural model assumed by
   the Public-Key Infrastructure using X.509 (PKIX) specifications.

   The components in this model are:

   end entity: user of PKI certificates and/or end user system that is
               the subject of a certificate;

   CA:         certification authority;

   RA:         registration authority, i.e., an optional system to which
               a CA delegates certain management functions;

   CRL issuer: a system that generates and signs CRLs; and

   repository: a system or collection of distributed systems that stores
               certificates and CRLs and serves as a means of
               distributing these certificates and CRLs to end entities.

   CAs are responsible for indicating the revocation status of the
   certificates that they issue.  Revocation status information may be
   provided using the Online Certificate Status Protocol (OCSP)
   [RFC2560], certificate revocation lists (CRLs), or some other
   mechanism.  In general, when revocation status information is
   provided using CRLs, the CA is also the CRL issuer.  However, a CA
   may delegate the responsibility for issuing CRLs to a different
   entity.

   Note that an Attribute Authority (AA) might also choose to delegate
   the publication of CRLs to a CRL issuer.



Cooper, et al.              Standards Track                     [Page 8]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   +---+
   | C |                       +------------+
   | e | <-------------------->| End entity |
   | r |       Operational     +------------+
   | t |       transactions          ^
   | i |      and management         |  Management
   | f |       transactions          |  transactions        PKI
   | i |                             |                     users
   | c |                             v
   | a | =======================  +--+------------+  ==============
   | t |                          ^               ^
   | e |                          |               |         PKI
   |   |                          v               |      management
   | & |                       +------+           |       entities
   |   | <---------------------|  RA  |<----+     |
   | C |  Publish certificate  +------+     |     |
   | R |                                    |     |
   | L |                                    |     |
   |   |                                    v     v
   | R |                                +------------+
   | e | <------------------------------|     CA     |
   | p |   Publish certificate          +------------+
   | o |   Publish CRL                     ^      ^
   | s |                                   |      |  Management
   | i |                +------------+     |      |  transactions
   | t | <--------------| CRL Issuer |<----+      |
   | o |   Publish CRL  +------------+            v
   | r |                                      +------+
   | y |                                      |  CA  |
   +---+                                      +------+

                      Figure 1. PKI Entities
```

#### 15.1.1.2.3.1. X.509 Version 3 Certificate

```text
   Users of a public key require confidence that the associated private
   key is owned by the correct remote subject (person or system) with
   which an encryption or digital signature mechanism will be used.
   This confidence is obtained through the use of public key
   certificates, which are data structures that bind public key values
   to subjects.  The binding is asserted by having a trusted CA
   digitally sign each certificate.  The CA may base this assertion upon
   technical means (a.k.a., proof of possession through a challenge-
   response protocol), presentation of the private key, or on an
   assertion by the subject.  A certificate has a limited valid
   lifetime, which is indicated in its signed contents.  Because a
   certificate's signature and timeliness can be independently checked
   by a certificate-using client, certificates can be distributed via



Cooper, et al.              Standards Track                     [Page 9]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   untrusted communications and server systems, and can be cached in
   unsecured storage in certificate-using systems.

   ITU-T X.509 (formerly CCITT X.509) or ISO/IEC 9594-8, which was first
   published in 1988 as part of the X.500 directory recommendations,
   defines a standard certificate format [X.509].  The certificate
   format in the 1988 standard is called the version 1 (v1) format.
   When X.500 was revised in 1993, two more fields were added, resulting
   in the version 2 (v2) format.

   The Internet Privacy Enhanced Mail (PEM) RFCs, published in 1993,
   include specifications for a public key infrastructure based on X.509
   v1 certificates [RFC1422].  The experience gained in attempts to
   deploy RFC 1422 made it clear that the v1 and v2 certificate formats
   were deficient in several respects.  Most importantly, more fields
   were needed to carry information that PEM design and implementation
   experience had proven necessary.  In response to these new
   requirements, the ISO/IEC, ITU-T, and ANSI X9 developed the X.509
   version 3 (v3) certificate format.  The v3 format extends the v2
   format by adding provision for additional extension fields.
   Particular extension field types may be specified in standards or may
   be defined and registered by any organization or community.  In June
   1996, standardization of the basic v3 format was completed [X.509].

   ISO/IEC, ITU-T, and ANSI X9 have also developed standard extensions
   for use in the v3 extensions field [X.509][X15.1.1.2.9.55].  These extensions
   can convey such data as additional subject identification
   information, key attribute information, policy information, and
   certification path constraints.

   However, the ISO/IEC, ITU-T, and ANSI X9 standard extensions are very
   broad in their applicability.  In order to develop interoperable
   implementations of X.509 v3 systems for Internet use, it is necessary
   to specify a profile for use of the X.509 v3 extensions tailored for
   the Internet.  It is one goal of this document to specify a profile
   for Internet WWW, electronic mail, and IPsec applications.
   Environments with additional requirements may build on this profile
   or may replace it.
```

#### 15.1.1.2.3.2. Certification Paths and Trust

```text
   A user of a security service requiring knowledge of a public key
   generally needs to obtain and validate a certificate containing the
   required public key.  If the public key user does not already hold an
   assured copy of the public key of the CA that signed the certificate,
   the CA's name, and related information (such as the validity period
   or name constraints), then it might need an additional certificate to
   obtain that public key.  In general, a chain of multiple certificates



Cooper, et al.              Standards Track                    [Page 10]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   may be needed, comprising a certificate of the public key owner (the
   end entity) signed by one CA, and zero or more additional
   certificates of CAs signed by other CAs.  Such chains, called
   certification paths, are required because a public key user is only
   initialized with a limited number of assured CA public keys.

   There are different ways in which CAs might be configured in order
   for public key users to be able to find certification paths.  For
   PEM, RFC 1422 defined a rigid hierarchical structure of CAs.  There
   are three types of PEM certification authority:

      (a)  Internet Policy Registration Authority (IPRA):  This
           authority, operated under the auspices of the Internet
           Society, acts as the root of the PEM certification hierarchy
           at level 15.1.1.2.1.  It issues certificates only for the next level
           of authorities, PCAs.  All certification paths start with the
           IPRA.

      (b)  Policy Certification Authorities (PCAs):  PCAs are at level 2
           of the hierarchy, each PCA being certified by the IPRA.  A
           PCA shall establish and publish a statement of its policy
           with respect to certifying users or subordinate certification
           authorities.  Distinct PCAs aim to satisfy different user
           needs.  For example, one PCA (an organizational PCA) might
           support the general electronic mail needs of commercial
           organizations, and another PCA (a high-assurance PCA) might
           have a more stringent policy designed for satisfying legally
           binding digital signature requirements.

      (c)  Certification Authorities (CAs):  CAs are at level 3 of the
           hierarchy and can also be at lower levels.  Those at level 3
           are certified by PCAs.  CAs represent, for example,
           particular organizations, particular organizational units
           (e.g., departments, groups, sections), or particular
           geographical areas.

   RFC 1422 furthermore has a name subordination rule, which requires
   that a CA can only issue certificates for entities whose names are
   subordinate (in the X.500 naming tree) to the name of the CA itself.
   The trust associated with a PEM certification path is implied by the
   PCA name.  The name subordination rule ensures that CAs below the PCA
   are sensibly constrained as to the set of subordinate entities they
   can certify (e.g., a CA for an organization can only certify entities
   in that organization's name tree).  Certificate user systems are able
   to mechanically check that the name subordination rule has been
   followed.





Cooper, et al.              Standards Track                    [Page 11]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   RFC 1422 uses the X.509 v1 certificate format.  The limitations of
   X.509 v1 required imposition of several structural restrictions to
   clearly associate policy information or restrict the utility of
   certificates.  These restrictions included:

      (a)  a pure top-down hierarchy, with all certification paths
           starting from IPRA;

      (b)  a naming subordination rule restricting the names of a CA's
           subjects; and

      (c)  use of the PCA concept, which requires knowledge of
           individual PCAs to be built into certificate chain
           verification logic.  Knowledge of individual PCAs was
           required to determine if a chain could be accepted.

   With X.509 v3, most of the requirements addressed by RFC 1422 can be
   addressed using certificate extensions, without a need to restrict
   the CA structures used.  In particular, the certificate extensions
   relating to certificate policies obviate the need for PCAs and the
   constraint extensions obviate the need for the name subordination
   rule.  As a result, this document supports a more flexible
   architecture, including:

      (a)  Certification paths start with a public key of a CA in a
           user's own domain, or with the public key of the top of a
           hierarchy.  Starting with the public key of a CA in a user's
           own domain has certain advantages.  In some environments, the
           local domain is the most trusted.

      (b)  Name constraints may be imposed through explicit inclusion of
           a name constraints extension in a certificate, but are not
           required.

      (c)  Policy extensions and policy mappings replace the PCA
           concept, which permits a greater degree of automation.  The
           application can determine if the certification path is
           acceptable based on the contents of the certificates instead
           of a priori knowledge of PCAs.  This permits automation of
           certification path processing.

   X.509 v3 also includes an extension that identifies the subject of a
   certificate as being either a CA or an end entity, reducing the
   reliance on out-of-band information demanded in PEM.

   This specification covers two classes of certificates: CA
   certificates and end entity certificates.  CA certificates may be
   further divided into three classes: cross-certificates, self-issued



Cooper, et al.              Standards Track                    [Page 12]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   certificates, and self-signed certificates.  Cross-certificates are
   CA certificates in which the issuer and subject are different
   entities.  Cross-certificates describe a trust relationship between
   the two CAs.  Self-issued certificates are CA certificates in which
   the issuer and subject are the same entity.  Self-issued certificates
   are generated to support changes in policy or operations.  Self-
   signed certificates are self-issued certificates where the digital
   signature may be verified by the public key bound into the
   certificate.  Self-signed certificates are used to convey a public
   key for use to begin certification paths.  End entity certificates
   are issued to subjects that are not authorized to issue certificates.
```

#### 15.1.1.2.3.3. Revocation

```text
   When a certificate is issued, it is expected to be in use for its
   entire validity period.  However, various circumstances may cause a
   certificate to become invalid prior to the expiration of the validity
   period.  Such circumstances include change of name, change of
   association between subject and CA (e.g., an employee terminates
   employment with an organization), and compromise or suspected
   compromise of the corresponding private key.  Under such
   circumstances, the CA needs to revoke the certificate.

   X.509 defines one method of certificate revocation.  This method
   involves each CA periodically issuing a signed data structure called
   a certificate revocation list (CRL).  A CRL is a time-stamped list
   identifying revoked certificates that is signed by a CA or CRL issuer
   and made freely available in a public repository.  Each revoked
   certificate is identified in a CRL by its certificate serial number.
   When a certificate-using system uses a certificate (e.g., for
   verifying a remote user's digital signature), that system not only
   checks the certificate signature and validity but also acquires a
   suitably recent CRL and checks that the certificate serial number is
   not on that CRL.  The meaning of "suitably recent" may vary with
   local policy, but it usually means the most recently issued CRL.  A
   new CRL is issued on a regular periodic basis (e.g., hourly, daily,
   or weekly).  An entry is added to the CRL as part of the next update
   following notification of revocation.  An entry MUST NOT be removed
   from the CRL until it appears on one regularly scheduled CRL issued
   beyond the revoked certificate's validity period.

   An advantage of this revocation method is that CRLs may be
   distributed by exactly the same means as certificates themselves,
   namely, via untrusted servers and untrusted communications.

   One limitation of the CRL revocation method, using untrusted
   communications and servers, is that the time granularity of
   revocation is limited to the CRL issue period.  For example, if a



Cooper, et al.              Standards Track                    [Page 13]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   revocation is reported now, that revocation will not be reliably
   notified to certificate-using systems until all currently issued CRLs
   are scheduled to be updated -- this may be up to one hour, one day,
   or one week depending on the frequency that CRLs are issued.

   As with the X.509 v3 certificate format, in order to facilitate
   interoperable implementations from multiple vendors, the X.509 v2 CRL
   format needs to be profiled for Internet use.  It is one goal of this
   document to specify that profile.  However, this profile does not
   require the issuance of CRLs.  Message formats and protocols
   supporting on-line revocation notification are defined in other PKIX
   specifications.  On-line methods of revocation notification may be
   applicable in some environments as an alternative to the X.509 CRL.
   On-line revocation checking may significantly reduce the latency
   between a revocation report and the distribution of the information
   to relying parties.  Once the CA accepts a revocation report as
   authentic and valid, any query to the on-line service will correctly
   reflect the certificate validation impacts of the revocation.
   However, these methods impose new security requirements: the
   certificate validator needs to trust the on-line validation service
   while the repository does not need to be trusted.
```

#### 15.1.1.2.3.4. Operational Protocols

```text
   Operational protocols are required to deliver certificates and CRLs
   (or status information) to certificate-using client systems.
   Provisions are needed for a variety of different means of certificate
   and CRL delivery, including distribution procedures based on LDAP,
   HTTP, FTP, and X.500.  Operational protocols supporting these
   functions are defined in other PKIX specifications.  These
   specifications may include definitions of message formats and
   procedures for supporting all of the above operational environments,
   including definitions of or references to appropriate MIME content
   types.
```

#### 15.1.1.2.3.5. Management Protocols

```text
   Management protocols are required to support on-line interactions
   between PKI user and management entities.  For example, a management
   protocol might be used between a CA and a client system with which a
   key pair is associated, or between two CAs that cross-certify each
   other.  The set of functions that potentially need to be supported by
   management protocols include:

      (a)  registration:  This is the process whereby a user first makes
           itself known to a CA (directly, or through an RA), prior to
           that CA issuing a certificate or certificates for that user.




Cooper, et al.              Standards Track                    [Page 14]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


      (b)  initialization:  Before a client system can operate securely,
           it is necessary to install key materials that have the
           appropriate relationship with keys stored elsewhere in the
           infrastructure.  For example, the client needs to be securely
           initialized with the public key and other assured information
           of the trusted CA(s), to be used in validating certificate
           paths.

           Furthermore, a client typically needs to be initialized with
           its own key pair(s).

      (c)  certification:  This is the process in which a CA issues a
           certificate for a user's public key, and returns that
           certificate to the user's client system and/or posts that
           certificate in a repository.

      (d)  key pair recovery:  As an option, user client key materials
           (e.g., a user's private key used for encryption purposes) may
           be backed up by a CA or a key backup system.  If a user needs
           to recover these backed-up key materials (e.g., as a result
           of a forgotten password or a lost key chain file), an on-line
           protocol exchange may be needed to support such recovery.

      (e)  key pair update:  All key pairs need to be updated regularly,
           i.e., replaced with a new key pair, and new certificates
           issued.

      (f)  revocation request:  An authorized person advises a CA of an
           abnormal situation requiring certificate revocation.

      (g)  cross-certification:  Two CAs exchange information used in
           establishing a cross-certificate.  A cross-certificate is a
           certificate issued by one CA to another CA that contains a CA
           signature key used for issuing certificates.

   Note that on-line protocols are not the only way of implementing the
   above functions.  For all functions, there are off-line methods of
   achieving the same result, and this specification does not mandate
   use of on-line protocols.  For example, when hardware tokens are
   used, many of the functions may be achieved as part of the physical
   token delivery.  Furthermore, some of the above functions may be
   combined into one protocol exchange.  In particular, two or more of
   the registration, initialization, and certification functions can be
   combined into one protocol exchange.







Cooper, et al.              Standards Track                    [Page 15]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   The PKIX series of specifications defines a set of standard message
   formats supporting the above functions.  The protocols for conveying
   these messages in different environments (e.g., email, file transfer,
   and WWW) are described in those specifications.
```

#### 15.1.1.2.4. Certificate and Certificate Extensions Profile

```text
   This section presents a profile for public key certificates that will
   foster interoperability and a reusable PKI.  This section is based
   upon the X.509 v3 certificate format and the standard certificate
   extensions defined in [X.509].  The ISO/IEC and ITU-T documents use
   the 1997 version of ASN.1; while this document uses the 1988 ASN.1
   syntax, the encoded certificate and standard extensions are
   equivalent.  This section also defines private extensions required to
   support a PKI for the Internet community.

   Certificates may be used in a wide range of applications and
   environments covering a broad spectrum of interoperability goals and
   a broader spectrum of operational and assurance requirements.  The
   goal of this document is to establish a common baseline for generic
   applications requiring broad interoperability and limited special
   purpose requirements.  In particular, the emphasis will be on
   supporting the use of X.509 v3 certificates for informal Internet
   electronic mail, IPsec, and WWW applications.
```

#### 15.1.1.2.4.1. Basic Certificate Fields

```text
   The X.509 v3 certificate basic syntax is as follows.  For signature
   calculation, the data that is to be signed is encoded using the ASN.1
   distinguished encoding rules (DER) [X.690].  ASN.1 DER encoding is a
   tag, length, value encoding system for each element.

   Certificate  ::=  SEQUENCE  {
        tbsCertificate       TBSCertificate,
        signatureAlgorithm   AlgorithmIdentifier,
        signatureValue       BIT STRING  }

   TBSCertificate  ::=  SEQUENCE  {
        version         [0]  EXPLICIT Version DEFAULT v1,
        serialNumber         CertificateSerialNumber,
        signature            AlgorithmIdentifier,
        issuer               Name,
        validity             Validity,
        subject              Name,
        subjectPublicKeyInfo SubjectPublicKeyInfo,
        issuerUniqueID  [1]  IMPLICIT UniqueIdentifier OPTIONAL,
                             -- If present, version MUST be v2 or v3




Cooper, et al.              Standards Track                    [Page 16]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


        subjectUniqueID [2]  IMPLICIT UniqueIdentifier OPTIONAL,
                             -- If present, version MUST be v2 or v3
        extensions      [3]  EXPLICIT Extensions OPTIONAL
                             -- If present, version MUST be v3
        }

   Version  ::=  INTEGER  {  v1(0), v2(1), v3(2)  }

   CertificateSerialNumber  ::=  INTEGER

   Validity ::= SEQUENCE {
        notBefore      Time,
        notAfter       Time }

   Time ::= CHOICE {
        utcTime        UTCTime,
        generalTime    GeneralizedTime }

   UniqueIdentifier  ::=  BIT STRING

   SubjectPublicKeyInfo  ::=  SEQUENCE  {
        algorithm            AlgorithmIdentifier,
        subjectPublicKey     BIT STRING  }

   Extensions  ::=  SEQUENCE SIZE (1..MAX) OF Extension

   Extension  ::=  SEQUENCE  {
        extnID      OBJECT IDENTIFIER,
        critical    BOOLEAN DEFAULT FALSE,
        extnValue   OCTET STRING
                    -- contains the DER encoding of an ASN.1 value
                    -- corresponding to the extension type identified
                    -- by extnID
        }

   The following items describe the X.509 v3 certificate for use in the
   Internet.
```

#### 15.1.1.2.4.1.1. Certificate Fields

```text
   The Certificate is a SEQUENCE of three required fields.  The fields
   are described in detail in the following subsections.









Cooper, et al.              Standards Track                    [Page 17]

RFC 5280            PKIX Certificate and CRL Profile            May 2008
```

#### 15.1.1.2.4.1.1.1. tbsCertificate

```text
   The field contains the names of the subject and issuer, a public key
   associated with the subject, a validity period, and other associated
   information.  The fields are described in detail in Section 4.1.2;
   the tbsCertificate usually includes extensions, which are described
   in Section 15.1.1.2.4.2.
```

#### 15.1.1.2.4.1.1.2. signatureAlgorithm

```text
   The signatureAlgorithm field contains the identifier for the
   cryptographic algorithm used by the CA to sign this certificate.
   [RFC3279], [RFC4055], and [RFC4491] list supported signature
   algorithms, but other signature algorithms MAY also be supported.

   An algorithm identifier is defined by the following ASN.1 structure:

   AlgorithmIdentifier  ::=  SEQUENCE  {
        algorithm               OBJECT IDENTIFIER,
        parameters              ANY DEFINED BY algorithm OPTIONAL  }

   The algorithm identifier is used to identify a cryptographic
   algorithm.  The OBJECT IDENTIFIER component identifies the algorithm
   (such as DSA with SHA-1).  The contents of the optional parameters
   field will vary according to the algorithm identified.

   This field MUST contain the same algorithm identifier as the
   signature field in the sequence tbsCertificate (Section 15.1.1.2.4.1.2.3).
```

#### 15.1.1.2.4.1.1.3. signatureValue

```text
   The signatureValue field contains a digital signature computed upon
   the ASN.1 DER encoded tbsCertificate.  The ASN.1 DER encoded
   tbsCertificate is used as the input to the signature function.  This
   signature value is encoded as a BIT STRING and included in the
   signature field.  The details of this process are specified for each
   of the algorithms listed in [RFC3279], [RFC4055], and [RFC4491].

   By generating this signature, a CA certifies the validity of the
   information in the tbsCertificate field.  In particular, the CA
   certifies the binding between the public key material and the subject
   of the certificate.
```

#### 15.1.1.2.4.1.2. TBSCertificate

```text
   The sequence TBSCertificate contains information associated with the
   subject of the certificate and the CA that issued it.  Every
   TBSCertificate contains the names of the subject and issuer, a public



Cooper, et al.              Standards Track                    [Page 18]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   key associated with the subject, a validity period, a version number,
   and a serial number; some MAY contain optional unique identifier
   fields.  The remainder of this section describes the syntax and
   semantics of these fields.  A TBSCertificate usually includes
   extensions.  Extensions for the Internet PKI are described in Section
   15.1.1.2.4.2.
```

#### 15.1.1.2.4.1.2.1. Version

```text
   This field describes the version of the encoded certificate.  When
   extensions are used, as expected in this profile, version MUST be 3
   (value is 2).  If no extensions are present, but a UniqueIdentifier
   is present, the version SHOULD be 2 (value is 1); however, the
   version MAY be 3.  If only basic fields are present, the version
   SHOULD be 1 (the value is omitted from the certificate as the default
   value); however, the version MAY be 2 or 3.

   Implementations SHOULD be prepared to accept any version certificate.
   At a minimum, conforming implementations MUST recognize version 3
   certificates.

   Generation of version 2 certificates is not expected by
   implementations based on this profile.
```

#### 15.1.1.2.4.1.2.2. Serial Number

```text
   The serial number MUST be a positive integer assigned by the CA to
   each certificate.  It MUST be unique for each certificate issued by a
   given CA (i.e., the issuer name and serial number identify a unique
   certificate).  CAs MUST force the serialNumber to be a non-negative
   integer.

   Given the uniqueness requirements above, serial numbers can be
   expected to contain long integers.  Certificate users MUST be able to
   handle serialNumber values up to 20 octets.  Conforming CAs MUST NOT
   use serialNumber values longer than 20 octets.

   Note: Non-conforming CAs may issue certificates with serial numbers
   that are negative or zero.  Certificate users SHOULD be prepared to
   gracefully handle such certificates.
```

#### 15.1.1.2.4.1.2.3. Signature

```text
   This field contains the algorithm identifier for the algorithm used
   by the CA to sign the certificate.

   This field MUST contain the same algorithm identifier as the
   signatureAlgorithm field in the sequence Certificate (Section



Cooper, et al.              Standards Track                    [Page 19]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   15.1.1.2.4.1.1.2).  The contents of the optional parameters field will vary
   according to the algorithm identified.  [RFC3279], [RFC4055], and
   [RFC4491] list supported signature algorithms, but other signature
   algorithms MAY also be supported.
```

#### 15.1.1.2.4.1.2.4. Issuer

```text
   The issuer field identifies the entity that has signed and issued the
   certificate.  The issuer field MUST contain a non-empty distinguished
   name (DN).  The issuer field is defined as the X.501 type Name
   [X.501].  Name is defined by the following ASN.1 structures:

   Name ::= CHOICE { -- only one possibility for now --
     rdnSequence  RDNSequence }

   RDNSequence ::= SEQUENCE OF RelativeDistinguishedName

   RelativeDistinguishedName ::=
     SET SIZE (1..MAX) OF AttributeTypeAndValue

   AttributeTypeAndValue ::= SEQUENCE {
     type     AttributeType,
     value    AttributeValue }

   AttributeType ::= OBJECT IDENTIFIER

   AttributeValue ::= ANY -- DEFINED BY AttributeType

   DirectoryString ::= CHOICE {
         teletexString           TeletexString (SIZE (1..MAX)),
         printableString         PrintableString (SIZE (1..MAX)),
         universalString         UniversalString (SIZE (1..MAX)),
         utf8String              UTF8String (SIZE (1..MAX)),
         bmpString               BMPString (SIZE (1..MAX)) }

   The Name describes a hierarchical name composed of attributes, such
   as country name, and corresponding values, such as US.  The type of
   the component AttributeValue is determined by the AttributeType; in
   general it will be a DirectoryString.

   The DirectoryString type is defined as a choice of PrintableString,
   TeletexString, BMPString, UTF8String, and UniversalString.  CAs
   conforming to this profile MUST use either the PrintableString or
   UTF8String encoding of DirectoryString, with two exceptions.  When
   CAs have previously issued certificates with issuer fields with
   attributes encoded using TeletexString, BMPString, or
   UniversalString, then the CA MAY continue to use these encodings of
   the DirectoryString to preserve backward compatibility.  Also, new



Cooper, et al.              Standards Track                    [Page 20]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   CAs that are added to a domain where existing CAs issue certificates
   with issuer fields with attributes encoded using TeletexString,
   BMPString, or UniversalString MAY encode attributes that they share
   with the existing CAs using the same encodings as the existing CAs
   use.

   As noted above, distinguished names are composed of attributes.  This
   specification does not restrict the set of attribute types that may
   appear in names.  However, conforming implementations MUST be
   prepared to receive certificates with issuer names containing the set
   of attribute types defined below.  This specification RECOMMENDS
   support for additional attribute types.

   Standard sets of attributes have been defined in the X.500 series of
   specifications [X.520].  Implementations of this specification MUST
   be prepared to receive the following standard attribute types in
   issuer and subject (Section 15.1.1.2.4.1.2.6) names:

      * country,
      * organization,
      * organizational unit,
      * distinguished name qualifier,
      * state or province name,
      * common name (e.g., "Susan Housley"), and
      * serial number.

   In addition, implementations of this specification SHOULD be prepared
   to receive the following standard attribute types in issuer and
   subject names:

      * locality,
      * title,
      * surname,
      * given name,
      * initials,
      * pseudonym, and
      * generation qualifier (e.g., "Jr.", "3rd", or "IV").

   The syntax and associated object identifiers (OIDs) for these
   attribute types are provided in the ASN.1 modules in Appendix A.

   In addition, implementations of this specification MUST be prepared
   to receive the domainComponent attribute, as defined in [RFC4519].
   The Domain Name System (DNS) provides a hierarchical resource
   labeling system.  This attribute provides a convenient mechanism for
   organizations that wish to use DNs that parallel their DNS names.
   This is not a replacement for the dNSName component of the
   alternative name extensions.  Implementations are not required to



Cooper, et al.              Standards Track                    [Page 21]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   convert such names into DNS names.  The syntax and associated OID for
   this attribute type are provided in the ASN.1 modules in Appendix A.
   Rules for encoding internationalized domain names for use with the
   domainComponent attribute type are specified in Section 15.1.1.2.7.3.

   Certificate users MUST be prepared to process the issuer
   distinguished name and subject distinguished name (Section 15.1.1.2.4.1.2.6)
   fields to perform name chaining for certification path validation
   (Section 6).  Name chaining is performed by matching the issuer
   distinguished name in one certificate with the subject name in a CA
   certificate.  Rules for comparing distinguished names are specified
   in Section 15.1.1.2.7.1.  If the names in the issuer and subject field in a
   certificate match according to the rules specified in Section 15.1.1.2.7.1,
   then the certificate is self-issued.
```

#### 15.1.1.2.4.1.2.5. Validity

```text
   The certificate validity period is the time interval during which the
   CA warrants that it will maintain information about the status of the
   certificate.  The field is represented as a SEQUENCE of two dates:
   the date on which the certificate validity period begins (notBefore)
   and the date on which the certificate validity period ends
   (notAfter).  Both notBefore and notAfter may be encoded as UTCTime or
   GeneralizedTime.

   CAs conforming to this profile MUST always encode certificate
   validity dates through the year 2049 as UTCTime; certificate validity
   dates in 2050 or later MUST be encoded as GeneralizedTime.
   Conforming applications MUST be able to process validity dates that
   are encoded in either UTCTime or GeneralizedTime.

   The validity period for a certificate is the period of time from
   notBefore through notAfter, inclusive.

   In some situations, devices are given certificates for which no good
   expiration date can be assigned.  For example, a device could be
   issued a certificate that binds its model and serial number to its
   public key; such a certificate is intended to be used for the entire
   lifetime of the device.

   To indicate that a certificate has no well-defined expiration date,
   the notAfter SHOULD be assigned the GeneralizedTime value of
   99991231235959Z.

   When the issuer will not be able to maintain status information until
   the notAfter date (including when the notAfter date is
   99991231235959Z), the issuer MUST ensure that no valid certification
   path exists for the certificate after maintenance of status



Cooper, et al.              Standards Track                    [Page 22]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   information is terminated.  This may be accomplished by expiration or
   revocation of all CA certificates containing the public key used to
   verify the signature on the certificate and discontinuing use of the
   public key used to verify the signature on the certificate as a trust
   anchor.
```

#### 15.1.1.2.4.1.2.5.1. UTCTime

```text
   The universal time type, UTCTime, is a standard ASN.1 type intended
   for representation of dates and time.  UTCTime specifies the year
   through the two low-order digits and time is specified to the
   precision of one minute or one second.  UTCTime includes either Z
   (for Zulu, or Greenwich Mean Time) or a time differential.

   For the purposes of this profile, UTCTime values MUST be expressed in
   Greenwich Mean Time (Zulu) and MUST include seconds (i.e., times are
   YYMMDDHHMMSSZ), even where the number of seconds is zero.  Conforming
   systems MUST interpret the year field (YY) as follows:

      Where YY is greater than or equal to 50, the year SHALL be
      interpreted as 19YY; and

      Where YY is less than 50, the year SHALL be interpreted as 20YY.
```

#### 15.1.1.2.4.1.2.5.2. GeneralizedTime

```text
   The generalized time type, GeneralizedTime, is a standard ASN.1 type
   for variable precision representation of time.  Optionally, the
   GeneralizedTime field can include a representation of the time
   differential between local and Greenwich Mean Time.

   For the purposes of this profile, GeneralizedTime values MUST be
   expressed in Greenwich Mean Time (Zulu) and MUST include seconds
   (i.e., times are YYYYMMDDHHMMSSZ), even where the number of seconds
   is zero.  GeneralizedTime values MUST NOT include fractional seconds.
```

#### 15.1.1.2.4.1.2.6. Subject

```text
   The subject field identifies the entity associated with the public
   key stored in the subject public key field.  The subject name MAY be
   carried in the subject field and/or the subjectAltName extension.  If
   the subject is a CA (e.g., the basic constraints extension, as
   discussed in Section 15.1.1.2.4.2.1.9, is present and the value of cA is
   TRUE), then the subject field MUST be populated with a non-empty
   distinguished name matching the contents of the issuer field (Section
   15.1.1.2.4.1.2.4) in all certificates issued by the subject CA.  If the
   subject is a CRL issuer (e.g., the key usage extension, as discussed
   in Section 15.1.1.2.4.2.1.3, is present and the value of cRLSign is TRUE),



Cooper, et al.              Standards Track                    [Page 23]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   then the subject field MUST be populated with a non-empty
   distinguished name matching the contents of the issuer field (Section
   15.1.1.2.5.1.2.3) in all CRLs issued by the subject CRL issuer.  If subject
   naming information is present only in the subjectAltName extension
   (e.g., a key bound only to an email address or URI), then the subject
   name MUST be an empty sequence and the subjectAltName extension MUST
   be critical.

   Where it is non-empty, the subject field MUST contain an X.500
   distinguished name (DN).  The DN MUST be unique for each subject
   entity certified by the one CA as defined by the issuer field.  A CA
   MAY issue more than one certificate with the same DN to the same
   subject entity.

   The subject field is defined as the X.501 type Name.  Implementation
   requirements for this field are those defined for the issuer field
   (Section 15.1.1.2.4.1.2.4).  Implementations of this specification MUST be
   prepared to receive subject names containing the attribute types
   required for the issuer field.  Implementations of this specification
   SHOULD be prepared to receive subject names containing the
   recommended attribute types for the issuer field.  The syntax and
   associated object identifiers (OIDs) for these attribute types are
   provided in the ASN.1 modules in Appendix A.  Implementations of this
   specification MAY use the comparison rules in Section 15.1.1.2.7.1 to process
   unfamiliar attribute types (i.e., for name chaining) whose attribute
   values use one of the encoding options from DirectoryString.  Binary
   comparison should be used when unfamiliar attribute types include
   attribute values with encoding options other than those found in
   DirectoryString.  This allows implementations to process certificates
   with unfamiliar attributes in the subject name.

   When encoding attribute values of type DirectoryString, conforming
   CAs MUST use PrintableString or UTF8String encoding, with the
   following exceptions:

      (a)  When the subject of the certificate is a CA, the subject
           field MUST be encoded in the same way as it is encoded in the
           issuer field (Section 15.1.1.2.4.1.2.4) in all certificates issued by
           the subject CA.  Thus, if the subject CA encodes attributes
           in the issuer fields of certificates that it issues using the
           TeletexString, BMPString, or UniversalString encodings, then
           the subject field of certificates issued to that CA MUST use
           the same encoding.

      (b)  When the subject of the certificate is a CRL issuer, the
           subject field MUST be encoded in the same way as it is
           encoded in the issuer field (Section 15.1.1.2.5.1.2.3) in all CRLs
           issued by the subject CRL issuer.



Cooper, et al.              Standards Track                    [Page 24]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


      (c)  TeletexString, BMPString, and UniversalString are included
           for backward compatibility, and SHOULD NOT be used for
           certificates for new subjects.  However, these types MAY be
           used in certificates where the name was previously
           established, including cases in which a new certificate is
           being issued to an existing subject or a certificate is being
           issued to a new subject where the attributes being encoded
           have been previously established in certificates issued to
           other subjects.  Certificate users SHOULD be prepared to
           receive certificates with these types.

   Legacy implementations exist where an electronic mail address is
   embedded in the subject distinguished name as an emailAddress
   attribute [RFC2985].  The attribute value for emailAddress is of type
   IA5String to permit inclusion of the character '@', which is not part
   of the PrintableString character set.  emailAddress attribute values
   are not case-sensitive (e.g., "subscriber@example.com" is the same as
   "SUBSCRIBER@EXAMPLE.COM").

   Conforming implementations generating new certificates with
   electronic mail addresses MUST use the rfc822Name in the subject
   alternative name extension (Section 15.1.1.2.4.2.1.6) to describe such
   identities.  Simultaneous inclusion of the emailAddress attribute in
   the subject distinguished name to support legacy implementations is
   deprecated but permitted.
```

#### 15.1.1.2.4.1.2.7. Subject Public Key Info

```text
   This field is used to carry the public key and identify the algorithm
   with which the key is used (e.g., RSA, DSA, or Diffie-Hellman).  The
   algorithm is identified using the AlgorithmIdentifier structure
   specified in Section 15.1.1.2.4.1.1.2.  The object identifiers for the
   supported algorithms and the methods for encoding the public key
   materials (public key and parameters) are specified in [RFC3279],
   [RFC4055], and [RFC4491].
```

#### 15.1.1.2.4.1.2.8. Unique Identifiers

```text
   These fields MUST only appear if the version is 2 or 3 (Section
   15.1.1.2.4.1.2.1).  These fields MUST NOT appear if the version is 15.1.1.2.1.  The
   subject and issuer unique identifiers are present in the certificate
   to handle the possibility of reuse of subject and/or issuer names
   over time.  This profile RECOMMENDS that names not be reused for
   different entities and that Internet certificates not make use of
   unique identifiers.  CAs conforming to this profile MUST NOT generate
   certificates with unique identifiers.  Applications conforming to





Cooper, et al.              Standards Track                    [Page 25]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   this profile SHOULD be capable of parsing certificates that include
   unique identifiers, but there are no processing requirements
   associated with the unique identifiers.
```

#### 15.1.1.2.4.1.2.9. Extensions

```text
   This field MUST only appear if the version is 3 (Section 15.1.1.2.4.1.2.1).
   If present, this field is a SEQUENCE of one or more certificate
   extensions.  The format and content of certificate extensions in the
   Internet PKI are defined in Section 15.1.1.2.4.2.
```

#### 15.1.1.2.4.2. Certificate Extensions

```text
   The extensions defined for X.509 v3 certificates provide methods for
   associating additional attributes with users or public keys and for
   managing relationships between CAs.  The X.509 v3 certificate format
   also allows communities to define private extensions to carry
   information unique to those communities.  Each extension in a
   certificate is designated as either critical or non-critical.  A
   certificate-using system MUST reject the certificate if it encounters
   a critical extension it does not recognize or a critical extension
   that contains information that it cannot process.  A non-critical
   extension MAY be ignored if it is not recognized, but MUST be
   processed if it is recognized.  The following sections present
   recommended extensions used within Internet certificates and standard
   locations for information.  Communities may elect to use additional
   extensions; however, caution ought to be exercised in adopting any
   critical extensions in certificates that might prevent use in a
   general context.

   Each extension includes an OID and an ASN.1 structure.  When an
   extension appears in a certificate, the OID appears as the field
   extnID and the corresponding ASN.1 DER encoded structure is the value
   of the octet string extnValue.  A certificate MUST NOT include more
   than one instance of a particular extension.  For example, a
   certificate may contain only one authority key identifier extension
   (Section 15.1.1.2.4.2.1.1).  An extension includes the boolean critical, with
   a default value of FALSE.  The text for each extension specifies the
   acceptable values for the critical field for CAs conforming to this
   profile.

   Conforming CAs MUST support key identifiers (Sections 15.1.1.2.4.2.1.1 and
   15.1.1.2.4.2.1.2), basic constraints (Section 15.1.1.2.4.2.1.9), key usage (Section
   15.1.1.2.4.2.1.3), and certificate policies (Section 15.1.1.2.4.2.1.4) extensions.  If
   the CA issues certificates with an empty sequence for the subject
   field, the CA MUST support the subject alternative name extension
   (Section 15.1.1.2.4.2.1.6).  Support for the remaining extensions is OPTIONAL.
   Conforming CAs MAY support extensions that are not identified within



Cooper, et al.              Standards Track                    [Page 26]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   this specification; certificate issuers are cautioned that marking
   such extensions as critical may inhibit interoperability.

   At a minimum, applications conforming to this profile MUST recognize
   the following extensions: key usage (Section 15.1.1.2.4.2.1.3), certificate
   policies (Section 15.1.1.2.4.2.1.4), subject alternative name (Section
   15.1.1.2.4.2.1.6), basic constraints (Section 15.1.1.2.4.2.1.9), name constraints
   (Section 15.1.1.2.4.2.1.10), policy constraints (Section 15.1.1.2.4.2.1.11), extended
   key usage (Section 15.1.1.2.4.2.1.12), and inhibit anyPolicy (Section
   15.1.1.2.4.2.1.14).

   In addition, applications conforming to this profile SHOULD recognize
   the authority and subject key identifier (Sections 15.1.1.2.4.2.1.1 and
   15.1.1.2.4.2.1.2) and policy mappings (Section 15.1.1.2.4.2.1.5) extensions.
```

#### 15.1.1.2.4.2.1. Standard Extensions

```text
   This section identifies standard certificate extensions defined in
   [X.509] for use in the Internet PKI.  Each extension is associated
   with an OID defined in [X.509].  These OIDs are members of the id-ce
   arc, which is defined by the following:

   id-ce   OBJECT IDENTIFIER ::=  { joint-iso-ccitt(2) ds(5) 29 }
```

#### 15.1.1.2.4.2.1.1. Authority Key Identifier

```text
   The authority key identifier extension provides a means of
   identifying the public key corresponding to the private key used to
   sign a certificate.  This extension is used where an issuer has
   multiple signing keys (either due to multiple concurrent key pairs or
   due to changeover).  The identification MAY be based on either the
   key identifier (the subject key identifier in the issuer's
   certificate) or the issuer name and serial number.

   The keyIdentifier field of the authorityKeyIdentifier extension MUST
   be included in all certificates generated by conforming CAs to
   facilitate certification path construction.  There is one exception;
   where a CA distributes its public key in the form of a "self-signed"
   certificate, the authority key identifier MAY be omitted.  The
   signature on a self-signed certificate is generated with the private
   key associated with the certificate's subject public key.  (This
   proves that the issuer possesses both the public and private keys.)
   In this case, the subject and authority key identifiers would be
   identical, but only the subject key identifier is needed for
   certification path building.

   The value of the keyIdentifier field SHOULD be derived from the
   public key used to verify the certificate's signature or a method



Cooper, et al.              Standards Track                    [Page 27]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   that generates unique values.  Two common methods for generating key
   identifiers from the public key are described in Section 15.1.1.2.4.2.1.2.
   Where a key identifier has not been previously established, this
   specification RECOMMENDS use of one of these methods for generating
   keyIdentifiers or use of a similar method that uses a different hash
   algorithm.  Where a key identifier has been previously established,
   the CA SHOULD use the previously established identifier.

   This profile RECOMMENDS support for the key identifier method by all
   certificate users.

   Conforming CAs MUST mark this extension as non-critical.

   id-ce-authorityKeyIdentifier OBJECT IDENTIFIER ::=  { id-ce 35 }

   AuthorityKeyIdentifier ::= SEQUENCE {
      keyIdentifier             [0] KeyIdentifier           OPTIONAL,
      authorityCertIssuer       [1] GeneralNames            OPTIONAL,
      authorityCertSerialNumber [2] CertificateSerialNumber OPTIONAL  }

   KeyIdentifier ::= OCTET STRING
```

#### 15.1.1.2.4.2.1.2. Subject Key Identifier

```text
   The subject key identifier extension provides a means of identifying
   certificates that contain a particular public key.

   To facilitate certification path construction, this extension MUST
   appear in all conforming CA certificates, that is, all certificates
   including the basic constraints extension (Section 15.1.1.2.4.2.1.9) where the
   value of cA is TRUE.  In conforming CA certificates, the value of the
   subject key identifier MUST be the value placed in the key identifier
   field of the authority key identifier extension (Section 15.1.1.2.4.2.1.1) of
   certificates issued by the subject of this certificate.  Applications
   are not required to verify that key identifiers match when performing
   certification path validation.

   For CA certificates, subject key identifiers SHOULD be derived from
   the public key or a method that generates unique values.  Two common
   methods for generating key identifiers from the public key are:

      (1) The keyIdentifier is composed of the 160-bit SHA-1 hash of the
           value of the BIT STRING subjectPublicKey (excluding the tag,
           length, and number of unused bits).







Cooper, et al.              Standards Track                    [Page 28]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


      (2) The keyIdentifier is composed of a four-bit type field with
           the value 0100 followed by the least significant 60 bits of
           the SHA-1 hash of the value of the BIT STRING
           subjectPublicKey (excluding the tag, length, and number of
           unused bits).

   Other methods of generating unique numbers are also acceptable.

   For end entity certificates, the subject key identifier extension
   provides a means for identifying certificates containing the
   particular public key used in an application.  Where an end entity
   has obtained multiple certificates, especially from multiple CAs, the
   subject key identifier provides a means to quickly identify the set
   of certificates containing a particular public key.  To assist
   applications in identifying the appropriate end entity certificate,
   this extension SHOULD be included in all end entity certificates.

   For end entity certificates, subject key identifiers SHOULD be
   derived from the public key.  Two common methods for generating key
   identifiers from the public key are identified above.

   Where a key identifier has not been previously established, this
   specification RECOMMENDS use of one of these methods for generating
   keyIdentifiers or use of a similar method that uses a different hash
   algorithm.  Where a key identifier has been previously established,
   the CA SHOULD use the previously established identifier.

   Conforming CAs MUST mark this extension as non-critical.

   id-ce-subjectKeyIdentifier OBJECT IDENTIFIER ::=  { id-ce 14 }

   SubjectKeyIdentifier ::= KeyIdentifier
```

#### 15.1.1.2.4.2.1.3. Key Usage

```text
   The key usage extension defines the purpose (e.g., encipherment,
   signature, certificate signing) of the key contained in the
   certificate.  The usage restriction might be employed when a key that
   could be used for more than one operation is to be restricted.  For
   example, when an RSA key should be used only to verify signatures on
   objects other than public key certificates and CRLs, the
   digitalSignature and/or nonRepudiation bits would be asserted.
   Likewise, when an RSA key should be used only for key management, the
   keyEncipherment bit would be asserted.







Cooper, et al.              Standards Track                    [Page 29]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   Conforming CAs MUST include this extension in certificates that
   contain public keys that are used to validate digital signatures on
   other public key certificates or CRLs.  When present, conforming CAs
   SHOULD mark this extension as critical.

      id-ce-keyUsage OBJECT IDENTIFIER ::=  { id-ce 15 }

      KeyUsage ::= BIT STRING {
           digitalSignature        (0),
           nonRepudiation          (1), -- recent editions of X.509 have
                                -- renamed this bit to contentCommitment
           keyEncipherment         (2),
           dataEncipherment        (3),
           keyAgreement            (4),
           keyCertSign             (5),
           cRLSign                 (6),
           encipherOnly            (7),
           decipherOnly            (8) }

   Bits in the KeyUsage type are used as follows:

      The digitalSignature bit is asserted when the subject public key
      is used for verifying digital signatures, other than signatures on
      certificates (bit 5) and CRLs (bit 6), such as those used in an
      entity authentication service, a data origin authentication
      service, and/or an integrity service.

      The nonRepudiation bit is asserted when the subject public key is
      used to verify digital signatures, other than signatures on
      certificates (bit 5) and CRLs (bit 6), used to provide a non-
      repudiation service that protects against the signing entity
      falsely denying some action.  In the case of later conflict, a
      reliable third party may determine the authenticity of the signed
      data.  (Note that recent editions of X.509 have renamed the
      nonRepudiation bit to contentCommitment.)

      The keyEncipherment bit is asserted when the subject public key is
      used for enciphering private or secret keys, i.e., for key
      transport.  For example, this bit shall be set when an RSA public
      key is to be used for encrypting a symmetric content-decryption
      key or an asymmetric private key.

      The dataEncipherment bit is asserted when the subject public key
      is used for directly enciphering raw user data without the use of
      an intermediate symmetric cipher.  Note that the use of this bit
      is extremely uncommon; almost all applications use key transport
      or key agreement to establish a symmetric key.




Cooper, et al.              Standards Track                    [Page 30]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


      The keyAgreement bit is asserted when the subject public key is
      used for key agreement.  For example, when a Diffie-Hellman key is
      to be used for key management, then this bit is set.

      The keyCertSign bit is asserted when the subject public key is
      used for verifying signatures on public key certificates.  If the
      keyCertSign bit is asserted, then the cA bit in the basic
      constraints extension (Section 15.1.1.2.4.2.1.9) MUST also be asserted.

      The cRLSign bit is asserted when the subject public key is used
      for verifying signatures on certificate revocation lists (e.g.,
      CRLs, delta CRLs, or ARLs).

      The meaning of the encipherOnly bit is undefined in the absence of
      the keyAgreement bit.  When the encipherOnly bit is asserted and
      the keyAgreement bit is also set, the subject public key may be
      used only for enciphering data while performing key agreement.

      The meaning of the decipherOnly bit is undefined in the absence of
      the keyAgreement bit.  When the decipherOnly bit is asserted and
      the keyAgreement bit is also set, the subject public key may be
      used only for deciphering data while performing key agreement.

   If the keyUsage extension is present, then the subject public key
   MUST NOT be used to verify signatures on certificates or CRLs unless
   the corresponding keyCertSign or cRLSign bit is set.  If the subject
   public key is only to be used for verifying signatures on
   certificates and/or CRLs, then the digitalSignature and
   nonRepudiation bits SHOULD NOT be set.  However, the digitalSignature
   and/or nonRepudiation bits MAY be set in addition to the keyCertSign
   and/or cRLSign bits if the subject public key is to be used to verify
   signatures on certificates and/or CRLs as well as other objects.

   Combining the nonRepudiation bit in the keyUsage certificate
   extension with other keyUsage bits may have security implications
   depending on the context in which the certificate is to be used.
   Further distinctions between the digitalSignature and nonRepudiation
   bits may be provided in specific certificate policies.

   This profile does not restrict the combinations of bits that may be
   set in an instantiation of the keyUsage extension.  However,
   appropriate values for keyUsage extensions for particular algorithms
   are specified in [RFC3279], [RFC4055], and [RFC4491].  When the
   keyUsage extension appears in a certificate, at least one of the bits
   MUST be set to 1.






Cooper, et al.              Standards Track                    [Page 31]

RFC 5280            PKIX Certificate and CRL Profile            May 2008
```

#### 15.1.1.2.4.2.1.4. Certificate Policies

```text
   The certificate policies extension contains a sequence of one or more
   policy information terms, each of which consists of an object
   identifier (OID) and optional qualifiers.  Optional qualifiers, which
   MAY be present, are not expected to change the definition of the
   policy.  A certificate policy OID MUST NOT appear more than once in a
   certificate policies extension.

   In an end entity certificate, these policy information terms indicate
   the policy under which the certificate has been issued and the
   purposes for which the certificate may be used.  In a CA certificate,
   these policy information terms limit the set of policies for
   certification paths that include this certificate.  When a CA does
   not wish to limit the set of policies for certification paths that
   include this certificate, it MAY assert the special policy anyPolicy,
   with a value of { 2 5 29 32 0 }.

   Applications with specific policy requirements are expected to have a
   list of those policies that they will accept and to compare the
   policy OIDs in the certificate to that list.  If this extension is
   critical, the path validation software MUST be able to interpret this
   extension (including the optional qualifier), or MUST reject the
   certificate.

   To promote interoperability, this profile RECOMMENDS that policy
   information terms consist of only an OID.  Where an OID alone is
   insufficient, this profile strongly recommends that the use of
   qualifiers be limited to those identified in this section.  When
   qualifiers are used with the special policy anyPolicy, they MUST be
   limited to the qualifiers identified in this section.  Only those
   qualifiers returned as a result of path validation are considered.

   This specification defines two policy qualifier types for use by
   certificate policy writers and certificate issuers.  The qualifier
   types are the CPS Pointer and User Notice qualifiers.

   The CPS Pointer qualifier contains a pointer to a Certification
   Practice Statement (CPS) published by the CA.  The pointer is in the
   form of a URI.  Processing requirements for this qualifier are a
   local matter.  No action is mandated by this specification regardless
   of the criticality value asserted for the extension.

   User notice is intended for display to a relying party when a
   certificate is used.  Only user notices returned as a result of path
   validation are intended for display to the user.  If a notice is





Cooper, et al.              Standards Track                    [Page 32]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   duplicated, only one copy need be displayed.  To prevent such
   duplication, this qualifier SHOULD only be present in end entity
   certificates and CA certificates issued to other organizations.

   The user notice has two optional fields: the noticeRef field and the
   explicitText field.  Conforming CAs SHOULD NOT use the noticeRef
   option.

      The noticeRef field, if used, names an organization and
      identifies, by number, a particular textual statement prepared by
      that organization.  For example, it might identify the
      organization "CertsRUs" and notice number 1.  In a typical
      implementation, the application software will have a notice file
      containing the current set of notices for CertsRUs; the
      application will extract the notice text from the file and display
      it.  Messages MAY be multilingual, allowing the software to select
      the particular language message for its own environment.

      An explicitText field includes the textual statement directly in
      the certificate.  The explicitText field is a string with a
      maximum size of 200 characters.  Conforming CAs SHOULD use the
      UTF8String encoding for explicitText, but MAY use IA5String.
      Conforming CAs MUST NOT encode explicitText as VisibleString or
      BMPString.  The explicitText string SHOULD NOT include any control
      characters (e.g., U+0000 to U+001F and U+007F to U+009F).  When
      the UTF8String encoding is used, all character sequences SHOULD be
      normalized according to Unicode normalization form C (NFC) [NFC].

   If both the noticeRef and explicitText options are included in the
   one qualifier and if the application software can locate the notice
   text indicated by the noticeRef option, then that text SHOULD be
   displayed; otherwise, the explicitText string SHOULD be displayed.

   Note: While the explicitText has a maximum size of 200 characters,
   some non-conforming CAs exceed this limit.  Therefore, certificate
   users SHOULD gracefully handle explicitText with more than 200
   characters.














Cooper, et al.              Standards Track                    [Page 33]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   id-ce-certificatePolicies OBJECT IDENTIFIER ::=  { id-ce 32 }

   anyPolicy OBJECT IDENTIFIER ::= { id-ce-certificatePolicies 0 }

   certificatePolicies ::= SEQUENCE SIZE (1..MAX) OF PolicyInformation

   PolicyInformation ::= SEQUENCE {
        policyIdentifier   CertPolicyId,
        policyQualifiers   SEQUENCE SIZE (1..MAX) OF
                                PolicyQualifierInfo OPTIONAL }

   CertPolicyId ::= OBJECT IDENTIFIER

   PolicyQualifierInfo ::= SEQUENCE {
        policyQualifierId  PolicyQualifierId,
        qualifier          ANY DEFINED BY policyQualifierId }

   -- policyQualifierIds for Internet policy qualifiers

   id-qt          OBJECT IDENTIFIER ::=  { id-pkix 2 }
   id-qt-cps      OBJECT IDENTIFIER ::=  { id-qt 1 }
   id-qt-unotice  OBJECT IDENTIFIER ::=  { id-qt 2 }

   PolicyQualifierId ::= OBJECT IDENTIFIER ( id-qt-cps | id-qt-unotice )

   Qualifier ::= CHOICE {
        cPSuri           CPSuri,
        userNotice       UserNotice }

   CPSuri ::= IA5String

   UserNotice ::= SEQUENCE {
        noticeRef        NoticeReference OPTIONAL,
        explicitText     DisplayText OPTIONAL }

   NoticeReference ::= SEQUENCE {
        organization     DisplayText,
        noticeNumbers    SEQUENCE OF INTEGER }

   DisplayText ::= CHOICE {
        ia5String        IA5String      (SIZE (1..200)),
        visibleString    VisibleString  (SIZE (1..200)),
        bmpString        BMPString      (SIZE (1..200)),
        utf8String       UTF8String     (SIZE (1..200)) }







Cooper, et al.              Standards Track                    [Page 34]

RFC 5280            PKIX Certificate and CRL Profile            May 2008
```

#### 15.1.1.2.4.2.1.5. Policy Mappings

```text
   This extension is used in CA certificates.  It lists one or more
   pairs of OIDs; each pair includes an issuerDomainPolicy and a
   subjectDomainPolicy.  The pairing indicates the issuing CA considers
   its issuerDomainPolicy equivalent to the subject CA's
   subjectDomainPolicy.

   The issuing CA's users might accept an issuerDomainPolicy for certain
   applications.  The policy mapping defines the list of policies
   associated with the subject CA that may be accepted as comparable to
   the issuerDomainPolicy.

   Each issuerDomainPolicy named in the policy mappings extension SHOULD
   also be asserted in a certificate policies extension in the same
   certificate.  Policies MUST NOT be mapped either to or from the
   special value anyPolicy (Section 15.1.1.2.4.2.1.4).

   In general, certificate policies that appear in the
   issuerDomainPolicy field of the policy mappings extension are not
   considered acceptable policies for inclusion in subsequent
   certificates in the certification path.  In some circumstances, a CA
   may wish to map from one policy (p1) to another (p2), but still wants
   the issuerDomainPolicy (p1) to be considered acceptable for inclusion
   in subsequent certificates.  This may occur, for example, if the CA
   is in the process of transitioning from the use of policy p1 to the
   use of policy p2 and has valid certificates that were issued under
   each of the policies.  A CA may indicate this by including two policy
   mappings in the CA certificates that it issues.  Each policy mapping
   would have an issuerDomainPolicy of p1; one policy mapping would have
   a subjectDomainPolicy of p1 and the other would have a
   subjectDomainPolicy of p2.

   This extension MAY be supported by CAs and/or applications.
   Conforming CAs SHOULD mark this extension as critical.

   id-ce-policyMappings OBJECT IDENTIFIER ::=  { id-ce 33 }

   PolicyMappings ::= SEQUENCE SIZE (1..MAX) OF SEQUENCE {
        issuerDomainPolicy      CertPolicyId,
        subjectDomainPolicy     CertPolicyId }
```

#### 15.1.1.2.4.2.1.6. Subject Alternative Name

```text
   The subject alternative name extension allows identities to be bound
   to the subject of the certificate.  These identities may be included
   in addition to or in place of the identity in the subject field of
   the certificate.  Defined options include an Internet electronic mail



Cooper, et al.              Standards Track                    [Page 35]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   address, a DNS name, an IP address, and a Uniform Resource Identifier
   (URI).  Other options exist, including completely local definitions.
   Multiple name forms, and multiple instances of each name form, MAY be
   included.  Whenever such identities are to be bound into a
   certificate, the subject alternative name (or issuer alternative
   name) extension MUST be used; however, a DNS name MAY also be
   represented in the subject field using the domainComponent attribute
   as described in Section 15.1.1.2.4.1.2.4.  Note that where such names are
   represented in the subject field implementations are not required to
   convert them into DNS names.

   Because the subject alternative name is considered to be definitively
   bound to the public key, all parts of the subject alternative name
   MUST be verified by the CA.

   Further, if the only subject identity included in the certificate is
   an alternative name form (e.g., an electronic mail address), then the
   subject distinguished name MUST be empty (an empty sequence), and the
   subjectAltName extension MUST be present.  If the subject field
   contains an empty sequence, then the issuing CA MUST include a
   subjectAltName extension that is marked as critical.  When including
   the subjectAltName extension in a certificate that has a non-empty
   subject distinguished name, conforming CAs SHOULD mark the
   subjectAltName extension as non-critical.

   When the subjectAltName extension contains an Internet mail address,
   the address MUST be stored in the rfc822Name.  The format of an
   rfc822Name is a "Mailbox" as defined in Section 15.1.1.2.4.1.2 of [RFC2821].
   A Mailbox has the form "Local-part@Domain".  Note that a Mailbox has
   no phrase (such as a common name) before it, has no comment (text
   surrounded in parentheses) after it, and is not surrounded by "<" and
   ">".  Rules for encoding Internet mail addresses that include
   internationalized domain names are specified in Section 15.1.1.2.7.5.

   When the subjectAltName extension contains an iPAddress, the address
   MUST be stored in the octet string in "network byte order", as
   specified in [RFC791].  The least significant bit (LSB) of each octet
   is the LSB of the corresponding byte in the network address.  For IP
   version 4, as specified in [RFC791], the octet string MUST contain
   exactly four octets.  For IP version 6, as specified in
   [RFC2460], the octet string MUST contain exactly sixteen octets.

   When the subjectAltName extension contains a domain name system
   label, the domain name MUST be stored in the dNSName (an IA5String).
   The name MUST be in the "preferred name syntax", as specified by
   Section 15.1.1.2.3.5 of [RFC1034] and as modified by Section 15.1.1.2.2.1 of
   [RFC1123].  Note that while uppercase and lowercase letters are
   allowed in domain names, no significance is attached to the case.  In



Cooper, et al.              Standards Track                    [Page 36]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   addition, while the string " " is a legal domain name, subjectAltName
   extensions with a dNSName of " " MUST NOT be used.  Finally, the use
   of the DNS representation for Internet mail addresses
   (subscriber.example.com instead of subscriber@example.com) MUST NOT
   be used; such identities are to be encoded as rfc822Name.  Rules for
   encoding internationalized domain names are specified in Section 15.1.1.2.7.2.

   When the subjectAltName extension contains a URI, the name MUST be
   stored in the uniformResourceIdentifier (an IA5String).  The name
   MUST NOT be a relative URI, and it MUST follow the URI syntax and
   encoding rules specified in [RFC3986].  The name MUST include both a
   scheme (e.g., "http" or "ftp") and a scheme-specific-part.  URIs that
   include an authority ([RFC3986], Section 15.1.1.2.3.2) MUST include a fully
   qualified domain name or IP address as the host.  Rules for encoding
   Internationalized Resource Identifiers (IRIs) are specified in
   Section 15.1.1.2.7.4.

   As specified in [RFC3986], the scheme name is not case-sensitive
   (e.g., "http" is equivalent to "HTTP").  The host part, if present,
   is also not case-sensitive, but other components of the scheme-
   specific-part may be case-sensitive.  Rules for comparing URIs are
   specified in Section 15.1.1.2.7.4.

   When the subjectAltName extension contains a DN in the directoryName,
   the encoding rules are the same as those specified for the issuer
   field in Section 15.1.1.2.4.1.2.4.  The DN MUST be unique for each subject
   entity certified by the one CA as defined by the issuer field.  A CA
   MAY issue more than one certificate with the same DN to the same
   subject entity.

   The subjectAltName MAY carry additional name types through the use of
   the otherName field.  The format and semantics of the name are
   indicated through the OBJECT IDENTIFIER in the type-id field.  The
   name itself is conveyed as value field in otherName.  For example,
   Kerberos [RFC4120] format names can be encoded into the otherName,
   using a Kerberos 5 principal name OID and a SEQUENCE of the Realm and
   the PrincipalName.

   Subject alternative names MAY be constrained in the same manner as
   subject distinguished names using the name constraints extension as
   described in Section 15.1.1.2.4.2.1.10.

   If the subjectAltName extension is present, the sequence MUST contain
   at least one entry.  Unlike the subject field, conforming CAs MUST
   NOT issue certificates with subjectAltNames containing empty
   GeneralName fields.  For example, an rfc822Name is represented as an
   IA5String.  While an empty string is a valid IA5String, such an
   rfc822Name is not permitted by this profile.  The behavior of clients



Cooper, et al.              Standards Track                    [Page 37]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   that encounter such a certificate when processing a certification
   path is not defined by this profile.

   Finally, the semantics of subject alternative names that include
   wildcard characters (e.g., as a placeholder for a set of names) are
   not addressed by this specification.  Applications with specific
   requirements MAY use such names, but they must define the semantics.

   id-ce-subjectAltName OBJECT IDENTIFIER ::=  { id-ce 17 }

   SubjectAltName ::= GeneralNames

   GeneralNames ::= SEQUENCE SIZE (1..MAX) OF GeneralName

   GeneralName ::= CHOICE {
        otherName                       [0]     OtherName,
        rfc822Name                      [1]     IA5String,
        dNSName                         [2]     IA5String,
        x400Address                     [3]     ORAddress,
        directoryName                   [4]     Name,
        ediPartyName                    [5]     EDIPartyName,
        uniformResourceIdentifier       [6]     IA5String,
        iPAddress                       [7]     OCTET STRING,
        registeredID                    [8]     OBJECT IDENTIFIER }

   OtherName ::= SEQUENCE {
        type-id    OBJECT IDENTIFIER,
        value      [0] EXPLICIT ANY DEFINED BY type-id }

   EDIPartyName ::= SEQUENCE {
        nameAssigner            [0]     DirectoryString OPTIONAL,
        partyName               [1]     DirectoryString }
```

#### 15.1.1.2.4.2.1.7. Issuer Alternative Name

```text
   As with Section 15.1.1.2.4.2.1.6, this extension is used to associate Internet
   style identities with the certificate issuer.  Issuer alternative
   name MUST be encoded as in 15.1.1.2.4.2.1.6.  Issuer alternative names are not
   processed as part of the certification path validation algorithm in
   Section 15.1.1.2.6.  (That is, issuer alternative names are not used in name
   chaining and name constraints are not enforced.)

   Where present, conforming CAs SHOULD mark this extension as non-
   critical.

   id-ce-issuerAltName OBJECT IDENTIFIER ::=  { id-ce 18 }

   IssuerAltName ::= GeneralNames



Cooper, et al.              Standards Track                    [Page 38]

RFC 5280            PKIX Certificate and CRL Profile            May 2008
```

#### 15.1.1.2.4.2.1.8. Subject Directory Attributes

```text
   The subject directory attributes extension is used to convey
   identification attributes (e.g., nationality) of the subject.  The
   extension is defined as a sequence of one or more attributes.
   Conforming CAs MUST mark this extension as non-critical.

   id-ce-subjectDirectoryAttributes OBJECT IDENTIFIER ::=  { id-ce 9 }

   SubjectDirectoryAttributes ::= SEQUENCE SIZE (1..MAX) OF Attribute
```

#### 15.1.1.2.4.2.1.9. Basic Constraints

```text
   The basic constraints extension identifies whether the subject of the
   certificate is a CA and the maximum depth of valid certification
   paths that include this certificate.

   The cA boolean indicates whether the certified public key may be used
   to verify certificate signatures.  If the cA boolean is not asserted,
   then the keyCertSign bit in the key usage extension MUST NOT be
   asserted.  If the basic constraints extension is not present in a
   version 3 certificate, or the extension is present but the cA boolean
   is not asserted, then the certified public key MUST NOT be used to
   verify certificate signatures.

   The pathLenConstraint field is meaningful only if the cA boolean is
   asserted and the key usage extension, if present, asserts the
   keyCertSign bit (Section 15.1.1.2.4.2.1.3).  In this case, it gives the
   maximum number of non-self-issued intermediate certificates that may
   follow this certificate in a valid certification path.  (Note: The
   last certificate in the certification path is not an intermediate
   certificate, and is not included in this limit.  Usually, the last
   certificate is an end entity certificate, but it can be a CA
   certificate.)  A pathLenConstraint of zero indicates that no non-
   self-issued intermediate CA certificates may follow in a valid
   certification path.  Where it appears, the pathLenConstraint field
   MUST be greater than or equal to zero.  Where pathLenConstraint does
   not appear, no limit is imposed.

   Conforming CAs MUST include this extension in all CA certificates
   that contain public keys used to validate digital signatures on
   certificates and MUST mark the extension as critical in such
   certificates.  This extension MAY appear as a critical or non-
   critical extension in CA certificates that contain public keys used
   exclusively for purposes other than validating digital signatures on
   certificates.  Such CA certificates include ones that contain public
   keys used exclusively for validating digital signatures on CRLs and
   ones that contain key management public keys used with certificate



Cooper, et al.              Standards Track                    [Page 39]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   enrollment protocols.  This extension MAY appear as a critical or
   non-critical extension in end entity certificates.

   CAs MUST NOT include the pathLenConstraint field unless the cA
   boolean is asserted and the key usage extension asserts the
   keyCertSign bit.

   id-ce-basicConstraints OBJECT IDENTIFIER ::=  { id-ce 19 }

   BasicConstraints ::= SEQUENCE {
        cA                      BOOLEAN DEFAULT FALSE,
        pathLenConstraint       INTEGER (0..MAX) OPTIONAL }
```

#### 15.1.1.2.4.2.1.10. Name Constraints

```text
   The name constraints extension, which MUST be used only in a CA
   certificate, indicates a name space within which all subject names in
   subsequent certificates in a certification path MUST be located.
   Restrictions apply to the subject distinguished name and apply to
   subject alternative names.  Restrictions apply only when the
   specified name form is present.  If no name of the type is in the
   certificate, the certificate is acceptable.

   Name constraints are not applied to self-issued certificates (unless
   the certificate is the final certificate in the path).  (This could
   prevent CAs that use name constraints from employing self-issued
   certificates to implement key rollover.)

   Restrictions are defined in terms of permitted or excluded name
   subtrees.  Any name matching a restriction in the excludedSubtrees
   field is invalid regardless of information appearing in the
   permittedSubtrees.  Conforming CAs MUST mark this extension as
   critical and SHOULD NOT impose name constraints on the x400Address,
   ediPartyName, or registeredID name forms.  Conforming CAs MUST NOT
   issue certificates where name constraints is an empty sequence.  That
   is, either the permittedSubtrees field or the excludedSubtrees MUST
   be present.

   Applications conforming to this profile MUST be able to process name
   constraints that are imposed on the directoryName name form and
   SHOULD be able to process name constraints that are imposed on the
   rfc822Name, uniformResourceIdentifier, dNSName, and iPAddress name
   forms.  If a name constraints extension that is marked as critical
   imposes constraints on a particular name form, and an instance of
   that name form appears in the subject field or subjectAltName
   extension of a subsequent certificate, then the application MUST
   either process the constraint or reject the certificate.




Cooper, et al.              Standards Track                    [Page 40]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   Within this profile, the minimum and maximum fields are not used with
   any name forms, thus, the minimum MUST be zero, and maximum MUST be
   absent.  However, if an application encounters a critical name
   constraints extension that specifies other values for minimum or
   maximum for a name form that appears in a subsequent certificate, the
   application MUST either process these fields or reject the
   certificate.

   For URIs, the constraint applies to the host part of the name.  The
   constraint MUST be specified as a fully qualified domain name and MAY
   specify a host or a domain.  Examples would be "host.example.com" and
   ".example.com".  When the constraint begins with a period, it MAY be
   expanded with one or more labels.  That is, the constraint
   ".example.com" is satisfied by both host.example.com and
   my.host.example.com.  However, the constraint ".example.com" is not
   satisfied by "example.com".  When the constraint does not begin with
   a period, it specifies a host.  If a constraint is applied to the
   uniformResourceIdentifier name form and a subsequent certificate
   includes a subjectAltName extension with a uniformResourceIdentifier
   that does not include an authority component with a host name
   specified as a fully qualified domain name (e.g., if the URI either
   does not include an authority component or includes an authority
   component in which the host name is specified as an IP address), then
   the application MUST reject the certificate.

   A name constraint for Internet mail addresses MAY specify a
   particular mailbox, all addresses at a particular host, or all
   mailboxes in a domain.  To indicate a particular mailbox, the
   constraint is the complete mail address.  For example,
   "root@example.com" indicates the root mailbox on the host
   "example.com".  To indicate all Internet mail addresses on a
   particular host, the constraint is specified as the host name.  For
   example, the constraint "example.com" is satisfied by any mail
   address at the host "example.com".  To specify any address within a
   domain, the constraint is specified with a leading period (as with
   URIs).  For example, ".example.com" indicates all the Internet mail
   addresses in the domain "example.com", but not Internet mail
   addresses on the host "example.com".

   DNS name restrictions are expressed as host.example.com.  Any DNS
   name that can be constructed by simply adding zero or more labels to
   the left-hand side of the name satisfies the name constraint.  For
   example, www.host.example.com would satisfy the constraint but
   host1.example.com would not.

   Legacy implementations exist where an electronic mail address is
   embedded in the subject distinguished name in an attribute of type
   emailAddress (Section 15.1.1.2.4.1.2.6).  When constraints are imposed on the



Cooper, et al.              Standards Track                    [Page 41]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   rfc822Name name form, but the certificate does not include a subject
   alternative name, the rfc822Name constraint MUST be applied to the
   attribute of type emailAddress in the subject distinguished name.
   The ASN.1 syntax for emailAddress and the corresponding OID are
   supplied in Appendix A.

   Restrictions of the form directoryName MUST be applied to the subject
   field in the certificate (when the certificate includes a non-empty
   subject field) and to any names of type directoryName in the
   subjectAltName extension.  Restrictions of the form x400Address MUST
   be applied to any names of type x400Address in the subjectAltName
   extension.

   When applying restrictions of the form directoryName, an
   implementation MUST compare DN attributes.  At a minimum,
   implementations MUST perform the DN comparison rules specified in
   Section 15.1.1.2.7.1.  CAs issuing certificates with a restriction of the form
   directoryName SHOULD NOT rely on implementation of the full ISO DN
   name comparison algorithm.  This implies name restrictions MUST be
   stated identically to the encoding used in the subject field or
   subjectAltName extension.

   The syntax of iPAddress MUST be as described in Section 15.1.1.2.4.2.1.6 with
   the following additions specifically for name constraints.  For IPv4
   addresses, the iPAddress field of GeneralName MUST contain eight (8)
   octets, encoded in the style of RFC 4632 (CIDR) to represent an
   address range [RFC4632].  For IPv6 addresses, the iPAddress field
   MUST contain 32 octets similarly encoded.  For example, a name
   constraint for "class C" subnet 15.1.1.2.192.0.2.0 is represented as the
   octets C0 00 02 00 FF FF FF 00, representing the CIDR notation
   192.0.2.0/24 (mask 255.255.255.0).

   Additional rules for encoding and processing name constraints are
   specified in Section 15.1.1.2.7.

   The syntax and semantics for name constraints for otherName,
   ediPartyName, and registeredID are not defined by this specification,
   however, syntax and semantics for name constraints for other name
   forms may be specified in other documents.

      id-ce-nameConstraints OBJECT IDENTIFIER ::=  { id-ce 30 }

      NameConstraints ::= SEQUENCE {
           permittedSubtrees       [0]     GeneralSubtrees OPTIONAL,
           excludedSubtrees        [1]     GeneralSubtrees OPTIONAL }

      GeneralSubtrees ::= SEQUENCE SIZE (1..MAX) OF GeneralSubtree




Cooper, et al.              Standards Track                    [Page 42]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


      GeneralSubtree ::= SEQUENCE {
           base                    GeneralName,
           minimum         [0]     BaseDistance DEFAULT 0,
           maximum         [1]     BaseDistance OPTIONAL }

      BaseDistance ::= INTEGER (0..MAX)
```

#### 15.1.1.2.4.2.1.11. Policy Constraints

```text
   The policy constraints extension can be used in certificates issued
   to CAs.  The policy constraints extension constrains path validation
   in two ways.  It can be used to prohibit policy mapping or require
   that each certificate in a path contain an acceptable policy
   identifier.

   If the inhibitPolicyMapping field is present, the value indicates the
   number of additional certificates that may appear in the path before
   policy mapping is no longer permitted.  For example, a value of one
   indicates that policy mapping may be processed in certificates issued
   by the subject of this certificate, but not in additional
   certificates in the path.

   If the requireExplicitPolicy field is present, the value of
   requireExplicitPolicy indicates the number of additional certificates
   that may appear in the path before an explicit policy is required for
   the entire path.  When an explicit policy is required, it is
   necessary for all certificates in the path to contain an acceptable
   policy identifier in the certificate policies extension.  An
   acceptable policy identifier is the identifier of a policy required
   by the user of the certification path or the identifier of a policy
   that has been declared equivalent through policy mapping.

   Conforming applications MUST be able to process the
   requireExplicitPolicy field and SHOULD be able to process the
   inhibitPolicyMapping field.  Applications that support the
   inhibitPolicyMapping field MUST also implement support for the
   policyMappings extension.  If the policyConstraints extension is
   marked as critical and the inhibitPolicyMapping field is present,
   applications that do not implement support for the
   inhibitPolicyMapping field MUST reject the certificate.

   Conforming CAs MUST NOT issue certificates where policy constraints
   is an empty sequence.  That is, either the inhibitPolicyMapping field
   or the requireExplicitPolicy field MUST be present.  The behavior of
   clients that encounter an empty policy constraints field is not
   addressed in this profile.

   Conforming CAs MUST mark this extension as critical.



Cooper, et al.              Standards Track                    [Page 43]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   id-ce-policyConstraints OBJECT IDENTIFIER ::=  { id-ce 36 }

   PolicyConstraints ::= SEQUENCE {
        requireExplicitPolicy           [0] SkipCerts OPTIONAL,
        inhibitPolicyMapping            [1] SkipCerts OPTIONAL }

   SkipCerts ::= INTEGER (0..MAX)
```

#### 15.1.1.2.4.2.1.12. Extended Key Usage

```text
   This extension indicates one or more purposes for which the certified
   public key may be used, in addition to or in place of the basic
   purposes indicated in the key usage extension.  In general, this
   extension will appear only in end entity certificates.  This
   extension is defined as follows:

   id-ce-extKeyUsage OBJECT IDENTIFIER ::= { id-ce 37 }

   ExtKeyUsageSyntax ::= SEQUENCE SIZE (1..MAX) OF KeyPurposeId

   KeyPurposeId ::= OBJECT IDENTIFIER

   Key purposes may be defined by any organization with a need.  Object
   identifiers used to identify key purposes MUST be assigned in
   accordance with IANA or ITU-T Recommendation X.660 [X.660].

   This extension MAY, at the option of the certificate issuer, be
   either critical or non-critical.

   If the extension is present, then the certificate MUST only be used
   for one of the purposes indicated.  If multiple purposes are
   indicated the application need not recognize all purposes indicated,
   as long as the intended purpose is present.  Certificate using
   applications MAY require that the extended key usage extension be
   present and that a particular purpose be indicated in order for the
   certificate to be acceptable to that application.

   If a CA includes extended key usages to satisfy such applications,
   but does not wish to restrict usages of the key, the CA can include
   the special KeyPurposeId anyExtendedKeyUsage in addition to the
   particular key purposes required by the applications.  Conforming CAs
   SHOULD NOT mark this extension as critical if the anyExtendedKeyUsage
   KeyPurposeId is present.  Applications that require the presence of a
   particular purpose MAY reject certificates that include the
   anyExtendedKeyUsage OID but not the particular OID expected for the
   application.





Cooper, et al.              Standards Track                    [Page 44]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   If a certificate contains both a key usage extension and an extended
   key usage extension, then both extensions MUST be processed
   independently and the certificate MUST only be used for a purpose
   consistent with both extensions.  If there is no purpose consistent
   with both extensions, then the certificate MUST NOT be used for any
   purpose.

   The following key usage purposes are defined:

   anyExtendedKeyUsage OBJECT IDENTIFIER ::= { id-ce-extKeyUsage 0 }

   id-kp OBJECT IDENTIFIER ::= { id-pkix 3 }

   id-kp-serverAuth             OBJECT IDENTIFIER ::= { id-kp 1 }
   -- TLS WWW server authentication
   -- Key usage bits that may be consistent: digitalSignature,
   -- keyEncipherment or keyAgreement

   id-kp-clientAuth             OBJECT IDENTIFIER ::= { id-kp 2 }
   -- TLS WWW client authentication
   -- Key usage bits that may be consistent: digitalSignature
   -- and/or keyAgreement

   id-kp-codeSigning             OBJECT IDENTIFIER ::= { id-kp 3 }
   -- Signing of downloadable executable code
   -- Key usage bits that may be consistent: digitalSignature

   id-kp-emailProtection         OBJECT IDENTIFIER ::= { id-kp 4 }
   -- Email protection
   -- Key usage bits that may be consistent: digitalSignature,
   -- nonRepudiation, and/or (keyEncipherment or keyAgreement)

   id-kp-timeStamping            OBJECT IDENTIFIER ::= { id-kp 8 }
   -- Binding the hash of an object to a time
   -- Key usage bits that may be consistent: digitalSignature
   -- and/or nonRepudiation

   id-kp-OCSPSigning            OBJECT IDENTIFIER ::= { id-kp 9 }
   -- Signing OCSP responses
   -- Key usage bits that may be consistent: digitalSignature
   -- and/or nonRepudiation
```

#### 15.1.1.2.4.2.1.13. CRL Distribution Points

```text
   The CRL distribution points extension identifies how CRL information
   is obtained.  The extension SHOULD be non-critical, but this profile
   RECOMMENDS support for this extension by CAs and applications.
   Further discussion of CRL management is contained in Section 15.1.1.2.5.



Cooper, et al.              Standards Track                    [Page 45]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   The cRLDistributionPoints extension is a SEQUENCE of
   DistributionPoint.  A DistributionPoint consists of three fields,
   each of which is optional: distributionPoint, reasons, and cRLIssuer.
   While each of these fields is optional, a DistributionPoint MUST NOT
   consist of only the reasons field; either distributionPoint or
   cRLIssuer MUST be present.  If the certificate issuer is not the CRL
   issuer, then the cRLIssuer field MUST be present and contain the Name
   of the CRL issuer.  If the certificate issuer is also the CRL issuer,
   then conforming CAs MUST omit the cRLIssuer field and MUST include
   the distributionPoint field.

   When the distributionPoint field is present, it contains either a
   SEQUENCE of general names or a single value, nameRelativeToCRLIssuer.
   If the DistributionPointName contains multiple values, each name
   describes a different mechanism to obtain the same CRL.  For example,
   the same CRL could be available for retrieval through both LDAP and
   HTTP.

   If the distributionPoint field contains a directoryName, the entry
   for that directoryName contains the current CRL for the associated
   reasons and the CRL is issued by the associated cRLIssuer.  The CRL
   may be stored in either the certificateRevocationList or
   authorityRevocationList attribute.  The CRL is to be obtained by the
   application from whatever directory server is locally configured.
   The protocol the application uses to access the directory (e.g., DAP
   or LDAP) is a local matter.

   If the DistributionPointName contains a general name of type URI, the
   following semantics MUST be assumed: the URI is a pointer to the
   current CRL for the associated reasons and will be issued by the
   associated cRLIssuer.  When the HTTP or FTP URI scheme is used, the
   URI MUST point to a single DER encoded CRL as specified in
   [RFC2585].  HTTP server implementations accessed via the URI SHOULD
   specify the media type application/pkix-crl in the content-type
   header field of the response.  When the LDAP URI scheme [RFC4516] is
   used, the URI MUST include a <dn> field containing the distinguished
   name of the entry holding the CRL, MUST include a single <attrdesc>
   that contains an appropriate attribute description for the attribute
   that holds the CRL [RFC4523], and SHOULD include a <host>
   (e.g., <ldap://ldap.example.com/cn=example%20CA,dc=example,dc=com?
   certificateRevocationList;binary>).  Omitting the <host> (e.g.,
   <ldap:///cn=CA,dc=example,dc=com?authorityRevocationList;binary>) has
   the effect of relying on whatever a priori knowledge the client might
   have to contact an appropriate server.  When present,
   DistributionPointName SHOULD include at least one LDAP or HTTP URI.

   If the DistributionPointName contains the single value
   nameRelativeToCRLIssuer, the value provides a distinguished name



Cooper, et al.              Standards Track                    [Page 46]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   fragment.  The fragment is appended to the X.500 distinguished name
   of the CRL issuer to obtain the distribution point name.  If the
   cRLIssuer field in the DistributionPoint is present, then the name
   fragment is appended to the distinguished name that it contains;
   otherwise, the name fragment is appended to the certificate issuer
   distinguished name.  Conforming CAs SHOULD NOT use
   nameRelativeToCRLIssuer to specify distribution point names.  The
   DistributionPointName MUST NOT use the nameRelativeToCRLIssuer
   alternative when cRLIssuer contains more than one distinguished name.

   If the DistributionPoint omits the reasons field, the CRL MUST
   include revocation information for all reasons.  This profile
   RECOMMENDS against segmenting CRLs by reason code.  When a conforming
   CA includes a cRLDistributionPoints extension in a certificate, it
   MUST include at least one DistributionPoint that points to a CRL that
   covers the certificate for all reasons.

   The cRLIssuer identifies the entity that signs and issues the CRL.
   If present, the cRLIssuer MUST only contain the distinguished name
   (DN) from the issuer field of the CRL to which the DistributionPoint
   is pointing.  The encoding of the name in the cRLIssuer field MUST be
   exactly the same as the encoding in issuer field of the CRL.  If the
   cRLIssuer field is included and the DN in that field does not
   correspond to an X.500 or LDAP directory entry where CRL is located,
   then conforming CAs MUST include the distributionPoint field.

   id-ce-cRLDistributionPoints OBJECT IDENTIFIER ::=  { id-ce 31 }

   CRLDistributionPoints ::= SEQUENCE SIZE (1..MAX) OF DistributionPoint

   DistributionPoint ::= SEQUENCE {
        distributionPoint       [0]     DistributionPointName OPTIONAL,
        reasons                 [1]     ReasonFlags OPTIONAL,
        cRLIssuer               [2]     GeneralNames OPTIONAL }

   DistributionPointName ::= CHOICE {
        fullName                [0]     GeneralNames,
        nameRelativeToCRLIssuer [1]     RelativeDistinguishedName }













Cooper, et al.              Standards Track                    [Page 47]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   ReasonFlags ::= BIT STRING {
        unused                  (0),
        keyCompromise           (1),
        cACompromise            (2),
        affiliationChanged      (3),
        superseded              (4),
        cessationOfOperation    (5),
        certificateHold         (6),
        privilegeWithdrawn      (7),
        aACompromise            (8) }
```

#### 15.1.1.2.4.2.1.14. Inhibit anyPolicy

```text
   The inhibit anyPolicy extension can be used in certificates issued to
   CAs.  The inhibit anyPolicy extension indicates that the special
   anyPolicy OID, with the value { 2 5 29 32 0 }, is not considered an
   explicit match for other certificate policies except when it appears
   in an intermediate self-issued CA certificate.  The value indicates
   the number of additional non-self-issued certificates that may appear
   in the path before anyPolicy is no longer permitted.  For example, a
   value of one indicates that anyPolicy may be processed in
   certificates issued by the subject of this certificate, but not in
   additional certificates in the path.

   Conforming CAs MUST mark this extension as critical.

   id-ce-inhibitAnyPolicy OBJECT IDENTIFIER ::=  { id-ce 54 }

   InhibitAnyPolicy ::= SkipCerts

   SkipCerts ::= INTEGER (0..MAX)
```

#### 15.1.1.2.4.2.1.15. Freshest CRL (a.k.a. Delta CRL Distribution Point)

```text
   The freshest CRL extension identifies how delta CRL information is
   obtained.  The extension MUST be marked as non-critical by conforming
   CAs.  Further discussion of CRL management is contained in Section 15.1.1.2.5.

   The same syntax is used for this extension and the
   cRLDistributionPoints extension, and is described in Section
```

#### 15.1.1.2.4.2.1.13. The same conventions apply to both extensions.

```text
   id-ce-freshestCRL OBJECT IDENTIFIER ::=  { id-ce 46 }

   FreshestCRL ::= CRLDistributionPoints






Cooper, et al.              Standards Track                    [Page 48]

RFC 5280            PKIX Certificate and CRL Profile            May 2008
```

#### 15.1.1.2.4.2.2. Private Internet Extensions

```text
   This section defines two extensions for use in the Internet Public
   Key Infrastructure.  These extensions may be used to direct
   applications to on-line information about the issuer or the subject.
   Each extension contains a sequence of access methods and access
   locations.  The access method is an object identifier that indicates
   the type of information that is available.  The access location is a
   GeneralName that implicitly specifies the location and format of the
   information and the method for obtaining the information.

   Object identifiers are defined for the private extensions.  The
   object identifiers associated with the private extensions are defined
   under the arc id-pe within the arc id-pkix.  Any future extensions
   defined for the Internet PKI are also expected to be defined under
   the arc id-pe.

      id-pkix  OBJECT IDENTIFIER  ::=
               { iso(1) identified-organization(3) dod(6) internet(1)
                       security(5) mechanisms(5) pkix(7) }

      id-pe  OBJECT IDENTIFIER  ::=  { id-pkix 1 }
```

#### 15.1.1.2.4.2.2.1. Authority Information Access

```text
   The authority information access extension indicates how to access
   information and services for the issuer of the certificate in which
   the extension appears.  Information and services may include on-line
   validation services and CA policy data.  (The location of CRLs is not
   specified in this extension; that information is provided by the
   cRLDistributionPoints extension.)  This extension may be included in
   end entity or CA certificates.  Conforming CAs MUST mark this
   extension as non-critical.

   id-pe-authorityInfoAccess OBJECT IDENTIFIER ::= { id-pe 1 }

   AuthorityInfoAccessSyntax  ::=
           SEQUENCE SIZE (1..MAX) OF AccessDescription

   AccessDescription  ::=  SEQUENCE {
           accessMethod          OBJECT IDENTIFIER,
           accessLocation        GeneralName  }

   id-ad OBJECT IDENTIFIER ::= { id-pkix 48 }

   id-ad-caIssuers OBJECT IDENTIFIER ::= { id-ad 2 }

   id-ad-ocsp OBJECT IDENTIFIER ::= { id-ad 1 }



Cooper, et al.              Standards Track                    [Page 49]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   Each entry in the sequence AuthorityInfoAccessSyntax describes the
   format and location of additional information provided by the issuer
   of the certificate in which this extension appears.  The type and
   format of the information are specified by the accessMethod field;
   the accessLocation field specifies the location of the information.
   The retrieval mechanism may be implied by the accessMethod or
   specified by accessLocation.

   This profile defines two accessMethod OIDs: id-ad-caIssuers and
   id-ad-ocsp.

   In a public key certificate, the id-ad-caIssuers OID is used when the
   additional information lists certificates that were issued to the CA
   that issued the certificate containing this extension.  The
   referenced CA issuers description is intended to aid certificate
   users in the selection of a certification path that terminates at a
   point trusted by the certificate user.

   When id-ad-caIssuers appears as accessMethod, the accessLocation
   field describes the referenced description server and the access
   protocol to obtain the referenced description.  The accessLocation
   field is defined as a GeneralName, which can take several forms.

   When the accessLocation is a directoryName, the information is to be
   obtained by the application from whatever directory server is locally
   configured.  The entry for the directoryName contains CA certificates
   in the crossCertificatePair and/or cACertificate attributes as
   specified in [RFC4523].  The protocol that application uses to access
   the directory (e.g., DAP or LDAP) is a local matter.

   Where the information is available via LDAP, the accessLocation
   SHOULD be a uniformResourceIdentifier.  The LDAP URI [RFC4516] MUST
   include a <dn> field containing the distinguished name of the entry
   holding the certificates, MUST include an <attributes> field that
   lists appropriate attribute descriptions for the attributes that hold
   the DER encoded certificates or cross-certificate pairs [RFC4523],
   and SHOULD include a <host> (e.g., <ldap://ldap.example.com/cn=CA,
   dc=example,dc=com?cACertificate;binary,crossCertificatePair;binary>).
   Omitting the <host> (e.g., <ldap:///cn=exampleCA,dc=example,dc=com?
   cACertificate;binary>) has the effect of relying on whatever a priori
   knowledge the client might have to contact an appropriate server.

   Where the information is available via HTTP or FTP, accessLocation
   MUST be a uniformResourceIdentifier and the URI MUST point to either
   a single DER encoded certificate as specified in [RFC2585] or a
   collection of certificates in a BER or DER encoded "certs-only" CMS
   message as specified in [RFC2797].




Cooper, et al.              Standards Track                    [Page 50]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   Conforming applications that support HTTP or FTP for accessing
   certificates MUST be able to accept individual DER encoded
   certificates and SHOULD be able to accept "certs-only" CMS messages.

   HTTP server implementations accessed via the URI SHOULD specify the
   media type application/pkix-cert [RFC2585] in the content-type header
   field of the response for a single DER encoded certificate and SHOULD
   specify the media type application/pkcs7-mime [RFC2797] in the
   content-type header field of the response for "certs-only" CMS
   messages.  For FTP, the name of a file that contains a single DER
   encoded certificate SHOULD have a suffix of ".cer" [RFC2585] and the
   name of a file that contains a "certs-only" CMS message SHOULD have a
   suffix of ".p7c" [RFC2797].  Consuming clients may use the media type
   or file extension as a hint to the content, but should not depend
   solely on the presence of the correct media type or file extension in
   the server response.

   The semantics of other id-ad-caIssuers accessLocation name forms are
   not defined.

   An authorityInfoAccess extension may include multiple instances of
   the id-ad-caIssuers accessMethod.  The different instances may
   specify different methods for accessing the same information or may
   point to different information.  When the id-ad-caIssuers
   accessMethod is used, at least one instance SHOULD specify an
   accessLocation that is an HTTP [RFC2616] or LDAP [RFC4516] URI.

   The id-ad-ocsp OID is used when revocation information for the
   certificate containing this extension is available using the Online
   Certificate Status Protocol (OCSP) [RFC2560].

   When id-ad-ocsp appears as accessMethod, the accessLocation field is
   the location of the OCSP responder, using the conventions defined in
   [RFC2560].

   Additional access descriptors may be defined in other PKIX
   specifications.
```

#### 15.1.1.2.4.2.2.2. Subject Information Access

```text
   The subject information access extension indicates how to access
   information and services for the subject of the certificate in which
   the extension appears.  When the subject is a CA, information and
   services may include certificate validation services and CA policy
   data.  When the subject is an end entity, the information describes
   the type of services offered and how to access them.  In this case,
   the contents of this extension are defined in the protocol




Cooper, et al.              Standards Track                    [Page 51]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   specifications for the supported services.  This extension may be
   included in end entity or CA certificates.  Conforming CAs MUST mark
   this extension as non-critical.

   id-pe-subjectInfoAccess OBJECT IDENTIFIER ::= { id-pe 11 }

   SubjectInfoAccessSyntax  ::=
           SEQUENCE SIZE (1..MAX) OF AccessDescription

   AccessDescription  ::=  SEQUENCE {
           accessMethod          OBJECT IDENTIFIER,
           accessLocation        GeneralName  }

   Each entry in the sequence SubjectInfoAccessSyntax describes the
   format and location of additional information provided by the subject
   of the certificate in which this extension appears.  The type and
   format of the information are specified by the accessMethod field;
   the accessLocation field specifies the location of the information.
   The retrieval mechanism may be implied by the accessMethod or
   specified by accessLocation.

   This profile defines one access method to be used when the subject is
   a CA and one access method to be used when the subject is an end
   entity.  Additional access methods may be defined in the future in
   the protocol specifications for other services.

   The id-ad-caRepository OID is used when the subject is a CA that
   publishes certificates it issues in a repository.  The accessLocation
   field is defined as a GeneralName, which can take several forms.

   When the accessLocation is a directoryName, the information is to be
   obtained by the application from whatever directory server is locally
   configured.  When the extension is used to point to CA certificates,
   the entry for the directoryName contains CA certificates in the
   crossCertificatePair and/or cACertificate attributes as specified in
   [RFC4523].  The protocol the application uses to access the directory
   (e.g., DAP or LDAP) is a local matter.

   Where the information is available via LDAP, the accessLocation
   SHOULD be a uniformResourceIdentifier.  The LDAP URI [RFC4516] MUST
   include a <dn> field containing the distinguished name of the entry
   holding the certificates, MUST include an <attributes> field that
   lists appropriate attribute descriptions for the attributes that hold
   the DER encoded certificates or cross-certificate pairs [RFC4523],
   and SHOULD include a <host> (e.g., <ldap://ldap.example.com/cn=CA,
   dc=example,dc=com?cACertificate;binary,crossCertificatePair;binary>).





Cooper, et al.              Standards Track                    [Page 52]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   Omitting the <host> (e.g., <ldap:///cn=exampleCA,dc=example,dc=com?
   cACertificate;binary>) has the effect of relying on whatever a priori
   knowledge the client might have to contact an appropriate server.

   Where the information is available via HTTP or FTP, accessLocation
   MUST be a uniformResourceIdentifier and the URI MUST point to either
   a single DER encoded certificate as specified in [RFC2585] or a
   collection of certificates in a BER or DER encoded "certs-only" CMS
   message as specified in [RFC2797].

   Conforming applications that support HTTP or FTP for accessing
   certificates MUST be able to accept individual DER encoded
   certificates and SHOULD be able to accept "certs-only" CMS messages.

   HTTP server implementations accessed via the URI SHOULD specify the
   media type application/pkix-cert [RFC2585] in the content-type header
   field of the response for a single DER encoded certificate and SHOULD
   specify the media type application/pkcs7-mime [RFC2797] in the
   content-type header field of the response for "certs-only" CMS
   messages.  For FTP, the name of a file that contains a single DER
   encoded certificate SHOULD have a suffix of ".cer" [RFC2585] and the
   name of a file that contains a "certs-only" CMS message SHOULD have a
   suffix of ".p7c" [RFC2797].  Consuming clients may use the media type
   or file extension as a hint to the content, but should not depend
   solely on the presence of the correct media type or file extension in
   the server response.

   The semantics of other id-ad-caRepository accessLocation name forms
   are not defined.

   A subjectInfoAccess extension may include multiple instances of the
   id-ad-caRepository accessMethod.  The different instances may specify
   different methods for accessing the same information or may point to
   different information.  When the id-ad-caRepository accessMethod is
   used, at least one instance SHOULD specify an accessLocation that is
   an HTTP [RFC2616] or LDAP [RFC4516] URI.

   The id-ad-timeStamping OID is used when the subject offers
   timestamping services using the Time Stamp Protocol defined in
   [RFC3161].  Where the timestamping services are available via HTTP or
   FTP, accessLocation MUST be a uniformResourceIdentifier.  Where the
   timestamping services are available via electronic mail,
   accessLocation MUST be an rfc822Name.  Where timestamping services
   are available using TCP/IP, the dNSName or iPAddress name forms may
   be used.  The semantics of other name forms of accessLocation (when
   accessMethod is id-ad-timeStamping) are not defined by this
   specification.




Cooper, et al.              Standards Track                    [Page 53]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   Additional access descriptors may be defined in other PKIX
   specifications.

   id-ad OBJECT IDENTIFIER ::= { id-pkix 48 }

   id-ad-caRepository OBJECT IDENTIFIER ::= { id-ad 5 }

   id-ad-timeStamping OBJECT IDENTIFIER ::= { id-ad 3 }
```

#### 15.1.1.2.5. CRL and CRL Extensions Profile

```text
   As discussed above, one goal of this X.509 v2 CRL profile is to
   foster the creation of an interoperable and reusable Internet PKI.
   To achieve this goal, guidelines for the use of extensions are
   specified, and some assumptions are made about the nature of
   information included in the CRL.

   CRLs may be used in a wide range of applications and environments
   covering a broad spectrum of interoperability goals and an even
   broader spectrum of operational and assurance requirements.  This
   profile establishes a common baseline for generic applications
   requiring broad interoperability.  The profile defines a set of
   information that can be expected in every CRL.  Also, the profile
   defines common locations within the CRL for frequently used
   attributes as well as common representations for these attributes.

   CRL issuers issue CRLs.  The CRL issuer is either the CA or an entity
   that has been authorized by the CA to issue CRLs.  CAs publish CRLs
   to provide status information about the certificates they issued.
   However, a CA may delegate this responsibility to another trusted
   authority.

   Each CRL has a particular scope.  The CRL scope is the set of
   certificates that could appear on a given CRL.  For example, the
   scope could be "all certificates issued by CA X", "all CA
   certificates issued by CA X", "all certificates issued by CA X that
   have been revoked for reasons of key compromise and CA compromise",
   or a set of certificates based on arbitrary local information, such
   as "all certificates issued to the NIST employees located in
   Boulder".

   A complete CRL lists all unexpired certificates, within its scope,
   that have been revoked for one of the revocation reasons covered by
   the CRL scope.  A full and complete CRL lists all unexpired
   certificates issued by a CA that have been revoked for any reason.
   (Note that since CAs and CRL issuers are identified by name, the
   scope of a CRL is not affected by the key used to sign the CRL or the
   key(s) used to sign certificates.)



Cooper, et al.              Standards Track                    [Page 54]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   If the scope of the CRL includes one or more certificates issued by
   an entity other than the CRL issuer, then it is an indirect CRL.  The
   scope of an indirect CRL may be limited to certificates issued by a
   single CA or may include certificates issued by multiple CAs.  If the
   issuer of the indirect CRL is a CA, then the scope of the indirect
   CRL MAY also include certificates issued by the issuer of the CRL.

   The CRL issuer MAY also generate delta CRLs.  A delta CRL only lists
   those certificates, within its scope, whose revocation status has
   changed since the issuance of a referenced complete CRL.  The
   referenced complete CRL is referred to as a base CRL.  The scope of a
   delta CRL MUST be the same as the base CRL that it references.

   This profile defines one private Internet CRL extension but does not
   define any private CRL entry extensions.

   Environments with additional or special purpose requirements may
   build on this profile or may replace it.

   Conforming CAs are not required to issue CRLs if other revocation or
   certificate status mechanisms are provided.  When CRLs are issued,
   the CRLs MUST be version 2 CRLs, include the date by which the next
   CRL will be issued in the nextUpdate field (Section 15.1.1.2.5.1.2.5), include
   the CRL number extension (Section 15.1.1.2.5.2.3), and include the authority
   key identifier extension (Section 15.1.1.2.5.2.1).  Conforming applications
   that support CRLs are REQUIRED to process both version 1 and version
   2 complete CRLs that provide revocation information for all
   certificates issued by one CA.  Conforming applications are not
   required to support processing of delta CRLs, indirect CRLs, or CRLs
   with a scope other than all certificates issued by one CA.
```

#### 15.1.1.2.5.1. CRL Fields

```text
   The X.509 v2 CRL syntax is as follows.  For signature calculation,
   the data that is to be signed is ASN.1 DER encoded.  ASN.1 DER
   encoding is a tag, length, value encoding system for each element.















Cooper, et al.              Standards Track                    [Page 55]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   CertificateList  ::=  SEQUENCE  {
        tbsCertList          TBSCertList,
        signatureAlgorithm   AlgorithmIdentifier,
        signatureValue       BIT STRING  }

   TBSCertList  ::=  SEQUENCE  {
        version                 Version OPTIONAL,
                                     -- if present, MUST be v2
        signature               AlgorithmIdentifier,
        issuer                  Name,
        thisUpdate              Time,
        nextUpdate              Time OPTIONAL,
        revokedCertificates     SEQUENCE OF SEQUENCE  {
             userCertificate         CertificateSerialNumber,
             revocationDate          Time,
             crlEntryExtensions      Extensions OPTIONAL
                                      -- if present, version MUST be v2
                                  }  OPTIONAL,
        crlExtensions           [0]  EXPLICIT Extensions OPTIONAL
                                      -- if present, version MUST be v2
                                  }

   -- Version, Time, CertificateSerialNumber, and Extensions
   -- are all defined in the ASN.1 in Section 15.1.1.2.4.1

   -- AlgorithmIdentifier is defined in Section 15.1.1.2.4.1.1.2

   The following items describe the use of the X.509 v2 CRL in the
   Internet PKI.
```

#### 15.1.1.2.5.1.1. CertificateList Fields

```text
   The CertificateList is a SEQUENCE of three required fields.  The
   fields are described in detail in the following subsections.
```

#### 15.1.1.2.5.1.1.1. tbsCertList

```text
   The first field in the sequence is the tbsCertList.  This field is
   itself a sequence containing the name of the issuer, issue date,
   issue date of the next list, the optional list of revoked
   certificates, and optional CRL extensions.  When there are no revoked
   certificates, the revoked certificates list is absent.  When one or
   more certificates are revoked, each entry on the revoked certificate
   list is defined by a sequence of user certificate serial number,
   revocation date, and optional CRL entry extensions.






Cooper, et al.              Standards Track                    [Page 56]

RFC 5280            PKIX Certificate and CRL Profile            May 2008
```

#### 15.1.1.2.5.1.1.2. signatureAlgorithm

```text
   The signatureAlgorithm field contains the algorithm identifier for
   the algorithm used by the CRL issuer to sign the CertificateList.
   The field is of type AlgorithmIdentifier, which is defined in Section
```

#### 15.1.1.2.4.1.1.2. [RFC3279], [RFC4055], and [RFC4491] list supported

```text
   algorithms for this specification, but other signature algorithms MAY
   also be supported.

   This field MUST contain the same algorithm identifier as the
   signature field in the sequence tbsCertList (Section 15.1.1.2.5.1.2.2).
```

#### 15.1.1.2.5.1.1.3. signatureValue

```text
   The signatureValue field contains a digital signature computed upon
   the ASN.1 DER encoded tbsCertList.  The ASN.1 DER encoded tbsCertList
   is used as the input to the signature function.  This signature value
   is encoded as a BIT STRING and included in the CRL signatureValue
   field.  The details of this process are specified for each of the
   supported algorithms in [RFC3279], [RFC4055], and [RFC4491].

   CAs that are also CRL issuers MAY use one private key to digitally
   sign certificates and CRLs, or MAY use separate private keys to
   digitally sign certificates and CRLs.  When separate private keys are
   employed, each of the public keys associated with these private keys
   is placed in a separate certificate, one with the keyCertSign bit set
   in the key usage extension, and one with the cRLSign bit set in the
   key usage extension (Section 15.1.1.2.4.2.1.3).  When separate private keys
   are employed, certificates issued by the CA contain one authority key
   identifier, and the corresponding CRLs contain a different authority
   key identifier.  The use of separate CA certificates for validation
   of certificate signatures and CRL signatures can offer improved
   security characteristics; however, it imposes a burden on
   applications, and it might limit interoperability.  Many applications
   construct a certification path, and then validate the certification
   path (Section 6).  CRL checking in turn requires a separate
   certification path to be constructed and validated for the CA's CRL
   signature validation certificate.  Applications that perform CRL
   checking MUST support certification path validation when certificates
   and CRLs are digitally signed with the same CA private key.  These
   applications SHOULD support certification path validation when
   certificates and CRLs are digitally signed with different CA private
   keys.








Cooper, et al.              Standards Track                    [Page 57]

RFC 5280            PKIX Certificate and CRL Profile            May 2008
```

#### 15.1.1.2.5.1.2. Certificate List "To Be Signed"

```text
   The certificate list to be signed, or TBSCertList, is a sequence of
   required and optional fields.  The required fields identify the CRL
   issuer, the algorithm used to sign the CRL, and the date and time the
   CRL was issued.

   Optional fields include the date and time by which the CRL issuer
   will issue the next CRL, lists of revoked certificates, and CRL
   extensions.  The revoked certificate list is optional to support the
   case where a CA has not revoked any unexpired certificates that it
   has issued.  This profile requires conforming CRL issuers to include
   the nextUpdate field and the CRL number and authority key identifier
   CRL extensions in all CRLs issued.
```

#### 15.1.1.2.5.1.2.1. Version

```text
   This optional field describes the version of the encoded CRL.  When
   extensions are used, as required by this profile, this field MUST be
   present and MUST specify version 2 (the integer value is 1).
```

#### 15.1.1.2.5.1.2.2. Signature

```text
   This field contains the algorithm identifier for the algorithm used
   to sign the CRL.  [RFC3279], [RFC4055], and [RFC4491] list OIDs for
   the most popular signature algorithms used in the Internet PKI.

   This field MUST contain the same algorithm identifier as the
   signatureAlgorithm field in the sequence CertificateList (Section
   15.1.1.2.5.1.1.2).
```

#### 15.1.1.2.5.1.2.3. Issuer Name

```text
   The issuer name identifies the entity that has signed and issued the
   CRL.  The issuer identity is carried in the issuer field.
   Alternative name forms may also appear in the issuerAltName extension
   (Section 15.1.1.2.5.2.2).  The issuer field MUST contain a non-empty X.500
   distinguished name (DN).  The issuer field is defined as the X.501
   type Name, and MUST follow the encoding rules for the issuer name
   field in the certificate (Section 15.1.1.2.4.1.2.4).
```

#### 15.1.1.2.5.1.2.4. This Update

```text
   This field indicates the issue date of this CRL.  thisUpdate may be
   encoded as UTCTime or GeneralizedTime.

   CRL issuers conforming to this profile MUST encode thisUpdate as
   UTCTime for dates through the year 2049.  CRL issuers conforming to



Cooper, et al.              Standards Track                    [Page 58]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   this profile MUST encode thisUpdate as GeneralizedTime for dates in
   the year 2050 or later.  Conforming applications MUST be able to
   process dates that are encoded in either UTCTime or GeneralizedTime.

   Where encoded as UTCTime, thisUpdate MUST be specified and
   interpreted as defined in Section 15.1.1.2.4.1.2.5.1.  Where encoded as
   GeneralizedTime, thisUpdate MUST be specified and interpreted as
   defined in Section 15.1.1.2.4.1.2.5.2.
```

#### 15.1.1.2.5.1.2.5. Next Update

```text
   This field indicates the date by which the next CRL will be issued.
   The next CRL could be issued before the indicated date, but it will
   not be issued any later than the indicated date.  CRL issuers SHOULD
   issue CRLs with a nextUpdate time equal to or later than all previous
   CRLs.  nextUpdate may be encoded as UTCTime or GeneralizedTime.

   Conforming CRL issuers MUST include the nextUpdate field in all CRLs.
   Note that the ASN.1 syntax of TBSCertList describes this field as
   OPTIONAL, which is consistent with the ASN.1 structure defined in
   [X.509].  The behavior of clients processing CRLs that omit
   nextUpdate is not specified by this profile.

   CRL issuers conforming to this profile MUST encode nextUpdate as
   UTCTime for dates through the year 15.1.1.2.2049.  CRL issuers conforming to
   this profile MUST encode nextUpdate as GeneralizedTime for dates in
   the year 2050 or later.  Conforming applications MUST be able to
   process dates that are encoded in either UTCTime or GeneralizedTime.

   Where encoded as UTCTime, nextUpdate MUST be specified and
   interpreted as defined in Section 15.1.1.2.4.1.2.5.1.  Where encoded as
   GeneralizedTime, nextUpdate MUST be specified and interpreted as
   defined in Section 15.1.1.2.4.1.2.5.2.
```

#### 15.1.1.2.5.1.2.6. Revoked Certificates

```text
   When there are no revoked certificates, the revoked certificates list
   MUST be absent.  Otherwise, revoked certificates are listed by their
   serial numbers.  Certificates revoked by the CA are uniquely
   identified by the certificate serial number.  The date on which the
   revocation occurred is specified.  The time for revocationDate MUST
   be expressed as described in Section 15.1.1.2.5.1.2.4.  Additional information
   may be supplied in CRL entry extensions; CRL entry extensions are
   discussed in Section 15.1.1.2.5.3.







Cooper, et al.              Standards Track                    [Page 59]

RFC 5280            PKIX Certificate and CRL Profile            May 2008
```

#### 15.1.1.2.5.1.2.7. Extensions

```text
   This field may only appear if the version is 2 (Section 15.1.1.2.5.1.2.1).  If
   present, this field is a sequence of one or more CRL extensions.  CRL
   extensions are discussed in Section 15.1.1.2.5.2.
```

#### 15.1.1.2.5.2. CRL Extensions

```text
   The extensions defined by ANSI X9, ISO/IEC, and ITU-T for X.509 v2
   CRLs [X.509] [X9.55] provide methods for associating additional
   attributes with CRLs.  The X.509 v2 CRL format also allows
   communities to define private extensions to carry information unique
   to those communities.  Each extension in a CRL may be designated as
   critical or non-critical.  If a CRL contains a critical extension
   that the application cannot process, then the application MUST NOT
   use that CRL to determine the status of certificates.  However,
   applications may ignore unrecognized non-critical extensions.  The
   following subsections present those extensions used within Internet
   CRLs.  Communities may elect to include extensions in CRLs that are
   not defined in this specification.  However, caution should be
   exercised in adopting any critical extensions in CRLs that might be
   used in a general context.

   Conforming CRL issuers are REQUIRED to include the authority key
   identifier (Section 15.1.1.2.5.2.1) and the CRL number (Section 15.1.1.2.5.2.3)
   extensions in all CRLs issued.
```

#### 15.1.1.2.5.2.1. Authority Key Identifier

```text
   The authority key identifier extension provides a means of
   identifying the public key corresponding to the private key used to
   sign a CRL.  The identification can be based on either the key
   identifier (the subject key identifier in the CRL signer's
   certificate) or the issuer name and serial number.  This extension is
   especially useful where an issuer has more than one signing key,
   either due to multiple concurrent key pairs or due to changeover.

   Conforming CRL issuers MUST use the key identifier method, and MUST
   include this extension in all CRLs issued.

   The syntax for this CRL extension is defined in Section 15.1.1.2.4.2.1.1.
```

#### 15.1.1.2.5.2.2. Issuer Alternative Name

```text
   The issuer alternative name extension allows additional identities to
   be associated with the issuer of the CRL.  Defined options include an
   electronic mail address (rfc822Name), a DNS name, an IP address, and
   a URI.  Multiple instances of a name form and multiple name forms may



Cooper, et al.              Standards Track                    [Page 60]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   be included.  Whenever such identities are used, the issuer
   alternative name extension MUST be used; however, a DNS name MAY be
   represented in the issuer field using the domainComponent attribute
   as described in Section 15.1.1.2.4.1.2.4.

   Conforming CRL issuers SHOULD mark the issuerAltName extension as
   non-critical.

   The OID and syntax for this CRL extension are defined in Section
   15.1.1.2.4.2.1.7.
```

#### 15.1.1.2.5.2.3. CRL Number

```text
   The CRL number is a non-critical CRL extension that conveys a
   monotonically increasing sequence number for a given CRL scope and
   CRL issuer.  This extension allows users to easily determine when a
   particular CRL supersedes another CRL.  CRL numbers also support the
   identification of complementary complete CRLs and delta CRLs.  CRL
   issuers conforming to this profile MUST include this extension in all
   CRLs and MUST mark this extension as non-critical.

   If a CRL issuer generates delta CRLs in addition to complete CRLs for
   a given scope, the complete CRLs and delta CRLs MUST share one
   numbering sequence.  If a delta CRL and a complete CRL that cover the
   same scope are issued at the same time, they MUST have the same CRL
   number and provide the same revocation information.  That is, the
   combination of the delta CRL and an acceptable complete CRL MUST
   provide the same revocation information as the simultaneously issued
   complete CRL.

   If a CRL issuer generates two CRLs (two complete CRLs, two delta
   CRLs, or a complete CRL and a delta CRL) for the same scope at
   different times, the two CRLs MUST NOT have the same CRL number.
   That is, if the this update field (Section 15.1.1.2.5.1.2.4) in the two CRLs
   are not identical, the CRL numbers MUST be different.

   Given the requirements above, CRL numbers can be expected to contain
   long integers.  CRL verifiers MUST be able to handle CRLNumber values
   up to 20 octets.  Conforming CRL issuers MUST NOT use CRLNumber
   values longer than 20 octets.

   id-ce-cRLNumber OBJECT IDENTIFIER ::= { id-ce 20 }

   CRLNumber ::= INTEGER (0..MAX)







Cooper, et al.              Standards Track                    [Page 61]

RFC 5280            PKIX Certificate and CRL Profile            May 2008
```

#### 15.1.1.2.5.2.4. Delta CRL Indicator

```text
   The delta CRL indicator is a critical CRL extension that identifies a
   CRL as being a delta CRL.  Delta CRLs contain updates to revocation
   information previously distributed, rather than all the information
   that would appear in a complete CRL.  The use of delta CRLs can
   significantly reduce network load and processing time in some
   environments.  Delta CRLs are generally smaller than the CRLs they
   update, so applications that obtain delta CRLs consume less network
   bandwidth than applications that obtain the corresponding complete
   CRLs.  Applications that store revocation information in a format
   other than the CRL structure can add new revocation information to
   the local database without reprocessing information.

   The delta CRL indicator extension contains the single value of type
   BaseCRLNumber.  The CRL number identifies the CRL, complete for a
   given scope, that was used as the starting point in the generation of
   this delta CRL.  A conforming CRL issuer MUST publish the referenced
   base CRL as a complete CRL.  The delta CRL contains all updates to
   the revocation status for that same scope.  The combination of a
   delta CRL plus the referenced base CRL is equivalent to a complete
   CRL, for the applicable scope, at the time of publication of the
   delta CRL.

   When a conforming CRL issuer generates a delta CRL, the delta CRL
   MUST include a critical delta CRL indicator extension.

   When a delta CRL is issued, it MUST cover the same set of reasons and
   the same set of certificates that were covered by the base CRL it
   references.  That is, the scope of the delta CRL MUST be the same as
   the scope of the complete CRL referenced as the base.  The referenced
   base CRL and the delta CRL MUST omit the issuing distribution point
   extension or contain identical issuing distribution point extensions.
   Further, the CRL issuer MUST use the same private key to sign the
   delta CRL and any complete CRL that it can be used to update.

   An application that supports delta CRLs can construct a CRL that is
   complete for a given scope by combining a delta CRL for that scope
   with either an issued CRL that is complete for that scope or a
   locally constructed CRL that is complete for that scope.

   When a delta CRL is combined with a complete CRL or a locally
   constructed CRL, the resulting locally constructed CRL has the CRL
   number specified in the CRL number extension found in the delta CRL
   used in its construction.  In addition, the resulting locally
   constructed CRL has the thisUpdate and nextUpdate times specified in





Cooper, et al.              Standards Track                    [Page 62]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   the corresponding fields of the delta CRL used in its construction.
   In addition, the locally constructed CRL inherits the issuing
   distribution point from the delta CRL.

   A complete CRL and a delta CRL MAY be combined if the following four
   conditions are satisfied:

      (a)  The complete CRL and delta CRL have the same issuer.

      (b)  The complete CRL and delta CRL have the same scope.  The two
           CRLs have the same scope if either of the following
           conditions are met:

         (1)  The issuingDistributionPoint extension is omitted from
              both the complete CRL and the delta CRL.

         (2)  The issuingDistributionPoint extension is present in both
              the complete CRL and the delta CRL, and the values for
              each of the fields in the extensions are the same in both
              CRLs.

      (c)  The CRL number of the complete CRL is equal to or greater
           than the BaseCRLNumber specified in the delta CRL.  That is,
           the complete CRL contains (at a minimum) all the revocation
           information held by the referenced base CRL.

      (d)  The CRL number of the complete CRL is less than the CRL
           number of the delta CRL.  That is, the delta CRL follows the
           complete CRL in the numbering sequence.

   CRL issuers MUST ensure that the combination of a delta CRL and any
   appropriate complete CRL accurately reflects the current revocation
   status.  The CRL issuer MUST include an entry in the delta CRL for
   each certificate within the scope of the delta CRL whose status has
   changed since the generation of the referenced base CRL:

      (a)  If the certificate is revoked for a reason included in the
           scope of the CRL, list the certificate as revoked.

      (b)  If the certificate is valid and was listed on the referenced
           base CRL or any subsequent CRL with reason code
           certificateHold, and the reason code certificateHold is
           included in the scope of the CRL, list the certificate with
           the reason code removeFromCRL.







Cooper, et al.              Standards Track                    [Page 63]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


      (c)  If the certificate is revoked for a reason outside the scope
           of the CRL, but the certificate was listed on the referenced
           base CRL or any subsequent CRL with a reason code included in
           the scope of this CRL, list the certificate as revoked but
           omit the reason code.

      (d)  If the certificate is revoked for a reason outside the scope
           of the CRL and the certificate was neither listed on the
           referenced base CRL nor any subsequent CRL with a reason code
           included in the scope of this CRL, do not list the
           certificate on this CRL.

   The status of a certificate is considered to have changed if it is
   revoked (for any revocation reason, including certificateHold), if it
   is released from hold, or if its revocation reason changes.

   It is appropriate to list a certificate with reason code
   removeFromCRL on a delta CRL even if the certificate was not on hold
   in the referenced base CRL.  If the certificate was placed on hold in
   any CRL issued after the base but before this delta CRL and then
   released from hold, it MUST be listed on the delta CRL with
   revocation reason removeFromCRL.

   A CRL issuer MAY optionally list a certificate on a delta CRL with
   reason code removeFromCRL if the notAfter time specified in the
   certificate precedes the thisUpdate time specified in the delta CRL
   and the certificate was listed on the referenced base CRL or in any
   CRL issued after the base but before this delta CRL.

   If a certificate revocation notice first appears on a delta CRL, then
   it is possible for the certificate validity period to expire before
   the next complete CRL for the same scope is issued.  In this case,
   the revocation notice MUST be included in all subsequent delta CRLs
   until the revocation notice is included on at least one explicitly
   issued complete CRL for this scope.

   An application that supports delta CRLs MUST be able to construct a
   current complete CRL by combining a previously issued complete CRL
   and the most current delta CRL.  An application that supports delta
   CRLs MAY also be able to construct a current complete CRL by
   combining a previously locally constructed complete CRL and the
   current delta CRL.  A delta CRL is considered to be the current one
   if the current time is between the times contained in the thisUpdate
   and nextUpdate fields.  Under some circumstances, the CRL issuer may
   publish one or more delta CRLs before the time indicated by the
   nextUpdate field.  If more than one current delta CRL for a given
   scope is encountered, the application SHOULD consider the one with
   the latest value in thisUpdate to be the most current one.



Cooper, et al.              Standards Track                    [Page 64]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   id-ce-deltaCRLIndicator OBJECT IDENTIFIER ::= { id-ce 27 }

   BaseCRLNumber ::= CRLNumber
```

#### 15.1.1.2.5.2.5. Issuing Distribution Point

```text
   The issuing distribution point is a critical CRL extension that
   identifies the CRL distribution point and scope for a particular CRL,
   and it indicates whether the CRL covers revocation for end entity
   certificates only, CA certificates only, attribute certificates only,
   or a limited set of reason codes.  Although the extension is
   critical, conforming implementations are not required to support this
   extension.  However, implementations that do not support this
   extension MUST either treat the status of any certificate not listed
   on this CRL as unknown or locate another CRL that does not contain
   any unrecognized critical extensions.

   The CRL is signed using the CRL issuer's private key.  CRL
   distribution points do not have their own key pairs.  If the CRL is
   stored in the X.500 directory, it is stored in the directory entry
   corresponding to the CRL distribution point, which may be different
   from the directory entry of the CRL issuer.

   The reason codes associated with a distribution point MUST be
   specified in onlySomeReasons.  If onlySomeReasons does not appear,
   the distribution point MUST contain revocations for all reason codes.
   CAs may use CRL distribution points to partition the CRL on the basis
   of compromise and routine revocation.  In this case, the revocations
   with reason code keyCompromise (1), cACompromise (2), and
   aACompromise (8) appear in one distribution point, and the
   revocations with other reason codes appear in another distribution
   point.

   If a CRL includes an issuingDistributionPoint extension with
   onlySomeReasons present, then every certificate in the scope of the
   CRL that is revoked MUST be assigned a revocation reason other than
   unspecified.  The assigned revocation reason is used to determine on
   which CRL(s) to list the revoked certificate, however, there is no
   requirement to include the reasonCode CRL entry extension in the
   corresponding CRL entry.

   The syntax and semantics for the distributionPoint field are the same
   as for the distributionPoint field in the cRLDistributionPoints
   extension (Section 15.1.1.2.4.2.1.13).  If the distributionPoint field is
   present, then it MUST include at least one of names from the
   corresponding distributionPoint field of the cRLDistributionPoints





Cooper, et al.              Standards Track                    [Page 65]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   extension of every certificate that is within the scope of this CRL.
   The identical encoding MUST be used in the distributionPoint fields
   of the certificate and the CRL.

   If the distributionPoint field is absent, the CRL MUST contain
   entries for all revoked unexpired certificates issued by the CRL
   issuer, if any, within the scope of the CRL.

   If the scope of the CRL only includes certificates issued by the CRL
   issuer, then the indirectCRL boolean MUST be set to FALSE.
   Otherwise, if the scope of the CRL includes certificates issued by
   one or more authorities other than the CRL issuer, the indirectCRL
   boolean MUST be set to TRUE.  The authority responsible for each
   entry is indicated by the certificate issuer CRL entry extension
   (Section 15.1.1.2.5.3.3).

   If the scope of the CRL only includes end entity public key
   certificates, then onlyContainsUserCerts MUST be set to TRUE.  If the
   scope of the CRL only includes CA certificates, then
   onlyContainsCACerts MUST be set to TRUE.  If either
   onlyContainsUserCerts or onlyContainsCACerts is set to TRUE, then the
   scope of the CRL MUST NOT include any version 1 or version 2
   certificates.  Conforming CRLs issuers MUST set the
   onlyContainsAttributeCerts boolean to FALSE.

   Conforming CRLs issuers MUST NOT issue CRLs where the DER encoding of
   the issuing distribution point extension is an empty sequence.  That
   is, if onlyContainsUserCerts, onlyContainsCACerts, indirectCRL, and
   onlyContainsAttributeCerts are all FALSE, then either the
   distributionPoint field or the onlySomeReasons field MUST be present.

   id-ce-issuingDistributionPoint OBJECT IDENTIFIER ::= { id-ce 28 }

   IssuingDistributionPoint ::= SEQUENCE {
        distributionPoint          [0] DistributionPointName OPTIONAL,
        onlyContainsUserCerts      [1] BOOLEAN DEFAULT FALSE,
        onlyContainsCACerts        [2] BOOLEAN DEFAULT FALSE,
        onlySomeReasons            [3] ReasonFlags OPTIONAL,
        indirectCRL                [4] BOOLEAN DEFAULT FALSE,
        onlyContainsAttributeCerts [5] BOOLEAN DEFAULT FALSE }

        -- at most one of onlyContainsUserCerts, onlyContainsCACerts,
        -- and onlyContainsAttributeCerts may be set to TRUE.








Cooper, et al.              Standards Track                    [Page 66]

RFC 5280            PKIX Certificate and CRL Profile            May 2008
```

#### 15.1.1.2.5.2.6. Freshest CRL (a.k.a. Delta CRL Distribution Point)

```text
   The freshest CRL extension identifies how delta CRL information for
   this complete CRL is obtained.  Conforming CRL issuers MUST mark this
   extension as non-critical.  This extension MUST NOT appear in delta
   CRLs.

   The same syntax is used for this extension as the
   cRLDistributionPoints certificate extension, and is described in
   Section 15.1.1.2.4.2.1.13.  However, only the distribution point field is
   meaningful in this context.  The reasons and cRLIssuer fields MUST be
   omitted from this CRL extension.

   Each distribution point name provides the location at which a delta
   CRL for this complete CRL can be found.  The scope of these delta
   CRLs MUST be the same as the scope of this complete CRL.  The
   contents of this CRL extension are only used to locate delta CRLs;
   the contents are not used to validate the CRL or the referenced delta
   CRLs.  The encoding conventions defined for distribution points in
   Section 15.1.1.2.4.2.1.13 apply to this extension.

   id-ce-freshestCRL OBJECT IDENTIFIER ::=  { id-ce 46 }

   FreshestCRL ::= CRLDistributionPoints
```

#### 15.1.1.2.5.2.7. Authority Information Access

```text
   This section defines the use of the Authority Information Access
   extension in a CRL.  The syntax and semantics defined in Section
```

#### 15.1.1.2.4.2.2.1 for the certificate extension are also used for the CRL

```text
   extension.

   This CRL extension MUST be marked as non-critical.

   When present in a CRL, this extension MUST include at least one
   AccessDescription specifying id-ad-caIssuers as the accessMethod.
   The id-ad-caIssuers OID is used when the information available lists
   certificates that can be used to verify the signature on the CRL
   (i.e., certificates that have a subject name that matches the issuer
   name on the CRL and that have a subject public key that corresponds
   to the private key used to sign the CRL).  Access method types other
   than id-ad-caIssuers MUST NOT be included.  At least one instance of
   AccessDescription SHOULD specify an accessLocation that is an HTTP
   [RFC2616] or LDAP [RFC4516] URI.







Cooper, et al.              Standards Track                    [Page 67]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   Where the information is available via HTTP or FTP, accessLocation
   MUST be a uniformResourceIdentifier and the URI MUST point to either
   a single DER encoded certificate as specified in [RFC2585] or a
   collection of certificates in a BER or DER encoded "certs-only" CMS
   message as specified in [RFC2797].

   Conforming applications that support HTTP or FTP for accessing
   certificates MUST be able to accept individual DER encoded
   certificates and SHOULD be able to accept "certs-only" CMS messages.

   HTTP server implementations accessed via the URI SHOULD specify the
   media type application/pkix-cert [RFC2585] in the content-type header
   field of the response for a single DER encoded certificate and SHOULD
   specify the media type application/pkcs7-mime [RFC2797] in the
   content-type header field of the response for "certs-only" CMS
   messages.  For FTP, the name of a file that contains a single DER
   encoded certificate SHOULD have a suffix of ".cer" [RFC2585] and the
   name of a file that contains a "certs-only" CMS message SHOULD have a
   suffix of ".p7c" [RFC2797].  Consuming clients may use the media type
   or file extension as a hint to the content, but should not depend
   solely on the presence of the correct media type or file extension in
   the server response.

   When the accessLocation is a directoryName, the information is to be
   obtained by the application from whatever directory server is locally
   configured.  When one CA public key is used to validate signatures on
   certificates and CRLs, the desired CA certificate is stored in the
   crossCertificatePair and/or cACertificate attributes as specified in
   [RFC4523].  When different public keys are used to validate
   signatures on certificates and CRLs, the desired certificate is
   stored in the userCertificate attribute as specified in [RFC4523].
   Thus, implementations that support the directoryName form of
   accessLocation MUST be prepared to find the needed certificate in any
   of these three attributes.  The protocol that an application uses to
   access the directory (e.g., DAP or LDAP) is a local matter.

   Where the information is available via LDAP, the accessLocation
   SHOULD be a uniformResourceIdentifier.  The LDAP URI [RFC4516] MUST
   include a <dn> field containing the distinguished name of the entry
   holding the certificates, MUST include an <attributes> field that
   lists appropriate attribute descriptions for the attributes that hold
   the DER encoded certificates or cross-certificate pairs [RFC4523],
   and SHOULD include a <host> (e.g., <ldap://ldap.example.com/cn=CA,
   dc=example,dc=com?cACertificate;binary,crossCertificatePair;binary>).
   Omitting the <host> (e.g., <ldap:///cn=exampleCA,dc=example,dc=com?
   cACertificate;binary>) has the effect of relying on whatever a priori
   knowledge the client might have to contact an appropriate server.




Cooper, et al.              Standards Track                    [Page 68]

RFC 5280            PKIX Certificate and CRL Profile            May 2008
```

#### 15.1.1.2.5.3. CRL Entry Extensions

```text
   The CRL entry extensions defined by ISO/IEC, ITU-T, and ANSI X9 for
   X.509 v2 CRLs provide methods for associating additional attributes
   with CRL entries [X.509] [X9.55].  The X.509 v2 CRL format also
   allows communities to define private CRL entry extensions to carry
   information unique to those communities.  Each extension in a CRL
   entry may be designated as critical or non-critical.  If a CRL
   contains a critical CRL entry extension that the application cannot
   process, then the application MUST NOT use that CRL to determine the
   status of any certificates.  However, applications may ignore
   unrecognized non-critical CRL entry extensions.

   The following subsections present recommended extensions used within
   Internet CRL entries and standard locations for information.
   Communities may elect to use additional CRL entry extensions;
   however, caution should be exercised in adopting any critical CRL
   entry extensions in CRLs that might be used in a general context.

   Support for the CRL entry extensions defined in this specification is
   optional for conforming CRL issuers and applications.  However, CRL
   issuers SHOULD include reason codes (Section 15.1.1.2.5.3.1) and invalidity
   dates (Section 15.1.1.2.5.3.2) whenever this information is available.
```
