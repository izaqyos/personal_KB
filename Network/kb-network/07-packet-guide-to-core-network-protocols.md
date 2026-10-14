---
type: reference
title: Packet Guide to Core Network Protocols
description: Section 6 of the legacy NetworkKB notes.
tags: [kb-network]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "Network/NetworkKB#6"
---

# Packet Guide to Core Network Protocols

[↑ NetworkKB](/Network/kb-network/README.md)

## 6.1 Chapter 1. Networking Models

```text
    Mod-el: noun: 1–structural design, 2–a miniature representation, 3–an example for emulation or imitation

    —The Merriam-Webster Dictionary

Basic network architecture and construction is a good starting point when trying to understand how communication systems function, even though the topic is a bit dull. Architectures are typically based on a model showing how protocols and functions fit together. Historically, there have been many models used for this purpose, including, but not limited to, Systems Network Architecture (SNA-IBM), AppleTalk, Novell Netware (IPX/SPX), and the Open System Interconnection (OSI). Most of these have gone the way of the dodo due to the popularity of TCP/IP. TCP/IP stands for Transmission Control Protocol/Internet Protocol, and represents a suite of protocols used on almost all modern communication systems. As the name suggests, this is the language of the Internet. This chapter focuses on the practical TCP/IP model, using the OSI model as a reference point.
```

### 6.1.1 Section 1.1. What Is a Model?

```text
A model is a way to organize a system’s functions and features to define its structural design. A design can help us understand how a communication system accomplishes tasks to form a protocol suite. To help wrap our heads around models, communication systems are often compared to the postal system (Figure 1-1). Imagine writing a letter and taking it to the post office. At some point, the mail is sorted and then delivered via some transport system to another post office. From there, it is sorted and given to a mail carrier for delivery to the destination. The letter is handled at several points along the way. Each part of the system is trying to accomplish the same thing—deliver the mail. But each section has a particular set of rules to obey. While in transit, the truck follows the rules of the road as the letter is delivered to the next point for processing. In between, inspectors and sorters ensure the mail is metered and safe, without much concern for traffic lights or turn signals.



A communication system is not much different, since messages created on a computer are processed and delivered, with each piece of equipment performing some function and obeying certain rules for transmission. Figure 1-2 depicts a typical scenario in which two computers are connected by their network cards via a networking device. Two people are communicating using an application such as instant message or email. At some point we have to decide exactly how to handle this communication. After all, when you mail that letter, you cannot address the envelope in some arbitrary language or ignore zip codes, just as the mail truck driver cannot drive on the wrong side of the road.



So, how is the job of each device or connection determined? An application at the user level should not be responsible for choosing the encoding sequence or the signal type used between the client and server. The letter doesn’t decide to go by air or boat. Similarly, the network interface card (NIC) is not in the business of message header construction, just as the mail sorting system doesn’t care if you use pen or pencil when writing a letter.

Models are routinely organized in a hierarchical or layered structure. Each layer has a set of functions to perform. Protocols are created to handle these functions and, therefore, protocols are also associated with each layer. The protocols are collectively referred to as a protocol suite. The lower layers are often linked with hardware and the upper with software. For example, Ethernet operates at Layers 1 and 2, while the File Transfer Protocol (FTP) operates at the very top of the model. This is true for both the TCP/IP and OSI models. Network traffic can also be viewed in terms of these layers, many of which can actually be seen using a packet capture tool like Wireshark. In Figure 1-3, the major layers of the TCP/IP model are displayed in a message going to a web server.
```

### 6.1.2 Section 1.2. Why Use a Model?

```text
Before we get too far, let’s do a little reality check. A model describes the entire structure. At the beginning of the chapter, I stated that many of these models “have gone the way of the dodo.” There may have been good ideas in each, but everyone ended up using one model in particular—TCP/IP. For example, both Apple and IBM initially developed their own protocol suites, but converted to TCP/IP due to its popularity. This section explains the historical use of models and provides a more modern viewpoint.

Even a simple communication system is a complicated environment in which thousands or even millions of transactions occur daily. Interconnected systems are considerably more complex. A single electrical disturbance or software configuration error can prevent completion of these transactions. Models provide a starting point for determining what must be done to enable communication or to figure out how systems using different protocols might connect to each other. They also help in troubleshooting problems. For example, how would a Novell Netware client running IPX/SPX communicate with an IBM AS400 over a TCP/IP based network? Figure 1-4 depicts a scenario in which several different platforms might be required to interact with each other. Windows nodes are based on the TCP/IP protocol suite, but, if required, can run Novell Netware client software for network authentication. Novell developed internetworking and transport protocols, called IPX and SPX. At the other end of the network, the IBM mainframe communicates via the protocols used in the SNA model. Imagine the programming and extra effort required to maintain all of the transactions between these separate architectures.

Another example is a network of Apple computers running Appletalk while connecting to a network of Windows machines running TCP/IP.

As I’ve said, TCP/IP is the prevalent architecture today. The complexities of interplatform communication are dramatically reduced with TCP/IP. Protocol systems such as Appletalk, Netware, and SNA are considered legacy. However, understanding protocol layers on a particular communications device or how processes might interact on the network are still critically important ideas. When troubleshooting standard problems or potential security threats, the models and their associated layers offer logical reference points to begin the process. One would not start looking at the routing protocols if the link light was dark.
```

### 6.1.3 Section 1.3. OSI Model

```text
The OSI model is called a reference model. This means this particular model provides a method by which standards and protocols can be compared in order to assist in connectivity and consistency. Developers can use a reference model to understand how transmissions are framed and create methods to translate between systems.

The OSI basic model is standardized in ISO/IEC (International Standards Organization/International Electrotechnical Commission) 7498, which includes most of the definitions used here. These two organizations have actually created a Joint Technical Committee (JTC) that handles the issues associated with information technology. This model was developed in collaboration with the ITU-T and has also been printed as ITU-T Recommendation X.200. The ITU-T is the International Telecommunications Union—Telecom sector. Now that we’ve had our fill of acronyms, on to the standard.

The first version of ISO/IEC 7498 was written in 1984. This was replaced in 1994 by version 2, with some additional corrections after that date. ISO/IEC 7498 actually has four parts:

    Part 1 – The Basic Model
    Part 2 – Security Architecture
    Part 3 – Naming and Addressing
    Part 4 – Management Framework

This section examines the basic model, which is defined in section six of 7498-1 as having seven layers: Application, Presentation, Session, Transport, Network, Data Link, and Physical. Figure 1-5 depicts these layers and the connection to a similarly structured open system. An open system is one that adheres to this architecture.

Section 6 of the document also includes the guiding principles for layers, such as:

    Not creating so many as to make the engineering of the system difficult

    Reducing the number of interactions across a layer boundary

    Collecting similar functions and separating fundamentally different functions

    Identifying those that may receive a benefit by being based in hardware or software

Additionally, the OSI framework includes as its goals the improvement of current standards, flexibility, and the quality of being “open,” which simply means that systems have mutually adopted accepted standards for the exchange of information. Each of the layers defined in 7498-1 includes specific details about the functions and processes occurring at that layer. It is worth noting that this ISO/IEC/ITU-T document specifically states:

    It is not the intent of this reference model to either serve as an implementation specification or to be a basis for appraising the conformance of actual implementations or to provide a sufficient level of detail to define precisely the services and protocols of the interconnection architecture.

So the OSI model does not specify protocols, services, or rules to be used in a communication system, but it does detail the ideas and processes that may be required. Section 7 of 7498-1 provides some particulars for each of the layers, and these are summarized below. If you are driving heavy machinery, be careful in the next section.


Application

    Provides the sole means for the application to access the OSI environment (OSIE) with no layer above it. The functions are divided into connection mode and connectionless mode. Connection mode facilities will include quality of service (QoS), security, identification of the parties, error control, and mode of dialog. Connectionless facilities are essentially a subset of those already mentioned, without error control and some security.

Presentation

    This layer provides for the representation and preservation of the data provided by the Application Layer entities. Specifically, the Presentation Layer is focused on syntax that is acceptable to both ends and access to the layers above and below.

Session

    Specifies both full-duplex and half-duplex modes of operation. This layer provides the means (setup and teardown) for communicating nodes to synchronize and manage the data between them. A mapping is provided between the Transport Layer and Session Layer (session service access point) addresses. Support is present for many-to-one session-to-transport addresses. The bulk of the responsibilities at this layer involve connection-oriented transmissions, but connectionless transmissions are also supported.

Transport

    Protocols at this layer are end-to-end between communicating OSI nodes and deal primarily with low cost and reliable transfer of data. A single Transport Layer address may be associated with many session addresses and provides performance required by each session entity. Basic functions include transport connection establishment, release, data transfer, and QoS. While this layer is not responsible for routing, it does map to Network Layer addressing. All modes handle error control, but when running in connection-oriented mode, sequence control is required.

Network

    Provides the means for managing network connections between open systems. This layer is not responsible for negotiating QoS settings, but rather focuses on routing between networks and subnetworks. Network Layer addresses uniquely identify transport entities. The Network Layer is also responsible for error control, sequencing, and mapping to the data link addresses.

Data Link

    Responsible for the construction of the data link connection between Network Layer entities. The addresses used are unique within the open system set of devices. Like most of the OSI layers, connectionless and connection-oriented modes are utilized. In addition to interfacing with the Network Layer, the data link connection can be built upon one or more Physical Layer interfaces.

Physical

    Like most models, this OSI Physical Layer contains the electrical, mechanical, and functional means to establish physical connections between Layer-2 devices. The interface is largely determined by the medium, but the bit-level transmissions must be organized into their physical service data units.
```

