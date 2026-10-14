---
type: reference
title: More Control Structures
description: "Subsection 2.10 of Learning Perl, 5th Edition."
tags: [kb-perl]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "perl/KB_perl#2.10"
---

# 2.10 More Control Structures

[↑ Learning Perl, 5th Edition](/perl/kb-perl/02-learning-perl-5th-edition/README.md)

```text
In this chapter, you'll see some alternative ways to write Perl code. For the most part, these techniques don't make the language more powerful, but they make it easier or more convenient to get the job done. You don't have to use these techniques in your own code, but don't be tempted to skip this chapteryou're certain to see these control structures in other people's code, sooner or later (in fact, you're absolutely certain to see these things in use by the time you finish reading this book).
```

### 2.10.1 The unless Control Structure

```text
In an if control structure, the block of code is executed only when the conditional expression is true. If you want to execute a block of code only when the conditional is false, change if to unless:

unless ($fred =~ /^[A-Z_]\w*$/i) {
  print "The value of \$fred doesn't look like a Perl identifier name.\n";
}


Using unless says to run the block of code unless this condition is true. It's just like using an if test with the opposite condition. Another way to say it is that it's like having the else clause on its own. That is, whenever you see an unless that you don't understand, you can rewrite it (either in your head or in reality) as an if test:

if ($fred =~ /^[A-Z_]\w*$/i) {
  # Do nothing
} else {
  print "The value of \$fred doesn't look like a Perl identifier name.\n";
}


It's no more or less efficient, and it should compile to the same internal byte codes. Or, another way to rewrite it would be to negate the conditional expression by using the negation operator (!):

if ( ! ($fred =~ /^[A-Z_]\w*$/i) ) {
  print "The value of \$fred doesn't look like a Perl identifier name.\n";
}


Generally, you should pick the way of writing code that makes the most sense to you, since that will probably make the most sense to your maintenance programmer. If it makes the most sense to write if with a negation, do that. More often, however, you'll probably find it natural to use unless.
```

#### 2.10.1.1 The else Clause with unless

```text
You could even have an else clause with an unless. While this syntax is supported, it's potentially confusing:

unless ($mon =~ /^Feb/) {
  print "This month has at least thirty days.\n";
} else {
  print "Do you see what's going on here?\n";
}


Some people may wish to use this, especially when the first clause is very short (perhaps only one line) and the second is several lines of code. But we'd make this one a negated if, or maybe simply swap the clauses to make a normal if:

if ($mon =~ /^Feb/) {
  print "Do you see what's going on here?\n";
} else {
  print "This month has at least thirty days.\n";
}


It's important to remember that you're always writing code for two readers: the computer that will run the code and the human being who has to keep the code working. If the human can't understand what you've written, pretty soon the computer won't be doing the right thing either.
```

### 2.10.2 The until Control Structure

```text
Sometimes you'll want to reverse the condition of a while loop. To do that, just use until:

until ($j > $i) {
  $j *= 2;
}


This loop runs until the conditional expression returns true. But it's really just a while loop in disguise, except that this one repeats as long as the conditional is false, rather than true. The conditional expression is evaluated before the first iteration, so this is still a zero-or-more-times loop, just like the while loop.[236] As with if and unless, you could rewrite any until loop to become a while loop by negating the condition. But generally, you'll find it simple and natural to use until from time to time.

    [236] Pascal programmers, take note: in Pascal, the repeat-until always runs at least one iteration, but an until loop in Perl may not run at all, if the conditional expression is true before the loop starts.
```

### 2.10.3 Expression Modifiers

