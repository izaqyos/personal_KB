---
type: reference
title: Tools
description: "Legacy Python KB section: Tools (GUI, tags: python GUI UX UI)"
tags: [python, legacy, reference]
generated: { by: "human:izaqyos", at: "2026-10-14T00:00:00Z" }
stale_after: "2028-10-14T00:00:00Z"
sources:
  - { id: py3-whatsnew, resource: "https://docs.python.org/3/whatsnew/3.0.html", title: "What's New In Python 3.0" }
  - { id: tkinter-docs, resource: "https://docs.python.org/3/library/tkinter.html", title: "tkinter — Python interface to Tcl/Tk (Python 3 documentation)" }
status: stable
capture_type: source
legacy_source: "python/KB_python#3"
---

# Tools

[↑ KB_python](/python/kb-python/README.md)

## 3.1 GUI, tags: python GUI UX UI

### 3.1.1 Tkinter, tags: tk interface, Tkinter, python GUI UX UI

#### 3.1.1.1 Create a popup window

> Updated 2026-10 to current practice.[^py3-whatsnew]

In Python 3 the `Tkinter` package is `tkinter`, and the old top-level dialog modules moved into it (`SimpleDialog` is now `tkinter.simpledialog`); `print` is a function.[^py3-whatsnew][^tkinter-docs]

First using SimpleDialog:

```python
#!/usr/bin/env python3

from tkinter import *
from tkinter.simpledialog import SimpleDialog

# initialize GUI toolkit
root = Tk()

# pop up a dialog window with some text
SimpleDialog(root,
             text="Hi there\nHere is some text",
             buttons=["OK"],
             default=0,
             title="Demo Dialog").go()

# notice the go()
```

Second, using simple custom dialog:

```python
from tkinter import *

class MyDialog:
    def __init__(self, parent):
        top = self.top = Toplevel(parent)

        Label(top, text="Value").pack()

        self.e = Entry(top)
        self.e.pack(padx=5)

        b = Button(top, text="OK", command=self.ok)
        b.pack(pady=5)

    def ok(self):
        print("value is", self.e.get())
        self.top.destroy()


root = Tk()
d = MyDialog(root)
root.wait_window(d.top)
```

#### 3.1.1.2 Building menues dynamically and passing an argument to callback

```text
				One form is the use a lambda function for the callback. example:
		gamesmenu = Menu(menubar, tearoff=0)
		for game in self.m_cfg.m_games.keys():
			gamesmenu.add_command(label=game, command= lambda p_game = game: self.query_game(p_game))
		menubar.add_cascade(label="Games", menu=gamesmenu)
```

#### 3.1.1.3 Dialogs, request additional information

```text
			Dialogs are windows popped up by a script to provide or request additional information. They come in two flavors, modal and nonmodal:
Modal
These dialogs block the rest of the interface until the dialog window is dismissed; users must reply to the dialog before the program continues.

Nonmodal
These dialogs can remain on-screen indefinitely without interfering with other windows in the interface; they can usually accept inputs at any time.

Regardless of their modality, dialogs are generally implemented with the Toplevel window object we met in the prior section, whether you make the Toplevel or not. There are essentially three ways to present pop-up dialogs to users with Tkinter: by using common dialog calls, by using the now-dated Dialog object, and by creating custom dialog windows with Toplevels and other kinds of widgets. Let's explore the basics of all three schemes.
```

#### 3.1.1.3.1 Standard (Common) Dialogs

> Updated 2026-10 to current practice.[^py3-whatsnew]

Tkinter supports many pre-made default dialog options. The Python 2 modules `tkMessageBox`, `tkFileDialog`, `tkColorChooser` and `tkSimpleDialog` are `tkinter.messagebox`, `tkinter.filedialog`, `tkinter.colorchooser` and `tkinter.simpledialog` in Python 3.[^py3-whatsnew][^tkinter-docs] See some basic examples:

dlg1.py:

```python
from tkinter import *
from tkinter.messagebox import *

def callback():
    if askyesno('Verify', 'Do you really want to quit?'):
        showwarning('Yes', 'Quit not yet implemented')
    else:
        showinfo('No', 'Quit has been cancelled')

errmsg = 'Sorry, no Spam allowed!'
Button(text='Quit', command=callback).pack(fill=X)
Button(text='Spam', command=(lambda: showerror('Spam', errmsg))).pack(fill=X)
mainloop()
```

