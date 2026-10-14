---
type: cheatsheet
title: Perl’s Special Variables
description: Subsection 8.9 of Oneliners.
tags: [kb-perl]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "perl/KB_perl#8.9"
---

# 8.9 Perl’s Special Variables

[↑ Oneliners](/perl/kb-perl/08-oneliners/README.md)

```text
In this appendix, I summarize Perl’s most commonly used special (predefined) variables, such as $_, $., $/, $\, $1, $2, $3 (and so on), $,, @F, and @ARGV, among others.

			8.9.1   
 Variable $_

The $_ variable, called the default variable, is the most commonly used variable in Perl. Often this variable is pronounced “it” (when not pronounced “dollar-underscore”); as you read on, you’ll understand why.

When using the -n and -p command-line arguments, it’s (see?) where the input is stored. Also, many operators and functions act on it implicitly. Here’s an example:

perl -le '$_ = "foo"; print'

Here, I place the string "foo" in the $_ variable and then call print. When given no arguments, print prints the contents of the $_ variable, which is "foo".

Similarly, $_ is used by the s/regex/replace/ and /regex/ operators when used without the =~ operator. Consider this example:

perl -ne '/foo/ && print'

This one-liner prints only lines that match /foo/. The /foo/ operator implicitly operates on the $_ variable that contains the current line. You could rewrite this as follows, but doing so would require too much typing:

perl -ne 'if ($_ =~ /foo/) { print $_ }'

“If it matches /foo/, print it”—you get the idea. You could also replace text in all the lines simply by calling s/foo/bar/:

perl -pe 's/foo/bar/'

Interestingly, Perl borrows the $_ variable from sed. Remember that sed has a pattern space? The $_ variable can also be called Perl’s pattern space. If you wrote the previous one-liner (perl -pe 's/foo/bar/') in sed, it would look like sed 's/foo/bar/' because sed puts each line in the pattern space and the s command acts on it implicitly. Perl borrows many concepts and commands from sed.
Using $_ with the -n argument

When using the -n argument, Perl puts the following loop around your program:

while (<>) {
    # your program goes here (specified by -e)
}

The while (<>) loop reads lines from standard input or files named on the command line and puts each line into the $_ variable. You can then modify the lines and print them. For example, you can reverse the lines:

perl -lne 'print scalar reverse'

Because I’m using the -n argument here, this program becomes

while (<>) {
    print scalar reverse
}

which is equivalent to

while (<>) {
    print scalar reverse $_
}

The two programs are equivalent because many Perl functions act on $_ implicitly, which makes writing reverse and reverse $_ functionally the same thing. You need scalar to put the reverse function in the scalar context. Otherwise it’s in the list context (print forces the list context) and won’t reverse strings. (I explain the -n flag in great detail in one-liner 2.6 on page 12 and line reversing in one-liner 6.22 on page 67.)
Using $_ with the -p argument

When you use the -p argument, Perl puts the following loop around your program:

while (<>) {
    # your program goes here (specified by -e)
} continue {
    print or die "-p failed: $!\n";
}

The result is almost the same as for the -n argument, except that after each iteration the content of $_ is printed (through print in the continue block).

To reverse the lines as I did with -n, I can do this:

perl -pe '$_ = reverse $_'

The program now becomes:

while (<>) {
    $_ = reverse $_;
} continue {
    print or die "-p failed: $!\n";
}

I’ve modified the $_ variable and set it to reverse $_, which reverses the line. The continue block makes sure that it’s printed. (One-liner 2.1 on page 7 explains the -p argument in more detail.)
Using $_ explicitly

The $_ variable is also often used explicitly. Here are some examples of using the $_ variable explicitly:

perl -le '@vals = map { $_ * 2 } 1..10; print "@vals"'

The output of this one-liner is 2 4 6 8 10 12 14 16 18 20. Here, I use the map function to map an expression over each element in the given list and return a new list, where each element is the result of the expression. In this case, the list is 1..10 (1 2 3 4 5 6 7 8 9 10) and the expression is $_ * 2, which means multiply each element (“it”) by 2. As you can see, I’m using $_ explicitly. When the map function iterates over the list, each element is put into $_ for my convenience.

Now let’s use map in a handy one-liner. How about one that multiplies each element on a line by 2?

perl -alne 'print "@{[map { $_ * 2 } @F]}"'

This one-liner maps the expression $_ * 2 onto each element in @F. The crazy-looking "@{[...]}" is just a way to execute code inside quotes. (One-liner 4.2 on page 30 explains @F, and one-liner 4.4 on page 32 explains "@{[...]}".)

Another function that explicitly uses $_ is grep, which lets you filter the elements from a list. Here’s an example:

perl -le '@vals = grep { $_ > 5 } 1..10; print "@vals"'

The output of this one-liner is 6 7 8 9 10. As you can see, grep filtered elements greater than 5 from the list. The condition $_ > 5 asks, “Is the current element greater than 5?”—or, more succinctly, “Is it greater than 5?”

Let’s use grep in a one-liner. How about one that finds and prints all elements on the current line that are palindromes?

perl -alne 'print "@{[grep { $_ eq reverse $_ } @F]}"'

The condition specified to the grep function here is $_ eq reverse $_, which asks, “Is the current element the same as its reverse?” This condition is true only for palindromes. For example, given the following input:

civic foo mom dad
bar baz 1234321 x

the one-liner outputs this:

civic mom dad
1234321 x

As you can see, all of these elements are palindromes.

You can learn even more about the $_ variable by typing perldoc perlvar at the command line. The perlvar documentation explains all the predefined variables in Perl.
```

