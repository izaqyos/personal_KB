---
type: reference
title: File Tests
description: "Learning Perl chapter 12: file test operators."
tags: [perl, book-notes, tutorial, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "perl/KB_perl#2.12"
---

# 2.12 File Tests

[↑ Learning Perl, 5th Edition](/perl/kb-perl/02-learning-perl-5th-edition/README.md)

```text
Earlier, we showed how to open a filehandle for output. Normally, that will create a new file, wiping out any existing file with the same name. Perhaps you want to check that there isn't a file by that name. Perhaps you need to know how old a given file is. Or perhaps you want to go through a list of files to find which ones are larger than a certain number of bytes and not accessed for a certain amount of time. Perl has a complete set of tests you can use to find out information about files.	
```

### 2.12.1 File Test Operators

```text
Before we start a program that creates a new file, let's make sure that the file doesn't already exist so that we don't accidentally overwrite a vital spreadsheet datafile or that important birthday calendar. For this, we use the -e  file test, testing a filename for existence:

die "Oops! A file called '$filename' already exists.\n"
  if -e $filename;


Notice that we don't include $! in this die message, since we're not reporting that the system refused a request in this case. Here's an example of checking whether a file is being kept up-to-date. In this case, we're testing an already opened filehandle, instead of a string filename. Let's say that our program's configuration file should be updated every week or two. (Maybe it's checking for computer viruses, say.) If the file hasn't been modified in the past 28 days, then something is wrong:

warn "Config file is looking pretty old!\n"
  if -M CONFIG > 28;


The third example is more complex. Here, let's say that disk space is filling up and rather than buy more disks, we've decided to move any large, useless files to the backup tapes. So let's go through our list of files[277] to see which of them are larger than 100 KB. But even if a file is large, we shouldn't move it to the backup tapes unless it hasn't been accessed in the last 90 days (so we know that it's not used too often):[278]

    [277] It's more likely that, instead of having the list of files in an array, as our example shows, you'll read it directly from the filesystem using a glob or directory handle, as we'll show in Chapter 13. Since you haven't seen that yet, we'll just start with the list and go from there.

    [278] There's a way to make this example more efficient, as you'll see by the end of the chapter.

my @original_files = qw/ fred barney betty wilma pebbles dino bamm-bamm /;
my @big_old_files;  # The ones we want to put on backup tapes
foreach my $filename (@original_files) {
  push @big_old_files, $filename
    if -s $filename > 100_000 and -A $filename > 90;
}


This is the first time that you've seen it, so maybe you noticed that the control variable of the foreach loop is a my variable. That declares it to have the scope of the loop itself, so this example should work under use strict. Without the my keyword, this would be using the global $filename.

The file tests all look like a hyphen and a letter, which is the name of the test, followed by either a filename or a filehandle to test. Many of them return a true/false value, but several give something more interesting. See Table 12-1 for the complete list, and then read the following discussion to learn more about the special cases.
```

#### 2.12.1.1 Table 12-1. File tests and their meanings

```text
File test	Meaning
-r	File or directory is readable by this (effective) user or group
-w	File or directory is writable by this (effective) user or group
-x	File or directory is executable by this (effective) user or group
-o	File or directory is owned by this (effective) user
-R	File or directory is readable by this real user or group
-W	File or directory is writable by this real user or group
-X	File or directory is executable by this real user or group
-O	File or directory is owned by this real user
-e	File or directory name exists
-z	File exists and has zero size (always false for directories)
-s	File or directory exists and has nonzero size (the value is the size in bytes)
-f	Entry is a plain file
-d	Entry is a directory
-l	Entry is a symbolic link
-S	Entry is a socket
-p	Entry is a named pipe (a "fifo")
-b	Entry is a block-special file (like a mountable disk)
-c	Entry is a character-special file (like an I/O device)
-u	File or directory is setuid
-g	File or directory is setgid
-k	File or directory has the sticky bit set
-t	The filehandle is a TTY (as reported by the isatty() system function; filenames can't be tested by this test)
-T	File looks like a "text" file
-B	File looks like a "binary" file
-M	Modification age (measured in days)
-A	Access age (measured in days)
-C	Inode-modification age (measured in days)

The tests -r, -w, -x, and -o tell whether the given attribute is true for the effective user or group ID,[*] which essentially refers to the person who is "in charge of" running the program.[dagger] These tests look at the "permission bits" on the file to see what is permitted. If your system uses Access Control Lists (ACLs), the tests will use those as well. These tests generally tell whether the system would try to permit something, but it doesn't mean that it really would be possible. For example, -w may be true for a file on a CD-ROM, even though you can't write to it, or -x may be true on an empty file, which can't truly be executed.

    [*] The -o and -O tests relate only to the user ID and not to the group ID.

    [dagger] Note for advanced students: the corresponding -R, -W, -X, and -O tests use the real user or group ID, which becomes important if your program may be running set-ID; in that case, it's generally the ID of the person who requested running it. See any good book about advanced Unix programming for a discussion of set-ID programs.

The -s test does return true if the file is nonempty, but it's a special kind of true. It's the length of the file, measured in bytes, which evaluates as true for a nonzero number.

On a Unix filesystem,[double dagger] there are just seven types of items, represented by the seven file tests: -f, -d, -l, -S, -p, -b, and -c. Any item should be one of those. But if you have a symbolic link pointing to a file, that will report true for both -f and -l. So, if you want to know whether something is a symbolic link, you should generally test that first. (You'll learn more about symbolic links in Chapter 13.)

    [double dagger] This is also the case on many non-Unix filesystems, but not all of the file tests are meaningful everywhere. For example, you aren't likely to have block-special files on your non-Unix system.

The age tests, -M, -A, and -C (yes, they're uppercase), return the number of days since the file was last modified, accessed, or had its inode changed.[*] (The inode contains all of the information about the file except for its contentssee the stat system call manpage or a good book on Unix internals for details.) This age value is a full floating-point number, so you might get a value of 2.00001 if a file were modified two days and one second ago. (These "days" aren't necessarily the same as a human would count; for example, if it's 1:30 in the morning when you check a file modified at about an hour before midnight, the value of -M for this file would be around 0.1, even though it was modified "yesterday.")

    [*] This information will be somewhat different on non-Unix systems, since not all keep track of the same times that Unix does. For example, on some systems, the ctime field (which the -C test looks at) is the file creation time (which Unix doesn't keep track of), rather than the inode change time; see the perlport manpage.

When checking the age of a file, you might even get a negative value like -1.2, which means that the file's last-access timestamp is set at about 30 hours in the future! The zero point on this timescale is the moment your program started running,[dagger] so that value might mean that a long-running program was looking at a file that had just been accessed. Or a timestamp could be set (accidentally or intentionally) to a time in the future.

    [dagger] As recorded in the $^T variable, which you could update (with a statement like $^T = time;) if you needed to get the ages relative to a different starting time.

The tests -T and -B take a try at telling whether a file is text or binary. But people who know a lot about filesystems know that there's no bit (at least in Unix-like operating systems) to indicate that a file is a binary or text fileso how can Perl tell? The answer is that Perl cheats: it opens the file, looks at the first few thousand bytes, and makes an educated guess. If it sees a lot of null bytes, unusual control characters, and bytes with the high bit set, then that looks like a binary file. If there's not much weird stuff then it looks like text. As you might guess, it sometimes guesses wrong. If a text file has a lot of Swedish or French words (which may have characters represented with the high bit set, as some ISO-8859-something variant, or perhaps even a Unicode version), it may fool Perl into declaring it binary. So it's not perfect, but if you just need to separate your source code from compiled files, or HTML files from PNGs, these tests should do the trick.

You'd think that -T and -B would always disagree, since a text file isn't a binary and vice versa, but there are two special cases where they're in complete agreement. If the file doesn't exist, or can't be read, both are false, since it's neither a text file nor a binary. Alternatively, if the file is empty, it's an empty text file and an empty binary file at the same time, so they're both true.

The -t file test returns true if the given filehandle is a TTYin short, if it's interactive because it's not a simple file or pipe. When -t STDIN returns true, it generally means that you can interactively ask the user questions. If it's false, your program is probably getting input from a file or pipe, rather than a keyboard.

Don't worry if you don't know what some of the other file tests meanif you've never heard of them, you won't be needing them. But if you're curious, get a good book about programming for Unix. (On non-Unix systems, these tests all try to give results analogous to what they do on Unix, or undef for an unavailable feature. Usually you'll be able to guess correctly what they'll do.)

If you omit the filename or filehandle parameter to a file test (that is, if you have just -r or just -s, say), the default operand is the file named in $_.[*] So, to test a list of filenames to see which ones are readable, you simply type:

    [*] The -t file test is an exception since that test isn't useful with filenames (they're never TTYs). By default it tests STDIN.

foreach (@lots_of_filenames) {
  print "$_ is readable\n" if -r;  # same as -r $_
}


But if you omit the parameter, be careful that whatever follows the file test doesn't look like it could be a parameter. For example, if you wanted to find out the size of a file in KB rather than in bytes, you might be tempted to divide the result of -s by 1000 (or 1024), like this:

# The filename is in $_
my $size_in_K = -s / 1000;  # Oops!


When the Perl parser sees the slash, it doesn't think about division; since it's looking for the optional operand for -s, it sees what looks like the start of a regular expression in forward slashes. One simple way to prevent this kind of confusion is to put parentheses around the file test:

my $size_in_k = (-s) / 1024;  # Uses $_ by default


Of course, it's always safe to explicitly give a file test a parameter.
```

#### 2.12.1.2 Testing Several Attributes of the Same File

```text
			We can use more than one file test on the same file to create a complex logical condition. Suppose we want to operate on only files that are both readable and writable. We check each attribute and combine them with and:

			if( -r $file and -w $file ) {
				    ... }


This is an expensive operation, though. Each time you perform a file test, Perl asks the filesystem for all of the information about the file (Perl's actually doing a stat each time, which we talk about in the next section). Although we already got that information when we tested -r, Perl asks for the same information again so it can test -w. What a waste! This can be a significant performance problem if you're testing many attributes on many files.

Perl has a special shortcut to help us not do so much work. The virtual filehandle _ (just the underscore) uses the information from the last file lookup that a file test operator performed. Perl only has to look up the file information once now:

				    if( -r $file and -w _ ) {
					        ... }


We don't have to use the file tests next to each other to use _. Here we have them in separate if conditions:

						if( -r $file ) {
							    print "The file is readable!\n";
							        }

if( -w _ ) {
	    print "The file is writable!\n";
	        }


We have to watch out that we know what the last file lookup really was, though. If we do something else between the file tests, such as call a subroutine, the last file we looked up might be different. For instance, this example calls the lookup subroutine, which has a file test in it. When we return from that subroutine and do another file test, the _ filehandle isn't for $file like we expect, but for $other_file:

if( -r $file ) {
	    print "The file is readable!\n";
	        }

lookup( $other_file );

if( -w _ ) {
	    print "The file is writable!\n";
	        }

sub lookup {
	    return -w $_[0];
	        }
```

#### 2.12.1.3 Stacked File Test Operators

```text
Previous to Perl 5.10, if we wanted to test several file attributes at the same time, we had to test them individually, even if using the _ filehandle to save ourselves some work. Suppose we wanted to test whether a file was readable and writable at the same time. We'd have to test whether it's readable and then also test whether it's writable:

if( -r $file and -w _ ) {
    print "The file is both readable and writable!\n";
    }


It's much easier to do this all at once. Perl 5.10 lets us "stack" our file test operators by lining them all up before the filename:

use 5.010;

if( -w -r $file ) {
    print "The file is both readable and writable!\n";
    }


This stacked example is the same as the previous example with just a change in syntax, although, it looks like the file tests are reversed, Perl does the file test nearest the filename first. Normally this isn't going to matter.

Stacked file tests are especially handy for complex situations. Suppose we want to list all of the directories that are readable, writable, executable, and owned by our user. We just need the right set of file tests:

use 5.010;

if( -r -w -x -o -d $file ) {
    print "My directory is readable, writable, and executable!\n";
    }


Stacked file tests aren't good for those that return values other than true or false that we would want to use in a comparison. We might think that this next bit of code first tests that it's a directory and then tests that it is less than 512 bytes, but it doesn't:

use 5.010;

if( -s -d $file < 512) { # WRONG! DON'T DO THIS
    print "The directory is less than 512 bytes!\n";
    }


Rewriting the stacked file tests as the previous notation shows us what is going on. The result of the combination of the file tests becomes the argument for the comparison:

if( ( -d $file and -s _ ) < 512 ) {
    print "The directory is less than 512 bytes!\n";
    }


When the -d returns false, Perl compares that false value to 512. That turns out to be true since false will be 0, which just happens to be less than 512. Instead of worrying about that sort of confusion, we just write it as separate file tests to be nice to the maintenance programmers who come after us:

if( -d $file and -s _ < 512 ) {
    print "The directory is less than 512 bytes!\n";
    }
```

### 2.12.2 The stat and lstat Functions

```text
The stat and lstat Functions

While these file tests are fine for testing various attributes regarding a particular file or filehandle, they don't tell the whole story. For example, there's no file test that returns the number of links to a file or the owner's user ID (uid). To get at the remaining information about a file, merely call the stat function, which returns pretty much everything that the stat Unix system call returns (hopefully more than you want to know).[*] The operand to stat is a filehandle (including the _ virtual filehandle), or an expression that evaluates to a filename. The return value is either the empty list, indicating that the stat failed (usually because the file doesn't exist), or a 13-element list of numbers, most easily described using the following list of scalar variables:

    [*] On a non-Unix system, both stat and lstat, as well as the file tests, should return "the closest thing available." For example, a system that doesn't have user IDs (that is, a system that has just one "user," in the Unix sense) might return zero for the user and group IDs, as if the one and only user is the system administrator. If stat or lstat fails, it will return an empty list. If the system call underlying a file test fails (or isn't available on the given system), that test will generally return undef. See the perlport manpage for the latest about what to expect on different systems.

my($dev, $ino, $mode, $nlink, $uid, $gid, $rdev,
  $size, $atime, $mtime, $ctime, $blksize, $blocks)
    = stat($filename);


The names here refer to the parts of the stat structure, described in detail in the stat(2) manpage. You should probably look there for the detailed descriptions. But in short, here's a quick summary of the important ones:


$dev and $ino

    The device number and inode number of the file. Together they make up a "license plate" for the file. Even if it has more than one name (hard link), the combination of device and inode numbers should always be unique.

$mode

    The set of permission bits for the file, and some other bits. If you've ever used the Unix command ls -l to get a detailed (long) file listing, you'll see that each line of output starts with something like -rwxr-xr-x. The nine letters and hyphens of file permissions[dagger] correspond to the nine least-significant bits of $mode, which would, in this case, give the octal number 0755. The other bits, beyond the lowest nine, indicate other details about the file. So, if you need to work with the mode, you'll generally want to use the bitwise operators covered later in this chapter.

        [dagger] The first character in that string isn't a permission bit; it indicates the type of entry: a hyphen for an ordinary file, d for directory, or l for symbolic link, among others. The ls command determines this from the other bits past the least-significant nine.


$nlink

    The number of (hard) links to the file or directory. This is the number of true names that the item has. This number is always 2 or more for directories and (usually) 1 for files. You'll see more about this when we talk about creating links to files in Chapter 13. In the listing from ls -l, this is the number just after the permission-bits string.

$uid and $gid

    The numeric user ID and group ID showing the file's ownership.

$size

    The size in bytes, as returned by the -s file test.

$atime, $mtime, and $ctime

    The three timestamps, but here they're represented in the system's timestamp format: a 32-bit number telling how many seconds have passed since the Epoch, an arbitrary starting point for measuring system time. On Unix systems and some others, the Epoch is the beginning of 1970 at midnight Universal Time, but the Epoch is different on some machines. There's more information later in this chapter on turning that timestamp number into something useful.

Invoking stat on the name of a symbolic link returns information on what the symbolic link points at, not information about the symbolic link itself (unless the link just happens to be pointing at nothing currently accessible). If you need the (mostly useless) information about the symbolic link itself, use lstat rather than stat (which returns the same information in the same order). If the operand isn't a symbolic link, lstat returns the same things that stat would.

Like the file tests, the operand of stat or lstat defaults to $_, meaning that the underlying stat system call will be performed on the file named by the scalar variable $_.
```

### 2.12.3 The localtime Function

```text
When you have a timestamp number (such as the ones from stat), it will typically look something like 1180630098. That's not very useful for most humans, unless you need to compare two timestamps by subtracting. You may need to convert it to something human-readable, such as a string like Thu May 31 09:48:18 2007. Perl can do that with the localtime function in a scalar context:

my $timestamp = 1180630098;
my $date = localtime $timestamp;


In a list context, localtime returns a list of numbers, several of which may not be quite what you'd expect:

my($sec, $min, $hour, $day, $mon, $year, $wday, $yday, $isdst)
  = localtime $timestamp;


The $mon is a month number, ranging from 0 to 11, which is handy as an index into an array of month names. The $year is the number of years since 1900, oddly enough, so add 1900 to get the real year number. The $wday ranges from 0 (for Sunday) through 6 (for Saturday), and the $yday is the day-of-the-year (ranging from 0 for January 1, through 364 or 365 for December 31).

There are two related functions that you'll also find useful. The gmtime function is just the same as localtime, except that it returns the time in Universal Time (what we once called Greenwich Mean Time). If you need the current timestamp number from the system clock, just use the time function. Both localtime and gmtime default to using the current time value if you don't supply a parameter:

my $now = gmtime;  # Get the current universal timestamp as a string


For more on manipulating dates and times, see the information in Appendix B about useful modules.
```

### 2.12.4 Bitwise Operators

```text
When you need to work with numbers bit by bit, as when working with the mode bits returned by stat, you'll need to use the bitwise operators. These are the operators that perform binary math operations on values. The bitwise operators perform binary math operations on values. The bitwise-and operator (&) reports which bits are set in the left argument and in the right argument. For example, the expression 10 & 12 has the value 8. The bitwise-and needs to have a 1-bit in both operands to produce a one-bit in the result. That means that the logical-and operation on 10 (which is 1010 in binary) and 12 (which is 1100) gives 8 (which is 1000, with a 1-bit only where the left operand has a 1-bit and the right operand also has a 1-bit). See Figure 12-1.



Examples of the bit operators are shown inTable 12-2.

Table 12-2. Bitwise operators
Expression	Meaning
10 & 12 	Bitwise-andwhich bits are true in both operands (this gives 8)
10 | 12 	Bitwise-orwhich bits are true in one operand or the other (this gives 14)
10 ^ 12 	Bitwise-xorwhich bits are true in one operand or the other but not both (this gives 6)
6 << 2 	Bitwise shift leftshift the left operand the number of bits shown by the right operand, adding zero-bits at the least-significant places (this gives 24)
25 >> 2 	Bitwise shift rightshift the left operand the number of bits shown by the right operand, discarding the least-significant bits (this gives 6)
~ 10 	Bitwise negation, also called unary bit complementreturn the number with the opposite bit for each bit in the operand (this gives 0xFFFFFFF5, but see the text)

So, here's an example of some things you could do with the $mode returned by stat. The results of these bit manipulations could be useful with chmod (which you'll see in Chapter 13):
Code View: Scroll / Show All

# $mode is the mode value returned from a stat of CONFIG
warn "Hey, the configuration file is world-writable!\n"
  if $mode & 0002;                                # configuration security problem
my $classical_mode = 0777 & $mode;                # mask off extra high-bits
my $u_plus_x = $classical_mode | 0100;            # turn one bit on
my $go_minus_r = $classical_mode & (~ 0044);      # turn two bits off
```

#### 2.12.4.1 Using Bitstrings

```text
All of the bitwise operators can work with bitstrings, as well as with integers. If the operands are integers, the result will be an integer. (The integer will be at least a 32-bit integer, but may be larger if your machine supports that. That is, if you have a 64-bit machine, ~10 may give the 64-bit result 0xFFFFFFFFFFFFFFF5, rather than the 32-bit result 0xFFFFFFF5.)

But if any operand of a bitwise operator is a string, Perl will perform the operation on that bitstring. That is, "\xAA" | "\x55" will give the string "\xFF". Note that these values are single-byte strings; the result is a byte with all eight bits set. Bitstrings may be arbitrarily long.

This is one of the very few places where Perl distinguishes between strings and numbers. See the perlop manpage for more information on using bitwise operators on strings.
```

### 2.12.5 Exercises

```text
# [15] Make a program that takes a list of files named on the command line and reports for each one whether it's readable, writable, executable, or doesn't exist. (Hint: it may be helpful to have a function that will do all of the file tests for one file at a time.) What does it report about a file that has been chmod'ed to 0? (That is, if you're on a Unix system, use the command chmod 0 some_file to mark that file as not being readable, writable, nor executable.) In most shells, use a star as the argument to mean all of the normal files in the current directory. That is, you could type something like ./ex12-2 * to ask the program for the attributes of many files at once.

$ ./file_info.pl  *

# [10] Make a program to identify the oldest file named on the command line and report its age in days. What does it do if the list is empty (that is, if no files are mentioned on the command line)?
$ ./find_oldest_file.pl *.pl
Oldest file is add_copyrights.pl, age 22.0152662037037 

# [10] Make a program that uses stacked file test operators to list all files named on the command line that are owned by you, readable, and writable.
$ ./list_myRW_files.pl *
```
