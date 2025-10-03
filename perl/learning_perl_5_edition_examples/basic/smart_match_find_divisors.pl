#!/usr/bin/perl 
#===============================================================================
#
#         FILE:  smart_match_find_divisors.pl
#
#        USAGE:  ./smart_match_find_divisors.pl  
#
#  DESCRIPTION:  # [20] Using given and smart matching, write a program that reports all the divisors (except 1 and the number itself) of a number you specify on the command line. For instance, for the number 99, your program should report that it is divisible by 3, 9, 11, and 33. If the number is prime (it has no divisors), it should report that the number is prime instead. If the command-line argument is not a number, it should report the error and not try to compute the divisors. Although you could do this with if constructs and with dumb matching, use only smart matching.
#
#      OPTIONS:  ---
# REQUIREMENTS:  ---
#         BUGS:  ---
#        NOTES:  ---
#       AUTHOR:  Yosi Izaq (YI), izaqyos@gmail.com
#      COMPANY:  Cisco systems
#      VERSION:  1.0
#      CREATED:  05/26/09 17:15:32
#     REVISION:  ---
#===============================================================================

use strict;
use warnings;

use 5.010;

sub divisors {
    my $number = shift;

    my @divisors = ();
    foreach my $divisor ( 2 .. $number/2 ) {
        push @divisors, $divisor unless $number % $divisor;
        }

    return @divisors;
}

##My first try. Clumsy and not using given when.
#my $num = $ARGV[0];
#say "Checking number $num";
#
#if ($num ~~ /\d\+/ )
#{
#	say "Please give a number as parameter";
#	return -1;
#}
#
#
#my @divs = divisors( $num );
#my @empty;
#
#if (@divs ~~ @empty ) 
#{
#	say "number is prime";
#}
#
#else
#{
#my $msg = "number is divisable by:";
#
#$msg .= " $_" for (@divs);
#
#say "$msg"; 
#}

##Below is Textbook solution, way more elegant
##use 5.010;
#
#say "Checking the number <$ARGV[0]>";
#
#given( $ARGV[0] ) {
#    when( ! /^\d+$/ ) { say "Not a number!" }
#
#    my @divisors = divisors( $_ );
#
#    my @empty;
#    when( @divisors ~~ @empty ) { say "Number is prime" }
#
#    default { say "$_ is divisible by @divisors" }
#    }
#
#sub divisors {
#    my $number = shift;
#
#    my @divisors = ();
#    foreach my $divisor ( 2 .. $number/2 ) {
#        push @divisors, $divisor unless $number % $divisor;
#        }
#
#    return @divisors;
#    }
#

#We first report which number we're working with. It's always good to let ourselves know that the program is running. We put the $ARGV[0] in angle brackets to set it apart from the rest of the string.
#
#In given, we have a couple when blocks, with some other statements around them. The first when checks that we have a number by trying a regular expression to match only digits. If that regular expression fails, we want to run that block of code to say, "Not a number!" That when has an implicit break that stops the given structure. If we get past that point, we'll call divisors(). We could have done this outside the given, but if we didn't have a number (perhaps we had 'Fred'), Perl would have issued a warning. Our way avoids the warning by using the when as a guard condition.
#
#Once we have the divisors, we want to know if there is anything in the @divisors array. We could just use the array in scalar context to get the number of elements, but we have to use smart matching. We know that if we compare two arrays, they have to have the same elements in the same order. We create an empty array, @empty, that has nothing in it. When we compare that to @divisors, the smart match only succeeds if there were no divisors. If that is true, we'll run the when block, which also has an implicit break.
#
#Finally, if the number is not prime, we run the default block, which reports the list of divisors.
#
#Here's a bit of a bonus that we shouldn't really talk about in Learning Perl because we don't talk about references until Intermediate Perl. We did extra work to check if @divisors is empty by creating an empty named array to compare it to. We could do this with an anonymous array and skip the extra step:
#
#when( @divisors ~~ [] ) { ... }

#My second try and also adding next exercise:
# [20] Modify the program from the previous exercise to also report if the number is odd or even, if the number is prime (you find no divisors other than 1 and the number itself), and if it is divisible by your favorite number. Again, use only smart matching.

my $fav_num = 3;

given ( $ARGV[0] )
{
	when ( ! /^\d+$/ ) {say "Please input a number";}

	my @divs = &divisors ($_);

	when ( @divs ~~ [] ) {say "You chose a prime number"; }

	when ( @divs ~~ 2 )  {say "The number is even ";continue;}

	when ( @divs ~~ $fav_num )  {say "And it is divisable by my favorite number :D"; continue; }

	default { say "The list of divisors is: @divs";}

}

##Textbook solution:
#use 5.010;
#
#say "Checking the number <$ARGV[0]>";
#
#my $favorite = 42;
#
#given( $ARGV[0] ) {
#    when( ! /^\d+$/ ) { say "Not a number!" }
#
#    my @divisors = divisors( $ARGV[0] );
#
#    when( @divisors ~~ 2 ) { # 2 is in @divisors
#        say "$_ is even";
#        continue;
#        }
#
#    when( !( @divisors ~~ 2 ) ) { # 2 isn't in @divisors
#        say "$_ is odd";
#        continue;
#        }
#
#    when( @divisors ~~ $favorite ) {
#        say "$_ is divisible by my favorite number";
#        continue;
#        }
#
#    when( $favorite ) { # $_ ~~ $favorite
#        say "$_ is my favorite number";
#        continue;
#        }
#
#    my @empty;
#    when( @divisors ~~ @empty ) { say "Number is prime" }
#
#    default { say "$_ is divisible by @divisors" }
#    }
#
#sub divisors {
#    my $number = shift;
#
#    my @divisors = ();
#    foreach my $divisor ( 2 .. ($ARGV[0]/2 + 1) ) {
#        push @divisors, $divisor unless $number % $divisor;
#        }
#
#    return @divisors;
#    }
#
#					  
#
#
##This extension of the previous exercise adds more when blocks to handle the additional reporting situations. Once we have @divisors, we use the smart match operator to see what's in it. If 2 is in divisors, then it's an even number. We report that and use an explicit continue so given tries the next when too. For odd numbers, we do the same smart match but negate the result. To see if our favorite number is in @divisors, we do the same thing. We can even check if the number is exactly our favorite number.
