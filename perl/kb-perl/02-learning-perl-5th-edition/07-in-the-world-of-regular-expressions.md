---
type: reference
title: In the World of Regular Expressions
description: "Subsection 2.7 of Learning Perl, 5th Edition."
tags: [kb-perl]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "perl/KB_perl#2.7"
---

# 2.7 In the World of Regular Expressions

[↑ Learning Perl, 5th Edition](/perl/kb-perl/02-learning-perl-5th-edition/README.md)

```text
Perl has many features that set it apart from other languages. Of all those features, one of the most important is its strong support for regular expressions. These allow fast, flexible, and reliable string handling.

But that power comes at a price. Regular expressions are actually tiny programs in their own special language, built inside Perl. (Yes, you're about to learn another programming language![174] Fortunately it's a simple one.) So in this chapter, you'll visit the world of regular expressions, where (mostly) you can forget about the world of Perl. Then, in the next chapter, we'll show you where this world fits into Perl's world.

    [174] Some might argue that regular expressions are not a complete programming language. We won't argue.

Regular expressions aren't merely part of Perl; they're also found in sed and awk, procmail, grep, most programmers' text editors such as vi and emacs, and even in more esoteric places. If you've seen some of these already, you're ahead of the game. Keep watching, and you'll see many more tools that use or support regular expressions, such as search engines on the Web (often written in Perl), email clients, and others. The bad news is that everybody's regular expressions have slightly different syntax, so you may need to learn to include or omit an occasional backslash.
```

### 2.7.1 What Are Regular Expressions?

```text
A regular expression, often called a pattern in Perl, is a template that either matches or doesn't match a given string.[175] That is, there are an infinite number of possible text strings; a given pattern divides that infinite set into two groups: the ones that match, and the ones that don't. There's never any kinda-sorta-almost-up-to-here wishy-washy matching: either it matches or it doesn't.

    [175] Purists would ask for a more rigorous definition. But then again, purists say that Perl's patterns aren't really regular expressions. If you're serious about regular expressions, we highly recommend the book Mastering Regular Expressions by Jeffrey Friedl (O'Reilly).

A pattern may match just one possible string, or just two or three, or a dozen, or a hundred, or an infinite number. Or it may match all strings except for one, or except for some, or except for an infinite number.[*] We already referred to regular expressions as being little programs in their own simple programming language. It's a simple language because the programs have just one task: to look at a string and say "it matches" or "it doesn't match."[dagger] That's all they do.

    [*] And as you'll see, you could have a pattern that always matches or that never does. In rare cases, even these may be useful. Generally, though, they're mistakes.

    [dagger] The programs also pass back some information that Perl can use later. One such piece of information is the "regular expressions memories" that you'll learn about a little later.

One of the places you're likely to have seen regular expressions is in the Unix grep command, which prints out text lines matching a given pattern. For example, if you wanted to see which lines in a given file mention flint and, somewhere later on the same line, stone, you might do something like this, with the Unix grep command:

$ grep 'flint.*stone' chapter*.txt
chapter3.txt:a piece of flint, a stone which may be used to start a fire by striking
chapter3.txt:found obsidian, flint, granite, and small stones of basaltic rock,
 which
chapter9.txt:a flintlock rifle in poor condition. The sandstone mantle held several


Don't confuse regular expressions with shell filename-matching patterns, called globs. A typical glob is what you use when you type *.pm to the Unix shell to match all filenames that end in .pm. The previous example uses a glob of chapter*.txt. (You may have noticed that you had to quote the pattern to prevent the shell from treating it like a glob.) Although globs use a lot of the same characters that you use in regular expressions, those characters are used in totally different ways.[double dagger] We'll visit globs later, in Chapter 13, but for now try to put them totally out of your mind.

    [double dagger] Globs are also (alas) sometimes called patterns. What's worse, though, is that some bad Unix books for beginners (and possibly written by beginners) have taken to calling globs "regular expressions," which they certainly are not. This confuses many folks at the start of their work with Unix.
```

### 2.7.2 Using Simple Patterns

