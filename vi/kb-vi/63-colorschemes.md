---
type: reference
title: Colorschemes
description: "Legacy vim KB section: Colorschemes (h colorscheme)"
tags: [configuration, vim, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#62"
---

# Colorschemes

[↑ KB_vi](/vi/kb-vi/README.md)

## 62.1 h colorscheme

```text
						*:colo* *:colorscheme* *E185*
:colo[rscheme]		Output the name of the currently active color scheme.
			This is basically the same as >
				:echo g:colors_name
<			In case g:colors_name has not been defined :colo will
			output "default".  When compiled without the |+eval|
			feature it will output "unknown".

:colo[rscheme] {name}	Load color scheme {name}.  This searches 'runtimepath'
			for the file "colors/{name}.vim.  The first one that
			is found is loaded.
			To see the name of the currently active color scheme: >
				:colo
<			The name is also stored in the g:colors_name variable.
			Doesn't work recursively, thus you can't use
			":colorscheme" in a color scheme script.
			After the color scheme has been loaded the
			|ColorScheme| autocommand event is triggered.
			For info about writing a colorscheme file: >
				:edit $VIMRUNTIME/colors/README.txt

				"
:hi[ghlight]		List all the current highlight groups that have
			attributes set.

:hi[ghlight] {group-name}
			List one highlight group.

:hi[ghlight] clear	Reset all highlighting to the defaults.  Removes all
			highlighting for groups added by the user!
			Uses the current value of 'background' to decide which
			default colors to use.

:hi[ghlight] clear {group-name}
:hi[ghlight] {group-name} NONE
			Disable the highlighting for one highlight group.  It
			is _not_ set back to the default colors.

:hi[ghlight] [default] {group-name} {key}={arg} ..
			Add a highlight group, or change the highlighting for
			an existing group.
			See |highlight-args| for the {key}={arg} arguments.
			See |:highlight-default| for the optional [default]
			argument.

Normally a highlight group is added once when starting up.  This sets the
default values for the highlighting.  After that, you can use additional
highlight commands to change the arguments that you want to set to non-default
values.  The value "NONE" can be used to switch the value off or go back to
the default value.

A simple way to change colors is with the |:colorscheme| command.  This loads
a file with ":highlight" commands such as this: >

   :hi Comment	gui=bold

Note that all settings that are not included remain the same, only the
specified field is used, and settings are merged with previous ones.  So, the
result is like this single command has been used: >
   :hi Comment	term=bold ctermfg=Cyan guifg=#80a0ff gui=bold
<
							*:highlight-verbose*
When listing a highlight group and 'verbose' is non-zero, the listing will
also tell where it was last set.  Example: >
	:verbose hi Comment
<	Comment        xxx term=bold ctermfg=4 guifg=Blue ~
	   Last set from /home/mool/vim/vim7/runtime/syntax/syncolor.vim ~

When ":hi clear" is used then the script where this command is used will be
mentioned for the default values. See |:verbose-cmd| for more information.

					*highlight-args* *E416* *E417* *E423*
There are three types of terminals for highlighting:
term	a normal terminal (vt100, xterm)
cterm	a color terminal (MS-DOS console, color-xterm, these have the "Co"
	termcap entry)
gui	the GUI

For each type the highlighting can be given.  This makes it possible to use
the same syntax file on all terminals, and use the optimal highlighting.


	62.2
```
