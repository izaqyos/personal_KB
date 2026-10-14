---
type: reference
title: Repeat last colon command
description: "Vim tip: Repeat last colon command"
tags: [vim, tips, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.21"
---

# 33.21 Repeat last colon command

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

```text
http://vim.wikia.com/wiki/VimTip990
The last command entered with ':' can be repeated with @: and further repeats can be done with @@

This is useful for commands like :bnext or :cNext.
 Comments

I scrol through the previous commands with cursor up/down after pressing ':'.

You still can edit the command or just press Enter.

This Tip becomes super useful with something like the following:

:%s/\<pig\>/cow/gie|:update|:next

This facilitates the modification of a series of files.

Note you need the 'e' of the gie

    * g=do as many times as occurs in line
    * i=ignore case
    * e=don't break command if no search string found
```