```text
In order to have a more compact notation, an expression may be followed by a modifier that controls it. For example, the if modifier works in a way analogous to an if block:

print "$n is a negative number.\n" if $n < 0;


That gives exactly the same result as if we had used this code, except that we saved some typing by leaving out the parentheses and curly braces:[*]

    [*] We also left out the linebreaks. But we should mention that the curly-brace form does create a new scope. In the rare case that you need the full details, check the documentation.

if ($n < 0) {
  print "$n is a negative number.\n";
}


As we've said, Perl folks generally like to avoid typing. And the shorter form reads in English: print this message if $n is less than zero.

Notice that the conditional expression is still evaluated first, even though it's written at the end. This is backward from the usual left-to-right ordering; in understanding Perl code, you'll have to do as Perl's internal compiler does, and read to the end of the statement before you can tell what it's really doing.

There are other modifiers as well:

&error("Invalid input") unless &valid($input);
$i *= 2 until $i > $j;
print " ", ($n += 2) while $n < 10;
&greet($_) foreach @person;


These all work just as (we hope) you would expect. That is, each one could be rewritten in a similar way to rewriting the if-modifier example earlier. Here is one:

while ($n < 10) {
  print " ", ($n += 2);
}


The expression in parentheses inside the print argument list is noteworthy because it adds two to $n, storing the result back into $n. Then it returns that new value, which will be printed.

These shorter forms read almost like a natural language: call the &greet subroutine for each @person in the list. Double $i until it's larger than $j.[dagger] One of the common uses of these modifiers is in a statement like this one:

    [dagger] Well, it helps us to think of them like that.

print "fred is '$fred', barney is '$barney'\n"           if $I_am_curious;


By writing the code "in reverse" like this, you can put the important part of the statement at the beginning. The point of that statement is to monitor some variables; the point is not to check whether you're curious.[*] Some people prefer to write the whole statement on one line, perhaps with some tab characters before the if, to move it over toward the right margin, as we showed in the previous example, while others put the if modifier indented on a new line:

    [*] Of course, we made up the name $I_am_curious; it's not a built-in Perl variable. Generally, folks who use this technique will either call their variable $TRACING or use a constant declared with the constant pragma.

print "fred is '$fred', barney is '$barney'\n"
    if $I_am_curious;


Although you can rewrite any of these expressions with modifiers as a block (the "old-fashioned" way), the converse isn't necessarily true. Only a single expression is allowed on either side of the modifier. So you can't write something if something while something until something unless something foreach something, which would just be too confusing. And you can't put multiple statements on the left of the modifier. If you need more than just a simple expression on each side, just write the code the old-fashioned way, with the parentheses and curly braces.

As we mentioned in relation to the if modifier, the control expression (on the right) is always evaluated first, just as it would be in the old-fashioned form.

With the foreach modifier, there's no way to choose a different control variableit's always $_. Usually, that's no problem, but if you want to use a different variable, you'll need to rewrite it as a traditional foreach loop.
```

### 2.10.4 The Naked Block Control Structure

```text
The so-called naked block is one without a keyword or condition. That is, suppose you start with a while loop, which looks something like this:

while (condition) {
  body;
  body;
  body;
}


Now, take away the while keyword and the conditional expression, and you'll have a naked block:

{
  body;
  body;
  body;
}


The naked block is like a while or foreach loop, except that it doesn't loop; it just executes the body of the loop once, and it's done. It's an un-loop!

You'll see in a while that there are other uses for the naked block, but one of its features is that it provides a scope for temporary lexical variables:

{
  print "Please enter a number: ";
  chomp(my $n = <STDIN>);
  my $root = sqrt $n;  # calculate the square root
  print "The square root of $n is $root.\n";
}


In this block, $n and $root are temporary variables scoped to the block. As a general guideline, all variables should be declared in the smallest scope available. If you need a variable for just a few lines of code, you can put those lines into a naked block and declare the variable inside that block. Of course, if you would need the value of either $n or $root later, you would need to declare them in a larger scope.

You may have noticed the sqrt function in that code and wondered about ityes, it's a function we haven't shown before. Perl has many built-in functions that are beyond the scope of this book. When you're ready, check the perlfunc manpage to learn about more of them.
```

### 2.10.5 The elsif Clause

```text
Every so often, you may need to check a number of conditional expressions, one after another, to see which one of them is true. This can be done with the if control structure's elsif clause, as in this example:

if ( ! defined $dino) {
  print "The value is undef.\n";
} elsif ($dino =~ /^-?\d+\.?$/) {
  print "The value is an integer.\n";
} elsif ($dino =~ /^-?\d*\.\d+$/) {
  print "The value is a _simple_ floating-point number.\n";
} elsif ($dino eq '') {
  print "The value is the empty string.\n";
} else {
  print "The value is the string '$dino'.\n";
}


Perl will test the conditional expressions one after another. When one succeeds, the corresponding block of code is executed, and then the whole control structure is done,[*] and execution goes on to the rest of the program. If none has succeeded, the else block at the end is executed. (Of course, the else clause is still optional, but, in this case, it's often a good idea to include it.)

    [*] There's no "fall-through" to the next block, as in the "switch" structure of languages like C.

There's no limit to the number of elsif clauses, but remember that Perl has to evaluate the first 99 tests before it can get to the 100th. If you'll have more than half a dozen elsifs, you should consider whether there's a more efficient way to write it. The Perl FAQ (see the perlfaq manpage) has a number of suggestions for emulating the "case" or "switch" statements of other languages, and users of Perl 5.10 or later can use given-when, described in Chapter 15, as an alternative.

You may have noticed by this point that the keyword is spelled elsif, with only one e. If you write it as "elseif", with a second e, Perl will tell you that it is not the correct spelling. Why not? Because Larry says so.[*]

    [*] In fact, he resists any suggestion that it even be permitted as a valid alternative spelling. "If you want to spell it with a second e, it's simple. Step 1make up your own language. Step 2make it popular." When you make your own programming language, you can spell the keywords in any way you'd like. We hope that you will decide that yours shouldn't be the first to have an "elseunless."
```

