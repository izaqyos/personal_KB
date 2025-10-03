# global
#if [ -f /etc/bashrc ]; then
#	. /etc/bashrc
#fi

## editor for crontab, cvs
EDITOR=vi
export EDITOR

## pager for man
PAGER=less
export PAGER

alias ls="ls -F --color "
alias la="ls -a --color "
alias l="ls -a "
alias sl="ls"
alias less="less -x4 -r "
alias rm="rm -i "
alias mv="mv -i "
alias cp="cp -i "
alias ct="date +%Y%m%d-%H%M%S"
alias kt="kterm -km euc -sb -sl 2000"
alias c="clear"
#alias emacs="meadow "   # for cygwin
#alias mule="meadow "    # for cygwin


#path variables

#clearcase
PATH=${PATH}:/auto/cwtools/perl/focus/bin/lnx/:/usr/atria/bin/:/sbin/:/vob/enm_jdk/maven-2.0.5/bin:JAVA_HOME/:auto/cwtools/perl/focus/bin/lnx:/usr/atria/bin:
CWTOOLS=/auto/cwtools/;export CWTOOLS


#For maven
MAVEN_HOME=/vob/enm_jdk/maven-2.0.7; export MAVEN_HOME;
PATH=${PATH}:${MAVEN_HOME}/bin/:
JAVA_HOME=/usr/java/jdk1.5.0_10; export JAVA_HOME;

#for running ACS RT deamon
ODBCINI=/opt/CiscoACS/db/odbc.ini; export ODBCINI;
PATH=${PATH}:/opt/CiscoACS/bin/:
LD_LIBRARY_PATH=/opt/CiscoACS/runtime/lib:/opt/CiscoACS/db/dbsrv/lib32:/opt/CiscoACS/db/dbsrv/jre150/lib/i386/client:/opt/CiscoACS/db/dbsrv/jre150/lib/i386:/opt/CiscoACS/db/dbsrv/jre150/lib/i386/native_threads:/opt/CiscoACS/lib:; export LD_LIBRARY_PATH;
source /opt/CiscoACS/db/dbsrv/bin32/sa_config.sh

#prompt
PS1="[\u@\h:\d:\w]\$ "

#scripts to path
PATH=${PATH}:~/work/scripts/:~/work/scripts/python/util:~/work/scripts/util/:~/work/scripts/sed/:


source ~/.aliases
