---
type: reference
title: relational DBs
description: "Subsection 2.1.1 of Udemy SQL, No SQL, Big Data & Hadoop."
tags: [kb-db]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-db#2.1.1"
---

# 2.1.1 relational DBs

[↑ Udemy SQL, No SQL, Big Data & Hadoop](/kb-db/02-courses/01-udemy-sql-no-sql-big-data-hadoop/README.md)

#### 2.1.1.1 intro

```text
relations, aka tables
records, aka rows
Primary key - identify row
Fields/Columnds - propeties
Data types - CHAR, INT etc
constraints - NULL, NOT NULL, UNIQUE
Transactions aka ACID
Index, usually tree data structure for fater access to records
ERD - Entity Relations Diagram 
RDBMS - set of tools and proceses to manage & monitor DB

SQL - declarative language.
made of:
- DDL, Data Defenition language, create alter drop
- DML, Data manipulation language, insert update delete select
- Access control - Grant Revoke
- Procedural language extensions 

Data modeling steps:
a. identify main actors
b. Create tables for actors
c. Actions for actors
d. Create tables for actions
e. Actors - identify non trivial properties. like customer payment method. They require foreign key to a dedicated table
many
f. Actions - identify non trivial properties. like customer payment method. They require foreign key to a dedicated table
g. optimizations. read/write
normalization / denormalization

Data modeling steps:
a. identify main actors. 
Users: id, age, gender, zip code
Movies: id, title, release

b. Create tables for actors

c. Actions for actors
user rate
user tag
d. Create tables for actions
ratings: user, rate, movie, id is composite (userid+movieid)
user tag: user, tag, movie , id is composite (userid+movieid)


e. Actors - identify non trivial properties. like customer payment method. They require foreign key to a dedicated table
movie generes. we could use a list but perormance is not good
instead add table:
genre_movies: genre, movie. uniqueness constraint 
To get movie genres join the movie and genre_movies tables

f. Actions - identify non trivial properties. like customer payment method. They require foreign key to a dedicated table
g. optimizations. read/write
normalization / denormalization

practice. model movie lens DB.

When modeling DB consider how it will be used. For transactions (OLTP) or for data analysis. 

normalization. 
a. genre_movies. movie id (foreign-key), genre
consider genre is free text. there's room for errors. like "action", "Action", "ation" etc.
we could use another helper table genre. id, genre.
like:
1 Action
2 SciFi

pros. a. eliminate errors. b. reduce redundancy c. table optimization
cons. a. less readable, b. require joins
So, normalization works better for transactional DBs and less for data analytics
When modeling for data analytics denormalization is prefered.

b. users 
age can use age group table
1, <18
2, 18-24
3, 24-35

same for occupation etc.
```

#### 2.1.1.2 mysql

```text
open source c-c++ DB maintained by Oracle.
Defailt storage engine InnoDB
```

#### 2.1.1.2.1 mysql docker

```text
 $ docker pull mysql
 $ docker images
 $ docker run --name yosi-mysql -e MYSQL_ROOT_PASSWORD=abcd1234 -d mysql:latest
 $ docker ps
```

#### 2.1.1.2.2 client:

```text
$ brew install mysql
```

#### 2.1.1.2.3 Connect to docker db

```text
$ docker exec -it yosi-mysql mysql -uroot -p
Enter password: 
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 8
Server version: 8.0.22 MySQL Community Server - GPL

Copyright (c) 2000, 2020, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> 

- to change the root password.
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY '[newpassword]'; 
```

#### 2.1.1.2.4 full guide https://phoenixnap.com/kb/mysql-docker-container

```text
           Running a MySQL Docker Container
If you need to set up a database quickly and without using up too many resources, deploying MySQL in a container is a fast and efficient solution. This is only appropriate for small and medium-sized applications. Enterprise-level applications would not find a MySQL Docker container sufficient for their workload.

Using the Docker software for setting up your database is becoming increasingly popular for small-scale apps. Instead of having a separate server for database hosting, you can deploy a MySQL database container.

Multiple containers can run on your computer. The containers share the same kernel and libraries of the host while packaging the deployed application or software into single units. This makes the database extraordinarily lightweight and fast to spin up.

Installing a MySQL Docker Container
Setting up a database in Docker is simply building a container based on a MySQL image. Follow the steps outlined below to get your MySQL container up and running.

Note: This tutorial assumes you already have Docker on your system. If you don't have the software, take a look at one of our articles on how to install Docker on CentOS, installing Docker on Ubuntu, or Docker guides for other operating systems.
```

#### 2.1.1.2.4.1 Step 1: Pull the MySQL Docker Image

```text
a. Start by pulling the appropriate Docker image for MySQL. You can download a specific version or opt for the latest release as seen in the following command:

docker pull mysql/mysql-server:latest
If you want a particular version of MySQL, replace latest with the version number.

b. Verify the image is now stored locally by listing the downloaded Docker images:

docker images
The output should include mysql/mysql-server among the listed images.

example Docker image on your system for deploying a MySQL Docker container
```

#### 2.1.1.2.4.2 Step 2: Deploy the MySQL Container

```text
a. Once you have the image, move on to deploying a new MySQL container with:

docker run --name=[container_name] -d mysql/mysql-server:latest
Replace [container_name] with the name of your choice. If you do not provide a name, Docker generates a random one.
The -d option instructs Docker to run the container as a service in the background.
In the command above, we used the latest version tag. This may differ according to the image you downloaded.
b. Then, check to see if the MySQL container is running:

docker ps
You should see the newly created container listed in the output. It includes container details, one being the status of this virtual environment. The status changes from health: starting to healthy, once the setup is complete.

Command to deploy a MySQL Docker container and verify MySQL container is running
```

