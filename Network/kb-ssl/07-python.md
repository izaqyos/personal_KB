---
type: reference
title: Python
description: "Python ssl module reference: functions, constants, exceptions, SSLSocket objects and certificates."
tags: [python, ssl, tls, legacy, reference]
generated: { by: "human:izaqyos", at: "2026-10-14T00:00:00Z" }
stale_after: "2028-10-14T00:00:00Z"
sources:
  - { id: python-ssl-docs, resource: "https://docs.python.org/3/library/ssl.html", title: "ssl — TLS/SSL wrapper for socket objects (Python 3 documentation)" }
  - { id: python-312-whatsnew, resource: "https://docs.python.org/3/whatsnew/3.12.html", title: "What's New In Python 3.12 — Removed: ssl" }
  - { id: rfc8996, resource: "https://www.rfc-editor.org/rfc/rfc8996", title: "RFC 8996: Deprecating TLS 1.0 and TLS 1.1" }
  - { id: openssl-req, resource: "https://docs.openssl.org/3.0/man1/openssl-req/", title: "openssl-req(1) — OpenSSL 3.0 manual" }
status: stable
capture_type: source
legacy_source: "Network/sslKB#7"
---

# Python

[↑ sslKB](/Network/kb-ssl/README.md)

## 7.1 SSL module

```text
	This module provides access to Transport Layer Security (often known as “Secure Sockets Layer”) encryption and peer authentication facilities for network sockets, both client-side and server-side. This module uses the OpenSSL library. It is available on all modern Unix systems, Windows, Mac OS X, and probably additional platforms, as long as OpenSSL is installed on that platform.

Note

Some behavior may be platform dependent, since calls are made to the operating system socket APIs. The installed version of OpenSSL may also cause variations in behavior.

This section documents the objects and functions in the ssl module; for more general information about TLS, SSL, and certificates, the reader is referred to the documents in the “See Also” section at the bottom.

This module provides a class, ssl.SSLSocket, which is derived from the socket.socket type, and provides a socket-like wrapper that also encrypts and decrypts the data going over the socket with SSL. It supports additional read() and write() methods, along with a method, getpeercert(), to retrieve the certificate of the other side of the connection, and a method, cipher(), to retrieve the cipher being used for the secure connection.
```

### 7.1.1 Functions, Constants, and Exceptions

> Updated 2026-10 to current practice.[^python-ssl-docs]

The original notes were copied from the Python 2.7 `ssl` docs. Current Python 3 differs in ways that matter:

- **`ssl.SSLError`** is a subclass of `OSError` (since Python 3.3; it used to subclass `socket.error`). More specific subclasses exist: `SSLCertVerificationError`, `SSLEOFError`, `SSLWantReadError`, `SSLWantWriteError`, `SSLZeroReturnError`.
- **`ssl.wrap_socket()` was removed in Python 3.12.**[^python-312-whatsnew] It sent no SNI and did not check the server hostname, so code that used it was insecure (CWE-295). Create an `ssl.SSLContext` and call `SSLContext.wrap_socket()` instead. `ssl.match_hostname()` and `ssl.RAND_pseudo_bytes()` were removed in the same release. OpenSSL has done hostname matching during the handshake since Python 3.7.
- **Contexts, not version-specific protocols.** Use `ssl.create_default_context()` for clients, or build an `SSLContext(ssl.PROTOCOL_TLS_CLIENT)` / `SSLContext(ssl.PROTOCOL_TLS_SERVER)` yourself. `PROTOCOL_SSLv23`, `PROTOCOL_SSLv3`, `PROTOCOL_TLSv1`, `PROTOCOL_TLSv1_1` and `PROTOCOL_TLSv1_2` have been deprecated since 3.6, and generic `PROTOCOL_TLS` since 3.10. `PROTOCOL_SSLv2` is gone. To pin versions, set `SSLContext.minimum_version` / `maximum_version` to `ssl.TLSVersion` members. Every member except `TLSv1_2` and `TLSv1_3` has been deprecated since 3.10.
- **Default floor is TLS 1.2.** Since Python 3.10, `PROTOCOL_TLS_CLIENT` and `PROTOCOL_TLS_SERVER` contexts use TLS 1.2 as the minimum, and the default ciphers are only AES or ChaCha20 suites with forward secrecy. SSL 2.0 is prohibited (RFC 6176), SSL 3.0 is deprecated (RFC 7568), and TLS 1.0 and 1.1 are deprecated (RFC 8996).[^rfc8996] The old SSLv2/SSLv3/SSLv23/TLSv1 client-server compatibility table no longer applies, so it has been dropped.
- **`cert_reqs` / `ca_certs` now live on the context.** Set `ctx.verify_mode` (`CERT_NONE`, `CERT_OPTIONAL` or `CERT_REQUIRED`) and `ctx.check_hostname`, then load CAs with `ctx.load_verify_locations(cafile=...)` or `ctx.load_default_certs()`. `create_default_context()` and `PROTOCOL_TLS_CLIENT` already set `CERT_REQUIRED` with `check_hostname=True`. A bare `SSLContext` built for server use defaults to `CERT_NONE`. Load your own certificate and key with `ctx.load_cert_chain(certfile, keyfile=None)`.
- **`ssl.get_server_certificate(addr, ssl_version=PROTOCOL_TLS_CLIENT, ca_certs=None[, timeout])`.** The default is now `PROTOCOL_TLS_CLIENT`, not SSLv3.
- **`ssl.RAND_egd()` no longer exists.** The OS CSPRNG seeds OpenSSL. If you need random bytes, use `os.urandom()`, the `secrets` module or `ssl.RAND_bytes()`.
- `ssl.OPENSSL_VERSION`, `OPENSSL_VERSION_INFO` and `OPENSSL_VERSION_NUMBER` still exist and print a plain `int` (Python 3 has no `L` suffix). Expect OpenSSL 3.x on current systems.

