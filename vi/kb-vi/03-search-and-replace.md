---
type: reference
title: search and replace.
description: Section 3 of the legacy KB_vi notes.
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#3"
---

# search and replace.

[↑ KB_vi](/vi/kb-vi/README.md)

## 3.1 basics

```text
	Using the "*" key searches for the pattern under the cursor, use "#" to do the same thing backwards.
	Using the "g*" key searches for the word under the cursor, use "g#" to do the same thing backwards.
```

## 3.2 advanced

```text
	 most important is global replace:
        :%s/up/right/g

        and with confirmation
        :%s/up/right/gc

	and reg exp search/replace.
	first do
	:set magic
 	to allow regexp
	then search and/or replace with regexps. example:
	/^yo.i  	
	to search for yosi yoki yori etc.

	or 
	:%s/ */ /g
	replace one or more spaces with one space.

	step by step:
```

## 3.1 simple (current line)

```text
	:s/old/new
```

## 3.2 replace in range of lines

```text
	:1,10s/old/new/
```

## 3.3 . for current line and $ for last:

```text
	 To search and replace from the first line through the current line use the command:

	 :1,.s/up/right/ 

         To search and replace from the current line through the last line use the command:

	 :.,$s/up/right/ 
```

## 3.4 replace for the whole file scope.

```text
	To search the whole file, use the shorthand for first line and last line to create a command that processes the full file being edited and executes the search and replace.

	 :1,$s/up/right/ 
	
	And since it so common, there's a shortcut:
	:%s/up/right/
```

## 3.5 spatial replace

```text
The beginning or ending line for a range may be given as a positive or negative number of lines offset from the current line. To execute a search and replace on the current line and the next five lines use:

 :.,+5s/up/right/ 

To execute a search and replace from five lines above the current line through the current line use:

 :-5,.s/up/right/ 
 <Right>

To execute a search and replace from five lines above the current line through five lines below the current line use:

 :-5,+5s/up/right/ 

The range of lines must be from lowest to highest. The following command is illegal as the first address is five lines beyond the current line, and the second address is the current line.

 :+5,.s/up/right/ 
```

## 3.6 global replace

```text
	:%s/up/right/g

	and with confirmation
	:%s/up/right/gc
```

## 3.7 advanced replaces

