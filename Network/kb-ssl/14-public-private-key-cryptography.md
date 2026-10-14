---
type: reference
title: Public-Private Key Cryptography
description: "Public-private key cryptography: symmetric vs asymmetric methods explained."
tags: [cryptography, pki, security, legacy, primer]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "Network/sslKB#14"
---

# Public-Private Key Cryptography

[↑ sslKB](/Network/kb-ssl/README.md)

## 14.1 On Public-Key Cryptography: Elaborate

### 14.1.1 Symmetrical Encryption Methods

```text
Public-Key Cryptography deals with "asymmetrical" encryption methods. To contrast, let's first look at symmetrical methods: 

Most people have a vague idea how symmetrical encryption works: A message, for example an email, is made unreadable with the help of a key, e.g., a number unknown to outsiders. Only those who know the key are able to make the email readable again. Thus, it is important to make the key only available to those who should have access to the e-mail. Passwords and “your personal secret code” work with methods of this type. As encryption and decryption work with the same key, we call these methods symmetrical.

An important problem of symmetrical encryption methods is: If one cannot send the message to the recipient without fearing it may be intercepted (that’s the reason why we encrypt it in the first place), how do we get the key undetected to the recipient? Send another email with the key? (This is called the “key exchange” problem.) Of course: One can meet ahead of time and agree on a key for every day of the coming year. Or one can send the keys for the next 100 emails in a letter. But these are complicated ways, and the administration and secret storage of all these keys is then another problem.
```

### 14.1.2 Asymmetrical or Public-Key Encryption Methods

```text
In the 1970s, mathematicians discovered the possibility of asymmetrical cryptography:

    Encryption and decryption are done with the help of a key pair, not a single key.
    One key of the key pair encrypts the message, which can only be decrypted by the other key of the key pair, and by no other key. (As we use different keys for encryption and decryption, we call this method asymmetrical.)
    That also works in reverse: What the second key has encrypted can only be decrypted by the first.
    Interestingly enough, one cannot decrypt the message with the key that encrypted it, one needs the other key.
    One cannot compute one key from the knowledge of the other. (For all practical purposes, that is true. Theoretically it is possible; and cryptographers will tell you things such as: Provided one could use all the computing power of the whole planet, one would need the time equivalent to the age of the universe (or so) to compute the other key, given the mathematical algorithms known today. But even if they were mistaken, and it took only half the age of the universe or a hundredth of that time--for all practical purposes there is no way to get the other key from the knowledge of the first.)

This opens up the following possibility: I generate such a key pair for myself. I send one of the keys (which will be my "public" key from now on) to everyone who wants to send me encrypted messages, e.g., secure emails. Whoever wants to send me an email uses this key for the encryption. I can send this key through an open email or on postcards. I can also deposit this key at a publicly accessible place, e.g. on a "key server" on the Internet, with the instruction: "Hi, this is my public key. Whoever wants to send me a secure email, please use this key." But I keep the other key of the key pair strictly to myself, STRICTLY TO MYSELF. This is my "private" or "secret" key.

When someone wants to send me a secure email, he (she) uses my public key for encryption and sends it to me; as only the owner of the secret key is able to decrypt it, only I can read it; it does not matter that my public key is public knowledge. People who have never seen me or met me or whom I do not know can send me such an email, because a secret key exchange is not necessary. They just have to get my public key somehow. (Caution: Not even the sender of such an email is able to decrypt it; the sender may want to make a copy for himself *before* the encryption takes place.) This way, the problem of the key exchange is solved.
```

### 14.1.3 Cryptographic Signatures

