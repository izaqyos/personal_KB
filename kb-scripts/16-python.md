---
type: reference
title: Python
description: Section 16 of the legacy kb-scripts notes.
tags: [kb-scripts]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-scripts#16"
---

# Python

[↑ kb-scripts](/kb-scripts/README.md)

## 16.1 search_text.py

```text
 Description: search for patterns in text files.
 Usage: 
        search_text.py [ <-C number > <-I> <-q> -Q "word1<&,|>words<&,|>...> ] files"
        -C, --context, Controls the context breadth, the number of lines before and after the line containing the pattern
        -I, --ignore-case, Set whether to ignore case when searching for pattern. Default is to match case.
        -q, --quiet, Set quiet mode, only matches would be printed
        -H, --highlight, Highlight the matched words with >>>word<<<
        -Q, --query, The pattern to search for, if made of list of words use & for and and | for or.

Example, find all functions that do something with a "new" instance of class "AcsSysLog":
find . -name "*.java" -exec search_text.py  -C 14 -I -q -Q "new&AcsSysLog" '{}' >> search_res \;

 Example:
 search_text.py -C 4 -I -q -Q "vi&register&list" *
 This will search for four line segments in all files in current directory.
 The search will be case insensitive and will match if the segment contains the words vi and register and list.
 Example output is:
 $ search_text.py -C 4 -I -q -Q "vi&register&list" *

===== FILE: FineVimTips          LINES:     300-303     =====
----------------------------------------
" List your Registers
:reg             : display contents of all registers
:reg a           : display content of individual registers

===== FILE: vi_manual.txt        LINES:    5412-5415    =====
        vim *.cpp               Start Vim, defining the argument list to
                                contain all the C++ files.  You are now in the
                                first file.
        qq                      Start recording into the q register

===== FILE: vi_tips              LINES:     316-319     =====
----------------------------------------
" List your Registers
:reg             : display contents of all registers
:reg a           : display content of individual registers
```

### 16.1.1 examples:

```text
		search in KB for specific subject:
		find . -name "*" -exec search_text.py -C 8 -I  -q -H -Q "record&play" '{}' \;

search for all XML files with both odbc and 11
$ find . -name '*.xml' | xargs search_text.py  -C 6 -I -
q -Q "odbc&11"

===== FILE: ./runtime/prebuilt/lnx26/include/sqlanywhere11/pom.xml LINES:      12-17      =====
  </parent>
  
  <modelVersion>4.0.0</modelVersion>

  <groupId><internal-package></groupId>
  <artifactId>libdbodbc11</artifactId>

===== FILE: ./mgmt/migration/src/assembly/migration.xml LINES:      68-73      =====
              <include>dbodbc9.dll</include>
            </includes>
        </fileSet>

        <fileSet>
            <directory>../../../../enm_jdk/jre1.5.0_11/NT</directory>

===== FILE: ./pom.xml            LINES:     691-696     =====
                <type>so</type>
                <version>2.0.0</version>
            </dependency>
            <dependency>
                <groupId><internal-package></groupId>
                <artifactId>libdbodbc11</artifactId>

===== FILE: ./pom.xml            LINES:     799-804     =====
            </dependency>

            <!-- runtime libs -->
            <dependency>
                <groupId><internal-package></groupId>
                <artifactId>libdbodbc11_r</artifactId>

===== FILE: ./pom.xml            LINES:    1392-1397    =====

            <dependency>
                <groupId>com.sybase</groupId>
                <artifactId>jodbc</artifactId>
                <scope>compile</scope>
                <version>11</version>

===== FILE: ./install/pom.xml    LINES:     412-417     =====
                                    <type>jar</type>
                                </artifactItem>
                                <artifactItem>
                                    <groupId>com.sybase</groupId>
                                    <artifactId>jodbc</artifactId>
                                    <version>11</version>
```

## 16.2 dom3_hof_mgr.py

```text
# Description: CLI for generating HoF statistics of dominions III MP games
# Usage: dom3_hof_mgr [debug level]
# Ex: /cygdrive/c/work/scripts/games/DOM3_HOF:]$ ./dom3_hof_mgr.py  debug > out
```

### 16.2.1 source code Mon Feb 28 17:41:48 JST 2011