```python
import ssl

ctx = ssl.create_default_context()           # client: CERT_REQUIRED + check_hostname
ctx.minimum_version = ssl.TLSVersion.TLSv1_2  # already the default since 3.10; explicit is fine
print(ssl.OPENSSL_VERSION)
```

The parts below are still valid and are kept from the original notes:

```text
ssl.RAND_status()
    Returns True if the SSL pseudo-random number generator has been seeded with ‘enough’ randomness, and False otherwise. You can use ssl.RAND_add() to increase the randomness of the pseudo-random number generator.

ssl.RAND_add(bytes, entropy)
    Mixes the given bytes into the SSL pseudo-random number generator. The parameter entropy (a float) is a lower bound on the entropy contained in string (so you can always use 0.0). See RFC 1750 for more information on sources of entropy.

ssl.cert_time_to_seconds(timestring)

    Returns a floating-point value containing a normal seconds-after-the-epoch time value, given the time-string representing the “notBefore” or “notAfter” date from a certificate.

|    Here’s an example:
|
|    >>> import ssl
|    >>> ssl.cert_time_to_seconds("May  9 00:00:00 2007 GMT")
|    1178694000.0
|    >>> import time
|    >>> time.ctime(ssl.cert_time_to_seconds("May  9 00:00:00 2007 GMT"))
|    'Wed May  9 00:00:00 2007'
|    >>>

ssl.DER_cert_to_PEM_cert(DER_cert_bytes)
    Given a certificate as a DER-encoded blob of bytes, returns a PEM-encoded string version of the same certificate.

ssl.PEM_cert_to_DER_cert(PEM_cert_string)
    Given a certificate as an ASCII PEM string, returns a DER-encoded sequence of bytes for that same certificate.

ssl.CERT_NONE / ssl.CERT_OPTIONAL / ssl.CERT_REQUIRED
    Values for SSLContext.verify_mode: certificates ignored / validated if provided / required and validated.
```

### 7.1.2 SSLSocket Objects

> Updated 2026-10 to current practice.[^python-ssl-docs]

`SSLSocket.read()` and `SSLSocket.write()` have been deprecated since Python 3.6. Use the normal socket methods `recv()` / `send()` / `sendall()`, which operate on `bytes`. `getpeercert()`, `cipher()`, `do_handshake()` and `unwrap()` still work as described below. `ssock.version()` returns the negotiated protocol, for example `'TLSv1.3'`.

For a non-blocking handshake, catch the dedicated exceptions instead of `except ssl.SSLError, err` (a Python 2 syntax error in Python 3) followed by checks on `err.args[0]`:

```python
import select
import ssl

while True:
    try:
        s.do_handshake()
        break
    except ssl.SSLWantReadError:
        select.select([s], [], [])
    except ssl.SSLWantWriteError:
        select.select([], [s], [])
```

