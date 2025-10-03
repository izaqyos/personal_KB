a=2147483646
echo "a = $a"      # a = 2147483646
let "a+=1"         # Increment "a".
echo "a = $a"      # a = 2147483647
let "a+=1"         # increment "a" again, past the limit.
echo "a = $a"      # a = -2147483648
                   #      ERROR (out of range)
