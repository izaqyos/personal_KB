---
type: reference
title: Extensions
description: Section 10 of the legacy sslKB notes.
tags: [kb-ssl]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "Network/sslKB#10"
---

# Extensions

[↑ sslKB](/Network/kb-ssl/README.md)

## 10.1 Name Constraints

### 10.1.1 http://technet.microsoft.com/fr-fr/library/cc757755%28WS.10%29.aspx - Using Name Constraints

```text
Name constraints allow you to designate which namespaces are either permitted or excluded for certificates issued by a qualified subordinate CA. When the qualified subordinate CA receives a request, it compares the names present in the subject and the subject alternate name fields to the configured name constraints, to determine whether the namespace is permitted or excluded. As you design your PKI, you need to decide which individual clients and business units are able to enroll for and use certain certificates. For many organizations, the selected users, computers, and services are members of specific Active Directory domains and subdomains.

You can base name constraints on any of the following types of name formats:

    X.500 Directory name. Distinguished names identify users and resources on the network in Active Directory. This allows you to constrain a qualified subordinate CA to permit or exclude users in Active Directory by using the distinguished names of the users. Active Directory also uses distinguished names to create and reference groups of objects in the directory, such as users and computers. The distinguished names of these object groups can also be used as name constraints, allowing you to constrain a qualified subordinate CA to permit and exclude certificate issuance for entire groups in the directory.
    DNS domain name. You can apply the DNS namespaces that your network uses for name resolution as name constraints for a qualified subordinate CA. When the qualified subordinate CA receives a certificate request, it compares the DNS name associated with the computer requesting the certificate to its DNS name constraints and decides whether or not to issue a certificate. You can specify a DNS name constraint as a DNS host name, such as host1.example.microsoft.com, or as a DNS namespace, wherein all DNS host names are permitted or excluded, such as .example.microsoft.com.
    E-mail and user principal name. You can specify e-mail and UPN name constraints for an individual subject, such as person@example.contoso.com, or you can specify constraints for all subjects whose e-mail names or UPNs end in a specific name, such as @example.contoso.com. Typically, you need to specify e-mail or UPN name constraints for all subjects whose e-mail addresses and UPNs end in a specific name.
    Universal Resource Identifier (URI). URIs are used to identify resources on the Internet by means of identifiers such as URL, FTP, HTTP, telnet, mailto, news, and gopher. When validating the URI names in a certificate request, the qualified subordinate CA ignores the protocol element in the URI, such as http:// or ftp://, and uses the domain or host names only.
    IP address. IP address name constraints follow the formatting conventions specified in RFCs 791 (IPv4) and 1883 (IPv6). The IP addresses contained in the certificate requests made to a qualified subordinate CA are compared to the IP addresses in the name constraints of the qualified subordinate CA.

You can configure name constraints to result in the following outcomes:

    Permitted. The certificate request contains all names that are listed as permitted in the CA name constraints extension of the issuer.
    Not permitted. The certificate request contains a name that is not listed as permitted in the name constraints extension of the issuer.
    Excluded. The certificate request contains a name that is listed as excluded in the name constraints extension of the issuer.

A CA certificate can contain name constraints that are applied to all certificate requests made to the CA. Each request is compared to the list of permitted and excluded names to determine whether the name in the certificate is considered permitted, not permitted, excluded, or not defined. When you include name constraints in a CA certificate, the following rules are applied to the subject name and alternate subject name fields:

    Excluded namespaces take precedence over permitted namespaces. A qualified subordinate CA will not issue a certificate to a user within an excluded namespace even if the user is also within a permitted namespace. For example, a user might be within the permitted Active Directory namespace .contoso.com but also within the excluded DNS namespace .uvw.contoso.com. The excluded DNS namespace overrides the permitted Active Directory namespace and the certificate request of the user fails.
    If the name constraints extension exists in a CA certificate, all name constraints must be present in the appropriate format. Any name formats that are not included are considered to be wild cards that match all possibilities. For example, if the DNS name constraint is absent, the entry is treated as DNS="".
    All name constraints are considered, even if they are not specified. No precedence is applied to the listed name constraints. For this reason, name constraints that are not present are treated as wildcards. For example if you only restrict the DNS name space, the Name Constraints extension sets the remaining name constraints to allow all name spaces.
    Name constraints are applied to the Subject Name extension and any existing Subject Alternate Name extensions. For example, if a user can be identified by a DNS domain name and an alternate e-mail name, name constraints apply to both.
    Name constraints apply to all names contained in a certificate request. Each name in the subject or subject alternate name extensions must match at least one of the name constraints listed for that name type. A certificate request that includes a subject name or subject alternate name that does not match a listed name type is rejected.
    Name constraints are not case sensitive. For example, .contoso.com is treated the same as CONTOSO.COM or ConToso.Com.

Important

    Name constraint validation is performed on the CA, not on the client. However, you must have Windows XP and Windows Server 2003 clients in order to use name constraints.
```

## 10.2 Issuing Distribution Point

```text
The X.509 v2 CRL Issuing Distribution Point extension may contain an Indirect CRL
indicator that allows the CRL Distribution Point to be issued by a third party service
provider. In most applications this facility will not be needed, but it may be useful in large
PKIs in which revocation is administered at a point in the organization which is remote
from the point at which enrollment is administered. Alternatively, as a convenience to a
community of relying parties, a service provider could produce revocation information for
a number of different CAs. If these CAs offer their revocation information in accordance
with a variety of different protocols, then the third-party may present a single interface to
relying parties, in order to simplify the processing required of them.
In order to take advantage of this facility, we propose that the Redirect Pointer introduced
in the previous section also contain an Indirect CRL indicator. This would allow third
parties to be enlisted to aid in processing revocation information.
Notice that Redirect Pointers now not only allow for dynamic repartitioning of the space
requirements, but also of the scale requirements. Combined with the Freshest Revocation
Information Pointer, which allows for dynamic repartitioning of the freshness
requirements, what has been described is a general, flexible model for revocation
processing which fits completely within the framework of existing standards.

	10.3
```