```text
SSLSocket.getpeercert(binary_form=False)

    If there is no certificate for the peer on the other end of the connection, returns None.

    If the parameter binary_form is False, and a certificate was received from the peer, this method returns a dict instance. If the certificate was not validated, the dict is empty. If the certificate was validated, it returns a dict with the keys subject (the principal for which the certificate was issued), and notAfter (the time after which the certificate should not be trusted). If a certificate contains an instance of the Subject Alternative Name extension (see RFC 3280), there will also be a subjectAltName key in the dictionary.

    The “subject” field is a tuple containing the sequence of relative distinguished names (RDNs) given in the certificate’s data structure for the principal, and each RDN is a sequence of name-value pairs.

    If the binary_form parameter is True, and a certificate was provided, this method returns the DER-encoded form of the entire certificate as a sequence of bytes, or None if the peer did not provide a certificate. This return value is independent of validation.

SSLSocket.cipher()
    Returns a three-value tuple containing the name of the cipher being used, the version of the SSL protocol that defines its use, and the number of secret bits being used. If no connection has been established, returns None.

SSLSocket.unwrap()
    Performs the SSL shutdown handshake, which removes the TLS layer from the underlying socket, and returns the underlying socket object. This can be used to go from encrypted operation over a connection to unencrypted. The socket instance returned should always be used for further communication with the other side of the connection, rather than the original socket instance (which may not function properly after the unwrap).
```

### 7.1.3 Certificates

> Updated 2026-10 to current practice.[^python-ssl-docs]

The background below (PEM format, how chains are ordered, CA bundles) is still accurate. Three things have changed:

- **Trust store.** Do not assemble a CA file by hand from a list of vendors. `create_default_context()` / `ctx.load_default_certs()` load the system trust store. Use `ctx.load_verify_locations(cafile=...)` only for a private CA. The vendor list in the original notes (Thawte, Verisign, Equifax, ...) is historical.
- **Key and certificate in separate files.** `ctx.load_cert_chain(certfile, keyfile)` takes both. The certfile should contain the leaf certificate followed by any intermediates.
- **Generating a test certificate.** The 1024-bit RSA key in the original notes is too weak. Use at least 2048-bit RSA. With OpenSSL 3.x, use `-noenc` (`-nodes` is deprecated) and add a subjectAltName, because hostname checking uses SAN rather than CN:[^openssl-req]

```bash
openssl req -x509 -newkey rsa:3072 -noenc -days 365 \
  -keyout key.pem -out cert.pem \
  -subj "/CN=myserver.example.com" \
  -addext "subjectAltName=DNS:myserver.example.com"
```

```text
Certificates in general are part of a public-key / private-key system. In this system, each principal, (which may be a machine, or a person, or an organization) is assigned a unique two-part encryption key. One part of the key is public, and is called the public key; the other part is kept secret, and is called the private key. The two parts are related, in that if you encrypt a message with one of the parts, you can decrypt it with the other part, and only with the other part.

A certificate contains information about two principals. It contains the name of a subject, and the subject’s public key. It also contains a statement by a second principal, the issuer, that the subject is who he claims to be, and that this is indeed the subject’s public key. The issuer’s statement is signed with the issuer’s private key, which only the issuer knows. However, anyone can verify the issuer’s statement by finding the issuer’s public key, decrypting the statement with it, and comparing it to the other information in the certificate. The certificate also contains information about the time period over which it is valid. This is expressed as two fields, called “notBefore” and “notAfter”.

In the Python use of certificates, a client or server can use a certificate to prove who they are. The other side of a network connection can also be required to produce a certificate, and that certificate can be validated to the satisfaction of the client or server that requires such validation. The connection attempt can be set to raise an exception if the validation fails. Validation is done automatically, by the underlying OpenSSL framework; the application need not concern itself with its mechanics. But the application does usually need to provide sets of certificates to allow this process to take place.

Python uses files to contain certificates. They should be formatted as “PEM” (see RFC 1422), which is a base-64 encoded form wrapped with a header line and a footer line:

-----BEGIN CERTIFICATE-----
... (certificate in base64 PEM encoding) ...
-----END CERTIFICATE-----

The Python files which contain certificates can contain a sequence of certificates, sometimes called a certificate chain. This chain should start with the specific certificate for the principal who “is” the client or server, and then the certificate for the issuer of that certificate, and then the certificate for the issuer of that certificate, and so on up the chain till you get to a certificate which is self-signed, that is, a certificate which has the same subject and issuer, sometimes called a root certificate. The certificates should just be concatenated together in the certificate file. For example, suppose we had a three certificate chain, from our server certificate to the certificate of the certification authority that signed our server certificate, to the root certificate of the agency which issued the certification authority’s certificate:

-----BEGIN CERTIFICATE-----
... (certificate for your server)...
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
... (the certificate for the CA)...
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
... (the root certificate for the CA's issuer)...
-----END CERTIFICATE-----

If you are going to require validation of the other side of the connection’s certificate, you need to provide a “CA certs” file, filled with the certificate chains for each issuer you are willing to trust. Again, this file just contains these chains concatenated together. For validation, Python will use the first chain it finds in the file which matches.

In general you don’t need to put the full chain in your “CA certs” file; you only need the root certificates, and the remote peer is supposed to furnish the other certificates necessary to chain from its certificate to a root certificate. See RFC 4158 for more discussion of the way in which certification chains can be built.

The disadvantage of a self-signed certificate is that it is its own root certificate, and no one else will have it in their cache of known (and trusted) root certificates.
```

