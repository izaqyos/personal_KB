---
type: reference
title: Aliases
description: Section 9 of the legacy KB_bash notes.
tags: [kb-bash]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "bash/KB_bash#9"
---

# Aliases

[↑ KB_bash](/bash/kb-bash/README.md)

```text
	Create an alias, aliases allow a string to be substituted for a word when it is used as the first word of a simple command.

	SYNTAX
	      alias [-p] [name[=value] ...]
	      unalias [-a] [name ... ]      

	If arguments are supplied, an alias is defined for each name whose value is given.

	If no value is given, `alias' will print the current value of the alias.

	Without arguments or with the `-p' option, alias prints the list of aliases on the standard output in a form that allows them to be reused as input.

	`unalias' will remove each name from the list of aliases. If `-a' is supplied, all aliases are removed.

	`alias' and `unalias' are BASH built-ins.

	The first word of each simple command, if unquoted, is checked to see if it has an alias. If so, that word is replaced by the text of the alias. The alias name and the replacement text may contain any valid shell input, including shell metacharacters, with the exception that the alias name may not contain `='.

	The first word of the replacement text is tested for aliases, but a word that is identical to an alias being expanded is not expanded a second time. This means that one may alias ls to "ls -F", for instance, and Bash does not try to recursively expand the replacement text.

	If the last character of the alias value is a space or tab character, then the next command word following the alias is also checked for alias expansion.

	There is no mechanism for using arguments in the replacement text, as in csh. If arguments are needed, a shell function should be used . Aliases are not expanded when the shell is not interactive, unless the expand_aliases shell option is set using shopt .

	The rules concerning the definition and use of aliases are somewhat confusing. Bash always reads at least one complete line of input before executing any of the commands on that line. Aliases are expanded when a command is read, not when it is executed. Therefore, an alias definition appearing on the same line as another command does not take effect until the next line of input is read. The commands following the alias definition on that line are not affected by the new alias. This behavior is also an issue when functions are executed. Aliases are expanded when a function definition is read, not when the function is executed, because a function definition is itself a compound command. As a consequence, aliases defined in a function are not available until after that function is executed. To be safe, always put alias definitions on a separate line, and do not use alias in compound commands.

	For almost every purpose, shell functions are preferred over aliases.

	Examples

	alias ls='ls -F'

	Now issuing the command 'ls' will actually run 'ls -F'

	Making an alias permanent:
	Use your favorite text editor to create a .bash_aliases file, and type the alias commands into the file.
	.bash_aliases will run at login (or you can just execute it with ..bash_aliases )

	"The odds against there being a bomb on a plane are a million to one, and against two bombs a million times a million to one. Next time you fly, cut the odds and take a bomb." - Benny Hill

	Related Linux Bash commands:

	export - Set an environment variable
	env - Display, set, or remove environment variables
	echo - Display message on screen
	readonly - Mark variables/functions as readonly
	shift - Shift positional parameters

	Equivalent Windows XP commands:

	SET - Display, set, or remove Windows NT environment variables
	SETX - Set environment variables permanently
	SETLOCAL - Begin localisation of environment changes in a batch file
```
