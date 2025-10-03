#!/usr/bin/perl 
#===============================================================================
#
#         FILE:  guess_number.pl
#
#        USAGE:  ./guess_number.pl  
#
#  DESCRIPTION:  
#
#      OPTIONS:  ---
# REQUIREMENTS:  ---
#         BUGS:  ---
#        NOTES:  ---
#       AUTHOR:  Dr. Fritz Mehner (mn), mehner@fh-swf.de
#      COMPANY:  FH Südwestfalen, Iserlohn
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

my $secret_number = int(1 + rand 100) ;
my $debug = $ENV{DEBUG} // 1; #Use environment variable DEBUG to control debug level and set default to 1 in case its not defined

#In not using 5.010 use trenary operator:
#my $debug = defined $ENV{DEBUG} ? $ENV{DEBUG} : 1 ;

while ( 1 )
{
	printf "Please guess the secret number from 1 to 100. If you're tired of this type quit or exit or a blank line.\n";
	chomp (my $answer = <STDIN>) ;
	print "You chose $answer. secret $secret_number\n" if ($debug) ;
	# can also write in expression modifier form (uniq to pearl)
	# print "You chose $answer. secret $secret_number\n" if ($debug) ;

	if ( $answer =~ /quit/i or $answer =~ /exit/i or $answer =~ /^\s*$/) 
	{
		printf "So you chose to bail out :( \n";
		last;
	}
	elsif ( $answer < $secret_number )
	{
		printf "Try a larger number\n";
	}
	elsif ( $answer > $secret_number )
	{
		printf "Try a smaller number\n";
	}
	elsif ( $answer == $secret_number)
	{
		printf "Hoorray you found the number :)\n";
		last;
	}
	else 
	{
		printf "Invalid answer!\n";
	}
}

## Textbook solution
#my $secret = int(1 + rand 100);
## This next line may be uncommented during debugging
## print "Don't tell anyone, but the secret number is $secret.\n";
#
#while (1) {
#  print "Please enter a guess from 1 to 100: ";
#  chomp(my $guess = <STDIN>);
#  if ($guess =~ /quit|exit|^\s*$/i) {
#    print "Sorry you gave up. The number was $secret.\n";
#    last;
#  } elsif ($guess < $secret) {
#    print "Too small. Try again!\n";
#  } elsif ($guess == $secret) {
#    print "That was it!\n";
#    last;
#  } else {
#    print "Too large. Try again!\n";
#  }
#}
##The first line picks out our secret number from 1 to 100. Here's how it works. First, rand is Perl's random number function, so rand 100 gives us a random number in the range from 0 up to (but not including) 100. That is, the largest possible value of that expression is something like 99.999.[*] Adding one gives a number from 1 to 100.999, then the int function truncates that, giving a result from 1 to 100, as we needed.
##
##    [*] The actual largest possible value depends upon your system; see http://www.cpan.org/doc/FMTEYEWTK/random if you really need to know.
##
##The commented-out line can be helpful during development and debugging, or if you like to cheat. The main body of this program is the infinite while loop. That will keep asking for guesses until we execute last.
##
##It's important that we test the possible strings before the numbers. If we didn't, do you see what would happen when the user types quit? That would be interpreted as a number (probably giving a warning message, if warnings were turned on), and since the value as a number would be zero, the poor user would get the message that his guess was too small. We might never get to the string tests, in that case.
##
##Another way to make the infinite loop here would be to use a naked block with redo. It's no more or less efficient; it's merely another way to write it. Generally, if you expect to mostly loop, it's good to write while, since that loops by default. If looping will be the exception, a naked block may be a better choice.


