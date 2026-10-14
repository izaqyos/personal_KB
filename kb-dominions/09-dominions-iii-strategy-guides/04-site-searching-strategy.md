---
type: reference
title: Site Searching Strategy
description: Subsection 8.4 of Dominions III Strategy Guides.
tags: [kb-dominions]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "dominions-kb#8.4"
---

# 8.4 Site Searching Strategy

[↑ Dominions III Strategy Guides](/kb-dominions/09-dominions-iii-strategy-guides/README.md)

```text
Keep in mind that:
# Fire: waste, mountains
# Air: mountains, plains
# Water: swamp, other non-waste
# Earth: mountains
# Astral: any, slight emphasis on plains
# Death: any, slight emphasis on mountains
# Nature: forest, sea
# Blood: any

Also, its considered a good Strategy to use the site searching spells as opposed to manual search. 
Acashic records is considered too expensive in general.


Tip: I'm not sure, but I'd probably search with lvl 2 mages, until I got site searching spells going. There are very few lvl4 sites. A handful in total and there are several hundred sites. Some paths don't even have one IIRC. 

I don't think it is possible to do a meaningful odds breakdown.

There are more forest restricted sites of nature., more waste restricted sites of fire and death. Earth and to some extent air sites tend to be more common in mountains.

Wastelands are generally your friend. Mountains, forest and swamps a bit so, while farms have decreased chance of sites.

I would guess that about 75% of all sites are lvl 0-2, 24% 3 and 1% lvl4. But of the lvl3 sites many are rare and thus less likely to be in tha game. Perhaps 80%-90% are sites findable by a lvl 2 mage. On the other hand, it is as Omikron says, the rarest ones you really want to find

Some sites are unique and there can only be one on each map. Some of these are more common, meaning it is not unlikely that it exists on the map, while other uniques are very rare as well. Sites linked to terrains are more common in the sense that if there was forests all over the place they would be common, but since they are restricted they will not be that common. Since most maps have few swamps you could say that the swamp sites are rarer (many of them are water or nature).

There might be a list of sites somewhere in the modding threads. I don't think it presents rarity, but might display path requirements.

Tip:
Dom3 DB. Has a full list of sites, including level requirements, rarity and what terrain they appear in.

Out of the 709 sites, 149 are national start sites or sites that only appear by event, special script or in special scenarios, so they can be disregarded. That leaves 560 sites that can appear randomly.

All paths have at least one lv 4 site. Astral has 4, Holy, Fire and Death have 2, Nature has 3. All told there are 17 lv 4 sites out of 560 possible random sites and all lv 4 sites are rare. Meaning that if they get rolled on the first try, the site is rolled again and if you also get it on the second try, only then will it be placed in the province. In actual games I've found 10 of them all told and that's including all of my Dominions 2 games.

There are 66 lv 0 sites (meaning automatically visible), 16 rare (3 unique), 22 uncommon (8 unique) and 19 common (0 unique) and 16 of them are unique.

There are 252 lv 1 sites, 65 rare (9 unique), 119 uncommon (35 unique) and 68 common (1 unique).

There are 158 lv 2 sites, 70 rare (29 unique), 86 uncommon (25 unique) and 2 common (1 unique)

There are 68 lv 3 sites, 42 rare (30 unique), 18 uncommon (17 unique) and 7 common (no unqiues). The remaining one is a special site with special defenders and appears very rarely if it gets selected for in the determination of special provinces.

Another note about unique sites is that they can only appear once on the map, no matter their frequency, unless they are scripted in the map file, because map file scripting is run only after random site determination has been done.
```

### 8.4.1 Full site breakdown

