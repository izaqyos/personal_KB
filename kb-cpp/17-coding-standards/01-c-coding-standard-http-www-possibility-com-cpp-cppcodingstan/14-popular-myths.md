---
type: reference
title: Popular Myths
description: "Subsection 17.1.14 of C++ Coding Standard, http://www.possibility.com/Cpp/CppCodingStandard.html."
tags: [kb-cpp]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-cpp#17.1.14"
---

# 17.1.14. Popular Myths

[↑ C++ Coding Standard, http://www.possibility.com/Cpp/CppCodingStandard.html](/kb-cpp/17-coding-standards/01-c-coding-standard-http-www-possibility-com-cpp-cppcodingstan/README.md)

```text
Promise of OO
OO has been hyped to the extent you'd figure it would solve world hunger and usher in a new era of world peace. Not! OO is an approach, a philosophy, it's not a recipe which blindly followed yields quality.

Robert Martin put OO in perspective:

    * OO, when properly employed, does enhance the reusability of software. But it does so at the cost of complexity and design time. Reusable code is more complex and takes longer to design and implement. Furthermore, it often takes two or more tries to create something that is even marginally reusable.
    * OO, when properly employed, does enhance the software's resilience to change. But it does so at the cost of complexity and design time. This trade off is almost always a win, but it is hard to swallow sometimes.
    * OO does not necessarily make anything easier to understand. There is no magical mapping between the software concepts and every human's map of the real world. Every person is different. What one person percieves to be a simple and elegant design, another will perceive as convoluted and opaque.
    * If a team has been able, by applying point 1 above, to create a repository of reusable items, then development times can begin to shrink significantly due to reuse.
    * If a team has been able, by applying point 2 above, to create software that is resilient to change, then maintenance of that software will be much simpler and much less error prone. 

You can't use OO and C++ on Embedded Systems
Oh yes you can. I've used C++ on several embedded systems as have many others. And if you can't why not? Please don't give in to vague feelings and prejudice. An attitude best shown with a short exchange:

Rube: Our packet driver is slow. We're only getting 100 packets per second.
Me  : Good thing you didn't do it in C++ huh?
Rube: Oh yah, it would have been really slow then!
Me  : (smiled secretly to myself)

My initial response was prompted by a general unacceptance of C++ in the project and blaming C++ for all problems. Of course all the parts written in C and assembly had no problems :-) Embedded systems shops tend to be hardware driven companies and tend not to know much about software development, thus any new fangled concepts like OO and C++ are ridiculed without verbally accessible reasons. Counter arguments like code that is fast and small and reusable don't make a dent. Examples like improving the speed of a driver by inlining certain methods and not hacking the code to death gently roll into the bit bucket.

Techniques
Of course C++ can be a disaster for an embedded system when used incorrectly, which of course is true of any tool. Here's some ideas to use C++ safely in an embedded system:

    * Get Some Training!

      If people don't know C++ and OO then they will likely fail and blame their tools. A good craftsperson doesn't blame their tools. Get training. Hire at least one experienced person as guide/mentor.

    * Be Careful Using Streams

      The streams library is large and slow. You are better off making a "fake" streams library by overloading the << operator. If you have a lot of memory then use streams, they are convenient and useful.

    * Be Careful Using Templates

      Code using templates can suffer from extreme code bloat. This is pretty much a function of your compiler as templates can be efficiently used when done correctly. Test your compiler for it how handles templates. If it doesn't make a copy per file for each template then you are in business. Templates have good time efficiency so they would be nice to use.

      You can fix the template code bloat problem by using explicit instantiation. Actually, even if the compiler generates one copy per source file. This, however, is often too much programmer work to expect on a large project, so be careful. Many linkers are smart enough to strip away all but one of the copies.

      Another issue to consider is template complexity. Templates can be complex for those new to C++. Bugs in templates are very hard to find and may overwhelm the patience of users.

    * Exceptions Beware

      Embedded applications are usually interrupt driven and multi-threaded. Test that exceptions are thread safe. Many compilers support exceptions, but not thread safe exceptions. And you probably don't want to call code in an interrupt that throws exceptions.

    * Use Polymorphic Interfaces to Make Frameworks

      When you think through your design and come up with good abstractions you will be shocked at how little code and how little time it takes to implement new features.

    * Make an OS Encapsulation Library

      Don't use your embedded OSs features directly. Create a layer that encapsulates OS functions and use those encapsulations. Most feature like tasks, interrupts, semaphores, message queues, messages, etc. are common to all systems. With good encapsulations it's quite possible to have the same code compile for Solaris, VxWorks, Windows, and other systems. It just takes a little thought.

    * ROM Beware

      A lot of systems create a ROM and download code later over the network that is linked against the ROM. Something to remember is linkers will try and include only code that is used. So your ROM may not contain code that loaded code expects to be there. You need to include all functions in your ROM.

    * Multiple Interface Levels

      Most embedded systems have a command line interface which usually requires C linkage, then they may have an SNMP interface, and they may have some sort of other friendly interface. Design this up front to be common across all code. It will make your life much easier. C functions require access to global pointers so they can use objects. The singleton pattern makes this easier.

      Come up with common naming conventions. A decent one is:
          o Make up a module abbreviation that can be prefixed to all calls. For example: log for the logging module.
          o Encode an action after the prefix. For example: logHelp which prints help for the logging module.
          o Require a certain set of functions for each sub system: For example:
                + moduleHelp - prints help for the module
                + modulePrint - prints the current state of the module
                + moduleStart - start a module
                + moduleStop - stop a module
                + moduleSetDebug - set the debug level for a module. It's very nice to set debug levels on a module by module basis. 

    * Debug and Error System First

      Make your debug and error system first so everyone writing code will use it. It's very hard to retrofit code with debug output and intelligent use of error codes. If you have some way to write system assert errors to NVRAM, disk, or some other form of persistent storage so you can recover it on the next reboot.

    * Think About Memory

      Think how you'll share memory buffers between ISR code and task level code. Think how fast your default memory allocator is, it is probably slow. Think if your processor supports purify! Think how you'll track memory corruption and leakage.

    * Think About System Integrity

      You need to design up front how you are going to handle watchdog functions and test that the system is still running and not corrupted.

    * Remember to Use Volatile

      When using memory mapped I/O make sure that you declare the input port variables as volatile, (some compilers do this automatically), since the value can change without notice, and the optimizer could eliminate what looks like a redundant access to that variable. Not using volatile leads to some very obscure bugs. If you suspect problems in this area take a look at the generated code to make sure read-only assumptions are being made.

      Sometimes the keyword volatile is ifdef'd out for portability reasons. Check that what you think is volatile is really declared as volatile. 

Comments (View)
Loading comments...
 
Problems loading Disqus?
Like Dislike

    * 1 person liked this.

	Community 	
Disqus

    *
      Login options
          o
          o
          o
          o
          o
          o
    * About Disqus

Glad you liked it. Would you like to share?

Facebook

Twitter

Share No thanks

Sharing this page ...

Thanks! Close
Add New Comment
Post as â¦
Showing 63 comments
Sort by   Subscribe by email   Subscribe by RSS

    *
      	
      Sagar Ranglani [Moderator] 2 years ago
      This is extreamly comprehensive... No doubt...The above things are comming out of a highly experienced programmers' brain. Extreamly usefull...
      Thanx ...
      Flag
      1 person liked this. Like Reply Reply
    *
      	
      buy youtube views [Moderator] 1 month ago
      I think weâre making some progress now. TurboGears 2 and Pylons use something weâre calling âWSGI Componentsâ which are not pure WSGI middleware in the sense you mean it. Routes for example has a pretty standard API to work with, but itâs (or something implementing that API) is definitely required for Pylons to work.
      Flag
      Like Reply Reply
    *
      	
      SUNDAY [Moderator] 2 months ago
      HOW CAN I GET CODES FOR ALREADY DESIGN PROGRAM IN C++
      Flag
      Like Reply Reply
    *
      	
      SUNDAY [Moderator] 2 months ago
      HOW CAN I GET A COMPLETE PROGRAM CODE FOR SERIES OF SOFTWARE AND DESIGN PROCEDURE
      Flag
      Like Reply Reply
    *
      	
      Mike [Moderator] 3 months ago
      "Continue and break like goto should be used sparingly as they are magic in code. With a simple spell the reader is beamed to god knows where for some usually undocumented reason."

      I'm sorry, Mr. Hoff, but this makes you look stupid. Regardless of how clearly or not the loop is written, the change in program flow after a continue or break is very well defined; if you think you've been "beamed to god knows where," you just don't know what you're doing, and should consider a career in retail. If, on the other hand, you think that this kind of hyperbole is amusing, well... you do your readers a disservice by discouraging them away from these useful constructs.

      Properly used, continue and break within loops enhance clarity. The key issue in the problematic case you describe is not the continue and break, but the "lot of code" issue. Long blocks of code, regardless of the control structures contained therein, are prone to bugs. Additionally, the loop in your particular example was written poorly: the test should have been incorporated into the while loop itself: "while (i++ > STOP_VALUE) {...}".

      I further suspect that, as presented in your example, the use of post-increment rather than a pre-increment, located at the end of the loop, was also a bug, but that would depend on the initialization and use of 'i' before and within the loop. If in fact that was the correct behavior, replacing the while() with a do/while() would have been the preferred construct.

      I have not yet found in your document whether you also discourage the use of multiple exit points from a function using early 'return' statements. There was a while when this was also discouraged, but the current thinking is that early exits also contribute to clarity, especially when used at the beginning of a function to check for e.g. error conditions before proceeding with the true logic of the function.
      Flag
      Like Reply Reply
    *
      	
      toddhoff [Moderator] 3 months ago in reply to Mike
      Maybe I just don't look stupid? While I don't agree with every point in the standard, I do agree strongly with this one. My personal style has always been to rely heavily on early exits. Create a function that is very narrow in scope, return when you find something interesting, and the end say nothing interesting was found. This means below a return statement you know there's no interaction. Very easy to understand. It also works beautifully with RAII. Nothing similar an be said about continues/breaks/and gotos (beyond their traditional uses in switch/loops). When you come upon code in the wild that is pages long and is filled with control flow jumps the only way to understand it is to execute the code in your head, which is much harder than a syntactic scan, which is what you want from code. You are of course more than free to disagree and do differently. I would say that many bugs, especially resource exhaustion bugs, are found in code with heavy control flow manipulation.
      Flag
      Like Reply Reply
    *
      	
      Mike [Moderator] 4 months ago
      "Until all compilers support bool" -- huh? Do you know of any C++ implementation that has never supported bool fully? And if you're talking only about C, then you should not be encouraging people to define a type called "bool" because of potential conflicts if their code is used by a C++ compiler.

      As for this bit of wisdom:
      "if (TRUE == func()) { ... must be written if (FALSE != func()) { ... "

      Neither form is best. If the function returns 0 for the false condition, then a simple "if (func())" to detect true is correct, always , in C or C++, and more readable.
      If, on the other hand, the function returns 0 for "no error" and an error code for error, then you'd want to use "if (func() == NO_ERROR)" -- NO_ERROR, not FALSE. It may be acceptable in the scope of a project to accept the idiom of !func() => "no error," but that's not too intuitive: "not" does not imply "success." Compare this to using if (!ptr) to test for a NULL pointer, which is intuitive as well as readable.
      Flag
      Like Reply Reply
    *
      	
      Mike [Moderator] 4 months ago
      "Block of declarations should be aligned."
      No, they should not. If you have a block of declarations with a bunch of short types and then later need to add a longer type, this technique requires changing all the whitespace in that block just to accommodate this rule. Columnar alignment has its uses, particularly in lines of calculation that are similar so as to point out the differences. This rule is misguided.
      Flag
      Like Reply Reply
    *
      	
      Wolf [Moderator] 4 months ago in reply to Mike
      Yes mike, this is an important point! I'm discussing this strange kind of beauty for years.
      Do you know a place in the web, where a standard for C++ could be elaborated
      and it's elements get discussed constructively? I'm very interested in this topic.
      Please let me read the link here. or there:
      http://www.possibility.com/Cpp/CppCodingStandar...

      Thanks in advance!
      Flag
      1 person liked this. Like Reply Reply
    *
      	
      Mike [Moderator] 4 months ago
      "It's a good idea to typedef int8, int16, int32, int64, float32, float64, uint8, uint16, uint32, uint64"
      In C99, <stdint.h> defines int8_t, int16_t, uint32_t, etc. These types have not yet made it into the C++ standard, but they are defined in boost::cstdint with those same names. The shorter versions, however nice and clean they are, should be deprecated in favor of the standard names.
      Flag
      Like Reply Reply
    *
      	
      Recruit0 [Moderator] 4 months ago
      Very nice.

      EDIT: Didn't realize there was a PDF of this and links to sections. Lots of information here.
      Flag
      Like Reply Reply
    *
      	
      Wolf [Moderator] 4 months ago
      I have (at least) one question concerning your C++ coding standard.
      It's about padding within parentheses. I'm not sure whether to like or dislike it,
      I practised both in my programming. As I read, you seem to favor no padding.
      The Java coding standard shares your favor. Would you tell me (or best of all:
      the future readers of your standard) good reasons for doing so?
      Please do not misconceive me: Currently I like the style you discribe.
      But I have no found a really competitive reason against "visual clarity" of the padded version.

      With best regards
      Flag
      Like Reply Reply
    *
      	
      toddhoff [Moderator] 4 months ago in reply to Wolf
      I don't think there are any really any truly convincing reasons when it comes to these sorts of choices. The point here I think is ease of code reading. The space separating everything approach makes everything look a like, which in a functional language is probably sensible, but in C++ we have if, while, do, etc and these should stand out when scanning. They stand out less when everything has a space. YMMV.
      Flag
      Like Reply Reply
    *
      	
      Wolf [Moderator] 4 months ago in reply to toddhoff
      Since this is about C++, isn't it a good idea to add some these considerations
      to the section at http://www.possibility.com/Cpp/CppCodingStandar... ?
      the ease for scanning source code provided by spaces after keywords is certainly
      limited by padding spaces within parentheses.

      Your reason seems "convincing" to me, even if maybe not "truly convincing" to everybody. ;-)
      Flag
      Like Reply Reply
    *
      	
      Ð¢Ð¸Ð¿Ð¾Ð³ÑÐ°ÑÐ¸Ñ [Moderator] 4 months ago
      Thanks. It`s good
      Flag
      Like Reply Reply
    *
      	
      Electronic Cigarette Girl [Moderator] 4 months ago
      Im new at coding so a lot of this is over my head but useful as I keep learning. Every time I visit this article it makes more and more sense to me.

      -Bella :)
      Flag
      Like Reply Reply
    *
      	
      1465 [Moderator] 5 months ago
      give another information about topic in turoo c
      Flag
      Like Reply Reply
    *
      	
      martindesjardins [Moderator] 6 months ago
      Hi !

      Nice coding standard. I agree with most of it and fit with observations i gather through my 12 years of professional programming. I wouldnt be afraid to take it as a whole and applying it in the company where i work.

      Good job !

      Martin Desjardins ing.
      Flag
      Like Reply Reply
    *
      	
      Manifestsilence [Moderator] 7 months ago
      Thank you for a wonderful read. I'm quite new to serious programming - I'm a long time dabbler in Basic for Conway-esque simulations and the like, and now teaching myself C++. This page is by far the best guidance I have found for the scope of the language, what constitutes good habits, and what the heck kind of mess I'm getting into here. Made me smile a lot too. I read the whole dang thing in one sitting at 2am even though I'm very new to the details of the language so much of my understanding was fuzzy at best. That it made as much sense as it did to me is a testament to your clarity.
      Flag
      Like Reply Reply
    *
      	
      toddh [Moderator] 7 months ago in reply to Manifestsilence
      Great, I'm glad you found it helpful. Now get some sleep :-)
      Flag
      Like Reply Reply
    *
      	
      MartinBell [Moderator] 10 months ago
      Hello. I have a question concerning your standard. Iâm using a very similar naming convention in my own project. Itâs based on the convention from my previous company with some changes but is quite close to your one. Unfortunately with this convention I sometimes get clashes between class and member names. For example.

      class Widget
      {
      ...
      };

      class WidgetContainer
      {
      Public:
      Const Widget& GetMeTheWidgetMethod(){return mWidget;}

      Private:
      Widget mWidget;
      };

      The question is what would you call GetMeTheWidgetMethod? I would like to call it simply Widget so you can call it as so:

      const Widget& widget=container->Widget();

      Obviously you cannot do this C++. You could call it GetWidget() or even TheWidget(). The problem is its then inconsistent with the rest of the code. At my old company we prefixed all class names with C in the same way as MFC does which is a solution but Iâd rather not go there.

      Thank you.
      Flag
      Like Reply Reply
    *
      	
      MartinBell [Moderator] 10 months ago in reply to MartinBell
      Iâve sort of solved my own problem. You just need to prefix the word class then using a Widget inside WidgetContainer. Iâm sure there is a better naming convention but this at least works. It would certainly confuse people so I wouldnât use it on a big project.

      class WidgetContainer
      {
      Public:
      Const class Widget& Widget(){return mWidget;}

      Private:
      class Widget mWidget;
      };
      Flag
      Like Reply Reply
    *
      	
      hotmail email [Moderator] 10 months ago
      Wow.. thanks your information about coding is awsome thanks a lot..
      Flag
      Like Reply Reply
    *
      	
      sanzilla [Moderator] 10 months ago
      nice article sir ,
      keep this up.
      Flag
      Like Reply Reply
    *
      	
      Thomas [Moderator] 1 year ago
      is this THE coding standard? are there any other coding standards which are spread in big software-companies?
      till now i had my "own coding standard" but now i will use a wide spread standard.... i think this document will be very useful :-)

      last question: is it possible to add pagenumbers to the pdf-document?
      Flag
      Like Reply Reply
    *
      	
      angel_tsankov [Moderator] 1 year ago
      What is the rationale behind including system headers first, then project headers, and finally local ones? Why not include them in the reverse order?
      That could help us catch missing includes in local files.
      Flag
      Like Reply Reply
    *
      	
      toddh [Moderator] 1 year ago in reply to angel_tsankov
      I think an order is the important thing and makes the code easier to
      scan and understand. Which order doesn't matter unless you are trying to
      define forwardly referenced classes. There usually develops a pattern.
      System files exist in low layer encaps and higher level application code
      includes those so system files shouldn't be all that common anyway.
      Flag
      Like Reply Reply
    *
      	
      littleprogrammer [Moderator] 1 year ago
      Hello ! I enjoyed your article and it seems great to me. I like it, and I think it's really usefull. I can say that I'd undersnat something very important today. Keep programming, guy ! :)
      Flag
      Like Reply Reply
    *
      	
      mrtecnolog [Moderator] 1 year ago in reply to littleprogrammer
      hei littleprogrammer, It seems like we are of the same kind,hey dude i like dealing with programming that much.Today i saw one ATM system and notice some many bugs which need to be dealt with.in my time im gonna develop a system...yah!!! keep on working hard bra!!
      Flag
      Like Reply Reply
    *
      	
      littleprogrammer [Moderator] 1 year ago in reply to mrtecnolog
      Good luck with your project guy, and me patient. I think it will "grow" great, and it's probably awesome ;) !


      This day I wanna implemet a calculator for the big numbers (over 500 digits). I learn how to make operations with this and I think it's really cool. I like big numbers. More about me: I'm studding algorithms and make problems for the Informatics Olimpycs in Romania, I'm form Romania ....

      See ya, let's start programming. :D
      Flag
      Like Reply Reply
    *
      	
      Name [Moderator] 1 year ago
      Very nice page. But I am confused in one aspect:
      How should I name boost::shared_ptr?
      Should I use "pMyName" because it is holding a pointer and provides pointer syntax
      or "my_name" because it is allocated on the stack?
      Flag
      Like Reply Reply
    *
      	
      cool986 [Moderator] 1 year ago
      Pretty cool set of resources...thanks
      http://www.mpos.net/s/p4.asp
      http://fashionshow99.spaces.live.com
      Flag
      Like Reply Reply
    *
      	
      Muhammad alaa [Moderator] 1 year ago
      this is awsome. thanks guys so much
      Flag
      Like Reply Reply
    *
      	
      LUTHANDO [Moderator] 1 year ago
      Hi, i just wanna thank you for supporting us with a such full resource like this, my dream for future is to become a recognised software engineerer again thank you.
      Flag
      Like Reply Reply
    *
      	
      season [Moderator] 1 year ago
      Very comprehensive...but it's would be great to have some files put all these rules together
      I am saying that with the files readers could use as templates
      Flag
      Like Reply Reply
    *
      	
      Lestaizezima [Moderator] 1 year ago
      Anything you can tell me on how to make hacks cuz im new in this stuff i need to make a hack for this game for my friend it deals with Getting by a security system GameGaurd and beable to track people characters movement to be able to hit them (the game is Soldier Front from ijji)
      Flag
      Like Reply Reply
    *
      	
      learn.hypnosis [Moderator] 1 year ago
      Great job .............. Keep going......................
      Flag
      Like Reply Reply
    *
      	
      pratik [Moderator] 1 year ago
      gr8 one..thankz a lot
      Flag
      Like Reply Reply
    *
      	
      FloridaHealthInsurance [Moderator] 1 year ago
      thanks for sharing the useful resources. no doubt the person is highly experienced. thanks .
      Flag
      Like Reply Reply
    *
      	
      FloridaHealthInsuranceQuotes [Moderator] 1 year ago
      The /* (slash, asterisk) characters, followed by any sequence of characters (including new lines), followed by the */ characters. This syntax is the same as ANSI C.
      Flag
      Like Reply Reply
    *
      	
      Jeremy [Moderator] 1 year ago
      I suggest removing the "Flow Chart for Project Decision Making" due to the foul language. I am trying to convince my employer of the need to adopt a coding standard. I really like the content here but the "joke" at the beginning is undermining the effectiveness of the article.
      Flag
      Like Reply Reply
    *
      	
      todd [Moderator] 1 year ago in reply to Jeremy
      What people usually do is make a copy and delete what they find objectionable and add their local changes. Feel free to do the same.
      Flag
      Like Reply Reply
    *
      	
      Mike [Moderator] 4 months ago in reply to todd
      It's not just the foul language; it's the smarmy side comments and sardonic tone that pervades the article that make it difficult to recommend. Like, in the "one statement per line" section, you write "Nothing better than to read code that is one line after another with no white space or comments." In fact you mean something more like "It is painful to read code..." There are people reading this whose first language isn't English; forcing them to deal with your sarcasm is even more counterproductive than the foul language.

      And as for the little dialog between you and the "rube" -- are we supposed to be impressed that you look down your nose at someone? That you "smile secretly to yourself"? You undermine the useful information by treating its presentation as a lark, and because these little bits are sprinkled throughout, it requires someone who wants to make "local changes" towards a more professional tone to be a very diligent copy editor.
      Flag
      Like Reply Reply
    *
      	
      toddhoff [Moderator] 4 months ago in reply to Mike
      I got it Mike. You don't like me or the standard. But I do appreciate the more substantial comments you have made elsewhere and hopefully they'll give others something to think about when writing their own take on a standard.
      Flag
      Like Reply Reply
    *
      	
      Piyush Aggarwala [Moderator] 1 year ago
      Simply KILLER documentation. My cousin showed me this information and even though I don't write in C/C++ (I'm a VBA and newbie to VB.NET), I am picking up some cool ideas with my coding.
      Flag
      Like Reply Reply
    *
      	
      shahri [Moderator] 1 year ago
      I'd like to write something special, but I can just ACK the things the other commenters wrote: Very helpful!
      Flag
      Like Reply Reply
    *
      	
      fiancee visa [Moderator] 1 year ago
      The /* (slash, asterisk) characters, followed by any sequence of characters (including new lines), followed by the */ characters. This syntax is the same as ANSI C.
      Flag
      Like Reply Reply
    *
      	
      fiancee visa [Moderator] 1 year ago
      Really a very helpful information. Thanks for sharing with us. Like your way of view.
      Flag
      Like Reply Reply
    *
      	
      purushottam [Moderator] 1 year ago
      i want a table of 2 in c++ codeing
      Flag
      Like Reply Reply
    *
      	
      Fabio Locati [Moderator] 1 year ago
      Is there a PDF version of this?
      Flag
      Like Reply Reply
    *
      	
      todd [Moderator] 1 year ago in reply to Fabio Locati
      Sorry, no. Just html.
      Flag
      Like Reply Reply
    *
      	
      Jonathon Ogden [Moderator] 1 year ago
      Superb documentation. Whilst it contains your own thoughts you use many other sources so you aren't implying that you are only right and everyone else is wrong. Very balanced view of the different subjects since any aspect that you covered can be a source for arguments. One instance for me was that in a small team I worked with, 2 members argued for 8 hours solid on whether to use the prefix 'm' for member variables or 'm_typename' e.g bool m_boolGenderIsMale or bool mGenderIsMale.

      Anyway, your documentation is brilliant and I have to agree with Sagar, certainly comes from a highly experienced programmers' mind, one that is especially balanced regarding these subjects. I hope you continue to develop this documentation if the need arises.
      Flag
      Like Reply Reply
    *
      	
      todd [Moderator] 1 year ago in reply to Jonathon Ogden
      Spending eight hours on such a seemingly trivial distinction sounds very familiar :-) Do that on several projects and you get this standard. I'm glad people have found it useful.
      Flag
      Like Reply Reply
    *
      	
      visitor [Moderator] 1 year ago
      great Stuff! Thanks
      Flag
      Like Reply Reply
    *
      	
      Chris [Moderator] 1 year ago
      love the Flow Chart for Project Decision Making thing. that really cracked me up laughing.
      Flag
      Like Reply Reply
    *
      	
      Niki [Moderator] 2 years ago
      Thanks.
      Flag
      Like Reply Reply
    *
      	
      Puppy[CN] [Moderator] 2 years ago
      Thanks very much for the great suggestions in the doc ~~ they're really useful in my coding practice.
      Flag
      Like Reply Reply
    *
      	
      Pascal [Moderator] 2 years ago
      Wow. This is the largest coding standard list I've found so far.

      Programming Language Questions & review
      Flag
      Like Reply Reply
    *
      	
      ranjankumar [Moderator] 2 years ago
      Thanx Toddh for nice document.
      We have taken this for as the standards practice for coding in C++ at CDAC Mumbai, India.
      http://cdacmumbai.in
      Flag
      Like Reply Reply
    *
      	
      toddh [Moderator] 2 years ago
      Thanks Sagar for the kind words. And thanks for being my first Disqus comment!
      Flag
      Like Reply Reply
    *
      	
      toddh [Moderator] 2 years ago
      test
      Flag
      Like Reply Reply
    *
      	
      rock [Moderator] 1 year ago in reply to toddh
      Can u tell me how many functions a class should hold as per coding standards
      Flag
      Like Reply Reply
    *
      	
      toddh [Moderator] 1 year ago in reply to rock
      I could but I would be lying. It's the nastiest of all things, a judgment call. Sure, if there were more than X then I might be concerned. X maybe 30 or pick some other number. What matters to me are does it meet design rules like high cohesion, loose coupling, single responsibility, unit tested, clear naming, well documented etc. If there are 20 convenience accessors I would worry about it. If there were 20 methods that look like they belong to another class than I would worry.
      Flag
      Like Reply Reply

Trackback URL 
blog comments powered by Disqus

Â© Copyright 1995-2008. Todd Hoff. All rights reserved.
```
