---
type: reference
title: "VIM interaction with different applications, tools"
description: "Legacy vim KB section: VIM interaction with different applications, tools (Firefox and VIM - vimperator, Tutorial, Initialization)"
tags: [vim, legacy, reference]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#55"
---

# VIM interaction with different applications, tools

[↑ KB_vi](/vi/kb-vi/README.md)

## 55.1 Firefox and VIM - vimperator

```text
http://vimperator.org/trac/wiki/Vimperator
Vimperator is a free browser add-on for Firefox, which makes it look and behave like the Vim text editor. It has similar key bindings and you could call it a modal web browser, as key bindings differ according to which mode you are in.

Warning: To provide the most authentic Vim experience, Vimperator hides the Firefox menubar and toolbar by default. Most users find them unnecessary once they're used to Vimperator, but if you really need them, type: :set guioptions+=mT to get them back.
If you don't like Vimperator at all, you can uninstall it by typing :addons and removing/disabling it.
If you like it, but can't remember the shortcuts, press F1 or :help.

Vimperator was initially written by Martin Stubenschrott but has found many other contributors in the meanwhile. If you appreciate the work on Vimperator and want to encourage us working on it more, you can send us greetings, patches, or donations (thanks a lot to these people who already did): 

Features ¶

screenshot_linux-small.png

    * Vim-like keybindings (h, j, k, l, gg, G, 0, $, ZZ, <C-f>, etc.)
    * Ex commands (:quit, :open www.foo.com, ...)
    * Tab completion available for all commands with support for 'longest' matching when set in 'wildmode'
    * Extensions! Yes, you can extend Vimperator's functionality with scripts just like you can extend Firefox with extensions.
    * Explore JavaScript objects with :echo window and even context-sensitive tab completion.
    * Hit-a-hint like navigation of links (start with f to follow a link)
    * Advanced completion of bookmark and history URLs (searching also in title, not only URL)
    * Vim-like statusline with a wget-like progress bar
    * Minimal GUI (easily hide useless menubar and toolbar with :set guioptions=)
    * Ability to :source JavaScript files, and to use a ~/.vimperatorrc file with syntax highlighting if you install vimperator.vim
    * Easy quick searches (:open foo will search for "foo" in google, :open ebay terminator will search for "terminator" on ebay) with support for Firefox keyword bookmarks and search engines
    * Count supported for many commands (3<C-o> will go back 3 pages)
    * Beep on errors
    * Marks support (ma to set mark 'a' on a webpage, 'a to go there)
    * QuickMarks support (quickly go to previously marked web pages with go{a-zA-Z0-9})
    * :map and :command support (and feedkeys() for script writers)
    * :time support for profiling
    * Move the text cursor and select text with vim keys and a visual mode.
    * External editor support
    * Macros to replay key strokes
    * AutoCommands to execute action on certain events
    * A comprehensive :help, explaining all commands, mappings and options.
    * Much more... 
```

### 55.1.1 Tutorial

```text
Vimperator

This is a quickstart tutorial to help get new users up and running in Vimperator. It is not indented as a full reference explaining all features.

Quick-start tutorial
	tutorial

If you've started using Vimperator from scratch (i.e., without any customization), you should be looking at this help page in a relatively bare-looking window. The menubar, navigation bar, and bookmark bars are hidden. In case you missed the notice in the Introduction, you can regain these by issuing the command

:set go+=mTb<cr>

where cr represents pressing the <Enter> or <Return> key. If you're a veteran Vim user, this may look familiar. It should.

However, in this author's opinion, the best way to get familiar with Vimperator is to leave these disabled for now. (The above action can be reversed with :set go=<cr>) You can look at the entry for guioptions in options for more information on this.

Vimperator's modal interface
	modal

Vimperator's power, like Vim's, comes from it's modal interface. Keys have different meanings depending on which mode the browser is in. Vimperator has several modes, but the 2 most important are ¿normal¿ mode and ¿command-line¿ mode.

When Vimperator starts, it is in normal mode by default. This is probably where you will spend the majority of your time.

The other core mode of Vimperator, command-line mode, can be entered from normal mode by typing a ':' (colon). You will frequently see Vimperator commands start with a ':', indicating that what follows is a command.

To return to normal mode command-line mode, type <Esc>. Pressing <Esc> will also return you to normal mode from most other modes in Vimperator.

Getting help
	getting_help

Vim is a great editor but it's not much of a web browser. So even seasoned Vim users will probably have to look at Vimperator documentation sooner or later. Most of the documentation for Vimperator's features are easily found using the :help command. For example, you can find help on the :help command by typing

:help :help<cr>

Similarly, help on configurable options is available with :help '{option_name}'. (Note the single quotes around the option name as in Vim.) Information on all available options is, predictably, :help options.

and you can find out about the gt and gT mapping with

:help gt<cr>
:help gT<cr>

Finally, in addition to the help system itself, :exusage and :viusage are useful quick-reference commands.

Mouseless
	living_mouseless

 or how I learned to stop worrying and love the 80+ buttons I already have.

The efficiency of Vimperator, as with the legendary editor it was inspired by, relies on the user being able to keep his fingers on the keyboard where they can do the most good. While there are some areas where the mouse is clearly superior at, such as GUI design or some games, Vimperator acts on the assumption that the web browser doesn't have to be one of those.

Here are some areas where the mouse is typically considered indisposable, and how Vimperator challenges this preconception.

Scrolling
	keyboard_scrolling

Scrolling the browser window is done with simple keystrokes:

    * j/k  scroll window down/up by one line, respectively
    * h/l  scroll window left/right
    * <Space>/<C-b>  scroll down/up by one page
    * <C-d>/<C-u>  scroll down/up by 1/2 page

Your standard buttons (<Up>/<Down>/<PgUp>/<PgDn>) will also work as expected.

History and tabs
	tab_navigation history_navigation

History navigation (e.g., ¿Back¿, ¿Forward¿) are done similarly to scrolling.

    * <C-o>/<C-i>  move Back/Forward in the current window/tab's history, respectively

Move between tabs using these keystrokes which may also be familiar to tabbing Vimmers.

    * gt/<C-n>  go to the next tab
    * gT/<C-p>  go to the previous tab
    * g0/g$  go to the first/last tab
    * d  close the active tab (delete the buffer)

To open a web page in a new tab, use the :tabopen {url}. To open a URL in the current tab, use :open. The normal mode mappings t and o, respectively, map to these commands, so the following pairs sequences are equivalent:

:open my.webmail.com<cr>
omy.webmail.com<cr>

:tabopen vimperator.mozdev.org<cr>
tvimperator.mozdev.org<cr>

Some hints about surfing¿
	hints.html

So now you can navigate around in Vimperator. But wait¿ how do you open a page or tab linked in a web page? How do you ¿click¿ on all those links without your tailed friend?

The answer is ¿hints¿. Activating hints displays a number next to every link Vimperator can find. To follow the link, simply type the number corresponding to the hint, a white number inside a red square by default.

For text links, there's an additional shortcut; you can type some text contained in the link and Vimperator will search all the links it can find and only hint the matching links, further narrowing down the list. If the text you type uniquely identifies any given link, Vimperator will follow that link immediately without any further user input.

Whichever way you choose to indicate your target link, once Vimperator has highlighted the link you want, simply hit <Enter> to open it.

The most common hint mode is called QuickHint mode. To activate QuickHint mode, press either f or F. The lower-case f will open the resulting link in the current tab, while the upper-case F will open it in a new tab.

To test it, try this link: Vimperator Homepage. Activate QuickHint mode with f or F to highlight all currently visible links. The start typing the text of the link. The link should be uniquely identified soon, and Vimperator will open it. Once you're done, remember to use <C-o> (¿History Back¿) or d (¿Delete Buffer¿) to return here, depending on which key you used to activate QuickHint mode.

Common issues
	common_issues

Say you get half-way done typing in a new URL, only to remember that you've already got that page open in the previous tab. Your command-line might look something like this:

:open my.partial.url/fooba

You can exit the command-line and access the already loaded page with the following:

<Esc>gT

Saving for posterity - vimperatorrc
	vimperatorrc

Once you get Vimperator set up with your desired options, maps, and commands, you'll probably want them to be available the next time you open Vimperator. Continuing the Vim theme, this is done with a vimperatorrc file.

To save your current settings and allow them to be loaded automatically next time you start Vimperator, issue the :mkv command.

This will create the file $HOME/.vimperatorrc containing your settings. It is a simple text file, just like a vimrc file and can be easily edited to suit your preferences.

Find the exit nearest you
	quitting_without_menus

Vimperator supports all of Vim's classic methods of exiting.

    * :xall  command to quit and save the current browsing session for next time; the default.
    * :qall  command to quit without saving the session
    * ZZ  normal mode mapping equivalent to :xall
    * ZQ  normal mode mapping equivalent to :qall

Where did Firefox go?
	whither_firefox

You might feel pretty disoriented now. Don't worry. This is still Firefox underneath. Here are some ways Vimperator allows Firefox to shine through. See the :help for these commands and mappings for more information on how to make the best use of them.

    * :dialog  To access some of Firefox's many dialog windows, you can use the :dialog command. See :help :dialog.
    * :bmarks  Vimperator provides a new interface to bookmarks, but they're still your standard Firefox bookmarks under the hood. :bmark will add a new bookmark, while :bmarks will list the bookmarks currently defined.
    * :history  It's exactly what it sounds like. This command will display a colorized, scrollable and clickable list of the locations in Vimperator's history.

Feel free to explore at this point. If you use the :tabopen command, remember to use the gt/gT mappings to get back to this page. If using the :open command, use the history keys (e.g., H) to return. If you get hopelessly lost, just type :help<cr> and click the ¿Tutorial¿ link to return.

Get me out of here!
	removal

If you've given it a fair shot and determined ¿ TODO

The Vimperator way to do this is with the command :addons. Issuing this command brings up the Firefox Add-ons dialog window; you can then remove it as normal, selecting Vimperator from the list and clicking (yes, clicking) Uninstall.

Alternatively, you can do this the old-fashioned way: re-enable the menubar, as above, with :set go+=m, and select Add-ons from the Tools menu.

I'm interested¿but lost!
	support

Vimperator has an energetic and growing user base. If you've run into a problem that you can't seem to solve with Vimperator, or if you think you might have found a bug, please let us know! There is support available on the wiki, or in the #vimperator IRC channel on freenode.

If you have any feature requests or (even better) offers to help, we'd love to hear from you as well. Developers work on Vimperator whenever possible, but we are neither infinite nor omnipotent; please bear with us. If you can't wait for us to get around to it, rest assured patches are welcome! See the Developer page for more information.
```

