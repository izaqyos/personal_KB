---
type: reference
title: Network programming
description: "C network programming: IPv4 TCP client and server and creating sockets."
tags: [c, sockets, tcp, legacy, examples]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "c-kb#9"
---

# Network programming

[↑ c-kb](/kb-c/README.md)

## 9.1 IPv4 TCP Client

```text
The distinction between client and server is important because each uses the sockets interface differently at certain steps in the communication. We first focus on the client. Its job is to initiate communication with a server that is passively waiting to be contacted.

The typical TCP client’s communication involves four basic steps:
| 1.  Create a TCP socket using socket().
| 
| 2.  Establish a connection to the server using connect().
| 
| 3.  Communicate using send and recv().
| 
| 4.  Close the connection with close().

TCPEchoClient4.c is an implementation of a TCP echo client for IPv4.

TCPEchoClient4.c

 1  #include <stdio.h>
 2  #include <stdlib.h>
 3  #include <string.h>
 4  #include <unistd.h>
 5  #include <sys/types.h>
 6  #include <sys/socket.h>
 7  #include <netinet/in.h>
 8  #include <arpa/inet.h>
 9  #include "Practical.h"
10
11  int main(int argc, char *argv[]) {
12
13    if (argc < 3 ||  argc > 4) // Test for correct number of arguments
14      DieWithUserMessage("Parameter(s)",
15          "<Server Address> <Echo Word> [<Server Port>]");
16
17    char *servIP = argv[1];     // First arg: server IP address (dotted quad)
18    char *echoString = argv[2]; // Second arg: string to echo
19
20    // Third arg (optional): server port (numeric).  7 is well-known echo port
21    in_port_t servPort = (argc == 4) ? atoi(argv[3]) : 7;
22
23    // Create a reliable, stream socket using TCP
24    int sock = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
25    if (sock < 0)
26      DieWithSystemMessage("socket() failed");
27
28    // Construct the server address structure
29    struct sockaddr_in servAddr;            // Server address
30    memset(&servAddr, 0, sizeof(servAddr)); // Zero out structure
31    servAddr.sin_family = AF_INET;          // IPv4 address family
32    // Convert address
33    int rtnVal = inet_pton(AF_INET, servIP, &servAddr.sin_addr.s_addr);
34    if (rtnVal == 0)
35      DieWithUserMessage("inet_pton() failed", "invalid address string");
36    else if (rtnVal < 0)
37      DieWithSystemMessage("inet_pton() failed");
38    servAddr.sin_port = htons(servPort);    // Server port
39
40    // Establish the connection to the echo server
41    if (connect(sock, (struct sockaddr *) &servAddr, sizeof(servAddr)) < 0)
42      DieWithSystemMessage("connect() failed");
43
44    size_t echoStringLen = strlen(echoString); // Determine input length
45
46    // Send the string to the server
47    ssize_t numBytes = send(sock, echoString, echoStringLen, 0);
48    if (numBytes < 0)
49      DieWithSystemMessage("send() failed");
50    else if (numBytes != echoStringLen)
51      DieWithUserMessage("send()", "sent unexpected number of bytes");
52
53    // Receive the same string back from the server
54    unsigned int totalBytesRcvd = 0; // Count of total bytes received
55    fputs("Received: ", stdout);     // Setup to print the echoed string
56    while (totalBytesRcvd < echoStringLen) {
57      char buffer[BUFSIZE]; // I/O buffer
58      /* Receive up to the buffer size (minus 1 to leave space for
59       a null terminator) bytes from the sender */
60      numBytes = recv(sock, buffer, BUFSIZE - 1, 0);
61      if (numBytes < 0)
62        DieWithSystemMessage("recv() failed");
63      else if (numBytes == 0)
64        DieWithUserMessage("recv()", "connection closed prematurely");
65      totalBytesRcvd += numBytes; // Keep tally of total bytes
66      buffer[numBytes] = '\0';    // Terminate the string!
67      fputs(buffer, stdout);      // Print the echo buffer
68    }
69
70    fputc('\n', stdout); // Print a final linefeed
71
72    close(sock);
73    exit(0);
74  }

					  


TCPEchoClient4.c

Our TCPEchoClient4.c does the following:

    Application setup and parameter parsing: lines 1–21

        Include files: lines 1–9

        These header files declare the standard functions and constants of the API. Consult your documentation (e.g., man pages) for the appropriate include files for socket functions and data structures on your system. We utilize our own include file, Practical.h, with prototypes for our own functions, which we describe below.

        Typical parameter parsing and sanity checking: lines 13–21

        The IPv4 address and string to echo are passed in as the first two parameters. Optionally, the client takes the server port as the third parameter. If no port is provided, the client uses the well-known echo protocol port, 7.

    TCP socket creation: lines 23–26

    We create a socket using the socket() function. The socket is for IPv4 (AF_INET) using the stream-based protocol (SOCK_STREAM) called TCP (IPPROTO_TCP). socket() returns an integer-valued descriptor or “handle” for the socket if successful. If socket fails, it returns −1, and we call our error-handling function, DieWithSystemMessage() (described later), to print an informative hint and exit.

    Prepare address and establish connection: lines 28–42

        Prepare sockaddr_in structure to hold server address: lines 29–30

        To connect a socket, we have to specify the address and port to connect to. The sock-addr_in structure is defined to be a “container” for this information. The call to memset() ensures that any parts of the structure that we do not explicitly set contain zero.

        Filling in the sockaddr_in: lines 31–38

        We must set the address family (AF_INET), Internet address, and port number. The function inet_pton() converts the string representation of the server’s Internet address (passed as a command-line argument in dotted-quad notation) into a 32-bit binary representation. The server’s port number was converted from a command-line string to binary earlier; the call to htons() (“host to network short”) ensures that the binary value is formatted as required by the API. (Reasons for this are described in Chapter 5.)

        Connecting: lines 40–42

        The connect() function establishes a connection between the given socket and the one identified by the address and port in the sockaddr_in structure. Because the Sockets API is generic, the pointer to the sockaddr_in address structure (which is specific to IPv4 addresses) needs to be cast to the generic type (sockaddr*), and the actual size of the address data structure must be supplied.

    Send echo string to server: lines 44–51

    We find the length of the argument string and save it for later use. A pointer to the echo string is passed to the send() call; the string itself was stored somewhere (like all command-line arguments) when the application was started. We do not really care where it is; we just need to know the address of the first byte and how many bytes to send. (Note that we do not send the end-of-string marker character (0) that is at the end of the argument string—and all strings in C). send() returns the number of bytes sent if successful and −1 otherwise. If send() fails or sends the wrong number of bytes, we must deal with the error. Note that sending the wrong number of bytes will not happen here. Nevertheless, it’s a good idea to include the test because errors can occur in some contexts.

    Receive echo server reply: lines 53–70

    TCP is a byte-stream protocol. One implication of this type of protocol is that send() boundaries are not preserved. In other words: The bytes sent by a call to send() on one end of a connection may not all be returned by a single call to recv() on the other end. (We discuss this issue in more detail in Chapter 7.) So we need to repeatedly receive bytes until we have received as many as we sent. In all likelihood, this loop will only be executed once because the data from the server will in fact be returned all at once; however, that is not guaranteed to happen, and so we have to allow for the possibility that multiple reads are required. This is a basic principle of writing applications that use sockets: you must never assume anything about what the network and the program at the other end are going to do.

        Receive a block of bytes: lines 57–65

        recv() blocks until data is available, returning the number of bytes copied into the buffer or −1 in case of failure. A return value of zero indicates that the application at the other end closed the TCP connection. Note that the size parameter passed to recv() reserves space for adding a terminating null character.

        Print buffer: lines 66–67

        We print the data sent by the server as it is received. We add the terminating null character (0) at the end of each chunk of received data so that it can be treated as a string by fputs(). We do not check whether the bytes received are the same as the bytes sent. The server may send something completely different (up to the length of the string we sent), and it will be written to the standard output.

        Print newline: line 70

        When we have received as many bytes as we sent, we exit the loop and print a newline.

    Terminate connection and exit: lines 72–73

    The close() function informs the remote socket that communication is ended, and then deallocates local resources of the socket.

Our client application (and indeed all the programs in this book) makes use of two error-handling functions:

     DieWithUserMessage(const char *msg, const char *detail)
     DieWithSystemMessage(const char *msg)


Both functions print a user-supplied message string (msg) to stderr, followed by a detail message string; they then call exit() with an error return code, causing the application to terminate. The only difference is the source of the detail message. For DieWithUserMessage(), the detail message is user-supplied. For DieWithSystemMessage(), the detail message is supplied by the system based on the value of the special variable errno (which describes the reason for the most recent failure, if any, of a system call). We call DieWithSystemMessage() only if the error situation results from a call to a system call that sets errno. (To keep our programs simple, our examples do not contain much code devoted to recovering from errors—they simply punt and exit. Production code generally should not give up so easily.)

Occasionally, we need to supply information to the user without exiting; we use printf() if we need formatting capabilities, and fputs() otherwise. In particular, we try to avoid using printf() to output fixed, preformatted strings. One thing that you should never do is to pass text received from the network as the first argument to printf(). It creates a serious security vulnerability. Use fputs() instead.

    Note: the DieWith...() functions are declared in the header “Practical.h.” However, the actual implementation of these functions is contained in the file DieWithMessage.c, which should be compiled and linked with all example applications in this text.

DieWithMessage.c

 1    #include <stdio.h>
 2    #include <stdlib.h>
 3
 4    void DieWithUserMessage(const char *msg, const char *detail) {
 5      fputs(msg, stderr);
 6      fputs(": ", stderr);
 7      fputs(detail, stderr);
 8      fputc('\n', stderr);
 9      exit(1);
10    }
11
12    void DieWithSystemMessage(const char *msg) {
13      perror(msg);
14      exit(1);
15    }


DieWithMessage.c

If we compile TCPEchoClient4.c and DieWithMessage.c to create program TCPEchoClient4, we can communicate with an echo server with Internet address 169.1.1.1 as follows:

     % TCPEchoClient4 169.1.1.1 "Echo this!"
     Received: Echo this!


For our client to work, we need a server. Many systems include an echo server for debugging and testing purposes; however, for security reasons, such servers are often initially disabled. If you don’t have access to an echo server, that’s okay because we’re about to write one.
```

## 9.2 IPv4 TCP Server

