---
type: reference
title: Summary
description: Summary from the week-of-unix-tools series covering GNU awk usage.
tags: [awk, unix, tutorial, legacy, tips]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "awk/kb_awk#11"
---

# Summary

[↑ kb_awk](/awk/kb-awk/README.md)

## 11.1 Intro This week-of-unix-tools

```text
	is intended to be a high concentration of information with little fluff. I'll be covering only GNU versions of the tools, for the sake of choosing only one version for sanity sake.
What is awk?
Hands-down, one of *the* most useful filter tools you'll find. Awk is a scripting language, but I find it is best used from the shell in oneliners.
Basic awk(1) usage
awk [-F<field_sep>] [awk_script]
Records and Fields
Awk has two data concepts that come from file input: Records and Fields.
A record is generally a whole line. The default input record separator (RS) is a newline. You can change this at any time.
A field is generally a word split by any number of whitespace (tab or space). The default input field separator (FS) is a single space. FS can be a single character or a regular expression. If FS is a single space, it is treated magically as if you had specified [ \t]+.
Field selection
Fields are accessed using the $ "operator". The following are valid:
$1, $2, $3 ...
(first, second and third fields)
$NF
The last field. Nothing special. NF is a variable holding the total number of fields in the current record, therefore $NF would be the last field
x=1; $(x + 3)
The 4th field. $(x + 3) == $(1 + 3) == $4
Patterns and functions
Awk expressions come in two forms, a function or a pattern. I've never bothered writing functions.
Here's what a pattern looks like: [condition_expressions] { [action_expressions] }
Basically this equates to the folloing psuedocode: if (condition_expressions) { action_expressions }
If no action_expression is defined, the default is 'print' which means 'print $0' which means printthe current record. If no condition is given, the default is to execute the action for all records.
Magic patterns: BEGIN and END
BEGIN and END are magic "conditions". BEGIN is used to execute things before the first record has been parsed, and END is obviously to do things after the last record. These patterns cannot be combined with others.
Sample pattern expressions
length($0) > 72 (From FreeBSD's awk manpage)
Print lines longer than 72 characters
$1 ~ /foo/ { print $2 }
Print the 2nd field of all records where the first field matches /foo/
$5 > 0
Print all records where the 5th field is greater than 0. (Complete with magical number conversion, when possible.
int($5) > 0
Same as above, but force $5 to int before comparing
Variables
Variables are the same syntax as in C. You do not declare variables.
Examples:
$2 == "test" { x++ }; END { print x }
Total records where $2 == "test"
{ $1 = ""; print }
Delete the first field of every record, print the new record
{ $3 = "Hello"; print }
Should be obvious. This one is *super* useful; modifying fields inline is awesome
Arrays
Arrays are magical. You simply start using a variable as an array, and it becomes an array. Arrays are more like dictionaries/hash tables/associative arrays than "real" arrays. Quite useful.
Example: awk '{ a[$1]++ } END { for (i in a) { print i, a[i] } }'
String concatonation
String appending is simple.
x = "foo"; x = x"test";    # x == "footest"

print $1","$2" = "$3;      # if input was "hello there world"
                           # output will be: "hello,there = world"
Example: Open files by user
This example is basically "add things up by a given key, then print them at the end". I use it so often I'm probably just going to write an alias for it in my shell.
% fstat | sed -e 1d \
  | awk '{a[$1]++} END { for (i in a) { print i, a[i] } }' \
  | sort -nk2
smmsp 8
_dhcp 11
www 45
root 328
jls 482
Example: Datestamp input
This particular example is *extremely* useful for long-running programs that output logs or other data without any kind of timestamp. This requires GNU awk.
% (echo hello; sleep 5; echo world) \
  | awk '{ print strftime("%Y/%m/%d %H:%M:%S", systime()), $0 }'
2007/05/22 01:09:47 hello
2007/05/22 01:09:52 world
Example: show non-empty files
% ls -l | awk '$5 > 0'
Example: Date-scan your logs
Let's assume all log entries are syslog format:
May 22 01:12:02 nightfall pptp[860]: anon log ...
Show only log entries between May 10th and May 20th (inclusive)
% cat *.log | awk '$1 == "May" && ($2 >= 10 && $2 <= 20)'
Example: Scrape host(1) output
% host www.google.com | awk '/has address/ { print $4 }'
Example: Find an environment variable
I often login to my workstation remotely and want to use its ssh-agent. So, I need to find the most common value for SSH_AUTH_SOCK on all processes.
% ps aexww \
  | awk '{ for (i = 0; i < NF; i++) { if ($i ~ /^SSH_AUTH_SOCK=/) { print $i } } }' \
  | sort | uniq -c
  24 SSH_AUTH_SOCK=/tmp/ssh-sc4iKR7ZIf/agent.721
Teeth that will bite you
Awk falls to the same problem C does. You can assign in conditions. Here's how you screw up:
% cat *.log | awk '$1 = "May"'
This will replace the first field with "May" for every record, and since "May" is a positive value, it will print your modified $0 with $1 set to "May" now. Ouch.

	11.2
12.
```