### 2.10.6 Autoincrement and Autodecrement

```text
You'll often want a scalar variable to count up or down by one. Since these are frequent constructs, there are shortcuts for them, like nearly everything else we do frequently.

The autoincrement operator (++) adds one to a scalar variable, like the same operator in C and similar languages:

my $bedrock = 42;
$bedrock++;  # add one to $bedrock; it's now 43


Just like other ways of adding one to a variable, the scalar will be created if necessary:

my @people = qw{ fred barney fred wilma dino barney fred pebbles };
my %count;                     # new empty hash
$count{$_}++ foreach @people;  # creates new keys and values as needed


The first time through that foreach loop, $count{$_} is incremented. That's $count{"fred"}, which thus goes from undef (since it didn't previously exist in the hash) up to 1. The next time through the loop, $count{"barney"} becomes 1; after that, $count{"fred"} becomes 2. Each time through the loop, one element in %count is incremented, and possibly created as well. After that loop is done, $count{"fred"} is 3. This provides a quick and easy way to see which items are in a list and how many times each one appears.

Similarly, the autodecrement operator (--) subtracts one from a scalar variable:

$bedrock--;  # subtract one from $bedrock; it's 42 again
```

#### 2.10.6.1 The Value of Autoincrement

```text
You can fetch the value of a variable and change that value at the same time. Put the ++ operator in front of the variable name to increment the variable first and then fetch its value. This is a preincrement:

my $m = 5;
my $n = ++$m;  # increment $m to 6, and put that value into $n


Or put the -- operator in front to decrement the variable first and then fetch its value. This is a predecrement:

my $c = --$m;  # decrement $m to 5, and put that value into $c


Here's the tricky part. Put the variable name first to fetch the value first, and then do the increment or decrement. This is called a postincrement or postdecrement:

my $d = $m++;  # $d gets the old value (5), then increment $m to 6
my $e = $m--;  # $e gets the old value (6), then decrement $m to 5


It's tricky because we're doing two things at once. We're fetching the value, and we're changing it in the same expression. If the operator is first, we increment (or decrement) first, then use the new value. If the variable is first, we return its (old) value first, then do the increment or decrement. Another way to say it is that these operators return a value, but they also have the side effect of modifying the variable's value.

If you write these in an expression of their own,[*] not using the value but only the side effect, there's no difference[dagger] if you put the operator before or after the variable:

    [*] That is, in a void context.

    [dagger] Programmers who get inside the implementations of languages may expect that postincrement and postdecrement would be less efficient than their counterparts, but Perl's not like that. Perl automatically optimizes the post- forms when they're used in a void context.

$bedrock++;  # adds one to $bedrock
++$bedrock;  # just the same; adds one to $bedrock


A common use of these operators is in connection with a hash, to identify when an item has been seen before:

my @people = qw{ fred barney bamm-bamm wilma dino barney betty pebbles };
my %seen;

foreach (@people) {
  print "I've seen you somewhere before, $_!\n"
    if $seen{$_}++;
}


When barney shows up for the first time, the value of $seen{$_}++ is false, since it's the value of $seen{$_}, which is $seen{"barney"}, which is undef. But that expression has the side effect of incrementing $seen{"barney"}. When barney shows up again, $seen{"barney"} is now a true value, so the message is printed.
```

### 2.10.7 The for Control Structure

