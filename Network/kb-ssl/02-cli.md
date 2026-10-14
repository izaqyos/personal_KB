---
type: reference
title: CLI
description: "OpenSSL command line for inspecting a certificate: issuer, subject, validity dates and text dump."
tags: [openssl, certificates, x509, cheatsheet, legacy]
generated: { by: "human:izaqyos", at: "2026-10-14T00:00:00Z" }
stale_after: "2028-10-14T00:00:00Z"
status: stable
capture_type: source
legacy_source: "Network/sslKB#2"
sources:
  - { id: rfc8996, resource: "https://www.rfc-editor.org/rfc/rfc8996", title: "RFC 8996: Deprecating TLS 1.0 and TLS 1.1" }
  - { id: rfc7568, resource: "https://www.rfc-editor.org/rfc/rfc7568", title: "RFC 7568: Deprecating Secure Sockets Layer Version 3.0" }
  - { id: rfc7465, resource: "https://www.rfc-editor.org/rfc/rfc7465", title: "RFC 7465: Prohibiting RC4 Cipher Suites" }
  - { id: ossl-x509, resource: "https://docs.openssl.org/3.5/man1/openssl-x509/", title: "OpenSSL 3.5 manual: openssl-x509" }
  - { id: ossl-s_time, resource: "https://docs.openssl.org/3.5/man1/openssl-s_time/", title: "OpenSSL 3.5 manual: openssl-s_time" }
  - { id: ossl-s_client, resource: "https://docs.openssl.org/3.5/man1/openssl-s_client/", title: "OpenSSL 3.5 manual: openssl-s_client" }
  - { id: ossl-req, resource: "https://docs.openssl.org/3.5/man1/openssl-req/", title: "OpenSSL 3.5 manual: openssl-req" }
  - { id: ossl-pkcs12, resource: "https://docs.openssl.org/3.5/man1/openssl-pkcs12/", title: "OpenSSL 3.5 manual: openssl-pkcs12" }
  - { id: ossl-enc, resource: "https://docs.openssl.org/3.5/man1/openssl-enc/", title: "OpenSSL 3.5 manual: openssl-enc" }
  - { id: ossl-passwd, resource: "https://docs.openssl.org/3.5/man1/openssl-passwd/", title: "OpenSSL 3.5 manual: openssl-passwd" }
  - { id: ossl-smime, resource: "https://docs.openssl.org/3.5/man1/openssl-smime/", title: "OpenSSL 3.5 manual: openssl-smime" }
  - { id: ossl-cms, resource: "https://docs.openssl.org/3.5/man1/openssl-cms/", title: "OpenSSL 3.5 manual: openssl-cms" }
  - { id: ossl-releases, resource: "https://openssl-library.org/policies/releasestrat/", title: "OpenSSL release strategy (supported versions)" }
---

# CLI

[↑ sslKB](/Network/kb-ssl/README.md)

## 2.1 open a certificate.

> Updated 2026-10 to current practice.[^ossl-x509]

An SSL certificate contains a wide range of information: issuer, valid dates, subject, and some hardcore crypto stuff. The `x509` subcommand is the entry point for retrieving this information. The examples below all assume that the certificate you want to examine is stored in a file named `cert.pem`.

```bash
# the full breadth of information
openssl x509 -text -noout -in cert.pem

# who issued the cert?
openssl x509 -noout -in cert.pem -issuer

# to whom was it issued?
openssl x509 -noout -in cert.pem -subject

# for what dates is it valid?
openssl x509 -noout -in cert.pem -dates

# the above, all at once
openssl x509 -noout -in cert.pem -issuer -subject -dates

# which host names does it cover? (browsers ignore the CN, only the SAN counts)
openssl x509 -noout -in cert.pem -ext subjectAltName

# does it expire within the next 30 days? (exit status 1 if yes)
openssl x509 -noout -in cert.pem -checkend 2592000

# what is its subject hash value? (used for CA directory symlinks)
openssl x509 -noout -in cert.pem -hash

# what is its SHA-256 fingerprint?
openssl x509 -noout -in cert.pem -fingerprint -sha256
```

The old note called `-fingerprint` the "MD5 fingerprint". On current OpenSSL a bare `-fingerprint` prints a **SHA-1** fingerprint (it is SHA-1 unless you pass a digest); MD5 and SHA-1 fingerprints are both collision-prone, so pass `-sha256` and compare against SHA-256 fingerprints.[^ossl-x509]

## 2.2 Cheatsheet1, http://wiki.samat.org/CheatSheet/OpenSSL

```text
Create certificate request/unsigned key 
openssl req -nodes -new -keyout blah.key.pem -out blah.req.pem

blah.key.pem will act as an SSLCertificateKeyFile for mod_ssl in Apache

Show key fingerprint


openssl x509 -subject -dates -fingerprint -in blah.key.pem

Generate key


openssl genrsa -out blah.key.pem

Display certificate information


openssl x509 -in blah.crt.pem -noout -text

Creating a PEM file for servers


cat blah.key.pem blah.crt.pem blah.dhp.pem > blah.pem

Used by courier-imap, etc.

Creating a PKCS12-format file


openssl pkcs12 -export -in blah.crt.pem -inkey blah.key.pem -out blah.p12 -name "Bill Gates"

Used for creating certificates used in e-mail clients and web browsers

Signing e-mails


openssl smine -sign -in msg.txt -text -out msg.encrypted -signer blah.crt.pem -inkey blah.key.pem

Certificate Authority stuff

When setting up a new CA on a system, make sure index.txt and serial exist (empty and set to 01, respectively), and create directories private and newcert. Edit openssl.cnf - change default_days, certificate and private_key, possibly key size (1024, 1280, 1536, 2048) to whatever is desired.

Create CA certificate


openssl req -new -x509 -keyout private/something-CA.key.pem -out ./something-CA.crt.pem -days 3650

Export CA certificate in DER format


openssl x509 -in something-CA.crt.pem -outform der -out something-CA.crt

Used by web browsers.

Revoke certificate


openssl ca -revoke blah.crt.pem

Generate Certificate Revocation List (CRL)


openssl ca -gencrl -out crl/hotnudiegirls.com-CA.crl

Sign Certificate Request


openssl ca -out blah.crt.pem -in blah.req.pem

blah.crt.pem acts as SSLCertificateFile for Apache

Create Diffie-Hoffman Parameters for Current CA


openssl dhparam -out hotnudiegirls.com-CA.dhp.pem 1536

Create self-signed certificate from generated key


openssl req -new -x509 -key blah.key.pem -out blah.crt.pem

Use only when you've no CA and will only be generating one key/certificate (useless for anything that requires signed certificates on both ends)

Command-line tricks

Simple file encryption


openssl enc -bf -A -in file_to_encrypt.txt

Simple file decryption


openssl enc -bf -d -A -in file_to_encrypt.txt
```

## 2.3 OpenSSL Command-Line HOWTO

> Updated 2026-10 to current practice.[^rfc8996]

Paul Heinlein's HOWTO below was written for OpenSSL 0.9.8 (2004-2010). The original text is kept where it is still valid; the parts that relied on broken or removed crypto (SSLv3, MD5/SHA-1 digests, RC2/RC4/3DES, 1024-bit RSA/DSA keys, `crypt()` hashes) or on removed commands have been rewritten in place for current OpenSSL (3.5 is the current LTS series; examples were tested with 3.6).[^ossl-releases] Ground rules today:

- **Protocols:** TLS 1.3 and TLS 1.2 only. SSLv3 is deprecated (RFC 7568)[^rfc7568] and TLS 1.0/1.1 are deprecated (RFC 8996)[^rfc8996]; OpenSSL builds normally ship without SSLv3 at all.
- **Ciphers:** AEAD suites only (AES-GCM, ChaCha20-Poly1305) with ECDHE key exchange. RC4 is prohibited in TLS (RFC 7465)[^rfc7465]; avoid 3DES, RC2 and Blowfish.
- **Hashes:** SHA-256 or better. MD5 and SHA-1 are only acceptable for non-security checksums.
- **Keys:** RSA 3072 (2048 minimum), or ECDSA P-256 / Ed25519.

```text
Paul Heinlein <heinlein@madboa.com>
Initial publication: June 13, 2004
Most recent revision: July 16, 2010

The openssl application that ships with the OpenSSL libraries can perform a wide range of crypto operations. This HOWTO provides some cookbook-style recipes for using it.

Table of Contents

Introduction

    How do I find out what OpenSSL version I’m running?
    How do I get a list of the available commands?
    How do I get a list of available ciphers?

Benchmarking

    How do I benchmark my system’s performance?
    How do I benchmark remote connections?

Certificates

    How do I generate a self-signed certificate?
    How do I generate a certificate request for VeriSign?
    How do I test a new certificate?
    How do I retrieve a remote certificate?
    How do I extract information from a certificate?
    How do I export or import a PKCS#12 certificate?

Certificate Verification

    How do I verify a certificate?
    What certificate authorities does OpenSSL recognize?
    How do I get OpenSSL to recognize/verify a certificate?

Command-line clients and servers

    How do I connect to a secure SMTP server?
    How do I connect to a secure [whatever] server?
    How do I set up an SSL server from the command line?

Digests

    How do I create an MD5 or SHA1 digest of a file?
    How do I sign a digest?
    How do I verify a signed digest?
    How do I create an Apache digest password entry?
    What other kinds of digests are available?

Encryption/Decryption

    How do I base64-encode something?
    How do I simply encrypt a file?

Errors

    How do I interpret SSL error messages?

Keys

    How do I generate an RSA key?
    How do I generate a public RSA key?
    How do I generate a DSA key?
    How do I create an elliptic curve key?
    How do I remove a passphrase from a key?

Password hashes

    How do I generate a crypt-style password hash?
    How do I generate a shadow-style password hash?

Prime numbers

    How do I test whether a number is prime?
    How do I generate a set of prime numbers?

Random data

    How do I generate random data?

S/MIME

    How do I verify a signed S/MIME message?
    How do I encrypt a S/MIME message?
    How do I sign a S/MIME message?

For further reading
Comments welcome

Introduction

The openssl command-line binary that ships with the OpenSSL libraries can perform a wide range of cryptographic operations. It can come in handy in scripts or for accomplishing one-time command-line tasks.

Documentation for using the openssl application is somewhat scattered, however, so this article aims to provide some practical examples of its use. I assume that you’ve already got a functional OpenSSL installation and that the openssl binary is in your shell’s PATH.

Just to be clear, this article is strictly practical; it does not concern cryptographic theory and concepts. If you don’t know what an MD5 sum is, this article won’t enlighten you one bit—but if all you need to know is how to use openssl to generate a file sum, you’re in luck.

The nature of this article is that I’ll be adding new examples incrementally. Check back at a later date if I haven’t gotten to the information you need.
```

**Introduction (updated): version, commands, ciphers**

How do I find out what OpenSSL version I'm running? Use `version`; `-a` adds build details (the old 0.9.8 output listed `md2`, `rc4`, `des` build options, which are irrelevant on 3.x).

```bash
openssl version          # e.g. "OpenSSL 3.6.1 27 Jan 2026 (Library: OpenSSL 3.6.1 27 Jan 2026)"
openssl version -a       # build date, platform, OPENSSLDIR, MODULESDIR (providers) ...
openssl version -d       # just OPENSSLDIR
```

On macOS, `/usr/bin/openssl` is Apple's LibreSSL, not OpenSSL; install OpenSSL (e.g. Homebrew `openssl@3`) and check `which -a openssl`.

How do I get a list of the available commands? `openssl help` is a real command now (it used to be the "invalid command" trick), and `openssl list` replaces the old `list-*-commands` pseudo-commands:

```bash
openssl help                     # standard / digest / cipher commands
openssl list -commands
openssl list -digest-algorithms
openssl list -cipher-algorithms
openssl dgst -help               # every subcommand takes -help
```

How do I get a list of available ciphers? Use `ciphers` (see the ciphers(1) man page for the cipher-string syntax). TLS 1.3 suites are configured separately from TLS 1.2-and-below cipher lists and are always listed first:

```bash
# all ciphers this build supports, with protocol/kx/auth/enc/mac columns
openssl ciphers -v

# only ciphers usable with TLS 1.2 / TLS 1.3 (-s = only those actually supported)
openssl ciphers -s -v -tls1_2
openssl ciphers -s -v -tls1_3

# modern TLS 1.2 subset: ECDHE key exchange + AEAD encryption
openssl ciphers -v 'ECDHE+AESGCM:ECDHE+CHACHA20'
```

**Benchmarking (updated)**

How do I benchmark my system's performance? The `speed` command counts how many operations it can perform in a fixed time. With no arguments it runs everything; it's more useful to name the algorithms you actually deploy (the 2006 table in the original measured `md2`, `rc4`, `des`, 512/1024-bit RSA and DSA, none of which you should use):

```bash
# bulk encryption through the EVP interface (uses AES-NI / ARMv8 crypto)
openssl speed -evp aes-256-gcm
openssl speed -evp chacha20-poly1305

# signatures / key exchange at current key sizes
openssl speed rsa3072 ecdsap256 ed25519 ecdhx25519

# shorter runs, and on several cores
openssl speed -seconds 1 -multi 4 rsa3072
```

How do I benchmark remote connections? `s_time` opens as many TLS connections as it can for a given time (default 30 seconds) and reports connections per second; with neither `-new` nor `-reuse` it measures both new and resumed sessions.[^ossl-s_time] The original examples used `-ssl3`; SSLv3 is deprecated[^rfc7568] and default OpenSSL builds reject `-ssl3` as an unknown option. Use `-tls1_2` / `-tls1_3`, and note that `-cipher` only affects TLS 1.2 and below, while TLS 1.3 suites are chosen with `-ciphersuites`:[^ossl-s_time]

