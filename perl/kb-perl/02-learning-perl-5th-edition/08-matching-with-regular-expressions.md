---
type: reference
title: Matching with Regular Expressions
description: "Learning Perl chapter 8: matching with regular expressions, m// and option modifiers."
tags: [perl, regex, book-notes, tutorial, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "perl/KB_perl#2.8"
---

# 2.8 Matching with Regular Expressions

[↑ Learning Perl, 5th Edition](/perl/kb-perl/02-learning-perl-5th-edition/README.md)

### 2.8.1 Matches with m//

```text
We've been writing patterns in pairs of forward slashes, like /fred/. But this is actually a shortcut for the m// (pattern match) operator. As you saw with the qw// operator, you may choose any pair of delimiters to quote the contents. So you could write that same expression as m(fred), m<fred>, m{fred}, or m[fred] using those paired delimiters, or as m,fred,, m!fred!, m^fred^, or many other ways using nonpaired delimiters.[190]

    [190] Nonpaired delimiters are the ones that don't have a different "left" and "right" variety; the same punctuation mark is used for both ends.

The shortcut is that if you choose the forward slash as the delimiter, you may omit the initial m. Since Perl folks love to avoid typing extra characters, you'll see most pattern matches written using slashes, as in /fred/.

Of course, you should wisely choose a delimiter that doesn't appear in your pattern.[191] If you wanted to make a pattern to match the beginning of an ordinary web URL, you might start to write /http:\/\// to match the initial "http://". But that's easier to read, write, maintain, and debug if you use a better choice of delimiter: m%http://%.[192] It's common to use curly braces as the delimiter. If you use a programmer's text editor, it probably has the ability to jump from an opening curly brace to the corresponding closing one, which can be handy in maintaining code.

    [191] If you're using paired delimiters, you shouldn't generally have to worry about using the delimiter inside the pattern, since that delimiter will generally be paired inside your pattern. That is, m(fred(.*)barney) and m{\w{2,}} and m[wilma[\n\t]+betty] are all fine, even though the pattern contains the quoting character, since each "left" has a corresponding "right." But the angle brackets (< and >) aren't regular expression metacharacters, so they may not be paired; if the pattern were m{(\d+)\s*>=?\s*(\d+)}, quoting it with angle brackets would mean having to backslash the greater-than sign so that it wouldn't prematurely end the pattern.

    [192] Remember, the forward slash is not a metacharacter, so you don't need to escape it when it's not the delimiter.
```

### 2.8.2 Option Modifiers

```text
There are several option modifier letters, sometimes called flags, which may be appended as a group right after the ending delimiter of a regular expression to change its behavior from the default.
```

#### 2.8.2.1 Case-Insensitive Matching with /i

```text
To make a case-insensitive pattern match, so you can match FRED as easily as fred or Fred, use the /i modifier:

print "Would you like to play a game? ";
chomp($_ = <STDIN>);
if (/yes/i) {  # case-insensitive match
  print "In that case, I recommend that you go bowling.\n";
}
```

#### 2.8.2.2 Matching Any Character with /s

```text
By default, the dot (.) doesn't match newline, and this makes sense for most "look within a single line" patterns. If you might have newlines in your strings, and you want the dot to be able to match them, the /s modifier will do the job. It changes every dot[*] in the pattern to act like the character class [\d\D] does, which is to match any character, even if it is a newline. Of course, you have to have a string with newlines for this to make a difference:

    [*] If you wish to change just some of them, and not all, you'll probably want to replace just those few with [\d\D].

$_ = "I saw Barney\ndown at the bowling alley\nwith Fred\nlast night.\n";
if (/Barney.*Fred/s) {
  print "That string mentions Fred after Barney!\n";
}


Without the /s modifier, that match would fail, since the two names aren't on the same line.
```

#### 2.8.2.3 Adding Whitespace with /x

```text
The third modifier you'll see allows you to add arbitrary whitespace to a pattern to make it easier to read:

/-?\d+\.?\d*/         # what is this doing?
/ -? \d+ \.? \d* /x   # a little better


Since the /x allows whitespace inside the pattern, a literal space or tab character within the pattern is ignored. You could use a backslashed space or \t (among many other ways) to match these, but it's more common to use \s (or \s* or \s+) when you want to match whitespace anyway.

Remember that in Perl, comments may be included as part of the whitespace. Now we can put comments into that pattern to tell what it's really doing:

/
  -?      # an optional minus sign
  \d+     # one or more digits before the decimal point
  \.?     # an optional decimal point
  \d*     # some optional digits after the decimal point
/x        # end of string


Since the pound sign indicates the start of a comment, use \# or [#] in the rare case that you need to match a pound sign. And be careful not to include the closing delimiter inside the comments, or it will prematurely terminate the pattern.
```

#### 2.8.2.4 Combining Option Modifiers

```text
If you have more than one option modifier to use on the same pattern, they may be used one after the other (their order isn't significant):

if (/barney.*fred/is) {  # both /i and /s
  print "That string mentions Fred after Barney!\n";
}


Or as a more expanded version with comments:

if (m{
  barney # the little guy
  .*     # anything in between
  fred   # the loud guy
}six) {  # all three of /s and /i and /x
  print "That string mentions Fred after Barney!\n";
}


Note the shift to curly braces here for the delimiters as well, allowing programmer-style editors to easily bounce from the beginning to the end of the regular expression.
```

#### 2.8.2.5 Other Options

```text
There are many other option modifiers available. We'll cover those as we get to them, or you can read about them in the perlop manpage and in the descriptions of m// and the other regular expression operators that you'll see later in this chapter.
```

### 2.8.3 Anchors

```text
By default, if a pattern doesn't match at the start of the string, it can "float" on down the string, trying to match somewhere else. But there are a number of anchors that may be used to hold the pattern at a particular point in a string.

The caret[*] anchor (^) marks the beginning of the string, while the dollar sign ($) marks the end.[dagger] So the pattern /^fred/ will match fred only at the start of the string; it wouldn't match manfred mann. And /rock$/ will match rock only at the end of the string; it wouldn't match knute rockne.

    [*] Yes, you've seen the caret used in another way in patterns. As the first character of a character class, it negates the class. But outside of a character class, it's a metacharacter in a different way, being the start-of-string anchor. There are only so many characters, so you have to use some of them twice.

    [dagger] Actually, it matches either the end of the string or at a newline at the end of the string. That's so you can match the end of the string whether it has a trailing newline or not. Most folks don't worry about this distinction much, but once in a long while it's important to remember that /^fred$/ will match either "fred" or "fred\n" with equal ease.

Sometimes you'll want to use both of these anchors to ensure that the pattern matches an entire string. A common example is /^\s*$/, which matches a blank line. But this "blank" line may include some whitespace characters, like tabs and spaces, which are invisible to you and me. Any line that matches that pattern looks just like any other one on paper, so this pattern treats all blank lines as equivalent. Without the anchors, it would match nonblank lines as well.
```

#### 2.8.3.1 Word Anchors

```text
Anchors aren't just at the ends of the string. The word-boundary anchor, \b, matches at either end of a word.[double dagger] So you can use /\bfred\b/ to match the word fred but not frederick or alfred or manfred mann. This is similar to the feature often called something like "match whole words only" in a word processor's search command.

    [double dagger] Some regular expression implementations have one anchor for start-of-word and another for end-of-word, but Perl uses \b for both.
    [Yosi I] VIM uses \< for start word boundary and \> for end word.

Alas, these aren't words as you and I are likely to think of them; they're those \w-type words made up of ordinary letters, digits, and underscores. The \b anchor matches at the start or end of a group of \w characters.


The word-boundary anchor is useful to ensure that we don't accidentally find cat in delicatessen, dog in boondoggle, or fish in selfishness. Sometimes you'll want just one word-boundary anchor, as when using /\bhunt/ to match words like hunt or hunting or hunter, but not shunt, or when using /stone\b/ to match words like sandstone or flintstone but not capstones.

The nonword-boundary anchor is \B; it matches at any point where \b would not match. So the pattern /\bsearch\B/ will match searches, searching, and searched, but not search or researching.
```

### 2.8.4 The Binding Operator, =~

```text
Matching against $_ is merely the default; the binding operator, =~, tells Perl to match the pattern on the right against the string on the left, instead of matching against $_.[dagger] For example:

    [dagger] The binding operator is also used with some other operations besides the pattern match, as you'll see later.

my $some_other = "I dream of betty rubble.";
if ($some_other =~ /\brub/) {
  print "Aye, there's the rub.\n";
}


The first time you see it, the binding operator looks like some kind of assignment operator. But it's no such thing! It is simply saying, "This pattern match, which would attach to $_ by default--make it work with this string on the left instead." If there's no binding operator, the expression is using $_ by default.

In the (somewhat unusual) example that follows, $likes_perl is set to a Boolean value according to what the user typed at the prompt. This is a little on the quick-and-dirty side because the line of input itself is discarded. This code reads the line of input, tests that string against the pattern, then discards the line of input.[*] It doesn't use or change $_ at all.

    [*] Remember, the line of input is not automatically stored into $_ unless the line-input operator (<STDIN>) is all alone in the conditional expression of a while loop.

print "Do you like Perl? ";
my $likes_perl = (<STDIN> =~ /\byes\b/i);
...  # Time passes...
if ($likes_perl) {
  print "You said earlier that you like Perl, so...\n";
  ...
}


Because the binding operator has fairly high precedence, the parentheses around the pattern-test expression aren't required, so the following line does the same thing as the one above--it stores the result of the test (and not the line of input) into the variable:

my $likes_perl = <STDIN> =~ /\byes\b/i;
```

### 2.8.5 Interpolating into Patterns

```text
The regular expression is double-quote interpolated, just as if it were a double-quoted string. This allows us to write a quick grep-like program like this:

#!/usr/bin/perl -w
my $what = "larry";

while (<>) {
  if (/^($what)/) {  # pattern is anchored at beginning of string
    print "We saw $what in beginning of $_";
  }
}


The pattern will be built up out of whatever's in $what when we run the pattern match. In this case, it's the same as if we had written /^(larry)/, looking for larry at the start of each line.

But we didn't have to get the value of $what from a literal string; we could have gotten it instead from the command-line arguments in @ARGV:

my $what = shift @ARGV;


Now, if the first command-line argument were fred|barney, the pattern becomes /^(fred|barney)/, looking for fred or barney at the start of each line.[dagger] The parentheses (which weren't really necessary when searching for larry) are important now because without them we'd be matching fred at the start or barney anywhere in the string.

    [dagger] The astute reader will know that you can't generally type fred|barney as an argument at the command line because the vertical bar is a shell metacharacter. See the documentation to your shell to learn about how to quote command-line arguments.

With that line changed to get the pattern from @ARGV, this program resembles the Unix grep command. But we have to watch out for metacharacters in the string. If $what contains 'fred(barney', the pattern would look like /^(fred(barney)/, and you know that can't work right--it'll crash your program with an invalid regular expression error. With some advanced techniques,[*] you can trap this kind of error (or prevent the magic of the metacharacters in the first place) so that it won't crash your program. But for now, just know that if you give your users the power of regular expressions, they'll also need the responsibility to use them correctly.

    [*] In this case, you would use an eval block to trap the error, or you would quote the interpolated text using quotemeta (or its \Q equivalent form) so that it's no longer treated as a regular expression.
```

### 2.8.6 The Match Variables

```text
So far, when we've put parentheses into patterns, they've been used only for their ability to group parts of a pattern together. But parentheses also trigger the regular expression engine's memory. The memory holds the part of the string matched by the part of the pattern inside parentheses. If there is more than one pair of parentheses, there will be more than one memory. Each regular expression memory holds part of the original string, not part of the pattern.

Since these variables hold strings, they are scalar variables; in Perl, they have names like $1 and $2. There are as many of these variables as there are pairs of memory parentheses in the pattern. As you'd expect, $4 means the string matched by the fourth set of parentheses.[dagger]

    [dagger] This is the same string that the back reference \4 would refer to during the pattern match. But these aren't two different names for the same thing; \4 refers back to the memory during the pattern while it is trying to match, while $4 refers to the memory of an already completed pattern match. For more information on back references, see the perlre manpage.

These match variables are a big part of the power of regular expressions because they let us pull out the parts of a string:

$_ = "Hello there, neighbor";
if (/\s(\w+),/) {             # memorize the word between space and comma
  print "the word was $1\n";  # the word was there
}


Or you could use more than one memory at once:

$_ = "Hello there, neighbor";
if (/(\S+) (\S+), (\S+)/) {
  print "words were $1 $2 $3\n";
}


That tells us that the words were Hello there neighbor. Notice that there's no comma in the output. Because the comma is outside of the memory parentheses in the pattern, there is no comma in memory two. Using this technique, we can choose exactly what we want in the memories, as well as what we want to leave out.

You could even have an empty match variable[*] if that part of the pattern might be empty. That is, a match variable may contain the empty string:

    [*] As opposed to an undefined one. If you have three or fewer sets of parentheses in the pattern, $4 will be undef.

my $dino = "I fear that I'll be extinct after 1000 years.";
if ($dino =~ /(\d*) years/) {
  print "That said '$1' years.\n";  # 1000
}

$dino = "I fear that I'll be extinct after a few million years.";
if ($dino =~ /(\d*) years/) {
  print "That said '$1' years.\n";  # empty string
}
```

#### 2.8.6.1 The Persistence of Memory

```text
These match variables generally stay around until the next successful pattern match.[dagger] That is, an unsuccessful match leaves the previous memories intact, but a successful one resets them all. This correctly implies that you shouldn't use these match variables unless the match succeeded; otherwise, you could be seeing a memory from some previous pattern. The following (bad) example is supposed to print a word matched from $wilma. But if the match fails, it will use whatever leftover string happens to be found in $1.

    [dagger] The actual scoping rule is much more complex (see the documentation if you need it), but as long as you don't expect the match variables to be untouched many lines after a pattern match, you shouldn't have problems.

$wilma =~ /(\w+)/;  # BAD! Untested match result
print "Wilma's word was $1... or was it?\n";


This is another reason that a pattern match is almost always found in the conditional expression of an if or while:

if ($wilma =~ /(\w+)/) {
  print "Wilma's word was $1.\n";
} else {
  print "Wilma doesn't have a word.\n";
}


Since these memories don't stay around forever, you shouldn't use a match variable like $1 more than a few lines after its pattern match. If your maintenance programmer adds a new regular expression between your regular expression and your use of $1, you'll be getting the value of $1 for the second match, rather than the first. For this reason, if you need a memory for more than a few lines, it's generally best to copy it into an ordinary variable. Doing this helps make the code more readable at the same time:

if ($wilma =~ /(\w+)/) {
  my $wilma_word = $1;
  ...
}


Later, in Chapter 9, you'll see how to get the memory value directly into the variable at the same time the pattern match happens, without having to use $1 explicitly.
```

#### 2.8.6.2 Noncapturing Parentheses

```text
So far you've seen parentheses that capture parts of a matched string and store them in the memory variables, but what if you just want to use the parentheses to group things? Consider a regular expression where we want to make part of it optional, but capture only another part of it. In this example, we want "bronto" to be optional, but to make it optional, we have to group that sequence of characters with parentheses. Later in the pattern, we use an alternation to get either "steak" or "burger", and we want to know which one we found.

if (/(bronto)?saurus (steak|burger)/) {
    print "Fred wants a $2\n";
}


Even if bronto is not there, its part of the pattern goes into $1. Perl just counts the order of the opening parentheses to decide what the memory variables will be. The part that we want to remember ends up in $2. In more complicated patterns, this situation can get quite confusing.

Fortunately, Perl's regular expressions have a way to use parentheses to group things but not trigger the memory variables. We call these noncapturing parentheses, and we write them with a special sequence. We add a question mark and a colon after the opening parenthesis, (?:),[*] and that tells Perl we use these parentheses only for grouping.

    [*] This is the fourth type of ? you'll see in regular expressions: a literal question mark (escaped), the 0 or 1 quantifier, the nongreedy modifier (next chapter), and now the start of an extended pattern.

We change our regular expression to use noncapturing parentheses around "bronto", and the part that we want to remember now shows up in $1:

if (/(?:bronto)?saurus (steak|burger)/) {
    print "Fred wants a $1\n";
}


Later, when we change our regular expression, perhaps to include a possible bar-be-que version of the brontosaurus burger, we can make the added "BBQ " (with a space!) optional and noncapturing, so the part we want to remember still shows up in $1. Otherwise, we'd potentially have to shift all of our memory variable names every time we add grouping parentheses to our regular expression:

if (/(?:bronto)?saurus (?:BBQ )?(steak|burger)/) {
    print "Fred wants a $1\n";
}


Perl's regular expressions have several other special parentheses sequences that do fancy and complicated things like look-ahead, look-behind, embedded comments, or even run code right in the middle of a pattern. You'll have to check out the perlre manpage for the details though.
```

### 2.8.7 Named Captures

```text
You can capture parts of the string with parentheses and then look in the number variables $1, $2, and so on to get the parts of the string that matched. Keeping track of those number variables and what should be in them can be confusing even for simple patterns. Consider this regular expression that tries to match the two names in $names:

use 5.010;

my $names = 'Fred or Barney';
if( $names =~ m/(\w+) and (\w+)/ ) { # won't match
    say "I saw $1 and $2";
    }


We don't see the message from say because the string has an or where you were expecting an and. Maybe we were supposed to have it both ways, so we change the regular expression to have an alternation to handle both and and or, adding another set of parentheses to group the alternation:

use 5.010;

my $names = 'Fred or Barney';
if( $names =~ m/(\w+) (and|or) (\w+)/ ) { # matches now
    say "I saw $1 and $2";
    }


Oops! We see a message this time, but it doesn't have the second name in it because we added another set of memory parentheses. The value in $2 is from the alternation and the second name was now in $3 (which we don't output):

I saw Fred and or


We could have used the noncapturing parentheses to get around this, but the real problem is that we have to remember which numbered parentheses belong to which data we are trying to capture. Imagine how much tougher this gets with many captures.

Instead of remembering numbers such as $1, Perl 5.10 lets us name the captures directly in the regular expression. It saves the text it matches in the hash named %+: the key is the label we used and the value is the part of the string that it matched. To label a match variable, we use (?<LABEL>PATTERN) where we replace LABEL with our own names.[*] We label the first capture name1 and the second one name2, and look in $+{name1} and $+{name2} to find their values:

    [*] Perl also lets us use the Python syntax (?P<LABEL>...) to do the same thing.

use 5.010;

my $names = 'Fred or Barney';
if( $names =~ m/(?<name1>\w+) (?:and|or) (?<name2>\w+)/ ) {
    say "I saw $+{name1} and $+{name2}";
    }


Now we see the right message:

I saw Fred and Barney


Once we label our captures, we can move them around and add additional capturing parentheses without disturbing the order of the captures:

use 5.010;

my $names = 'Fred or Barney';
if( $names =~ m/((?<name2>\w+) (and|or) (?<name1>\w+))/ ) {
    say "I saw $+{name1} and $+{name2}";
    }


Now that we have a way to label matches, we also need a way to refer to them for back references. Previously, we used either \1 or \g{1} for this. With a labeled group, we can use the label in \g{label}:

use 5.010;

my $names = 'Fred Flinstone and Wilma Flinstone';

if( $names =~ m/(?<last_name>\w+) and \w+ \g{last_name}/ ) {
    say "I saw $+{last_name}";
    }


We can do the same thing with another syntax. Instead of using \g{label}, we use \k<label>:[dagger]

    [dagger] \k<label> is slightly different than \g{label}. In patterns that have two or more labeled groups with the same label, \k<label> and \g{label} always refers to the leftmost group, but \g{N} can be a relative back reference. If you're a fan of Python, you can also use the (?P=label) syntax.

use 5.010;

my $names = 'Fred Flinstone and Wilma Flinstone';

if( $names =~ m/(?<last_name>\w+) and \w+ \k<last_name>/ ) {
    say "I saw $+{last_name}";
    }
```

### 2.8.8 The Automatic Match Variables

```text
There are three more match variables that you get for free,[*] whether the pattern has memory parentheses or not. That's the good news; the bad news is that these variables have weird names.

    [*] Yeah, right. There's no such thing as a free match. These are "free" only in the sense that they don't require match parentheses. Don't worry; we'll mention their real cost a little later, though.

Now, Larry probably would have been happy enough to call these by slightly-less-weird names, like perhaps $gazoo or $ozmodiar. But those are names that you just might want to use in your own code. To keep ordinary Perl programmers from having to memorize the names of all of Perl's special variables before choosing their first variable names in their first programs,[dagger] Larry has given strange names to many of Perl's built-in variables, names that "break the rules." In this case, the names are punctuation marks: $&, $`, and $'. They're strange, ugly, and weird, but those are their names.[double dagger] The part of the string that actually matched the pattern is automatically stored in $&:

    [dagger] You should still avoid a few classical variable names like $ARGV, but these few are all in all caps. All of Perl's built-in variables are documented in the perlvar manpage.

    [double dagger] If you really can't stand these names, check out the English module, which attempts to give all of Perl's strangest variables nearly normal names. But the use of this module has never really caught on; instead, Perl programmers have grown to love the punctuation-mark variable names, strange as they are.

if ("Hello there, neighbor" =~ /\s(\w+),/) {
  print "That actually matched '$&'.\n";
}


That tells us that the part that matched was " there," (with a space, a word, and a comma). Memory one, in $1, has just the five-letter word there, but $& has the entire matched section.

Whatever came before the matched section is in $`, and whatever was after it is in $'. Another way to say that is that $` holds whatever the regular expression engine had to skip over before it found the match, and $' has the remainder of the string that the pattern never got to. If you glue these three strings together in order, you'll always get back the original string:

if ("Hello there, neighbor" =~ /\s(\w+),/) {
  print "That was ($`)($&)($').\n";
}


The message shows the string as (Hello)( there,)( neighbor), showing the three automatic match variables in action. This may seem familiar, and for good reason: these automatic memory variables are what the pattern test program (from Chapter 7) was using in its line of "mystery" code, to show what part of the string was being matched by the pattern:

print "Matched: |$`<$&>$'|\n";  # The three automatic match variables


Any or all of these three automatic match variables may be empty, of course, just like the numbered match variables. And they have the same scope as the numbered match variables. Generally, that means that they'll stay around until the next successful pattern match.

Now, we said earlier that these three are "free." Well, freedom has its price. In this case, the price is that once you use any one of these automatic match variables anywhere in your entire program, other regular expressions will run a little more slowly.[*] Now, this isn't a giant slowdown, but it's enough of a worry that many Perl programmers will simply never use these automatic match variables.[dagger] Instead, they'll use a workaround. For example, if the only one you need is $&, just put parentheses around the whole pattern and use $1 instead (you may need to renumber the pattern's memories, of course).

    [*] For every block entry and exit, which is practically everywhere.

    [dagger] Most of these folks haven't benchmarked their programs to see whether their workarounds actually save time, though; it's as though these variables were poisonous or something. But we can't blame them for not benchmarkingmany programs that could benefit from these three variables take up only a few minutes of CPU time in a week, so benchmarking and optimizing would be a waste of time. But in that case, why fear a possible extra millisecond? By the way, the Perl developers are working on this problem, but there will probably be no solution before Perl 6.

