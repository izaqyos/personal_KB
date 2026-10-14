---
type: reference
title: Integration with source control systems
description: "Legacy vim KB section: Integration with source control systems (ClearCase, Perforce)"
tags: [vim, legacy, reference]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#70"
---

# Integration with source control systems

[↑ KB_vi](/vi/kb-vi/README.md)

## 70.1 ClearCase

```text
	/Users/<user>/.vimrc
" My ACS 5, linux develoment environment clearcase menu
amenu M&yCCMenu.checkout       :! co % <cr>
amenu M&yCCMenu.checkin       :! ci % <cr>
amenu M&yCCMenu.-SEP-      :   
amenu M&yCCMenu.version_tree       :! ct lsvtree -g % <cr>
amenu M&yCCMenu.diff_pred       :! ct diff -pred -graph % <cr>
amenu M&yCCMenu.diff_pred_txt       :! ct diff -pred -diff % <cr>
amenu M&yCCMenu.-SEP1-      :   
amenu M&yCCMenu.checkin_all       :call CheckIn_all__buffers()<cr>
amenu M&yCCMenu.manually_set_tags_for_auto_complete       :set tags+=~/.vim/tags/acs_5/tags<cr>:set tags+=~/.vim/tags/cpp/tags<cr>
```

## 70.2 Perforce

```text
:!p4 login
	- checkout:
:!p4 edit -c <change #> %

	- Add file
:!p4 add -c <change #> %

	- submit 
:!p4 submit -c <change #>

	- update workspace
:!p4 synch

	- opened files
:!p4 opened

	- diff file agains depot version
:!p4 diff % 

	70.3
```
