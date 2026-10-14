---
type: reference
title: HTTP
description: "HTTP protocol overview from MDN: client-server model, request/response and message structure."
tags: [http, web, networking, legacy, reference]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "Network/NetworkKB#19"
---

# HTTP tags: http

[↑ NetworkKB](/Network/kb-network/README.md)

## 19.1 HTTP Protocol

### 19.1.1 https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview

#### 19.1.1.1 Introduction

```text
HTTP is a protocol for fetching resources such as HTML documents. It is the foundation of any data exchange on the Web and it is a client-server protocol, which means requests are initiated by the recipient, usually the Web browser. A complete document is reconstructed from the different sub-documents fetched, for instance, text, layout description, images, videos, scripts, and more.

Clients and servers communicate by exchanging individual messages (as opposed to a stream of data). The messages sent by the client, usually a Web browser, are called requests and the messages sent by the server as an answer are called responses.

   Designed in the early 1990s, HTTP is an extensible protocol which has evolved over time. It is an application layer protocol that is sent over TCP, or over a TLS-encrypted TCP connection, though any reliable transport protocol could theoretically be used. Due to its extensibility, it is used to not only fetch hypertext documents, but also images and videos or to post content to servers, like with HTML form results. HTTP can also be used to fetch parts of documents to update Web pages on demand. 


HTTP is a client-server protocol: requests are sent by one entity, the user-agent (or a proxy on behalf of it). Most of the time the user-agent is a Web browser, but it can be anything, for example, a robot that crawls the Web to populate and maintain a search engine index.

Each individual request is sent to a server, which handles it and provides an answer called the response. Between the client and the server there are numerous entities, collectively called proxies, which perform different operations and act as gateways or caches, for example.
```

#### 19.1.1.2 Client server chain

```text
In reality, there are more computers between a browser and the server handling the request: there are routers, modems, and more. Thanks to the layered design of the Web, these are hidden in the network and transport layers. HTTP is on top, at the application layer. Although important for diagnosing network problems, the underlying layers are mostly irrelevant to the description of HTTP.
```

#### 19.1.1.3 Client: the user-agent

```text
The user-agent is any tool that acts on behalf of the user. This role is primarily performed by the Web browser, but it may also be performed by programs used by engineers and Web developers to debug their applications.

The browser is always the entity initiating the request. It is never the server (though some mechanisms have been added over the years to simulate server-initiated messages).

To display a Web page, the browser sends an original request to fetch the HTML document that represents the page. It then parses this file, making additional requests corresponding to execution scripts, layout information (CSS) to display, and sub-resources contained within the page (usually images and videos). The Web browser then combines these resources to present the complete document, the Web page. Scripts executed by the browser can fetch more resources in later phases and the browser updates the Web page accordingly.

A Web page is a hypertext document. This means some parts of the displayed content are links, which can be activated (usually by a click of the mouse) to fetch a new Web page, allowing the user to direct their user-agent and navigate through the Web. The browser translates these directions into HTTP requests, and further interprets the HTTP responses to present the user with a clear response.
```

#### 19.1.1.4 The Web server

```text
On the opposite side of the communication channel is the server, which serves the document as requested by the client. A server appears as only a single machine virtually; but it may actually be a collection of servers sharing the load (load balancing), or a complex piece of software interrogating other computers (like cache, a DB server, or e-commerce servers), totally or partially generating the document on demand.

A server is not necessarily a single machine, but several server software instances can be hosted on the same machine. With HTTP/1.1 and the Host header, they may even share the same IP address.
```

#### 19.1.1.5 Proxies

```text
Between the Web browser and the server, numerous computers and machines relay the HTTP messages. Due to the layered structure of the Web stack, most of these operate at the transport, network or physical levels, becoming transparent at the HTTP layer and potentially having a significant impact on performance. Those operating at the application layers are generally called proxies. These can be transparent, forwarding on the requests they receive without altering them in any way, or non-transparent, in which case they will change the request in some way before passing it along to the server. Proxies may perform numerous functions:

caching (the cache can be public or private, like the browser cache)
filtering (like an antivirus scan or parental controls)
load balancing (to allow multiple servers to serve different requests)
authentication (to control access to different resources)
logging (allowing the storage of historical information)
```

