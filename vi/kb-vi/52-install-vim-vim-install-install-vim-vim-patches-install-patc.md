---
type: reference
title: "Install VIM, vim_install, install_vim, VIM patches, install patches"
description: "Legacy vim KB section: Install VIM, vim_install, install_vim, VIM patches, install patches (On Linux by compiling the sources, Add features, on Windows)"
tags: [packaging, vim, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: deprecated
capture_type: source
legacy_source: "vi/KB_vi#51"
---

# Install VIM, vim_install, install_vim, VIM patches, install patches

> **Deprecated (2026-10):** Python 2.4 config. Current: Build with --enable-python3interp. Source: <https://docs.python.org/3/whatsnew/3.0.html>

[↑ KB_vi](/vi/kb-vi/README.md)

## 51.1 On Linux by compiling the sources

```text
-> DL sources from http://www.vim.org/sources.php
or git clone https://github.com/b4winckler/vim

-> Copy to location on LNX machine, example
$

-> For default installation just do 
./configure; make; sudo make install
```

### 51.1.1 Add features

```text
		-> 
./configure \
    --prefix=/usr/local/vim-7.4 \
    --enable-perlinterp \
    --enable-pythoninterp \
    --enable-rubyinterp \
    --enable-cscope \
    --enable-gui=auto \
    --enable-gtk2-check \
    --enable-gnome-check \
    --with-features=huge \
    --enable-multibyte \
    --with-x \
    --with-compiledby="Yosi Izaq" \
    --with-python-config-dir=/usr/lib/python2.4/config

-> For customized install edit the file src/Makefile
for example, to enable cscope uncomment line 
CONF_OPT_CSCOPE = --enable-cscope

Or for example, add support for +signs.
You need --with-features=big (or --with-features=huge)
The reference is the B in the first column of ":help +signs".
So in Makefile uncomment line 
CONF_OPT_FEAT = --with-features=big


Then do:
make distclean; make config; make; sudo make install
break this chain up in case of issues
```

## 51.2 on Windows

```text
see: <URL:#r=__vim_wo_cream__>
```

## 51.3 More on installation for linux

### 51.3.1 Some suggestions, didn't work for me

```text
 Vim 7 on Red Hat Enterprise Linux (RHEL) October 15, 2010

Following my last post I moved on to installing Vim 7.x as the one that comes with RHEL 4 is pretty outdated (6.x).
Vim 7.2 from SVN

Tested on RHEL 4 i386:

$ cd ~
$ svn co https://vim.svn.sourceforge.net/svnroot/vim/vim7
$ cd vim7
$ ./configure —prefix=/usr —with-features=huge —disable-gui —without-x —enable-rubyinterp —enable-cscope —enable-multibyte
$ make && make install
$ vim —version
VIM – Vi IMproved 7.2 (2008 Aug 9)

Vim 7.3 from Mercurial

Tested on RHEL 5 x86_64:

$ cd ~
$ yum install hg ncurses-devel
$ hg clone https://vim.googlecode.com/hg/ vim
$ cd vim
$ ./configure —prefix=/usr —with-features=huge —disable-gui —without-x —enable-rubyinterp —enable-cscope —enable-multibyte
$ make && make install
$ vim —version
VIM – Vi IMproved 7.3 (2010 Aug 15)

RHEL 4 comes with up2date. I tried -i mercurial and -i hg, but both failed. Vim offers an archived download so you can skip steps 3-4 above and instead use:

# [..]
$ wget ftp://ftp.vim.org/pub/vim/unix/vim-7.3.tar.bz2
$ tar xjvf vim-7.3.tar.bz2
$ cd vim73
# [..]
```

### 51.3.2 Manually, my example

```text
		- best way to get most recent version (w/ patches)
git clone https://github.com/vim/vim.git
# cd vim && git fetch && git merge
Already up-to-date.

-or manually compile and buid
cd vim/src
./configure --with-features=huge \
            --enable-multibyte \
            --enable-pythoninterp \
            --enable-perlinterp \
            --enable-luainterp \
            --enable-gui=gtk2 --enable-cscope --prefix=/usr






- Old way
E2E example w/o mercurial :
- su
- cd /tmp ; mkdir vim ; cd vim

- vim latest patches; ftp://ftp.vim.org/pub/vim/patches/7.4/
- PNUM="914"
cd .. && mkdir patches
for v in $( seq -f "%03g" ${PNUM} ) ; do  wget ftp://ftp.vim.org/pub/vim/patches/7.4/7.4.$v ; done
cd ..  
	
( pre-2015 way: wget ftp://ftp.vim.org/pub/vim/unix/vim-7.4.tar.bz2
bunzip2  vim-7.4.tar.bz2 ; tar xvf vim-7.4.tar ; cd vim74/
)

	# for v in $( seq -f "%03g" ${PNUM} ) ; do patch -p0 < ../patches/7.4.$v >& ../patch_install_p_7_4.$v.log; done

./configure --with-features=huge \
            --enable-multibyte \
            --enable-rubyinterp \
            --enable-pythoninterp \
            --with-python-config-dir=/usr/lib/python2.4/config \
            --enable-perlinterp \
            --enable-luainterp \
            --enable-gui=gtk2 --enable-cscope --prefix=/usr
make
make install 
----------------------------------------------------------------------------------------------------
Possible issues
- # /usr/bin/vim --version
/usr/bin/vim: error while loading shared libraries: libperl.so: cannot open shared object file: No such file or directory
	-- fix:
# ln -s /usr/lib64/perl5/5.10.0/x86_64-linux-thread-multi/CORE/libperl.so /usr/lib64/libperl.so
# /usr/bin/vim --version
VIM - Vi IMproved 7.4 (2013 Aug 10, compiled Nov 12 2015 10:59:04)
Included patches: 1-922
Compiled by <user>@gpk0128-pod
Huge version without GUI.  Features included (+) or not (-):
+acl             +farsi           +mouse_netterm   +syntax
+arabic          +file_in_path    +mouse_sgr       +tag_binary

- 
$ vim --version
/usr/bin/vim: error while loading shared libraries: libperl.so: cannot open shared object file: No such file or directory

fix: 
	-- on RH5
# locate libperl.so
/usr/NX/lib/perl/libperl.so
/usr/lib64/perl5/5.10.0/x86_64-linux-thread-multi/CORE/libperl.so
/usr/lib64/perl5/CORE/libperl.so
# ln -s /usr/lib64/perl5/CORE/libperl.so /usr/lib/libperl.so
# ln -s /usr/lib64/perl5/CORE/libperl.so /usr/lib64/libperl.so

	-- on RH6
$ locate libperl.so
/usr/lib64/perl5/5.10.0/x86_64-linux-thread-multi/CORE/libperl.so
/usr/lib64/perl5/CORE/libperl.so
$ sudo ln -s /usr/lib64/perl5/CORE/libperl.so /usr/lib/libperl.so
$ sudo ln -s /usr/lib64/perl5/CORE/libperl.so /usr/lib64/libperl.so

-
----------------------------------------------------------------------------------------------------
- su
- cd /tmp ; mkdir vim ; cd vim
- 7.3: wget ftp://ftp.vim.org/pub/vim/unix/vim-7.3.tar.bz2
- 7.4: wget ftp://ftp.vim.org/pub/vim/unix/vim-7.4.tar.bz2
- ls
- mkdir patches ;  cd patches/
- PNUM="179"
- 7.3:
	for v in $( seq -f "%03g" ${PNUM} ) ; do  wget ftp://ftp.vim.org/pub/vim/patches/7.3/7.3.$v ; done
	- cd .. ; bunzip2  vim-7.3.tar.bz2 ; tar xvf vim-7.3.tar
	# cd vim73/
	- # pwd
	/root/temp/vim/vim73
	- # for v in $( seq -f "%03g" ${PNUM} ) ; do patch -p0 < ../patches/7.3.$v >& ../patch_install_p_7_3.$v.log; done
- 7.4:
	for v in $( seq -f "%03g" ${PNUM} ) ; do  wget ftp://ftp.vim.org/pub/vim/patches/7.4/7.4.$v ; done
	- cd .. ; bunzip2  vim-7.4.tar.bz2 ; tar xvf vim-7.4.tar ; cd vim74/
	- # pwd
	/root/temp/vim/vim74
	- # for v in $( seq -f "%03g" ${PNUM} ) ; do patch -p0 < ../patches/7.4.$v >& ../patch_install_p_7_4.$v.log; done
- configure
or to add feature
configure --enable-pythoninterp --enable-rubyinterp --enable-python3interp --enable-cscope --enable-perlinterp --with-features=huge
# configure  --enable-rubyinterp  --enable-cscope --enable-perlinterp --with-features=huge
- make
	- Note how to fix checking for tgetent()... configure: error: NOT FOUND!
# yum install ncurses-devel.x86_64
# configure  --enable-rubyinterp  --enable-cscope --enable-perlinterp --with-features=huge --with-tlib=ncurses
	- os_unix.c:45:30: error: selinux/selinux.h: No such file or directory
# make distclean
# configure  --enable-rubyinterp  --enable-cscope --enable-perlinterp --with-features=huge --with-tlib=ncurses --disable-selinux  

	- /usr/bin/ld: skipping incompatible <internal-path> when searching for -lruby-static
/usr/bin/ld: cannot find -lruby-static
collect2: ld returned 1 exit status
link.sh: Linking failed
make[1]: *** [vim] Error 1
make[1]: Leaving directory `/tmp/vim/vim74/src'
make: *** [first] Error 2
	- 
     - lruby-static -lpthread -ldl -lcrypt -lm  -L<internal-path>   
/usr/bin/ld: skipping incompatible <internal-path> when searching for -lruby-static
/usr/bin/ld: cannot find -lruby-static

	# configure   --enable-cscope --enable-perlinterp --with-features=huge --with-tlib=ncurses --disable-selinux 
	- 
- make install
# vim --version
VIM - Vi IMproved 7.3 (2010 Aug 15, compiled Feb 21 2013 16:44:21)
Included patches: 1-831
Compiled by <user>@<user>-lnx
Huge version with GTK2 GUI.  Features included (+) or not (-):
+arabic          +file_in_path    +mouse_sgr       +tag_binary
+autocmd         +find_in_path    -mouse_sysmouse  +tag_old_static
+balloon_eval    +float           +mouse_urxvt     -tag_any_white
+browse          +folding         +mouse_xterm     -tcl
++builtin_terms  -footer          +multi_byte      +terminfo
+byte_offset     +fork()          +multi_lang      +termresponse
+cindent         +gettext         -mzscheme        +textobjects
+clientserver    -hangul_input    +netbeans_intg   +title
+clipboard       +iconv           +path_extra      +toolbar
+cmdline_compl   +insert_expand   +perl            +user_commands
+cmdline_hist    +jumplist        +persistent_undo +vertsplit
+cmdline_info    +keymap          +postscript      +virtualedit
+comments        +langmap         +printer         +visual
+conceal         +libcall         +profile         +visualextra
+cryptv          +linebreak       -python          +viminfo
+cscope          +lispindent      -python3         +vreplace
+cursorbind      +listcmds        +quickfix        +wildignore
+cursorshape     +localmap        +reltime         +wildmenu
+dialog_con_gui  -lua             +rightleft       +windows
+diff            +menu            +ruby            +writebackup
+digraphs        +mksession       +scrollbind      +X11
+dnd             +modify_fname    +signs           -xfontset
-ebcdic          +mouse           +smartindent     +xim
+emacs_tags      +mouseshape      -sniff           +xsmp_interact
+eval            +mouse_dec       +startuptime     +xterm_clipboard
+ex_extra        +mouse_gpm       +statusline      -xterm_save
+extra_search    -mouse_jsbterm   -sun_workshop    
+farsi           +mouse_netterm   +syntax          
   system vimrc file: "$VIM/vimrc"
     user vimrc file: "$HOME/.vimrc"
      user exrc file: "$HOME/.exrc"
  system gvimrc file: "$VIM/gvimrc"
    user gvimrc file: "$HOME/.gvimrc"
    system menu file: "$VIMRUNTIME/menu.vim"
  fall-back for $VIM: "/usr/local/share/vim"
Compilation: gcc -c -I. -Iproto -DHAVE_CONFIG_H -DFEAT_GUI_GTK  -DXTHREADS -D_REENTRANT -DXUSE_MTSAFE_API -I/usr/include/gtk-2.0 -I/usr/lib/
gtk-2.0/include -I/usr/X11R6/include -I/usr/include/atk-1.0 -I/usr/include/pango-1.0 -I/usr/include/freetype2 -I/usr/include/freetype2/confi
g -I/usr/include/glib-2.0 -I/usr/lib/glib-2.0/include     -g -O2   -I/usr/X11R6/include    
Linking: gcc  -L/usr/X11R6/lib   -rdynamic -Wl,-export-dynamic  -rdynamic   -L/usr/local/lib -o vim   -Wl,--export-dynamic -lgtk-x11-2.0 -lg
dk-x11-2.0 -latk-1.0 -lgdk_pixbuf-2.0 -lpangoxft-1.0 -lpangox-1.0 -lpango-1.0 -lgobject-2.0 -lgmodule-2.0 -lglib-2.0   -lXt -lm -lncurses -l
selinux -lacl -lgpm -rdynamic  <internal-path> -L<internal-path>
erl/perl-5.8.6/lib/5.8.6/i686-linux/CORE -lperl -lnsl -ldl -lm -lcrypt -lutil -lc    -lruby-static -ldl -lcrypt -lm  -L<internal-path>
uby/ruby-1.8.6/lib   

- make errors Addendum
...
gcc -c -I. -Iproto -DHAVE_CONFIG_H     -g -O2 -U_FORTIFY_SOURCE -D_FORTIFY_SOURCE=1       -o objects/os_unix.o os_unix.c
os_unix.c:45:30: error: selinux/selinux.h: No such file or directory
os_unix.c: In function ?mch_copy_sec?:
os_unix.c:2698: error: ?security_context_t? undeclared (first use in this function)
os_unix.c:2698: error: (Each undeclared identifier is reported only once
os_unix.c:2698: error: for each function it appears in.)
os_unix.c:2698: error: expected ?;? before ?from_context?
os_unix.c:2699: error: expected ?;? before ?to_context?
os_unix.c:2701: error: ?from_context? undeclared (first use in this function)
os_unix.c:2714: error: ?to_context? undeclared (first use in this function)
make[1]: *** [objects/os_unix.o] Error 1
make[1]: Leaving directory `/root/temp/vim/vim73/src'
make: *** [first] Error 2

- To fix
# yum libselinux-devel install
- make
OLD_PO_FILE_INPUT=yes msgfmt -v -o nb.mo nb.po
1672 translated messages.
make[2]: *** No rule to make target `nl.mo', needed by `all'.  Stop.
make[2]: Leaving directory `/root/temp/vim/vim73/src/po'
make[1]: *** [languages] Error 2
make[1]: Leaving directory `/root/temp/v m/vim73/src'
make: *** [first] Error 2

- Fix, create it manually and copy from: https://code.google.com/p/vim/source/browse/src/po/nl.po
# Dutch Translation for Vim vim:set foldmethod=marker:
# Do ":help uganda" in Vim to read copying and usage conditions.
# Do ":help credits" in Vim to see a list of people who contributed.
# Previous-Translator(s):
# highlight: oplichten
# Erwin Poeze <erwin.poeze@gmail.com>, 2011, 2012.
msgid ""
msgstr ""

- # rm /usr/bin/vim
rm: remove regular file `/usr/bin/vim'? y
# ln -s /usr/local/bin/vim /usr/bin/vim
# vim --version
VIM - Vi IMproved 7.3 (2010 Aug 15, compiled Jan 20 2013 10:47:37)
Included patches: 1, 1-497, 499-773
Compiled by <user>@<internal-host>
Normal version without GUI.  Features included (+) or not (-):
-arabic +autocmd -balloon_eval -browse +builtin_terms +byte_offset +cindent 
-clientserver -clipboard +cmdline_compl +cmdline_hist +cmdline_info +comments 
-conceal +cryptv -cscope +cursorbind +cursorshape +dialog_con +diff +digraphs 
-dnd -ebcdic -emacs_tags +eval +ex_extra +extra_search -farsi +file_in_path 
+find_in_path +float +folding -footer +fork() +gettext -hangul_input -iconv 
+insert_expand +jumplist -keymap -langmap +libcall +linebreak +lispindent 
+listcmds +localmap -lua +menu +mksession +modify_fname +mouse -mouseshape 
-mouse_dec -mouse_gpm -mouse_jsbterm -mouse_netterm -mouse_sgr -mouse_sysmouse 
-mouse_urxvt +mouse_xterm -multi_byte +multi_lang -mzscheme +netbeans_intg 
+path_extra -perl +persistent_undo +postscript +printer -profile -python 
-python3 +quickfix +reltime -rightleft -ruby +scrollbind +signs +smartindent 
-sniff +startuptime +statusline -sun_workshop +syntax +tag_binary 
+tag_old_static -tag_any_white -tcl +terminfo +termresponse +textobjects +title
 -toolbar +user_commands +vertsplit +virtualedit +visual +visualextra +viminfo 
+vreplace +wildignore +wildmenu +windows +writebackup -X11 -xfontset -xim -xsmp
 -xterm_clipboard -xterm_save 
   system vimrc file: "$VIM/vimrc"
     user vimrc file: "$HOME/.vimrc"
      user exrc file: "$HOME/.exrc"
  fall-back for $VIM: "/usr/local/share/vim"
Compilation: gcc -c -I. -Iproto -DHAVE_CONFIG_H     -g -O2 -U_FORTIFY_SOURCE -D_FORTIFY_SOURCE=1      
Linking: gcc   -L/usr/local/lib -Wl,--as-needed -o vim       -lm -lncurses -lnsl  -lselinux    
```

### 51.3.3 Install VIM using mercurial

```text
helpfull link: https://github.com/Valloric/YouCompleteMe/wiki/Building-Vim-from-source 
summary:
cd ~
(using mercurial - may need to install first, see "If you install python-setuptools you should be able
 to do easy_install mercurial."
 or $ sudo yum install mercurial )
(note - this will install with patches )
hg clone https://code.google.com/p/vim/
cd vim
./configure --with-features=huge \
            --enable-multibyte \
            --enable-rubyinterp \
            --enable-pythoninterp \
            --with-python-config-dir=/usr/lib/python2.4/config \
            --enable-perlinterp \
            --enable-luainterp \
            --enable-gui=gtk2 --enable-cscope --prefix=/usr
make VIMRUNTIMEDIR=/usr/share/vim/vim74
sudo make install
----------------------------------------------------------------------------------------------------
 sudo yum install ncurses-devel
```

## 51.4 On MAC

```text
https://macvim-dev.github.io/macvim/
https://github.com/macvim-dev/macvim/releases

Download binary. Install DMG, copy to Applications, open directly from Applications (just 1st time)
```

## 51.5 Install vim 8 on linux

### 51.5.1 Install git

```text
https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
 Getting Started - Installing Git
Installing Git
Before you start using Git, you have to make it available on your computer. Even if it’s already installed, it’s probably a good idea to update to the latest version. You can either install it as a package or via another installer, or download the source code and compile it yourself.

NOTE
This book was written using Git version 2.0.0. Though most of the commands we use should work even in ancient versions of Git, some of them might not or might act slightly differently if you’re using an older version. Since Git is quite excellent at preserving backwards compatibility, any version after 2.0 should work just fine.

Installing on Linux
If you want to install the basic Git tools on Linux via a binary installer, you can generally do so through the basic package-management tool that comes with your distribution. If you’re on Fedora for example, you can use yum:

$ sudo yum install git-all
If you’re on a Debian-based distribution like Ubuntu, try apt-get:

$ sudo apt-get install git-all
For more options, there are instructions for installing on several different Unix flavors on the Git website, at http://git-scm.com/download/linux.

Installing on Mac
There are several ways to install Git on a Mac. The easiest is probably to install the Xcode Command Line Tools. On Mavericks (10.9) or above you can do this simply by trying to run git from the Terminal the very first time. If you don’t have it installed already, it will prompt you to install it.

If you want a more up to date version, you can also install it via a binary installer. An OSX Git installer is maintained and available for download at the Git website, at http://git-scm.com/download/mac.

Git OS X installer.
Figure 1-7. Git OS X Installer.
You can also install it as part of the GitHub for Mac install. Their GUI Git tool has an option to install command line tools as well. You can download that tool from the GitHub for Mac website, at http://mac.github.com.

Installing on Windows
There are also a few ways to install Git on Windows. The most official build is available for download on the Git website. Just go to http://git-scm.com/download/win and the download will start automatically. Note that this is a project called Git for Windows, which is separate from Git itself; for more information on it, go to https://git-for-windows.github.io/.

Another easy way to get Git installed is by installing GitHub for Windows. The installer includes a command line version of Git as well as the GUI. It also works well with Powershell, and sets up solid credential caching and sane CRLF settings. We’ll learn more about those things a little later, but suffice it to say they’re things you want. You can download this from the GitHub for Windows website, at http://windows.github.com.

Installing from Source
Some people may instead find it useful to install Git from source, because you’ll get the most recent version. The binary installers tend to be a bit behind, though as Git has matured in recent years, this has made less of a difference.

If you do want to install Git from source, you need to have the following libraries that Git depends on: curl, zlib, openssl, expat, and libiconv. For example, if you’re on a system that has yum (such as Fedora) or apt-get (such as a Debian based system), you can use one of these commands to install the minimal dependencies for compiling and installing the Git binaries:

$ sudo yum install curl-devel expat-devel gettext-devel \
  openssl-devel perl-devel zlib-devel
$ sudo apt-get install libcurl4-gnutls-dev libexpat1-dev gettext \
  libz-dev libssl-dev
In order to be able to add the documentation in various formats (doc, html, info), these additional dependencies are required (Note: users of RHEL and RHEL-derivatives like CentOS and Scientific Linux will have to enable the EPEL repository to download the docbook2X package):

$ sudo yum install asciidoc xmlto docbook2X
$ sudo apt-get install asciidoc xmlto docbook2x
Additionally, if you’re using Fedora/RHEL/RHEL-derivatives, you need to do this

$ sudo ln -s /usr/bin/db2x_docbook2texi /usr/bin/docbook2x-texi
due to binary name differences.

When you have all the necessary dependencies, you can go ahead and grab the latest tagged release tarball from several places. You can get it via the Kernel.org site, at https://www.kernel.org/pub/software/scm/git, or the mirror on the GitHub web site, at https://github.com/git/git/releases. It’s generally a little clearer what the latest version is on the GitHub page, but the kernel.org page also has release signatures if you want to verify your download.

Then, compile and install:

$ tar -zxf git-2.0.0.tar.gz
$ cd git-2.0.0
$ make configure
$ ./configure --prefix=/usr
$ make all doc info
$ sudo make install install-doc install-html install-info
After this is done, you can also get Git via Git itself for updates:

$ git clone git://git.kernel.org/pub/scm/git/git.git

Note, if git can't access network, a proxy might be required
ex:
$ git clone https://github.com/vim/vim.git
Cloning into 'vim'...
fatal: unable to access 'https://github.com/vim/vim.git/': Could not resolve host: github.com
$ set_proxy 
$ git clone https://github.com/vim/vim.git

when set_proxy is
#GE related
set_proxy() {
    local proxy_url=http://<internal-host>:88
    export ftp_proxy=${proxy_url}
    export FTP_PROXY=${proxy_url}
    export http_proxy=${proxy_url}
    export HTTP_PROXY=${proxy_url}
    export https_proxy=${proxy_url}
    export HTTPS_PROXY=${proxy_url}
    export proxy=${proxy_url}
    export PROXY=${proxy_url}
    export no_proxy='<internal-host>,localhost,127.0.0.1'
    export NO_PROXY=${no_proxy}
}
```

### 51.5.2 Get vim

```text
either directly by git
git clone https://github.com/vim/vim.git

(or copy to MAC and pass to linux )
```

### 51.5.3 Compile

```text
# ./configure --with-features=huge             --enable-multibyte             --enable-pythoninterp             --enable-luainterp             --enable-gui=gtk2 --enable-cscope --prefix=/usr | grep lua

sudo make install
		51.5.4
```

## 51.6 Install vim 8 on GE linux Suse server

```text
git clone https://github.com/vim/vim.git
a. on cygwin:
    $ cd vim && git fetch && git merge

b. configure
./configure --with-features=huge \
            --enable-multibyte \
            --enable-rubyinterp \
            --enable-pythoninterp \
            --enable-perlinterp \
            --enable-luainterp \
            --enable-gui=gtk2 --enable-cscope --prefix=/usr

c. make

d. install

Note, no root access so make sure to
make install DESTDIR=~/.local, then make a symlink in ~/bin to ~/.local/bin/vim.
ex:
<user>@<internal-host>:/home/<user>> mkdir bin
<user>@<internal-host>:/home/<user>> cd .local/ 
<user>@<internal-host>:/home/<user>/.local> cd ../bin/
<user>@<internal-host>:/home/<user>/bin> ln -s /home/<user>/.local/usr/bin/vim vim                                                                                                           
<user>@<internal-host>:/home/<user>/bin> ls -l vim
lrwxrwxrwx 1 <user> unity 33 2017-11-14 01:20 vim -> /home/<user>/.local/usr/bin/vim*
<user>@<internal-host>:/home/<user>/bin> export PATH="$HOME/bin:$PATH"

add to .kshrc
<user>@<internal-host>:/home/<user>/bin> vim --version                   
VIM - Vi IMproved 8.0 (2016 Sep 12, compiled Nov 14 2017 00:39:11)
Included patches: 1-1297
Compiled by <user>@<internal-host>
Huge version without GUI.  Features included (+) or not (-):
+acl             +farsi           +mouse_netterm   +tag_binary
+arabic          +file_in_path    +mouse_sgr       +tag_old_static
+autocmd         +find_in_path    -mouse_sysmouse  -tag_any_white
-autoservername  +float           +mouse_urxvt     -tcl
-balloon_eval    +folding         +mouse_xterm     +termguicolors
-browse          -footer          +multi_byte      +terminal
++builtin_terms  +fork()          +multi_lang      +terminfo
+byte_offset     +gettext         -mzscheme        +termresponse
+channel         -hangul_input    +netbeans_intg   +textobjects
+cindent         +iconv           +num64           +timers
+clientserver    +insert_expand   +packages        +title
+clipboard       +job             +path_extra      -toolbar
+cmdline_compl   +jumplist        +perl            +user_commands
+cmdline_hist    +keymap          +persistent_undo +vertsplit
+cmdline_info    +lambda          +postscript      +virtualedit
+comments        +langmap         +printer         +visual
+conceal         +libcall         +profile         +visualextra
+cryptv          +linebreak       +python          +viminfo
+cscope          +lispindent      -python3         +vreplace
+cursorbind      +listcmds        +quickfix        +wildignore
+cursorshape     +localmap        +reltime         +wildmenu
+dialog_con      -lua             +rightleft       +windows
+diff            +menu            -ruby            +writebackup
+digraphs        +mksession       +scrollbind      +X11
-dnd             +modify_fname    +signs           +xfontset
-ebcdic          +mouse           +smartindent     -xim
+emacs_tags      -mouseshape      +startuptime     +xpm
+eval            +mouse_dec       +statusline      +xsmp_interact
+ex_extra        +mouse_gpm       -sun_workshop    +xterm_clipboard
+extra_search    -mouse_jsbterm   +syntax          -xterm_save
   system vimrc file: "$VIM/vimrc"
     user vimrc file: "$HOME/.vimrc"
 2nd user vimrc file: "~/.vim/vimrc"
      user exrc file: "$HOME/.exrc"
       defaults file: "$VIMRUNTIME/defaults.vim"
  fall-back for $VIM: "/usr/share/vim"
Compilation: gcc -c -I. -Iproto -DHAVE_CONFIG_H     -g -O2 -U_FORTIFY_SOURCE -D_FORTIFY_SOURCE=1       
Linking: gcc   -Wl,-E -Wl,-rpath,/usr/lib/perl5/5.10.0/x86_64-linux-thread-multi/CORE   -L/usr/local/lib -Wl,--as-needed -o vim    -lSM -lICE -lXpm -lXt -lX11 -lXdmcp -lSM -lICE  -lm -lncurses -lnsl   -lgpm   -Wl,-E -Wl,-rpath,/usr/lib/perl5/5.10.0/x86_64-linux-thread-multi/CORE  -L/usr/local/lib64  -L/usr/lib/perl5/5.10.0/x86_64-linux-thread-multi/CORE -lperl -lm -ldl -lcrypt -lpthread -L/usr/lib64/python2.6/config -lpython2.6 -lpthread -ldl -lutil -lm -Xlinker -export-dynamic       

f. set VIMRUNTIME
<user>@<internal-host>:/home/<user>/temp/cscope-15.8b> export VIMRUNTIME=/home/<user>/.local/usr/share/vim/vim80/                  
<user>@<internal-host>:/home/<user>/temp/cscope-15.8b> echo $VIMRUNTIME
Also set kshrc

g. install cscope

    g1. get that tarball copy to machine
    g2. configure -h for options then
    <user>@<internal-host>:/home/<user>/temp/cscope-15.8b> ./configure --prefix=/home/<user>/.local/
    g3. make && make install
    g4. symlink in bin
<user>@<internal-host>:/home/<user>/bin> find  /home/<user>/.local/ -name cscope                                                                                                             /home/<user>/.local/bin/cscope
<user>@<internal-host>:/home/<user>/bin> ln -s /home/<user>/.local/bin/cscope cscope  
<user>@<internal-host>:/home/<user>/bin> ll cscope 
lrwxrwxrwx 1 <user> unity 32 2017-11-14 02:11 cscope -> /home/<user>/.local/bin/cscope*

h.
	51.7
```
