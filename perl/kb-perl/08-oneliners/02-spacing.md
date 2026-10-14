---
type: cheatsheet
title: Spacing
description: Subsection 8.2 of Oneliners.
tags: [kb-perl]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "perl/KB_perl#8.2"
---

# 8.2 Spacing

[↑ Oneliners](/perl/kb-perl/08-oneliners/README.md)

### 8.2.1 Double-space a file

```text
perl -pe '$\ = "\n"' file

This one-liner double-spaces a file. I need to explain three things here: the -p and -e command-line options and the short $\ = "\n" Perl program.

Use the -e option to enter a Perl program directly at the command line. Typically you won’t want to create source files for every small program; with -e you can easily write a program directly at the command line as a one-liner. In this case, the entire Perl program contained in this one-liner is $\ = "\n". Be sure to use single quotes (') around the program, or your shell will interpret things like $\ as shell variables, which have no value, effectively removing them!

Now let’s look at the -p switch. Specifying -p tells Perl to assume the following loop around your program:

while (<>) {
    # your program goes here (specified by -e)
} continue {
    print or die "-p failed: $!\n";
}

Broadly speaking, this construct loops over all the input, executes your code, and prints the value of $_ (the print statement prints the value of $_), which allows you to modify all or some lines of the input quickly. The $_ variable is a special variable that gets replaced with the current line of text. It can be replaced with other stuff as well. You’ll learn all about $_ as you work through the book. (See Appendix A for a summary of its use cases.)

But understanding what is going on in this loop in more detail is important. First, the while (<>) loop takes each line from the standard input and puts it in the $_ variable. Next, the code specified by -e is executed, followed by the print or die portion.

The continue statement executes the print or die statement after each line, which attempts to print the contents of the $_ variable. If the attempt fails (for example, the terminal is not writable or standard output has been redirected to something that isn’t writable), die makes Perl exit (die) with an error message.

In this one-liner, the code specified by -e is $\ = "\n", so the program that Perl executes looks like this:

while (<>) {
    $\ = "\n";
} continue {
    print or die "-p failed: $!\n";
}

This Perl program reads each line into the $_ variable and then sets $\ to a newline and calls print. Another special variable is $\. It is similar to the ORS (Output Record Separator) variable in Awk in that it is appended after every print operation. A print statement with no arguments prints the contents of $_ and appends $\ at the end of the output. As a result, each line is printed unmodified, followed by the $\, which was set to newline. The input is now double-spaced.

In fact, you actually do not need to set $\ to newline for every line; you can set it just once at the beginning of the program:

perl -pe 'BEGIN { $\ = "\n" }' file

This one-liner sets $\ to the newline character just once before Perl does anything in the BEGIN code block. The BEGIN block is a special code block that is executed before everything else in a Perl program. Here’s what the expanded Perl program looks like, and it works exactly the same way as the previous one-liner:

BEGIN { $\ = "\n" }
while (<>) {
} continue {
    print or die "-p failed: $!\n";
}

Here is another way to double-space a file. This one-liner appends another newline character at the end of each line and then prints the line:

perl -pe '$_ .= "\n"' file

This one-liner is equivalent to

while (<>) {
    $_ = $_ . "\n"
} continue {
    print or die "-p failed: $!\n";
}

Writing $_ = $_ . "\n" is the same as writing $_ .= "\n". This expression simply concatenates $_ with "\n". (The period (.) is the string concatenation operator.)

But probably the cleanest way to double-space a file is to use the substitution operator s:

perl -pe 's/$/\n/' file

This one-liner replaces the regular expression $ that matches the end of a line with a newline, effectively adding a newline at the end.

If you’re running Perl 5.10 or later, you can use the say operator. The say operator acts much like print, but it always adds a newline at the end of the line. In Perl 5.10, this same one-liner can be written like this:

perl -nE 'say' file

The -E command-line argument works exactly the same way as the -e command-line argument, but it also enables Perl 5.10 features, including the say operator. The -n argument is similar to -p, but you have to print the line yourself. (I explain the -n argument in more detail in one-liner 2.6.) This one-liner prints the line, followed by another newline that’s appended by the say operator.

For example, if a file contains four lines:

line1
line2
line3
line4

running any of these one-liners outputs the following:

line1
line2
line3
line4

In these first few examples, I passed a filename as the last argument to the one-liners. When I do that, the one-liners operate on the contents of that file. If I didn’t pass a filename to the one-liners, they’d operate on the data from the standard input. From now on I won’t specify a file at the end of the one-liners, but you can always add it back if you want to run the one-liners on files. When writing one-liners, it’s a good idea to quickly test if they’re correct by typing something directly to the standard input. Then when you’re sure the one-liner works, you can pass one or more filenames at the end.

Again, don’t forget about Perl’s handy documentation system, perldoc. Just type perldoc perlrun at the command line to display information about how to run Perl and all the command-line arguments.
```

