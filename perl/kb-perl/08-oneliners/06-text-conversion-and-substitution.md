---
type: cheatsheet
title: Text Conversion and Substitution
description: Subsection 8.6 of Oneliners.
tags: [kb-perl]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "perl/KB_perl#8.6"
---

# 8.6 Text Conversion and Substitution

[↑ Oneliners](/perl/kb-perl/08-oneliners/README.md)

```text
		In this chapter, we’ll look at various one-liners that change, convert, and substitute text, including base64 encoding and decoding, URL escaping and unescaping, HTML escaping and unescaping, converting text case, and reversing lines. You’ll also get to know the y, tr, uc, lc, and reverse operators and string-escape sequences.
```

### 8.6.1 ROT13 a string

```text
perl -le '$string = "bananas"; $string =~ y/A-Za-z/N-ZA-Mn-za-m/; print $string'

This one-liner uses the y operator (also known as the tr operator) to do ROT13. The operators y and tr perform string transliteration. Given y/search/replace/, the y operator transliterates all occurrences of the characters found in the search list with the characters in the corresponding positions in the replace list. The y and tr operators are often mistaken for taking a regular expression, but they don’t. They transliterate things and take a list of characters in both the search and replace parts.

In this one-liner, A-Za-z creates the following list of characters:

ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz

And N-ZA-Mn-za-m creates this list:

NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm

Notice that in the second list the uppercase and lowercase alphabets are offset by 13 characters. Now the y operator translates each character in the first list to a character in the second list, thus performing the ROT13 operation. (One fun fact about ROT13 is that applying it twice produces the same string; that is, ROT13(ROT13(string)) equals string.)

To ROT13 the whole file bananas.txt and print it to the screen, just do this:

perl -lpe 'y/A-Za-z/N-ZA-Mn-za-m/' bananas.txt

You can also use Perl’s -i argument to do in-place replacement of the file. For example, to ROT13 oranges.txt in-place, write this:

perl -pi.bak -e 'y/A-Za-z/N-ZA-Mn-za-m/' oranges.txt

This one-liner first creates a backup file called oranges.txt.bak and then replaces the contents of oranges.txt with ROT13-ed text. The .bak part of the -i command creates the backup file. You can omit the .bak part of the command if you’re sure about the result, but I recommend always using -i.bak because one day you might make a mistake and mess up an important file. (I speak from experience.)

$ echo "abcd" | perl -lne '$s=$_; $s=~ y/A-Za-z/N-ZA-Mn-za-m/; print $s'
nopq
```

### 8.6.2 Base64-encode a string

```text
perl -MMIME::Base64 -e 'print encode_base64("string")'

This one-liner uses the MIME::Base64 module. It exports the encode_base64 function, which takes a string and returns a base64-encoded version of it.

To base64-encode the whole file, use this:

perl -MMIME::Base64 -0777 -ne 'print encode_base64($_)' file

Here, the -0777 argument together with -n causes Perl to slurp the whole file into the $_ variable. Next, the file is base64-encoded and printed. (If Perl didn’t slurp the entire file, it would be encoded line by line, and you’d end up with a mess.)
```

### 8.6.3 Base64-decode a string

```text
perl -MMIME::Base64 -le 'print decode_base64("base64string")'

The MIME::Base64 module also exports the decode_base64 function, which takes a base64-encoded string and decodes it.

The entire file can be decoded similarly with

perl -MMIME::Base64 -0777 -ne 'print decode_base64($_)' file
```

### 8.6.4 URL-escape a string

```text
perl -MURI::Escape -le 'print uri_escape("http://example.com")'

To use this one-liner, you need to install the URI::Escape module first by entering cpan URI::Escape in the shell. The module exports two functions: uri_escape and uri_unescape. The first function performs URL escaping (sometimes referred to as URL encoding), and the other does URL unescaping (or URL decoding). Now, to URL-escape a string, just call uri_escape($string) and you’re done!

The output of this one-liner is http%3A%2F%2Fexample.com.
```

### 8.6.5 URL-unescape a string

```text
perl -MURI::Escape -le 'print uri_unescape("http%3A%2F%2Fexample.com")'

This one-liner uses the uri_unescape function from the URI::Escape module to perform URL unescaping. It unescapes the output of the previous one-liner to reverse the operation.

The output of this one-liner is http://example.com.
```

### 8.6.6 HTML-encode a string

```text
perl -MHTML::Entities -le 'print encode_entities("<html>")'

This one-liner uses the encode_entities function from the HTML::Entities module to encode HTML entities. For example, you can turn < and > into &lt; and &gt;.
```

### 8.6.7 HTML-decode a string

