---
type: reference
title: "BASH profile & aliases"
description: Section 21 of the legacy kb-scripts notes.
tags: [kb-scripts]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-scripts#21"
---

# BASH profile & aliases

[↑ kb-scripts](/kb-scripts/README.md)

## 21.1 Cisco development environment .bashrc Mon Jan 25 18:26:36 JST 2010

```text
[employer-specific content moved to private KB, 2026-10]
	21.3 laptop environment .bashrc Mon Jan 25 18:27:08 JST 2010

# base-files version 3.9-3

# To pick up the latest recommended .bashrc content,
# look in /etc/defaults/etc/skel/.bashrc

# Modifying /etc/skel/.bashrc directly will prevent
# setup from updating it.

# The copy in your home directory (~/.bashrc) is yours, please
# feel free to customise it to create a shell
# environment to your liking.  If you feel a change
# would be benificial to all, please feel free to send
# a patch to the cygwin mailing list.

# User dependent .bashrc file

# Environment Variables
# #####################

# TMP and TEMP are defined in the Windows environment.  Leaving
# them set to the default Windows temporary directory can have
# unexpected consequences.
unset TMP
unset TEMP

# Alternatively, set them to the Cygwin temporary directory
# or to any other tmp directory of your choice
# export TMP=/tmp
# export TEMP=/tmp

# Or use TMPDIR instead
# export TMPDIR=/tmp

# Shell Options
# #############

# See man bash for more options...

# Don't wait for job termination notification
 set -o notify

# Don't use ^D to exit
# set -o ignoreeof

# Use case-insensitive filename globbing
# shopt -s nocaseglob

# Make bash append rather than overwrite the history on disk
 shopt -s histappend

# When changing directory small typos can be ignored by bash
# for example, cd /vr/lgo/apaache would find /var/log/apache
 shopt -s cdspell


# Completion options
# ##################

# These completion tuning parameters change the default behavior of bash_completion:

# Define to access remotely checked-out files over passwordless ssh for CVS
# COMP_CVS_REMOTE=1

# Define to avoid stripping description in --option=description of './configure --help'
# COMP_CONFIGURE_HINTS=1

# Define to avoid flattening internal contents of tar files
# COMP_TAR_INTERNAL_PATHS=1

# If this shell is interactive, turn on programmable completion enhancements.
# Any completions you add in ~/.bash_completion are sourced last.
# case $- in
#   *i*) [[ -f /etc/bash_completion ]] && . /etc/bash_completion ;;
# esac


# History Options
# ###############

# Don't put duplicate lines in the history.
 export HISTCONTROL="ignoredups"

# Ignore some controlling instructions
# HISTIGNORE is a colon-delimited list of patterns which should be excluded.
# The '&' is a special pattern which suppresses duplicate entries.
# export HISTIGNORE=$'[ \t]*:&:[fb]g:exit'
# export HISTIGNORE=$'[ \t]*:&:[fb]g:exit:ls' # Ignore the ls command as well

# Whenever displaying the prompt, write the previous line to disk
 export PROMPT_COMMAND="history -a"


# Aliases
# #######

# Some example alias instructions
# If these are enabled they will be used instead of any instructions
# they may mask.  For example, alias rm='rm -i' will mask the rm
# application.  To override the alias instruction use a \ before, ie
# \rm will call the real rm not the alias.

# Interactive operation...
# alias rm='rm -i'
# alias cp='cp -i'
# alias mv='mv -i'

# Default to human readable figures
 alias df='df -h'
 alias du='du -h'

# Misc :)
# alias less='less -r'                          # raw control characters
 alias whence='type -a'                        # where, of a sort
 alias grep='grep --color'                     # show differences in colour

# Some shortcuts for different directory listings
 alias ls='ls -hF --color=tty'                 # classify files in colour
 alias dir='ls --color=auto --format=vertical'
 alias vdir='ls --color=auto --format=long'
 alias ll='ls -l'                              # long list
 alias la='ls -A'                              # all but . and ..
 alias l='ls -CF'                              #


# Functions
# #########

# Some example functions
# function settitle() { echo -ne "\e]2;$@\a\e]1;$@\a"; }

## editor for crontab, cvs
EDITOR=vi
export EDITOR

## pager for man
PAGER=less
export PAGER
#path variables
DESKTOP_P="/cygdrive/c/Documents\ and\ Settings/<user>/Desktop"

#clearcase
PATH=${PATH}:/cygdrive/f/perl/focus/bin/pc/:/cygdrive/c/work/scripts/util/:/cygdrive/c/work/scripts/perl/:/cygdrive/c/work/scripts/perl/util/:/cygdrive/c/bin/:/cygdrive/c/work/scripts/games:/cygdrive/c/work/scripts/python/util:/cygdrive/c/work/scripts/sh:/usr/sbin/:/cygdrive/c/Documents\ and\ Settings/<user>/bin:
PATH=${PATH}:/cygdrive/c/work/scripts/sed/:
CWTOOLS=/cygdrive/f/;export CWTOOLS

#Python
#Python module path (like java classpath)
PYTHONPATH=.:/cygdrive/c/work/scripts/games:/cygdrive/c/work/scripts/python
#Python interactinve shell startup file.
PYTHONSTARTUP=~/.pythonrc
export PYTHONSTARTUP

#For pypersrc
export TCL_LIBRARY=/cygdrive/c/cygwin/usr/share/tcl8.4/

#prompt
PS1="[\u@\h:\d:\w:]\$ "

#set vi prompt mode, for emacs mode (default) use, set -o emacs
set -o vi
bind '"\t":menu-complete'

#source ~/.aliases
. ~/.aliases

	21.4 laptop environment .aliasses Mon Jan 25 18:27:18 JST 2010

# Author: Yosi Izaq
#

#Utility bash mini functions of common tasks
#
# This one will accept a list of files to edit.
# If the first parameter is -t then console VIM will be used. Otherwise GVIM will be launched.
_fire_vim_edit_session(){

	if [ -n $1 -a $1 == "-t" ]
	then
		echo "using VIM"
		shift #shift the -t out of argument (file) list
		vim $@
	else
		echo "using GVIM"
#gvim -font Courier\ Bold\ 13 $files
#gvim -font Sans\ 12 $@
		gvim -font Courier\ Bold\ 13 $@
	fi
		
}
#

#Bash functions I usually alias and use commonly
#__find_cpp()
#{
#find . \( -name "*.[ch]" -o -name "*.cpp" -o -name "*.hpp" \) 
#}

_generate_code_review_info()
{
        echo "Generating code review information"
        echo "Make sure you're in corresponding stream and view and set to the activity you'd like reviewed"

        stream=`ct lsstream | awk '{print $2}'`
        view=`ct pwv |  awk '/Set view/  {print $3}'`
        activity=`ct lsact -cact | awk '{print $2}'`

        Files=`ct lsact -long ${activity}@<internal-path> | awk '/@@/ {print $1 } ' | sed -e 's_@@.*$__'`

        echo "================================================================================"
        echo "||            Code Review Information, optimized for windows view             "
        echo "================================================================================"
        echo "|| Stream:    $stream                   "
        echo "================================================================================"
        echo "|| View:      $view                   "
        echo "================================================================================"
        echo "|| Activity:  $activity                 "
        echo "================================================================================"
        echo "|| Files:     $Files                 "
        echo "================================================================================"

	
	echo
	echo
	echo
	echo

	RULER="=================================================================================================================================="
        Files_array=(`ct lsact -long ${activity}@<internal-path> | awk '/@@/ {print $1 } ' | sed -e 's_@@.*$__' | sort | uniq   `)

        printf "%-130s" $RULER
        echo
        printf "%-10s%-110s%10s" "||" "Code Review Information. Optimized for Linux View" "||"
        echo
        printf "%-130s" $RULER
        echo
        printf "%-10s%-110s%10s" "||" "Stream $stream" "||"
        echo
        printf "%-130s" $RULER
        echo
        printf "%-10s%-110s%10s" "||" "View $view" "||"
        echo 
        printf "%-130s" $RULER
        echo
        printf "%-10s%-110s%10s" "||" "Activity $activity" "||"
        echo 
        printf "%-130s" $RULER
        echo
        printf "%-10s%-110s%10s" "||" "View $view" "||"
        echo
        printf "%-130s" $RULER
        echo
        printf "%-10s%-110s%10s" "||" "Files: " "||"
        echo
        
        for file in ${Files_array[@]} 
        do
                printf "%-10s%-110s%10s" "||" "$file" "||"
                echo
        done

        printf "%-130s" $RULER
        echo
}

# Variabls
_VIM_FONT=' -font Sans\ 12 '
#_VIM_FONT=' -font Courier\ Bold\ 13 '
#FUNCTIONS

_cpuz(){

#Description: This alias will copy and uncopmress a given zip file to a given target file
# The result is much faster than running cp first and gzunzip later.
#Usage: $ cpuz source_file target_file
#Author Yosi Izaq
        echo "This alias will copy and uncopmress a given zip file to a given target file"


        if  [ $# -ne 2 ] 
                then
                        echo "Usage: $ cpuz source_file target_file"
        else
                echo "copying and decompressing $1 to $2"
		zcat $1 > $2
        fi  

}

_cpz(){

#Description: This alias will copy the given file to a compressed file on a given location using pipes
# The result is much faster than running cp first and gzip later.
#Usage: $ cpz source_file target_file.gz
#Author Yosi Izaq
        echo "This alias will copy the given file to a compressed file on a given location using pipes"


        if  [ $# -ne 2 ] 
                then
                        echo "Usage: $ cpz source_file target_file.gz"
        else
                echo "copying and compressing $1 to $2"
		cat $1 | gzip > $2
        fi  

}

_cpr_fast(){

#Description: This alias copied directories much faster than cp -r
#Usage: $ cpr_fast source target
#Author Yosi Izaq
        echo "This alias copies directories much faster than cp -r"


        if  [ $# -ne 2 ] 
                then
                        echo "Usage: $ cpr_fast source target"
        else
                echo "copying $1 to $2"
                ( cd $1  && tar cf - . ) | (cd $2  && tar xvpf - ) 
        fi  

}

_pull_file_ssh(){
#Description: SSH copy file from remote host
#Usage pull_file_ssh <remote file> <remote host> <local file>
#Author Yosi Izaq

        echo "SSH copy file from remote host"


        if  [ $# -lt 3 ]
                then
                        echo "Usage pull_file_ssh <remote file> <remote host> <local file> [remote user]"
        		echo "Note that [remote user] is optional, use it if local user is different than remote user"
        else
		if [ -n "$4" ]
		then
			USR="$4"
			echo "Remote user is $USR"
		else
			USR=$(whoami)
			echo "Using local user $USR"
		fi
                echo "copying $1 to $3 from machine $2, using remote user $4"
                ssh -l $USR $2  cat $1 > $3
        fi

}
_push_file_ssh(){
#Description: SSH move file to remote host
#Usage: push_file_ssh <local file> <remote host> <remote file> [remote user]
#Author Yosi Izaq

        echo "SSH move file to remote host"
        echo "Usage push_file_ssh <local file> <remote host> <remote file> [remote user]"
        echo "Note that [remote user] is optional, use it if local user is different than remote user"

	USR=""

        if  [ $# -lt 3 ]
                then
			echo "Usage push_file_ssh <local file> <remote host> <remote file> [remote user]"
        		echo "Note that [remote user] is optional, use it if local user is different than remote user"
        else
		if [ -n "$4" ]
		then
			USR="$4"
			echo "Remote user is $USR"
		else
			USR=$(whoami)
			echo "Using local user $USR"
		fi

                echo "copying $1 to $3 on machine $2, using remote user $4"
		echo "Execute: cat $1 | ssh -l $USR $2  cat \">\" $3"
                cat $1 | ssh -l $USR $2  cat ">" $3
        fi

}


_ls_exe(){
#Description: list executable files only
#Usage: $ ls_exe
#Author Yosi Izaq
ls -lrt | awk ' $1 ~ /x/&& $1 !~ /^d/ {print $9 " " $10}'
}

_ls_dir() {
#Description: list directory files only
#Usage: $ ls_exe
#Author Yosi Izaq
ls -lrt | awk ' $1 ~ /^d/ {print $9 " " $10}'
}

_ls_file() {
#Description: list files only
#Usage: $ ls_exe
#Author Yosi Izaq
ls -lrt | awk ' $1 !~ /^d/ {print $9 " " $10}'
}

_tocifyKB(){
cd /cygdrive/c/work/KB/;

#bash array syntax 
declare -a kb_set 
kb_set=(`find . -iname '*kb*'`)
echo "Adding TOC to all files listed: ${kb_set[@]}"
tocify.pl ${kb_set[@]}
}

_translate_acs_error(){
cd /cygdrive/c/Program\ Files/CiscoSecure\ ACS\ v4.1/bin/;
csutil.exe -e "$1"
cd -;
#"./cygdrive/c/Program\ Files/CiscoSecure\ ACS\ v4.1/bin/csutil.exe" -e "$1"
}

_browse_cc_change_set(){
	echo "make sure you change directory to ACS clearcase view"
	for file in `ct lsactivity -long -me | grep ismg_israel_acs | awk -F"@" '{print $1 }' | sed -e 's/\w:\\\ismg_israel_acs\\\Acs/./' |  sed -e 's_\\\_/_g' | sort | uniq `;
		do echo $file;
		ct lsvtree -g $file;
	done
}
_backup(){
	source ~/.aliases
	echo "------------------------------------------------"
	echo "Starting backup of knwoledge base, scripts and daily context files..."
	echo "------------------------------------------------"

	back_path="/cygdrive/c/TEMP/backups"

	cdwork
	echo "------------------------------------------------"
	echo "backup KB, context files and scripts"
	echo "------------------------------------------------"
	tar cvf $back_path/` date| awk '{print "backup_"$3"_"$2"_"$6}'`.tar  KB/ context* scripts 
	echo "------------------------------------------------"
	echo "backup ToDo list, development process notes, drafts and project related KBs"
	echo "------------------------------------------------"
	tar rvf $back_path/` date| awk '{print "backup_"$3"_"$2"_"$6}'`.tar  acs/5.0/AAC/AAC_DEV_Draft acs/5.0/AD/ADClientPlan acs/5.0/AD/MAR_Plan acs/5.0/Kerberos/KerberosPlan  acs/5.0/PKI/clr_task_plan acs/5.1/CoA/CoA_Plan acs/5.1/FIPS/FIPS_KB 

	echo "------------------------------------------------"
	echo "backup aliases bashrc vimrc and vim"
	echo "------------------------------------------------"
	cd ~
	tar rvf $back_path/` date| awk '{print "backup_"$3"_"$2"_"$6}'`.tar  .aliases .bashrc .vimrc .journal/yosi_izaq_journal* .vim/

	echo "------------------------------------------------"
	echo "backup files from desktop: bookmars and notes"
	echo "------------------------------------------------"
	cd /cygdrive/c/Documents\ and\ Settings/<user>/Desktop/
	tar rvf $back_path/` date| awk '{print "backup_"$3"_"$2"_"$6}'`.tar  notes bookmarks.html


	echo "------------------------------------------------"
	echo "Compressing..."
	echo "------------------------------------------------"
	bzip2 -f $back_path/` date| awk '{print "backup_"$3"_"$2"_"$6}'`.tar
	echo "------------------------------------------------"
	echo "Backup complete! have a nice day :) "
	echo "------------------------------------------------"
}
_kill_proc(){
	echo "freeing process $1"
	proc_pid=`ps -ef | grep "$1" | grep -v grep | awk '{print $2}' `
	echo "freeing  processes $proc_pid. if theres such process please ignore the error message."
	kill -9 $proc_pid
}

_cd () {
	cd /cygdrive/"$1"
   }

_pse(){
	ps -ef  | grep `whoami` | grep "$1" | grep -v grep
}

_history(){
	history | grep "$1"
}

_locate_in_jar (){
#for jar in *.jar;  do echo  searching $jar; jar tvf $jar | grep "$1"; done
for jar in *.jar;  
	do  jar tvf $jar | grep "$1"; 
	if [ $? = 0 ]  ;
	then
		echo "found $1 in $jar."
	fi
done
}

_open_KB_files(){

files=( knowledge_base_unix  clear_case_KB.txt bash/KB_bash  vi/KB_vi kb_scripts javaKB ACS/kb_acs_4_1 ACS/kb_acs_5_0 ACS/kb_acs_5_1 acs_faqs kb_cisco kb_cygwin kb_tools KB_cpp python/KB_python sed/KB_sed awk/kb_awk  win/KB_win Network/sslKB KB_sql /perl/KB_perl /Algorithms/AlgorithmsKB /ant/antKB C_KB Network/ACE/aceKB Network/NetworkKB Network/sslKB  linux/KB_Linux kb_security dominionsKB )
path=" /cygdrive/c/work/KB/"
#cmd="vi "
#cmd="gvim -font Courier\ Bold\ 13 "
cmd=" "

for file in ${files[@]};
	do file=${path}${file};
	cmd=${cmd}${file}
#echo $file;
#echo $cmd;
done
#gvim ${_VIM_FONT} ${cmd}

# If the first parameter is -t then console VIM will be used. Otherwise GVIM will be launched.
_fire_vim_edit_session $1 ${cmd}
#gvim -font Sans\ 12 ${cmd}
}

_list_checkouts() {
	echo "Please wait while generating list of checked out files.";
# Caveage, replaced with new cleartool command :)
#find . \( -name "*.[ch]" -o -name "*.cpp" -o -name "*.hpp" \)  -exec  cleartool ls '{}' \; | grep CHECKEDOUT | awk -F@ '{print $1}'
	ct lsco -r -me;
}

_resume_editing_session(){
	echo "Resuming editing session on files: "
	cat $1
	file="$1"
	arg1="$2"
	files=`flatten_file_lines.py $file`

	_fire_vim_edit_session $arg1 ${files}

#	if [ -n $arg1 -a $arg1 == "-t" ]
#	then
#		echo "using vim"
#		vim -- $files
#	else
#		echo "using gvim"
##gvim -font Courier\ Bold\ 13 $files
#		gvim -font Sans\ 12 ${files}
#	fi
		
}

_open_current_context(){
#month=` date | awk '{print $2}'`
#	year=` date | awk '{print $6}'`
##echo "year $year, month $month"
	
	ctxt_path="/cygdrive/c/work/"	

#file="${ctxt_path}context_${month}_${year}" 

#More elegant than awking for month and year. use () for spawning shell command. Run date with format of month_year
	file="${ctxt_path}context_"$(date +%b_%Y)
	day=$(date +%d)
	if  [ -e $file ] 
		then
			echo "Context file exists"
		else
			echo "Creating new context file $file"
			touch  $file

			echo "This file contains work related notes for Yosi Izaq, <email>" >> $file
			echo "File name: $file" >> $file
	
#Enter all days
				LIMIT=31
				for ((i=1; i <= LIMIT ; i++)) 
					do 
						echo  "$i" >> $file
						echo  "" >> $file
						echo  "      ->" >> $file
						echo  "" >> $file
						echo  "      ->" >> $file
						echo  "" >> $file
					done
	fi

	echo "Opening $file for edit..."
#gvim -font Courier\ Bold\ 13 $file
# If the first parameter is -t then console VIM will be used. Otherwise GVIM will be launched.
_fire_vim_edit_session $1 ${file} +/"^${day}"
#gvim -font Sans\ 12 ${file}
}

_mini_start(){
	banner "Welcome"
	banner "`whoami`"	
	echo "date is:"
	banner "`date`"	

	echo "Initializing commonly used apps..."

	echo "Firing up knowledge base and context files"
	_open_current_context;
	_open_KB_files

	echo "Firing up some xterms..."
	xterm -sb -bg brown -fg yellow  &
	xterm -sb -bg blue -fg orange  &
	xterm -sb -bg lightyellow -fg purple  &
	xterm -sb -bg grey -fg blue  &

	banner "ENJOY :-)"

	echo "and btw, backuping files..."
	backup
}

_start(){
	banner "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
	banner "Welcome"
	banner "`whoami | awk '{print toupper($1) }'`"	
	echo "date is:"
	banner "`date`"	
	banner "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

	echo "Initializing commonly used apps..."

#	echo "Initializing sametime"
## old sametime
##"/cygdrive/c/Program Files/Lotus/Sametime Client/Connect.exe" &
#	"/cygdrive/c/Program Files/Lotus/Sametime Client/Connect.exe" &

#	echo "Initializing Pidgin"
#	"/cygdrive/c/Program Files/Pidgin/pidgin.exe" &

	banner "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
	echo "Initializing outlook"
	"/cygdrive/c/Program Files/Microsoft Office/OFFICE12/OUTLOOK.EXE"   &

	banner "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
	echo "Initializing emerald crimson editor"
	"/cygdrive/c/Program Files/Emerald Editor Community/Crimson Editor SVN263/cedt.exe" &

	banner "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
	echo "Initializing firefox"
	"/cygdrive/c/Program Files/Mozilla Firefox/firefox.exe" &

	banner "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
	echo "Firing up knowledge base and context files"
	_open_current_context;
	_open_KB_files

	banner "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
	echo "Firing up some xterms..."
	xts_small
#	xterm -sb -bg brown -fg yellow  &
#	xterm -sb -bg blue -fg orange  &
#	xterm -sb -bg lightyellow -fg purple  &
#	xterm -sb -bg grey -fg blue  &

	echo "Initializing total commander"
	"/cygdrive/c/totalcmd/TOTALCMD.EXE" &

	banner "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
	banner "ENJOY :-)"

	banner "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
	echo "and btw, backuping files..."
	backup
	banner "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"


}

#general
alias dir='ls -lav --color=auto'
alias DIR='ls -F | grep "/"'
alias lst='ls -lrt'
alias cdd='cd /cygdrive/c'
alias CD="_cd "
alias cddesktop='cd  /cygdrive/c/Documents\ and\ Settings/<user>/Desktop/'
alias pse="_pse " 
alias hist="_history"

##jrules
#alias cdjrules='cd d:;cd ILOG/JRules51' 
#alias cdjrules_eval='cd d:;cd work/projects/ILOG\ JRules\ Compatability\ Tests/"SFL Demo" '
#alias cdjrules_integ_loc='cd /cygdrive/c/work/projects/first_integration '
#alias cdjrules_integ_stream='cd /cygdrive/h/ismg_israel_acs/Acs/JRules/first_integration '
#alias cdjrules_new_integ_stream='cd /cygdrive/j/nm_use_common/JRules/  '
#alias start_rule_dev='/cygdrive/c/ILOG/JRules503/bin/RuleBuilder/brdev.exe'
#alias jonas_start='/cygdrive/c/ILOG/JRules503/bin/Examples/startserver'
#alias jonas_stop='/cygdrive/c/ILOG/JRules503/bin/Examples/stopserver'
#

#xt
#alias xt1='xterm -sb -bg brown -fg yellow '
#alias xt2='xterm -sb -bg blue -fg orange '
#alias xt3='xterm -sb -bg lightyellow -fg purple'
#alias xt4='xterm -sb -bg grey -fg blue' 
alias xt1='xterm -font -*-fixed-medium-r-*-*-20-*-*-*-*-*-iso8859-*  -geometry 70x24 -sb -bg brown -fg yellow '
alias xt2='xterm -font -*-fixed-medium-r-*-*-20-*-*-*-*-*-iso8859-*  -geometry 70x24 -sb -bg blue -fg orange '
alias xt3='xterm -font -*-fixed-medium-r-*-*-20-*-*-*-*-*-iso8859-*  -geometry 70x24 -sb -bg lightyellow -fg purple'
alias xt4='xterm -font -*-fixed-medium-r-*-*-20-*-*-*-*-*-iso8859-*  -geometry 70x24 -sb -bg grey -fg blue' 
alias xts="xt1& xt4& xt3& xt4&"
alias xt1_small='xterm -font -*-fixed-bold-r-*-*-12-*-*-*-*-*-iso8859-*  -geometry 140x48 -sb -bg brown -fg yellow '
alias xt2_small='xterm -font -*-fixed-bold-r-*-*-12-*-*-*-*-*-iso8859-*  -geometry 140x48 -sb -bg blue -fg orange '
alias xt3_small='xterm -font -*-fixed-bold-r-*-*-12-*-*-*-*-*-iso8859-*  -geometry 140x48 -sb -bg lightyellow -fg purple'
alias xt4_small='xterm -font -*-fixed-bold-r-*-*-12-*-*-*-*-*-iso8859-*  -geometry 140x48 -sb -bg grey -fg blue' 
alias xts_small="xt1_small& xt4_small& xt3_small& xt4_small&"

#jboss
alias jboss_start='/cygdrive/c/Program\ Files/jboss-4.0.2/bin/run.bat'
alias jboss_stop='/cygdrive/c/Program\ Files/jboss-4.0.2/bin/shutdown.bat -S'
alias cdjboss="cd /cygdrive/c/Program\ Files/jboss-4.0.2/server/default/"

#tomcat
alias cdtomcat="cd /cygdrive/c/Program\ Files/Apache\ Group/Tomcat\ 4.1"
alias tomcat_start="cdtomcat; cd ./bin; ./startup.bat; cd -"
alias tomcat_stop="cdtomcat; cd ./bin; ./shutdown.bat; cd -"
alias tomcat_restart="tomcat_stop; sleep 5; tomcat_start"

#system
alias pse='ps -ef | grep `whoami`'
alias ipconfig='/cygdrive/c/WINNT/system32/ipconfig.exe'
alias refresh_DNS='sudo /etc/rc.d/init.d/nscd restart '

#personal
alias cd_citation='cd /cygdrive/c/backup/acc/citation'
alias dom2='/cygdrive/c/Program\ Files/dominions2/dom2.exe'
alias dom3='/cygdrive/c/Program\ Files/dominions3/dom3.exe'
alias py_eye="cd /cygdrive/c/work/scripts/games/py_eye/py_eye; py_eye_gui.py & "
alias gods_eye='cd /cygdrive/c/backup/medial/g/domII/tools/gods_eye/;./gods_eye.exe'
alias open_journal='echo open private journal, please type password.; cd /cygdrive/c/Documents\ and\ Settings/<user>/.journal ; ccrypt -d yosi_izaq_journal.cpt; vi yosi_izaq_journal; cd - '
alias close_journal='echo closing private journal, please type password; cd /cygdrive/c/Documents\ and\ Settings/<user>/.journal ; ccrypt -e yosi_izaq_journal; echo terminating journal editing session; cd -'
alias journal="open_journal ; close_journal"

alias open_pass='echo open private passwords file, please type password.; cd /cygdrive/c/work/; ccrypt -d pass.cpt &&  vi pass; cd - '
alias close_pass='echo closing private passwords file, please type password; cd /cygdrive/c/work/; ccrypt -e pass; echo terminating passwords editing session; cd -'
alias pass="open_pass ; close_pass"

#work
#Put here things that are very commonly used.
alias backup='_backup'
alias browse_cc_change_set='_browse_cc_change_set'
alias start='_start'
alias mini_start='_mini_start'

alias KB='less /cygdrive/c/work/KB/knowledge_base_unix  /cygdrive/c/work/KB/clear_case_KB.txt  /cygdrive/c/work/KB/kb_acs  /cygdrive/c/work/KB/kb_jrules  /cygdrive/c/work/KB/javaKB  /cygdrive/c/work/KB/CPP/KB_cpp /cygdrive/c/work/KB/kb_cygwin /cygdrive/c/work/KB/ant/antKB /cygdrive/c/work/KB/bash/KB_bash /cygdrive/c/work/KB/vi/KB_vi '
alias tocifyKB='_tocifyKB'
alias KBE="_open_KB_files"
alias cd_scripts='cd /cygdrive/c/work/scripts'
alias +='less'
alias cdKB='cd /cygdrive/c/work/KB'
alias cdwork='cd /cygdrive/c/work'
alias tkdiff='/cygdrive/c/Program\ Files/tkdiff/tkdiff_4_1/tkdiff.tcl'
alias vpn='/cygdrive/c/work/scripts/util/connect_2_office.sh'
alias vi='vim'
alias cd_acs_client='cd /cygdrive/c/work/acs/test\ tools/ACS\ Client/1.1.5.0/AcsClient-1.1.5.0/userHomeDir.sample'

#ACS related
alias cdacs_auto_test='cd /cygdrive/h/acs_test_automation/acs5_test_auto'
alias cdacs_napnac='cd /cygdrive/i/ismg_israel_acs/Acs'
alias gen_tags='echo generating cpp tags;ctags -R --c++-kinds=+p --fields=+iaS --extra=+q  --languages=c++  -f tags . ; sort -u -o tags tags'
alias gen_java_tags='echo generating java tags;ctags -R --fields=+iaS --extra=+q  --languages=java  -f tags . ; sort -u -o tags tags'
alias gen_fscope='find . \( -name "*.[chCH]" -o -name "*.cpp" -o -name "*.hpp" -o "*.java" \) > freescope.files'
alias gen_scope='find . \( -name "*.[chCH]" -o -name "*.cpp" -o -name "*.hpp" \) > cscope.files; cscope -b -i cscope.files '
alias start_apache='/cygdrive/c/Program\ Files/Apache\ Group/Apache2/bin/Apache.exe'
alias cd_apache='cd /cygdrive/c/Program\ Files/Apache\ Group/Apache2/bin/'
alias ctxt='_open_current_context'
#Logs
alias cd_log='cd /cygdrive/c/Program\ Files/CiscoSecure\ ACS\ v4.1/CSLog/'
alias tf_log='tail -f /cygdrive/c/Program\ Files/CiscoSecure\ ACS\ v4.1/CSLog/Logs/CSLog.log'
alias tf_admin='tail -f /cygdrive/c/Program\ Files/CiscoSecure\ ACS\ v4.1/CSAdmin/Logs/ADMN.log'
alias cd_admin='cd /cygdrive/c/Program\ Files/CiscoSecure\ ACS\ v4.1/CSAdmin/'
alias tf_auth='tail -f /cygdrive/c/Program\ Files/CiscoSecure\ ACS\ v4.1/CSAuth/Logs/AUTH.log'
alias vi_auth='vi  /cygdrive/c/Program\ Files/CiscoSecure\ ACS\ v4.1/CSAuth/Logs/AUTH.log'
alias cd_auth='cd /cygdrive/c/Program\ Files/CiscoSecure\ ACS\ v4.1/CSAuth/'
alias tf_radius='tail -f /cygdrive/c/Program\ Files/CiscoSecure\ ACS\ v4.1/CSRadius/Logs/RDS.log'
alias vi_radius='vi /cygdrive/c/Program\ Files/CiscoSecure\ ACS\ v4.1/CSRadius/Logs/RDS.log'
alias cd_radius='cd /cygdrive/c/Program\ Files/CiscoSecure\ ACS\ v4.1/CSRadius/'
alias cd_acs_5_0_view='cd /cygdrive/c/views/snapshot/<internal-path>/<internal-path>'
alias cd_acs_4_1_view='cd /cygdrive/c/views/snapshot/<internal-path>/ismg_israel_acs/Acs/'
#hypersrc is a solid source browser
#alias hypersrc="/cygdrive/c/Documents\ and\ Settings/<user>/bin/hypersrc.pl"
#Work, Nap-Nac aliases
alias vi_hcap_spec='vi /cygdrive/c/work/acs/Nap-Nac/NAC_HCAP_Specification_External.doc'
alias translate_error='_translate_acs_error'
#ACS related

#scripts
alias ruby_i='ruby /cygdrive/c/work/scripts/ruby/eval.rb'

#clearcase
alias code_review_info='_generate_code_review_info'
alias ct='cleartool'
alias cdview='cd /cygdrive/m/view/'
alias focus='echo Changing dir to focus bin dir for executing focus CLI; cd /cygdrive/f/bin/pc'
alias list_COs="_list_checkouts"
#java related
alias locate_class_in_jar="_locate_in_jar"

# For cscope
#cscope='mlcscope'
TMPDIR=/cygdrive/c/temp/
export TMPDIR

#convenience
alias resume_edit="_resume_editing_session"
#alias resume_perl_session="gvim \`\ls -lrt  | awk ' /pl$/ {print $NF} '\`"

#Cscope vim integration
#alias cscope='freescope'

alias kill_proc="_kill_proc"

#gvim
alias gvim="gvim -font Courier\ Bold\ 13"
#alias gvim="gvim -font Sans\ 12 "

#Directory display tree
alias tree="ls -R |  sed -e '/:$/s/:$//' -e 's/[^-][^\/]*\//--/g' -e 's/^/   /' -e 's/-/|/'"
alias dir_tree="ls -R | grep ":$" | sed -e 's/:$//' -e 's/[^-][^\/]*\//--/g' -e 's/^/   /' -e 's/-/|/'"

#ls shortcuts, execs and dirs
alias ls_exe=_ls_exe
alias ls_dir=_ls_dir
alias ls_file=_ls_file

#remote procedures
alias push_file_ssh='_push_file_ssh'
alias pull_file_ssh='_pull_file_ssh'

#Efficient replacment to cp -r
alias cpr_fast='_cpr_fast'

#Copy to compressed file, Copy to uncompressed file
alias cpz='_cpz'
alias cpuz='_cpuz'

#File system reports
# Report directory size, sorted from smallest to largest
alias report_dir_sizes='du -sk * | sort +0n'

#CPP
# Search in all CPP files, headers and sources.
#
alias find_cpp='find . \( -name "*.[ch]" -o -name "*.cpp" -o -name "*.hpp" \)'

	21.5 useful aliases
[employer-specific content moved to private KB, 2026-10]

	21.6
```
