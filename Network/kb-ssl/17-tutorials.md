---
type: reference
title: Tutorials
description: "SSL programming concepts tutorial: SSL_CTX, SSL, SSL_METHOD and cipher data structures."
tags: [ssl, openssl, tutorial, legacy, c]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: deprecated
capture_type: source
legacy_source: "Network/sslKB#16"
---

# Tutorials

> **Deprecated (2026-10):** Vendor doc for SSLv2/3. Current: TLS 1.2+ only. Source: <https://www.rfc-editor.org/rfc/rfc8996>

[↑ sslKB](/Network/kb-ssl/README.md)

## 16.1 Chapter 4 SSL Programming Concepts - http://h71000.www7.hp.com/doc/83final/ba554_90007/ch04.html?btnPrev=%AB%A0prev

```text
Table of Contents

HP SSL Data Structures

    SSL_CTX Structure
    SSL Structure
    SSL_METHOD Structure
    SSL_CIPHER Structure
    CERT/X509 Structure
    BIO Structure

Certificates for SSL Applications

    Configuring Certificates in the SSL Client and Server
    Obtaining and Creating Certificates

SSL Programming Tutorial

    Initializing the SSL Library
    Creating and Setting Up the SSL Context Structure (SSL_CTX)
    Setting Up the Certificate and Key
    Creating and Setting Up the SSL Structure
    Setting Up the TCP/IP Connection
    Setting Up the Socket/Socket BIO in the SSL Structure
    SSL Handshake
    Transmitting SSL Data
    Closing an SSL Connection
    Resuming an SSL Connection
    Renegotiating the SSL Handshake
    Finishing the SSL Application

This chapter discusses how to write application programs using HP SSL on OpenVMS. The SSL library provides APIs supporting three SSL protocols: SSL Version 2 (SSLv2), SSL Version 3 (SSLv3), and TLS Version 1 (TLSv1). You can write an HP SSL application program in C or C++.

This chapter provides the following information:

    A description of the seven HP SSL data structures

    How to configure and obtain certificates

    An HP SSL programming tutorial that shows the implementation of a simple HP SSL client and server program using HP SSL APIs	
```

### 16.1.1 HP SSL Data Structures - http://h71000.www7.hp.com/doc/83final/ba554_90007/ch04s01.html?btnNext=next%A0%BB

```text
Before you start SSL application development, you should understand the data structures used for SSL APIs, and the relationships between the data structures.

SSL APIs use data structures to hold various types of information about SSL sessions and connections. The most important structures are SSL_CTX and SSL. Usually, one SSL_CTX structure exists per SSL application program, and an SSL structure is created every time a new SSL connection is created. An SSL structure inherits configuration information from the SSL_CTX structure when it is created.

Table 4-1 “APIs for Data Structure Creation and Deallocation” shows the APIs commonly used for creating and deallocating data structures.

Table 4-1 APIs for Data Structure Creation and Deallocation
Data Structure	API for Creation	API for Deallocation
SSL_CTX	SSL_CTX_new()	SSL_CTX_free()
SSL	SSL_new()	SSL_free()
SSL_SESSION	SSL_SESSION_new()	SSL_SESSION_free()
BIO	BIO_new()	BIO_free()
X509	X509_new()	X509_free()
RSA	RSA_new()	RSA_free()
DH	DH_new()	DH_free()
 

Figure 4-1 “ Relationship Between SSL_CTX and SSL” shows the relationship between the SSL_CTX and SSL data structures.

Figure 4-1  Relationship Between SSL_CTX and SSL
Relationship Between SSL_CTX and SSL
SSL_CTX Structure

The SSL_CTX structure is defined in ssl.h. An SSL_CTX structure stores default values for SSL structures. (The SSL structures are created after the SSL_CTX structure is created and configured.) The SSL_CTX structure also holds information about SSL connections and sessions (the numbers of new SSL connections, renegotiations, session resumptions, and so on).

Each SSL client or server program creates and keeps only one SSL_CTX structure. The SSL_CTX structure is created at the beginning of the SSL application program. The SSL_CTX structure is configured with the default values that will be inherited by the SSL structures. For example, a CA certificate loaded in the SSL_CTX structure is also loaded into an SSL structure when that SSL structure is created.
	
	NOTE: Data structure definitions are subject to change in future releases of HP SSL for OpenVMS.
	
SSL Structure

An SSL structure is created for every SSL connection in the SSL client or server program. You create the SSL structure after creating and configuring the SSL_CTX structure because the SSL structure inherits default values from the SSL_CTX structure. The inheritance of the default values enables the SSL structure to be used without explicit configuration. However, it is possible to change the inherited values in a specific SSL structure.

An SSL structure saves the addresses of data structures that store information about SSL connections and sessions. These data structures are as follows:

    The SSL_CTX structure from which the SSL structure is created

    SSL_METHOD (SSL protocol version)

    SSL_SESSION

    SSL_CIPHER

    CERT (certificate information extracted from an X.509 structure)

    BIO (an SSL connection is performed via BIO)

The SSL information (protocol version, connection status values, and so on) in the SSL structure is used for the SSL connection. Figure 4-2 “ Structures Associated with SSL Structure” shows the structures associated with the SSL structure.

Figure 4-2  Structures Associated with SSL Structure
Structures Associated with SSL Structure
SSL_METHOD Structure

The SSL_METHOD structure is defined in ssl.h. An SSL_METHOD structure contains pointers to the functions that implement the SSL protocol version specified. This structure must be created before creation of the SSL_CTX structure.
SSL_CIPHER Structure

The SSL_CIPHER structure is defined in the ssl.h header file. An SSL_CIPHER structure holds information about the cipher suite used for SSL connections and sessions.
CERT/X509 Structure

In OpenSSL application programs, an X.509 certificate is stored as an X509 structure. However, after loading an X509 structure into an SSL_CTX or SSL structure, the X.509 certificate information is extracted from the X509 structure and stored in a CERT structure associated with the SSL_CTX or SSL structure. The X509 and CERT structures are defined in x509.h and ssl_locl.h, respectively.
	
	NOTE: The ssl_locl.h header file is not used for SSL application programs because it defines only internal functions and structures, such as the CERT structure. In SSL application programs, a certificate is stored in an X509 structure, not in a CERT structure. An SSL application developer does not need to know the definition of the CERT structure and ssl_locl.h.
	
BIO Structure

A BIO structure is an I/O abstraction in an SSL application with SSL APIs. The BIO structure encapsulates an underlying I/O secured by SSL, and all the communication between the client and server is conducted through this structure. The BIO structure is defined in bio.h.
```

### 16.1.2 Certificates for SSL Applications - http://h71000.www7.hp.com/doc/83final/ba554_90007/ch04s02.html?btnNext=next%A0%BB

