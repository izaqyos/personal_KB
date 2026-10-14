---
type: reference
title: List and arrays
description: "Subsection 2.3 of Learning Perl, 5th Edition."
tags: [kb-perl]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "perl/KB_perl#2.3"
---

# 2.3 List and arrays

[↑ Learning Perl, 5th Edition](/perl/kb-perl/02-learning-perl-5th-edition/README.md)

```text
	If a scalar is the "singular" in Perl, as we described it at the beginning of Chapter 2, the "plural" in Perl is represented by lists and arrays.

A list is an ordered collection of scalars. An array is a variable that contains a list. In Perl, the two terms are often used as if they're interchangeable. But, to be accurate, the list is the data, and the array is the variable. You can have a list value that isn't in an array, but every array variable holds a list (although that list may be empty). 

Each element of an array or list is a separate scalar variable with an independent scalar value. These values are orderedthat is, they have a particular sequence from the first to the last element. The elements of an array or list are indexed by small integers starting at zero[62] and counting by ones, so the first element of any array or list is always element zero.

    [62] Array and list indices always start at zero in Perl, unlike in some other languages. In early Perl, it was possible to change the starting number of array and list indexing (not for just one array or list, but for all of them at once!). Larry later realized that this was a misfeature, and its (ab)use is now strongly discouraged. But, if you're terminally curious, look up the $[ variable in the perlvar manpage.

Since each element is an independent scalar value, a list or array may hold numbers, strings, undef values, or any mixture of different scalar values. Nevertheless, it's most common to have all elements of the same type, such as a list of book titles (all strings) or a list of cosines (all numbers).

Arrays and lists can have any number of elements. The smallest one has no elements, while the largest can fill all of the available memory. Once again, this is in keeping with Perl's philosophy of "no unnecessary limits."
```

### 2.3.1 Accessing Elements of an Array

```text
If you've used arrays in another language, you won't be surprised to find that Perl provides a way to subscript an array in order to refer to an element by a numeric index.

The array elements are numbered using sequential integers, beginning at zero and increasing by one for each element, like this:

$fred[0] = "yabba";
$fred[1] = "dabba";
$fred[2] = "doo";


The array name itself (in this case, "fred") is from a completely separate namespace than scalars use; you could have a scalar variable named $fred in the same program, and Perl will treat them as different things and wouldn't be confused.[*] (Your maintenance programmer might be confused, though, so don't capriciously make all of your variable names the same!)

    [*] The syntax is always unambiguoustricky perhaps, but unambiguous.

You can use an array element like $fred[2] in every place[dagger] where you could use any other scalar variable like $fred. For example, you can get the value from an array element or change that value by the same sorts of expressions we used in the previous chapter:

    [dagger] Well, almost. The most notable exception is that the control variable of a foreach loop, which you'll see later in this chapter, must be a simple scalar. And there are others, like the "indirect object slot" and "indirect filehandle slot" for print and printf.

print $fred[0];
$fred[2]  = "diddley";
$fred[1] .= "whatsis";


Of course, the subscript may be any expression that gives a numeric value. If it's not an integer already, it'll automatically be truncated to the next lower integer:

$number = 2.71828;
print $fred[$number - 1]; # Same as printing $fred[1]


If the subscript indicates an element that would be beyond the end of the array, the corresponding value will be undef. This is just as with ordinary scalars; if you've never stored a value into the variable, it's undef:

$blank = $fred[ 142_857 ]; # unused array element gives undef
$blanc = $mel;             # unused scalar $mel also gives undef
```

### 2.3.2 Special Array Indices