quitter.py:

```python
#############################################
# a Quit button that verifies exit requests;
# to reuse, attach an instance to other GUIs
#############################################

from tkinter import *                          # get widget classes
from tkinter.messagebox import askokcancel     # get canned std dialog

class Quitter(Frame):                          # subclass our GUI
    def __init__(self, parent=None):           # constructor method
        Frame.__init__(self, parent)
        self.pack()
        widget = Button(self, text='Quit', command=self.quit)
        widget.pack(side=LEFT)
    def quit(self):
        ans = askokcancel('Verify exit', "Really quit?")
        if ans: Frame.quit(self)

if __name__ == '__main__':  Quitter().mainloop()
```

dialogTable.py:

```python
# define a name:callback demos table

from tkinter.filedialog   import askopenfilename    # get standard dialogs
from tkinter.colorchooser import askcolor           # they live in the tkinter package
from tkinter.messagebox   import askquestion, showerror
from tkinter.simpledialog import askfloat

demos = {
    'Open':  askopenfilename,
    'Color': askcolor,
    'Query': lambda: askquestion('Warning', 'You typed "rm *"\nConfirm?'),
    'Error': lambda: showerror('Error!', "He's dead, Jim"),
    'Input': lambda: askfloat('Entry', 'Enter credit card number')
}
```

demoDlg.py:

```python
from tkinter import *              # get base widget set
from dialogTable import demos      # button callback handlers
from quitter import Quitter        # attach a quit object to me

class Demo(Frame):
    def __init__(self, parent=None):
        Frame.__init__(self, parent)
        self.pack()
        Label(self, text="Basic demos").pack()
        for (key, value) in demos.items():
            Button(self, text=key, command=value).pack(side=TOP, fill=BOTH)
        Quitter(self).pack(side=TOP, fill=BOTH)

if __name__ == '__main__': Demo().mainloop()
```

demoDlg-print.py (Also actually use the input values from the dialogs):

```python
##########################################################################
# same, but show return values of dialog calls;  the lambda saves
# data from the local scope to be passed to the handler (button press
# handlers normally get no arguments) and works just like a nested def
# statement of this form: def func(key=key): self.printit(key)
##########################################################################

from tkinter import *              # get base widget set
from dialogTable import demos      # button callback handlers
from quitter import Quitter        # attach a quit object to me

class Demo(Frame):
    def __init__(self, parent=None):
        Frame.__init__(self, parent)
        self.pack()
        Label(self, text="Basic demos").pack()
        for (key, value) in demos.items():
            func = (lambda key=key: self.printit(key))
            Button(self, text=key, command=func).pack(side=TOP, fill=BOTH)
        Quitter(self).pack(side=TOP, fill=BOTH)
    def printit(self, name):
        print(name, 'returns =>', demos[name]())      # fetch, call, print

if __name__ == '__main__': Demo().mainloop()
```

Dynamically change background color, setcolor.py:

```python
from tkinter import *
from tkinter.colorchooser import askcolor

def setBgColor():
    (triple, hexstr) = askcolor()
    if hexstr:
        print(hexstr)
        push.config(bg=hexstr)

root = Tk()
push = Button(root, text='Set Background Color', command=setBgColor)
push.config(height=3, font=('times', 20, 'bold'))
push.pack(expand=YES, fill=BOTH)
root.mainloop()
```

#### 3.1.1.3.2 Custom (Common) Dialogs

```text
				The dialogs we've seen so far have a standard appearance and interaction. They are fine for many purposes, but often we need something a bit more custom. For example, forms that request multiple field inputs (e.g., name, age, shoe size) aren't directly addressed by the common dialog library. We could pop up one single-input dialog in turn for each requested field, but that isn't exactly user friendly.

Custom dialogs support arbitrary interfaces, but they are also the most complicated to program. Even so, there's not much to itsimply create a pop-up window as a Toplevel with attached widgets, and arrange a callback handler to fetch user inputs entered in the dialog (if any) and to destroy the window. To make such a custom dialog modal, we also need to wait for a reply by giving the window input focus, making other windows inactive, and waiting for an event. 
```

