---
type: reference
title: Working with tags.
description: Section 23 of the legacy KB_vi notes.
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#23"
---

# Working with tags.

[↑ KB_vi](/vi/kb-vi/README.md)

```text
	:h tags
```

## 23.1 set up tags. use ctags.

```text
		see section 19.1.1.
```

## 23.2 jump to tags.

```text
		either of
		ctrl-]
		^W} preview tag
		^W] split window and jump to tag
		:tselect [tag] (takes regexp args)
		:ptselect [tag] (takes regexp args), like the above but open a preview window and allows to 
		 move between previewed tags using commands:
			:tnext, move to next tag in list
			:tprev, move to previous tag in list

		:tag [tag] (takes regexp args)
		{Visual}CTRL-]
```

## 23.3 Tag Stack.

### 23.3.1 jump to previous tag ctrl-T

### 23.3.2 :[count]po[p][!] Jump to [count] older entry in tag stack (default 1).

```text
			:[count]ta[g][!]        Jump to [count] newer entry in tag stack (default 1).
		:tags show active tags
```

## 23.4 Tag generating tools.

```text
ctags			As found on most Unix systems.  Only supports C.  Only
			does the basic work.
							*Exuberant_ctags*
exuberant ctags		This a very good one.  It works for C, C++, Java,
			Fortran, Eiffel and others.  It can generate tags for
			many items.  See http://ctags.sourceforge.net.
etags			Connected to Emacs.  Supports many languages.
JTags			For Java, in Java.  It can be found at
			http://www.fleiner.com/jtags/.
ptags.py		For Python, in Python.  Found in your Python source
			directory at Tools/scripts/ptags.py.
ptags			For Perl, in Perl.  It can be found at
			http://www.eleves.ens.fr:8080/home/nthiery/Tags/.
gnatxref		For Ada.  See http://www.gnuada.org/.  gnatxref is
			part of the gnat package.
```

## 23.5 Browsing programs with tags

```text
From, http://vim.wikia.com/wiki/VimTip94
Created: August 3, 2001 Complexity: basic Author: Yegappan Lakshmanan

This Q&A gives an introduction to the various facilities available in Vim for using a tags file to browse through program source files. You can read the Vim online help, which explains in detail the tags support, using the ':help tagsearch.txt' command. You can also use the help keywords mentioned in this document to read more about a particular command or option. To read more about a particular command or option use, :help <helpkeyword> in Vim.
```

### 23.5.1 How do I create a tags file?

```text
You can create a tags file either using the ctags utility or using a custom script or utility.

Help keyword(s): tag

Where can I download the tools to generate the tags file?

There are several utilities available to generate the tags file. Depending on the programming language, you can use any one of them.

    * Exuberant ctags generates tags for the following programming language files: 

    Assembler, AWK, ASP, BETA, Bourne/Korn/Zsh Shell, C, C++, COBOL, Eiffel, Fortran, Java, Lisp, Make, Pascal, Perl, PHP, Python, REXX, Ruby, S-Lang, Scheme, Tcl, and Vim. 
    You can download exuberant ctags from

        http://ctags.sourceforge.net/ 

    * On Unix, you can use the /usr/bin/ctags utility. This utility is present in most of the Unix installations.
    * You can use jtags for generating tags file for java programs. You can download jtags from: http://www.fleiner.com/jtags/
    * You can use ptags for generating tags file for perl programs. You can download ptags from: http://www.eleves.ens.fr:8080/home/nthiery/Tags/
    * You can download scripts from the following links for generating tags file for verilog files:
          o http://www.probo.com/vtags.htm
          o http://www.cs.albany.edu/~mosh/Perl/veri-tags 
    * You can download Hdrtag from the following link: http://mysite.verizon.net/astronaut/vim/index.html. This utility generates tags file for the following programming languages: assembly, c/c++, header files, lex, yacc,LaTeX, vim, and Maple V.
    * pltags.pl - Create tags file for perl code
    * tcltags - Create tags file for TCL code
    * shtags.pl - Create tags file for shell script 

Help keyword(s): ctags

How do I generate a tags file using ctags?

You can generate a tags file for all the C files in the current directory using the following command:

$ ctags *.c

You can generate tags file for all the files in the current directory and all the sub-directories using (this applies only to exuberant ctags):

$ ctags -R .

You can generate tags file for all the files listed in a text file named flist using (this applies only to exuberant ctags)

$ ctags -L flist

For example, this is the command I use to generate CPP tag file:
alias gen_tags='echo generating cpp tags;ctags -R --c++-kinds=+p --fields=+iaS --extra=+q  --languages=c++  -f tags . ; sort -u -o tags tags'
For example, this is the command I use to generate Java tag file:
alias gen_java_tags='echo generating java tags;ctags -R --fields=+iaS --extra=+q  --languages=java  -f tags . ; sort -u -o tags tags'

Another example, generate tags for project using multiple programming languages
alias gen_tags='echo generating all languages tags;ctags -R --c++-kinds=+p --fields=+iaS --extra=+q  -f tags . ; sort -u -o tags tags'

last bit stores the tags in a central location, the symbolic link is created to that the relative paths to source files in tags db would work
alias update_tags_to_vim='echo updating tags to VIM path, make sure to manually create tags or run alias gen_tags before!;cp tags ~/.vim/tags/acs_5_2/;ln -s ~/.vim/tags/acs_5_2/tags tags'
```

