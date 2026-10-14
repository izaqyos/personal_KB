---
type: reference
title: Edit multiple files.
description: "Legacy vim KB section: Edit multiple files. (switch to editing new file., determine current file., open a list of files.)"
tags: [vim, legacy, reference]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#6"
---

# Edit multiple files.

[↑ KB_vi](/vi/kb-vi/README.md)

## 6.1 switch to editing new file.

```text
	:e <file name>
```

## 6.2 determine current file.

```text
	:args
```

## 6.3 open a list of files.

```text
	:args <file list with regexps>
	
	example.
	:args code/*.cpp myfile.h  

*/
```

## 6.4 list buffers

### 6.4.1 simple

```text
		:ls
		:buffers
```

### 6.4.2 list full pathnames of all open buffers

```text
https://stackoverflow.com/questions/7236315/how-can-i-view-the-filepaths-to-all-vims-open-buffers

A1. 
'd have use the "simple":

echo map(filter(range(0,bufnr('$')), 'buflisted(v:val)'), 'fnamemodify(bufname(v:val), ":p")')
With:

range(0,bufnr('$')) to have a |List| of all possible buffer numbers
filter(possible_buffers, 'buflisted(v:val)') to restrict the list to the buffers that are actually listed -- you may prefer bufexist() that'll also show the help buffers, etc.
map(listed_buffer, 'nr_to_fullpath(v:val)') to transform all the buffer numbers into full pathnames
bufname() to transform a single buffer number into a (simplified) pathname
fnamemodify(pathname, ':p') to have a full absolute pathname from a relative pathname.
Change :echo to call writefile(pathname_list, 'filename'), and that's all, or to :put=, etc.


A2.
	    6.4.3
```

## 6.5 file navigation (without plugins)

```text
		:n for next fle
		:prev for previous.
```

## 6.6 Open from command line

### 6.6.1 Use bash expansion

```text
Ex: vim *.pl
or vim *.[h|c]
```

### 6.6.2 Nuber file buffers according to date

```text
Open all files in current dir:
gvim `\ls -lrt  | awk ' {print $NF} '`

Open all perl files in current dir:
gvim \ls -lrt  | awk ' /pl$/ {print $NF} '`

	6.7
```
