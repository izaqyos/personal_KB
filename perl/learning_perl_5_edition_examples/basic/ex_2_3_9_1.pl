#!/usr/bin/perl
## Copyright (C) Mon Jan 12 11:38:48 2009 Yosi Izaq, Cisco Systems

print "Write a program that reads a list of strings on separate lines until end-of-input and prints out the list in reverse order. If the input comes from the keyboard, you'll probably need to signal the end of the input by pressing Control-D on Unix, or Control-Z on Windows.\n";

print "please enter input and end with ctrl-D (or ctrl-Z on windows).\n";

print reverse (@lines = <STDIN>);

print "Write a program that reads a list of numbers (on separate lines) until end-of-input and then prints for each number the corresponding person's name from the list shown below. (Hardcode this list of names into your program. That is, it should appear in your program's source code.) For example, if the input numbers were 1, 2, 4, and 2, the output names would be fred, betty, dino, and betty:";

@names = qw (fred betty barney dino wilma pebbles bamm-bamm);

print "please enter list of persons numbers on separate lines and end with ctrl-D (or ctrl-Z on windows).\n";
chomp (@nums = <STDIN>);

foreach (@nums) {
	print @names[$_-1], " ";
}
print "\n";


print " Write a program that reads a list of strings (on separate lines) until end-of-input. Then it should print the strings in ASCIIbetical order. That is, if you enter the strings fred, barney, wilma, betty, the output should show barney betty fred wilma. Are all of the strings on one line in the output or on separate lines? Could you make the output appear in either style?";

print "please enter list of strings on separate lines and end with ctrl-D (or ctrl-Z on windows).\n";
print sort(@strings = <STDIN>);