```text
We now turn our focus to constructing a TCP server. The server’s job is to set up a communication endpoint and passively wait for a connection from the client. There are four general steps for basic TCP server communication:
|1.  Create a TCP socket using socket().
|
|2.  Assign a port number to the socket with bind().
|
|3.  Tell the system to allow connections to be made to that port, using listen().
|
|4.  Repeatedly do the following:

    Call accept() to get a new socket for each client connection.

    Communicate with the client via that new socket using send() and recv().

    Close the client connection using close().

Creating the socket, sending, receiving, and closing are the same as in the client. The differences in the server’s use of sockets have to do with binding an address to the socket and then using the socket as a way to obtain other sockets that are connected to clients. (We’ll elaborate on this in the comments following the code.) The server’s communication with each client is as simple as can be: it simply receives data on the client connection and sends the same data back over to the client; it repeats this until the client closes its end of the connection, at which point no more data will be forthcoming.

TCPEchoServer4.c
Code View: Scroll / Show All

 1  #include <stdio.h>
 2  #include <stdlib.h>
 3  #include <string.h>
 4  #include <sys/types.h>
 5  #include <sys/socket.h>
 6  #include <netinet/in.h>
 7  #include <arpa/inet.h>
 8  #include "Practical.h"
 9
10  static const int MAXPENDING = 5; // Maximum outstanding connection requests
11
12  int main(int argc, char *argv[]) {
13
14  if (argc != 2) // Test for correct number of arguments
15    DieWithUserMessage("Parameter(s)", "<Server Port>");
16
17  in_port_t servPort = atoi(argv[1]); // First arg:   local port
18
19  // Create socket for incoming connections
20  int servSock; // Socket descriptor for server
21  if ((servSock = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP)) < 0)
22    DieWithSystemMessage("socket() failed");
23
24  // Construct local address structure
25  struct sockaddr_in servAddr;                  // Local address
26  memset(&servAddr, 0, sizeof(servAddr));       // Zero out structure
27  servAddr.sin_family = AF_INET;                // IPv4 address family
28  servAddr.sin_addr.s_addr = htonl(INADDR_ANY); // Any incoming interface
29  servAddr.sin_port = htons(servPort);          // Local port
30
31  // Bind to the local address
32  if (bind(servSock, (struct sockaddr*) &servAddr, sizeof(servAddr)) < 0)
33    DieWithSystemMessage("bind() failed");
34
35  // Mark the socket so it will listen for incoming connections
36  if (listen(servSock, MAXPENDING) < 0)
37    DieWithSystemMessage("listen() failed");
38
39  for (;;) { // Run forever
40    struct sockaddr_in clntAddr; // Client address
41    // Set length of client address structure (in-out parameter)
42    socklen_t clntAddrLen = sizeof(clntAddr);
43
44    // Wait for a client to connect
45    int clntSock = accept(servSock, (struct sockaddr *) &clntAddr, &clntAddrLen);
46    if (clntSock < 0)
47      DieWithSystemMessage("accept() failed");
48
49    // clntSock is connected to a client!
50
51    char clntName[INET_ADDRSTRLEN]; // String to contain client address
52    if (inet_ntop(AF_INET, &clntAddr.sin_addr.s_addr, clntName,
53        sizeof(clntName)) != NULL)
54      printf("Handling client %s/%d\n", clntName, ntohs(clntAddr.sin_port));
55    else
56      puts("Unable to get client address");
57
58      HandleTCPClient(clntSock);
59    }
60    // NOT REACHED
61  }

					  


TCPEchoServer4.c

    Program setup and parameter parsing: lines 1–17

    We convert the port number from string to numeric value using atoi(); if the first argument is not a number, atoi() will return 0, which will cause an error later when we call bind().

    Socket creation and setup: lines 19–37

        Create a TCP socket: lines 20–22

        We create a stream socket just like we did in the client.

        Fill in desired endpoint address: lines 25–29

        On the server, we need to associate our server socket with an address and port number so that client connections get to the right place. Since we are writing for IPv4, we use a sockaddr_in structure for this. Because we don’t much care which address we are on (any one assigned to the machine the server is running on will be OK), we let the system pick it by specifying the wildcard address INADDR_ANY as our desired Internet address. (This is usually the right thing to do for servers, and it saves the server from having to find out any actual Internet address.) Before setting both address and port number in the sockaddr_in, we convert each to network byte order using htonl() and htons(). (See Section 5.1.2 for details.)

        Bind socket to specified address and port: lines 32–33

        As noted above, the server’s socket needs to be associated with a local address and port; the function that accomplishes this is bind(). Notice that while the client has to supply the server’s address to connect(), the server has to specify its own address to bind(). It is this piece of information (i.e., the server’s address and port) that they have to agree on to communicate; neither one really needs to know the client’s address. Note that bind() may fail for various reasons; one of the most important is that some other socket is already bound to the specified port (see Section 7.5). Also, on some systems special privileges are required to bind to certain ports (typically those with numbers less than 1024).

        Set the socket to listen: lines 36–37

        The listen() call tells the TCP implementation to allow incoming connections from clients. Before the call to listen(), any incoming connection requests to the socket’s address would be silently rejected—that is, the connect() would fail at the client.

    Iteratively handle incoming connections: lines 39–59

        Accept an incoming connection: lines 40–47

        As discussed above, a TCP socket on which listen() has been called is used differently than the one we saw in the client application. Instead of sending and receiving on the socket, the server application calls accept(), which blocks until an incoming connection is made to the listening socket’s port number. At that point, accept() returns a descriptor for a new socket, which is already connected to the initiating remote socket. The second argument points to a sockaddr_in structure, and the third argument is a pointer to the length of that structure. Upon success, the sockaddr_in contains the Internet address and port of the client to which the returned socket is connected; the address’s length has been written into the integer pointed to by the third argument. Note that the socket referenced by the returned descriptor is already connected; among other things this means it is ready for sending and receiving. (For details about what happens in the underlying implementation, see Section 7.4.1 in Chapter 7.)

        Report connected client: lines 51–56

        At this point clntAddr contains the address and port number of the connecting client; we provide a “Caller ID” function and print out the client’s information. As you might expect, inet_ntop() is the inverse of inet_pton(), which we used in the client. It takes the binary representation of the client’s address and converts it to a dotted-quad string. Because the implementation deals with ports and addresses in so-called network byte order (Section 5.1.2), we have to convert the port number before passing it to printf() (inet_pton() takes care of this transparently for addresses).

        Handle echo client: line 58

        HandleTCPClient() takes care of the “application protocol.” We discuss it below. Thus, we have factored out the “echo”-specific part of the server.

We have factored out the function that implements the “echo” part of our echo server. Although this application protocol only takes a few lines to implement, it’s good design practice to isolate its details from the rest of the server code. This promotes code reuse.

HandleTCPClient() receives data on the given socket and sends it back on the same socket, iterating as long as recv() returns a positive value (indicating that something was received). recv() blocks until something is received or the client closes the connection. When the client closes the connection normally, recv() returns 0. You can find HandleTCPClient() in the file TCPServerUtility.c.

HandleTCPClient()
Code View: Scroll / Show All

 1  void HandleTCPClient(int clntSocket) {
 2    char buffer[BUFSIZE]; // Buffer for echo string
 3
 4    // Receive message from client
 5    ssize_t numBytesRcvd = recv(clntSocket, buffer, BUFSIZE, 0);
 6    if (numBytesRcvd < 0)
 7      DieWithSystemMessage("recv() failed");
 8
 9      // Send received string and receive again until end of stream
10      while (numBytesRcvd > 0) { // 0 indicates end of stream
11        // Echo message back to client
12       ssize_t numBytesSent = send(clntSocket, buffer, numBytesRcvd, 0);
13       if (numBytesSent < 0)
14         DieWithSystemMessage("send() failed");
15       else if (numBytesSent != numBytesRcvd)
16         DieWithUserMessage("send()", "sent unexpected number of bytes");
17
18       // See if there is more data to receive
19       numBytesRcvd = recv(clntSocket, buffer, BUFSIZE, 0);
20       if (numBytesRcvd < 0)
21         DieWithSystemMessage("recv() failed");
22    }
23
24    close(clntSocket); // Close client socket
25  }

					  


HandleTCPClient()

Suppose we compile TCPEchoServer4.c, DieWithMessage.c, TCPServerUtility.c, and Address-Utility.c into the executable program TCPEchoServer4, and run that program on a host with Internet (IPv4) address 169.1.1.1, port 5000. Suppose also that we run our client on a host with Internet address 169.1.1.2 and connect it to the server. The server’s output should look like this:

     % TCPEchoServer4 5000
     Handling client 169.1.1.2


While the client’s output looks like this:

     % TCPEchoClient4 169.1.1.1 "Echo this!" 5000
     Received: Echo this!


The server binds its socket to port 5000 and waits for a connection request from the client. The client connects, sends the message “Echo this!” to the server, and receives the echoed response. In this command we have to supply TCPEchoClient with the port number on the command line because it is talking to our echo server, which is on port 5000 rather than the well-known port 7.

We have mentioned that a key principle for coding network applications using sockets is Defensive Programming: your code must not make assumptions about anything received over the network. What if you want to “play” with your TCP server to see how it responds to various incorrect client behaviors? You could write a TCP client that sends bogus messages and prints results; this, however, can be tedious and time-consuming. A quicker alternative is to use the telnet program available on most systems. This is a command-line tool that connects to a server, sends whatever text you type, and prints the response. Telnet takes two parameters: the server and port. For example, to telnet to our example echo server from above, try

     % telnet 169.1.1.1 5000


Now type your string to echo and telnet will print the server response. The behavior of telnet differs between implementations, so you may need to research the specifics of its use on your system.

Now that we’ve seen a complete client and server, let’s look at the individual functions that make up the Sockets API in a bit more detail.
```

## 9.3 Creating and Destroying Sockets

```text
To communicate using TCP or UDP, a program begins by asking the operating system to create an instance of the socket abstraction. The function that accomplishes this is socket(); its parameters specify the flavor of socket needed by the program.

int socket(int domain, int type, int protocol)


The first parameter determines the communication domain of the socket. Recall that the Sockets API provides a generic interface for a large number of communication domains; however, we are only interested in IPv4 (AF_INET) and IPv6 (AF_INET6). Note that you may see some programs use PF_XXX here instead of AF_XXX. Typically, these values are equal, in which case they are interchangeable, but this is (alas) not guaranteed.[1]

    [1] Truth be told, this is an ugly part of the Sockets interface, and the documentation is simply not helpful.

The second parameter specifies the type of the socket. The type determines the semantics of data transmission with the socket—for example, whether transmission is reliable, whether message boundaries are preserved, and so on. The constant SOCK_STREAM specifies a socket with reliable byte-stream semantics, whereas SOCK_DGRAM specifies a best-effort datagram socket.

The third parameter specifies the particular end-to-end protocol to be used. For both IPv4 and IPv6, we want TCP (identified by the constant IPPROTO_TCP) for a stream socket, or UDP (identified by IPPROTO_UDP) for a datagram socket. Supplying the constant 0 as the third parameter causes the system to select the default end-to-end protocol for the specified protocol family and type. Because there is currently only one choice for stream sockets in the TCP/IP protocol family, we could specify 0 instead of giving the protocol number explicitly. Someday, however, there might be other end-to-end protocols in the Internet protocol family that implement the same semantics. In that case, specifying 0 might result in the use of a different protocol, which might or might not be desirable. The main thing is to ensure that the communicating programs are using the same end-to-end protocol.

We said earlier that socket() returns a handle for the communication instance. On UNIX-derived systems, it is an integer: a nonnegative value for success and −1 for failure. A nonfailure value should be treated as an opaque handle, like a file descriptor. (In reality, it is a file descriptor, taken from the same space as the numbers returned by open().) This handle, which we call a socket descriptor, is passed to other API functions to identify the socket abstraction on which the operation is to be carried out.

When an application is finished with a socket, it calls close(), giving the descriptor for the socket that is no longer needed.

int close(int socket)


close() tells the underlying protocol stack to initiate any actions required to shut down communications and deallocate any resources associated with the socket. close() returns 0 on success or −1 on failure. Once close() has been called, invoking other operations (e.g., send() and recv()) on the socket results in an error.
```

## 9.4 Specifying Addresses

```text
Applications using sockets need to be able to identify the remote endpoint(s) with which they will communicate. We’ve already seen that a client must specify the address and port number of the server application with which it needs to communicate. In addition, the sockets layer sometimes needs to pass addresses to the application. For example, a feature analogous to “Caller ID” in the telephone network lets a server know the address and port number of each client that communicates with it.

In this section, we describe the data structures used as containers for this information by the Sockets API.
```

### 9.4.1 Generic Addresses

```text
The Sockets API defines a generic data type—the sockaddr structure—for specifying addresses associated with sockets:

     struct sockaddr {
         sa_family_t sa_family;  // Address family (e.g., AF_INET)
         char sa_data[14];       // Family-specific address information
     };


The first part of this address structure defines the address family—the space to which the address belongs. For our purposes, we will always use the system-defined constants AF_INET and AF_INET6, which specify the Internet address families for IPv4 and IPv6, respectively. The second part is a blob of bits whose exact form depends on the address family. (This is a typical way of dealing with heterogeneity in operating systems and networking.) As we discussed in Section 1.2, socket addresses for the Internet protocol family have two parts: a 32-bit (IPv4) or 128-bit (IPv6) Internet address and a 16-bit port number.[2]

    [2] The astute reader may have noticed that the generic sockaddr structure is not big enough to hold both a 16-byte IPv6 address and a 2-byte port number. We’ll deal with this difficulty shortly.
```

### 9.4.2 IPv4 Addresses

```text
The particular form of the sockaddr structure that is used for TCP/IP socket addresses depends on the IP version. For IPv4, use the sockaddr_in structure.

     struct in_addr {
         uint32_t s_addr;       // Internet address (32 bits)
     };

     struct sockaddr_in {
         sa_family_t sin_family;   // Internet protocol (AF_INET)
         in_port_t sin_port;       // Address port (16 bits)
         struct in_addr sin_addr;  // IPv4 address (32 bits)
         char sin_zero[8];         // Not used
     };


As you can see, the sockaddr_in structure has fields for the port number and Internet address in addition to the address family. It is important to understand that sockaddr_in is just a more detailed view of the data in a sockaddr structure, tailored to sockets using IPv4. Thus, we can fill in the fields of a sockaddr_in and then cast (a pointer to) it to a (pointer to a) sockaddr and pass it to the socket functions, which look at the sa_family field to learn the actual type, then cast back to the appropriate type.
```

### 9.4.3 IPv6 Addresses

```text
For IPv6, use the sockaddr_in6 structure.

     struct in_addr {
        uint32_t s_addr[16];        // Internet address (128 bits)
     };

     struct sockaddr_in6 {
         sa_family_t sin6_family;   // Internet protocol (AF_INET6)
         in_port_t sin6_port;       // Address port (16 bits)
         uint32_t sin6_flowinfo;    // Flow information
         struct in6_addr sin6_addr; // IPv6 address (128 bits)
         uint32_t sin6_scope_id;    // Scope identifier
     };


The sockaddr_in6 structure has additional fields beyond those of a sockaddr_in. These are intended for capabilities of the IPv6 protocol that are not commonly used. They will be (mostly) ignored in this book.

As with sockaddr_in, we must cast (a pointer to) the sockaddr_in6 to (a pointer to) a sockaddr in order to pass it to the various socket functions. Again, the implementation uses the address family field to determine the actual type of the argument.
```

### 9.4.4 Generic Address Storage

```text
If you know anything about how data structures are allocated in C, you may have already noticed that a sockaddr is not big enough to hold a sockaddr_in6. (If you don’t know anything about it, don’t fear: much of what you need to know will be covered in Chapter 5.) In particular, what if we want to allocate an address structure, but we don’t know the actual address type (e.g., IPv4 or IPv6)? The generic sockaddr won’t work because it’s too small for some address structures.[3] To solve this problem, the socket designers created the sockaddr_storage structure, which is guaranteed to be as large as any supported address type.

    [3] You may wonder why this is so (we do). The reasons apparently have to do with backward-compatibility: the Sockets API was first specified a long time ago, before IPv6, when resources were scarcer and there was no reason to have a bigger structure. Changing it now to make it bigger would apparently break binary-compatibility with some applications.

     struct sockaddr_storage {
        sa_family_t
        ...
        // Padding and fields to get correct length and alignment
        ...
     };


As with sockaddr, we still have the leading family field to determine the actual type of the address; however, with sockaddr_storage we have sufficient space for any address type. (For a hint about how this could be accomplished, refer to the discussion of how the C compiler lays out structures in memory, in Section 5.1.6.)

One final note on addresses. On some platforms, the address structures contain an additional field that stores the length of the address structure in bytes. For sockaddr, sockaddr_in, sockaddr_in6, and sockaddr_storage, the extra fields are called sa_len, sin_len, sin6_len, and ss_len, respectively. Since a length field is not available on all systems, avoid using it. Typically, platforms that use this form of structure define a value (e.g., SIN6_LEN) that can be tested for at compile time to see if the length field is present.
```