#### 19.1.1.6 Basic aspects of HTTP

#### 19.1.1.6.1 HTTP is simple

```text
HTTP is generally designed to be simple and human readable, even with the added complexity introduced in HTTP/2 by encapsulating HTTP messages into frames. HTTP messages can be read and understood by humans, providing easier testing for developers, and reduced complexity for newcomers.
```

#### 19.1.1.6.2 HTTP is extensible

```text
Introduced in HTTP/1.0, HTTP headers make this protocol easy to extend and experiment with. New functionality can even be introduced by a simple agreement between a client and a server about a new header's semantics.
```

#### 19.1.1.6.3 HTTP is stateless, but not sessionless

```text
HTTP is stateless: there is no link between two requests being successively carried out on the same connection. This immediately has the prospect of being problematic for users attempting to interact with certain pages coherently, for example, using e-commerce shopping baskets. But while the core of HTTP itself is stateless, HTTP cookies allow the use of stateful sessions. Using header extensibility, HTTP Cookies are added to the workflow, allowing session creation on each HTTP request to share the same context, or the same state.
```

#### 19.1.1.6.4 HTTP and connections

```text
A connection is controlled at the transport layer, and therefore fundamentally out of scope for HTTP. HTTP doesn't require the underlying transport protocol to be connection-based; it only requires it to be reliable, or not lose messages (at minimum, presenting an error in such cases). Among the two most common transport protocols on the Internet, TCP is reliable and UDP isn't. HTTP therefore relies on the TCP standard, which is connection-based.

Before a client and server can exchange an HTTP request/response pair, they must establish a TCP connection, a process which requires several round-trips. The default behavior of HTTP/1.0 is to open a separate TCP connection for each HTTP request/response pair. This is less efficient than sharing a single TCP connection when multiple requests are sent in close succession.

In order to mitigate this flaw, HTTP/1.1 introduced pipelining (which proved difficult to implement) and persistent connections: the underlying TCP connection can be partially controlled using the Connection header. HTTP/2 went a step further by multiplexing messages over a single connection, helping keep the connection warm and more efficient.

Experiments are in progress to design a better transport protocol more suited to HTTP. For example, Google is experimenting with QUIC which builds on UDP to provide a more reliable and efficient transport protocol.
```

#### 19.1.1.6.5 What can be controlled by HTTP

```text
This extensible nature of HTTP has, over time, allowed for more control and functionality of the Web. Cache and authentication methods were functions handled early in HTTP history. The ability to relax the origin constraint, by contrast, was only added in the 2010s.

Here is a list of common features controllable with HTTP:

Caching: How documents are cached can be controlled by HTTP. The server can instruct proxies and clients about what to cache and for how long. The client can instruct intermediate cache proxies to ignore the stored document.
Relaxing the origin constraint: To prevent snooping and other privacy invasions, Web browsers enforce strict separation between Web sites. Only pages from the same origin can access all the information of a Web page. Though such a constraint is a burden to the server, HTTP headers can relax this strict separation on the server side, allowing a document to become a patchwork of information sourced from different domains; there could even be security-related reasons to do so.
Authentication: Some pages may be protected so that only specific users can access them. Basic authentication may be provided by HTTP, either using the WWW-Authenticate and similar headers, or by setting a specific session using HTTP cookies.
Proxy and tunneling: Servers or clients are often located on intranets and hide their true IP address from other computers. HTTP requests then go through proxies to cross this network barrier. Not all proxies are HTTP proxies. The SOCKS protocol, for example, operates at a lower level. Other protocols, like ftp, can be handled by these proxies.
Sessions: Using HTTP cookies allows you to link requests with the state of the server. This creates sessions, despite basic HTTP being a state-less protocol. This is useful not only for e-commerce shopping baskets, but also for any site allowing user configuration of the output.
```

#### 19.1.1.6.6 HTTP flow

