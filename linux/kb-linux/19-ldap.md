---
type: reference
title: LDAP
description: Section 19 of the legacy KB_Linux notes.
tags: [kb-linux]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "linux/KB_Linux#19"
---

# LDAP

[↑ KB_Linux](/linux/kb-linux/README.md)

## 19.1 LDAP search

```text
| 1)	Login to ACS as root.
| 2)	Find the domain controller that can provide the groups (global catalog) and use it within the LDAP query (in the following example the DC is sustain.sus).
| 3)	The output is the  list of the groups as you can see below.  

# /opt/CSCOacs/runtime/adagent/bin/./ACS_AD_Runner.sh ldapsearch -m -H gc://acs-sus-s5.sustain.sus -E pr=120 -z 101 -r -S distinguishedName -b 'DC=sustain, DC=sus' "(&(objectClass=group)(cn=*))" distinguishedName groupType

/opt/CSCOacs/runtime/adagent/bin/./ACS_AD_Runner.sh ldapsearch -m -H gc://a3-adf1.amer.acs.com -E pr=120 -z 101 -r -S distinguishedName -b 'DC=canada,DC=north,DC=amer,DC=acs,DC=com' "(&(objectClass=group)(cn=*))" distinguishedName groupType -d 1

Executed with privileges of root
executing /opt/CSCOacs/runtime/adagent/bin/ldapsearch -m -H gc://acs-sus-s5.sustain.sus -E pr=120 -z 101 -r -S distinguishedName -b DC=sustain, DC=sus (&(objectClass=group)(cn=*)) distinguishedName groupType
SASL/GSSAPI authentication started
SASL SSF: 56
SASL installing layers
# extended LDIF
#
# LDAPv3
# base <DC=sustain, DC=sus> with scope sub
# filter: (&(objectClass=group)(cn=*))
# requesting: distinguishedName groupType 
# with pagedResults control: size=120
#

# Account Operators, Builtin, sustain.sus
dn: CN=Account Operators,CN=Builtin,DC=sustain,DC=sus
distinguishedName: CN=Account Operators,CN=Builtin,DC=sustain,DC=sus
groupType: -2147483643

# Administrators, Builtin, sustain.sus
dn: CN=Administrators,CN=Builtin,DC=sustain,DC=sus
distinguishedName: CN=Administrators,CN=Builtin,DC=sustain,DC=sus
groupType: -2147483643

# Backup Operators, Builtin, sustain.sus
dn: CN=Backup Operators,CN=Builtin,DC=sustain,DC=sus
distinguishedName: CN=Backup Operators,CN=Builtin,DC=sustain,DC=sus
groupType: -2147483643

-------------------------------------------------------
$ sudo ./ACS_AD_Runner.sh ldapsearch -m -Q -LLL -H "gc://" -b "dc=canada,dc=north,dc=amer,dc=acs,dc=com" "(serviceprincipalname=host/<user>-lnx)" dn 
Executed with privileges of root
executing /opt/CSCOacs/runtime/adagent/bin/ldapsearch -m -Q -LLL -H gc:// -b dc=canada,dc=north,dc=amer,dc=acs,dc=com (serviceprincipalname=host/<user>-lnx) dn
dn: CN=<user>-lnx,CN=Computers,DC=canada,DC=north,DC=amer,DC=acs,DC=com

$ sudo ./ACS_AD_Runner.sh ldapsearch -m -Q -LLL -H "ldap://" -b "dc=canada,dc=north,dc=amer,dc=acs,dc=com" "(serviceprincipalname=host/<user>-lnx)" dn 
Executed with privileges of root
executing /opt/CSCOacs/runtime/adagent/bin/ldapsearch -m -Q -LLL -H ldap:// -b dc=canada,dc=north,dc=amer,dc=acs,dc=com (serviceprincipalname=host/<user>-lnx) dn
dn: CN=<user>-lnx,CN=Computers,DC=canada,DC=north,DC=amer,DC=acs,DC=com

$ sudo ./ACS_AD_Runner.sh ldapsearch -m -Q -LLL -H "ldap://" -b "dc=canada,dc=north,dc=amer,dc=acs,dc=com" "(serviceprincipalname=host/<user>-lnx)" dn serviceprincipalname 
Executed with privileges of root
executing /opt/CSCOacs/runtime/adagent/bin/ldapsearch -m -Q -LLL -H ldap:// -b dc=canada,dc=north,dc=amer,dc=acs,dc=com (serviceprincipalname=host/<user>-lnx) dn serviceprincipalname
dn: CN=<user>-lnx,CN=Computers,DC=canada,DC=north,DC=amer,DC=acs,DC=com
servicePrincipalName: nfs/<user>-lnx.canada.north.amer.acs.com
servicePrincipalName: nfs/<user>-lnx
servicePrincipalName: http/<user>-lnx.canada.north.amer.acs.com
servicePrincipalName: http/<user>-lnx
servicePrincipalName: host/<user>-lnx.canada.north.amer.acs.com
servicePrincipalName: host/<user>-lnx
servicePrincipalName: ftp/<user>-lnx.canada.north.amer.acs.com
servicePrincipalName: ftp/<user>-lnx
servicePrincipalName: cifs/<user>-lnx.canada.north.amer.acs.com
servicePrincipalName: cifs/<user>-lnx

$ sudo ./ACS_AD_Runner.sh ldapsearch -m -Q -LLL -H "gc://" -b "dc=canada,dc=north,dc=amer,dc=acs,dc=com" "(serviceprincipalname=host/<user>-lnx)" dn serviceprincipalname 
Executed with privileges of root
executing /opt/CSCOacs/runtime/adagent/bin/ldapsearch -m -Q -LLL -H gc:// -b dc=canada,dc=north,dc=amer,dc=acs,dc=com (serviceprincipalname=host/<user>-lnx) dn serviceprincipalname
dn: CN=<user>-lnx,CN=Computers,DC=canada,DC=north,DC=amer,DC=acs,DC=com
servicePrincipalName: nfs/<user>-lnx.canada.north.amer.acs.com
servicePrincipalName: nfs/<user>-lnx
servicePrincipalName: http/<user>-lnx.canada.north.amer.acs.com
servicePrincipalName: http/<user>-lnx
servicePrincipalName: host/<user>-lnx.canada.north.amer.acs.com
servicePrincipalName: host/<user>-lnx
servicePrincipalName: ftp/<user>-lnx.canada.north.amer.acs.com
servicePrincipalName: ftp/<user>-lnx
servicePrincipalName: cifs/<user>-lnx.canada.north.amer.acs.com
servicePrincipalName: cifs/<user>-lnx

-------------------------------------------------------
```

## 19.2 Determine gc of domain

```text
$ nslookup gc._msdcs.amer.acs.com
Server:         <internal-ip>
Address:        <internal-ip>#53

Name:   gc._msdcs.amer.acs.com
Address: <internal-ip>

or, use Centrify's adinfo -g
```

## 19.3 Determine DCs of domain

```text
$ nslookup 
> set type=ptr
> <internal-ip>
Server:         <internal-ip>
Address:        <internal-ip>#53

38.60.56.10.in-addr.arpa        name = a3-adf1.amer.acs.com.

DC is a3-adf1.amer.acs.com.

or, use Centrify's adinfo -g
	19.3
```
