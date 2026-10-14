---
type: reference
title: DNS on Linux
description: "DNS on Linux: domains, BIND, DNS clients and authoritative servers."
tags: [dns, linux, tutorial, primer, legacy]
generated: { by: "human:izaqyos", at: "2026-10-14T00:00:00Z" }
stale_after: "2028-10-14T00:00:00Z"
sources:
  - { id: systemctl-1, resource: "https://man7.org/linux/man-pages/man1/systemctl.1.html", title: "systemctl(1) - Linux manual page" }
  - { id: rhel9-bind, resource: "https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/managing_networking_infrastructure_services/assembly_setting-up-and-configuring-a-bind-dns-server_networking-infrastructure-services", title: "RHEL 9: Setting up and configuring a BIND DNS server" }
  - { id: ubuntu-dns, resource: "https://ubuntu.com/server/docs/how-to/networking/install-dns/", title: "Ubuntu Server docs: Domain Name Service (DNS)" }
  - { id: isc-bind9-rename, resource: "https://lists.isc.org/pipermail/bind-users/2020-April/102933.html", title: "bind-users: Debian/Ubuntu: Why was the service renamed from bind9 to named?" }
  - { id: ms-verify-srv, resource: "https://learn.microsoft.com/en-us/troubleshoot/windows-server/networking/verify-srv-dns-records-have-been-created", title: "Microsoft Learn: Verify that SRV DNS records have been created" }
  - { id: rfc-2782, resource: "https://www.rfc-editor.org/rfc/rfc2782", title: "RFC 2782: A DNS RR for specifying the location of services (DNS SRV)" }
status: stable
capture_type: source
legacy_source: "linux/KB_Linux#4"
---

# DNS on Linux

[↑ KB_Linux](/linux/kb-linux/README.md)

## 4.1 Introduction

```text
Domain Name System (DNS) converts the name of a Web site (www.linuxhomenetworking.com) to an IP address (65.115.71.34). This step is important, because the IP address of a Web site's server, not the Web site's name, is used in routing traffic over the Internet. This chapter will explain how to configure your own DNS server to help guide Web surfers to your site.
Introduction to DNS

Before you dig too deep in DNS, you need to understand a few foundation concepts on which the rest of the chapter will be built.
```

### 4.1.1 DNS Domains

```text
Everyone in the world has a first name and a last, or family, name. The same thing is true in the DNS world: A family of Web sites can be loosely described a domain. For example, the domain linuxhomenetworking.com has a number of children, such as www.linuxhomenetworking.com and mail.linuxhomenetworking.com for the Web and mail servers, respectively.
```

### 4.1.2 BIND

```text
BIND is an acronym for the Berkeley Internet Name Domain project, which is a group that maintains the DNS-related software suite that runs under Linux. The most well known program in BIND is named, the daemon that responds to DNS queries from remote machines.
```

### 4.1.3 DNS Clients

```text
A DNS client doesn't store DNS information; it must always refer to a DNS server to get it. The only DNS configuration file for a DNS client is the /etc/resolv.conf file, which defines the IP address of the DNS server it should use. You shouldn't need to configure any other files. You'll become well acquainted with the /etc/resolv.conf file soon.
```

### 4.1.4 Authoritative DNS Servers

```text
Authoritative servers provide the definitive information for your DNS domain, such as the names of servers and Web sites in it. They are the last word in information related to your domain.
```

### 4.1.5 How DNS Servers Find Out Your Site Information

```text
There are 13 root authoritative DNS servers (super duper authorities) that all DNS servers query first. These root servers know all the authoritative DNS servers for all the main domains - .com, .net, and the rest. This layer of servers keep track of all the DNS servers that Web site systems administrators have assigned for their sub domains.

For example, when you register your domain my-site.com, you are actually inserting a record on the .com DNS servers that point to the authoritative DNS servers you assigned for your domain. (More on how to register your site later.).
```

### 4.1.6 When To Use A DNS Caching Name Server

```text
Most servers don¿t ask authoritative servers for DNS directly, they usually ask a caching DNS server to do it on their behalf. These servers, through a process called recursion, sequentially query the authoritative servers at the root, main domain and sub domain levels to get eventually get the specific information requested. The most frequently requested information is then stored (or cached) to reduce the lookup overhead of subsequent queries.

If you want to advertise your Web site www.my-site.com to the rest of the world, then a regular DNS server is what you require. Setting up a caching DNS server is fairly straightforward and works whether or not your ISP provides you with a static or dynamic Internet IP address.

After you set up your caching DNS server, you must configure each of your home network PCs to use it as their DNS server. If your home PCs get their IP addresses using DHCP, then you have to configure your DHCP server to make it aware of the IP address of your new DNS server, so that the DHCP server can advertise the DNS server to its PC clients. Off-the-shelf router/firewall appliances used in most home networks usually can act as both the caching DNS and DHCP server, rendering a separate DNS server is unnecessary.

You can find the configuration steps for a Linux DHCP server in Chapter 8, "Configuring the DHCP Server".
```

### 4.1.7 When To Use A Static DNS Server

```text
If your ISP provides you with a fixed or static IP address, and you want to host your own Web site, then a regular authoritative DNS server would be the way to go. A caching DNS name server is used as a reference only, regular name servers are used as the authoritative source of information for your Web site's domain.

Note: Regular name servers are also caching name servers by default.
```

### 4.1.8 When To Use A Dynamic DNS Server

```text
If your ISP provides your router/firewall with its Internet IP address using DHCP then you must consider dynamic DNS covered in Chapter 19, "Dynamic DNS". For now, I'm assuming that you are using static Internet IP addresses.
```

### 4.1.9 How To Get Your Own Domain

```text
Whether or not you use static or dynamic DNS, you need to register a domain.

Dynamic DNS providers frequently offer you a subdomain of their own site, such as my-site.dnsprovider.com, in which you register your domain on their site.

If you choose to create your very own domain, such as my-site.com, you have to register with a company specializing in static DNS registration and then point your registration record to the intended authoritative DNS for your domain. Popular domain registrars include VeriSign, Register Free, and Yahoo.

If you want to use a dynamic DNS provider for your own domain, then you have to point your registration record to the DNS servers of your dynamic DNS provider. (More details on domain registration are coming later in the chapter.).
```

### 4.1.10 Basic DNS Testing of DNS Resolution

```text
As you know, DNS resolution maps a fully qualified domain name (FQDN), such as www.linuxhomenetworking.com, to an IP address. This is also known as a forward lookup. The reverse is also true: By performing a reverse lookup, DNS can determining the fully qualified domain name associated with an IP address.

Many different Web sites can map to a single IP address, but the reverse isn't true; an IP address can map to only one FQDN. This means that forward and reverse entries frequently don't match. The reverse DNS entries are usually the responsibility of the ISP hosting your site, so it is quite common for the reverse lookup to resolve to the ISP's domain. This isn't an important factor for most small sites, but some e-commerce applications require matching entries to operate correctly. You may have to ask your ISP to make a custom DNS change to correct this.

There are a number of commands you can use do these lookups. Linux uses the host command, for example, but Windows uses nslookup.
```

#### 4.1.10.1 The Host Command

```text
The host command accepts arguments that are either the fully qualified domain name or the IP address of the server when providing results. To perform a forward lookup, use the syntax:

[root@bigboy tmp]# host www.linuxhomenetworking.com
www.linuxhomenetworking.com has address 65.115.71.34
[root@bigboy tmp]#

To perform a reverse lookup

[root@bigboy tmp]# host 65.115.71.34
-> 34.71.115.65.in-addr.arpa domain name pointer 65-115-71-34.myisp.net.
[root@bigboy tmp]#

As you can see, the forward and reverse entries don't match. The reverse entry matches the entry of the ISP.
```

#### 4.1.10.2 The nslookup Command

#### 4.1.10.2.1 wiki

```text
nslookup is a network administration command-line tool available for many computer operating systems for querying the Domain Name System (DNS) to obtain domain name or IP address mapping or for any other specific DNS record.
```

#### 4.1.10.2.1.1 Background

```text
The name nslookup means name server lookup. Nslookup uses the operating system's local Domain Name System resolver library to perform its queries. Thus, it is configured automatically by the contents of the operating system file resolv.conf.[1]

The nslookup utility is generally considered obsolete from historical and technical point of view.[2] Modern alternatives to nslookup are the host and dig programs.
```

#### 4.1.10.2.1.2 Usage

```text
nslookup operates in interactive or non-interactive mode. When used interactively, when the program is invoked without arguments (another option exists), the user issues parameter configurations or requests when presented the nslookup prompt ('>') in line by line fashion. In non-interactive mode parameters and the query are specified as command line arguments in the invocation of the program.
        
The general command syntax is:
        
 nslookup [-option] [name | -] [server]
        
[edit] Example
        
The following example queries the Domain Name System for the IP address of the domain name example.com by issue the command nslookup example.com to the command line interpreter (shell):
        
$ nslookup example.com
Server:         192.168.0.254
Address:        192.168.0.254#53
        
Non-authoritative answer:
Name:   example.com
Address: 192.0.32.10
        
It first lists the DNS server it is using and then the address
The next paragraph contains the answer

This is an example of interactive, prompted use of the nslookup application. The user executes the program without any arguments and issues parameters and queries at the program prompt ('>'):
 
 $ nslookup
 Default Server:  dsldevice.lan
 Address:  192.168.0.254
 
 > server 8.8.8.8
 Default Server:  google-public-dns-a.google.com
 Address:  8.8.8.8
 
 > set type=mx
 > wikipedia.org
 Server:  google-public-dns-a.google.com
 Address:  8.8.8.8
 
 Non-authoritative answer:
 wikipedia.org   MX preference = 10, mail exchanger = mchenry.wikimedia.org
 wikipedia.org   MX preference = 50, mail exchanger = lists.wikimedia.org
 > exit
 
In this example, the program first displays its default name server configuration, after which the user changes the name server to be used to the host at IP address 8.8.8.8. The type of query to be performed is specified by setting the type of record to be fetched (mx record). Finally, the user simply issues the domain name at the prompt to receive the query results. The command exit ends the interactive session and terminate the program.
```

#### 4.1.10.2.2 Some examples

```text
The nslookup command provides the same results on Windows PCs. To perform forward lookup, use.
 
C:\> nslookup www.linuxhomenetworking.com
Server:  192-168-1-200.my-site.com
Address:  192.168.1.200
 
Non-authoritative answer:
Name:    www.linuxhomenetworking.com
Address:  65.115.71.34
 
C:\>
 
To perform a reverse lookup
 
C:\> nslookup 65.115.71.34
Server:  192-168-1-200.my-site.com
Address:  192.168.1.200

Name:    65-115-71-34.my-isp.com
Address:  65.115.71.34

C:\>
```

#### 4.1.10.2.3 dig

#### 4.1.10.2.3.1 wiki

```text
Domain Information Groper (dig) is a network administration command-line tool for querying Domain Name System (DNS) name servers for any desired DNS records.

Dig is useful for network troubleshooting and for educational purposes. Dig can operate in interactive command line mode or in batch mode by reading requests from an operating system file. When a specific name server is not specified in the command invocation, it will use the operating systems default resolver, usually configured via the resolv.conf file. Without any arguments it queries the DNS root zone.

Dig supports Internationalized Domain Name (IDN) queries.

Dig is part of the BIND domain name server software suite. Dig replaces older tools such as nslookup and the host program.
Contents

Example usage

In this example, dig is used to query for any type of record information in the domain example.com:

    * Command line:

dig any example.com

    * Output:

; <<>> DiG 9.6.1 <<>> any example.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 4016
;; flags: qr rd ra; QUERY: 1, ANSWER: 4, AUTHORITY: 0, ADDITIONAL: 0

;; QUESTION SECTION:
;example.com.                   IN      ANY

;; ANSWER SECTION:
example.com.            172719  IN      NS      a.iana-servers.net.
example.com.            172719  IN      NS      b.iana-servers.net.
example.com.            172719  IN      A       208.77.188.166
example.com.            172719  IN      SOA     dns1.icann.org. hostmaster.icann.org. 2007051703 7200 3600 1209600 86400

;; Query time: 1 msec
;; SERVER: ::1#53(::1)
;; WHEN: Wed Aug 12 11:40:43 2009
;; MSG SIZE  rcvd: 154

Queries may be directed to designated DNS servers for specific records; in this example, MX records:

    * Command:

dig MX wikimedia.org @ns0.wikimedia.org

    * Output:

; <<>> DiG 9.6.1 <<>> MX wikimedia.org @ns0.wikimedia.org
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 61144
;; flags: qr aa rd; QUERY: 1, ANSWER: 2, AUTHORITY: 0, ADDITIONAL: 2
;; WARNING: recursion requested but not available

;; QUESTION SECTION:
;wikimedia.org.                 IN      MX

;; ANSWER SECTION:
wikimedia.org.          3600    IN      MX      10 mchenry.wikimedia.org.
wikimedia.org.          3600    IN      MX      50 lists.wikimedia.org.

;; ADDITIONAL SECTION:
mchenry.wikimedia.org.  3600    IN      A       208.80.152.186
lists.wikimedia.org.    3600    IN      A       91.198.174.5

;; Query time: 73 msec
;; SERVER: 208.80.152.130#53(208.80.152.130)
;; WHEN: Wed Aug 12 11:51:03 2009
;; MSG SIZE  rcvd: 109
```

#### 4.1.10.2.3.2 Examples

```text
- SRV record for LDAP on AD DC
dig  _ldap._tcp.canada.north.amer.acs.com SRV

; <<>> DiG 9.2.4 <<>> _ldap._tcp.canada.north.amer.acs.com SRV
;; global options:  printcmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 23133
;; flags: qr aa rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

;; QUESTION SECTION:
;_ldap._tcp.canada.north.amer.acs.com. IN SRV

;; ANSWER SECTION:
_ldap._tcp.canada.north.amer.acs.com. 600 IN SRV 0 100 389 a3-adf1-b-2.canada.north.amer.acs.com.

;; ADDITIONAL SECTION:
a3-adf1-b-2.canada.north.amer.acs.com. 1200 IN A <internal-ip>

;; Query time: 1 msec
;; SERVER: <internal-ip>#53(<internal-ip>)
;; WHEN: Thu Oct 21 20:10:46 2010
;; MSG SIZE  rcvd: 127


					4.1.10.2.3.3
```

#### 4.1.10.2.4 nslookup man

