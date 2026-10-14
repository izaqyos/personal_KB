---
type: reference
title: Debug Python
description: "Legacy Python KB section: Debug Python (PDB, Let's start with a simple program, epdb1.py.)"
tags: [debugging, python, legacy]
generated: { by: "human:izaqyos", at: "2026-10-14T00:00:00Z" }
stale_after: "2028-10-14T00:00:00Z"
sources:
  - { id: py-pdb, resource: "https://docs.python.org/3/library/pdb.html", title: "pdb — The Python Debugger (Python 3 docs)" }
  - { id: py3-whatsnew, resource: "https://docs.python.org/3/whatsnew/3.0.html", title: "What's New In Python 3.0" }
status: stable
capture_type: source
legacy_source: "python/KB_python#13"
---

# Debug Python

[↑ KB_python](/python/kb-python/README.md)

## 13.1 PDB

> Updated 2026-10 to current practice.[^py-pdb]

`pdb` is Python's built-in interactive source debugger. It supports (conditional) breakpoints, stepping by source line, inspecting stack frames, listing source, evaluating arbitrary Python in any frame, and post-mortem debugging. The prompt is `(Pdb)`.

Ways to start it in Python 3:

```python
def double(x):
    breakpoint()          # built-in since 3.7; replaces "import pdb; pdb.set_trace()"
    return x * 2
```

```sh
python -m pdb myscript.py        # run a script under pdb; drops into post-mortem on an uncaught exception, then restarts
python -m pdb -m mypackage.main  # debug a module (3.7+)
python -m pdb -c continue myscript.py   # run until a crash/breakpoint (-c since 3.2)
python -m pdb -p 1234            # attach to a running process by PID (3.14+)
PYTHONBREAKPOINT=0 python myscript.py   # disable all breakpoint() calls
```

Inspect a crashed program post-mortem:

```python
>>> import pdb
>>> def f(x):
...     print(1 / x)
...
>>> f(0)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "<stdin>", line 2, in f
ZeroDivisionError: division by zero
>>> pdb.pm()
> <stdin>(2)f()
(Pdb) p x
0
```

Useful newer features: `interact` opens a REPL in the current frame (`exit()`/`quit()` leave it since 3.13). Convenience variables such as `$_frame`, `$_retval` and `$_exception` exist since 3.12. Since 3.13, `pdb.set_trace()`/`breakpoint()` stop immediately at the call rather than on the next line.

IDE debuggers (VS Code, PyCharm, and others) build on the same model if you prefer a GUI. The old IDLE and Wing IDE 1.1 links in the original notes are dead.

Getting started: the simplest way to use the Python debugger.

### 13.1.1. Let's start with a simple program, epdb1.py.

> Updated 2026-10 to current practice.[^py3-whatsnew]

Examples converted to Python 3 (`print` is a function; `breakpoint()` instead of `import pdb; pdb.set_trace()`).

```python
# epdb1.py -- experiment with the Python debugger, pdb
a = "aaa"
b = "bbb"
c = "ccc"
final = a + b + c
print(final)
```

13.1.2 – 13.1.3. Find a spot where you would like tracing to begin and insert `breakpoint()`. No import is needed. The classic `import pdb` + `pdb.set_trace()` still works.

```python
# epdb1.py -- experiment with the Python debugger, pdb
a = "aaa"
breakpoint()
b = "bbb"
c = "ccc"
final = a + b + c
print(final)
```

13.1.4. Now run your program from the command line as usual:

```sh
python3 epdb1.py
```

When your program reaches `breakpoint()` it starts tracing. It (1) stops, (2) displays the "current statement" (the line that will execute next), and (3) waits for your input at the `(Pdb)` prompt.