```bash
openssl s_time -connect remote.host:443

# retrieve remote test.html page using only new sessions
openssl s_time -connect remote.host:443 -www /test.html -new

# similar, forcing TLS 1.2 and strong AEAD ciphers
openssl s_time -connect remote.host:443 -www /test.html -new \
  -tls1_2 -cipher 'ECDHE+AESGCM'

# compare TLS 1.3 cipher suites in 10-second tests
for c in TLS_AES_128_GCM_SHA256 TLS_AES_256_GCM_SHA384 TLS_CHACHA20_POLY1305_SHA256; do
  echo "$c"
  openssl s_time -connect remote.host:443 -www / -new -time 10 -ciphersuites "$c" 2>&1 | grep 'connections in'
done

# compare TLS 1.2 ECDHE ciphers
IFS=":"
for c in $(openssl ciphers 'ECDHE+AESGCM:ECDHE+CHACHA20'); do
  case $c in TLS_*) continue ;; esac   # skip the TLS 1.3 suites ciphers(1) lists first
  echo "$c"
  openssl s_time -connect remote.host:443 -www / -new -time 10 -tls1_2 -cipher "$c" 2>&1 | grep 'connections in'
done
unset IFS
```

If you don't have a TLS web server available, emulate one with `s_server`:

```bash
# on one host, set up the server (default port 4433)
openssl s_server -cert mycert.pem -key mykey.pem -www

# on a second host (or the same one), run s_time
openssl s_time -connect myhost:4433 -www / -new -tls1_3
```

**Certificates (updated)**

How do I generate a self-signed certificate? First decide whether to encrypt the private key with a passphrase. That makes a stolen key less useful, but you must type or store the passphrase whenever the server starts; the original author preferred unencrypted keys for daemons, which is what `-noenc` gives you (it replaces the deprecated `-nodes`).[^ossl-req]

Two things changed since the original: 1024-bit RSA is far too weak (use RSA 3072, or ECDSA P-256), and clients match host names against the **subjectAltName** extension, not the Common Name, so always add a SAN. Without `-days`, `req -x509` certificates are only valid for 30 days.[^ossl-req]

```bash
# RSA 3072 key + self-signed cert valid for 365 days, key unencrypted
openssl req -x509 -noenc -days 365 \
  -newkey rsa:3072 -keyout mykey.pem -out mycert.pem \
  -subj '/C=US/ST=Oregon/L=Portland/CN=www.example.com' \
  -addext 'subjectAltName=DNS:www.example.com,DNS:example.com'

# same with an ECDSA P-256 key (smaller and faster)
openssl req -x509 -noenc -days 365 \
  -newkey ec -pkeyopt ec_paramgen_curve:P-256 -keyout mykey.pem -out mycert.pem \
  -subj '/CN=www.example.com' -addext 'subjectAltName=DNS:www.example.com'
```

