---
type: reference
title: multiple_slowFS_file_fetchers.bash
description: Section 22 of the legacy kb-scripts notes.
tags: [kb-scripts]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-scripts#22"
---

# multiple_slowFS_file_fetchers.bash

[↑ kb-scripts](/kb-scripts/README.md)

```text
#!/bin/bash
#===============================================================================
#
#          FILE:  multiple_slowFS_file_fetchers.bash
#       
#         USAGE:  multiple_slowFS_file_fetchers.bash
# 
#   DESCRIPTION:  Go to IPCentral and extract all ACS 5.1 libs
#   Must be done MT since the archive is extremely slow
# 
#       OPTIONS:  ---
#  REQUIREMENTS:  ---
#          BUGS:  ---
#         NOTES:  ---
#        AUTHOR:   Yosi Izaq 
#       COMPANY:  
#       VERSION:  1.0
#       CREATED:  06/06/2007 11:38:08 AM IDT
#      REVISION:  ---
#===============================================================================

ARCHIVE_LOC="<internal-path> 5.1"
TRG_LOC="/users/<user>/temp"
ARCHIVE_NAME="acs_5_1_src_publication_"

cd "$ARCHIVE_LOC"

ArchiveLibs(){


        echo "archiving libs starting with letter $1"
        echo "exec: tar cvhz ${TRG_LOC}/${ARCHIVE_NAME}$1.tarz $1*"
        #touch ${TRG_LOC}/${ARCHIVE_NAME}$1.tarz
        tar -zcvhf ${TRG_LOC}/${ARCHIVE_NAME}$1.tarz $1*
}

for let in {a..z} ; do
        ArchiveLibs "$let" &
        sleep 1
done

wait $!
echo "Terminated all archive threads"
```
