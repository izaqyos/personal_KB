---
type: reference
title: Arrays
description: Section 4 of the legacy KB_bash notes.
tags: [kb-bash]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "bash/KB_bash#4"
---

# Arrays

[↑ KB_bash](/bash/kb-bash/README.md)

```text
		example:
			# -----------------------------------------------------------------
# # Another array, "area2".
# # Another way of assigning array variables...
# # array_name=( XXX YYY ZZZ ... )
#
# area2=( zero one two three four )
#
# echo -n "area2[0] = "
# echo ${area2[0]}
# # Aha, zero-based indexing (first element of array is [0], not [1]).
#
# echo -n "area2[1] = "
# echo ${area2[1]}    # [1] is second element of array.
# # -----------------------------------------------------------------
```

## 4.1 Iteration

```text
			example:
			for name in ${names[@]}
			do
			   echo $name
			      # other stuff on $name
			# done

			sometimes it is useful to loop through an array and know the numeric index of the array you are using (for example, so that you can reference another array with the same index). The same loop in the example above can be achieved this way, too: 
			for (( i = 0 ; i < ${#names[@]} ; i++ ))
			do
			  echo ${names[$i]}
			     # yadda yadda
			# done		
```

## 4.2 many commands for same argument

```text
			Also for many commands you can use a loop:
			for cmd in mkdir cd mkdir cd ls tar etc; do ${cmd}' /long/dir/name' ; done
```

## 4.3 The Ultimate Bash Array Tutorial with 15 Examples

```text
by SASIKALA on JUNE 3, 2010

An array is a variable containing multiple values may be of same type or of different type.  There is no maximum limit to the size of an array, nor any requirement that member variables be indexed or assigned contiguously. Array index starts with zero.

In this article, let us review 15 various array operations in bash.

This article is part of the on-going Bash Tutorial series. For those who are new to bash scripting, get a jump-start from the Bash Scripting Introduction tutorial.
```

### 4.3.1 Declaring an Array and Assigning values

```text
In bash, array is created automatically when a variable is used in the format like,

name[index]=value
name is any name for an array
index could be any number or expression that must evaluate to a number greater than or equal to zero.You can declare an explicit array using declare -a arrayname.
$ cat arraymanip.sh
#! /bin/bash
Unix[0]='Debian'
Unix[1]='Red hat'
Unix[2]='Ubuntu'
Unix[3]='Suse'

echo ${Unix[1]}

$./arraymanip.sh
Red hat
To access an element from an array use curly brackets like ${name[index]}.
```

### 4.3.2 Initializing an array during declaration

```text
Instead of initializing an each element of an array separately, you can declare and initialize an array by specifying the list of elements (separated by white space) with in a curly braces.

Syntax:
declare -a arrayname=(element1 element2 element3)
If the elements has the white space character, enclose it with in a quotes.

#! /bin/bash
$cat arraymanip.sh
declare -a Unix=('Debian' 'Red hat' 'Red hat' 'Suse' 'Fedora');
declare -a declares an array and all the elements in the parentheses are the elements of an array.
```

### 4.3.3 Print the Whole Bash Array

```text
There are different ways to print the whole elements of the array. If the index number is @ or *, all members of an array are referenced. You can traverse through the array elements and print it, using looping statements in bash.

echo ${Unix[@]}

# Add the above echo statement into the arraymanip.sh
#./t.sh
Debian Red hat Ubuntu Suse
Referring to the content of a member variable of an array without providing an index number is the same as referring to the content of the first element, the one referenced with index number zero.
```

### 4.3.4 Length of the Bash Array

```text
We can get the length of an array using the special parameter called $#.

${#arrayname[@]} gives you the length of the array.

$ cat arraymanip.sh
declare -a Unix=('Debian' 'Red hat' 'Suse' 'Fedora');
echo ${#Unix[@]} #Number of elements in the array
echo ${#Unix}  #Number of characters in the first element of the array.i.e Debian
$./arraymanip.sh
4
6
```

### 4.3.5 Length of the nth Element in an Array

```text
${#arrayname[n]} should give the length of the nth element in an array.

$cat arraymanip.sh
#! /bin/bash

Unix[0]='Debian'
Unix[1]='Red hat'
Unix[2]='Ubuntu'
Unix[3]='Suse'

echo ${#Unix[3]} # length of the element located at index 3 i.e Suse

$./arraymanip.sh
4
```

### 4.3.6 Extraction by offset and length for an array

