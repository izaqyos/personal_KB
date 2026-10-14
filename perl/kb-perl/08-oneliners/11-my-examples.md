---
type: cheatsheet
title: My examples
description: Subsection 8.17 of Oneliners.
tags: [kb-perl]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "perl/KB_perl#8.17"
---

# 8.17 My examples

[↑ Oneliners](/perl/kb-perl/08-oneliners/README.md)

### 8.17.1 Block range of IP addresses

```text
# perl -e 'foreach (6..9) { system "echo block <internal-ip>$_" ; system "iptables -A OUTPUT -d <internal-ip>$_ -j DROP"  } '
perl: warning: Setting locale failed.
perl: warning: Please check that your locale settings:
	LANGUAGE = (unset),
	LC_ALL = (unset),
	LC_CTYPE = "UTF-8",
	LANG = "en_US.UTF-8"
    are supported and installed on your system.
perl: warning: Falling back to the standard locale ("C").
block <internal-ip>
block <internal-ip>
block <internal-ip>
block <internal-ip>
# iptables -L OUTPUT -n --line-numbers
Chain OUTPUT (policy ACCEPT)
num  target     prot opt source               destination         
1    DROP       icmp --  0.0.0.0/0            0.0.0.0/0           icmp type 14 
2    ACCEPT     all  --  0.0.0.0/0            0.0.0.0/0           
3    ACCEPT     icmp --  0.0.0.0/0            0.0.0.0/0           
4    DROP       all  --  0.0.0.0/0            <internal-ip>         
5    DROP       all  --  0.0.0.0/0            <internal-ip>         
6    DROP       all  --  0.0.0.0/0            <internal-ip>         
7    DROP       all  --  0.0.0.0/0            <internal-ip>         

			8.17.2 If pattern1 is found and after it pattern2 is found then print pattern2 + n consecutive lines
example when pattern1="Date:" and pattern2="per program memory start" and n=10
#  perl -ne '/Date:/ && print ;   if ( /per program memory start/) {$print =1; $cnt=10;} ; if ( $print && $cnt--) { print $_;} ; if ($cnt == 0 ) { $print =0; } ;' memdetailsreport
perl: warning: Setting locale failed.
perl: warning: Please check that your locale settings:
	LANGUAGE = (unset),
	LC_ALL = (unset),
	LC_CTYPE = "UTF-8",
	LANG = "en_US.UTF-8"
    are supported and installed on your system.
perl: warning: Falling back to the standard locale ("C").
Date: Tue Sep  1 15:22:15 IDT 2015 
*** per program memory start
##################################
Private 	 + 	 Shared 	 = 	 RAM used 	 Program
```
