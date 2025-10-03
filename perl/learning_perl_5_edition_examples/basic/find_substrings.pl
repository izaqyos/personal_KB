#!/usr/bin/perl 
#===============================================================================
#
#         FILE:  find_substrings.pl
#
#        USAGE:  ./find_substrings.pl  
#
#  DESCRIPTION:  
## [15] Make a program that looks through a given string for every occurrence of a given substring, printing out the positions where the substring is found. For example, given the input string "This is a test." and the substring "is", it should report positions 2 and 5. If the substring were "a", it should report 8. What does it report if the substring is "t"?
#
#      OPTIONS:  ---
# REQUIREMENTS:  ---
#         BUGS:  ---
#        NOTES:  ---
#       AUTHOR:  Yosi Izaq (YI), izaqyos@gmail.com
#      COMPANY:  Cisco systems
#      VERSION:  1.0
#      CREATED:  05/06/09 19:39:09
#     REVISION:  ---
#===============================================================================

use strict;
use warnings;

sub help
{
	print "run find_substrings string substring\n";
}

@ARGV == 2 || (help() && die "exiting") ;
my $my_string = shift;
my $my_substring = shift;

print "Printing all indexes of $my_substring in $my_string \n";
my $index = 0;
#$index = index($my_string, $my_substring, $index) ;
while ( ($index = index($my_string, $my_substring, $index) ) != -1 )
{
	print "found $my_substring at index $index \n";
	$index++;
}



##Textbook solution:
#print "Please enter a string: ";
#chomp(my $string = <STDIN>);
#print "Please enter a substring: ";
#chomp(my $sub = <STDIN>);
#
#my @places;
#
#for (my $pos = -1; ; ) {                  # tricky use of three-part for loop
#  $pos = index($string, $sub, $pos + 1);  # find next position
#  last if $pos == -1;
#  push @places, $pos;
#}
#
#print "Locations of '$sub' in '$string' were: @places\n";
#
#					  
#
#
#This one starts out simply enough, asking the user for the strings and declaring an array to hold the list of substring positions. But once again, as we see in the for loop, the code seems to have been "optimized for cleverness," which should be done only for fun, never in production code. But this actually shows a valid technique, which could be useful in some cases, so let's see how it works.
#
#The my variable $pos is declared private to the scope of the for loop, and it starts with a value of -1. So as not to keep you in suspense about this variable, we'll tell you right now that it's going to hold a position of the substring in the larger string. The test and increment sections of the for loop are empty, so this is an infinite loop. (Of course, we'll eventually break out of it, in this case with last).
#
#The first statement of the loop body looks for the first occurrence of the substring at or after position $pos + 1. That means that on the first iteration, when $pos is still -1, the search will start at position 0, the start of the string. The location of the substring is stored back into $pos. Now, if that was -1, we're done with the for loop, so last breaks out of the loop in that case. If it wasn't -1, then we save the position into @places and go around the loop again. This time, $pos + 1 means that we'll start looking for the substring just after the previous place where we found it. And so we get the answers we wanted and the world is once again a happy place.
#
#If you didn't want that tricky use of the for loop, you could accomplish the same result as shown here:
#
#{
#  my $pos = -1;
#  while (1) {
#    ... # Same loop body as the for loop used above
#  }
#}
#
#
#The naked block on the outside restricts the scope of $pos. You don't have to do that, but it's often a good idea to declare each variable in the smallest possible scope. This means we have fewer variables "alive" at any given point in the program, making it less likely that we'll accidentally reuse the name $pos for some new purpose. For the same reason, if you don't declare a variable in a small scope, you should generally give it a longer name that's thereby less likely to be reused by accident. Maybe something like $substring_position would be appropriate in this case.
#
#On the other hand, if you were trying to obfuscate your code (shame on you!), you could create a monster like this (shame on us!):
#
#for (my $pos = -1; -1 !=
#  ($pos = index
#    +$string,
#    +$sub,
#    +$pos
#    +1
#  );
#push @places, ((((+$pos))))) {
#    'for ($pos != 1; # ;$pos++) {
#      print "position $pos\n";#;';#' } pop @places;
#}
#
#
#That even trickier code works in place of the original tricky for loop. By now, you should know enough to be able to decipher that one on your own, or to obfuscate code in order to amaze your friends and confound your enemies. Be sure to use these powers only for good, never for evil.
#
#Oh, and what did you get when you searched for t in This is a test.? It's at positions 10 and 13. It's not at position 0; since the capitalization doesn't match, the substring doesn't match.