```text
nslookup

Query Internet name servers

Syntax:
       nslookup

       nslookup host-to-find 

       nslookup server 

interactive mode:

       nslookup -server 

       nslookup [-options] [host-to-find ]

Options:

   host [server ]
         Look up information for host using the current default server or using server,
         if specified. If host is an Internet address and the query type is A or PTR ,
         the name of the host is returned. If host is a name and does not have a trailing
         period, the default domain name is appended to the name. (This behavior depends
         on the state of the set options domain , srchlist , defname , and search.

         To look up a host not in the current domain, append a period to the name.

   server domain
   lserver domain
         Change the default server to domain ; lserver uses the initial server to look up
         information about domain while server uses the current default server.
         If an authoritative answer can't be found, the names of servers that might have 
         the answer are returned. 
   root
         Change the default server to the server for the root of the domain name space.
         Currently, the host ns.internic.net is used. (This command is a synonym for
          `lserver ns.internic.net' The name of the root server can be changed with
         the `set root ' command. 

   finger [name ] [> filename ] 
   finger [name ] [>> filename ]
          Connects with the finger server on the current host. The current host is
          defined when a previous lookup for a host was successful and returned address
          information (see the `set querytype=A ' command). The name is optional. > and
          >> can be used to redirect output in the usual manner.

   ls [option ] domain [> filename ]
   ls [option ] domain [>> filename ]
          List the information available for domain , optionally creating or appending
          to filename The default output contains host names and their Internet addresses.
          Option can be one of the following:

             -t querytype  list all records of the specified type (see querytype below). 
             -a            list aliases of hosts in the domain; synonym for `-t CNAME ' 
             -d            list all records for the domain; synonym for `-t ANY' 
             -h            list CPU and operating system information for the domain; synonym for `-t HINFO' 
             -s            list well-known services of hosts in the domain; synonym for `-t WKS'

          When output is directed to a file, hash marks are printed for every 50 records
          received from the server. 

   view filename
          Sort and lists the output of previous ls command(s) with more(1). 

   set keyword [= value ]
          This command is used to change state information that affects the lookups.
          run man nslookup for a full list of valid keywords.

   set all   Print the current value of the frequently-used options
             to set Information about the current default server and host is also printed.

   help
   ?      Print a brief summary of commands. 

   exit   Exit the program.
Nslookup has two modes: interactive and non-interactive.

Interactive mode allows the user to query name servers for information about various hosts and domains or to print a list of hosts in a domain.

Non-interactive mode is used to print just the name and requested information for a host or domain.

The options listed under the `set ' command can be specified in the .nslookuprc file in the user's home directory (listed one per line). Options can also be specified on the command line if they precede the arguments and are prefixed with a hyphen.

"He who listens to truth is not less than he who utters truth" - Kahlil Gibran

Related:

named(8), resolver(3), resolver(5)
Equivalent Windows command: NSLOOKUP - Lookup IP addresses on a NameServer.

				4.1.10.2.5
```

### 4.1.11 Downloading and Installing the BIND Packages

> Updated 2026-10 to current practice.[^rhel9-bind]

Install BIND from the distro repositories instead of downloading RPMs by hand:

```sh
# RHEL / Fedora / Rocky / Alma
sudo dnf install bind bind-utils
# Debian / Ubuntu
sudo apt install bind9
```

Original text (the package-file naming is historical):

```text
Most RedHat and Fedora Linux software products are available in a package format. When searching for the file, remember that the BIND package's filename usually starts with the word ¿bind¿ followed by a version number, as in bind-9.2.2.P3-9.i386.rpm. (For more details on downloading RPMs, see Chapter 6, "Installing Linux Software").

Note: Unless otherwise stated, the sample configurations covered in this chapter will be for Redhat / Fedora distributions. If you use Debian / Ubuntu, don¿t worry, there will be annotations to make you aware of the differences.
```

### 4.1.12 How To Get BIND Started

```text
Setting up your DNS server is easy to do, but the procedure differs between Linux distributions.
```

#### 4.1.12.1 Redhat / Fedora

> Updated 2026-10 to current practice.[^systemctl-1]

BIND runs as a systemd service, `named.service`. `chkconfig` and `/etc/init.d` scripts are gone on current RHEL and Fedora.[^rhel9-bind]

```sh
sudo systemctl enable --now named   # start now and at every boot
sudo systemctl status named
sudo systemctl restart named        # full restart
sudo systemctl reload named         # re-read config/zones without dropping the process
sudo named-checkconf                # validate /etc/named.conf before reloading
```

`rndc reload` (or `rndc reload <zone>`) also works for zone changes. Run `named-checkconf` / `named-checkzone` first so a typo doesn't take the server down.

#### 4.1.12.2 Debian / Ubuntu

> Updated 2026-10 to current practice.[^systemctl-1]

The package is `bind9` and the daemon is `named`. Since Debian 11 the systemd unit is `named.service`, with `bind9.service` kept as an alias. Ubuntu's docs use `systemctl restart bind9.service`.[^isc-bind9-rename][^ubuntu-dns] Enable it through the real unit name:

```sh
sudo systemctl enable --now named
sudo systemctl restart named        # same as: sudo systemctl restart bind9
sudo systemctl reload named
```

`sysv-rc-conf` and `/etc/init.d/bind` are obsolete.

Later sections of this note (copied from older tutorials) still show `/etc/init.d/named restart` and `service named restart`. On a systemd host, read them as `systemctl restart named`.

### 4.1.13 The /etc/resolv.conf File

```text
DNS clients (servers not running BIND) use the /etc/resolv.conf file to determine both the location of their DNS server and the domains to which they belong. The file generally has two columns; the first contains a keyword, and the second contains the desired values separated by commas. See Table for a list of keywords.
Table Keywords In /etc/resolv.conf
	|Keyword 	|Value
_____________________________________________________________________________
	|Nameserver 	|IP address of your DNS nameserver. There should be only one entry per "nameserver" keyword. If there is more than one nameserver, you¿ll need to have multiple "nameserver" lines.
_____________________________________________________________________________
	|Domain 	|The local domain name to be used by default. If the server is bigboy.my-web-site.org, then the entry would just be my-web-site.org
_____________________________________________________________________________
	|Search 	|If you refer to another server just by its name without the domain added on, DNS on your client will append the server name to each domain in this list and do an DNS lookup on each to get the remote servers¿ IP address. This is a handy time saving feature to have so that you can refer to servers in the same domain by only their servername without having to specify the domain. The domains in this list must separated by spaces.
_____________________________________________________________________________

Take a look at a sample configuration in which the client server's main domain is my-site.com, but it also is a member of domains my-site.net and my-site.org, which should be searched for shorthand references to other servers. Two name servers, 192.168.1.100 and 192.168.1.102, provide DNS name resolution:

search my-site.com my-site.net my-site.org
nameserver 192.168.1.100
nameserver 192.168.1.102

The first domain listed after the search directive must be the home domain of your network, in this case my-site.com. Placing a domain and search entry in the /etc/resolv.conf is redundant, therefore.
```

## 4.2 Important File Locations

```text
The locations of the BIND configuration files vary by Linux distribution, as you will soon see.
RedHat / Fedora

RedHat / Fedora BIND normally runs as the named process owned by the unprivileged named user.

Sometimes BIND is also installed using Linux's chroot feature to not only run named as user named, but also to limit the files named can see. When installed, named is fooled into thinking that the directory /var/named/chroot is actually the root or / directory. Therefore, named files normally found in the /etc directory are found in /var/named/chroot/etc directory instead, and those you'd expect to find in /var/named are actually located in /var/named/chroot/var/named.

The advantage of the chroot feature is that if a hacker enters your system via a BIND exploit, the hacker's access to the rest of your system is isolated to the files under the chroot directory and nothing else. This type of security is also known as a chroot jail.

You can determine whether you have the chroot add-on RPM by using this command, which returns the name of the RPM.

[root@bigboy tmp]# rpm -q bind-chroot
bind-chroot-9.2.3-13
[root@bigboy tmp]#

There can be confusion with the locations: Regular BIND installs its files in the normal locations, and the chroot BIND add-on RPM installs its own versions in their chroot locations. Unfortunately, the chroot versions of some of the files are empty. Before starting Fedora BIND, copy the configuration files to their chroot locations:

[root@bigboy tmp]# cp -f /etc/named.conf /var/named/chroot/etc/
[root@bigboy tmp]# cp -f /etc/rndc.* /var/named/chroot/etc/

Before you go to the next step of configuring a regular name server, it is important to understand exactly where the files are located. Table 18.2 provides a map.
Table 18.2 Differences In Fedora And Redhat DNS File Locations
File 	Purpose 	BIND chroot Location 	Regular BIND Location
named.conf 	Tells the names of the zone files to be used for each of your website domains. 	/var/named/chroot/etc 	/etc
rndc.key

rndc.conf
	Files used in named authentication 	/var/named/chroot/etc 	/etc
zone files 	Links all the IP addresses in your domain to their corresponding server 	/var/named/chroot/var/named 	/var/named

Note: Fedora Core installs BIND chroot by default. RedHat 9 and earlier don't.
Debian / Ubuntu

With Debian / Ubuntu, all the configuration files, the primary named.conf file and all the DNS zone files reside in the /etc/bind directory.

Unlike in Redhat / Fedora, references to other files within these configuration files should include the full path. The named daemon won't automatically assume they are located in the /etc/bind directory.
```

## 4.3 Configuring Your Nameserver

