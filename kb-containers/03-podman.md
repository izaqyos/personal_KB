---
type: reference
title: Podman
description: "Podman basics: installation, help, and searching and pulling images."
tags: [docker, linux, legacy, howto, cheatsheet]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "containers-kb#4"
---

# Podman

[↑ containers-kb](/kb-containers/README.md)

## 4.1 basic

```text
https://podman.io/getting-started/
```

### 4.1.1 installation

```text
documentation: https://podman.readthedocs.io/en/latest/index.html
installation: https://podman.io/getting-started/installation
mac installation:
brew install podman
To start the Podman-managed VM:

$ podman machine init
$ podman machine start
You can then verify the installation information using:

$ podman info
```

### 4.1.2 help

```text
Getting help
To get some help and find out how Podman is working, you can use the help:

$ podman --help
$ podman <subcommand> --help
For more details, you can review the manpages:

$ man podman
$ man podman-<subcommand>
```

### 4.1.3 Searching, pulling & listing images

```text
Podman can search for images on remote registries with some simple keywords.

$ podman search <search_term>
You can also enhance your search with filters:

ex:
$ podman search nginx
INDEX       NAME                                       DESCRIPTION                                      STARS       OFFICIAL    AUTOMATED
docker.io   docker.io/library/nginx                    Official build of Nginx.                         15926       [OK]        
docker.io   docker.io/jwilder/nginx-proxy              Automated Nginx reverse proxy for docker con...  2101                    [OK]
docker.io   docker.io/nginxinc/nginx-unprivileged      Unprivileged NGINX Dockerfiles                   55                      
docker.io   docker.io/nginx/nginx-ingress              NGINX and  NGINX Plus Ingress Controllers fo...  57                      
docker.io   docker.io/nginxdemos/hello                 NGINX webserver that serves a simple page co...  79                      [OK]


$ podman search httpd --filter=is-official
Downloading (Pulling) an image is easy, too.

$ podman pull docker.io/library/httpd
After pulling some images, you can list all images, present on your machine.

$ podman images
Note: Podman searches in different registries. Therefore it is recommend to use the full image name (docker.io/library/httpd instead of httpd) to ensure, that you are using the correct image.
```

### 4.1.4 Running a container

```text
This sample container will run a very basic httpd server that serves only its index page.

$ podman run -dt -p 8080:80/tcp docker.io/library/httpd
Note: Because the container is being run in detached mode, represented by the -d in the podman run command, Podman will print the container ID after it has executed the command. The -t also adds a pseudo-tty to run arbitrary commands in an interactive shell.

Note: We use port forwarding to be able to access the HTTP server. For successful running at least slirp4netns v0.3.0 is needed.
```

### 4.1.5 Listing running containers

```text
The podman ps command is used to list created and running containers.

$ podman ps
Note: If you add -a to the podman ps command, Podman will show all containers (created, exited, running, etc.).
```

### 4.1.6 Testing the httpd container

```text
As you are able to see, the container does not have an IP Address assigned. The container is reachable via it’s published port on your local machine.

$ curl http://localhost:8080
From another machine, you need to use the IP Address of the host, running the container.

$ curl http://<IP_Address>:8080
Note: Instead of using curl, you can also point a browser to http://localhost:8080.
```

### 4.1.7 Inspecting a running container

```text
You can “inspect” a running container for metadata and details about itself. podman inspect will provide lots of useful information like environment variables, network settings or allocated resources.

Since, the container is running in rootless mode, no IP Address is assigned to the container.

$ podman inspect -l | grep IPAddress
            "IPAddress": "",
Note: The -l is a convenience argument for latest container. You can also use the container’s ID or name instead of -l or the long argument --latest.
```

### 4.1.8 Viewing the container’s logs

```text
You can view the container’s logs with Podman as well:

$ podman logs -l

| 127.0.0.1 - - [04/May/2020:08:33:48 +0000] "GET / HTTP/1.1" 200 45
| 127.0.0.1 - - [04/May/2020:08:33:50 +0000] "GET / HTTP/1.1" 200 45
| 127.0.0.1 - - [04/May/2020:08:33:51 +0000] "GET / HTTP/1.1" 200 45
| 127.0.0.1 - - [04/May/2020:08:33:51 +0000] "GET / HTTP/1.1" 200 45
| 127.0.0.1 - - [04/May/2020:08:33:52 +0000] "GET / HTTP/1.1" 200 45
| 127.0.0.1 - - [04/May/2020:08:33:52 +0000] "GET / HTTP/1.1" 200 45
```

### 4.1.9 Viewing the container’s pids

