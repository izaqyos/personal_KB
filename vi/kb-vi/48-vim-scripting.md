---
type: reference
title: VIM Scripting
description: Section 47 of the legacy KB_vi notes.
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#47"
---

# VIM Scripting

[↑ KB_vi](/vi/kb-vi/README.md)

## 47.1 Syntax-Color Schemes

```text
	example,
	:syntax keyword myVars vim VIM
	:syntax match mySymbols ":-(){}[];="
	:syntax keyword myKeywords usage help script 
	:highlight myVars	ctermfg=red guifg=red
	:highlight mySymbols	ctermfg=blue guifg=blue
	:highlight myKeywords	ctermfg=green guifg=green
		
	Coloring is done once as VIM processes the syntax rules so the order matters.

	Add to this comments 
	:syntax match myComments "/\*.*\*/"
	:highlight myComments	ctermfg=yellow guifg=yellow
```

### 47.1.1 Syntax regions

```text
		Sometimes matching regions (like comments) using match could be difficult so there's a special command for regions that takes into account the start and end patterns of the region.

	Change the match for comments from:
	:syntax keyword myVars vim VIM
	:syntax match mySymbols ":-(){}[];="
	:syntax keyword myKeywords usage help script 
	:highlight myVars	ctermfg=red guifg=red
	:highlight mySymbols	ctermfg=blue guifg=blue
	:highlight myKeywords	ctermfg=green guifg=green
	:syntax match myComments "/\*.*\*/"
	:highlight myComments	ctermfg=yellow guifg=yellow

	:syntax keyword myVars vim VIM
	:syntax match mySymbols ":-(){}[];="
	:syntax keyword myKeywords usage help script 
	:highlight myVars	ctermfg=red guifg=red
	:highlight mySymbols	ctermfg=blue guifg=blue
	:highlight myKeywords	ctermfg=green guifg=green
	:syntax region myComments start=/\/\*/ end=/\*\//
	:highlight myComments	ctermfg=yellow guifg=yellow

	The region will easily match one line and multi line comments.
```

#### 47.1.1.1 Syntax regions in depth

```text
			regions control more than start and end it also allows to set which items inside the region you want to color by the syntax rules, like for example keywords (TODO, OBSOLETE, FIXME)
			
			To add keywords we first define a group of keywords:
	:syntax keyword myKeywords OBSOLETE FIXME TODO

			Now modify the region command to contain the keywords:
	:syntax region myComments start=/\/\*/ end=/\*\// contains=myKeywords

			The region command supports multiple color groups so its possible to add more contains= flags.
			Note, Its possible to tell VIM to enforce one line regions by adding the option "oneline"
			to the syntax region command.

			Note, to allow a region to be nested add to "contained" keyword.

			Note, "contains" keyword can be set for more control to either of:
			ALL				- all defined keyword groups
			ALLBUT,group1, group2...	- all groups except the ones in the list
			CONTAINED			- only syntax groups that have the "contained" option
			TOP				- only syntax groups that don't have the "contained" option

			Note, in case its known that several syntax groups are often used together, then its possible to join them together into a cluster:
			:syntax cluster myCluster contains=myKeywords,mySymbols,myCondtions
			Then use the cluster by adding @ in front of the name:
	:syntax region myComments start=/\/\*/ end=/\*\// contains=@myCluster
```

### 47.1.2 Syntax files

```text
		The syntax directives needs to be combined in one file in the directory VIMHOME/syntax.
		The file name must be the name of the file type of the given language appended with .vim. for C language the file would be c.vim

		If the file type used is not know to VIM, then it needs to be registered first before the syntax file will work. This is done by adding some lines to <file type>.vim file in VIMHOME. If the file doesn't exist then first create it. For example to add the .my syntax in this example:
		augroup	filetypedetect
		autocmd	BufNewFile,BufRead *.my	setfiletype my
		augroup END

		The augroup command is used by VIM to differentiate file types (groups).
		autocmd commands run automatically. This command sets the file type to 'my' for files with extension .my. Now VIM automatically attempts to match a syntax file by looking in VIMHOME/syntax/my.vim.
```