#### 3.1.1.4 Display image in label

```text
			http://effbot.org/tkinterbook/label.htm

photo = PhotoImage(file="icon.gif")
w = Label(parent, image=photo)
w.photo = photo
w.pack()
```

#### 3.1.1.4.1 PhotoImage

```text
				http://effbot.org/tkinterbook/photoimage.htm
```

#### 3.1.1.5 Tooltip

> Updated 2026-10 to current practice.[^py3-whatsnew]

Ported to Python 3: `import tkinter` instead of `Tkinter`, `key in dict` instead of the removed `dict.has_key()`, a real `KeyError(...)` instead of raising a string (string exceptions are gone), and integer division `//` for the pixel coordinate.[^py3-whatsnew]

```python
'''Michael Lange <klappnase at 8ung dot at>
The ToolTip class provides a flexible tooltip widget for Tkinter; it is based on IDLE's ToolTip
module which unfortunately seems to be broken (at least the version I saw).
INITIALIZATION OPTIONS:
anchor :        where the text should be positioned inside the widget, must be on of "n", "s", "e", "w", "nw" and so on;
                default is "center"
bd :            borderwidth of the widget; default is 1 (NOTE: don't use "borderwidth" here)
bg :            background color to use for the widget; default is "lightyellow" (NOTE: don't use "background")
delay :         time in ms that it takes for the widget to appear on the screen when the mouse pointer has
                entered the parent widget; default is 1500
fg :            foreground (i.e. text) color to use; default is "black" (NOTE: don't use "foreground")
follow_mouse :  if set to 1 the tooltip will follow the mouse pointer instead of being displayed
                outside of the parent widget; this may be useful if you want to use tooltips for
                large widgets like listboxes or canvases; default is 0
font :          font to use for the widget; default is system specific
justify :       how multiple lines of text will be aligned, must be "left", "right" or "center"; default is "left"
padx :          extra space added to the left and right within the widget; default is 4
pady :          extra space above and below the text; default is 2
relief :        one of "flat", "ridge", "groove", "raised", "sunken" or "solid"; default is "solid"
state :         must be "normal" or "disabled"; if set to "disabled" the tooltip will not appear; default is "normal"
text :          the text that is displayed inside the widget
textvariable :  if set to an instance of tkinter.StringVar() the variable's value will be used as text for the widget
width :         width of the widget; the default is 0, which means that "wraplength" will be used to limit the widgets width
wraplength :    limits the number of characters in each line; default is 150

WIDGET METHODS:
configure(**opts) : change one or more of the widget's options as described above; the changes will take effect the
                    next time the tooltip shows up; NOTE: follow_mouse cannot be changed after widget initialization

Other widget methods that might be useful if you want to subclass ToolTip:
enter() :           callback when the mouse pointer enters the parent widget
leave() :           called when the mouse pointer leaves the parent widget
motion() :          is called when the mouse pointer moves inside the parent widget if follow_mouse is set to 1 and the
                    tooltip has shown up to continually update the coordinates of the tooltip window
coords() :          calculates the screen coordinates of the tooltip window
create_contents() : creates the contents of the tooltip window (by default a tkinter.Label)
'''
# Ideas gleaned from PySol

import tkinter

class ToolTip:
    def __init__(self, master, text='Your text here', delay=1500, **opts):
        self.master = master
        self._opts = {'anchor':'center', 'bd':1, 'bg':'lightyellow', 'delay':delay, 'fg':'black',\
                      'follow_mouse':0, 'font':None, 'justify':'left', 'padx':4, 'pady':2,\
                      'relief':'solid', 'state':'normal', 'text':text, 'textvariable':None,\
                      'width':0, 'wraplength':150}
        self.configure(**opts)
        self._tipwindow = None
        self._id = None
        self._id1 = self.master.bind("<Enter>", self.enter, '+')
        self._id2 = self.master.bind("<Leave>", self.leave, '+')
        self._id3 = self.master.bind("<ButtonPress>", self.leave, '+')
        self._follow_mouse = 0
        if self._opts['follow_mouse']:
            self._id4 = self.master.bind("<Motion>", self.motion, '+')
            self._follow_mouse = 1
    
    def configure(self, **opts):
        for key in opts:
            if key in self._opts:
                self._opts[key] = opts[key]
            else:
                raise KeyError('Unknown option: "%s"' % key)
    
    ##----these methods handle the callbacks on "<Enter>", "<Leave>" and "<Motion>"---------------##
    ##----events on the parent widget; override them if you want to change the widget's behavior--##
    
    def enter(self, event=None):
        self._schedule()
        
    def leave(self, event=None):
        self._unschedule()
        self._hide()
    
    def motion(self, event=None):
        if self._tipwindow and self._follow_mouse:
            x, y = self.coords()
            self._tipwindow.wm_geometry("+%d+%d" % (x, y))
    
    ##------the methods that do the work:---------------------------------------------------------##
    
    def _schedule(self):
        self._unschedule()
        if self._opts['state'] == 'disabled':
            return
        self._id = self.master.after(self._opts['delay'], self._show)

    def _unschedule(self):
        id = self._id
        self._id = None
        if id:
            self.master.after_cancel(id)

    def _show(self):
        if self._opts['state'] == 'disabled':
            self._unschedule()
            return
        if not self._tipwindow:
            self._tipwindow = tw = tkinter.Toplevel(self.master)
            # hide the window until we know the geometry
            tw.withdraw()
            tw.wm_overrideredirect(1)

            if tw.tk.call("tk", "windowingsystem") == 'aqua':
                tw.tk.call("::tk::unsupported::MacWindowStyle", "style", tw._w, "help", "none")

            self.create_contents()
            tw.update_idletasks()
            x, y = self.coords()
            tw.wm_geometry("+%d+%d" % (x, y))
            tw.deiconify()
    
    def _hide(self):
        tw = self._tipwindow
        self._tipwindow = None
        if tw:
            tw.destroy()
                
    ##----these methods might be overridden in derived classes:----------------------------------##
    
    def coords(self):
        # The tip window must be completely outside the master widget;
        # otherwise when the mouse enters the tip window we get
        # a leave event and it disappears, and then we get an enter
        # event and it reappears, and so on forever :-(
        # or we take care that the mouse pointer is always outside the tipwindow :-)
        tw = self._tipwindow
        twx, twy = tw.winfo_reqwidth(), tw.winfo_reqheight()
        w, h = tw.winfo_screenwidth(), tw.winfo_screenheight()
        # calculate the y coordinate:
        if self._follow_mouse:
            y = tw.winfo_pointery() + 20
            # make sure the tipwindow is never outside the screen:
            if y + twy > h:
                y = y - twy - 30
        else:
            y = self.master.winfo_rooty() + self.master.winfo_height() + 3
            if y + twy > h:
                y = self.master.winfo_rooty() - twy - 3
        # we can use the same x coord in both cases:
        x = tw.winfo_pointerx() - twx // 2
        if x < 0:
            x = 0
        elif x + twx > w:
            x = w - twx
        return x, y

    def create_contents(self):
        opts = self._opts.copy()
        for opt in ('delay', 'follow_mouse', 'state'):
            del opts[opt]
        label = tkinter.Label(self._tipwindow, **opts)
        label.pack()

##---------demo code-----------------------------------##

def demo():
    root = tkinter.Tk(className='ToolTip-demo')
    l = tkinter.Listbox(root)
    l.insert('end', "I'm a listbox")
    l.pack(side='top')
    t1 = ToolTip(l, follow_mouse=1, text="I'm a tooltip with follow_mouse set to 1, so I won't be placed outside my parent")
    b = tkinter.Button(root, text='Quit', command=root.quit)
    b.pack(side='bottom')
    t2 = ToolTip(b, text='Enough of this')
    root.mainloop()

if __name__ == '__main__':
    demo()
```