#### 2.1.1.2.4.3 Step 3: Connect to the MySQL Docker Container

```text
a. Before you can connect the MySQL server container with the host, you need to make sure the MySQL client package is installed:

apt-get install mysql-client
b. Then, start a MySQL client inside the container by typing:

docker exec -it [container_name] mysql -uroot -p
c. Provide the root password, when prompted. With that, you have connected the MySQL client to the server.

d. Finally, change the server root password to protect your information:

mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY '[newpassword]';
Replace [newpassword] with a strong password of your choice.
```

#### 2.1.1.2.4.4 Configure MySQL Container

```text
When you install a MySQL container, you will find its configuration options in the /etc/mysql/my.cnf directory.

If you need to modify the configuration, create an alternative config file on the host machine and mount them inside the container.

a. First, create a new directory on the host machine:

mkdir -p /root/docker/[container_name]/conf.d
b. Create a custom MySQL config file inside that directory:

nano /root/docker/[container_name]/conf.d/my-custom.cnf
c. Once in the file, you can add lines with the desired configuration.

For example, if you want to increase the maximum number of connections to 250 (instead of the default 151), add the following lines to the configuration file:

[mysqld]
max_connections=250
File changing the configuration of a MySQL container by expanding the maximum number of connections.
d. Save and exit the file.

e. For the changes to take place, you need to remove and rerun the MySQL container. This time, the container uses a combination of configuration settings from the newly created file and the default config files.

To do this, run the container and map the volume path with the command:

docker run \
--detach \
--name=[container_name]\
--env="MYSQL_ROOT_PASSWORD=[my_password]" \
--publish 6603:3306 \
--volume=/root/docker/[container_name]/conf.d:/etc/mysql/conf.d \
mysql
f. To check whether the container loaded the configuration from the host, run the following command:

mysql -uroot -pmypassword -h127.0.0.1 -P6603 -e 'show global variables like "max_connections"';
You should see that the maximum number of connections is now 250.
```

#### 2.1.1.2.4.5 Manage Data Storage

```text
By default, Docker stores data in its internal volume.

To check the location of the volumes, use the command:

docker inspect [container_name]
You will see the /var/lib/mysql mounted in the internal volume.

List details of MySQL Docker container and data storage location
You can also change the location of the data directory and create one on the host. Having a volume outside the container allows other applications and tools to access the volumes when needed.

a. First, find an appropriate volume on the host and create a data directory on it:

mkdir -p /storage/docker/mysql-data
b. Now start the container again, mounting the previously made directory:

docker run \
--detach \
--name=[container_name] \
--env="MYSQL_ROOT_PASSWORD=my_password" \
--publish 6603:3306 \
--volume=/root/docker/[container_name]/conf.d:/etc/mysql/conf.d \
--volume=/storage/docker/mysql-data:/var/lib/mysql \
mysql
If you inspect the container, you should see that the MySQL container now stores its data on the host system. Run the command:

docker inspect [container_name]
Start, Stop, and Restart MySQL Container
The container automatically stops when the process running in it stops.

To start the MySQL container run:

docker start [container_name]
Stop the MySQL container, use the command:

docker stop [container_name]
To restart the MySQL container run:

docker restart [container_name]
Delete MySQL Container
Before deleting a MySQL container, make sure you stop it first.

Then, remove the docker container with:

docker rm [container_name] 

                    2.1.1.2.4.6
```

#### 2.1.1.2.5 load movielens sql dump

```text
a. mount host volume to container
delete container.
$ docker stop ebb6e87d3382
ebb6e87d3382
$ docker rm ebb6e87d3382
ebb6e87d3382

rerun w/ mount to sql dump of DB
$ unzip movielens-mysql-dump.zip -d /Users/<user>/Downloads/
Archive:  movielens-mysql-dump.zip
  inflating: /Users/<user>/Downloads/movielens-mysql-dump.sql  

$ docker run --name yosi-mysql -v/Users/<user>/Downloads/:/downloads -e MYSQL_ROOT_PASSWORD=abcd1234 -d mysql:latest 
docker: Error response from daemon: Conflict. The container name "/yosi-mysql" is already in use by container "323b207526047a39774d6f8a2c444798f2b6a75322f38b3dd4d2c6dc7cdc9299". You have to remove (or rename) that container to be able to reuse that name.
See 'docker run --help'.
$ docker rm 323b207526047a39774d6f8a2c444798f2b6a75322f38b3dd4d2c6dc7cdc9299
323b207526047a39774d6f8a2c444798f2b6a75322f38b3dd4d2c6dc7cdc9299
$ docker run --name yosi-mysql -v/Users/<user>/Downloads/:/downloads -e MYSQL_ROOT_PASSWORD=abcd1234 -d mysql:latest 
1af403d0ae3e6c76cda85b0ff49bd797b68a99e1254718b377cc190dad172b5b

b. load dump
$ docker exec -it yosi-mysql mysql -uroot -p
> source movielens-mysql-dump.sql 
```

#### 2.1.1.2.6 OLTP vs OLAP