```text
Perl's for control structure is like the common for control structure you may have seen in other languages, such as C. It looks like this:

for (initialization; test; increment) {
  body;
  body;
}


To Perl, though, this kind of loop is really a while loop in disguise, something like this:[*]

    [*] Actually, the increment happens in a continue block, which is beyond the scope of this book. See the perlsyn manpage for the truth.

initialization;
while (test) {
  body;
  body;
  increment;
}


The most common use of the for loop, by far, is for making computed iterations:

for ($i = 1; $i <= 10; $i++) {  # count from 1 to 10
  print "I can count to $i!\n";
}


When you've seen these before, you'll know what the first line is saying even before you read the comment. Before the loop starts, the control variable, $i, is set to 1. Then, the loop is really a while loop in disguise, looping while $i is less than or equal to 10. Between each iteration and the next is the increment, which here is a literal increment, adding one to the control variable, which is $i.

So, the first time through this loop, $i is 1. Because that's less than or equal to 10, we see the message. Although the increment is written at the top of the loop, it logically happens at the bottom of the loop, after printing the message. So, $i becomes 2, which is less than or equal to 10, so we print the message again, and $i is incremented to 3, which is less than or equal to 10, and so on.

Eventually, we print the message that our program can count to 9. Then $i is incremented to 10, which is less than or equal to 10, so we run the loop one last time and print that our program can count to 10. Finally, $i is incremented for the last time, to 11, which is not less than or equal to 10. So control drops out of the loop, and we're on to the rest of the program.

All three parts are together at the top of the loop so that it's easy for an experienced programmer to read that first line and say, "Ah, it's a loop that counts $i from one to ten."

Note that after the loop is done, the control variable has a value "after" the loop. That is, in this case, the control variable has gone all the way to 11.[dagger] This loop is a very versatile loop; you can make it count in all sorts of ways. For example, we can count down from 10 to 1:

    [dagger] Obligatory This is Spinal Tap outdated pop-culture reference.

for ($i = 10; $i >= 1; $i--) {
  print "I can count down to $i\n";
}


And this loop counts from -150 to 1000 by threes:[*]

    [*] Of course, it never gets to 1000 exactly. The last iteration uses 999, since each value of $i is a multiple of three.

for ($i = -150; $i <= 1000; $i += 3) {
  print "$i\n";
}


In fact, you could make any of the three control parts (initialization, test, or increment) empty, if you wish, but you still need the two semicolons. In this (quite unusual) example, the test is a substitution, and the increment is empty:

for ($_ = "bedrock"; s/(.)//; ) {  # loops while the s/// is successful
  print "One character is: $1\n";
}


The test expression (in the implied while loop) is the substitution, which will return a true value if it succeeded. In this case, the first time through the loop, the substitution will remove the b from bedrock. Each iteration will remove another letter. When the string is empty, the substitution will fail, and the loop is done.

If the test expression (the one between the two semicolons) is empty, it's automatically true, making an infinite loop. But don't make an infinite loop like this until you see how to break out of such a loop, which we'll discuss later in this chapter:

for (;;) {
  print "It's an infinite loop!\n";
}


A more Perl-like way to write an intentional infinite loop, when you really want one,[dagger] is with while:

    [dagger] If you somehow made an infinite loop that's gotten away from you, see whether Control-C will halt it. It's possible that you'll get a lot of output even after typing Control-C, depending upon your system's I/O and other factors. Hey, we warned you.

while (1) {
  print "It's another infinite loop!\n";
}


Although C programmers are familiar with the first way, even a beginning Perl programmer should recognize that 1 is always true, making an intentional infinite loop, so the second is generally a better way to write it. Perl is smart enough to recognize a constant expression like that and optimize it away, so there's no difference in efficiency.
```

#### 2.10.7.1 The Secret Connection Between foreach and for

```text
It turns out that, inside the Perl parser, the keyword foreach is exactly equivalent to the keyword for. That is, any time Perl sees one of them, it's the same as if you had typed the other. Perl can tell which you meant by looking inside the parentheses. If you've got the two semicolons, it's a computed for loop (like we've just been talking about). If you don't have the semicolons, it's really a foreach loop:

for (1..10) {  # Really a foreach loop from 1 to 10
  print "I can count to $_!\n";
}


That's really a foreach loop, but it's written for. Except for that one example, all through this book, we'll spell out foreach wherever it appears. But in the real world, do you think that Perl folks will type those extra four letters?[*] Excepting only beginners' code, it's always written for, and you'll have to do as Perl does and look for the semicolons to tell which kind of loop it is.

    [*] If you think that, you haven't been paying attention. Among programmers, especially Perl programmers, laziness is one of the classic virtues. If you don't believe us, ask someone at the next Perl Mongers' meeting.

In Perl, the true foreach loop is almost always a better choice. In the foreach loop (written for) in that previous example, it's easy to see at a glance that the loop will go from 1 to 10. But do you see what's wrong with this computed loop that's trying to do the same thing? Don't peek at the answer in the footnote until you think you've found what's wrong:[dagger]

    [dagger] There are two and one-half bugs. First, the conditional uses a less-than sign, so the loop will run 9 times, instead of 10. It's easy to get a so-called fencepost bug with this kind of loop, like what happened when the rancher needed enough fenceposts to make a 30-meter-long fence with a post every 3 meters. (The answer is not 10 fenceposts.) Second, the control variable is $i, but the loop body is using $_. And second and a half, it's a lot more work to read, write, maintain, and debug this type of loop, which is why we say that the true foreach is generally a better choice in Perl.

for ($i = 1; $i < 10; $i++) {  # Oops! Something is wrong here!
  print "I can count to $_!\n";
}
```

### 2.10.8 Loop Controls

```text
As you've surely noticed by now, Perl is one of the so-called structured programming languages. In particular, there's just one entrance to any block of code, at the top of that block. But there are times when you may need more control or versatility than what we've shown so far. For example, you may need to make a loop like a while loop, but one that always runs at least once. Or maybe you need to occasionally exit a block of code early. Perl has three loop-control operators you can use in loop blocks to make the loop do all sorts of tricks.
```

