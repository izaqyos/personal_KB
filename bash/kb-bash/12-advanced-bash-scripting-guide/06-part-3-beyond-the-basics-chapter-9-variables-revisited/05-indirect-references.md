---
type: reference
title: Indirect References
description: Subsection 12.6.5 of Part 3. Beyond the Basics. Chapter 9. Variables Revisited.
tags: [kb-bash, xargs, examples]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "bash/KB_bash#12.6.5"
---

# 12.6.5 Indirect References

[↑ Part 3. Beyond the Basics. Chapter 9. Variables Revisited](/bash/kb-bash/12-advanced-bash-scripting-guide/06-part-3-beyond-the-basics-chapter-9-variables-revisited/README.md)

```text
Assume that the value of a variable is the name of a second variable. Is it somehow possible to retrieve the value of this second variable from the first one? For example, if a=letter_of_alphabet  and letter_of_alphabet=z, can a reference to a return z? This can indeed be done, and it is called an indirect reference. It uses the unusual eval var1=\$$var2  notation.

Example 9-24. Indirect Variable References

#!/bin/bash
# ind-ref.sh: Indirect variable referencing.
# Accessing the contents of the contents of a variable.

a=letter_of_alphabet   # Variable "a" holds the name of another variable.
letter_of_alphabet=z

echo

# Direct reference.
echo "a = $a"          # a = letter_of_alphabet

# Indirect reference.
eval a=\$$a
echo "Now a = $a"      # Now a = z

echo


# Now, let's try changing the second-order reference.

t=table_cell_3
table_cell_3=24
echo "\"table_cell_3\" = $table_cell_3"            # "table_cell_3" = 24
echo -n "dereferenced \"t\" = "; eval echo \$$t    # dereferenced "t" = 24
# In this simple case, the following also works (why?).
#         eval t=\$$t; echo "\"t\" = $t"

echo

t=table_cell_3
NEW_VAL=387
table_cell_3=$NEW_VAL
echo "Changing value of \"table_cell_3\" to $NEW_VAL."
echo "\"table_cell_3\" now $table_cell_3"
echo -n "dereferenced \"t\" now "; eval echo \$$t
# "eval" takes the two arguments "echo" and "\$$t" (set equal to $table_cell_3)

echo

# (Thanks, Stephane Chazelas, for clearing up the above behavior.)


# Another method is the ${!t} notation, discussed in "Bash, version 2" section.
# See also ex78.sh.

exit 0

Of what practical use is indirect referencing of variables? It gives Bash a little of the functionality of pointers in C, for instance, in table lookup. And, it also has some other very interesting applications. . . .

Nils Radtke shows how to build "dynamic" variable names and evaluate their contents. This can be useful when sourcing configuration files.

#!/bin/bash


# ---------------------------------------------
# This could be "sourced" from a separate file.
isdnMyProviderRemoteNet=172.16.0.100
isdnYourProviderRemoteNet=10.0.0.10
isdnOnlineService="MyProvider"
# ---------------------------------------------
      

remoteNet=$(eval "echo \$$(echo isdn${isdnOnlineService}RemoteNet)")
remoteNet=$(eval "echo \$$(echo isdnMyProviderRemoteNet)")
remoteNet=$(eval "echo \$isdnMyProviderRemoteNet")
remoteNet=$(eval "echo $isdnMyProviderRemoteNet")

echo "$remoteNet"    # 172.16.0.100

# ================================================================

#  And, it gets even better.

#  Consider the following snippet given a variable named getSparc,
#+ but no such variable getIa64:

chkMirrorArchs () { 
  arch="$1";
  if [ "$(eval "echo \${$(echo get$(echo -ne $arch |
       sed 's/^\(.\).*/\1/g' | tr 'a-z' 'A-Z'; echo $arch |
       sed 's/^.\(.*\)/\1/g')):-false}")" = true ]
  then
     return 0;
  else
     return 1;
  fi;
}

getSparc="true"
unset getIa64
chkMirrorArchs sparc
echo $?        # 0
               # True

chkMirrorArchs Ia64
echo $?        # 1
               # False

# Notes:
# -----
# Even the to-be-substituted variable name part is built explicitly.
# The parameters to the chkMirrorArchs calls are all lower case.
# The variable name is composed of two parts: "get" and "Sparc" . . .

Example 9-25. Passing an indirect reference to awk

#!/bin/bash

#  Another version of the "column totaler" script
#+ that adds up a specified column (of numbers) in the target file.
#  This one uses indirect references.

ARGS=2
E_WRONGARGS=65

if [ $# -ne "$ARGS" ] # Check for proper no. of command line args.
then
   echo "Usage: `basename $0` filename column-number"
   exit $E_WRONGARGS
fi

filename=$1
column_number=$2

#===== Same as original script, up to this point =====#


# A multi-line awk script is invoked by   awk ' ..... '


# Begin awk script.
# ------------------------------------------------
awk "

{ total += \$${column_number} # indirect reference
}
END {
     print total
     }

     " "$filename"
# ------------------------------------------------
# End awk script.

#  Indirect variable reference avoids the hassles
#+ of referencing a shell variable within the embedded awk script.
#  Thanks, Stephane Chazelas.


exit 0

Caution	

This method of indirect referencing is a bit tricky. If the second order variable changes its value, then the first order variable must be properly dereferenced (as in the above example). Fortunately, the ${!variable} notation introduced with version 2 of Bash (see Example 34-2 and Example A-24) makes indirect referencing more intuitive.

Bash does not support pointer arithmetic, and this severely limits the usefulness of indirect referencing. In fact, indirect referencing in a scripting language is, at best, an ugly kludge.
```
