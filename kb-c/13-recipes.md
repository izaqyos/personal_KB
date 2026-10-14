---
type: reference
title: Recipes
description: "C recipes, such as setting a marker file to detect process shutdown."
tags: [c, legacy, examples, howto, unix]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "c-kb#13"
---

# Recipes

[↑ c-kb](/kb-c/README.md)

## 13.1 Files

### 13.1.1 Setup a marker file to indicate Process was shutdown rather than crashed

```text
/*
 * =====================================================================================
 *
 *       Filename:  ProcShutDownMarkerFile.c
 *
 *    Description:  Setup a marker file to indicate Process was shutdown rather than crashed
 *
 *        Version:  1.0
 *        Created:  01/07/2014 10:55:40
 *       Revision:  none
 *       Compiler:  gcc
 *
 *         Author:  Yosi Izaq
 *   Organization:  
 *
 * =====================================================================================
 */
#include <stdlib.h>
#include <string.h>
#include <errno.h>
#include <stdio.h>
#include <sys/stat.h>
#include <time.h>
#include <unistd.h>

/* 
 * ===  FUNCTION  ======================================================================
 *         Name:  main
 *  Description:  
 * =====================================================================================
 */
	int
main ( int argc, char *argv[] )
{
        time_t rawtime;
        struct tm * p_timeinfo;
	FILE	*p_marker;										/* input-file pointer */
	char	*p_marker_file_name = ".lwsmd_maker";		/* input-file name    */

	struct stat   stat_buffer;   
	if (stat (p_marker_file_name , &stat_buffer) )
	{
		printf(" Marker file %s doesn't exist. Process was shutdown correctly. Creting now... \n ", p_marker_file_name);

	        p_marker	= fopen( p_marker_file_name, "a+" );
	        if ( p_marker == NULL ) {
	        	fprintf ( stderr, "couldn't open file '%s'; %s\n", p_marker_file_name, strerror(errno) );
	        	exit (EXIT_FAILURE);
	        }
	        if( fclose(p_marker) == EOF ) {			/* close input file   */ fprintf ( stderr, "couldn't close file '%s'; %s\n", p_marker_file_name, strerror(errno) );
	        	exit (EXIT_FAILURE);
	        }
	}
	else
	{
		printf(" Marker file %s exist. Process was not shutdown correctly!  \n ", p_marker_file_name);
	}


	for (int i=20; i>0; --i) // 20 sec
	{
		time ( &rawtime );
                p_timeinfo = localtime ( &rawtime );
		printf(" Simulate daemon, time - %s\n ", asctime(p_timeinfo));
		sleep(1);

	}

	//proper shutdown, delete marker
	if( remove( p_marker_file_name) != 0 ) perror( "Error deleting marker file" );
	else printf( "Marker file successfully deleted\n" );

	return EXIT_SUCCESS;
}				/* ----------  end of function main  ---------- */

- Run example:
$ a.out 
 Marker file .lwsmd_maker doesn't exist. Process was shutdown correctly. Creting now... 
  Simulate daemon, time - Tue Jan  7 12:31:16 2014

  Simulate daemon, time - Tue Jan  7 12:31:17 2014

  Simulate daemon, time - Tue Jan  7 12:31:18 2014

  Simulate daemon, time - Tue Jan  7 12:31:19 2014

  Simulate daemon, time - Tue Jan  7 12:31:20 2014

  Simulate daemon, time - Tue Jan  7 12:31:21 2014

  Simulate daemon, time - Tue Jan  7 12:31:22 2014

  Simulate daemon, time - Tue Jan  7 12:31:23 2014

  Simulate daemon, time - Tue Jan  7 12:31:24 2014

  Simulate daemon, time - Tue Jan  7 12:31:25 2014

  Simulate daemon, time - Tue Jan  7 12:31:26 2014

  Simulate daemon, time - Tue Jan  7 12:31:27 2014

  Simulate daemon, time - Tue Jan  7 12:31:28 2014

  Simulate daemon, time - Tue Jan  7 12:31:29 2014

  Simulate daemon, time - Tue Jan  7 12:31:30 2014

  Simulate daemon, time - Tue Jan  7 12:31:31 2014

  Simulate daemon, time - Tue Jan  7 12:31:32 2014

  Simulate daemon, time - Tue Jan  7 12:31:33 2014

  Simulate daemon, time - Tue Jan  7 12:31:34 2014

  Simulate daemon, time - Tue Jan  7 12:31:35 2014

 Marker file successfully deleted
$ a.out 
 Marker file .lwsmd_maker doesn't exist. Process was shutdown correctly. Creting now... 
  Simulate daemon, time - Tue Jan  7 12:31:40 2014

  Simulate daemon, time - Tue Jan  7 12:31:41 2014

  Simulate daemon, time - Tue Jan  7 12:31:42 2014

  Simulate daemon, time - Tue Jan  7 12:31:43 2014

  Simulate daemon, time - Tue Jan  7 12:31:44 2014

^C
$ a.out 
 Marker file .lwsmd_maker exist. Process was not shutdown correctly!  
  Simulate daemon, time - Tue Jan  7 12:31:47 2014

  Simulate daemon, time - Tue Jan  7 12:31:48 2014

^C
$ a.out 
 Marker file .lwsmd_maker exist. Process was not shutdown correctly!  
  Simulate daemon, time - Tue Jan  7 12:31:51 2014

  Simulate daemon, time - Tue Jan  7 12:31:52 2014

  Simulate daemon, time - Tue Jan  7 12:31:53 2014

  Simulate daemon, time - Tue Jan  7 12:31:54 2014

  Simulate daemon, time - Tue Jan  7 12:31:55 2014

  Simulate daemon, time - Tue Jan  7 12:31:56 2014

  Simulate daemon, time - Tue Jan  7 12:31:57 2014

  Simulate daemon, time - Tue Jan  7 12:31:58 2014

  Simulate daemon, time - Tue Jan  7 12:31:59 2014

  Simulate daemon, time - Tue Jan  7 12:32:00 2014

  Simulate daemon, time - Tue Jan  7 12:32:01 2014

  Simulate daemon, time - Tue Jan  7 12:32:02 2014

  Simulate daemon, time - Tue Jan  7 12:32:03 2014

  Simulate daemon, time - Tue Jan  7 12:32:04 2014

  Simulate daemon, time - Tue Jan  7 12:32:05 2014

  Simulate daemon, time - Tue Jan  7 12:32:06 2014

  Simulate daemon, time - Tue Jan  7 12:32:07 2014

  Simulate daemon, time - Tue Jan  7 12:32:08 2014

  Simulate daemon, time - Tue Jan  7 12:32:09 2014

  Simulate daemon, time - Tue Jan  7 12:32:10 2014

 Marker file successfully deleted
```