```text
To establish an SSL connection successfully, you must load proper certificates into the SSL client and server. In this section, a few common uses of certificates are described. For general information about certificates, see Chapter 3.
Configuring Certificates in the SSL Client and Server

SSL client and server applications might require four certificates:

    Server-s CA certificate

    Client-s CA certificate

    Client certificate

    Server certificate

A root CA is a CA certificate that is located as a root in a certificate signing hierarchy. A root CA is not signed by any other CA - it is signed by itself. In Figure 4-3 “ Client and Server Certificates Directly Signed by CAs” and Figure 4-4 “ Client and Server Certificates Indirectly Signed by CAs”, the CA certificates correspond to root CAs.

For successful certificate verification, the certificates must have the proper signing relationships, as shown in Figure 4-3 “ Client and Server Certificates Directly Signed by CAs” and Figure 4-4 “ Client and Server Certificates Indirectly Signed by CAs”. In Figure 4-3 “ Client and Server Certificates Directly Signed by CAs”, the client and server certificates are directly signed by their peers- CAs.

Figure 4-3  Client and Server Certificates Directly Signed by CAs
Client and Server Certificates Directly Signed by CAs
	
	NOTE: The client and server certificates are not necessarily directly signed by the CAs (see Figure 4-3 “ Client and Server Certificates Directly Signed by CAs”). In some cases, the certificate is signed by an RA (registration authority) or an intermediate CA whose certificate is signed by the CA that is trusted by the peer. (The client certificate in Figure 4-4 “ Client and Server Certificates Indirectly Signed by CAs” is an example of this situation.) In other cases, the certificate's signing chain may involve more RAs or intermediate CAs. (The server certificate in Figure 4-4 “ Client and Server Certificates Indirectly Signed by CAs” is an example of this situation.)
	

As long as the chain depth setting is appropriate (that is, the certificate chain depth for verification is longer than the depth from the CA to the certificate being verified), the certificate verification succeeds.

Figure 4-4  Client and Server Certificates Indirectly Signed by CAs
Client and Server Certificates Indirectly Signed by CAs

Figure 4-5 “ Certificates on SSL Client and Server (Case 1)” depicts the most common deployment of certificates. This deployment is often used when establishing SSL connections between web browsers and a web server. As part of its initialization, the SSL server loads a certificate (server certificate) signed by a CA. This CA is trusted by the SSL clients. When a client verifies the server, the server certificate is sent to the client and then is verified against the CA certificate. The fact that the server has a certificate signed by a trustworthy CA means that the server can be trusted by the client, because the client trusts the CA. This certificate setup prevents the SSL client from establishing an SSL connection with an untrustworthy SSL server.

Figure 4-5  Certificates on SSL Client and Server (Case 1)
Certificates on SSL Client and Server (Case 1)

In addition to server certificate verification on the SSL client, you can perform client certificate verification on the SSL server. This is shown in Figure 4-6 “ Certificates on SSL Client and Server (Case 2)”. Web sites that require higher security, such as banks and online brokers, deploy this model. The SSL client connecting to this type of SSL server is requested to send its certificate (client certificate) to the server. The SSL server then performs client authentication based on the client certificate verification.

This method is the same as the one used in Figure 4-5 “ Certificates on SSL Client and Server (Case 1)”, but in this case the server checks the client certificate against the server-s CA certificate to establish the level of trust. Using this implementation, the SSL server can achieve enhanced client authentication by combining with another authentication method, such as requiring a user name and password.

Figure 4-6  Certificates on SSL Client and Server (Case 2)
Certificates on SSL Client and Server (Case 2)
Obtaining and Creating Certificates

If the proper certificates are not in place, the SSL application user or developer must either create them or obtain them from a trustworthy organization such as a CA or RA. The SSL command line interface (described in Chapter 5) and Certificate Tool (described in Chapter 3) allow you to create X.509 certificates. Figure 4-7 “ Certificate Creation Process” shows the process for creating an X.509 certificate.

Figure 4-7  Certificate Creation Process
Certificate Creation Process

When you obtain or create a certificate, consider the following:

    Algorithms

    Key size

    Certificate/key format

    Security policies

Algorithms: RSA certificate with RSA keys or DSA certificate with DH keys

Although RSA certificates are commonly used for SSL, DSA certificates can be loaded in the SSL structure as well. (Most SSL servers load only RSA certificates. SSL servers that use DSA certificates are rare.)
	
	NOTE: RSA and DSA certificates and keys are incompatible. An SSL client that has only an RSA certificate and key cannot establish a connection with an SSL server that has only a DSA certificate and key.
	

To avoid this problem, you can load both RSA and DSA certificates and key pairs in the SSL_CTX and SSL structure. (For more information, see the description of the SSL_CTX_use_certificate() and SSL_CTX_set_cipher_list() APIs in this manual.)

If you use a DSA certificate, you must load DH keys. Although the RSA algorithm is used for both key exchange and signing operations, DSA can be used only for signing. Therefore, DH is used as the key agreement algorithm with a DSA certificate in an SSL application.
	
	NOTE: DSA certificates and DH keys cannot be created with the OpenVMS SSL Certificate Tool (described in Chapter 3). Use the SSL command line interface, described in Chapter 5, instead.
	
Key size: 512-bit, 1024-bit, or others

You must specify the key size of the algorithms when you create a certificate. The key size affects security and performance of the SSL application. A longer key makes the application more secure, but it can slow performance. A shorter key makes encryption and decryption faster, but lowers security.

Usually RSA and DSA keys are 512-bit, 1024-bit or 2048-bit. (1024-bit keys are the most commonly used.) In some cases, you must decide the key size based on the application-s requirement or corporate or national security policy.
Certificate and key formats: PEM, DER or others

The OpenSSL command line interface supports the following three certificate formats:
DER - Encodes the certificate using Distinguished Encoding Rules.
PEM - The Base64 encoding of the DER encoding, with header and footer lines added.
NET - An obsolete Netscape server format.

The most common certificate format for SSL applications is PEM. The SSL Certificate Tool, described in Chapter 3, supports only the PEM format. If a DER certificate is necessary, use the SSL command line interface, described in Chapter 5.
Security policy of the application using the certificates

Check the application-s security policy or requirements when you issue certificates. Some applications require certain attributes or values in the X.509 certificates. For example, SSL applications for financial transactions might have a security policy to use 1024-bit or longer RSA keys, or certain extensions in an X.509 certificates might be mandatory.

Many countries have national policies regarding encryption. Using and exporting strong encryption algorithms and keys might be affected by these policies. Also, some organizations might have policies that disallow their employees using strong encryption.
```

### 16.1.3 SSL Programming Tutorial - http://h71000.www7.hp.com/doc/83final/ba554_90007/ch04s03.html

