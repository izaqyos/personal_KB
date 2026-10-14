---
type: reference
title: Vim presentations
description: "Legacy vim KB section: Vim presentations (presentation to team, redit discussion as preparation, presentation structure)"
tags: [vim, legacy, reference]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#76"
---

# Vim presentations

[↑ KB_vi](/vi/kb-vi/README.md)

## 76.1 presentation to team

```text
    20/10/22 17:27:26  
```

### 76.1.1 redit discussion as preparation

```text
https://www.reddit.com/r/vim/comments/y854zj/best_selling_features_of_vim_for_programmers/
```

#### 76.1.1.1 Buffers! ... and modes!!

```text
I think one problem with listing features is just that, listing features. It just becomes another program you compare lists of features. This does not really show how Vim works and the appeal of it. I like the way to think in Vim with the modes and commands and how the compose them together.

In example fg to jump to "g" character on the line, and then cvfg (Edit: I am little embarrassed. I meant vfgc.) to enter into visual selection mode for changing the selection, that is from current position to "g" character. And this whole logic of commands and composition throughout the entire program and feature sets is one of the primary reason why I love using Vim so much. Plus off course that I can do a lot of stuff with keyboard only (still using mouse too!).

So just listing features does not Vim justice. It is the way how you can combine these features that makes it really powerful. In example you can combine repetition of operations with macros and marks, buffers and Vim windows.
--
It is not just to see the change, but I can adjust it further. In example with ; to jump to next occurence of "," (or "g").
```

#### 76.1.1.2 I really like the IntelliJ vim extension.

```text
                If you can demo in there, and show a .ideavimrc config that binds editor functions to keymaps, then you will be showing an approachable entry into vim experience. Not every feature of vim is supported, but a lot are, including macros, marks, find/replace.

Personally, I've never liked the vscode vim extension though (It seems to stay in insert mode when I would otherwise expect it to switch back to normal mode, which I found hard to deal with)

            76.1.1.3 I wouldn't try to show that vim can do anything their IDEs can. If that was the only competition, they'll most likely stay with their IDE. I'd show various editing in normal mode, and the power of text objects. Maybe an example of some advanced editing of lots of similar, but not identical lines, using a macro (I find recording the macro is a fun sort of meta programming, and then the rewars when repeating it with N@q).

            76.1.1.4 Pretty much this. I also find that a lot of times it's the smaller things / script editing that really showcases how much power Vim has. Some examples:

It could be something as simple as needing to do a quick and dirty refactor/edit on some code and my macro did it in literally no time. Because it's a relatively complex refactor, it would be hard to use builtin IDE features, and too cumbersome to write scripts to do it for you. I could also easily edit the Vim macro (it's just in the register) if I found a bug and just redo it.

There was one time a coworker had a super time-sensitive investigation to figure out why a config file wasn't working, and I helped him figure it out just by opening it in my Vim and doing :set list and found all the places where spaces were somehow mistyped as non-breaking whitespace (nbsp) in some copy-pasting error.

My last job often required SSH-ing into a remote device and following logs by doing something like ssh <some_machine>; tail -F /var/logs. It's just kind of a PITA, but with Vim terminal you can do that in Vim terminal to get live updates of the logs, and when need be, you can quickly filter out lines using something like :v/my_feature:/d or do quick navigation in the log file, whereas others would still be trying to download the log file, open in a text editor, etc. (This also answers the frequent "why does Vim have a terminal" question btw)

There are times where say I want to process 40 files with some shell commands and string them together. You could write a Bash script to do it but it takes forever to debug, or you could write a proper Python one which takes even longer, or you could just painstakingly type out all 40 lines of Bash commands with some bugs in them. Meanwhile, with Vim I can easily string together those 40 lines using all sorts of tools (macros, :put =range(1,40) to generate 40 lines of numbers, visual block, search-and-replace, etc) and just paste them into the shell.

Those examples all have alternative means to accomplish but I always find that they would have taken much longer, and are hard to do with existing tooling since these situations come up regularly but are always kind of ad-hoc. It's harder to convince someone just on raw IDE functionality because honestly that's a high bar if the IDE has code completion, proper semantics-based code highlighting, etc and you need to get a souped up Vim with LSP support just to have some feature parity. It's easier to convince someone why Vim is powerful first, and then see if they want to do the work to make it work for their workflow for coding etc and learn the editor. And honestly, even though I love using Vim, I see no problem of using IDE for regular coding if they work better in the environment.

Those situations do require you to have a good baseline Vim knowledge though, as they just kind of come up. If you have to spend 30 minutes to research how to do it in front of your coworkers just to save 10 minutes of time that's not so impressive.

For a prepared demo, perhaps try jotting down personal notes to see what actually came up that you felt was impressive (or when other people just went "how did you do that?" when seeing you code), so you can have a list of real examples that you encountered during editing your code base.

            76.1.1.5
        76.1.2


            76.1.2.1
```

#### 76.1.2.1 neat tips and tricks

#### 76.1.2.1.1 reverse file

```text
	:g/^/m 0
```

#### 76.1.2.1.2 sort file

```text
Sort entire file	!G sort
or			:%!sort
```

#### 76.1.2.1.3 generate lines with incrementing numbers

```text
:put = range(1,100) 
```

### 76.1.3 presentation structure

#### 76.1.3.1 vim history

```text
ed -> ex -> vi (1978 - bundled w/ unix distros) -> vim (1991) 

why the name vi?
in ex editor, going to full screen mode you type visual :) 
```

#### 76.1.3.2 vim philosophy

