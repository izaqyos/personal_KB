---
type: reference
title: Managing boolean (set) options
description: Subsection 33.35 of Tips..
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.35"
---

# 33.35 Managing boolean (set) options

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

```text
Tip 37 Author: slimzhao Version: 6.0

The options that configure Vim are of three types:

    * boolean : on or off (example :help 'autochdir')
    * number : an integer value (example :help 'textwidth')
    * string : a string value (example :help 'backspace') 

Options can be global, or may apply only to a particular buffer or window. :help :setlocal
```

### 33.35.1 Boolean options

```text
The many ways to set a boolean option are best illustrated by a simple example. In the following, the 'number' option is used. Any boolean option, such as wrap, linebreak, diff, etc can be set in these ways.
:set number 	Turn line numbers on
:set nonumber 	Turn line numbers off
:set invnumber
:set number! 	Toggle line numbers
:set number& 	Set option to default value
:set number? 	Show value of option

Replace number with any boolean option.

For nonboolean options, :set option& also sets the option to its default value, and :set option? will display the current value. 
```

### 33.35.2 Toggling an option

```text
If you often need to change an option, you could use a mapping and script as in the following example (which could be placed in your vimrc). In this example, the F12 key is mapped to either enable or disable the mouse.

nnoremap <F12> :call ToggleMouse()<CR>
function! ToggleMouse()
  if &mouse == 'a'
    set mouse=
    echo "Mouse usage disabled"
  else
    set mouse=a
    echo "Mouse usage enabled"
  endif
endfunction

It's easier to toggle a boolean option, for example:

nnoremap <F12> :set number!
```

### 33.35.3 References

```text
    * :help set-option 
```