```text
#!/usr/bin/python
# File: dom3_hof_mgr.py
# Author: Yosi Izaq
# Description: CLI for generating HoF statistics of dominions III MP games
# Usage: dom3_hof_mgr [debug level]
# Ex: /cygdrive/c/work/scripts/games/DOM3_HOF:]$ ./dom3_hof_mgr.py  debug > out

"""
GPL licensing

(C) Copyright, 2007 Yosi Izaq.

This file, dom3_hof_mgr.py, is part of dom3_hof_mgr programm.

dom3_hof_mgr is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

dom3_hof_mgr is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with dom3_hof_mgr.  If not, see <http://www.gnu.org/licenses/>.
"""

"""
|ToDo:
|	1. Strategic decisions. 
|	- work with a full blown DB or text file. -> text 
|	- use config manager
|	- 
|	2. decide which data containers R required
|Game won entry:
|Winner: Wraithlord (player entity)
|Game:Wrath of Opposing Fates (WOOF)
|Game Link: http://www.shrapnelcommunity.com/thr...t=8#Post531059
|Players: 12
|Nation: Caelum
|Mods: NA
|Era: Early
|
|Player entry:
|Name:
|Wons:
|Nations defeated:
|Nations won with:
|Eras won with:
|Victory Urls:
|
|Nation:
|name:
|era:
|wons:
|winning players: (list of players)
|
|Victory URL:
|url:
|nation:
|winning player:
|
|Era entry:
|era:
|list of winning nations entries
|# games
|
|
|	3. Configuration
|Nations list
|
|	4. won DB file
|	5. report gen logic
|	6. New text db and containers for team games
"""


import shutil, tarfile,ConfigParser, os, re, sys, glob, logging, copy

#Logging configuration:
FORMAT = "%(asctime)-15s %(name)s %(levelname)s %(message)s"

LEVELS = {'debug': logging.DEBUG,
          'info': logging.INFO,
          'warning': logging.WARNING,
          'error': logging.ERROR,
          'critical': logging.CRITICAL}

if len(sys.argv) > 1:
    level_name = sys.argv[1]
    level = LEVELS.get(level_name, logging.NOTSET)
    logging.basicConfig(level=level, format=FORMAT, filename='./dom3_hof_mgr.log', filemode='w')

dom3HOFLogger = logging.getLogger("dom3_hof_mgr")
#dom3HOFLogger.debug("Game name input: %s"%(self.game_name)) 
dom3HOFLogger.info("Initiating DOM3 HOF Manager") 

#class te:
#	m_t=''
#	def __init__(self, t='b'):
#		self.m_t=t
#
#	def __str__(self):
#		return self.m_t
#t = te('c')
#print t
 
# enum type classes
# enum class for Eras
class defs:
	single_db_file='dom3_MP_games_txt_db'
	game_open_entry_pat='^\s*\['
	game_close_entry_pat='^\s*\]'
	game_winner_entry_pat='^\s*winner:'
	game_winner_entry_line='('+game_winner_entry_pat+'\s*)(\w+.*$)'
	game_name_entry_pat='^\s*game:'
	game_name_entry_line='('+game_name_entry_pat+'\s*)(\w+.*$)'
	game_link_entry_pat='^\s*game\s*link:'
	game_link_entry_line='('+game_link_entry_pat+'\s*)(\w+.*$)'
	game_players_entry_pat='^\s*players:'
	game_players_entry_line='('+game_players_entry_pat+'\s*)(\w+)'
	game_winning_nation_entry_pat='^\s*nation:'
	game_winning_nation_entry_line='('+game_winning_nation_entry_pat+'\s*)(\w+.*$)'
	game_mods_entry_pat='^\s*mods:'
	game_mods_entry_line='('+game_mods_entry_pat+'\s*)(\w+.*$)'
	game_era_entry_pat='^\s*era:'
	game_era_entry_line='('+game_era_entry_pat+'\s*)(\w+.*$)'
	team_game_player_separator="&"
	tie_game_player_separator=","
	winning_players_display_list_size=15
	min_num_players_to_qualify_HoF=6

class era:
	m_ea='EA'
	m_ma='MA'
	m_la='LA'
	m_all='all'

#container classes
class game:
	"""
	game entry:
	Name:
	Winner:
	link:
	players:
	Winning nation:
	mods:
	era:
	"""

	m_name = "unknown"
	m_winner = "unknown"
	m_link = "unknown"
	#m_players = [] # ex: ['Wraithlord', 'Calmon'}
	m_players = 0
	m_winning_nation = "unknown"
	m_mods = []
	m_era = era.m_ea 

	def __init__(self, name="unknown" , winner="unknown" , link="unknown" , players=0, winning_nation="unknown", mods=[], era_p=era.m_ea):
	#	pass # so nothing statement
		self.m_name = name 
		self.m_winner = winner 
		self.m_link = link 
		self.m_players = players 
		self.m_winning_nation = winning_nation
		self.m_mods = mods 
		self.m_era = era_p 


	def __str__(self):
		return """
game Info:
Name: %s
Winner: %s
Winning Nation: %s
Era: %s
Link: %s
Players: %d
Mods: %s
"""%(self.m_name, self.m_winner, self.m_winning_nation, self.m_era, self.m_link, self.m_players, self.m_mods )

	def isValid(self):
		"""
		Verify that mandatory game fields are present
		"""
		
		if ( (self.m_name == "unknown") or (self.m_winner == "unknown") or (self.m_winning_nation == "unknown") ):
			dom3HOFLogger.debug("Game %s is not valid"%(self.m_name))	
			return False	
		else:
			return True

class player:
	"""
	Player entry:
	Name:
	Wons:
	Nations defeated:
	Nations won with:
	Eras won with:
	Victory Urls:
	"""

	m_name = "unknown"
	m_wons = 0
	m_nations_defeated = 0

	def __init__(self, name="unknown" , wons=0 , nations_defeated=0 , nations_won={} , eras_won_with={era.m_ea:0, era.m_ma:0, era.m_la:0} , V_URLs={}, if_tie_player_name="" ):
		#parameter for player name in case of tie defaults to empty string
		#dom3HOFLogger.debug("Player::__init__ player initial object %s"%(self))	
	#	pass # do nothing statement
		self.m_eras_won_with = {} #{era.m_ea:0, era.m_ma:0, era.m_la:0}
		self.m_nations_won = {} # ex: {'ma_pythium':2, 'LA_Ermor':1}
		self.m_V_URLs = {} #ex {'AsiaTwist':'http://...'}
		self.m_name = name 
# Handle ties (aaa, bbb)  and team games (aaa && bbb)
# ties should get 1/#winners points each and team games should not be counted as win
		if defs.team_game_player_separator in name:
			dom3HOFLogger.debug("Player::__init__, found a team game. doesn't count as victory - setting victory count to 0 ")	
			self.m_wons=0
		elif defs.tie_game_player_separator in name:
			num_winners = len(name.split( defs.tie_game_player_separator))
			self.m_name=if_tie_player_name
			dom3HOFLogger.debug("Player::__init__, found a tie between %s.victory point is distributed equally between %d players. Updated player %s record"%(name, num_winners, self.m_name)	)
			self.m_wons+=(wons*1.0)/num_winners
		else:
			dom3HOFLogger.debug("Player::__init__, found a single winner.")	
			self.m_wons=wons
		#self.m_wons = wons 

		self.m_nations_defeated = nations_defeated 
		self.m_nations_won = nations_won # ex: {'ma_pythium':2, 'LA_Ermor':1}
		for era,wins in eras_won_with.iteritems():
			#dom3HOFLogger.debug("Player::__init__ era %s, wins %d"%(era,wins))	
			#init all Eras to 0 wins
			#self.m_eras_won_with[era]=0
			#update according to input para
			#if era in self.m_eras_won_with:
			self.m_eras_won_with[era]=wins
		#self.m_eras_won_with = eras_won_with
		self.m_V_URLs = V_URLs #ex {'AsiaTwist':'http://...'}


	def __str__(self):
		#return "Player info:"+"\n"+"Name:"+ self.m_name
		return """
Player Info:
Name: %s
Number of Victories: %f
Number of Defeated Nations: %d
Nations won with: %s
Victories per era: %s
Victories URLs: %s
"""%(self.m_name, self.m_wons, self.m_nations_defeated, self.m_nations_won, self.m_eras_won_with, self.m_V_URLs )

#update object
	def update_with_game_result(self, game_res): # receive game result and update player instance
		dom3HOFLogger.debug("Player::update_with_game_result() called with game %s"%game_res)
		dom3HOFLogger.debug("Player::update_with_game_result player initial object %s"%(self))	

# Handle ties (aaa, bbb)  and team games (aaa && bbb)
# ties should get 1/#winners points each and team games should not be counted as win

		if defs.team_game_player_separator in game_res.m_winner:
			dom3HOFLogger.debug("Player::update_with_game_result, found a team game. doesn't count as victory ")	
		elif defs.tie_game_player_separator in game_res.m_winner:
			num_winners = len(game_res.m_winner.split( defs.tie_game_player_separator))
			self.m_wons+=1.0/num_winners
			dom3HOFLogger.debug("Player::update_with_game_result, found a tie between %s.victory point is distributed equally between %d players=%f."%(game_res.m_winner, num_winners, 1.0/num_winners)	)
		else:
			dom3HOFLogger.debug("Player::update_with_game_result, found a single winner.")	
			if game_res.m_players < defs.min_num_players_to_qualify_HoF:
				dom3HOFLogger.debug("Player::update_with_game_result, # of players %d is less than minimum %d to qualify for HoF."%(game_res.m_players, defs.min_num_players_to_qualify_HoF)	)
			else:
				self.m_wons+=1

		self.m_nations_defeated+=game_res.m_players

		#update winning nation
		if game_res.m_winning_nation in self.m_nations_won:
			dom3HOFLogger.debug("Player::update_with_game_result() player has already won with nation %s. Updating"%game_res.m_winning_nation )
			self.m_nations_won[game_res.m_winning_nation] +=1
		else:
			dom3HOFLogger.debug("Player::update_with_game_result() player has won with nation %s. Updating"%game_res.m_winning_nation )
			self.m_nations_won[game_res.m_winning_nation] =1

		#update victories per era

		dom3HOFLogger.debug("Player::update_with_game_result() Era dictionary %s"%self.m_eras_won_with)
		if (game_res.m_era in self.m_eras_won_with):
			self.m_eras_won_with[game_res.m_era]+=1
		else:
			self.m_eras_won_with[game_res.m_era]=1

		#update victory URL
		self.m_V_URLs[game_res.m_name]=game_res.m_link

		dom3HOFLogger.debug("Player::update_with_game_result() updated player object %s"%self)

#Comparison operators
	def __eq__(self, other):
		if (isinstance(other, player)): # verify we're not comparing apples and oranges :) 
			return (self.m_name == other.m_name )
		else:
			return NotImplemented
class nation:
	"""
	name:
	era:
	wons:
	winning players: (list of players)
	"""

	m_name= "unknown"
	m_era= era.m_ea
	m_wons= 0

	
	def __init__(self, name="unknown" , era=era.m_ea , wons=0 , winners={}, if_tie_nation_name="" ):
	#	pass # so nothing statement
		m_winning_players= {} #ex {'Wraithlord':2,'Micha':1}
		self.m_name = name 
		self.m_era = era 

# Handle ties (aaa, bbb)  and team games (aaa && bbb)
# ties should get 1/#winners points each and team games should not be counted as win
		if defs.team_game_player_separator in name:
			dom3HOFLogger.debug("Nation::__init__, found a team game. doesn't count as victory - setting victory count to 0 ")	
			self.m_wons=0
		elif defs.tie_game_player_separator in name:
			num_winners = len(name.split( defs.tie_game_player_separator))
			self.m_name=if_tie_nation_name
			dom3HOFLogger.debug("Nation::__init__, found a tie between %s.victory point is distributed equally between %d nations. Updated nation %s record"%(name, num_winners, self.m_name)	)
			self.m_wons+=(wons*1.0)/num_winners
		else:
			dom3HOFLogger.debug("Nation::__init__, found a single winning nation.")	
			self.m_wons=wons
		#self.m_wons = wons 

		self.m_winning_players = winners 


	def __str__(self):
		return """
Nation Info:
Name: %s
Era: %s
Number of Victories: %f
Winning Players: %s
"""%(self.m_name, self.m_era, self.m_wons, self.m_winning_players)

#update object
	def update_with_game_result(self, game_res): # receive game result and update nation instance
		dom3HOFLogger.debug("nation::update_with_game_result() called with game %s"%game_res)
		#dom3HOFLogger.debug("nation::update_with_game_result nation initial object %s"%(self))	

# Handle ties (aaa, bbb)  and team games (aaa && bbb)
# ties should get 1/#winners points each and team games should not be counted as win

		if defs.team_game_player_separator in game_res.m_winning_nation:
			dom3HOFLogger.debug("Nation::update_with_game_result, found a team game. doesn't count as victory ")	
		elif defs.tie_game_player_separator in game_res.m_winning_nation:
			num_winners = len(game_res.m_winning_nation.split( defs.tie_game_player_separator))
			self.m_wons+=1.0/num_winners
			dom3HOFLogger.debug("Nation::update_with_game_result, found a tie between %s.victory point is distributed equally between %d nations=%f."%(game_res.m_winner, num_winners, 1.0/num_winners)	)
		else:
			dom3HOFLogger.debug("Nation::update_with_game_result, found a single winning nation.")	

			# for HoF nation victory count must meet minimum players criterie
			if game_res.m_players < defs.min_num_players_to_qualify_HoF:
				dom3HOFLogger.debug("Nation::update_with_game_result, # of players %d is less than minimum %d to qualify for HoF."%(game_res.m_players, defs.min_num_players_to_qualify_HoF)	)
			else:
				self.m_wons+=1

#			# for HoF nation victory count must meet minimum players criterie
#		if game_res.m_players < defs.min_num_players_to_qualify_HoF:

		#update winning players
		if game_res.m_winner in self.m_winning_players:
			dom3HOFLogger.debug("nation::update_with_game_result() player %s has already won with this nation. Updating"%game_res.m_winner )
			self.m_winning_players[game_res.m_winner] +=1
		else:
			dom3HOFLogger.debug("nation::update_with_game_result() player %s has won with this nation. Updating"%game_res.m_winner )
			self.m_winning_players[game_res.m_winner] =1

#Comparison operators
	def __eq__(self, other):
		if (isinstance(other, nation)): # verify we're not comparing apples and oranges :) 
			return (self.m_name == other.m_name )
		else:
			return NotImplemented

class era_wins:
	"""
	name:
	games:
	winning nations: {'MA_Pythium':5}
	"""

	m_era= era.m_ea
	m_games= 0
	m_winning_nations= {} #ex {'MA_Pythium':2,'MA_Pangaea':1}

	
	def __init__(self, era=era.m_ea , games=0 , winners={}):
	#	pass # so nothing statement
		self.m_era = era 
		self.m_games = games 
		self.m_winning_nations = winners 


	def __str__(self):
		return """
Era Info:
Era: %s
Number of Games: %d
Winning Nations: %s
"""%(self.m_era, self.m_games, self.m_winning_nations)

#comarison ops 
def player_comp(p1,p2):
	#dom3HOFLogger.debug("my_comps::player_comp() comparing player %s to player %s"%(p1,p2))
	if (isinstance(p1, player) and isinstance(p2, player) ):
		#compare:
		if p1.m_wons == p2.m_wons:
			return cmp(p1.m_nations_defeated, p2.m_nations_defeated)
		return cmp(p1.m_wons , p2.m_wons)
	else:
		dom3HOFLogger.warn("my_comps::player_comp() at least one of the objects in not a player"%(p1,p2))


def nation_comp(p1,p2):
	#dom3HOFLogger.debug("my_comps::nation_comp() comparing nation %s to nation %s"%(p1,p2))
	if (isinstance(p1, nation) and isinstance(p2, nation) ):
		#compare:
#		if p1.m_wons == p2.m_wons:
#			return cmp(p1.m_nations_defeated, p2.m_nations_defeated)
		return cmp(p1.m_wons , p2.m_wons)
	else:
		dom3HOFLogger.warn("my_comps::nation_comp() at least one of the objects in not a nation"%(p1,p2))


	
class GameDataCollector:
	"""
	responsible 4 gathering data from single (as opposed to team) dom III MP games
	"""

	"""
	states: init- start loading DB, still haven't seen a single game entry
		game- loading game entry
		fin- finished processing the db
	"""
	m_states=['init', 'game', 'fin'] 
	ms_init,ms_game,ms_fin = range(3)
	m_state=m_states[ms_init]
	m_games=[] # list of games

	m_ea_wins = era_wins(era.m_ea,0,{}) 
	m_ma_wins = era_wins(era.m_ma,0,{}) 
	m_la_wins = era_wins(era.m_la,0,{}) 

#Load container instances with data from DB
	def parseDB(self):
		dom3HOFLogger.info("Loading DB %s"%defs.single_db_file)
		db_file=open(defs.single_db_file).readlines()
		self.m_state=self.m_states[self.ms_init] #init
		temp_game=()
		line_counter=0

		for line in db_file:
			line_counter+=1
			dom3HOFLogger.debug("Processing line %d:%s"%(line_counter,line))
############################ INIT State ######################
			if self.m_state == self.m_states[self.ms_init]: #in init state 
				if re.match(defs.game_open_entry_pat, line ):
					self.m_state=self.m_states[self.ms_game] # found [ so init -> game
					dom3HOFLogger.info("Found game report entry. Switch to state %s "%(self.m_state))
					#cleanup game object
					temp_game = game()
############################ INIT State ######################

##Passing from init to finit state directly is illegal (as result of empty game entry)
#			if self.m_state == self.m_states[self.ms_init]: #in init state 
#				if re.match(defs.game_close_entry_pat, line ):
#					dom3HOFLogger.warn("Found empty game paragraph at line %s"%(line_counter))
############################ GAME State ######################
			if self.m_state == self.m_states[self.ms_game]: #in game state 
				#match winner
				if re.match(defs.game_winner_entry_pat, line, re.I ):
					match=re.match(defs.game_winner_entry_line,line,re.I)
					temp_game.m_winner=match.group(2)
					temp_game.m_winner=temp_game.m_winner.strip().lower()

					dom3HOFLogger.debug("Found game winner %s "%(temp_game.m_winner))
				#match name
				if re.match(defs.game_name_entry_pat, line, re.I ):
					match=re.match(defs.game_name_entry_line,line,re.I)
					temp_game.m_name=match.group(2)
					temp_game.m_name=temp_game.m_name.strip()
					dom3HOFLogger.debug("Found game name %s "%(temp_game.m_name))
				#match players
				if re.match(defs.game_players_entry_pat, line, re.I ):
					match=re.match(defs.game_players_entry_line,line,re.I)
					temp_game.m_players=int(match.group(2))
					#temp_game.m_players=temp_game.m_players.strip()
					dom3HOFLogger.debug("Found game players %s "%(temp_game.m_players))
				#match winning_nation
				if re.match(defs.game_winning_nation_entry_pat, line, re.I ):
					match=re.match(defs.game_winning_nation_entry_line,line,re.I)
					temp_game.m_winning_nation=match.group(2)
					temp_game.m_winning_nation=temp_game.m_winning_nation.strip()
					dom3HOFLogger.debug("Found game winning nation %s "%(temp_game.m_winning_nation))
				#match mods
				if re.match(defs.game_mods_entry_pat, line, re.I ):
					match=re.match(defs.game_mods_entry_line,line,re.I)
					temp_game.m_mods=match.group(2)
					temp_game.m_mods=temp_game.m_mods.strip()
					dom3HOFLogger.debug("Found game mods %s "%(temp_game.m_mods))
				#match era
				if re.match(defs.game_era_entry_pat, line, re.I ):
					match=re.match(defs.game_era_entry_line,line,re.I)
					temp_game.m_era=match.group(2)
					temp_game.m_era=temp_game.m_era.strip()
					dom3HOFLogger.debug("Found game era %s "%(temp_game.m_era))
				#match link
				if re.match(defs.game_link_entry_pat, line, re.I ):
					match=re.match(defs.game_link_entry_line,line,re.I)
					temp_game.m_link=match.group(2)
					temp_game.m_link=temp_game.m_link.strip()
					dom3HOFLogger.debug("Found game link %s "%(temp_game.m_link))

				#End game entry
				if re.match(defs.game_close_entry_pat, line ):
					dom3HOFLogger.debug("Gathered game data: %s. Proceeding to verification "%temp_game)
					if temp_game.isValid():
						self.m_games.append(temp_game)
					else:
						dom3HOFLogger.warn("Game %s verification failed at line %d"%(temp_game.m_name, line_counter))
					self.m_state=self.m_states[self.ms_init] # found ] so init -> game
					dom3HOFLogger.info("Found game report entry end. Switch to state %s "%(self.m_state))

############################ GAME State ######################

############################ FINIT State #####################
		self.m_state=self.m_states[self.ms_fin]
		dom3HOFLogger.info("Finished processing DB. State %s"%(self.m_state))
############################ FINIT State #####################
				
		dom3HOFLogger.debug("Game list: %s"%(self.m_games))
		return self.m_games

class GameDataReporter:
	"""
This class generates HoF reports from a list of game win reports
	"""
#	m_players={} # dictionary of 'player name':player 
#	m_nations={} # dictionary of 'nation name':nation 
	m_players=[] #player data
	#m_players_names = [] # list of names of players in m_players list
	m_nations=[] #nation data
	#m_nations_names = [] # list of names of nations in m_nations list
	m_eras= [ era_wins(era.m_ea), era_wins(era.m_ma), era_wins(era.m_la)] 
	m_games=[]

	def generateSingleGameReport(self, games): #generate report from a list of game objects
		dom3HOFLogger.info("Generating single game report. Game Data: %s"%games)
		#self.m_games=copy.copy(games)
		self.m_games=games
		#Todo, process game by game. Fill lists of players, nations and era wins
		# Then proceed to sort the lists

		#Temp objects for player and nation
############################ Start game date loop ######################
		for game in games:
			#temp_nation = nation()
			#temp_player = player()
			temp_players = [] # list is required for ties
			temp_nations = [] # list is required for ties
			dom3HOFLogger.debug("Collecting data of game: %s "%game)
			#temp_nation = nation(game.m_winning_nation, game.m_era, 1, {game.m_winner:1})

			#update list of players who won this game (usually - 1 but could be more in case of tie or team)
			if defs.tie_game_player_separator in game.m_winner: #tie
				for p in (game.m_winner.split(defs.tie_game_player_separator)):
					temp_players.append(player(game.m_winner, 1, game.m_players, {game.m_winning_nation:1}, {game.m_era:1}, {game.m_name:game.m_link}, p.strip()))
					dom3HOFLogger.debug("Found one of tie winners: %s "%p.strip())
			else:
				#temp_player = player(game.m_winner, 1, game.m_players, {game.m_winning_nation:1}, {game.m_era:1}, {game.m_name:game.m_link} )
				temp_player =  player(game.m_winner, 1, game.m_players, {game.m_winning_nation:1}, {game.m_era:1}, {game.m_name:game.m_link} ,"") 
				temp_players.append (temp_player)

			#update list of nations who won this game (usually - 1 but could be more in case of tie or team)
			if defs.tie_game_player_separator in game.m_winning_nation: #tie
				for p in (game.m_winning_nation.split(defs.tie_game_player_separator)):
					temp_nations.append(nation(game.m_winning_nation, game.m_era, 1, {game.m_winner:1}, p.strip()))
					dom3HOFLogger.debug("Found one of tie winners: %s "%p.strip())
			else:
				temp_nations.append(nation(game.m_winning_nation, game.m_era, 1, {game.m_winner:1}))

			dom3HOFLogger.debug("Collecting data. Nation: %s \nPlayer(s): %s "%(temp_nations, temp_players))
						
			#update nation & player names lists (which are used to conveniently test for membership in the data lists
#			if temp_nation.m_name in self.m_nations_names:
#				dom3HOFLogger.debug("Nation %s is already in nations list"%(temp_nation.m_name ))
#				#ToDo find nation in list and update it
#				# Todo overide _eq_ and use the in list operator to find nation/player in list
#			else:
#				dom3HOFLogger.debug("Nation %s is added to nations list"%(temp_nation.m_name ))
#				self.m_nations_names.append(temp_nation.m_name) 

			#update players
			for p in temp_players:
				if p in self.m_players:
					dom3HOFLogger.debug("Player %s is already in players list"%(p.m_name ))
					player_index = self.m_players.index(p)
					self.m_players[player_index].update_with_game_result(game)
					#ToDo, if tie (player name contains defs.tie_game_player_separator == ',') then update each of the tied player's records
				else:
					dom3HOFLogger.debug("Player %s is added to players list"%(p.m_name ))
					self.m_players.append(p) 

# in case of ties update each of the tied nations with the information. who won (the tied players), and another win/num_winners to victory count.
			#update nations
			for p in temp_nations:
				if p in self.m_nations:
					dom3HOFLogger.debug("nation %s is already in nations list"%(p.m_name ))
					nation_index = self.m_nations.index(p)
					self.m_nations[nation_index].update_with_game_result(game)
				else:
					dom3HOFLogger.debug("nation %s is added to nations list"%(p.m_name ))
					self.m_nations.append(p) 

		# end of: for game in games:

		#debug print players
		dom3HOFLogger.debug("Printing current players list")
		self.m_players.sort(player_comp, reverse=True)
		for i,p in enumerate(self.m_players):
			dom3HOFLogger.debug("Player %d in list: %s"%(i+1,p))


		#debug print nations
		dom3HOFLogger.debug("Printing current nations list")
		self.m_nations.sort(nation_comp, reverse=True)
		for i,p in enumerate(self.m_nations):
			dom3HOFLogger.debug("Nation %d in list: %s"%(i+1,p))

		#debug prints nation wins, filter according to the eras
		ea_nations = filter(lambda x: x.m_era == era.m_ea,  self.m_nations)
		ma_nations = filter(lambda x: x.m_era == era.m_ma,  self.m_nations)
		la_nations = filter(lambda x: x.m_era == era.m_la,  self.m_nations)
		for i,p in enumerate(ea_nations):
			dom3HOFLogger.debug("EA Nation %d in list: %s"%(i+1,p))
		for i,p in enumerate(ma_nations):
			dom3HOFLogger.debug("MA Nation %d in list: %s"%(i+1,p))
		for i,p in enumerate(la_nations):
			dom3HOFLogger.debug("LA Nation %d in list: %s"%(i+1,p))
		# ToDo debug prints team wins, filter players according to player name containing defs.team_game_player_separator ('&') 
		winning_teams = filter(lambda x: defs.team_game_player_separator in x.m_name, self.m_players)
		for i,p in enumerate(winning_teams):
			dom3HOFLogger.debug("Team %d in list: %s"%(i+1,p))


			#ToDo: think how to deal with ties, i.e: winner:aaa,bbb
			# and team game, i.e. AAA & BBB
############################ End   game date loop ######################
############################ End   class GameDataReporter ######################

class GameDataFormatter:
	"""
	Handle all the aspects of presenting the information
	"""

	def printHoF_Shrapnel_forums( self, gdr):
		"""
		Prints the information in a manner compatible with Shrapnel forums HoF thread
		Expects to receive a GameDataReporter that contains players and nations information
		"""
		dom3HOFLogger.debug("GameDataFormatter:printHoF_Shrapnel_forums: begin results print")
		s_prefix="""
Victorious Nations

All Age Mega Game
Winners: Zeldor - Game:Kingmaker - Players: 63 - Nation: LA Argatha - Mods: custom
		"""
		print "%s"%s_prefix

		#filter lists of nations per era, remove team games
		ea_nations = filter(lambda x: (x.m_era == era.m_ea) and (not (defs.team_game_player_separator in x.m_name)),  gdr.m_nations)
		ma_nations = filter(lambda x: (x.m_era == era.m_ma) and (not (defs.team_game_player_separator in x.m_name)),  gdr.m_nations)
		la_nations = filter(lambda x: (x.m_era == era.m_la) and (not (defs.team_game_player_separator in x.m_name)),  gdr.m_nations)
		all_age_nations = filter(lambda x: (x.m_era == era.m_all) and (not (defs.team_game_player_separator in x.m_name)),  gdr.m_nations)

		ea_wins=0
		for n in ea_nations:
			ea_wins += n.m_wons
		print "Early(%f)\n"%ea_wins
		for p in ea_nations:
			print("%-16s: %-6.2f "%(p.m_name,p.m_wons))
		#print "Early(%d)"%reduce(lambda x,y: x.m_wons+y.m_wons, ea_nations)
		#print "Early(%d)"%reduce(lambda x,y: x+y, ea_nations)

		ma_wins=0
		for n in ma_nations:
			ma_wins += n.m_wons
		print "\nMid(%f)\n"%ma_wins
		for p in ma_nations:
			print("%-16s: %-6.2f "%(p.m_name,p.m_wons))

		la_wins=0
		for n in la_nations:
			la_wins += n.m_wons
		print "\nLate(%f)\n"%la_wins
		for p in la_nations:
			print("%-16s: %-6.2f "%(p.m_name,p.m_wons))

## reserve for printing all age winning nations
#		all_age_wins=0
#		for n in all_age_nations:
#			all_age_wins += n.m_wons
#		print "\nAll age(%f)\n"%all_age_wins
#		for p in all_age_nations:
#			print("%-16s: %-6.2f "%(p.m_name,p.m_wons))

		print"\nThe Hall of Honor\n"

		#filter lists of games per era, remove team games
		print "Early\n"
		dom3HOFLogger.debug("GameDataFormatter:printHoF_Shrapnel_forums: games %s"%gdr.m_games)
		ea_games = filter(lambda x: (x.m_era == era.m_ea) and (not (defs.team_game_player_separator in x.m_winner)),  gdr.m_games)
		for g in ea_games:
			print("Winner(s): %-16s -game: %-20s - Players: %-3d - Nations(s): %-16s"%(g.m_winner, g.m_name, g.m_players, g.m_winning_nation))

		print "\nMid\n"
		ma_games = filter(lambda x: (x.m_era == era.m_ma) and (not (defs.team_game_player_separator in x.m_winner)),  gdr.m_games)
		for g in ma_games:
			print("Winner(s): %-16s -game: %-20s - Players: %-3d - Nations(s): %-16s"%(g.m_winner, g.m_name, g.m_players, g.m_winning_nation))

		print "\nLate\n"
		la_games = filter(lambda x: (x.m_era == era.m_la) and (not (defs.team_game_player_separator in x.m_winner)),  gdr.m_games)
		for g in la_games:
			print("Winner(s): %-16s -game: %-20s - Players: %-3d - Nations(s): %-16s"%(g.m_winner, g.m_name, g.m_players, g.m_winning_nation))

		print "\nAll age\n"
		all_age_games = filter(lambda x: (x.m_era == era.m_all) and (not (defs.team_game_player_separator in x.m_winner)),  gdr.m_games)
		for g in all_age_games:
			print("Winner(s): %-16s -game: %-20s - Players: %-3d - Nations(s): %-16s"%(g.m_winner, g.m_name, g.m_players, g.m_winning_nation))

		print "\nTeam games\n"
		team_games = filter(lambda x: defs.team_game_player_separator in x.m_winner, gdr.m_games)
		for g in team_games:
			print("Winners: %-16s -game: %-20s - Players: %-3d - Nations(s): %-16s"%(g.m_winner, g.m_name, g.m_players, g.m_winning_nation))

		print "\nHall of Fame\n"
		#print the top 15 (defs.winning_players_display_list_size) winning players excluding team winners
		for i,p in enumerate(filter(lambda x: not (defs.team_game_player_separator in x.m_name), gdr.m_players)[:defs.winning_players_display_list_size]):
			print("%-2d- %-16s %.2f/%2d"%(i+1,p.m_name, p.m_wons, p.m_nations_defeated)) 

		for i,p in enumerate(filter(lambda x: not (defs.team_game_player_separator in x.m_name), gdr.m_players)):
			dom3HOFLogger.debug("%-2d- %-16s %.2f/%2d"%(i+1,p.m_name, p.m_wons, p.m_nations_defeated)) 

############################ End   class GameDataFormatter ######################

def test_enums_n_defs():
	dir(defs)
	dir(era)

def test_game():
	g = game();
	g_wl = game('the Quick and the Dead', 'Calmon', 'link',11,'LA Ermor',['mod_a','mod_b'], era.m_la)
	dom3HOFLogger.info("test_game: %s"%g)  
	dom3HOFLogger.info("test_game: %s"%g_wl)  

def test_player():
	p = player();
	p_wl = player('WraithLord', 6, 78, {'MA_Pythium':2,'MA_Ulm':1,'EA_Caelum':1,'LA_Patala':1,'MA_Jotunheim':1},{'EA':1,'MA':4, 'LA':1},{'Frechdachs Gangbang':'unknown','Wrath of Opposing Fates (WOOF)':'http://www.shrapnelcommunity.com/threads/showflat.php?Cat=&amp;Number=483972&amp;page=0&amp;view=collapsed&amp;sb=5&amp;o=7&amp;fpart=8#Post531059','Dagur':' (http://www.shrapnelcommunity.com/threads/showflat.php?Cat=&amp;Number=543333) ','Hydrant':'unknown','Victoria':'unknown','Asia Twist':'unknown'} )
	dom3HOFLogger.info("test_player: %s"%p)  
	dom3HOFLogger.info("test_player: %s"%p_wl)  
	dom3HOFLogger.info("test_player: %s"%p)  

def test_nation():
	n=nation()
	n_pyth=nation('MA_Pythium', era.m_ma, 20, {'Wraithlord':2,'Micha':1})
	dom3HOFLogger.info("test_nation: %s"%n)  
	dom3HOFLogger.info("test_nation: %s"%n_pyth)  

def test_era_wins():
	e=era_wins()
	e_la=era_wins(era.m_la, 20, {'LA_Pythium':2,'Patala':1})
	dom3HOFLogger.info("test_era: %s"%e)  
	dom3HOFLogger.info("test_era: %s"%e_la)  

def test_single_game_parse():
	gdc = GameDataCollector()
	games = gdc.parseDB()
	for g in games:
		dom3HOFLogger.info("test game parser. game: %s"%g)  
	gdr = GameDataReporter()
	gdr.generateSingleGameReport(games)
	gdf = GameDataFormatter()
	gdf.printHoF_Shrapnel_forums(gdr)

def test():
	test_enums_n_defs()
	test_game()
	test_player()
	test_nation()
	test_era_wins()
	test_single_game_parse()

test()

		16.2.2
```

