---
type: reference
title: "VisIncr, create columns of increasing numbers, dates, etc."
description: "Subsection 19.14 of PLUGINS, Scripts."
tags: [kb-vi, plugins, scripts, extensions, colorschemes, list, active]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#19.14"
---

# 19.14 VisIncr, create columns of increasing numbers, dates, etc.

[↑ PLUGINS, Scripts](/vi/kb-vi/19-plugins-scripts/README.md)

```text
:he visincr-examples

|	LEFT JUSTIFIED INCREMENTING EXAMPLES
|	:I                              :I 2            *ex-visincr-I*
|	            Use ctrl-V to                   Use ctrl-V to
|	Original    Select, :I          Original    Select, :I 2
|	   8            8                  8            8
|	   8            9                  8            10
|	   8            10                 8            12
|	   8            11                 8            14
|	   8            12                 8            16
|
|	:I -1                           :I -2
|	            Use ctrl-V to                   Use ctrl-V to
|	Original    Select, :I -1       Original    Select, :I -3
|	   8            8                  8            8
|	   8            7                  8            5
|	   8            6                  8            2
|	   8            5                  8            -1
|	   8            4                  8            -4
|
|	RIGHT JUSTIFIED INCREMENTING EXAMPLES
|	:II                             :II 2           *ex-visincr-II*
|	            Use ctrl-V to                   Use ctrl-V to
|	Original    Select, :II         Original    Select, :II 2
|	   8             8                 8             8
|	   8             9                 8            10
|	   8            10                 8            12
|	   8            11                 8            14
|	   8            12                 8            16
|
|	:II -1                          :II -2
|	            Use ctrl-V to                   Use ctrl-V to
|	Original    Select, :II -1      Original    Select, :II -3
|	   8            8                  8             8
|	   8            7                  8             5
|	   8            6                  8             2
|	   8            5                  8            -1
|	   8            4                  8            -4
|
|	DATE INCREMENTING EXAMPLES
|	:IMDY                                   *ex-visincr-IMDY*
|	          Use ctrl-V to                   Use ctrl-V to
|	Original  Select, :IMDY         Original  Select, :IMDY 7
|	06/10/03     6/10/03            06/10/03     6/10/03
|	06/10/03     6/11/03            06/10/03     6/11/03
|	06/10/03     6/12/03            06/10/03     6/12/03
|	06/10/03     6/13/03            06/10/03     6/13/03
|	06/10/03     6/14/03            06/10/03     6/14/03
|
|
|	:IYMD                                   *ex-visincr-IYMD*
|	          Use ctrl-V to                   Use ctrl-V to
|	Original  Select, :IYMD         Original  Select, :IYMD 7
|	03/06/10    03/06/10            03/06/10    03/06/10
|	03/06/10    03/06/11            03/06/10    03/06/17
|	03/06/10    03/06/12            03/06/10    03/06/24
|	03/06/10    03/06/13            03/06/10    03/07/ 1
|	03/06/10    03/06/14            03/06/10    03/07/ 8
|
|
|	:IDMY                                   *ex-visincr-IDMY*
|	          Use ctrl-V to                   Use ctrl-V to
|	Original  Select, :IDMY         Original  Select, :IDMY 7
|	10/06/03    10/06/03            10/06/03    10/06/03
|	10/06/03    11/06/03            10/06/03    17/06/03
|	10/06/03    12/06/03            10/06/03    24/06/03
|	10/06/03    13/06/03            10/06/03     1/07/03
|	10/06/03    14/06/03            10/06/03     8/07/03
|
|
|	ALPHABETIC INCREMENTING EXAMPLES
|	:IA                                     *ex-visincr-IA*
|	          Use ctrl-V to                 Use ctrl-V to
|	Original  Select, :IA         Original  Select, :IA 2
|	   a)          a)                A)           A)
|	   a)          b)                A)           C)
|	   a)          c)                A)           E)
|	   a)          d)                A)           G)
|
|	DAYNAME INCREMENTING EXAMPLES
|	:ID                                     *ex-visincr-ID*
|	          Use ctrl-V to                 Use ctrl-V to
|	Original  Select, :ID         Original  Select, :ID 2
|	  Sun       Sun                 Sun         Sun
|	  Sun       Mon                 Sun         Tue
|	  Sun       Tue                 Sun         Thu
|	  Sun       Wed                 Sun         Sat
|	  Sun       Thu                 Sun         Mon
|
|
|	:ID
|	          Use ctrl-V to                 Use ctrl-V to
|	Original  Select, :ID         Original  Select, :ID 2
|	 Sunday     Sunday             Sunday     Sunday
|	 Sunday     Monday             Sunday     Monday
|	 Sunday     Tuesday            Sunday     Tuesday
|	 Sunday     Wednesday          Sunday     Wednesday
|	 Sunday     Thursday           Sunday     Thursday
|
|	MONTHNAME INCREMENTING EXAMPLES
|	:IM                                     *ex-visincr-IM*
|	          Use ctrl-V to                 Use ctrl-V to
|	Original  Select, :IM         Original  Select, :IM 2
|	  Jan       Jan                 Jan       Jan
|	  Jan       Feb                 Jan       Mar
|	  Jan       Mar                 Jan       May
|	  Jan       Apr                 Jan       Jul
|	  Jan       May                 Jan       Sep
|
|	:IM
|	          Use ctrl-V to                 Use ctrl-V to
|	Original  Select, :IM         Original  Select, :IM 2
|	 January    January            January    January
|	 January    February           January    March
|	 January    March              January    May
|	 January    April              January    July
|	 January    May                January    September
```
