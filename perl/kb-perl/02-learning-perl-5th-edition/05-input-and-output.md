---
type: reference
title: Input and output
description: "Subsection 2.5 of Learning Perl, 5th Edition."
tags: [kb-perl]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "perl/KB_perl#2.5"
---

# 2.5 Input and output

[↑ Learning Perl, 5th Edition](/perl/kb-perl/02-learning-perl-5th-edition/README.md)

```text
We've already seen how to do some input/output (I/O) in order to make some of the earlier exercises possible. But now we'll learn more about those operations by covering the 80% of the I/O you'll need for most programs. If you're already familiar with the workings of standard input, output, and error streams, you're ahead of the game. If not, we'll get you caught up by the end of this chapter. For now, just think of "standard input" as being "the keyboard," and "standard output" as being "the display screen."
```

### 2.5.1 Input from Standard Input

```text
Reading from the standard input stream is easy. We've been doing it already with the <STDIN>  operator.[113] Evaluating this operator in a scalar context gives you the next line of input:

    [113] What we're calling the line-input operator here, <STDIN>, is actually a line-input operator (represented by the angle brackets) around a filehandle. You'll learn about filehandles later in this chapter.

    $line = <STDIN>;                # read the next line
    chomp($line);                   # and chomp it

    chomp($line = <STDIN>);         # same thing, more idiomatically


    Since the line-input operator will return undef when you reach end-of-file, this is handy for dropping out of loops:

    while (defined($line = <STDIN>)) {
	      print "I saw $line";
    }


There's a lot going on in that first line: we're reading the input into a variable, checking that it's defined, and if it is (meaning that we haven't reached the end of the input) we're running the body of the while loop. So, inside the body of the loop, we'll see each line, one after another, in $line.[*] This is something you'll want to do fairly often, so naturally Perl has a shortcut for it. The shortcut looks like this:

    [*] You probably noticed that we never chomped that input. In this kind of a loop, you can't really put chomp into the conditional expression, so it's often the first item in the loop body, when it's needed. We'll see examples of that in the next section.

    while (<STDIN>) {
	      print "I saw $_";
    }


Now, to make this shortcut, Larry chose some useless syntax. That is, this is literally saying, "Read a line of input, and see if it's true. (Normally it is.) And if it is true, enter the while loop, but throw away that line of input!" Larry knew that it was a useless thing to do; nobody should ever need to do that in a real Perl program. So, Larry took this useless syntax and made it useful.

What this is actually saying is that Perl should do the same thing as we saw in our earlier loop: it tells Perl to read the input into a variable, and (as long as the result was defined, so we haven't reached end-of-file) then enter the while loop. However, instead of storing the input into $line, Perl will use its favorite default variable, $_, just as if you had written this:

while (defined($_ = <STDIN>)) {
	  print "I saw $_";
}


Now, before we go any further, we must be very clear about something: this shortcut works only if you write it just as we did. If you put a line-input operator anywhere else (in particular, as a statement all on its own), it won't read a line into $_ by default. It works only if there's nothing but the line-input operator in the conditional of a while loop.[dagger] If you put anything else into the conditional expression, this shortcut won't apply.

    [dagger] Well, okay, the conditional of a for loop is just a while conditional in disguise, so it works there, too.

    There's otherwise no connection between the line-input operator (<STDIN>) and Perl's favorite default variable ($_). In this case, though, it just happens that the input is being stored in that variable.

    On the other hand, evaluating the line-input operator in a list context gives you all of the (remaining) lines of input as a listeach element of the list is one line:

    foreach (<STDIN>) {
	      print "I saw $_";
    }


Once again, there's no connection between the line-input operator and Perl's favorite default variable. In this case, though, the default control variable for foreach is $_. So in this loop, we'll see each line of input in $_, one after the other.

That may sound familiar, and for good reason: that's the same behavior the while loop would do. Isn't it?

The difference is under the hood. In the while loop, Perl reads a line of input, puts it into a variable, and runs the body of the loop. Then, it goes back to find another line of input. But in the foreach loop, the line-input operator is being used in a list context (since foreach needs a list to iterate through). So it has to read all of the input before the loop can start running. That difference will become apparent when the input is coming from your 400 MB web server logfile! It's generally best to use code like the while loop's shortcut, which will process input a line at a time, whenever possible.
```

### 2.5.2 Input from the Diamond Operator