### 23.5.2 How do I configure Vim to locate a tags file?

```text
You can set the 'tags' option in Vim to specify a particular tags file.

set tags=/my/dir/tags

Help keyword(s): 'tags', tags-option

How do I configure Vim to use multiple tags files?

The 'tags' option can specify more than one tags file. The tag filenames are separated using either comma or spaces.

set tags=/my/dir1/tags, /my/dir2/tags

How do I configure Vim to locate a tags file in a directory tree?

You can set the 'tags' option to make Vim search for the tags file in a directory tree. For example, if the 'tags' option is set like this:

set tags=tags;/

Vim will search for the file named 'tags', starting with the current directory and then going to the parent directory and then recursively to the directory one level above, till it either locates the 'tags' file or reaches the root '/' directory. Note that the above will work only in Vim 6.0 and above.

Help keyword(s): file-searching
```

### 23.5.3 How do I jump to a tag?

```text
There are several ways to jump to a tag location.

|   1. You can use the 'tag' ex command. For example, the command ':tag <tagname>' will jump to the tag named <tagname>.
|   2. You can position the cursor over a tag name and then press Ctrl-].
|   3. You can visually select a text and then press Ctrl-] to jump to the tag matching the selected text.
|   4. You can click on the tag name using the left mouse button, while pressing the <Ctrl> key.
|   5. You can press the g key and then click on the tag name using the left mouse button.
|   6. You can use the 'stag' ex command, to open the tag in a new window. For example, the command ':stag func1' will open the func1 definition in a new window.
|   7. You can position the cursor over a tag name and then press Ctrl-W ]. This will open the tag location in a new window. 

Help keyword(s): :tag, Ctrl-], v_CTRL_], <C-LeftMouse>, g<LeftMouse>, :stag, Ctrl-W_]
```

### 23.5.4 How do I come back from a tag jump?

```text
There are several ways to come back to the old location from a tag jump.

|   1. You can use the 'pop' ex command.
|   2. You can press Ctrl-t.
|   3. You can click the right mouse button, while pressing the <Ctrl> key.
|   4. You can press the g key and then click the right mouse button. 

Help keyword(s): :pop, Ctrl-T, <C-RightMouse>, g<RightMouse>
```

### 23.5.5 How do I jump again to a previously jumped tag location?

```text
You can use the 'tag' ex command to jump to a previously jumped tag location, which is stored in the tag stack. Help keyword(s): tag

How do I list the contents of the tag stack?

Vim remembers the location from which you jumped to a tag in the tag stack. You can list the current tag stack using the 'tags' ex command. Help keyword(s): :tags, tagstack

How do I jump to a particular tag match, if there are multiple matching tags?

In some situations, there can be more than one match for a tag. For example, a C function or definition may be present in more than one file in a source tree. There are several ways to jump to a specific tag from a list of matching tags.

|   1. You can use the 'tselect' ex command to list all the tag matches. For example, the command ':tselect func1' will list all the locations where func1 is defined. You can then enter the number of a tag match to jump to that location.
|   2. You can position the cursor over the tag name and press g] to get a list of matching tags.
|   3. You can visually select a text and press g] to get a list of matching tags.
|   4. You can use the 'stselect' ex command. This will open the selected tag from the tag list in a new window.
|   5. You can position the cursor over the tag name and press Ctrl-W g] to do a :stselect. 

Help keyword(s): tag-matchlist, :tselect, g], v_g], :stselect, Ctrl-W_g]

I want to jump to a tag, if there is only one matching tag, otherwise a list of matching tags should be displayed. How do I do this?

There are several ways to make Vim to jump to a tag directly, if there is only one tag match, otherwise present a list of tag matches.

|   1. You can use the 'tjump' ex command. For example, the command ':tjump func1' will jump to the definition func1, if it is defined only once. If func1 is defined multiple times, a list of matching tags will be presented.
|   2. You can position the cursor over the tag and press g Ctrl-].
|   3. You can visually select a text and press g Ctrl-] to jump or list the matching tags.
|   4. You can use the 'stjump' ex command. This will open the matching or selected tag from the tag list in a new window.
|   5. You can press Ctrl-W g Ctrl-] to do a :stjump. 

Help keyword(s): :tjump, g_Ctrl-], v_g_CTRL-], :stjump, Ctrl-W_g_Ctrl-]
```

