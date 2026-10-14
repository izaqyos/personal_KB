---
type: reference
title: Introduction to the SSL Technology
description: "Introduction to SSL technology: the protocol, digital certificates, certificate authorities and revocation."
tags: [ssl, certificates, pki, legacy, primer]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: deprecated
capture_type: source
legacy_source: "Network/sslKB#5"
---

# Introduction to the SSL Technology,

> **Deprecated (2026-10):** DES broken; copied vendor text. Current: Use TLS 1.2/1.3 with AES-GCM or ChaCha20. Source: <https://www.rfc-editor.org/rfc/rfc8996>

[↑ sslKB](/Network/kb-ssl/README.md)

```text
	http://edocs.bea.com/tuxedo/tux80/security/publicke.htm#1053449
```

## 5.1 The SSL Protocol

```text
The Secure Sockets Layer (SSL) protocol allows you to integrate these essential features into your CORBA application:

    * Confidentiality 
      Confidentiality is the ability to keep communications secret from parties other than the intended recipient. It is achieved by encrypting data with strong algorithms. The SSL protocol provides a secure mechanism that enables two communicating parties to negotiate the strongest algorithm they both support and to agree on the keys with which to encrypt the data.

    * Integrity 
      Integrity is a guarantee that the data being transferred has not been modified in transit. The same handshake mechanism which allows the two parties to agree on algorithms and keys also allows the two ends of an SSL connection to establish shared data integrity secrets which are used to ensure that when data is received any modifications will be detected.

    * Authentication 
      Authentication is the ability to ascertain with whom you are speaking. By using digital certificates and public key security, CORBA client and server applications can each be authenticated to the other. This allows the two parties to be certain they are communicating with someone they trust. The SSL protocol provides a mechanism that can be used to authenticate principals to a BEA Tuxedo domain using X.509 digital certificates. The use of certificate authentication can be used as an alternative to password authentication.

The SSL protocol provides secure connections by allowing two applications connecting over a network connection to authenticate the other's identity and by encrypting the data exchanged between the applications. When using the SSL protocol, the target always authenticates itself to the initiator. Optionally, if the target requests it, the initiator can authenticate itself to the target. Encryption makes data transmitted over the network intelligible only to the intended recipient. An SSL connection begins with a handshake during which the applications exchange digital certificates, agree on the encryption algorithms to use, and generate encryption keys used for the remainder of the session.

The SSL protocol uses public key encryption for authentication. With public key encryption, a pair of asymmetric keys are generated for a principal or other entity such as the IIOP Listener/Handler or an application server. The keys are related such that the data encrypted with the public key can only be decrypted using the corresponding private key. Conversely, data encrypted with the private key can be decrypted only with the public key. The private key is carefully protected so that only the owner can decrypt messages. The public key, however, is distributed freely so that anyone can encrypt messages intended for the owner.


When using the SSL protocol in the CORBA security environment, the IIOP Listener/Handler authenticates itself to initiating principals. The IIOP Listener/Handler presents its digital certificate to the initiating principal. To successfully negotiate a SSL connection, the client application must then authenticate the IIOP Listener/Handler but the IIOP Listener/Handler will accept any client application into the SSL connection. This type of authentication is referred to as server authentication.

When using server authentication, the initiating client application is required to have digital certificates for certificate authorities that are to be trusted. The IIOP Listener/Handler must have a private key and digital certificates that represents its identity. Server authentication is common on the Internet where customers want to create secure connections before they share personal data. In this case, the client application has a similar role to that of a Web browser.

With SSL version 3.0, principals can also authenticate to the IIOP Listener/Handler. This type of authentication is referred to as mutual authentication. In mutual authentication, principals present their digital certificates to the IIOP Listener/Handler. When using mutual authentication, both the IIOP Listener/Handler and the principal need private keys and digital certificates that represent their identity. This type of authentication is useful when you must restrict access to trusted principals only.

The SSL protocol and the infrastructure needed to use digital certificates is available in the BEA Tuxedo product by installing a license available in the product installation. For more information, see Installing the BEA Tuxedo System.
```

## 5.2 Digital Certificates

