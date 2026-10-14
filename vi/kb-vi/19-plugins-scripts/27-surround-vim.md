---
type: reference
title: surround.vim
description: "Subsection 19.24 of PLUGINS, Scripts."
tags: [kb-vi, plugins, scripts, extensions, colorschemes, list, active]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#19.24"
---

# 19.24 surround.vim

[↑ PLUGINS, Scripts](/vi/kb-vi/19-plugins-scripts/README.md)

```text
INTRODUCTION                                    *surround*

This plugin is a tool for dealing with pairs of "surroundings."  Examples
of surroundings include parentheses, quotes, and HTML tags.  They are
closely related to what Vim refers to as |text-objects|.  Provided
are mappings to allow for removing, changing, and adding surroundings.

Details follow on the exact semantics, but first, consider the following
examples.  An asterisk (*) is used to denote the cursor position.

  Old text                  Command     New text ~
  "Hello *world!"           ds"         Hello world!
  [123+4*56]/2              cs])        (123+456)/2
  "Look ma, I'm *HTML!"     cs"<q>      <q>Look ma, I'm HTML!</q>
  if *x>3 {                 ysW(        if ( x>3 ) {
  my $str = *whee!;         vlllls'     my $str = 'whee!';

While a few features of this plugin will work in older versions of Vim,
Vim 7 is recommended for full functionality.

MAPPINGS                                        *surround-mappings*

Delete surroundings is *ds* .  The next character given determines the target
to delete.  The exact nature of the target are explained in |surround-targets|
but essentially it is the last character of a |text-object|.  This mapping
deletes the difference between the "inner" object and "an" object.  This is
easiest to understand with some examples:

  Old text                  Command     New text ~
  "Hello *world!"           ds"         Hello world!
  (123+4*56)/2              ds)         123+456/2
  <div>Yo!*</div>           dst         Yo!

Change surroundings is *cs* .  It takes two arguments, a target like with
|ds|, and a replacement.  Details about the second argument can be found
below in |surround-replacements|.  Once again, examples are in order.

  Old text                  Command     New text ~
  "Hello *world!"           cs"'        'Hello world!'
  "Hello *world!"           cs"<q>      <q>Hello world!</q>
  (123+4*56)/2              cs)]        [123+456]/2
  (123+4*56)/2              cs)[        [ 123+456 ]/2
  <div>Yo!*</div>           cst<p>      <p>Yo!</p>

*ys* takes an valid Vim motion or text object as the first object, and wraps
it using the second argument as with |cs|.  (Unfortunately there's no good
mnemonic for "ys".)

  Old text                  Command     New text ~
  Hello w*orld!             ysiw)       Hello (world)!

As a special case, *yss* operates on the current line, ignoring leading
whitespace.

  Old text                  Command     New text ~
      Hello w*orld!         yssB            {Hello world!}

There is also *yS* and *ySS* which indent the surrounded text and place it
on a line of its own.

In visual mode, a simple "s" with an argument wraps the selection.  This is
referred to as the *vs* mapping, although ordinarily there will be
additional keystrokes between the v and s.  In linewise visual mode, the
surroundings are placed on separate lines.  In blockwise visual mode, each
line is surrounded.

An "S" in visual mode (*vS*) behaves similarly but always places the
surroundings on separate lines.  Additionally, the surrounded text is
indented.  In blockwise visual mode, using "S" instead of "s" instead skips
trailing whitespace.

Note that "s" and "S" already have valid meaning in visual mode, but it is
identical to "c".  If you have muscle memory for "s" and would like to use a
different key, add your own mapping and the existing one will be disabled.
>
  vmap <Leader>s <Plug>Vsurround
  vmap <Leader>S <Plug>VSurround
<
                                                *i_CTRL-G_s* *i_CTRL-G_S*
Finally, there is an experimental insert mode mapping on <C-G>s and <C-S>.
Beware that the latter won't work on terminals with flow control (if you
accidentally freeze your terminal, use <C-Q> to unfreeze it).  The mapping
inserts the specified surroundings and puts the cursor between them.  If,
immediately after the mapping and before the replacement, a second <C-S> or
carriage return is pressed, the prefix, cursor, and suffix will be placed on
three separate lines.  <C-G>S (not <C-G>s) also exhibits this behavior.

TARGETS                                         *surround-targets*

The |ds| and |cs| commands both take a target as their first argument.  The
possible targets are based closely on the |text-objects| provided by Vim.
In order for a target to work, the corresponding text object must be
supported in the version of Vim used (Vim 7 adds several text objects, and
thus is highly recommended).  All targets are currently just one character.

Eight punctuation marks, (, ), {, }, [, ], <, and >, represent themselves
and their counterpart.  If the opening mark is used, contained whitespace is
also trimmed.  The targets b, B, r, and a are aliases for ), }, ], and >
(the first two mirror Vim; the second two are completely arbitrary and
subject to change).

Three quote marks, ', ", `, represent themselves, in pairs.  They are only
searched for on the current line.

A t is a pair of HTML or XML tags.  See |tag-blocks| for details.  Remember
that you can specify a numerical argument if you want to get to a tag other
than the innermost one.

The letters w, W, and s correspond to a |word|, a |WORD|, and a |sentence|,
respectively.  These are special in that they have nothing to delete, and
used with |ds| they are a no-op.  With |cs|, one could consider them a
slight shortcut for ysi (cswb == ysiwb, more or less).

A p represents a |paragraph|.  This behaves similarly to w, W, and s above;
however, newlines are sometimes added and/or removed.

'
```