### 9.4.5 Binary/String Address Conversion

```text
For socket functions to understand addresses, they must be in “numeric” (i.e., binary) form; however, addresses for human use are generally “printable” strings (e.g., 192.168.1.1 or 1::1). We can convert addresses from printable string to numeric using the inet_pton() function (pton = printable to numeric):

int inet_pton(int addressFamily, const char *src, void *dst)


The first parameter, addressFamily, specifies the address family of the address being converted. Recall that the Sockets API provides a generic interface for a large number of communication domains. However, we are only interested here in IPv4 (AF_INET) and IPv6 (AF_INET6). The src parameter references a null-terminated character string containing the address to convert. The dst parameter points to a block of memory in the caller’s space to hold the result; its length must be sufficient to hold the result (at least 4 bytes for IPv4 and 16 bytes for IPv6). inet_pton() returns 1 if the conversion succeeds, with the address referenced by dst in network byte order; 0 if the string pointed to by src is not formatted as a valid address; and −1 if the specified address family is unknown.

We can go the other way, converting addresses from numeric to printable form, using inet_ntop() (ntop = numeric to printable):

const char *inet_ntop(int addressFamily, const void *src, char *dst, socklen_t dstBytes)


The first parameter, addressFamily, specifies the type of the address being converted. The second parameter src points to the first byte of a block of memory containing the numeric address to convert. The size of the block is determined by the address family. The dst parameter points to a buffer (block of memory) allocated in the caller’s space, into which the resulting string will be copied; its size is given by dstBytes. How do we know what size to make the block of memory? The system-defined constants INET_ADDRSTRLEN (for IPv4) and INET6_ADDRSTRLEN (for IPv6) indicate the longest possible resulting string (in bytes). inet_ntop() returns a pointer to the string containing the printable address (i.e., the third argument) if the conversion succeeds and NULL otherwise.
```

### 2.4.6. Getting a Socket’s Associated Addresses

```text
The system associates a local and foreign address with each connected socket (TCP or UDP). Later we’ll discuss the details of how these values are assigned. We can find out these addresses using getsockname() for the local address and getpeername() for the foreign address. Both methods return a sockaddr structure containing the Internet address and port information.

int getpeername(int socket, struct sockaddr *remoteAddress, socklen_t *addressLength)

int getsockname(int socket, struct sockaddr *localAddress, socklen_t *addressLength)


The socket parameter is the descriptor of the socket whose address information we want. The remoteAddress and localAddress parameters point to address structures into which the address information will be placed by the implementation; they are always cast to sockaddr * by the caller. If we don’t know the IP protocol version a priori, we should pass in a (pointer to a) sockaddr_storage to receive the result. As with other socket calls using sockaddr, the addressLength is an in-out parameter specifying the length of the buffer (input) and returned address structure (output) in bytes.
```

## 9.5 Connecting a Socket

```text
A TCP socket must be connected to another socket before any data can be sent through it. In this sense using TCP sockets is something like using the telephone network. Before you can talk, you have to specify the number you want, and a connection must be established; if the connection cannot be established, you have to try again later. The connection establishment process is the biggest difference between clients and servers: The client initiates the connection while the server waits passively for clients to connect to it. (For additional details about the connection process and how it relates to the API functions, see Section 7.4.) To establish a connection with a server, we call connect() on the socket.

int connect(int socket, const struct sockaddr *foreignAddress, socklen_t addressLength)


The first argument, socket, is the descriptor created by socket(). foreignAddress is declared to be a pointer to a sockaddr because the Sockets API is generic; for our purposes, it will always be a pointer to either a sockaddr_in or sockaddr_in6 containing the Internet address and port of the server. addressLength specifies the length of the address structure, typically given as sizeof(struct sockaddr_in) or sizeof(struct sockaddr_in6). When connect() returns, the socket is connected, and communication can proceed with calls to send() and recv().
```

## 9.6 Binding to an Address

```text
As we have noted already, client and server “rendezvous” at the server’s address and port. For that to work, the server must first be associated with that address and port. This is accomplished using bind(). Again, note that the client supplies the server’s address to connect(), but the server has to specify its own address to bind(). Neither client nor server application needs to know the client’s address in order for them to communicate. (Of course, the server may wish to know the client’s address for logging or other purposes.)

int bind(int socket, struct sockaddr *localAddress, socklen_t addressSize)


The first parameter is the descriptor returned by an earlier call to socket(). As with connect(), the address parameter is declared as a pointer to a sockaddr, but for TCP/IP applications, it will always point to a sockaddr_in (for IPv4) or sockaddr_in6 (for IPv6), containing the Internet address of the local interface and the port to listen on. The addressSize parameter is the size of the address structure. bind() returns 0 on success and −1 on failure.

It is important to realize that it is not possible for a program to bind a socket to an arbitrary Internet address—if a specific Internet address is given (of either type), the call will only succeed if that address is assigned to the host on which the program is running. A server on a host with multiple Internet addresses might bind to a specific one because it only wants to accept connections that arrive to that address. Typically, however, the server wants to accept connections sent to any of the host’s addresses, and so sets the address part of the sockaddr to the “wildcard” address INADDR_ANY for IPv4 or in6addr_any for IPv6. The semantics of the wildcard address are that it matches any specific address. For a server, this means that it will receive connections addressed to any of the host’s addresses (of the specified type).

While bind() is mostly used by servers, a client can also use bind() to specify its local address/port. For those TCP clients that don’t pick their own local address/port with bind(), the local Internet address and port are determined during the call to connect(). Thus, a client must call bind() before calling connect() if it is going to use it.

You can initialize a in6_addr structure to the wildcard address with IN6ADDR_ANY_INIT; however, this special constant may only be used as an “initializer” in a declaration. Note well that while INADDR_ANY is defined to be in host byte order and, consequently, must be converted to network byte order with htonl() before being used as an argument to bind(), in6addr_any and IN6ADDR_ANY_INIT are already in network byte order.

Finally, if you supply the port number 0 to bind(), the system will select an unused local port for you.
```

## 9.7 Handling Incoming Connections

```text
After binding, the server socket has an address (or at least a port). Another step is required to instruct the underlying protocol implementation to listen for connections from clients; this is done by calling listen() on the socket.

int listen(int socket, int queueLimit)


The listen() function causes internal state changes to the given socket, so that incoming TCP connection requests will be processed and then queued for acceptance by the program. (Section 7.4 in Chapter 7 has more details about the life cycle of a TCP connection.) The queue-Limit parameter specifies an upper bound on the number of incoming connections that can be waiting at any time. The precise effect of queueLimit is very system dependent, so consult your local system’s technical specifications.[4] listen() returns 0 on success and −1 on failure.

    [4] For information about using “man” pages, see the preface.

Once a socket is configured to listen, the program can begin accepting client connections on it. At first it might seem that a server should now wait for a connection on the socket that it has set up, send and receive through that socket, close it, and then repeat the process. However, that is not the way it works. The socket that has been bound to a port and marked “listening” is never actually used for sending and receiving. Instead, it is used as a way of getting new sockets, one for each client connection; the server then sends and receives on the new sockets. The server gets a socket for an incoming client connection by calling accept().

int accept(int socket, struct sockaddr *clientAddress, socklen_t *addressLength)


This function dequeues the next connection on the queue for socket. If the queue is empty, accept() blocks until a connection request arrives. When successful, accept() fills in the sockaddr structure pointed to by clientAddress, with the address and port of the client at the other end of the connection. Upon invocation, the addressLength parameter should specify the size of the structure pointed to by clientAddress (i.e., the space available); upon return it contains the size of the actual address returned. A common beginner mistake is to fail to initialize the integer that addressLength points to so it contains the length of the structure that clientAddress points to. The following shows the correct way:

     struct sockaddr_storage address;
     socklen_t addrLength = sizeof(address);
     int newConnection = accept(sock, &address, &addrLength);


AQ1

If successful, accept() returns a descriptor for a new socket that is connected to the client. The socket passed as the first parameter to accept() is unchanged (not connected to the client) and continues to listen for new connection requests. On failure, accept() returns −1. On most systems, accept() only fails when passed a bad socket descriptior. However, on some platforms it may return an error if the new socket has experienced a network-level error after being created and before being accepted.
```

## 9.8 Communication

```text
Once a socket is “connected,” you can begin sending and receiving data. As we’ve seen, a client creates a connected socket by calling connect(), and a connected socket is returned by accept() on a server. After connection, the distinction between client and server effectively disappears, at least as far as the Sockets API is concerned. Through a connected TCP socket, you can communicate using send() and recv().

ssize_t send(int socket, const void *msg, size_t msgLength, int flags)

ssize_t recv(int socket, void *rcvBuffer, size_t bufferLength, int flags)


These functions have very similar arguments. The first parameter socket is the descriptor for the connected socket through which data is to be sent or received. For send(), msg points to the sequence of bytes to be sent, and msgLength is the number of bytes to send. The default behavior for send() is to block until all of the data is sent. (We revisit this behavior in Section 6.3 and Chapter 7.) For recv(), rcvBuffer points to the buffer—that is, an area in memory such as a character array—where received data will be placed, and bufferLength gives the length of the buffer, which is the maximum number of bytes that can be received at once. The default behavior for recv() is to block until at least some bytes can be transferred. (On most systems, the minimum amount of data that will cause the caller of recv() to unblock is 1 byte.)

The flags parameter in both send() and recv() provides a way to change some aspects of the default behavior of the socket call. Setting flags to 0 specifies the default behavior. send() and recv() return the number of bytes sent or received or −1 for failure. (See also Section 6.3.)

Remember: TCP is a byte-stream protocol, so send() boundaries are not preserved. The number of bytes read in a single call to recv on the receiver is not necessarily determined by the number of bytes written by a single call to send(). If you call send() with 3000 bytes, it may take several calls to recv() to get all 3000 bytes, even if you pass a 5000-byte buffer to each recv() call. If you call send() with 100 bytes four times, you might receive all 400 bytes with a single call to recv(). A common mistake when writing TCP socket applications involves assuming that if you write all of the data with one send() you can read it all with one recv(). All these possibilities are illustrated in Chapter 7.
```

## 9.9 Using IPv6

```text
So far, we’ve seen a client and server that work only with IPv4. What if you want to use IPv6? The changes are relatively minor and basically involve using the IPv6 equivalents for the address structure and constants. Let’s look at the IPv6 version of our TCP echo server.

TCPEchoServer6.c
Code View: Scroll / Show All

 1  #include <stdio.h>
 2  #include <stdlib.h>
 3  #include <string.h>
 4  #include <sys/types.h>
 5  #include <sys/socket.h>
 6  #include <netinet/in.h>
 7  #include <arpa/inet.h>
 8  #include "Practical.h"
 9
10  static const int MAXPENDING = 5; // Maximum outstanding connection requests
11
12  int main(int argc, char *argv[]) {
13
14    if (argc != 2) // Test for correct number of arguments
15      DieWithUserMessage("Parameter(s)", "<Server Port>");
16
17    in_port_t servPort = atoi(argv[1]); // First arg:   local port
18
19    // Create socket for incoming connections
20    int servSock = socket(AF_INET6, SOCK_STREAM, IPPROTO_TCP);
21    if (servSock < 0)
22      DieWithSystemMessage("socket() failed");
23
24    // Construct local address structure
25    struct sockaddr_in6 servAddr;           // Local address
26    memset(&servAddr, 0, sizeof(servAddr)); // Zero out structure
27    servAddr.sin6_family = AF_INET6;        // IPv6 address family
28    servAddr.sin6_addr = in6addr_any;       // Any incoming interface
29    servAddr.sin6_port = htons(servPort);   // Local port
30
31    // Bind to the local address
32    if (bind(servSock, (struct sockaddr *) &servAddr, sizeof(servAddr)) < 0)
33      DieWithSystemMessage("bind() failed");
34
35    // Mark the socket so it will listen for incoming connections
36    if (listen(servSock, MAXPENDING) < 0)
37      DieWithSystemMessage("listen() failed");
38
39    for (;;) { // Run forever
40      struct sockaddr_in6 clntAddr; // Client address
41      // Set length of client address structure (in-out parameter)
42      socklen_t clntAddrLen = sizeof(clntAddr);
43
44      // Wait for a client to connect
45      int clntSock = accept(servSock, (struct sockaddr *) &clntAddr, &clntAddrLen);
46      if (clntSock < 0)
47        DieWithSystemMessage("accept() failed");
48
49      // clntSock is connected to a client!
50
51      char clntName[INET6_ADDRSTRLEN]; // Array to contain client address string
52      if (inet_ntop(AF_INET6, &clntAddr.sin6_addr.s6_addr, clntName,
53          sizeof(clntName)) != NULL)
54        printf("Handling client %s/%d\n", clntName, ntohs(clntAddr.sin6_port));
55      else
56        puts("Unable to get client address");
57
58      HandleTCPClient(clntSock);
59    }
60    // NOT REACHED
61  }

					  


TCPEchoServer6.c

    Socket creation: lines 19–22

    We construct an IPv6 socket by specifying the communication domain as AF_INET6.

    Fill in local address: lines 24–29

    For the local address, we use the IPv6 (struct sockaddr_in6) address structure and constants (AF_INET6 and in6addr_any). One subtle difference is that we do not have to convert in6addr_any to network byte order as we did with INADDR_ANY.

    Report connected client: lines 51–56

    clntAddr, which contains the address of the connecting client, is declared as an IPv6 socket address structure. When we convert the numeric address representation to a string, the maximum string length is now INET6_ADDRSTRLEN. Finally, our call to inet_ntop() uses an IPv6 address.

You’ve now seen both IPv4- and IPv6-specific clients and servers. In Chapter 3 we will see how they can be made to work with either type of address.
```

