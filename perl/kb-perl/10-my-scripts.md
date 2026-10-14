---
type: reference
title: My scripts
description: Section 10 of the legacy KB_perl notes.
tags: [kb-perl]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "perl/KB_perl#10"
---

# My scripts

[↑ KB_perl](/perl/kb-perl/README.md)

## 10.1 Check that build process is not stuck

```text
- prepartion:
Simulate build on left hand side of pipe, check elapsed time on right
$ perl -le ' while (1) { ++$i; print "aaa $i"; $| = 1; sleep 2;}' | perl -lne ' if ($t1) {$t0 = $t1} ; $t1 = time(); $nt1 = localtime($t1); print "caught input $_ at $nt1" ; if (defined $t0) {print "time diff from last input ", $t1 - $t0 }'
caught input aaa 1 at Mon Mar 23 18:26:06 2015
caught input aaa 2 at Mon Mar 23 18:26:08 2015
time diff from last input 2
caught input aaa 3 at Mon Mar 23 18:26:10 2015
time diff from last input 2
caught input aaa 4 at Mon Mar 23 18:26:12 2015
time diff from last input 2
caught input aaa 5 at Mon Mar 23 18:26:14 2015
time diff from last input 2
caught input aaa 6 at Mon Mar 23 18:26:16 2015
time diff from last input 2
caught input aaa 7 at Mon Mar 23 18:26:18 2015
time diff from last input 2
caught input aaa 8 at Mon Mar 23 18:26:20 2015
time diff from last input 2
caught input aaa 9 at Mon Mar 23 18:26:22 2015
time diff from last input 2
caught input aaa 10 at Mon Mar 23 18:26:24 2015
time diff from last input 2
caught input aaa 11 at Mon Mar 23 18:26:26 2015
time diff from last input 2

$ perl -le ' while (1) { ++$i; print "aaa $i"; $| = 1; sleep 2;}' | perl -lne ' if ($t1) {$t0 = $t1} ; $t1 = time(); $nt1 = localtime($t1); print "caught input $_ at $nt1" ; if (defined $t0) {print "time diff from last input ", $t1 - $t0 }'
```

## 10.2 tail -f emulate

```text
- from web
#!/usr/bin/perl
open (LOGFILE, "aa") or die "could not open file reason $! \n";

for (;;)
{
        seek(LOGFILE,0,1);  ### clear OF condition        
        for ($curpos = tell(LOGFILE); <LOGFILE>; $curpos = tell(LOGFILE)) 
        {
                print "$_ \n";
        }

        sleep 1;
        seek(LOGFILE,$curpos,0); ### Setting cursor at the EOF
}

- My example , read from pipe


- My example, some changes to read from stdin
r /Users/<user>/Desktop/Work/scripts/perl/cisco/tail-f.pl

#!/usr/bin/perl

#Author. Yosi Izaq
#Desc: monit build, if stuck report

#use strict;


seek(STDIN,0,1);  ### clear OF condition        
for (;;)
{

	print "in main loop\n";
	$t0=time();
    $d= tell(STDIN);
	print "current pos: $d\n";

	#regular loop that simulates tail -f
    for ($c= tell(STDIN); <STDIN>; $c= tell(STDIN)) 
    {
		$t1=time();
		$lt1=localtime($t1);
		$difft= $t1-$t0;

        print "got line $. at $lt1, waited $difft sec, content: $_";
		$t0= $t1;
    }
	print "after read loop\n";
    sleep 1;
    seek(STDIN,$c,0); ### Setting cursor at the EOF
}

-
	10.3
11. regexp syntax

    11.1 common operators
   [bgh.]      One of the characters listed in the character class b,g,h or . in this case.
   [b-h]       The same as [bcdefgh].
   [a-z]       Lower case Latin letters. 
   [bc-]       The characters b, c or - (dash).
   [^bx]       Complementary character class. Anything except b or x.
   \w          Word characters: [a-zA-Z0-9_].
   \d          Digits: [0-9]
   \s          [\f\t\n\r ] form-feed, tab, newline, carriage return and SPACE
   \W          The complementary of \w: [^\w]
   \D          [^\d]
   \S          [^\s]
   [:class:]   POSIX character classes (alpha, alnum...)
   \p{...}     Unicode definitions (IsAlpha, IsLower, IsHebrew, ...)
   \P{...}     Complementary Unicode character classes.

    11.2

12.
```
