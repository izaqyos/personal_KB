---
type: reference
title: EasyMotion
description: "Vim plugin notes: EasyMotion (Introduction, Install)"
tags: [vim, vimscript, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#19.38"
---

# 19.38 EasyMotion

[↑ PLUGINS, Scripts](/vi/kb-vi/19-plugins-scripts/README.md)

### 19.38.1 Introduction

```text
EasyMotion provides a much simpler way to use some motions in vim. It takes the <number> out of <number>w or <number>f{char} by highlighting all possible choices and allowing you to press one key to jump directly to the target.

When one of the available motions is triggered, all visible text preceding or following the cursor is faded, and motion targets are highlighted.

EasyMotion is triggered by one of the provided mappings.

Important notes about the default bindings
The default leader has been changed to <Leader><Leader> to avoid conflicts with other plugins you may have installed. This can easily be changed back to pre-1.3 behavior by rebinding the leader in your vimrc:

let g:EasyMotion_leader_key = '<Leader>'
All motions are now triggered with <Leader><Leader> by default, e.g. <Leader><Leader>t, <Leader><Leader>gE.

Usage example

Type <Leader><Leader>w to trigger the word motion w. When the motion is triggered, the text is updated (no braces are actually added, the text is highlighted in red by default):

<cursor>Lorem {a}psum {b}olor {c}it {d}met.
Press c to jump to the beginning of the word "sit":

Lorem ipsum dolor <cursor>sit amet.
Similarly, if you're looking for an "o", you can use the f motion. Type <Leader><Leader>fo, and all "o" characters are highlighted:

<cursor>L{a}rem ipsum d{b}l{c}r sit amet.
Press b to jump to the second "o":

Lorem ipsum d<cursor>olor sit amet.
```

### 19.38.2 Install

```text
$ git clone https://github.com/Lokaltog/vim-easymotion
Cloning into 'vim-easymotion'...
remote: Reusing existing pack: 602, done.
remote: Total 602 (delta 0), reused 0 (delta 0)
Receiving objects: 100% (602/602), 116.74 KiB | 0 bytes/s, done.
Resolving deltas: 100% (160/160), done.
Checking connectivity... done

		19.38.3
```