```text
The following example shows the way to extract 2 elements starting from the position 3 from an array called Unix.

$cat arraymanip.sh
Unix=('Debian' 'Red hat' 'Ubuntu' 'Suse' 'Fedora' 'UTS' 'OpenLinux');
echo ${Unix[@]:3:2}

$./arraymanip.sh
Suse Fedora
The above example returns the elements in the 3rd index and fourth index. Index always starts with zero.
```

### 4.3.7 Extraction with offset and length, for a particular element of an array

```text
To extract only first four elements from an array element . For example, Ubuntu which is located at the second index of an array, you can use offset and length for a particular element of an array.

$cat arraymanip.sh
#! /bin/bash

Unix=('Debian' 'Red hat' 'Ubuntu' 'Suse' 'Fedora' 'UTS' 'OpenLinux');
echo ${Unix[2]:0:4}

./arraymanip.sh
Ubun
The above example extracts the first four characters from the 2nd indexed element of an array.
```

### 4.3.8 Search and Replace in an array elements

```text
The following example, searches for Ubuntu in an array elements, and replace the same with the word ‘SCO Unix’.

$cat arraymanip.sh
#!/bin/bash
Unix=('Debian' 'Red hat' 'Ubuntu' 'Suse' 'Fedora' 'UTS' 'OpenLinux');

echo ${Unix[@]/Ubuntu/SCO Unix}

$./arraymanip.sh
Debian Red hat SCO Unix Suse Fedora UTS OpenLinux
In this example, it replaces the element in the 2nd index ‘Ubuntu’ with ‘SCO Unix’. But this example will not permanently replace the array content.
```

### 4.3.9 Add an element to an existing Bash Array

```text
The following example shows the way to add an element to the existing array.

$cat arraymanip.sh
Unix=('Debian' 'Red hat' 'Ubuntu' 'Suse' 'Fedora' 'UTS' 'OpenLinux');
Unix=("${Unix[@]}" "AIX" "HP-UX")
echo ${Unix[7]}

$./arraymanip.sh
AIX
In the array called Unix, the elements ‘AIX’ and ‘HP-UX’ are added in 7th and 8th index respectively.
```

### 4.3.10 Remove an Element from an Array

```text
unset is used to remove an element from an array.unset will have the same effect as assigning null to an element.

$cat arraymanip.sh
#!/bin/bash
Unix=('Debian' 'Red hat' 'Ubuntu' 'Suse' 'Fedora' 'UTS' 'OpenLinux');

unset Unix[3]
echo ${Unix[3]}
The above script will just print null which is the value available in the 3rd index. The following example shows one of the way to remove an element completely from an array.

$ cat arraymanip.sh
Unix=('Debian' 'Red hat' 'Ubuntu' 'Suse' 'Fedora' 'UTS' 'OpenLinux');
pos=3
Unix=(${Unix[@]:0:$pos} ${Unix[@]:$(($pos + 1))})
echo ${Unix[@]}

$./arraymanip.sh
Debian Red hat Ubuntu Fedora UTS OpenLinux
In this example, ${Unix[@]:0:$pos} will give you 3 elements starting from 0th index i.e 0,1,2 and ${Unix[@]:4} will give the elements from 4th index to the last index. And merge both the above output. This is one of the workaround to remove an element from an array.
```

### 4.3.11 Remove Bash Array Elements using Patterns

```text
In the search condition you can give the patterns, and stores the remaining element to an another array as shown below.

$ cat arraymanip.sh
#!/bin/bash
declare -a Unix=('Debian' 'Red hat' 'Ubuntu' 'Suse' 'Fedora');
declare -a patter=( ${Unix[@]/Red*/} )
echo ${patter[@]}

$ ./arraymanip.sh
Debian Ubuntu Suse Fedora
The above example removes the elements which has the patter Red*.
```

### 4.3.12 Copying an Array

```text
Expand the array elements and store that into a new array as shown below.

#!/bin/bash
Unix=('Debian' 'Red hat' 'Ubuntu' 'Suse' 'Fedora' 'UTS' 'OpenLinux');
Linux=("${Unix[@]}")
echo ${Linux[@]}

$ ./arraymanip.sh
Debian Red hat Ubuntu Fedora UTS OpenLinux
```

### 4.3.13 Concatenation of two Bash Arrays

```text
Expand the elements of the two arrays and assign it to the new array.

$cat arraymanip.sh
#!/bin/bash
Unix=('Debian' 'Red hat' 'Ubuntu' 'Suse' 'Fedora' 'UTS' 'OpenLinux');
Shell=('bash' 'csh' 'jsh' 'rsh' 'ksh' 'rc' 'tcsh');

UnixShell=("${Unix[@]}" "${Shell[@]}")
echo ${UnixShell[@]}
echo ${#UnixShell[@]}

$ ./arraymanip.sh
Debian Red hat Ubuntu Suse Fedora UTS OpenLinux bash csh jsh rsh ksh rc tcsh
14
It prints the array which has the elements of the both the array ‘Unix’ and ‘Shell’, and number of elements of the new array is 14.
```

