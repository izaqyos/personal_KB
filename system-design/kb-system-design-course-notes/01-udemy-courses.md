---
type: reference
title: Udemy courses
description: Section 1 of the legacy system-design-course-notes notes.
tags: [kb-system-design-course-notes]
generated: { by: "human:izaqyos", at: "2026-04-10T12:50:58Z" }
status: stable
capture_type: source
legacy_source: "system-design/system-design-course-notes#1"
---

# Udemy courses

[↑ system-design-course-notes](/system-design/kb-system-design-course-notes/README.md)

## 1.1 Software Architecture & Design of Modern Large Scale Systems

```text
What is Architecture?- definition of systems Components and how they communicate in order to fulfill the system requirements and adhere to system constraints
```

### 1.1.1 system requirements and architectural drivers

#### 1.1.1.1 functional requirements (aka features)

```text
- what the system should do/provide
- the systems objectives
- blackbox description. given valid input, what the system should output

They do not dictate the architecture. 
```

#### 1.1.1.2 Quality attributes - aka non-functional requirements

```text
- must have properties
- ex. Scalability, reliability, availability, security, Performance

They do dictate the architecture. 
```

#### 1.1.1.3 systems constraints

```text
Time/Financial/Staffing constraints 
e.g. short deadlines, low budget, small number of engineers
            1.1.1.4
```

### 1.1.2 Feature requirements step by step process

```text
- gathering the requirements:
    -- naive way - ask customer exactly what they require. cons. most likely customer will not know all the details
    -- Better way. use cases and user flows 

- steps:
a. identify actors (users)
b. list all possible use-cases (scenarios)
c. list all user flows. expand each use-case with the flow of events. Each event contains action+data

typically UML and sequence-diagrams are used
```

### 1.1.3 Quality attributes / non functional requirements

```text
Motivation. Studies show Systems are frequently redesigned not b/c of new functional requirements but b/c of non-functional requirements
e.g.
- Performance
- Scale
- development velocity
- maintenance difficulty
- security
- availability 
- deployability 

Sometimes these are reflected in SLAs

They should be measurable and testable
like 'quick response'  isn't measurable. but 'withing 200ms' is...

No single Architecture can satisfy all possible quality-attributes. 
some combinations contradict or else very hard if not impossible to achieve
Examples.
security may require disk level encryption which deteriorates performance

Sometimes customers ask for impossible or too expensive qualities. 
Ex.
- customer asks for 50ms latency while network latency to nearest DC is 100ms
- SLA of 100% availability. This means that the system may never fail and can't be taken down for maintenance and upgrades
- full protection vs hackers
-

To Summarize. The important considerations are
- testable and measurable
- trade offs
- feasibility
```

### 1.1.4 system constraints

```text
        definition: a decision that was made for uself.getLeafVal(s
because they are non) negotiable the system must be designed around them.
So they serve as the foundation for the design
There are three types of constraints:
- Technical - e.g. DB restriction, cloud vendor restriction, programming language restriction etc
    Although it would seem like they should no effect system design they many times do.
    ex: If DCs are on-prem only then cloud Integration becomes infeasible or cost prohibitive
    or, must support old browsers/clients. => we can't use modern protocols, languages etc
- business. ex. limited budget, strict deadlines. policy re. 3rd party software/providers
- legal. global/regional. ex. HIPAA for medical records in USA. or GDPR in europe

considerations:
- distinguish between non-removable vs. removable/negotiable constraints. Like legal can't be removed but budget/deadlines can be negotiable
- build loosely coupled architecture. so that it can be changed if/when a constraint is removed. ex. restriction to a specific DB. should design separation layer so that in the future if it's possible to move to a different DB the transition is smoother

        1.1.5
```

## 1.2 most important quality attributes in large scale systems

### 1.2.1 Performance

#### 1.2.1.1 response time

```text
time between sending a request and getting a response
response Time = processing time + waiting time
processing time = cpu, internal IP (e.g. DB queries) etc
wait time= wire transition time, time spent in processing queues etc
both processing time and wait time are Sometimes referred to as latency 

when measuring response time it's important to take into account the waiting time as well.
like if the system handles requests synchronously then processing time of first request can be sufficient but Subsequent requests coming at same time 
may have to wait in incoming requests queue

another important aspect is response time distribution. ideally responses should be around the same time 
so we need to take distribution into account and decide which metric to use. average, mean, maximum etc 
we can create a histogram and deduce the percentiles. the 20% the 50% (median)
so if the median is 20 ms it means 50% of requests response time is <=20ms
Sometimes both average and median are good enough but above the 90% or 95% are not - this is referred to as tail latency - the small percent of responses which take the longest compared to the other requests 

So a response time metric should be Something like - we want 30ms for 95th percentile of response time
```

#### 1.2.1.2 throughput

```text
how much data can the system handle
defined either as amount of work/time (TPS) or data per time (MBPS, KBPS etc)
```

#### 1.2.1.3 Performance degradation

```text
identify degradation point and steepness
degradation point is the point at which performance starts to drop.
It can be due to high CPU usage/memory consumption/connecions/IO full queues etc

            1.2.1.4
```

### 1.2.2 Scalability

```text
definition: the measure of a systems ability to handle more work in an easy&cost-effective way by adding resources to the system.

- traffic / load on our systems changes, usually following a pattern.
  ex: Online stores would see seasonal spikes. search engines would see spike following a global event etc. 
- In general, if our system/product is successful the load is expected to Increase over time
as mentioned, degradation point is the point at which performance starts to drop.

A System Design is said to be more scalable if for some effort/budget it performs better under load

scale directions:
a. scale-up, aka vertical scalability. Give more resources to our server. More CPU/memory/NiC etc.
b. scale-out, aka horizontal scalability. Add more servers, more DBs etc
c. team/organizational scalability
```

#### 1.2.2.1 scale-up

```text
Pros:
any application can benefit
no changes in code
migration is easy 

Cons:
upgrade high limit is capped at HW resources
locked to a centralized system. So no HA (High Availability) or FT (Fault Tolerance)
```

#### 1.2.2.2 scale-out

