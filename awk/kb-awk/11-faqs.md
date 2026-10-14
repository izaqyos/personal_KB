---
type: reference
title: FAQS
description: Section 10 of the legacy kb_awk notes.
tags: [kb-awk]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "awk/kb_awk#10"
---

# FAQS

[↑ kb_awk](/awk/kb-awk/README.md)

## 10.1 Round up/down, truncate

### 10.1.1 Via Integer Function

```text
The int() function truncates a numeric value by removing digits to the right of the decimal point. Look at the following two statements:

    print 100/3
    print int(100/3)

The output from these statements is shown below:

$    33.3333
    33

The int() function simply truncates; it does not round up or down. (Use the printf format "%.0f" to perform rounding.)
```

### 10.1.2 Discussion in forum

```text
- > echo "1.2345" | cut -d"." -f1
1
> echo "134.2345" | cut -d"." -f1
> 134
>

- awk '{printf("%.0f", $1*.04) }' infile > outfile

- perl -ne ' print int($_* 3.5), "\n" '  < infile > outfile

- I think what your asking is to truncate the number. Just print it as an integer with printf.

awk '{printf("%d\n",$1)}' file.data


		10.1.3
	10.2
```