```text
For the purposes of this tutorial, assume your ISP assigned you the subnet 97.158.253.24 with a subnet mask of 255.255.255.248 (/29).
Configuring resolv.conf

You'll have to make your DNS server refer to itself for all DNS queries by configuring the /etc/resolv.conf file to reference localhost only.

nameserver 127.0.0.1

Creating a named.conf Base Configuration

The /etc/named.conf file contains the main DNS configuration and tells BIND where to find the configuration, or zone files for each domain you own. This file usually has two zone areas:

    * Forward zone file definitions list files to map domains to IP addresses.
    * Reverse zone file definitions list files to map IP addresses to domains. 

Some versions of BIND will come with a /etc/amed.conf file configured to work as a caching nameserver which can be converted to an authoritative nameserver by adding the correct references to your zone files. Please proceed to the next section if this is the case with your version of BIND.

In other cases the named.conf configuration file may be hard to find. Some versions of Linux install BIND as a default caching nameserver using a file names /etc/named.caching-nameserver.conf for its configuration. In such cases BIND becomes an authoritative nameserver when a correctly configured /etc/named.conf file is created.

Fortunately BIND comes with samples of all the primary files you need. Table 18.3 explains their names and purpose in more detail.
Table 18.3 The Primary BIND Configuration Files
File 	Description
/etc/named.conf 	The main configuration file that lists the location of all your domain's zone files
/etc/named.root.hints 	A file describing the location of the named.root file
/var/named/named.root 	A list of the 13 root authoritative DNS servers.

The creation of these files in the correct locations and their subsequent configuration isn't hard. Here's what you need to do:

a. The first task is to locate these files and place them in the correct locations. In the examples that follow we assume a chroot version of BIND and add the appropriate symbolic links to the /etc directory.

[root@bigboy tmp]# locate named.conf
/etc/dbus-1/system.d/named.conf
/usr/share/doc/bind-9.3.3/sample/etc/named.conf
[root@bigboy tmp]# cp /usr/share/doc/bind-9.3.3/sample/etc/named.conf \
    /var/named/chroot/etc 
[root@bigboy tmp]# ln -s /var/named/chroot/etc/named.conf /etc/named.conf
[root@bigboy tmp]# locate named.root.hints
/usr/share/doc/bind-9.3.3/sample/etc/named.root.hints
[root@bigboy tmp]# cp /usr/share/doc/bind-9.3.3/sample/etc/named.root.hints \
    /var/named/chroot/etc 
[root@bigboy tmp]# ln -s /var/named/chroot/etc/named.root.hints /etc/named.root.hints
[root@bigboy tmp]# locate named.root
/usr/share/doc/bind-9.3.3/sample/etc/named.root.hints
/usr/share/doc/bind-9.3.3/sample/var/named/named.root
[root@bigboy tmp]# 
[root@bigboy tmp]# cp /usr/share/doc/bind-9.3.3/sample/var/named/named.root \
    /var/named/chroot/var/named/named.root
[root@bigboy tmp]# 

b. Though it is beyond the scope of this book, it is possible to create a master and redundant slave authoritative name servers for your domains. You can configure your master to use a secret identification key when updating its slaves to help ensure the security of the updates. The next step requires you to generate a key for your named.conf file, and this can be done using the dns-keygen or dnskeygen commands.

[root@bigboy tmp]# /usr/sbin/dns-keygen
u8yNvOLHovDstA8lFHRvQl0XnjlxL1q1JCP5OaDHw4sgssgzRxKNkB7kKbON
[root@bigboy tmp]#

Edit your /etc/named.conf file and add your secret key to the ddns_key section. Though it is not required, it is a good practice to configure your DNS server's named.conf file to support BIND views. This will be discussed next.
Configuring BIND Views in named.conf

Our sample scenario assumes that DNS queries will be coming from the Internet and that the zone files will return information related to the external 97.158.253.26 address of the Web server. What do the PCs on your home network need to see? They need to see DNS references to the real IP address of the Web server, 192.168.1.100, because NAT won¿t work properly if a PC on your home network attempts to connect to the external 97.158.253.26 NAT IP address of your Web server. Don¿t worry. BIND figures this out using its views feature which allows you to use predefined zone files for queries from certain subnets. This means it¿s possible to use one set of zone files for queries from the Internet and another set for queries from your home network. Here¿s a summary of how it¿s done:

a. If your DNS server is also acting as a caching DNS server, then you'll also need a view for localhost to use. A view called localhost_resolver is a predefined view in Fedora's sample named.conf file and will be explained later.

b. Place your zone statements in the /etc/named.conf file in one of two other view sections. The first section is called internal and lists the zone files to be used by your internal network. The second view called external lists the zone files to be used for Internet users.

For example; you could have a reference to a zone file called my-site.zone for lookups related to the 97.158.253.X network which Internet users would see. This /etc/named.conf entry would be inserted in the external section. You could also have a file called my-site-home.zone for lookups by home users on the 192.168.1.0 network. This entry would be inserted in the internal section. Creating the my-site-home.zone file is fairly easy: Copy it from the my-site.zone file and replace all references to 97.158.253.X with references to 192.168.1.X.

c. You must also tell the DNS server which addresses you feel are internal and external. To do this, you must first define the internal and external networks with access control lists (ACLs) and then refer to these lists within their respective view section with the match-clients statement. Some built-in ACLs can save you time:

    * localhost: Refers to the DNS server itself
    * localnets: Refers to all the networks to which the DNS server is directly connected
    * any: which is self explanatory. 

Let's examine BIND views more carefully using a number of sample configuration snippets from the /etc/named.conf file I use for my home network. All the statements below were inserted after the options and controls sections in the file. I have selected generic names internal, for views given to trusted hosts (home, non-internet or corporate users), and external for the views given to Internet clients, but they can be named whatever you wish.

First let's talk about how we should refer to the zone files in each view.
Zone File References in named.conf

In this section we'll set up the forward zone reference for the my-web-site.org domain by placing entries for it in the named.conf file.

In our example the zone file is named my-site.zone, and, although not explicitly stated, the file my-site.zone should be located in the default directory of /var/named/chroot/var/named in a chroot configuration or in /var/named in a regular one. With Debian / Ubuntu, references to the full file path will have to be used. Use the code:

zone ¿my-web-site.org¿ {

   type master;
   notify no;
   allow-query { any; };
   file ¿my-site.zone¿;

};

In addition, you can insert additional entries in the named.conf file to reference other Web domains you host. Here is an example for another-site.com using a zone file named another-site.zone.

zone ¿another-site.com¿ {

   type master;
   notify no;
   allow-query { any; };
   file ¿another-site.zone¿;

};

Note: The allow-query directive defines the networks that are allowed to query your DNS server for information on any zone. For example, to limit queries to only your 192.168.1.0 network, you could modify the directive to:

allow-query { 192.168.1.0/24; };

Next, you have to format entries to handle the reverse lookups for your IP addresses. In most cases, your ISP handles the reverse zone entries for your public IP addresses, but you will have to create reverse zone entries for your SOHO/home environment using the 192.168.1.0/24 address space. This isn¿t important for the Windows clients on your network, but some Linux applications require valid forward and reverse entries to operate correctly.

The forward domain lookup process for mysite.com scans the FQDN from right to left to get to get increasingly more specific information about the authoritative servers to use. Reverse lookups operate similarly by scanning an IP address from left to right to get increasingly specific information about an address.

The similarity in both methods is that increasingly specific information is sought, but the noticeable difference is that for forward lookups the scan is from right to left, and for reverse lookups the scan is from left to right. This difference can be seen in the formatting of the zone statement for a reverse zone in /etc/named.conf file where the main in-addr.arpa domain, to which all IP addresses belong, is followed by the first 3 octets of the IP address in reverse order. This order is important to remember or else the configuration will fail. This reverse zone definition for named.conf uses a reverse zone file named 192-168-1.zone for the 192.168.1.0/24 network.

zone ¿1.168.192.in-addr.arpa¿ {
   type master;
   notify no;
   file ¿192-168-1.zone¿;
};

Your patience will soon be rewarded. It's time to talk about the views! Let's go!
The Caching Nameserver localhost_resolver View

The localhost_resolver view is used for your caching DNS server configuration and should look like this:

view "localhost_resolver"
{
/* This view sets up named to be a localhost resolver 
 * ( caching only nameserver ). If all you want is a 
 * caching-only nameserver, then you need only define this view:
 */
        match-clients           { localhost; };
        match-destinations      { localhost; };
        recursion yes;
 
        /* these are zones that contain definitions for all the localhost
         * names and addresses, as recommended in RFC1912 - these names should
         * ONLY be served to localhost clients:
         */
        include "/etc/named.rfc1912.zones";

        /*
         *  Include zonefiles for internal zones
         */
        include "/var/named/zones/internal/internal_zones.conf";
};

There are some quick facts you should be aware of with your caching name server configuration:

a. Make sure this section only refers to including the /etc/named.rfc1912.zones file. Other include references to files such as named.root.hints could cause errors when starting the named daemon.

b. If you want your server to be only a caching DNS server, then delete all other views in named.conf and restart the named daemon.

[root@bigboy tmp]# /etc/init.d/named restart

c. Make all the other machines on your network point to the caching DNS server as their primary DNS server.

d. Remember that all DNS queries done on your DNS server appear to come from localhost. If your server is also an authoritative server for your domain, you will have to include a reference to your domain's zone files in this section for the server's own DNS lookups to work. If not, queries from clients defined by the internal and external ACLs will work correctly, but queries for the domain from the server itself will fail. In this example we have included a reference to the internal_zones.conf zone file which we'll visit again soon. This line can be deleted if your server isn't an authoritative server for your domain.

Note: If you have a localhost only view like this, make sure you don't reference localhost in any of your other views as one view will take precedence over the other for queries from your server. This could lead to unpredictable results.
The Internal View

In this example I included an ACL for network 192.168.17.0 /24 called safe-subnet to help clarify the use of ACLs in more complex environments. Once the ACL was defined, I then inserted a reference to the safe-subnet in the match-clients statement in the internal view. Therefore the local network (192.168.1.0 /24), the other trusted network (192.168.17.0), and localhost get DNS data from the zone files in the internal view.

// ACL statement

acl ¿safe-subnet¿ { 192.168.17.0/24; };

view ¿internal¿ { // What the home network will see
 
   match-clients      { localnets; localhost; safe-subnet; };
   match-destinations { localnets; localhost; safe-subnet; };

   recursion yes;
 
   // all views must contain the root hints zone:
   include "/etc/named.root.hints";

   // These are your "authoritative" internal zones, and would probably
   // also be included in the "localhost_resolver" view above :

   /*
   *  Include zonefiles for internal zones
   */
   include "/var/named/zones/internal/internal_zones.conf";

};


The question you may have on your mind is, "Where are the zone file definitions?". Don't worry, there is an include statement that refers to a file named internal_zones.conf that contains them all as we see here:

// File internal_zones.conf

zone "1.168.192.in-addr.arpa" IN {
   type master;
   file "/var/named/zones/internal/192.168.1.zone";
   allow-update { none; };
};

zone "my-web-site.org" IN {
   type master;
   file "/var/named/zones/internal/my-web-site.org.zone";
   allow-update { none; };
};

I'll discuss how to handle queries from clients outside your trusted networks in the next section where an external view can be used.
The External View

You can also setup an external view that will be used for DNS queries from clients outside your network, such as the Internet. In this case external queries get results from zone files in the /var/named/zones/external directory.

view ¿external¿ { // What the Internet will see
 
   /* This view will contain zones you want to serve only to "external"
    * clients that have addresses that are not on your directly attached 
    * LAN interface subnets:
    */

   match-clients      { any; };
   match-destinations { any; };
 
   recursion no;
   // you'd probably want to deny recursion to external clients, so you don't
   // end up providing free DNS service to all takers
 
   // all views must contain the root hints zone:
   include "/etc/named.root.hints";

   // These are your "authoritative" external zones, and would probably
   // contain entries for just your web and mail servers:

   zone "253.158.97.in-addr.arpa" IN {
      type master;
      file "/var/named/zones/external/97.158.253.zone";
      allow-update { none; };
   };
  
   zone "my-web-site.org" IN {
      type master;
      file "/var/named/zones/external/my-web-site.org.zone";
      allow-update { none; };
   };
};

Notice that the reverse zone file gives results for public internet addresses, and of course, the forward zone file should only provide responses with Internet accessible addresses.

Note: In the external view, you may be tempted to use an exclamation mark (!) to eliminate networks used in the internal view like this. Be careful, it is best to use "any;" for your external view as the exclamation mark (!) is not honored with some versions of BIND in views named "external".

; !!! CAUTION !!!

match-clients      { !localnets; !localhost; !safe-subnet; };
match-destinations { !localnets; !localhost; !safe-subnet; };


The views listed here are purely to illustrate their use. The sample home network we have been using doesn¿t need to have the ACL statement at all as the built in ACLs localnets and localhost are sufficient. The sample network won¿t need the safe-subnet section in the match-clients line either as there is only one subnet in the configuration.

Views are also not just for NAT. If you run an Internet data center, you can set up your DNS server to act as a caching server to servers on all the Internet networks you own and no one else, and then provide authoritative responses to your customers' domains to everyone. Views can be very useful.
Configuring The Zone Files

You need to keep a number of things in mind when configuring DNS zone files:

    * In all zone files, you can place a comment at the end of any line by inserting a semi-colon character then typing in the text of your comment.
    * By default, your zone files are located in the /var/named or /var/named/chroot/var/named or /etc/bind directories depending on your Linux distribution.
    * Each zone file contains a variety of records (SOA, NS, MX, A, and CNAME) that govern different areas of BIND. 

Take a closer look at these entries in the zone file.
Time to Live Value

The very first entry in the zone file is usually the zone's time to live (TTL) value. Caching DNS servers cache the responses to their queries from authoritative DNS servers. The authoritative servers not only provide the DNS answer but also provide the information's time to live, which is the period for which it's valid.

The purpose of a TTL is to reduce the number of DNS queries the authoritative DNS server has to answer. If the TTL is set to three days, then caching servers use the original stored response for three days before making the query again.

$TTL 3D

BIND recognizes several suffixes for time-related values. A D signifies days, a W signifies weeks, and an H signifies hours. In the absence of a suffix, BIND assumes the value is in seconds.
DNS Resource Records

The rest of the records in a zone file are usually BIND resource records. They define the nature of the DNS information in your zone files that's presented to querying DNS clients. They all have the general format:

Name    Class    Type    Data

There are different types of records for mail (MX), forward lookups (A), reverse lookups (PTR), aliases (CNAME) and overall zone definitions, Start of Authority (SOA). The data portion is formatted according to the record type and may consist of several values separated by spaces. Similarly, the name is also subject to interpretation based on this factor.
The SOA Record

The first resource record is the Start of Authority (SOA) record, which contains general administrative and control information about the domain. It has the format:

Name Class Type Name-Server Email-Address Serial-No Refresh Retry Expiry Minimum-TTL

The record can be long, and will sometimes wrap around on your screen. For the sake of formatting, you can insert new line characters between the fields as long as you insert parenthesis at the beginning and end of the insertion to alert BIND that part of the record will straddle multiple lines. You can also add comments to the end of each new line separated by a semicolon when you do this. Here is an example:

@       IN      SOA     ns1.my-site.com. hostmaster.my-site.com. (
                       2004100801      ; serial #
                       4H              ; refresh
                       1H              ; retry
                       1W              ; expiry
                       1D )            ; minimum

Table 18.4 explains what each field in the record means.
Table 18.4 The SOA Record Format
Field 	Description
Name 	The root name of the zone. The ¿@¿ sign is a shorthand reference to the current origin (zone) in the /etc/named.conf file for that particular database file.
Class 	There are a number of different DNS classes. Home/SOHO will be limited to the IN or Internet class used when defining IP address mapping information for BIND. Other classes exist for non Internet protocols and functions but are very rarely used.
Type 	The type of DNS resource record. In the example, this is an SOA resource record. Other types of records exist, which I¿ll cover later.
Name-server 	Fully qualified name of your primary name server. Must be followed by a period.
Email-address 	The e-mail address of the name server administrator. The regular @ in the e-mail address must be replaced with a period instead. The e-mail address must also be followed by a period.
Serial-no 	A serial number for the current configuration. You can use the date format YYYYMMDD with an incremented single digit number tagged to the end. This will allow you to do multiple edits each day with a serial number that both increments and reflects the date on which the change was made.
Refresh 	Tells the slave DNS server how often it should check the master DNS server. Slaves aren¿t usually used in home / SOHO environments.
Retry 	The slave¿s retry interval to connect the master in the event of a connection failure. Slaves aren¿t usually used in home / SOHO environments.
Expiry 	Total amount of time a slave should retry to contact the master before expiring the data it contains. Future references will be directed towards the root servers. Slaves aren¿t usually used in home/SOHO environments.
Minimum-TTL 	There are times when remote clients will make queries for subdomains that don¿t exist. Your DNS server will respond with a no domain or NXDOMAIN response that the remote client caches. This value defines the caching duration your DNS includes in this response.

So in the example, the primary name server is defined as ns1.my-site.com with a contact e-mail address of hostmaster@my-site.com. The serial number is 2004100801 with refresh, retry, expiry, and minimum values of 4 hours, 1 hour, 1 week, and 1 day, respectively.
NS, MX, A And CNAME Records

Like the SOA record, the NS, MX, A, PTR and CNAME records each occupy a single line with a very similar general format. Table 18.5 outlines the way they are laid out.
Table 18.5 NS, MX, A, PTR and CNAME Record Formats
Record Type 	Name Field 	Class Field2 	Type Field 	Data Field
NS 	Usually blank1 	IN 	NS 	IP address or CNAME of the name server
MX 	Domain to be used for mail. Usually the same as the domain of the zone file itself. 	IN 	MX 	Mail server DNS name
A 	Name of a server in the domain 	IN 	A 	IP address of server
CNAME 	Server name alias 	IN 	CNAME 	"A" record name for the server
PTR 	Last octet of server¿s IP address 	IN 	PTR 	Fully qualified server name

       a. If the search key to a DNS resource record is blank it reuses the search key from the previous record which in this case of is the SOA @ sign.
       b. For most home / SOHO scenarios, the Class field will always be IN or Internet. You should also be aware that IN is the default Class, and BIND will assume a record is of this type unless otherwise stated. 

If you don't put a period at the end of a host name in a SOA, NS, A, or CNAME record, BIND will automatically tack on the zone file's domain name to the name of the host. So, BIND assumes an A record with www refers to www.my-site.com. This may be acceptable in most cases, but if you forget to put the period after the domain in the MX record for my-site.com, BIND attaches the my-site.com at the end, and you will find your mail server accepting mail only for the domain my-site.com.mysite.com.
TXT Records

There is also a less frequently used DNS TXT record that can be configured to contain additional generic information. The data section of the record typically has the format "name=value", where "name" is the name to be given to the type of data, and "value" is the value assigned to the name as seen in this example.

my-web-site.org. TXT "v=spf1 -all"

TXT records are increasingly being used to help fight SPAM using the Sender Policy Framework (SPF) method. SPF TXT records are used by systems receiving mail to interrogate the DNS of the domain which appears in the email (the sender) and determine if the originating IP address of the mail (the source) is authorized to send mail for the sender's domain.

Further description of the use of TXT records is beyond the scope of this book, but you should at least be aware that they can be up to 255 characters in length and that this feature is often exploited in distributed denial of service (DDoS) attacks. The section on "Simple DNS Security" explains how to configure your DNS server to not participate in such an event.
Sample Forward Zone File

Now that you know the key elements of a zone file, it's time to examine a working example for the domain my-site.com.

;
; Zone file for my-site.com
;
; The full zone file
;
$TTL 3D
@       IN      SOA     ns1.my-site.com. hostmaster.my-site.com. (
                       200211152       ; serial#
                       3600            ; refresh, seconds
                       3600            ; retry, seconds
                       3600            ; expire, seconds
                       3600 )          ; minimum, seconds

                NS      www             ; Inet Address of nameserver
my-site.com.    MX      10 mail         ; Primary Mail Exchanger
  
localhost       A       127.0.0.1
bigboy          A       97.158.253.26
mail            CNAME   bigboy
ns1             CNAME   bigboy
www             CNAME   bigboy


Notice that in this example:

    * Server ns1.my-site.com is the name server for my-site.com. In corporate environments there may be a separate name server for this purpose. Primary name servers are more commonly called ns1 and secondary name servers ns2. 

    * The minimum TTL value ($TTL) is three days, therefore remote DNS caching servers will store learned DNS information from your zone for three days before flushing it out of their caches. 

    * The MX record for my-site.com points to the server named mail.my-site.com. 

    * ns1 and mail are actually CNAMEs or aliases for the Web server www. So here you have an example of the name server, mail server, and Web server being the same machine. If they were all different machines, then you'd have an A record entry for each. 

www                 A          97.158.253.26
mail                A          97.158.253.134
ns                  A          97.158.253.125

It is a required practice to increment your serial number whenever you edit your zone file. When DNS is setup in a redundant configuration, the slave DNS servers periodically poll the master server for updated zone file information, and use the serial number to determine whether the data on the master has been updated. Failing to increment the serial number, even though the contents of the zone file have been modified, could cause your slaves to have outdated information.
Sample Reverse Zone File

Now you need to make sure that you can do a host query on all your home network's PCs and get their correct IP addresses. This is very important if you are running a mail server on your network, because sendmail typically relays mail only from hosts whose IP addresses resolve correctly in DNS. NFS, which is used in network-based file access, also requires valid reverse lookup capabilities.

This is an example of a zone file for the 192.168.1.x network. All the entries in the first column refer to the last octet of the IP address for the network, so the IP address 192.168.1.100 points to the name bigboy.my-site.com.

Notice how the main difference between forward and reverse zone files is that the reverse zone file only has PTR and NS records. Also the PTR records cannot have CNAME aliases.

;
; Filename: 192-168-1.zone
;
; Zone file for 192.168.1.x
;
$TTL 3D
@       IN        SOA        www.my-site.com.  hostmaster.my-site.com. (
                            200303301          ; serial number
                            8H                 ; refresh, seconds
                            2H                 ; retry, seconds
                            4W                 ; expire, seconds
                            1D )               ; minimum, seconds

                  NS         www                ; Nameserver Address

|100                PTR        bigboy.my-site.com.
|103                PTR        smallfry.my-site.com.
|102                PTR        ochorios.my-site.com.
|105                PTR        reggae.my-site.com.
|
|32                 PTR        dhcp-192-168-1-32.my-site.com.
|33                 PTR        dhcp-192-168-1-33.my-site.com.
|34                 PTR        dhcp-192-168-1-34.my-site.com.
|35                 PTR        dhcp-192-168-1-35.my-site.com.
|36                 PTR        dhcp-192-168-1-36.my-site.com.

I included entries for addresses 192.168.1.32 to 192.168.1.36, which are the addresses the DHCP server issues. SMTP mail relay wouldn't work for PCs that get their IP addresses via DHCP if these lines weren't included.

You may also want to create a reverse zone file for the public NAT IP addresses for your home network. Unfortunately, ISPs won't usually delegate this ability for anyone with less than a Class C block of 256 IP addresses. Most home DSL sites wouldn't qualify.
Loading Your New Configuration Files

Make sure your configuration files are in the correct locations and the serial numbers of the zone files you may have modified have been updated. If all seems correct, restart BIND named daemon for the configuration to become active.

[root@bigboy tmp]# /etc/init.d/named restart

Take a look at the end of your /var/log/messages file to make sure there are no errors.
Make Sure Your /etc/hosts File Is Correctly Updated

Chapter 3, "Linux Networking", explains how to correctly configure your /etc/hosts file. Some programs, such as sendmail, require a correctly configured /etc/hosts file even though DNS is correctly configured.
Configure Your Firewall

The sample network assumes that the BIND name server and Apache Web server software run on the same machine protected by a router/firewall. The actual IP address of the server is 192.168.1.100, which is a private IP address. You'll have to use NAT for Internet users to be able to gain access to the server via the chosen public IP address, namely 97.158.253.26. If your firewall is a Linux box, you may want to consider taking a look at Chapter 14, "Linux Firewalls Using iptables", describes how to do the network address translation and allow DNS traffic through to your name server.
Fix Your Domain Registration

Remember to edit your domain registration for my-site.com, or whatever it is, so that at least one of the name servers is your new name server (97.158.253.26 in this case). Domain registrars, such as VeriSign and RegisterFree, usually provide a Web interface to help you manage your domain.

Once you've logged in with the registrar's username and password, you'll have take two steps:

    1) Create a new name server record entry for the IP address 97.158.253.26 to map to ns.my-site.com or www.my-site.com or whatever your name server is called. (This screen prompts you for both the server's IP address and name.) 

    2) Assign ns.my-site.com to handle your domain. This screen will prompt you for the server name only. 

    Sometimes, the registrar requires at least two registered name servers per domain. If you only have one, then you could either create a second name server record entry with the same IP address, but different name, or you could give your Web server a second IP address using an IP alias, create a second NAT entry on your firewall and then create the second name server record entry with the new IP address, and different name. 

It normally takes about three to four days for your updated DNS information to be propagated to all 13 of the world's root name servers. You'll therefore have to wait about this amount of time before starting to notice people hitting your new Web site.

You can use the chapter's troubleshooting section to test specific DNS servers for the information they have on your site. You'll most likely want to test your new DNS server, which should be up to date, plus a few well known ones, which should have delayed values.
```

