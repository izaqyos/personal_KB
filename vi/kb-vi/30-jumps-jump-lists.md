---
type: reference
title: "Jumps, jump lists"
description: "Legacy vim KB section: Jumps, jump lists (basics)"
tags: [data-structures, vim, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#30"
---

# Jumps, jump lists

[↑ KB_vi](/vi/kb-vi/README.md)

```text
	:h  jumps
```

## 30.1 basics

```text
					:ju print jump list.
					:changes print the changes list

										*CTRL-O*
			CTRL-O			Go to [count] Older cursor position in jump list
						(not a motion command).  {not in Vi}
						{not available without the +jumplist feature}

			<Tab>		or					*CTRL-I* *<Tab>*
			CTRL-I			Go to [count] newer cursor position in jump list
						(not a motion command).
						In a |quickfix-window| it takes you to the position of
						the error under the cursor.
						{not in Vi}
						{not available without the +jumplist feature}

										*g;* *E662*
			g;			Go to [count] older position in change list.
						If [count] is larger than the number of older change
						positions go to the oldest change.
						If there is no older change an error message is given.
						(not a motion command)
						{not in Vi}
						{not available without the +jumplist feature}

										*g,* *E663*
			g,			Go to [count] newer cursor position in change list.
						Just like |g;| but in the opposite direction.
						(not a motion command)
						{not in Vi}
						{not available without the +jumplist feature}
```