## 9.10 Non blocking I/O

```text
The default behavior of a socket call is to block until the requested action is completed. For example, the recv() function in TCPEchoClient.c (page 44) does not return until at least one message from the echo server is received. Of course, a process with a blocked function is suspended by the operating system.

A socket call may block for several reasons. Data reception functions (recv() and recvfrom()) block if data is not available. A send() on a TCP socket may block if there is not sufficient space to buffer the transmitted data (see Section 7.1). Connection-related functions for TCP sockets block until a connection has been established. For example, accept() in TCPEchoServer.c (page 48) blocks until a client establishes a connection with connect(). Long round-trip times, high error rate connections, or a slow (or deceased) server may cause a call to connect() to block for a significant amount of time. In all of these cases, the function returns only after the request has been satisfied.

What about a program that has other tasks to perform while waiting for call completion (e.g., update busy cursor or respond to user requests)? These programs may have no time to wait on a blocked system call. What about lost UDP datagrams? In UDPEchoClient.c (page 54), the client sends a datagram to the server and then waits to receive a response. If either the datagram sent from the client or the echoed datagram from the server is lost, our echo client blocks indefinitely. In this case, we need recvfrom() to unblock after some amount of time to allow the client to handle the datagram loss. Fortunately, several mechanisms are available for controlling unwanted blocking behaviors. We deal with three such solutions here: nonblocking sockets, asynchronous I/O, and timeouts.
```

### 9.10.1 Nonblocking Sockets

```text
One obvious solution to the problem of undesirable blocking is to change the behavior of the socket so that all calls are nonblocking. For such a socket, if a requested operation can be completed immediately, the call’s return value indicates success; otherwise it indicates failure (usually −1). In either case the call does not block indefinitely. In the case of failure, we need the ability to distinguish between failure due to blocking and other types of failures. If the failure occurred because the call would have blocked, the system sets errno to EWOULDBLOCK,[2] except for connect(), which returns an errno of EINPROGRESS.

    [2] Some sockets implementations return EAGAIN. On many systems, EAGAIN and EWOULDBLOCK are the same error number.

We can change the default blocking behavior with a call to fcntl() (“file control”).

int fcntl(int socket, int command, ...)


As the name suggests, this call can be used with any kind of file: socket must be a valid file (or socket) descriptor. The operation to be performed is given by command, which is always a system-defined constant. The behavior we want to modify is controlled by flags (not the same as socket options) associated with the descriptor, which we can get and set with the F_GETFL and F_SETFL commands. When setting the socket flags, we must specify the new flags in a variable-length argument list. The flag that controls nonblocking behavior is O_NONBLOCK. When getting the socket flags, the variable-length argument list is empty. We demonstrate the use of a nonblocking socket in the next section, where we describe asynchronous I/O in UDPEchoServer-SIGIO.c (page 109).

There are a few exceptions to this model of nonblocking sockets. For UDP sockets, there are no send buffers, so send() and sendto() never return EWOULDBLOCK. For all but the connect() socket call, the requested operation either completes before returning or none of the operation is performed. For example, recv() either receives data from the socket or returns an error. A nonblocking connect() is different. For UDP, connect() simply assigns a destination address for future data transmissions so that it never blocks. For TCP, connect() initiates the TCP connection setup. If the connection cannot be completed without blocking, connect() returns an error, setting errno to EINPROGRESS, indicating that the socket is still working on making the TCP connection. Of course, subsequent data sends and receives cannot happen until the connection is established. Determining when the connection is complete is beyond the scope of this text,[3] so we recommend not setting the socket to nonblocking until after the call to connect().

    [3] Well, mostly. Connection completion can be detected using the select() call, described in Section 6.5.

For eliminating blocking during individual send and receive operations, an alternative is available on some platforms. The flags parameter of send(), recv(), sendto(), and recvfrom() allows for modification of some aspects of the behavior on a particular call. Some implementations support the MSG_DONTWAIT flag, which causes nonblocking behavior in any call where it is set in flags.
```

### 9.10.2 Asynchronous I/O

```text
The difficulty with nonblocking socket calls is that there is no way of knowing when one would succeed, except by periodically trying it until it does (a process known as “polling”). Why not have the operating system inform the program when a socket call will be successful? That way the program can spend its time doing other work until notified that the socket is ready for something to happen. This is called asynchronous I/O, and it works by having the SIGIO signal delivered to the process when some I/O–related event occurs on the socket.

Arranging for SIGIO involves three steps. First, we inform the system of the desired disposition of the signal using sigaction(). Then we ensure that signals related to the socket will be delivered to this process (because multiple processes can have access to the same socket, there might be ambiguity about which should get it) by making it the owner of the socket, using fcntl(). Finally, we mark the socket as being primed for asynchronous I/O by setting a flag (FASYNC), again via fcntl().

In our next example, we adapt UDPEchoServer.c (page 57) to use asynchronous I/O with nonblocking socket calls. The modified server is able to perform other tasks when there are no clients needing an echo. After creating and binding the socket, instead of calling recvfrom() and blocking until a datagram arrives, the asynchronous echo server establishes a signal handler for SIGIO and begins doing other work. When a datagram arrives, the SIGIO signal is delivered to the process, triggering execution of the handler function. The handler function calls recvfrom(), echoes back any received datagrams, and then returns, whereupon the main program continues whatever it was doing. Our description details only the code that differs from the original UDP echo server.

UDPEchoServer–SIGIO.c
Code View: Scroll / Show All

  1      #include <stdio.h>
  2      #include <stdlib.h>
  3      #include <string.h>
  4      #include <unistd.h>
  5      #include <fcntl.h>
  6      #include <sys/file.h>
  7      #include <signal.h>
  8      #include <errno.h>
  9      #include <sys/types.h>
 10      #include <sys/socket.h>
 11      #include <netdb.h>
 12      #include "Practical.h"
 13
 14      void UseIdleTime();                // Execution during idle time
 15      void SIGIOHandler(int signalType); // Handle SIGIO
 16
 17      int servSock; // Socket -- GLOBAL for signal handler
 18
 19      int main(int argc, char *argv[]) {
 20
 21      if (argc != 2) // Test for correct number of arguments
 22      DieWithUserMessage("Parameter(s)", "<Server Port/Service>");
 23
 24      char *service = argv[1]; // First arg:   local port
 25
 26      // Construct the server address structure
 27      struct addrinfo addrCriteria;                   // Criteria for address
 28      memset(&addrCriteria, 0, sizeof(addrCriteria)); // Zero out structure
 29      addrCriteria.ai_family = AF_UNSPEC;             // Any address family
 30      addrCriteria.ai_flags = AI_PASSIVE;             // Accept on any address/port
 31      addrCriteria.ai_socktype = SOCK_DGRAM;          // Only datagram sockets
 32      addrCriteria.ai_protocol = IPPROTO_UDP;         // Only UDP protocol
 33
 34      struct addrinfo *servAddr; // List of server addresses
 35      int rtnVal = getaddrinfo(NULL, service, &addrCriteria, &servAddr);
 36      if (rtnVal != 0)
 37       DieWithUserMessage("getaddrinfo() failed", gai_strerror(rtnVal));
 39      // Create socket for incoming connections
 40      servSock = socket(servAddr->ai_family, servAddr->ai_socktype,
 41          servAddr->ai_protocol);
 42      if (servSock < 0)
 43        DieWithSystemMessage("socket() failed");
 44
 45      // Bind to the local address
 46      if (bind(servSock, servAddr->ai_addr, servAddr->ai_addrlen) < 0)
 47        DieWithSystemMessage("bind() failed");
 48
 49      // Free address list allocated by getaddrinfo()
 50      freeaddrinfo(servAddr);
 51
 52      struct sigaction handler;
 53      handler.sa_handler = SIGIOHandler; // Set signal handler for SIGIO
 54      // Create mask that mask all signals
 55      if (sigfillset(&handler.sa_mask) < 0)
 56        DieWithSystemMessage("sigfillset() failed");
 57      handler.sa_flags = 0;      // No flags
 58
 59      if (sigaction(SIGIO, &handler, 0) < 0)
 60        DieWithSystemMessage("sigaction() failed for SIGIO");
 61
 62      // We must own the socket to receive the SIGIO message
 63      if (fcntl(servSock, F_SETOWN, getpid()) < 0)
 64        DieWithSystemMessage("Unable to set process owner to us");
 65
 66      // Arrange for nonblocking I/O and SIGIO delivery
 67      if (fcntl(servSock, F_SETFL, O_NONBLOCK | FASYNC) < 0)
 68        DieWithSystemMessage(
 69           "Unable to put client sock into non-blocking/async mode");
 70
 71      // Go off and do real work; echoing happens in the background
 72
 73      for (;;)
 74        UseIdleTime();
 75      // NOT REACHED
 76  }
 77
 78    void UseIdleTime() {
 79      puts(".");
 80      sleep(3); // 3 seconds of activity
 81  }
 82
 83    void SIGIOHandler(int signalType) {
 84      ssize_t numBytesRcvd;
 85      do { // As long as there is input...
 86        struct sockaddr_storage clntAddr;   // Address of datagram source
 87        size_t clntLen = sizeof(clntAddr);  // Address length in-out parameter
 88        char buffer[MAXSTRINGLENGTH];       // Datagram buffer
 89
 90        numBytesRcvd = recvfrom(servSock, buffer, MAXSTRINGLENGTH, 0,
 91            (struct sockaddr *) &clntAddr, &clntLen);
 92        if (numBytesRcvd < 0) {
 93            // Only acceptable error: recvfrom() would have blocked
 94            if (errno != EWOULDBLOCK)
 95              DieWithSystemMessage("recvfrom() failed");
 96       } else {
 97         fprintf(stdout, "Handling client ");
 98         PrintSocketAddress((struct sockaddr *) &clntAddr, stdout);
 99         fputc('\n', stdout);
100
101         ssize_t numBytesSent = sendto(servSock, buffer, numBytesRcvd, 0,
102             (struct sockaddr *) &clntAddr, sizeof(clntAddr));
103         if (numBytesSent < 0)
104           DieWithSystemMessage("sendto() failed");
105         else if (numBytesSent != numBytesRcvd)
106            DieWithUserMessage("sendto()", "sent unexpected number of bytes");
107      }
108    } while (numBytesRcvd >= 0);
109    // Nothing left to receive
110  }

					  


UDPEchoServer–SIGIO.c

    Program setup and parameter parsing: lines 1–24

    Prototypes for signal and idle time handler: lines 14–15

    UseIdleTime() simulates the other tasks of the UDP echo server. SIGIOHandler() handles SIGIO signals. Note well: UseIdleTime() must be prepared for any “slow” system calls—such as reading from a terminal device—to return −1 as a result of the SIGIO signal being delivered and handled (in which case it should simply verify that errno is EINTR and resume whatever it was doing).

    Server socket descriptor: line 17

    We give the socket descriptor a global scope so that it can be accessed by the SIGIO handler function.

    Set up signal handling: lines 52–69 handler is the sigaction structure that describes our desired signal-handling behavior. We fill it in, giving the address of the handling routine and the set of signals we want blocked.

        Fill in the pointer to the desired handler: line 53

        Specify signals to be blocked during handling: lines 55–56

        Specify how to handle the SIGIO signal: lines 59–60

        Arrange for SIGIO to go to this process: lines 63–64

        The F_SETOWN command identifies the process to receive SIGIO for this socket.

        Set flags for nonblocking and asynchronous I/O: lines 67–69

        Finally, we mark the socket (with the FASYNC flag[4]) to indicate that asynchronous I/O is in use, so SIGIO will be delivered on packet arrival. (Everything up to this point was just saying how to deal with SIGIO.) Because we do not want SIGIOHandler() to block in recvfrom(), we also set the O_NONBLOCK flag.

            [4] The name may be different (e.g., O_ASYNC) on some platforms.

    Run forever using idle time when available: lines 73–74

    Perform nonechoing server tasks: lines 78–81

    Handle asynchronous I/O: lines 83–110

    This code is very similar to the loop in our earlier UDPEchoServer.c (page 57). One difference is that here we loop until there are no more pending echo requests to satisfy and then return; this technique enables the main program thread to continue what it was doing.

        Receive echo request: lines 90–99

        The first call to recvfrom() receives the datagram whose arrival prompted the SIGIO signal. Additional datagrams may arrive during execution of the handler, so the do/while loop continues to call recvfrom() until no more datagrams remain to be received. Because sock is a nonblocking socket, recvfrom() then returns −1 with errno set to EWOULDBLOCK, terminating the loop and the handler function.

        Send echo reply: lines 101–106

        Just as in the original UDP echo server, sendto() repeats the message back to the client.
```

