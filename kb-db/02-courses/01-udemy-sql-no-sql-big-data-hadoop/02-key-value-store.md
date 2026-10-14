---
type: reference
title: key-value store
description: Udemy course notes on key-value store in the SQL/NoSQL/big data course.
tags: [redis, nosql, database, course-notes, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-db#2.1.2"
---

# 2.1.2 key-value store

[↑ Udemy SQL, No SQL, Big Data & Hadoop](/kb-db/02-courses/01-udemy-sql-no-sql-big-data-hadoop/README.md)

```text
like hash map. only distributed. no indexes, joins, sql etc.
redis, memcached...
```

#### 2.1.2.1 redis

```text
in memory nosql DB
written in C
keeps keys in memory
persistent/non-persistent modes
master slave topology
extensible - lua, C
Users: Twitter, Weibo, Pinterest, Github
```

#### 2.1.2.1.1 redis setup and installation

#### 2.1.2.1.1.1 redis docker

```text
a. retreive and start redis container.
$ docker run --name my-redis -d redis

b. check that its running
$ docker ps -a | grep Up
488793583e4e        redis                         "docker-entrypoint.s…"   57 seconds ago      Up 56 seconds               6379/tcp                 my-redis
1af403d0ae3e        mysql:latest                  "docker-entrypoint.s…"   5 days ago          Up 5 days                   3306/tcp, 33060/tcp      yosi-mysql
d623d12848f8        redis:4.0                     "docker-entrypoint.s…"   6 weeks ago         Up 4 days                   0.0.0.0:6379->6379/tcp   local-redis

if not just start it
docker start my-redis

c. shell access to container
docker exec -it my-redis sh, then redis-cli. or in 1 cmd:
docker exec -it my-redis redis-cli

For benchmark run
docker exec -it my-redis redis-benchmark

d. check redis server up
| 127.0.0.1:6379> ping
PONG

e. set/get
| 127.0.0.1:6379> set name yosi
OK
| 127.0.0.1:6379> get name
"yosi"


                    2.1.2.1.1.2

                2.1.2.1.2
```

#### 2.1.2.2 redis data structures

#### 2.1.2.2.1 key and string

```text
use cases: mem cache, sessions management etc

key can be anything. max size 512 MB. max # keys, 2^32-1 (~ 4*10^9)

keys commands
$ cat redis/data-structure-commands/keys.txt | pbcopy 
ECHO "list keys in your redis server"

KEYS *
KEYS demo.*

ECHO "there is no command to create a key. Keys are created when key-value pairs are set."
ECHO "I will create some key-value pairs"

SET foos bar
SET demo.redis.cli.hello world
SET demo.redis.cli.keys 12999030039

SADD demo.redis.cli.set0001 apple
HSET demo.redis.cli.hash001 movieId 3 title "Shawshank Redemption" genres "Comedy|Adventure" year 1998
ZADD demo.redis.cli.10202-scoreboard 6 James 2 Shane 9 Ezekiel 1 Darwin
PFADD demo.redis.cli.hll001 

KEYS *
KEYS demo.*

ECHO "confirm the existence of a key"

EXISTS demo.redis.cli.hll001
EXISTS demo.redis.cli.hll002s


ECHO "confirm the TTL of a key"
TTL demo.redis.cli.set0001
PTTL demo.redis.cli.10202-scoreboard

ECHO "set the TTL of a key"

EXPIRE foos 5					# in seconds
PEXPIRE mylist 3600000				# in milliseconds


ECHO "delete a key" 

DEL demo.redis.cli.keys


ECHO "check the type of the value held by a key"

TYPE demo.redis.cli.set0001
TYPE demo.redis.cli.hash001
TYPE demo.redis.cli.10202-scoreboard
TYPE demo.redis.cli.hll001 

ECHO "checkout out other commands for key management from the official command referent https://redis.io/commands#generic"

#scan command.
SCAN 0
#1) "13" #next cursor
#2)  1) "foo4"
#    2) "key:__rand_int__"
#    3) "demo.redis.cli.set0001"
#    4) "name"
#    5) "foo3"
#    6) "foo7"
#    7) "mylist"
#    8) "foo1"
#    9) "demo.redis.cli.hello"
#   10) "foo6"
#   11) "foo5"
#   12) "demo.redis.cli.keys"
SCAN 13 #scan next cursor
#1) "0" #0 return cursor means last page
#2) 1) "demo.redis.cli.hll001"
#   2) "foo2"
#   3) "myhash"
#   4) "counter:__rand_int__"


strings. all simple values (non set/hash etc). Can be also files etc.
$ cat redis/data-structure-commands/strings.txt | pbcopy 
ECHO "Lets create some string data"

SET demo.webapp.visitor_count 2
SET demo.ml.movie.2  "2::Jumanji (1995)::Adventure|Children's|Fantasy"
SET demo.app.usertoken:abc@yahoo.co.za RBPouKfAKzSUJdPihrJJAMkRCGcn5P5MICuzLZ2rPAldqeQa4U EX 21600 NX

ECHO "lets now get our results back"

GET demo.webapp.visitor_count
GET demo.ml.movie.2
GET demo.app.usertoken:abc@yahoo.co.za
GET demo.app.usertoken:doesnotexist@yahoo.co.za

## MSET MGET
ECHO "they type of our key is "

TYPE demo.webapp.visitor_count
string
TYPE demo.ml.movie.2
string
TYPE demo.app.usertoken:abc@yahoo.co.za
string

ECHO "but the encoding will differ"

OBJECT ENCODING demo.webapp.visitor_count
int
OBJECT ENCODING demo.ml.movie.2
raw
OBJECT ENCODING demo.app.usertoken:abc@yahoo.co.za
raw

ECHO "they object encoding determines the permissible operation that can be performed."

INCR demo.webapp.visitor_count   # we cannot do this to demo.app.usertoken:abc@yahoo.co.za for instance 
DECR demo.webapp.visitor_count

INCR demo.app.usertoken:abc@yahoo.co.za

INCRBY demo.webapp.visitor_count 10
INCRBY demo.ml.movie.2 2.1
DECRBY demo.webapp.visitor_count 2

ECHO "get the length of our user token"
STRLEN demo.app.usertoken:abc@yahoo.co.za
50

ECHO "checkout out other commands for string from the official command referent https://redis.io/commands#string"
```

#### 2.1.2.2.2 hash and list

```text
O(1) access time

$ cat redis/data-structure-commands/hashes.txt | pbcopy
ECHO "Lets create some string data"
HSET demo.ml.movie#1 title "Toy Story (1995)"
HSET demo.ml.movie#1 year 1995
HSET demo.ml.movie#1 genres "Animation|Children's|Comedy"
HSET demo.ml.movie#1 id 1

ECHO "Return all pairs in the hash"
HGETALL demo.ml.movie#1

ECHO "Return the value for a field in the hash"
HGET demo.ml.movie#1 id

ECHO "Load all key value pair in one command. See string MSET and MGET"
HMSET demo.ml.movie#2 title "Jumanji (1995)" year 1995  genres "Adventure|Children's|Fantasy" id 2 id 1
HMSET demo.ml.movie#3952 title "Contender, The (2000)" year 2000  genres "Thriller" id 3952
HMSET demo.ml.movie#3947 title "Get Carter (1971)" year 1971  genres "Thriller" id 3947
HMSET demo.ml.movie#3945 title "The Movie (2000)" year 2000  genres "Adventure|Animation|Children's" id 3945
HMSET demo.ml.movie#3941 title "Sorority House Massacre (1986)" year 1986  genres "Horror" id 3941
HMSET demo.ml.movie#3942 title "Sorority House Massacre II (1990)" year 1990  genres "Horror" id 3942
HMSET demo.ml.movie#3927 title "Fantastic Voyage (1966)" year 1966  genres "Adventure|Sci-Fi" id 3927

ECHO "list all the keys in the hash for this key"
HKEYS demo.ml.movie#3927

ECHO "list all the values in the hash for this key"
HVALS demo.ml.movie#2 

ECHO "returns the size of the hash for this key. how many sub keys..."
HLEN demo.ml.movie#3941

ECHO "confirm the existence of this key in the hash for this key"
HEXISTS demo.ml.movie#3927 id 
HEXISTS demo.ml.movie#3927 ids

ECHO "inspecting the type of this key"
TYPE demo.ml.movie#3952
OBJECT ENCODING demo.ml.movie#3952

ECHO "return the listed fields from the hash identified by this key. Non-existing field return nill"
HMGET demo.ml.movie#1 id title year genres field5

ECHO "increase and decrease the value of this field in the hash for this key by the value 20"
HINCRBY demo.ml.movie#1 year -1

ECHO "checkout out other commands for hashes from the official command referent https://redis.io/commands#hash"


Lists, key value pair. values are strings only
add/remove from both head and tail. all O(1).
inner list changes O(n)
use case: stack/queue, keep order  
$ cat redis/data-structure-commands/list.txt | pbcopy
ECHO "Lets create some string data. push left side. then right side"
LPUSH demo.ml.ratings "1::1193::5::978300760" "1::661::3::978302109"
RPUSH demo.ml.ratings "1::914::3::978301968" "1::3408::4::978300275"

ECHO "See all the content of the list"
LRANGE demo.ml.ratings 0 -1

ECHO "Add more data from the tail end of the list"
RPUSH demo.ml.ratings "1::2355::5::978824291" "1::1197::3::978302268"

ECHO "return the element at the index of the list. This happens from the head"
LINDEX demo.ml.ratings 0
LINDEX demo.ml.ratings 1

ECHO "return and remove an item from the head and tail respectively."
LPOP demo.ml.ratings
RPOP demo.ml.ratings 

ECHO "Add more data from the head end of the list"
LPUSH demo.ml.ratings "1::1287::5::978302039" "1::1287::5::978302039" "1::2804::5::978300719" "1::594::4::978302268"

ECHO "Add a number of duplications from the head end of the list"
LPUSH demo.ml.ratings "1::919::4::978301368" "1::919::4::978301368" "1::919::4::978301368" "1::919::4::978301368"

ECHO "Use LTRIM to cap the list. This time, the purpose is to remove the duplication I entered above"
LTRIM demo.ml.ratings 3 -1

ECHO "Use LTRIM to cap the list to just one item" 
LTRIM demo.ml.ratings 0 0

ECHO "use blocking pop to remove an item from the list with 0 timeout"
ECHO "the first command should work while the second will block indefinitely"
BLPOP demo.ml.ratings 0
BLPOP demo.ml.ratings 0


ECHO "checkout out other commands for lists from the official command referent https://redis.io/commands#list"
```

#### 2.1.2.2.3 set, sorted set

```text
set. no duplicates. order not gauranteed. O(1) add/rem/lookup. 
supported group operations. union, intersection etc.
$ cat redis/data-structure-commands/set.txt | pbcopy
ECHO "Lets create some string data"
SADD demo.ml.genres Action Adventure Animation Children Comedy Crime Drama Fantasy 
SADD demo.ml.genres War Western Horror Sci-Fi  Mystery Romance  Thriller Fantasy Documentary Film-Noir

ECHO "Return the cardinality (size) of the set"
SCARD demo.ml.genres

ECHO "Inspect the type and object encoding"
TYPE demo.ml.genres
OBJECT ENCODING demo.ml.genres

ECHO "Return all members of the set. Be careful as this could contain a lot of records"
SMEMBERS demo.ml.genres

ECHO "Check if an item is a member of the set"
SISMEMBER demo.ml.genres Action
SISMEMBER demo.ml.genres Actions

ECHO "randomly return x members of the set"
SRANDMEMBER demo.ml.genres 2

ECHO "Create a new set"
SADD demo.ml.genres.viewed Documentary Adventure Thriller Comedy Drama Fantasy 


ECHO "Find all items common to both sets. use SINTERSTORE to do the same but store the value in a new set"
SINTER demo.ml.genres demo.ml.genres.viewed 

ECHO "Find the difference between the first set and the rest. use SDIFFSTORE to do the same but store the value in a new set"
SDIFF demo.ml.genres demo.ml.genres.viewed

ECHO "Remove and return a value from this set."
SPOP demo.ml.genres.viewed

ECHO "Remove the item named from this set."
SREM demo.ml.genres.viewed Drama

ECHO "checkout out other commands for sets from the official command reference https://redis.io/commands#set"

sorted sets. Like sets but each entry has a score (for sorting)
$ cat ~/work/courses/sql_nosql_bigdata/rdbms_2_nosql/redis/data-structure-commands/sortedset.txt | pbcopy
ECHO "Lets create some string data"
ZADD demo.ml.genre_hist 20 Action 34 Adventure 10 Animation 16 Children 55 Comedy 19 Crime 39 Drama 11 Fantasy
ZADD demo.ml.genre_hist NX 22 War 8 Western 
ZADD demo.ml.genre_hist CH 8.9 Horror 8 Sci-Fi 3 Mystery 24 Romance 10 Thriller 3.11 Documentary 1 Film-Noir

ECHO "get cardinality"
ZCARD demo.ml.genre_hist

ECHO "list out the items of this sorted set. Then do it in a reverse order"
ZRANGE demo.ml.genre_hist 0 -1
ZRANGE demo.ml.genre_hist 0 -1 WITHSCORES

ZREVRANGE demo.ml.genre_hist 0 2
ZREVRANGE demo.ml.genre_hist 0 2 WITHSCORES

ZRANGE demo.ml.genre_hist 0 2000


ECHO "inspecting our data structure"
TYPE demo.ml.genre_hist
OBJECT ENCODING demo.ml.genre_hist

ECHO "Getting the ranks of member or non-members of this sorted set"
ZRANK demo.ml.genre_hist Action
ZREVRANK demo.ml.genre_hist Action

ZRANK demo.ml.genre_hist Actions

ECHO "Return the score for this member"
ZSCORE demo.ml.genre_hist Action

ECHO "Increasing and decreasing an item score and seeing the effect on ranking "
ZRANK demo.ml.genre_hist Action
ZINCRBY demo.ml.genre_hist 3 Action
ZRANK demo.ml.genre_hist Action
ZINCRBY demo.ml.genre_hist -3 Action
ZRANK demo.ml.genre_hist Action


ECHO "Removing items from a sorted set"
ZPOPMIN demo.ml.genre_hist 
ZRANGE demo.ml.genre_hist 0 -1

ZPOPMAX demo.ml.genre_hist 
ZRANGE demo.ml.genre_hist 0 -1

ZREM demo.ml.genre_hist XXXXXX
ZRANGE demo.ml.genre_hist 0 -1

ECHO "checkout out other commands for sorted set from the official command referent https://redis.io/commands#sorted_set"
```

#### 2.1.2.2.4 GEO , HyperLogLog

#### 2.1.2.2.4.1 GEO, geographical longitude and latitude

```text
used similar to sorted set
supports distance and radius
$ cat ~/work/courses/sql_nosql_bigdata/rdbms_2_nosql/redis/data-structure-commands/geo.txt | pbcopy
ECHO "Lets create some string data"
GEOADD demo.cities -118.243685  34.052234 "Los Angeles"
GEOADD demo.cities 28.047305 -26.204103 "Johannesburg"
GEOADD demo.cities 18.424055  -33.924869 "Cape Town"

ECHO "We can add more than one at a time"
GEOADD demo.cities -0.127758 51.507351 London 139.650311 35.676192 Tokyo 172.636225 -43.532054 Christchurch 
GEOADD demo.cities -74.005941 40.712784 "New York" -46.633309 -23.550520 "Sao paolo" 3.379206 6.524379 Lagos 
GEOADD demo.cities 13.404954 52.520007 Berlin 55.270783 25.204849 Dubai 3.379206 6.524379 Lagos 
               
ECHO "Lets use a sorted set command to see the list of cities in our geo structure"
ZRANGE demo.cities 0 -1 WITHSCORES

ECHO "Lets using GEODIST to see the distance between any two members in kilometers."
GEODIST demo.cities Dubai Berlin km

ECHO "Return the position of a member"
GEOPOS demo.cities Christchurch

ECHO "Introspecting our geo data structure. It is just a sorted set"
TYPE demo.cities 
OBJECT ENCODING demo.cities 

GEOHASH demo.cities "Los Angeles"

ECHO "checkout out other commands for geo from the official command referent https://redis.io/commands#geo"
```

#### 2.1.2.2.4.2 hyperloglog

```text
solves the problem of counting unique items (like visitor IDs for facebook) across distributed systems.
brute force query select distinct is not efficient. on a single node its o(n) time/space complexity.
on distributed its gets worse as the data needs to be aggregated and merged 

hyperloglog saves this problem by tracking the max number of ending zeros of items in the set
where each item is 64bit represented. the approximation is that if we have n max zeros we have 2^n numbers
to normalize and avoid high std deviation the numbers are divided to buckets according to k leading bits.
Then the avg of max zeros per bucket is used.
so possible values 2^64
value is 64 bit (log2(2^64))
max zeros 6 (log(64))
hence the name hyperloglog. 
very small amount of space is required
```

#### 2.1.2.2.4.2.1 https://thoughtbot.com/blog/hyperloglogs-in-redis

```text
HyperLogLogs in Redis
Calle Erlandsson  August 1, 2016 UPDATED ON March 23, 2019
REDIS  WEB  RUBY
A hyper-what-now?

A HyperLogLog is a probabilistic data structure used to count unique values — or as it’s referred to in mathematics: calculating the cardinality of a set.

These values can be anything: for example, IP addresses for the visitors of a website, search terms, or email addresses.

Counting unique values with exact precision requires an amount of memory proportional to the number of unique values. The reason for this is that there is no way of determining if a value has already been seen other than by comparing it to the previously seen values.

Since memory is a limited resource, doing this becomes problematic when working with large sets of values.

A HyperLogLog solves this problem by allowing to trade memory consumption for precision making it possible to estimate cardinalities larger than 109 with a standard error of 2% using only 1.5 kilobytes of memory[1].

How to use HyperLogLogs in Redis
HyperLogLogs have been available in Redis since version 2.8.9 and are accessed using the PFADD, PFCOUNT, and PFMERGE commands.

A Redis HyperLogLog consumes at most 12 kilobytes of memory and produces approximations with a standard error of 0.81%. The 12 kilobytes do not include the bytes required to store the actual key.

Ignoring PFMERGE, using a HyperLogLog is very similar to using a Set for the same purpose: instead of adding members with SADD, add them with PFADD and instead of retrieving the cardinality with SCARD, retrieve it with PFCOUNT.

The example below shows the output of an interactive Redis session. You can follow along by running redis-cli and entering the commands shown on the lines beginning with >. Make sure an instance of redis-server is also running.

> PFADD visitors alice bob carol
(integer) 1
> PFCOUNT visitors
(integer) 3
PFADD returns 1 if the approximated cardinality of the HyperLogLog was changed when adding the element. If not, it returns 0.

After calculating the cardinality, PFCOUNT will store the calculated value in the last 8 bytes of the HyperLogLog to serve as a cache. This cache is invalidated on the next PFADD.

The PFMERGE command is used to produce a HyperLogLog that approximates the cardinality of the union of two or more existing HyperLogLogs:

> PFADD customers alice dan
(integer) 1
> PFMERGE everyone visitors customers
OK
> PFCOUNT everyone
(integer) 4
The same result can be achieved by supplying multiple keys to PFCOUNT. In this case an on-the-fly merge is performed:

> PFCOUNT visitors customers
(integer) 4
Under the hood, HyperLogLogs are actually stored as strings and can be GET and SET as such:

> GET visitors
"HYLL\x01\x00\x00\x00\x03\x00\x00\x00\x00\x00\x00\x00E<\x94X\x10\x84Qi\x8cQD"
> SET visitors "HYLL\x01\x00\x00\x00\x03\x00\x00\x00\x00\x00\x00\x00E<\x94X\x10\x84Qi\x8cQD"
OK
> PFCOUNT visitors
(integer) 3
This is useful if the HyperLogLog needs to be persisted elsewhere and later restored.

The PFADD, PFCOUNT, and PFMERGE commands are prefixed with PF in memory of Philippe Flajolet, the inventor of the HyperLogLog algorithm.

The theory behind HyperLogLogs
To get started, let’s look at something more familiar than HyperLogLogs.

Imagine someone flipping a coin multiple times, while recording the maximum number of heads they get in a row. If they told you this number — would you be able to estimate how many times they’d flipped the coin?

Not with great accuracy, but since a longer run of heads is more probable when flipping the coin many times, the number of consecutive heads or tails in a series of coin flips can indicate how many times the coin was flipped: if the number of heads in a row is low, the number of coin flips is most probably also low. Conversely, if the number of heads in a row is high the number of coin flips is most probably high.

If the same number of coin flips were done and recorded separately, a much more precise estimate could be made by combining these numbers. This can be observed using the following methods:

def coin_flips(n)
  Array.new(n) { [:heads, :tails].sample }
end

def heads_in_a_row(flips)
  run = max = 0

  flips.each do |flip|
    if flip == :heads
      run += 1
    else
      max = [run, max].max
      run = 0
    end
  end

  max
end

class Array
  def average
    reduce(:+).to_f / size
  end
end
The bigger the number of coin flips, the bigger the number of heads in a row.

heads_in_a_row coin_flips(10)    #=> 3
heads_in_a_row coin_flips(100)   #=> 5
heads_in_a_row coin_flips(1000)  #=> 9
heads_in_a_row coin_flips(10000) #=> 15
The bigger the number of series, the better the stability of the output. With a more stable output, a better estimate can be made:

heads_in_a_row coin_flips(10) #=> 3
heads_in_a_row coin_flips(10) #=> 7
heads_in_a_row coin_flips(10) #=> 4

Array.new(1000) { heads_in_a_row coin_flips(10) }.average #=> 2.449
Array.new(1000) { heads_in_a_row coin_flips(10) }.average #=> 2.442
Array.new(1000) { heads_in_a_row coin_flips(10) }.average #=> 2.469
Similarly to how the number of coin flips can be estimated by observing the number of heads in a row, the calculations of a HyperLogLog are based on the observation that the cardinality of a set of uniformly distributed random numbers can be estimated by counting the maximum number of leading zeros in the binary representation of the numbers.

For there to be leading zeros, the numbers must be represented as integers with the same number of bits, for instance as 64-bit unsigned integers.

If the maximum number of leading zeros is n, the estimated number of unique values in the set is 2n.

To make sure values are uniformly distributed and represented as same-size integers, the HyperLogLog algorithm applies a hash function to all values. This transforms the values into a set of uniformly distributed random numbers with the same cardinality as the original set.

The first few bits of the hashed values are used to divide them into different subsets, much like the separate series of coin flips in the example above. For each subset the maximum number of leading zeros within its values are stored in a register.

To calculate the approximate cardinality of the whole set, the estimates for all the subsets are combined using a harmonic mean.

An example use-case
Here’s an example of how to use a Redis HyperLogLog to count unique visitors of a site built with Sinatra using a custom Rack middleware:

require 'redis'
require 'sinatra'

$redis = Redis.new

class VisitorCounter
  def initialize(app)
    @app = app
  end

  def call(env)
    $redis.pfadd 'visitors', Rack::Request.new(env).ip
    @app.call(env)
  end
end

use VisitorCounter

get '/' do
  visitors = $redis.pfcount 'visitors'
  "This website has been visited by #{visitors} unique visitors."
end
```

#### 2.1.2.2.4.2.2 usage

```text
A special data structure optimized for the "distinct count" query on a collection that may contain duplicates of same ID/key.
$ cat ~/work/courses/sql_nosql_bigdata/rdbms_2_nosql/redis/data-structure-commands/hyperloglog.txt | pbcopy
ECHO "Lets create some string data"
PFADD demo.ml.rating.users 1 1 3 4 12 3 4 6 3 5 7 65 5 33 2 213 3 7 4 

ECHO "Introspecting our structure"
TYPE demo.ml.rating.users 
OBJECT ENCODING demo.ml.rating.users 

ECHO "Count the number of items in our hyperloglog"
PFCOUNT demo.ml.rating.users 

ECHO "checkout out other commands for hyperloglog from the official command referent https://redis.io/commands#hyperloglog"
```

#### 2.1.2.2.5 Pubsub

```text
                                                                         +----------------+
                                                                         |                |
                                                              +----------> subscriber1    |
                                                              |          |                |
                                                              |          +----------------+
+-------+                                                     |
|       |                                                     |
|       |            +----------------------------------------+
|       +------------>                                        |           +---------------+
| Publisher          |                                        |           |               |
|       |            |       Channel                          +-----------> subscriber1   |
+-------+            |                                        |           |               |
                     +----------------------------------------+           +---------------+
                                                              |
                                                              |
                                                              |
                                                              |           +---------------+
                                                              |           |               |
                                                              +----------->  subscriber3  |
                                                                          +---------------+

 cat ~/work/courses/sql_nosql_bigdata/rdbms_2_nosql/redis/data-structure-commands/pubsub.txt | pbcopy

 #
# open two terms and have redis-cli open in both.
#
ECHO "THIS IS THE CLIENT SUBSCRIBER"
SUBSCRIBE channel_test_1





ECHO "in the second terminal with redis-cli"
PUBLISH channel_test_1 "this is my hello world"

ECHO "checkout out the commands for pubsub from the official command referent https://redis.io/commands#pubsub"
```

#### 2.1.2.2.6 transaction

#### 2.1.2.2.6.1 Transactions in redis

```text
 cat ~/work/courses/sql_nosql_bigdata/rdbms_2_nosql/redis/data-structure-commands/transaction.txt | pbcopy
ECHO "Lets create some string data"
SET foos 230

ECHO "Start a transaction, enter numerous command and after call EXEC to effect all were effected"
MULTI
INCRBY foos 11
DECRBY foos 6
EXEC

GET foos


ECHO "Start a transaction, enter numerous command and after call DISCARD to effect none of the commands"
MULTI
INCRBY foos 11
DECRBY foos 6
DISCARD

GET foos

ECHO "checkout out other commands for transactions from the official command referent https://redis.io/commands#transactions"
```

#### 2.1.2.2.6.2 https://redislabs.com/blog/you-dont-need-transaction-rollbacks-in-redis/

```text
Redis features two main mechanisms for executing multiple operations atomically: MULTI/EXEC transactions and Lua scripts. One peculiarity of transactions in Redis that often trips up newcomers is the absence of a rollback mechanism. In my tenure as a Developer Advocate at Redis Labs, I’ve talked to a few engineers with traditional SQL backgrounds who found this troubling, so with this blog I want to share my opinion on the subject, and argue that you don’t need rollbacks in Redis.

MULTI/EXEC transactions
Transactions in Redis start with the MULTI command. Once it’s sent, the connection switches mode and all subsequent commands sent through the connection will be queued by Redis instead of being immediately executed, with the exception of DISCARD and EXEC (which will instead cause the transaction to abort or commit, respectively). Committing the transaction means executing the previously queued commands.

MULTI
SET mykey hello
INCRBY counter 10
EXEC

Transactions (and Lua scripts) ensure two important things:

Other clients won’t see a partial state—meaning that all clients will see the state either before the transaction was applied, or after. 
In case of a node failure, once Redis restarts, it will reload either the whole transaction or none of it from the AOF file. 
One last basic thing to keep in mind about transactions: Redis will continue to serve other clients even when a MULTI transaction has been initiated. Redis will stop applying other clients’ commands only briefly when the transaction gets committed by calling EXEC. This is very different from SQL databases, where transactions engage various mechanisms within the DBMS to provide varying degrees of isolation assurances, and where clients can read values from the database while performing the transaction. In Redis, transactions are “one shot”—in other words, just a sequence of commands that get executed all at once. So, how do you create a transaction that depends on the data present in Redis? For this purpose, Redis implements WATCH, a command for performing optimistic locking.

Optimistic locking with WATCH

Let me show you on a practical level why you can’t read values from Redis while in a transaction:

MULTI
SET counter 42
GET counter
EXEC

If you run this series of commands in redis-cli, the reply from “GET counter” will be “QUEUED”, and the value “42” will be returned only as a result of calling EXEC, alongside the “OK” returned from executing the SET command.

To write a transaction that depends on data read from Redis, you must use WATCH. Once run, the command will ensure that the subsequent transaction will be executed only if the keys being WATCHed have not changed before EXEC gets called.

For example, this is how you would implement an atomic increment operation if INCRBY did not exist:

WATCH counter
GET counter
MULTI
SET counter <the value obtained from GET + any increment>
EXEC

In this example, we first create a WATCH trigger over the “counter” key, then we GET its value. Notice how GET happens before we start the transaction’s body, meaning it will be executed immediately and it will return the key’s current value. At this point, we start the transaction using MULTI and apply the change by computing on the clientside what the new value of “counter” should be.

If multiple clients were trying to concurrently apply this same transaction to the “counter” key, some transactions would be automatically discarded by Redis. At this point it would usually be the client’s job to retry the transaction. This is similar to SQL transactions, where higher isolation levels will occasionally cause the transaction to abort, leaving the client the task of retrying it.

Lua scripts
While WATCH can be very useful for performing articulated transactions, it’s usually easier and more efficient to use a Lua script when you need to perform multiple operations that depend on data in Redis. With a Lua script, you send the logic to Redis (in the form of the script itself) and have Redis execute the code locally, instead of pushing data to the client as we were doing in the example above. This is faster for several reasons, but here’s the big one: Lua scripts can read data from Redis without needing optimistic locking.

This how the previous transaction would be implemented as a Lua one-liner:

EVAL "redis.call('SET', KEYS[1], tonumber(redis.call('GET', KEYS[1]) or 0) + tonumber(ARGV[1]))" 1 counter 42

There are, in my opinion, a couple of reasonable situations where you might legitimately prefer transactions with optimistic locking over Lua:

The keys your transaction depends on are not modified frequently, meaning that you are confident optimistic locking will almost never abort transactions.
You depend on a lot of logic written on the client side—or maybe a third-party service—so there is no easy way to move that logic to a Lua script.
Unless both these points are true for your application, I recommend you choose Lua over WATCH.

Errors in transactions
To recap: MULTI/EXEC transactions (without WATCH) and Lua scripts never get discarded by Redis, while MULTI/EXEC + WATCH will cause Redis to abort transactions that depend on values changed after the corresponding keys were WATCHed. Lua scripts are more powerful than simple (i.e. WATCH-less) transactions because they can also read values from Redis, and are more efficient than “WATCHed” transactions because they don’t require optimistic locking to read values.

The key point about optimistic locking is that when a WATCHed key is changed, the whole transaction is discarded immediately when the client commits it using EXEC. Redis has a main, single-threaded command execution loop, so when the transaction queue is being executed no other command will run. This means that Redis transactions have a true serializable isolation level, and also means that no rollback mechanism is required to implement WATCH.

But what happens when there’s an error in a transaction? The answer is that Redis will continue to execute all commands and report all errors that happened.

To be more precise, there are some types of errors that Redis can catch before the client calls EXEC. One basic example are blatant syntax errors:

MULTI
GOT key? (NOTE: Redis has no GOT command and, after season 8, it never will)
EXEC


But not all errors can be discovered by inspecting the command syntax, and those could cause the transaction to misbehave. As an example:

MULTI
SET counter banana
INCRBY counter 10
EXEC

The example above will be executed but the INCRBY command will fail because the “counter” key doesn’t contain a number. This type of error can be discovered only when running the transaction (nevermind that in this simplified example we are the ones setting the wrong initial value).

This is the moment where one might say that rollbacks would be nice to have. I might agree if not for two considerations:

The snapshotting mechanism required to implement rollbacks would have a considerable computational cost. That extra complexity wouldn’t sit well with Redis’ philosophy and ecosystem.
Rollbacks can’t catch all errors. In the example above, we set “counter” to “banana” in order to show a blatant error, but in the real world the process that used the “counter” key in the wrong way might instead have deleted it, or put in a credit-card number, for example. Rollbacks would add a considerable amount of complexity and would still not fully solve the problem.
The second point is particularly important because it also applies to SQL: SQL DBMSs offer many mechanisms to help protect data integrity, but even they can’t completely protect you from programming errors. On both platforms, the burden of writing correct transactions remains on you. 

Rollbacks in SQL DBMSs
If that seems to conflict with your experience using SQL databases, let’s look at the difference between relying on errors to enforce constraints vs. relying on errors to protect the data from bugs in your code.

It’s common practice in SQL to use indexes to implement constraints on the data and rely on those indexes on the client side for correctness. A common example would be to add a “UNIQUE” constraint to a “username” column to ensure that each user has a different username. At that point clients would try to insert new users and expect the insertion to fail when another user with the same name already exists.

This is a perfectly legitimate use of a SQL database, but relying on the constraint to implement application logic is very different than expecting rollbacks to protect you from mistakes in the transaction logic itself.

At AWS re:Invent 2019, when an attendee asked me “Why doesn’t Redis have rollbacks?” my answer was based on enumerating why people use rollbacks in SQL. In my opinion, there are only two main reasons to do so:

First reason to use rollbacks: concurrency

Most common SQL databases are multithreaded applications, and when a client requests a high isolation level, the DBMS prefers to trigger an exception rather than stop serving all other clients. This makes sense for the SQL ecosystem because SQL transactions are “chatty”: a client locks a few rows, reads a few values, computes what changes to apply, and finally commits the transaction.

In Redis, transactions are not meant to be as interactive. The single-threaded nature of the main event loop in Redis ensures that while the transaction is running, no other command gets executed. This ensures that all transactions are truly serializable without violating the isolation level. When a transaction uses optimistic locking, Redis will be able to abort it before executing any command in the transaction queue—which doesn’t require a rollback.

Second reason to use rollbacks: leveraging index constraints

In SQL, it’s common to use index constraints to implement logic in the application. I mentioned UNIQUE, but the same applies to foreign key constraints and more. The premise is that the application relies on the database to have been properly configured and leverages index constraints to implement the logic in an efficient way. But I’m sure everyone has seen applications misbehave when somebody forgets to put in a UNIQUE constraint, for example.

While SQL DBMSs do a great job of protecting data integrity, you can’t expect to be protected from all errors in your transaction code. There is a significant class of errors that don’t violate type checking or index constraints.

Redis has no built-in index system (Redis modules are a different story and don’t apply here). To force uniqueness, for example, you would use a Set (or equivalent) data type. This means the correct way to express an operation in Redis looks different from the equivalent in SQL. Redis’ data model and execution model are different enough from SQL that the same logical operation would be expressed in different ways depending on the platform, but the application must always be in sync with the state of the database.

An application that tries to INCRBY a key that contains a non-numeric value is the same as an application that expects a SQL schema inconsistent with what’s on the database. If you have gremlins in your Redis database making unexpected changes, lock them out using access control lists (ACLs).

Redis vs. SQL
If you come from a SQL background, you might understandably be surprised by how transactions work in Redis. Given that NoSQL has demonstrated that relational databases are not the only valuable model for storing data, don’t make the mistake of assuming that any diversion from what SQL offers is inherently inferior. SQL transactions are chatty, based on a multi-threaded model and interoperate with other subsystems to leverage rollbacks in case of failures. In contrast, Redis transactions are more focused on performance and there is no indexing subsystem to leverage for enforcing constraints. Because of these differences, the transaction-writing “style” that you use in Redis is fundamentally different from the SQL one.

This means that the lack of rollbacks in Redis doesn’t limit expressiveness. All reasonable SQL transactions can be rewritten to a functionally equivalent Redis transaction, but it’s not always trivial to do in practice. Reasoning about a problem originally articulated in SQL in Redis requires you to think about your data in a different way, and you also need to account for the different execution model. 

Finally, it’s true that rollbacks can be useful to protect your data from programming errors, but they are not meant to be a solution to that problem. As a multi-model database based on a key-value structure, Redis doesn’t offer the same level of “type checking” ease that SQL does, but there are techniques to help with that, as Kyle Davis, Head of Developer Advocacy at Redis Labs, explained in this recent blog post: Bullet-Proofing Lua Scripts in RedisPy.

That said, your applications need to be in sync with what’s in the database, both when using a relational database and when using Redis. For Redis, the utility of rollbacks would not outweigh the costs in terms of performance and additional complexity. If you ever wondered how Redis can be so much faster than other databases, here’s yet another reason why.
                    2.1.2.2.6.3
```

#### 2.1.2.2.7 Redis usage

```text
Redis can be used as read queries cache. This is simple enough. store finished query results in cache. 
Fetch from cache rather than DB.

Redis can be used as the primary DB. But this requires 'Strict Access Pattern'. This is Because SQL is not available with it's wealth of operations. Just key, value is supported.
This technique means that first we need the model the requirements from the system.
Like in movielens use case breakdown to 
user:
find by id
insert/update
find by age/occupation

movies:
find by id
insert/update
find by genre/release-year

ratings:
etc. 

genre:
etc.

Also model read/write load according to use case.
Ex:
movie genre doesn't change but can be read a lot.
ratings can be uploaded in peak (for new movies) so favor efficient write
etc.

Now to support user related queries we need different data structures
a hash/set of user ids
a set of users per age group
a set of users per occupation 
```

#### 2.1.2.2.8 redis example java applications

```text
source code
cd  /Users/<user>/work/courses/sql_nosql_bigdata/rdbms_2_nosql/redis/movielens-redis-ui
mvn package

                2.1.2.2.9
            2.1.2.3


id=__Document_oriented_DB_Document-Store__
```

## See Also

<!-- backlinks:start -->
### Backlinks

* [Redis Primer](/system-design/redis/redis-primer.md)
<!-- backlinks:end -->