```text
OLTP - Online Transactions Processing
CRUD, transactions, performant R/W, 
transactions.
start: START TRANSACTION;
run multiple write operations on multiple tables as one atomic operation
end by COMMIT; 
or to unde ROLLBACK;

paginated query
select * from table limit n, n+100;


ERPs, Mgmt, CRM
return small/paginated amount of data

OLAP - Onlin Analytical Processing

OLTP sql example:
$ cat !$
cat mysql/transactional_query.sql
use movielens;

-- Signing up a new user
select * from age_group;
select * from occupations where id = 3;
insert into users(age, gender, occupation_id, zip_code) values(35, 'F', 3, '00000'); -- 6041

-- Adding a new movie
START TRANSACTION;
insert into movies(title, release_year) values('Toy story 4', 2020); 

-- find the just inserted movies
select LAST_INSERT_ID(); -- 3953

select * from genres;

-- choose Animation, Adventure, Comedy 
insert into genres_movies(movie_id, genre_id) values(3953, 4);
insert into genres_movies(movie_id, genre_id) values(3953, 2);
insert into genres_movies values(null, 3953, 8);

COMMIT;

-- Updating movie information
update movies set title='Toy Story 4' where id=3953;

-- Delete a movie
delete from movies where id=3953;
-- error: ERROR 1451 (23000): Cannot delete or update a parent row: a foreign key constraint fails (`movielens`.`genres_movies`, CONSTRAINT `genre_movies` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`))
-- can't delete this movie row b/c it has a foreign-key relation to genre_movies table. see:


-- get the cause of the foreign constraint violation message
select * from genres_movies where movie_id = 3953;
-- +------+----------+----------+
-- | id   | movie_id | genre_id |
-- +------+----------+----------+
-- | 6409 |     3953 |        4 |
-- | 6410 |     3953 |        2 |
-- | 6411 |     3953 |        8 |
-- +------+----------+----------+
-- 3 rows in set (0.00 sec)

START TRANSACTION;

delete from genres_movies where movie_id=3953;
delete from movies where id=3953;

ROLLBACK;

-- Paginated query of movie
SELECT * from movies order by title desc limit 1, 100;
SELECT * from movies limit 101, 200;

-- sort
SELECT * from movies order by title limit 0, 50;

-- descending
SELECT * from movies order by title desc limit 0, 50;
```

#### 2.1.1.2.7 Data Processing

```text
Either in application space (Django, spring etc). Good for small amounts of data
or in DB space.  Good for big amounts of data
                2.1.1.2.8
```

#### 2.1.1.3 indexes

```text
Avoid full table scans. faster reads.
some queries can be answered by the index alone. like how many time a certain record appears.
have impact on write operations. since update data -> update index.
```

#### 2.1.1.3.1 indexes sql

```text
$ cat mysql/indexes.sql
use movielens;

-- explain statement
explain select * from ratings where user_id=20;
-- +----+-------------+---------+------------+------+----------------+----------------+---------+-------+------+----------+-------+
-- | id | select_type | table   | partitions | type | possible_keys  | key            | key_len | ref   | rows | filtered | Extra |
-- +----+-------------+---------+------------+------+----------------+----------------+---------+-------+------+----------+-------+
-- |  1 | SIMPLE      | ratings | NULL       | ref  | rating_user_fk | rating_user_fk | 5       | const |   24 |   100.00 | NULL  |
-- +----+-------------+---------+------------+------+----------------+----------------+---------+-------+------+----------+-------+
--                                                   means there's an index: rating_user_fk of length 5
-- 1 row in set, 1 warning (0.00 sec)

explain select * from movies where release_year = 1990;
-- +----+-------------+--------+------------+------+---------------+------+---------+------+------+----------+-------------+
-- | id | select_type | table  | partitions | type | possible_keys | key  | key_len | ref  | rows | filtered | Extra       |
-- +----+-------------+--------+------------+------+---------------+------+---------+------+------+----------+-------------+
-- |  1 | SIMPLE      | movies | NULL       | ALL  | NULL          | NULL | NULL    | NULL | 3884 |    10.00 | Using where |
-- +----+-------------+--------+------------+------+---------------+------+---------+------+------+----------+-------------+
-- note:                                     all, no ref, no key, all rows were scanned -- 1 row in set, 1 warning (0.00 sec)

-- show indexes 
show indexes from ratings; -- show index from ratings will also work
-- +---------+------------+------------------+--------------+-------------+-----------+-------------+----------+--------+------+------------+---------+---------------+---------+------------+
-- | Table   | Non_unique | Key_name         | Seq_in_index | Column_name | Collation | Cardinality | Sub_part | Packed | Null | Index_type | Comment | Index_comment | Visible | Expression |
-- +---------+------------+------------------+--------------+-------------+-----------+-------------+----------+--------+------+------------+---------+---------------+---------+------------+
-- | ratings |          0 | PRIMARY          |            1 | id          | A         |      997875 |     NULL |   NULL |      | BTREE      |         |               | YES     | NULL       |
-- | ratings |          1 | rating_user_fk   |            1 | user_id     | A         |        6808 |     NULL |   NULL | YES  | BTREE      |         |               | YES     | NULL       |
-- | ratings |          1 | ratings_movie_fk |            1 | movie_id    | A         |        3039 |     NULL |   NULL | YES  | BTREE      |         |               | YES     | NULL       |
-- +---------+------------+------------------+--------------+-------------+-----------+-------------+----------+--------+------+------------+---------+---------------+---------+------------+
-- 3 rows in set (0.12 sec)
-- Cardinality, # of values
show keys from ratings;

-- create a table without index
create table ratings_without_index as select * from ratings;
-- Query OK, 1000209 rows affected (8.97 sec)
-- Records: 1000209  Duplicates: 0  Warnings: 0

show keys from ratings_without_index;
-- Empty set (0.00 sec)

--explain on the new table
explain select * from ratings_without_index where user_id = 20;
-- +----+-------------+-----------------------+------------+------+---------------+------+---------+------+--------+----------+-------------+
-- | id | select_type | table                 | partitions | type | possible_keys | key  | key_len | ref  | rows   | filtered | Extra       |
-- +----+-------------+-----------------------+------------+------+---------------+------+---------+------+--------+----------+-------------+
-- |  1 | SIMPLE      | ratings_without_index | NULL       | ALL  | NULL          | NULL | NULL    | NULL | 997560 |    10.00 | Using where |
-- +----+-------------+-----------------------+------------+------+---------------+------+---------+------+--------+----------+-------------+
-- 1 row in set, 1 warning (0.00 sec)

