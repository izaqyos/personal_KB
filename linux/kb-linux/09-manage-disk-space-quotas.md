---
type: reference
title: "Manage disk space, quotas"
description: "Managing disk space and quotas: du, sorted file listings and quota checks."
tags: [linux, unix, one-liners, tips, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "linux/KB_Linux#9"
---

# Manage disk space, quotas

[↑ KB_Linux](/linux/kb-linux/README.md)

## 9.1 Check for disk usage on my user account

```text
$du -h --exclude=.snapshot > ./1.txt 
then use either sed or vim to leave only the big files reported, for ex. in vim do:
:g/\d\+\.\?\d\+K/d
```

## 9.2 Get a list of files and dirs sorted according to used space

```text
	du -sk * | sort -n
```

## 9.3 Check quota

```text
	go to /ws/<user> and run "sudo nquota -u <user>"

some aliases:
alias du_1st_lvl='for dir in `ls_dir`; do du -sh $dir; done'
alias list_young_files='echo list files that are younger than 1 year; find . -mtime -365; '
alias quotas='echo user $USER quotas: ; sudo <internal-path> -u <user> ; echo top size dirs:; echo in ws: ;  cd /ws/<user> ; du_1st_lvl; echo in home dir: ; cd  /users/<user>; du_1st_lvl;  
```