#### 6.1.3.1 OSI—Beyond the Layers

```text
It is common to limit the discussion of the OSI reference model to the seven layer specifications. While these ideas have been discussed here, the OSI model also provides a potentially valuable insight into the design and implementation of networking models and protocols. The architects of this model spent a lot of time thinking about and enumerating those items demanded at each layer and what is necessary to communicate with the layers immediately above and below. As an example, section five of 7498-1 includes discussion on the various aspects of layering. These include but are not limited to the following:

    Communication between peer entities, including the following:

        Modes of communication (connection or connectionless)

        Relationships between services provided at each adjacent layer boundary

        Mode conversion functions (transport and network layers primarily)

    Identifiers such as N-address—unambiguous names used to identify a set of service access points at a particular layer

    Properties of service access points

    Definitions and descriptions of data units

    Elements of layer operation

        Connections to/from

        Multiplexing

        Flow control

        Segmentation

        Sequencing

        Acknowledgment

        Protocol selection

        Negotiation mechanisms

        Connection establishment and release

        Quality of service

        Error detection

Along with these generalized aspects of communication within a layer model, each individual layer adds further discussion where appropriate. For example, the section dedicated to the Transport Layer details connection establishment/release, data transfer, functions within the layer, addressing, multiplexing/splitting, and management. Where necessary (where a one-to-one mapping between services/addresses is not always present), a layer description will include details about the negotiation of the connections between the layers or even sublayers.
```

#### 6.1.3.2 OSI/ITU-T Protocols

```text
So far we’ve examined a layered model and outlined the responsibilities of each layer. What about the actual protocols? For every protocol used in the TCP/IP model, there is a corresponding (and perhaps more complex) version in the OSI/ITU-T architecture. For ease of access to the reference material, this section refers to the ITU-T X series of standards.

As stated previously, the model itself is described in ITU-T X.200. While the layers are also described, more detailed specifications are contained within X.211-X.217bis. These additional documents are similar to RFCs for individual protocols in that they provide the rules and guidelines for those actually developing protocols, including state diagrams and primitive definitions. For both the Network and Transport Layers, special attention is paid to connectionless- and connection-based communication. One of the major differences between these two forms of transmission is controlling the flow of information between endpoints. It is interesting that the two Layer-4 protocols used today—TCP and UDP (User Datagram Protocol)—are differentiated from each other in the exact same way, with TCP characterized as connection-oriented while UDP is connectionless. TCP is very concerned with sequence numbers and ensuring that all packets arrive at the destination. UDP is not.

Figure 1-6 is from ITU-T X.220 and shows the actual protocols to be used. The original diagram is quite large, so only a portion of it is shown here. While a bit old (written in 1993), it does provide some insight into the structure of the model. Many of the protocols are outdated, but we can see the modularity of the protocol stack that aids in subsystem replacement. For example, at the lower layers, X.25 has been replaced by Frame Relay and ATM. These, in turn, have been replaced by the transmission standards we use today.

As a practical matter, OSI/ITU-T protocols are not seen nearly as often as the protocols specified for use in the TCP/IP model, although there are exceptions. Some WAN connections continue to use these specifications and, of course, we still have traditional telephony systems. Perhaps one of the best examples of an ITU-T standard that continues to survive even as more and more communications shift to TCP/IP is in the area of VoIP (Voice over IP). H.323, Q.931, and G.711 are still a big part of contemporary VoIP transmissions, as shown in Figure 1-7. H.225 is part of H.323.
```

### 6.1.4 Introducing TCP/IP

```text
The Internet and almost all networks in use today have standardized on the TCP/IP model. It is often referred to as the language of the Internet, because applications are typically built around this protocol suite. Figure 1-8 shows the TCP/IP model and some of the more well-known protocols and corresponding layers. At Layer 4, there are actually two protocols present—TCP and UDP. While this model shares its name with the former, many operations are based on UDP, so Layer 4 is actually shared by the two protocols. Layers 1 and 2 are governed by the Local Area Network Protocol, but Layer 3 belongs to IP with Internet Control Message Protocol (ICMP) and Internet Group Membership Protocol (IGMP) components of IP-based operations.

The TCP/IP model does not specify any particular protocol to be run at the lower (LAN) layers. Historically, networks have been built upon many technologies, including fiber distributed data interface (FDDI), Localtalk, Token Ring, Ethernet, and wireless protocols from the 802.11 family of standards. Today, only Ethernet and 802.11 in their various forms survive and even these have eliminated certain variations. For example, Ethernet based on coaxial cable and 802.11 frequency-hopping are almost nonexistent.

In a typical network, most of the decisions regarding protocols, at least for Layers 1–4, are made for you and the real variation is in the applications you chose to deploy. This argument can even be made for advanced technologies such as voice communications, where traditional circuit-switched telephone systems are quickly being replaced by VoIP. The dominance of the TCP/IP model can be demonstrated using a tool within Wireshark. By examining the protocol distribution for a particular network segment, a picture (shown in Figure 1-9) emerges regarding the protocols in use.

On the left is packet capture data from a Windows machine and on the right from a Mac OS platform. Nearly 100 percent of the Layer-3 traffic caught is IPv4, with a small amount of IPv6. At Layer 4, TCP and UDP dominate, with ARP and 802.1x contributing. Missing from the data collected are protocols from any other model.

Comparing the TCP/IP and OSI models, it can be said that the functions are the same but the structure is different. Figure 1-10 shows a side-by-side comparison of the OSI and TCP/IP model layers. Layers 5–7 of the OSI model map to Layer 5 of the TCP/IP model.
```

#### 6.1.4.1 TCP/IP and the RFCs