```text
	There is another form of line addressing called global addressing. It is similar to the % (all lines) address, but allows you to limit the search and replace action by specifying certain text that must appear in a line before the search and replace action is applied to it. An example is show below. The syntax shown below would read "for all lines containing `some text', search for `search text' and replace any instances with `replacement text.'"

:g/some text/s/search text/replacement text/

In effect, you are requesting that two strings must be found in a line, but only one of them is to be replaced. This is probably easier to understand with an example. In Listing 6 a file of addresses contains a consistent error. Maryland zip codes have been incorrectly entered as 91042 when they should be 01042. In the sample listing, the address on the last line contains the correct zip. In this example we also make the assumption that the file is too large to edit by hand.

The first apparent solution is to globally search for all instances of 91042 and replace them with 01042. However, there are several California addresses using a correct zip code of 91042. A search and replace that replaced all instances 1042 would now result in California addresses that contain incorrect zip codes of 01042.

Listing 6

Mr. A    CA     91042
Miss B   MD     91042
Mr. C    CA     91042
Mrs. D   MD     91042
(other addresses)
Mr. X    CA     91042
Mrs. Y   MD     91042

Instead, what is needed is a method of running the search and replace for the whole file, but within the whole file, only on lines containing MD as the state.

The following command will search all lines in the file for any line containing MD. When such a line is found, it will apply the substitution rule of changing searching for 91042 and changing any instances found to 01042. The command is also given a final g option, so the search and replace will be done for all occurrences of 91042 in each line.

:g/MD/s/91042/01042/g

Substitutions only occur on the Maryland lines as in Listing 7.

Listing 7

Mr. A    CA     91042
Miss B   MD     01042
Mr. C    CA     91042
Mrs. D   MD     01042
(other addresses)
Mr. X    CA     91042
Mrs. Y   MD     01042

The limiting text criteria in a global command can also be inverted. An inverted criteria limits the search to all lines that do not contain a certain string. The inverted global command starts with :g! or :v as in the following two commands which do the same thing. They both search all lines for lines that do not contain "CA" and then substitute 01042 for 91042.

:g!/CA/s/91042/01042/g
:v/CA/s/91042/01042/g

Substitutions only occur on the lines that do not contain CA resulting in Listing 8. This is the same result as Listing 7 but arrived at from the opposite direction.

Listing 8

Mr. A    CA     91042
Miss B   MD     01042
Mr. C    CA     91042
Mrs. D   MD     01042
(other addresses)
Mr. X    CA     91042
Mrs. Y   MD     01042

There is one version of the global command that is commonly used, but it requires some explanation. First let's go back to the original substitute command. In any substitute command, the search string can be left blank. When the search string is blank, the last search string that was used in a search command is used as a default to fill in the missing search string in the current command. The following commands search from the first line to current line replacing up with right, and then search from the current line to the end of the file replacing up with left. In the second command, "up" is not entered, but defaults to the search value in the first command.

:1,.s/up/right/g
:.,$s//left/g

When using a global command, the previous search text used in a search command is, in fact, the search text just used in the global part of the command. In the following command all lines of the file are searched for "up." For each line that is found, the substitute command uses the text it has just found -- which is "up" -- as the search text and then replaces it.

:g/up/s//right/g

Please note that the previous command and the following command both do the same thing in slightly different ways.

:%s/up/right/g

The global version of the command starting with :g searches all lines for the string "up." When a line is found, the substitute command is applied to that line. The substitute command has a blank search text, so substitute looks for the last search text that was used. The last search text is the "up" used in the global command so this is used as the text. The :%s version searches all lines for "up" and replaces the string when it is found. Both of the commands perform the common function of searching an entire file for a string and replacing it. Which version of the command you use is a matter of style although some will argue that the %s version is marginally faster.

One final note before we explore the rest of the options on the substitute command is the subject of the delimiter. Any character can be used as a delimiter although the forward slash has become the accepted standard character. The following commands all do the same thing.

:%s/up/right/g
:%s$up$right$g
:%s&up&right&g

The substitute command picks up the first character after the s and assumes that it is the delimiter and uses it through the rest of the command. The character used as a delimiter cannot then appear in the search text or the replacement text as it will be seen by the substitute command as a delimiter. You should use a different delimiter when you are actually doing a search that includes looking for the delimiter character. The following command replaces the forward slash with the word "per." It uses the at sign (@) as the delimiter since the slash is part of the search text.

:%s@/@ per @g
```

## 3.8 matching () or {}

```text
		$
```

## 3.9 search history

```text
	/ ctrl+F
```

## 3.10 Search and replace tip 31

```text
Tip 31 Previous Next Created: March 7, 2001 Complexity: basic Author: Anon Version: 5.7 

		3.10.1 Use the :substitute command to search for a text pattern, and replace it with a text string.

There are many options, but these are what you most probably want:

:%s/foo/bar/g
    Find each occurrence of 'foo', and replace it with 'bar'. 

:%s/foo/bar/gc
    Change each 'foo' to 'bar', but ask for confirmation first. 

:%s/\<foo\>/bar/gc
    Change only whole words exactly matching 'foo' to 'bar'; ask for confirmation. 

:%s/foo/bar/gci
    Change each 'foo' (case insensitive) to 'bar'; ask for confirmation. 

:%s/foo/bar/gcI
    Change each 'foo' (case sensitive) to 'bar'; ask for confirmation. 

The g flag means global  each occurrence in the line is changed, rather than just the first.
```

### 3.10.2 Search range:

```text
    The % in :%s applies the substitute to every line in the buffer, rather than just the current line. 
    :5,12s/foo/bar/g will change each 'foo' to 'bar' for all lines between line 5 and line 12. 
    :'a,'bs/foo/bar/g will change each 'foo' to 'bar' for all lines between marks a and b. 
    :.,$s/foo/bar/g will change each 'foo' to 'bar' for all lines between the current line (.) and the last line ($). 
    :.,+2s/foo/bar/g will change each 'foo' to 'bar' for the current line (.) and the two next lines (+2). 
    (Note that :%s is equivalent to :1,$s.) 
```

### 3.10.3 When searching:

```text
    \/ is / (use backslash + forward slash to search for forward slash) 
    \t is tab, \s is whitespace 
    \n is newline, \r is CR (carriage return = Ctrl-M = ^M) 
```

### 3.10.4 When replacing:

```text
    \r is newline, \n is a null byte (0x00). 
    \& is ampersand (& is the search pattern). 
```