```text
To match a pattern (regular expression) against the contents of $_, simply put the pattern between a pair of forward slashes (/), like we do here:

$_ = "yabba dabba doo";
if (/abba/) {
  print "It matched!\n";
}


The expression /abba/ looks for that four-letter string in $_; if it finds it, it returns a true value. In this case, it's found more than once, but that doesn't make any difference. If it's found at all, it's a match; if it's not in there at all, it fails.

Because the pattern match is generally being used to return a true or false value, it is almost always found in the conditional expression of if or while.

All of the usual backslash escapes that you can put into double-quoted strings are available in patterns, so you could use the pattern /coke\tsprite/ to match the 11 characters of coke, a tab, and sprite.
```

#### 2.7.2.1 About Metacharacters

```text
Of course, if patterns matched only simple literal strings, they wouldn't be very useful. That's why there are a number of special characters, called metacharacters, that have special meanings in regular expressions.

For example, the dot (.) is a wildcard characterit matches any single character except a newline (which is represented by "\n"). So, the pattern /bet.y/ would match betty. Or it would match betsy, or bet=y, or bet.y, or any other string that has bet, followed by any one character (except a newline), followed by y. It wouldn't match bety or betsey, though, since those don't have exactly one character between the t and the y. The dot always matches exactly one character.

So, if you wanted to match a period in the string, you could use the dot. But that would match any possible character (except a newline), which might be more than you wanted. If you wanted the dot to match just a period, you can simply backslash it. In fact, that rule goes for all of Perl's regular expression metacharacters: a backslash in front of any metacharacter makes it nonspecial. So, the pattern /3\.14159/ doesn't have a wildcard character.

So the backslash is our second metacharacter. If you mean a real backslash, just use a pair of thema rule that applies just as well everywhere else in Perl.
```

#### 2.7.2.2 Simple Quantifiers

```text
It often happens that you'll need to repeat something in a pattern. The star (*) means to match the preceding item zero or more times. So, /fred\t*barney/ matches any number of tab characters between fred and barney. That is, it matches "fred\tbarney" with one tab, or "fred\t\tbarney" with two tabs, or "fred\t\t\tbarney" with three tabs, or even "fredbarney" with nothing in between at all. That's because the star means "zero or more"so you could even have hundreds of tab characters in between, but nothing other than tabs. You may find it helpful to think of the star as saying, "That previous thing, any number of times, even zero times" (because * is the "times" operator in multiplication).

What if you wanted to allow something besides tab characters? The dot matches any character,[*] so .* will match any character, any number of times. That means that the pattern /fred.*barney/ matches "any old junk" between fred and barney. Any line that mentions fred and (somewhere later) barney will match that pattern. We often call .* the "any old junk" pattern because it can match any old junk in your strings.

    [*] Except newline. But we're going to stop reminding you of that so often because you know it by now. Most of the time it doesn't matter, anyway, because your strings will most often not have newlines. But don't forget this detail because someday a newline will sneak into your string and you'll need to remember that the dot doesn't match a newline.

The star is formally called a quantifier, meaning that it specifies a quantity of the preceding item. But it's not the only quantifier; the plus (+) is another. The plus means to match the preceding item one or more times: /fred +barney/ matches if fred and barney are separated by spaces and only spaces. (The space is not a metacharacter.) This won't match fredbarney, since the plus means that there must be one or more spaces between the two names, so at least one space is required. It may be helpful to think of the plus as saying, "that last thing, plus (optionally) more of the same thing."

There's a third quantifier like the star and plus, but more limited. It's the question mark (?), which means that the preceding item is optional. That is, the preceding item may occur once or not at all. Like the other two quantifiers, the question mark means that the preceding item appears a certain number of times. It's just that in this case the item may match one time (if it's there) or zero times (if it's not). There aren't any other possibilities. So, /bamm-?bamm/ matches either spelling: bamm-bamm or bammbamm. This is easy to remember, since it's saying, "That last thing, maybe? Or maybe not?"

All three of these quantifiers must follow something, since they tell how many times the previous item may repeat.
```