## 13.2 Memory

### 13.2.1 Memory allocating service function demo

```text
$ gcc MemAlloc.c 
$ a.out
Starting memory allocation in C demo...
f_memUser - Starting memory allocation using function 
f_alloc - Starting memory allocation function 
f_alloc - calloc...
f_alloc - malloc...
f_alloc - memcpy...
f_alloc - increment...
f_alloc - Copied string is abcd
f_alloc - 2nd malloc...
f_alloc - 2nd memcpy...
f_alloc - 2nd increment...
f_alloc - Copied string is xxx
f_alloc - Copied string is yy. Total length is 2
f_alloc - Ptr to char** array is 0x7fb403c03950, passed 0x7fff531c1a28, deref 0x7fb403c03950
f_memUser - Ptr to char** array is 0x7fb403c03950
f_memUser - Returned 2 length of string list
Str 1 is abcd
Str 2 is xxx
Str 3 is yy

- Code

/*
 * =====================================================================================
 *
 *       Filename:  MemAlloc.c
 *
 *    Description:  Excersise in memory allocating functions
 *
 *        Version:  1.0
 *        Created:  04/13/2014 19:35:28
 *       Revision:  none
 *       Compiler:  gcc
 *
 *         Author:  Yosi Izaq
 *   Organization:  
 *
 * =====================================================================================
 */
#include <stdlib.h>
#include <stdio.h>
#include <string.h>

int f_alloc(char *** pppCharArr, unsigned int * piLen)
{

	const unsigned int ic_cells = 3;
	char str1[5] = "abcd"; 
	char str2[4] = "xxx"; 
	char str3[3] = "yy"; 
	printf("%s - Starting memory allocation function \n", __func__);

	printf("%s - calloc...\n", __func__);
	*pppCharArr = (char **) calloc(ic_cells, sizeof(char *) );
	//piLen =  calloc(1, sizeof(unsigned int ) ) ;
	*piLen = 0;
	char ** ppTmpCharArr = *pppCharArr;

	printf("%s - malloc...\n", __func__);
        ppTmpCharArr[*piLen] = malloc(strlen(str1) +1);
	printf("%s - memcpy...\n", __func__);
	memcpy(ppTmpCharArr[*piLen], str1, strlen(str1) +1); 
	printf("%s - increment...\n", __func__);
	printf("%s - Copied string is %s\n", __func__, ppTmpCharArr[*piLen] );
	(*piLen)++;

	printf("%s - 2nd malloc...\n", __func__);
        ppTmpCharArr[*piLen] = malloc(strlen(str2) +1);
	printf("%s - 2nd memcpy...\n", __func__);
	memcpy(ppTmpCharArr[*piLen], str2, strlen(str2) +1); 
	printf("%s - 2nd increment...\n", __func__);
	printf("%s - Copied string is %s\n", __func__, ppTmpCharArr[*piLen] );
	(*piLen)++;

        ppTmpCharArr[*piLen] = malloc(strlen(str3) +1);
	memcpy(ppTmpCharArr[*piLen], str3, strlen(str3) +1); 
	printf("%s - Copied string is %s. Total length is %u\n", __func__, ppTmpCharArr[*piLen], *piLen );

	printf("%s - Ptr to char** array is %p, passed %p, deref %p\n", __func__, ppTmpCharArr ,  pppCharArr ,  *pppCharArr);
	return 0;
}

int f_memUser()
{

	printf("%s - Starting memory allocation using function \n", __func__);
char ** ppCharArr;
unsigned int  iLen = 0;

	f_alloc(&ppCharArr, &iLen);

	printf("%s - Ptr to char** array is %p\n", __func__, ppCharArr );
	printf("%s - Returned %u length of string list\n", __func__, iLen);
	for (unsigned int i = 0; i < iLen+1; i++) {
		printf("Str %u is %s. Freeing it...\n",i+1, ppCharArr[i]);
		free (ppCharArr[i]); 
	}


	printf("%s - Free char** array\n", __func__);
        free (ppCharArr); 

	return 0;
}

int main(int argc, const char *argv[])
{
	printf("Starting memory allocation in C demo...\n");

	f_memUser();
	return 0;
}



		13.2.2
```