```text
The TCP/IP model is presented in RFCs 1122 and 1123. These documents, released in 1989, provide the same level of detail encompassed in the ISO/IEC standard. An examination of the standard dates, historical deployments, and the difference in complexity between the two models provides insight into the adoption of TCP/IP over the OSI model. If you survived reading the OSI sections above, you might be left with the impression that the OSI model is very complex in comparison to TCP/IP. A quick look at the “companion” RFCs that go along with RFCs 1122 and 1123 also show a significant level of complexity. To quote from RFC 1122:

    This RFC enumerates standard protocols that a host connected to the Internet must use, and it incorporates by reference the RFCs and other documents describing the current specifications for these protocols. It corrects errors in the referenced documents and adds additional discussion and guidance for an implementor.

    For each protocol, this document also contains an explicit set of requirements, recommendations, and options. The reader must understand that the list of requirements in this document is incomplete by itself; the complete set of requirements for an Internet host is primarily defined in the standard protocol specification documents, with the corrections, amendments, and supplements contained in this RFC.

As with the OSI model, each layer of the TCP/IP model has a particular set of responsibilities. While most of these are defined in RFC 1122, those for the Application Layer come from RFC 1123. One significant difference between the two models is that RFC 1122 does specify particular protocols at the various layers. What follows are some of the major requirements that must occur at each layer.


Application

    The top TCP/IP layer combines the OSI Application and Presentation Layers and includes user-based and support/management protocols. Items at this layer must do the following:

        Support flexibility (naming and length) in hostnames

        Map domain names appropriately

        Handle DNS errors

    Telnet, FTP, Trivial FTP, Simple Mail Transport Protocol, and Domain Name Service all have more specific additional requirements.

Transport

    This layer provides end-to-end communication services based either on TCP (connection-oriented) or UDP (connectionless). TCP is much more concerned with sequence numbers and handshaking than UDP. Items at this layer must do the following:

        Pass IP options and Internet Control Message Protocol messages to the Application Layer

        Be able to handle and manipulate checksums

        Support IP addresses, local and wildcards, such as broadcast, multicast, and unicast destinations

        Treat window size as an unsigned number

        Manage window size effectively and allow 0 window size

        Support urgent data and the pointer that points to last octet of the urgent data

        Support TCP options

        Gracefully handle opening of connections

        Silently discard improper connection requests

        Handle retransmissions per recommended algorithms

        Follow recommended procedures when generating ACKs (acknowledgments)

        Gracefully handle connection failures


Internet

    The Internet Layer specifies the use of IP, ICMP, and Internet Group Management Protocol. Operationally, this is a connectionless “best effort” protocol concerned with addressing, type of service, security, and fragmentation. It relies on upper-layer protocols for accurate delivery. Items in this layer must do the following:

        Handle remote multihoming

        Meet appropriate gateway specification, if used

        Discard improper IP and ICMP packets

        Properly handle all forms of addressing including subnets

        Maintain packet IDs

        Support ToS and reassembly

        Support source routing options


Link Layer

    This is the network interface, and includes framing and media access to communicate directly with the network to which it is attached. Items at this layer must:

        Clear the ARP cache

        Prevent ARP floods

        Send and receive RFC 894 encapsulation (should also support IEEE 802)

        Use ARP on Ethernet and IEEE 802 networks

        Report link layer broadcasts to Internetwork Layer.

        Receive IP ToS values


Physical

    Typically, the network interface card or port defines the Physical Layer. Each LAN protocol has within its specification the electrical and mechanical characteristics for communication on the link. These include items such as voltage level, encoding, pin assignments, and shape of the interface.

Not all of the requirements were actually implemented in protocol suites running on hosts and network equipment. For example, IP hosts were intended to be much more active in detecting gateway or next hop failures. The reality is that if a gateway fails, hosts simply can’t communicate to destinations outside their networks.
```

#### 6.1.4.2 The Practical Side of TCP/IP

```text
The models discussed in this chapter are usually drawn from the top layer (application) down. Wireshark displays them in reverse order, as shown in Figure 1-11, where the protocols corresponding to Layers 1–5 are identified. This packet happens to be from a VoIP conversation. Starting from the bottom of the model, we see Ethernet Type II (also called Ethernet Type 2 or Ethernet II). Ethernet as a protocol exists at Layers 1 and 2, with Layer 2 defining the frame (error control, addressing, etc.) and the Ethernet network interface defining the Physical Layer characteristics.

In addition, Layer 2 LAN protocols can be split into two major areas: logical link control (LLC) and media access control (MAC). These become sublayers within the model. LLC functions include frame construction, error control, and addressing. The MAC layer defines line discipline and network transmission. Specifically, this includes a method for determining which node is in line to communicate and for how long. Figure 1-12 depicts these TCP/IP sublayers. Sublayers are also found in the OSI model.
```

#### 6.1.4.3 Encapsulation

```text
Encapsulation is the method by which the various layers interact and pass information up and down the protocol stack. A message generated by an application must be formatted for transmission. On the sending node, the upper layer places packaging around the message that describes the application used to generate the message. This is called the header. The package and header are then passed to the next layer down. Each layer completes its own required encapsulation operation that includes a header.

By the time the message reaches the bottom of the protocol stack, it has several of these wrappers. This process is the encapsulation. For ease of processing, each header contains information regarding the contents. Thus, the Ethernet header provides some indication that it has encapsulated IP. The IP header indicates that it was carrying TCP, and so on. Basic encapsulation and the encapsulation specific to the packet in Figure 1-11 are shown in Figure 1-13.

At the receiving node, the same process occurs, but in reverse. Each layer, beginning with the lowest, processes the appropriate information and strips off the outermost wrapper before handing the message to the next layer up. This continues as the message travels up the stack until the last bit of packaging is removed. This process is called de-encapsulation.

The packet shown in Figure 1-14 has been expanded to reveal the headers. Each layer contains a code indentifying the content of the encapsulated data. Ethernet uses the code 0800 to indicate that IP is encapsulated. At Layer 3, IP uses code 17 to show that it has encapsulated UDP. At Layer 4, UDP uses port numbers to direct the data to the proper process or application. The receiver uses this information to properly parse and de-encapsulate the data.
```

#### 6.1.4.4 Addressing

```text
Addressing used within networked systems can also be tied to layers and equipment, as shown in Figure 1-14. Some protocols require addressing as part of their basic operation. For example, an Ethernet switch processes Layer-2 frames, which contain addresses called hardware or MAC addresses. For example, the source MAC address in Figure 1-14 is 00:11:25:43:49:97. The Internet Protocol uses IP addresses at Layer 3, and these are processed by routers. In this case, the source is 192.168.1.1 and the destination is 239.255.255.250. Both TCP and UDP communicate via port numbers at Layer 4. Thus, a TCP/UDP message not only possesses the port numbers necessary to communicate with an application, but also the IP and MAC addresses necessary to complete the transmission. Understanding relationships like these better prepares the network administrator to build, troubleshoot, or secure the infrastructure. For example, if the administrator is concerned about port scanning at Layer 4, it is unlikely that solutions will be found by working with the network switches down at Layer 2.
```

#### 6.1.4.5 Equipment

