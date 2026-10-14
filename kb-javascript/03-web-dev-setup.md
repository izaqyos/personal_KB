---
type: reference
title: Web Dev Setup
description: Section 3 of the legacy javascript-kb notes.
tags: [kb-javascript]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "javascript-kb#3"
---

# Web Dev Setup

[↑ javascript-kb](/kb-javascript/README.md)

## 3.1 Web Dev Setup for MAC

```text
https://mallinson.ca/osx-web-development/https://mallinson.ca/osx-web-development/
```

### 3.1.1 Xcode

```text
First, you need to have Xcode (Apple’s development bundle) installed for a few of these tools to work. You can get by without it if you try really hard, but if you’re a developer, you’re probably going to need to have it at some point. It’s massive, so start downloading it now. Grab it from the App Store, and then grab a coffee or play with your kid or dog.

For OS X 10.9 (Mavericks) and up, the developer command line tools can be installed by running the following command within terminal.

xcode-select --install
This will trigger a software update dialog box. Click install and wait for it to complete. If this does not work, download the installation package from Apple. You will need an Apple developer account to do this.

Once Xcode is installed, start it up. The tools we need will not work unless the app has run once, and you’ve accepted the licence agreement. You don’t need to do anything with the app. Just start it up (It can take a while to run the first time, even on a fast machine) click agree, and shut it down.
```

### 3.1.2 Homebrew

```text
Homebrew is a popular and amazing package manager for OS X. Package managers keep all the big and small tools that we need to install on our machines tidy and up-to-date. It could not be easier to install. Switch over to your terminal, and type in this one command:

ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
It can take a while for the install, but that one command is all you need for Homebrew. Really.
```

### 3.1.3 MySQL

```text
This is optional. You may prefer another kind of database, or no database at all. Feel free to skip this if you don’t need it, but really, you probably do. MySQL no longer comes pre-installed as of Mountain Lion (10.8) as it did with previous versions or OS X. Download it here. You can try the latest version of MySQL for the latest version of OS X. The latest version is currently for 10.11. Choose the 64bit “DMG Archive” one.
```

### 3.1.4 dnsmasq

```text
This is a great little tool to that allows us to use wildcard subdomain names.

With the default apache settings, you can add as many sites as you like in subfolders of the web root. You can have sites like this:

http://home.test/client1
http://home.test/client2
http://home.test/client3
However, that creates a problem. When you have each site in a folder, it’s more difficult to manage the settings for each site. Each one must then have a different absolute root. The solution is to create a subdomain for each site, and use URLs like these:

http://client1.test
http://client2.test
http://client3.test

We can accomplish this by placing all three sites in our /private/etc/hosts file, but then we need to keep adding entries every time we add a new site. dnsmasq allows us to do this by interrupting each request that ends with .test and forwarding it to a designated IP address (127.0.0.1 in our case). Previous versions of this tutorial used .dev as a local TLD but .dev has been registered for use by Google and forced by Chrome to use SSL, so it is no longer an option for local development. The .test TLD is now reserved for development use. You can also use .localhost or .example. You can even make up your own as long as it’s not a real TLD in use.

To install dnsmasq, we use the previously installed Homebrew. The following commands will install dnsmasq, configure it to point all requests to the .test top-level domain to our local machine, and make sure it starts up and runs all of the time.

brew install dnsmasq
cd $(brew --prefix); mkdir etc; echo 'address=/.test/127.0.0.1' > etc/dnsmasq.conf
sudo cp -v $(brew --prefix dnsmasq)/homebrew.mxcl.dnsmasq.plist /Library/LaunchDaemons
sudo launchctl load -w /Library/LaunchDaemons/homebrew.mxcl.dnsmasq.plist
sudo mkdir /etc/resolver
sudo bash -c 'echo "nameserver 127.0.0.1" > /etc/resolver/test'


|   $ sudo vi /private/etc/hosts
|   $ cat !$
|   cat /private/etc/hosts
|   ##
|   # Host Database
|   #
|   # localhost is used to configure the loopback interface
|   # when the system is booting.  Do not change this entry.
|   ##
|   127.0.0.1	localhost
|   127.0.0.1	client1.test
|   127.0.0.1	client2.test
|   127.0.0.1	client3.test
|   255.255.255.255	broadcasthost
|   ::1             localhost

We’re now done with dnsmasq, and if all goes well, you’ll never need to think about it again. Now, to get Apache going.
```

### 3.1.5 Apache

