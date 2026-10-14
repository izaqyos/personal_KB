---
type: cheatsheet
title: Useful Regular Expressions
description: Subsection 8.8 of Oneliners.
tags: [kb-perl]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "perl/KB_perl#8.8"
---

# 8.8 Useful Regular Expressions

[↑ Oneliners](/perl/kb-perl/08-oneliners/README.md)

```text
		In this chapter, we’ll look at various regular expressions and how to use them in some handy one-liners. The regular expressions include matching IP addresses, HTTP headers, and email addresses; matching numbers and number ranges; and extracting and changing matches. I’ll also share some regular expression puzzles and best practices. This chapter will be a bit different from previous ones because I’ll start with a regular expression and then write a one-liner that uses it.
```

### 8.8.1 Match something that looks like an IP address

```text
/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/

This regular expression doesn’t actually guarantee that the thing that matched is, in fact, a valid IP; it simply matches something that looks like an IP address. For example, it matches a valid IP such as 81.198.240.140 as well as an invalid IP such as 936.345.643.21.

Here’s how it works. The ^ at the beginning of the regular expression is an anchor that matches the beginning of the string. Next, \d{1,3} matches one, two, or three consecutive digits. The \. matches a dot. The $ at the end is an anchor that matches the end of the string. (You use both ^ and $ anchors to prevent strings like foo213.3.1.2bar from matching.)

You can simplify this regular expression by grouping the first three repeated \d{1,3}\. expressions:

/^(\d{1,3}\.){3}\d{1,3}$/

Say you have a file with the following content and you want to extract only the lines that look like IP addresses:

|     81.198.240.140
|     1.2.3.4
|     5.5
|     444.444.444.444
|     90.9000.90000.90000
|     127.0.0.1

To extract only the matching lines, you can write this:

perl -ne 'print if /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/'

which should print

| 81.198.240.140
| 1.2.3.4
| 444.444.444.444
| 127.0.0.1

One-liner 8.3 explains how to match an IP precisely, not just something that looks like an IP.   
```

### 8.8.2 Test whether a number is in the range 0 to 255

```text
/^([0-9]|[0-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$/

I like to challenge people with puzzles. One of my favorites is to ask someone to come up with a regular expression that matches a number range. Writing one is actually quite tricky if you’ve never done so before.

Here’s how it works. A number can have one, two, or three digits. If the number has one digit, you allow it to be anything [0-9]. If it has two digits, you also let it be any combination of [0-9][0-9]. But if the number has three digits, it has to be either one hundred–something or two hundred–something. If the number is one hundred–something, 1[0-9][0-9] matches it. If the number is two hundred–something, the number is either 200 to 249 (which is matched by 2[0-4][0-9]) or it’s 250 to 255 (which is matched by 25[0-5]).

Let’s confirm this regular expression really matches all numbers in the range 0 to 255 and write a one-liner to do it:

perl -le '
  map { $n++ if /^([0-9]|[0-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$/ } 0..255;
  END { print $n }
'

This one-liner outputs 256, the total numbers in the range 0 to 255. It iterates over the range 0 to 255 and increments the $n variable for every number that matches. If the output value was less than 256, you’d know that some numbers didn’t match.

Let’s also make sure this one-liner doesn’t match numbers above 255:

perl -le '
  map { $n++ if /^([0-9]|[0-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$/ } 0..1000;
  END { print $n }
'

Although there are 1001 iterations, from 0 to 1000, the final value of $n and the output should still be 256 because numbers greater than 255 should not match. If the value was greater than 256, you’d know that too many numbers matched and the regular expression was incorrect.
```

### 8.8.3 Match an IP address

```text
my $ip_part = qr/[0-9]|[0-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]/;
if ($ip =~ /^$ip_part\.$ip_part\.$ip_part\.$ip_part$/) {
  print "valid ip\n";
}

This regular expression combines the ideas from the previous two regular expressions (8.1 and 8.2) and introduces the qr/.../ operator, which lets you construct a regular expression and save it in a variable. Here, I’m saving the regular expression that matches all numbers in the range 0 to 255 in the $ip_part variable. Next, the $ip_part matches the four parts of the IP address.

You can simplify this by grouping the first three IP parts:

if ($ip =~ /^($ip_part\.){3}$ip_part$/) {
  print "valid ip\n";
}

Let’s run this on the same file from one-liner 8.1. If you have this file as input:

|    81.198.240.140
|    1.2.3.4
|    5.5
|    444.444.444.444
|    90.9000.90000.90000
|    127.0.0.1

and your one-liner is

perl -ne '
  $ip_part = qr{([0-9]|[0-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])};
  print if /^($ip_part\.){3}$ip_part$/
'

then the output is

| 81.198.240.140
| 1.2.3.4
| 127.0.0.1

As you can see, only the valid IP addresses are printed.
```

### 8.8.4 Check whether a string looks like an email address

