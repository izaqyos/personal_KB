---
type: reference
title: "Reading, Handling of command line arguments, getopt: options, arguments, file(s) content iterator"
description: "Legacy Python KB section: Reading, Handling of command line arguments, getopt: options, arguments, file(s) content iterator (argparse)"
tags: [shell, python, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "python/KB_python#14"
---

# Reading, Handling of command line arguments, getopt: options, arguments, file(s) content iterator

[↑ KB_python](/python/kb-python/README.md)

## 14.1 Example from http://aspn.activestate.com/ASPN/Cookbook/Python/Recipe/302262

```text
# -*- coding: iso-8859-1 -*-
"""
Handling of arguments: options, arguments, file(s) content iterator

For small scripts that:
- read some command line options
- read some command line positional arguments
- iterate over all lines of some files given on the command line, or stdin if none given
- give usage message if positional arguments are missing
- give usage message if input files are missing and stdin is not redirected
"""

__author__ = 'Peter Kleiweg'
__version__ = '0.2'
__date__ = '2004/08/28'

import os, sys, getopt

class Args:
    """
    Perform common tasks on command line arguments
    
    Instance data:
    progname (string) -- name of program
    opt (dictionary) -- options with values
    infile (string) -- name of current file being processed
    lineno (int) -- line number of last line read in current file
    linesum (int) -- total of lines read
    """

    def __init__(self, usage='Usage: %(progname)s [opt...] [file...]'):
        "init, usage string: embed program name as %(progname)s"
        self.progname = os.path.basename(sys.argv[0])
        self.opt = {}
        self.infile = None
        self.lineno = 0
        self.linesum = 0
        self._argv = sys.argv[1:]
        self._usage = usage

    def __iter__(self):
        "iterator: set-up"
        if self._argv:
            self.infile = self._argv.pop(0)
            self._in = open(self.infile, 'r')
            self._stdin = False
        else:
            if sys.stdin.isatty():
                self.usage()  # Doesn't return
            self.infile = '<stdin>'
            self._in = sys.stdin
            self._stdin = True
        return self

    def next(self):
        "iterator: get next line, possibly from next file"
        while True:
            line = self._in.readline()
            if line:
                self.lineno += 1
                self.linesum += 1
                return line

            if self._stdin:
                break

            self._in.close()
            try:
                self.infile = self._argv.pop(0)
            except IndexError:
                break
            self.lineno = 0
            self._in = open(self.infile, 'r')

        self.lineno = -1
        self.infile = None
        raise StopIteration

    def getopt(self, shortopts, longopts=[]):
        "get options and merge into dict 'opt'"
        try:
            options, self._argv = getopt.getopt(self._argv, shortopts, longopts)
        except getopt.GetoptError:
            self.usage()
        self.opt.update(dict(options))

    def shift(self):
        "pop first of remaining arguments (shift)"
        try:
            return self._argv.pop(0)
        except IndexError:
            self.usage()

    def pop(self):
        "pop last of remaining arguments"
        try:
            return self._argv.pop()
        except IndexError:
            self.usage()

    def warning(self, text):
        "print warning message to stderr, possibly with filename and lineno"
        if self.lineno > 0:
            print >> sys.stderr, '%s:%i: warning: %s' % (self.infile, self.lineno, text)
        else:
            print >> sys.stderr, '\nWarning %s: %s\n' % (self.progname, text)

    def error(self, text):
        "print error message to stderr, possibly with filename and lineno, and exit"
        if self.lineno > 0:
            print >> sys.stderr, '%s:%i: %s' % (self.infile, self.lineno, text)
        else:
            print >> sys.stderr, '\nError %s: %s\n' % (self.progname, text)
        sys.exit(1)

    def usage(self):
        "print usage message, and exit"
        print >> sys.stderr
        print >> sys.stderr, self._usage % {'progname': self.progname}
        print >> sys.stderr        
        sys.exit(1)


if __name__ == '__main__':

    a = Args('Usage: %(progname)s [-a value] [-b value] [-c] word [file...]')

    a.opt['-a'] = 'option a'    # set some default option values
    a.opt['-b'] = 'option b'    #
    a.getopt('a:b:c')           # get user supplied option values

    word = a.shift()            # get the first of the remaining arguments
                                # use a.pop() to get the last instead

    for line in a:              # iterate over the contents of all remaining arguments (file names)
        if a.lineno == 1:
            print 'starting new file:', a.infile
        a.warning(line.rstrip())

    print 'Options:', a.opt
    print 'Word:', word
    print 'Total number of lines:', a.linesum

    print 'Command line:', sys.argv     # unchanged

    a.warning('warn 1')         # print a warning
    a.error('error')            # print an error message and exit
    a.warning('warn 2')         # this won't show
```

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
