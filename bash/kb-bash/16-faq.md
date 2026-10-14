---
type: reference
title: FAQ
description: "Bash FAQ: trimming whitespace from variables and related questions."
tags: [bash, faq, shell, legacy, tips]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "bash/KB_bash#16"
---

# FAQ

[↑ KB_bash](/bash/kb-bash/README.md)

## 16.1 How to trim whitespace from bash variable?

```text
		16.1.1  I needed to trim whitespace from a script when the IFS variable was set to something else. Relying on perl did the trick:

# trim() { echo $1; } # doesn't seem to work, as it's affected by IFS

trim() { echo "$1" | perl -p -e 's/^\s+|\s+$//g'; }

strings="after --> , <-- before,  <-- both -->  "

OLD_IFS=$IFS
IFS=","
for str in ${strings}; do
  str=$(trim "${str}")
  echo "str= '${str}'"
done
IFS=$OLD_IFS


		16.1.2 assignments ignore leading and trailing whitespace and as such can be used to trim

$ var=`echo '   hello'`; echo $var
hello

		16.1.3 You can use old-school tr. For example, this returns the number of modified files in a git repository, whitespaces stripped.

MYVAR=`git ls-files -m|wc -l|tr -d ' '`
```

### 16.1.4 This will remove all spaces ...

```text
echo " test test test " | tr -d ' '
so this results in

testtesttest
This will remove trailing spaces...

echo " test test test " | sed 's/ *$//g'
which results in

 test test test
This will remove leading spaces...

echo " test test test " | sed 's/^ *//g'
which results in

test test test
```

### 16.1.5 # "Remove leading & trailing whitespace from a Bash variable",

```text
# http://codesnippets.joyent.com/posts/show/1816

var="    abc    "
var="${var#"${var%%[![:space:]]*}"}"   # remove leading whitespace characters
var="${var%"${var##*[![:space:]]}"}"   # remove trailing whitespace characters
echo "$var"
```

### 16.1.6 how to read a file line by line

```text
http://en.kioskea.net/faq/1757-how-to-read-a-file-line-by-line
This article introduces the concept of playing a file line by line in Linux with the help of examples and tips along with a guided tour of initiating a loop. The article discusses the errors committed while reading a file line by line on the Linux platform. With samples and illustrations, it shows how the 'for loop' and 'while loop' differ in their respective outputs. It also provides tips on how to use the while loop and depicts its syntax. It concludes with the process behind initiating a loop along with the side effects the while loops can exhibit.

One of the most common errors when using scripts bash on GNU / Linux is to read a file line by line by using a for loop (for line in $ (cat file.txt) do. ..), which in this example leads to an assessment for each line and not every word of the file.
It is possible to change the value of the variable $ IFS (Internal Field Separator, internal field separator) with a for loop before starting the loop.

Sample output with a for loop:
for line in $ (cat file.txt) do echo "$ line" done

This           
is                
row           
No           
1           
This           
is                 
row           
No           
2           
This           
[...]           


The solution is to use a while loop coupled with the internal read.

It is possible to get the result with a for loop provided to change the value of the variable $ IFS (Internal Field Separator, internal field separator) before starting the loop.

While loop

The while loop remains the most appropriate and easiest way to read a file line by line.
Syntax

while read line           
do           
    command           
done <file 


Example
The starting file:

This is line 1     

    This is line 2
    This is line 3
    This is line 4
    This is line 5 



The instructions in the command line:

while read line; do echo -e "$line\n"; done < file.txt



or in a "bash" script:

#! / bin / bash           

while read line           
do           
    echo-e "$ line \ n"           
done <file.txt           

The output on the screen (stdout):           
This is line 1        

This is line 2        

This is line 3           

This is line 4           

This is line 5   


Tips
It is entirely possible from a structured file (like an address book or /etc/passwd, for example), to retrieve the values of each field and assign them to several variables with the command 'read'. Be careful to properly assign the IFS variable with good field separators (space by default).

Example:

#! /bin/bash          

while IFS=: read user pass uid gid full home shell          
do          
echo -e "$full :\n\          
 Pseudo : $user\n\          
 UID :\t $uid\n\          
 GID :\t $gid\n\          
 Home :\t $home\n\          
 Shell :\t $shell\n\n"          
done < /etc/passwd


Bonus

while read i; do echo -e "Parameter : $i"; done < <(echo -e "a\nab\nc")


Initiate a Loop
Although the while loop is the easiest method, it has its side effects. It obliterates the formatting of lines including spaces and tabs.

    Moreover, the for loop coupled with a change of IFS helps keep the structure of the document output. 



Syntax

old_IFS=$IFS      # save the field separator           
IFS=$'\n'     # new field separator, the end of line           
for line in $(cat fichier)          
do          
   command          
done          
IFS=$old_IFS     # restore default field separator 

		16.1.7
```

