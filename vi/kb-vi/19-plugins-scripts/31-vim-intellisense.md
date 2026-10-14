---
type: reference
title: Vim Intellisense
description: "Subsection 19.28 of PLUGINS, Scripts."
tags: [kb-vi, plugins, scripts, extensions, colorschemes, list, active]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#19.28"
---

# 19.28 Vim Intellisense

[↑ PLUGINS, Scripts](/vi/kb-vi/19-plugins-scripts/README.md)

```text
Needless to say intellisense is very helpful while developing the programs. While developing Java or in .NET (C#) it is not possible to remember all the interfaces and its methods, APIs etc. The IDE or editor should help in a way to build programs. Vim helps in so many ways, and especially the auto-completion is provided by Vim, by default. But it does not give the intellisense which is beyond auto-completion. I think most of us know what is intellisense, which is provided by Visual Studio. It is also called CodeInsight. Intellisense in a broad sense means more. It can be listing methods, attributes, classes, interfaces, member variables, local variables, etc, provide online help and may be inline compilation. But we are not looking into building inline compilation.

Supported Languages

Intellisense is provided for the following languages:

Java
C++
C#
JSP
XML
HTML
SQL
```

### 19.28.1 install

```text
Installing Vim Intellisense should be simple. Intellisense is packaged in self-extracting executable. To start the installation download the Windows binaries and double click it. This will extract the files and start the installation. Intellisense can be installed manually if you build it from the source.

Follow the steps to install.

| 1. The figure below shows the Welcome screen of the installation. Press Next to Continue.
| 
| 2. Read the license and choose "I Agree" if you want to proceed.
| 
| 3. Choose the plugins you want to install. For JSP to work you need both HTML and Java plugins to be installed.
| 
| 4. In the dialog shown below, enter the Vim folder. Typically Vim folder will be C:\Vim.  DO NOT Vim Rumtime directory, which is usually C:\Vim\vim63.
| 
|  
| 
| 5. Enter the Java docs directory if you have selected Java plugin. If not, you will not get this screen.
| 
| 6. Make sure you set JAVA_HOME environment variable pointing to java installation directory. If not you will get this warning; setup will not set the JAVA_HOME directory. You need to set it manually.
| 
| 7. Choose Finish to end the installation. Read the Finish page for some important information.

Now setting up intellisense is finished. Happy Vimming.
Manual Installation

Vim Intellisense can be installed manually, if you downloaded the sources and built all by yourself. Manual installation is given the intellisense.txt which is present in the $VIM\vimfiles\docs\intellisense.txt.

Read the release notes for some last minute information and some work arounds.

If your intellisense still didn't work, then see the Trouble Shoot.

		19.28.2
```
