#!/bin/bash
# shft.sh: Using 'shift' to step through all the positional parameters

#  Name this script something like shft.sh,
#+ and invoke it with some parameters.
#+ For example:
#             sh shft.sh a b c def 23 skidoo

until [ -z "$1" ]  # Until all parameters used up . . .
do
  echo -n "$1 "
  shift
done

echo               # Extra line feed.
