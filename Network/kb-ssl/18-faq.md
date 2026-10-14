---
type: reference
title: FAQ
description: Section 17 of the legacy sslKB notes.
tags: [kb-ssl]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "Network/sslKB#17"
---

# FAQ

[↑ sslKB](/Network/kb-ssl/README.md)

## 17.1 Creating a .pem with the Entire SSL Certificate Trust Chain

### 17.1.1 Internet guide

```text
SSL .pem files (concatenated certificate container files), are frequently required for certificate installations when multiple certificates are being imported as one file.

This article contains multiple sets of instructions that walk through various .pem file creation scenarios.

Creating a .pem with the Entire SSL Certificate Trust Chain

    Log into your DigiCert Management Console and download your Intermediate (DigiCertCA.crt), Root (TrustedRoot.crt), and Primary Certificates (your_domain_name.crt).

    Open a text editor (such as wordpad) and paste the entire body of each certificate into one text file in the following order:
        The Primary Certificate - your_domain_name.crt
        The Intermediate Certificate - DigiCertCA.crt
        The Root Certificate - TrustedRoot.crt

    Make sure to include the beginning and end tags on each certificate. The result should look like this:

    -----BEGIN CERTIFICATE-----
    (Your Primary SSL certificate: your_domain_name.crt)
    -----END CERTIFICATE-----
    -----BEGIN CERTIFICATE-----
    (Your Intermediate certificate: DigiCertCA.crt)
    -----END CERTIFICATE-----
    -----BEGIN CERTIFICATE-----
    (Your Root certificate: TrustedRoot.crt)
    -----END CERTIFICATE-----

    Save the combined file as your_domain_name.pem. The .pem file is now ready to use.

Creating a .pem with the Server and Intermediate Certificates

    Log into your DigiCert Management Console and download your Intermediate (DigiCertCA.crt) and Primary Certificates (your_domain_name.crt).

    Open a text editor (such as wordpad) and paste the entire body of each certificate into one text file in the following order:
        The Primary Certificate - your_domain_name.crt
        The Intermediate Certificate - DigiCertCA.crt

    Make sure to include the beginning and end tags on each certificate. The result should look like this:

    -----BEGIN CERTIFICATE-----
    (Your Primary SSL certificate: your_domain_name.crt)
    -----END CERTIFICATE-----
    -----BEGIN CERTIFICATE-----
    (Your Intermediate certificate: DigiCertCA.crt)
    -----END CERTIFICATE-----

    Save the combined file as your_domain_name.pem. The .pem file is now ready to use.

Creating a .pem with the Private Key and Entire Trust Chain

    Log into your DigiCert Management Console and download your Intermediate (DigiCertCA.crt) and Primary Certificates (your_domain_name.crt).

    Open a text editor (such as wordpad) and paste the entire body of each certificate into one text file in the following order:
        The Private Key - your_domain_name.key
        The Primary Certificate - your_domain_name.crt
        The Intermediate Certificate - DigiCertCA.crt
        The Root Certificate - TrustedRoot.crt

    Make sure to include the beginning and end tags on each certificate. The result should look like this:
    [BEGIN RSA PRIVATE KEY marker]
    (Your Private Key: your_domain_name.key)
    [END RSA PRIVATE KEY marker]

    -----BEGIN CERTIFICATE-----
    (Your Primary SSL certificate: your_domain_name.crt)
    -----END CERTIFICATE-----
    -----BEGIN CERTIFICATE-----
    (Your Intermediate certificate: DigiCertCA.crt)
    -----END CERTIFICATE-----
    -----BEGIN CERTIFICATE-----
    (Your Root certificate: TrustedRoot.crt)
    -----END CERTIFICATE-----

    Save the combined file as your_domain_name.pem. The .pem file is now ready to use.


id=__bundle_certs__
```

### 17.1.2 My example, bundle CA chain .cer into one .pem

