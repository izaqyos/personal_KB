---
type: reference
title: Numbers
description: "Perl Cookbook chapter on numbers: validating numeric strings and number checks."
tags: [perl, book-notes, examples, number-theory, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "perl/KB_perl#6.3"
---

# 6.3 Numbers

[↑ cookbook Recipes](/perl/kb-perl/06-cookbook-recipes/README.md)

### 6.3.1 Introduction

```text
Numbers, the most basic data type of almost any programming language, can be surprisingly tricky. Random numbers, numbers with decimal points, series of numbers, and conversion between strings and numbers all pose trouble.

Perl works hard to make life easy for you, and the facilities it provides for manipulating numbers are no exception to that rule. If you treat a scalar value as a number, Perl converts it to one. This means that when you read ages from a file, extract digits from a string, or acquire numbers from any of the other myriad textual sources that Real Life pushes your way, you don’t need to jump through the hoops created by other languages’ cumbersome requirements to turn an ASCII string into a number.

Perl tries its best to interpret a string as a number when you use it as one (such as in a mathematical expression), but it has no direct way of reporting that a string doesn’t represent a valid number. Perl quietly converts non-numeric strings to zero, and it will stop converting the string once it reaches a non-numeric character—so "A7" is still 0, and "7A" is just 7. (Note, however, that the -w flag will warn of such improper conversions.) Sometimes, such as when validating input, you need to know whether a string represents a valid number. We show you how in Recipe 2.1.

Recipe 2.15 shows how to get a number from strings containing hexadecimal, octal, or binary representations of numbers such as "0xff“, "0377“, and "0b10110“. Perl automatically converts numeric literals of these non-decimal bases that occur in your program code (so $a = 3 + 0xff will set $a to 258) but not data read by that program (you can’t read "ff" or even "0xff" into $b and then say $a = 3 + $b to make $a become 258).

As if integers weren’t giving us enough grief, floating-point numbers can cause even more headaches. Internally, a computer represents numbers with decimal points as floating-point numbers in binary format. Floating-point numbers are not the same as real numbers; they are an approximation of real numbers, with limited precision. Although infinitely many real numbers exist, you only have finite space to represent them, usually about 64 bits or so. You have to cut corners to fit them all in.

When numbers are read from a file or appear as literals in your program, they are converted from their textual representation—which is always in base 10 for numbers with decimal points in them—into an internal, base-2 representation. The only fractional numbers that can be exactly represented using a finite number of digits in a particular numeric base are those that can be written as the sum of a finite number of fractions whose denominators are integral powers of that base.

For example, 0.13 is one tenth plus three one-hundredths. But that’s in base-10 notation. In binary, something like 0.75 is exactly representable because it’s the sum of one half plus one quarter, and 2 and 4 are both powers of two. But even so simple a number as one tenth, written as 0.1 in base-10 notation, cannot be rewritten as the sum of some set of halves, quarters, eighths, sixteenths, etc. That means that, just as one third can’t be exactly represented as a non-repeating decimal number, one tenth can’t be exactly represented as a non-repeating binary number. Your computer’s internal binary representation of 0.1 isn’t exactly 0.1; it’s just an approximation!

| $ perl -e 'printf "%.60f\n", 0.1'
| 0.100000000000000005551115123125782702118158340454101562500000

Recipe 2.2 and Recipe 2.3 demonstrate how to make your computer’s floating-point representations behave more like real numbers.

Recipe 2.4 gives three ways to perform one operation on each element of a set of consecutive integers. We show how to convert to and from Roman numerals in Recipe 2.5.

Random numbers are the topic of several recipes. Perl’s rand function returns a floating-point value between 0 and 1, or between 0 and its argument. We show how to get random numbers in a given range, how to make random numbers more random, and how to make rand give a different sequence of random numbers each time you run your program.

We round out the chapter with recipes on trigonometry, logarithms, matrix multiplication, complex numbers, and the often-asked question: “How do you put commas in numbers?”
```

### 6.3.2 Checking Whether a String Is a Valid Number

```text
Problem

You want to check whether a string represents a valid number. This is a common problem when validating input, as in CGI scripts, configuration files, and command-line arguments.
Solution

Compare it against a regular expression that matches the kinds of numbers you’re interested in:

if ($string =~ /PATTERN/) {
    # is a number
} else {
    # is not
}

Or use the patterns provided by the CPAN module Regexp::Common:

if ($string =~ m{^$RE{num}{real}$}) {
    # is a real number
} else {
    # is not
}

Discussion

This problem gets to the heart of what we mean by a number. Even things that sound simple, like integer, make you think hard about what you will accept; for example, “Is a leading + for positive numbers optional, mandatory, or forbidden?” The many ways that floating-point numbers can be represented could overheat your brain.

Decide what you will and will not accept. Then, construct a regular expression to match those things alone. Here are some precooked solutions (the Cookbook’s equivalent of just-add-water meals) for most common cases:

warn "has nondigits"        if     /\D/;
warn "not a natural number" unless /^\d+$/;             # rejects -3
warn "not an integer"       unless /^-?\d+$/;           # rejects +3
warn "not an integer"       unless /^[+-]?\d+$/;
warn "not a decimal number" unless /^-?\d+\.?\d*$/;     # rejects .2
warn "not a decimal number" unless /^-?(?:\d+(?:\.\d*)?|\.\d+)$/;
warn "not a C float"
       unless /^([+-]?)(?=\d|\.\d)\d*(\.\d*)?([Ee]([+-]?\d+))?$/;

These lines do not catch the IEEE notations of “Infinity” and “NaN”, but unless you’re worried that IEEE committee members will stop by your workplace and beat you over the head with copies of the relevant standards documents, you can probably forget about these strange forms.

If your number has leading or trailing whitespace, those patterns won’t work. Either add the appropriate logic directly, or call the trim function from Recipe 1.19.

The CPAN module Regexp::Common provides a wealth of canned patterns that test whether a string looks like a number. Besides saving you from having to figure out the patterns on your own, it also makes your code more legible. By default, this module exports a hash called %RE that you index into, according to which kind of regular expression you’re looking for. Be careful to use anchors as needed; otherwise, it will search for that pattern anywhere in the string. For example:

use Regexp::Common;
$string = "Gandalf departed from the Havens in 3021 TA.";
print "Is an integer\n"           if $string =~ / ^   $RE{num}{int}  $ /x;
print "Contains the integer $1\n" if $string =~ /   ( $RE{num}{int} )  /x;

The following examples are other patterns that the module can use to match numbers:

$RE{num}{int}{-sep=>',?'}              # match 1234567 or 1,234,567
$RE{num}{int}{-sep=>'.'}{-group=>4}    # match 1.2345.6789
$RE{num}{int}{-base => 8}              # match 014 but not 99
$RE{num}{int}{-sep=>','}{-group=3}     # match 1,234,594
$RE{num}{int}{-sep=>',?'}{-group=3}    # match 1,234 or 1234
$RE{num}{real}                         # match 123.456 or -0.123456
$RE{num}{roman}                        # match xvii or MCMXCVIII
$RE{num}{square}                       # match 9 or 256 or 12321

Some of these patterns, such as square, were not available in early module versions. General documentation for the module can be found in the Regexp::Common manpage, but more detailed documentation for just the numeric patterns is in the Regexp::Common::number manpage.

Some techniques for identifying numbers don’t involve regular expressions. Instead, these techniques use functions from system libraries or Perl to determine whether a string contains an acceptable number. Of course, these functions limit you to the definition of “number” offered by your libraries and Perl.

If you’re on a POSIX system, Perl supports the POSIX::strtod function. Its semantics are cumbersome, so the following is a getnum wrapper function for more convenient access. This function takes a string and returns either the number it found or undef for input that isn’t a C float. The is_numeric function is a frontend to getnum for when you just want to ask, “Is this a float?”

sub getnum {
    use POSIX qw(strtod);
    my $str = shift;
    $str =~ s/^\s+//;           # remove leading whitespace
    $str =~ s/\s+$//;           # remove trailing whitespace
    $! = 0;
    my($num, $unparsed) = strtod($str);
    if (($str eq '') || ($unparsed != 0) || $!) {
        return;
    } else {
        return $num;
    } 
} 

sub is_numeric { defined scalar &getnum }

The Scalar::Util module, newly standard as of Perl v5.8.1, exports a function called looks_like_number( ) that uses the Perl compiler’s own internal function of the same name (see perlapi(1)). It returns true for any base-10 number that is acceptable to Perl itself, such as 0, 0.8, 14.98, and 6.02e23—but not 0xb1010, 077, 0x392, or numbers with underscores in them. This means that you must check for alternate bases and decode them yourself if you want to permit users to enter such numbers, as in Example 2-1.
Example 2-1. Decode numbers

    #!/usr/bin/perl -w
    use Scalar::Util qw(looks_like_number);
    print "$0: hit ^D (your eof character) to exit\n";
    for (;;) {
        my ($on, $n);      # original string and its numeric value 
        print "Pick a number, any number: ";
        $on = $n = <STDIN>;
        last if !defined $n;
        chomp($on,$n);
        $n =~ s/_//g;                      # allow 186_282.398_280_685
        $n = oct($n) if $n =~ /^0/;  # allow 0xFF, 037, 0b1010
        if (looks_like_number($n)) {
            printf "Decimal double of $on is %g\n", 2*$n;
        } else {
            print "That doesn't look like a number to Perl.\n";
        }
    }
    print "\nBye.\n";

See Also

The regular expression syntax in perlre(1) and Chapter 5 of Programming Perl; your system’s strtod(3) manpage; the perlapi(1) manpage; the documentation for the CPAN module Regexp::Common, including the Regexp::Common::number manpage; the documentation for the standard POSIX and Scalar::Util modules (also in Chapter 32 of Programming Perl)
```

### 6.3.3 Rounding Floating-Point Numbers

```text
Problem

You want to round a floating-point value to a certain number of decimal places. This problem arises from the same inaccuracies in representation that make testing for equality difficult (see Recipe 2.3), as well as in situations where you must reduce the precision of your answers for readability.
Solution

Use the Perl function sprintf, or printf if you’re just trying to produce output:

# round off to two places
$rounded = sprintf("%.2f", $unrounded);

Or you can use other rounding functions described in the Discussion.
Discussion

Whether visible or not, rounding of some sort is virtually unavoidable when working with floating-point numbers. Carefully defined standards (namely, IEEE 754, the standard for binary floating-point arithmetic) coupled with reasonable defaults within Perl often manage to eliminate or at least hide these round-off errors.

In fact, Perl’s implicit rounding on output is usually good enough so that it rarely surprises. It’s almost always best to leave the numbers unrounded until output, and then, if you don’t like Perl’s default rounding, use printf or sprintf yourself with a format that makes the rounding explicit. The %f, %e, and %g formats all let you specify how many decimal places to round their argument to. Here’s an example showing how all three behave; in each case, we’re asking for a field that’s 12 spaces wide, but with a precision of no more than four digits to the right of the decimal place.

for $n ( 0.0000001, 10.1, 10.00001, 100000.1 ) {
    printf "%12.4e %12.4f %12.4g\n", $n, $n, $n;
}

This produces the following output:

1.0000e-07       0.0000        1e-07
1.0100e+01      10.1000         10.1
1.0000e+01      10.0000           10
1.0000e+05  100000.1000        1e+05

If that were all there were to the matter, rounding would be pretty easy. You’d just pick your favorite output format and be done with it.

However, it’s not that easy: sometimes you need to think more about what you really want and what’s really happening. As we explained in the Introduction, even a simple number like 10.1 or 0.1 can only be approximated in binary floating-point. The only decimal numbers that can be exactly represented as floating-point numbers are those that can be rewritten as a finite sum of one or more fractions whose denominators are all powers of two. For example:

$a = 0.625;                # 1/2 + 1/8
$b = 0.725;                # 725/1000, or 29/40
printf "$_ is %.30g\n", $_ for $a, $b;

prints out:
```
