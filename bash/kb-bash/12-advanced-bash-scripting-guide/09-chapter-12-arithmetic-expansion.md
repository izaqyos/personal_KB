---
type: reference
title: Chapter 12. Arithmetic Expansion
description: Subsection 12.9 of Advanced Bash-Scripting Guide.
tags: [kb-bash, xargs, examples]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "bash/KB_bash#12.9"
---

# 12.9 Chapter 12. Arithmetic Expansion

[↑ Advanced Bash-Scripting Guide](/bash/kb-bash/12-advanced-bash-scripting-guide/README.md)

```text
Arithmetic expansion provides a powerful tool for performing (integer) arithmetic operations in scripts. Translating a string into a numerical expression is relatively straightforward using backticks, double parentheses, or let.

Variations

Arithmetic expansion with backticks (often used in conjunction with expr)

    z=`expr $z + 3`          # The 'expr' command performs the expansion.

Arithmetic expansion with double parentheses, and using let

    The use of backticks (backquotes) in arithmetic expansion has been superseded by double parentheses -- ((...)) and $((...)) -- and also by the very convenient let construction.

    z=$(($z+3))
    z=$((z+3))                                  #  Also correct.
                                                #  Within double parentheses,
                                                #+ parameter dereferencing
                                                #+ is optional.

    # $((EXPRESSION)) is arithmetic expansion.  #  Not to be confused with
                                                #+ command substitution.



    # You may also use operations within double parentheses without assignment.

      n=0
      echo "n = $n"                             # n = 0

      (( n += 1 ))                              # Increment.
    # (( $n += 1 )) is incorrect!
      echo "n = $n"                             # n = 1


    let z=z+3
    let "z += 3"  #  Quotes permit the use of spaces in variable assignment.
                  #  The 'let' operator actually performs arithmetic evaluation,
                  #+ rather than expansion.
```