```text
This section demonstrates the implementation of a simple SSL client and server program using OpenSSL APIs.

Although SSL client and server programs might differ in their setup and configuration, their common internal procedures can be summarized in Figure 4-8 “ Overview of SSL Application with OpenSSL APIs”. These procedures are discussed in the following sections.

Figure 4-8  Overview of SSL Application with OpenSSL APIs
Overview of SSL Application with OpenSSL APIs
Initializing the SSL Library

Before you can call any other OpenSSL APIs in the SSL application programs, you must perform initialization using the following SSL APIs.

SSL_library_init(); /* load encryption & hash algorithms for SSL */                
SSL_load_error_strings(); /* load the error strings for good error reporting */

The SSL_library_init() API registers all ciphers and hash algorithms used in SSL APIs. The encryption algorithms loaded with this API are DES-CBC, DES-EDE3-CBC, RC2 and RC4 (IDEA and RC5 are not available in HP SSL for OpenVMS); and the hash algorithms are MD2, MD5, and SHA. The SSL_library_init() API has a return value that is always 1 (integer).

SSL applications should call the SSL_load_error_strings() API. This API loads error strings for SSL APIs as well as for Crypto APIs. Both SSL and Crypto error strings need to be loaded because many SSL applications call some Crypto APIs as well as SSL APIs.
Creating and Setting Up the SSL Context Structure (SSL_CTX)

The first step after the intialization is to choose an SSL/TLS protocol version. Do this by creating an SSL_METHOD structure with one of the following APIs. The SSL_METHOD structure is then used to create an SSL_CTX structure with the SSL_CTX_new() API.

For every SSL/TLS version, there are three types of APIs to create an SSL_METHOD structure: one for both client and server, one for server only, and one for client only. SSLv2, SSLv3, and TLSv1 APIs correspond with the same name protocols. Table 4-2 “ Types of APIs for SSL_METHOD Creation” shows the types of APIs.

Table 4-2  Types of APIs for SSL_METHOD Creation
Protocol type	For combined client and server	For a dedicated server 	For a dedicated client
SSLv2	SSLv2_method()	SSLv2_server_ method()	SSLv2_client_ method()
SSLv3	SSLv3_method()	SSLv3_server_ method()	SSLv3_client_ method()
TLSv1	TLSv1_method()	TLSv1_server_ method()	TLSv1_client_ method()
SSLv23	SSLv23_method()	SSLv23_server_ method()	SSLv23_client_ method()
 
	
	NOTE: There is no SSL protocol version named SSLv23. The SSLv23_method() API and its variants choose SSLv2, SSLv3, or TLSv1 for compatibility with the peer.
	

Consider the incompatibility among the SSL/TLS versions when you develop SSL client/server applications. For example, a TLSv1 server cannot understand a client-hello message from an SSLv2 or SSLv3 client. The SSLv2 client/server recognizes messages from only an SSLv2 peer. The SSLv23_method() API and its variants may be used when the compatibility with the peer is important. An SSL server with the SSLv23 method can understand any of the SSLv2, SSLv3, and TLSv1 hello messages. However, the SSL client using the SSLv23 method cannot establish connection with the SSL server with the SSLv3/TLSv1 method because SSLv2 hello message is sent by the client.

The SSL_CTX_new() API takes the SSL_METHOD structure as an argument and creates an SSL_CTX structure.

In the following example, an SSL_METHOD structure that can be used for either an SSLv3 client or SSLv3 server is created and passed to SSL_CTX_new(). The SSL_CTX structure is initialized for SSLv3 client and server.

meth = SSLv3_method();
ctx = SSL_CTX_new(meth);

Setting Up the Certificate and Key

“Certificates for SSL Applications” discussed how the SSL client and server programs require you to set up appropriate certificates. This setup is done by loading the certificates and keys into the SSL_CTX or SSL structures. The mandatory and optional certificates are as follows:

    For the SSL server:
    Server's own certificate (mandatory)
    CA certificate (optional)

    For the SSL client:
    CA certificate (mandatory)
    Client's own certificate (optional)

=
Loading a Certificate (Client/Server Certificate)

Use the SSL_CTX_use_certificate_file() API to load a certificate into an SSL_CTX structure. Use the SSL_use_certificate_file() API to load a certificate into an SSL structure. When the SSL structure is created, the SSL structure automatically loads the same certificate that is contained in the SSL_CTX structure. Therefore, you onlyneed to call the SSL_use_certificate_file() API for the SSL structure only if it needs to load a different certificate than the default certificate contained in the SSL_CTX structure.
Loading a Private Key

The next step is to set a private key that corresponds to the server or client certificate. In the SSL handshake, a certificate (which contains the public key) is transmitted to allow the peer to use it for encryption. The encrypted message sent from the peer can be decrypted only using the private key. You must preload the private key that was created with the public key into the SSL structure.

The following APIs load a private key into an SSL or SSL_CTX structure:

    SSL_CTX_use_PrivateKey()

    SSL_CTX_use_PrivateKey_ASN1()

    SSL_CTX_use_PrivateKey_file()

    SSL_CTX_use_RSAPrivateKey()

    SSL_CTX_use_RSAPrivateKey_ASN1()

    SSL_CTX_use_RSAPrivateKey_file()

    SSL_use_PrivateKey()

    SSL_use_PrivateKey_ASN1()

    SSL_use_PrivateKey_file()

    SSL_use_RSAPrivateKey()

    SSL_use_RSAPrivateKey_ASN1()

    SSL_use_RSAPrivateKey_file()

Loading a CA Certificate

To verify a certificate, you must first load a CA certificate (because the peer certificate is verified against a CA certificate). The SSL_CTX_load_verify_locations() API loads a CA certificate into the SSL_CTX structure.

The prototype of this API is as follows:

int SSL_CTX_load_verify_locations(SSL_CTX *ctx, const char *CAfile, 
const char *CApath);

The first argument, ctx, points to an SSL_CTX structure into which the CA certificate is loaded. The second and third arguments, CAfile and CApath, are used to specify the location of the CA certificate. When looking up CA certificates, the OpenSSL library first searches the certificates in CAfile, then those in CApath.

The following rules apply to the CAfile and CApath arguments:

    If the certificate is specified by CAfile (the certificate must exist in the same directory as the SSL application), specify NULL for CApath.

    To use the third argument, CApath, specify NULL for CAfile. You must also hash the CA certificates in the directory specified by CApath. Use the Certificate Tool (described in Chapter 3) to perform the hashing operation.

Setting Up Peer Certificate Verification

The CA certificate loaded in the SSL_CTX structure is used for peer certificate verification. For example, peer certificate verification on the SSL client is performed by checking the relationships between the CA certificate (loaded in the SSL client) and the server certificate.

For successful verification, the peer certificate must be signed with the CA certificate directly or indirectly (a proper certificate chain exists). The certificate chain length from the CA certificate to the peer certificate can be set in the verify_depth field of the SSL_CTXand SSL structures. (The value in SSL is inherited from SSL_CTX when you create an SSL structure using the SSL_new() API). Setting verify_depth to 1 means that the peer certificate must be directly signed by the CA certificate.

The SSL_CTX_set_verify() API allows you to set the verification flags in the SSL_CTX structure and a callback function for customized verification as its third argument. (Setting NULL to the callback function means the built-in default verification function is used.) In the second argument of SSL_CTX_set_verify(), you can set the following macros:

    SSL_VERIFY_NONE
    ì

    SSL_VERIFY_PEER

    SSL_VERIFY_FAIL_IF_NO_PEER_CERT

    SSL_VERIFY_CLIENT_ONCE

The SSL_VERIFY_PEER macro can be used on both SSL client and server to enable the verification. However, the subsequent behaviors depend on whether the macro is set on a client or a server. For example:

/* Set a callback function (verify_callback) for peer certificate */
/* verification */
SSL_CTX_set_verify(ctx, SSL_VERIFY_PEER, verify_callback);
/* Set the verification depth to 1 */
SSL_CTX_set_verify_depth(ctx,1);

You can verify a peer certificate in another, less common way - by using the SSL_get_verify_result() API. This method allows you to obtain the peer certificate verification result without using the SSL_CTX_set_verify() API.

Call the following two APIs before you call the SSL_get_verify_result() API:

    Call SSL_connect() (in the client) or SSL_accept() (in the server) to perform the SSL handshake. Certificate verification is performed during the handshake. SSL_get_verify_result() cannot obtain the result before the verification process.

    Call SSL_get_peer_certificate() to explicitly obtain the peer certificate. The X509_V_OK macro value is returned when a peer certificate is not presented as well as when the verification succeeds. 

The following code shows how to use SSL_get_verify_result() in the SSL client:

 SSL_CTX_set_verify_depth(ctx, 1);
     err = SSL_connect(ssl);
 if(SSL_get_peer_certificate(ssl) != NULL)
      {
         if(SSL_get_verify_result(ssl) == X509_V_OK)

     BIO_printf(bio_c_out, "client verification with SSL_get_verify_result() 
      succeeded.\n");                
         else{
 
            BIO_printf(bio_err, "client verification with SSL_get_verify_result() 
      failed.\n");
 
           exit(1);
          }
      }
  else
      BIO_printf(bio_c_out, -the peer certificate was not presented.\n-);

Example 1: Setting Up Certificates for the SSL Server

The SSL protocol requires that the server set its own certificate and key. If you want the server to conduct client authentication with the client certificate, the server must load a CA certificate so that it can verify the client-s certificate.

The following example shows how to set up certificates for the SSL server:

 /* Load server certificate into the SSL context */
               if (SSL_CTX_use_certificate_file(ctx, SERVER_CERT, 
         SSL_FILETYPE_PEM) <= 0) } 

                        ERR_print_errors(bio_err);  /* == 
                  ERR_print_errors_fp(stderr); */
                     exit(1);
            }
 
               /* Load the server private-key into the SSL context */
             if (SSL_CTX_use_PrivateKey_file(ctx, SERVER_KEY, 
          SSL_FILETYPE_PEM) <= 0) {

                   ERR_print_errors(bio_err);  /* == 
                  ERR_print_errors_fp(stderr); */
                     exit(1);
            }
 
/* Load trusted CA. */
            if (!SSL_CTX_load_verify_locations(ctx,CA_CERT,NULL)) { 
                    ERR_print_errors(bio_err);  /* == 
                  ERR_print_errors_fp(stderr); */
                     exit(1);
            }
 
               /* Set to require peer (client) certificate verification */
                SSL_CTX_set_verify(ctx, SSL_VERIFY_PEER, verify_callback);
          /* Set the verification depth to 1 */
               SSL_CTX_set_verify_depth(ctx,1);

Example 2: Setting Up Certificates for the SSL Client

Generally, the SSL client verifies the server certificate in the process of the SSL handshake. This verification requires the SSL client to set up its trusting CA certificate. The server certificate must be signed with the CA certificate loaded in the SSL client in order for the server certificate verification to succeed.

The following example shows how to set up certificates for the SSL client:

/*----- Load a client certificate into the SSL_CTX structure -----*/
       if(SSL_CTX_use_certificate_file(ctx,CLIENT_CERT,
       SSL_FILETYPE_PEM) <= 0){
                    ERR_print_errors_fp(stderr);
                exit(1);
            }
 
/*----- Load a private-key into the SSL_CTX structure -----*/
        if(SSL_CTX_use_PrivateKey_file(ctx,CLIENT_KEY,
        SSL_FILETYPE_PEM) <= 0){
                    ERR_print_errors_fp(stderr);
                exit(1);
            }
 
/* Load trusted CA. */
            if (!SSL_CTX_load_verify_locations(ctx,CA_CERT,NULL)) {
                     ERR_print_errors_fp(stderr);
                    exit(1);
            }

Creating and Setting Up the SSL Structure

Call SSL_new() to create an SSL structure. Information for an SSL connection is stored in the SSL structure. The protocol for the SSL_new() API is as follows:

ssl = SSL_new(ctx);

A newly created SSL structure inherits information from the SSL_CTX structure. This information includes types of connection methods, options, verification settings, and timeout settings. No additional settings are required for the SSL structure if the appropriate initialization and configuration have been done for the SSL_CTX structure.

You can modify the default values in the SSL structure using SSL APIs. To do this, use variants of the APIs that set attributes of the SSL_CTX structure. For example, you can use SSL_CTX_use_certificate() to load a certificate into an SSL_CTX structure, and you can use SSL_use_certificate() to load a certificate into an SSL structure.
Setting Up the TCP/IP Connection

Although SSL works with some other reliable protocols, TCP/IP is the most common transport protocol used with SSL.

The following sections describe how to set up TCP/IP for the SSL APIs. This configuration is the same as in many other TCP/IP client/server application programs; it is not specific to SSL API applications. In these sections, TCP/IP is set up with the ordinary socket APIs, although it is also possible to use OpenVMS system services.
Creating and Setting Up the Listening Socket (on the SSL Server)

The SSL server needs two sockets as an ordinary TCP/IP server—one for the SSL connection, the other for detecting an incoming connection request from the SSL client.

In the following code, the socket() function creates a listening socket. After the address and port are assigned to the listening socket with bind(), the listen() function allows the listening socket to handle an incoming TCP/IP connection request from the client.

 listen_sock = socket(PF_INET, SOCK_STREAM, IPPROTO_TCP);
 CHK_ERR(listen_sock, "socket");
 
 memset(&sa_serv, 0, sizeof(sa_serv));
 sa_serv.sin_family      = AF_INET;
 sa_serv.sin_addr.s_addr = INADDR_ANY;
 sa_serv.sin_port        = htons(s_port);      /* Server Port number */
 
 err = bind(listen_sock, (struct sockaddr*)&sa_serv,sizeof(sa_serv));
 CHK_ERR(err, "bind");
 
 /* Receive a TCP connection. */
 err = listen(listen_sock, 5);
 CHK_ERR(err, "listen");

Creating and Setting Up the Socket (on the SSL Client)

On the client, you must create a TCP/IP socket and attempt to connect to the server with this socket. To establish a connection to the specified server, the TCP/IP connect() function is used. If the function succeeds, the socket passed to the connect() function as a first argument can be used for data communication over the connection.

 sock = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
 CHK_ERR(sock, "socket");

 memset (&server_addr, '\0', sizeof(server_addr));
 server_addr.sin_family      = AF_INET;
 server_addr.sin_port        = htons(s_port);       /* Server Port number */
 server_addr.sin_addr.s_addr = inet_addr(s_ipaddr); /* Server IP */
 
 err = connect(sock, (struct sockaddr*) &server_addr, sizeof(server_addr));
 CHK_ERR(err, "connect");

Establishing a TCP/IP Connection (on the SSL Server)

To accept an incoming connection request and to establish a TCP/IP connection, the SSL server needs to call the accept() function. The socket created with this function is used for the data communication between the SSL client and server. For example:

 sock = accept(listen_sock, (struct sockaddr*)&sa_cli, &client_len);
 BIO_printf(bio_c_out, "Connection from %lx, port %x\n", 
 sa_cli.sin_addr.s_addr, sa_cli.sin_port);

c
Setting Up the Socket/Socket BIO in the SSL Structure

After you create the SSL structure and the TCP/IP socket (sock), you must configure them so that SSL data communication with the SSL structure can be performed automatically through the socket.

The following code fragments show the various ways to assign sock to ssl. The simplest way is to set the socket directly into the SSL structure, as follows:

SSL_set_fd(ssl, sock);

A better way is to use a BIO structure, which is the I/O abstraction provided by OpenSSL. This way is preferable because BIO hides details of an underlying I/O. As long as a BIO structure is set up properly, you can establish SSL connections over any I/O.

The following two examples demonstrate how to create a socket BIO and set it into the SSL structure.

 sbio=BIO_new(BIO_s_socket());
 BIO_set_fd(sbio, sock, BIO_NOCLOSE);
 SSL_set_bio(ssl, sbio, sbio);

In the following example, the BIO_new_socket() API creates a socket BIO in which the TCP/IP socket is assigned, and the SSL_set_bio() API assigns the socket BIO into the SSL structure. The following two lines of code are equivalent to the preceding three lines:

 sbio = BIO_new_socket(socket, BIO_NOCLOSE);
 SSL_set_bio(ssl, sbio, sbio);

	
	NOTE: If there is already a BIO connected to ssl, BIO_free() is called (for both the reading and writing side, if different).
	
SSL Handshake

The SSL handshake is a complicated process that involves significant cryptographic key exchanges. However, the handshake can be completed by calling SSL_accept() on the SSL server and SSL_connect() on the SSL client.
SSL Handshake on the SSL Server

The SSL_accept() API waits for an SSL handshake initiation from the SSL client. Successful completion of this API means that the SSL handshake has been completed.

 err = SSL_accept(ssl);

SSL Handshake on the SSL Client

The SSL client calls the SSL_connect() API to initiate an SSL handshake. If this API returns a value of 1, the handshake has completed successfully. The data can now be transmitted securely over this connection.

 err = SSL_connect(ssl);

Performing an SSL Handshake with SSL_read and SSL_write (Optional)

Optionally, you can call SSL_write() and SSL_read() to complete the SSL handshake as well as perform SSL data exchange. With this approach, you must call SSL_set_accept_state() before you call SSL_read() on the SSL server. You must also call SSL_set_connect_state()before you call SSL_write() on the client. For example:

 /* When SSL_accept() is not called, SSL_set_accept_state() */ 
 /* must be called prior to SSL_read() */
 SSL_set_accept_state(ssl);
 
 /* When SSL_connect() is not called, SSL_set_connect_state() */ 
 /* must be called prior to 

X

 SSL_write() */
      SSL_set_connect_state(ssl);

Obtaining a Peer Certificate (Optional)

Optionally, after the SSL handshake, you can obtain a peer certificate by calling SSL_get_peer_certificate(). This API is often used for straight certificate verification, such as checking certificate information (for example, the common name and expiration date).

 peer_cert = SSL_get_peer_certificate(ssl);

Transmitting SSL Data

After the SSL handshake is completed, data can be transmitted securely over the established SSL connection. SSL_write() and SSL_read() are used for SSL data transmission, just as write() and read() or send() and recv() are used for an ordinary TCP/IP connection.
Sending Data

To send data over the SSL connection, call SSL_write(). The data to be sent is stored in the buffer specified as a second argument. For example:

 err = SSL_write(ssl, wbuf, strlen(wbuf));

Receiving Data

To read data sent from the peer over the SSL connection, call SSL_read(). The received data is stored in the buffer specified as a second argument. For example:

 err = SSL_read(ssl, rbuf, sizeof(rbuf)-1);

Using BIOs for SSL Data Transmission (Optional)

Instead of using SSL_write() and SSL_read(), you can transmit data by calling BIO_puts() and BIO_gets(), and BIO_write() and BIO_read(), provided that a buffer BIO is created and set up as follows:

 BIO        *buf_io, *ssl_bio;
 char     rbuf[READBUF_SIZE];
 char    wbuf[WRITEBUF_SIZE]
 
 buf_io = BIO_new(BIO_f_buffer());  /* create a buffer BIO */
 ssl_bio = BIO_new(BIO_f_ssl());           /* create an ssl BIO */
 BIO_set_ssl(ssl_bio, ssl, BIO_CLOSE);       /* assign the ssl BIO to SSL */
 BIO_push(buf_io, ssl_bio);          /* add ssl_bio to buf_io */                     
 
 ret = BIO_puts(buf_io, wbuf);         
 /* Write contents of wbuf[] into buf_io */
 ret = BIO_write(buf_io, wbuf, wlen);        
 /* Write wlen-byte contents of wbuf[] into buf_io */
 
 ret = BIO_gets(buf_io, rbuf, READBUF_SIZE);  
 /* Read data from buf_io and store in rbuf[] */
 ret = BIO_read(buf_io, rbuf, rlen);            
 /* Read rlen-byte data from buf_io and store rbuf[] */

Closing an SSL Connection

When you close an SSL connection, the SSL client and server send close_notify messages to notify each other of the SSL closure. You use the SSL_shutdown() API to send the close_notify alert to the peer.

The shutdown procedure consists of two steps:

    Sending a close_notify shutdown alert

    Receiving a close_notify shutdown alert from the peer

The following rules apply to closing an SSL connection:

    Either party can initiate a close by sending a close_notify alert.

    Any data received after sending a closure alert is ignored.

    Each party is required to send a close_notify alert before closing the write side of the connection.

    The other party is required both to respond with a close_notify alert of its own and to close down the connection immediately, discarding any pending writes.

    The initiator of the close is not required to wait for the responding close_notify alert before closing the read side of the connection. 

The SSL client or server that initiates the SSL closure calls SSL_shutdown() either once or twice. If it calls the API twice, one call sends the close_notify alert and one call receives the response from the peer. If the initator calls the API only once, the initiator does not receive the close_notify alert from the peer. (The initiator is not required to wait for the responding alert.)

The peer that receives the alert calls SSL_shutdown() once to send the alert to the initiating party.
Resuming an SSL Connection

You can reuse the information from an already established SSL session to create a new SSL connection. Because the new SSL connection is reusing the same master secret, the SSL handshake can be performed more quickly. As a result, SSL session resumption can reduce the load of a server that is accepting many SSL connections.

Perform the following steps to resume an SSL session on the SSL client:

    Start the first SSL connection. This also creates an SSL session.

    ret = SSL_connect(ssl)
    (Use SSL_read() / SSL_write() for data communication 
          over the SSL connection)

    Save the SSL session information.

    sess = SSL_get1_session(ssl);  
    /* sess is an SSL_SESSION, and ssl is an SSL */

    Shut down the first SSL connection.

    SSL_shutdown(ssl);

    Create a new SSL structure.

    ssl = SSL_new(ctx);

    Set the SSL session to a new SSL session before calling SSL_connect().

    SSL_set_session(ssl, sess);
    err = SSL_connect(ssl);

    Start the second SSL connection with resumption of the session.

    ret = SSL_connect(ssl)
    (Use SSL_read() / SSL_write() for data communication 
    over the SSL connection)

If the SSL client calls SSL_get1_session() and SSL_set_session(), the SSL server can accept a new SSL connection using the same session without calling special APIs to resume the session. The server does this by following the steps discussed in “Creating and Setting Up the SSL Structure ”, “Setting Up the TCP/IP Connection”, “Setting Up the Socket/Socket BIO in the SSL Structure”, “SSL Handshake”, and “Transmitting SSL Data”.
	
	NOTE: Calling SSL_free() results in the failure of the SSL session to resume, even if you saved the SSL session with SSL_get1_session().
	
Renegotiating the SSL Handshake

SSL renegotiation is a new SSL handshake over an already established SSL connection. Because the renegotiation messages (including types of ciphers and encryption keys) are encrypted and then sent over the existing SSL connection, SSL renegotiation can establish another SSL session securely. SSL renegotiation is useful in the following situations, once you have established an ordinary SSL session:

    When you require client authentication

    When you are using a different set of encryption and decryption keys
    

    When you are using a different set of encryption and hashing algorithms

SSL renegotiation can be initiated by either the SSL client or the SSL server. Initiating an SSL renegotiation on the client requires a different set of APIs (on both the initiating SSL client and the accepting server) from the APIs required for the initiation on the SSL server (in this case, on the initiating SSL server and the accepting SSL client).

The following sections discuss the required APIs for both situations.
	
	NOTE: SSLv2 cannot perform SSL renegotiation. Use SSLv3 or TLSv3 for this operation.
	
SSL Renegotiation Initiated by the SSL Server

To initiate an SSL renegotiation from the SSL server, call SSL_renegotiate() once and SSL_do_handshake() twice.

The SSL_renegotiate() API sets flags for SSL renegotiation. This API does not actually initiate the renegotiation. The flags turned on by SSL_renegotiate() inform SSL_do_handshake() that it needs to perform SSL renegotiation with the SSL client. The SSL_do_handshake() API performs an actual SSL handshake. The first call sends a -Server Hello- message to the SSL client.

If the first call succeeds, the client has agreed to perform an SSL renegotiation. The server then sets the SSL_ST_ACCEPT state in the SSL structure and calls SSL_do_handshake() again to complete the rest of the renegotiation.

The following code fragment shows how these APIs are used:

 printf("Starting SSL renegotiation on SSL server (initiating by SSL server)");
   if(SSL_renegotiate(ssl) <= 0){
           printf("SSL_renegotiate() failed\n");
             exit(1);
    }
 
      if(SSL_do_handshake(ssl) <= 0){
                 printf("SSL_do_handshake() failed\n");
             exit(1);
    }
 
      ssl->state = SSL_ST_ACCEPT;
 
         if(SSL_do_handshake(ssl) <= 0){
                 printf("SSL_do_handshake() failed\n");
             exit(1);
 }

The following code shows the APIs called by the SSL client when the renegotiation is initiated by the server:

 printf("Starting SSL renegotiation on SSL client (initiating by SSL server)");       
 /* SSL   renegotiation */
      err = SSL_read(ssl, buf, sizeof(buf)-1);

As the example shows, SSL_READ() performs data exchange, and can also handle connection-related functions such as renegotiation.
SSL Renegotiation Initiated by the SSL Client

The SSL client can also initiate SSL renegotiation. In this case, the setup on the client initiating the renegotiation is similar to that on a server initiating the renegotiation. To complete this operation, the SSL client calls SSL_renegotiate() and SSL_do_handshake() only once. SSL_renegotiate() simply sets the flags for SSL renegotiation, and a single call of SSL_do_handshake() covers the entire renegotiation.

 printf("Starting SSL renegotiation on SSL client (initiating by SSL client)");
 if(SSL_renegotiate(ssl) <= 0){
        printf("SSL_renegotiate() failed\n");
        exit(1);
 }
 if(SSL_do_handshake(ssl) <= 0){
        printf("SSL_do_handshake() failed\n");
            exit(1);
 }

The following code shows the APIs called by the SSL server when the renegotiation is initiated by the client. (These are the same ÏAPIs that are called by the SSL client when the renegotiation is initiated by the server.)

 printf("Starting SSL renegotiation on SSL server (initiating by SSL client)");
   /* SSL renegotiation */
      err = SSL_read(ssl, buf, sizeof(buf)-1);

Again in this example, SSL_READ() is handling the data exchange and connection renegotiation.
Finishing the SSL Application

When you finish an SSL application program, the major task is to free (deallocate) the data structures that were created and used in the application program. The APIs for deallocation usually contain the _free suffix, whereas the APIs that create a new data structure contain the_new suffix.

You must free data structures that you explicitly created in the SSL application program. Data structures that were created inside another structure with an xxx_new() API are automatically deallocated when the structure is deallocated with the corresponding xxx_free() API. For example, a BIO structure created with SSL_new() is freed when you call SSL_free(); you do not need to call BIO_free() to free the BIO inside the SSL structure. However, if the application program called BIO_new() to allocate a BIO structure, you must free that structure with BIO_free().
	
	NOTE: You must call SSL_shutdown() before you call SSL_free().
```