```text
$ cat RootCA/ACS_CAforLDAP.cer > ca_chain.pem && cat InterPolicyCA/ACS_PolicyCAforLDAP.cer >> ca_chain.pem && cat InterIssuingCA/ACS_IssuingCAforLDAP.cer >> ca_chain.pem
$ cat  ca_chain.pem
-----BEGIN CERTIFICATE-----
MIIDfTCCAmWgAwIBAgIDFxwCMA0GCSqGSIb3DQEBBQUAMBcxFTATBgNVBAMTDEFD
U0NBZm9yTERBUDAeFw0xMzAxMTkyMjAwMDBaFw0xMzA3MTkyMTAwMDBaMGUxFjAU
BgNVBAMMDUFDU19DQWZvckxEQVAxCzAJBgNVBAYTAklMMQ4wDAYDVQQIDAVTdGF0
ZTEQMA4GA1UEBwwHTmF0YW5pYTEOMAwGA1UECgwFQ2lzY28xDDAKBgNVBAsMA0FD
UzCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKYA6mJCMRCRtPHYfneW
Dh3NpxZBXPUyDyt47Vw5vC/jmhpRXmtCVIRfp4V2xdSRXZNyCaEjP87ABkTIZDEB
QhfJuZYFD9QQ6GCGP/vJMFtzAKLiKZ9AaGgR7wH4MLggi0upTUJUveThRLXAZKD9
uEgx0mPEbm8lWn2wzl6TY2ukafZ0TZYs+ospG88xy8MUmXyFgpKPOVRyny/XIHrH
da0cMqgQEi2klR+RKN4HK34SxF9vAs5o8DdhEqKe/YXjCDmchfq0xKBFTrJFtk5L
Tx5Cfxm1kCvwwblJE0fgt8xqUxZ5FkPp9ZB6AWtlVi5B5KPkEPSjT89D982J7Cqr
bYUCAwEAAaOBgzCBgDAfBgNVHSMEGDAWgBT9ErHsnkwqjU260BdH9APPPk1AIDAd
BgNVHQ4EFgQU/RKx7J5MKo1NutAXR/QDzz5NQCAwDwYDVR0TAQH/BAUwAwEB/zAO
BgNVHQ8BAf8EBAMCAQYwHQYDVR0RBBYwFIISYWNzLWxkYXAwMS5hY3MuY29tMA0G
CSqGSIb3DQEBBQUAA4IBAQBkyM3Darsvi5B/1ifZBLUXwlHrMeh6sSbf7QHvBtTC
s7R6AEArFY6HFSxorbbWVg35IIaYmVDMyeDH6TDxHjVbtlT77GibZLZlEpJcP1w7
XPQS5YQhUpAizfFisndPAnEeEBikb9/u1zGBvCLFyh8ilfTsQStL3wKE0+7974J9
cE+6SjYHobpkjQFC0nswzmxPvF2aSL8qakf0Usk7pxcKm49h437QDLsqV7QtdOu0
aOX/0vKxEBzTg9vpnPcEM3TIZhqn3LUHNAlM01QHksSKfoJL6Jy/0YupY+QnQkog
ZQM0QZniZGWSzMuCjSf37OzR9FE1lyVJM8mAxMSPria5
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
MIID3jCCAsagAwIBAgIDFxwDMA0GCSqGSIb3DQEBBQUAMGUxDDAKBgNVBAsTA0FD
UzEOMAwGA1UEChMFQ2lzY28xEDAOBgNVBAcTB05hdGFuaWExDjAMBgNVBAgTBVN0
YXRlMQswCQYDVQQGEwJJTDEWMBQGA1UEAwwNQUNTX0NBZm9yTERBUDAeFw0xMzAx
MTkyMjAwMDBaFw0xMzA3MTkyMTAwMDBaMGsxHDAaBgNVBAMME0FDU19Qb2xpY3lD
QWZvckxEQVAxCzAJBgNVBAYTAklMMQ4wDAYDVQQIDAVTdGF0ZTEQMA4GA1UEBwwH
TmF0YW5pYTEOMAwGA1UECgwFQ2lzY28xDDAKBgNVBAsMA0FDUzCCASIwDQYJKoZI
hvcNAQEBBQADggEPADCCAQoCggEBAJIsYouKAsZzf4haesq/qyn2wU6Y4GwoUoWY
lQeHHI0X+n63x0w4q88y39PSUfEsmVzbUu2dFtWBj/7EsVsjglaKKNsmHYoro3aj
haU9BJfa+7EXTtyDmnD2lt6awm4BvzF+CVbS0TwpnNgmSLMOnflhImJkvcGCdhGp
6eEorCdTeI/4EsNsy+LSYobXOVt1iIp3X2mNV+covrPSCjNXmXFVxVBy4xYK/9+o
ZNymHdf+whHDVT26X7+zhfc+9n8fBw7a+4I6sWhMB270Jx6RUXV7LQmjheNgPVNa
C/8KNhqN5qxi3/exNY1jw4dYne1b40xx3ty8rrn1GBRwDOzuARcCAwEAAaOBkDCB
jTAfBgNVHSMEGDAWgBT9ErHsnkwqjU260BdH9APPPk1AIDAdBgNVHQ4EFgQUpLPS
uWypPF6UBvlziCdOCOLObfQwDwYDVR0TAQH/BAUwAwEB/zAOBgNVHQ8BAf8EBAMC
AQYwKgYDVR0RBCMwIYIZYWNzLXBvbGljeS1sZGFwMDEuYWNzLmNvbYcEAQIDBTAN
BgkqhkiG9w0BAQUFAAOCAQEAevreWas+f/emlniqRhlAWozLf8hWQe6MXfq5dyVn
fTtlZnH6NwNnfvTD/RxDLYdKYfNZP/GZ1u+dOqXX7QDGhvkoTgPMJIx6c5tD8Np0
nW7F5+y6ajHVJNAl9aYpJdrlaIKGW/g73rfMhePg/0F0ycpHu5HACG0MOSCp883K
uTYinChOAflE82fZszOsfifUg4JU7ACE3LW7vB4aFpI4Lmc2jDNxnMTJr08KG7HX
VqIO2gLuXtukSVYhDZJ6p4ZCcitAbsXzh9qV5O3f9Zo+fTUAGQ5BiFv4jV1rTNmH
5ZogeIgxTK9SFY4twEMdOuW4c/6a23WRgq8YBLRCgwuK/g==
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
MIID5jCCAs6gAwIBAgIDFxwEMA0GCSqGSIb3DQEBBQUAMGsxDDAKBgNVBAsTA0FD
UzEOMAwGA1UEChMFQ2lzY28xEDAOBgNVBAcTB05hdGFuaWExDjAMBgNVBAgTBVN0
YXRlMQswCQYDVQQGEwJJTDEcMBoGA1UEAwwTQUNTX1BvbGljeUNBZm9yTERBUDAe
Fw0xMzAxMTkyMjAwMDBaFw0xMzA3MTkyMTAwMDBaMGwxHTAbBgNVBAMMFEFDU19J
c3N1aW5nQ0Fmb3JMREFQMQswCQYDVQQGEwJJTDEOMAwGA1UECAwFU3RhdGUxEDAO
BgNVBAcMB05hdGFuaWExDjAMBgNVBAoMBUNpc2NvMQwwCgYDVQQLDANBQ1MwggEi
MA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCAfKtb7gYPz8UR8Dg+7TqFXQS+
xuiXraKlLbUY6pvDPT+aAqLOo9wTk4ugzAJBiv2eBlWG6ypTSXJrgSzaCgX5VBu/
cplg9NOUgchCdxnG7ZB7MiSWEJiA9Yg/dPzKBexJE7REVFv1yr8Lw61v4Qt4JyPd
YWR3TDhv0qPeMmSlhxw+328fgjDl1k9xSLEyXUs2WZt5NyuhZdSe+wl3kn6/D21u
FE6rYE5BQEaTxRd9c1hhf6TjqESespryv8iUOpDqO+8KJLnDslZ/heLG/cdeH9fU
D1ARi6+MAsvJwS3SyMAAlxc7xsub5RuQglRmZLvk2GxPqOyZMaNEQxI0ToJ7AgMB
AAGjgZEwgY4wHwYDVR0jBBgwFoAUpLPSuWypPF6UBvlziCdOCOLObfQwHQYDVR0O
BBYEFIdiLcXy/QnEfXaOJLMFX7mk6ag+MA8GA1UdEwEB/wQFMAMBAf8wDgYDVR0P
AQH/BAQDAgEGMCsGA1UdEQQkMCKCGmFjcy1pc3N1aW5nLWxkYXAwMS5hY3MuY29t
hwQBAgMGMA0GCSqGSIb3DQEBBQUAA4IBAQBeiFiuuQ51DG7pmI8xg9KWtuXTn4KT
Od81KPqXwEOH2yXxP3h37fD2B+nuE+/ueyH7T6tMNQ9Fs2bGXrg2UK7saVdtygLs
QJouMXhI6eNQCOVJqDCYQtTbL9Zcq5Na5Tz7VokfivjeowEL0s6xGYgyDVVaQwlO
Ihvm3gl7TSmoKf0UwoqdAJwbV1w3E3D/NbZBS81STx9QSfPKAUWZn/PNikhAc2vC
kJskigiQVEa9EBptyZ3VXydobbBXXEvZbVXVe4CPy583ufK9jsbK0Uw6Z4fe0szk
EJsST7rRPTYyv1hBUM871IRxxCn8GaWYl2q/PM6go6f/2n3QxrsVQWaM
-----END CERTIFICATE-----


$ cp Server/ACS_LDAP_Server.cer .
$ lt
total 16K
drwx------+ 1 Administrators Domain Users    0 Mar 10 10:23 RootCA/
drwx------+ 1 Administrators Domain Users    0 Mar 10 10:23 InterPolicyCA/
drwx------+ 1 Administrators Domain Users    0 Mar 10 10:23 InterIssuingCA/
drwx------+ 1 Administrators Domain Users    0 Mar 10 10:24 Server/
drwx------+ 1 Administrators Domain Users    0 Mar 10 10:24 CRL/
-rwx------+ 1 <user>          Domain Users 1.7K Mar 10 10:27 ACS_LDAP_Server.key*
-rw-r--r--+ 1 <user>          Domain Users 4.2K Mar 18 18:45 ca_chain.pem
-rwx------+ 1 <user>          Domain Users 1.5K Mar 18 18:46 ACS_LDAP_Server.cer*
$ cp Server/ACS_LDAP_Server.pvk  ACS_LDAP_Server.key
$ lt
total 16K
drwx------+ 1 Administrators Domain Users    0 Mar 10 10:23 RootCA/
drwx------+ 1 Administrators Domain Users    0 Mar 10 10:23 InterPolicyCA/
drwx------+ 1 Administrators Domain Users    0 Mar 10 10:23 InterIssuingCA/
drwx------+ 1 Administrators Domain Users    0 Mar 10 10:24 Server/
drwx------+ 1 Administrators Domain Users    0 Mar 10 10:24 CRL/
-rw-r--r--+ 1 <user>          Domain Users 4.2K Mar 18 18:45 ca_chain.pem
-rwx------+ 1 <user>          Domain Users 1.5K Mar 18 18:46 ACS_LDAP_Server.cer*
-rwx------+ 1 <user>          Domain Users 1.7K Mar 18 18:46 ACS_LDAP_Server.key*

		17.1.3

	17.2
```
