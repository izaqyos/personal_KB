#!/usr/bin/perl 
#===============================================================================
#
#         FILE:  guess_number_use_given.pl
#
#        USAGE:  ./guess_number_use_given.pl  
#
#  DESCRIPTION:  
#
#      OPTIONS:  ---
# REQUIREMENTS:  ---
#         BUGS:  ---
#        NOTES:  ---
#       AUTHOR:  Yosi Izaq
#      COMPANY:  Cisco
#      VERSION:  1.0
#      CREATED:  01/14/09 15:55:37
#     REVISION:  ---
#===============================================================================

#use strict;
#use warnings;
use 5.010;

# [25] Make a program that will repeatedly ask the user to guess a secret number from 1 to 100 until the user guesses the secret number. Your program should pick the number at random by using the magical formula int(1 + rand 100).[dagger] When the user guesses wrong, the program should respond "Too high" or "Too low." If the user enters the word quit or exit, or if the user enters a blank line, the program should quit. Of course, if the user guesses correctly, the program should quit then as well!

#    [dagger] See what the perlfunc manpage says about int and rand if you're curious about these functions.

# [10] Modify the program from the previous exercise to print extra debugging information as it goes along, such as the secret number it chose. Make your change such that you can turn it off, but your program emits no warnings if you turn it off. If you are using Perl 5.10, use the // operator. Otherwise, use the ternary operator.

# # [15] Rewrite your number guessing program from Exercise 1 in Chapter 10 to use given. How would you handle nonnumeric input? You don't need to use smart matching.
#

my $secret_number = int(1 + rand 100) ;
my $debug = $ENV{DEBUG} // 1; #Use environment variable DEBUG to control debug level and set default to 1 in case its not defined

#If not using 5.010 use trenary operator:
#my $debug = defined $ENV{DEBUG} ? $ENV{DEBUG} : 1 ;

while ( 1 )
{
	printf "Please guess the secret number from 1 to 100. If you're tired of this type quit or exit or a blank line.\n";
	chomp (my $answer = <STDIN>) ;
	print "You chose $answer. secret $secret_number\n" if ($debug) ;
	# can also write in expression modifier form (uniq to pearl)
	# print "You chose $answer. secret $secret_number\n" if ($debug) ;

	given ( $answer )
	{
		when ( /quit|exit|^\s*$/i )		{ say "So you chose to bail out :( "; }
		when ($_ < $secret_number)		{ say "Too small. Try again!"; }
		when ( $secret_number )			{ say "That was it!"; last} 
		default							{ say "Too large. Try again :) ! "; }
	}
}

### Textbook solution
#use 5.010;
#
#my $Verbose = $ENV{VERBOSE} // 1;
#
#my $secret = int(1 + rand 100);
#
#print "Don't tell anyone, but the secret number is $secret.\n"
#    if $Verbose;
#
#LOOP: {
#
#    print "Please enter a guess from 1 to 100: ";
#    chomp(my $guess = <STDIN>);
#
#    my $found_it = 0;
#
#    given( $guess ) {
#        when( ! /^\d+$/ )    { say "Not a number!" }
#        when( $_ > $secret ) { say "Too high!"   }
#        when( $_ < $secret ) { say "Too low!"    }
#        default              { say "Just right!"; $found_it++ }
#        }
#
#    last LOOP if $found_it;
#    redo LOOP;
#
#}
