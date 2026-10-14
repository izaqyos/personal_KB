---
type: reference
title: Development
description: Section 3 of the legacy kb-mac notes.
tags: [kb-mac]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-mac#3"
---

# Development

[↑ kb-mac](/kb-mac/README.md)

## 3.1 C++

### 3.1.1 g++

```text
Get Xcode
Starting with Xcode 4.3 - you must now manually install command line tools from Xcode menu > Preferences > Downloads.
```

### 3.1.2 Install boost

```text
$ ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"
==> This script will install:
/usr/local/bin/brew
/usr/local/Library/...
/usr/local/share/man/man1/brew.1
==> The following directories will be made group writable:
/usr/local/.
/usr/local/bin
==> The following directories will have their group set to admin:
/usr/local/.
/usr/local/bin

Press RETURN to continue or any other key to abort
==> /usr/bin/sudo /bin/chmod g+rwx /usr/local/. /usr/local/bin

WARNING: Improper use of the sudo command could lead to data loss
or the deletion of important system files. Please double-check your
typing when using sudo. Type "man sudo" for more information.

To proceed, enter your password, or type Ctrl-C to abort.

Password:
==> /usr/bin/sudo /usr/bin/chgrp admin /usr/local/. /usr/local/bin
==> Installing the Command Line Tools (expect a GUI popup):
==> /usr/bin/sudo /usr/bin/xcode-select --install
xcode-select: note: install requested for command line developer tools
Press any key when the installation has completed.
==> Downloading and installing Homebrew...
remote: Counting objects: 152017, done.
remote: Compressing objects: 100% (44246/44246), done.
remote: Total 152017 (delta 106745), reused 151955 (delta 106690)
Receiving objects: 100% (152017/152017), 28.09 MiB | 951.00 KiB/s, done.
Resolving deltas: 100% (106745/106745), done.
From https://github.com/Homebrew/homebrew
 * [new branch]      master     -> origin/master
Checking out files: 100% (3072/3072), done.
HEAD is now at 05c8367 android-sdk: no need to skip cleaning
==> Installation successful!
You should run `brew doctor' *before* you install anything.
Now type: brew help
$ brew install boost
==> Downloading https://downloads.sf.net/project/machomebrew/Bottles/boost-1.55.0.mavericks.bottle.1.tar.gz

		3.1.3
	3.2
```
