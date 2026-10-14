---
type: reference
title: postgres
description: "PostgreSQL notes: pagination approaches (limit/offset and alternatives) from a Citus article."
tags: [postgresql, database, sql, tips, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-db#1"
---

# postgres

[↑ kb-db](/kb-db/README.md)

## 1.1 pagination

```text
https://www.citusdata.com/blog/2016/03/30/five-ways-to-paginate/
```

### 1.1.0 Full article

```text
Postgres DB Server side pagination


Five ways to paginate in Postgres, from the basic to the exotic
 Share this post  
It may surprise you that pagination, pervasive as it is in web applications, is easy to implement inefficiently. In this article we’ll examine several methods of server-side pagination and discuss their tradeoffs when implemented in PostgreSQL. This article will help you identify which technique is appropriate for your situation, including some you may not have seen before which rely on physical clustering and the database stats collector.
Before continuing it makes sense to mention client-side pagination. Some applications transfer all (or a large part) of the server information to the client and paginate there. For small amounts of data client-side pagination can be a better choice, reducing HTTP calls. It gets impractical when records begin numbering in the thousands. Server-side has additional benefits such as
* Faster initial page load
* More accuracy when shared data is changing
* Faster operations on large datasets
* Encapsulation of business logic
* Better performance on resource-constrained clients
PostgreSQL gives us a number of server-side pagination techniques that differ in speed, integrity (not missing records), and support for certain page access patterns. Not all methods work in all situations, some require special data or queries. Let’s consider the methods in order of generality, starting with those that work for any query, then those which require ordered data. We’ll conclude with some exotic methods which rely on PostgreSQL internals.
Paginating Arbitrary Queries
Limit-Offset
The easiest method of pagination, limit-offset, is also most perilous. Sadly it’s a staple of web application development tutorials. Object relational mapping (ORM) libraries make it easy and tempting, from SQLAlchemy’s .slice(1, 3) to ActiveRecord’s .limit(1).offset(3) to Sequelize’s .findAll({ offset: 3, limit: 1 }). They all generate SQL ending in LIMIT 1 OFFSET 3. It’s no coincidence that limit-offset use is widespread, you can tack it onto any query without further modification.
ORM methods to limit and offset the data are one thing, but pagination helper libraries can be even more deceptive. For instance the popular Ruby library Kaminari uses limit-offset by default, while hiding it behind a high-level interface.
The technique has two big problems, result inconsistency and offset inefficiency. Consistency refers to the intention that traversing a resultset should retrieve every item exactly once, without omissions or duplication. Offset inefficiency refers to the delay incurred by shifting the results by a large offset.
Here’s how limit-offset pagination can be inconsistent. Suppose a user moves from page n to n+1 while simultaneously a new element is inserted into page n. This will cause both a duplication (the previously-final element of page n is pushed into page n+1) and an omission (the new element). Alternatively consider an element removed from page n just as the user moves to page n+1. The previously initial element of page n+1 will be shifted to page n and be omitted.
Now for the inefficiency. Large offsets are intrinsically expensive. Even in the presence of an index the database must scan through storage, counting rows. To utilize an index we would have to filter a column by a value, but in this case we require a certain number of rows irrespective of their column values. Furthermore the rows needn’t have the same size in storage, and some may be present on disk but marked as deleted so the database cannot use simple arithmetic to find a location on disk to begin reading results. Let’s measure the slowdown.
-- Create table with random strings of various lengths
CREATE TABLE medley AS
  SELECT
    generate_series(1,10000000) AS n,
    substr(concat(md5(random()::text), md5(random()::text)), 1, (random() * 64)::integer + 1) AS description;

-- Notify query planner of drastically changed table size
VACUUM ANALYZE;

-- Low offsets are refreshingly fast
EXPLAIN ANALYZE SELECT * FROM medley LIMIT 100;
The estimated cost is quite low:
                                                     QUERY PLAN
--------------------------------------------------------------------------------------------------------------------
 Limit  (cost=0.00..1.85 rows=100 width=38) (actual time=0.008..0.036 rows=100 loops=1)
   ->  Seq Scan on medley  (cost=0.00..185460.60 rows=9999660 width=38) (actual time=0.007..0.017 rows=100 loops=1)
 Planning time: 0.040 ms
 Execution time: 0.059 ms
(4 rows)
Choosing offset=1000 makes cost about 19 and has a 0.609 ms execution time. Once offset=5,000,000 the cost goes up to 92734 and execution time is 758.484 ms.
These problems don’t necessarily mean that limit-offset is inapplicable for your situation. In some applications users don’t typically advance many pages into a resultset, and you might even choose to enforce a server page limit. If result inconsistency and restricted page numbers aren’t a problem in your application then limit-offset may be convenient for your needs.
When to Use: Limit-offset
Applications with restricted pagination depth and tolerant of result inconsistencies.
Cursors
Despite its disadvantages limit-offset does have the advantage of being stateless on the server. Contrast it with another pagination approach, query cursors. Like offsets, cursors can be used in any query, but they differ by requiring the server to hold a dedicated database connection and transaction per HTTP client.
Here is how cursors can be used:
-- We must be in a transaction
BEGIN;
-- Open a cursor for a query
DECLARE medley_cur CURSOR FOR SELECT * FROM medley;
-- Retrieve ten rows
FETCH 10 FROM medley_cur;
-- ...
-- Retrieve ten more from where we left off
FETCH 10 FROM medley_cur;
-- All done
COMMIT;
Cursors have the desirable property of pagination consistency on arbitrary queries, showing results as they exist at the time the transaction was started. The isolation level (link is external) of the transaction guarantees that our paginated view of the results won’t change.
Every pagination approach has a downside, and the problems with cursors are resource usage and client-server coupling. Each open transaction consumes dedicated database resources, and is not scalable for too many clients. There are also “WITH HOLD” cursors which can exist outside of a transaction, but they must materialize data. Either way this makes cursor pagination appropriate only for small scale situations like intranet use.
Bridging HTTP to cursors introduces complications. Servers must identify clients across requests, either through a token or by keeping an identifier such as the client IP address in a session. Servers must also judge when to release transactions due to inactivity. Finally server load balancing becomes complicated, since each client must connect to a dedicated server each time.
When to Use: Cursors A single-server intranet application which must paginate queries with varied and changeable ordering, especially where result consistency matters.
Pagination of Ordered Queries
Keyset Pagination
The techniques above can paginate any kind of query, including queries without order clauses. If we are willing to forgo this generality we reap optimizations. In particular when ordering by indexed column(s) the client can use values in the current page to choose which items to show in the next page. This is called keyset pagination.
For example let’s return to the medley example:
-- Add an index for keyset pagination (btrees support inequality)
CREATE INDEX n_idx ON medley USING btree (n);
SELECT * FROM medley ORDER BY n ASC LIMIT 5;
With my randomized data it returns
 n |                         description
---+-------------------------------------------------------------
 1 | 74f70e009396
 2 | 8dac5a085eb670a29058d
 3 | fce303a32e89181bf5df1601487
 4 | fddcced2c12e83516b3bd6cc94f23a012dfd
 5 | f51ae548dd27f51147e53e839eeceb6b0c92922145276d668e73d4a6621
(5 rows)
Now the client can look at the maximal n in this result and use it for requesting the next page:
SELECT * 
FROM medley
WHERE n > 5
ORDER BY n ASC
LIMIT 5;
Even filtering by n > 5000000 remains fast, unlike the limit-offset example.
                                                           QUERY PLAN
--------------------------------------------------------------------------------------------------------------------------------
 Limit  (cost=0.43..0.62 rows=5 width=38) (actual time=0.101..0.103 rows=5 loops=1)
   ->  Index Scan using n_idx on medley  (cost=0.43..185579.42 rows=5013485 width=38) (actual time=0.100..0.102 rows=5 loops=1)
         Index Cond: (n > 5000000)
 Planning time: 0.071 ms
 Execution time: 0.119 ms
(5 rows)
Keyset pagination is fast, and it is consistent too. Any insertions/deletions before the current page will leave the results unaffected. The two downsides to this method are lack of random access and possible coupling between client and server.
In general there is no way to jump directly to a given page without visiting prior pages to observe their maximal elements. Under certain conditions we can do better though. If values in the indexed column are uniformly distributed (or even better, contiguous numbers without gaps) the client can do some math to find the desired page because the index makes it cheap to find the largest value:
EXPLAIN ANALYZE SELECT max(n) FROM medley;
                                                 QUERY PLAN
------------------------------------------------------------------------------------------------------------
 Result  (cost=0.46..0.47 rows=1 width=0) (actual time=0.021..0.021 rows=1 loops=1)
   InitPlan 1 (returns $0)
     ->  Limit  (cost=0.43..0.46 rows=1 width=4) (actual time=0.018..0.018 rows=1 loops=1)
           ->  Index Only Scan Backward using n_idx on medley  (cost=0.43..284688.43 rows=10000000 width=4) (actual time=0.017..0.017 rows=1 loops=1)
                 Index Cond: (n IS NOT NULL)
                 Heap Fetches: 0
 Planning time: 0.087 ms
 Execution time: 0.042 ms
(8 rows)
The other issue of keyset pagination, client/server coupling, requires care. First the client doesn’t know which columns are indexed. The server will likely need to provide an endpoint with fixed order rather than allowing the client to customize the ordering. Given the client code may not know which column is being ordered, the server must provide a hint for how to request the next page. RFC5988 defines HTTP link relations previous and next to encode links for the client to follow.
Since users typically access pages of information in a linear fashion, keyset pagination is usually considered the best choice for paginating ordered records in high-traffic web servers.
When to Use: Keyset Scalable applications serving data sequentially from column(s) indexed for comparisons. Supports filtering.
Exotic, Specialized Pagination
Clustered TID Scan
We can devise nonstandard pagination techniques for special situations using low level PostgreSQL features. For instance we can implement truly random-access access on data if we
| 1. Don’t require all pages to have exactly the same length
| 2. Support only one order for paginated rows
The trick is to choose returned pages which correspond directly with database pages on disk or to sections of those disk pages. Every table in a PostgreSQL database contains a secret column called ctid which identifies its row:
SELECT ctid, * FROM medley WHERE n <= 10;
  ctid  | n  |                         description
--------+----+-------------------------------------------------------------
 (0,1)  |  1 | 74f70e009396
 (0,2)  |  2 | 8dac5a085eb670a29058d
 (0,3)  |  3 | fce303a32e89181bf5df1601487
 (0,4)  |  4 | fddcced2c12e83516b3bd6cc94f23a012dfd
 (0,5)  |  5 | f51ae548dd27f51147e53e839eeceb6b0c92922145276d668e73d4a6621
 (0,6)  |  6 | eb9fe1dfe1e421903f96b3b5c5dfe1ee1253582d728c35b4ee7330b
 (0,7)  |  7 | e95202d7f5c612f8523ae705d
 (0,8)  |  8 | 6573b64aff262a2b940326
 (0,9)  |  9 | a0a43
 (0,10) | 10 | 82cdc134bd249a612cfddd3088dd09e32de5f4fa33
(10 rows)
Each ctid is of the form (page,row). PostgreSQL can retrieve rows very quickly by ctid, in fact this is how indices work internally – they map column values to ctids.
Note that although PostgreSQL defines an order relation on the tid type, it cannot efficiently retrieve ctids by inequality
EXPLAIN ANALYZE SELECT count(1) FROM medley WHERE ctid >= '(0,1)'::tid AND ctid < '(1,0)'::tid;
                                                      QUERY PLAN
----------------------------------------------------------------------------------------------------------------------
 Aggregate  (cost=235589.00..235589.01 rows=1 width=0) (actual time=1241.851..1241.852 rows=1 loops=1)
   ->  Seq Scan on medley  (cost=0.00..235464.00 rows=50000 width=0) (actual time=477.933..1241.802 rows=116 loops=1)
         Filter: ((ctid >= '(0,1)'::tid) AND (ctid < '(1,0)'::tid))
         Rows Removed by Filter: 9999884
 Planning time: 0.047 ms
 Execution time: 1241.889 ms
(6 rows)
Requesting ranges doesn’t work but there is still a way to efficiently request all rows in a disk page. Every page contains currentsetting(‘blocksize’) bytes of data (often 8k). Rows are referenced by a 32-bit pointer so there are at most block_size/4 rows per page. (In fact rows are typically wider than the minimum size and a quarter of the block size provides an upper bound of rows per page.) The following sequence will generate all possible ctids in the jth page
SELECT ('(' || j || ',' || s.i || ')')::tid
 FROM generate_series(0,current_setting('block_size')::int/4) AS s(i);
Let’s use it to get all rows in medley on page zero.
SELECT * FROM medley WHERE ctid = ANY (ARRAY
  (SELECT ('(0,' || s.i || ')')::tid
    FROM generate_series(0,current_setting('block_size')::int/4) AS s(i)
  )
);
The planner identified this query as having cost=25.03..65.12 and it runs in 2.765ms. Requesting page 10,000 has similar cost. So we’re getting true random access, what’s not to love?
There are three downsides
| 1. When rows are deleted they leave holes in a page.
| 2. The order of the rows may not be meaningful. The database inserts new rows into holes left from deleted rows, which will cause the rows to be out of order.
| 3. “Where” clauses are not supported.
In certain situations this is not a problem. One case is data whose natural order corresponds to insertion order such as append-only time-series data. Another is data that doesn’t change often. This is because we have control over the placement of rows within pages through the CLUSTER command.
Let’s go back to our medley example. Its rows on disk are ordered by the n column ascending because that is the order in which we inserted them. What if we want to sort by the description column? The answer is to physically reorder the table by index the description column and clustering.
CREATE INDEX description_idx ON medley USING btree (description);
CLUSTER medley USING description_idx;
Now selecting all rows in the first page comes back alphabetized by description. If the table changes then new rows will be appended out of alphabetical order, but as long as the table doesn’t change the returned items will fine. It can also be periodically re-clustered after changes although this operation locks the table and cannot be done when people need to access it.
Finally it’s possible to determine the total number of pages for the table using its total byte size.
SELECT pg_relation_size('medley') / current_setting('block_size')::int;
When to Use: TID Scan
When fast deep random page access is required and filtering is not needed. Works especially well with append-only time-series data having low-variance row width.
Keyset with Estimated Bookmarks
As we saw, plain keyset pagination offers no facility to jump a certain percentage into the results except through client guesswork. However the PostgreSQL statistics collector maintains per-column histograms of value distribution. We can use these estimates in conjunction with limits and small offsets to get fast random-access pagination through a hybrid approach.
First let’s look at the statistics of our medley:
SELECT array_length(histogram_bounds, 1) - 1
  FROM pg_stats
 WHERE tablename = 'medley'
   AND attname = 'n';
In my database the column n has 101 bound-markers, i.e. 100 ranges between bound-markers. The particular values aren’t too surprising because my data is uniformly distributed
{719,103188,193973,288794, … ,9690475,9791775,9905770,9999847}
Notice that the values are approximate. The first number is not exactly zero, and the last is not exactly ten million. The ranges divide our information into a block size B = 10,000,000 / 100 = 100,000 rows.
We can use the histogram ranges from the PostgreSQL stats collector to obtain probabilistically correct pages. If we choose a client-side page width of W how do we request the ith page? It will reside in block iW / B, at offset iW % B.
Choosing W=20 let’s request page 270,000 from the medley table. Note that PostgreSQL arrays are one-based so we have to adjust the values in the array lookups:
WITH bookmark AS (
    SELECT (histogram_bounds::text::int[])[((270000 * 20) / 100000)+1] AS start,
           (histogram_bounds::text::int[])[((270000 * 20) / 100000)+2] AS stop
    FROM pg_stats
    WHERE tablename = 'medley'
    AND attname = 'n'
    LIMIT 1
  )
SELECT *
FROM medley
WHERE n >= (select start from bookmark)
AND n < (select stop from bookmark)
ORDER BY n ASC
LIMIT 20
OFFSET ((270000 * 20) % 100000);
This performs blazingly fast (notice the offset happens to be zero here). It gives back rows with n = 5407259 through 5407278. The true values on page 270000 are n = 5400001 through 5400020. The values is off by 7239, or about 0.1%.
We were lucky in our page choice there. For contrast, page 74999 requires an offset of 99980. We do know that our offset will be at most 100,000. The upper bound is within our control if we care to make a tradeoff. By adjusting the PostgreSQL stats collector we can get a more precise column histogram
ALTER TABLE medley ALTER COLUMN n SET statistics 1000;
VACUUM ANALYZE;
Now there are 1000 rather than 100 histogram buckets. On my database they have values
{10,10230,20863, …, 9980444,9989948,9999995}
With this bucket size our offset will be at most 10,000. The tradeoff is that the query planner now has to look through more values, slowing it down. So it’s a tradeoff of potential offset inefficiency vs query planner overhead.
This hybrid keyset/offset method probably doesn’t correspond to many real pagination use cases. It will not work with where clauses. It’s inaccurate and gets more so when the table changes and the stats collector hasn’t recently run.
When to Use: Keyset with Bookmarks When the client would like deep but approximate random access with no extra filtering allowed.
Conclusion
Like many engineering decisions, choosing pagination techniques involves tradeoffs. It’s safe to say that keyset pagination is most applicable for the average site with ordered linear access. However even limit-offset has its strengths, and more exotic techniques provide special performance characteristics for certain kinds of data. You can see there quite a few possibilities. Pick the right tool for the job and don’t let pagination be a closed book.
```

### 1.1.1 Limit offset test

```text
-- Create table with random strings of various lengths
CREATE TABLE medley AS
  SELECT
    generate_series(1,10000000) AS n,
    substr(concat(md5(random()::text), md5(random()::text)), 1, (random() * 64)::integer + 1) AS description;

-- Notify query planner of drastically changed table size
VACUUM ANALYZE;

-- Low offsets are refreshingly fast
EXPLAIN ANALYZE SELECT * FROM medley LIMIT 100;

my test:
CREATE TABLE limoffdemo AS
  SELECT
    generate_series(1,10000000) AS n,
    substr(concat(md5(random()::text), md5(random()::text)), 1, (random() * 64)::integer + 1) AS description;


VACUUM ANALYZE;

EXPLAIN ANALYZE SELECT * FROM limoffdemo LIMIT 100;
<user>=# EXPLAIN ANALYZE SELECT * FROM limoffdemo LIMIT 100;
                                                       QUERY PLAN                                                        
-------------------------------------------------------------------------------------------------------------------------
 Limit  (cost=0.00..1.85 rows=100 width=38) (actual time=0.021..0.040 rows=100 loops=1)
   ->  Seq Scan on limoffdemo  (cost=0.00..185472.66 rows=10000966 width=38) (actual time=0.016..0.024 rows=100 loops=1)
 Planning Time: 1.188 ms
 Execution Time: 0.061 ms
(4 rows)

SELECT * FROM limoffdemo LIMIT 100;
n  |                           description                            
-----+------------------------------------------------------------------
   1 | 1d
   2 | 4ff90c29bd14eba8e1794878f2fc9240ade337e4d8433e3267d
   ...

EXPLAIN ANALYZE SELECT * FROM limoffdemo LIMIT 100 OFFSET 1000;
<user>=# EXPLAIN ANALYZE SELECT * FROM limoffdemo LIMIT 100 OFFSET 1000;
                                                        QUERY PLAN                                                        
--------------------------------------------------------------------------------------------------------------------------
 Limit  (cost=18.55..20.40 rows=100 width=38) (actual time=0.269..0.295 rows=100 loops=1)
   ->  Seq Scan on limoffdemo  (cost=0.00..185472.66 rows=10000966 width=38) (actual time=0.007..0.212 rows=1100 loops=1)
 Planning Time: 0.035 ms
 Execution Time: 0.311 ms
(4 rows)


EXPLAIN ANALYZE SELECT * FROM limoffdemo LIMIT 100 OFFSET 5000000;
<user>=# EXPLAIN ANALYZE SELECT * FROM limoffdemo LIMIT 100 OFFSET 5000000;
                                                          QUERY PLAN                                                           
-------------------------------------------------------------------------------------------------------------------------------
 Limit  (cost=92727.37..92729.23 rows=100 width=38) (actual time=1055.353..1055.388 rows=100 loops=1)
   ->  Seq Scan on limoffdemo  (cost=0.00..185472.66 rows=10000966 width=38) (actual time=0.007..657.224 rows=5000100 loops=1)
 Planning Time: 0.032 ms
 Execution Time: 1055.408 ms
(4 rows)

performance degradation as function of offset:
offset 0. Execution time: 0.061 ms
offset 1000. Execution time: 0.311 ms
offset 5000000. Execution time: 1055.408 ms

cleanup:
DROP TABLE limoffdemo;
```

### 1.1.2 cursors demo

```text
-- We must be in a transaction
BEGIN;
-- Open a cursor for a query
DECLARE limoffdemo_cur CURSOR FOR SELECT * FROM limoffdemo;
-- Retrieve ten rows
FETCH 10 FROM limoffdemo_cur;
-- ...
-- Retrieve ten more from where we left off
FETCH 10 FROM limoffdemo_cur;
-- All done
COMMIT;
```

### 1.1.3 keyset pagination

#### 1.1.3.1 keyset pagination demo

```text
-- Add an index for keyset pagination (btrees support inequality)
CREATE INDEX n_idx ON limoffdemo USING btree (n);

-- ask for first 5
SELECT * FROM limoffdemo ORDER BY n ASC LIMIT 5;

-- ask for next 
SELECT * FROM limoffdemo WHERE n > 5 ORDER BY n ASC LIMIT 5;

ex:
<user>=# SELECT * FROM limoffdemo ORDER BY n ASC LIMIT 5;
 n |               description               
---+-----------------------------------------
 1 | 47cea231817dae4e9f4b92ca7c86878e102596d
 2 | e46e19967e918216e71f9
 3 | 4c45cb1d80d2b865934b1
 4 | 39a7597bb0253ebaaf4b64e244a5da14dd1
 5 | afc2f6cf838588e24514663377144
(5 rows)

<user>=# SELECT * FROM limoffdemo WHERE n > 5 ORDER BY n ASC LIMIT 5;
 n  |                      description                       
----+--------------------------------------------------------
  6 | 25d0153a0ed32aa5624d77cc627cb7fe053803bac4c3ebd303de
  7 | 12b106f23962e37c7065437a3d6
  8 | 721f32f0adfcb5457e
  9 | e301059327374
 10 | b3560a35070bb6a096936625e454a5115d52f0400661ec27b67db4
(5 rows)

<user>=# SELECT * FROM limoffdemo WHERE n > 10 ORDER BY n ASC LIMIT 5;
 n  |                   description                    
----+--------------------------------------------------
 11 | 93e076f2285b6edac6a4985172657686b0333
 12 | 620
 13 | f6b197b710f9b8abfd796df7188f22e8d99fe4fd4d8ad7ad
 14 | 8e231ec45bdc3622bdc41315b1927bb13
 15 | 84c292e686eb34478cbad07a12d2de76f
(5 rows)

<user>=# SELECT * FROM limoffdemo ORDER BY n ASC LIMIT 15;
 n  |                      description                       
----+--------------------------------------------------------
  1 | 47cea231817dae4e9f4b92ca7c86878e102596d
  2 | e46e19967e918216e71f9
  3 | 4c45cb1d80d2b865934b1
  4 | 39a7597bb0253ebaaf4b64e244a5da14dd1
  5 | afc2f6cf838588e24514663377144
  6 | 25d0153a0ed32aa5624d77cc627cb7fe053803bac4c3ebd303de
  7 | 12b106f23962e37c7065437a3d6
  8 | 721f32f0adfcb5457e
  9 | e301059327374
 10 | b3560a35070bb6a096936625e454a5115d52f0400661ec27b67db4
 11 | 93e076f2285b6edac6a4985172657686b0333
 12 | 620
 13 | f6b197b710f9b8abfd796df7188f22e8d99fe4fd4d8ad7ad
 14 | 8e231ec45bdc3622bdc41315b1927bb13
 15 | 84c292e686eb34478cbad07a12d2de76f

large offset still efficient:
<user>=# EXPLAIN ANALYZE SELECT * FROM limoffdemo WHERE n > 5000000 ORDER BY n ASC LIMIT 5;
                                                             QUERY PLAN                                                             
------------------------------------------------------------------------------------------------------------------------------------
 Limit  (cost=0.43..0.62 rows=5 width=38) (actual time=0.070..0.072 rows=5 loops=1)
   ->  Index Scan using n_idx on limoffdemo  (cost=0.43..186551.71 rows=5039730 width=38) (actual time=0.070..0.071 rows=5 loops=1)
         Index Cond: (n > 5000000)
 Planning Time: 0.060 ms
 Execution Time: 0.084 ms

find max
EXPLAIN ANALYZE SELECT max(n) FROM limoffdemo;
```

### 1.1.4 keyset pagination

```text
        https://use-the-index-luke.com/no-offset
```

#### 1.1.4.1 article

```text
Did you know pagination with offset is very troublesome but easy to avoid?

offset instructs the databases skip the first N results of a query. However, the database must still fetch these rows from the disk and bring them in order before it can send the following ones.

This is not an implementation problem, it's the way offset is designed:

…the rows are first sorted according to the <order by clause> and then limited by dropping the number of rows specified in the <result offset clause> from the beginning…

SQL:2016, Part 2, §4.15.3 Derived tables

There crucial point here is that offset takes only one single parameter: the number of rows to be dropped. No more context. The only thing the database can do with this number is fetching and dropping that many rows. In other words, big offsets impose a lot of work on the database—no matter whether SQL or NoSQL.

But the trouble with offset doesn't stop here: think about what happens if a new row is inserted between fetching two pages?


When using offset➌ to skip the previously fetched entries❶, you'll get duplicates in case there were new rows inserted between fetching two pages➋. There are other anomalies possible too, this is just the most common one.

This is not even a database problem, it is the way frameworks implement pagination: they just say which page number to fetch or how many rows to skip. With this information alone, no database can do any better.

Also note that the offset problem comes in may different syntaxes:

The offset keyword
The 2-parameter limit [offset,] limit (the 1 parameter limit is fine)
Lower-bound filtering based on row numbering (e.g. row_number(), rownum, …).
The root problem all these methods have in common is that they just provide a number of rows to be dropped—no more context. In this article, I'm using offset to refer to any of these methods.

Life Without OFFSET
Now imagine a world without these problems. As it turns out, living without offset is quite simple: just use a where clause that selects only data you haven't seen yet.

For that, we exploit the fact that we work on an ordered set—you do have an order by clause, ain't you? Once there is a definite sort order, we can use a simple filter to only select what follows the entry we have see last:

SELECT ...
  FROM ...
 WHERE ...
   AND id < ?last_seen_id
 ORDER BY id DESC
 FETCH FIRST 10 ROWS ONLY
This is the basic recipe. It gets more interesting when sorting on multiple columns, but the idea is the same. This recipe is also applicable to many NoSQL systems.

This approach—called seek method or keyset pagination—solves the problem of drifting results as illustrated above and is even faster than offset. If you'd like to know what happens inside the database when using offset or keyset pagination, have a look at these slides (benchmarks, benchmarks!):


On slide 43 you can also see that keyset pagination has some limitations: most notably that you cannot directly navigate to arbitrary pages. However, this is not a problem when using infinite scrolling. Showing page number to click on is a poor navigation interface anyway—IMHO.

If you want to read more about how to properly implement keyset pagination in SQL, please read this article. Even if you are not involved with SQL, it's worth reading that article before starting to implement anything.

But the Frameworks…
The main reason to prefer offset over keyset pagination is the lack of tool support. Most tools offer pagination based on offset, but don't offer any convenient way to use keyset pagination.

Please note that keyset pagination affects the whole technology stack up to the JavaScript running in the browser doing AJAX for infinite scrolling: instead of passing a simple page number to the server, you must pass a full keyset (often multiple columns) down to the server.

The hall of fame of frameworks that do support keyset pagination is constantly growing:

jOOQ — Java Object Oriented Querying. Docs.
Ruby order_query, nexter, and Sequel::SeekPagination
Django (Python): chunkator and Django Infinite Scroll Pagination
SQL Alchemy sqlakeyset.
blaze-persistence — a rich Criteria API for JPA providers
Perl DBIx::Class::Wrapper
Node.js: bookshelf-cursor-pagination
Massive.js, a data mapper for Node.js that goes all in on PostgreSQL: Keyset Documentation
This is where I need your help. If you are maintaining a framework that is somehow involved with pagination, I ask you, I urge you, I beg you, to build in native support for keyset pagination too. If you have any questions about the details, I'm happy to help (forum, contact form, Twitter)!

Even if you are just using software that should support keyset pagination such as a content management system or webshop, let the maintainers know about it. You might just file a feature request (link to this page) or, if possible, supply a patch. Again, I'm happy to help out getting the details right.

Take WordPress as an example.

Spread the Word
The problem with key-set pagination is not a technical one. The problem is just that it is hardly known in the field and has no tool support. If you like the idea of offset-less pagination, please help spreading the word. Tweet it, share it, mail it, you can even re-blog this post (CC-BY-NC-ND). Translations are also welcome, just contact me beforehand—I'll include a link to the translation on this page too!

Oh, and if you are blogging, you could also add a banner on your blog to make your readers aware of it. I've prepared a NoOffset banner gallery with some common banner formats. Just pick what suits you best.
```

#### 1.1.4.2 supporting libraries

#### 1.1.4.2.1 jOOQ — Java Object Oriented Querying. Docs.

```text
                1.1.4.2.2 Massive.js, a data mapper for Node.js that goes all in on PostgreSQL: Keyset Documentation
```

#### 1.1.4.2.2.1 https://blog.jooq.org/2013/11/18/faster-sql-pagination-with-keysets-continued/

```text
                    1.1.4.2.2.2
                1.1.4.2.3
Ruby order_query, nexter, and Sequel::SeekPagination
Django (Python): chunkator and Django Infinite Scroll Pagination
SQL Alchemy sqlakeyset.
blaze-persistence — a rich Criteria API for JPA providers
Perl DBIx::Class::Wrapper
Node.js: bookshelf-cursor-pagination
            1.1.4.3


        1.1.5
```

## 1.2 CLI

```text
clients:
```

### 1.2.1 pgcli

#### 1.2.1.1 install, $ brew install pgcli

#### 1.2.1.2 Usage

```text
$ pgcli --help
Usage: pgcli [OPTIONS] [DBNAME] [USERNAME]

Options:
  -h, --host TEXT         Host address of the postgres database.
  -p, --port INTEGER      Port number at which the postgres instance is
                          listening.
  -U, --username TEXT     Username to connect to the postgres database.
  -u, --user TEXT         Username to connect to the postgres database.
  -W, --password          Force password prompt.
  -w, --no-password       Never prompt for password.
  --single-connection     Do not use a separate connection for completions.
  -v, --version           Version of pgcli.
  -d, --dbname TEXT       database name to connect to.
  --pgclirc PATH          Location of pgclirc file.
  -D, --dsn TEXT          Use DSN configured into the [alias_dsn] section of
                          pgclirc file.
  --list-dsn              list of DSN configured into the [alias_dsn] section
                          of pgclirc file.
  --row-limit INTEGER     Set threshold for row limit prompt. Use 0 to disable
                          prompt.
  --less-chatty           Skip intro on startup and goodbye on exit.
  --prompt TEXT           Prompt format (Default: "\u@\h:\d> ").
  --prompt-dsn TEXT       Prompt format for connections using DSN aliases
                          (Default: "\u@\h:\d> ").
  -l, --list              list available databases, then exit.
  --auto-vertical-output  Automatically switch to vertical output mode if the
                          result is wider than the terminal width.
  --warn / --no-warn      Warn before running a destructive query.
  --help                  Show this message and exit.

id=__ExampleconnectandworkwithcdmstoreDB__
```

#### 1.2.1.3 Example, connect and work with cdm-store DB, tags: Example cdm-store DB

```text
[employer-specific content moved to private KB, 2026-10]
```

#### 1.2.1.4 pgcli configuration

#### 1.2.1.4.1 Switch between vi and emacs key bindings. F4.

```text
Or edit configuration file, ~/.config/pgcli/config
change: vi = False 
to: vi = True 
```

#### 1.2.1.4.2 meta keybindings

```text
Meta-commands (backslash commands)
Pgcli has implemented most of the meta-commands that are supported by psql. These meta-commands start with the backslash character. To see these, type \? at the prompt:

+--------------------------------------+------------------------------------------------+      
| Command                              | Description                                    |      
|--------------------------------------+------------------------------------------------|      
| \#                                   | Refresh auto-completions.                      |      
| \?                                   | Show Commands.                                 |      
| \T [format]                          | Change the table format used to output results |      
| \c[onnect] database_name             | Change to a new database.                      |      
| \conninfo                            | Get connection details                         |      
| \copy [tablename] to/from [filename] | Copy data between a file and a table.          |      
| \d[+] [pattern]                      | List or describe tables, views and sequences.  |      
| \dD[+] [pattern]                     | List or describe domains.                      |      
| \dT[S+] [pattern]                    | List data types                                |      
| \db[+] [pattern]                     | List tablespaces.                              |      
| \df[+] [pattern]                     | List functions.                                |      
| \di[+] [pattern]                     | List indexes.                                  |      
| \dm[+] [pattern]                     | List materialized views.                       |      
| \dn[+] [pattern]                     | List schemas.                                  |      
| \ds[+] [pattern]                     | List sequences.                                |      
| \dt[+] [pattern]                     | List tables.                                   |      
| \du[+] [pattern]                     | List roles.                                    |      
| \dv[+] [pattern]                     | List views.                                    |      
| \dx[+] [pattern]                     | List extensions.                               |      
| \e [file]                            | Edit the query with external editor.           |      
| \h                                   | Show SQL syntax and help.                      |      
| \i filename                          | Execute commands from file.                    |      
| \l[+] [pattern]                      | List databases.                                |      
| \n[+] [name] [param1 param2 ...]     | List or execute named queries.                 |      
| \nd [name]                           | Delete a named query.                          |      
| \ns name query                       | Save a named query.                            |      
| \o [filename]                        | Send all query results to file.                |      
| \pager [command]                     | Set PAGER. Print the query results via PAGER.  |      
| \pset [key] [value]                  | A limited version of traditional \pset         |      
| \q                                   | Quit pgcli.                                    |      
| \refresh                             | Refresh auto-completions.                      |      
| \sf[+] FUNCNAME                      | Show a function's definition.                  |      
| \timing                              | Toggle timing of commands.                     |      
| \x                                   | Toggle expanded output.                        |      
| quit                                 | Quit pgcli.                                    |      
+--------------------------------------+------------------------------------------------+   
```

#### 1.2.1.4.3 named queries

#### 1.2.1.4.3.1 https://www.pgcli.com/named_queries.md

```text
Named Queries
Named Queries are a way to save frequently used queries with a short name.

\n - list all named queries.

\n <name> - Invoke a named query by its name.

\ns <name> <query> - Save a new named query called 'name'.

\nd <name> - Delete an existing named query by its name.

Examples:

    # Save a new named query.
    > \ns simple select * from abc where a is not Null;

    # List all named queries.
    > \n
    +--------+---------------------------------------+
    | Name   | Query                                 |
    |--------+---------------------------------------|
    | simple | SELECT * FROM abc where a is not NULL |
    +--------+---------------------------------------+

    # Run a named query.
    > \n simple
    +--------+--------+
    | a      | b      |
    |--------+--------|
    | 日本語 | 日本語   |
    +--------+--------+

    # Delete a named query.
    > \nd simple
    simple: Deleted
Positional Parameters
Named queries support shell-style parameter substitution. Save your named query with parameters as placeholders (e.g. $1, $2, $3, etc.):

\ns user_by_name select * from users where name = '$1'
When you call a named query with parameters, just add the parameters after the query's name. You can put quotes around arguments that include spaces.

\n user_by_name "Skelly McDermott"
Parameters Aggregation
Named queries also support parameters aggregation via two placeholders. $* for raw aggregation and $@ for string aggregation. The former will use raw values of aggregated parameters, the later will quote each aggregated value.

Raw Aggregation
\ns users_by_age select * from users where id in ($*)
When you call a named query with parameters, just add any (at least one) parameters after the query's name.

\n users_by_age 42 1337
String Aggregation
\ns users_by_categories select * from users where category in ($@)
When you call a named query with parameters, just add any (at least one) parameters after the query's name. You can put quotes around arguments that include spaces.

\n users_by_categories "home user" "mobile user" superuser
Combining Positional Parameters and Parameters Aggregation
It is possible to combine both positional parameters and parameters aggregation. The positional parameters substitution takes place before the aggregation. Which means positional parameters can be placed after parameters aggregation in the query ; see example bellow. Please note that the positional parameters will not be part of the aggregation taking place afterwards!

\ns users_by_categories_and_age select * from users where name in ($@) and age = $1
\n users_by_categories_and_age 42 "Skelly McDermott" "François Pignon"
The query after substitution would be:

select * from users where name in ('Skelly McDermott', 'François Pignon') and age = 42
```

#### 1.2.1.4.3.2 my examples

```text
DuLNcQfxgqIo> \ns cdm_entities_of_tenant select * from cdm."CDM_ENTITIES" where "tenantId" = '$1'
Saved.
Time: 0.004s
DuLNcQfxgqIo> \n cdm_entities_of_tenant 02f588210b38c2cca281cabcd2adeb19
DuLNcQfxgqIo> \ns count_cdm_entities_of_tenant select count (*)  from cdm."CDM_ENTITIES" where "tenantId" = '$1'
Saved.
Time: 0.004s
DuLNcQfxgqIo> \n count_cdm_entities_of_tenant 02f588210b38c2cca281cabcd2adeb19
> select count (*)  from cdm."CDM_ENTITIES" where "tenantId" = '$1'
+---------+
| count   |
|---------|
| 129970  |
+---------+
SELECT 1
Time: 0.092s

                    1.2.1.4.3.3
                1.2.1.4.4
            1.2.1.5
```

### 1.2.2 psql

#### 1.2.2.1 common commands

#### 1.2.2.1.1 list DBs

```text
        \l
```

#### 1.2.2.1.2 list tables

#### 1.2.2.1.2.1 \dt

#### 1.2.2.1.2.2 Chatgpt:

#### 1.2.2.1.2.2.1 list all tables in PG db

```text
To list all tables in a PostgreSQL database, you can use the following SQL query:

SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE';
This query will return a list of all table names in the "public" schema of the database. If your tables are in a different schema, replace "public" with the appropriate schema name.
```

#### 1.2.2.1.2.2.2 pgcli connect to remote pg db

```text
To connect to a remote PostgreSQL database using pgcli, you can use the following command:

pgcli postgres://username:password@hostname:port/databasename
Replace "username" with your PostgreSQL username, "password" with your PostgreSQL password, "hostname" with the IP address or hostname of the remote server, "port" with the PostgreSQL port number (default is 5432), and "databasename" with the name of the PostgreSQL database you want to connect to.

For example, if your PostgreSQL username is "myuser", your password is "mypassword", the IP address of the remote server is "123.45.67.89", the port number is 5432, and the database name is "mydb", the command would be:

pgcli postgres://myuser:mypassword@123.45.67.89:5432/mydb
After running this command, you will be prompted to enter your password. Once you have entered your password, you should be connected to the remote PostgreSQL database using pgcli.
```

#### 1.2.2.1.2.2.3 pg list schemas

```text
To list all the schemas in a PostgreSQL database, you can use the following SQL query:

SELECT schema_name FROM information_schema.schemata;
This query will return a list of all the schema names in the current database.

You can execute this query using any PostgreSQL client or tool, such as pgAdmin or psql, by connecting to the database and running the query. For example, if you're using psql, you can connect to the database and run the query like this:

psql -h hostname -d dbname -U username -c "SELECT schema_name FROM information_schema.schemata;"
Replace "hostname", "dbname", and "username" with the appropriate values for your PostgreSQL setup. You'll be prompted to enter your PostgreSQL password, and then you should see a list of all the schema names in the database.
```

#### 1.2.2.1.2.2.4 pg_repack

```text
pg_repack is a PostgreSQL extension that provides a way to perform online table reorganizations and other maintenance operations with minimal disruption to the availability of the table. It is designed to work with large databases and can be used to vacuum tables in addition to other maintenance operations.

To use pg_repack to vacuum a table, you can follow these steps:

Install the pg_repack extension if it is not already installed. You can do this by running the following command:

CREATE EXTENSION pg_repack;
Connect to the database using a PostgreSQL client or tool, such as psql.

Run the following command to vacuum the table:

SELECT pg_repack('public.mytable', 'verbose');
Replace "public.mytable" with the name of the schema and table that you want to vacuum.

The second argument, "verbose", is optional and will provide more detailed output during the vacuum operation.

Wait for the pg_repack operation to complete. This may take some time depending on the size of the table.

Check the status of the vacuum operation by running the following command:

SELECT * FROM pg_stat_activity WHERE query LIKE 'SELECT pg_repack%';
This will show you the progress of the pg_repack operation, as well as any other information about the process.

Note that pg_repack is a powerful tool that can be used for other maintenance operations as well, such as table compression and index optimization. Be sure to read the documentation carefully and test any changes in a non-production environment before applying them to a production database.

                        1.2.2.1.2.2.5
```

#### 1.2.2.1.3 switch DB

```text
\c dbname
```

#### 1.2.2.1.4 describe table

```text
\d tablename
\dt tablename
ex:
AjjAxgyOruVg> \d cdm."CDM_ENTITIES"
+-------------------+--------+-----------+
| Column            | Type   | Modifiers |
|-------------------+--------+-----------|
| createdOn         | bigint |  not null |
| createdBy         | text   |  not null |
| updatedOn         | bigint |  not null |
| updatedBy         | text   |  not null |
| entityId          | text   |  not null |
| entityType        | text   |  not null |
| entityTitle       | text   |           |
| entityDescription | text   |           |
| tenantId          | text   |  not null |
| instanceId        | text   |  not null |
| identityZoneId    | text   |  not null |
| contextType       | text   |  not null |
| id                | text   |  not null |
| cdm               | jsonb  |  not null |
| entityMD5         | text   |           |
+-------------------+--------+-----------+
Indexes:
    "CDM_ENTITIES_pkey" PRIMARY KEY, btree ("entityType", "entityId", id, "contextType", "tenantId")
    "md5_unique" UNIQUE CONSTRAINT, btree ("entityMD5")
    "cdm_entities_entity_md5_index" btree ("entityMD5")
    "cdm_entities_entity_type_index" btree ("entityType")
    "cdm_entities_table_tenant_context_id_type_index" btree ("tenantId", id, "contextType")
    "cdm_entities_tenant_id_index" btree ("tenantId")
Referenced by:
    TABLE "cdm.entities_searchable_text" CONSTRAINT "entities_searchable_text_entity_md5_fkey" FOREIGN KEY (entity_md5) REFERENCES cdm."CDM_ENTITIES"("entityMD5") ON UPDATE CASCADE ON DELETE CASCADE

Time: 1.123s (1 second), executed in: 1.118s (1 second)
AjjAxgyOruVg> \dt cdm."CDM_ENTITIES"
+--------+--------------+-------+-------+
| Schema | Name         | Type  | Owner |
|--------+--------------+-------+-------|
| cdm    | CDM_ENTITIES | table | dbo   |
+--------+--------------+-------+-------+
```

#### 1.2.2.1.5 history

```text
\g
```

#### 1.2.2.1.6 list commands

```text
    \?
```

#### 1.2.2.1.7 help on commands

```text
            <user>-# \h command
            ex:
            <user>-# \h DROP
```

#### 1.2.2.1.8 measure command runtime

```text
\timing
(run command)
```

### 1.2.9 edit commands in vim

```text
\e

        1.2.10
            1.2.2.2
```

### 1.2.3 determine size table, db, indexes etc

#### 1.2.3.1 https://www.a2hosting.com/kb/developer-corner/postgresql/determining-the-size-of-postgresql-databases-and-tables

```text
You can use the psql command-line program to determine the sizes of PostgreSQL databases and tables. To do this, follow these steps:

Log in to your account using SSH.
At the command line, type the following command. Replace dbname with the name of the database, and username with the database username:
sql dbname username
At the Password prompt, type the database user's password. When you type the correct password, the psql prompt appears.
To determine the size of a database, type the following command. Replace dbname with the name of the database that you want to check:

SELECT pg_size_pretty( pg_database_size('dbname') );
Psql displays the size of the database.

To determine the size of a table in the current database, type the following command. Replace tablename with the name of the table that you want to check:

SELECT pg_size_pretty( pg_total_relation_size('tablename') );
SELECT pg_size_pretty( pg_total_relation_size('CARDS') );

        - From blogs 
        https://www.postgresql.org/docs/9.5/textsearch-intro.html
https://www.postgresqltutorial.com/postgresql-administration/postgresql-database-indexes-table-size/

- get table size 
 SELECT pg_size_pretty( pg_total_relation_size(cdm."CDM_ENTITIES") ) FROM cdm."CDM_ENTITIES";

 or with pg_admin:
set schema 'cdm'
SELECT pg_size_pretty(pg_total_relation_size('"CDM_ENTITIES"')) AS table_size;

- get DB size 
#list databases
DuLNcQfxgqIo> \l
+--------------+--------------+----------+-------------+-------------+-------------------------------+
| Name         | Owner        | Encoding | Collate     | Ctype       | Access privileges             |
|--------------+--------------+----------+-------------+-------------+-------------------------------|
| DuLNcQfxgqIo | lbsSHTeBEQeo | UTF8     | en_US.UTF-8 | en_US.UTF-8 | =Tc/lbsSHTeBEQeo              |
|              |              |          |             |             | lbsSHTeBEQeo=CTc/lbsSHTeBEQeo |
|              |              |          |             |             | dbo=C*T*c*/lbsSHTeBEQeo       |
| postgres     | lbsSHTeBEQeo | UTF8     | en_US.UTF-8 | en_US.UTF-8 | <null>                        |
| rdsadmin     | rdsadmin     | UTF8     | en_US.UTF-8 | en_US.UTF-8 | rdsadmin=CTc/rdsadmin         |
| template0    | rdsadmin     | UTF8     | en_US.UTF-8 | en_US.UTF-8 | =c/rdsadmin                   |
|              |              |          |             |             | rdsadmin=CTc/rdsadmin         |
| template1    | lbsSHTeBEQeo | UTF8     | en_US.UTF-8 | en_US.UTF-8 | lbsSHTeBEQeo=CTc/lbsSHTeBEQeo |
|              |              |          |             |             | =c/lbsSHTeBEQeo               |
+--------------+--------------+----------+-------------+-------------+-------------------------------+
DuLNcQfxgqIo> SELECT pg_size_pretty( pg_database_size('postgres') );
+----------------+
| pg_size_pretty |
|----------------|
| 9569 kB        |
+----------------+

#real DB:
DuLNcQfxgqIo> SELECT pg_size_pretty( pg_database_size('DuLNcQfxgqIo') );
+----------------+
| pg_size_pretty |
|----------------|
| 28 GB          |
+----------------+

- get indexes size 
DuLNcQfxgqIo> SELECT pg_size_pretty( pg_indexes_size(cdm."CDM_ENTITIES") );
```

#### 1.2.3.2 examples from cdm-store

#### 1.2.3.2.1 get table size

```text
DuLNcQfxgqIo> SELECT pg_size_pretty( pg_total_relation_size('"CDM_ENTITIES"') );
+----------------+
| pg_size_pretty |
|----------------|
| 5789 MB        |
+----------------+
SELECT 1
Time: 0.076s
DuLNcQfxgqIo> SELECT pg_size_pretty( pg_total_relation_size('cdm."CDM_ENTITIES"') );
+----------------+
| pg_size_pretty |
|----------------|
| 5789 MB        |
+----------------+
SELECT 1
Time: 0.083s
```

#### 1.2.3.2.2 list top 10 sized tables

```text
DuLNcQfxgqIo> select schemaname as table_schema,
     relname as table_name,
     pg_size_pretty(pg_total_relation_size(relid)) as total_size,
     pg_size_pretty(pg_relation_size(relid)) as data_size,
     pg_size_pretty(pg_total_relation_size(relid) - pg_relation_size(relid))
       as external_size
 from pg_catalog.pg_statio_user_tables
 order by pg_total_relation_size(relid) desc,
          pg_relation_size(relid) desc
 limit 10;
+------------------------------+--------------------------+------------+-----------+---------------+
| table_schema                 | table_name               | total_size | data_size | external_size |
|------------------------------+--------------------------+------------+-----------+---------------|
| cdm                          | RELATIONS                | 21 GB      | 5534 MB   | 16 GB         |
| cdm                          | CDM_ENTITIES             | 5789 MB    | 836 MB    | 4953 MB       |
| cdm                          | entities_searchable_text | 763 MB     | 240 MB    | 524 MB        |
| cdm                          | pre_commit_relations     | 620 MB     | 0 bytes   | 620 MB        |
| report                       | reports                  | 120 MB     | 90 MB     | 30 MB         |
| cdm                          | pre_commit_cdm_entities  | 118 MB     | 0 bytes   | 118 MB        |
| pgboss                       | job                      | 94 MB      | 624 kB    | 93 MB         |
| public                       | CARD_TRANSLATIONS        | 32 MB      | 5064 kB   | 27 MB         |
| portal.cf::ActivationService | SITES_STATES             | 28 MB      | 15 MB     | 13 MB         |
| pgboss                       | archive                  | 10 MB      | 1144 kB   | 9360 kB       |
+------------------------------+--------------------------+------------+-----------+---------------+
SELECT 10
Time: 0.092s
```

#### 1.2.3.2.3 get indexes size

```text
DuLNcQfxgqIo> SELECT pg_size_pretty( pg_indexes_size('cdm."CDM_ENTITIES"') );
+----------------+
| pg_size_pretty |
|----------------|
| 676 MB         |
+----------------+
SELECT 1
Time: 0.077s
DuLNcQfxgqIo> SELECT pg_size_pretty( pg_indexes_size('cdm."RELATIONS') );
invalid name syntax
LINE 1: SELECT pg_size_pretty( pg_indexes_size('cdm."RELATIONS') )
                                               ^

Time: 0.075s
DuLNcQfxgqIo> SELECT pg_size_pretty( pg_indexes_size('cdm."RELATIONS"') );
+----------------+
| pg_size_pretty |
|----------------|
| 16 GB          |
+----------------+
SELECT 1
Time: 0.077s
```

#### 1.2.3.2.4 search for provider contention

```text
select * from cdm."CDM_ENTITIES" where "identityZoneId" = 'c4e3c145-69b5-4b1f-a534-8c17c0d702b8' and "entityId" like '%sample_pkg1%';

note that contextId is named id, and entity id is entityId
                1.2.3.2.5
            1.2.3.3
        1.2.4
```

## 1.3 text search

```text
        1.3.1  

        1.3.2
```

## 1.4 performance

### 1.4.1 SAP cdm-store DB performance

```text
<internal-url>

        1.4.2
```

## 1.5 local playground, tags: postgres local playground docker pg

### 1.5.1 setup local postgres playground

```text
a. install docker, https://docs.docker.com/desktop/mac/apple-silicon/ 
b. pull PG image and run it 
$ docker pull postgres:9.6
$  docker run --name local-postgres -e POSTGRES_USER=<user> -e POSTGRES_PASSWORD=Abcd1234 -d -p 5432:5432 postgres:9.6
optional,  attach to container
$ docker ps
CONTAINER ID   IMAGE          COMMAND                  CREATED              STATUS              PORTS                    NAMES
9d4c98470620   postgres:9.6   "docker-entrypoint.s…"   About a minute ago   Up About a minute   0.0.0.0:5432->5432/tcp   local-postgres
$ docker exec -it 9d4c98470620 /bin/bash
root@9d4c98470620:/# pgcli
c. run pgcli 
$ pgcli -h localhost -p 5432 -u <user>
Password for <user>: 
Server: PostgreSQL 9.6.24
Version: 3.4.0
Home: http://pgcli.com
<user>@localhost:<user>>

d. create db 
CREATE DATABASE playground;

check its listed 
<user>@localhost:<user>> \l
+------------+---------+----------+------------+------------+---------------------+
| Name       | Owner   | Encoding | Collate    | Ctype      | Access privileges   |
|------------+---------+----------+------------+------------+---------------------|
| <user>    | <user> | UTF8     | en_US.utf8 | en_US.utf8 | <null>              |
| playground | <user> | UTF8     | en_US.utf8 | en_US.utf8 | <null>              |
| postgres   | <user> | UTF8     | en_US.utf8 | en_US.utf8 | <null>              |
| template0  | <user> | UTF8     | en_US.utf8 | en_US.utf8 | =c/<user>          |
|            |         |          |            |            | <user>=CTc/<user> |
| template1  | <user> | UTF8     | en_US.utf8 | en_US.utf8 | =c/<user>          |
|            |         |          |            |            | <user>=CTc/<user> |
+------------+---------+----------+------------+------------+---------------------+

- create src table
<user>@localhost:<user>> create table src( ID INT NOT NULL, Name varchar (30) NOT NULL) 
<user>@localhost:<user>> \dt
+--------+------+-------+---------+
| Schema | Name | Type  | Owner   |
|--------+------+-------+---------|
| public | src  | table | <user> |
+--------+------+-------+---------+
-
```

### 1.5.2 common operations

#### 1.5.2.1 insert into example

```text
<user>@localhost:<user>> insert into src values(1, 'yosi')
INSERT 0 1
Time: 0.015s
<user>@localhost:<user>> select * from src
+----+------+
| id | name |
|----+------|
| 1  | yosi |
+----+------+
SELECT 1
Time: 0.019s
<user>@localhost:<user>> insert into src values(2, 'Dana')
INSERT 0 1
Time: 0.004s
<user>@localhost:<user>> select * from src
+----+------+
| id | name |
|----+------|
| 1  | yosi |
| 2  | Dana |
+----+------+
```

#### 1.5.2.2 comparing two tables

```text
(select * from src except select * from trg) union all (select * from trg except select * from src)
example:
<user>@localhost:<user>> select * from src
+----+------+
| id | name |
|----+------|
| 1  | yosi |
| 2  | Dana |
+----+------+
SELECT 2
Time: 0.010s
<user>@localhost:<user>> select * from trg
+----+------+
| id | name |
|----+------|
| 2  | Dana |
+----+------+
SELECT 1
Time: 0.016s
<user>@localhost:<user>> (select * from src except select * from trg) union all (select * from trg except select * from src)
+----+------+
| id | name |
|----+------|
| 1  | yosi |
+----+------+
SELECT 1
Time: 0.016s
            1.5.2.3
        1.5.3
```

## 1.6 pgadmin

### 1.6.1 install and setup

```text
google pgadmin mac install 
install and launch 
create new server 
run 
$ remCDMStorePGTunnel  6789
┌──────────┬────────────────┐
│ server   │ localhost:6789 │
│ username │ 20397e970aac   │
│ password │ feeb65f51f5c   │
│ dbname   │ DuLNcQfxgqIo   │
└──────────┴────────────────┘
copy paste to server connection settings 
connect 
viola 
        1.6.2
```

## 1.7 Mastering SQL using Postgresql

```text
https://postgresql.itversity.com/mastering-sql-using-postgresql.html#desired-audience
```

## 1.8 PostgreSQL: Advanced SQL Queries and Data Analysis

```text
https://www.udemy.com/course/postgresql-advanced-sql-queries-and-data-analysis/?utm_source=adwords&utm_medium=udemyads&utm_campaign=LongTail_la.EN_cc.ROW&utm_content=deal4584&utm_term=_._ag_77879424134_._ad_535397245863_._kw__._de_c_._dm__._pl__._ti_dsa-1007766171312_._li_1007990_._pd__._&matchtype=&gclid=CjwKCAjwvNaYBhA3EiwACgndgtlgaGYUELdDwIkS1BKKPEQwm0Qzrkr_q2I_NkLIdRF7B8kq_iJPTRoCOhcQAvD_BwE
```

## 1.9 postgres transactions and concurrency, tags: postgres transactions and concurrency

### 1.9.1 https://www.postgresql.org/files/developer/transactions.pdf

#### 1.9.1.1 What is a transaction, anyway?

```text
Definition: a transaction is a group of SQL
commands whose results will be made
visible to the rest of the system as a
unit when the transaction commits --- or not
at all, if the transaction aborts.
Transactions are expected to be atomic, consistent,
isolated, and durable.
• Postgres does not support distributed transactions, so all commands
of a transaction
are executed by one backend.
• We don’t currently handle nested transactions, either
```

#### 1.9.1.2 The ACID test: atomic, consistent, isolated, durable

```text
Atomic: results of a transaction are seen entirely or not at all within other transactions.
(A transaction need not appear atomic to itself.)

Consistent: system-defined consistency constraints are enforced on the results of
transactions. (Not going to discuss constraint checking today.)

Isolated: transactions are not affected by the behavior of concurrently-running transactions.
Stronger variant: serializable. If the final results of a set of concurrent transactions are the same as if we’d run the
transactions serially in some order (not necessarily any predetermined order), then we say the behavior is serializable.

Durable: once a transaction commits, its results will not be lost regardless of subsequent failures.
```

#### 1.9.1.3 But how can thousands of changes be made "atomically"?

```text
• The actual tuple insertions/deletions/updates are all marked
as done by transaction N
as they are being made. Concurrently running backends ignore the changes
because they know transaction N is not committed yet. When the transaction
commits,
all those changes become logically visible at once.
• The control file pg_log contains 2 status bits per
transaction ID, with possible states
in progress, committed,
aborted. Setting those two bits to the
value committed is
the atomic action that marks a transaction committed.
• An aborting transaction will normally set its pg_log status
to aborted. But even if
the process crashes without having
done so, everything is safe. The next time some
backend checks the state of
that transaction, it will observe that the transaction is
marked in
progress but is not running on any backend, deduce that it crashed,
and
update the pg_log entry to aborted on its behalf.
No changes are needed
in any table data file during abort.
```

#### 1.9.1.4 But is it really atomic and durable, even if the system crashes?

```text
Well ... that depends on how much you trust your kernel and hard disk.
• Postgres transactions are only guaranteed atomic if a disk page write is
an atomic
action. On most modern hard drives that’s true if a page is a
physical sector, but most
people run with disk pages configured as 8K or so,
which makes it a little more dubious
whether a page write is all-or-nothing.
• pg_log is safe anyway since we’re only flipping bits in
it, and both bits of a
transaction’s status must be in the same sector.
• But when moving tuples around in a data page, there’s a potential for
data corruption
if a power failure should manage to abort the page write
partway through (perhaps only
some of the component sectors get written).
This is one reason to keep page sizes
small ... and to buy a UPS for your server!
```

#### 1.9.1.5 Working through the Unix kernel costs us something, too

```text
It’s critical that we force a transaction’s data page changes down to disk
before we write
pg_log. If the disk writes occur in the wrong
order, a power failure could leave us with a
transaction that’s
marked committed in pg_log but not all of
whose data changes are
reflected on disk --- thus failing the atomicity test.
• Unix kernels allow us to force the correct write order via fsync(2), but
the performance
penalty of fsync’ing many files is pretty high.
• We’re looking at ways to avoid needing so many fsync()s, but that’s a
different talk.
```

#### 1.9.1.6 User’s view: multi-version concurrency control

```text
A PostgreSQL application sees the following behavior of concurrent
transactions:
• Each transaction sees a snapshot (database version) as of its start
time,
no matter what other transactions are doing while it runs
• Readers do not block writers, writers do not block readers
• Writers only block each other when updating the same row
```

#### 1.9.1.7 Concurrent updates are tricky

```text
Consider this example: transaction A does
UPDATE foo SET x = x + 1 WHERE rowid = 42
and before it commits,
transaction B comes along and wants to do the same thing
on the same row.
• B clearly
must wait to see if A commits or not.
• If A aborts then B can go ahead,
using the pre-existing value of x.
• But if A commits, what then?
• Using
the old value of x will yield a clearly unacceptable
result: x ends up
incremented by 1 not 2 after both transactions commit.
• But if B is allowed to increment the new value
of x, then B is reading data committed
since it began execution. This violates the basic principle of
transaction isolation.
```

#### 1.9.1.8 Read committed vs. serializable transaction level

```text
PostgreSQL offers two answers to the concurrent-update problem
(out of four
transaction isolation levels defined in the ISO SQL standard):
Read committed level: allow B to use new tuple as input
values (after checking
to ensure new tuple still satisfies query’s WHERE clause). Thus, B is
allowed to
see just this tuple of A’s results.
Serializable level: abort B with "not serializable" error.
Client application must redo
the whole transaction B, which will then be allowed
to see the new value of x under
strict serializable-behavior rules.
• Serializable level is logically cleaner but requires more code in
application, so by
default we run in read-committed level which usually produces the desired
behavior.
• In either case a pure SELECT transaction only sees data committed before
it started.
It’s just updates and deletes that are interesting.
```

#### 1.9.1.9 How it’s implemented

```text
"O say, can you see that tuple?"
The most fundamental implementation concept is tuple
visibility: which versions
of which table rows are seen by which transactions.
Ignoring tuples you’re not supposed to be able to see is the key to
making
transactions appear atomic.
Definition: a tuple is a specific stored object in
a table,
representing one version
of some logical table row. A row may exist in
multiple versions simultaneously.
```

#### 1.9.1.10 Non-overwriting storage management

```text
We must store multiple versions of every row. A tuple can be removed only
after
it’s been committed as deleted for long enough that no active
transaction
can see it anymore.
Fortunately, PostgreSQL has always practiced "non overwriting" storage
management: updated tuples are appended to the table, and older versions
are
removed sometime later.
Currently, removal of long-dead tuples is handled by
a VACUUM maintenance
command that must be issued
periodically. We are looking at ways to reduce
need for VACUUM by recycling dead tuples on-the-fly.
```

#### 1.9.1.11 Per-tuple status information

```text
Tuple headers contain:
• xmin: transaction ID of inserting transaction
• xmax: transaction ID of replacing/deleting transaction (initially NULL)
• forward link: link to newer version of same logical row, if any
Basic idea: tuple is visible if xmin is valid and xmax is not. "Valid"
means
"either committed or the current transaction".
If we plan to update rather than delete, we first add new version of row
to table,
then set xmax and forward link in old tuple. Forward link will
be needed by
concurrent updaters (but not by readers).
To avoid repeated consultation of pg_log, there are also
some status
bits that indicate
"known committed" or "known aborted" for xmin and xmax.
These are set by the first
backend that inspects xmin or xmax after the
referenced transaction commits/aborts.
```

#### 1.9.1.12 "Snapshots" filter away active transactions

```text
If Transaction A commits while Transaction B is running, we don’t want B
to
suddenly start seeing A’s updates partway through.
• Hence, we make a list
at transaction start of which transactions are currently being
run by other backends.
(Cheap shared-memory communication is essential here: we
just look in a
shared-memory table, in which each backend records its current
transaction
number.)
• These transaction IDs will never be considered valid
by the current transaction,
even if they are shown to be committed in pg_log or on-row status bits.
• Nor will a transaction with ID higher than the current transaction’s
ever be
considered valid.
• These rules ensure that no transaction committing after the current
transaction’s
start will be considered committed.
• Validity is in the eye of the beholder.
```

#### 1.9.1.13 Table-level locks: still gotta have ’em for some things

```text
Even though readers and writers don’t block each other under MVCC, we still
need
table-level locking.
This exists mainly to prevent the entire table from
being altered or deleted
out from under readers or writers.
We also offer various lock levels for application use (mainly for
porting applications
that take a traditional lock-based approach to
concurrency).
```

#### 1.9.1.14 Types of locks

```text
Lock type Acquired by system for Conflicts with
| 1 AccessShareLock SELECT 7
| 2 RowShareLock SELECT FOR UPDATE 6,7
| 3 RowExclusiveLock UPDATE, INSERT, DELETE 4,5,6,7
| 4 ShareLock CREATE INDEX 3,5,6,7
| 5 ShareRowExclusiveLock 3,4,5,6,7
| 6 ExclusiveLock 2,3,4,5,6,7
| 7 AccessExclusiveLock DROP TABLE, ALTER TABLE, VACUUM all
All lock types can be obtained by user LOCK TABLE commands.
Locks are held till end of transaction: you can grab a lock, but you can’t
release it
except by ending your transaction.
```

#### 1.9.1.15 Lock implementation

```text
Locks are recorded in a shared-memory hash table keyed by kind and ID of
object
being locked. Each item shows the types and numbers of locks held or
pending on
its object. Would-be lockers who have a conflict with an existing
lock must wait.
Waiting is handled by waiting on a per-process IPC semaphore, which will
be
signaled when another process releases the wanted lock. Note we need
only one
semaphore per concurrent backend, not one per potentially lockable
object.
```

#### 1.9.1.16 Deadlock detection

```text
Deadlock is possible if two transactions try to grab conflicting locks
in different orders.
If a would-be locker sleeps for more than a second without getting the
desired lock,
it runs a deadlock-check algorithm that searches the
lock hash table for circular
lock dependencies. If it finds any, then
obtaining the lock will be impossible, so it
gives up and reports an
error. Else it goes back to sleep and waits till granted the
lock (or
till client application gives up and requests transaction cancel).
• The delay before running the deadlock check algorithm can be
tuned to match the
typical transaction time in a particular server’s
workload. In this way, unnecessary
deadlock checks are seldom
performed, but real deadlocks are detected reasonably
quickly.
```

#### 1.9.1.17 Short-term locks

```text
Short-term locks protect datastructures in shared memory, such as the lock
hashtable described above.
These locks should only be held for long enough to
examine and/or update a
shared item --- in particular a backend should never
block while holding one.
Implementation: spin locks based on platform-specific
atomic test-and-set
instructions. This allows the lock code to fall through extremely quickly
in the
common case where there is no contention for the lock. If the test-and-set
fails,
we sleep for a short period (using select(2)) and
try again. No deadlock detection
as such, but we give up and report error
if fail too many times
```

#### 1.9.1.18 Summary

```text
PostgreSQL offers true ACID semantics for transactions, given some
reasonable
assumptions about the behavior of the underlying Unix kernel
and hardware.
Multi-version concurrency control allows concurrent reading
and writing of tables,
blocking only for concurrent updates of same row.
MVCC is practical because of non-overwriting storage manager that we
inherited
from the Berkeley POSTQUEL project. Traditional
row-overwriting storage
management would have a much harder time.

            1.9.1.19
        1.9.2
```

## 1.10 postgres DB maintenance , tags: postgres DB maintenance

### 1.10.1 VACUUM

#### 1.10.1.1 get list of dead tuples, tags: get list of dead tuples

#### 1.10.1.1.1 simple query

```text
Query to get the dead rows 
SELECT relname, n_dead_tup
FROM pg_stat_user_tables
WHERE schemaname = 'cdm'
ORDER BY relname;
```

#### 1.10.1.1.2 <colleague>'s query

```text
with table_bloat_query as (SELECT schemaname, tblname as tablename,
('"' || schemaname || '"."' || tblname || '"')::regclass::oid as table_oid,
bs*tblpages AS real_size,
  (tblpages-est_tblpages)*bs AS extra_size,
  CASE WHEN tblpages - est_tblpages > 0
    THEN 100 * (tblpages - est_tblpages)/tblpages::float
    ELSE 0
  END AS extra_ratio, fillfactor,
  CASE WHEN tblpages - est_tblpages_ff > 0
    THEN (tblpages-est_tblpages_ff)*bs
    ELSE 0
  END AS bloat_size,
  CASE WHEN tblpages - est_tblpages_ff > 0
    THEN 100 * (tblpages - est_tblpages_ff)/tblpages::float
    ELSE 0
  END AS bloat_ratio, is_na,
  current_timestamp::timestamp(0) as stats_time
FROM (
  SELECT ceil( reltuples / ( (bs-page_hdr)/tpl_size ) ) + ceil( toasttuples / 4 ) AS est_tblpages,
    ceil( reltuples / ( (bs-page_hdr)*fillfactor/(tpl_size*100) ) ) + ceil( toasttuples / 4 ) AS est_tblpages_ff,
    tblpages, fillfactor, bs, tblid, schemaname, tblname, heappages, toastpages, is_na
  FROM (
    SELECT
      ( 4 + tpl_hdr_size + tpl_data_size + (2*ma)
        - CASE WHEN tpl_hdr_size%ma = 0 THEN ma ELSE tpl_hdr_size%ma END
        - CASE WHEN ceil(tpl_data_size)::int%ma = 0 THEN ma ELSE ceil(tpl_data_size)::int%ma END
      ) AS tpl_size, bs - page_hdr AS size_per_block, (heappages + toastpages) AS tblpages, heappages,
      toastpages, reltuples, toasttuples, bs, page_hdr, tblid, schemaname, tblname, fillfactor, is_na
    FROM (
      SELECT
        tbl.oid AS tblid, ns.nspname AS schemaname, tbl.relname AS tblname, tbl.reltuples,
        tbl.relpages AS heappages, coalesce(toast.relpages, 0) AS toastpages,
        coalesce(toast.reltuples, 0) AS toasttuples,
        coalesce(substring(
          array_to_string(tbl.reloptions, ' ')
          FROM 'fillfactor=([0-9]+)')::smallint, 100) AS fillfactor,
        current_setting('block_size')::numeric AS bs,
        CASE WHEN version()~'mingw32' OR version()~'64-bit|x86_64|ppc64|ia64|amd64' THEN 8 ELSE 4 END AS ma,
        24 AS page_hdr,
        23 + CASE WHEN MAX(coalesce(s.null_frac,0)) > 0 THEN ( 7 + count(s.attname) ) / 8 ELSE 0::int END
           + CASE WHEN bool_or(att.attname = 'oid' and att.attnum < 0) THEN 4 ELSE 0 END AS tpl_hdr_size,
        sum( (1-coalesce(s.null_frac, 0)) * coalesce(s.avg_width, 0) ) AS tpl_data_size,
        bool_or(att.atttypid = 'pg_catalog.name'::regtype)
          OR sum(CASE WHEN att.attnum > 0 THEN 1 ELSE 0 END) <> count(s.attname) AS is_na
      FROM pg_attribute AS att
        JOIN pg_class AS tbl ON att.attrelid = tbl.oid
        JOIN pg_namespace AS ns ON ns.oid = tbl.relnamespace
        LEFT JOIN pg_stats AS s ON s.schemaname=ns.nspname
          AND s.tablename = tbl.relname AND s.inherited=false AND s.attname=att.attname
        LEFT JOIN pg_class AS toast ON tbl.reltoastrelid = toast.oid
      WHERE NOT att.attisdropped
        AND tbl.relkind in ('r','m')
      GROUP BY 1,2,3,4,5,6,7,8,9,10
    ) AS s
  ) AS s2
) AS s3
)
select * from table_bloat_query  where extra_size>100*1024*1024 or bloat_size>100*1024*1024
UNION
select * from table_bloat_query where extra_ratio>10 or bloat_ratio>10
UNION
select * from table_bloat_query where table_oid in
(select oid from pg_class where relkind='r' order by relpages DESC limit 50)
UNION
select * from table_bloat_query where table_oid in
(select relid from pg_stat_user_tables order by (idx_scan+seq_scan) DESC limit 50)
UNION
select * from table_bloat_query where table_oid in
(select relid from pg_stat_user_tables order by n_live_tup DESC limit 50)
UNION
select * from table_bloat_query where table_oid in
(select relid from pg_stat_user_tables order by n_dead_tup DESC limit 50)
UNION
select * from table_bloat_query where table_oid in
(select relid from pg_stat_user_tables order by (n_tup_upd+n_tup_del+n_tup_ins) DESC limit 50)
;
 
                1.10.1.1.3
```

#### 1.10.1.2 Chatgpt q explain autovacuum_vacuum_scale_factor in pg db, tags: Chatgpt q explain autovacuum_vacuum_scale_factor in pg db

```text
a. In PostgreSQL, the autovacuum_vacuum_scale_factor is a configuration parameter that determines when the autovacuum process should start a VACUUM operation on a table.

When a table has a high rate of update, insert, or delete operations, the table's data and index pages may become fragmented, which can lead to performance degradation. To prevent this, PostgreSQL's autovacuum process periodically cleans up the fragmented pages in the table to reclaim space and improve performance.

The autovacuum_vacuum_scale_factor parameter specifies the fraction of the table's total pages that must become "dead" (unused) before the autovacuum process will start a VACUUM operation on the table. The default value of autovacuum_vacuum_scale_factor is 0.2, which means that autovacuum will start a VACUUM operation on a table when at least 20% of the table's pages are dead.

You can adjust the value of autovacuum_vacuum_scale_factor to better match the needs of your application. A higher value means that autovacuum will start VACUUM operations less frequently, which can reduce the overhead on the database server, but it can also increase the risk of fragmentation and performance degradation. Conversely, a lower value means that autovacuum will start VACUUM operations more frequently, which can help keep the table's data and indexes organized and improve performance, but it can also increase the overhead on the database server.
```

#### 1.10.1.3 q. what are the downsides of setting autovacuum_vacuum_scale_factor to 0.02

```text
2 / 2

Setting the autovacuum_vacuum_scale_factor to a lower value such as 0.02 can trigger VACUUM operations more frequently, which can be beneficial for very active or large tables with high rates of updates, inserts, and deletes. However, there are also potential downsides to consider when setting this parameter to such a low value:

Increased overhead: Frequent VACUUM operations can add a significant overhead to the database server, especially for very large tables. Each VACUUM operation requires exclusive access to the table being vacuumed, which can cause delays and contention for other queries trying to access the table.

Increased disk usage: When a VACUUM operation is executed, it may create new pages on disk to store data that was previously fragmented across multiple pages. If VACUUM is executed too frequently, it can lead to an increase in disk usage and disk I/O operations.

Reduced performance: While VACUUM is running, it can consume a significant amount of system resources, such as CPU, memory, and disk I/O. If the server is already under heavy load, frequent VACUUM operations can further reduce the performance of the database.

Potential for table bloating: If the autovacuum_vacuum_scale_factor is set too low, VACUUM operations may run unnecessarily on tables that don't require it, leading to table bloating and an increase in disk usage.

In summary, while setting the autovacuum_vacuum_scale_factor to a low value can be beneficial for some tables, it's important to balance the benefits of frequent VACUUM operations with the potential drawbacks such as increased overhead, disk usage, and reduced performance. The optimal value for this parameter will depend on the specific workload and characteristics of the database.

            1.10.1.4 
        1.10.2
```

## 1.11 async queries, tags: pg, postgresql async queries

### 1.11.1 pg run queries async

```text
To run queries asynchronously in PostgreSQL using Java, you can use the PostgreSQL JDBC driver version 4.2 or higher, which includes support for the Java 8 CompletableFuture API.

Here's an example of how you can use CompletableFuture to run a query asynchronously in PostgreSQL:

java
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;
import java.sql.*;

public class AsyncQueryRunner {
    private final String url = "jdbc:postgresql://localhost:5432/mydatabase";
    private final String user = "myuser";
    private final String password = "mypassword";
    private final Executor executor = Executors.newFixedThreadPool(10);

    public CompletableFuture<ResultSet> executeQueryAsync(String sql) {
        return CompletableFuture.supplyAsync(() -> {
            try (Connection conn = DriverManager.getConnection(url, user, password)) {
                Statement stmt = conn.createStatement();
                return stmt.executeQuery(sql);
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }, executor);
    }
}
In this example, we create a new instance of the AsyncQueryRunner class, which contains a thread pool executor that we can use to execute our queries asynchronously. The executeQueryAsync method takes a SQL query string as input and returns a CompletableFuture that will eventually contain the ResultSet of the query.

To execute the query asynchronously, we use the CompletableFuture.supplyAsync method to create a new CompletableFuture that will execute the query in a separate thread. Inside the lambda expression, we establish a new connection to the database, create a Statement object, and execute the query using the executeQuery method. Finally, we return the ResultSet as the result of the CompletableFuture.

To use this class, you can create an instance of AsyncQueryRunner and call the executeQueryAsync method to run your queries asynchronously:

java
AsyncQueryRunner runner = new AsyncQueryRunner();
CompletableFuture<ResultSet> future = runner.executeQueryAsync("SELECT * FROM mytable");
future.thenAccept(resultSet -> {
    // Process the ResultSet here
});
In this example, we execute a query to select all rows from the mytable table and retrieve the result as a CompletableFuture. We then use the thenAccept method to specify a callback that will be called when the query completes. Inside the callback, we can process the ResultSet as needed.
```

### 1.11.2 is there a PG extension that allows for asyn run of queries

```text
Yes, PostgreSQL has a built-in extension called pgxn_async that provides support for running queries asynchronously.

The pgxn_async extension provides a set of functions that allow you to execute queries asynchronously and retrieve their results as soon as they become available. It uses PostgreSQL's asynchronous API to send queries to the server and receive their results, allowing you to continue processing other tasks while waiting for the query results.

To use the pgxn_async extension, you need to install it first. You can do this by running the following command:

$ sudo pgxn install pgxn_async
Once the extension is installed, you can use the async function to execute a query asynchronously. Here's an example:

SELECT async('SELECT * FROM mytable');
This will return a unique ID for the asynchronous query that you can use to retrieve its results later.

To retrieve the results of an asynchronous query, you can use the wait_async function, which blocks until the query results become available. Here's an example:

SELECT wait_async('unique_id');
This will return the result of the asynchronous query, or an error message if the query failed.

You can also use the is_async_done function to check if an asynchronous query has completed yet. This function returns true if the query is complete, and false otherwise. Here's an example:

SELECT is_async_done('unique_id');
This will return true if the query has completed, or false if it is still running.

Note that the pgxn_async extension may not be suitable for all use cases, as it can add additional overhead and complexity to your queries. You should evaluate your specific needs and performance requirements before using this extension.
```

### 1.11.3 from java 8 based PG client

```text
Yes, you can use the Java 8-based PG client called PgAsync, which provides an asynchronous API for interacting with a PostgreSQL database.

PgAsync uses the CompletableFutures API introduced in Java 8 to provide an easy-to-use asynchronous API for running queries and retrieving results. It also supports connection pooling and SSL/TLS encryption for secure communication with the database server.

Here's an example of how you can use PgAsync to connect to a PostgreSQL database and execute a query:

java
import com.github.pgasync.ConnectionPoolBuilder;
import com.github.pgasync.Db;
import com.github.pgasync.ResultSet;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

public class PgAsyncExample {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        Db db = ConnectionPoolBuilder.builder()
                .hostname("localhost")
                .port(5432)
                .database("mydatabase")
                .username("myuser")
                .password("mypassword")
                .build();

        CompletableFuture<ResultSet> future = db.querySet("SELECT * FROM mytable");

        ResultSet resultSet = future.get();

        // Process the ResultSet here
    }
}
In this example, we create a new Db object using the ConnectionPoolBuilder class, which provides a fluent interface for configuring the connection pool. We specify the hostname, port, database name, username, and password for the connection, and then build the connection pool.

To execute a query asynchronously, we use the querySet method of the Db object, which returns a CompletableFuture<ResultSet> that will eventually contain the result of the query. We can then use the get method of the CompletableFuture to retrieve the ResultSet when it becomes available.

Inside the callback, we can process the ResultSet as needed.

Note that you should make sure to properly handle exceptions that may be thrown when using PgAsync, such as SQLExceptions and InterruptedExceptions. You should also close the Db object and the associated connection pool when you're done using it.
```

### 1.11.4 how to parse PG resuletSet in java

```text
To parse a PostgreSQL ResultSet in Java using the java.sql.ResultSet class, you can follow these steps:

Execute the query and get the ResultSet object.
Use the next() method of the ResultSet object to move the cursor to the next row and check if there are any more rows.
Use the various get methods of the ResultSet object to retrieve the values of the columns for the current row. These methods take the index of the column or the name of the column as a parameter, and return the value of the column as the appropriate Java data type.
Process the retrieved data as needed.
Here's an example of how to parse a PostgreSQL ResultSet in Java:

java
import java.sql.*;

public class PgResultSetExample {
    public static void main(String[] args) throws SQLException {
        String url = "jdbc:postgresql://localhost/mydatabase";
        String user = "myuser";
        String password = "mypassword";
        Connection connection = DriverManager.getConnection(url, user, password);

        String query = "SELECT name, age, email FROM users";
        Statement statement = connection.createStatement();
        ResultSet resultSet = statement.executeQuery(query);

        while (resultSet.next()) {
            String name = resultSet.getString("name");
            int age = resultSet.getInt("age");
            String email = resultSet.getString("email");

            // Process the retrieved data here
        }

        statement.close();
        connection.close();
    }
}
In this example, we first establish a connection to the PostgreSQL database using the DriverManager.getConnection method. We then create a Statement object using the createStatement method of the Connection object, and execute the query using the executeQuery method of the Statement object.

Inside the while loop, we use the various get methods of the ResultSet object to retrieve the values of the columns for the current row. In this example, we retrieve the values of the name, age, and email columns, which are of type String, int, and String, respectively.

Note that you should always close the Statement, ResultSet, and Connection objects when you're done using them to avoid resource leaks.

        1.11.5
    1.12
```
