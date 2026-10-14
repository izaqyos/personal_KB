---
type: reference
title: Easily switch between two styles of color scheme
description: Subsection 33.39 of Tips..
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.39"
---

# 33.39 Easily switch between two styles of color scheme

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

```text
Tip 955 created June 28, 2005 · author Georg Dahn
Updated and merged to: Tip 341 
```

### 33.39.1 Old version

```text
Pan Shizhu's color scheme ps_color script#760 supports two styles, a cool (dark) and a warm (light) style. If you want to switch between these styles by just a single key stroke, you may define the following function in your vimrc file:

function! <SID>SwitchPSCStyle()
  if exists("g:psc_style")
    if g:psc_style == 'cool'
      let g:psc_style = 'warm'
    elseif g:psc_style == 'warm'
      let g:psc_style = 'cool'
    endif
  else
    let g:psc_style = 'warm'
  endif
  colorscheme ps_color
endfunction

In order to map this function to a key (for example to <F6>), just add the following mapping:

map <silent> <F6> :call <SID>SwitchPSCStyle()<CR>

This function cycles between the default colorscheme, peachpuff and desert.

function! <SID>SwitchColorSchemes()
  if exists("g:colors_name")
    if g:colors_name == 'default'
      colorscheme peachpuff
    elseif g:colors_name == 'peachpuff'
      colorscheme desert
    elseif g:colors_name == 'desert'
      colorscheme default
    endif
  endif
endfunction


This function cycles between the default colorscheme, and all my favorite colorschemes. I mapped to F7.

map <silent> <F7> :call <SID>SwitchColorSchemes()<CR>
function! <SID>SwitchColorSchemes()
	echo g:colors_name
  if exists("g:colors_name")
    if g:colors_name == 'default'
      colorscheme peachpuff
    elseif g:colors_name == 'peachpuff'
      colorscheme desert256
    elseif g:colors_name == 'desert256'
      colorscheme breeze
	elseif g:colors_name == "breeze"
	colorscheme morning 
	elseif g:colors_name == "morning"
	colorscheme darkblue 
	elseif g:colors_name == "darkblue"
	colorscheme gothic 
	elseif g:colors_name == "gothic"
	colorscheme aqua 
	elseif g:colors_name == "aqua"
	colorscheme earth 
	elseif g:colors_name == "earth"
	colorscheme black_angus 
	elseif g:colors_name == "black_angus"
	colorscheme relaxedgreen 
	elseif g:colors_name == "relaxedgreen"
	colorscheme darkblack  
	elseif g:colors_name == "darkblack"
	colorscheme freya  
	elseif g:colors_name == "freya"
	colorscheme motus  
	elseif g:colors_name == "motus"
	colorscheme impact  
	elseif g:colors_name == "impact"
	colorscheme less  
	elseif g:colors_name == "less"
	colorscheme chocolateliquor   
	elseif g:colors_name == "chocolateliquor"
	colorscheme default   
    endif
  endif
endfunction
```

### 33.39.2 Newer Version

```text
" Set next or previous colorscheme from a list.
function! SetNextColor(forward)
  if exists('g:colors_name')
    let colstr = 'default elflord peachpuff desert256 breeze morning'
    let colstr .= ' darkblue gothic aqua earth black_angus relaxedgreen'
    let colstr .= ' darkblack freya motus impact less chocolateliquor'
    let missing = []
    let colors = split(colstr)
    let current = index(colors, g:colors_name)
    for i in range(len(colors))
      let current += (a:forward ? 1 : -1)
      if !(0 <= current && current < len(colors))
        let current = (a:forward ? 0 : len(colors)-1)
      endif
      try
        execute 'colorscheme '.colors[current]
        break
      catch /E185:/
        call add(missing, colors[current])
      endtry
    endfor
    redraw
    if len(missing) > 0
      echo 'Error: colorscheme not found:' join(missing)
    endif
    echo g:colors_name
  endif
endfunction
nnoremap <F8> :call SetNextColor(1)<CR>
nnoremap <S-F8> :call SetNextColor(0)<CR>



"
```

### 33.39.3 Updated version

```text
You can easily change your color scheme, but it can be hard to compare several schemes to decide what's best for you. It may help to view a one-page summary of many color schemes.

Alternatively, the script presented below allows you to quickly change colors by pressing a key. If you like variety, you can start Vim with a different scheme depending upon the time of day.
Contents

    * 1 One page summary of color schemes
    * 2 Script features
    * 3 Script usage
    * 4 Scrolling the color schemes
    * 5 References
    * 6 Comments
```

#### 33.39.3.1 One page summary of color schemes

```text
Maverick Woo has created a one-page summary showing sample C code in many different color schemes. Other pages at the same site show similar information for html, Java, LaTeX and Perl.

Some of the color schemes are provided with Vim. For example, the following command should show the elflord scheme:

:colorscheme elflord

Many samples show color schemes downloaded from Vim scripts (use its search facility to find a particular scheme).
```

#### 33.39.3.2 Script features

