---
type: reference
title: CLI
description: Mac CLI clipboard access with pbcopy and pbpaste.
tags: [macos, shell, one-liners, tips, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-mac#8"
---

# CLI

[↑ kb-mac](/kb-mac/README.md)

## 8.1 pbpaste pbcopy

### 8.1.1 Accessing the OS X Clipboard from the Command Line

```text
terminal-icon-512x5122 With the pbcopy and pbpaste commands, you can use the command line to manipulate clipboard contents but also access your Mac OS X clipboard directly through the Terminal. Yes, that means you can access what you copied in a GUI app and use it in the command line seamlessly, and vice versa. We’ve shown a brief introduction on how to use both pbcopy and pbpaste from the command line before, but we wanted to demonstrate a few additional methods to use these incredibly useful tools on the Mac, like how to directly access whatever is currently stored in the Macs clipboard from the terminal prompt.



 
Accessing the OS X Clipboard Contents with pbpaste
pbpaste – pbpaste is how you dump the currently active contents of the clipboard. If you just want to see what’s in the clipboard, simply type this:

pbpaste

You’ll see whatever is stored in the clipboard right now, as if you hit Command+V in OS X.

You can also easily store the contents of the clipboard into a file by using pbpaste, as follows:

pbpaste > clipboard.txt

Now you’ll have the document clipboard.txt with the contents of your clipboard. You can double-check this by opening it in any text editor, or by typing
cat clipboard.txt
to see the contents.

Adding Contents to the Clipboard with pbcopy
pbcopy – as you might imagine, pbcopy is how you can copy things from the command line. This is basically like using Comamnd+C in the Finder or GUI of OS X. The best way to use it is by piping something into pbcopy, for example:

ls -lha |pbcopy

This will pipe the results of ls -lha into your clipboard, which you can now access using the pbpaste command.

Now that you’ve copied something to the clipboard of OS X with pbcopy you can dump the output back into the Terminal by using pbpaste, if you had just run the ls -lha|pbcopy command, the output will be that.

You can learn more about modifying the clipboard from the terminal by redirecting command output here with pipes and redirects to the pbcopy command.

pbcopy and pbpaste can even work across networks by using ssh or other protocols, check this out:

Pasting Clipboard Contents Across Networks with SSH & pbpaste
pbcopy and pbpaste are a lot more powerful than the above examples though. Here’s how to use pbpaste to send the contents of your clipboard to another machine, by piping the output through an ssh connection into a file named myclipboard.txt on the remote machine:

pbpaste | ssh username@host 'cat > ~/myclipboard.txt'

Nice huh?


		8.1.2
	8.2
```