```text
Asymmetric cryptography also opens the possibility of signing emails and other messages cryptographically or, as it is sometimes called, "electronically" or “digitally”:

Usually, when we get an email, we trust that the person named as the sender actually sent the email. But any hacker worth his money is able to forge the sender's email address. Asymmetric encryption enables us to do the following:
I can send my email twice:

    In plain text.
    Encrypted, and this time encrypted with my "secret" (!) key. (Just as a reminder: The encrypted form of this email can only be decrypted with my public key.)

To check if this email is from me, people have to:

    Take my public key and decrypt the encrypted email with it. 
    If the decrypted email is the same as the plain text email, both messages have to be from me, because only the owner of my secret key (and that is I) has the means to encrypt something that can be read with my public key. If it had been encrypted by another key, a "decryption" with my public key would only result in gibberish. Thus, the sender of the email is authenticated.

Thus, a hacker can send an email to my bank, saying, "Please transfer $100,000.00" to John Smith (John Smith being the hacker, of course). But (unless the hacker has been able to hack my secret key beforehand), the hacker would not be able to encrypt this email in a way that, decrypted with my public key, it says the same.
```

### 14.1.4 Encrypting and Signing

```text
One can combine encrypting and signing:

    One writes an email.
    One encrypts this email with one's private key.
    One takes (a) and (b), combines them in one email, and encrypts the resulting package with the public key of the recipient.
    This is sent to the recipient.
    The recipient decrypts the email with his/her secret key and gets (a) and (b)
    The recipient uses the public key of the sender, decrypts (b) and checks if (a) and (b) are the same. If yes,
    Bingo!
```

### 14.1.5 Details, Details

