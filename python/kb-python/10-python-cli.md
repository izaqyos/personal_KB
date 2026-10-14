---
type: reference
title: Python CLI
description: "Legacy Python KB section: Python CLI"
tags: [shell, python, legacy]
generated: { by: "human:izaqyos", at: "2026-10-14T00:00:00Z" }
stale_after: "2028-10-14T00:00:00Z"
sources:
  - { id: py-cmd, resource: "https://docs.python.org/3/library/cmd.html", title: "cmd — Support for line-oriented command interpreters (Python 3 documentation)" }
status: stable
capture_type: source
legacy_source: "python/KB_python#10"
---

# Python CLI

[↑ KB_python](/python/kb-python/README.md)

## 10.1 CMD module, http://effbot.org/librarybook/cmd.htm

> Updated 2026-10 to current practice.[^py-cmd]

The original example (from effbot.org's *Python Standard Library* book, which is no longer online) was Python 2. Here it is in Python 3. The standard reference is the [`cmd` module docs](https://docs.python.org/3/library/cmd.html). A trailing-comma `print "...",` becomes `print(..., end=" ")`.

```python
# File: cmd-example-1.py
import cmd
import sys


class CLI(cmd.Cmd):
    prompt = "> "

    def do_hello(self, arg):
        print("hello again", arg, "!")

    def help_hello(self):
        print("syntax: hello [message]", end=" ")
        print("-- prints a hello message")

    def do_quit(self, arg):
        sys.exit(1)

    def help_quit(self):
        print("syntax: quit", end=" ")
        print("-- terminates the application")

    # shortcuts
    do_q = do_quit


if __name__ == "__main__":
    CLI().cmdloop()
```

Output on Python 3.14. Python 3 lists `help` as a documented command:

```text
$ python3 cmd-example-1.py
> help

Documented commands (type help <topic>):
========================================
hello  help  quit

Undocumented commands:
======================
q

> hello world
hello again world !
> q
```

[^py-cmd]: cmd — Support for line-oriented command interpreters (Python 3 documentation)