### 9.10.3 Timeouts

```text
In the previous subsection, we relied on the system to notify our program of the occurrence of an I/O–related event. Sometimes, however, we may actually need to know that some I/O event has not happened for a certain time period. For example, we have already mentioned that UDP messages can be lost; in case of such a loss, our UDP echo client (or any other client that uses UDP, for that matter) will never receive a response to its request. Of course, the client cannot tell directly whether a loss has occurred, so it sets a limit on how long it will wait for a response. For example, the UDP echo client might assume that if the server has not responded to its request within two seconds, the server will never respond. The client’s reaction to this two-second timeout might be to give up or to try again by resending the request.

The standard method of implementing timeouts is to set an alarm before calling a blocking function.

unsigned int alarm(unsigned int secs)


alarm() starts a timer, which expires after the specified number of seconds (secs); alarm() returns the number of seconds remaining for any previously scheduled alarm (or 0 if no alarm was scheduled). When the timer expires, a SIGALRM signal is sent to the process, and the handler function for SIGALRM, if any, is executed.

The code we showed earlier in UDPEchoClient.c (page 54) has a problem if either the echo request or the response is lost: The client blocks indefinitely on recvfrom(), waiting for a datagram that will never arrive. Our next example program, UDPEchoClient-Timeout.c, modifies the original UDP echo client to retransmit the request message if a response from the echo server is not received within a time limit of two seconds. To implement this, the new client installs a handler for SIGALRM, and just before calling recvfrom(), it sets an alarm for two seconds. At the end of that interval of time, the SIGALRM signal is delivered, and the handler is invoked. When the handler returns, the blocked recvfrom() returns −1 with errno equal to EINTR. The client then resends the echo request to the server. This timeout and retransmission of the echo request happens up to five times before the client gives up and reports failure. Our program description only details the code that differs from the original UDP echo client.

UDPEchoClient–Timeout.c
Code View: Scroll / Show All

  1    #include <stdio.h>
  2    #include <stdlib.h>
  3    #include <string.h>
  4    #include <unistd.h>
  5    #include <errno.h>
  6    #include <signal.h>
  7    #include <sys/socket.h>
  8    #include <netinet/in.h>
  9    #include <netdb.h>
 10    #include "Practical.h"
 11
 12    static const unsigned int TIMEOUT_SECS = 2; // Seconds between retransmits
 13    static const unsigned int MAXTRIES = 5;     // Tries before giving up
 14
 15    unsigned int tries = 0; // Count of times sent - GLOBAL for signal-handler access
 16
 17    void CatchAlarm(int ignored); // Handler for SIGALRM
 18
 19    int main(int argc, char *argv[]) {
 20
 21      if ((argc < 3) || (argc > 4)) // Test for correct number of arguments
 22       DieWithUserMessage("Parameter(s)",
 23           "<Server Address/Name> <Echo Word> [<Server Port/Service>]\n");
 24
 25      char *server = argv[1];         // First arg: server address/name
 26      char *echoString = argv[2];     // Second arg: word to echo
 27
 28      size_t echoStringLen = strlen(echoString);
 29      if (echoStringLen > MAXSTRINGLENGTH)
 30       DieWithUserMessage(echoString, "too long");
 31
 32      char *service = (argc == 4) ? argv[3] : "echo";
 33
 34      // Tell the system what kind(s) of address info we want
 35      struct addrinfo addrCriteria;                   // Criteria for address
 36      memset(&addrCriteria, 0, sizeof(addrCriteria)); // Zero out structure
 37      addrCriteria.ai_family = AF_UNSPEC;             // Any address family
 38      addrCriteria.ai_socktype = SOCK_DGRAM;          // Only datagram sockets
 39      addrCriteria.ai_protocol = IPPROTO_UDP;         // Only UDP protocol
 40
 41      // Get address(es)
 42      struct addrinfo *servAddr; // Holder for returned list of server addrs
 43      int rtnVal = getaddrinfo(server, service, &addrCriteria, &servAddr);
 44      if (rtnVal != 0)
 45       DieWithUserMessage("getaddrinfo() failed", gai_strerror(rtnVal));
 46
 47      // Create a reliable, stream socket using TCP
 48      int sock = socket(servAddr->ai_family, servAddr->ai_socktype,
 49          servAddr->ai_protocol); // Socket descriptor for client
 50      if (sock < 0)
 51       DieWithSystemMessage("socket() failed");
 52
 53      // Set signal handler for alarm signal
 54      struct sigaction handler; // Signal handler
 55      handler.sa_handler = CatchAlarm;
 56      if (sigfillset(&handler.sa_mask) < 0) // Block everything in handler
 57       DieWithSystemMessage("sigfillset() failed");
 58      handler.sa_flags = 0;
 59
 60      if (sigaction(SIGALRM, &handler, 0) < 0)
 61       DieWithSystemMessage("sigaction() failed for SIGALRM");
 62
 63      // Send the string to the server
 64      ssize_t numBytes = sendto(sock, echoString, echoStringLen, 0,
 65          servAddr->ai_addr, servAddr->ai_addrlen);
 66      if (numBytes < 0)
 67       DieWithSystemMessage("sendto() failed");
 68      else if (numBytes != echoStringLen)
 69        DieWithUserMessage("sendto() error", "sent unexpected number of bytes");
 70
 71      // Receive a response
 72
 73      struct sockaddr_storage fromAddr; // Source address of server
 74      // Set length of from address structure (in-out parameter)
 75      socklen_t fromAddrLen = sizeof(fromAddr);
 76      alarm(TIMEOUT_SECS); // Set the timeout
 77      char buffer[MAXSTRINGLENGTH + 1]; // I/O buffer
 78      while ((numBytes = recvfrom(sock, buffer, MAXSTRINGLENGTH, 0,
 79          (struct sockaddr *) &fromAddr, &fromAddrLen)) < 0) {
 80        if (errno == EINTR) {         // Alarm went off
 81          if (tries < MAXTRIES) { // Incremented by signal handler
 82           numBytes = sendto(sock, echoString, echoStringLen, 0,
 83              (struct sockaddr *) servAddr->ai_addr, servAddr->ai_addrlen);
 84           if (numBytes < 0)
 85             DieWithSystemMessage("sendto() failed");
 86           else if (numBytes != echoStringLen)
 87             DieWithUserMessage("sendto() error", "sent unexpected number of bytes");
 88           } else
 89               DieWithUserMessage("No Response", "unable to communicate with server");
 90        } else
 91          DieWithSystemMessage("recvfrom() failed");
 92      }
 93
 94      // recvfrom() got something -- cancel the timeout
 95      alarm(0);
 96
 97      buffer[echoStringLen] = '\0';         // Null-terminate the received data
 98      printf("Received: %s\n", buffer); // Print the received data
 99
100     close(sock);
101     exit(0);
102   }
103
104    // Handler for SIGALRM
105    void CatchAlarm(int ignored) {
106         tries += 1;
107    }

					  


UDPEchoClient–Timeout.c

    Program setup and parameter parsing: lines 1–32

    Timeout setup: lines 12–17

    tries is a global variable so that it can be accessed in the signal handler.

    Establish signal handler for SIGALRM: lines 53–61

    This is similar to what we did for SIGIO in UDPEchoServer-SIGIO.c.

    Start the alarm timer: line 76

    When/if the alarm timer expires, the handler CatchAlarm() will be invoked.

    Retransmission loop: lines 78–92

    We have to loop here because the SIGALRM will cause the recvfrom() to return −1. When that happens, we decide whether or not it was a timeout and, if so, retransmit.

        Attempt reception: lines 78–79

        Discover the reason for recvfrom() failure: lines 80–91

        If errno equals EINTR, recvfrom() returned because it was interrupted by the SIGALRM while waiting for datagram arrival and not because we got a packet. In this case we assume either the echo request or reply is lost. If we have not exceeded the maximum number of retransmission attempts, we retransmit the request to the server; otherwise, we report a failure. After retransmission, we reset the alarm timer to wake us again if the timeout expires.

    Handle echo response reception: lines 95–98

        Cancel the alarm timer: line 95

        Ensure that message is null-terminated: line 97

        printf() will output bytes until it encounters a null byte, so we need to make sure one is present (otherwise, our program may crash).

        Print the received message: line 98
```

## 9.11 Select() server example

