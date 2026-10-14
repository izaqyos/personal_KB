---
type: reference
title: SSL/TLS Programming
description: Section 6 of the legacy sslKB notes.
tags: [kb-ssl]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "Network/sslKB#6"
---

# SSL/TLS Programming

[↑ sslKB](/Network/kb-ssl/README.md)

## 6.1 C, C++

### 6.1.1 SSL/TLS Programming

```text
The main feature of the OpenSSL library is its implementations of the Secure Sockets Layer (SSL) and Transport Layer Security (TLS) protocols. Originally developed by Netscape for secure web transactions, the protocol has grown into a general solution for secure stream-based communications. Netscape's first public version of SSL is what we now call SSL Version 2. From that point, security experts began working to improve upon some of the flaws in SSLv2, and that gave birth to SSL Version 3. Development of a standard for transport layer security based on SSL was being done concurrently, which resulted in TLS Version 1. Because of the security flaws with SSLv2, modern applications should not support it. In this chapter, we'll discuss only programming with the SSLv3 and TLSv1 protocols in OpenSSL. Unless otherwise noted, when we refer to SSL, we refer to both SSLv3 and TLSv1.

From a design perspective, we need to know more than just that we want to use SSL in our application. The correct implementation of an SSL-enabled program can be difficult due to complexities in protocol setup, the large size of the API, and developer inexperience with the library. OpenSSL's SSL support was originally designed to mimic the Unix socket interface; however, the likenesses quickly fade as we get into the subtleties of the API. In order to make the process of becoming acquainted with the massive library easier, we take a small example client and server through a step-by-step process of making it SSL-enabled and secure. To aid understanding, we start with some simplifying assumptions that may not be practical for real-world applications.

From that point, we'll bridge the gap to the more advanced OpenSSL features. The goal of this chapter is to compartmentalize the features of the library into smaller groups to establish a sense of process. We hope that this process will serve as a template for developers when it comes to implementing SSL in their own applications. In adding SSL to an application, the application's unique requirements must be considered, and the best decision must be made for both security and functionality.
```

#### 6.1.1.1 Programming with SSL

```text
OpenSSL's API for SSL is large and can be daunting to inexperienced programmers. Additionally, as discussed in Chapter 1, SSL can be ineffective at accomplishing its security goals if implemented incorrectly. These factors compound to leave the developer with a difficult task. In hopes of disentangling the mystery of implementing secure programs, we attack the problem in three steps. At each step, the developer must provide some application-specific knowledge to make sure SSL does its job. For example, the choices made by a developer of a highly compatible web browser will be different from those made by a developer of a highly secure server application.

The steps below provide a template for developers to follow when implementing an SSL client or server. We will start with a small example and build upon it. This example will not be secure to our satisfaction until all of the steps have been thought through. In each step, we will introduce a small dose of the API; after all the steps, the developer should be able to think through the design of an SSL-enabled application much more clearly. Completing these steps is not the end of the road, however. In order to address the requirements of many applications, we need to go further and look into the advanced features of the API.
```

#### 6.1.1.1.1 The Application(s) to Secure

```text
We will be using two very simple applications: a client and server in which the server simply echoes data from the client to the console. Our goal is to augment our two applications so that they can perform their tasks in a hostile environment. In other words, we'll implement each program to strictly authenticate connecting peers. As we walk the path to creating SSL-enabled versions of our programs, we discuss the choices that a developer must make at each stage.

Before moving forward, let's look at our sample applications. There a total of four files: common.h, common.c, client.c, and server.c. The code for each is presented in Example 5-1 through Example 5-4. Also, we use the code presented in Example 4-2 so we can use multiple threads. For Unix systems, we'll continue to use POSIX threads.

Starting with common.h in Example 5-1, Lines 1-5 include relevant headers from OpenSSL. Right now, we don't make use of anything from a few of these headers, but we soon will, so they are included. Lines 22-24 define the strings for the client and server machines as well as the server's listening port. In addition, the header contains some definitions for convenient error handling and for threading in a platform-independent manner similar to the definitions set forth in Chapter 4's threading examples.
Example 5-1. common.h


  1  #include <openssl/bio.h>
  2  #include <openssl/err.h>
  3  #include <openssl/rand.h>
  4  #include <openssl/ssl.h>
  5  #include <openssl/x509v3.h>
  6  
  7  #ifndef WIN32
  8  #include <pthread.h>
  9  #define THREAD_CC
 10  #define THREAD_TYPE                    pthread_t
 11  #define THREAD_CREATE(tid, entry, arg) pthread_create(&(tid), NULL, \
 12                                                        (entry), (arg))
 13  #else
 14  #include <windows.h>
 15  #define THREAD_CC                      _  _cdecl
 16  #define THREAD_TYPE                    DWORD
 17  #define THREAD_CREATE(tid, entry, arg) do { _beginthread((entry), 0, (arg));\
 18                                              (tid) = GetCurrentThreadId(  );   \
 19                                         } while (0)
 20  #endif
 21   
 22  #define PORT            "6001"
 23  #define SERVER          "splat.zork.org"
 24  #define CLIENT          "shell.zork.org"
 25   
 26  #define int_error(msg)  handle_error(__FILE__, __LINE_  _, msg)
 27  void handle_error(const char *file, int lineno, const char *msg);
 28   
 29  void init_OpenSSL(void);

					  


Example 5-2, the file common.c, defines our error reporting function handle_error. The error handling in our example applications is a bit draconian, and you'll most likely want to handle errors in your own applications in a much more user-friendly manner. In general, it's not appropriate to handle all possible errors by bringing the application to such an abrupt halt.

The file common.c also defines a function that will perform common initialization such as setting up OpenSSL for multithreading, initializing the library, and loading error strings. The call to SSL_load_error_strings loads the associated data for error codes so that when errors occur and we print the error stack, we get human-readable information about what went wrong. Since loading these diagnostic strings does take memory, there are circumstances in which we would not want to make this call, such as when we're developing applications for embedded systems or other machines with limited memory. Generally, it's a good idea to load the strings since it makes the job of decoding error messages much easier.

As we build in SSL support, the file common.c will hold the implementations of functions used by both our client and server, and common.h will receive the prototypes.
Example 5-2. common.c

  1  #include "common.h"
  2   
  3  void handle_error(const char *file, int lineno, const char *msg)
  4  {
  5      fprintf(stderr, "** %s:%i %s\n", file, lineno, msg);
  6      ERR_print_errors_fp(stderr);
  7      exit(-1);
  8  }
  9   
 10  void init_OpenSSL(void)
 11  {
 12      if (!THREAD_setup() || !SSL_init_library(  ))
 13      {
 14          fprintf(stderr, "** OpenSSL initialization failed!\n");
 15          exit(-1);
 16      }
 17      SSL_load_error_strings(  );
 18  }


The bulk of our client application is in Example 5-3, client.c. At a high level, it creates a connection to the server on port 6001, as specified in common.h. Once a connection is established, it reads data from stdin until EOF is reached. As data is read and an internal buffer is filled, the data is sent over the connection to the server. Note that at this point, although we're using OpenSSL for socket communications, we have not yet enabled the use of the SSL protocol.

Lines 27-29 create a new BIO object with a BIO_METHOD returned from BIO_s_connect; the call to BIO_new_connect is a simplified function to accomplish this task. As long as no error occurs, lines 31-32 do the work of actually making the TCP connection and checking for errors. When a connection is successfully established, do_client_loop is called, which continually reads data from stdin and writes that data out to the socket. If an error while writing occurs or an EOF is received while reading from the console, the function exits and the program terminates.
Example 5-3. client.c


  1  #include "common.h"
  2   
  3  void do_client_loop(BIO *conn)
  4  {
  5      int  err, nwritten;
  6      char buf[80];
  7   
  8      for (;;)
  9      {
 10          if (!fgets(buf, sizeof(buf), stdin))
 11              break;
 12          for (nwritten = 0;  nwritten < sizeof(buf);  nwritten += err)
 13          {
 14              err = BIO_write(conn, buf + nwritten, strlen(buf) - nwritten);
 15              if (err <= 0)
 16                  return;
 17          }
 18      }
 19  }
 20   
 21  int main(int argc, char *argv[])
 22  {
 23      BIO  *conn;
 24   
 25      init_OpenSSL(  );
 26   
 27      conn = BIO_new_connect(SERVER ":" PORT);
 28      if (!conn)
 29          int_error("Error creating connection BIO");
 30   
 31      if (BIO_do_connect(conn) <= 0)
 32          int_error("Error connecting to remote machine");
 33   
 34      fprintf(stderr, "Connection opened\n");
 35      do_client_loop(conn);
 36      fprintf(stderr, "Connection closed\n");
 37   
 38      BIO_free(conn);
 39      return 0;
 40  }

					  


The server application in Example 5-4, server.c, differs from the client program in a few ways. After making the call to our common initialization function (line 44), it creates a different kind of BIO, one based on the BIO_METHOD returned from BIO_s_accept. This type of BIO creates a server socket that can accept remote connections. In lines 50-51, a call to BIO_do_accept binds the socket to port 6001; subsequent calls to BIO_do_accept will block and wait for a remote connection. The loop in lines 53-60 blocks until a connection is made. When a connection is made, a new thread to handle the new connection is spawned, which then calls do_server_loop with the connected socket's BIO. The function do_server_loop simply reads data from the socket and writes it back out to stdout. If any errors occur here, the function returns and the thread is terminated. As a note, we call ERR_remove_state on line 33 to make sure any memory used by the error queue for the thread is freed.
Example 5-4. The server application


  1  #include "common.h"
  2   
  3  void do_server_loop(BIO *conn)
  4  {
  5      int err, nread;
  6      char buf[80];
  7   
  8      do
  9      {
 10          for (nread = 0;  nread < sizeof(buf);  nread += err)
 11          {
 12               err = BIO_read(conn, buf + nread, sizeof(buf) - nread);
 13               if (err <= 0)
 14                   break;
 15          }
 16          fwrite(buf, 1, nread, stdout);
 17      }
 18      while (err > 0);
 19  }
 20   
 21  void THREAD_CC server_thread(void *arg)
 22  {
 23      BIO *client = (BIO *)arg;
 24   
 25  #ifndef WIN32
 26      pthread_detach(pthread_self(  ));
 27  #endif
 28      fprintf(stderr, "Connection opened.\n");
 29      do_server_loop(client);
 30      fprintf(stderr, "Connection closed.\n");
 31  
 32      BIO_free(client);
 33      ERR_remove_state(0);
 34  #ifdef WIN32
 35      _endthread(  );
 36  #endif
 37  }
 38   
 39  int main(int argc, char *argv[])
 40  {
 41      BIO         *acc, *client;
 42      THREAD_TYPE tid;
 43   
 44      init_OpenSSL(  );
 45   
 46      acc = BIO_new_accept(PORT);
 47      if (!acc)
 48          int_error("Error creating server socket");
 49    
 50      if (BIO_do_accept(acc) <= 0)
 51          int_error("Error binding server socket");
 52    
 53      for (;;)
 54      {
 55          if (BIO_do_accept(acc) <= 0)
 56              int_error("Error accepting connection");
 57   
 58          client = BIO_pop(acc);
 59          THREAD_CREATE(tid, server_thread, client);
 60      }
 61   
 62      BIO_free(acc);
 63      return 0;
 64  }

					  


Now that we understand the sample application, we're ready to take the steps necessary to secure the communications with SSL.
```

#### 6.1.1.1.2 Step 1: SSL Version Selection and Certificate Preparation

```text
In order for SSL connections to be secure, we must select a secure version of the protocol and provide accurate certificate information for the peer to validate. Since this is our first introduction to the SSL API, we will cover the background information about the structures and functions we need to accomplish our task.
```

#### 6.1.1.1.2.1 Background

