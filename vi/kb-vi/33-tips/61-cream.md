---
type: reference
title: Cream
description: Subsection 33.62 of Tips..
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.62"
---

# 33.62 Cream,

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

```text
        Where to download Vim for Windows, install VIM for windows, find most recent build for windows, latest most recent vim version 
Tip 1578 

Which version of Vim should I use?

    * I want a fully patched standard Vim for Windows, without compiling it myself. 

        See "Vim without Cream problems" below. 

    The easiest and best solution for Windows users on 32-bit systems is to use the standard Vim (Vim without Cream) at http://sourceforge.net/projects/cream/files/ 
    Enable scripting in your browser. 
    Near the bottom, click "+" next to "Vim" to expand the list of files. 
    The first file listed under Vim should have a name like gvim-7-2-234.exe (Vim without Cream, version 7.2.234 = 7.2 with patches 1234). 
    You can click the icon in the "Notes/Subscribe" column to see the output of the :version command (which shows what features are in the build). 
    Click the most recent gvim-7-2-xxx.exe to download; run the download to install. 
    It installs a patched standard gvim.exe (GUI) and vim.exe (console), with all help and runtime files. 
    Includes Perl, Python, Ruby, Tcl and MzScheme interfaces. 

    * I'm using 64-bit Windows. 

    See information and download. 

    * I want standard Vim (source code to compile for all platforms, or unpatched Windows executables). 

    Available at http://www.vim.org/download.php 

    * I want an easy-to-use configuration for Windows with common menus and standard keyboard shortcuts. 

    Cream for BSD, Linux and Windows is available at http://cream.sourceforge.net/download.html 
    Click "Windows One-click installer, includes both Vim and Cream". 
    You will download a file with a name like cream-0-41-gvim-7-1-293.exe (Cream version 0.41 with gvim version 7.1.293 = 7.1 with patches 1293). 
    Note: This package may include an obsolete version of Vim. After you download it, you may want to upgrade the "Vim" part of it from (let's say) 7.1.293 to (let's say) 7.2.234, see above "I want a fully patched Vim for Windows". 

    * I want to put Vim on a keydrive and use it on a bunch of Windows machines, but standard versions of Vim choke when the keydrive is mounted as a different drive letter. 

    Check out GVim Portable http://portablegvim.sourceforge.net/ 

    * I want Vim on a Macintosh. 

    See the versions at http://www.vim.org/download.php#mac 
```