```text
Pros:
application must be adapted/implemented for horizontal scalability
increased complexity, management overhead

Pros:
upgrade high limit is not capped. unlimited growth
easy to add/remove instances
With proper design. HA (High Availability) or FT (Fault Tolerance)
```

#### 1.2.2.3 team scalability

```text
definition: the measure of a systems ability to handle more work in an easy&cost-effective way by adding resources to the system.
If we apply to development process then work would be: features, bug fixes, releases, testing 
resources would mean engineers

So when working on a monolith the more engineers we add the more productivity increases. until we reach a degradation point. 
Why degradation?
- more crowded meetings
- code merge conflicts 
- bussiness complexity, longer learning curve
- testing gets harder & slower
- releases are riskier 
```

#### 1.2.2.3.1 Increase team Scalability - breakdown to modules

```text
- more crowded meetings. Improve
- code merge conflicts . Improve
- bussiness complexity, longer learning curve. Improve
- testing gets harder & slower. Improve
- releases are riskier. Still a problem. modules are tightly coupled 
```

#### 1.2.2.3.2 Increase team Scalability - breakdown to services, aka Microservices

```text
Currently quite popular in the industry. My current product at SAP is designed this way...

                1.2.2.3.3
            1.2.2.4
```

### 1.2.3 availability

#### 1.2.3.1 importance

```text
crucial. service down is very frustrating, can cause ripple problems, legal suites etc 
loss of life etc

bussiness wise. 
downtime == no profit
downtime == use competition service
```

#### 1.2.3.2 definition

```text
availability = uptime / total running time 

alternative definition:
availability = MTBF/(MTBF + MTTR)
MTBF - mean time between failures
MTTR - mean time to recovery (average downtime)

0 MTTR leads to 100% availability. ofc not feasible.
but shows that detectability and fast recovery increase availability

users want 100% availability
not really feasible

90% availability means 2h 24min downtime daily - a lot! 
99.9% - 1m 26sec - cloud industry standard

"3 nines" 99.9


            1.2.3.3
```

### 1.2.4 Fault-Tolerance and High-Availability

```text
Fault reasons:

a. human error
    - push wrong config to production
    - running wrong command/script
    - deploy of non production ready version
b. software errors

    - long GC cycles
    - OOM
    - crashes, segmentation violation etc
c. Hardware failures
    - power outages
    - end of shelf life
    - network down

So despite our efforts (CRs, testing, automtion etc) faults will happen. 
Fault-Tolerance, Systems remain operational and available despite failures in one or more components, is thus very important

Fault-Tolerance is comprised of three principals:
a. failure prevention 
    a1. spatial redundancy
eliminate single points of failure
e.g. single server, single DB instance. 
Use redundancy and replication

    a2. Time redundancy
    basically retry policy

    a3. replication strategies
        - active active  architecture. all instances serve requests. They replicate in real-time
        pros: load balancing
        cons: all instances are active. making coordination more difficult
        - active passive  architecture. one primary instance serves requests. 
        pros: easier to implement
        cons: less efficient/scalable
    a4.
b. failure detection
detection of failure in an instance/component and redirect load to healthy components/instances
typically a monitoring service is used. It usually send is_alive requests periodically
Or it can listen for "heartbeat" messages

false positives may happen due to temporary load (GC) or network congestion (down)
but that's ok so long as there are no false negatives (instance considered alive when it's in fact down)

monitoring Systems can collect data in the form of error rates or response time and can treat exceeding a certain threshold as fault

c. recovery 
    - reroute traffic to healthy instances
    - restart 
    - rollback (DB, software versions)
```

### 1.2.5 SLA, SLO, SLI

#### 1.2.5.1 SLA

```text
Service level agreement. bussiness and legal driven
a legal contract encompassing availability, performance etc and states penalties for failing to meet the agreed level
```

#### 1.2.5.2 SLO

```text
Service level objectives. The target values for quality attributes. SW engineers and architects set and define
ex. 
availability of 3 nine (99.9)
response time of < 100ms for the 90th percentile
ticket resolution within 24h

SLA includes several SLOs 
```

#### 1.2.5.3 SLI

```text
Service level indicator, quality attributes measured values. SW engineers and architects set and define

metrics that can be used to indicate compliance to SLAs 
like % of successful responses as a measure of availability
or calculate the response time distribution to verify SLO of response time of < 100ms for the 90th percentile is met
```

#### 1.2.5.4 considerations

```text
- SLOs for metrics that users most care about
- the fewer SLOs the better
- set realistic goals w/ some margin for error. e.g. we can provide 5 9s availability but set SLO for 3 9s.
allows to save costs and leaves room for error
- recovery plan if our SLIs show our SLOs are not met. should consist of 
  -- alerts to engineers/devops
  -- auto Scaling/Failover/restarts etc
  -- guides for certain error situations
```

#### 1.2.5.5 industry Examples

```text
https://aws.amazon.com/legal/service-level-agreements/?aws-sla-cards.sort-by=item.additionalFields.serviceNameLower&aws-sla-cards.sort-order=asc&awsf.tech-category-filter=*all
https://cloud.google.com/terms/sla
https://azure.microsoft.com/en-us/support/legal/sla/
https://github.com/enterprise-legal/github-online-services-sla
            1.2.5.6
        1.2.6
```

## 1.3 API Design

### 1.3.1 Introduction

```text
API, application programming interface
It's the contract between the application and its users/Consuming applications
callers of API could be:
    - Frontend clients (browsers/mobile apps)
    - Backend Systems
    - other Systems
```

### 1.3.2 API Categories

#### 1.3.2.1 Public APIs

```text
exposed to general public
A good practice is to request user registration for our system before they can use it.
The benefits are: control who and how uses our system, improves security and allows to black list unwanted users 
```

#### 1.3.2.2 private APIs

```text
exposed internally in our organization
only available for other teams that work with us  
```

#### 1.3.2.3 Partner APIs

```text
             companies that have a business relationship with us and want to use our services
they can have license, contract or use a subscription service
            1.3.2.4
```

### 1.3.3 API benefits

```text
- A client can immediately consume our services
- No knowledge re. our system is required
- Client can start building and even testing their system even before our service is ready by mocking it
```

### 1.3.4 API best practices

