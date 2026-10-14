---
type: reference
title: Chapter 1. Introduction
description: "Learning Perl 5th edition chapter 1: introduction, questions and answers."
tags: [perl, book-notes, tutorial, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "perl/KB_perl#2.1"
---

# 2.1 Chapter 1. Introduction

[↑ Learning Perl, 5th Edition](/perl/kb-perl/02-learning-perl-5th-edition/README.md)

```text
Welcome to the Llama book!

This is the fifth edition of a book that has been enjoyed by half a million readers since 1993. At least, we hope they've enjoyed it. It's a sure thing that we've enjoyed writing it.[4]

    [4] To be sure, the first edition was written by Randal L. Schwartz, the second by Randal and Tom Christiansen, then one by Randal and Tom Phoenix, and now by Randal, Tom Phoenix, and brian d foy. So, whenever we say "we" in this edition, we mean that last group. Now, if you're wondering how we can say that we've enjoyed writing it (in the past tense) when we're still on the first page, that's easy: we started at the end, and worked our way backward. It sounds like a strange way to do it, we know. But, honestly, once we finished writing the index, the rest was hardly any trouble at al
```

### 2.1.1 Questions and Answers

```text
You probably have some questions about Perl, and maybe even some about this book, especially if you've already flipped through it to see what's coming. So, we'll use this chapter to answer them.

Is This the Right Book for You?

If you're anything like us, you're probably standing in a bookstore right now,[5] wondering whether you should get this Llama book and learn Perl, or maybe that book over there and learn some language named after a snake, or a beverage, or a letter of the alphabet.[6] You've got about two minutes before the bookstore manager comes over to tell you that this isn't a library,[||] and you need to buy something or get out. Maybe you want to use these two minutes to see a quick Perl program, so you'll know something about how powerful Perl is and what it can do. In that case, you should check out Section 1.5," later in this chapter.

    [5] Actually, if you're like us, you're standing in a library, not a bookstore. But we're tightwads.

    [6] Before you write to tell us that it's a comedy troupe, not a snake, we should really explain that we're dyslexically thinking of CORBA.

    [||] Unless it is.

    "
```

#### 2.1.1.1 Why Are There So Many Footnotes?

```text
Thank you for noticing. There are a lot of footnotes in this book. Ignore them. They're needed because Perl is chock-full of exceptions to its rules. This is a good thing, as real life is chock-full of exceptions to rules.

But it means that we can't honestly say, "The fizzbin operator frobnicates the hoozistatic variables" without a footnote giving the exceptions.[*] We're pretty honest, so we have to write the footnotes. But you can be honest without reading them. (It's funny how that works out.)

    [*] Except on Tuesdays, during a power outage, when you hold your elbow at a funny angle during the equinox, or when use integer is in effect inside a loop block being called by a prototyped subroutine prior to Perl version 5.6.

Many of the exceptions have to do with portability. Perl began on Unix systems, and it still has deep roots in Unix. But wherever possible, we've tried to show when something may behave unexpectedly, whether that's because it's running on a non-Unix system, or for another reason. We hope that readers who know nothing about Unix will nevertheless find this book a good introduction to Perl. (And they'll learn a little about Unix along the way, at no extra charge.)

And many of the other exceptions have to do with the old "80/20" rule. By that we mean that 80% of the behavior of Perl can be described in 20% of the documentation, and the other 20% of the behavior takes up the other 80% of the documentation. So to keep this book small, we'll talk about the most common, easy-to-talk-about behavior in the main text, and hint in the direction of the other stuff in the footnotes (which are in a smaller font, so we can say more in the same space).[dagger] Once you've read the book all the way through without reading the footnotes, you'll probably want to look back at some sections for reference. At that point, or if you become unbearably curious along the way, go ahead and read the notes. A lot of them are just computer jokes anyway.

    [dagger] We even discussed doing the entire book as a footnote to save the page count, but footnotes on footnotes started to get a bit crazy.
```

#### 2.1.1.2 What About the Exercises and Their Answers?

```text
The exercises are at the end of each chapter because, between the three of us, we've presented this same course material to several thousand students.[double dagger] We have carefully crafted these exercises to give you the chance to make mistakes as well.

    [double dagger] Not all at once.

It's not that we want you to make mistakes, but you need to have the chance. That's because you are going to make most of these mistakes during your Perl programming career, and it may as well be now. Any mistake that you make while reading this book you won't make again when you're writing a program on a deadline. And we're always here to help you out if something goes wrong, in the form of Appendix A, which has our answers for each exercise and a little text to go with it, explaining the mistakes you made and a few you didn't. Check out the answers when you're done with the exercises.

Try not to peek at the answer until you've given the problem a good try, though. You'll learn better if you figure it out rather than read about it. Don't knock your head repeatedly against the wall if you don't figure out a solution: move onto the next chapter and don't worry too much about it.

Even if you never make any mistakes, you should look at the answers when you're done; the accompanying text will point out some details of the program that might not be obvious at first.

If you want additional exercises, check out Learning Perl Student Workbook (O'Reilly), which adds several exercises for each chapter.
```

#### 2.1.1.3 What Do Those Numbers at the Start of the Exercise Mean?

```text
Each exercise has a number in square brackets in front of the exercise text, looking something like this:

   |1.

      [2] What does the number 2 inside square brackets mean when it appears at the start of an exercise's text?

That number is our (very rough) estimate of how many minutes you can expect to spend on that particular exercise. It's rough, so don't be too surprised if you're all done (with writing, testing, and debugging) in half that time, or not done in twice that long. On the other hand, if you're really stuck, we won't tell anyone that you peeked at Appendix A to see what our answer looked like.
```

#### 2.1.1.4 What If I'm a Perl Course Instructor?

```text
If you're a Perl instructor who has decided to use this as your textbook (as many have over the years), you should know that we've tried to make each set of exercises short enough that most students could do the whole set in 45 minutes to an hour, with a little time left over for a break. Some chapters' exercises should be quicker and some longer. That's because once we had written all of those little numbers in square brackets, we discovered that we don't know how to add (luckily we know how to make computers do it for us).

As we mentioned, we also have a companion book, Learning Perl Student Workbook, which has additional exercises for each chapter. If you get the version of the workbook for the fourth edition, you will have to adjust the chapter order because we added a chapter and moved another chapter in this edition.
```

### 2.1.2 What Does "Perl" Stand For?

#### 2.1.2.1 What Does "Perl" Stand For?

```text
Perl is sometimes called the "Practical Extraction and Report Language," although it has also been called a "Pathologically Eclectic Rubbish Lister," among other expansions. It's actually a backronym, not an acronym, since Larry WallPerl's creatorcame up with the name first and the expansion later. That's why "Perl" isn't in all caps. There's no point in arguing which expansion is correct: Larry endorses both.

You may also see "perl" with a lowercase p in some writing. In general, "Perl" with a capital P refers to the language and "perl" with a lowercase p refers to the actual interpreter that compiles and runs your programs.
```

#### 2.1.2.2 Why Did Larry Create Perl?

```text
Larry created Perl in the mid-1980s when he was trying to produce some reports from a Usenet newslike hierarchy of files for a bug-reporting system, and awk ran out of steam. Larry, being the lazy programmer that he is,[*] decided to overkill the problem with a general-purpose tool that he could use in at least one other place. The result was Perl version zero.

    [*] We're not insulting Larry by saying he's lazy; laziness is a virtue. The wheelbarrow was invented by someone who was too lazy to carry things; writing was invented by someone who was too lazy to memorize; Perl was invented by someone who was too lazy to get the job done without inventing a whole new computer language.
```

#### 2.1.2.3 Why Didn't Larry Just Use Some Other Language?

```text
There's no shortage of computer languages, is there? But, at the time, Larry didn't see anything that really met his needs. If one of the other languages of today had been available back then, perhaps Larry would have used one of those. He needed something with the quickness of coding available in shell or awk programming, and with some of the power of more advanced tools like grep, cut, sort, and sed,[dagger] without having to resort to a language like C.

    [dagger] Don't worry if you don't know what these are. All that matters is that they were the programs Larry had in his Unix toolbox, but they weren't up to the tasks at hand.

Perl tries to fill the gap between low-level programming (such as in C or C++ or assembly) and high-level programming (such as "shell" programming). Low-level programming is usually hard to write and ugly, but fast and unlimited; it's hard to beat the speed of a well-written low-level program on a given machine. And there's not much you can't do there. High-level programming, at the other extreme, tends to be slow, hard, ugly, and limited; there are many things you can't do at all with the shell or batch programming if there's no command on your system that provides the needed functionality. Perl is easy, nearly unlimited, mostly fast, and kind of ugly.

Let's take another look at those four claims we just made about Perl:

First, Perl is easy. As you'll see, though, this means it's easy to use. It's not especially easy to learn. If you drive a car, you spent many weeks or months learning how, and then it's easy to drive. When you've been programming Perl for about as many hours as it took you to learn to drive, Perl will be easy for you.

Perl is nearly unlimited. There are very few things you can't do with Perl. You wouldn't want to write a interrupt-microkernel-level device driver in Perl (even though that's been done), but most things that ordinary folks need most of the time are good tasks for Perl, from quick little one-off programs to major industrial-strength applications.

Perl is mostly fast. That's because nobody is developing Perl who doesn't also use itso we all want it to be fast. If someone wants to add a feature that would be really cool, but that would slow down other programs, Larry is almost certain to refuse the new feature until we find a way to make it quick enough.

Perl is kind of ugly. This is true. The symbol of Perl has become the camel, from the cover of the venerable Camel book (also known as Programming Perl by Larry Wall, Tom Christiansen, and Jon Orwant [O'Reilly]), a cousin of this Llama (and her sister, the Alpaca). Camels are kind of ugly, too. But they work hard, even in tough conditions. Camels are there to get the job done despite all difficulties, even when they look bad and smell worse and sometimes spit at you. Perl is a little like that.
```

#### 2.1.2.4 Is Perl Easy or Hard?

```text
Perl is easy to use, but sometimes hard to learn. This is a generalization, of course. In designing Perl, Larry made many tradeoffs. When he's had the chance to make something easier for the programmer at the expense of being more difficult for the student, he's decided in the programmer's favor nearly every time. That's because you'll learn Perl only once, but you'll use it again and again.[*] Perl has any number of conveniences that let the programmer save time. For example, most functions will have a default; frequently, the default is the way that you'll want to use the function. So you'll see lines of Perl code like these:[dagger]

    [*] If you're going to use a programming language for only a few minutes each week or month, you'd prefer one that is easier to learn, since you'll have forgotten nearly all of it from one use to the next. Perl is for people who are programmers for at least 20 minutes per day, and probably most of that in Perl.

    [dagger] We won't explain it all here, but this example pulls some data from an input file or files in one format and writes some of it out in another format. All of its features are covered in this book.

while (<>) {
  chomp;
  print join("\t", (split /:/)[0, 2, 1, 5] ), "\n";
}


Written out in full, without using Perl's defaults and shortcuts, that snippet would be roughly 10 or 12 times longer, so it would take much longer to read and write. It would be harder to maintain and debug, too, with more variables. If you already know some Perl, and you don't see the variables in that code, that's part of the point. They're all being used by default. But to have this ease at the programmer's tasks means paying the price when you're learning; you have to learn those defaults and shortcuts.

A good analogy is the proper and frequent use of contractions in English. Sure, "will not" means the same as "won't." But most people say "won't" rather than "will not" because it saves time, and because everybody knows it and it makes sense. Similarly, Perl's "contractions" abbreviate common "phrases" so that they can be "spoken" quicker and understood by the maintainer as a single idiom, rather than a series of unrelated steps.

Once you become familiar with Perl, you may find yourself spending less time trying to get shell quoting (or C declarations) right, and more time surfing the Web because Perl is a great tool for leverage. Perl's concise constructs allow you to create (with minimal fuss) some very cool one-up solutions or general tools. Also, you can drag those tools along to your next job because Perl is highly portable and readily available, so you'll have even more time to surf.

Perl is a very high-level language. That means that the code is quite dense; a Perl program may be around a quarter to three-quarters as long as the corresponding program in C. This makes Perl faster to write, faster to read, faster to debug, and faster to maintain. It doesn't take much programming before you realize that, when the entire subroutine is small enough to fit onscreen all at once, you don't have to keep scrolling back and forth to see what's going on. Also, since the number of bugs in a program is roughly proportional to the length of the source code[*] (rather than being proportional to the program's functionality), the shorter source in Perl will mean fewer bugs on average.

    [*] With a sharp jump when any one section of the program exceeds the size of your screen.

Like any language, Perl can be "write-only"it's possible to write programs that are impossible to read. But with proper care, you can avoid this common accusation. Yes, sometimes Perl looks like line noise to the uninitiated, but to the seasoned Perl programmer, it looks like the notes of a grand symphony. If you follow the guidelines of this book, your programs should be easy to read and easy to maintain, and they probably won't win The Obfuscated Perl Contest.
```

#### 2.1.2.5 How Did Perl Get to Be So Popular?

```text
After playing with Perl a bit, adding stuff here and there, Larry released it to the community of Usenet readers, commonly known as "the Net." The users on this ragtag fugitive fleet of systems around the world (tens of thousands of them) gave him feedback, asking for ways to do this, that, or the other thing, many of which Larry had never envisioned his little Perl handling.

But as a result, Perl grew, and grew, and grew. It grew in features. It grew in portability. What was once a little language available on only a couple of Unix systems now has thousands of pages of free online documentation, dozens of books, several mainstream Usenet newsgroups (and a dozen newsgroups and mailing lists outside the mainstream)with an uncountable number of readers, and implementations on nearly every system in use todayand don't forget this Llama book as well.
```

#### 2.1.2.6 What's Happening with Perl Now?

```text
Larry Wall doesn't write the code these days, but he still guides the development and makes the big decisions. Perl is mostly maintained by a hardy group of people called the Perl 5 Porters. You can subscribe to their mailing list at perl5-porters@perl.org to follow their work and discussions.

As we write this (March 2008), there is a lot happening with Perl. For the past couple of years, many people have been working on the next major version of Perl: Perl 6.

Don't throw away your Perl 5, which is still the current and stable version. We don't expect a stable version of Perl 6 for a while yet. Perl 5 does everything it always did, and always will. Perl 5 won't disappear when Perl 6 shows up, and people may end up using both for several years. The Perl 5 Porters maintain Perl 5 just like they always have and some of the good ideas from Perl 6 have made it into Perl 5. We're updating this book because Perl 5.10 just came out, and it looks like the Perl 5 Porters are already working on Perl 5.12.

In 2000, Larry first proposed the next major release of Perl as the Perl community's rewrite of Perl. In the years that followed, a new interpreter called Parrot came to life, but not much else happened for the users. In 2005, Autrijus Tang started playing with Pugs (Perl User Golfing System) as a featherweight implementation of Perl 6 in Haskell. Developers from the Perl and Haskell sides of the world rushed to help. Parrot, the virtual machine that will run Perl 6, is coming along nicely now, and that's where most of the work is happening. You can see more about Perl 6 at http://perlsix.org and http://www.pugscode.org. For this book, we're not going to worry about Perl 6, though.
```

#### 2.1.2.7 What's Perl Really Good For?

```text
Perl is good for quick-and-dirty programs that you whip up in three minutes. Perl is also good for long-and-extensive programs that will take a dozen programmers three years to finish. Of course, you'll probably find yourself writing many programs that take you less than an hour to complete, from the initial plan to the fully tested code.

Perl is optimized for problems that are about 90% working with text and about 10% everything else. That description seems to fit most programming tasks that pop up these days. In a perfect world, every programmer could know every language; you'd always be able to choose the best language for each project. Most of the time, you'd choose Perl.[*] Although the Web wasn't even a twinkle in Tim Berners-Lee's eye when Larry created Perl, it was a marriage made on the Net. Some claim that the deployment of Perl in the early 1990s permitted people to move lots of content into HTML format very rapidly, and the Web couldn't exist without content. Of course, Perl is the darling language for small CGI scripting (programs run by a web server) as wellso much so that many of the uninformed still make statements like "Isn't CGI just Perl?" or "Why would you use Perl other than for CGI?" We find those statements amusing.

    [*] Don't just take our word for it, though. If you want to know whether Perl is better than language X, learn them both and try them both, then see which one you use most often. That's the one that's best for you. In the end, you'll understand Perl better because of your study of language X, and vice versa, so it will be time well spent.
```

#### 2.1.2.8 What Is Perl Not Good For?

```text
So, if it's good for so many things, what is Perl not good for? Well, you shouldn't choose Perl if you're trying to make an opaque binary. That's a program that you could give away or sell to someone who then can't see your secret algorithms in the source, and thus can't help you maintain or debug your code either. When you give someone your Perl program, you'll normally be giving them the source, not an opaque binary.

If you're wishing for an opaque binary, though, we have to tell you that they don't exist. If someone can install and run your program, they can turn it back into source code. Granted, this won't necessarily be the same source that you started with, but it will be some kind of source code. The real way to keep your secret algorithm a secret is, alas, to apply the proper number of attorneys; they can write a license that says, "You can do this with the code, but you can't do that. And if you break our rules, we've got the proper number of attorneys to ensure that you'll regret it."
```

### 2.1.3 How Can I Get Perl?

```text
You probably already have it. At least, we find Perl wherever we go. It ships with many systems, and system administrators often install it on every machine at their site. But if you can't find it already on your system, you can still get it for free.

Perl is distributed under two different licenses. For most people, because you'll merely be using it, either license is as good as the other. If you'll be modifying Perl, however, you'll want to read the licenses more closely because they put some small restrictions on distributing the modified code. For people who won't modify Perl, the licenses essentially say, "It's freehave fun with it."

In fact, it's not only free, but it runs rather nicely on nearly everything that calls itself Unix and has a C compiler. You download it, type a command or two, and it starts configuring and building itself. Or, better yet, you get your system administrator to type those two commands and install it for you.[*] Besides Unix and Unix-like systems, people have also been addicted enough to Perl to port it to other systems, such as Mac OS X, VMS, OS/2, even MS/DOS, and every modern species of Windowsand probably even more by the time you read this.[dagger] Many of these ports of Perl come with an installation program that's even easier to use than the process for installing Perl on Unix. Check for links in the "ports" section on CPAN.

    [*] If system administrators can't install software, what good are they? If you have trouble convincing your admin to install Perl, offer to buy a pizza. We've never met a sys admin who could say no to a free pizza, or at least counter-offer with something just as easy to get.

    [dagger] And no, as we write this, it won't fit in your Blackberryit's just too darn big, even stripped down. We've heard rumors that it runs on WinCE though.
```

#### 2.1.3.1 What Is CPAN?

```text
CPAN is the Comprehensive Perl Archive Network, your one-stop shop for Perl. It has the source code for Perl itself, ready-to-install ports of Perl to all sorts of non-Unix systems,[double dagger] examples, documentation, extensions to Perl, and archives of messages about Perl. In short, CPAN is comprehensive.

    [double dagger] It's nearly always better to compile Perl from the source on Unix systems. Other systems may not have a C compiler and other tools needed for compilation, so CPAN has binaries for these.

CPAN is replicated on hundreds of mirror machines around the world; start at http://search.cpan.org/ or http://kobesearch.cpan.org/ to browse or search the archive. If you don't have access to the Net, you might find a CD-ROM or DVD-ROM with all of the useful parts of CPAN on it; check with your local technical bookstore. Look for a recently minted archive, though. Because CPAN changes daily, an archive from two years ago is an antique. Better yet, get a kind friend with Net access to burn you one with today's CPAN.
```

#### 2.1.3.2 How Can I Get Support for Perl?

```text
Well, you get the complete sourceso you get to fix the bugs yourself!

That doesn't sound so good, does it? But it really is a good thing. Since there's no "source code escrow" on Perl, anyone can fix a bugin fact, by the time you've found and verified a bug, someone else probably already has a fix for it. There are thousands of people around the world who help maintain Perl.

Now, we're not saying that Perl has a lot of bugs. But it's a program, and every program has at least one bug. To see why it's so useful to have the source to Perl, imagine that instead of using Perl, you licensed a programming language called Forehead from a giant, powerful corporation owned by a zillionaire with a bad haircut. (This is all hypothetical. Everyone knows there's no such programming language as Forehead.) Now think of what you can do when you find a bug in Forehead. First, you can report it; second, you can hopehope that they fix the bug, hope that they fix it soon, hope that they won't charge too much for the new version. You can hope that the new version doesn't add new features with new bugs, and hope that the giant company doesn't get broken up in an antitrust lawsuit.

But with Perl, you've got the source. In the rare and unlikely event that you can't get a bug fixed any other way, you can hire a programmer or 10 and get to work. For that matter, if you buy a new machine that Perl doesn't yet run on, you can port it yourself. Or if you need a feature that doesn't yet exist, well, you know what to do.
```

#### 2.1.3.3 Are There Any Other Kinds of Support?

```text
Sure. One of our favorites is the Perl Mongers. This is a worldwide association of Perl users' groups; see http://www.pm.org/ for more information. There's probably a group near you with an expert or someone who knows an expert. If there's no group, you can easily start one.

Of course, for the first line of support, you shouldn't neglect the documentation. Besides the manpages,[*] you can also find the documentation on the CPAN (http://www.cpan.org) as well as other sites, such as http://perldoc.perl.org, which has HTML and PDF versions of the Perl documentation, or http://faq.perl.org/, which has the latest version of the perlfaq.

    [*] The term manpages is a Unix-ism meaning documentation. If you're not on a Unix system, the manpages for Perl should be available via your system's native documentation system.

Another authoritative source is the book Programming Perl, commonly called "the Camel book" because of its cover animal (just as this book is known as "the Llama book"). The Camel book contains the complete reference information, some tutorial stuff, and a bunch of miscellaneous information about Perl. There's also a separate pocket-size Perl 5 Pocket Reference (O'Reilly) by Johan Vromans that's convenient to keep at hand (or in your pocket).

If you need to ask a question of someone, there are newsgroups on Usenet and any number of mailing lists.[dagger] At any hour of the day or night, there's a Perl expert awake in some time zone, answering questions on Usenet's Perl newsgroupsthe sun never sets on the Perl empire. This means that if you ask a question, you'll often get an answer within minutes. If you didn't check the documentation and FAQ first, you'll get flamed within minutes.

    [dagger] Many mailing lists are listed at http://lists.perl.org.

The official Perl newsgroups on Usenet are located in the comp.lang.perl.* part of the hierarchy. As of this writing, there are five of them, but they change from time to time. You (or whoever is in charge of Perl at your site) should generally subscribe to comp.lang.perl.announce, which is a low-volume newsgroup just for important announcements about Perl, including especially any security-related announcements. Ask your local expert if you need help with Usenet.

Also, a few web communities have sprung up around Perl discussions. One very popular one, Perl Monastery (http://www.perlmonks.org), has seen quite a bit of participation from many Perl book and column authors, including at least two of the authors of this book. You can also check out http://learn.perl.org/ and its associated mailing list, beginners@perl.org. For Perl news, try http://use.perl.org/. Many well-known Perl programmers also have blogs that regularly feature Perl-related posts, most of which you can read through http://planet.perl.org.

If you find yourself needing a support contract for Perl, there are a number of firms that are willing to charge as much as you'd like. In most cases, these other support avenues will take care of you for free.
```

#### 2.1.3.4 What If I Find a Bug in Perl?

```text
The first thing to do when you find a bug is to check the documentation[*] again.[dagger] Perl has so many special features and exceptions to rules that you may have discovered a feature, not a bug. Also, check that you don't have an older version of Perl; maybe you found something that's been fixed in a more recent version.

    [*] Even Larry admits to consulting the documentation from time to time.

    [dagger] Maybe even two or three times. Many times, we've gone into the documentation looking to explain a particular unexpected behavior and found some new little nuance that ends up on a slide or in a column.

Once you're 99% certain that you've found a real bug, ask around. Ask someone at work, at your local Perl Mongers' meeting, or at a Perl conference. Chances are, it's still a feature, not a bug.

Once you're 100% certain that you've found a real bug, cook up a test case. (What, you haven't done so already?) The ideal test case is a tiny self-contained program that any Perl user could run to see the same (mis)behavior you've found. Once you've got a test case that clearly shows the bug, use the perlbug utility (which comes with Perl) to report the bug. That will normally send email from you to the Perl developers, so don't use perlbug until you've got your test case ready.

Once you've sent off your bug report, if you've done everything right, it's not unusual to get a response within minutes. Typically, you can apply a simple patch and get right back to work. Of course, you may (at worst) get no response at all; the Perl developers are under no obligation to even read your bug reports. But all of us love Perl, so nobody likes to let a bug escape our notice.
```

### 2.1.4 How Do I Make a Perl Program?

```text
It's about time you asked (even if you didn't). Perl programs are text files; you can create and edit them with your favorite text editor. (You don't need any special development environment, although there are some commercial ones available from various vendors. We've never used any of these enough to recommend them.)

You should generally use a programmers' text editor, rather than an ordinary editor. What's the difference? Well, a programmers' text editor will let you do things that programmers need, like indenting or unindenting a block of code, or finding the matching closing curly brace for a given opening curly brace. On Unix systems, the two most popular programmers' editors are emacs and vi (and their variants and clones). BBEdit and TextMate are good editors for Mac OS X, and a lot of people have said nice things about UltraEdit and PFE (Programmer's Favorite Editor) on Windows. The perlfaq2 manpage lists several other editors, too. Ask your local expert about text editors on your system.

For the simple programs you'll write for the exercises in this book, none of which should be more than about 20 or 30 lines of code, any text editor will be fine.

Some beginners try to use a word processor instead of a text editor. We recommend against thisit's inconvenient at best and impossible at worst. But we won't try to stop you. Be sure to tell the word processor to save your file as "text only"; the word processor's own format will almost certainly be unusable. Most word processors will probably also tell you that your Perl program is spelled incorrectly and should use fewer semicolons.

In some cases, you may need to compose the program on one machine, then transfer it to another to run it. If you do this, be sure that the transfer uses "text" or "ASCII" mode, and not "binary" mode. This step is needed because of the different text formats on different machines. Without it, you may get inconsistent resultssome versions of Perl actually abort when they detect a mismatch in the line endings.
```

#### 2.1.4.1 A Simple Program

```text
According to the oldest rule in the book, any book about a computer language that has Unix-like roots has to start with showing the "Hello, world" program. So, here it is in Perl:

#!/usr/bin/perl
print "Hello, world!\n";


Let's imagine that you've typed that into your text editor. (Don't worry yet about what the parts mean and how they work. We'll see about those in a moment.) You can generally save that program under any name you wish. Perl doesn't require any special kind of filename or extension, and it's better not to use an extension at all.[*] But some systems may require an extension like .plx (meaning PerL eXecutable); see your system's release notes for more information.

    [*] Why is it better to have no extension? Imagine that you've written a program to calculate bowling scores and you've told all of your friends that it's called bowling.plx. One day you decide to rewrite it in C. Do you still call it by the same name, implying that it's still written in Perl? Or do you tell everyone that it has a new name? (And don't call it bowling.c, please!) The answer is that it's none of their business what language it's written in, if they're merely using it. So, it should have simply been called bowling in the first place.

You may also need to do something so that your system knows it's an executable program (that is, a command). What you'll do depends upon your system; maybe you won't have to do anything more than save the program in a certain place. (Your current directory will generally be fine.) On Unix systems, you mark a program as being executable using the chmod command, perhaps like this:

$ chmod a+x my_program


The dollar sign (and space) at the start of the line represents the shell prompt, which will probably look different on your system. If you're used to using chmod with a number like 755 instead of a symbolic parameter like a+x, that's fine too, of course. Either way, it tells the system that this file is now a program.

Now you're ready to run it:

$ ./my_program


The dot and slash at the start of this command mean to find the program in the current working directory. That's not needed in all cases, but you should use it at the start of each command invocation until you fully understand what it's doing.[dagger] If everything worked, it's a miracle. More often, you'll find that your program has a bug. Edit and try againbut you don't need to use chmod each time, as that should "stick" to the file. (Of course, if the bug is that you didn't use chmod correctly, you'll probably get a "permission denied" message from your shell.)

    [dagger] In short, it's preventing your shell from running another program (or shell built-in) of the same name. A common mistake among beginners is to name their first program test. Many systems already have a program (or shell built-in) with that name; that's what the beginners run instead of their program.

There's another way to write this simple program in Perl 5.10, and we might as well get that out of the way right now. Instead of print, we use say, which does almost the same thing, but with less typing. Since it's a new feature and you might not be using Perl 5.10 yet, we include a use 5.010 statement that tells Perl that we used new features:

#!/usr/bin/perl

use 5.010;

say "Hello World!";


This program only runs under Perl 5.10. When we introduce Perl 5.10 features in this book, we'll explicitly say they are new features in the text and include that use 5.010 statement to remind you. Perl actually thinks about the minor version as a three-digit number, so make sure that you say use 5.010 and not use 5.10 (which Perl thinks is 5.100, a version we definitely don't have yet!)
```

#### 2.1.4.2 What's Inside That Program?

```text
Like other "free-form" languages, Perl generally lets you use insignificant whitespace (like spaces, tabs, and newlines) at will to make your program easier to read. Most Perl programs use a fairly standard format, though, much like most of what we show here. We strongly encourage you to properly indent your programs, as that makes your program easier to read; a good text editor will do most of the work for you. Good comments also make a program easier to read. In perl, comments run from a pound sign (#) to the end of the line. (There are no "block comments" in Perl.[*]) We don't use many comments in the programs in this book because the surrounding text explains their workings, but you should use comments as needed in your own programs.

    [*] But there are a number of ways to fake them. See the FAQ (accessible with perldoc perlfaq on most installations).

So another way (a very strange way, it must be said) to write that same "Hello, world" program might be like this:

#!/usr/bin/perl
    print    # This is a comment
"Hello, world!\n"
  ;    # Don't write your Perl code like this!


That first line is actually a very special comment. On Unix systems,[dagger] if the very first two characters on the first line of a text file are #!, what follows is the name of the program that actually executes the rest of the file. In this case, the program is stored in the file /usr/bin/perl.

    [dagger] Most modern ones, anyway. The "shebang" mechanism[28] was introduced somewhere in the mid-1980s, and that's pretty ancient, even on the extensively long Unix timeline.

    [28] pronounced "shebang," as in "the whole shebang"

This #! line is actually the least portable part of a Perl program because you'll need to find out what goes there for each machine. Fortunately, it's almost always either /usr/bin/perl or /usr/local/bin/perl. If that's not it, you'll have to find where your system is hiding perl, then use that path. On Unix systems, you might use a shebang line that finds perl for you:

#!/usr/bin/env perl


If perl is not in any of the directories in your search path, you might have to ask your local system administrator or somebody using the same system as you.

On non-Unix systems, it's traditional (and even useful) to make the first line say #!perl. If nothing else, it tells your maintenance programmer as soon as he gets ready to fix it that it's a Perl program.

If that #! line is wrong, you'll generally get an error from your shell. This may be something unexpected, like "file not found." It's not your program that's not found, though; it's /usr/bin/perl that wasn't where it should have been. We'd make the message clearer, but it's not coming from Perl; it's the shell that's complaining. (By the way, you should be careful to spell it usr and not userthe folks who invented Unix were lazy typists, so they omitted a lot of letters.)

Another problem you could have is that your system doesn't support the #! line at all. In that case, your shell (or whatever your system uses) will probably try to run your program all by itself, with results that may disappoint or astonish you. If you can't figure out what some strange error message is telling you, search for it in the perldiag manpage.

The "main" program consists of all of the ordinary Perl statements (not including anything in subroutines, which you'll see later). There's no "main" routine, as there is in languages like C or Java. In fact, many programs don't even have routines (in the form of subroutines).

There's also no required variable declaration section, as there is in some other languages. If you've always had to declare your variables, you may be startled or unsettled by this at first. But it allows us to write "quick-and-dirty" Perl programs. If your program is only two lines long, you don't want to have to use one of those lines just to declare your variables. If you really want to declare your variables, that's a good thing; you'll see how to do that in Chapter 4.

Most statements are an expression followed by a semicolon. Here's the one you've seen a few times so far:

print "Hello, world!\n";


As you may have guessed by now, this line prints the message Hello, world!. At the end of that message is the shortcut \n, which is probably familiar to you if you've used another language like C, C++, or Java; it means a newline character. When that's printed after the message, the print position drops down to the start of the next line, allowing the following shell prompt to appear on a line of its own, rather than being attached to the message. Every line of output should end with a newline character. We'll see more about the newline shortcut and other so-called backslash escapes in the next chapter.
```

#### 2.1.4.3 How Do I Compile Perl?

```text
Just run your Perl program. The perl interpreter compiles and then runs your program in one user step:

$ perl my_program


When you run your program, Perl's internal compiler first runs through your entire source, turning it into internal bytecode, which is an internal data structure representing the program. Perl's bytecode engine takes over and actually runs the bytecode. If there's a syntax error on line 200, you'll get that error message before you start running line 2.[*] If you have a loop that runs 5000 times, it's compiled just once; the actual loop can then run at top speed. And there's no runtime penalty for using as many comments and as much whitespace as you need to make your program easy to understand. You can even use calculations involving only constants, and the result is a constant computed once as the program is beginningnot each time through a loop.

    [*] Unless line two happens to be a compile-time operation, like a BEGIN block or a use invocation.

To be sure, this compilation does take timeit's inefficient to have a voluminous Perl program that does one small quick task (out of many potential tasks, say) and then exits because the runtime for the program will be dwarfed by the compile time. But the compiler is very fast; normally the compilation will be a tiny percentage of the runtime.

An exception might be if you were writing a program run as a CGI script, where it may be called hundreds or thousands of times every minute. (This is a very high usage rate. If it were called a few hundred or thousand times per day, like most programs on the Web, we probably wouldn't worry too much about it.) Many of these programs have very short runtimes, so the issue of recompilation may become significant. If this is an issue for you, you'll want to find a way to keep your program in memory between invocations. The mod_perl extension to the Apache web server (http://perl.apache.org) or Perl modules like CGI::Fast can help you.

What if you could save the compiled bytecode to avoid the overhead of compilation? Or, even better, what if you could turn the bytecode into another language, like C, and then compile that? Well, both of these things are possible in some cases, but they probably won't make most programs any easier to use, maintain, debug, or install, and they may even make your program slower. Perl 6 should do a lot better in this regard, although it is too soon to tell (as we write this).
```

### 2.1.5 A Whirlwind Tour of Perl

```text
So, you want to see a real Perl program with some meat? (If you don't, just play along for now.) Here you are:

#!/usr/bin/perl
@lines = `perldoc -u -f atan2`;
foreach (@lines) {
  s/\w<([^>]+)>/\U$1/g;
  print;
}


Now, the first time you see Perl code like this, it can seem pretty strange. (In fact, every time you see Perl code like this, it can seem pretty strange.) But let's take it line by line, and see what this example does. (These explanations are very brief; this is a whirlwind tour, after all. We'll see all of this program's features in more detail during the rest of this book. You're not really supposed to understand the whole thing until later.)

The first line is the #! line, as you saw before. You might need to change that line for your system, as we discussed earlier.

The second line runs an external command, named within backquotes (` `). (The backquote key is often found next to the number 1 on full-sized American keyboards. Be sure not to confuse the backquote with the single quote, '.) The command we used is perldoc -u -f atan2; try typing that at your command line to see what its output looks like. The perldoc command is used on most systems to read and display the documentation for Perl and its associated extensions and utilities, so it should normally be available.[*] This command tells you something about the trigonometric function atan2; we're using it here just as an example of an external command whose output we wish to process.

    [*] If perldoc is not available, that probably means that your system doesn't have a command-line interface, and your Perl can't run commands (like perldoc) in backquotes or via the piped open, which you'll see in Chapter 16. In that case, you should simply skip the exercises that use perldoc.

The output of that command in the backquotes is saved in an array variable called @lines. The next line of code starts a loop that will process each one of those lines. Inside the loop, the statements are indented. Although Perl doesn't require this, good programmers do.

The first line inside the loop body is the scariest one; it says s/\w<([^>]+)>/\U$1/g;. Without going into too much detail, we'll just say that this can change any line that has a special marker made with angle brackets (< >), and there should be at least one of those in the output of the perldoc command.

The next line, in a surprise move, prints out each (possibly modified) line. The resulting output should be similar to what perldoc -u -f atan2 would do on its own, but there will be a change where any of those markers appear.

Thus, in the span of a few lines, we've run another program, saved its output in memory, updated the memory items, and printed them out. This kind of program is a fairly common use of Perl, where one type of data is converted to another.
```

### 2.1.6 Exercises

```text
		Normally, each chapter will end with some exercises, with the answers in Appendix A. But you don't need to write the programs needed to complete this sectionthose are supplied within the chapter text.

If you can't get these exercises to work on your machine, double-check your work and then consult your local expert. Remember that you may need to tweak each program a little, as described in the text.

			2.1.6.1 
      [7] Type in the "Hello, world" program and get it to work! (You may name it anything you wish, but a good name might be ex1-1, for simplicity, since it's exercise 1 in Chapter 1.)

			2.1.6.2 
      [5] Type the command perldoc -u -f atan2 at a command prompt and note its output. If you can't get that to work, find out from a local administrator or the documentation for your version of Perl about how to invoke perldoc or its equivalent. (You'll need this for the next exercise anyway.)

      [6] Type in the second example program (from the previous section) and see what it prints. (Hint: be careful to type those punctuation marks exactly as shown!) Do you see how it changed the output of the command?
```
