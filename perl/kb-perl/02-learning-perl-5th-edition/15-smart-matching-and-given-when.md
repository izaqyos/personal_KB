---
type: reference
title: Smart Matching and given-when
description: "Subsection 2.15 of Learning Perl, 5th Edition."
tags: [kb-perl]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "perl/KB_perl#2.15"
---

# 2.15 Smart Matching and given-when

[↑ Learning Perl, 5th Edition](/perl/kb-perl/02-learning-perl-5th-edition/README.md)

```text
	Wouldn't it be great if computers could just figure out what you wanted and do it? Perl already does its best to use numbers when you want numbers, strings when you want strings, single values where you mean a single value, and lists when you mean lists. With Perl 5.10's smart match operator and given-when control structure, it gets even better.

The smart match operator, ~~, looks at both of its operands and decides on its own how it should compare them. If the operands look like numbers, it does a numeric comparison. If they look like strings, it does a string comparison. If one of the operands is a regular expression, it does a pattern match. It can also do some complex tasks that would otherwise take a lot of code, so it keeps you from doing too much typing.

The ~~ looks almost like the binding operator, =~, which you saw in Chapter 8, but ~~ can do much more. It can even stand in for the binding operator. Up to now, you'd match a pattern by using the binding operator to associate $name with the regular expression operator:

print "I found Fred in the name!\n" if $name =~ /Fred/;


Now, you can change that binding operator to the smart match operator and do exactly the same thing:

use 5.010;

say "I found Fred in the name!" if $name ~~ /Fred/;


The smart match operator sees that it has a scalar on the lefthand side and the regular expression operator on the righthand side, and figures out on its own to do the pattern match. That's not impressive, though. It gets much, much better.

The smart match operator starts to show its power with more complex operations. Suppose you wanted to print a message if one of the keys in the hash %names matches Fred. You can't use exists because it only checks for the exact key. You could do it with a foreach that tests each key with the regular expression operator, skipping those that don't match. When you find one that does match, you can change the value of $flag and skip the rest of the iterations with last:

my $flag = 0;
foreach my $key ( keys %names ) {
    next unless $key =~ /Fred/;
    $flag = $key;
    last;
    }

print "I found a key matching 'Fred'. It was $flag\n" if $flag;


Whew! That was a lot of work just to explain it, but it works in any version of Perl 5. With the smart match operator, you just need the hash on the lefthand side and the regular expression operator on the righthand side:

use 5.010;

say "I found a key matching 'Fred'" if %names ~~ /Fred/;


The smart match operator knows what to do because it sees a hash and a regular expression. With those two operands, the smart match operator knows to look through the keys in %names and apply the regular expression to each one. If it finds one that matches, it already knows to stop and return true. It's not the same sort of match as the scalar and regular expression. It's smart; it does what's right for the situation. It's just that the operator is the same, even though the operation isn't.

If you want to compare two arrays (limiting them to the same size just to make things simpler), you could go through the indices of one of the arrays and compare the corresponding elements in each of the arrays. Each time the corresponding elements are the same, you increment the $equal counter. After the loop, if $equal is the same as the number of elements in @names1, then the arrays must be the same:

my $equal = 0;
foreach my $index ( 0 .. $#names1 ) {
    last unless $names1[$index] eq $names2[$index];
    $equal++;
    }

print "The arrays have the same elements!\n"
    if $equal == @names1;


Again, that's too much work. Wouldn't it be great if there was an easy way to do that? Wait! How about the smart match operator? Just put the arrays on either side of the ~~. This little bit of code does the same things as the last example, but with almost no code:

use 5.010;

say "The arrays have the same elements!"
    if @names1 ~~ @names2;


Okay, one more example. Suppose you call a function and want to check that its return value is one of a set of possible or expected values. Going back to the max() subroutine in Chapter 4, you know that max() should return one of the values you passed it. You could check that by comparing the return value of max to its argument list using the same techniques as the previous hard ways:

my @nums   = qw( 1 2 3 27 42 );
my $result = max( @nums );

my $flag = 0;
foreach my $num ( @nums ) {
    next unless $result == $num;
    $flag = 1;
    last;
    }

print "The result is one of the input values\n" if $flag;


You already know what we are going to say: that's too much work! You can get rid of all of the code in the middle by using ~~. This is much easier than the previous example:

use 5.010;

my @nums   = qw( 1 2 3 27 42 );
my $result = max( @nums );

say "The result [$result] is one of the input values (@nums)"
    if @nums ~~ $result;


You can also write that smart match with the operands in the other order and get the same answer. The smart match operator doesn't care which operands are on which side:

use 5.010;

my @nums   = qw( 1 2 3 27 42 );
my $result = max( @nums );

say "The result [$result] is one of the input values (@nums)"
    if $result ~~ @nums;


The smart match operator is commutative, which you may remember from high school algebra as the fancy way to say that the order of the operands doesn't matter. The smart match operator is just like addition or multiplication; you get the same answer both ways. It doesn't matter what sort of matching it's doing either. These two are the same:

use 5.010;

say "I found a name matching 'Fred'" if $name ~~ /Fred/;
say "I found a name matching 'Fred'" if /Fred/ ~~ $name;
```

