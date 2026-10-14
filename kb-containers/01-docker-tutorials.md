---
type: reference
title: Docker tutorials
description: Section 1 of the legacy containers-kb notes.
tags: [kb-containers]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "containers-kb#1"
---

# Docker tutorials

[↑ containers-kb](/kb-containers/README.md)

## 1.1 tutorialspoint

```text
https://www.tutorialspoint.com/docker/docker_overview.htm

        1.1.1  
```

## 1.2 https://docs.docker.com/docker-for-mac/

### 1.2.1 get-started

```text
    $ docker run hello-world

Hello from Docker!
This message shows that your installation appears to be working correctly.

|  To generate this message, Docker took the following steps:
|   1. The Docker client contacted the Docker daemon.
|   2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
|      (amd64)
|   3. The Docker daemon created a new container from that image which runs the
|      executable that produces the output you are currently reading.
|   4. The Docker daemon streamed that output to the Docker client, which sent it
|      to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/

 Start a Dockerized web server. Like the hello-world image above, if the image is not found locally, Docker pulls it from Docker Hub.

$ docker run --detach --publish=80:80 --name=webserver nginx

View the details on the container while your web server is running (with docker container ls or docker ps):

$ docker container ls
CONTAINER ID   IMAGE   COMMAND                  CREATED              STATUS              PORTS                         NAMES
56f433965490   nginx   "nginx -g 'daemon off"   About a minute ago   Up About a minute   0.0.0.0:80->80/tcp, 443/tcp   webserver
Stop and remove containers and images with the following commands. Use the “all” flag (--all or -a) to view stopped containers.

$ docker container ls
$ docker container stop webserver
$ docker container ls -a
$ docker container rm webserver
$ docker image ls
$ docker image rm nginx
```

### 1.2.2 Compile and Run GCC

```text
$ cat Dockerfile 
FROM gcc:4.9
COPY . /usr/src/getc
WORKDIR /usr/src/getc
RUN gcc -o getc getc.c
CMD ["./getc"]

docker build -t my-gcc-app .
        docker run --rm -v "$PWD":/usr/src/getc -w /usr/src/getc gcc:4.9 gcc -o getc getc.c

get shell of running docker
$ docker run -it gcc /bin/bash
```

### 1.2.3 Docker CLI

#### 1.2.3.1 important flags

#### 1.2.3.1.1 --rm

```text
remove container after it completes
```

#### 1.2.3.1.2 --itd

```text
-d , detached, run in background
-t, tty (terminal) 
-i, interactive, wire host stdin to container
```

#### 1.2.3.1.3 -it

```text
run interactive with terminal in container
```

#### 1.2.3.1.4 exec -it

```text
execute command in container and run interactive with terminal in container
            1.2.3.2

id=run_MongoDB_with_docker_
```

### 1.2.4 run MongoDB with docker

#### 1.2.4.1 https://earthly.dev/blog/mongodb-docker/

```text
Docker is a powerful development platform that enables users to containerize software. These containers can be run on any machine, as well as in a public or private cloud. Thanks to Docker’s lightweight runtime and ability to run processes in isolation, multiple containers can run at the same time on the same VM or server.

MongoDB is a NoSQL database service with seamless performance and options for scaling. It uses a JSON-like storage model and doesn’t require a predefined database schema. In the real world, much data is unstructured—it doesn’t follow a specific schema. NoSQL databases are useful for storing such data. You can just input the data, and new fields will be created. You can also leave fields empty in situations where a lot of data is missing.

MongoDB can be run in a Docker container. There is an official image available on Docker Hub containing the MongoDB community edition, used in development environments. For production, you may custom-build a container with MongoDB’s enterprise version.

If you want to use your MongoDB database across several machines, using Docker containers for hosting MongoDB is a great approach – you can easily create new isolated instances. Furthermore, during development, it is easier to start a Docker instance than manually configure a server. If you are developing multiple applications, you can start multiple containers together using a docker-compose.yaml file.

In this article, you’ll learn the best practices for running a MongoDB container. You’ll also learn how to host a simple Flask app and how to use Docker volumes to persist data in a Docker container.
```

#### 1.2.4.1.1 Docker Components

```text
Before diving into implementation details, let’s take a moment to introduce some of Docker’s basic concepts. In a nutshell, Docker containers are stand-alone pieces of software that encapsulate everything needed to run some code, files, dependencies, configurations, and so forth.

The Docker daemon, dockerd, manages Docker containers and handles requests via the Docker Engine API.
```

#### 1.2.4.1.2 Running MongoDB in a Docker Container