### 55.1.2 Initialization

```text
	startup initialization

At startup Vimperator sources a user RC file, containing Ex commands, and any JavaScript files found in the plugin directory. The RC file may be named .vimperatorrc or _vimperatorrc. The search order is:

    * Unix and Mac: ~/.vimperatorrc then ~/_vimperatorrc
    * Windows - ~/_vimperatorrc then ~/.vimperatorrc

The plugin directory is named:

    * Unix and Mac - ~/.vimperator/plugin
    * Windows - ~/vimperator/plugin

The user's '$HOME'(~) directory is determined as follows:

    * Unix and Mac - $HOME is used.
    * Windows - if %HOME% is set then this is used, otherwise %USERPROFILE% or finally %HOMEDRIVE%%HOMEPATH%.

$VIMPERATOR_HOME can be used to override the calculated $HOME directory.

Saving settings
	save-settings

:mkv :mkvimperatorrc
:mkv[imperatorrc][!] [file]

Write current key mappings and changed options to [file]. If no [file] is specified then ~/.vimperatorrc is written unless this file already exists. The special version :mkvimperatorrc! will overwrite [file] if it exists.

Warning: this differs from Vim's behavior which defaults to writing the file in the current directory.

Restarting
	restarting

:res :restart
:res[tart]

Force the browser to restart. Useful when installing extensions.
```

### 55.1.3 Browsing

```text
Vimperator overrides nearly all Firefox keys in order to make browsing more pleasant for Vim users. In the rare occurrences where you want to pass a keystroke to the web page or to Firefox to retain its original meaning you have 2 possibilities:

pass-through <C-z> CTRL-Z


CTRL-Z

Disable all Vimperator keys except <Esc> and pass them to the next event handler. This is especially useful, if JavaScript controlled forms like the RichEdit form fields of Gmail don't work anymore. To exit this mode, press <Esc>. If you also need to pass <Esc> in this mode to the web page, prepend it with CTRL-V.

send-key <C-v> CTRL-V


CTRL-V

If you only need to pass a single key to a JavaScript form field or another extension prefix the key with <C-v>. Also works to unshadow Firefox shortcuts like <C-o> which are otherwise hidden in Vimperator. When Vimperator mode is temporarily disabled with <C-q>, <C-v> will pass the next key to Vimperator instead of the web page.


Opening web pages

opening 	

o :o :open 

:o[pen][!] [arg1], [arg2], 

o

Open one or more URLs in the current tab. Multiple URLs can be separated with 'urlseparator' (default: ", " Note that the space after the comma is required." ") Each token is analyzed and in this order:

Opened as a local file if it is an existing relative or absolute filename. 

:open /etc/fstab shows the file system table. 

:open ../other/foo.html in your home directory opens /home/other/foo.html 

Opened with the specified search engine if the token looks like a search string and the first word is the name of a search engine (:open wikipedia linus torvalds opens the Wikipedia entry for linus torvalds). The short name of a search engine is automatically guessed from its name. If you want to set a custom name, you can change it with :dialog searchengines. 

Opened with the default search engine or keyword (specified with the 'defsearch' option) if the first word is no search engine (:open linus torvalds opens a Google search for linux torvalds). 

Passed directly to Firefox in all other cases (:open www.osnews.com, www.slashdot.org opens OSNews in the current, and Slashdot in a new background tab). 

You can use :open -tags linux torvalds<Tab> to complete bookmarks with tag "linux" and which contain "torvalds". Note that -tags support is only available for tab completion, not for the actual command. The items which are completed on <Tab> are specified in the 'complete' option. Without argument, reloads the current page. Without argument but with [!], reloads the current page skipping the cache.

t :t :tabopen :tabnew :tabe :tabedit 

:tabopen[!] [arg1], [arg2], 

t Just like :open, but opens the resulting web page(s) in a new tab. When used with [!], the 'tabopen' value of the 'activate' option is negated.

Open one or more URLs in a new tab, based on current location. Works like t, but preselects current URL in the :tabopen query.

:tabd :tabduplicate 

:[count]tabd[uplicate][!]


Duplicates current tab [count] times. Uses 'tabopen' value of the 'activate' to determine if last cloned tab should be activated. When used with [!], 'tabopen' value is negated.

O Open one or more URLs in the current tab, based on current location. Works like o, but preselects current URL in the :open query.

:winopen :wopen :winedit 

:wino[pen][!] [arg1], [arg2], 


Just like :open, but opens the resulting web page(s) in a new window.

<MiddleMouse> p


p 
Open (put) a URL based on the current clipboard contents in the current buffer. You can also just select (for non-X11 users: copy) some non-URL text, and search for it with the default search engine or keyword (specified by the 'defsearch' option) with p.

P Open (put) a URL based on the current clipboard contents in a new buffer. Works like p, but opens a new tab.
Whether the new buffer is activated, depends on the 'activate' option.

gP Open (put) a URL based on the current clipboard contents in a new buffer. Works like P, but inverts the 'activate' option.

<C-x> 

[count]<C-x>

Decrements the last number in URL by 1, or by count if given.

<C-a> 

[count]<C-a>

Increments the last number in URL by 1, or by count if given.

~ Open home directory. You can also use the hints and have the probably fastest file browser on earth. :)


Navigating

navigating 	

H <C-o> CTRL-O :ba :back 

:[count]ba[ck][!] [url]

CTRL-o

Go [count] pages back in the browser history. The special version :back! goes to the beginning of the browser history.

L <C-i> CTRL-i :fo :fw :forward 

:[count]fo[rward][!] [url]

CTRL-i

Go [count] pages forward in the browser history. The special version :forward! goes to the end of the browser history.

:ju :jumps 

:ju[mps]

List all jumps aka current tab's history aka session history.

Current history position is marked with >, jump numbers are counters to be used with :back (above zero record) or :forward (below zero record).

gh Go home. Opens the homepage in the current tab.

gH Go home in a new tab. Opens the homepage in a new tab. Whether the new tab is activated or not depends on the 'activate' option.

gu 

[count]gu

Go to [count]th parent directory.


| 2gu on http://www.example.com/dir1/dir2/file.htm opens http://www.example.com/dir1/.

gU Go to the root of the web site.


gU on http://www.example.com/dir1/dir2/file.htm opens http://www.example.com/. When browsing a local directory, it goes to the root directory.

reloading 	

r Force reloading of the current page.

R Force reloading of the current page skipping the cache.

:re :reload


:re[load][!]

Reload current page. Forces reloading of the current page. If [!] is given, skip the cache.

:reloada :reloadall


:reloada[ll][!]

Reload all pages. Forces reloading of all pages. If [!] is given, skip the cache.

stopping 	

<C-c> Stop loading the current web page.

:st :stop 

:st[op] Stop loading. Stop loading current web page.


Writing

save-file writing 	

:w :write :sav :saveas


:sav[eas]

Save current web page to disk. Opens the original Firefox "Save page as" dialog. There, you can save the current web page to disk with various options. Use [!] to save the file with a default filename to the current working directory, skipping the "Save as" prompt


Quitting

save-session quitting 	

:q :quit


:q[uit]

Quit current tab. If this is the last tab in the window, close the window. If this was the last window, close Vimperator. When quitting Vimperator, the session is not stored.

:qa :qall :quita :quitall


:quita[ll]

Quit Vimperator. Quit Vimperator, no matter how many tabs/windows are open. The session is not stored.

:wc :wclose :winc :winclose 

:winc[lose]


Close window.

:xa :xall :wq :wqa :wqall 

:wqa[ll]

:xa[ll]

Save the session and quit. Quit Vimperator, no matter how many tabs/windows are open. The session is stored. :wq is different as in Vim, as it closes the window instead of just one tab by popular demand. Complain on the mailing list, if you want to change that.

ZQ 

ZQ

Quit and don't save the session. Works like :qall.

ZZ 

ZZ

Quit and save the session. Quit Vimperator, no matter how many tabs/windows are open. The session is stored. Works like :xall.


The current directory

current-directory 	

:chd :chdir :cd 

:cd [-|path]

Change the current directory. :cd - changes to the last directory.

:pw :pwd 

:pw[d]

Print the current directory name.
```