```text
Applying select(2) to a Server

The preceding text has described the select(2) function in some detail. Now it's time to put the function to work in an example. The next modified example of the RPN calculating server will make use of the select(2) function call for read events only. This limitation was imposed to keep the programming example relatively short and simple to understand. The limitations of this demonstration will be discussed in more detail later.

The RPN server required a few modifications to the engine module rpneng.c, which are reflected in the new source module rpneng2.c. Rather than re-list the entire module, only the minor changes are shown in the context diff of Listing 11.4.
Listing 11.4. rpneng2.c—diff -c rpneng.c rpneng2.c

Code View: Scroll / Show All

$ diff -c rpneng.c rpneng2.c
*** rpneng.c    Mon Sep 13 22:13:56 1999
--- rpneng2.c   Wed Sep 15 21:55:20 1999
***************
*** 18,25 ****
   * RPN Stack:
   */
  #define MAX_STACK       32
! static mpz_t *stack[MAX_STACK];
! static int sp = 0;

  /*
   * Allocate a new mpz_t value:
--- 18,25 ----
   * RPN Stack:
   */
  #define MAX_STACK       32
! mpz_t **stack;
! int sp = 0;

  /*
   * Allocate a new mpz_t value:
***************
*** 45,51 ****
  /*
   * Free an allocated mpz_t value:
   */
! static void
  rpn_free(mpz_t **v) {
      mpz_clear(**v);
      free(*v);
--- 45,51 ----
  /*
   * Free an allocated mpz_t value:
   */
! void
  rpn_free(mpz_t **v) {
      mpz_clear(**v);
      free(*v);
$


					  


The major change that is present in the rpneng2.c module is that the RPN stack array (variable stack) and its stack pointer (variable sp) are declared to be external in scope. Static function rpn_free() is made external also. This allows the variables and the function to be accessed from the main source module, which you'll examine in the example in Listing 11.5.
Listing 11.5. rpnsrv2.c—The RPN Server Using select(2)

Code View: Scroll / Show All

1:   /* rpnsrv2.c:
2:    *
3:    * Example RPN Server
4:    * using select(2):
5:    */
6:   #include <stdio.h>
7:   #include <unistd.h>
8:   #include <stdlib.h>
9:   #include <errno.h>
10:  #include <string.h>
11:  #include <time.h>
12:  #include <sys/time.h>
13:  #include <sys/types.h>
14:  #include <sys/socket.h>
15:  #include <netinet/in.h>
16:  #include <arpa/inet.h>
17:  #include <netdb.h>
18:  #include <sys/wait.h>
19:  #include <gmp.h>
20:
21:  #ifndef SHUT_RDWR
22:  #define SHUT_RDWR 3
23:  #endif
24:
25:  extern int mkaddr(void *addr,
26:      int *addr_len,
27:      char *input_address,
28:      char *protocol);
29:
30:  extern void rpn_process(FILE *tx,
31:      char *buf);
32:
33:  extern void rpn_free(mpz_t **v);
34:
35:  #define MAX_STACK       32
36:  #define MAX_CLIENTS     64
37:
38:  /*
39:   * Declared in rpneng2.c:
40:   */
41:  extern mpz_t **stack;
42:  extern int sp;
43:
44:  /*
45:   * Client context Info:
46:   */
47:  typedef struct {
48:      mpz_t   **stack;  /* Stack Array */
49:      int     sp;          /* Stack ptr */
50:      FILE    *rx;         /* Recv FILE */
51:      FILE    *tx;         /* Xmit FILE */
52:  } ClientInfo;
53:
54:  ClientInfo client[MAX_CLIENTS];
55:
56:  /*
57:   * This function reports the error and
58:   * exits back to the shell:
59:   */
60:  static void
61:  bail(const char *on_what) {
62:      if ( errno != 0 ) {
63:          fputs(strerror(errno),stderr);
64:          fputs(": ",stderr);
65:      }
66:      fputs(on_what,stderr);
67:      fputc('\n',stderr);
68:      exit(1);
69:  }
70:
71:  /*
72:   * Process client c:
73:   */
74:  static int
75:  process_client(int c) {
76:      char buf[4096];          /* I/O Buffer */
77:      FILE *rx = client[c].rx;
78:      FILE *tx = client[c].tx;
79:
80:      /*
81:       * Install correct RPN stack:
82:       */
83:      stack = client[c].stack;
84:      sp = client[c].sp;
85:
86:      /*
87:       * If not EOF, process one line:
88:       */
89:      if ( !feof(rx)
90:        && fgets(buf,sizeof buf,rx) )
91:          rpn_process(tx,buf);
92:
93:      if ( !feof(rx) ) {
94:          /* Save SP and exit */
95:          client[c].sp = sp;  
96:          return 0;
97:      }
98:
99:      /*
100:      * Close this client's connection:
101:      */
102:     fclose(tx);
103:     shutdown(fileno(rx),SHUT_RDWR);
104:     fclose(rx);
105:
106:     client[c].rx = client[c].tx = NULL;
107:
108:     while ( sp > 0 )
109:         rpn_free(&stack[--sp]);
110:     free(stack);
111:
112:     client[c].stack = NULL;
113:     client[c].sp = 0;
114:
115:     return EOF;
116: }
117:
118: /*
119:  * Main program:
120:  */   
121: int
122: main(int argc,char **argv) {
123:     int z;
124:     char *srvr_addr = "127.0.0.1:9090";
125:     struct sockaddr_in adr_srvr;/* AF_INET */
126:     struct sockaddr_in adr_clnt;/* AF_INET */
127:     int len_inet;                /* length */
128:     int s = −1;                  /* Socket */
129:     int c = −1;           /* Client socket */
130:     int n;    /* return val from select(2) */
131:     int mx;                  /* Max fd + 1 */
132:     fd_set rx_set;             /* Read set */
133:     fd_set wk_set;          /* Working set */
134:     struct timeval tv;    /* Timeout value */
135:
136:     /*
137:      * Initialize client structure:
138:      */
139:     for ( z=0; z<MAX_CLIENTS; ++z ) {
140:         client[z].stack = NULL;
141:         client[z].sp = 0;
142:         client[z].rx = NULL;
143:         client[z].tx = NULL;
144:     }
145:
146:     /*
147:      * Use a server address from the command
148:      * line, otherwise default to 127.0.0.1:
149:      */
150:     if ( argc >= 2 )
151:         srvr_addr = argv[1];
152:
153:     len_inet = sizeof adr_srvr;
154:     z = mkaddr(&adr_srvr,&len_inet,
155:         srvr_addr,"tcp");
156:
157:     if ( z < 0 || !adr_srvr.sin_port ) {
158:         fprintf(stderr,"Invalid server "
159:             "address, or no port number "
160:             "was specified.\n");
161:         exit(1);
162:     }
163:
164:     /*
165:      * Create a TCP/IP socket to use:
166:      */
167:     s = socket(PF_INET,SOCK_STREAM,0);
168:     if ( s == −1 )
169:         bail("socket(2)");
170:
171:     /*
172:      * Bind the server address:
173:      */
174:     z = bind(s,(struct sockaddr *)&adr_srvr,
175:             len_inet);
176:     if ( z == −1 )
177:         bail("bind(2)");
178:
179:     /*
180:      * Make it a listening socket:
181:      */
182:     z = listen(s,10);
183:     if ( z == −1 )
184:         bail("listen(2)");
185:
186:     /*
187:      * Express interest in socket
188:      * s for read events:
189:      */
190:     FD_ZERO(&rx_set);   /* Init. */
191:     FD_SET(s,&rx_set);    /* + s */
192:     mx = s + 1;    /* max fd + 1 */
193:
194:     /*
195:      * Start the server loop:
196:      */
197:     for (;;) {
198:         /*
199:          * Copy the rx_set to wk_set:
200:          */
201:         FD_ZERO(&wk_set);
202:         for ( z=0; z<mx; ++z ) {
203:             if ( FD_ISSET(z,&rx_set) )
204:                 FD_SET(z,&wk_set);
205:         }
206:
207:         /*
208:          * Sample timeout of 2.03 secs:
209:          */
210:         tv.tv_sec = 2;
211:         tv.tv_usec = 30000;
212:
213:         n = select(mx,&wk_set,NULL,NULL,&tv);
214:         if ( n == −1 ) {
215:             fprintf(stderr,"%s: select(2)\n",
216:                 strerror(errno));
217:             exit(1);
218:         } else if ( !n ) {
219:             /* puts("Timeout."); */
220:             continue;
221:         }
222:
223:         /*
224:          * Check if a connect has occured:
225:          */
226:         if ( FD_ISSET(s,&wk_set) ) {
227:             /*
228:              * Wait for a connect:
229:              */
230:             len_inet = sizeof adr_clnt;
231:             c = accept(s,
232:                 (struct sockaddr *)&adr_clnt,
233:                 &len_inet);
234:             if ( c == −1 )
235:                 bail("accept(2)");
236:
237:             /*
238:              * See if we've exceeded server
239:              * capacity. If so, close the
240:              * socket and wait for the
241:              * next event:
242:              */
243:             if ( c >= MAX_CLIENTS ) {
244:                 close(c);   /* At capacity */
245:                 continue;
246:             }
247:
248:             /*
249:              * Create streams:
250:              */
251:             client[c].rx = fdopen(c,"r");
252:             if ( !client[c].rx ) {
253:                 close(c);  /* Failed */
254:                 continue;
255:             }
256:
257:             client[c].tx = fdopen(dup(c),"w");
258:             if ( !client[c].tx ) {
259:                 fclose(client[c].rx);
260:                 continue;
261:             }
262:
263:             if ( c + 1 > mx )
264:                 mx = c + 1;
265:
266:             /*
267:              * Set both streams to line
268:              * buffered mode:
269:              */
270:             setlinebuf(client[c].rx);
271:             setlinebuf(client[c].tx);
272:
273:             /*
274:              * Allocate a stack:
275:              */
276:             client[c].sp = 0;
277:             client[c].stack =
278:                 (mpz_t **) malloc(
279:                     sizeof (mpz_t *)
280:                     * MAX_STACK);
281:
282:             FD_SET(c,&rx_set);
283:         }
284:
285:         /*
286:          * Check for client activity:
287:          */
288:         for ( c=0; c<mx; ++c ) {
289:             if ( c == s )
290:                 continue;   /* Not s */
291:             if ( FD_ISSET(c,&wk_set) ) {
292:                 if ( process_client(c) == EOF ) {
293:                     FD_CLR(c,&rx_set);
294:                 }
295:             }
296:         }
297:
298:         /*
299:          * Reduce mx if we are able to:
300:          */
301:         for ( c = mx - 1;
302:               c >= 0 && !FD_ISSET(c,&rx_set);
303:               c = mx - 1 )
304:                 mx = c;
305:     }
306:
307:     /* Control never gets here */
308:     return 0;
309: }


					  


The source module rpnsrv2.c contains quite a number of changes. First, examine the structural overview of the program:

    Include file <sys/time.h> is added to define the data structure timeval (line 12).

    The function prototype is declared for rpn_free() in line 33.

    The MAX_STACK macro is copied from rpnsrv2.c in line 35. The macro MAX_CLIENTS defines the maximum number of client processes supported by this server (line 36).

    The external declarations for stack and sp are defined in lines 41 and 42.

    The information about each client is maintained in this program by the data type ClientInfo, which is declared in lines 47 to 52.

    The ClientInfo array client[] is declared in line 54.

    A new client processing function, process_client(), is defined in lines 74 to 116.

    A number of new declarations are present in the main() program. The first of these is the value n, which is declared in line 130. This variable receives the return value from the select(2) call in line 207.

    Variable mx in line 131 will hold the maximum file descriptor that select(2) is interested in, plus one.

    Two file descriptor sets, rx_set and wk_set, are declared in lines 132 and 133.

    A timeout value structure, tv, is declared in line 134.

There are several significant changes made to the main flow of the main() program, which will be examined now. The following outlines the general steps that are executed by the server program:

    The ClientInfo array client[] is initialized first, in the for loop of lines 139 to 144.

    The usual socket creation, the bind(2) call and listen(2) call, are performed in lines 150 to 184.

    rx_set is zeroed out in line 190. rx_set will function as the master set of sockets for which the server is interested in read events.

    The FD_SET macro is called to enter socket s into the file descriptor set rx_set (line 191). This is done because a connect to this socket is considered a read event that select(2) will respond to.

    The variable mx is initialized to s + 1. This variable will hold the maximum file descriptor plus one. At this moment, there is only the one file descriptor s in the set. Hence, the program knows that the value of mx is currently and simply the value s + 1 (line 192).

    The server for loop begins in line 197.

    The FD_ZERO macro is called for the wk_set file descriptor set in line 201. This clears all bits in it to the zero (off) state. wk_set will function as the working set for this program, since select(2) will modify the sets that are passed to it.

    The for loop in lines 202 to 205 copy all file descriptors logged in rx_set to the work set wk_set.

    The timeout values are established in lines 210 to 211. It is necessary to establish the values each time select(2) is called, because these values are changed upon return from the function.

    The select(2) function is invoked in line 213. The return value is assigned to the variable n. Note that the wk_set is passed as the read file descriptor set in argument 2. Upon return from the select(2) function, the only bits that will remain in this set will be for the sockets that have data to be read (in the case of socket s, a client has connected).

    The value of n is tested for −1 in line 214. Lines 215 to 217 report the error and exit if an error should occur. An error here probably indicates a programming error. The error EINTR should be handled, however, if the program is handling signals at all.

    Lines 218 to 220 show how you can intercept a timeout event. The program shown simply does nothing and restarts the loop at step 6.

    The FD_ISSET macro is used to test whether socket s is present in set wk_set (line 226). If it is, this indicates that a client has just connected to the server socket s.

    The client connect is accepted in lines 230 to 235 if the test in step 12 is true. Note that the accept(2) call will not block the execution of the server here, because the select(2) function result guarantees that we have a connected client waiting to be accepted.

    Client connect processing continues with line 243. If the socket number (file descriptor) is greater than or equal to MAX_CLIENTS, the server rejects the connection in line 244 by closing the socket and looping back to step 6. In this program, the socket number is used as a subscript into the client[] array, and, as such, it must be less than the value of MAX_CLIENTS in this program.

    The usual FILE streams rx and tx are created and the buffering modes set in lines 251 to 271. Note, however, that in lines 263 and 264 the variable mx is increased to the new connected socket plus one, if the mx value needs increasing. Recall that mx must contain the maximum file descriptor value plus one, for the select(2) call.

    The client[] entry for this client is further initialized by allocating a stack for the client and resetting its stack pointer sp to zero (lines 276 to 280).

    Finally, FD_SET is used on set rx_set in line 282 to register the new client in the list of interesting file descriptors.

The steps just shown cover the server initialization and the accepting of new client connections. The following steps are used when clients send data to the server to be processed:

    Line 226 invokes the FD_ISSET macro to test whether the socket s has any input data. If it has, the client accept process just described is executed in lines 227 to 283.

    A for loop in line 288 iterates through all file descriptors less than the maximum value mx.

    Line 289 causes processing to be skipped for socket s, since only accept(2) is used on that socket.

    The FD_ISSET macro is called in line 291 to see if socket c has data waiting to be read (by testing descriptor set wk_set).

    If step 4 evaluates as true, then the function process_client() is called (line 292) with the socket number c as its input argument.

    If the function call in step 5 returns the value EOF in line 292, then socket c is removed from the rx_set in line 293, using the FD_CLR macro. This is necessary because the socket has been closed by the process_client() function and obviously will no longer return any data to be read.

    The for loop in lines 301 to 304 perform the job of lowering the value of mx if it is possible. This is not essential, but it can help the performance of the select(2) call and the server when this value is maintained as small as possible.

Now it's time to examine the steps employed by the function process_client(). These steps are as follows:

    The local variables rx and tx are established in lines 77 and 78 for programming convenience, from the client[c] array member. Note that the socket number c is used as a subscript into the client[] array.

    The RPN stack is established for the client by assigning values from client[c] into the external variables stack and sp (lines 83 and 84).

    Line 89 makes certain that end of file has not already been detected. If it has been, this will be handled in code that follows.

    Line 90 fetches one text line to be processed by the server. If this fgets(3) call should return an end-of-file indication, the code that follows will close things up for this client.

    The rpn_process() function call is executed to carry out the client request (line 91).

    End of file is tested in line 93. If this tests false, then the current sp value is saved back into the client[c] array member for future use. Then the function returns zero to indicate that EOF has not yet been seen (line 96).

    When the execution reaches line 102, it is known that the client has shut down its writing end of the socket. The function fclose(3) is called to force write out any unbuffered data to the client.

    The shutdown(2) function is called in line 103 to force a socket shutdown (this is not essential in this case, but is used for demonstration purposes).

    The rx stream is closed in line 104 for this client.

    Lines 106 to 113 free the client's leftover stack, if any, and clear the client[] array entry.

    Finally, EOF is returned in line 115.

Notice that step 11 causes source line 293 to remove the socket number c from the list of sockets that select(2) should report on.

Tip

It should be noted that even if no data is sent by the client process to be read, the act of the client closing the socket will cause select(2) to register a read event. Your code should always anticipate an end-of-file event.

Testing the select(2)-Based Server

The source code for the select(2) version of the RPN calculating server can be compiled as follows:

$ make rpnsrv2
gcc -c  -D_GNU_SOURCE -Wall -Wreturn-type rpnsrv2.c
gcc -c  -D_GNU_SOURCE -Wall -Wreturn-type rpneng2.c
gcc -c  -D_GNU_SOURCE -Wall -Wreturn-type mkaddr.c
gcc rpnsrv2.o rpneng2.o mkaddr.o -o rpnsrv2 -lgmp
$


The server executable rpnsrv2 will execute as one single process, even when many clients connect to the server. To allow this to be tested, you will first want to start the server itself. The following launch of the server permits it to be contacted on any allowable interface on your system:

$ ./rpnsrv2 '*:9099' &
[1] 730
$


The server is launched and placed into the background. The command-line argument of '*:9099' tells the server to specify a wild IP number, but to listen on TCP/IP port number 9099 for connects.

In order to properly test that this select(2) logic is operational, it is necessary to connect to the server with at least two simultaneous sessions. Without X Window sessions, this can be done from multiple console sessions. Using the X Window interface, you can easily start multiple terminal sessions for testing purposes.

Listing 11.6 shows one example xterm session using telnet to connect to the server. While this session is going on, another session, shown in Listing 11.7, is also created at the same time. It is only important that both sessions be connected to the server at the same time. Switching back and forth between sessions, the server should respond to each session as commands are provided to it.
Listing 11.6. First telnet Session with rpnsrv2

$ telnet localhost 9099
Trying 127.0.0.1...
Connected to localhost.
Escape character is '^]'.
#:44
0:
#:7777777777777777
1:
genprime
0:
=
0:3478699960711639
^]
telnet>c
Connection closed.
$


The second example telnet session is shown in Listing 11.7. Keep in mind that these are example sessions. You are free to exercise any of the functions of the RPN server in your own testing.
Listing 11.7. Second Session with rpnsrv2

$ telnet localhost 9099
Trying 127.0.0.1...
Connected to localhost.
Escape character is '^]'.
#:99
0:
#:9999999999999999
1:
genprime
0:
=
0:3039223729873609
^]
telnet> c
Connection closed.
$


While the sessions of Listings 11.6 and 11.7 were in progress, a list of processes were produced in a third session, which is shown in Listing 11.8.
Listing 11.8. List of Processes During rpnsrv2 Access

$ ps -af
UID        PID  PPID  C STIME TTY          TIME CMD
wwg        730   629  0 21:51 pts/1    00:00:00 ./rpnsrv2 *:9099
wwg        731   629  0 21:58 pts/1    00:00:00 telnet localhost 9099
wwg        754   752  0 21:59 pts/5    00:00:00 telnet localhost 9099
wwg        757   665  0 21:59 pts/3    00:00:00 ps -af
$


The process listing in Listing 11.8 clearly shows that, while the two telnet sessions (PID 731 and 754) were connected to the rpnsrv2 process, there was only one process representing the server (PID 730). As each input line was entered in the telnet sessions, a response was received after pressing Enter in either of the two open sessions. This demonstrates the capability of the one process to serve multiple connected clients.
Limitations of the Example

It was noted earlier that only read events were used for this server example. Even accepting this limitation of the demo server, there is still some exposure to difficulty, should a wayward client program decide to play havoc.

Consider what would happen if a client process were to do the following:

    Send three bytes: '#', ':', and '9'.

    Wait for a long time or an indefinite period.

The server end would experience the following events:

    Three bytes would be received at the receiving end of the server socket for the client.

    The select(2) call would return with an indication that the client socket has data to be read.

    The fgets(3) function would eventually be called in line 90 of Listing 11.5.

    The fgets(3) function waits indefinitely because, after reading all available data, there is no linefeed character to indicate that the end of the line has been received.

The server becomes blocked in the fgets(3) call at this point, and now no other client will be serviced either (they will all appear to have a hung connection).

The preceding discussion demonstrates that, while select(2) makes it possible to handle many sockets in one process, the design of the server tends to be complex in order to avoid hangs.

The write side of the operation is equally complex. While the select(2) call can indicate when a write(2) call will not block, it does not indicate how much data can be written without blocking. For servers that might return large amounts of data in a response, this is a serious problem. Again, special buffering techniques must be applied to successfully utilize select(2) in a robust server process.
```

