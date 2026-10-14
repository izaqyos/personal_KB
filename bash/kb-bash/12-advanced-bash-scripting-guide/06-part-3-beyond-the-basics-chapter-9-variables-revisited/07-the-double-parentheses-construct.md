---
type: reference
title: The Double Parentheses Construct
description: Subsection 12.6.7 of Part 3. Beyond the Basics. Chapter 9. Variables Revisited.
tags: [kb-bash, xargs, examples]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "bash/KB_bash#12.6.7"
---

# 12.6.7 The Double Parentheses Construct

[↑ Part 3. Beyond the Basics. Chapter 9. Variables Revisited](/bash/kb-bash/12-advanced-bash-scripting-guide/06-part-3-beyond-the-basics-chapter-9-variables-revisited/README.md)

```text
Similar to the let command, the (( ... )) construct permits arithmetic expansion and evaluation. In its simplest form, a=$(( 5 + 3 )) would set a to 5 + 3, or 8. However, this double parentheses construct is also a mechanism for allowing C-style manipulation of variables in Bash, for example, (( var++ )).

Example 9-33. C-style manipulation of variables

#!/bin/bash
# Manipulating a variable, C-style, using the ((...)) construct.


echo

(( a = 23 ))  #  Setting a value, C-style,
              #+ with spaces on both sides of the "=".
echo "a (initial value) = $a"

(( a++ ))     #  Post-increment 'a', C-style.
echo "a (after a++) = $a"

(( a-- ))     #  Post-decrement 'a', C-style.
echo "a (after a--) = $a"


(( ++a ))     #  Pre-increment 'a', C-style.
echo "a (after ++a) = $a"

(( --a ))     #  Pre-decrement 'a', C-style.
echo "a (after --a) = $a"

echo

########################################################
#  Note that, as in C, pre- and post-decrement operators
#+ have slightly different side-effects.

n=1; let --n && echo "True" || echo "False"  # False
n=1; let n-- && echo "True" || echo "False"  # True

#  Thanks, Jeroen Domburg.
########################################################

echo

(( t = a<45?7:11 ))   # C-style trinary operator.
#       ^  ^ ^
echo "If a < 45, then t = 7, else t = 11."
echo "t = $t "        # Yes!

echo


# -----------------
# Easter Egg alert!
# -----------------
#  Chet Ramey seems to have snuck a bunch of undocumented C-style
#+ constructs into Bash (actually adapted from ksh, pretty much).
#  In the Bash docs, Ramey calls ((...)) shell arithmetic,
#+ but it goes far beyond that.
#  Sorry, Chet, the secret is now out.

# See also "for" and "while" loops using the ((...)) construct.

# These work only with Bash, version 2.04 or later.

exit 0
```
