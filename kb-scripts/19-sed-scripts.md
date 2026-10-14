---
type: reference
title: sed scripts
description: "Sed scripts, including a section commenter shell script."
tags: [sed, bash, examples, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-scripts#19"
---

# sed scripts

[↑ kb-scripts](/kb-scripts/README.md)

## 19.1 section commenter

```text
#!/bin/bash
#===============================================================================
#
#          FILE:  section_commenter.sh
# 
#         USAGE:  ./section_commenter.sh [-c] "#comment this section" <file>
# 
#   DESCRIPTION: If -c flag is used with <comment> then comment the section in file that contains  
#               the given comment (add # prefix to each section line)  otherwise will uncomment the section 
# 
#       OPTIONS:  ---
#  REQUIREMENTS:  ---
#          BUGS:  ---
#         NOTES:  ---
#        AUTHOR:   (Yosi Izaq), 
#       COMPANY:  
#       VERSION:  1.0
#       CREATED:  09/03/2009 04:33:43 PM IDT
#      REVISION:  ---
#===============================================================================

if [ "$1" = "-c" ]; then
    COMMENT='yes';
    shift;
else
    COMMENT='no';
fi

if [ "$COMMENT" = "yes" ]; then
    sed -i "/$1/,/^$/s/^[^#]/#&/g" "$2"
else
    sed -i "/$1/,/^$/s/^#\+//g" "$2"
#add an extra # to comment line b/c it should stay commented
    sed -i "s/$1/#$1/" "$2"
fi

	19.2
```
