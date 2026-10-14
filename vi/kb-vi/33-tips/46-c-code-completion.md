---
type: reference
title: C++ code completion
description: "Vim tip: C++ code completion"
tags: [ide, cpp, vim, tips, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.47"
---

# 33.47 C++ code completion

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

```text
Tip 1608 author Knue · version 7.0 

This tip describes how to use C++ code completion in Vim (omni completion).

When editing a C++ file, enter the command :set omnifunc? to see what completion function is currently used. If the result is omnifunc=ccomplete#Complete, it means you are using the C completion provided with Vim (not C++). The following procedure provides C++ completion.
Contents
[hide]

    * 1 Required setup
    * 2 Using omni completion
    * 3 Additional information
    * 4 Comments

edit Required setup

|1. Install OmniCppComplete. See its doc/omnicppcomplete.txt file for information.
|
|2. Make a directory, for example ~/.vim/tags that will hold your ctags.
|
|3. Create stdc++ tags: Download and unpack the modified libstdc++ headers to ~/.vim/tags/cpp_src
(get it at http://www.vim.org/scripts/script.php?script_id=2358, intructions:
|1. unpack
|
|2. run
|$ ctags -R --c++-kinds=+p --fields=+iaS --extra=+q --language-force=C++ cpp_src
|$ mv tags cpp # or whatever
|
|3. In Vim:
set tags+=/my/path/to/tags/cpp 
 )
|
|4. Run ctags:

$ cd ~/.vim/tags
$ ctags -R --c++-kinds=+p --fields=+iaS --extra=+q --language-force=C++ cpp_src
$ mv tags cpp

|5. Add additional tags (change to your system/likings):

$ ctags -R --c++-kinds=+p --fields=+iaS --extra=+q --language-force=C++ /usr/include/GL/ && mv tags gl # for OpenGL
$ ctags -R --c++-kinds=+p --fields=+iaS --extra=+q --language-force=C++ /usr/include/SDL/ && mv tags sdl # for SDL
$ ctags -R --c++-kinds=+p --fields=+iaS --extra=+q --language-force=C++ /usr/include/qt4/ && mv tags qt4 # for QT4

For example, to add tags of ACS 5.1 project (enter clearcase view first then)
$ ctags -R --c++-kinds=+p --fields=+iaS --extra=+q --language-force=C++  && mv tags ~/.vim/tags/acs_5_1/

|6. Edit your ~/.vimrc and change to your system/likings:

" configure tags - add additional tags here or comment out not-used ones
set tags+=~/.vim/tags/cpp
set tags+=~/.vim/tags/gl
set tags+=~/.vim/tags/sdl
set tags+=~/.vim/tags/qt4
"For ACS 5_1
set tags+=~/.vim/tags/acs_5_1
#Note, on my linux dev env I need to run manualy the set tags commands from ex prompt to make it work
" build tags of your own project with CTRL+F12
map <C-F12> :!ctags -R --c++-kinds=+p --fields=+iaS --extra=+q .<CR>

" OmniCppComplete
let OmniCpp_NamespaceSearch = 1
let OmniCpp_GlobalScopeSearch = 1
let OmniCpp_ShowAccess = 1
let OmniCpp_MayCompleteDot = 1
let OmniCpp_MayCompleteArrow = 1
let OmniCpp_MayCompleteScope = 1
let OmniCpp_DefaultNamespaces = ["std", "_GLIBCXX_STD"]
" automatically open and close the popup menu / preview window
au CursorMovedI,InsertLeave * if pumvisible() == 0|silent! pclose|endif
set completeopt=menuone,menu,longest,preview

edit Using omni completion

When everything is set up properly you can use the code completion. Make sure the file-type of your file is set to cpp. Perhaps you must set it manually with

:setfiletype cpp

Now start typing:

std::

A box opens with suggestions. You can use C-n and C-p to navigate. C-x C-o opens the omnicompletion manually. A preview window should also appear on the top which shows the signature of functions and the like. Choose vector and continue:

std::vector<int> vi;
vi.

Another box opens with suggestions. Choose "push_back(" and continue.

As you can see this is a really nice feature which is especially nice when you use an external library which you don't know that good. Simply create the tags as described above and browse through the suggestions.
edit Additional information

It is nice to have the headers of the used libs really on your system so the preview window has something to show. So don't delete the headers after creating the tag files.
edit Comments

Notes paraphrased from a vim_use post by Brett Stahlman (to be merged into tip):

With standard Vim, when you edit a C++ file (*.cpp or *.cc), 'omnifunc' is set to ccomplete#Complete which uses the distributed omnicomplete function for C, defined in file: $VIMRUNTIME/autoload/ccomplete.vim

The C version can display class members, but it won't do so unless you declare the class variable with "class MyClass" (as opposed to simply "MyClass").

Solution: Use the omnicppcomplete plugin mentioned in the tip. It is C++ aware, and may also be used for C. It understands inheritance, "this" pointers, namespaces, etc.

Limitations: It's not fully functional with templates (supposedly because of limitations in exuberant ctags). So far, the only template limitation I've encountered is that "this" pointers aren't completed properly within method implementations.

How-it-works: The omnicppcomplete plugin, which consists of a number of Vim script files, implements an 'omnifunc' function (using the autoload mechanism) that handles completion for <C-X><C-O>, and also defines insert mode mappings for '.', '->', and '::', to ensure that completion is performed automatically when those characters are typed, without the need for the user to hit <C-X><C-O>.

    * :help i_CTRL-X_CTRL-O
    * :help 'omnifunc'
    * :help complete-functions 

The omnicppcomplete plugin's 'omnifunc' function first attempts to determine what sort of lookup needs to be performed, based upon the surrounding context, then performs the lookup in the tags file(s) specified in the 'tags' option. For C++ completion to work properly, you must use the ctags options shown in the tip, for example:

ctags --c++-kinds=+p --fields=+iaS --extra=+q test1.cpp

"
```