### 16.1.4 Simple SSL Client Program

```text
The following is the program listing of the SSL$SIMPLE_CLI.C example program.

/*
* ++
* FACILITY:
*
* Simplest SSL Client
*
* ABSTRACT:
*
*      This is an example of an SSL client with minimum functionality.
*      The socket APIs are used to handle TCP/IP operations. 
*
*       This SSL client verifies the server's certificate against the CA
*   certificate loaded in the client.  
*
*   This SSL client does not load its own certificate and key because 
* the SSL server does not request nor verify the client certificate.
*

*/
/* Assumptions, Build, Configuration, and Execution Instructions */
/*
*  ASSUMPTIONS:
*
*    The following are assumed to be true for the
*    execution of this program to succeed:
*
*    - SSL is installed and started on this system.
*
*    - this server program, and its accompanying client
*      program are run on the same system, but in different
*      processes.
*
*    - the certificate and keys referenced by this program
*      reside in the same directory as this program.  There 
*      is a command procedure, SSL$EXAMPLES_SETUP.COM, to 
*      help set up the certificates and keys.
*
*
*  BUILD INSTRUCTIONS:
*
*    To build this example program use commands of the form,
*
*      For a 32-bit application using only SSL APIs needs to run the 
*      following commands for SSL_APP.C .
*       -----------------------------------------------------------------
*       $CC/POINTER_SIZE=32/PREFIX_LIBRARY_ENTRIES=ALL_ENTRIES SSL_APP.C
*       $LINK SSL_APP.OBJ, VMS_DECC_OPTIONS.OPT/OPT
*       -----------------------------------------------------------------
*       VMS_DECC_OPTIONS.OPT should include the following lines.
*       -------------------------------------------------
*       SYS$LIBRARY:SSL$LIBCRYPTO_SHR32.EXE/SHARE
*       SYS$LIBRARY:SSL$LIBSSL_SHR32.EXE/SHARE
*       -------------------------------------------------
*
*       Creating a 64-bit application of SSL_APP.C should run the 
*       following commands.
*       -----------------------------------------------------------------
*       $CC/POINTER_SIZE=64/PREFIX_LIBRARY_ENTRIES=ALL_ENTRIES SSL_APP.C
*       $LINK SSL_APP.OBJ, VMS_DECC_OPTIONS.OPT/OPT
*       -----------------------------------------------------------------
*       VMS_DECC_OPTIONS.OPT should include the following lines.
*       -------------------------------------------------
*       SYS$LIBRARY:SSL$LIBCRYPTO_SHR.EXE/SHARE
*       SYS$LIBRARY:SSL$LIBSSL_SHR.EXE/SHARE
*       -------------------------------------------------
*
*
* CONFIGURATION INSTRUCTIONS:
*
*
* RUN INSTRUCTIONS:
*
*    To run this example program:
*
*    1) Start the server program,
*
*       $ run server on this system
*
*    2) Start the client program on this same system,
*
*       $ run client
*
*/
 
#include <stdio.h>
#include <string.h>
#include <errno.h>
#include <netdb.h>
#include <unistd.h>
#ifdef __VMS
#include <socket.h>
#include <inet.h>
 
#include <in.h>
#else
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#endif
 
#include <openssl/crypto.h>
#include <openssl/ssl.h>
#include <openssl/err.h>
 
#define RETURN_NULL(x) if ((x)==NULL) exit (1)
#define RETURN_ERR(err,s) if ((err)==-1) { perror(s); exit(1); }
#define RETURN_SSL(err) if ((err)==-1) { ERR_print_errors_fp(stderr); exit(1); }
 
static int verify_callback(int ok, X509_STORE_CTX *ctx);
 
#define RSA_CLIENT_CERT       "client.crt"
#define RSA_CLIENT_KEY  "client.key"
 
#define RSA_CLIENT_CA_CERT      "client_ca.crt"
#define RSA_CLIENT_CA_PATH      "sys$common:[syshlp.examples.ssl]"
 
#define ON      1
#define OFF     0
 
void main()
{
          int     err;

          int     verify_client = OFF; /* To verify a client certificate, set ON */
   int     sock;
         struct sockaddr_in server_addr;
     char  *str;
       char    buf [4096];
         char    hello[80];

    SSL_CTX         *ctx;
        SSL            *ssl;
       SSL_METHOD      *meth;
      X509            *server_cert;
        EVP_PKEY        *pkey;

       short int       s_port = 5555;
      const char      *s_ipaddr = "127.0.0.1";
 
       /*----------------------------------------------------------*/
      printf ("Message to be sent to the SSL server: ");
          fgets (hello, 80, stdin);
 
      /* Load encryption & hashing algorithms for the SSL program */
  SSL_library_init();
 
    /* Load the error strings for SSL & CRYPTO APIs */
      SSL_load_error_strings();
 
      /* Create an SSL_METHOD structure (choose an SSL/TLS protocol version) */
   meth = SSLv3_method();
 
 /* Create an SSL_CTX structure */
   ctx = SSL_CTX_new(meth);                        
 
       RETURN_NULL(ctx);
   /*----------------------------------------------------------*/
      if(verify_client == ON)
 
        {
 
              /* Load the client certificate into the SSL_CTX structure */
                if (SSL_CTX_use_certificate_file(ctx, RSA_CLIENT_CERT, 
 
     SSL_FILETYPE_PEM) <= 0) {
                   ERR_print_errors_fp(stderr);
                        exit(1);
            }
 
              /* Load the private-key corresponding to the client certificate */
          if (SSL_CTX_use_PrivateKey_file(ctx, RSA_CLIENT_KEY, 
          SSL_FILETYPE_PEM) <= 0) {
                     ERR_print_errors_fp(stderr);
                        exit(1);
            }
 
              /* Check if the client certificate and private-key matches */
               if (!SSL_CTX_check_private_key(ctx)) {
                      fprintf(stderr,"Private key does not match the 
                  certificate public key\n");
                    exit(1);
            }
   }
 
      /* Load the RSA CA certificate into the SSL_CTX structure */
        /* This will allow this client to verify the server's     */
        /* certificate.                                           */

      if (!SSL_CTX_load_verify_locations(ctx, RSA_CLIENT_CA_CERT, NULL)) {
                ERR_print_errors_fp(stderr);
                exit(1);
    }
 
        /* Set flag in context to require peer (server) certificate */
        /* verification */
 
        SSL_CTX_set_verify(ctx,SSL_VERIFY_PEER,NULL);
 
        SSL_CTX_set_verify_depth(ctx,1);
       /* ------------------------------------------------------------- */
         /* Set up a TCP socket */
 
      sock = socket (PF_INET, SOCK_STREAM, IPPROTO_TCP);       
 
      RETURN_ERR(sock, "socket");
 
    memset (&server_addr, '\0', sizeof(server_addr));
       server_addr.sin_family      = AF_INET;
 
 server_addr.sin_port        = htons(s_port);       /* Server Port number */
 
    server_addr.sin_addr.s_addr = inet_addr(s_ipaddr); /* Server IP */
 
     /* Establish a TCP/IP connection to the SSL client */
 
          err = connect(sock, (struct sockaddr*) &server_addr, sizeof(server_addr)); 
 
        RETURN_ERR(err, "connect");
         /* ----------------------------------------------- */
       /* An SSL structure is created */
 
      ssl = SSL_new (ctx);
 
   RETURN_NULL(ssl);
 
      /* Assign the socket into the SSL structure (SSL and socket without BIO) */
         SSL_set_fd(ssl, sock);
 
 /* Perform SSL Handshake on the SSL client */
       err = SSL_connect(ssl);
 
        RETURN_SSL(err);
 
       /* Informational output (optional) */
       printf ("SSL connection using %s\n", SSL_get_cipher (ssl));
 
    /* Get the server's certificate (optional) */
       server_cert = SSL_get_peer_certificate (ssl);    
 
      if (server_cert != NULL)
        {
               printf ("Server certificate:\n");

             str = X509_NAME_oneline(X509_get_subject_name(server_cert),0,0);
            RETURN_NULL(str);
           printf ("\t subject: %s\n", str);
           free (str);
 
            str = X509_NAME_oneline(X509_get_issuer_name(server_cert),0,0);
             RETURN_NULL(str);
           printf ("\t issuer: %s\n", str);
            free(str);
 
             X509_free (server_cert);

      }
        else
                printf("The SSL server does not have certificate.\n");
 
    /*-------- DATA EXCHANGE - send message and receive reply. -------*/
        /* Send data to the SSL server */
   err = SSL_write(ssl, hello, strlen(hello));  
 
  RETURN_SSL(err);
 
       /* Receive data from the SSL server */
      err = SSL_read(ssl, buf, sizeof(buf)-1);                     
 
  RETURN_SSL(err);
    buf[err] = '\0';
    printf ("Received %d chars:'%s'\n", err, buf);
 
        /*--------------- SSL closure ---------------*/
        /* Shutdown the client side of the SSL connection */
 
        err = SSL_shutdown(ssl);
        RETURN_SSL(err);
 
        /* Terminate communication on a socket */
        err = close(sock);
 
        RETURN_ERR(err, "close");
 
        /* Free the SSL structure */
        SSL_free(ssl);
 
        /* Free the SSL_CTX structure */
        SSL_CTX_free(ctx);
}
```

