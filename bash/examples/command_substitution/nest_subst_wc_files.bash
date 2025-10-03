word_count=$( wc -w $(ls -l | awk '{print $9}') )
echo ${word_count}