```text
Okay, here's a breakdown of sites by path and level within each path. Startsites are excluded and so are The Desert Eye and Throne of the World because they only appear in that one scenario.

|574 sites, around 560 of which are truly randomly determined. There is no analysis of what sites appear in what terrain, that would require a separate crosschecking against the DB and is much more work than I care to do. Effective number means that special sites (frequency 5, appears from event or invalid locmask) are not included.

FIRE, 56 sites (54 effective)

    * Level 0: 5 sites, 1 common, 2 uncommon (1 unique), 1 rare, 1 special scriptable (Desert)
    * Level 1: 29 sites, 7 common, 12 uncommon (1 unique), 9 rare, 1 special (36 Oleg's Alchemical Device)
    * Level 2: 17 sites, 0 common, 12 uncommon (4 unique), 5 rare (2 unique)
    * Level 3: 3 sites, 1 common, 1 uncommon (1 unique), 1 rare (1 unique)
    * Level 4: 2 sites, rare, unique (180 Prison of the Desert Sun, waste; 533 The Sun Below, waste, cave)




AIR, 57 sites (56 effective)

    * Level 0: 4 sites, 1 common, 1 uncommon, 2 rare (2 unique)
    * Level 1: 31 sites, 7 common, 13 uncommon (4 unique), 11 rare
    * Level 2: 14 sites, 0 common, 11 uncommon (3 unique), 3 rare
    * Level 3: 7 sites, 1 common, 2 uncommon (2 unique), 3 rare (2 unique), 1 special (22 Bolivar's Tower of Reflections, no locmask)
    * Level 4: 1 site, rare, unique (213 Palace of Dreams, plains only)




WATER, 89 sites (87 effective)

    * Level 0: 11 sites, 4 common, 2 uncommon, 4 rare, 1 special scriptable (561 Tundra)
    * Level 1: 45 sites, 13 common, 25 uncommon (8 unique), 6 rare, 1 special (26 Starke's Ice Cave)
    * Level 2: 25 sites, 0 common, 9 uncommon (1 unique), 16 rare (6 unique)
    * Level 3: 7 sites, 1 common, 1 uncommon (1 unique), 5 rare (4 unique)
    * Level 4: 1 site, rare, unique (245 The Sea Underneath, any land)




EARTH, 111 sites (102 effective)

    * Level 0: 19 sites, 9 common, 4 uncommon (2 unique), 4 rare (3 unique), 4 special (28 Hoburg, 21 Mine of the Cyclops, no locmasks; 508 The Desert of Ptah, unique, waste; The World Pillar, unique, mountain), 4 event-based (68 Copper Mine, 69 Iron Mine, 67 Silver Mine, 66 Gold Mine)
    * Level 1: 36 sites, 16 common (1 unique), 9 uncommon (2 unique), 11 rare (1 unique)
    * Level 2: 29 sites, 1 common (1 unique), 15 uncommon (5 unique), 12 rare (4 unique), 1 special (37 The Deepest Cave of the Province, provided by event)
    * Level 3: 12 sites, 1 common, 2 uncommon (2 unique), 9 rare (4 unique)
    * Level 4: 1 site, rare, unique (The Factory, any land but cave)




ASTRAL, 58 sites (57 effective)

    * Level 0: 3 sites, 0 uncommon, 3 uncommon
    * Level 1: 24 sites, 4 common, 11 uncommon (1 unique), 8 rare (2 unique), 1 special (20 Surakid's Tower, no locmask)
    * Level 2: 16 sites, 0 common, 10 uncommon (3 unique), 6 rare (3 unique)
    * Level 3: 11 sites, 1 common, 1 uncommon (1 unique), 9 rare (8 unique)
    * Level 4: 4 sites, rare, unique (314 Library of Time, any land but cave; 535 The Endless Field of Cubes, waste; 530 The Mountain of the Past, waste; 494 Throne of Enlightenment, mountain)




DEATH, 73 sites (72 effective)

    * Level 0: 6 sites, 0 common, 4 uncommon (2 unique), 2 rare (2 unique)
    * Level 1: 33 sites, 8 common, 17 uncommon (6 unique), 6 rare (2 unique), 1 special (27 The Queen's Galley, no locmask)
    * Level 2: 20 sites, 0 common, 14 uncommon (4 unique), 6 rare (2 unique)
    * Level 3: 12 sites, 1 common, 3 uncommon (3 unique), 8 rare (6 unique)
    * Level 4: 2 sites, rare, unique (482 Crown of Darkness, mountain only; 346 The Shadow Furnace, any land)




NATURE, 86 sites (83 effective)

    * Level 0: 13 sites, 3 common, 5 uncommon (3 unique), 2 rare (1 unique), 2 special (542 Lyfjaberg, unique, mountain; 505 The Primal Forest, unique, forest), 1 special scriptable (560 Rain Forest)
    * Level 1: 37 sites, 11 common, 18 uncommon (8 unique), 8 rare (2 unique)
    * Level 2: 24 sites, 1 common, 12 uncommon (3 unique), 11 rare (5 unique)
    * Level 3: 9 sites, 1 common, 3 uncommon (3 unique), 5 rare (4 unique)
    * Level 4: 3 sites, rare, unique (387 Soul of the Wild, any land but cave; 532 The Previous Forest, waste; 493 The Vale of Unicorns, forest)




BLOOD, 39 sites (38 effective)

    * Level 0: 2 sites, 1 common (388 Arena), 1 uncommon (390 Academy of War)
    * Level 1: 20 sites, 1 common, 14 uncommon (5 unique), 5 rare (2 unique)
    * Level 2: 12 sites, 0 common, 1 uncommon (1 unique), 11 rare (7 unique) (one of the rare sites, 634 Bloodshade Glen, cannot be found because it has an invalid locmask)
    * Level 3: 4 sites, 0 common, 2 uncommon (2 unique), 2 rare (1 unique)
    * Level 4: 1 site, rare, unique (405 Hall of Flayed Skins, any land but cave)




HOLY, 11 sites (10 effective)

    * Level 0: 2 sites, 1 rare, 1 special (506 Holy Crypt of Anre, any land but cave, unique)
    * Level 1: 2 sites, 2 common (1 any land, one only in sea)
    * Level 2: 2 sites, 2 uncommon (1 unique)
    * Level 3: 3 sites, 3 uncommon (2 unique)
    * Level 4: 2 sites, rare (410 Temple of Time, any land, non-unique; 414 The Ward, any land but cave, unique)
```
