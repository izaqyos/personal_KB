---
type: reference
title: Processing Text with Regular Expressions
description: "Learning Perl chapter 9: processing text with regular expressions and s/// substitutions."
tags: [perl, regex, book-notes, tutorial, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "perl/KB_perl#2.9"
---

# 2.9 Processing Text with Regular Expressions

[↑ Learning Perl, 5th Edition](/perl/kb-perl/02-learning-perl-5th-edition/README.md)

```text
	You can use regular expressions to change text too. So far we've only shown you how to match a pattern, and now we'll show you how to use patterns to locate the parts of strings that you want to change.
```

### 2.9.1 Substitutions with s///

```text
If you think of the m// pattern match as being like your word processor's "search" feature, the "search and replace" feature would be Perl's s/// substitution operator.  This simply replaces whatever part of a variable[218] matches a pattern with a replacement string:

    [218] Unlike m//, which can match against any string expression, s/// is modifying data that must therefore be contained in what's known as an lvalue. This is nearly always a variable, although it could actually be anything that could be used on the left side of an assignment operator.

$_ = "He's out bowling with Barney tonight.";
s/Barney/Fred/;  # Replace Barney with Fred
print "$_\n";


If the match fails, nothing happens, and the variable is untouched:

# Continuing from above; $_ has "He's out bowling with Fred tonight."
s/Wilma/Betty/;  # Replace Wilma with Betty (fails)


Of course, both the pattern and the replacement string could be more complex. Here, the replacement string uses the first memory variable, $1, which is set by the pattern match:

s/with (\w+)/against $1's team/;
print "$_\n";  # says "He's out bowling against Fred's team tonight."


Here are some other possible substitutions. (These are here only as samples; in the real world, it would not be typical to do so many unrelated substitutions in a row.)

$_ = "green scaly dinosaur";
s/(\w+) (\w+)/$2, $1/;  # Now it's "scaly, green dinosaur"
s/^/huge, /;            # Now it's "huge, scaly, green dinosaur"
s/,.*een//;             # Empty replacement: Now it's "huge dinosaur"
s/green/red/;           # Failed match: still "huge dinosaur"
s/\w+$/($`!)$&/;        # Now it's "huge (huge !)dinosaur"
s/\s+(!\W+)/$1 /;       # Now it's "huge (huge!) dinosaur"
s/huge/gigantic/;       # Now it's "gigantic (huge!) dinosaur"


There's a useful Boolean value from s///; it's true if a substitution was successful; otherwise, it's false:

$_ = "fred flintstone";
if (s/fred/wilma/) {
  print "Successfully replaced fred with wilma!\n";
}
```

#### 2.9.1.1 Global Replacements with /g

```text
As you may have noticed in a previous example, s/// will make just one replacement, even if others are possible. Of course, that's just the default. The /g modifier tells s/// to make all possible nonoverlapping[*] replacements:

    [*] It's nonoverlapping because each new match starts looking just beyond the latest replacement.

$_ = "home, sweet home!";
s/home/cave/g;
print "$_\n";  # "cave, sweet cave!"


A fairly common use of a global replacement is to collapse whitespace; that is, to turn any arbitrary whitespace into a single space:

$_ = "Input  data\t may have    extra whitespace.";
s/\s+/ /g;  # Now it says "Input data may have extra whitespace."


Once we show collapsing whitespace, everyone wants to know about stripping leading and trailing whitespace. That's easy enough, in two steps:

s/^\s+//;  # Replace leading whitespace with nothing
s/\s+$//;  # Replace trailing whitespace with nothing


We could do that in one step with an alternation and the /g flag, but that turns out to be a bit slower, at least when we wrote this. The regular expression engine is always being tuned, but to learn more about that, you can get Jeffrey Friedl's Mastering Regular Expressions (O'Reilly) and find out what makes regular expressions fast (or slow).

s/^\s+|\s+$//g;  # Strip leading, trailing whitespace
```

#### 2.9.1.2 Different Delimiters

```text
Just as we did with m// and qw//, we can change the delimiters for s///. But the substitution uses three delimiter characters, so things are a little different.