```text
Another way to read input is with the diamond[*] operator: <>. This is useful for making programs that work like standard Unix[dagger] utilities, with respect to the invocation arguments (which we'll see in a moment). If you want to make a Perl program that can be used like the utilities cat, sed, awk, sort, grep, lpr, and many others, the diamond operator will be your friend. If you want to make anything else, the diamond operator probably won't help.

    [*] The diamond operator was named by Larry's daughter, Heidi, when Randal went over to Larry's house one day to show off the new training materials he'd been writing and complained that there was no spoken name for "that thing." Larry didn't have a name for it, either. Heidi (eight years old at the time) quickly chimed in, "That's a diamond, Daddy." So the name stuck. Thanks, Heidi!

        [dagger] But not just on Unix systems. Many other systems have adopted this way of using invocation arguments.

	The invocation arguments to a program are normally a number of "words" on the command line after the name of the program.[double dagger] In this case, they give the names of the files your program will process in sequence:

	    [double dagger] Whenever a program is started, it has a list of zero or more invocation arguments, supplied by whatever program is starting it. Often this is the shell, which makes up the list depending upon what you type on the command line. But we'll see later that you can invoke a program with pretty much any strings as the invocation arguments. Because they often come from the shell's command line, they are sometimes called "command-line arguments" as well.

	    $ ./my_program fred barney betty


	    That command means to run the command my_program (which will be found in the current directory), and that the program should process file fred, followed by file barney, followed by file betty.

	    If you give no invocation arguments, the program should process the standard input stream. Or, as a special case, if you give just a hyphen as one of the arguments, that means standard input as well.[*] So, if the invocation arguments had been fred - betty, that would have meant that the program should process file fred, followed by the standard input stream, followed by file betty.

	        [*] Here's a possibly unfamiliar Unix fact: most of those standard utilities, like cat and sed, use this same convention, where a hyphen stands for the standard input stream.

		The benefit of making your programs work like this is that you may choose where the program gets its input at runtime; for example, you won't have to rewrite the program to use it in a pipeline (which we'll discuss more later). Larry put this feature into Perl because he wanted to make it easy for you to write your own programs that work like standard Unix utilities - even on non-Unix machines. Actually, he did it so he could make his own programs work like standard Unix utilities; since some vendors' utilities don't work just like others', Larry could make his own utilities, deploy them on a number of machines, and know that they'd all have the same behavior. Of course, this meant porting Perl to every machine he could find.

		The diamond operator is actually a special kind of line-input operator. But instead of getting the input from the keyboard, it comes from the user's choice of input:[dagger]

		    [dagger] Which may or may not include getting input from the keyboard.

		    while (defined($line = <>)) {
			      chomp($line);
			        print "It was $line that I saw!\n";
		    }


So, if we run this program with the invocation arguments fred, barney, and betty, it will say something like: "It was [a line from file fred] that I saw!", "It was [another line from file fred] that I saw!", on and on until it reaches the end of file fred. Then, it will automatically go on to file barney, printing out one line after another, and then on through file betty. Note that there's no break when we go from one file to another; when you use the diamond, it's as if the input files have been merged into one big file.[double dagger] The diamond will return undef (and we'll drop out of the while loop) only at the end of all of the input.

    [double dagger] If it matters to you, or even if it doesn't, the current file's name is kept in Perl's special variable $ARGV. This name may be "-" instead of a real filename if the input is coming from the standard input stream, though.

    In fact, since this is just a special kind of line-input operator, we may use the same shortcut we saw earlier to read the input into $_ by default:

    while (<>) {
	      chomp;
	        print "It was $_ that I saw!\n";
    }


This works like the loop above, but with less typing. And you may have noticed that we're using the default for chomp; without an argument, chomp will work on $_. Every little bit of saved typing helps!

Since the diamond operator is generally being used to process all of the input, it's typically a mistake to use it in more than one place in your program. If you find yourself putting two diamonds into the same program, especially using the second diamond inside the while loop that is reading from the first one, it's almost certainly not going to do what you would like.[*] In our experience, when beginners put a second diamond into a program, they meant to use $_ instead. Remember, the diamond operator reads the input, but the input itself is (generally, by default) found in $_.

    [*] If you reinitialize @ARGV before using the second diamond, then you're on solid ground. We'll see @ARGV in the next section.

    If the diamond operator can't open one of the files and read from it, it'll print an allegedly helpful diagnostic message, such as:

    can't open wimla: No such file or directory


    The diamond operator will then go on to the next file automatically, much like what you'd expect from cat or another standard utility.
```

### 2.5.3 The Invocation Arguments

```text
Technically, the invocation diamond operator isn't literally looking at the invocation arguments-it works from the @ARGV array. This array is a special array that is preset by the Perl interpreter as the list of the invocation arguments. In other words, this is just like any other array, (except for its funny, all-caps name), but when your program starts, @ARGV is already stuffed full of the list of invocation arguments.[dagger]

    [dagger] C programmers may be wondering about argc (there isn't one in Perl), and what happened to the program's own name (that's found in Perl's special variable $0, not @ARGV). Also, depending upon how you've invoked your program, there may be a little more happening than we say here. See the perlrun manpage for the full details.

    You can use @ARGV just like any other array; you could shift items off of it, perhaps, or use foreach to iterate over it. You could even check to see if any arguments start with a hyphen, so that you could process them as invocation options (like Perl does with its own -w option).[double dagger]

        [double dagger] If you need more than just one or two such options, you should almost certainly use a module to process them in a standard way. See the documentation for the Getopt::Long and Getopt::Std modules, which are part of the standard distribution.

	The diamond operator looks in @ARGV to determine what filenames it should use. If it finds an empty list, it uses the standard input stream; otherwise it uses the list of files that it finds. This means that after your program starts and before you start using the diamond, you've got a chance to tinker with @ARGV. For example, here we can process three specific files, regardless of what the user chose on the command line:

	@ARGV = qw# larry moe curly #;  # force these three files to be read
	while (<>) {
		  chomp;
		    print "It was $_ that I saw in some stooge-like file!\n";
	}
```

### 2.5.4 Output to Standard Output