```text
If you want to know what you are doing while using public-key cryptography, you do not have to know more than discussed in 1. through 4. The computer reliably does the rest. However, some details are worth mentioning:
Asymmetrical Methods

There are a number of asymmetrical or public-key encryption methods (which are based on mathematically closely related principles):

    RSA (named after Rivest, Shamir, Adleman, the inventors - or should one say discoverers?)
    DH (Diffie-Hellman),
    ElGamal
    there are some more.

Symmetrical Methods

Symmetrical encryption methods use the same key for encryption and decryption. The advantage compared to asymmetrical methods is that they encrypt and decrypt considerably faster. The following are well known symmetrical encryption methods:

    DES (meanwhile, 2005, outdated and insecure: It takes 3 hours to crack a DES message)
    RC4 (with a 40-bit key: insecure. There is a screensaver on the Internet that you can freely download that cracks other people's RC4 messages for you while you are on your coffee break. It takes a total computing time of about a week or so to crack this key)
    Triple-DES
    AES (another name for this method is "Rijndael") with different key lengths, e.g., AES-128, AES-192, AES-256
    Blowfish
    Twofish
    CAST5
    IDEA (there is a patent on IDEA, which is the reason why it is not used everywhere)

The methods from Triple-DES onward are considered safe at this time. (With accelerating computing speeds of new computers, previously safe methods are becoming unsafe over time.)
Mixing Symetrical and Asymmetrical Methods in Practice

In practical public-key cryptography, as for example in PGP, symmetrical and asymmetrical methods are used in combination in order to use the advantages of each method, namely, the faster encryption/decryption times of symmetrical methods and the capability of signing and ease of key exchange of the asymmetric methods. Both methods are combined like this:

    Alice wants to send a secure email to Bob. Alice chooses a symmetrical encryption method, e.g, AES with a key length of 128 bits.
    Alice's Computer has a random number generator that generates the AES key of 128 bits.
    Alice encrypts her email using the AES encryption algorithm with the key generated by her computer. She uses this key only this one time.
    Alice encrypts the AES key (and the information that she used AES) with Bob's asymmetrical public key (e.g., with an RSA key with a length of 1024 bits).
    Alice puts the AES-encrypted original email and the asymmetrically encrypted AES key in a data packet, the encrypted email, and sends it to Bob.
    Bob uses his asymmetrical secret key to get the 128-bit AES key that Alice had used for her original email.
    Bob uses the 128-bit AES key to decrypt Alice's original email.

Key Lengths

The longer a key, the safer it is, i.e., the more computing power and computing time one needs to crack the encryption. 

Symmetrical and asymmetrical keys have very different key lengths to provide the same amount of security. For example,  a symmetrical key of 128 bits corresponds roughly to an asymmetrical key of 2304 bits key length. Thus, if someone claims that a key length of 256 is safe (or unsafe), one has to clarify which method is spoken about.
Hash-Functions

Hash functions condense a message of any length into a unique definite single number of fixed length. (Sometimes this resulting hash number is called a "message digest.") The idea is that knowing the hash number does not give anyone any hint regarding the original message and that a slightly modified message, e.g., by adding just a blank space anywhere in the text, will result in a totally different hash number. Whoever has the hash number has no way (within a reasonable amount of time) to find a reasonable message that corresponds to this number, but whoever has the original message can compute the corresponding hash value easily. If two people want to know if two messages are the same, they can, instead of comparing the messages themselves, calculate the hash numbers of these messages: if the hash numbers are the same, it is very, very, very, ... (you can a lot more "verys" here) unlikely that the messages are different.
In practical applications, the above-mentioned cryptographic signatures use such a hash number.

Well-Known Hash-Algorithms are:

    MD (stands for Message Digest) in the variants MD2, MD4, MD5 (all these are meanwhile not considered a hundred per cent safe any more)
    SHA (Secure Hash Algorithm), in the versions SHA, SHA-1, SHA-2 256, SHA-2 384, SHA-2 512 (SHA and SHA-1 are also not considered 100% safe any more)
    RIPEMD-160 (developed by the European Union).

Two Standards of Asymmetrical Cryptography: PGP and X.509

As far as I know, there are currently two camps which, although they use the same encryption methods, use different implementations of them: the PGP standard und the X.509 certificate standard.
a. PGP

PGP stands for "Pretty Good Privacy". The developers of PGP had a sense of mission and made the PGP programs publicly accessible from the very beginning (also outside the U.S.), as they felt that everyone had the right to privacy. Non-commercial users could even download the PGP programs for free and only commercial users had to license them. One of the key figures was Phil Zimmermann, who developed this standard in the 1990s. He got into a long and expensive legal struggle with the US federal government. The US government was of the opinion that encryption was of high military importance, and that someone who distributes encryption methods, especially outside the U.S., is legally equivalent to an arms dealer. The U.S. government finally dropped the charges against Phil Zimmermann, but only after he had incurred high costs for his legal defense. He became a hero of the privacy movement.

From the very beginning, PGP developers published the source code of the core encryption software and have not claimed a copyright on it. (However, specific applications that use this basic encryption software are copyrighted.) This has led to a "PGP community", and other programs were developed that use the same encryption standard and that, at least theoretically, can all exchange secret emails with each other (There can be incompatibilities with certain methods due to minor variations and between different versions of the same program). Other programs using the PGP standard are, among others, OpenPGP and GPG (also called GnuPG). The commercial version of PGP has changed hands a number of times and is owned today by the PGP Corporation. Their newest version is PGP 9.5 (as of Spring 2007). Private users can use a slightly limited version for free (download it from www.PGP.com); those who want full functionality or are commercial users have to buy the program. GPG and OpenPGP are available in public license, i.e., one can use these programs commercially or non-commercially without charge.
b. X.509 (Certificates)

X.509 is a standard of the computer industry and is used for Internet browser encryption and Internet browser security. A "X.509 Certificate" is a public key tied to an identity of a person, corporation, website, or email address. The certificate authorities issue these certificates and guarantee that the certificate's owner (to be more exact: the owner of the corresponding private key) is really the one the certificate says he/she is. Internet browsers (Microsoft's Internet Explorer, Netscape, and all the others), some email-programs, and some other programs can work with these certificates. The certificates use the same encryption methods as PGP, but the data formats are different. Programs that work with PGP keys cannot (i.e., only with a special "translation") work with X.509 certificates and vice versa. PGP 9.0, however, is able to use X.509 certificates; this is one of its new features.

PGP and X.509 standards are in competition in the field of emails and messaging; it is not clear at the moment which one (or none or both?) will prevail in the end.
```

### 14.1.6 InstantCrypt

```text
InstantCrypt uses GPG as its encryption engine, which uses the PGP standard. Thus, InstandCrypt should be capable of exchanging mails with the other PGP programs (e.g., any application using GPG, OpenPGP, PGP 9.0 and PGP's previous versions), but this has not been extensively tested.
```