-- let do more complex queries
SELECT g.name genre, m.release_year, count(1) rating_count, sum(r.rating) total_rating FROM ratings r JOIN movies m ON m.id = r.movie_id JOIN genres_movies gm ON gm.movie_id = m.id JOIN genres g ON g.id = gm.genre_id GROUP BY g.name, m.release_year;
SELECT g.name genre, m.release_year, count(1) rating_count, sum(r.rating) total_rating FROM ratings r JOIN movies m ON m.id = r.movie_id JOIN genres_movies gm ON gm.movie_id = m.id JOIN genres g ON g.id = gm.genre_id GROUP BY g.name, m.release_year order by rating_count desc limit 0,50;
-- +----------+--------------+--------------+--------------+
-- | genre    | release_year | rating_count | total_rating |
-- +----------+--------------+--------------+--------------+
-- | Comedy   | 1999         |        36869 |       129465 |
-- | Drama    | 1999         |        29602 |       107481 |
-- | Drama    | 1995         |        26390 |        95976 |
-- | Drama    | 1997         |        25287 |        91922 |
-- | Comedy   | 1998         |        24911 |        86780 |


explain SELECT g.name genre,
       m.release_year,
       count(1) rating_count,
       sum(r.rating) total_rating
FROM ratings r
JOIN movies m ON m.id = r.movie_id
JOIN genres_movies gm ON gm.movie_id = m.id
JOIN genres g ON g.id = gm.genre_id
GROUP BY g.name,
         m.release_year;

-- primary key has not null + unique constraing
-- unique index, like primary key but can be null
-- indexes can also be non unique
-- there geo indexes for map DBs 
-- full text search indexes
CREATE unique index genre_name_indx on genre(name);

-- full text index
explain select m.title, t.tags from tags t join movies m on m.id = t.movie_id 
-- where match (t.tags) against('super heroes');
where t.tags = 'super heroes';

-- create a full text index
create fulltext index tag_tag_ft_indx on tags(tags);

-- now use the same full text search function. It should work now.
select * from tags t join movies m on m.id = t.movie_id 
where match (t.tags) against('super hero');

--lets explain the full text query
explain select * from tags t join movies m on m.id = t.movie_id 
where match (t.tags) against('super hero');

-- show indexs on the tag table
show keys from tags;

-- drop indexes 
drop index movie_release_year_indx on movies;

                2.1.1.3.2
```

#### 2.1.1.4 OLAP

```text
used for storing huge amounts of data. For research, analytics BI, etc. 
infrequent writes.
huge reads.
not transactional
prefer de-normalization

data source comes from OLTP DBs (CRM, ERP, Billing etc) --ETL--> Data Werehousing --> OLAP DBs
ETL - extraction, transformation, loading

Why not just use OLTP DBs??
OLTP vs OLAP has some contention points.
a. query complexity. OLTP, simple, short. OLAP, complex
b. history. OLTP, none to basic. OLAP. keep history for analytics
c. big data. OLAP
d. multi data source integration. OLAP requirement. ETL
```

#### 2.1.1.4.1 sql to create Data-Werehousing DB

```text
$ cat mysql/movielen_dw.sql
create database movielens_dw;
use movielens_dw;

-- create the procedures to load the tables from the movielens schema
DROP PROCEDURE IF EXISTS load_date_dim;
DELIMITER $
CREATE PROCEDURE load_date_dim (start_date DATE, stop_date DATE)
BEGIN
    DECLARE last_date date;
    DECLARE i_date date;
    
    DELETE FROM dim_date;

    SET i_date = start_date;
    WHILE i_date <= stop_date DO
        INSERT INTO dim_date (`date`, day_of_week, dayname, is_weekend, month, monthname, day_of_month, quarter, `year`, year_quarter) 
            VALUES (
                i_date,
                dayofweek(i_date),
                dayname(i_date),
                weekday(i_date) = 5 or weekday(i_date) = 6,
                month(i_date),
                monthname(i_date),
                dayofmonth(i_date),
                concat('Q', quarter(i_date)),
                year(i_date),
                concat(year(i_date), '_Q', quarter(i_date))
            );

        SET i_date = DATE_ADD(i_date, INTERVAL 1 DAY);
    END WHILE;
END $
DELIMITER ;


--- create a function to get the time of day
DROP FUNCTION IF EXISTS get_time_of_day;
DELIMITER $$
CREATE FUNCTION get_time_of_day(t_day TIME) RETURNS char(10) DETERMINISTIC
BEGIN
  DECLARE time_of_day CHAR(10);
  DECLARE vtime INT;
    
  SET vtime = hour(t_day);
    
  IF vtime = 0 THEN
    SET time_of_day = 'Mid-Night';
  ELSEIF (vtime > 0 AND vtime < 6) THEN 
    SET time_of_day ='Night';
  ELSEIF (vtime > 6 AND vtime < 12) THEN 
    SET time_of_day ='Morning';
  ELSEIF (vtime = 12) THEN 
    SET time_of_day ='Noon';
  ELSEIF (vtime > 12 AND vtime < 16) THEN 
    SET time_of_day ='Afternoon';
  ELSEIF (vtime > 16 AND vtime < 20) THEN 
    SET time_of_day ='Evening';
  ELSE
    SET time_of_day ='Late Night';
  END IF;
    
  RETURN time_of_day;
END $$
DELIMITER ;

