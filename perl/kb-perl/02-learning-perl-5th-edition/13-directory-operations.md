---
type: reference
title: Directory Operations
description: "Learning Perl chapter 13: directory operations, globbing and directory handles."
tags: [perl, book-notes, tutorial, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "perl/KB_perl#2.13"
---

# 2.13 Directory Operations

[↑ Learning Perl, 5th Edition](/perl/kb-perl/02-learning-perl-5th-edition/README.md)

```text
	The files we created in the previous chapter were generally in the same place as our program. But modern operating systems let us organize files into directories, allowing us to keep our Beatles MP3s away from our important Llama book chapter sources so that we don't accidentally send an MP3 file to the publisher. Perl lets you manipulate these directories directly, in ways that are even fairly portable from one operating system to another.
```

### 2.13.1 Moving Around the Directory Tree

```text
Your program runs with a "working directory," which is the starting point for relative pathnames. That is, if you refer to the file fred, that means fred in the current working directory.

The chdir operator changes the working directory. It's just like the Unix shell's cd command:

chdir "/etc" or die "cannot chdir to /etc: $!";


Because this is a system request, the value of $! will be set if an error occurs. You should normally check $! when a false value is returned from chdir, since that indicates that something has not gone as requested.

The working directory is inherited by all processes that Perl starts (we'll talk more about that in Chapter 16). However, the change in working directory cannot affect the process that invoked Perl, such as the shell.[287] So you can't make a Perl program to replace your shell's cd command.

    [287] This isn't a limitation on Perl's part; it's actually a feature of Unix, Windows, and other systems. If you really need to change the shell's working directory, see the documentation of your shell.

If you omit the parameter, Perl determines your home directory as best as it can and attempts to set the working directory to your home directory, similar to using the cd command at the shell without a parameter. This is one of the few places where omitting the parameter doesn't use $_.

Some shells permit you to use a tilde-prefixed path with cd to use another user's home directory as a starting point (like cd ~merlyn). This is a function of the shell, not the operating system, and Perl is calling the operating system directly. Thus, a tilde prefix will not work with chdir.
```

### 2.13.2 Globbing

```text
Normally, the shell expands any filename patterns on each command line into the matching filenames. This is called globbing. For example, if you give a filename pattern of *.pm to the echo command, the shell expands this list to a list of names that match:

$ echo *.pm
barney.pm dino.pm fred.pm wilma.pm
$


The echo command doesn't have to know anything about expanding *.pm because the shell has already expanded it. This works even for your Perl programs:

$ cat >show-args
foreach $arg (@ARGV) {
  print "one arg is $arg\n";
}
^D
$ perl show-args *.pm
one arg is barney.pm
one arg is dino.pm
one arg is fred.pm
one arg is wilma.pm
$


Note that show-args didn't need to know anything about globbingthe names were already expanded in @ARGV.

But sometimes we end up with a pattern like *.pm inside our Perl program. Can we expand this pattern into the matching filenames without working very hard? Surejust use the glob operator:

my @all_files = glob "*";
my @pm_files = glob "*.pm";


Here, @all_files gets all the files in the current directory, alphabetically sorted, and not including the files beginning with a period, just like the shell. And @pm_files gets the same list that we got before by using *.pm on the command line.

In fact, anything you can say on the command line, you can also put as the (single) argument to glob, including multiple patterns separated by spaces:

my @all_files_including_dot = glob ".* *";


Here, we've included an additional "dot star" parameter to get the filenames that begin with a dot as well as the ones that don't. Please note that the space between these two items inside the quoted string is significant, as it separates two different items you want to glob.[*] The reason this works exactly as the shell works is that prior to Perl version 5.6, the glob operator simply called /bin/csh[dagger] behind the scenes to perform the expansion. Because of this, globs were time-consuming and could break in large directories, or in some other cases. Conscientious Perl hackers avoided globbing in favor of directory handles, which we will discuss later in this chapter. However, if you're using a modern version of Perl, you should no longer be concerned about such things.

    [*] Windows users may be accustomed to using a glob of *.* to mean "all files." But that actually means "all files with a dot in their names," even in Perl on Windows.

    [dagger] Or it will call a valid substitute if a C shell wasn't available.
```

### 2.13.3 An Alternate Syntax for Globbing

```text
Although we use the term globbing freely, and we talk about the glob operator, you might not see the word glob in very many of the programs that use globbing. Why not? Well, most legacy code was written before the glob operator was given a name. Instead, it was called up by the angle-bracket syntax, similar to reading from a filehandle:

my @all_files = <*>; ## exactly the same as my @all_files = glob "*";


The value between the angle brackets is interpolated similarly to a double-quoted string, which means that Perl variables are expanded to their current Perl values before being globbed:

my $dir = "/etc";
my @dir_files = <$dir/* $dir/.*>;


Here, we've fetched all the nondot and dot files from the designated directory because $dir has been expanded to its current value.

So, if using angle brackets means both filehandle reading and globbing, how does Perl decide which of the two operators to use? Well, a filehandle has to be a Perl identifier. So, if the item between the angle brackets is strictly a Perl identifier, it's a filehandle read; otherwise, it's a globbing operation. For example:

my @files = <FRED/*>;  ## a glob
my @lines = <FRED>;    ## a filehandle read
my $name = "FRED";
my @files = <$name/*>; ## a glob


The one exception is if the contents are a simple scalar variable (not an element of a hash or array); then it's an indirect filehandle read,[double dagger] where the variable contents give the name of the filehandle you want to read:

    [double dagger] If the indirect handle is a text string, then it's subject to the "symbolic reference" test that is forbidden under use strict. However, the indirect handle might also be a typeglob or reference to an I/O object, and then it would work even under use strict.

my $name = "FRED";
my @lines = <$name>; ## an indirect filehandle read of FRED handle


Determining whether it's a glob or a filehandle read is done at compile time, and thus it is independent of the content of the variables.

If you want, you can get the operation of an indirect filehandle read using the readline operator,[*] which also makes it clearer:

    [*] If you're using Perl 5.005 or later.

my $name = "FRED";
my @lines = readline FRED;  ## read from FRED
my @lines = readline $name; ## read from FRED


But the readline operator is rarely used, as indirect filehandle reads are uncommon and are generally performed against a simple scalar variable anyway.
```

### 2.13.4 Directory Handles

```text
Another way to get a list of names from a given directory is with a directory handle. A directory handle looks and acts like a filehandle. You open it (with opendir instead of open), you read from it (with readdir instead of readline), and you close it (with closedir instead of close). But instead of reading the contents of a file, you're reading the names of files (and other things) in a directory. For example:

my $dir_to_process = "/etc";
opendir DH, $dir_to_process or die "Cannot open $dir_to_process: $!";
foreach $file (readdir DH) {
  print "one file in $dir_to_process is $file\n";
}
closedir DH;


Like filehandles, directory handles are automatically closed at the end of the program or if the directory handle is reopened onto another directory.

Unlike globbing, which in older versions of Perl fired off a separate process, a directory handle never fires off another process. So it makes them more efficient for applications that demand every ounce of power from the machine. However, it's also a lower-level operation, meaning that we have to do more of the work ourselves.

For example, the names are returned in no particular order.[dagger] And the list includes all files, not just those matching a particular pattern (like *.pm from our globbing examples). It is also includes the dot files, and particularly the dot and dot-dot entries.[double dagger] So, if we wanted only the pm-ending files, we could use a skip-over function inside the loop:

    [dagger] It's actually the unsorted order of the directory entries, similar to the order you get from ls -f or find.

    [double dagger] Do not make the mistake of many old Unix programs and presume that dot and dot-dot are always returned as the first two entries (sorted or not). If that hadn't even occurred to you, pretend we never said it because it's a false presumption. In fact, we're now sorry for even bringing it up.

while ($name = readdir DIR) {
  next unless $name =~ /\.pm$/;
  ... more processing ...
}


Note here that the syntax is that of a regular expression, not a glob. And if we wanted all the nondot files, we could say that:

next if $name =~ /^\./;


Or if we wanted everything but the common dot (current directory) and dot-dot (parent directory) entries, we could explicitly say that:

next if $name eq "." or $name eq "..";


Now we'll look at the part that gets most people mixed up, so pay close attention. The filenames returned by the readdir operator have no pathname component. It's just the name within the directory. So, we're not looking at /etc/passwd, we're just looking at passwd. (And because this is another difference from the globbing operation, it's easy to see how people get confused.)

So you'll need to patch up the name to get the full name:

opendir SOMEDIR, $dirname or die "Cannot open $dirname: $!";
while (my $name = readdir SOMEDIR) {
  next if $name =~ /^\./; # skip over dot files
  $name = "$dirname/$name"; # patch up the path
  next unless -f $name and -r $name; # only readable files
  ...
}


Without the patch, the file tests would have been checking files in the current directory, rather than in the directory named in $dirname. This is the single most common mistake when using directory handles.
```

### 2.13.5 Recursive Directory Listing

```text
You probably won't need recursive directory access for the first few dozen hours of your Perl programming career. So rather than distract you with the possibility of replacing all those ugly find scripts with Perl right now, we'll simply entice you by saying that Perl comes with a nice library called File::Find, which you can use for nifty recursive directory processing. We're also saying this to keep you from writing your own routineswhich everyone seems to want to do after those first few dozen hours of programmingand then getting puzzled about things like "local directory handles" and "how do I change my directory back?"
```

### 2.13.6 Manipulating Files and Directories

```text
Perl is commonly used to wrangle files and directories. Because Perl grew up in a Unix environment and still spends most of its time there, most of the description in this chapter may seem Unix-centric. But the nice thing is that to whatever degree possible, Perl works exactly the same way on non-Unix systems.
```

### 2.13.7 Removing Files

```text
Most of the time, we make files so that the data can stay around for a while. But when the data has outlived its life, it's time to make the file go away. At the Unix shell level, we'd type an rm command to remove a file or files:

$ rm slate bedrock lava


In Perl, we use the unlink operator:

unlink "slate", "bedrock", "lava";


This sends the three named files away to bit heaven, never to be seen again.

Now, since unlink takes a list, and the glob function returns a list, we can combine the two to delete many files at once:

unlink glob "*.o";


This is similar to rm *.o at the shell, except that we didn't have to fire off a separate rm process. So we can make those important files go away that much faster!

The return value from unlink tells us how many files have been successfully deleted. So, going back to the first example, we can check its success:

my $successful = unlink "slate", "bedrock", "lava";
print "I deleted $successful file(s) just now\n";


Sure, if this number is 3, we know it removed all of the files, and if it's 0, then we removed none of them. But what if it's 1 or 2? Well, there's no clue as to which ones were removed. If you need to know, do them one at a time in a loop:

foreach my $file (qw(slate bedrock lava)) {
  unlink $file or warn "failed on $file: $!\n";
}


Here, each file being deleted one at a time means the return value will be 0 (failed) or 1 (succeeded), which happens to look like a nice Boolean value, controlling the execution of warn. Using or warn is similar to or die, except that it's not fatal, of course (as we said back in Chapter 5). In this case, we put the newline on the end of the message to warn because it's not a bug in our program that causes the message.

When a particular unlink fails, the $! variable is set to something related to the operating system error, which we've included in the message. This makes sense to use only when doing one filename at a time because the next operating system failed request resets the variable. You can't remove a directory with unlink (just like you can't remove a directory with the simple rm invocation either). Look for the rmdir function coming up shortly for that.

Now, here's a little-known Unix fact. It turns out that you can have a file that you can't read, you can't write, you can't execute, maybe you don't even own the filethat is, it's somebody else's file altogetherbut you can still delete it. That's because the permission to unlink a file doesn't depend upon the permission bits on the file itself; it's the permission bits on the directory that contains the file that matters.

We mention this because it's normal for a beginning Perl programmer, in the course of trying out unlink, to make a file, to chmod it to 0 (so that it's not readable or writable), and then to see whether this makes unlink fail. But instead it vanishes without so much as a whimper.[*] If you really want to see a failed unlink, though, just try to remove /etc/passwd or a similar system file. Since that's a file controlled by the system administrator, you won't be able to remove it.[dagger]

    [*] Some of these folks know that rm would generally ask before deleting such a file. But rm is a command, and unlink is a system call. System calls never ask permission, and they never say they're sorry.

    [dagger] Of course, if you're silly enough to try this kind of thing when you are logged in as the system administrator, you deserve what you get.
```

### 2.13.8 Renaming Files

```text
Giving an existing file a new name is simple with the rename  function:

rename "old", "new";


This is similar to the Unix mv command, taking a file named old and giving it the name new in the same directory. You can even move things around:

rename "over_there/some/place/some_file", "some_file";


This moves a file called some_file from another directory into the current directory, provided the user running the program has the appropriate permissions.[double dagger] Like most functions that request something of the operating system, rename returns false if it fails, and sets $! with the operating system error, so you can (and often should) use or die (or or warn) to report this to the user.

    [double dagger] And the files must reside on the same filesystem. You'll see why this rule exists a little later in this chapter.

One frequent[||] question in the Unix shell-usage newsgroups concerns how to rename everything that ends with .old to the same name with .new. Here's how to do it in Perl nicely:

    [||] This isn't just any old frequent question; the question of renaming a batch of files at once is the most frequent question asked in these newsgroups. And that's why it's the first question answered in the FAQs for those newsgroups. And yet, it stays in first place. Hmmm.

foreach my $file (glob "*.old") {
  my $newfile = $file;
  $newfile =~ s/\.old$/.new/;
  if (-e $newfile) {
    warn "can't rename $file to $newfile: $newfile exists\n";
  } elsif (rename $file, $newfile) {
    ## success, do nothing
  } else {
    warn "rename $file to $newfile failed: $!\n";
  }
}


The check for the existence of $newfile is needed because rename will happily rename a file right over the top of an existing file, presuming the user has permission to remove the destination filename. We put the check in so that it's less likely that we'll lose information this way. Of course, if you wanted to replace existing files like wilma.new, you wouldn't bother testing with -e first.

Those first two lines inside the loop can be combined (and often are) to simply:

(my $newfile = $file) =~ s/\.old$/.new/;


This works to declare $newfile, copy its initial value from $file, then modify $newfile with the substitution. You can read this as "transform $file to $newfile using this replacement on the right." And yes, because of precedence, those parentheses are required.

Also, some programmers seeing this substitution for the first time wonder why the backslash is needed on the left, but not on the right. The two sides aren't symmetrical: the left part of a substitution is a regular expression, and the right part is a double-quoted string. So we use the pattern /\.old$/ to mean ".old anchored at the end of the string" (anchored at the end because we don't want to rename the first occurrence of .old in a file called betty.old.old), but on the right we can simply write .new to make the replacement.
```

### 2.13.9 Links and Files

```text
To understand more about what's going on with files and directories, it helps to understand the Unix model of files and directories, even if your non-Unix system doesn't work in exactly this way. As usual, there's more to the story than we're able to explain here, so check any good book on Unix internal details if you need the full story.

A mounted volume is a hard disk drive (or something else that works more or less like that, such as a disk partition, a floppy disk, a CD-ROM, or a DVD-ROM). It may contain any number of files and directories. Each file is stored in a numbered inode, which we can think of as a particular piece of disk real estate. One file might be stored in inode 613, while another is in inode 7033.

To locate a particular file, though, we'll have to look it up in a directory. A directory is a special kind of file, maintained by the system. Essentially, it is a table of filenames and their inode numbers.[*] Along with the other things in the directory, there are always two special directory entries. One is . (called "dot"), which is the name of that very directory; the other is .. ("dot-dot"), which is the directory one step higher in the hierarchy (i.e., the directory's parent directory).[dagger] 

    [*] On Unix systems (others don't generally have inodes, hard links, and such), you can use the ls command's -i option to see files' inode numbers. Try a command like ls -ail. When two or more inode numbers are the same for multiple items on a given filesystem, there's really just one file involved, one piece of the disk.

    [dagger] The Unix system root directory has no parent. In that directory, .. is the same directory as ., which is the system root directory itself.


When it's time to make a new file in a given directory, the system adds an entry with the file's name and the number of a new inode. How can the system tell that a particular inode is available though? Each inode holds a number called its link count. The link count is always zero if the inode isn't listed in any directory, so any inode with a link count of zero is available for new file storage. When the inode is added to a directory, the link count is incremented; when the listing is removed, the link count is decremented. For the file chicken as illustrated above, the inode count of 1 is shown in the box above the inode's data.

But some inodes have more than one listing. For example, we've already seen that each directory entry includes ., which points back to that directory's own inode. So the link count for a directory should always be at least two: its listing in its parent directory and its listing in itself. In addition, if it has subdirectories, each of those will add a link, since each will contain ...[*] In Figure 13-1, the directory's inode count of 2 is shown in the box above its data. A link count is the number of true names for the inode.[dagger] Could an ordinary file inode have more than one listing in the directory? It certainly could. Suppose that, working in the directory shown above, Barney uses the Perl link function to create a new link:

    [*] This implies that the link count of a directory is always equal to two plus the number of directories it contains. On some systems that's true, in fact, but some other systems work differently.

    [dagger] In the traditional output of ls -l, the number of hard links to the item appears just to the right of the permission flags (like -rwxr-xr-x). Now you know why this number is more than one for directories and nearly always 1 for ordinary files.

link "chicken", "egg"
  or warn "can't link chicken to egg: $!";


This is similar to typing "ln chicken egg" at the Unix shell prompt. If link succeeds, it returns true. If it fails, it returns false and sets $!, which Barney is checking in the error message. After this runs, the name egg is another name for the file chicken, and vice versa; neither name is "more real" than the other, and (as you may have guessed) it would take some detective work to find out which came first. 



These two filenames are thus talking about the same place on the disk. If the file chicken holds 200 bytes of data, egg holds the same 200 bytes, for a total of 200 bytes (since it's really just one file with two names). If Barney appends a new line of text to file egg, that line will also appear at the end of chicken.[double dagger] Now, if Barney were to accidentally (or intentionally) delete chicken, that data will not be lostit's still available under the name egg. And vice versa: if he were to delete egg, he'd still have chicken. Of course, if he deletes both of them, the data will be lost.[*] There's another rule about the links in directory listings: the inode numbers in a given directory listing all refer to inodes on that same mounted volume.[dagger] This rule ensures that if the physical medium (the diskette, perhaps) is moved to another machine, all of the directories stick together with their files. That's why you can use rename to move a file from one directory to another, but only if both directories are on the same filesystem (mounted volume). If they were on different disks, the system would have to relocate the inode's data, which is too complex an operation for a simple system call.

    [double dagger] If you experiment with making links and changing text files, be aware that most text editors don't edit the file "in place" but instead save a modified copy. If Barney were to edit egg with a text editor, he'd most likely end up with a new file called egg and the old file called chickentwo separate files, rather than two links to the same file.

    [*] Although the system won't necessarily overwrite this inode right away, there's no easy way in general to get the data back once the link count has gone to zero. Have you made a backup recently?

    [dagger] The one exception is the special .. entry in the volume's root directory, which refers to the directory in which that volume is mounted.

And yet another restriction on links is that they can't make new names for directories. That's because the directories are arranged in a hierarchy. If you were able to change that, utility programs like find and pwd could easily become lost trying to find their way around the filesystem.

So, links can't be added to directories, and they can't cross from one mounted volume to another. Fortunately, there's a way to get around these restrictions on links, by using a new and different kind of link: a symbolic link.[double dagger] A symbolic link (also called a soft link to distinguish it from the true or hard links that we've been talking about up to now) is a special entry in a directory that tells the system to look elsewhere. Let's say that Barney (working in the same directory of poems as before) creates a symbolic link with Perl's symlink function, like this:

    [double dagger] Some very old Unix systems don't support symlinks, but those are pretty rare nowadays.

symlink "dodgson", "carroll"
  or warn "can't symlink dodgson to carroll: $!";


This is similar to what would happen if Barney used the command ln -s dodgson carroll from the shell. 


Now if Barney chooses to read /home/barney/poems/carroll, he gets the same data as if he had opened /home/barney/poems/dodgson because the system follows the symbolic link automatically. But that new name isn't the "real" name of the file because (as you can see in the diagram) the link count on inode 7033 is still just one. That's because the symbolic link simply tells the system, "If you got here looking for carroll, now you want to go off to find something called dodgson instead."

A symbolic link can freely cross mounted filesystems or provide a new name for a directory, unlike a hard link. In fact, a symbolic link could point to any filename, one in this directory or in another oneor even to a file that doesn't exist! But that also means that a soft link can't keep data from being lost as a hard link can, since the symlink doesn't contribute to the link count. If Barney were to delete dodgson, the system would no longer be able to follow the soft link.[*] Even though there would still be an entry called carroll, trying to read from it would give an error like file not found. The file test -l 'carroll' would report true, but -e 'carroll' would be false: it's a symlink, but it doesn't exist.

    [*] Deleting carroll would merely remove the symlink, of course.

Since a soft link could point to a file that doesn't yet exist, it could be used when creating a file as well. Barney has most of his files in his home directory, /home/barney, but he also needs frequent access to a directory with a long name that is difficult to type: /usr/local/opt/system/httpd/root-dev/users/staging/barney/cgi-bin. So he sets up a symlink named /home/barney/my_stuff, which points to that long name, and now it's easy for him to get to it. If he creates a file (from his home directory) called my_stuff/bowling, that file's real name is /usr/local/opt/system/httpd/root-dev/users/staging/barney/cgi-bin/bowling. Next week, when the system administrator moves these files of Barney's to /usr/local/opt/internal/httpd/www-dev/users/staging/barney/cgi-bin, Barney just repoints the one symlink, and now he and all of his programs can still find his files with ease.

It's normal for either /usr/bin/perl or /usr/local/bin/perl (or both) to be symbolic links to the true Perl binary on your system. This makes it easy to switch to a new version of Perl. Say you're the system administrator, and you've built the new Perl. Of course, your older version is still running, and you don't want to disrupt anything. When you're ready for the switch, you simply move a symlink or two, and now every program that begins with #!/usr/bin/perl will automatically use the new version. In the unlikely case that there's some problem, it's a simple thing to replace the old symlinks and have the older Perl running the show again. (But, like any good admin, you notified your users to test their code with the new /usr/bin/perl-7.2 well in advance of the switch, and you told them that they can keep using the older one during the next month's grace period by changing their programs' first lines to #!/usr/bin/perl-6.1, if they need to.)

Perhaps surprisingly, both hard and soft links are very useful. Many non-Unix operating systems have neither, and the lack is sorely felt. On some non-Unix systems, symbolic links may be implemented as a "shortcut" or an "alias"check the perlport manpage for the latest details.

To find out where a symbolic link is pointing, use the readlink function. This will tell you where the symlink leads, or it will return undef if its argument wasn't a symlink:

my $where = readlink "carroll";             # Gives "dodgson"

my $perl = readlink "/usr/local/bin/perl";  # Maybe tells where perl is


You can remove either kind of link with unlink and now you see where that operation gets its name. unlink simply removes the directory entry associated with the given filename, decrementing the link count and thus possibly freeing the inode.
```

### 2.13.10 Making and Removing Directories

```text
Making a directory inside an existing directory is easy. Just invoke the mkdir function:

mkdir "fred", 0755 or warn "Cannot make fred directory: $!";


Again, true means success, and $! is set on failure.

But what's that second parameter, 0755? That's the initial permission setting[*] on the newly created directory (you can always change it later). The value here is specified as an octal value because the value will be interpreted as a Unix permission value, which has a meaning based on groups of three bits each, and octal values represent that nicely. Yes, even on Windows or MacPerl, you still need to know a little about Unix permissions values to use the mkdir function. Mode 0755 is a good one to use because it gives you full permission, but lets everyone else have read access but no permission to change anything.

    [*] The permission value is modified by the umask value in the usual way. See umask(2) for further information.

The mkdir function doesn't require you to specify this value in octalit's just looking for a numeric value (either a literal or a calculation). But unless you can quickly can figure that 0755 octal is 493 decimal in your head, it's probably easier to let Perl calculate that. And if you accidentally leave off the leading zero, you get 755 decimal, which is 1363 octal, a strange permission combination indeed.

As you saw earlier (in Chapter 2), a string value being used as a number is never interpreted as octal, even if it starts with a leading 0. So this doesn't work:

my $name = "fred";
my $permissions = "0755";  # danger... this isn't working
mkdir $name, $permissions;


Oops, we just created a directory with that bizarre 01363 permissions because 0755 was treated as decimal. To fix that, use the oct function, which forces octal interpretation of a string whether or not there's a leading zero:

mkdir $name, oct($permissions);


Of course, if you are specifying the permission value directly within the program, just use a number instead of a string. The need for the extra oct function shows up most often when the value comes from user input. For example, suppose we take the arguments from the command line:

my ($name, $perm) = @ARGV;  # first two args are name, permissions
mkdir $name, oct($perm) or die "cannot create $name: $!";


The value here for $perm is interpreted as a string initially, and thus the oct function interprets the common octal representation properly.

To remove empty directories, use the rmdir function in a manner similar to the unlink function, although it can only remove one directory per call:

foreach my $dir (qw(fred barney betty)) {
  rmdir $dir or warn "cannot rmdir $dir: $!\n";
}


The rmdir operator fails for nonempty directories. As a first pass, you can attempt to delete the contents of the directory with unlink, then try to remove what should now be an empty directory. For example, suppose we need a place to write many temporary files during the execution of a program:

my $temp_dir = "/tmp/scratch_$$";       # based on process ID; see the text
mkdir $temp_dir, 0700 or die "cannot create $temp_dir: $!";
...
# use $temp_dir as location of all temporary files
...
unlink glob "$temp_dir/* $temp_dir/.*"; # delete contents of $temp_dir
rmdir $temp_dir;                        # delete now-empty directory


The initial temporary directory name includes the current process ID, which is unique for every running process and is accessed with the $$ variable (similar to the shell). We do this to avoid colliding with any other processes, as long as they also include their process ID as part of their pathname as well. (In fact, it's common to use the program's name as well as the process ID, so if the program is called quarry, the directory would probably be something like /tmp/quarry_$$.)

At the end of the program, that last unlink should remove all the files in this temporary directory, and then the rmdir function can delete the then-empty directory. However, if we've created subdirectories under that directory, the unlink operator fails on those, and the rmdir also fails. For a more robust solution, check out the rmtree function provided by the File::Path module of the standard distribution.
```

### 2.13.11 Modifying Permissions

```text
The Unix chmod command changes the permissions on a file or directory. Similarly, Perl has the chmod function to perform this task:

chmod 0755, "fred", "barney";


As with many of the operating system interface functions, chmod returns the number of items successfully altered, and when used with a single argument, sets $! in a sensible way for error messages when it fails. The first parameter is the Unix permission value (even for non-Unix versions of Perl). For the same reasons we presented earlier when describing mkdir, this value is usually specified in octal.

Symbolic permissions (like +x or go=u-w) accepted by the Unix chmod command are not valid for the chmod function.[*]

    [*] Unless you've installed and invoked the File::chmod module from CPAN, which can apparently upgrade the chmod operator to understand symbolic mode values.
```

### 2.13.12 Changing Ownership

```text
If the operating system permits it, you may change the ownership and group membership of a list of files (or filehandles) with the chown function. The user and group are both changed at once, and both have to be the numeric user-ID and group-ID values. For example:

my $user = 1004;
my $group = 100;
chown $user, $group, glob "*.o";


What if you have a username like merlyn instead of the number? Simple. Just call the getpwnam function to translate the name into a number, and the corresponding getgrnam[dagger] to translate the group name into its number:

    [dagger] These two are among the ugliest function names known to mankind. But don't blame Larry for them; he's just giving them the same names that the folks at Berkeley did.

defined(my $user = getpwnam "merlyn") or die "bad user";
defined(my $group = getgrnam "users") or die "bad group";
chown $user, $group, glob "/home/merlyn/*";


The defined function verifies that the return value is not undef, which will be returned if the requested user or group is not valid.

The chown function returns the number of files affected, and it sets $! on error.
```

### 2.13.13 Changing Timestamps

```text
In those rare  cases when you want to lie to other programs about when a file was most recently modified or accessed, you can use the utime function to fudge the books a bit. The first two arguments give the new access time and modification time, while the remaining arguments are the list of filenames to alter to those timestamps. The times are specified in internal timestamp format (the same type of values returned from the stat function that we mentioned in Chapter 12).

One convenient value to use for the timestamps is "right now," returned in the proper format by the time function. So to update all the files in the current directory to look like they were modified a day ago, but accessed just now, we could simply do this:

my $now = time;
my $ago = $now - 24 * 60 * 60;  # seconds per day
utime $now, $ago, glob "*";     # set access to now, mod to a day ago


Of course, nothing stops you from creating a file that is arbitrarily stamped far in the future or past (within the limits of the Unix timestamp values of 1970 to 2038, or whatever your non-Unix system uses, unless you have 64-bit timestamps). Maybe you could use this to create a directory where you keep your notes for that time travel novel you're writing.

The third timestamp (the ctime value) is always set to "now" whenever anything alters a file, so there's no way to set it (it would have to be reset to "now" after you set it) with the utime function. That's because its primary purpose is for incremental backups: if the file's ctime is newer than the date on the backup tape, it's time to back it up again.
```

### 2.13.14 Exercises

```text
The programs here are potentially dangerous! Be careful to test them in a mostly empty directory to make it difficult to accidentally delete something useful.

See Appendix A for answers to the following exercises:

   |1.  [12] Write a program to ask the user for a directory name, then change to that directory. If the user enters a line with nothing but whitespace, change to his or her home directory as a default. After changing, list the ordinary directory contents (not the items whose names begin with a dot) in alphabetical order. (Hint: will that be easier to do with a directory handle or with a glob?) If the directory change doesn't succeed, just alert the userbut don't try to show the contents.

$ ./chdir.pl

   |2.  [4] Modify the program to include all files, not just the ones that don't begin with a dot.
   chdir.pl
   |3.  [5] If you used a directory handle for the previous exercise, rewrite it to use a glob. Or if you used a glob, try it now with a directory handle.
   chdir.pl
   |4.  [6] Write a program that works like rm, deleting any files named on the command line. (You don't need to handle any of the options of rm.)
   rm.pl
   |5.  [10] Write a program that works like mv, renaming the first command-line argument to the second command-line argument. (You don't need to handle any of the options of mv or additional arguments.) Remember to allow for the destination to be a directory; if it is, use the same original basename in the new directory.
   mv.pl
   |6.  [7] If your operating system supports it, write a program that works like ln, making a hard link from the first command-line argument to the second. (You don't need to handle options of ln or more arguments.) If your system doesn't have hard links, just print out a message telling what operation you would perform if it were available. (Hint: this program has something in common with the previous onerecognizing that could save you time in coding.)
   ln.pl
   |7.  [7] If your operating system supports it, fix up the program from the previous exercise to allow an optional -s switch before the other arguments to indicate that you want to make a soft link instead of a hard link. (Even if you don't have hard links, see whether you can at least make soft links with this program.)
   ln.pl
   |8.  [7] If your operating system supports it, write a program to find any symbolic links in the current directory and print out their values (like ls -l would: name -> value).
   find_sym_link.pl
```