```text
We need to examine three relevant object types: SSL_METHOD, SSL_CTX, and SSL. An SSL_METHOD represents an implementation of SSL functionality. In other words, it specifies a protocol version. OpenSSL provides populated SSL_METHOD objects and some accessor methods for them. They are listed in Table 5-1. The extent of our interaction with this type of object will be to select the protocol version we wish to support by making a function call from the table.

Table 5-1. Functions to retrieve pointers to SSL_METHOD objects
Function 	Comments
SSLv2_method 	Returns a pointer to SSL_METHOD for generic SSL Version 2
SSLv2_client_method 	Returns a pointer to SSL_METHOD for an SSL Version 2 client
SSLv2_server_method 	Returns a pointer to SSL_METHOD for an SSL Version 2 server
SSLv3_method 	Returns a pointer to SSL_METHOD for generic SSL Version 3
SSLv3_client_method 	Returns a pointer to SSL_METHOD for an SSL Version 3 client
SSLv3_server_method 	Returns a pointer to SSL_METHOD for an SSL Version 3 server
TLSv1_method 	Returns a pointer to SSL_METHOD for generic TLS Version 1
TLSv1_client_method 	Returns a pointer to SSL_METHOD for a TLS Version 1 client
TLSv1_server_method 	Returns a pointer to SSL_METHOD for a TLS Version 1 server
SSLv23_method 	Returns a pointer to SSL_METHOD for generic SSL/TLS
SSLv23_client_method 	Returns a pointer to SSL_METHOD for an SSL/TLS client
SSLv23_server_method 	Returns a pointer to SSL_METHOD for an SSL/TLS server

OpenSSL provides implementations for SSL Version 2, SSL Version 3, and TLS Version 1. Also, some SSLv23 functions don't indicate a specific protocol version but rather a compatibility mode. In such a mode, a connection will report that it can handle any of the three SSL/TLS protocol versions. To reiterate, applications should not use SSLv2, since this protocol is known to have security flaws. Using an SSL_METHOD object retrieved by one of the functions in Table 5-1, we create an SSL_CTX object.

	

How would we create an application that supports both SSLv3 and TLSv1? If we are to create a server that needs to communicate with both SSLv3 and TLSv1 clients, using either SSLv3_method or TLSv1_method will prevent one kind of client from connecting properly. Since we do not want to use SSL Version 2 (it is insecure), it would seem that the compatibility implementation SSLv23_method is also not an option. This isn't actually true. We can use the compatibility mode and set an option in the SSL_CTX object to have it remove SSLv2 from the acceptable protocols. The function to do this is SSL_CTX_set_options, and the relevant details for doing this are in Step 3.

An SSL_CTX object will be a factory for producing SSL connection objects. This context allows us to set connection configuration parameters before the connection is made, such as protocol version, certificate information, and verification requirements. It is easiest to think of SSL_CTX objects as the containers for default values for the SSL connections to be made by a program. Objects of this type are created with the function SSL_CTX_new. This function takes only one argument, generally supplied from the return value of one of the functions in Table 5-1.

In general, an application will create just one SSL_CTX object for all of the connections it makes. From this SSL_CTX object, an SSL type object can be created with the SSL_new function. This function causes the newly created SSL object to inherit all of the parameters set forth in the context. Even though most of the settings are copied to the SSL object on invocation of SSL_new, the order in which calls are made to OpenSSL functions can cause unexpected behavior if we're not careful.

	

Applications should set up an SSL_CTX completely, with all connection invariant settings, before creating SSL objects from it. In other words, after calling SSL_new with a particular context object, no more calls operating on that SSL_CTX object should be made until all produced SSL objects are no longer in use. The reason is simple. Modifying a context can sometimes affect the SSL connections that have already been created (i.e.., a function we examine later, SSL_CTX_set_default_passwd_cb, changes the callback in the context and in all connections that were already created from this context). To avoid any unpredictability, never modify the context after connection creation has begun. If there are any connection-specific parameters that we do need to set, most SSL_CTX functions have SSL counterparts that act on SSL-type objects.
```

#### 6.1.1.1.2.2 Certificate preparation

```text
The SSL protocol usually requires the server to present a certificate. The certificate contains credentials that the client may look at to determine if the server is authentic and can be trusted. As we know, a peer validates a certificate through verification of its chain of signers. Thus, to implement an SSL server correctly, we must provide certificate and chain information to the peer. The SSL protocol also allows the client to optionally present certificate information so that the server may authenticate it.

	

There are, in fact, ways of using SSL to create anonymous connections in which neither the server nor client presents a certificate. These are done by using the Diffie-Hellman key-agreement protocol and setting the SSL cipher suite to include the anonymous DH algorithm. This is discussed further Section 5.1.4.3 below.

In general, server applications should always provide certificates to peers, and clients can do so optionally. The purpose and the desired security of the application should dictate whether client certificates are used. For instance, a server may request a client certificate, and if our client does not have one to present, we may not be able to establish a secure connection. Thus, it's a good idea to implement client certificates if it makes sense to do so. On the other hand, server certificates are usually required, and, unless our goal is to create a completely nonauthenticated connection, we should implement them.

OpenSSL presents the client certificate to the server during handshakes, as long as we assign a certificate to the client and the server asks for it. This is actually a small violation of the TLS protocol. The protocol calls for the server to present a list of valid CAs, and the client should send a certificate only if it matches. In practice, this infraction of the standard should not affect anything, but the behavior may be fixed in future versions of OpenSSL.

The SSL API has several ways to incorporate certificate information into an SSL_CTX object. The function to use is SSL_CTX_use_certificate_chain_file. It loads the chain of certificates from the filename specified by the second argument. The file should contain the certificate chain in order, starting with the certificate for the application and ending with the root CA certificate. Each of these entries must be in PEM format.

In addition to loading the certificate chain, the SSL_CTX object must have the application's private key. This key must correspond to the public key embedded within the certificate. The easiest way that we can supply this key to the context is through the SSL_CTX_use_PrivateKey_file function. The second argument specifies the filename, and the third specifies the type of encoding. The type is specified by using a defined name—either SSL_FILETYPE_PEM or SSL_FILETYPE_ASN1. It bears mentioning that this private key must be kept secret for the application to remain secure. Therefore, using an encrypted PEM format for on-disk storage is recommended; using triple DES in CBC mode is a good choice. The SSL_CTX will fail to incorporate an encrypted private key correctly unless the correct passphrase is supplied.

OpenSSL collects passphrases through a callback function. The default callback prompts the user on the terminal. For some applications, the default will not be acceptable. The function SSL_CTX_set_default_passwd_cb allows us to set the callback to something more appropriate for the application. The assigned function is invoked during the call to SSL_CTX_use_PrivateKey_file if the indicated file contains an encrypted key. Therefore, the callback should be set before making that call. In fact, the certificates in our chain could be encrypted even though there is nothing secret about them, and our callback function would be invoked to gather the passphrase. More accurately, we could state that the passphrase function is called any time a piece of encrypted information is loaded as a parameter to the SSL_CTX.

The callback function's obligation is to copy the passphrase into the buffer that is supplied to it when it is called. The callback function is called with four arguments.

int passwd_cb(char * buf, int size, int flag, void *userdata);



buf

    The buffer that the passphrase should be copied into. The buffer must be NULL terminated.

size

    The size of the buffer in bytes; includes space for the NULL terminating character.

flag

    Passed as either zero or nonzero. When the flag is nonzero, this passphrase will be used to perform encryption; otherwise, it will be used to perform decryption.

userdata

    Application-specific data; SSL_CTX_set_default_passwd_cb_userdata is used to set this data. Whatever data is set by the application is passed to the callback function untouched by OpenSSL.

There are two approaches to implementing the passphrase callback. The first method is simply to have the callback prompt the user, copy the collected passphrase to the buffer, and return. This method is viable for applications that need to decrypt a key only once, commonly on application startup. The second way to implement the callback is for the application to prompt the user for a passphrase on startup and store the collected information in a buffer. The passphrase can be added to the SSL_CTX as user data via the function SSL_CTX_set_default_passwd_cb_userdata. With this method, the callback itself only needs to copy the data from the fourth parameter to the first. This method is viable for applications that need to decrypt keys during normal operation in which constant user prompting is a nuisance.

	

An unlimited number of PEM-encoded items can be stored in a file, but only one DER item may be stored in a file. Also, different types of PEM items may be stored within a single file. As a result, if the private key is kept in PEM encoding, it can be appended to the certificate chain file, and the same filename can be used for the calls to SSL_CTX_use_certificate_chain_file and SSL_CTX_use_PrivateKey_file. This trick is used in Example 5-5. PEM and DER encodings are discussed in Chapter 8.

At this stage, we will limit our discussion to the process of providing certificate information to the peer, rather than discussing the processes of validation. The validation problem will be discussed in Step 2.
```

#### 6.1.1.1.2.3 Our example extended