## 16.3 reportDMClashes.py

```text
# Description: script for reporting conflicts in DOM-III mod files
# Usage: reportDMClashes <list of .dm files>
"""
It works like this
a. go to mods dir
b. run: python [path/to/file]reportDMClashes.py  on list of .dm files to check, ex:
[/cygdrive/c/games/dominions3/mods/mod_not_in_use:]$ python /cygdrive/c/work/scripts/games/reportDMClashes.py  *.dm  
  
Warns go to stdout and logs go to reportDMClashes.log (set to log when >= INFO).

Snippet of very long list of conflicts when running check on a bunch of old mods:

Warning: found conflict! ID 2755 appears 3 times.
At Dominions 3000 v0.75.dm:4829, as type: monster, name Ice Samurai Battle Suit
At Githzerai.dm:426, as type: monster, name Psion
At Shangri La.dm:862, as type: monster, name Dmag Dpon
Warning: found conflict! ID 2525 appears 2 times.
At AI Ogre Kingdoms.dm:1351, as type: monster, name Slavegiant
At Dominions 3000 v0.75.dm:8532, as type: monster, name Primordia Regina
Warning: found conflict! ID 2748 appears 2 times.
At Githzerai.dm:287, as type: monster, name Soryo
At Shangri La.dm:601, as type: monster, name Rta Pa
Warning: found conflict! ID 2749 appears 2 times.
At Githzerai.dm:304, as type: monster, name Zerain
At Shangri La.dm:640, as type: monster, name Guardian of the Hidden Valley
Warning: found conflict! ID 2750 appears 3 times.
At Dominions 3000 v0.75.dm:4729, as type: monster, name Aka-Oni
At Githzerai.dm:323, as type: monster, name Inzen
At Shangri La.dm:679, as type: monster, name Mi G<F6>
Warning: found conflict! ID 2751 appears 3 times.
At Dominions 3000 v0.75.dm:4773, as type: monster, name Ao-Oni
At Githzerai.dm:341, as type: monster, name Ninja
At Shangri La.dm:711, as type: monster, name Mi G<F6> Rngon Pa
Warning: found conflict! ID 705 appears 2 times.
At Dominions 3000 v0.75.dm:617, as type: weapon, name Lightning Cannon
At Githzerai.dm:58, as type: weapon, name Fists of the Grandmaster
Warning: found conflict! ID 2754 appears 2 times.
At Dominions 3000 v0.75.dm:4801, as type: monster, name Fire Samurai Battle Suit
At Githzerai.dm:410, as type: monster, name Majishan
Warning: found conflict! ID 707 appears 4 times.
At Dominions 3000 v0.75.dm:651, as type: weapon, name Needler
At Githzerai.dm:76, as type: weapon, name Stunning Fist
At WH191andCBM16.dm:1234, as type: weapon, name Orna
At WH19andCBM16.dm:1227, as type: weapon, name Orna
Warning: found conflict! ID 2756 appears 3 times.
At Dominions 3000 v0.75.dm:4856, as type: monster, name Lightning Samurai Battle Suit
At Githzerai.dm:444, as type: monster, name Guru
At Shangri La.dm:897, as type: monster, name Rta Dmag Go
Warning: found conflict! ID 2205 appears 2 times.
At MC_NI_ Indy_Pack.dm:605, as type: monster, name item
At Nephilim.dm:249, as type: monster, name Feral
Warning: found conflict! ID 2757 appears 3 times.
At Dominions 3000 v0.75.dm:4884, as type: monster, name Gokenin
At Githzerai.dm:462, as type: monster, name Senin
At Shangri La.dm:936, as type: monster, name Rje
Warning: found conflict! ID 2758 appears 3 times.
At Dominions 3000 v0.75.dm:4914, as type: monster, name Wraith Suit Shinobi
At Githzerai.dm:481, as type: monster, name Dai-Zerain
At Shangri La.dm:976, as type: monster, name Drapa
Warning: found conflict! ID 2759 appears 3 times.
At Dominions 3000 v0.75.dm:4946, as type: monster, name Hatamoto
At Githzerai.dm:513, as type: monster, name Ghost Gith Commoner
At Shangri La.dm:1018, as type: monster, name Ngagspa
Warning: found conflict! ID 2760 appears 3 times.
At Dominions 3000 v0.75.dm:4976, as type: monster, name Daimyo
At Githzerai.dm:536, as type: monster, name Seirei
At Shangri La.dm:1057, as type: monster, name Demon Hunter
Warning: found conflict! ID 2761 appears 3 times.
At Dominions 3000 v0.75.dm:5006, as type: monster, name Dai-Oni
At Githzerai.dm:552, as type: monster, name Tamashi
At Shangri La.dm:1096, as type: monster, name Ragyapa
...

"""
```