## 4.4 Troubleshooting BIND

```text
BIND troubleshooting is usually easy to do. The named daemon updates the /var/log/messages file with detailed status messages that are frequently easy to interpret when you suspect a configuration error. The usual troubleshooting steps for network problems are also applicable. Both methodologies will be covered next.
Configuration Troubleshooting Steps

Always check your /var/logs/messages file and console output file for errors. Here are a couple examples you may come across:

    * The named daemon is started with an unedited version of the sample named.conf file which causes unusual errors on the screen. References to the nonexistent sample zone files create errors. References to both the named.rfc1912.zones and named.root files in the localhost_resolver section cause errors related to duplicate definitions. 

[root@bigboy tmp]# service named restart
Starting named: 
Error in named configuration:
/etc/named.rfc1912.zones:10: zone '.': already exists previous definition: /etc/named.root.hints:12
zone localdomain/IN: loaded serial 42
zone localhost/IN: loaded serial 42
zone 0.0.127.in-addr.arpa/IN: loaded serial 1997022700
zone 0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.ip6.arpa/IN: loaded serial 1997022700
zone 255.in-addr.arpa/IN: loaded serial 42
zone 0.in-addr.arpa/IN: loaded serial 42
zone my.internal.zone/IN: loading master file my.internal.zone.db: file not found
internal/my.internal.zone/IN: file not found
zone my.ddns.internal.zone/IN: loading master file slaves/my.ddns.internal.zone.db: file not found
internal/my.ddns.internal.zone/IN: file not found
zone my.external.zone/IN: loading master file my.external.zone.db: file not found
external/my.external.zone/IN: file not found
[FAILED]
[root@bigboy tmp]#


    * The named.conf file refers to an undefined secret key in the ddns_key of named.conf. Use the dns-keygen or dnskeygen commands to create a correct entry. 

Feb 25 20:38:49 bigboy named[4593]: /etc/named.conf:99: configuring key 'ddns_key': bad base64 encoding
Feb 25 20:38:49 bigboy named[4593]: loading configuration: bad base64 encoding

    * The named.root.hints file referred to in named.conf isn't present in the /etc or the chroot /etc directory. 

[root@bigboy tmp]# service named start
Starting named: 
Error in named configuration:
/etc/named.conf:58: open: /etc/named.root.hints: file not found
[FAILED]
[root@bigboy tmp]#


    * The named.root file referred to in the named.root.hints file isn't present. 

Feb 25 21:33:41 bigboy named[5007]: could not configure root hints from 'named.root': file not found
Feb 25 21:33:41 bigboy named[5007]: loading configuration: file not found
Feb 25 21:33:41 bigboy named[5007]: exiting (due to fatal error)

    * You are using a chroot version of BIND with a sample rndc.key file located in the /etc directory instead of the /var/named/chroot/etc/ directory. Copy the file to the correct location and restart named to fix the problem. 

[root@bigboy tmp]# service named restart
Stopping named: rndc: connect failed: connection refused
[  OK  ]
Starting named: [  OK  ]
[root@bigboy tmp]#

    * In your named.conf file you refer to a zone file that doesn't exist. This example includes both errors to the console screen and errors in the /var/log/messages file. 

[root@bigboy tmp]# service named start
Starting named: 
Error in named configuration:
zone localdomain/IN: loaded serial 42
zone localhost/IN: loaded serial 42
zone 0.0.127.in-addr.arpa/IN: loaded serial 1997022700
zone 0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.ip6.arpa/IN: loaded serial 1997022700
zone 255.in-addr.arpa/IN: loaded serial 42
zone 0.in-addr.arpa/IN: loaded serial 42
zone 2.168.192.in-addr.arpa/IN: loaded serial 2006052301
zone my-web-site.org/IN: loaded serial 2006052302
zone my-web-site.com/IN: loading master file /var/named/zones/internal/my-web-site.com.zone: file not found
internal/my-web-site.com/IN: file not found
zone 1.168.192.in-addr.arpa/IN: loaded serial 2006052301
zone my-web-site.org/IN: loaded serial 2006052302
[FAILED]
[root@bigboy tmp]#

Feb 26 01:47:10 smallfry named: zone my-web-site.com/IN: loading master file /var/named/zones/internal/my-web-site.com.zone: file not found
Feb 26 01:47:10 smallfry named: internal/my-web-site.com/IN: file not found

    * This is a tricky one that would occur in some early versions of Fedora. BIND would appear to start correctly, but none of the zone files would be loaded. In this scenario could be using a chroot version of BIND with a sample named.conf file located in the /etc directory instead of the /var/named/chroot/etc/ directory. Copy the file to the correct location and restart named to fix the problem. Delete the /etc and create a symbolic link to /var/named/chroot/etc/named.conf from /etc to ensure you always edit the correct file. 

Nov  9 17:35:41 bigboy named[1157]: starting BIND 9.2.3 -u named -t /var/named/chroot
Nov  9 17:35:41 bigboy named[1157]: using 1 CPU
Nov  9 17:35:41 bigboy named[1157]: loading configuration from ¿/etc/named.conf¿
Nov  9 17:35:41 bigboy named[1157]: listening on IPv4 interface lo, 127.0.0.1#53
Nov  9 17:35:41 bigboy named[1157]: listening on IPv4 interface eth0, 10.41.32.71#53
Nov  9 17:35:41 bigboy named[1157]: command channel listening on 127.0.0.1#953
Nov  9 17:35:41 bigboy named[1157]: command channel listening on ::1#953
Nov  9 17:35:41 bigboy named[1157]: running

    * If there are no named errors to the screen or /var/log/messages, and your domain doesn't resolve correctly when queried using the host command when you are logged into your new nameserver, then the problem could be due to you forgetting to add a zone file entry for the domain in named.conf; there could be a typographical error in your zone file; or you could have forgotten to update your zone file serial numbers. 

This isn't a comprehensive configuration error list, but it covers some common mistakes with a new configuration.
Network Troubleshooting Steps

Once configuration troubleshooting this is completed, you can continue with the following troubleshooting steps:

1) Determine whether your DNS server is accessible on DNS UDP/TCP port 53. Lack of connectivity could be caused by a firewall with incorrect, permit, NAT, or port forwarding rules to your DNS server. Failure could also be caused by the named process being stopped. It is best to test this from both inside your network and from the Internet.

Troubleshooting with TELNET is covered in Chapter 4, "Simple Network Troubleshooting".

2) Linux status messages are logged to the file /var/log/messages. Use it to make sure all your zone files are loaded when you start BIND/named. Check your /etc/named.conf file if they fail to do so. (Linux logging is covered in Chapter 5, "Troubleshooting Linux with syslog".

Feb 21 09:13:13 bigboy named: named startup succeeded
Feb 21 09:13:13 bigboy named[12026]: loading configuration from '/etc/named.conf'
Feb 21 09:13:13 bigboy named[12026]: no IPv6 interfaces found
Feb 21 09:13:13 bigboy named[12026]: listening on IPv4 interface lo, 127.0.0.1#53
Feb 21 09:13:13 bigboy named[12026]: listening on IPv4 interface wlan0, 192.168.1.100#53
Feb 21 09:13:13 bigboy named[12026]: listening on IPv4 interface eth0, 172.16.1.100#53
Feb 21 09:13:14 bigboy named[12026]: command channel listening on 127.0.0.1#953
Feb 21 09:13:14 bigboy named[12026]: zone 0.0.127.in-addr.arpa/IN: loaded serial 1997022700
Feb 21 09:13:14 bigboy named[12026]: zone 1.16.172.in-addr.arpa/IN: loaded serial 51
Feb 21 09:13:14 bigboy named[12026]: zone 1.168.192.in-addr.arpa/IN: loaded serial 51
Feb 21 09:13:14 bigboy named[12026]: zone simiya.com/IN: loaded serial 2004021401
Feb 21 09:13:14 bigboy named[12026]: zone localhost/IN: loaded serial 42
Feb 21 09:13:14 bigboy named[12026]: zone simiya.com/IN: loaded serial 200301114
Feb 21 09:13:14 bigboy named[12026]: running

3) Use the host (nslookup in Windows) command for both forward and reverse lookups to make sure the zone files were configured correctly.

If this fails, try:

    * Double check for your updated serial numbers in the modified files and also inspect the individual records within the files for mistakes.
    * Ensure there isn't a firewall that could be blocking DNS traffic on TCP and/or UDP port 53 between your server and the DNS server.
    * Use the dig command to determine whether the name server for your domain is configured correctly. 

Here is an example of querying DNS server ns1.my-site.com for the IP address of www.linuxhomenetworking.com. (You can also replace the name server's name with its IP address.)

[root@bigboy tmp]# host www.linuxhomenetworking.com ns1.my-site.com
Using domain server:
Name: ns1.my-site.com
Address: 192.168.1.100#53
Aliases:

www.linuxhomenetworking.com has address 65.115.71.34

[root@bigboy tmp]#

Here is an example of querying your default DNS server for the IP address of www.linuxhomenetworking.com. As you can see, the name of the specific DNS server to query has been left off the end. Failure in this case could be due not only to an error on your BIND configuration or domain registration but also to an error in your DNS client's DNS server entry in your Linux /etc/resolv.conf file or the Windows TCP/IP properties for your NIC.

[root@bigboy tmp]# host www.linuxhomenetworking.com
www.linuxhomenetworking.com has address 65.115.71.34
[root@bigboy tmp]#

4) You can also use the dig command to determine whether known DNS servers on the Internet have received a valid update for your zone. (Remember if you decide to change the DNS servers for your domain that it could take up to four days for it to propagate across the Internet.)

The format for the command is:

dig <domain-name> <name-server> soa

The name server is optional. If you specify a name server, then dig queries that name server instead of the Linux server's default name server. It is sometimes good to query both your name server, as well as a well known name server such as ns1.yahoo.com to make sure your DNS records have propagated properly. The dig command only works with fully qualified domain names only, because it doesn't refer to the /etc/resolv.conf file.

This command uses the local DNS server for the query. It returns the SOA record information and the addresses of the domain's DNS servers in the authority section.

[root@bigboy tmp]# dig linuxhomenetworking.com SOA
...
...
;; AUTHORITY SECTION:
linuxhomenetworking.com. 3600   IN      NS      ns1.myisp.net.
linuxhomenetworking.com. 3600   IN      NS      ns2.myisp.net.

;; ADDITIONAL SECTION:
ns1.myisp.net.      3600    IN      A       65.115.70.68
ns2.myisp.net.      3600    IN      A       65.115.70.69
...
...
[root@bigboy tmp]#

Here is a successful dig using DNS server ns1.yahoo.com for the query. As before, it returns the SOA record for the zone.

[root@bigboy tmp]# dig ns1.yahoo.com linuxhomenetworking.com SOA
...
...
;; AUTHORITY SECTION:
linuxhomenetworking.com. 3600   IN      NS      ns2.myisp.net.
linuxhomenetworking.com. 3600   IN      NS      ns1.myisp.net.
 
;; ADDITIONAL SECTION:
ns1.myisp.net.      3600    IN      A       65.115.70.68
ns2.myisp.net.      3600    IN      A       65.115.70.69
...
...
[root@bigboy tmp]#

Sometimes your SOA dig will fail. This command uses the DNS server ns1.yahoo.com for the query. In this case the authority section doesn't know of the domain and points to the name server for the entire .com domain at VeriSign.

[root@bigboy tmp]# dig  ns1.yahoo.com linuxhomeqnetworking.com SOA
...
...
;; QUESTION SECTION:
;linuxhomeqnetworking.com.      IN      SOA
;; AUTHORITY SECTION:
com.                    0       IN      SOA     a.gtld-servers.net. nstld.verisign-grs.com.  1077341254 1800 900 604800 900
...
...
[root@bigboy tmp]#

Possible causes of failure include:

    * Typographical errors. In this case the misspelling "linuxhomeqnetworking.com" was entered on the command line.
    * Incorrect domain registration.
    * Correct domain registration, but there is a lag in the propagation of the domain information across the Internet. Delays of up to four days are not uncommon.
    * A firewall could be blocking DNS traffic on TCP and/or UDP port 53 between your server and the DNS server. 
```

