---
type: reference
title: Group Highlighting. match and higlight groups of patterns.
description: Section 39 of the legacy KB_vi notes.
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#39"
---

# Group Highlighting. match and higlight groups of patterns.

[↑ KB_vi](/vi/kb-vi/README.md)

```text
	:h match

	Used to highliht intersting patterns.
```

## 39.1 Usage

```text
	match group /pattern/
	And 2nd and 3rd matches can be defined as well:

	2match group /pattern/  
	3match group /pattern/

	stop matching:
	:match NONE
```

## 39.2 Color groups

```text
		To get a list of defined color groups:
		:so $VIMRUNTIME/syntax/hitest.vim

-> my example on mac terminal vim
:highlight MyGroup ctermbg=red guibg=red
:match MyGroup /"msg":.*}/

->
		To define a new group:
		:highlight MyGroup ctermbg=red guibg=red gctermfg=yellow
guifg=yellow term=bold

	ctermbg : Background color in console
	guibg : Background color in Gvim
	ctermfg : Text color in console
	guifg : Text color in Gvim
	gui : Font formatting in Gvim
	term : Font formatting in console (for example, bold)
```

## 39.3 examples:

```text
		For context files, highlight the ToDo list,
		:match ToDo /^\s\+-\+>.*$/

		For log file, match errors:
		:match ErrorMsg /^Error/

		match single lines XML tags in ACS configuration:
		:match SpellCap /<\/\?\(\w\+\.\?\)\+>/

		Make the KB file look nicer:
		:match StatusLine /^\s*\d\+\..*$/

		In mails, it is a common rule that you do not write lines more than 74 characters
long (a rule that also applies to some older programming languages like for example
Fortran-77). In a case like this, it would be nice if Vim could warn you when you
reached this specific number of characters.
This can simply be done with the following command:
:match ErrorMsg /\%>73v.\+/
Here, every character after the 73rd character will be marked as an error. This match
is a regular expression that when broken down consists of:
\%> : Match after column with the number right after this
73 : The column number
V : Combined with the previous command, this means that the next part is very
magic. See :help magic for more info.
.\+ : Match one or more of any character.

When coding, it is generally a good rule of thumb that tabs are only to be used to
indent code, and not anywhere else. However, for some it can be hard to obey this
rule. Now, with the help of a simple match command this can easily be prevented.
The following command will mark any tabs that are not at the beginning of the line
(indentation) as an error:
:match errorMsg /[^\t]\zs\t\+/
Now you can check if you have forgotten the rule and used the tab key inside the
code. Broken down, the match consists of the following parts:
[^ : Begin a group of characters that should not be matched
\t : The tab-character
] : End of character group.
\zs : A zero-width match that places the 'matching' at the beginning of the line
ignoring any whitespaces
\t\+ : One or more tabs in a row.
This command says: don't match all the tab-characters, match only the ones that are
not used at the beginning of the line (ignoring any whitespaces around it).
If instead of using tabs if you want to use the space character for indentation, then
you can change the command to:
:match errorMsg /[\t]/
This command just says: match all the tab-characters.
```
