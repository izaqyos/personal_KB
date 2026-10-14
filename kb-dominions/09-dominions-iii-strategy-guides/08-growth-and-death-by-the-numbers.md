---
type: reference
title: Growth and Death by the Numbers
description: "Dominions III strategy guide for Growth and Death by the Numbers, compiled from forum posts: builds, tips and play advice."
tags: [dominions, strategy-game, gaming, guide, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "dominions-kb#8.8"
---

# 8.8 Growth and Death by the Numbers

[↑ Dominions III Strategy Guides](/kb-dominions/09-dominions-iii-strategy-guides/README.md)

```text
K, you know that the Growth Scale changes income by 2% for every tick, but what about that .2% population chance? Well, advanced spread sheet technology, I ran some equations and came up with concrete numbers.

Methodology: I basically ran two seperate serieses of equations. The first was simply to track the population chanced caused by the Growth/Death Scale. The equation was simple, (growth multiplier)^(# of Turns). Therefore, Growth 2 after 10 turns would be 1.004^10 which is approximately 1.04, or you'll have 4% more people then what you started with. And since there is a direct correlation between population and gold income, you nab an extra 4% of gold as well. The second check was a bit more complicated. For a given # of turns, I took the average population change over all turns so far, and then multiplied that averaged by the scale's money multiplier. On the spreadsheet, this looked like Average(B4:B10)*1.02. B4 through B10 represent spread sheet cells with the population adjustments for turns 1 through 6. The 1.02 multiplier represents the 2% extra money you'll recieve for Growth 1.

Caveats:

|1) Unless you spread your domain then your growth/death effects won't matter. So, though my chart says Growth 3 will give you a whopping extra 46% gold after 102 turns, more likely you'll recieve less then that as most of your territories won't have converted at the game's beginning.

|2) Dominions 3 has plenty of ways to kill population, and none of these are taken into account with my chart. For example, if you have a destructive domain (LE R'lyeh and Ermor), then these charts really don't apply to you.

|3) Dominions 3 rounds population to the 10's. In practice this means your capital will recive/loose 60 population per every tick of Growth/Death for the first several turns. My charts don't take this staggered growht into account.

|4) My numbers represent additional gold over the several turns. Not how much additional gold you recieve per turn at the end of X number of turns. Expect gold income to below my given percentage for most of the turns, and significantly higher by the later turns.

|5) I recently read a developer post claiming Neutral (growth and death at zero) provinces do experience small population growth. If that's the case, I never personally observed a neutral province gain population.

With out further ado:

Turns D 3 D 2 D 1 Neutral G 1 G 2 G 3
|6.. 92% 95% 97% 100% 103% 105% 108%
|12. 91% 94% 97% 100% 103% 107% 110%
|18. 89% 93% 96% 100% 104% 108% 112%
|24. 88% 92% 96% 100% 104% 109% 114%
|30. 86% 90% 95% 100% 105% 110% 116%
|36. 85% 89% 95% 100% 106% 112% 118%
|42. 83% 88% 94% 100% 106% 113% 121%
|48. 82% 87% 93% 100% 107% 115% 123%
|54. 80% 86% 93% 100% 108% 116% 125%
|60. 79% 85% 92% 100% 108% 118% 128%
|66. 78% 84% 92% 100% 109% 119% 130%
|72. 76% 83% 91% 100% 110% 120% 133%
|78. 75% 82% 91% 100% 110% 122% 135%
|84. 74% 82% 90% 100% 111% 124% 138%
|90. 73% 81% 90% 100% 112% 125% 140%
|96. 71% 80% 89% 100% 112% 127% 143%
|102 70% 79% 89% 100% 113% 128% 146%

If anyone has any comments or concerns (It's quite possible I made mistakes), feel free to let me know. I'm working on the charts in Open Office right now, but am not quite ready to release them. When I am, I'll post them as an attachment. 
```
