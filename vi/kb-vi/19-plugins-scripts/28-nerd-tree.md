---
type: reference
title: NERD tree
description: "Subsection 19.25 of PLUGINS, Scripts."
tags: [kb-vi, plugins, scripts, extensions, colorschemes, list, active]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#19.25"
---

# 19.25 NERD tree

[↑ PLUGINS, Scripts](/vi/kb-vi/19-plugins-scripts/README.md)

```text
What is this "NERD tree"??

The NERD tree allows you to explore your filesystem and to open files and
directories. It presents the filesystem to you in the form of a tree which you
manipulate with the keyboard and/or mouse. It also allows you to perform
simple filesystem operations.

The following features and functionality are provided by the NERD tree:
    * Files and directories are displayed in a hierarchical tree structure
    * Different highlighting is provided for the following types of nodes:
        * files
        * directories
        * sym-links
        * windows .lnk files
        * read-only files
        * executable files
    * Many (customisable) mappings are provided to manipulate the tree:
        * Mappings to open/close/explore directory nodes
        * Mappings to open files in new/existing windows/tabs
        * Mappings to change the current root of the tree
        * Mappings to navigate around the tree
        * ...
    * Directories and files can be bookmarked.
    * Most NERD tree navigation can also be done with the mouse
    * Filtering of tree content (can be toggled at runtime)
        * custom file filters to prevent e.g. vim backup files being displayed
        * optional displaying of hidden files (. files)
        * files can be "turned off" so that only directories are displayed
    * The position and size of the NERD tree window can be customised
    * The order in which the nodes in the tree are listed can be customised.
    * A model of your filesystem is created/maintained as you explore it. This
      has several advantages:
        * All filesystem information is cached and is only re-read on demand
        * If you revisit a part of the tree that you left earlier in your
          session, the directory nodes will be opened/closed as you left them
    * The script remembers the cursor position and window position in the NERD
      tree so you can toggle it off (or just close the tree window) and then
      reopen it (with NERDTreeToggle) the NERD tree window will appear exactly
      as you left it
    * You can have a separate NERD tree for each tab, share trees across tabs,
      or a mix of both.
    * By default the script overrides the default file browser (netw), so if
      you :edit a directory a (slighly modified) NERD tree will appear in the
      current window
    * A programmable menu system is provided (simulates right clicking on a
      node)
        * one default menu plugin is provided to perform basic filesytem
          operations (create/delete/move/copy files/directories)
    * There's an API for adding your own keymappings
```

### 19.25.1 Install

```text
install details
Unzip the archive into your ~/.vim directory.
That should put NERD_tree.vim in ~/.vim/plugin and NERD_tree.txt in ~/.vim/doc.
Run :helptags.
```

### 19.25.2 Get help

```text
h NERD_tree.txt
```

### 19.25.3 Commands

```text
:NERDTree [<start-directory> | <bookmark>]                         *:NERDTree*
    Opens a fresh NERD tree. The root of the tree depends on the argument
    given. There are 3 cases: If no argument is given, the current directory
    will be used.  If a directory is given, that will be used. If a bookmark
    name is given, the corresponding directory will be used.  For example: >
        :NERDTree /home/marty/vim7/src
        :NERDTree foo   (foo is the name of a bookmark)
<
:NERDTreeFromBookmark <bookmark>                       *:NERDTreeFromBookmark*
    Opens a fresh NERD tree with the root initialized to the dir for
    <bookmark>.  This only reason to use this command over :NERDTree is for
    the completion (which is for bookmarks rather than directories).

:NERDTreeToggle [<start-directory> | <bookmark>]             *:NERDTreeToggle*
    If a NERD tree already exists for this tab, it is reopened and rendered
    again.  If no NERD tree exists for this tab then this command acts the
    same as the |:NERDTree| command.

:NERDTreeMirror                                              *:NERDTreeMirror*
    Shares an existing NERD tree, from another tab, in the current tab.
    Changes made to one tree are reflected in both as they are actually the
    same buffer.

    If only one other NERD tree exists, that tree is automatically mirrored. If
    more than one exists, the script will ask which tree to mirror.

:NERDTreeClose                                                *:NERDTreeClose*
    Close the NERD tree in this tab.

:NERDTreeFind                                                  *:NERDTreeFind*
    Find the current file in the tree. If no tree exists for the current tab,
    or the file is not under the current root, then initialize a new tree where
    the root is the directory of the current file.
```

### 19.25.4 Bookmarks

```text
Bookmarks in the NERD tree are a way to tag files or directories of interest.
For example, you could use bookmarks to tag all of your project directories.

------------------------------------------------------------------------------
```