### 8.9.2 A.2 Variable $.

```text
When reading a file, the $. variable always contains the line number of the line currently being read. For example, this one-liner numbers the lines in file:

perl -lne 'print "$. $_"' file

You can do the same thing with this one-liner, which replaces the current line with the line number followed by the same line:

perl -pe '$_ = "$. $_"' file

The $. variable isn’t reset across files, so to number multiple files simultaneously, you write

perl -pe '$_ = "$. $_"' file1 file2

This one-liner continues numbering lines in file2 where file1 left off. (If file1 contains 10 lines, the first line of file2 is numbered 11.)

To reset the $. variable, you use an explicit close on the current file handle ARGV:

perl -pe '$_ = "$. $_"; close ARGV if eof' file1 file2

ARGV is a special file handle that contains the currently open file. By calling eof, I’m checking to see if it’s the end of the current file. If so, close closes it, which resets the $. variable.

You can change what Perl considers to be a line by modifying the $/ variable. The next section discusses this variable.
```

### 8.9.3 Variable $/

```text
The $/ variable is the input record separator, which is a newline by default. This variable tells Perl what to consider a line. Say you have this simple program that numbers lines:

perl -lne 'print "$. $_"' file

Because $/ is a newline by default, Perl reads everything up to the first newline, puts it in the $_ variable, and increments the $. variable. Next, it calls print "$. $_", which prints the current line number and the line. But if you change the value of $/ to two newlines, like $/ = "\n\n", Perl reads everything up to the first two newlines; that is, it reads text paragraph by paragraph rather than line by line.

Here’s another example. If you have a file like the following, you can set $/ to :, and Perl will read the file digit by digit.

3:9:0:7:1:2:4:3:8:4:1:0:0:1:... (goes on and on)

Or if you set $/ to undef, Perl reads the entire file in a single read (called slurping):

perl -le '$/ = undef; open $f, "<", "file"; $contents = <$f>"

This one-liner slurps the entire file file in variable $contents.

You can also set $/ to reference an integer:

$/ = \1024

In this case, Perl reads the file 1024 bytes at a time. (This is also called record-by-record reading.)

You can also use the -0 command-line switch to provide this variable with a value, but note that you can’t do the record-by-record version like this. For example, to set $/ to :, specify -0072 because 072 is the octal value of the : character.

To remember what this variable does, recall that when quoting poetry, lines are separated by /.
```