```text
- completion encapsulation
abstract any implementation details from using developer
decouple API from internal design and implementation

- Easy to use and understand
    -- one way to do things
    -- swagger, descriptive names
    -- expose only what's required 
    -- consistency
- impossible to misuse
- keep the operations idempotent
idempotent: no additional effect if used more than once
ex: update user address
not idempotent: add 100$ to user account
Why is it important? 
    - since requests are sent over network they can be lost, not received or the response could be lost
    - so clients may have no idea if operation succeeded
    - clients want to retry in such cases. so idempotency is important

- pagination
for very large response payloads
like get all your emails at once

such payloads would take a long time and crash the clients

- asynchronous operations
    when the operation is complex and takes a long time 
    like working with multiple databases generating a big report
in contrast to blocking API the client get immediate answer with an identifier used for tracking progress and obtain the final result

- API versioning
Sometimes we must make non backward compatible changes. By versioning we can have two versions of the API at the same time and can deprecate the old version gradually
```

### 1.3.5 RPC

```text
RPC. Remote Procedure Call 
Call remote function. From developers POV looks like normal function call 
exhibits location transparency - from callers perspective local and remote calls are indistinguishable
usually multiple programming languages are supported
clients and server use IDL (interface descriptive language) as a schema definition of the communication
Then usually a RPC code generation tool generates code for both the server and the clients in the form of stubs or DTO (data transfer objects)
So flow looks like this.
A. client calls fooResponse = foo(user: string, city: string)
client stub serializes/marshalls data to be sent over transport layer (so uses TCP to connect to server and send request)

B. From server side, server stub listens for incoming requests, then deserializes/unmarshalls the payload and then the real server function is called 
then response is sent back via server stub (again serializing before transport)

C. client receive incoming response, then deserializes/unmarshalls the payload and returns result to calling function
It's an old concept that evolved over the years. frameworks, implementation details and efficiency are what's changed 

As API developers we should:
 - pick appropriate framework
 - define the API schema (methods, data types) using IDL 
 - Publish schema.
Then server and clients are decoupled only requiring the generated stubs 
Client can use whichever language is supported by the framework 

benefits of RPC 
- very convenient for the developers
- communication details are abstracted from devs 
- failures manifest as exceptions/errors

drwabacks of RPC:
- unexpected slowness b/c what seems as local method is actually executed remotely
- can be mitigated by using asynchronous calls 
- could be unreliable. Leaving clients in uncertainty whether the server processed the request and response got lost or never received the request 
This is why idempotent operations are important

When to use RPC:
- common between 2 Backend Systems
- less common from Frontend

When not to use RPC:
- when network abstraction is unwanted
like if we want to use HTTP cookies and headers

RPC revolves around actions and less about resources/data 
Every action is a method 

For CRUD data-centric API RPC is less of a good fit 

popular RPC frameworks:
- gRPC 
gRPC is a modern open source high performance Remote Procedure Call (RPC) framework. It was originally developed by Google in 2015 as the next generation of its own internal RPC infrastructure.

It uses HTTP/2 as its transport protocol and Protocol Buffers as its Interface Description Language.
gRPC currently supports the following languages:

C# C++ Dart Go Java Kotlin Node Objective-C PHP Python Ruby

- Apache Thrift
Thrift is a lightweight, language-independent software stack for point-to-point RPC.

Thrift makes it easy for programs written in different programming languages to share data and call remote procedures since it supports more than 28 languages, including C++, Java, Python, Go, Scala, Swift, PHP, Ruby, Perl, C#, JavaScript, Node.js, and other languages.

Thrift was created at Facebook for "scalable cross-language services development". It uses its own Interface Description Language called Thrift interface description language.

A full tutorial for all the supported languages can be found here.

- Java Remote Method Invocation (RMI)
RPC framework that allows one Java virtual machine to invoke methods on an object running in another Java virtual machine.
RMI uses Java as the Interface Description Language.

- 
```

### 1.3.6 REST

#### 1.3.6.1 what is REST API

```text
REST - originally presented in a dissertation by Roy Fielding in 2000. REST = Representational State Transfer
It's a set of architectural constraints and best-practices for WEB APIs
It is not a standard/protocol
It's a set of architectural guidelines for developing east to use APIs 
facilitates quality Attributes such as: Performance, Scalability, High-Availability

REST vs RPC 
RPC:
- very convenient for the developers, revolves around familiar concept of methods exposed via an interface/s
- API expands by adding more methods
- communication details are abstracted from devs 
- failures manifest as exceptions/errors

REST:
- resource oriented, abstracts to use a named resource
- provides CRUD for resources 
- client receives from server a representation of the resource (not necessarily same as internal representation)

in RPC the client range of actions is predetermined via the IDL 
in RESTful API, the interface is more dynamic via HATEOAS (Hypermedia as the application state), this is usually implemented by adding a link to the next state in the response
ex response:
{
    "account": {
        ...
    },
    "links": {
        "authorization": "/accounts/atz",
        "configuration": "/accounts/config",
    }
}
```

#### 1.3.6.2 REST quality attributes

```text
REST principals dictate that the server is stateless 
server should not save session information about client and should serve each request independently

maintaining statelessness allows to scale servers horizontally

- cacheability , servers flags each response as cacheable or not. in case of cacheable clients can read from cache and save round-trip to server
```

#### 1.3.6.3 REST named resources

```text
- each resource is represented via a uri
- hierarchy represented via "/"
- a simple resource has a state and can contain one or more sub-resources
- a collection resource contains a list of resources of same type 
ex:
http://foo.bar/foobars (collection)
http://foo.bar/foobars/foobar1 (resource)
http://foo.bar/foobars/foobar2 (resource)
http://foo.bar/foobars/foobar3 (resource)
each resource can have sub  collection/simple resources. e.g.
http://foo.bar/foobars/foobar3/authors
http://foo.bar/foobars/foobar3/authors/yosi

Naming best-practices 
- name using nouns, helps distinguish from verbs (used for actions)
- distinguish between collection and simple resources. plural for the first singular for the latter
- use meaningful names, avoid generic names (collections, entities, instances, objects, values etc)
```

#### 1.3.6.4 REST API operations