### 55.1.4 Buffers

```text
Vimperator holds exactly one buffer object for each tab. It is usually an (X)HTML document with advanced features.


Buffer information

buffer-information 	

<C-g>


[count]<C-g> Print the current file name. Also shows some additional file information like file size or the last modified date. If {count} is given print the current file name with full path.

g<C-g> Print file information. Same as :pa[geinfo].

:pa :pageinfo 

:pa[geinfo] Show various page information. See :help 'pageinfo' for available options.

gf View source. Opens the source code of the current web site with the internal editor in the current tab.

gF View source with an external editor. Opens the source code of the current web site with the external editor specified by the 'editor' option. For now the external editor must be able to download and open files from a remote URL.

:vie :viewsource 

:vie[wsource][!] [url] View source code of current document. If [url] is specified then view the source of that document. When [!] is given, it is opened with the external editor.


Motion commands

scrolling motion 	

^ 0 
| 0 
Scroll to the absolute left of the document. Unlike in Vim, 0 and ^ work exactly the same way.

$ Scroll to the absolute right of the document

<Home> gg
[count]gg Goto the top of the document. When used with [count] like in 35gg, it scrolls to 35% of the document.

<End> G 
[count]G Goto the end of the document. When used with [count] like in 35G, it scrolls to 35% of the document.

<Left> h [count]h

Scroll document to the left. Count is supported: 10h will move 10 times as much to the left.
If the document cannot scroll more, a beep is emitted (unless 'visualbell' is set).

<C-e> <Down> j 
[count]j Scroll document down. Count is supported: 10j will move 10 times as much down.
If the document cannot scroll more, a beep is emitted (unless 'visualbell' is set).

<C-y> <Up> k 
[count]k Scroll document up. Count is supported: 10k will move 10 times as much up.
If the document cannot scroll more, a beep is emitted (unless 'visualbell' is set).

<C-d> 
[count]<C-d> Scroll window downwards in the buffer. The number of lines is set by the 'scroll' option which defaults to half a page. If [count] is given 'scroll' is first set to this value.

<C-u> 
[count]<C-u> Scroll window upwards in the buffer. The number of lines is set by the 'scroll' option which defaults to half a page. If [count] is given 'scroll' is first set to this value.

<Right> l 
[count]l Scroll document to the right. Count is supported: 10l will move 10 times as much to the right.
If the document cannot scroll more, a beep is emitted (unless 'visualbell' is set).

<S-Space> <PageUp> <C-b> 
[count]<C-b> Scroll up a full page. Scroll window [count] pages Backwards (upwards) in the buffer.

<Space> <PageDown> <C-f> 
[count]<C-f> Scroll down a full page. Scroll window [count] pages Forwards (downwards) in the buffer.


Jumping to elements

jumping 	

<Tab> Advance keyboard focus to the next element.

<S-Tab> Rewind keyboard focus to the previous element.

gi 
[count]gi Focus last used input field. If there is no last input field, it focuses the first input field. When used with [count] it directly jumps to the [count]th input field.

]f 
[count]]f Focus next frame. Transfer keyboard focus to the [count]th next frame in order. The newly focused frame is briefly colored red. Does not wrap.

[f 
[count][f Focus previous frame. Transfer keyboard focus to the [count]th previous frame in order. The newly focused frame is briefly colored red. Does not wrap.

]] 
[count]]] Open link labeled with "next" or ">". Useful when browsing forums or documentation. Change 'nextpattern' to modify its behavior. It follows relations between files too.

[[ 
[count][[ Open link labeled with "prev", "previous" or "<". Useful when browsing forums or documentation. Change 'previouspattern' to modify its behavior. It follows relations between files too.


Zooming

zooming 	

+ zi [count]
zi Enlarge text zoom of current web page. Mnemonic: zoom in

zm 
[count]zm Enlarge text zoom of current web page by a larger amount. Mnemonic: zoom more

- zo 
[count]zo Reduce text zoom of current web page. Mnemonic: zoom out

zr 
[count]zr Reduce text zoom of current web page by a larger amount. Mnemonic: zoom reduce

zz 
[count]zz Set text zoom value of current web page. Zoom value can be between 1 and 2000%. If it is omitted, text zoom is reset to 100%.

zI 
[count]zI Enlarge full zoom of current web page. Mnemonic: zoom in

zM 
[count]zM Enlarge full zoom of current web page by a larger amount. Mnemonic: zoom more

zO 
[count]zO Reduce full zoom of current web page. Mnemonic: zoom out

zR 
[count]zR Reduce full zoom of current web page by a larger amount. Mnemonic: zoom reduce

zZ 
[count]zZ Set full zoom value of current web page. Zoom value can be between 1 and 2000%. If it is omitted, full zoom is reset to 100%.

:zo :zoom 
:zo[om][!] [value] 
:zo[om][!] +{value} | -{value} Set zoom value of current web page. If [value] can be an absolute value between 1 and 2000% or a relative value if prefixed with "-" or "+". If [value] is omitted, zoom is reset to 100%.

Normally this command operates on the text zoom, if used with [!] it operates on full zoom.


Copying text

yanking copying 	

When running in X11 the text of the following commands is not only copied to the clipboard, but also put into the X11 selection, which can be pasted with the middle mouse button:

y Yank current location to the clipboard. When running in X11 the location is also put into the selection, which can be pasted with the middle mouse button.

Y Copy currently selected text to the system clipboard.


Alternate style sheets

style stylesheet 	

Page authors may specify alternate style sheets for an HTML document. Users can then switch between these various style sheets, selecting their favorite.

:pagest :pagestyle 

:pagest[yle] [stylesheet] Select the author style sheet to apply. If [stylesheet] is not specified the page's default style sheet is used.

All author styling can be removed by setting the 'usermode' option.
```

### 55.1.5 Search commands

### 55.1.6 options

