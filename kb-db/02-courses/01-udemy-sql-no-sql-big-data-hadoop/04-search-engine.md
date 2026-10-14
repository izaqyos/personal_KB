---
type: reference
title: Search engine
description: Udemy course notes on search engine in the SQL/NoSQL/big data course.
tags: [nosql, database, big-data, course-notes, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-db#2.1.4"
---

# 2.1.4 Search engine

[↑ Udemy SQL, No SQL, Big Data & Hadoop](/kb-db/02-courses/01-udemy-sql-no-sql-big-data-hadoop/README.md)

```text
document DB that support full text search, order by relevance 
The big difference vs normal DB as that full text search indexed are treated as first class citizens

so query will be tokenized, stemmed etc. pass to inverse index lookup table that will match the records with a relevance score.

Apache Lucene is a popular java based full text search library. Used by Elastic search and apache Solar. 
```

#### 2.1.4.1 Elastic search

```text
most popular search engine db.
open source. horizontal scale.
used by Github, stack-overflow, Foursquare
```

#### 2.1.4.2 installation

```text
install on host: https://www.elastic.co/start
docker install:
https://www.elastic.co/guide/en/elastic-stack-get-started/master/get-started-docker.html
cat docker-compose.yml
version: '3'
services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.9.3-amd64
    env_file:
      - elasticsearch.env
    volumes:
      - ./data/elasticsearch:/usr/share/elasticsearch/data

  kibana:
    image: docker.elastic.co/kibana/kibana:7.9.3
    env_file:
      - kibana.env
    ports:
      - 5601:5601

cat kibana.env
SERVER_HOST="0"
ELASTICSEARCH_URL=http://elasticsearch:9200
XPACK_SECURITY_ENABLED=false
$ cat elasticsearch.env 
cluster.name=my-awesome-elasticsearch-cluster
network.host=0.0.0.0
bootstrap.memory_lock=true
discovery.type=single-node

Navigate to the directory where you have created your docker-compose.yml file and create a subdirectory data. Then inside the data directory create another directory elasticsearch.
mkdir data
cd data
mkdir elasticsearch


run the compose:
docker-compose up -d

$ docker ps -a
CONTAINER ID        IMAGE                                                       COMMAND                  CREATED             STATUS                      PORTS                    NAMES
f9dbcdcd4e42        docker.elastic.co/elasticsearch/elasticsearch:7.9.3-amd64   "/tini -- /usr/local…"   41 seconds ago      Up 39 seconds               9200/tcp, 9300/tcp       elasticsearch-docker_elasticsearch_1
bc0c632c6289        docker.elastic.co/kibana/kibana:7.9.3                       "/usr/local/bin/dumb…"   42 seconds ago      Up 39 seconds               0.0.0.0:5601->5601/tcp   elasticsearch-docker_kibana_1
$ docker-compose ps
                Name                              Command               State           Ports         
------------------------------------------------------------------------------------------------------
elasticsearch-docker_elasticsearch_1   /tini -- /usr/local/bin/do ...   Up      9200/tcp, 9300/tcp    
elasticsearch-docker_kibana_1          /usr/local/bin/dumb-init - ...   Up      0.0.0.0:5601->5601/tcp

 docker-compose logs -f <optional - container name>

 when up kibana client: http://localhost:5601

 docker-compose logs -f kibana 

 throrough guide: https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html
 Install Elasticsearch with Dockeredit
Elasticsearch is also available as Docker images. The images use centos:8 as the base image.

A list of all published Docker images and tags is available at www.docker.elastic.co. The source files are in Github.

These images are free to use under the Elastic license. They contain open source and free commercial features and access to paid commercial features. Start a 30-day trial to try out all of the paid commercial features. See the Subscriptions page for information about Elastic license levels.

Pulling the imageedit
Obtaining Elasticsearch for Docker is as simple as issuing a docker pull command against the Elastic Docker registry.

docker pull docker.elastic.co/elasticsearch/elasticsearch:7.10.1
Alternatively, you can download other Docker images that contain only features available under the Apache 2.0 license. To download the images, go to www.docker.elastic.co.

Starting a single node cluster with Dockeredit
To start a single-node Elasticsearch cluster for development or testing, specify single-node discovery to bypass the bootstrap checks:

docker run -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.10.1
Starting a multi-node cluster with Docker Composeedit
To get a three-node Elasticsearch cluster up and running in Docker, you can use Docker Compose:

Create a docker-compose.yml file:
version: '2.2'
services:
  es01:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.10.1
    container_name: es01
    environment:
      - node.name=es01
      - cluster.name=es-docker-cluster
      - discovery.seed_hosts=es02,es03
      - cluster.initial_master_nodes=es01,es02,es03
      - bootstrap.memory_lock=true
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - data01:/usr/share/elasticsearch/data
    ports:
      - 9200:9200
    networks:
      - elastic
  es02:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.10.1
    container_name: es02
    environment:
      - node.name=es02
      - cluster.name=es-docker-cluster
      - discovery.seed_hosts=es01,es03
      - cluster.initial_master_nodes=es01,es02,es03
      - bootstrap.memory_lock=true
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - data02:/usr/share/elasticsearch/data
    networks:
      - elastic
  es03:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.10.1
    container_name: es03
    environment:
      - node.name=es03
      - cluster.name=es-docker-cluster
      - discovery.seed_hosts=es01,es02
      - cluster.initial_master_nodes=es01,es02,es03
      - bootstrap.memory_lock=true
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - data03:/usr/share/elasticsearch/data
    networks:
      - elastic

volumes:
  data01:
    driver: local
  data02:
    driver: local
  data03:
    driver: local

networks:
  elastic:
    driver: bridge
This sample Docker Compose file brings up a three-node Elasticsearch cluster. Node es01 listens on localhost:9200 and es02 and es03 talk to es01 over a Docker network.

Please note that this configuration exposes port 9200 on all network interfaces, and given how Docker manipulates iptables on Linux, this means that your Elasticsearch cluster is publically accessible, potentially ignoring any firewall settings. If you don’t want to expose port 9200 and instead use a reverse proxy, replace 9200:9200 with 127.0.0.1:9200:9200 in the docker-compose.yml file. Elasticsearch will then only be accessible from the host machine itself.

The Docker named volumes data01, data02, and data03 store the node data directories so the data persists across restarts. If they don’t already exist, docker-compose creates them when you bring up the cluster.

Make sure Docker Engine is allotted at least 4GiB of memory. In Docker Desktop, you configure resource usage on the Advanced tab in Preference (macOS) or Settings (Windows).

Docker Compose is not pre-installed with Docker on Linux. See docs.docker.com for installation instructions: Install Compose on Linux

Run docker-compose to bring up the cluster:

docker-compose up
Submit a _cat/nodes request to see that the nodes are up and running:

curl -X GET "localhost:9200/_cat/nodes?v&pretty"
Log messages go to the console and are handled by the configured Docker logging driver. By default you can access logs with docker logs.

To stop the cluster, run docker-compose down. The data in the Docker volumes is preserved and loaded when you restart the cluster with docker-compose up. To delete the data volumes when you bring down the cluster, specify the -v option: docker-compose down -v.

Start a multi-node cluster with TLS enablededit
See Encrypting communications in an Elasticsearch Docker Container and Run the Elastic Stack in Docker with TLS enabled.

Using the Docker images in productionedit
The following requirements and recommendations apply when running Elasticsearch in Docker in production.

Set vm.max_map_count to at least 262144edit
The vm.max_map_count kernel setting must be set to at least 262144 for production use.

How you set vm.max_map_count depends on your platform:

Linux

The vm.max_map_count setting should be set permanently in /etc/sysctl.conf:

grep vm.max_map_count /etc/sysctl.conf
vm.max_map_count=262144
To apply the setting on a live system, run:

sysctl -w vm.max_map_count=262144
macOS with Docker for Mac

The vm.max_map_count setting must be set within the xhyve virtual machine:

From the command line, run:

screen ~/Library/Containers/com.docker.docker/Data/vms/0/tty
Press enter and use`sysctl` to configure vm.max_map_count:

sysctl -w vm.max_map_count=262144
To exit the screen session, type Ctrl a d.
Windows and macOS with Docker Desktop

The vm.max_map_count setting must be set via docker-machine:

docker-machine ssh
sudo sysctl -w vm.max_map_count=262144
Windows with Docker Desktop WSL 2 backend

The vm.max_map_count setting must be set in the docker-desktop container:

wsl -d docker-desktop
sysctl -w vm.max_map_count=262144
Configuration files must be readable by the elasticsearch useredit
By default, Elasticsearch runs inside the container as user elasticsearch using uid:gid 1000:0.

One exception is Openshift, which runs containers using an arbitrarily assigned user ID. Openshift presents persistent volumes with the gid set to 0, which works without any adjustments.

If you are bind-mounting a local directory or file, it must be readable by the elasticsearch user. In addition, this user must have write access to the data and log dirs. A good strategy is to grant group access to gid 0 for the local directory.

For example, to prepare a local directory for storing data through a bind-mount:

mkdir esdatadir
chmod g+rwx esdatadir
chgrp 0 esdatadir
As a last resort, you can force the container to mutate the ownership of any bind-mounts used for the data and log dirs through the environment variable TAKE_FILE_OWNERSHIP. When you do this, they will be owned by uid:gid 1000:0, which provides the required read/write access to the Elasticsearch process.

Increase ulimits for nofile and nprocedit
Increased ulimits for nofile and nproc must be available for the Elasticsearch containers. Verify the init system for the Docker daemon sets them to acceptable values.

To check the Docker daemon defaults for ulimits, run:

docker run --rm centos:8 /bin/bash -c 'ulimit -Hn && ulimit -Sn && ulimit -Hu && ulimit -Su'
If needed, adjust them in the Daemon or override them per container. For example, when using docker run, set:

--ulimit nofile=65535:65535
Disable swappingedit
Swapping needs to be disabled for performance and node stability. For information about ways to do this, see Disable swapping.

If you opt for the bootstrap.memory_lock: true approach, you also need to define the memlock: true ulimit in the Docker Daemon, or explicitly set for the container as shown in the sample compose file. When using docker run, you can specify:

-e "bootstrap.memory_lock=true" --ulimit memlock=-1:-1
Randomize published portsedit
The image exposes TCP ports 9200 and 9300. For production clusters, randomizing the published ports with --publish-all is recommended, unless you are pinning one container per host.

Set the heap sizeedit
To configure the heap size, you can bind mount a JVM options file under /usr/share/elasticsearch/config/jvm.options.d that includes your desired heap size settings. Note that while the default root jvm.options file sets a default heap of 1 GB, any value you set in a bind-mounted JVM options file will override it.

While setting the heap size via bind-mounted JVM options is the recommended method, you can also configure this by using the ES_JAVA_OPTS environment variable to set the heap size. For example, to use 16 GB, specify -e ES_JAVA_OPTS="-Xms16g -Xmx16g" with docker run. Note that while the default root jvm.options file sets a default heap of 1 GB, any value you set in ES_JAVA_OPTS will override it. The docker-compose.yml file above sets the heap size to 512 MB.

You must configure the heap size even if you are limiting memory access to the container.

Pin deployments to a specific image versionedit
Pin your deployments to a specific version of the Elasticsearch Docker image. For example docker.elastic.co/elasticsearch/elasticsearch:7.10.1.

Always bind data volumesedit
You should use a volume bound on /usr/share/elasticsearch/data for the following reasons:

The data of your Elasticsearch node won’t be lost if the container is killed
Elasticsearch is I/O sensitive and the Docker storage driver is not ideal for fast I/O
It allows the use of advanced Docker volume plugins
Avoid using loop-lvm modeedit
If you are using the devicemapper storage driver, do not use the default loop-lvm mode. Configure docker-engine to use direct-lvm.

Centralize your logsedit
Consider centralizing your logs by using a different logging driver. Also note that the default json-file logging driver is not ideally suited for production use.

Configuring Elasticsearch with Dockeredit
When you run in Docker, the Elasticsearch configuration files are loaded from /usr/share/elasticsearch/config/.

To use custom configuration files, you bind-mount the files over the configuration files in the image.

You can set individual Elasticsearch configuration parameters using Docker environment variables. The sample compose file and the single-node example use this method.

To use the contents of a file to set an environment variable, suffix the environment variable name with _FILE. This is useful for passing secrets such as passwords to Elasticsearch without specifying them directly.

For example, to set the Elasticsearch bootstrap password from a file, you can bind mount the file and set the ELASTIC_PASSWORD_FILE environment variable to the mount location. If you mount the password file to /run/secrets/bootstrapPassword.txt, specify:

-e ELASTIC_PASSWORD_FILE=/run/secrets/bootstrapPassword.txt
You can also override the default command for the image to pass Elasticsearch configuration parameters as command line options. For example:

docker run <various parameters> bin/elasticsearch -Ecluster.name=mynewclustername
While bind-mounting your configuration files is usually the preferred method in production, you can also create a custom Docker image that contains your configuration.

Mounting Elasticsearch configuration filesedit
Create custom config files and bind-mount them over the corresponding files in the Docker image. For example, to bind-mount custom_elasticsearch.yml with docker run, specify:

-v full_path_to/custom_elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml
The container runs Elasticsearch as user elasticsearch using uid:gid 1000:0. Bind mounted host directories and files must be accessible by this user, and the data and log directories must be writable by this user.

Mounting an Elasticsearch keystoreedit
By default, Elasticsearch will auto-generate a keystore file for secure settings. This file is obfuscated but not encrypted. If you want to encrypt your secure settings with a password, you must use the elasticsearch-keystore utility to create a password-protected keystore and bind-mount it to the container as /usr/share/elasticsearch/config/elasticsearch.keystore. In order to provide the Docker container with the password at startup, set the Docker environment value KEYSTORE_PASSWORD to the value of your password. For example, a docker
run command might have the following options:

-v full_path_to/elasticsearch.keystore:/usr/share/elasticsearch/config/elasticsearch.keystore
-E KEYSTORE_PASSWORD=mypassword
Using custom Docker imagesedit
In some environments, it might make more sense to prepare a custom image that contains your configuration. A Dockerfile to achieve this might be as simple as:

FROM docker.elastic.co/elasticsearch/elasticsearch:7.10.1
COPY --chown=elasticsearch:elasticsearch elasticsearch.yml /usr/share/elasticsearch/config/
You could then build and run the image with:

docker build --tag=elasticsearch-custom .
docker run -ti -v /usr/share/elasticsearch/data elasticsearch-custom
Some plugins require additional security permissions. You must explicitly accept them either by:

Attaching a tty when you run the Docker image and allowing the permissions when prompted.
Inspecting the security permissions and accepting them (if appropriate) by adding the --batch flag to the plugin install command.
See Plugin management for more information.

Next stepsedit
You now have a test Elasticsearch environment set up. Before you start serious development or go into production with Elasticsearch, you must do some additional setup:

Learn how to configure Elasticsearch.
Configure important Elasticsearch settings.
Configure important system settings.
```

#### 2.1.4.3 Elasticsearch terminology

```text
index - noun. like DB table. unique name identifier. Elasticsearch will auto create an index for new documents
indexes are Lucene indexes saved on disk.
verb. proces of writing a document to an index

type - a deprecated concept. since ver. 6.0.

mapping - Defenition how to write the index for a document. like a schema. will be auto generated when not specified.

documents - json objects. encoureged to have _id which will be used as primary-key

field - key-value pair

node - single instance

cluster - 1 or more nodes working as one

shard - horizontal partition of DB. they would be Lucene indexes spread over different nodes

replica - for HA and fault tolerance shards can be replicated 

analyzer -  the document processing steps for index creation are.
a. character filter. preprocess char stream. can add/change/remove special chars. 
example. remove <> in html docs.

b. tokenizer.
input - char stream
output - tokens (words)
simple example. line.split() in python.

c. token filter
process a stream of tokens. 
for example remove stop words. change case.  

simple type ex:
{ "male": {"type": "boolean"}

multi field datatype. has more than one type. ex:
{ "country": {
    "type": "text",
    "fields": {
        "type":"keyword",
        "ignore_above": 256
    }
}
}
meaning country can be used as a text field (full search) or as keyword (not indexed)
```

#### 2.1.4.4 modeling for ES

```text
since joins are not supported. Nor refs like in mongo. the way to model relations and hierarchy is by denormalization (e.g. big contain all doc)

Use rest for creating mappings (PUT w/ json payload of mappings)

cd ~/work/courses/sql_nosql_bigdata/rdbms_2_nosql/

mappings:
$ lt movielens/schemas/
total 32
drwxr-xr-x  6 <user>  staff   192B Nov  2 12:18 ../
-rw-r--r--  1 <user>  staff   537B Nov  2 12:18 movie_schema.json
-rw-r--r--  1 <user>  staff   561B Nov  2 12:18 rating_schema.json
-rw-r--r--  1 <user>  staff   763B Nov  2 12:18 tag_schema.json
drwxr-xr-x  6 <user>  staff   192B Nov  2 12:18 ./
-rw-r--r--  1 <user>  staff   314B Nov  2 12:18 user_schema.json

use http put to elasticsearch to use these mappings.

ex:
cat movielens/schemas/rating_schema.json | pbcopy

PUT /ml-ratings

{
	"mappings" : {
		"dynamic" : false,
		"properties" : {
			"userId" : {"type": "long", "store": true},
			"movieId" : {"type": "long", "store": true},
			"title" : {"type" : "text", "store" : true, "index" : true, "analyzer" : "snowball"},
			"year" : {"type" : "short", "store" : true},
			"genres" : {"type" : "keyword", "store": true},
			"rating" : {"type" : "float", "store" : true},
			"ts" : {"type" : "date", "store": true, "format":"dd/MM/yyyy HH:mm"}
		}
	},
	"settings" : {
		"number_of_shards" : 5,
		"number_of_replicas" : 1
	}
}

- list indexes
  GET, /_cat/indices 
```

#### 2.1.4.5 ES CRUD

```text
- first example
 cat creat-index-without-schema.json | pbcopy 
-- posts for creation:
http://localhost:9200/review/1

  {
    "id": 0,
    "country": "Italy",
    "description": "Aromas include tropical fruit, broom, brimstone and dried herb. The palate isn't overly expressive, offering unripened apple, citrus and dried sage alongside brisk acidity.",
    "designation": "Vulkà Bianco",
    "points": 87,
    "price": 0.0,
    "province": "Sicily & Sardinia",
    "region_1": "Etna",
    "region_2": "",
    "taster_name": "Kerin O’Keefe",
    "taster_twitter_handle": "@kerinokeefe",
    "title": "Nicosia 2013 Vulkà Bianco  (Etna)",
    "variety": "White Blend",
    "winery": "Nicosia",
    "active" : true
  }

http://localhost:9200/review/2
  {
    "id": 1,
    "country": "Portugal",
    "description": "This is ripe and fruity, a wine that is smooth while still structured. Firm tannins are filled out with juicy red berry fruits and freshened with acidity. It's  already drinkable, although it will certainly be better from 2016.",
    "designation": "Avidagos",
    "points": 87,
    "price": 15.12,
    "province": "Douro",
    "region_1": "",
    "region_2": "",
    "taster_name": "Roger Voss",
    "taster_twitter_handle": "@vossroger",
    "title": "Quinta dos Avidagos 2011 Avidagos Red (Douro)",
    "variety": "Portuguese Red",
    "winery": "Quinta dos Avidagos",
    "active" : true
  }

http://localhost:9200/review/3
  {
    "id": 2,
    "country": "US",
    "description": "Tart and snappy, the flavors of lime flesh and rind dominate. Some green pineapple pokes through, with crisp acidity underscoring the flavors. The wine was all stainless-steel fermented.",
    "designation": "",
    "points": 87,
    "price": 14.08,
    "province": "Oregon",
    "region_1": "Willamette Valley",
    "region_2": "Willamette Valley",
    "taster_name": "Paul Gregutt",
    "taster_twitter_handle": "@paulgwine",
    "title": "Rainstorm 2013 Pinot Gris (Willamette Valley)",
    "variety": "Pinot Gris",
    "winery": "Rainstorm",
    "active" : true
  }

http://localhost:9200/review/4
  {
    "id": 3,
    "country": "US",
    "description": "Pineapple rind, lemon pith and orange blossom start off the aromas. The palate is a bit more opulent, with notes of honey-drizzled guava and mango giving way to a slightly astringent, semidry finish.",
    "designation": "Reserve Late Harvest",
    "points": 87,
    "price": 13.90,
    "province": "Michigan",
    "region_1": "Lake Michigan Shore",
    "region_2": "",
    "taster_name": "Alexander Peartree",
    "taster_twitter_handle": "",
    "title": "St. Julian 2013 Reserve Late Harvest Riesling (Lake Michigan Shore)",
    "variety": "Riesling",
    "winery": "St. Julian",
    "active" : true
  }

http://localhost:9200/review/5
  {
    "id": 4,
    "country": "US",
    "description": "Much like the regular bottling from 2012, this comes across as rather rough and tannic, with rustic, earthy, herbal characteristics. Nonetheless, if you think of it as a pleasantly unfussy country wine, it's a good companion to a hearty winter stew.",
    "designation": "Vintner's Reserve Wild Child Block",
    "points": 87,
    "price": 65.50,
    "province": "Oregon",
    "region_1": "Willamette Valley",
    "region_2": "Willamette Valley",
    "taster_name": "Paul Gregutt",
    "taster_twitter_handle": "@paulgwine",
    "title": "Sweet Cheeks 2012 Vintner's Reserve Wild Child Block Pinot Noir (Willamette Valley)",
    "variety": "Pinot Noir",
    "winery": "Sweet Cheeks",
    "active" : true
  }

http://localhost:9200/review/6
  {
    "id": 5,
    "country": "Spain",
    "description": "Blackberry and raspberry aromas show a typical Navarran whiff of green herbs and, in this case, horseradish. In the mouth, this is fairly full bodied, with tomatoey acidity. Spicy, herbal flavors complement dark plum fruit, while the finish is fresh but grabby.",
    "designation": "Ars In Vitro",
    "points": 87,
    "price": 15.99,
    "province": "Northern Spain",
    "region_1": "Navarra",
    "region_2": "",
    "taster_name": "Michael Schachner",
    "taster_twitter_handle": "@wineschach",
    "title": "Tandem 2011 Ars In Vitro Tempranillo-Merlot (Navarra)",
    "variety": "Tempranillo-Merlot",
    "winery": "Tandem",
    "active" : true
  }

http://localhost:9200/review/7
  {
    "id": 6,
    "country": "Italy",
    "description": "Here's a bright, informal red that opens with aromas of candied berry, white pepper and savory herb that carry over to the palate. It's balanced with fresh acidity and soft tannins.",
    "designation": "Belsito",
    "points": 87,
    "price": 16.39,
    "province": "Sicily & Sardinia",
    "region_1": "Vittoria",
    "region_2": "",
    "taster_name": "Kerin O’Keefe",
    "taster_twitter_handle": "@kerinokeefe",
    "title": "Terre di Giurfo 2013 Belsito Frappato (Vittoria)",
    "variety": "Frappato",
    "winery": "Terre di Giurfo",
    "active" : true
  }

http://localhost:9200/review/8
  {
    "id": 7,
    "country": "France",
    "description": "This dry and restrained wine offers spice in profusion. Balanced with acidity and a firm texture, it's very much for food.",
    "designation": "",
    "points": 87,
    "price": 24.85,
    "province": "Alsace",
    "region_1": "Alsace",
    "region_2": "",
    "taster_name": "Roger Voss",
    "taster_twitter_handle": "@vossroger",
    "title": "Trimbach 2012 Gewurztraminer (Alsace)",
    "variety": "Gewürztraminer",
    "winery": "Trimbach",
    "active" : true
  }

http://localhost:9200/review/9
  {
    "id": 8,
    "country": "Germany",
    "description": "Savory dried thyme notes accent sunnier flavors of preserved peach in this brisk, off-dry wine. It's fruity and fresh, with an elegant, sprightly footprint.",
    "designation": "Shine",
    "points": 87,
    "price": 12.99,
    "province": "Rheinhessen",
    "region_1": "",
    "region_2": "",
    "taster_name": "Anna Lee C. Iijima",
    "taster_twitter_handle": "",
    "title": "Heinz Eifel 2013 Shine Gewürztraminer (Rheinhessen)",
    "variety": "Gewürztraminer",
    "winery": "Heinz Eifel",
    "active" : true
  }

http://localhost:9200/review/10
  {
    "id": 9,
    "country": "France",
    "description": "This has great depth of flavor with its fresh apple and pear fruits and touch of spice. It's off dry while balanced with acidity and a crisp texture. Drink now.",
    "designation": "Les Natures",
    "points": 87,
    "price": 27.50,
    "province": "Alsace",
    "region_1": "Alsace",
    "region_2": "",
    "taster_name": "Roger Voss",
    "taster_twitter_handle": "@vossroger",
    "title": "Jean-Baptiste Adam 2012 Les Natures Pinot Gris (Alsace)",
    "variety": "Pinot Gris",
    "winery": "Jean-Baptiste Adam",
    "active" : true
  }

http://localhost:9200/review/11
  {
    "id": 10,
    "country": "US",
    "description": "Soft, supple plum envelopes an oaky structure in this Cabernet, supported by 15% Merlot. Coffee and chocolate complete the picture, finishing strong at the end, resulting in a value-priced wine of attractive flavor and immediate accessibility.",
    "designation": "Mountain Cuvée",
    "points": 87,
    "price": 19.99,
    "province": "California",
    "region_1": "Napa Valley",
    "region_2": "Napa",
    "taster_name": "Virginie Boone",
    "taster_twitter_handle": "@vboone",
    "title": "Kirkland Signature 2011 Mountain Cuvée Cabernet Sauvignon (Napa Valley)",
    "variety": "Cabernet Sauvignon",
    "winery": "Kirkland Signature",
    "active" : true
  }

http://localhost:9200/review/12
  {
    "id": 11,
    "country": "France",
    "description": "This is a dry wine, very spicy, with a tight, taut texture and strongly mineral character layered with citrus as well as pepper. It's a food wine with its almost crisp aftertaste.",
    "designation": "",
    "points": 87,
    "price": 30.00,
    "province": "Alsace",
    "region_1": "Alsace",
    "region_2": "",
    "taster_name": "Roger Voss",
    "taster_twitter_handle": "@vossroger",
    "title": "Leon Beyer 2012 Gewurztraminer (Alsace)",
    "variety": "Gewürztraminer",
    "winery": "Leon Beyer",
    "active" : true
  }

http://localhost:9200/review/13
  {
    "id": 12,
    "country": "US",
    "description": "Slightly reduced, this wine offers a chalky, tannic backbone to an otherwise juicy explosion of rich black cherry, the whole accented throughout by firm oak and cigar box.",
    "designation": "",
    "points": 87,
    "price": 34.00,
    "province": "California",
    "region_1": "Alexander Valley",
    "region_2": "Sonoma",
    "taster_name": "Virginie Boone",
    "taster_twitter_handle": "@vboone",
    "title": "Louis M. Martini 2012 Cabernet Sauvignon (Alexander Valley)",
    "variety": "Cabernet Sauvignon",
    "winery": "Louis M. Martini",
    "active" : true
  }

- Get documents
http://localhost:9200/<index>/<type>/<id>
ex: http://localhost:9200/review/1/12
get all: http://localhost:9200/review/_search
count: http://localhost:9200/review/_count

- update. use PUT w/ the updated body
ex: http://localhost:9200/review/1/12

- delete, use DELETE method

- get/delete index. GET/DELETE on index.
  ex: http://localhost:9200/review
```

#### 2.1.4.6 ES search queries

```text
entry point _search: http://localhost:9200/review/_search
for count, use _count.
$ cat movielens/movielens_query.json | pbcopy
//general format for query DSL 
{
	"query": {},
	"from": 0,
	"size": 20, 
	"sort" : [...],
	"_source": [...],
	"min_score" : ...,
	...
}



main query types:
//////////////////////////
///// TERM QUERIES
///// FULL TEXT QUERIES
///// COMPOUND QUERIES
///// AGGREGATE QUERIES
//////////////////////////
```

#### 2.1.4.6.1 //term based query

```text
//for numbers, dates, and enums as the query strings are not analyzed
//matching is done by exactness comparison
{
  "query": {
    "term" : {
      "genres" : "Action"
    }
  }
}

//matching more than one term at a time
{
  "query": {
  	"terms" : {
  		"genres" : ["Action", "Adventure"]
  	}
  }
}

//matching a range of values
{
  "query": {
  	"range" : {
  		"year" : {
            "gte" : 1998,
            "lte" : 2001
        }
  	}
  }
}

//we also have exist, prefix, wildcard, regexp, etc.
```

#### 2.1.4.6.2 ////////////////////////full-text query

```text
//match all. all documents for which the pass predicate is true
{
	"query": {
		"match_all": {}
	}
}

//match none. all documents for which the pass predicate is false
{
	"query": {
		"match_none": {}
	}
}

//match. unless otherwise specified will use same analyzer as in mapping. multiple words treated as or
{
	"query": {
		"match": {
			"title" : "awesome light"
		}
	}
}

//match_phrase. multiple words are search in exact order
{
	"query": {
		"match_phrase": {
			"tag" : "super hero"
		}
	}
}

//multi match. Match against more than one property 
{
	"query": {
		"multi_match": {
			"query" : "awesome light",
			"fields" : ["genres", "tag", "title"]
		}
	}
}

//query_string
//this is where you play by Lucene's rules and syntaxt
{
	"query": {
		"query_string": {
			"default_field" : "title",
			"query" : "title:romance^2 +tag:lovely"
		}
	}
}
```

#### 2.1.4.6.3 //Compound queries

```text
//these are queries that can contain other simple or compound queries
//use them when you want near-precision search results with 
//very specific search using complex rules

//we will look at only the bool query which is quite popular
{
  "query": {
    "bool": {
      "must": [...],
      "should": [...],
      "must_not": [...],
      "filter": [...]
    }
  }
}
// example
{
  "query": {
    "bool": {
      "must": [
      	{
      		"match_all": {}	
      	}
      ],
      "should": [
      	{
      		"match_phrase": {
      			"tag" : "super heroes"
      		}	
      	}
      ],
      "must_not": [
      	{
      		"match_none": {}	
      	}
      ],
      "filter": [
      	{
      		"terms" : {
      			"genres" : ["Action", "Adventure", "Sci-Fi", "Comedy"]
      		}
      	},
      	{
      		"range" : {
      			"year" : {
	      			"gte" : 1990,
	      			"lte" : 2000
	      		}
      		}
      	}
      ]
    }
  }
}

// other compound query opertion include constant_score, function_score, and much more.
```

#### 2.1.4.6.3 aggregation queries

```text
cat movielens/movielens_analytical_query.json | pbcopy

                //the general structure of aggregation query is 
{
	"query": { … },
	"aggregations" : { … }
}

//we already seen query in action, so lets focus on aggregations
//the value of aggregations should follow this format
{
	"<aggregation_name>" : {
        "<aggregation_type>" : {
            <aggregation_body>
        }
        [,"aggregations" : { [<sub_aggregation>]+ } ]?
    },
	"<aggregation_name_2>" : {
        "<aggregation_type>" : {
            <aggregation_body>
        }
        [,"aggregations" : { [<sub_aggregation_2>]+ } ]?
    }
}

//////////////////////////
///// BUCKETING
///// METRICS
///// MATRIX
///// PIPELINE
//////////////////////////

//BUCKETING EXAMPLE
{
	"query" : {
		"match_all" : {}
    },
    "size" : 0,
    "aggregations" : {
        "genre_hist_counting" : {
            "terms" : { 
                "field" : "genres",
                "size"  : 15
            } 
        }
    }
}


//METRIC EXAMPLE
{
	"query" : {
		"match_all" : {}
    },
    "size" : 0,
    "aggregations" : {
        "genre_hist_counting" : {
            "terms" : { 
                "field" : "genres",
                "size"  : 20
            }, 
            "aggregations" : {
                "statistics" : {
                    "stats" : { 
                        "field" : "rating"
                    } 
                }
            }
        }
    }
}


                2.1.4.6.4
```

#### 2.1.4.7 ELK stack

```text
ELK - Elasticsearch, logstash, Kibana

docker pull elasticsearch:7.10.1
docker network create elknetwork
docker run -d --name elasticsearch --net elknetwork -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" elasticsearch:7.10.1

docker pull logstash:7.10.1
docker pull kibana:7.10.1
docker run -d --name kibana --link elasticsearch:elasticsearch --net elknetwork -p 5601:5601 kibana:7.10.1

$  docker logs --follow kibana
...
{"type":"log","@timestamp":"2020-12-13T16:01:34Z","tags":["listening","info"],"pid":7,"message":"Server running at http://0:5601"}
{"type":"log","@timestamp":"2020-12-13T16:01:35Z","tags":["info","http","server","Kibana"],"pid":7,"message":"http server running at http://0:5601"}
{"type":"log","@timestamp":"2020-12-13T16:01:37Z","tags":["warning","plugins","reporting"],"pid":7,"message":"Enabling the Chromium sandbox provides an additional layer of protection."}

http://localhost:5601/ - access kibana
```

#### 2.1.4.8 UFO sightings demo

```text
files:
/Users/<user>/work/courses/sql_nosql_bigdata/rdbms_2_nosql/elasticsearch/ufo

mapping:
$ cat ufo_mappings.json | pbcopy
//create the ufo mapping
PUT http://localhost:9200/ufo, use postman or $ curl --location --request PUT 'http://localhost:9200/ufo
' \
--header 'Content-Type: application/json' \
--data-raw '<the json mapping>'
mapping:
{
	"mappings" : {
		"properties" : {
			"datetime" : {"type": "date", "store": true, "format": "M/d/yyyy HH:mm"},
			"city" : {"type":"keyword", "store": true},
			"state" : {"type":"keyword", "store": true},
			"country" : {"type":"keyword", "store": true},
			"shape" : {"type":"keyword", "store": true},
			"duration_in_sec" : {"type" : "integer","store": true},
			"duration_in_hrs_mins" : {"type" : "text", "store" : false, "index":"false"},
			"comments" : {"type":"text", "store": true, "index":"true", "analyzer" : "snowball"},
			"date_posted" : {"type" : "date", "store" : true, "format":"M/d/yyyy", "ignore_malformed": "true"},
			"location" : {"type" : "geo_point", "ignore_malformed" : true}
		}
	},
	"settings" : {
		"number_of_shards" : 2,
		"number_of_replicas" : 1,
		"index" : {
			"analysis" : {
				"analyzer" : {
					"like_keyword_analyzer" : {
						"type" : "custom",
						"tokenizer" : "keyword",
						"filters" :  ["lowercase"]
					}
				}
			}
		}
	}
}

index creation response:
{
    "acknowledged": true,
    "shards_acknowledged": true,
    "index": "ufo\n"
}

//index a document into the ufo index and sighting type
{
	"datetime" : "10/10/1996 22:30",
	"city" : "monroe county",
	"state" : "oh",
	"country" : "us",
	"shape" : "cylinder",
	"duration_in_sec" : 60,
	"duration_in_hrs_mins" : "1 minute",
	"comments" : "Looked like it went through the hillside",
	"date_posted" : "7/8/2004",
	"latitude" : 39.4402778,
	"longitude" : -84.3622222
}

//write a scala application that will convert the complete.csv file to a json file for bulk import

the json file for bulk upload has 2 lines per entry. one for the index and one for the actuall data.
file:
$ ls complete.es.zip


//unzip and upload
curl -XPOST 'localhost:9200/_bulk?pretty' -H "Content-Type: application/json" --data-binary @complete.es.json

response:
...
    {
      "index" : {
        "_index" : "ufo",
        "_type" : "_doc",
        "_id" : "88875",
        "_version" : 1,
        "result" : "created",
        "_shards" : {
          "total" : 2,
          "successful" : 1,
          "failed" : 0
        },
        "_seq_no" : 88843,
        "_primary_term" : 1,
        "status" : 201
      }
    }
  ]
}

in kibana, create space, http://localhost:5601/app/management/kibana/spaces/create.
call it ufo
create index pattern
in index pattern name set ufo

now, you can discover and visualize.
example visualization:
choose new visualization -> horizontal bar -> source: ufo -> 
metrics. y-axis no change
buckets -> x-axis -> aggregations: term -> histogram ->



            2.1.4.9

id=__Wide_column_store__
```
