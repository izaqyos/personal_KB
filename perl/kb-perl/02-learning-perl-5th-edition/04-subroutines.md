---
type: reference
title: Subroutines
description: "Learning Perl chapter 4: defining and invoking subroutines, return values and arguments."
tags: [perl, book-notes, tutorial, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "perl/KB_perl#2.4"
---

# 2.4 Subroutines

[↑ Learning Perl, 5th Edition](/perl/kb-perl/02-learning-perl-5th-edition/README.md)

```text
You've already seen and used some of the built-in system functions, such as chomp, reverse, print, and so on. But, as other languages do, Perl has the ability to make subroutines, which are user-defined functions.[90] These let us recycle one chunk of code many times in one program.[91] The name of a subroutine is another Perl identifier (letters, digits, and underscores, but it can't start with a digit) with a sometimes-optional ampersand (&) in front. There's a rule about when you can omit the ampersand and when you cannot; you'll see that rule by the end of the chapter. For now, we'll just use it every time that it's not forbidden, which is always a safe rule. We'll tell you every place where it's forbidden, of course.

    [90] In Perl, we don't generally make the distinction that Pascal programmers are used to, between functions, which return a value, and procedures, which don't. But a subroutine is always user-defined, while a function may or may not be. That is, the word function may be used as a synonym for subroutine, or it may mean one of Perl's built-in functions. That's why this chapter is titled Subroutines, because it's about the ones you can define, not the built-ins. Mostly.

        [91] The code examples used in this book are recycled from at least 40% post-consumer programming and are at least 75% recyclable into your programs when properly decomposed.

	The subroutine name comes from a separate namespace, so Perl won't be confused if you have a subroutine called &fred and a scalar called $fred in the same programal, though there's no reason to do that under normal circumstances.
```

### 2.4.1 Defining a Subroutine

```text
To define your own subroutine, use the keyword sub, the name of the subroutine (without the ampersand), then the indented block of code (in curly braces),[92] which makes up the body of the subroutine, something like this:

    [92] Okay, purists, we admit it: the curly braces are part of the block, properly speaking. And Perl doesn't require the indentation of the block, but your maintenance programmer will. So please be stylish.

    sub marine {
	      $n += 1;  # Global variable $n
		        print "Hello, sailor number $n!\n";
    }


Subroutine definitions can be anywhere in your program text, but programmers who come from a background of languages like C or Pascal like to put them at the start of the file. Others may prefer to put them at the end of the file so that the main part of the program appears at the beginning. It's up to you. In any case, you don't normally need any kind of forward declaration.[*] Subroutine definitions are global; without some powerful trickiness, there are no private subroutines.[dagger] If you have two subroutine definitions with the same name, the later one overwrites the earlier one.[double dagger] That's generally considered bad form, or the sign of a confused maintenance programmer.

    [*] Unless your subroutine is being particularly tricky and declares a "prototype," which dictates how a compiler will parse and interpret its invocation arguments. This is rare, see the perlsub manpage for more information.

        [dagger] If you wish to be powerfully tricky, read the Perl documentation about coderefs stored in private (lexical) variables.

	    [double dagger] A warnable offense, however.

	    As you may have noticed in the previous example, you may use any global variables within the subroutine body. In fact, all of the variables you've seen so far are globals; that is, they are accessible from every part of your program. This horrifies linguistic purists, but the Perl development team formed an angry mob with torches and ran them out of town years ago. You'll see how to make private variables in Section 4.5," later in this chapter.

	    "
```

### 2.4.2 Invoking a Subroutine

```text
Invoke a subroutine from within any expression by using the subroutine name (with the ampersand):[||]

	    [||] And frequently a pair of parentheses, even if empty. As written, the subroutine inherits the caller's @_ value, which we'll be discussing shortly. So don't stop reading here, or you'll be writing code with unintended effects!

	    &marine;  # says Hello, sailor number 1!
	    &marine;  # says Hello, sailor number 2!
	    &marine;  # says Hello, sailor number 3!
	    &marine;  # says Hello, sailor number 4!
```

### 2.4.3 Return Values

```text
The subroutine is always invoked as part of an expression, even if the result of the expression isn't being used. When we invoked &marine earlier, we were calculating the value of the expression containing the invocation, but then throwing away the result.

Many times, you'll call a subroutine and actually do something with the result. This means that you'll be paying attention to the return value of the subroutine. All Perl subroutines have a return valuethere's no distinction between those that return values and those that don't. Not all Perl subroutines have a useful return value, however.

Since all Perl subroutines can be called in a way that needs a return value, it'd be a bit wasteful to have to declare special syntax to "return" a particular value for the majority of the cases. So Larry made it simple. As Perl is chugging along in a subroutine, it is calculating values as part of its series of actions. Whatever calculation is last performed in a subroutine is automatically also the return value.

For example, let's define this subroutine:

sub sum_of_fred_and_barney {
	  print "Hey, you called the sum_of_fred_and_barney subroutine!\n";
	    $fred + $barney;  # That's the return value
}


The last expression evaluated in the body of this subroutine is the sum of $fred and $barney, so the sum of $fred and $barney will be the return value. Here's that in action:

$fred = 3;
$barney = 4;
$wilma = &sum_of_fred_and_barney;      # $wilma gets 7
print "\$wilma is $wilma.\n";
$betty = 3 * &sum_of_fred_and_barney;  # $betty gets 21
print "\$betty is $betty.\n";


That code will produce this output:

Hey, you called the sum_of_fred_and_barney subroutine!
$wilma is 7.
Hey, you called the sum_of_fred_and_barney subroutine!
$betty is 21.


That print statement is just a debugging aid, so that you can see that you called the subroutine. You'd take it out when the program is finished. But suppose you added another line to the end of the code, like this:

sub sum_of_fred_and_barney {
	  print "Hey, you called the sum_of_fred_and_barney subroutine!\n";
	    $fred + $barney;  # That's not really the return value!
		      print "Hey, I'm returning a value now!\n";      # Oops!
}


In this example, the last expression evaluated is not the addition; it's the print statement. Its return value will normally be 1, meaning "printing was successful,"[*] but that's not the return value you actually wanted. So be careful when adding additional code to a subroutine, since the last expression evaluated will be the return value.

    [*] The return value of print is true for a successful operation and false for a failure. You'll see how to determine the kind of failure later in the next chapter.

    So, what happened to the sum of $fred and $barney in that second (faulty) subroutine? We didn't put it anywhere, so Perl discarded it. If you had requested warnings, Perl (noticing that there's nothing useful about adding two variables and discarding the result) would likely warn you about something like "a useless use of addition in a void context." The term void context is just a fancy way of saying that the answer isn't being stored in a variable or used in any other way.

    "The last expression evaluated" really means the last expression evaluated, rather than the last line of text. For example, this subroutine returns the larger value of $fred or $barney:

    sub larger_of_fred_or_barney {
	      if ($fred > $barney) {
		          $fred;
			    } else {
				        $barney;
					  }
    }


The last expression evaluated is either $fred or $barney, so the value of one of those variables becomes the return value. You won't know whether the return value will be $fred or $barney until you see what those variables hold at runtime.

These are all rather trivial examples. It gets better when you can pass values that are different for each invocation into a subroutine instead of relying on global variables. In fact, that's coming right up.
```

### 2.4.4 Arguments

```text
That subroutine called larger_of_fred_or_barney would be much more useful if it didn't force you to use the global variables $fred and $barney. If you wanted to get the larger value from $wilma and $betty, you currently have to copy those into $fred and $barney before you can use larger_of_fred_or_barney. And if you had something useful in those variables, you'd have to first copy those to other variables, say $save_fred and $save_barney. And then, when you're done with the subroutine, you'd have to copy those back to $fred and $barney again.

Luckily, Perl has subroutine arguments. To pass an argument list to the subroutine, simply place the list expression, in parentheses, after the subroutine invocation, like this:

$n = &max(10, 15);  # This sub call has two parameters


The list is passed to the subroutine; that is, it's made available for the subroutine to use however it needs to. Of course, you have to store this list somewhere, so Perl automatically stores the parameter list (another name for the argument list) in the special array variable named @_ for the duration of the subroutine. The subroutine can access this variable to determine both the number of arguments and the value of those arguments.

This means that the first subroutine parameter is stored in $_[0], the second one is stored in $_[1], and so on. But, and here's an important note: these variables have nothing whatsoever to do with the $_ variable, any more than $dino[3] (an element of the @dino array) has to do with $dino (a completely distinct scalar variable). It's just that the parameter list must be stored into some array variable for the subroutine to use it, and Perl uses the array @_ for this purpose.

Now, you could write the subroutine &max to look a little like the subroutine &larger_of_fred_or_barney, but instead of using $fred you could use the first subroutine parameter ($_[0]), and instead of using $barney, you could use the second subroutine parameter ($_[1]). And so you could end up with code something like this:

sub max {
	  # Compare this to &larger_of_fred_or_barney
	  if ($_[0] > $_[1]) {
		      $_[0];
		        } else {
				    $_[1];
				      }
}


Well, as we said, you could do that. But it's pretty ugly with all of those subscripts, and hard to read, write, check, and debug, too. You'll see a better way in a moment.

There's another problem with this subroutine. The name &max is nice and short, but it doesn't remind us that this subroutine works properly only if called with exactly two parameters:

$n = &max(10, 15, 27);  # Oops!


Excess parameters are ignored, since the subroutine never looks at $_[2], Perl doesn't care whether there's something in there or not. And insufficient parameters are also ignored. you simply get undef if you look beyond the end of the @_ array, as with any other array. You'll see how to make a better &max, which works with any number of parameters, later in this chapter.

The @_ variable is private to the subroutine;[*] if there's a global value in @_, it is saved away before the subroutine is invoked and restored to its previous value upon return from the subroutine.[dagger] This also means that a subroutine can pass arguments to another subroutine without fear of losing its own @_ variable. the nested subroutine invocation gets its own @_ in the same way. Even if the subroutine calls itself recursively, each invocation gets a new @_, so @_ is always the parameter list for the current subroutine invocation.

    [*] Unless there's an ampersand in front of the name for the invocation, and no parentheses (or arguments) afterward, in which case the @_ array is inherited from the caller's context. That's generally a bad idea, but is occasionally useful.

        [dagger] You might recognize that this is the same mechanism as used with the control variable of the foreach loop, as seen in the previous chapter. In either case, the variable's value is saved and automatically restored by Perl.
```

### 2.4.5 Private Variables in Subroutines

```text
But if Perl can give us a new @_ for every invocation, can't it give us variables for our own use as well? Of course it can.

By default, all variables in Perl are global variables; that is, they are accessible from every part of the program. But you can create private variables called lexical variables at any time with the my operator:

sub max {
	  my($m, $n);       # new, private variables for this block
		    ($m, $n) = @_;    # give names to the parameters
		      if ($m > $n) { $m } else { $n }
}


These variables are private (or scoped) to the enclosing block; any other $m or $n is totally unaffected by these two. And that goes the other way, too--no other code can access or modify these private variables, by accident or design.[*] So, you could drop this subroutine into any Perl program in the world and know that you wouldn't mess up that program's $m and $n (if any).[dagger] It's also worth pointing out that, inside the if's blocks, there's no semicolon needed after the return value expression. Although Perl allows you to omit the last semicolon in a block, in practice you omit it only when the code is so simple that you can write the block in a single line.

    [*] Advanced programmers will realize that a lexical variable may be accessible by reference from outside its scope, but never by name.

        [dagger] Of course, if that program already had a subroutine called &max, you'd mess that up.

	The subroutine in the previous example could be made even simpler. Did you notice that the list ($m, $n) was written twice? That my operator can also be applied to a list of variables enclosed in parentheses, so it's customary to combine those first two statements in the subroutine:

	my($m, $n) = @_;  # Name the subroutine parameters


	That one statement creates the private variables and sets their values, so the first parameter now has the easier-to-use name $m and the second has $n. Nearly every subroutine will start with a line much like that one, naming its parameters. When you see that line, you'll know that the subroutine expects two scalar parameters, which you'll call $m and $n inside the subroutine.
```

### 2.4.6 Variable-Length Parameter Lists

```text
In real-world Perl code, subroutines are often given parameter lists of arbitrary length. That's because of Perl's "no unnecessary limits" philosophy that you've already seen. Of course, this is unlike many traditional programming languages, which require every subroutine to be strictly typed (that is, to permit only a certain, predefined number of parameters of predefined types). It's nice that Perl is so flexible, but (as you saw with the &max routine earlier) that may cause problems when a subroutine is called with a different number of arguments than the author expected.

Of course, the subroutine can easily check that it has the right number of arguments by examining the @_ array. For example, we could have written &max to check its argument list like this:[*]

    [*] As soon as you learn about warn in the next chapter, you'll see that you can use it to turn improper usage like this into a proper warning. Or perhaps you'll decide that this case is severe enough to warrant using die, described in the same chapter.

    sub max {
	      if (@_ != 2) {
		          print "WARNING! &max should get exactly two arguments!\n";
			    }
	        # continue as before...
	        .
			  .
			    .
    }


That if test uses the "name" of the array in a scalar context to find out the number of array elements, as you saw in Chapter 3.

But in real-world Perl programming, this sort of check is hardly ever used; it's better to make the subroutine adapt to the parameters.
```

#### 2.4.6.1 A Better &max Routine

```text
So let's rewrite &max to allow for any number of arguments:

$maximum = &max(3, 5, 10, 4, 6);

sub max {
	  my($max_so_far) = shift @_;  # the first one is the largest yet seen
		    foreach (@_) {               # look at the remaining arguments
			        if ($_ > $max_so_far) {    # could this one be bigger yet?
					      $max_so_far = $_;
					          }
				  }
	    $max_so_far;
}


This code uses what has often been called the "high-water mark" algorithm; after a flood, when the waters have surged and receded for the last time, the high-water mark shows where the highest water was seen. In this routine, $max_so_far keeps track of our high-water mark, the largest number yet seen.

The first line sets $max_so_far to 3 (the first parameter in the example code) by shifting that parameter from the parameter array, @_. So @_ now holds (5, 10, 4, 6), since the 3 has been shifted off. And the largest number yet seen is the only one yet seen: 3, the first parameter.

Now, the foreach loop will step through the remaining values in the parameter list, from @_. The control variable of the loop is, by default, $_. (But, remember, there's no automatic connection between @_ and $_; it's just a coincidence that they have such similar names.) The first time through the loop, $_ is 5. The if test sees that it is larger than $max_so_far, so $max_so_far is set to 5the new high-water mark.

The next time through the loop, $_ is 10. That's a new record high, so it's stored in $max_so_far as well.

The next time, $_ is 4. The if test fails, since that's no larger than $max_so_far, which is 10, so the body of the if is skipped.

The next time, $_ is 6, and the body of the if is skipped again. And that was the last time through the loop, so the loop is done.

Now, $max_so_far becomes the return value. It's the largest number we've seen, and we've seen them all, so it must be the largest from the list: 10.
```

#### 2.4.6.2 Empty Parameter Lists

```text
That improved &max algorithm works fine now, even if there are more than two parameters. But what happens if there is none?

At first, it may seem too esoteric to worry about. After all, why would someone call &max without giving it any parameters? But maybe someone wrote a line like this one:

$maximum = &max(@numbers);


And the array @numbers might sometimes be an empty list; perhaps it was read in from a file that turned out to be empty, for example. So you need to know: what does &max do in that case?

The first line of the subroutine sets $max_so_far by using shift on @_, the (now empty) parameter array. That's harmless; the array is left empty, and shift returns undef to $max_so_far.

Now the foreach loop wants to iterate over @_, but since that's empty, the loop body is executed zero times.

So in short order, Perl returns the value of $max_so_far- undef- as the return value of the subroutine. In some sense, that's the right answer because there is no largest value in an empty list.

Of course, whoever is calling this subroutine should be aware that the return value may be undefor they could simply ensure that the parameter list is never empty.
```

### 2.4.7 Notes on Lexical (my) Variables

```text
Those lexical variables can actually be used in any block, not merely in a subroutine's block. For example, they can be used in the block of an if, while, or foreach:

foreach (1..10) {
	  my($square) = $_ * $_;  # private variable in this loop
		    print "$_ squared is $square.\n";
}


The variable $square is private to the enclosing block; in this case, that's the block of the foreach loop. If there's no enclosing block, the variable is private to the entire source file. For now, your programs aren't going to use more than one source file, so this isn't an issue. But the important concept is that the scope of a lexical variable's name is limited to the smallest enclosing block or file. The only code that can say $square and mean that variable is the code inside that textual scope. This is a big win for maintainability - if the wrong value is found in $square, the culprit will be found within a limited amount of source code. As experienced programmers have learned (often the hard way), limiting the scope of a variable to a page of code, or even to a few lines of code, really speeds along the development and testing cycle.

Note also that the my operator doesn't change the context of an assignment:

my($num) = @_;  # list context, same as ($num) = @_;
my $num  = @_;  # scalar context, same as $num = @_;


In the first one, $num gets the first parameter, as a list-context assignment; in the second, it gets the number of parameters, in a scalar context. Either line of code could be what the programmer wanted; you can't tell from that one line alone, and so Perl can't warn you if you use the wrong one. (Of course, you wouldn't have both of those lines in the same subroutine, since you can't have two lexical variables with the same name declared in the same scope; this is just an example.) So, when reading code like this, you can always tell the context of the assignment by seeing what the context would be without the word my.

So long as we're discussing using my() with parentheses, it's worth remembering that without the parentheses, my only declares a single lexical variable:[*]

    [*] As usual, turning on warnings will generally report this abuse of my, or you can call 1-800-LEXICAL-ABUSE and report it yourself. Using the strict pragma, which we'll see in a moment, should forbid it outright.

    my $fred, $barney;        # WRONG! Fails to declare $barney
    my($fred, $barney);       # declares both


    Of course, you can use my to create new, private arrays as well:[dagger]

        [dagger] Or hashes, which you'll see in Chapter 6.

	my @phone_number;


	Any new variable will start out empty - undef for scalars, or the empty list for arrays.
```

### 2.4.8 The use strict Pragma

```text
Perl tends to be a pretty permissive language.[*] But maybe you want Perl to impose a little discipline; that can be arranged with the use strict pragma.

    [*] Bet you hadn't noticed.

    A pragma is a hint to a compiler, telling it something about the code. In this case, the use strict pragma tells Perl's internal compiler that it should enforce some good programming rules for the rest of this block or source file.

    Why would this be important? Well, imagine that you're composing your program, and you type a line like this one:

    $bamm_bamm = 3;  # Perl creates that variable automatically


    Now, you keep typing for a while. After that line has scrolled off the top of the screen, you type this line to increment the variable:

    $bammbamm += 1;  # Oops!


    Since Perl sees a new variable name (the underscore is significant in a variable name), it creates a new variable and increments that one. If you're lucky and smart, you've turned on warnings, and Perl can tell you that you used one or both of those global variable names only a single time in your program. But if you're merely smart, you used each name more than once, and Perl won't be able to warn you.

    To tell Perl that you're ready to be more restrictive, put the use strict pragma at the top of your program (or in any block or file where you want to enforce these rules):

	    use strict;  # Enforce some good programming rules


	    Now, among other restrictions,[dagger] Perl will insist that you declare every new variable, usually done with my:[double dagger]

	        [dagger] To learn about the other restrictions, see the documentation for strict. The documentation for any pragma is filed under that pragma's name, so the command perldoc strict (or your system's native documentation method) should find it for you. In brief, the other restrictions require that strings be quoted in most cases, and that references be true (hard) references. Neither of these restrictions should affect beginners in Perl.

		    [double dagger] There are some other ways to declare variables, too.

		    my $bamm_bamm = 3;  # New lexical variable


		    Now if you try to spell it the other way, Perl can complain that you haven't declared any variable called $bammbamm, so your mistake is automatically caught at compile time.

		    $bammbamm += 1;  # No such variable: Compile time fatal error


		    Of course, this applies only to new variables; you don't need to declare Perl's built-in variables, such as $_ and @_.[||] If you add use strict to a program that is already written, you'll generally get a flood of warning messages, so it's better to use it from the start, when it's needed.

		        [||] And, at least in some circumstances, you don't want to declare $a and $b because they're used internally by sort. So, if you're testing this feature, use other variable names than those two. The fact that use strict doesn't forbid these two is one of the most frequently reported nonbugs in Perl.

			Most people recommend that programs that are longer than a screenful of text generally need use strict. And we agree.

			From here on, most (but not all) of our examples will be written as if use strict is in effect, even where we don't show it. That is, we'll generally declare variables with my where it's appropriate. But, even though we don't always do so here, we encourage you to include use strict in your programs as often as possible.
```

### 2.4.9 The return Operator

```text
The return operator immediately returns a value from a subroutine:

my @names = qw/ fred barney betty dino wilma pebbles bamm-bamm /;
my $result = &which_element_is("dino", @names);

sub which_element_is {
	  my($what, @array) = @_;
	    foreach (0..$#array) {  # indices of @array's elements
		        if ($what eq $array[$_]) {
				      return $_;         # return early once found
					          }
			  }
	      -1;                    # element not found (return is optional here)
}


	This subroutine is being used to find the index of "dino" in the array @names. First, the my declaration names the parameters: there's $what, which is what we're searching for, and @array, an array of values to search within. That's a copy of the array @names, in this case. The foreach loop steps through the indices of @array (the first index is 0, and the last one is $#array, as you saw in Chapter 3).

	Each time through the foreach loop, we check to see whether the string in $what is equal[*] to the element from @array at the current index. If it's equal, we return that index at once. This is the most common use of the keyword return in Perl--to return a value immediately, without executing the rest of the subroutine.

	    [*] You noticed that we used the string equality test, eq, instead of the numeric equality test, ==, didn't you?

	    But what if we never found that element? In that case, the author of this subroutine has chosen to return -1 as a "value not found" code. It would be more Perlish, perhaps, to return undef in that case, but this programmer used -1. Saying return -1 on that last line would be correct, but the word return isn't really needed.

	    Some programmers like to use return every time there's a return value, as a means of documenting that it is a return value. For example, you might use return when the return value is not the last line of the subroutine, such as in the subroutine &larger_of_fred_or_barney, earlier in this chapter. It's not really needed, but it doesn't hurt anything. However, many Perl programmers believe it's just an extra seven characters of typing.
```

#### 2.4.9.1 Omitting the Ampersand

```text
	    As promised, now we'll tell you the rule for when a subroutine call can omit the ampersand. If the compiler sees the subroutine definition before invocation, or if Perl can tell from the syntax that it's a subroutine call, the subroutine can be called without an ampersand, just like a built-in function. (But there's a catch hidden in that rule, as you'll see in a moment.)

	    This means that if Perl can see that it's a subroutine call without the ampersand, from the syntax alone, that's generally fine. That is, if you've got the parameter list in parentheses, it's got to be a function[*] call:

		[*] In this case, the function is the subroutine &shuffle. But it may be a built-in function, as you'll see in a moment.

		my @cards = shuffle(@deck_of_cards);  # No & necessary on &shuffle


		Or if Perl's internal compiler has already seen the subroutine definition, that's generally okay, too; in that case, you can even omit the parentheses around the argument list:

		sub division {
			  $_[0] / $_[1];                   # Divide first param by second
		}

	my $quotient = division 355, 113;  # Uses &division


	This works because of the rule that parentheses may always be omitted, except when doing so would change the meaning of the code.

	But don't put that subroutine declaration after the invocation, or the compiler won't know what the attempted invocation of division is all about. The compiler has to see the definition before the invocation in order to use the subroutine call as if it were a built-in.

	That's not the catch, though. The catch is this: if the subroutine has the same name as a Perl built-in, you must use the ampersand to call it. With an ampersand, you're sure to call the subroutine; without it, you can get the subroutine only if there's no built-in with the same name:

	sub chomp {
		  print "Munch, munch!\n";
	}

	&chomp;  # That ampersand is not optional!


	Without the ampersand, we'd be calling the built-in chomp, even though we've defined the subroutine &chomp. So, the real rule to use is this one: until you know the names of all of Perl's built-in functions, always use the ampersand on function calls. That means that you will use it for your first hundred programs or so. But when you see someone else has omitted the ampersand in his own code, it's not necessarily a mistake; perhaps he simply knows that Perl has no built-in with that name.[*] When programmers plan to call their subroutines as if they were calling Perl's built-ins, usually when writing modules, they often use prototypes to tell Perl about the parameters to expect. Making modules is an advanced topic, though; when you're ready for that, see Perl's documentation (in particular, the perlmod and perlsub documents) for more information about subroutine prototypes and making modules.

	    [*] Then again, maybe it is a mistake; you can search the perlfunc and perlop manpages for that name, though, to see whether it's the same as a built-in. And Perl will usually be able to warn you about this when you have warnings turned on.
```

### 2.4.10 Nonscalar Return Values

```text
	A scalar isn't the only kind of return value a subroutine may have. If you call your subroutine in a list context,[dagger] it can return a list of values.

	    [dagger] You can detect whether a subroutine is being evaluated in a scalar or list context using the wantarray function, which lets you easily write subroutines with specific list or scalar context values.

	    Suppose you wanted to get a range of numbers (as from the range operator, ..), except that you want to be able to count down as well as up. The range operator only counts upward, but that's easily fixed:

	    sub list_from_fred_to_barney {
		      if ($fred < $barney) {
				  # Count upwards from $fred to $barney
				  $fred..$barney;
				    } else {
						# Count downwards from $fred to $barney
						reverse $barney..$fred;
						  }
	    }
	$fred = 11;
	$barney = 6;
	@c = &list_from_fred_to_barney; # @c gets (11, 10, 9, 8, 7, 6)


	In this case, the range operator gives us the list from 6 to 11, then reverse reverses the list so that it goes from $fred (11) to $barney (6), just as we wanted.

	The least you can return is nothing at all. A return with no arguments will return undef in a scalar context or an empty list in a list context. This can be useful for an error return from a subroutine, signaling to the caller that a more meaningful return value is unavailable.
```

### 2.4.11 Persistent, Private Variables

```text
	With my we were able to make variables private to a subroutine, although each time we called the subroutine we had to define them again. With state, we can still have private variables scoped to the subroutine but Perl will keep their values between calls.

	Going back to our first example in this chapter, we had a subroutine named marine that incremented a variable:

	sub marine {
		  $n += 1;  # Global variable $n
			    print "Hello, sailor number $n!\n";
	}


	Now that we know about strict, we add that to our program and realize that our use of the global variable $n isn't allowed anymore. We can't make $n a lexical variable with my because it wouldn't retain its value.

	Declaring our variable with state tells Perl to retain the variable's value between calls to the subroutine and to make the variable private to the subroutine:

	use 5.010;

	sub marine {
		  state $n = 0;  # private, persistent variable $n
			    $n += 1;
		    print "Hello, sailor number $n!\n";
	}


	Now we can get the same output while being strict-clean and not using a global variable. The first time we call the subroutine, Perl declares and initializes $n. Perl ignores the statement on all subsequent calls. Between calls, Perl retains the value of $n for the next call to the subroutine.

	We can make any variable type a state variable; it's not just for scalars. Here's a subroutine that remembers its arguments and provides a running sum by using a state array:

	use 5.010;

	running_sum( 5, 6 );
	running_sum( 1..3 );
	running_sum( 4 );

	sub running_sum {
		  state $sum = 0;
		    state @numbers;

		      foreach my $number ( @_ ) {
				  push @numbers, $number;
				      $sum += $number;
					  }

			say "The sum of (@numbers) is $sum";
			  }


	This outputs a new sum each time we call it, adding the new arguments to all of the previous ones:

	The sum of (5 6) is 11
	The sum of (5 6 1 2 3) is 17
	The sum of (5 6 1 2 3 4) is 21


	There's a slight restriction on arrays and hashes as state variables, though. We can't initialize them in list context as of Perl 5.10:

	state @array = qw(a b c); # Error!


	This gives us an error that hints that we might be able to do it in a future version of Perl:

	Initialization of state variables in list context currently forbidden ...
```

### 2.4.12 Exercises

```text
#

	[12] Write a subroutine, named total, that returns the total of a list of numbers. (Hint: the subroutine should not perform any I/O; it should simply process its parameters and return a value to its caller.) Try it out in this sample program, which merely exercises the subroutine to see that it works. The first group of numbers should add up to 25.

	my @fred = qw{ 1 3 5 7 9 };
	my $fred_total = total(@fred);
	print "The total of \@fred is $fred_total.\n";
	print "Enter some numbers on separate lines: ";
	my $user_total = total(<STDIN>);
	print "The total of those numbers is $user_total.\n";


#

	[5] Using the subroutine from the previous problem, make a program to calculate the sum of the numbers from 1 to 1000.
#

	[18] Extra credit exercise: write a subroutine, called &above_average, that takes a list of numbers and returns the ones that are above the average (mean). (Hint: make another subroutine that calculates the average by dividing the total by the number of items.) Try your subroutine in this test program.

my @fred = above_average(1..10);
print "\@fred is @fred\n";
print "(Should be 6 7 8 9 10)\n";
my @barney = above_average(100, 1..10);
print "\@barney is @barney\n";
print "(Should be just 100)\n";


#

[10] Write a subroutine, named greet, that welcomes the person you name by telling them the name of the last person it greeted:

greet( "Fred" );
greet( "Barney" );


This sequence of statements should print:

Hi Fred! You are the first one here!
Hi Barney! Fred is also here!


#

[10] Modify the previous program to tell each new person the names of all of the people it has previously greeted:

greet( "Fred" );
greet( "Barney" );
greet( "Wilma" );
greet( "Betty" );


This sequence of statements should print:

Hi Fred! You are the first one here!
Hi Barney! I've seen: Fred
Hi Wilma! I've seen: Fred Barney
Hi Betty! I've seen: Fred Barney Wilma

My answers at: /cygdrive/c/work/KB/perl/learning_perl_5_edition_examples/basic
ex_2_4_12.pl
```
