---
type: reference
title: Microservices Architecture
description: "Microservices architecture background and patterns, with the context/problem/solution style of pattern descriptions."
tags: [microservices, architecture, design-patterns, course-notes, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:50:58Z" }
status: stable
capture_type: source
legacy_source: "system-design/system-design-course-notes#2"
---

# Microservices Architecture

[↑ system-design-course-notes](/system-design/kb-system-design-course-notes/README.md)

## 2.1 background

```text
see: <url:#r=________Microservices_architecture>
```

## 2.2 patterns

### 2.2.1 https://microservices.io/patterns/microservices.html

```text
Context
You are developing a server-side enterprise application. It must support a variety of different clients including desktop browsers, mobile browsers and native mobile applications. The application might also expose an API for 3rd parties to consume. It might also integrate with other applications via either web services or a message broker. The application handles requests (HTTP requests and messages) by executing business logic; accessing a database; exchanging messages with other systems; and returning a HTML/JSON/XML response. There are logical components corresponding to different functional areas of the application.

Problem
What’s the application’s deployment architecture?

Forces
There is a team of developers working on the application
New team members must quickly become productive
The application must be easy to understand and modify
You want to practice continuous deployment of the application
You must run multiple instances of the application on multiple machines in order to satisfy scalability and availability requirements
You want to take advantage of emerging technologies (frameworks, programming languages, etc)
Solution
Define an architecture that structures the application as a set of loosely coupled, collaborating services. This approach corresponds to the Y-axis of the Scale Cube. Each service is:

Highly maintainable and testable - enables rapid and frequent development and deployment
Loosely coupled with other services - enables a team to work independently the majority of time on their service(s) without being impacted by changes to other services and without affecting other services
Independently deployable - enables a team to deploy their service without having to coordinate with other teams
Capable of being developed by a small team - essential for high productivity by avoiding the high communication head of large teams
Services communicate using either synchronous protocols such as HTTP/REST or asynchronous protocols such as AMQP. Services can be developed and deployed independently of one another. Each service has its own database in order to be decoupled from other services. Data consistency between services is maintained using the Saga pattern

To learn more about the nature of a service, please read this article.
```

#### 2.2.1.1 Decomposition

#### 2.2.1.1.1 Decompose by business capability

#### 2.2.1.1.2 Decompose by subdomain

#### 2.2.1.1.3 Self-contained Servicenew

#### 2.2.1.1.4 Service per team

```text
                2.2.1.1.5
```

#### 2.2.1.2 Refactoring to Microservices

```text
Strangler Application
Anti-corruption layer
```

#### 2.2.1.3 Data management

```text
Database per Service
Shared database
Saga
API Composition
CQRS
Domain event
Event sourcing
```

#### 2.2.1.4 Transactional messaging

```text
Transactional outbox
Transaction log tailing
https://medium.com/trendyol-tech/transaction-log-tailing-with-debezium-part-1-aeb968d72220

Polling publisher

            2.2.1.5
        2.2.2 listen to yourself design-pattern

            2.2.2.1 https://medium.com/@odedia/listen-to-yourself-design-pattern-for-event-driven-microservices-16f97e3ed066
A big part of my work involves interacting between microservices using event sourcing.

There have been excellent design patterns evolving over the years to allow for truly decoupled microservices, be it event sourcing, CQRS, SAGA, or transaction log tailing. I recommend reviewing some of these patterns over at microservices.io if you are unfamiliar with them.

Problem
One challenge that I have faced is the need to achieve local transactionality when a microservice needs to perform multiple activities as an atomic operation. Although the SAGA pattern can solve the lack of distributed transactions by defining compensating events for failed transactions, it does not solve the problem of needing a local two-phase commit within the microservice itself.

For example, you cannot guarantee that a commit to Cassandra and a message delivery to Kafka would be done atomically or not done at all.

So the question is: how can I ensure ALL the activities I perform are being handled as a single transaction?


Example
Let’s take a common use case: Updating a local NoSQL database and also notifying a legacy system of record about the activity. The scenario is as follows:

You broke away an Order Service from a legacy monolith.
Your clients are still in transition from the monolith to the microservice, and therefore you still need to maintain consistency with the monolith system of record.
For simplicity of the diagrams, I’m not mentioning the NoSQL records being in PENDING state at the beginning of the flow and moving to COMPLETE state in the end, although this is ofcourse highly encouraged in the SAGA pattern.
Forces
Two phase commit is not possible.

                2.2.2.1.1 Option 1: Directly interacting with the system of record

The problems with this architecture are immediatly clear:

You have tight coupling between your microservice and the system of record. This dependency would make it hard to remove the feature from the monolith (“strangle the monolith”), since you would need to update both the monolith and your microservice. Additionally, your Order Service is not self-contained, and has to be aware of the existence of the monolith.
What happens if you are able to commit the transaction in step 2, but the server crashes before completing step 3? You are now faced with data inconsistency/corruption in your system.

                2.2.2.1.2 Option 2: Decouple the system of record using a message broker

With this option:

You are decoupling the system of record from the microservice by using a message broker and a publish/subscribe model.
A dedicated event processor (“Legacy Handler”), which may be part of the monolith or a seperate, dedicated microservice, handles the interaction with the system of record only.
Once the transition to the Order Service is fully complete, you can simply decomission the Legacy Handler microservice without any code changes.
The Order Service is unaware of the system of record and the system of record is unaware of the Order Service.
You can design compensating events generated by the Legacy Handler in case a failure occurs while updating the system of record. That way, you make sure both systems are in sync.
This is usually as far as most event sourcing/SAGA pattern diagrams go from what I’ve seen.

However, there is still a concrete problem: How do you guarantee atomic execution of both the NoSQL writes and the publishing of the event to the message broker?

The Order Service may save the order to the NoSQL database (#2), but crash before sending the message to the message broker (#3).
If we were to reverse the order, the problem still persists: The Order Service may send an event to the message broker, and crash before saving the data to the NoSQL database.
The problem also exists in case of other errors during the execution: If the message broker is unavailable for some reason, your service in at an inconsistent state and you’ll need a compensating transaction on the NoSQL database.
If you were to publish before saving to database, the issue still exists — you could successfully publish to the message broker but fail on writing to the DB. You would then have to send a compensating transaction to the message broker. What happens if the message broker is now unavailable?
Option 3: Listen to Yourself
This brings us to the “Listen to Yourself” design pattern.


In this example, the Order Service publishes the ORDER_CREATED event to the message broker, but also consumes ORDER_CREATED events, just like the Legacy Handler. This basically means it is “listening to itself”, meaning it consumes the messages that it itself produced. Now the Legacy Handler and the Order Service are processing the writes to their respective databases in parallel and can guarantee the success of the business transaction, or its synchronized failure with compensating events.

Resulting Context — Benefits
You achieve atomic transactionality. If the message was published to the message broker, you assume a consistent state.
If the Order Service crashed before publishing to the message broker, the database would not be updated and the client will simply receive a 500 error.
If the Order Service crashed after publishing the message, the data is still protected. Eventually, the message will be processed by the Order Service, either by a different instance that is registered to those events or by the instance the crashed (once it is restarted). The message broker guarantees the message delivery.
If the message broker itself is unavailable to publish the message, nothing is written to the NoSQL database and an error is returned to the client.
If the message broker crashed after receiving the message, the message was already persisted to disk and will be served once the message broker is back online.
Note: Potential duplicate messages are always a possibility with a message broker so you should design your message handling to be idempotent regardless of the solution you choose.

You gain better performance because the client no longer waits for both message delivery and writing to the database. The response can be returned immediately once the acknowledgement from the message broker has been received.
You can easily design compensating transactions since you can enforce the order of messages in the topics. Using a partitioned message broker such as Apache Kafka, you can guarantee that a compensating transaction would be sent to the same topic/partition as the topic that created the original event. This means that the Order Service would only process the compensating transaction after it finished processing the write to the NoSQL database. This means less code to manage the state of the database.
Using the message broker gives you access to excellent frameworks such as Spring Cloud Stream, that offer a built-in retry mechanism. You can configure a backoff policy with an ever-growing interval between attempts to mitigate most network unavailability issues with the database. It also allows the messages to automatically move to error/DLQ topics if a message is deemed impossible to handle. Monitoring solutions can track the items in the error queues, which would provide clear visibility to DevOps teams. All this means — less code you have to write to manually manage retries and error handling.
Resulting Context — Drawbacks
This style of programming can be unfamiliar and requires your application to be event driven.
All your events and database writes must be idempotent to avoid duplicate records.
The client will not receive feedback about the actual write to the database. There may be business errors while persisting the transaction that the client should be aware of.
The client isn’t guaranteed to read their own writes immediately. That is because the writes to the NoSQL database will only be done after the response is returned to the client. While this is a known drawback of Eventually Consistent applications, this pattern makes it even more extreme, since the local database itself is also inconsistent when the transaction is complete. Caching solutions can mitigate that, although that would add additional complexity.
Related Patterns
The transaction log tailing pattern can achieve similar results to those described here. Your transactions will be atomic without resorting to two phase commit. The transaction log tailing pattern has the added benefit of guranteeing your database is committed before returning a response to the client.

Ofcourse, the transaction log tailing pattern has its own set of drawbacks. As mentioned here, some of them are:

Relatively obscure
Database specific solutions
Low level DB changes makes it difficult to determine the business level events
Tricky to avoid duplicate publishing
The first 3 items in this list can potentially be resolved by the Listen to Yourself pattern — your business events are high level and clear, and there is no need to rely to specific database solutions.

I would add the following considerstions for the comparison:

Transaction log mining can sometimes feel like “magic code”, since events are produced in the system without your control. I try to avoid these if possible.
Log mining solutions can be closed source and incur licensing costs (such as Oracle Golden Gate), or be open source but unsupported by the database vendor (such as Linkedin Databus).
In this article, I presented a simple but powerful approach for event sourcing. It has probably been implied in various other design patterns, but I believe it is important enough to stand on its own.

Good luck, and happy coding!

            2.2.2.2

        2.2.3 Distributed transaction patterns for microservices compared 
https://developers.redhat.com/articles/2021/09/21/distributed-transaction-patterns-microservices-compared#



As a consulting architect at Red Hat, I've had the privilege of working on legions of customer projects. Every customer brings their own challenges but I've found some commonalities. One thing most customers want to know is how to coordinate writes to more than one system of record. Answering this question typically involves a long explanation of dual writes, distributed transactions, modern alternatives, and the possible failure scenarios and drawbacks of each approach. Typically, this is the moment when a customer realizes that splitting a monolithic application into microservices is a long and complicated journey, and usually requires tradeoffs.

Rather than go down the rabbit hole of discussing transactions in-depth, this article summarizes the main approaches and patterns for coordinating writes to multiple resources. I’m aware that you might have good or bad past experiences with one or more of these approaches. But in practice, in the right context and with the right constraints, all of these methods work fine. Tech leads are responsible for choosing the best approach for their context.

Note: If you are interested in dual writes, watch my Red Hat Summit 2021 session, where I covered dual write challenges in depth. You can also skim through the slides from my presentation. Currently, I am involved with Red Hat OpenShift Streams for Apache Kafka, a fully managed Apache Kafka service. It takes less than a minute to start and is completely free during the trial period. Give it a try and help us shape it with your early feedback. If you have questions or comments about this article, hit me on Twitter @bibryam and let’s get started.
            2.2.3.1 The dual write problem
The single indicator that you may have a dual write problem is the need to write to more than one system of record predictably. This requirement might not be obvious and it can express itself in different ways in the distributed systems design process. For example:

You have chosen the best tools for each job and now you have to update a NoSQL database, a search index, and a cache as part of a single business transaction.
The service you have designed has to update its database and also send a notification to another service about the change.
You have business transactions that span multiple services boundaries.
You may have to implement service operations as idempotent because consumers have to retry failed invocations.
For this article, we'll use a single example scenario to evaluate the various approaches to handling dual writes in distributed transactions. Our scenario is a client application that invokes a microservice on a mutating operation. Service A has to update its database, but it also has to call Service B on a write operation, as illustrated in Figure 1. The actual type of the database, the protocol of the service-to-service interactions, is irrelevant for our discussion as the problem remains the same.

The dual write problem in microservices.
Figure 1: The dual write problem in microservices.
A small but critical clarification explains why there are no simple solutions to this problem. If Service A writes to its database and then sends a notification to a queue for Service B (let’s call it a local-commit-then-publish approach), there is still a chance the application won't work reliably. While Service A writes to its database and then sends the message to a queue, there is a small probability of the application crashing after the commit to the database and before the second operation, which would leave the system in an inconsistent state. If the message is sent before writing to the database (let’s call this approach publish-then-local-commit), there is a possibility of database write failing or timing issues where Service B receives the event before Service A has committed the change to its database. In either case, this scenario involves dual writes to a database and a queue, which is the core problem we are going to explore. In the next sections, I will discuss the various implementation approaches available today for this always-present challenge.

            2.2.3.2 The modular monolith
Developing your application as a modular monolith might seem like a hack or going backward in architectural evolution, but I have seen it work fine in practice. It is not a microservices pattern but an exception to the microservices rule that can be combined cautiously with microservices. When strong write consistency is the driving requirement, more important even than the ability to deploy and scale microservices independently, then you could go with the modular monolith architecture.

Having a monolithic architecture does not imply that the system is poorly designed or bad. It does not say anything about quality. As the name suggests, it is a system designed in a modular way with exactly one deployment unit. Note that this is a purposefully designed and implemented modular monolith, which is different from an accidentally created monolith that grows over time. In a purposeful modular monolith architecture, every module follows the microservices principles. Each module encapsulates all the access to its data, but the operations are exposed and consumed as in-memory method calls.

The architecture of a modular monolith
With this approach, you have to convert both microservices (Service A and Service B) into library modules that can be deployed into a shared runtime. You then make both microservices share the same database instance. Because the services are written and deployed as libraries in a common runtime, they can participate in the same transactions. Because the modules share a database instance, you can use a local transaction to commit or rollback all changes at once. There are also differences around the deployment method because we want the modules to be deployed as libraries within a bigger deployment, and to participate in existing transactions.

Even in a monolithic architecture, there are ways to isolate the code and data. For example, you can segregate the modules into separate packages, build modules, and source code repositories, which can be owned by different teams. You can do partial data isolation by grouping tables by naming convention, schemas, database instances, or even by database servers. The diagram in Figure 2, inspired by Axel Fontaine's talk on majestic modular monoliths, illustrates the different code- and data-isolation levels in applications.

 Levels of code and data isolation for applications.
Figure 2: Levels of code and data isolation for applications.
The last piece of the puzzle is to use a runtime and a wrapper service capable of consuming other modules and including them in the context of an existing transaction. All of these constraints make the modules more tightly coupled than typical microservices, but the benefit is that the wrapper service can start a transaction, invoke the library modules to update their databases, and commit or roll back the transaction as one operation, without concerns about partial failure or eventual consistency.

In our example, illustrated in Figure 3, we have converted Service A and Service B into libraries and deployed them into a shared runtime, or one of the services could act as the shared runtime. The tables from the databases also share a single database instance, but it is separated as a group of tables managed by the respective library services.

Modular monolith with a shared database.
Figure 3: Modular monolith with a shared database.
Benefits and drawbacks of the modular monolith
In some industries, it turns out the benefits of this architecture are far more important than the faster delivery and pace of change that are so highly valued at other places. Table 1 summarizes the benefits and drawbacks of the modular monolith architecture.

Table 1: Benefits and drawbacks of the modular monolith architecture.
Benefits	Simple transaction semantics with local transactions ensuring data consistency, read-your-writes, rollbacks, and so on.
Drawbacks	
A shared runtime prevents us from independently deploying and scaling modules, and prevents failure isolation.
The logical separation of tables in a single database is not strong. With time, it can turn into a shared integration layer.
Module coupling and sharing transaction context requires coordination during the development stage and increases the coupling between services.
Examples	
Runtimes such as Apache Karaf and WildFly that allow modular and dynamic deployment of services.
Apache Camel’s direct and direct-vm components allow exposing operations for in-memory invocations and preserve transaction contexts within a JVM process.
Apache Isis is one of the best examples of the modular monolith architecture. It enables domain-driven application development by automatically generating a UI and REST APIs for your Spring Boot applications.
Apache OFBiz is another example of a modular monolith and service-oriented architecture (SOA). It is a comprehensive enterprise resource planning system with hundreds of tables and services that can automate enterprise business processes. Despite its size, its modular architecture allows developers to quickly understand and customize it.
Distributed transactions are typically the last resort, used in a variety of instances:

When writes to disparate resources cannot be eventually consistent.
When we have to write to heterogeneous data sources.
When exactly-once message processing is required and we cannot refactor a system and make its operations idempotent.
When integrating with third-party black-box systems or legacy systems that implement the two-phase commit specification.
In all of these situations, when scalability is not a concern, we might consider distributed transactions an option.

            2.2.3.3 Implementing the two-phase commit architecture
The technical requirements for two-phase commit are that you need a distributed transaction manager such as Narayana and a reliable storage layer for the transaction logs. You also need DTP XA-compatible data sources with associated XA drivers that are capable of participating in distributed transactions, such as RDBMS, message brokers, and caches. If you are lucky to have the right data sources but run in a dynamic environment, such as Kubernetes, you also need an operator-like mechanism to ensure there is only a single instance of the distributed transaction manager. The transaction manager must be highly available and must always have access to the transaction log.

For implementation, you could explore a Snowdrop Recovery Controller that uses the Kubernetes StatefulSet pattern for singleton purposes and persistent volumes to store transaction logs. In this category, I also include specifications such as Web Services Atomic Transaction (WS-AtomicTransaction) for SOAP web services. What all of these technologies have in common is that they implement the XA specification and have a central transaction coordinator.

In our example, shown in Figure 4, Service A is using distributed transactions to commit all changes to its database and a message to a queue without leaving any chance for duplicates or lost messages. Similarly, Service B can use distributed transactions to consume the messages and commit to Database B in a single transaction without any duplicates. Or, Service B can choose not to use distributed transactions, but use local transactions and implement the idempotent consumer pattern. For the record, a more appropriate example for this section would be using WS-AtomicTransaction to coordinate the writes to Database A and Database A in a single transaction and avoid eventual consistency altogether. But that approach is even less common, these days, than what I've described.

Two-phase commit spanning between a database and a message broker.
Figure 4: Two-phase commit spanning between a database and a message broker.
Benefits and drawbacks of the two-phase commit architecture
The two-phase commit protocol offers similar guarantees to local transactions in the modular monolith approach, but with a few exceptions. Because there are two or more separate data sources involved in an atomic update, they may fail in a different manner and block the transaction. But thanks to its central coordinator, it is still easy to discover the state of the distributed system compared to the other approaches I will discuss.

Table 2 summarizes the benefits and drawbacks of this approach.

Table 2: Benefits and drawbacks of two-phase commit.
Benefits	
Standard-based approach with out-of-the-box transaction managers and supporting data sources.
Strong data consistency for the happy scenarios.
Drawbacks	
Scalability constraints.
Possible recovery failures when the transaction manager fails.
Limited data source support.
Storage and singleton requirements in dynamic environments.
Examples	
The Jakarta Transactions API (formerly Java Transaction API)
WS-AtomicTransaction
JTS/IIOP
eBay’s GRIT
Atomikos
Narayana
Message brokers such as Apache ActiveMQ
Relational data sources that implement the XA spec, in-memory data stores such as Infinispan

            2.2.3.4 Orchestration
With a modular monolith, we use local transactions and we always know the state of the system. With distributed transactions based on the two-phase commit protocol, we also guarantee a consistent state. The only exception would be an unrecoverable failure that involved the transaction coordinator. But what if we wanted to ease the consistency requirements while still knowing the state of the overall distributed system and coordinating from a single place? In this case, we might consider an orchestration approach, where one of the services acts as the coordinator and orchestrator of the overall distributed state change. The orchestrator service has the responsibility to call other services until they reach the desired state or take corrective actions if they fail. The orchestrator uses its local database to keep track of state changes, and it is responsible for recovering any failures related to state changes.

Implementing an orchestration architecture
The most popular implementations of the orchestration technique are BPMN specification implementations such as the jBPM and Camunda projects. The need for such systems doesn’t disappear with overly distributed architectures such as microservices or serverless; on the contrary, it increases. For proof, we can look to newer stateful orchestration engines that do not follow a specification but provide similar stateful behavior, such as Netflix’s Conductor, Uber’s Cadence, and Apache's Airflow. Serverless stateful functions such as Amazon StepFunctions, Azure Durable Functions, and Azure Logic Apps are in this category, as well. There are also open source libraries that allow you to implement stateful coordination and rollback behavior such as Apache Camel’s Saga pattern implementation and the NServiceBus Saga capability. The many homegrown systems implementing the Saga pattern are also in this category.

Orchestrating distributed transactions between two services.
Figure 5: Orchestrating distributed transactions between two services.
In our example diagram, shown in Figure 5, we have Service A acting as the stateful orchestrator responsible to call Service B and recover from failures through a compensating operation if needed. The crucial characteristic of this approach is that Service A and Service B have local transaction boundaries, but Service A has the knowledge and the responsibility to orchestrate the overall interaction flow. That is why its transaction boundary touches Service B endpoints. In terms of implementation, we could set this up with synchronous interactions, as shown in the diagram, or using a message queue in between the services (in which case you could use a two-phase commit, too).

Benefits and drawbacks of orchestration
Orchestration is an eventually consistent approach that may involve retries and rollbacks to get the distribution into a consistent state. While it avoids the need for distributed transactions, orchestration requires the participating services to offer idempotent operations in case the coordinator has to retry an operation. Participating services also must offer recovery endpoints in case the coordinator decides to roll back and fix the global state. The big advantage of this approach is the ability to drive heterogeneous services that might not support distributed transactions into a consistent state by using only local transactions. The coordinator and the participating services need only local transactions, and it is always possible to discover the state of the system by asking the coordinator, even if it is in a partially consistent state. Doing that is not possible with the other approaches I will describe.

Table 3: Benefits and drawbacks of orchestration.
Benefits	
Coordinates state among heterogeneous distributed components.
No need for XA transactions.
Known distributed state at the coordinator level.
Drawbacks	
Complex distributed programming model.
May require idempotency and compensating operations from the participating services.
Eventual consistency.
Possibly unrecoverable failures during compensations.
Examples	
jBPM
Camunda
MicroProfile Long Running Actions
Conductor
Cadence
Step Functions
Durable Functions
Apache Camel Saga pattern implementation
NServiceBus Saga pattern implementation
The CNCF Serverless Workflow specification
Homegrown implementations

            2.2.3.5 Choreography
As you've seen in the discussion so far, a single business operation can result in multiple calls among services, and it can take an indeterminate amount of time before a business transaction is processed end-to-end. To manage this, the orchestration pattern uses a centralized controller service that tells the participants what to do.

An alternative to orchestration is choreography, which is a style of service coordination where participants exchange events without a centralized point of control. With this pattern, each service performs a local transaction and publishes events that trigger local transactions in other services. Each component of the system participates in decision-making about a business transaction's workflow, instead of relying on a central point of control. Historically, the most common implementation for the choreography approach was using an asynchronous messaging layer for the service interactions. Figure 6 illustrates the basic architecture of the choreography pattern.

Service choreography through a messaging layer.
Figure 6: Service choreography through a messaging layer.
Choreography with a dual write
For message-based choreography to work, we need each participating service to execute a local transaction and trigger the next service by publishing a command or event to a messaging infrastructure. Similarly, other participating services have to consume a message and perform a local transaction. That in itself is a dual-write problem within a higher-level dual-write problem. When we develop a messaging layer with a dual write to implement the choreography approach, we could design it as a two-phase commit that spans a local database and a message broker. I covered that approach earlier. Alternatively, we might use a publish-then-local-commit or local-commit-then-publish pattern:

Publish-then-local-commit: We could try to publish a message first and then commit a local transaction. While this option might sound fine, it has practical challenges. For example, very often you need to publish an ID that is generated from the local transaction commit, which won’t be available to publish. Also, the local transaction might fail, but we cannot rollback the published message. This approach lacks read-your-write semantics and it is an impractical solution for most use cases.
Local-commit-then-publish: A slightly better approach would be to commit the local transaction first and then publish the message. This has a small probability of failure occurring after a local transaction has been committed and before publishing the message. But even in that case, you could design your services to be idempotent and retry the operation. That would mean committing the local transaction again and then publishing the message. This approach can work if you control the downstream consumers and can make them idempotent, too. It's also a pretty good implementation option overall.
Choreography without a dual write
The various ways of implementing a choreography architecture constrain every service to write only to a single data source with a local transaction, and nowhere else. Let’s see how that could work without a dual write.

Let’s say Service A receives a request and writes it to Database A, and nowhere else. Service B periodically polls Service A and detects new changes. When it reads the change, Service B updates its own database with the change and also the index or timestamp up to which it picked up the changes. The critical part here is the fact that both services only write to their own database and commit with a local transaction. This approach, illustrated in Figure 7, can be described as service choreography, or we could describe it using the good old data pipeline terminology. The possible implementation options are more interesting.

Service choreography through polling.
Figure 7: Service choreography through polling.
The simplest scenario is for Service B to connect to the Service A database and read the tables owned by Service A. The industry tries to avoid that level of coupling with shared tables, however, and for a good reason: Any change in Service A's implementation and data model could break Service B. We can make a few gradual improvements to this scenario, for example by using the Outbox pattern and giving Service A a table that acts as a public interface. This table could only contain the data Service B requires, and it could be designed to be easy to query and track for changes. If that is not good enough, a further improvement would be for Service B to ask Service A for any changes through an API management layer rather than connecting directly to Database A.

Fundamentally, all of these variations suffer from the same drawback: Service B has to poll Service A continuously. Doing this can lead to unnecessary continuous load on the system or unnecessary delay in picking up the changes. Polling a microservice for changes is a hard sell, so let’s see what we can do to further improve this architecture.

Choreography with Debezium
One way to improve a choreography architecture and make it more attractive is to introduce a tool like Debezium, which we can use to perform change data capture (CDC) using Database A’s transaction log. Figure 8 illustrates this approach.

Service choreography with change data capture.
Figure 8: Service choreography with change data capture.
Debezium can monitor a database's transaction log, perform any necessary filtering and transformation, and deliver relevant changes into an Apache Kafka topic. This way, Service B can listen to generic events in a topic rather than polling Service A's database or APIs. Swapping database polling for streaming changes and introducing a queue between the services makes the distributed system more reliable, scalable, and opens up the possibility of introducing other consumers for new use cases. Using Debezium offers an elegant way to implement the Outbox pattern for orchestration- or choreography-based Saga pattern implementations.

A side-effect of this approach is that it introduces the possibility of Service B receiving duplicate messages. This can be addressed by implementing the service as idempotent, either at the business logic level or with a technical deduplicator (with something like Apache ActiveMQ Artemis’s duplicate message detection or Apache Camel's idempotent consumer pattern).

Choreography with event sourcing
Event sourcing is another implementation of the service choreography approach. With this pattern, the state of an entity is stored as a sequence of state-changing events. When there is a new update, rather than updating the entity's state, a new event is appended to the list of events. Appending new events to an event store is an atomic operation done in a local transaction. The beauty of this approach, shown in Figure 9, is that the event store also behaves like a message queue for other services to consume updates.

Service choreography through event sourcing.
Figure 9: Service choreography through event sourcing.
Our example, when converted to use event sourcing, would store client requests in an append-only event store. Service A can reconstruct its current state by replaying the events. The event store also needs to allow Service B to subscribe to the same update events. With this mechanism, Service A uses its storage layer also as the communication layer with other services. While this mechanism is very neat and solves the problem of reliably publishing events whenever the state change occurs, it introduces a new programming style unfamiliar to many developers and additional complexity around state reconstruction and message compaction, which require specialized data stores.

Benefits and drawbacks of choreography
Regardless of the mechanism used to retrieve data changes, the choreography approach decouples writes, allows independent service scalability, and improves overall system resiliency. The downside of this approach is that the flow of decision-making is decentralized and it is hard to discover the globally distributed state. Discovering the state of a request requires querying multiple data sources which can be challenging with a large number of services. Table 4 summarizes the benefits and drawbacks of this approach.

Table 4: Benefits and drawbacks of choreography.
Benefits	
Decouples implementation and interaction.
No central transaction coordinator.
Improved scalability and resilience characteristics.
Near real-time interactions.
Less overhead on the system with Debezium and similar tools.
Drawbacks	
The global system state and coordination logic is scattered across all participants.
Eventual consistency.
Examples	
Homegrown database or API polling implementations.
The outbox pattern
Choreography based on the Saga pattern
event sourcing
Eventuate
Debezium
Zendesk's Maxwell
Alibaba's Canal
Linkedin's Brooklin
Axon Framework
EventStoreDB

            2.2.3.6 Parallel pipelines
With the choreography pattern, there is no central place to query the state of the system, but there is a sequence of services that propagates the state through the distributed system. Choreography creates a sequential pipeline of processing services, so we know that when a message reaches a certain step of the overall process, it has passed all the previous steps. What if we could loosen this constraint and process all the steps independently? In this scenario, Service B could process a request regardless of whether Service A had processed it or not.

With parallel pipelines, we add a router service that accepts requests and forwards them to Service A and Service B through a message broker in a single local transaction. From this step onward, as shown in Figure 10, both services can process the requests independently and in parallel.

Processing through parallel pipelines.
Figure 10: Processing through parallel pipelines.
While this pattern is very simple to implement, it is only applicable to situations where there is no temporal binding between the services. For example, Service B should be able to process the request regardless of whether Service A has processed the same request. Also, this approach requires an additional router service or the client being aware of both Service A and B for targeting the messages.

Listen to yourself
There is a lighter alternative to this approach, known as the Listen to yourself pattern, where one of the services also acts as the router. With this alternative approach, when Service A receives a request, it would not write to its database but would instead publish the request into the messaging system, where it is targeted to Service B, and to itself. Figure 11 illustrates this pattern.

            2.2.3.7 The Listen to yourself pattern.
Figure 11: The Listen to yourself pattern.
The reason for not writing to the database is to avoid dual writes. Once a message is in the messaging system, the message goes to Service B, and also it goes to back Service A in a completely separate transaction context. With that twist of the processing flow, Service A, and Service B can independently process the request and write to their respective databases.

Benefits and drawbacks of parallel pipelines
Table 5 summarizes the benefits and drawbacks of using parallel pipelines.

Table 5: Benefits and drawbacks of parallel pipelines.
Benefits	Simple, scalable architecture for parallel processing.
Drawbacks	Requires temporal dismantling; hard to reason about the global system state.
Examples	Apache Camel’s multicast and splitter with parallel processing.
How to choose a distributed transactions strategy
As you might have already guessed from this article, there is no right or wrong pattern for handling distributed transactions in a microservices architecture. Every pattern has its pros and cons. Each pattern solves some problems while generating others in turn. The chart in Figure 12 offers a short summary of the main characteristics of the dual write patterns I've discussed.

Characteristics of dual write patterns.
Figure 12: Characteristics of dual write patterns.
Whatever approach you choose, you will need to explain and document the motivation behind the decision and the long-lasting architectural consequences of your choice. You will also need to get support from the teams that will implement and maintain the system in the long term. I like to organize and evaluate the approaches described in this article based on their data consistency and scalability attributes, as shown in Figure 13.

Relative data consistency and scalability characteristics of dual write patterns.
Figure 13: Relative data consistency and scalability characteristics of dual write patterns.
As a good starting point, we could evaluate the various approaches from the most scalable and highly available to the least scalable and available ones.

High: Parallel pipelines and choreography
If your steps are temporarily decoupled, then it could make sense to run them in a parallel pipelines method. The chances are you can apply this pattern for certain parts of the system, but not for all of them. Next, assuming there is a temporal coupling between the processing steps, and certain operations and services have to happen before others, you might consider the choreography approach. Using service choreography, it is possible to create a scalable, event-driven architecture where messages flow from service to service through a decentralized orchestration process. In this case, Outbox pattern implementations with Debezium and Apache Kafka (such as Red Hat OpenShift Streams for Apache Kafka) are particularly interesting and gaining traction.

Medium: Orchestration and two-phase commit
If choreography is not a good fit, and you need a central point that is responsible for coordination and decision making, then you would consider orchestration. This is a popular architecture, with standard-based and custom open source implementations available. While a standard-based implementation may force you to use certain transaction semantics, a custom orchestration implementation allows you to make a trade-off between the desired data consistency and scalability.

Low: Modular monolith
If you are going further left in the spectrum, most likely you have a very strong need for data consistency and you are ready to pay for it with significant tradeoffs. In this case, distributed transactions through two-phase commits will work with certain data sources, but they are difficult to implement reliably on dynamic cloud environments designed for scalability and high availability. In that case, you can go all the way to the good old modular monolith approach, accompanied by practices learned from the microservices movement. This approach ensures the highest data consistency but at the price of runtime and data source coupling.

Conclusion
In a sizable distributed system with tens of services, there won’t be a single approach that works for all, but a few of these combined and applied for different contexts. You might have a few services deployed on a shared runtime for exceptional requirements around data consistency. You might choose a two-phase commit for integration with a legacy system that supports JTA. You might orchestrate a complex business process, and also use choreography and parallel processing for the rest of the services. In the end, it doesn't matter what strategy you pick; what matters is choosing a strategy deliberately for the right reasons, and executing it.
        2.2.4
    2.3
3.
```
