---
type: reference
title: FAQS
description: Section 8 of the legacy c-kb notes.
tags: [kb-c]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "c-kb#8"
---

# FAQS

[↑ c-kb](/kb-c/README.md)

## 8.1 Compilation errors

### 8.1.1 UTF8 BOM, or stray error

```text
$ gcc average.c 
average.c:1: error: stray `\357' in program
average.c:1: error: stray `\273' in program
average.c:1: error: stray `\277' in program


To fix, remove BOM. A few recepies:
awk '{if(NR==1)sub(/^\xef\xbb\xbf/,"");print}' average.c  > average1.c

g++ -x c++ <(xxd -g 1 -s 3 test.cpp | xxd -g 1 -s -3 -r) -o a.out

sed -ie '1s/^\xef\xbb\xbf//' text.txt

utf8bom(1) - Linux man page

Name

utf8bom - handling Byte Order Mark for UTF-8 files.

Synopsis

utf8bom [options]

utf8bom -insert -dir /path/to/dir -recursive

utf8bom -strip -file /path/to/file
		8.1.2
```

## 8.2 Files

### 8.2.1 How can I get a file's size in C?

```text
-> My answer:
cat /cygdrive/c/work/code/C/calculateFileSize.c

/*
 * =====================================================================================
 *
 *       Filename:  calculateFileSize.c
 *
 *    Description:  
 *
 *        Version:  1.0
 *        Created:  12/18/11 11:40:23
 *       Revision:  none
 *       Compiler:  gcc
 *
 *         Author:  Yosi Izaq (), <email>
 *        Company:  <employer>
 *
 * =====================================================================================
 */
#include <stdio.h>
#include <sys/stat.h>

int main(void)
{

   FILE *fp;
   char filename[80];
   long length;

   printf("input file name:");
   gets(filename);
   fp=fopen(filename,"rb");

   if(fp==NULL) {
      printf("file not found!\n");
   }
   else {
      fseek(fp,0L,SEEK_END);
      length=ftell(fp);
      printf("the file's length using fseek is %1dB\n",length);
      fseek(fp,0L,SEEK_SET);
      fclose(fp);

	struct stat st;
	stat(filename, &st);
	unsigned int size = st.st_size;
       printf("the file's length using stat is %1dB\n",size);
   }

   return 0;
}


$ ./a.exe 
input file name:calculateFileSize.c
the file's length using fseek is 1029B
the file's length using stat is 1029B

-> You need to seek to the end of the file and then ask for the position:

fseek(fp, 0L, SEEK_END);
sz = ftell(fp);

You can then seek back to the beginning:

fseek(fp, 0L, SEEK_SET);

	
answered Oct 26 '08 at 20:57
Rob Walker
| 18.8k14179
	
25 	 
	
If you use ftell, then you must open the file in binary mode. If you open it in text mode, ftell only returns a "cookie" that is only usable by fseek. – camh Oct 27 '08 at 10:14
2 	 
	
@camh - Thanks man. This comment solved a problem I had with a file sizing algorithm. For the record, one opens a file in binary mode by putting a 'b' at the end of fopen's mode string. – T.E.D. May 18 '10 at 10:42
	