## 13.3 C Function Converts ASCII Hex to Binary

```text
The C listing in the text file attached to EDN BBS /DI_SIG #1436 is a simple function that converts an ASCII hexadecimal string to binary. The function htoi works very much like the standard atoi library function.

/*****************************************************************************

Software Design Note - htoi function

The standard C library contains functions to convert an ASCII numeric string 
to integer, long, or floating binary numbers.  However the library doesn't 
provide a simple function to convert an ASCII hexadecimal string to binary.  
That's what htoi does.

The htoi function works like the atoi library function, except it assumes the 
string is ASCII hexadecimal (upper or lower case).  Like atoi, htoi skips over 
leading whitespace (tabs or spaces), terminates on the first non-hex 
character, and has no provision for detecting overflow.

The function accepts one parameter, a pointer to the most-significant ASCII 
hex digit.  The function returns an unsigned int from 0x0000 to 0xffff (or up 
to 0xffffffff with compilers that support 32-bit integers).

Here are some examples of how to use htoi:

unsigned int nbr1, nbr2, nbr3;
char string1 [] = "  12ab  ";
char string2 [] = "\t\t  7Fxx";
char string3 [] = "Aa55Bb66 1234";
                                ----result----
    nbr1 = htoi (string1);      nbr1 is 0x12ab
    nbr2 = htoi (string2);      nbr2 is 0x7f
    nbr3 = htoi (string3);       nbr3 is 0xbb66 (0xaa55bb66 on 32-bit systems)
    nbr3 = htoi (&string3[8]);  nbr3 is 0x1234

*****************************************************************************/

unsigned int htoi (const char *ptr)
{
unsigned int value = 0;
char ch = *ptr;

/*--------------------------------------------------------------------------*/

    while (ch == ' ' || ch == '\t')
        ch = *(++ptr);

    for (;;) {

        if (ch >= '0' && ch <= '9')
            value = (value << 4) + (ch - '0');
        else if (ch >= 'A' && ch <= 'F')
            value = (value << 4) + (ch - 'A' + 10);
        else if (ch >= 'a' && ch <= 'f')
            value = (value << 4) + (ch - 'a' + 10);
        else
            return value;
        ch = *(++ptr);
    }
}

	13.4
```