```text
perl -MHTML::Entities -le 'print decode_entities("&lt;html&gt;")'

This one-liner uses the decode_entities function from the HTML::Entities module. For example, you can turn &lt; and &gt; back into < and >.
```

### 8.6.8 HTML-decode a string

```text
perl -MHTML::Entities -le 'print decode_entities("&lt;html&gt;")'

This one-liner uses the decode_entities function from the HTML::Entities module. For example, you can turn &lt; and &gt; back into < and >.
```

### 8.6.9 Convert all text to uppercase

```text
perl -nle 'print uc'

This one-liner uses the uc function, which, by default, operates on the $_ variable and returns an uppercase version of the text it contains.

You could do the same thing with the -p command-line option, which enables the automatic printing of the $_ variable and modifies it in-place:

perl -ple '$_ = uc'

Or you can apply the \U escape sequence to string interpolation:

perl -nle 'print "\U$_"'

This one-liner uppercases everything that follows it (or everything up to the first occurrence of \E).

$ echo "abcd" | perl -lne 'print uc'
ABCD
```

### 8.6.10 Convert all text to lowercase

```text
perl -nle 'print lc'

This one-liner is similar to the previous one. The lc function converts the contents of $_ to lowercase.

You could also use the escape sequence \L and string interpolation:

perl -nle 'print "\L$_"'

Here, \L lowercases everything after it (or until the first instance of \E).
```

### 8.6.11 Uppercase only the first letter of each line

```text
perl -nle 'print ucfirst lc'

This one-liner first lowercases the input with the lc function and then uses ucfirst to uppercase only the first character. For example, if you pass it a line that says foo bar baz, it produces the text Foo bar baz. Similarly, if you pass it a line FOO BAR BAZ, it lowercases the line first and then uppercases the first letter, producing Foo bar baz again.

You can do the same thing using escape codes and string interpolation:

perl -nle 'print "\u\L$_"'

First \L lowercases the whole line and then \u uppercases the first character.
```

### 8.6.12 Invert the letter case

```text
perl -ple 'y/A-Za-z/a-zA-Z/'

This one-liner changes the case of the letters: The capital letters become lowercase letters, and the lowercase letters become capital letters. For example, the text Cows are COOL becomes cOWS ARE cool. The transliteration operator y (explained in one-liner 6.1 on page 59) creates a mapping from capital letters A-Z to lowercase letters a-z and a mapping from lowercase letters a-z to capital letters A-Z.
```

### 8.6.13 Title-case each line

```text
perl -ple 's/(\w+)/\u$1/g'

This one-liner attempts to title-case a string, meaning the first letter of each word is uppercased; for example, This Text Is Written In Title Case. This one-liner works by matching every word with \w+ and replacing the matched word with \u$1, which uppercases the first letter of the word.
```

### 8.6.14 Strip leading whitespace (spaces, tabs) from the beginning of each line

```text
perl -ple 's/^[ \t]+//'

This one-liner deletes all whitespace from the beginning of every line with the help of the substitution operator s. Given s/regex/replace/, it replaces the matched regex with the replace string. In this case, the regex is ^[ \t]+, which means “match one or more spaces or tabs at the beginning of the string,” and replace is empty, meaning “replace the matched part with an empty string.”

The regular expression class [ \t] can also be replaced by \s+ to match any whitespace (including tabs and spaces):

perl -ple 's/^\s+//'
```

### 8.6.15 Strip trailing whitespace (spaces, tabs) from the end of each line

```text
perl -ple 's/[ \t]+$//'

This one-liner deletes all whitespace from the end of each line. The regex of the s operator says “match one or more spaces or tabs at the end of the string.” The replace part is empty again, which means “erase the matched whitespace.”

You can also achieve the same by writing:

perl -ple 's/\s+$//'

Here, you replace with [ \t]+$ with \s+, as in one-liner 6.13.
```

### 8.6.16 Strip whitespace (spaces, tabs) from the beginning and end of each line

```text
perl -ple 's/^[ \t]+|[ \t]+$//g'

This one-liner combines one-liners 6.13 and 6.14. It specifies the global /g flag to the s operator because you want it to delete whitespace at the beginning and the end of the string. If you don’t specify this, it deletes whitespace only at the beginning (if there is whitespace) or only at the end (if there was no whitespace at the beginning).

You can also replace [ \t]+$ with \s+ and get the same results:

perl -ple 's/^\s+|\s+$//g'

Writing \s+ is shorter than writing [ \t]+. And s stands for space, which makes it easier to remember.
```

### 8.6.17 Convert UNIX newlines to DOS/Windows newlines