--- create the procedures to load the time dimension 
DROP PROCEDURE IF EXISTS load_time_dim;
DELIMITER $
CREATE PROCEDURE load_time_dim ()
BEGIN
    DECLARE last_time time;
    DECLARE start_time time;
    DECLARE i_t time;
    
    DELETE FROM dim_time;

    SET last_time = '23:59:59';
    SET i_t = '00:00:00';
    WHILE i_t <= last_time DO
        INSERT INTO dim_time (full_time, hour, hour24, minute, ampm, timeofdayname) 
            VALUES (
                i_t,
                TIME_FORMAT(i_t, '%h'),
                TIME_FORMAT(i_t, '%H'),
                minute(i_t),
                TIME_FORMAT(i_t, '%p'),
                get_time_of_day(i_t)
            );

        SET i_t = DATE_ADD(i_t, INTERVAL 1 MINUTE);
    END WHILE;
END $
DELIMITER ;




DROP TABLE IF EXISTS dim_date;
CREATE TABLE dim_date (
  date_pk         bigint primary key auto_increment, 
  date            date not null,
  day_of_week     char(10) not null,
  dayname         char(12) not null,
  is_weekend      boolean not null default false,
  month           tinyint not null,
  monthname       char(10) not null,
  day_of_month    tinyint not null, 
  quarter         char(2) not null,
  year            int not null,
  year_quarter    char(7) not null,
  unique key dim_date_date_idx (date)
);
-- call procedure
call load_date_dim ('2000-01-01', '2010-12-31');

DROP TABLE IF EXISTS dim_time;
CREATE TABLE dim_time (
  time_pk         bigint primary key auto_increment, 
  full_time       time not null,
  hour            char(2) not null,
  hour24          char(2) not null,
  minute          char(2) not null,
  ampm            char(2) not null, 
  timeofdayname   varchar(10) not null comment 'morning, noon, afternoon, evening, midnight, night',
  unique key dim_time_time_unique_idx (full_time)
);

-- load data 
call load_time_dim();

drop table if exists dim_movie;
create table dim_movie (
  movie_pk        bigint primary key,  -- map to movie_id
  title           varchar(100) not null,
  release_year    char(4),
  insert_date     datetime
);

-- load dim_movie
INSERT INTO dim_movie (movie_pk, title,release_year, insert_date)
SELECT id,
       title,
       release_year,
       curdate()
FROM movielens.movies;



drop table if exists dim_movie_genre;
create table dim_movie_genre (
  movie_genre_pk  bigint primary key auto_increment, 
  movie_pk        bigint not null,
  movie_genre_id  bigint not null,
  genre_id        bigint not null,
  genre_name      varchar(20) not null,
  insert_date     datetime,
  unique key dim_movie_genre_unique_idx (movie_pk, genre_id),
  foreign key dim_movie_genre_dim_movie_fk (movie_pk) REFERENCES dim_movie (movie_pk)
);

-- load dim_movie
INSERT INTO dim_movie_genre (movie_pk, movie_genre_id, genre_id, genre_name, insert_date)
SELECT gm.movie_id,
       gm.id AS movie_genre_id,
       g.id AS genre_id,
       g.name,
       curdate()
FROM movielens.genres_movies gm
JOIN movielens.genres g ON g.id = gm.genre_id;


drop table if exists dim_user;
create table dim_user (
  user_pk         bigint primary key auto_increment, 
  user_id         bigint not null,
  age_group_id    bigint not null,
  age_group       char(15),
  occupation_id   bigint not null,
  occupation      char(20),
  gender          char(6),
  zip_code        char(12),
  insert_date     datetime
);

-- load dim_movie
INSERT INTO dim_user (user_id, age_group_id, age_group, occupation_id, occupation, gender, zip_code, insert_date)
SELECT u.id,
       u.age,
       ag.name AS age_group,
       u.occupation_id,
       oc.name AS occuption,
       CASE u.gender
           WHEN 'F' THEN 'Female'
           WHEN 'M' THEN 'Male'
           ELSE 'na'
       END,
       u.zip_code,
       curdate()
FROM movielens.users u
LEFT JOIN movielens.age_group ag ON ag.id = u.age
LEFT JOIN movielens.occupations oc ON oc.id = u.occupation_id;


-- fact_rating
drop table if exists fact_rating;
create table fact_rating (
  rating_pk       bigint primary key auto_increment, 
  movie_pk        bigint not null,
  user_pk         bigint not null,
  date_pk         bigint not null,
  time_pk         bigint not null,
  rating          float,
  insert_date     datetime,
  foreign key fact_rating_dim_date_fk (date_pk) REFERENCES dim_date (date_pk),
  foreign key fact_rating_dim_time_fk (time_pk) REFERENCES dim_time (time_pk),
  foreign key fact_rating_dim_movie_fk (movie_pk) REFERENCES dim_movie (movie_pk),
  foreign key fact_rating_dim_user_fk (user_pk) REFERENCES dim_user (user_pk)
);


INSERT INTO fact_rating (rating_pk, movie_pk, user_pk, date_pk, time_pk, rating, insert_date)
SELECT r.id,
       m.movie_pk,
       u.user_pk,
       d.date_pk,
       t.time_pk,
       r.rating,
       curdate()
FROM movielens.ratings r
JOIN movielens_dw.dim_movie m ON m.movie_pk = r.movie_id
JOIN movielens_dw.dim_user u ON u.user_pk = r.user_id
JOIN movielens_dw.dim_date d ON DATE(d.date) = DATE(r.rated_at)
JOIN movielens_dw.dim_time t ON t.full_time = time(DATE_FORMAT(rated_at, '%H:%i:00'));
```

#### 2.1.1.4.2 Analytical Processing

#### 2.1.1.4.2.1 Aggregation Queries. Reduce. e.g. sum, avg, std dev etc

#### 2.1.1.4.2.1.1 aggregation_queries_dw.sql

```text
$ cat mysql/aggregation_queries_dw.sql | pbcopy 
use movielens_dw;