```text
If you store into an array element that is beyond the end of the array, the array is automatically extended as neededthere's no limit on its length, as long as there's available memory for Perl to use. If Perl needs to create the intervening elements, it creates them as undef values:

$rocks[0]  = 'bedrock';      # One element...
$rocks[1]  = 'slate';        # another...
$rocks[2]  = 'lava';         # and another...
$rocks[3]  = 'crushed rock'; # and another...
$rocks[99] = 'schist';       # now there are 95 undef elements


Sometimes, you need to find out the last element index in an array. For the array of rocks that we've just been using, the last element index is $#rocks.[*] That's not the same as the number of elements, though, because there's an element number zero:

    [*] Blame this ugly syntax on the C shell. Fortunately, you don't have to look at this very often in the real world.

$end = $#rocks;                  # 99, which is the last element's index
$number_of_rocks = $end + 1;     # okay, but you'll see a better way later
$rocks[ $#rocks ] = 'hard rock'; # the last rock


Using the $#name value as an index, like that last example, happens often enough that Larry has provided a shortcut: negative array indices count from the end of the array. But don't get the idea that these indices "wrap around." If you've got three elements in the array, the valid negative indices are -1 (the last element), -2 (the middle element), and -3 (the first element). In the real world, nobody seems to use any of these except -1, though.

$rocks[ -1 ]   = 'hard rock';   # easier way to do that last example
$dead_rock     = $rocks[-100];  # gets 'bedrock'
$rocks[ -200 ] = 'crystal';     # fatal error!
```

### 2.3.3 List Literals

```text
An array (the way you represent a list value within your program) is a list of comma-separated values enclosed in parentheses. These values form the elements of the list. For example:

(1, 2, 3)      # list of three values 1, 2, and 3
(1, 2, 3,)     # the same three values (the trailing comma is ignored)
("fred", 4.5)  # two values, "fred" and 4.5
( )            # empty list - zero elements
(1..100)       # list of 100 integers


That last one uses the .. range operator, which is seen here for the first time. That operator creates a list of values by counting from the left scalar up to the right scalar by ones. For example:

(1..5)            # same as (1, 2, 3, 4, 5)
(1.7..5.7)        # same thing - both values are truncated
(5..1)            # empty list - .. only counts "uphill"
(0, 2..6, 10, 12) # same as (0, 2, 3, 4, 5, 6, 10, 12)
($m..$n)          # range determined by current values of $m and $n
(0..$#rocks)      # the indices of the rocks array from the previous section

					  


As you can see from those last two items, the elements of a list literal are not necessarily constants, they can be expressions that will be newly evaluated each time the literal is used. For example:

($m, 17)       # two values: the current value of $m, and 17
($m+$o, $p+$q) # two values


Of course, a list may have any scalar values, like this typical list of strings:

("fred", "barney", "betty", "wilma", "dino")
```

#### 2.3.3.1 The qw Shortcut

```text
It turns out that lists of simple words (like the previous example) are frequently needed in Perl programs. The qw shortcut makes it easy to generate them without typing a lot of extra quote marks:

qw( fred barney betty wilma dino ) # same as above, but less typing


qw stands for "quoted words" or "quoted by whitespace," depending upon whom you ask. Either way, Perl treats it like a single-quoted string (so, you can't use \n or $fred inside a qw list as you would in a double-quoted string). The whitespace (characters like spaces, tabs, and newlines) will be discarded, and whatever is left becomes the list of items. Since whitespace is discarded, here's another (but unusual) way to write that same list:

qw(fred
  barney     betty
wilma dino)  # same as above, but pretty strange whitespace


Since qw is a form of quoting, though, you can't put comments inside a qw list.

The previous two examples have used parentheses as the delimiter, but Perl actually lets you choose any punctuation character as the delimiter. Here are some of the common ones:

qw! fred barney betty wilma dino !
qw/ fred barney betty wilma dino /
qw# fred barney betty wilma dino #   # like in a comment!
qw( fred barney betty wilma dino )
qw{ fred barney betty wilma dino }
qw[ fred barney betty wilma dino ]
qw< fred barney betty wilma dino >


As those last four show, sometimes the two delimiters can be different. If the opening delimiter is one of those "left" characters, the corresponding "right" character is the proper closing delimiter. Other delimiters use the same character for start and finish.

If you need to include the closing delimiter within the string as one of the characters, you probably picked the wrong delimiter. But even if you can't or don't want to change the delimiter, you can still include the character using the backslash:

qw! yahoo\! google ask msn ! # include yahoo! as an element


As in single-quoted strings, two consecutive backslashes contribute one single backslash to the item.

Now, although the Perl motto is There's More Than One Way To Do It, you may well wonder why anyone would need all of those different ways! Well, you'll see later that there are other kinds of quoting where Perl uses this same rule, and it can come in handy in many of those. But even here, it could be useful if you were to need a list of Unix filenames:

qw{
  /usr/dict/words
  /home/rootbeer/.ispell_english
}


That list would be quite inconvenient to read, write, and maintain if the slash were the only delimiter available.
```