```text
Step one is easy. It’s actually almost done. Mountain Lion (10.8) was the first version of OS X without Apache in the “sharing” section of the preferences pane. No big deal though, since you just need to start it up once using the terminal. Open up the Terminal app, and enter the following command. You’ll be asked for your administrator password.

sudo apachectl start
That’s it. Test it out by visiting http://localhost in your browser. You should see a simple page that says “It Works”. Apache is up and running, and is ready to serve your sites. It will stay on until you turn it off (I never turn it off), and will start up automatically each time you start your computer. Don’t worry about taxing your computer’s resources by running Apache. It won’t be a problem.

You should also try http://home.test, which should work since dnsmasq is pointing all *.test domains to the local IP. You can try http://ANYTHING.test as well.

Apache will serve up sites as is, but there are a few quick changes we need to make to the configuration files before we are ready to go. Using your favorite text editor, open up /private/etc/apache2/httpd.conf

If you’re going to be using PHP, you need to tell Apache to use the PHP module to handle .php files. On line 169 (line 117 before 10.10 (Yosemite) but could be different on your system), you need to uncomment this line (remove the “#”)

168  #LoadModule perl_module libexec/apache2/mod_perl.so
169  #LoadModule php5_module libexec/apache2/libphp5.so
170  LoadModule hfs_apple_module libexec/apache2/mod_hfs_apple.so
becomes

168  #LoadModule perl_module libexec/apache2/mod_perl.so
169  LoadModule php5_module libexec/apache2/libphp5.so
170  LoadModule hfs_apple_module libexec/apache2/mod_hfs_apple.so
Yosemite, El Capitan, & Sierra Only
Starting with OS X 10.10 (Yosemite), Apple moved from Apache 2.2 to Apache 2.4, and that means there are a few additional changes we need to make. First, there is a directive that helps secure your machine by denying access to the entire file system by default. I’ll show you how to remove this directive, since I find that easier on a machine meant for development. The section of code runs from line 220 through 223. You can comment out (place ‘#’ in front of each line) or just remove this section.

220 <Directory />
221     AllowOverride none
222     Require all denied
223 </Directory>
Then, the mod_vhost_alias module needs to be activated. We must uncomment line 160, so:

159  #LoadModule dav_lock_module libexec/apache2/mod_dav_lock.so
160  #LoadModule vhost_alias_module libexec/apache2/mod_vhost_alias.so
161  LoadModule negotiation_module libexec/apache2/mod_negotiation.so
becomes

159  #LoadModule dav_lock_module libexec/apache2/mod_dav_lock.so
160  LoadModule vhost_alias_module libexec/apache2/mod_vhost_alias.so
161  LoadModule negotiation_module libexec/apache2/mod_negotiation.so
and on line 509 (line 500 in Yosemite and El Capitan, and line 477 before Yosemite), in order to allow us to add multiple websites to Apache:

508  # Virtual hosts
509  #Include /private/etc/apache2/extra/httpd-vhosts.conf
510
becomes

508  # Virtual hosts
509  Include /private/etc/apache2/extra/httpd-vhosts.conf
510
This tells apache to load the information in the httpd-vhosts.conf file in the /private/etc/apache2/extra/ directory. We need to edit that file. You can delete or comment out everything in that file, and replace it with the following:

<Directory "/www">
  Options Indexes MultiViews FollowSymLinks
  AllowOverride All
  Require all granted
</Directory>

<Virtualhost *:80>
  VirtualDocumentRoot "/www/sites/%1/wwwroot"
  ServerName sites.test
  ServerAlias *.test
  UseCanonicalName Off
</Virtualhost>

<Virtualhost *:80>
  VirtualDocumentRoot "/www/sites/%-7+/wwwroot"
  ServerName xip
  ServerAlias *.xip.io
  UseCanonicalName Off
</Virtualhost>
Then run the following to force Apache to load your new config files:

sudo apachectl restart
This configuration allows you to use the URL http://client1.test on your local machine with your site files stored in /www/sites/client1/wwwroot. It also allows you to use the service xip.io to use the URL http://client1.[LOCAL IP].xip.io to access your sites from another machine (or device) on your local network. So, if your machine’s local IP address (not your public IP address), is 192.168.1.10, the URL for a site might be http://client1.192.168.1.10.xip.io. You can find your local IP address in your network preferences.

Xip.io is offered for free by Basecamp and provides one of the simplest services on the internet. They run a simple DNS server that redirects all traffic to *.xip.io back to the IP address indicated by the subdomain.

Now you don’t need to update config files every time you add a new site. Simply add the necessary folders to your “sites” directory, and the site will work locally with its own subdomain.
```

## 3.2 MAMP

```text
A professional tool for web development
```

### 3.2.1 Basics

```text
root:
$ pwd
/Applications/MAMP/htdocs
$ ls
index.$ pwd
/Applications/MAMP/htdocs
$ ls
index.html

default URL: http://localhost:8888/index.html
```