## 16.2 Match comment lines in file, regexp match example

```text
snippet:
if [[ "#aaa" =~ ^#[:alnum:]+ ]] ; then echo xxx; else echo yyy; fi
xxx
$ if [[ "#aaa" =~ ^[:alnum:]+ ]] ; then echo xxx; else echo yyy; fi
yyy

file read loop:
```

## 16.3 Edit file from bash script

### 16.3.1 perl

```text
File manipulation isn't normally done by Bash, but by programs invoked by Bash, e.g.:

> perl -pi -e 's/abc/XYZ/g' /tmp/file.txt
The -i flag tells it do do in-place replacement.

See man perlrun for more details, including how to take a backup file of the original.
```

### 16.3.2 Sed

```text
The easiest way is to use sed (or perl):

sed -ie 's/abc/XYZ/g' /tmp/file.txt

Which will invoke sed to do an inplace edit. This can be called from bash.

If you really really want to use just bash, then the following can work:
```

### 16.3.3 pure bash

```text
while read a ; do echo ${a//abc/XYZ} ; done < /tmp/file.txt > /tmp/file.txt.t ; mv /tmp/file.txt{.t,}

This loops over each line, doing a substitution, and writing to a temporary file (don't want to clobber the input). The move at the end just moves temporary to the original name.
```

### 16.3.4 ex

```text
Bash, like other shells, is just a tool for coordinating other commands. Typically you would try to use standard UNIX commands, but you can of course use Bash to invoke anything, including your own compiled programs, other shell scripts, Python and Perl scripts etc.

In this case, there are a couple of ways to do it.

If you want to read a file, and write it to another file, doing search/replace as you go, use sed:

sed 's/abc/XYZ/g' <infile >outfile
If you want to edit the file in place (as if opening the file in an editor, editing it, then saving it) supply instructions to the line editor 'ex'

echo "%s/abc/XYZ/g
w
q
" | ex file
Ex is like vi without the fullscreen mode. You can give it the same commands you would at vi's ':' prompt.
```

### 16.3.5 ed

```text
		# delete all lines matching foobar 
ed -s test.txt <<< $'g/foobar/d\nw'


		16.3.6
```

## 16.4 Quoting

### 16.4.1 execute commands bash script quoting problem

```text
Ex:

                         echo "sed directive: sed -ie 's/$ftype[ \t]$perc[ \t]$size/$ftype $perc $Q_SIZE/' ${DISK_QUOTAS_CFG_FILE}"
                         sed -ie 's/$ftype[ \t]$perc[ \t]$size/$ftype $perc $Q_SIZE/' ${DISK_QUOTAS_CFG_FILE}

Echo will look fine but command won't work due to shell giving semantic interpretation to some keywords chars.
use eval to assemble the command correctly:

                         eval "sed -ie 's/$ftype[ \t]$perc[ \t]$size/$ftype $perc $Q_SIZE/' ${DISK_QUOTAS_CFG_FILE}"

		16.4.2
```

## 16.5 How to define hash tables in bash?

