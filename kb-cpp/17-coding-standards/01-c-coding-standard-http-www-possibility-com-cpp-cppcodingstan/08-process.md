---
type: reference
title: Process
description: "C++ coding standard (possibility.com): process guidance such as design notation and development practices."
tags: [cpp, coding-standards, guide, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-cpp#17.1.7"
---

# 17.1.7. Process

[↑ C++ Coding Standard, http://www.possibility.com/Cpp/CppCodingStandard.html](/kb-cpp/17-coding-standards/01-c-coding-standard-http-www-possibility-com-cpp-cppcodingstan/README.md)

```text
Use a Design Notation and Process
Programmers need to have a common language for talking about coding, designs, and the software process in general. This is critical to project success.

Any project brings together people of widely varying skills, knowledge, and experience. Even if everyone on a project is a genius you will still fail because people will endlessly talk past each other because there is no common language and processes binding the project together. All you'll get is massive fights, burnout, and little progress. If you send your group to training they may not come back seasoned experts but at least your group will all be on the same page; a team.

There are many popular methodologies out there. The point is to do some research, pick a method, train your people on it, and use it. Take a look at the top of this page for links to various methodologies.

You may find an Agile methodology to your liking. For more information see http://www.possibility.com/epowiki/Wiki.jsp?page=agile.

You may find the CRC (class responsibility cards) approach to teasing out a design useful. Many others have. It is an informal approach encouraging team cooperation and focusing on objects doing things rather than objects having attributes. There's even a whole book on it: Using CRC Cards by Nancy M. Wilkinson.

Using Use Cases
A use case is a generic description of an entire transaction involving several objects. A use case can also describe the behaviour of a set of objects, such as an organization. A use case model thus presents a collection of use cases and is typically used to specify the behavior of a whole application system together with one or more external actors that interact with the system.

An individual use case may have a name (although it is typically not a simple name). Its meaning is often written as an informal text description of the external actors and the sequences of events between objects that make up the transaction. Use cases can include other use cases as part of their behaviour.
Requirements Capture
Use cases attempt to capture the requirements for a system in an understandable form. The idea is by running through a set of use case we can verify that the system is doing what it should be doing.

Have as many use cases as needed to describe what a system needs to accomplish.
The Process

    * Start by understanding the system you are trying to build.
    * Create a set of use cases describing how the system is to be used by all its different audiences.
    * Create a class and object model for the system.
    * Run through all the use cases to make sure your model can handle all the cases. Update your model and create new use cases as necessary. 

Using Stories
A user story consists of just a phrase or a few sentences written down, announcing something the user wants to do. The user story is not used as a requirements specification, but as a marker for a future conversation.

    * User stories are used as tokens in the planning process after assessment of business value and risk. The customer prioritizes the stories and schedules them for implementation.
    * User Story is a story about how the system is supposed to solve a problem. Each UserStory represents a chunk of functionality that is coherent in some way to the customer.
    * User Story is a token that stands in for a conversation whose purpose is roughly equivalent to that of a UseCase. The content of a UserStory is often an abbreviated version of the main success scenario of a UseCase, but it doesn't have to be.
    * User Story is a marker that reminds the customer and developers what to talk about, and also inspires them in exploring some particular area of business value. A UserStory, then, contains whatever the customer thinks is necessary to jog the memories and inspirations of those who will later explore the story. Expertise in the business area will help the customer decide what are the essential "jogs" to record in the initial UserStory marker.
    * Developers should be able to implement a story in 2-4 weeks. The iteration length depends on you project. 

A Story Is

    * Testable -You can write automatic tests to detect the presence of the story.
    * Progress - The customers side of the team is willing to accept the story as a sign of progress toward their larger goal.
    * Bite-sized - The story should be completable within the iteration.
    * Estimatable - The technical side of the team must be able to guess how much of the team's time the story will require to get working. 

How It All Fits Together
There are a lot of entrants in this part of the development process. We have user stories, use cases, task analysis, task cases, usage scenarios, etc and etc.

It seems we need something more detailed than requirements as requirements tend to be fairly high level and are usually not directly useful for development. A requirement will cut across many subsystems and each of the cross-cuts must be identified. Thus requirements need to go through refinement and elaboration to be used in development.

If we get too detailed then we get bogged down in detailed design before we are ready. If we aren't detailed enough then we can't know if our requirements are met. Nor can we convince ourselves that we know how to solve the problem.

User Stories Need to be Fleshed Out
User Stories are symbolic of the stuff that needs to get done. They are like the reminder notes you make to yourself. In the detailed design these can be expanded out to uses cases, to more detailed notes, state machines, etc. Or TestDrivenDesign practices could be used to flesh out the detailed implementation.

For more information see http://www.possibility.com/epowiki/Edit.jsp?page=UserStory.

Unified Modeling Language
The Unified Modeling Language is too large to present here. Fortunately you can see it at Rational's web site. Since you do need a modeling language UML is a safe choice. It combines features from several methods into one unified language. Remember all languages and methods are open to local customization. If their language is too complex then use the parts you and your project feel they need and junk the rest.

Code Reviews
If you can make a formal code review work then my hat is off to you. Code reviews can be very useful. Unfortunately they often degrade into nit picking sessions and endless arguments about silly things. They also tend to take a lot of people's time for a questionable payback.

My god he's questioning code reviews, he's not an engineer!

Not really, it's the form of code reviews and how they fit into normally late chaotic projects is what is being questioned.

First, code reviews are way too late to do much of anything useful. What needs reviewing are requirements and design. This is where you will get more bang for the buck.

Get all relevant people in a room. Lock them in. Go over the class design and requirements until the former is good and the latter is being met. Having all the relevant people in the room makes this process a deep fruitful one as questions can be immediately answered and issues immediately explored. Usually only a couple of such meetings are necessary.

If the above process is done well coding will take care of itself. If you find problems in the code review the best you can usually do is a rewrite after someone has sunk a ton of time and effort into making the code "work."

You will still want to do a code review, just do it offline. Have a couple people you trust read the code in question and simply make comments to the programmer. Then the programmer and reviewers can discuss issues and work them out. Email and quick pointed discussions work well. This approach meets the goals and doesn't take the time of 6 people to do it.

For more information on code reviews please take a look at here. You'll find a lot of information on justifying code reviews if you are having troubles instituting them and lots of suggestions on how to conduct them.

Create a Source Code Control System Early and Not Often
A common build system and source code control system should be put in place as early as possible in a project's lifecycle, preferably before anyone starts coding. Source code control is the structural glue binding a project together. If programmers can't easily use each other's products then you'll never be able to make a good reproducible build and people will piss away a lot of time. It's also hell converting rogue build environments to a standard system. But it seems the right of passage for every project to build their own custom environment that never quite works right.

Some issues to keep in mind:

    * Appoint a buildmaster who is in charge of the build environment and making builds. If you have a tools group so much the better as build environments generally generate a lot of tools.
    * Programmers should generally leave tagging and other advanced operations to the buildmaster.
    * Shared source environments like CVS usually work best in largish projects.
    * Makefiles should be completely templated so developers need no makefile expertise.
    * You will need multiple builds of the same code meaning programmers will want to have the option of building against optimized code versions, debugger code versions, code with the -DDEBUG macro defined and versions without, etc. One way to do this is have everyone check out all code and do a total rebuild. The other better way is for the buildmaster to build all necessary versions of code so programmers can check out only the code which they are modifying. The idea is that each combination of compile flags and macros defines a build.
    * Dependency checking should work!
    * Maintain a cycle of builds. Create a nightly build so problems can be detected early. Create a valid build every week or for every feature set that is guaranteed to be good. Every release to QA or to customers should be tagged and available in the tree. Official builds should be official because they contain a certain set of features that assumably meet a schedule, not because it's a certain date.
    * If you use CVS use a reference tree approach. With this approach a master build tree is kept of various builds. Programmers checkout source against the build they are working on. They only checkout what they need because the make system uses the build for anything not found locally. Using the -I and -L flags makes this system easy to setup. Search locally for any files and libraries then search in the reference build. This approach saves on disk space and build time.
    * Get a lot of disk space. With disk space as cheap it is there is no reason not to keep plenty of builds around and have enough space for programmers to compile.
    * Make simple things simple. It should be dead simple and well documented on how to:
          o check out modules to build
          o how to change files
          o how to setup makefiles
          o how to add new modules into the system
          o how to delete modules and files
          o how to check in changes
          o what are the available libraries and include files
          o how to get the build environment including all compilers and other tools 

      Make a web page or document or whatever. New programmers shouldn't have to go around begging for build secrets from the old timers.
    * Use the idea of services. If using a feature requires linking to 3 libraries think about making a service specifiable in the makefile programmers can use instead of having to know the exact libraries needed. With this approach the libraries making up a service can be changed in a based makefile without requiring changes in all makefiles.
    * On checkins log comments should be useful. These comments should be collected every night and sent to interested parties. 

Source Code Control Systems
Some options for source code control systems are:

   |1. Subversion - a free, popular, and well featured system.
   |2. Perforce - a not free, popular, and very solid system that scales beautifully and just works.
   |3. Clear Case - a not free, popular in larger corporations, and requires a dedicated admin team, yet you can accomplish a lot with it. 

There are many other options out there. It doesn't matter which one you pick as much as it does that you pick one and use it.

Create a Bug Tracking System Early and Not Often
The earlier people get used to using a bug tracking system the better. If you are 3/4 through a project and then install a bug tracking system it won't be used. You need to install a bug tracking system early so people will use it.

Programmers generally resist bug tracking, yet when used correctly it can really help a project:

    * Problems aren't dropped on the floor.
    * Problems are automatically routed to responsible individuals.
    * The lifecycle of a problem is tracked so people can argue back and forth with good information.
    * Managers can make the big schedule and staffing decisions based on the number of and types of bugs in the system.
    * Configuration management has a hope of matching patches back to the problems they fix.
    * QA and technical support have a communication medium with developers. 

Not sexy things, just good solid project improvements.

FYI, it's not a good idea to reward people by the number of bugs they fix :-)

Source code control should be linked to the bug tracking system. During the part of a project where source is frozen before a release only checkins accompanied by a valid bug ID should be accepted. And when code is changed to fix a bug the bug ID should be included in the checkin comments.

Bug Tracking Systems
Some options for bug tracking systems are:

   |1. Jira - a full featured and reliable bug tracking system. It works best when combined with Confluence, their wiki product.
   |2. Bugzilla - a free product that is functional and widely used. 

As for source code control systems there are many available bug tracking systems. It's more important that you use one than which one you use.

RCS Keywords, Change Log, and History Policy
When using RCS directly this policy must change, but when using other source code control systems like CVS that support RCS style keywords:

    * Do not use RCS keywords within files.
    * Do not keep a change history in files.
    * Do not keep author information in files. 

Justification

    * The reasoning is your source control system already keeps all this information. There is no reason to clutter up source files with duplicate information that:
          o makes the files larger
          o makes doing diffs difficult as non source code lines change
          o makes the entry into the file dozens of lines lower in the file which makes a search or jump necessary for each file
          o is easily available from the source code control system and does not need embedding in the file 
    * When files must be sent to other organizations the comments may contain internal details that should not be exposed to outsiders. 

Create a Wiki System Early and Not Often
The heart of software development is information. Where do you put all your documentation? Where do we put your coding guidelines? Where you put all your process documents? Where do you put your design documents? Where do you put all the 1000s of bits of information that hold a project together?

With a strategy information is usually spread like seeds in the wind. Much is in people's heads, in email, in IM, in files on people's file systems, or files on different servers. Nobody can ever find anything they need.

A solution to this mess is to store all your information in a wiki. A Wiki is a web site written by many users. It's very easy for a community of people to create and edit content. The idea is that people can add a page for any topic they want and add to any existing page by simply editing it. Over time we can create a site addressing most of the issues people have about projects, products, development, process, and more.

A wiki is perfect support for software development.

I've written up my hard one advice for using wikis at Getting Your Wiki Adopted.

Honor Responsibilities
Responsibility for software modules is scoped. Modules are either the responsibility of a particular person or are common. Honor this division of responsibility. Don't go changing things that aren't your responsibility to change. Only mistakes and hard feelings will result.

Face it, if you don't own a piece of code you can't possibly be in a position to change it. There's too much context. Assumptions seemingly reasonable to you may be totally wrong. If you need a change simply ask the responsible person to change it. Or ask them if it is OK to make such-n-such a change. If they say OK then go ahead, otherwise holster your editor.

Every rule has exceptions. If it's 3 in the morning and you need to make a change to make a deliverable then you have to do it. If someone is on vacation and no one has been assigned their module then you have to do it. If you make changes in other people's code try and use the same style they have adopted.

Programmers need to mark with comments code that is particularly sensitive to change. If code in one area requires changes to code in an another area then say so. If changing data formats will cause conflicts with persistent stores or remote message sending then say so. If you are trying to minimize memory usage or achieve some other end then say so. Not everyone is as brilliant as you.

The worst sin is to flit through the system changing bits of code to match your coding style. If someone isn't coding to the standards then ask them or ask your manager to ask them to code to the standards. Use common courtesy.

Code with common responsibility should be treated with care. Resist making radical changes as the conflicts will be hard to resolve. Put comments in the file on how the file should be extended so everyone will follow the same rules. Try and use a common structure in all common files so people don't have to guess on where to find things and how to make changes. Checkin changes as soon as possible so conflicts don't build up.

As an aside, module responsibilities must also be assigned for bug tracking purposes.

Process Automation
It's a sad fact of human nature that if you don't measure it or check for it: it won't happen. The implication is you must automate as much of the development process as possible and provide direct feedback to developers on specific issues that they can fix.

Process automation also frees up developers to do real work because they don't have to babysit builds and other project time sinks.

Automated Builds and Error Assignment
Create an automated build system that can create nightly builds, parse the build errors, assign the errors to developers, and email developers their particular errors so they can fix them.

This is the best way to maintain a clean build. Make sure the list of all errors for a build is available for everyone to see so everyone can see everyone elses errors. The goal is replace a blaim culture with a culture that tries to get things right and fixes them when they are wrong. Immediate feedback makes this possible.

Automated Code Checking
As part of the automated build process you can check for coding standard violations and for other problems. If you don't check for it people will naturally do their own thing. Code reviews aren't good enough to keep the code correct. With a tool like Abraxis Code Check you can check the code for a lot of potential problems.

This feature like the automated error assignment makes problems immediately visible and immediately correctable, all without a lot of blame and shame.
Documentation Extraction
Related to this principle is the need to automatically extract documentation from the source code and make it available on line for everyone to use. If you don't do this documentation will be seen as generally useless and developers won't put as much effort into it. Making the documentation visible encourages people to do a better job.
Connect Source Code Control System and Bug Tracking System

   |1. When a check-in of source code fixes a bug then have the check-in automatically tell the bug tracking system that the bug was fixed.
   |2. When a bug fix is built in a build change the state of the bug to BUILT.
   |3. Have a submit tool where people ask judges of they can submit a bug fix on the branch. 

There are lots of things you can do depending on how complicated your environment. The more complicated the environment the more you should think about connecting all systems together.

Tools Agreement
The reality of different tool preferences is something to deal with explicitly and openly. Tools include IDEs, languages, editors, make program, source code control, bug system, debuggers, test framework, etc. Some tool decisions by their nature must be project wide, other decisions can be customized per developer.

A split might also be done by who is performing the build. For example, an IDE should be able to used in local builds, but the make program would be used for nightly and release builds.

Certain things are easy/trivial/useful with one tool, but hard/complicated/stupid with another tool. Unstated tool assumptions can be the source of a lot of confusion. "Get a better editor" is not always a workable response, though sometimes that's all there is to it!

Non-Blocking Scheduling
Schedules are lies. Schedules suck. Yes, yes, yes. But we still need them.

The most effective scheduling rule i've used is to schedule so as to unblock others. The idea is to complete the portions of a feature that will unblock those dependent on you. This way development moves along smoothly because more lines of development can be active at a time. For example, instead of implementing the entire database, implement the simple interface and stub it out. People can work for a very long time this way using that portion of the feature that caused others not to block. Plus it's a form of rapid prototyping because you get immediate feedback on these parts. Don't worry about the quality of implementation because it doesn't matter yet.

Using Personas
Personas are a powerful design tool, especially when combined with responsibility driven design. Cooper's personas are:.

simply pretend users of the system you're building. You describe 
them, in a surprising amount of detail, and then design your 
system for them. 

I have a standard set of personas that i consider when creating a design/architecture that don't seem to be common. When you write code their are a lot of personas looking over your shoulder:

   |1. other programmers using the code
   |2. maintenance
   |3. extension
   |4. documentation group
   |5. training group
   |6. code review
   |7. test and validation
   |8. manufacturing
   |9. field support
  |10. first and second line technical support
  |11. live debugging
  |12. post crash debugging
  |13. build system (documentation generation and automatic testing)
  |14. unit testing
  |15. system testing
  |16. source code control
  |17. code readers
  |18. legal 

You are much more careful and more thorough when you really thing about all the personas, all the different people and all their different roles and purposes.

Use a Continuous Build System
Setup a continuous build system for your group. It should build all new check-ins and run the unit tests for each change. If you have the resources run a smoke test for each build as well.

If there's a failure email should go out to the developer's who made the check-ins.

This policy will allow you to catch errors as early as possible which will make your system more stable over time.

Code in the Dominant Style
Let's say someone invites you into your home as a guest. How do you act? Do you act as you do at home or do you try and fit in with the household in which you are staying? You try to fit in of course.

So when you have to write code for a new codebase do you 1) write code however you want or 2) write code like the code that already exists?

When writing code in a new codebase write code how the code is already written. Don't use your own style. Take some time, look around, and see how the code is written. To come in like a bull in a china shop is the mark of someone who is not a professional developer.

Run Unit Tests Before Every Check-in
Before every check-in developers must run unit tests to verify all unit tests should pass. This prevents letting any errors creep in.

Finding, debugging, and handling errors is a tremendous drain on the development process so we want have a solid working system from the start. The start means your code that you check-in should always work and we know it works by running unit tests and smoke tests if your organization has them.

Formatting

Braces {} Policy
Brace Placement
Of the three major brace placement strategies two are acceptable, with the first one listed being preferable:

    * Place brace under and inline with keywords:

         if (condition)        while (condition)
         {                     {
            ...                   ...
         }                     }

    * Traditional Unix policy of placing the initial brace on the same line as the keyword and the trailing brace inline on its own line with the keyword:

         if (condition) {      while (condition) {
            ...                   ...
         }                     }

Justification

    * Another religious issue of great debate solved by compromise. Either form is acceptable, many people, however, find the first form more pleasant. Why is the topic of many psychological studies.

      There are more reasons than psychological for preferring the first style. If you use an editor (such as vi) that supports brace matching, the first is a much better style. Why? Let's say you have a large block of code and want to know where the block ends. You move to the first brace hit a key and the editor finds the matching brace. Example:

           if (very_long_condition && second_very_long_condition)
           {
              ...
           }
           else if (...)
           {
      	..
           }

      To move from block to block you just need to use cursor down and your brace matching key. No need to move to the end of the line to match a brace then jerk back and forth. 

When Braces are Needed
All if, while and do statements must either have braces or be on a single line.

Always Uses Braces Form
All if, while and do statements require braces even if there is only a single statement within the braces. For example:

if (1 == somevalue)
{
   somevalue = 2;
}

Justification
It ensures that when someone adds a line of code later there are already braces and they don't forget. It provides a more consistent look. This doesn't affect execution speed. It's easy to do.
One Line Form

if (1 == somevalue) somevalue = 2;

Justification
It provides safety when adding new lines while maintainng a compact readable form.
Add Comments to Closing Braces
Adding a comment to closing braces can help when you are reading code because you don't have to find the begin brace to know what is going on.

while(1)
{
   if (valid)
   {
  
   } // if valid
   else
   {
   } // not valid

} // end forever

Consider Screen Size Limits
Some people like blocks to fit within a common screen size so scrolling is not necessary when reading code.

Indentation/Tabs/Space Policy

    * Indent using 3, 4, or 8 spaces for each level.
    * Do not use tabs, use spaces. Most editors can substitute spaces for tabs.
    * Tabs should be fixed at 8 spaces. Don't set tabs to a different spacing, uses spaces instead.
    * Indent as much as needed, but no more. There are no arbitrary rules as to the maximum indenting level. If the indenting level is more than 4 or 5 levels you may think about factoring out code. 

Justification

    * Tabs aren't used because 8 space indentation severely limits the number of indentation levels one can have. The argument that if this is a problem you have too many indentation levels has some force, but real code can often be three or more levels deep. Changing a tab to be less than 8 spaces is a problem because that setting is usually local. When someone prints the source tabs will be 8 characters and the code will look horrible. Same for people using other editors. Which is why we use spaces...
    * When people using different tab settings the code is impossible to read or print, which is why spaces are preferable to tabs.
    * Nobody can ever agree on the correct number of spaces, just be consistent. In general people have found 3 or 4 spaces per indentation level workable.
    * As much as people would like to limit the maximum indentation levels it never seems to work in general. We'll trust that programmers will choose wisely how deep to nest code. 

Example

   void
   func()
   {
      if (something bad)
      {
         if (another thing bad)
         {
            while (more input)
            {
            }
         }
      }
   }

Parens () with Key Words and Functions Policy

    * Do not put parens next to keywords. Put a space between.
    * Do put parens next to function names.
    * Do not use parens in return statements when it's not necessary. 

Justification

    * Keywords are not functions. By putting parens next to keywords keywords and function names are made to look alike. 

Example

    if (condition)
    {
    }

    while (condition)
    {
    }

    strcpy(s, s1);

    return 1;

A Line Should Not Exceed 78 Characters

    * Lines should not exceed 78 characters. 

Justification

    * Even though with big monitors we stretch windows wide our printers can only print so wide. And we still need to print code.
    * The wider the window the fewer windows we can have on a screen. More windows is better than wider windows.
    * We even view and print diff output correctly on all terminals and printers. 

If Then Else Formatting
Layout
It's up to the programmer. Different bracing styles will yield slightly different looks. One common approach is:

   if (condition)                 // Comment
   {
   } 
   else if (condition)            // Comment
   {
   }
   else                           // Comment
   {
   }

If you have else if statements then it is usually a good idea to always have an else block for finding unhandled cases. Maybe put a log message in the else even if there is no corrective action taken.

Condition Format
Always put the constant on the left hand side of an equality/inequality comparison. For example:

if ( 6 == errorNum ) ...

One reason is that if you leave out one of the = signs, the compiler will find the error for you. A second reason is that it puts the value you are looking for right up front where you can find it instead of buried at the end of your expression. It takes a little time to get used to this format, but then it really gets useful.

switch Formatting

    * Falling through a case statement into the next case statement shall be permitted as long as a comment is included.
    * The default case should always be present and trigger an error if it should not be reached, yet is reached.
    * If you need to create variables put all the code in a block. 

Example

   switch (...)
   {
      case 1:
         ...
      // FALL THROUGH

      case 2:
      {        
         int v;
         ...
      }
      break;

      default:
   }

Use of goto,continue,break and ?:
Goto
Goto statements should be used sparingly, as in any well-structured code. The goto debates are boring so we won't go into them here. The main place where they can be usefully employed is to break out of several levels of switch, for, and while nesting, although the need to do such a thing may indicate that the inner constructs should be broken out into a separate function, with a success/failure return code.


   for (...) 
   {
      while (...) 
      {
         ...
         if (disaster)
            goto error;
      }
   }
   ...
error:
   clean up the mess 

When a goto is necessary the accompanying label should be alone on a line and to the left of the code that follows. The goto should be commented (possibly in the block header) as to its utility and purpose.
Continue and Break
Continue and break are really disguised gotos so they are covered here.

Continue and break like goto should be used sparingly as they are magic in code. With a simple spell the reader is beamed to god knows where for some usually undocumented reason.

The two main problems with continue are:

    * It may bypass the test condition
    * It may bypass the increment/decrement expression 

Consider the following example where both problems occur:

while (TRUE) 
{
   ...
   // A lot of code
   ...
   if (/* some condition */) {
      continue;
   }
   ...
   // A lot of code 
   ...
   if ( i++ > STOP_VALUE) break;
}

Note: "A lot of code" is necessary in order that the problem cannot be caught easily by the programmer.

From the above example, a further rule may be given: Mixing continue with break in the same loop is a sure way to disaster.

?:
The trouble is people usually try and stuff too much code in between the ? and :. Here are a couple of clarity rules to follow:

    * Put the condition in parens so as to set it off from other code
    * If possible, the actions for the test should be simple functions.
    * Put the action for the then and else statement on a separate line unless it can be clearly put on one line. 

Example

   (condition) ? funct1() : func2();

   or

   (condition)
      ? long statement
      : another long statement;

One Statement Per Line
There should be only one statement per line unless the statements are very closely related.

The reasons are:

   |1. The code is easier to read. Use some white space too. Nothing better than to read code that is one line after another with no white space or comments. 

One Variable Per Line
Related to this is always define one variable per line:

Not:
char **a, *x;

Do:
char** a= 0;  // add doc
char*  x= 0;  // add doc

The reasons are:

   |1. Documentation can be added for the variable on the line.
   |2. It's clear that the variables are initialized.
   |3. Declarations are clear which reduces the probability of declaring a variable when you actually mean to declare a pointer. 

Alignment of Declaration Blocks

    * Block of declarations should be aligned. 

Justification

    * Clarity.
    * Similarly blocks of initialization of variables should be tabulated.
    * The â&â and â*â tokens should be adjacent to the type, not the name. 

Example

   DWORD       mDword
   DWORD*      mpDword
   char*       mpChar
   char        mChar

   mDword   = 0;
   mpDword  = NULL;
   mpChar   = NULL;
   mChar    = 0;

Include static and virtual Key Words in Source File
If a method is made static or virtual in the header file then also include this information as a short comment in the source file. For example:

In .h file:

class PopcornPopper
{
public:
   virtual void Pop(void);
   static PopcornPopper* Singleton();
};


In .cpp file:

/*virtual*/ void 
PopcornPopper::Pop(void)
{
}// Pop

/*static*/ PopcornPopper* 
PopcornPopper::Singleton()
{
}// Singleton

A source file doesn't contain as much information as the header file because the virtual and static keywords are dropped from method implementations. This is very useful information to have when reading code, so we want to include it in the source file.

Document Null Statements
Always document a null body for a for or while statement so that it is clear that the null body is intentional and not missing code.


   while (*dest++ = *src++)
      ;         // VOID 
```