-- genre movie counting for the year 2000
SELECT gm.genre_name,
       count(1)
FROM dim_movie_genre gm
JOIN dim_movie m ON m.movie_pk = gm.movie_pk
WHERE release_year = '2000'
GROUP BY gm.genre_name;


-- total rating summary for each movie
SELECT m.title,
       m.release_year,
       count(f.rating) rating_count,
       sum(f.rating) total_rating,
       avg(f.rating) avg_rating,
       variance(f.rating)
FROM fact_rating f
JOIN dim_movie m ON f.movie_pk = m.movie_pk
GROUP BY m.title,
         m.release_year;


-- total rating summary for genres for years
SELECT gm.genre_name,
       count(1) rating_count,
       sum(r.rating) total_rating,
       avg(r.rating) avg_rating,
       variance(r.rating)
FROM fact_rating r
JOIN dim_movie_genre gm ON gm.movie_pk = r.movie_pk
GROUP BY gm.genre_name;


-- number of count for each rating class (1-5) for a certain genre on a monthly basis
SELECT gm.genre_name,
       d.year event_year,
       d.monthname event_month,
       r.rating stars,
       count(1) event_count
FROM fact_rating r
JOIN dim_movie_genre gm ON gm.movie_pk = r.movie_pk
JOIN dim_date d ON d.date_pk = r.date_pk
GROUP BY gm.genre_name,
         d.year,
         d.monthname,
         r.rating;
```

#### 2.1.1.4.2.2 Window Queries

```text
Aggregate values not by reducing multiple rows to one value 
common keyword OVER (default, whole data set) or add PARTITION BY and/or ORDER by

$ cat mysql/analytical_queries_dw.sql | pbcopy
use movielens_dw;
-- find the percentage of ratings for genres made for each month of a specific year
select v.*, 
    v.rating_counts / SUM(v.rating_counts) OVER (PARTITION BY v.year,v.monthname) AS factor, 
    (v.rating_counts / SUM(v.rating_counts) OVER (PARTITION BY v.year,v.monthname)) * 100 AS percentage
    ,RANK() OVER (PARTITION BY v.year,v.monthname ORDER BY v.rating_counts DESC) AS irank
FROM ( 
    SELECT d.year,
        d.monthname,
        gm.genre_name,
        COUNT(1) rating_counts
    FROM fact_rating f
    JOIN dim_movie_genre gm ON gm.movie_pk = f.movie_pk
    JOIN dim_date d ON d.date_pk = f.date_pk
    WHERE d.year = 2001 and d. month = 1 -- change the year in focus
    GROUP BY d.year,
        d.monthname,
        gm.genre_name
) AS v;
  

-- fetch the top 3 genres for each demographics (gender, occupation) of viewers
WITH my_query as (
    SELECT genre_name, gender, occupation, 
        ROW_NUMBER() OVER(PARTITION BY gender, occupation ORDER BY avg_rating DESC) as position
    FROM
        (SELECT u.gender,
            u.occupation,
            mg.genre_name,
            avg(f.rating) avg_rating
        FROM fact_rating f
        JOIN dim_movie m ON m.movie_pk = f.movie_pk
        JOIN dim_user u ON u.user_pk = f.user_pk
        JOIN dim_movie_genre mg ON mg.movie_pk = f.movie_pk
        GROUP BY u.gender,
            u.occupation,
            mg.genre_name
        HAVING COUNT(1) > 200) v
) 
select * from my_query q
where q.position  <= 3;

                    2.1.1.4.2.3

                2.1.1.4.3
```

#### 2.1.1.5 transaction logs

```text
- WAL. write ahead logs. logs of write operations before commit/rollback.
it is a source of truth in case of crash/restart etc.

- replication

-
```

#### 2.1.1.6 Analytical queries

#### 2.1.1.6.1 RANK

```text
https://www.sqlservertutorial.net/sql-server-window-functions/sql-server-rank-function/
Introduction to SQL Server RANK() function
The RANK() function is a window function that assigns a rank to each row within a partition of a result set.

The rows within a partition that have the same values will receive the same rank. The rank of the first row within a partition is one. The RANK() function adds the number of tied rows to the tied rank to calculate the rank of the next row, therefore, the ranks may not be consecutive.

The following shows the syntax of the RANK() function:

RANK() OVER (
    [PARTITION BY partition_expression, ... ]
    ORDER BY sort_expression [ASC | DESC], ...
)
In this syntax:

First, the PARTITION BY clause divides the rows of the result set partitions to which the function is applied.
Second, the ORDER BY clause specifies the logical sort order of the rows in each a partition to which the function is applied.
The RANK() function is useful for top-N and bottom-N reports.

SQL Server RANK() illustration
First, create a new table named sales.rank_demo that has one column:

CREATE TABLE sales.rank_demo (
	v VARCHAR(10)
);
Second, insert some rows into the sales.rank_demo table:

INSERT INTO sales.rank_demo(v)
VALUES('A'),('B'),('B'),('C'),('C'),('D'),('E');
Third, query data from the sales.rank_demo table:

SELECT v FROM sales.rank_demo;
Fourth, use the ROW_NUMBER() to assign ranks to the rows in the result set of sales.rank_demo table:

SELECT
	v,
	RANK () OVER ( 
		ORDER BY v 
	) rank_no 
FROM
	sales.rank_demo;
Here is the output:
v rank_no
A 1
B 2
...

SQL Server RANK Function Example
As shown clearly from the output, the second and third rows receive the same rank because they have the same value B. The fourth and fifth rows get the rank 4 because the RANK() function skips the rank 3 and both of them also have the same values.