```text
operations are CRUD using HTTP methods as follows
- create, POST
- read, GET
- update, PUT
- delete, DELETE
guarantees:
- GET never changes object state
- GET, PUT and DELETE are idempotent 
- GET requests are usually cacheable
- POST responses can be cacheable by setting appropriate HTTP headers

client data is sent as json (xml is also ok)
```

#### 1.3.6.5 guidelines for defining a REST API

```text
a. identify entities
b. map them to URIs 
c. define their representation
d. assign HTTP methods to operations on resources
            1.3.6.6
        1.3.7
```

## 1.4 Large Scale Systems architectural building blocks

### 1.4.1 dns, load-balancing

```text
load balance between multiple server instances w/o a need for client to know about the group of servers. 
So from clients PoV there's only a single server

provides Quality attributes:
- Scalability (add/remove instances), can use auto scaler
- High-Availability, LBs can be configured to only send traffic to healthy instances
- Performance. LBs add a bit latency but increase throughput significantly
- Maintainability. Perform maintenance on a few instances at a time while the rest of instances are working

DNS servers act as load-balancer of sorts since it returns a list of IP addresses in response to 'A' query from which clients just pick the first
So if the server round-robin's the list the load is balanced
It's a simple and cheap load-balancing solution but it has drawbacks:
a. no taking into account unhealthy servers 
b. the address list may be cached closer to client (so no rotation) or take a very long time to refresh
c. strategy is always round-robin (so doesn't take into account which servers are heavy loaded vs. lightly loaded)
d. since client gets all servers IPs there's no decoupling or abstraction of LB. It's also less secure (reveals IP addresses)

So a better solution are HW/SW LBs 
They hide the actual server IPs
They can monit servers health and load 
So they can balance load more smartly

LBs should be in same DC/LAN as their served servers (save RTT)
They require DNS ofc

GSLB - Global Service load-balancers
it's a hybrid DNS and SW/HW LB solution
matches the closes DC LB to the user's location
They can be configured to route to DC according to load, mean response time
Can also reroute to healthy DCs in case a whole DC is down
```

### 1.4.2 load-balancing solutions

```text
Open Source Software Load Balancing Solutions
```

#### 1.4.2.1 HAProxy

```text
HAProxy is a free and open-source, reliable, high performance TCP/HTTP load balancer.
It is particularly suited for very high traffic web sites, and powers a significant portion of the world's most visited ones. It is considered the de-facto standard open-source load balancer, and is  shipped with most mainstream Linux distributions.
HAProxy supports most Unix style operating systems.
```

#### 1.4.2.2 NGNIX

```text
NGINX is a free, open-source, high-performance HTTP server and reverse proxy (load balancer). It is known for its high performance, stability, rich feature set and simple configuration.
For a full tutorial on how to install, configure and use NGNIX follow this link.



Cloud Based Load Balancing Solutions
```

#### 1.4.2.3 AWS - Elastic Load Balancing (ELB)

```text
Amazon ELB is a highly scalable load balancing solution.

It is an ideal solution for running on AWS, and integrates seamlessly with all of AWS services.

It can operate on 4 different modes:

Application (Layer 7) Load Balancer - Ideal for advanced load balancing of HTTP and HTTPS traffic

Network (Layer 4) Load Balancer - Ideal for load balancing of both TCP and UDP traffic

Gateway Load Balancer - Ideal for deploying, scaling, and managing your third-party virtual appliances.

Classic Load Balancer (Layer 4 and 7) - Ideal for routing traffic to EC2 instances.

For the full documentation on Amazon ELB and its autoscaling policies follow this link
```

#### 1.4.2.4 GCP - Cloud Load Balancing

```text
Google Cloud Platform Load Balancer is Google's, highly scalable and robust load balancing solution.

"Cloud Load Balancing allows you to put your resources behind a single IP address that is externally accessible or internal to your Virtual Private Cloud (VPC) network".

Some of the load balancer types available as part of the GCP Cloud Load Balancing are:

External HTTP(S) Load Balancer - Externally facing HTTP(s) (Layer 7) load balancer which enables you to run and scale your services behind an internal IP address.

Internal HTTP(S) Load Balancer - Internal Layer 7 load balancer that enables you to run and scale your services behind an internal IP address.

External TCP/UDP Network Load Balancer - Externally facing TCP/UDP (Layer 4) load balancer

Internal TCP/UDP Load Balancer - Internally facing TCP/UDP (Layer 4) load balancer
```

#### 1.4.2.5 Microsoft Azure Load Balancer

```text
Microsoft Azure load balancing solution provides 3 different types of load balancer:

Standard Load Balancer - Public and internal Layer 4 load balancer

Gateway Load Balancer - High performance and high availability load balancer for third-party Network Virtual Appliances.

Basic Load Balancer - Ideal for small scale application

GSLB Solutions

            1.4.2.6 Amazon Route 53 - Amazon Route 53 is a highly available and scalable cloud Domain Name System (DNS) web service.

            1.4.2.7 Google Cloud Platform Load Balancer & Cloud DNS - Reliable, resilient, low-latency DNS serving from Google's worldwide network with everything you need to register, manage, and serve your domains.
```

#### 1.4.2.8 Azure Traffic Manager - DNS-based load balancing

```text
            1.4.2.9
```

### 1.4.3 message-brokers

#### 1.4.3.1 message-brokers motivation

```text
synchronous communication:
client and server maintain a direct or indirect connection for communication
pros:
simple and straightforward
good for short lived small transactions

cons:
both client and server instances must be healthy and maintain connection
gets complex when the transactions take long, involve multiple backend services that may take a long time or fail and require retry
Doesn't handle spikes in traffic well 

Introducing message-brokers to alleviate these shortcomings
a message-broker stores messages in a queue 
It is not exposed externally
basic message-broker capabilities:
- Storing the messages 
- messages routing 
- messages validation
- messages transformation
- load balancing
- decouple senders and receivers
- fundamental building block for asynchronous systems

It can scale better and handle spikes since frontend facing services can register units of work or update job count etc.    
Also usually provide pub/sub pattern where publisher sends message to a particular channel and interested receivers subscribe to the channel to be notified on new messages
```

#### 1.4.3.2 quality-attributes