### 8.2.2 Triple-space a file

```text
You can also triple-space a file simply by outputting more newlines at the end of each line:

perl -pe '$\ = "\n\n"'

Or

perl -pe '$_ .= "\n\n"'

Or

perl -pe 's/$/\n\n/'

These one-liners are similar to the first one-liner in this chapter, except that two newlines are appended after each line.
```

### 8.2.3 N-space a file

```text
perl -pe '$_ .= "\n"x7'

This one-liner inserts seven newlines after each line. Notice how I’ve used "\n" x 7 to repeat the newline character seven times. The x operator repeats the value on the left N times.

For example, the line

perl -e 'print "foo"x5'

prints foofoofoofoofoo.

As a side note, sometimes when you need to generate a certain amount of data, the x operator comes in really handy. For example, to generate 1KB of data, you could do this:

perl -e 'print "a"x1024'

This one-liner prints the a character 1024 times.
```

### 8.2.4 Add a blank line before every line

```text
perl -pe 's/^/\n/'

This one-liner uses the s/regex/replace/ operator. It substitutes the given regular expression with the replacement. In this one-liner, the operator is s/^/\n/, the regular expression is ^, and the replacement is \n. The ^ pattern matches the beginning position of the text, and the s operator replaces it with \n, a newline. As a result, the newline character is inserted before the line. To insert something else before the line, simply replace \n with the bit to be inserted.
```

### 8.2.5 Remove all blank lines

```text
perl -ne 'print unless /^$/'

This one-liner uses the -n flag, which tells Perl to assume a different loop, other than -p, around the program:

while (<>) {
    # your program goes here
}

Compare this loop to the one that Perl assumes when you specify -p, and you’ll see that this loop has no continue { print or die } part. In this loop, each line is read by the diamond operator <> and is placed in the special variable $_, but it’s not printed! You have to print the line yourself—a useful feature if you want to print, modify, or delete lines selectively.

In this one-liner, the code is print unless /^$/, so the entire Perl program becomes

while (<>) {
    print unless /^$/
}

Unraveling this a bit further, you get this:

while (<>) {
    print $_ unless $_ =~ /^$/
}

This one-liner prints all nonblank lines. (You saw the /^$/ regular expression in one-liner 2.2 on page 11.)

This one-liner also removes all blank lines:

perl -lne 'print if length'

This one-liner uses the -l command-line argument, which automatically chomps the input line (basically removes the newline at the end) and appends it back at the end of the line when printing. The code specified to the -e argument is 'print if length', which says “print the line if it has some length.” Empty lines have a length of 0, so they’re not printed (0 is a false value in Perl, so the if length condition evaluates to false). All other lines have length and are printed. Without -l, the string would still have the newline at the end and thus be 1 or 2 characters long![1]

Here’s another one-liner to remove all blank lines:

perl -ne 'print if /\S/'

This one-liner behaves slightly differently from the previous two. Both print unless /^$/ and print if length also print the lines that consist of only spaces and/or tabs. Such lines appear to be empty to the eye, and you may want to filter them. This one-liner uses \S (explained in one-liner 2.2 on page 11), a regular expression sequence that matches nonblank characters. Lines containing only spaces and/or tabs don’t match \S and therefore are not printed.

As you can see, you can write the same program in many different ways. In fact, Perl’s motto is There’s More Than One Way To Do It, which is abbreviated as TIMTOWTDI and pronounced “Tim Toady.” (Fun trivia: Larry Wall, the inventor of Perl, uses the handle @TimToady on Twitter and IRC.)
```

