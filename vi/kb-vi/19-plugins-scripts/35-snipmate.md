---
type: reference
title: snipMate
description: "Subsection 19.32 of PLUGINS, Scripts."
tags: [kb-vi, plugins, scripts, extensions, colorschemes, list, active]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#19.32"
---

# 19.32 snipMate

[↑ PLUGINS, Scripts](/vi/kb-vi/19-plugins-scripts/README.md)

```text
http://www.catonmat.net/blog/vim-plugins-snipmate-vim/

Snipmate.vim is probably the best snippets plugin for vim. A snippet is a piece of often-typed text or programming construct that you can insert into your document by using a trigger followed by a <tab>. It was written by Michael Sanders. He says he modeled this plugin after TextMate's snippets.

Here is an example usage of snipmate.vim. If you are a C programmer, then one of the most often used forms of a loop is "for (i=0; i<n; i++) { ... }". Without snippets you'd have to type this out every time. Even though it takes just another second, these seconds can add to minutes throughout the day and minutes can add to hours over longer periods of time. Why waste your time this way? With snippets you can type just "for<tab>" and snipmate will insert this whole construct in your source code automatically! If "i" or "n" weren't the variable you wanted to use, you can now use <tab> and <shift-tab> to jump to next/previous item in the loop and rename them!

    |1. Download snipmate.zip.
    |2. Extract snipmate.zip to ~/.vim (on Unix/Linux) or ~\vimfiles (on Windows).
    |3. Run :helptags ~/.vim/doc (on Unix/Linux) or :helptags ~/vimfiles/doc (on Windows) to rebuild the tags file (so that you can read :help snipmate.)
    |4. Restart Vim.

The plugin comes with predefined snippets for more than a dozen languages (C, C++, HTML, Java, JavaScript, Objective C, Perl, PHP, Python, Ruby, Tcl, Shell, HTML, Mako templates, LaTeX, VimScript). Be sure to check out the snippet files in the "snippets" directory under your ~/.vim or ~\vimfiles directory.

If you need to define your own snippets (which you most likely will need), create a new file named "language-foo.snippets" in the "snippets" directory. For example, to define your own snippets for C language, you'd create a file called "c-foo.snippets" and place snippets in it.

To learn about snipmate snippet syntax, type ":help snipmate" and locate the syntax section in the help file.
```

### 19.32.1 :h snipMate

```text
==============================================================================
DESCRIPTION                                             *snipMate-description*

snipMate.vim implements some of TextMate's snippets features in Vim. A
snippet is a piece of often-typed text that you can insert into your
document using a trigger word followed by a <tab>.

For instance, in a C file using the default installation of snipMate.vim, if
you type "for<tab>" in insert mode, it will expand a typical for loop in C: >

 for (i = 0; i < count; i++) {

 }


To go to the next item in the loop, simply <tab> over to it; if there is
repeated code, such as the "i" variable in this example, you can simply
start typing once it's highlighted and all the matches specified in the
snippet will be updated. To go in reverse, use <shift-tab>.

==============================================================================
SYNTAX                                                        *snippet-syntax*

Snippets can be defined in two ways. They can be in their own file, named
after their trigger in 'snippets/<filetype>/<trigger>.snippet', or they can be
defined together in a 'snippets/<filetype>.snippets' file. Note that dotted
'filetype' syntax is supported -- e.g., you can use >

	:set ft=html.eruby

to activate snippets for both HTML and eRuby for the current file.

The syntax for snippets in *.snippets files is the following: >

 snippet trigger
 	expanded text
	more expanded text

Note that the first hard tab after the snippet trigger is required, and not
expanded in the actual snippet. The syntax for *.snippet files is the same,
only without the trigger declaration and starting indentation.

Also note that snippets must be defined using hard tabs. They can be expanded
to spaces later if desired (see |snipMate-indenting|).

"#" is used as a line-comment character in *.snippets files; however, they can
only be used outside of a snippet declaration. E.g.: >

 # this is a correct comment
 snippet trigger
 	expanded text
 snippet another_trigger
 	# this isn't a comment!
	expanded text
<
This should hopefully be obvious with the included syntax highlighting.
```

