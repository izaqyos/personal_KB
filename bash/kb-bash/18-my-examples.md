---
type: reference
title: My examples
description: Section 18 of the legacy KB_bash notes.
tags: [kb-bash]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "bash/KB_bash#18"
---

# My examples

[↑ KB_bash](/bash/kb-bash/README.md)

## 18.1 loop over words in string

```text
$ export T="jjj kkk l"
$ echo $T
jjj kkk l
$ for w in $T; do echo $w; done
jjj
kkk
l

- answers from http://stackoverflow.com/questions/1469849/how-to-split-one-string-into-multiple-strings-in-bash-shell

-- Just use the shells "set" built-in. For example,

set $text

After that, individual words in $text will be in $1, $2, $3, etc. For robustness, one usually does

set -- junk $text
shift

to handle the case where $text is empty or start with a dash. For example:

text="This is          a              test"
set -- junk $text
shift
for word; do
  echo "[$word]"
done

This prints

[This]
[is]
[a]
[test]

-- 
$ echo "This is   a sentence." | tr -s " " "\012"
This
is
a
sentence.

For checking for spaces, use grep:

$ echo "This is   a sentence." | grep " " > /dev/null
$ echo $?
0
$ echo "Thisisasentence." | grep " " > /dev/null     
$ echo $?
1

-- 
For checking spaces just with bash:

[[ "$str" = "${str% *}" ]] && echo "no spaces" || echo "has spaces"

-- 
 0 down vote
	

(A) To split a sentence into its words (space separated) you can simply use the default IFS by using

array=( $string )


Example running the following snippet

#!/bin/bash

sentence="this is the \"sentence\"   'you' want to split"
words=( $sentence )

len="${#words[@]}"
echo "words counted: $len"

printf "%s\n" "${words[@]}" ## print array

will output

words counted: 8
this
is
the
"sentence"
'you'
want
to
split

As you can see you can use single or double quotes too without any problem

Notes:
-- this is basically the same of mob's answer, but in this way you store the array for any further needing. If you only need a single loop, you can use his answer, which is one line shorter :)
-- please refer to this question for alternate methods to split a string based on delimiter.


(B) To check for a character in a string you can also use a regular expression match.
Example to check for the presence of a space character you can use:

regex='\s{1,}'
if [[ "$sentence" =~ $regex ]]
    then
        echo "Space here!";
fi


	18.2
```
