variable1="a variable containing five words"
echo This is $variable1    # Executes echo with 7 arguments:
# "This" "is" "a" "variable" "containing" "five" "words"

echo "This is $variable1"  # Executes echo with 1 argument:
# "This is a variable containing five words"


variable2=""    # Empty.

echo $variable2 $variable2 $variable2
                # Executes echo with no arguments. 
echo "$variable2" "$variable2" "$variable2"
                # Executes echo with 3 empty arguments. 
echo "$variable2 $variable2 $variable2"
                # Executes echo with 1 argument (2 spaces). 

# Thanks, Stéphane Chazelas.
