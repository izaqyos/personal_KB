---
type: reference
title: CLI
description: "Legacy Python KB section: CLI (Build CLI fast with cmd module, Installation, Usage)"
tags: [shell, python, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "python/KB_python#5"
---

# CLI

[↑ KB_python](/python/kb-python/README.md)

```text
id=__cli_menu_python__
```

## 5.1 Build CLI fast with cmd module

```text
	use cmd module:

	Example:
	import cmd
	import string, sys

	class CLI(cmd.Cmd):

		def __init__(self):
		cmd.Cmd.__init__(self)
		self.prompt = '> '

		def do_hello(self, arg):
		print "hello again", arg, "!"

		def help_hello(self):
		print "syntax: hello [message]",
		print "-- prints a hello message"

		def do_quit(self, arg):
		sys.exit(1)

		def help_quit(self):
		print "syntax: quit",
		print "-- terminates the application"

# shortcuts
		do_q = do_quit

#
# try it out

		cli = CLI()
		cli.cmdloop()
```

## 5.2 How to create a menu for a python console application

```text
https://computinglearner.com/how-to-create-a-menu-for-a-python-console-application/
TLDR:
menu_options = {
    1: 'Option 1',
    2: 'Option 2',
    3: 'Option 3',
    4: 'Exit',
}

def print_menu():
    for key in menu_options.keys():
        print (key, '--', menu_options[key] )

def option1():
     print('Handle option \'Option 1\'')

def option2():
     print('Handle option \'Option 2\'')

def option3():
     print('Handle option \'Option 3\'')

if __name__=='__main__':
    while(True):
        print_menu()
        option = ''
        try:
            option = int(input('Enter your choice: '))
        except:
            print('Wrong input. Please enter a number ...')
        #Check what choice was entered and act accordingly
        if option == 1:
           option1()
        elif option == 2:
            option2()
        elif option == 3:
            option3()
        elif option == 4:
            print('Thanks message before exiting')
            exit()
        else:
            print('Invalid option. Please enter a number between 1 and 4.')
```

## 5.3 https://pypi.org/project/simple-term-menu/

### 5.3.1 Installation

```text
simple-term-menu is available on PyPI for Python 3.5+ and can be installed with pip:

python3 -m pip install simple-term-menu
If you use Arch Linux or one of its derivatives, you can also install simple-term-menu from the AUR:

yay -S python-simple-term-menu
You also find self-contained executables for 64-bit Linux distributions and macOS High Sierra and newer on the releases page. They are created with PyInstaller and only require glibc >= 2.17 on Linux (should be fine on any recent Linux system).
```

### 5.3.2 Usage

```text
Create a menu with the default style
Create an instance of the class TerminalMenu and pass the menu entries as a list of strings to the constructor. Call the show method to output the menu and wait for keyboard input:

#!/usr/bin/env python3

from simple_term_menu import TerminalMenu

def main():
    options = ["entry 1", "entry 2", "entry 3"]
    terminal_menu = TerminalMenu(options)
    menu_entry_index = terminal_menu.show()
    print(f"You have selected {options[menu_entry_index]}!")

if __name__ == "__main__":
    main()
You will get an output like:

screenshot_basic

You can now select a menu entry with the arrow keys or j/k (vim motions) and accept your choice by hitting enter or cancel the menu with escape, q or <Ctrl>-C. show returns the selected menu entry index or None if the menu was canceled.

You can pass an optional title to the TerminalMenu constructor which will be placed above the menu. title can be a simple string, a multiline string (with \n newlines) or a list of strings. The same applies to the status_bar parameter, which places a status bar below the menu. Moreover, you can use a callable as status_bar parameter which takes the currently selected entry and returns a status bar string.
```

### 5.3.3 Styling

```text
You can pass styling arguments to the TerminalMenu constructor. Each style is a tuple of keyword strings. Currently the following keywords are accepted:

bg_black
bg_blue
bg_cyan
bg_gray
bg_green
bg_purple
bg_red
bg_yellow
fg_black
fg_blue
fg_cyan
fg_gray
fg_green
fg_purple
fg_red
fg_yellow
bold
italics
standout
underline
You can alter the following styles:

menu_cursor_style: The style of the shown cursor. The default style is ("fg_red", "bold").

menu_highlight_style: The style of the selected menu entry. The default style is ("standout",).

search_highlight_style: The style of matched search strings. The default style is ("fg_black", "bg_yellow", "bold").

shortcut_key_highlight_style: The style of shortcut keys. The default style is ("fg_blue",).

shortcut_brackets_highlight_style: The style of brackets enclosing shortcut keys. The default style is ("fg_gray",).

status_bar_style: The style of the status bar below the menu. The default style is ("fg_yellow", "bg_black").

multi_select_cursor_style: The style of the cursor which pins a selected entry in a multi-selection. The default style is ("fg_yellow", "bold"). This style excludes brackets (see below).

multi_select_cursor_brackets_style: The style of brackets in the multi_select_cursor (([{<)]}>). The default style is ("fg_gray",).

By setting menu_cursor you can define another cursor or disable it (None). The default cursor is "> ". The parameter multi_select_cursor customizes the multi-select cursor (the default is "[*] ").
```

### 5.3.4 Searching

```text
simple_term_menu has a built-in search feature to filter shown menu entries. The default key to activate search mode is / (like in Vim, less and other terminal programs). If you prefer another search key, pass a search_key parameter to the TerminalMenu constructor. None can be passed to activate the search on every letter key. Obviously, j and k cannot be used for cursor motions in that mode. Use <Ctrl-j> and <Ctrl-k> instead.

The search mode supports Python regex syntax. Visit the Python re documentation for more details.

String parts of the menu entries which match the given search pattern are highlighted. Use the search_highlight_style parameter to adjust the highlight style to your liking.

By default, the search is case insensitive. Set search_case_sensitive to True if you prefer a case sensitive search line.

Pass show_search_hint=True to the TerminalMenu constructor to activate a search hint in the search line (like (Press "/" to search)).
```

### 5.3.5 Shortcuts

```text
You can define shortcuts for selected menu entries by prepending a single character enclosed in square brackets (like [a]). Pass shortcut_key_highlight_style and/or shortcut_brackets_highlight_style to the TerminalMenu constructor to change the default highlight style of the shortcuts.

By default, the show method returns when a shortcut key is pressed. If you only want the selection to jump the shortcut target, pass exit_on_shortcut=False to the TerminalMenu constructor.

If you configured the search to be activated on every letter key, the shortcut feature will be disabled.

Pass show_shortcut_hints=True to the TerminalMenu constructor to display shortcut hints in the status bar (useful for very long menus which need scrolling). Additionally pass show_shortcut_hints_in_status_bar=False if you prefer shortcut hints in the menu title.

Shortcuts example
Create a menu of some fruits and use the first letter as shortcut key:

#!/usr/bin/env python3

import os
from simple_term_menu import TerminalMenu


def main():
    fruits = ["[a] apple", "[b] banana", "[o] orange"]
    terminal_menu = TerminalMenu(fruits, title="Fruits")
    menu_entry_index = terminal_menu.show()


if __name__ == "__main__":
    main()
screenshot_shortcuts
```

### 5.3.6 Custom accept keys

```text
The default key to accept a menu item is enter. Pass the accept_keys parameter with a tuple of keys (as strings) to the TerminalMenu constructor to use a different set of accept keys. Custom accept keys can be plain ascii letters or ascii letters with a modifier key (prepend ctrl- or alt- to an ascii letter). Use the chosen_accept_key property of the TerminalMenu instance to query which accept key was pressed by the user.

Be aware that not all combinations of modifier and ascii keys will work depending on your terminal emulator and graphical user interface. In addition, some combinations generate other existing keys (e.g. ctrl-m is enter / carriage return).

Custom accept keys example
#!/usr/bin/env python3

from simple_term_menu import TerminalMenu


def main():
    terminal_menu = TerminalMenu(["entry 1", "entry 2", "entry 3"], accept_keys=("enter", "alt-d", "ctrl-i"))
    menu_entry_index = terminal_menu.show()
    print(terminal_menu.chosen_accept_key)


if __name__ == "__main__":
    main()
```

### 5.3.7 Multi-select

```text
Pass multi_select=True to the TerminalMenu constructor to enable the multi-select mode. Press space or tab on an arbitrary menu item to add it to your selection. Press enter (or any other configured accept_key) to add the currently selected entry as the last item to the selection and to return from the show method as usual. In multi-select mode, the show method returns a sorted tuple of all your selected menu indices instead of a single int. Use the chosen_menu_entries property to get a tuple of the menu entry strings instead. By setting multi_select_keys you can define another set of keys to toggle a selected item. By passing show_multi_select_hint=True a multi-select mode hint is shown in the status bar. If you don't want the accept_key to also select the last highlighted item you can pass multi_select_select_on_accept=False. If no menu item is explicitly selected, the last highlighted menu item will still be added to the selection unless you also pass multi_select_empty_ok=True.

An optional list (or any other iterable object) preselected_entries can also be passed to have items already selected when the menu is displayed. This list can be composed of either integers representing indexes of the menu_entries list, or strings matching the elements of menu_entries. Integers and strings can be mixed.

Multi-select example
#!/usr/bin/env python3

from simple_term_menu import TerminalMenu


def main():
    terminal_menu = TerminalMenu(
        ["dog", "cat", "mouse", "squirrel"],
        multi_select=True,
        show_multi_select_hint=True,
    )
    menu_entry_indices = terminal_menu.show()
    print(menu_entry_indices)
    print(terminal_menu.chosen_menu_entries)


if __name__ == "__main__":
    main()
```

### 5.3.8 Preview window

```text
simple-term-menu can show a preview for each menu entry. Pass a preview_command to the TerminalMenu constructor to activate this optional feature. preview_command either takes a command string which will be executed as a subprocess or a Python callable which converts a given menu entry string into the preview output. If a command string is given, the pattern {} is replaced with the current menu entry string. If a menu entry has an additional data component (separated by |), it is passed instead to the preview command. \| can be used for a literal |. If you simply append a | (without a data component), the preview window will be disabled for this entry.

The additional keyword argument preview_size can be used to control the height of the preview window. It is given as fraction of the complete terminal height (default: 0.25). The width cannot be set, it is always the complete width of the terminal window.

Pass preview_title with a string of your choice to customize the preview window title (default: "preview") or preview_border=False to deactivate the border around the preview window (also deactivates the title string).

Preview commands are allowed to generate ANSI escape color codes.

Preview examples
Create a menu for all files in the current directory and preview their contents with the bat command:

#!/usr/bin/env python3

import os
from simple_term_menu import TerminalMenu


def list_files(directory="."):
    return (file for file in os.listdir(directory) if os.path.isfile(os.path.join(directory, file)))


def main():
    terminal_menu = TerminalMenu(list_files(), preview_command="bat --color=always {}", preview_size=0.75)
    menu_entry_index = terminal_menu.show()


if __name__ == "__main__":
    main()

Another file preview example using the Pygments api:

#!/usr/bin/env python3

import os
from pygments import formatters, highlight, lexers
from pygments.util import ClassNotFound
from simple_term_menu import TerminalMenu


def highlight_file(filepath):
    with open(filepath, "r") as f:
        file_content = f.read()
    try:
        lexer = lexers.get_lexer_for_filename(filepath, stripnl=False, stripall=False)
    except ClassNotFound:
        lexer = lexers.get_lexer_by_name("text", stripnl=False, stripall=False)
    formatter = formatters.TerminalFormatter(bg="dark")  # dark or light
    highlighted_file_content = highlight(file_content, lexer, formatter)
    return highlighted_file_content


def list_files(directory="."):
    return (file for file in os.listdir(directory) if os.path.isfile(os.path.join(directory, file)))


def main():
    terminal_menu = TerminalMenu(list_files(), preview_command=highlight_file, preview_size=0.75)
    menu_entry_index = terminal_menu.show()


if __name__ == "__main__":
    main()
screenshot_preview_pygments

Preview the active pane of each running tmux session (the session ids are appended to the menu entries with the | separator):

#!/usr/bin/env python3

import subprocess
from simple_term_menu import TerminalMenu


def list_tmux_sessions():
    tmux_command_output = subprocess.check_output(
        ["tmux", "list-sessions", "-F#{session_id}:#{session_name}"], universal_newlines=True
    )
    tmux_sessions = []
    for line in tmux_command_output.split("\n"):
        line = line.strip()
        if not line:
            continue
        session_id, session_name = tuple(line.split(":"))
        tmux_sessions.append((session_name, session_id))
    return tmux_sessions


def main():
    terminal_menu = TerminalMenu(
        ("|".join(session) for session in list_tmux_sessions()),
        preview_command="tmux capture-pane -e -p -t {}",
        preview_size=0.75,
    )
    menu_entry_index = terminal_menu.show()


if __name__ == "__main__":
    main()
screenshot_preview_tmux_sessions
```

### 5.3.9 Skipping empty entries

```text
Use the constructor parameter skip_empty_entries or the flag --skip-empty-entries to interpret an empty string value in the menu entries as an empty menu entry (will be skipped when iterating over the entries). A None value is always considered as an empty menu entry independently from the skip_empty_entries parameter.

from simple_term_menu import TerminalMenu

def main():                                                         # Or use `None` instead of `""`:
    options = ["entry 1", "entry 2", "", "add", "edit"]             # ["entry 1", "entry 2", None, "add", "edit"]
    terminal_menu = TerminalMenu(options, skip_empty_entries=True)  # TerminalMenu(options)
    menu_entry_index = terminal_menu.show()
    print(f"You have selected {options[menu_entry_index]}!")

if __name__ == "__main__":
    main()
screenshot_skip_empty_entries

Localization / Text modification
Use the constructor parameters

show_search_hint_text and
show_multi_select_hint_text
to modify the corresponding texts. Use the placeholder {key} for the search key in show_search_hint_text and both {accept_keys} and {multi_select_keys} in show_multi_select_hint_text if appropriately.
```

### 5.3.10 Additional settings

```text
Furthermore, the TerminalMenu constructor takes these additional parameters to change the menu behavior:

clear_menu_on_exit: A bool value which indicates if the menu will be cleared after the show method. Defaults to True.
clear_screen: A bool value which indicates if the screen will be cleared before the menu is shown. Defaults to False.
cursor_index: The initially selected item index.
cycle_cursor: A bool value which indicates if the menu cursor cycles when the end of the menu is reached. Defaults to True.
quit_keys: An iterable of keys which quit the terminal menu. Defaults to ("escape", "q").
raise_error_on_interrupt: Set this to True to reraise Keyboard interrupts (by pressing <Ctrl-c>). Defaults to False.
status_bar_below_preview: Position the status bar below the preview window (default positioning is above).
Command line program
simple-term-menu can be used as a terminal program in shell scripts. The exit code of the script is the 1-based index of the selected menu entry. The exit code 0 reports the cancel action. The following command line arguments are supported:

usage: simple-term-menu [-h] [-s] [-X] [-l] [--cursor CURSOR]
                        [-i CURSOR_INDEX] [--cursor-style CURSOR_STYLE] [-C]
                        [-E] [--highlight-style HIGHLIGHT_STYLE] [-m]
                        [--multi-select-cursor MULTI_SELECT_CURSOR]
                        [--multi-select-cursor-brackets-style MULTI_SELECT_CURSOR_BRACKETS_STYLE]
                        [--multi-select-cursor-style MULTI_SELECT_CURSOR_STYLE]
                        [--multi-select-keys MULTI_SELECT_KEYS]
                        [--multi-select-no-select-on-accept]
                        [--multi-select-empty-ok] [-p PREVIEW_COMMAND]
                        [--no-preview-border] [--preview-size PREVIEW_SIZE]
                        [--preview-title PREVIEW_TITLE]
                        [--search-highlight-style SEARCH_HIGHLIGHT_STYLE]
                        [--search-key SEARCH_KEY]
                        [--shortcut-brackets-highlight-style SHORTCUT_BRACKETS_HIGHLIGHT_STYLE]
                        [--shortcut-key-highlight-style SHORTCUT_KEY_HIGHLIGHT_STYLE]
                        [--show-multi-select-hint]
                        [--show-multi-select-hint-text SHOW_MULTI_SELECT_HINT_TEXT]
                        [--show-search-hint]
                        [--show-search-hint-text SHOW_SEARCH_HINT_TEXT]
                        [--show-shortcut-hints]
                        [--show-shortcut-hints-in-title]
                        [--skip-empty-entries] [-b STATUS_BAR] [-d]
                        [--status-bar-style STATUS_BAR_STYLE] [--stdout]
                        [-t TITLE] [-V]
                        [-r PRESELECTED_ENTRIES | -R PRESELECTED_INDICES]
                        [entries ...]

simple-term-menu creates simple interactive menus in the terminal and returns the selected entry as exit code.

positional arguments:
  entries               the menu entries to show

options:
  -h, --help            show this help message and exit
  -s, --case-sensitive  searches are case sensitive
  -X, --no-clear-menu-on-exit
                        do not clear the menu on exit
  -l, --clear-screen    clear the screen before the menu is shown
  --cursor CURSOR       menu cursor (default: "> ")
  -i CURSOR_INDEX, --cursor-index CURSOR_INDEX
                        initially selected item index
  --cursor-style CURSOR_STYLE
                        style for the menu cursor as comma separated list
                        (default: "fg_red,bold")
  -C, --no-cycle        do not cycle the menu selection
  -E, --no-exit-on-shortcut
                        do not exit on shortcut keys
  --highlight-style HIGHLIGHT_STYLE
                        style for the selected menu entry as comma separated
                        list (default: "standout")
  -m, --multi-select    Allow the selection of multiple entries (implies
                        `--stdout`)
  --multi-select-cursor MULTI_SELECT_CURSOR
                        multi-select menu cursor (default: "[*] ")
  --multi-select-cursor-brackets-style MULTI_SELECT_CURSOR_BRACKETS_STYLE
                        style for brackets of the multi-select menu cursor as
                        comma separated list (default: "fg_gray")
  --multi-select-cursor-style MULTI_SELECT_CURSOR_STYLE
                        style for the multi-select menu cursor as comma
                        separated list (default: "fg_yellow,bold")
  --multi-select-keys MULTI_SELECT_KEYS
                        key for toggling a selected item in a multi-selection
                        (default: " ,tab",
  --multi-select-no-select-on-accept
                        do not select the currently highlighted menu item when
                        the accept key is pressed (it is still selected if no
                        other item was selected before)
  --multi-select-empty-ok
                        when used together with --multi-select-no-select-on-
                        accept allows returning no selection at all
  -p PREVIEW_COMMAND, --preview PREVIEW_COMMAND
                        Command to generate a preview for the selected menu
                        entry. "{}" can be used as placeholder for the menu
                        text. If the menu entry has a data component
                        (separated by "|"), this is used instead.
  --no-preview-border   do not draw a border around the preview window
  --preview-size PREVIEW_SIZE
                        maximum height of the preview window in fractions of
                        the terminal height (default: "0.25")
  --preview-title PREVIEW_TITLE
                        title of the preview window (default: "preview")
  --search-highlight-style SEARCH_HIGHLIGHT_STYLE
                        style of matched search patterns (default:
                        "fg_black,bg_yellow,bold")
  --search-key SEARCH_KEY
                        key to start a search (default: "/", "none" is treated
                        a special value which activates the search on any
                        letter key)
  --shortcut-brackets-highlight-style SHORTCUT_BRACKETS_HIGHLIGHT_STYLE
                        style of brackets enclosing shortcut keys (default:
                        "fg_gray")
  --shortcut-key-highlight-style SHORTCUT_KEY_HIGHLIGHT_STYLE
                        style of shortcut keys (default: "fg_blue")
  --show-multi-select-hint
                        show a multi-select hint in the status bar
  --show-multi-select-hint-text SHOW_MULTI_SELECT_HINT_TEXT
                        Custom text which will be shown as multi-select hint.
                        Use the placeholders {multi_select_keys} and
                        {accept_keys} if appropriately.
  --show-search-hint    show a search hint in the search line
  --show-search-hint-text SHOW_SEARCH_HINT_TEXT
                        Custom text which will be shown as search hint. Use
                        the placeholders {key} for the search key if
                        appropriately.
  --show-shortcut-hints
                        show shortcut hints in the status bar
  --show-shortcut-hints-in-title
                        show shortcut hints in the menu title
  --skip-empty-entries  Interpret an empty string in menu entries as an empty
                        menu entry
  -b STATUS_BAR, --status-bar STATUS_BAR
                        status bar text
  -d, --status-bar-below-preview
                        show the status bar below the preview window if any
  --status-bar-style STATUS_BAR_STYLE
                        style of the status bar lines (default:
                        "fg_yellow,bg_black")
  --stdout              Print the selected menu index or indices to stdout (in
                        addition to the exit status). Multiple indices are
                        separated by ";".
  -t TITLE, --title TITLE
                        menu title
  -V, --version         print the version number and exit
  -r PRESELECTED_ENTRIES, --preselected_entries PRESELECTED_ENTRIES
                        Comma separated list of strings matching menu items to
                        start pre-selected in a multi-select menu.
  -R PRESELECTED_INDICES, --preselected_indices PRESELECTED_INDICES
                        Comma separated list of numeric indexes of menu items
                        to start pre-selected in a multi-select menu.
Example with preview option
Instead of using the Python api as in the previous examples, a file menu with bat preview can also be created from the command line:

simple-term-menu -p "bat --color=always {}" \
                 --preview-size 0.75 \
                 $(find . -maxdepth 1  -type f | awk '{ print substr($0, 3) }')
```

### 5.3.11 More advanced example

```text
A more advanced example with sub menus (thanks to pageauc):

#!/usr/bin/env python3
"""
Demonstration example for GitHub Project at
https://github.com/IngoMeyer441/simple-term-menu

This code only works in python3. Install per

    sudo pip3 install simple-term-menu

"""
import time

from simple_term_menu import TerminalMenu


def main():
    main_menu_title = "  Main Menu\n"
    main_menu_items = ["Edit Menu", "Second Item", "Third Item", "Quit"]
    main_menu_cursor = "> "
    main_menu_cursor_style = ("fg_red", "bold")
    main_menu_style = ("bg_red", "fg_yellow")
    main_menu_exit = False

    main_menu = TerminalMenu(
        menu_entries=main_menu_items,
        title=main_menu_title,
        menu_cursor=main_menu_cursor,
        menu_cursor_style=main_menu_cursor_style,
        menu_highlight_style=main_menu_style,
        cycle_cursor=True,
        clear_screen=True,
    )

    edit_menu_title = "  Edit Menu\n"
    edit_menu_items = ["Edit Config", "Save Settings", "Back to Main Menu"]
    edit_menu_back = False
    edit_menu = TerminalMenu(
        edit_menu_items,
        title=edit_menu_title,
        menu_cursor=main_menu_cursor,
        menu_cursor_style=main_menu_cursor_style,
        menu_highlight_style=main_menu_style,
        cycle_cursor=True,
        clear_screen=True,
    )

    while not main_menu_exit:
        main_sel = main_menu.show()

        if main_sel == 0:
            while not edit_menu_back:
                edit_sel = edit_menu.show()
                if edit_sel == 0:
                    print("Edit Config Selected")
                    time.sleep(5)
                elif edit_sel == 1:
                    print("Save Selected")
                    time.sleep(5)
                elif edit_sel == 2:
                    edit_menu_back = True
                    print("Back Selected")
            edit_menu_back = False
        elif main_sel == 1:
            print("option 2 selected")
            time.sleep(5)
        elif main_sel == 2:
            print("option 3 selected")
            time.sleep(5)
        elif main_sel == 3:
            main_menu_exit = True
            print("Quit Selected")


if __name__ == "__main__":
    main()
```

### 5.3.12 Similar projects

```text
bullet: Creates bullet-lists with multi-selection support.
Contributing
Please open an issue on GitHub if you experience bugs or miss features. Please consider to send a pull request if you can spend time on fixing the issue yourself. This project uses pre-commit to ensure code quality and a consistent code style. Run

make git-hooks-install
to install all linters as Git hooks in your local clone of simple-term-menu.



id=__How_to_implement_a_dynamic_command_line_menu_in_Python
```

## 5.4 How to implement a dynamic command line menu in Python

```text
https://chunkofcode.net/how-to-implement-a-dynamic-command-line-menu-in-python/

In this post I will show you how to implement a dynamic command line menu in Python. In most tutorials and posts that I have seen online the usual way to implement a command line menu is a while loop with a bunch of if-elif statements. This implementation is okay for small menu’s, but it can quickly get very tedious if you need to modify your menu afterwards. In this implementation it is not possible to create dynamic menu items, meaning that we need to hard code the menu structure in a separate function.

First I will show you the usual implementation so that the advantages of a dynamic controller become more obvious. For the sake of this example I won’t worry about error handling or other things in order to keep the code as concise as possible. After the first example, I will also show what is the better way to do the menu dynamically.

if/elif menu
The first thing we need is a function that prints out the menu, so that the user knows which commands are available.

def print_menu():

    print((================================\n
           MENU\n
               ================================\n
               1 - First menu item\n
               2 - Second menu item\n
               3 - Third menu item\n
               5 - Fourth menu item\n
               6 - Exit\n
               ================================\n
           Enter a choice and press enter:), end= )
I prefer this kind of multiline syntax, because it enables you to write clean and aligned rows and it is surely more beautiful than the following version:

def print_menu():

    print(================================
MENU
    ================================
    1 - First menu item
    2 - Second menu item
    3 - Third menu item
    5 - Fourth menu item
    6 - Exit
    ================================
Enter a choice and press enter:)
My preferred version needs more typing, but at least that way you don’t have some strange unaligned string rows on the left. Then we create the actual menu functionality.

def menu():

    print_menu()
    user_input = 0

    while user_input != 6:

        user_input = int(input())

        if user_input == 1:
            print(Executing menu item 1)

        elif user_input == 2:
            print(Executing menu item 2)

        elif user_input == 3:
            print(Executing menu item 3)

        elif user_input == 4:
            print(Executing menu item 4)

        elif user_input == 5:
            print(Executing menu item 5)

        elif user_input == 6:
            print(Exiting...)
First we call the previously created print_menu() function and create a user_input variable to store the inputs typed in by the user. Then we enter the while loop and we run the while loop over and over again until the user types in the number 6, which exits the program.

Now we have our print_menu() function and the basic functionality in place. The next step is to run the program.

if __name__ == __main__:
    menu()
We could start developing the progam further by elaborating the if statements. We could create additional functions or modules to be called after a specific key press. We could add more elif statements to run more function. Of course, every time we add a new elif statement, we need to modify also our print_menu() function. This is where the dynamic menu controller starts making sense. Lets see next how it can be implemented.

Dynamic controller menu
We start by creating a new class for the controller with some methods in it. Let’s call the class Controller and the methods do_X.

class Controller:

    @staticmethod
    def do_1():
        print(Doing 1)

    @staticmethod
    def do_2():
        print(Doing 2)

    @staticmethod
    def do_3():
        print(Doing 3)

    @staticmethod
    def do_4():
        print(Doing 4)

    @staticmethod
    def do_5():
        print(Doing 5)

    @staticmethod
    def do_6():
        print(Exiting...)
This is the basic structure of the class. We simulate the if/elif statements of the previous example with separate methods that are called do_X methods. The do-methods in this example must be named with a do prefix. You will understand why later. So these are the methods that the user will be able to run from the command line. In this example we do not need to create an instance of the Controller class and that is why I use static methods here.

But how can we run all these methods? How do we bind the user input to a specific do-method?

The answer is rather simple once you’ve learned it once. We will need a separate helper method that takes the user input as an argument.

    @staticmethod
    def execute(user_input):
        controller_name = fdo_{user_input}
        try:
            controller = getattr(Controller, controller_name)
        except AttributeError:
            print(Method not found)
        else:
            controller()
In the snippet you can see the helper method. I still need to show you where to call this method from, but let’s go through the execute() method first.

First we create a string and store it to controller_name. The stored string will be formatted like do_{user_input}. Ideally the user input is a number that correnponds to one of our do-methods. If it doesn’t, an AttibureError will be raised.

Then we create a new variable, controller. We use the getattr() function to look for the requested do-method from within the Controller class. The first argument of the getattr() function is the class and the second one is the method name to be searched in a string format.

If no error is raised, we run the controller method created by the getattr() function. Now we need something to tie all this together. In the if/elif example we used a while loop, and so we do also in this one. Let’s create the run() method.

    @staticmethod
    def run():
        user_input = 0
        while(user_input != 6):
            user_input = int(input())
            Controller.execute(user_input)
        print(Program stopped.)
Perfect. Now we’ve got ourselves a working program. While the user inserts something that is not 6, the while loop will keep calling the execute() method with the wanted user input. If the user gives 6 as an input. The program stops and prints out “Program stopped.” notification.

Note that in this example we suppose that the exit method is the do_6 method. It may be necessary to write some code to find the last do-method from the class and use it as the exit method, so that you can add more do-methods without having to modify the run() method.

But there is no menu. We will need a generate_menu() method. But before writing the generate_menu() method. Add a docstring to all your do-methods. The docstring will be used for generating the menu dynamically.

Modify your do-methods as you please. I leave a one-method example here just for clarification.

    @staticmethod
    def do_1():
        First menu item
        print(Doing 1)
Then create the generate_menu() method.

    @staticmethod
    def generate_menu():
        print(================================)
        do_methods = [m for m in dir(Controller) if m.startswith('do_')]
        menu_string = "\n".join(
            [f{method[-1]}.  {getattr(Controller, method).__doc__}
             for method in do_methods])
        print(menu_string)
        print(================================)
        print(Insert a number:, end= )
So what is happening there. After the first line of equals signs we create a list of all methods (do_methods) that start with do_. These are the famous do-methods that will be used as our menu items.

After that we create a single string that contains the whole menu by using list comprehension and join method. This part is a bit hard to read so I will go through the list comprehension to make it more clear.

method[-1] is the number in the do-method name. For example, do_1.
getattr(Controller, method).__doc__ fetches the docstring of the method.
These steps are repeated for all the methods in the do_methods list. As a result we get a string that in this case would be “1. First menu item”. You may notice that done like this the menu work only when there are less than 10 do-methods, as method[-1] slices only the last character of the method name. This could be easily fixed, for example, by using a simple regular expression. Or maybe in some cases you could just grab everything that comes after the underscore.

Come to this point, we are ready to run our working controller.

def main():
    Controller.run()


if __name__ == __main__:
    main()
Conclusion
I showed you two ways to create menu structure for a command line application.

The first way was the simple way by using if/elif statements. This menu structure is fine for small menus that are not going to be modified afterwards. It is really easy to understand even for a beginner programmer. The downside of it is that if some revisions are needed, the modifying process can get tedious and error prone.

The second way was a dynamic controller. This is the way that I recommend for larger menus. It is a bit harder to understand, but it is important to get good grasp of it if you are planning on designing bigger applications. The advantage is that by adding more do-methods, the menu updates dynamically without having to revise it manually. This means that the menu is always up-to-date and the methods are accessible.

With the dynamic menu you can easily use other method ID’s than numbers. Nothing prevents you from using something like dojump_ or doshoot_ as your method name. You just need to adapt the generate_menu() to your method names.

That’s all for now. :)
```