### 8.9.4 Variable $\

```text
The dollar-backslash variable is appended after every print operation. For example, you could append a dot followed by a space ". " after each print:

perl -e '$\ = ". "; print "hello"; print "world"'

This one-liner produces the following output:

hello. world.

Modifying this variable is especially helpful when you want to separate printouts by double newlines.

To remember this variable, just recall that you probably want to print \n after every line. Note that for Perl 5.10 and later, the function say is available, which is like print, except that it always adds a newline at the end and doesn’t use the $\ variable.
```

### 8.9.5 ariables $1, $2, $3, and so on

```text
Variables $1, $2, $3, and so on contain the matches from the corresponding set of capturing parentheses in the last pattern match. Here’s an example:

perl -nle 'if (/She said: (.*)/) { print $1 }'

This one-liner matches lines that contain the string She said: and then captures everything after the string in variable $1 and prints it.

When you use another pair of parentheses, the text is captured in variable $2, and so on:

perl -nle 'if (/(She|He) said: (.*)/) { print "$1: $2" }'

In this one-liner, first either "She" or "He" is captured in variable $1 and then anything she or he said is captured in variable $2 and printed as "$1: $2". You’ll get the same number of capture variables as you have pairs of parentheses.

To avoid capturing text in a variable, use the ?: symbols inside the opening parenthesis. For example, changing (She|He) to (?:She|He):

perl -nle 'if (/(?:She|He) said: (.*)/) { print "Someone said: $1" }'

will not capture "She" or "He" in variable $1. Instead, the second pair of parentheses captures what she or he said in variable $1.

Beginning with Perl 5.10, you can use named capture groups as in (?<name>...). When you do, instead of using variables $1, $2, and so on, you can use $+{name} to refer to the group. For example, this captures "She" or "He" in the named group gender and the said text in the named group text:

perl -nle 'if (/(?<gender>She|He) said: (?<text>.*)/) {
  print "$+{gender}: $+{text}"
}'
```

### 8.9.6 Variable $,

```text
The $, variable is the output field separator for print when printing multiple values. It’s undefined by default, which means that all items printed are concatenated together. Indeed, if you do this:

perl -le 'print 1, 2, 3'

you get 123 printed out. If you set $, to a colon, however:

perl -le '$,=":"; print 1, 2, 3'

you get 1:2:3.

Now, suppose you want to print an array of values. If you do this:

perl -le '@data=(1,2,3); print @data'

the output is 123. But if you quote the variable, the values are space separated:

perl -le '@data=(1,2,3); print "@data"'

So the output is 1 2 3 because the array is interpolated in a double-quoted string.
```

### 8.9.7 Variable $”

```text
This brings us to the $" variable: a single white space (by default) that’s inserted between every array value when it’s interpolated. When you write things like print "@data", the @data array gets interpolated, and the value of $" is inserted between every array element. For example, this prints 1 2 3:

perl -le '@data=(1,2,3); print "@data"'

But if you change $" to, say, a dash -, the output becomes 1-2-3:

perl -le '@data=(1,2,3); $" = "-"; print "@data"'

Recall the @{[...]} trick here. If you print "@{[...]}", you can execute code placed between the square brackets. For examples and more details, see section A.1 Variable $_’s discussion of the $_ variable on page 95 and one-liner 4.4 on page 32.
```

### 8.9.8 Variable @F

```text
The @F variable is created in your Perl program when you use the -a argument, which stands for auto-split fields. When you use -a, the input is split on whitespace characters and the resulting fields are put in @F. For example, if the input line is foo bar baz, then @F is an array ("foo", "bar", "baz").

This technique allows you to operate on individual fields. For instance, you can access $F[2] to print the third field as follows (remembering that arrays start from index 0):

perl -ane 'print $F[2]'

You can also perform various calculations, like multiplying the fifth field by 2:

perl -ane '$F[4] *= 2; print "@F"'

Here, the fifth field $F[4] is multiplied by 2, and print "@F" prints all the fields, separated by a space.

You can also use the -a argument with the -F argument, which specifies the character to split on. For example, to process the colon-separated entries in /etc/passwd entries, you write

perl -a -F: -ne 'print $F[0]' /etc/passwd

which prints the usernames from /etc/passwd.
```