```text
Using the same example applications that we've already provided, let's modify them with what we've learned about making SSL connections. Keep in mind that this example is not yet secure. It does not validate anything about the peer to which it connects; it merely provides the authentication information. The new version of our client in client1.c is shown in Example 5-5. The bold lines are those that we have added or changed.
Example 5-5. client1.c

Code View: Scroll / Show All

  1  #include "common.h"
  2   
  3  #define CERTFILE "client.pem"
  4  SSL_CTX *setup_client_ctx(void)
  5  {
  6      SSL_CTX *ctx;
  7  
  8      ctx = SSL_CTX_new(SSLv23_method(  ));
  9      if (SSL_CTX_use_certificate_chain_file(ctx, CERTFILE) != 1)
 10          int_error("Error loading certificate from file");
 11      if (SSL_CTX_use_PrivateKey_file(ctx, CERTFILE, SSL_FILETYPE_PEM) != 1)
 12          int_error("Error loading private key from file");  
 13      return ctx;
 14  }
 15  
 16  int do_client_loop(SSL *ssl)
 17  {
 18      int  err, nwritten;
 19      char buf[80];
 20   
 21      for (;;)
 22      {
 23          if (!fgets(buf, sizeof(buf), stdin))
 24              break;
 25          for (nwritten = 0;  nwritten < sizeof(buf);  nwritten += err)
 26          {
 27              err = SSL_write(ssl, buf + nwritten, strlen(buf) - nwritten);
 28              if (err <= 0)
 29                  return 0;
 30          }
 31      }
 32      return 1;
 33  }
 34   
 35  int main(int argc, char *argv[])
 36  {
 37      BIO     *conn;
 38      SSL     *ssl;
 39      SSL_CTX *ctx;
 40  
 41      init_OpenSSL(  );
 42      seed_prng(  );
 43  
 44      ctx = setup_client_ctx(  );
 45  
 46      conn = BIO_new_connect(SERVER ":" PORT);
 47      if (!conn)
 48          int_error("Error creating connection BIO");
 49   
 50      if (BIO_do_connect(conn) <= 0)
 51          int_error("Error connecting to remote machine");
 52   
 53      if (!(ssl = SSL_new(ctx)))
 54          int_error("Error creating an SSL context");
 55      SSL_set_bio(ssl, conn, conn);
 56      if (SSL_connect(ssl) <= 0)
 57          int_error("Error connecting SSL object");
 58  
 59      fprintf(stderr, "SSL Connection opened\n");
 60      if (do_client_loop(ssl))
 61          SSL_shutdown(ssl);
 62      else
 63          SSL_clear(ssl);
 64      fprintf(stderr, "SSL Connection closed\n");
 65  
 66      SSL_free(ssl);
 67      SSL_CTX_free(ctx);
 68      return 0;
 69  }

					  


In this example, we make a call to the function seed_prng. As its name suggests, this function seeds the OpenSSL PRNG. Its implementation is left out; see Chapter 4 for details on an appropriate implementation. It is very important to maintaining the security of SSL for the PRNG to be properly seeded, so this function should never be left out in real-world applications.

The function setup_client_ctx performs the actions as discussed earlier to provide certificate data to the server properly. In this setup process, we leave out any calls to SSL_CTX_set_default_passwd_cb since the default OpenSSL passphrase callback is acceptable for our purposes. The only other point of interest is the error checking performed. This example prints errors and exits if anything goes wrong; a more robust error handling technique was left out for clarity. The sidebar contains more information about the contents of the file client.pem.

Sidebar 1. Generating the Files Needed by the Examples

Our example programs refer to several filenames that contain PEM-encoded certificates and keys. In this sidebar, we'll describe the process of creating each of them. There are two certificates used, the files server.pem and client.pem. In addition, we have a trusted root certificate in the file root.pem. As the example develops, we will also require two other files that will contain DH parameters (dh512.pem and dh1024.pem). All of the files were generated using the command-line tool described in Chapter 2.

Before moving into the details of the commands themselves, we should first describe our certificate hierarchy. As we've stated, there is just one trusted certificate: the root CA's. This certificate is self-signed, as are all root CA certificates. This root CA represents the CA for a company. The qualifications for peer certificate validation for both our example client and server will be simply to verify that the other has been signed by the root CA. To demonstrate how a chain can grow and still be verifiable, we will create a server CA. This CA will be signed by the root CA and it, in turn, will be used to sign all server identity certificates. The client certificates, on the other hand, will be signed directly by the root CA. Nothing prevents us from making the hierarchy arbitrarily complex, but we've left just one intermediate CA to demonstrate how to do it. Creating more intermediates would follow the same pattern, as we'll see.

The first command shown in each example below generates a certificate signing request. In creating the request, the command-line utility will prompt the user for the contents of the data fields that will be put in the request. The values we typed in are printed when the last command in each example runs. The values that aren't seen are those of the subjectAltName field. We embed the server and client fully qualified domain name (FQDN) in the respective certificate's commonName field, and also in the dNSName field of the subjectAltName. The latter is done by changing the configuration file to include "subjectAltName = DNS:FQDN" under the certificate extensions section (the "usr_cert" section); the configuration file is the default aside from this change.

To create the root CA:

$ openssl req -newkey rsa:1024 -sha1 -keyout rootkey.pem -out rootreq.pem
$ openssl req -newkey rsa:1024 -sha1 -keyout rootkey.pem -out rootreq.pem
Generating a 1024 bit RSA private key
...........++++++
.........................++++++
writing new private key to 'rootkey.pem'
Enter PEM pass phrase: 1234
Verifying - Enter PEM pass phrase: 1234
-----
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [AU]:IL
State or Province Name (full name) [Some-State]:NTN
Locality Name (eg, city) []:<city>
Organization Name (eg, company) [Internet Widgits Pty Ltd]:Cisco
Organizational Unit Name (eg, section) []:<org-unit>
Common Name (eg, YOUR name) []:<user>
Email Address []:<email>

Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []:password
An optional company name []:


$ cat myopenssl.cnf   
[ ca ]
default_ca      = CA_default            # The default ca section
 
####################################################################
[ CA_default ]
 
dir             = ./demoCA              # Where everything is kept
certs           = $dir/certs            # Where the issued certs are kept
crl_dir         = $dir/crl              # Where the issued crl are kept
database        = $dir/index.txt        # database index file
new_certs_dir   = $dir/newcerts         # default place for new certs
 
certificate     = $dir/cacert.pem       # The CA certificate
serial          = $dir/serial           # The current serial number
crl             = $dir/crl.pem          # The current CRL
private_key     = $dir/private/cakey.pem# The private key
RANDFILE        = $dir/private/.rand    # private random number file
 
x509_extensions = usr_cert              # The extentions to add to the cert
 
# Extensions to add to a CRL. Note: Netscape communicator chokes on V2 CRLs
# so this is commented out by default to leave a V1 CRL.
# crl_extensions        = crl_ext
 
default_days    = 365                   # how long to certify for
default_crl_days= 30                    # how long before next CRL
default_md      = md5                   # which md to use
preserve        = no                    # keep passed DN ordering
 
# A few difference way of specifying how similar the request should look
# For type CA, the listed attributes must be the same, and the optional
# and supplied fields are just that :-)
policy          = policy_match


$ openssl x509 -req -in rootreq.pem -sha1 -extfile myopenssl.cnf   -extensions v3_ca -signkey rootkey.pem -out rootcert.pem 
$ openssl x509 -req -in rootreq.pem -sha1    -extensions v3_ca -signkey rootkey.pem -out rootcert.pem 
Signature ok
subject=/C=IL/ST=<state>/L=<city>/O=<org>/OU=<org-unit>/CN=<user>/emailAddress=<email>
Getting Private key
Enter pass phrase for rootkey.pem:
$ ls -lrt
total 37K
-rw-r--r--+ 1 <user> Domain Users 1.4K Mar 17 16:45 common.h
-rw-r--r--+ 1 <user> Domain Users  816 Mar 17 16:47 common.c
-rw-r--r--+ 1 <user> Domain Users 1.7K Mar 17 16:50 server.c
-rw-r--r--+ 1 <user> Domain Users 2.1K Mar 17 16:57 client.c
-rw-r--r--+ 1 <user> Domain Users  963 Mar 17 17:14 rootkey.pem
-rw-r--r--+ 1 <user> Domain Users  708 Mar 17 17:14 rootreq.pem
-rw-r--r--+ 1 <user> Domain Users 8.4K Mar 17 17:24 myopenssl.cnf
-rw-r--r--+ 1 <user> Domain Users  899 Mar 17 17:28 rootcert.pem



$ cat rootcert.pem rootkey.pem > root.pem
$ openssl x509 -subject -issuer -noout -in root.pem
subject= /C=US/ST=VA/L=Fairfax/O=Zork.org/CN=Root CA
issuer= /C=US/ST=VA/L=Fairfax/O=Zork.org/CN=Root CA
$ cat rootcert.pem rootkey.pem > root.pem
$ openssl x509 -subject -issuer -noout -in root.pem
subject= /C=IL/ST=<state>/L=<city>/O=<org>/OU=<org-unit>/CN=<user>/emailAddress=<email>
issuer= /C=IL/ST=<state>/L=<city>/O=<org>/OU=<org-unit>/CN=<user>/emailAddress=<email>


To create the server CA and sign it with the root CA:

$ openssl req -newkey rsa:1024 -sha1 -keyout serverCAkey.pem -out \
>  serverCAreq.pem
$ openssl x509 -req -in serverCAreq.pem -sha1 -extfile \
>  myopenssl.cnf -extensions v3_ca -CA root.pem -CAkey root.pem \
>  -CAcreateserial -out serverCAcert.pem
$ cat serverCAcert.pem serverCAkey.pem rootcert.pem > serverCA.pem
$ openssl x509 -subject -issuer -noout -in serverCA.pem
subject= /C=US/ST=VA/L=Fairfax/O=Zork.org/OU=Server Division/CN=Server CA
issuer= /C=US/ST=VA/L=Fairfax/O=Zork.org/CN=Root CA


To create the server's certificate and sign it with the Server CA:

$ openssl req -newkey rsa:1024 -sha1 -keyout serverkey.pem -out \
>  serverreq.pem
$ openssl x509 -req -in serverreq.pem -sha1 -extfile myopenssl.cnf \
>  -extensions usr_cert -CA serverCA.pem -CAkey serverCA.pem \
>  -CAcreateserial -out servercert.pem
$ cat servercert.pem serverkey.pem serverCAcert.pem rootcert.pem > \
>  server.pem
$ openssl x509 -subject -issuer -noout -in server.pem
subject= /C=US/ST=VA/L=Fairfax/O=Zork.org/CN=splat.zork.org
issuer= /C=US/ST=VA/L=Fairfax/O=Zork.org/OU=Server Division/CN=Server CA


To create the client certificate and sign it with the Root CA

$ openssl req -newkey rsa:1024 -sha1 -keyout clientkey.pem -out \
>  clientreq.pem
$ openssl x509 -req -in clientreq.pem -sha1 -extfile myopenssl.cnf \
>  -extensions usr_cert -CA root.pem -CAkey root.pem \
>  -CAcreateserial -out clientcert.pem
$ cat clientcert.pem clientkey.pem rootcert.pem > client.pem
$ openssl x509 -subject -issuer -noout -in client.pem
subject= /C=US/ST=VA/L=Fairfax/O=Zork.org/CN=shell.zork.org
issuer= /C=US/ST=VA/L=Fairfax/O=Zork.org/CN=Root CA


To create dh512.pem and dh1024.pem:

$ openssl dhparam -check -text -5 512 -out dh512.pem
$ openssl dhparam -check -text -5 1024 -out dh1024.pem



Lines 54-58 create the SSL object and connect it. There are some functions used here that we have not yet discussed. The call to SSL_new creates our SSL object and copies the settings we've already placed in the SSL_CTX to the newly created object. At this point, the SSL object is still in a generic state. In other words, it could play the role of the server or the client in an SSL handshake.

Another factor left unspecified is the path of communications for the SSL object. Since SSL objects are flexible in the sense that they can perform SSL functions on top of many different types of I/O methods, we must specify a BIO for our object to use. Line 56 does this through a call to SSL_set_bio. This function is passed our connection BIO twice since SSL objects are robust enough to operate on two one-way I/O types instead of requiring a single full-duplex I/O method. Basically, we must specify the BIO to use for writing separately from the BIO used for reading. In this case, they are the same object, since sockets allow two-way communication.

The last unfamiliar function used here is SSL_connect. This function causes the SSL object to initiate the protocol using the underlying I/O. In other words, it begins the SSL handshake with the application on the other end of the underlying BIO. This function will return an error for problems such as incompatible protocol versions.

The do_client_loop function is almost identical to that of our non-SSL client. We've simply changed the parameter to an SSL object instead of a BIO, and the BIO_write becomes an SSL_write. In addition, we've added a return value to this function. If no errors occur, we can call SSL_shutdown to stop the SSL connection; otherwise, we call SSL_clear. This is done to force OpenSSL to remove any session with errors from the session cache. We will look at session caching in more detail later in this chapter, but for now, it is worth noting that session caching is effectively disabled in the examples we've provided so far.

The last point to make about this example is that we removed the call to BIO_free. This is done because SSL_free automatically frees the SSL object's underlying BIOs for us.

Example 5-6 has the contents of server1.c, the file containing the implementation of our SSL-enabled server. Again, it isn't yet secure since it validates nothing about the peer; it simply provides its certificate information to the client.
Example 5-6. server1.c

Code View: Scroll / Show All

  1  #include "common.h"
  2   
  3  #define CERTFILE "server.pem"
  4  SSL_CTX *setup_server_ctx(void)
  5  {
  6      SSL_CTX *ctx;
  7  
  8      ctx = SSL_CTX_new(SSLv23_method(  ));
  9      if (SSL_CTX_use_certificate_chain_file(ctx, CERTFILE) != 1)
 10          int_error("Error loading certificate from file");
 11      if (SSL_CTX_use_PrivateKey_file(ctx, CERTFILE, SSL_FILETYPE_PEM) != 1)
 12          int_error("Error loading private key from file");
 13      return ctx;
 14  }
 15  
 16  int do_server_loop(SSL *ssl)
 17  {
 18      int  err, nread;
 19      char buf[80];
 20   
 21      do
 22      {
 23          for (nread = 0;  nread < sizeof(buf);  nread += err)
 24          {
 25              err = SSL_read(ssl, buf + nread, sizeof(buf) - nread);
 26              if (err <= 0)
 27                  break;
 28          }
 29          fwrite(buf, 1, nread, stdout);
 30      }
 31      while (err > 0);
 32      return (SSL_get_shutdown(ssl) & SSL_RECEIVED_SHUTDOWN) ? 1 : 0;
 33  }
 34   
 35  void THREAD_CC server_thread(void *arg)
 36  {
 37      SSL *ssl = (SSL *)arg;
 38  
 39  #ifndef WIN32
 40      pthread_detach(pthread_self(  ));
 41  #endif
 42      if (SSL_accept(ssl) <= 0)
 43          int_error("Error accepting SSL connection");
 44      fprintf(stderr, "SSL Connection opened\n");
 45      if (do_server_loop(ssl))
 46          SSL_shutdown(ssl);
 47      else
 48          SSL_clear(ssl);
 49      fprintf(stderr, "SSL Connection closed\n");
 50      SSL_free(ssl);
 51  
 52  ERR_remove_state(0);
 53  
 54  #ifdef WIN32
 55      _endthread(  );
 56  #endif
 57  }
 58   
 59  int main(int argc, char *argv[])
 60  {
 61      BIO         *acc, *client;
 62      SSL         *ssl;
 63      SSL_CTX     *ctx;
 64      THREAD_TYPE tid;
 65   
 66      init_OpenSSL(  );
 67      seed_prng(  );
 68  
 69      ctx = setup_server_ctx(  );
 70  
 71      acc = BIO_new_accept(PORT);
 72      if (!acc)
 73          int_error("Error creating server socket");
 74   
 75      if (BIO_do_accept(acc) <= 0)
 76          int_error("Error binding server socket");
 77   
 78      for (;;)
 79      {
 80          if (BIO_do_accept(acc) <= 0)
 81              int_error("Error accepting connection");
 82   
 83          client = BIO_pop(acc);
 84          if (!(ssl = SSL_new(ctx)))
 85              int_error("Error creating SSL context");
 86  
 87          SSL_set_bio(ssl, client, client);
 88          THREAD_CREATE(tid, server_thread, ssl);
 89      }
 90      
 91      SSL_CTX_free(ctx);
 92      BIO_free(acc);
 93      return 0;
 94  }

					  


After looking at the new client program, the modifications to the server should be clear. Since this is the server side of the SSL negotiation, a different function call is made: SSL_accept. The SSL_accept function initiates communication on the underlying I/O layer to perform the SSL handshake.

In the do_server_loop function, we use a call to SSL_get_shutdown to check into the error status of the SSL object. This essentially allows us to differentiate normal client terminations from actual errors. If the SSL_RECEIVED_SHUTDOWN flag is set, we know the session hasn't had an error and it's safe to cache. In other words, we can call SSL_shutdown rather than simply clear the connection. The remainder of the modifications to the server program parallel those made to the client.

In summary, we've taken our applications and built them to the point of creating the objects necessary for SSL connections. Each application does provide its certificate data to the peers to which it connects, but they do not verify the certificates they receive. We will build further in the next step and learn how to validate peer certificates.
```

