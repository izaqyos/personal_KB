---
type: reference
title: perl plugin ( perlsupport)
description: "Vim plugin notes: perl plugin ( perlsupport) (h perlsupport, Usefull shortcuts)"
tags: [perl, vim, vimscript, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#19.5"
---

# 19.5 perl plugin ( perlsupport)

[↑ PLUGINS, Scripts](/vi/kb-vi/19-plugins-scripts/README.md)

### 19.5.1 h perlsupport

### 19.5.2 Usefull shortcuts

```text
			  \cl     Line End Comment
			  \cf     Frame Comment
			  \cu     Function Description
			  \ch     File Header (*.pl)
			  \ce     File Header (*.pm)
			  \ca     File Header (*.t)
			  \cc     code to comment
			  \co     comment to code
			  \cd     Date
			  \ct     Date & Time

			  -- Statements ----------------------------

			  \af     for { }
			  \ao     foreach { }
			  \ai     if { }
			  \ae     if { } else { }
			  \aw     while { }
			  \a{     { }

			  -- Idioms --------------------------------

			  \dm     my $;
			  \dy     my $ = ;
			  \d,     my ( $, $ );
			  \d1     my @;
			  \d2     my @ = (,,);
			  \d3     my %;
			  \d4     my % = (=>,=>,);
			  \d5     my $regex_ = '';
			  \d6     my $regex_ = qr//;
			  \d7     $ =~ m//
			  \d8     $ =~ s///
			  \d9     $ =~ tr///
			  \dp     print "...\n";
			  \df     printf ("...\n");
			  \ds     subroutine
			  \di     open input file
			  \do     open output file
			  \de     open pipe
```