### 8.9.9 Variable @ARGV

```text
The @ARGV variable contains the arguments that you pass to your Perl program. For example, this prints foo bar baz:

perl -le 'print "@ARGV"' foo bar baz

When you use -n or -p flags, the arguments that you pass to your Perl program are opened one by one as files and removed from @ARGV. To access the filenames passed to your program, save them in a new variable in the BEGIN block:

perl -nle 'BEGIN { @A = @ARGV }; ...' file1 file2

Now you can use @A in your program, which contains ("file1", "file2"). If you didn’t do this and you used @ARGV, it would contain ("file2") at first, but when file1 was processed, it would be empty (). Be careful here!

A similar-looking variable, $ARGV, contains the filename of the file currently being read, which is "-" if the program is currently reading from the standard input.
```

### 8.9.10 Variable %ENV

```text
The %ENV hash contains environment variables from your shell. This variable comes in handy when you wish to predefine some values in your script and then use these values in your Perl program or one-liner.

Say you want to use the system function to execute a program that’s not in the path. You could modify the $ENV{PATH} variable and append the needed path:

perl -nle '
  BEGIN { $ENV{PATH} .= ":/usr/local/yourprog/bin" }
  ...
  system("yourprog ...");
'

This one-liner prints all environment variables from Perl:

perl -le 'print "$_: $ENV{$_}" for keys %ENV'

It loops over the keys (environment variable names) of the %ENV hash, puts each key into the $_ variable, and then prints the name followed by $ENV{$_}, which is the value of the environment variable.

$ perl -le 'print "$_ : $ENV{$_}" for keys %ENV'
PATH : /usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/opt/X11/bin:/usr/local/git/bin:/Users/<user>:/Users/<user>/Desktop/Work/scripts/util/:/Users/<user>/Desktop/Work/scripts/perl/:/Users/<user>/Desktop/Work/scripts/perl/util/:/Users/<user>/Desktop/Work/scripts/python/util:/Users/<user>/Desktop/Work/scripts/sh::/Users/<user>/Desktop/Work/scripts/sed/:
_ : /usr/bin/perl
EDITOR : vi
XPC_FLAGS : 0x0
OLDPWD : /Users/<user>
SHELL : /bin/bash
LOGNAME : <user>
SHLVL : 1
__CF_USER_TEXT_ENCODING : 0x1F5:0x0:0x0
XPC_SERVICE_NAME : 0
VERSIONER_PERL_VERSION : 5.18
HISTCONTROL : ignoredups
HOME : /Users/<user>
TMPDIR : /var/folders/93/4pntyw1d3fl4dchm031n456m0000gn/T/
SECURITYSESSIONID : 186a6
PAGER : less
PYTHONSTARTUP : /Users/<user>/.pythonrc
SSH_AUTH_SOCK : /private/tmp/com.apple.launchd.36j8ocRpf2/Listeners
PROMPT_COMMAND : history -a
TERM : xterm-256color
USER : <user>
TERM_PROGRAM_VERSION : 343.6
VERSIONER_PERL_PREFER_32_BIT : no
TERM_SESSION_ID : 40F2249C-EDFA-429E-B680-94330DA77E39
DISPLAY : /private/tmp/com.apple.launchd.Rh3jH5Rc9D/org.macosforge.xquartz:0
PWD : /Users/<user>/Desktop/Work/scripts/perl/cisco
LC_CTYPE : UTF-8
TERM_PROGRAM : Apple_Terminal
Apple_PubSub_Socket_Render : /private/tmp/com.apple.launchd.dZMHLmTGsL/Render
```

### 8.9.11 $| flush operator

```text
$| = 1;  # flush output
```
