---
type: reference
title: command line scripts
description: "Writing bash command-line scripts that receive arguments: positional parameters and getopts."
tags: [bash, shell, legacy, howto, examples]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "bash/KB_bash#22"
---

# command line scripts, tags: command line scripts, CLI, arguments, parameters

[↑ KB_bash](/bash/kb-bash/README.md)

## 22.1 chatgpt

### 22.1.1 command line scripts, tags: command line scripts, CLI, arguments, parameters

```text
There are several ways to write a Bash script that receives arguments. Here are a few examples:

Using positional parameters:
#!/bin/bash

# Script to process two input arguments
echo "First argument: $1"
echo "Second argument: $2"


In this example, the script takes two arguments as positional parameters ($1 and $2). The values of these parameters are printed to the console using the echo command.

Using the getopts command:
#!/bin/bash

while getopts ":a:b:" opt; do
  case $opt in
    a)
      arg1="$OPTARG"
      ;;
    b)
      arg2="$OPTARG"
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      exit 1
      ;;
    :)
      echo "Option -$OPTARG requires an argument." >&2
      exit 1
      ;;
  esac
done

echo "First argument: $arg1"
echo "Second argument: $arg2"

In this example, the getopts command is used to parse command line options and arguments. The script defines two options (-a and -b) and assigns the values of these options to the variables $arg1 and $arg2, respectively.

Using environment variables:
#!/bin/bash

# Script to process two input arguments
echo "First argument: $MY_VAR1"
echo "Second argument: $MY_VAR2"

In this example, the script expects the arguments to be passed as environment variables (MY_VAR1 and MY_VAR2). These variables can be set before running the script, like so:
export MY_VAR1="hello"
export MY_VAR2="world"
./myscript.sh

Using command line arguments with flags:
#!/bin/bash

# Script to process two input arguments
while getopts ":a:b:" opt; do
  case $opt in
    a)
      arg1="$OPTARG"
      ;;
    b)
      arg2="$OPTARG"
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      exit 1
      ;;
    :)
      echo "Option -$OPTARG requires an argument." >&2
      exit 1
      ;;
  esac
done

shift $((OPTIND-1))

echo "First argument: $arg1"
echo "Second argument: $arg2"
echo "Remaining arguments: $@"

In this example, the script uses the getopts command to parse options and arguments, as in example 2. However, it also uses the shift command to remove the options from the argument list. This allows the remaining arguments to be processed as positional parameters (accessed using $@). The script can be run like so:

./myscript.sh -a hello -b world foo bar baz
In this case, $1 is set to foo, $2 is set to bar, and $3 is set to baz.
```

### 22.1.2 are there additional ways

```text
Yes, there are additional ways to write a Bash script that receives arguments. Here are a few more examples:

Using the read command:
#!/bin/bash

# Script to process two input arguments
read -p "Enter first argument: " arg1
read -p "Enter second argument: " arg2

echo "First argument: $arg1"
echo "Second argument: $arg2"
In this example, the read command is used to prompt the user to enter the arguments. The values entered are assigned to the variables $arg1 and $arg2, respectively.

Using command line arguments with a loop:
#!/bin/bash

# Script to process any number of input arguments
for arg in "$@"
do
  echo "$arg"
done
In this example, the script processes any number of input arguments using a for loop. The loop iterates over the values in $@, which contains all of the command line arguments, and prints each one to the console.

Using a configuration file:
#!/bin/bash

# Script to process input arguments from a configuration file
source myconfig.conf

echo "First argument: $arg1"
echo "Second argument: $arg2"
In this example, the script reads the arguments from a configuration file called myconfig.conf. The file should contain variable assignments, like so:

arg1="hello"
arg2="world"
The source command is used to read the file and set the variables $arg1 and $arg2 to the values specified in the file.

These are just a few examples of the many ways you can write a Bash script that receives arguments. The method you choose will depend on the specific requirements of your script and the preferences of the user.
```

### 22.1.3 yet more ways

