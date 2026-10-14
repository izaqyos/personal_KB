---
type: reference
title: "Printing, IO, write, read"
description: "C/C++ printf quick reference: flags, field width, precision, length and conversion specifiers."
tags: [cpp, c, legacy, cheatsheet, reference]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-cpp#3"
---

# Printing, IO, write, read

[↑ kb-cpp](/kb-cpp/README.md)

## 3.1 printf quick ref

```text
  %[flags][min field width][precision][length]conversion specifier
  -----  ---------------  ---------  ------ -------------------
   \             #          .#         /             \
    \                                 /               \
   #,0,-,+, ,',I                 hh,h,l,ll,j,z,L    c,d,u,x,X,e,f,g,s,p,%
   -------------                 ---------------    -----------------------
   # | Alternate,                 hh | char,           c | unsigned char,
   0 | zero pad,                   h | short,          d | signed int,
   - | left align,                 l | long,           u | unsigned int,
   + | explicit + - sign,         ll | long long,      x | unsigned hex int,
     | space for + sign,           j | [u]intmax_t,    X | unsigned HEX int,
   ' | locale thousands grouping,  z | size_t,         e | [-]d.dddeÂ±dd double,
   I | Use locale's alt digits     t | ptrdiff_t,      E | [-]d.dddEÂ±dd double,
                                   L | long double,  ---------=====
   if no precision   => 6 decimal places            /  f | [-]d.ddd double,
   if precision = 0  => 0 decimal places      _____/   g | e|f as appropriate,
   if precision = #  => # decimal places               G | E|F as appropriate,
   if flag = #       => always show decimal point      s | string,
                                             ..............------
                                            /          p | pointer,
   if precision      => max field width    /           % | %

   Examples of common combinations:
format	output
printf("%08X",32_bit_var);	ABCD1234
printf("%lu",32_bit_var);	2882343476
printf("%'d",32_bit_var);	-1,412,623,820
printf("%10s","string");	string
printf("%-10s","string");	string
printf("%-10.10s","truncateiftoolong");	truncateif

Note for the %'d one to work you must have already set your locale as in the following example:

#include <locale.h>
#include <stdio.h>

int main(void)
{
    setlocale(LC_ALL,"");
    printf("%'Id\n",1234);
}

$ ./numtest
1,234

$ LANG=fa_IR.utf8 ./numtest

Note also if one is using the C99 integer types that guarantee a specific number of bits,
then you must use the corresponding conversion specifier for portability.
This can be seen in the use of PRIu32 in the example below:

#include <inttypes.h>
#include <stdio.h>

int main(void)
{
    uint32_t ui=1234;
    printf("%"PRIu32"\n",ui);
}
```

### 3.1.1 print size_t

```text
%zu

ex:
printf("Length: %d \n", (unsigned int)MyStrlen(str));
is ok; %d expects an int argument, but it's guaranteed that int and unsigned int have the same representation for values that are in the range of both. This:

printf("Length: %u\n", (unsigned int)MyStrlen(str));
is better, since %u expects an unsigned int argument.

The correct format for size_t is "%zu":

printf("Length: %zu\n", MyStrlen(str));
but this is a "new" feature in C99, and there are likely still some implementations that don't support it. (In particular, Microsoft has been very slow to support C99.) For maximum portability (assuming your string is less that 232-1 bytes long) you can use this:

printf("Length: %lu\n", (unsigned long)MyStrlen(str));
This answers the question you asked about printf; pb2q ably diagnosed the actual cause of the problem you're seeing (and beat me to it!).

		3.1.2

	3.2 Printing a hex dump of a buffer (or print char * hex buffer)
```

### 3.2.1 Crude solution

```text
void dumpbuff(char *buff, int N)
{
int i;

for(i=0;i<N;i+=16
if(i + 16 <= N)
printline(data+i, 16);
else
printline(data+1, N - i);
}

void printline(char *data, int N)
{
int i;

for(i=0;i<N;i++)
printf("%02x ", data[i]):
printf(" ");
for(i=0;i<N;i++)
if(isgraph((unsigned) data[i]))
printf("%c", data[i]);
else
printf(".");
printf("\n");
}
```

### 3.2.2 Somewhat nicer print

```text
void dump_buffer(unsigned n, const unsigned char* buf)
{
int on_this_line = 0;
while (n-- 0) {
	fprintf(stderr, "%02X ", *buf++);
	on_this_line += 1;
	if (on_this_line == 16 || n == 0) {
		int i;
		fputs(" ", stderr);
		for (i = on_this_line; i < 16; i++)
			fputs(" ", stderr);
		for (i = on_this_line; i 0; i--)
			fputc(isprint(buf[-i]) ? buf[-i] : '.', stderr);
		fputs("\n", stderr);
		on_this_line = 0;
		}
	}
}
```