#### 2.10.8.1 The last Operator (C's break)

```text
The last operator immediately ends execution of the loop. (If you've used the "break" operator in C or a similar language, it's like that.) It's the "emergency exit" for loop blocks. When you hit last, the loop is done. For example:

# Print all input lines mentioning fred, until the __END__ marker
while (<STDIN>) {
  if (/__END__/) {
    # No more input on or after this marker line
    last;
  } elsif (/fred/) {
    print;
  }
}
## last comes here #


Once an input line has the __END__ marker, that loop is done. Of course, that comment line at the end is merely a comment--it's not required in any way. We just threw that in to make it clearer what's happening.

There are five kinds of loop blocks in Perl. These are the blocks of for, foreach, while, until, or the naked block.[*] The curly braces of an if block or subroutine[dagger] don't qualify. As you may have noticed in the example above, the last operator applied to the entire loop block.

    [*] Yes, you can use last to jump out of a naked block. That's not exactly the same as jumping naked out into your block.

    [dagger] It's probably not a good idea, but you could use these loop control operators from inside a subroutine to control a loop that is outside the subroutine. That is, if a subroutine is called in a loop block, and the subroutine executes last when there's no loop block running inside the subroutine, the flow of control will jump to just after the loop block in the main code. This ability to use loop control from within a subroutine may go away in a future version of Perl, and no one is likely to miss it.

The last operator will apply to the innermost currently running loop block. To jump out of outer blocks, stay tuned; that's coming up in a little bit.
```

#### 2.10.8.2 The next Operator (C's continue)

```text
Sometimes you're not ready for the loop to finish, but you're done with the current iteration. That's what the next operator is good for. It jumps to the inside of the bottom of the current loop block.[double dagger] After next, control continues with the next iteration of the loop (much like the "continue" operator in C or a similar language):

    [double dagger] This is another of our many lies. In truth, next jumps to the start of the (usually omitted) continue block for the loop. See the perlsyn manpage for the full details.

# Analyze words in the input file or files
while (<>) {
  foreach (split) {  # break $_ into words, assign each to $_ in turn
    $total++;
    next if /\W/;    # strange words skip the remainder of the loop
    $valid++;
    $count{$_}++;    # count each separate word
    ## next comes here ##
  }
}

print "total things = $total, valid words = $valid\n";
foreach $word (sort keys %count) {
  print "$word was seen $count{$word} times.\n";
}


This one is a little more complex than most of our examples up to this point, so let's take it step by step. The while loop is reading lines of input from the diamond operator, one after another, into $_; you've seen that before. Each time through that loop, another line of input will be in $_.

Inside that loop, the foreach loop is iterating over the return value split. Do you remember the default for split with no arguments?[*] That splits $_ on whitespace, in effect breaking $_ into a list of words. Since the foreach loop doesn't mention some other control variable, the control variable will be $_. So, we'll see one word after another in $_.

    [*] If you don't remember it, don't worry too much. Don't waste any brain cells remembering things that you can look up with perldoc.
(Yosi, $ perldoc -f split)

But didn't we just say that $_ holds one line of input after another? Well, in the outer loop, that's what it is. But inside the foreach loop, it holds one word after another. It's no problem for Perl to reuse $_ for a new purpose; this happens all the time.

Now, inside the foreach loop, we're seeing one word at a time in $_. $total is incremented, so it must be the total number of words. But the next line (which is the point of this example) checks to see whether the word has any nonword characters--anything but letters, digits, and underscores. So, if the word is Tom's, or if it is full-sized, or if it has an adjoining comma, quote mark, or any other strange character, it will match that pattern and we'll skip the rest of the loop, going on to the next word.

But let's say that it's an ordinary word, like fred. In that case, we count $valid up by one, and also $count{$_}, keeping a count for each different word. So, when we finish the two loops, we've counted every word in every line of input from every file the user wanted us to use.

We're not going to explain the last few lines. By now, we hope you've got stuff like that down already.

Like last, next may be used in any of the five kinds of loop blocks: for, foreach, while, until, or the naked block. Also, if loop blocks are nested, next works with the innermost one. You'll see how to change that at the end of this section.
```

#### 2.10.8.3 The redo Operator