```text
- Fault-Tolerance - even if some instances are down the system still keeps working (since healthy receivers keep processing messages from Q)
Also message-brokers implementation provide guarantees to prevent messages loss
- High-Availability due to Fault-Tolerance 
- Scalability
```

#### 1.4.3.3 message-brokers solutions

```text
Open Source Message Brokers

                1.4.3.3.1 Apache Kafka - The most popular open-source message broker nowadays. Apache Kafka is a distributed event streaming platform used by thousands of companies for high-performance data pipelines, streaming analytics, data integration, and mission-critical applications.

                1.4.3.3.2 RabbitMQ - A widely deployed open source message broker. It is used worldwide at small startups and large enterprises.

Cloud Based Message Brokers

                1.4.3.3.3 Amazon Simple Queue Service (SQS) - Fully managed message queuing service that enables you to decouple and scale micro-services, distributed systems, and serverless applications.

                1.4.3.3.4 GCP Pub/Sub and Cloud Tasks - Publisher/Subscriber and message queue solutions offered by Google Cloud Platform. See this article for comparison between the two offerings

                1.4.3.3.5 Microsoft Azure Service Bus - Fully managed enterprise message broker with message queues and publish-subscribe topics
```

#### 1.4.3.3.6 Solace

```text
https://solace.com/solutions/initiative/messaging-middleware/?utm_source=Google&utm_medium=Paid-Advertising&utm_campaign=MessagingMiddleware-PPC-Oct21-Branded&utm_content=MessagingMiddleware-PPC-Search-AllRegions-Branded&gclid=Cj0KCQiAosmPBhCPARIsAHOen-NZJ2DEvluyuURzE0IdkNHWP7WyX5h5mTztAMm5757Ruj4lc3fYNW8aAuAXEALw_wcB

                1.4.3.3.7
            1.4.3.4
```

### 1.4.4 API Gateway

```text
motivation: As backend services monoliths Increase in size and complexity a common best-practice is to break it down to multiple microservices
As a result where the monolith had one API now there are multiple APIs 
Now clients need to be aware of internal services APIs and implement their logic while coupled to these APIs. Also each microservice must implement same functionality of security and audit 
In order to eliminate this tight coupling of the client to internal APIs API Gateways are used 
It's an API management service that follows API composition pattern. So it composes the different APIs into a single exposed API
benefits:
- Allows internal changes to be made w/o end clients even being aware of that
- consolidate security rate-limiting and AAA (authentication, authorization, audit) into one component
- request routing, client single request is routed to multiple services and the response is the aggregation of the results
- caching of static content and responses
- monitoring and alerts
- protocol Translation 

considerations and antipatterns
- should not contain bussiness logic (slippery slope back to monolith)
- focus on API composition and routing to backend services
- single point-of-failure - so bugs related downtime of API-Gateway can bring the whole system down
- bypass API-Gateway, this an antipattern as it reintroduces tight coupling  

- Open Source API Gateways
Netflix Zuul
Zuul is a free and open-source application gateway written in Java that provides capabilities for dynamic routing, monitoring, resiliency, security, and more.

Cloud-Based API Gateways
Amazon API Gateway
Amazon API Gateway is a fully managed service that makes it easy for developers to create, publish, maintain, monitor, and secure APIs at any scale. Supports RESTful APIs and WebSocket APIs (bi-directional communication between client and server).

Google Cloud Platform API Gateway
Google Cloud Platform API Gateway enables you to provide secure access to your services through a well-defined REST API that is consistent across all of your services, regardless of service implementation. For full documentation follow this link.

Microsoft Azure API Management
API Management helps organizations publish APIs to external, partner, and internal developers to unlock the potential of their data and services.
```

### 1.4.5 CDN (Content-Deliver-Network)

```text
motivation: global service, multiple DCs (Data-Centers). DCs serve large geographical areas so users can experience latency due to multiple hops (between routers on path)
latency example:
user is 200ms on average for RTT to DC. 
HTTP is over TCP.
TCP 3-way handshake (ack, syn-ack, ack) already 600ms 
first request-response to load initial page - 400 ms
Now browser fetch page assets. Say N assets. so gets N responses with assets. So 200MS + N*200ms
N=10 for instance - we get 3.2 sec to load page
Take into account google analytics from 2016 indicating that 53% of users abandon web Pages w/ load time > 3 sec

This is what CDNs solve. 
- It's a global network of servers hosting static resources with the goal of improving delivery times
- CDN servers are called edge servers located at different PoPs (Points-of-Presence)
- these servers are strategically placed so that they reduce the time to deliver static content to users (making our service seem more performant)
- usually deliver, texts, images, videos, JS and CSS

CDN quality-attributes:
- Performance
- High-Availability (since most content comes from CDN)
- security (DDOS) 

For previous example lets assume a CDN at 50MS RTT distance the total time is 800 ms

content publishing strategies:
- pull. Specify to CDN which content should be cached and what is it's TTL. sort of lazy cache 
    pros: lower maintenance
    cons: first users will have cold start (longer time) , spikes when multiple assets TTL expire
- push. our service pushes content explicitly to CDN
good for infrequently updated content

- solutions:
Cloudflare
Cloudflare offers ultra-fast static and dynamic content delivery over our global edge network. It helps reduce bandwidth costs and takes advantage of built-in unmetered DDoS protection.

Fastly
Fastly's Deliver@Edge is a modern, efficient, and highly configurable CDN that gives you the freedom to control how your content is cached so you can deliver the content your users want quickly.

Akamai
Akamai has a large variety of offerings for API Acceleration, Global Traffic Management, Image & Video Management, Media Delivery, and much more.

Amazon CloudFront
Amazon CloudFront is a content delivery network (CDN) service built for high performance, security, and developer convenience. Some of its use-cases include delivering fast secure websites, accelerating dynamic content delivery and APIs, live streaming, video-on-demand, and others.

Google Cloud Platform CDN
GCP CDN offers fast, reliable web and video content delivery with a global scale and reach.

Microsoft Azure Content Delivery Network
Microsoft's CDN solution offers global coverage, full integration with Azure services, and a simple setup.

        1.4.6
```

## 1.5 data storage at global scale

### 1.5.1 relational databases and ACID transactions