### 19.32.2 C snip

```text
# main()
snippet main
	int main(int argc, const char *argv[])
	{
		${1}
		return 0;
	}
# #include <...>
snippet inc
	#include <${1:stdio}.h>${2}
# #include "..."
snippet Inc
	#include "${1:`Filename("$1.h")`}"${2}
# #ifndef ... #define ... #endif
snippet Def
	#ifndef $1
	#define ${1:SYMBOL} ${2:value}
	#endif${3}
snippet def
	#define 
snippet ifdef
	#ifdef ${1:FOO}
		${2:#define }
	#endif
snippet #if
	#if ${1:FOO}
		${2}
	#endif
# Header Include-Guard
# (the randomizer code is taken directly from TextMate; it could probably be
# cleaner, I don't know how to do it in vim script)
snippet once
	#ifndef ${1:`toupper(Filename('', 'UNTITLED').'_'.system("/usr/bin/ruby -e 'print (rand * 2821109907455).round.to_s(36)'"))`}

	#define $1

	${2}

	#endif /* end of include guard: $1 */
# If Condition
snippet if
	if (${1:/* condition */}) {
		${2:/* code */}
	}
snippet el
	else {
		${1}
	}
# Tertiary conditional
snippet t
	${1:/* condition */} ? ${2:a} : ${3:b}
# Do While Loop
snippet do
	do {
		${2:/* code */}
	} while (${1:/* condition */});
# While Loop
snippet wh
	while (${1:/* condition */}) {
		${2:/* code */}
	}
# For Loop
snippet for
	for (${2:i} = 0; $2 < ${1:count}; $2${3:++}) {
		${4:/* code */}
	}
# Custom For Loop
snippet forr
	for (${1:i} = ${2:0}; ${3:$1 < 10}; $1${4:++}) {
		${5:/* code */}
	}
# Function
snippet fun
	${1:void} ${2:function_name}(${3})
	{
		${4:/* code */}
	}
# Function Declaration
snippet fund
	${1:void} ${2:function_name}(${3});${4}
# Typedef
snippet td
	typedef ${1:int} ${2:MyCustomType};${3}
# Struct
snippet st
	struct ${1:`Filename('$1_t', 'name')`} {
		${2:/* data */}
	}${3: /* optional variable list */};${4}
# Typedef struct
snippet tds
	typedef struct ${2:_$1 }{
		${3:/* data */}
	} ${1:`Filename('$1_t', 'name')`};
# Typdef enum
snippet tde
	typedef enum {
		${1:/* data */}
	} ${2:foo};
# printf
# unfortunately version this isn't as nice as TextMates's, given the lack of a
# dynamic `...`
snippet pr
	printf("${1:%s}\n"${2});${3}
# fprintf (again, this isn't as nice as TextMate's version, but it works)
snippet fpr
	fprintf(${1:stderr}, "${2:%s}\n"${3});${4}
snippet .
	[${1}]${2}
snippet un
	unsigned
```

### 19.32.3 c++ snip

```text
# Read File Into Vector
snippet readfile
	std::vector<char> v;
	if (FILE *${2:fp} = fopen(${1:"filename"}, "r")) {
		char buf[1024];
		while (size_t len = fread(buf, 1, sizeof(buf), $2))
			v.insert(v.end(), buf, buf + len);
		fclose($2);
	}${3}
# std::map
snippet map
	std::map<${1:key}, ${2:value}> map${3};
# std::vector
snippet vector
	std::vector<${1:char}> v${2};
# Namespace
snippet ns
	namespace ${1:`Filename('', 'my')`} {
		${2}
	} /* $1 */
# Class
snippet cl
	class ${1:`Filename('$1_t', 'name')`} {
	public:
		$1 (${2:arguments});
		virtual ~$1 ();
	
	private:
		${3:/* data */}
	};
```

### 19.32.4 Java snips

