---
type: reference
title: Documentation
description: "C++ Coding Standard on documentation: comments, header files and file structure."
tags: [cpp, coding-standards, legacy, third-party, reference]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-cpp#17.1.4"
---

# 17.1.4. Documentation

[↑ C++ Coding Standard, http://www.possibility.com/Cpp/CppCodingStandard.html](/kb-cpp/17-coding-standards/01-c-coding-standard-http-www-possibility-com-cpp-cppcodingstan/README.md)

```text
Comments Should Tell a Story
Consider your comments a story describing the system. Expect your comments to be extracted by a robot and formed into a man page. Class comments are one part of the story, method signature comments are another part of the story, method arguments another part, and method implementation yet another part. All these parts should weave together and inform someone else at another point of time just exactly what you did and why.

Document Decisions
Comments should document decisions. At every point where you had a choice of what to do place a comment describing which choice you made and why. Archeologists will find this the most useful information.

Use Extractable Headers
Use a document extraction system like Doxygen when documenting your code.

These headers are structured in such a way as they can be parsed and extracted. They are not useless like normal headers. So take time to fill them out. If you do it right once no more documentation may be necessary.

As part of your nighlty build system have a step the generates the documentation from the source. Then index the source using a tool like Lucene. Have a front end to the search so developers can do full text searches on nightly builds and for release builds. This is a wonderfully useful feature.

The next step in automation is to front the repository with a web server documentation can directly refer to a source file with a URL.

Comment All Questions a Programmer May Have When Looking at Your Code
At every point in your code think about what questions a programmer may have about the code. It's crucial you answer all those questions somehow, someway. If you don't, as the code writer, answer those questions, who will?

If you think your code is so clear and wonderful that nobody will have any questions then you are lying to yourself. I have never seen a large system with this wonderful self-documenting code feature. I've seen very few small libraries are even a single class that are so wonderfully self-documented.

You have a lot of tools at your disposal to answer questions:

   |1. A brain to think up the questions you should be answering. Why? Who? When? How? What?
   |2. Variable names.
   |3. Class names.
   |4. Class decomposition.
   |5. Method decomposition.
   |6. File names.
   |7. Documentation at all levels: package, class, method, attribute, inline. 

The better you are at orchestrating all these elements together the clearer your code will be to everyone else.

I don't really consider unit tests a question answering device because if you can't understand the code by reading it, reading something else about the code you don't understand won't help you understand it better.

Make Your Code Discoverable by Browsing
Programmers should be able to navigate your code by looking at markers in the code, namely the names and the directory structure. Nothing is more frustrating to than to have to look at pile of code and have no idea what it's organizing principles are.

Have a logicanl directory structure. Have directories called doc, lib, src, bin, test, pkg, install, etc and whatever, so I at least have some idea where stuff is. People use the weirdest names and lump everything together so that it it can be detangles. Clear thought is evidenced from the beginning by a directory stucture.

Don't put more than one class in a file. Otherwise, how will I know its there when I browse your code? Should I really need to use search to find every last thing? Can't I just poke around the code and find it? I can if you organize your code.

Name your files after your classes. I didn't believe this one until I saw it. Why you name a file different than the class? How I am possibly supposed to know what's in the file otherwise?

Write Comments as You Code
You won't every go back later and document your code. You just won't. Don't lie to yourself, the world, and your mother by saying that you will.

So when you do something document it right then and there. When you create a class- document it. When you create a method- document it. And so on. That way when you finish coding you will also be finished documenting.

I advocate simultaneously writing code, writing tests, and writing documentaiton. Which comes first depends on you and the problem. I don't think there is any rule that says which should come first. On the path to getting stuff done I'll take the entrance that seems easiest to me at the time. Once on the path it's easy to follow the entire trail.

Won't this break the flow? No, I think it improves flow because it keeps you mindful of what you are doing, why you are doing, and how it fits in the big picture. My take on TDD (test driven development) is that it's not the tests that are really important, it's that the tests keep you mindful while programming. A test means you are keeping everything in you mind at once you need to remember to successfully code something up. As you can't keep large chunks in your mind then smaller chunks are better. Writing a test forces you to remember what your code is supposed to accomplish. It's forcing you to also think about the use case/story/intent behind why you are writing the code.

The result is a pointed mind that has focussed all its powers on doing one thing. When you can bring that focus to you programming you can be successful. The tests are really secondary. If your system/acceptance tests can't find bugs you are screwed anyway. And I find code written mindfully, one step at a time, has very few bugs. Unit tests are just one definition of a "step." You can use the orignial story you are implementing as a step as well. I use unit tests more as a mental focussing device while developing, like Zen Archery, than for the actual tests. After development unit tests are very useful in making sure code doesn't break. So I am not saying unit tests aren't useful. I just don't think they are the real reason behind why TDD generates working code. With a clear well functioning focussed mind we generate working code. But getting into that state is hard.

Writing comments simultaneously with all other aspects of development deepens your mindfulness because you are thinking about everything at once. All the interconnections are present in your brain because you are explaining the intent behind what you are doing.

There's a saying that you don't know something until you teach it. Comments are teaching what you are doing to someone else. When you are writing comments you must generate the thoughts to teach, to explain to someone else the intent behing what you are doing. It's very difficult to make a coding error when all this context is hot in your mind.

I'll go back and forth between documenting, testing, and coding. I'll let the problem dictate what happens when as I am working my way through solving the problem. Saying testing should always come first is too simple a rule and I think misses the larger point about software development.

Software is ultimately mind stuff. Using our minds better is the real methodology.

Make Gotchas Explicit
Explicitly comment variables changed out of the normal control flow or other code likely to break during maintenance. Embedded keywords are used to point out issues and potential problems. Consider a robot will parse your comments looking for keywords, stripping them out, and making a report so people can make a special effort where needed.

Gotcha Keywords

    * :TODO: topic
      Means there's more to do here, don't forget.

    * :BUG: [bugid] topic
      means there's a Known bug here, explain it and optionally give a bug ID.

    * :KLUDGE:
      When you've done something ugly say so and explain how you would do it differently next time if you had more time.

    * :TRICKY:
      Tells somebody that the following code is very tricky so don't go changing it without thinking.

    * :WARNING:
      Beware of something.

    * :COMPILER:
      Sometimes you need to work around a compiler problem. Document it. The problem may go away eventually.

    * :ATTRIBUTE: value
      The general form of an attribute embedded in a comment. You can make up your own attributes and they'll be extracted.

Gotcha Formatting

    * Make the gotcha keyword the first symbol in the comment.
    * Comments may consist of multiple lines, but the first line should be a self-containing, meaningful summary.
    * The writer's name and the date of the remark should be part of the comment. This information is in the source repository, but it can take a quite a while to find out when and by whom it was added. Often gotchas stick around longer than they should. Embedding date information allows other programmer to make this decision. Embedding who information lets us know who to ask. 

Example

   // :TODO: tmh 960810: possible performance problem
   // We should really use a hash table here but for now we'll
   // use a linear search.

   // :KLUDGE: tmh 960810: possible unsafe type cast
   // We need a cast here to recover the derived type. It should
   // probably use a virtual method or template.

See Also
See Interface and Implementation Documentation for more details on how documentation should be laid out.

Interface and Implementation Documentation
There are two main audiences for documentation:

    * Class Users
    * Class Implementors 

With a little forethought we can extract both types of documentation directly from source code.
Class Users
Class users need class interface information which when structured correctly can be extracted directly from a header file. When filling out the header comment blocks for a class, only include information needed by programmers who use the class. Don't delve into algorithm implementation details unless the details are needed by a user of the class. Consider comments in a header file a man page in waiting.
Class Implementors
Class implementors require in-depth knowledge of how a class is implemented. This comment type is found in the source file(s) implementing a class. Don't worry about interface issues. Header comment blocks in a source file should cover algorithm issues and other design decisions. Comment blocks within a method's implementation should explain even more.

Directory Documentation
Every directory should have a README file that covers:

    * the purpose of the directory and what it contains
    * a one line comment on each file. A comment can usually be extracted from the NAME attribute of the file header.
    * cover build and install directions
    * direct people to related resources:
          o directories of source
          o online documentation
          o paper documentation
          o design documentation 
    * anything else that might help someone 

Consider a new person coming in 6 months after every original person on a project has gone. That lone scared explorer should be able to piece together a picture of the whole project by traversing a source directory tree and reading README files, Makefiles, and source file headers.

Include Statement Documentation
Include statements should be documented, telling the user why a particular file was included. If the file includes a class used by the class then it's useful to specify a class relationship:

    * ISA - this class inherits from the class in the include file.
    * HASA - this class contains, that is has as a member attribute, the class in the include file. This class owns the memory and is responsible for deleting it.
    * USES - this class uses something from the include file.
    * HASA-USES - this class keeps a pointer or reference to the class in the include file, but this class does not own the memory. 

Example

#ifndef XX_h
#define XX_h

// SYSTEM INCLUDES
//
#include                              // standard IO interface
#include                             // HASA string interface
#include                               // USES auto_ptr


Notice how just by reading the include directives the code is starting to tell you a story of why and how it was built.

Block Comments
Use comments on starting and ending a Block:

{  
   // Block1  (meaningful comment about Block1)
  ... some code

  {  
     // Block2  (meaningful comment about Block2)
     ... some code
  }  // End Block2

}  // End Block1

This may make block matching much easier to spot when you don't have an intelligent editor.
```
