#!/bin/bash
# fileinfo2.sh

# Per suggestion of Joël Bourquard and . . .
# http://www.linuxquestions.org/questions/showthread.php?t=410766


FILENAME=testfile.txt
file_name=$(stat -c%n "$FILENAME")   # Same as "$FILENAME" of course.
file_owner=$(stat -c%U "$FILENAME")
file_size=$(stat -c%s "$FILENAME")
#  Certainly easier than using "ls -l $FILENAME"
#+ and then parsing with sed.
file_inode=$(stat -c%i "$FILENAME")
file_type=$(stat -c%F "$FILENAME")
file_access_rights=$(stat -c%A "$FILENAME")

echo "File name:          $file_name"
echo "File owner:         $file_owner"
echo "File size:          $file_size"
echo "File inode:         $file_inode"
echo "File type:          $file_type"
echo "File access rights: $file_access_rights"