```text
/\S+@\S+\.\S+/

This regular expression makes sure the string looks like an email address; it doesn’t guarantee the string is an email address, however. First, it matches something that’s not whitespace (\S+) up to the @ symbol; then it matches as much as possible until it finds a dot; then it matches some more.

If the matches succeed, you know the string at least looks like an email address with the @ symbol and a dot in it. For example, cats@catonmat.net matches, but cats@catonmat doesn’t because the regular expression can’t find the dot that’s required in a fully qualified domain name.

Here’s a much more robust way to see whether a string is a valid email address, using the Email::Valid module:

use Email::Valid;
print Email::Valid->address('cats@catonmat.net') ? 'valid email' : 'invalid email';

Here, you use the ternary operator cond ? true : false. If the cond is true, the true part executes; otherwise the false part executes. This prints valid email if the email is valid; if not, it prints invalid email.

So a one-liner would look like this:

perl -MEmail::Valid -ne 'print if Email::Valid->address($_)'

Here, if the email address is valid, you simply print it.
```

### 8.8.5 Check whether a string is a number

```text
Determining whether a string is a number is difficult with a regular expression. This is a derivation of a regular expression that matches decimal numbers.

I start with Perl’s \d regular expression, which matches the digits 0 through 9:

/^\d+$/

This regular expression matches one or more digits \d from the beginning of the string ^ to the end at $. But it doesn’t match numbers such as +3 and -3. Let’s modify the regular expression to match them:

/^[+-]?\d+$/

Here, the [+-]? means “match an optional plus or a minus before the digits.” This regular expression now matches +3 and -3 but not -0.3. Let’s add that:

/^[+-]?\d+\.?\d*$/

I’ve expanded the previous regular expression by adding \.?\d*, which matches an optional dot followed by zero or more numbers. Now we’re in business. This regular expression also matches numbers like -0.3 and 0.3, though it would not match numbers such as 123,456 or .5.

A much better way to match a decimal number is to use the Regexp::Common module. For example, to match a decimal number, you can use $RE{num}{real} from Regexp::Common. Here’s a one-liner that filters the input and prints only the decimal numbers:

perl -MRegexp::Common -ne 'print if /$RE{num}{real}/'

This one-liner also matches and prints numbers such as 123,456 and .5.

How about matching positive hexadecimal numbers? Here’s how:

/^0x[0-9a-f]+$/i

This one-liner matches the hex prefix 0x followed by the hex number itself. The /i flag at the end ensures the match is case insensitive. For example, 0x5af matches, 0X5Fa matches, but 97 doesn’t because 97 has no hex prefix.

Better still, use $RE{num}{hex} because it supports negative numbers, decimal places, and number grouping.

How about matching octals?

/^0[0-7]+$/

Octal numbers are prefixed by 0, which is followed by the octal digits 0-7. For example, 013 matches but 09 doesn’t because it’s not a valid octal number. Using $RE{num}{oct} is better because it supports negative octal numbers, octal numbers with decimal places, and number grouping.

Finally, we come to binary matching:

/^[01]+$/

Binary base consists of only 0s and 1s, so 010101 matches but 210101 doesn’t because 2 is not a valid binary digit.

Regexp::Common also offers a better regular expression for matching binary numbers: $RE{num}{bin}.
```

### 8.8.6 Check whether a word appears in a string twice

```text
/(word).*\1/

This regular expression matches a word followed by something or nothing at all, followed by the same word. Here, (word) captures the word in group 1, and \1 refers to the contents of group 1, which is the same as writing /(word).*word/. For example, silly things are silly matches /(silly).*\1/, but silly things are boring doesn’t because silly is not repeated in the string.
```

### 8.8.7 Increase all integers in a string by one

```text
$str =~ s/(\d+)/$1+1/ge

Here, you use the substitution operator s to match all integers (\d+), put them in capture group 1, and then replace them with their value incremented by one: $1+1. The g flag finds all numbers in the string, and the e flag evaluates $1+1 as a Perl expression. For example, this 1234 is awesome 444 is turned into this 1235 is awesome 445.

Note that this regular expression doesn’t increment floating-point numbers because it uses \d+ to match integers. To increment floating-point numbers, use the $RE{num}{real} regular expression from one-liner 8.5. Here’s a sample one-liner that uses $RE{num}{real}:

perl -MRegexp::Common -pe 's/($RE{num}{real})/$1+1/ge'

If you pass this one-liner the input weird 44.5 line -1.25, it prints weird 45.5 line -0.25.
```

### 8.8.8 Extract the HTTP User-Agent string from HTTP headers

```text
/^User-Agent: (.+)$/

HTTP headers are formatted as Key: Value pairs. You can easily parse such strings by instructing the regular expression engine to save the Value part in the $1 group variable. For example, if the HTTP headers contain the following:

Host: www.catonmat.net
Connection: keep-alive
User-Agent: Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_0_0; en-US)
Accept: application/xml,application/xhtml+xml,text/html
Accept-Encoding: gzip,deflate,sdch
Accept-Language: en-US,en;q=0.8
Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.3

then the regular expression will extract the string Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_0_0; en-US).
```