## 4.7 Migrating Your Web Site In-House

```text
It is important to have a detailed migration plan if you currently use an external company to host your Web site and wish to move the site to a server at home or in your office. At the very least your plan should include these steps:

   a. There is no magic bullet that will allow you to tell all the caching DNS servers in the world to flush their caches of your zone file entries. Your best alternative is to request your existing service provider to set the TTL on my-site.com in the DNS zone file to a very low value, say one minute. As the TTL is usually set to a number of days, it will take at least three to five days for all remote DNS servers to recognize the change. Once the propagation is complete, it will take only one minute to see the results of the final DNS configuration switch to your new server. If anything goes wrong, you can then revert to the old configuration, knowing it will rapidly recover within minutes rather than days.
   b. Set up your test server in house. Edit the /etc/hosts file to make www.my-site.com refer to its own IP address, not that of the www.my-site.com site that is currently in production. This file is usually given a higher priority than DNS, therefore the test server will begin to think that www.my-site.com is really hosted on itself. You may also want to add an entry for mail.my-site.com if the new Web server is going to also be your new mail server.
   c. Test your server based applications from the server itself. This should include mail, Web, and so on.
   d. Test the server from a remote client. You can test the server running as www.my-site.com even though DNS hasn't been updated. Just edit your /etc/hosts file on your Web browsing Linux PC to make www.my-site.com map to the IP address of the new server. In the case of Windows, the file would be C:\WINDOWS\system32\drivers\etc\hosts. You may also want to add an entry for mail.my-site.com if the new Web server is going to also be your new mail server. Your client will usually refer to these files first before checking DNS, hence you can use them to predefine some DNS lookups at the local client level only.
   e. Once testing is completed, coordinate with your Web hosting provider to update your domain registration's DNS records for www.my-site.com to point to your new Web server. As the TTLs were set to one minute previously, you'll be able to see results of the migration within minutes.
   f. Once complete, you can set the TTL back to the original value to help reduce the volume of DNS query traffic hitting your DNS server.
   h. Fix your /etc/hosts files by deleting the test entries you had before.
   i. You may also want to take over your own DNS. Edit your my-site.com DNS entries with VeriSign, RegisterFree or whoever you bought your domain from to point to your new DNS servers. 

Remember, you don't have to host DNS or mail in-house, this could be left in the hands of your service provider. You can then migrate these services in-house as your confidence in hosting becomes greater.

Finally, if you have concerns that your service provider won't cooperate, then you could explain to the provider that you want to test its failover capabilities to a duplicate server that you host in-house. You can then decide whether the change will be permanent once you have failed over back and forth a few times.
```

## 4.6 DHCP Considerations For DNS

```text
If you have a DHCP server on your network, you'll need to make it assign the IP address of the Linux box as the DNS server it tells the DHCP clients to use. If your Linux box is the DHCP server, then you may need to refer to Chapter 8, "Configuring the DHCP Server".
```

## 4.7 Simple DNS Security

```text
DNS can reveal a lot about the nature of your domain. You should take some precautions to conceal some of the information for the sake of security.
Zone Transfer Protection

The host command does one DNS query at a time, but the dig command is much more powerful. When given the right parameters it can download the entire contents of your domain's zone file.

In this example, the AFXR zone transfer parameter is used to get the contents of the my-site.com zone file.

|   [root@smallfry tmp]# dig my-site.com AXFR
|   ; <<>> DiG 9.2.3 <<>> my-site.com AXFR
|   ;; global options:  printcmd
|   my-site.com.            3600    IN      SOA     www.my-site.com. hostmaster.my-site.com. 2004110701  3600 3600 3600 3600
|   my-site.com.            3600    IN      NS      ns1.my-site.com.
|   my-site.com.            3600    IN      MX      10 mail.my-site.com.
|   192-168-1-96.my-site.com. 3600  IN      A       192.168.1.96
|   192-168-1-97.my-site.com. 3600  IN      A       192.168.1.97
|   192-168-1-98.my-site.com. 3600  IN      A       192.168.1.98
|   bigboy.my-site.com.     3600    IN      A       192.168.1.100
|   gateway.my-site.com.    3600    IN      A       192.168.1.1
|   localhost.my-site.com.  3600    IN      A       127.0.0.1
|   mail.my-site.com.       3600    IN      CNAME   www.my-site.com.
|   ns1.my-site.com.        3600    IN      CNAME   www.my-site.com.
|   ntp.my-site.com.        3600    IN      CNAME   www.my-site.com.
|   smallfry.my-site.com.   3600    IN      A       192.168.1.102
|   www.my-site.com.        3600    IN      A       192.168.1.100
|   my-site.com.            3600    IN      SOA     www.my-site.com. hostmaster.my-site.com. 2004110701  3600 3600 3600 3600
|   ;; Query time: 16 msec
|   ;; SERVER: 192.168.1.100#53(192.168.1.100)
|   ;; WHEN: Sun Nov 14 20:21:07 2004
|   ;; XFR size: 16 records
|   [root@smallfry tmp]#

This may not seem like an important security threat at first glance, but it is. Anyone can use this command to determine all your server's IP addresses and from the names determine what type of server it is and then launch an appropriate cyber attack.

In a simple home network, without master and slave servers, zone transfers should be disabled. You can do this by applying the allow-transfer directive to the global options section of your named.conf file.

options {
   allow-transfer {none;};
};

Once applied, your zone transfer test should fail.

[root@smallfry tmp]# dig my-site.com AXFR
...
...
 ; <<>> DiG 9.2.3 <<>> my-site.com AXFR
 ;; global options:  printcmd
 ; Transfer failed.
 [root@smallfry tmp]#


Selectively Disabling Recursion

Your caching DNS server can unknowingly participate in a form of DDoS attack if recursive lookups are globally allowed.

Say for example that for political, religious, competitive or otherwise malicious reasons your web site is targeted for an attack. First, a hacker breaks into the authoritative DNS server for a sub domain, like my-web-site.org, and adds a large TXT record to the sub domain. The hacker then sends thousands of queries to unsecured caching DNS servers requesting the TXT record, but there is a catch. The queries use a false source IP address that corresponds to the IP address of the DNS server for your website. The queries are small, but the responses are amplified by the size of the TXT information, and your DNS server quickly becomes overwhelmed by the flurry of replies. Without DNS, your web site goes off the air. For the administrator of the caching DNS servers, the additional load of the queries can be unnoticeable, but when multiplied by thousands of other poorly configured servers, the attack on your site becomes lethal.

The allow-recursion directive placed in the options section of your named.conf file can be used to restrict the networks to which recursive lookups are allowed. In this example an ACL is also used to limit lookups to localhost and the 192.168.1.0/24 network.

|    acl "recursive_subnets" {	
|           192.168.1.0/24;
|           localhost;
|    };
|    
|    options {
|             allow-recursion { "recursive_subnets"; };
|    };

Note: This does not restrict forward or reverse lookups defined by the zone files on the server. The server will answer all queries for my-web-site.org if it owns that domain, but it won't respond to queries for servers in another domain such as google.com.
Naming Convention Security

Your my-site.com domain will probably have a www and a mail subdomain, and they should remain obvious to all. You may want to adjust your DNS views so that to external users, your MySQL database server doesn't have the letters "DB" or "SQL" in the name, or that your firewall doesn't have the letters "FW" in its name either. This may good for ease of reference within the company, but to the Internet these names provide rapid identifiaction of the types of malicious exploits a hacker could use to break in. Web site security refers to anything that helps to guarantee the availability of the site, this is just one of many methods you can use.
```

## 4.8 Conclusion

```text
DNS management is a critical part of the maintenance of any Web site. Fortunately, although it can be a little complicated, DNS modifications are usually infrequent, because the IP address of a server is normally fixed or static. This is not always the case. There are situations in which a server's IP address will change unpredictably and frequently, making DNS management extremely difficult. Dynamic DNS was created as a solution to this and is explained in Chapter 19, "Dynamic DNS".

Retrieved from "http://www.linuxhomenetworking.com/wiki/index.php/Quick_HOWTO_:_Ch18_:_Configuring_DNS"
```

## 4.9 Summary

```text
	Test DNS resolution:
	$host <name> 

	Perform lookup:
	$host <IP address> 

	on windows host command is replaced by nslookup

	List of DNS servers for current machine:
	$ cat /etc/resolv.conf
```

## 4.10 Make DNS changes apply, refresh DNS cache

```text
	/etc/rc.d/init.d/nscd restart
```

## 4.11 DNS records

```text
This List of DNS record types provides an overview of types of resource records (database records) stored in the zone files of the Domain Name System (DNS).

The DNS implements a distributed, hierarchical, and redundant database for information associated with Internet domain names and addresses. In these domain servers, different record types are used for different purposes.

For an introduction to the domain name system, see Domain Name System.
Contents

Resource records
Code¿ 	Number¿ 	Defining RFC¿ 	Description 	Function
A 	1 	RFC 1035 	address record 	Returns a 32-bit IPv4 address, most commonly used to map hostnames to an IP address of the host, but also used for DNSBLs, storing subnet masks in RFC 1101, etc.
AAAA 	28 	RFC 3596 	IPv6 address record 	Returns a 128-bit IPv6 address, most commonly used to map hostnames to an IP address of the host.
AFSDB 	18 	RFC 1183 	AFS database record 	Location of database servers of an AFS cell. This record is commonly used by AFS clients to contact AFS cells outside their local domain. A subtype of this record is used by the obsolete DCE/DFS file system.
APL 	42 	RFC 3123 	Address Prefix List 	Specify lists of address ranges, e.g. in CIDR format, for various address families. Experimental.
CERT 	37 	RFC 4398 	Certificate record 	Stores PKIX, SPKI, PGP, etc.
CNAME 	5 	RFC 1035 	Canonical name record 	Alias of one name to another: the DNS lookup will continue by retrying the lookup with the new name.
DHCID 	49 	RFC 4701 	DHCP identifier 	Used in conjunction with the FQDN option to DHCP
DLV 	32769 	RFC 4431 	DNSSEC Lookaside Validation record 	For publishing DNSSEC trust anchors outside of the DNS delegation chain. Uses the same format as the DS record. RFC 5074 describes a way of using these records.
DNAME 	39 	RFC 2672 	delegation name 	DNAME creates an alias for a name and all its subnames, unlike CNAME, which aliases only the exact name in its label. Like the CNAME record, the DNS lookup will continue by retrying the lookup with the new name.
DNSKEY 	48 	RFC 4034 	DNS Key record 	The key record used in DNSSEC. Uses the same format as the KEY record.
DS 	43 	RFC 4034 	Delegation signer 	The record used to identify the DNSSEC signing key of a delegated zone
HIP 	55 	RFC 5205 	Host Identity Protocol 	Method of separating the end-point identifier and locator roles of IP addresses.
IPSECKEY 	45 	RFC 4025 	IPSEC Key 	Key record that can be used with IPSEC
KEY 	25 	RFC 2535[1] and RFC 2930[2] 	key record 	Used only for SIG(0) (RFC 2931) and TKEY (RFC 2930).[3] RFC 3445 eliminated their use for application keys and limited their use to DNSSEC.[4] RFC 3755 designates DNSKEY as the replacement within DNSSEC.[5]
KX 	36 	RFC 2230 	Key eXchanger record 	Used with some cryptographic systems (not including DNSSEC) to identify a key management agent for the associated domain-name. Note that this has nothing to do with DNS Security. It is Informational status, rather than being on the IETF standards-track. It has always had limited deployment, but is still in use.
LOC 	29 	RFC 1876 	Location record 	Specifies a geographical location associated with a domain name
MX 	15 	RFC 1035 	mail exchange record 	Maps a domain name to a list of message transfer agents for that domain
NAPTR 	35 	RFC 3403 	Naming Authority Pointer 	Allows regular expression based rewriting of domain names which can then be used as URIs, further domain names to lookups, etc.
NS 	2 	RFC 1035 	name server record 	Delegates a DNS zone to use the given authoritative name servers
NSEC 	47 	RFC 4034 	Next-Secure record 	Part of DNSSEC¿used to prove a name does not exist. Uses the same format as the (obsolete) NXT record.
NSEC3 	50 	RFC 5155 	NSEC record version 3 	An extension to DNSSEC that allows proof of nonexistence for a name without permitting zonewalking
NSEC3PARAM 	51 	RFC 5155 	NSEC3 parameters 	Parameter record for use with NSEC3
PTR 	12 	RFC 1035 	pointer record 	Pointer to a canonical name. Unlike a CNAME, DNS processing does NOT proceed, just the name is returned. The most common use is for implementing reverse DNS lookups, but other uses include such things as DNS-SD.
RRSIG 	46 	RFC 4034 	DNSSEC signature 	Signature for a DNSSEC-secured record set. Uses the same format as the SIG record.
RP 	17 	RFC 1183 	Responsible person 	Information about the responsible person(s) for the domain. Usually a email adress with the @ replaced by a .
SIG 	24 	RFC 2535 	Signature 	Signature record used in SIG(0) (RFC 2931) and TKEY (RFC 2930).[5] RFC 3755 designated RRSIG as the replacement for SIG for use within DNSSEC.[5]
SOA 	6 	RFC 1035 	start of authority record 	Specifies authoritative information about a DNS zone, including the primary name server, the email of the domain administrator, the domain serial number, and several timers relating to refreshing the zone.
SPF 	99 	RFC 4408 	Sender Policy Framework 	Specified as part of the SPF protocol in preference to the earlier provisional practice of storing SPF data in TXT records. Uses the same format as the earlier TXT record.
SRV 	33 	RFC 2782 	Service locator 	Generalized service location record, used for newer protocols instead of creating protocol-specific records such as MX.
SSHFP 	44 	RFC 4255 	SSH Public Key Fingerprint 	Resource record for publishing SSH public host key fingerprints in the DNS System, in order to aid in verifying the authenticity of the host.
TA 	32768 	None 	DNSSEC Trust Authorities 	Part of a deployment proposal for DNSSEC without a signed DNS root. See the IANA database and Weiler Spec for details. Uses the same format as the DS record.
TKEY 	249 	RFC 2930 	secret key record 	A method of providing keying material to be used with TSIG that is encrypted under the public key in an accompanying KEY RR.[6]
TSIG 	250 	RFC 2845 	Transaction Signature 	Can be used to authenticate dynamic updates as coming from an approved client, or to authenticate responses as coming from an approved recursive name server[7] similar to DNSSEC.
TXT 	16 	RFC 1035 	Text record 	Originally for arbitrary human-readable text in a DNS record. Since the early 1990s, however, this record more often carries machine-readable data, such as specified by RFC 1464, opportunistic encryption, Sender Policy Framework (although this provisional use of TXT records is deprecated in favor of SPF records), DomainKeys, DNS-SD, etc.

Other types and pseudo resource records

Other types of records simply provide some types of information (for example, an HINFO record gives a description of the type of computer/OS a host uses), or others return data used in experimental features. The "type" field is also used in the protocol for various operations.
Code¿ 	Number¿ 	Defining RFC¿ 	Description 	Function
* 	255 	RFC 1035 	All cached records 	Returns all records of all types known to the name server. If the name server does not have any information on the name, the request will be forwarded on. The records returned may not be complete. For example, if there is both an A and an MX for a name, but the name server has only the A record cached, only the A record will be returned. Sometimes referred to as "ANY", for example in Windows nslookup and Wireshark.
AXFR 	252 	RFC 1035 	Full Zone Transfer 	Transfer entire zone file from the master name server to secondary name servers.
IXFR 	251 	RFC 1995 	Incremental Zone Transfer 	Requests a zone transfer of the given zone but only differences from a previous serial number. This request may be ignored and a full (AXFR) sent in response if the authoritative server is unable to fulfill the request due to configuration or lack of required deltas.
OPT 	41 	RFC 2671 	Option 	This is a "pseudo DNS record type" needed to support EDNS

	4.12
```

