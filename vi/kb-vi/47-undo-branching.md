---
type: reference
title: Undo Branching
description: "Legacy vim KB section: Undo Branching (description, Usage, go to a specific undo branch)"
tags: [vim, legacy, reference]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#46"
---

# Undo Branching

[↑ KB_vi](/vi/kb-vi/README.md)

## 46.1 description

```text
	Say that you are editing a text file and have undone (u) the four last changes (4u)
	you continue edit and them realize you've made a mistake so you undo. In most editors your previous undo will be erased. Not in VIM, which actually will create a new branch of undo for the new change. You can get an overview of the undo branches using
	:undolist

	output is something along the lines of:
	number changes  time
	43      13  8 seconds ago
	44      13  4 seconds ago
	45      13  1 seconds ago 	
	
	Each line represent one undo branch and give its ID (number), number of changes (changes) and time of the branch creation.
```

## 46.2 Usage

### 46.2.1 go to a specific undo branch

```text
	:undo N
	where N is the branch #
```

### 46.2.2 traverse the undo list

```text
		g-,g+ go backwards/forwards in the list of changes

		g- is not the same as u. u traverses the changes not in undo branches while g- traverses all the changes in every undo branch
```

### 46.2.3 undo using edit time

```text
		:earlier Ns
		:earlier Nm
		:earlier Nh

		:later Ns
		:later Nm
		:later Nh

		N is a number in seconds (s), minutes (m) or hours (h) you want to go back or forward to.
```
