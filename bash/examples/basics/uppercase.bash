#!/bin/bash
# uppercase.sh : Changes input to uppercase.
#Description: pipe input to this script to have it uppercase it
# ls -l "| uppercase.bash

tr 'a-z' 'A-Z'
#  Letter ranges must be quoted
#+ to prevent filename generation from single-letter filenames.

exit 0