```text
The third member of the loop control triad is redo. It says to go back to the top of the current loop block, without testing any conditional expression or advancing to the next iteration. (If you've used C or a similar language, you've never seen this one before. Those languages don't have this kind of operator.) Here's an example:

# Typing test
my @words = qw{ fred barney pebbles dino wilma betty };
my $errors = 0;

foreach (@words) {
  ## redo comes here ##
  print "Type the word '$_': ";
  chomp(my $try = <STDIN>);
  if ($try ne $_) {
    print "Sorry - That's not right.\n\n";
    $errors++;
    redo;  # jump back up to the top of the loop
  }
}
print "You've completed the test, with $errors errors.\n";


Like the other two operators, redo will work with any of the five kinds of loop blocks, and it will work with the innermost loop block when they're nested.

The big difference between next and redo is that next will advance to the next iteration, but redo will redo the current iteration. Here's an example program that you can play with to get a feel for how these three operators work:[*]

    [*] If you've downloaded the example files from the O'Reilly web site (as described in the Preface), you'll find this program, called lnr-example.

foreach (1..10) {
  print "Iteration number $_.\n\n";
  print "Please choose: last, next, redo, or none of the above? ";
  chomp(my $choice = <STDIN>);
  print "\n";
  last if $choice =~ /last/i;
  next if $choice =~ /next/i;
  redo if $choice =~ /redo/i;
  print "That wasn't any of the choices... onward!\n\n";
}
print "That's all, folks!\n";


If you just press Return without typing anything (try it two or three times), the loop counts along from one number to the next. If you choose last when you get to number four, the loop is done, and you won't go on to number five. If you choose next when you're on four, you're on to number five without printing the "onward" message. And if you choose redo when you're on four, you're back to doing number four all over again.
```

#### 2.10.8.4 Labeled Blocks

```text
When you need to work with a loop block that's not the innermost one, use a label. Labels in Perl are like other identifiers--made of letters, digits, and underscores, but they can't start with a digit--however, since they have no prefix character, labels could be confused with the names of built-in function names, or even with your own subroutines' names. So, it would be a poor choice to make a label called print or if. Because of that, Larry recommends that they be all uppercase. That not only ensures that the label won't conflict with another identifier but it also makes it easy to spot the label in the code. In any case, labels are rare, only showing up in a small percentage of Perl programs.

To label a loop block, just put the label and a colon in front of the loop. Then, inside the loop, you may use the label after last, next, or redo as needed:

LINE: while (<>) {
  foreach (split) {
    last LINE if /__END__/;  # bail out of the LINE loop
    ...
  }
}


For readability, it's generally nice to put the label at the left margin, even if the current code is at a higher indentation. Notice that the label names the entire block; it's not marking a target point in the code.[*] In that previous snippet of sample code, the special __END__ token marks the end of all input. Once that token shows up, the program will ignore any remaining lines (even from other files).

    [*] This isn't goto, after all.

It often makes sense to choose a noun as the name of the loop.[dagger] That is, the outer loop is processing a line at a time, so we called it LINE. If we had to name the inner loop, we would have called it WORD, since it processes a word at a time. That makes it convenient to say things like "(move on to the) next WORD"or "redo (the current) LINE".

    [dagger] That is, it makes more sense to do that than not to do that. Perl doesn't care if you call your loop labels things like XYZZY or PLUGH. However, unless you were friendly with the Colossal Cave in the '70s, you might not get the reference.
    
    '
```

### 2.10.9 The Ternary Operator, ?:

```text
When Larry was deciding which operators to make available in Perl, he didn't want former C programmers to miss something that C had and Perl didn't, so he brought all of C's operators over to Perl.[double dagger] That meant bringing over C's most confusing operator: the ternary ?: operator. While it may be confusing, it can also be quite useful.

    [double dagger] Well, to be sure, he did leave out the ones that have no use in Perl, such as the operator that turns a number into the memory address of a variable. And he added several operators (like the string concatenation operator) that make C folks jealous of Perl.

The ternary operator is like an if-then-else test, all rolled into an expression. It is called a "ternary" operator because it takes three operands. It looks like this:

expression ? if_true_expr : if_false_expr


First, the expression is evaluated to see whether it's true or false. If it's true, the second expression is used; otherwise, the third expression is used. Every time, one of the two expressions on the right is evaluated, and one is ignored. That is, if the first expression is true, then the second expression is evaluated, and the third is ignored. If the first expression is false, then the second is ignored, and the third is evaluated as the value of the whole thing.

In this example, the result of the subroutine &is_weekend determines which string expression will be assigned to the variable:

my $location = &is_weekend($day) ? "home" : "work";


And here, we calculate and print out an averageor just a placeholder line of hyphens, if there's no average available:

my $average = $n ? ($total/$n) : "-----";
print "Average: $average\n";


You could always rewrite any use of the ?: operator as an if structure, often much less conveniently and less concisely:

my $average;
if ($n) {
  $average = $total / $n;
} else {
  $average = "-----";
}
print "Average: $average\n";


Here's a trick you might see used to code up a nice multiway branch:

my $size =
  ($width < 10) ? "small"  :
  ($width < 20) ? "medium" :
  ($width < 50) ? "large"  :
                  "extra-large"; # default


That is really just three nested ?: operators, and it works quite well, once you get the hang of it.

Of course, you're not obliged to use this operator. Beginners may wish to avoid it. But you'll see it in others' code, sooner or later, and we hope that one day you'll find a good reason to use it in your own programs.
```