LOL, yeah right, Windows inherited this stupid text/binary mode nonsense from DOS. This is easily forgotten nowadays. Actually the POSIX standard even mandates that any POSIX system must be able to cope with the "b" flag in fopen calls (to be compatible with the C standard!), but on the same hand it mandates, that the implementation must ignore it entirely, since this flag has no effect on POSIX systems (those don't know any such thing as a text mode and always open in binary mode). – Mecki Sep 9 at 17:46
1 	 
	
Yo uh, use rewind before people forget what it means – bobobobo Sep 23 at 16:55

-> 
There are two basic methods:

fseek(f, 0, SEEK_END); // seek to end of file
size = ftell(f); // get current file pointer
fseek(f, 0, SEEK_SET); // seek back to beginning of file
// proceed with allocating memory and reading the file

Or, you can use stat, if you know the filename:

struct stat st;
stat(filename, &st);
size = st.st_size;

-> 
#include <stdio.h>

int main(void)
{

   FILE *fp;
   char filename[80];
   long length;

   printf("input file name:");
   gets(filename);
   fp=fopen(filename,"rb");

   if(fp==NULL) {
      printf("file not found!\n");
   }
   else {
      fseek(fp,OL,SEEK_END);
      length=ftell(fp);
      printf("the file's length is %1dB\n",length);
      fclose(fp);
   }

   return 0;
}

- 
```

### 8.2.2 Read from file

#### 8.2.2.1 Read from file line by line

```text
#define _GNU_SOURCE
   #include <stdio.h>
   #include <stdlib.h>

   int
   main(void)
   {
       FILE * fp;
       char * line = NULL;
       size_t len = 0;
       ssize_t read;

       fp = fopen("/etc/motd", "r");
       if (fp == NULL)
           exit(EXIT_FAILURE);

       while ((read = getline(&line, &len, fp)) != -1) {
           printf("Retrieved line of length %zu :\n", read);
           printf("%s", line);
       }

       fclose(fp);
       if (line)
           free(line);
       exit(EXIT_SUCCESS);
   }
```

### 8.2.3 Read from file char by char

```text
#include <stdio.h>
#include <stdlib.h>
 
int main()
{
   char ch, file_name[25];
   FILE *fp;
 
   printf("Enter the name of file you wish to see\n");
   gets(file_name);
 
   fp = fopen(file_name,"r"); // read mode
 
   if( fp == NULL )
   {
      perror("Error while opening the file.\n");
      exit(EXIT_FAILURE);
   }
 
   printf("The contents of %s file are :\n", file_name);
 
   while( ( ch = fgetc(fp) ) != EOF )
      printf("%c",ch);
 
   fclose(fp);
   return 0;
}
```

### 8.2.4 function <cstdio> fscanf

```text
int fscanf ( FILE * stream, const char * format, ... );
Read formatted data from stream
Reads data from the stream and stores them according to the parameter format into the locations pointed by the additional arguments.

The additional arguments should point to already allocated objects of the type specified by their corresponding format specifier within the format string.

Parameters
stream
Pointer to a FILE object that identifies the input stream to read data from.
format
C string that contains a sequence of characters that control how characters extracted from the stream are treated:
Whitespace character: the function will read and ignore any whitespace characters encountered before the next non-whitespace character (whitespace characters include spaces, newline and tab characters -- see isspace). A single whitespace in the format string validates any quantity of whitespace characters extracted from the stream (including none).
Non-whitespace character, except format specifier (%): Any character that is not either a whitespace character (blank, newline or tab) or part of a format specifier (which begin with a % character) causes the function to read the next character from the stream, compare it to this non-whitespace character and if it matches, it is discarded and the function continues with the next character of format. If the character does not match, the function fails, returning and leaving subsequent characters of the stream unread.
Format specifiers: A sequence formed by an initial percentage sign (%) indicates a format specifier, which is used to specify the type and format of the data to be retrieved from the stream and stored into the locations pointed by the additional arguments.

A format specifier for fscanf follows this prototype:

%[*][width][length]specifier 

Where the specifier character at the end is the most significant component, since it defines which characters are extracted, their interpretation and the type of its corresponding argument:
specifier	Description	Characters extracted
i, u	Integer	Any number of digits, optionally preceded by a sign (+ or -).
Decimal digits assumed by default (0-9), but a 0 prefix introduces octal digits (0-7), and 0x hexadecimal digits (0-f).
d	Decimal integer	Any number of decimal digits (0-9), optionally preceded by a sign (+ or -).
o	Octal integer	Any number of octal digits (0-7), optionally preceded by a sign (+ or -).
x	Hexadecimal integer	Any number of hexadecimal digits (0-9, a-f, A-F), optionally preceded by 0x or 0X, and all optionally preceded by a sign (+ or -).
f, e, g	Floating point number	A series of decimal digits, optionally containing a decimal point, optionally preceeded by a sign (+ or -) and optionally followed by the e or E character and a decimal integer (or some of the other sequences supported by strtod).
Implementations complying with C99 also support hexadecimal floating-point format when preceded by 0x or 0X.
a
c	Character	The next character. If a width other than 1 is specified, the function reads exactly width characters and stores them in the successive locations of the array passed as argument. No null character is appended at the end.
s	String of characters	Any number of non-whitespace characters, stopping at the first whitespace character found. A terminating null character is automatically added at the end of the stored sequence.
p	Pointer address	A sequence of characters representing a pointer. The particular format used depends on the system and library implementation, but it is the same as the one used to format %p in fprintf.
[characters]	Scanset	Any number of the characters specified between the brackets.
A dash (-) that is not the first character may produce non-portable behavior in some library implementations.
[^characters]	Negated scanset	Any number of characters none of them specified as characters between the brackets.
n	Count	No input is consumed.
The number of characters read so far from stream is stored in the pointed location.
%	%	A % followed by another % matches a single %.
Except for n, at least one character shall be consumed by any specifier. Otherwise the match fails, and the scan ends there.

The format specifier can also contain sub-specifiers: asterisk (*), width and length (in that order), which are optional and follow these specifications:
sub-specifier	description
*	An optional starting asterisk indicates that the data is to be read from the stream but ignored (i.e. it is not stored in the location pointed by an argument).
width	Specifies the maximum number of characters to be read in the current reading operation (optional).
length	One of hh, h, l, ll, j, z, t, L (optional).
This alters the expected type of the storage pointed by the corresponding argument (see below).

This is a chart showing the types expected for the corresponding arguments where input is stored (both with and without a length sub-specifier):
specifiers
length	d i	u o x	f e g a	c s [] [^]	p	n
(none)	int*	unsigned int*	float*	char*	void**	int*
hh	signed char*	unsigned char*				signed char*
h	short int*	unsigned short int*				short int*
l	long int*	unsigned long int*	double*	wchar_t*		long int*
ll	long long int*	unsigned long long int*				long long int*
j	intmax_t*	uintmax_t*				intmax_t*
z	size_t*	size_t*				size_t*
t	ptrdiff_t*	ptrdiff_t*				ptrdiff_t*
L			long double*			
Note: Yellow rows indicate specifiers and sub-specifiers introduced by C99.
... (additional arguments)
Depending on the format string, the function may expect a sequence of additional arguments, each containing a pointer to allocated storage where the interpretation of the extracted characters is stored with the appropriate type.
There should be at least as many of these arguments as the number of values stored by the format specifiers. Additional arguments are ignored by the function.
These arguments are expected to be pointers: to store the result of a fscanf operation on a regular variable, its name should be preceded by the reference operator (&) (see example).

Return Value
On success, the function returns the number of items of the argument list successfully filled. This count can match the expected number of items or be less (even zero) due to a matching failure, a reading error, or the reach of the end-of-file.

If a reading error happens or the end-of-file is reached while reading, the proper indicator is set (feof or ferror). And, if either happens before any data could be successfully read, EOF is returned.

If an encoding error happens interpreting wide characters, the function sets errno to EILSEQ.

Example
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
/* fscanf example */
#include <stdio.h>

int main ()
{
  char str [80];
  float f;
  FILE * pFile;

  pFile = fopen ("myfile.txt","w+");
  fprintf (pFile, "%f %s", 3.1416, "PI");
  rewind (pFile);
  fscanf (pFile, "%f", &f);
  fscanf (pFile, "%s", str);
  fclose (pFile);
  printf ("I have read: %f and %s \n",f,str);
  return 0;
}
Edit & Run


This sample code creates a file called myfile.txt and writes a float number and a string to it. Then, the stream is rewinded and both values are read with fscanf. It finally produces an output similar to:
I have read: 3.141600 and PI

Compatibility
Particular library implementations may support additional specifiers and sub-specifiers.
Those listed here are supported by the latest C and C++ standards (both published in 2011), but those in yellow were introduced by C99 (only required for C++ implementations since C++11), and may not be supported by libraries that comply with older standards.

See also
scanf
Read formatted data from stdin (function )
fprintf
Write formatted data to stream (function )
fread
Read block of data from stream (function )
fgets
Get string from stream (function )
```

## 8.3 List & calculate size of files in given directory

```text
/*
 * =====================================================================================
 *
 *       Filename:  glob_ex.c
 *
 *    Description:  
 *
 *        Version:  1.0
 *        Created:  02/23/12 16:10:26
 *       Revision:  none
 *       Compiler:  gcc
 *
 *         Author:  Yosi Izaq (), <email>
 *        Company:  <employer>
 *
 * =====================================================================================
 */
#include <dirent.h>
#include <stdio.h>
#include <string.h>
#include <sys/stat.h>
#include <inttypes.h>

  typedef unsigned long long	uint64_t;

int  main()
{
	DIR *dir;
	struct dirent *ent;
	dir = opendir (".");
	if (dir != NULL) {

	  /* print all the files and directories within directory */
	  while ((ent = readdir (dir)) != NULL) {
	    printf ("%s: len %d, type: %s.\n", ent->d_name, strlen(ent->d_name) , (ent->d_name+strlen(ent->d_name) -3)  );
	    if (!strcmp ((const char *)( ent->d_name+strlen(ent->d_name) -3) , "txt") )
	    {
		    int result = 0;
		    struct stat64 statbuff;
		    result = stat64 (ent->d_name, &statbuff);
		    uint64_t size = statbuff.st_size;

		    printf("Found txt file. Size: %llu \n",size); 
	    }

	  }
	  closedir (dir);
	} else {
	  /* could not open directory */
	  perror ("");
	  return 1;
	}

	return 0;
} 

		8.3.1 
```

## 8.4 pointers to pointers

### 8.4.1 Use cases

```text
Functions that modify a pointer parameter. Ex: allocate memory and return pointer to newly allocated memory.
Pass pointer to string (char * in native C)

		8.4.2

	8.5
```
