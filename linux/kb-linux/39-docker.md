---
type: reference
title: Docker
description: "Docker introduction, creating containers and cleanup."
tags: [docker, linux, tutorial, howto, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "linux/KB_Linux#39"
---

# Docker

[↑ KB_Linux](/linux/kb-linux/README.md)

## 39.1 Introduction

```text
Docker overview
Estimated reading time: 10 minutes
Docker is an open platform for developing, shipping, and running applications. Docker enables you to separate your applications from your infrastructure so you can deliver software quickly. With Docker, you can manage your infrastructure in the same ways you manage your applications. By taking advantage of Docker’s methodologies for shipping, testing, and deploying code quickly, you can significantly reduce the delay between writing code and running it in production.

The Docker platform
Docker provides the ability to package and run an application in a loosely isolated environment called a container. The isolation and security allow you to run many containers simultaneously on a given host. Containers are lightweight because they don’t need the extra load of a hypervisor, but run directly within the host machine’s kernel. This means you can run more containers on a given hardware combination than if you were using virtual machines. You can even run Docker containers within host machines that are actually virtual machines!

Docker provides tooling and a platform to manage the lifecycle of your containers:

Develop your application and its supporting components using containers.
The container becomes the unit for distributing and testing your application.
When you’re ready, deploy your application into your production environment, as a container or an orchestrated service. This works the same whether your production environment is a local data center, a cloud provider, or a hybrid of the two.
Docker Engine
Docker Engine is a client-server application with these major components:

A server which is a type of long-running program called a daemon process (the dockerd command).

A REST API which specifies interfaces that programs can use to talk to the daemon and instruct it what to do.

A command line interface (CLI) client (the docker command).

Docker Engine Components Flow

The CLI uses the Docker REST API to control or interact with the Docker daemon through scripting or direct CLI commands. Many other Docker applications use the underlying API and CLI.

The daemon creates and manages Docker objects, such as images, containers, networks, and volumes.

Note: Docker is licensed under the open source Apache 2.0 license.
For more details, see Docker Architecture below.

What can I use Docker for?
Fast, consistent delivery of your applications

Docker streamlines the development lifecycle by allowing developers to work in standardized environments using local containers which provide your applications and services. Containers are great for continuous integration and continuous delivery (CI/CD) workflows.

Consider the following example scenario:

Your developers write code locally and share their work with their colleagues using Docker containers.
They use Docker to push their applications into a test environment and execute automated and manual tests.
When developers find bugs, they can fix them in the development environment and redeploy them to the test environment for testing and validation.
When testing is complete, getting the fix to the customer is as simple as pushing the updated image to the production environment.
Responsive deployment and scaling

Docker’s container-based platform allows for highly portable workloads. Docker containers can run on a developer’s local laptop, on physical or virtual machines in a data center, on cloud providers, or in a mixture of environments.

Docker’s portability and lightweight nature also make it easy to dynamically manage workloads, scaling up or tearing down applications and services as business needs dictate, in near real time.

Running more workloads on the same hardware

Docker is lightweight and fast. It provides a viable, cost-effective alternative to hypervisor-based virtual machines, so you can use more of your compute capacity to achieve your business goals. Docker is perfect for high density environments and for small and medium deployments where you need to do more with fewer resources.

Docker architecture
Docker uses a client-server architecture. The Docker client talks to the Docker daemon, which does the heavy lifting of building, running, and distributing your Docker containers. The Docker client and daemon can run on the same system, or you can connect a Docker client to a remote Docker daemon. The Docker client and daemon communicate using a REST API, over UNIX sockets or a network interface.

Docker Architecture Diagram

The Docker daemon
The Docker daemon (dockerd) listens for Docker API requests and manages Docker objects such as images, containers, networks, and volumes. A daemon can also communicate with other daemons to manage Docker services.

The Docker client
The Docker client (docker) is the primary way that many Docker users interact with Docker. When you use commands such as docker run, the client sends these commands to dockerd, which carries them out. The docker command uses the Docker API. The Docker client can communicate with more than one daemon.

Docker registries
A Docker registry stores Docker images. Docker Hub is a public registry that anyone can use, and Docker is configured to look for images on Docker Hub by default. You can even run your own private registry. If you use Docker Datacenter (DDC), it includes Docker Trusted Registry (DTR).

When you use the docker pull or docker run commands, the required images are pulled from your configured registry. When you use the docker push command, your image is pushed to your configured registry.

Docker objects
When you use Docker, you are creating and using images, containers, networks, volumes, plugins, and other objects. This section is a brief overview of some of those objects.

IMAGES

An image is a read-only template with instructions for creating a Docker container. Often, an image is based on another image, with some additional customization. For example, you may build an image which is based on the ubuntu image, but installs the Apache web server and your application, as well as the configuration details needed to make your application run.

You might create your own images or you might only use those created by others and published in a registry. To build your own image, you create a Dockerfile with a simple syntax for defining the steps needed to create the image and run it. Each instruction in a Dockerfile creates a layer in the image. When you change the Dockerfile and rebuild the image, only those layers which have changed are rebuilt. This is part of what makes images so lightweight, small, and fast, when compared to other virtualization technologies.

CONTAINERS

A container is a runnable instance of an image. You can create, start, stop, move, or delete a container using the Docker API or CLI. You can connect a container to one or more networks, attach storage to it, or even create a new image based on its current state.

By default, a container is relatively well isolated from other containers and its host machine. You can control how isolated a container’s network, storage, or other underlying subsystems are from other containers or from the host machine.

A container is defined by its image as well as any configuration options you provide to it when you create or start it. When a container is removed, any changes to its state that are not stored in persistent storage disappear.

Example docker run command

The following command runs an ubuntu container, attaches interactively to your local command-line session, and runs /bin/bash.

$ docker run -i -t ubuntu /bin/bash
When you run this command, the following happens (assuming you are using the default registry configuration):

If you do not have the ubuntu image locally, Docker pulls it from your configured registry, as though you had run docker pull ubuntu manually.

Docker creates a new container, as though you had run a docker container create command manually.

Docker allocates a read-write filesystem to the container, as its final layer. This allows a running container to create or modify files and directories in its local filesystem.

Docker creates a network interface to connect the container to the default network, since you did not specify any networking options. This includes assigning an IP address to the container. By default, containers can connect to external networks using the host machine’s network connection.

Docker starts the container and executes /bin/bash. Because the container is running interactively and attached to your terminal (due to the -i and -t flags), you can provide input using your keyboard while the output is logged to your terminal.

When you type exit to terminate the /bin/bash command, the container stops but is not removed. You can start it again or remove it.

SERVICES

Services allow you to scale containers across multiple Docker daemons, which all work together as a swarm with multiple managers and workers. Each member of a swarm is a Docker daemon, and the daemons all communicate using the Docker API. A service allows you to define the desired state, such as the number of replicas of the service that must be available at any given time. By default, the service is load-balanced across all worker nodes. To the consumer, the Docker service appears to be a single application. Docker Engine supports swarm mode in Docker 1.12 and higher.

The underlying technology
Docker is written in Go and takes advantage of several features of the Linux kernel to deliver its functionality.

Namespaces
Docker uses a technology called namespaces to provide the isolated workspace called the container. When you run a container, Docker creates a set of namespaces for that container.

These namespaces provide a layer of isolation. Each aspect of a container runs in a separate namespace and its access is limited to that namespace.

Docker Engine uses namespaces such as the following on Linux:

The pid namespace: Process isolation (PID: Process ID).
The net namespace: Managing network interfaces (NET: Networking).
The ipc namespace: Managing access to IPC resources (IPC: InterProcess Communication).
The mnt namespace: Managing filesystem mount points (MNT: Mount).
The uts namespace: Isolating kernel and version identifiers. (UTS: Unix Timesharing System).
Control groups
Docker Engine on Linux also relies on another technology called control groups (cgroups). A cgroup limits an application to a specific set of resources. Control groups allow Docker Engine to share available hardware resources to containers and optionally enforce limits and constraints. For example, you can limit the memory available to a specific container.

Union file systems
Union file systems, or UnionFS, are file systems that operate by creating layers, making them very lightweight and fast. Docker Engine uses UnionFS to provide the building blocks for containers. Docker Engine can use multiple UnionFS variants, including AUFS, btrfs, vfs, and DeviceMapper.

Container format
Docker Engine combines the namespaces, control groups, and UnionFS into a wrapper called a container format. The default container format is libcontainer. In the future, Docker may support other container formats by integrating with technologies such as BSD Jails or Solaris Zones.
```

### 39.1.1 First steps

```text
install (for mac there's a dmg, you'll need to create an account)
login and give permission

DL and run a hello-world docker:
docker run hello-world 

list local dockers:
docker ps -a
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS                     PORTS               NAMES
a64e38b59914        ubuntu              "bash"              7 minutes ago       Exited (0) 7 minutes ago                       cranky_swartz
d9152c5c2208        hello-world         "/hello"            8 minutes ago       Exited (0) 8 minutes ago                       hungry_banach

search containers:
https://hub.docker.com/


list images
$ docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
ubuntu              latest              94e814e2efa8        7 days ago          88.9MB
hello-world         latest              fce289e99eb9        2 months ago        1.84kB

remove a container
docker rm container-id

remove all containers
docker rm $(docker ps -a -f status=exited -q)

create an ubunto docker, enter interactive shell, set its name, tie a volume to a local dir and set to remove container after exit:
docker run -it --name myUbuntu --rm -v ~/temp/docker:localtmp ubuntu bash
```

### 39.1.2 Create a container

```text
a. create a Dockerfile
$ cat !$
cat Dockerfile
FROM ubuntu
CMD echo "hello yosi from your first docker container"

b. build container
$ docker build -t my_first_container .
Sending build context to Docker daemon  2.048kB
Step 1/2 : FROM ubuntu
 ---> 94e814e2efa8
Step 2/2 : CMD echo "hello yosi from your first docker container"
 ---> Running in 29ddc1044d59
Removing intermediate container 29ddc1044d59
 ---> d6d436542d41
Successfully built d6d436542d41
Successfully tagged my_first_container:latest

run it:
$ docker run my_first_container
hello yosi from your first docker container

c.
```

### 39.1.3 cleanup

#### 39.1.3.1 How To Remove Docker Containers, Images, Volumes, and Networks

```text
https://linuxize.com/post/how-to-remove-docker-images-containers-volumes-and-networks/

Docker allows you to quickly build, test, and deploy applications as portable, self-sufficient containers that can run virtually anywhere.

Docker doesn’t remove unused objects such as containers, images, volumes, and networks unless you explicitly tell it to do so. As you work with Docker, you can easily accumulate a large number of unused objects that consume significant disk space and clutter the output produced by the Docker commands.

This guide serves as a “cheat sheet” to help Docker users keep their system organized, and to free disk space by removing unused Docker containers, images, volumes, and networks.
```

#### 39.1.3.1.1 Removing All Unused Objects

```text
The docker system prune command will remove all stopped containers, all dangling images, and all unused networks:

docker system prune
You’ll be prompted to continue, use the -f or --force flag to bypass the prompt.


WARNING! This will remove:
        - all stopped containers
        - all networks not used by at least one container
        - all dangling images
        - all build cache
Are you sure you want to continue? [y/N]
If you also want to remove all unused volumes, pass the --volumes flag:

docker system prune --volumes
WARNING! This will remove:
        - all stopped containers
        - all networks not used by at least one container
        - all volumes not used by at least one container
        - all dangling images
        - all build cache
Are you sure you want to continue? [y/N] y
```

#### 39.1.3.1.2 Removing Docker Containers

```text
Docker containers are not automatically removed when you stop them unless you start the container using the --rm flag.


Remove one or more containers

To remove one or more Docker images use the docker container rm command followed by the ID of the containers you want to remove.

You can get a list of all containers by passing the -a flag to the docker container ls command:

docker container ls -a
The output should look something like this:

CONTAINER ID        IMAGE                   COMMAND                  CREATED             STATUS                      PORTS               NAMES
cc3f2ff51cab        centos                  "/bin/bash"              2 months ago        Created                                         competent_nightingale
cd20b396a061        solita/ubuntu-systemd   "/bin/bash -c 'exec …"   2 months ago        Exited (137) 2 months ago                       systemd
fb62432cf3c1        ubuntu                  "/bin/bash"              3 months ago        Exited (130) 3 months ago                       jolly_mirzakhani
Once you know the CONTAINER ID of the containers you want to delete, pass it to the docker container rm command. For example, to remove the first two containers listed in the output above run:

docker container rm cc3f2ff51cab cd20b396a061
If you get an error similar to the following, it means that the container is running. You’ll need to stop the container before removing it.


Error response from daemon: You cannot remove a running container fc983ebf4771d42a8bd0029df061cb74dc12cb174530b2036987575b83442b47. Stop the container before attempting removal or force remove.
Remove all stopped containers

Before performing the removal command, you can get a list of all non-running (stopped) containers that will be removed using the following command:

docker container ls -a --filter status=exited --filter status=created 
To remove all stopped containers use the docker container prune command:

docker container prune
You’ll be prompted to continue, use the -f or --force flag to bypass the prompt.

WARNING! This will remove all stopped containers.
Are you sure you want to continue? [y/N] y
Remove containers using filters

The docker container prune command allows you to remove containers based on condition using the filtering flag --filter.


At the time of the writing of this article, the currently supported filters are until and label. You can use more than one filter by using multiple --filter flags.

For example, to remove all images that are created more than 12 hours ago, run:

docker container prune --filter "until=12h"
Stop and remove all containers

You can get a list of all Docker containers on your system using the docker container ls -aq command.

To stop all running containers use the docker container stop command followed by a list of all containers IDs.

docker container stop $(docker container ls -aq)
Once all containers are stopped, you can remove them using the docker container rm command followed by the containers ID list.


docker container rm $(docker container ls -aq)
```

#### 39.1.3.1.3 Removing Docker Images

```text
Remove one or more images

To remove one or more Docker images use the docker images ls command to find the ID of the images you want to remove.


docker image ls
The output should look something like this:

REPOSITORY              TAG                 IMAGE ID            CREATED             SIZE
centos                  latest              75835a67d134        7 days ago          200MB
ubuntu                  latest              2a4cca5ac898        2 months ago        111MB
linuxize/fedora         latest              a45d6dca3361        3 months ago        311MB
java                    8-jre               e44d62cf8862        3 months ago        311MB
Once you’ve located the images you want to remove, pass their IMAGE ID to the docker image rm command. For example, to remove the first two images listed in the output above run:

docker image rm 75835a67d134 2a4cca5ac898
If you get an error similar to the one shown below, it means that an existing container uses the image. To remove the image, you will have to remove the container first.

Error response from daemon: conflict: unable to remove repository reference "centos" (must force) - container cd20b396a061 is using its referenced image 75835a67d134
Copy
Remove dangling images

Docker provides a docker image prune command that can be used to remove dangled and unused images.


A dangling image is an image that is not tagged and is not used by any container. To remove dangling images type:

docker image prune
You’ll be prompted to continue, use the -f or --force flag to bypass the prompt.

WARNING! This will remove all dangling images.
Are you sure you want to continue? [y/N] y
When removing dangling images, if the images build by you are not tagged, they will be removed too.
Remove all unused images

To remove all images which are not referenced by any existing container, not just the dangling ones, use the prune command with the -a flag:

docker image prune -a
WARNING! This will remove all images without at least one container associated to them.
Are you sure you want to continue? [y/N] y
Remove images using filters

With the docker image prune command, you can also remove images based on a certain condition using the filtering flag --filter.

At the time of the writing of this article, the currently supported filters are until and label. You can use more than one filter by using multiple --filter flags.


For example, to remove all images that are created more than 12 hours ago, you would run:

docker image prune -a --filter "until=12h"
```

#### 39.1.3.1.4 Removing Docker Volumes

```text
Remove one or more volumes

To remove one or more Docker volumes use the docker volume ls command to find the ID of the volumes you want to remove.

docker volume ls
The output should look something like this:

DRIVER              VOLUME NAME
local               4e12af8913af888ba67243dec78419bf18adddc3c7a4b2345754b6db64293163
local               terano
Once you’ve found the VOLUME NAME of the volumes you want to remove, pass them to the docker volume rm command. For example, to remove the first volume listed in the output above, run:

docker volume rm 4e12af8913af888ba67243dec78419bf18adddc3c7a4b2345754b6db64293163
If you get an error similar to the one shown below, it means that an existing container uses the volume. To remove the volume, you will have to remove the container first.

Error response from daemon: remove 4e12af8913af888ba67243dec78419bf18adddc3c7a4b2345754b6db64293163: volume is in use - [c7188935a38a6c3f9f11297f8c98ce9996ef5ddad6e6187be62bad3001a66c8e]
Copy
Remove all unused volumes

To remove all unused volumes use the docker image prune command:

docker volume prune
You’ll be prompted to continue, use the -f or --force flag to bypass the prompt.

WARNING! This will remove all local volumes not used by at least one container.
Are you sure you want to continue? [y/N]
```

#### 39.1.3.1.5 Removing Docker Networks

```text
Remove one or more networks

To remove one or more Docker networks use the docker network ls command to find the ID of the networks you want to remove.

docker network ls
The output should look something like this:

NETWORK ID          NAME                DRIVER              SCOPE
107b8ac977e3        bridge              bridge              local
ab998267377d        host                host                local
c520032c3d31        my-bridge-network   bridge              local
9bc81b63f740        none                null                local
Once you’ve located the networks you want to remove, pass their NETWORK ID to the docker network rm command. For example to remove the network with the name my-bridge-network run:

docker network rm c520032c3d31
If you get an error similar to the one shown below, it means that an existing container uses the network. To remove the network you will have to remove the container first.

Error response from daemon: network my-bridge-network id 6f5293268bb91ad2498b38b0bca970083af87237784017be24ea208d2233c5aa has active endpoints
Copy
Remove all unused network

Use the docker network prune command to remove all unused networks.

docker network prune
You’ll be prompted to continue, use the -f or --force flag to bypass the prompt.

WARNING! This will remove all networks not used by at least one container.
Are you sure you want to continue? [y/N] 
Remove networks using filters

With the docker network prune command you can remove networks based on condition using the filtering flag --filter.

At the time of the writing of this article, the currently supported filters are until and label. You can use more than one filter by using multiple --filter flags.

For example, to remove all networks that are created more than 12 hours ago, run:

docker network prune -a --filter "until=12h"
```

#### 39.1.3.1.6 Conclusion

```text
In this guide, we have shown you some of the common commands for removing Docker containers, images, volumes, and networks.

You should also check out the official Docker documentation.

If you have any questions, please leave a comment below.

                39.1.3.1.7
            39.1.3.2
        39.1.4
```

## 39.2 Cheatsheet

```text
/Users/<user>/work/code/cheatsheets/awesome-cheatsheets/tools/docker.sh

$ docker run -it --name myUbuntu --rm -v ~/temp/docker:/localtmp ubuntu bash
root@8c3d6e5fe918:/# ls localtmp/
```

## 39.3 docker-compose

### 39.3.1 intro

#### 39.3.1.1 https://docs.docker.com/compose/

```text
Compose is a tool for defining and running multi-container Docker applications. With Compose, you use a YAML file to configure your application’s services. Then, with a single command, you create and start all the services from your configuration. To learn more about all the features of Compose, see the list of features.

Compose works in all environments: production, staging, development, testing, as well as CI workflows. You can learn more about each case in Common Use Cases.

Using Compose is basically a three-step process:

Define your app’s environment with a Dockerfile so it can be reproduced anywhere.

Define the services that make up your app in docker-compose.yml so they can be run together in an isolated environment.

Run docker-compose up and Compose starts and runs your entire app.

A docker-compose.yml looks like this:

version: '3'
services:
  web:
    build: .
    ports:
    - "5000:5000"
    volumes:
    - .:/code
    - logvolume01:/var/log
    links:
    - redis
  redis:
    image: redis
volumes:
  logvolume01: {}
```

#### 39.3.1.2 https://hackernoon.com/practical-introduction-to-docker-compose-d34e79c4c2b6

```text
A Practical Introduction to Docker Compose

TL;DR
Docker containers opened a world of possibilities for the tech community, hassles in setting up new software were decreased unlike old times when a mess was to be sorted by a grievous format, it reduced the time to set up and use new software which eventually played a big part for techies to learn new things, roll it out in a container and scrap it when done. Things became easy, and the best thing its open source anyone and everyone can use it, comes with a little learning curve though.

Out of the myriad possibilities was the possibility of implementing complex technology stacks for our applications, which previously would have been the domain of experts. Today with the help of containers software engineers with sound understanding of the underlying systems can implement a complex stack and why not it’s the need of the hour, the figure of speech “Jack of all trades” got a fancy upgrade; “Master of some” based on the needs of the age. Simply put “T” shaped skills.

The possibility of defining a complex stack in a file and running it with a single command, pretty tempting huh. The guys at Docker Inc. choose to call it Docker compose.


In this article, we will use Docker’s example Voting App and deploy it using Docker compose.

Docker Compose
In the words of Docker Inc.

Compose is a tool for defining and running multi-container Docker applications. With Compose, you use a YAML file to configure your application’s services. Then, with a single command, you create and start all the services from your configuration.
The Voting App
Introducing the most favourite demonstration app for the Docker community “The Voting App”, as if it needs an introduction at all. This is a simple application based on micro-services architecture, consisting of 5 simple services.


Voting app architecture [https://github.com/docker/example-voting-app]
Voting-App: Frontend of the application written in Python, used by users to cast their votes.
Redis: In-memory database, used as intermediate storage.
Worker: .Net service, used to fetch votes from Redis and store in Postres database.
DB: PostgreSQL database, used as database.
Result-App: Frontend of the application written in Node.js, displays the voting results.
The Voting repo has a file called docker-compose.yml this file contains the configuration for creating the containers, exposing ports, binding volumes and connecting containers through networks required for the voting app to work. Sounds like a lot of pretty long docker run and docker network create commands otherwise, docker compose allows us to put all of that stuff in a single docker-compose file in yaml format.



Git clone and cd into the voting app repo.
git clone https://github.com/dockersamples/example-voting-app.git

dockersamples/example-voting-app
example-voting-app - Example Docker Compose app
github.com
Compose Time
With all of our application defined in a single compose file we can take a sigh of relief, chill and simply run the application. The beauty of compose lies in the fact that a single command creates all the services, wires up the networks(literally), mounts all volumes and exposes the ports. Its time to welcome the up command, its performs all of the aforementioned tasks.

$ docker-compose up 
After lots of “Pull complete”, hundreds of megabytes and few minutes (maybe more). . .

Voila, we have the voting app up and running.

Command docker ps lists all the running containers

$ docker ps -a --format="table {{.Names}}\t{{.Image}}\t{{.Ports}}" 
NAMES               IMAGE               PORTS
voting_worker_1     voting_worker      
db                  postgres:9.4        5432/tcp
voting_vote_1       voting_vote         0.0.0.0:5000->80/tcp
voting_result_1     voting_result       0.0.0.0:5858->5858/tcp, 0.0.0.0:5001->80/tcp
redis               redis:alpine        0.0.0.0:32768->6379/tcp
The above command displays all the running containers, respective images and the exposed port numbers.

The Voting app can be accessed on http://localhost:5000


Likewise the Voting results app can be accessed on http://localhost:5001


Each vote cast on the Voting app is first stored in the Redis in-memory database, the .Net worker service fetches the vote and stores it in the Postgres DB which is accessed by the Node.js frontend.

Compose Features
Compose provide the flexibility to use a project name to isolate the environments from each other, the project name is the base name of the directory that contains the project. In our voting app this is signified by the name of the containers voting_worker_1 where voting is the base name of the directory. We can set a custom project name using the -p flag followed by the custom name.

Compose preserves all volumes used by the services defined in the compose file, thus no data is lost when the containers are recreated using docker-compose up. Another cool feature is that only the containers which have changed are recreated, the containers whose state did not change remain untouched.

Another cool feature is the support for variables in the compose file, we can define variables in a .env file and use them in the docker-compose file. Here the POSTGRES_VERSION=9.4 can defined in the environment file or can be defined in the shell. It is used in the compose file in the following manner:

db:
  image: "postgres:${POSTGRES_VERSION}"
Command Cheat Sheet
Its easy as breeze to start, stop and play around with compose.

$ docker-compose up -d
$ docker-compose down
$ docker-compose start
$ docker-compose stop
$ docker-compose build
$ docker-compose logs -f db
$ docker-compose scale db=4
$ docker-compose events
$ docker-compose exec db bash
Summary
Docker Compose is a great tool to quickly deploy and scrap containers, the compose file can run seamlessly on any machine installed with docker-compose. Experimentation and learning technologies is just a Compose file away ;).

I hope this article helped in the understanding of Docker Compose. I’d love to hear about how you use Docker Compose in your projects. Clap if it increased your knowledge, help it reach more people.

        39.3.2
    39.4
```