```text
Layering the model can also provide a picture of device responsibilities. Each device on a network is designed for a particular task. They have different levels of intelligence and process traffic in a variety of ways. By applying the layers to equipment, the impact on traffic and capabilities of the device at that particular location are easier to understand. Routers and switches form the building blocks of almost any network. While they have many individual features and can be configured for a variety of functions, they all provide the same basic services when you plug them, regardless of the vendor. The relationship between devices, addressing, and the layers is outlined in Figure 1-15.

Switches operate at Layer 2 and forward LAN frames based upon the MAC addresses contained within those frames. They also perform error checking for each frame. Switches also provide some measure of network segmentation, since the processing of MAC addresses will result in network traffic control. Switches have a variety of management features such as support for Simple Network Management Protocol (SNMP) and virtual local area networks (VLANs).

Routers operate at Layer 3 and process IP packets. They will read Layer-2 frames when their MAC addresses appear in the frames, but their main function is to get IP packets to the proper destination. In so doing, the router calculates the IP header checksum and can act on any QoS or fragmentation information the packet contains. Many routers also support advanced features such as firewalling, virtual private networks (VPNs) termination, authentication, and network address translation (NAT).

The term gateway has several meanings. Routers and network hosts are configured with a default gateway, but this is actually a router. It is called a default gateway because this is the network path to the rest of the world. The more traditional gateway existing at Layer 4 is a device used to convert between systems that do not share the same networking model. This type of environment is depicted in Figure 1-4, and requires protocol translation for network nodes to communicate. We might say this sort of thing is another legacy item, but with the emergence of VoIP, the gateway is making a comeback. The language of the public switched telephone network (PSTN) is Signaling System 7 (SS7). A gateway that understands both TCP/IP and SS7 is required if an IP-based VoIP phone is to communicate with a traditional telephone.

Not all devices fit neatly into boxes. An access point is sometimes referred to as a wireless hub because it broadcasts certain kinds of traffic everywhere. However, like an Ethernet switch, the access point is not only aware of MAC addresses, it uses them to make some forwarding decisions. More recently, the emergence of multilayer switching has blurred the line between processing frames at Layer 2 and some of the higher level functions like routing. Figure 1-16 provides an example of how these devices and addresses interact within the confines of the protocol layers.
```

### 6.1.5 Section 1.5. Reading

```text
ISO/IEC 7498-1: “Information Technology — Open Systems Interconnection — Basic Reference Model: The Basic Model” (Joint Technical Committee)

ITU-T X.200: “Information Technology — Open Systems Interconnection — Basic Reference Model: The Basic Model” (International Telecommunication Union)

ITU-T X.220: Open Systems Interconnection — General Connection Mode Protocol Specifications “Use of X200-Series Protocols in CCITT Applications —” (International Telecommunication Union)

RFC 1122: “Requirements for Internet Hosts — Communication Layers” (Internet Engineering Task Force)

RFC 1123: “Requirements for Internet Hosts — Application and Support” (Internet Engineering Task Force)
```

### 6.1.6 Section 1.6. Summary

```text
The OSI and TCP/IP models provide an architecture in which the functions and rules for communication, addressing, and equipment are organized. The OSI model is standardized in ITU-T X.200, and the companion documents X.211-X.217 and X.220 provide the specifications for the developers and protocols. The TCP/IP model is described in RFC 1122, which lists the required protocols for hosts that communicate on the network.

The OSI model, now primarily considered a reference model, is in limited use. The TCP/IP model is the language of the Internet. Adoption of IP-based communication in many systems such as VoIP will further marginalize the OSI model’s use, a factor not lost on major companies like Apple and Novell, who have adopted the TCP/IP model.

Modern practitioners and researchers will be well served by an understanding of standards for communication requirements in widely varying conditions. These architectures help us to better understand the evolution of communication standards.
```

### 6.1.7 Section 1.7. Review Questions

```text
What is the name of the process by which an upper-layer protocol is wrapped up in a lower-layer protocol?

Name four communication models.

What two documents specify the standardization of the OSI model?

How many layers are in the OSI and TCP/IP models, respectively?

Name the layers of the OSI model.

Name the layers of the TCP/IP model.

What two documents present and detail the use of the TCP/IP model?

There are two forms of communication described in both standards. These forms are predominantly part of Layers 3 and 4. What are they?

Network administrators typically have the ability to use whatever protocols they wish, regardless of the layer in question. True or False?

One big difference between the documentation of the TCP/IP and OSI standards is that the TCP/IP RFC specifies the protocols to be used and the OSI ITU-T model documentation does not. True or False?

For each address type or device, specify its proper layer (Layer 2, Layer 3, or Layer 4).

Switch

Router

Gateway

MAC address

IP address

Port number
```

### 6.1.8 Section 1.8. Review Answers

```text
    Encapsulation

    TCP/IP, OSI, SNA, Appletalk, Novell (IPX/SPX)

    ISO/IEC 7498 and ITU-T X.200

    7, 5

    Application, Presentation, Session, Transport, Network, Data Link, Physical

    Application, Transport, Internet, Data Link, Physical

    RFCs 1122 and 1123

    Connection-mode (oriented) and connectionless-mode

    False

    True

    Layer 2, Layer 3, Layer 4, Layer 2, Layer 3, Layer 4
```

### 6.1.9 Section 1.9. Lab Exercises

#### 6.1.9.1 Activity 1—Examining Encapsulation

```text
Materials: Wireshark and a network connection

    Start a capture.

    Complete several different transactions from your computer.

    Stop the capture and examine the individual packets.

    Find examples of the following: ARP, ICMP, TCP, UDP, and IPv6.

    Describe these packets in terms of their encapsulation or protocol stacks.
```

#### 6.1.9.2 Activity 2—Protocol Distribution

```text
Materials: Wireshark and a network connection

    Start a capture and allow it to run for several minutes, the longer the better.

    Complete as many different transactions from your computer as possible.

    From the Statistics menu in Wireshark, select Protocol Hierarchy.

    Examine the distribution or protocols and attempt to determine the models used and the level of traffic specific to each protocol. What is the most common upper-layer protocol? What caused it to be generated?
```

#### 6.1.9.3 Activity 3—Developing a Protocol/Architecture

```text
Using the models discussed in this chapter as references, develop a series of rules or parameters that describe a conversation between two people who have never met. Things to consider might include the mode of communication, language, nonverbal communication, access method, body language, expressions, speed, and parameter negotiation.
```

## 6.2 Chapter 2. Ethernet