#### 6.1.1.1.3 Step 2: Peer Authentication

```text
The security of an SSL-enabled program is compromised by failure to verify peer certificates properly. In this step, we'll look into the various API calls that deal with trusted certificates, certificate chain verification, CRL usage, and post-connection verification.
```

#### 6.1.1.1.3.1 Background

```text
Certificate verification can often be confusing, so we'll discuss the theory before delving into the details. As we already know, a certificate is a set of credentials that has been cryptographically signed by a CA. Each certificate, including a CA certificate, contains a public key with a private key counterpart held in secret by the certificate owner. Moving forward, the process of signing a certificate involves using the private key of a CA to sign the public key in the new certificate. Thus, it should be clear that the process of verification will involve using the public key in a CA certificate to verify the signature on a certificate.

Aside from using a CA to create an entity certificate, a CA may also sign a certificate and give it permissions, via X.509v3 extensions, to act as a CA itself. Generally, this procedure allows for a CA to permit another certificate to act as a CA for a specialized purpose. Through this mechanism, we become aware of certificate hierarchies, i.e., a certificate tree. Understanding this, we can see that a single entity certificate may have a list of signing certificates leading up to the original, self-signed root certificate. This list of certificates, each signed by the next, is called a certificate chain.

Jumping back to a simple example of a root CA signing a single entity certificate, any party may verify the entity certificate by checking the signature on it, presuming it trusts the root CA. The process of validating an entity certificate is that simple. Extending this to a certificate chain, we must validate each subsequent signature in the list until we reach a trusted CA certificate or until we reach the end of the list. If we hit a CA we trust and the signatures are all valid, our entity certificate is verified; if we find an invalid signature or reach the end of the chain without reaching a trusted certificate, the entity certificate is not verified.
```

#### 6.1.1.1.3.2 Incorporating trusted certificates

```text
As we previously discussed, verifying a certificate's authenticity requires that the verifying agent have a list of CAs that it trusts. Therefore, we must provide our application with such a list in order for it to verify the peer. We will start our discussion of peer verification by first concentrating on accomplishing this task.

Loading trusted CA certificates into our application is manifested as additional setup to the SSL_CTX object. The function SSL_CTX_load_verify_locations performs this task. This function will load certificates from files, directories, or both.

int SSL_CTX_load_verify_locations(SSL_CTX *ctx, const char *CAfile,
                                    const char *CApath);



ctx

    The SSL context object that trusted CA certificates will be loaded into.

CAfile

    The name of a file containing CA certificates in PEM format. More than one CA certificate may be present in the file.

CApath

    The name of a directory containing CA certificates. Each file in the directory must contain only a single CA certificate, and the files must be named by the subject name's hash and an extension of ".0".

We can call SSL_CTX_load_verify_locations with either the second or the third arguments specified as NULL, but not both. The behavior of this function is to perform the loading for the non-NULL arguments. An important difference between file and directory storage is the time when the certificates get loaded. With a flat file, the file is parsed and certificates loaded during the call to SSL_CTX_load_verify_locations. However, with a directory, certificates are read only when needed, i.e., during the verification phase that occurs during the SSL handshake.

OpenSSL also has default CA certificate locations. When building the library, these paths are hardcoded into the library based on the parameters that are used to build it. In general, there is an OpenSSL directory (commonly /usr/local/openssl on Unix systems). The default certificate file is named cert.pem, and it lives in this OpenSSL directory. Likewise, the default certificate directory is named certs, and it too lives in the OpenSSL directory. These default locations provide a convenient place to store system-wide CA certificates that all of the OpenSSL-based applications running on the machine require. Using the default files, we will not need to keep separate copies of common certificates for each application. The function SSL_CTX_set_default_verify_paths loads these default locations into our SSL_CTX object. For calls to this function, the same rules for determining when the CA certificates actually get loaded apply as with a call to SSL_CTX_load_verify_locations.

	

When we load a certificate location into an SSL_CTX object, we are making the statement that we trust those certificates. It is important to understand that if our application runs on a multiuser system, any user with permissions to write to the certificate locations that we load can subvert the security of our application. This is especially important when electing to load the default verify locations. For instance, if our application loads these defaults, a user with the correct permissions could slip in a new CA certificate, thus connecting our application with peers presenting certificates signed by this rogue CA certificate.

Using these two functions, we can load trusted CA certificates into our SSL_CTX. Even though they are loaded, the certificates are still not used to verify the peer. We will explore the details of enabling this in the next section.
```

#### 6.1.1.1.3.3 Certificate verification

```text
Certificate verification entails checking the cryptographic signatures on a certificate to be sure an entity we trust has signed that certificate. It also involves checking the certificate's notBefore and notAfter dates, trust settings, purpose, and revocation status. Verification of a certificate takes place during the SSL handshake (during the call to SSL_connect or SSL_accept, depending on whether the SSL object is a client or a server).

Once we've properly loaded trusted certificates into the SSL_CTX object, OpenSSL has a built-in function to verify the peer's certificate chain automatically. The routine used to verify the certificate chain could be changed from the default via a call to SSL_CTX_set_cert_verify_callback, but under almost all circumstances, this is undesirable since the default routine for signature verification is amply complete and robust. Instead, the developer can specify a different callback that filters the return status of the default verification and returns the new verification status. The function to perform this task is SSL_CTX_set_verify.

Aside from assigning a filter verify callback, this function's primary purpose is to assign the type of verification our SSL_CTX object's connections will perform. More accurately, we can use it to control how certificates and requests are handled during a handshake. The second argument to this function is a set of flags that determine this. Four flags are defined with names that can be combined with a logical OR operation. Depending on whether the context is being used in client mode or server mode, these flags can have different meanings.


SSL_VERIFY_NONE

    When the context is being used in server mode, no request for a certificate will be sent to the client, and the client should not send a certificate. When the context is being used in client mode, any certificate received from the server will be verified, but failure will not terminate the handshake. Do not combine this flag with any others; the others will take precedence over this one. This flag should only be used by itself.

SSL_VERIFY_PEER

    When the context is being used in server mode, a request for a certificate will be sent to the client. The client may opt to ignore the request, but if a certificate is sent back, it will be verified. If the verification fails, the handshake will be terminated immediately.

    When the context is being used in client mode, if the server sends a certificate, it will be verified. If the verification fails, the handshake will be terminated immediately. The only time that a server would not send a certificate is when an anonymous cipher is in use. Anonymous ciphers are disabled by default. Any other flags combined with this one in client mode are ignored.

SSL_VERIFY_FAIL_IF_NO_PEER_CERT

    If the context is not being used in server mode or if SSL_VERIFY_PEER is not set, this flag is ignored. Use of this flag will cause the handshake to terminate immediately if no certificate is provided by the client.

SSL_VERIFY_CLIENT_ONCE

    If the context is not being used in server mode or if SSL_VERIFY_PEER is not set, this flag is ignored. Use of this flag will prevent the server from requesting a certificate from the client in the case of a renegotiation. A certificate will still be requested during the initial handshake.

The third argument to SSL_CTX_set_verify is a pointer to the verification filter callback. Since the internal verification routine is called for each level of the peer certificate chain, our filter routine will be called just after each step. This function's first argument is nonzero if the verification succeeded, and zero otherwise. The second argument is an X509_STORE_CTX object. This type of object contains the information necessary to verify a certificate. The object holds the current certificate being verified and the verification result. The return value from the function should be either zero or nonzero to indicate whether the certificate should be considered valid or not.

As in most of the callbacks used with OpenSSL, there is a default supplied that simply returns the value of the first argument. When implementing our own version of this function, we need to maintain this behavior. If we return nonzero when the first parameter is actually zero, an unverified client certificate will be accepted as a verified one. Likewise, the reverse would cause a valid certificate to fail verification. At this point, it may seem as if there is no real purpose to implementing our own version, but this isn't accurate. The reason we should supply our own is so that more detailed information about the results of verification can be obtained, especially when verification fails. For instance, if a peer presents an expired certificate and we do not implement a verify callback to check status, then we find out only that the call to SSL_connect or SSL_accept failed because of "handshake failure." Example 5-7 shows an implementation for this callback that we will use in our example applications. To use it in our examples, it should be implemented in common.c and prototyped in common.h.
Example 5-7. A verify callback (implemented in common.c and prototyped in common.h)

Code View: Scroll / Show All

int verify_callback(int ok, X509_STORE_CTX *store)
{
    char data[256];
 
    if (!ok)
    {
        X509 *cert = X509_STORE_CTX_get_current_cert(store);
        int  depth = X509_STORE_CTX_get_error_depth(store);
        int  err = X509_STORE_CTX_get_error(store);
 
        fprintf(stderr, "-Error with certificate at depth: %i\n", depth);
        X509_NAME_oneline(X509_get_issuer_name(cert), data, 256);
        fprintf(stderr, "  issuer   = %s\n", data);
        X509_NAME_oneline(X509_get_subject_name(cert), data, 256);
        fprintf(stderr, "  subject  = %s\n", data);
        fprintf(stderr, "  err %i:%s\n", err, X509_verify_cert_error_string(err));
    }
 
    return ok;
}

					  


This callback employs several functions from the X509 family of functions to report the detailed error information.

The call to SSL_CTX_set_verify is done before any SSL objects are created from the context. We should also make a call to SSL_CTX_set_verify_depth. This function sets the maximum allowable depth for peer certificates. In other words, it limits the number of certificates that we are willing to verify in order to ensure the chain is trusted. For example, if the depth was set to four and six certificates are present in the chain to reach the trusted certificate, the verification would fail because the required depth would be too great. For nearly all applications, the default depth of nine is more than high enough to ensure that the peer certificate will not fail due to too large of a certificate chain. On the other hand, if we know that our application will be used only with peers presenting certificates of some smaller chain length, it is a good idea to set the value to exclude certificates composed of longer chains from being verified successfully. Setting the depth to zero allows chains of unlimited length to be used.

	

There is a known security vulnerability in SSL_CTX_set_verify_depth in versions of OpenSSL prior to 0.9.6. The problem stemmed from the fact that the internal verification routine did not properly check extensions on peer certificate chains; it approved certificate chains that contained non-CA certificates as long as they led to a trusted root CA. Thus, using any verification depth greater than one left the application susceptible to attack from anyone signed by the trusted root CA. Since this problem has been fixed in newer versions of OpenSSL by checking the X509v3 fields regarding CA authorization, this vulnerability should be of only academic interest.
```

#### 6.1.1.1.3.4 Incorporating certificate revocation lists

```text
A large problem with SSL security is the availability and usage of certificate revocation lists. Since certificates can be revoked by the issuing CA, we must somehow account for this in our SSL implementation. To do this, an application must load CRL files in order for the internal verification process to ensure each certificate it verifies is not revoked. Unfortunately, OpenSSL's CRL functionality is incomplete in Version 0.9.6. The features necessary to utilize CRL information will be complete in new versions starting with 0.9.7.

Because this functionality is not available at the time of writing, CRL usage will not be incorporated in this example. However, we can tell you what you will need to do once newer releases are made. Remember, it is paramount to include CRL checking when verifying certificates. If any new version of OpenSSL is used when building applications, this step is required for security.

The SSL interface itself does not support CRL incorporation directly; instead, we must use the underlying X509 interface.

The function SSL_CTX_get_cert_store retrieves the internal X509_STORE object from the SSL_CTX object. Operations on this store object allow us to perform a variety of tweaks on the verification process. In fact, the functions SSL_CTX_load_verify_locations and SSL_CTX_set_default_paths call functions against this same X509_STORE object to perform their respective operations.

X509_STORE *SSL_CTX_get_cert_store(SSL_CTX *ctx);


All of the details for interacting with certificate stores to set further verification parameters or incorporate CRL data are discussed in Chapter 10 with the verification of certificate chains. We strongly recommend that developers implementing applications consult the verification process in Chapter 10 that uses X509_STORE objects to learn the proper method of SSL certificate verification against CRLs. The process involves adding the CRL files to the X509_STORE via a file lookup method and then setting the store's flags to check certificates against the CRLs.
```