```text
The script defines these key mappings:

    * Press F8 to use the next color scheme.
    * Press Shift-F8 to use the previous color scheme.
    * Press Alt-F8 to use a random color scheme. 

    (Note I prefer F7 tp F8)

The next/previous/random color scheme selection uses a list of scheme names maintained by the script. The list can be controlled with these commands (the default is all):

:SetColors all
    To use all installed color schemes ($VIMRUNTIME/colors/*.vim). 
:SetColors my
    To use names built into the script (define these names by editing the script to change the variables c1, c2 and c3). 
:SetColors blue slate ron
    To use the schemes specified (scheme names, separated with a space, for example, blue slate ron). 
:SetColors
    To display the current list of scheme names. 

After using :SetColors to list the scheme names (and while the list is still displayed), you could type :colors d then press Tab to expand 'd' to a color scheme name starting with 'd'. Then press Enter to invoke the color scheme (:colors is an abbreviation for :colorscheme).

Enter :SetColors now to set the current color scheme based on the time of day. Change the colors used by editing the nowcolors variable in the script, for example:

let nowcolors = 'breeze earth less aqua gothic'
```

#### 33.39.3.3 Script usage

```text
    * Create and save file setcolors.vim containing the script below.
    * In Vim, use the command :source setcolors.vim to execute the script so you can experiment with its features.
    * Alternatively, if you save the script in file ~/.vim/plugin/setcolors.vim (Unix) or $HOME/vimfiles/plugin/setcolors.vim (Windows), it will be available whenever you start Vim. 

" Change the color scheme from a list of color scheme names.
" Version 2008-11-02 from http://vim.wikia.com/wiki/VimTip341
" Press key:
"   F7                next scheme
"   Shift-F7          previous scheme
"   Alt-F7            random scheme
" Set the list of color schemes used by the above (default is 'all'):
"   :SetColors all              (all $VIMRUNTIME/colors/*.vim)
"   :SetColors my               (names built into script)
"   :SetColors blue slate ron   (these schemes)
"   :SetColors                  (display current scheme names)
" Set the current color scheme based on time of day:
"   :SetColors now
if v:version < 700 || exists('loaded_setcolors') || &cp
  finish
endif
let loaded_setcolors = 1
let s:mycolors = []  " colorscheme names that we use to set color

" Set list of color scheme names that we will use, except
" argument 'now' actually changes the current color scheme.
function! s:SetColors(args)
  if len(a:args) == 0
    echo 'Current color scheme names:'
    let i = 0
    while i < len(s:mycolors)
      echo '  '.join(map(s:mycolors[i : i+4], 'printf("%-14s", v:val)'))
      let i += 5
    endwhile
  elseif a:args == 'all'
    let paths = split(globpath(&runtimepath, 'colors/*.vim'), "\n")
    let s:mycolors = map(paths, 'fnamemodify(v:val, ":t:r")')
    echo 'List of colors set from all installed color schemes'
  elseif a:args == 'my'
    let c1 = 'default elflord peachpuff desert256 breeze morning'
    let c2 = 'darkblue gothic aqua earth black_angus relaxedgreen'
    let c3 = 'darkblack freya motus impact less chocolateliquor'
    let c4 = 'novula midnight revolutions camo lilac moria'
    let c5 = 'fog taqua buttercream olive revolutions autumn2'
    let s:mycolors = split(c1.' '.c2.' '.c3.' '.c4.' '.c5)
    echo 'List of colors set from built-in names'
  elseif a:args == 'now'
    call s:HourColor()
  else
    let s:mycolors = split(a:args)
    echo 'List of colors set from argument (space-separated names)'
  endif
endfunction
command! -nargs=* SetColors call <SID>SetColors('<args>')

" Set next/previous/random (how = 1/-1/0) color from our list of colors.
" The 'random' index is actually set from the current time in seconds.
" Global (no 's:') so can easily call from command line.
function! NextColor(how)
  if len(s:mycolors) == 0
    call s:SetColors('all')
  endif
  if exists('g:colors_name')
    let current = index(s:mycolors, g:colors_name)
  else
    let current = -1
  endif
  let missing = []
  let how = a:how
  for i in range(len(s:mycolors))
    if how == 0
      let current = localtime() % len(s:mycolors)
      let how = 1  " in case random color does not exist
    else
      let current += how
      if !(0 <= current && current < len(s:mycolors))
        let current = (how>0 ? 0 : len(s:mycolors)-1)
      endif
    endif
    try
      execute 'colorscheme '.s:mycolors[current]
      break
    catch /E185:/
      call add(missing, s:mycolors[current])
    endtry
  endfor
  redraw
  if len(missing) > 0
    echo 'Error: colorscheme not found:' join(missing)
  endif
  echo g:colors_name
endfunction
nnoremap <F7> :call NextColor(1)<CR>
nnoremap <S-F7> :call NextColor(-1)<CR>
nnoremap <A-F7> :call NextColor(0)<CR>

" Set color scheme according to current time of day.
function! s:HourColor()
  let hr = str2nr(strftime('%H'))
  if hr <= 3
    let i = 0
  elseif hr <= 7
    let i = 1
  elseif hr <= 14
    let i = 2
  elseif hr <= 18
    let i = 3
  else
    let i = 4
  endif
  let nowcolors = 'elflord morning desert evening pablo'
  execute 'colorscheme '.split(nowcolors)[i]
  redraw
  echo g:colors_name
endfunction




"
```

#### 33.39.3.4 Scrolling the color schemes

```text
You may want to impress your colleagues by having Vim change the color scheme periodically. The following might be your first attempt:

:autocmd CursorHold * call NextColor(1)

However, this fails because there is no timer event in Vim. The CursorHold event will fire only once when the user has been idle for the time specified with the 'updatetime' option (so if you stop typing, the color scheme will change once only).

If you want the color scheme to change every 10 seconds, execute the following command (press Ctrl-C to finish).

:while 1|sleep 10|call NextColor(1)|endwhile
```

#### 33.39.3.5 References

```text
    * :help :colorscheme
    * :help g:colors_name 
    	

		33.39.4
```
