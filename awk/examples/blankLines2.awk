# blankLines2.awk, count blank lines
/^$/ {
	x += 1
}
 END {print "number of blank lines is: " x }
