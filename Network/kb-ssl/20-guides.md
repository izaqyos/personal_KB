---
type: reference
title: Guides
description: Guide to setting up an OCSP responder and SSL server with OpenSSL.
tags: [ssl, certificates, openssl, howto, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "Network/sslKB#19"
---

# Guides

[↑ sslKB](/Network/kb-ssl/README.md)

## 19.1 OCSP

### 19.1.1 Setup OCSP and SSL server

```text
Hi,

Unzip attached archive (it will create sslocsp directory) 

cd ./sslocsp

Run OCSP server on port 8888:
openssl ocsp -index certindex.txt -port 8888 -rsigner ./server/ocsp.cer  -rkey ./server/ocsp.key  -CA ca/cacert.cer -text

You can use different index files with this command:
certindex.txt.norevoked
/ all certificates valid /

certindex.txt
revoked:
CN=policyCa_CAforACS
CN=user8
CN=machine9.cisco.com
CN=user9
CN=semantay-vm1
CN=semantay-vm4
CN=test1
CN=semantay-lnx

certindex.txt.saved
revoked:
CN=user9
CN=semantay-vm1
CN=test1
CN=semantay-lnx

test user0.cer => OK
openssl ocsp -issuer ./ca/cacert.cer -cert clients/user0.cer -url http://<yourip>:8888 -resp_text -CAfile ./ca/cacert.cer

test user8.cer => revoked
openssl ocsp -issuer ./ca/cacert.cer -cert clients/user8.cer -url http://<yourip>:8888 -resp_text -CAfile ./ca/cacert.cer

Run simple TLS/syslog server (no client verification) on port 4488:
openssl s_server -accept 4488 -cert server/server.cer -key server/server.key -pass pass:1234

Thanks,
Sergey

		19.1.2
	19.2
```
