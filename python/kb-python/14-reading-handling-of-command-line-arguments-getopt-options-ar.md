---
type: reference
title: "Reading, Handling of command line arguments, getopt: options, arguments, file(s) content iterator"
description: "Legacy Python KB section: Reading, Handling of command line arguments, getopt: options, arguments, file(s) content iterator (argparse)"
tags: [shell, python, legacy]
generated: { by: "human:izaqyos", at: "2026-10-14T00:00:00Z" }
stale_after: "2028-10-14T00:00:00Z"
sources:
  - { id: py3-whatsnew-30, resource: "https://docs.python.org/3/whatsnew/3.0.html", title: "What's New In Python 3.0" }
  - { id: py-fileinput, resource: "https://docs.python.org/3/library/fileinput.html", title: "fileinput - Iterate over lines from multiple input streams" }
  - { id: py-optparse, resource: "https://docs.python.org/3/library/optparse.html", title: "optparse - Parser for command line options (choosing an argument parsing library)" }
status: stable
capture_type: source
legacy_source: "python/KB_python#14"
---

# Reading, Handling of command line arguments, getopt: options, arguments, file(s) content iterator

[↑ KB_python](/python/kb-python/README.md)

## 14.1 Example from http://aspn.activestate.com/ASPN/Cookbook/Python/Recipe/302262

> Updated 2026-10 to current practice.[^py3-whatsnew-30]

The original 2004 recipe (Peter Kleiweg, `getopt` plus a hand-written line iterator) was Python 2 only: `print >> sys.stderr, ...` statements, an iterator `next()` method instead of `__next__()`, and `getopt`. In Python 3 `print` is a function (`print(..., file=sys.stderr)`).[^py3-whatsnew-30] The Python docs recommend `argparse` for new command-line tools (`getopt` and `optparse` are kept mainly for compatibility),[^py-optparse] and the standard `fileinput` module already does the "iterate over all lines of the files given on the command line, or stdin if none" part, including per-file line numbers.[^py-fileinput]

Same behaviour in Python 3 (options `-a`/`-b` with defaults, flag `-c`, a required positional `word`, then files or stdin; usage error if no files and stdin is a terminal):

```python
#!/usr/bin/env python3
"""Options, positional arguments, and a line iterator over files (or stdin)."""
import argparse
import fileinput
import sys


def main() -> int:
    parser = argparse.ArgumentParser(description="Process lines from files or stdin.")
    parser.add_argument("-a", default="option a", help="value for a (default: %(default)s)")
    parser.add_argument("-b", default="option b", help="value for b (default: %(default)s)")
    parser.add_argument("-c", action="store_true", help="a boolean flag")
    parser.add_argument("word", help="first positional argument")
    parser.add_argument("files", nargs="*", help="input files ('-' or none = stdin)")
    args = parser.parse_args()

    if not args.files and sys.stdin.isatty():
        parser.error("no input files given and stdin is not redirected")

    def warning(text: str) -> None:
        print(f"{fileinput.filename()}:{fileinput.filelineno()}: warning: {text}", file=sys.stderr)

    total = 0
    with fileinput.input(files=args.files, encoding="utf-8") as lines:
        for line in lines:
            if fileinput.isfirstline():
                print("starting new file:", fileinput.filename())
            warning(line.rstrip())
            total = fileinput.lineno()

    print("Options:", vars(args))
    print("Word:", args.word)
    print("Total number of lines:", total)
    print("Command line:", sys.argv)
    return 0


if __name__ == "__main__":
    sys.exit(main())
```

```bash
python3 args.py -a A -c hello f1 f2   # read f1 then f2
printf 'q\n' | python3 args.py hello # read stdin
```

`fileinput.lineno()` is the cumulative line count, `filelineno()` the line within the current file, and `'-'` in the file list means stdin. The `encoding=` argument needs Python 3.10+.[^py-fileinput]

## 14.2 Example from http://docs.python.org/lib/module-optparse.html