```text
relational-databses: tables, each row is referred to as record 
supports constraints and primary key
structure defined by schema
uses SQL language
well proven since 1970 
main motivation, reduce storage cost (by eliminating data duplication. basically by separating storage to different tables and using join to get the exact information we need)

pros:
- supports complex queries 
- efficient storage
- natural to humans (easy to understand)
- ACID transactions. 
  -- Atomicity, can bind multiple actions into one transaction. which either all succeed or fail (rolledback)
  -- Consistency, a committed transaction is seen by all future ones. all constraints are met.
  -- Isolation,  concurrent transactions are separated from each other and do not see intermediate states 
  -- Durability, committed transactions are persisted and saved permanently

cons:
- rigid structure imposed by schema
- schema changes are hard. require migration and downtime 
- hard to maintain and scale 
- read operations relatively slow 

when are they good?
basically when the pros are important to our application

when are they not preferable?
- not inherent relationship between records
- read performance is very important
```

### 1.5.2 Non relational databases

```text
rose to popularity in the 2000 
allow to group records of dissimilar structure
more intuitive to programmers
support data structures natural to programmers: lists, maps, graphs etc
usually doesn't require ORM (Object relational mapping - libs for translating code objects/classes to sql)
usually designed for fast queries rather than efficient storage

support of flexible schema comes w/ drawbacks:
    - harder to analyze records
    - harder to analyze groups of records (join)
ACID is rarely supported
```

#### 1.5.2.1 Key-Value store

```text
like a map/dictionary/hashmap
great for caches, counters etc
```

#### 1.5.2.2 Document-Store

```text
stores JSON/XML/YAML representation of objects

<url:/Users/<user>/work/KB/kb_DB#r=__Document_oriented_DB_Document-Store__>
```

#### 1.5.2.3 Graph Database

```text
an extension of a Document-Store with additional capabilities to link, traverse and analyze records	on bulk efficiently
Optimized for navigation and analysis of relationships between records

use cases:
fraud detection,  recommendation engines, 
```

#### 1.5.2.4 time-series

```text
<url:/Users/<user>/work/KB/kb_DB#r=__Time_Series_DB__>
```

#### 1.5.2.5 wide column

```text
<url:/Users/<user>/work/KB/kb_DB#r=__Wide_column_store__>
```

#### 1.5.2.6 guidelines for choosing non-relational database

```text
examine required properties:
- speed requirements (non-relational tend to be faster), e.g. caching
- RT big data 
- non structured data , user Profiles, content management, 
```

#### 1.5.2.7 solutions

```text
Key/Value Stores Examples:Redis, Aerospike, Amazon DynamoDB

Document Store Examples:Cassandra, MongoDB,

Graph Databases Examples: Amazon Neptune,NEO4J
```

### 1.5.3 Improve availability, scalability and performance of databases

#### 1.5.3.1 indexing

```text
reduce retrieval times from o(N) to smaller magnitude, o(logN) etc
avoid full scan in queries such as select where, or select from order by 
index is basically a pointer to the row. indices can be store in an appropriate data-structure such as hasmap or B-Tree 
a hashmap key would be the column value, hasmap value would be a list of matching rows

B-Tree index is great for order and range selects 

indexes can be made of multiple columns - composite index

indexing tradeoffs:
- Improve read Performance
- decrease write Performance and require more space
```

#### 1.5.3.2 replication

```text
To avoid SPOF (Single-Point-Of-Failure) we can deploy replicas of our DB
Improves resilience, High-Availability and can Improve throughput (distribute read operations)

replication tradeoffs:
- higher complexity on all CUD operations
- guarantees for concurrent modifications of same record. No conflicts, consistency and correctness
- difficult to design, configure and manage 

Most modern databases support OOTB (Out-of-the-box) replication
```

#### 1.5.3.3 sharding / partioning

```text
Pros:
- can store more data
- parallelising non conflicting queries 
- Improve Performance
- Higher Scale

Cons:
- more complex, requires routing to shard logic
- 

usually supported in non-relational databases
less supported in relational database

can also be used to logically separate our services
for example, all mobile users are routed to a specific, less speced server

all three techniques can be used together as they are orthogonal to each other

            1.5.3.4
```

### 1.5.4 CAP theorem

