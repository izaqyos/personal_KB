#!/bin/sh
# readpipe.sh
# This example contributed by Bjon Eriksson.

last="(null)"
cat $0 |
while read line
do
    echo "{$line}"
    last=$line
done
printf "\nAll done, last:$last\n"