#### 47.1.2.1 Syntax files additions, VIM post-processor

```text
			Most languages already have well defined syntax files. What if you just want to tweak one a bit to your liking?- There are two options: First, find and edit the syntax file. The second is much better, VIM has post processing feature that allows to 

			To enable post-processing you need to add (or use) directory VIMHOME/after.
			Now whenever VIM looks for a script, syntax file or color scheme and find it, it will look for the same file in the 'after' directory.
			under 'after' create the same directory structure as under VIMHOME:
indent/
colors/
syntax/
autoload/
ftplugin/
plugin/
```

### 47.1.3 Color scheme and syntax coloring

```text
		Previous example we added highlighting color groups with the :syntax command.
		This gives complete control over the colors but also limits to just those colors and may not follow the colors defined by the color scheme currently in use.

		A better approach is to use the color groups already defined in VIM, and thereby split the color definition and syntax highlighting into two parts. This way, whenever the color scheme is changed so will the syntax coloring change accordingly.

		To find the list of all defined colors do:
		:highlight
```

## 47.2 Scripts

### 47.2.1 Script types

```text
		"
```

#### 47.2.1.1 Scripts that add features to VIM

```text
			Global, meaning initialized when VIM starts or when the user executes some specific call.
			File-Type, scripts that work on specific file types.
```

### 47.2.2 Installing scripts

```text
		Scripts come in three flavours
    -> 		As a single .vim file
    -> 		As a compressed file
    -> 		As a vimball, which is an automatic Vim script installation file

		To install a .vim file simply copy it to plugin or ftplugin dir (in case its a file-type script).
		On a multi user system, its possible to install to all users by copying no to your VIMHOME path but rather to the VIM installation location.

		The compressed file scripts usually contain the directory structure and only need to be extracted to VIMHOME. 

		The vimball, .vba file. For using them its required to install the vimball script (http://vim.sourceforge.net/scripts/script.php?script_id=1502)

		To install a .vba simply open it in VIM and run :source %
		This will install the script in the first place found in the runtimepath option in vim.
		To install elsewhere run :UseVimball path. 
		To view the contents of the vimball do :VimballList.
```

### 47.2.3 Uninstalling scripts

```text
		Uninstall is not supported for most scripts. To uninstall a script its required to manually remove its files.
		For vimball scripts however there's an uninstall, :RmVimball VIMBALLNAME
```

### 47.2.4 Script development

#### 47.2.4.1 Script basics

#### 47.2.4.1.1 Types

```text
				Two major types strings and numbers.

    -> 					Decimal number		:	1,3,4,10,100 etc
    -> 					Hexadecimal number	:	0x01,0x03,0x04,0x0A,0x64 etc
    -> 					Octal number		:	01,03,04,012,100 etc

					:echo 10+0xa+012
					should return 30

				Strings are either double quoted "str" or single quoted 'str'.
				" and ' or escaped via \, like "\"str\"". 
				Single quotes strings are also called literal strings, meaning special control characters can not be embedded in literal strings.
				For example "str\n" with put a new line after str, while 'str\n' will print exactly that.
				Some of the control characters available in VIM are:
    -> 				\n	newline
    -> 				\r	Carriage return (in dos/windows \r\n is newline)
    -> 				\t	tab
    -> 				\123	Octal number
    -> 				\x123	Hexadecimal number
    -> 				\u	Character encoded as up to 4 hex numbers
    -> 				\f	Form feed
    -> 				\e	Esc
    -> 				\b	Backspace
    -> 				\\	Backslash

				Besides those its possible to use VIM conventions by appending them with a backslash, like \<CR> \<ESC> \<C-W> etc
```

#### 47.2.4.1.2 Variables

```text
				Five types:
				    -> String, i.e. "a string"
				    -> Number, i.e. 12 0xaf
				    -> List,  An ordered sequence of items
				    -> Dictionary, An unordered asscoiative array holding key-value pairs
				    -> Funcref, A reference to a function

				All variables are defined with the let command:
				:let myvar = VALUE
				Where VALUE depends on the variable type. 
```

#### 47.2.4.1.2.1 Strings and Ints

