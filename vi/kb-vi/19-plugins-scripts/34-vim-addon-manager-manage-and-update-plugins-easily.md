---
type: reference
title: "vim-addon-manager : manage and update plugins easily"
description: "Subsection 19.31 of PLUGINS, Scripts."
tags: [kb-vi, plugins, scripts, extensions, colorschemes, list, active]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#19.31"
---

# 19.31 vim-addon-manager : manage and update plugins easily

[↑ PLUGINS, Scripts](/vi/kb-vi/19-plugins-scripts/README.md)

```text
created by
Marc Weber
 
script type
utility
 
description
NEW: Windows users can use this download form now: http://mawercer.de/~marc/vam/index.php to get plugins. 

Note: 
There is also  http://packages.debian.org/sid/vim-addon-manager 
which servers a similar purpose but is Debian specific. 
I chose the same name by accident. See doc/* 

usage example: 

set runtimepath+=~/path-to/vim-plugin-manager 
call scriptmanager#Activate(["vim-haxe","The_NERD_tree","vim-latex"]) 

On startup you'll have to confirm installing plugins. 
For reviewing plugins before usage try :InstallAddon command which downloads only 

Note: I setup a cron job which updates the 
vim-plugin-manager-known-repositories every couple of days. 

Detailed description can be found in the doc directory of this distribution. 

TROUBLE ? Contact me or create a ticket (github page).
 
install details
brief: unzip and add to your runtimepath. 

Details: http://github.com/MarcWeber/vim-addon-manager/blob/master/doc/vim-addon-manager.txt


*/
```