### 2.3.4 List Assignment

```text
		In much the same way as scalar values may be assigned to variables, list values may also be assigned to variables:

($fred, $barney, $dino) = ("flintstone", "rubble", undef);


All three variables in the list on the left get new values, just as if you did three separate assignments. Since the list is built up before the assignment starts, this makes it easy to swap two variables' values in Perl:[*]

    [*] As opposed to in languages like C, in which there is no easy way to do this in general. C programmers use an auxiliary swap variable to temporarily hold the value, possibly managed via a macro.

 ($fred, $barney) = ($barney, $fred); # swap those values
($betty[0], $betty[1]) = ($betty[1], $betty[0]);


But what happens if the number of variables (on the left side of the equals sign) isn't the same as the number of values (from the right side)? In a list assignment, extra values are silently ignored. Perl figures that if you wanted those values stored somewhere, you would have told it where to store them. Alternatively, if you have too many variables, the extras get the value undef:[*]

    [*] Well, that's true for scalar variables. Array variables get an empty list, as you'll see in a moment.


($fred, $barney) = qw< flintstone rubble slate granite >; # two ignored items
($wilma, $dino)  = qw[flintstone];                        # $dino gets undef

					  


Now that you can assign lists, you could build up an array of strings with a line of code like this:[dagger]

    [dagger] We're cheating by assuming that the rocks array is empty before this statement. If there were a value in $rocks[7], say, this assignment wouldn't affect that element.


($rocks[0], $rocks[1], $rocks[2], $rocks[3]) = qw/talc mica feldspar quartz/;

But when you wish to refer to an entire array, Perl has a simpler notation. Just use the at sign (@) before the name of the array (and no index brackets after it) to refer to the entire array at once. You can read this as "all of the," so @rocks is "all of the rocks."[double dagger] This works on either side of the assignment operator:

    [double dagger] Larry claims that he chose the dollar and at sign because they can be read as $calar (scalar) and @rray (array). If you don't get that, or remember it that way, no big deal.

@rocks  = qw/ bedrock slate lava /;
@tiny   = ( );                       # the empty list
@giant  = 1..1e5;                    # a list with 100,000 elements
@stuff  = (@giant, undef, @giant);   # a list with 200,001 elements
$dino   = "granite";
@quarry = (@rocks, "crushed rock", @tiny, $dino);


That last assignment gives @quarry the five-element list (bedrock, slate, lava, crushed rock, granite), since @tiny contributes zero elements to the list. (In particular, it doesn't put an undef item into the listbut you could do that explicitly, as we did with @stuff earlier.) It's also worth noting that an array name is replaced by the list it contains. An array doesn't become an element in the list because these arrays can contain only scalars, not other arrays.[||] The value of an array variable that has not yet been assigned is ( ), the empty list. Just as new, empty scalars start out with undef, new, empty arrays start out with the empty list.

    [||] But in the Alpaca book, we'll show you a special kind of scalar called a reference. That lets us make what are informally called "lists of lists," among other interesting and useful structures. But in that case, you're still not really storing a list into a list; you're storing a reference to an array.

It's worth noting that when an array is copied to another array, it's still a list assignment. The lists are simply stored in arrays. For example:

@copy = @quarry; # copy a list from one array to another
```

#### 2.3.4.1 The pop and push Operators

