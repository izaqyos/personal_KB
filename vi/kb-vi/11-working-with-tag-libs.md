---
type: reference
title: Working with tag libs.
description: "Legacy vim KB section: Working with tag libs. (Common issues, Restart Vim., exuberent ctags MAC)"
tags: [vim, legacy, reference]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#11"
---

# Working with tag libs.

[↑ KB_vi](/vi/kb-vi/README.md)

```text
	Install taglib plugin (instructions at VIM home page).
	11.1 Download the taglist.zip file and unzip the files to the $HOME/.vim or the
	    $HOME/vimfiles or the $VIM/vimfiles directory. After this step, you should
	        have the following two files (the directory structure should be preserved):

		         plugin/taglist.vim - main taglist plugin file
			          doc/taglist.txt    - documentation (help) file
	if ( pPdeVar != NULL )
	if ( pPdeVar != NULL )
	{
		if ( context->GetParam ( pPdeVar, &postureData ) == PDE_OK )
		{
			if ( postureData != NULL )
			{
				printLog ( DZLOG_INFO, "Input VAF dump START [%d] bytes", postureData->getSize() );
				int pret = printBuffOfVAFs(postureData->getValueRaw(), postureData->getSize());
				printLog ( DZLOG_INFO, "Input VAF dump END (%d)", pret );
			}
			else
			{
				printLog ( DZLOG_INFO, "Input VAF is empty" );
			}
		}
		pPdeVar = NULL;
	}
	{
		if ( context->GetParam ( pPdeVar, &postureData ) == PDE_OK )
		{
			if ( postureData != NULL )
			{
				printLog ( DZLOG_INFO, "Input VAF dump START [%d] bytes", postureData->getSize() );
				int pret = printBuffOfVAFs(postureData->getValueRaw(), postureData->getSize());
				printLog ( DZLOG_INFO, "Input VAF dump END (%d)", pret );
			}
			else
			{
				printLog ( DZLOG_INFO, "Input VAF is empty" );
			}
		}
		pPdeVar = NULL;
	}

	Refer to the |add-plugin|, |add-global-plugin| and |runtimepath| Vim
	help pages for more details about installing Vim plugins.
```

## 11.2 Change to the $HOME/.vim/doc or $HOME/vimfiles/doc or $VIM/doc/vimfiles

```text
					    directory, start Vim and run the ":helptags ." command to process the
					        taglist help file. Without this step, you cannot jump to the taglist help
						    topics.
	11.3 If the exuberant ctags utility is not present in your PATH, then set the
						        Tlist_Ctags_Cmd variable to point to the location of the exuberant ctags
							    utility (not to the directory) in the .vimrc file.
```

### 11.3.1 Common issues

```text
ctags: unrecognized option `--fields=+iaS'
        Try `ctags --help' for a complete list of options.

and
$ ctags -R  -f tags . 
ctags: skipping .: it is not a regular file.

- fix, use etags not ctags!
$ ctags --version
ctags (standalone 21.4.22)
Copyright (C) 2007 Free Software Foundation, Inc.
This program is distributed under the terms in ETAGS.README
$ type ctags
ctags is hashed (<internal-path>)

- while etags is
$ ctags --version
Exuberant Ctags 5.6, Copyright (C) 1996-2004 Darren Hiebert
  Compiled: Jul 17 2006, 11:40:44
  Addresses: <dhiebert@users.sourceforge.net>, http://ctags.sourceforge.net
  Optional compiled features: +wildcards, +regex
$ type ctags
ctags is hashed (/usr/bin/ctags)

		    11.3.2
```

## 11.4 If you are running a terminal/console version of Vim and the terminal

```text
							        doesn't support changing the window width then set the
								    'Tlist_Inc_Winwidth' variable to 0 in the .vimrc file.
```

## 11.5 Restart Vim.

## 11.6 You can now use the ":TlistToggle" command to open/close the taglist

```text
								        window. You can use the ":help taglist" command to get more information
									    about using the taglist plugin. 
									    NOTE. make sure that .vimrc contains a line pointing to ctags.exe.
									    for example: let Tlist_Ctags_Cmd = '/usr/bin/'.'\ctags.exe' " Location of ctags
```

## 11.7 exuberent ctags MAC

```text
http://invisiblezero.net/tutorial-install-real-exuberant-ctags-on-mac/
download ctags source from here :
http://ctags.sourceforge.net/
 
execute these command without “sudo” :
tar xzvf <ctags package>cd ctags-5.7./configuremake
make install
This puts it in /usr/local/bin which means it avoids the ctags that comes with OS X. This is good in case Apple releases an update for it and squashes your real ctags. To make the good ctags show up first, you need it to be first in your path. If you’re using .bash_login or .bash_profile add a line like this:
export PATH=”/usr/local/bin:${PATH}”
Then you can make sure by opening a NEW terminal window and doing: which tags
It should show /usr/local/bin/ctags

My install:
525  mv ~/Downloads/ctags-5.8.tar  .
  526  tar xvfz ctags-5.8.tar 
  527  cd ctags-5.8/
  528  ./configure 
  529  make
  530  make install
  531  type ctags
  532  ctags --help
  533  ctags --version
	11.8
```
