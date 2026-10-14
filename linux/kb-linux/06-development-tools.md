---
type: reference
title: Development tools
description: "Linux development tools: debugging, build process, ELF and DWARF, header and library paths."
tags: [linux, debugging, build, gcc, reference, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "linux/KB_Linux#6"
---

# Development tools

[↑ KB_Linux](/linux/kb-linux/README.md)

## 6.1 Debugging

### 6.1.1 The build process

#### 6.1.1.1 ELF and DWARF

```text
			-> Executable and Linking Format (ELF) is the file format standard for executables, objects, shared libraries and core dumps in Unix.
			-> Use readelf to obtain ELF information.
Usage: readelf <option(s)> elf-file(s)
 Display information about the contents of ELF format files
 Options are:
  -a --all               Equivalent to: -h -l -S -s -r -d -V -A -I
  -h --file-header       Display the ELF file header
  -l --program-headers   Display the program headers
     --segments          An alias for --program-headers
  -S --section-headers   Display the sections' header
     --sections          An alias for --section-headers
  -g --section-groups    Display the section groups
  -e --headers           Equivalent to: -h -l -S
  -s --syms              Display the symbol table
      --symbols          An alias for --syms
  -n --notes             Display the core notes (if present)
  -r --relocs            Display the relocations (if present)
  -u --unwind            Display the unwind info (if present)
  -d --dynamic           Display the dynamic section (if present)
  -V --version-info      Display the version sections (if present)
  -A --arch-specific     Display architecture specific information (if any).
  -D --use-dynamic       Use the dynamic section info when displaying symbols
  -x --hex-dump=<number> Dump the contents of section <number>
  -w[liaprmfFso] or
  --debug-dump[=line,=info,=abbrev,=pubnames,=ranges,=macro,=frames,=str,=loc]
                         Display the contents of DWARF2 debug sections
  -I --histogram         Display histogram of bucket list lengths
  -W --wide              Allow output width to exceed 80 characters
  -H --help              Display this information
  -v --version           Display the version number of readelf

  Example:
  [ 3] .hash             HASH            08048148 000148 00002c 04   A  4   0  4
  [ 4] .dynsym           DYNSYM          08048174 000174 000060 10   A  5   1  4
  [ 5] .dynstr           STRTAB          080481d4 0001d4 000060 00   A  0   0  1
  [ 6] .gnu.version      VERSYM          08048234 000234 00000c 02   A  4   0  2
  [ 7] .gnu.version_r    VERNEED         08048240 000240 000020 00   A  5   1  4
  [ 8] .rel.dyn          REL             08048260 000260 000008 08   A  4   0  4
  [ 9] .rel.plt          REL             08048268 000268 000010 08   A  4  11  4
  [10] .init             PROGBITS        08048278 000278 000017 00  AX  0   0  4
  [11] .plt              PROGBITS        08048290 000290 000030 04  AX  0   0  4
  Source Code
  [12] .text             PROGBITS        080482c0 0002c0 00027c 00  AX  0   0  4
  [13] .fini             PROGBITS        0804853c 00053c 00001a 00  AX  0   0  4
  [14] .rodata           PROGBITS        08048558 000558 000151 00   A  0   0  4
  [15] .eh_frame         PROGBITS        080486ac 0006ac 000004 00   A  0   0  4
  CTORS and DTORS
  [16] .ctors            PROGBITS        080496b0 0006b0 000008 00  WA  0   0  4
  [17] .dtors            PROGBITS        080496b8 0006b8 000008 00  WA  0   0  4
  [18] .jcr              PROGBITS        080496c0 0006c0 000004 00  WA  0   0  4
  [19] .dynamic          DYNAMIC         080496c4 0006c4 0000c8 08  WA  5   0  4
  [20] .got              PROGBITS        0804978c 00078c 000004 04  WA  0   0  4
  [21] .got.plt          PROGBITS        08049790 000790 000014 04  WA  0   0  4
  [22] .data             PROGBITS        080497a4 0007a4 000010 00  WA  0   0  4
  [23] .bss              NOBITS          080497b4 0007b4 00000c 00  WA  0   0  4
  [24] .comment          PROGBITS        00000000 0007b4 000168 00      0   0  1
  DEBUG Sections
  [25] .debug_aranges    PROGBITS        00000000 00091c 000060 00      0   0  1
  [26] .debug_pubnames   PROGBITS        00000000 00097c 000098 00      0   0  1
  [27] .debug_info       PROGBITS        00000000 000a14 000598 00      0   0  1
  [28] .debug_abbrev     PROGBITS        00000000 000fac 000189 00      0   0  1
  [29] .debug_line       PROGBITS        00000000 001135 0000ad 00      0   0  1
  [30] .debug_frame      PROGBITS        00000000 0011e4 0000cc 00      0   0  4
  [31] .debug_str        PROGBITS        00000000 0012b0 000041 00      0   0  1
  [32] .debug_loc        PROGBITS        00000000 0012f1 0000dc 00      0   0  1
  [33] .shstrtab         STRTAB          00000000 0013cd 00013f 00      0   0  1
  [34] .symtab           SYMTAB          00000000 001aac 0005b0 10     35  61  4
  [35] .strtab           STRTAB          00000000 00205c 0002ec 00      0   0  1

			-> A newer format, compatible with ELF is DWARF 3.
```

#### 6.1.1.2 Header paths

```text
			-> GCC will look for system headers (included with <>) in predefined paths.
			-> After that GCC searches user headers (included with "") according to the -I options:
			$gcc -I/path/to/my/headers src.c
```

#### 6.1.1.3 Library paths

```text
			Two things are needed in order to link with a library:
				-> -larchive: link against archive, either a statically linking library (.a) or dynamically linking shared object (.so)
				-> -Lsearchdir: Add searchdir to the list of paths the linker will search. The directory is added before the system default directories.
```

#### 6.1.1.4 Debug Information

```text
			-> -g flag instructs GCC to add debug Information.
			-> Even without -g, GCC still includes minimal DWARF debug information.
			-> Prior to shipping an application, it may be a good idea to strip the executable from all debug symbols:
			-> executables with debug information are significantly larger and occupy more disk space. However the debug sections are not loaded to RAM so there's no effect on runtime performance.
				$strip -d application

			Note, Debug information resides inside special ELF sections and is stored on the disk only. It is not loaded into memory. It contains the path to the sources (you can look for it with $strings -a application). This is way the same source code, if compiled on different machines, may generate two different object files.

			-> executables that are shipped to customers should be stripped, however its important to keep a copy of the corresponding exec compiled with -g (for debugging if an issue occurs).
```

#### 6.1.1.5 Optimization

```text
			-> -On flag determines the optimization level, n.
			-> Linux kernel compiles with -o2
			-> Debugging and optimization don't go well together.
			Note, gdb will allow to debug optimized binaries but things will work awkwardly.
			line numbers may not match; variables may disappear (optimized);

			Note, In some cases its not possible not to optimize either because the application must be optimized (for example, an application that is using the inb() or outb() functions) or when a bug happens only in optimized application.

			-> A full listing of optimization options in gnu gcc site,http://gcc.gnu.org/onlinedocs/gcc-3.4.3/gcc/Optimize-Options.html 
```

#### 6.1.1.6 LDD

```text
			-> View dynamic library dependencies of an application.
			$ ldd head
		        libc.so.6 => /lib/tls/libc.so.6 (0x00be3000)
		        /lib/ld-linux.so.2 (0x001b9000)

			Note, ldd -v will give recursive dependencies.

			Note, ldd shows runtime information. The results depend on the system you're checking the binary on.

			Example:
$ ldd main_stat 
        libc.so.6 => /lib/tls/libc.so.6 (0x00be3000)
        /lib/ld-linux.so.2 (0x001b9000)
$ ldd main_dyn 
        libdyn.so.1 => /users/<user>/work/linux_debug/912/static_and_dynamic_linkage/libdyn.so.1 (0x007c1000)
        libc.so.6 => /lib/tls/libc.so.6 (0x00be3000)
        /lib/ld-linux.so.2 (0x001b9000)
```

#### 6.1.1.7 Symbols

```text
			-> Global functions and variables in the sources become symbols in the object files.
			-> The linker statically links object files together using symbols
			-> Dynamic linkage uses the GOT (Global Offset Table) and the PLT (Procedure Linkage Table)

			Note, a function or variable with "static" modifier is *not* global.
			Note, The ELF includes all the GOT and PLT information. The GOT holds all variables addresses. All addresses in GOT are referenced using an offset known at link time.
			The PLT does lazy evaluation of function addresses, using the dynamic linker the first time a function in a DSO (.so) is called and storing the address so that subsequent calls don't have to go through the dynamic linker again.

			-> Symbols usually have the same name as their function or variable name.
			-> However, dynamic linkage (that allows multiple version of the same DSO) and c++ (that allows function overloading) create possible name conflicts, which is why symbol names will sometimes be mangled.
```

#### 6.1.1.8 NM

```text
			Used in order to list symbols from an ELF object.
			Example:
$ nm libActiveDirectoryIDStore.so 
00018310 r AD_MAX_TIME
0001a338 r AD_MAX_TIME
0001d8e0 A __bss_start
0000c388 t call_gmon_start
         U cdcFreeObject

			The symbol types:
				--> Capital symbol type letter are for exported symbols, that the linker works with. Lowercase letters for the type are used for internal symbols (static or hidden).
				--> B/b the symbol is in the uninitialized data section (BSS)
				Note, a good method of finding unintialized variables in the code is 
				$ nm application  | grep -i " b "
				--> D/d the symbol is in the initialized data section (BSS)
				--> T/t the symbol is in the text (source code) section
				--> U the symbol is undefined
				--> The other types are less important, see man page for further details.

				--> BSS
In computer programming, .bss or bss is used by many compilers and linkers as the name of the data segment containing static variables that are filled solely with zero-valued data initially (ie, when execution begins). It is often referred to as the "bss section" or "bss segment". The program loader initializes the memory allocated for the bss section when it loads the program.

In an object module compiled from C, the bss section contains the local variables (but not functions) that were declared with the static keyword, except for those with non-zero initial values. (In C, static variables are initialized to zero by default.) It also contains the non-local (both extern and static) variables that are also initialized to zero (either explicitly or by default).

Historically, BSS (from Block Started by Symbol) was a pseudo-operation in UA-SAP (United Aircraft Symbolic Assembly Program), the assembler developed in the mid-1950s for the IBM 704 by Roy Nutt, Walter Ramshaw, and others at United Aircraft Corporation.

The BSS keyword was later incorporated into FAP (FORTRAN Assembly Program), IBM's standard assembler for its 709 and 7090/94 computers. It defined a label and reserved uninitialized space for a given number of words.
```

#### 6.1.1.9 objdump - ELF contents, sort of a disassembler

```text
				-> Flags
					--> -d/-D, disassemble/disassemble all
					--> -S, intermix source code with assembly
					--> -x, display all available header information
					--> -C, demangle symbol names into user level names (C++)

				-> Usage
					-> most commonly used when we only have a crash address (EIP) and need to understand where we crashed.
					-> NM OToH is used to resolve linkage problems - in order to understand which symbols are defined where.

				-> Example:
$ objdump -DSx  main_stat
...
//int lib_a_global_var;

int main(void)
{
 8048368:   55                      push   %ebp
 8048369:   89 e5                   mov    %esp,%ebp
 804836b:   83 ec 08                sub    $0x8,%esp
 804836e:   83 e4 f0                and    $0xfffffff0,%esp
 8048371:   b8 00 00 00 00          mov    $0x0,%eax
 8048376:   83 c0 0f                add    $0xf,%eax
 8048379:   83 c0 0f                add    $0xf,%eax
 804837c:   c1 e8 04                shr    $0x4,%eax
 804837f:   c1 e0 04                shl    $0x4,%eax
 8048382:   29 c4                   sub    %eax,%esp
//    lib_a_global_var = 1234;
//    printf("lib_a_global_var = %d\n", lib_a_global_var);

    lib_a_print_msg("Message A");
 8048384:   83 ec 0c                sub    $0xc,%esp
 8048387:   68 60 85 04 08          push   $0x8048560
 804838c:   e8 3d 00 00 00          call   80483ce <lib_a_print_msg>
 8048391:   83 c4 10                add    $0x10,%esp
    lib_b_print_msg("Message B");
 8048394:   83 ec 0c                sub    $0xc,%esp
 8048397:   68 6a 85 04 08          push   $0x804856a
 804839c:   e8 ad 00 00 00          call   804844e <lib_b_print_msg>
 80483a1:   83 c4 10                add    $0x10,%esp

    return 0;
 80483a4:   b8 00 00 00 00          mov    $0x0,%eax
}
...
```

#### 6.1.1.10 Troubleshoot Static Linkage

```text
				-> Missing symbols

				-> Using the same name for a static symbol in two different files by mistake. For example, while intending to have only one variable, it is by mistake defined as static in a header file. This is because a static variable can be defined in a header file, but this would cause each source file that included the header file to have its own private copy of the variable.

				-> Symbol collisions. For example, sometimes preprocessor macros are used to change function names.

				-> Link order, the order of -l placements is important!
				example,
				$ gcc foo.o -lz bar.o
				If bar.o uses symbols from z.a the link will fail due to undefined symbols.

				-> Linker for searches for lins in the default paths and only then in the -L paths
				-> The order of -l or -L is important, gcc links according to this order.

				-> To make an executable that is fully statically linked use the -static flag for gcc. 
Note, linking with libc can be done statically, however libc depends on libnss that has only .so version.
```

#### 6.1.1.11 Troubleshoot Dynamic Linkage

```text
				The same as in static plus:

				-> Library interface changes require change to the DSO version

				-> Debug dynamic linker
				$ export LD_DEBUG=help
				$ ./main_dyn
Valid options for the LD_DEBUG environment variable are:

  libs        display library search paths
  reloc       display relocation processing
  files       display progress for input file
  symbols     display symbol table processing
  bindings    display information about symbol binding
  versions    display version dependencies
  all         all previous options combined
  statistics  display relocation statistics
  unused      determined unused DSOs
  help        display this help message and exit

To direct the debugging output into a file instead of standard output
a filename can be specified using the LD_DEBUG_OUTPUT environment variable.

$ LD_DEBUG=files; ./main_dyn 
     10009:
     10009:     file=libdyn.so.1 [0];  needed by ./main_dyn [0]
     10009:     file=libdyn.so.1 [0];  generating link map
     10009:       dynamic: 0x007c687c  base: 0x007c5000   size: 0x00001984
     10009:         entry: 0x007c54f0  phdr: 0x007c5034  phnum:          4
     10009:
     10009:
     10009:     file=libc.so.6 [0];  needed by ./main_dyn [0]
     10009:     file=libc.so.6 [0];  generating link map
     10009:       dynamic: 0x00d09d3c  base: 0x00000000   size: 0x0012acdc
     10009:         entry: 0x00bf7ed0  phdr: 0x00be3034  phnum:         10
     10009:
     10009:
     10009:     calling init: /lib/tls/libc.so.6
     10009:
     10009:
     10009:     calling init: /users/<user>/work/linux_debug/912/static_and_dynamic_linkage/libdyn.so.1
     10009:
     10009:
     10009:     initialize program: ./main_dyn
     10009:
     10009:
     10009:     transferring control: ./main_dyn
     10009:
lib_a.c - lib_a_print_msg(): Calling lib_a_static_print_msg()
lib_a.c - lib_a_static_print_msg(): Message A
lib_a.c - lib_a_print_msg(): lib_a_global_var = 0, lib_a_global_inited_var = 42, lib_a_static_var = 0
lib_b.c - lib_b_print_msg(): Calling lib_b_static_print_msg()
lib_b.c - lib_b_static_print_msg(): Message B
     10009:
     10009:     calling fini: /users/<user>/work/linux_debug/912/static_and_dynamic_linkage/libdyn.so.1 [0]
     10009:
     10009:
     10009:     calling fini: /lib/tls/libc.so.6 [0]
     10009:


	   -> A process virtual map
	   Virtual address space of 0-4GB
addresses > 0xc0000000 are inside the kernal virtual mapping to the process
So crash address larger than 0xc0000000 is in the crash
local pointer that has address larger than 0xc0000000 is invalid and may cause unexpected behaviour


		   HW		CPU<->NMU<->Memory buss		SW generated interrupt
4GB		   Kernel		Sys calls		sys_open()
3G 0xc0000000	   Stack(s)		C lib			open()
		    ||
		   Heap
	   	   .bss (uninitialized data)
	   	   Data (initialized)
0 GB		   Text (source code)

Note, MT processes has multiple stacks (per threads)

	-> Getting information about process
	processes directory
$ ls /proc
1/      10502/  12151/  2331/   28359/  34/    4801/  6840/  7663/        fs/         pc
10212/  10503/  13022/  2332/   28548/  3456/  4812/  6864/  7722/        ide/        sc
10224/  10505/  1532/   2349/   2870/   3521/  4821/  6873/  8/           interrupts  se
10445/  10506/  15370/  2350/   2871/   3638/  4822/  6891/  9/           iomem       sl
10447/  10507/  15381/  24813/  29814/  3647/  4823/  6912/  9012/        ioports     st
10448/  10508/  15621/  26101/  3/      3703/  4825/  6913/  9315/        irq/        sw
10485/  10517/  15624/  26102/  30067/  3719/  4831/  6916/  9582/        kallsyms    sy
10487/  10549/  15625/  2681/   30559/  3812/  4839/  6918/  acpi/        kcore       sy
10488/  10550/  15626/  2682/   308/    3843/  4840/  6922/  asound/      keys        sy
10489/  10551/  15627/  2702/   309/    3868/  5/     6924/  buddyinfo    key-users   tt
10490/  10552/  15630/  2739/   313/    3869/  53/    6926/  bus/         kmsg        up
10491/  10554/  15633/  28296/  31621/  4/     54/    6928/  cmdline      loadavg     ve
10492/  10556/  15634/  28297/  3174/   4251/  5495/  6930/  cpuinfo      locks       vm
10493/  10558/  15635/  28298/  3179/   4427/  55/    6934/  crypto       mdstat
10494/  10560/  16027/  28299/  3189/   4658/  5526/  6948/  devices      meminfo
10495/  10562/  199/    28300/  32/     4666/  5836/  6950/  diskstats    misc
10496/  11173/  2/      28303/  3208/   4677/  6/     6952/  dma          modules
10498/  11174/  2004/   28304/  3228/   4709/  6773/  6954/  driver/      mounts@
10499/  11175/  2098/   28306/  3258/   4746/  6775/  7/     execdomains  mtrr
10500/  12147/  22006/  28308/  33/     4764/  6777/  7487/  fb           net/
10501/  12149/  22262/  28309/  332/    4790/  6785/  7489/  filesystems  partitions

1 is init process 
Get its command line
$ cat /proc/1/cmdline 

Address break down of the process
init [5]$ cat /proc/1/maps
cat: /proc/1/maps: Permission denied
$ sudo cat /proc/1/maps
Password:
001b9000-001ce000 r-xp 00000000 08:02 770174     /lib/ld-2.3.4.so
001ce000-001cf000 r--p 00015000 08:02 770174     /lib/ld-2.3.4.so
001cf000-001d0000 rw-p 00016000 08:02 770174     /lib/ld-2.3.4.so
001d2000-001df000 r-xp 00000000 08:02 770137     /lib/libsepol.so.1
001df000-001e0000 rw-p 0000c000 08:02 770137     /lib/libsepol.so.1
001e0000-001e8000 rw-p 001e0000 00:00 0 
00590000-0059d000 r-xp 00000000 08:02 776587     /lib/libselinux.so.1
0059d000-0059e000 rw-p 0000d000 08:02 776587     /lib/libselinux.so.1
C lib
00be3000-00d08000 r-xp 00000000 08:02 776436     /lib/tls/libc-2.3.4.so
00d08000-00d09000 r--p 00124000 08:02 776436     /lib/tls/libc-2.3.4.so
00d09000-00d0c000 rw-p 00125000 08:02 776436     /lib/tls/libc-2.3.4.so
00d0c000-00d0e000 rw-p 00d0c000 00:00 0 
Source code
08048000-0804f000 r-xp 00000000 08:02 835645     /sbin/init
0804f000-08050000 rw-p 00007000 08:02 835645     /sbin/init
08a7c000-08a9d000 rw-p 08a7c000 00:00 0 
b7f36000-b7f38000 rw-p b7f36000 00:00 0 
bfe4a000-c0000000 rw-p bfe4a000 00:00 0 
ffffe000-fffff000 ---p 00000000 00:00 0 

Notice 4k segments (last three digits 000)
```

#### 6.1.1.12 IO, Socket usage report for a given process

```text
ls -l "/proc/"`pidof proc_name`"/fd"
ex:
# ls -l "/proc/"`pidof adclient`"/fd"
total 19
lrwx------  1 root gadmin 64 Nov  7 15:00 0 -> /dev/null
lrwx------  1 root gadmin 64 Nov  7 15:00 1 -> /dev/null
lrwx------  1 root gadmin 64 Nov  7 15:00 11 -> /var/centrifydc/uid.idx
lrwx------  1 root gadmin 64 Nov  7 15:00 12 -> /var/centrifydc/uname.idx
lrwx------  1 root gadmin 64 Nov  7 15:00 13 -> /var/centrifydc/gname.idx
lrwx------  1 root gadmin 64 Nov  7 15:00 14 -> /var/centrifydc/gid.idx
lrwx------  1 root gadmin 64 Nov  7 15:00 15 -> /var/centrifydc/extmgr.idx
lrwx------  1 root gadmin 64 Nov  7 15:00 17 -> socket:[42252340]
lrwx------  1 root gadmin 64 Nov  7 15:00 18 -> socket:[42252342]
lr-x------  1 root gadmin 64 Nov  7 15:00 19 -> pipe:[42252344]
lrwx------  1 root gadmin 64 Nov  7 15:00 2 -> /dev/null
l-wx------  1 root gadmin 64 Nov  7 15:00 20 -> pipe:[42252344]
lrwx------  1 root gadmin 64 Nov  7 15:00 3 -> socket:[42252315]
lrwx------  1 root gadmin 64 Nov  7 15:00 4 -> /var/run/adclient.lock
lrwx------  1 root gadmin 64 Nov  7 15:00 5 -> /var/centrifydc/gcdn.idx
lrwx------  1 root gadmin 64 Nov  7 15:00 6 -> /var/centrifydc/dcdn.idx
lrwx------  1 root gadmin 64 Nov  7 15:00 7 -> /var/centrifydc/gc.cache
lrwx------  1 root gadmin 64 Nov  7 15:00 8 -> /var/centrifydc/dc.cache
lrwx------  1 root gadmin 64 Nov  7 15:00 9 -> /var/centrifydc/search.idx

			6.1.1.13
```

### 6.1.2 Debugging Linux Applications

#### 6.1.2.1 GDB Features

```text
				-> Starting programs, attaching to running programs or debugging crashed programs
				-> Debugging locally or remotely (via gdbserver)
				-> Setting breakpoints and watchpoints
				-> Examining variables, registers and call stack
				-> Changing data and calling functions
				-> Automating debug tasks
				-> Multi threaded programs
```

#### 6.1.2.2 GDB Interfaces

```text
				-> GDB can be used in two ways:
					--> Standalone interactive program running in the shell
					--> Back-end to a GUI program, communicating in the MI protocol

				-> The text interface is more difficult to use, but can do things not possible in GUI, like automation
```

#### 6.1.2.3 Build for debugging

```text
				-> In order to effectively debug a program, we need to build it with debug information
				-> Debug information saves the relation between the program binary and its sources and is required for proper GDB operation
				-> To build a binary with debug information, pass the -g argument to GCC

				-> Note, on most compilers -o (optimization) and -g (debug) or mutually exclusive.
				-> Note, GCC, G++, support compiling with both -o and -g. However, keep in mind, that -o rearranges the code so you might see some discrepancies between the sources and the actual program
				-> Note, It may happen that some things will not work well with -g and -O, particularly on machines with instruction scheduling. In case of doubt recompile only with -g
				-> Note, Most compilers will not show information regarding preprocessor macros. GCC (versions > 3.1) can show this information if you specify the flags -gdwarf-2 and -g3. 
```

#### 6.1.2.4 Starting GDB

```text
				-> Invoke:
				$ gdb application

				-> Core file:
				$ gdb application core

				-> Attach to a running process
				$gdb application pid
```

#### 6.1.2.5 Commands

```text
				-> GDB command is a single line of input
				-> A command may be truncated if that abbreviation is unambigouos
				Note, In special cases ambigouos abbreviations are allowed. For example 's' for step
				-> A blank line (typing just RETURN) means to repeat the previous command
				Note, Certain commands (for example, run) will not repeat since they're unintentional repetition might cause unexpected behaviour.
				Note, The list and x commands when repeated with RETURN construct new arguments rather than repeating exactly as typed. This permits easy scanning of source code or memory

				-> Any text after # is comment
				-> Ctrl+o repeats the last command
```

#### 6.1.2.5.1 Start program

```text
					-> To start the program use 'run'
					-> 'run' can accept arguments the same as the original program
					-> The program to run is the one specifed on the GDB command line
```

#### 6.1.2.5.2 Program Execution

```text
					-> Ctrl+C stopes the program (if it is multi threaded, all threads are stoepd)
					-> 'step' steps into current function
						--> 'stepi' steps one machine instruction
					-> 'next' advances to next source line
					-> 'cont' continues the program
```

#### 6.1.2.5.3 Source Code listing

```text
					-> 'list' shows the source code at the current position
						--> Additional list commands show the next lines of source
					-> Its possible to list a specific file or function
						--> function: list my_func
						(gdb) list 'ActiveDirectoryClientTest::checkConnection()'

						--> file: list file:line
						(gdb) list ActiveDirectoryClientTest.cpp:15
```

#### 6.1.2.5.4 Symbolic Debugging

```text
				-> 'p', 'print' shows the value of a variable, address or expression
				-> 'display'/'undisplay' follow/stop following changes in above while stepping through the code
					--> Can be abbreviated to 'disp'/'undisp'
				-> 'x','examine' enables to examine memory
					$ x/20w $sp
				The command accepts three optional switches after the / - the repeat count (20), the display format and the unit size (w - word, 4 bytes). The example will print 20 words starting at the address of the stack pointer 

				-> 'call' funcname(params...) will call the function
				Usefull mainly for read only functions or functions that don't change the current state

				-> 'backtrace','bt', 'where', prints the call stack, containing all frames leading to the current function
				Note, use 'fr' to select a frame from the trace and print information from that frame.
				-> 'info threads' shows information on current threads
				-> 'info registers' will list the CPU registers and their contents, for a selected stack frame
					--> It can receive a register name as argument to print only it
				-> More info commands are available, see help info for details
					--> help info
info address -- Describe where symbol SYM is stored
info all-registers -- List of all registers and their contents
info args -- Argument variables of current stack frame
info auxv -- Display the inferior's auxiliary vector
info breakpoints -- Status of user-settable breakpoints
info catch -- Exceptions that can be caught in the current stack frame
info classes -- All Objective-C classes
info common -- Print out the values contained in a Fortran COMMON block
info copying -- Conditions for redistributing copies of GDB
info dcache -- Print information on the dcache performance
info display -- Expressions to display when program stops
info extensions -- All filename extensions associated with a source language
info files -- Names of targets and files being debugged
info float -- Print the status of the floating point unit
info frame -- All about selected stack frame
info functions -- All function names
info handle -- What debugger does when program gets various signals
info line -- Core addresses of the code for a source line
info linkmap -- Display the inferior's linkmap
info locals -- Local variables of current stack frame
info macro -- Show the definition of MACRO
info mem -- Memory region attributes
info proc -- Show /proc process information about any running process
info program -- Execution status of the program
info registers -- List of integer registers and their contents
info scope -- List the variables local to a scope
info selectors -- All Objective-C selectors
info set -- Show all GDB settings
info sharedlibrary -- Status of loaded shared object libraries
info signals -- What debugger does when program gets various signals
info source -- Information about the current source file
info sources -- Source files in the program
info stack -- Backtrace of the stack
info symbol -- Describe what symbol is at location ADDR
info target -- Names of targets and files being debugged
info terminal -- Print inferior's saved terminal status
info threads -- IDs of currently known threads
info tracepoints -- Status of tracepoints
info types -- All type names
info udot -- Print contents of kernel ``struct user'' for current child
info variables -- All global and static variable names
info vector -- Print the status of the vector unit
info warranty -- Various kinds of warranty you do not have
info watchpoints -- Synonym for ``info breakpoints''
info win -- List of all displayed windows
```

#### 6.1.2.6 Breakpoints

```text
			-> break [LOCATION] [thread #] [if condition] will set a breakpoint
				--> LOCATION, line number, function name or an address
				--> # referes to the thread number. The brearkpoint will only be valid for that thread
				--> condition is a boolean expression. The breakpoint will only happen if its true

			-> Examples:
				-->	(gdb) break main
			break at entrance to main()

				-->	(gdb) break hello.cpp:3
			break in third line of hello.cpp

				-->	(gdb) break thread 3 *0xdeadbeef
			break when EIP value is 0xdeadbeef in thread 3
			Its useful if working with tools that allow to overwrite the process memory addresses with this value, so that if the EIP is invalid (meaning it gets out of memory boundary value that we've set earlier) the breakpoint will spring.

				-->	(gdb) break func if (my_global == 40 )
			break in func() if variable my_global equals 40
```

#### 6.1.2.7 Watchpoints

```text
			Get an interrupt when a certain value changes.

			-> Use watch command to set watchpoints
			-> This will stop execution whenever the value of an expression changes
			-> GDB supports hardware watchpoints. usually limited to 32.
			-> GDB also supports software watchpoints but they are very slow
			-> Example, 
			(gdb) watch g_flag
			-> Use info watchpoints to see current watchpoint. The same breakpoints syntax applies for enabling and disabling watchpoints

			-> Example, bussybox crash
Crash example:
$ ./busybox  df
Filesystem           1k-blocks      Used Available Use% Mounted on
Floating point exception

Debug executable with debug information
$ gdb ./busybox_unstripped 
GNU gdb Red Hat Linux (6.3.0.0-1.132.EL4rh)
Copyright 2004 Free Software Foundation, Inc.
GDB is free software, covered by the GNU General Public License, and you are
welcome to change it and/or distribute copies of it under certain conditions.
Type "show copying" to see the conditions.
There is absolutely no warranty for GDB.  Type "show warranty" for details.
This GDB was configured as "i386-redhat-linux-gnu"...Using host libthread_db library "/lib/tls/libthread_db.so.1".

(gdb) run df 
Starting program: /users/<user>/work/linux_debug/912/busybox/busybox-1.2.2/busybox_unstripped df
Filesystem           1k-blocks      Used Available Use% Mounted on

Program received signal SIGFPE, Arithmetic exception from CPU FPU.
0x0804e788 in __divdi3 ()
(gdb) bt
__ prefix suggests a libc function, This is the exception signal handler that GDB planted in the debug executable.
#0  0x0804e788 in __divdi3 ()

This is the point of crash
#1  0x0804ace5 in df_main (argc=1, argv=0xbfe98afc)
    at /users/<user>/work/linux_debug/912/busybox/busybox-1.2.2/coreutils/df.c:110

#2  0x080498e4 in run_applet_by_name (name=0xbff4c63a "df", argc=1, argv=0xbfe98af8)
    at /users/<user>/work/linux_debug/912/busybox/busybox-1.2.2/applets/applets.c:484
#3  0x08049aa5 in busybox_main (argc=2, argv=0xbfe98af4)
    at /users/<user>/work/linux_debug/912/busybox/busybox-1.2.2/applets/busybox.c:151
#4  0x0804987c in run_applet_by_name (name=0xbff4c627 "busybox_unstripped", argc=2, argv=0xbfe98af4)
    at /users/<user>/work/linux_debug/912/busybox/busybox-1.2.2/applets/applets.c:477
#5  0x08049963 in main (argc=2, argv=0xbfe98af4)
    at /users/<user>/work/linux_debug/912/busybox/busybox-1.2.2/applets/busybox.c:81
(gdb) fr 1
#1  0x0804ace5 in df_main (argc=1, argv=0xbfe98afc)
    at /users/<user>/work/linux_debug/912/busybox/busybox-1.2.2/coreutils/df.c:110
110                                     blocks_percent_used = (((long long) blocks_used) * 100 /
(gdb) list
105
106                     if ((s.f_blocks > 0) || !mount_table){
107                             blocks_used = s.f_blocks - s.f_bfree;
108                             blocks_percent_used = 0;
109                             if (blocks_used + s.f_bavail) {
110                                     blocks_percent_used = (((long long) blocks_used) * 100 /
111                                                                                blocks_percent_used
112                                                                                + (blocks_used + s.f_bavail)/2
113                                                                                ) / (blocks_used + s.f_bavail);
114                             }
```

#### 6.1.2.8 Remote Debugging

```text
			-> Sometimes its neccessary to debug a program on a different machine
				--> Problem occurs on a remote customer server accessible only via network
				--> Can't put source on customer machine
				--> Don't have room on customer machine for source and debug information
				--> No debugger on customer machine
				--> Embedded service
				--> Its possible to debug when host and target are different platforms. 
				For example host can be X86 and target can be MIPS.
				This is achieved by GDB's cross_toolchain lib that can generate target assembly instructions and pass them to gdbserver

			-> Terms:
				--> Our workstation with debugger and source is called "host"
				--> Customer machine with the executable is called "target"

			-> On host we need:
				 Debugger, Source, Executable and libraries with debug information

			-> On target we need:
				Executable and Debugger Agent
				Note, no debug information is needed on target machine
				Note, we can generate the executable with debug information, save a copy for debugging and use "strip" to remove the debug information from the binary before installing in on customer machine
				$strip my_exe
				Note, debug information significantly increases the executable size

			-> Debugging Agent
				--> Named GDBServer, like GDB it can either start a program or attach to an already running program
				--> GDB and GDBServer communicate either via TCP or via serial port
			
			-> Example
				--> On target
					---> $gdbserver /dev/ttyS0 my_prog 12 3
					Load my_prog with parameters 12 and 3 and wait for the debugger to connect on the first serial port

					---> $gdbserver 0.0.0.0:9999 my_prog 12 3
					Load my_prog with parameters 12 and 3 and wait for the debugger to connect on TCP port 9999

					---> $gdbserver 0.0.0.0:9999 -attach 112
					Attach agent to the process with PID 112 and wait for the debugger to connect on TCP port 9999

				--> On host
					---> $gdb my_prog
					start gdb

					---> (gdb) set solib-absolute-prefix /dev/null
					     (gdb) set solib-search-path /paths/to/target/libs
					     This will set the host patch to target libraries with debug information
					     The paths are a colon separated list of directories in which to search for shared libraries.
					     Note, solib-search-path is used after solib-absolute-prefix fails to locate the library, or if the path to the library is relative instead of absolute. If you want to use solib-search-path instead of solib-absolute-prefix be sure to set solib-absolute-prefix to a nonexistent directory to prevent GDB from finding your host's libraries

					     Note, this is usually part of the cross platform toolchain directory (this being a copy of the target libs for most common platforms). It isn't included in default RH image so need to install it manually. 

					---> target remote <ip>:9999
Example:
Target:
$ gdbs
erver  :9999  ./busybox ls xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxx
Process ./busybox created; pid = 18757
Listening on port 9999
^[[DRemote debugging from host 127.0.0.1

Host:
(gdb) target remote localhost:9999
A program is being debugged already.  Kill it? (y or n) y
Remote debugging using localhost:9999
0x001b97c0 in ?? ()
(gdb) b main
Note: breakpoints 1 and 2 also set at pc 0x804990c.
Breakpoint 3 at 0x804990c: file /users/<user>/work/linux_debug/912/busybox/busybox-1.2.2/applets/busybox.c, line 72.
(gdb) c
Continuing.

Breakpoint 1, main (argc=3, argv=0xbff62734) at /users/<user>/work/linux_debug/912/busybox/busybox-1.2.2/applets/busybox.c:72
72              bb_applet_name=argv[0];
(gdb) c
Continuing.

Program received signal SIGSEGV, Segmentation fault.
0x0804c300 in ls_main (argc=Cannot access memory at address 0x78787880
) at /users/<user>/work/linux_debug/912/busybox/busybox-1.2.2/coreutils/ls.c:1041
1041            dn = NULL;
(gdb) x/80w $sp

look at the address 0x78787880, check if its in the process memory address
$ cat /proc/18798/maps

			-> Tips
				--> Your first automatic breakpoint will be before main() in the guts of the C library
				for this just do, "b main" and "c"
				--> If the path to the copy of the target libraries on the host is wrong, or that the target and the host files do not match, you will see many strange errors
				--> If the target gdbserver is not installed or the file libthread_db.so is missing, you will not be able to see or debug threads
```

#### 6.1.2.9 Automation

#### 6.1.2.9.1 https://stackoverflow.com/questions/10748501/what-are-the-best-ways-to-automate-a-gdb-debugging-session

```text
I was just going through something similar, and came up with a basic example - and knowing I'll forget about it soon, I thought I'd better post it :) So I'll post it here, as it looks related to the question.

Basically, in this example I wanted to get some variable values in particular places of the code; and have them output until the program crashes. So here is first a little program which is guaranteed to crash in a few steps, test.c:

#include <stdio.h>
#include <stdlib.h>

int icount = 1; // default value

main(int argc, char *argv[])
{
  int i;

  if (argc == 2) {
    icount = atoi(argv[1]);
  }

  i = icount;
  while (i > -1) {
    int b = 5 / i;
    printf(" 5 / %d = %d \n", i, b );
    i = i - 1;
  }

  printf("Finished\n");
  return 0;
}
The only reason the program accepts command-line arguments is to be able to choose the number of steps before crashing - and to show that gdb ignores --args in batch mode. This I compile with:

gcc -g test.c -o test.exe
Then, I prepare the following script - the main trick here is to assign a command to each breakpoint, which will eventually continue (see also Automate gdb: show backtrace at every call to function puts). This script I call test.gdb:

# http://sourceware.org/gdb/wiki/FAQ: to disable the
# "---Type <return> to continue, or q <return> to quit---"
# in batch mode:
set width 0
set height 0
set verbose off

# at entry point - cmd1
b main
commands 1
  print argc
  continue
end

# printf line - cmd2
b test.c:17
commands 2
  p i
  p b
  continue
end

# int b = line - cmd3
b test.c:16
commands 3
  p i
  p b
  continue
end

# show arguments for program
show args
printf "Note, however: in batch mode, arguments will be ignored!\n"

# note: even if arguments are shown;
# must specify cmdline arg for "run"
# when running in batch mode! (then they are ignored)
# below, we specify command line argument "2":
run 2     # run

#start # alternative to run: runs to main, and stops
#continue
Note that, if you intend to use it in batch mode, you have to "start up" the script at the end, with run or start or something similar.

With this script in place, I can call gdb in batch mode - which will generate the following output in the terminal:

$ gdb --batch --command=test.gdb --args ./test.exe 5
Breakpoint 1 at 0x804844d: file test.c, line 10.
Breakpoint 2 at 0x8048485: file test.c, line 17.
Breakpoint 3 at 0x8048473: file test.c, line 16.
Argument list to give program being debugged when it is started is "5".
Note, however: in batch mode, arguments will be ignored!

Breakpoint 1, main (argc=2, argv=0xbffff424) at test.c:10
10    if (argc == 2) {
$1 = 2

Breakpoint 3, main (argc=2, argv=0xbffff424) at test.c:16
16      int b = 5 / i;
$2 = 2
$3 = 134513899

Breakpoint 2, main (argc=2, argv=0xbffff424) at test.c:17
17      printf(" 5 / %d = %d \n", i, b );
$4 = 2
$5 = 2
 5 / 2 = 2 

Breakpoint 3, main (argc=2, argv=0xbffff424) at test.c:16
16      int b = 5 / i;
$6 = 1
$7 = 2

Breakpoint 2, main (argc=2, argv=0xbffff424) at test.c:17
17      printf(" 5 / %d = %d \n", i, b );
$8 = 1
$9 = 5
 5 / 1 = 5 

Breakpoint 3, main (argc=2, argv=0xbffff424) at test.c:16
16      int b = 5 / i;
$10 = 0
$11 = 5

Program received signal SIGFPE, Arithmetic exception.
0x0804847d in main (argc=2, argv=0xbffff424) at test.c:16
16      int b = 5 / i;
Note that while we specify command line argument 5, the loop still spins only two times (as is the specification of run in the gdb script); if run didn't have any arguments, it spins only once (the default value of the program) confirming that --args ./test.exe 5 is ignored.

However, since now this is output in a single call, and without any user interaction, the command line output can easily be captured in a text file using bash redirection, say:

gdb --batch --command=test.gdb --args ./test.exe 5 > out.txt
There is also an example of using python for automating gdb in c - GDB auto stepping - automatic printout of lines, while free running?
```

#### 6.1.2.9.2 My example

```text
			-> Its possible to specify GDB commands to be run automatically when a breakpoint is hit using:
			"command <breakpoint number> "
			Example:
			(gdb) b main
			(gdb) commands
			Type command ...
			end line with "end"
			>print my_var1
			>call my_func(0)
			>end

			-> Its possible to put GDB command in a text file and run it by using "source <file name> "
			Example:
$ cat gdb_adclient_cmds
b 'ActiveDirectoryClientTest::checkConnection()'
define my_command
b main
run
c
end

$gdb my_prog
			(gdb) source gdb_adclient_cmds
Breakpoint 1 at 0x805a8de: file ./test/ActiveDirectoryClientTest.cpp, line 109.

			(gdb) my_command
			-> The file .gdbinit is called in such away automatically every time GDB starts
For example:
define my_start
b main
run
c
end

More complex example:
In .gdbinit:
define ppp_cp1
source cmd.gdb
end

In cmd.gdb
b file.c:525
commands
silent
printf "event="
output event
printf "NPCNextStates="
output NPCNextStates[event][ncpp->ncp_state]
printf "\n"
end
			
Which sets a command for breakpoint on file.c:525 to print event= the event and NPCNextStates the actual value
```

#### 6.1.2.10 My frequently used commands

#### 6.1.2.10.1 Show thread IDs

```text
info threads
```

#### 6.1.2.10.2 Show stacks of a list of threads

```text
thread apply 2-56 bt

select thread
thread 1
```

#### 6.1.2.10.3 retrieve data from memory to file

```text
a. go to relevant frame
Ex: 
fr 22 
(#22 0xb7bbd3ca in XmlManager::loadConfig (this=0x82a9de8, versionID=2, encryptKey=0xb270e3f0 "\030cK202$\006\001210e") at XmlManager.cpp:307)

b. Check source code, what vars or on stack frame?
        m_debugXmlBuffer.swap(inputSource.getDebugBuffer());
        if (!m_debugXmlBuffer.empty())
        {
            pXml = (const char*)&m_debugXmlBuffer.front();
            xmlSize = m_debugXmlBuffer.size(); 
        }

c. get size of buffer
(gdb) print xmlSize
$3 = 3908881

d. dump buffer to file
(gdb) dump memory /tmp/config_xml pXml pXml+xmlSize
```

#### 6.1.2.10.4 Print first parameter of function value

```text
gdb) bt
#0  0xb7f26410 in ?? ()
#1  0xaf8433bc in ?? ()
#2  0x00000006 in ?? ()
#3  0x00001f09 in ?? ()
#4  0x442e9825 in _nl_load_domain () from /lib/tls/libc.so.6
#5  0x442eb289 in __gettext_free_exp () from /lib/tls/libc.so.6
#6  0x4431dcda in _IO_wstr_overflow () from /lib/tls/libc.so.6
#7  0x44323e2d in _IO_file_seekoff_mmap () from /lib/tls/libc.so.6
#8  0x44324c30 in _IO_switch_to_get_mode_internal () from /lib/tls/libc.so.6
#9  0x44326aa1 in _IO_str_pbackfail_internal () from /lib/tls/libc.so.6
#10 0x001a13b7 in operator new () from /usr/share/centrifydc/lib/libstdc++.so.6
#11 0xb78e8b7d in cims::WriteMessage () from
/usr/share/centrifydc/lib/liblrpc.so.0
#12 0xb78e9bdf in cims::Logger::log () from
/usr/share/centrifydc/lib/liblrpc.so.0
#13 0xb7b34c7b in getCredentials () from /usr/share/centrifydc/lib/libeda.so.0
#14 0xb7b485ad in ADAgent::getPlainTextUser ()
   from /usr/share/centrifydc/lib/libeda.so.0
#15 0x0807aba7 in std::_Rb_tree<ThreadPool::PooledThread*,
ThreadPool::PooledThread*, std::_Identity<ThreadPool::PooledThread*>,
std::less<ThreadPool::PooledThread*>, std::allocator<ThreadPool::PooledThread*>
>::_M_erase ()
#16 0x0807eba0 in std::_Rb_tree<ThreadPool::PooledThread*,
ThreadPool::PooledThread*, std::_Identity<ThreadPool::PooledThread*>,
std::less<ThreadPool::PooledThread*>, std::allocator<ThreadPool::PooledThread*>
>::_M_erase ()
#17 0x0808723d in std::_Rb_tree<ThreadPool::PooledThread*,
ThreadPool::PooledThread*, s---Type <return> to continue, or q <return> to quit---q Quit
(gdb) frame 14
#14 0xb7b485ad in ADAgent::getPlainTextUser ()
   from /usr/share/centrifydc/lib/libeda.so.0


(gdb) x/10xw $ebp
0xaf8442e8:     0xaf8445a8      0x0807aba7      0xaf844540      0x081ba780
0xaf8442f8:     0xaf844c40      0xaf844c50      0xaf844c70      0xaf844ba0
0xaf844308:     0x08152120      0x0821d48c
(gdb) x/10xw  0xaf844c40
0xaf844c40:     0x0821d48c      0x00000000      0xaf844c68      0x0814dfbd
0xaf844c50:     0x081f892c      0x00000002      0xaf844c82      0x0814f3d9
0xaf844c60:     0x081ec6b0      0x081efdd0
(gdb) x/s  0x0821d48c
0x821d48c:       "TEST" <=== I THINK THIS IS THE USER
(gdb) x/10xw 0xaf844c50
0xaf844c50:     0x081f892c      0x00000002      0xaf844c82      0x0814f3d9
0xaf844c60:     0x081ec6b0      0x081efdd0      0xaf844c88      0x0814e079
0xaf844c70:     0x08260d80      0x081f22d8
(gdb) x/s 0x081f892c
0x81f892c:      
"\uffff\016\uffff\uffff\uffff\uffff\u0363\uffff\223\034A\uffff\uffff\227\uffff"
(gdb) x/10xb 0x081f892c  <=== AND THIS IS THE PASSWORD
0x81f892c:      0xe5    0x0e    0xe4    0xd1    0xdd    0xe3    0xcd    0xa3
0x81f8934:      0xda    0x93
```

#### 6.1.2.10.5 Attach to running process & set breakpoint

```text
gdb -p PID 
...
(gdb) b Certificate.cpp:2107
Breakpoint 1 at 0x9fb1d9: file Certificate.cpp, line 2107.

hit CTRL-C
(gdb) Quit
(gdb) cont
Continuing.
[Switching to Thread 0xb59c4b90 (LWP 18673)]

Breakpoint 1, Crypto::Certificate::getSANs (this=0x9d2eae0, vec=std::vector of length 0, capacity 0, requestedTypeOfSAN=SAN_TYPE_NONE) at Certificate.cpp:2107
2107    Certificate.cpp: No such file or directory.
        in Certificate.cpp

				6.1.2.10.6

			6.1.2.11
```

### 6.1.3 Smashing the stack

```text
		The call stack stores information about the active sobroutines of a computer program. The active sobroutines are those which have been called but have not yet completed execution by returning. This stack is also known as, "execution stack", "control stack", "function stack" or "run-time stack", and is often abbreviated to just "the stack".
```

#### 6.1.3.1 Functions of the call stack

```text
			-> Storing the return address. To know which function to return to.
			Storing the return address on the stack has two advantages:
				First, Since each task (thread) has its own stack, the subroutine can be reenrant.
				Second, Recursion is automatically supported.

			-> Local data storage
			The local variables can be stored either on the stack, by moving the stack pointer by enough bytes to allow for the needed space, or on the heap (like new in C++, which is much slower).

			-> Parameter passing
			Usually If there are a few small parameters, processor registers are used to pass the values, but if there are more parameters then memory space will be allocated for them.

			-> Pointer to current instance. like C++ this.
			C++ (and other OO languages) store the this pointer along with function arguments in the call stack when invoking methods.

			-> This is how the call stack structure is:

			Stack pointer		Top of stack     
int DrawLine		----------------------->--+--+-----------------+-+-+
(int x1, int y1, int y2)			| Locals of            |   +           
{						| DrawLine             |    +
	int tmp;				|                      |     +
	char myarr[25];				|                      |      +
	...					+----------------------+      ++
	return 0;				| Return address       |       | Stack frame
						|                      |       ++ of 
			Frame pointer		+----------------------+        | DrawLine
			---------------------->	|Parameters of         |      +-+
}						|DrawLine              |   +|-+
						+----------------------++--+|
int DrawSquare					| Locals of            |    |
(int x1, int y1, int y2)			| DrawSquare           |    ++
{						|                      |     ++
	int tmp;				+----------------------+      ++ Stack Frame 
	char myarr[25];				| Return address       |       ++ of
	...					|                      |       -+ DrawSquare
	return 0;				+----------------------+        |
						| Parameters of        |       ++
						| DrawSquare           |      ++
						+----------------------++-----+
}						|                      |
						+----------------------+
						|                      |
						|                      |
						|                      |
						|                      |
						+----------------------+

A call stack is composed of stack frames (AKA activation records). Each stack frames corresponds to a call to a subroutine which has not yet terminated with a return. 

The stack frame at the top of the stack is the currently executing routine, DrawLine that was called by DrawSquare. Usually there are two registers used to control the stack, the stack pointer which points to the top of the stack and the frame pointer which typically points to a fixed point in the frame structure, such as the location for the return address.

Stack frames are not all the same size. Number of parameters are different. Local variables space as well. Some languages support dynamic allocations of memeory on the call stack, which makes the size of the locals on the subroutine frame vary from one activation to another (and of course unknown in compile time). For those languages, access via the framve pointer, rather than via the stack pointer, is usually neccessary since the offsets from the stack top to values such as the return address are not known at compile time.

On many systems a stack frame has a field to contain the previous value of the frame pointer register, the value it had while the caller was executing.  This is useful for accessing previous frames from the currently executing routine's frame.
```

#### 6.1.3.2 Use of the call stack

```text
			-> Call site processing
			Push parameters into the stack and call.
			Usually the call stack manipulation needed at the site of a call to a subroutine is minimal (which is a good thing since there can be many call sites for each subroutin to be called). The values of the actual arguments are evaluated at the call site, since they are specific to the particular call, and either pushed onto the stack or placed into registers, as determined by thje calling convention being used. The actual call instruction, such as "Branch and link" is then typically executed to transfer control to the code of the targer subroutine.

			-> Callee processing
			Subroutine prologue gets parameters, saves room for locals.
			In the called subroutine, the first code executed is usually termed the subroutine prologue, since it does the necessary housekeeping before the code for the statements of the routine is begun.
			The prologue will commonly save the return address left in a register by the call instruction by pushing the value onto the stack. Similarly, the current stack pointer and/or frame pointer values may be pushed. Alternately, some instruction set architectures automatically provide comparable functionality as part of the action of the call instruction itself, and in such adn environment the prologue need not do this
			If frame pointers are being used, the prologue will typically set the new value of the frame pointer register from the stack pointer. Space on the stack for local variables can then be allocated by incrementally changing the stack pointer.

			-> Return processing
			Subroutine epilogue undo processing, pop stack, return to caller
			
			When a subroutine is rerady to return, it executes an epilogue that undoes the steps of the prologue. This will typically restore save register value (such as the frame pointer value) from the stack frame, pop the entire stack frame off the stack by changing the stack pointer value, and finally branch to the instruction at the return address. Under many calling conventions the items popped off the stack by the epilogue include the original argument values, in which case there usually are no further stack manipulations that need to be done by the caller. With some calling conventions, however, it is the caller's responsinblity to remove the arguments from the stack after the return.

			-> Unwinding
			Exception handling

			Some languages, such as C++, provide exception handling, which requires unwinding the stack. The stack frame of a function contains one or more entries specifying exception handlers. When an exception is thrown, the stack is unwound until an exception handler is found that is prepared to handle (catch) the exception. 
```

#### 6.1.3.3 Buffer overflow

#### 6.1.3.3.1 Buffer overflow description

```text
			A buffer overflow is an anomalous condition where a process attempts to store data beyond the boundaries of a fixed length buffer. The result is that the extra data overwrites adjacent memeory locations. The overwritten data may include other buffers, variables and program flow data and may cause a process to crash or produce incorrect results.
```

#### 6.1.3.3.1 Buffer overflow on the stack

```text
int main(void)				Buffer before strcpy...
{                                       +---+--+---+---+---+--+---+--+---+---+
	int B = 3;                      |A  |A |A  |A  |A  |A |A  |A |A  |A  |
	char A[8];                      +   |  |   |   |   |  |   |  |   |   |
                                        |+--+--+---+---+---+--+---+--+---+---+
	printf("%d\n", B);              |0  |0 |0  |0  |0  |0 |0  |0 |0  |3  |
	strcpy(A, "excessive");         +   |  |   |   |   |  |   |  |   |   |      
	printf("%d\n", B);              |+--+--+---+---+---+--+---+--+---+---+      
                                        
					Buffer after strcpy...
	return 0;                       +---+--+---+---+---+--+---+--+---+---+   
}                                       |A  |A |A  |A  |A  |A |A  |A |A  |A  |
                                        +   |  |   |   |   |  |   |  |   |   |
$./program                              |+--+--+---+---+---+--+---+--+---+---+
3                                       |e  |x |c  |e  |s  |s |i  |v |e  |0  |
228                                     +   |  |   |   |   |  |   |  |   |   |
                                        |+--+--+---+---+---+--+---+--+---+---+

In the example the program defines two data items which are adjacent in memeory: an 8 byte long string buffer, A and a two byte integer, B. Initially, A contains nothing but zero bytes, and B contains the number 3.

Now, the program attempts to store the character string "excessive" in the A buffer, followed by a zero byte to mark the end of the string. By not checking the length of the string, it overwrites the value of B.

although the programmer did not intend to change B at all, B's value has now been replaced by a number formed from a part of the character string. In this example, a big-endian system that uses ASCII, 'e' followed by a zero byte would become the number 25856
See, 'e' ASCII value is 101, followd by 0:
>>> int2bin(101)
'000000000000000001100101'
>>> int2bin(25856)
'000000000110010100000000'
---------|-------|-------
    0	   'e'      0

Writing a longer string could well go past the end of the memory space allocated to the program and cause an error such as a segmentation fault.
```

#### 6.1.3.3.2 Stack Buffer overflow description

```text
An example of overflow on the stack:
foo(Z,N)				bar(X,Y)
{					{
	int A;					char A[4];
	int B;					int B;
	klunki(0,0);				strcpy(a, "HAXOR!#@!%");
	...					return;
}					}

	Normal stack (return address points to foo)
	|bar local variables  |bar ret addr  | bar parameters   | 
        +---+--+---+---+---+--+---+--+---+---+---+--+---+---+---+
        |A  |A |A  |A  |B  |B |return address| X |X |Y  |Y  |...|
        +   |  |   |   |   |  |              |   |  |   |   |   |
        |+--+--+---+---+---+--+---+--+---+---++--+--+---+---+---+
        |0  |0 |0  |0  |4  |2 |3  |2 |1  |5  |0  |0 |11 |12 |...|
        +   |  |   |   |   |  |   |  |   |   |   |  |   |   |   |
        |+--+--+---+---+---+--+---+--+---+---++--+--+---+---+---+

        Normal after overflow (return address points to somewhere else)
        |bar local variables  |bar ret addr  | bar parameters   |
        +---+--+---+---+---+--+---+--+---+---+---+--+---+---+---+
        |A  |A |A  |A  |B  |B |return address| X |X |Y  |Y  |...|
        +   |  |   |   |   |  |              |   |  |   |   |   |
        |+--+--+---+---+---+--+---+--+---+---++--+--+---+---+---+
        |H  |A |X  |O  |R  |! |6  |6 |6  |6  |0  |0 |11 |12 |...|
        +   |  |   |   |   |  |   |  |   |   |   |  |   |   |   |
        |+--+--+---+---+---+--+---+--+---+---++--+--+---+---+---+			
	
Besides changing values of unrelated variables, buffer overflows can be exploited by hackers to cause a running program to execute arbitrary supplied code. The technique available to an attacker to seek control over a process depends on the memory region where the buffer resides, for example the stack memory region, where data can be temporarily "pushed" onto the "top" of the stack, and later "popped" to read the value of the variable. Typically, when a function begins executing, temporary data items (local variables) are pushed, which remain accessible only during execution of that function.

In the example, foo() calls bar(), passing it two parameters on the stack, X and Y. bar() has two local variables, B - an integar and A- a buffer. If the function bar() causes a buffer overflow, it could write date that belongs to function foo() or even to the main program.

In the example, the return address has changed. In case this is caused by a mistake the return address will be some random point that will crash the process. However a malicious attacker could change the return address to point to program instructions that he wants to run (like give him root access).
```

#### 6.1.3.3.3 Protection from buffer overflows

```text
				-> Some programming languages have internal bound checking and are fail proof to buffer overflows

				-> Use of strncpy rather than strcpy, etc

				-> Use verified libraries, such as Vstr or Erwin

				-> SSP, Stack-Smaching Protection
					compiler or library extension that adds automatic checks against stack overruns
				gcc ver > 3.3 has SSP by default. To disable it pass -fno-stack-protector
```

#### 6.1.3.4 Volatile stack references

```text
	-> Local variables are stored on the stack
	-> After returning from the function the stack is unwound
	-> Returning a reference (pointer to) information on the stack is a bug
	-> It may be that the information will still be valid until another function is call that overwrites it.
	In any case, its a common cause for a bug.
```

#### 6.1.3.5 Symptoms

```text
		usually buffer overflow results in crash due to override of the stack pointer or the return address. Although at some case only local (stack) variables will be garbaged.
		Crashes will usually be at the point of returning from the offending function

		Volatile stack reference symptom is usually garbaged variables.
```

### 6.1.4 The heap and dynamic allocations

#### 6.1.4.1 Dynamic allocations

```text
		-> Reffers to the allocation of memory storage during runtime
		-> The amount of memory allocated is determined at runtime
		-> A dynamic allocation exists until it is explicitly released, either "manually" by the programmer or by a garbage collector
```

#### 6.1.4.2 The heap

```text
		-> Usually, memory is allocated from a large pool of unused memory area called the heap (since its implemented as heap array)
		-> The allocated memory is accessed via pointers (since its not possible to know the location in advance)
		-> The allocator can expand and contract the heap to fulfill allocation requests
		-> The heap method suffers form a few inherent flaws, stemming from fragmentation
```

#### 6.1.4.3 The glibc allocator

```text
		-> The GNU C library (glibc) uses the ptmalloc allocator which uses both brk (2) and nmap (2)
		-> The brk (2) system call changes the size of the heap to be larger or smaller as needed
		-> The nmap (2) system call is used when extremely large segments are allocated
		-> The data structure used to keep track of allocation is called the "malloc arena"
		Note the (#) means you can use man # <keyword>, example man 2 brk
```

#### 6.1.4.4 The malloc arena

```text
		Something like a linked list of memeory chunks, each chunk is made of:
		Example of allocated chunk: prev size, size, flags, Allocated memeory, ...
		Example of free chunk: prev size, size, flags, prev, next 
```

#### 6.1.4.4.1 allocation failure

```text
			malloc() can fail. When no memeory is available or if the program has exceeded its memeory limit. When failed malloc() returns NULL.

			Trying to use such a NULL pointer will result in program crash.
			memory leaks and system quatas are cheif reason for malloc failures.
```

#### 6.1.4.5 memory leaks

```text
		Each allocation should be at some point freed. If not freed a memory leak will occur.

		Example:
		ptr = realloc(ptr, size)

		When realloc fails it returns a null, it does not free ptr. Now since it returns a null it actually sets ptr to null preventing any possiblity to free it.
```

#### 6.1.4.6 Allocation debugging

```text
		-> Tools, purify, valgrind etc.

		-> Or, tracing malloc:
		mtrace()
		Nees to export MALLOC_TRACE shell variable, export MALLOC_TRACE="output_malloc_traces_log".
		All uses of malloc realloc and free are traced.

		muntrace()
		Close the trace
```

#### 6.1.4.7 Use after free

```text
		After a buffer is freed it can't be used anymore.

		int * ptr = malloc (sizeof(int))
		free ptr;

		...

		*ptr = 0

		Will cause a crash in the allocator (in libc) since such usage garbages to allocator arena.
```

#### 6.1.4.8 Double free

```text
		free first time.
		Allocator gives another code section this memory block.
		free second time.
		The other code section is working with a free memory block.
		result, allocator crash (libc)
```

#### 6.1.4.9 Free unallocated memory

```text
		int local_var = 3;
		free(local_var);
```

#### 6.1.4.10 Heap buffer overflow

```text
		char *p = malloc(2);
		*p = "aaaaaa";

		Will cause a crash.

		Example:
		p = malloc(strnlen(mystr, MAX_LEN));
		strncpy(p, mystr, MAX_LEN);
		In case mystr len < MAX_LEN p will be alloced mystr len.
		Then strncpy will pad with 0 to p 
```

#### 6.1.4.11 Heap consistency check

```text
		-> mcheck()
		-> mprobe()

		Can call those functions from gdb. They will only work on a live process (not core).
		(gdb) call mcheck()
		...
		(gdb) call mprobe(myptr)

		-> Set MALLOC_CHECK_ environment variable.
		auses glibc to do simple checks on malloc()
```

#### 6.1.4.12 Hooks for malloc

```text
		check malloc.h, __malloc__hook
```

#### 6.1.4.13 Summary of possible memory management errors:

```text
		-> Stack buffer overflow.
		Crash on return from pointer

		-> Malloc failure

		-> Memory leaks

		-> Use after free 
		Crash on use

		-> Double free
		Crash on another code segment

		-> Freeing unallocated memory
		Crash that looks to be in libc

		-> Heap buffer overflow
		Crash on write
```

### 6.1.5 Multi-Threading and Concurrency

#### 6.1.5.1 Threads and processes

```text
		Pthreads lib is not included in kernel.

		Each thread has its own:
		-> Thread id (TID), when doing ps -eLF you'll see that under column LWP.
		-> Priority, 
			Linux Kernel scheduler was changed since version 2.6 to a more RT oriented scheduler.
			The old scheduler uses the priority field (nice, 19, -20) and the new one uses the RT priority field
			RT priority:
			0		Nice levels 19 to -20		Non RT processes SCHED_OTHER
			1
			2
			...						RT processes SCHED_FIFO, SCHED_RR
			99

			SCHED_OTHER, all priority 0, fair, good for non mission critical tasks
			SCHED_FIFO, First In First Out, RT priorities 1-99, preemptive
			SCHED_RR,   Round Robin

			Example for a good MT source free project, asterisk (VOIP call switch)
		-> Register values
		-> Stack (Although pointers to data on the stack will be accessible across threads)
		-> Signal mask
		-> errno
		-> Thread specific data

		Threads share:
		-> Code
		-> Off-stack data
		-> File Descriptors
		-> Signal handlers
		-> User and group ID
		-> Current working directory

		Note, fork in MT process will create a new process with clone of the current running thread
```

#### 6.1.5.2 Threads and gdb

```text
		-> thread apply [all | threadnum]
		<command>

		Example:,
		(gdb) thread apply 1 bt

		all threads :
		(gdb) thread apply all bt

		gdb print output to file:
gdb -q -n -ex "thread apply all bt" -batch /opt/pbis/sbin/lwsmd ./core.<internal-host>.lwsmd.30005  > ./stack-core.<internal-host>.lwsmd.30005
```

#### 6.1.5.3 Thread Synchronization Issues

#### 6.1.5.3.1 Race condition

```text
			Issues that are time dependant. 
	
			Example:
			-> Static int num = 0;
			void AddOne(void){
				num++
			}

			The function is compiled to:
			-> Read value of num to register
			-> Increment the temporary register
			-> Set the new value from temporary register to num

	    	    	6.1.5.3.2
```

#### 6.1.5.4 Thread safety

```text
		-> Problems happen mainly in:
		Globals on heap
		Allocating resource with global limits (files etc)
		Indirect access through pointers

		-> A function is considered thread safe it
		It only calls thread safe functions
		and accesses variables on the stack and arguments passed in
```

#### 6.1.5.5 achieving thread safety

```text
		-> Mutual exclusion
		Use locks to synchronize access to shared data

		futex lib defines two primitives: sem_t and pthread_mutex_t
			--> Mutex
			pthread_mutex_init(), creates a mutex
			pthread_mutex_lock(), lock a code segment
			pthread_mutex_unlock(), unlock a code segment

		-> Re-entrancy
		Don't use statci or global variables

		-> Thread-local storage
		Use only variables that are local to each thread
		Two ways to do it, GNU __thread, or POSIX pthread_key_create() and then pthread_setspecific()
```

#### 6.1.5.6 Lock problems

```text
		-> Deadlock,
		try to lock a locked mutex.

		-> Multiple locks
		Thread1		Thread2
		lock 1		lock2
		lock 2		lock1		DEADLOCK!

		Best practice, always maintaind a fixed and consistent order of locking.
```

#### 6.1.5.7 POSIX mutex debugging

```text
		-> Initialize mutex with attribute PTHREAD_MUTEX_ERRORCHECK
		pthread_mutexattr_settype(&attr, PTHREAD_MUTEX_ERRORCHECK);
		Need to add -D_GNU_SOURCE compiler flag

		-> Will report common errors like double lock. The locking functions will be slower
```

#### 6.1.5.8 Signaling between threads

```text
		Use either semaphores or pthread_cond_t condition variables
```

#### 6.1.5.9 compiler optimizations

```text
		Sometimes those optimizations can have an adverse effect on concurrent code.
		Two notable things that optimizing can do:
		-> Put variables into registers
		-> re-order code

		Examples:
		static int flag = 0;

Thread A
do_something();
flag=1;

Thread B
// wait for thread A
while (!flag){
	sleep(1);
}
do_something_else();

		solution, "volatile" modifier. Tell the compiler not to optimize this variable.
		Cons, considerable slow down.

		A better solution, "memory barriers".
		Tells the compiler to make sure that all the stores prior to this point are seen.
		Tells the compiler not to reorder code between the two sides of the barrier.

		To put a barrier, asm volatile ("" : : : "memory");
		Which tells GCC to:
		-> Not move code around across barrier
		-> Flush all register values to memory 
		-> Assume that variable content may have changed after the barrier

		Note, mutexes are the better solution for locking, however they're siginficantly slower since when mutex is locked accessing threads will have to wait (sleep()) which inccurs a time expensive system call.
```

#### 6.1.5.10 CPU optimizations

```text
		Resembling compiler optimizations.
		There are HW memory barriers (different from CPU to CPU).
```

#### 6.1.5.11 Memory management bugs and Concurrency

```text
		Memory management bugs are enhanced by concurrency, race conditions and deadlocks.
```

#### 6.1.5.12 posix threads

#### 6.1.5.12.1 thread affinity

#### 6.1.5.12.1.1 https://eli.thegreenplace.net/2016/c11-threads-affinity-and-hyperthreading/

```text
git: https://github.com/eliben/code-for-blog.git
code: /Users/<user>/work/code/C11/threads/threadsAffinityBlog/code-for-blog/2016/threads-affinity

	    	        6.1.5.12.1.2
	    	    6.1.5.12.2

	    	6.1.5.13
```

### 6.1.6 programmed debug assistance

```text
	-> Good logging practices
	-> preprocessor
	-> Signals
	-> Write stuck dump function
```

#### 6.1.6.1 System log

```text
		/var/log/logfilename

		syslog (3) function to log messages via syslogd(8)
		syslogd supports remote logging, its configuration file is syslog.conf (5)

		-> logger can be used from shell to log:
		logger -p err "this is error severity syslog print"

		-> Use syslog (3) to write messages to system log
#include <syslog.h>

		void openlog(char * ident, int option, int facility)
		void syslog (int priority, const char *format, ...)
		void closelog(void)

		openlog allows to set an "identity" prefix (like application/module name)

		->Syslog typs
		Use correct log level for messages.
		Add prefix per module
		syslog is implemented using a unix domain socket, the most efficient IPC.
```

#### 6.1.6.2 assert

```text
		Use glibc's assert() in debug builds. Defined in <assert.h>

		In production builds disable assert by defining the preprocessor flag NDEBUG
```

#### 6.1.6.3 signals

```text
		signals are asynchronous notifications sent to a process by kernel or another process
		They interrupt the process
		The application may register a signal handler for each signal.

		Example:
		Process A sends a signal to process B (via kill)
		C lib writes that there is a signal pending for B
		When the kernel's scheduler runs B it reads that there is a pending signal for it and so runs the appropriate signal hander for B.

		-> Catching signals the old way
		register a signal handler by calling signal (3), from <signal.h>

		void (*signal(int sig,  void (*func)(int)))(int);

		-> Real Time signals
		Additional 32 signals.
		And a newer API also from <signal.h> sigaction (3)
		Its better than signal (3) since
		a. It is more portable (Sys V)
		b. It has more features

		-> There are two signal handlers by default.
		SIG_IGN, ignore signal
		SIG_DFL, use the system's default handler

		There are two signals which cannot be ignored, SIG_KILL and SIG_STOP
```

#### 6.1.6.4 Print stack dump

```text
		Supported in glibc
#include <execinfo.h>

int backtrace(void **buffer, int size);
char **backtrace_symbols(void **buffer, int size);
```

### 6.1.7 Post Mortem

#### 6.1.7.1 Check the logs

```text
		tail -f /var/log/messages

		if not enough information edit to /etc/syslog.conf and change *.info to *.debug
		and /etc/init.d/syslog restart
		or pkill -1 syslogd
```

#### 6.1.7.2 Core dumps

```text
		-> Some exceptions are defined to terminate the process with a core dump, a record of the process state at the point of crash
		-> Since cors take up lots of space some linux distributions disable them
		-> To enable cors of up to 500 MB (1024 blocks of 512 bytes)
		$ulimit -c 1024
		or unlimited
		$ulimit -c unlimited

		Limits are set in (for PAM)
$ cat /etc/security/limits.conf 

			--> Login process
			Linux has tty1-6 "hard" terminals
			getty is what set ups the login process
			login -> /etc/passwd (defines shell)
			passwd hashes are used for user verfication and stored in /etc/shadow
			shell
```

#### 6.1.7.2.1 Core dump configuration

```text
				-> /proc/sys/kernel/core_pattern
				+ /proc/sys/kernel/core_uses_pid
$ cat /proc/sys/kernel/core_pattern 
core
Can use %e and %p (executable and pid) $echo "core.%e.%p" > /proc/sys/kernel/core_pattern
will produce the following dump files names: core.<exec name>.<pid>
format flags:
%u, uid
%g, gid
%s, signal #
%t, UNIX time of dump
%h, hostname
```

#### 6.1.7.2.2 Using cors files

```text
				-> use file the make sure this is your dump
				$file <core file>

				-> gdb exec core

$ cat /proc/sys/kernel/core_uses_pid 
1

Note, those files are actually variables of the kernel process and this is actually part of a general mechanism to set values to kernel variables

				Usually the default is core.<pid>

	    	6.1.7.3
```

### 6.1.8 Debugging tools

#### 6.1.8.1 strace

```text
		Use it to trace system calls and signals when:
			-> The source code is not available
			-> The application hangs or fails and you wish to quickly get more information
		
		-> Example:
$ strace ls
core.12380
dump
dump.c
Makefile
stam
execve("/bin/ls", ["ls"], [/* 36 vars */]) = 0
uname({sys="Linux", node="<user>-lnx", ...}) = 0
brk(0)                                  = 0x85f4000
access("/etc/ld.so.preload", R_OK)      = -1 ENOENT (No such file or directory)
open("/opt/CiscoACS/runtime/lib/tls/i686/sse2/librt.so.1", O_RDONLY) = -1 ENOENT (No such file or directory)
stat64("/opt/CiscoACS/runtime/lib/tls/i686/sse2", 0xbff02740) = -1 ENOENT (No such file or directory)
open("/opt/CiscoACS/runtime/lib/tls/i686/librt.so.1", O_RDONLY) = -1 ENOENT (No such file or directory)
stat64("/opt/CiscoACS/runtime/lib/tls/i686", 0xbff02740) = -1 ENOENT (No such file or directory)
open("/opt/CiscoACS/runtime/lib/tls/sse2/librt.so.1", O_RDONLY) = -1 ENOENT (No such file or directory)
stat64("/opt/CiscoACS/runtime/lib/tls/sse2", 0xbff02740) = -1 ENOENT (No such file or directory)
open("/opt/CiscoACS/runtime/lib/tls/librt.so.1", O_RDONLY) = -1 ENOENT (No such file or directory)
stat64("/opt/CiscoACS/runtime/lib/tls", 0xbff02740) = -1 ENOENT (No such file or directory)
open("/opt/CiscoACS/runtime/lib/i686/sse2/librt.so.1", O_RDONLY) = -1 ENOENT (No such file or directory)

		-> strace (1) can attach to a running process using -p <pid> flag
		-> you can tell strace to follow forked children with the -f option

		-> You can use strace to analyze performance by using the -c flag. Example:
		strace -c -p <PID>
```

#### 6.1.8.2 ltrace (1)

```text
		Same as strace but allows to trace dynamic library calls
		It can't trace DSOs which were opened by dlopen()
```

#### 6.1.8.3 PTT

```text
		POSIX Threads Trace Toolkit

		-> Building it requires patching gcc and rebuilding it

		-> Provides a very informative graphical trace 
```

#### 6.1.8.4 Dmalloc

```text
		Debug Malloc library

		Dmalloc replace malloc(), free() etc with its own macros when you #include <dmalloc.h>

		-> Designed mainly for C, not C++
		-> Produces a log explaining the problems found
		-> By default it will immediately core dump when it finds heap memory problem.
```

#### 6.1.8.5 Valgrind

```text
		Toolset that emulated CPU instructions and can perform:
		-> Memcheck, can find
			--> memory leaks
			--> Illegal read/write operations
			--> Uses of uninitialized variables
			--> Bad system call parameters
			--> Overlapping blocks in memcpy operations

		-> Cachegrind - Cache profiler for l1, D1 and L2 CPU caches
		-> Helgrind   - multi-threading data race detector
			--> Misuse of POSIX API
			--> deadlocks (potential)
			--> race conditions

		-> Callgrind  - heavyweight profiler
		Usage: $ valgrind --tool=callgrind proc_name

		Note, oprofile is better suited for profiling

		-> Massif     - heap profiler

		By default memcheck will be activated.
	6.1.9

	6.2
```