#### 6.1.1.1.3.5 Post-connection assertions

```text
Essentially, SSL_CTX_set_verify and SSL_CTX_set_verify_depth are all we need to use in order for OpenSSL to verify the peer certificate chain upon connection. There is more, however. After connecting the SSL object, we need to assert that some assumed properties about the connection are indeed true. OpenSSL provides several functions that allow us to create a post-connection verification routine to make sure that we haven't been fooled by a malicious peer. This post-connection verification routine is very important because it allows for much finer grained control over the certificate that is presented by the peer, beyond the certificate verification that is required by the SSL protocol proper.

The function SSL_get_peer_certificate will return a pointer to an X509 object that contains the peer's certificate. While the handshake is complete and, presumably, the verification completed correctly, we must still use this function. Consider the case in which the peer presents no certificate when one is requested but not required. The certificate verification routines—both the built-in and the filter—will not return errors since there was nothing wrong with the NULL certificate. Thus, to prevent this condition, we must call this function and check that the return value is not NULL. If this function returns a non-NULL value, the reference count of the return object is increased. In order to prevent memory leaks, we must call X509_free to decrement the count after we're done using the object.

Our application will be vulnerable if we do not check the peer certificate beyond verification of the chain. For example, let's say that we're making a web browsing application. To keep it simple, we'll allow just one trusted CA. When we do this, any SSL peer with a certificate signed by the same CA will be verified correctly. This isn't secure. Nothing prevents an attacker from getting his own certificate signed by the CA and then hijacking all your sessions. We thwart this kind of masquerade by tying the certificate to some piece of information unique to the machine. For purposes of SSL, this piece of information is the entity's fully qualified domain name (FQDN), also called the DNS name.

The common practice with X.509v1 certificates was to put the FQDN in the certificate's commonName field of the subjectName field. This practice is no longer recommended for new applications since X.509v3 allows certificate extensions to hold the FQDN as well as other identifying information, such as IP address. The proper place for the FQDN is in the dNSName field of the subjectAltName extension.

We use the function post_connection_check to perform these checks for us. We recommend always checking for the dNSName field first, and if it isn't present, we can check the commonName field. Checking the commonName field is strictly for backward compatibility, so if this isn't a concern, it can safely be omitted. Our example function will check for the extension first and then fall back to the commonName. One feature our example does omit is the optional wildcard expansion. RFC 2818 specifies a paradigm for allowing FQDNs in certificates to contain wildcards. Implementing this functionality is simply a text-processing issue and is thus omitted for clarity.

SSL_get_verify_result is another API function that we will employ in our post-connection check. This function returns the error code last generated by the verification routines. If no error has occurred, X509_V_OK is returned. We should call this function and make sure the returned value equals X509_V_OK. When browsing the example application, it is obvious that robust error handling has been left out for clarity. For example, the programs simply exit when an error occurs. In most cases, we will want to do something better to handle errors in some application-specific way. Checking the verify result is always a good idea. It makes an assertion that no matter what error handling occurred up to this point, if the result isn't OK now, we should disconnect.

Example 5-8 shows a function that performs the checks that we've just described. In the example, we'll check to be sure that the certificate contains the FQDN of the peer to which we expect to be connecting. For the client, we'll want to make sure that the server presents a certificate that contains the FQDN of the server's address. Likewise, for the server, we'll want to make sure that the client presents a certificate that contains the FQDN of the client's address. In this case, our checking of the client certificate will be very strict because we'll be expecting the client to be using a specific FQDN, and we'll allow only that one. For the purposes of our example client and server, this function should appear in common.c and be prototyped in common.h.
Example 5-8. A function to do post-connection assertions (implemented in common.c and prototyped in common.h)

Code View: Scroll / Show All

long post_connection_check(SSL *ssl, char *host)
{
    X509      *cert;
    X509_NAME *subj;
    char      data[256];
    int       extcount;
    int       ok = 0;
 
    /* Checking the return from SSL_get_peer_certificate here is not strictly
     * necessary.  With our example programs, it is not possible for it to return
     * NULL.  However, it is good form to check the return since it can return NULL
     * if the examples are modified to enable anonymous ciphers or for the server
     * to not require a client certificate.
     */
    if (!(cert = SSL_get_peer_certificate(ssl)) || !host)
        goto err_occured;
    if ((extcount = X509_get_ext_count(cert)) > 0)
    {
        int i;
 
        for (i = 0;  i < extcount;  i++)
        {
            char              *extstr;
            X509_EXTENSION    *ext;
 
            ext = X509_get_ext(cert, i);
            extstr = OBJ_nid2sn(OBJ_obj2nid(X509_EXTENSION_get_object(ext)));
 
            if (!strcmp(extstr, "subjectAltName"))
            {
                int                  j;
                unsigned char        *data;
                STACK_OF(CONF_VALUE) *val;
                CONF_VALUE           *nval;
                X509V3_EXT_METHOD    *meth;
 
                if (!(meth = X509V3_EXT_get(ext)))
                    break;
                data = ext->value->data;
 
                val = meth->i2v(meth, 
                                meth->d2i(NULL, &data, ext->value->length),
                                NULL);
                for (j = 0;  j < sk_CONF_VALUE_num(val);  j++)
                {
                    nval = sk_CONF_VALUE_value(val, j);
                    if (!strcmp(nval->name, "DNS") && !strcmp(nval->value, host))
                    {
                        ok = 1;
                        break;
                    }
                }
            }
            if (ok)
                break;
        }
    }
 
    if (!ok && (subj = X509_get_subject_name(cert)) &&
        X509_NAME_get_text_by_NID(subj, NID_commonName, data, 256) > 0)
    {
        data[255] = 0;
        if (strcasecmp(data, host) != 0)
            goto err_occured;
    }
 
    X509_free(cert);
    return SSL_get_verify_result(ssl);
 
err_occured:
    if (cert)
        X509_free(cert);
    return X509_V_ERR_APPLICATION_VERIFICATION;
}

					  


At a high level, the function post_connection_check is implemented as a wrapper around SSL_get_verify_result, which performs our extra peer certificate checks. It uses the reserved error code X509_V_ERR_APPLICATION_VERIFICATION to indicate errors where there is no peer certificate present or the certificate presented does not match the expected FQDN. This function will return an error in the following circumstances:

    *

      If no peer certificate is found
    *

      If it is called with a NULL second argument, i.e., if no FQDN is specified to compare against
    *

      If the dNSName fields found (if any) do not match the host argument and the commonName also doesn't match the host argument (if found)
    *

      Any time the SSL_get_verify_result routine returns an error 

As long as none of the above errors occurs, the value X509_V_OK will be returned. Our example programs are further extended below to employ this function.

Unfortunately, the code to check the dNSName is not very clear. We use the X509 functions to access the extensions. We then iterate through the extensions and use the extension-specific parsing routines to find all extensions that are subjectAltName fields. Since a subjectAltName field may itself contain several fields, we must then iterate through those fields to find any dNSName fields (they are tagged with the short name DNS). Since it is rather confusing, we will step through this function to explain its behavior. Having a stronger understanding of some of the more advanced programming techniques presented in Chapter 10 will help demystify the implementation of this function.

At the onset, we simply get the peer certificate from the SSL object. If the function X509_get_ext_count returns a positive number, we know there are some X.509v3 extensions present in the peer's certificate. Given this, we iterate over the extensions to look for a subjectAltName. The function X509_get_ext will retrieve an extension for us based on the counter. We also use the variable extstr to hold the extracted short name of the extension. Unfortunately, we must use three functions to perform this task: the innermost extracts the ASN1_OBJECT, the next fetches the NID, and the outermost function gets the short name as a const char * from the NID.

Next, we check if the extension is what we're looking for by comparing the short name against the string constant subjectAltName. Once we're sure it's the right extension, we need to extract the X509V3_EXT_METHOD object from the extension. This object is a container of extension-specific functions for manipulating the data within the extension. We access the data we wish to manipulate directly through the value member of the X509_EXTENSION structure. The d2i and i2v functions serve the purpose of converting the raw data in the subjectAltName to a stack of CONF_VALUE objects. This is necessary to make it simple to iterate over the several kinds of fields in the subjectAltName so that we may find the dNSName field(s). We check each member of this CONF_VALUE stack to see if we have a match for the host string in a dNSName field. Keep in mind that the dNSName field is named DNS in the extension itself, since it's referenced by its short name. As soon as we find a match, we stop the iterations over all the extensions.

We only pursue checking the commonName of the certificate if no match is found in a dNSName field. If we fail to find an FQDN that matches the host argument in either the dNSName field or the commonName, we return the code for an application-specific error. In most real-world cases, matching one specific FQDN is not desirable. Most often, a server would have a list (known as a whitelist) that contains all of the acceptable FQDNs for connecting clients. If the client's certificate contains an FQDN that appears on this list, the certificate is accepted; otherwise, it is rejected.
```

#### 6.1.1.1.3.6 Further extension of the examples

