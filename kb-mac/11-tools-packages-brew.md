---
type: reference
title: "Tools, packages, brew"
description: "Homebrew install/troubleshooting and must-have tools such as ag, fzf and nodejs."
tags: [homebrew, macos, tips, reference, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-mac#11"
---

# Tools, packages, brew

[↑ kb-mac](/kb-mac/README.md)

```text
https://brew.sh
```

## 11.0 install and troubleshoot brew

```text
Uninstall homebrew $ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/uninstall)"
Install homebrew $ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

## 11.1 Must have tools

```text
vim, nodejs
```

### 11.1.1 ag, fast recursive grep

```text
brew install ag
$ ag longId .
test/api/app.spec.js
16:    let longId = StoreVars.longId;
129:                        .get(`/semantic/entity/app?id=1112&contextId=${longId}`)
151:                        .get(`/semantic/entity/app?id=${longId}&contextId=1112`)
280:                        .get(`/semantic/entity/app/1112?contextId=${longId}`)
295:                        .get(`/semantic/entity/app/${longId}?contextId=1112`)
416:                        .get(`/semantic/entity/app?id=1112&contextId=${longId}`)
438:                        .get(`/semantic/entity/app?contextId=1112&catalogId=${longId}`)
460:                        .get(`/semantic/entity/app?contextId=1112&groupId=${longId}`)
```

### 11.1.2 fzf, file fuzzy finder.

```text
start typing and a matching list will go narrower
```

### 11.1.3 nodejs

```text
        brew install nodejs
```

## 11.1 postgres cli

```text
        brew install pgcli
```

### 11.1.5 install GUI apps from CLI

```text
        brew install cask
```

### 11.1.6 download youtube videos

```text
        brew install youtube-dl
```

### 11.1.7 speedtest check

```text
        brew install speedtest-cli
```

### 11.1.8 tree list folder and files

```text
        brew install tree
```

### 11.1.9 tmux

```text
        brew install tmux
```

### 11.1.10 mc

```text
        brew install midnight-commander
        $ mc
```

### 11.1.11 htop better top

```text
        brew install htop
```

### 11.1.12 tldr more consice man

```text
        brew install tldr
```

### 11.1.13 json editor

```text
        brew install jq
```

### 11.1.14 better du

```text
        brew install ncdu

        11.1.15
    11.2


12. icloud drive
		
    12.1  copy to icloud drive from terminal


$ cp yosi_backup_04_11_21.tar.bz2 ~/Library/Mobile\ Documents/com~apple~CloudDocs/

13. Arm based macs 

    13.1  Run intel based binaries

        13.1.1  https://indiespark.top/software/run-command-line-apple-silicon/, tags: rosetta 2
a. Open the Terminal app.
b. Open the Terminal app’s Preferences.
c. Click on the Profiles tab.
d. Select a profile, click on the ellipsis at the bottom of the profile list and then select Duplicate Profile.
e. Click on the new profile and give it a good name. I named mine as “Rosetta Shell”.
Also in the new profile, click on the Window tab. In the Title, put a name to indicate that this is for running Intel-based apps. I put “Terminal - Intel” on mine.
f. Click on the Shell tab and use the following as its Run Command to force the shell run under Rosetta:
    f1 for zsh
env /usr/bin/arch -x86_64 /bin/zsh --login
    f2 for bash
env /usr/bin/arch -x86_64 /bin/bash --login
Untick the Run inside shell checkbox. Clearing the checkbox would prevent running the shell twice, which could bloat your environment variables since ~/.bas/zshrc gets run twice.
Optionally set this profile as the Default.

Then install Homebrew in a separate location 
cd /usr/local
sudo mkdir homebrew
sudo chgrp admin homebrew
sudo chmod g+rwx homebrew
curl -L https://github.com/Homebrew/brew/tarball/master | tar xz --strip 1 -C homebrew

oneliner:
cd /usr/local && sudo mkdir homebrew && sudo chgrp admin homebrew && sudo chmod g+rwx homebrew && curl -L https://github.com/Homebrew/brew/tarball/master | tar xz --strip 1 -C homebrew

Add the following snippet to your ~/.zshrc to automatically choose which Homebrew installation to use depending whether it is running on Rosetta:
if [ "$(sysctl -n sysctl.proc_translated)" = "1" ]; then
    local brew_path="/usr/local/homebrew/bin"
else
    local brew_path="/opt/homebrew/bin"
fi
export PATH="${brew_path}:${PATH}"

note, sysctl didn't work for me. I ended up adding this to .bashrc
#compatible to either intel or arm homebrew PATH
set_brew_path_intel(){
#if [ "$(sysctl -n sysctl.proc_translated)" = "1" ]; then
#    local brew_path="/opt/homebrew/bin"
#else
#    local brew_path="/usr/local/homebrew/bin"
#fi
local brew_path="/usr/local/homebrew/bin"
export PATH="${brew_path}:${PATH}"
}
set_brew_path_intel

last use intel brew on rosetta terminal to install and then run cf cli
$ brew install cloudfoundry/tap/cf-cli




        13.1.2 CF Cli arm binaries
https://github.com/cloudfoundry/cli/blob/master/doc/installation-instructions/installation-instructions-v6.md#installers-and-compressed-binaries

        13.1.3
    13.2

14.
```