```text
Computers cabled together in a network are almost certainly going to be connected via Ethernet. Ethernet is a technology that describes the rules used for communication between LAN-based systems and is considered a Layer-2 protocol. This chapter discusses the structure and operation of the Ethernet protocol, the differences between Ethernet Type II and 802.3, cabling types, and deployment considerations.

A historical review of the current standards can be a little confusing. The story begins in the 1970s with Bob Metcalfe, who envisioned a cable-based network, which later evolved into Ethernet Type II. Shortly after Metcalfe’s ideas were disseminated, the IEEE standards committee developed 802.3 Ethernet. Both versions are in use today and are described more fully below. For the information-hungry, some interesting documents to read include:

    “Ethernet: Distributed Packet Switching for Local Computer Networks” (Metcalfe and Boggs)

    “The Ethernet: A Local Area Network Physical Layer and Data Link Layer Protocol Specifications” (DEC, Intel, and Xerox)

    “802.3-1985 IEEE Standard for Local and Metropolitan Area Networks: Carrier Sense Multiple Access with Collision Detection (Original 10Mb/s Standard)” (IEEE Standards Association)

The first paper, written by Bob Metcalfe and David Boggs, describes Ethernet as a LAN system with such characteristics as shared communication, broadcast packet switching (all nodes hear the transmission), extension via repeaters, distributed control for packet transmission, and controlled behavior in the presence of interference or collisions.

While their paper describes operation on a coaxial-based line, these properties have also been central to noncoaxial Ethernet systems. The 802.3 standard describes the communication on a network employing the carrier sense multiple access with collision detection (CSMA/CD) access method. It includes sections for aggregation, multiple speeds, and full/half duplex operation.

There have been many versions of this ubiquitous protocol, including 10Base5, 10Base2, 10Base-FL, 10Base-T, 100Base-T, and 100Base-FX. Of these, 10Base-T, 100Base-T, and 1000Base-T (gigabit) are the most common and are the focus of this chapter. Network equipment is sometimes referred to as 10/100/1000 (or 10/100), Ethernet having the capability of running at 10, 100, or 1000Mbps. The popularity of Ethernet as a LAN protocol has forced personal computer and laptop vendors to include Ethernet ports and/or auxiliary slots for Ethernet cards on all their products.
		Section 6.2.1. Remember the Models

Ethernet governs the two lowest layers (Physical and Network) of the TCP/IP model. Chapter 1 introduced RFC 1122, which requires nodes operating on a TCP/IP-based network to support the Ethernet encapsulation scheme described in RFC 894. Nodes on the network should also be able to receive frames described by RFC 1042 (IEEE 802.3 frames) and may support transmission of these frames. Today we see both types of frames coexisting on the network, but typically RFC 894 (Ethernet II) frames are generated by hosts. When an IEEE 802.3 frame appears, it is almost always from a network communication device such as a router, switch, or access point.

As previously stated, Ethernet resides at Layers 1 and 2 of the TCP/IP (or OSI) model. Layer 2 is further subdivided as shown in Figure 2-1.

The two sublayers are called Logical Link Control (LLC) and Media Access Control (MAC). The LLC sublayer is where the Ethernet frame and its associated fields are assembled and is similar to the IEEE 802.2 structure. The MAC sublayer is responsible for what is called the access method. Discussed in detail later in the chapter, the MAC sublayer detects the carrier, transmits and receives from the media, and passes frames to/from the LLC sublayer.

We know that encapsulation causes user data to be wrapped in headers from each layer in our networking model. As an example, a DHCP (BOOTP) packet is encapsulated first in UDP, followed by IP. This packet must then be placed in a LAN frame. This is true whether the network is wireless (802.11) or wired via Ethernet. Figure 2-2 shows the encapsulation concept and Figure 2-3 shows an example of an actual Ethernet Type II frame carrying the information.

                   +-------------+
                   | LLC         |
+-------------+    +-------------+
| Data link   +----+ MAC         |
+-------------+    +-------------+
| Physical    +----+ Physical    |
+-------------+    +-------------+

+---------+----+------+----------+
|         |    |      |          |
| Ethernet| IP | UDP  | DHCP     |
|         |    |      |          |
|         |    |      |          |
+---------+----+------+----------+


		Section 6.2.2. Structure

The Ethernet frame (Layer 2) in Figure 2-3 is expanded in Figure 2-4 to show several fields used to control various aspects of the transmission. When you capture traffic using Wireshark, protocols above Layer 2 are shown in their entirety. However, several parts or fields of the Layer 2 are not shown. Figure 2-4 shows a simple Ethernet frame as defined in the standard.

Figure 2-4. Ethernet fields
---------------------------------------------------------------------------------------------------------+
Preamble	Destination MAC ADDR	Source MAC ADDR		Control		Data		FCS      |                                 |
---------------------------------------------------------------------------------------------------------+
8 bytes		6 bytes			6 bytes			2 bytes		46-1500 bytes	4 bytes
```

### 6.2.1 Preamble

```text
The preamble is a series of alternating 1s and 0s that provide timing for the receiving interface. The Ethernet II preamble is eight bytes in length, with each successive byte repeating the 1-0-1-0 sequence. The 802.3 frame has a seven-byte preamble with the alternating 1-0-1-0 pattern, but the eighth byte is slightly different (10101011) and is referred to as a start frame delimiter, or SFD. The preamble and the SFD are invisible to packet analyzers.
```

### 6.2.2 Source and Destination MAC Addresses

```text
A MAC address (also known as the hardware, Ethernet, or physical address) is the six-byte address encoded into the network interface card (NIC) of a particular machine. The Ethernet frame has two addresses—destination and source—with the destination transmitted first. MAC addresses are used to send frames to the correct recipients on the LAN. MAC addresses have no significance beyond a computer’s own network, so the MAC addresses of machines beyond the local network are unknown. When transmitting outside the network, the MAC address of the default gateway is placed in the destination field.
```

### 6.2.3 Control Field (Type)

```text
This is a two-byte field that describes what is contained in the data field. Figure 2-3 shows a value of 0x0800 following the two MAC addresses. The “0x” means that it is a hexadecimal (hex) number. The hex decode of a Wireshark capture will only show “0800,” leaving out the “0x.” The value 0800 is the most common value for this field, indicating that an IP packet is encapsulated. Another common value for this field is 0806, which indicates an Address Resolution Protocol (ARP) message. This same two-byte field in an 802.3 frame indicates the length of the data field in bytes.
```

### 6.2.4 Data Field

```text
All higher layers of the protocol stack are encapsulated in the data field, or payload. All of the traffic to be sent over the network must be encapsulated into the data field of an Ethernet frame. As indicated in Figure 2-4, the minimum payload is 46 bytes and the maximum is 1500. These values are directly related to Ethernet operation. A payload of less than 46 bytes requires trailing zeros to be added to obtain the minimum of 46 bytes. An example of this is shown in Figure 2-5. However, the padding is not to be included in the length calculation for the IP packet. If the data chunk is greater than 1500 bytes, it is split up into two or more frames to be sent across the network separately.
```

### 6.2.5 Frame Check Sequence

