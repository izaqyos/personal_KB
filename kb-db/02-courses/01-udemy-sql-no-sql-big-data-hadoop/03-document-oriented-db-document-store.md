---
type: reference
title: "Document oriented DB, Document-Store"
description: "Udemy course notes on document oriented DB, Document-Store in the SQL/NoSQL/big data course."
tags: [mongodb, nosql, database, course-notes, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-db#2.1.3"
---

# 2.1.3 Document oriented DB, Document-Store

[↑ Udemy SQL, No SQL, Big Data & Hadoop](/kb-db/02-courses/01-udemy-sql-no-sql-big-data-hadoop/README.md)

```text
Store semi structured data, usually json/xml format
```

#### 2.1.3.1 Intro

#### 2.1.3.2 Mongo

```text
written in c++
serves json but internally stored as binary (bson)
uses sharding for partioning
Also supports goespatial (coordinates, points, etc)

install:
$ docker pull mongo
$ mkdir mongodb
$ docker run -it -v mongodb:/data/db --name mongodb -d mongo
513ef862e7e8445c3d178ae4913243f872905df247cc8e9a19171aaad0149296

logs:
$ docker logs mongodb

bash access:
 docker exec -it mongodb bash
 
 start mongo
 root@513ef862e7e8:/# mongo
MongoDB shell version v4.4.2
connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("507ae19e-4ff4-4251-aaa5-1f3f0d1a30ec") }
MongoDB server version: 4.4.2
Welcome to the MongoDB shell.
For interactive help, type "help

LCM:
docker stop/start mongodb 
```

#### 2.1.3.2.1 mongodb terminogy

```text
database - namespace, similar to sql schema
Collection - 
```

#### 2.1.3.2.2 Modeling in mongodb

```text
- Unlike sql, there are no FK constraints so data integrity can't rely on DB level. it needs to be in app level.
- where normalization breaks "logical" entities in sql, in mongo such relations are not required. 
  For example a user can have occupation as property and not as a key to a separate table
- movielens example. basically denormalization...
so user will be a json like:
{
    id: aid,
    gender: agender,
    occupation: {
        occupation_sub_property: ...,
    }
    age: age
}

-  nXn relations in sql are required b/c on row value can not be an array so join is required
   In mongo it's possible to have an array sub property
   so for example movie <-> movie-generes many2many relation can be represented as an array.
   e.g.
   movie json:
   {
       id: id,
       title: title,
       release-year: year,
       genres: [
        action,
        thriller
       ],
    }
- what about ratings table?
it related both to users and movies. how to model?
one option is to refer to full movie object in rating entry of user (duplication). This is refered to as embeding (denormalization).

another option, that avoids duplcation is to use ObjRef (similar to FK or pointer). This is refered to as referencing (normalization) 
ex. rating json:
{
    id: ratingid,
    user: ObjRef ("desc", userid),
    movie: ObjRef ("desc", movieid),
}

- some rule of thumbs. in 1:1 relations, If the refered entity is seldom changed (think movie) it can be normalized. 
  If we need history we should embed (think age histor for user)
  big objects should referenced 
```

#### 2.1.3.2.3 movielens mongodb implementation

```text
/Users/<user>/work/courses/sql_nosql_bigdata/rdbms_2_nosql/mongodb
```

#### 2.1.3.2.4 mongo CRUD

```text
CLI supports completion. 
db.<table name>.insert/find 

 $  cat /Users/<user>/work/courses/sql_nosql_bigdata/rdbms_2_nosql/mongodb/mongdb_crud.js | pbcopy
 //insert a new movie
db.movies.insertOne({
    "title" : "Avenger Endgame (2019)",
    "release_year" : 2019,
    "genres" : [
            "Fantasy",
            "Sci-Fi"
    ]
});

// insert many movies at the same time
db.movies.insertMany([
{"title" : "Glass", "release_year" : 2019, "genres" : [ "Drama", "Sci-Fi", "Thriller" ] },
{"title" : "Fighting with My Family", "release_year" : 2019, "genres" : [ "Biography", "Comedy", "Drama" ] },
{"title" : "Black Panther", "release_year" : 2018, "genres" : [ "Action", "Adventure", "Sci-Fi" ] }])

//search
db.movies.findOne()
//find functions generally take two documents
//the first part is the query predicate definition, 
//the second part controls the projection
db.movies.find({'title' : "Black Panther"}, {}) //.pretty()
//now project only the id and title
db.movies.find({'title' : "Black Panther"}, {'title' : 1, '_id' : 0})

//examples of operations
//search for the 10 Crime and Action movies
db.movies.find({$and : [{'genres' : 'Crime'}, {'genres' : 'Action'}]}).limit(10)
//and some pagnation
db.movies.find({$and : [{'genres' : 'Crime'}, {'genres' : 'Action'}]}).skip(2).limit(10)

//update 
//has to parts: query part and the updating document part
db.movies.update({'title' : "Black Panther"}, {$set : {'release_year' : 2019}})

//delete
db.movies.delete({})


//get the max id
db.movie.find().sort({"_id": -1}).limit(1)
```

#### 2.1.3.2.5 indexes

```text
 $  cat /Users/<user>/work/courses/sql_nosql_bigdata/rdbms_2_nosql/mongodb/indexes.js | pbcopy

//explain
db.users.find().explain()

//console:
// query planner report (query resolver selects optimal plan e.g. COLLSCAN)
//

db.users.find({'age_id' : 1}).explain()
// filter: { age_id: {$eq: "1"}}

db.users.find({$and : [{'age_id' : 1}, {'gender' : 'F'}]}).limit(10).explain()

//add executionStats to explain output
db.users.find({'age_id' : 1}).explain("executionStats")

//get indexes on the users collection
db.users.getIndexes()
// only on id primary-key

//to understand the impact of index on a query, it is important to use the explain function 
db.ratings.find({'genres' : 'Action'}).explain()

//create indexes on the rating collection
db.users.createIndex({'age_id' : 1})

// unique compound index, no user can rate the same movie twice
db.ratings.createIndexes([{'movie_id' : 1}, {'user_id': 1}], {unique: true})  //with options
//sort the ratings in descending order or time
db.ratings.createIndex({'rated_at' : -1})
//assumming a unique index on user c
db.users.createIndex({'ssn' : 1}, {unique: true}) //many other options. Check the documentaion


//create full text indexes on the tags collection
db.tags.createIndex({
		'tag' : 'text',
		'movie.title' : 'text'
	}, 
	{
		'weights' : {
			'tag' : 5,
			'movie.title' : 10
		},
		'name' : 'tag_text_idx'
})

//search using text index
db.tags.find( { $text: { $search: "bitter" } }, {'tag': 1, 'movie.title' : 1} )

//add the score of the relevance to the search
db.tags.find( 
	{ $text: { $search: "awesome romance" }},
   	{ score: { $meta: "textScore" } } 
)

//sort by the score of the relevance to the search
db.tags.find( 
	{ $text: { $search: "awesome romance" }},
   	{ score: { $meta: "textScore" } } 
).sort({score: { $meta: "textScore"}})

//drop movie_id and user_id indexes on the rating collection
db.ratings.dropIndex('idx44')
```

#### 2.1.3.2.6 shard keys

```text
all shared collection must have an index on the shard key
```

#### 2.1.3.2.7 aggregation via map-reduce

```text
note, mongo shell supports javascript syntax

dbname.count() -- return count
let c = dbname.count() -- c is a cursor
c.count()

map reduce, same as in functional programming.
pass a map function, map produces (k,v) pairs
then a reduce function

+------------------+              +------------------------+         +-----------------------+
|                  |              |                        |         |                       |
|                  +-------------->                        +--------->                       |
|   Documents      |              | Map                    |         |  Reduce               |
|                  |              |                        |         |                       |
|                  |              |                        +--------->                       |
|                  |              |                        |         |                       |
|                  +-------------->                        |         |                       |
|                  |              |                        |         |                       |
|                  |              |                        +--------->                       |
|                  |              |                        |         |                       |
|                  +-------------->                        |         +-----------------------+
+------------------+              +------------------------+
                     k1,v1                                  k1, [v1,v2,v5]
                     k2,v2                                  k2, [v2,v5]
                     k1,v3
                     k1,v4
                     k2,v5

example. find the distribution of genres of movies in a given year for all years.
reminder, movie doc looks like this:
db.movies.findOne()
{"id":1, "title" : "Black Panther", "release_year" : 2018, "genres" : [ "Action", "Adventure", "Sci-Fi" ] }])


code:
 cat $(pwd)/analytical_queries/movie_genre_count_per_year_using_mapreduce.js | pbcopy
//fetch a frequency of genre of movies per year for all years

var mapFn = function(){
	var genres = this.genres;
	var year = this.release_year;
	//emit each genre as count 1
	for (var i = 0; i < genres.length; i++)
		emit({'year': year, 'genre': genres[i]}, 1); //we want to count 1 for each genre in a given year, note key is {year, genre}
}

var reduceFn = function(key, values) { //since key is {year, genre} and value is 1 per movie we need to sum all the 1s to get result
	return Array.sum(values);
}

db.movies.mapReduce(mapFn, reduceFn, {out: {inline: 1}, query: {}}) //out instructs output to screen, query, what find to run for the map ({} -> return all)

db.movies.mapReduce(mapFn, reduceFn, {out: 'genre_yearly_hist', query: {}}) //outputs to a collection

//we will now query the genre_yearly_hist table
//get the frequency distribution of genres in a particular year. Order by frequency in descending order
db.genre_yearly_hist.find({'_id.year' : 1999}, {}).sort({'value': -1})
// we get descending list, drama 130, comedy 103 etc

//get the number of movies for a particular genre through the years
db.genre_yearly_hist.find({'_id.genre' : 'Action'}, {}).sort({'_id.year': -1})
// 

// sql equivalent
//select genre, release_year as year, count(1) from v_movie_genre group by genre, release_year;
```

#### 2.1.3.2.8 aggregation via aggregation framework

```text
works like a pipeline of tasks...

$ cat $(pwd)/analytical_queries/movie_genre_count_per_year.js | pbcopy
//fetch a histogram of genre of movies per year for all years
db.movies.aggregate([
	{$project : {'release_year' : 1, 'genres' : 1, '_id' : 0}},
	{$unwind : '$genres'},
	{$group : {
		_id : { 'year' : '$release_year', 'genre' : '$genres'},
		value : {$sum : 1}
	}},
	// {$match : {'_id.year' : 2000}}
])

// sql equivalent
//select genre, release_year as year, count(1) from v_movie_genre group by genre, release_year;

keywords are functions that do operation. project - :1 add filed to result, 0 - omit it
unwind, break up lists of values to multiple results. Example {"release_year": 1995, "genres": ["Horror", "comedy", "Action"]}
will be broken to:
{"release_year": 1995, "genres": ["Horror"]}
{"release_year": 1995, "genres": ["comedy"]}
{"release_year": 1995, "genres": ["Action"]}
group, group keys to single key value, key {release_year, genre} value - 1 for each
value: $sum, sum add one for each {release_year, genre}
match only matches according to param key : match


$ cat $(pwd)/analytical_queries/users_who_gave_5_star_reviews.js | pbcopy
//get all users who gave a 5 star review. query on a normalized collection.
// explanation. match users who gave rating 5. since id is in users table perform lookup for user id. its like a join...
// only works on non sharded collection
// unwind, unpack array of users to separate lines
// project, take key $user value and put in result as user: value
db.ratings.aggregate([
	{$match : {"rating" : 5}},
	{$lookup : {
	        from : 'users',
	        localField: 'user_id',
	        foreignField: '_id',
	        as: 'user'
	    }
	},
	{$unwind : '$user'},
	{$project : {'user' : '$user'}}
])


//get all ratings where the user gave a 5 start review. query on a denormalized collection.
db.ratings_v2.aggregate([
    {$match : {"rating" : 5}},
    //{$project: {'user' : '$user', '_id' : 0}}
    {$project: {'user_id' : '$user.user_id', 'gender' : '$user.gender', 'occupation' : '$user.occupation', 'age_group' : '$user.age_group'}}
])


//or return all users who have given five star ratings and the movies they gave them on
db.ratings.aggregate([
	{$match : {"rating" : 5}},
	{$lookup : {
	        from : 'users',
	        localField: 'user_id',
	        foreignField: '_id',
	        as: 'user'
	    }
	},
	{$unwind : '$user'},
	{$project : {'movie_id' : 1, 'user' : 1, '_id': 0}},
	{$lookup : {
	        from : 'movies',
	        localField: 'movie_id',
	        foreignField: '_id',
	        as: 'movie'
	    }
	},
    {$group : {
            _id : '$user_id',
            'movies' : { $addToSet: { movie: "$movie.title" } }
        }
    }
])


//or return all users who have given five star ratings and the movies they gave them on
db.ratings_v2.aggregate([
	{$match : {"rating" : 5}},
    {$project: {'user' : '$user', 'movie' : 1, '_id': 0}},
    {$group : {
            _id : '$user.user_id',
            'movies' : { $addToSet: { movie: "$movie.title" } }
        }
    }
])

~/work/courses/sql_nosql_bigdata/rdbms_2_nosql/mongodb:]2057$ cat $(pwd)/analytical_queries//movie_rating_summary.js  | pbcopy
// the denormalized version
db.ratings_v2.aggregate([
    {$project : {'rating' : 1, 'movie.title' : 1, 'movie_id' : 1, '_id' : 0}},
	{$group : {
		'_id' : {'title' : '$movie.title', 'movie_id' : '$movie_id'},
		'no_rating' : {$sum : 1},
		'average_rating' : {$avg : '$rating'},
		'std_dev' :  {$stdDevPop: "$rating" }
		}
	},
	{$project : {'_id.title' : 1, 'no_rating' : 1, 'average_rating' : 1, 'std_dev' : 1, 'var_rating' : { $pow: ['$std_dev', 2 ] }}}
])


//for a movie, get the rating summary - count, sum, mean and variance for all movies (normalized)
db.ratings.aggregate([
	{$lookup : {
	        from : 'movies',
	        localField: 'movie_id',
	        foreignField: '_id',
	        as: 'movie'
	    }
	},
	{$unwind : '$movie'},
    {$project : {'rating' : 1, 'movie.title' : 1, 'movie_id' : 1, '_id' : 0}},
	{$group : {
		'_id' : {'title' : '$movie.title', 'movie_id' : '$movie_id'},
		'no_rating' : {$sum : 1},
		'average_rating' : {$avg : '$rating'},
		'std_dev' :  { $stdDevPop: "$rating" }
		}
	},
	{$project : {'_id.title' : 1, 'no_rating' : 1, 'average_rating' : 1, 'std_dev' : 1, 'var_rating' : { $pow: ['$std_dev', 2 ] }}}
])


// select title, count(1) no_movies, sum(rating) total_ratings, avg(rating) average_rating,
//variance(rating) from v_rating group by title;


                2.1.3.2.9

            2.1.3.3
```