#### 2.7.2.3 Grouping in Patterns

```text
As in mathematics, parentheses (( )) may be used for grouping. So, parentheses are also metacharacters. As an example, the pattern /fred+/ matches strings like freddddddddd, but strings like that don't show up often in real life. But the pattern /(fred)+/ matches strings like fredfredfred, which is more likely to be what you wanted. And what about the pattern /(fred)*/? That matches strings like hello, world.[*]

    [*] The star means to match zero or more repetitions of fred. When you're willing to settle for zero, it's hard to be disappointed! That pattern will match any string, even the empty string.

The parentheses also give us a way to reuse part of the string directly in the match. We can use back references to refer to text that we matched in the parentheses. We denote a back reference as a backslash followed by a number, like \1, \2, and so on. The number denotes the parentheses group.

When we use the parentheses around the dot, we match any nonnewline character. We can match again whichever character we matched in those parentheses by using the back reference \1:

$_ = "abba";
if (/(.)\1/) {  # matches 'bb'
  print "It matched same character next to itself!\n";
}


The (.)\1 says that we have to match a character right next to itself. At first try, the (.) matches an a, but when it looks at the back referencewhich says the next thing it must match is athat trial fails. Perl starts over, using the (.) to match the next character, a b. The back reference \1 now says that the next character in the pattern is b, which Perl can match.

The back reference doesn't have to be right next to the parentheses group. The next pattern matches any four nonnewline characters after a literal y, and we use the \1 back reference to denote that we want to match the same four characters after the d:

$_ = "yabba dabba doo";
if (/y(....) d\1/) {
  print "It matched the same after y and d!\n";
}


We can use multiple groups of parentheses, and each group gets its own back reference. We want to match a nonnewline character in a parentheses group, followed by another nonnewline character in a parentheses group. After those two groups, we use the back reference \2 followed by the back reference \1. In effect, we're matching a palindrome such as abba:

$_ = "yabba dabba doo";
if (/y(.)(.)\2\1/) { # matches 'abba'
  print "It matched the same after y and d!\n";
}


Now, this brings up the question "How do I know which group gets which number?" Fortunately, Larry did the easiest thing for humans to understand: just count the order of the opening parenthesis and ignore nesting:

$_ = "yabba dabba doo";
if (/y((.)(.)\3\2) d\1/) {
  print "It matched!\n";
}


You might be able to see this if you write out the regular expression to see the different parts (although this isn't a valid regular expression[*]):

    [*] You can expand regular expressions like this by using the /x flag, but we're not showing that to you until the next chapter.

(        # first open parenthesis
    (.)  # second open parenthesis
    (.)  # third open parenthesis
    \3
    \2
)


Perl 5.10 has a new way to denote back references. Instead of using the backslash and a number, it uses \g{N}, where N is the number of the back reference that you want to use. This notation can make it easier for us to show what we intend in the pattern.

Consider the problem where you want to use a back reference next to a part of the pattern that is a number. In this regular expression, we want to use \1 to repeat the character we matched in the parentheses and follow that with the literal string 11:

$_ = "aa11bb";
if (/(.)\111/) {
  print "It matched!\n";
}


Perl has to guess what we mean there. Is that \1, \11, or \111? Perl will create as many back references as we need, so it assumes that we mean \111. Since we don't have 111 (or 11) parentheses groups, Perl complains when it tries to compile the program.

By using \g{1}, we disambiguate the back reference and the literal parts of the pattern:[*]

    [*] In general, we could leave the curly braces off the \g{1} and just use \g1, but in this case we need the braces. Instead of thinking about it, we just use them all the time.

use 5.010;

$_ = "aa11bb";
if (/(.)\g{1}11/) {
  print "It matched!\n";
}


With the \g{N} notation, we can also use negative numbers. Instead of specifying the absolute number of the parentheses group, we can specify a relative back reference. We can rewrite the last example to use -1 as the number to do the same thing:

use 5.010;

$_ = "aa11bb";
if (/(.)\g{-1}11/) {
  print "It matched!\n";
}


If I decide to add more to that pattern later, I don't have to remember to change the back reference. If I add another parentheses group, I change the absolute numbering of all the back references. The relative back reference, however, just counts from its own position and refers to the group right before it no matter its absolute number, so it stays the same:

use 5.010;

$_ = "aa11bb";
if (/(.)(.)\g{-1}11/) {
  print "It matched!\n";
}
```