```text
When a client wants to communicate with a server, either the final server or an intermediate proxy, it performs the following steps:

Open a TCP connection: The TCP connection is used to send a request, or several, and receive an answer. The client may open a new connection, reuse an existing connection, or open several TCP connections to the servers.
Send an HTTP message: HTTP messages (before HTTP/2) are human-readable. With HTTP/2, these simple messages are encapsulated in frames, making them impossible to read directly, but the principle remains the same. For example:
GET / HTTP/1.1
Host: developer.mozilla.org
Accept-Language: fr

Read the response sent by the server, such as:
HTTP/1.1 200 OK
Date: Sat, 09 Oct 2010 14:28:02 GMT
Server: Apache
Last-Modified: Tue, 01 Dec 2009 20:18:22 GMT
ETag: "51142bc1-7449-479b075b2891b"
Accept-Ranges: bytes
Content-Length: 29769
Content-Type: text/html

<!DOCTYPE html>… (here come the 29769 bytes of the requested web page)
Close or reuse the connection for further requests.

If HTTP pipelining is activated, several requests can be sent without waiting for the first response to be fully received. HTTP pipelining has proven difficult to implement in existing networks, where old pieces of software coexist with modern versions. HTTP pipelining has been superseded in HTTP/2 with more robust multiplexing requests within a frame.
```

#### 19.1.1.6.7 HTTP Messages

```text
HTTP messages, as defined in HTTP/1.1 and earlier, are human-readable. In HTTP/2, these messages are embedded into a binary structure, a frame, allowing optimizations like compression of headers and multiplexing. Even if only part of the original HTTP message is sent in this version of HTTP, the semantics of each message is unchanged and the client reconstitutes (virtually) the original HTTP/1.1 request. It is therefore useful to comprehend HTTP/2 messages in the HTTP/1.1 format.

There are two types of HTTP messages, requests and responses, each with its own format.
```

#### 19.1.1.6.7.1 Requests

```text
An example HTTP request:

A basic HTTP request
Requests consist of the following elements:

An HTTP method, usually a verb like GET, POST, or a noun like OPTIONS or HEAD that defines the operation the client wants to perform. Typically, a client wants to fetch a resource (using GET) or post the value of an HTML form (using POST), though more operations may be needed in other cases.
The path of the resource to fetch; the URL of the resource stripped from elements that are obvious from the context, for example without the protocol (http://), the domain (here, developer.mozilla.org), or the TCP port (here, 80).
The version of the HTTP protocol.
Optional headers that convey additional information for the servers.
A body, for some methods like POST, similar to those in responses, which contain the resource sent.
```

#### 19.1.1.6.7.2 Responses

```text
An example response:

HTTP Response image
Responses consist of the following elements:

The version of the HTTP protocol they follow.
A status code, indicating if the request was successful or not, and why.
A status message, a non-authoritative short description of the status code.
HTTP headers, like those for requests.
Optionally, a body containing the fetched resource.
```

#### 19.1.1.6.8 APIs based on HTTP

```text
The most commonly used API based on HTTP is the XMLHttpRequest API, which can be used to exchange data between a user agent and a server. The modern Fetch API provides the same features with a more powerful and flexible feature set.

Another API, server-sent events, is a one-way service that allows a server to send events to the client, using HTTP as a transport mechanism. Using the EventSource interface, the client opens a connection and establishes event handlers. The client browser automatically converts the messages that arrive on the HTTP stream into appropriate Event objects. Then it delivers them to the event handlers that have been registered for the events' type if known, or to the onmessage event handler if no type-specific event handler was established.
```

#### 19.1.1.7 Conclusion

```text
HTTP is an extensible protocol that is easy to use. The client-server structure, combined with the ability to add headers, allows HTTP to advance along with the extended capabilities of the Web.

Though HTTP/2 adds some complexity by embedding HTTP messages in frames to improve performance, the basic structure of messages has stayed the same since HTTP/1.0. Session flow remains simple, allowing it to be investigated and debugged with a simple HTTP message monitor.


            19.1.1.8
        19.1.2
```

## 19.2 HTTP/2

### 19.2.1 https://www.upwork.com/resources/what-is-http2

#### 19.2.1.1 primary goals of HTTP2

