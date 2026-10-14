---
type: reference
title: System Design interview tips.
description: Section 22 of the legacy leetcode-kb notes.
tags: [kb-leetcode]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "leetcode-kb#22"
---

# System Design interview tips.

[↑ leetcode-kb](/kb-leetcode/README.md)

```text
Resources:
https://www.hiredintech.com/classrooms/system-design/lesson/69


First 5-10 minutes. Ask Question re. Service, volume of service, how many APIs, how many requests per day.
From this drive 2 numbers 
Avg / peak TPS (divide monthly by 30 , daily by 86400 or for estimation 100k)
DB size, 
Also, check reads / writes ration. If reads outweigh writes by a big factor consider primary slaves DB topology.
Primary will handle writes, secondaries reads. If fault tolerance is required have two primaries.
If data is simple key value consider non relation DB.
If disk caching is a must use SSD (vs HDD)
If read/write/fault is required consider RAID
RAID 0 - stripping. Fast writes. 2 adds parity check, 3 byte level strip, 4 block level strip
RAID 1 - mirroring. Fault tolerance
RAID 6 - 2 drives fault tolerance
RAID 10- heavy duty all in all solution

DB optimisation techniques:
Sharding  (split by some criteria to different DBs)
Caches (memcached)
Open source vs bought. Mysql vs postgres vs oracle

High graphic requirements. Good GPUs 
High ML requirements. Good GPUs , neural networks
High CPU multi threaded cache bound - CPU affinity


Latency numbers
Latency numbers

https://gist.github.com/jboner/2841832

L1 cache reference ......................... 0.5 ns
Branch mispredict ............................ 5 ns
L2 cache reference ........................... 7 ns
Mutex lock/unlock ........................... 25 ns
Main memory reference ...................... 100 ns             
Compress 1K bytes with Zippy ............. 3,000 ns  =   3 µs
Send 2K bytes over 1 Gbps network ....... 20,000 ns  =  20 µs
SSD random read ........................ 150,000 ns  = 150 µs
Read 1 MB sequentially from memory ..... 250,000 ns  = 250 µs
Round trip within same datacenter ...... 500,000 ns  = 0.5 ms
Read 1 MB sequentially from SSD* ..... 1,000,000 ns  =   1 ms
Disk seek ........................... 10,000,000 ns  =  10 ms
Read 1 MB sequentially from disk .... 20,000,000 ns  =  20 ms
Send packet CA->Netherlands->CA .... 150,000,000 ns  = 150 ms


￼



Example product high level design.

￼


Tweeter q example.
Build a system for posting tweets, following others and favouriting tweets.

Ask Qs.
How many users, tweets? 
Geography? Peak / avg loads

CAP:
Availability? 
Consistency?
Latency?

Expiration on data??

So answers 
10M users
10M tweets per day
200 following (some heavy users can have 10k)
Availability - always
Consistency - for now 100%
Latency - good resp times <1sec 

We need to describe APIs and data models

APIs 
POST, tweet. Write. 10M per day. ~~ 1100 TPS (10M/86400) so aim for up to 10k TPS capacity
POST, follow, Write
POST, fav tweet, Write 
GET, user/s data, READ
GET, tweet/s data, READ

Sizing.
10M users. Full guid (16 bytes) not necessary 
200 following. 2 bn users graph edges.
 4 bytes. Give range of 2^32 ~~ 4*10^9 
10M tweets a day. * 365 = 3.65 bn tweets.
Each 2 times fav -> 20M favs a day.


UX
￼




DB schema
Users
Id (4b) unique primary key
Username (200b), unique, indexed 
First name
Last name    
Password hash
Password salt
Created at
updated at
Description

Tweet
Id (12 b) unique primary key, indexed
Msg (280 b)
Created at
User id  (1:1 foreign key), indexed for the select * from tweets where userid == $userid order by  createdat  DESC LIMIT 20; 
Take 20 most recent user tweets note that index (id, userid) will optimise search

User connections
Created at
Follower Id
Followee ID

Favs
Created at
User ID
Tweet ID
```
