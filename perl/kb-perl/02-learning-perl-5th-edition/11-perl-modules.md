---
type: reference
title: Perl Modules
description: "Learning Perl chapter 11: finding, installing and using Perl modules."
tags: [perl, book-notes, tutorial, packaging, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "perl/KB_perl#2.11"
---

# 2.11 Perl Modules

[↑ Learning Perl, 5th Edition](/perl/kb-perl/02-learning-perl-5th-edition/README.md)

```text
There is a lot more to Perl than what we're able to show you in this book, and there are a lot of people doing a lot of interesting things with Perl. If there is a problem to solve, then somebody has probably already solved it and made their solution available on the Comprehensive Perl Archive Network (CPAN), which is a worldwide collection of servers and mirrors containing thousands of modules of reusable Perl code.
```

### 2.11.1 Finding Modules

```text
We're not going to teach you how to write modules here: you'll have to get that from the Alpaca book. In this chapter, we'll show you how to use modules that already exist.
```

#### 2.11.1.1 Finding Modules

```text
Modules come in two types: those that come with Perl and that you should have available to you, and those that you can get from CPAN to install yourself. Unless we say otherwise, the modules that we discuss come with Perl.

To find modules that don't come with Perl, start at either CPAN Search (http://search.cpan.org) or Kobes' Search (http://kobesearch.cpan.org/).[263] You can browse through the categories or search directly.

    [263] Yes, there should be two s's in that URL, but there aren't and nobody ever fixed it.

Either of those resources is great since you can read the module before you download the entire package. You can also browse the distribution and have a peek at the files without the bother of installing the modules.

Before you go looking for a module, you should check whether it is already installed. One way is to just try to read the documentation with perldoc. The CGI.pm module comes with Perl (and we'll discuss it later in this chapter), so you should be able to read its documentation:

$ perldoc CGI


Try it with a module that does not exist and you'll get an error message.

$ perldoc Llamas
$ No documentation found for "Llamas".


The documentation may be available in other formats, such as HTML, on your system, too. If the documentation is there.[*]

    [*] We cover Perl documentation in Intermediate Perl (O'Reilly), but for now, just believe us that most module documentation is in the same file as the actual code.
```

### 2.11.2 Installing Modules

```text
When you want to install a module that you don't already have, sometimes you can simply download the distribution, unpack it, and run a series of commands from the shell. Check for a README or INSTALL file that gives you more information. If the module uses MakeMaker,[dagger] the sequence will be something like this:

    [dagger] That's really the Perl module ExtUtils::MakeMaker, which comes with Perl. It handles all of the stuff to create the file that will have the installation instructions appropriate for your system and installation of Perl.

$ perl Makefile.PL
$ make install


If you can't install modules in the system-wide directories, you can specify another directory with a PREFIX argument to Makefile.PL:

$ perl Makefile.PL PREFIX=/Users/fred/lib


Some Perl module authors use another module, Module::Build, to build and install their creations. That sequence will be something like this:

$ perl Build.PL
$ ./Build install


Some modules depend on other modules though, and they won't work unless you install yet more modules. Instead of doing all that work ourselves, we can use one of the modules that comes with Perl, CPAN.pm.[double dagger] From the command line, you can start up the CPAN.pm, from which you can issue commands:

    [double dagger] The ".pm" file extension stands for "Perl Module," and some popular modules are pronounced with the ".pm" to distinguish them from something else. In this case, CPAN the archive is different than CPAN the module, so the latter is said "CPAN.pm."

$ perl -MCPAN -e shell


Even this can be a little complicated, so a while ago one of our authors wrote a little script called "cpan," which also comes with Perl and is usually installed with perl and its tools. Just call the script with a list of the modules you want to install:

$ cpan Module::CoreList LWP CGI::Prototype


You might be saying, "But I don't have a command line!" If you are using the ActiveState port of Perl (for Windows, Linux, or Solaris), you can use the Perl Package Manager (PPM),[*] which installs modules for you. You can even get the ActiveState ports on CD or DVD.[dagger] Besides what you've seen so far, your particular operating system may have ways to install software, including Perl modules.

    [*] http://aspn.activestate.com/ASPN/docs/ActivePerl/faq/ActivePerl-faq2.html

    [dagger] You can make your own CDs or DVDs too by creating a local repository. Even though CPAN is almost 4 GB by now, a "minicpan" (again, by one of the authors) pares it down to just the latest versions of everything, which is about 800 MB. See the CPAN::Mini module.
```

### 2.11.3 Using Simple Modules

```text
Suppose that you've got a long filename like /usr/local/bin/perl in your program, and you need to find out the basename. That's easy enough, since the basename is everything after the last slash (it's just perl in this case):

my $name = "/usr/local/bin/perl";
(my $basename = $name) =~ s#.*/##;  # Oops!


As you saw earlier, first Perl will do the assignment inside the parentheses, then it will do the substitution. The substitution is supposed to replace any string ending with a slash (that is, the directory name portion) with an empty string, leaving just the basename.

And if you try this, it seems to work. Well, it seems to, but actually, there are three problems.

First, a Unix file or directory name could contain a newline character. (It's not something that's likely to happen by accident, but it's permitted.) So, since the regular expression dot (.) can't match a newline, a filename like the string "/home/fred/flintstone\n/brontosaurus" won't work rightthat code would think the basename is "flintstone\n/brontosaurus". You could fix that with the /s option to the pattern (if you remembered about this subtle and infrequent case), making the substitution look like this: s#.*/##s. The second problem is that this is Unix-specific. It assumes that the forward slash will always be the directory separator, as it is on Unix, and not the backslash or colon that some systems use.

And the third (and biggest) problem with this is that we're trying to solve a problem that someone else has already solved. Perl comes with a number of modules, which are smart extensions to Perl that add to its functionality. And if those aren't enough, there are many other useful modules available on CPAN, with new ones being added every week. You (or, better yet, your system administrator) can install them if you need their functionality.

In the rest of this section, we'll show you how to use some of the features of a couple of simple modules that come with Perl. (There's more that these modules can do; this is just an overview to illustrate the general principles of how to use a simple module.)

Alas, we can't show you everything you'd need to know about using modules in general, since you'd have to understand advanced topics like references and objects in order to use some modules.[*] Those topics, including how to create a module, are covered in great detail in the Alpaca. But this section should prepare you for using many simple modules. Further information on some interesting and useful modules is included in Appendix B.

    [*] As we'll see in the next few pages, though, you may be able to use a module that uses objects and references without having to understand those advanced topics.
```

#### 2.11.3.1 The File::Basename Module

```text
In the previous example, we found the basename of a filename in a way that's not portable. We showed that something that seemed straightforward was susceptible to subtle mistaken assumptions (here, the assumption was that newlines would never appear in file or directory names). And we were reinventing the wheel, solving a problem that others have solved (and debugged) many times before us.

Here's a better way to extract the basename of a filename. Perl comes with a module called File::Basename. With the command perldoc File::Basename, or with your system's documentation system, you can read about what it does. That's the first step when using a new module. (It's often the third and fifth steps, as well.)

Soon you're ready to use it, so you declare it with a use directive near the top of your program:[dagger]

 use File::Basename


    [dagger] It's traditional to declare modules near the top of the file, since that makes it easy for the maintenance programmer to see which modules you'll be using. That greatly simplifies matters when it's time to install your program on a new machine, for example.

During compilation, Perl sees that line and loads up the module. Now, it's as if Perl has some new functions that you may use in the remainder of your program.[double dagger] The one we wanted in the earlier example is the basename function itself:

    [double dagger] You guessed it: there's more to the story, having to do with packages and fully qualified names. When your programs are growing beyond a few hundred lines in the main program (not counting code in modules), which is quite large in Perl, you should probably read up about these advanced features. Start with the perlmod manpage.

my $name = "/usr/local/bin/perl";
my $basename = basename $name;  # gives 'perl'


Well, that worked for Unix. What if our program were running on MacPerl or Windows or VMS, to name a few? There's no problemthis module can tell which kind of machine you're using, and it uses that machine's filename rules by default. (Of course, you'd have that machine's kind of filename string in $name, in that case.)

There are some related functions also provided by this module. One is the dirname function, which pulls the directory name from a full filename. The module also lets you separate a filename from its extension, or change the default set of filename rules.[*]

    [*] You might need to change the filename rules if you were trying to work with a Unix machine's filenames from a Windows machineperhaps while sending commands over an FTP connection, for example.
```

#### 2.11.3.2 Using Only Some Functions from a Module

```text
Suppose you discovered that when you went to add the File::Basename module to your existing program, you already have a subroutine called &dirnamethat is, you already have a subroutine with the same name as one of the module's functions.[dagger] Now there's trouble because the new dirname is also implemented as a Perl subroutine (inside the module). What do you do?

    [dagger] Well, it's not likely that you would already have a &dirname subroutine that you use for another purpose, but this is just an example. Some modules offer hundreds (really!) of new functions, making a name collision that much more frequent.

Simply give File::Basename, in your use declaration, an import list showing exactly which function names it should give you, and it'll supply those and no others. Here, we'll get nothing but basename:

use File::Basename qw/ basename /;


And here, we'll ask for no new functions at all:

use File::Basename qw/ /;


This is also frequently written as:

use File::Basename ();


Why would you want to do that? Well, this directive tells Perl to load File::Basename, just as before, but not to import any function names. Importing lets us use the short, simple function names like basename and dirname. But even if we don't import those names, we can still use the functions. When they're not imported, though, we have to call them by their full names:

use File::Basename qw/ /;                     # import no function names

my $betty = &dirname($wilma);                 # uses our own subroutine &dirname
                                                   #(not shown)

my $name = "/usr/local/bin/perl";
my $dirname = File::Basename::dirname $name;  # dirname from the module

					  


As you can see, the full name of the dirname function from the module is File::Basename::dirname. We can always use the function's full name (once we've loaded the module) whether we've imported the short name dirname or not.

Most of the time, you'll want to use a module's default import list. But you can always override that with a list of your own if you want to leave out some of the default items. Another reason to supply your own list would be if you wanted to import some function not on the default list, since most modules include some (infrequently needed) functions that are not on the default import list.

As you'd guess, some modules will, by default, import more symbols than others. Each module's documentation should make it clear which symbols it imports, if any, but you are always free to override the default import list by specifying one of your own, just as we did with File::Basename. Supplying an empty list imports no symbols.
```

#### 2.11.3.3 The File::Spec Module

```text
Now you can find out a file's basename. That's useful, but you'll often want to put that together with a directory name to get a full filename. For example, here we want to take a filename like /home/rootbeer/ice-2.1.txt and add a prefix to the basename:

use File::Basename;

print "Please enter a filename: ";
chomp(my $old_name = <STDIN>);

my $dirname = dirname $old_name;
my $basename = basename $old_name;

$basename =~ s/^/not/;  # Add a prefix to the basename
my $new_name = "$dirname/$basename";

rename($old_name, $new_name)
  or warn "Can't rename '$old_name' to '$new_name': $!";


Do you see the problem here? Once again, we're making the assumption that filenames will follow the Unix conventions and use a forward slash between the directory name and the basename. Fortunately, Perl comes with a module to help with this problem, too.

The File::Spec module is used for manipulating file specifications, which are the names of files, directories, and the other things that are stored on filesystems. Like File::Basename, it understands what kind of system it's running on, and it chooses the right set of rules every time. But unlike File::Basename, File::Spec is an object-oriented (often abbreviated OO) module.

If you've never caught the fever of OO, don't let that bother you. If you understand objects, that's great; you can use this OO module. If you don't understand objects, that's okay, too. You just type the symbols as we show you, and it works just as if you knew what you were doing.

In this case, we learn from reading the documentation for File::Spec that we want to use a method called catfile. What's a method? It's just a different kind of function, as far as we're concerned here. The difference is that you'll always call the methods from File::Spec with their full names, like this:

use File::Spec;

.
.  # Get the values for $dirname and $basename as above
.

my $new_name = File::Spec->catfile($dirname, $basename);

rename($old_name, $new_name)
  or warn "Can't rename '$old_name' to '$new_name': $!";


As you can see, the full name of a method is the name of the module (called a class here), a small arrow (->) and the short name of the method. It is important to use the small arrow, rather than the double colon we used with moreinfo="none">File::Basename.

Since we're calling the method by its full name, though, what symbols does the module import? None of them. That's normal for OO modules. So you don't have to worry about having a subroutine with the same name as one of the many methods of File::Spec.

Should you bother using modules like these? It's up to you, as always. If you're sure your program will never be run anywhere but on a Unix machine, say, and you're sure you completely understand the rules for filenames on Unix,[*] then you may prefer to hardcode your assumptions into your programs. But these modules give you an easy way to make your programs more robust in less timeand more portable at no extra charge.

    [*] If you didn't know that filenames and directory names could contain newline characters, as we mentioned earlier in this section, then you don't know all the rules, do you?
```

#### 2.11.3.4 CGI.pm

```text
If you need to create CGI programs (which we don't cover in this book), use the CGI.pm module.[dagger] Unless you really know what you are doing (and sometimes even then), you don't need to handle the actual interface and input parsing portion of the script, which gets so many other people into trouble. The CGI.pm author, Lincoln Stein, spent a lot of time ensuring that the module would work with most servers and operating systems. Just use the module and focus on the interesting parts of your script.

    [dagger] As with the CPAN.pm module, we pronounce the ".pm" in CGI.pm to distinguish it from the protocol itself.

The CGI module has two flavors: the plain old functional interface and the object-oriented interface. We'll use the first one. As before, you can follow the examples in the CGI.pm documentation. Our simple CGI script parses the CGI input and displays the input names and values as a plain-text document. In the import list, we use :all, which is an export tag that specifies a group of functions rather than a single function like you saw with the previous modules:[*]

    [*] The module has several other export tags to select different groups of functions. For instance, if you want the ones that deal with just the CGI, you can use :cgi, or if you just want the HTML generation functions, you can use :html4. See the CGI.pm documentation for more details.

#!/usr/bin/perl

use CGI qw(:all);

print header("text/plain");

foreach my $param ( param() )
    {
    print "$param: " . param($param) . "\n";
    }


We can get fancier though because we want to output HTML, and CGI.pm has many, many convenience functions to do that. It handles the CGI header, the beginning parts of HTML with start_html(), and many of the HTML tags with functions of the same name, like h1() for the H1 tag:

#!/usr/bin/perl

use CGI qw(:all);

print header(),
    start_html("This is the page title"),
    h1( "Input parameters" );

my $list_items;
foreach my $param ( param() )
    {
    $list_items .= li( "$param: " . param($param) );
    }

print ul( $list_items );

print end_html();


Wasn't that easy? You don't have to know how CGI.pm is doing all this stuff; you just have to trust that it does it correctly. Once you let CGI.pm do all the hard work, you get to focus on the interesting parts of your program.

The CGI.pm module does a lot more: it can handle cookies, redirection, multipage forms, and a lot more. We don't have room to cover it here, but you'll learn more from the examples in the module documentation.
```

#### 2.11.3.5 Databases and DBI

```text
The DBI (Database Interface) module doesn't come with Perl, but it's one of the most popular modules since most people have to connect to a database of some sort. The beauty of DBI is that it allows you to use the same interface for just about any common database, from simple comma-separated value files to big database servers like Oracle. It has ODBC drivers, and some of its drivers are even vendor supported. To get the full details, get Programming the Perl DBI by Alligator Descartes and Tim Bunce (O'Reilly). You can also check out the DBI web site at http://dbi.perl.org/.

Once you install DBI, you also have to install a DBD (Database Driver). You can get a long list of DBDs from CPAN Search. Install the right one for your database server, and ensure that you get the version that goes with the version of your server.

The DBI is an object-oriented module, but you don't have to know everything about OO programming to use it. You just have to follow the examples in the documentation. To connect to a database, you use the DBI module, then call its connect method:

use DBI;

$dbh = DBI->connect($data_source, $username, $password);


The $data_source contains information particular to the DBD that you want to use, so you'll get that from the DBD. For PostgreSQL, the driver is DBD::Pg, and the $data_source is something like:

my $data_source = "dbi:Pg:dbname=name_of_database";


Once you connect to the database, you go through a cycle of preparing, executing, and reading queries.

$sth = $dbh->prepare("SELECT * FROM foo WHERE bla");
$sth->execute();
@row_ary  = $sth->fetchrow_array;
$sth->finish;


When you are finished, you disconnect from the database.

$dbh->disconnect();


There are all sorts of other things that the DBI can do too. See its documentation for more details.
```

### 2.11.4 Exercise

```text
[15] Install the Module::CoreList module from CPAN. Print a list of all of the modules that came with Perl 5.008. To build a hash whose keys are the names of the modules that came with a given version of Perl, use this line:

my %modules = %{ $Module::CoreList::version{5.008} };

Install:
-> DL from CPAN
-> Then:
$ perl Makefile.PL 
Checking if your kit is complete...
Looks good
Writing Makefile for Module::CoreList
$ make install
cp lib/Module/CoreList.pm blib/lib/Module/CoreList.pm
cp corelist blib/script/corelist
/usr/bin/perl.exe "-MExtUtils::MY" -e "MY->fixin(shift)" blib/script/corelist
Installing /usr/lib/perl5/5.10/Module/CoreList.pm
Installing /usr/bin/corelist
Writing /usr/lib/perl5/5.10/i686-cygwin/auto/Module/CoreList/.packlist
Appending installation info to /usr/lib/perl5/5.10/i686-cygwin/perllocal.pod

-> Solution in print_modules.pl
```