#### 3.1.1.6 clean widgets, remove/destroy frame

#### 3.1.1.6.1 In grid geometry

```text
				f = Frame(parent)
b = Button(f, text="Foobar")
b.grid(row=0, col=0)

if you then want to get rid of b, you do
f.grid_forget()

NOT
b.grid_forget()
```

#### 3.1.1.7 scrollbar

> Updated 2026-10 to current practice.[^py3-whatsnew]

```text
			Courtesy of: http://effbot.org/zone/tkinter-scrollbar-patterns.htm

Tkinter provides a number of scrollable widgets, but unlike many other toolkits, the widgets do not maintain their own scrollbars. To add a scrollbar to a scrollable widget, you have to create separate Scrollbar widget instances, and attach them to the widget. This article explains how the scrollbar interface works, and shows you how to add scrollbars to standard widgets.
The Scrollbar Interface #

In Tkinter, the scrollbar is a separate widget that can be attached to any widget that support the standard scrollbar interface. Such widgets include:

    * the Listbox widget.
    * the Text widget.
    * the Canvas widget
    * the Entry widget

To attach a scrollbar to a scrolled widget, set the scrollbarÂ¿s command option to point to a method that will be called when the scrollbar is changed, and set the widgetÂ¿s scroll command option to the scrollbarÂ¿s set method. This method is called by the widget when when the view is changed (for example, when new items are added, or the widget is resized).

In standard Tkinter, these methods and options have standard names; the scrollbar should call the widgetÂ¿s xview or yview method when the scrollbar is changed, and the widgets provide xscrollcommand and yscrollcommand command options that are called when the scrollbar needs to be updated.

In the following example, a listbox containing 100 integers is equipped with a scrollbar:
Example: A listbox with a scrollbar
```