```text
You could add new items to the end of an array by simply storing them as elements with new, larger indices. But real Perl programmers don't use indices.[*] So in the next few sections, we'll present some ways to work with an array without using indices.

    [*] Of course, we're joking. But there's a kernel of truth in this joke. Indexing into arrays is not using Perl's strengths. If you use the pop, push, and similar operators that avoid using indexing, your code will generally be faster than if you use many indices, as well as avoiding "off-by-one" errors, often called "fencepost" errors. Occasionally, a beginning Perl programmer (wanting to see how Perl's speed compares to C's) will take, say, a sorting algorithm optimized for C (with many array index operations), rewrite it straightforwardly in Perl (again, with many index operations) and wonder why it's so slow. The answer is that using a Stradivarius violin to pound nails should not be considered a sound construction technique.

One common use of an array is as a stack of information, where new values are added to and removed from the right side of the list. (This is the end with the "last" items in the array, the end with the highest index values.) These operations occur often enough to have their own special functions.

The pop operator takes the last element off of an array and returns it:

@array  = 5..9;
$fred   = pop(@array);  # $fred gets 9, @array now has (5, 6, 7, 8)
$barney = pop @array;   # $barney gets 8, @array now has (5, 6, 7)
pop @array;             # @array now has (5, 6). (The 7 is discarded.)


That last example uses pop "in a void context," which is merely a fancy way of saying the return value isn't going anywhere. There's nothing wrong with using pop in this way, if that's what you want.

If the array is empty, pop will leave it alone (since there is no element to remove), and it will return undef.

You may have noticed that pop may be used with or without parentheses. This is a general rule in Perl: as long as you don't change the meaning by removing the parentheses, they're optional.[dagger] The converse operation is push, which adds an element (or a list of elements) to the end of an array:

    [dagger] A reader from the educated class will recognize that this is a tautology.

push(@array, 0);      # @array now has (5, 6, 0)
push @array, 8;       # @array now has (5, 6, 0, 8)
push @array, 1..10;   # @array now has those ten new elements
@others = qw/ 9 0 2 1 0 /;
push @array, @others; # @array now has those five new elements (19 total)


Note that the first argument to push or the only argument for pop must be an array variable. pushing and popping would not make sense on a literal list.
```

#### 2.3.4.2 The shift and unshift Operators

```text
The push and pop operators do things to the end of an array (or the right side of an array, or the portion with the highest subscripts, depending upon how you like to think of it). Similarly, the unshift and shift operators perform the corresponding actions on the "start" of the array (or the "left" side of an array, or the portion with the lowest subscripts). Here are a few examples:
Code View: Scroll / Show All

@array = qw# dino fred barney #;
$m = shift(@array);      # $m gets "dino", @array now has ("fred", "barney")
$n = shift @array;       # $n gets "fred", @array now has ("barney")
shift @array;            # @array is now empty
$o = shift @array;       # $o gets undef, @array is still empty
unshift(@array, 5);      # @array now has the one-element list (5)
unshift @array, 4;       # @array now has (4, 5)
@others = 1..3;
unshift @array, @others; # @array now has (1, 2, 3, 4, 5)

					  


Analogous to pop, shift returns undef if given an empty array variable.
```

### 2.3.5 Interpolating Arrays into Strings

