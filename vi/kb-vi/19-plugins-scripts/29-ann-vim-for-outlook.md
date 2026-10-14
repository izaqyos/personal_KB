---
type: reference
title: "ANN: Vim for Outlook"
description: "Subsection 19.26 of PLUGINS, Scripts."
tags: [kb-vi, plugins, scripts, extensions, colorschemes, list, active]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#19.26"
---

# 19.26 ANN: Vim for Outlook

[↑ PLUGINS, Scripts](/vi/kb-vi/19-plugins-scripts/README.md)

### 19.26.1 Issues on my env

```text
I have released a new plugin for those Microsoft Windows Outlook users.

It simply adds a button in Outlook which will spawn Vim, allow you to
edit the body of the currently open email and when you :w, it will
update Outlook with the results.

There are more details, you can read about them here:
http://www.vim.org/scripts/script.php?script_id=3087

As usual, with all my plugins, feedback good and bad is always welcome.

Enjoy.
Dave

--
You received this message from the "vim_use" maillist.
Do not top-post! Type your reply below the text you are replying to.
For more information, visit http://www.vim.org/maillist.php
Reply
		
Forward
		
Invite David Fishburn to chat
		
Reply
|
Gareth Oakes	
Very cool! I have installed and tested on my Outlook 2007 instance here. Work...
	
May 7 (3 days ago)
Gareth OakesLoading...	
May 7 (3 days ago)
Gareth Oakes
 to vim_use
	
show details May 7 (3 days ago)
	
> I have released a new plugin for those Microsoft Windows Outlook users.
>
> It simply adds a button in Outlook which will spawn Vim, allow you to
> edit the body of the currently open email and when you :w, it will
> update Outlook with the results.
>
> There are more details, you can read about them here:http://www.vim.org/scripts/script.php?script_id=3087
>
> As usual, with all my plugins, feedback good and bad is always welcome.

Very cool! I have installed and tested on my Outlook 2007 instance
here. Works as advertised. I have two ideas for improvements:

| 1. Allow launching new Vim for each email, instead of reusing an
existing Vim. This is mainly because I always have a TODO list open in
Vim on my 2nd monitor and actually I would like to edit my email in
it's own Vim window on the primary screen :)

| 2. Auto-quote an email for response. All the Outlook formatting is
obviously lost in translation to text, but it would be nice to
automatically quote the email when writing a response. Not sure how
that would exactly work, but it would save me having to run a command
to add > before each line of the file in Vim :)

Thanks again for your script David, it's awesome.

Cheers,
Gareth
- Show quoted text -

--
You received this message from the "vim_use" maillist.
Do not top-post! Type your reply below the text you are replying to.
For more information, visit http://www.vim.org/maillist.php
Reply
		
Forward
		
Invite Gareth Oakes to chat
		
Reply
|
yosi izaq	
This plugin sounds very useful. I have outlook 2k7 and have followed the inst...
	
May 9 (1 day ago)
yosi izaqLoading...	
May 9 (1 day ago)
yosi izaq
 to vim_use
	
show details May 9 (1 day ago)
	
This plugin sounds very useful.

I have outlook 2k7 and have followed the install instructions. I have
added the vim macro and quick access button. Clicking it opens a vim
session for editing the email. However saving the changes (:w) doesn't
update the email.

Any idea what's wrong?

thx,
Yosi
Reply
		
Forward
		
		
Reply
|
David Fishburn	
On Fri, May 7, 2010 at 2:46 AM, Gareth Oakes <juicejuice@gmail.com> wrote: ...
	
6:06 AM (12 hours ago)
David FishburnLoading...	
6:06 AM (12 hours ago)
David Fishburn
 to vim_use
	
show details 6:06 AM (12 hours ago)
	
On Fri, May 7, 2010 at 2:46 AM, Gareth Oakes <juicejuice@gmail.com> wrote:
...
>> There are more details, you can read about them here:http://www.vim.org/scripts/script.php?script_id=3087
...
> Very cool! I have installed and tested on my Outlook 2007 instance
> here. Works as advertised. I have two ideas for improvements:
>
> 1. Allow launching new Vim for each email, instead of reusing an
> existing Vim. This is mainly because I always have a TODO list open in
> Vim on my 2nd monitor and actually I would like to edit my email in
> it's own Vim window on the primary screen :)

Version 3.0 just uploaded addresses this.
Please give it a try.


> 2. Auto-quote an email for response. All the Outlook formatting is
> obviously lost in translation to text, but it would be nice to
> automatically quote the email when writing a response. Not sure how
> that would exactly work, but it would save me having to run a command
> to add > before each line of the file in Vim :)

When the new file is opened in Vim the autocmds created by OutlookVim
set the filetype to be "mail".

There are several existing ftplugins available at vim.org which will
allow you to do all sorts of fancy quoting and such.
Perhaps current Vim users of these plugins can voice some opinions on
particularily effective ones.

Dave
- Show quoted text -

--
You received this message from the "vim_use" maillist.
Do not top-post! Type your reply below the text you are replying to.
For more information, visit http://www.vim.org/maillist.php
Reply
		
Forward
		
Invite David Fishburn to chat
		
Reply
|
David Fishburn	
Please update to OutlookVim 3.0. Two things: 1. After opening the email in Vi...
	
6:12 AM (12 hours ago)
David FishburnLoading...	
6:12 AM (12 hours ago)
David Fishburn
 to vim_use
	
show details 6:12 AM (12 hours ago)
	
On Sun, May 9, 2010 at 4:54 AM, yosi izaq <izaqyos@gmail.com> wrote:
> This plugin sounds very useful.
>
> I have outlook 2k7 and have followed the install instructions. I have
> added the vim macro and quick access button. Clicking it opens a vim
> session for editing the email. However saving the changes (:w) doesn't
> update the email.

Please update to OutlookVim 3.0.

Two things:

| 1.  After opening the email in Vim, please provide the output from:
:au outlook

You can select this with your mouse and hit CTRL-Y, then paste it into
this email.  It should look something like this:
****
:au outlook
--- Auto-Commands ---
outlook  BufEnter
   *.outlook setlocal filetype=mail
outlook  BufUnload
   *.outlook if expand('%:e') == 'outlook' | call
delete(expand('%:p').'.ctl') | call delete(expand('%:p')) | endif
outlook  BufWritePost
   *.outlook setlocal autoread | let g:outlook_cscript_output =
system('cscript "C:\Vim\vimfiles\plugin\outlookvim.js"
"'.expand("%").'"  ')| bdelete | if g:outloo
k_cscript_output =~ 'outlookvim:' | call Outlook_WarningMsg(
substitute(g:outlook_cscript_output, '^.*\(outlookvim:.*\)', '\1', '')
) | endif
****


| 2.  After typing :w, please provide the output from:
:echo g:outlook_cscript_output

It should say something like this:
****
Microsoft (R) Windows Script Host Version 5.8
Copyright (C) Microsoft Corporation. All rights reserved.

Successfully updated Outlook, message
ID:0000000026A082186274D011808F00805FF466B524ACAB01
****


Dave
- Show quoted text -

--
You received this message from the "vim_use" maillist.
Do not top-post! Type your reply below the text you are replying to.
For more information, visit http://www.vim.org/maillist.php
Reply
		
Forward
		
Invite David Fishburn to chat
		
Reply
|
yosi izaq	
inline, 10x, Yosi done Doesn't look good. I get: E216: No such group or event...
	
11:03 AM (7 hours ago)
yosi izaqLoading...	
11:03 AM (7 hours ago)
yosi izaq
 to vim_use
	
show details 11:03 AM (7 hours ago)
	
inline,

10x,

Yosi
>
> Please update to OutlookVim 3.0.
>
done

> Two things:
>
> 1.  After opening the email in Vim, please provide the output from:
> :au outlook
>
> You can select this with your mouse and hit CTRL-Y, then paste it into
> this email.  It should look something like this:
> ****
> :au outlook
> --- Auto-Commands ---
> outlook  BufEnter
>    *.outlook setlocal filetype=mail
> outlook  BufUnload
>    *.outlook if expand('%:e') == 'outlook' | call
> delete(expand('%:p').'.ctl') | call delete(expand('%:p')) | endif
> outlook  BufWritePost
>    *.outlook setlocal autoread | let g:outlook_cscript_output =
> system('cscript "C:\Vim\vimfiles\plugin\outlookvim.js"
> "'.expand("%").'"  ')| bdelete | if g:outloo
> k_cscript_output =~ 'outlookvim:' | call Outlook_WarningMsg(
> substitute(g:outlook_cscript_output, '^.*\(outlookvim:.*\)', '\1', '')
> ) | endif
> ****
>
Doesn't look good. I get:
E216: No such group or event: outlook

>
> 2.  After typing :w, please provide the output from:
> :echo g:outlook_cscript_output
>
> It should say something like this:
> ****
> Microsoft (R) Windows Script Host Version 5.8
> Copyright (C) Microsoft Corporation. All rights reserved.
>
> Successfully updated Outlook, message
> ID:0000000026A082186274D011808F00805FF466B524ACAB01
> ****
>
E121: undefined variable: g:outlook_cscript_output
E15: invalid expression: g:outlook_cscript_output

I checked a bit and I think the reason this fails is:
| 1. Fail to load the javascript b/c
| 2. $VIM contains a space (i.e c:/Program file/vim)
| 3. So this snippet is failing:
" Default location for the outlookvim.js file.
" This can be overridden in your vimrc via
" g:outlook_javascript
let s:outlook_javascript_default = expand('$VIM/vimfiles/plugin/outlookvim.js')

so outlook.vim gives error that it can't load the js file.
How can I fix this?
Reply
		
Forward
		
		
Reply
|
David Fishburn	
On Mon, May 10, 2010 at 4:03 AM, yosi izaq <izaqyos@gmail.com> wrote: Yosi I ...
	
3:29 PM (3 hours ago)
David FishburnLoading...	
3:29 PM (3 hours ago)
David Fishburn
 to vim_use
	
show details 3:29 PM (3 hours ago)
	
On Mon, May 10, 2010 at 4:03 AM, yosi izaq <izaqyos@gmail.com> wrote:

 Yosi

I will respond directly to you and take this offline until we resolve it.

I will post back the final solution.
I have tested with spaces in the name, so it must be something else.
- Show quoted text -

Dave

--
You received this message from the "vim_use" maillist.
Do not top-post! Type your reply below the text you are replying to.
For more information, visit http://www.vim.org/maillist.php
Reply
		
Forward
		
Invite David Fishburn to chat
		
Reply
|
David Fishburn	
On Mon, May 10, 2010 at 4:03 AM, yosi izaq <izaqyos@gmail.com> wrote: ... Oka...
	
4:10 PM (2 hours ago)
David FishburnLoading...	
4:10 PM (2 hours ago)
David Fishburn
 to me
	
show details 4:10 PM (2 hours ago)
	
On Mon, May 10, 2010 at 4:03 AM, yosi izaq <izaqyos@gmail.com> wrote:
...
>> Two things:
>>
>> 1.  After opening the email in Vim, please provide the output from:
>> :au outlook
>>
>> You can select this with your mouse and hit CTRL-Y, then paste it into
>> this email.  It should look something like this:
>> ****
>> :au outlook
>> --- Auto-Commands ---
>> outlook  BufEnter
>>    *.outlook setlocal filetype=mail
>> outlook  BufUnload
>>    *.outlook if expand('%:e') == 'outlook' | call
>> delete(expand('%:p').'.ctl') | call delete(expand('%:p')) | endif
>> outlook  BufWritePost
>>    *.outlook setlocal autoread | let g:outlook_cscript_output =
>> system('cscript "C:\Vim\vimfiles\plugin\outlookvim.js"
>> "'.expand("%").'"  ')| bdelete | if g:outloo
>> k_cscript_output =~ 'outlookvim:' | call Outlook_WarningMsg(
>> substitute(g:outlook_cscript_output, '^.*\(outlookvim:.*\)', '\1', '')
>> ) | endif
>> ****
>>
> Doesn't look good. I get:
> E216: No such group or event: outlook

Okay, that is the key to the trouble.

Are you overriding any values from within your .vimrc?

Have you edited the outlook.vim file in anyway?

Now, can you run each of the commands below and tell me what the
result is for each one.

   let g:outlook_javascript = expand('$VIM/vimfiles/plugin/outlookvim.js')

:echo strlen(globpath(substitute($PATH, '\\\?;', ',', 'g'), 'cscript.exe'))

:echo exists('g:outlook_javascript')

:echo filereadable(expand(g:outlook_javascript))

:echo has('autocmd')

:echo exists("g:loaded_outlook")

Thanks,
Dave
Reply
		
Forward
		
Invite David Fishburn to chat
		
Reply
|
yosi izaq	
inline 10x, Yosi I've made no changes to my .vimrc after installing your plugin.
	
5:08 PM (1 hour ago)
yosi izaqLoading...	
5:08 PM (1 hour ago)
yosi izaq
 to David
	
show details 5:08 PM (1 hour ago)
	
inline

10x,
Yosi
>> Doesn't look good. I get:
>> E216: No such group or event: outlook
>
> Okay, that is the key to the trouble.
>
> Are you overriding any values from within your .vimrc?
I've made no changes to my .vimrc after installing your plugin.

>
> Have you edited the outlook.vim file in anyway?
No

>
> Now, can you run each of the commands below and tell me what the
> result is for each one.
>
>    let g:outlook_javascript = expand('$VIM/vimfiles/plugin/outlookvim.js')
I don't see any result. It looks like it's doing something but I get no message.

>
> :echo strlen(globpath(substitute($PATH, '\\\?;', ',', 'g'), 'cscript.exe'))
31

>
> :echo exists('g:outlook_javascript')
1

>
> :echo filereadable(expand(g:outlook_javascript))
0

>
> :echo has('autocmd')
1

>
> :echo exists("g:loaded_outlook")
0

>
> Thanks,
> Dave
>
Reply
		
Forward
		
		
Reply
|
David Fishburn
 to me
	
show details 5:45 PM (1 hour ago)
	

:echo filereadable(expand(g:outlook_javascript))

    0
     


Okay, so we have found the reason the plugin is not creating the autocmds.

One thing that should have happened, is after you started Vim, if you did:
:messages

It should have shown an error indicating it could not find that file.

Let's try to figure out why though.

If you can execute these commands again:
:let g:outlook_javascript = expand('$VIM/vimfiles/plugin/outlookvim.js')


And provide the output from each of these:

:echo g:outlook_javascript

:echo filereadable(expand(g:outlook_javascript))
:exec '!dir "'.  g:outlook_javascript . '"'
:exec '!dir "'.  fnamemodify(expand(g:outlook_javascript), ':p:h') . '\out*"'


Thanks,
Dave

Reply
		
Forward
		
Invite David Fishburn to chat
		
[It's All Text!]
Reply
|
yosi izaq
 to David
	
show details 5:52 PM (57 minutes ago)
	
inline

thx,
Yosi

On Mon, May 10, 2010 at 5:45 PM, David Fishburn <dfishburn.vim@gmail.com> wrote:
>
> :echo filereadable(expand(g:outlook_javascript))
>
>> 0
>>
>
> Okay, so we have found the reason the plugin is not creating the autocmds.
>
> One thing that should have happened, is after you started Vim, if you did:
> :messages
>
> It should have shown an error indicating it could not find that file.
yeap.

>
> Let's try to figure out why though.
>
> If you can execute these commands again:
> :let g:outlook_javascript = expand('$VIM/vimfiles/plugin/outlookvim.js')

>
>
> And provide the output from each of these:
>
> :echo g:outlook_javascript
c:\Program Files\Vim\vim72\plugin\outlookvim.js

> :echo filereadable(expand(g:outlook_javascript))
0
> :exec '!dir "'.  g:outlook_javascript . '"'
!dir "c:\Program Files\Vim\vim72\plugin\outlookvim.js"
C:\WINDOWS\system32\cmd.exe /c dir "C:/Program Files/Vim/vimfiles/plugin/outlook
vim.js"
 Volume in drive C is System
 Volume Serial Number is 34C6-75D2

 Directory of C:\Program Files\Vim\vimfiles\plugin

File Not Found
shell returned 1
Hit any key to close this window...

> :exec '!dir "'.  fnamemodify(expand(g:outlook_javascript), ':p:h') .
> '\out*"'
!dir "c:\Program Files\Vim\vim72\plugin\outlookvim.js\out*"
C:\WINDOWS\system32\cmd.exe /c dir "C:/Program Files/Vim/vimfiles/plugin\out*"
 Volume in drive C is System
 Volume Serial Number is 34C6-75D2

 Directory of C:\Program Files\Vim\vimfiles\plugin

File Not Found
shell returned 1
Hit any key to close this window...


>
>
> Thanks,
> Dave
>
>
Reply
		
Forward
		
		
[It's All Text!]
Reply
|
David Fishburn
 to me
	
show details 6:24 PM (24 minutes ago)
	
On 1


:exec '!dir "'.  g:outlook_javascript . '"'

    !dir "c:\Program Files\Vim\vim72\plugin\outlookvim.js"
    C:\WINDOWS\system32\cmd.exe /c dir "C:/Program Files/Vim/vimfiles/plugin/outlook
    vim.js"
     Volume in drive C is System
     Volume Serial Number is 34C6-75D2

     Directory of C:\Program Files\Vim\vimfiles\plugin

    File Not Found
    shell returned 1
     


If you unzipped the file correctly, that file should have been there.
Can you open up the ZIP file and see what files are included.
Could it be your anti-virus software preventing .js files from being installed?



        :exec '!dir "'.  fnamemodify(expand(g:outlook_javascript), ':p:h') .
        '\out*"'
           

    !dir "c:\Program Files\Vim\vim72\plugin\outlookvim.js\out*"
     

What I was really looking for was this:

dir "c:\Program Files\Vim\vim72\plugin\out*"


So, it is up to you to figure out why all the files from OutlookVim_v3.zip are not on your hard drive.

There should be 4 files:
vimfiles\
doc\outlook.txt
plugin\outlook.vim
plugin\OutlookVim.bas
plugin\outlookvim.js

Dave

Reply
		
Forward
		
Invite David Fishburn to chat
		
Reply
|
David Fishburn
 to me
	
show details 6:26 PM (23 minutes ago)
	
Okay, so we have found the reason the plugin is not creating the autocmds.

        One thing that should have happened, is after you started Vim, if you did:
        :messages

        It should have shown an error indicating it could not find that file.
           

    yeap.
     


By the way, when you upgraded to OutlookVim 3.0, make sure you also update the Macro in Outlook with the new code.

Dave

Reply
		
Forward
		
Invite David Fishburn to chat
		
[It's All Text!]
Reply
|
yosi izaq
 to David
	
show details 6:37 PM (11 minutes ago)
	
Thanks for the tip.
The files are there however:
$ ls -lrt Program\
Files/Vim/vim72/plugin/ | tail
-rwx------+ 1 <user> ????????   8332 2010-02-02 10:19 vcshg.vim
-rwx------+ 1 <user> ????????   8036 2010-02-02 10:19 vcsgit.vim
-rwx------+ 1 <user> ????????  13728 2010-02-02 10:19 vcscvs.vim
-rwx------+ 1 <user> ????????  48965 2010-02-02 10:19 vcscommand.vim
-rwx------+ 1 <user> ????????   8040 2010-02-02 10:19 vcsbzr.vim
-rwx------+ 1 <user> ????????  34637 2010-02-02 13:04 bufexplorer.vim
-rwx------+ 1 <user> ???????? 164515 2010-02-02 14:24 c.vim
-rwxrwx---+ 1 <user> mkpasswd   4287 2010-05-09 21:58 outlookvim.js
-rwxrwx---+ 1 <user> mkpasswd   7919 2010-05-09 22:51 OutlookVim.bas
-rwxrwx---+ 1 <user> mkpasswd   6397 2010-05-10 10:59 outlook.vim
$ ls -lrt Program\
Files/Vim/vim72/doc/ | tail
-rwx------+ 1 <user> ????????  15414 2009-12-01 14:02 uganda.nsis.txt
-rwx------+ 1 <user> ????????  50021 2009-12-01 22:20 NERD_tree.txt
-rwx------+ 1 <user> ????????  48949 2009-12-17 22:36 rails.txt
-rwx------+ 1 <user> ???????? 108911 2009-12-28 13:47 perlsupport.txt
-rwx------+ 1 <user> ????????  62901 2010-01-31 12:05 bashsupport.txt
-rwx------+ 1 <user> ????????  30724 2010-02-02 10:19 vcscommand.txt
-rwx------+ 1 <user> ????????  93544 2010-02-05 14:27 csupport.txt
-rwx------+ 1 <user> ????????  26709 2010-02-10 11:12 bufexplorer.txt
-rwx------+ 1 <user> ???????? 424680 2010-05-09 11:33 tags
-rwxrwx---+ 1 <user> mkpasswd  10845 2010-05-09 22:22 outlook.txt

And just in case I manually created outlook dir and copied the files to there.
$ ls -lrt Program\
Files/Vim/vim72/plugin/outlook | tail
total 24
-rwxrwx---+ 1 <user> mkpasswd 4287 2010-05-09 21:58 outlookvim.js
-rwxrwx---+ 1 <user> mkpasswd 6397 2010-05-09 22:44 outlook.vim
-rwxrwx---+ 1 <user> mkpasswd 7919 2010-05-09 22:51 OutlookVim.bas
Reply
		
Forward
		
		
[It's All Text!]
Your message has been sent.
Reply
|
yosi izaq
 to David
	
show details 6:48 PM (1 minute ago)
	
ok, I found the root cause and fixed it.

I have GVIM for windows. It has this dir struct:
vim\
   vim72\ (all VIM regular dirs and files)
   vimfiles

I put the script in vim/vim72/plugin but it looks for the js in
vimfiles. Once I copied it 2 there it started working :)

10x,
Yosi
```

