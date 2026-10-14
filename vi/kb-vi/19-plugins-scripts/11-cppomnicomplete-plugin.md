---
type: reference
title: cppomnicomplete plugin.
description: "Subsection 19.9 of PLUGINS, Scripts."
tags: [kb-vi, plugins, scripts, extensions, colorschemes, list, active]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#19.9"
---

# 19.9 cppomnicomplete plugin.

[↑ PLUGINS, Scripts](/vi/kb-vi/19-plugins-scripts/README.md)

### 19.9.1 First steps

```text
                Installation.
			Build exuberent CTAGS db with:
			$ ctags -R --c++-kinds=+p --fields=+iaS --extra=+q  --languages=c++  -f tags .
			in case of error in sorting do:
			sort -u -o tags tags 

			Or you can add a map in your |.vimrc| file, eg: >

			        map <C-F12> :!ctags -R --c++-kinds=+p --fields=+iaS --extra=+q
```

### 19.9.2 Usage

```text
			$ :tselect MyClass
			$ myObject. wait and select tag from if list.
			$ myObject.<C-X><C-O>
```