### 7.1.4 Examples

#### 7.1.4.1 Testing for SSL support

```text
To test for the presence of SSL support in a Python installation, user code should use the following idiom:

try:
    import ssl
except ImportError:
    pass
else:
    ... # do something that requires SSL support
```

#### 7.1.4.2 Client-side operation

> Updated 2026-10 to current practice.[^python-ssl-docs]

This example connects to a TLS server, verifies its certificate and hostname, prints the peer address, protocol, cipher and certificate, sends a request and reads part of the response. The original example used `ssl.wrap_socket()` and Python 2 `print` statements, and it targeted `www.verisign.com`. Here `www.python.org` stands in. In real code, use `http.client`, `urllib.request` or a library such as `requests`/`httpx`, all of which take an `SSLContext`.

```python
import pprint
import socket
import ssl

hostname = "www.python.org"
context = ssl.create_default_context()        # system CAs, CERT_REQUIRED, check_hostname
# context.load_verify_locations(cafile="/etc/ca_certs_file")  # only for a private CA

with socket.create_connection((hostname, 443)) as sock:
    with context.wrap_socket(sock, server_hostname=hostname) as ssock:  # sends SNI
        print(repr(ssock.getpeername()))
        print(ssock.version(), ssock.cipher())
        print(pprint.pformat(ssock.getpeercert()))

        ssock.sendall(f"GET / HTTP/1.1\r\nHost: {hostname}\r\nConnection: close\r\n\r\n".encode())
        data = ssock.recv(4096)  # one chunk, not necessarily the whole response
```

`getpeercert()` returns a dict with `subject`, `issuer`, `notBefore`, `notAfter`, `subjectAltName` and other fields. Values are `str`, without the `u''` prefixes in the old output.

#### 7.1.4.3 Server-side operation

> Updated 2026-10 to current practice.[^python-ssl-docs]

Create one server context up front, load the certificate chain and key into it, and wrap each accepted connection. Do not create a new context per client, and do not pin `PROTOCOL_TLSv1` the way the original example did.

```python
import socket
import ssl

context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)   # TLS 1.2+ by default (3.10+)
context.load_cert_chain(certfile="mycertfile", keyfile="mykeyfile")
# For mutual TLS: context.verify_mode = ssl.CERT_REQUIRED; context.load_verify_locations("client-ca.pem")

def deal_with_client(connstream):
    data = connstream.recv(1024)
    # empty bytes means the client is finished with us
    while data:
        if not do_something(connstream, data):
            # we'll assume do_something returns False
            # when we're finished with client
            break
        data = connstream.recv(1024)

with socket.create_server(("myaddr.mydomain.com", 10023)) as bindsocket:
    while True:
        newsocket, fromaddr = bindsocket.accept()
        with context.wrap_socket(newsocket, server_side=True) as connstream:
            try:
                deal_with_client(connstream)
            finally:
                connstream.shutdown(socket.SHUT_RDWR)
```

Go back to listening for new client connections after each one. For many concurrent clients, use `asyncio` (`asyncio.start_server(..., ssl=context)`) instead of a blocking loop.

```text
See also

Class socket.socket
    Documentation of underlying socket class
Introducing SSL and Certificates using OpenSSL
    Frederick J. Hirsch
RFC 1422: Privacy Enhancement for Internet Electronic Mail: Part II: Certificate-Based Key Management
    Steve Kent
RFC 1750: Randomness Recommendations for Security
    D. Eastlake et. al.
RFC 3280: Internet X.509 Public Key Infrastructure Certificate and CRL Profile
    Housley et. al.

		7.1.5

	7.2
```

[^python-ssl-docs]: ssl — TLS/SSL wrapper for socket objects (Python 3 documentation)
[^python-312-whatsnew]: What's New In Python 3.12 — Removed: ssl
[^rfc8996]: RFC 8996: Deprecating TLS 1.0 and TLS 1.1
[^openssl-req]: openssl-req(1) — OpenSSL 3.0 manual