```text
Execute the next statement... with "n" (next)

At the (Pdb) prompt, press the lower-case letter "n" (for "next") on your keyboard, and then press the ENTER key. This will tell pdb to execute the current statement. Keep doing this -- pressing "n", then ENTER.

Eventually you will cometo the end of your program, and it will terminate and return you to the normal command prompt.

Congratulations! You've just done your first debugging run!

Repeating the last debugging command... with ENTER

This time, do the same thing as you did before. Start your program running. At the (Pdb) prompt, press the lower-case letter "n" (for "next") on your keyboard, and then press the ENTER key.

But this time, after the first time that you press "n" and then ENTER, don't do it any more. Instead, when you see the (Pdb) prompt, just press ENTER. You will notice that pdb continues, just as if you had pressed "n".   So this is Handy Tip #1:

    If you press ENTER without entering anything, pdb will re-execute the last command that you gave it. 

In this case, the command was "n", so you could just keep stepping through the program by pressing ENTER.

Notice that as you passed the last line (the line with the "print" statement), it was executed and you saw the output of the print statement ("aaabbbccc") displayed on your screen.

Quitting it all... with "q" (quit)

The debugger can do all sorts of things, some of which you may find totally mystifying. So the most important thing to learn now -- before you learn anything else -- is how to quit debugging!

It is easy. When you see the (Pdb) prompt, just press "q" (for "quit") and the ENTER key. Pdb will quit and you will be back at your command prompt. Try it, and see how it works.

Printing the value of variables... with "p" (print)

The most useful thing you can do at the (Pdb) prompt is to print the value of a variable. Here's how to do it.

When you see the (Pdb) prompt, enter "p" (for "print") followed by the name of the variable you want to print. And of course, you end by pressing the ENTER key.

Note that you can print multiple variables, by separating their names with commas (just as in a regular Python "print" statement). For example, you can print the value of the variables a, b, and c this way:

          p a, b, c

When does pdb display a line?

Suppose you have progressed through the program until you see the line

          final = a + b + c

and you give pdb the command

          p final

You will get a NameError exception. This is because, although you are seeing the line, it has not yet executed. So the final variable has not yet been created.

Now press "n" and ENTER to continue and execute the line. Then try the "p final" command again. This time, when you give the command "p final", pdb will print the value of final, which is "aaabbbccc".

Turning off the (Pdb) prompt... with "c" (continue)

You probably noticed that the "q" command got you out of pdb in a very crude way -- basically, by crashing the program.

If you wish simply to stop debugging, but to let the program continue running, then you want to use the "c" (for "continue") command at the (Pdb) prompt. This will cause your program to continue running normally, without pausing for debugging. It may run to completion. Or, if the pdb.set_trace() statement was inside a loop, you may encounter it again, and the (Pdb) debugging prompt will appear once more.

Seeing where you are... with "l" (list)

As you are debugging, there is a lot of stuff being written to the screen, and it gets really hard to get a feeling for where you are in your program. That's where the "l" (for "list") command comes in. (Note that it is a lower-case "L", not the numeral "one" or the capital letter "I".)

"l" shows you, on the screen, the general area of your program's souce code that you are executing. By default, it lists 11 (eleven) lines of code. The line of code that you are about to execute (the "current line") is right in the middle, and there is a little arrow "-->" that points to it.

So a typical interaction with pdb might go like this

    * The pdb.set_trace() statement is encountered, and you start tracing with the (Pdb) prompt
    * You press "n" and then ENTER, to start stepping through your code.
    * You just press ENTER to step again.
    * You just press ENTER to step again.
    * You just press ENTER to step again. etc. etc. etc.
    * Eventually, you realize that you are a bit lost. You're not exactly sure where you are in your program any more. So...

    * You press "l" and then ENTER. This lists the area of your program that is currently being executed.
    * You inspect the display, get your bearings, and are ready to start again. So....
    * You press "n" and then ENTER, to start stepping through your code.
    * You just press ENTER to step again.
    * You just press ENTER to step again. etc. etc. ec.

Stepping into subroutines... with "s" (step into)

Eventually, you will need to debug larger programs -- programs that use subroutines. And sometimes, the problem that you're trying to find will lie buried in a subroutine. Consider the following program. (Click HERE for the source code.)

        # epdb2.py -- experiment with the Python debugger, pdb (Python 3)
        import pdb      # or drop this and use breakpoint() below

        def combine(s1,s2):      # define subroutine combine, which...
            s3 = s1 + s2 + s1    # sandwiches s2 between copies of s1, ...
            s3 = '"' + s3 +'"'   # encloses it in double quotes,...
            return s3            # and returns it.

        a = "aaa"
        pdb.set_trace()
        b = "bbb"
        c = "ccc"
        final = combine(a,b)
        print(final)
        

As you move through your programs by using the "n" command at the (Pdb) prompt, you will find that when you encounter a statement that invokes a subroutine -- the final = combine(a,b) statement, for example -- pdb treats it no differently than any other statement. That is, the statement is executed and you move on to the next statement -- in this case, to print final.

But suppose you suspect that there is a problem in a subroutine. In our case, suppose you suspect that there is a problem in the combine subroutine. What you want -- when you encounter the final = combine(a,b) statement -- is some way to step into the combine subroutine, and to continue your debugging inside it.

Well, you can do that too. Do it with the "s" (for "step into") command.

When you execute statements that do not involve function calls, "n" and "s" do the same thing -- move on to the next statement. But when you execute statements that invoke functions, "s", unlike "n", will step into the subroutine. In our case, if you executed the final = combine(a,b) statement using "s", then next statement that pdb would show you would be the first statement in the combine subroutine:

               def combine(s1,s2): 

and you will continue debugging from there.

Continuing... but just to the end of the current subroutine... with "r" (return)

When you use "s" to step into subroutines, you will often find yourself trapped in a subroutine. You have examined the code that you're interested in, but now you have to step through a lot of uninteresting code in the subroutine.

In this situation, what you'd like to be able to do is just to skip ahead to the end of the subroutine. That is, you want to do something like the "c" ("continue") command does, but you want just to continue to the end of the subroutine, and then resume your stepping through the code.

You can do it. The command to do it is "r" (for "return" or, better, "continue until return"). If you are in a subroutine and you enter the "r" command at the (Pdb) prompt, pdb will continue executing until the end of the subroutine. At that point -- the point when it is ready to return to the calling routine -- it will stop and show the (Pdb) prompt again, and you can resume stepping through your code.

You can do anything at all at the (Pdb) prompt ...

Sometimes you will be in the following situation -- You think you've discovered the problem. The statement that was assigning a value of, say, "aaa" to variable var1 was wrong, and was causing your program to blow up. It should have been assigning the value "bbb" to var1.

... at least, you're pretty sure that was the problem...

What you'd really like to be able to do, now that you've located the problem, is to assign "bbb" to var1, and see if your program now runs to completion without bombing.

It can be done!

One of the nice things about the (Pdb) prompt is that you can do anything at it -- you can enter any command that you like at the (Pdb) prompt. So you can, for instance, enter this command at the (Pdb) prompt.

               (Pdb) var1 = "bbb"

You can then continue to step through the program. Or you could be adventurous -- use "c" to turn off debugging, and see if your program will end without bombing!

... but be a little careful! 1

Since you can do anything at all at the (Pdb) prompt, you might decide to try setting the variable b to a new value, say "BBB", this way:

               (Pdb) b = "BBB"

If you do, pdb produces a strange error message about being unable to find an object named '= "BBB" '. Why???

What happens is that pdb attempts to execute the pdb b command for setting and listing breakpoints (a command that we haven't discussed). It interprets the rest of the line as an argument to the b command, and can't find the object that (it thinks) is being referred to. So it produces an error message.

So how can we assign a new value to b? The trick is to start the command with an exclamation point (!).

               (Pdb)!b = "BBB"

An exclamation point tells pdb that what follows is a Python statement, not a pdb command.

	13.2
```

[^py-pdb]: pdb — The Python Debugger (Python 3 docs)
[^py3-whatsnew]: What's New In Python 3.0
