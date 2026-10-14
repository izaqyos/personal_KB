---
type: reference
title: Spell checking
description: "Legacy vim KB section: Spell checking (Start spell check, Fix a misspelled word:)"
tags: [vim, legacy, reference]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#42"
---

# Spell checking

[↑ KB_vi](/vi/kb-vi/README.md)

## 42.1 Start spell check

```text
	The command to execute to turn on this helpful spell checker feature is:
:set spell
This turns on the spell checker with the default language (English). If you don't use
English much, and would prefer to use another language in the spell checker, then
there is no problem changing this. Just add the code of the language you would like
to use to the spelllang property, for example:
:set spelllang=de
```

## 42.2 Fix a misspelled word:

```text
	Whenever you encounter a misspelled word, you can ask Vim to suggest better ways
to spell the word. This is simply done by placing the cursor over the word and then
going into the normal mode (press Esc), and then pressing z=.

Often Vim gives you a long list of alternatives for your misspelled word, but unless
you have spelled the word completely wrong, chances are that the correct word
is within the top 5 of the alternatives. If this is the case, and you don't want to
look through the entire list of alternatives, then you can limit the output with the
following command:
:set spellsuggest=X
Set X to the number of alternative ways of spelling you want Vim to suggest.
```