## 4.2 Linux / UNIX: DNS Lookup Commands, host and dig

```text
by Vivek Gite on November 8, 2010 · 5 comments

How do I perform dns lookup under Linux or UNIX or Apple OS X operating systems without using 3rd party web sites for troubleshooting DNS usage?

You can use any one of the following dns lookup utility under Linux / UNIX. You can skip all 3rd party websites and use the following to debug your dns servers and lookup issues:

[a] host command - DNS lookup utility.

[b] dig command - DNS lookup utility.

Both commands will allow you to get answer to various dns queries such as the IP address (A), mail exchanges (MX), name servers (NS), text annotations (TXT), or ANY (all) type.
host DNS Lookup Examples

host command is a simple utility for performing DNS lookups. It is normally used to convert names to IP addresses and vice versa. When no arguments or options are given, host command displays a short summary of its command line arguments and options. The syntax is as follows:

host example.com
host -t TYPE example.com
host -t a example.com

Task: Find Out the Domain IP

$ host -t a cyberciti.biz
Sample outputs:

cyberciti.biz has address 75.126.153.206

Task: Find Out the Domain Mail Server

$ host -t mx cyberciti.biz
Sample outputs:

cyberciti.biz mail is handled by 2 CYBERCITI.BIZ.S9A2.PSMTP.com.
cyberciti.biz mail is handled by 3 CYBERCITI.BIZ.S9B1.PSMTP.com.
cyberciti.biz mail is handled by 4 CYBERCITI.BIZ.S9B2.PSMTP.com.
cyberciti.biz mail is handled by 1 CYBERCITI.BIZ.S9A1.PSMTP.com.

Task: Find Out the Domain Name Servers

$ host -t ns cyberciti.biz
Sample outputs:

cyberciti.biz name server ns2.nixcraft.net.
cyberciti.biz name server ns1.nixcraft.net.
cyberciti.biz name server ns5.nixcraft.net.
cyberciti.biz name server ns4.nixcraft.net.

Task: Find Out the Domain TXT Recored (e.g., SPF)

$ host -t txt cyberciti.biz
Sample outputs:

cyberciti.biz descriptive text "v=spf1 a mx ip4:74.86.48.99 ip4:74.86.48.98 ip4:74.86.48.102 ip4:74.86.48.101 ip4:74.86.48.100 ip4:72.26.218.170 ip4:93.89.92.12 ip4:180.92.186.178 include:_spf.google.com ~all"

Task: Find Out the Domain CNAME Record

$ host -t cname files.cyberciti.biz
Sample outputs:

files.cyberciti.biz is an alias for files.cyberciti.biz.edgesuite.net.

Task: Find Out the Domain SOA Record

$ host -t soa cyberciti.biz
Sample outputs:

cyberciti.biz has SOA record ns1.nixcraft.net. vivek.nixcraft.com. 2008072353 10800 3600 604800 3600

Task: Query Particular Name Server

Query ns2.nixcraft.net:
$ host cyberciti.biz ns2.nixcraft.net
Sample outputs:

Using domain server:
Name: ns2.nixcraft.net
Address: 75.126.168.152#53
Aliases:
cyberciti.biz has address 75.126.153.206
cyberciti.biz has IPv6 address 2607:f0d0:1002:51::4
cyberciti.biz mail is handled by 3 CYBERCITI.BIZ.S9B1.PSMTP.com.
cyberciti.biz mail is handled by 4 CYBERCITI.BIZ.S9B2.PSMTP.com.
cyberciti.biz mail is handled by 1 CYBERCITI.BIZ.S9A1.PSMTP.com.
cyberciti.biz mail is handled by 2 CYBERCITI.BIZ.S9A2.PSMTP.com.

Task: Display All Information About Domain Records and Zone

You need to pass the -a (all) option and asking host command to make a query of type ANY:
$ host -a cyberciti.biz
OR
$ host -t any cyberciti.biz
Sample outputs:

Trying "cyberciti.biz"
;; Truncated, retrying in TCP mode.
Trying "cyberciti.biz"
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 34079
;; flags: qr rd ra; QUERY: 1, ANSWER: 14, AUTHORITY: 0, ADDITIONAL: 0
;; QUESTION SECTION:
;cyberciti.biz.			IN	ANY
;; ANSWER SECTION:
cyberciti.biz.		3423	IN	AAAA	2607:f0d0:1002:51::4
cyberciti.biz.		3600	IN	SOA	ns1.nixcraft.net. vivek.nixcraft.com. 2008072353 10800 3600 604800 3600
cyberciti.biz.		3600	IN	TXT	"v=spf1 a mx ip4:74.86.48.99 ip4:74.86.48.98 ip4:74.86.48.102 ip4:74.86.48.101 ip4:74.86.48.100 ip4:72.26.218.170 ip4:93.89.92.12 ip4:180.92.186.178 include:_spf.google.com ~all"
cyberciti.biz.		3600	IN	MX	2 CYBERCITI.BIZ.S9A2.PSMTP.com.
cyberciti.biz.		3600	IN	MX	3 CYBERCITI.BIZ.S9B1.PSMTP.com.
cyberciti.biz.		3600	IN	MX	4 CYBERCITI.BIZ.S9B2.PSMTP.com.
cyberciti.biz.		3600	IN	MX	1 CYBERCITI.BIZ.S9A1.PSMTP.com.
cyberciti.biz.		2805	IN	A	75.126.153.206
cyberciti.biz.		3423	IN	NS	ns2.nixcraft.net.
cyberciti.biz.		3423	IN	NS	ns5.nixcraft.net.
cyberciti.biz.		3423	IN	NS	ns1.nixcraft.net.
cyberciti.biz.		3423	IN	NS	ns4.nixcraft.net.
cyberciti.biz.		84092	IN	RRSIG	NSEC 8 2 86400 20101125013720 20101026010313 50568 biz. OjDv09mccTZR2bYCl4D57QcnNEkBq6bNEa20ExsI6NC2sI9pmiKLnq+w UnCYxWMnkMi7WNXwIhhUWtNhV48X3wJGj1Mufrhq8MnO25JIcRE6UJF2 y12TTZHHE0UJV6HSkw1sac3XlZKXLi/oSvE/IXTsdj2SckPh+pMlaieQ jAA=
cyberciti.biz.		84092	IN	NSEC	CYBERCITIZEN.biz. NS RRSIG NSEC
Received 749 bytes from 192.168.1.254#53 in 0.1 ms

Task: Use IPv6 Query Transport

Test your dns lookup using IPv6 query transport (you must have IPV6 based connectivity including IPv6 enabled resolving name servers):

$ host -6 cyberciti.biz
$ host -6 -a cyberciti.biz
$ host -6 cyberciti.biz ns1.nixcraft.net
$ host -6 -t ns cyberciti.biz ns3.nixcraft.net

Sample outputs:

Using domain server:
Name: ns3.nixcraft.net
Address: 2001:48c8:10:1::2#53
Aliases:
cyberciti.biz name server ns2.nixcraft.net.
cyberciti.biz name server ns4.nixcraft.net.
cyberciti.biz name server ns5.nixcraft.net.
cyberciti.biz name server ns1.nixcraft.net.

Task: Reverse IP Lookup

Type the command:
$ host {IP-Address-Here}
$ host 75.126.153.206
Sample outputs:

206.153.126.75.in-addr.arpa domain name pointer www.cyberciti.biz.

Task: Get TTL Information

Type the command as follows:
$ host -v -t {TYPE} {example.com}
$ host -v -t a cyberciti.biz
$ host -v -t a i.hexindia.net
Sample outputs:

Trying "cyberciti.biz"
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 17431
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 4, ADDITIONAL: 7
;; QUESTION SECTION:
;cyberciti.biz.			IN	A
;; ANSWER SECTION:
cyberciti.biz.		1866	IN	A	75.126.153.206
;; AUTHORITY SECTION:
cyberciti.biz.		3850	IN	NS	NS1.NIXCRAFT.NET.
cyberciti.biz.		3850	IN	NS	NS4.NIXCRAFT.NET.
cyberciti.biz.		3850	IN	NS	NS5.NIXCRAFT.NET.
cyberciti.biz.		3850	IN	NS	NS2.NIXCRAFT.NET.
;; ADDITIONAL SECTION:
NS1.NIXCRAFT.NET.	85669	IN	A	72.26.218.170
NS1.NIXCRAFT.NET.	85689	IN	AAAA	2001:48c8:7::2
NS2.NIXCRAFT.NET.	85669	IN	A	75.126.168.152
NS2.NIXCRAFT.NET.	85669	IN	AAAA	2607:f0d0:1002:51::3
NS4.NIXCRAFT.NET.	85669	IN	A	93.89.92.12
NS4.NIXCRAFT.NET.	85669	IN	AAAA	2a01:348:0:15:5d59:50c:0:1
NS5.NIXCRAFT.NET.	85669	IN	AAAA	2001:48c8:10:1::2
Received 291 bytes from 10.0.80.11#53 in 2 ms

If you run the same command again, you’ll notice that the TTL number (1866) reduced.
dig DNS Lookup Examples

dig (domain information groper) or host command is a flexible tool for interrogating DNS name servers. It performs DNS lookups and displays the answers that are returned from the name server(s) that were queried. Most DNS administrators use dig to troubleshoot DNS problems because of its flexibility, ease of use and clarity of output. hos dns lookup tool have less functionality than dig.
Examples

dig @{ns1.example.com} {example.com}
dig @{ns1.example.com} {example.com} {TYPE}
dig cyberciti.biz a
dig cyberciti.biz mx
dig cyberciti.biz ns
dig cyberciti.biz txt
dig @ns1.nixcraft.net cyberciti.biz a

Task: Trace Usage

See how domains are resolved using root servers i.e. turn on tracing of the delegation path from the root name servers for the name being looked up. When tracing is enabled, dig makes iterative queries to resolve the name being looked up. It will follow referrals from the root servers, showing the answer from each server that was used to resolve the lookup:
$ dig +trace cyberciti.biz
Sample outputs:

 <<>> DiG 9.3.6-P1-RedHat-9.3.6-4.P1.el5_4.2 <<>> +trace cyberciti.biz
;; global options:  printcmd
.			41219	IN	NS	b.root-servers.net.
.			41219	IN	NS	e.root-servers.net.
.			41219	IN	NS	i.root-servers.net.
.			41219	IN	NS	d.root-servers.net.
.			41219	IN	NS	g.root-servers.net.
.			41219	IN	NS	k.root-servers.net.
.			41219	IN	NS	l.root-servers.net.
.			41219	IN	NS	c.root-servers.net.
.			41219	IN	NS	m.root-servers.net.
.			41219	IN	NS	a.root-servers.net.
.			41219	IN	NS	h.root-servers.net.
.			41219	IN	NS	j.root-servers.net.
.			41219	IN	NS	f.root-servers.net.
;; Received 436 bytes from 10.0.80.11#53(10.0.80.11) in 2 ms
biz.			172800	IN	NS	h.gtld.biz.
biz.			172800	IN	NS	c.gtld.biz.
biz.			172800	IN	NS	e.gtld.biz.
biz.			172800	IN	NS	b.gtld.biz.
biz.			172800	IN	NS	g.gtld.biz.
biz.			172800	IN	NS	a.gtld.biz.
biz.			172800	IN	NS	f.gtld.biz.
;; Received 316 bytes from 192.228.79.201#53(b.root-servers.net) in 34 ms
cyberciti.biz.		7200	IN	NS	NS5.NIXCRAFT.NET.
cyberciti.biz.		7200	IN	NS	NS1.NIXCRAFT.NET.
cyberciti.biz.		7200	IN	NS	NS2.NIXCRAFT.NET.
cyberciti.biz.		7200	IN	NS	NS4.NIXCRAFT.NET.
;; Received 115 bytes from 2001:503:8028:ffff:ffff:ffff:ffff:ff7e#53(h.gtld.biz) in 23 ms
cyberciti.biz.		3600	IN	A	75.126.153.206
cyberciti.biz.		3600	IN	NS	ns4.nixcraft.net.
cyberciti.biz.		3600	IN	NS	ns5.nixcraft.net.
cyberciti.biz.		3600	IN	NS	ns1.nixcraft.net.
cyberciti.biz.		3600	IN	NS	ns2.nixcraft.net.
;; Received 307 bytes from 2001:48c8:10:1::2#53(NS5.NIXCRAFT.NET) in 222 ms

Task: Get Only Short Answer

A quick way to just get the answer is to type the following command:
$ dig +short cyberciti.biz
Sample outputs:

75.126.153.206

Task: Display All Records

$ dig +noall +answer cyberciti.biz any
Sample outputs:

cyberciti.biz.		3490	IN	A	75.126.153.206
cyberciti.biz.		2733	IN	NS	NS2.NIXCRAFT.NET.
cyberciti.biz.		2733	IN	NS	NS1.NIXCRAFT.NET.
cyberciti.biz.		2733	IN	NS	NS4.NIXCRAFT.NET.
cyberciti.biz.		2733	IN	NS	NS5.NIXCRAFT.NET.
cyberciti.biz.		85668	IN	RRSIG	NSEC 8 2 86400 20101125013720 20101026010313 50568 biz. OjDv09mccTZR2bYCl4D57QcnNEkBq6bNEa20ExsI6NC2sI9pmiKLnq+w UnCYxWMnkMi7WNXwIhhUWtNhV48X3wJGj1Mufrhq8MnO25JIcRE6UJF2 y12TTZHHE0UJV6HSkw1sac3XlZKXLi/oSvE/IXTsdj2SckPh+pMlaieQ jAA=
cyberciti.biz.		85668	IN	NSEC	CYBERCITIZEN.biz. NS RRSIG NSEC

Task: Reverse IP Lookup

Type the following command:
$ dig -x +short {IP-Address-here}
$ dig -x 75.126.153.206 +short
Sample outputs

www.cyberciti.biz.

Task: Find Domain SOA Record

$ dig +nssearch cyberciti.biz
Sample outputs:

SOA ns1.nixcraft.net. vivek.nixcraft.com. 2008072353 10800 3600 604800 3600 from server ns5.nixcraft.net in 81 ms.
SOA ns1.nixcraft.net. vivek.nixcraft.com. 2008072353 10800 3600 604800 3600 from server ns4.nixcraft.net in 216 ms.
SOA ns1.nixcraft.net. vivek.nixcraft.com. 2008072353 10800 3600 604800 3600 from server ns1.nixcraft.net in 347 ms.
SOA ns1.nixcraft.net. vivek.nixcraft.com. 2008072353 10800 3600 604800 3600 from server ns2.nixcraft.net in 316 ms.

Task: Find Out TTL Value Using dig

$ dig +nocmd +noall +answer {TYPE} {example.com}
$ dig +nocmd +noall +answer a cyberciti.biz
Sample outputs:

cyberciti.biz.		1642	IN	A	75.126.153.206

Run again, enter:
$ dig +nocmd +noall +answer a cyberciti.biz
Sample outputs:

cyberciti.biz.		1629	IN	A	75.126.153.206

See also:

See man page for more information:
man dig
man host
Featured articles:

    20 Linux System Monitoring Tools Every SysAdmin Should Know
    20 Linux Server Hardening Security Tips
    My 10 UNIX Command Line Mistakes
    Linux: 20 Iptables Examples For New SysAdmins
    25 PHP Security Best Practices For Sys Admins
    The Novice Guide To Buying A Linux Laptop
    10 Greatest Open Source Software Of 2009
    Top 5 Email Client For Linux, Mac OS X, and Windows Users
    Top 20 OpenSSH Server Best Security Practices
    Top 10 Open Source Web-Based Project Management Software

Facebook it - Tweet it - Print it -

{ 5 comments... Please Comment & Share Your Expertise! }

kiranjith November 9, 2010 at 8:48 am

    Cool work…
    Love this one…

    Reply
Prasanth November 9, 2010 at 10:14 am

    Good Work! Nice to see all the main DNS troubleshooting commands clubbed in one page. It will be really helpful for the newbies…

    PS: Found one typo in the following command:

    Task: Get TTL Information

    ”
    $ host -t -t a cyberciti.biz
    $ host -t -t a i.hexindia.net
    ”

    It should be host -v -t a cyberciti.biz

    Reply

    Vivek Gite November 9, 2010 at 11:11 am

        Thanks for the heads up!

        Reply

Colin Brace November 9, 2010 at 2:02 pm

    Super useful, Vivek. I’m definitely bookmarking this page.

    FWIW, I find ‘whois IP number’ really useful for determining who owns a given IP number (helpful when tracking abuse). An example:

    $ whois 75.126.153.206
    [Querying whois.arin.net]
    [Redirected to rwhois.softlayer.com:4321]
    [Querying rwhois.softlayer.com]
    [rwhois.softlayer.com]
    %rwhois V-1.5:003fff:00 rwhois.softlayer.com (by Network Solutions, Inc. V-1.5.9.5)
    network:Class-Name:network
    network:ID:NETBLK-SOFTLAYER.75.126.128.0/19
    network:Auth-Area:75.126.128.0/19
    network:Network-Name:SOFTLAYER-75.126.128.0
    network:IP-Network:75.126.153.200/29
    network:IP-Network-Block:75.126.153.200-75.126.153.207
    network:Organization;I:SoftLayer Technologies, Inc.
    network:Street-Address:1950 Stemmons Freeway Suite 2043
    network:City:Dallas
    network:State:TX
    network:Postal-Code:75207
    network:Country-Code:US
    network:Tech-Contact;I:sysadmins@softlayer.com
    network:Abuse-Contact;I:abuse@softlayer.com
    network:Admin-Contact;I:IPADM258-ARIN
    network:Created:20070218
    network:Updated:20091220
    network:Updated-By:ipadmin@softlayer.com

    %referral rwhois://root.rwhois.net:4321/auth-area=.
    %ok

    Reply
Cristian November 14, 2010 at 5:55 pm

    excelent job !!!

    Reply

Leave a Comment

Name *

E-mail *

Website

You can use these HTML tags and attributes for your code and commands: <strong> <em> <ol> <li> <u> <ul> <blockquote> <pre> <a href="" title="">

Notify me of followup comments via e-mail
Security Question:
What is 2 + 7 ?
Solve the simple math so we know that you are a human and not a bot.





Tagged as: alias, descriptive text, dig command, dig command ttl find, dns lookup utility, dns queries, dns servers, domain ip, domain mail, domain name, host command, host command ttl find, host dns lookup, ip address, mail exchanges, mail server, mx, name server, server host, text annotations

Previous post: Linux / UNIX: Deleting Files In Many Subdirectories

Next post: Linux Network IP Accounting
GET FREE TIPS
Make the most of Linux Sysadmin work!
    

    Facebook   |   Twitter   |   Google +

    	
    	
    Related FAQs
        How to test or check reverse DNS
        Reverse nslookup Command
        How to Set Up DNS Lookup in Linux
        Linux / Unix: Look Up IP Addresses
        Linux / UNIX Find Out What Program / Service is Listening on a Specific TCP Port

©2006-2012 nixCraft. All rights reserved. Cannot be reproduced without written permission.
Privacy Policy | Terms of Service | Questions or Comments | Sitemap
```

