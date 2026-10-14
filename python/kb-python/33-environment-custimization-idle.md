---
type: reference
title: "Environment, Custimization, IDLE"
description: "Legacy Python KB section: Environment, Custimization, IDLE (.pythonrc, Example 1)"
tags: [python, legacy, reference]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "python/KB_python#33"
---

# Environment, Custimization, IDLE

[↑ KB_python](/python/kb-python/README.md)

## 33.1 .pythonrc

### 33.1.1 Example 1

```text
Every Python developer knows that the Python shell can speed up the work, but not anybody know how fast it can be.
In Bash you can browse the history of previously typed commands and have autocompletion with the tab key. Why not having the same features in the Python shell too?
History

On UNIX-like systems, Python is shipped with a really useful module in the standard library: readline that, among other things, can be used to enable the history. Its usage is very simple: it just needs a file to read and write the history, just like Bash. Here’s how it should be used:

>>> import os
>>> import readline
>>> history_file = os.path.expanduser('~/.python_history')
>>> readline.read_history_file(history_file)

Note that the history file is not written automatically at exit: you ought to call write_history_file() when you finish to use the interpreter or, better, register a function with atexit:

>>> import atexit
>>> atexit.register(readline.write_history_file, history_file)

Autocompletion

The readline module can be used for autocompletion too, but needs some help from a second module. In fact readline just binds the tab key, but the word completer itself is in rlcompleter.

>>> import rlcompleter
>>> readline.parse_and_bind('tab: complete')

RC file

We have understood how to enable both history and autocompletion, but does this mean that we should type the above commands every time? No, of course. When used in interactive mode, Python always looks into the PYTHONSTARTUP environment variable and executes the specified script, if any. So, you can put the code to enable history and autocompletion in a file (for example: ~/.pythonrc) and specify it in your PYTHONSTARTUP.

Using the RC file you also have the advantage that you can import the modules that you use frequently, so that you won’t have to import the manually in the interpreter. For example, here’s my own Python RC file:

import atexit
import os
import re
import readline
import rlcompleter
import socket
import _socket
import sys
import time
import timeit

history = os.path.expanduser('~/.python_history')
readline.read_history_file(history)
readline.parse_and_bind('tab: complete')
atexit.register(readline.write_history_file, history)

def t(*args):
    return timeit.Timer(*args).timeit()

-> Here's my .pythonrc as of Wed Mar  2 18:40:32 JST 2011

import atexit
import os
import re
import readline
import rlcompleter
import socket
import _socket
import sys
import time
import timeit

history = os.path.expanduser('~/.python_history')
readline.read_history_file(history)
readline.parse_and_bind('tab: complete')
atexit.register(readline.write_history_file, history)

def t(*args):
    return timeit.Timer(*args).timeit()

print "Welcome %s, time is %s. Have a good session :-) "%(os.environ['USER'], time.strftime('%X %x %Z') )

-> Here's my .pythonrc as of Thu Mar  3 11:35:56 JST 2011
import atexit
import os
import re
import readline
import rlcompleter
import socket
import _socket
import sys
import time
import timeit

history = os.path.expanduser('~/.python_history')
readline.read_history_file(history)
readline.parse_and_bind('tab: complete')
atexit.register(readline.write_history_file, history)

def t(*args):
    return timeit.Timer(*args).timeit()

# Color Support
class TermColors(dict):
    """Gives easy access to ANSI color codes. Attempts to fall back to no color
for certain TERM values. (Mostly stolen from IPython.)"""

    COLOR_TEMPLATES = (
        ("Black" , "0;30"),
        ("Red" , "0;31"),
        ("Green" , "0;32"),
        ("Brown" , "0;33"),
        ("Blue" , "0;34"),
        ("Purple" , "0;35"),
        ("Cyan" , "0;36"),
        ("LightGray" , "0;37"),
        ("DarkGray" , "1;30"), ("LightRed" , "1;31"),
        ("LightGreen" , "1;32"),
        ("Yellow" , "1;33"),
        ("LightBlue" , "1;34"),
        ("LightPurple" , "1;35"),
        ("LightCyan" , "1;36"),
        ("White" , "1;37"),
        ("Normal" , "0"),
    )

    NoColor = ''
    _base = '\001\033[%sm\002'

    def __init__(self):
        if os.environ.get('TERM') in ('xterm', 'xterm-color', 'xterm-256color', 'linux',
                                    'screen', 'screen-256color', 'screen-bce'):
            self.update(dict([(k, self._base % v) for k,v in self.COLOR_TEMPLATES]))
        else:
            self.update(dict([(k, self.NoColor) for k,v in self.COLOR_TEMPLATES]))
_c = TermColors()

# Enable Color Prompts
sys.ps1 = '%s>>> %s' % (_c['Green'], _c['Normal'])
sys.ps2 = '%s... %s' % (_c['Cyan'], _c['Normal'])

# Enable Pretty Printing for stdout
import pprint
def my_displayhook(value):
    if value is not None:
        try:
            import __builtin__
            __builtin__._ = value
        except ImportError:
            __builtins__._ = value

        pprint.pprint(value)

sys.displayhook = my_displayhook

##Set VI Editor for interactive console 
#from code import InteractiveConsole
#from tempfile import mkstemp
#
#EDITOR = os.environ.get('EDITOR', 'vim')
#EDIT_CMD = '\e'
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

print "Welcome %s, time is %s. Have a good session :-) "%(os.environ['USER'], time.strftime('%X %x %Z') )
		33.1.2
	33.2
```
