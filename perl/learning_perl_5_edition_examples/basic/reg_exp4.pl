#!/usr/bin/perl
## Copyright (C) Mon Jan 12 11:38:48 2009 Yosi Izaq, Cisco Systems
use strict;
use 5.010;

#[8] Make a program that prints each line that has a two of the same nonwhitespace characters next to each other. It should match lines that contain words such as Mississippi, Bamm-Bamm, or llama.
#

while (<>)
{
	if (/(\w)\1/)
	{
		print $_;
	}
}


#Text book answers#
# Change the pattern used in the first exercise's answer to /(\S)\1/. The \S character class matches the nonwhitespace character, and the parentheses allow you to use the back reference \1 to match the same character immediately following it. 