## 9.12 DNS

### 9.12.1 New Network Database Functions

#### 9.12.1.1 getnameinfo

```text
These network database functions provide information about hosts, networks, protocols, and services. I already introduced the most important of these functions, getaddrinfo, in Section 8.2.6. Another handy function, gethostname, was in Section 8.2.7. Here I’ll describe the rest, grouped according to the kind of information they deal with.
```

#### 9.12.1.1.1 Host Functions

```text
The three functions for scanning the host database are:

sethostent—start host-database scan

#include <netdb.h>

void sethostent(
    int stayopen         /* leave connection open? */
);


gethostent—get next host-database entry

#include <netdb.h>

struct hostent *gethostent(void);
/* Returns next entry or NULL on end of database (errno not defined) */


endhostent—end host-database scan

#include <netdb.h>

void endhostent(void);


struct hostent—structure for host-database functions

struct hostent {
    char *h_name;         /* official host name */
    char **h_aliases;     /* array of alternative host names */
    int h_addrtype;       /* address family (not type) */
    int h_length;         /* length of each address */
    char **h_addr_list;   /* array of pointers to network addresses */
};



You can call gethostent in a loop to scan through all the known host names. You start the scan with sethostent, using the argument to indicate whether the connection to the host database should stay open, or whether gethostent should open and close it each time it’s called. You call endhostent at the end. Thus, it sounds like a lot could be happening, but in practice all these functions are likely to do is scan the /etc/hosts file on the local machine.

There are two arrays in the hostent structure, each terminated with a NULL pointer. One, h_aliases, is an array of alternate host names. The other, h_addr_list, is an array of pointers to network addresses. For AF_INET, these are IP addresses stored as 32-bit binary numbers in network byte order; therefore, use ntohl (Section 8.1.4) to convert them to local byte order, or use inet_ntoa (Section 8.2.3) or inet_ntop (Section 8.9.5) to get them as a dotted string

Here’s an example:

static void hostdb(void)
{
    struct hostent *h;

    sethostent(true);
    while ((h = gethostent()) != NULL)
        display_hostent(h);
    endhostent();
}

static void display_hostent(struct hostent *h)
{
    int i;

    printf("name: %s; type: %d; len: %d\n", h->h_name, h->h_addrtype,
      h->h_length);
    for (i = 0; h->h_aliases[i] != NULL; i++)
        printf("\t%s\n", h->h_aliases[i]);
    if (h->h_addrtype == AF_INET) {
        for (i = 0; h->h_addr_list[i] != NULL; i++)
            printf("\t%s\n",
              inet_ntoa(*((struct in_addr *)h->h_addr_list[i])));
    }
}


The output from a little main program (not shown) that called hostdb was:

|name: localhost; type: 2; len: 4
|        127.0.0.1
|name: sol; type: 2; len: 4
|        loghost
|        192.168.0.10
|name: bsd; type: 2; len: 4
|        192.168.0.15
|name: suse2; type: 2; len: 4
|        suse2.MSHOME
|        192.168.0.19


For comparison, here’s what the /etc/hosts file looked like on the same system:

| 127.0.0.1       localhost
| 192.168.0.10    sol     loghost
| 192.168.0.15    bsd
| 192.168.0.19    suse2   suse2.MSHOME


To look up a host by its name, you can call gethostbyname. It uses DNS if such access is available, not only the /etc/hosts file. In fact, it was the primary way you got network addresses until getaddrinfo came along, and it’s still used a lot more than getaddrinfo is because gethostbyname is very old, and that’s how almost everyone learned to do things. But, unlike with getaddrinfo, with gethostbyname all you get is the IP address—you still have to build the sockaddr_in structure yourself, as we did in Section 8.2.3. In addition, gethostbyname can’t handle IPv6 addresses. Here’s the synopsis:

gethostbyname—look up host by name

#include <netdb.h>

struct hostent *gethostbyname(
    const char *nodename,      /* node name */
);
/* Returns pointer to hostent or NULL on error (sets h_errno) */



The parenthetical remark at the end of the synopsis is no misprint—this function really does set h_errno, not errno, and the codes it uses aren’t errno codes, either. (I didn’t code an “ec” macro for h_errno because I don’t use the function.)

Here’s an example (display_hostent is from the previous example):

static void gethostbyname_ex(void)
{
    struct hostent *h;

    if ((h = gethostbyname("www.yahoo.com")) == NULL) {
        if (h_errno == HOST_NOT_FOUND)
            printf("host not found\n");
        else
            printf("h_errno = %d\n", h_errno);
    }
    else
        display_hostent(h);
}


Here’s the output we got from a call to this function:

|name: www.yahoo.akadns.net; type: 2; len: 4
|        www.yahoo.com
|        66.218.71.95
|        66.218.70.49
|        66.218.71.88
|        66.218.71.81
|        66.218.71.86
|        66.218.71.92
|        66.218.71.94
|        66.218.71.89
|        66.218.70.48
|        66.218.71.93
|        66.218.70.50
|        66.218.71.87
|        66.218.71.84


You may want to compare this to the output shown in Section 8.2.6, where we did pretty much the same thing with a call to getaddrinfo.

The opposite of gethostbyname is gethostbyaddr, which uses the host database (perhaps DNS) to translate an IP address to a name:

gethostbyaddr—look up host by address

#include <netdb.h>

struct hostent *gethostbyaddr(
    const void *addr,      /* IP address */
    socklen_t len,         /* length of address */
    int family             /* family (called "type" in SUS) */
);
/* Returns pointer to hostent or NULL on error (sets h_errno) */



Here’s an example program (inet_addr is in Section 8.2.3):

static void gethostbyaddr_ex(void)
{
    struct hostent *h;
    in_addr_t a;

    ec_neg1( a = inet_addr("66.218.71.94") )
    if ((h = gethostbyaddr(&a, sizeof(a), AF_INET)) == NULL) {
        if (h_errno == HOST_NOT_FOUND)
            printf("address not found\n");
        else
            printf("h_errno = %d\n", h_errno);
    }
    else
        display_hostent(h);
    return;
EC_CLEANUP_BGN
    EC_FLUSH("gethostbyaddr_ex")
EC_CLEANUP_END
}


The output:

name: w15.www.scd.yahoo.com; type: 2; len: 4
|        66.218.71.94


What happened is that when we got the IP addresses for www.yahoo.com, 66.218.71.94 was on the list, but when we asked for that IP’s name we got w15.www.scd.yahoo.com. That’s the way DNS works—apparently Yahoo uses a lot of servers, which, of course, it must.

gethostbyaddr is just as obsolete as gethostbyname. The modern function is the counterpart to getaddrinfo (Section 8.2.6), called getnameinfo:

getnameinfo—get name information

#include <sys/socket.h>
#include <netdb.h>

int getnameinfo(
    const struct sockaddr *sa,    /* socket address */
    socklen_t sa_len,             /* socket-address length */
    char *nodename,               /* node name */
    socklen_t nodelen,            /* node-name buffer length */
    char *servname,               /* service name */
    socklen_t servlen,            /* service-name buffer length */
    unsigned flags                /* flags */
);
/* Returns 0 on success or error number on error */



getnameinfo takes a whole socket address, not just a bare IP address, because it potentially works with lots of different families. Most importantly, it works with IPv6 addresses, which gethostbyname doesn’t. The answers come back into two buffers: nodename, of length nodelen, for the node (or host) name, and servname, of length servlen, for the service name. If a buffer pointer is NULL or its length is 0, you don’t get that information back.

Like getaddrinfo, the error numbers returned by getnameinfo aren’t errno codes, but special “EAI” codes, and you can use the function gai_strerror (Section 8.2.6) on them if you want. Or, use the ec_ai macro that we’ve provided just for these two functions.

Various flags that you can OR together control what getnameinfo returns:

NI_NOFQDN	Return just the node name part of local hosts, not the fully qualified domain name.
NI_NUMERICHOST	Return the numeric form (dotted notation for IPv4, colon notation for IPv6) of the address instead of the name.
NI_NAMEREQD	Return an error if the host’s name can’t be found. Normally the numeric form is returned in this case.
NI_NUMERICSERV	Return the port number (as a string) instead of the service name.
NI_DGRAM	Look for a SOCK_DGRAM (UDP) service. Normally it looks for a SOCK_STREAM (TCP) service.


Here’s an example:

static void getnameinfo_ex(void)
{
    struct sockaddr_in sa;
    char nodename[200], servname[200];

    sa.sin_family = AF_INET;
    sa.sin_port = htons(80);
    sa.sin_addr.s_addr =  inet_addr("216.109.125.70");
    ec_ai( getnameinfo((struct sockaddr *)&sa, sizeof(sa), nodename,
      sizeof(nodename), servname, sizeof(servname), 0) )
    printf("node: %s; service: %s\n", nodename, servname);
    return;

EC_CLEANUP_BGN
    EC_FLUSH("getnameinfo_ex")
EC_CLEANUP_END
}
------------------------------------------------------------------------ 
Another example:
#include <arpa/inet.h>
#include <netdb.h>
 
int main()
{
  struct sockaddr_in sa;
  sa.sin_family = AF_INET;
  inet_pton(AF_INET, "127.0.0.1", &sa.sin_addr);
 
  char node[NI_MAXHOST];
  int res = getnameinfo((struct sockaddr*)&sa, sizeof(sa), node, sizeof(node), NULL, 0, 0);
  if (res)
  {
    printf("&#37;s\n", gai_strerror(res));
    exit(1);
  }
  printf("%s\n", node);
 
  return 0;
}
------------------------------------------------------------------------ 

The output:

node: w17.www.dcn.yahoo.com; service: http


Another host-oriented function to talk about is:

gethostid—get identifier for local host

#include <unistd.h>

long gethostid(void);
/* Returns identifier (no error return) */



gethostid looks like it might return the local machine’s IP, but it doesn’t necessarily do that. All it’s required to do is return a unique identifier, and whether that even works probably depends on whether such an identifier has been set at boot time. I’ve documented it here just so you don’t accidentally confuse it with a useful function.

There’s another function, not directly associated with networking, that provides information to identify the system:

uname—get info about current system

#include <sys/utsname.h>

int uname(
    struct utsname *info      /* returned info */
);
/* Returns non-negative value on success or -1 on error (sets errno) */


struct utsname—structure for uname

struct utsname {
    char sysname[];           /* OS name */
    char nodename[];          /* node name within network */
    char release[];           /* release number (as string) */
    char version[];           /* version number (as string) */
    char machine[];           /* hardware type or computer model */
};



Unfortunately, none of the members of the utsname structure[8] are standardized, so you can’t use them to control your application’s processing. It would be nice, say, to test the machine member to see if you’re on an Intel CPU; however, each system that runs on that CPU formats the string the way it wants, and the word “Intel” or “x86” might not even be there. What you can do is use the strings for display purposes—maybe to label performance-testing output. And, naturally, the uname system call is the guts of the uname command, our version (lacking options) of which is:

    [8] Empty brackets as shown in the synopsis aren’t legal C, but you get the idea. Each implementation allocates whatever space it needs.

int main(void)
{
    struct utsname info;

    ec_neg1( uname(&info) )
    printf("sysname = %s\n", info.sysname);
    printf("nodename = %s\n", info.nodename);
    printf("release = %s\n", info.release);
    printf("version = %s\n", info.version);
    printf("machine = %s\n", info.machine);
    exit(EXIT_SUCCESS);

EC_CLEANUP_BGN
    exit(EXIT_FAILURE);
EC_CLEANUP_END
}


Here’s the output[9] from running this program on our four test systems; see if you can spot any patterns:

    [9] Output was folded to fit within the page margins.

sysname = SunOS
nodename = sol
release = 5.8
version = Generic_108529-13
machine = i86pc

sysname = Darwin
nodename = Marc-Rochkinds-Computer.local.
release = 6.6
version = Darwin Kernel Version 6.6: Thu May  1 21:48:54 PDT 2003;
  root:xnu/xnu-344.34.obj~1/RELEASE_PPC
machine = Power Macintosh

sysname = FreeBSD
nodename = bsd.MSHOME
release = 4.6-RELEASE
version = FreeBSD 4.6-RELEASE #0: Tue Jun
machine = i386

sysname = Linux
nodename = suse2
release = 2.4.18-4GB
version = #1 Wed Mar 27 13:57:05 UTC 2002
machine = i686
```