```text
Employing what we know about verifying the authenticity of the peer, we can extend our example applications to make them one step closer to being secure. For these examples, we've added the functions verify_callback and post_connection_check to common.c and their prototypes to common.h.

The code for our revised client application, client2.c, is provided in Example 5-9. The lines that differ from client1.c are marked. Line 3 defines the file we use to store trusted certificates. We define CADIR to be NULL on line 4 since we will use a flat file instead. Nothing prevents us from specifying both a file and a directory; but in this case, we do not need a directory.
Example 5-9. client2.c

Code View: Scroll / Show All

  1  #include "common.h"
  2   
  3  #define CAFILE "root.pem"
  4  #define CADIR NULL
  5  #define CERTFILE "client.pem"
  6  SSL_CTX *setup_client_ctx(void)
  7  {
  8      SSL_CTX *ctx;
  9   
 10      ctx = SSL_CTX_new(SSLv23_method(  ));
 11      if (SSL_CTX_load_verify_locations(ctx, CAFILE, CADIR) != 1)
 12          int_error("Error loading CA file and/or directory");
 13      if (SSL_CTX_set_default_verify_paths(ctx) != 1)
 14          int_error("Error loading default CA file and/or directory");
 15      if (SSL_CTX_use_certificate_chain_file(ctx, CERTFILE) != 1)
 16          int_error("Error loading certificate from file");
 17      if (SSL_CTX_use_PrivateKey_file(ctx, CERTFILE, SSL_FILETYPE_PEM) != 1)
 18          int_error("Error loading private key from file");
 19      SSL_CTX_set_verify(ctx, SSL_VERIFY_PEER, verify_callback);
 20      SSL_CTX_set_verify_depth(ctx, 4);
 21      return ctx;
 22  }
 23   
 24  int do_client_loop(SSL *ssl)
 25  {
 26      int  err, nwritten;
 27      char buf[80];
 28   
 29      for (;;)
 30      {
 31          if (!fgets(buf, sizeof(buf), stdin))
 32              break;
 33          for (nwritten = 0;  nwritten < sizeof(buf);  nwritten += err)
 34          {
 35              err = SSL_write(ssl, buf + nwritten, strlen(buf) - nwritten);
 36              if (err <= 0)
 37                  return 0;
 38          }
 39      }
 40      return 1;
 41  }
 42   
 43  int main(int argc, char *argv[])
 44  {
 45      BIO     *conn;
 46      SSL     *ssl;
 47      SSL_CTX *ctx;
 48      long    err;
 49  
 50      init_OpenSSL(  );
 51      seed_prng(  );
 52   
 53      ctx = setup_client_ctx(  );
 54   
 55      conn = BIO_new_connect(SERVER ":" PORT);
 56      if (!conn)
 57          int_error("Error creating connection BIO");
 58   
 59      if (BIO_do_connect(conn) <= 0)
 60          int_error("Error connecting to remote machine");
 61   
 62      ssl = SSL_new(ctx);
 63      SSL_set_bio(ssl, conn, conn);
 64      if (SSL_connect(ssl) <= 0)
 65          int_error("Error connecting SSL object");
 66      if ((err = post_connection_check(ssl, SERVER)) != X509_V_OK)
 67      {
 68          fprintf(stderr, "-Error: peer certificate: %s\n",
 69                  X509_verify_cert_error_string(err));
 70          int_error("Error checking SSL object after connection");
 71      }
 72      fprintf(stderr, "SSL Connection opened\n");
 73      if (do_client_loop(ssl))
 74          SSL_shutdown(ssl);
 75      else
 76          SSL_clear(ssl);
 77      fprintf(stderr, "SSL Connection closed\n");
 78   
 79      SSL_free(ssl);
 80      SSL_CTX_free(ctx);
 81      return 0;
 82  }

					  


To load the trusted certificates from root.pem, we call SSL_CTX_load_verify_locations on line 11 and check for errors. Since we trust the users of the system on which this client will run, we also call SSL_CTX_set_default_verify_paths to load the built-in certificate stores. Our example does not explicitly require the loading of the default locations; it is included for illustration. It is good design practice to load these defaults only when the application will run on a trusted system and when the application itself needs to incorporate these extra certificates.

After loading the trusted certificates, we set the verification mode to SSL_VERIFY_PEER and assign the callback (line 19). When implementing SSL clients, the verification mode should always include SSL_VERIFY_PEER. Without this, we could never tell if the server we connect with is properly authenticated. As we discussed in the section above, the verify_callback function simply reports errors in more detail and does not change the behavior of the internal verification process. The following line, line 20, sets the maximum depth for verification to four. For this client example, four levels of verification ought to be plenty because our certificate hierarchy is not too complex. Given the details from the previous sidebar describing our example PKI, the minimum depth we can assign to our client is two, since the server's certificate is signed by the server CA, which, in turn, is signed by the root CA that we trust.

The last major change to this version of the client is in lines 66-71. These lines use the post_connection_check function that we developed in Example 5-8. This call asserts that the server we are connected with did present a certificate and the certificate it provided has "splat.zork.org" as the FQDN. If any errors occur, we can call X509_verify_cert_error_string to convert our error code into a string to print to the console.

Example 5-10 shows the contents of server2.c, our example server program. The changes made to it are congruent with the changes made to the client application.
Example 5-10. server2.c

Code View: Scroll / Show All

  1  #include "common.h"
  2   
  3  #define CAFILE "root.pem"
  4  #define CADIR NULL
  5  #define CERTFILE "server.pem"
  6  SSL_CTX *setup_server_ctx(void)
  7  {
  8      SSL_CTX *ctx;
  9   
 10      ctx = SSL_CTX_new(SSLv23_method(  ));
 11      if (SSL_CTX_load_verify_locations(ctx, CAFILE, CADIR) != 1)
 12          int_error("Error loading CA file and/or directory");
 13      if (SSL_CTX_set_default_verify_paths(ctx) != 1)
 14          int_error("Error loading default CA file and/or directory");
 15      if (SSL_CTX_use_certificate_chain_file(ctx, CERTFILE) != 1)
 16          int_error("Error loading certificate from file");
 17      if (SSL_CTX_use_PrivateKey_file(ctx, CERTFILE, SSL_FILETYPE_PEM) != 1)
 18          int_error("Error loading private key from file");
 19      SSL_CTX_set_verify(ctx, SSL_VERIFY_PEER|SSL_VERIFY_FAIL_IF_NO_PEER_CERT,
 20                         verify_callback);
 21      SSL_CTX_set_verify_depth(ctx, 4);
 22      return ctx;
 23  }
 24   
 25  int do_server_loop(SSL *ssl)
 26  {
 27      int  err, nread;
 28      char buf[80];
 29   
 30      for (;;)
 31      {
 32          for (nread = 0;  nread < sizeof(buf);  nread += err)
 33          {
 34              err = SSL_read(ssl, buf + nread, sizeof(buf) - nread);
 35              if (err <= 0)
 36                  break;
 37          }
 38          fwrite(buf, 1, nread, stdout);
 39      }
 40      return (SSL_get_shutdown(ssl) & SSL_RECEIVED_SHUTDOWN) ? 1 : 0;
 41  }
 42   
 43  void THREAD_CC server_thread(void *arg)
 44  {
 45      SSL *ssl = (SSL *)arg;
 46  long err;
 47   
 48  #ifndef WIN32
 49      pthread_detach(pthread_self(  ));
 50  #endif
 51      if (SSL_accept(ssl) <= 0)
 52          int_error("Error accepting SSL connection");
 53      if ((err = post_connection_check(ssl, CLIENT)) != X509_V_OK)
 54      {
 55          fprintf(stderr, "-Error: peer certificate: %s\n",
 56                  X509_verify_cert_error_string(err));
 57          int_error("Error checking SSL object after connection");
 58      }
 59      fprintf(stderr, "SSL Connection opened\n");
 60      if (do_server_loop(ssl))
 61          SSL_shutdown(ssl);
 62      else
 63          SSL_clear(ssl);
 64      fprintf(stderr, "SSL Connection closed\n");
 65      SSL_free(ssl);
 66  ERR_remove_state(0)
 67  #ifdef WIN32
 68      _endthread(  );
 69  #endif
 70  }
 71   
 72  int main(int argc, char *argv[])
 73  {
 74      BIO     *acc, *client;
 75      SSL     *ssl;
 76      SSL_CTX *ctx;
 77   THREAD_TYPE tid;
 78  
 79      init_OpenSSL(  );
 80      seed_prng(  );
 81   
 82      ctx = setup_server_ctx(  );
 83   
 84      acc = BIO_new_accept(PORT);
 85      if (!acc)
 86          int_error("Error creating server socket");
 87   
 88      if (BIO_do_accept(acc) <= 0)
 89          int_error("Error binding server socket");
 90   
 91      for (;;)
 92      {
 93          if (BIO_do_accept(acc) <= 0)
 94              int_error("Error accepting connection");
 95   
 96          client = BIO_pop(acc);
 97          if (!(ssl = SSL_new(ctx)))
 98          int_error("Error creating SSL context");
 99          SSL_set_accept_state(ssl);
100          SSL_set_bio(ssl, client, client);
101          THREAD_create(tid, server_thread, ssl);
102      }
103   
104      SSL_CTX_free(ctx);
105      BIO_free(acc);
106      return 0;
107  }

					  


One way the changes to the server stray from the changes to the client is in the verification mode. In server applications, the behavior of SSL_VERIFY_PEER is slightly different; it causes the server to solicit a certificate from the client. The other verification flag used is SSL_VERIFY_FAIL_IF_NO_PEER_CERT. This flag instructs the server to fail on the handshake if the client presents no certificate.

	

The choice of whether to require a client to supply a certificate depends on the type of server application you're building. In many cases, requiring a client certificate may not be strictly necessary, but it's generally a bad idea to request a certificate without requiring one because it may often cause a client to present the user with a prompt to select the certificate to use. Particularly in a web-based environment, this is not desirable. If you need to require a certificate only for specific commands or options, it's better to force a renegotiation instead.

The client's usage of the SERVER-defined value and the server's usage of CLIENT is an oversimplification. In many cases, especially with that of a server, the string containing the peer's FQDN will not be so readily available. Instead, we may need to look at the IP address to which we are connected and use it to discover the FQDN. For purposes of clarity, this process was omitted, and the names were hardcoded. Additionally, when verifying peer certificates, the owner will often not be a machine with a FQDN but rather a person, organization, etc. For these cases, it's important to change the post_connection_check routine accordingly to allow for successful connections.

Using the tricks we learned in this step, we have now developed a viable framework for verifying a peer and assuring authentication is done properly. The majority of the battle to SSL-enable our application is over; however, we still have one more step.
```

#### 6.1.1.1.4 Step 3: SSL Options and Cipher Suites

```text
We have not yet discussed a few important points about SSL connections. For instance, we mentioned that SSLv2 shouldn't be used, yet our example was created with the SSLv23_method that still allows for this insecure protocol version. Beyond protocol limitation, OpenSSL provides for many workarounds for known bugs in other SSL implementations. While these bugs don't affect security, our application may lose interoperability if we do not account for them.

Additionally, we need to delve into the selection of cipher suites. A cipher suite is a combination of lower-level algorithms that an SSL connection uses to do authentication, key exchange, and stream encryption. Suite selection is important because OpenSSL supports some algorithms for compatibility that we want to exclude for security reasons. Similarly, some of the cipher suites that are secure require an application to provide callbacks in order to be utilized. Learning how to do these things properly and extending our example for this final step will be the topic of this section.
```

#### 6.1.1.1.4.1 Setting SSL options

```text
The SSL_CTX_set_options function provides the developer with finer-grained control over the SSL connections spawned from the context. Using this function, we can enable the bug workarounds built into the OpenSSL library. For instance, a particular version of a Netscape product (Netscape-Commerce 1.12) will truncate the material used for key generation. In order for our SSL programs to establish a connection to a peer with such a bug, we need to enable the workaround. These fixes are useful only to programs that will communicate with a peer known to have bugs, but enabling the workarounds does not hurt anything as a rule. These bug fixes can be enabled individually, but instead we should set the SSL_OP_ALL flag, which will enable all of the workaround code.

Like the function SSL_CTX_set_verify, the second parameter to this function is a set of flags. Again, the flags can be combined with the logical OR operation. An important fact about this call is that once an option is set, it can't be cleared: this function only adds the options presented by the second argument to the options set contained in the SSL_CTX object. The new set of options is returned by this function.

In addition to the workarounds for buggy SSL peers, this function allows us to tighten the security of our SSL connections. By setting the option SSL_OP_NO_SSLv2, we prevent the SSLv2 protocol from being used. As we noted in Step 1, this is a very useful feature. Using this option, we can create an SSL_CTX object based on the compatibility method, SSLv23_method, and the context will not allow SSLv2 peers. This is useful since electing to base our context upon either SSLv3_method or TLSv1_method would prevent the other from connecting correctly.

Two server-side-only options that bear consideration are SSL_OP_EPHEMERAL_RSA and SSL_OP_SINGLE_DH_USE. The former causes our context object to attempt to use a temporary RSA key for the key exchange. The details of this process are discussed below, but generally, this option should never be used, since it violates the SSL/TLS protocol specification. We discuss the SSL_OP_SINGLE_DH_USE flag in the next section.
```

#### 6.1.1.1.4.2 Ephemeral keying