```text
introduced by professor Eric Brewer 
The CAP theorem applies a similar type of logic to distributed systems—namely, that a distributed system can deliver only two of three desired characteristics: consistency, availability, and partition tolerance (the ‘C,’ ‘A’ and ‘P’ in CAP).

A distributed system is a network that stores data on more than one node (physical or virtual machines) at the same time. Because all cloud applications are distributed systems, it’s essential to understand the CAP theorem when designing a cloud app so that you can choose a data management system that delivers the characteristics your application needs most.

The CAP theorem is also called Brewer’s Theorem, because it was first advanced by Professor Eric A. Brewer during a talk he gave on distributed computing in 2000. Two years later, MIT professors Seth Gilbert and Nancy Lynch published a proof of “Brewer’s Conjecture.”

Consistency
Consistency means that all clients see the same data at the same time, no matter which node they connect to. For this to happen, whenever data is written to one node, it must be instantly forwarded or replicated to all the other nodes in the system before the write is deemed ‘successful.’

Availability
Availability means that that any client making a request for data gets a response, even if one or more nodes are down. Another way to state this—all working nodes in the distributed system return a valid response for any request, without exception.

Partition tolerance
A partition is a communications break within a distributed system—a lost or temporarily delayed connection between two nodes. Partition tolerance means that the cluster must continue to work despite any number of communication breakdowns between nodes in the system.

- NoSQL (non-relational) databases are ideal for distributed network applications. Unlike their vertically scalable SQL (relational) counterparts, NoSQL databases are horizontally scalable and distributed by design—they can rapidly scale across a growing network consisting of multiple interconnected nodes. (See "SQL vs. NoSQL Databases: What's the Difference?" for more information.)

Today, NoSQL databases are classified based on the two CAP characteristics they support:

CP database: A CP database delivers consistency and partition tolerance at the expense of availability. When a partition occurs between any two nodes, the system has to shut down the non-consistent node (i.e., make it unavailable) until the partition is resolved.
AP database: An AP database delivers availability and partition tolerance at the expense of consistency. When a partition occurs, all nodes remain available but those at the wrong end of a partition might return an older version of data than others. (When the partition is resolved, the AP databases typically resync the nodes to repair all inconsistencies in the system.)
CA database: A CA database delivers consistency and availability across all nodes. It can’t do this if there is a partition between any two nodes in the system, however, and therefore can’t deliver fault tolerance.
We listed this type last for a reason—in a distributed system, partitions can’t be avoided. So, while we can discuss a CA distributed database in theory, for all practical purposes, a CA distributed database can’t exist. However, this doesn’t mean you can’t have a CA database for your distributed application if you need one. Many relational databases, such as PostgreSQL, deliver consistency and availability and can be deployed to multiple nodes using replication.

- MongoDB and the CAP theorem (CP)
MongoDB is a popular NoSQL database management system that stores data as BSON (binary JSON) documents. It's frequently used for big data and real-time applications running at multiple different locations. Relative to the CAP theorem, MongoDB is a CP data store—it resolves network partitions by maintaining consistency, while compromising on availability.

MongoDB is a single-master system—each replica set (link resides outside IBM) can have only one primary node that receives all the write operations. All other nodes in the same replica set are secondary nodes that replicate the primary node's operation log and apply it to their own data set. By default, clients also read from the primary node, but they can also specify a read preference (link resides outside IBM) that allows them to read from secondary nodes.

When the primary node becomes unavailable, the secondary node with the most recent operation log will be elected as the new primary node. Once all the other secondary nodes catch up with the new master, the cluster becomes available again. As clients can't make any write requests during this interval, the data remains consistent across the entire network.

- Cassandra and the CAP theorem (AP)
Apache Cassandra is an open source NoSQL database maintained by the Apache Software Foundation. It’s a wide-column database that lets you store data on a distributed network. However, unlike MongoDB, Cassandra has a masterless architecture, and as a result, it has multiple points of failure, rather than a single one.

Relative to the CAP theorem, Cassandra is an AP database—it delivers availability and partition tolerance but can't deliver consistency all the time. Because Cassandra doesn't have a master node, all the nodes must be available continuously. However, Cassandra provides eventual consistency by allowing clients to write to any nodes at any time and reconciling inconsistencies as quickly as possible.

As data only becomes inconsistent in the case of a network partition and inconsistencies are quickly resolved, Cassandra offers “repair” functionality to help nodes catch up with their peers. However, constant availability results in a highly performant system that might be worth the trade-off in many cases.

- Working with microservices
Microservices are loosely coupled, independently deployable application components that incorporate their own stack—including their own database and database model—and communicate with each other over a network. As you can run microservices on both cloud servers and on-premises data centers, they have become highly popular for hybrid and multicloud applications.

Understanding the CAP theorem can help you choose the best database when designing a microservices-based application running from multiple locations. For example, if the ability to quickly iterate the data model and scale horizontally is essential to your application, but you can tolerate eventual (as opposed to strict) consistency, an AP database like Cassandra or Apache CouchDB can meet your requirements and simplify your deployment. On the other hand, if your application depends heavily on data consistency—as in an eCommerce application or a payment service—you might opt for a relational database like PostgreSQL.

- when to favor consistency over availability:
Online trading system, banking, online store etc - since it's mission-critical that no transaction is lost, out of order etc
example: last item in store and two clients try to buy at same time, only one should succeed and the second client should see the inventory drop to 0
Even if both are served by different instances of the DB

- when to favor availability over consistency :
social network, youtube, etc 
example: user got one more like but doesnt see it immediately b/c he is served from a different instance. who cares...

it's usually not either or between consistency and availability but a tradeoff

        1.5.5
```

## 1.6 software architecture patterns

```text
based on industry best practices especially learning from past mistakes

why adopt a best-practice pattern:
- save time and effort. If similar use case is already proven to be effectively solved by a given architectural pattern we can reuse it
- mitigate risk of spaghetti / big-ball-of-mud architecture where there's tight coupling and unclear responsibility segregation 
- future proofing (even when engineers change)

- as Systems grow over time some patterns that used to work may be less suitable. It is expected
```

### 1.6.1 multi-tier architecture

```text
system is divided to tiers. Tiers are separated logically and/or physically
logically  - limit scope of responsibility 
physical separation 
Each tier can be developed, upgraded and scaled  separately 

multi-layer and multi-tier are not the same. multi-layer is a single system/process separated into layers. multi-tier, separate into tiers (apps that run on different servers)
restrictions:
communication via client server model 

one popular variant is the three-tier model (aka monolith). which is:
- Tier1: presentation tier. UX. display info, accept user input. Ex: webpage, mobile app, GUI applications 
    does not contain business logic
- Tier2: application tier. contains bussiness logic. 
- Tier3: data tier. storage, files DB

It's so popular since it fits many use cases.
Easy to scale horizontally. 
presentation tier - no need for scaling since it uses end user resource 
application tier should be stateless. in which case we can add LB and more instances
data tier - can scale via distribution techniques. e.g. replication, sharding etc

drawback: application tier is a monolith. So requires a lot of CPU/memory. slows down app. require vertical scaling (which is expensive and capped)
Also large and complex code base is harder to develop, maintain. 
Even adding devs will not help a lot because it will Increase merge conflicts

other variants:

- Two-Tier
- Tier1: presentation tier and application tier. UX. display info, accept user input. also contains bussiness logic. 
    ex: rich mobile applications, desktop/mobile editors, 
- Tier2: data tier. storage, files DB

- Four-Tier
- Tier1: presentation tier. UX. display info, accept user input. Ex: webpage, mobile app, GUI applications 
    does not contain business logic
- Tier2: API-Gateway, caching, security
- Tier3: application tier. contains bussiness logic. 
- Tier4: data tier. storage, files DB


id=________Microservices_architecture
```

### 1.6.2 Microservices architecture