Match variables (both the automatic ones and the numbered ones) are most often used in substitutions, which you'll see in the next chapter.
```

### 2.8.7 General Quantifiers

```text
A quantifier in a pattern means to repeat the preceding item a certain number of times. You've already seen three quantifiers: *, +, and ?. But if none of those three suits your needs, just use a comma-separated pair of numbers inside curly braces ({}) to specify exactly how few and how many repetitions are allowed.

So the pattern /a{5,15}/ will match from 5 to 15 repetitions of the letter a. If the a appears three times, that's too few, so it won't match. If it appears five times, it's a match. If it appears 10 times, that's still a match. If it appears 20 times, just the first 15 will match, since that's the upper limit.

If you omit the second number (but include the comma), there's no upper limit to the number of times the item will match. So, /(fred){3,}/ will match if there are three or more instances of fred in a row (with no extra characters, like spaces, allowed between each fred and the next). There's no upper limit so that would match 88 instances of fred if you had a string with that many.

If you omit the comma as well as the upper bound, the number given is an exact count: /\w{8}/ will match exactly eight word characters (occurring as part of a larger string, perhaps). And /,{5}chameleon/ matches "comma comma comma comma comma chameleon". By George, that is nice.

In fact, the three quantifier characters that you saw earlier are just common shortcuts. The star is the same as the quantifier {0,}, meaning zero or more. The plus is the same as {1,}, meaning one or more. And the question mark could be written as {0,1}. In practice, it's unusual to need any curly-brace quantifiers, since the three shortcut characters are nearly always the only ones needed.
```

### 2.8.8 Precedence

```text
With all of these metacharacters in regular expressions, you may feel that you can't keep track of the players without a scorecard. That's the precedence chart, which shows us which parts of the pattern "stick together" the most tightly. Unlike the precedence chart for operators, the regular expression precedence chart is simple, with only four levels. As a bonus, this section will review all of the metacharacters that Perl uses in patterns. Table 8-1 shows the precedence.