#### 2.7.2.4 Alternatives

```text
The vertical bar (|), often pronounced "or" in this usage, means that either the left side may match, or the right side. That is, if the part of the pattern on the left of the bar fails, the part on the right gets a chance to match. So, /fred|barney|betty/ will match any string that mentions fred, or barney, or betty.

Now you can make patterns like /fred( |\t)+barney/, which matches if fred and barney are separated by spaces, tabs, or a mixture of the two. The plus means to repeat one or more times; each time it repeats, the ( |\t) has the chance to match either a space or a tab.[*] There must be at least one of those characters between the two names.

    [*] This particular match would normally be done more efficiently with a character class, as you'll see later in this chapter.

If you wanted the characters between fred and barney to all be the same, you could rewrite that pattern as /fred( +|\t+)barney/. In this case, the separators must be all spaces or all tabs.

The pattern /fred (and|or) barney/ matches any string containing either of the two possible strings: fred and barney, or fred or barney.[dagger] You could match the same two strings with the pattern /fred and barney|fred or barney/, but that would be too much typing. It would probably also be less efficient, depending upon what optimizations are built into the regular expression engine.

    [dagger] Note that the words and and or are not operators in regular expressions! They are shown here in a fixed-width typeface because they're part of the strings.
```

### 2.7.3 Character Classes

```text
A character class, a list of possible characters inside square brackets ([]), matches any single character from within the class. It matches just one single character, but that one character may be any of the ones listed.

For example, the character class [abcwxyz] may match any one of those seven characters. For convenience, you may specify a range of characters with a hyphen (-) so that class may also be written as [a-cw-z]. That didn't save much typing, but it's more usual to make a character class like [a-zA-Z] to match any one letter out of that set of 52.[double dagger] You may use the same character shortcuts as in any double-quoted string to define a character, so the class [\000-\177] matches any seven-bit ASCII character.[||] Of course, a character class will be just part of a full pattern; it will never stand on its own in Perl. For example, you might see code that says something like this:

    [double dagger] Notice that those 52 don't include letters like Å, É, Î, Ø, and Ü. But when Unicode processing is available, that particular character range is noticed and enhanced to automatically do the right thing.

    [||] At least, if you use ASCII and not EBCDIC.

$_ = "The HAL-9000 requires authorization to continue.";
if (/HAL-[0-9]+/) {
  print "The string mentions some model of HAL computer.\n";
}


Sometimes, it's easier to specify the characters left out, rather than the ones within the character class. A caret (^) at the start of the character class negates it. That is, [^def] will match any single character except one of those three. And [^n\-z] matches any character except for n, hyphen, or z. (Note that the hyphen is backslashed because it's special inside a character class. But the first hyphen in /HAL-[0-9]+/ doesn't need a backslash because hyphens aren't special outside a character class.)
```

#### 2.7.3.1 Character Class Shortcuts

