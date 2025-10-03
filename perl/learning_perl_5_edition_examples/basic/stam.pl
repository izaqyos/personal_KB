#!/usr/bin/perl 
## Copyright (C) Mon Jan 12 11:38:48 2009 Yosi Izaq, Cisco Systems
Copyright (C) Mon Jan 12 11:36:00 2009 Yosi Izaq, Cisco Systems
Copyright (C) Mon Jan 12 11:35:11 2009 Yosi Izaq, Cisco Systems
Copyright (C) 2009 Yosi Izaq, Cisco Systems
#===============================================================================
#
#         FILE:  modify_file_reg_exp.pl
#
#        USAGE:  ./modify_file_reg_exp.pl
#
#  DESCRIPTION:  
#
#      OPTIONS:  ---
# REQUIREMENTS:  ---
#         BUGS:  ---
#        NOTES:  ---
#       AUTHOR:  Yosi Izaq
#      COMPANY:  Cisco systems
#      VERSION:  1.0
#      CREATED:  01/11/09 17:13:41
#     REVISION:  ---
#===============================================================================

use strict;
use warnings;

# [12] Write a program that makes a modified copy of a text file. In the copy, every string Fred (case-insensitive) should be replaced with Larry. (So, Manfred Mann should become ManLarry Mann.) The input filename should be given on the command line (don't ask the user!), and the output filename should be the corresponding filename ending with .out.

my $bak = ".out";
my $file = shift @ARGV;

open INFILE , "<$file"; 
open OUTFILE , ">${file}${bak}"; 

##12
#while (<INFILE>)
#{
#	s/Fred/Larry/i;
#	print OUTFILE;
#}

# [8] Modify the previous program to change every Fred to Wilma and every Wilma to Fred. Now input like fred&wilma should look like Wilma&Fred in the output.
while (<INFILE>)
{
	chomp;
	s/Fred/\n/gi; #chomp removes \n. now its safe to use it as placeholde for all instances of Fred.
	s/Wilma/Fred/ig; #substitute all Wilma's with Fred
	s/\n/Wilma/g; #substitute all the place holders with Wilma

	print OUTFILE "$_\n"; #add the newline chars
}


#Textbook solution
#12
#my $in = $ARGV[0];
#unless (defined $in) {
#  die "Usage: $0 filename";
#  }
#
#  my $out = $in;
#  $out =~ s/(\.\w+)?$/.out/;
#
#  unless (open IN, "<$in") {
#    die "Can't open '$in': $!";
#	}
#
#	unless (open OUT, ">$out") {
#	  die "Can't write '$out': $!";
#	  }
#
#	  while (<IN>) {
#	    s/Fred/Larry/gi;
#		  print OUT $_;
#		  }

#Note, error checks with unless and die
# can also do open || die 
#Note the g flag for glbal substitution