```text
Digital certificates are electronic documents used to uniquely identify principals and entities over networks such as the Internet. A digital certificate securely binds the identity of a principal or entity, as verified by a trusted third party known as a certificate authority (CA), to a particular public key. The combination of the public key and the private key provides a unique identity to the owner of the digital certificate.

Digital certificates allow verification of the claim that a specific public key does in fact belong to a specific principal or entity. A recipient of a digital certificate can use the public key contained in the digital certificate to verify that a digital signature was created with the corresponding private key. If such verification is successful, this chain of reasoning provides assurance that the corresponding private key is held by the subject named in the digital certificate, and that the digital signature was created by that particular subject.

A digital certificate typically includes a variety of information, such as:

    * The name of the subject (holder, owner) and other identification information required to uniquely identify the subject, such as the URL of the Web server using the digital certificate, or an individual's e-mail address.

    * The subject's public key.

    * The name of the certificate authority that issued the digital certificate.

    * A serial number.

    * The validity period (or lifetime) of the digital certificate (defined by a start date and an end date). 

The most widely accepted format for digital certificates is defined by the ITU-T X.509 international standard. Thus, digital certificates can be read or written by any application complying with X.509. The PKI in the CORBA security environment recognizes digital certificates that comply with X.509 version 3, or X.509v3.
```

## 5.3 Certificate Authority

```text
Digital certificates are issued by a certificate authority. Any trusted third-party organization or company that is willing to vouch for the identities of those to whom it issues digital certificates and public keys can be a certificate authority. When a certificate authority creates a digital certificate, the certificate authority signs it with its private key, to ensure the detection of tampering. The certificate authority then returns the signed digital certificate to the requesting subject.

The subject can verify the digital signature of the issuing certificate authority by using the public key of the certificate authority. The certificate authority makes its public key available by providing a digital certificate issued from a higher-level certificate authority attesting to the validity of the public key of the lower-level certificate authority. The second solution gives rise to hierarchies of certificate authorities. This hierarchy is terminated by a self-signed digital certificate known as the root key.

The recipient of an encrypted message can develop trust in the private key of a certificate authority recursively, if the recipient has a digital certificate containing the public key of the certificate authority signed by a superior certificate authority whom the recipient already trusts. In this sense, a digital certificate is a stepping stone in digital trust. Ultimately, it is necessary to trust only the public keys of a small number of top-level certificate authorities. Through a chain of digital certificates, trust in a large number of users' digital signatures can be established.

Thus, digital signatures establish the identities of communicating entities, but a digital signature can be trusted only to the extent that the public key for verifying the digital signature can be trusted.
```

## 5.4 Certificate Repositories

```text
To make a public key and its identification with a specific subject readily available for use in verification, the digital certificate may be published in a repository or made available by other means. Certificate repositories are databases of digital certificates and other information available for retrieval and use in verifying digital signatures. Retrieval can be accomplished automatically by directly requesting digital certificates from the repository as needed.

In the CORBA security environment, Lightweight Directory Access Protocol (LDAP) is used as a certificate repository. BEA Systems, Inc. does not provide or recommend any specific LDAP server. The LDAP server you choose should support the X.500 scheme definition and the LDAP version 2 or 3 protocol.
```

## 5.6 A Public Key Infrastructure

```text
A Public Key Infrastructure (PKI) consists of protocols, services, and standards supporting applications of public key cryptography. Because the technology is still relatively new, the term PKI is somewhat loosely defined: sometimes PKI simply refers to a trust hierarchy based on public key digital certificates; in other contexts, it embraces digital signature and encryption services provided to end-user applications as well.

There is no single standard public key infrastructure today, though efforts are underway to define one. It is not yet clear whether a standard will be established or multiple independent PKIs will evolve with varying degrees of interoperability. In this sense, the state of PKI technology today can be viewed as similar to local and wide area (WAN) network technology in the 1980s, before there was widespread connectivity via the Internet.

The following services are likely to be found in a PKI:

    * Key registration for issuing a new digital certificate for a public key.

    * Certificate revocation for canceling a previously-issued digital certificate and private key.

    * Key selection for obtaining a party's public key.

    * Trust evaluation for determining whether a digital certificate is valid and which operations it authorizes. 

   a. The subject applies to a certificate authority for digital certificate.
   b. The certificate authority verifies the identity of subject and issues a digital certificate.
   c. The certificate authority or the subject publishes the digital certificate in a certificate repository such as LDAP.
   d. The subject digitally signs an electronic message with the associated private key to ensure sender authenticity, message integrity, and nonrepudiation, and then sends message to recipient.
   e. The recipient retrieves the sender's certificate from the certificate repository and then retrieves the public key from the certificate. 

The BEA Tuxedo product does not provide the tools necessary to be a certificate authority. BEA Systems, Inc. recommends using a third-party certificate authority such as VeriSign or Entrust. By offering a Public Key SPI, BEA Systems, Inc. extends the opportunity to all BEA Tuxedo customers to use a PKI security solution with the PKI software from their vendor of choice. See Single Sign-on for more information.

Informal but recognized industry standards for public key software have been issued by a group of leading communications companies, led by RSA Laboratories. These standards are called "Public-Key Cryptography Standards," or PKCS. The BEA Tuxedo product uses PKCS-5 and PKCS-8 to protect the private keys used with the SSL protocol.

    * PKCS-5 is a specification of a format for using password-based encryption that uses DES to protect data.

    * PKCS-8 is a specification of a format for storing private keys, including the ability to encrypt them with PKCS-5. 
```