```text
snippet main
	public static void main (String [] args)
	{
		${1:/* code */}
	}
snippet pu
	public
snippet po
	protected
snippet pr
	private
snippet st
	static
snippet fi
	final
snippet ab
	abstract
snippet re
	return
snippet br
	break;
snippet de
	default:
		${1}
snippet ca
	catch(${1:Exception} ${2:e}) ${3}
snippet th
	throw 
snippet sy
	synchronized
snippet im
	import
snippet j.u
	java.util
snippet j.i
	java.io.
snippet j.b
	java.beans.
snippet j.n
	java.net.
snippet j.m
	java.math.
snippet if
	if (${1}) ${2}
snippet el
	else 
snippet elif
	else if (${1}) ${2}
snippet wh
	while (${1}) ${2}
snippet for
	for (${1}; ${2}; ${3}) ${4}
snippet fore
	for (${1} : ${2}) ${3}
snippet sw
	switch (${1}) ${2}
snippet cs
	case ${1}:
		${2}
	${3}
snippet tc
	public class ${1:`Filename()`} extends ${2:TestCase}
snippet t
	public void test${1:Name}() throws Exception ${2}
snippet cl
	class ${1:`Filename("", "untitled")`} ${2}
snippet in
	interface ${1:`Filename("", "untitled")`} ${2:extends Parent}${3}
snippet m
	${1:void} ${2:method}(${3}) ${4:throws }${5}
snippet v
	${1:String} ${2:var}${3: = null}${4};${5}
snippet co
	static public final ${1:String} ${2:var} = ${3};${4}
snippet cos
	static public final String ${1:var} = "${2}";${3}
snippet as
	assert ${1:test} : "${2:Failure message}";${3}
```

### 19.32.5 perl snip

```text
# #!/usr/bin/perl
snippet #!
	#!/usr/bin/perl
	
# Hash Pointer
snippet .
	 =>
# Function
snippet sub
	sub ${1:function_name} {
		${2:#body ...}
	}
# Conditional
snippet if
	if (${1}) {
		${2:# body...}
	}
# Conditional if..else
snippet ife
	if (${1}) {
		${2:# body...}
	} else {
		${3:# else...}
	}
# Conditional if..elsif..else
snippet ifee
	if (${1}) {
		${2:# body...}
	} elsif (${3}) {
		${4:# elsif...}
	} else {
		${5:# else...}
	}
# Conditional One-line
snippet xif
	${1:expression} if ${2:condition};${3}
# Unless conditional
snippet unless
	unless (${1}) {
		${2:# body...}
	}
# Unless conditional One-line
snippet xunless
	${1:expression} unless ${2:condition};${3}
# Try/Except
snippet eval
	eval {
		${1:# do something risky...}
	};
	if ($@) {
		${2:# handle failure...}
	}
# While Loop
snippet wh
	while (${1}) {
		${2:# body...}
	}
# While Loop One-line
snippet xwh
	${1:expression} while ${2:condition};${3}
# For Loop
snippet for
	for (my $${2:var} = 0; $$2 < ${1:count}; $$2${3:++}) {
		${4:# body...}
	}
# Foreach Loop
snippet fore
	foreach my $${1:x} (@${2:array}) {
		${3:# body...}
	}
# Foreach Loop One-line
snippet xfore
	${1:expression} foreach @${2:array};${3}
# Package
snippet cl
	package ${1:ClassName};
	
	use base qw(${2:ParentClass});
	
	sub new {
		my $class = shift;
		$class = ref $class if ref $class;
		my $self = bless {}, $class;
		$self;
	}
	
	1;${3}
# Read File
snippet slurp
	my $${1:var};
	{ local $/ = undef; local *FILE; open FILE, "<${2:file}"; $$1 = <FILE>; close FILE }${3}
```

### 19.32.6 python snip

