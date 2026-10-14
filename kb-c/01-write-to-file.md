---
type: reference
title: Write to file
description: Section 1 of the legacy c-kb notes.
tags: [kb-c]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "c-kb#1"
---

# Write to file

[↑ c-kb](/kb-c/README.md)

```text
	#include <stdio.h>
	int main()
	{
	FILE *file;
	file = fopen("file.txt","a+"); /* apend file (add text to
	a file or create a file if it does not exist.*/
	fprintf(file,"%s","This is just an example :)"); /*writes*/
	fclose(file); /*done!*/
	getchar(); /* pause and wait for key */
	return 0;
	}
```
