#!/usr/bin/perl 
#===============================================================================
#
#         FILE:  ln.pl
#
#        USAGE:  ./ln.pl  
#
#  DESCRIPTION:     6.  [7] If your operating system supports it, write a program that works like ln, making a hard link from the first command-line argument to the second. (You don't need to handle options of ln or more arguments.) If your system doesn't have hard links, just print out a message telling what operation you would perform if it were available. (Hint: this program has something in common with the previous onerecognizing that could save you time in coding.)
#[7] If your operating system supports it, fix up the program from the previous exercise to allow an optional -s switch before the other arguments to indicate that you want to make a soft link instead of a hard link. (Even if you don't have hard links, see whether you can at least make soft links with this program.)
#
#
#      OPTIONS:  ---
# REQUIREMENTS:  ---
#         BUGS:  ---
#        NOTES:  ---
#       AUTHOR:  Yosi Izaq (YI), izaqyos@gmail.com
#      COMPANY:  Cisco systems
#      VERSION:  1.0
#      CREATED:  02/08/09 17:11:27
#     REVISION:  ---
#===============================================================================

use strict;
use warnings;

use File::Basename;
use File::Spec;

##First exercise, hard link only
#my($source, $dest) = @ARGV;
#
#if (-d $dest) {
#  my $basename = basename $source;
#  $dest = File::Spec->catfile($dest, $basename);
#	print " destination: $dest \n";
#}
#
#link $source, $dest
#  or die "Can't link '$source' to '$dest': $!\n";

#2nd exercise, allow sym link

my $sym_link = 0;
if (@ARGV[1] eq '-s')
{
	shift @ARGV;
	$sym_link = 1;
}
my($source, $dest) = @ARGV;

if (-d $dest) {
  my $basename = basename $source;
  $dest = File::Spec->catfile($dest, $basename);
	print " destination: $dest \n";
}

if ($sym_link)
{
symlink $source, $dest
  or die "Can't link '$source' to '$dest': $!\n";
}
else
{
link $source, $dest
  or die "Can't link '$source' to '$dest': $!\n";
}
#As the hint in the exercise description said, this program is much like the previous one. The difference is that we'll link rather than rename. If your system doesn't support hard links, you might have written this as the last statement:

print "Would link '$source' to '$dest'.\n";

#Textbook solution
#Here's one way to do it:
#
#use File::Basename;
#use File::Spec;
#
#my $symlink = $ARGV[0] eq '-s';
#shift @ARGV if $symlink;
#
#my($source, $dest) = @ARGV;
#if (-d $dest) {
#  my $basename = basename $source;
#    $dest = File::Spec->catfile($dest, $basename);
#	}
#
#	if ($symlink) {
#	  symlink $source, $dest
#	      or die "Can't make soft link from '$source' to '$dest': $!\n";
#	  } else {
#	    link $source, $dest
#		    or die "Can't make hard link from '$source' to '$dest': $!\n";
#		}
#
#
#		The first few lines of code (after the two use declarations) look at the first command-line argument, and if it's -s, we're making a symbolic link, so we note that as a true value for $symlink. If we see -s, we then need to get rid of it (in the next line). The next few lines are cut-and-pasted from the previous exercise answers. Finally, based on the truth of $symlink, we'll choose either to create a symbolic link or a hard link. We also updated the dying words to make it clear which kind of link we were attempting.