### 2.10.10 Logical Operators

```text
As you might expect, Perl has all of the necessary logical operators needed to work with Boolean (true/false) values. For example, it's often useful to combine logical tests by using the logical AND operator (&&) and the logical OR operator (||):

if ($dessert{'cake'} && $dessert{'ice cream'}) {
  # Both are true
  print "Hooray! Cake and ice cream!\n";
} elsif ($dessert{'cake'} || $dessert{'ice cream'}) {
  # At least one is true
  print "That's still good...\n";
} else {
  # Neither is true - do nothing (we're sad)
}


There may be a shortcut. If the left side of a logical AND operation is false, the whole thing is false, since logical AND needs both sides to be true in order to return true. In that case, there's no reason to check the right side, so it will not even be evaluated. Consider what happens in this example if $hour is 3:

if ( (9 <= $hour) && ($hour < 17) ) {
  print "Aren't you supposed to be at work...?\n";
}


Similarly, if the left side of a logical OR operation is true, the right side will not be evaluated. Consider what happens here if $name is fred:

if ( ($name eq 'fred') || ($name eq 'barney') ) {
  print "You're my kind of guy!\n";
}


Because of this behavior, these operators are called "short-circuit" logical operators. They take a short circuit to the result whenever they can. In fact, it's fairly common to rely upon this short-circuit behavior. Suppose you need to calculate an average:

if ( ($n != 0) && ($total/$n < 5) ) {
  print "The average is below five.\n";
}


In that example, the right side will be evaluated only if the left side is true, so we can't accidentally divide by zero and crash the program.
```

#### 2.10.10.1 The Value of a Short-Circuit Operator

```text
Unlike what happens in C (and similar languages), the value of a short-circuit logical operator is the last part evaluated, not just a Boolean value. This provides the same result, in that the last part evaluated is always true when the whole thing should be true, and it's always false when the whole thing should be false.

But it's a much more useful return value. Among other things, the logical OR operator is quite handy for selecting a default value:

my $last_name = $last_name{$someone} || '(No last name)';


If $someone is not listed in the hash, the left side will be undef, which is false. So, the logical OR will have to look to the right side for the value, making the right side the default. In this idiom, the default value won't merely replace undef; it would replace any false value equally well. You could fix that with the ternary operator:

my $last_name = defined $last_name{$someone} ?
    $last_name{$someone} : '(No last name)';


That's too much work, and you had to say $last_name{$someone} twice. Perl 5.10 added a better way to do this, and it's the next section.
```

#### 2.10.10.2 The defined-or Operator

```text
In the previous section, you saw us use the || operator to give a default value. That ignored the special case; there the defined value was false but perfectly acceptable as a value. You then saw the uglier version using the ternary operator.

Perl 5.10 gets around this sort of bug with the defined-or operator, //, which short-circuits when it finds a defined value, no matter if that value on the lefthand side is true or false. Even if someone's last name is 0, this version still works:

use 5.010;

my $last_name = $last_name{$someone} // '(No last name)';


Sometimes you just want to give a variable a value if it doesn't already have one, and leave it alone if it does. Suppose you want to print messages only if you set the VERBOSE environment variable. You check the value for the VERBOSE key in the %ENV hash. If it doesn't have a value, you want to give it one:

use 5.010;

my $Verbose = $ENV{VERBOSE} // 1;
print "I can talk to you!\n" if $Verbose;


You can see this in action by trying several values with // to see which ones pass through to the default value:

use 5.010;

foreach my $try ( 0, undef, '0', 1, 25 ) {
    print "Trying [$try] ---> ";
    my $value = $try // 'default';
    say "\tgot [$value]";
    }


The output shows that you only get the default string when $try is undef:

Trying [0] --->     got [0]
Trying [] --->      got [default]
Trying [0] --->     got [0]
Trying [1] --->     got [1]
Trying [25] --->    got [25]


Sometimes you want to set a value when there isn't one already. For instance, when you have warnings enabled and try to print an undefined value, you get an annoying error:

use warnings;

my $name;  # no value, so undefined!
printf "%s", $name; # Use of uninitialized value in printf ...


Sometimes that error is harmless. You could just ignore it, but if you expect that you might try to print an undefined value, you can use the empty string instead:

use 5.010;
use warnings;

my $name;  # no value, so undefined!
printf "%s", $name // '';
```

#### 2.10.10.3 Control Structures Using Partial-Evaluation Operators