#### 9.12.1.1.2 Network Functions

```text
Functions in this category get information about networks that the local machine might be connected to. First come three functions like the ones for hosts (e.g., gethostent) for scanning for networks:

setnetent—start network-database scan

#include <netdb.h>

void setnetent(
    int stayopen         /* leave connection open? */
);


getnetent—get network-database entry

#include <netdb.h>

struct netent *getnetent(void);
/* Returns pointer to netent or NULL on end (errno not defined) */


endnetent—end network-database scan

#include <netdb.h>

void endnetent(void);


struct netent—structure for network-database functions

struct netent {
    char *n_name;         /* official network name */
    char **n_aliases;     /* array of alternative network names */
    int n_addrtype;       /* address family (not type) */
    uint32_t n_net;       /* network number */
};



Here’s an example:

static void netdb(void)
{
    struct netent *n;

    setnetent(true);
    while ((n = getnetent()) != NULL)
        display_netent(n);
    endnetent();
}

static void display_netent(struct netent *n)
{
    int i;

    printf("name: %s; type: %d; number: %lu\n", n->n_name, n->n_addrtype,
      (unsigned long)n->n_net);
    for (i = 0; n->n_aliases[i] != NULL; i++)
        printf("\t%s\n", n->n_aliases[i]);
}


With this output:

name: loopback; type: 2; number: 127
name: arpanet; type: 2; number: 10
        arpa


Most, if not all, machines have a loopback network for testing. This machine (running Solaris) also has a connection to an Internet network that it calls “arpanet” in honor of its history. Remember that the “type” displayed is really the family; it turns out that the macro AF_INET is defined as 2.

Analogously to the host database, there are functions for finding an entry by network number or by name:

getnetbyname—look up network by name

#include <netdb.h>

struct netent *getnetbyname(
    const char *name       /* network name (to match n_name member) */
);
/* Returns pointer to netent or NULL if not found (errno not defined) */


getnetbyaddr—look up network by number

#include <netdb.h>

struct netent *getnetbyaddr(
    uint32_t net,          /* network number (to match n_net member) */
    int type               /* family (to match n_addrtype member) */
);
/* Returns pointer to netent or NULL if not found (errno not defined) */
```

#### 9.12.1.1.3 Protocol Functions

```text
Following the pattern, the functions for scanning the protocol database are:

setprotoent—start protocol-database scan

#include <netdb.h>

void setprotoent(
    int stayopen          /* leave connection open? */
);


getprotoent—get protocol-database entry

#include <netdb.h>

struct protoent *getprotoent(void);
/* Returns pointer to protoent or NULL on end (errno not defined) */


endprotoent—end protocol-database scan

#include <netdb.h>

void endprotoent(void);


struct protoent—structure for protocol-database functions

struct protoent {
    char *p_name;          /* official protocol name */
    char **p_aliases;      /* array of alternative protocol names */
    int p_proto;           /* protocol number */
};



On some systems, you can use a protocol number for a protocol level when you call setsockopt or getsockopt, but that’s nonstandard.

The example code is pretty obvious if you’ve been reading along:

static void protodb(void)
{
    struct protoent *p;

    setprotoent(true);
    while ((p = getprotoent()) != NULL)
       display_protoent(p);
    endprotoent();
}

static void display_protoent(struct protoent *p)
{
    int i;

    printf("name: %s; number: %d\n", p->p_name, p->p_proto);
    for (i = 0; p->p_aliases[i] != NULL; i++)
        printf("\t%s\n", p->p_aliases[i]);
}


But the output is pretty interesting. On SuSE Linux I got 135 protocols. Here’s just part of the output:
Code View: Scroll / Show All

...
name: mobile; number: 55
        MOBILE
name: tlsp; number: 56
        TLSP
name: skip; number: 57
        SKIP
name: ipv6-icmp; number: 58
        IPv6-ICMP
        ICMPV6
        icmpv6
        icmp6
name: ipv6-nonxt; number: 59
        IPv6-NoNxt
name: ipv6-opts; number: 60
        IPv6-Opts
name: cftp; number: 62
        CFTP
name: sat-expak; number: 64
        SAT-EXPAK
name: kryptolan; number: 65
        KRYPTOLAN
...

					  


There are the two more predictable functions to round out the set:

getprotobyname—look up protocol by name

#include <netdb.h>

struct protoent *getprotobyname(
    const char *name           /* protocol name */
);
/* Returns pointer to protoent or NULL if not found (errno not defined) */


getprotobynumber—look up protocol by number

#include <netdb.h>

struct protoent *getprotobynumber(
    int proto                  /* protocol number */
);
/* Returns pointer to protoent or NULL if not found (errno not defined) */
```

#### 9.12.1.1.4 Service Functions

```text
There’s one more set of scanning and get-by-name and number functions, this time for services. These scan the local system’s /etc/services file.

setservent—start service-database scan

#include <netdb.h>

void setservent(
    int stayopen            /* leave connection open? */
);


getservent—get service-database entry

#include <netdb.h>

struct servent *getservent(void);
/* Returns pointer to servent or NULL on end (errno not defined) */


endservent—end service-database scan

#include <netdb.h>

void endservent(void);


struct servent—structure for service-database functions

struct servent {
    char *s_name;          /* official service name */
    char **s_aliases;      /* array of alternative service names */
    int s_port;            /* port number */
    char *s_proto;         /* name of protocol for this service */
};


getservbyname—look up service by name

#include <netdb.h>

struct servent *getservbyname(
    const char *name,      /* service name */
    const char *proto      /* protocol name */
);
/* Returns pointer to protoent or NULL if not found (errno not defined) */


getservbyport—look up service by port

#include <netdb.h>

struct servent *getservbyport(
    int port,              /* port */
    const char *proto      /* protocol name */
);
/* Returns pointer to protoent or NULL if not found (errno not defined) */



And our last example of this ilk is:

static void servdb(void)
{
    struct servent *s;

    setservent(true);
    while ((s = getservent()) != NULL)
        display_servent(s);
    endservent();
}

static void display_servent(struct servent *s)
{
    int i;
    printf("name: %s; port: %d; protocol: %s\n", s->s_name,
       ntohs(s->s_port), s->s_proto);
    for (i = 0; s->s_aliases[i] != NULL; i++)
        printf("\t%s\n", s->s_aliases[i]);
}


The output is huge because /etc/services files are typically huge. Here’s a fragment:

...
name: ftp-data; port: 20; protocol: tcp
name: ftp-data; port: 20; protocol: udp
name: ftp; port: 21; protocol: tcp
name: fsp; port: 21; protocol: udp
name: ssh; port: 22; protocol: tcp
name: ssh; port: 22; protocol: udp
name: telnet; port: 23; protocol: tcp
name: telnet; port: 23; protocol: udp
name: smtp; port: 25; protocol: tcp
        mail
name: smtp; port: 25; protocol: udp
        mail
name: nsw-fe; port: 27; protocol: tcp
name: nsw-fe; port: 27; protocol: udp
name: msg-icp; port: 29; protocol: tcp
name: msg-icp; port: 29; protocol: udp
name: msg-auth; port: 31; protocol: tcp
name: msg-auth; port: 31; protocol: udp
...
```

#### 9.12.1.1.5 Network Interface Functions

```text
There’s a set of functions to retrieve the names of the network interfaces and their index numbers. First, here’s a function that gets them all as an array of if_nameindex structures and a corresponding function to free the array:

if_nameindex—get all network interface names and indexes

#include <net/if.h>

struct if_nameindex *if_nameindex(void);
/* Returns array or NULL on error (sets errno) */


if_freenameindex—free array allocated by if_nameindex

#include <net/if.h>

void if_freenameindex(
    struct if_nameindex *ptr /* pointer to array */
  );


struct if_nameindex—structure for network-interface functions

struct if_nameindex {
    unsigned if_index;    /* interface index */
    char *if_name;        /* interface name */
};



Here’s a function that displays the indexes and interfaces:

static void ifdb(void)
{
    struct if_nameindex *ni;
    int i;

    ec_null( ni = if_nameindex() )
    for (i = 0; ni[i].if_index != 0 || ni[i].if_name != NULL; i++)
        printf("index: %d; name: %s\n", ni[i].if_index, ni[i].if_name);
    if_freenameindex(ni);
    return;

EC_CLEANUP_BGN
    EC_FLUSH("ifdb")
EC_CLEANUP_END
}


The output on Solaris was:

index: 1; name: lo0
index: 2; name: iprb0


and on SuSE Linux:

index: 1; name: lo
index: 2; name: eth0


These sort of match up with the network names displayed by the functions in Section 8.8.2: a loopback interface, and an Internet interface using Ethernet.

There’s another function to map a name to its index:

if_nametoindex—map network interface name to index

#include <net/if.h>

unsigned if_nametoindex(
     const char *ifname    /* interface name */
);
/* Returns index or 0 on error (errno not defined) */



Be careful—this function returns 0 if the name isn’t found, not –1.

To map an index to a name, you call:

if_indextoname—map network interface index to name

#include <net/if.h>

char *if_indextoname(
    unsigned ifindex,      /* interface index */
    char *ifname           /* interface name */
);
/* Returns name or NULL on error (sets errno) */



The ifname argument must be a buffer of at least IF_NAMESIZE bytes, which includes space for the terminating NUL byte. It also returns a pointer to that buffer.
```

### 9.12.2 getaddrinfo

```text
#include <irs/netdb.h>  /* if irs headers in standard location else use
                        #include "irs/netdb.h" and use -I /usr/include/test
                        in compile/linker if using the sample test locations*/
#include <netinet/in.h> /* for sockaddr_in and sockaddr_in6 */
#include <arpa/inet.h>  /* for inet_ntop */
#include <stdio.h>      /* for printf */
/* other includes as necessary */

#define GOOD 0          /* good return code */
#define BAD  1          /* fail return code */

int do_getaddrinfo(char *hostname)
{
     struct addrinfo *results=NULL;
     struct addrinfo *loop=NULL;      /* addrinfo structure pointers - defined in netdb.h */
     int      code;                   /* getaddrinfo return code */
     struct sockaddr_in  *sa4;        /* to manipulate IPv4 addresses */
     struct sockaddr_in6 *sa6;        /* to manipulate IPv6 addresses */
     char                 v6[42];     /* for max IPv6 address */

     code = getaddrinfo(hostname, NULL, NULL, &results); /* no hints */
     if(code != 0)
     {
         /* failed */
         printf("getaddrinfo for %s failed=%s", hostname,gai_strerror(code));
         return BAD;
     }else{
         for (loop = results; loop != NULL; loop = loop->ai_next)
         {
             switch(loop->ai_family)
             {
             case AF_INET: /* IPv4 type */
                 sa4 = (struct sockaddr_in *)loop->ai_addr; /* cast to IPv4 socket type */
                 printf("IPv4 name=%s A=%s", hostname, inet_ntoa(sa4->sin_addr) );
                 break;
             case AF_INET6: /* IPv6 type*/
                 sa6 = (struct sockaddr_in6 *)loop->ai_addr; /* cast to IPv6 socket type */
                 printf("IPv4 name=%s AAAA=%s", hostname,
                             inet_ntop(loop->ai_family, &sa6->sin6_addr, v6,42) );
                 break;
             default:
                 printf("Unknown family %d", loop->ai_family);
                 break;
             }
         }
     }
     freeaddrinfo(results);
     return GOOD;
}

					  


getaddrinfo() uses the default order of searching (defined in /etc/nsswitch.conf) so local files such as hosts will always be searched before using DNS.
		9.12.3

	9.13
```
