---
type: reference
title: recording commands.
description: "Legacy vim KB section: recording commands. (simple usage, another suggestion, yet another suggestion)"
tags: [vim, legacy, reference]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#21"
---

# recording commands.

[↑ KB_vi](/vi/kb-vi/README.md)

## 21.1 simple usage

```text
	:nnoremap <space> @q

	Start recording keystrokes by hitting 'qq'.
	End recording with 'q'  (<esc> q if you're in insert mode).
	Play keystrokes by hitting space.
	---
	Refs:
	    :help register
	        :help record 
```

## 21.2 another suggestion

```text
	  :noremap Q @q

	  This allows playback of the recording that was put into the q register.
	  Example of recording and playback usage:

	  a. Begin recording keystrokes by typing "qq".
	  b. Perform your customized keystrokes.
	  c. To end recording, type

	             "q" in normal/visual mode
		       Ctrl-o + "q" in insert mode

          d. To playback recording, hit the Caps Lock key and use "Q" in normal/visual mode.
		          The Caps Lock key acts as a flip switch between recording and playback.

			  Playback can even accept a count. For instance, "5Q" repeats the recorded keystrokes 5 times.

			  If you'd still like to access Ex-mode like it was with the default "Q", use "gQ" instead. It has more features than the original Ex-mode.

			  Also see:  vimtip#144
	:help complex-repeat
	:help registers
	:help Q
	:help gQ 
```

## 21.3 yet another suggestion

```text
	To start recording, press "q" in normal mode followed by any of "0-9a-z".  This will start recording the keystrokes to the register you choose.  You can also see the word "recording" in the status(?) line.  You can start the key sequences that you want to record.  You can go to insert mode and type if you want.

	To stop recording, press "q" in the normal mode.

	To playback your keystrokes, press "@" followed by the character you choose.  Pressing "@@" will repeat the same again. 
```

## 21.4 Modify recoreded macro

```text
	Say you wish to modify named macro 'a'
	do:
	"ap
	The macro will be written to the file, modify it as you wish and then do
	"ad[movement/visualize] to copy the recoreded macro to named register a overwriting the previous record.
	for example "ad$
	then to use the modified recored do
	@a

"
```
