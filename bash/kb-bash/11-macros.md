---
type: reference
title: Macros
description: Section 11 of the legacy KB_bash notes.
tags: [kb-bash]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "bash/KB_bash#11"
---

# Macros

[↑ KB_bash](/bash/kb-bash/README.md)

```text
start-kbd-macro (C-x ()
    Begin saving the characters typed into the current keyboard macro.

end-kbd-macro (C-x ))
    Stop saving the characters typed into the current keyboard macro and save the definition.

call-last-kbd-macro (C-x e)
    Re-execute the last keyboard macro defined, by making the characters in the macro appear as if typed at the keyboard.
```