The effbot examples are Python 2; in Python 3 import from `tkinter` and call `print()`:[^py3-whatsnew][^tkinter-docs]

```python
from tkinter import *

root = Tk()

scrollbar = Scrollbar(root)
scrollbar.pack(side=RIGHT, fill=Y)

listbox = Listbox(root)
listbox.pack()

for i in range(100):
    listbox.insert(END, i)

# attach listbox to scrollbar
listbox.config(yscrollcommand=scrollbar.set)
scrollbar.config(command=listbox.yview)

mainloop()
```

To watch the traffic between the listbox and the scrollbar, you can replace the Scrollbar and Listbox classes with versions that log the relevant method calls:

```python
class DebugScrollbar(Scrollbar):
    def set(self, *args):
        print("SCROLLBAR SET", args)
        Scrollbar.set(self, *args)

class DebugListbox(Listbox):
    def yview(self, *args):
        print("LISTBOX YVIEW", args)
        return Listbox.yview(self, *args)

scrollbar = DebugScrollbar()
scrollbar.pack(side=RIGHT, fill=Y)

listbox = DebugListbox(yscrollcommand=scrollbar.set)
listbox.pack()

scrollbar.config(command=listbox.yview)
```

```text
When you run the example using these widgets, youÂ¿ll get a stream of SCROLLBAR and LISTBOX messages in the console window.

When the listbox is first displayed, the listbox calls the scrollbar to inform it about the current view (in this example, 10 out of 100 lines are displayed). The scrollbar calls back, telling the listbox that the scrollbar is in its topmost position:

SCROLLBAR SET ('0', '0.1')
LISTBOX YVIEW ('moveto', '0')

Note that all arguments are strings, and that the values are normalized to fit in the 0.0 to 1.0 range.

When you move the scrollbar thumb, the scrollbar sends moveto messages to the listbox. The listbox updates the view, and calls the scrollbarÂ¿s set method with the resulting values:

LISTBOX YVIEW ('moveto', '0.1041')
SCROLLBAR SET ('0.1', '0.2')
LISTBOX YVIEW ('moveto', '0.186')
SCROLLBAR SET ('0.19', '0.29')
LISTBOX YVIEW ('moveto', '0.3124')
SCROLLBAR SET ('0.31', '0.41')
LISTBOX YVIEW ('moveto', '0.4166')
SCROLLBAR SET ('0.42', '0.52')

Note that the listbox rounds the scrollbar value to the nearest full line.

If you click outside the scrollbar thumb, the scrollbar generates scroll events.

LISTBOX YVIEW ('scroll', '1', 'pages')
SCROLLBAR SET ('0.5', '0.6')
LISTBOX YVIEW ('scroll', '1', 'pages')
SCROLLBAR SET ('0.58', '0.68')
LISTBOX YVIEW ('scroll', '1', 'units')
SCROLLBAR SET ('0.59', '0.69')
LISTBOX YVIEW ('scroll', '1', 'units')
SCROLLBAR SET ('0.6', '0.7')

For scroll events, the scrollbar provides both a value and a unit, and itÂ¿s up to the listbox to interpret the units in a way that makes sense to the user. The value is usually -1 (scroll up/left) or 1 (scroll down/right), and the unit is either pages or units.

In a listbox, the basic unit is usually a single item, and a page is as many items that fit into the widgetÂ¿s window. Other widgets may use different definitions.
Patterns #
Adding Scrollbars to Listbox Widgets #

WeÂ¿ve already seen how to add scrollbars to a listbox widget, but hereÂ¿s the relevant part again:

scrollbar = Scrollbar(master)
scrollbar.pack(side=RIGHT, fill=Y)

listbox = Listbox(master, yscrollcommand=scrollbar.set)
listbox.pack()

scrollbar.config(command=listbox.yview)

Note that this example uses pack to add the scrollbar and the listbox to the parent widget. This can get extremely tricky if you plan to add more than just a scrolled listbox to the parent; to solve this, you can either use grid to get the individual widgets in their right location, or pack the widgets into an extra frame, and use pack or grid to put the frame where you want it.

Another problem with the original example is that the scrollbar has no border, but the standard listbox is drawn with a Â¿sunkenÂ¿ appearance. At least on Windows, things look a lot better if the listbox contents and the scrollbar are placed at the same level. In the following example, IÂ¿ve removed the border from the listbox (by setting the border width to zero), and added a border to the extra frame widget:

frame = Frame(root, bd=2, relief=SUNKEN)

scrollbar = Scrollbar(frame)
scrollbar.pack(side=RIGHT, fill=Y)

listbox = Listbox(frame, bd=0, yscrollcommand=scrollbar.set)
listbox.pack()

scrollbar.config(command=listbox.yview)

frame.pack()

The Listbox widget also supports horizontal scrolling. For examples, see the next section.
Adding Scrollbars to Text Widgets #

The Text widget implements the same scrollbar interface as the listbox; create the scrollbar, and attach it to the text widget by setting the appropriate options:

scrollbar = Scrollbar(master)
scrollbar.pack(side=RIGHT, fill=Y)

text = Text(master, wrap=WORD, yscrollcommand=scrollbar.set)
text.pack()

scrollbar.config(command=text.yview)

The wrap option controls how to handle long lines in the text widget. The default value is CHAR, which tells the widget that itÂ¿s okay to add line breaks between individual characters, for lines that are longer than the widget is wide. If youÂ¿re displaying text in the widget, itÂ¿s usually better to set the wrap option to WORD, like in the example above. This tells the widget to avoid breaking lines inside words.

You can also switch off line wrapping, by setting the wrap option to NONE. When you do, lines that are longer than the widget is wide will be truncated. To allow the user to display wide text, you can add a second, horizontal scrollbar:

xscrollbar = Scrollbar(master, orient=HORIZONTAL)
xscrollbar.pack(side=BOTTOM, fill=X)

yscrollbar = Scrollbar(master)
yscrollbar.pack(side=RIGHT, fill=Y)

text = Text(master, wrap=NONE,
            xscrollcommand=xscrollbar.set,
            yscrollcommand=yscrollbar.set)
text.pack()

xscrollbar.config(command=text.xview)
yscrollbar.config(command=text.yview)

Note that by using pack to display the widgets, youÂ¿ll end up with either a horizontal scrollbar thatÂ¿s wider than the text widget, or a vertical scrollbar thatÂ¿s taller than the text widget. You can probably get around this by packing a small frame in the lower left corner, and use additional frames to get the right grouping, but itÂ¿s easier to put everything in a separate frame, and use the grid manager to display the widgets:

frame = Frame(master, bd=2, relief=SUNKEN)

frame.grid_rowconfigure(0, weight=1)
frame.grid_columnconfigure(0, weight=1)

xscrollbar = Scrollbar(frame, orient=HORIZONTAL)
xscrollbar.grid(row=1, column=0, sticky=E+W)

yscrollbar = Scrollbar(frame)
yscrollbar.grid(row=0, column=1, sticky=N+S)

text = Text(frame, wrap=NONE, bd=0,
            xscrollcommand=xscrollbar.set,
            yscrollcommand=yscrollbar.set)

text.grid(row=0, column=0, sticky=N+S+E+W)

xscrollbar.config(command=text.xview)
yscrollbar.config(command=text.yview)

frame.pack()

Note the use of grid_rowconfigure and grid_columnconfigure. If you leave out those calls, the widget wonÂ¿t behave properly if you pack the frame into an expanding parent; if the parent is made smaller, the scrollbars may disappear out of sight. If the parent is made larger, youÂ¿ll end up with lots of padding.
Adding Scrollbars to Canvas Widgets #

As expected, the Canvas widget also implements the standard scrollbar interface, but with a twist. HereÂ¿s an example:

frame = Frame(root, bd=2, relief=SUNKEN)

frame.grid_rowconfigure(0, weight=1)
frame.grid_columnconfigure(0, weight=1)

xscrollbar = Scrollbar(frame, orient=HORIZONTAL)
xscrollbar.grid(row=1, column=0, sticky=E+W)

yscrollbar = Scrollbar(frame)
yscrollbar.grid(row=0, column=1, sticky=N+S)

canvas = Canvas(frame, bd=0,
                xscrollcommand=xscrollbar.set,
                yscrollcommand=yscrollbar.set)

canvas.grid(row=0, column=0, sticky=N+S+E+W)

xscrollbar.config(command=canvas.xview)
yscrollbar.config(command=canvas.yview)

frame.pack()

If you leave it like this, you get a nice scrolling canvas, but the scrollbars do not behave like expected; the scrollbar thumbs stay small and centered no matter how you scroll around. The reason is that the canvas coordinate space is unbounded; at any time, youÂ¿re only seeing a very small fraction of the available coordinate space.

To fix this, you can tell the canvas to limit the scrolling to a given area. To do this, set the scrollregion option to a rectangle (given as a 4-tuple). For example, if you know that youÂ¿re going to draw things in a 1000x1000 area, you can set the scroll region when you create the canvas:

canvas = Canvas(frame, bd=0, scrollregion=(0, 0, 1000, 1000),
                xscrollcommand=xscrollbar.set,
                yscrollcommand=yscrollbar.set)

If you donÂ¿t know the scroll region until later, use the config method to update the region:

canvas.config(scrollregion=(left, top, right, bottom))

You can use the bbox method to get a bounding box for a given object, or a group of objects; canvas.bbox(ALL) returns the bounding box for all objects on the canvas:

canvas.config(scrollregion=canvas.bbox(ALL))

Patterns: A Scrolled Widget Helper

To be continued.
 

```

