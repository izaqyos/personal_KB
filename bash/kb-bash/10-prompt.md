---
type: reference
title: prompt
description: Section 10 of the legacy KB_bash notes.
tags: [kb-bash]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "bash/KB_bash#10"
---

# prompt

[↑ KB_bash](/bash/kb-bash/README.md)

```text
	add to .bashrc 
	PS1="[\u@\h:\d:\w]\$ "
	to get prompt, [<user>@<user>-wxp:Thu May 03:/cygdrive/c/work/scripts/games:]
	
	Bash provides an environment variable called PROMPT_COMMAND. The contents of this variable are executed as a regular Bash command just before Bash displays a prompt.

		[21:55:01][giles@nikola:~] PS1="[\u@\h:\w]\$ "
		[giles@nikola:~] PROMPT_COMMAND="date +%H%M"
		2155
		[giles@nikola:~] d
		bin   mail
		2156
		[giles@nikola:~] 

		What happened above was that I changed PS1 to no longer include the \t escape sequence (added in a previous section), so the time was no longer a part of the prompt. Then I used date +%H%M to display the time in a format I like better. But it appears on a different line than the prompt. Tidying this up using echo -n ... as shown below works with Bash 2.0+, but appears not to work with Bash 1.14.7: apparently the prompt is drawn in a different way, and the following method results in overlapping text.

		2156
		[giles@nikola:~] PROMPT_COMMAND="echo -n [$(date +%H%M)]"
		[2156][giles@nikola:~]$
		[2156][giles@nikola:~]$ d
		bin   mail
		[2157][giles@nikola:~]$ unset PROMPT_COMMAND
		[giles@nikola:~]

		echo -n ... controls the output of the date command and suppresses the trailing newline, allowing the prompt to appear all on one line. At the end, I used the unset command to remove the PROMPT_COMMAND environment variable.
```