```text
In our examples thus far, both the server and the client certificates have been based on RSA key pairs. Because the RSA algorithm can be used for most signing and encrypting, SSL uses it to perform the key agreement necessary to create the shared key under which the data in the stream is encrypted. This technique, such as when the key exchange is conducted through a persistent key, is called static keying. Building on this definition, ephemeral keying is defined as key exchange through a temporary key. At first, it may seem that temporary keys may not allow for proper authentication—not true. Generally, with ephemeral keying, the authentication is accomplished through signature verification with persistent keys, and the temporary keys are used only for key agreement. There are two main advantages of ephemeral keying over static keying from a security perspective.

We've said that our example uses RSA keys in the certificates, but consider a case in which the certificates are based upon DSA keys. The DSA algorithm provides a mechanism for signing but not for encrypting. Thus, having only DSA keys on either side of an SSL connection leaves the protocol unable to perform key exchange. It follows that static keying is not even an option for DSA-based certificates; we must supplement them with ephemeral keys.

The second advantage of using temporary keys is that they provide forward secrecy. At a high level, forward secrecy means that if the private key is obtained by a third party, that third party will not be able to decode previous sessions conducted with that key or even future sessions conducted by someone else with the compromised key. This is due to the ephemeral keys used for the secrecy of the sessions. When using static keys, there is no forward secrecy since the secrecy of the key exchange, and hence the following transmission stream, is based on the private key. With an ephemeral key, the data on which the key exchange was performed no longer exists after the key exchange, and thus the session remains private regardless of private key compromise. Thus, forward secrecy means that private key compromise will only allow an attacker to masquerade as the key owner, but not access the key owner's private data.

These two points make the benefits of using ephemeral keying clear. In the case of DSA certificates, it's necessary for the protocol to succeed, and in the case of RSA certificates, it affords us forward secrecy. In terms of SSL, using ephemeral keys essentially mandates that the keys embedded in the certificates shall be used only for signatures and not for encryption. Understanding this, it seems as though we've left a hole in the protocol since we do not have a method for key exchange. OpenSSL provides two options: temporary RSA keys or Diffie-Hellman (DH) key agreement. Of these two choices, DH is better because temporary RSA keys violate the SSL/TLS protocols. The RSA keying was originally implemented to make sure export restrictions on cryptography were not violated.[1] Today, this issue is not a primary concern; thus, ephemeral RSA keys tend not to be used. Additionally, generation of these temporary RSA keys is much slower than using DH, presuming the DH parameters are pre-generated.

    [1] Export restrictions once required weak RSA keys for encryption, but stronger keys were acceptable for signing.

In order to allow OpenSSL to use ephemeral Diffie-Hellman (EDH), we must set up the server-side SSL_CTX object properly. Providing DH parameters directly or, alternatively, a callback that returns the DH parameters accomplishes this goal. The function SSL_CTX_set_tmp_dh sets the DH parameters for a context, while the function SSL_CTX_set_tmp_dh_callback sets the callback. Since the callback mechanism subsumes the functionality of the former method, applications should provide only the callback. The callback function has the following signature:

DH *tmp_dh_callback(SSL *ssl, int is_export, int keylength);


The first argument to the callback is the SSL object representing the connection on which the parameters will be used. The second argument indicates whether an export-restricted cipher is being used; the argument value is nonzero, and zero otherwise. The main advantage of the callback is its ability to provide different functionality based on the third parameter, the key size. The DH parameters returned should have a key size equal to the last argument's value. Below, our server application is extended with a fully functional callback. The server application in its final form shows an implementation of this callback.

We've deferred discussion of the SSL option SSL_OP_SINGLE_DH_USE to this point. Some of the details from Chapter 8 will be helpful in understanding the impact of this option. Essentially, DH parameters are public information. A private key is generated and used for the key exchange from these parameters. Setting this option causes the server to generate a new private key for each new connection. In the end, setting this option provides better security at the cost of more computational power to make new connections. Unless there are special processor usage considerations, we should enable this option.
```

#### 6.1.1.1.4.3 Cipher suite selection

```text
A cipher suite is a set of algorithms that SSL uses to secure a connection. In order to make a suite, we need to provide algorithms for four functions: signing/authentication, key exchange, cryptographic hashing, and encrypting/decrypting. Keep in mind that some algorithms can serve multiple purposes. For example, RSA can be used for signing and for key exchange.

OpenSSL implements a variety of algorithms and cipher suites when it comes to SSL connections. When designing secure applications, it is essential that algorithms having known security vulnerabilities not be allowed.

The SSL_CTX_set_cipher_list function allows us to set the list of cipher suites that we authorize our SSL objects to use. The list of ciphers is specified by a specially formatted string. This string is a colon-delimited list of algorithms. Given the number of possible combinations, specifying all the acceptable ones explicitly would be quite cumbersome. OpenSSL allows for several keywords in the list, which are shortcuts for sets of ciphers. For instance, "ALL" is a shortcut for every available combination. Additionally, we can precede a keyword with the "!" operator to remove all ciphers associated with the keyword from the list. Using this, we will create a string to define our custom cipher list. There are other operators such as "+" or "-", but they are not essential for specifying a secure list. For applications that need a custom definition, the ciphers manpage is a good reference on string formation.

SSL allows the use of anonymous ciphers. Anonymous ciphers allow the SSL connection to succeed without proper authentication of the peer by using the DH algorithm. In almost all circumstances, we want to block these ciphers; they are identified by the "ADH" keyword. In addition to suites that do not allow us to authenticate properly, we want to block low-security algorithms. The "LOW" keyword refers to ciphers that use a key of 64 bits or 56 bits without export crippling. Accordingly, the "EXP" keyword marks the ciphers that are export-crippled to 56 or 40 bits. Finally, we should block algorithms that have known weaknesses, e.g., "MD5".

We can also use the special keyword " @STRENGTH". Using this indicates that the list of cipher suites should be sorted by their strength (their key size) in order of highest to lowest. Employing this keyword causes our SSL connections to attempt to select the most secure suite possible, and if necessary, back off to the next most secure, and so on down the list. This keyword should be specified last on the list.
```

#### 6.1.1.1.4.4 The final product

```text
Using our knowledge of SSL options, ephemeral keying, and cipher suite selection, we will implement the last step necessary to make our examples fully SSL-enabled, secure applications. After looking at the code for the client and server, we will discuss some of the simplifications that our applications employ.

Example 5-11 contains the code for client3.c, the final client application. Because the only changes we're making are to the setup_client_ctx function, we truncated the example to only the contents of the source file up to and including that function.
Example 5-11. client3.c

Code View: Scroll / Show All

  1  include "common.h"
  2   
  3  #define CIPHER_LIST "ALL:!ADH:!LOW:!EXP:!MD5:@STRENGTH"
  4  #define CAFILE "root.pem"
  5  #define CADIR NULL
  6  #define CERTFILE "client.pem"
  7  SSL_CTX *setup_client_ctx(void)
  8  {
  9      SSL_CTX *ctx;
 10   
 11      ctx = SSL_CTX_new(SSLv23_method(  ));
 12      if (SSL_CTX_load_verify_locations(ctx, CAFILE, CADIR) != 1)
 13          int_error("Error loading CA file and/or directory");
 14      if (SSL_CTX_set_default_verify_paths(ctx) != 1)
 15          int_error("Error loading default CA file and/or directory");
 16      if (SSL_CTX_use_certificate_chain_file(ctx, CERTFILE) != 1)
 17          int_error("Error loading certificate from file");
 18      if (SSL_CTX_use_PrivateKey_file(ctx, CERTFILE, SSL_FILETYPE_PEM) != 1)
 19          int_error("Error loading private key from file");
 20      SSL_CTX_set_verify(ctx, SSL_VERIFY_PEER, verify_callback);
 21      SSL_CTX_set_verify_depth(ctx, 4);
 22      SSL_CTX_set_options(ctx, SSL_OP_ALL|SSL_OP_NO_SSLv2);
 23      if (SSL_CTX_set_cipher_list(ctx, CIPHER_LIST) != 1)
 24          int_error("Error setting cipher list (no valid ciphers)");
 25      return ctx;
 26  }

					  


Line 3 contains a definition of the cipher list we discussed in the previous section. Translated to plain terms, the list is composed of all cipher suites in order of strength except those containing anonymous DH ciphers, low bit-size ciphers, export-crippled ciphers, or the MD5 hash algorithm.

As discussed at the beginning of this step, we enable all bug workarounds and disable SSL Version 2 with the call on line 22. Finally, lines 23-24 actually load our cipher list into the SSL_CTX object.

The server application appears in Example 5-12. We've made significantly more changes than in the client, but most of our changes are the addition of new functions that are used only by the SSL context setup function. We've similarly truncated the source listing for the server example.
Example 5-12. server3.c

Code View: Scroll / Show All

  1  #include "common.h"
  2   
  3  DH *dh512 = NULL;
  4  DH *dh1024 = NULL;
  5  
  6  void init_dhparams(void)
  7  {
  8      BIO *bio;
  9  
 10      bio = BIO_new_file("dh512.pem", "r");
 11      if (!bio)
 12          int_error("Error opening file dh512.pem");
 13      dh512 = PEM_read_bio_DHparams(bio, NULL, NULL, NULL);
 14      if (!dh512)
 15          int_error("Error reading DH parameters from dh512.pem");
 16      BIO_free(bio);
 17  
 18      bio = BIO_new_file("dh1024.pem", "r");
 19      if (!bio)
 20          int_error("Error opening file dh1024.pem");
 21      dh1024 = PEM_read_bio_DHparams(bio, NULL, NULL, NULL);
 22      if (!dh1024)
 23          int_error("Error reading DH parameters from dh1024.pem");
 24      BIO_free(bio);
 25  }
 26  
 27  DH *tmp_dh_callback(SSL *ssl, int is_export, int keylength)
 28  {
 29      DH *ret;
 30  
 31      if (!dh512 || !dh1024)
 32          init_dhparams(  );
 33  
 34      switch (keylength)
 35      {
 36          case 512:
 37              ret = dh512;
 38              break;
 39          case 1024:
 40          default: /* generating DH params is too costly to do on the fly */
 41              ret = dh1024;
 42              break;
 43      }
 44      return ret;
 45  }
 46  
 47  #define CIPHER_LIST "ALL:!ADH:!LOW:!EXP:!MD5:@STRENGTH"
 48  #define CAFILE "root.pem"
 49  #define CADIR NULL
 50  #define CERTFILE "server.pem"
 51  SSL_CTX *setup_server_ctx(void)
 52  {
 53      SSL_CTX *ctx;
 54   
 55      ctx = SSL_CTX_new(SSLv23_method(  ));
 56      if (SSL_CTX_load_verify_locations(ctx, CAFILE, CADIR) != 1)
 57          int_error("Error loading CA file and/or directory");
 58      if (SSL_CTX_set_default_verify_paths(ctx) != 1)
 59          int_error("Error loading default CA file and/or directory");
 60      if (SSL_CTX_use_certificate_chain_file(ctx, CERTFILE) != 1)
 61          int_error("Error loading certificate from file");
 62      if (SSL_CTX_use_PrivateKey_file(ctx, CERTFILE, SSL_FILETYPE_PEM) != 1)
 63          int_error("Error loading private key from file");
 64      SSL_CTX_set_verify(ctx, SSL_VERIFY_PEER|SSL_VERIFY_FAIL_IF_NO_PEER_CERT,
 65                         verify_callback);
 66      SSL_CTX_set_verify_depth(ctx, 4);
 67      SSL_CTX_set_options(ctx, SSL_OP_ALL | SSL_OP_NO_SSLv2 |
 68                               SSL_OP_SINGLE_DH_USE);
 69      SSL_CTX_set_tmp_dh_callback(ctx, tmp_dh_callback);
 70      if (SSL_CTX_set_cipher_list(ctx, CIPHER_LIST) != 1)
 71          int_error("Error setting cipher list (no valid ciphers)");
 72      return ctx;
 73  }

					  


The most obvious change to this file is the addition of the functions init_dhparams and tmp_dh_callback. The initializing function reads the DH parameters from the files dh512.pem and dh1024.pem and loads them into the global parameters. The callback function simply switches on the required key size and returns either a 512-bit DH parameter set or a 1,024-bit set. This function intentionally does not try to perform any on-the-fly generation of parameters because it is simply too computationally expensive to be worthwhile.

The only other changes to the server not done to the client, aside from the call on line 60 to set the callback, is the inclusion of the SSL option SSL_OP_SINGLE_DH_USE. As discussed earlier, this causes the private part of the DH key exchange to be recomputed for each client connecting.
```

#### 6.1.1.1.4.5 Beyond the example

```text
For purposes of clarity in the example code, we have avoided several serious considerations for real applications. The most obvious is error handling. Our examples simply exit if errors of any kind occur. For most applications, extension of the example to more robustly handle errors is application-specific. While specific functions may return different error codes, OpenSSL functions and macros will generally return 1 on success; thus, implementing better error handling should be straightforward.

In addition, the examples we've built do two-way authentication. When making a new client and server application, this should always be done. However, when making applications that are meant to connect with other SSL peers, such as a web server, we should take into account that the stringent security requirements of our example are not always desirable. For instance, to entirely remove client authentication from a server, we simply need to remove the calls that load the verify locations, the call to set the verify mode, and the call to the post-connection verification routine. This isn't the best approach, though. When making such compatibility-first applications, we need to try to incorporate as much security as possible. For instance, instead of removing all of the verification calls, we could still load the verification locations and request a peer certificate with the SSL option SSL_VERIFY_PEER. We can, however, omit the SSL_VERIFY_FAIL_IF_NO_PEER_CERT option and modify the post-connection verification so that if the client does present a certificate, we go on with high security. If the client does not present the server with a certificate, the condition and associated information can be logged so that we can keep track of unauthenticated connections.

Another point we avoided was the password callback for the encrypted private key for the certificate. For most server applications, common practice is to leave the private key in a file that isn't encrypted so that the application can start up and stop without user input. This convention, born of simplicity of implementation, can easily be subverted. When doing something like this, it is essential that we make sure users on the machine do not have read permission on the private key file; ideally, the file will also be owned by the root or administrator user so that the likelihood of compromise is further reduced. For most client applications, tying the encryption passphrase to the user should not be a problem.

DSA parameters can be converted to DH parameters. This method is often utilized since the computational power necessary to generate the DSA parameters is smaller. Often, parameters generated in this fashion are used for ephemeral DH parameters. Without having to get into the mathematics behind the algorithms, the SSL option SSL_OP_SINGLE_DH_USE should always be used in these cases. Without it, applications are susceptible to a subtle attack.

A large flaw of our example programs is their handling of I/O on SSL connections. The examples rely on blocking I/O operations. For most real applications, this is unacceptable. In the following section, we broach the important topic of non-blocking I/O on SSL connections. We have also neglected to consider renegotiations (requesting that a handshake be performed during an already established connection) on SSL connections and their impact on I/O. While this should occur automatically when the peer requests it, the I/O routines must be robust enough to handle its subtle impacts. In the next section, we begin by addressing server efficiency with respect to session caching and then move into a more in-depth look at I/O paradigms. 

				6.1.1.1.5
			6.1.1.2
```

