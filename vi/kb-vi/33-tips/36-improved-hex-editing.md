---
type: reference
title: Improved Hex editing
description: Subsection 33.37 of Tips..
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.37"
---

# 33.37 Improved Hex editing

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

```text
Tip 1518 created October 3, 2007 · author Fritzophrenic 

Many advanced text editors allow the editing of files in a "hex mode," especially useful for editing binary files. Vim provides this capability through the external program xxd, which is included by default in standard distributions of Vim. Unfortunately, using an external program for this task is non-intuitive and error-prone. A user must remember how to run the filter (:%!xxd to convert to hex, :%!xxd -r to convert back), must remember to convert back from hex before saving, cannot convert read-only files without warnings, and more. This tip improves the use of xxd to edit hex files by adding a mapping and command to easily toggle back and forth between hex and non-hex mode, and automating tasks like converting back from the hex-filtered form before saving a file.
```

### 33.37.1 Easily enter and leave hex mode

```text
Placing the following code in your vimrc will provide a :Hexmode ex command to toggle xxd hex mode on or off. It will keep track of what mode you are in, so you don't have to. This ex command is easy to map like this:

nnoremap <C-H> :Hexmode<CR>
inoremap <C-H> <Esc>:Hexmode<CR>
vnoremap <C-H> :<C-U>Hexmode<CR>

Note that <C-H> is already a defined command, so override it with care (or use a different left hand side to the mapping). See :help CTRL-H, :help i_CTRL-H, :help v_CTRL-H. Also, you may need to use gvim to distinguish between <C-H> and <BS>.

Note, I use  leader (\) hx for this as follows:
nnoremap <LEADER>hx :Hexmode<CR>
inoremap <LEADER>hx <Esc>:Hexmode<CR>
vnoremap <LEADER>hx :<C-U>Hexmode<CR>


" ex command for toggling hex mode - define mapping if desired
command -bar Hexmode call ToggleHex()

" helper function to toggle hex mode
function ToggleHex()
  " hex mode should be considered a read-only operation
  " save values for modified and read-only for restoration later,
  " and clear the read-only flag for now
  let l:modified=&mod
  let l:oldreadonly=&readonly
  let &readonly=0
  let l:oldmodifiable=&modifiable
  let &modifiable=1
  if !exists("b:editHex") || !b:editHex
    " save old options
    let b:oldft=&ft
    let b:oldbin=&bin
    " set new options
    setlocal binary " make sure it overrides any textwidth, etc.
    let &ft="xxd"
    " set status
    let b:editHex=1
    " switch to hex editor
    %!xxd
  else
    " restore old options
    let &ft=b:oldft
    if !b:oldbin
      setlocal nobinary
    endif
    " set status
    let b:editHex=0
    " return to normal editing
    %!xxd -r
  endif
  " restore values for modified and read only state
  let &mod=l:modified
  let &readonly=l:oldreadonly
  let &modifiable=l:oldmodifiable
endfunction
```

### 33.37.2 Automatically handle hex mode

```text
It would be nice if the user did not need to remember to convert back from hex before saving changes to a binary file. Also, certain files are almost always binary; it would be nice if Vim would pick up on this and automatically enter an appropriate editing mode. The help files for Vim include the following advice for automating the xxd-style hex editing capabilities for Vim, in order to automate the conversion and automatically enter hex mode for binary files:

" vim -b : edit binary using xxd-format!
augroup Binary
  au!
  au BufReadPre  *.bin let &bin=1
  au BufReadPost *.bin if &bin | %!xxd
  au BufReadPost *.bin set ft=xxd | endif
  au BufWritePre *.bin if &bin | %!xxd -r
  au BufWritePre *.bin endif
  au BufWritePost *.bin if &bin | %!xxd
  au BufWritePost *.bin set nomod | endif
augroup END

There are a few problems with this approach:

|   1. Only files with a .bin extension are opened this way, even if editing a file in binary mode (e.g. with ++bin)
|   2. This sets the binary option for any future documents opened as well. If you use tabe, for example, or if you have Vim set up to open new files in tabs, then any new files opened will open in binary mode.
|   3. If you decide to edit a binary file without the xxd, the BufWrite autocommands will try to convert it with xxd -r anyway.
|   4. Viewing a file in "xxd mode" requires you to modify the file, so read-only files will warn you if you try to do so, even if you make no changes. Buffers with 'nomodifiable' will cause errors.
|   5. If you go back into non-xxd editing, the filetype will still be xxd. 

These problems can be fixed as follows:

|   1. Trigger on all files if they are being edited with the binary option. Modify the extension-specific autocmd to set the binary option.
|   2. Use setlocal rather than using the global binary option.
|   3. Maintain a variable for each buffer that tracks whether the file is in "xxd mode". Only restore to non-xxd before writing if this variable says we are in the appropriate mode.
|   4. Temporarily clear the read-only flag whenever you transition between xxd and non-xxd mode, resetting it afterward.
|   5. Store the filetype when entering xxd mode and restore it when leaving. 

Below is some code for your vimrc that does all of this, making use of the command we define above:

" autocmds to automatically enter hex mode and handle file writes properly
if has("autocmd")
  " vim -b : edit binary using xxd-format!
  augroup Binary
    au!
    au BufReadPre *.bin,*.hex setlocal binary
    au BufReadPost *
          \ if &binary | Hexmode | endif
    au BufWritePre *
          \ if exists("b:editHex") && b:editHex && &binary |
          \  let oldro=&ro | let &ro=0 |
          \  let oldma=&ma | let &ma=1 |
          \  exe "%!xxd -r" |
          \  let &ma=oldma | let &ro=oldro |
          \  unlet oldma | unlet oldro |
          \ endif
    au BufWritePost *
          \ if exists("b:editHex") && b:editHex && &binary |
          \  let oldro=&ro | let &ro=0 |
          \  let oldma=&ma | let &ma=1 |
          \  exe "%!xxd" |
          \  exe "set nomod" |
          \  let &ma=oldma | let &ro=oldro |
          \  unlet oldma | unlet oldro |
          \ endif
  augroup END
endif


"
This will make Vim automatically invoke hex mode using the command defined earlier whenever a file is opened in binary mode, and will automatically (locally) set binary mode for .bin and .hex files (so .bin and .hex files will automatically open in hex mode always). 
```

### 33.37.3 Other enhancements

```text
You may need to take steps to avoid the "Hit ENTER to continue prompt if you use this tip.

Here are commands to use to launch any file(s) in hex mode in a separate "hex editor" Vim server. Under Windows, you can easily add these commands to your "Send To" menu if you use the full path for gvim.exe in place of "vim". Remove the "-p" and "--remote-tab-silent" option if you do not want the tabbed interface. The -c "set binary" ensures that any tabwidth, wrap, etc. settings are overwritten after the file finishes loading.

    * Launch in tabs in a new dedicated Vim hex editor: vim -p -b -c "set binary" --servername HEXVIM <files>
    * Launch in tabs in an existing dedicated Vim hex editor: vim -b -c "set binary" --servername HEXVIM --remote-tab-silent <files> 

"
```

### 33.37.4 References

```text
    * :help hex-editing
    * :help :autocmd
    * :help internal-variables
    * :help edit-binary
    * Set_options_or_named_registers_with_let 
```
