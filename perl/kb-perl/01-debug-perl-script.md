---
type: reference
title: Debug perl script
description: Debugging Perl scripts with the perl -d debugger.
tags: [perl, debugging, tips, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "perl/KB_perl#1"
---

# Debug perl script

[↑ KB_perl](/perl/kb-perl/README.md)

```text
	perl -d <script>
		in debugger press h to get list of commands.

	Here is a summary:
List/search source lines:               Control script execution:
l [ln|sub]  List source code            T           Stack trace
- or .      List previous/current line  s [expr]    Single step [in expr]
v [line]    View around line            n [expr]    Next, steps over subs
f filename  View source in file         <CR/Enter>  Repeat last n or s
/pattern/ ?patt?   Search forw/backw    r           Return from subroutine
M           Show module versions        c [ln|sub]  Continue until position
Debugger controls:                        L           List break/watch/actions
o [...]     Set debugger options        t [expr]    Toggle trace [trace expr]
<[<]|{[{]|>[>] [cmd] Do pre/post-prompt b [ln|event|sub] [cnd] Set breakpoint
! [N|pat]   Redo a previous command     B ln|*      Delete a/all breakpoints
H [-num]    Display last num commands   a [ln] cmd  Do cmd before line
= [a val]   Define/list an alias        A ln|*      Delete a/all actions
h [db_cmd]  Get help on command         w expr      Add a watch expression
h h         Complete help page          W expr|*    Delete a/all watch exprs
|[|]db_cmd  Send output to pager        ![!] syscmd Run cmd in a subprocess
q or ^D     Quit                        R           Attempt a restart
Data Examination:     expr     Execute perl code, also see: s,n,t expr
x|m expr       Evals expr in list context, dumps the result or lists methods.
p expr         Print expression (uses script's current package).
S [[!]pat]     List subroutine names [not] matching pattern
V [Pk [Vars]]  List Variables in Package.  Vars can be ~pattern or !pattern.
X [Vars]       Same as "V current_package [Vars]".  i class inheritance tree.
y [n [Vars]]   List lexicals in higher scope <n>.  Vars same as V.
e     Display thread id     E Display all thread ids.
```
