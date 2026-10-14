---
type: reference
title: Sessions.
description: Section 22 of the legacy KB_vi notes.
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#22"
---

# Sessions.

[↑ KB_vi](/vi/kb-vi/README.md)

## 22.1 Save and Load sessions.

```text
		:mksession vimbook.vim

		Later if you want to restore this session, you can use this command:

			:source vimbook.vim

		If you want to start Vim and restore a specific session, you can use the


		following command:

			vim -S vimbook.vim
```

## 22.2 SESSIONS AND VIMINFO

```text
			Sessions store many things, but not the position of marks, contents of


			registers and the command line history.  You need to use the 
			viminfo feature

			for these things.
			   In most situations you will want to use sessions separately from 
			viminfo.
			This can be used to switch to another session, but keep the command line


			history.  And yank text into 

			registers in one session, and paste it back in
			another session.
			   You might prefer to keep the info with the session.  You will have to 

			do
			this yourself then.  Example:

				:mksession! ~/.vim/secret.vim
				:wviminfo! ~/.vim/secret.viminfo

			And to restore this again:


				:source ~/.vim/secret.vim
				:rviminfo! ~/.vim/secret.viminfo
```

## 22.3 mkview

```text
	Saves less information about the session than mksession but usefull for folds, files etc.
	see :h mkview for more information

	:lo[adview] [nr]	Load the view for the current file.  When [nr] is
			omitted, the view stored with ":mkview" is loaded.
			When [nr] is specified, the view stored with ":mkview
			[nr]" is loaded.

	22.4
```
