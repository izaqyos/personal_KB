---
type: reference
title: Introduction
description: "C++ Coding Standard introduction: why standardization is important."
tags: [cpp, coding-standards, legacy, third-party, reference]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-cpp#17.1.1"
---

# 17.1.1. Introduction

[↑ C++ Coding Standard, http://www.possibility.com/Cpp/CppCodingStandard.html](/kb-cpp/17-coding-standards/01-c-coding-standard-http-www-possibility-com-cpp-cppcodingstan/README.md)

```text
Standardization is Important
It helps if the standard annoys everyone in some way so everyone feels they are on the same playing field. The proposal here has evolved over many projects, many companies, and literally a total of many weeks spent arguing. It is no particular person's style and is certainly open to local amendments.
Good Points
When a project tries to adhere to common standards a few good things happen:

    * Programmers can go into any code and figure out what's going on.
    * New people can get up to speed quickly.
    * People new to C++ are spared the need to develop a personal style and defend it to the death.
    * People new to C++ are spared making the same mistakes over and over again.
    * People make fewer mistakes in consistent environments.
    * Programmers have a common enemy :-) 

Bad Points
Now the bad:

    * The standard is usually stupid because it was made by someone who doesn't understand C++.
    * The standard is usually stupid because it's not what I do.
    * Standards reduce creativity.
    * Standards are unnecessary as long as people are consistent.
    * Standards enforce too much structure.
    * People ignore standards anyway.
    * Standards can be used as a reason for NIH (not invented here) because the new/borrowed code won't follow the standard. 

Discussion
The experience of many projects leads to the conclusion that using coding standards makes the project go smoother. Are standards necessary for success? Of course not. But they help, and we need all the help we can get! Be honest, most arguments against a particular standard come from the ego. Few decisions in a reasonable standard really can be said to be technically deficient, just matters of taste. So be flexible, control the ego a bit, and remember any project is fundamentally a team effort.

Standards Enforcement
First, any serious concerns about the standard should be brought up and worked out within the group. Maybe the standard is not quite appropriate for your situation. It may have overlooked important issues or maybe someone in power vehemently disagrees with certain issues :-)

In any case, once finalized hopefully people will play the adult and understand that this standard is reasonable, and has been found reasonable by many other programmers, and therefore is worthy of being followed even with personal reservations.

Failing willing cooperation it can be made a requirement that this standard must be followed to pass a code inspection.

Failing that the only solution is a massive tickling party on the offending party.

Accepting an Idea

   |1. It's impossible.
   |2. Maybe it's possible, but it's weak and uninteresting.
   |3. It is true and I told you so.
   |4. I thought of it first.
   |5. How could it be otherwise. 

If you come to objects with a negative preconception please keep an open mind. You may still conclude objects are bunk, but there's a road you must follow to accept something different. Allow yourself to travel it for a while.
6 Phases of a Project

   |1. Enthusiasm
   |2. Disillusionment
   |3. Panic
   |4. A Search for the Guilty
   |5. The Punishment of the Innocent
   |6. Praise and Honor for the Non-Participants 

Flow Chart for Project Decision Making

                       +---------+
                       |  START  | 
                       +---------+
                            |
                            V            
            YES       +------------+      NO
      +---------------|  DOES THE  |---------------+               
      |               | DAMN THING |               |
      V               |    WORK?   |               V    
+------------+        +------------+        +--------------+  NO
| DON'T FUCK |                              | DID YOU FUCK |-----+
| WITH IT    |                              |   WITH IT?   |     |
+------------+                              +--------------+     |
      |                                            |             |
      |                                            | YES         |
      |                                            V             |
      |  +------+     +-------------+       +---------------+    |
      |  | HIDE |  NO | DOES ANYONE |<------| YOU DUMBSHIT! |    |                 
      |  |  IT  |<----|    KNOW?    |       +---------------+    |
      |  +------+     +-------------+                            |
      |      |               |                                   |
      |      |               V                                   |
      |      |        +-------------+       +-------------+      |
      |      |        |   YOU POOR  |  YES  |  WILL YOU   |      |     
      |      |        |   BASTARD   |<------| CATCH HELL? |<-----+
      |      |        +-------------+       +-------------+
      |      |               |                     |
      |      |               |                     | NO
      |      |               V                     V
      |      V        +-------------+       +------------+ 
      +-------------->|    STOP     |<------| SHITCAN IT |
                      +-------------+       +------------+
      
                              

Leadership
I wish i had said this, but it was said by asd@asd.com in comp.software-eng.

Leaders:

   |1. lead by example
   |2. don't ask anything of anyone they wouldn't do themselves
   |3. are called on to make difficult and unpopular decisions
   |4. keep the team focused
   |5. reward/support their team in whatever they do
   |6. keep/clear unnecessary crap out of the way of the team 

Consensus is great. If it lasts for the project lifecycle, consider yourself blessed. I've been on a couple projects where two engineers just blantantly disagreed! They were always:

Programmer #1 says " x = 1"
Programmer #2 says " x != 1"

That's when a Project Leader is required. Unless you want to flip a coin.

Oh yah - one more thing. Project leaders: TAKE the blame when things go wrong and SHARE the credit when things go right.

Ain't easy - but it's the way I try to run my life.
```