```text
The print operator takes a list of values and sends each item (as a string, of course) to standard output in turn, one after another. It doesn't add any extra characters before, after, or in between the items;[*] if you want spaces between items and a newline at the end, you have to say so:

    [*] Well, it doesn't add anything extra by default, but this default (like so many others in Perl) may be changed. Changing these defaults will likely confuse your maintenance programmer, though, so avoid doing so except in small, quick-and-dirty programs, or (rarely) in a small section of a normal program. See the perlvar manpage to learn about changing the defaults.

    $name = "Larry Wall";
    print "Hello there, $name, did you know that 3+4 is ", 3+4, "?\n";


    Of course, that means that there's a difference between printing an array and interpolating an array:

    print @array;     # print a list of items
    print "@array";   # print a string (containing an interpolated array)


    That first print statement will print a list of items, one after another, with no spaces in between. The second one will print exactly one item, which is the string you get by interpolating @array into the empty string-that is, it prints the contents of @array, separated by spaces.[dagger] So, if @array holds qw/ fred barney betty /,[double dagger] the first one prints fredbarneybetty, while the second prints fred barney betty separated by spaces.

        [dagger] Yes, the spaces are another default; see the perlvar manpage again.

	    [double dagger] You know that we mean a three-element list here, right? This is just Perl notation.

	    But before you decide to always use the second form, imagine that @array is a list of unchomped lines of input. That is, imagine that each of its strings has a trailing newline character. Now, the first print statement prints fred, barney, and betty on three separate lines. But the second one prints this:

	     fred
	       barney
	         betty


		 Do you see where the spaces come from? Perl is interpolating an array, so it puts spaces between the elements. So, we get the first element of the array (fred and a newline character), then a space, then the next element of the array (barney and a newline character), then a space, then the last element of the array (betty and a newline character). The result is that the lines seem to have become indented, except for the first one. Every week or two, a mailing list or forum has a message with a subject line something like:

		     Perl indents everything after the first line

		     Without even reading the message, we can immediately see that the program used double quotes around an array containing unchomped strings. "Did you perhaps put an array of unchomped strings inside double quotes?" we ask, and the answer is always yes.

		     Generally, if your strings contain newlines, you simply want to print them, after all:

		     print @array;


		     But if they don't contain newlines, you'll generally want to add one at the end:

		     print "@array\n";


		     So, if you're using the quote marks, you'll be (generally) adding the \n at the end of the string anyway; this should help you to remember which is which.

		     It's normal for your program's output to be buffered. That is, instead of sending out every little bit of output at once, it'll be saved until there's enough to bother with. If (for example) you're going to save the output to disk, it's (relatively) slow and inefficient to spin the disk every time we add one or two characters to the file. Generally, then, the output will go into a buffer that is flushed (that is, actually written to disk or wherever) only when the buffer gets full or when the output is otherwise finished (such as at the end of runtime). Usually, that's what you want.

		     But if you (or a program) may be waiting impatiently for the output, you may wish to take that performance hit and flush the output buffer each time you print. See the Perl manpages for more information on controlling buffering in that case.

		     Since print is looking for a list of strings to print, its arguments are evaluated in list context. Since the diamond operator (as a special kind of line-input operator) will return a list of lines in a list context, these can work well together:

		     print <>;          # source code for 'cat'

		     print sort <>;     # source code for 'sort'


		     Well, to be fair, the standard Unix commands cat and sort do have some additional functionality that these replacements lack. But you can't beat them for the price! You can now reimplement all of your standard Unix utilities in Perl and painlessly port them to any machine that has Perl, whether that machine is running Unix or not. And you can be sure that the programs on every different type of machine will nevertheless have the same behavior.[*]

		         [*] In fact, the PPT (Perl Power Tools) project, whose goal was to implement all of the classic Unix utilities in Perl, completed nearly all the utilities (and most of the games!) but got bogged down when they got to reimplementing the shell. The PPT project has been helpful because it has made these standard utilities available on many non-Unix machines.

			 What might not be obvious is that print has optional parentheses, which can sometimes cause confusion. Remember the rule that parentheses in Perl may always be omitted, except when doing so would change the meaning of a statement. So, here are two ways to print the same thing:

			 print("Hello, world!\n");
			 print "Hello, world!\n";


			 So far, so good. But another rule in Perl is that if the invocation of print looks like a function call, then it is a function call. It's a simple rule, but what does it mean for something to look like a function call?

			 In a function call, there's a function name immediately[dagger] followed by parentheses around the function's arguments, like this:

			     [dagger] We say "immediately" here because Perl won't permit a newline character between the function name and the opening parenthesis in this kind of function call. If there is a newline there, Perl sees your code as making a list operator, rather than a function call. This is the kind of piddling technical detail that we mention only for completeness. If you're terminally curious, see the full story in the manpages.

			     print (2+3);


			     That looks like a function call, so it is a function call. It prints 5, but then it returns a value like any other function. The return value of print is a true or false value, indicating the success of the print. It nearly always succeeds, unless you get some I/O error, so the $result in the following statement will normally be 1:

			     $result = print("hello world!\n");


			     But what if you used the result in some other way? Let's suppose you decide to multiply the return value times four:

			     print (2+3)*4;  # Oops!


			     When Perl sees this line of code, it prints 5, just as you asked. Then it takes the return value from print, which is 1, and multiplies that times 4. It then throws away the product, wondering why you didn't tell it to do something else with it. And at this point, someone looking over your shoulder says, "Hey, Perl can't do math! That should have printed 20, rather than 5!"

			     This is the problem with the optional parentheses; sometimes we humans forget where the parentheses really belong. When there are no parentheses, print is a list operator, printing all of the items in the following list; that's generally what you'd expect. But when the first thing after print is a left parenthesis, print is a function call, and it will print only what's found inside the parentheses. Since that line had parentheses, it's the same to Perl as if you'd said this:

			     ( print(2+3) ) * 4;  # Oops!


			     Fortunately, Perl itself can almost always help you with this, if you ask for warningsso use -w, or use warnings, at least during program development and debugging.

			     Actually, this rule"If it looks like a function call, it is a function call"applies to all list functions[*] in Perl, not just to print. It's just that you're most likely to notice it with print. If print (or another function name) is followed by an opening parenthesis, make sure that the corresponding closing parenthesis comes after all of the arguments to that function.

			         [*] Functions that take zero or one arguments don't suffer from this problem.
```

