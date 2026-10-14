---
type: reference
title: The status line
description: "Legacy vim KB section: The status line"
tags: [vim, legacy, reference]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#40"
---

# The status line

[↑ KB_vi](/vi/kb-vi/README.md)

```text
:set statusline format
where format is a printf-like string (known from C programming) that describes
how the status line should look.
If you look in the Vim help system by typing :help 'statusline', you will see that
the status line can contain a wide variety of pieces of information, some more useful
in your daily work than others.

My status line always contains information about:
Name of the file that I am editing
Format of the file that I am editing (DOS, Unix)
Filetype as recognized by Vim for the current file
ASCII and hex value of the character under the cursor
Position in the document as row and column number
Length of the file (line count)
The following command will turn your status line into a true information bar with
all the above information:
:set statusline=%F%m%r%h%w\ [FORMAT=%{&ff}]\ [TYPE=%Y]\ [ASCII=\%03.3b]\
[HEX=\%02.2B]\ [POS=%04l,%04v][%p%%]\ [LEN=%L]
I have added a '[ ]' around each of the pieces of information, so that it is easier to
distinguish them from each other. This is purely to give a visual effect and can be left
out if necessary.

However, we now see that the status line still shows the old non-informative status
line, as in the default installation. This problem occurs because Vim, by default, does
not show the status line at all. Instead, it just shows the command buffer with a little
bit of information in it. To tell Vim that you would like to have a real status line
shown, you will have to add the following setting to your vimrc file. This command
will make sure that your status line is always shown as the second last line in the
editor window:
:set laststatus=2
You will now see that the command buffer gets a place of its own in the last line of
the editor window. This way there's always room for the status line and you will
always have information about the file right in front of you. The status line does of
course take up some of the editing area, but it is then up to you to decide whether it
should be shown or not. You can always remove it for the rest of the editing session
by executing the following command from within Vim:
:set laststatus=0
```