```text
The four operators that you've just seen&&, ||, //, and ?:all share a peculiar property: depending upon the value on the left side, they may or may not evaluate an expression. Sometimes the expression is evaluated, and sometimes it isn't. For that reason, these are sometimes called partial-evaluation operators, since they may not evaluate all of the expressions around them. And partial-evaluation operators are automatically control structures.[*] It's not as if Larry felt a burning need to add more control structures to Perl. But once he had decided to put these partial-evaluation operators into Perl, they automatically became control structures as well. After all, anything that can activate and deactivate a chunk of code is, by that very fact, a control structure.

    [*] Some of you were wondering why these logical operators are being covered in this chapter, weren't you?

Fortunately, you'll notice this only when the controlled expression has side effects, like altering a variable's value or causing some output. For example, suppose you ran across this line of code:

($m < $n) && ($m = $n);


Right away, you should notice that the result of the logical AND isn't being assigned anywhere.[dagger] Why not?

    [dagger] But don't forget to consider that it might be a return value, as the last expression in a subroutine.

If $m is really less than $n, the left side is true, so the right side will be evaluated, thereby doing the assignment. But if $m is not less than $n, the left side will be false, and thus the right side would be skipped. So that line of code would do essentially the same thing as this one, which is easier to understand:

if ($m < $n) { $m = $n }


Or maybe you'll be maintaining a program, and you'll see a line like this one:

($m > 10) || print "why is it not greater?\n";


If $m is really greater than 10, the left side is true, and the logical OR is done. But if it's not, the left side is false, and this will go on to print the message. Once again, this could (and probably should) be written in the traditional way, probably with if or unless.

If you have a particularly twisted brain, you might even learn to read these lines as if they were written in English. For example: check that $m is less than $n, and if it is, then do the assignment. Check that $m is more than 10, or if it's not, then print the message.

It's generally former C programmers or old-time Perl programmers who most often use these ways of writing control structures. Why do they do it? Some have the mistaken idea that these are more efficient. Some think these tricks make their code cooler. Some are merely copying what they saw someone else do.

In the same way, the ternary operator may be used for control. In this case, we want to assign $x to the smaller of two variables:

($m < $n) ? ($m = $x) : ($n = $x);


If $m is smaller, it gets $x. Otherwise, $n does.

There is another way to write the logical AND and logical OR operators. You may wish to write them out as words: and and or.[*] These word operators have the same behaviors as the ones written with punctuation, but the words are down at the bottom of the precedence chart. Since the words don't "stick" so tightly to the nearby parts of the expression, they may need fewer parentheses:

    [*] There are also the low-precedence not (like the logical-negation operator, !) and the rare xor.

$m < $n and $m = $n;  # but better written as the corresponding if


Then again, you may need more parentheses. Precedence is a bugaboo. Be sure to use parentheses to say what you mean, unless you're sure of the precedence. Nevertheless, since the word forms are very low precedence, you can generally understand that they cut the expression into big pieces, doing everything on the left first, and then (if needed) everything on the right.

Despite the fact that using logical operators as control structures can be confusing, sometimes they're the accepted way to write code. The idiomatic way of opening a file in Perl looks like this:

open CHAPTER, $filename
  or die "Can't open '$filename': $!";


By using the low-precedence short-circuit or operator, we're telling Perl that it should "open this file¿ or die!" If the open succeeds, returning a true value, the or is complete. But if it fails, the false value causes the or to evaluate the part on the right, which will die with a message.

So, using these operators as control structures is part of idiomatic PerlPerl as she is spoken. Used properly, they can make your code more powerful; otherwise, they can make your code unmaintainable. Don't overuse them.[*]

    [*] Using these weird forms (anything but or die) more than once per month counts as overuse.
```

### 2.10.11 Exercises

```text
# [25] Make a program that will repeatedly ask the user to guess a secret number from 1 to 100 until the user guesses the secret number. Your program should pick the number at random by using the magical formula int(1 + rand 100).[dagger] When the user guesses wrong, the program should respond "Too high" or "Too low." If the user enters the word quit or exit, or if the user enters a blank line, the program should quit. Of course, if the user guesses correctly, the program should quit then as well!

    [dagger] See what the perlfunc manpage says about int and rand if you're curious about these functions.

# [10] Modify the program from the previous exercise to print extra debugging information as it goes along, such as the secret number it chose. Make your change such that you can turn it off, but your program emits no warnings if you turn it off. If you are using Perl 5.10, use the // operator. Otherwise, use the ternary operator.
# [10] Modify the program from Exercise 3 in Chapter 6 (the environment lister) to print (undefined value) for environment variables without a value. You can set the new environment variables in the program. Ensure that your program reports the right thing for variables with a false value. If you are using Perl 5.10, use the // operator. Otherwise, use the ternary operator.


My answers at: /cygdrive/c/work/KB/perl/learning_perl_5_edition_examples/basic
guess_number.pl
print_env.pl
```
