#!/usr/bin/perl
## Copyright (C) Mon Jan 12 11:38:48 2009 Yosi Izaq, Cisco Systems
use strict;
use 5.010;

#[6] Make a program that prints each line of its input that contains a period (.), ignoring other lines of input. Try it on the small text file from the previous exercise: does it notice Mr. Slate?
#Second version, match fred or Fred

while (<>)
{
	if (/\./)
	{
		print $_;
	}
}

#Text book answers#
#Change the pattern used in the first exercise's answer to /\./. The backslash is needed because the dot is a metacharacter, or you could use a character class: /[.]/.
