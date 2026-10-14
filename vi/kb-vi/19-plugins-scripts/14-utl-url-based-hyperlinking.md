---
type: reference
title: "UTL, URL-based hyperlinking"
description: "Subsection 19.12 of PLUGINS, Scripts."
tags: [kb-vi, plugins, scripts, extensions, colorschemes, list, active]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#19.12"
---

# 19.12 UTL, URL-based hyperlinking

[↑ PLUGINS, Scripts](/vi/kb-vi/19-plugins-scripts/README.md)

```text
		Type :help utl-start
		To find help <URL:#r=help>
		To find the examples, <URL:#tn=EXAMPLES>
		To jump to unix KB, <URL:../knowledge_base_unix>
		To jump to unix KB crontab section, <URL:../knowledge_base_unix#tn=crontab>
		To go to web URL, <URL:http://www.vim.org/>
```

### 19.12.1. Ver2.0 and below

```text
		id=help Type :help utl-start
```

### 19.12.2. Hit \gu on the live examples given there

```text
				Hit ctrl+o to come back.

			  As a reader of texts containing URLs that's all! As an author you have to
			  know how to write URLs. But utl.vim gives you a training. And what you
			  will learn is 90% general knowlegde about URLs that you can use elsewhere.

			* Utl.vim is friendly:
			  No side effects, fits seamlessly into your Vim Session, well documented.


			EXAMPLES

			Here are some simplistic examples. Assume you have the following stuff in a file and
			execute the URL under the cursor with command \gu (all URLs can be with or without
			<URL:...> embedding):

			* Call your web browser (setup with a smart utility) and display www.vim.org

					    URL with embedding (and syntax highlighting)...
			    <URL:http://www.vim.org>;
					    ...or without embedding...
			    http://www.vim.org
					    ...or rudimentary URL
			    www.vim.org

			* Call your mailer

			    mailto:stb@bf-consulting.de
			    stb@bf-consulting.de
			    stb@bf-consulting.de?Subject=UTL&Cc=bram@moolenaar.net

			* Link to a local file to be displayed in a Vim window...
			  (This is a bit like Vim's gf command, but portable and indepent of 'path' setting
			  and cwd)

			    ///file:/home/stb/.vimrc    or
			    /home/stb/.vimrc

					    foo.txt in same directory as file containing this link
			    foo.txt   or            
			    ./foo.txt
					    bar.txt in sibbling directory of file containing this link
			    ../sib/bar.txt  

			* ...with fragment
			  (This is a bit like tags, but theres is no tags file)

					    jump to specific position in target file foo.txt by searching
					    searchString (use this to turn phrases like "see in file foo.txt
					    and search for searchString" into hotlinks) ...
			    foo.txt#searchString
					    ...or direct addressing of a line...
			    foo.txt#line=123
					    ...or refer to the anchor `id=myIdentifier'
			    foo.txt#r=myIdentifier  
					    ...or without a file, i.e. refers to current document (use this
					    to turn phrases like "see below" into hotlinks)
			    #searchString        

			* Link to a local file displayed by a handler application

					    hand over to MS Word (or Open Office, depending on the media type
					    handler you setup in UTL)
			    foo.doc
					    typically call Acrobat Reader
			    foo.pdf                
					    typically call IrfanView or XnView
			    foo.jpg                

			* Link to a directory

					    call Vim-Explorer or call Windows Explorer or DOS box or Unix shell
					    (with directory properly set)
			    dir/  or                
			    dir

			* Embed Vim commands in text

					    switch colorscheme (perhaps maintain an annotated file with all Vim
					    schemes available?)
			    <URL:vimscript:colors peachpuff>
					    open all folds (perhaps into your plugin for users who don't know
					    how to use folds)
			    <URL:vimscript:normal zR>

					    reference the Vim help (perhaps into the source code of your own
					    plugins to explain certain constructs)...
			    <URL:vimhelp:expr-==>  
					    ...again combined with a fragment to precisely address the exact
					    position
			    <URL:vimhelp:expr-==#^since a string>

			* Command line command :Gu to execute URLs:

					    same as first example ( or may I already speak UTL to you:
					    `same as #tp=browser ' :-)
			    :Gu www.vim.org        
					    Open Windows Explorer (or whatever) displaying the directory where
					    the current file is in (on Windows very convenient in your daily
					    click click struggle)
			    :Gu .                  

			The UTL documentation contains lots of practical examples and usage patterns.

			[keywords: hypertext, hyperlink]
```

### 19.12.3 More examples

```text
			    #tn=text	    Same as #text
			    #tp=text	    Stand for `t'ext `p'revious, i.e. define position by
					    searching first occurance of `text' in backward direction.
			    #line=123	    Position defined by line number. Most useful for documents
					    which won't change
			    #r=identifier   Position defined by the id `identifier'


			    file:	# Protocol for accessing local files.
					# If machine is given works like `ftp:'
			    ftp:	# Delegates to http, assuming that the browser handles this.
			    http:	# Delegates call to your web browser
			    https:	# Delegates call to your web browser
			    mailto:	# Delegates call to your mail client
			    man:	# Unix Man Pages scheme (see |utl-usesourcecode| for usage)
			    scp:	# If you have a scp command
			    vimscript:	# Vim specific. A scheme for executing vim commands. See
					# |utl-exvs| for usage.
			    vimhelp:	# Vim specific. About the same as vimscript:help.  See
					# |utl-exvimhelp| for usage.
			    config:	# Protocol for accessing Utl's setup file
```

### 19.12.4 Ver 3.x

#### 19.12.4.1 aaa

#### 19.12.4.2 Suggested mappings

```text
"--- Suggested mappings for most frequent commands  [id=suggested_mappings] [
"
" nmap <unique> <Leader>ge :Utl openLink underCursor edit<CR>
" nmap <unique> <Leader>gu :Utl openLink underCursor edit<CR>
" nmap <unique> <Leader>gE :Utl openLink underCursor split<CR>
" nmap <unique> <Leader>gS :Utl openLink underCursor vsplit<CR>
" nmap <unique> <Leader>gt :Utl openLink underCursor tabedit<CR>
" nmap <unique> <Leader>gv :Utl openLink underCursor view<CR>
" nmap <unique> <Leader>gr :Utl openLink underCursor read<CR>
"
"					[id=suggested_mappings_visual]
" vmap <unique> <Leader>ge "*y:Utl openLink visual edit<CR>
" vmap <unique> <Leader>gu "*y:Utl openLink visual edit<CR>
" vmap <unique> <Leader>gE "*y:Utl openLink visual split<CR>
" vmap <unique> <Leader>gS "*y:Utl openLink visual vsplit<CR>
" vmap <unique> <Leader>gt "*y:Utl openLink visual tabedit<CR>
" vmap <unique> <Leader>gv "*y:Utl openLink visual view<CR>
" vmap <unique> <Leader>gr "*y:Utl openLink visual read<CR>
"
"
" nmap <unique> <Leader>cfn :Utl copyFileName underCursor native<CR>
" nmap <unique> <Leader>cfs :Utl copyFileName underCursor slash<CR>
" nmap <unique> <Leader>cfb :Utl copyFileName underCursor backSlash<CR>
"
" vmap <unique> <Leader>cfn "*y:Utl copyFileName visual native<CR>
" vmap <unique> <Leader>cfs "*y:Utl copyFileName visual slash<CR>
" vmap <unique> <Leader>cfb "*y:Utl copyFileName visual backSlash<CR>
"
"
" nmap <unique> <Leader>cl :Utl copyLink underCursor<CR>
"
" vmap <unique> <Leader>cl "*y:Utl copyLink visual<CR>
"
"]



"
```
