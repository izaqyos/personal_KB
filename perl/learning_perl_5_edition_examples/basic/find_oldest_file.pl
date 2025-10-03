#!/usr/bin/perl 
#===============================================================================
#
#         FILE:  find_oldest_file.pl
#
#        USAGE:  ./find_oldest_file.pl  
#
#  DESCRIPTION:  # [10] Make a program to identify the oldest file named on the command line and report its age in days. What does it do if the list is empty (that is, if no files are mentioned on the command line)?
#
#
#      OPTIONS:  ---
# REQUIREMENTS:  ---
#         BUGS:  ---
#        NOTES:  ---
#       AUTHOR:  Yosi Izaq (YI), izaqyos@gmail.com
#      COMPANY:  Cisco systems
#      VERSION:  1.0
#      CREATED:  02/03/09 10:38:00
#     REVISION:  ---
#===============================================================================

use strict;
use warnings;

use 5.010;

#my %file_age = ();

my $oldest_file_name = $ARGV[0];
my $oldest_file_age = (-M $ARGV[0]);

foreach (@ARGV){

if ( (-M $_) > $oldest_file_age )
{
	$oldest_file_name = $_ ;
	$oldest_file_age = (-M _ ) ;

}

}

print "Oldest file is $oldest_file_name, age $oldest_file_age \n";

#Textbook solution:
#die "No file names supplied!\n" unless @ARGV;
#my $oldest_name = shift @ARGV;
#my $oldest_age = -M $oldest_name;
#
#foreach (@ARGV) {
#  my $age = -M;
#  ($oldest_name, $oldest_age) = ($_, $age)
#    if $age > $oldest_age;
#}
#
#printf "The oldest file was %s, and it was %.1f days old.\n",
#  $oldest_name, $oldest_age;
#
#
##This one starts right out by complaining if it didn't get any filenames on the command line. That's because it's supposed to tell us the oldest filenameand there ain't one if there aren't any files to check.
##
##Once again, we're using the "high-water-mark" algorithm. The first file is certainly the oldest one seen so far. We have to keep track of its age as well, so that's in $oldest_age.
##
##For each of the remaining files, we'll determine the age with the -M file test, just as we did for the first one (except that here, we'll use the default argument of $_ for the file test). The last-modified time is generally what people mean by the "age" of a file, although you could make a case for using a different one. If the age is more than $oldest_age, we'll use a list assignment to update both the name and age. We didn't have to use a list assignment, but it's a convenient way to update several variables at once.
##
##We stored the age from -M into the temporary variable $age. What would have happened if we had simply used -M each time, rather than using a variable? Well, first, unless we used the special _ filehandle, we would have been asking the operating system for the age of the file each time, a potentially slow operation (not that you'd notice unless you have hundreds or thousands of files, and maybe not even then). More importantly, though, we should consider what would happen if someone updated a file while we were checking it. That is, first we see the age of some file, and it's the oldest one seen so far. But before we can get back to use -M a second time, someone modifies the file and resets the timestamp to the current time. Now the age that we save into $oldest_age is actually the youngest age possible. The result would be that we'd get the oldest file among the files tested from that point on, rather than the oldest overall; this would be a tough problem to debug!
##
##Finally, at the end of the program, we use printf to print out the name and age, with the age rounded off to the nearest tenth of a day. Give yourself extra credit if you went to the trouble to convert the age to a number of days, hours, and minutes.
### Below is the textbook solution. More elegant and check for no files input.
#