Table 8-1. Regular expression precedence
Regular expression feature		Example
Parentheses (grouping or memory)	(...), (?:...), (?<LABEL>...)
Quantifiers				a* a+ a? a{n,m}
Anchors and sequence			abc ^a a$
Alternation				a|b|c
Atoms					a [abc] \d \1

   a.  At the top of the precedence chart are the parentheses, (( )), used for grouping and memory. Anything in parentheses will "stick together" more tightly than anything else.
   b.  The second level is the quantifiers. These are the repeat operatorsstar (*), plus (+), and question mark (?)as well as the quantifiers made with curly braces, like {5,15}, {3,}, and {5}. These always stick to the item they're following.
   c.  The third level of the precedence chart holds anchors and sequence. The anchors are the caret (^) start-of-string anchor, the dollar-sign ($) end-of-string anchor, the \b word-boundary anchor, and the \B nonword-boundary anchor. Sequence (putting one item after another) is actually an operator, even though it doesn't use a metacharacter. That means that letters in a word will stick together just as tightly as the anchors stick to the letters.
   d.  The lowest level of precedence is the vertical bar (|) of alternation. Since this is at the bottom of the chart, it effectively cuts the pattern into pieces. It's at the bottom of the chart because we want the letters in the words in /fred|barney/ to stick together more tightly than the alternation. If alternation were of higher priority than sequence, that pattern would mean to match fre, followed by a choice of d or b, followed by arney. So, alternation is at the bottom of the chart, and the letters within the names stick together.
   e.  At the lowest level, there are the so-called atoms that make up the most basic pieces of the pattern. These are the individual characters, character classes, and back references.