```text
				Vim automatically converts between string and integer type according to context.
				Example:
				:let mystringvar = "12"
				:let mynumber = mystringvar -1
				
				Tip, Covener string to int by adding 0 to it.
				Conver int to string by :let mystr = string(mynum)

				Some examples of how automatic conversion works:
----------------------------------------------------------------------------------------------------
Input (types)			Result (type)
----------------------------------------------------------------------------------------------------
"hello"."world" (str.str)	"helloworld" (str)
----------------------------------------------------------------------------------------------------
"num".12			"num12" (str)
----------------------------------------------------------------------------------------------------
"12"+10				22 (num)
----------------------------------------------------------------------------------------------------
"12"-10." hits"			"2 hits" (str)
----------------------------------------------------------------------------------------------------
"12"-10+" hits"			2 (num)
----------------------------------------------------------------------------------------------------
```

#### 47.2.4.1.2.2 Lists

```text
					Lists are defined using square brackets to enclose a comma spearated list of values.
					:let mylist = [1, 2, "str, 0x05, myvar]

					A list can contain other lists.
					:let mylist2 = [[1,2,3], ["a", "b"]]

					List can contain items of differing types.
```

#### 47.2.4.1.2.3 Dictionaries

```text
					:let mydict = {1:"one", 2:"two", 3:"three"}
					This creates a dictionary with three items, where the key is the number and the value is the number spelled out with letters.

					Its possible to create dictionaries with nested dictionaries. Example:
					:let mydict1 = {1:"one", 2:"two", 3:"three", "nested":{0:"ten", 1:"eleven"}}
					
					Order between keys and key types do not matter.
```

#### 47.2.4.1.2.3 Function refs

```text
					Contain a reference to a function that can be executed.
					Example:
					:let Myfunctorvar = function("Myfunc")

					This ties the function "Myfunc" to the variable Myfunctorvar.
					Notice that the variable name starts with a capital letter. This is because all user defined functions in VIM need to have a capital first letter in the name, and hence all function refs have the same limitation.
					To ude a funcref variable you see use it as a normal variable name, except that you add parentheses after the name, like:
					:echo Myfunctorvar()

					Altarnatively, it can be called with the "call" command:
					:call Myfunctorvar()
	
					If the function takes arguements, then these are added in the parentheses like Myfunctorvar(arg1, arg2, ..., argN)
```

#### 47.2.4.1.2.4 Variable scopes

```text
					In VIM its the developer's responsibility to make the scope of variables.
					When no scope is given to a variable it will default to "global" scope, unless it is defined in a function, which binds it to the function scope.

					There are eight scopes in VIM:
						-> v:	Vim predefined global scope

						-> g:	Global scope

						-> b:	Buffer scope - Only available in the buffer where it was defined

						-> t:	Tab scope - Only available in the tab where it was defined 

						-> w:	Window scope - Only available in the window where it was defined 

						-> l:	Function scope - local to the function in which it was defined

						-> s:	Sourced file scope - local to a scripts loaded using :source

						-> a:	Argument scope - used in arguments for functions
						
						Note, comments in scripts are created by having a " as the first non-space character on the line: "This is a comment

						An exmaple for variable scopes:
						let g:sum=0

						function SumNumbers(num1, num2)
							let l:sum = a:num1+a:num2
							"Check if previous sum was lower than this

							if g:sum < l:sum
								let g:sum = l:sum
							endif
						endfunction

						"test
						call SumNumbers(3,4)
						"returns 7
						echo g:sum
```

#### 47.2.4.1.3 Conditions

```text
				if condition
					code if true
				else/elseif 
					code if false
				endif

				condition can be made of val1 OPERATOR val2 
				OPERATOR can be either logical or string operator.

				logical operators:

					-> ==	equals
					-> !=	not equals
					-> >	higher
					-> <	lower
					-> >=	higher equals
					-> <=	lower equals

					Those operators can be used both on string and integer values (since VIM can automatically convert between those types).

				String operators
					-> =~ partial match, true if left string contains or equals right string
					-> !~ partial match, true if left string does not contain and is not equal to right string
					right hand string can be a regular expression pattern.
```