### 2.15.2. Smart Match Precedence

```text
Now that you've seen how the smart match operator can save you a lot of work, you just need to know how to tell which sort of match it will do. For that you have to check the table in the perlsyn documentation under "Smart matching in detail." Table 15-1  shows some of the things the smart match operator can do.

Table 15-1. Smart match operations for pairs of operands
Example	Type of match
%a ~~ %b 	Hash keys identical
%a ~~ @b 	At least one key in %a is in @b
%a ~~ /Fred/ 	At least one key matches pattern
%a ~~ 'Fred' 	Hash key existence exists $a{Fred}
 	 
@a ~~ @b 	Arrays are the same
@a ~~ /Fred/ 	At least one element matches pattern
@a ~~ 123 	At least one element is 123, numerically
@a ~~ 'Fred' 	At least one element is 'Fred', stringwise
 	 
$name ~~ undef 	$name is not defined
$name ~~ /Fred/ 	Pattern match
123 ~~ '123.0' 	Numeric equality with "numish" string
'Fred' ~~ 'Fred' 	String equality
123 ~~ 456 	Numeric equality

When you use the smart match operator, Perl goes to the top of the chart and starts looking for a type of match that corresponds to its two operands. It then does the first type of match it finds. The order of the operands doesn't matter. For instance, you have an array and a hash with the smart match:

use 5.010;

if( @array ~~ %hash ) { ... }


Perl first finds the match type for a hash and an array, which checks that at least one of the elements of @array is a key in %hash. That one is easy because there is only one type of match for those two operands. What if you have two scalars?

use 5.010;

if( $fred ~~ $barney ) { ... }


So far you can't tell what sort of match it is going to do because Perl needs to look inside $scalar1 and $scalar2 to see what would happen. Perl can't decide that until it sees the actual data inside the scalars. Is the smart match going to do a numeric or string comparison?

To figure out how Perl will compare $fred and $barney, Perl looks at the values and follows the same rules we just told you. It goes down the precedence chart until it finds a situation that matches, then uses the right comparison for that situation. There's a bit of a trick: Perl can recognize some strings as numbers, which it calls numish strings. Those are strings such as '123', '3.14149', and so on. We've quoted each one, so they are really strings, which are just sequences of characters. However, Perl can convert them to numbers without warnings. If Perl sees numbers or numish strings on both sides of the smart match operator, it does a numeric comparison. Otherwise, it does a string comparison.
```

### 2.15.3 The given Statement

