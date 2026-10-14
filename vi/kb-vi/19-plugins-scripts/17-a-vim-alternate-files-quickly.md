---
type: reference
title: "a.vim : Alternate Files quickly"
description: "Vim plugin notes: a.vim : Alternate Files quickly (First steps, Tutorial, Connection Profiles)"
tags: [vim, vimscript, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#19.15"
---

# 19.15 a.vim : Alternate Files quickly

[↑ PLUGINS, Scripts](/vi/kb-vi/19-plugins-scripts/README.md)

```text
		:A switches to the header file corresponding to the current file being edited (or vise versa)
		(note, same as :e %<.h )
		:AS splits and switches
		:AV vertical splits and switches
		:AT new tab and switches
		:AN cycles through matches
		:IH switches to file under cursor
		:IHS splits and switches
		:IHV vertical splits and switches
		:IHT new tab and switches
		:IHN cycles through matches
		<Leader>ih switches to file under cursor
		<Leader>is switches to the alternate file of file under cursor (e.g. on  <foo.h> switches to foo.cpp)
		<Leader>ihn cycles through matches 

	19.16 dbext.vim : Provides database access to 10 dbms (Oracle, Sybase, SQL Server, MySQL, DBI,...) 
```

### 19.16.1 First steps

```text
                Install
		Copy the plugin/dbext.vim script to your $HOME/.vim/plugin (or $VIM/vimfiles/plugin for windows) directory.  Copy the autoload/dbext.vim script to your $HOME/.vim/autoload (or $VIM/vimfiles/autoload for windows) directory.  Copy the autoload/dbext_dbi.vim script to your $HOME/.vim/autoload (or $VIM/vimfiles/autoload for windows) directory.  Copy dbext.txt to your $HOME/.vim/doc (or $VIM/vimfiles/doc for windows) directory.
To update the Vim Help, run:
:helptags $HOME/.vim/doc  (Unix)
:helptags $VIM/vimfiles/doc  (Windows)
```

### 19.16.2 Tutorial

```text
		A tutorial has been added to help you become familiar with the features of the plugin, :h dbext-tutorial.
```

### 19.16.3 Connection Profiles

```text
You can create as many profiles as you like in your vimrc.  Each profile specifies various connection information.  Each buffer can be connected to a different database.   The plugin will automatically prompt the user for connection information.  If you have defined profiles in your vimrc, for ease of use,  you can choose from a numbered list.
```

### 19.16.4 Object Completion

```text
dbext ties into Vim dictionary feature.  You can complete table names, procedure names and view names using the i_CTRL-X_CTRL-K feature. 
```

### 19.16.5 FileType Support

```text
SQL can be used from a variety of languages.  Each development language (PHP, Perl, Java, ...) language has different syntax for creating SQL statements that are sent to the database.  dbext has support for several
different filetypes, so that it can understand and correctly parse a SQL statement.

The current supported languages are:
        PHP, Java, JSP, JavaScript, JProperties, Perl, SQL, Vim

For example assume you had the following Java code:
String mySQL =
    "SELECT s.script, ts.event, t.name                  " +
    "     , s.script_language, sv.name                  " +
    "  FROM ml_script s, ml_table_script ts, ml_table t " +
                "     , ml_script_version sv                        " +
    " WHERE s.script_id   = " + script_version +
    "   AND ts.version_id = "+obj.method() +
    "   AND ts.table_id   = t.table_id                  ";

If you visually select from the "SELECT ... to the "; and ran
:'<,'>DBExecSQL    (or used the default map <Leader>se)

The Java filetype support would concatenate each individual string into one
single string.  In this case it removed the " + " and concatenated  the
lines to result in the following (assuming this is on one line):
       SELECT s.script, ts.event, t.name , s.script_language, sv.name
       FROM ml_script s, ml_table_script ts, ml_table t
                  , ml_script_version sv
      WHERE s.script_id   = " + script_version + "
        AND ts.version_id = "+obj.method() +"
        AND ts.table_id   = t.table_id

Next, it will prompt you for replacement values for the various variables or  objects you used in the string.
Assuming you had the default behaviour turned on, you would be prompted  to supply a value for:
                " + script_version + "
                "+obj.method() +"

So assuming you entered:
                100
                'Project_Yahoo'

Then the resulting string sent to your database would be (again, this would technically be on one line):
       SELECT s.script, ts.event, t.name , s.script_language, sv.name
       FROM ml_script s, ml_table_script ts, ml_table t
                  , ml_script_version sv
      WHERE s.script_id   = 100
        AND ts.version_id = 'Project_Yahoo'
        AND ts.table_id   = t.table_id

Benefit:  
You did not have to test your SQL by cutting and pasting it into a separate tool and replacing all the object and host variables yourself.  Just by visually selecting the string and running the command DBExecSQL (or the default mapping <Leader>se) the SQL statement was executed against the database and allowed to you enter host variables.
```

### 19.16.5 Additional Commands

```text
DBExecSQL - Enter any command you want sent to the database
DBExecRangeSQL - Enter any range of statements you want executed
Select  - Enter the remainder of a select (ie :Select * from customer)
Call  - Call a stored procedure
Update  - Enter the remainder of an update
Insert  - Enter the remainder of an insert
Delete  - Enter the remainder of an delete
Drop    - Enter the remainder of a drop
Alter   - Enter the remainder of an alter
Create  - Enter the remainder of a create
```
