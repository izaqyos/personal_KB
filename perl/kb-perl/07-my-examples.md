---
type: reference
title: My examples
description: "Personal Perl examples: printing fields from matching lines, looping and non-greedy regex."
tags: [perl, regex, examples, one-liners, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "perl/KB_perl#7"
---

# My examples

[↑ KB_perl](/perl/kb-perl/README.md)

## 7.1 Print all fields in file lines that match a pattern

```text
print digit fields
perl -n -e'/test(\d+)/ && print $1'
```

## 7.2 Looping

### 7.2.1 looping over an array

```text
foreach (@Array)
{
      SubRoutine($_);
}
Implementation 2

while($Element=shift(@Array))
{
      SubRoutine($Element);
}
Implementation 3

while(scalar(@Array) !=0)
{
      $Element=shift(@Array);
      SubRoutine($Element);
}
Implementation 4

for my $i (0 .. $#Array)
{
      SubRoutine($Array[$i]);
}
Implementation 5

map { SubRoutine($_) } @Array ;
```

## 7.3 regexp

### 7.3.1 non greedy match - .*?

```text
		7.3.2
```

## 7.4 Filter user names from file, sort and uniq them

```text
[employer-specific content moved to private KB, 2026-10]
```

## 7.5 DNS query host address

```text
[employer-specific content moved to private KB, 2026-10]
```

## 7.6 replace last line matching pattern

```text
$ ed temp
temp: No such file or directory
a
a
b
c
a
b
.
w
10
q
$  perl -e '@a=reverse<>;END{for(@a){if(/a/){s/a/c/;last}}print reverse @a}' temp
a
b
c
c
b
$  perl -e '@a=reverse<>;END{for(@a){if(/a/){s/a/c/;last}}print reverse @a}' temp
$  perl -i.bak -e '@a=reverse<>;END{for(@a){if(/a/){s/a/c/;last}}print reverse @a}' temp
a
b
c
c
b
$ cat temp.bak 
a
b
c
a
b
```