### 2.5.5 Formatted Output with printf

```````````text
You may wish to have a little more control with your output than print provides. In fact, you may be accustomed to the formatted output of C's printf function. Fear not-Perl provides a comparable operation with the same name.

The printf operator takes a format string followed by a list of things to print. The format[dagger] string is a fill-in-the-blanks template showing the desired form of the output:

    [dagger] Here, we're using "format" in the generic sense. Perl has a report-generating feature called "formats" that we won't even be mentioning (except in this footnote) until Appendix B, and then only to say that we really aren't going to talk about it. So, you're on your own there. Just wanted to keep you from getting lost.

    printf "Hello, %s; your password expires in %d days!\n",
      $user, $days_to_die;


The format string holds a number of so-called conversions; each conversion begins with a percent sign (%) and ends with a letter. (As we'll see in a moment, there may be significant extra characters between these two symbols.) There should be the same number of items in the following list as there are conversions; if these don't match up, it won't work correctly. In the example above, there are two items and two conversions, so the output might look something like this:

Hello, merlyn; your password expires in 3 days!


There are many possible printf conversions, so we'll take time here to describe just the most common ones. Of course, the full details are available in the perlfunc manpage.

To print a number in what's generally a good way, use %g,[*] which automatically chooses floating-point, integer, or even exponential notation as needed:

    [*] "General" numeric conversion. Or maybe a "Good conversion for this number" or "Guess what I want the output to look like."

    printf "%g %g %g\n", 5/2, 51/17, 51 ** 17;  # 2.5 3 1.0683e+29


    The %d format means a decimal[dagger] integer, truncated as needed:

        [dagger] There's also %x for hexadecimal and %o for octal if you need those. But we really say "decimal" here as a memory aid: %d for decimal integer.

	printf "in %d days!\n", 17.85;  # in 17 days!


	Note that this is truncated, not rounded; we'll see how to round off a number in a moment.

	In Perl, printf is most often used for columnar data, since most formats accept a field width. If the data won't fit, the field will generally be expanded as needed:

	printf "%6d\n", 42;  # output like ````42 (the ` symbol stands for a space)
	printf "%2d\n", 2e3 + 1.95;  # 2001


	The %s conversion means a string, so it effectively interpolates the given value as a string, but with a given field width:

	printf "%10s\n", "wilma";  # looks like `````wilma


	A negative field width is left-justified (in any of these conversions):

		printf "%-15s\n", "flintstone";  # looks like flintstone`````


		The %f conversion (floating-point) rounds off its output as needed, and even lets you request a certain number of digits after the decimal point:

		printf "%12f\n", 6 * 7 + 2/3;    # looks like ```42.666667
		printf "%12.3f\n", 6 * 7 + 2/3;  # looks like ``````42.667
		printf "%12.0f\n", 6 * 7 + 2/3;  # looks like ``````````43


		To print a real percent sign, use %%, which is special in that it uses no element from the list:[double dagger]

		    [double dagger] Maybe you thought you could simply put a backslash in front of the percent sign. Nice try, but no. The reason that won't work is that the format is an expression, and the expression "\%" means the one-character string '%'. Even if we got a backslash into the format string, printf wouldn't know what to do with it. Besides, C programmers are used to printf working like this.

		    printf "Monthly interest rate: %.2f%%\n",
		      5.25/12;  # the value looks like "0.44%"
```````````

### 5.5.1. Arrays and printf

```text
		      Generally, you won't use an array as an argument to printf. That's because an array may hold any number of items, and a given format string will work with only a certain fixed number of items: if there are three conversions in the format, there must be exactly three items.

		      But there's no reason you can't whip up a format string on the fly, since it may be any expression. This can be tricky to get right, though, so it may be handy (especially when debugging) to store the format into a variable:

		      my @items = qw( wilma dino pebbles );
		      my $format = "The items are:\n" . ("%10s\n" x @items);
## print "the format is >>$format<<\n"; # for debugging
		      printf $format, @items;


		      This uses the x operator (which we learned about in Chapter 2) to replicate the given string a number of times given by @items (which is being used in a scalar context). In this case, that's 3, since there are three items, so the resulting format string is the same as if we had written it as The items are:\n%10s\n%10s\n%10s\n. And the output prints each item on its own line, right-justified in a 10-character column, under a heading line. Pretty cool, huh? But not cool enough because you can even combine these:

		      printf "The items are:\n".("%10s\n" x @items), @items;


		      Note that here we have @items being used once in a scalar context, to get its length, and once in a list context, to get its contents. Context is important.
