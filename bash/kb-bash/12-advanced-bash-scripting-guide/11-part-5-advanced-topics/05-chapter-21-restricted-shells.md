---
type: reference
title: Chapter 21. Restricted Shells
description: "ABS Guide chapter 21: restricted shells and disabled commands."
tags: [bash, shell, legacy, book-notes, reference]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "bash/KB_bash#12.12.5"
---

# 12.12.5 Chapter 21. Restricted Shells

[↑ Part 5. Advanced Topics](/bash/kb-bash/12-advanced-bash-scripting-guide/11-part-5-advanced-topics/README.md)

```text
Disabled commands in restricted shells

    . Running a script or portion of a script in restricted mode disables certain commands that would otherwise be available. This is a security measure intended to limit the privileges of the script user and to minimize possible damage from running the script.

The following commands and actions are disabled:

    * Using cd to change the working directory.
    * Changing the values of the $PATH, $SHELL, $BASH_ENV, or $ENV environmental variables.
    * Reading or changing the $SHELLOPTS, shell environmental options.
    * Output redirection.
    * Invoking commands containing one or more /'s.
    * Invoking exec to substitute a different process for the shell.
    * Various other commands that would enable monkeying with or attempting to subvert the script for an unintended purpose.
    * Getting out of restricted mode within the script.
```

#### 12.12.5.1 Example 21-1. Running a script in restricted mode

```text
#!/bin/bash

#  Starting the script with "#!/bin/bash -r"
#+ runs entire script in restricted mode.

echo

echo "Changing directory."
cd /usr/local
echo "Now in `pwd`"
echo "Coming back home."
cd
echo "Now in `pwd`"
echo

# Everything up to here in normal, unrestricted mode.

set -r
# set --restricted    has same effect.
echo "==> Now in restricted mode. <=="

echo
echo

echo "Attempting directory change in restricted mode."
cd ..
echo "Still in `pwd`"

echo
echo

echo "\$SHELL = $SHELL"
echo "Attempting to change shell in restricted mode."
SHELL="/bin/ash"
echo
echo "\$SHELL= $SHELL"

echo
echo

echo "Attempting to redirect output in restricted mode."
ls -l /usr/bin > bin.files
ls -l bin.files    # Try to list attempted file creation effort.

echo

exit 0
```
