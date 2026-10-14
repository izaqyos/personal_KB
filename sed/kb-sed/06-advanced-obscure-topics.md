---
type: reference
title: "Advanced, Obscure topics"
description: Section 6 of the legacy KB_sed notes.
tags: [kb-sed]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "sed/KB_sed#6"
---

# Advanced, Obscure topics

[↑ KB_sed](/sed/kb-sed/README.md)

## 6.1 Edit (change, modify) file in place

```text
GNU sed includes several new features such as in-place editing of files (i.e., replace the original file with the result of applying the sed program). In-place editing is often used instead of ed scripts: for example,

sed -i 's/abc/def/' file

can be used instead of

ed file
1,$ s/abc/def/
w
q
```

## 6.2 Comment, uncomment sections

```text
I am faced with the following issue. I have a resolve.conf file made
of sections like

#Company IT nameservers
nameserver 1.2.3.4
nameserver 1.2.3.5
nameserver 1.2.3.6

#Lab1 nameservers
#nameserver 10.1.2.3
#nameserver 10.1.2.4

#Lab2 nameservers
#nameserver 20.1.2.2

I want to use sed to do to tasks.
a- comment out a given section (say section that starts with comment
#Company IT )
b- uncomment a given section (say section that starts with comment
#Lab1)


Solution:
| #!/bin/sh
|
|
| if [ "$1" = "-c" ]; then
|     COMMENT='yes';
|     shift;
| else
|     COMMENT='no';
| fi
|
| if [ "$COMMENT" = "yes" ]; then
|     sed -i "/$1/,/^$/s/^[^#]/#&/g" "$2"
| else
|     sed -i "/$1/,/^$/s/^#\+//g" "$2"
| fi

	
	
> Let me see if I got your script right. You tell sed to work on the
> range from "-c" to first blank line right?
> Then you instruct it to comment the lines that are not already in
> comment in that range (which in this case is also a  paragraph).
> It should work well so long as $1 is the first line in the paragraph.

No. Using -c will comment the selected paragraph (that is, from the
line that matches the pattern until the next blank line), without -c
it will uncomment the paragraph:

#v+
chrisbra t41:~/sed [1025]% cat resolv.conf
#Company IT nameservers
nameserver 1.2.3.4
nameserver 1.2.3.5
nameserver 1.2.3.6

Lab1 nameservers
nameserver 10.1.2.3
nameserver 10.1.2.4

#Lab2 nameservers
#nameserver 20.1.2.2

chrisbra t41:~/sed [1026]% ./resolv.sh  -c Lab1 resolv.conf; cat resolv.conf
#Company IT nameservers
nameserver 1.2.3.4
nameserver 1.2.3.5
nameserver 1.2.3.6

#Lab1 nameservers
#nameserver 10.1.2.3
#nameserver 10.1.2.4

#Lab2 nameservers
#nameserver 20.1.2.2

chrisbra t41:~/sed [1027]% ./resolv.sh  Lab2 resolv.conf; cat resolv.conf
#Company IT nameservers
nameserver 1.2.3.4
nameserver 1.2.3.5
nameserver 1.2.3.6

#Lab1 nameservers
#nameserver 10.1.2.3
#nameserver 10.1.2.4

Lab2 nameservers
nameserver 20.1.2.2
#v-

An even simpler approach would be something like letting sed toggle,
wherever the pattern matches, like this:

#v+
chrisbra t41:~/sed [1067]% cat resolv1.sh
#!/bin/sh

sed -i "
/$1/,/^$/{
s/^[^#]/#&/g;
t
s/^#\+//g;
}" "$2"
chrisbra t41:~/sed [1072]% cat resolv.conf
#Company IT nameservers
nameserver 1.2.3.4
nameserver 1.2.3.5
nameserver 1.2.3.6

#Lab1 nameservers
#nameserver 10.1.2.3
#nameserver 10.1.2.4

Lab2 nameservers
nameserver 20.1.2.2
chrisbra t41:~/sed [1073]% ./resolv1.sh Lab2 resolv.conf ; cat resolv.conf
#Company IT nameservers
nameserver 1.2.3.4
nameserver 1.2.3.5
nameserver 1.2.3.6

#Lab1 nameservers
#nameserver 10.1.2.3
#nameserver 10.1.2.4

#Lab2 nameservers
#nameserver 20.1.2.2
chrisbra t41:~/sed [1074]% ./resolv1.sh Lab2 resolv.conf ; cat resolv.conf
#Company IT nameservers
nameserver 1.2.3.4
nameserver 1.2.3.5
nameserver 1.2.3.6

#Lab1 nameservers
#nameserver 10.1.2.3
#nameserver 10.1.2.4

Lab2 nameservers
nameserver 20.1.2.2
chrisbra t41:~/sed [1074]%
#v-	
	
	6.3
7. FAQS

	7.1 Accessing external variable in AWK and SED 
$echo "unix scripting"
unix scripting

In SED:

This is a general substitution. I am trying to replace "unix" with "BASH", so "unix scripting" will become "BASH scripting"
$ echo "unix scripting" | sed 's/unix/BASH/'
BASH scripting

Suppose, the text "BASH" is assigned to a variable called "var", now if I try to replace "unix" with "$var" in sed single quote notation, its not going to work as SED can't expand external variable in single quotes.
$ var="BASH"; echo "unix scripting" | sed 's/unix/$var/'
$var scripting

Try the same above with double quotes, this will work.
$ var="BASH"; echo "unix scripting" | sed "s/unix/$var/"
BASH scripting

In AWK

General substitution of "unix" with "BASH", will work. "unix scripting" will become "BASH scripting"
$ echo "unix scripting" | awk '{gsub(/unix/,"BASH")}; 1'
BASH scripting

"BASH" is assigned in variable "var". So the following substitution is not going to work.
$ var="BASH"; echo "unix scripting" | awk '{gsub(/unix/,"$var")}; 1'
$var scripting

Method1: See the "'" (double quote-single quote-double quote) before and after the variable var.
$ var="BASH"; echo "unix scripting" | awk '{gsub(/unix/,"'"$var"'")}; 1'
BASH scripting

Method2: Use awk -v flag this way.
$ var="BASH"; echo "unix scripting" | awk -v v="$var" '{sub(/unix/,v)}1'
BASH scripting
	7.2 sed replace last line matching pattern
http://stackoverflow.com/questions/17114807/sed-replace-last-line-matching-pattern
Given a file like this:

a
b
a
b
I'd like to be able to use sed to replace just the last line with an instance of "a" in the file. So if I wanted to replace it with "c", then the output should look like:

a
b
c
b
Note that I need this to work irrespective of how many matches it might encounter
		7.2.1 tac file | sed '/a/ {s//c/; :loop; n; b loop}' | tac
Not quite sed only:

tac file | sed '/a/ {s//c/; :loop; n; b loop}' | tac
in pseudo-code, match line with "a", substitute "c" for it, then while true; print the current line and fetch the next line 
( From sed manual
: label
[No addresses allowed.]
Specify the location of label for branch commands. In all other respects, a no-op. 

b label
Unconditionally branch to label. The label may be omitted, in which case the next cycle is started. 
t label
Branch to label only if there has been a successful substitution since the last input line was read or conditional branch was taken. The label may be omitted, in which case the next cycle is started.
)

testing

% printf "%s\n" a b a b a b | tac | sed '/a/ {s//c/; :loop; n; b loop}' | tac
a
b
a
b
c
b
Reverse the file, then for the first match, make the substitution and the unconditionally slurp up the rest of the file. Then re-reverse the file.

Note, an empty regex (here as s//c/) means re-use the previous regex (/a/)

I'm not a huge sed fan, beyond very simple programs. I would use awk:

tac file | awk '/a/ && !seen {sub(/a/, "c"); seen=1} 1' | tac

		7.2.2
	7.3
8.
```