### 23.5.6 How do browse through a list of multiple tag matches?

```text
If there are multiple tag matches, you can browse through all of them using several of the Vim ex commands.

|   1. To go to the first tag in the list, use the 'tfirst' or 'trewind' ex command.
|   2. To go to the last tag in the list, use the 'tlast' ex command.
|   3. To go to the next matching tag in the list, use the 'tnext' ex command.
|   4. To go to the previous matching tag in the list, use the 'tprevious' or 'tNext' ex command. 

Help keyword(s): :tfirst, :trewind, :tlast, :tnext, :tprevious, :tNext
```

### 23.5.7 How do I preview a tag?

```text
You can use the preview window to preview a tag, without leaving the original window. There are several ways to preview a tag:

|   1. You can use the 'ptag' ex command to open a tag in the preview window.
|   2. You can position the cursor on a tag name and press Ctrl-W } to open the tag in the preview window.
|   3. You can use the 'ptselect' ex command to do the equivalent of the 'tselect' ex command in the preview window.
|   4. You can use the 'ptjump' ex command to do the equivalent of the 'tjump' ex command in the preview window.
|   5. You can position the cursor on the tag and press Ctrl-W g} to do a :ptjump on the tag. 

Help keyword(s): :preview-window, :ptag, Ctrl-W_}, :ptselect, :ptjump, Ctrl-W_g}
```

### 23.5.8 How do I browse through the tag list in a preview window?

```text
If there are multiple tag matches, you can browse through all of them in the preview window using several of the Vim ex commands.

|   1. To go to the first tag in the list, use the 'ptfirst' or 'ptrewind' ex command.
|   2. To go to the last tag in the list, use the 'ptlast' ex command.
|   3. To go to the next matching tag in the list, use the 'ptnext' ex command.
|   4. To go to the previous matching tag in the list, use the 'ptprevious' or 'ptNext' ex command. 

Help keyword(s): :ptfirst, :ptrewind, :ptlast, :ptnext, :ptprevious, :ptNext

		  23.5.9 How do I start Vim to start editing a file at a given tag match?

While starting Vim, you can use the command line option '-t' to supply a tag name. Vim will directly jump to the supplied tag location.

Help keyword(s): -t
```

### 23.5.10 How do I list all the tags matching a search pattern?

```text
There are several ways to go through a list of all tags matching a pattern.

    * You can list all the tags matching a particular regular expression pattern by prepending the tag name with the '/' search character. For example, 

:tag /<pattern>
:stag /<pattern>
:ptag /<pattern>
:tselect /<pattern>
:tjump /<pattern>
:ptselect /<pattern>
:ptjump /<pattern>

    * If you have the 'wildmenu' option set, then you can press the <Tab> key to display a list of all the matching tags in the status bar. You can use the arrow keys to move between the tags and then use the <Enter> key to select a tag.
    * If you don't have the 'wildmenu' option set, you can still use the <Tab> key to browse through the list of matching tags. 

Help keyword(s): tag-regexp, wildmenu
```

### 23.5.11 What options are available to control how Vim handles the tags file?