#### 47.2.4.1.4 Lists and dictionaries

```text
				To access item i in list use [] operator, mylist[i]
				for nested lists (say i,j) use mylist[i][j]

				negative inices are allowed, they are converted to positive indices as follows:
				list size is n. index -i equals index n-i (count backwards from end of list)
				for example, last index in list is -1, or n-1.
				
				Adding items to list: 
					-> calling add
					:call add(mylist, 1)

					-> list concatenation
					:let mylist= [1,2,3]+[4,5,6]

					-> extend
					:call extend(mylist, [4,5,6])
					
					Note, add interperts the argument to add as one item to add to the list while extend interperts the item as a list of items. This means that add(mylist, [4,5,6]) will result in mylist being [1,2,3, [4,5,6]] while extend call will result in [1,2,3,4,5,6].

				Remove items from list:

					-> Remove:
					:call remove(mylist, 2)
					remove item with index 2 from list.

				Dictionaries.
				:let mydict = {1:"one", 2:"two", 3:"three"}

				Accessing entries is done using [] operator with key argument.
				:echo mydict[3]

				An alterntive way to access work only if the key is all ASCII, numbers or underscores.
				:echo mydict.3

				Lists are ordered, dictionaries are not

				Change value in dictionary:
				:let mydict[3] = "tres"

				:let mydict[4] = "cuatro"
				notice that first example changed an existing entry while the second has added a new entry.

				There is a similar mechanism to Python's list comprehension that applies to dictionaries and allows to "map" a function to all the dictionary entries. See the example below:

				let mynumbers = {0:'zero', 1:'one', 2:'two', 3:'three', 4:'four',...,9:'nine'}

				And map a function:
				function mynumbers.convert(numb) dict
					return join(map(split(a:numb, '\zs'), 'get(self, v:val, "unknown")'))
				endfunction

				Note that the function name contains the name of the dictionary variable and there is a keyword 'dict' after the function arguments. This keyword is what tell VIM this is a dictionary function and allows the use of a special variable 'self'. 'self' variable is refers to the dictionary to which the function is bound. so self[1] will return 'one'. 
				The function is made of the following parts:
				-> split	Splits a:numb into an unnamed list
					e.g:
					:let a = split("one two")
					:echo a;	"This prints "one"

				-> map		Maps a given command to every element in a list (the one from split). Note, this may modify the original list.:b1

					e.g.:
					:let mylist = ["one", "two", "three"]
					:call map(mylist, "<" . v:val . ">")
					:echo mylist[0]	"This prints <one>

				-> get	Gets values from "self" where key is equal to v:val (the value from map)
					e.g.:
					:let mylist2 = ["one", "two", "three"]
					:echo get(mylist2, 2, "none") "Prints three
					:echo get(mylist2, 3, "none") "Prints none

				-> join	Joins all elements returned by the map, get, combination
					e.g.:
					:let mylist3 = ["one", "two", "three"]
					:let mystring = join(mystring,"+")
					:echo mystring	"prints one+two+three

				(you can get help on each function by :h <func name>() e.g. :h join() )

				So, translated briefly, the function takes a range of digits (a:numb) and
				splits it into individual digits, then it uses each digit as a key to look up 
				the value in the dictionary (mynumbers, references as "self"), and joins
				all the returned values into a string by putting a whitespace between the values.

				So its possible to use this dictionary as a converter from numbers to written numbers such as:
				:echo mynumbers.conver(12345)
				"one two three four five"
```

#### 47.2.4.1.5 Loops

```text
				VIM supports two loop types, for and while.
```

#### 47.2.4.1.5.1 For loops

```text
					In its simplest form:
					for var in range
						do something
					endfor

					Example:
					for myvar in range(1,10)
						echo myvar
					endfor

					for mylist = ['a','b',...,'z']
					for itemvar in mylist
						echo itemvar
					endfor
					This one will print the abc

					Looping over dictionaries is a bit more complex because the loop variable is bound to the key, not the value. Example:
					let mydict = {a: "apple", b: "banana", c: "citrus"}
					for keyvar in keys(mydict)
						echo mydict[keyvar]
					endfor

					By default the keys will not be returned in any specific order in case its important to access them sorted use helper function sort, example:
					let mydict = {a: "apple", b: "banana", c: "citrus"}
					for keyvar in sort(keys(mydict))
						echo mydict[keyvar]
					endfor
```

