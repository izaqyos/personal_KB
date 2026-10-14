---
type: reference
title: Working with Unicode
description: "Vim tip: Working with Unicode"
tags: [vim, tips, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.65"
---

# 33.65 Working with Unicode

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

```text
    *  One thing you should always do first is check the help. 

    * The following is an example. Modify it to suit your work environment. 

if has("multi_byte")
  if &termencoding == ""
    let &termencoding = &encoding
  endif
  set encoding=utf-8
  setglobal fileencoding=utf-8 bomb
  set fileencodings=ucs-bom,utf-8,latin1
endif

What the above does

    * has("multi_byte") checks if you have the right options compiled-in. If you haven't got what it takes, it's no use trying to use Unicode. 

    * 'termencoding' defines how your keyboard encodes what you type. Here we save the value corresponding to your locale before changing 'encoding' (see below). 

    * 'encoding' sets how vim shall represent characters internally. Utf-8 is necessary for most flavors of Unicode. 

    * 'fileencoding' sets the encoding for a particular file (local to buffer); :setglobal sets the default value. An empty value can also be used: it defaults to same as 'encoding'. Or you may want to set one of the ucs encodings, It might make the same disk file bigger or smaller depending on your particular mix of characters. Also, IIUC, utf-8 is always big-endian (high bit first) while ucs can be big-endian or little-endian, so if you use it, you will probably need to set 'bomb" (see below). 

    * 'bomb' (boolean): if set, vim will put a "byte order mark" (or BOM for short) at the start of Unicode files. This option is irrelevant for non-Unicode files (iso-8859, etc.). This BOM is the codepoint U+FEFF, which is represented on disk as follows:
          o UTF-8: EF BB BF
          o UTF-16be: FE FF
          o UTF-16le: FF FE
          o UTF-32be: 00 00 FE FF
          o UTF-32le: FF FE 00 00 

    That is, the BOM allows an easy determination of which Unicode encoding and which endianness are being used (assuming that a file in UTF-16le won't start with a NULL). 

    * 'fileencodings' defines the heuristic to set 'fileencoding' (local to buffer) when reading an existing file. The first one that matches will be used. Ucs-bom is "ucs with byte-order-mark"; it must not come after utf-8 if you want it to be used. 

Additional remarks

    * In "replace" mode, one utf character (one or more data bytes) replaces one utf character (which need not use the same number of bytes). 

    * In "normal" mode, ga shows the character under the cursor as text, decimal, octal and hex; g8 shows which byte or bytes are used to represent it. 

    * In "insert" or "replace" mode,
          o any character defined on your keyboard can be entered the usual way (even with dead keys if you have them, e.g. French circumflex, German umlaut, etc.);
          o any character which has a "digraph" (there are a huge lot of them, see :dig after setting enc=utf-8) can be entered with a Ctrl-K prefix;
          o any utf character at all can be entered with a Ctrl-V prefix, either <Ctrl-V> u aaaa or <Ctrl-V> U bbbbbbbb, with 0 <= aaaa <= FFFF, or 0 <= bbbbbbbb <= 7FFFFFFF.
          o If you have sourced mswin.vim (which I don't recommend) then <Ctrl-V> has been remapped to the "paste" operation; in this case you need to use <Ctrl-Q> instead. 

    * Gvim will display it properly if you have the fonts for it, provided that you set 'guifont' to some fixed-width font which has the glyphs you want to use (Courier New is OK for French, German, Greek, Russian and more, but I'm not sure about Hebrew or Arabic; its glyphs are of a more "fixed" width than those of, e.g. Lucida Console: the latter can be awkward if you need bold Cyrillic writing). 

    * Until recently, gvim displayed any Unicode codepoint above U+FFFF as a question mark (double-width for CJK). This was fixed by patch 7.1.116 dated 2007 Sep 17 20:39. If you still have an older version, it is strongly recommended that you upgrade to the current release (and a recent patchlevel). 

See also

    * Switching to Unicode in an orderly manner
    * Forcing file encoding at load time
    * Entering special characters
    * :help utf8
    * :help encoding-values
    * :help 'encoding'
    * :help 'fileencoding'
    * :help 'fileencodings'
    * :help 'termencoding'
    * :help 'bomb'
    * :help 'guifont'
    * :help ga
    * :help g8
    * :help digraphs
    * :help i_CTRL-V_digit
```
