---
type: reference
title: Environment variables
description: Subsection 33.49 of Tips..
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.49"
---

# 33.49 Environment variables

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

```text
Tip 1589 complexity basic · author Metacosm · version 7.0

Vim can read and write environment variables within your current shell session. Use a $ prefix to identify an environment variable, as in the following examples.

Display the contents of the PATH environment variable:

:echo $PATH

Assign the PATH environment variable to a Vim variable:

:let myvar = $PATH

Change the PATH environment variable for the current session:

:let $PATH = '/foo:/bar'

Insert the contents of the PATH environment variable into the buffer:
Press i to enter insert mode, press Ctrl-r then =$PATH and press Enter.

References:

    * :help expr-env
    * :help expression-syntax
    * :help {{{id}}} 
```