The helper sketch, in Python 3 (`dict.has_key()` no longer exists; `setdefault` does the same job). The `...` parts were left unfinished in the original:

```python
def Scrolled(_widget, _master, _mode='y', **options):
    frame = Frame(_master, bd=2, relief=SUNKEN)
    xscrollbar = yscrollbar = None
    if 'x' in _mode: xscrollbar = Scrollbar(frame, orient=HORIZONTAL)
    if 'y' in _mode: yscrollbar = Scrollbar(frame)
    options.setdefault("bd", 0)
    widget = _widget(frame, **options)
    # ... grid the scrollbars and the widget ...
    return widget

# widget = Scrolled(Listbox, master, ...options...)
# widget = Scrolled(Text, master, ...options...)
# widget = Scrolled(Canvas, master, 'xy', ...options...)

def ScrolledListbox(master, _mode='y', **options):
    return Scrolled(Listbox, master, _mode, **options)

def ScrolledText(master, _mode='y', **options):
    return Scrolled(Text, master, _mode, **options)

def ScrolledCanvas(master, _mode='xy', **options):
    return Scrolled(Canvas, master, _mode, **options)

# widget = ScrolledListbox(master, ...options...)
# widget = ScrolledText(master, ...options...)
# widget = ScrolledCanvas(master, ...options...)
```