SQL Server RANK() function examples
We’ll use the production.products table to demonstrate the RANK() function:

products
Using SQL Server RANK() function over a result set example
The following example uses the RANK() function to assign ranks to the products by their list prices:

SELECT
	product_id,
	product_name,
	list_price,
	RANK () OVER ( 
		ORDER BY list_price DESC
	) price_rank 
FROM
	production.products;
Here is the result set:
product_id, product_name, list_price, price_rank
155, The Domane SLR, 11999, 1
...

SQL Server RANK Function Over Result Set Example
In this example, because we skipped the PARTITION BY clause, the RANK() function treated the whole result set as a single partition.

The RANK() function assigns a rank to each row within the result set sorted by list price from high to low.

Using SQL Server RANK() function over partitions example
This example uses the RANK() function to assign a rank to each product by list price in each brand and returns products with rank less than or equal to three:

SELECT * FROM (
	SELECT
		product_id,
		product_name,
		brand_id,
		list_price,
		RANK () OVER ( 
			PARTITION BY brand_id
			ORDER BY list_price DESC
		) price_rank 
	FROM
		production.products
) t
WHERE price_rank <= 3;
The following picture shows the output:
product_id, product_name, list_price, price_rank


SQL Server RANK Function Over Partition Example
In this example:

First, the PARTITION BY clause divides the products into partitions by brand Id.
Second, the ORDER BY clause sorts products in each partition by list prices.
Third, the outer query returns the products whose rank values are less than or equal to three.
The RANK() function is applied to each row in each partition and reinitialized when crossing the partition’s boundary.


                2.1.1.6.2
```

#### 2.1.1.7 DB classification

#### 2.1.1.7.1 distributed DBs

```text
horizontal scaling.
replication factor. how many copies are made.
usually replicas handle read requests
```

#### 2.1.1.7.2 CAP theorem

```text
three guarantees:
a. network partition tolerance, 
b. Consistency. reads always get the most upto date value. ACID (Atomicity, Consistency, Isolation, Durability). Banks etc
c. availability. BASE (Basical availability, Soft State, Eventual consistency) YouTube etc.

only 2 can be guaranteed. in a distributed system either Consistency or availability must be compromised.
Example.
For consistency. writes are not complete until all replicas are up to date. In a replica is down fail the write.
For availability. writed replicate but don't fail write if there's a network partition so its possible for reads to get outdated data

Consistency + partition tolerance:
examples:
MongoDB, REDIS
distributed locking (Apache zookeeper)

traites:
pessimistic locking

availability + partition tolerance:
examples:
Cassandra, Riak, CouchDB
DNS

traites:
NSPF (No Single Point of Failure)
Conflict resolution
Optimistic

configuration (in Cassandra/MongoDB) read/write Consistency
```

#### 2.1.1.7.3 more DB classification

#### 2.1.1.7.3.1 Data model.

```text
                    graphs and key-value are not well handled by relational DB
also document stores, wide columns
```

#### 2.1.1.7.3.1.1 TSDB

```text
https://blog.timescale.com/blog/what-the-heck-is-time-series-data-and-why-do-i-need-a-time-series-database-dcf3b1b18563/

A primer on time-series data, and why you may not want to use a “normal” database to store it.

Here’s a riddle: what do self-driving Teslas, autonomous Wall Street trading algorithms, smart homes, transportation networks that fulfill lightning-fast same-day deliveries, and an open-data-publishing NYPD have in common?

For one, they are signs that our world is changing at warp speed, thanks to our ability to capture and analyze more and more data in faster and faster ways than before.

However, if you look closely, you’ll notice that each of these applications requires a special kind of data:

Self-driving cars continuously collect data about how their local environment is changing around them.
Autonomous trading algorithms continuously collect data on how the markets are changing.
Our smart homes monitor what’s going on inside of them to regulate temperature, identify intruders, and respond to our beck-and-call (“Alexa, play some relaxing music”).
Our retail industry monitors how their assets are moving with such precision and efficiency that cheap same-day delivery is a luxury that many of us take for granted.
The NYPD tracks its vehicles to allow us to hold them more accountable (e.g., for analyzing 911 response times).
These applications rely on a form of data that measures how things change over time. Where time isn’t just a metric, but a primary axis. This is time-series data and it’s starting to play a larger role in our world.

Software developer usage patterns already reflect this. In fact, over the past 24 months time-series databases (TSDBs) have steadily remained the fastest growing category of databases:


Source: DB-Engines, November 2018. 
As the developers of an open source time-series database, my team and I are often asked about this trend. So I’ll start with a more in-depth description of time-series data and then jump into when would you would need a time-series database.

What is time-series data?
Some think of “time-series data” as a sequence of data points, measuring the same thing over time, stored in time order. That’s true, but it just scratches the surface.

Others may think of a series of numeric values, each paired with a timestamp, defined by a name and a set of labeled dimensions (or “tags”). This is perhaps one way to model time-series data, but not a definition of the data itself.

Here’s a basic illustration. Imagine sensors collecting data from three settings: a city, farm, and factory. In this example, each of these sources periodically sends new readings, creating a series of measurements collected over time.


Here’s another example, with real data from the City of New York, showing taxicab rides for the first few seconds of 2018. As you can see, each row is a “measurement” collected at a specific time:


NYC taxi rides for the first few seconds of 2018. Source: NYC.gov
There are many other kinds of time-series data. To name a few: DevOps monitoring data, mobile/web application event streams, industrial machine data, scientific measurements.

These datasets primarily have 3 things in common:

The data that arrives is almost always recorded as a new entry
The data typically arrives in time order
Time is a primary axis (time-intervals can be either regular or irregular)
In other words, time-series data workloads are generally “append-only.” While they may need to correct erroneous data after the fact, or handle delayed or out-of-order data, these are exceptions, not the norm.

You may ask: How is this different than just having a time-field in a dataset? Well, it depends: how does your dataset track changes? By updating the current entry, or by inserting a new one?

When you collect a new reading for sensor_x, do you overwrite your previous reading, or do you create a brand new reading in a separate row? While both methods will provide you the current state of the system, only by writing the new reading in a separate row will you be able to track all states of the system over time.

Simply put: time-series datasets track changes to the overall system as INSERTs, not UPDATEs.

This practice of recording each and every change to the system as a new, different row is what makes time-series data so powerful. It allows us to measure change: analyze how something changed in the past, monitor how something is changing in the present, predict how it may change in the future.

Put simply, here’s how I like to define time-series data: data that collectively represents how a system/process/behavior changes over time.

This is more than just an academic distinction. By centering our definition around “change”, we can start to identify time-series datasets that we aren’t collecting today, but that we should be collecting down the line. In fact, often people have time-series data but don’t realize it.

Imagine you maintain a web application. Every time a user logs in, you may just update a “last_login” timestamp for that user in a single row in your “users” table. But what if you treated each login as a separate event, and collected them over time? Then you could: track historical login activity, see how usage is (in-/de-)creasing over time, bucket users by how often they access the app, and more.

This example illustrates a key point: by preserving the inherent time-series nature of our data, we are able to preserve valuable information on how that data changes over time. Another point: event data is also time-series data.

Of course, storing data at this resolution comes with an obvious problem: you end up with a lot of data, rather fast. So that’s the catch: time-series data piles up very quickly.

Having a lot of data creates problems when both recording it and querying it in a performant way, which is why people are now turning to time-series databases.

Why do I need a time-series database?
You might ask: Why can’t I just use a “normal” (i.e., non-time-series) database?

The truth is that you can, and some people do. Yet why are TSDBs the fastest growing category of databases today? Two reasons: (1) scale and (2) usability.

Scale: Time-series data accumulates very quickly. (For example, a single connected car will collect 4,000 GB of data per day.) And normal databases are not designed to handle that scale. Relational databases fare poorly with very large datasets; NoSQL databases fare better at scale, but can still be outperformed by a database fine-tuned for time-series data. In contrast, time-series databases (which can be based on relational or NoSQL databases) handle scale by introducing efficiencies that are only possible when you treat time as a first class citizen. These efficiencies result in performance improvements, including higher ingest rates, faster queries at scale (although some support more queries than others), and better data compression.

Usability: TSDBs also typically include functions and operations common to time-series data analysis such as data retention policies, continuous queries, flexible time aggregations, etc. Even if scale it not a concern at the moment (e.g., if you are just starting to collect data), these features can still provide a better user experience and make your life easier.

This is why developers are increasingly adopting time-series databases and using them for a variety of use cases:

Monitoring software systems: Virtual machines, containers, services, applications
Monitoring physical systems: Equipment, machinery, connected devices, the environment, our homes, our bodies
Asset tracking applications: Vehicles, trucks, physical containers, pallets
Financial trading systems: Classic securities, newer cryptocurrencies
Eventing applications: Tracking user/customer interaction data
Business intelligence tools: Tracking key metrics and the overall health of the business
(and more)
Even then, you’ll need to pick a time-series database that best fits your data model and write/read patterns.

A parting thought: Is all data time-series data?
For the past decade or so, we have lived in the era of “Big Data”, collecting massive amounts of information about our world and applying computational resources to make sense of it.

Even though this era started with modest computing technology, our ability to capture, store, and analyze data has improved at an exponential pace, thanks to major macro-trends: Moore’s law, Kryder’s law, cloud computing, an entire industry of “big data” technologies.


Under Moore’s Law, computational power (transistor density) doubles every 18 months, while Kryder’s Law postulates that storage capacity doubles every 12 months.
Now we need more. We are no longer content to just observe the state of the world, but we now want to measure how our world changes over time, down to sub-second intervals. Our “big data” datasets are now being dwarfed by another type of data, one that relies heavily on time to preserve information about the change that is happening.

Does all data start off as time-series data? Recall the earlier web application example: we had time-series data but didn’t realize it. Or think of any “normal” dataset. Say, the current accounts and balances at a major retail bank. Or the source code for a software project. Or the text for this article.

Typically we choose to store the latest state of the system, but instead, what if we stored every change and computed the latest state at query time? Isn’t a “normal” dataset just a view on top of an inherently time-series dataset (cached for performance reasons)? Don’t banks have transaction ledgers? (And aren’t blockchains just distributed, immutable time-series logs?) Wouldn’t a software project have version control (e.g., git commits)? Doesn’t this article have revision history? (Undo. Redo.)

Put differently: Don’t all databases have logs?

We recognize that many applications may never require time-series data (and would be better served by a “current-state view”). But as we continue along the exponential curve of technological progress, it would seem that these “current-state views” become less necessary. And that by storing more and more data in its time-series form, we may be able to understand it better.

So is all data time-series data? I’ve yet to find a good counter example. If you’ve got one, I’m open to hearing it. Regardless, one thing is clear: time-series data already surrounds us. It’s time we put it to use.

                        2.1.1.7.3.1.2
```

#### 2.1.1.7.3.2 Data Variability

```text
Data is not well structured
```

#### 2.1.1.7.3.3 Operational capabilities

```text
Each different model of DB is expected different capabilities.
e.x.
graph DBS: excell at graph operations
search engines: excell at text searches
TSDB: monitoring, anomality detection, trend visualization

                    2.1.1.7.3.4
                2.1.1.7.4

        2.1.1.8
```