With ordinary (nonpaired) characters, which don't have a left and right variety, just use three of them, as we did with the forward slash. Here, we've chosen the pound sign[*] as the delimiter:

    [*] With apologies to our British friends, to whom the pound sign is something else! Although the pound sign is generally the start of a comment in Perl, it won't start a comment when the parser knows to expect a delimiterin this case, immediately after the s that starts the substitution.

s#^https://#http://#;


But if you use paired characters, which have a left and right variety, you have to use two pairs: one to hold the pattern and one to hold the replacement string. In this case, the delimiters don't have to be the same kind around the string as they are around the pattern. In fact, the delimiters of the string could even be nonpaired. These are all the same:

s{fred}{barney};
s[fred](barney);
s<fred>#barney#;
```

#### 2.9.1.3 Option Modifiers

```text
In addition to the /g modifier,[dagger] substitutions may use the /i, /x, and /s modifiers that you saw in ordinary pattern matching (the order of modifiers isn't significant):

    [dagger] We still speak of the modifiers with names like /i, even if the delimiter is something other than a slash.

s#wilma#Wilma#gi;  # replace every WiLmA or WILMA with Wilma
s{__END__.*}{}s;   # chop off the end marker and all following lines
```

#### 2.9.1.4 The Binding Operator

```text
Just as you saw with m//, we can choose a different target for s/// by using the binding operator:

$file_name =~ s#^.*/##s;  # In $file_name, remove any Unix-style path
```

#### 2.9.1.5 Case Shifting

```text
It often happens in a substitution that you'll want to make sure that a replacement word is properly capitalized (or not, as the case may be). That's easy to accomplish with Perl, by using some backslash escapes. The \U escape forces what follows to all uppercase:

$_ = "I saw Barney with Fred.";
s/(fred|barney)/\U$1/gi;  # $_ is now "I saw BARNEY with FRED."


Similarly, the \L escape forces lowercase. Continuing from the previous code:

s/(fred|barney)/\L$1/gi;  # $_ is now "I saw barney with fred."


By default, these affect the rest of the (replacement) string, or you can turn off case shifting with \E:

s/(\w+) with (\w+)/\U$2\E with $1/i;  # $_ is now "I saw FRED with barney."


When written in lowercase (\l and \u ), they affect only the next character:

s/(fred|barney)/\u$1/ig;  # $_ is now "I saw FRED with Barney."


You can even stack them up. Using \u with \L means "all lowercase, but capitalize the first letter":[*]

    [*] The \L and \u may appear together in either order. Larry realized that people would sometimes get those two backward, so he made Perl figure out that you want just the first letter capitalized and the rest lowercase. Larry is a pretty nice guy.

s/(fred|barney)/\u\L$1/ig;  # $_ is now "I saw Fred with Barney."


As it happens, although we're covering case shifting in relation to substitutions, these escape sequences are available in any double-quotish string:

print "Hello, \L\u$name\E, would you like to play a game?\n";
```

### 2.9.2 The split Operator

```text
Another operator that uses regular expressions is split, which breaks up a string according to a pattern. This is useful for tab-separated data, or colon-separated, whitespace-separated, or anything-separated data, really.[dagger] So long as you can specify the separator with a regular expression (and generally, it's a simple regular expression), you can use split. It looks like this:

    [dagger] Except "comma-separated values," normally called CSV files. Those are a pain to do with split; you're better off getting the Text::CSV module from CPAN.

@fields = split /separator/, $string;


The split operator[double dagger] drags the pattern through a string and returns a list of fields (substrings) that were separated by the separators. Whenever the pattern matches, that's the end of one field and the start of the next. So, anything that matches the pattern will never show up in the returned fields. Here's a typical split pattern, splitting on colons:

    [double dagger] It's an operator, even though it acts a lot like a function, and everyone generally calls it a function. But the technical details of the difference are beyond the scope of this book.

@fields = split /:/, "abc:def:g:h";  # gives ("abc", "def", "g", "h")


You could even have an empty field, if there were two delimiters together:

@fields = split /:/, "abc:def::g:h";  # gives ("abc", "def", "", "g", "h")


Here's a rule that seems odd at first, but it rarely causes problems: leading empty fields are always returned, but trailing empty fields are discarded. For example:[||]

    [||] This is merely the default. It's this way for efficiency. If you worry about losing trailing empty fields, use -1 as a third argument to split and they'll be kept; see the perlfunc manpage.

@fields = split /:/, ":::a:b:c:::";  # gives ("", "", "", "a", "b", "c")


It's also common to split on whitespace, using /\s+/ as the pattern. Under that pattern, all whitespace runs are equivalent to a single space:

my $some_input = "This  is a \t        test.\n";
my @args = split /\s+/, $some_input;  # ("This", "is", "a", "test.")


The default for split is to break up $_ on whitespace:

my @fields = split;  # like split /\s+/, $_;


This is almost the same as using /\s+/ as the pattern, except that in this special case a leading empty field is suppressed--so, if the line starts with whitespace, you won't see an empty field at the start of the list. (If you'd like to get the same behavior when splitting another string on whitespace, just use a single space in place of the pattern: split ' ', $other_string. Using a space instead of the pattern is a special kind of split.)

Generally, the patterns used for split are as simple as the ones you see here. But if the pattern becomes more complex, be sure to avoid using memory parentheses in the pattern since these trigger the (usually) wanted "separator retention mode" (see the perlfunc manpage for details). Use the noncapturing parentheses, (?:), in split if you need to group things.
```

### 2.9.3 The join Function

```text
The join function doesn't use patterns, but performs the opposite function of split: split breaks up a string into a number of pieces, and join glues together a bunch of pieces to make a single string. The join function looks like this:

my $result = join $glue, @pieces;


The first argument to join is the glue, which may be any string. The remaining arguments are a list of pieces. join puts the glue string between the pieces and returns the resulting string:

my $x = join ":", 4, 6, 8, 10, 12;  # $x is "4:6:8:10:12"


In that example, we had five items, so there are only four colons. That is, there are four pieces of glue. The glue shows up only between the pieces, never before or after them. So, there will be one fewer piece of glue than the number of items in the list.

This means that there may be no glue at all if the list doesn't have at least two elements:

my $y = join "foo", "bar";       # gives just "bar", since no foo glue is needed
my @empty;                       # empty array
my $empty = join "baz", @empty;  # no items, so it's an empty string

					  


Using $x from above, we can break up a string and put it back together with a different delimiter:

my @values = split /:/, $x;  # @values is (4, 6, 8, 10, 12)
my $z = join "-", @values;   # $z is "4-6-8-10-12"


Although split and join work well together, don't forget that the first argument to join is always a string, not a pattern.
```

### 2.9.4 m// in List Context

```text
When you use split, the pattern specifies the separator: the part that isn't the useful data. Sometimes it's easier to specify what you want to keep.

When a pattern match (m//) is used in a list context, the return value is a list of the memory variables created in the match, or an empty list if the match failed:

$_ = "Hello there, neighbor!";
my($first, $second, $third) = /(\S+) (\S+), (\S+)/;
print "$second is my $third\n";


This makes it easy to give the match variables easy-to-use names, and these names may persist past the next pattern match. (Note also that because there's no =~ in that code, the pattern matches against $_ by default.)

The /g modifier that you first saw on s/// also works with m//, which lets it match at more than one place in a string. In this case, a pattern with a pair of parentheses will return a memory from each time it matches:

my $text = "Fred dropped a 5 ton granite block on Mr. Slate";
my @words = ($text =~ /([a-z]+)/ig);
print "Result: @words\n";
# Result: Fred dropped a ton granite block on Mr Slate


This is like using split "inside out": instead of specifying what we want to remove, we specify what we want to keep.

In fact, if there is more than one pair of parentheses, each match may return more than one string. Let's say that we have a string that we want to read into a hash, something like this:

my $data = "Barney Rubble Fred Flintstone Wilma Flintstone";
my %last_name = ($data =~ /(\w+)\s+(\w+)/g);


Each time the pattern matches, it returns a pair of memories. Those pairs of values then become the key-value pairs in the newly created hash.
```

### 2.9.5 More Powerful Regular Expressions

```text
After already reading three (almost!) chapters about regular expressions, you know that they're a powerful feature in the core of Perl. But there are even more features that the Perl developers have added; you'll see some of the most important ones in this section. At the same time, you'll see a little more about the internal operation of the regular expression engine.
```

#### 2.9.5.1 Nongreedy Quantifiers

```text
The four quantifiers you've already seen (in Chapters Chapter 7 and Chapter 8) are all greedy. That means that they match as much as they can, only to reluctantly give some back if that's necessary to allow the overall pattern to succeed. Here's an example: Suppose you're using the pattern /fred.+barney/ on the string fred and barney went bowling last night. Of course, we know that the regular expression will match that string, but let's see how it goes about it.[*] First, of course, the subpattern fred matches the identical literal string. The next part of the pattern is the .+, which matches any character except newline, at least one time. But the plus quantifier is greedy; it prefers to match as much as possible. So it immediately matches all of the rest of the string, including the word night. (This may surprise you, but the story isn't over yet.)

    [*] The regular expression engine makes a few optimizations that make the true story different than we tell it here, and those optimizations change from one release of Perl to the next. You shouldn't be able to tell from the functionality that it's not doing as we say, though. If you want to know how it really works, you should read the latest source code. Be sure to submit patches for any bugs you find.

Now the subpattern barney would like to match, but it can'twe're at the end of the string. But since the .+ could still be successful even if it matched one fewer character, it reluctantly gives back the letter t at the end of the string. (It's greedy, but it wants the whole pattern to succeed even more than it wants to match everything all by itself.)

The subpattern barney tries again to match, and still can't. So the .+ gives back the letter h and lets it try again. One character after another, the .+ gives back what it matched until finally it gives up all of the letters of barney. Now, finally, the subpattern barney can match, and the overall match succeeds.

Regular expression engines do a lot of backtracking like that, trying every different way of fitting the pattern to the string until one of them succeeds, or until none of them has.[dagger] But as you could see from this example, that can involve a lot of backtracking, as the quantifier gobbles up too much of the string and the regular expression engine forces it to return some of it.

    [dagger] In fact, some regular expression engines try every different way, even continuing on after they find one that fits. But Perl's regular expression engine is primarily interested in whether the pattern can or cannot match, so finding even one match means that the engine's work is done. Again, see Mastering Regular Expressions.

For each of the greedy quantifiers, though, there's also a nongreedy quantifier available. Instead of the plus (+), we can use the nongreedy quantifier +?, which matches one or more times (just as the plus does), except that it prefers to match as few times as possible, rather than as many as possible. Let's see how that new quantifier works when the pattern is rewritten as /fred.+?barney/.

Once again, fred matches right at the start. But this time the next part of the pattern is .+?, which would prefer to match no more than one character, so it matches just the space after fred. The next subpattern is barney, but that can't match here (since the string at the current position begins with and barney...). So the .+? reluctantly matches the a and lets the rest of the pattern try again. Once again, barney can't match, so the .+? accepts the letter n and so on. Once the .+? has matched five characters, barney can match, and the pattern is a success.

[Yosi, Note that the eqiuvalent in VIM is \{-1,} for example:
though.\{-1,}
see :h non-greedy
]

There was still some backtracking, but since the engine had to go back and try again just a few times, it should be a big improvement in speed. Well, it's an improvement if you'll generally find barney near fred. If your data often had fred near the start of the string and barney only at the end, the greedy quantifier might be a faster choice. In the end, the speed of the regular expression depends upon the data.

But the nongreedy quantifiers aren't just about efficiency. Although they'll always match (or fail to match) the same strings as their greedy counterparts, they may match different amounts of the strings. For example, suppose you had some HTML-like[*] text, and you want to remove all of the tags <BOLD> and </BOLD>, leaving their contents intact. Here's the text:

    [*] Once again, we aren't using real HTML because you can't correctly parse HTML with simple regular expressions. If you really need to work with HTML or a similar markup language, use a module that's made to handle the complexities.

    I'm talking about the cartoon with Fred and <BOLD>Wilma</BOLD>! 

And here's a substitution to remove those tags. But what's wrong with it?

s#(.*)#$1#g;


The problem is that the star is greedy.[dagger] What if the text had said this instead?

    [dagger] There's another possible problem: we should have used the /s modifier as well, since the end tag may be on a different line than the start tag. It's a good thing that this is just an example; if we were writing something like this for real, we would have taken our own advice and used a well-written module.

    I thought you said Fred and <BOLD>Velma</BOLD>, not <BOLD>Wilma</BOLD>

In that case, the pattern would match from the first <BOLD> to the last </BOLD>, leaving intact the ones in the middle of the line. Oops! Instead, we want a nongreedy quantifier. The nongreedy form of star is *?, so the substitution now looks like this:

    s#<BOLD>(.*?)</BOLD>#$1#g;

And it does the right thing.

Since the nongreedy form of the plus was +? and the nongreedy form of the star was *?, you've probably realized that the other two quantifiers look similar. The nongreedy form of any curly-brace quantifier looks the same, but with a question mark after the closing brace, like {5,10}? or {8,}?.[double dagger] And even the question-mark quantifier has a nongreedy form: ??. That matches either once or not at all, but it prefers not to match anything.

    [double dagger] In theory, there's also a nongreedy quantifier form that specifies an exact number, like {3}?. But since that says to match exactly three of the preceding item, it has no flexibility to be either greedy or nongreedy.
```

#### 2.9.5.2 Matching Multiple-Line Text

```text
Classic regular expressions were used to match just single lines of text. But since Perl can work with strings of any length, Perl's patterns can match multiple lines of text as easily as single lines. Of course, you have to include an expression that holds more than one line of text. Here's a string that's four lines long:

$_ = "I'm much better\nthan Barney is\nat bowling,\nWilma.\n";


Now, the anchors ^ and $ are normally anchors for the start and end of the whole string (see Chapter 8). But the /m regular expression option lets them match at internal newlines as well (think m for multiple lines). This makes them anchors for the start and end of each line, rather than the whole string. So this pattern can match:

print "Found 'wilma' at start of line\n" if /^wilma\b/im;


Similarly, you could do a substitution on each line in a multiline string. Here, we read an entire file into one variable,[*] then add the file's name as a prefix at the start of each line:

    [*] Hope it's a small one. The file, that is, not the variable.

open FILE, $filename
  or die "Can't open '$filename': $!";
my $lines = join '', <FILE>;
$lines =~ s/^/$filename: /gm;
```

#### 2.9.5.3 Updating Many Files

```text
The most common way of programmatically updating a text file is by writing an entirely new file that looks similar to the old one, but making whatever changes we need as we go along. As you'll see, this technique gives nearly the same result as updating the file itself, but it has some beneficial side effects as well.

In this example, we've got hundreds of files with a similar format. One of them is fred03.dat, and it's full of lines like these:

Program name: granite
Author: Gilbert Bates
Company: RockSoft
Department: R&D
Phone: +1 503 555-0095
Date: Tues March 9, 2004
Version: 2.1
Size: 21k
Status: Final beta


We need to fix this file so that it has some different information. Here's roughly what this one should look like when we're done:

Program name: granite
Author: Randal L. Schwartz
Company: RockSoft
Department: R&D
Date: June 12, 2008 6:38 pm
Version: 2.1
Size: 21k
Status: Final beta


In short, we need to make three changes. The name of the Author should be changed; the Date should be updated to today's date, and the Phone should be removed completely. And we have to make these changes in hundreds of similar files as well.

Perl supports a way of in-place editing of files with a little extra help from the diamond operator (<>). Here's a program to do what we want, although it may not be obvious how it works at first. This program's only new feature is the special variable $^I; ignore that for now, and we'll come back to it:

#!/usr/bin/perl -w

use strict;

chomp(my $date = `date`);
$^I = ".bak";

while (<>) {
  s/^Author:.*/Author: Randal L. Schwartz/;
  s/^Phone:.*\n//;
  s/^Date:.*/Date: $date/;
  print;
}


Since we need today's date, the program starts by using the system date command. A better way to get the date (in a slightly different format) would almost surely be to use Perl's own localtime function in a scalar context:

my $date = localtime;


The next line sets $^I, but keep ignoring that for the moment.

The list of files for the diamond operator here are coming from the command line. The main loop reads, updates, and prints one line at a time. (With what you know so far, that means that all of the files' newly modified contents will be dumped to your terminal, scrolling furiously past your eyes, without the files being changed at all. But stick with us.) Note that the second substitution can replace the entire line containing the phone number with an empty string--leaving not even a newline--so when that's printed, nothing comes out, and it's as if the Phone never existed. Most input lines won't match any of the three patterns, and those will be unchanged in the output.

So this result is close to what we want, except that we haven't shown you how the updated information gets back out on to the disk. The answer is in the variable $^I. By default it's undef, and everything is normal. But when it's set to some string, it makes the diamond operator (<>) even more magical than usual.

We already know about much of the diamond's magic--it will automatically open and close a series of files for you, or read from the standard-input stream if there aren't any filenames given. But when there's a string in $^I, that string is used as a backup filename's extension. Let's see that in action.

Let's say it's time for the diamond to open our file fred03.dat. It opens it like before, but now it renames it, calling it fred03.dat.bak.[*] We've still got the same file open, but now it has a different name on the disk. Next, the diamond creates a new file and gives it the name fred03.dat. That's okay; we weren't using that name any more. And now the diamond selects the new file as the default for output, so that anything that we print will go into that file.[dagger] So now the while loop will read a line from the old file, update that, and print it out to the new file. This program can update thousands of files in a few seconds on a typical machine. Pretty powerful, huh?

    [*] Some of the details of this procedure will vary on non-Unix systems, but the end result should be nearly the same. See the release notes for your port of Perl.

    [dagger] The diamond also tries to duplicate the original file's permission and ownership settings as much as possible; for example, if the old one was world-readable, the new one should be as well.

Once the program has finished, what does the user see? The user says, "Ah, I see what happened! Perl edited my file fred03.dat, making the changes I needed, and saved me a copy of the original in the backup file fred03.dat.bak just to be helpful!" But we now know the truth: Perl didn't really edit any file. It made a modified copy, said "Abracadabra!" and switched the files around while we were watching sparks come out of the magic wand. Tricky.

Some folks use a tilde (~) as the value for $^I since that resembles what emacs does for backup files. Another possible value for $^I is the empty string. This enables in-place editing, but doesn't save the original data in a backup file. But since a small typo in your pattern could wipe out all of the old data, using the empty string is recommended only if you want to find out how good your backup tapes are. It's easy enough to delete the backup files when you're done. And when something goes wrong and you need to rename the backup files to their original names, you'll be glad that you know how to use Perl to do that (see the multiple-file rename example in Chapter 14).
```

#### 2.9.5.4 In-Place Editing from the Command Line

```text
A program like the example from the previous section is fairly easy to write. But Larry decided it wasn't easy enough.

Imagine that you need to update hundreds of files that have the misspelling Randall instead of the one-l name Randal. You could write a program like the one in the previous section. Or you could do it all with a one-line program, right on the command line:

$ perl -p -i.bak -w -e 's/Randall/Randal/g' fred*.dat


Perl has a whole slew of command-line options that can be used to build a complete program in a few keystrokes.[*] Let's see what these few do.

    [*] See the perlrun manpage for the complete list.

Starting the command with perl does something like putting #!/usr/bin/perl at the top of a file does: it says to use the program perl to process what follows.

The -p option tells Perl to write a program for you. It's not much of a program, though; it looks something like this:[dagger]

    [dagger] Actually, the print occurs in a continue block. See the perlsyn and perlrun manpages for more information.

while (<>) {
  print;
}


If you want even less, you could use -n instead; that leaves out the automatic print statement, so you can print only what you wish. (Fans of awk will recognize -p and -n.) Again, it's not much of a program, but it's pretty good for the price of a few keystrokes.

[Yosi: 
The following is the perl equivalent of grep -i yosi *
 cat * | perl  -n -e 'if (/yosi/i) {print;}'
 and 
 perl  -n -e 'if (/yosi/i) {print;}' *
 ]
The next option is -i.bak, which you might have guessed sets $^I to ".bak" before the program starts. If you don't want a backup file, you can use -i alone, with no extension. If you don't want a spare parachute, you can leave the airplane with just one.

We've seen -w beforeit turns on warnings.

The -e option says "executable code follows." That means the s/Randall/Randal/g string is treated as Perl code. Since we've already got a while loop (from the -p option), this code is put inside the loop, before the print. For technical reasons, the last semicolon in the -e code is optional. But if you have more than one -e, and thus more than one chunk of code, only the semicolon at the end of the last one may safely be omitted.

The last command-line parameter is fred*.dat, which says that @ARGV should hold the list of filenames that match that filename pattern. Put the pieces all together, and it's as if we had written a program like this, and put it to work on all of those fred*.dat files:

#!/usr/bin/perl -w

$^I = ".bak";

while (<>) {
  s/Randall/Randal/g;
  print;
}


Compare this program to the one we used in the previous section. It's pretty similar. These command-line options are pretty handy, aren't they?
```

### 2.9.6 Exercises

```text
# [7] Make a pattern that will match three consecutive copies of whatever is currently contained in $what. That is, if $what is fred, your pattern should match fredfredfred. If $what is fred|barney, your pattern should match fredfredbarney or barneyfredfred or barneybarneybarney or many other variations. (Hint: you should set $what at the top of the pattern test program with a statement like my $what = 'fred|barney';.)
# [12] Write a program that makes a modified copy of a text file. In the copy, every string Fred (case-insensitive) should be replaced with Larry. (So, Manfred Mann should become ManLarry Mann.) The input filename should be given on the command line (don't ask the user!), and the output filename should be the corresponding filename ending with .out.
# [8] Modify the previous program to change every Fred to Wilma and every Wilma to Fred. Now input like fred&wilma should look like Wilma&Fred in the output.
# [10] Extra credit exercise: write a program to add a copyright line to all of your exercise answers so far, by placing a line like:

 ## Copyright (C) 20XX by Yours Truly


in the file immediately after the "shebang" line. You should edit the files "in place," keeping a backup. Presume that the program will be invoked with the filenames to edit already on the command line.
# [15] Extra extra credit exercise: modify the previous program so that it doesn't edit the files that already contain the copyright line. (Hint: you might need to know that the name of the file being read by the diamond operator is in $ARGV.)


My answers at: /cygdrive/c/work/KB/perl/learning_perl_5_edition_examples/basic
match_user_pattern.pl
Example: $ ./match_user_pattern.pl 'aa|xx' *
Matched: |#<aaxxaa>|

modify_file_reg_exp.pl  
$ cat inp
Fred
Manfred
fredasds
sdfasdFrEdasd
$ ./modify_file_reg_exp.pl  inp 
$ cat inp.out 
Larry
ManLarry
Larryasds
sdfasdLarryasd

replace fred with wilma and vice versa
$ cat inp
Fred
Manfred
fredasds
sdfasdFrEdasd
$ ./modify_file_reg_exp.pl  inp 
$ cat inp.out 
Wilma
ManWilma
Wilmaasds
sdfasdWilmaasd
Fred Wilma Fred Wilma Wilma Fred Fred

$ ./add_copyrights.pl *.pl
$ diff add_copyrights.pl  add_copyrights.pl.bac 
2d1
< ## Copyright (C) Mon Jan 12 11:38:48 2009 Yosi Izaq
```