#### 3.1.1.7.1 Add scrollbar to frame

> Updated 2026-10 to current practice.[^py3-whatsnew]

```text
				Impossible, but see solution below (from http://mail.python.org/pipermail/python-list/1999-June/005180.html):

				> I have only an easy question. I think it is possible to bind a scrollbar
> and an other widget e.g. a frame with buttons. But I have not found any
> literature or programming examples. I want to bind the scrollbar to an
> frame and I don't know how. Please help me.

you cannot.  period.

but you can put the frame in a canvas, and
add scrollbars to the canvas.    the following
example does this (and more).

</F>

#
# tk045 -- scrolled frame with autohiding scrollbars
#
# fredrik lundh, august 1998
#
# fredrik at pythonware.com
# http://www.pythonware.com
#

```

Python 3 version: `tkinter` instead of `Tkinter`, `raise TclError("...")` instead of the removed `raise E, "msg"` syntax, and `grid_remove()`, which tkinter now has.[^py3-whatsnew][^tkinter-docs]

```python
from tkinter import *

class AutoScrollbar(Scrollbar):
    # a scrollbar that hides itself if it's not needed.  only
    # works if you use the grid geometry manager.
    def set(self, lo, hi):
        if float(lo) <= 0.0 and float(hi) >= 1.0:
            self.grid_remove()
        else:
            self.grid()
        Scrollbar.set(self, lo, hi)
    def pack(self, **kw):
        raise TclError("cannot use pack with this widget")
    def place(self, **kw):
        raise TclError("cannot use place with this widget")

#
# create scrolled canvas

root = Tk()

vscrollbar = AutoScrollbar(root)
vscrollbar.grid(row=0, column=1, sticky=N+S)
hscrollbar = AutoScrollbar(root, orient=HORIZONTAL)
hscrollbar.grid(row=1, column=0, sticky=E+W)

canvas = Canvas(root,
                yscrollcommand=vscrollbar.set,
                xscrollcommand=hscrollbar.set)
canvas.grid(row=0, column=0, sticky=N+S+E+W)

vscrollbar.config(command=canvas.yview)
hscrollbar.config(command=canvas.xview)

# make the canvas expandable
root.grid_rowconfigure(0, weight=1)
root.grid_columnconfigure(0, weight=1)

#
# create canvas contents

frame = Frame(canvas)
frame.rowconfigure(1, weight=1)
frame.columnconfigure(1, weight=1)

rows = 5
for i in range(1, rows):
    for j in range(1, 10):
        button = Button(frame, padx=7, pady=7, text="[%d,%d]" % (i, j))
        button.grid(row=i, column=j, sticky='news')

canvas.create_window(0, 0, anchor=NW, window=frame)

frame.update_idletasks()

canvas.config(scrollregion=canvas.bbox("all"))

root.mainloop()
```