```

#### 2.8.8.1 Examples of Precedence

```text
When you need to decipher a complex regular expression, you'll need to do as Perl does and use the precedence chart to see what's really going on.

For example, /^fred|barney$/ is probably not what the programmer intended. That's because the vertical bar of alternation is very low precedence; it cuts the pattern in two. That pattern matches either fred at the beginning of the string or barney at the end. It's much more likely that the programmer wanted /^(fred|barney)$/, which will match if the whole line has nothing but fred or nothing but barney.[*] And what will /(wilma|pebbles?)/ match? The question mark applies to the previous character[dagger] so that will match either wilma or pebbles or pebble, perhaps as part of a larger string (since there are no anchors).

    [*] And, perhaps, a newline at the end of the string, as we mentioned earlier in connection with the $ anchor.

    [dagger] Because a quantifier sticks to the letter s more tightly than the s sticks to the other letters in pebbles.

The pattern /^(\w+)\s+(\w+)$/ matches lines that have a "word," some required whitespace, and another "word," with nothing else before or after. That might be used to match lines like fred flintstone, for example. The parentheses around the words aren't needed for grouping, so they may be intended to save those substrings into the regular expression memories.

When you're trying to understand a complex pattern, it may be helpful to add parentheses to clarify the precedence. That's okay, but remember that grouping parentheses are also automatically memory parentheses; use the noncapturing parentheses if you just want to group things.
```

#### 2.8.8.2 And There's More

```text
Although we've covered all of the regular expression features that most people are likely to need for everyday programming, there are still even more features. A few are covered in the Alpaca book, but also check the perlre, perlrequick, and perlretut manpages for more information about what patterns in Perl can do.[double dagger]

    [double dagger] And check out YAPE::Regexp::Explain in CPAN as a regular-expression-to-English translator.