```text
HTTP/2 is the second version of the HTTP protocol aiming to make applications faster, simpler, and more robust by improving many of the drawbacks of the first HTTP version.

The primary goals of HTTP/2 are:

Enable request and response multiplexing
Header compression
Compatibility with the methods, status codes, URIs, and header fields defined by the HTTP/1.1 standard
Optimized prioritization of requests, making sure that loading for optimal user experience is as fast as possible
Support for server-side push
Server-side backwards compatibility, making sure servers can still serve clients only supporting HTTP/1.1 without any changes
Transforming to a binary protocol from the text-based HTTP/1.1

Some key features of HTTP/2 include:

Binary: Meaning commands use 1s and 0s and not text
Multiplex: Permits multiple requests and responses to be sent at the same time
Compression: Compresses headers that have been requested previously to make things more efficient
Stream prioritization: This allows for the exchange of successive streams at one time
Server push: The server can send additional information needed for a request before it is requested
Increased security: HTTP/2 is supported through encrypted connections
```

#### 19.2.1.2 HTTP/1.1 vs. HTTP/2: Main differences

```text
As mentioned, the aim when designing HTTP/2 was to fix many of the drawbacks experienced with HTTP/1.1. In this section, we go through the differences between HTTP/2 and its predecessor.

Compression
HTTP/2 offers built-in compression of the request headers (HPACK). Modern web applications usually accept a range of different headers, such as authorization, caching directives, and client information. While compression of these might not make much of a difference for a single request, there is a lot of data sent over the network to be saved when compressing them in high-traffic applications. HTTP/1.1 does not compress headers by default.

Performance
Many of the new features in HTTP/2 are aimed at improving performance for the end-user. One example of this is how external resources can be preemptively pushed to the client's browser before they are explicitly requested. HTTP/1.1 does not have these advanced features.

Binary protocol
HTTP/2 is binary instead of textual as HTTP/1.1. In practice, this means simplified implementation of commands that previously could be mixed up due to optional whitespace when using the text format. Browsers that support HTTP/2 will convert textual commands into binary before sending them over the network.

Security
Because of the binary format used by HTTP/2, there is no longer a risk with so-called response splitting attacks that are possible with HTTP/1.1. This enables an attacker to manipulate the response headers by injecting whitespace into a textual response. This is no longer possible with the binary format of HTTP/2.

Delivery models
While the HTTP/1.1 protocol delivers responses based on a single request, HTTP/2 uses multiplexing and server push features to increase the delivery performance.

Buffer overflow
The buffer is the space used by the client and server that holds the requests that have not yet been processed. In HTTP/1.1, the flow control used to manage the available buffer space is implemented at the transport layer. In HTTP/2, the client and server can implement their own flow controls to communicate the available buffer space.

Multiplexing
HTTP/2 enables full request and response multiplexing. In practice, this means a connection made to a web server from your browser can be used to send multiple requests and receive multiple responses. This gets rid of a lot of the additional time that it takes to establish a new connection for each request. HTTP/1.1 does not support multiplexing.

Faster encrypted connections
HTTP/2 uses the new ALPN extension, which allows for faster-encrypted connections since the application protocol is determined during the initial connection. Using HTTP/1.1 without ALPN needs additional round trips for the encryption handshake.

No need for HTTP/1.1 workarounds
In order to bypass some of the drawbacks with HTTP/1.1, multiple workarounds have been invented. Two examples of these are:

Domain sharding is a common performance workaround used with HTTP/1.1 to trick browsers into opening more simultaneous connections than would normally be allowed.

Another common workaround for HTTP/1.1 is content concatenation used to reduce the number of requests for different resources. To achieve this, web developers often combine all the CSS and JavaScript into single files.

These are no longer needed with the built-in multiplexing in HTTP/2.


            19.2.1.3
```

### 19.2.2 RFC https://datatracker.ietf.org/doc/html/rfc7540

```text
        19.2.3
    19.3
20.
```

## See Also

<!-- backlinks:start -->
### Backlinks

* [web-programming-kb](/web-programming-kb.md)
<!-- backlinks:end -->