```text
perl -pe 's|\012|\015\012|'

This one-liner substitutes the UNIX newline character \012 (LF) for the Windows/DOS newline character \015\012 (CRLF) on each line. One nice feature of s/regex/replace/ is that it can take characters other than forward slashes as delimiters. Here, it uses vertical pipes to delimit regex from replace to improve readability.

Newlines are usually represented as \n and carriage returns as \r, but across platforms, the meanings of the \n and \r sequences can vary. The UNIX newline character, however, is always available as \012 (LF), and the carriage-return character represented by \r is always available as \015 (CR). That’s why you use those numeric codes: Sometimes using the flexible sequence is preferable, but not here.
```

### 8.6.18 Convert DOS/Windows newlines to UNIX newlines

```text
perl -pe 's|\015\012|\012|'

This one-liner works in the opposite direction from one-liner 6.16. It takes Windows newlines (CRLF) and converts them to UNIX newlines (LF).
```

### 8.6.19 Convert UNIX newlines to Mac newlines

```text
perl -pe 's|\012|\015|'

Mac OS previously used \015 (CR) as newlines. This one-liner converts UNIX’s \012 (LF) to Mac OS’s \015 (CR).
```

### 8.6.20 Substitute (find and replace) “foo” with “bar” on each line

```text
perl -pe 's/foo/bar/'

This one-liner uses the s/regex/replace/ command to substitute the first occurrence of foo with bar on each line.

To replace all foos with bars, add the global /g flag:

perl -pe 's/foo/bar/g'
```

### 8.6.21 Substitute (find and replace) “foo” with “bar” on lines that match “baz”

```text
perl -pe '/baz/ && s/foo/bar/'

This one-liner is roughly equivalent to

while (defined($line = <>)) {
  if ($line =~ /baz/) {
    $line =~ s/foo/bar/
  }
}

This expanded code puts each line into the variable $line and then checks to see if a line in that variable matches baz. If so, it replaces foo with bar in that line.

You could also write

perl -pe 's/foo/bar/ if /baz/'
```

### 8.6.22 Print paragraphs in reverse order

```text
perl -00 -e 'print reverse <>' file

This one-liner uses the -00 argument discussed in one-liner 2.7 (page 14) to turn paragraph slurp mode on, meaning that Perl reads text paragraph by paragraph, rather than line by line. Next, it uses the <> operator to make Perl read the input from either standard input or files specified as arguments. Here, I’ve specified file as the argument so Perl will read file paragraph by paragraph (thanks to -00). Once Perl finishes reading the file, it returns all paragraphs as a list and calls reverse to reverse the order of the paragraph list. Finally, print prints the list of reversed paragraphs.
```

### 8.6.23 Print all lines in reverse order

```text
perl -lne 'print scalar reverse $_'

This one-liner evaluates the reverse operator in the scalar context. In the previous one-liner, you saw that evaluating reverse in the list context reverses the whole list, that is, the order of the elements. To do the same for scalar values such as $_ that contain the whole line, you have to call reverse in the scalar context. Otherwise, it simply reverses a list with only one element, which is the same list! Once you’ve done that, you simply print the reversed line.

Often you can drop the $_ variable when using operators and Perl will still apply the function on the $_ variable. In other words, you can rewrite the same one-liner as

perl -lne 'print scalar reverse'

Or you can substitute -n for -p, modify the $_ variable, and set its value to reverse:

perl -lpe '$_ = reverse $_'

You can also write this as

perl -lpe '$_ = reverse'

Here, $_ is dropped because most Perl operators default to $_ when not given an argument.
```

### 8.6.24 Print columns in reverse order

```text
perl -alne 'print "@{[reverse @F]}"'

This one-liner reverses the order of columns in a file. The -a command-line argument splits each line into columns at spaces and puts them in the @F array, which is then reversed and printed. This one-liner is similar to one-liner 4.4 on page 32; I explained the @{[ ... ]} construct there. It simply lets you run code inside of double quotes. For example, given the following input file:

one two three four
five six seven eight

the one-liner reverses the order of the columns, and the output is the following:

four three two one
eight seven six five

If the columns in your input are separated by any character other than a space, you can use the -F command-line argument to set a different delimiter. For example, given the following input file:

one:two:three:four
five:six:seven:eight

you can add the -F: command-line argument to the one-liner like this:

perl -F: -alne 'print "@{[reverse @F]}"'

and it produces this output:

four three two one
eight seven six five

Notice, however, that the : characters are missing in this output. To get them back, you need to modify the one-liner a bit and set the $" variable to ":", as shown here:

perl -F: -alne '$" = ":"; print "@{[reverse @F]}"'

This produces the expected output:

four:three:two:one
eight:seven:six:five

The $" variable changes the character that’s printed between array elements when an array is interpolated within a double-quoted string.

			8.6.25
```