```text
--> Bash 4 natively supports this feature. You declare an associative array by doing:

declare -A animals
You can fill it up with elements using the normal array assignment operator:

animals=( ["moo"]="cow" )
Or merge them:

declare -A animals=( ["moo"]="cow" )
Then use them just like normal arrays:

echo "${animals["moo"]}"
for sound in "${!animals[@]}"; do echo "$sound - ${animals["$sound"]}"; done
In bash 3, you don't have associative arrays. Do not use eval to emulate them. You must avoid eval like the plague, because it is the plague of shell scripting.

First and foremost: Consider upgrading to bash 4. Seriously. The future is now, stop living in the past and suffering from it by forcing stupid broken and ugly hacks on your code.

If you have some silly excuse why you "can't upgrade", declare is a far safer option. It does not evaluate data as bash code like eval does, and as such it does not allow arbitrary code injection quite so easily.

Let's prepare the answer by introducing the concepts:

First, indirection (seriously; never use this unless you're mentally ill or have some other bad excuse for writing hacks).

$ animals_moo=cow; sound=moo; i="animals_$sound"; echo "${!i}"
cow
Secondly, declare:

$ sound=moo; animal=cow; declare "animals_$sound=$animal"; echo "$animals_moo"
cow
Bring them together:

# Set a value:
declare "array_$index=$value"

# Get a value:
arrayGet() { 
    local array=$1 index=$2
    local i="${array}_$index"
    printf '%s' "${!i}"
}
Let's use it:

$ sound=moo
$ animal=cow
$ declare "animals_$sound=$animal"
$ arrayGet animals "$sound"
cow
Note: declare cannot be put in a function. Any use of declare inside a bash function turns the variable it creates local to the scope of that function, meaning we can't access or modify global arrays with it.

Once more. Upgrade to bash 4. If you can't, consider awk before doing ugly hacks as described above. And definitely stay the heck away from eval hackery.

--> #!/bin/bash

# Array pretending to be a Pythonic dictionary
ARRAY=( "cow:moo"
        "dinosaur:roar"
        "bird:chirp"
        "bash:rock" )

for animal in ${ARRAY[@]} ; do
    KEY=${animal%%:*}
    VALUE=${animal##*:}
    printf "%s likes to %s.\n" $KEY $VALUE
done

echo -e "${ARRAY[1]%%:*} is an extinct animal which likes to ${ARRAY[1]##*:}\n"
The BASH 4 way is better of course, but if you need a hack ...only a hack will do. You could search the array/hash with similar techniques.

--> use awk

--> Use this trick in bash < 4
hput () {
  eval hash"$1"='$2'
}

hget () {
  eval echo '${hash'"$1"'#hash}'
}
hput France Paris
hput Netherlands Amsterdam
hput Spain Madrid
echo `hget France` and `hget Netherlands` and `hget Spain`
$ sh hash.sh
Paris and Amsterdam and Madrid

This uses the shells environment variable hash table :)

--> 
```

## 16.6 Tokenizing a string, split a string

### 16.6.1 Bash: How to tokenize a string variable?

```text
-> Use the shell's automatic tokenization of unquoted variables:

$ string="john is 17 years old"
$ for word in $string; do echo "$word"; done
john
is
17
years
old
If you want to change the delimiter you can set the $IFS variable, which stands for internal field separator. The default value of $IFS is " \t\n" (space, tab, newline).

$ string="john_is_17_years_old"
$ (IFS='_'; for word in $string; do echo "$word"; done)
john
is
17
years
old
(Note that in this second example I added parentheses around the second line. This creates a sub-shell so that the change to $IFS doesn't persist. You generally don't want to permanently change $IFS as it can wreak havoc on unsuspecting shell commands.)

-> $ string="john is 17 years old"
$ tokens=( $string )
$ echo ${tokens[*]} 

-> you can try something like this :

#!/bin/bash
n=0
a=/home/file.txt
for i in `cat ${a} | tr ' ' '\n'` ; do
   str=${str},${i}
   let n=$n+1
   var=`echo "var${n}"`
   echo $var is ... ${i}
done

-> $ string="john is 17 years old"
$ set -- $string
$ echo $1
john
$ echo $2
is
$ echo $3
17

-> 
```

### 16.6.2 Split a string on newlines (bash)

```text
-> old=$IFS
IFS='
'
array=`cat Submissions`
for ...
    ...
done
IFS=$old

-> Do your really need to store it in an array?
If not, you can do it faster and saving some memory:
Code:
#!/bin/bash

while read subid ; do
   x=`db2 "select count(*) from table where uniquekey='$subid'"
   if [ "x" == "0" ]; then
        echo "No submissions here!"
   elif [ "x" == SQL* ]; then
        echo "Fix your SQL, silly."
   fi
done <Submissions

the read command stores input in a variable until the enter or return key is pressed
so here the read command store input from file Submissions (<Submissions) and
stop to store in subid variable each time it reads a end of line (as a return or enter key)

Basically the code posted by hko should use less memory as it doesn't store all the 
Submission lines before work with it, instead it stores line per line in memory

