---
type: reference
title: Multiple windows.
description: "Legacy vim KB section: Multiple windows. (create a second window., horizontal, Vertical)"
tags: [windows, vim, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#7"
---

# Multiple windows.

[↑ KB_vi](/vi/kb-vi/README.md)

```text
	For full details:
	:h split
```

## 7.1 create a second window.

### 7.1.1 horizontal

```text
	:split
	:sp
	:bs[N]		split to buffer N
	CTRL-W s						*CTRL-W_s*
	CTRL-W S						*CTRL-W_S*
	CTRL-W CTRL-S						*CTRL-W_CTRL-S*
```

### 7.1.2 Vertical

```text
		CTRL-W CTRL-V						*CTRL-W_CTRL-V*
		CTRL-W v						*CTRL-W_v*
		:[N]vs[plit] [++opt] [+cmd] [file]			*:vs* *:vsplit*
```

### 7.1.3 New window

```text
		Horizontal:
		CTRL-W n						*CTRL-W_n*
		CTRL-W CTRL_N						*CTRL-W_CTRL-N*
		:[N]new [++opt] [+cmd]					*:new*

		Vertical:
		:[N]vne[w] [++opt] [+cmd] [file]			*:vne* *:vnew*
```

### 7.1.4 Close window

```text
		CTRL-W q						*CTRL-W_q*
		CTRL-W CTRL-Q						*CTRL-W_CTRL-Q*
		:q[uit]		Quit current window.  When quitting the last window (not
		:q[uit]!	Quit current window.  If this was the last window for a buffer,
		:hid[e]		Quit current window, unless it is the last window on the
```

### 7.1.5 Leave only one window open, close all windows but current

```text
		CTRL-W o						*CTRL-W_o* *E445*
		CTRL-W CTRL-O					*CTRL-W_CTRL-O* *:on* *:only*
		:on[ly][!]	Make the current window the only one on the screen.  All other
```

## 7.2 move between windows.

```text
		ctrl+W

		ctrl+W {left,right,up,down}
		ctrl+W = (resize window)
		:ba (new windows for all buffers)
```

## 7.3 close window.

```text
	:close
```

## 7.4 leave only this window open, closing all others.

```text
	:only.
```

## 7.5 create a window for a new file.

```text
	:split <file name>
```

## 7.6 close all windows ( buffers).

```text
		:qa  (! force)
```

## 7.7 Move windoes around

```text
CTRL-W r				*CTRL-W_r* *CTRL-W_CTRL-R* *E443*
CTRL-W CTRL-R	Rotate windows downwards/rightwards.  The first window becomes
		the second one, the second one becomes the third one, etc.
		The last window becomes the first window.  The cursor remains
		in the same window.
		This only works within the row or column of windows that the
		current window is in.

						*CTRL-W_R*
CTRL-W R	Rotate windows upwards/leftwards.  The second window becomes
		the first one, the third one becomes the second one, etc.  The
		first window becomes the last window.  The cursor remains in
		the same window.
		This only works within the row or column of windows that the
		current window is in.

CTRL-W x					*CTRL-W_x* *CTRL-W_CTRL-X*
CTRL-W CTRL-X	Without count: Exchange current window with next one.  If there
		is no next window, exchange with previous window.
		With count: Exchange current window with Nth window (first
		window is 1).  The cursor is put in the other window.
		When vertical and horizontal window splits are mixed, the
		exchange is only done in the row or column of windows that the
		current window is in.

The following commands can be used to change the window layout.  For example,
when there are two vertically split windows, CTRL-W K will change that in
horizontally split windows.  CTRL-W H does it the other way around.

						*CTRL-W_K*
CTRL-W K	Move the current window to be at the very top, using the full
		width of the screen.  This works like closing the current
		window and then creating another one with ":topleft split",
		except that the current window contents is used for the new
		window.

						*CTRL-W_J*
CTRL-W J	Move the current window to be at the very bottom, using the
		full width of the screen.  This works like closing the current
		window and then creating another one with ":botright split",
		except that the current window contents is used for the new
		window.

						*CTRL-W_H*
CTRL-W H	Move the current window to be at the far left, using the
		full height of the screen.  This works like closing the
		current window and then creating another one with
		":vert topleft split", except that the current window contents
		is used for the new window.
		{not available when compiled without the +vertsplit feature}

						*CTRL-W_L*
CTRL-W L	Move the current window to be at the far right, using the full
		height of the screen.  This works like closing the
		current window and then creating another one with
		":vert botright split", except that the current window
		contents is used for the new window.
		{not available when compiled without the +vertsplit feature}

						*CTRL-W_T*
CTRL-W T	Move the current window to a new tab page.  This fails if
		there is only one window in the current tab page.
		When a count is specified the new tab page will be opened
		before the tab page with this index.  Otherwise it comes after
		the current tab page.
```

## 7.7 Window resizing

```text
CTRL-W =	Make all windows (almost) equally high and wide, but use
		'winheight' and 'winwidth' for the current window.
		Windows with 'winfixheight' set keep their height and windows
		with 'winfixwidth' set keep their width.

:res[ize] -N					*:res* *:resize* *CTRL-W_-*
CTRL-W -	Decrease current window height by N (default 1).
		If used after 'vertical': decrease width by N.

:res[ize] +N					*CTRL-W_+*
CTRL-W +	Increase current window height by N (default 1).
		If used after 'vertical': increase width by N.

:res[ize] [N]
CTRL-W CTRL-_					*CTRL-W_CTRL-_* *CTRL-W__*
CTRL-W _	Set current window height to N (default: highest possible).

z{nr}<CR>	Set current window height to {nr}.

						*CTRL-W_<*
CTRL-W <	Decrease current window width by N (default 1).

						*CTRL-W_>*
CTRL-W >	Increase current window width by N (default 1).

:vertical res[ize] [N]			*:vertical-resize* *CTRL-W_bar*
:vert res [+|-]N		Increase/decrease width by N
CTRL-W |	Set current window width to N (default: widest possible).
```