```text
Vimperator has a number of internal variables and switches which can be set to achieve special effects. These options come in 5 forms:

boolean 	can only be on or off 	
number 	has a numeric value 	
string 	has a string value 	
charlist 	like a string but with unique characters 	
stringlist 	a comma-separated list of strings 	


Setting options

E764 set-option 	

:set :se 

:se[t]
Show all options that differ from their default value. 

:se[t] all
Show all options. 

:se[t] {option}?
Show value of {option}. 

:se[t] {option}
Toggle option: set, switch it on. 

Number option: show value.
String option: show value.

:set-default 

:se[t] {option}&
Reset option to its default value. 

:se[t] all&
Set all options to their default value. 

:set-args E487 E521 

:se[t] {option}={value}


Set string or number option to {value}.
For numeric options the value must be given in decimal. The old value can be inserted by typing <Tab>.

:set+= 

:se[t] {option}+={value}


Add the {value} to a number option, or append the {value} to a string option. When the option is a comma separated list, a comma is added, unless the value was empty. If the option is a list of flags, superfluous flags are removed. When adding a flag that was already present the option value doesn't change.

:set^= 

:se[t] {option}^={value}


Multiply the {value} to a number option, or prepend the {value} to a string option. When the option is a comma separated list, a comma is added, unless the value was empty.

:set-= 

:se[t] {option}-={value}


Subtract the {value} from a number option, or remove the {value} from a string option, if it is there. If the {value} is not found in a string option, there is no error or warning. When the option is a comma separated list, a comma is deleted, unless the option becomes empty. When the option is a list of flags, {value} must be exactly as they appear in the option. Remove flags one by one to avoid problems.

:setlocal :setl 

:setl[ocal]

:setl[ocal] all

:setl[ocal] {option}?

:setl[ocal] {option}

:setl[ocal] {option}&

:setl[ocal] all&

:setl[ocal] {option}={value}

:setl[ocal] {option}+={value}

:setl[ocal] {option}^={value}

:setl[ocal] {option}-={value}


The same as :set command, but operates on local for current tab options only. See :set for details.

:setglobal :setg 

:setg[lobal]

:setg[lobal] all

:setg[lobal] {option}?

:setg[lobal] {option}

:setg[lobal] {option}&

:setg[lobal] all&

:setg[lobal] {option}={value}

:setg[lobal] {option}+={value}

:setg[lobal] {option}^={value}

:setg[lobal] {option}-={value}


The same as :set command, but operates on global options only. See :set for details.


Setting Firefox options

firefox-options 	

Most Firefox options are not touched/overridden by Vimperator. In order to set any of these preferences use either of the following:

:prefs :preferences 

:pref[erences]

Show Browser Preferences
You can change the browser preferences from this dialog. Be aware that not all Firefox preferences work, because Vimperator overrides some key bindings and changes Firefox's GUI.

:prefs! :preferences! 

:pref[erences]!

Opens about:config in the current tab where you can change advanced Firefox preferences.

:set-! 

:se[t]! {preference}={value}


Change any Firefox {preference} (those in the about:config window). You can also reset/delete those preferences with :set! {preference}&.


List of options

list-options 	

'act' 'activate' 

'activate' 'act'
stringlist (default: "homepage,quickmark,tabopen,paste") 

Define when tabs are automatically activated. Available items:

homepage 	gH mapping 	
quickmark 	go and gn mappings 	
tabopen 	:tabopen[!] command 	
paste 	P and gP mappings 	

'albc' 'activelinkbgcolor' 

'activelinkbgcolor' 'albc'
string (default: ##88FF00) 

Background color of the current active link during hint mode.

'alfc' 'activelinkfgcolor' 

'activelinkfgcolor' 'alfc'
string (default: black) 

Foreground color of the current active link during hint mode.

'cpt' 'complete' 

'complete' 'cpt'
charlist (default: sfbh) 

Items which are completed at the :[tab]open prompt. Available items:

s 	Search engines and keyword URLs 	
f 	Local files 	
b 	Bookmarks 	
h 	History 	
l 	Firefox location bar entries (bookmarks and history sorted in an intelligent way) 	
S 	Suggest engines 	

The order is important, so :set complete=bs would list bookmarks first, and then any available quick searches. Add "sort" to the 'wildoptions' option if you want all entries sorted. If 'wildoptions' contains "auto", "b" and "h" are not available for performance reasons but you can use "l" to achieve a similar effect. On the other hand "l" does not yet work, when 'wildoptions' does NOT contain "auto".

'ds' 'defsearch' 

'defsearch' 'ds'
string (default: "google") 

Sets the default search engine. The default search engine name is used in the :[tab]open [arg] command if [arg] neither looks like a URL or like a specified search engine/keyword.

This means, it you set 'defsearch' to "youtube", then :open arnold schwarzenegger will be exactly the same as :open youtube arnold schwarzenegger. Therefore, you need to add a keyword or search engine "youtube" first.

'editor' 

'editor'
string (default: "gvim -f") 

Set the external text editor. Sets the editor to run when <C-i> is pressed in INSERT and TEXTAREA modes.
Warning: Vimperator will not behave correctly if the editor forks its own process, such as with gvim without the -f argument.

'eht' 'extendedhinttags' 

'extendedhinttags' 'eht'
string 

(default: //*[@onclick or @onmouseover or @onmousedown or @onmouseup or @oncommand or @class='lk' or @class='s'] | //input[not(@type='hidden')] | //a | //area | //iframe | //textarea | //button | //select | //xhtml:*[@onclick or @onmouseover or @onmousedown or @onmouseup or @oncommand or @class='lk' or @class='s'] | //xhtml:input[not(@type='hidden')] | //xhtml:a | //xhtml:area | //xhtml:iframe | //xhtml:textarea | //xhtml:button | //xhtml:select)

The XPath string of hintable elements activated by ;.

'nofc' 'nofocuscontent' 'fc' 'focuscontent' 

'focuscontent' 'fc'
boolean (default: off) 

Focus the content after a page has loaded. This is useful, if you always want to stay in normal mode when browsing between web sites. When "on", it blurs any textbox which often is automatically focused on page load. If you usually like 'focuscontent' but sometimes you'd like to focus the first input field, you can use gi to jump to it.

'nofs' 'nofullscreen' 'fs' 'fullscreen' 

'fullscreen' 'fs'
boolean (default: off) 

Show the current window fullscreen. Also hide certain GUI elements like the statusline.

'go' 'guioptions' 

'guioptions' 'go'
charlist (default: "") 

Show or hide certain GUI elements like the menu or toolbar. Supported characters:

m 	Menubar 	
T 	Toolbar 	
b 	Bookmark bar 	

You can also hide the tab bar with :set showtabline=0.

'hm' 'hintmatching' 

'hintmatching' 'hm'
string (default: contains) 

Change the hint matching algorithm during hint mode. Possible values:

contains 	The typed characters are split on whitespace, and these character groups have to match anywhere inside the text of the link. 	
wordstartswith 	The typed characters are matched with the beginning of the first word (see 'wordseparators') in the link as long as possible. If no matches occur in the current word, then the matching is continued at the beginning of the next word. The words are worked through in the order they appear in the link. If the typed characters contain spaces, then the characters are split on whitespace. These character groups are then matched with the beginning of the words, beginning at the first one and continuing with the following words in the order they appear in the link. 	
firstletters 	Behaves like wordstartswith, but non matching words aren't overleaped. 	
custom 	Delegate to a custom function: liberator.plugins.customHintMatcher(hintString) 	

'hs' 'hintstyle' 

'hintstyle' 'hs'
string 

(default: z-index:5000; font-family:monospace; font-size:12px; color:white; background-color:red; border-color:ButtonShadow; border-width:0px; border-style:solid; padding:0px 1px 0px 1px; position:absolute;)

CSS specification of hints

'ht' 'hinttags' 

'hinttags' 'ht'
string 

(default: //*[@onclick or @onmouseover or @onmousedown or @onmouseup or @oncommand or @class='lk' or @class='s'] | //input[not(@type='hidden')] | //a | //area | //iframe | //textarea | //button | //select | //xhtml:*[@onclick or @onmouseover or @onmousedown or @onmouseup or @oncommand or @class='lk' or @class='s'] | //xhtml:input[not(@type='hidden')] | //xhtml:a | //xhtml:area | //xhtml:iframe | //xhtml:textarea | //xhtml:button | //xhtml:select)

XPath string of hintable elements activated by f and F

'hto' 'hinttimeout' 

'hinttimeout' 'hto'
number (default: 0) 

Automatically follow non unique numerical hint after 'hinttimeout' milliseconds.
Set to 0 (the default) to only follow numeric hints after pressing <Return> or when the hint is unique.

'hi' 'history' 

'history' 'hi'
number (default: 500) 

Number of Ex commands and search patterns to store in the commandline history.

'nohls' 'nohlsearch' 'hls' 'hlsearch' 

'hlsearch' 'hls'
boolean (default: off) 

Highlight previous search pattern matches

'hlss' 'hlsearchstyle' 

'hlsearchstyle' 'hlss'

string (default: color: black; background-color: yellow; padding: 0; display: inline;)


CSS specification of highlighted search items

'noic' 'noignorecase' 'ic' 'ignorecase' 

'ignorecase' 'ic'
boolean (default: on) 

Ignore case in search patterns.

'nois' 'noincsearch' 'is' 'incsearch' 

'incsearch' 'is'
boolean (default: on) 

Show where the search pattern matches as it is typed.
Note: Incremental searching currently only works in the forward direction.

'noim' 'noinsertmode' 'im' 'insertmode' 

'insertmode' 'im'
boolean (default: on) 

Use Insert mode as the default for text areas. Makes Vimperator work in a way that Insert mode is the default mode for text areas. Useful if you want to use Vimperator as a modeless editor, keeping the known Firefox interface for editing text areas.

'ls' 'laststatus' 

'laststatus' 'ls'
number (default: 2) 

Determines when the last window will have a status line. Possible values:

|0 	Never 	
|1 	Only if there are multiple windows 	
|2 	Always 	

Note: laststatus=1 not implemented yet.

'lbc' 'linkbgcolor' 

'linkbgcolor' 'lbc'
string (default: yellow) 

Background color of a link during hint mode.

'lfc' 'linkfgcolor' 

'linkfgcolor' 'lfc'
string (default: black) 

Foreground color of a link during hint mode.

'nolks' 'nolinksearch' 'lks' 'linksearch' 

'linksearch' 'lks'
boolean (default: off) 

Limit the search to hyperlink text. This includes (X)HTML elements with an "href" atrribute and XLink "simple" links.

'nomore' 'more' 

'more'
boolean (default: on) 

Pause the message list window when more than one screen of listings is displayed

'nextpattern' 

'nextpattern'
stringlist (default: \bnext,^>$,^(>>|Â»)$,^(>|Â»),(>|Â»)$,\bmore\b) 

Patterns to use when guessing the 'next' page in a document sequence. Each pattern, in order, is matched against all links in the page with the first match being used. The patterns are case insensitive regular expressions.

'newtab' 

'newtab'
stringlist (default: "") 

Define which Ex commands output the result in a new tab automatically. You can also use :tab command to manually output a command in a new tab.

The possible values:

all 	All commands 	
addons 	:addo[ns] command 	
downloads 	:downl[oads] command 	
help 	:h[elp] command 	
javascript 	:javascript! or :js! command 	
prefs 	:pref[erences]! or :prefs! command 	

'noonline' 'online' 

'online'
boolean (default on) 

Show and set the 'work offline' behavior.

'pageinfo' 'pa' 

'pageinfo' 'pa'
charlist (default: gfm) 

Desired info on :pa[geinfo]. Available items:

g 	General info 	
f 	Feeds 	
m 	Meta tags 	

The order matters.

'pps' 'popups' 

'popups' 'pps'
number (default: 1) 

Define where to show requested popup windows. Does not apply to windows which are opened by middle clicking a link, they always open in a new tab. Possible values:

|0 	Force to open in the current tab (Warning: this can stop some web sites from working correctly!) 	
|1 	Always open in a new tab 	
|2 	Open in a new window if it has a specific requested size (default in Firefox) 	
|3 	Always open in a new window 	
|4 	Open in the same tab unless it has a specific requested size 	

Note: This option does not change the popup blocker of Firefox in any way.

'nopreload' 'preload' 

'preload' 'nopreload'
boolean (default: on) 

Speed up first time history/bookmark completion

History access can be quite slow for a large history. Vimperator maintains a cache to speed it up significantly on subsequent access. In order to also speed up first time access, it is cached at startup, if this option is set (recommended).

'previouspattern' 

'previouspattern'
stringlist  

Patterns to use when guessing the 'previous' page in a document sequence Each pattern, in order, is matched against all links in the page with the first match being used. The patterns are case insensitive regular expressions.


'scr' 'scroll' 

'scroll' 'scr'
number (default: 0) 

Number of lines to scroll with C-u and C-d commands. The number of lines scrolled defaults to half the window size. When a {count} is specified to the <C-u> or <C-d> commands this is used to set the value of 'scroll' and also used for the current command. The value can be reset to half the window height with :set scroll=0.

'shell' 'sh' 

'shell' 'sh'
string (default: on) 

Show the current mode in the command line.

'shellcmdflag' 'shcf' 

'shellcmdflag' 'shcf'
string (default: $SHELL or "sh", Win32: "cmd.exe") 

Shell to use for executing :! and :run commands.

'nosmd' 'noshowmode' 'smd' 'showmode' 

'showmode' 'smd'
boolean (default: "-c", Win32: "/c") 

Flag passed to shell when executing :! and :run commands.

E.g. bash -c gvim

'ssli' 'showstatuslinks' 

'showstatuslinks' 'ssli'
number (default: 1) 

Show the destination of the link under the cursor in the status bar Also links which are focused by keyboard commands like <Tab> are shown. Possible values:

|0 	Don't show link destination 	
|1 	Show the link in the status line 	
|2 	Show the link in the command line 	

'stal' 'showtabline' 

'showtabline' 'stal'
number (default: 2) 

Control when to show the tab bar of opened web pages. Possible values:

|0 	Never show tab bar 	
|1 	Show tab bar only if more than one tab is open 	
|2 	Always show tab bar 	

'noscs' 'nosmartcase' 'scs' 'smartcase' 

'smartcase' 'scs'
boolean (default: on) 

Override the 'ignorecase' option if the pattern contains uppercase characters. This is only used if the 'ignorecase' option is set.

'suggestengines' 

'suggestengines' 
stringlist (default: "google") 

Set the search engines which can be used for completion suggestions. Add "S" to the 'complete' option if you want use this feature.

Warning: This feature could make tab-completion slower because it needs to wait for changes, so use it only if you have a fast internet connection.

'titlestring' 

'titlestring'
string (default: "Vimperator") 

Change the title of the browser window. Vimperator changes the browser title from "Title of web page - Mozilla Firefox" to "Title of web page - Vimperator".
If you don't like that, you can restore it with: :set titlestring=Mozilla Firefox.

'noum' 'nousermode' 'um' 'usermode' 

'usermode' 'um'
boolean (default: off) 

Show current website with a minimal style sheet to make it easily accessible. Note that this is a local option for now, later it may be split into a global and :setlocal part

'urlseparator' 

'urlseparator'
string (default: ",\s") 

Set the separator regexp used to separate multiple URL args. Multiple arguments can be specified for :open, and similar commands, using this regexp as the separator. Using whitespace alone is not generally useful since it is often contained in a single argument. E.g. :open linus torvalds should perform a single search for the key words "linus" and "torvalds"

'verbose', 'vbs' 

'verbose' 'vbs'
number (default: 0) 

Define which type of messages are logged. When bigger than zero, Vimperator will give messages about what it is doing. They are printed to the error console which can be shown with :javascript!. The highest value is 9, being the most verbose mode.

'novb' 'novisualbell' 'vb' 'visualbell' 

'visualbell' 'vb'
boolean (default: off) 

Use visual bell instead of beeping on errors. For now you can't turn off both, this will hopefully change.

'visualbellstyle' 't_vb' 

'visualbellstyle' 't_vb'
string (default: "border: none; background-color: black;") 

The CSS style to use for the visual bell. Set this to the empty string if you want no bell at all.

'wim' 'wildmode' 

'wildmode' 'wim'
stringlist (default: "list:full") 

Define how command line completion works. It is a comma-separated list of parts, where each part specifies what to do for each consecutive use of the completion key. The first part specifies the behavior for the first use of the completion key, the second part for the second use, etc.

These are the possible values for each part:

"" 	Complete only the first match 	
"full" 	Complete the next full match. After the last, the original string is used. 	
"longest" 	Complete till the longest common string. 	
"list" 	When more than one match, list all matches. 	
"list:full" 	When more than one match, list all matches and complete first match. 	
"list:longest" 	When more than one match, list all matches and complete till the longest common string. When there is only a single match, it is fully completed regardless of the case. 	

'wop' 'wildoptions' 

'wildoptions' 'wop'
stringlist (default: "") 

A list of words that change how command line completion is done.

Possible words:

auto 	Automatically show completions while you are typing 	
sort 	Always sorts completion list, overriding the 'complete' option. 	

'wsp' 'wordseparators' 

'wordseparators' 'wsp'
string (default: [\.,!\?:;/\\"\^\$%&§\(\)\[\]{}<>#\*\+\|=~ _\\-]) 

A regex which defines the word separators which are used for the 'hintmatching' types 'wordstartswith' and 'firstletters' to split the words in the text of a link.

"
```