### 16.1.5 Simple SSL Server Program

```text
The following is the program listing of the SSL$SIMPLE_SERV.C example program.

/*
 * ++
 * FACILITY:
 *
 *      Simplest SSL Server
 *
 * ABSTRACT:
 *
 *   This is an example of a SSL server with minimum functionality.
 *    The socket APIs are used to handle TCP/IP operations. This SSL
 *    server loads its own certificate and key, but it does not verify
 *  the certificate of the SSL client.
 *

 */
/* Assumptions, Build, Configuration, and Execution Instructions */
/*
 *  ASSUMPTIONS:
 *
 *    The following are assumed to be true for the
 *    execution of this program to succeed:
 *
 *    - SSL is installed and started on this system.
 *
 *    - this server program, and its accompanying client
 *      program are run on the same system, but in different
 *      processes.
 *
 *    - the certificate and keys referenced by this program
 *      reside in the same directory as this program.  There 
 *      is a command procedure, SSL$EXAMPLES_SETUP.COM, to 
 *      help set up the certificates and keys.
 *
 *
 *  BUILD INSTRUCTIONS:
 *
 *    To build this example program use commands of the form,
 *
 *      For a 32-bit application using only SSL APIs needs to run the 
 *      following commands for SSL_APP.C .
 *       -----------------------------------------------------------------
 *       $CC/POINTER_SIZE=32/PREFIX_LIBRARY_ENTRIES=ALL_ENTRIES SSL_APP.C
 *       $LINK SSL_APP.OBJ, VMS_DECC_OPTIONS.OPT/OPT
 *       -----------------------------------------------------------------
 *       VMS_DECC_OPTIONS.OPT should include the following lines.
 *       -------------------------------------------------
 *       SYS$LIBRARY:SSL$LIBCRYPTO_SHR32.EXE/SHARE
 *       SYS$LIBRARY:SSL$LIBSSL_SHR32.EXE/SHARE
 *       -------------------------------------------------
 *
 *       Creating a 64-bit application of SSL_APP.C should run the 
 *       following commands.
 *       -----------------------------------------------------------------
 *       $CC/POINTER_SIZE=64/PREFIX_LIBRARY_ENTRIES=ALL_ENTRIES SSL_APP.C
 *       $LINK SSL_APP.OBJ, VMS_DECC_OPTIONS.OPT/OPT
 *       -----------------------------------------------------------------
 *       VMS_DECC_OPTIONS.OPT should include the following lines.
 *       -------------------------------------------------
 *       SYS$LIBRARY:SSL$LIBCRYPTO_SHR.EXE/SHARE
 *       SYS$LIBRARY:SSL$LIBSSL_SHR.EXE/SHARE
 *       -------------------------------------------------
 *
 *
 * CONFIGURATION INSTRUCTIONS:
 *
 *
 * RUN INSTRUCTIONS:
 *
 *    To run this example program:
 *
 *    1) Start the server program,
 *
 *       $ run server
 *
 *    2) Start the client program on this same system,
 *
 *       $ run client
 *
 */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <errno.h>
#include <netdb.h>
#include <unistd.h>
 
#ifdef __VMS
#include <types.h>
#include <socket.h>
#include <in.h>
#include <inet.h>
 
#else
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#endif
 
#include <openssl/crypto.h>
#include <openssl/ssl.h>
#include <openssl/err.h>
 
#define RSA_SERVER_CERT     "server.crt"
#define RSA_SERVER_KEY          "server.key"
 
#define RSA_SERVER_CA_CERT "server_ca.crt"
#define RSA_SERVER_CA_PATH   "sys$common:[syshlp.examples.ssl]"
 
#define ON   1
#define OFF        0
 
#define RETURN_NULL(x) if ((x)==NULL) exit(1)
#define RETURN_ERR(err,s) if ((err)==-1) { perror(s); exit(1); }
#define RETURN_SSL(err) if ((err)==-1) { ERR_print_errors_fp(stderr); exit(1); }
 
void main()
{
    int     err;
        int     verify_client = OFF; /* To verify a client certificate, set ON */
 
      int     listen_sock;
        int     sock;
       struct sockaddr_in sa_serv;
         struct sockaddr_in sa_cli;
          size_t client_len;
          char    *str;
       char     buf[4096];
 
    SSL_CTX         *ctx;
        SSL            *ssl;
       SSL_METHOD      *meth;

        X509            *client_cert = NULL;
 
   short int       s_port = 5555;
/*----------------------------------------------------------------*/
      /* Load encryption & hashing algorithms for the SSL program */
  SSL_library_init();
 
    /* Load the error strings for SSL & CRYPTO APIs */
      SSL_load_error_strings();
 
      /* Create a SSL_METHOD structure (choose a SSL/TLS protocol version) */
     meth = SSLv3_method();
 
 /* Create a SSL_CTX structure */
    ctx = SSL_CTX_new(meth);
 
       if (!ctx) {
 
            ERR_print_errors_fp(stderr);
 
           exit(1);
 
       }
 
      /* Load the server certificate into the SSL_CTX structure */
        if (SSL_CTX_use_certificate_file(ctx, RSA_SERVER_CERT, SSL_FILETYPE_PEM) <= 0) {
 
                    ERR_print_errors_fp(stderr);
 
                   exit(1);
 
       }
 
      /* Load the private-key corresponding to the server certificate */
          if (SSL_CTX_use_PrivateKey_file(ctx, RSA_SERVER_KEY, SSL_FILETYPE_PEM) <= 0) {
 
              ERR_print_errors_fp(stderr);
                exit(1);
    }
 
      /* Check if the server certificate and private-key matches */
       if (!SSL_CTX_check_private_key(ctx)) {
 
                 fprintf(stderr,"Private key does not match the certificate public key\n");
                  exit(1);
    }
 
      if(verify_client == ON)
 
        {
 
              /* Load the RSA CA certificate into the SSL_CTX structure */
                if (!SSL_CTX_load_verify_locations(ctx, RSA_SERVER_CA_CERT, NULL)) {
 
                   ERR_print_errors_fp(stderr);
                        exit(1);
            }
 
              /* Set to require peer (client) certificate verification */
         SSL_CTX_set_verify(ctx,SSL_VERIFY_PEER,NULL);
 
          /* Set the verification depth to 1 */
               SSL_CTX_set_verify_depth(ctx,1);
 
       }
   /* ----------------------------------------------- */
       /* Set up a TCP socket */
 
      listen_sock = socket(PF_INET, SOCK_STREAM, IPPROTO_TCP);   
 
    RETURN_ERR(listen_sock, "socket");
          memset (&sa_serv, '\0', sizeof(sa_serv));
       sa_serv.sin_family      = AF_INET;
          sa_serv.sin_addr.s_addr = INADDR_ANY;
       sa_serv.sin_port        = htons (s_port);          /* Server Port number */
         err = bind(listen_sock, (struct sockaddr*)&sa_serv,sizeof(sa_serv));
 
       RETURN_ERR(err, "bind");
     
   /* Wait for an incoming TCP connection. */
          err = listen(listen_sock, 5);                    
 
      RETURN_ERR(err, "listen");
          client_len = sizeof(sa_cli);
 
   /* Socket for a TCP/IP connection is created */
     sock = accept(listen_sock, (struct sockaddr*)&sa_cli, &client_len);
 
    RETURN_ERR(sock, "accept");
         close (listen_sock);
 
   printf ("Connection from %lx, port %x\n", sa_cli.sin_addr.s_addr, 
   sa_cli.sin_port);
 
     /* ----------------------------------------------- */
       /* TCP connection is ready. */
      /* A SSL structure is created */
    ssl = SSL_new(ctx);
 
    RETURN_NULL(ssl);
 
      /* Assign the socket into the SSL structure (SSL and socket without BIO) */
 SSL_set_fd(ssl, sock);
 
 /* Perform SSL Handshake on the SSL server */
       err = SSL_accept(ssl);
 
 RETURN_SSL(err);
 
       /* Informational output (optional) */
       printf("SSL connection using %s\n", SSL_get_cipher (ssl));
 
     if (verify_client == ON)
    {
 
          /* Get the client's certificate (optional) */
       client_cert = SSL_get_peer_certificate(ssl);
        if (client_cert != NULL) 
           {
 
              printf ("Client certificate:\n");     
              str = X509_NAME_oneline(X509_get_subject_name(client_cert), 0, 0);
                  RETURN_NULL(str);
                   printf ("\t subject: %s\n", str);
                   free (str);
                 str = X509_NAME_oneline(X509_get_issuer_name(client_cert), 0, 0);
                   RETURN_NULL(str);
                   printf ("\t issuer: %s\n", str);
                    free (str);
                 X509_free(client_cert);
     } 
 
     else
 
                   printf("The SSL client does not have certificate.\n");
  }
 
      /*------- DATA EXCHANGE - Receive message and send reply. -------*/
 /* Receive data from the SSL client */
      err = SSL_read(ssl, buf, sizeof(buf) - 1);
 
     RETURN_SSL(err);
 
       buf[err] = '\0';
 
       printf ("Received %d chars:'%s'\n", err, buf);
 
 /* Send data to the SSL client */
   err = SSL_write(ssl, "This message is from the SSL server", 
 
   strlen("This message is from the SSL server"));
 
        RETURN_SSL(err);
 
       /*--------------- SSL closure ---------------*/
     /* Shutdown this side (server) of the connection. */
 
   err = SSL_shutdown(ssl);
 
       RETURN_SSL(err);
 
       /* Terminate communication on a socket */
   err = close(sock);
 
     RETURN_ERR(err, "close");
 
      /* Free the SSL structure */
        SSL_free(ssl);
 
 /* Free the SSL_CTX structure */
    SSL_CTX_free(ctx);
 
}
```