```text
he given-when control structure allows you to run a block of code when the argument to given satisfies a condition. It's Perl's equivalent to C's switch statement, but as with most things Perly, it's a bit more fancy, so it gets a fancier name.

Here's a bit of code that takes the first argument from the command line, $ARGV[0], and goes through the when conditions to see if it can find Fred. Each when block reports a different way that it found Fred, starting with the least restrictive to the most:

use 5.010;

given( $ARGV[0] ) {
    when( /fred/i ) { say 'Name has fred in it' }
    when( /^Fred/ ) { say 'Name starts with Fred' }
    when( 'Fred'  ) { say 'Name is Fred' }
    default         { say "I don't see a Fred" }
    }


The given aliases its argument to $_,[323] and each of the when conditions tries an implicit smart match against $_. You could rewrite the previous example with explicit smart matching to see exactly what's happening:

    [323] In Perl parlance, given is a topicalizer because it makes its argument the topic, the fancy new name for $_ in Perl 6.

use 5.010;

given( $ARGV[0] ) {
    when( $_ ~~ /fred/i ) { say 'Name has fred in it' }
    when( $_ ~~ /^Fred/ ) { say 'Name starts with Fred' }
    when( $_ ~~ 'Fred'  ) { say 'Name is Fred' }
    default               { say "I don't see a Fred" }
    }


If $_ does not satisfy any of the when conditions, Perl executes the default block. Here's the output from several trial runs:

$ perl5.10.0 switch.pl Fred
Name has fred in it
$ perl5.10.0 switch.pl Frederick
Name has fred in it
$ perl5.10.0 switch.pl Barney
I don't see a Fred
$ perl5.10.0 switch.pl Alfred
Name has fred in it


"Big deal," you say, "I could write this example with if-elsif-else." The next example does just that using a $_ declared with my and with all the scoping rules of my, another new feature of Perl 5.10:

use 5.010;

{
my $_ = $ARGV[0]; # lexical $_ as of 5.10!

   if( $_ ~~ /fred/i ) { say 'Name has fred in it' }
elsif( $_ ~~ /^Fred/ ) { say 'Name starts with Fred' }
elsif( $_ ~~ 'Fred'  ) { say 'Name is Fred' }
else                   { say "I don't see a Fred" }
}


If given were just the same thing as if-elsif-else, it wouldn't be that interesting. Unlike an if-elsif-else construct, however, a given-when can satisfy one condition and then try the others too. Once an if-elsif-else satisfies a condition, it will only ever execute one block of code.

Before we go on, let's make a couple more things explicit so that you can see everything that's happening. Unless you say otherwise, there is an implicit break at the end of each when block, and that tells Perl to stop the given-when construct and move on with the rest of the program. The previous example really has breaks in it, although you don't have to type them yourself:

use 5.010;

given( $ARGV[0] ) {
    when( $_ ~~ /fred/i ) { say 'Name has fred in it'; break }
    when( $_ ~~ /^Fred/ ) { say 'Name starts with Fred'; break }
    when( $_ ~~ 'Fred'  ) { say 'Name is Fred'; break }
    default               { say "I don't see a Fred"; break }
    }


This doesn't work very well for the problem, though. Since our example goes from general to specific, if the argument matches /fred/i, Perl doesn't test any of the when conditions. We don't get to check whether the argument is exactly Fred because the first when block stops the entire control structure.

If you use continue at the end of a when instead, Perl tries the succeeding when statements too, repeating the process it started before. That's something that if-elsif-else can't do. When another when satisfies its condition, Perl executes its block (again, implicitly breaking at the end of the block unless you say otherwise). Putting a continue at the end of each when block means Perl will try every condition:

use 5.010;

given( $ARGV[0] ) {
    when( $_ ~~ /fred/i ) { say 'Name has fred in it'; continue }
    when( $_ ~~ /^Fred/ ) { say 'Name starts with Fred'; continue }
    when( $_ ~~ 'Fred'  ) { say 'Name is Fred'; continue } # OOPS!
    default               { say "I don't see a Fred" }
    }


There's a slight problem with that code, though. When we run it, we see that the default block runs too:

$ perl5.10.0 switch.pl Alfred
Name has fred in it
I don't see a Fred


That default block is really a when with a condition that is always true. If the when before the default has a continue, Perl goes on to the default too. It's as if the default were really another when:

use 5.010;

given( $ARGV[0] ) {
    when( $_ ~~ /fred/i ) { say 'Name has fred in it'; continue }
    when( $_ ~~ /^Fred/ ) { say 'Name starts with Fred'; continue }
    when( $_ ~~ 'Fred'  ) { say 'Name is Fred'; continue } # OOPS!
    when( 1 == 1        ) { say "I don't see a Fred" } # default
    }


To get around this, we leave off that last continue, so the last when stops the process:

use 5.010;

given( $ARGV[0] ) {
    when( $_ ~~ /fred/i ) { say 'Name has fred in it'; continue }
    when( $_ ~~ /^Fred/ ) { say 'Name starts with Fred'; continue }
    when( $_ ~~ 'Fred'  ) { say 'Name is Fred'; break } # OK now!
    when( 1 == 1        ) { say "I don't see a Fred" }
    }


Now that we've shown you everything that's going on, we rewrite it in the idiomatic form, which is how you should use it in your programs:

use 5.010;

given( $ARGV[0] ) {
    when( /fred/i ) { say 'Name has fred in it'; continue }
    when( /^Fred/ ) { say 'Name starts with Fred'; continue }
    when( 'Fred'  ) { say 'Name is Fred'; }
    default         { say "I don't see a Fred" }
    }
```