```text
You can use the following options to control the handling of tags file by Vim:

|   1. 'tagrelative' - Controls how the file names in the tags file are treated. When on, the filenames are relative to the directory where the tags file is present.
|   2. 'taglength' - Controls the number of significant characters used for recognizing a tag.
|   3. 'tagbsearch' - Controls the method used to search the tags file for a tag. If this option is on, binary search is used to search the tags file. Otherwise, linear search is used.
|   4. 'tagstack' - Controls how the tag stack is used. 

Help keyword(s): 'tagrelative', 'taglength', 'tagbsearch', 'tagstack'

Is it possible to highlight all the tags in the current file?

Yes. Read the Vim online help on "tag-highlight".

Is it possible to create a menu with all the tags in the current file?

Yes. You can use the taglist plugin to display a list of tags defined in the current file in a menu. You can download this plugin from script#273.

		23.5.12 Is there a workaround to make the Ctrl-] key not to be treated as the telnet escape character?

The default escape characters for telnet in Unix systems is Ctrl-]. While using Vim in a telnet session, if you use Ctrl-] to jump to a tag, you will get the telnet prompt. There are two ways to avoid this problem:

|   1. Map the telnet escape character to some other character using the "-e <escape character>" telnet command line option
|   2. Disable the telnet escape character using the "-E" telnet command line option. 

Help keyword(s): telnet-CTRL-]
```

### 23.5.13 Ctags for unsupported languages

```text
Exuberant Ctags may not support a language such as IDL (Interactive Data Language). In some cases, you will be able to find a script to create the tags file. For IDL, a Perl script is available (so ctags is not required).

However, you can also configure ctags. IDL procedures and functions are supported by putting the following in your .ctags file:

--langdef=IDL
--langmap=IDL:.pro
--regex-IDL=/^pro[ \t]+([a-zA-Z0-9_:]+)/\1/p,procedure/i
--regex-IDL=/^function[ \t]+([a-zA-Z0-9_:]+)/\1/f,function/i

See Use Taglist with LaTeX files for another example that adds support for LaTeX.

Heres an excellent tutorial on using cscope with Vim ; right from installing to becoming an expert. http://cscope.sourceforge.net/cscope_vim_tutorial.html

Um, for some reason - I couldn't get recursive lookup of tags to work with just the

set tags=tags;/

line - changing it to

set tags=./tags;/

works just fine - the only time I've EVER come across the need to use the ./ thing...

    According to the help files, "When a tag file name starts with "./", the '.' is replaced with the path of the current file. This makes it possible to use a tags file in the directory where the current file is (no matter what the current directory is). The idea of using "./" is that you can define which tag file is searched first: In the current directory ("tags,./tags") or in the directory of the current file ("./tags,tags")." Thus, it would seem that your tags file is in the current directory of the file being edited (of course!) rather than in Vim's current working directory, which is apparently different. This is one of those times that setting your working directory to the current file might be a good idea! 

TagMenu has been moved to http://members.rogers.com/jayglanville/tagsmenu/

In Brazilian keyboards, CTRL-] is CTRL-Ç (CTRL + c-cedilla). I don't know why, since 'Ç' is located just to the right of 'L' (it's ';' in US keyboards), but it works.

When -R option is not available (on Solaris), use find to generate the list of files and give them as input to ctags using -L option.

To navigate with Alt+Left and Alt+Right with tags in Vim help or in source code I added the following mappings to my .vimrc:

map <M-Left> <C-T>
map <M-Right> <C-]>

As for C++, try to use ctags with "--extra=+q" to qualify member function/variable with it's class type.
```

### 23.5.14 Vim is nice to use with cscope and ctags, for this purpose

