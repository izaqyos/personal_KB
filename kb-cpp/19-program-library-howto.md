---
type: reference
title: Program Library HOWTO
description: "Program Library HOWTO: building and using static libraries, shared libraries and dynamically loaded libraries on Linux."
tags: [c, linux, gcc, howto, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-cpp#19"
---

# Program Library HOWTO

[↑ kb-cpp](/kb-cpp/README.md)

```text
http://tldp.org/HOWTO/Program-Library-HOWTO/index.html
```

## 19.1 Introduction

```text
This HOWTO for programmers discusses how to create and use program libraries on Linux using the GNU toolset. A ``program library'' is simply a file containing compiled code (and data) that is to be incorporated later into a program; program libraries allow programs to be more modular, faster to recompile, and easier to update. Program libraries can be divided into three types: static libraries, shared libraries, and dynamically loaded (DL) libraries.

This paper first discusses static libraries, which are installed into a program executable before the program can be run. It then discusses shared libraries, which are loaded at program start-up and shared between programs. Finally, it discusses dynamically loaded (DL) libraries, which can be loaded and used at any time while a program is running. DL libraries aren't really a different kind of library format (both static and shared libraries can be used as DL libraries); instead, the difference is in how DL libraries are used by programmers. The HOWTO wraps up with a section with more examples and a section with references to other sources of information.

Most developers who are developing libraries should create shared libraries, since these allow users to update their libraries separately from the applications that use the libraries. Dynamically loaded (DL) libraries are useful, but they require a little more work to use and many programs don't need the flexibility they offer. Conversely, static libraries make upgrading libraries far more troublesome, so for general-purpose use they're hard to recommend. Still, each have their advantages, and the advantages of each type are described in the section discussing that type. Developers using C++ and dynamically loaded (DL) libraries should also consult the ``C++ dlopen mini-HOWTO''.

It's worth noting that some people use the term dynamically linked libraries (DLLs) to refer to shared libraries, some use the term DLL to mean any library that is used as a DL library, and some use the term DLL to mean a library meeting either condition. No matter which meaning you pick, this HOWTO covers DLLs on Linux.

This HOWTO discusses only the Executable and Linking Format (ELF) format for executables and libraries, the format used by nearly all Linux distributions today. The GNU gcc toolset can actually handle library formats other than ELF; in particular, most Linux distributions can still use the obsolete a.out format. However, these formats are outside the scope of this paper.

If you're building an application that should port to many systems, you might consider using GNU libtool to build and install libraries instead of using the Linux tools directly. GNU libtool is a generic library support script that hides the complexity of using shared libraries (e.g., creating and installing them) behind a consistent, portable interface. On Linux, GNU libtool is built on top of the tools and conventions described in this HOWTO. For a portable interface to dynamically loaded libraries, you can use various portability wrappers. GNU libtool includes such a wrapper, called ``libltdl''. Alternatively, you could use the glib library (not to be confused with glibc) with its portable support for Dynamic Loading of Modules. You can learn more about glib at http://developer.gnome.org/doc/API/glib/glib-dynamic-loading-of-modules.html. Again, on Linux this functionality is implemented using the constructs described in this HOWTO. If you're actually developing or debugging the code on Linux, you'll probably still want the information in this HOWTO.

This HOWTO's master location is http://www.dwheeler.com/program-library, and it has been contributed to the Linux Documentation Project (http://www.linuxdoc.org). It is Copyright (C) 2000 David A. Wheeler and is licensed through the General Public License (GPL); see the last section for more information.
```

## 19.2 Static Libraries

```text
Static libraries are simply a collection of ordinary object files; conventionally, static libraries end with the ``.a'' suffix. This collection is created using the ar (archiver) program. Static libraries aren't used as often as they once were, because of the advantages of shared libraries (described below). Still, they're sometimes created, they existed first historically, and they're simpler to explain.

Static libraries permit users to link to programs without having to recompile its code, saving recompilation time. Note that recompilation time is less important given today's faster compilers, so this reason is not as strong as it once was. Static libraries are often useful for developers if they wish to permit programmers to link to their library, but don't want to give the library source code (which is an advantage to the library vendor, but obviously not an advantage to the programmer trying to use the library). In theory, code in static ELF libraries that is linked into an executable should run slightly faster (by 1-5%) than a shared library or a dynamically loaded library, but in practice this rarely seems to be the case due to other confounding factors.

To create a static library, or to add additional object files to an existing static library, use a command like this:

ar rcs my_library.a file1.o file2.o
This sample command adds the object files file1.o and file2.o to the static library my_library.a, creating my_library.a if it doesn't already exist. For more information on creating static libraries, see ar(1).

Once you've created a static library, you'll want to use it. You can use a static library by invoking it as part of the compilation and linking process when creating a program executable. If you're using gcc(1) to generate your executable, you can use the -l option to specify the library; see info:gcc for more information.

Be careful about the order of the parameters when using gcc; the -l option is a linker option, and thus needs to be placed AFTER the name of the file to be compiled. This is quite different from the normal option syntax. If you place the -l option before the filename, it may fail to link at all, and you can end up with mysterious errors.

You can also use the linker ld(1) directly, using its -l and -L options; however, in most cases it's better to use gcc(1) since the interface of ld(1) is more likely to change.
```

## 19.3 Shared Libraries

```text
Shared libraries are libraries that are loaded by programs when they start. When a shared library is installed properly, all programs that start afterwards automatically use the new shared library. It's actually much more flexible and sophisticated than this, because the approach used by Linux permits you to:

update libraries and still support programs that want to use older, non-backward-compatible versions of those libraries;

override specific libraries or even specific functions in a library when executing a particular program.

do all this while programs are running using existing libraries.
```

### 19.3.1 Conventions

```text
For shared libraries to support all of these desired properties, a number of conventions and guidelines must be followed. You need to understand the difference between a library's names, in particular its ``soname'' and ``real name'' (and how they interact). You also need to understand where they should be placed in the filesystem.
```

#### 19.3.1.1 Shared Library Names

```text
Every shared library has a special name called the ``soname''. The soname has the prefix ``lib'', the name of the library, the phrase ``.so'', followed by a period and a version number that is incremented whenever the interface changes (as a special exception, the lowest-level C libraries don't start with ``lib''). A fully-qualified soname includes as a prefix the directory it's in; on a working system a fully-qualified soname is simply a symbolic link to the shared library's ``real name''.

Every shared library also has a ``real name'', which is the filename containing the actual library code. The real name adds to the soname a period, a minor number, another period, and the release number. The last period and release number are optional. The minor number and release number support configuration control by letting you know exactly what version(s) of the library are installed. Note that these numbers might not be the same as the numbers used to describe the library in documentation, although that does make things easier.

In addition, there's the name that the compiler uses when requesting a library, (I'll call it the ``linker name''), which is simply the soname without any version number.

The key to managing shared libraries is the separation of these names. Programs, when they internally list the shared libraries they need, should only list the soname they need. Conversely, when you create a shared library, you only create the library with a specific filename (with more detailed version information). When you install a new version of a library, you install it in one of a few special directories and then run the program ldconfig(8). ldconfig examines the existing files and creates the sonames as symbolic links to the real names, as well as setting up the cache file /etc/ld.so.cache (described in a moment).

ldconfig doesn't set up the linker names; typically this is done during library installation, and the linker name is simply created as a symbolic link to the ``latest'' soname or the latest real name. I would recommend having the linker name be a symbolic link to the soname, since in most cases if you update the library you'd like to automatically use it when linking. I asked H. J. Lu why ldconfig doesn't automatically set up the linker names. His explanation was basically that you might want to run code using the latest version of a library, but might instead want development to link against an old (possibly incompatible) library. Therefore, ldconfig makes no assumptions about what you want programs to link to, so installers must specifically modify symbolic links to update what the linker will use for a library.

Thus, /usr/lib/libreadline.so.3 is a fully-qualified soname, which ldconfig would set to be a symbolic link to some realname like /usr/lib/libreadline.so.3.0. There should also be a linker name, /usr/lib/libreadline.so which could be a symbolic link referring to /usr/lib/libreadline.so.3.
```

#### 19.3.1.2 Filesystem Placement

```text
Shared libraries must be placed somewhere in the filesystem. Most open source software tends to follow the GNU standards; for more information see the info file documentation at info:standards#Directory_Variables. The GNU standards recommend installing by default all libraries in /usr/local/lib when distributing source code (and all commands should go into /usr/local/bin). They also define the convention for overriding these defaults and for invoking the installation routines.

The Filesystem Hierarchy Standard (FHS) discusses what should go where in a distribution (see http://www.pathname.com/fhs). According to the FHS, most libraries should be installed in /usr/lib, but libraries required for startup should be in /lib and libraries that are not part of the system should be in /usr/local/lib.

There isn't really a conflict between these two documents; the GNU standards recommend the default for developers of source code, while the FHS recommends the default for distributors (who selectively override the source code defaults, usually via the system's package management system). In practice this works nicely: the ``latest'' (possibly buggy!) source code that you download automatically installs itself in the ``local'' directory (/usr/local), and once that code has matured the package managers can trivially override the default to place the code in the standard place for distributions. Note that if your library calls programs that can only be called via libraries, you should place those programs in /usr/local/libexec (which becomes /usr/libexec in a distribution). One complication is that Red Hat-derived systems don't include /usr/local/lib by default in their search for libraries; see the discussion below about /etc/ld.so.conf. Other standard library locations include /usr/X11R6/lib for X-windows. Note that /lib/security is used for PAM modules, but those are usually loaded as DL libraries (also discussed below).
```

### 19.3.2 How Libraries are Used

```text
On GNU glibc-based systems, including all Linux systems, starting up an ELF binary executable automatically causes the program loader to be loaded and run. On Linux systems, this loader is named /lib/ld-linux.so.X (where X is a version number). This loader, in turn, finds and loads all other shared libraries used by the program.

The list of directories to be searched is stored in the file /etc/ld.so.conf. Many Red Hat-derived distributions don't normally include /usr/local/lib in the file /etc/ld.so.conf. I consider this a bug, and adding /usr/local/lib to /etc/ld.so.conf is a common ``fix'' required to run many programs on Red Hat-derived systems.

If you want to just override a few functions in a library, but keep the rest of the library, you can enter the names of overriding libraries (.o files) in /etc/ld.so.preload; these ``preloading'' libraries will take precedence over the standard set. This preloading file is typically used for emergency patches; a distribution usually won't include such a file when delivered.

Searching all of these directories at program start-up would be grossly inefficient, so a caching arrangement is actually used. The program ldconfig(8) by default reads in the file /etc/ld.so.conf, sets up the appropriate symbolic links in the dynamic link directories (so they'll follow the standard conventions), and then writes a cache to /etc/ld.so.cache that's then used by other programs. This greatly speeds up access to libraries. The implication is that ldconfig must be run whenever a DLL is added, when a DLL is removed, or when the set of DLL directories changes; running ldconfig is often one of the steps performed by package managers when installing a library. On start-up, then, the dynamic loader actually uses the file /etc/ld.so.cache and then loads the libraries it needs.

By the way, FreeBSD uses slightly different filenames for this cache. In FreeBSD, the ELF cache is /var/run/ld-elf.so.hints and the a.out cache is /var/run/ld.so.hints. These are still updated by ldconfig(8), so this difference in location should only matter in a few exotic situations.
```

### 19.3.3 Environment Variables

```text
Various environment variables can control this process, and there are environment variables that permit you to override this process.
```

#### 19.3.3.1 LD_LIBRARY_PATH

```text
You can temporarily substitute a different library for this particular execution. In Linux, the environment variable LD_LIBRARY_PATH is a colon-separated set of directories where libraries should be searched for first, before the standard set of directories; this is useful when debugging a new library or using a nonstandard library for special purposes. The environment variable LD_PRELOAD lists shared libraries with functions that override the standard set, just as /etc/ld.so.preload does. These are implemented by the loader /lib/ld-linux.so. I should note that, while LD_LIBRARY_PATH works on many Unix-like systems, it doesn't work on all; for example, this functionality is available on HP-UX but as the environment variable SHLIB_PATH, and on AIX this functionality is through the variable LIBPATH (with the same syntax, a colon-separated list).

LD_LIBRARY_PATH is handy for development and testing, but shouldn't be modified by an installation process for normal use by normal users; see ``Why LD_LIBRARY_PATH is Bad'' at http://www.visi.com/~barr/ldpath.html for an explanation of why. But it's still useful for development or testing, and for working around problems that can't be worked around otherwise. If you don't want to set the LD_LIBRARY_PATH environment variable, on Linux you can even invoke the program loader directly and pass it arguments. For example, the following will use the given PATH instead of the content of the environment variable LD_LIBRARY_PATH, and run the given executable:
  /lib/ld-linux.so.2 --library-path PATH EXECUTABLE
Just executing ld-linux.so without arguments will give you more help on using this, but again, don't use this for normal use - these are all intended for debugging.
```

#### 19.3.3.2 LD_DEBUG

```text
Another useful environment variable in the GNU C loader is LD_DEBUG. This triggers the dl* functions so that they give quite verbose information on what they are doing. For example:
  export LD_DEBUG=files
  command_to_run
displays the processing of files and libraries when handling libraries, telling you what dependencies are detected and which SOs are loaded in what order. Setting LD_DEBUG to ``bindings'' displays information about symbol binding, setting it to ``libs'' displays the library search paths, and setting ti to ``versions'' displays the version depdendencies.

Setting LD_DEBUG to ``help'' and then trying to run a program will list the possible options. Again, LD_DEBUG isn't intended for normal use, but it can be handy when debugging and testing.
```

#### 19.3.3.3 Other Environment Variables

```text
There are actually a number of other environment variables that control the loading process; their names begin with LD_ or RTLD_. Most of the others are for low-level debugging of the loader process or for implementing specialized capabilities. Most of them aren't well-documented; if you need to know about them, the best way to learn about them is to read the source code of the loader (part of gcc).

Permitting user control over dynamically linked libraries would be disastrous for setuid/setgid programs if special measures weren't taken. Therefore, in the GNU loader (which loads the rest of the program on program start-up), if the program is setuid or setgid these variables (and other similar variables) are ignored or greatly limited in what they can do. The loader determines if a program is setuid or setgid by checking the program's credentials; if the uid and euid differ, or the gid and the egid differ, the loader presumes the program is setuid/setgid (or descended from one) and therefore greatly limits its abilities to control linking. If you read the GNU glibc library source code, you can see this; see especially the files elf/rtld.c and sysdeps/generic/dl-sysdep.c. This means that if you cause the uid and gid to equal the euid and egid, and then call a program, these variables will have full effect. Other Unix-like systems handle the situation differently but for the same reason: a setuid/setgid program should not be unduly affected by the environment variables set.
```

### 19.3.4 Creating a Shared Library

```text
Creating a shared library is easy. First, create the object files that will go into the shared library using the gcc -fPIC or -fpic flag. The -fPIC and -fpic options enable ``position independent code'' generation, a requirement for shared libraries; see below for the differences. You pass the soname using the -Wl gcc option. The -Wl option passes options along to the linker (in this case the -soname linker option) - the commas after -Wl are not a typo, and you must not include unescaped whitespace in the option. Then create the shared library using this format:

gcc -shared -Wl,-soname,your_soname \
    -o library_name file_list library_list
Here's an example, which creates two object files (a.o and b.o) and then creates a shared library that contains both of them. Note that this compilation includes debugging information (-g) and will generate warnings (-Wall), which aren't required for shared libraries but are recommended. The compilation generates object files (using -c), and includes the required -fPIC option:

gcc -fPIC -g -c -Wall a.c
gcc -fPIC -g -c -Wall b.c
gcc -shared -Wl,-soname,libmystuff.so.1 \
    -o libmystuff.so.1.0.1 a.o b.o -lc
Here are a few points worth noting:

Don't strip the resulting library, and don't use the compiler option -fomit-frame-pointer unless you really have to. The resulting library will work, but these actions make debuggers mostly useless.

Use -fPIC or -fpic to generate code. Whether to use -fPIC or -fpic to generate code is target-dependent. The -fPIC choice always works, but may produce larger code than -fpic (mnenomic to remember this is that PIC is in a larger case, so it may produce larger amounts of code). Using -fpic option usually generates smaller and faster code, but will have platform-dependent limitations, such as the number of globally visible symbols or the size of the code. The linker will tell you whether it fits when you create the shared library. When in doubt, I choose -fPIC, because it always works.

In some cases, the call to gcc to create the object file will also need to include the option ``-Wl,-export-dynamic''. Normally, the dynamic symbol table contains only symbols which are used by a dynamic object. This option (when creating an ELF file) adds all symbols to the dynamic symbol table (see ld(1) for more information). You need to use this option when there are 'reverse dependencies', i.e., a DL library has unresolved symbols that by convention must be defined in the programs that intend to load these libraries. For ``reverse dependencies'' to work, the master program must make its symbols dynamically available. Note that you could say ``-rdynamic'' instead of ``-Wl,export-dynamic'' if you only work with Linux systems, but according to the ELF documentation the ``-rdynamic'' flag doesn't always work for gcc on non-Linux systems.

During development, there's the potential problem of modifying a library that's also used by many other programs -- and you don't want the other programs to use the ``developmental''library, only a particular application that you're testing against it. One link option you might use is ld's ``rpath'' option, which specifies the runtime library search path of that particular program being compiled. From gcc, you can invoke the rpath option by specifying it this way:
 -Wl,-rpath,$(DEFAULT_LIB_INSTALL_PATH)
If you use this option when building the library client program, you don't need to bother with LD_LIBRARY_PATH (described next) other than to ensure it's not conflicting, or using other techniques to hide the library.
```

### 19.3.5 Installing and Using a Shared Library

```text
Once you've created a shared library, you'll want to install it. The simple approach is simply to copy the library into one of the standard directories (e.g., /usr/lib) and run ldconfig(8).

First, you'll need to create the shared libraries somewhere. Then, you'll need to set up the necessary symbolic links, in particular a link from a soname to the real name (as well as from a versionless soname, that is, a soname that ends in ``.so'' for users who don't specify a version at all). The simplest approach is to run:
 ldconfig -n directory_with_shared_libraries

Finally, when you compile your programs, you'll need to tell the linker about any static and shared libraries that you're using. Use the -l and -L options for this.

If you can't or don't want to install a library in a standard place (e.g., you don't have the right to modify /usr/lib), then you'll need to change your approach. In that case, you'll need to install it somewhere, and then give your program enough information so the program can find the library... and there are several ways to do that. You can use gcc's -L flag in simple cases. You can use the ``rpath'' approach (described above), particularly if you only have a specific program to use the library being placed in a ``non-standard'' place. You can also use environment variables to control things. In particular, you can set LD_LIBRARY_PATH, which is a colon-separated list of directories in which to search for shared libraries before the usual places. If you're using bash, you could invoke my_program this way using:

LD_LIBRARY_PATH=.:$LD_LIBRARY_PATH  my_program
If you want to override just a few selected functions, you can do this by creating an overriding object file and setting LD_PRELOAD; the functions in this object file will override just those functions (leaving others as they were).

Usually you can update libraries without concern; if there was an API change, the library creator is supposed to change the soname. That way, multiple libraries can be on a single system, and the right one is selected for each program. However, if a program breaks on an update to a library that kept the same soname, you can force it to use the older library version by copying the old library back somewhere, renaming the program (say to the old name plus ``.orig''), and then create a small ``wrapper'' script that resets the library to use and calls the real (renamed) program. You could place the old library in its own special area, if you like, though the numbering conventions do permit multiple versions to live in the same directory. The wrapper script could look something like this:
  #!/bin/sh
  export LD_LIBRARY_PATH=/usr/local/my_lib:$LD_LIBRARY_PATH
  exec /usr/bin/my_program.orig $*
Please don't depend on this when you write your own programs; try to make sure that your libraries are either backwards-compatible or that you've incremented the version number in the soname every time you make an incompatible change. This is just an ``emergency'' approach to deal with worst-case problems.

You can see the list of the shared libraries used by a program using ldd(1). So, for example, you can see the shared libraries used by ls by typing:
  ldd /bin/ls
Generally you'll see a list of the sonames being depended on, along with the directory that those names resolve to. In practically all cases you'll have at least two dependencies:

/lib/ld-linux.so.N (where N is 1 or more, usually at least 2). This is the library that loads all other libraries.

libc.so.N (where N is 6 or more). This is the C library. Even other languages tend to use the C library (at least to implement their own libraries), so most programs at least include this one.

Beware: do not run ldd on a program you don't trust. As is clearly stated in the ldd(1) manual, ldd works by (in certain cases) by setting a special environment variable (for ELF objects, LD_TRACE_LOADED_OBJECTS) and then executing the program. It may be possible for an untrusted program to force the ldd user to run arbitrary code (instead of simply showing the ldd information). So, for safety's sake, don't use ldd on programs you don't trust to execute.
```

### 19.3.6 Incompatible Libraries

```text
When a new version of a library is binary-incompatible with the old one the soname needs to change. In C, there are four basic reasons that a library would cease to be binary compatible:

The behavior of a function changes so that it no longer meets its original specification,

Exported data items change (exception: adding optional items to the ends of structures is okay, as long as those structures are only allocated within the library).

An exported function is removed.

The interface of an exported function changes.

If you can avoid these reasons, you can keep your libraries binary-compatible. Said another way, you can keep your Application Binary Interface (ABI) compatible if you avoid such changes. For example, you might want to add new functions but not delete the old ones. You can add items to structures but only if you can make sure that old programs won't be sensitive to such changes by adding items only to the end of the structure, only allowing the library (and not the application) to allocate the structure, making the extra items optional (or having the library fill them in), and so on. Watch out - you probably can't expand structures if users are using them in arrays.

For C++ (and other languages supporting compiled-in templates and/or compiled dispatched methods), the situation is trickier. All of the above issues apply, plus many more issues. The reason is that some information is implemented ``under the covers'' in the compiled code, resulting in dependencies that may not be obvious if you don't know how C++ is typically implemented. Strictly speaking, they aren't ``new'' issues, it's just that compiled C++ code invokes them in ways that may be surprising to you. The following is a (probably incomplete) list of things that you cannot do in C++ and retain binary compatibility, as reported by Troll Tech's Technical FAQ:

add reimplementations of virtual functions (unless it it safe for older binaries to call the original implementation), because the compiler evaluates SuperClass::virtualFunction() calls at compile-time (not link-time).

add or remove virtual member functions, because this would change the size and layout of the vtbl of every subclass.

change the type of any data members or move any data members that can be accessed via inline member functions.

change the class hierarchy, except to add new leaves.

add or remove private data members, because this would change the size and layout of every subclass.

remove public or protected member functions unless they are inline.

make a public or protected member function inline.

change what an inline function does, unless the old version continues working.

change the access rights (i.e. public, protected or private) of a member function in a portable program, because some compilers mangle the access rights into the function name.

Given this lengthy list, developers of C++ libraries in particular must plan for more than occasional updates that break binary compatibility. Fortunately, on Unix-like systems (including Linux) you can have multiple versions of a library loaded at the same time, so while there is some disk space loss, users can still run ``old'' programs needing old libraries.
```

## 19.4 Dynamically Loaded (DL) Libraries

```text
Dynamically loaded (DL) libraries are libraries that are loaded at times other than during the startup of a program. They're particularly useful for implementing plugins or modules, because they permit waiting to load the plugin until it's needed. For example, the Pluggable Authentication Modules (PAM) system uses DL libraries to permit administrators to configure and reconfigure authentication. They're also useful for implementing interpreters that wish to occasionally compile their code into machine code and use the compiled version for efficiency purposes, all without stopping. For example, this approach can be useful in implementing a just-in-time compiler or multi-user dungeon (MUD).

In Linux, DL libraries aren't actually special from the point-of-view of their format; they are built as standard object files or standard shared libraries as discussed above. The main difference is that the libraries aren't automatically loaded at program link time or start-up; instead, there is an API for opening a library, looking up symbols, handling errors, and closing the library. C users will need to include the header file <dlfcn.h> to use this API.

The interface used by Linux is essentially the same as that used in Solaris, which I'll call the ``dlopen()'' API. However, this same interface is not supported by all platforms; HP-UX uses the different shl_load() mechanism, and Windows platforms use DLLs with a completely different interface. If your goal is wide portability, you probably ought to consider using some wrapping library that hides differences between platforms. One approach is the glib library with its support for Dynamic Loading of Modules; it uses the underlying dynamic loading routines of the platform to implement a portable interface to these functions. You can learn more about glib at http://developer.gnome.org/doc/API/glib/glib-dynamic-loading-of-modules.html. Since the glib interface is well-explained in its documentation, I won't discuss it further here. Another approach is to use libltdl, which is part of GNU libtool. If you want much more functionality than this, you might want to look into a CORBA Object Request Broker (ORB). If you're still interested in directly using the interface supported by Linux and Solaris, read on.

Developers using C++ and dynamically loaded (DL) libraries should also consult the ``C++ dlopen mini-HOWTO''.
```

### 19.4.1 dlopen()

```text
The dlopen(3) function opens a library and prepares it for use. In C its prototype is:
  void * dlopen(const char *filename, int flag);
If filename begins with ``/'' (i.e., it's an absolute path), dlopen() will just try to use it (it won't search for a library). Otherwise, dlopen() will search for the library in the following order:

A colon-separated list of directories in the user's LD_LIBRARY_PATH environment variable.

The list of libraries specified in /etc/ld.so.cache (which is generated from /etc/ld.so.conf).

/lib, followed by /usr/lib. Note the order here; this is the reverse of the order used by the old a.out loader. The old a.out loader, when loading a program, first searched /usr/lib, then /lib (see the man page ld.so(8)). This shouldn't normally matter, since a library should only be in one or the other directory (never both), and different libraries with the same name are a disaster waiting to happen.

In dlopen(), the value of flag must be either RTLD_LAZY, meaning ``resolve undefined symbols as code from the dynamic library is executed'', or RTLD_NOW, meaning ``resolve all undefined symbols before dlopen() returns and fail if this cannot be done''. RTLD_GLOBAL may be optionally or'ed with either value in flag, meaning that the external symbols defined in the library will be made available to subsequently loaded libraries. While you're debugging, you'll probably want to use RTLD_NOW; using RTLD_LAZY can create inscrutable errors if there are unresolved references. Using RTLD_NOW makes opening the library take slightly longer (but it speeds up lookups later); if this causes a user interface problem you can switch to RTLD_LAZY later.
If the libraries depend on each other (e.g., X depends on Y), then you need to load the dependees first (in this example, load Y first, and then X).

The return value of dlopen() is a ``handle'' that should be considered an opaque value to be used by the other DL library routines. dlopen() will return NULL if the attempt to load does not succeed, and you need to check for this. If the same library is loaded more than once with dlopen(), the same file handle is returned.

In older systems, if the library exports a routine named _init, then that code is executed before dlopen() returns. You can use this fact in your own libraries to implement initialization routines. However, libraries should not export routines named _init or _fini. Those mechanisms are obsolete, and may result in undesired behavior. Instead, libraries should export routines using the __attribute__((constructor)) and __attribute__((destructor)) function attributes (presuming you're using gcc). See Section 5.2 for more information.
```

### 19.4.2 dlerror()

```text
Errors can be reported by calling dlerror(), which returns a string describing the error from the last call to dlopen(), dlsym(), or dlclose(). One oddity is that after calling dlerror(), future calls to dlerror() will return NULL until another error has been encountered.
```

### 19.4.3 dlsym()

```text
There's no point in loading a DL library if you can't use it. The main routine for using a DL library is dlsym(3), which looks up the value of a symbol in a given (opened) library. This function is defined as:
 void * dlsym(void *handle, char *symbol);
the handle is the value returned from dlopen, and symbol is a NIL-terminated string. If you can avoid it, don't store the result of dlsym() into a void* pointer, because then you'll have to cast it each time you use it (and you'll give less information to other people trying to maintain the program).

dlsym() will return a NULL result if the symbol wasn't found. If you know that the symbol could never have the value of NULL or zero, that may be fine, but there's a potential ambiguity otherwise: if you got a NULL, does that mean there is no such symbol, or that NULL is the value of the symbol? The standard solution is to call dlerror() first (to clear any error condition that may have existed), then call dlsym() to request a symbol, then call dlerror() again to see if an error occurred. A code snippet would look like this:
 dlerror(); /* clear error code */
 s = (actual_type) dlsym(handle, symbol_being_searched_for);
 if ((err = dlerror()) != NULL) {
  /* handle error, the symbol wasn't found */
 } else {
  /* symbol found, its value is in s */
 }
```

### 19.4.4 dlclose()

```text
The converse of dlopen() is dlclose(), which closes a DL library. The dl library maintains link counts for dynamic file handles, so a dynamic library is not actually deallocated until dlclose has been called on it as many times as dlopen has succeeded on it. Thus, it's not a problem for the same program to load the same library multiple times. If a library is deallocated, its function _fini is called (if it exists) in older libraries, but _fini is an obsolete mechanism and shouldn't be relied on. Instead, libraries should export routines using the __attribute__((constructor)) and __attribute__((destructor)) function attributes. See Section 5.2 for more information. Note: dlclose() returns 0 on success, and non-zero on error; some Linux manual pages don't mention this.
```

### 19.4.5 DL Library Example

```text
Here's an example from the man page of dlopen(3). This example loads the math library and prints the cosine of 2.0, and it checks for errors at every step (recommended):

    #include <stdlib.h>
    #include <stdio.h>
    #include <dlfcn.h>

    int main(int argc, char **argv) {
        void *handle;
        double (*cosine)(double);
        char *error;

        handle = dlopen ("/lib/libm.so.6", RTLD_LAZY);
        if (!handle) {
            fputs (dlerror(), stderr);
            exit(1);
        }

        cosine = dlsym(handle, "cos");
        if ((error = dlerror()) != NULL)  {
            fputs(error, stderr);
            exit(1);
        }

        printf ("%f\n", (*cosine)(2.0));
        dlclose(handle);
    }

If this program were in a file named "foo.c", you would build the program with the following command:
    gcc -o foo foo.c -ldl
```

## 19.5 Miscellaneous

### 19.5.1 nm command

#### 19.5.1.1 Description

```text
The nm(1) command can report the list of symbols in a given library. It works on both static and shared libraries. For a given library nm(1) can list the symbol names defined, each symbol's value, and the symbol's type. It can also identify where the symbol was defined in the source code (by filename and line number), if that information is available in the library (see the -l option).

The symbol type requires a little more explanation. The type is displayed as a letter; lowercase means that the symbol is local, while uppercase means that the symbol is global (external). Typical symbol types include T (a normal definition in the code section), D (initialized data section), B (uninitialized data section), U (undefined; the symbol is used by the library but not defined by the library), and W (weak; if another library also defines this symbol, that definition overrides this one).

If you know the name of a function, but you truly can't remember what library it was defined in, you can use nm's ``-o'' option (which prefixes the filename in each line) along with grep to find the library name. From a Bourne shell, you can search all the libraries in /lib, /usr/lib, direct subdirectories of /usr/lib, and /usr/local/lib for ``cos'' as follows:
nm -o /lib/* /usr/lib/* /usr/lib/*/* \
      /usr/local/lib/* 2> /dev/null | grep 'cos$' 

Much more information about nm can be found in the nm ``info'' documentation locally installed at info:binutils#nm.


*/
```

#### 19.5.1.2 nm(1) - Linux man page

```text
Name

nm - list symbols from object files

Synopsis


 
nm [-a|--debug-syms] [-g|--extern-only][--plugin name] [-B] [-C|--demangle[=style]] [-D|--dynamic] [-S|--print-size] [-s|--print-armap] [-A|-o|--print-file-name][--special-syms] [-n|-v|--numeric-sort] [-p|--no-sort] [-r|--reverse-sort] [--size-sort] [-u|--undefined-only] [-t radix|--radix=radix] [-P|--portability] [--target=bfdname] [-fformat|--format=format] [--defined-only] [-l|--line-numbers] [--no-demangle] [-V|--version] [-X 32_64] [--help] [objfile...]

Description

GNU nm lists the symbols from object files objfile.... If no object files are listed as arguments, nm assumes the file a.out.

For each symbol, nm shows:

• The symbol value, in the radix selected by options (see below), or hexadecimal by default.
• The symbol type. At least the following types are used; others are, as well, depending on the object file format. If lowercase, the symbol is local; if uppercase, the symbol is global (external).

"A"
The symbol's value is absolute, and will not be changed by further linking.

"B"

"b"

The symbol is in the uninitialized data section (known as BSS ).

"C"

The symbol is common. Common symbols are uninitialized data. When linking, multiple common symbols may appear with the same name. If the symbol is defined anywhere, the common symbols are treated as undefined references.

"D"

"d"

The symbol is in the initialized data section.

"G"

"g"

The symbol is in an initialized data section for small objects. Some object file formats permit more efficient access to small data objects, such as a global int variable as opposed to a large global array.

"i"

For PE format files this indicates that the symbol is in a section specific to the implementation of DLLs. For ELF format files this indicates that the symbol is an indirect function. This is a GNU extension to the standard set of ELF symbol types. It indicates a symbol which if referenced by a relocation does not evaluate to its address, but instead must be invoked at runtime. The runtime execution will then return the value to be used in the relocation.

"N"

The symbol is a debugging symbol.

"p"

The symbols is in a stack unwind section.

"R"

"r"

The symbol is in a read only data section.

"S"

"s"

The symbol is in an uninitialized data section for small objects.

"T"

"t"

The symbol is in the text (code) section.

"U"

The symbol is undefined.

"u"

The symbol is a unique global symbol. This is a GNU extension to the standard set of ELF symbol bindings. For such a symbol the dynamic linker will make sure that in the entire process there is just one symbol with this name and type in use.

"V"

"v"

The symbol is a weak object. When a weak defined symbol is linked with a normal defined symbol, the normal defined symbol is used with no error. When a weak undefined symbol is linked and the symbol is not defined, the value of the weak symbol becomes zero with no error. On some systems, uppercase indicates that a default value has been specified.

"W"

"w"

The symbol is a weak symbol that has not been specifically tagged as a weak object symbol. When a weak defined symbol is linked with a normal defined symbol, the normal defined symbol is used with no error. When a weak undefined symbol is linked and the symbol is not defined, the value of the symbol is determined in a system-specific manner without error. On some systems, uppercase indicates that a default value has been specified.

"-"

The symbol is a stabs symbol in an a.out object file. In this case, the next values printed are the stabs other field, the stabs desc field, and the stab type. Stabs symbols are used to hold debugging information.

"?"

The symbol type is unknown, or object file format specific.

• The symbol name.

Options

The long and short forms of options, shown here as alternatives, are equivalent.

-A
-o

--print-file-name
Precede each symbol by the name of the input file (or archive member) in which it was found, rather than identifying the input file once only, before all of its symbols.
-a
--debug-syms
Display all symbols, even debugger-only symbols; normally these are not listed.
-B
The same as --format=bsd (for compatibility with the MIPS nm).

-C

--demangle[=style]
Decode (demangle) low-level symbol names into user-level names. Besides removing any initial underscore prepended by the system, this makes C ++ function names readable. Different compilers have different mangling styles. The optional demangling style argument can be used to choose an appropriate demangling style for your compiler.
--no-demangle
Do not demangle low-level symbol names. This is the default.
-D
--dynamic
Display the dynamic symbols rather than the normal symbols. This is only meaningful for dynamic objects, such as certain types of shared libraries.
-f format
--format=format
Use the output format format, which can be "bsd", "sysv", or "posix". The default is "bsd". Only the first character of format is significant; it can be either upper or lower case.
-g
--extern-only
Display only external symbols.
--plugin name
Load the plugin called name to add support for extra target types. This option is only available if the toolchain has been built with plugin support enabled.
-l
--line-numbers
For each symbol, use debugging information to try to find a filename and line number. For a defined symbol, look for the line number of the address of the symbol. For an undefined symbol, look for the line number of a relocation entry which refers to the symbol. If line number information can be found, print it after the other symbol information.
-n
-v

--numeric-sort
Sort symbols numerically by their addresses, rather than alphabetically by their names.
-p
--no-sort
Do not bother to sort the symbols in any order; print them in the order encountered.
-P
--portability
Use the POSIX .2 standard output format instead of the default format. Equivalent to -f posix.
-S
--print-size
Print both value and size of defined symbols for the "bsd" output style. This option has no effect for object formats that do not record symbol sizes, unless --size-sort is also used in which case a calculated size is displayed.
-s
--print-armap
When listing symbols from archive members, include the index: a mapping (stored in the archive by ar or ranlib) of which modules contain definitions for which names.
-r
--reverse-sort
Reverse the order of the sort (whether numeric or alphabetic); let the last come first.
--size-sort
Sort symbols by size. The size is computed as the difference between the value of the symbol and the value of the symbol with the next higher value. If the "bsd" output format is used the size of the symbol is printed, rather than the value, and -S must be used in order both size and value to be printed.
--special-syms
Display symbols which have a target-specific special meaning. These symbols are usually used by the target for some special processing and are not normally helpful when included included in the normal symbol lists. For example for ARM targets this option would skip the mapping symbols used to mark transitions between ARM code, THUMB code and data.
-t radix
--radix=radix
Use radix as the radix for printing the symbol values. It must be d for decimal, o for octal, or x for hexadecimal.
--target=bfdname
Specify an object code format other than your system's default format.
-u
--undefined-only
Display only undefined symbols (those external to each object file).
--defined-only
Display only defined symbols for each object file.
-V
--version
Show the version number of nm and exit.
-X
This option is ignored for compatibility with the AIX version of nm. It takes one parameter which must be the string 32_64. The default mode of AIX nm corresponds to -X 32, which is not supported by GNU nm.

--help
Show a summary of the options to nm and exit.
@file
Read command-line options from file. The options read are inserted in place of the original @file option. If file does not exist, or cannot be read, then the option will be treated literally, and not removed.
Options in file are separated by whitespace. A whitespace character may be included in an option by surrounding the entire option in either single or double quotes. Any character (including a backslash) may be included by prefixing the character to be included with a backslash. The file may itself contain additional @file options; any such options will be processed recursively.

See Also

ar(1), objdump(1), ranlib(1), and the Info entries for binutils.

Copyright

Copyright © 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009 Free Software Foundation, Inc.

Permission is granted to copy, distribute and/or modify this document under the terms of the GNU Free Documentation License, Version 1.3 or any later version published by the Free Software Foundation; with no Invariant Sections, with no Front-Cover Texts, and with no Back-Cover Texts. A copy of the license is included in the section entitled " GNU Free Documentation License".

Referenced By

dstat(1), i686-pc-mingw32-ld(1), ld(1), llvm-nm(1), pstack(1), rpmelfsym(1), strings(1), xtensa-linux-gnu-ar(1), xtensa-linux-gnu-ld(1), xtensa-linux-gnu-objdump(1), xtensa-linux-gnu-ranlib(1), xtensa-linux-gnu-strings(1)
```

#### 19.5.1.3 Short explanation

```text
void foo();

int main(int argc, char* argv[]) {
    foo();
}

void foo() {
   printf("Foo bar baz!");
}
I ran `gcc -c foo.c` on that code. Here is what `nm foo.o` showed:
000000000000001b T foo
0000000000000000 T main
                 U printf
For this example I am running Ubuntu Linux 64-bit; that is why the 8 digit hex you see is 16 digit here. :-)

The hex digit you see is the address of the code in question within the object file relative to the beginning of the .text. section. (assuming we address sections of the object file beginning at 0x0). If you run objdump -td foo.o, you'll see the following in the output:

Disassembly of section .text:

0000000000000000 :
   0:   55                      push   %rbp
   1:   48 89 e5                mov    %rsp,%rbp
   4:   48 83 ec 10             sub    $0x10,%rsp
   8:   89 7d fc                mov    %edi,-0x4(%rbp)
   b:   48 89 75 f0             mov    %rsi,-0x10(%rbp)
   f:   b8 00 00 00 00          mov    $0x0,%eax
  14:   e8 00 00 00 00          callq  19 
  19:   c9                      leaveq
  1a:   c3                      retq

000000000000001b :
  1b:   55                      push   %rbp
  1c:   48 89 e5                mov    %rsp,%rbp
  1f:   b8 00 00 00 00          mov    $0x0,%eax
  24:   48 89 c7                mov    %rax,%rdi
  27:   b8 00 00 00 00          mov    $0x0,%eax
  2c:   e8 00 00 00 00          callq  31 
  31:   c9                      leaveq
  32:   c3                      retq
Notice that these two symbols line right up with the entries we saw in the symbol table from nm. Bare in mind, these addresses may change if you link this object file to other object files. Also, bare in mind that callq at 0x2c will change when you link this file to whatever libc your system provides, since that is currently an incomplete call to printf (it doesn't know where it is right now).

As for your mylib.a, there is more going on here. The file you have is an archive; it contains multiple object files, each one of which with it's own text segment. As an example, here is part of an nm against /usr/lib/libm.a on my box here

e_sinh.o:
0000000000000000 r .LC0
0000000000000008 r .LC1
0000000000000010 r .LC2
0000000000000018 r .LC3
0000000000000000 r .LC4
                 U __expm1
                 U __ieee754_exp
0000000000000000 T __ieee754_sinh

e_sqrt.o:
0000000000000000 T __ieee754_sqrt

e_gamma_r.o:
0000000000000000 r .LC0
                 U __ieee754_exp
0000000000000000 T __ieee754_gamma_r
                 U __ieee754_lgamma_r
                 U __rint
You'll see that multiple text segment entires -- indicated by the T in the second column rest at address 0x0, but each individual file has only one text segment symbol at 0x0.

As for individual files having multiple symbols resting at the same address, it seems like it would be possible perhaps. After all, it is just an entry in a table used to determine the location and size of a chunk of data. But I don't know for certain. I have never seen multiple symbols referencing the same part of a section before. Anyone with more knowledge on this than me can chime in. :-)

Hope this helps some.

			19.5.1.4
```

### 19.5.2 Library constructor and destructor functions

```text
Libraries should export initialization and cleanup routines using the gcc __attribute__((constructor)) and __attribute__((destructor)) function attributes. See the gcc info pages for information on these. Constructor routines are executed before dlopen returns (or before main() is started if the library is loaded at load time). Destructor routines are executed before dlclose returns (or after exit() or completion of main() if the library is loaded at load time). The C prototypes for these functions are:
  void __attribute__ ((constructor)) my_init(void);
  void __attribute__ ((destructor)) my_fini(void);

Shared libraries must not be compiled with the gcc arguments ``-nostartfiles'' or ``-nostdlib''. If those arguments are used, the constructor/destructor routines will not be executed (unless special measures are taken).
```

#### 19.5.2.1 Special functions _init and _fini (OBSOLETE/DANGEROUS)

```text
Historically there have been two special functions, _init and _fini that can be used to control constructors and destructors. However, they are obsolete, and their use can lead to unpredicatable results. Your libraries should not use these; use the function attributes constructor and destructor above instead.

If you must work with old systems or code that used _init or _fini, here's how they worked. Two special functions were defined for initializing and finalizing a module: _init and _fini. If a function ``_init'' is exported in a library, then it is called when the library is first opened (via dlopen() or simply as a shared library). In a C program, this just means that you defined some function named _init. There is a corresponding function called _fini, which is called whenever a client finishes using the library (via a call dlclose() that brings its reference count to zero, or on normal exit of the program). The C prototypes for these functions are:
  void _init(void);
  void _fini(void);

In this case, when compiling the file into a ``.o'' file in gcc, be sure to add the gcc option ``-nostartfiles''. This keeps the C compiler from linking the system startup libraries against the .so file. Otherwise, you'll get a ``multiple-definition'' error. Note that this is completely different than compiling modules using the recommended function attributes. My thanks to Jim Mischel and Tim Gentry for their suggestion to add this discussion of _init and _fini, as well as help in creating it.
```

### 19.5.3 Shared Libraries Can Be Scripts

```text
It's worth noting that the GNU loader permits shared libraries to be text files using a specialized scripting language instead of the usual library format. This is useful for indirectly combining other libraries. For example, here's the listing of /usr/lib/libc.so on one of my systems:
/* GNU ld script
   Use the shared library, but some functions are only in
   the static library, so try that secondarily.  */
GROUP ( /lib/libc.so.6 /usr/lib/libc_nonshared.a )

For more information about this, see the texinfo documentation on ld linker scripts (ld command language). General information is at info:ld#Options and info:ld#Commands, with likely commands discussed in info:ld#Option Commands.
```

### 19.5.4 Symbol Versioning and Version Scripts

```text
Typically references to external functions are bound on an as-needed basis, and are not all bound when the application starts up. If a shared library is out of date, a required interface may be missing; when the application tries to use that interface, it may suddenly and unexpectedly fail.

A solution to this problem are symbol versioning coupled with version scripts. With symbol versioning, the user can get a warning when they start their program if the libraries being used with the application are too old. You can learn more about this from ld manual's descussion of version scripts at http://www.gnu.org/manual/ld-2.9.1/html_node/ld_25.html.
```

### 19.5.5 GNU libtool

```text
If you're building an application that should port to many systems, you might consider using GNU libtool to build and install libraries. GNU libtool is a generic library support script. Libtool hides the complexity of using shared libraries behind a consistent, portable interface. Libtool provides portable interfaces to create object files, link libraries (static and shared), link executables, debug executables, install libraries, install executables. It also includes libltdl, a portability wrapper for dynamically loading programs. For more information, see its documentation at http://www.gnu.org/software/libtool/manual.html
```

### 19.5.6 Removing symbols for space

```text
All the symbols included in generated files are useful for debugging, but take up space. If you need space, you can eliminate some of it.

The best approach is to first generate the object files normally, and do all your debugging and testing first (debugging and testing is much easier with them). Afterwards, once you've tested the program thoroughly, use strip(1) to remove the symbols. The strip(1) command gives you a good deal of control over what symbols to eliminate; see its documentation for details.

Another approach is to use the GNU ld options ``-S'' and ``-s''; ``-S'' omits debugger symbol information (but not all symbols) from the output file, while ``-s'' omits all symbol information from the output file. You can invoke these options through gcc as ``-Wl,-S'' and ``-Wl,-s''. If you always strip the symbols and these options are sufficient, feel free, but this is a less flexible approach.
```

### 19.5.7 Extremely small executables

```text
You might find the paper Whirlwind Tutorial on Creating Really Teensy ELF Executables for Linux useful. It describes how to make a truly tiny program executable. Frankly, you shouldn't use most of these tricks under normal circumstances, but they're quite instructive in showing how ELF really works.
```

### 19.5.8 C++ vs. C

```text
It's worth noting that if you're writing a C++ program, and you're calling a C library function, in your C++ code you'll need to define the C function as extern "C". Otherwise, the linker won't be able to locate the C function. Internally, C++ compilers ``mangle'' the names of C++ functions (e.g., for typing purposes), and they need to be told that a given function should be called as a C function (and thus, not have its name mangled).

If you're writing a program library that could be called from C or C++, it's recommended that you include 'extern "C"' commands right in your header files so that you do this automatically for your users. When combined with the usual #ifndef at the top of a file to skip re-executing header files, this means that a typical header file usable by either C or C++ for some header file foobar.h would look like this:
/* Explain here what foobar does */

#ifndef FOOBAR_H
#define FOOBAR_H

#ifdef __cplusplus
extern "C" {
#endif

 ... header code for foobar goes here ...

#ifdef  __cplusplus
}
#endif
#endif
```

### 19.5.9 Speeding up C++ initialization

```text
The KDE developers have noticed that large GUI C++ applications can take a long time to start up, in part due to its needing to do many relocations. There are several solutions to this. See Making C++ ready for the desktop (by Waldo Bastian) for more information.
```

### 19.5.10 Linux Standard Base (LSB)

```text
The goal of the Linux Standard Base (LSB) project is to develop and promote a set of standards that will increase compatibility among Linux distributions and enable software applications to run on any compliant Linux system. The project's home page is at http://www.linuxbase.org.

A nice article that summarizes how to develop LSB-compliant applications was published in October 2002, Developing LSB-certified applications: Five steps to binary-compatible Linux applications by George Kraft IV (Senior software engineer, IBM's Linux Technology Center). Of course, you need to write code that only accesses the standardized portability layer if you want your code to be portable. In addition, the LSB provides some tools so that application writers of C/C++ programs can check for LSB compliance; these tools use some capabilities of the linker and special libraries to do these checks. Obviously, you'll need to install the tools to do these checks; you can get them from the LSB website. Then, simply use the "lsbcc" compiler as your C/C++ compiler (lsbcc internally creates a linking environment that will complain if certain LSB rules aren't followed):
 $ CC=lsbcc make myapplication
  (or)
 $ CC=lsbcc ./configure; make myapplication 
You can then use the lsbappchk program to ensure that the program only uses functions standardized by the LSB:
 $ lsbappchk myapplication
You also need to follow the LSB packaging guidelines (e.g., use RPM v3, use LSB-conforming package names, and for add-on software must install in /opt by default). See the article and LSB website for more information.
```

## 19.6 More Examples

```text
The following are more examples of all three approaches (static, shared, and dynamically loaded libraries). File libhello.c is a trivial library, with libhello.h as its header. File demo_use.c is a trivial caller of the library. This is followed by commented scripts (script_static and script_dynamic) showing how to use the library as a static and shared library. This is followed by demo_dynamic.c and script_dynamic, which show how to use the shared library as a dynamically loaded library.
```

### 19.6.1 File libhello.c

```text
/* libhello.c - demonstrate library use. */

#include <stdio.h>

void hello(void) {
  printf("Hello, library world.\n");
}
```

### 19.6.2 File libhello.h

```text
/* libhello.h - demonstrate library use. */


void hello(void);
```

### 19.6.3 File demo_use.c

```text
/* demo_use.c -- demonstrate direct use of the "hello" routine */

#include "libhello.h"

int main(void) {
 hello();
 return 0;
}
```

### 19.6.4 File script_static

```text
#!/bin/sh
# Static library demo

# Create static library's object file, libhello-static.o.
# I'm using the name libhello-static to clearly
# differentiate the static library from the
# dynamic library examples, but you don't need to use
# "-static" in the names of your
# object files or static libraries.

gcc -Wall -g -c -o libhello-static.o libhello.c

# Create static library.

ar rcs libhello-static.a libhello-static.o

# At this point we could just copy libhello-static.a
# somewhere else to use it.
# For demo purposes, we'll just keep the library
# in the current directory.

# Compile demo_use program file.

gcc -Wall -g -c demo_use.c -o demo_use.o

# Create demo_use program; -L. causes "." to be searched during
# creation of the program.  Note that this command causes
# the relevant object file in libhello-static.a to be
# incorporated into file demo_use_static.

gcc -g -o demo_use_static demo_use.o -L. -lhello-static

# Execute the program.

./demo_use_static
```

### 19.6.5 File script_shared

```text
#!/bin/sh
# Shared library demo

# Create shared library's object file, libhello.o.

gcc -fPIC -Wall -g -c libhello.c

# Create shared library.
# Use -lc to link it against C library, since libhello
# depends on the C library.

gcc -g -shared -Wl,-soname,libhello.so.0 \
    -o libhello.so.0.0 libhello.o -lc

# At this point we could just copy libhello.so.0.0 into
# some directory, say /usr/local/lib.

# Now we need to call ldconfig to fix up the symbolic links.
 
# Set up the soname.  We could just execute:
# ln -sf libhello.so.0.0 libhello.so.0
# but let's let ldconfig figure it out.

/sbin/ldconfig -n .

# Set up the linker name.
# In a more sophisticated setting, we'd need to make
# sure that if there was an existing linker name,
# and if so, check if it should stay or not.

ln -sf libhello.so.0 libhello.so

# Compile demo_use program file.

gcc -Wall -g -c demo_use.c -o demo_use.o

# Create program demo_use.
# The -L. causes "." to be searched during creation
# of the program; note that this does NOT mean that "."
# will be searched when the program is executed.

gcc -g -o demo_use demo_use.o -L. -lhello

# Execute the program.  Note that we need to tell the program
# where the shared library is, using LD_LIBRARY_PATH.

LD_LIBRARY_PATH="." ./demo_use
```

### 19.6.6 File demo_dynamic.c

```text
/* demo_dynamic.c -- demonstrate dynamic loading and
   use of the "hello" routine */


/* Need dlfcn.h for the routines to
   dynamically load libraries */
#include <dlfcn.h>

#include <stdlib.h>
#include <stdio.h>

/* Note that we don't have to include "libhello.h".
   However, we do need to specify something related;
   we need to specify a type that will hold the value
   we're going to get from dlsym(). */

/* The type "simple_demo_function" describes a function that
   takes no arguments, and returns no value: */

typedef void (*simple_demo_function)(void);


int main(void) {
 const char *error;
 void *module;
 simple_demo_function demo_function;

 /* Load dynamically loaded library */
 module = dlopen("libhello.so", RTLD_LAZY);
 if (!module) {
   fprintf(stderr, "Couldn't open libhello.so: %s\n",
           dlerror());
   exit(1);
 }

 /* Get symbol */
 dlerror();
 demo_function = dlsym(module, "hello");
 if ((error = dlerror())) {
   fprintf(stderr, "Couldn't find hello: %s\n", error);
   exit(1);
 }

 /* Now call the function in the DL library */
 (*demo_function)();

 /* All done, close things cleanly */
 dlclose(module);
 return 0;
}
```

### 19.6.7 File script_dynamic

```text
#!/bin/sh
# Dynamically loaded library demo

# Presume that libhello.so and friends have
# been created (see dynamic example).

# Compile demo_dynamic program file into an object file.

gcc -Wall -g -c demo_dynamic.c

# Create program demo_use.
# Note that we don't have to tell it where to search for DL libraries,
# since the only special library this program uses won't be
# loaded until after the program starts up.
# However, we DO need the option -ldl to include the library
# that loads the DL libraries.

gcc -g -o demo_dynamic demo_dynamic.o -ldl

# Execute the program.  Note that we need to tell the
# program where get the dynamically loaded library,
# using LD_LIBRARY_PATH.

LD_LIBRARY_PATH="." ./demo_dynamic
```

## 19.7 Other Information Sources

```text
Particularly useful sources of information about libraries include the following:

``The GCC HOWTO'' by Daniel Barlow. In particular, this HOWTO discusses compiler options for creating libraries and how to query libraries. It covers information not covered here, and vice versa. This HOWTO is available through the Linux Documentation Project at http://www.linuxdoc.org.

``Executable and Linkable Format (ELF)'' by the Tool Interface Standards (TIS) committee (this is actually one chapter of the Portable Formats Specification Version 1.1 by the same committee). This provides information about the ELF format (it isn't specific to Linux or GNU gcc), and provides a great deal of detail on the ELF format. See ftp://tsx-11.mit.edu/pub/linux/packages/GCC/ELF.doc.tar.gz If you get the file from MIT, note that the format is unusual; after gunzipping and untarring, you'll get an ``hps'' file; just strip off the top and bottom lines, rename it to a ``ps'' file, and you'll get a printable Postscript file with the usual filename.

``ELF: From the Programmer's Perspective'' by Hongjui Lu. This gives Linux and GNU gcc-specific information on ELF, and is available at ftp://tsx-11.mit.edu/pub/linux/packages/GCC/elf.ps.gz.

The ld documentation ``Using LD, the GNU Linker'' describes ld in far more detail. It is available at http://www.gnu.org/manual/ld-2.9.1.
```

### 19.7.1 Linux Commands For Shared Library Management & Debugging Problem

```text
		http://www.cyberciti.biz/tips/linux-shared-library-management.html



by nixCraft on January 6, 2011 · 12 comments· Last updated March 21, 2012

If you are a developer, you will re-use code provided by others. Usually /lib, /lib64, /usr/local/lib, and other directories stores various shared libraries. You can write your own program using these shared libraries. As a sys admin you need to manage and install these shared libraries. Use the following commands for shared libraries management, security, and debugging problems.
What is a Library In Linux or UNIX?

In Linux or UNIX like operating system, a library is noting but a collection of resources such as subroutines / functions, classes, values or type specifications. There are two types of libraries:

    Static libraries - All lib*.a fills are included into executables that use their functions. For example you can run a sendmail binary in chrooted jail using statically liked libs.
    Dynamic libraries or linking [ also known as DSO (dynamic shared object)] - All lib*.so* files are not copied into executables. The executable will automatically load the libraries using ld.so or ld-linux.so.

Linux Library Management Commands

    ldconfig : Updates the necessary links for the run time link bindings.
    ldd : Tells what libraries a given program needs to run.
    ltrace : A library call tracer.
    ld.so/ld-linux.so: Dynamic linker/loader.

Important Files

As a sys admin you should be aware of important files related to shared libraries:

    /lib/ld-linux.so.* : Execution time linker/loader.
    /etc/ld.so.conf : File containing a list of colon, space, tab, newline, or comma separated directories in which to search for libraries.
    /etc/ld.so.cache : File containing an ordered list of libraries found in the directories specified in /etc/ld.so.conf. This file is not in human readable format, and is not intended to be edited. This file is created by ldconfig command.
    lib*.so.version : Shared libraries stores in /lib, /usr/lib, /usr/lib64, /lib64, /usr/local/lib directories.

#1: ldconfig command

You need to use the ldconfig command to create, update, and remove the necessary links and cache (for use by the run-time linker, ld.so) to the most recent shared libraries found in the directories specified on the command line, in the file /etc/ld.so.conf, and in the trusted directories (/usr/lib, /lib64 and /lib). The ldconfig command checks the header and file names of the libraries it encounters when determining which versions should have their links updated. This command also creates a file called /etc/ld.so.cache which is used to speed up linking.
Examples

In this example, you've installed a new set of shared libraries at /usr/local/lib/:
$ ls -l /usr/local/lib/
Sample outputs:

-rw-r--r-- 1 root root 878738 Jun 16  2010 libGeoIP.a
-rwxr-xr-x 1 root root    799 Jun 16  2010 libGeoIP.la
lrwxrwxrwx 1 root root     17 Jun 16  2010 libGeoIP.so -> libGeoIP.so.1.4.6
lrwxrwxrwx 1 root root     17 Jun 16  2010 libGeoIP.so.1 -> libGeoIP.so.1.4.6
-rwxr-xr-x 1 root root 322776 Jun 16  2010 libGeoIP.so.1.4.6
-rw-r--r-- 1 root root  72172 Jun 16  2010 libGeoIPUpdate.a
-rwxr-xr-x 1 root root    872 Jun 16  2010 libGeoIPUpdate.la
lrwxrwxrwx 1 root root     23 Jun 16  2010 libGeoIPUpdate.so -> libGeoIPUpdate.so.0.0.0
lrwxrwxrwx 1 root root     23 Jun 16  2010 libGeoIPUpdate.so.0 -> libGeoIPUpdate.so.0.0.0
-rwxr-xr-x 1 root root  55003 Jun 16  2010 libGeoIPUpdate.so.0.0.0

Now when you run an app related to libGeoIP.so, you will get an error about missing library. You need to run ldconfig command manually to link libraries by passing them as command line arguments with the -l switch:
# ldconfig -l /path/to/lib/our.new.lib.so
Another recommended options for sys admin is to create a file called /etc/ld.so.conf.d/geoip.conf as follows:

/usr/local/lib

Now just run ldconfig to update the cache:
# ldconfig
To verify new libs or to look for a linked library, enter:
# ldconfig -v
# ldconfig -v | grep -i geoip
Sample outputs:

	libGeoIP.so.1 -> libGeoIP.so.1.4.6
	libGeoIPUpdate.so.0 -> libGeoIPUpdate.so.0.0.0

Troubleshooting Chrooted Jails

You can print the current cache with the -p option:
# ldconfig -p
Putting web server such as Apache / Nginx / Lighttpd in a chroot jail minimizes the damage done by a potential break-in by isolating the web server to a small section of the filesystem. It is also necessary to copy all files required by Apache inside the filesystem rooted at /jail/ directory , including web server binaries, shared Libraries, modules, configuration files, and php/perl/html web pages. You need to also copy /etc/{ld.so.cache,ld.so.conf} files and /etc/ld.so.conf.d/ directory to /jail/etc/ directory. Use the ldconfig command to update, print and troubleshoot chrooted jail problems:

### chroot to jail bash
chroot /jail /bin/bash
###  now update the cache in /jail ###
ldconfig
###  print the cache in /jail ###
ldconfig -p
### copy missing libs ###
cp /path/to/some.lib /jail/path/to/some.lib
ldconfig
ldconfig -v | grep some.lib
### get out of jail ###
exit
### may be delete bash and ldconfig to increase security (NOTE path carefully) ###
cd /jail
rm sbin/ldconfig bin/bash
### now start nginx jail ###
chroot /jail /usr/local/nginx/sbin/nginx
 

Rootkits

A rootkit is a program (or combination of several programs) designed to take fundamental control of a computer system, without authorization by the system's owners and legitimate managers. Usually, rootkit use /lib, /lib64, /usr/local/lib directories to hide itself from real root users. You can use ldconfig command to view all the cache of all shared libraries and unwanted programs:
# /sbin/ldconfig -p | less
You can also use various tools to detect rootkits under Linux.
Common errors

You may see the errors as follows:

    Dynamic linker error in foo
    Can't map cache file cache-file
    Cache file cache-file foo

All of the above errors means the linker cache file /etc/ld.so.cache is corrupt or does not exists. To fix these errors simply run the ldconfig command as follows:
# ldconfig
Can't find library xyz Error

The executable required a dynamically linked library that ld.so or ld-linux.so cannot find. It means a library called xyz needed by the program called foo not installed or path is not set. To fix this problem install xyz library and set path in /etc/ld.so.conf file or create a file in /etc/ld.so.conf.d/ directory.
#2: ldd command

ldd (List Dynamic Dependencies) is a Unix and Linux program to display the shared libraries required by each program. This tools is required to build and run various server programs in a chroot jail. A typical example is as follows to list the Apache server shared libraries, enter:
# ldd /usr/sbin/httpd
Sample outputs:

	libm.so.6 => /lib64/libm.so.6 (0x00002aff52a0c000)
	libpcre.so.0 => /lib64/libpcre.so.0 (0x00002aff52c8f000)
	libselinux.so.1 => /lib64/libselinux.so.1 (0x00002aff52eab000)
	libaprutil-1.so.0 => /usr/lib64/libaprutil-1.so.0 (0x00002aff530c4000)
	libcrypt.so.1 => /lib64/libcrypt.so.1 (0x00002aff532de000)
	libldap-2.3.so.0 => /usr/lib64/libldap-2.3.so.0 (0x00002aff53516000)
	liblber-2.3.so.0 => /usr/lib64/liblber-2.3.so.0 (0x00002aff53751000)
	libdb-4.3.so => /lib64/libdb-4.3.so (0x00002aff5395f000)
	libexpat.so.0 => /lib64/libexpat.so.0 (0x00002aff53c55000)
	libapr-1.so.0 => /usr/lib64/libapr-1.so.0 (0x00002aff53e78000)
	libpthread.so.0 => /lib64/libpthread.so.0 (0x00002aff5409f000)
	libdl.so.2 => /lib64/libdl.so.2 (0x00002aff542ba000)
	libc.so.6 => /lib64/libc.so.6 (0x00002aff544bf000)
	libsepol.so.1 => /lib64/libsepol.so.1 (0x00002aff54816000)
	/lib64/ld-linux-x86-64.so.2 (0x00002aff527ef000)
	libuuid.so.1 => /lib64/libuuid.so.1 (0x00002aff54a5c000)
	libresolv.so.2 => /lib64/libresolv.so.2 (0x00002aff54c61000)
	libsasl2.so.2 => /usr/lib64/libsasl2.so.2 (0x00002aff54e76000)
	libssl.so.6 => /lib64/libssl.so.6 (0x00002aff5508f000)
	libcrypto.so.6 => /lib64/libcrypto.so.6 (0x00002aff552dc000)
	libgssapi_krb5.so.2 => /usr/lib64/libgssapi_krb5.so.2 (0x00002aff5562d000)
	libkrb5.so.3 => /usr/lib64/libkrb5.so.3 (0x00002aff5585c000)
	libcom_err.so.2 => /lib64/libcom_err.so.2 (0x00002aff55af1000)
	libk5crypto.so.3 => /usr/lib64/libk5crypto.so.3 (0x00002aff55cf3000)
	libz.so.1 => /usr/lib64/libz.so.1 (0x00002aff55f19000)
	libkrb5support.so.0 => /usr/lib64/libkrb5support.so.0 (0x00002aff5612d000)
	libkeyutils.so.1 => /lib64/libkeyutils.so.1 (0x00002aff56335000)

Now, you can copy all those libs one by one to /jail directory

# mkdir /jail/lib
# cp  /lib64/libm.so.6 /jail/lib
# cp /lib64/libkeyutils.so.1 /jail/lib

You can write a bash script to automate the entire procedure:

cp_support_shared_libs(){
        local d="$1"            # JAIL ROOT
        local pFILE="$2"        # copy bin file libs
        local files=""
	## use ldd to get shared libs list ###
        files="$(ldd $pFILE |  awk '{ print $3 }' | sed  '/^$/d')"
 
        for i in $files
        do
          dcc="${i%/*}" # get dirname only
          [ ! -d ${d}${dcc} ] && mkdir -p ${d}${dcc}
          ${_cp} -f $i ${d}${dcc}
        done
 
        # Works with 32 and 64 bit ld-linux
        sldl="$(ldd $pFILE | grep 'ld-linux' | awk '{ print $1}')"
        sldlsubdir="${sldl%/*}"
        [ ! -f ${d}${sldl} ] && ${_cp} -f ${sldl} ${d}${sldlsubdir}
}

Call cp_support_shared_libs() it as follows:

cp_support_shared_libs "/jail" "/usr/local/nginx/sbin/nginx"

Report Missing Functions

Type the following command:
$ ldd -d /path/to/executable
Report Missing Objects

Type the following command:
$ ldd -r /path/to/executable
Determine If Particular Feature Supported Or Not

TCP Wrapper is a host-based Networking ACL system, used to filter network access to Internet. TCP wrappers was original written to monitor and stop cracking activities on the UNIX / Linux systems. To determine whether a given executable daemon supports TCP Wrapper or not, run the following command:
$ ldd /usr/sbin/sshd | grep libwrap
Sample outputs:

	libwrap.so.0 => /lib64/libwrap.so.0 (0x00002abd70cbc000)

The output indicates that the OpenSSH (sshd) daemon supports TCP Wrapper.
Other usage of ldd command

You can use the ldd command when an executable is failing because of a missing dependency. Once you found a missing dependency, you can install it or update the cache with the ldconfig command as mentioned above.
#3: ltrace command

The ltrace command simply runs the specified command until it exits. It intercepts and records the dynamic library calls which are called by the executed process and the signals which are received by that process. It can also intercept and print the system calls executed by the program. Its use is very similar to strace command.
# ltrace /usr/sbin/httpd
# ltrace /sbin/chroot /usr/sbin/httpd
# ltrace /bin/ls
Sample outputs:

__libc_start_main(0x804fae0, 1, 0xbfbd6544, 0x805bce0, 0x805bcd0 
strrchr("/bin/ls", '/')                                                                                                                            = "/ls"
setlocale(6, "")                                                                                                                                   = "en_IN.utf8"
bindtextdomain("coreutils", "/usr/share/locale")                                                                                                   = "/usr/share/locale"
textdomain("coreutils")                                                                                                                            = "coreutils"
__cxa_atexit(0x8052d10, 0, 0, 0xbfbd6544, 0xbfbd6498)                                                                                              = 0
isatty(1)                                                                                                                                          = 1
getenv("QUOTING_STYLE")                                                                                                                            = NULL
getenv("LS_BLOCK_SIZE")                                                                                                                            = NULL
getenv("BLOCK_SIZE")                                                                                                                               = NULL
getenv("BLOCKSIZE")                                                                                                                                = NULL
getenv("POSIXLY_CORRECT")                                                                                                                          = NULL
getenv("BLOCK_SIZE")                                                                                                                               = NULL
getenv("COLUMNS")                                                                                                                                  = NULL
ioctl(1, 21523, 0xbfbd6470)                                                                                                                        = 0
getenv("TABSIZE")                                                                                                                                  = NULL
getopt_long(1, 0xbfbd6544, "abcdfghiklmnopqrstuvw:xABCDFGHI:"..., 0x0805ea40, -1)                                                                  = -1
__errno_location()                                                                                                                                 = 0xb76b8694
malloc(40)                                                                                                                                         = 0x08c8e3e0
memcpy(0x08c8e3e0, "", 40)                                                                                                                         = 0x08c8e3e0
....
....
.....
..
output truncated
free(0x08c8e498)                                                                                                                                   = 
free(NULL)                                                                                                                                         = 
free(0x08c8e480)                                                                                                                                   = 
exit(0 
__fpending(0xb78334e0, 0xbfbd6334, 0xb78876a3, 0xb78968f8, 0)                                                                                      = 0
fclose(0xb78334e0)                                                                                                                                 = 0
__fpending(0xb7833580, 0xbfbd6334, 0xb78876a3, 0xb78968f8, 0)                                                                                      = 0
fclose(0xb7833580)                                                                                                                                 = 0
+++ exited (status 0) +++

The ltrace command is a perfect debugging utility in Linux:

    To monitor the library calls used by a program and all the signals it receives.
    For tracking the execution of processes.
    It can also show system calls, used by a program.

ltrace Command Examples

Consider the following c program:

 
#include <stdio.h>
int main(){
	printf("Hello world\n");
	return 0;
}
 

Compile and run it as follows:
$ cc hello.c -o hello
$ ./hello
Now use the ltrace command to tracking the execution of processes:
$ ltrace -S -tt ./hello
Sample outputs:

15:20:38.561616 SYS_brk(NULL)                                                                                                                      = 0x08f42000
15:20:38.561845 SYS_access("/etc/ld.so.nohwcap", 00)                                                                                               = -2
15:20:38.562009 SYS_mmap2(0, 8192, 3, 34, -1)                                                                                                      = 0xb7708000
15:20:38.562155 SYS_access("/etc/ld.so.preload", 04)                                                                                               = -2
15:20:38.562336 SYS_open("/etc/ld.so.cache", 0, 00)                                                                                                = 3
15:20:38.562502 SYS_fstat64(3, 0xbfaafe20, 0xb7726ff4, 0xb772787c, 3)                                                                              = 0
15:20:38.562629 SYS_mmap2(0, 76469, 1, 2, 3)                                                                                                       = 0xb76f5000
15:20:38.562755 SYS_close(3)                                                                                                                       = 0
15:20:38.564204 SYS_access("/etc/ld.so.nohwcap", 00)                                                                                               = -2
15:20:38.564372 SYS_open("/lib/tls/i686/cmov/libc.so.6", 0, 00)                                                                                    = 3
15:20:38.564561 SYS_read(3, "\177ELF\001\001\001", 512)                                                                                            = 512
15:20:38.564694 SYS_fstat64(3, 0xbfaafe6c, 0xb7726ff4, 0xb7705796, 0x8048234)                                                                      = 0
15:20:38.564822 SYS_mmap2(0, 0x1599a8, 5, 2050, 3)                                                                                                 = 0xb759b000
15:20:38.565076 SYS_mprotect(0xb76ee000, 4096, 0)                                                                                                  = 0
15:20:38.565209 SYS_mmap2(0xb76ef000, 12288, 3, 2066, 3)                                                                                           = 0xb76ef000
15:20:38.565454 SYS_mmap2(0xb76f2000, 10664, 3, 50, -1)                                                                                            = 0xb76f2000
15:20:38.565604 SYS_close(3)                                                                                                                       = 0
15:20:38.565709 SYS_mmap2(0, 4096, 3, 34, -1)                                                                                                      = 0xb759a000
15:20:38.565842 SYS_set_thread_area(0xbfab030c, 0xb7726ff4, 0xb759a6c0, 1, 0)                                                                      = 0
15:20:38.566070 SYS_mprotect(0xb76ef000, 8192, 1)                                                                                                  = 0
15:20:38.566185 SYS_mprotect(0x08049000, 4096, 1)                                                                                                  = 0
15:20:38.566288 SYS_mprotect(0xb7726000, 4096, 1)                                                                                                  = 0
15:20:38.566381 SYS_munmap(0xb76f5000, 76469)                                                                                                      = 0
15:20:38.566522 __libc_start_main(0x80483e4, 1, 0xbfab04e4, 0x8048410, 0x8048400 
15:20:38.566667 puts("Hello world" 
15:20:38.566811 SYS_fstat64(1, 0xbfab0310, 0xb76f0ff4, 0xb76f14e0, 0x80484c0)                                                                      = 0
15:20:38.566936 SYS_mmap2(0, 4096, 3, 34, -1)                                                                                                      = 0xb7707000
15:20:38.567126 SYS_write(1, "Hello world\n", 12Hello world
)                                                                                                  = 12
15:20:38.567282 <... puts resumed> )                                                                                                               = 12
15:20:38.567348 SYS_exit_group(0 
15:20:38.567454 +++ exited (status 0) +++

You need to carefully monitor the order and arguments of selected functions such as open() [used to open and possibly create a file or device] or chown() [used to change ownership of a file] so that you can spot simple kinds of race conditions or security related problems. This is quite useful for evaluating the security of binary programs to find out what kind of changes made to the system.
ltrace: Debugging Memory & I/O Usage For HA Based Cluster Computers

The ltrace command can be used to trace memory usage of the malloc() and free() functions in C program. You can calculate the amount of memory allocated as follows:
[node303 ~]$ ltrace -e malloc,free ./simulator arg1 agr2 arg3
The ltrace will start ./simulator program and it will trace the malloc() and free() functions. You can find out I/O problems as follows:
[node303 ~]$ ltrace -e fopen,fread,fwrite,fclose ./simulator arg1 agr2 arg3
You may need to change function names as your programming languages or UNIX platform may use different memory allocation functions.
#4: ld.so/ld-linux.so Command

The ld.so or / ld-linux.so used as follows by Linux:

    To load the shared libraries needed by a program.
    To prepare the program to run, and then runs it.

List All Dependencies and How They Are Resolved

Type the following command:
# cd /lib
For 64 bit systems:
# cd /lib64
Pass the --list option, enter:
# ./ld-2.5.so --list /path/to/executable
Other options

From the man page:

  --verify                   verify that given object really is a dynamically linked object we can handle
  --library-path PATH   use given PATH instead of content of the environment variable LD_LIBRARY_PATH
  --inhibit-rpath LIST    ignore RUNPATH and RPATH information in object names in LIST

Environment Variables

The LD_LIBRARY_PATH can be used to set a library path for finding dynamic libraries using LD_LIBRARY_PATH, in the standard colon seperated format:
$ export LD_LIBRARY_PATH=/opt/simulator/lib:/usr/local/lib
The LD_PRELOAD allow an extra library not specified in the executable to be loaded:
$ export LD_PRELOAD=/home/vivek/dirhard/libdiehard.so
```

### 19.7.2 Anatomy of Linux dynamic libraries

```text
Libraries were designed to package similar functionality in a single unit. These units could then be shared with other developers and permitted what came to be called modular programming—that is, building programs from modules. Linux supports two types of libraries, each with its own advantages and disadvantages. The static library contains functionality that is bound to a program statically at compile time. This differs from dynamic libraries, which are loaded when an application is loaded and binding occurs at run time. Figure 1 shows the library hierarchy in Linux.

Figure 1. Library hierarchy in Linux
Library hierarchy in Linux.

You can use shared libraries in a couple of ways: either linked dynamically at run time or dynamically loaded and used under program control. This article explores both of these methods.

Static libraries can be beneficial in small programs where minimal functionality is needed. For programs that require multiple libraries, shared libraries can reduce the memory footprint of the program (both on disk and in memory at run time). This is because multiple programs can use a shared library simultaneously; therefore, only one copy of the library is needed in memory at a time. With a static library, every running program has its own copy of the library.

GNU/Linux provides two ways to deal with shared libraries (each method originating from Sun Solaris). You can dynamically link your program with the shared library and have Linux load the library upon execution (unless it's already in memory). An alternative is for the program to selectively call functions with the library in a process called dynamic loading. With dynamic loading, a program can load a specific library (unless already loaded), and then call a particular function within that library. (Figure 2 shows these two methods.) This is a common usage pattern in building applications that support plugins. I explore this application program interface (API) and demonstrate it later in the article.

Figure 2. Static vs. dynamic linking
Static vs. dynamic linking

Dynamic linking with Linux

Now, let's dig into the process of using dynamically linked shared libraries in Linux. When users start an application, they're invoking an Executable and Linking Format (ELF) image. The kernel begins with the process of loading the ELF image into user space virtual memory. The kernel notices an ELF section called .interp, which indicates the dynamic linker to be used (/lib/ld-linux.so), shown in Listing 1. This is similar to the interpreter definition for script files in UNIX® (#!/bin/sh): It's just used in a different context.

Listing 1. Using readelf to show program headers


mtj@camus:~/dl$ readelf -l dl

Elf file type is EXEC (Executable file)
Entry point 0x8048618
There are 7 program headers, starting at offset 52

Program Headers:
  Type           Offset   VirtAddr   PhysAddr   FileSiz MemSiz  Flg Align
  PHDR           0x000034 0x08048034 0x08048034 0x000e0 0x000e0 R E 0x4
  INTERP         0x000114 0x08048114 0x08048114 0x00013 0x00013 R   0x1
      [Requesting program interpreter: /lib/ld-linux.so.2]
  LOAD           0x000000 0x08048000 0x08048000 0x00958 0x00958 R E 0x1000
  LOAD           0x000958 0x08049958 0x08049958 0x00120 0x00128 RW  0x1000
  DYNAMIC        0x00096c 0x0804996c 0x0804996c 0x000d0 0x000d0 RW  0x4
  NOTE           0x000128 0x08048128 0x08048128 0x00020 0x00020 R   0x4
  GNU_STACK      0x000000 0x00000000 0x00000000 0x00000 0x00000 RW  0x4

  ...

mtj@camus:~dl$


Note that ld-linux.so is itself an ELF shared library, but it is statically compiled and has no shared library dependencies. When dynamic linking is needed, the kernel bootstraps the dynamic linker (ELF interpreter), which initializes itself, and then loads the specified shared objects (unless already loaded). It then performs the necessary relocations, including the shared objects that the target shared object uses. The LD_LIBRARY_PATH environment variable defines where to look for the available shared objects. When done, control is transferred back to the original program to begin its execution.

Relocation is handled through an indirection mechanism called the Global Offset Table (GOT) and the Procedure Linkage Table (PLT). These tables provide the addresses of external functions and data, which ld-linux.so loads during the relocation process. This means that the code that requires the indirection (that is, uses the tables) needs no changes: only the tables require adjustment. Relocation can occur immediately upon load or whenever a given function is needed. (See more on this difference later in Dynamic loading with Linux.)

When the relocations are complete, the dynamic linker allows any loaded shared object to execute optional initialization code. This functionality allows the library to initialize internal data and prepare for use. This code is defined in the .init section of the ELF image. When the library is unloaded, it may also call a termination function (defined as the .fini section in the image). When the initialization functions have been called, the dynamic linker relinquishes control to the original image being loaded.

Back to top

Dynamic loading with Linux

Instead of Linux automatically loading and linking libraries for a given program, it's possible to share this control with the application itself. In this case, the process is called dynamic loading. With dynamic loading, the application can specify a particular library to load, and then use this library as an executable (that is, call the functions within it). But as you learned earlier, the shared library used for dynamic loading is no different than that of a standard shared library (an ELF shared object). In fact, the ld-linux dynamic linker remains involved in this process as the ELF loader and interpreter.

The Dynamic Loading (DL) API exists for dynamic loading and allows a shared library to be available to a user-space program. Although small, the API provides everything needed, with much of the hard work done behind the scenes. The full API is shown in Table 1.

Table 1. The Dl API
Function	Description
dlopen	Makes an object file accessible to a program
dlsym	Obtains the address of a symbol within a dlopened object file
dlerror	Returns a string error of the last error that occurred
dlclose	Closes an object file

The process begins with a call to dlopen, providing the file object to access and a mode. The result of the dlopen call is a handle to the object that will be used later. The mode argument tells the dynamic linker when to perform relocations. There are two possible values. The first, RTLD_NOW, indicates that the dynamic linker will complete all necessary relocations at the dlopen call time. The second and alternative mode, RTLD_LAZY, says to perform relocations only when they're needed. This is done internally by redirecting all requests that are yet to be relocated through the dynamic linker. In this way, the dynamic linker knows at request time when a new reference is occurring, and relocation occurs normally. Subsequent calls do not require a repeat of the relocation.

Two other mode options are available that may be bitwise ORed into the mode argument. RTLD_LOCAL indicates that the symbols of the shared object being loaded won't be made available for relocation processing by any other object. If this is what you want (for example, so that the shared object can invoke symbols in the original process image), use RTLD_GLOBAL.

The dlopen function also automatically resolves dependencies in shared libraries. In this way, if you open an object that is dependent upon other shared libraries, it automatically loads them. The function returns a handle that is used in subsequent calls to the API. The prototype for dlopen is:

#include <dlfcn.h>

void *dlopen( const char *file, int mode );


With a handle to the ELF object, you can identify addresses to symbols within this object using the dlsym call. This function takes a symbol name, such as the name of a function contained within the object. The return value is a resolved address to the symbol within the object:

void *dlsym( void *restrict handle, const char *restrict name );


If an error occurs during a call with this API, you can use the dlerror function to return a human-readable string representing the error. This function has no arguments and returns a string if a prior error occurred or returns NULL if no error occurred:

char *dlerror();


Finally, when no additional calls to the shared object are necessary, the application can call dlclose to inform the operating system that the handle and object references are no longer necessary. This is properly reference-counted, so that multiple users of a shared object do not conflict with one another (it remains in memory as long as there is a user for it). Any symbols resolved through dlsym for the closed object will no longer be available.

char *dlclose( void *handle );


Back to top

Dynamic loading example

Now that you've seen the API, let's look at an example of the DL API. In this application, you basically implement a shell that allows the operator to specify a library, a function, and an argument. In other words, the user can specify a library and call an arbitrary function within that library (that wasn't previously linked to this application). You resolve the function within the library using the DL API, and then call it with the user-defined argument (emitting the result). The complete application is shown in Listing 2.

Listing 2. Shell for using the DL API

#include <stdio.h>
#include <dlfcn.h>
#include <string.h>

#define MAX_STRING      80


void invoke_method( char *lib, char *method, float argument )
{
  void *dl_handle;
  float (*func)(float);
  char *error;

  /* Open the shared object */
  dl_handle = dlopen( lib, RTLD_LAZY );
  if (!dl_handle) {
    printf( "!!! %s\n", dlerror() );
    return;
  }

  /* Resolve the symbol (method) from the object */
  func = dlsym( dl_handle, method );
    error = dlerror();
  if (error != NULL) {
    printf( "!!! %s\n", error );
    return;
  }

  /* Call the resolved method and print the result */
  printf("  %f\n", (*func)(argument) );

  /* Close the object */
  dlclose( dl_handle );

  return;
}


int main( int argc, char *argv[] )
{
  char line[MAX_STRING+1];
  char lib[MAX_STRING+1];
  char method[MAX_STRING+1];
  float argument;

  while (1) {

    printf("> ");

    line[0]=0;
    fgets( line, MAX_STRING, stdin);

    if (!strncmp(line, "bye", 3)) break;

    sscanf( line, "%s %s %f", lib, method, &argument);

    invoke_method( lib, method, argument );

  }

}


To build this application, use the following compile line with the GNU Compiler Collection (GCC). The option -rdynamic is used to tell the linker to add all symbols to the dynamic symbol table (to permit backtraces with the use of dlopen). The -ldl indicates that the dllib should be linked to this program.

gcc -rdynamic -o dl dl.c -ldl


Back to Listing 2, the main function simply acts as the interpreter, parsing three arguments from the input line (library name, function name, floating-point argument). If bye is present, the application exits. Otherwise, the three arguments are passed to the invoke_method function, which uses the DL API.

You start with a call to dlopen to gain access to the object file. If a NULL handle is returned, the object could not be found and the process ends. Otherwise, you have a handle to the object that can be further interrogated. Using the dlsym API function, attempt to resolve the symbol within the newly opened object file. You'll get either a valid pointer to the symbol or a NULL and return an error.

With the symbol resolved in the ELF object, the next step is simply to call the function. Note the difference between this code and the previous discussion of dynamic linking. In this example, you coerce the address of the symbol in the object file to a function pointer, and then call it. The previous example used the object's name as a function, and the dynamic linker ensures that the symbol points to the proper location. Although the dynamic linker can do all the dirty work for you, this approach allows you to build very dynamic applications that can be extended at run time.

After you've called your target function in the ELF object, close access to it through a call to dlclose.

An example of how to use this test program is shown in Listing 3. In this example, you compile and then execute the program. Then, you invoke a few functions within the math library (libm.so). From this demonstration, the program is able to call arbitrary functions within a shared object (library) using dynamic loading. This is a powerful capability and permits the extension of programs with new functionality.

Listing 3. Using the simple program to invoke library functions


mtj@camus:~/dl$ gcc -rdynamic -o dl dl.c -ldl
mtj@camus:~/dl$ ./dl
> libm.so cosf 0.0
  1.000000
> libm.so sinf 0.0
  0.000000
> libm.so tanf 1.0
  1.557408
> bye
mtj@camus:~/dl$


Back to top

Tools

Linux provides a variety of tools for viewing and parsing ELF objects (including shared libraries). One of the most useful is the ldd command, which you use to emit shared library dependencies. For example, using the ldd command on your dl application shows the following:

mtj@camus:~/dl$ ldd dl
        linux-gate.so.1 =>  (0xffffe000)
        libdl.so.2 => /lib/tls/i686/cmov/libdl.so.2 (0xb7fdb000)
        libc.so.6 => /lib/tls/i686/cmov/libc.so.6 (0xb7eac000)
        /lib/ld-linux.so.2 (0xb7fe7000)
mtj@camus:~/dl$


What ldd is telling you is that this ELF image is dependent upon linux-gate.so (a special shared object that handles system calls and has no associated file in the file system), libdl.so (the DL API), the GNU C library (libc.so), and finally the Linux dynamic loader (as there are shared library dependencies).

The readelf command is a feature-rich utility that allows you to parse and read ELF objects. One interesting use of readelf is to identify the relocatable items within an object. For our simple program (shown in Listing 2), you can see the symbols that require relocation as:

mtj@camus:~/dl$ readelf -r dl

Relocation section '.rel.dyn' at offset 0x520 contains 2 entries:
 Offset     Info    Type            Sym.Value  Sym. Name
08049a3c  00001806 R_386_GLOB_DAT    00000000   __gmon_start__
08049a78  00001405 R_386_COPY        08049a78   stdin

Relocation section '.rel.plt' at offset 0x530 contains 8 entries:
 Offset     Info    Type            Sym.Value  Sym. Name
08049a4c  00000207 R_386_JUMP_SLOT   00000000   dlsym
08049a50  00000607 R_386_JUMP_SLOT   00000000   fgets
08049a54  00000b07 R_386_JUMP_SLOT   00000000   dlerror
08049a58  00000c07 R_386_JUMP_SLOT   00000000   __libc_start_main
08049a5c  00000e07 R_386_JUMP_SLOT   00000000   printf
08049a60  00001007 R_386_JUMP_SLOT   00000000   dlclose
08049a64  00001107 R_386_JUMP_SLOT   00000000   sscanf
08049a68  00001907 R_386_JUMP_SLOT   00000000   dlopen
mtj@camus:~/dl$


From this list, you can see the various C library calls that require relocation (to libc.so), including calls to the DL API (libdl.so). The function __libc_start_main is a C library function that is called prior to the main function of your program (a shell that provides necessary initialization).

Other utilities that operate on object files include objdump, which displays information about object files, and nm, which lists the symbols from object files (including debug information). It's also possible to invoke the Linux dynamic linker directly with the ELF program as its argument to manually start the image:

mtj@camus:~/dl$ /lib/ld-linux.so.2 ./dl
> libm.so expf 0.0
  1.000000
>


Additionally, you can use ld-linux.so to list the dependencies of an ELF image (identically to the ldd command) by using the --list option. Remember, it's just a user-space program that's bootstrapped by the kernel when needed.

Back to top

Going further

This article scratched the surface of some of the capabilities of the dynamic linker. In the Resources below, you'll find more detailed introductions to the ELF image format and the process or symbol relocation. And, as is always the case with Linux, you can download the source to the dynamic linker (see Resources) to dig into its internals.
		19.7.3
```

## 19.8 Visiblity

### 19.8.1 gcc

```text
http://gcc.gnu.org/wiki/Visibility
Why is the new C++ visibility support so useful?

Put simply, it hides most of the ELF symbols which would have previously (and unnecessarily) been public. This means:

It very substantially improves load times of your DSO (Dynamic Shared Object). For example, a huge C++ template-based library which was tested (the TnFOX Boost.Python bindings library) now loads in eight seconds rather than over six minutes!
It lets the optimiser produce better code. PLT indirections (when a function call or variable access must be looked up via the Global Offset Table such as in PIC code) can be completely avoided, thus substantially avoiding pipeline stalls on modern processors and thus much faster code. Furthermore when most of the symbols are bound locally, they can be safely elided (removed) completely through the entire DSO. This gives greater latitude especially to the inliner which no longer needs to keep an entry point around "just in case".
It reduces the size of your DSO by 5-20%. ELF's exported symbol table format is quite a space hog, giving the complete mangled symbol name which with heavy template usage can average around 1000 bytes. C++ templates spew out a huge amount of symbols and a typical C++ library can easily surpass 30,000 symbols which is around 5-6Mb! Therefore if you cut out the 60-80% of unnecessary symbols, your DSO can be megabytes smaller!
Much lower chance of symbol collision. The old woe of two libraries internally using the same symbol for different things is finally behind us with this patch. Hallelujah!
Although the library quoted above is an extreme case, the new visibility support reduced the exported symbol table from > 200,000 symbols to less than 18,000. Some 21Mb was knocked off the binary size as well!

Some people may suggest that GNU linker version scripts can do just as well. Perhaps for C programs this is true, but for C++ it cannot be true - unless you laboriously specify each and every symbol to make public (and the complex mangled name of it), you must use wildcards which tend to let a lot of spurious symbols through. And you have to update the linker script if you decide to change names to the classes or the functions. In the case of the library above, the author couldn't get the symbol table below 40,000 symbols using version scripts. Furthermore, using linker version scripts doesn't permit GCC to better optimise the code.

Windows compatibility

For anyone who has worked on any sizeable portable application on both Windows and POSIX, you'll know the sense of frustration that non-Windows builds of GCC don't offer an equivalent to __declspec(dllexport) i.e. the ability to mark your C/C++ interface as being that of the shared library. Frustration because good DSO interface design is just as important for healthy coding as good class design, or correctly opaquing internal data structures.

While the semantics can't be the same with Windows DLL's and ELF DSO's, almost all Windows-based code uses a macro to compile-time select whether dllimport or dllexport is being used. This mechanism can be easily reused with this patch so adding support to anything already able to be compiled as a Windows DLL is literally a five minute operation.

Note: The semantics are not the same between Windows and this GCC feature - for example, __declspec(dllexport) void (*foo)(void) and void (__declspec(dllexport) *foo)(void) mean quite different things whereas this generates a warning about not being able to apply attributes to non-types on GCC.

Still not convinced?

A further reading on the subject of good DSO design is this article by Ulrich Drepper (lead maintainer of GNU glibc).

How to use the new C++ visibility support

In your header files, wherever you want an interface or API made public outside the current DSO, place __attribute__ ((visibility ("default"))) in struct, class and function declarations you wish to make public (it's easier if you define a macro as this). You don't need to specify it in the definition. Then, alter your make system to pass -fvisibility=hidden to each call of GCC compiling a source file. If you are throwing exceptions across shared object boundaries see the section "Problems with C++ exceptions" below. Use nm -C -D on the outputted DSO to compare before and after to see the difference it makes.

Some examples of the syntax:


#if defined _WIN32 || defined __CYGWIN__
  #ifdef BUILDING_DLL
    #ifdef __GNUC__
      #define DLL_PUBLIC __attribute__ ((dllexport))
    #else
      #define DLL_PUBLIC __declspec(dllexport) // Note: actually gcc seems to also supports this syntax.
    #endif
  #else
    #ifdef __GNUC__
      #define DLL_PUBLIC __attribute__ ((dllimport))
    #else
      #define DLL_PUBLIC __declspec(dllimport) // Note: actually gcc seems to also supports this syntax.
    #endif
  #endif
  #define DLL_LOCAL
#else
  #if __GNUC__ >= 4
    #define DLL_PUBLIC __attribute__ ((visibility ("default")))
    #define DLL_LOCAL  __attribute__ ((visibility ("hidden")))
  #else
    #define DLL_PUBLIC
    #define DLL_LOCAL
  #endif
#endif

extern "C" DLL_PUBLIC void function(int a);
class DLL_PUBLIC SomeClass
{
   int c;
   DLL_LOCAL void privateMethod();  // Only for use within this DSO
public:
   Person(int _c) : c(_c) { }
   static void foo(int a);
};
This also helps producing more optimised code: when you declare something defined outside the current compilation unit, GCC cannot know if that symbol resides inside or outside the DSO in which the current compilation unit will eventually end up; so, GCC must assume the worst and route everything through the GOT (Global Offset Table) which carries overhead both in code space and extra (costly) relocations for the dynamic linker to perform. To tell GCC a class, struct, function or variable is defined within the current DSO you must specify hidden visibility manually within its header file declaration (using the example above, you declare such things with DLLLOCAL). This causes GCC to generate optimal code.

But this is of course cumbersome: this is why -fvisibility was added. With -fvisibility=hidden, you are telling GCC that every declaration not explicitly marked with a visibility attribute has a hidden visibility. And like in the example above, even for classes marked as visible (exported from the DSO), you may still want to mark e.g. private members as hidden, so that optimal code will be produced when calling them (from within the DSO).

To aid you converting old code to use the new system, GCC now supports also a #pragma GCC visibility command:


extern void foo(int);
#pragma GCC visibility push(hidden)
extern void someprivatefunct(int);
#pragma GCC visibility pop
#pragma GCC visibility is stronger than -fvisibility; it affects extern declarations as well. -fvisibility only affects definitions, so that existing code can be recompiled with minimal changes. This is more true for C than C++; C++ interfaces tend use classes, which are affected by -fvisibility.

Lastly, there's one other new command line switch: -fvisibility-inlines-hidden. This causes all inlined class member functions to have hidden visibility, causing significant export symbol table size & binary size reductions though not as much as using -fvisibility=hidden. However, -fvisibility-inlines-hidden can be used with no source alterations, unless you need to override it for inlines where address identity is important either for the function itself or any function local static data.

Problems with C++ exceptions (please read!)

Exception catching of a user defined type in a binary other than the one which threw the exception requires a typeinfo lookup. Go back and read that last statement again. When exceptions start mysteriously malfunctioning, the cause is exactly this one!

Just like functions and variables, types that are thrown between multiple shared objects are public interfaces and must have default visibility. The obvious first step is to mark all types throwable across shared object boundaries always as default visibility. You must do this because even if (e.g.) the exception type's implementation code lives in DLL A, when DLL B throws an instance of that type, the catch handler in DLL C will look for the typeinfo in DLL B.

However, this isn't the full story - it gets harder. Symbol visibility is "default" by default but if the linker encounters just one definition with it hidden - just one - that typeinfo symbol becomes permanently hidden (remember the C++ standard's ODR - one definition rule). This is true for all symbols, but is more likely to affect you with typeinfos; typeinfo symbols for classes without a vtable are defined on demand within each object file that uses the class for EH and are defined weakly so the definitions get merged at link time into one copy.

The upshot of this is that if you forget your preprocessor defines in just one object file, or if at any time a throwable type is not declared explicitly public, the -fvisibility=hidden will cause it to be marked hidden in that object file, which overrides all the other definitions with default visibility and causes the typeinfo to vanish in the outputted binary (which then causes any throws of that type to cause terminate() to be called in the catching binary). Your binaries will link perfectly and appear to work correctly, even though they don't.

While it would be lovely to have a warning for this, there are plenty of legitimate reasons to keep throwable types out of public view. And until whole program optimisation is added to GCC, the compiler can't know which throws are caught locally.

The same issue can arise with other vague linkage entities such as static data members of a class template. If the class has hidden visibility, the data member can be instantiated in multiple DSOs and referenced separately, causing havoc.

This issue also shows up with classes used as the operand of dynamic_cast. Make sure to export all such classes.

Step-by-step guide

The following instructions are how to add full support to your library, yielding the highest quality code with the greatest reductions in binary size, load times and link times. All new code should have this support from the beginning! And it's worth your while especially in speed critical libraries to spend the few days required to implement it fully - it's a once off investment of time with nothing but good resulting forever more. You can however add basic support to your library in far less time though it is not recommended that you do so.

Place something along the lines of the following code in your master header file (or a specific header that you will include everywhere). This code is taken from the aforementioned TnFOX library:

// Generic helper definitions for shared library support
#if defined _WIN32 || defined __CYGWIN__
  #define FOX_HELPER_DLL_IMPORT __declspec(dllimport)
  #define FOX_HELPER_DLL_EXPORT __declspec(dllexport)
  #define FOX_HELPER_DLL_LOCAL
#else
  #if __GNUC__ >= 4
    #define FOX_HELPER_DLL_IMPORT __attribute__ ((visibility ("default")))
    #define FOX_HELPER_DLL_EXPORT __attribute__ ((visibility ("default")))
    #define FOX_HELPER_DLL_LOCAL  __attribute__ ((visibility ("hidden")))
  #else
    #define FOX_HELPER_DLL_IMPORT
    #define FOX_HELPER_DLL_EXPORT
    #define FOX_HELPER_DLL_LOCAL
  #endif
#endif

// Now we use the generic helper definitions above to define FOX_API and FOX_LOCAL.
// FOX_API is used for the public API symbols. It either DLL imports or DLL exports (or does nothing for static build)
// FOX_LOCAL is used for non-api symbols.

#ifdef FOX_DLL // defined if FOX is compiled as a DLL
  #ifdef FOX_DLL_EXPORTS // defined if we are building the FOX DLL (instead of using it)
    #define FOX_API FOX_HELPER_DLL_EXPORT
  #else
    #define FOX_API FOX_HELPER_DLL_IMPORT
  #endif // FOX_DLL_EXPORTS
  #define FOX_LOCAL FOX_HELPER_DLL_LOCAL
#else // FOX_DLL is not defined: this means FOX is a static lib.
  #define FX_API
  #define FOX_LOCAL
#endif // FOX_DLL
Obviously, you may wish to replace the FOX with a prefix suiting your library, and for projects also supporting Win32, you'll find a lot of the above familiar (you can reuse most of your Win32 macro machinery to also support GCC). To explain:
If _WIN32 is defined (as is automatic when building for Windows, even for 64-bit systems):
If FOX_DLL_EXPORTS is defined, we are building our library and symbols should be exported. So you would define FOX_DLL_EXPORTS in the build system that builds the FOX DLL. Something ending with _EXPORTS is defined by MSVC by default in all IDE projects (dito CMake default, see CMake Wiki BuildingWinDLL).
If FOX_DLL_EXPORTS is not defined (as is the case for clients using the library), we are importing the library and symbols should be imported.
If _WIN32 is not defined (as is the case when building for Unix with GCC):
If __GNUC__ >= 4 is true, then it means the compiler is GCC version 4.0 or later, and hence supports the new features.
For every non-templated non-static function definition in your library (both headers and source files), decide if it is publicly used or internally used:
If it is publicly used, mark with FOX_API like this: extern FOX_API PublicFunc()
If it is only internally used, mark with FOX_LOCAL like this: extern FOX_LOCAL PublicFunc() Remember, static functions need no demarcation, nor does anything which is templated.
For every non-templated class definition in your library (both headers and source files), decide if it is publicly used or internally used:
If it is publicly used, mark with FOX_API like this: class FOX_API PublicClass
If it is only internally used, mark with FOX_LOCAL like this: class FOX_LOCAL PublicClass
Individual member functions of an exported class that are not part of the interface, in particular ones which are private, and are not used by friend code, should be marked individually with FOX_LOCAL.
In your build system (Makefile etc), you will probably wish to add the -fvisibility=hidden and -fvisibility-inlines-hidden options to the command line arguments of every GCC invocation. Remember to test your library thoroughly afterwards, including that all exceptions correctly traverse shared object boundaries.
If you want to see before and after results, use the command nm -C -D <library>.so which lists all exported symbols in demangled form.


		19.8.2
	19.9
```