### 8.8.9 Match printable ASCII characters

```text
/[ -~]/

This regular expression is tricky and smart. To understand it, take a look at man ascii, and you’ll see that space starts at value 0x20 and the ~ character is 0x7e. The expression [ -~] defines a range of characters from the space until ~. Because all characters between the space and ~ are printable, this regular expression matches all printable characters. This is my favorite regular expression of all time because it’s quite puzzling when you first see it. What does it match? A space, a dash, and a tilde? No, it matches a range of characters from the space until the tilde!

To invert the match, place ^ as the first character in the group:

/[^ -~]/

This matches the opposite of [ -~], that is, all nonprintable characters.
```

### 8.8.10 Extract text between two HTML tags

```text
m|<strong>([^<]*)</strong>|

Before I explain this regular expression, let me say that it’s okay to match HTML with regular expressions only for quick hacks when you need to get things done and move on. You should never use regular expressions to match and parse HTML in serious applications because HTML is actually a complicated language, and, in general, it can’t be parsed by a regular expression. Instead, use modules like HTML::TreeBuilder to accomplish the task more cleanly!

This regular expression saves text between the <strong>...</strong> HTML tags in the $1 special variable. The trickiest part of this one-liner is ([^<]*), which matches everything up to the < character. It’s a regular expression idiom.

For example, if the HTML you’re trying to match is <strong>hello</strong>, then this regular expression captures hello in the $1 variable. However, if the HTML you’re trying to match is <strong><em>hello</em> </strong>, then this regular expression doesn’t match at all because there is another HTML tag between <strong> and </strong>.

To extract everything between two HTML tags, including other HTML tags, you can write:

m|<strong>(.*?)</strong>|

This regular expression saves everything between <strong>...</strong> in the $1 variable. For example, if the HTML is <strong><em>hello</em> </strong>, this regular expression sets $1 to <em>hello</em>. The (.*?) part of the regular expression matches everything between the two nearest <strong> and </strong> tags. The question mark ? in this regular expression controls its greediness.

If you want to be a good citizen and use HTML::TreeBuilder, then a Perl program that does the same thing would look like this:

use warnings;
use strict;
use HTML::TreeBuilder;
my $tree = HTML::TreeBuilder->new_from_content(
  "<strong><em>hello</em></strong>"
);
my $strong = $tree->look_down(_tag => 'strong');
if ($strong) {
  print $_->as_HTML for $strong->content_list;
}
$tree->delete;

Here, I created a new HTML::TreeBuilder instance from the given string; then I found the <strong> tag and dumped all the child elements of the <strong> tag as HTML. As you can see, although writing a program like this isn’t suitable as a one-liner, it’s a much more robust solution.
```

### 8.8.11 Replace all <b> tags with <strong>

```text
$html =~ s|<(/)?b>|<$1strong>|g

Here, I assume that the HTML is in the variable $html. The expression <(/)?b> matches the opening and closing <b> tags, captures the optional closing tag slash in the group $1, and then replaces the matched tag with either <strong> or </strong>, depending on whether it finds an opening or closing tag.

Remember that the correct way to do this is to use HTML::TreeBuilder and write a proper program. You should only use this regular expression for a quick hack. Here’s what a program that uses HTML::TreeBuilder looks like:

use warnings;
use strict;
use HTML::TreeBuilder;
my $tree = HTML::TreeBuilder->new_from_content("
  <div><p><b>section 1</b></p><p><b>section 2</b></p></div>
");
my @bs = $tree->look_down(_tag => 'b');
$_->tag('strong') for @bs;
print $tree->as_HTML;
$tree->delete;

Here, I’ve created the HTML::TreeBuilder object from the given string; next, I found all the <b> tags, stored them in the @bs array, and then looped over all @bs and changed their tag name to <strong>.
```

### 8.8.12 Extract all matches from a regular expression

```text
my @matches = $text =~ /regex/g;

Here, the regular expression match is evaluated in the list context, which makes it return all matches. The matches are put in the @matches variable.

For example, the following regular expression extracts all integers from a string:

my $t = "10 hello 25 moo 30 foo";
my @nums = $text =~ /\d+/g;

After executing this code, @nums contains (10, 25, 30). You can also use parentheses to capture only part of the string. For example, here’s how to capture only the values from a line containing lots of key-value pairs (such as key=value), separated by semicolons:

my @vals = $text =~ /[^=]+=([^;]+)/g;

This regular expression first matches the keys through [^=]+, then it matches the = character that separates the keys and values, and then it matches the values ([^;]+). As you can see, the value part of the regular expression is wrapped in parentheses so the values are captured.

Here’s an example. Say you have a file with the following contents:

access=all; users=peter,alastair,bill; languages=awk,sed,perl

and you write this one-liner:

perl -nle 'my @vals = $_ =~ /[^=]+=([^;]+)/g; print "@vals"'

Running it outputs the following:

all peter,alastair,bill awk,sed,perl

These are the values for the access, users, and languages keys!
```
