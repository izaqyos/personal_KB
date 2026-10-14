---
type: cheatsheet
title: "Keyboard shortcuts, command line options, shell prompt shortcuts"
description: "Bash keyboard shortcuts, command-line options and prompt shortcuts."
tags: [bash, legacy, shell, cheatsheet, tips]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "bash/KB_bash#7"
---

# Keyboard shortcuts, command line options, shell prompt shortcuts

[↑ KB_bash](/bash/kb-bash/README.md)

## 7.1 Ctrl, alt combos

```text
#) Using Ctrl combination :
ctrl+a : jump to begning of line you are typing on ;
ctrl+b : moving back a character ;
ctrl+c : terminate the command;
ctrl+d:delete character at cursor;
ctrl+D : exit the current shell;
ctrl+h : delete character before cursor ;
ctrl+e : jump to end of line you are typing on ;
ctrl+f : move forward by one character ;
ctrl+l : clear the screen :
ctrl+K : clear the line after cursor ;
ctrl+H : works as backspace ;
ctrl+t : transpose 2 characters ;
ctrl+xx : move between end-of-line and current cursor position ;
ctrl+r : search the history backwords ;
ctrl+w : erase word before cursor ;
ctrl+x@ : shows possible hostname completions;
ctrl+y : recover previous deleation ;
ctrl+z : suspend/stop the command which is running ;

#) UsingAlt combination :
Alt + > - Move to the last line in the history ;
Alt + ? - Show current completion list ;
Alt + * - Insert all possible completions ;
Alt + / - Attempt to complete filename ;
Alt + . - Yank last argument to previous command ;
Alt + b - Move backward ;
Alt + c - Capitalize the word ;
Alt + d - Delete word ;
Alt + f - Move word forward ;
Alt + l - Make word lowercase ;
Alt + n - Search the history forwards non-incremental ;
Alt + p - Search the history backwards non-incremental ;
Alt + r - Recall command ;
Alt + t - Move words around ;
Alt + u - Make word uppercase ;
Alt + back-space - Delete backward from cursor ;

#) Using Esc combination :
esc+d : delete word ;
esc+f : move forward a word ;
esc+b : mmove backward a word ;
esc+t : transpose two adjacent words ;
#) Using Tab combination :
*)Press tab twice to see all available commands;
*)Press tab twice after a word to view all commands starting with that word ;
*)Pressing ~along with hitting tab 2 times will give you list of all user on system from /etc/passwd;
*)Pressing $along with hitting tab 2 times will show you all sys variables ;
*)Pressing / along with hitting tab 2 times will give you entire directory structure including hidden ;
*) To complete a command you can hit the tab key after typing one or more letters of a command.
*) you can use ! along with first few character of previous command to get previous command fired;
eg; if you have used ifconfig sometime back then you can use !if to fire that command once again. 
```

## 7.2 History shortcuts

```text
<URL:#r=__bash_prompt_history1>
<URL:#r=__bash_prompt_history2>

	7.3
```