Without `-subj` you are prompted for Country, State, City and so on. Use the host name people will type (e.g. `www.example.com`, not the box's real name) in the SAN, and as CN by convention.

How do I generate a certificate request (CSR) for a public CA? The original said "VeriSign"; today it's any CA, including free ACME CAs such as Let's Encrypt, whose clients (certbot, acme.sh, ...) generate the key and CSR for you. To do it by hand:

```bash
# new key + CSR, key unencrypted
openssl req -new -noenc \
  -newkey rsa:3072 -keyout mykey.pem -out myreq.pem \
  -subj '/C=US/ST=Oregon/L=Portland/O=My Dom, Inc./CN=www.mydom.com' \
  -addext 'subjectAltName=DNS:www.mydom.com,DNS:mydom.com'

# CSR for an existing key
openssl req -new -key mykey.pem -out myreq.pem

# verify the CSR self-signature, and check its contents
openssl req -in myreq.pem -noout -verify
openssl req -in myreq.pem -noout -text
```

For organisation-validated certificates the CA still checks the subject details exactly (the original author notes that even "and" vs "&" in the Organization Name stalled the process). Keep the key file in a secure location; you need it to use the certificate the CA sends you.

```text
How do I test a new certificate?

The s_server option provides a simple but effective testing method. The example below assumes you’ve combined your key and certificate into one file called mycert.pem.

First, launch the test server on the machine on which the certificate will be used. By default, the server will listen on port 4433; you can alter that using the -accept option.

openssl s_server -cert mycert.pem -www

If the server launches without complaint, then chances are good that the certificate is ready for production use.

You can also point your web browser at the test server, e.g., https://yourserver:4433/. Don’t forget to specify the “https” protocol; plain-old “http” won’t work. You should see a page listing the various ciphers available and some statistics about your connection. Most modern browsers allow you to examine the certificate as well.
How do I retrieve a remote certificate?

If you combine openssl and sed, you can retrieve remote certificates via a shell one-liner or a simple script.

#!/bin/sh
#
# usage: retrieve-cert.sh remote.host.name [port]
#
REMHOST=$1
REMPORT=${2:-443}

echo |\
openssl s_client -connect ${REMHOST}:${REMPORT} 2>&1 |\
sed -ne '/-BEGIN CERTIFICATE-/,/-END CERTIFICATE-/p'

You can, in turn, pipe that information back to openssl to do things like check the dates on all your active certificates.

#!/bin/sh
#
for CERT in \
  www.yourdomain.com:443 \
  ldap.yourdomain.com:636 \
  imap.yourdomain.com:993 \
do
  echo |\
  openssl s_client -connect ${CERT} 2>/dev/null |\
  sed -ne '/-BEGIN CERTIFICATE-/,/-END CERTIFICATE-/p' |\
  openssl x509 -noout -subject -dates
done

```

How do I extract information from a certificate? See section 2.1 above; in short:

```bash
openssl x509 -text -noout -in cert.pem
openssl x509 -noout -in cert.pem -issuer -subject -dates -ext subjectAltName
openssl x509 -noout -in cert.pem -fingerprint -sha256     # was: MD5 fingerprint
```

(<user>) Note: if the cert is in another format (say DER) you need to tell that to OpenSSL, otherwise you get an error such as `PEM routines:PEM_read_bio:no start line ... Expecting: TRUSTED CERTIFICATE`:

```bash
openssl x509 -inform DER -text -noout -in cert_R01P01I01U.cer
```

How do I export or import a PKCS#12 certificate? PKCS#12 files (`.pfx`, `.p12`) bundle a private key and its certificate chain. Since OpenSSL 3.0 they are encrypted with AES-256-CBC + PBKDF2 and MACed with SHA-256 by default; very old consumers (e.g. old Java or Windows versions) may need `-legacy`, which falls back to RC2/3DES.[^ossl-pkcs12] `-noenc` replaces the deprecated `-nodes` here too.

```bash
# create key and self-signed certificate (see above)
openssl req -x509 -noenc -days 365 -newkey rsa:3072 \
  -keyout mykey.pem -out mycert.pem -subj '/CN=www.example.com' \
  -addext 'subjectAltName=DNS:www.example.com'

# export as PKCS#12 (you are prompted for an export password)
openssl pkcs12 -export -inkey mykey.pem -in mycert.pem \
  -out mycert.pfx -name "My Certificate"

# show what's inside (algorithms, bags)
openssl pkcs12 -in mycert.pfx -info -noout

# import: certificate + passphrase-less key as PEM
openssl pkcs12 -in mycert.pfx -out mycert.pem -noenc

# same, but you're prompted for a passphrase to encrypt the private key
openssl pkcs12 -in mycert.pfx -out mycert.pem
```

```text
Certificate Verification

Applications linked against the OpenSSL libraries can verify certificates signed by a recognized certificate authority (CA).
How do I verify a certificate?

Use the verify option to verify certificates.

openssl verify cert.pem

If your local OpenSSL installation recognizes the certificate or its signing authority and everything else (dates, signing chain, etc.) checks out, you’ll get a simple OK message.

$ openssl verify remote.site.pem
remote.site.pem: OK

If anything is amiss, you’ll see some error messages with short descriptions of the problem, e.g.,

    *

      error 10 at 0 depth lookup:certificate has expired. Certificates are typically issued for a limited period of time—usually just one year—and openssl will complain if a certificate has expired.
    *

      error 18 at 0 depth lookup:self signed certificate. Unless you make an exception, OpenSSL won’t verify a self-signed certificate.

What certificate authorities does OpenSSL recognize?

When OpenSSL was built for your system, it was configured with a “Directory for OpenSSL files.” (That’s the --openssldir option passed to the configure script, for you hands-on types.) This is the directory that typically holds information about certificate authorities your system trusts.

The default location for this directory is /usr/local/ssl, but most vendors put it elsewhere, e.g., /usr/share/ssl (Red Hat/Fedora), /etc/ssl (Gentoo), /usr/lib/ssl (Debian), or /System/Library/OpenSSL (Macintosh OS X).

Use the version option to identify which directory (labeled OPENSSLDIR) your installation uses.

openssl version -d

Within that directory and a subdirectory called certs, you’re likely to find one or more of three different kinds of files.

   a.  A large file called cert.pem, an omnibus collection of many certificates from recognized certificate authorities like VeriSign and Thawte.
   b.  Some small files in the certs subdirectory named with a .pem file extension, each of which contains a certificate from a single CA.
   c.  Some symlinks in the certs subdirectory with obscure filenames like 052eae11.0. There is typically one of these links for each .pem file.

      The first part of obscure filename is actually a hash value based on the certificate within the .pem file to which it points. The file extension is just an iterator, since it’s theoretically possible that multiple certificates can generate identical hashes.

      On my Gentoo system, for example, there’s a symlink named f73e89fd.0 that points to a file named vsignss.pem. Sure enough, the certificate in that file generates a hash the equates to the name of the symlink:

      $ openssl x509 -noout -hash -in vsignss.pem
      f73e89fd

When an application encounters a remote certificate, it will typically check to see if the cert can be found in cert.pem or, if not, in a file named after the certificate’s hash value. If found, the certificate is considered verified.

It’s interesting to note that some applications, like Sendmail, allow you to specify at runtime the location of the certificates you trust, while others, like Pine, do not.
How do I get OpenSSL to recognize/verify a certificate?

Put the file that contains the certificate you’d like to trust into the certs directory discussed above. Then create the hash-based symlink. Here’s a little script that’ll do just that.

#!/bin/sh
#
# usage: certlink.sh filename [filename ...]

for CERTFILE in $*; do
  # make sure file exists and is a valid cert
  test -f "$CERTFILE" || continue
  HASH=$(openssl x509 -noout -hash -in "$CERTFILE")
  test -n "$HASH" || continue

  # use lowest available iterator for symlink
  for ITER in 0 1 2 3 4 5 6 7 8 9; do
    test -f "${HASH}.${ITER}" && continue
    ln -s "$CERTFILE" "${HASH}.${ITER}"
    test -L "${HASH}.${ITER}" && break
  done
done

```

**Command-line clients and servers (updated)**

The `s_client` and `s_server` commands launch TLS-enabled command-line clients and servers. This assumes you're familiar with the protocols at issue (SMTP, HTTP, etc.).

How do I connect to a secure SMTP (or other) server? The original said OpenSSL could only do STARTTLS for SMTP; current `s_client -starttls` supports smtp, pop3, imap, ftp, xmpp, xmpp-server, irc, postgres, mysql, lmtp, nntp, sieve and ldap. SNI is sent automatically using the `-connect` host name (override with `-servername`).[^ossl-s_client] Mail ports today: 465 = implicit TLS submission, 587 = submission with STARTTLS, 25 = server-to-server with opportunistic STARTTLS.

```bash
# STARTTLS on port 587 (or 25)
openssl s_client -connect remote.host:587 -starttls smtp -crlf

# implicit TLS (port 465)
openssl s_client -connect remote.host:465 -crlf

# https, ldaps, imaps, pop3s
openssl s_client -connect remote.host:443
openssl s_client -connect remote.host:636
openssl s_client -connect remote.host:993
openssl s_client -connect remote.host:995

# useful extras: brief summary, fail on a bad cert, show the chain the server sent, force a protocol
openssl s_client -connect remote.host:443 -brief -verify_return_error
openssl s_client -connect remote.host:443 -showcerts </dev/null
openssl s_client -connect remote.host:443 -tls1_3
```

`-crlf` translates LF to CRLF; RFC 5321 requires CRLF line endings and some servers (the original mentions Qmail) insist on them.

How do I set up a TLS server from the command line? `s_server` is for testing and debugging only; for a production-quality TLS wrapper use stunnel or a reverse proxy.

```bash
# -www sends back an HTML status page (cipher, session info) to any HTTP client
openssl s_server -cert mycert.pem -key mykey.pem -www

# -WWW emulates a simple web server serving files relative to the current directory;
# listen on 8443 instead of the default 4433
openssl s_server -accept 8443 -cert mycert.pem -key mykey.pem -WWW
```

**Digests (updated)**

How do I create a SHA-256 digest of a file? Use `dgst`; its default digest is SHA-256 (it was MD5 before OpenSSL 1.1.0). The results match `sha256sum` / `shasum -a 256`, only the output format differs. Use MD5/SHA-1 only to compare against legacy published checksums, never for security.

```bash
openssl dgst -sha256 foo-2.23.tar.gz
# SHA2-256(foo-2.23.tar.gz)= <64 hex digits>
sha256sum foo-2.23.tar.gz          # shasum -a 256 on macOS

openssl dgst -sha512 foo-2.23.tar.gz
openssl dgst -sha3-256 foo-2.23.tar.gz
```

How do I sign a digest, and verify it? Sign with your private key and a SHA-256 digest (the original also had a missing `\` after `-sign mykey.pem`). The verifier needs the file, the signature, and your public key:

```bash
# signature will be foo-1.23.tar.gz.sig
openssl dgst -sha256 -sign mykey.pem -out foo-1.23.tar.gz.sig foo-1.23.tar.gz

# extract the public key once and publish it
openssl pkey -in mykey.pem -pubout -out pubkey.pem

# verify ("Verified OK")
openssl dgst -sha256 -verify pubkey.pem -signature foo-1.23.tar.gz.sig foo-1.23.tar.gz
```

With an Ed25519 key, sign the file directly (EdDSA hashes internally, so no `-sha256`):

```bash
openssl pkeyutl -sign   -inkey ed25519.pem -rawin -in foo-1.23.tar.gz -out foo-1.23.tar.gz.sig
openssl pkeyutl -verify -pubin -inkey ed25519-pub.pem -rawin -in foo-1.23.tar.gz -sigfile foo-1.23.tar.gz.sig
```

How do I create an Apache digest password entry? Apache's `AuthType Digest` file format is `user:realm:MD5(user:realm:password)`; the MD5 is fixed by the file format Apache's digest module uses, so this script still needs `-md5`. `htdigest` itself can only write to a file; this prints the entry to stdout instead. Prefer `AuthType Basic` over HTTPS with a bcrypt `htpasswd -B` file for new setups.

```bash
#!/bin/bash
echo "Create an Apache-friendly Digest Password Entry"
echo "-----------------------------------------------"

# get user input, disabling tty echoing for password
read -r -p "Enter username: " UNAME
read -r -p "Enter Apache AuthName: " AUTHNAME
read -r -s -p "Enter password: " PWORD; echo

printf '\n%s:%s:%s\n' "$UNAME" "$AUTHNAME" \
  "$(printf '%s:%s:%s' "$UNAME" "$AUTHNAME" "$PWORD" | openssl dgst -md5 -r | cut -d' ' -f1)"
```

What other kinds of digests are available? `openssl list -digest-algorithms` (the old `list-message-digest-commands` was removed in OpenSSL 1.1.0).

**Encryption/Decryption (updated)**

How do I base64-encode something? Use `enc -base64` (or simply `openssl base64`). `echo` appends a newline; use `printf` or `echo -n` when encoding a password or token.

```bash
openssl enc -base64 -in file.txt                    # to stdout
openssl enc -base64 -in file.txt -out file.txt.b64

printf 'encode me' | openssl base64                 # ZW5jb2RlIG1l
echo 'ZW5jb2RlIG1lCg==' | openssl base64 -d         # encode me
```

How do I simply encrypt a file? For anything real, use a purpose-built tool such as `age` or GPG. `openssl enc` works, but it has no authentication (it does not support AEAD modes such as GCM), and without `-pbkdf2` it derives the key with a single hash iteration, which is trivially brute-forced. Always pass `-pbkdf2` (default 10000 iterations; raise it with `-iter`) and the same options again when decrypting.[^ossl-enc]

```bash
# list cipher names this build supports
openssl enc -list

# encrypt file.txt to file.enc using AES-256-CBC, PBKDF2 key derivation
openssl enc -aes-256-cbc -salt -pbkdf2 -iter 600000 -in file.txt -out file.enc

# same, base64 output (-a) for pasting into e-mail
openssl enc -aes-256-cbc -salt -pbkdf2 -iter 600000 -a -in file.txt -out file.enc

# decrypt (cipher, -pbkdf2 and -iter must match)
openssl enc -d -aes-256-cbc -pbkdf2 -iter 600000 -in file.enc -out file.txt
openssl enc -d -aes-256-cbc -pbkdf2 -iter 600000 -a -in file.enc -out file.txt
```

To avoid typing the passphrase, see "Pass Phrase Options" in openssl-passphrase-options(1). Avoid `-pass pass:<password>`, which leaks the password into `ps` output and shell history; read it from a file or environment variable instead:

```bash
openssl enc -aes-256-cbc -salt -pbkdf2 -in file.txt -out file.enc -pass file:/path/to/secret/password.txt
openssl enc -aes-256-cbc -salt -pbkdf2 -in file.txt -out file.enc -pass env:ENC_PASSWORD
```

```text
Errors
How do I interpret SSL error messages?

Poking through your system logs, you see some error messages that are evidently related to OpenSSL or crypto:

sshd[31784]: error: RSA_public_decrypt failed: error:0407006A:lib(4):func(112):reason(106)
sshd[770]: error: RSA_public_decrypt failed: error:0407006A:lib(4):func(112):reason(106)

The first step to figure out what’s going wrong is to use the errstr option to intrepret the error code. The code number is found between “error:” and “:lib”. In this case, it’s 0407006A.

$ openssl errstr 0407006A
error:0407006A:rsa routines:RSA_padding_check_PKCS1_type_1:block type is not 01

If you’ve got a full OpenSSL installation, including all the development documentation, you can start your investigation there. In this example, the RSA_padding_add_PKCS1_type_1(3) man page will inform you that PKCS #1 involves block methods for signatures. After that, of course, you’d need to pore through your application’s source code to identify when it would expect be receiving those sorts of packets.
```

**Keys (updated)**

How do I generate a private key? `genpkey` is the generic command for all key types; `genrsa` still works (its default is 2048 bits on current versions). Use RSA 3072, or EC / Ed25519. To protect the key with a passphrase use AES (`-aes-256-cbc` / `-aes256`) rather than the old `-des3`.

```bash
# RSA 3072, unencrypted
openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:3072 -out mykey.pem

# same, encrypted with a passphrase (you are prompted)
openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:3072 -aes-256-cbc -out mykey.pem

# legacy-style equivalent
openssl genrsa -aes256 -out mykey.pem 3072

# elliptic curve P-256 key, and Ed25519
openssl genpkey -algorithm EC -pkeyopt ec_paramgen_curve:P-256 -out eckey.pem
openssl genpkey -algorithm ed25519 -out ed25519.pem

# list named curves
openssl ecparam -list_curves
```

How do I get the public key? `pkey` works for every key type (RSA, EC, Ed25519):

```bash
openssl pkey -in mykey.pem -pubout -out pubkey.pem
```

DSA keys (the original's `dsaparam -genkey 1024` / `gendsa` recipe): DSA is obsolete; it is no longer approved for generating signatures in FIPS 186-5 and is unsupported in TLS 1.3. Use Ed25519 or ECDSA instead.

How do I remove a passphrase from a key? `pkey` decrypts any key type (you're prompted for the passphrase one last time):

```bash
openssl pkey -in key.pem -out newkey.pem

# key and certificate stored in one file mycert.pem
openssl pkey -in mycert.pem -out newcert.pem
openssl x509 -in mycert.pem >> newcert.pem
```

**Password hashes (updated)**

`openssl passwd` generates hashes for `/etc/shadow` and Apache password files. The traditional `crypt()` (DES) format was removed in OpenSSL 3.0, and the default (`-1`, MD5-based) is obsolete; use `-6` (SHA-512-based, the `$6$` format) or `-5` (SHA-256-based).[^ossl-passwd] (Current Linux distributions default to yescrypt or SHA-512 via `mkpasswd`/`chpasswd`.)

```bash
# prompts for the password (keeps it out of shell history)
openssl passwd -6

# with a known salt you can reproduce a hash, e.g. to check a password
openssl passwd -6 -salt sXiKzkus 'YOUR_PASSWORD'
# $6$sXiKzkus$<86-character hash>
```

The salt is the text between the second and third `$` signs. For Apache basic-auth files prefer `htpasswd -B` (bcrypt); `openssl passwd -apr1` produces the older MD5-based Apache format.

```text
Prime numbers

Current cryptographic techniques rely heavily on the generation and testing of prime numbers, so it’s no surprise that the OpenSSL libraries contain several routines dealing with primes. Beginning with version 0.9.7e (or so), the prime option was added to the openssl binary.
How do I test whether a number is prime?

Pass the number to the prime option. Note that the number returned by openssl will be in hex, not decimal, format.

$ openssl prime 119054759245460753
1A6F7AC39A53511 is not prime

You can also pass hex numbers directly.

$ openssl prime -hex 2f
2F is prime

How do I generate a set of prime numbers?

Pass a bunch of numbers to openssl and see what sticks. The seq utility is useful in this capacity.

# define start and ending points
AQUO=10000
ADQUEM=10100
for N in $(seq $AQUO $ADQUEM); do
  # use bc to convert hex to decimal
  openssl prime $N | awk '/is prime/ {print "ibase=16;"$1}' | bc
done

Random data
How do I generate random data?

Use the rand option to generate binary or base64-encoded data.

# write 128 random bytes of base64-encoded data to stdout
openssl rand -base64 128

# write 1024 bytes of binary random data to a file
openssl rand -out random-data.bin 1024

# seed openssl with semi-random bytes from browser cache
cd $(find ~/.mozilla/firefox -type d -name Cache)
openssl rand -rand $(find . -type f -printf '%f:') -base64 1024

On a Unix box with a /dev/urandom device and a copy of GNU head, or a recent version of BSD head, you can achieve a similar effect, often with better entropy:

# get 32 bytes from /dev/urandom and base64 encode them
head -c 32 /dev/urandom | openssl enc -base64

You can get a wider variety of characters than what's offered using Base64 encoding by using strings:

# get 32 bytes from /dev/random, grab printable characters, and
# strip whitespace. using echo and the shell's command substitution
# will nicely strip out newlines.
echo $(head -c 32 /dev/random | strings -1) | sed 's/[[:space:]]//g'

Make sure you know the trade-offs between the random and urandom devices before relying on them for truly critical entropy. Consult the random(4) man page on Linux and BSD systems, or random(7D) on Solaris, for further information.
S/MIME

S/MIME is a standard for sending and receiving secure MIME data, especially in e-mail messages. Automated S/MIME capabilities have been added to quite a few e-mail clients, though openssl can provide command-line S/MIME services using the smime option.

Note that the documentation in the smime(1) man page includes a number of good examples.
How do I verify a signed S/MIME message?

It’s pretty easy to verify a signed message. Use your mail client to save the signed message to a file. In this example, I assume that the file is named msg.txt.

openssl smime -verify -in msg.txt

If the sender’s certificate is signed by a certificate authority trusted by your OpenSSL infrastructure, you’ll see some mail headers, a copy of the message, and a concluding line that says Verification successful.

If the messages has been modified by an unauthorized party, the output will conclude with a failure message indicating that the digest and/or the signature doesn’t match what you received:

Verification failure
23016:error:21071065:PKCS7 routines:PKCS7_signatureVerify:digest
failure:pk7_doit.c:804:
23016:error:21075069:PKCS7 routines:PKCS7_verify:signature
failure:pk7_smime.c:265:

Likewise, if the sender’s certificate isn’t recognized by your OpenSSL infrastructure, you’ll get a similar error:

Verification failure
9544:error:21075075:PKCS7 routines:PKCS7_verify:certificate verify
error:pk7_smime.c:222:Verify error:self signed certificate

Most e-mail clients send a copy of the public certificate in the signature attached to the message. From the command line, you can view the certificate data yourself. You’ll use the smime -pk7out option to pipe a copy of the PKCS#7 certificate back into the pkcs7 option. It’s oddly cumbersome but it works.

openssl smime -pk7out -in msg.txt | \
openssl pkcs7 -text -noout -print_certs

If you’d like to extract a copy of your correspondent’s certificate for long-term use, use just the first part of that pipe.

openssl smime -pk7out -in msg.txt -out her-cert.pem

At that point, you can either integrate it into your OpenSSL infrastructure or you can save it off somewhere for special use.

openssl smime -verify -in msg.txt -CAfile /path/to/her-cert.pem

```

How do I encrypt an S/MIME message? Say someone sends you her public certificate (`her-cert.pem`) and you want to encrypt `my-message.txt` to her. The original said the default cipher was the "fairly weak" RC2-40 and recommended triple DES; current OpenSSL defaults to AES-256-CBC, so no cipher option is needed.[^ossl-smime] `smime` implements the old S/MIME v2 (RFC 2311); for new messages the docs recommend `openssl cms`, which also supports AES-GCM.[^ossl-cms]

```bash
# smime, AES-256-CBC by default
openssl smime -encrypt -in my-message.txt -out encrypted.msg her-cert.pem

# cms with authenticated encryption
openssl cms -encrypt -aes-256-gcm -in my-message.txt -out encrypted.msg her-cert.pem

# recipient side
openssl cms -decrypt -in encrypted.msg -recip her-cert.pem -inkey her-key.pem
```

The encrypted message, including mail headers, goes to standard output unless you use `-out`. You can also pipe it directly to sendmail:

```bash
openssl cms -encrypt -aes-256-gcm -in my-message.txt \
  -from 'Your Fullname <you@youraddress.com>' \
  -to 'Her Fullname <her@heraddress.com>' \
  -subject 'My encrypted reply' \
  her-cert.pem | sendmail her@heraddress.com
```

```text
How do I sign a S/MIME message?

If you don’t need to encrypt the entire message, but you do want to sign it so that your recipient can be assured of the message’s integrity, the recipe is similar to that for encryption. The main difference is that you need to have your own key and certificate, since you can’t sign anything with the recipient’s cert.

openssl smime \
  -sign \
  -signer /path/to/your-cert.pem \
  -in my-message.txt \
  -from 'Your Fullname <you@youraddress.com>' \
  -to 'Her Fullname <her@heraddress.com>' \
  -subject 'My signed reply' |\
sendmail her@heraddress.com

For further reading

Though it takes time to read them all and figure out how they relate to one another, the OpenSSL man pages are the best place to start: asn1parse(1), ca(1), ciphers(1), config(5), crl(1), crl2pkcs7(1), dgst(1), dhparam(1), dsa(1), dsaparam(1), ec(1), ecparam(1), enc(1), errstr(1), gendsa(1), genpkey(1), genrsa(1), nseq(1), ocsp(1), openssl(1), passwd(1), pkcs12(1), pkcs7(1), pkcs8(1), pkey(1), pkeyparam(1), pkeyutl(1), rand(1), req(1), rsa(1), rsautl(1), s_client(1), s_server(1), s_time(1), sess_id(1), smime(1), speed(1), spkac(1), ts(1), tsget(1), verify(1), version(1), x509(1), x509v3_config(5).
```

## 2.4 conversions

```text
Use the openssl command to convert between formats as follows:
```

### 2.4.1 PEM -> DER

```text
To convert a certificate from PEM to DER:
$ openssl x509 -in x509/server-ca-crt.pem -inform PEM -out x509/server-ca-crt.der   -outform DER

To convert a key from PEM to DER:
rsa –in input.key –inform PEM –out output.key –outform DER
```

### 2.4.2 DER -> PEM

```text
To convert a certificate from DER to PEM:
x509 –in input.crt –inform DER –out output.crt –outform PEM
To convert a key from DER to PEM:
rsa –in input.key –inform DER –out output.key –outform PEM
```

### 2.4.3 JKS to PFX

```text
install java. it will install keytool as well. then:
keytool -importkeystore -deststorepass <store password> -destkeypass <key password> -destkeystore <dest store name>.pfx -srckeystore <src jks name>.jks -srcstoretype JKS -srcstorepass <src store pwd>
ex:
keytool -importkeystore -deststorepass secret -destkeypass Welcome1! -destkeystore daniel.pfx -srckeystore certificateStore.jks -srcstoretype JKS -srcstorepass Welcome1!

Note that the pfx passphrase is secret, the private key password is Welcome1!

use same password for both client cert and private key.
$ keytool -importkeystore -deststorepass secret -destkeypass secret -destkeystore daniel.pfx -srckeystore certificateStore.jks -srcstoretype JKS -srcstorepass Welcome1!

read pfx content
$  openssl pkcs12 -info -in  daniel.pfx 
Enter Import Password: secret
MAC: sha1, Iteration 100000
MAC length: 20, salt length: 20
PKCS7 Data
Shrouded Keybag: pbeWithSHA1And3-KeyTripleDES-CBC, Iteration 50000
Bag Attributes
    friendlyName: <internal-host>
    localKeyID: 54 69 6D 65 20 31 36 31 32 39 34 35 30 39 34 38 34 33 
Key Attributes: <No Attributes>
Enter PEM pass phrase: secret
Verifying - Enter PEM pass phrase: secret
-----BEGIN ENCRYPTED PRIVATE KEY-----
...
-----END ENCRYPTED PRIVATE KEY-----
PKCS7 Encrypted data: pbeWithSHA1And40BitRC2-CBC, Iteration 50000
Certificate bag
Bag Attributes
    friendlyName: <internal-host>
    localKeyID: 54 69 6D 65 20 31 36 31 32 39 34 35 30 39 34 38 34 33 
subject=C = DE, ST = Baden-W\C3\BCrttemberg, L = Walldorf, O = SAP SE, CN = <internal-host>

issuer=C = US, O = DigiCert Inc, CN = DigiCert Baltimore TLS RSA SHA256 2020 CA1

-----BEGIN CERTIFICATE-----
...
-----END CERTIFICATE-----
Certificate bag
Bag Attributes
    friendlyName: CN=DigiCert Baltimore TLS RSA SHA256 2020 CA1,O=DigiCert Inc,C=US
subject=C = US, O = DigiCert Inc, CN = DigiCert Baltimore TLS RSA SHA256 2020 CA1

issuer=C = IE, O = Baltimore, OU = CyberTrust, CN = Baltimore CyberTrust Root

-----BEGIN CERTIFICATE-----
...
-----END CERTIFICATE-----
Certificate bag
Bag Attributes
    friendlyName: CN=Baltimore CyberTrust Root,OU=CyberTrust,O=Baltimore,C=IE
subject=C = IE, O = Baltimore, OU = CyberTrust, CN = Baltimore CyberTrust Root

issuer=C = IE, O = Baltimore, OU = CyberTrust, CN = Baltimore CyberTrust Root

-----BEGIN CERTIFICATE-----
...
-----END CERTIFICATE-----


	    2.4.4
```

## 2.5 How To Verify SSL Certificate From A Shell Prompt

```text
ow do I verify and diagnosis SSL certification installation from a Linux / UNIX shell prompt? How do I validate SSL Certificate installation and save hours of troubleshooting headaches without using a browser? How do I confirm I've the correct and working SSL certificates?

OpenSSL comes with a generic SSL/TLS client which can establish a transparent connection to a remote server speaking SSL/TLS. It’s intended for testing purposes only and provides only rudimentary interface functionality but internally uses mostly all functionality of the OpenSSL ssl library. For testing purpose I will use mail.nixcraft.net:443 SSL certificate which is issued by Go Daddy.
Step # 1: Getting The Certificate

Create directory to store certificate:
$ mkdir -p ~/.cert/mail.nixcraft.net/
$ cd ~/.cert/mail.nixcraft.net/
Retrieve the mail.nixcraft.net certificate provided by the nixcraft HTTPD mail server:
$ openssl s_client -showcerts -connect mail.nixcraft.net:443
Sample output:

CONNECTED(00000003)
depth=0 /O=mail.nixcraft.net/CN=mail.nixcraft.net/OU=Domain Control Validated
verify error:num=20:unable to get local issuer certificate
verify return:1
depth=0 /O=mail.nixcraft.net/CN=mail.nixcraft.net/OU=Domain Control Validated
verify error:num=27:certificate not trusted
verify return:1
depth=0 /O=mail.nixcraft.net/CN=mail.nixcraft.net/OU=Domain Control Validated
verify error:num=21:unable to verify the first certificate
verify return:1
---
Certificate chain
 0 s:/O=mail.nixcraft.net/CN=mail.nixcraft.net/OU=Domain Control Validated
   i:/C=US/ST=Arizona/L=Scottsdale/O=GoDaddy.com, Inc./OU=http://certificates.godaddy.com/repository/CN=Go Daddy Secure Certification Authority/serialNumber=07969287
-----BEGIN CERTIFICATE-----
MIIE5zCCA8+gAwIBAgIEAOJk2zANBgkqhkiG9w0BAQUFADCByjELMAkGA1UEBhMC
VVMxEDAOBgNVBAgTB0FyaXpvbmExEzARBgNVBAcTClNjb3R0c2RhbGUxGjAYBgNV
BAoTEUdvRGFkZHkuY29tLCBJbmMuMTMwMQYDVQQLEypodHRwOi8vY2VydGlmaWNh
dGVzLmdvZGFkZHkuY29tL3JlcG9zaXRvcnkxMDAuBgNVBAMTJ0dvIERhZGR5IFNl
Y3VyZSBDZXJ0aWZpY2F0aW9uIEF1dGhvcml0eTERMA8GA1UEBRMIMDc5NjkyODcw
HhcNMDkwMTE4MjEyMjMxWhcNMTEwMTE4MjEyMjMxWjBbMRowGAYDVQQKExFtYWls
Lm5peGNyYWZ0Lm5ldDEaMBgGA1UEAxMRbWFpbC5uaXhjcmFmdC5uZXQxITAfBgNV
BAsTGERvbWFpbiBDb250cm9sIFZhbGlkYXRlZDCBnzANBgkqhkiG9w0BAQEFAAOB
jQAwgYkCgYEA0LhCDXvNXhTHov9Szh474Cv3Nz7QspVOI4p5M+zZt18VTVCHJz0Z
TleJum8RblpU4NPHJgOauIb1CAE3vLSKySV2DjHMt2L2/NUatJiKjDQKAEloKwQK
t75BP0mAGFPZmHlMNUQ32Sr/0byxxM4ElL2SSBasJE3PPVkSBOtLfssCAwEAAaOC
AcUwggHBMA8GA1UdEwEB/wQFMAMBAQAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsG
AQUFBwMCMA4GA1UdDwEB/wQEAwIFoDAyBgNVHR8EKzApMCegJaAjhiFodHRwOi8v
Y3JsLmdvZGFkZHkuY29tL2dkczEtMS5jcmwwUwYDVR0gBEwwSjBIBgtghkgBhv1t
AQcXATA5MDcGCCsGAQUFBwIBFitodHRwOi8vY2VydGlmaWNhdGVzLmdvZGFkZHku
Y29tL3JlcG9zaXRvcnkvMIGABggrBgEFBQcBAQR0MHIwJAYIKwYBBQUHMAGGGGh0
dHA6Ly9vY3NwLmdvZGFkZHkuY29tLzBKBggrBgEFBQcwAoY+aHR0cDovL2NlcnRp
ZmljYXRlcy5nb2RhZGR5LmNvbS9yZXBvc2l0b3J5L2dkX2ludGVybWVkaWF0ZS5j
cnQwHwYDVR0jBBgwFoAU/axhMpNsRdbi7oVfmrrndplozOcwMwYDVR0RBCwwKoIR
bWFpbC5uaXhjcmFmdC5uZXSCFXd3dy5tYWlsLm5peGNyYWZ0Lm5ldDAdBgNVHQ4E
FgQUAYML0uoVH8Sn8JZ3xbR9NLzE0tYwDQYJKoZIhvcNAQEFBQADggEBAJ/1/mGM
tF/UPwOvmiNE0i46qXCJDs6Ui7kCxWWQzC+CbT6x3fe8VwZ2/9OVeScw5aGkG7sU
kfid0XmfXxYrqkVsubrhQt/1MKKowB35M5a/wRd7E0h2ucYhBF3dnTQ29yJ9ppHC
HOvsUDGOan+e7japMyTYn9PU9Y8QtnzovRXk55iYfL4p57YvPwk4yMnBtc/krQcd
m6ZdvmY+zbbjWaDyarfIp3fQCL2HD/lC5rJaGUn633GIT0OrrQ4Gfy6hQ98UC+Pt
I8LFuzs02dJlCpDhGquvQ0W6o4uuvjSP28HfGBcmKholG0GT9wyZZCBvUlFyV6kq
/KNTisOW4so6I+Q=
-----END CERTIFICATE-----
---
Server certificate
subject=/O=mail.nixcraft.net/CN=mail.nixcraft.net/OU=Domain Control Validated
issuer=/C=US/ST=Arizona/L=Scottsdale/O=GoDaddy.com, Inc./OU=http://certificates.godaddy.com/repository/CN=Go Daddy Secure Certification Authority/serialNumber=07969287
---
No client certificate CA names sent
---
SSL handshake has read 1823 bytes and written 316 bytes
---
New, TLSv1/SSLv3, Cipher is DHE-RSA-AES256-SHA
Server public key is 1024 bit
Compression: NONE
Expansion: NONE
SSL-Session:
    Protocol  : TLSv1
    Cipher    : DHE-RSA-AES256-SHA
    Session-ID: BF3662B2C597A7473E477D0CAD2D5002FCC370661BA5A7364BDCDD9C1247C0F5
    Session-ID-ctx:
    Master-Key: <redacted>
    Key-Arg   : None
    Start Time: 1243050920
    Timeout   : 300 (sec)
    Verify return code: 21 (unable to verify the first certificate)
Copy from the "-----BEGIN CERTIFICATE-----" to the "-----END CERTIFICATE-----" , and save it in your ~/.cert/mail.nixcraft.net/ directory as mail.nixcraft.net.pem.
Step # 2: Getting The Certificate Of The Issuer

This certificate was issued by Go Daddy, so you need to get "Certification Authority Root Certificate" (visit your CA's website to get root certificate):
$ wget https://certs.godaddy.com/repository/gd_bundle.crt -O ~/.cert/mail.nixcraft.net/gd.pem
Step # 3: Rehashing The Certificates

Create symbolic links to files named by the hash values using c_rehash, enter:
$ c_rehash ~/.cert/mail.nixcraft.net/
Sample output:

Doing  ~/.cert/mail.nixcraft.net/
mail.nixcraft.net.pem => 1d97af50.0
gd.pem => 219d9499.0

Test It

To confirm you have the correct and working certificates, enter:
$ openssl s_client -CApath ~/.cert/mail.nixcraft.net/ -connect mail.nixcraft.net:443
Sample output:

CONNECTED(00000003)
depth=3 /L=ValiCert Validation Network/O=ValiCert, Inc./OU=ValiCert Class 2 Policy Validation Authority/CN=http://www.valicert.com//emailAddress=info@valicert.com
verify return:1
depth=2 /C=US/O=The Go Daddy Group, Inc./OU=Go Daddy Class 2 Certification Authority
verify return:1
depth=1 /C=US/ST=Arizona/L=Scottsdale/O=GoDaddy.com, Inc./OU=http://certificates.godaddy.com/repository/CN=Go Daddy Secure Certification Authority/serialNumber=07969287
verify return:1
depth=0 /O=mail.nixcraft.net/CN=mail.nixcraft.net/OU=Domain Control Validated
verify return:1
---
Certificate chain
 0 s:/O=mail.nixcraft.net/CN=mail.nixcraft.net/OU=Domain Control Validated
   i:/C=US/ST=Arizona/L=Scottsdale/O=GoDaddy.com, Inc./OU=http://certificates.godaddy.com/repository/CN=Go Daddy Secure Certification Authority/serialNumber=07969287
---
Server certificate
-----BEGIN CERTIFICATE-----
MIIE5zCCA8+gAwIBAgIEAOJk2zANBgkqhkiG9w0BAQUFADCByjELMAkGA1UEBhMC
VVMxEDAOBgNVBAgTB0FyaXpvbmExEzARBgNVBAcTClNjb3R0c2RhbGUxGjAYBgNV
BAoTEUdvRGFkZHkuY29tLCBJbmMuMTMwMQYDVQQLEypodHRwOi8vY2VydGlmaWNh
dGVzLmdvZGFkZHkuY29tL3JlcG9zaXRvcnkxMDAuBgNVBAMTJ0dvIERhZGR5IFNl
Y3VyZSBDZXJ0aWZpY2F0aW9uIEF1dGhvcml0eTERMA8GA1UEBRMIMDc5NjkyODcw
HhcNMDkwMTE4MjEyMjMxWhcNMTEwMTE4MjEyMjMxWjBbMRowGAYDVQQKExFtYWls
Lm5peGNyYWZ0Lm5ldDEaMBgGA1UEAxMRbWFpbC5uaXhjcmFmdC5uZXQxITAfBgNV
BAsTGERvbWFpbiBDb250cm9sIFZhbGlkYXRlZDCBnzANBgkqhkiG9w0BAQEFAAOB
jQAwgYkCgYEA0LhCDXvNXhTHov9Szh474Cv3Nz7QspVOI4p5M+zZt18VTVCHJz0Z
TleJum8RblpU4NPHJgOauIb1CAE3vLSKySV2DjHMt2L2/NUatJiKjDQKAEloKwQK
t75BP0mAGFPZmHlMNUQ32Sr/0byxxM4ElL2SSBasJE3PPVkSBOtLfssCAwEAAaOC
AcUwggHBMA8GA1UdEwEB/wQFMAMBAQAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsG
AQUFBwMCMA4GA1UdDwEB/wQEAwIFoDAyBgNVHR8EKzApMCegJaAjhiFodHRwOi8v
Y3JsLmdvZGFkZHkuY29tL2dkczEtMS5jcmwwUwYDVR0gBEwwSjBIBgtghkgBhv1t
AQcXATA5MDcGCCsGAQUFBwIBFitodHRwOi8vY2VydGlmaWNhdGVzLmdvZGFkZHku
Y29tL3JlcG9zaXRvcnkvMIGABggrBgEFBQcBAQR0MHIwJAYIKwYBBQUHMAGGGGh0
dHA6Ly9vY3NwLmdvZGFkZHkuY29tLzBKBggrBgEFBQcwAoY+aHR0cDovL2NlcnRp
ZmljYXRlcy5nb2RhZGR5LmNvbS9yZXBvc2l0b3J5L2dkX2ludGVybWVkaWF0ZS5j
cnQwHwYDVR0jBBgwFoAU/axhMpNsRdbi7oVfmrrndplozOcwMwYDVR0RBCwwKoIR
bWFpbC5uaXhjcmFmdC5uZXSCFXd3dy5tYWlsLm5peGNyYWZ0Lm5ldDAdBgNVHQ4E
FgQUAYML0uoVH8Sn8JZ3xbR9NLzE0tYwDQYJKoZIhvcNAQEFBQADggEBAJ/1/mGM
tF/UPwOvmiNE0i46qXCJDs6Ui7kCxWWQzC+CbT6x3fe8VwZ2/9OVeScw5aGkG7sU
kfid0XmfXxYrqkVsubrhQt/1MKKowB35M5a/wRd7E0h2ucYhBF3dnTQ29yJ9ppHC
HOvsUDGOan+e7japMyTYn9PU9Y8QtnzovRXk55iYfL4p57YvPwk4yMnBtc/krQcd
m6ZdvmY+zbbjWaDyarfIp3fQCL2HD/lC5rJaGUn633GIT0OrrQ4Gfy6hQ98UC+Pt
I8LFuzs02dJlCpDhGquvQ0W6o4uuvjSP28HfGBcmKholG0GT9wyZZCBvUlFyV6kq
/KNTisOW4so6I+Q=
-----END CERTIFICATE-----
subject=/O=mail.nixcraft.net/CN=mail.nixcraft.net/OU=Domain Control Validated
issuer=/C=US/ST=Arizona/L=Scottsdale/O=GoDaddy.com, Inc./OU=http://certificates.godaddy.com/repository/CN=Go Daddy Secure Certification Authority/serialNumber=07969287
---
No client certificate CA names sent
---
SSL handshake has read 1823 bytes and written 316 bytes
---
New, TLSv1/SSLv3, Cipher is DHE-RSA-AES256-SHA
Server public key is 1024 bit
Compression: NONE
Expansion: NONE
SSL-Session:
    Protocol  : TLSv1
    Cipher    : DHE-RSA-AES256-SHA
    Session-ID: 37E5AF0EE1745AB2DACAEE0FB7824C178A58C6AEF7A0EF93609643F16A20EE51
    Session-ID-ctx:
    Master-Key: <redacted>
    Key-Arg   : None
    Start Time: 1243051912
    Timeout   : 300 (sec)
    Verify return code: 0 (ok)
---

There should be lots of data, however the important thing to note down is that the final line "Verify return code: 0 (ok)". I'm using the same certificate for dovecot IMAP mail server, type the following to verify mail server SSL certificate:
$ openssl s_client -CApath ~/.cert/mail.nixcraft.net/ -connect mail.nixcraft.net:993
Sample output:

CONNECTED(00000003)
depth=2 /C=US/O=The Go Daddy Group, Inc./OU=Go Daddy Class 2 Certification Authority
verify return:1
depth=1 /C=US/ST=Arizona/L=Scottsdale/O=GoDaddy.com, Inc./OU=http://certificates.godaddy.com/repository/CN=Go Daddy Secure Certification Authority/serialNumber=07969287
verify return:1
depth=0 /O=mail.nixcraft.net/CN=mail.nixcraft.net/OU=Domain Control Validated
verify return:1
---
Certificate chain
 0 s:/O=mail.nixcraft.net/CN=mail.nixcraft.net/OU=Domain Control Validated
   i:/C=US/ST=Arizona/L=Scottsdale/O=GoDaddy.com, Inc./OU=http://certificates.godaddy.com/repository/CN=Go Daddy Secure Certification Authority/serialNumber=07969287
 1 s:/C=US/ST=Arizona/L=Scottsdale/O=GoDaddy.com, Inc./OU=http://certificates.godaddy.com/repository/CN=Go Daddy Secure Certification Authority/serialNumber=07969287
   i:/C=US/O=The Go Daddy Group, Inc./OU=Go Daddy Class 2 Certification Authority
---
Server certificate
-----BEGIN CERTIFICATE-----
MIIE5zCCA8+gAwIBAgIEAOJk2zANBgkqhkiG9w0BAQUFADCByjELMAkGA1UEBhMC
VVMxEDAOBgNVBAgTB0FyaXpvbmExEzARBgNVBAcTClNjb3R0c2RhbGUxGjAYBgNV
BAoTEUdvRGFkZHkuY29tLCBJbmMuMTMwMQYDVQQLEypodHRwOi8vY2VydGlmaWNh
dGVzLmdvZGFkZHkuY29tL3JlcG9zaXRvcnkxMDAuBgNVBAMTJ0dvIERhZGR5IFNl
Y3VyZSBDZXJ0aWZpY2F0aW9uIEF1dGhvcml0eTERMA8GA1UEBRMIMDc5NjkyODcw
HhcNMDkwMTE4MjEyMjMxWhcNMTEwMTE4MjEyMjMxWjBbMRowGAYDVQQKExFtYWls
Lm5peGNyYWZ0Lm5ldDEaMBgGA1UEAxMRbWFpbC5uaXhjcmFmdC5uZXQxITAfBgNV
BAsTGERvbWFpbiBDb250cm9sIFZhbGlkYXRlZDCBnzANBgkqhkiG9w0BAQEFAAOB
jQAwgYkCgYEA0LhCDXvNXhTHov9Szh474Cv3Nz7QspVOI4p5M+zZt18VTVCHJz0Z
TleJum8RblpU4NPHJgOauIb1CAE3vLSKySV2DjHMt2L2/NUatJiKjDQKAEloKwQK
t75BP0mAGFPZmHlMNUQ32Sr/0byxxM4ElL2SSBasJE3PPVkSBOtLfssCAwEAAaOC
AcUwggHBMA8GA1UdEwEB/wQFMAMBAQAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsG
AQUFBwMCMA4GA1UdDwEB/wQEAwIFoDAyBgNVHR8EKzApMCegJaAjhiFodHRwOi8v
Y3JsLmdvZGFkZHkuY29tL2dkczEtMS5jcmwwUwYDVR0gBEwwSjBIBgtghkgBhv1t
AQcXATA5MDcGCCsGAQUFBwIBFitodHRwOi8vY2VydGlmaWNhdGVzLmdvZGFkZHku
Y29tL3JlcG9zaXRvcnkvMIGABggrBgEFBQcBAQR0MHIwJAYIKwYBBQUHMAGGGGh0
dHA6Ly9vY3NwLmdvZGFkZHkuY29tLzBKBggrBgEFBQcwAoY+aHR0cDovL2NlcnRp
ZmljYXRlcy5nb2RhZGR5LmNvbS9yZXBvc2l0b3J5L2dkX2ludGVybWVkaWF0ZS5j
cnQwHwYDVR0jBBgwFoAU/axhMpNsRdbi7oVfmrrndplozOcwMwYDVR0RBCwwKoIR
bWFpbC5uaXhjcmFmdC5uZXSCFXd3dy5tYWlsLm5peGNyYWZ0Lm5ldDAdBgNVHQ4E
FgQUAYML0uoVH8Sn8JZ3xbR9NLzE0tYwDQYJKoZIhvcNAQEFBQADggEBAJ/1/mGM
tF/UPwOvmiNE0i46qXCJDs6Ui7kCxWWQzC+CbT6x3fe8VwZ2/9OVeScw5aGkG7sU
kfid0XmfXxYrqkVsubrhQt/1MKKowB35M5a/wRd7E0h2ucYhBF3dnTQ29yJ9ppHC
HOvsUDGOan+e7japMyTYn9PU9Y8QtnzovRXk55iYfL4p57YvPwk4yMnBtc/krQcd
m6ZdvmY+zbbjWaDyarfIp3fQCL2HD/lC5rJaGUn633GIT0OrrQ4Gfy6hQ98UC+Pt
I8LFuzs02dJlCpDhGquvQ0W6o4uuvjSP28HfGBcmKholG0GT9wyZZCBvUlFyV6kq
/KNTisOW4so6I+Q=
-----END CERTIFICATE-----
subject=/O=mail.nixcraft.net/CN=mail.nixcraft.net/OU=Domain Control Validated
issuer=/C=US/ST=Arizona/L=Scottsdale/O=GoDaddy.com, Inc./OU=http://certificates.godaddy.com/repository/CN=Go Daddy Secure Certification Authority/serialNumber=07969287
---
No client certificate CA names sent
---
SSL handshake has read 3076 bytes and written 316 bytes
---
New, TLSv1/SSLv3, Cipher is DHE-RSA-AES256-SHA
Server public key is 1024 bit
Compression: NONE
Expansion: NONE
SSL-Session:
    Protocol  : TLSv1
    Cipher    : DHE-RSA-AES256-SHA
    Session-ID: 509D310C0184E0540FC24F60F36D3E2A62C1F98D6367DBC62E8432FFDC79757A
    Session-ID-ctx:
    Master-Key: <redacted>
    Key-Arg   : None
    Start Time: 1243052074
    Timeout   : 300 (sec)
    Verify return code: 0 (ok)
---
* OK [CAPABILITY IMAP4rev1 SASL-IR SORT THREAD=REFERENCES MULTIAPPEND UNSELECT LITERAL+ IDLE CHILDREN NAMESPACE LOGIN-REFERRALS UIDPLUS LIST-EXTENDED I18NLEVEL=1 QUOTA AUTH=PLAIN AUTH=LOGIN] Dovecot ready.

Again the final "Dovecot ready" line along with 0 return code indicates that everything is working fine.
```

## 2.6 [OpenSSL] how to parse a Certificate’s Subject, Issuer and its keyUsage

```text
The first code that I ever wrote using OpenSSL was one that read the certificate into memory and examined the values of the keyUsage extension. In fact, OpenSSL provides the functionality to extract all of the information from an X509 certificate that you possibly want. In this tutorial, an X509 certificate is read into memory and the subject and issuer are extracted and the keyUsage extension is examined.

The OpenSSL library provides a few different ways of loading a certificate into memory. For certificates that are in the DER format, the d2i_X509 functions can be used. OpenSSL provides two of these functions – one to read from a file pointer and another to read from a BIO. For anything in the PEM format, openssl provides a set of PEM_read functions. Again, there is a function to read from a BIO and another to read from a file pointer.

  1 #include <iostream>
  2
  3 #include <openssl/pem.h>
  4
  5 // Prototypes
  6 void printSubject (X509 *cert);
  7 void breakdownIssuer (X509 *cert);
  8 void extractNameEntry (X509_NAME *name, int nid);
  9 void checkKeyUsageExtension (X509 *cert);
 10 void testKeyUsage (ASN1_BIT_STRING *keyUsage,
 11   int usageBit, const char *usageName);
 12
 13 int main (int argc, char *argv[])
 14 {
 15   FILE *certFile = fopen("cert.pem", "r");
 16   X509 *cert = NULL;
 17
 18   if (certFile != NULL)
 19   {
 20     cert = PEM_read_X509(certFile, NULL, NULL,
 21       NULL);
 22     printSubject(cert);
 23     breakdownIssuer(cert);
 24     checkKeyUsageExtension(cert);
 25     fclose(certFile);
 26   }
 27   else
 28   {
 29     std::cout << "Could not open file cert.pem";
 30   }
 31
 32   X509_free(cert);
 33 }
 34

Extracting the certificate’s subject name is as simple as a single function call.

 35 // Simple function that prints out the subject name
 36 // using the RFC2253 format.
 37 void printSubject (X509 *cert)
 38 {
 39   std::cout << "— Certificate subject" <<
 40     std::endl;
 41   X509_NAME *subject = X509_get_subject_name(cert);
 42

With the subject name stored in a X509_NAME structure, we can go throught each of the structure’s members and output their values. Alternatively, if we want to obtain a readable format of the entire subject name, we can use OpenSSL’s X509_NAME_print_ex function. However, this function outputs the subject name to a BIO. Fortunately, it is quite easy to extract the string from the BIO and make our own copy.

 43   // Set up a BIO to put the subject line into.
 44   BIO *subjectBio = BIO_new(BIO_s_mem());
 45
 46   // Now, put the subject line into the BIO.
 47   X509_NAME_print_ex(subjectBio, subject, 0,
 48     XN_FLAG_RFC2253);
 49
 50   // Obtain a reference to the data and copy out
 51   // just the length of the data.
 52   char *dataStart = NULL;
 53   char *subjectString = NULL;
 54   long nameLength = BIO_get_mem_data(subjectBio,
 55     &dataStart);
 56   subjectString = new char[nameLength + 1];
 57   memset(subjectString, 0×00, nameLength + 1);
 58   memcpy(subjectString, dataStart, nameLength);
 59
 60   std::cout << "Certificate subject name: " <<
 61     subjectString << std::endl;
 62 }
 63

If you had a look at the documentation for X509_NAME_print_ex, you might have noticed the function X509_NAME_oneline and X509_NAME_print would have done also printed out the subject name in a readable format, with far less code. So then, why have I not used X509_NAME_oneline? It is because the same documentation also states that the two functions are “legacy functions which produce a non standard output form, they don’t handle multi character fields and have various quirks and inconsistencies. Their use is strongly discouraged in new applications.”.

Next, we’ll extract the issuer name and extract the individual parts, such as the common name, country and organisation names. Since the issuer and subjects are stored and retrieved using the X509_NAME structure, this same method can be applied to the subject name (and a readable form of the issuer name can be obtained using the same method as above).

 64 // Simple method that takes the issuer name to
 65 // pieces and prints out a couple of the fields.
 66 void breakdownIssuer (X509 *cert)
 67 {
 68   std::cout << std::endl << "— Issuer breakdown" 
 69     << std::endl;
 70   X509_NAME *issuer = X509_get_issuer_name(cert);
 71
 72   extractNameEntry(issuer, NID_commonName);
 73   extractNameEntry(issuer, NID_countryName);
 74   extractNameEntry(issuer, NID_organizationName);
 75 }
 76

The function extractNameEntry is defined later and is where the individual fields in the issuer name will be extracted. The constants NID_commonName, NID_countryName and NID_organizationName are defined by OpenSSL and references the fields in the issuer name to be extracted. There are defined in objects.h and obj_mac.h.

To extract the actual field from the issuer name, we must determine the location of the field in the name and then extract the entry as a X509_NAME_ENTRY.

 77 // Obtains an entry from a X509 name (i.e. either
 78 // the certificate’s issuer or subject) and
 79 // prints out on standard output.
 80 void extractNameEntry (X509_NAME *name, int nid)
 81 {
 82   // First, let us get the common name from the
 83   // certificate.
 84   int position = X509_NAME_get_index_by_NID(name,
 85     nid, -1);
 86   X509_NAME_ENTRY *entry = X509_NAME_get_entry(
 87     name, position);
 88     

Obtaining a readable string representation of the field requires one more level extraction and conversion.

 89   // This will obtain just the name entry.
 90   ASN1_STRING *asn1Data =
 91     X509_NAME_ENTRY_get_data(entry);
 92
 93   // Next use obtain the actual string data and
 94   // output to standard output.
 95   unsigned char *entryString = ASN1_STRING_data(
 96     asn1Data);
 97
 98   std::cout << OBJ_nid2ln(nid) << ": " <<
 99     entryString << std::endl;
100 }
101

The function OBJ_nid2ln converts the our NID value that we passed in to the name of the field.

Lastly, we’ll extract the keyUsage extension and examine its contents. The method of extracting the extension is same for any extension. RFC 3820 provides a description of the keyUsage extension (actually, it also provides descriptions of other extension as well). Have a look at the RFC if you also want to know what the extension is for. The keyUsage extension is encoded as a bit string, so in OpenSSL, this is extracted as bit string. Furthermore, take note of the meaning of each of the bits in the bit string from RFC.

102 // Extracts the key usage extension from the
103 // certificate.
104 void checkKeyUsageExtension (X509 *cert)
105 {
106   int criticality = -1;
107   int extIndex = -1;
108
109   std::cout << std::endl <<
110     "— Key Usage extension" << std::endl;
111
112   // Obtain the keyUsage extension in the form
113   // of a bit string.
114   ASN1_BIT_STRING *keyUsage = (ASN1_BIT_STRING *)
115     X509_get_ext_d2i(cert, NID_key_usage,
116     &criticality, &extIndex);
117
118   // Output the contents of the keyUsage
119   // extension.
120   const char *usages[] = {"digitalSignature",
121                           "nonRepudiation",
122                           "keyEncipherment",
123                           "dataEncipherment",
124                           "keyAgreement",
125                           "keyCertSign",
126                           "cRLSign",
127                           "encipherOnly",
128                           "decipherOnly"};
129
130   for (int index = 0; index < 8; index++)
131   {
132     testKeyUsage(keyUsage, index, usages[index]);
133   }
134 }
135
136 // Tests the value of the key usage extension to
137 // determine for a given value and outputs the
138 // result to standard output.
139 //
140 // The parameter usageBit is which bit in the
141 // keyUsage to check. RFC 3280 lists the meaning
142 // of each of the bits in the extension.
143 void testKeyUsage (ASN1_BIT_STRING *keyUsage,
144   int usageBit, const char *usageName)
145 {  
146   std::cout << usageName << ": " <<
147     ASN1_BIT_STRING_get_bit(keyUsage, usageBit) <<
148     std::endl;
149 }
150

If you compile and run this program, you should see the output of the contents of cert.pem‘s subject and issuer names and its keyUsage extension (if it can find the certificate). More importantly, note one thing that has been omitted in the sample code above – the lack of checking for successful operations. Throughout the code, I had not checked for things such as whether the subject name was successfully obtained from the certificate, whether we managed to get the individual fields from the issuer name or a keyUsage extension really exists before their contents are used. This was omitted to shorten the amount of code that would have to be displayed in this tutorial. Adding the checks yourself is as simple as checking the return values (usually, a null or -1 is returned on error).
```

## 2.7 Check purpose of certificate (CA, Server, Client etc)

```text
From: http://www.openssl.org/docs/apps/x509.html#CERTIFICATE_EXTENSIONS
	
x509(1)

    NAME
    SYNOPSIS
    DESCRIPTION
    OPTIONS
        INPUT, OUTPUT AND GENERAL PURPOSE OPTIONS
        DISPLAY OPTIONS
        TRUST SETTINGS
        SIGNING OPTIONS
        NAME OPTIONS
        TEXT OPTIONS 
    EXAMPLES
    NOTES
    CERTIFICATE EXTENSIONS
    BUGS
    SEE ALSO
    HISTORY 

NAME

x509 - Certificate display and signing utility

SYNOPSIS

openssl x509 [-inform DER|PEM|NET] [-outform DER|PEM|NET] [-keyform DER|PEM] [-CAform DER|PEM] [-CAkeyform DER|PEM] [-in filename] [-out filename] [-serial] [-hash] [-subject_hash] [-issuer_hash] [-subject] [-issuer] [-nameopt option] [-email] [-ocsp_uri] [-startdate] [-enddate] [-purpose] [-dates] [-modulus] [-fingerprint] [-alias] [-noout] [-trustout] [-clrtrust] [-clrreject] [-addtrust arg] [-addreject arg] [-setalias arg] [-days arg] [-set_serial n] [-signkey filename] [-x509toreq] [-req] [-CA filename] [-CAkey filename] [-CAcreateserial] [-CAserial filename] [-text] [-C] [-md2|-md5|-sha1|-mdc2] [-clrext] [-extfile filename] [-extensions section] [-engine id]

DESCRIPTION

The x509 command is a multi purpose certificate utility. It can be used to display certificate information, convert certificates to various forms, sign certificate requests like a ``mini CA'' or edit certificate trust settings.

Since there are a large number of options they will split up into various sections.

OPTIONS

INPUT, OUTPUT AND GENERAL PURPOSE OPTIONS

-inform DER|PEM|NET

    This specifies the input format normally the command will expect an X509 certificate but this can change if other options such as -req are present. The DER format is the DER encoding of the certificate and PEM is the base64 encoding of the DER encoding with header and footer lines added. The NET option is an obscure Netscape server format that is now obsolete.
-outform DER|PEM|NET

    This specifies the output format, the options have the same meaning as the -inform option.
-in filename

    This specifies the input filename to read a certificate from or standard input if this option is not specified.
-out filename

    This specifies the output filename to write to or standard output by default.
-md2|-md5|-sha1|-mdc2

    the digest to use. This affects any signing or display option that uses a message digest, such as the -fingerprint, -signkey and -CA options. If not specified then SHA1 is used. If the key being used to sign with is a DSA key then this option has no effect: SHA1 is always used with DSA keys.
-engine id

    specifying an engine (by its unique id string) will cause x509 to attempt to obtain a functional reference to the specified engine, thus initialising it if needed. The engine will then be set as the default for all available algorithms.

DISPLAY OPTIONS

Note: the -alias and -purpose options are also display options but are described in the TRUST SETTINGS section.

-text

    prints out the certificate in text form. Full details are output including the public key, signature algorithms, issuer and subject names, serial number any extensions present and any trust settings.
-certopt option

    customise the output format used with -text. The option argument can be a single option or multiple options separated by commas. The -certopt switch may be also be used more than once to set multiple options. See the TEXT OPTIONS section for more information.
-noout

    this option prevents output of the encoded version of the request.
-modulus

    this option prints out the value of the modulus of the public key contained in the certificate.
-serial

    outputs the certificate serial number.
-subject_hash

    outputs the ``hash'' of the certificate subject name. This is used in OpenSSL to form an index to allow certificates in a directory to be looked up by subject name.
-issuer_hash

    outputs the ``hash'' of the certificate issuer name.
-hash

    synonym for ``-subject_hash'' for backward compatibility reasons.
-subject_hash_old

    outputs the ``hash'' of the certificate subject name using the older algorithm as used by OpenSSL versions before 1.0.0.
-issuer_hash_old

    outputs the ``hash'' of the certificate issuer name using the older algorithm as used by OpenSSL versions before 1.0.0.
-subject

    outputs the subject name.
-issuer

    outputs the issuer name.
-nameopt option

    option which determines how the subject or issuer names are displayed. The option argument can be a single option or multiple options separated by commas. Alternatively the -nameopt switch may be used more than once to set multiple options. See the NAME OPTIONS section for more information.
-email

    outputs the email address(es) if any.
-ocsp_uri

    outputs the OCSP responder address(es) if any.
-startdate

    prints out the start date of the certificate, that is the notBefore date.
-enddate

    prints out the expiry date of the certificate, that is the notAfter date.
-dates

    prints out the start and expiry dates of a certificate.
-fingerprint

    prints out the digest of the DER encoded version of the whole certificate (see digest options).
-C

    this outputs the certificate in the form of a C source file.

TRUST SETTINGS

Please note these options are currently experimental and may well change.

A trusted certificate is an ordinary certificate which has several additional pieces of information attached to it such as the permitted and prohibited uses of the certificate and an ``alias''.

Normally when a certificate is being verified at least one certificate must be ``trusted''. By default a trusted certificate must be stored locally and must be a root CA: any certificate chain ending in this CA is then usable for any purpose.

Trust settings currently are only used with a root CA. They allow a finer control over the purposes the root CA can be used for. For example a CA may be trusted for SSL client but not SSL server use.

See the description of the verify utility for more information on the meaning of trust settings.

Future versions of OpenSSL will recognize trust settings on any certificate: not just root CAs.

-trustout

    this causes x509 to output a trusted certificate. An ordinary or trusted certificate can be input but by default an ordinary certificate is output and any trust settings are discarded. With the -trustout option a trusted certificate is output. A trusted certificate is automatically output if any trust settings are modified.
-setalias arg

    sets the alias of the certificate. This will allow the certificate to be referred to using a nickname for example ``Steve's Certificate''.
-alias

    outputs the certificate alias, if any.
-clrtrust

    clears all the permitted or trusted uses of the certificate.
-clrreject

    clears all the prohibited or rejected uses of the certificate.
-addtrust arg

    adds a trusted certificate use. Any object name can be used here but currently only clientAuth (SSL client use), serverAuth (SSL server use) and emailProtection (S/MIME email) are used. Other OpenSSL applications may define additional uses.
-addreject arg

    adds a prohibited use. It accepts the same values as the -addtrust option.
-purpose

    this option performs tests on the certificate extensions and outputs the results. For a more complete description see the CERTIFICATE EXTENSIONS section.

SIGNING OPTIONS

The x509 utility can be used to sign certificates and requests: it can thus behave like a ``mini CA''.

-signkey filename

    this option causes the input file to be self signed using the supplied private key.

    If the input file is a certificate it sets the issuer name to the subject name (i.e. makes it self signed) changes the public key to the supplied value and changes the start and end dates. The start date is set to the current time and the end date is set to a value determined by the -days option. Any certificate extensions are retained unless the -clrext option is supplied.

    If the input is a certificate request then a self signed certificate is created using the supplied private key using the subject name in the request.
-clrext

    delete any extensions from a certificate. This option is used when a certificate is being created from another certificate (for example with the -signkey or the -CA options). Normally all extensions are retained.
-keyform PEM|DER

    specifies the format (DER or PEM) of the private key file used in the -signkey option.
-days arg

    specifies the number of days to make a certificate valid for. The default is 30 days.
-x509toreq

    converts a certificate into a certificate request. The -signkey option is used to pass the required private key.
-req

    by default a certificate is expected on input. With this option a certificate request is expected instead.
-set_serial n

    specifies the serial number to use. This option can be used with either the -signkey or -CA options. If used in conjunction with the -CA option the serial number file (as specified by the -CAserial or -CAcreateserial options) is not used.

    The serial number can be decimal or hex (if preceded by 0x). Negative serial numbers can also be specified but their use is not recommended.
-CA filename

    specifies the CA certificate to be used for signing. When this option is present x509 behaves like a ``mini CA''. The input file is signed by this CA using this option: that is its issuer name is set to the subject name of the CA and it is digitally signed using the CAs private key.

    This option is normally combined with the -req option. Without the -req option the input is a certificate which must be self signed.
-CAkey filename

    sets the CA private key to sign a certificate with. If this option is not specified then it is assumed that the CA private key is present in the CA certificate file.
-CAserial filename

    sets the CA serial number file to use.

    When the -CA option is used to sign a certificate it uses a serial number specified in a file. This file consist of one line containing an even number of hex digits with the serial number to use. After each use the serial number is incremented and written out to the file again.

    The default filename consists of the CA certificate file base name with ``.srl'' appended. For example if the CA certificate file is called ``mycacert.pem'' it expects to find a serial number file called ``mycacert.srl''.
-CAcreateserial

    with this option the CA serial number file is created if it does not exist: it will contain the serial number ``02'' and the certificate being signed will have the 1 as its serial number. Normally if the -CA option is specified and the serial number file does not exist it is an error.
-extfile filename

    file containing certificate extensions to use. If not specified then no extensions are added to the certificate.
-extensions section

    the section to add certificate extensions from. If this option is not specified then the extensions should either be contained in the unnamed (default) section or the default section should contain a variable called ``extensions'' which contains the section to use. See the x509v3_config(5) manual page for details of the extension section format.

NAME OPTIONS

The nameopt command line switch determines how the subject and issuer names are displayed. If no nameopt switch is present the default ``oneline'' format is used which is compatible with previous versions of OpenSSL. Each option is described in detail below, all options can be preceded by a - to turn the option off. Only the first four will normally be used.

compat

    use the old format. This is equivalent to specifying no name options at all.
RFC2253

    displays names compatible with RFC2253 equivalent to esc_2253, esc_ctrl, esc_msb, utf8, dump_nostr, dump_unknown, dump_der, sep_comma_plus, dn_rev and sname.
oneline

    a oneline format which is more readable than RFC2253. It is equivalent to specifying the esc_2253, esc_ctrl, esc_msb, utf8, dump_nostr, dump_der, use_quote, sep_comma_plus_space, space_eq and sname options.
multiline

    a multiline format. It is equivalent esc_ctrl, esc_msb, sep_multiline, space_eq, lname and align.
esc_2253

    escape the ``special'' characters required by RFC2253 in a field That is ,+"<>;. Additionally # is escaped at the beginning of a string and a space character at the beginning or end of a string.
esc_ctrl

    escape control characters. That is those with ASCII values less than 0x20 (space) and the delete (0x7f) character. They are escaped using the RFC2253 \XX notation (where XX are two hex digits representing the character value).
esc_msb

    escape characters with the MSB set, that is with ASCII values larger than 127.
use_quote

    escapes some characters by surrounding the whole string with " characters, without the option all escaping is done with the \ character.
utf8

    convert all strings to UTF8 format first. This is required by RFC2253. If you are lucky enough to have a UTF8 compatible terminal then the use of this option (and not setting esc_msb) may result in the correct display of multibyte (international) characters. Is this option is not present then multibyte characters larger than 0xff will be represented using the format \UXXXX for 16 bits and \WXXXXXXXX for 32 bits. Also if this option is off any UTF8Strings will be converted to their character form first.
no_type

    this option does not attempt to interpret multibyte characters in any way. That is their content octets are merely dumped as though one octet represents each character. This is useful for diagnostic purposes but will result in rather odd looking output.
show_type

    show the type of the ASN1 character string. The type precedes the field contents. For example ``BMPSTRING: Hello World''.
dump_der

    when this option is set any fields that need to be hexdumped will be dumped using the DER encoding of the field. Otherwise just the content octets will be displayed. Both options use the RFC2253 #XXXX... format.
dump_nostr

    dump non character string types (for example OCTET STRING) if this option is not set then non character string types will be displayed as though each content octet represents a single character.
dump_all

    dump all fields. This option when used with dump_der allows the DER encoding of the structure to be unambiguously determined.
dump_unknown

    dump any field whose OID is not recognised by OpenSSL.
sep_comma_plus, sep_comma_plus_space, sep_semi_plus_space, sep_multiline

    these options determine the field separators. The first character is between RDNs and the second between multiple AVAs (multiple AVAs are very rare and their use is discouraged). The options ending in ``space'' additionally place a space after the separator to make it more readable. The sep_multiline uses a linefeed character for the RDN separator and a spaced + for the AVA separator. It also indents the fields by four characters.
dn_rev

    reverse the fields of the DN. This is required by RFC2253. As a side effect this also reverses the order of multiple AVAs but this is permissible.
nofname, sname, lname, oid

    these options alter how the field name is displayed. nofname does not display the field at all. sname uses the ``short name'' form (CN for commonName for example). lname uses the long form. oid represents the OID in numerical form and is useful for diagnostic purpose.
align

    align field values for a more readable output. Only usable with sep_multiline.
space_eq

    places spaces round the = character which follows the field name.

TEXT OPTIONS

As well as customising the name output format, it is also possible to customise the actual fields printed using the certopt options when the text option is present. The default behaviour is to print all fields.

compatible

    use the old format. This is equivalent to specifying no output options at all.
no_header

    don't print header information: that is the lines saying ``Certificate'' and ``Data''.
no_version

    don't print out the version number.
no_serial

    don't print out the serial number.
no_signame

    don't print out the signature algorithm used.
no_validity

    don't print the validity, that is the notBefore and notAfter fields.
no_subject

    don't print out the subject name.
no_issuer

    don't print out the issuer name.
no_pubkey

    don't print out the public key.
no_sigdump

    don't give a hexadecimal dump of the certificate signature.
no_aux

    don't print out certificate trust information.
no_extensions

    don't print out any X509V3 extensions.
ext_default

    retain default extension behaviour: attempt to print out unsupported certificate extensions.
ext_error

    print an error message for unsupported certificate extensions.
ext_parse

    ASN1 parse unsupported extensions.
ext_dump

    hex dump unsupported extensions.
ca_default

    the value used by the ca utility, equivalent to no_issuer, no_pubkey, no_header, no_version, no_sigdump and no_signame.

EXAMPLES

Note: in these examples the '\' means the example should be all on one line.

Display the contents of a certificate:

 openssl x509 -in cert.pem -noout -text

Display the certificate serial number:

 openssl x509 -in cert.pem -noout -serial

Display the certificate subject name:

 openssl x509 -in cert.pem -noout -subject

Display the certificate subject name in RFC2253 form:

 openssl x509 -in cert.pem -noout -subject -nameopt RFC2253

Display the certificate subject name in oneline form on a terminal supporting UTF8:

 openssl x509 -in cert.pem -noout -subject -nameopt oneline,-esc_msb

Display the certificate MD5 fingerprint:

 openssl x509 -in cert.pem -noout -fingerprint

Display the certificate SHA1 fingerprint:

 openssl x509 -sha1 -in cert.pem -noout -fingerprint

Convert a certificate from PEM to DER format:

 openssl x509 -in cert.pem -inform PEM -out cert.der -outform DER

Convert a certificate to a certificate request:

 openssl x509 -x509toreq -in cert.pem -out req.pem -signkey key.pem

Convert a certificate request into a self signed certificate using extensions for a CA:

 openssl x509 -req -in careq.pem -extfile openssl.cnf -extensions v3_ca \
        -signkey key.pem -out cacert.pem

Sign a certificate request using the CA certificate above and add user certificate extensions:

 openssl x509 -req -in req.pem -extfile openssl.cnf -extensions v3_usr \
        -CA cacert.pem -CAkey key.pem -CAcreateserial

Set a certificate to be trusted for SSL client use and change set its alias to ``Steve's Class 1 CA''

 openssl x509 -in cert.pem -addtrust clientAuth \
        -setalias "Steve's Class 1 CA" -out trust.pem

NOTES

The PEM format uses the header and footer lines:

 -----BEGIN CERTIFICATE-----
 -----END CERTIFICATE-----

it will also handle files containing:

 -----BEGIN X509 CERTIFICATE-----
 -----END X509 CERTIFICATE-----

Trusted certificates have the lines

 -----BEGIN TRUSTED CERTIFICATE-----
 -----END TRUSTED CERTIFICATE-----

The conversion to UTF8 format used with the name options assumes that T61Strings use the ISO8859-1 character set. This is wrong but Netscape and MSIE do this as do many certificates. So although this is incorrect it is more likely to display the majority of certificates correctly.

The -fingerprint option takes the digest of the DER encoded certificate. This is commonly called a ``fingerprint''. Because of the nature of message digests the fingerprint of a certificate is unique to that certificate and two certificates with the same fingerprint can be considered to be the same.

The Netscape fingerprint uses MD5 whereas MSIE uses SHA1.

The -email option searches the subject name and the subject alternative name extension. Only unique email addresses will be printed out: it will not print the same address more than once.

CERTIFICATE EXTENSIONS

The -purpose option checks the certificate extensions and determines what the certificate can be used for. The actual checks done are rather complex and include various hacks and workarounds to handle broken certificates and software.

The same code is used when verifying untrusted certificates in chains so this section is useful if a chain is rejected by the verify code.

The basicConstraints extension CA flag is used to determine whether the certificate can be used as a CA. If the CA flag is true then it is a CA, if the CA flag is false then it is not a CA. All CAs should have the CA flag set to true.

If the basicConstraints extension is absent then the certificate is considered to be a ``possible CA'' other extensions are checked according to the intended use of the certificate. A warning is given in this case because the certificate should really not be regarded as a CA: however it is allowed to be a CA to work around some broken software.

If the certificate is a V1 certificate (and thus has no extensions) and it is self signed it is also assumed to be a CA but a warning is again given: this is to work around the problem of Verisign roots which are V1 self signed certificates.

If the keyUsage extension is present then additional restraints are made on the uses of the certificate. A CA certificate must have the keyCertSign bit set if the keyUsage extension is present.

The extended key usage extension places additional restrictions on the certificate uses. If this extension is present (whether critical or not) the key can only be used for the purposes specified.

A complete description of each test is given below. The comments about basicConstraints and keyUsage and V1 certificates above apply to all CA certificates.

SSL Client

    The extended key usage extension must be absent or include the ``web client authentication'' OID. keyUsage must be absent or it must have the digitalSignature bit set. Netscape certificate type must be absent or it must have the SSL client bit set.
SSL Client CA

    The extended key usage extension must be absent or include the ``web client authentication'' OID. Netscape certificate type must be absent or it must have the SSL CA bit set: this is used as a work around if the basicConstraints extension is absent.
SSL Server

    The extended key usage extension must be absent or include the ``web server authentication'' and/or one of the SGC OIDs. keyUsage must be absent or it must have the digitalSignature, the keyEncipherment set or both bits set. Netscape certificate type must be absent or have the SSL server bit set.
SSL Server CA

    The extended key usage extension must be absent or include the ``web server authentication'' and/or one of the SGC OIDs. Netscape certificate type must be absent or the SSL CA bit must be set: this is used as a work around if the basicConstraints extension is absent.
Netscape SSL Server

    For Netscape SSL clients to connect to an SSL server it must have the keyEncipherment bit set if the keyUsage extension is present. This isn't always valid because some cipher suites use the key for digital signing. Otherwise it is the same as a normal SSL server.
Common S/MIME Client Tests

    The extended key usage extension must be absent or include the ``email protection'' OID. Netscape certificate type must be absent or should have the S/MIME bit set. If the S/MIME bit is not set in netscape certificate type then the SSL client bit is tolerated as an alternative but a warning is shown: this is because some Verisign certificates don't set the S/MIME bit.
S/MIME Signing

    In addition to the common S/MIME client tests the digitalSignature bit must be set if the keyUsage extension is present.
S/MIME Encryption

    In addition to the common S/MIME tests the keyEncipherment bit must be set if the keyUsage extension is present.
S/MIME CA

    The extended key usage extension must be absent or include the ``email protection'' OID. Netscape certificate type must be absent or must have the S/MIME CA bit set: this is used as a work around if the basicConstraints extension is absent.
CRL Signing

    The keyUsage extension must be absent or it must have the CRL signing bit set.
CRL Signing CA

    The normal CA tests apply. Except in this case the basicConstraints extension must be present.
```

## 2.8 Verify issued certificate matches CA chain, verify certificate is signed by CA

```text
If just one ca:
$ openssl verify -verbose -CAfile  server-ca-crt.pem server-crt.pem 
server-crt.pem: OK

If ca chain:
- concatenate the chain certificates into one .pem file, say RootInter
- Run as follows: openssl verify -verbose -CAfile RootInter.pem User-Certificate.pem
Ex:
root@ubuntu-01:~/DECRYPT# openssl verify -verbose -CAfile RootInter.pem User-Certificate.pem
User-Certificate.pem: C = CZ, O = UCLab, OU = Simac Technik, CN = SEP0C85253F46B6
error 20 at 0 depth lookup:unable to get local issuer certificate
root@ubuntu-01:~/DECRYPT# openssl verify -verbose -issuer_checks -CAfile RootInter.pem User-Certificate.pem
User-Certificate.pem: C = CZ, O = UCLab, OU = Simac Technik, CN = SEP0C85253F46B6
error 29 at 0 depth lookup:subject issuer mismatch
C = CZ, O = UCLab, OU = Simac Technik, CN = SEP0C85253F46B6
error 29 at 0 depth lookup:subject issuer mismatch
C = CZ, O = UCLab, OU = Simac Technik, CN = SEP0C85253F46B6
error 29 at 0 depth lookup:subject issuer mismatch
C = CZ, O = UCLab, OU = Simac Technik, CN = SEP0C85253F46B6
error 32 at 0 depth lookup:key usage does not include certificate signing
C = CZ, O = UCLab, OU = Simac Technik, CN = SEP0C85253F46B6
error 32 at 0 depth lookup:key usage does not include certificate signing
C = CZ, O = UCLab, OU = Simac Technik, CN = SEP0C85253F46B6
error 29 at 0 depth lookup:subject issuer mismatch
C = CZ, O = UCLab, OU = Simac Technik, CN = SEP0C85253F46B6
error 20 at 0 depth lookup:unable to get local issuer certificate

- Verify vs. trust chain
openssl verify -CAfile <(cat ChessMasterIssuer.cer ChessMasterPolicy.cer ChessMasterCA.cer) ChessMasterChainServer.cer
```

## 2.9 Verify trust chain certificates

### 2.9.1 Verify trust chain certificates CLI

```text
example:
$ openssl verify -verbose -CAfile NSPA.pem -untrusted IntermediateCA.pem CertificateServicesNodeCAI.pem CertificateServicesEndpointSu.pem  client-cert.pem 
CertificateServicesNodeCAI.pem: /CN=Certificate Services Node CA - ISESRV01
error 20 at 0 depth lookup:unable to get local issuer certificate
CertificateServicesEndpointSu.pem: /CN=Certificate Services Endpoint Sub CA - ISESRV01
error 20 at 0 depth lookup:unable to get local issuer certificate
unable to load certificate

or like that (not sure re. exact difference)
$ openssl verify -issuer_checks -verbose -CAfile <( cat NSPA.pem IntermediateCA.pem CertificateServicesNodeCAI.pem CertificateServicesEndpointSu.pem)  client-cert2.pem 
client-cert2.pem: /CN=LAP34522/OU=IS DIVISION/O=NSPA/C=LU
error 29 at 0 depth lookup:subject issuer mismatch
/CN=LAP34522/OU=IS DIVISION/O=NSPA/C=LU
error 29 at 0 depth lookup:subject issuer mismatch
/CN=LAP34522/OU=IS DIVISION/O=NSPA/C=LU
error 29 at 0 depth lookup:subject issuer mismatch
/CN=Certificate Services Endpoint Sub CA - ISESRV01
error 29 at 0 depth lookup:subject issuer mismatch
/CN=Certificate Services Node CA - ISESRV01
error 29 at 0 depth lookup:subject issuer mismatch
/CN=Certificate Services Node CA - ISESRV01
error 29 at 0 depth lookup:subject issuer mismatch
/CN=Certificate Services Node CA - ISESRV01
error 2 at 2 depth lookup:unable to get issuer certificate 
```

### 2.9.2 Common issues that fail trust chain check

#### 2.9.2.1 Subject of issuer CA certificate and issuer of issued Certificate mismatch

```text
This can either be an obvious mismatch or a more difficult to find 
for example
Intermediate CA has following subject:
 
CN = IntermediateCA - ISESRV017
OU = IS Division
O = NSPA
C = LU
 
While (issued CA) Node has Issuer like:
 
C = LU
O = NSPA
OU = IS Division
CN = IntermediateCA - ISESRV017
 
As per RFC section 7.1
 
“(..) Two distinguished names DN1 and DN2 match if they have the same number of RDNs, for each RDN in DN1 there is a matching RDN in DN2, and the matching RDNs appear in the same order in both DNs.(…)


This causes chain validation to fail
```

#### 2.9.2.2 AKI of issued Certificate and SKI of issuer Certificate mismatch

```text
Note that this can be a direct mismatch of keyID fields
or a mismatch of other fields, like  'Certificate Issuer'. Note that 'Certificate Issuer' value should match the issuer's issuer subject, as per following explanation by Avinash:
"
Assume the following chain Node CA -> Endpoint Sub CA -> Endpoint Cert (CN=LAP34522)
 
The AKI extension in the Endpoint Cert is added solely to Identify its Issuer correctly i.e. the Endpoint Sub CA.
In order to do so we need the following information about the Endpoint Sub CA certificate should be present in the AKI extension:
-------------------------------------------------------------------------------
KeyID: 65:05:54:9B:15:67:B1:25:40:88:52:CF:16:20:88:7E:18:D5:7B:10  // KeyID of the Endpoint Sub CA cert
DirName: :/CN=Certificate Services Node CA - ISESRV01               // This is the confusing bit. It’s supposed to be the Issuer of the Endpoint Sub CA. So, we are rightly pointing to the Node CA. We normally think that this should the Endpoint Sub CA’s Subject Name however that is incorrect as there is another field called the Issuer Name for that purpose in the Endpoint Cert.  
Serial Number:  1A:F7:6F:1C:A8:F9:49:2F:A2:50:B4:94:CF:08:18:85      // Serial Number of the Endpoint Sub CA cert
-------------------------------------------------------------------------------
 
Source: https://www.openssl.org/docs/faq.html#USER14
"
			2.9.2.3 


		2.9.3
id=__Create_a_client_certificate__
```

## 2.10 Create a client certificate

### 2.10.1 barracuda guide

```text
https://campus.barracuda.com/product/webapplicationfirewall/doc/12193120/creating-a-client-certificate/
```

#### 2.10.1.1 Generate a Private Key for the CA Certificate

```text
cd /Users/<user>/work/<employer>/ssl/mock_ca
openssl genrsa 2048 > ca-key.pem

$ cat !$
cat ca-key.pem
-----BEGIN RSA PRIVATE KEY-----
...
-----END RSA PRIVATE KEY-----

(pem is base64 encoded)

	        2.10.1.2 Create a CA Certificate using the Private Key and set expiration to 1000 days, tags: Create a CA Certificate using the Private Key and set expiration to 1000 days
openssl req -new -x509 -nodes -days 1000 -key ca-key.pem > ca-cert.pem

Answer prompts. ex:
Country Name (2 letter code) [AU]:IL
State or Province Name (full name) [Some-State]:Hadera
Locality Name (eg, city) []:Hadera
Organization Name (eg, company) [Internet Widgits Pty Ltd]:SAP
Organizational Unit Name (eg, section) []:
Common Name (e.g. server FQDN or YOUR name) []:Yosi CA Admin
Email Address []:<email>

$ cat ca-cert.pem 
-----BEGIN CERTIFICATE-----
-----END CERTIFICATE-----

Note that for different servers there would usually be a UX/CLI to upload this certificate to their trust store.
```

#### 2.10.1.3 Create the client private-key + client-request

```text
First, create client pvk and certificate.
openssl req -newkey rsa:2048 -days 1000 -nodes -keyout client-key1.pem > client-req.pem

Also need to answer prompts. ex:
Country Name (2 letter code) [AU]:IL
State or Province Name (full name) [Some-State]:Hadera
Locality Name (eg, city) []:Hadera
Organization Name (eg, company) [Internet Widgits Pty Ltd]:SAP
Organizational Unit Name (eg, section) []:
Common Name (e.g. server FQDN or YOUR name) []:Yosi CP Admin
Email Address []:<email>

Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []:Abcd1234
An optional company name []:SAP

note pvk+req created:
$ lt
client-key1.pem
client-req.pem
```

#### 2.10.1.4 sign client certificate, csr

```text
openssl x509 -req -in client-req.pem -days 1000 -CA ca-cert.pem -CAkey ca-key.pem -set_serial 01 > client-cert1.pem
$ openssl x509 -req -in client-req.pem -days 1000 -CA ca-cert.pem -CAkey ca-key.pem -set_serial 01 > client-cert1.pem
Signature ok
subject=C = IL, ST = Hadera, L = Hadera, O = SAP, CN = Yosi CP Admin, emailAddress = <email>
Getting CA Private Key
```

#### 2.10.1.5 package to pkcs#12, pfx file

```text
$ openssl pkcs12 -export -in client-cert1.pem -inkey client-key1.pem -out client-cert1.pfx
Enter Export Password: <password>
Verifying - Enter Export Password: <password>

Then this cert need to be imported to client (browser, UX, code, etc)
$ openssl pkcs12 -info -in client-cert1.pfx 
Enter Import Password: <password>
MAC: sha1, Iteration 2048
MAC length: 20, salt length: 8
PKCS7 Encrypted data: pbeWithSHA1And40BitRC2-CBC, Iteration 2048
Certificate bag
Bag Attributes
    localKeyID: D6 9E 92 3A EB BE 25 6D F6 EC 1D 07 25 E7 B2 30 F9 4D 9A BB 
subject=C = IL, ST = Hadera, L = Hadera, O = SAP, CN = Yosi CP Admin, emailAddress = <email>

issuer=C = IL, ST = Hadera, L = Hadera, O = SAP, CN = Yosi CA Admin, emailAddress = <email>

-----BEGIN CERTIFICATE-----
<pub key>
-----END CERTIFICATE-----
PKCS7 Data
Shrouded Keybag: pbeWithSHA1And3-KeyTripleDES-CBC, Iteration 2048
Bag Attributes
    localKeyID: D6 9E 92 3A EB BE 25 6D F6 EC 1D 07 25 E7 B2 30 F9 4D 9A BB 
Key Attributes: <No Attributes>
Enter PEM pass phrase :Abcd1234
Verifying - Enter PEM pass phrase: Abcd1234 
-----BEGIN ENCRYPTED PRIVATE KEY-----
<private-key>
-----END ENCRYPTED PRIVATE KEY-----
```

#### 2.10.1.6 create a DER certificate

```text
$ openssl genpkey -algorithm RSA -out private.key
.................+++++
.............................................................................+++++

$ openssl req -new -x509 -key private.key -out certificate.der -outform DER
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) []:IL
State or Province Name (full name) []:Raanana
Locality Name (eg, city) []:Raanana
Organization Name (eg, company) []:SAP
Organizational Unit Name (eg, section) []:BTP
Common Name (eg, fully qualified host name) []:sap.com
Email Address []:<email>
$ lt
-rw-r--r--   1 <user>  staff   1.7K Jul 19 15:23 private.key
-rw-r--r--   1 <user>  staff   900B Jul 19 15:24 certificate.der
	    2.10.2
```

## 2.11 Connect as client

### 2.11.1 connect as client

```text
/Users/<user>/work/code/nodejs/net/x509server
$ openssl s_client -CAfile x509/server-ca-crt.pem -cert x509/client-crt.pem -key x509/client-key.pem -connect localhost:4433 < /dev/null

node request
$ cat client.js |pbcopy
'use strict';

const request = require('request');
const fs = require('fs');

var options = {
    // rejectUnauthorized: false, // required to prevent UNABLE_TO_VERIFY_LEAF_SIGNATURE error, if the server CA is ok it is not required
    method: "GET",
    url: 'https://localhost:4433',
    headers: {
        "content-type": "application/json",
    },
    agentOptions: {
        // either client cert+pvk or pfx...
        cert: fs.readFileSync(__dirname + '/x509/client-crt.pem'),
        key: fs.readFileSync(__dirname + '/x509/client-key.pem'),
        // pfx: fs.readFileSync(__dirname + '/x509/client-crt.pfx'),

        passphrase: '1234',
        ca: [fs.readFileSync(__dirname + '/x509/server-ca-crt.pem')],
    }
};

request.get(options, (error, response, body) => {
    // console.log(error);
    // console.log(response);
    console.log(body);
});

server:
$ cat app.js |pbcopy
const express = require('express');
const fs = require('fs');
const https = require('https');
const app = express();
const options = {
    key: fs.readFileSync('x509/server-key.pem'),
    cert: fs.readFileSync('x509/server-crt.pem'),
    ca: fs.readFileSync('x509/client-ca-crt.pem'),
    // ca: fs.readFileSync('x509/client-ca-crt.pem'),
    requestCert: true,
    rejectUnauthorized: true,
};
app.use(function (req, res, next) {
    console.log('ATN/ATZ middleware activated');
    if (! req.client.authorized) {
        console.log('ATZ failed');
        return res.status(401).send('User is not authorized');
    }
    console.log('checking peer certificate');
    const cert = req.socket.getPeerCertificate();
    if (cert.subject) {
        console.log('cert subject', cert.subject.CN);
        //console.log(JSON.stringify(cert, null, 4));
    }
    res.writeHead(200);
    res.end("hello world\n");
    next();
});
var listener = https.createServer(options, app).listen(4433, function () {
    console.log('Express HTTPS server listening on port ' + listener.address().port);
});


	    2.11.2
	2.12
```

[^rfc8996]: RFC 8996: Deprecating TLS 1.0 and TLS 1.1
[^rfc7568]: RFC 7568: Deprecating Secure Sockets Layer Version 3.0
[^rfc7465]: RFC 7465: Prohibiting RC4 Cipher Suites
[^ossl-x509]: OpenSSL 3.5 manual: openssl-x509
[^ossl-s_time]: OpenSSL 3.5 manual: openssl-s_time
[^ossl-s_client]: OpenSSL 3.5 manual: openssl-s_client
[^ossl-req]: OpenSSL 3.5 manual: openssl-req
[^ossl-pkcs12]: OpenSSL 3.5 manual: openssl-pkcs12
[^ossl-enc]: OpenSSL 3.5 manual: openssl-enc
[^ossl-passwd]: OpenSSL 3.5 manual: openssl-passwd
[^ossl-smime]: OpenSSL 3.5 manual: openssl-smime
[^ossl-cms]: OpenSSL 3.5 manual: openssl-cms
[^ossl-releases]: OpenSSL release strategy (supported versions)