### 55.1.7 tabs

```text
Tabs are used to be able to view many web pages at the same time. Each tab contains exactly one buffer - multiple buffers per tab are not supported. As a result many buffer and tab commands are interchangeable.


Listing tabs

listing-tabs 	

B :tabs :ls :files :buffers 

:buffers[!]

B

Show a list of all buffers (=tabs). The special version :buffers! opens the buffer list in a persistent preview window. Call the special version of this command again to close the window.


Opening tabs

listing-tabs 	

:tab


:tab {cmd}

Execute {cmd} and tell it to output in a new tab. Works only for commands that support it, currently:

:tab help 

:tab prefs[!] 

:tab addons 

:tab downloads 

See :open for other ways to open new tabs.


Changing tabs

changing-tabs 	

gb


[count]gb

Repeat last :buffer[!] command. This is useful to quickly jump between buffers which have a similar URL or title.

gB


[count]gB

Repeat last :buffer[!] command in reverse direction. Just like gb but in the other direction.

<C-PageDown> <C-Tab> <C-n> gt


[count]gt

Go to the next tab. Cycles to the first tab, when the last is selected.
Count is supported: 3gt goes to the third tab.

<C-PageUp> <C-S-Tab> <C-p> gT


[count]gT

Go {count} pages back. Wraps around from the first tab to the last tab.
Count is supported: 3gT goes three tabs back.

<C-6> <C-^>


<C-^>

Select the alternate tab. The alternate tab is the last selected tab. This provides a quick method of toggling between two tabs.

b :b :buffer 

[count]:b[uffer][!] {url|index}

b

Go to the specified buffer from the buffer list. Argument can be either the buffer index or the full URL.

If argument is neither a full URL nor an index but uniquely identifies a buffer, it is selected. With [!] the next buffer matching the argument is selected, even if it cannot be identified uniquely. Use b as a shortcut to open this prompt.

If argument is #, the alternate buffer will be selected (see <C-6>).

g^ g0 :bf :bfirst :br :brewind :tabfir :tabfirst :tabr :tabrewind 

:tabr[ewind]

:tabfir[st]

:br[ewind]

:bf[irst]

g0

g^

Switch to the first tab.

g$ :bl :blast :tabl :tablast 

:tabl[ast]

:bl[ast]

g$

Switch to the last tab.

:tabm :tabmove 

:tabm[ove] [N]

:tabm[ove][!] +N | -N


Move the current tab after tab N. When N is 0 the current tab is made the first one. Without N the current tab is made the last one. N can also be prefixed with "+" or "-" to indicate a relative movement. If [!] is specified the movement wraps around the start or end of the tab list.

:bn :bnext :tn :tnext :tabn :tabnext 

:[count]tabn[ext] [count]

:[count]tn[ext] [count]

:[count]bn[ext] [count]


Switch to the next or [count]th tab. Cycles to the first tab when the last is selected and {count} is not specified.

:tabo :tabonly 

:tabo[nly]

Close all other tabs.

:bN :bNext :bp :bprevious :tN :tNext :tabN :tabNext :tp :tprevious :tabp :tabprevious


:[count]tabp[revious] [count]

:[count]tp[revious] [count]

:[count]tabN[ext] [count]

:[count]bp[revious] [count]

:[count]bN[ext] [count]


Switch to the previous tab or go [count] tabs back. Wraps around from the first tab to the last tab.


Closing tabs

closing-tabs 	

d :tabc :tabclose :bun :bunload :bw :bwipeout :bd :bdelete 

:[count]bd[elete][!] [arg]

[count]d

Delete current buffer (=tab). Count is supported, :2bd removes two tabs and the one to the right is selected. Afterwards, the tab to the right of the deleted one is selected.

When used with [arg], remove all tabs which contain [arg] in the hostname. [!] forces this command to also search for [arg] in the full URL and also the title of the tab. Use with care.

D 

[count]D

Like d but selects the tab to the left of the deleted tab.

u :u :undo 

:[count]u[ndo][!] [url]

[count]u

Undo closing of a tab. If a count is given, don't close the last but the [count]th last tab. With [url] restores the tab matching the URL.

:undoa :undoall


:undoa[ll]

Undo closing of all closed tabs. Firefox stores up to 10 closed tabs, even after a browser restart.
```

