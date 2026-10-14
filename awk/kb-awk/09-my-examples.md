---
type: reference
title: My examples
description: "Personal awk and sed examples: counters and summing columns in text output."
tags: [awk, sed, examples, legacy, unix]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "awk/kb_awk#8"
---

# My examples

[↑ kb_awk](/awk/kb-awk/README.md)

## 8.1 Counters

### 8.1.1 sed and awk to count many things

```text
$ cat stam | sed -e 's_(__' -e 's_)__' -e 's_:_ _g'| awk '{ t+=$4; s1+=$7; s2+=$9; s3+=$11; s4+=$13 } END {print "Total ", t, "S1 ", s1, "S2 ",s2, "S3 ", s3, "S4 ", s4 } '
Total  1368 S1  0 S2  28 S3  766 S4  574
$ cat stam 
project bl-framework: total (278) sev 1:0 sev2:10 sev3:137 sev4:131
project bl-sec: total (18) sev 1:0 sev2:0 sev3:14 sev4:4
project bl-api: total (7) sev 1:0 sev2:0 sev3:5 sev4:2
project gui-framework: total (94) sev 1:0 sev2:0 sev3:62 sev4:32
project gui-app: total (507) sev 1:0 sev2:4 sev3:269 sev4:234
project pi-framework: total (8) sev 1:0 sev2:1 sev3:3 sev4:4
project pi-app: total (35) sev 1:0 sev2:0 sev3:14 sev4:21
project pi-axis: total (4) sev 1:0 sev2:0 sev3:2 sev4:2
project aac: total (25) sev 1:0 sev2:0 sev3:6 sev4:19
project cli-app: total (17) sev 1:0 sev2:0 sev3:6 sev4:11
project im: total (4) sev 1:0 sev2:0 sev3:3 sev4:1
project common: total (16) sev 1:0 sev2:5 sev3:10 sev4:1
project db: total (52) sev 1:0 sev2:6 sev3:40 sev4:6
project audit: total (23) sev 1:0 sev2:0 sev3:12 sev4:11
project logging-logging: total (2) sev 1:0 sev2:0 sev3:2 sev4:0
project messagebus: total (7) sev 1:0 sev2:0 sev3:6 sev4:1
project replication: total (57) sev 1:0 sev2:0 sev3:46 sev4:11
project configloader: total (2) sev 1:0 sev2:0 sev3:1 sev4:1
project dbpassword: total (1) sev 1:0 sev2:0 sev3:1 sev4:0
project distributedmanagement: total (24) sev 1:0 sev2:0 sev3:20 sev4:4
project dbtools: total (1) sev 1:0 sev2:0 sev3:1 sev4:0
project migration: total (93) sev 1:0 sev2:1 sev3:55 sev4:37
project clients-spml: total (10) sev 1:0 sev2:0 sev3:10 sev4:0
project changepassword: total (5) sev 1:0 sev2:1 sev3:4 sev4:0
project internalcli: total (2) sev 1:0 sev2:0 sev3:2 sev4:0
project licensing: total (7) sev 1:0 sev2:0 sev3:4 sev4:3
project transferutils: total (60) sev 1:0 sev2:0 sev3:24 sev4:36
project configrecovery: total (1) sev 1:0 sev2:0 sev3:1 sev4:0
project dbsupport: total (1) sev 1:0 sev2:0 sev3:1 sev4:0
project dynamic-azn: total (2) sev 1:0 sev2:0 sev3:0 sev4:2
project performancemonitoring: total (5) sev 1:0 sev2:0 sev3:5 sev4:0
$ cat stam | sed -e 's_(__' -e 's_)__' -e 's_:_ _g'| awk '{ t+=$4; s1+=$7; s2+=$9; s3+=$11; s4+=$13 } END {print "Total ", t, "S1 ", s1, "S2 ",s2, "S3 ", s3, "S4 ", s4 } '
Total  1368 S1  0 S2  28 S3  766 S4  574
```

### 8.1.2 count a number in lines matching patter, ex: how many tests failed.

```text
$ cat  ~/run_rep | awk ' /[0-9]+ failing/ {f+=$1;t+=202; print $0} END {print "total tests faild=",f," of total=",t} '
...
  1 failing
  1 failing
  1 failing
  1 failing
  1 failing
  4 failing
  1 failing
total tests faild= 120  of total= 10908

	    8.1.3
```

## 8.2 Calculate linux total disk size

```text
# fdisk -l | awk 'BEGIN {s=0} /^Disk \/dev.* GB/ {size+=$3} END {print "Total disk size is " size "GB"} ' ; fdisk -l | awk 'BEGIN {s=0} /^Disk \/dev.* MB/ {size+=$3} END {print "Total disk size is " size "MB"} '
Disk /dev/dm-0 doesn't contain a valid partition table
Disk /dev/dm-1 doesn't contain a valid partition table
Disk /dev/dm-2 doesn't contain a valid partition table
Disk /dev/dm-3 doesn't contain a valid partition table
Disk /dev/dm-4 doesn't contain a valid partition table
Disk /dev/dm-5 doesn't contain a valid partition table
Disk /dev/dm-6 doesn't contain a valid partition table
Disk /dev/dm-7 doesn't contain a valid partition table
Disk /dev/dm-8 doesn't contain a valid partition table
Disk /dev/dm-9 doesn't contain a valid partition table
Disk /dev/dm-10 doesn't contain a valid partition table
Total disk size is 493.9GB
Disk /dev/dm-0 doesn't contain a valid partition table
Disk /dev/dm-1 doesn't contain a valid partition table
Disk /dev/dm-2 doesn't contain a valid partition table
Disk /dev/dm-3 doesn't contain a valid partition table
Disk /dev/dm-4 doesn't contain a valid partition table
Disk /dev/dm-5 doesn't contain a valid partition table
Disk /dev/dm-6 doesn't contain a valid partition table
Disk /dev/dm-7 doesn't contain a valid partition table
Disk /dev/dm-8 doesn't contain a valid partition table
Disk /dev/dm-9 doesn't contain a valid partition table
Disk /dev/dm-10 doesn't contain a valid partition table
Total disk size is 39388MB
```

## 8.3 average csv file column

### 8.3.1 on say 4th column

```text
<user>@<user>-WS:Wed Sep 12:/cygdrive/c/Documents and Settings/<user>/Desktop:]$ echo 1,2,3,4 > stam
$ echo 1,2,3,6 >> stam
$ echo 1,2,3,8 >> stam
$ cat stam
1,2,3,4
1,2,3,6
1,2,3,8
$ awk  -F, '{s += $4; l+=$1} END {print "avg is "s/l}' stam
avg is 6

		8.3.2


	8.4
```