```text
		Like scalars, array values may be interpolated into a double-quoted string. Elements of an array are automatically separated by spaces[*] upon interpolation:

    [*] Actually, the separator is the value of the special $" variable, which is a space by default.

@rocks = qw{ flintstone slate rubble };
print "quartz @rocks limestone\n";  # prints five rocks separated by spaces


There are no extra spaces added before or after an interpolated array; if you want those, you'll have to put them in yourself:

print "Three rocks are: @rocks.\n";
print "There's nothing in the parens (@empty) here.\n";


If you forget that arrays interpolate like this, you'll be surprised when you put an email address into a double-quoted string:

$email = "fred@bedrock.edu";  # WRONG! Tries to interpolate @bedrock


Although we intended to have an email address, Perl sees the array named @bedrock and tries to interpolate it. Depending on our version of Perl, we'll probably just get a warning:[dagger]

    [dagger] Some Perl versions before 5.6 actually made this a fatal error, but it was changed to a warning because that was too annoying.

Possible unintended interpolation of @bedrock


To get around this problem, we either escape the @ in a double-quoted string or use a single-quoted string:

$email = "fred\@bedrock.edu"; # Correct
$email = 'fred@bedrock.edu';  # Another way to do that


A single element of an array will be replaced by its value, just as you'd expect:

@fred = qw(hello dolly);
$y = 2;
$x = "This is $fred[1]'s place";    # "This is dolly's place"
$x = "This is $fred[$y-1]'s place"; # same thing


Note that the index expression is evaluated as an ordinary expression, as if it were outside a string. It is not variable-interpolated first. In other words, if $y contains the string "2*4", we're still talking about element 1, not element 7, because "2*4" as a number (the value of $y used in a numeric expression) is just plain 2.[*] If you want to follow a simple scalar variable with a left square bracket, you need to delimit the square bracket so that it isn't considered part of an array reference, as follows:

    [*] Of course, if you've got warnings turned on, Perl is likely to remind you that "2*4" is a pretty funny looking number.

@fred = qw(eating rocks is wrong);
$fred = "right";               # we are trying to say "this is right[3]"
print "this is $fred[3]\n";    # prints "wrong" using $fred[3]
print "this is ${fred}[3]\n";  # prints "right" (protected by braces)
print "this is $fred"."[3]\n"; # right again (different string)
print "this is $fred\[3]\n";   # right again (backslash hides it)

"
```

### 2.3.6 The foreach Control Structure

```text
		It's handy to be able to process an entire array or list, so Perl provides a control structure to do just that. The foreach loop steps through a list of values, executing one iteration (time through the loop) for each value:

foreach $rock (qw/ bedrock slate lava /) {
  print "One rock is $rock.\n";  # Prints names of three rocks
}


The control variable ($rock in that example) takes on a new value from the list for each iteration. The first time through the loop, it's "bedrock"; the third time, it's "lava".

The control variable is not a copy of the list element, it actually is the list element. That is, if you modify the control variable inside the loop, you'll be modifying the element itself, as shown in the following code snippet. This is useful, and supported, but it would surprise you if you weren't expecting it.

@rocks = qw/ bedrock slate lava /;
foreach $rock (@rocks) {
  $rock = "\t$rock";       # put a tab in front of each element of @rocks
  $rock .= "\n";           # put a newline on the end of each
}
print "The rocks are:\n", @rocks; # Each one is indented, on its own line


What is the value of the control variable after the loop has finished? It's the same as it was before the loop started. Perl automatically saves and restores the value of the control variable of a foreach loop. While the loop is running, there's no way to access or alter that saved value. So after the loop is done, the variable has the value it had before the loop, or undef if it hadn't had a value. That means that if you want to name your loop control variable $rock, you don't have to worry that maybe you've already used that name for another variable.
```

#### 2.3.6.1 Perl's Favorite Default: $_

```text
If you omit the control variable from the beginning of the foreach loop, Perl uses its favorite default variable, $_. This is (mostly) just like any other scalar variable, except for its unusual name. For example:

foreach (1..10) {  # Uses $_ by default
  print "I can count to $_!\n";
}


Although this isn't Perl's only default by a long shot, it's Perl's most common default. You'll see many other cases in which Perl will automatically use $_ when you don't tell it to use some other variable or value, thereby saving the programmer from the heavy labor of having to think up and type a new variable name. So as not to keep you in suspense, one of those cases is print, which will print $_ if given no other argument:

$_ = "Yabba dabba doo\n";
print;  # prints $_ by default
```

#### 2.3.6.2 The reverse Operator

