---
type: reference
title: My personal Best tricks and tips learned from MP games
description: "Personal best tricks and tips learned from Dominions multiplayer games, e.g. sneaky snipers."
tags: [dominions, strategy-game, gaming, tips, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "dominions-kb#1"
---

# My personal Best tricks and tips learned from MP games

[↑ dominions-kb](/kb-dominions/README.md)

## 1.1 Sneaky snipers

```text
Article Author: Wraithlord

	One commander with a bow artifact (either bow of war, lightning Xbow etc) can take a small to large PD depending on its aim and possible buffs
```

## 1.2 Wrathers

```text
Article Author: Wraithlord

	Example:
	Two Fomorian kings:
		-> Wrather, Tempest, boots of the messenger, 4 Air gems. 
		Script: Blessing, Wrathfull skies, retreat. 
		The retreat is important since it prevents the wrather from dieing, hence canceling the wrathfull skies

		-> Thug/SC, position a bit to the from
```

## 1.3 Rain of stones

```text
Article Author: Wraithlord

	Evoc. lvl 7. E3+A1
	This spell handles enemy armies composed mainly of low hp, low prot units and commanders (for example, most human armies on EA).
	The caster needs high prot, maybe ethereal, and high hp.
	Can be cast multiple times for extra carnage
	A squad of RoS casters that happen to have A2 can cloud trapeze and execute opposing armies unsuspected.

	Some additional recipes:
-> Take one high HP caster with either S or A picks (for teleporting on unsuspecting army). Give it the armor of virtue and script it to (optional summon earth power) RoSX4. The good thing about this is that the caster will automatically teleport back home in case he is injured so you don't need to worry about how he's gonna survive after casting such fatiguing spells.

-> If opposing army has flyers add a storm caster or a mage with staff of storms to the killing squad

-> Note that mages that have helmets and/or good protection and/or etherealness will be almost immune to this spell.
```

## 1.4 Black servant sneakers

```text
Article Author: Wraithlord

	When your nation don't have natural sneaking units and has access to death. It can be a good idea to summon a few black servants and equip them either as thugs are as reanimators (with wraith crown or skelli talisman). Then sneak them in groups of twos and threes and use them for raiding enemy lightly defened provinces. The investment is small and the gains can be substantial.

	I've presonally found this tactic better than say concentrate only on Bane lords thugs for raiding.
```

## 1.5 Get upkeep free undead commanders

```text
Article Author: Wraithlord
```

### 1.5.1 details

```text
A cheap trick to get undead soulless mages. Either use life after death or a commander with the Ankh (which gives dead friendly units a chance to rise as undead).
Script them to attack in a controlled manner, meaning for example bunch all the mages you want turned undead in a group with some units/commanders that have cold/poison area effect (Bog beasts, breath of winter etc). The mages will die due to effect, rise as soulless (free of upkeep).

As for attack targets, those could be indie provinces, your provinces that were attacked by barbarians and their ilk or lightly defended enemy provinces.
```

### 1.5.2 Ankh

```text
Unique item, 40D Miscellaneous slot. Its a priceless items, every live unit that dies in battle will ressurct as an undead. Works for commanders as well.

Works well with chaff summon spells like swarm etc (since the little insects will convert to undead when killed).

I love the ankh. Being an autocast on a 4? gem spell makes it a battle changer.

And it is: swarm (or similar) + ankh or other spell makes for a very handy, portable, potentially stealthy army. Toss in a coupe of wraith crowns on some druids and you're good to go
Reply With Quote
```

## 1.6 Beware the visiting heroes

```text
Article Author: Wraithlord

Sometimes you get an unlucky event and are being attacked by this group of heroes.
I've experiences several times in latest patch (3.17) that one of those heroes seems to auto generate ghost wolves.
This means that the battlefield is spammed with wolves. I've lost several good sized armies to this. Be carefull!
```

## 1.7 Horror Harmonica and/or Carcator the pocket lich

```text
Article Author: Wraithlord

So Horror harmonica allows its wielder to summon horrors and also reduces moral (auto cast wailing winds).
Carcator will work independently from its wielder and cast death spells. The AI will usually set him on summoning undeads.

The horror harmonica can be given to an > S2 commander so that he can teleport on top of a small army or SC. Cast 4 rounds of summon horror and then returning. He should be accompanied by a 2nd > S2 commander scripted to horror mark so that horrors will pick enemy units.
To that you can add Carcator so that he'll summon lots of undeads and between horrors, undead and four rounds of wailing winds the enemy army should die or route.
To complete trick use Ghost Riders or other means to capture sorrounding enemy provinces so that routing army will completly die.

Carcator can be used separately for skirmishes. Give it to commander that will attack an enemy province and then retreat. Carcator will continue the figth and if weak PD or enemy army he will probably win.
```

## 1.8 Sieges

```text
Article Author: Wraithlord
```

### 1.8.1 Defending

```text
Usually what works for defending a stormed castle is:
->  Summon lots of stuff, elementals, swarm, ants etc
-> Prevent flight: storm 
-> Put bulk of force in middle right to block entrace 
-> Put two flanking squads to left and right and backup squad behind front right squad. Backup squad should be tougher than front.
-> Buffing SCs put in the middle to back since in front they could be offed by spells such as paralyze, soul slay, drain life etc before they buff
-> Some berezerking ability is good (in case of route)
-> Defensive buffs such as fog warriors and army of gold, will of the fates etc are important
-> Note that hiding or assassinating units in castle will not defend!
```

### 1.8.2 Seiging

#### 1.8.2.1 Siege mechanics in manual wrong?

```text
Well, the formulas in the manual are almost correct. Sieging works by building the sums over the following:

    For every sieging unit: (str^2 / 10) + (10 if flying) + 10*(siege skill)
    For every non-mindless defending unit: (str^2 / 10) + (10 if flying) + 10*(guard skill)
    For every mindless defending unit: 1 + 10*(guard skill)

Remainders in the divisions are being rounded down. Those two values, the siege and the "desiege" strength, are then again in a final step being divided by 10, rounded down, which results in the formulas that are in the manual, except for mindless units.

Regarding the Black and Great Hawks:

A Black Hawk has strength 5, thus every Black Hawk should contribute (5²/10)+10 = 12 to the siege counter, before division by 10.
A Great Hawk has strength 11, thus every Great Hawk should contribute (11²/10)+10 = 22 to the siege counter, before division by 10.

What happens in reality is that every Black Hawk only adds 2 to the siege counter, while the Great Hawk adds 22 to the siege counter, so 20 Black Hawks and a Great Hawk add up to 20*2+22 = 62, thus resulting in the siege strength of 6.

Why is that? I wasted a good amount of time debugging this, while I should just have looked in my unit data files... The code works exactly like given above. Black Hawks have a siege strength of -1. Thus effectively their flying attribute is discarded regarding fort sieges. In defense, they don't suffer any penalty, though. The only other unit that suffers from the same penalty is the Shikigami (2092).

			1.8.2.2
		1.8.3
```

## 1.9 Scouting, Intelligence

```text
	Article Author: Wraithlord

Gathering intelligence is crucial. Use all means for that end. Recruit scouts, stealthy units. Cast the intelligence spells if needs (astral window etc). 
```

### 1.9.1 Stone sphere.

```text
	Don't underestimate this 5E5S Miscellaneous item. Equip it on cheap commanders (not necessarily casters) to get the best intelligence on enemy provinces.
```

## 1.10 Endgame phase

```text
Article Author: Wraithlord
```

### 1.10.1 Astral Corruption

```text
What is it?

This is a global enchantment of the blood path. It has the effect that every mage that either casts or forges non-blood ritual or item has a chance to be visited by a horror. 
This is some info dating back to dom-II:
* Astral Corruption : every mage has between 33 and 50% chance of having some kind of Horror. For multi-path rituals and items, each non-Blood path is checked independently and could lead to a separate attack. The attack occurs after the forged item is dropped in the inventory, so if it is a disposable mage, you may not care... but if it is a ritual, it may not stay up for very long. The number of gems used -including gems for boosting a ritual- appears to affect both the probability of attack and the size of the horror that appears.

My experience with it:
-> Cast it when you have a good blood economy and your oponents don't (duh), but that may not always be as beneficial as you might think.
Its usually good as a nasty surprise to those mages that put up some game winning globabls like arcance nexus, forge of the ancients, utterdark etc. if you're lucky one of them will be visited by a nasty horror and die thus removing the global.

-> If you're on the other side of the coin then relax. Its not that bad. 
First, low cost casting/forging have very small chance of getting an horror so you can practically cast these with impunity.
2nd, for the big casts/forges use mages that have S2 (or S1 and booster). Give them some S gems and script them to returning.
Even if they are attacked by a horror they will teleport back home.
Note, mages that are currently at home will also teleport home (meaning its safe to do this also for mages in capital)

-> Return the favor. 
If you have S2 mages, script them to horror mark. Esp. when they encounter enemy SCs. 
Horror marked units under astral corruption are as good as dead. There's a wide array of extremely powerful horrors (the doom horrors) that no normal SC can survive. Now, since all horrors have horror mark attacks an SC that was horror marked will get increased chance to be visited by increasingly stronger horrors -- until he dies that is.
If its the enemy pretender then he is dead. Even immortal ones will be made useless by this.
```

## 1.11 Master lich

```text
Give him strong astral for great benefit.
-> Magic dueller will deter or kill most invading astral mages or SCs. 
Note that even SCs scrited to returinng will not cast it!
Note that gem using battlefield wide spells will fire against the lich so great way to make enemy waste gems when invading your lands
```

## 1.12 Golems

```text
-> Good thugs but mediocre SCs. Don't rely too much on them.
```

## 1.13 Staple spells

### 1.13.1 Combat

#### 1.13.1.1 Shatter

```text
Non resistable, high damage to undead and constructs
```

#### 1.13.1.2 Life for a life

```text
Non resistable, high damage to non construct units (all living, undead such as tartarians)

			1.13.1.3
```

### 1.13.2 Rituals

## 1.14 Nations, personal tips

### 1.14.1 MA Machaka

```text
-> Baalz guide is  not optimal, esp. under CBM.
Either go for bless for hunter sspiders or awake SC.
Make sure to take good scalles.
Always attack
```

### 1.14.2 Bogaruss

```text
Good pretender awake wyrm dom-10 good scalees.
Go to Evocation but don't run to high end and neither const/conj.
Instead focus  on blood!
```

### 1.14.3 MA R'lyeh

```text
Under CBM no need for A on pretender (since Amulet  of the fish is W1).

Alt. is key - to make mind  lords SCs. 
Start with lobo guards and gradually change to trolll slaves (with luck & quickness)
```

## 1.15 LA R'lyeg insanity

```text
I thouroghly tested this. results:
- Illithid lords can go a little insane over time
- Starspawn mage + priest seem to be immune
- void critters, Vastnesses, Otherness, Visitor in commander form are immune
- Aboleth heroes are not immune
- high MR summons like niads etc would get mildly insane over many turn (like 10-20 madness over 20-30 turns)

	1.16
```
