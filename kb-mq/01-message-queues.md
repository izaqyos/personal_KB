---
type: reference
title: message queues
description: Section 1 of the legacy kb-mq notes.
tags: [kb-mq]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-mq#1"
---

# message queues

[↑ kb-mq](/kb-mq/README.md)

## 1.1 describe message queues key features

```text
Message queues are an essential component of many distributed systems and applications. They enable asynchronous communication between different components of a system, allowing them to communicate without the need for direct, synchronous interactions. The key features of message queues include:

| 1. Message Storage: A message queue stores messages until they are consumed by the intended recipient. Messages are usually stored in the queue in the order they are received.
| 
| 2. Asynchronous Communication: Message queues allow for asynchronous communication between different components of a system, which means that the sender and receiver do not need to interact in real-time.
| 
| 3. Decoupling: Message queues decouple the sender and receiver, which means that they can operate independently of each other. This decoupling also allows for better fault tolerance and scalability.
| 
| 4. Message Ordering: In some cases, it is important to maintain the order of messages in the queue. Message queues can ensure that messages are processed in the order they were received.
| 
| 5. Multiple Consumers: Message queues can be designed to allow multiple consumers to consume messages from the queue simultaneously. This enables load balancing and helps to increase system throughput.
| 
| 6. Message Durability: Message queues can be configured to ensure that messages are not lost in case of system failures. This is achieved through techniques such as message replication, disk persistence, and backups.
| 
| 7. Message Routing: Some message queue systems allow for advanced message routing capabilities, which means that messages can be sent to specific queues or consumers based on predefined rules.

Overall, message queues are a powerful tool for building distributed systems that are scalable, fault-tolerant, and decoupled.

    1.2 There are many message queue libraries and products available, both open-source and commercial. Here are some of the most popular ones

| 1. Apache Kafka: Kafka is a distributed streaming platform that can be used as a message queue. It is designed to be highly scalable, fault-tolerant, and fast.
| 
| 2. RabbitMQ: RabbitMQ is an open-source message broker that supports multiple messaging protocols. It is widely used in enterprise applications and supports many features like message durability, routing, and clustering.
| 
| 3. Apache ActiveMQ: ActiveMQ is an open-source message broker that supports multiple messaging protocols like JMS, AMQP, and MQTT. It supports features like message persistence, clustering, and topic-based publish-subscribe messaging.
| 
| 4. Amazon Simple Queue Service (SQS): SQS is a fully managed message queue service provided by Amazon Web Services (AWS). It is highly available, scalable, and durable, and can be used to decouple components of distributed applications.
| 
| 5. Microsoft Azure Service Bus: Azure Service Bus is a fully managed message queue service provided by Microsoft Azure. It supports messaging patterns like queues, topics, and subscriptions, and can be used to build reliable and scalable cloud-based applications.
| 
| 6. Apache Pulsar: Pulsar is a distributed messaging platform that can be used as a message queue or a streaming platform. It is designed to be scalable, durable, and fast, and supports many features like multi-tenancy, geo-replication, and partitioning.
| 
| 7. Redis: Redis is an open-source in-memory data structure store that supports many data structures, including queues. Redis can be used as a lightweight message queue with features like message persistence, publish-subscribe messaging, and task scheduling.

There are many other message queue libraries and products available, each with their own strengths and weaknesses. The choice of message queue will depend on the specific needs of the application, such as performance, scalability, reliability, and feature requirements.

    1.3
```