### 16.1.6 Chapter 6 OpenSSL Command Line Interface

```text
Table of Contents

Command-Line Help
Standard Commands
Message Digest Commands
Encoding and Cipher Commands
Password Arguments
Creating a DH Parameter (Key) File and a DSA Certificate and Key

HP SSL for OpenVMS provides a command line interface that allows you to use the cryptography functions of SSL's cryptography library from the OpenSSL command prompt (OPENSSL>). You can use the command-line interface for the following tasks:

    Creating RSA, DH and DSA key parameters

    Creating X.509 certificates, CSRs, and CRLs

    Calculating message digests

    Encrypting and decrypting with ciphers

    Testing on SSL/TLS clients and servers

    Handling of S/MIME signed or encrypted mail

For reference information about the OpenSSL commands, see the OpenSSL Command Line Interface (CLI) Reference.
```

#### 16.1.6.1 Command-Line Help

```text
HP SSL for OpenVMS includes three pseudocommands that function like command-line help. When you enter one of these pseudocommands at the OpenSSL prompt, SSL displays a list (one entry per line) of names of all the standard commands, message digest commands, or cipher commands, that are available in the command line interface.
	
	NOTE: To use these commands, you must have previously run SYS$STARTUP:SSL$STARTUP.COM and SSL$COM:SSL$UTILS.COM.
	

The pseudocommands are as follows:
$ openssl
openssl> list-standard-commands
openssl> list-message-digest-commands
openssl> list-cipher-commands

To obtain a list of all of the commands available, enter the following:
$ openssl ?

SSL$UTILS.COM sets up foreign commands to provide command-line accesss to the standard, message digest, and cipher commands. You can also display the UNIX manpage documentation for each command by entering the following:
$ openssl command-name ?

where command-name is the name of an OpenSSL command such as asn1parse.
```