#### 19.25.4.1 The Bookmark Table *NERDTreeBookmarkTable*

```text
If the bookmark table is active (see |NERDTree-B| and
|'NERDTreeShowBookmarks'|), it will be rendered above the tree. You can double
click bookmarks or use the |NERDTree-o| mapping to activate them. See also,
|NERDTree-t| and |NERDTree-T|

------------------------------------------------------------------------------
```

#### 19.25.4.2 Bookmark commands *NERDTreeBookmarkCommands*

```text
Note that the following commands are only available in the NERD tree buffer.

:Bookmark <name>
    Bookmark the current node as <name>. If there is already a <name>
    bookmark, it is overwritten. <name> must not contain spaces.

:BookmarkToRoot <bookmark>
    Make the directory corresponding to <bookmark> the new root. If a treenode
    corresponding to <bookmark> is already cached somewhere in the tree then
    the current tree will be used, otherwise a fresh tree will be opened.
    Note that if <bookmark> points to a file then its parent will be used
    instead.

:RevealBookmark <bookmark>
    If the node is cached under the current root then it will be revealed
    (i.e. directory nodes above it will be opened) and the cursor will be
    placed on it.

:OpenBookmark <bookmark>
    <bookmark> must point to a file. The file is opened as though |NERDTree-o|
    was applied. If the node is cached under the current root then it will be
    revealed and the cursor will be placed on it.

:ClearBookmarks [<bookmarks>]
    Remove all the given bookmarks. If no bookmarks are given then remove all
    bookmarks on the current node.

:ClearAllBookmarks
    Remove all bookmarks.

:ReadBookmarks
    Re-read the bookmarks in the |'NERDTreeBookmarksFile'|.

See also |:NERDTree| and |:NERDTreeFromBookmark|.

------------------------------------------------------------------------------
```

#### 19.25.4.3 Invalid Bookmarks *NERDTreeInvalidBookmarks*

```text
If invalid bookmarks are detected, the script will issue an error message and
the invalid bookmarks will become unavailable for use.

These bookmarks will still be stored in the bookmarks file (see
|'NERDTreeBookmarksFile'|), down the bottom. There will always be a blank line
after the valid bookmarks but before the invalid ones.

Each line in the bookmarks file represents one bookmark. The proper format is:
<bookmark name><space><full path to the bookmark location>

After you have corrected any invalid bookmarks, either restart vim, or go
:ReadBookmarks from the NERD tree window.
```

### 19.25.5 NERD tree Mappings *NERDTreeMappings*

