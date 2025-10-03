#!/usr/bin/perl 
#===============================================================================
#
#         FILE:  file_info.pl
#
#        USAGE:  ./file_info.pl  
#
#  DESCRIPTION:  # [15] Make a program that takes a list of files named on the command line and reports for each one whether it's readable, writable, executable, or doesn't exist. (Hint: it may be helpful to have a function that will do all of the file tests for one file at a time.) What does it report about a file that has been chmod'ed to 0? (That is, if you're on a Unix system, use the command chmod 0 some_file to mark that file as not being readable, writable, nor executable.) In most shells, use a star as the argument to mean all of the normal files in the current directory. That is, you could type something like ./ex12-2 * to ask the program for the attributes of many files at once.
#
#
#      OPTIONS:  ---
# REQUIREMENTS:  ---
#         BUGS:  ---
#        NOTES:  ---
#       AUTHOR:  Yosi Izaq (YI), izaqyos@gmail.com
#      COMPANY:  Cisco systems
#      VERSION:  1.0
#      CREATED:  02/01/09 18:05:20
#     REVISION:  ---
#===============================================================================

use strict;
use warnings;

use 5.010;

sub report_file_info
{
	shift;
	print "File $_ permissions are: ";

	if (-r $_)
	{
		printf "Readable, ";
	}
	else 
	{
		printf "Not Readable, ";
	}

	if (-w _)
	{
		printf "Writable, ";
	}
	else 
	{
		printf "Not Writable, ";
	}


	if (-x _)
	{
		printf "Executable, ";
	}
	else 
	{
		printf "Not Executable, ";
	}


	if (-e _)
	{
		printf "Exists";
	}
	else 
	{
		printf "Does not exist";
	}



	printf "\n";
}

#while (<>)
#{
#&report_file_info($ARGV);
#next;
#}

foreach (@ARGV){
&report_file_info($_);
}

## Here's one way to do it:
#
#foreach my $file (@ARGV) {
#  my $attribs = &attributes($file);
#  print "'$file' $attribs.\n";
#}
#
#sub attributes {
#  # report the attributes of a given file
#  my $file = shift @_;
#  return "does not exist" unless -e $file;
#
#  my @attrib;
#  push @attrib, "readable" if -r $file;
#  push @attrib, "writable" if -w $file;
#  push @attrib, "executable" if -x $file;
#  return "exists" unless @attrib;
#  'is ' . join " and ", @attrib;  # return value
#}
#
#
##In this one, once again it's convenient to use a subroutine. The main loop prints one line of attributes for each file, perhaps telling us that 'cereal-killer' is executable or that 'sasquatch' does not exist.
##
##The subroutine tells us the attributes of the given filename. Of course, if the file doesn't even exist, there's no need for the other tests, so we test for that first. If there's no file, we'll return early.
##
##If the file does exist, we'll build a list of attributes. (Give yourself extra credit points if you used the special _ filehandle instead of $file on these tests, to keep from calling the system separately for each new attribute.) It would be easy to add additional tests like the three we show here. But what happens if none of the attributes is true? Well, if we can't say anything else, at least we can say that the file exists, so we do. The unless clause uses the fact that @attrib will be true (in a Boolean context, which is a special case of a scalar context) if it's got any elements.
##
##But if we've got some attributes, we'll join them with "and" and put "is " in front, to make a description like is readable and writable. This isn't perfect however; if there are three attributes, it says that the file is readable and writable and executable, which has too many ands, but we can get away with it. If you wanted to add more attributes to the ones this program checks for, you should probably fix it to say something like is readable, writable, executable, and nonempty. If that matters to you.
##
##Note that if you somehow didn't put any filenames on the command line, this produces no output. This makes sense; if you ask for information on zero files, you should get zero lines of output. But let's compare that to what the next program does in a similar case, in the discussion below.