#### 47.2.4.1.5.2 While loops

```text
					In its simplest form:
					while condition
						do something
					endwhile

					while loop keywords are:
						-> break which ends the loop when called
						-> continue which skips the rest of loop and jumps to next iteration
```

#### 47.2.4.2 Creating functions

```text
			Syntax of simple function:
			function Name(arg1, arg2, ..., argN) keyword
				code 
			endfunction

			Note, Function name must start with a capital letter. It can only contain letters, numbers and underscores.
			VIM supports up to 20 arguments passed to a function.

			The "keyword" is a hint for VIM of how this function is supposed to be exectuted. Example:
				-> dict		The function is bound to a dictionary
				-> range	The function is called once for a range a lines and not once for 
				each line that it is called on.

				Variables inside function code are local to the function and are not valid when the function has finished executing.
				To access a value of a variable from outside the function, either pass it as an argument or refer to a global variable (g:Var)
				Note, Passing a varibale as an argument to a function is always done by value. Meaning a local copy is made and any changes to it are not updated when the function has finished executing.

				An example of a simple function:
				function PrintSum(num1, num2)
					let sum = a:num1 + a:num2
					echo "the sum is ".sum
				endfunction

				The sum is local and not updated when the function terminates. To store the sum use global variable:
				function PrintSum(num1, num2)
					let sum = a:num1 + a:num2
					echo "the sum is ".sum
					let g:sum = sum
				endfunction
				
				A usage example:
				let sum = 0
				call PrintSum(4,5)
				echo sum
				This will print 9 since the global variable is updated.

				Now, since updating global variables is not considered a good practice, vim allows a cleaner way to update values - the "return" statement.
				Example:
				function PrintSum(num1, num2)
					let sum = a:num1 + a:num2
					echo "the sum is ".sum
					return sum
				endfunction

				used as follows:
				let sum = PrintSum(4,5)
				echo sum
```

#### 47.2.4.2.1 Variable argument list

```text
				Synatx (arg1, agr2,...)
				Example:
				function PrintSum(num1, num2,...)
					let sum = a:num1 + a:num2
					let argnum = 1
					while argnum <= a:0
						let sum+= a:{argnum}
						let argnum+=1
					endwhile
					echo "the sum is " sum
					return sum
				endfunction

				"a:0" is a special varibale that stores the number of arguments that were given to the function.
				To access each of the variables use syntax, a{argnum} where argnum is the index of the argument.
				a:{} is the full list of optional arguments

				Another possible way to acheive the same is using "a:000" which passes all the optional arguments as a list. See example:
				function PrintSum(num1, num2,...)
					let sum = a:num1 + a:num2
					let argnum = 1
					for arg in a:000
						let sum+= arg
					endfor
					echo "the sum is " sum
					return sum
				endfunction

				To remove a function from current vim session do:
				:delfunction function-name

				Note, To see what a function does do:
				:function FunctionName
				To get a list of all functions do:
				:function

				Note, there are a lot of pre-existing helper funciton in VIM. To get a list of them do:
				:h function-list
```

#### 47.2.4.2 Script structure

#### 47.2.4.2.1 Header

```text
				An example:
" myscript.vim			: Example script that does this and that...
" version			: 1.0.0
" Maintainer			: Yosi Izaq, izaqyos@gmail.com
" Last Modified			: 12/02/2008
" License			: This script is release under the VIM license.
```

#### 47.2.4.2.2 Was Script loaded check

