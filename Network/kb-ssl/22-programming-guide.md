---
type: reference
title: Programming guide
description: Section 21 of the legacy sslKB notes.
tags: [kb-ssl]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "Network/sslKB#21"
---

# Programming guide

[↑ sslKB](/Network/kb-ssl/README.md)

## 21.1 Programmatically Create X509 Certificate using OpenSSL

### 21.1.1 http://stackoverflow.com/questions/256405/programmatically-create-x509-certificate-using-openssl

```text
I realize that this is a very late (and long) answer. But considering how well this question seems to rank in search engine results, I figured it might be worth writing a decent answer for.

A lot of what you will read below is borrowed from this demo and the OpenSSL docs. The code below applies to both C and C++.

Before we can actually create a certificate, we need to create a private key. OpenSSL provides the EVP_PKEY structure for storing an algorithm-independent private key in memory. This structure is declared in openssl/evp.h but is included by openssl/x509.h (which we will need later) so you don't really need to explicitly include the header.

In order to allocate an EVP_PKEY structure, we use EVP_PKEY_new:

EVP_PKEY * pkey;
pkey = EVP_PKEY_new();
There is also a corresponding function for freeing the structure - EVP_PKEY_free - which accepts a single argument: the EVP_PKEY structure initialized above.

Now we need to generate a key. For our example, we will generate an RSA key. This is done with the RSA_generate_key function which is declared in openssl/rsa.h. This function returns a pointer to an RSA structure.

A simple invocation of the function might look like this:

RSA * rsa;
rsa = RSA_generate_key(
    2048,   /* number of bits for the key - 2048 is a sensible value */
    RSA_F4, /* exponent - RSA_F4 is defined as 0x10001L */
    NULL,   /* callback - can be NULL if we aren't displaying progress */
    NULL    /* callback argument - not needed in this case */
);
If the return value of RSA_generate_key is NULL, then something went wrong. If not, then we now have an RSA key, and we can assign it to our EVP_PKEY structure from earlier:

EVP_PKEY_assign_RSA(pkey, rsa);
The RSA structure will be automatically freed when the EVP_PKEY structure is freed.

Now for the certificate itself.

OpenSSL uses the X509 structure to represent an x509 certificate in memory. The definition for this struct is in openssl/x509.h. The first function we are going to need is X509_new. Its use is relatively straightforward:

X509 * x509;
x509 = X509_new();
As was the case with EVP_PKEY, there is a corresponding function for freeing the structure - X509_free.

Now we need to set a few properties of the certificate using some X509_* functions:

ASN1_INTEGER_set(X509_get_serialNumber(x509), 1);
This sets the serial number of our certificate to '1'. Some open-source HTTP servers refuse to accept a certificate with a serial number of '0', which is the default. The next step is to specify the span of time during which the certificate is actually valid. We do that with the following two function calls:

X509_gmtime_adj(X509_get_notBefore(x509), 0);
X509_gmtime_adj(X509_get_notAfter(x509), 31536000L);
The first line sets the certificate's notBefore property to the current time. (The X509_gmtime_adj function adds the specified number of seconds to the current time - in this case none.) The second line sets the certificate's notAfter property to 365 days from now (60 seconds * 60 minutes * 24 hours * 365 days).

Now we need to set the public key for our certificate using the key we generated earlier:

X509_set_pubkey(x509, pkey);
Since this is a self-signed certificate, we set the name of the issuer to the name of the subject. The first step in that process is to get the subject name:

X509_NAME * name;
name = X509_get_subject_name(x509);
If you've ever created a self-signed certificate on the command line before, you probably remember being asked for a country code. Here's where we provide it along with the organization ('O') and common name ('CN'):

X509_NAME_add_entry_by_txt(name, "C",  MBSTRING_ASC,
                           (unsigned char *)"CA", -1, -1, 0);
X509_NAME_add_entry_by_txt(name, "O",  MBSTRING_ASC,
                           (unsigned char *)"MyCompany Inc.", -1, -1, 0);
X509_NAME_add_entry_by_txt(name, "CN", MBSTRING_ASC,
                           (unsigned char *)"localhost", -1, -1, 0);
(I'm using the value 'CA' here because I'm Canadian and that's our country code. Also note that parameter #4 needs to be explicitly cast to an unsigned char *.)

Now we can actually set the issuer name:

X509_set_issuer_name(x509, name);
And finally we are ready to perform the signing process. We call X509_sign with the key we generated earlier. The code for this is painfully simple:

X509_sign(x509, pkey, EVP_sha1());
Note that we are using the SHA-1 hashing algorithm to sign the key. This differs from the mkcert.c demo I mentioned at the beginning of this answer, which uses MD5.

We now have a self-signed certificate! But we're not done yet - we need to write these files out to disk. Thankfully OpenSSL has us covered there too with the PEM_* functions which are declared in openssl/pem.h. The first one we will need is PEM_write_PrivateKey for saving our private key.

FILE * f;
f = fopen("key.pem", "wb");
PEM_write_PrivateKey(
    f,                  /* write the key to the file we've opened */
    pkey,               /* our key from earlier */
    EVP_des_ede3_cbc(), /* default cipher for encrypting the key on disk */
    "replace_me",       /* passphrase required for decrypting the key on disk */
    10,                 /* length of the passphrase string */
    NULL,               /* callback for requesting a password */
    NULL                /* data to pass to the callback */
);
If you don't want to encrypt the private key, then simply pass NULL for the third and fourth parameter above. Either way, you will definitely want to ensure that the file is not world-readable. (For Unix users, this means chmod 600 key.pem.)

Whew! Now we are down to one function - we need to write the certificate out to disk. The function we need for this is PEM_write_X509:

FILE * f;
f = fopen("cert.pem", "wb");
PEM_write_X509(
    f,   /* write the certificate to the file we've opened */
    x509 /* our certificate */
);
And we're done! Hopefully the information in this answer is enough to give you a rough idea of how everything works, although we've barely scratched the surface of OpenSSL.

For those interested in seeing what all of the code above looks like in a real application, I've thrown together a Gist (written in C++) that you can view here.
```