```text
|1. add to file .vimrc follow strings

:map [I :cs find c <C-r><C-w><CR>
:set csto=1

|2. before launch vim, generate:

ctags -R
cscope -R -b

A modified version of exuberant ctags with support for LaTeX and BibTeX tags can be found at http://www.unb.ca/fredericton/science/chem/ajit/vim.htm

A utility similar to taglist, but for hdrtag, is available at http://mysite.verizon.net/astronaut/vim/index.html#HdrtagList


    23.6 generate ctags for different Languages, tags: generate ctags for different Languages
reference: https://medium.com/adorableio/modern-javascript-ctags-configuration-199885dbcc1
chatgpt
$ cat ~/.ctags 
--exclude=node_modules
--exclude=gulp
--languages=-javascript
--langdef=js
--langmap=js:.js
--langmap=js:+.jsx
--regex-js=/[ \t.]([A-Z][A-Z0-9._$]+)[ \t]*[=:][ \t]*([0-9"'\[\{]|null)/\1/n,constant/
--regex-js=/\.([A-Za-z0-9._$]+)[ \t]*=[ \t]*\{/\1/o,object/
--regex-js=/['"]*([A-Za-z0-9_$]+)['"]*[ \t]*:[ \t]*\{/\1/o,object/
--regex-js=/([A-Za-z0-9._$]+)\[["']([A-Za-z0-9_$]+)["']\][ \t]*=[ \t]*\{/\1\.\2/o,object/
--regex-js=/([A-Za-z0-9._$]+)[ \t]*=[ \t]*\(function\(\)/\1/c,class/
--regex-js=/['"]*([A-Za-z0-9_$]+)['"]*:[ \t]*\(function\(\)/\1/c,class/
--regex-js=/class[ \t]+([A-Za-z0-9._$]+)[ \t]*/\1/c,class/
--regex-js=/([A-Za-z$][A-Za-z0-9_$()]+)[ \t]*=[ \t]*[Rr]eact.createClass[ \t]*\(/\1/c,class/
--regex-js=/([A-Z][A-Za-z0-9_$]+)[ \t]*=[ \t]*[A-Za-z0-9_$]*[ \t]*[{(]/\1/c,class/
--regex-js=/([A-Z][A-Za-z0-9_$]+)[ \t]*:[ \t]*[A-Za-z0-9_$]*[ \t]*[{(]/\1/c,class/
--regex-js=/([A-Za-z$][A-Za-z0-9_$]+)[ \t]*=[ \t]*function[ \t]*\(/\1/f,function/
--regex-js=/(function)*[ \t]*([A-Za-z$_][A-Za-z0-9_$]+)[ \t]*\([^)]*\)[ \t]*\{/\2/f,function/
--regex-js=/['"]*([A-Za-z$][A-Za-z0-9_$]+)['"]*:[ \t]*function[ \t]*\(/\1/m,method/
--regex-js=/([A-Za-z0-9_$]+)\[["']([A-Za-z0-9_$]+)["']\][ \t]*=[ \t]*function[ \t]*\(/\2/m,method/
--langdef=typescript
--langmap=typescript:.ts
--regex-typescript=/^[ \t]*(export)?[ \t]*class[ \t]+([a-zA-Z0-9_]+)/\2/c,classes/
--regex-typescript=/^[ \t]*(export)?[ \t]*module[ \t]+([a-zA-Z0-9_]+)/\2/n,modules/
--regex-typescript=/^[ \t]*(export)?[ \t]*function[ \t]+([a-zA-Z0-9_]+)/\2/f,functions/
--regex-typescript=/^[ \t]*export[ \t]+var[ \t]+([a-zA-Z0-9_]+)/\1/v,variables/
--regex-typescript=/^[ \t]*var[ \t]+([a-zA-Z0-9_]+)[ \t]*=[ \t]*function[ \t]*\(\)/\1/v,varlambdas/
--regex-typescript=/^[ \t]*(export)?[ \t]*(public|private)[ \t]+(static)?[ \t]*([a-zA-Z0-9_]+)/\4/m,members/
--regex-typescript=/^[ \t]*(export)?[ \t]*interface[ \t]+([a-zA-Z0-9_]+)/\2/i,interfaces/
--regex-typescript=/^[ \t]*(export)?[ \t]*enum[ \t]+([a-zA-Z0-9_]+)/\2/e,enums/
--regex-typescript=/^[ \t]*import[ \t]+([a-zA-Z0-9_]+)/\1/I,imports/

#alias gen_tags='echo generating cpp tags;ctags -R --c++-kinds=+p --fields=+iaS --extra=+q  --languages=c++  -f tags . ; sort -u -o LC_ALL='C' tags tags'
# note, to resolve error sort: string comparison failed: Invalid or incomplete multibyte or wide character must perform:
# export  LC_ALL='C'
alias gen_tags='echo generating all languages tags;if [ -f tags ] ; then rm tags; fi ; LC_ALL='C'; ctags -R --c++-kinds=+p --fields=+iaS --extra=+q  -f tags . ; sort -u -o tags tags'
alias gen_tags_java='echo generating java tags;ctags -R --fields=+iaS --extra=+q  --languages=java  -f tags . ; sort -u -o tags tags'
alias gen_tags_python='echo generating python tags; ctags -R --exclude=__pycache__ --fields=+l --languages=python -f tags .; sort -u -o tags tags'
alias gen_tags_javascript="echo generating javascript tags;ctags -R src test && sed -i '' -E '/^(if|switch|function|module\.exports|it|describe).+language:js$/d' tags; sort -u -o tags tags"


    23.7
```
