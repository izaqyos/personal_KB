---
type: reference
title: "neocomplcach, obsolete use neocomplete instead"
description: "Subsection 19.36 of PLUGINS, Scripts."
tags: [kb-vi, plugins, scripts, extensions, colorschemes, list, active]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#19.36"
---

# 19.36 neocomplcach, obsolete use neocomplete instead

[↑ PLUGINS, Scripts](/vi/kb-vi/19-plugins-scripts/README.md)

```text
 git clone git://github.com/Shougo/neocomplcache.vim
git clone git://github.com/Shougo/neocomplete.vim

Follow the instructions for install.
To use: just start typing. 
To Choose, either arrows and enter, or ctrl+i , or in my mappings ctrl+n descending , ctrl+l acsending
For manual completion from buffer/file etc use ctrl-x + P/F/L etc 

For RH 6 -  sudo yum install lua-devel.x86_64 
Note, for Linux RHEL 5.5 need to Install lua manually , ex:
a. Download sources 
b. build and Install 
# pwd
/tmp/lua-5.3.2
# ls
doc  Makefile  README  src
 make -C src clean all SYSCFLAGS="-DLUA_USE_LINUX" SYSLIBS="-Wl,-E -ldl -lreadline -lncurses"
 make linux test
# cp src/liblua.a  /usr/lib/
# cp ../../../lua-5.3.2/src/*.h /usr/include/

If you get this error:
error: #error "Compiler does not support 'long long'. Use option '-DLUA_32BITS'   or '-DLUA_C89_NUMBERS' (see file 'luaconf.h' for details)"
Manually edit
# pwd
/tmp/vim/vim/src
# vi Makefile 
...
So that:
# grep LUA_3 Makefile 
CFLAGS = -DLUA_32BITS

c. Build vim with lua 
# ./configure --with-features=huge             --enable-multibyte             --enable-pythoninterp             --enable-perlinterp             --enable-luainterp             --enable-gui=gtk2 --enable-cscope --prefix=/usr | grep lua
checking --enable-luainterp argument... yes
checking --with-lua-prefix argument... no
checking --with-luajit... no
checking for lua... no
checking if lua.h can be found in /usr/include... yes
checking if link with -L/usr/lib -llua is sane... yes
```
