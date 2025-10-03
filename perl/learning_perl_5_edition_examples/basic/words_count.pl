#!/usr/bin/perl
## Copyright (C) Mon Jan 12 11:38:48 2009 Yosi Izaq, Cisco Systems
use strict;
use 5.010;

#[15] Write a program that reads a series of words (with one word per line[*]) until end-of-input, then prints a summary of how many times each word was seen. (Hint: remember that when an undefined value is used as if it were a number, Perl automatically converts it to 0. It may help to look back at the earlier exercise that kept a running total.) So, if the input words were fred, barney, fred, dino, wilma, fred (all on separate lines), the output should tell us that fred was seen 3 times. For extra credit, sort the summary words in ASCII order in the output.
#
#    [*] It has to be one word per line because we still haven't shown you how to extract individual words from a line of input.


print "This program will print word count.\n";
print "Please enter a list of words. One word per line ending with a ctrl-D.\n";

my %words;
my $word;
foreach $word (<STDIN>)
{

	chomp $word;

	if (exists $words{$word} )
	{
		$words{$word} += 1; # Consecutive appearances increase count by one
	}
	else
	{
		$words{$word} = 1; #First appearance start count from one
	}
}

foreach (sort keys %words)
{
	printf "word %-16s appears %-10s times.\n", $_, $words{$_} ;
}
