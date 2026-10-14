---
type: reference
title: docker workshop SAP
description: "Notes from a SAP Docker workshop: Python docker basics and related example repositories."
tags: [docker, python, nodejs, legacy, course-notes]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "containers-kb#2"
---

# docker workshop SAP

[↑ containers-kb](/kb-containers/README.md)

## 2.1 general

```text
git repos:
https://github.com/izaqyos/DockerWorkshop
https://github.com/izaqyos/dockerized_nodejs_pg
https://github.com/izaqyos/docker101challenges

local git clones: /Users/<user>/gitpublic
```

## 2.2 3. python docker

## 3.1 python docker basics

### 3.1.1 https://www.docker.com/blog/containerized-python-development-part-1/ 3.1.1.1 code

```text
code: /Users/<user>/work/code/docker/python/basic_python_docker/

Create server and requirements.txt

$ ls -R
Dockerfile		requirements.txt	src/

./src:
server.py
$ cat Dockerfile 
# set base image (host OS)
FROM python:3.8

# set the working directory in the container
WORKDIR /code

# copy the dependencies file to the working directory
COPY requirements.txt .

# install dependencies
RUN pip install -r requirements.txt

# copy the content of the local src directory to the working directory
COPY src/ .

# command to run on container start
CMD [ "python", "./server.py" ]
$ cat requirements.txt 
Flask=1.1.1
$ cat src/server.py 
from flask import Flask
server = Flask(__name__)

@server.route("/")
def helloWorld():
    return "Hello World"

def main():
    server.run(host='0.0.0.0', port='80')

if __name__ == "__main__":
    main()
```

#### 3.1.1.2 build

```text
$ docker build -t basic_python_server .
[+] Building 5.4s (10/10) FINISHED                                                                                                                                                                                  
 => [internal] load build definition from Dockerfile                                                                                                                                                           0.0s
 => => transferring dockerfile: 37B                                                                                                                                                                            0.0s
 => [internal] load .dockerignore                                                                                                                                                                              0.0s
 => => transferring context: 2B                                                                                                                                                                                0.0s
 => [internal] load metadata for docker.io/library/python:3.8                                                                                                                                                  1.0s
 => [1/5] FROM docker.io/library/python:3.8@sha256:68bddbf6e88c9c88d3238e13f02edf1884fc349a0964fad4b3d44f2425791ac7                                                                                            0.0s
 => [internal] load build context                                                                                                                                                                              0.0s
 => => transferring context: 112B                                                                                                                                                                              0.0s
 => CACHED [2/5] WORKDIR /code                                                                                                                                                                                 0.0s
 => [3/5] COPY requirements.txt .                                                                                                                                                                              0.0s
 => [4/5] RUN pip install -r requirements.txt                                                                                                                                                                  4.1s
 => [5/5] COPY src/ .                                                                                                                                                                                          0.0s
 => exporting to image                                                                                                                                                                                         0.2s
 => => exporting layers                                                                                                                                                                                        0.2s
 => => writing image sha256:6c19a69cac49ccace416253cf99497110abd5a5ac8f138d09f7aca8e52337c3c                                                                                                                   0.0s 
 => => naming to docker.io/library/basic_python_server                                                                                                                                                         0.0s 
                                                                                                                                                                                                                    
Use 'docker scan' to run Snyk tests against images to find vulnerabilities and learn how to fix them
$ docker images | grep python
basic_python_server    latest    6c19a69cac49   11 seconds ago   920MB
```

#### 3.1.1.3 Multi-stage builds

```text
Although this may not be really useful during development time, we cover it quickly as it is interesting for shipping the containerized Python application once development is done. 

What we seek in using multi-stage builds is to strip the final application image of all unnecessary files and software packages and to deliver only the files needed to run our Python code.  A quick example of a multi-stage Dockerfile for our previous example is the following:

# first stage
FROM python:3.8 AS builder
COPY requirements.txt .

# install dependencies to the local user directory (eg. /root/.local)
RUN pip install --user -r requirements.txt

# second unnamed stage
FROM python:3.8-slim
WORKDIR /code

# copy only the dependencies installation from the 1st stage image
COPY --from=builder /root/.local /root/.local
COPY ./src .

# update PATH environment variable
ENV PATH=/root/.local:$PATH

CMD [ "python", "./server.py" ]
Notice that we have a two stage build where we name only the first one as builder. We name a stage by adding an AS <NAME> to the FROM instruction and we use this name in the COPY instruction where we want to copy only the necessary files to the final image.

The result of this is a slimmer final image for our application:
$ docker images
REPOSITORY    TAG      IMAGE ID       CREATED         SIZE
myimage       latest   70a92e92f3b5   2 hours ago     991MB
multistage    latest   e598271edefa   6 minutes ago   197MB
…
In this example we relied on the pip’s  –user  option to install dependencies to the local user directory and copy that directory to the final image. There are however other solutions available such as virtualenv or building packages as wheels and copy and install them to the final image.
```

#### 3.1.1.4 run

```text
$ docker run -d -p 5001:80 basic_python_server
26d4983cd32b4543d8ac074132f037d293d6aac0ab6a7b3c717264ab36ff37c4
$ docker ps | grep python
26d4983cd32b   basic_python_server   "python ./server.py"   22 seconds ago   Up 21 seconds   0.0.0.0:5001->80/tcp   charming_yonath

- send HTTP GET 
$ curl -i localhost:5001
HTTP/1.0 200 OK
Content-Type: text/html; charset=utf-8
Content-Length: 11
Server: Werkzeug/2.0.2 Python/3.8.12
Date: Sun, 28 Nov 2021 16:13:08 GMT

Hello World

- attach to container 
$ docker exec -it  20e261571300 /bin/bash

            3.1.1.5
        3.1.2
    3.2
```