### 21.1.2 mkcert.c

```text
/* Certificate creation. Demonstrates some certificate related
 * operations.
 */


#include <stdio.h>
#include <stdlib.h>

#include <openssl/pem.h>
#include <openssl/conf.h>
#include <openssl/x509v3.h>
#ifndef OPENSSL_NO_ENGINE
#include <openssl/engine.h>
#endif

int mkcert(X509 **x509p, EVP_PKEY **pkeyp, int bits, int serial, int days);
int add_ext(X509 *cert, int nid, char *value);

int main(int argc, char **argv)
	{
	BIO *bio_err;
	X509 *x509=NULL;
	EVP_PKEY *pkey=NULL;

	CRYPTO_mem_ctrl(CRYPTO_MEM_CHECK_ON);

	bio_err=BIO_new_fp(stderr, BIO_NOCLOSE);

	mkcert(&x509,&pkey,512,0,365);

	RSA_print_fp(stdout,pkey->pkey.rsa,0);
	X509_print_fp(stdout,x509);

	PEM_write_PrivateKey(stdout,pkey,NULL,NULL,0,NULL, NULL);
	PEM_write_X509(stdout,x509);

	X509_free(x509);
	EVP_PKEY_free(pkey);

#ifndef OPENSSL_NO_ENGINE
	ENGINE_cleanup();
#endif
	CRYPTO_cleanup_all_ex_data();

	CRYPTO_mem_leaks(bio_err);
	BIO_free(bio_err);
	return(0);
	}

static void callback(int p, int n, void *arg)
	{
	char c='B';

	if (p == 0) c='.';
	if (p == 1) c='+';
	if (p == 2) c='*';
	if (p == 3) c='\n';
	fputc(c,stderr);
	}

int mkcert(X509 **x509p, EVP_PKEY **pkeyp, int bits, int serial, int days)
	{
	X509 *x;
	EVP_PKEY *pk;
	RSA *rsa;
	X509_NAME *name=NULL;
	
	if ((pkeyp == NULL) || (*pkeyp == NULL))
		{
		if ((pk=EVP_PKEY_new()) == NULL)
			{
			abort(); 
			return(0);
			}
		}
	else
		pk= *pkeyp;

	if ((x509p == NULL) || (*x509p == NULL))
		{
		if ((x=X509_new()) == NULL)
			goto err;
		}
	else
		x= *x509p;

	rsa=RSA_generate_key(bits,RSA_F4,callback,NULL);
	if (!EVP_PKEY_assign_RSA(pk,rsa))
		{
		abort();
		goto err;
		}
	rsa=NULL;

	X509_set_version(x,2);
	ASN1_INTEGER_set(X509_get_serialNumber(x),serial);
	X509_gmtime_adj(X509_get_notBefore(x),0);
	X509_gmtime_adj(X509_get_notAfter(x),(long)60*60*24*days);
	X509_set_pubkey(x,pk);

	name=X509_get_subject_name(x);

	/* This function creates and adds the entry, working out the
	 * correct string type and performing checks on its length.
	 * Normally we'd check the return value for errors...
	 */
	X509_NAME_add_entry_by_txt(name,"C",
				MBSTRING_ASC, "UK", -1, -1, 0);
	X509_NAME_add_entry_by_txt(name,"CN",
				MBSTRING_ASC, "OpenSSL Group", -1, -1, 0);

	/* Its self signed so set the issuer name to be the same as the
 	 * subject.
	 */
	X509_set_issuer_name(x,name);

	/* Add various extensions: standard extensions */
	add_ext(x, NID_basic_constraints, "critical,CA:TRUE");
	add_ext(x, NID_key_usage, "critical,keyCertSign,cRLSign");

	add_ext(x, NID_subject_key_identifier, "hash");

	/* Some Netscape specific extensions */
	add_ext(x, NID_netscape_cert_type, "sslCA");

	add_ext(x, NID_netscape_comment, "example comment extension");


#ifdef CUSTOM_EXT
	/* Maybe even add our own extension based on existing */
	{
		int nid;
		nid = OBJ_create("1.2.3.4", "MyAlias", "My Test Alias Extension");
		X509V3_EXT_add_alias(nid, NID_netscape_comment);
		add_ext(x, nid, "example comment alias");
	}
#endif
	
	if (!X509_sign(x,pk,EVP_md5()))
		goto err;

	*x509p=x;
	*pkeyp=pk;
	return(1);
err:
	return(0);
	}

/* Add extension using V3 code: we can set the config file as NULL
 * because we wont reference any other sections.
 */

int add_ext(X509 *cert, int nid, char *value)
	{
	X509_EXTENSION *ex;
	X509V3_CTX ctx;
	/* This sets the 'context' of the extensions. */
	/* No configuration database */
	X509V3_set_ctx_nodb(&ctx);
	/* Issuer and subject certs: both the target since it is self signed,
	 * no request and no CRL
	 */
	X509V3_set_ctx(&ctx, cert, cert, NULL, NULL, 0);
	ex = X509V3_EXT_conf_nid(NULL, &ctx, nid, value);
	if (!ex)
		return 0;

	X509_add_ext(cert,ex,-1);
	X509_EXTENSION_free(ex);
	return 1;
	}

		21.1.3
```

