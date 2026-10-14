---
type: reference
title: "Maths problem: fatigue vs critical hits"
description: "Dominions III advanced forum discussion: Maths problem: fatigue vs critical hits."
tags: [dominions, strategy-game, gaming, tips, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "dominions-kb#10.5"
---

# 10.5 Maths problem: fatigue vs critical hits

[↑ Advanced dominions III discussions](/kb-dominions/11-advanced-dominions-iii-discussions/README.md)

```text
-> A DNR (Dominions random number) works like this:

Take a random number between 1 and 6. If the result is 6, take a random number between 0 and 5 and add it to the sum. If the result is a 5, repeat until the result isn't a 5.


What is the probability of getting a number of X or higher with 2 DRNs?

The manual lists comparisons, or chances of 2d6oe producing a value greater than 2d6 oe by a spesific amount. There comparisons are used for almost everything from attack to damage. There's only a single mechanic that I know of that uses 2d6oe value that ISN'T compared into another 2d6oe value, and that's the chance of a critical hit. Page 76 of the manual states the a critical hit happens if 2d6oe minus (fatigue/15) is less than 2.

For a single DRN, chance of results between 1-5 is 5/6. Chance of results larger than 5 is 1/6, result larger than 10 is 1/36, chance of result larger than 15 is 1/216 etc etc.

Any math students/professors/hobbyists want to try their hand at solving this?

-> X.......Chance that 2d6oe > X
|2.......0.972
|3.......0.917
|4.......0.833
|5.......0.722
|6.......0.583
|7.......0.463
|8.......0.361
|9.......0.278
|10......0.213
|11......0.167
|12......0.127
|13......0.095
|14......0.069
|15......0.051
|16......0.039
|17......0.030
|18......0.022 

Unit Fatigue...... %Critical Hits
|0 - 14 ................ 0.0%
|15 - 29 .............. 2.8%
|30 - 44 .............. 8.3%
|45 - 59 .............. 16.7%
|60 - 74 .............. 27.8%
|75 - 89 .............. 41.7%
|90 - 104 ............ 53.7%
|105 - 119 .......... 63.9%
|120 - 134 .......... 72.2%
|135 - 149 .......... 78.7%
|150 - 164 .......... 83.3%
|165 - 179 .......... 87.3%
|180 - 194 .......... 90.5%
|195 - 200 .......... 93.1%

->  I just tested this with a troll king with a robe of invulnerability vs 12 and 13 damage chaff (25 body prot, somewhat more on the head since the chassis has a helmet). Under 15 fatigue he gets damaged twice over 8 rounds of combat in melee. As soon as he crests 15 fatigue he starts taking about 2 damaging hits EVERY ROUND. The chances for a crit at 15-30 fatigue should be 1 in 36, since it requires a one on both dice (open ended rolling doesn't kick in til way later). He's only taking 21 swings per round. In addition, even if a crit lands it only has about a 50% chance of doing damage (half his prot value still is equal to the damage of the attacks).

The crit system as described in the rulebook does not mesh with reality. I've observed this phenomenon time and again while playing with SCs, but now I actually sat down and counted swings. 

[Response:
It's just random variation. Str 10 + spear 3 units can deal damage against a non-fatigue Colossal Fetisch with 32 body protection twice in the same turn, and then be unable to harm him for several turns while he has 30 fatigue (from Flaming Helmet). The amount of hits he takes varies a lot, but jumps in damage occur much more after the fatigue goes over 14, and then over 30 points. It's mostly 1 or 2 points of damage before critical hits, then they start dealing 4-7 points.

Because spearman can score hits even before the fetish is fatigued (no helmet, so it stays at 0 fatigue all the time), actual data and statistics would be necessary to figure out if there's something wrong with the formula. The thing that surprised me in my tests was that high protection protected you from most hits, but the hits that got through could deal 5 or 7 or 13 points of damage. I guess that's why size 2 units make so poor thugs - whatever you do with them, a single stroke of bad luck will finish them off.
]
```
