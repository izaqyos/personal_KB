---
type: reference
title: Validate input
description: Section 16 of the legacy KB_python notes.
tags: [kb-python]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "python/KB_python#16"
---

# Validate input

[↑ KB_python](/python/kb-python/README.md)

```text
You probably won't be using Python long before writing a program which needs user input. As a wide-eyed, innocent new Python programmer, you may naively expect that you can simply ask users for input and they will just give it to you....

    WARNING: Showing the preceding sentence to veteran programmers may cause them to collapse on the floor giggling helplessly. 

Users don't work that way.

For example, if you ask for a simple 'y or n' response, your user may cheerfully type in their name - or their lunch order, or nothing at all - and your program will break. They don't do this on purpose (well, mostly). It's just that the poor dears are easily distracted, totally ignore your carefully worded input prompts and often type complete gibberish as far as your program is concerned. Next, oddly enough, they will blame you, the programmer. Then you will look foolish and feel Unhappy.

To avoid this misery, the very first thing you need to do is make sure that whatever comes back from the user is checked to see if it's even vaguely close to what you expected. Python has heaps of functions to help you with this and we'll begin by going through some of them together below.

Another thing you can do is use validators on your input widgets. The way these work is they simply throw away any keystrokes that are not what you are after. As an example, if you set a numeric validator on a string widget, users can press 'ABC' etc. as much as they like and nothing will even show up in the widget. The only keys they can press that will have any effect are 0-9 and, perhaps, a decimal or dollar symbol. We'll play with these too later on.

Finally, even if you are lucky enough to find yourself in possession of a particularly well-trained and obedient user who always types what you ask, the input is unlikely to be formatted exactly the way you want it. Careless typing often produces strings like 'jOHN sMith' (caps lock) or phone numbers resembling '604555-1212'.

All kidding aside, it's actually your job as a programmer to make it as easy and fast as possible for the user to input data and that it be presented and stored in a consistent format. Plus, you can get a great deal of personal satisfaction and even, dare I say it? gratitude from users if you can save them from the hell of properly typing something like a Canadian postal code.
Acquiring Input

First your program will need to acquire some user input. From the console Python offers two methods for this 'raw_input("Prompt")' and 'input("Prompt")'. (Don't use 'input', see below.) You can also get input from good ol' command line arguments or environment variables.

Other, more graphical methods are available, without getting too carried away, such as Xdialog, Gdialog (part of gnome-utils) or Kaptain.

Access to full-blown GUI toolkits is available from Python using PyQT , TKinter, WxPython and PyGTK among others.

This is probably a good time to provide a few words of caution. Most users are contented, docile creatures who like to have their belly rubbed, but you will encounter rogue types bent on destruction.

For this reason you must never allow user input to leak into your command space:

    * Use 'raw_input()' instead of 'input()'. 'input()' is fed to 'eval()' before your program gets it. This automatically converts types, which is convenient if you want an integer and the user accidentally gives you one. But the user would have to quote strings. Worse, a rogue user might type 'os.system("rm -r *")', which would give you a bad day. 'raw_input()' returns whatever the user entered as a string. This makes validation easier, because you know what type it will be and thus which operations you can apply to it.

    * Always check input to os.system(), os.popen() or os.exec*() calls.

    * Always escape user input before printing it to a web page or using it in a SQL query. This is in addition to input checking. Unescaped special characters can cause invalid HTML, screw up your page formatting, and allow the user to exploit Javascript "features" against another user. Unescaped special characters in a SQL query may cause a SQL syntax error or cause the query to do more than intended. Use 'cgi.escape()' to escape HTML. See your database documentation to escape SQL queries.

O.K. Relax. The spooky part is over.

Open an xterm and type 'python' to enter the interpreter. Note: Many of these examples require that you be using a version of Python greater than or equal to version '2'. Redhat still ships with version 1.5x as default, so if you are a Redhat user you will need to type 'python2' instead (and possibly install the rpm first from 'add-ons'). For the record, version '1.5' was released in a year which began with the digits '1' and '9'.
Checking the Content of String Objects

Programming languages usually include methods for checking of this kind and Python is no exception. Consider one of our first challenges as stated above: making sure the user gives us a valid number when we ask for one.

It happens that all string objects in Python have built-in methods which make this quite painless. Type these lines in at the '>>>' prompt:

>>>input = '9'
>>>input.isdigit()
1

This will return a '1' (true), so you can easily use it in an 'if' statement as a condition. Some other handy attributes of this kind are:

s.isalnum() returns true if all characters in s are alphanumeric, false otherwise.
s.isalpha() returns true if all characters in s are alphabetic, false otherwise.

For a complete list of these and much more, I highly recommend the Python 2.1 Quick Reference. I use this all the time and even have an older text version stuffed into HNB for speed.

This will get us through simple cases like menu choices, but what if we wanted a float or a real number?

Consider:

input = '9.9' or
input = '-9'

Both of these are valid numbers, but input.isdigit() will return '0' (false), because the negative sign and the decimal point are not 'digits'. Our poor user will be very confused when we spit back an error message if these entries are valid.

So, let's assume that they are what we want and try to convert them explicitly. For this we'll use the Python try/except construction. Python raises exceptions of different kinds on errors and we can trap these errors individually by name.

Say we wanted an integer like '-9', we can use the numeric operator 'int()' to explicitly attempt the conversion for us.

try:
    someVar = int(input)
    print 'Is an integer'
except (TypeError, ValueError):
    print 'Not an integer'

Two things to notice here. The first is that we are checking for two different exceptions, Type and Value. This way we not only handle the user entering a float (like '9.9'), but we also allow for the possibility that they didn't even enter a number of any kind - perhaps they entered 'Ham on rye'. The second thing to notice is that we actually entered the kinds of exceptions we were interested in trapping. It's very easy to just type in open ended exceptions without bothering to look up which errors you are trapping like this:

try:
    someVar = int(input)
    print 'Is an integer'
except:
    print 'Not an integer'

DO NOT DO THIS. Python will let you, but since you are now trapping all exceptions debugging will be a nightmare for you if anything breaks. Just trust me on this one; look up the errors you mean to trap and you'll save time in the long run.

Other operators you'll find useful are long() and float(). On the flip side, str() can convert anything to a string.

Don't forget to range check - it's no good congratulating yourself on ensuring your program always gets an integer from a user if it blithely accepts the integer '42' as a valid month day... Make sure the number falls into the expected range using the comparison operators '>, <, >=' etc.
Validating Input

As we've seen, we can validate input after we get it, but wouldn't it be nice if we could prevent the user from entering mistakes in the first place?

Enter widget validators.

These are things built into graphical user interface toolkits that prevent unwanted keystrokes from even appearing in the string widget. Toolkits usually come with some built-in validators for numeric, alpha, and alphanumeric etc. and are quite easy to use. I'm currently using mostly PyQT for gui's, but TKinter, WxPython and even Kaptain all have validators. I could be wrong, but PyGTK seems not to have them - yet. Perhaps you could hook up a signal and roll your own if you happen to use a toolkit that doesn't have them.

If the built-in validators don't suit you then PyQt, for example, allows you to specify your own, custom validators.

Clearly, I can't go into detail for every toolkit out there, but here's an example of how to attach a numeric validator to a widget in PyQT. The widget's name is 'self.rate', we're attaching the 'QDoubleValidator' and telling it to accept numbers between 0.0 and 999.0 up to 2 decimal places:

self.rate.setValidator(QDoubleValidator(0.0, 999.0, 2, self.rate) )

Nice eh? Notice it took care of range checking for us too!

Other ways to help users enter information include spinners, pick-lists and combo-boxes, but you already knew that.
Formatting Input

Remember the 'jOHN sMith' example from the introduction? Here's the fix:

>>>'jOHN sMith'.title()
'John Smith'

Yes, yet another attribute of all string objects in Python is the 'title()' attribute which will helpfully capitalize each word for you. 'capitalize()' is similar, but only does the first character:

>>> 'jOHN sMith'.capitalize()
'John smith'

Go ahead and try 'upper()', 'lower()' and 'swapcase()' on your own if you like. I think you can guess their behaviour.

But how about 'rjust(n)'? This is only one of some really handy attributes you can use to layout reports. Watch:

>>> 'John Smith'.rjust(15)
'     John Smith'

Our string has been right justified for us in a string 15 characters long. Sweet. As you've probably guessed, there are also 'center(n)' and 'ljust(n)'. Again, have a look at the Python 2.1 Quick Reference to see them all.

Another, very important operator in Python is the '%' (per cent) operator. The description of this in combination with list objects and printf-style formatting codes could easily consume several pages, so I'm just going to gloss over it with a few examples to pique your interest today.

In it's simplest form, the '%' operator lets you write, say, a proper sentence that includes variables which can change at runtime:

>>> 'This is a %s example of its %s.' % ('good', 'use')
'This is a good example of its use.'

At least, I hope it is. This is only the beginning of its power. In addition to just string object substitution with '%s' there is also '%r' and the printf friends from the 'C' language: c, d, i, u, o, x, X, e, E, f, g, G.

Here's an example from Python 2.1 Quick Reference:

>>> '%s has %03d quote types.' % ('Python', 2)
'Python has 002 quote types.'

The right hand side may also be a mapping, which allows you to refer to fields by name.

Let's move on to something a little more challenging, but common enough.
Phone Numbers

Phone numbers are variable in length. Sometimes they are only 2 or 3 digits long if you are behind a corporate PBX system. Other times they might stretch out to 15 digits or more for international calling. They might even contain '#' symbols or asterisks. Maybe even commas. Worse, the user may attempt to impose a format on it as they enter it. Or a partial format. Or not.

Now, it will only frustrate your user if you don't let them at least try to enter it properly, so your validator had better accept all of #, *, 'comma', -, ), ( as well as the digits 0-9. Of course, you could still end up with:

'250-(555)-12-12'

instead of the string:

'(250) 555-1212'

that we actually want (for a North American phone number anyhow). Don't worry, we'll make the solution generic enough to handle just about anything.

My first instinct when I need something like this is to copy someone else's work by mining Google - especially Google Groups. This turns out to be a good instinct for me to have since the code snippet I usually find will be far better than I could do on my own. Unfortunately, this time I turned up an email from Guido van Rossum (the inventor of Python) explaining to someone that Python did not have such a thing and perhaps they could use something like:

import string
def fmtstr(fmt, str):
    res = [] i = 0
    for c in fmt:
        if c == '#':
            res.append(str[i:i+1]) i = i+1
        else:
            res.append(c)
    res.append(str[i:])
    return string.join(res)

This is a darn good start of course and you can't argue with the credentials of its author, but it doesn't handle all the cases without a lot of 'if/then' constructs to count how many digits you were given in order to choose a format string of the correct length. Go ahead and paste it into your xterm and then call it like this:

>>> fmtstr('###-####', '5551212')
'5 5 5 - 1 2 1 2 '

In fact, I did copy and paste it into my editor and then constructed a long sequence of 'if/thens' for phone numbers, dates and other types of entries, but I still wasn't handling everything. Plus, I had dozens and dozens of lines doing self-similar things. They have since passed on to their reward.

O.K., here we go... First, let's filter any "extra" formatting characters we let the user type in:

def filter(inStr, allowed):
    outStr = ''
    for c in inStr:
        if c in allowed:
            outStr += c
    return outStr

We could call it like this:

>>>filter('250-(555)-12-12', string.digits)
'2505551212'

Or we could define the second argument ourselves as '0123456789#*,' to include all the allowable characters possible.

Now we just take Guido's code snippet and (this is the good bit) reverse both the input arguments. This way we can specify just one long format string and it will be matched until we run out of input. Any extra input will just get tacked on, so we will never lose any characters.

# import the regular expression module
import re

def formatStr(inStr, fmtStr, p = '^'):
    inList = [x for x in inStr] #list from strings..
    fmtList = [x for x in fmtStr]
    # the good bit
    inList.reverse(); fmtList.reverse()
    outList = []
    i = 0
    for c in fmtList:
        if c == p:
            try:
                outList.append(inList[i])
                i += 1
            # break if fmtStr longer than inStr
            except IndexError:
                break
        else:
            outList.append(c)
    # handle inStr longer than fmtStr
    while i < len(inList):
        outList.append(inList[i])
        i += 1
    # put it back the way we found it
    outList.reverse()
    outStr = ''.join(outList)
    # remove stray parens/- etc
    while re.match('[)|-| ]', outStr[0]):
        outStr = outStr[1:]
    # close any legit parens
    while outStr.count(')') > outStr.count('('):
        outStr = '(' + outStr
    return outStr

[Text version of this listing.]

It's basically the same as Guido's except the default placeholder character is now a '^' (caret), because we may need to use the '#'. Alternatively, this may be specified as an, optional, third argument if we ever need real carets in the output.

Here's some sample output:

>>> formatStr('51212', ' ^^^ ^^ (^^^) ^^^-^^^^')
'5-1212'
>>> formatStr('045551212', ' ^^^ ^^ (^^^) ^^^-^^^^')
'(04) 555-1212'
>>> formatStr('16045551212', ' ^^^ ^^ (^^^) ^^^-^^^^')
'1 (604) 555-1212'
>>> formatStr('1011446045551212', ' ^^^ ^^ (^^^) ^^^-^^^^')
'1 011 44 (604) 555-1212'

In practice, you'll probably want to simply define your phone formatting string early on e.g.:

phone_format_str = ' ^^^ ^^ (^^^) ^^^-^^^^'

There's a space at the beginning of the string so that any additional characters won't get smooshed onto it. You'd likely call it thus:

formatStr(input, phone_format_str)

... after you clean up your 'input' with something like the 'filter()' function.
Postal Codes

In case you are (blessedly) unfamiliar with Canadian postal codes, they look like this:

'V8G 4L2'

Which appears innocuous enough until you attempt to type it. Especially for non-typists (like me). You can turn on the caps lock - and then forget to turn it off - or you have to type [shift]+alpha, number, [shift]+alpha etc. and quite often end up with: 'v*g $l@' when you get out of sequence. Needless to say, users hate typing them in and they hardly ever look right. Mostly your application won't even capture postal codes, because users simply won't bother. Some other countries have similar post codes. Shame.

Now, with our new formatting function, they're a piece of cake. First, we either validate or filter whatever they give us, then we simply use Python's built-in string attribute 'upper()' to set the case of the alpha characters properly, finally:

>>>formatStr('V8G4L2', ' ^^^ ^^^')
'V8G 4L2'

If accurate postal codes are critical to your application, you will need to do more verification by way of counting the characters and verifying the pattern. For general use though, you need to allow for the postal codes of other countries. I think I normally format only if the number of characters == 6 after clean up.

How about Social Insurance Numbers? Same deal:

>>> formatStr('716555123', '^^^-^^^-^^^')
'716-555-123'

You should run a check digit routine over Social Insurance Numbers first to ensure they are valid. Ditto for credit cards.

I hope these examples will save you some time in coding user interfaces. I'd very much like to hear back with examples or improvements of your own. Particularly ways of dealing with dates1 with users. They're always fun.

By the way, it's very important that you not keep these formatting aids a secret from your users. Put it in the 'help', use 'tooltips' or 'whatis' to let them know the facility is there for them. If they find out after months of typing things the long way, they are liable to pout and you'll end up wasting afternoon coffee scratching them behind the ears (morning coffee is a given).

Have fun with it!
1 That's calendar dates...
```