```text
Sure, here are a few more ways to write a Bash script that receives arguments:

Using command line arguments with shift and a loop:
#!/bin/bash

# Script to process any number of input arguments
while [[ $# -gt 0 ]]
do
  case "$1" in
    -a|--arg1)
      arg1="$2"
      shift 2
      ;;
    -b|--arg2)
      arg2="$2"
      shift 2
      ;;
    *)
      echo "Unknown option: $1"
      exit 1
      ;;
  esac
done

echo "First argument: $arg1"
echo "Second argument: $arg2"
In this example, the script uses a while loop to iterate over the command line arguments. The case statement is used to parse the options (-a or --arg1 and -b or --arg2) and assign the values to the variables $arg1 and $arg2, respectively. The shift command is used to remove the processed arguments from the argument list.

Using command line arguments with getopts and shift:
#!/bin/bash

# Script to process two input arguments
while getopts ":a:b:" opt; do
  case $opt in
    a)
      arg1="$OPTARG"
      ;;
    b)
      arg2="$OPTARG"
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      exit 1
      ;;
    :)
      echo "Option -$OPTARG requires an argument." >&2
      exit 1
      ;;
  esac
done

shift $((OPTIND-1))

echo "First argument: $arg1"
echo "Second argument: $arg2"
echo "Remaining arguments: $@"
This example is similar to example 4, but uses shift to remove the processed arguments from the argument list after parsing the options with getopts. The remaining arguments can be processed as positional parameters (accessed using $@).

Using a configuration file with source and command line arguments:
#!/bin/bash

# Script to process input arguments from a configuration file and command line
source myconfig.conf

while [[ $# -gt 0 ]]
do
  case "$1" in
    -a|--arg1)
      arg1="$2"
      shift 2
      ;;
    -b|--arg2)
      arg2="$2"
      shift 2
      ;;
    *)
      echo "Unknown option: $1"
      exit 1
      ;;
  esac
done

echo "First argument: $arg1"
echo "Second argument: $arg2"
echo "Config argument: $configarg"
In this example, the script uses both a configuration file (myconfig.conf) and command line arguments. The source command is used to read the configuration file and set the variable $configarg to the specified value. The command line arguments are parsed using a case statement, as in example 8, and assigned to the variables $arg1 and $arg2, respectively.

These are just a few more examples of the many ways you can write a Bash script that receives arguments. The best method will depend on the specific requirements of your script and the preferences of the user.
```

### 22.1.4 bash script to process a text file containing a list of names

