---
type: reference
title: "Environment, Custimization, IDLE"
description: "Legacy Python KB section: Environment, Custimization, IDLE (.pythonrc, Example 1)"
tags: [python, legacy, reference]
generated: { by: "human:izaqyos", at: "2026-10-14T00:00:00Z" }
stale_after: "2028-10-14T00:00:00Z"
status: stable
capture_type: source
legacy_source: "python/KB_python#33"
sources:
  - { id: py-site, resource: "https://docs.python.org/3/library/site.html#rlcompleter-config", title: "Python docs: site module, Readline configuration" }
  - { id: py313-whatsnew, resource: "https://docs.python.org/3/whatsnew/3.13.html", title: "What's New In Python 3.13" }
  - { id: py-startup, resource: "https://docs.python.org/3/using/cmdline.html#envvar-PYTHONSTARTUP", title: "Python docs: PYTHONSTARTUP environment variable" }
  - { id: py3-whatsnew, resource: "https://docs.python.org/3/whatsnew/3.0.html", title: "What's New In Python 3.0" }
---

# Environment, Custimization, IDLE

[↑ KB_python](/python/kb-python/README.md)

## 33.1 .pythonrc

### 33.1.1 Example 1

> Updated 2026-10 to current practice.[^py-site]

Every Python developer knows that the Python shell can speed up the work. In Bash you can browse the history of previously typed commands and have autocompletion with the tab key, and the Python shell has the same features.

**History and autocompletion are built in.** Since Python 3.4 the `site` module enables tab completion (`rlcompleter`) and a persistent history file, `~/.python_history`, automatically whenever the interpreter starts in interactive mode, on platforms with `readline`.[^py-site] The old recipe of importing `readline`/`rlcompleter`, calling `readline.read_history_file()` and registering `readline.write_history_file` with `atexit` is no longer needed. (If you still use it, note that `read_history_file()` raises `FileNotFoundError` when the file doesn't exist yet.) To turn the default behaviour off, delete or override `sys.__interactivehook__` in `sitecustomize`/`usercustomize` or your `PYTHONSTARTUP` file.

**Python 3.13+ REPL.** Python 3.13 ships a new interactive interpreter with multiline editing, colour prompts and tracebacks, F2 history browsing and F3 paste mode. Set `PYTHON_HISTORY` to change where the history file lives, and `PYTHON_BASIC_REPL=1` to fall back to the old REPL.[^py313-whatsnew]

**RC file.** When used in interactive mode, Python runs the script named by the `PYTHONSTARTUP` environment variable, if any.[^py-startup] That is still the place for modules you import all the time and small helpers, e.g. in `~/.zshrc` / `~/.bashrc`:

```bash
export PYTHONSTARTUP="$HOME/.pythonrc"
```

My `.pythonrc` grew over time (Mar 2011: history, common imports, a `t()` timing helper, then a welcome banner, colour prompts and a pretty-printing display hook). Here it is in current Python 3 form (`print()` function, `builtins` instead of `__builtin__`[^py3-whatsnew], no readline boilerplate):

```python
# ~/.pythonrc  -- point PYTHONSTARTUP at this file
import builtins
import os
import pprint
import re
import socket
import sys
import time
import timeit

# No readline/rlcompleter/atexit boilerplate needed: history (~/.python_history)
# and tab completion are enabled by default since Python 3.4. On 3.13+ set
# PYTHON_HISTORY to move the history file.


def t(*args, **kwargs):
    """Quick timing helper: t('sum(range(100))', number=10_000)."""
    return timeit.Timer(*args).timeit(**kwargs)


# Colour prompts (3.13+ already colours the prompt; this is for older REPLs).
# \001 / \002 tell readline the escape codes take no screen width.
if sys.version_info < (3, 13) and os.environ.get("TERM", "").startswith(("xterm", "screen", "tmux", "linux")):
    sys.ps1 = "\001\033[0;32m\002>>> \001\033[0m\002"
    sys.ps2 = "\001\033[0;36m\002... \001\033[0m\002"


# Pretty-print results in the REPL
def my_displayhook(value):
    if value is not None:
        builtins._ = value
        pprint.pprint(value)


sys.displayhook = my_displayhook

print(f"Welcome {os.environ.get('USER', 'user')}, time is {time.strftime('%X %x %Z')}. Have a good session :-)")
```

An experiment I kept commented out: an `InteractiveConsole` subclass that opens the last statement in `$EDITOR` when you type `\e`. (`code.InteractiveConsole.raw_input()` is still the method name in Python 3, so this works once uncommented, provided you also define the `WELCOME` banner string it passes to `interact()`; the escape is written as a raw string to avoid the invalid-escape warning in 3.12+.)

```python
##Set VI Editor for interactive console 
#from code import InteractiveConsole
#from tempfile import mkstemp
#
#EDITOR = os.environ.get('EDITOR', 'vim')
#EDIT_CMD = r'\e'
#
#class EditableBufferInteractiveConsole(InteractiveConsole):
#    def __init__(self, *args, **kwargs):
#        self.last_buffer = [] # This holds the last executed statement
#        InteractiveConsole.__init__(self, *args, **kwargs)
#
#    def runsource(self, source, *args):
#        self.last_buffer = [ source.encode('latin-1') ]
#        return InteractiveConsole.runsource(self, source, *args)
#
#    def raw_input(self, *args):
#        line = InteractiveConsole.raw_input(self, *args)
#        if line == EDIT_CMD:
#            fd, tmpfl = mkstemp('.py')
#            os.write(fd, b'\n'.join(self.last_buffer))
#            os.close(fd)
#            os.system('%s %s' % (EDITOR, tmpfl))
#            line = open(tmpfl).read()
#            os.unlink(tmpfl)
#            tmpfl = ''
#            lines = line.split( '\n' )
#            for i in range(len(lines) - 1): self.push( lines[i] )
#            line = lines[-1]
#        return line
#
#c = EditableBufferInteractiveConsole(locals=locals())
#c.interact(banner=WELCOME)
#
## Exit the Python shell on exiting the InteractiveConsole
#sys.exit()
```

[^py-site]: Python docs: site module, Readline configuration
[^py313-whatsnew]: What's New In Python 3.13
[^py-startup]: Python docs: PYTHONSTARTUP environment variable
[^py3-whatsnew]: What's New In Python 3.0
