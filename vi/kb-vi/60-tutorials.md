---
type: reference
title: Tutorials
description: Section 59 of the legacy KB_vi notes.
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#59"
---

# Tutorials

[↑ KB_vi](/vi/kb-vi/README.md)

## 59.1 Video, Derek Wyatt's videos

```text
http://vimeo.com/user1690209/videos
```

### 59.1.1 Apply (operate) commands to (over) multiple files

```text
load a vim session with all files, like gvim *.h
record a macro that you want to opearate on all files. Remember to make it generic enough to acheive the same end result on all the files!
with recording still on save and move to next file, :wn
Now run the macro on as many file as were left, say 10 so, 10@q  (assuming the default record register q, replace with named register if you used one)

Its also possible to use :argdo 
like:
vim -c "argdo %s/ABC/DEF/ge | update" *.c


		59.1.2

	59.2
```