## 21.2 Create signinig request

### 21.2.1 mqreq.c

```text
/* Certificate request creation. Demonstrates some request related
 * operations.
 */

#include <stdio.h>
#include <stdlib.h>

#include <openssl/pem.h>
#include <openssl/conf.h>
#include <openssl/x509v3.h>
#ifndef OPENSSL_NO_ENGINE
#include <openssl/engine.h>
#endif

int mkreq(X509_REQ **x509p, EVP_PKEY **pkeyp, int bits, int serial, int days);
int add_ext(STACK_OF(X509_REQUEST) *sk, int nid, char *value);

int main(int argc, char **argv)
	{
	BIO *bio_err;
	X509_REQ *req=NULL;
	EVP_PKEY *pkey=NULL;

	CRYPTO_mem_ctrl(CRYPTO_MEM_CHECK_ON);

	bio_err=BIO_new_fp(stderr, BIO_NOCLOSE);

	mkreq(&req,&pkey,512,0,365);

	RSA_print_fp(stdout,pkey->pkey.rsa,0);
	X509_REQ_print_fp(stdout,req);

	PEM_write_X509_REQ(stdout,req);

	X509_REQ_free(req);
	EVP_PKEY_free(pkey);

#ifndef OPENSSL_NO_ENGINE
	ENGINE_cleanup();
#endif
	CRYPTO_cleanup_all_ex_data();

	CRYPTO_mem_leaks(bio_err);
	BIO_free(bio_err);
	return(0);
	}

static void callback(int p, int n, void *arg)
	{
	char c='B';

	if (p == 0) c='.';
	if (p == 1) c='+';
	if (p == 2) c='*';
	if (p == 3) c='\n';
	fputc(c,stderr);
	}

int mkreq(X509_REQ **req, EVP_PKEY **pkeyp, int bits, int serial, int days)
	{
	X509_REQ *x;
	EVP_PKEY *pk;
	RSA *rsa;
	X509_NAME *name=NULL;
	STACK_OF(X509_EXTENSION) *exts = NULL;
	
	if ((pk=EVP_PKEY_new()) == NULL)
		goto err;

	if ((x=X509_REQ_new()) == NULL)
		goto err;

	rsa=RSA_generate_key(bits,RSA_F4,callback,NULL);
	if (!EVP_PKEY_assign_RSA(pk,rsa))
		goto err;

	rsa=NULL;

	X509_REQ_set_pubkey(x,pk);

	name=X509_REQ_get_subject_name(x);

	/* This function creates and adds the entry, working out the
	 * correct string type and performing checks on its length.
	 * Normally we'd check the return value for errors...
	 */
	X509_NAME_add_entry_by_txt(name,"C",
				MBSTRING_ASC, "UK", -1, -1, 0);
	X509_NAME_add_entry_by_txt(name,"CN",
				MBSTRING_ASC, "OpenSSL Group", -1, -1, 0);

#ifdef REQUEST_EXTENSIONS
	/* Certificate requests can contain extensions, which can be used
	 * to indicate the extensions the requestor would like added to 
	 * their certificate. CAs might ignore them however or even choke
	 * if they are present.
	 */

	/* For request extensions they are all packed in a single attribute.
	 * We save them in a STACK and add them all at once later...
	 */

	exts = sk_X509_EXTENSION_new_null();
	/* Standard extenions */

	add_ext(exts, NID_key_usage, "critical,digitalSignature,keyEncipherment");

	/* This is a typical use for request extensions: requesting a value for
	 * subject alternative name.
	 */

	add_ext(exts, NID_subject_alt_name, "email:steve@openssl.org");

	/* Some Netscape specific extensions */
	add_ext(exts, NID_netscape_cert_type, "client,email");



#ifdef CUSTOM_EXT
	/* Maybe even add our own extension based on existing */
	{
		int nid;
		nid = OBJ_create("1.2.3.4", "MyAlias", "My Test Alias Extension");
		X509V3_EXT_add_alias(nid, NID_netscape_comment);
		add_ext(x, nid, "example comment alias");
	}
#endif

	/* Now we've created the extensions we add them to the request */

	X509_REQ_add_extensions(x, exts);

	sk_X509_EXTENSION_pop_free(exts, X509_EXTENSION_free);

#endif
	
	if (!X509_REQ_sign(x,pk,EVP_md5()))
		goto err;

	*req=x;
	*pkeyp=pk;
	return(1);
err:
	return(0);
	}

/* Add extension using V3 code: we can set the config file as NULL
 * because we wont reference any other sections.
 */

int add_ext(STACK_OF(X509_REQUEST) *sk, int nid, char *value)
	{
	X509_EXTENSION *ex;
	ex = X509V3_EXT_conf_nid(NULL, NULL, nid, value);
	if (!ex)
		return 0;
	sk_X509_EXTENSION_push(sk, ex);

	return 1;
	}
	
		21.2.2
```

## 21.3 openssl demos - https://github.com/openssl/openssl/tree/master/demos

```text
	21.4
```