```text
    optparse is a more convenient, flexible, and powerful library for parsing command-line options than getopt. optparse uses a more declarative style of command-line parsing: you create an instance of OptionParser, populate it with options, and parse the command line. optparse allows users to specify options in the conventional GNU/POSIX syntax, and additionally generates usage and help messages for you.

Here's an example of using optparse in a simple script:

from optparse import OptionParser
[...]
parser = OptionParser()
parser.add_option("-f", "--file", dest="filename",
                  help="write report to FILE", metavar="FILE")
parser.add_option("-q", "--quiet",
                  action="store_false", dest="verbose", default=True,
                  help="don't print status messages to stdout")

(options, args) = parser.parse_args()

With these few lines of code, users of your script can now do the ``usual thing'' on the command-line, for example:

<yourscript> --file=outfile -q

As it parses the command line, optparse sets attributes of the options object returned by parse_args() based on user-supplied command-line values. When parse_args() returns from parsing this command line, options.filename will be "outfile" and options.verbose will be False. optparse supports both long and short options, allows short options to be merged together, and allows options to be associated with their arguments in a variety of ways. Thus, the following command lines are all equivalent to the above example:

<yourscript> -f outfile --quiet
<yourscript> --quiet --file outfile
<yourscript> -q -foutfile
<yourscript> -qfoutfile

Additionally, users can run one of

<yourscript> -h
<yourscript> --help

and optparse will print out a brief summary of your script's options:

usage: <yourscript> [options]

options:
  -h, --help            show this help message and exit
  -f FILE, --file=FILE  write report to FILE
  -q, --quiet           don't print status messages to stdout

where the value of yourscript is determined at runtime (normally from sys.argv[0]).
```

## 14.3 Example from http://wiki.python.org/moin/OptParse

```text
	if __name__=="__main__":
    parser = optparse.OptionParser("usage: %prog [options] arg1 arg2")
    parser.add_option("-H", "--host", dest="hostname",
                      default="127.0.0.1", type="string",
                      help="specify hostname to run on")
    parser.add_option("-p", "--port", dest="portnum", default=80,
                      type="int", help="port number to run on")

    (options, args) = parser.parse_args()
    if len(args) != 2:
        parser.error("incorrect number of arguments")
    hostname = options.hostname
    portnum = options.portnum

args contains your fixed arguments, options contains your values.

For example, options.portnum would contain the integer 80, in the example above.
```

## 14.4 argparse

### 14.4.1 https://blog.oyam.dev/python-argparse-cheatsheet/

#### 14.4.1.1 Basic argparse usage

```text
$ cat basic.py 
import argparse

parser = argparse.ArgumentParser(
    description='Performs some useful work.',
)

# Put your add_argument calls here
# parser.add_argument(...)

args = parser.parse_args()
print(args)
#print(args.some_param)
$ py3 basic.py a
usage: basic.py [-h]
basic.py: error: unrecognized arguments: a
$ py3 basic.py 
Namespace()
```

#### 14.4.1.2 cmd arg - a single positional argument

```text
		    14.4.1.3  
		    14.4.1.4  
		    14.4.1.5  
		    14.4.1.6  
		    14.4.1.7  
		    14.4.1.8  
		    14.4.1.9  
		    14.4.1.10 
```

### 14.4.2 https://docs.python.org/3/howto/argparse.html

#### 14.4.2.1 positional arguments

```text
$ cat !!:1
cat singlePosArg.py
import argparse

parser = argparse.ArgumentParser(
    description='Performs some useful work.',
)

parser.add_argument(
    'name',
    type=str,
    default='yosi',
    nargs='?',
    help='name, a positional argument',
    #metavar='ARG',
)
parser.add_argument(
    'age',
    type=int,
    default='35',
    nargs='?',
    help='age, a positional argument',
)

#args = parser.parse_args([])  # Namespace(arg='arg_default')
#print(f"args from default Namespace: {args}")
#args = parser.parse_args(['name'])  # Namespace(arg='value')
#print(f"args from name arg Namespace: {args.name}")
args = parser.parse_args()
print(f"single arg: {args.name}")
print(f"second arg: {args.age}")
$ py3 singlePosArg.py aaa 10
single arg: aaa
second arg: 10
```

#### 14.4.2.2 add optional argument

```text
$ cat optionalPosArg.py | pbcopy 
import argparse

parser = argparse.ArgumentParser(
    description='Performs some useful work.',
)

parser.add_argument(
    '--age',
    type=int,
    default='35',
    nargs='?',
    help='age, an optional positional argument',
)

args = parser.parse_args()
print(f"second arg: {args.age}")

run it:
$ py3 optionalPosArg.py 
second arg: 35
$ py3 optionalPosArg.py -h
usage: optionalPosArg.py [-h] [--age [AGE]]

Performs some useful work.

optional arguments:
  -h, --help   show this help message and exit
  --age [AGE]  age, an optional positional argument
$ py3 optionalPosArg.py 15
usage: optionalPosArg.py [-h] [--age [AGE]]
optionalPosArg.py: error: unrecognized arguments: 15
$ py3 optionalPosArg.py --age 15
second arg: 15

- optional boolean toggle
$ py3 optionalPosArg2.py -t
toggle arg: True
$ py3 optionalPosArg2.py 
toggle arg: False
$ cat !$
cat optionalPosArg2.py
import argparse

parser = argparse.ArgumentParser(
    description='Performs some useful work.',
)

parser.add_argument(
    '--toggle', '-t',
    #type=bool,
    default=False,
    #nargs='?',
    action='store_true', #means that if -t is passed set to True
    help='a boolean toggle',
)

args = parser.parse_args()
print(f"toggle arg: {args.toggle}")
-
```