```text
The reverse operator takes a list of values (which may come from an array) and returns the list in the opposite order. So if you were disappointed that the range operator, .., only counts upward, this is the way to fix it:

@fred   = 6..10;
@barney = reverse(@fred);  # gets 10, 9, 8, 7, 6
@wilma  = reverse 6..10;   # gets the same thing, without the other array
@fred   = reverse @fred;   # puts the result back into the original array


The last line is noteworthy because it uses @fred twice. Perl always calculates the value being assigned (on the right) before it begins the actual assignment.

Remember that reverse returns the reversed list; it doesn't affect its arguments. If the return value isn't assigned anywhere, it's useless:

reverse @fred;         # WRONG - doesn't change @fred
@fred = reverse @fred; # that's better
```

#### 2.3.6.3 The sort Operator

```text
The sort operator takes a list of values (which may come from an array) and sorts them in the internal character ordering. For ASCII strings, that would be ASCIIbetical order. Of course, ASCII is a strange place where all of the capital letters come before all of the lowercase letters, where the numbers come before the letters, and the punctuation markswell, those are here, there, and everywhere. But sorting in ASCII order is just the default behavior (you'll see in Chapter 14 how to sort in whatever order you'd like):

@rocks   = qw/ bedrock slate rubble granite /;
@sorted  = sort(@rocks);        # gets bedrock, granite, rubble, slate
@back    = reverse sort @rocks; # these go from slate to bedrock
@rocks   = sort @rocks;         # puts sorted result back into @rocks
@numbers = sort 97..102;        # gets 100, 101, 102, 97, 98, 99


As you can see from that last example, sorting numbers as if they were strings may not give useful results. But, of course, any string that starts with 1 has to sort before any string that starts with 9, according to the default sorting rules. And like what happened with reverse, the arguments themselves aren't affected. If you want to sort an array, you must store the result back into that array:

sort @rocks;          # WRONG, doesn't modify @rocks
@rocks = sort @rocks; # Now the rock collection is in order
```

### 2.3.7 Scalar and List Context

```text
This is the most important section in this chapter. In fact, it's the most important section in the entire book. It wouldn't be an exaggeration to say that your entire career in using Perl will depend upon understanding this section. So if you've gotten away with skimming the text up to this point, this is where you should really pay attention.

That's not to say that this section is in any way difficult to understand. It's actually a simple idea: a given expression may mean different things depending upon where it appears. This is nothing new to you; it happens all the time in natural languages. For example, in English,[*] suppose someone asked you what the word "read"[dagger] means. It has different meanings depending on how it's used. You can't identify the meaning until you know the context.

    [*] If you aren't a native speaker of English, this analogy may not be obvious to you. But context sensitivity happens in every spoken language, so you may be able to think of an example in your own language.

    [dagger] Or maybe they were asking what the word "red" means, if they were speaking rather than writing a book. It's ambiguous either way. As Douglas Hofstadter said, no language can express every thought unambiguously, especially this one.

The context refers to where an expression is found. As Perl is parsing your expressions, it always expects either a scalar value or a list value.[*] What Perl expects is called the context of the expression.[dagger]

    [*] Unless, of course, Perl is expecting something else entirely. There are other contexts that aren't covered here. In fact, nobody knows how many contexts Perl uses; the biggest brains in all of Perl haven't agreed on an answer to that yet.

    [dagger] This is no different than what you're used to in human languages. If I make a grammatical mistake, you notice it right away because you expect certain words in places certain. Eventually, you'll read Perl this way, too, but at first you have to think about it.

42 + something # The something must be a scalar
sort something # The something must be a list


Even if something is the exact same sequence of characters, in one case it may give a single, scalar value, while in the other, it may give a list.[double dagger] Expressions in Perl always return the appropriate value for their context. For example, take the "name"[||] of an array. In a list context, it gives the list of elements. But in a scalar context, it returns the number of elements in the array:

    [double dagger] The list may be just one element long, of course. It could also be empty, or it could have any number of elements.

    [||] Well, the true name of the array @people is just people. The @-sign is just a qualifier.

@people = qw( fred barney betty );
@sorted = sort @people; # list context: barney, betty, fred
$number = 42 + @people;  # scalar context: 42 + 3 gives 45


Even ordinary assignment (to a scalar or a list) causes different contexts:

@list = @people; # a list of three people
$n = @people;    # the number 3


But please don't jump to the conclusion that scalar context always gives the number of elements that would have been returned in list context. Most list-producing expressions[§] return something much more interesting than that.

    [§] But with regard to the point of this section, there's no difference between a "list-producing" expression and a "scalar-producing" one; any expression can produce a list or a scalar, depending upon context. So when we say "list-producing expressions," we mean expressions that are typically used in a list context and therefore might surprise you when they're used unexpectedly in a scalar context (like reverse or @fred).
```