```

### 2.8.9 A Pattern Test Program

```text
When in the course of Perl events it becomes necessary for a programmer to write a regular expression, it may be difficult to tell just what the pattern will do. It's normal to find that a pattern matches more than you expected, or less. Or it may match earlier in the string than you expected, or later, or not at all.

This program is useful to test out a pattern on some strings and see just what it matches, and where:

#!/usr/bin/perl
while (<>) {                        # take one input line at a time
  chomp;
  if (/YOUR_PATTERN_GOES_HERE/) {
    print "Matched: |$`<$&>$'|\n";  # the special match vars
  } else {
    print "No match: |$_|\n";
  }
}


This pattern test program is written for programmers to use, not end users; you can tell because it doesn't have any prompts or usage information. It will take any number of input lines and check each one against the pattern that you'll put in place of the string saying YOUR_PATTERN_GOES_HERE. For each line that matches, it uses the three special match variables ($`, $&, and $') to make a picture of where the match happened. What you'll see is this: if the pattern is /match/ and the input is beforematchafter, the output will say "|before<match>after|" , using angle brackets to show you just what part of the string was matched by your pattern. If your pattern matches something you didn't expect, you'll be able to see that right away.
```

### 2.8.10 Exercises

```text
Several of these exercises ask you to use the test program from this chapter. You could manually type up this program, taking great care to get all of the odd punctuation marks correct.[*] But you'll probably find it faster and easier to simply download the program and some other goodies from the O'Reilly web site, as we mentioned in the Preface. You'll find this program under the name pattern_test.[dagger]

    [*] If you do type it up on your own, remember that the backquote character (`) is not the same as the apostrophe ('). On most full-sized computer keyboards these days (in the U.S., at least), the backquote is found on a key immediately to the left of the 1 key.

    [dagger] Don't be surprised if the program you download is a slightly different version than what we have in the book.

See Appendix A for answers to the following exercises:

   a.  [8] Using the pattern test program, make a pattern to match the string match. Try the program with the input string beforematchafter. Does the output show the three parts of the match in the right order?
   b.  [7] Using the pattern test program, make a pattern that matches if any word (in the \w sense of word) ends with the letter a. Does it match wilma but not barney? Does it match Mrs. Wilma Flintstone? What about wilma&fred? Try it on the sample text file from the previous chapter's exercises (and add these test strings if they weren't already in there).
   c.  [5] Modify the program from the previous exercise so that the word ending with the letter a is captured into memory $1. Update the code to display that variable's contents in single quotes, something like $1 contains 'Wilma'.
   d.  [5] Modify the program from the previous exercise to use named captures instead of relying on $1. Update the code to display that label name, something like 'word' contains 'Wilma'.
   e.  [5] Extra credit exercise: modify the program from the previous exercise so that immediately following the word ending in a it will also capture up to five characters (if there are that many characters, of course) in a separate memory variable. Update the code to display both memory variables. For example, if the input string says I saw Wilma yesterday, the up-to-five characters are yest. If the input is I, Wilma!, the extra memory should have just one character. Does your pattern still match just plain wilma?
   f.  [5] Write a new program (not the test program!) that prints out any input line ending with whitespace (other than just a newline). Put a marker character at the end of the output line so as to make the whitespace visible.

My answers at: /cygdrive/c/work/KB/perl/learning_perl_5_edition_examples/basic
pattern_tester.pl
filter_lines_ending_with_space.pl
```