```text
vim has 12 different editing modes, 6 of which are variants of the 6 basic modes.[35] The most important modes are:
Normal mode – used for editor commands. This is also the default mode, unless the insertmode option is specified.
Visual mode – similar to normal mode, but used to highlight areas of text. Normal commands can be run on the highlighted area, for instance to move or edit a selection.
Insert mode – similar to editing in most modern editors. In this mode, buffers can be modified with the text inserted.
Command-line or Cmdline mode – supports a single line input at the bottom of the Vim window. Normal commands (beginning with :), and some other keys for specific actions (including pattern search and the filter command) activate this mode. On completion of the command, Vim returns to the previous mode.
```

#### 76.1.3.3 vim history reference 1 - https://gist.github.com/lettertwo/813e765a9f68127b0807d1d6619c5ab0

```text
Philosophy of Vim
most of programming time is spent editing, not writing.
editing is a process of manipulating text in ways beyond just writing, such as deletion, replacement, reordering, duplication, formatting, etc.
since writing (input) is a relatively small part of the whole of programming, making the other tasks easier by default can be a productivity win.
os shortcuts for editing can't get 'shadowed' by custom actions, since they take the form of commands in 'normal' (command) mode
A Modal Editor
Command Mode
You will almost always be in this mode, so much so that it is useful to think of this mode as the 'normal' mode. In fact, Vim calls it Normal Mode. In general, the other modes can be thought of transitional or temporary–you are always in the process of returning to Command Mode.

Return to Command Mode by pressing esc (or ctrl+c).

A Repertoire of Movements
Command Mode is centered on the concept of 'movements'

Basic movements:
left: h
down: j
up: k
right: l
WTF hjkl???

There are apparently historical reasons for this–early terminals often lacked arrow keys. However, a side affect of this is that the most common movement comes without having to even leave the 'home row'

Word boundary movements:
next word: w
end of word: e
beginning of word: b
Grouping movements:
beginning of line: ^
end of line: $
next paragraph: }
previous paragraph: {
matching bracket: %
targeted movements:
move to next occurrence of the current word: *
move to previous occurrence of the current word: #
move (un)til character: t<char>
move back (un)til character: T<char>
move to found character: f<char>
move back to found character: F<char>
move to match: /<regex>
move back to match: ?<regex>
move to next occurrence of a match: n
move to previous occurrence of a match: N
Insert Mode
This mode works the way text editing works throughout the OS. Same shortcuts (cmd+c, cmd+p, etc), same movements (arrow keys, page up/down, ctrl+a, ctrl+e, etc).

There are many movement commands that can result in switching to Insert Mode:

insert: i
insert after: a
insert at the start of the line: I
insert at the end of the line: A
insert on new line: o
insert on new line above: O
substitute: s
change: c
Visual Mode
A mode for creating selections. It's a modified version of Command mode, where commands either result in modifications to a selection range, or perform an editing task on the selection.

To enter Visual Mode (starting from Command Mode):

v to select by character
V to select by line
While in visual mode, most movement commands can be used to expand or contract the selection. Commands that make edits do so on the current selection, and automatically switch to either Command Mode or Insert Mode, depending on the command. For example, pressing i

A Language of Text Editing
Command Mode presents a sort of "language" that allows describing text editing tasks with combinations of commands. Many commands can be conveniently thought of as the "verbs", "nouns" and "prepositions" that make up the "language".

Examples of "verbs":
change (c)
replace (r)
substitute (s)
delete (d)
yank (y)
put (p)
WTF 'change', 'replace', AND 'substitute'? aren't these all the same thing?

Nope!

Change deletes everything in the next movement and puts you in Insert Mode (though with a selection, it behaves like substitute).
Substitute immediately deletes the current character (or selection) and puts you in Insert Mode.
Replace never enters Insert Mode at all, but just replaces the current character (or every character in a selection) with the provided character.
Examples of "nouns":
word (w)
end (e)
beginning (b)
"Nouns" can be any of the available movements!

Examples of "prepositions":
inside (i)
around (a)
(un)til (t)
WTF i thought i and a were insert commands!

Many Vim commands expect to be appended with a movement. When waiting for that movement, the command is 'pending', during which time "prepositional" commands become available. So, when a command like d (delete) is entered, nothing will happen because the command is 'pending' a movement. Pressing i next won't enter Insert Mode, as you might expect when starting out. In fact, it will leave the command 'pending', because i in this context is the 'inside' command, which requires a subject (such as w) to complete the movement!

You can combine these parts of the "language" to perform editing tasks:

delete to the end of a word: dw (or de)
delete the current word: diw
yank to the end of word: ye
change inside parentheses: ci) (or ci()
delete around brackets: da] (or da[)
There are many other ways to combine commands. For example:

delete 3 words: d3w (or 3dw)
change a visual selection: v<movement>c
yank the next 5 characters: y5l (or 5yl)
auto-indent inside a block: =i} (or =i{)
delete back through the word 'foo': d?foo
duplicate this line plus the 3 lines above:y3kp
replace the entire document with a bunch of Qs: ggvGrQ
Tips & Tricks
repeat the last command with .
undo with u
redo with ctrl+r
jump to top of the document with gg
jump to the bottom with G
jump to a line number with <number>G
Some commands can be performed on the current line by repeating them:
delete the current line: dd
change the current line: cc
yank the current line: yy
remap CAPSLOCK to ESC
open the key binding resolver in Atom (cmd+.) to learn what various keys do.
```

#### 76.1.3.4 https://dev.to/gypsydave5/the-unix-way-or-why-you-actually-want-to-use-vim-3n8p

```text
unix philosophy: Write programs that do one thing and do it well.

power of pipes:
$ls | sort -r 
cat | pbopy 
$ cat test/unit/cdm/resources/page_section_text_mismatch.json | jq '.payload'

vim supports pipes as well 
:%! sort -u 
:%! jq '.'
            76.1.3.5

77. 
```