```text
				It is a good practice to check if the script has already been loaded, and if it has, then unload the function before continuing. This is a good check because the script is not only installed globaly on the system but also on the user's own VIMHOME.
				Example check:
				if exists("loaded_myscript")
					finish "Stop loading script"
				endif
				let loaded_myscript=1

				In some cases its not the best choice to just stop loading the script, because the user might have changed his version of the script (the one in VIMHOME). So instead of calling finish its possible to unload the functions and let the script create the again. This can looks like:
				if exists("loaded_myscript")
					delfunction	myGlobalFunctionA
					delfunction	myGlobalFunctionB
					delfunction	myGlobalFunctionC
					...
				endif
				let loaded_myscript=1

				Note, The user or may or may not be in "compatible" mode (compatibel to VI), so it may be a good idead to store the user's compatible mode, while in script. This makes it posisble to 
```

#### 47.2.4.2.3 Configuration

```text
				Generally a good place for configuration settings is the start of the script, for this is where a user of a script will look for them first.
				A user of the script may want to change the settings in his vimrc file, and so the script must make sure not to overwrite those settings. To do this the script has to check that the settings do not already exist prior to setting them.
				Example:
				" variable myscript_path
				if !exists("myscript_path")
					let s:vimhomepath = split (&runtimepath, ',')
					let s:myscript_path = s:vimhomepath[0]."/plugin/myscript.vim"
				else
					let s:myscript_path = myscript_path
					unlet myscript_path
				endif

				" variable myscript_indent
				if !exists("myscript_indent")
					let s:myscript_indent = 4
				else
					let s:myscript_indent = myscript_indent
					unlet myscript_indent
				endif

				The example sets two configuration values - myscript_path and myscript_indent.
				It checks to see if they exist, and if not, it sets the default values in the script scope variable name (e.g. s:myscript_indent). If the user has already defined the variables, then this value is assigned to the script scope variable of the same name. Finally, the user-defined variable is removed with unlet, so it does not float around in global scope with no porpuse.
```

#### 47.2.4.2.4 Mappings

```text
				Key mappings, either for calling functions, setting variables etc.
				The same principle as with configuration applies here, the mappings may have already been defiened so a check is required.
				Example:
				if !hasmapto('<Plug>MyscriptMyfunctionA')
					map <unique> <Leader>a <Plug>MyscriptMyfunctionA
				endif

				Explanation:
				-> hasmapto(), Function that checks if a mapping to a function already exists
				-> <unique>, This instructs VIM to give an error if a similar map exists
				-> <Leader>, Lets the user decide which map leader to use. <Leader> is replaced by the contents of the global variable mapleader
				-> <Plug>, This is a way to make a unique global identifier for a function

				-> The example checks if some mapping is already made for the unique function identifier <Plug>MyscriptMyfunctionA. If a map does not exist, then <Leader>a is mapped to the indentifier-unleas <Leader>a is already used and VIM instead gives an error.

				-> <Plug>MyscriptMyfunctionA maps to the actual function MyfunctionA() in the script as follows:
				noremap <unique> <script> <Plug>MyscriptMyfunctionA <SID>MyfunctionA
				noremap <SID>MyfunctionA :call <SID>MyfunctionA()<CR>

				The first mapping maps our unique <Plug>MyscriptMyfunctionA identifier to <SID>MyfunctionA. We use <SID> here, because this tag is exchanged with VIM's own unique ID for this script, and this is needed if we want to make a global mapping to a function that is only available in script scope (e.g. MyfunctionA).
				The second mapping binds the actual function (<SID>MyfunctionA(), which is s:MyfunctionA()) to the global mapping <SID>MyfunctionA.

				-> So what happens is when \a (having mapleader set the default "\"), then the first mapping translates this into <Plug>MyscriptMyfunctionA. This is defined in the script and hence the <SID> is now has the right value. Therefore <Plug>MyscriptMyfunctionA is again translated into <SID>MyfunctionA which is finally mapped to the actual call fo the local function s:MyfunctionA().

				-> All this sounds a bit complicated and a bit too much, but when your script contains functions with common names such as Add(), Delete() etc. its a must in order to prevent mapping conflicts.

				-> For further information see:
				:help <SID>
				:help <Plug>
				:help 'script-local'
```

#### 47.2.4.2.5 Functions