```text
			3.1.1.7 
```

### 3.1.2 more on TKinter

#### 3.1.2.1 TKinter getting started with Chatgpt

````text
To get started with Python `tkinter`, you first need to make sure that it is installed on your system. `tkinter` is usually included in Python distributions, so you may not need to install it separately. However, you can check if `tkinter` is installed by running the following command in your terminal or command prompt:

```
python -m tkinter
```

If `tkinter` is installed, a small window should appear. You can close this window to exit the `tkinter` application.

Once you have confirmed that `tkinter` is installed, you can start building graphical user interfaces (GUIs) using `tkinter`. Here's a simple "Hello, World!" example to get you started:

```python
import tkinter as tk

root = tk.Tk()

label = tk.Label(root, text="Hello, World!")
label.pack()

root.mainloop()
```

In this example, we import `tkinter` and create a new `Tk` object, which represents the main window of the GUI. We then create a `Label` widget that displays the text "Hello, World!" and pack it into the window using the `pack()` method. Finally, we start the GUI event loop using the `mainloop()` method, which keeps the window open until it is closed by the user.

You can save this code in a file with a `.py` extension, such as `hello.py`, and run it from the terminal or command prompt using the following command:

```
python hello.py
```

This will open a new window with the "Hello, World!" label.

From here, you can explore the `tkinter` module and its various widgets and methods to create more complex GUIs. The Python documentation for `tkinter` provides a comprehensive reference to all the available widgets and methods: https://docs.python.org/3/library/tk.html
		    3.1.2.2

		3.1.3
````

## 3.2 Pygame

## 3.3 PyopenGL

## 3.4 Twisted

## 3.5 Pyui

[^py3-whatsnew]: What's New In Python 3.0
[^tkinter-docs]: tkinter — Python interface to Tcl/Tk (Python 3 documentation)
