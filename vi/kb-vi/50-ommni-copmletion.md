---
type: reference
title: Ommni Copmletion
description: Section 49 of the legacy KB_vi notes.
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#49"
---

# Ommni Copmletion

[↑ KB_vi](/vi/kb-vi/README.md)

## 49.1 See :help new-omni-completion

```text
Omni completion support comes out of the box for several languages (e.g. C).

MS Windows users will also want to install [Exuberant Ctags | http://georgevreilly.com/vim/ctags.html].

C++ support

Try doing :set omnifunc while editing a C++ file.

If you get omnifunc=ccomplete#Complete as a result, it means you are presently using not C++, but the bundled C completion.

To get C++ completion support you can try installing OmniCppComplete. Please read the doc/omnicppcomplete.txt file in the archive for further help.

_Note:_ In *NIX these files go into your ~/.vim directory. In MS Windows you put them in %HOMEPATH%/vimfiles. 
```