```text
				Note, Unless a function is absolutely required in global scope, its best to put it into the script scope with s:.
				Example
"Local function with a mapping
function s:MyfunctionA()
		echo "Hello world from script scope function MyfunctionA"
endfunction

"This is a global function that can be called by anyone
function myGlobalFunctionB()
	echo "Hello world from global scope function myGlobalFunctionB"
endfunction

"This is another global function that can be called by anyone
function myGlobalFunctionC()
	echo "Hello world from global scope function myGlobalFunctionC(), now calling localy:"
	call <SID>MyfunctionA()
endfunction

The first function is a private function, only available in the script scope, while the two others are both available from global scope. Note, how its possible for one of the global functions to call the local function because it knows the correct SID for the current script.
```

#### 47.2.4.2.6 Putting it all together

```text
An skeleton example of a VIM script:

" myscript.vim			: Example script that does this and that...
" version			: 1.0.0
" Maintainer			: Yosi Izaq, izaqyos@gmail.com
" Last Modified			: 12/02/2008
" License			: This script is release under the VIM license.


"Check is script was already loaded
				if exists("loaded_myscript")
					finish "Stop loading script"
				endif
				let loaded_myscript=1
"Configuration

				" variable myscript_path
				if !exists("myscript_path")
					let s:vimhomepath = split (&runtimepath, ',')
					let s:myscript_path = s:vimhomepath[0]."/plugin/myscript.vim"
				else
					let s:myscript_path = myscript_path
					unlet myscript_path
				endif

				" variable myscript_indent
				if !exists("myscript_indent")
					let s:myscript_indent = 4
				else
					let s:myscript_indent = myscript_indent
					unlet myscript_indent
				endif

" Functions

"Local function with a mapping
function s:MyfunctionA()
		echo "Hello world from script scope function MyfunctionA"
endfunction

"This is a global function that can be called by anyone
function myGlobalFunctionB()
	echo "Hello world from global scope function myGlobalFunctionB"
endfunction

"This is another global function that can be called by anyone
function myGlobalFunctionC()
	echo "Hello world from global scope function myGlobalFunctionC(), now calling localy:"
	call <SID>MyfunctionA()
endfunction

For further information, check vim help:
:h 'write-filetype-plugin'
:h 'write-compiler-plugin'
:h 'write-library-plugin'
```

### 47.2.5 Scripting Tips

#### 47.2.5.1 gvim or vim?

```text
			Some additional features are only available in gvim (like menus, toolbars, tabs etc).
			To check in your script whether or not gvim is running you can use the has function which returns true if a given feature is supported.
			Example:
			if has("gui_running")
				"execute gui only commands here
				"...
			endif

			Note, use :h 'feature-list' for a complete list of features that its possible to check with has()
```

#### 47.2.5.2 Which operating system?

```text
			Determine which OS for making corresponding code.
			if has("win16") || has("win32") || has ("win64") || has ("win95") 
				"Windows OS, do windows code here
			elseif has("unix")
				"do Linux/unix things ere
			endif
```

#### 47.2.5.3 Which VIM version?

```text
			Vim has deloped a lot and so has many versions with old versions missing functionality existing in newer versions. So any script should at least check for older versions of VIM and stop executing if that's the case. An even better option is to execute compatible code for each older version.

			VIM version numbers are made of three fields:
			-> Major number (e.g. 7 for VIM version 7)
			-> Minor number (e.g. 1 for VIM 7.1)
			-> Patch number (e.g. 123 for VIM 7.1.123)

			Code that checks version looks like:
			if v:version >= 702 || v:version >= 701 && has("patch123")
				"Code is done only for version 7.2 or 7.1.123
			endif
```

#### 47.2.5.4 Printing longer lines

```text
			Since VIM was created for old text terminal it has a limitation on line length of 80 characters (by default). This means that echo statements for printing lines longer than 80 chars will prompt "please press enter" message to see the rest of the line. To avoid that its neccessary to increase the line length, see example:
			"WideMsg() prints (long) message up to (&columns -1) length
			funcion! WideMsg(msg)
				let x=&ruler | let y=&showcmd
				set noruler noshowcmd
				redraw
				echo a:msg
				let &ruler=x | let &showcmd=y
			endfunction

			Usage:
			:call WideMsg("Loooooong line of text...")


"
```

