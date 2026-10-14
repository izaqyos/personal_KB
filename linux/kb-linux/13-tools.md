---
type: reference
title: Tools
description: Section 13 of the legacy KB_Linux notes.
tags: [kb-linux, using, sort, to, list, directories, by, size]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "linux/KB_Linux#13"
---

# Tools

[↑ KB_Linux](/linux/kb-linux/README.md)

## 13.1 sort

```text
Sort text files.
Sort, merge, or compare all the lines from the files given (or standard input.)
```

### 13.1.1 Examples

```text
	   * Sort in descending (reverse) numeric order.

          sort -nr

     Sort alphabetically, omitting the first and second fields.  This
     uses a single key composed of the characters beginning at the
     start of field three and extending to the end of each line.

          sort -k3

   * Sort numerically on the second field and resolve ties by sorting
     alphabetically on the third and fourth characters of field five.
     Use `:' as the field delimiter.

          sort -t : -k 2,2n -k 5.3,5.4

     Note that if you had written `-k 2' instead of `-k 2,2' `sort'
     would have used all characters beginning in the second field and
     extending to the end of the line as the primary _numeric_ key.
     For the large majority of applications, treating keys spanning
     more than one field as numeric will not do what you expect.

     Also note that the `n' modifier was applied to the field-end
     specifier for the first key.  It would have been equivalent to
     specify `-k 2n,2' or `-k 2n,2n'.  All modifiers except `b' apply
     to the associated _field_, regardless of whether the modifier
     character is attached to the field-start and/or the field-end part
     of the key specifier.

   * Sort the password file on the fifth field and ignore any leading
     white space.  Sort lines with equal values in field five on the
     numeric user ID in field three.

          sort -t : -k 5b,5 -k 3,3n /etc/passwd

     An alternative is to use the global numeric modifier `-n'.

          sort -t : -n -k 5b,5 -k 3,3 /etc/passwd

   * Generate a tags file in case insensitive sorted order.
          find src -type f -print0 | sort -t / -z -f | xargs -0 etags --append

     The use of `-print0', `-z', and `-0' in this case mean that
     pathnames that contain Line Feed characters will not get broken up
     by the sort operation.

     Finally, to ignore both leading and trailing white space, you
     could have applied the `b' modifier to the field-end specifier for
     the first key,

          sort -t : -n -k 5b,5b -k 3,3 /etc/passwd

     or by using the global `-b' modifier instead of `-n' and an
     explicit `n' with the second key specifier.

          sort -t : -b -k 5,5 -k 3,3n /etc/passwd

A file name of `-' means standard input.

By default, sort writes the results to the standard output.
```

### 13.1.2 Using Sort to List Directories by Size, tags: Using Sort to List Directories by Size

````text
		    13.1.2.1 with hidden files
            du -shc .??* * | sort +0n

GPT explanation:
The `du` command is used to estimate file and directory space usage in Unix-like operating systems, and the `sort` command is used to sort lines of text. Let's break down the `du` and `sort` command in your provided command:

```bash
du -shc .??* * | sort +0n
```

| 1. `du`: This is the command for disk usage. It is used to calculate the sizes of files and directories.
| 
| 2. `-s`: This option tells `du` to display only the total size for each argument (i.e., each directory or file).
| 
| 3. `-h`: This option makes the output human-readable by using units like "K" for kilobytes, "M" for megabytes, etc.
| 
| 4. `-c`: This option causes `du` to display a grand total at the end of the output, which represents the total size of all the arguments combined.
| 
| 5. `.??*`: This is a wildcard pattern that matches hidden files and directories (those starting with a dot). The `??` part ensures that it doesn't match `.` and `..`, which represent the current directory and parent directory.
| 
| 6. `*`: This wildcard matches all other files and directories in the current directory.
| 
| 7. `|`: This is the pipe symbol, which is used to redirect the output of the `du` command as input to the `sort` command.
| 
| 8. `sort`: This is the command for sorting lines of text.
| 
| 9. `+0n`: This is an argument to the `sort` command. It specifies the sorting criteria, which is column 0 (the first column) numerically. In other words, it sorts the lines based on the numerical values in the first column.

Putting it all together, this command calculates the disk usage (size) of files and directories in the current directory and its subdirectories, displaying the total size in human-readable format, including hidden files and directories. It then sorts the results numerically based on the total size in ascending order.

The `sort +0n` part can be improved for clarity and modern syntax using the `-k` option to specify the sorting column and `-n` to indicate numerical sorting. Here's the updated command:

```bash
du -shc .??* * | sort -k1,1n
```

This command achieves the same result but is more readable and uses the `-k` option to explicitly specify the sorting criteria.

		    13.1.2.2 without hidden files
du -sk * | sort +0nr , works but misses hidden files

This will display the size of all directories and sort them from largest to smallest. If you want to sort them from smallest to largest, simply remove the ¿r¿.

du -sk * | sort +0n

Crude way: $ du -h . | grep '[0-9]M' | sort
````

### 13.1.3 Databases

#### 13.1.3.1 sqlite

```text
$ sqlite3
SQLite version 3.8.10.2 2015-05-20 18:17:19
Enter ".help" for usage hints.
Connected to a transient in-memory database.
Use ".open FILENAME" to reopen on a persistent database.
sqlite> ^D
$ sqlite3 /tmp/f.db
SQLite version 3.8.10.2 2015-05-20 18:17:19
Enter ".help" for usage hints.
sqlite> CREATE TABLE points(x INTEGER, y INTEGER)
   ...> ;
