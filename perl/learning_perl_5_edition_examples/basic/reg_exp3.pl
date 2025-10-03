#!/usr/bin/perl
## Copyright (C) Mon Jan 12 11:38:48 2009 Yosi Izaq, Cisco Systems
use strict;
use 5.010;

#[8] Make a program that prints each line that has a word that is capitalized but not ALL capitalized. Does it match Fred but neither fred nor FRED?

while (<>)
{
	if (/[A-Z]\w*[a-z]\w*/)
	{
		print $_;
	}
}

#Text book answers
#Change the pattern used in the first exercise's answer to /[A-Z][a-z]+/.

#Note that the answer is different from what I had in mind.
# The text book answer verifies First letter is capital and all the rest are small case.
# My pattern verifies first letter is capital and then that there is at least one small case letter. so it allows things like YoSI