```text
ChatGPT
Sure, here is an example Bash script to process a text file containing a list of names:

#!/bin/bash

# Script to process a list of names from a file

# Check that a filename was provided
if [ $# -eq 0 ]
then
  echo "Please provide a filename."
  exit 1
fi

# Check that the file exists and is readable
if [ ! -f $1 ] || [ ! -r $1 ]
then
  echo "File not found or not readable."
  exit 1
fi

# Read the file line by line and process each name
while read name
do
  echo "Hello, $name!"
done < $1
This script takes one argument, which should be the name of the file containing the list of names. It first checks that a filename was provided, and then checks that the file exists and is readable. If either of these checks fails, the script exits with an error message.

Assuming the file exists and is readable, the script reads the file line by line using a while loop and the read command. For each line (i.e., each name), the script outputs a greeting using the echo command.

You can run this script by calling it with the filename as the only argument:

$ ./process_names.sh names.txt
Assuming the file names.txt exists in the same directory as the script, the script will output a greeting for each name in the file.





User
can it be done differently?
ChatGPT
Yes, there are different ways to process a text file containing a list of names in a Bash script. Here are a couple of additional approaches:

Using a for loop with cat:
#!/bin/bash

# Script to process a list of names from a file

# Check that a filename was provided
if [ $# -eq 0 ]
then
  echo "Please provide a filename."
  exit 1
fi

# Check that the file exists and is readable
if [ ! -f $1 ] || [ ! -r $1 ]
then
  echo "File not found or not readable."
  exit 1
fi

# Process each name in the file using a for loop and cat
for name in $(cat $1)
do
  echo "Hello, $name!"
done
In this approach, the cat command is used to output the contents of the file as a stream of text, and the for loop iterates over each name in the stream. The script checks for the existence and readability of the file as in the previous example.

Using while loop with IFS:
#!/bin/bash

# Script to process a list of names from a file

# Check that a filename was provided
if [ $# -eq 0 ]
then
  echo "Please provide a filename."
  exit 1
fi

# Check that the file exists and is readable
if [ ! -f $1 ] || [ ! -r $1 ]
then
  echo "File not found or not readable."
  exit 1
fi

# Read the file line by line and process each name
while IFS= read -r name
do
  echo "Hello, $name!"
done < $1
This approach uses the IFS (Internal Field Separator) variable to set the delimiter for the read command to the newline character, so that each line of the file is read as a separate item. The while loop iterates over each item, which is assigned to the $name variable. The script checks for the existence and readability of the file as in the previous example.

These are just a couple of examples of how you can process a text file containing a list of names in a Bash script. The best approach will depend on the specific requirements of your script and the format of the file.





User
yet more ways
ChatGPT
Sure, here are a few more ways to process a text file containing a list of names in a Bash script:

Using awk:
#!/bin/bash

# Script to process a list of names from a file

# Check that a filename was provided
if [ $# -eq 0 ]
then
  echo "Please provide a filename."
  exit 1
fi

# Check that the file exists and is readable
if [ ! -f $1 ] || [ ! -r $1 ]
then
  echo "File not found or not readable."
  exit 1
fi

# Use awk to process each name in the file
awk '{print "Hello,", $0, "!"}' $1
In this approach, awk is used to process each line of the file and output a greeting for each name. The $0 variable in awk represents the entire line, so we can use it to reference each name in the file. The script checks for the existence and readability of the file as in the previous examples.

Using sed:
#!/bin/bash

# Script to process a list of names from a file

# Check that a filename was provided
if [ $# -eq 0 ]
then
  echo "Please provide a filename."
  exit 1
fi

# Check that the file exists and is readable
if [ ! -f $1 ] || [ ! -r $1 ]
then
  echo "File not found or not readable."
  exit 1
fi

# Use sed to process each name in the file
sed 's/^/Hello, /; s/$/!/' $1
In this approach, sed is used to process each line of the file and add a greeting to each name. The first s command adds "Hello, " to the beginning of each line (^ represents the beginning of the line), and the second s command adds "!" to the end of each line ($ represents the end of the line). The script checks for the existence and readability of the file as in the previous examples.

These are just a few more examples of how you can process a text file containing a list of names in a Bash script. There are many other commands and utilities available in Bash that you can use to manipulate and process text files.

        22.1.5 parse json file containing an array of names and print each name bash

ChatGPT
You can use the jq command to parse a JSON file containing an array of names and print each name in Bash. Here's an example script:

#!/bin/bash

# Script to parse a JSON file containing an array of names

# Check that a filename was provided
if [ $# -eq 0 ]
then
  echo "Please provide a filename."
  exit 1
fi

# Check that the file exists and is readable
if [ ! -f $1 ] || [ ! -r $1 ]
then
  echo "File not found or not readable."
  exit 1
fi

# Use jq to parse the JSON file and print each name
jq -r '.[]' $1
In this script, we first check that a filename was provided as an argument and that the file exists and is readable. Then we use the jq command with the -r option to parse the JSON file and print each element of the top-level array. The . represents the top-level of the JSON object, and [] is used to select all elements of the array. The -r option tells jq to output the results as raw strings, without any additional formatting.

For example, if the JSON file names.json contains the following array of names:
[
  "Alice",
  "Bob",
  "Charlie"
]
Running the script with ./parse_names.sh names.json would output:

Alice
Bob
Charlie
Note that this script assumes that the input JSON file contains an array of names at the top level. If your JSON file has a different structure, you may need to modify the jq command to extract the names in the appropriate way.


User
names array is the value of property 'names'
ChatGPT
If the names array is the value of a property called "names" in the JSON file, you can modify the jq command to extract the array and print each element. Here's an updated script:

bash
Copy code
#!/bin/bash

# Script to parse a JSON file containing a "names" property with an array of names

# Check that a filename was provided
if [ $# -eq 0 ]
then
  echo "Please provide a filename."
  exit 1
fi

# Check that the file exists and is readable
if [ ! -f $1 ] || [ ! -r $1 ]
then
  echo "File not found or not readable."
  exit 1
fi

# Use jq to extract the "names" property and print each name
jq -r '.names[]' $1
In this updated script, we use the jq command to extract the "names" property with the .names selector, and then use the [] operator to extract each element of the array. The -r option is used to output the results as raw strings, without any additional formatting.

For example, if the JSON file names.json contains the following object with a "names" property:

{
  "names": [
    "Alice",
    "Bob",
    "Charlie"
  ]
}
Running the script with ./parse_names.sh names.json would output:

Alice
Bob
Charlie
Again, if your JSON file has a different structure or property name, you may need to modify the jq command accordingly.

User
is it possible without jq
ChatGPT
Yes, it is possible to extract and print the names from a JSON file without using jq, but it would require more complex scripting in Bash.

One way to achieve this would be to use grep and sed commands to extract the names from the JSON file. Here's an example script:

bash
Copy code
#!/bin/bash

# Script to extract names from a JSON file without using jq

# Check that a filename was provided
if [ $# -eq 0 ]
then
  echo "Please provide a filename."
  exit 1
fi

# Check that the file exists and is readable
if [ ! -f $1 ] || [ ! -r $1 ]
then
  echo "File not found or not readable."
  exit 1
fi

# Use grep to find the "names" property and sed to extract the array
names=$(grep -o '"names":[^]]*' $1 | sed 's/"names"://')

# Use sed to remove the brackets and quotes from the array
names=$(echo $names | sed 's/[][]//g; s/"//g')

# Loop through the names and print each one
for name in $names
do
  echo $name
done
In this script, we first use grep to search for the "names" property in the JSON file and extract the array using a regular expression. The [^]]* pattern matches any characters that are not a closing bracket ], so we capture all the characters between the "names" property and the end of the array.

We then use sed to remove the "names" property from the captured string, as well as any remaining quotes and brackets. This leaves us with a comma-separated list of names, which we can loop through and print using a for loop.

Note that this approach assumes that the "names" property is a top-level property in the JSON file and that the names array does not contain any nested arrays or objects. If your JSON file has a different structure, this script may not work correctly.

        22.1.6 parse json file containing an array of names and load the names into an array then iterate over the array of names
You can use the jq command-line tool to parse JSON files in Bash. Here's an example of how you can use jq to load an array of names from a JSON file and iterate over it in Bash:

#!/bin/bash

# Load the names from the JSON file into an array
names=($(jq -r '.names[]' names.json))

# Iterate over the array of names
for name in "${names[@]}"
do
  echo "Name: $name"
done
Assuming your JSON file names.json looks like this:

{
  "names": [
    "Alice",
    "Bob",
    "Charlie"
  ]
}
The above script will output:

Name: Alice
Name: Bob
Name: Charlie
In the script, the jq command with the -r option outputs the values of the .names[] array in raw format (i.e., without quotes) and uses the command substitution $(...) to load the output into the names array. Then, the for loop iterates over the array and prints each name using echo.
```