Note, this uses less memory and works on one line at a time
It seems risky to use on a file that is R/W at the same time.

-> My example:
echo "$IFS" | cat -vte
 ^I$
$
# !572
OIFS=$IFS; IFS='
';
# !535
echo "$IFS" | cat -vte
$
$
# !574; !575
Note, the difference between quoting ("") and not. Shell will tokenize according to IFS when not quoting!

for l in "${D_ARR[@]}"; do echo ">>> $l"; done; for l in ${D_ARR[@]}; do echo ">>> $l"; done
>>> #File type, The limit ( of disk size) or Fix, The actual limit
ade-log Fix 50
monit-log       Fix 55
mgmt-audit-log 0.015 2
mgmt-log 0.281 39
apache-log      Fix 55
rt-log 0.281 39
rt-config-cache Fix 1000
rt-core Fix 2000
local-store 26.74 3723
acs-db  Fix 3000
acs-db-log      Fix 100
acs-db-err-log  Fix 100
view-log        Fix 155
view-db 42.23 5880
view-db-log     Fix 100
view-db-log     Fix 100
centrify-system Fix 50
ad-agent-log    Fix 55
backup 29.562 4116
backup-log      Fix 50
backup-log      Fix 50
backup-success-log      Fix 50
backup-success-log      Fix 50
patch   Fix 1000
upgrade-log     Fix 55
>>> #File type, The limit ( of disk size) or Fix, The actual limit
>>> ade-log     Fix 50
>>> monit-log   Fix 55
>>> mgmt-audit-log 0.015 2
>>> mgmt-log 0.281 39
>>> apache-log  Fix 55
>>> rt-log 0.281 39
>>> rt-config-cache     Fix 1000
>>> rt-core     Fix 2000
>>> local-store 26.74 3723
>>> acs-db      Fix 3000
>>> acs-db-log  Fix 100
>>> acs-db-err-log      Fix 100
>>> view-log    Fix 155
>>> view-db 42.23 5880
>>> view-db-log Fix 100
>>> view-db-log Fix 100
>>> centrify-system     Fix 50
>>> ad-agent-log        Fix 55
>>> backup 29.562 4116
>>> backup-log  Fix 50
>>> backup-log  Fix 50
>>> backup-success-log  Fix 50
>>> backup-success-log  Fix 50
>>> patch       Fix 1000
>>> upgrade-log Fix 55

# !576
IFS=$OIFS
# echo "$IFS" | cat -vte
 ^I$
$

		16.6.3
```

## 16.7 How do I prompt a user for confirmation in bash script?

```text
yes no prompt bash


read -p "Are you sure? " -n 1 -r
if [[ $REPLY =~ ^[Yy]$ ]]
then
    # do dangerous stuff
fi

or
use case/esac.

read -p "Continue (y/n)?" choice
case "$choice" in 
  y|Y ) echo "yes";;
  n|N ) echo "no";;
  * ) echo "invalid";;
esac
advantage:

1) neater,
2) can use "OR" condition easier
3) can use character range, eg [yY][Es][Ss]
```

## 16.8 redirect stderr to stdout

```text
# service --status-all 2>&1 | grep named
```

## 16.9 Extract directory path from file name

```text
        In Bash, if VAR="/home/me/mydir/file.c", how do I get "/home/me/mydir"?
dirname and basename are the tools you're looking for for extracting path components:
$ VAR=/home/me/mydir/file.c
$ DIR=$(dirname "${VAR}")
$ echo "${DIR}"
/home/me/mydir
$ basename "${VAR}"
file.c
They're not internal Bash commands but they're part of the POSIX standard (see dirname, basename) and so should be available on the vast majority of systems that will be running Bash.


$ export VAR=/home/me/mydir/file.c
$ export DIR=${VAR%/*}
$ echo "${DIR}"
/home/me/mydir
$ echo "${VAR##*/}"
file.c


On a related note, if you only have the filename or relative path, dirname on its own won't help. For me, the answer ended up being readlink.
fname='txtfile'
echo $(dirname "$fname") # output: .
echo $(readlink -f "$fname") # output: /home/me/work/txtfile
You can then combine the two to get just the directory.
echo $(dirname $(readlink -f "$fname")) # output: /home/me/work

	16.10
```
