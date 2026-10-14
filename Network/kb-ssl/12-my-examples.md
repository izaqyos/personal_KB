---
type: reference
title: My examples
description: "OpenSSL CLI examples: generating a self-signed certificate and a CSR from an existing certificate."
tags: [openssl, certificates, examples, cheatsheet, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "Network/sslKB#12"
---

# My examples

[↑ sslKB](/Network/kb-ssl/README.md)

## 12.1 CLI

### 12.1.1 Generate self signed certificate using CLI paramaters

```text
$ openssl req -x509 -nodes -days 365 -subj '/C=US/ST=Oregon/L=Portland/CN=yo,si'   -newkey rsa:1024 -keyout mycert.pem -out mycert.pem
Generating a 1024 bit RSA private key

......................++++++
.................++++++
writing new private key to 'mycert.pem'
-----
```

### 12.1.2 Generate CSR using existing certificate

```text
$ openssl x509 -x509toreq -in mycert.pem -out CSR.csr -signkey mycert.pem 
Getting request Private Key
Generating certificate request
```

### 12.1.3 View Certificate fields

```text
$ openssl x509 -noout -in mycert.pem -issuer -subject -dates
issuer= /C=US/ST=Oregon/L=Portland/CN=yo,si
subject= /C=US/ST=Oregon/L=Portland/CN=yo,si
notBefore=Feb 20 13:01:54 2012 GMT
notAfter=Feb 19 13:01:54 2013 GMT
```

### 12.1.4 Check Certificate format

```text
			12.1.4.1 how can I check if the certificate file I have is in .pem format
https://support.ssl.com/index.php?/Knowledgebase/Article/View/19

Quote from the support page:

View
====

Even though PEM encoded certificates are ASCII they are not human
readable.  Here are some commands that will let you output the
contents of a certificate in human readable form;

View PEM encoded certificate
----------------------------

Use the command that has the extension of your certificate replacing
cert.xxx with the name of your certificate

openssl x509 -in cert.pem -text -noout
openssl x509 -in cert.cer -text -noout
openssl x509 -in cert.crt -text -noout

If you get the folowing error it means that you are trying to view a DER encoded certifciate and need to use the commands in the “View DER encoded certificate 
below”

unable to load certificate
12626:error:0906D06C:PEM routines:PEM_read_bio:no start line:pem_lib.c:647:Expecting: TRUSTED CERTIFICATE View DER encoded Certificate


View DER encoded Certificate
----------------------------

openssl x509 -in certificate.der -inform der -text -noout

If you get the following error it means that you are trying to view a PEM encoded certificate with a command meant for DER encoded certs. Use a command in the “View PEM encoded certificate above

unable to load certificate
13978:error:0D0680A8:asn1 encoding routines:ASN1_CHECK_TLEN:wrong tag:tasn_dec.c:1306:
13978:error:0D07803A:asn1 encoding routines:ASN1_ITEM_EX_D2I:nested asn1 error:tasn_


			12.1.4.2
```

### 12.1.5 Generate self signed certificate using CLI paramaters

```text
$ cat ssl.conf 
 RANDFILE               = $ENV::HOME/.rnd

 [ req ]
 default_bits           = 1024
 default_keyfile        = keyfile.pem
 distinguished_name     = req_distinguished_name
 attributes             = req_attributes
 prompt                 = no
 output_password        = mypass

 [ req_distinguished_name ]
 C                      = GB
 ST                     = Test State or Province
 L                      = Test Locality
 O                      = Organization Name
 OU                     = Organizational Unit Name
 CN                     = Common Name
 emailAddress           = test@email.address

 [ req_attributes ]
 challengePassword              = A challenge password

subjectAltName=@alt_section 

[alt_section] 
otherName=1.3.6.1.4.1.311.20.2.3;UTF8:bobOtherAltName@example.com 
email=bobRFC822AltName@example.com 
DNS.1=example1.com 
DNS.2=example2.com 
URI=http://example.com/
IP.1=13::17 
IP.2=192.168.7.1 
dirName=dir_sect 

[dir_sect] 
C=US 
O=Gold Music 
OU=Gold Ballads 
CN=bob 
emailAddress=bobDirAltName@example.com 
$ openssl req -x509 -nodes -days 365 -subj '/C=US/ST=Oregon/L=Portland/CN=yo,si'   -newkey rsa:1024 -keyout mycert.pem -out mycert.pem -config ssl.conf 
Generating a 1024 bit RSA private key
....................++++++
..........++++++
writing new private key to 'mycert.pem'
-----
```

### 12.1.6 Generate new RSA key

```text
openssl genrsa -out myrsakey 2048
```

### 12.1.7 Generate CSR using exisiting private key

```text
openssl genrsa -out myrsakey 2048
openssl req -new -sha256 -key myesakey -out mycsr.csr

view CSR content:
openssl req -noout -text -in  mycsr.csr
```

### 12.1.8 Generate Self-signed certificate using CSR and key

```text
- gen key
openssl genrsa -des3 -out server.key 1024

- gen certificate 
  openssl x509 -req -days 365 -in ~/Downloads/horse2MultiUse\(3\).pem  -signkey server.key -out server3.cert

		12.1.9
	12.2
```
