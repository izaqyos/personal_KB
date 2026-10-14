---
type: reference
title: regex
description: Subsection 1.17 of my Tutorial.
tags: [kb-nodejs, node, npm, package-json, list, dependencies, dependency, tree, show, outdated, latest, version, leading, modules, and, packages, express, framework, tutorial, lodash, multer, upload, nodejs, unzipper, module, description, use, cases, code, examples]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "nodejs-kb#1.17"
---

# 1.17 regex

[↑ my Tutorial](/kb-nodejs/01-my-tutorial/README.md)

### 1.17.1 https://www.w3schools.com/js/js_regexp.asp

```text
What Is a Regular Expression?
A regular expression is a sequence of characters that forms a search pattern.

When you search for data in a text, you can use this search pattern to describe what you are searching for.

A regular expression can be a single character, or a more complicated pattern.

Regular expressions can be used to perform all types of text search and text replace operations.

Syntax
/pattern/modifiers;
Example
var patt = /w3schools/i;
Example explained:

/w3schools/i  is a regular expression.

w3schools  is a pattern (to be used in a search).

i  is a modifier (modifies the search to be case-insensitive).

Using String Methods
In JavaScript, regular expressions are often used with the two string methods: search() and replace().

The search() method uses an expression to search for a match, and returns the position of the match.

The replace() method returns a modified string where the pattern is replaced.

Using String search() With a String
The search() method searches a string for a specified value and returns the position of the match:

Example
Use a string to do a search for "W3schools" in a string:

var str = "Visit W3Schools!";
var n = str.search("W3Schools");
Try it Yourself »
Using String search() With a Regular Expression
Example
Use a regular expression to do a case-insensitive search for "w3schools" in a string:

var str = "Visit W3Schools";
var n = str.search(/w3schools/i);
The result in n will be:

6
Try it Yourself »

Using String replace() With a String
The replace() method replaces a specified value with another value in a string:

var str = "Visit Microsoft!";
var res = str.replace("Microsoft", "W3Schools");
Try it Yourself »
Use String replace() With a Regular Expression
Example
Use a case insensitive regular expression to replace Microsoft with W3Schools in a string:

var str = "Visit Microsoft!";
var res = str.replace(/microsoft/i, "W3Schools");
The result in res will be:

Visit W3Schools!
Try it Yourself »
Did You Notice?
Regular expression arguments (instead of string arguments) can be used in the methods above.
Regular expressions can make your search much more powerful (case insensitive for example).

Regular Expression Modifiers
Modifiers can be used to perform case-insensitive more global searches:

Modifier	Description	Try it
i	Perform case-insensitive matching	Try it »
g	Perform a global match (find all matches rather than stopping after the first match)	Try it »
m	Perform multiline matching	Try it »
Regular Expression Patterns
Brackets are used to find a range of characters:

Expression	Description	Try it
[abc]	Find any of the characters between the brackets	Try it »
[0-9]	Find any of the digits between the brackets	Try it »
(x|y)	Find any of the alternatives separated with |	Try it »
Metacharacters are characters with a special meaning:

Metacharacter	Description	Try it
\d	Find a digit	Try it »
\s	Find a whitespace character	Try it »
\b	Find a match at the beginning or at the end of a word	Try it »
\uxxxx	Find the Unicode character specified by the hexadecimal number xxxx	Try it »
Quantifiers define quantities:

Quantifier	Description	Try it
n+	Matches any string that contains at least one nTry it »
n*	Matches any string that contains zero or more occurrences of nTry it »
n?	Matches any string that contains zero or one occurrences of nTry it »
Using the RegExp Object
In JavaScript, the RegExp object is a regular expression object with predefined properties and methods.

Using test()
The test() method is a RegExp expression method.

It searches a string for a pattern, and returns true or false, depending on the result.

The following example searches a string for the character "e":

Example
var patt = /e/;
patt.test("The best things in life are free!");
Since there is an "e" in the string, the output of the code above will be:

true
Try it Yourself »
You don't have to put the regular expression in a variable first. The two lines above can be shortened to one:

/e/.test("The best things in life are free!");
Using exec()
The exec() method is a RegExp expression method.

It searches a string for a specified pattern, and returns the found text as an object.

If no match is found, it returns an empty (null) object.

The following example searches a string for the character "e":

Example 1
/e/.exec("The best things in life are free!");
```

### 1.17.2 My examples

```text
node
> var re2 = new RegExp("^[\\w/]+$");
> > re2.test('hello\\')
false
> re2.test('hello/')
true
> re2.test('hello')
true
        1.17.3
```