### 47.2.9 Debugging scripts

#### 47.2.9.1 Start VIM in debug mode

```text
			Add -D flag,

			vim -D file

			Debug sessions will start with VIM reading the first vimrc file

			Alternately, its possible to start VIM debug at a certain known point:
			-> For a function
			:debug call Myfunction()

			-> file/script
			:debug read script_file_name

			-> mapping
			:debug nmap ,a :call Myfunction() <CR>

			->help topic
			:debug help :debug
```

#### 47.2.9.2 Debug Session

```text
			c, cont:	Continue running
			q:		Quit debugging session without executing the remaining lines
			s, step:	Step into file/function
			n, next:	Execute current line/function and continue to next one
			f, finish:	Continue executing the script without stopping on breakpoints. Continue debugging remaining scripts (if any).
```

#### 47.2.9.3 Breakpoints

#### 47.2.9.3.1 Add

```text
				-> Function
				breakadd func linenum functionname

				Note, the function name can be a pattern, such as MyFunc*, this will add breakpoints to all functions whose names match the pattern.

				-> File, line
				breakadd file linenum filename

				-> Current line
				breakadd here

				-> From command line
				vim -D -c 'breakadd file 15 */.vimrc' 
```

#### 47.2.9.3.2 Revise

```text
				get a list of breakpoints:
				:breaklist
```

#### 47.2.9.3.3 Remove

```text
				-> By breakpoint number (from :breaklist)
				:breakdel number

				-> Function
				breakdel func linenum functionname

				Note, the function name can be a pattern, such as MyFunc*, this will add breakpoints to all functions whose names match the pattern.

				-> File, line
				breakdel file linenum filename

				-> Current line
				breakdel here

				-> All breakpoints
				breakdel *
```

### 47.2.10 Distributing scripts

```text
		Either is a single .vim script or, if multiple files are required, as a compressed archive with paths related to VIMHOME like:
		VIMHOME/plugin/myscript.vim
		VIMHOME/syntax/mylang.vim
		VIMHOME/doc/myscript.txt
```

### 47.2.11 Making Vimballs

```text
		To create a vimball:
		:[range]MKVimball filename.vba

		The procedure is as follows:
		-> run :enew to open a new empty buffer
		-> In this buffer add the paths to all the files (one per line) relative to your VIMHOME
		example:
		plugin/myscript.vim
		syntax/mylang.vim
		doc/myscript.txt

		-> Now execute the vimball command for the above range of lines.
		For example, go to first line and use shift-v to select all line with paths on.
		Now execute:
		:MKVimball myscript.vba
```

### 47.2.12 Documentation

```text
		Vim documentation is in the form of text files with some special markup.

		First line must start with * as the first char and look something like:
*docname.txt* single line of description

		The typically, longer description, credtits and a table of contents.
		Every markup work is between *.

		-> Examle, *myscript-intro* when added to introduction section will allow :help 'myscript-intro'
		to jumt right to this section

		-> Adding ~ after a word marks the line with a different color then the rest of the text, example:
		overview~

		-> words marked with || will tell VIM to create a link to the same word marked with *. Example

		|myscript-intro| in table of contents will create a link to *myscript-intro* section. To jump to links when reading help use ctrl-]

		-> Text sorrounded with <> is considered as source code

		To install the documentation the user needs to perform :helptags /path/to/doc/dir
```

### 47.2.13 External Interpretrs

```text
		Support for external interpertes is not builtin in VIM and you'll have to compile VIM to get it or get a precompiled package.

		To check which interpertrs your installed VIM supports run:
		$ vim --version
		and check for + or - prefix for python, perl and ruby.
		+, supported
		-, not supported

		Or when VIM is opened:
		:echo has("language name")
		returns 1 if the language is supported.
```

#### 47.2.13.1 Perl scripting in VIM

#### 47.2.13.2 Python scripting in VIM

#### 47.2.13.3 Ruby scripting in VIM

## 47.3 Learn scripts from examples

### 47.3.1 foo.vim

```text
	47.4
```