```

### 2.5.6 Filehandles

```text
		A filehandle is the name in a Perl program for an I/O connection between your Perl process and the outside world. That is, it's the name of a connection, not necessarily the name of a file.

		Filehandles are named like other Perl identifiers (with letters, digits, and underscores, but they can't start with a digit), though since they don't have any prefix character they might be confused with present or future reserved words, or with labels, which we cover in Chapter 10. Once again, as with labels, the recommendation from Larry is that you use all uppercase letters in the name of your filehandlenot only will it stand out better, but it will also guarantee that your program won't fail when a future (lowercase) reserved word is introduced.

		But there are also six special filehandle names that Perl already uses for its own purposes: STDIN, STDOUT, STDERR, DATA, ARGV, and ARGVOUT.[*] Although you may choose any filehandle name you'd like, you shouldn't choose one of those six unless you intend to use that one's special properties.[dagger]

		    [*] Some people hate typing in all caps, even for a moment, and will try spelling these in lowercase, like stdin. Perl may even let you get away with that from time to time, but not always. The details of when these work and when they fail are beyond the scope of this book. But the important thing is that programs that rely upon this kindness will one day break, so it is best to avoid lowercase here.

		        [dagger] In some cases, you could (re)use these names without a problem. But your maintenance programmer may think that you're using the name for its built-in features, and thus may be confused.

			Maybe you recognized some of those names already. When your program starts, STDIN is the filehandle naming the connection between the Perl process and wherever the program should get its input, known as the standard input stream. This is generally the user's keyboard unless the user asked for something else to be the source of input, such as a file or the output of another program through a pipe.[double dagger] There's also the standard output stream, which is STDOUT. By default, this one goes to the user's display screen, but the user may send the output to a file or to another program, as we'll see shortly. These standard streams come to us from the Unix "standard I/O" library, but they work in much the same way on most modern operating systems.[||] The general idea is that your program should blindly read from STDIN and blindly write to STDOUT, trusting in the user (or generally whichever program is starting your program) to have set those up. In that way, the user can type a command like this one at the shell prompt:

			    [double dagger] The defaults we speak of in this chapter for the three main I/O streams are what the Unix shells do by default. But it's not just shells that launch programs, of course. We'll see in Chapter 16 what happens when you launch another program from Perl.

			        [||] If you're not already familiar with how your non-Unix system provides standard input and output, see the perlport manpage and the documentation for that system's equivalent to the Unix shell (the program that runs programs based upon your keyboard input).

				$ ./your_program <dino >wilma


				That command tells the shell that the program's input should be read from the file dino, and the output should go to the file wilma. As long as the program blindly reads its input from STDIN, processes it (in whatever way we need), and blindly writes its output to STDOUT, this will work just fine.

				And at no extra charge, the program will work in a pipeline. This is another concept from Unix, which lets us write command lines like this one:

				$ cat fred barney | sort | ./your_program | grep something | lpr


				Now, if you're not familiar with these Unix commands, that's okay. This line says that the cat command should print out all of the lines of file fred followed by all of the lines of file barney. Then that output should be the input of the sort command, which sorts those lines and passes them on to your_program. After it has done its processing, your_program will send the data on to grep, which discards certain lines in the data, sending the others on to the lpr command, which should print everything that it gets on a printer. Whew!

				Pipelines like that are common in Unix and many other systems today because they let you build powerful, complex commands out of simple, standard building blocks. Each building block does one thing very well, and it's your job to use them together in the right way.

				There's one more standard I/O stream. If (in the previous example) your_program had to emit any warnings or other diagnostic messages, those shouldn't go down the pipeline. The grep command is set to discard anything that it hasn't specifically been told to look for, and so it will most likely discard the warnings. Even if it did keep the warnings, you probably don't want to pass them downstream to the other programs in the pipeline. So that's why there's also the standard error stream: STDERR. Even if the standard output is going to another program or file, the errors will go to wherever the user desires. By default, the errors will generally go to the user's display screen,[*] but the user may send the errors to a file with a shell command like this one:

				    [*] Also, generally, errors aren't buffered. That means that if the standard error and standard output streams are both going to the same place (such as the monitor), the errors may appear earlier than the normal output. For example, if your program prints a line of ordinary text, then tries to divide by zero, the output may show the message about dividing by zero first, and the ordinary text second.

				    $ netstat | ./your_program 2>/tmp/my_errors
```

### 2.5.7 Opening a Filehandle

```text
So you've seen that Perl provides three filehandles- STDIN, STDOUT, and STDERR -which are automatically open to files or devices established by the program's parent process (probably the shell). When you need other filehandles, use the open operator to tell Perl to ask the operating system to open the connection between your program and the outside world. Here are some examples:

open CONFIG, "dino";
open CONFIG, "<dino";
open BEDROCK, ">fred";
open LOG, ">>logfile";


The first one opens a filehandle called CONFIG to a file called dino. That is, the (existing) file dino will be opened and whatever it holds will come into our program through the filehandle named CONFIG. This is similar to the way that data from a file could come in through STDIN if the command line had a shell redirection like <dino. In fact, the second example uses exactly that sequence. The second does the same as the first, but the less-than sign explicitly says "use this filename for input," even though that's the default.[*]

    [*] This may be important for security reasons. As we'll see in a moment (and in further detail in Chapter 14), there are a number of magical characters that may be used in filenames. If $name holds a user-chosen filename, simply opening $name will allow any of these magical characters to come into play. This could be a convenience to the user, or it could be a security hole. But opening "< $name" is much safer, since it explicitly says to open the given name for input. Still, this doesn't prevent all possible mischief. For more information on different ways of opening files, especially when security may be a concern, see the perlopentut manpage.

    Although you don't have to use the less-than sign to open a file for input, we include that because, as you can see in the third example, a greater-than sign means to create a new file for output. This opens the filehandle BEDROCK for output to the new file fred. Just as when the greater-than sign is used in shell redirection, we're sending the output to a new file called fred. If there's already a file of that name, we're asking to wipe it out and replace it with this new one.

    The fourth example shows how two greater-than signs may be used (again, as the shell does) to open a file for appending. That is, if the file already exists, we will add new data at the end. If it doesn't exist, it will be created in much the same way as if we had used just one greater-than sign. This is handy for logfiles; your program could write a few lines to the end of a logfile each time it's run. So that's why the fourth example names the filehandle LOG and the file logfile.

    You can use any scalar expression in place of the filename specifier, although typically you'll want to be explicit about the direction specification:

    my $selected_output = "my_output";
    open LOG, "> $selected_output";


    Note the space after the greater-than. Perl ignores this,[dagger] but it keeps unexpected things from happening if $selected_output were ">passwd" for example (which would make an append instead of a write).

        [dagger] Yes, this means that if your filename were to have leading whitespace, that would also be ignored by Perl. See perlfunc and perlopentut if you're worried about this.

	In modern versions of Perl (starting with Perl 5.6), you can use a "three-argument" open:

	open CONFIG, "<", "dino";
	open BEDROCK, ">", $file_name;
	open LOG, ">>", &logfile_name();


	The advantage here is that Perl never confuses the mode (the second argument) with some part of the filename (the third argument), which has nice advantages for security.[*] However, if you need your Perl to be backward compatible with older Perl versions (such as when you are contributing to the CPAN), either avoid these forms, or mark your Perl sources as being compatible only with newer Perls.[dagger]

	    [*] The disadvantage for security is that, presumably, you're letting a possibly-malicious user inject possibly-malicious characters into the delicate workings of your innocent program. Once we learn about regular expressions (starting in Chapter 7) you'll be able to use those to enforce some sanity checks on user input. And if your program will have possibly-malicious users, read up on Perl's helpful security features in the Alpaca book, in the perlsec manpage, or both.

	        [dagger] Via use 5.6, for example.

		We'll see how to use these filehandles later in this chapter. But first¿
```

#### 2.5.7.1 Bad Filehandles

```text
		Perl can't actually open a file all by itself. Like any other programming language, Perl can merely ask the operating system to let us open a file. Of course, the operating system may refuse because of permission settings, an incorrect filename, or other reasons.

		If you try to read from a bad filehandle (that is, a filehandle that isn't properly open), you'll see an immediate end-of-file. (With the I/O methods we'll see in this chapter, end-of-file will be indicated by undef in a scalar context or an empty list in a list context.) If you try to write to a bad filehandle, the data is silently discarded.

		Fortunately, these dire consequences are easy to avoid. First of all, if we ask for warnings with -w or the warnings pragma, Perl will generally be able to tell us with a warning when it sees that we're using a bad filehandle. But even before that, open always tells us if it succeeded or failed, by returning true for success or false for failure. So you could write code like this:

		my $success = open LOG, ">>logfile";  # capture the return value
		if ( ! $success) {
			  # The open failed
			  ...
		}


Well, you could do it like that, but there's another way that we'll see in the next section.
```

#### 2.5.7.2 Closing a Filehandle

```text
When you are finished with a filehandle, you may close it with the close operator like this:

close BEDROCK;


Closing a filehandle tells Perl to inform the operating system that we're all done with the given data stream, so any last output data should be written to disk in case someone is waiting for it.[*] Perl will automatically close a filehandle if you reopen it (that is, if you reuse the filehandle name in a new open) or if you exit the program.[dagger]

    [*] If you know much about I/O systems, you'll know there's more to the story. Generally, though, when a filehandle is closed, here's what happens. If there's input remaining in a file, it's ignored. If there's input remaining in a pipeline, the writing program may get a signal that the pipeline is closed. If there's output going to a file or pipeline, the buffer is flushed (that is, pending output is sent on its way). If the filehandle had a lock, the lock is released. See your system's I/O documentation for further details.

        [dagger] Any exit from the program will close all filehandles, but if Perl itself breaks, pending output buffers won't get flushed. That is to say, if you accidentally crash your program by dividing by zero, for example, Perl itself is still running. Perl will ensure that data you've written actually gets output in that case. But if Perl itself can't run (because you ran out of memory or caught an unexpected signal), the last few pieces of output may not be written to disk. Usually, this isn't a big issue.

	Because of this, many simple Perl programs don't bother with close. But it's there if you want to be tidy, with one close for every open. In general, it's best to close each filehandle soon after you're done with it, though the end of the program often arrives soon enough.[double dagger]

	    [double dagger] Closing a filehandle will flush any output buffers and release any locks on the file. Since someone else may be waiting for those things, a long-running program should generally close each filehandle as soon as possible. But many of our programs will take only one or two seconds to run to completion, so this may not matter. Closing a filehandle also releases possibly limited resources, so it's more than just being tidy.
```

### 2.5.8 Fatal Errors with die

```text
Let's step aside for a moment. We need some stuff that isn't directly related to (or limited to) I/O, but is more about getting out of a program earlier than normal.

When a fatal error happens inside Perl (for example, if you divide by zero, use an invalid regular expression, or call a subroutine that hasn't been declared), your program stops with an error message telling why.[||] But this functionality is available to us with the die function, so we can make our own fatal errors.

    [||] Well, it does this by default, but errors may be trapped with an eval block, as we'll see in Chapter 17.

The die function prints out the message you give it (to the standard error stream, where such messages should go) and makes sure that your program exits with a nonzero exit status.

You may not have known it, but every program that runs on Unix (and many other modern operating systems) has an exit status, telling whether it was successful or not. Programs that run other programs (like the make utility program) look at that exit status to see that everything happened correctly. The exit status is just a single byte, so it can't say much; traditionally, it is 0 for success and a nonzero value for failure. Perhaps 1 means a syntax error in the command arguments, while 2 means that something went wrong during processing, and 3 means the configuration file couldn't be found; the details differ from one command to the next. But 0 always means that everything worked. When the exit status shows failure, a program like make knows not to go on to the next step.

So we could rewrite the previous example, perhaps like this:

if ( ! open LOG, ">>logfile") {
  die "Cannot create logfile: $!";
}


If the open fails, die will terminate the program and tell you that it cannot create the logfile. But what's that $! in the message? That's the human-readable complaint from the system. In general, when the system refuses to do something we've requested (like opening a file), $! will give you a reason (perhaps "permission denied" or "file not found," in this case). This is the string that you may have obtained with perror in C or a similar language. This human-readable complaint message will be available in Perl's special variable $!.[*] It's a good idea to include $! in the message when it could help the user to figure out what he or she did wrong. But if you use die to indicate an error that is not the failure of a system request, don't include $!, since it will generally hold an unrelated message left over from something Perl did internally. It will hold a useful value only immediately after a failed system request. A successful request won't leave anything useful there.

    [*] On some non-Unix operating systems, $! may say something like error number 7, leaving it up to the user to look that one up in the documentation. On Windows and VMS, the variable $^E may have additional diagnostic information.

There's one more thing that die will do for you: it will automatically append the Perl program name and line number[dagger] to the end of the message, so you can easily identify which die in your program is responsible for the untimely exit. The error message from the previous code might look like this, if $! contained the message permission denied:

    [dagger] If the error happened while reading from a file, the error message will include the "chunk number" (usually the line number) from the file and the name of the filehandle as well, since those are often useful in tracking down a bug.

Cannot create logfile: permission denied at your_program line 1234.


That's pretty helpful--in fact, we always seem to want more information in our error messages than we included the first time around. If you don't want the line number and file revealed, make sure that the dying words have a newline on the end. That is, another way you could use die is with a trailing newline on the message:

if (@ARGV < 2) {
  die "Not enough arguments\n";
}


If there aren't at least two command-line arguments, the program will say so and quit. It won't include the program name and line number, as the line number is of no use to the user (this is the user's error, after all). As a rule of thumb, put the newline on messages that indicate a usage error and leave it off when it the error might be something you want to track down during debugging.[*]

    [*] The program's name is in Perl's special variable $0, so you may wish to include that in the string: $0:Not enough arguments\n. This is useful if the program may be used in a pipeline or shell script, for example, where it's not obvious which command is complaining. $0 can be changed during the execution of the program, however. You might also want to look into the special __FILE__ and __LINE__ tokens (or the caller function) to get the information that is being left out by adding the newline, so you can print it in your own choice of format.

You should always check the return value of open, since the rest of the program is relying upon its success.
```

#### 2.5.8.1 Warning Messages with warn

```text
Just as die can indicate a fatal error that acts like one of Perl's built-in errors (like dividing by zero), you can use the warn function to cause a warning that acts like one of Perl's built-in warnings (like using an undef value as if it were defined, when warnings are enabled).

The warn function works just like die does, except for that last step--it doesn't actually quit the program. But it adds the program name and line number if needed, and it prints the message to standard error, just as die would.[dagger]

    [dagger] Warnings can't be trapped with an eval block, like fatal errors can be. But see the documentation for the __WARN__ pseudosignal (in the perlvar manpage) if you need to trap a warning.

And having talked about death and dire warnings, we now return you to your regularly scheduled I/O instructional material. Read on.
```

### 2.5.9 Using Filehandles

```text
Once a filehandle is open for reading, you can read lines from it just like you can read from standard input with STDIN. So, for example, to read lines from the Unix password file:

if ( ! open PASSWD, "/etc/passwd") {
  die "How did you get logged in? ($!)";
}

while (<PASSWD>) {
  chomp;
  ...
}


In this example, the die message uses parentheses around $!. Those are merely parentheses around the message in the output. (Sometimes a punctuation mark is just a punctuation mark.) As you can see, what we've been calling the "line-input operator" is really made of two components; the angle brackets (the real line-input operator) are around an input filehandle.

A filehandle open for writing or appending may be used with print or printf, appearing immediately after the keyword but before the list of arguments:

print LOG "Captain's log, stardate 3.14159\n";  # output goes to LOG
printf STDERR "%d percent complete.\n", $done/$total * 100;


Did you notice that there's no comma between the filehandle and the items to be printed?[*] This looks especially weird if you use parentheses. Either of these forms is correct:

    [*] If you got straight A's in freshman English or Linguistics, when we say that this is called "indirect object syntax," you may say "Ah, of course! I see why there's no comma after the filehandle name--it's an indirect object!" We didn't get straight A's. We don't understand why there's no comma; we merely omit it because Larry told us that we should omit the comma.

printf (STDERR "%d percent complete.\n", $done/$total * 100);
printf STDERR ("%d percent complete.\n", $done/$total * 100);
```

#### 2.5.9.1 Changing the Default Output Filehandle

```text
By default, if you don't give a filehandle to print (or to printf, as everything we say here about one applies equally well to the other), the output will go to STDOUT. But that default may be changed with the select operator. Here we'll send some output lines to BEDROCK:

select BEDROCK;
print "I hope Mr. Slate doesn't find out about this.\n";
print "Wilma!\n";


Once you've selected a filehandle as the default for output, it will stay that way. But it's usually a bad idea to confuse the rest of the program, so you should generally set it back to STDOUT when you're done.[dagger] Also by default, the output to each filehandle is buffered. Setting the special $| variable to 1 will set the currently selected filehandle (that is, the one selected at the time that the variable is modified) to always flush the buffer after each output operation. So if you wanted to be sure that the logfile gets its entries at once, in case you might be reading the log to monitor progress of your long-running program, you could use something like this:

    [dagger] In the unlikely case that STDOUT might not be the selected filehandle, you could save and restore the filehandle, using the technique shown in the documentation for select in the perlfunc manpage. And as long as we're sending you to that manpage, we may as well tell you that there are actually two built-in functions in Perl named select, and both are covered in the perlfunc manpage. The other select always has four arguments, so it's sometimes called "four-argument select."

select LOG;
$| = 1;  # don't keep LOG entries sitting in the buffer
select STDOUT;
# ... time passes, babies learn to walk, tectonic plates shift, and then...
print LOG "This gets written to the LOG at once!\n";
```

### 2.5.10 Reopening a Standard Filehandle

```text
We mentioned earlier that if you were to reopen a filehandle (that is, if you were to open a filehandle FRED when you've already got an open filehandle named FRED, say), the old one would be closed for you automatically. And we said that you shouldn't reuse one of the six standard filehandle names unless you intended to get that one's special features. And we also said that the messages from die and warn, along with Perl's internally generated complaints, go automatically to STDERR. If you put those three pieces of information together, you now have an idea about how you could send error messages to a file, rather than to your program's standard error stream:[*]

    [*] Don't do this without a reason. It's nearly always better to let the user set up redirection when launching your program, rather than have redirection hardcoded. But this is handy in cases where your program is being run automatically by another program (say, by a web server or a scheduling utility like cron or at). Another reason might be that your program is going to start another process (probably with system or exec, which we'll see in ) Chapter 16, and you need that process to have different I/O connections.

# Send errors to my private error log
if ( ! open STDERR, ">>/home/barney/.error_log") {
  die "Can't open error log for append: $!";
}


After reopening STDERR, any error messages from Perl will go into the new file. But what happens if the die is executed--where will that message go, if the new file couldn't be opened to accept the messages?

The answer is that if one of the three system filehandles--STDIN, STDOUT, or STDERR--fails to reopen, Perl kindly restores the original one.[dagger] That is, Perl closes the original one (of those three) only when it sees that opening the new connection is successful. Thus, this technique could be used to redirect any (or all) of those three system filehandles from inside your program,[double dagger] almost as if the program had been run with that I/O redirection from the shell in the first place.

    [dagger] At least, this is true if you haven't changed Perl's special $^F variable, which tells Perl that only those three are special like this. But you'd never change that.

    [double dagger] But don't open STDIN for output or the others for input. Just thinking about that makes our heads hurt.
```

### 2.5.11 Output with say

```text
Perl 5.10 borrows the say  built-in from the ongoing development of Perl 6 (which may have borrowed its say from Pascal's println). It's the same as print, although it adds a newline to the end. These forms all output the same thing:

use 5.010;

print "Hello!\n";
print "Hello!", "\n";
say "Hello!";


To just print a variable's value followed by a newline, you don't need to create an extra string or print a list. You just say the variable. This is especially handy in the common case of simply wanting to put a newline after whatever you want to output:

use 5.010;

my $name = 'Fred';
print "$name\n";
print $name, "\n";
say $name;


To interpolate an array, you still need to quote it though. It's the quoting that puts the spaces between the elements:

use 5.010;

my @array = qw( a b c d );

say @array;   # "abcd\n"

say "@array"; # "a b c d\n";


Just like with print, you can specify a filehandle with say:

use 5.010;

say BEDROCK "Hello!";


Since this is a Perl 5.10 feature though, we'll only use it when we are otherwise using a Perl 5.10 feature. The old, trusty print is still as good as it ever was, but we suspect that there are some Perl programmers out there who will want the immediate savings of not typing the four extra characters (two in the name and the \n).
```

### 2.5.12 Exercises

```text
# [7] Write a program that acts like cat, but reverses the order of the output lines. (Some systems have a utility like this named tac.) If you run yours as ./tac fred barney betty, the output should be all of file betty from last line to first, then barney and then fred, also from last line to first. (Be sure to use the ./ in your program's invocation if you call it tac so that you don't get the system's utility instead!)
# [8] Write a program that asks the user to enter a list of strings on separate lines, printing each string in a right-justified, 20-character column. To be certain that the output is in the proper columns, print a "ruler line" of digits as well. (This is simply a debugging aid.) Make sure that you're not using a 19-character column by mistake! For example, entering hello, good-bye should give output something like this:

123456789012345678901234567890123456789012345678901234567890
               hello
            good-bye


# [8] Modify the previous program to let the user choose the column width so that entering 30, hello, good-bye (on separate lines) would put the strings at the 30th column. (Hint: see the section in Chapter 2 about controlling variable interpolation.) For extra credit, make the ruler line longer when the selected width is larger.	
	
My answers at: /cygdrive/c/work/KB/perl/learning_perl_5_edition_examples/basic
tac.pl
right_justify.pl
right_justify_enhanced.pl
```