#### 2.15.3.1 Dumb Matching

```text
Although the given-when can use smart matching, you can use the "dumb" comparisons that you already know. It's not really dumb, it's just the regular matching that you already know. When Perl sees an explicit comparison operator (of any type) or the binding operator, it does only what those operators do:

use 5.010;

given( $ARGV[0] ) {
    when( $_ =~ /fred/i ) { say 'Name has fred in it'; continue }
    when( $_ =~ /^Fred/ ) { say 'Name starts with Fred'; continue }
    when( $_ eq 'Fred'  ) { say 'Name is Fred' }
    default               { say "I don't see a Fred" }
    }


You can even mix and match dumb and smart matching; the individual when expressions figure out their comparisons on their own:

use 5.010;

given( $ARGV[0] ) {
    when( /fred/i )       { #smart
        say 'Name has fred in it'; continue }
    when( $_ =~ /^Fred/ ) { #dumb
        say 'Name starts with Fred'; continue }
    when( 'Fred'  )       { #smart
        say 'Name is Fred' }
    default               { say "I don't see a Fred" }
    }


Note that the dumb and smart match for a pattern match are indistinguishable since the regular expression operator already binds to $_ by default.

The smart match operator finds things that are the same (or mostly the same), so it doesn't work with comparisons for greater than or less than. In those cases, you have to use the right comparison operators:

use 5.010;

given( $ARGV[0] ) {
    when( /^-?\d+\.\d+$/ ) { #smart
        say 'Not a number!' }
    when( $_ > 10 )        { #dumb
        say 'Number is greater than 10'  }
    when( $_ < 10 )        { #dumb
        say 'Number is less than 10' }
    default                { say 'Number is 10' }
    }


There are certain situations in which Perl will automatically use dumb matching. You can use the result of a subroutine[*] inside the when, in which case, Perl uses the truth or falseness of the return value:

    [*] Perl doesn't use smart matching for method calls either, but we don't cover object-oriented programming until Intermediate Perl (O'Reilly).

use 5.010;

given( $ARGV[0] ) {
    when( name_has_fred( $_ ) ) { #dumb
        say 'Name has fred in it'; continue }
    }


The subroutine call rule also applies to the Perl built-ins defined, exists, and eof too, since those are designed to return true or false.

Negated expressions, including negated regular expressions, don't use a smart match either. These cases are just like the control structure conditions you saw in previous chapters:

use 5.010;

given( $ARGV[0] ) {
    when( ! $boolean )  { #dumb
        say 'Name has fred in it' }
    when( ! /fred/i   } { #dumb
        say 'Does not match Fred' }
    }
```

