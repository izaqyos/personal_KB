---
type: reference
title: Strings
description: "Bash string handling, such as concatenation, with a function example."
tags: [bash, legacy, shell, examples, tips]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "bash/KB_bash#5"
---

# Strings

[↑ KB_bash](/bash/kb-bash/README.md)

## 5.1 string concatenation

```text
		example
		_open_KB_files(){

			files=( knowledge_base_unix  clear_case_KB.txt bash/KB_bash  vi/KB_vi )
				path=" /cygdrive/d/work/KB/"
				cmd="vi "

				for file in ${files[@]};
			        do file=${path}${file};
				        cmd=${cmd}${file}
#echo $file;
#echo $cmd;
					done
						${cmd}
		}
```