### 55.1.8 Navigation, hints

```text
f hints


f{hint}

Start QuickHint mode. In QuickHint mode, every hintable item (according to the 'hinttags' XPath query) is assigned a unique number. You can now either type this number or type any part of the URL which you want to follow, and it is followed as soon as it can be uniquely identified. Often it is can be useful to combine these techniques to narrow down results with some letters, and then typing a single digit to make the match unique. Pressing <Leader> (defaults to :let mapleader = "\") toggles "escape-mode", where numbers are treated as normal text.
<Esc> stops this mode at any time.

F


F{hint}

Start QuickHint mode, but open link in a new tab. Like normal QuickHint mode (activated with f) but opens the link in a new tab.

;


;{mode}{hint}

Start an extended hint mode. ExtendedHint mode is useful, since in this mode you can yank link locations, open them in a new window or save images. If you want to yank the location of hint 24, press ;y to start this hint mode. Then press 24 to copy the hint location.

{mode} can be either one of:


; to focus a link and hover it with the mouse 

a to save its destination (prompting for save location) 

s to save its destination 

o to open its location in the current tab 

t to open its location in a new tab 

O to open its location in an :open query 

T to open its location in a :tabopen query 

v to view its destination source 

w to open its destination in a new window 

W to open its location in a :winopen query 

y to yank its destination location 

Y to yank its text description 

f to open its location in the current tab 

F to open its location in a new tab 

These work like the f or F mappings but will keep you in AlwaysHint mode. This is useful if you want to open many links of one page without pressing f or F each time. Hintable elements for all extended hint modes can be set in the 'extendedhinttags' XPath string.
```

### 55.1.9 Key mapping

