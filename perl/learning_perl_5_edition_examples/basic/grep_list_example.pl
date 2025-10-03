#!/usr/bin/perl 
#===============================================================================
#
#         FILE:  grep_list_example.pl
#
#        USAGE:  ./grep_list_example.pl  
#
#  DESCRIPTION:     a.  [30] Make a program that reads a list of strings from a file, one string per line, and then lets the user interactively enter patterns that may match some of the strings. For each pattern, the program should tell how many strings from the file matched, then which ones those were. Don't reread the file for each new pattern; keep the strings in memory. The filename may be hardcoded in the file. If a pattern is invalid (for example, if it has unmatched parentheses), the program should simply report that error and let the user continue trying patterns. When the user enters a blank line instead of a pattern, the program should quit. (If you need a file full of interesting strings to try matching, try the file sample_text in the files you've surely downloaded by now from the O'Reilly web site; see the Preface.)
#
#
#      OPTIONS:  ---
# REQUIREMENTS:  ---
#         BUGS:  ---
#        NOTES:  ---
#       AUTHOR:  Yosi Izaq (YI), izaqyos@gmail.com
#      COMPANY:  Cisco systems
#      VERSION:  1.0
#      CREATED:  06/21/09 18:32:06
#     REVISION:  ---
#===============================================================================

use strict;
use warnings;



my $filename = 'grep_list_example.pl';
open FILE, $filename
  or die "Can't open '$filename': $!";
chomp(my @strings = <FILE>);
while (1) {
  print "Please enter a pattern: ";
  chomp(my $pattern = <STDIN>);
  last if $pattern =~ /^\s*$/;
  my @matches = eval {
    grep /$pattern/, @strings;
  };
  if ($@) {
    print "Error: $@";
  } else {
    my $count = @matches;
    print "There were $count matching strings:\n",
      map "$_\n", @matches;
  }
  print "\n";
}


#This one uses an eval block to trap any failure that might occur when using the regular expression. Inside that block, a grep pulls the matching strings from the list of strings.
#
#Once the eval is finished, we can report either the error message or the matching strings. Note that we "unchomped" the strings for output by using map to add a newline to each string.