```text
snippet #!
	#!/usr/bin/python

snippet imp
	import ${1:module}
# Module Docstring
snippet docs
	'''
	File: ${1:`Filename('$1.py', 'foo.py')`}
	Author: ${2:`g:snips_author`}
	Description: ${3}
	'''
snippet wh
	while ${1:condition}:
		${2:# code...}
snippet for
	for ${1:needle} in ${2:haystack}:
		${3:# code...}
# New Class
snippet cl
	class ${1:ClassName}(${2:object}):
		"""${3:docstring for $1}"""
		def __init__(self, ${4:arg}):
			${5:super($1, self).__init__()}
			self.$4 = $4
			${6}
# New Function
snippet def
	def ${1:fname}(${2:`indent('.') ? 'self' : ''`}):
		"""${3:docstring for $1}"""
		${4:pass}
snippet deff
	def ${1:fname}(${2:`indent('.') ? 'self' : ''`}):
		${3}
# New Method
snippet defs
	def ${1:mname}(self, ${2:arg}):
		${3:pass}
# New Property
snippet property
	def ${1:foo}():
		doc = "${2:The $1 property.}"
		def fget(self):
			${3:return self._$1}
		def fset(self, value):
			${4:self._$1 = value}
# Lambda
snippet ld
	${1:var} = lambda ${2:vars} : ${3:action}
snippet .
	self.
snippet try Try/Except
	try:
		${1:pass}
	except ${2:Exception}, ${3:e}:
		${4:raise $3}
snippet try Try/Except/Else
	try:
		${1:pass}
	except ${2:Exception}, ${3:e}:
		${4:raise $3}
	else:
		${5:pass}
snippet try Try/Except/Finally
	try:
		${1:pass}
	except ${2:Exception}, ${3:e}:
		${4:raise $3}
	finally:
		${5:pass}
snippet try Try/Except/Else/Finally
	try:
		${1:pass}
	except ${2:Exception}, ${3:e}:
		${4:raise $3}
	else:
		${5:pass}
	finally:
		${6:pass}
# if __name__ == '__main__':
snippet ifmain
	if __name__ == '__main__':
		${1:main()}
# __magic__
snippet _
	__${1:init}__${2}
```

### 19.32.7 bash snip

```text
# #!/bin/bash
snippet #!
	#!/bin/bash
	
snippet if
	if [[ ${1:condition} ]]; then
		${2:#statements}
	fi
snippet elif
	elif [[ ${1:condition} ]]; then
		${2:#statements}
snippet for
	for (( ${2:i} = 0; $2 < ${1:count}; $2++ )); do
		${3:#statements}
	done
snippet wh
	while [[ ${1:condition} ]]; do
		${2:#statements}
	done
snippet until
	until [[ ${1:condition} ]]; do
		${2:#statements}
	done
snippet case
	case ${1:word} in
		${2:pattern})
			${3};;
	esac
```

### 19.32.8 html snip