## 5.5 Supported Public Key Algorithms

```text
Public key (or asymmetric key) algorithms are implemented through a pair of different but mathematically related keys:

    * A public key (which is distributed widely) for verifying a digital signature or transforming data into a seemingly unintelligible form.

    * A private key (which is always kept secret) for creating a digital signature or returning the data to its original form. 

The public key security in the CORBA security environment also supports digital signature algorithms. Digital signature algorithms are simply public key algorithms used to provide digital signatures.

The BEA Tuxedo product supports the Rivest, Shamir, and Adelman (RSA) algorithm, the Diffie-Hellman algorithm, and Digital Signature Algorithm (DSA). With the exception of DSA, digital signature algorithms can be used for digital signatures and encryption. DSA can be used for digital signatures but not for encryption.
```

## 5.7 Supported Symmetric Key Algorithms

```text
In symmetric key algorithms, the same key is used to encrypt and decrypt a message. The public key encryption system uses symmetric key encryption to encrypt a message sent between two communicating entities. Symmetric key encryption operates at least 1000 times faster than public key cryptography.

A block cipher is a type of symmetric key algorithm that transforms a fixed-length block of plaintext (unencrypted text) data into a block of ciphertext (encrypted text) data of the same length. This transformation takes place in accordance with the value of a randomly generated session key. The fixed length is called the block size.

The Public key security feature in the CORBA security environment supports the following symmetric key algorithms:

    * DES-CBC (Data Encryption Standard for Cipher Block Chaining)

      DES-CBC is a 64-bit block cipher run in Cipher Block Chaining (CBC) mode. It provides 56-bit keys (8 parity bits are stripped from the full 64-bit key).

    * Two-key triple-DES (Data Encryption Standard)

      Two-key triple-DES is a 128-bit block cipher run in Encrypt-Decrypt-Encrypt (EDE) mode. Two-key triple-DES provides two 56-bit keys (in effect, a 112-bit key).

      For some time it has been common practice to protect and transport a key for DES encryption with triple-DES, which means that the input data (in this case the single-DES key) is encrypted, decrypted, and then encrypted again (an encrypt-decrypt-encrypt process). The same key is used for the two encryption operations.

    * RC2 (Rivest's Cipher 2)

      RC2 is a variable key-size block cipher.

    * RC4 (Rivest's Cipher 4)

      RC4 is a variable key-size block cipher with a key size range of 40 to 128 bits. It is faster than DES and is exportable with a key size of 40 bits. A 56-bit key size is allowed for foreign subsidiaries and overseas offices of United States companies. In the United States, RC4 can be used with keys of virtually unlimited length, although the public key security in the CORBA security environment restricts the key length to 128 bits.

Customers of the BEA Tuxedo product cannot expand or modify this list of algorithms.
```

## 5.8 Supported Message Digest Algorithms

```text
The CORBA security environment supports the MD5 and SHA-1 (Secure Hash Algorithm 1) message digest algorithms. Both MD5 and SHA-1 are well known, one-way hash algorithms. A one-way hash algorithm takes a message and converts it into a fixed string of digits, which is referred to as a message digest or hash value.

MD5 is a high-speed, 128-bit hash; it is intended for use with 32-bit machines. SHA-1 offers more security by using a 160-bit hash, but is slower than MD5.
```

## 5.9 Supported Cipher Suites

```text
A cipher suite is a SSL encryption method that includes the key exchange algorithm, the symmetric encryption algorithm, and the secure hash algorithm used to protect the integrity of the communication. For example, the cipher suite RSA_WITH_RC4_128_MD5 uses RSA for key exchange, RC4 with a 128-bit key for bulk encryption, and MD5 for message digest.

The CORBA security environment supports the cipher suites described in Table 2-1.
```

## 5.10 Standards for Digital Certificates

```text
The CORBA security environment supports the digital certificates that conform to the X.509v3 standard. The X.509v3 standard specifies the format of digital certificates. BEA recommends obtaining certificates from a certificate authority such as Verisign or Entrust.
```