```text
For development, it is better to connect to an instance of MongoDB running inside a Docker container locally (instead of a cloud-hosted instance) to save resources. You can pull the latest MongoDB image and run it in a Docker container. For production, the application can connect to a cloud-hosted database using the MongoDB Atlas or MongoDB Enterprise Server.

In development, you will use Docker to host a MongoDB instance locally. Start by pulling the image for the MongoDB version you want by specifying the tag accordingly:
>_$ docker pull mongo:4.0.4

Or You can start a MongoDB server running the latest version of MongoDB using Docker with the following command:

>_docker run -d -p 27017:27017 --name test-mongo mongo:latest
This will pull the latest official image from Docker Hub. Adding the -d flag will ensure that the Docker container runs as a background process, separate from the shell. The -p tag signifies the port that the container port is bound back to 27017. You can connect to MongoDB on localhost:27017.

To change the port number, you can change the -p flag argument to 8000:27017 to use localhost:8000. You can also use the --port flag to mention the post. Using the latest image helps you avoid version bumps. Execute this to run MongoDB on port 8000:

>_docker run -d --name test-mongo mongo:latest --port 8000
Or choose your own port:

>_docker run -d -p 27017:27017 --name example-mongo mongo:latest
Alternatively, if you pulled the image specifying a version tag, run the Docker container with this command:

>_docker run -d --name test-mongo mongo:4.0.4
Then use the following command to open the MongoDB shell. I have used mymongo as an arbitrary container name, though you can replace mymongo with test-mongo or any other container name of your choosing.

>_docker exec -it <CONTAINER_NAME> bash
$ docker ps -a
CONTAINER ID   IMAGE          COMMAND                  CREATED         STATUS                       PORTS                      NAMES
44fc8960722e   mongo:latest   "docker-entrypoint.s…"   2 minutes ago   Up 2 minutes                 0.0.0.0:27017->27017/tcp   test-mongo
$  docker exec -it 44fc8960722e bash 
root@44fc8960722e:/# ls
bin  boot  data  dev  docker-entrypoint-initdb.d  etc  home  js-yaml.js  lib  media  mnt  opt  proc  root  run	sbin  srv  sys	tmp  usr  var
```

#### 1.2.4.2 insided MongoDB bash

```text
The show dbs command will display all your existing databases. Here, you have the admin, config, and local databases, which are empty initially. For details on the different functions that are available from the shell, type “help”. This will provide a list of some of the database methods available, including commands to display the database’s collections and information.
root@44fc8960722e:/# mongo
MongoDB shell version v5.0.11
...
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB

To check your container logs, you can use the docker logs command followed by the name of your container:

>_docker logs test-mongo --follow
```

#### 1.2.4.3 connect from another docker

```text
Once the MongoDB server is running on Docker, you can also run the Flask app in Docker. There is a Dockerfile in the repository containing a set of commands to build a Docker image and run it. In this case, connecting both containers to a shared Docker network is a good idea. This will ensure security, as you will not need to publish MongoDB ports to the host. To create a network and connect the MongoDB container to it, use these commands:

>_docker network create test-network
docker run -d --network test-network --name test-mongo mongo:latest
Your client container should join the test-network, too. Your container will be able to reference the MongoDB container by using the URL test-mongo:27017.
```

#### 1.2.4.4 Persisting Data With Volumes

```text
While running MongoDB in Docker, one of the main challenges is storage. Usually, users want to be able to selectively persist data for containers. A good practice is to use volumes to make sure the data persists even after the container is stopped or the Docker daemon is restarted. By default, the MongoDB image stores its data in the /data/db directory. You can mount a volume to this location to enable data persistence. Use this command to create a container test-mongo with a Docker volume named data-vol mounted on it:

>_docker run -d \
    -p 27017:27017 \
    --name test-mongo \
    -v data-vol:/data/db \
    mongo:latest
If you want to inspect your volumes, you can do so with the docker volume inspect command.

You can check out all the existing volumes to display which volumes are attached to which containers using docker volume ls:

>_> docker volume ls
OutputDRIVER VOLUME NAME
...
local data1
local mongo-data
local new
```

### 1.2.5 Configuring Your Server

```text
If you want to change the default MongoDB configurations, you can use the --config flag to pass a location to a text file with configurations. The configuration file follows the YAML format. Here is the command to specify a certain config location:

>_docker run -d 
    --name test-mongo 
    -v mongo-data:/data/db 
    -v ./mongo.conf:/etc/mongo/mongo.conf
    mongo:latest --config /etc/mongo/mongo.conf
```

### 1.2.6 Security

```text
You can also add authentication to your MongoDB containers to ensure data security. This will disable unauthorized personnel from connecting to your server.

Add your user account by setting the username and password using the environment variables during container creation. Use the -e flag to specify the environment variables MONGODB_INITDB_ROOT_USERNAME and MONGODB_INITDB_ROOT_PASSWORD:

>_docker run -d 
    -p 27017:27017 
    --name test-mongo 
    -v mongo-data:/data/db 
    -e MONGODB_INITDB_ROOT_USERNAME=sample-db-user
    -e MONGODB_INITDB_ROOT_PASSWORD=sample-password 
    mongo:latest
As a result, the database will be started with the user account sample-db-user. This new user will be granted root privileges. As the root user will have access control over everything, it is important to provide a safe password. In this case, you can pass the secrets file location as input to the environment variable MONGODB_INITDB_ROOT_PASSWORD_FILE. Your password will not be visible on using docker inspect to view the container environment variables. To run MongoDB with Docker using your username and password, use the below code:

>_docker run -d 
    -p 27017:27017 
    --name example-mongo 
    -v mongo-data:/data/db 
    -e MONGODB_INITDB_ROOT_USERNAME=example-user 
    -e MONGODB_INITDB_ROOT_PASSWORD_FILE=/run/secrets/mongo-root-pw 
    mongo:latest

        1.2.7
```