### 4.3.14 Deleting an Entire Array

```text
unset is used to delete an entire array.

$cat arraymanip.sh
#!/bin/bash
Unix=('Debian' 'Red hat' 'Ubuntu' 'Suse' 'Fedora' 'UTS' 'OpenLinux');
Shell=('bash' 'csh' 'jsh' 'rsh' 'ksh' 'rc' 'tcsh');

UnixShell=("${Unix[@]}" "${Shell[@]}")
unset UnixShell
echo ${#UnixShell[@]}

$ ./arraymanip.sh
0
After unset an array, its length would be zero as shown above.
```

### 4.3.15 Load Content of a File into an Array

```text
You can load the content of the file line by line into an array.

#Example file
$ cat logfile
Welcome
to
thegeekstuff
Linux
Unix

$ cat loadcontent.sh
#!/bin/bash
filecontent=( `cat "logfile" `)

for t in "${filecontent[@]}"
do
echo $t
done
echo "Read file content!"

$ ./loadcontent.sh
Welcome
to
thegeekstuff
Linux
Unix
Read file content!
In the above example, each index of an array element has printed through for loop.
```

## 4.4 Merge two sorted array into third sorted

### 4.4.1 Snip: <internal-path>

```text
 mergesort()
 {
   #Assign arguments to array
   sArr1=("${!1}")
   sArr2=("${!2}")

   #Initialize index
   i=0
   j=0
   k=0

   #Calculate length
   m=${#sArr1[@]} #Array1 length
   n=${#sArr2[@]} #Array2 length

   #Merge sorted array
   while [[ "$i" -lt "$m" && "$j" -lt "$n" ]]
   do

     #Parse version
     sArr1Ver=`echo ${sArr1[i]} | awk -F'-' '{print $5}'`
     sArr2Ver=`echo ${sArr2[j]} | awk -F'-' '{print $7}'`

     if [ $sArr1Ver -lt $sArr2Ver ]; then
       out[k]=${sArr1[i]}
       let "i++"
       let "i++"
     elif [ $sArr1Ver -eq $sArr2Ver ]; then
       out[k]=${sArr1[i]}
       let "k++"
       out[k]=${sArr2[j]}
       let "i++"
       let "j++"
     else
       out[k]=${sArr2[j]}
       let "j++"
     fi
     let "k++"
    done

    if [ "$i" -ge "$m" ]; then
      while [ "$j" -lt "$n" ]
      do
        out[k]=${sArr2[j]}
        let "j++"
        let "k++"
      done
    fi

    if [ "$j" -ge "$n" ]; then
      while [ "$i" -lt "$m" ]
      do
        out[k]=${sArr1[i]}
        let "i++"
        let "k++"
      done
    fi

    echo "${out[@]}"
 }

---

     PATCHES=`ls --sort=version $DIR/installed/ | grep '^[0-9]' 2> /dev/null`
     POINTED_PATCHES=`ls --sort=version $DIR/installed | grep Pointed 2> /dev/null`

     if [[ ! -z "$POINTED_PATCHES" && ! -z "$PATCHES" ]]; then
       array1=( $PATCHES )
       array2=( $POINTED_PATCHES )
       PATCHLIST=`mergesort "array1[@]" "array2[@]"`
     else
       if [ ! -z "$POINTED_PATCHES" ]; then
         PATCHLIST="$POINTED_PATCHES"
       elif [ ! -z "$PATCHES" ]; then
         PATCHLIST="$PATCHES"
       else
         log 0 "$PATCHNAME is not installed"
         echo "$PATCHNAME No patch installed."
         return
       fi
     fi

     if [ ! -z "$PATCHLIST" ]; then
       LATEST_PATCH_NAME=`echo $PATCHLIST | awk '{ print $NF }' 2> /dev/null`
       if [ ! -z $LATEST_PATCH_NAME ]; then
         if [ "$PATCHNAME" != "$LATEST_PATCH_NAME" ]; then
           log 0 "$PATCHNAME is not the latest patch installed. Please remove the lastest patch $LATEST_PATCH_NAME and try again"
           echo "$PATCHNAME is not the latest patch installed. Please remove the lastest patch $LATEST_PATCH_NAME and try again"
           exit 1
         fi
       fi
     fi




		4.5
```