## 16.1 Tkinter widget validators

```text
A Validating Entry Widget

June 30, 1998 | Fredrik Lundh

This module implements a validating version of the Tkinter Entry widget. It uses the textvariable option to attach a StringVar variable to the widget, and uses the variable trace function to keep track of whatÂ¿s going on. To specify how validation is to be done, override the validate method.

Note that the constructor takes a parent widget, and also allows you to use the value option to specify the initial contents. All other options are passed on to the Entry widget itself.
File: tkValidatingEntry.py

from Tkinter import *

class ValidatingEntry(Entry):
    # base class for validating entry widgets

    def __init__(self, master, value="", **kw):
        apply(Entry.__init__, (self, master), kw)
        self.__value = value
        self.__variable = StringVar()
        self.__variable.set(value)
        self.__variable.trace("w", self.__callback)
        self.config(textvariable=self.__variable)

    def __callback(self, *dummy):
        value = self.__variable.get()
        newvalue = self.validate(value)
        if newvalue is None:
            self.__variable.set(self.__value)
        elif newvalue != value:
            self.__value = newvalue
            self.__variable.set(self.newvalue)
        else:
            self.__value = value

    def validate(self, value):
        # override: return value, new value, or None if invalid
        return value

Note: Newer versions of Tkinter support validate and validatecommand options that can be used instead of the extra variable. The above code still works, though.
Examples #

The first two examples are subclasses that check that the input is a valid Python integer or float, respectively. The validate method simply tries to convert the value to an object of the right kind, and returns None (reject) if that fails.

class IntegerEntry(ValidatingEntry):

    def validate(self, value):
        try:
            if value:
                v = int(value)
            return value
        except ValueError:
            return None

class FloatEntry(ValidatingEntry):

    def validate(self, value):
        try:
            if value:
                v = float(value)
            return value
        except ValueError:
            return None

The third example is a subclass that restricts the length of the input to a given max length.
 

class MaxLengthEntry(ValidatingEntry):

    def __init__(self, master, value="", maxlength=None, **kw):
        self.maxlength = maxlength
        apply(ValidatingEntry.__init__, (self, master), kw)

    def validate(self, value):
        if self.maxlength is None or len(value) <= self.maxlength:
            return value
        return None # new value too long

HereÂ¿s how to use this class:

root = Tk()

entry = MaxLengthEntry(root, maxlength=20)
entry.pack()

mainloop()

Note that if the user pastes a long string into the entry box, it will be rejected by this implementation. A better solution might be to change the validate method to:

    def validate(self, value):
        if self.maxlength:
            value = value[:self.maxlength]
        return value
```