### 3.2.2 virtual hosts (for different web projects)

```text
$ ls
extra/		httpd.conf	magic		mime.types	original/
$ ls extra/
httpd-autoindex.conf		httpd-info.conf			httpd-mpm.conf			httpd-userdir.conf
httpd-dav.conf			httpd-languages.conf		httpd-multilang-errordoc.conf	httpd-vhosts.conf
httpd-default.conf		httpd-manual.conf		httpd-ssl.conf

httpd.conf	
httpd-vhosts.conf

$ cp httpd.conf httpd.conf.orig
$ cp extra/httpd-vhosts.conf extra/httpd-vhosts.conf.orig
        3.2.3
```

## 3.3 My setup steps

### 3.3.1 Configure apache

```text
a. create a site

mkdir /Users/<user>/Sites/mynewsite
$ cat index.html 
<!doctype html>
<html>
  <head>
    <title>This is the title of the webpage!</title>
  </head>
  <body>
    <p>This is an example paragraph. Anything in the <strong>body</strong> tag will appear on the page, just like this <strong>p</strong> tag and its contents.</p>
  </body>
</html>
$ sudo apachectl configtest

b.  configure httpd.conf 
$ diff httpd.conf httpd.conf.pre-update 
168c168
< LoadModule vhost_alias_module libexec/apache2/mod_vhost_alias.so
---
> #LoadModule vhost_alias_module libexec/apache2/mod_vhost_alias.so
228,231c228,231
< #<Directory />
< #    AllowOverride none
< #    Require all denied
< #</Directory>
---
> <Directory />
>     AllowOverride none
>     Require all denied
> </Directory>
517c517
< Include /private/etc/apache2/extra/httpd-vhosts.conf
---
> #Include /private/etc/apache2/extra/httpd-vhosts.conf

c. configure httpd-vhosts.conf 
$ cat !!:1
cat httpd-vhosts.conf
# Virtual Hosts
#
# Required modules: mod_log_config

# If you want to maintain multiple domains/hostnames on your
# machine you can setup VirtualHost containers for them. Most configurations
# use only name-based virtual hosts so the server doesn't need to worry about
# IP addresses. This is indicated by the asterisks in the directives below.
#
# Please see the documentation at 
# <URL:http://httpd.apache.org/docs/2.4/vhosts/>
# for further details before you try to setup virtual hosts.
#
# You may use the command line option '-S' to verify your virtual host
# configuration.

#
# VirtualHost example:
# Almost any Apache directive may go into a VirtualHost container.
# The first VirtualHost section is used for all requests that do not
# match a ServerName or ServerAlias in any <VirtualHost> block.
#

#orig
#<VirtualHost *:80>
#    ServerAdmin webmaster@dummy-host.example.com
#    DocumentRoot "/usr/docs/dummy-host.example.com"
#    ServerName dummy-host.example.com
#    ServerAlias www.dummy-host.example.com
#    ErrorLog "/private/var/log/apache2/dummy-host.example.com-error_log"
#    CustomLog "/private/var/log/apache2/dummy-host.example.com-access_log" common
#</VirtualHost>
#
#<VirtualHost *:80>
#    ServerAdmin webmaster@dummy-host2.example.com
#    DocumentRoot "/usr/docs/dummy-host2.example.com"
#    ServerName dummy-host2.example.com
#    ErrorLog "/private/var/log/apache2/dummy-host2.example.com-error_log"
#    CustomLog "/private/var/log/apache2/dummy-host2.example.com-access_log" common
#</VirtualHost>

#/www multi site root dir
<Directory "/www">
  Options Indexes MultiViews FollowSymLinks
  AllowOverride All
  Require all granted
</Directory>

<VirtualHost *:80>
    DocumentRoot "/Users/<user>/Sites/mynewsite"
    ServerName mynewsite.local
</VirtualHost>

<Virtualhost *:80>
  VirtualDocumentRoot "/www/sites/%1/wwwroot"
  ServerName sites.test
  ServerAlias *.test
  UseCanonicalName Off
</Virtualhost>

<VirtualHost *:80>
ServerName localhost
DocumentRoot /Library/WebServer/Documents/
</VirtualHost>

<Virtualhost *:80>
  VirtualDocumentRoot "/www/sites/%-7+/wwwroot"
  ServerName xip
  ServerAlias *.xip.io
  UseCanonicalName Off
</Virtualhost>

d. access site 
http://mynewsite.local/

        3.3.2



$ sudo apachectl configtest
```

## 3.4 placeholder

## 3.5 placeholder

## 3.6 placeholder

## 3.7 placeholder

## 3.8 Old, Cisco time, example

```text
[employer-specific content moved to private KB, 2026-10]
```
