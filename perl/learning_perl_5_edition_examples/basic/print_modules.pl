#!/usr/bin/perl 
#===============================================================================
#
#         FILE:  print_modules.pl
#
#        USAGE:  ./print_modules.pl  
#
#  DESCRIPTION:  
#
#      OPTIONS:  ---
# REQUIREMENTS:  ---
#         BUGS:  ---
#        NOTES:  ---
#       AUTHOR:  Yosi Izaq (YI), izaqyos@gmail.com
#      COMPANY:  Cisco systems
#      VERSION:  1.0
#      CREATED:  01/20/09 17:13:19
#     REVISION:  ---
#===============================================================================

use strict;
use warnings;
use Module::CoreList;


#[15] Install the Module::CoreList module from CPAN. Print a list of all of the modules that came with Perl 5.008. To build a hash whose keys are the names of the modules that came with a given version of Perl, use this line:

#my %modules = %{ $Module::CoreList::version{5.008} };


my %modules = %{ $Module::CoreList::version{5.008} };
#print "Modules that came with perl 5.008:\n";
#foreach my $key (sort %modules )
#{
#	print "$key\n"; 
#}

#And textbook solution:
print join "\n", keys %modules;