#### 16.1.6.2 The following are the OpenSSL standard commands.

```text
asn1parse	 	

Parse an ASN.1 sequence
ca	 	

Certificate Authority (CA) Management
ciphers	 	

Cipher Suite Description Determination
crl	 	

Certificate Revocation List (CRL) Management
crl2pkcs7	 	

CRL to PKCS#7 Conversion
dgst	 	

Message Digest Calculation
dh	 	

Diffie-Hellman Parameter Management Obsoleted by dHParam.
dHParam	 	

Generation and Management of Diffie-Hellman Parameters
dsa	 	

DSA Data Management
dsaparam	 	

DSA Parameter Generation
enc	 	

Encoding with Ciphers
errstr	 	

Error Number to Error String Conversion
gendh	 	

Generation of Diffie-Hellman Parameters. Obsoleted by dHParam.
gendsa	 	

Generation of DSA Parameters
genrsa	 	

Generation of RSA Parameters
nseq	 	

Netscape Certificate Sequence Utility
passwd	 	

Generation of hashed passwords
pkcs12	 	

PKCS#12 Data Management
pkcs7	 	

PKCS#7 Data Management
pkcs8	 	

PKCS#8 Data Management
rand	 	

Generate pseudo-random bytes
req	 	

X.509 Certificate Signing Request (CSR) Management
rsa	 	

RSA Data Management
rsautl	 	

RSA utility for signing, verification, encryption, and decryption
s_client	 	

Implements a generic SSL/TLS client that can establish a transparent connection to a remote server speaking SSL/TLS. This command, however, is intended for testing purposes only and provides only rudimentary interface functionality. Internally, however, it uses most of the functionality of the OpenSSL ssl library.
s_server	 	

Implements a generic SSL/TLS server that accepts connections from remote clients speaking SSL/TLS. It is intended for testing purposes only and provides only rudimentary interface functionality. Internally, however, it uses most of the functionality of the OpenSSL ssl library. It provides both its own command-line oriented protocol for testing SSL functions and a simple HTTP response facility to emulate an SSL/TLS-aware web server.
s_time	 	

SSL Connection Timer
sess_id	 	

SSL Session Data Management
smime	 	

S/MIME mail processing
speed	 	

Algorithm Speed Measurement
spkac	 	

Signed public key and challenge
verify	 	

X.509 Certificate Verification
version	 	

OpenSSL Version Information
x509	 	

X.509 Certificate Data Management
```

#### 16.1.6.3 Message Digest Commands

```text
The following are the OpenSSL message digest commands.
md2	 	

MD2 Digest
md4	 	

MD4 Digest
md5	 	

MD5 Digest
mdc2	 	

MDC2 Digest
rmd160	 	

RMD-160 Digest
sha	 	

SHA Digest
sha1	 	

SHA-1 Digest 
```

#### 16.1.6.4 Encoding and Cipher Commands

```text
The following are the OpenSSL encoding and cipher commands. These commands use the following abbreviations:

    CBC - Cipher Block Chaining

    CFB - Cipher Feedback

    ECB - Electronic Cookbook

    OFB - Output Feedback

    EDE - Encrypt-Decrypt-Encrypt 

base64	 	

Base64 Encoding
bf-cbc	 	

Blowfish in CBC mode
bf	 	

Alias for bf-cbc
bf-cfb	 	

Blowfish in CFB mode
bf-ecb	 	

Blowfish in ECB mode
bf-ofb	 	

Blowfish in OFB mode
cast-cbc	 	

CAST Cipher in CBC mode
cast5-cbc	 	

CAST5 Cipher in CBC mode
cast	 	

Alias for cast-cbc
cast5-cfb	 	

CAST5 in CFB mode
cast5-ecb	 	

CAST5 in ECB mode
cast5-ofb	 	

CAST5 in OFB mode
des-cbc	 	

DES Cipher in CBC mode
des	 	

Alias for des-cbc
des-cfb	 	

DES in CFB mode
des-ofb	 	

DES in OFB mode
des-ecb	 	

DES in ECB mode
des-ede-cbc	 	

Two key triple DES EDE in CBC mode
des-ede	 	

Alias for des-ede
des-ede-cfb	 	

Two key triple DES EDE in CFB mode
des-ede-ofb	 	

Two key triple DES EDE in OFB mode
des-ede3-cbc	 	

Three key triple DES EDE in CBC mode
des-ede3	 	

Alias for des-ede3-cbc
des3	 	

Alias for des-ede3-cbc
des-ede3-cfb	 	

Three key triple DES EDE CFB mode
des-ede3-ofb	 	

Three key triple DES EDE in OFB mode
desx	 	

DESX algorithm
rc2-cbc	 	

128-bit RC2 Cipher in CBC mode
rc2	 	

Alias for rc2-cbc
rc2-cfb	 	

128-bit RC2 in CFB mode
rc2-ecb	 	

128-bit RC2 in ECB mode
rc2-ofb	 	

128-bit RC2 in OFB mode
rc2-64-cbc	 	

64-bit RC2 in CBC mode
rc2-40-cbc	 	

40-bit RC2 in CBC mode
rc4	 	

128-bit RC4 Cipher
rc4-40	 	

40-bit RC4
```

