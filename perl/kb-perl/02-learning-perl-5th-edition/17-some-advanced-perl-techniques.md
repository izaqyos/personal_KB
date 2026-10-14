---
type: reference
title: Some Advanced Perl Techniques
description: "Learning Perl chapter 17: advanced techniques such as trapping errors with eval and list picking."
tags: [perl, book-notes, error-handling, tutorial, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "perl/KB_perl#2.17"
---

# 2.17 Some Advanced Perl Techniques

[↑ Learning Perl, 5th Edition](/perl/kb-perl/02-learning-perl-5th-edition/README.md)

### 2.17.1 Trapping Errors with eval

```text
What we've put in this book so far is the core of Perl, the part that every Perl user should understand. But there are a few other techniques that, while not obligatory, are still valuable tools to have in your toolbox. We've gathered the most important of those for this chapter.

Don't be misled by the title of the chapter, though; the techniques here aren't necessarily more difficult to understand than what we have elsewhere. They are "advanced" merely in the sense that they aren't necessary for beginners. The first time you read this book, you may want to skip (or skim) this chapter, so you can get right to using Perl. Come back to it a month or two later, when you're ready to get even more out of Perl. Consider this entire chapter a huge footnote.[353]

    [353] We contemplated doing that in one of the drafts but got firmly rejected by O'Reilly's editors.
```

#### 2.17.1.1 Trapping Errors with eval

```text
Sometimes, your ordinary, everyday code can cause a fatal error in your program. Each of these typical statements could crash a program:

$barney = $fred / $dino;         # divide-by-zero error?

print "match\n" if /^($wilma)/;  # illegal regular expression error?

open CAVEMAN, $fred              # user-generated error from die?
  or die "Can't open file '$fred' for input: $!";


You could go to some trouble to catch some of these, but it's hard to get them all. (How could you check the string $wilma from that example to ensure that it makes a valid regular expression?) Fortunately, Perl provides a simple way to catch fatal errorswrap the code in an eval block:

eval { $barney = $fred / $dino } ;


Now, even if $dino is zero, that line won't crash the program. The eval is actually an expression (not a control structure, like while or foreach), so that semicolon is required at the end of the block.

When a normally fatal error happens during the execution of an eval block, the block is done running, but the program doesn't crash. So that means that right after an eval finishes, you'll want to know whether it exited normally or whether it caught a fatal error for you. The answer is in the special $@ variable. If the eval caught a fatal error, $@ will hold what would have been the program's dying words, perhaps something like: Illegal division by zero at my_program line 12. If there was no error, $@ will be empty. Of course, that means that $@ is a useful Boolean (true/false) value (true if there was an error), so you'll sometimes see code like this after an eval block:

print "An error occurred: $@" if $@;


The eval block is a true block, so it makes a new scope for lexical (my) variables. This piece of a program shows an eval block hard at work:

foreach my $person (qw/ fred wilma betty barney dino pebbles /) {
  eval {
    open FILE, "<$person"
      or die "Can't open file '$person': $!";

    my($total, $count);

    while (<FILE>) {
      $total += $_;
      $count++;
    }

    my $average = $total/$count;
    print "Average for file $person was $average\n";

    &do_something($person, $average);
  };

  if ($@) {
    print "An error occurred ($@), continuing\n";
  }
}


How many possible fatal errors are being trapped here? If there is an error in opening the file, that error is trapped. Calculating the average may divide by zero so that error is trapped. Even the call to the mysteriously named &do_something subroutine will be protected against fatal errors because an eval block traps any otherwise fatal errors that occur during the time that it's active. (This feature is handy if you have to call a subroutine written by someone else, and you don't know whether they've coded defensively enough to avoid crashing your program.)

If an error occurs during the processing of one of the files, we'll get an error message, but the program will go on to the next file without further complaint.

You can nest eval blocks inside other eval blocks. The inner one traps errors while it runs, keeping them from reaching the outer blocks. (Of course, after the inner eval finishes, if it caught an error, you may wish to repost the error by using die, thereby letting the outer eval catch it.) An eval block traps any errors that occur during its execution, including errors that happen during subroutine calls (as you saw in the example earlier).

We mentioned earlier that the eval is an expression, which is why the trailing semicolon is needed after the closing curly brace. But since it's an expression, it has a return value. If there's no error, it's like a subroutine: the return value is the last expression evaluated, or it's returned early with an optional return keyword. Here's another way to do the math without having to worry about divide-by-zero:

my $barney = eval { $fred / $dino };


If the eval traps a fatal error, the return value is either undef or an empty list, depending upon the context. So in the previous example, $barney is either the correct result from dividing, or it's undef; we don't really need to check $@ (although it's probably a good idea to check defined($barney) before we use it further).

There are four kinds of problems that eval can't trap. The first group are the very serious errors that crash Perl itself, such as running out of memory or getting an untrapped signal. Since Perl itself isn't running, there's no way it can trap these errors.[*] Of course, syntax errors inside the eval block are caught at compile timethey're never returned in $@.

    [*] Some of these errors are listed with an (X) code on the perldiag manpage, if you're curious.

The exit operator terminates the program at once, even if it's called from a subroutine inside an eval block. (This correctly implies that when writing a subroutine, you should use die rather than exit to signal when something goes wrong.)

The fourth and final kind of problem that an eval block can't trap are warnings, either user-generated ones (from warn) or Perl's internally generated warnings (requested with the -w command-line option or the use warnings pragma). There's a separate mechanism from eval for trapping warnings; see the discussion of the__WARN__ pseudosignal in the Perl documentation for the details.

We should also mention that there's another form of eval that can be dangerous if it's mishandled. In fact, you'll sometimes run across someone who will say that you shouldn't use eval in your code for security reasons. They're (mostly) right that eval should be used only with great care, but they're talking about the other form of eval, sometimes called "eval of a string." If the keyword eval is followed directly by a block of code in curly braces, as we're doing here, there's no need to worrythat's the safe kind of eval.
```

### 2.17.2 Picking Items from a List with grep

```text
Sometimes you'll want only certain items from a list. Maybe you'll want only the odd numbers selected from a list of numbers, or maybe only the lines mentioning Fred from a file of text. As you'll see in this section, picking some items from a list can be done simply with the grep  operator.

Let's try that first one and get the odd numbers from a large list of numbers. We don't need anything new to do that:

my @odd_numbers;

foreach (1..1000) {
  push @odd_numbers, $_ if $_ % 2;
}


That code uses the modulus operator (%), which you saw in Chapter 2. If a number is even, that number "mod two" gives zero, which is false. But an odd number will give one; since that's true, only the odd numbers will be pushed onto the array.

Now, there's nothing wrong with that code as it standsexcept that it's a little longer to write and slower to run than it might be, since Perl provides the grep operator:

my @odd_numbers = grep { $_ % 2 } 1..1000;


That line gets a list of 500 odd numbers in one quick line of code. How does it work? The first argument to grep is a block that uses $_ as a placeholder for each item in the list, and returns a Boolean (true/false) value. The remaining arguments are the list of items to search through. The grep operator will evaluate the expression once for each item in the list, much as our original foreach loop did. For the ones where the last expression of the block returns a true value, that element is included in the list that results from grep.

While the grep is running, $_ is aliased to one element of the list after another. You've seen this behavior before, in the foreach loop. It's generally a bad idea to modify $_ inside the grep expression because this will damage the original data.

The grep operator shares its name with a classic Unix utility that picks matching lines from a file by using regular expressions. We can do that with Perl's grep, which is much more powerful. Here we pull only the lines mentioning fred from a file:

my @matching_lines = grep { /\bfred\b/i } <FILE>;


There's a simpler syntax for grep, too. If all you need for the selector is a simple expression (rather than a whole block), you can just use that expression, followed by a comma, in place of the block. Here's the simpler way to write that latest example:

my @matching_lines = grep /\bfred\b/i, <FILE>;
```

### 2.17.3 Transforming Items from a List with map

```text
Another common task is transforming items from a list. For example, suppose we have a list of numbers that should be formatted as "money numbers" for output, as with the subroutine &big_money (from Chapter 14). But we don't want to modify the original data; we need a modified copy of the list just for output. Here's one way to do that:

my @data = (4.75, 1.5, 2, 1234, 6.9456, 12345678.9, 29.95);
my @formatted_data;

foreach (@data) {
  push @formatted_data, &big_money($_);
}


That looks similar in form to the example code used at the beginning of the section on grep, doesn't it? So it may not surprise you that the replacement code resembles the first grep example:

my @data = (4.75, 1.5, 2, 1234, 6.9456, 12345678.9, 29.95);

my @formatted_data = map { &big_money($_) } @data;


The map operator looks much like grep because it has the same kind of arguments: a block that uses $_, and a list of items to process. And it operates in a similar way, evaluating the block once for each item in the list, with $_ aliased to a different original list element each time. But the last expression of the block is used differently; instead of giving a Boolean value, the final value actually becomes part of the resulting list.[*] Any grep or map statement could be rewritten as a foreach loop pushing items onto a temporary array. But the shorter way is typically more efficient and more convenient. Since the result of map or grep is a list, it can be passed directly to another function. Here we can print that list of formatted "money numbers" as an indented list under a heading:

    [*] One other important difference is that the expression used by map is evaluated in a list context and may return any number of items, not necessarily one each time.

print "The money numbers are:\n",
  map { sprintf("%25s\n", $_) } @formatted_data;


Of course, we could have done that processing all at once, without even the temporary array @formatted_data:

my @data = (4.75, 1.5, 2, 1234, 6.9456, 12345678.9, 29.95);
print "The money numbers are:\n",
  map { sprintf("%25s\n", &big_money($_) ) } @data;


As we saw with grep, there's also a simpler syntax for map. If all you need for the selector is a simple expression (rather than a whole block), you can just use that expression, followed by a comma, in place of the block:

print "Some powers of two are:\n",
  map "\t" . ( 2 ** $_ ) . "\n", 0..15;
```

### 2.17.4 Unquoted Hash Keys

```text
Perl offers many shortcuts that can help programmers. Here's a handy one: you may omit the quote marks on some hash keys.

Of course, you can't omit the quote marks on just any key, since a hash key may be any arbitrary string. But keys are often simple. If the hash key is made up of nothing but letters, digits, and underscores without starting with a digit, you may be able to omit the quote marks. This kind of simple string without quote marks is called a bareword, since it stands alone without quotes.

One place you are permitted to use this shortcut is the most common place a hash key appears: in the curly braces of a hash element reference. For example, instead of $score{"fred"}, you could write simply $score{fred}. Since many hash keys are simple like this, not using quotes is a real convenience. But beware: if there's anything inside the curly braces besides a bareword, Perl will interpret it as an expression.

Another place where hash keys appear is when assigning an entire hash using a list of key-value pairs. The big arrow (=>) is especially useful between a key and a value because (again, only if the key is a bareword) the big arrow quotes it for you:

# Hash containing bowling scores
my %score = (
  barney   => 195,
  fred     => 205,
  dino     => 30,
);


This is the one important difference between the big arrow and a comma; a bareword to the left of the big arrow is implicitly quoted. (Whatever is on the right is left alone, though.) You don't have to use this feature of the big arrow only for hashes, although that's the most frequent use.
```

### 2.17.5 Slices

```text
It often happens that we need to work with only a few elements from a given list. For example, the Bedrock Library keeps information about their patrons in a large file.[*] Each line in the file describes one patron with six colon-separated fields: a person's name, library card number, home address, home phone number, work phone number, and number of items currently checked out. A little bit of the file looks something like this:

    [*] It should really be a full-featured database rather than a flat file. They plan to upgrade their system, right after the next Ice Age.

fred flintstone:2168:301 Cobblestone Way:555-1212:555-2121:3
barney rubble:709918:3128 Granite Blvd:555-3333:555-3438:0


One of the library's applications needs only the card numbers and number of items checked out; it doesn't use any of the other data. It could use code something like this to get only the fields it needs:

while (<FILE>) {
  chomp;
  my @items = split /:/;
  my($card_num, $count) = ($items[1], $items[5]);
  ...  # now work with those two variables
}


But the array @items isn't needed for anything else; it seems like a waste.[*] Maybe it would be better to assign the result of split to a list of scalars, like this:

    [*] It's not much of a waste, really. But stay with us. All of these techniques are used by programmers who don't understand slices, so it's worthwhile to see all of them here.

my($name, $card_num, $addr, $home, $work, $count) = split /:/;


Well, that avoids the unneeded array @itemsbut now we have four scalar variables that we didn't really need. For this situation, some people used to make up a number of dummy variable names, like $dummy_1, that showed that they really didn't care about that element from the split. But Larry thought that that was too much trouble, so he added a special use of undef. If an item in a list being assigned to is undef, that means simply to ignore the corresponding element of the source list:

my(undef, $card_num, undef, undef, undef, $count) = split /:/;


Is this any better? Well, it has the advantage that there aren't any unneeded variables. But it has the disadvantage that you have to count undefs to tell which element is $count. And this becomes quite unwieldy if there are more elements in the list. For example, some people who wanted just the mtime value from stat were writing code like this:

my(undef, undef, undef, undef, undef, undef, undef,
  undef, undef, $mtime) = stat $some_file;


If you use the wrong number of undefs, you'll get the atime or ctime by mistake, and that's a tough one to debug. There's a better way: Perl can index into a list as if it were an array. This is a list slice. Here, since the mtime is item 9 in the list returned by stat,[dagger] we can get it with a subscript:

    [dagger] It's the tenth item, but the index number is 9, since the first item is at index 0. This is the same kind of zero-based indexing that we've used already with arrays.

my $mtime = (stat $some_file)[9];


Those parentheses are required around the list of items (in this case, the return value from stat). If you wrote it like this, it wouldn't work:

my $mtime = stat($some_file)[9];  # Syntax error!


A list slice has to have a subscript expression in square brackets after a list in parentheses. The parentheses holding the arguments to a function call don't count.

Going back to the Bedrock Library, the list we're working with is the return value from split. We can now use a slice to pull out item 1 and item 5 with subscripts:

my $card_num = (split /:/)[1];
my $count = (split /:/)[5];


Using a scalar-context slice like this (pulling just a single element from the list) isn't bad, but it would be more efficient and simpler if we didn't have to do the split twice. So let's not do it twice; let's get both values at once by using a list slice in list context:

my($card_num, $count) = (split /:/)[1, 5];


The indices pull out element 1 and element 5 from the list, returning those as a two-element list. When that's assigned to the two my variables, we get exactly what we wanted. We do the slice just once, and we set the two variables with a simple notation.

A slice is often the simplest way to pull a few items from a list. Here, we can pull just the first and last items from a list, using the fact that index -1 means the last element:[*]

    [*] Sorting a list merely to find the extreme elements isn't likely to be the most efficient way. But Perl's sort is fast enough that this is generally acceptable, as long as the list doesn't have more than a few hundred elements.

my($first, $last) = (sort @names)[0, -1];


The subscripts of a slice may be in any order and may even repeat values. This example pulls 5 items from a list of 10:

my @names = qw{ zero one two three four five six seven eight nine };
my @numbers = ( @names )[ 9, 0, 2, 1, 0 ];
print "Bedrock @numbers\n";  # says Bedrock nine zero two one zero
```

#### 2.17.5.1 Array Slice

```text
That previous example could be made even simpler. When slicing elements from an array (as opposed to a list), the parentheses aren't needed. So we could have done the slice like this:

my @numbers = @names[ 9, 0, 2, 1, 0 ];


This isn't merely a matter of omitting the parentheses; this is actually a different notation for accessing array elements: an array slice. Earlier (in Chapter 3), we said that the at sign on @names meant "all of the elements." Actually, in a linguistic sense, it's more like a plural marker, much like the letter "s" in words like "cats" and "dogs." In Perl, the dollar sign means there's just one of something, but the at sign means there's a list of items.

A slice is always a list, so the array slice notation uses an at sign to indicate that. When you see something like @names[ ... ] in a Perl program, you'll need to do just as Perl does and look at the at sign at the beginning as well as the square brackets at the end. The square brackets mean that you're indexing into an array, and the at sign means that you're getting a whole list[*] of elements, not just a single one (which is what the dollar sign would mean). See Figure 17-1.

    [*] Of course, when we say "a whole list," that doesn't necessarily mean more elements than onethe list could be empty, after all.

Figure 17-1. Array slices versus single elements


The punctuation mark at the front of the variable reference (either the dollar sign or at sign) determines the context of the subscript expression. If there's a dollar sign in front, the subscript expression is evaluated in a scalar context to get an index. But if there's an at sign in front, the subscript expression is evaluated in a list context to get a list of indices.

So we see that @names[ 2, 5 ] means the same list as ($names[2], $names[5]) does. If you want that list of values, you can simply use the array slice notation. Any place you might want to write the list, you can instead use the simpler array slice.

But the slice can be used in one place where the list can'ta slice may be interpolated directly into a string:

my @names = qw{ zero one two three four five six seven eight nine };
print "Bedrock @names[ 9, 0, 2, 1, 0 ]\n";


If we were to interpolate @names, that would give all of the items from the array, separated by spaces. If instead we interpolate @names[ 9, 0, 2, 1, 0 ], that gives just those items from the array, separated by spaces.[dagger] Let's go back to the Bedrock Library for a moment. Maybe now our program is updating Mr. Slate's address and phone number in the patron file because he just moved into a large new place in the Hollyrock Hills. If we've got a list of information about him in @items, we could do something like this to update just those two elements of the array:

    [dagger] More accurately, the items of the list are separated by the contents of Perl's $" variable, whose default is a space. This should not normally be changed. When interpolating a list of values, Perl internally does join $", @list, where @list stands in for the list expression.

my $new_home_phone = "555-6099";
my $new_address = "99380 Red Rock West";
@items[2, 3] = ($new_address, $new_home_phone);


Once again, the array slice makes a more compact notation for a list of elements. In this case, that last line is the same as an assignment to ($items[2], $items[3]), but more compact and efficient.
```

#### 2.17.5.2 Hash Slice

```text
In a way exactly analogous to an array slice, we can also slice some elements from a hash in a hash slice. Remember when three of our characters went bowling, and we kept their bowling scores in the %score hash? We could pull those scores with a list of hash elements or with a slice. These two techniques are equivalent (although the second is more concise and efficient):

my @three_scores = ($score{"barney"}, $score{"fred"}, $score{"dino"});

my @three_scores = @score{ qw/ barney fred dino/ };


A slice is always a list, so the hash slice notation uses an at sign to indicate that.[*] When you see something like @score{ ... } in a Perl program, you'll need to do just as Perl does and look at the at sign at the beginning as well as the curly braces at the end. The curly braces mean that you're indexing into a hash; the at sign means that you're getting a whole list of elements, not just a single one (which is what the dollar sign would mean). See Figure 17-2.

    [*] If it sounds as if we're repeating ourselves here, it's because we want to emphasize that hash slices are analogous to array slices. If it sounds as if we're not repeating ourselves here, it's because we want to emphasize that hash slices are analogous to array slices.

Figure 17-2. Hash slices versus single elements


As you saw with the array slice, the punctuation mark at the front of the variable reference (either the dollar sign or at sign) determines the context of the subscript expression. If there's a dollar sign in front, the subscript expression is evaluated in a scalar context to get a single key.[*] But if there's an at sign in front, the subscript expression is evaluated in a list context to get a list of keys.

    [*] There's an exception you're not likely to run across, since it isn't used much in modern Perl code. See the entry for $; in the perlvar manpage.

It's normal at this point to wonder why there's no percent sign (%) here, when we're talking about a hash. That's the marker that means there's a whole hash; a hash slice (like any other slice) is always a list, not a hash.[dagger] In Perl, the dollar sign means there's just one of something, but the at sign means there's a list of items, and the percent sign means there's an entire hash.

    [dagger] A hash slice is a slice (not a hash) in the same way that a house fire is a fire (not a house), while a fire house is a house (not a fire). More or less.

As you saw with array slices, a hash slice may be used instead of the corresponding list of elements from the hash, anywhere within Perl. So we can set our friends' bowling scores in the hash (without disturbing any other elements in the hash) like this:

my @players = qw/ barney fred dino /;
my @bowling_scores = (195, 205, 30);
@score{ @players } = @bowling_scores;


That last line does the same thing as if we had assigned to the three-element list ($score{"barney"}, $score{"fred"}, $score{"dino"}).

A hash slice may be interpolated, too. Here, we print out the scores for our favorite bowlers:

print "Tonight's players were: @players\n";
print "Their scores were: @score{@players}\n";
```

### 2.17.6 Exercise

```text
See Appendix A for an answer to the following exercise:

   a.  [30] Make a program that reads a list of strings from a file, one string per line, and then lets the user interactively enter patterns that may match some of the strings. For each pattern, the program should tell how many strings from the file matched, then which ones those were. Don't reread the file for each new pattern; keep the strings in memory. The filename may be hardcoded in the file. If a pattern is invalid (for example, if it has unmatched parentheses), the program should simply report that error and let the user continue trying patterns. When the user enters a blank line instead of a pattern, the program should quit. (If you need a file full of interesting strings to try matching, try the file sample_text in the files you've surely downloaded by now from the O'Reilly web site; see the Preface.)
```