```text
The Frame Check Sequence (FCS) is the last field of the Ethernet frame and is used for error checking. A 32-bit cyclical redundancy check (CRC-32) algorithm is computed using the entire frame’s binary sequence, excluding the FCS field itself. This algorithm does error detection, but not error correction. In fact, it only checks for single bit errors. When a frame is created, the CRC calculation result is appended to the frame. Any node receiving or forwarding the frame will also calculate the CRC. The two values are compared and if they are different, an error has occurred. By default, switches calculate the CRC of each frame. A CRC error will result in the switch discarding the frame. Typically, error repair is left to the upper layers of the protocol stack or model. When errored frames are dropped, the TCP conversation will be missing packets, as indicated by out-of-order sequence numbers. Clients will ask for retransmission of the missing data.

Bit error rate (BER) refers to the number of bits that we can expect to transmit without a problem. BERs can range from 1 in 109 bits to less than 1 in 1012 on today’s high-performance networks. This means that for every 109 or 1012 bits transmitted, only 1 will be in error, causing a CRC test to fail. Even in the early Ethernet standards, the BERs were limited to 1 in 109.

		Section 6.2.3. Ethernet Type II vs. 802.3
As mentioned previously, Ethernet frames conform to two different formats. NICs and devices understand these variations and they coexist. Ethernet Type II is the standard used for IP-based data packets. IEEE 802.3 is often used with management protocols such as spanning tree. Figure 2-6 depicts the two frame types for comparison.

Example:

No.     Time            Source                Destination           Protocol Info
      8 16:38:25.872560 64.103.121.139        171.71.179.143        TCP      [TCP ACKed lost segment] 54971 > https [ACK] Seq=1 Ack=2 Win=16468 Len=0

Frame 8: 54 bytes on wire (432 bits), 54 bytes captured (432 bits)
Ethernet II, Src: IntelCor_6d:05:94 (00:24:d7:6d:05:94), Dst: All-HSRP-routers_01 (00:00:0c:07:ac:01)
    Destination: All-HSRP-routers_01 (00:00:0c:07:ac:01)
        Address: All-HSRP-routers_01 (00:00:0c:07:ac:01)
        .... ...0 .... .... .... .... = IG bit: Individual address (unicast)
        .... ..0. .... .... .... .... = LG bit: Globally unique address (factory default)
    Source: IntelCor_6d:05:94 (00:24:d7:6d:05:94)
        Address: IntelCor_6d:05:94 (00:24:d7:6d:05:94)
        .... ...0 .... .... .... .... = IG bit: Individual address (unicast)
        .... ..0. .... .... .... .... = LG bit: Globally unique address (factory default)
    Type: IP (0x0800)
Internet Protocol, Src: 64.103.121.139 (64.103.121.139), Dst: 171.71.179.143 (171.71.179.143)
Transmission Control Protocol, Src Port: 54971 (54971), Dst Port: https (443), Seq: 1, Ack: 2, Len: 0


The major difference between these two standards that can be seen with packet capture software is the two-byte control field. Ethernet Type II uses this as a type or protocol identifier, while 802.3 uses this field as a length value. All Ethertypes are greater than a base 10 value of 1536 (0x0600 in hexadecimal) and the most common of these are shown in Table 2-1.

+------------------+---------------+------------------------------------------------------------------+
| Hexadecimal      |     Decimal   |                            Meaning                               |
+------------------+---------------+------------------------------------------------------------------+
| 0x800            | 2048          |  IP packet                                                       |
+------------------+---------------+------------------------------------------------------------------+
| 0x806            | 2054          |  ARP packet                                                      |
+------------------+---------------+------------------------------------------------------------------+
| 0x86dd           | 35425         | IPv6                                                             |
+------------------+---------------+------------------------------------------------------------------+

A complete list can be found at the IEEE Registration Authority. The website address is given at the end of this chapter. If the base 10 value of the control field is 1500 or less, the frame is 802.3 and the control field is a length value, as shown in Figure 2-7. The standard actually considers any value below 1536 (0600 in hex) to be a length. However, RFC 1122 tells us that the maximum size of an Ethernet data field is 1500 and the maximum transmission unit (MTU) for 802.3 is 1492 bytes.

While we’re here, we might as well take a little closer look at the LLC portion of an 802.3 frame. Expanded, the LLC header provides a little more detail about the frame’s functionality. Ethernet Type II frames use the control field for this purpose. The full details of the LLC can be found in the IEEE 802.2 standard.

The general form of an LLC packet includes four fields:


Destination Service Access Point (DSAP)

    This first byte indicates the ending point or target for this frame. This address includes the individual or group bit at the beginning. An address of all ones is reserved for the global address. All zeros is a null address. A value (DSAP or SSAP) often seen on networks is AA, referring to the Subnetwork Access Protocol, or SNAP. SNAP provides support mechanisms for multiple protocols on the same Ethernet sublayer.

Source Service Access Point (SSAP)

    The second byte indicates the starting point or reason for the frame. This address includes the command/response bit at the beginning. All zeros indicates a null address.

Control

    These are values for the command and response functions, depending on the operation, as well as possible sequence numbers.

Information

    This field is the data carried by the frame. Figure 2-8 shows that the frame is carrying a Spanning Tree Protocol packet, and shows the general format for 802.3 frames with 802.2 LLC. Spanning Tree is a standard management protocol used on Ethernet networks.

+------------------------------------------+------------------------------+-------------------+
| 802.3                                    | 802.2                        |                   |
| Preamble, SFD, Dest+SRC MAC Address,     | DSAP, SSAP, CR, Control      | Spanning tree     |
+------------------------------------------+------------------------------+-------------------+


		Section 6.2.4. MAC Addresses—Another Look
Before we get into Ethernet operation, it is worth spending some time on the various MAC addresses seen on a network. These addresses can drastically affect how frames are processed. Generally, MAC addresses are divided into two parts: a three-byte vendor code and a three-byte host ID. In the example shown in Figure 2-6, the Ethernet Type II source MAC address is 00:09:11:2a:b8:00. The vendor code is 00:09:11, which corresponds to Cisco. Wireshark can interpret this value for us because the value is registered and this list is publicly available at the IEEE site. A handy lookup tool is available at http://standards.ieee.org/develop/regauth/oui/public.html. The unique value for the network node is 2a:ba:00. So, a single vendor code can have as many as 224 possible host addresses. These values are almost always written in hexadecimal notation, though the frame is transmitted in binary.

There are three different types of MAC addresses on an Ethernet network: unicast, broadcast, and multicast. Unicast MAC addresses are those assigned to individual nodes, and the first byte is always 00. In an Ethernet frame, the source MAC address is always a unicast address. Figure 2-9 shows a unicast-to-unicast communication. That means the source and destination addresses both begin with 00 and correspond to individual machines. We call this a unicast frame. In the case of the destination, the vendor code is 00:19:55 and the unique node ID is 35:1a:d0.

Figure 2-9. Unicast Ethernet frame


Broadcast frames are those sent by a single node (unicast address) to everyone on the local network. This special hexadecimal address (ff-ff-ff-ff-ff-ff) is used for several different messages, but a couple of the most common are ARP and DHCP requests. A hexadecimal value of ff corresponds to a base 10 value of 255. Figure 2-10 shows a broadcast frame.

Figure 2-10. Broadcast Ethernet frame


Broadcast frames are read by all nodes on a network. They are also forwarded everywhere by Layer-2 networking equipment. When a switch receives a broadcast frame, it is sent out every port except the one through which the frame arrived. Routers will not forward broadcast frames. Routers are said to be the boundary of the broadcast domain. In fact, routers generally do not forward Layer-2 frames to other networks. Stated another way, no network but your own will ever see the MAC addresses used on your network.

Multicast frames are created by a single host (unicast) but destined for a subset of the entire network. Multicast is important when a message must be sent to a particular process or group of nodes. One example might be the wireless equipment on a network. A controller or node might send out a multicast frame that reaches all devices with a particular vendor code. Another example is the Spanning Tree Protocol. Switches engaging in the Spanning Tree Protocol send and receive frames with a particular reserved multicast address. Nodes ignore this address. Multicast frames will have 01 as the first byte of the MAC address.

The example in Figure 2-11 is a spanning tree frame called a bridge protocol data unit. The source address is a unicast and the destination is 01:80:2c:00:00:00, which corresponds to the MAC address reserved for spanning tree. This is an 802.3 Ethernet frame rather than an Ethernet Type II frame.

		Section 6.2.5. Ethernet Operation
If you imagine yourself as a computer trying to communicate on a network fully populated with a large number of other computers, you might discover that there are a significant number of issues associated with trying to be understood. For example:

    How would you ensure the correct destination received the transmission?

    How would you determine how fast or how slow you were supposed to send the data?

    How would you decide which computers had permission to speak or transmit?

These issues are similar to having a conversation with a group of your friends. Who is talking? For how long? Can we interrupt? Like many conversations with our friends, some topologies are easier to manage than others. For these reasons, every single LAN protocol has a set of rules.

As a protocol, Ethernet is pretty straightforward. As for the first issue, Ethernet uses MAC addresses to uniquely identify the network nodes. When a frame is transmitted, the recipient is specified in the Ethernet header. Moving to the second issue, data rate is a function of the NIC. NICs are normally capable of two or three speeds, including 10Mbps, 100Mbps, and 1Gbps. So either the NIC negotiates an acceptable data rate with the network or the NIC will use an incoming frame’s preamble to help it sync up with the incoming transmission.

The third issue is a little more complicated. Before a node can transmit, it must determine if the wire or medium is clear for transmission. This is handled via the access method. Specifically, Ethernet uses CSMA/CD along with a truncated binary exponential random backoff algorithm. It’s quite a mouthful, but simpler than it sounds. First, the node will listen for other transmissions. “Hearing” none, it will assume the medium is clear and begin its own transmission. If the line is not clear, the node waits for the transmission to complete and then sends its own frame.

		Section 6.2.6. Shared Media
Early Ethernet operated on a bus topology, meaning every node on the network can hear what you transmitted and vice versa. In fact, early generations such as 10Base5 and 10Base2 actually connect nodes together via coaxial cables and tap into the central shared conductor. The next generation was called 10Base-T and dropped the use of coaxial cable in favor of unshielded twisted pair (UTP) as the media, but it is still a bus. The naming convention (10Base-T) is described in 802.3 and indicates the speed (10, 100, or 1000Mbps), type of transmission (baseband or broadband), and the type of media or distance, T indicating twisted pair. Earlier standards such as 10Base5 use the trailing number as a distance value to indicate the maximum network diameter. For example, 10Base5 has a maximum collision domain distance of 500m.

In a UTP-based bus topology, all of the transmissions use the same pair of wires. The transmission eventually winds up on the receive pair of wires for every single node. The central node is a hub or repeater. With bus topologies, if two separate transmissions are initiated at the same time, they will collide somewhere on the network, causing a spike in voltage or power (Figure 2-12). Just like vehicular collisions, Ethernet frame collisions are bad. In the event of a collision, the two nodes involved must back off from the transmission and try again later.

Figure 2-12. Collision on a hub-based topology


Network nodes can detect when a collision occurs, because their NICs have transmit and receive wire pairs. Thus, if a signal is detected on your receive wires while you were transmitting, another node must be transmitting at the same time. The frames have collided with yours and the collision now propagates to the receive pair. Normally, a frame from a single node will effectively “fill up” the entire network for the duration of the transmission, ensuring all other network nodes will remain quiet.

To ensure we can detect all possible collisions, regardless of when the transmission started, we have rules that must be obeyed regarding frame size, bit rate, and maximum network diameter. Ethernet frames must be a minimum of 64 bytes in length (recall that the data field can range in size from 46 to 1500 bytes) measured from the destination MAC address field to the CRC field, as shown in Figure 2-13.

Figure 2-13. Ethernet minimum frame size


The minimum size restriction prevents the generation and transmission of very small frames. A 10Base-T network is limited to 500m end to end. The goal is to prevent a node from transmitting the last bit of a frame before the first bit arrives at the destination. If we allowed the network size to exceed the limit, or if we transmitted really small frames, it would be possible for the entire frame to leave the NIC and then get destroyed in the network. Violation of these restrictions makes it possible for a transmitting node to finish putting a frame onto the network before the leading edge of the frame reaches its destination. Should a collision occur, the transmitting node will have no idea that its own frame was involved in the collision. At the other extreme, nodes with large frames may monopolize the network.

Any node capable of detecting a collision is a member of the same collision domain. A collision domain is the distance that collision electrical noise travels. Hubs will forward collisions, but switches and routers will not. More on these devices can be found in the Chapter 5.

The Ethernet standard includes guidelines for the construction of shared (bus topology) Ethernet networks. A 10Base-T network should follow a 3-4-5 rule—three populated segments, four repeaters or hubs, and a maximum distance of five hundred meters (Figure 2-14). The rule imposes a maximum distance between any two Ethernet UTP endpoints of 100 meters.

Figure 2-14. 3-4-5 rule for 10Base-T Ethernet


For 100Base-T (the 100Mbps upgrade for 10Base-T), we use the 1-2 rule, which means that only one repeater or hub is allowed and the maximum network diameter is two hundred meters. This rule allows either translational or nontranslational hubs. Nontranslational hubs do not convert between media types. An exception to the 1-2 rule is adding a second hub if it is nontranslational (Class II) and placed close by the other hub, as in a wiring closet. The Ethernet standard specifies that, “It must be possible [for] any two DTEs on that network to contend for the network at the same time.”

Remember that these rules are for shared Ethernet, meaning hubs, bus topologies, and a broadcast system. The minute a device like a switch is used, these rules go out the window, because the network behavior changes. On a practical note, today’s networks are usually built with switches, so these rules serve as background. However, Ethernet default configuration settings are typically aligned with the shared network mentality.

We know that Ethernet has a minimum frame size of 64 bytes, or 512 bits. A frame of this size on a 10Base-T network (10 million bits per second) takes 51.2µsec to transmit. This is referred to as the slot time. If a node has a frame to transmit, it must listen to the media for at short period of time called the interframe gap. This minimum wait time prevents transmitting into a frame already on the network and allows station a chance to reset. An interframe gap (time distance between two frames) of 96 bits (9.6µsec) also prevents a node from transmitting one frame after another. For 100Base-T, the interframe gap is shortened to .96µsec. The slot time is also shorter, based on the faster transmission time of each bit. Just for fun, 1000Base-T has a slot time of .096µsec and a corresponding drop in slot time.

When the media is free and the wait is over, a frame may be sent via the transmit pair. If a spike in voltage or power (a collision) is detected on the receive pair while the frame is being transmitted, the stations involved in the collision know that their frames were destroyed, because they were obeying the minimum frame size rules. The transmitters now have two tasks—first, they issue a 32-bit jam signal to ensure all devices are aware of the collision, then they back off and wait for another chance to transmit.

Here is where the truncated binary exponential backoff algorithm comes in. The backoff time is dependent upon the following formula, where r is a random integer between the two values and n is the number of transmission attempts:

    (0 > r >2k) * slot time
    k = min (n, 10)

If, after sixteen attempts, a node does not manage a transmission, it stops trying.

		Section 6.2.7. Physical Layer
So far we’ve discussed the operation and framing of Ethernet from Layer 2 of the protocol stack. The Physical Layer specifies the electrical and mechanical properties such as voltage levels, encoding schemes, and the connectors. On a practical note, users are given limited options when configuring a network. We no longer use NICs that have different types of connector. Connectors are almost always RJ45 terminations for UTP. Before we look at the electrical details, it is worth spending some time on the cabling and connectors. It turns out that this is where we make many of our mistakes.

			6.2.5.1 
Cabling

UTP wiring is the most common network media type and is used for VoIP phones, Token Ring, FDDI, Ethernet, and many others. UTP describes the construction of the actual wiring. That is, eight conductors, twisted into four pairs, with nothing but plastic protecting the copper from the environment. The conductor size is American Wire Gauge (AWG) 22-26. The RJ45 jack (male or female) has eight pins for these connections and a locking tab to keep it secure in the outlet.

Figure 2-15 shows both the male and female RJ45 jacks. On the male, pins 1 is at the top and is connected to the orange pair along with pin 2. In the female jack, pin 1 is on the right. UTP cabling is tested for performance and given a rating, or category, based on this performance. The standard categories and some of their performance ratings are given in Table 2-2.

Figure 2-15. RJ45 male and female ends


Table 2-2. Cable specifications
 	Attenuation (insertion loss)	Reflection	Near end crosstalk	Max frequency
Category 5	22dB	15.1dB	32.3dB	100MHz
Category 5e	22dB	20.1dB	35.3dB	100MHz
Category 6	19.8dB	20.1dB	44.3dB	250MHz


Note:

Values given in Table 2-2 are for 100MHz operation and there are differences between cable types. Additionally, Category 3 cables are not rated for performance at these frequencies.

As the category number increases, so does the range of frequencies that can be sent over the cable. This means a greater data rate and improved performance. These improvements are due largely to the change in the construction of the cable. The biggest physical difference is in the number of twists per inch in each pair of conductors. The higher the number of twists, the better the cable is at avoiding crosstalk and interference problems. Figure 2-16 shows the differences between early Category 3 (Cat 3) cable through Category 5e (Cat 5e) to Category 6 (Cat 6).

Figure 2-16. Cable construction comparison


A close look at Figure 2-16 reveals several interesting characteristics about the cable construction. First, Cat 3 cables (top) have very few twists when compared to the others. In fact, 3–5 twists per foot is the standard. Cat 5e has 3–5 twists per inch and if we look closely we can see that the individual pairs have different twist densities. Cat 6 cable (bottom) can have even more twists, but may add the plastic separator and the bond the pairs together. These make the cable an excellent transmission medium, although it makes life more difficult for the cable installer when terminating cables manually, as the pairs typically have to be separated.

In addition to categories, individual conductors can be manufactured differently. Permanent cabling (horizontal cabling) is installed in the wall connecting the female jack to the wiring closet distribution frame. This cabling is fabricated using solid copper for each of the eight individual conductors. Patch cables connect your computer to the wall jack and make connections in the data closet. Patch cables are constructed using stranded copper. If you were to take one of the eight conductors and strip off the insulation, you would see many small strands of copper rather than one thicker piece. This stranding makes the cable more flexible and therefore less likely to break than solid core, but it increases the attenuation of the signal it carries. For this reason, we usually like to keep the patch cables as short as possible. These differences can be seen in Figure 2-17.

Figure 2-17. Stranded vs. solid core cable


Both permanent cabling and patch cables are straight-through, which means that pin 1 on one end goes to pin 1 on the other and so on. These connections follow the EIA/TIA 568 cabling standards. For data networks, we are actually concerned with EIA568B, while telecommunications networks generally employ EIA568A. A straight-through data cable is terminated on both ends using 568B.

At the Physical Layer, Ethernet uses only pins 1, 2, 3, and 6 for transmission and reception (Table 2-3).

Table 2-3. Ethernet pin usage
1	Tx+
2	Tx−
3	Rx+
6	Rx−


Pins 4 and 5 can be used to handle traditional telephone connections and the telephone jack (RJ11 style) fits right into the center of an RJ45. In addition, modern communications often deploy power over Ethernet, or PoE. This also runs over unused connectors. Power over Ethernet is standardized in IEEE 802.3af and 802.3at. These standards describe the method and electrical characteristics used to energize devices such as VoIP phones and access points over the unused pairs of the Ethernet cable. This is a much more convenient solution than installing power outlets everywhere.

In addition to categories and construction, there are several different nonpermanent cable types used on a network, including straight-through, crossover, and rollover. They all use the same stranded copper, but the pins don’t always start and end in the same place. Standard straight-through patch cables are used to connect a computer to a hub or switch. However, they do not work when connecting computers directly together or when interconnecting some network devices. A standard patch cable is likely a stranded, Category 5e, straight-through (568B to 568B) data cable terminated with RJ45 jacks. But most people just call it an Ethernet cable, even though the exact same cable might be used for a Token Ring network or a VoIP phone.

A crossover cable allows two computers or two switches to be connected directly together by crossing the receive wires to the transmit lines. A crossover cable is terminated using 568B on one end and 568A on the other. To simplify things, we can look at the orange and green pairs. Table 2-4 depicts the mapping, or pinouts, of 568A and 568B.

Table 2-4. 568A and B pins
T568A for patch cable	T568B for patch cable
Pin	Wire color	Pin	Wire color
1	White/green	1	White/orange
2	Green	2	Orange
3	White/orange	3	White/green
4	Blue	4	Blue
5	White/blue	5	White/blue
6	Orange	6	Green
7	White/brown	7	White/brown
8	Brown	8	Brown


This crossing is normally handled by the switch or hub.

When a network administrator configures a device such as a router, it is often accomplished via a rollover cable connected to a console port. A rollover cable maps pin 1 to pin 8, pin 2 to pin 7, pin 3 to pin 6, and pin 4 to pin 5. We use these cables to connect from a computer serial (COM) port to a switch/router console port, and EIA232 is used for communication. When connecting a DB9 serial port to a router console port, the rollover cable is connected to a terminal adapter that converts the RJ45 wiring to DB9. Often, these cables come premade with the conversion built in. Figure 2-18 shows networks utilizing the various cable types.

The top image in Figure 2-18 shows two computers directly connected to each other. The required cable is an Ethernet crossover. The same is true of the switch-to-switch connection if an uplink port is not present. The straight-through Ethernet patch cables are running between the computer and the switch. There is also a straight-through cable between the router and the switch. Finally, the management station is connected to the router console port via a rollover cable. Of course, ports on newer devices negotiate many of the cross connections for us, but we’re better off knowing how things work.

Figure 2-18. Connection and cable types

			6.2.5.2

		Section 6.2.8. Encoding
		Section 6.2.9. Other Types of Signaling
		Section 6.2.10. Topologies
		Section 6.2.11. Final Thoughts on Ethernet
		Section 6.2.12. Reading
		Section 6.2.13. Summary
		Section 6.2.14. Review Questions
		Section 6.2.15. Review Answers
		Section 6.2.16. Lab Exercises

Section 3.1. Protocol Description

Section 3.2. Structure

Section 3.3. Addressing

Section 3.4. Operation

Section 3.5. Digging a Little Deeper...What Addressing is Sufficient?

Section 3.6. Security Warning

Section 3.7. Organizations for Assigning Addresses and Names

Section 3.8. Standards and RFCs

Section 3.9. Summary

Section 3.10. Review Questions

Section 3.11. Lab Exercises
Download ChapterDownload Chapter
1 TokenChapter 4. Address Resolution Protocol

Section 4.1. The Problem

Section 4.2. Techniques

Section 4.3. Protocol Description

Section 4.4. Structure

Section 4.5. Addressing in the ARP Request

Section 4.6. Addressing in the ARP Reply

Section 4.7. Operation

Section 4.8. Additional Operations

Section 4.9. Security Warning

Section 4.10. IPv6

Section 4.11. Digging a Little Deeper

Section 4.12. Standards and RFCs

Section 4.13. Summary

Section 4.14. Review Questions

Section 4.15. Review Answers

Section 4.16. Lab Activities
Download ChapterDownload Chapter
1 TokenChapter 5. Network Equipment

Section 5.1. Tables and Hosts

Section 5.2. Hubs or Repeaters

Section 5.3. Switches and Bridges

Section 5.4. Access Points

Section 5.5. Routers

Section 5.6. Multilayer Switches and Home Gateways

Section 5.7. Security

Section 5.8. Summary

Section 5.9. Review Questions

Section 5.10. Review Answers

Section 5.11. Lab Activities
Download ChapterDownload Chapter
1 TokenChapter 6. Internet Control Message Protocol

Section 6.1. Structure

Section 6.2. Operations and Types

Section 6.3. Digging a Little Deeper—the One’s Complement

Section 6.4. IPv6

Section 6.5. Summary

Section 6.6. Additional Reading

Section 6.7. Review Questions

Section 6.8. Review Answers

Section 6.9. Lab Activities
Download ChapterDownload Chapter
1 TokenChapter 7. Subnetting and Other Masking Acrobatics

Section 7.1. How Do We Use the Mask?

Section 7.2. What Is a Subnet?

Section 7.3. Subnet Patterns

Section 7.4. Subnet IP Addressing

Section 7.5. A Shorthand Technique

Section 7.6. The Effect on Address Space

Section 7.7. Theory vs. Reality

Section 7.8. Supernetting

Section 7.9. The Supernetted Network

Section 7.10. Classless Inter-Domain Routing

Section 7.11. CIDR and Aggregation Implementation

Section 7.12. Summary

Section 7.13. RFCs and Reading

Section 7.14. Review Questions

Section 7.15. Review Answers

Section 7.16. Lab Activities
```