### 14.4.3 args restrict values

```text
$ py3 restrictArgValues.py -l 2
toggle arg: 2
$ py3 restrictArgValues.py -l 5
usage: restrictArgValues.py [-h] [-l {0,1,2,3}]
restrictArgValues.py: error: argument -l/--levels: invalid choice: 5 (choose from 0, 1, 2, 3)
$ py3 restrictArgValues.py -l 
usage: restrictArgValues.py [-h] [-l {0,1,2,3}]
restrictArgValues.py: error: argument -l/--levels: expected one argument
$ cat countArgRepetition.py 
import argparse

parser = argparse.ArgumentParser(
    description='restict argument values',
)

parser.add_argument(
    "-v", "--verbosity",
    action="count",
    help='increase verbosity',
)

args = parser.parse_args()
print(f"verbosity count: {args.verbosity}")
```

### 14.4.4 count arg repetition

```text
$ py3 countArgRepetition.py 
verbosity count: None
$ py3 countArgRepetition.py -v
verbosity count: 1
$ py3 countArgRepetition.py -vv
verbosity count: 2
$ py3 countArgRepetition.py -vvv
verbosity count: 3
$ cat countArgRepetition.py 
import argparse

parser = argparse.ArgumentParser(
    description='restict argument values',
)

parser.add_argument(
    "-v", "--verbosity",
    action="count",
    help='increase verbosity',
)

args = parser.parse_args()
print(f"verbosity count: {args.verbosity}")
```

### 14.4.5 Python argparse mutual exclusive Groups

```text
https://stackoverflow.com/questions/17909294/python-argparse-mutual-exclusive-group

Q. What I need is:

pro [-a xxx | [-b yyy -c zzz]]

A. 
add_mutually_exclusive_group doesn't make an entire group mutually exclusive. It makes options within the group mutually exclusive.

What you're looking for is subcommands. Instead of prog [ -a xxxx | [-b yyy -c zzz]], you'd have:

prog 
  command 1 
    -a: ...
  command 2
    -b: ...
    -c: ...
To invoke with the first set of arguments:

prog command_1 -a xxxx
To invoke with the second set of arguments:

prog command_2 -b yyyy -c zzzz
You can also set the sub command arguments as positional.

prog command_1 xxxx
Kind of like git or svn:

git commit -am
git merge develop
Working Example
# create the top-level parser
parser = argparse.ArgumentParser(prog='PROG')
parser.add_argument('--foo', action='store_true', help='help for foo arg.')
subparsers = parser.add_subparsers(help='help for subcommand')

# create the parser for the "command_1" command
parser_a = subparsers.add_parser('command_1', help='command_1 help')
parser_a.add_argument('a', type=str, help='help for bar, positional')

# create the parser for the "command_2" command
parser_b = subparsers.add_parser('command_2', help='help for command_2')
parser_b.add_argument('-b', type=str, help='help for b')
parser_b.add_argument('-c', type=str, action='store', default='', help='test')
Test it
>>> parser.print_help()
usage: PROG [-h] [--foo] {command_1,command_2} ...

positional arguments:
  {command_1,command_2}
                        help for subcommand
    command_1           command_1 help
    command_2           help for command_2

optional arguments:
  -h, --help            show this help message and exit
  --foo                 help for foo arg.
>>>

>>> parser.parse_args(['command_1', 'working'])
Namespace(a='working', foo=False)
>>> parser.parse_args(['command_1', 'wellness', '-b x'])
usage: PROG [-h] [--foo] {command_1,command_2} ...
PROG: error: unrecognized arguments: -b x


		14.4.6
	14.5
```

[^py3-whatsnew-30]: What's New In Python 3.0
[^py-fileinput]: fileinput - Iterate over lines from multiple input streams
[^py-optparse]: optparse - Parser for command line options (choosing an argument parsing library)