### 16.3.1 Source code Mon Feb 28 17:40:59 JST 2011

```text
#!/usr/bin/python
# File: reportDMClashes.py
# Author: Yosi Izaq, aka WraithLord
# Description: script for reporting conflicts in DOM-III mod files
# Usage: reportDMClashes <list of .dm files>
"""
It works like this
a. go to mods dir
b. run: python [path/to/file]reportDMClashes.py  on list of .dm files to check, ex:
[/cygdrive/c/games/dominions3/mods/mod_not_in_use:]$ python /cygdrive/c/work/scripts/games/reportDMClashes.py  *.dm  
  
Warns go to stdout and logs go to reportDMClashes.log (set to log when >= INFO).

Snippet of very long list of conflicts when running check on a bunch of old mods:

Warning: found conflict! ID 2755 appears 3 times.
At Dominions 3000 v0.75.dm:4829, as type: monster, name Ice Samurai Battle Suit
At Githzerai.dm:426, as type: monster, name Psion
At Shangri La.dm:862, as type: monster, name Dmag Dpon
Warning: found conflict! ID 2525 appears 2 times.
At AI Ogre Kingdoms.dm:1351, as type: monster, name Slavegiant
At Dominions 3000 v0.75.dm:8532, as type: monster, name Primordia Regina
Warning: found conflict! ID 2748 appears 2 times.
At Githzerai.dm:287, as type: monster, name Soryo
At Shangri La.dm:601, as type: monster, name Rta Pa
Warning: found conflict! ID 2749 appears 2 times.
At Githzerai.dm:304, as type: monster, name Zerain
At Shangri La.dm:640, as type: monster, name Guardian of the Hidden Valley
Warning: found conflict! ID 2750 appears 3 times.
At Dominions 3000 v0.75.dm:4729, as type: monster, name Aka-Oni
At Githzerai.dm:323, as type: monster, name Inzen
At Shangri La.dm:679, as type: monster, name Mi G<F6>
Warning: found conflict! ID 2751 appears 3 times.
At Dominions 3000 v0.75.dm:4773, as type: monster, name Ao-Oni
At Githzerai.dm:341, as type: monster, name Ninja
At Shangri La.dm:711, as type: monster, name Mi G<F6> Rngon Pa
Warning: found conflict! ID 705 appears 2 times.
At Dominions 3000 v0.75.dm:617, as type: weapon, name Lightning Cannon
At Githzerai.dm:58, as type: weapon, name Fists of the Grandmaster
Warning: found conflict! ID 2754 appears 2 times.
At Dominions 3000 v0.75.dm:4801, as type: monster, name Fire Samurai Battle Suit
At Githzerai.dm:410, as type: monster, name Majishan
Warning: found conflict! ID 707 appears 4 times.
At Dominions 3000 v0.75.dm:651, as type: weapon, name Needler
At Githzerai.dm:76, as type: weapon, name Stunning Fist
At WH191andCBM16.dm:1234, as type: weapon, name Orna
At WH19andCBM16.dm:1227, as type: weapon, name Orna
Warning: found conflict! ID 2756 appears 3 times.
At Dominions 3000 v0.75.dm:4856, as type: monster, name Lightning Samurai Battle Suit
At Githzerai.dm:444, as type: monster, name Guru
At Shangri La.dm:897, as type: monster, name Rta Dmag Go
Warning: found conflict! ID 2205 appears 2 times.
At MC_NI_ Indy_Pack.dm:605, as type: monster, name item
At Nephilim.dm:249, as type: monster, name Feral
Warning: found conflict! ID 2757 appears 3 times.
At Dominions 3000 v0.75.dm:4884, as type: monster, name Gokenin
At Githzerai.dm:462, as type: monster, name Senin
At Shangri La.dm:936, as type: monster, name Rje
Warning: found conflict! ID 2758 appears 3 times.
At Dominions 3000 v0.75.dm:4914, as type: monster, name Wraith Suit Shinobi
At Githzerai.dm:481, as type: monster, name Dai-Zerain
At Shangri La.dm:976, as type: monster, name Drapa
Warning: found conflict! ID 2759 appears 3 times.
At Dominions 3000 v0.75.dm:4946, as type: monster, name Hatamoto
At Githzerai.dm:513, as type: monster, name Ghost Gith Commoner
At Shangri La.dm:1018, as type: monster, name Ngagspa
Warning: found conflict! ID 2760 appears 3 times.
At Dominions 3000 v0.75.dm:4976, as type: monster, name Daimyo
At Githzerai.dm:536, as type: monster, name Seirei
At Shangri La.dm:1057, as type: monster, name Demon Hunter
Warning: found conflict! ID 2761 appears 3 times.
At Dominions 3000 v0.75.dm:5006, as type: monster, name Dai-Oni
At Githzerai.dm:552, as type: monster, name Tamashi
At Shangri La.dm:1096, as type: monster, name Ragyapa
...

"""

"""
GPL licensing

(C) Copyright, 2011 Yosi Izaq.

This file, reportDMClashes.py, is part of reportDMClashes programm.

reportDMClashes is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

reportDMClashes is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with reportDMClashes.  If not, see <http://www.gnu.org/licenses/>.
"""

"""
Top lvl design
|1. Syntax of .dm
Example -

#newarmor 340
#name "Armor of Bugginess"
#def -1
#type 5
#enc 1
#prot 13
#rcost 11
#end

#newarmor 340
#name "Armor of Suckiness"
#def -3
#type 5
#enc 5
#prot 2
#rcost 15
#end

|2. container class for item (contains it's ID and name + file name and line #)
 
a. process argv

b. treat each item as file name and load each item into a [id, item(id, name, file, line)] dictionary

 -- regexp defs for parsing a mod entry

c. data structure that will facilitate the end result. Meaning:

Mod_Items {} (dictionary), keys --------------- Item IDs ------------
						:
			item list [], item1, item2, ...
				item, class: ID, type, name, file, line, attrs		
Conflicts are by definition Mod_Item Keys that have values with more than one item

"""

import shutil, tarfile,ConfigParser, os, re, sys, glob, logging, copy, pickle

#Logging configuration:
FORMAT = "%(asctime)-15s %(name)s %(levelname)s %(message)s"

LEVELS = {'debug': logging.DEBUG,
          'info': logging.INFO,
          'warning': logging.WARNING,
          'error': logging.ERROR,
          'critical': logging.CRITICAL}


#if len(sys.argv) > 1:
#level_name = sys.argv[1]
#level_name = 'debug'
level_name = 'info'
level = LEVELS.get(level_name, logging.NOTSET)
logging.basicConfig(level=level, format=FORMAT, filename='./reportDMClashes.log', filemode='w')

dom3DM_ClashReporterLogger = logging.getLogger("reportDMClashes")
dom3DM_ClashReporterLogger.info("Initiating  reportDMClashes") 


class defs:
	item_open_entry_pat='^#new'
	item_type_line=item_open_entry_pat+'(\w+)\s*(\d+)'
	item_close_entry_pat='^#end'
	item_attribute_prefix='^#'
	item_attribute_value_line=item_attribute_prefix+'(\w+)\s+("?\.?\/?\w+.*)"?$'
	item_attribute_line=item_attribute_prefix+'(\w+)'
	name_line=item_attribute_prefix+'name'+'\s*"(.*)"'

class item:
	"""
		id - identifier
		name - name
		type - type (armor/weapon/unit ... )
		file - mode file
		line - line #
		attrs - additional attributs {attr_name:value,...}
		Ex:
	#newweapon 864
	#name "Warrior Shuriken"
	#dmg 10
	#att 2
	#def 0
	#len 0
	#range 12
	#ammo 2
	#nratt 2
	#nostr
	#sound 19
	#flyspr 111 1
	#rcost 3
	#armorpiercing
	#end

	"""

	m_id = 0
	m_name = ""
	m_type = ""
	m_file = ""
	m_line = 0
	m_attrs = {}

	def __init__(self, id=0 , name="item", type="none", file = "file.dm", line = 0, attrs={}):
		self.m_id = id;
		self.m_name = name;
		self.m_type = type;
		self.m_file = file;
		self.m_line = line;
		self.m_attrs = attrs;

	def __str__(self):
		return """
Mod entry Info:
ID: %d
Name: %s
Type: %s
File: %s
Line: %d
Attrs: %s
"""%(self.m_id, self.m_name, self.m_type, self.m_file, self.m_line, self.m_attrs)

class DomIII_DM_Clash_Reporter:
	"""
	Main worker class
	"""

	m_mod_items_list = {} # a dictionary of {item ID : [item1, item2_id] }

	def parseMod(self, mod_file_name):
		"""
		Parse the mod & return items dictionary
		"""
		dom3DM_ClashReporterLogger.info("Parsing mod file %s"%mod_file_name) 
		mod_file = open(mod_file_name).readlines()


		"""
		states: init- start loading mod file, still haven't seen a single entry
			entry -  loading mod entry
			fin- finished processing the mod file
		"""
		states=['init', 'entry', 'fin'] 
		init,entry,fin = range(3)
		state=states[init]
		entries={} # mod entry/item dictionary
		temp_item=()
		line_counter=0

		for line in mod_file:
			line_counter+=1
			dom3DM_ClashReporterLogger.debug("Processing line %d:%s"%(line_counter,line))
############################ INIT State ######################
			if state == states[init]: #in init state 
				if re.match(defs.item_open_entry_pat, line ):
					state=states[entry] # found [ so parsing a mod entry
					dom3DM_ClashReporterLogger.debug("Found a mod entry. Switching to state %s "%(state))
					#cleanup item object
					temp_item = item()
					match = re.match(defs.item_type_line, line) #Note that #newspell entries don't have IDs and will be set to "fake" ID 0
					if match: #When dealing with a mod entry that has ID
						temp_item.m_type = match.group(1)
						temp_item.m_id = int(match.group(2))
					else: #When dealing with a mod entry that don't have ID - like spell
						temp_item.m_type = "spell"
						temp_item.m_id = 0

					temp_item.m_file = mod_file_name
					temp_item.m_line = line_counter
					dom3DM_ClashReporterLogger.info("Entry. Type: %s, ID: %d, %s:%d "%(temp_item.m_type, temp_item.m_id, temp_item.m_file, temp_item.m_line  ))
############################ INIT State ######################
############################ ENTRY State #####################
			if state == states[entry]: #in entry state 
				
				#match name & attrs
				if re.match(defs.name_line, line):
					match=re.match(defs.name_line, line)
					temp_item.m_name=match.group(1)

					dom3DM_ClashReporterLogger.debug("Found item name %s "%(temp_item.m_name))

				#attr value line
				elif re.match(defs.item_attribute_value_line, line):
					if re.match(defs.item_open_entry_pat, line ):
						dom3DM_ClashReporterLogger.debug("Skipping entry opening line since it was already parsed")
					else: #Real attr 
						match = re.match(defs.item_attribute_value_line, line)
						temp_item.m_attrs[match.group(1)] = match.group(2).strip()

						dom3DM_ClashReporterLogger.debug("Found item attr:value pair %s:%s "%(match.group(1), temp_item.m_attrs[match.group(1)] ))

				#End entry
				elif re.match(defs.item_close_entry_pat, line ):
					dom3DM_ClashReporterLogger.debug("Finished Gathering item data: %s."%temp_item)
	#match attrs and put in dictonary m_mod_items_list , if key exists add to list
					#add item to items dictionary. 
					if self.m_mod_items_list.has_key(temp_item.m_id):
						dom3DM_ClashReporterLogger.debug("Item %s ID already exists in items dictionary, adding to list."%temp_item.m_name)
						self.m_mod_items_list[temp_item.m_id].append(temp_item)
					else: #New item with this ID
						dom3DM_ClashReporterLogger.debug("Item %s added to items dictionary"%temp_item.m_name)
						self.m_mod_items_list[temp_item.m_id]= [temp_item]



					state=states[init] 
					dom3DM_ClashReporterLogger.debug("Found modentry end. Switch to state %s "%(state))
				#attr line
				elif re.match(defs.item_attribute_line, line):
					match = re.match(defs.item_attribute_line, line)
					temp_item.m_attrs[match.group(1)] = ""

					dom3DM_ClashReporterLogger.debug("Found item attr %s "%(match.group(1)) )
#				else:
#
#					dom3DM_ClashReporterLogger.debug("Found blank or comment line  %s"%(line)
############################ ENTRY State #####################


############################ FINIT State #####################
		state=states[fin]
		dom3DM_ClashReporterLogger.info("Finished processing mod file %s. State %s"%(mod_file_name, state))
############################ FINIT State #####################
				
				#raw print item dictionary

		#dom3DM_ClashReporterLogger.debug("Printing full items dictionary: %s"%(pickle.dumps(self.m_mod_items_list)))
		dom3DM_ClashReporterLogger.debug("Printing full items dictionary:")
		for itr_item_key in self.m_mod_items_list.keys() :
			for itr_item in self.m_mod_items_list[itr_item_key] :
				dom3DM_ClashReporterLogger.debug("%s\n"%itr_item)
			
		#dom3DM_ClashReporterLogger.debug("Game list: %s"%(self.m_games))
############################ END OF mod lines parse loop  ####
		dom3DM_ClashReporterLogger.info("Complete mod file parsing")




	def parseMods(self):
		dom3DM_ClashReporterLogger.info("parsing the mod files into working memory. Files %s"%sys.argv)

		for file in sys.argv[1:]:
			self.parseMod(file)

		dom3DM_ClashReporterLogger.info("Complete mod files parsing")


	def reportConflicts(self):
		dom3DM_ClashReporterLogger.info("Reporting ID conflicts in the sepecified mod files")
		self.parseMods()
		#filter all non 0 ID items (i.e non spells) that appear in more than one mod file
		conflict_list = filter (lambda x: (len(self.m_mod_items_list[x]) > 1) and (self.m_mod_items_list[x][0].m_id !=0) , self.m_mod_items_list.keys() )
		for conf in conflict_list:
			#raw print
			#print "Warning found conflict %s"%self.m_mod_items_list[conf]

			#beutify print, item ID, + list of File:line, type name 
			dom3DM_ClashReporterLogger.info("Warning: found conflict! ID %d appears %d times."%(self.m_mod_items_list[conf][0].m_id, len(self.m_mod_items_list[conf])))
			print "Warning: found conflict! ID %d appears %d times."%(self.m_mod_items_list[conf][0].m_id, len(self.m_mod_items_list[conf]))
			for itr in self.m_mod_items_list[conf] :
				dom3DM_ClashReporterLogger.info("At %s:%d, as type: %s, name %s"%(itr.m_file, itr.m_line, itr.m_type, itr.m_name) )
				print "At %s:%d, as type: %s, name %s"%(itr.m_file, itr.m_line, itr.m_type, itr.m_name) 

		dom3DM_ClashReporterLogger.info("Completed reporting conflicts")



if __name__ == '__main__':
	DMCR = DomIII_DM_Clash_Reporter();
	DMCR.reportConflicts()

		16.3.2
```

