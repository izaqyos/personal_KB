---
type: reference
title: Doxygen support
description: "Vim plugin notes: Doxygen support (Documentation, Install, Usage)"
tags: [vim, vimscript, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#19.20"
---

# 19.20 Doxygen support

[↑ PLUGINS, Scripts](/vi/kb-vi/19-plugins-scripts/README.md)

```text
	http://www.vim.org/scripts/script.php?script_id=1955

	This plugin generates Ex commands and a menu (or a menu tree) from a template
file containing user defined comment templates to be used for source code
documentation with Doxygen. The template file can have user defined macros.

Example and screen shots :   http://lug.fh-swf.de/vim/vim-doxygen/index.html

The help file online :   http://lug.fh-swf.de/vim/vim-doc/doxygensupport.html

"
```

### 19.20.1 Documentation

```text
		h doxygensupport

"
```

### 19.20.2 Install

```text
(1) Copy the zip archive  doxygen-support.zip to $HOME/.vim/ or $VIM/vimfiles
    (on the Windows platforms) and run

      unzip doxygen-support.zip

    If you have already an older version of doxygen-support and you have modified
    the template files you may want to save your templates first or copy the
    files from the archive by hand.

(2) Loading of plugin files must be enabled. If not use
      :filetype plugin on
    This is the minimal content of the file '$HOME/.vimrc'. Create one if there
    is none.

(3) Set at least some personal details in the main file
    'doxygen-support/templates/doxygen.templates'.

(4) Restart gVim/Vim generate the help tags

      :helptags ~/.vim/doc

    and look at the doxygensupport help with

      :h doxygensupport
```

### 19.20.3 Usage

#### 19.20.3.1 GUI

```text
The Doxygen menu will be generated when the editor starts (GUI only) or on
demand (see|doxygensupport-rebuild|).

The template names from the template definition file become menu items linked
with the template body. The template body will be inserted below the cursor.

The delimiter '.' has a special meaning: it separates a submenu name from its
submenu items. The template names

 ==block.short==
 ==block.long==
 ==block.special==

will generate a submenu entry 'block'  with the items 'short', 'long', and
'special' :

 block --+--> long
         |
         +--> short
         |
         +--> special

This feature can be used to arrange the templates into groups. The template
names

 ==C.block-short==
 ==C.block-long==
 ==C.block-special==
 ==Cpp.block-short==
 ==Cpp.block-long==
 ==Cpp.block-special==

result in menus in which the templates are arranged according to C/C++
commenting styles:

 C   --+--> block-short
       +--> block-long
       +--> block-special
 Cpp --+--> block-short
       +--> block-long
       +--> block-special
```

#### 19.20.3.2 Non GUI (xterm, eterm etc)

```text
This plugin generates an Ex command for each Doxygen template.  These commands
will be generated when the editor starts or on demand (see|doxygensupport-rebuild|).

Vim Ex command names have to start always with an uppercase letter followed by
letters or digits. Delimiters are not allowed.  The user defined template
names are therefore transformed into camel case notation.  The parts separated
by the delimiters are joined together now. The first letter of each part will
be transformed to uppercase. The new word will be prefixed by 'Doxy'. Some
examples:

 template name           Ex command
 ----------------------------------------
 ==block.long==          DoxyBlockLong
 ==block.short==         DoxyBlockShort
 ==block.special==       DoxyBlockSpecial
 ==file-header==         DoxyFileHeader
 ==function==            DoxyFunction

 ***  You do not need to remember the names of these Ex commands. Just type
 ***  'Doxy' on the command line and use the tab expansion to show the names
 ***  and to choose from.

NAMING CONFLICTS. The template names

 ==block-special==       DoxyBlockSpecial
 ==block+special==       DoxyBlockSpecial

will generate two different menu items but obviously the same Ex command name.
Avoiding these conflicts is up to you.
```