#### 2.3.7.1 Using List-Producing Expressions in Scalar Context

```text
There are many expressions that would typically be used to produce a list. If you use one in a scalar context, what do you get? See what the author of that operation says about it. Usually, that person is Larry, and usually the documentation gives the whole story. In fact, a big part of learning Perl is actually learning how Larry thinks.[**] Therefore, once you can think like Larry does, you know what Perl should do. But while you're learning, you'll probably need to look into the documentation.

    [**] This is only fair, since while writing Perl he tried to think like you do to predict what you would want!

Some expressions don't have a scalar-context value at all. For example, what should sort return in a scalar context? You wouldn't need to sort a list to count its elements, so until someone implements something else, sort in a scalar context always returns undef.

Another example is reverse. In a list context, it gives a reversed list. In a scalar context, it returns a reversed string (or reversing the result of concatenating all the strings of a list, if given one):

@backwards = reverse qw/ yabba dabba doo /;
   # gives doo, dabba, yabba
$backwards = reverse qw/ yabba dabba doo /;
   # gives oodabbadabbay


At first, it's not always obvious whether an expression is being used in a scalar or a list context. But, trust us, it will become second nature for you eventually.

Here are some common contexts to start you off:

$fred = something;            # scalar context
@pebbles = something;         # list context
($wilma, $betty) = something; # list context
($dino) = something;          # still list context!


Don't be fooled by the one-element list; that last one is a list context, not a scalar one. The parentheses are significant here, making the fourth of those different than the first. If you're assigning to a list (no matter the number of elements), it's a list context. If you're assigning to an array, it's a list context.

Here are some other expressions you've seen, and the contexts they provide. First, some that provide scalar context to something:

$fred = something;
$fred[3] = something;
123 + something
something + 654
if (something) { ... }
while (something) { ... }
$fred[something] = something;


And here are some that provide a list context:

@fred = something;
($fred, $barney) = something;
($fred) = something;
push @fred, something;
foreach $fred (something) { ... }
sort something
reverse something
print something
```

#### 2.3.7.2 Using Scalar-Producing Expressions in List Context

```text
Going this direction is straightforward: if an expression doesn't normally have a list value, the scalar value is automatically promoted to make a one-element list:

@fred = 6 * 7; # gets the one-element list (42)
@barney = "hello" . ' ' . "world";


Well, there's one possible catch:

@wilma = undef; # OOPS! Gets the one-element list (undef)
  # which is not the same as this:
@betty = ( );    # A correct way to empty an array


Since undef is a scalar value, assigning undef to an array doesn't clear the array. The better way to do that is to assign an empty list.[*]

    [*] Well, in most real-world algorithms, if the variable is declared in the proper scope, you will not need to explicitly empty it. So this type of assignment is rare in well-written Perl programs. You'll learn about scoping in the next chapter.
```

#### 2.3.7.3 Forcing Scalar Context

```text
On occasion, you may need to force scalar context where Perl is expecting a list. In that case, you can use the fake function scalar. It's not a true function because it just tells Perl to provide a scalar context:

@rocks = qw( talc quartz jade obsidian );
print "How many rocks do you have?\n";
print "I have ", @rocks, " rocks!\n";        # WRONG, prints names of rocks
print "I have ", scalar @rocks, " rocks!\n"; # Correct, gives a number


Oddly enough, there's no corresponding function to force list context. It turns out you never need it. Trust us on this, too.
```

