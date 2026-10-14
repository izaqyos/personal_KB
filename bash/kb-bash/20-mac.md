---
type: reference
title: mac
description: Section 20 of the legacy KB_bash notes.
tags: [kb-bash, macos, mac, osx, bash]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "bash/KB_bash#20"
---

# mac, tags: macos, mac, osx, bash

[↑ KB_bash](/bash/kb-bash/README.md)

## 20.1 upgrade bash version

```text
Source: https://www.shell-tips.com/mac/upgrade-bash/
GNU Bashicon mdi-link-variant is a powerful shell. Unfortunately the Mac OS operating systems doesn’t provide the latest version which may prevent you to take advantage of the latest features that came with Bash 4 and 5. Also, running an outdated bash version probably expose you to some major vulnerabilities.

Mac OS comes with Bash version 3 which is quite limiting and lack key features like the bash associative arraysicon mdi-link-variant, improved auto-completion, better Posix conformance, etc

- determine version:
$ bash --version
bash --version
GNU bash, version 3.2.57(1)-release (arm64-apple-darwin21)
Copyright (C) 2007 Free Software Foundation, Inc.
history -a
$ echo version=${BASH_VERSION}  major version ${BASH_VERSINFO} 
echo version=${BASH_VERSION}  major version ${BASH_VERSINFO} 
version=3.2.57(1)-release major version 3

- if not already installed, install brew 
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" 
$ brew upgrade 
$ brew install bash 
$ exec bash
Loading yosi izaq BASHRC for <employer> MAC environment
LOADING <user> aliases for <employer> MAC environment
$ echo version=${BASH_VERSION}  major version ${BASH_VERSINFO} 
version=5.1.16(1)-release major version 5
$ bash --version
GNU bash, version 5.1.16(1)-release (aarch64-apple-darwin21.1.0)

- note default bash is still 3. 
$ /bin/bash --version
GNU bash, version 3.2.57(1)-release (arm64-apple-darwin21)
Copyright (C) 2007 Free Software Foundation, Inc.

- But brew kindly set bash to brew install
$ ls $(brew --prefix)/bin/bash
/opt/homebrew/bin/bash@
$  $(brew --prefix)/bin/bash --version
GNU bash, version 5.1.16(1)-release (aarch64-apple-darwin21.1.0)
$ which bash
/opt/homebrew/bin/bash

- add brew bash to allowed shels:
$ cat /private/etc/shells 
# List of acceptable shells for chpass(1).
# Ftpd will not allow users to connect who are not using
# one of these shells.

/bin/bash
/bin/csh
/bin/dash
/bin/ksh
/bin/sh
/bin/tcsh
/bin/zsh

$ echo $(brew --prefix)/bin/bash | sudo tee -a /private/etc/shells
Password:
/opt/homebrew/bin/bash
$ tail -n 1 /private/etc/shells 
/opt/homebrew/bin/bash
$ 

- And set shell for my user. two ways:
  -- $ sudo chpass -s $(brew --prefix)/bin/bash 'Yosi Izaq'
Changing shell for <user>. 
or
    -- go to the Menu > System Preferences... > Users & Groups. Unlock the pane, control click on your user to select Advanced Options..., then update the Login shell 
    to$(brew --prefix)/bin/bash , on my mac its /opt/homebrew/bin/bash 


    20.2
```
