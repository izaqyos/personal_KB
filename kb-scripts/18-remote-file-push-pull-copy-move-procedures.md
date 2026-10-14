---
type: reference
title: Remote file push/pull/copy/move procedures
description: "The cpr_fast alias, an efficient replacement for cp -r when copying directories."
tags: [bash, unix, one-liners, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-scripts#18"
---

# Remote file push/pull/copy/move procedures

[↑ kb-scripts](/kb-scripts/README.md)

```text
	actually, small aliasses that are only needed if rcp/rsh are not allowed on system
_pull_file_ssh(){

        echo "SSH copy file from remote host"


        if  [ $# -ne 3 ]
                then
                        echo "Usage pull_file_ssh <remote file> <remote host> <local file>"
        else
                echo "copying $1 to $3 from machine $2"
                ssh $2  cat $1 > $3
        fi

}
_push_file_ssh(){

        echo "SSH move file to remote host"
        echo "Usage push_file_ssh <local file> <remote host> <remote file>"


        if  [ $# -ne 3 ]
                then
                        echo "Usage push_file_ssh <local file> <remote host> <remote file>"
        else
                echo "copying $1 to $3 on machine $2"
                cat $1 | ssh $2  cat ">" $3
        fi

}

alias push_file_ssh='_push_file_ssh'
alias pull_file_ssh='_pull_file_ssh'

	18.1 cpr_fast, also note the following alias performs a much faster directory copy than cp -r
_cpr_fast(){

#Description: This alias copied directories much faster than cp -r
#Usage: $ cpr_fast source target
#Author Yosi Izaq
        echo "This alias copies directories much faster than cp -r"


        if  [ $# -ne 2 ] 
                then
                        echo "Usage: $ cpr_fast source target"
        else
                echo "copying $1 to $2"
                ( cd $1  && tar cf - . ) | (cd $2  && tar xvpf - ) 
        fi  

}
#Efficient replacment to cp -r
alias cpr_fast='_cpr_fast'
```
