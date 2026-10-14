---
type: reference
title: Simple arithmetics
description: Simple arithmetic in awk using a checkbook balance example.
tags: [awk, tutorial, legacy, examples, unix]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "awk/kb_awk#5.7"
---

# 5.7 Simple arithmetics

[↑ Awk Tutorials](/awk/kb-awk/06-awk-tutorials/README.md)

```text
	An example that presumes you have entered in a file the following information:

    1000
    125	Market         -125.45
    126	Hardware Store  -34.95
    127	Video Store      -7.45
    128	Book Store      -14.32
    129	Gasoline        -16.10
	
The first line contains the beginning balance. Each of the other lines represent information from a single check: the check number, a description of where it was spent, and the amount of the check. The three fields are separated by tabs. Using negative amounts for checks allows positive amounts to represent deposits.

The core task of the script is that it must get the beginning balance and then deduct the amount of each check from that balance. We can provide detail lines for each check to compare against the check register. Finally, we can print the ending balance. Here it is:

# checkbook.awk
BEGIN { FS = "\t" }

#1 Expect the first record to have the starting balance.
NR == 1 { print "Beginning Balance: \t" $1
	balance = $1
	next		# get next record and start over, this makes sure first line isn't processed by #2.
}

#2 Apply to each check record, adding amount from balance.
{	print $1, $2, $3
	print balance += $3   # checks have negative amounts
```
