---
type: reference
title: Tip 1577 Record a recursive macro
description: "Vim tip: Tip 1577 Record a recursive macro"
tags: [tips, vim, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.57"
---

# 33.57 Tip 1577 Record a recursive macro

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

```text
	Often, when dealing with a data file in text format (e.g. csv), we need to massage the data to modify, filter or rearrange it. Using a clever trick to recursively use Vim's complex repeats (i.e. "macro recording"), such tasks can be done easily without having to be a REGEXpert.

	Let's say we have a text file with the following contents:

	dr-------- 20906
	drwx------ 20913
	drwxr-x--- 20704
	drwxr-xr-x 21104
	lrwxrwxrwx 20606
	-------r-- 21004
	-rw-r----- 20716
	-rwxrwx--- 21102

	For some reason, we want to move the 5-digit number at the end of the line to after the last "r" character on the same line, and we want to repeat it for the whole file. Notice that all these numbers begin with "2" and there can be multiple "r" per line.

	Here's the end-result that we want:

	dr20906--------
	dr20913wx------
	drwxr20704-x---
	drwxr-xr21104-x
	lrwxrwxr20606wx
	-------r21004--
	-rw-r20716-----
	-rwxr21102wx---

	Yes, this can be done via :substitute with back references (Try: %s/\v(.+r)(.+)\s(\d{5})/\1\3\2/), but that can be intimidating for some. An easier, more flexible and often quicker method to accomplish the same task is to use "complex repeats", which really aren't too complex.

	Here's how:

	   a. Place the cursor on the first character of the first line of the file.
	   b. Hit the following keys to record the repeat-sequence:
qqq : Start and immediately end recording for register q -- this essentially empties register q
* qq : Start recording actions into register q
* f2 : Find the "2" character to the right on this line (cursor will jump there)
* D : Delete and yank the 5-digit number into memory (rest of line)
* Fr : Find the "r" character to the left on this line (cursor will jump to the last "r")
* p : Paste the number that was yanked earlier after the "r" character
* Enter : Move the cursor to the next line
* @q : Execute the contents of register q (itself!), which is for now, empty, so nothing will happen. The trick here is that when we run it again with "@q" after you have ended the recording, it will call itself after processing each line! This recursive loop will process all the subsequent lines in that file, until it hits the end-of-file. This is the essence that makes complex repeats so flexible and powerful.
* q : End the recording 
c. Hit @q to apply the same manipulation to the rest of the file from the 2nd line onwards. Enjoy the art of flying cursor and automatic text manipulation on your screen. 

With this knowledge, you can now quickly perform complex editing of any structured text with relative ease.

This works much the same way as typing 9999@q to execute the 'q' register as many times as the count you pass, except that you do not need to think about the size of your file before doing so to make sure enough 9s are added.
Normally, a macro recorded in this way will repeat until it reaches the end of the file. But, you can easily take advantage of the fact that a macro will stop running if it encounters an error to end the recursion when you want. For example, suppose you have a list of file names (perhaps you obtained it with :r !ls *.c), and you want to verify that every one of these file names occurs in another buffer (a makefile, for instance). You could do this quickly and easily as follows:

* Format the file list to one file name per line, with each file name starting at beginning of the line
* Split a new window with the file you wish to contain all the file names (for a total of two windows)
* Position the cursor on the first line of the file list
* Record a recursive macro as follows: 

qfq
qf
0y$
<c-w>w
/\V<c-r>"<cr>
			<c-w>w
			j@f
			q

			The result is that register 'f' contains a macro that will search for every line of the list of file names, until it reaches the end of the list of file names or until it encounters an error such as "pattern not found: {filename}". If you run this macro on the file list, you will either see each file name highlighted in turn until the end of the list, or you will see a pattern not found error and (if 'hlsearch' is on) the missing file will be highlighted in the list.

			If you don't wan't to rely on an error in this way to end the recursion, you could also do :if cond | exe 'normal @q' | endif instead of @q while recording the macro to provide a base case to end the recursion.

			-> Adding recursion to an existing macro

			Forget to add the recursion as a final step, or want to debug first before running the macro on every line in the file? An easy solution is, after you have the macro doing everything but the recursive call, just append it to the register. Assuming that you've recorded the macro into the 'q' register, just do this:

			qQ
			@q
			q
```
