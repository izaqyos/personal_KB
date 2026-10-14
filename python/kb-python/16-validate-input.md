---
type: reference
title: Validate input
description: "Legacy Python KB section: Validate input (Tkinter widget validators)"
tags: [python, legacy, reference]
generated: { by: "human:izaqyos", at: "2026-10-14T00:00:00Z" }
stale_after: "2028-10-14T00:00:00Z"
status: stable
capture_type: source
legacy_source: "python/KB_python#16"
sources:
  - { id: py3-whatsnew, resource: "https://docs.python.org/3/whatsnew/3.0.html", title: "What's New In Python 3.0" }
  - { id: py313-whatsnew, resource: "https://docs.python.org/3/whatsnew/3.13.html", title: "What's New In Python 3.13" }
  - { id: py-tkinter, resource: "https://www.tcl-lang.org/man/tcl8.6/TkCmd/entry.htm", title: "Tk 8.6 manual: entry widget, VALIDATION" }
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
```

## Acquiring Input

> Updated 2026-10 to current practice.[^py3-whatsnew]

First your program will need to acquire some user input. From the console, Python 3 has a single function for this: `input("Prompt")`. It reads a line from stdin and **always returns a `str`** (trailing newline stripped). Python 2's `raw_input()` was renamed to `input()`, and Python 2's old `input()` (which ran `eval()` on what the user typed) was removed.[^py3-whatsnew] You can also get input from command-line arguments (`sys.argv`, or better `argparse`) or environment variables (`os.environ`).

Other, more graphical methods are available: dialog tools such as `zenity`/`kdialog`, or full GUI toolkits from Python such as `tkinter` (stdlib), PyQt/PySide, wxPython and PyGObject (GTK).

A few words of caution. Most users are contented, docile creatures who like to have their belly rubbed, but you will encounter rogue types bent on destruction. You must never allow user input to leak into your command space:

- Never pass user input to `eval()` or `exec()`. (That is exactly what Python 2's `input()` did; `eval(input())` reproduces that hole in Python 3 - don't.) If you need to parse a Python literal, use `ast.literal_eval()`.
- Don't build shell commands from user input. Prefer `subprocess.run([...])` with an argument list (no `shell=True`) over `os.system()` / `os.popen()`, and still validate the arguments.
- Escape user input before putting it in a web page: use `html.escape()` (the old `cgi.escape()` is gone, and the whole `cgi` module was removed in Python 3.13).[^py313-whatsnew] Better still, use a templating engine that auto-escapes.
- Never format user input into a SQL string. Use your driver's parameter placeholders, e.g. `cur.execute("SELECT * FROM t WHERE name = ?", (name,))`.

O.K. Relax. The spooky part is over.

Open a terminal and type `python3` to enter the interpreter.

## Checking the Content of String Objects

All `str` objects have built-in predicate methods that return `True`/`False`:

```python
>>> s = "9"
>>> s.isdigit()
True
>>> s.isalnum(), s.isalpha()
(True, False)
```

- `s.isalnum()` - all characters are alphanumeric.
- `s.isalpha()` - all characters are alphabetic.
- `s.isdecimal()` - all characters are decimal digits (stricter than `isdigit()`, which also accepts things like `"²"` that `int()` rejects).

See the [string methods reference](https://docs.python.org/3/library/stdtypes.html#string-methods) for the full list. (Avoid naming a variable `input` - it shadows the built-in function.)

This handles simple cases like menu choices, but `"9.9"` and `"-9"` are valid numbers for which `isdigit()` returns `False`. So the robust approach is to just try the conversion and catch the specific exception:

```python
try:
    some_var = int(raw)
    print("Is an integer")
except ValueError:
    print("Not an integer")
```

`int()` raises `ValueError` for strings like `"9.9"` or `"Ham on rye"`. (Since `input()` always returns a `str`, `TypeError` only matters if the value might be `None` or some other non-string.) Catch the specific exceptions you expect; don't write a bare `except:` - it also traps `KeyboardInterrupt`, `SystemExit` and your own bugs, which makes debugging a nightmare.

Other converters you'll find useful are `float()` and `decimal.Decimal()` (Python 3 has no separate `long`; `int` is arbitrary precision). On the flip side, `str()` converts anything to a string.

Don't forget to range check - it's no good ensuring your program always gets an integer if it blithely accepts `42` as a day of the month. Putting it together:

```python
def read_int(prompt: str, lo: int, hi: int) -> int:
    """Prompt until the user enters an integer in [lo, hi]."""
    while True:
        raw = input(prompt).strip()
        try:
            value = int(raw)
        except ValueError:
            print(f"{raw!r} is not an integer")
            continue
        if lo <= value <= hi:
            return value
        print(f"must be between {lo} and {hi}")

day = read_int("Day of month: ", 1, 31)
```

```text
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

> Updated 2026-10 to current practice.[^py-tkinter]

Originally: "A Validating Entry Widget" (Fredrik Lundh, 1998), which subclassed `Tkinter.Entry`, used `apply()` and a `StringVar` trace to undo bad edits. That code is Python 2 only (`Tkinter` was renamed `tkinter`, `apply()` was removed[^py3-whatsnew]). Even the original noted that newer Tk supports the `validate` / `validatecommand` options, which is the way to do it today: Tk calls your function before applying each edit and rejects the edit if it returns `False`. The `%P` substitution passes the value the entry *would* have if the edit is allowed.

```python
import tkinter as tk


class ValidatingEntry(tk.Entry):
    """Entry that rejects edits for which validate() returns False."""

    def __init__(self, master=None, value="", **kw):
        super().__init__(master, **kw)
        self.insert(0, value)
        # %P = the value the entry would have if the edit is allowed
        vcmd = (self.register(self._check), "%P")
        self.configure(validate="key", validatecommand=vcmd)

    def _check(self, proposed: str) -> bool:
        return self.validate_value(proposed)

    def validate_value(self, value: str) -> bool:
        # override: return True to accept the edit, False to reject it
        return True


class IntegerEntry(ValidatingEntry):
    def validate_value(self, value: str) -> bool:
        if value in ("", "-"):          # allow empty / partial input
            return True
        try:
            int(value)
            return True
        except ValueError:
            return False


class FloatEntry(ValidatingEntry):
    def validate_value(self, value: str) -> bool:
        if value in ("", "-", ".", "-."):
            return True
        try:
            float(value)
            return True
        except ValueError:
            return False


class MaxLengthEntry(ValidatingEntry):
    def __init__(self, master=None, value="", maxlength=None, **kw):
        self.maxlength = maxlength
        super().__init__(master, value, **kw)

    def validate_value(self, value: str) -> bool:
        return self.maxlength is None or len(value) <= self.maxlength


if __name__ == "__main__":
    root = tk.Tk()
    MaxLengthEntry(root, maxlength=20).pack()
    IntegerEntry(root).pack()
    root.mainloop()
```

Notes:

- `IntegerEntry` / `FloatEntry` accept an empty or partial value (`""`, `"-"`) so the user can clear the field or start typing a negative number; check the final value again when you use it.
- Pasting a too-long string into `MaxLengthEntry` is rejected as a whole. If you'd rather truncate, trim the value yourself (e.g. in a `<<Paste>>` handler) instead of rejecting.
- With `ttk.Entry` the same `validate` / `validatecommand` options apply.

[^py3-whatsnew]: What's New In Python 3.0
[^py313-whatsnew]: What's New In Python 3.13
[^py-tkinter]: Tk 8.6 manual: entry widget, VALIDATION
