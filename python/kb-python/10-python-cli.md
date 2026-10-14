---
type: reference
title: Python CLI
description: "Legacy Python KB section: Python CLI"
tags: [shell, python, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "python/KB_python#10"
---

# Python CLI

[↑ KB_python](/python/kb-python/README.md)

## 10.1 CMD module, http://effbot.org/librarybook/cmd.htm

```text
	Example:
# File: cmd-example-1.py

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

	output:
$ python cmd-example-1.py
> help

Documented commands (type help <topic>):
========================================
hello           quit

Undocumented commands:
======================
help            q

> hello world
hello again world !
> q
```
