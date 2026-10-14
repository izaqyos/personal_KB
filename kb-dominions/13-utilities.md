---
type: reference
title: Utilities
description: Section 12 of the legacy dominions-kb notes.
tags: [kb-dominions]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "dominions-kb#12"
---

# Utilities

[↑ dominions-kb](/kb-dominions/README.md)

## 12.1 Battle Simulators

### 12.1.1 new Battle Simulator map

```text
Article Author: Gandalf Parker

http://forum.shrapnelgames.com/showthread.php?p=662197#post662197

I was testing something (castle ownership) and realized that I had not made the new version of my BattleSim public.
So from the MAPs link on www.Dom3Minions.com ....

This is a better version of my Battle Simulator map. BattleSim_v3.zip
Its a very tiny 10 province map providing the variety of terrains. Editing the ascii text file of BattleSim_v3.map makes it easy to set two nations next to each other with specific armies so that you can test tactics or how the game does things. And then you can either quickly easily start another game with the same settings to see if the results are the same, or edit the .map file to some small change to see if that makes a difference.

Here is a link to a quicky-reference list of map commands.
http://www.dom3minions.com/docs/map_qref.txt

There is a very complete file in the dominions3/doc directory on your machine
(thank-you Edi for the great work on that)

Question:
"
Can you please give a quick and dirty tutorial of how to use your map for say simulating MA ULM vs. Abysia and set like two huge armies one for each side?
Is it possible to control research levels for allowing mages to cast until certain level in certain schools?
Is it possible to assign items to mages?

TIA,
	WL
"

Answer:
"
Sure. I wont do like others and tell you its simple and read the manual.
Id rather show you that its simple.
Insert this into the BattleSim .map file:
(stuff after - is just comments and can be left out)

#specstart 31 4 - start Ulm in mountains
#specstart 37 10 - start Abysia in nearby mountains
#land 8 - wipe out the nearby swamp

#setland 4 - say where the next lines are for
#owner 31
#commander 114 - additional Commander of Ulm
#units 20 67 - 20 infantry of Ulm to him
#units 20 79 - 20 Pikeneers to him
#units 20 67 - 20 infantry of Ulm to him
#units 20 79 - 20 Pikeneers to him
#commander 113- Lord Guardian
#additem "Pendant of Luck"
#units 20 66 - 10 Guardians assigned to him


#setland 10 - say where the next lines are for
#owner 37
#commander 119 - additional Warlord
#units 20 81 - 20 infantry of type 81 to him
#units 20 82 - 20 infantry of type 82 to him
#units 20 81 - 20 infantry of type 81 to him
#units 20 82 - 20 infantry of type 82 to him
#commander 214 - Beast Trainer
#additem "Pendant of Luck"
#units 10 213 - 10 Salamanders assigned to him

	Now start a game with that map, join as Ulm and Abysia.
	Set the formations and scripts. Then have both armies meet in the nearby swamp
	(I cleared out the local defense so you can see just those two battle).

	Now start a new game with the same map, change formations, do it again.

	Or edit the .map for new items or new troops, start a game and do it again.

"
-> 
I got the nation numbers off this list...
http://www.dom3minions.com/docs/nations.txt

I got the unit IDs by starting a game. Examine a unit then hit Shift-I to see the ID numbers screen.

Or you can use Edi's great database. or Ballbarians online Dom3Reference

"


"
	12.2
```