## 4.3 Active Directory DNS

### 4.3.1 Active Directory SRV Records

> Updated 2026-10 to current practice.[^ms-verify-srv]

The article below is written for Windows 2000/2003, but the SRV-record scheme it describes is still what current Windows Server domain controllers register through the Net Logon service. Corrections for reading it today:

- SRV records are defined by RFC 2782, which obsoletes RFC 2052.[^rfc-2782] RFC 2136 is "Dynamic Updates in the Domain Name System (DNS UPDATE)". The title the article gives for RFC 2136 is wrong.
- The PDC record is `_ldap._tcp.pdc._msdcs.<DNSDomainName>`. The `_ms-dcs` spelling below is a typo. Every DC registers `_ldap._tcp.dc._msdcs.<DNSDomainName>`.
- References to Windows NT 4.0 SP4 and mixed-mode domains are historical.

To verify a DC's records, check the `_msdcs/dc/_tcp` and `_msdcs/dc/_sites/<Site>/_tcp` folders in DNS Manager. If you use non-Microsoft DNS, read `%systemroot%\System32\Config\Netlogon.dns`. Or query from any host:

```sh
dig +short SRV _ldap._tcp.dc._msdcs.example.com
# Windows: nslookup -type=SRV _ldap._tcp.dc._msdcs.example.com
```

Original article:

```text
by Daniel Petri - January 7, 2009
What DNS entries (SRV Records) does Windows 2000/2003 add when you create a domain?


In order for Active Directory to function properly, DNS servers must provide support for Service Location (SRV) resource records described in RFC 2052, A DNS RR for specifying the location of services (DNS SRV). SRV resource records map the name of a service to the name of a server offering that service. Active Directory clients and domain controllers use SRV records to determine the IP addresses of domain controllers. Although not a technical requirement of Active Directory, it is highly recommended that DNS servers provide support for DNS dynamic updates described in RFC 2136, Observations on the use of Components of the Class A Address Space within the Internet.

The Windows 2000 DNS service provides support for both SRV records and dynamic updates. If a non-Windows 2000 DNS server is being used, verify that it at least supports the SRV resource record. If not, it must be upgraded to a version that does support the use of the SRV resource record. For example, Windows NT Server 4.0 DNS servers must be upgraded to Service Pack 4 or later to support SRV resource records. A DNS server that supports SRV records but does not support dynamic update must be updated with the contents of the Netlogon.dns file created by the Active Directory Installation wizard while promoting a Windows 2000 Server to a domain controller. The Netlogon.dns file is described in the following section.

So now you understand that Windows 2000 domains rely heavily on DNS entries. If you enable dynamic update on the relevant DNS zones, W2K creates these entries automatically:

    _ldap._tcp.<DNSDomainName>

Enables a client to locate a W2K domain controller in the domain named by <DNSDomainName>. A client searching for a domain controller in the domain dpetri.net would query the DNS server for _ldap._tcp.dpetri.net.

    _ldap._tcp.<SiteName>._sites.<DNSDomainName>

Enables a client to find a W2K domain controller in the domain and site specified (e.g., _ldap._tcp.lab._sites.dpetri.net for a domain controller in the Lab site of dpetri.net).

    _ldap._tcp.pdc._ms-dcs.<DNSDomainName>

Enables a client to find the PDC flexible single master object (FSMO) role holder of a mixed-mode domain. Only the PDC of the domain registers this record.

    _ldap._tcp.gc._msdcs.<DNSTreeName>

Enables a client to find a Global Catalog (GC) server. Only domain controllers serving as GC servers for the tree will register this name. If a server ceases to be a GC server, the server will deregister the record.

    _ldap._tcp. ._sites.gc._msdcs.<DNSTreeName>

Enables a client to find a GC server in the specified site (e.g., _ldap._tcp.lab._sites.gc._msdcs.dpetri.net).

    _ldap._tcp.<DomainGuid>.domains._msdcs.<DNSTreeName>

Enables a client to find a domain controller in a domain based on the domain controller’s globally unique ID. A GUID is a 128-bit (8 byte) number that generates automatically for referencing Active Directory objects.

    <DNSDomainName>

Enables a client to find a domain controller through a normal Host record.
```

### 4.3.2 Using NSlookup.exe

