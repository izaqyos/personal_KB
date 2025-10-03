#!/usr/bin/perl 
#===============================================================================
#
#         FILE:  invoke_process_example.pl
#
#        USAGE:  ./invoke_process_example.pl  
#
#  DESCRIPTION:  [6] Write a program that changes to some particular (hardcoded) directory, like the system's root directory, then executes the ls -l command to get a long-format directory listing in that directory. (If you use a non-Unix system, use your own system's command to get a detailed directory listing.)
# [10] Modify the previous program to send the output of the command to a file called ls.out in the current directory. The error output should go to a file called ls.err. (You don't need to do anything special about the fact that either of these files may end up being empty.)
#
#      OPTIONS:  ---
# REQUIREMENTS:  ---
#         BUGS:  ---
#        NOTES:  ---
#       AUTHOR:  Yosi Izaq (YI), izaqyos@gmail.com
#      COMPANY:  Cisco systems
#      VERSION:  1.0
#      CREATED:  05/28/09 12:52:41
#     REVISION:  ---
#===============================================================================

use strict;
use warnings;

##First assigmnent:
my $dir = "c:/temp/";
#
#system ("cd $dir; ls -l");

##Textbook solution:
#chdir "/" or die "Can't chdir to root directory: $!";
#exec "ls", "-l" or die "Can't exec ls: $!";
#
#
##The first line changes the current working directory to the root directory, as our particular hardcoded directory. The second line uses the multiple-argument exec function to send the result to standard output. We could have used the single-argument form just as well, but it doesn't hurt to do it this way.

#2nd assigmnent: 
# [10] Modify the previous program to send the output of the command to a file called ls.out in the current directory. The error output should go to a file called ls.err. (You don't need to do anything special about the fact that either of these files may end up being empty.)
#

open STDOUT, ">ls.out";
open STDOUT, ">ls.err";

chdir "$dir" or die "can't change dir to $dir $!";

exec "ls", "-l" or die "can not execute ls -l $!";

###Textbook solution:
#open STDOUT, ">ls.out" or die "Can't write to ls.out: $!";
#open STDERR, ">ls.err" or die "Can't write to ls.err: $!";
#chdir "/" or die "Can't chdir to root directory: $!";
#exec "ls", "-l" or die "Can't exec ls: $!";
#
#
##The first and second lines reopen STDOUT and STDERR to a file in the current directory (before we change directories). Then, after the directory change, the directory listing command executes, sending the data back to the files opened in the original directory.
##
##Where would the message from the last die go? Why, it would go into ls.err, of course, since that's where STDERR is going at that point. The die from chdir would go there, too. But where would the message go if we can't reopen STDERR on the second line? It goes to the old STDERR. If reopening the three standard filehandles—STDIN, STDOUT, and STDERR—fails, the old filehandle is still open.


