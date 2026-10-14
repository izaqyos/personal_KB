---
type: reference
title: Parse a certificate
description: Section 3 of the legacy sslKB notes.
tags: [kb-ssl]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "Network/sslKB#3"
---

# Parse a certificate

[↑ sslKB](/Network/kb-ssl/README.md)

## 3.1 Parse health EKU

```text
			int ssl_extlist_value_by_oid(X509 *pX509,const char *oidstr, char *string_to_find)
			{
			    int result =  SSL_CERT_OID_NOT_FOUND;  	
			    if(_nLibraryInitState != INIT_STATE_DONE)
			    {
				  SSL_library_init();
				  _nLibraryInitState = INIT_STATE_DONE;
				}

			    ASN1_OBJECT *oid;
			    /* Determine the oid we are looking for */
			    if ((oid = OBJ_txt2obj(oidstr, 1)) == NULL) 
			    {
			      ERR_clear_error();
			      result= SSL_INVALID_PARAMETERS;
			      return result;
			    }
			//X509_EXTENSION *ext = X509V3_EXT_i2d(int ext_nid, int crit, void *ext_struc);

			    int count = X509_get_ext_count(pX509);
			    for (int i=0;i<count;i++)
			    {
				X509_EXTENSION *ext = X509_get_ext(pX509, i);
				if (OBJ_cmp(ext->object, oid) == 0)
				{
				   BIO *bio = BIO_new(BIO_s_mem());
				   if (X509V3_EXT_print(bio, ext, 0, 0) == 1)
				   {
				      BUF_MEM *buf;
				      //char **new = apr_array_push(val_array);
				      BIO_get_mem_ptr(bio, &buf);
			//****************************
				      int result_cmp = strcmp( buf->data, string_to_find);
				      if( result_cmp == 1 ) 
				      {
					 result = SSL_CERT_OID_FOUND;
					 BIO_vfree(bio);
					 break;
				      }
				      else
				      {
					result =  SSL_CERT_OID_NOT_FOUND;  	
				      }
			//****************************              
			 //*new = apr_pstrdup(r->pool, buf->data);
				   }
				    BIO_vfree(bio);
				}

			    }

			   return result;
			}
```

## 3.2 Win32 API (wincrypt)

```text
		http://msdn2.microsoft.com/en-us/library/aa378121.aspx
		IX509ExtensionCertificatePolicies
		Header Declared in CertEnroll.h.
		DLL Requires CertEnroll.dll. 
```

## 3.3 Parse OIDs using open SSL guide:

```text
	The API are generally in the form of:
	For printing:
	int X509V3_EXT_print(BIO *out, X509_EXTENSION *ext, int flag, int indent); 
	int X509V3_EXT_print_fp(FILE *out, X509_EXTENSION *ext, int flag, int indent);

	For general porpuse parsing:
	void *X509V3_EXT_d2i(X509_EXTENSION *ext);

	To parse a cert:
	void	*	X509_get_ext_d2i(X509 *x, int nid, int *crit, int *idx);
	To parse a CRL:
	void	*	X509_CRL_get_ext_d2i(X509_CRL *x, int nid, int *crit, int *idx);
	To parse a CR in CRL:
	void	*	X509_REVOKED_get_ext_d2i(X509_REVOKED *x, int nid, int *crit, int *idx);
	To parse a list of extensions.
	void 	*	X509V3_get_d2i(STACK_OF(X509_EXTENSION) *x, int nid, int *crit, int *idx);

	To parse a cert for extention in basic constraints format (there are three forms of formats for the extentions, I have good reason to suspect policy qualifiers has basic constraints format)
	BASIC_CONSTRAINTS *bs;
	bs = X509_get_ext_d2i(cert, NID_basic_constraints, NULL, NULL);


	see, http://www.opensource.apple.com/darwinsource/Current/OpenSSL096-5/openssl/doc/openssl.txt
	and OpenSSL_EKU_and_Policy_OID_Parsing_guide.txt guide.

	3.4
```