```text
View products that this article applies to.
	System TipThis article applies to a different version of Windows than the one you are using. Content in this article may not be relevant to you. Visit the Windows 7 Solution Center	
This article was previously published under Q200525
On This Page
Expand all | Collapse all
SUMMARY
Nslookup.exe is a command-line administrative tool for testing and troubleshooting DNS servers. This tool is installed along with the TCP/IP protocol through Control Panel. This article includes several tips for using Nslookup.exe.
Back to the top
MORE INFORMATION
To use Nslookup.exe, please note the following:

    The TCP/IP protocol must be installed on the computer running Nslookup.exe
    At least one DNS server must be specified when you run the IPCONFIG /ALL command from a command prompt.
    Nslookup will always devolve the name from the current context. If you fail to fully qualify a name query (that is, use trailing dot), the query will be appended to the current context. For example, the current DNS settings are att.com and a query is performed on www.microsoft.com; the first query will go out as www.microsoft.com.att.com because of the query being unqualified. This behavior may be inconsistent with other vendor's versions of Nslookup, and this article is presented to clarify the behavior of Microsoft Windows NT Nslookup.exe
    If you have implemented the use of the search list in the Domain Suffix Search Order defined on the DNS tab of the Microsoft TCP/IP Properties page, devolution will not occur. The query will be appended to the domain suffixes specified in the list. To avoid using the search list, always use a Fully Qualified Domain Name (that is, add the trailing dot to the name).


Nslookup.exe can be run in two modes: interactive and noninteractive. Noninteractive mode is useful when only a single piece of data needs to be returned. The syntax for noninteractive mode is:

   nslookup [-option] [hostname] [server]
				


To start Nslookup.exe in interactive mode, simply type "nslookup" at the command prompt:

   C:\> nslookup
   Default Server:  nameserver1.domain.com
   Address:  10.0.0.1
   >
				


Typing "help" or "?" at the command prompt will generate a list of available commands. Anything typed at the command prompt that is not recognized as a valid command is assumed to be a host name and an attempt is made to resolve it using the default server. To interrupt interactive commands, press CTRL+C. To exit interactive mode and return to the command prompt, type exit at the command prompt.

The following is the help output and contains the complete list of options:

Commands:   (identifiers are shown in uppercase, [] means optional)

 NAME            - print info about the host/domain NAME using default 
                   server
 NAME1 NAME2     - as above, but use NAME2 as server
 help or ?       - print info on common commands
 set OPTION      - set an option

    all                 - print options, current server and host
    [no]debug           - print debugging information
    [no]d2              - print exhaustive debugging information
    [no]defname         - append domain name to each query
    [no]recurse         - ask for recursive answer to query
    [no]search          - use domain search list
    [no]vc              - always use a virtual circuit
    domain=NAME         - set default domain name to NAME
    srchlist=N1[/N2/.../N6] - set domain to N1 and search list to N1, N2, 
                          and so on
    root=NAME           - set root server to NAME
    retry=X             - set number of retries to X
    timeout=X           - set initial time-out interval to X seconds
    type=X              - set query type (for example, A, ANY, CNAME, MX, 
                          NS, PTR, SOA, SRV)
    querytype=X         - same as type
    class=X             - set query class (for example, IN (Internet), ANY)
    [no]msxfr           - use MS fast zone transfer
    ixfrver=X           - current version to use in IXFR transfer request

 server NAME     - set default server to NAME, using current default server
 lserver NAME    - set default server to NAME, using initial server
 finger [USER]   - finger the optional NAME at the current default host
 root            - set current default server to the root
 ls [opt] DOMAIN [> FILE] - list addresses in DOMAIN (optional: output to 
                  FILE)

    -a          -  list canonical names and aliases
    -d          -  list all records
    -t TYPE     -  list records of the given type (for example, A, CNAME, 
                   MX, NS, PTR, and so on)

 view FILE       - sort an 'ls' output file and view it with pg
 exit            - exit the program
				


A number of different options can be set in Nslookup.exe by running the set command at the command prompt. A complete listing of these options is obtained by typing set all. See above, under the set command for a printout of the available options.


Back to the top
Looking up Different Data Types
To look up different data types within the domain name space, use the set type or set q[uerytype] command at the command prompt. For example, to query for the mail exchanger data, type the following:

   C:\> nslookup
   Default Server:  ns1.domain.com
   Address:  10.0.0.1

   > set q=mx
   > mailhost
   Server:  ns1.domain.com
   Address:  10.0.0.1

   mailhost.domain.com     MX preference = 0, mail exchanger =
                           mailhost.domain.com
   mailhost.domain.com     internet address = 10.0.0.5
   >
				


The first time a query is made for a remote name, the answer is authoritative, but subsequent queries are nonauthoritative. The first time a remote host is queried, the local DNS server contacts the DNS server that is authoritative for that domain. The local DNS server will then cache that information, so that subsequent queries are answered nonauthoritatively out of the local server's cache.


Back to the top
Querying Directly from Another Name Server
To query another name server directly, use the server or lserver commands to switch to that name server. The lserver command uses the local server to get the address of the server to switch to, while the server command uses the current default server to get the address.

Example:

   C:\> nslookup

   Default Server:  nameserver1.domain.com
   Address:  10.0.0.1

   > server 10.0.0.2

   Default Server:  nameserver2.domain.com
   Address:  10.0.0.2
   >
				

Back to the top
Using Nslookup.exe to Transfer Entire Zone
Nslookup can be used to transfer an entire zone by using the ls command. This is useful to see all the hosts within a remote domain. The syntax for the ls command is:

   ls [- a | d | t type] domain [> filename]
				


Using ls with no arguments will return a list of all address and name server data. The -a switch will return alias and canonical names, -d will return all data, and -t will filter by type.

Example:

   >ls domain.com
   [nameserver1.domain.com]
    nameserver1.domain.com.    NS     server = ns1.domain.com
    nameserver2.domain.com                 NS     server = ns2.domain.com
    nameserver1                            A      10.0.0.1
    nameserver2                            A      10.0.0.2

   >
				


Zone transfers can be blocked at the DNS server so that only authorized addresses or networks can perform this function. The following error will be returned if zone security has been set:
*** Can't list domain example.com.: Query refused

For additional information, see the following article or articles in the Microsoft Knowledge Base:
193837  Windows NT 4.0 DNS Server Default Zone Security Settings
Back to the top
Troubleshooting Nslookup.exe
Default Server Timed Out
When starting the Nslookup.exe utility, the following errors may occur:
*** Can't find server name for address w.x.y.z: Timed out

NOTE: w.x.y.z is the first DNS server listed in the DNS Service Search Order list.

*** Can't find server name for address 127.0.0.1: Timed out

The first error indicates that the DNS server cannot be reached or the service is not running on that computer. To correct this problem, either start the DNS service on that server or check for possible connectivity problems.

The second error indicates that no servers have been defined in the DNS Service Search Order list. To correct this problem, add the IP address of a valid DNS server to this list.

For additional information, see the following article or articles in the Microsoft Knowledge Base:
172060  NSLOOKUP: Can't Find Server Name for Address 127.0.0.1
Can't Find Server Name when Starting Nslookup.exe
When starting the Nslookup.exe utility, the following error may occur:

*** Can't find server name for address w.x.y.z: Non-existent domain


This error occurs when there is no PTR record for the name server's IP address. When Nslookup.exe starts, it does a reverse lookup to get the name of the default server. If no PTR data exists, this error message is returned. To correct make sure that a reverse lookup zone exists and contains PTR records for the name servers.

For additional information, see the following article or articles in the Microsoft Knowledge Base:
172953  How to Install and Configure Microsoft DNS Server
Nslookup on Child Domain Fails
When querying or doing a zone transfer on a child domain, Nslookup may return the following errors:

*** ns.domain.com can't find child.domain.com.: Non-existent domain
*** Can't list domain child.domain.com.: Non-existent domain


In DNS Manager, a new domain can be added under the primary zone, thus creating a child domain. Creating a child domain this way does not create a separate db file for the domain, thus querying that domain or running a zone transfer on it will produce the above errors. Running a zone transfer on the parent domain will list data for both the parent and child domains. To work around this problem, create a new primary zone on the DNS server for the child domain. 
```

### 4.3.3 Verifying Your Basic DNS Configuration

```text
5 out of 9 rated this helpful - Rate this topic

If you use a third-party DNS server to support Active Directory, you must perform configuration tasks manually, and doing so, you might cause common configuration errors that prevent DNS and Active Directory from working properly. The following sections describe tests that you can perform to verify that your DNS server is working properly, that the forward and reverse lookup zones are properly configured, and that DNS can support Active Directory.

If you use either the Configure DNS Server wizard or the Active Directory Installation wizard to install your Windows 2000 DNS server, most configuration tasks are performed automatically and you can avoid many common configuration errors, but you might still want to perform the tests in this section.

Before checking anything else, check the event log for errors. For more information about Event Viewer, see "Troubleshooting Tools" earlier in this chapter.
Verifying That Your DNS Server Can Answer Queries

Use the following process to verify that your DNS server is started and can answer queries.

    Make sure that your server has basic network connectivity. For more information about verifying basic network connectivity, see "Checking the DNS Server for Problems" later in this chapter.

    Make sure that the server can answer both simple and recursive queries from the Monitoring tab in the DNS console. For more information about the Monitoring tab, see "Troubleshooting Tools" earlier in this chapter.

    From a client, use Nslookup to look up a domain name and the name of a host in the domain. For more information about using Nslookup, see "Troubleshooting Tools" earlier in this chapter.

    On the server, run netdiag to make sure the server is working properly and that the resource records Netlogon needs are registered on a DNS server. For more information about Netdiag, see "Troubleshooting Tools" earlier in this chapter.

    Make sure that the server can reach a root server by typing the following:
    nslookup
    server < IP address of server >
    set querytype=NS
    .

    Make sure that there is an A and PTR resource record configured for the server. For information about PTR resource records, see "Testing for Reverse Lookup Zones and PTR Records" later in this chapter.

Top Of Page
Verifying That the Forward Lookup Zone Is Properly Configured

After you create a forward lookup zone, you can use Nslookup to make sure it is properly configured and to test its integrity to host Active Directory. To start Nslookup, type the following

Nslookup server < IP address of server on which you created zone > set querytype=any

Nslookup starts. If the resolver cannot locate a PTR resource record for the server, you see an error message, but you are still able to perform the tests in this section.

To verify the zone is responding correctly, simulate a zone transfer by typing the following:

ls -d < domain name >

If the server is configured to restrict zone transfers, you might see an error message in Event Viewer. (For more information about Event Viewer, see "Troubleshooting Tools" earlier in this chapter.) Otherwise, you see a list of all the records in the domain.

Next, query for the SOA record by typing the following and pressing ENTER:

< domain name >

If your server is configured correctly, you see an SOA record. The SOA record includes a "primary name server" field. To verify that the primary name server has registered an NS record, type the following:

set type=ns < domain name >

If your server is configured correctly, you see an NS record for the name server.

Make sure that the authoritative name server listed in the NS record can be contacted to request queries by typing the following:

server <server name or IP address>

Next, query the server for any name for which it is authoritative.

If these tests are successful, the NS record points to the correct hostname, and the hostname has the correct IP address associated with it.
Top Of Page
Testing for Reverse Lookup Zones and PTR Resource Records

You do not need reverse lookup zones and PTR resource records for Active Directory to function. However, you need them if you want clients to be able to resolve FQDNs from IP addresses. Also, PTR resource records are commonly used by some applications for security purposes, to verify the identity of the client.

You do not need to have the reverse lookup zones and PTR resource records on your own servers; instead, another DNS server can contain these zones.

After you have configured your reverse lookup zones and PTR resource records, manually examine them in the DNS console. A reverse lookup zone must exist for each subnet, and the parent reverse lookup zone must have a delegation to your reverse lookup zone. For example, if you have a private root and the subnets 172.32.16.x and 172.32.17.x, the private root can host all reverse lookup zones, or it can contain the reverse lookup zone 172.32.x and delegate the reverse lookup zones 172.32.16.x and 172.32.17.x to other servers. Also, PTR resource records must exist for all the computers in your network. For more information about adding a reverse lookup zone, see "Adding a Reverse Lookup Zone" earlier in this chapter.

You can also use Nslookup to verify that the reverse lookup zones and PTR resource records are configured correctly.

To make sure your reverse lookup zones and PTR resource records are configured correctly

    Start Nslookup by typing Nslookup at the command prompt and then pressing ENTER.

    Switch to the server you want to query by typing the following:
    server < Server IP Address >

    Enter the IP address of the computer whose PTR resource record you want to verify, and then press ENTER.
    If the reverse lookup zone and PTR resource record are configured correctly, Nslookup returns the name of the computer.

    To quit Nslookup, type exit and then press ENTER.

Top Of Page
Verifying Your DNS Configuration After Installing Active Directory

When you use third-party DNS servers to support Active Directory, you can verify the registration of domain controller locator resource records. If the server does not support dynamic update, you need to add these records manually.

The Netlogon service creates a log file that contains all the locator resource records and places the log file in the following location:

% SystemRoot %\System32\Config\Netlogon.dns

You can check this file to find out which locator resource records are created for the domain controller.

The locator resource records are stored in a text file, compliant with RFC specifications. If your server is configured correctly, you see the LDAP SRV record for the domain controller:

_ldap._tcp. <Active Directory domain name> IN SRV < priority > < weight > 389 < domain controller name >

For example:

_ldap._tcp.reskit.com. IN SRV 0 0 389 dc1.reskit.com

Next, use the Nslookup command-line tool to verify that the domain controller registered the SRV resource records that were listed in Netlogon.dns.

note-icon Note

During the following test, if you have not configured a reverse lookup zone and PTR resource record for the DNS server you are querying, you might see several time-outs. This is not a problem.

To verify that SRV resource records are registered for the domain controller

    At the command prompt, type nslookup and then press ENTER.

    To set the DNS query type to filter for SRV records only, type set type=SRV and then press ENTER.

    To send a query for the registered SRV record for a domain controller in your Active Directory domain, type _ ldap._tcp. < Active Directory domain name > and then press ENTER.

    You should see the SRV records listed in Netlogon.dns. If you do not, SRV resource records might not be registered for the domain controller.

The following example shows a full Nslookup session, used to verify SRV resource records that are registered for locating two domain controllers on a network. In this example, the two domain controllers (DC1 and DC2) are registered for the domain noam.reskit.com.

C:\>nslookup

Default Server: dc1.noam.reskit.com

Address: 10.0.0.14

> set type=SRV

> _ldap._tcp.noam.reskit.com

Server: dc1.noam.reskit.com

Address: 10.0.0.14

_ldap._tcp.noam.reskit.com SRV service location:

priority = 0

weight = 0

port = 389

svr hostname = dc1.noam.reskit.com

_ldap._tcp.noam.reskit.com SRV service location:

priority = 0

weight = 0

port = 389

svr hostname = dc2.noam.reskit.com

dc1.noam.reskit.com internet address = 10.0.0.14

dc2.noam.reskit.com internet address = 10.0.0.15 

		4.3.4 How to verify that SRV DNS records have been created for a domain controller
View products that this article applies to.
	System TipThis article applies to a different version of Windows than the one you are using. Content in this article may not be relevant to you. Visit the Windows 7 Solution Center	
For a Microsoft Windows 2000 version of this article, see 241515  .
Expand all | Collapse all
SUMMARY
This article describes how to verify Service Location (SRV) locator resource records for a domain controller after you install the Active Directory directory service.
Back to the top
MORE INFORMATION
The SRV record is a Domain Name System (DNS) resource record that is used to identify computers that host specific services. SRV resource records are used to locate domain controllers for Active Directory. To verify SRV locator resource records for a domain controller, use one of the following methods.
DNS Manager
After you install Active Directory on a server running the Microsoft DNS service, you can use the DNS Management Console to verify that the appropriate zones and resource records are created for each DNS zone.

Active Directory creates its SRV records in the following folders, where Domain_Name is the name of your domain:
Forward Lookup Zones/Domain_Name/_msdcs/dc/_sites/Default-First-Site-Name/_tcp Forward Lookup Zones/Domain_Name/_msdcs/dc/_tcp

In these locations, an SRV record should appear for the following services:
_kerberos
_ldap
Netlogon.dns
If you are using non-Microsoft DNS servers to support Active Directory, you can verify SRV locator resource records by viewing Netlogon.dns. Netlogon.dns is located in the %systemroot%\System32\Config folder. You can use a text editor, such as Microsoft Notepad, to view this file.

The first record in the file is the domain controller's Lightweight Directory Access Protocol (LDAP) SRV record. This record should appear similar to the following:
_ldap._tcp.Domain_Name
Nslookup
Nslookup is a command-line tool that displays information you can use to diagnose Domain Name System (DNS) infrastructure.
To use Nslookup to verify the SRV records, follow these steps:

    On your DNS, click Start, and then click Run.
    In the Open box, type cmd.
    Type nslookup, and then press ENTER.
    Type set type=all, and then press ENTER.
    Type _ldap._tcp.dc._msdcs.Domain_Name, where Domain_Name is the name of your domain, and then press ENTER.

Nslookup returns one or more SRV service location records that appear in the following format, where Server_Name is the host name of a domain controller, and where Domain_Name is the domain the domain controller belongs to, and Server_IP_Address is the domain controller's Internet Protocol (IP) address:

Server: localhost
Address:  127.0.0.1
_ldap._tcp.dc._msdcs.Domain_Name
SRV service location:
	priority	= 0
	weight		= 100
	port		= 389
	srv hostname	= Server_Name.Domain_NameServer_Name.Domain_Name		internet address = Server_IP_Address

Back to the top
REFERENCES
For more information about the SRV records that are registered by Netlogon, please see the "SRV Records Registered by NetLogon" section in the TechNet document How DNS Support for Active Directory Works. To view this document, visit the following Microsoft web site:
http://technet2.microsoft.com/windowsserver/en/library/9D62E91D-75C3-4A77-AE93-A8804E9FF2A11033.mspx 

		4.3.5
	4.4
```

[^systemctl-1]: systemctl(1) - Linux manual page
[^rhel9-bind]: RHEL 9: Setting up and configuring a BIND DNS server
[^ubuntu-dns]: Ubuntu Server docs: Domain Name Service (DNS)
[^isc-bind9-rename]: bind-users: Debian/Ubuntu: Why was the service renamed from bind9 to named?
[^ms-verify-srv]: Microsoft Learn: Verify that SRV DNS records have been created
[^rfc-2782]: RFC 2782: A DNS RR for specifying the location of services (DNS SRV)
