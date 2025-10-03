#!/usr/bin/perl 
#===============================================================================
#
#         FILE:  chdir.pl
#
#        USAGE:  ./chdir.pl  
#
#  DESCRIPTION:     1.  [12] Write a program to ask the user for a directory name, then change to that directory. If the user enters a line with nothing but whitespace, change to his or her home directory as a default. After changing, list the ordinary directory contents (not the items whose names begin with a dot) in alphabetical order. (Hint: will that be easier to do with a directory handle or with a glob?) If the directory change doesn't succeed, just alert the userbut don't try to show the contents.
#
#2.  [4] Modify the program to include all files, not just the ones that don't begin with a dot.
#3.  [5] If you used a directory handle for the previous exercise, rewrite it to use a glob. Or if you used a glob, try it now with a directory handle.
#
#      OPTIONS:  ---
# REQUIREMENTS:  ---
#         BUGS:  ---
#        NOTES:  ---
#       AUTHOR:  Yosi Izaq (YI), izaqyos@gmail.com
#      COMPANY:  Cisco systems
#      VERSION:  1.0
#      CREATED:  02/04/09 14:25:04
#     REVISION:  ---
#===============================================================================

use strict;
use warnings;

use 5.010;

print "Please enter target directory.\n"; 
chomp (my $dir = <STDIN> );

$dir = $ENV{"HOME"}  if $dir =~ /^\s*$/  ;

chdir $dir || die "Can not change dir $!";

#my @files =  glob "*";  #assignment 1
#my @files =  glob ".* *";  #assignment 2
#assignment 3:
opendir DR, $dir || die "Can't open dir $dir. $!";
my @files = readdir DR;
closedir DR || die "Can't close dir $dir. $!";

my @files = 
print "Files in ${dir}: @files\n";

#Textbook solution
#
## assignment 1:
#
#Here's one way to do it, with a glob:
#
#print "Which directory? (Default is your home directory) ";
#chomp(my $dir = <STDIN>);
#if ($dir =~ /^\s*$/) {         # A blank line
#  chdir or die "Can't chdir to your home directory: $!";
#} else {
#  chdir $dir or die "Can't chdir to '$dir': $!";
#}
#
#my @files = <*>;
#foreach (@files) {
#  print "$_\n";
#}
#
#
#First, we show a simple prompt and read the desired directory, chomping it as needed. (Without a chomp, we'd be trying to head for a directory that ends in a newlinelegal in Unix, and therefore cannot be presumed to simply be extraneous by the chdir function.)
#
#Then, if the directory name is nonempty, we'll change to that directory, aborting on a failure. If empty, the home directory is selected instead.
#
#Finally, a glob on "star" pulls up all the names in the (new) working directory, automatically sorted in alphabetical order, and they're printed one at a time.
##
### assignment 2:
#
#Here's one way to do it:
#
#print "Which directory? (Default is your home directory) ";
#chomp(my $dir = <STDIN>);
#if ($dir =~ /^\s*$/) {         # A blank line
#  chdir or die "Can't chdir to your home directory:
#$!";
#} else {
#  chdir $dir or die "Can't chdir to '$dir': $!";
#}
#
#my @files = <.* *>;       ## now includes .*
#foreach (sort @files) {   ## now sorts
#  print "$_\n";
#}
#
#
#Two differences from the previous one: first, the glob now includes "dot star", which matches all the names that do begin with a dot. And second, we now must sort the resulting list because some of the names that begin with a dot must be interleaved appropriately, either before or after the list of things, without a beginning dot.
##
#
### assignment 3:
#Here's one way to do it:
#
#print "Which directory? (Default is your home directory) ";
#chomp(my $dir = <STDIN>);
#if ($dir =~ /^\s*$/) {         # A blank line
#  chdir or die "Can't chdir to your home directory:
#$!";
#} else {
#  chdir $dir or die "Can't chdir to '$dir': $!";
#}
#
#opendir DOT, "." or die "Can't opendir dot: $!";
#foreach (sort readdir DOT) {
#  # next if /^\./; ##   if we were skipping dot files
#  print "$_\n";
#}
#
#
#Again, same structure as the previous two programs, but now we've chosen to open a directory handle. Once we've changed the working directory, we want to open the current directory, and we've shown that as the DOT directory handle.
#
#Why DOT? Well, if the user asks for an absolute directory name, like /etc, there's no problem opening it. But if the name is relative, like fred, let's see what would happen. First, we chdir to fred, and then we want to use opendir to open it. But that would open fred in the new directory, not fred in the original directory. The only name we can be sure will mean "the current directory" is ".", which always has that meaning (on Unix and similar systems, at least).
#
#The readdir function pulls up all the names of the directory, which are then sorted and displayed. If we had done the first exercise this way, we would have skipped over the dot files, and that's handled by uncommenting the commented-out line in the foreach loop.
#
#You may find yourself asking, "Why did we chdir first? You can use readdir and friends on any directory, not merely on the current directory." Primarily, we wanted to give users the convenience of being able to get to their home directory with a single keystroke. But this could be the start of a general file-management utility program; maybe the next step would be to ask the users which of the files in this directory should be moved to offline tape storage, say.