```text
Some character classes appear so frequently that they have shortcuts. For example, the character class for any digit, [0-9], may be abbreviated as \d. Thus, the pattern from the example about HAL could be written /HAL-\d+/ instead.

The shortcut \w is a so-called word character: [A-Za-z0-9_]. If your "words" are made up of ordinary letters, digits, and underscores, you'll be happy with this. Most of the rest of us have words made up of ordinary letters, hyphens, and apostrophes,[*] and so we'd like to change this definition of "word." As of this writing, the Perl developers are working on it, but it's not available yet.[dagger] So use this one only when you want ordinary letters, digits, and underscores.

    [*] At least, in usual English you do. In other languages, you may have different components of words. And when looking at ASCII-encoded English text, you have the problem that the single quote and the apostrophe are the same character, so it's not possible in isolation to tell whether cats' is a word with an apostrophe or a word at the end of a quotation. This is probably one reason that computers haven't been able to take over the world yet.

    [dagger] Except to a limited (but nevertheless useful) extent in connection with locales; see the perllocale manpage.

Of course, \w doesn't match a "word"; it merely matches a single "word" character. To match an entire word, though, the plus modifier is handy. A pattern like /fred \w+ barney/ will match fred and a space, then a "word," then a space and barney. That is, it'll match if there's one word[double dagger] between fred and barney, set off by single spaces.

    [double dagger] We're going to stop saying "word" in quotes so much; you know by now that these letter-digit-underscore words are the ones we mean.

As you may have noticed in that previous example, it might be handy to be able to match spaces more flexibly. The \s shortcut is good for whitespace; it's the same as [\f\t\n\r ]. That is, it's the same as a class containing the five whitespace characters: form-feed, tab, newline, carriage return, and the space character itself. These are the characters that merely move the printing position around; they don't use any ink. Still, like the other shortcuts you've just seen, \s matches just a single character from the class, so it's usual to use either \s* for any amount of whitespace (including none at all), or \s+ for one or more whitespace characters. (In fact, it's rare to see \s without one of those quantifiers.) Since all of those whitespace characters look about the same to us humans, you can treat them all in the same way with this shortcut.

Perl 5.10 adds more character classes for whitespace. The \h shortcut only matches horizontal whitespace, which you can write as the character class [\t ] to match a tab and a space. The \v shortcut only matches vertical whitespace, or [\f\n\r]. The \R shortcut matches any sort of linebreak, meaning that you don't have to think about which operating system you're using and what it thinks a linebreak is since \R will figure it out.
```

### 7.3.2. Negating the Shortcuts

```text
Sometimes you may want the opposite of one of these three shortcuts. That is, you may want [^\d], [^\w], or [^\s], meaning a nondigit character, a nonword character, or a nonwhitespace character. That's easy enough to accomplish by using their uppercase counterparts: \D, \W, or \S. These match any character that their counterpart would not match.

Any of these shortcuts will work either in place of a character class (standing on their own in a pattern), or inside the square brackets of a larger character class. That means that you could now use /[\dA-Fa-f]+/ to match hexadecimal (base 16) numbers, which use letters ABCDEF (or the same letters in lowercase) as additional digits.

Another compound character class is [\d\D], which means any digit, or any nondigit. That is to say, any character at all! This is a common way to match any character, even a newline. (As opposed to ., which matches any character except a newline.) And then there's the totally useless [^\d\D], which matches anything that's not either a digit or a nondigit. Rightnothing!
```

### 2.7.4 Exercises

```text
#

[10] Make a program that prints each line of its input that mentions fred. (It shouldn't do anything for other lines of input.) Does it match if your input string is Fred, frederick, or Alfred? Make a small text file with a few lines mentioning "fred flintstone" and his friends, then use that file as input to this program and the ones later in this section.
#

[6] Modify the previous program to allow Fred to match as well. Does it match now if your input string is Fred, frederick, or Alfred? (Add lines with these names to the text file.)
#

[6] Make a program that prints each line of its input that contains a period (.), ignoring other lines of input. Try it on the small text file from the previous exercise: does it notice Mr. Slate?
#

[8] Make a program that prints each line that has a word that is capitalized but not ALL capitalized. Does it match Fred but neither fred nor FRED?
#

[8] Make a program that prints each line that has a two of the same nonwhitespace characters next to each other. It should match lines that contain words such as Mississippi, Bamm-Bamm, or llama.
#

[8] Extra credit exercise: write a program that prints out any input line that mentions both wilma and fred.
	
My answers at: /cygdrive/c/work/KB/perl/learning_perl_5_edition_examples/basic
reg_exp1.pl*  reg_exp2.pl*  reg_exp3.pl*  reg_exp4.pl*  reg_exp5.pl*
```
