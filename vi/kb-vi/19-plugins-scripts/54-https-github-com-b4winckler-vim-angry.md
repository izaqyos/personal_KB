---
type: reference
title: "https://github.com/b4winckler/vim-angry"
description: "Vim plugin notes: https://github.com/b4winckler/vim-angry"
tags: [vim, vimscript, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#19.51"
---

# 19.51 https://github.com/b4winckler/vim-angry

[↑ PLUGINS, Scripts](/vi/kb-vi/19-plugins-scripts/README.md)

```text
Angry text object
This plugin adds text object support for comma-separated arguments enclosed by brackets. (Etymology: "argument" is sometimes abbreviated to "arg" which means "angry" in Swedish.)

For example, arguments in constructs like (x, y, z) or [1, 32, 4], { {x, y}, {w, h} } can be operated on using the objects aa (an argument, includes the separator) or ia (inner argument, excludes the separator). The text objects support a repeat count and can cope with nested lists, strings and comments (strings and comments require the current file type to have proper syntax highlighting support), as well as arguments on multiple lines.

There are also upper-case versions aA and iA. The lower-case objects will match a comma or bracket at the beginning of an argument, whereas the upper-case versions match a comma or bracket at the end of an argument. For example, if the cursor is on the first comma of (x, y, z), then daa will result in (x, z) whereas daA will result in (y, z). Another way to think of this is that aa includes the comma before an argument, whereas aA includes the comma after an argument.

The upper-case version includes whitespace and comments after the rightmost separator, and excludes whitespace and comments before the argument. The lower-case version includes whitespace and comments before the leftmost separator, and excludes whitespace and comments after the argument. For example:

call( x, /* left */ y /* right */, z )
With the cursor on the y, typing daa results in call( x /* right */, z ), whereas daA results in call( x, /* left */ z ).

Customizing
Some customization of the plugin is possible:

To disable all predefined mappings, add let g:angry_disable_maps = 1 to your .vimrc. This is useful if you dislike the choices of aa, ia, aA and iA. See the script on how to create custom mappings (look right next to the g:angry_disable_maps check).
The variable g:angry_separator defines the separator (default ,). It can be changed to any single character, e.g. let g:angry_separator = ':' would set the separator to colons. (It is not possible set this on a per-buffer basis.)
The types of brackets that the text object handles can currently only be overridden by modifying the script itself.
Examples
Counts are supported, so e.g. d3aa with the cursor on the first argument will turn

function(a, 33, Rstyle="calls, with commas inside strings, are OK")
into function(). Note that commas inside strings are ignored and so are comments (this feature depends on the syntax highlighting to detect strings and comments so 'filetype' must be set properly for this to work).

If the cursor is on the R in the above function call, then both daa and daA results in function(a, 33) so the comma after 33 is properly deleted.

Installation
Assuming you are using the Pathogen plugin, just clone this repository in your ~/.vim/bundle folder like so:

$ cd ~/.vim/bundle
$ git clone https://github.com/b4winckler/vim-angry.git
Alternatively, you can just put angry.vim in your ~/.vim/plugin folder (create the folder if it does not already exist).
```