```text
You can observe the httpd pid in the container with podman top.

$ podman top -l

USER     PID   PPID   %CPU    ELAPSED            TTY     TIME   COMMAND
root     1     0      0.000   22m13.33281018s    pts/0   0s     httpd -DFOREGROUND
daemon   3     1      0.000   22m13.333132179s   pts/0   0s     httpd -DFOREGROUND
daemon   4     1      0.000   22m13.333276305s   pts/0   0s     httpd -DFOREGROUND
daemon   5     1      0.000   22m13.333818476s   pts/0   0s     httpd -DFOREGROUND
```

### 4.1.10 Stopping the container

```text
You may stop the container:

$ podman stop -l
You can check the status of one or more containers using the podman ps command. In this case, you should use the -a argument to list all containers.

$ podman ps -a
```

### 4.1.11 Removing the container

```text
Finally, you can remove the container:

$ podman rm -l
You can verify the deletion of the container by running podman ps -a.
```

### 4.1.12 Network

```text
https://podman.io/getting-started/network
In Podman, you will see differences in networking between rootless and rootfull containers. This guide will help to understand how networking can be used in Podman.

Podman pods
By definition, all containers in the same Podman pod share the same network namespace. Therefore, the containers will share the IP Address, MAC Addresses and port mappings. You can always communicate between containers in the same pod, using localhost.

Rootless Networking
When using Podman as a rootless user, the network is setup automatically. The container itself does not have an IP Address, because without root privileges, network association is not allowed. You will also see some other limitations.

Publishing Ports
Port publishing as rootless containers can be done for “high ports” only. All ports below 1024 are privileged and cannot be used for publishing.

Instead of:

$ podman run -dt -p 80:80/tcp docker.io/library/httpd
you want to use:

$ podman run -dt -p 8080:80/tcp docker.io/library/httpd
Note: You can also use podman -P to automatically publish and map ports.

Container <-> Host Communication
If you want to reach a rootless container from your localhost, you can use port publishing (as in the example above).

You can check the ports published and occupied:

$ podman port -l
80/tcp -> 0.0.0.0:8080
Note: The -l is a convenience argument for latest container. You can also use the container’s ID or name instead of -l or the long argument --latest.

Container <-> Container Communication
Communicating between two rootless containers can be achieved in multiple ways. The easiest and most convenient way is to communicate via published ports and the underlying host.

Check, if a “listening” container is running:

$ podman ps
Check the published ports:

$ podman port <container_id>
Check the address of your host:

$ ip addr
Start a new container to contact your host + the published port:

$ podman run -it --rm fedora curl <Host_IP_Address>:<Published_Port>
Note: Host_IP_Address here is the IP address of your host machine(laptop, VM)

To allow connections to slirp4netns virtual router(10.0.2.2) the from within your container.

$ podman run -it --rm  --net slirp4netns:allow_host_loopback=true bash
Note: This is set to false by default for security.

Rootfull Networking
This section describes how networking can be used in rootfull containers.

Podman provides a bridged network by default.

$ sudo podman network ls
NETWORK ID    NAME    VERSION  PLUGINS
2f259bab93aa  podman  0.4.0    bridge,portmap,firewall,tuning
You can pass different network types using --network=string (bridge by default) to pass different network types.

If --network=string isn’t specified podman will use the bridge mode for networking. See Podman Run command for more options.

Publishing Ports
Port publishing works the same way as rootless containers, but you will be able to use privileged ports, as long as they are free.

$ sudo podman run -dt -p 80:80/tcp docker.io/library/httpd
Note: You can also use podman -P to automatically publish and map ports.

Container <-> Host Communication
Rootfull containers are reachable via their published ports.

You can check which ports are published:

$ sudo podman port -l
80/tcp -> 0.0.0.0:80
And you should be able to reach the website from your local machine:

$ curl localhost
Container <-> Container Communication
Rootfull containers can communicate via their IP Address in the same network.

$ sudo podman inspect <container_id> | grep IPAddress
            "IPAddress": "10.88.0.83",
$ sudo podman run -it --rm fedora curl <Container_IP_Address>:<Container_Port>
Configuring Networking
The installation of Podman provides a default network configuration commonly installed in /etc/cni/net.d/ as 87-podman-bridge.conflist. The default network name is defined in /usr/share/containers/libpod.conf. If you want to change the default network, you should copy the libpod.conf to /etc/containers/libpod.conf and change the new file.

To create a new network, you can use the podman network create command, which will create a new file in /etc/cni/net.d/.

Using DNS in Container Networks
Podman provides a convenient way to allocate local DNS records to containers via the dnsname plugin. This can become handy, if you want to communicate between 2 or more containers.

The feature will be automatically enabled for newly created networks via podman network create. If you want to add this feature to the default network, you can either create a new network and make it default or add the needed lines to cat /etc/cni/net.d/87-podman-bridge.conflist - a reboot may be required.

{
  ...

  "plugins": [

    ...

    {
      "type": "dnsname",
      "domainName": "example.com"
    }
  ]
}

        4.1.13
    4.2
```
