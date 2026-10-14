---
type: reference
title: Ranges tutorial
description: "Vim tip: Ranges tutorial (Examples, Default Range, Selections)"
tags: [tutorial, vim, tips, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.46"
---

# 33.46 Ranges tutorial

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

```text
Tip 1611 

A range permits a command to be applied to a group of lines in the current buffer. For most commands, the default range is the current line. For example:

    * :s/old/new/g   changes all old to new in the current line
    * :11,15s/old/new/g   changes lines 11 to 15 inclusive
    * :%s/old/new/g   changes all lines 
```

### 33.46.1 Examples

```text
A range can be specified using line numbers or special characters, as in these examples:
|Range 	|Description					|Example
-------------------------------------------------------------------------------
|21 	|line 21 					|:21s/old/new/g
|1 	|first line 					|:1s/old/new/g
|$ 	|last line 					|:$s/old/new/g
|. 	|current line 					|:.w single.txt
|% 	|all lines (same as 1,$) 			|:%s/old/new/g
|21,25 	|lines 21 to 25 inclusive 			|:21,25s/old/new/g
|21,$ 	|lines 21 to end				|:21,$s/old/new/g
|.,$ 	|current line to end 				|:.,$s/old/new/g
|.+1,$ 	|line after current line to end			|:.+1,$s/old/new/g
|.,.+5 	|six lines (current to current+5 inclusive) 	|:.,.+5s/old/new/g
|.,.5 	|same (.5 is interpreted as .+5)		|:.,.5s/old/new/g

The :s/// command substitutes in the specified lines. The :w command writes a file. On its own, :w writes all lines from the current buffer to the file name for the buffer. Given a range and a file name, :w writes only the specified lines to the specified file. The example above creates file single.txt containing the current line.

If you know you want to substitute in six lines, starting from the current line, you can use either of the ranges shown above. An easier method is to enter a count value (type 6), then enter the colon command with no range (type :s/old/new/g). Because you entered a count, Vim displays the command:

:.,.+5s/old/new/g
```

### 33.46.2 Default Range

```text
For most commands, the default range is . (the current line, for example, :s/// substitutes in the current line). However, for :g// and :w the default is % (all lines).
Example 	Equivalent 	Description
:s/old/new/g 	:.s/old/new/g 	substitute in current line
:g/old/ 	:%g/old/ 	list all lines matching old
:w my.txt 	:%w my.txt 	write all lines to file my.txt
```

### 33.46.3 Selections

```text
A command like :123,145s/old/new/g substitutes in lines 123 to 145 inclusive, but what if you're not sure what the line numbers are? One method is to use marks: Type ma in the first line, then type mb in the last line (to set marks a and b). Then enter command :'a,'bs/old/new/g to substitute in lines from mark a to b, inclusive.

Another method is to visually select lines, then enter a colon command (for example, :s/old/new/g). Note that you do not enter a range. However, because the command was entered while lines were selected, Vim displays the command as:

:'<,'>s/old/new/g

The range '<,'> is entered automatically to identify the lines that were last visually selected (they do not need to be visually selected now).

For example, you might type vip to visually select "inner paragraph" (the paragraph holding the cursor). Then type :s/old/new/g to substitute in all lines in the selected paragraph. 
```

### 33.46.4 Deleting, copying and moving

```text
Ranges work with Ex commands (those typed after a colon, for example, :w). As well as the commands we've seen so far, it's handy to know how to use :d (delete lines), :t or :co (copy lines), and :m (move lines).
Command 	Description
:21,25d 	delete lines 21 to 25 inclusive
:$d		delete the last line
:1,.-1d 	delete all lines before the current line
:.+1,$d 	delete all lines after the current line
:21,25t 30 	copy lines 21 to 25 inclusive to just after line 30
:$t 0		copy the last line to before the first line
:21,25m 30 	move lines 21 to 25 inclusive to just after line 30
:$m 0		move the last line to before the first line

The line numbers in a command are those before the command executes. In the earlier example which moved lines 21..25 to after 30, the "30" refers to the line number before the move occurred. 
```

### 33.46.5 Ranges with marks and searches

```text
In a range, a line number can be given as:

    * A mark (for example, 'x is the line containing mark x).
    * A search (for example, /pattern/ is the next line matching pattern). 

When using a mark, it must exist in the current buffer.
Command 	Description
:'a,'bd 	delete lines from mark a to mark b, inclusive
:.,'bd		delete lines from the current line to mark b, inclusive
:'a,'bm 0 	move lines from mark a to b inclusive, to the beginning

Here are some examples using searches:

:.,/green/co $
    copy the lines from the current line to the next line containing 'green' (inclusive), to the end of the buffer 
:/apples/,/apples/+1s/old/new/g
    replace all "old" in the next line in which the "apples" occurs, and the line following it 
:/apples/;.1s/old/new/g
    same (.1 is .+1, and because ; was used, the cursor position is set to the line matching "apples" before interpreting the .+1) 
:/apples/,.100s/old/new/g
    replace all "old" in the next line in which "apples" occurs, and all lines up to and including 100 lines after the current line (where the command was entered) 

Even more tricks are available; see :help cmdline-ranges. Summary:
Item		Description
/pattern/ 	next line where pattern matches
?pattern? 	previous line where pattern matches
\/		next line where the previously used search pattern matches
\? 		previous line where the previously used search pattern matches
\& 		next line where the previously used substitute pattern matches
0;/that 	first line containing "that" (also matches in the first line)
1;/that 	first line after line 1 containing "that" 
```