## 16.4 FTP helper

### 16.4.1 Upload binary file automatically

```text
cat /cygdrive/x/work/scripts/python/my_py_ftp
#!/usr/bin/python

#Author yosi izaq
#usage $ ~/work/scripts/python/my_py_ftp cd-acs-ftp upload/<user> acs.tar.gz
import sys, getopt
from ftplib import FTP

def main():
    try:
        opts, args = getopt.getopt(sys.argv[1:], "h:v", ["help"])
    except getopt.GetoptError, err:
        # print help information and exit:
        print str(err) # will print something like "option -a not recognized"
        usage()
        sys.exit(2)
    output = None
    verbose = False
    for o, a in opts:
        if o == "-v":
            verbose = True
        elif o in ("-h", "--help"):
            usage()
            sys.exit()
        else:
            assert False, "unhandled option"

    print "arguemtns are: ", args
    if len(args) == 3: #FTP, DIR to CWD, FILE to upload
        ftp=FTP(args[0])
        ftp.login()
        ftp.cwd(args[1])
        ftp.storbinary
        
        f=open(args[2],'r')
        print "uploading file %s"%args[2], " to %s"%args[0], " in dir %s"%args[1] 
        ftp.storbinary('STOR '+args[2], f)
        f.close()
        ftp.quit()
    # ...

if __name__ == "__main__":
    main()
		16.4.2


	16.5
```
