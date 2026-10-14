---
type: reference
title: "stlrefvim : A C++ Standard Template Library reference manual"
description: "Vim plugin notes: stlrefvim : A C++ Standard Template Library reference manual"
tags: [cpp, vim, vimscript, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#19.33"
---

# 19.33 stlrefvim : A C++ Standard Template Library reference manual

[↑ PLUGINS, Scripts](/vi/kb-vi/19-plugins-scripts/README.md)

```text
http://www.vim.org/scripts/script.php?script_id=2353

description
This plugin aims to provide a reference manual for the C++ standard template library (STL).  Based heavily off of the well-regarded SGI-STL documentation, this script puts the power of this documentation into your vim workflow.  Lookups can easily be done with user-configurable key mappings. 

For example, in the expression: 
    std::for_each(start, end, PrintFunc) 
place the cursor over for_each and type <Leader>tr to go to documentation for this function.  Type <Leader>te to go to an example that uses this function. 

Many thanks must go to Christian Habermann's for his crefvim plugin (http://www.vim.org/scripts/script.php?script_id=614) that formed the basis of and was the inspiration for this plugin.
 
install details
stlrefvim consists of two files: the script 'stlrefvim.vim' and its documentation 'stlrefvim.txt'. 

To use the script copy it into your local plugin-directory 
  Unix:    ~/.vim/plugin 
  Windows: c:\vimfiles\plugin 

You have to add this documentation and the STL-reference to Vim's help system. To do this, copy 'stlrefvim.txt' to your local doc-directory: 
  Unix:    ~/.vim/doc 
  Windows: c:\vimfiles\doc 

Then start Vim and do: 
  :helptags ~/.vim/doc   (or :helptags c:\vimfiles\doc for Windows)

  \tr - manual
  \te - example
  \tw - search
  \tc - ToC
```
