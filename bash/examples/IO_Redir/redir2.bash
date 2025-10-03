#!/bin/bash
# redir2.sh

if [ -z "$1" ]
then
  Filename=names.data       # Default, if no filename specified.
else
  Filename=$1
fi  
#+ Filename=${1:-names.data}
#  can replace the above test (parameter substitution).

count=0

echo

while [ "$name" != May ]  # Why is variable $name in quotes?
do
  read name                 # Reads from $Filename, rather than stdin.
  echo $name
  let "count += 1"
done <"$Filename"           # Redirects stdin to file $Filename. 
#    ^^^^^^^^^^^^

echo; echo "$count names read"; echo