```text
macro mapping key-mapping 	

<Nop>


<Nop>

Do nothing. This command is useful for disabling a specific mapping. :map <C-n> <Nop> will prevent <C-n> from doing anything.

:map 

:map {lhs} {rhs}

:map {lhs}

:map

Map the key sequence {lhs} to {rhs}. The {rhs} is remapped, allowing for nested and recursive mappings. Mappings are NOT saved during sessions, make sure you put them in your vimperatorrc file!

:cm :cmap 

:cmap {lhs} {rhs}

:cmap {lhs}

:cmap

Map the key sequence {lhs} to {rhs} (in command-line mode). The {rhs} is remapped, allowing for nested and recursive mappings. Mappings are NOT saved during sessions, make sure you put them in your vimperatorrc file!

:im :imap 

:imap {lhs} {rhs}

:imap {lhs}

:imap

Map the key sequence {lhs} to {rhs} (in insert mode). The {rhs} is remapped, allowing for nested and recursive mappings. Mappings are NOT saved during sessions, make sure you put them in your vimperatorrc file!

:mapc :mapclear


:mapc[lear]

Remove all mappings. All user-defined mappings which were set by :map or :noremap are cleared.

:cmapc :cmapclear


:cmapc[lear]

Remove all mappings (in command-line mode). All user-defined mappings which were set by :cmap or :cnoremap are cleared.

:imapc :imapclear


:imapc[lear]

Remove all mappings (in insert mode). All user-defined mappings which were set by :imap or :inoremap are cleared.

:no :noremap


:no[remap] {lhs} {rhs}

:no[remap] {lhs}

:no[remap]

Map the key sequence {lhs} to {rhs}. No remapping of the {rhs} is performed.

:cno :cnoremap


:cno[remap] {lhs} {rhs}

:cno[remap] {lhs}

:cno[remap]

Map the key sequence {lhs} to {rhs} (in command-line mode). No remapping of the {rhs} is performed.

:ino :inoremap


:ino[remap] {lhs} {rhs}

:ino[remap] {lhs}

:ino[remap]

Map the key sequence {lhs} to {rhs} (in insert mode). No remapping of the {rhs} is performed.

:unm :unmap 

:unm[ap] {lhs}

Remove the mapping of {lhs}.

:cunm :cunmap 

:cunm[ap] {lhs}

Remove the mapping of {lhs} (in command-line mode).

:iunm :iunmap 

:iunm[ap] {lhs}

Remove the mapping of {lhs} (in insert mode).


Abbreviations

abbreviations 	

list abbreviations:
:ab :abbreviate 

mine: 
i  }-            }<Esc>h%?\w<CR>:nohl<CR>:call JCommentWriter()<CR>
c  w1          * ((getcmdtype() == ':'  &&  getcmdpos()  <= 2)?   'w!' : 'w1')
i  xdate         <C-R>=strftime("%d/%m/%y %H:%M:%S")<CR><Space>
i  xasp          <%@language=jscript%><CR><%<CR><Tab><CR><BS>%><Esc><<O<Tab>    

i - insert mode
c - : mode 

:ab[breviate] {lhs} {rhs}

:ab[breviate] {lhs}

:ab[breviate]

Abbreviate a key sequence. Abbreviate {lhs} to {rhs}. If only {lhs} given, list that particular abbreviation. List all abbreviations, if no arguments to are given.

:ca :cabbrev 

:ca[bbrev] {lhs} {rhs}

:ca[bbrev] {lhs}

:ca[bbrev]

Abbreviate a key sequence for Command-line mode. Same as :ab[reviate], but for command-line mode only.

:ia :iabbrev 

:ia[bbrev] {lhs} {rhs}

:ia[bbrev] {lhs}

:ia[bbrev]

Abbreviate a key sequence for Insert mode. Same as :ab[breviate], but for Insert mode only.

:una :unabbreviate 

:una[bbreviate] {lhs}


Remove an abbreviation.

:cuna :cunabbrev 

:cuna[bbrev] {lhs}


Remove an abbreviation for Command-line mode. Same as :una[bbreviate], but for Command-line mode only.

:iuna :iunabbrev 

:iuna[bbrev] {lhs}


Remove an abbreviation for Insert mode. Same as :una[bbreviate], but for Insert mode only.

:abc :abclear 

:abc[lear]

Remove all abbreviations.

:cabc :cabclear 

:cabc[lear]

Remove all abbreviations for Command-line mode.

:iabc :iabclear 

:iabc[lear]

Remove all abbreviations for Insert mode.


User-defined commands

user-commands 	

:com :command 

:com[mand]


List all user-defined commands.

:com[mand] {cmd}


List all user-defined commands that start with {cmd}.

:com[mand][!] [{attr}] {cmd} {rep}


Define a new user command. The name of the command is {cmd} and its relacement text is {rep}. The command's attributes are {attr}. If a command with this name already exists an error is reported unless [!] is specified, in which case the command is redefined. Unlike Vim, the command may start with a lowercase letter.

The replacement text {rep} is scanned for escape sequences and these are replaced with values from the user entered command line. The resulting string is then executed as an Ex command.

The valid escape sequences are:

<args> 	The command arguments exactly as supplied 	
<lt> 	A literal '<' character to allow for a literal copy of one of the escape sequences. Eg. <lt>args> will expand to a literal <args> 	

Note: {attr} not implemented yet.

:comc :comclear 

:comc[lear]

Delete all user-defined commands.

:delc :delcommand 

:delc[ommand] {cmd}


Delete the user-defined command {cmd}.
```

### 55.1.10 eval

```text
INTRO TO BE WRITTEN

:ec :echo


:ec[ho] {expr}

Display a string at the bottom of the window. Useful for showing informational messages. Multiple lines can be separated by \n. {expr} can either be a quoted string, or any expression which can be fed to eval() like 4+5. You can also view the source code of objects and functions if the return value of {expr} is an object or function.

:echoe :echoerr 

:echoe[rr] {expr}


Display an error string at the bottom of the window. Just like :ec[ho], but echoes the result highlighted in red. Useful for showing important messages.

:exe :execute 

:exe[cute] {expr1} [  ]


Execute the string that results from the evaluation of {expr1} as an Ex command. Example: :execute echo "test" shows a message with the text "test".

:js :javas :javascript 

:javas[cript] {cmd}

:javascript <<{endpattern}\n{script}\n{endpattern}

:javascript[!]

Run any JavaScript command through eval(). Acts as a JavaScript interpreter by passing the argument to eval(). :javascript alert('Hello world') shows a dialog box with the text "Hello world". :javascript <<EOF reads all the lines until a line starting with 'EOF' is found, and interpret them with the JavaScript eval() function.

The special version :javascript! opens the JavaScript console of Firefox.

Rudimentary <Tab> completion is available for :javascript {cmd}<Tab> (but not yet for the :js <<EOF multiline widget). Be aware that Vimperator needs to run {cmd} through eval() to get the completions, which could have unwanted side effects.

:let 

:let {var-name} [+-.]= {expr1}

:let {var-name}

:let

Sets or lists a variable. Sets the variable {var-name} to the value of the expression {expr1}. If no expression is given, the value of the variable is displayed.Without arguments, displays a list of all variables.

:unl :unlet 

:unl[et][!] {name} 


Deletes the variable {name}. Several variable names can be given. When used with [!] no error message is output for non-existing variables.
```

### 55.1.11 marks

```text
Bookmarks which allow you to mark a web page as one of your favorites for easy access. 

QuickMarks allow you to define up to 62 (a-zA-Z0-9) web sites (or group of web sites) which you really visit most often 

Local marks to store the position with a web page 

History is also a special type of marks, as Vimperator automatically remembers sites which you have visited in the past. 


a :bma :bmark 

:bm[ark] [-title=title] [-keyword=kw] [-tags=tag1,tag2] [url]

a

Add a bookmark.


The following options are interpreted:

-title="custom title" (short option: -t) 

-tags=comma,separated,tag,list (short option: -T) 

-keyword=keyword (short option: -k) 

If you don't add a custom title, either the title of the web page or the URL is taken as the title. You can omit the optional [url] argument, so just do :bmark to bookmark the currently loaded web page with a default title and without any tags.

A

Toggle bookmarked state of current URL. Add/remove a bookmark for the current location, depending if it already is bookmarked or not. In contrast to the :bmark command, the bookmark is just starred which means it is placed in the Unfiled Bookmarks Folder instead of the bookmarks menu.

:bma :bmark 

:bma[rk] [-title=title] [-keyword=kw] [-tags=tag1,tag2] [url]


Add a bookmark. If you don't add a custom title, either the title of the web page or the URL is taken as the title.
You can omit the optional [url] argument, so just do :bmark to bookmark the currently loaded web page with a default title and without any tags.


The following options are interpreted:
-title="custom title"
-tags=comma,separated,tag,list
-keyword=keyword


:bmarks 

:bmarks[!] [filter]


List or open multiple bookmarks. Open the message window at the bottom of the screen with all bookmarks which match [filter] either in the title or URL.
The special version :bmarks! works the same as :bmarks except it opens all the found bookmarks in new tabs.

Filter can also contain the following options:
-tags=comma,separated,tag,list


:delbm :delbmarks 

:delbm[arks] [url]


Delete a bookmark. Deletes all bookmarks which match the [url]. If omitted, [url] defaults to the URL of the current buffer. Use <Tab> key on a string to complete the URL which you want to delete.

The following options WILL be interpreted in the future:

[!] a special version to delete ALL bookmarks 


history 	

<C-o>


[count]<C-o>

Go to an older position in the jump list. The jump list is just the browser history for now.

<C-i>


[count]<C-i>

Go to a newer position in the jump list. The jump list is just the browser history for now.

<M-Left> <A-Left> H

[count]H

Go back in the browser history. Count is supported: 3H goes back 3 steps.

<M-Right> <A-Right> L
[count]L

Go forward in the browser history. Count is supported: 3L goes forward 3 steps.

:ba :back 

:[count]ba[ck][!] [url]


Go back in the browser history. Count is supported, :3back goes back 3 pages in the browser history.
The special version :back! goes to the beginning of the browser history.

:fw :fo :forward 

:[count]fo[rward][!] [url]


Go forward in the browser history. Count is supported, :3forward goes forward 3 pages in the browser history. The special version :forward! goes to the end of the browser history.

:hs :hist :history 

:hist[ory][!] [filter]


Show recently visited URLs. Open the message window at the bottom of the screen with all history items which match [filter] either in the title or URL. The special version :history! works the same as :history except it opens all the found items in new tabs.


QuickMarks
go


go{a-zA-Z0-9}

Jump to a QuickMark in the current tab. Open any QuickMark in the current tab. across browser sessions.

gn


gn{a-zA-Z0-9}

QuickMark in a new tab. Whether the new tab is activated or not depends on the 'activate' option.
Mnemonic: Go in a new tab. gt would make more sense but is already taken.

M


M{a-zA-Z0-9}

Add new QuickMark for current URL. You can go to a marked URL in the current QuickMarks are persistent across browser sessions.

:delqm :delqmarks 

:delqm[arks] {marks}

:delqm[arks]!

Delete the specified QuickMarks. QuickMarks are presented as a list.

Examples:

:delqmarks Aa b p deletes QuickMarks A, a, b and p


:delqmarks b-p deletes all QuickMarks in the range b to p


:delqmarks! deletes all QuickMarks 

:qma :qmark 

:qma[rk] {a-zA-Z0-9} [url]


Mark a URL with a letter for quick access. You can also mark whole groups like this: 
:qmark f http://forum1.com, http://forum2.com, imdb some artist

:qmarks 

:qmarks [arg]

Show all QuickMarks. If [arg] is specified then limit the list to those QuickMarks mentioned.


Local marks

m
m{a-zA-Z}

Set mark at the cursor position. Marks a-z are local to the buffer, whereas A-Z are valid between buffers.

` '