### 6.1.2 Customize verify peer certificate

#### 6.1.2.1 https://www.openssl.org/docs/man1.0.1/ssl/SSL_CTX_set_verify.html

```text
SSL_CTX_set_verify

NAME

SSL_CTX_set_verify, SSL_set_verify, SSL_CTX_set_verify_depth, SSL_set_verify_depth - set peer certificate verification parameters

SYNOPSIS

 #include <openssl/ssl.h>

 void SSL_CTX_set_verify(SSL_CTX *ctx, int mode,
                         int (*verify_callback)(int, X509_STORE_CTX *));
 void SSL_set_verify(SSL *s, int mode,
                     int (*verify_callback)(int, X509_STORE_CTX *));
 void SSL_CTX_set_verify_depth(SSL_CTX *ctx,int depth);
 void SSL_set_verify_depth(SSL *s, int depth);

 int verify_callback(int preverify_ok, X509_STORE_CTX *x509_ctx);
DESCRIPTION

SSL_CTX_set_verify() sets the verification flags for ctx to be mode and specifies the verify_callback function to be used. If no callback function shall be specified, the NULL pointer can be used for verify_callback.

SSL_set_verify() sets the verification flags for ssl to be mode and specifies the verify_callback function to be used. If no callback function shall be specified, the NULL pointer can be used for verify_callback. In this case last verify_callback set specifically for this ssl remains. If no special callback was set before, the default callback for the underlying ctx is used, that was valid at the time ssl was created with SSL_new.

SSL_CTX_set_verify_depth() sets the maximum depth for the certificate chain verification that shall be allowed for ctx. (See the BUGS section.)

SSL_set_verify_depth() sets the maximum depth for the certificate chain verification that shall be allowed for ssl. (See the BUGS section.)

NOTES

The verification of certificates can be controlled by a set of logically or'ed mode flags:

SSL_VERIFY_NONE
Server mode: the server will not send a client certificate request to the client, so the client will not send a certificate.

Client mode: if not using an anonymous cipher (by default disabled), the server will send a certificate which will be checked. The result of the certificate verification process can be checked after the TLS/SSL handshake using the SSL_get_verify_result function. The handshake will be continued regardless of the verification result.

SSL_VERIFY_PEER
Server mode: the server sends a client certificate request to the client. The certificate returned (if any) is checked. If the verification process fails, the TLS/SSL handshake is immediately terminated with an alert message containing the reason for the verification failure. The behaviour can be controlled by the additional SSL_VERIFY_FAIL_IF_NO_PEER_CERT and SSL_VERIFY_CLIENT_ONCE flags.

Client mode: the server certificate is verified. If the verification process fails, the TLS/SSL handshake is immediately terminated with an alert message containing the reason for the verification failure. If no server certificate is sent, because an anonymous cipher is used, SSL_VERIFY_PEER is ignored.

SSL_VERIFY_FAIL_IF_NO_PEER_CERT
Server mode: if the client did not return a certificate, the TLS/SSL handshake is immediately terminated with a "handshake failure" alert. This flag must be used together with SSL_VERIFY_PEER.

Client mode: ignored

SSL_VERIFY_CLIENT_ONCE
Server mode: only request a client certificate on the initial TLS/SSL handshake. Do not ask for a client certificate again in case of a renegotiation. This flag must be used together with SSL_VERIFY_PEER.

Client mode: ignored

Exactly one of the mode flags SSL_VERIFY_NONE and SSL_VERIFY_PEER must be set at any time.

The actual verification procedure is performed either using the built-in verification procedure or using another application provided verification function set with SSL_CTX_set_cert_verify_callback. The following descriptions apply in the case of the built-in procedure. An application provided procedure also has access to the verify depth information and the verify_callback() function, but the way this information is used may be different.

SSL_CTX_set_verify_depth() and SSL_set_verify_depth() set the limit up to which depth certificates in a chain are used during the verification procedure. If the certificate chain is longer than allowed, the certificates above the limit are ignored. Error messages are generated as if these certificates would not be present, most likely a X509_V_ERR_UNABLE_TO_GET_ISSUER_CERT_LOCALLY will be issued. The depth count is "level 0:peer certificate", "level 1: CA certificate", "level 2: higher level CA certificate", and so on. Setting the maximum depth to 2 allows the levels 0, 1, and 2. The default depth limit is 100, allowing for the peer certificate and additional 100 CA certificates.

The verify_callback function is used to control the behaviour when the SSL_VERIFY_PEER flag is set. It must be supplied by the application and receives two arguments: preverify_ok indicates, whether the verification of the certificate in question was passed (preverify_ok=1) or not (preverify_ok=0). x509_ctx is a pointer to the complete context used for the certificate chain verification.

The certificate chain is checked starting with the deepest nesting level (the root CA certificate) and worked upward to the peer's certificate. At each level signatures and issuer attributes are checked. Whenever a verification error is found, the error number is stored in x509_ctx and verify_callback is called with preverify_ok=0. By applying X509_CTX_store_* functions verify_callback can locate the certificate in question and perform additional steps (see EXAMPLES). If no error is found for a certificate, verify_callback is called with preverify_ok=1 before advancing to the next level.

The return value of verify_callback controls the strategy of the further verification process. If verify_callback returns 0, the verification process is immediately stopped with "verification failed" state. If SSL_VERIFY_PEER is set, a verification failure alert is sent to the peer and the TLS/SSL handshake is terminated. If verify_callback returns 1, the verification process is continued. If verify_callback always returns 1, the TLS/SSL handshake will not be terminated with respect to verification failures and the connection will be established. The calling process can however retrieve the error code of the last verification error using SSL_get_verify_result or by maintaining its own error storage managed by verify_callback.

If no verify_callback is specified, the default callback will be used. Its return value is identical to preverify_ok, so that any verification failure will lead to a termination of the TLS/SSL handshake with an alert message, if SSL_VERIFY_PEER is set.

BUGS

In client mode, it is not checked whether the SSL_VERIFY_PEER flag is set, but whether SSL_VERIFY_NONE is not set. This can lead to unexpected behaviour, if the SSL_VERIFY_PEER and SSL_VERIFY_NONE are not used as required (exactly one must be set at any time).

The certificate verification depth set with SSL[_CTX]_verify_depth() stops the verification at a certain depth. The error message produced will be that of an incomplete certificate chain and not X509_V_ERR_CERT_CHAIN_TOO_LONG as may be expected.

RETURN VALUES

The SSL*_set_verify*() functions do not provide diagnostic information.

EXAMPLES

The following code sequence realizes an example verify_callback function that will always continue the TLS/SSL handshake regardless of verification failure, if wished. The callback realizes a verification depth limit with more informational output.

All verification errors are printed; information about the certificate chain is printed on request. The example is realized for a server that does allow but not require client certificates.

The example makes use of the ex_data technique to store application data into/retrieve application data from the SSL structure (see SSL_get_ex_new_index, SSL_get_ex_data_X509_STORE_CTX_idx).

 ...
 typedef struct {
   int verbose_mode;
   int verify_depth;
   int always_continue;
 } mydata_t;
 int mydata_index;
 ...
 static int verify_callback(int preverify_ok, X509_STORE_CTX *ctx)
 {
    char    buf[256];
    X509   *err_cert;
    int     err, depth;
    SSL    *ssl;
    mydata_t *mydata;

    err_cert = X509_STORE_CTX_get_current_cert(ctx);
    err = X509_STORE_CTX_get_error(ctx);
    depth = X509_STORE_CTX_get_error_depth(ctx);

    /*
     * Retrieve the pointer to the SSL of the connection currently treated
     * and the application specific data stored into the SSL object.
     */
    ssl = X509_STORE_CTX_get_ex_data(ctx, SSL_get_ex_data_X509_STORE_CTX_idx());
    mydata = SSL_get_ex_data(ssl, mydata_index);

    X509_NAME_oneline(X509_get_subject_name(err_cert), buf, 256);

    /*
     * Catch a too long certificate chain. The depth limit set using
     * SSL_CTX_set_verify_depth() is by purpose set to "limit+1" so
     * that whenever the "depth>verify_depth" condition is met, we
     * have violated the limit and want to log this error condition.
     * We must do it here, because the CHAIN_TOO_LONG error would not
     * be found explicitly; only errors introduced by cutting off the
     * additional certificates would be logged.
     */
    if (depth > mydata->verify_depth) {
        preverify_ok = 0;
        err = X509_V_ERR_CERT_CHAIN_TOO_LONG;
        X509_STORE_CTX_set_error(ctx, err);
    } 
    if (!preverify_ok) {
        printf("verify error:num=%d:%s:depth=%d:%s\n", err,
                 X509_verify_cert_error_string(err), depth, buf);
    }
    else if (mydata->verbose_mode)
    {
        printf("depth=%d:%s\n", depth, buf);
    }

    /*
     * At this point, err contains the last verification error. We can use
     * it for something special
     */
    if (!preverify_ok && (err == X509_V_ERR_UNABLE_TO_GET_ISSUER_CERT))
    {
      X509_NAME_oneline(X509_get_issuer_name(ctx->current_cert), buf, 256);
      printf("issuer= %s\n", buf);
    }

    if (mydata->always_continue)
      return 1;
    else
      return preverify_ok;
 }
 ...

 mydata_t mydata;

 ...
 mydata_index = SSL_get_ex_new_index(0, "mydata index", NULL, NULL, NULL);

 ...
 SSL_CTX_set_verify(ctx, SSL_VERIFY_PEER|SSL_VERIFY_CLIENT_ONCE,
                    verify_callback);

 /*
  * Let the verify_callback catch the verify_depth error so that we get
  * an appropriate error in the logfile.
  */
 SSL_CTX_set_verify_depth(verify_depth + 1);

 /*
  * Set up the SSL specific data into "mydata" and store it into th SSL
  * structure.
  */
 mydata.verify_depth = verify_depth; ...
 SSL_set_ex_data(ssl, mydata_index, &mydata);
                                             
 ...
 SSL_accept(ssl);       /* check of success left out for clarity */
 if (peer = SSL_get_peer_certificate(ssl))
 {
   if (SSL_get_verify_result(ssl) == X509_V_OK)
   {
     /* The client sent a certificate which verified OK */
   }
 }
SEE ALSO

ssl, SSL_new, SSL_CTX_get_verify_mode, SSL_get_verify_result, SSL_CTX_load_verify_locations, SSL_get_peer_certificate, SSL_CTX_set_cert_verify_callback, SSL_get_ex_data_X509_STORE_CTX_idx, SSL_get_ex_new_index
```

#### 6.1.2.2 http://stackoverflow.com/questions/2729254/ssl-ctx-set-cert-verify-callback-vs-ssl-ctx-set-verify

```text
SSL_CTX_set_cert_verify_callback() means you're specifying a function to do the entire validation process (walking the certificate chain validating each cert in turn). [ you probably don't want to be doing this, per the warning below ]

SSL_CTX_set_verify(), on the other hand, specifies a function that's called when the default validator checks each certificate, with preverify_ok set to 0 or 1 to indicate if verification of the certificate in question worked.

From the doc for SSL_CTX_set_cert_verify_callback()

WARNINGS

Do not mix the verification callback described in this function with the verify_callback function called during the verification process. The latter is set using the SSL_CTX_set_verify(3) family of functions.

Providing a complete verification procedure including certificate purpose settings etc is a complex task. The built-in procedure is quite powerful and in most cases it should be sufficient to modify its behaviour using the verify_callback function.
			6.1.2.3
		6.1.3
	6.2
```