sqlite> INSERT INTO points (x,y) VALUES (1,2)
   ...> ;
sqlite> INSERT INTO points (x,y) VALUES (10,20);
sqlite> INSERT INTO points (x,y) VALUES (100,200);
sqlite> SELECT * FROM points WHERE (x>20)
   ...> ;
100|200
sqlite> 
```

### 13.1.4 FZF

```text
id=__fzf__linux__
Fzf


https://github.com/junegunn/fzf

Use:
find * -type f | fzf > selected

Without STDIN pipe, fzf will use find command to fetch the list of files excluding hidden ones. (You can override the default command with FZF_DEFAULT_COMMAND)
vim $(fzf)

Using the finder
* CTRL-J / CTRL-K (or CTRL-N / CTRL-P) to move cursor up and down
* Enter key to select the item, CTRL-C / CTRL-G / ESC to exit
* On multi-select mode (-m), TAB and Shift-TAB to mark multiple items
* Emacs style key bindings
* Mouse: scroll, click, double-click; shift-click and shift-scroll on multi-select mode


Layout
fzf by default starts in fullscreen mode, but you can make it start below the cursor with --height option.
vim $(fzf --height 40%)
Also check out --reverse and --layout options if you prefer "top-down" layout instead of the default "bottom-up" layout.
vim $(fzf --height 40% --reverse)
You can add these options to $FZF_DEFAULT_OPTS so that they're applied by default. For example,
export FZF_DEFAULT_OPTS='--height 40% --layout=reverse --border'

Search syntax
Unless otherwise specified, fzf starts in "extended-search mode" where you can type in multiple search terms delimited by spaces. e.g. ^music .mp3$ sbtrkt !fire
Token	Match type	Description
sbtrkt	fuzzy-match	Items that match sbtrkt
'wild	exact-match (quoted)	Items that include wild
^music	prefix-exact-match	Items that start with music
.mp3$	suffix-exact-match	Items that end with .mp3
!fire	inverse-exact-match	Items that do not include fire
!^music	inverse-prefix-exact-match	Items that do not start with music
!.mp3$	inverse-suffix-exact-match	Items that do not end with .mp3
If you don't prefer fuzzy matching and do not wish to "quote" every word, start fzf with -e or --exact option. Note that when --exact is set, '-prefix "unquotes" the term.
A single bar character term acts as an OR operator. For example, the following query matches entries that start with core and end with either go, rb, or py.
^core go$ | rb$ | py$

Environment variables
* FZF_DEFAULT_COMMAND
    * Default command to use when input is tty
    * e.g. export FZF_DEFAULT_COMMAND='fd --type f'
* FZF_DEFAULT_OPTS
    * Default options
    * e.g. export FZF_DEFAULT_OPTS="--layout=reverse --inline-info"



Install:

brew install fzf

# To install useful key bindings and fuzzy completion:
$(brew --prefix)/opt/fzf/install

Via git
git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf
~/.fzf/install

Vim plugin
" If installed using Homebrew
set rtp+=/usr/local/opt/fzf

" If installed using git
set rtp+=~/.fzf

Upgrade
* git: cd ~/.fzf && git pull && ./install
* brew: brew update; brew reinstall fzf



		13.1.5
```
