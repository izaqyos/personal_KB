---
type: reference
title: Literature
description: Cryptography literature pointers and a public/private key encryption with OpenSSL howto.
tags: [cryptography, openssl, book-notes, legacy, reference]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "Network/sslKB#8"
---

# Literature

[↑ sslKB](/Network/kb-ssl/README.md)

```text
Bruce Schneier: Applied Cryptography. Protocols, Algorithm, and Source Code in C (2nd ed). New York: Wiley, 1996 (about US-$ 60) is the book for people interested in reading more about the logical and mathematical foundations of modern cryptology. It is, in my opinion, a wonderful book and not too difficult to read for the mathematically interested. 
```

## 14.2 Public – Private key encryption using OpenSSL

```text
By R.I. Pienaar on 2006/02/13 in Code, Usefull Things

Sometimes I need to encrypt some stuff but do not want to install PGP or GPG. I typically use OpenSSL for this kind of thing and have written a simple frontend script to achieve strong password based encryption using OpenSSL. Sometimes you need public / private key encryption though, below will show you how to do it using just OpenSSL.

Public/Private key encryption is a method used usually when you want to receive or send data to thirdparties. The system requires everyone to have 2 keys one that they keep secure – the private key – and one that they give to everyone – the public key. Data encrypted using the public key can only ever be unencrypted using the private key. This method of encryption that uses 2 keys is called asymmetric encryption.

So by example if Person A want to send Person B data in a secure fashion she just have to encrypt it with Person B’s public key, only Person B can then open the file using her private key. There are other advantages to this kind of encryption. If I met you in person and gave you my public key, I can send you something electronically using my private key to encrypt it, if the public key you have can decrypt that data then you can trust that it was sent by me, it’s mathematical proof of identity. This is the basis for Digital Signatures.

Using OpenSSL on the command line you’d first need to generate a public and private key, you should password protect this file using the -passout argument, there are many different forms that this argument can take so consult the OpenSSL documentation about that.

    $ openssl genrsa -out private.pem 1024

This creates a key file called private.pem that uses 1024 bits. This file actually have both the private and public keys, so you should extract the public one from this file:

    $ openssl rsa -in private.pem -out public.pem -outform PEM -pubout

You’ll now have public.pem containing just your public key, you can freely share this with 3rd parties.
You can test it all by just encrypting something yourself using your public key and then decrypting using your private key, first we need a bit of data to encrypt:

    $ echo 'too many secrets' > file.txt

You now have some data in file.txt, lets encrypt it using OpenSSL and the public key:

    $ openssl rsautl -encrypt -inkey public.pem -pubin -in file.txt -out file.ssl

This creates an encrypted version of file.txt calling it file.ssl, if you look at this file it’s just binary junk, nothing very useful to anyone. Now you can unencrypt it using the private key:

    $ openssl rsautl -decrypt -inkey private.pem -in file.ssl -out decrypted.txt

You will now have an unencrypted file in decrypted.txt:

    $ cat decrypted.txt<br>
    too many secrets

All of these examples use the RSA encryption method, some hard core mathematical information about it here.

"
```