```text
Default  Description~                                             help-tag~
Key~

o.......Open files, directories and bookmarks....................|NERDTree-o|
go......Open selected file, but leave cursor in the NERDTree.....|NERDTree-go|
t.......Open selected node/bookmark in a new tab.................|NERDTree-t|
T.......Same as 't' but keep the focus on the current tab........|NERDTree-T|
i.......Open selected file in a split window.....................|NERDTree-i|
gi......Same as i, but leave the cursor on the NERDTree..........|NERDTree-gi|
s.......Open selected file in a new vsplit.......................|NERDTree-s|
gs......Same as s, but leave the cursor on the NERDTree..........|NERDTree-gs|
O.......Recursively open the selected directory..................|NERDTree-O|
x.......Close the current nodes parent...........................|NERDTree-x|
X.......Recursively close all children of the current node.......|NERDTree-X|
e.......Edit the current dif.....................................|NERDTree-e|

<CR>...............same as |NERDTree-o|.
double-click.......same as the |NERDTree-o| map.
middle-click.......same as |NERDTree-i| for files, same as
                   |NERDTree-e| for dirs.

D.......Delete the current bookmark .............................|NERDTree-D|

P.......Jump to the root node....................................|NERDTree-P|
p.......Jump to current nodes parent.............................|NERDTree-p|
K.......Jump up inside directories at the current tree depth.....|NERDTree-K|
J.......Jump down inside directories at the current tree depth...|NERDTree-J|
<C-J>...Jump down to the next sibling of the current directory...|NERDTree-C-J|
<C-K>...Jump up to the previous sibling of the current directory.|NERDTree-C-K|

C.......Change the tree root to the selected dir.................|NERDTree-C|
u.......Move the tree root up one directory......................|NERDTree-u|
U.......Same as 'u' except the old root node is left open........|NERDTree-U|
r.......Recursively refresh the current directory................|NERDTree-r|
R.......Recursively refresh the current root.....................|NERDTree-R|
m.......Display the NERD tree menu...............................|NERDTree-m|
cd......Change the CWD to the dir of the selected node...........|NERDTree-cd|

I.......Toggle whether hidden files displayed....................|NERDTree-I|
f.......Toggle whether the file filters are used.................|NERDTree-f|
F.......Toggle whether files are displayed.......................|NERDTree-F|
B.......Toggle whether the bookmark table is displayed...........|NERDTree-B|

q.......Close the NERDTree window................................|NERDTree-q|
A.......Zoom (maximize/minimize) the NERDTree window.............|NERDTree-A|
?.......Toggle the display of the quick help.....................|NERDTree-?|

------------------------------------------------------------------------------
                                                                  *NERDTree-o*
Default key: o
Map option: NERDTreeMapActivateNode
Applies to: files and directories.

If a file node is selected, it is opened in the previous window.

If a directory is selected it is opened or closed depending on its current
state.

If a bookmark that links to a directory is selected then that directory
becomes the new root.

If a bookmark that links to a file is selected then that file is opened in the
previous window.

------------------------------------------------------------------------------
                                                                 *NERDTree-go*
Default key: go
Map option: None
Applies to: files.

If a file node is selected, it is opened in the previous window, but the
cursor does not move.

The key combo for this mapping is always "g" + NERDTreeMapActivateNode (see
|NERDTree-o|).

------------------------------------------------------------------------------
                                                                  *NERDTree-t*
Default key: t
Map option: NERDTreeMapOpenInTab
Applies to: files and directories.

Opens the selected file in a new tab. If a directory is selected, a fresh
NERD Tree for that directory is opened in a new tab.

If a bookmark which points to a directory is selected, open a NERD tree for
that directory in a new tab. If the bookmark points to a file, open that file
in a new tab.

------------------------------------------------------------------------------
                                                                  *NERDTree-T*
Default key: T
Map option: NERDTreeMapOpenInTabSilent
Applies to: files and directories.

The same as |NERDTree-t| except that the focus is kept in the current tab.

------------------------------------------------------------------------------
                                                                  *NERDTree-i*
Default key: i
Map option: NERDTreeMapOpenSplit
Applies to: files.

Opens the selected file in a new split window and puts the cursor in the new
window.

------------------------------------------------------------------------------
                                                                 *NERDTree-gi*
Default key: gi
Map option: None
Applies to: files.

The same as |NERDTree-i| except that the cursor is not moved.

The key combo for this mapping is always "g" + NERDTreeMapOpenSplit (see
|NERDTree-i|).

------------------------------------------------------------------------------
                                                                  *NERDTree-s*
Default key: s
Map option: NERDTreeMapOpenVSplit
Applies to: files.

Opens the selected file in a new vertically split window and puts the cursor in
the new window.

------------------------------------------------------------------------------
                                                                 *NERDTree-gs*
Default key: gs
Map option: None
Applies to: files.

The same as |NERDTree-s| except that the cursor is not moved.

The key combo for this mapping is always "g" + NERDTreeMapOpenVSplit (see
|NERDTree-s|).

------------------------------------------------------------------------------
                                                                  *NERDTree-O*
Default key: O
Map option: NERDTreeMapOpenRecursively
Applies to: directories.

Recursively opens the selelected directory.

All files and directories are cached, but if a directory would not be
displayed due to file filters (see |'NERDTreeIgnore'| |NERDTree-f|) or the
hidden file filter (see |'NERDTreeShowHidden'|) then its contents are not
cached. This is handy, especially if you have .svn directories.

------------------------------------------------------------------------------
                                                                  *NERDTree-x*
Default key: x
Map option: NERDTreeMapCloseDir
Applies to: files and directories.

Closes the parent of the selected node.

------------------------------------------------------------------------------
                                                                  *NERDTree-X*
Default key: X
Map option: NERDTreeMapCloseChildren
Applies to: directories.

Recursively closes all children of the selected directory.

Tip: To quickly "reset" the tree, use |NERDTree-P| with this mapping.

------------------------------------------------------------------------------
                                                                  *NERDTree-e*
Default key: e
Map option: NERDTreeMapOpenExpl
Applies to: files and directories.

|:edit|s the selected directory, or the selected file's directory. This could
result in a NERD tree or a netrw being opened, depending on
|'NERDTreeHijackNetrw'|.

------------------------------------------------------------------------------
                                                                  *NERDTree-D*
Default key: D
Map option: NERDTreeMapDeleteBookmark
Applies to: lines in the bookmarks table

Deletes the currently selected bookmark.

------------------------------------------------------------------------------
                                                                  *NERDTree-P*
Default key: P
Map option: NERDTreeMapJumpRoot
Applies to: no restrictions.

Jump to the tree root.

------------------------------------------------------------------------------
                                                                  *NERDTree-p*
Default key: p
Map option: NERDTreeMapJumpParent
Applies to: files and directories.

Jump to the parent node of the selected node.

------------------------------------------------------------------------------
                                                                  *NERDTree-K*
Default key: K
Map option: NERDTreeMapJumpFirstChild
Applies to: files and directories.

Jump to the first child of the current nodes parent.

If the cursor is already on the first node then do the following:
    * loop back thru the siblings of the current nodes parent until we find an
      open dir with children
    * go to the first child of that node

------------------------------------------------------------------------------
                                                                  *NERDTree-J*
Default key: J
Map option: NERDTreeMapJumpLastChild
Applies to: files and directories.

Jump to the last child of the current nodes parent.

If the cursor is already on the last node then do the following:
    * loop forward thru the siblings of the current nodes parent until we find
      an open dir with children
    * go to the last child of that node

------------------------------------------------------------------------------
                                                                *NERDTree-C-J*
Default key: <C-J>
Map option: NERDTreeMapJumpNextSibling
Applies to: files and directories.

Jump to the next sibling of the selected node.

------------------------------------------------------------------------------
                                                                *NERDTree-C-K*
Default key: <C-K>
Map option: NERDTreeMapJumpPrevSibling
Applies to: files and directories.

Jump to the previous sibling of the selected node.

------------------------------------------------------------------------------
                                                                  *NERDTree-C*
Default key: C
Map option: NERDTreeMapChdir
Applies to: directories.

Make the selected directory node the new tree root. If a file is selected, its
parent is used.

------------------------------------------------------------------------------
                                                                  *NERDTree-u*
Default key: u
Map option: NERDTreeMapUpdir
Applies to: no restrictions.

Move the tree root up a dir (like doing a "cd ..").

------------------------------------------------------------------------------
                                                                  *NERDTree-U*
Default key: U
Map option: NERDTreeMapUpdirKeepOpen
Applies to: no restrictions.

Like |NERDTree-u| except that the old tree root is kept open.

------------------------------------------------------------------------------
                                                                  *NERDTree-r*
Default key: r
Map option: NERDTreeMapRefresh
Applies to: files and directories.

If a dir is selected, recursively refresh that dir, i.e. scan the filesystem
for changes and represent them in the tree.

If a file node is selected then the above is done on it's parent.

------------------------------------------------------------------------------
                                                                  *NERDTree-R*
Default key: R
Map option: NERDTreeMapRefreshRoot
Applies to: no restrictions.

Recursively refresh the tree root.

------------------------------------------------------------------------------
                                                                  *NERDTree-m*
Default key: m
Map option: NERDTreeMapMenu
Applies to: files and directories.

Display the NERD tree menu. See |NERDTreeMenu| for details.

------------------------------------------------------------------------------
                                                                 *NERDTree-cd*
Default key: cd
Map option: NERDTreeMapChdir
Applies to: files and directories.

Change vims current working directory to that of the selected node.

------------------------------------------------------------------------------
                                                                  *NERDTree-I*
Default key: I
Map option: NERDTreeMapToggleHidden
Applies to: no restrictions.

Toggles whether hidden files (i.e. "dot files") are displayed.

------------------------------------------------------------------------------
                                                                  *NERDTree-f*
Default key: f
Map option: NERDTreeMapToggleFilters
Applies to: no restrictions.

Toggles whether file filters are used. See |'NERDTreeIgnore'| for details.

------------------------------------------------------------------------------
                                                                  *NERDTree-F*
Default key: F
Map option: NERDTreeMapToggleFiles
Applies to: no restrictions.

Toggles whether file nodes are displayed.

------------------------------------------------------------------------------
                                                                  *NERDTree-B*
Default key: B
Map option: NERDTreeMapToggleBookmarks
Applies to: no restrictions.

Toggles whether the bookmarks table is displayed.

------------------------------------------------------------------------------
                                                                  *NERDTree-q*
Default key: q
Map option: NERDTreeMapQuit
Applies to: no restrictions.

Closes the NERDtree window.

------------------------------------------------------------------------------
                                                                  *NERDTree-A*
Default key: A
Map option: NERDTreeMapToggleZoom
Applies to: no restrictions.

Maximize (zoom) and minimize the NERDtree window.

------------------------------------------------------------------------------
                                                                  *NERDTree-?*
Default key: ?
Map option: NERDTreeMapHelp
Applies to: no restrictions.

Toggles whether the quickhelp is displayed.



		19.25.6
```