### 3.10.5 You can use other delimiters with substitute:

```text
    :s#http://www.example.com/index.html#http://example.com/# 

This can be a very helpful technique, because you can avoid escaping a / character if you use something other than / for a delimiter, and some delimiters such as ; may be faster/easier to type.

		3.10.6 Save typing by using \zs and \ze to set the start and end of a pattern. 
		For example, instead of:

    :s/Copyright 2007 All Rights Reserved/Copyright 2008 All Rights Reserved/ 

You could try:

    :s/Copyright \zs2007\ze All Rights Reserved/2008/ 
```

### 3.10.7 Using registers

```text
:%s/foo/<c-r>a/g
    Substitute each 'foo' by the content of register 'a'. 
    <c-r>a means: Press Ctrl-R then A. The content of register 'a' will be immediately inserted. 

:%s/foo/\=@a/g
    Substitute each 'foo' by the content of register 'a'. 
    \=@a is a reference to register 'a'. The content of register 'a' will not be shown. This is useful if register 'a' contains many lines of text. 

:%s/<c-r>//bar/g
    Substitute the last search pattern (<c-r>/) by 'bar'. 
    Hint: If the substitute pattern is omitted, the last search pattern is used. See 'r' flag. 

:%s/<c-r>*/bar/g
    Substitute the visual selection (saved in the '*' register) by 'bar'. 

See Paste registers in search or colon commands instead of using the clipboard.
```

### 3.10.8 Special cases

```text
For substituting patterns with a corresponding case-sensitive text, Michael Geddes's keepcase plugin can be used, e.g.:

:%SubstituteCase/\cHello/goodBye/g
    Substitute 'Hello hello helLo HELLO' by 'Goodbye goodbye goodBye GOODBYE' 

For changing the offsets in a patch file (line number of a block), this little snippet can be used:

s/^@@ -\(\d\+\),\(\d\+\) +\(\d\+\),\(\d\+\) @@$/\="@@ -".eval(submatch(1)+offsetdiff).",".submatch(2)." +".eval(submatch(3)+offsetdiff).",".submatch(4)." @@"/g

Useful when we want to strip some blocks from a patch, without patch having to complain about offset differences.

NOTE ; Should try to make the expression more compact, but don't know how without having the possibility of modifying unwanted lines
```

## 3.11 Advanced Examples

### 3.11.1 Change tv[1] to tv_1

```text
In a C Source file,
there are a bunch of variables as

tv[1]
tv[2]
....
tv[234]


I want to replace them such that first '[' is replaced by '_' and
second one deleted. So file has replaced new names as

tv_1
tv_2
...
tv_234

can somebody help me with this?

%s/tv\[/tv_/g
replaces he first but how to distinguish the second from other similar
cases.
 
Solution 1:
%s/tv\[\(\d\+\)\]/tv_\1/g

Solution 2:
%s~tv\[\([^\]]*\)\]~tv_\1~g

which means replace "tv" followed by "[" followed by anything except a "]"
and save the content between "[" and "]" in \1 by tv_ and the saved
content in \1.
```

## 3.12 Vim search and replace, with increment

```text
:let i=1 | g/foo/s//\=i."morestuff"/ | let i=i+1

:let i=1 | g/^Q:/s__\=i.". Q:"_ | let i=i+1

	3.13 vim search for a pattern followed by another pattern and set cursor in second pattern location
```

### 3.13.1 https://stackoverflow.com/questions/66658895/vim-search-first-match-after-match-of-another-pattern

```text
The first way that came to mind (easy but not repeatable)
You can do something like this:

/Foo/;/bar
but the "last pattern" will be bar so this is not repeatable with n, N, etc. which means that you will have to do it once and then do /<Up><CR>, which may or may not satisfy your needs.

Note that, once you have jumped to the second match, you can do `` to jump back to the first one and `` to jump back to the second one, and so on.

See :help :; and :help ``.

The second way that came to mind (more complicated but repeatable)
With a single pattern, and thus repeatable with n, N, etc., you can do:

/Foo\_.\{-}\zsbar
where…

/Foo matches the next Foo,
\_.\{-} matches any character including EOL, as few as possible,
\zs starts the actual match, discarding what comes before,
which we want to be bar.
See :help \_., :help \{, and :help \zs.

	    3.13.2

	3.14
```