### 22.1.7 linux delete all files with specific pattern

````text
- my way jj 
ex: alias del_orig="find . -name '*.orig' | xargs rm"

- gpt way:
You can use the `rm` command with the `-f` (force) and `-r` (recursive) options to delete all files with a specific pattern in a directory and its subdirectories.

Here's an example command that deletes all files with the `.txt` extension in the current directory and its subdirectories:

```
rm -rf *.txt
```

In this command, `rm` is the command to remove files, `-r` specifies that it should be done recursively, `-f` specifies that it should be done forcefully (without prompting for confirmation), and `*.txt` is the pattern that matches all files with the `.txt` extension.

You should be careful when using this command, as it will delete all files that match the pattern without prompting for confirmation. It's a good idea to test the command first by running it with the `-i` option, which prompts for confirmation before deleting each file:

```
rm -rfi *.txt
```

This will list all the files that match the pattern and ask you to confirm each deletion.

It's also a good idea to double-check the pattern before running the command, to make sure that you're only deleting the files that you intend to delete.

- can I use find and rm to achieve the same
Yes, you can use the `find` command along with the `rm` command to achieve the same result as using `rm` with a pattern.

Here's an example command that deletes all files with the `.txt` extension in the current directory and its subdirectories using `find` and `rm`:

```
find . -name "*.txt" -type f -delete
```

In this command, `find` is used to locate all files with the `.txt` extension (`-name "*.txt"`) that are regular files (`-type f`) in the current directory and its subdirectories (`.`), and the `-delete` option is used to delete them.

Again, you should be careful when using this command, as it will delete all files that match the pattern without prompting for confirmation. It's a good idea to test the command first by running it with the `-print` option, which will list the files that would be deleted:

```
find . -name "*.txt" -type f -print
```

If you're satisfied with the list of files, you can run the command again without the `-print` option to actually delete the files.

It's also worth noting that the `find` command is more flexible than using a pattern with `rm`, as it allows you to search for files based on a variety of criteria, such as file size, modification time, and ownership. This can be useful if you need to delete files based on more specific criteria.

- an I use pipe and exec for same result in bash

Yes, you can use a pipe and the `exec` command to achieve the same result as using `find` and `rm` together.

Here's an example command that deletes all files with the `.txt` extension in the current directory and its subdirectories using a pipe and the `exec` command:

```
find . -name "*.txt" -type f -print0 | xargs -0 -I{} sh -c 'exec rm "{}"'
```

In this command, `find` is used to locate all files with the `.txt` extension (`-name "*.txt"`) that are regular files (`-type f`) in the current directory and its subdirectories (`.`), and the `-print0` option is used to separate the filenames with null characters instead of newlines.

The `|` symbol is used to pipe the output of `find` to `xargs`, which reads the null-separated filenames and passes them to the `rm` command.

The `-0` option is used with `xargs` to interpret the input as null-separated filenames, and the `-I{}` option is used to replace occurrences of `{}` in the `sh -c` command with the filename.

Finally, the `exec` command is used in the `sh -c` command to replace the shell process with the `rm` command, which deletes the file.

Again, you should be careful when using this command, as it will delete all files that match the pattern without prompting for confirmation. It's a good idea to test the command first by running it with the `-print0` option and omitting the `| xargs -0 -I{} sh -c 'exec rm "{}"'` part of the command, which will list the files that would be deleted:

```
find . -name "*.txt" -type f -print0
```

If you're satisfied with the list of files, you can run the full command again to actually delete the files.

It's worth noting that using a pipe and the `exec` command can be less efficient than using `find` and `rm` together, as it involves starting a new shell process for each file. However, for small numbers of files, the difference in performance may not be noticeable.


        22.1.8
    22.2


23.
````