### 8.2.6 Remove all consecutive blank lines, leaving only one

```text
perl -00 -pe ''

This one-liner is really tricky, isn’t it? First, it doesn’t have any code! The -e is empty. Next, it has a silly -00 command-line option that turns paragraph slurp mode on, meaning Perl reads text paragraph by paragraph, rather than line by line. (A paragraph is text between two or more newlines.) The paragraph is put into $_, and the -p option prints it out.

You can even write this in a shorter fashion:

perl -00pe0

Here, the code specified to -e is 0, which does nothing.

This is one of my favorite one-liners because if you haven’t seen it before, it can be tricky to figure out, and I love mind games. (There’s no code specified to -e! How can it possibly do something?)
```

### 8.2.7 Compress/expand all blank lines into N consecutive lines

```text
Say you have a file with two blank lines after each paragraph, and you wish to expand the line spacing between the paragraphs to three lines. To do so, you can simply combine one-liners 2.4 and 2.7 like this:

perl -00 -pe '$_ .= "\n"x2'

This one-liner slurps lines paragraph-wise via the -00 option and then appends three newline characters after each paragraph. The code "\n"x2 prints two newlines, which are added to the blank line already at the end of the paragraph.

In a similar vein, you can also reduce the spacing between paragraphs. Say you’ve got a file that for some crazy reason has ten blank lines between paragraphs, and you want to compress these blank lines to just three. You can use the same one-liner again!
```

### 8.2.8 Double-space between all words

```text
perl -pe 's/ /  /g'

Here, you use the substitution operator s to replace one space “ ” with two spaces “ ” globally on each line (the /g flag makes the replacement global), and you’re done. It’s that simple!

Here’s an example. Let’s say you have this line of text:

this line doesn't have enough whitespace!

Running this one-liner increases the spacing between words:

this  line  doesn't  have  enough  whitespace!
```

### 8.2.9 Remove all spacing between words

```text
perl -pe 's/ +//g'

This one-liner uses the “+” regular expression to match one or more spaces. When it finds a match, it substitutes it with nothing, globally, which deletes all spaces between words.

If you also want to get rid of tabs and other special characters that might add spacing, use the \s+ regular expression, which means “match a space, a tab, a vertical tab, a newline, or a carriage return”:

perl -pe 's/\s+//g'

Here’s an example. Let’s say you have this line of text:

this line has too much whitespace said cowboy neal

Running this one-liner removes all spaces:

thislinehastoomuchwhitespacesaidcowboyneal
```

### 8.2.10 Change all spacing between words to one space

```text
perl -pe 's/ +/ /g'

This one-liner is similar to the previous one, except that it replaces one or more spaces with just one space.

For example, if you have this line:

this   line has really           messed-up                    spacing

running this one-liner normalizes the spacing between words to one space:

this line has really messed-up spacing
```

### 8.2.11 Insert a space between all characters

```text
perl -lpe 's// /g'

Here you match seemingly nothing and replace it with a single space. The nothingness actually means “match between characters,” with the result that you insert a space between all characters. (The matching includes the beginning and end of the text.)

For example, given this line:

today was a great day

running this one-liner produces this result:

t o d a y   w a s   a   g r e a t   d a y

It might be difficult to see where all the spaces are added, so let’s illustrate that by modifying this one-liner to insert a colon between all characters:

perl -lpe 's//:/g'

This will output:

:t:o:d:a:y: :w:a:s: :a: :g:r:e:a:t: :d:a:y:

As you can see, spaces (or colons) are also inserted at the beginning and end of the text. Also note that the existing spaces count as characters, so they’re triple-spaced.


		8.2.12
```