'{a-zA-Z}

Jump to the mark in the current buffer. Marks a-z are local to the buffer, whereas A-Z are valid between buffers.

:delm :delmarks 

:delm[arks] {marks}

:delm[arks]!

Delete the specified marks. Marks are presented as a list.

Examples:

:delmarks Aa b p deletes marks A, a, b and p


:delmarks b-p deletes all marks in the range b to p


:delmarks! deletes all marks for the current buffer 

:ma :mark 

:ma[rk] {a-zA-Z}

Mark current location within the web page.

:marks


:marks [arg]

Show all location marks of current web page. If [arg] is specified then limit the list to those marks mentioned.
```

### 55.1.12 record macros

```text
Macros

complex-repeat macros 	

q 

q {arg}


Record a key sequence into a macro. Available macros are {0-9a-zA-Z} (uppercase to append). Type q to stop recording.

:macros


:mac[ros] [regex]

List recorded macros matching the optional regular expression. If no regex is given, list all.

:delmac :delmacros 

:delmac[ros] [regex]


Delete recorded macros matching a regular expression.

@ @@ :play 

[count]@ {arg}

[count]@@

:pl[ay] {arg}


Plays the contents of macro {0-9a-z}.

@@ replays a previous executed macro.

:play {arg} plays a recorded macro.


Using scripts

using-scripts 	

:so :source 

:so[urce][!] {file}


Read Ex commands from {file}. You can either source files which mostly contain Ex commands like map < gt and put JavaScript code within a:

js <<EOF
hello = function () {
  alert("Hello world");
}
EOF

Or you can alternatively source a file which ends in .js, these files are automatically sourced as pure JavaScript files.

Note: In both cases you must add functions to the global window object like shown above, functions written as:

function hello2() {
  alert("Hello world");
}

are only available within the scope of the script.

The .vimperatorrc file in your home directory and any files in ~/.vimperator/plugin/ are always sourced at startup. ~ is supported as a shortcut for the $HOME directory. If [!] is specified, errors are not printed.


Profiling

profiling profile 	

:time 

:[count]time[!] {code|:command}


Profile a piece of code or a command. Run {code} [count] times (default 1) and returns the elapsed time. {code} is always passed to JavaScript's eval(), which might be slow, so take the results with a grain of salt.

If {code} starts with a :, it is executed as a Vimperator command.

Use the special version with [!] if you just want to run any command multiple times without showing profiling statistics.
```

### 55.1.13 autocommands

```text
Autocommands are a way to automatically execute code when certain events happen.

:au :autocmd


:au[tocmd]
Execute commands automatically on events. 

:au[tocmd] {event} {pat} {cmd}.

Add {cmd} to the list of commands Vimperator will execute on {event} for a URL matching {pat}:

:autocmd[!] {events} {pat}: list/remove autocommands filtered by {events} and {pat} 

:autocmd[!] {events}: list/remove autocommands matching {events} 

:autocmd[!] * {pat}: list/remove autocommands matching {pat} 

:autocmd[!]: list/remove all autocommands 

Available {events}:

LocationChange 	Triggered when changing tabs or when navigating to a new location 	
PageLoadPre 	Triggered after a page load is initiated. 	
PageLoad 	Triggered when a page gets (re)loaded/opened 	
Quit 	Triggered before exiting Firefox 	
Startup 	Triggered after Firefox starts 	

{pat} is a regular expression, use .* if you want to match all URLs.


Examples

autocmd_examples 	

Enable passthrough mode on all Google sites:

:au LocationChange .* js modes.passAllKeys = /google\.com/.test(buffer.URL)

Enable passthrough mode on some Google sites:

:au LocationChange .* js modes.passAllKeys = /(www|mail)\.google\.com/.test(buffer.URL)

Set the filetype to mail when editing email at Gmail:

:au LocationChange .* :set editor=gvim -f
:au LocationChange mail\.google\.com :set editor=gvim -f -c 'set ft=mail'
```

### 55.1.14 printing

```text
:ha :hardcopy


:ha[rdcopy][!]

Print current document. Open a GUI dialog where you can select the printer, number of copies, orientation, etc. When used with [!], the dialog is skipped and the default printer used.


Firefox printing dialogs

firefox-print-dialogs 	

The "Print Preview" and "Page Setup" dialogs can be opened via the :dialog command

:dialog printpreview

and

:dialog printsetup

respectively.
```

### 55.1.15 Various commands

```text
various 	

<C-l> CTRL-L :redr :redraw


:redr[aw]

Redraws the screen. Useful to update the screen halfway executing a script or function.

:norm :normal 

:norm[al][!] {commands}


Execute Normal mode commands {commands}. This makes it possible to execute Normal mode commands typed on the command-line. {commands} is executed like it is typed. If the [!] is given, mappings will not be used. {commands} should be a complete command. {commands} cannot start with a space. Put a 1 (one) before it, 1 space is one space.

:run :!


:!{cmd}

Run a command. Runs {cmd} through system() and displays its output. Any '!' in {cmd} is replaced with the previous external command. But not when there is a backslash before the '!', then that backslash is removed.

Warning: Input redirection (< foo) not done, also do not run commands which require stdin or it will hang Firefox!

:ve :version


:ve[rsion][!]

Show version information. You can show the Firefox version page with :version!.


Online help

online-help 	

<F1> :help :h help 

:h[elp] {subject}

<F1>

Open help window. The default section is shown unless {subject} is specified. If you need help for a specific topic, try :help overview.

:exu :exusage 

:exu[sage]

Show help on Ex commands. Added to simulate the Nvi command.

:viu :viusage 

:viu[sage]

Show help on Normal mode commands. Added to simulate the Nvi command.

| 42


What is the meaning of life, the universe and everything? Douglas Adams, the only person who knew what this question really was about is now dead, unfortunately. So now you might wonder what the meaning of death is


Uncategorized help

uncategorized 	

<C-[> <Esc>


<Esc>

Focus content. Exits any command line or hint mode and returns to browser mode. Also focuses the web page, in case a form field has focus and eats our key presses.

: 

:

Start command line mode. In command line mode, you can perform extended commands, which may require arguments.

<Insert> i


i

Start caret mode. This mode resembles the Vim normal mode where you see a text cursor and can move around. If you want to select text in this mode, press v to start its Visual mode.

:addo :addons


:addo[ns]

Show available Browser Extensions and Themes. You can add/remove/disable browser extensions from this dialog. Be aware that not all Firefox extensions work, because Vimperator overrides some key bindings and changes Firefox's GUI.

:beep 

:beep

Play a system beep.

:emenu


:emenu {menu}

Execute {menu} from the command line. This command provides command line access to all menu items available from the main Firefox menubar. {menu} is a hierachical path to the menu item with each submenu separated by a period. E.g. :emenu File.Open File

:dia :dialog 

:dia[log] [firefox-dialog]


Open a firefox-dialog. Available dialogs: use completion on :dialog <Tab>

:dl :downl :downloads


:downl[oads]

Show progress of current downloads. Open the original Firefox download dialog in a new tab. Here, downloads can be paused, canceled and resumed.

:sbcl :sbclose 

:sbcl[ose]

Close the sidebar window.

:sbope :sbopen :sb :sbar :sideb :sidebar


:sidebar {name}

Open the sidebar window. {name} is any of the menu items listed under the standard Firefox View->Sidebar menu. Add-ons, Preferences and Downloads are also available in the sidebar.


	55.2
```