### 2.3.8 <STDIN> in List Context

```text
One previously seen operator that returns a different value in an array context is the line-input operator, <STDIN>. As described earlier, <STDIN> returns the next line of input in a scalar context. Now, in list context, this operator returns all of the remaining lines up to the end of file. Each line is returned as a separate element of the list. For example:

@lines = <STDIN>; # read standard input in list context


When the input is coming from a file, this will read the rest of the file. But how can there be an end-of-file when the input comes from the keyboard? On Unix and similar systems, including Linux and Mac OS X, you'll normally type a Control-D[dagger] to indicate to the system that there's no more input; the special character itself is never seen by Perl,[*] even though it may be echoed to the screen. On DOS/Windows systems, use Control-Z instead.[dagger] You'll need to check the documentation for your system or ask your local expert if it's different from these.

    [dagger] This is merely the default; it can be changed by the stty command. But it's pretty dependablewe've never seen a Unix system where a different character was used to mean end-of-file from the keyboard.

    [*] It's the OS that "sees" the Control key and reports "end of file" to the application.

    [dagger] There's a bug affecting some ports of Perl for DOS/Windows where the first line of output to the terminal following the use of Control-Z is obscured. On these systems, you can work around this problem by simply printing a blank line ("\n") after reading the input.

If the person running the program types three lines, then presses the proper keys needed to indicate end-of-file, the array ends up with three elements. Each element will be a string that ends in a newline, corresponding to the three newline-terminated lines entered.

Wouldn't it be nice if, having read those lines, you could chomp the newlines all at once? It turns out that if you give chomp an array holding a list of lines, it will remove the newlines from each item in the list. For example:

@lines = <STDIN>; # Read all the lines
chomp(@lines);    # discard all the newline characters


But the more common way to write that is with code similar to what we used earlier:

chomp(@lines = <STDIN>); # Read the lines, not the newlines


Although you're welcome to write your code either way in the privacy of your own cubicle, most Perl programmers will expect the second, more compact, notation.

It may be obvious to you (but it's not obvious to everyone) that once these lines of input have been read, they can't be re-read.[double dagger] Once you've reached end-of-file, there's no more input out there to read.

    [double dagger] Well, yes, if the input is from a source upon which you can seek, you'll be able to go back and read again. But that's not what we're talking about here.

And what happens if the input is coming from a 400 MB logfile? The line input operator reads all of the lines, gobbling up lots of memory.[||] Perl tries not to limit you in what you can do, but the other users of your system (not to mention your system administrator) are likely to object. If the input data is large, you should generally find a way to deal with it without reading it all into memory at once.

    [||] Typically, that's much more memory than the size of the file, too. That is, a 400 MB file will typically take up at least a full gigabyte of memory when read into an array. This is because Perl will generally waste memory to save time. This is a good tradeoff: if you're short of memory, you can buy more; if you're short on time, you're hosed.
```

### 2.3.9 Exercises

```text
#

[6] Write a program that reads a list of strings on separate lines until end-of-input and prints out the list in reverse order. If the input comes from the keyboard, you'll probably need to signal the end of the input by pressing Control-D on Unix, or Control-Z on Windows.
#

[12] Write a program that reads a list of numbers (on separate lines) until end-of-input and then prints for each number the corresponding person's name from the list shown below. (Hardcode this list of names into your program. That is, it should appear in your program's source code.) For example, if the input numbers were 1, 2, 4, and 2, the output names would be fred, betty, dino, and betty:

fred betty barney dino wilma pebbles bamm-bamm


#

[8] Write a program that reads a list of strings (on separate lines) until end-of-input. Then it should print the strings in ASCIIbetical order. That is, if you enter the strings fred, barney, wilma, betty, the output should show barney betty fred wilma. Are all of the strings on one line in the output or on separate lines? Could you make the output appear in either style?

My answers at: /cygdrive/c/work/KB/perl/learning_perl_5_edition_examples/basic
ex_2_3_9_1.pl
```
