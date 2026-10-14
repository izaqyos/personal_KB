---
type: reference
title: "Easy edit of files in the same directory, expand, %: operator"
description: "Vim tip: Easy edit of files in the same directory, expand, %: operator (Tip 2 Update content)"
tags: [vim, tips, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.34"
---

# 33.34 Easy edit of files in the same directory, expand, %: operator

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

```text
To print out the current vim filename:

:help expand
:echo expand("%:p:h")  " absolute path
:echo expand("%:p:h")  " absolute path dirname
:echo expand("%:p:h:h")" absolute path dirname dirname
:echo expand("%.")     " relative path
:echo expand("%.:h")   " relative path dirname
:echo expand("%.:h:h") " relative path dirname dirname

:echo expand("<sfile>:p")  " absolute path to [this] vimscript

:help filename-modifiers
```

### 33.34.1 Tip 2 Update content

```text
While editing a file, you may want to open another file in the same directory. However, navigating to the file can be frustrating if it is not in the current directory.

Using one of the following snippets in your vimrc will help open files while deep in the directory tree. An alternative would be to set the working directory to the current file.
Contents

    * 1 Using a command line abbreviation
    * 2 Using a mapping
    * 3 References
    * 4 Comments
```

#### 33.34.1.1 Using a command line abbreviation

```text
This method uses a command line abbreviation so %% expands to the full path of the directory that contains the current file.

cabbr <expr> %% expand('%:p:h')

For example, while editing file /some/path/myfile.txt, typing :e %%/ on the command line will expand to :e /some/path/. Then you can use completion (press Tab after typing the first few letters of a file name), or press Enter to browse the directory listing. Of course, this abbreviation works anywhere on the command line, so you can use it with :cd, :grep etc.

If your Vim does not support <expr> mappings, try using the expression register to extract the path instead:

cabbr %% <C-R>=expand('%:p:h')<CR>

Note that you have to type a non-keyword character after %% in order to expand the abbreviation. For example, after typing :e %%, you could expand the abbreviation by typing / or by pressing Enter or Ctrl-].
```

#### 33.34.1.2 Using a mapping

```text
While editing file /some/path/myfile.txt, this method allows you to type \e (assuming the default backslash leader) to enter :e /some/path/ on the command line. Again, you can use completion to enter a file name, or press Enter to browse the directory.

nnoremap <Leader>e :e <C-R>=expand('%:p:h') . '/'<CR>

This method is less versatile than the command line abbreviation above.
```

#### 33.34.1.3 References

```text
    * :help cmdline-special % on command line is replaced with current file name
    * :help expand()
    * :help filename-modifiers explanation of '%:p:h' 
```

### 33.34.2 Old tip content, use %/ to expand current file path

```text
Created: February 24, 2001 Complexity: intermediate Author: scott Version: 5.7 
It was often frustrating when I would open a file deep in the code tree and then realize I wanted to open another file in that same directory. Douglas Potts taught me a nice way to do this. Add the following snippet to your vimrc:

" Edit another file in the same directory as the current file
" uses expression to extract path from current file's path
" (thanks Douglas Potts)
if has("unix")
  map ,e :e <C-R>=expand("%:p:h") . '/'<CR>
else
  map ,e :e <C-R>=expand("%:p:h") . '\'<CR>
endif

-> Note, I like this mapping :) map %/ to expand current path
Then when you type ,e in normal mode you can use tab to complete to the file. You can also expand this to allow for splitting, etc.

An alternative is to expand the current file directory while you're on the command line with something like:

if has("unix")
  cmap %/ <C-R>=expand("%:p:h") . '/'<CR>
else
  cmap %/ <C-R>=expand("%:p:h") . '\'<CR>
endif

This has the advantage that you can use it with any command, such as :e, :w, :cd etc. For example, typing:

:cd %/

Would become something like:

:cd /home/username/foo/


"
```
