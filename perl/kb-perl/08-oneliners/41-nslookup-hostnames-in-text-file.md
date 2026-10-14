---
type: cheatsheet
title: nslookup hostnames in text file
description: Subsection 8.20 of Oneliners.
tags: [kb-perl]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "perl/KB_perl#8.20"
---

# 8.20 nslookup hostnames in text file

[↑ Oneliners](/perl/kb-perl/08-oneliners/README.md)

```text
$ cat stam
<user>-ise1 - <internal-ip> 
<user>-ise2 - <internal-ip> 
<user>-ise3 - <internal-ip> 
<user>-ise4 - <internal-ip> 
<user>-ise5 - <internal-ip> 
<user>-ise6 - <internal-ip>

$ perl -ne 'system ("nslookup $1") if /(\w+-\w+)/ ;' stam 
Server:		144.254.71.184
Address:	144.254.71.184#53

Name:	<internal-host>
Address: <internal-ip>

Server:		144.254.71.184
Address:	144.254.71.184#53

Name:	<internal-host>
Address: <internal-ip>

Server:		144.254.71.184
Address:	144.254.71.184#53

Name:	<internal-host>
Address: <internal-ip>

Server:		144.254.71.184
Address:	144.254.71.184#53

Name:	<internal-host>
Address: <internal-ip>

Server:		144.254.71.184
Address:	144.254.71.184#53

Name:	<internal-host>
Address: <internal-ip>

Server:		144.254.71.184
Address:	144.254.71.184#53

Name:	<internal-host>
Address: <internal-ip>

		8.21 sort lines According to given pattern
$ cat !$
cat stam
a=123
a=2345
a=i54

$ perl -ne ' if (/a=(.*)$/)  { push @b,"$1\n" ;} END {print sort(@b) ; } ' stam
123
2345
i54

for non greedy use *? (say if lines look like: a=123,b=546,c= , use /a=(.*?),/ )

		8.22 Count lines that contain pattern and sort according to pattern 
$ cat stam
a=123
a=123
a=123
a=2345
a=i54
$ perl -ne ' if (/a=(.*)$/)  { $b{$1}++ } END { foreach $l (sort keys %b ) {print " $l $b{$l} times \n" } print "\n"} ' stam 
 123 3 times 
 2345 1 times 
 i54 1 times 


		8.23
```