```text
Aims to address monolith disadvantages
Microservices - also known as the microservice architecture - is an architectural style that structures an application as a collection of services that are

Highly maintainable and testable
Loosely coupled
Independently deployable
Organized around business capabilities
Owned by a small team
The microservice architecture enables the rapid, frequent and reliable delivery of large, complex applications. It also enables an organization to evolve its technology stack.

pros:
- small code base, development is faster and easier (code loads faster to IDE, build times are faster, troubleshooting easier). friendly to new developers
- instances have low HW requirements
- organizational benefit. since each service is Owned by a single team the organizational throughput increases
- each team is autonomous re. coding language, database etc
- better security (due to segregation, Fault-Isolation)

These benefits do not come for free just by splitting the monolith
and there are also common challenges

There are some best practices:
- organizational decoupling
  Every change can happen only in one service 
  Would not involve multiple teams 
otherwise we introduce coordination and dependencies between the teams mitigating the gains by shifting from monolithic architecture


- single point responsibility (SRP)
Each service takes care of a single business-capability/domain/action/actor related functionality 

- separate database per microservice 
multiple services sharing same DB and/or schema creates needless coupling/friction point between them
data should be split so that each service is completely independent
it is expected that there would be some data duplication
```

### 1.6.3 event driven architecture

#### 1.6.3.1 what is event driven architecture

```text
aims to address issues common in Microservice based architecture:
- synchronous flows where Microservices perform REST calls to eachother
- dependencies between the caller service and the callee

in event-driven there are no calls. only events. 
events are either fact events (xyz happened) or change events (account balance changed)
in this architecture there are event producers, event consumers and message-broker infrastructure

This eliminates any dependency between services and waiting for responses so all the flows become asynchronous
it also allows adding additional producers/consumers easily just by producing/subscribing to the message-broker

Also allows:
- RT analytics of data streams
- patterns detection. E.g. fraud detection
- event sourcing. 
```

#### 1.6.3.2 event-sourcing

```text
instead of storing final result we can store the sequence of events (so that when replayed from start will get us to current result).
  using this pattern we don't need a DB. just save the events stream.
  It can be very powerful also to "correct" events. E.g. Fraud detection can insert event that offsets fraudulent withdrawal
  -- we get long history reports
  -- we can add snapshots (last year, last 5 years etc)
```

#### 1.6.3.3 CQRS, command query response segregation

```text
When DB is heavily loaded by both read and write statements it can become slow 
When using a distributed DB usually only one of read or write operations can be optimized
so if we have heavy read workload we can optimize for reads by slower writes and vice versa
CQRS pattern separates writes to write DB, reads to read DB.
Each write updates read DB via a message on message-broker
each DB is wrapped by a different server 

This allows to optimize for both reads and writes
In addition, joins on tables from both DBs can be done via a dedicated service that subscribes on message-broker to messages on changes in both DBs and keeps a materialized view of "joined" result (the join is done programmatically)  

            1.6.3.4 

                1.6.3.4.1 

                1.6.3.4.2
            1.6.3.5
        1.6.4
```

## 1.7 Big data Architecture patterns

### 1.7.1 Big data Introduction

```text
Big data. handling huge datasets (in terms of storage and/or processing times)
Big-data characteristics:
- Volume: Terrabytes, Petabytes
    bussiness use-cases:
    - internet search
    - Medical Systems
    - RT security Systems
    - weather prediction systems 

- variety:
data is not uniform. usually requires data fusion 
    Examples:
    -- social services 
    -- 

- velocity
  usually permanent high rate of incoming data 
  ex: IoT, 

Why process big data?
because it provides insights that can help our business. 
insights come in the form of:
- visualizations: help make sense of the data
- querying capabilities: ad-hoc queries
- predictive analysis: ML models for prediction and classification
```

### 1.7.2 Big data processing strategies

```text
a huge stream of data is incoming to our system. It may come from various sources, IoT devices, logs, car fleets etc. 
The system provides visualizations, predictions and insights into this data stream
```

#### 1.7.2.1 batch processing

```text
- Data is saved as is into a distributed DB. It is never modified
- Data is not processed per data-point. It is processed in batches. either scheduled or per N data-points
- batch processing code is developed by us. It processes the raw data in the batch data-points and stores the result in a DB optimized for the query (view, materialized-view)

example: Udemy. 2 streams of incoming data. course progress events and course review events. lets assume 100M users. each user generate 1 course progress event per minute and on average 10% of the users are active. We get 10M events per minute. This is big data ballpark.
batch processing can be used to analyze the data so that it can update course average review on a daily basis, compensate instructors whose course are consumed more etc 
Both datapoints can be fused to give weights to course rating according to reviewers participation level (lower scores of users who barely attended course)
or calculate rating based on both review rating and engagement level 

another example: search engines 
crawl the dataset (the web) periodically and store it in an optimized view DB

Pros:
- easy to implement. No RT/performance/low-latency requirement
- HA
- no downtime since users can use old view until new one is ready
- efficient (compared to processing each event)
- High Fault-Tolerance. If we found a bug we just switch back to old view, fix bug and batch-process again
- complex analysis

Cons:
- long delay to create view 
- feedback on data takes long time
```

#### 1.7.2.2 Realtime processing

```text
events are pushed to message-broker and analyzed in realtime

pro:
- RT analysis and response

cons:
- hard to do complex analysis
- data fusion is hard
- historical insights is hard
            1.7.2.3
```

### 1.7.3 Lambda Architecture

#### 1.7.3.1 motivation

```text
deciding between batch-processing and real-time-processing is difficult since the benefits of both are important 

example. log analysis system (real-time-processing required since we need RT Visibility). 
But we also want historic information and say anomaly detection (batch-processing required)

ride sharing service is similar. requires both real-time processing and batch-processing 
```

#### 1.7.3.2 description

```text
Invented by Nathan Marz 
attempts to find balance between High-Fault-Tolerance and data analysis (batch-processing) and low-latency (from real-time-processing)
comprised of layers:
a. Batch. Manages the dataset and is the system of records (RO, append only, DFS (( distributed file system))) from which it batch-processes the data to create batch views (also RO). Aims to be 100% accurate and take into account all data 
b. Speed. events are pushed to message-broker and analyzed in real-time => RT views. low latency but only takes into account recent data 
c. Serving. Merges data from both speed and batch layer to serve ad-hoc queries 

incoming data is dispatched to both batch and speed layers 
            1.7.3.3
        1.7.4
```

## 1.8 Bonus