#### 16.1.6.5 Password Arguments

```text
Several commands accept password arguments, typically using the passin and the passout options, respectively, for input and output passwords. These arguments allow the password to be obtained from a variety of sources. Both options take a single argument in the following format. If no password argument is given and a password is required, then the user is prompted to enter a password. The password is read from the current terminal with echoing turned off.
pass:password	 	

The actual password is password. Since the password is visible to utilities (such as the ps utility in UNIX), use this form only when security is not important.
env:var	 	

Obtains the password from the environment variable var. Because the environment of other processes is visible on certain platforms (such as ps in certain UNIX operating systems), use this option with caution.
file:pathname	 	

The first line of pathname is the password. If the same pathname argument is supplied to the passin and passout arguments, then the first line is used for the input password and the next line is used for the output password. The pathname need not refer to a regular file; for example, it could refer to a device or named pipe.
fd:number	 	

Reads the password from the file descriptor number. This can be used, for example, to send the data via a pipe.
stdin	 	

Reads the password from standard input. 
```

#### 16.1.6.6 Creating a DH Parameter (Key) File and a DSA Certificate and Key

```text
In order to establish an SSL connection with the DH (key exchange) and DSA (DSS, signing) algorithms, a DH parameter file and DSA certificates and keys are required in your SSL application. The Certificate Tool (described in Chapter 3) does not provide this functionality. However, the OpenSSL command-line utility allows you to create the required files.

The following lines demonstrate how to create the DH and DSA related files.

## Create a DH parameter (key size is 1024 bits)
   $ openssl dHParam -outform PEM -out dHParam.pem 1024
 
## Create a DSA certificate
 
- Create DSA parameters (key size is 1024 bits)
  $ openssl dsaparam -out dsaparam.pem 1024
 
- Create a DSA CA certificate and private key(using DSA parameter in dsaparam.pem) 

 $ openssl req -x509 -newkey dsa:dsaparam.pem 
-keyout dsa_ca.key -out dsa_ca.crt -config SSL$CONF
 
- Create DSA certificate signing request(dsa_cert.csr)& private key(dsa_cert.key)
 
  $ openssl req -out dsa_cert.csr -keyout dsa_cert.key 
-newkey dsa:DSAPARAM.PEM -config SSL$CONF
 
- Sign Certificate Signing Request with DSA CA Certificate and Create a New Certificate
 
 $ openssl ca -in dsa_cert.csr -out dsa_cert.crt 
 
-config SSL$CA_CONF
```

#### 16.1.6.7 OpenSSL Command Line Interface (CLI) Reference

```text
This reference section includes the OpenSSL commands, and is based on information provided by The Open Group. This information can also be found at the following URL:

http://www.openssl.org

HP SSL for OpenVMS provides a command line interface that allows you to use the cryptography functions of SSL's cryptography library from the OpenSSL command prompt (OPENSSL>). You can use the command-line interface for the following tasks:

    Creating RSA, DH and DSA key parameters

    Creating X.509 certificates, CSRs, and CRLs

    Calculating message digests

    Encrypting and decrypting with ciphers

    Testing on SSL/TLS clients and servers

    Handling of S/MIME signed or encrypted mail

See Chapter 6, OpenSSL Command Line Interface, for more information about the OpenSSL commands.

Table of Contents

asn1parse() - ASN.1 parsing tool
ca() - sample minimal CA application
ciphers() - SSL cipher display and cipher list tool
config() - OpenSSL CONF library configuration files
crl() - CRL utility
crl2pkcs7() - Create a PKCS#7 structure from a CRL and certificates
dgst() - message digests
dhparam() - DH parameter manipulation and generation
dsa() - DSA key processing
dsaparam() - DSA parameter manipulation and generation
enc() - symmetric cipher routines
gendsa() - generate a DSA private key from a set of parameters
genrsa() - generate an RSA private key
nseq() - create or examine a netscape certificate sequence
ocsp() - Online Certificate Status Protocol utility
openssl() - OpenSSL command line tool
passwd() - compute password hashes
pkcs12() - PKCS#12 file utility
pkcs7() - PKCS#7 utility
pkcs8() - PKCS#8 format private key conversion tool
rand() - generate pseudo-random bytes
req() - PKCS#10 certificate request and certificate generating utility.
rsa() - RSA key processing tool
rsautl() - RSA utility
s_client() - SSL/TLS client program
s_server() - SSL/TLS server program
s_time() - SSL/TLS performance timing program
sess_id() - SSL/TLS session handling utility
smime() - S/MIME utility
speed() - test library performance
spkac() - SPKAC printing and generating utility
verify() - Utility to verify certificates.
version() - print OpenSSL version information
x509() - Certificate display and signing utility
```

#### 16.1.6.8 asn1parse

```text
asn1parse — ASN.1 parsing tool
Synopsis

openssl asn1parse [-inform PEM|DER] [-in filename] [-out filename] [-noout] [-offset number] [-length number] [-i] [-oid filename] [-strparse offset]

DESCRIPTION

The asn1parse command is a diagnostic utility that can parse ASN.1 structures. It can also be used to extract data from ASN.1 formatted data.
OPTIONS

    -inform DER|PEM

    the input format. DER is binary format and PEM (the default) is base64 encoded.

    -in filename

    the input file, default is standard input

    -out filename

    output file to place the DER encoded data into. If this option is not present then no data will be output. This is most useful when combined with the -strparse option.

    -noout

    don't output the parsed version of the input file.

    -offset number

    starting offset to begin parsing, default is start of file.

    -length number

    number of bytes to parse, default is until end of file.

    -i

    indents the output according to the "depth" of the structures.

    -oid filename

    a file containing additional OBJECT IDENTIFIERs (OIDs). The format of this file is described in the NOTES section below.

    -strparse offset

    parse the contents octets of the ASN.1 object starting at offset. This option can be used multiple times to "drill down" into a nested structure.

OUTPUT

The output will typically contain lines like this:

  0:d=0  hl=4 l= 681 cons: SEQUENCE          

.....

  229:d=3  hl=3 l= 141 prim: BIT STRING        
  373:d=2  hl=3 l= 162 cons: cont [ 3 ]        
  376:d=3  hl=3 l= 159 cons: SEQUENCE          
  379:d=4  hl=2 l=  29 cons: SEQUENCE          
  381:d=5  hl=2 l=   3 prim: OBJECT            :X509v3 Subject Key Identifier
  386:d=5  hl=2 l=  22 prim: OCTET STRING      
  410:d=4  hl=2 l= 112 cons: SEQUENCE          
  412:d=5  hl=2 l=   3 prim: OBJECT            :X509v3 Authority Key Identifier
  417:d=5  hl=2 l= 105 prim: OCTET STRING      
  524:d=4  hl=2 l=  12 cons: SEQUENCE          

.....

This example is part of a self signed certificate. Each line starts with the offset in decimal. d=XX specifies the current depth. The depth is increased within the scope of any SET or SEQUENCE.

h1=XX gives the header length (tag and length octets) of the current type. l=XX gives the length of the contents octets.

The -i option can be used to make the output more readable.

Some knowledge of the ASN.1 structure is needed to interpret the output.

In this example the BIT STRING at offset 229 is the certificate public key. The contents octets of this will contain the public key information. This can be examined using the option -strparse 229 to yield:

    0:d=0  hl=3 l= 137 cons: SEQUENCE          
    3:d=1  hl=3 l= 129 prim: INTEGER           :E5D21E1F5C8D208EA7A2166C7FAF9F6BDF2059669C60876DDB70840F1A5AAFA59699FE471F379F1DD6A487E7D5409AB6A88D4A9746E24B91D8CF55DB3521015460C8EDE44EE8A4189F7A7BE77D6CD3A9AF2696F486855CF58BF0EDF2B4068058C7A947F52548DDF7E15E96B385F86422BEA9064A3EE9E1158A56E4A6F47E5897
  135:d=1  hl=2 l=   3 prim: INTEGER           :010001

NOTES

If an OID is not part of OpenSSL's internal table it will be represented in numerical form (for example 1.2.3.4). The file passed to the -oid option allows additional OIDs to be included. Each line consists of three columns, the first column is the OID in numerical format and should be followed by white space. The second column is the "short name" which is a single word followed by white space. The final column is the rest of the line and is the "long name". asn1parse displays the long name. Example:

|1.2.3.4 shortName A long name
Restrictions

There should be options to change the format of input lines. The output of some ASN.1 types is not well handled (if at all). 

			16.1.6.9
		16.1.7
	16.2
```