### 2.15.4. when with Many Items

```text
Sometimes you'll want to go through many items, but given takes only one thing at a time. In this case, you could wrap given in a foreach loop. If you wanted to go through @names, you could assign the current element to $name, then use that for given:

use 5.010;

foreach my $name ( @names ) {
    given( $name ) {
        ...
        }
    }


Guess what? Yep, that's too much work. (Are you tired of all of this extra work yet?) This time, let's alias the current element of @names just so given can alias it also. Perl should be smarter than that! Don't worry, it is.

To go through many elements, you don't need the given. Let foreach put the current element in $_ on its own. If you want to use smart matching, the current element has to be in $_.

use 5.010;

foreach ( @names ) { # don't use a named variable!
    when( /fred/i ) { say 'Name has fred in it'; continue }
    when( /^Fred/ ) { say 'Name starts with Fred'; continue }
    when( 'Fred'  ) { say 'Name is Fred'; }
    default         { say "I don't see a Fred" }
    }


If you are going to go through several names though, you probably want to see which name you're working on. You can put other statements in the foreach block, such as a say statement:

use 5.010;

foreach ( @names ) { # don't use a named variable!
    say "\nProcessing $_";

    when( /fred/i ) { say 'Name has fred in it'; continue }
    when( /^Fred/ ) { say 'Name starts with Fred'; continue }
    when( 'Fred'  ) { say 'Name is Fred'; }
    default         { say "I don't see a Fred" }
    }


You can even put extra statements between the whens, such as putting a debugging statement right before the default (which you can also do with given):

use 5.010;

foreach ( @names ) { # don't use a named variable!
    say "\nProcessing $_";

    when( /fred/i ) { say 'Name has fred in it'; continue }
    when( /^Fred/ ) { say 'Name starts with Fred'; continue }
    when( 'Fred'  ) { say 'Name is Fred'; }
    say "Moving on to default...";
    default         { say "I don't see a Fred" }
    }
```

### 2.15.5. Exercises

```text
# [15] Rewrite your number guessing program from Exercise 1 in Chapter 10 to use given. How would you handle nonnumeric input? You don't need to use smart matching.
# [15] Write a program using given-when that takes a number as its input, then prints "Fizz" if it is divisible by three, "Bin" if it is divisible by five, and "Sausage" if it is divisible by seven. For a number like 15, it should print "Fizz" and "Bin" since 15 is divisible by both 3 and 5. What's the first number for which your program prints "Fizz Bin Sausage"?
# [15] Using for-when, write a program that goes through a list of files on the command line and reports if each file is readable, writable, or executable. You don't need to use smart matching.
# [20] Using given and smart matching, write a program that reports all the divisors (except 1 and the number itself) of a number you specify on the command line. For instance, for the number 99, your program should report that it is divisible by 3, 9, 11, and 33. If the number is prime (it has no divisors), it should report that the number is prime instead. If the command-line argument is not a number, it should report the error and not try to compute the divisors. Although you could do this with if constructs and with dumb matching, use only smart matching.

To get you started, here's a subroutine to return a list of divisors. It tries all of the numbers up to one-half of $number:

sub divisors {
    my $number = shift;

    my @divisors = ();
    foreach my $divisor ( 2 .. $number/2 ) ) {
        push @divisors, $divisor unless $_ % $divisor;
        }

    return @divisors;
    }


# [20] Modify the program from the previous exercise to also report if the number is odd or even, if the number is prime (you find no divisors other than 1 and the number itself), and if it is divisible by your favorite number. Again, use only smart matching.


Answers in: /cygdrive/c/work/KB/perl/learning_perl_5_edition_examples/basic
guess_number_use_given.pl
simple_given_when_example.pl
for_when_example.pl
$ ./smart_match_find_divisors.pl 91
Checking number 91
number is divisable by: 7 13
```
