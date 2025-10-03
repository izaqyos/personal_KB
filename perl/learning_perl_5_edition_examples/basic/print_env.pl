#!/usr/bin/perl
## Copyright (C) Mon Jan 12 11:38:48 2009 Yosi Izaq, Cisco Systems
use strict;
use 5.010;

#This is from chapter 6:
#[15] Write a program to list all of the keys and values in %ENV. Print the results in two columns in ASCIIbetical order. For extra credit, arrange the output to vertically align both columns. The length function can help you figure out how wide to make the first column. Once you get the program running, try setting some new environment variables and ensuring that they show up in your output.

#This is from chapter 10:
# [10] Modify the program from Exercise 3 in Chapter 6 (the environment lister) to print (undefined value) for environment variables without a value. You can set the new environment variables in the program. Ensure that your program reports the right thing for variables with a false value. If you are using Perl 5.10, use the // operator. Otherwise, use the ternary operator.

$ENV{"Yosi"} = undef;

print "Printing the env. variables.\n";
printf "%-24s | %-30s\n","Keys", "Values";

foreach (sort keys %ENV)
{
	printf "%-24s | %-30s\n",$_, $ENV{$_} // "undefined value";
}

# The book solution
#my $longest = 0;
#foreach my $key ( keys %ENV ) {
#    my $key_length = length( $key );
#    $longest = $key_length if $key_length > $longest;
#    }
#
#foreach my $key ( sort keys %ENV ) {
#    printf "%-${longest}s  %s\n", $key, $ENV{$key};
#    }
#
#
#In the first foreach loop, we go through all of the keys and use length to get their length. If the length we just measured is greater than the one we stored in $longest, we put the longer value in $longer.
#
#Once we've gone through all of the keys, we use printf to print the keys and values in two columns. We use the same trick we used in exercise 3 from Chapter 5 by interpolating $longest into the template string.

##Chapter 10 Textbook solution:
#Here's one way to do it, which steals from the answer to exercise 3 in Chapter 6:
#
#At the top of the program, we set some environment variables. The keys ZERO and EMPTY have false but defined values, and the key UNDEFINED has no value.
#
#Later, in the printf argument list, we use the // operator to select the string (undefined) only when $ENV{$key} is not a defined value:
#
#use 5.010;
#
#$ENV{ZERO}      = 0;
#$ENV{EMPTY}     = '';
#$ENV{UNDEFINED} = undef;
#
#my $longest = 0;
#foreach my $key ( keys %ENV )
#    {
#    my $key_length = length( $key );
#    $longest = $key_length if $key_length > $longest;
#    }
#
#foreach my $key ( sort keys %ENV )
#    {
#    printf "%-${longest}s  %s\n", $key, $ENV{$key} // "(undefined)";
#    }
#
#
#By using // here, we don't disturb false values such as those in the keys ZERO and EMPTY.
#
#To do this without Perl 5.10, we use the ternary operator instead:
#
#    printf "%-${longest}s  %s\n", $key,
#        $ENV{$key} ? $ENV{$key} : "(undefined)";