```text
# Some useful Unicode entities
# Non-Breaking Space
snippet nbs
	&nbsp;
# ←
snippet left
	&#x2190;
# →
snippet right
	&#x2192;
# ↑
snippet up
	&#x2191;
# ↓
snippet down
	&#x2193;
# ↩
snippet return
	&#x21A9;
# ⇤
snippet backtab
	&#x21E4;
# ⇥
snippet tab
	&#x21E5;
# ⇧
snippet shift
	&#x21E7;
# ⌃
snippet control
	&#x2303;
# ⌅
snippet enter
	&#x2305;
# ⌘
snippet command
	&#x2318;
# ⌥
snippet option
	&#x2325;
# ⌦
snippet delete
	&#x2326;
# ⌫
snippet backspace
	&#x232B;
# ⎋
snippet escape
	&#x238B;
# Generic Doctype
snippet doctype HTML 4.01 Strict
	<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN""
	"http://www.w3.org/TR/html4/strict.dtd">
snippet doctype HTML 4.01 Transitional
	<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN""
	"http://www.w3.org/TR/html4/loose.dtd">
snippet doctype HTML 5
	<!DOCTYPE HTML>
snippet doctype XHTML 1.0 Frameset
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
snippet doctype XHTML 1.0 Strict
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
snippet doctype XHTML 1.0 Transitional
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
snippet doctype XHTML 1.1
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"
	"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
# HTML Doctype 4.01 Strict
snippet docts
	<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN""
	"http://www.w3.org/TR/html4/strict.dtd">
# HTML Doctype 4.01 Transitional
snippet doct
	<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN""
	"http://www.w3.org/TR/html4/loose.dtd">
# HTML Doctype 5
snippet doct5
	<!DOCTYPE HTML>
# XHTML Doctype 1.0 Frameset
snippet docxf
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
# XHTML Doctype 1.0 Strict
snippet docxs
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
# XHTML Doctype 1.0 Transitional
snippet docxt
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
# XHTML Doctype 1.1
snippet docx
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"
	"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
snippet html
	<html>
	${1}
	</html>
snippet xhtml
	<html xmlns="http://www.w3.org/1999/xhtml">
	${1}
	</html>
snippet body
	<body>
		${1}
	</body>
snippet head
	<head>
		<meta http-equiv="content-type" content="text/html; charset=utf-8"`Close()`>

		<title>${1:`substitute(Filename('', 'Page Title'), '^.', '\u&', '')`}</title>
		${2}
	</head>
snippet title
	<title>${1:`substitute(Filename('', 'Page Title'), '^.', '\u&', '')`}</title>${2}
snippet script
	<script type="text/javascript" charset="utf-8">
		${1}
	</script>${2}
snippet scriptsrc
	<script src="${1}.js" type="text/javascript" charset="utf-8"></script>${2}
snippet style
	<style type="text/css" media="${1:screen}">
		${2}
	</style>${3}
snippet base
	<base href="${1}" target="${2}"`Close()`>
snippet r
	<br`Close()[1:]`>
snippet div
	<div id="${1:name}">
		${2}
	</div>
# Embed QT Movie
snippet movie
	<object width="$2" height="$3" classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B"
	 codebase="http://www.apple.com/qtactivex/qtplugin.cab">
		<param name="src" value="$1"`Close()`>
		<param name="controller" value="$4"`Close()`>
		<param name="autoplay" value="$5"`Close()`>
		<embed src="${1:movie.mov}"
			width="${2:320}" height="${3:240}"
			controller="${4:true}" autoplay="${5:true}"
			scale="tofit" cache="true"
			pluginspage="http://www.apple.com/quicktime/download/"
		`Close()[1:]`>
	</object>${6}
snippet fieldset
	<fieldset id="$1">
		<legend>${1:name}</legend>

		${3}
	</fieldset>
snippet form
	<form action="${1:`Filename('$1_submit')`}" method="${2:get}" accept-charset="utf-8">
		${3}


	<p><input type="submit" value="Continue &rarr;"`Close()`></p>
	</form>
snippet h1
	<h1 id="${1:heading}">${2:$1}</h1>
snippet input
	<input type="${1:text/submit/hidden/button}" name="${2:some_name}" value="${3}"`Close()`>${4}
snippet label
	<label for="${2:$1}">${1:name}</label><input type="${3:text/submit/hidden/button}" name="${4:$2}" value="${5}" id="${6:$2}"`Close()`>${7}
snippet link
	<link rel="${1:stylesheet}" href="${2:/css/master.css}" type="text/css" media="${3:screen}" charset="utf-8"`Close()`>${4}
snippet mailto
	<a href="mailto:${1:joe@example.com}?subject=${2:feedback}">${3:email me}</a>
snippet meta
	<meta name="${1:name}" content="${2:content}"`Close()`>${3}
snippet opt
	<option value="${1:option}">${2:$1}</option>${3}
snippet optt
	<option>${1:option}</option>${2}
snippet select
	<select name="${1:some_name}" id="${2:$1}">
		<option value="${3:option}">${4:$3}</option>
	</select>${5}
snippet table
	<table border="${1:0}">
		<tr><th>${2:Header}</th></tr>
		<tr><th>${3:Data}</th></tr>
	</table>${4}
snippet textarea
	<textarea name="${1:Name}" rows="${2:8}" cols="${3:40}">${4}</textarea>${5}

		19.32.9
```
