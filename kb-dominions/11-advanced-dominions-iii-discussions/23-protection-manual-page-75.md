---
type: reference
title: "Protection? Manual, page 75"
description: "Dominions III advanced forum discussion: Protection? Manual, page 75."
tags: [dominions, strategy-game, gaming, tips, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "dominions-kb#10.23"
---

# 10.23 Protection? Manual, page 75

[↑ Advanced dominions III discussions](/kb-dominions/11-advanced-dominions-iii-discussions/README.md)

```text
-> happygeek :
In the manual, page 75, you can read that from the damage roll an attacker rolls, the protection value "at hit location" is subtracted.
Yet nowhere is it mentioned where this is determined. I am confused.
I can see that I have body armor, and my helmet gives me head protection -- but how do you know if a strike comes to the head, body, feet, or somewhere else? Is this a random chance? Can you do called shots, like in Fallout? I would be grateful for some information regarding how this works. Thank you kindly!

-> Ich:
Head protection is counted as 20% towards final protection when that is being displayed on the unit infoscreen. Hit probability is the same, I'd think.

Originally there were more hit locations than head and body planned: arms, legs, and so on, and the armors in the game still have values for those parts, but in the end those values are only entered into a formula that determines the resulting body protection, they're not being targetted directly and protected individually, AFAIK.

-> Sombre:
It's why certain items add a disproportionate amount to the prot displayed on screen, like skull necklace etc.

What lch is saying is that from the fact the head armour counts 20% of its prot value to the overall prot (the one displayed as a simple number of the unit stat screen), he suspects the chance of hitting the head is also 20%.

Legs/arm etc hits were removed from the game, so those don't come up in determining hit location, but are still used when calculating overall prot (which may be a bug) and since items can add prot to all locations (even the ones that can't be hit, ie not head or body) they can add more to the overall prot than they should seem to.

-> SlipperyJim:
Sombre answered your question, but I want to stress one point. The head is still a valid hit location, so head armor (AKA a helmet) is quite worthwhile. For example, one of the weaknesses of Lanka's otherwise-outstanding Palankasha troops is the lack of helmets. Big, scary sacred demon-ogres that can be dropped by a lucky sling bullet (or whatever) to the head.

Practice "safe" Dom3: Wear a helmet! 

-> Kadelake:
If you give someone with 10 natural protection an armour with 18 protection the body protection will be less then 28. How is this calculated?
Does the protection shown on the main unit page have any function or is it always the head and body stats that are used?

-> Gregstrom:

Protection = natural + armor - (natural * armor/40)

-> vfb:
If a unit has two heads and just one helmet, the head protection is halved.

Don't know about two body slots. It would probably be the same, but I'm not sure if anything has two of those. Maybe some Foul Spawn?

-> JimMorrison:
So as in the example with 10 Base, you will gain 75% of Armor, and if your base was 20, you would gain 50%.
```
