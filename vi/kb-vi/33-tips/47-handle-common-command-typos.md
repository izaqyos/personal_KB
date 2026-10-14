---
type: reference
title: Handle common command typos
description: "Vim tip: Handle common command typos"
tags: [vim, tips, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.48"
---

# 33.48 Handle common command typos

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

```text
Use cabbrev to correct command typos that you commonly make.

For example, if you tend to hold the shift key too long:

cabbrev Q quit
cabbrev W write

or, if you tend to miss the "!" and hit the "@" as well:

cabbrev q!@ q!
cabbrev wq!@ wq!

If you ever find that you actually need to type one of the typos you make, you'll need to disable cabbrev temporarily. 
 
Some related examples from my .vimrc file:
" Frequently when I go to save with :w I am flying to fast and I type :W
" which gives me an obvious error.
"
" How can I map :W to :w ???
" How can I map :Q to :q ???
"
" I know there is :ZZ but I like the :w more.
"
:command! -bang W w<bang>
:command! -bang Q q<bang>
:command! -bang Wa wa<bang>
:command! -bang Qa qa<bang>
" often make the mistake of typing w1 instead of w!.
" Can you please suggest how to map w1 to w!?
if version<  700
	        cnoreabbrev w1 w!
else
	        cnoreabbrev  <expr>  w1  ((getcmdtype() == ':'  &&  getcmdpos()  <= 2)?   'w!' : 'w1')
endif
```