### 19.26.2 Install

```text
|3. Installing the plugin				*outlook-install*

 You can use this script as a plugin by copying it to your plugin directory. 
 See |add-global-plugin| for instructions.
 
 You can also |:source| it from your |.vimrc|.

 To install this help file |add-local-help| inside Vim.
 	:help add-local-help
	:helptags $VIM/vimfiles/doc (Windows)

 Files used by the plugin:
    outlook.vim
        - Sets up autocmds which are activated when editing a file
          which ends in .outlook
    outlookVim.bas
        - Visual Basic code used by Outlook to create some temporary files
          and launch Vim.
    outlookVim.js
        - A Javascript file called by the Vim autocmds when the file is saved.
          It uses Outlook APIs to update the email within Outlook.
    outlook.txt
        - This document

 NOTE:
     Vim must be in nocompatible mode for the plugin to operate correctly.
     This implies you have this line in your |.vimrc|: >
        set nocompatible 
<


==============================================================================
|4. Installing the Outlook macro				*outlook-macro*

 The macro is used to add a button in Outlook to lauch Vim.  It is used to
 create the files which Vim will edit.  It will also add a shortcut key
 (Alt-d) to fire up Vim instead of having to use a mouse.

 To install the Outlook macro flip over to Outlook.

|  1.  From the Outlook menu Tools->Macro->Security 
        Outlook 2003
             - Make sure this is set to Medium, or the macro will not be enabled 
        Outlook 2007
             - Make sure this is set to Warnings for all macros
|  2.  From the menu Tools->Macro->Visual Basic Editor (or Alt-F11)
|  3.  From the menu File->Import File (or Ctrl-M)
|  4.  Choose the file ...\vimfiles\plugin\OutlookVim.bas (where ever you
      installed the plugin).
|  5.  Expand the Modules folder in the Project pane
|  6.  Right click on Module1 and choose Project Properties
|  7.  Change the project name to "Vim"
|  8.  Change the project description to "Edit emails with Vim"
|  9.  From the menu File->Save (or Ctrl-S)
| 10.  Close the Visual Basic Editor 
| 11.  Double click on an email 
| 12.  Adding toolbar buttons
        Outlook 2003
             - Right click on the toolbar (of the email message) and choose
               "Customize"
             - Choose the Commands tab 
             - Click on the Macros category
             - Drag and drop the Vim.Edit macro onto the end of the Standard 
               toolbar displayed in the currently open email 
             - Click on the Rearrange Commands button 
             - Change the radio button to Toolbar: Standard 
             - Scroll to the bottom where the Vim.Edit button is and highlight it
             - Click on the Modify Selection button
             - On the dropdown which appears, click on Name
             - Change the name from "Vim.Edit" to "Vim.E&dit" 
                - Now you can press Alt-d as a shortcut to launch Vim to edit 
                  the email without having to use the mouse to click on the 
                  button (after all, that is the Vim way)
             - Hit Enter, Close and Close to return back to the open email
             - Click on the Vim.Edit button, or hit Ctrl-d to edit the email using Vim
        Outlook 2007
             - Toolbars are not editable in Outlook 2007
             - A new Quick Access Toolbar has been introduced in the titlebar
               of the open email
             - Click on the far right and choose "Customize Quick Access
               Toolbar" 
             - Click on "More Commands..."
             - Change the "Choose commands from" to "Macros"
             - Vim.Edit should be displayed, add it using the "Add >>" button
             - Click the Vim.Edit button in the right pane and click the
               "Modify" button below
             - Here you can assign some icon to it that will be easily 
               recognisable
             - Click on the new button in the Quick Access Toolbar
| 13.  Make a minor change to the email (in Vim) and :w
| 14.  Verify the Outlook email has the same change 
| 15.  Hit Escape to close the Outlook email, you will be prompted to Save 
      the changes you have just made.  So you always have an option of 
      cancelling the changes you made in Vim, in Outlook.


 If you changed the Macro Security settings you must restart Outlook 
 for these changes to be active.
  

==============================================================================
|5. Configuration					*outlook-configuration*

 The behavior of outlook.vim is governed by several variables. These variables
 are used by the autocmds which are created by the plugin.  These variables can
 be assigned global defaults which can be set in your |.vimrc|. 

 You can override many of the features of this script by creating various
 variables within your vimrc.
                                                                          
 The outlookvim.js (javascript) file tells Outlook to re-read the message from
 the temporary file.  This allows you to rename it, or place it in any
 location you want.  Here are some examples: >
     let g:outlook_javascript = '$VIM\vimfiles\plugin\outlookvim.js'  (default)
     let g:outlook_javascript = 'C:\Documents and Settings\Username\My Documents\outlookvim.js'
     let g:outlook_javascript = expand('$APPDATA\Microsoft\outlookvim.js')
     let g:outlook_javascript = expand('$USERPROFILE\Application Data\Microsoft\outlookvim.js')
<
 This setting (default = '') will force all emails to be edited in a particular
 Vim instance.  If the instance has not be started, a message is displayed
 with an example command line to start an appropriate Vim. >
     let g:outlook_servername = ''
<
 This setting (default = 1) overrides the default textwidth the mail ftplugin sets.  This
 allows you to automatically format text using gq by setting the following: >
     let g:outlook_textwidth = 76
<
 When you save a file, by default, Outlook will be updated and the temporary
 file you are editing will be deleted.  Autoread was added so that the Vim
 buffer is automatically cleared instead of displaying a warning message
 indicating the file has changed outside of Vim (in fact it was deleted).  If
 you wish to see the warning, you can set (default = 1) the following: >
     let g:outlook_noautoread = 1
<                                                                    
 When you save a file, by default, Outlook will be updated and the temporary
 file you are editing will be deleted.  Since the file has been deleted, you
 are left editing a file that no longer exists.  By default, the Vim buffer
 will be deleted automatically, unless this option (default = 1) is set. >
     let g:outlook_nobdelete = 1
<
 If you do not save the temporary file and instead decide to throw away your
 changes, the temporary files will be cleaned up.  This option (default = 1)
 will leave the files in the temporary directory instead of removing them. >
     let g:outlook_nodelete_unload = 1
<
 This setting (default = 1) will prevent the script from automatically turning
 on Vim's autoindent feature.  It will use your default setting instead. >
     let g:outlook_noautoindent = 1
<
 This setting (default = 1) will capture the output when attempting to update
 Outlook. >
     let g:outlook_save_cscript_output = 1
<
 This setting (default = 1) will show any errors reported when attempting
 to update Outlook.  This debugging output should help identify where
 any problems may lie. >
     let g:outlook_view_cscript_error = 1
<
                                                               
  vim:tw=78:fo=tcq2:ts=8:ft=help:norl:
```

### 19.26.3 usage
