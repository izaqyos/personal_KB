---
type: reference
title: Strings
description: Section 15 of the legacy c-kb notes.
tags: [kb-c]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "c-kb#15"
---

# Strings

[↑ c-kb](/kb-c/README.md)

## 15.1 string.h

### 15.1.1 Functions

```text
Copying:
memcpy
Copy block of memory (function )
memmove
Move block of memory (function )
strcpy
Copy string (function )
strncpy
Copy characters from string (function )

Concatenation:
strcat
Concatenate strings (function )
strncat
Append characters from string (function )

Comparison:
memcmp
Compare two blocks of memory (function )
strcmp
Compare two strings (function )
strcoll
Compare two strings using locale (function )
strncmp
Compare characters of two strings (function )
strxfrm
Transform string using locale (function )

Searching:
memchr
Locate character in block of memory (function )
strchr
Locate first occurrence of character in string (function )
strcspn
Get span until character in string (function )
strpbrk
Locate characters in string (function )
strrchr
Locate last occurrence of character in string (function )
strspn
Get span of character set in string (function )
strstr
Locate substring (function )
strtok
Split string into tokens (function )

Other:
memset
Fill block of memory (function )
strerror
Get pointer to error message string (function )
strlen
Get string length (function )

Macros
NULL
Null pointer (macro )

Types
size_t
Unsigned integral type (type )
```

## 15.2 idioms, common operations, Recipes

### 15.2.1 Starts with

```text
bool StartsWith(const char *a, const char *b)
{
   if(strncmp(a, b, strlen(b)) == 0) return 1;
   return 0;
}

...

if(StartsWith("http://stackoverflow.com", "http://")) { 
   // do something
}else {
  // do something else
}
```

### 15.2.2 Tokenize, split

#### 15.2.2.1 strsep is better than strtok_r

```text
http://www.quora.com/How-do-you-write-a-C-program-to-split-a-string-by-a-delimiter

Costya Perepelitsa
5 upvotes by Anonymous, Aditya N. Joshi, Quora User, (more)
Executive Summary: Use strtok_r for natural languages and strsep for everything else.

I think the answers so far illustrate beautifully how confusing this issue can be. :p
There are many ways to do this, but most of the ones you'll hear are often... less than ideal.

Some people mentioned strtok, which was the Old Way. It uses global state variables which are hidden from you, making it a poor choice for multi-threaded code, or even sufficiently complicated code that'll require you to use it in more than one function; it's easy to accidentally start tokenizing one string using another's context, making your program behave unpredictably. Outside of simple, quick & dirty programs, you should avoid it.

Only one person (as of this writing) suggested strtok_r. This is a fine suggestion. It works by putting that hidden global state variable into an opaque "context" variable you must pass for each invocation. This makes it effective but, in my opinion, ugly.

Someone else suggested the use of strcspn, which only returns the length of the next token and therefore requires that you do your own string splitting. It's not a bad idea, but there are easier ways that do that work for you.

One person reinvented the wheel that is the lexer, but in an inefficient and highly insecure way, and still another gave you C++ when you asked for C. Those are known risks when asking the Internet to help you with C, I'm afraid.

My preferred method of tokenizing a string is to use strsep. Like strtok_r (and strtok before it), it overwrites delimiter characters in the string with null bytes, so if you wanted to keep a copy of the original, untokenized string, you had best make a copy (strdup is the easiest way to do this). strsep has a few differences from strtok_r that will be made apparent in the example code below. The gist of it is that strtok_r is better for tokenizing natural languages (like English) and strsep is better for more well-defined input like CSV.


Example strtok_r code:
The following is a simple program that reads in one line at a time, tokenizes each line using strtok_r, and then prints all of its tokens.
I split on whitespace as well as commas to illustrate an important difference in the way strtok_r and strsep behave regarding starting and ending delimiters as well as repeated delimiters.

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char **strsplit(const char* str, const char* delim, size_t* numtokens) {
    // copy the original string so that we don't overwrite parts of it
    // (don't do this if you don't need to keep the old line,
    // as this is less efficient)
    char *s = strdup(str);

    // these three variables are part of a very common idiom to
    // implement a dynamically-growing array
    size_t tokens_alloc = 1;
    size_t tokens_used = 0;
    char **tokens = calloc(tokens_alloc, sizeof(char*));

    char *token, *strtok_ctx;
    for (token = strtok_r(s, delim, &strtok_ctx);
            token != NULL;
            token = strtok_r(NULL, delim, &strtok_ctx)) {
        // check if we need to allocate more space for tokens
        if (tokens_used == tokens_alloc) {
            tokens_alloc *= 2;
            tokens = realloc(tokens, tokens_alloc * sizeof(char*));
        }
        tokens[tokens_used++] = strdup(token);
    }

    // cleanup
    if (tokens_used == 0) {
        free(tokens);
        tokens = NULL;
    } else {
        tokens = realloc(tokens, tokens_used * sizeof(char*));
    }
    *numtokens = tokens_used;
    free(s);

    return tokens;
}


int main(void) {
    char *line = NULL;
    size_t linelen;

    char **tokens;
    size_t numtokens;

    while (getline(&line, &linelen, stdin) != -1) {
        tokens = strsplit(line, ", \t\n", &numtokens);
        for (size_t i = 0; i < numtokens; i++) {
            printf("    token: \"%s\"\n", tokens[i]);
            free(tokens[i]);
        }
        if (tokens != NULL)
            free(tokens);
    }

    if (line != NULL) free(line);

    return EXIT_SUCCESS;
}

In my opinion, the need for that context variable (strtok_ctx in my example, above) is ugly, and the fact that strtok_r requires a different calling convention for tokens after the first makes it annoying to write loops for.

Example run:
$ gcc -Wall -Wextra -Werror -g -o split split.c
$ ./split
foo,bar,baz
    token: "foo"
    token: "bar"
    token: "baz"
,,foo,,bar,,baz,,
    token: "foo"
    token: "bar"
    token: "baz"
^D
$

Note how, in the second line, any delimiters at the start and end are skipped, and several consecutive occurrences of delimiters are treated as one delimiter.
This makes strtok_r great for tokenizing natural languages because you'd be filtering out all of those blanks anyway, but less viable for, say, CSV files, where you definitely want to keep the empty values.
That is, if ,,foo,,bar,,baz,, were in a CSV file, you would be expecting 9 values, the 3rd, 5th, and 7th of which are non-empty strings, but strtok_r would only give you the non-empty values with no way of knowing the positions in which they appear.


Example strsep code:
I'll just rewrite the strsplit function from the earlier example.
char **strsplit(const char* str, const char* delim, size_t* numtokens) {
    char *s = strdup(str);
    size_t tokens_alloc = 1;
    size_t tokens_used = 0;
    char **tokens = calloc(tokens_alloc, sizeof(char*));
    char *token, *rest = s;

    while ((token = strsep(&rest, delim)) != NULL) {
        if (tokens_used == tokens_alloc) {
            tokens_alloc *= 2;
            tokens = realloc(tokens, tokens_alloc * sizeof(char*));
        }
        tokens[tokens_used++] = strdup(token);
    }

    if (tokens_used == 0) {
        free(tokens);
        tokens = NULL;
    } else {
        tokens = realloc(tokens, tokens_used * sizeof(char*));
    }
    *numtokens = tokens_used;
    free(s);

    return tokens;
}

The primary difference to notice in the code is that that huge, multi-line for statement can be replaced with a much nicer while loop. And while strsep does need an extra char* variable just like strtok_r does, you actually know what it will be used for: storing the rest of the string after the token. This makes strsep more convenient if your program wants to partially tokenize a string (e.g. if your program takes command lines and dispatches to other functions based on the command).

Example run:
$ gcc -Wall -Wextra -Werror -g -o split split.c
$ ./split
foo bar baz
    token: "foo"
    token: "bar"
    token: "baz"
    token: ""
,,foo,,bar,,baz,,
    token: ""
    token: ""
    token: "foo"
    token: ""
    token: "bar"
    token: ""
    token: "baz"
    token: ""
    token: ""
    token: ""
^D
$

The main difference is that each and every delimiter is split on; start and end delimiters are not skipped and consecutive delimiters are not lumped together as a single delimiter.
The other important thing to notice is where that final empty token comes from in each line: that's the result of splitting on the newline character, '\n'. Because strsep does not ignore delimiters at the end of the string, it splits on the newline character as well (when it's one of the delimiter characters), producing an extra, empty token. Depending upon your use case, you may want to check for a terminating newline and remove it before tokenizing the line to avoid getting this extra token.


It deserves mention, however, that for sufficiently complicated tokenization rules (e.g. as used by compilers when reading in your source code), it is best to use a lexer. A lexer is a developer tool that takes regular expressions describing tokens and automatically generates efficient functions for you to use to tokenize input according to those rules.
The most popular lexer for C is flex. Only the sorriest excuses of Linux package managers would fail to include flex in their repositories; you should have no trouble in getting a hold of it.
```

#### 15.2.2.2 Splitting a String C++

```text
Problem
You want to split a delimited string into multiple strings. For example, you may want to split the string "Name|Address|Phone" into three separate strings, "Name", "Address", and "Phone", with the delimiter removed.

Solution
Use basic_string's find member function to advance from one occurrence of the delimiter to the next, and substr to copy each substring out of the original string. You can use any standard sequence to hold the results; Example 4-10 uses a vector.

Example 4-10. Split a delimited string
#include <string>
#include <vector>
#include <functional>
#include <iostream>

using namespace std;

void split(const string& s, char c,
           vector<string>& v) {
   string::size_type i = 0;
   string::size_type j = s.find(c);

   while (j != string::npos) {
      v.push_back(s.substr(i, j-i));
      i = ++j;
      j = s.find(c, j);

      if (j == string::npos)
         v.push_back(s.substr(i, s.length()));
   }
}

int main() {
   vector<string> v;
   string s = "Account Name|Address 1|Address 2|City";

   split(s, '|', v);

   for (int i = 0; i < v.size(); ++i) {
      cout << v[i] << '\n';
   }
}
```

### 15.2.3 replace substring

#### 15.2.3.1 My example, replace substring "dirName.*," with "dirname:dirname"

```text
    char * psValueResult = NULL; // Will contain final string for X509V3_EXT_conf_nid
    char * psDirNameResult = NULL; // Will contain dirName substring. i.e. "dirName:/C=Yo/O=Cisco/OU=Security/CN=SAMPG"
    const char * psDirNameVal = "dirName";
    char * psDirNameLoc = NULL;
    char * psCommaLoc = NULL;
    if (  ( psDirNameLoc = strstr(pValue , psDirNameVal )) != NULL ) // handle dirname
    {
            g_pILog->logDebug(__FILE__,__LINE__, rc, "addDirNametoCSR_SAN() - Found dirName field, position: %s\n", psDirNameLoc);
            if (pValue == psDirNameLoc)
            {
                    if (  ( psCommaLoc = strstr(pValue , "," )) != NULL )
                    {
                        g_pILog->logDebug(__FILE__,__LINE__, rc, "addDirNametoCSR_SAN() - Process dirName plus additional fields \n");
                        psValueResult = (char *) malloc ( strlen ("dirName:dirname") +strlen(psCommaLoc)+1);
                        sprintf(psValueResult,"%s%s", "dirName:dirname", psCommaLoc);
                        psDirNameResult = (char *)malloc ( (psCommaLoc - pValue) +1);
                        strncpy(psDirNameResult,pValue,psCommaLoc - pValue);
                        psDirNameResult[ (psCommaLoc - pValue)  ] = '\0';

                    }
                    else // pValue only contains dirName 
                    {
                        g_pILog->logDebug(__FILE__,__LINE__, rc, "addDirNametoCSR_SAN() - Process dirName only \n");
                        psValueResult = (char *)malloc ( strlen ("dirName:dirname") +1);
                        strcpy(psValueResult,"dirName:dirname");
                        psDirNameResult = (char *)malloc ( strlen (pValue) +1);
                        strcpy(psDirNameResult,pValue);
                    }
            }
            else // dirName at the end or middle
            {
                    if (  ( psCommaLoc = strstr(psDirNameLoc , "," )) != NULL ) //middle
                    {
                        g_pILog->logDebug(__FILE__,__LINE__, rc, "addDirNametoCSR_SAN() - Process dirName at middle\n");
                        psValueResult = (char *)malloc ( strlen ("dirName:dirname") + (psDirNameLoc - pValue) +strlen(psCommaLoc) +1);
                        strncpy(psValueResult,pValue,psDirNameLoc - pValue);
                        strncpy(psValueResult+(psDirNameLoc - pValue),"dirName:dirname",strlen ("dirName:dirname"));
                        strcpy(psValueResult+(psDirNameLoc - pValue) + strlen ("dirName:dirname"),psCommaLoc );
                        psDirNameResult = (char *)malloc ( ( psCommaLoc - psDirNameLoc ) +1);
                        strncpy(psDirNameResult,psDirNameLoc, ( psCommaLoc - psDirNameLoc ));
                        psDirNameResult[ psCommaLoc - psDirNameLoc] = '\0'; 

                    }
                    else //end
                    {
                        g_pILog->logDebug(__FILE__,__LINE__, rc, "addDirNametoCSR_SAN() - Process dirName at end\n");
                        psValueResult = (char *)malloc ( strlen ("dirName:dirname") + (psDirNameLoc - pValue) +1);
                        strncpy(psValueResult,pValue,psDirNameLoc - pValue);
                        strncpy(psValueResult+(psDirNameLoc - pValue),"dirName:dirname",strlen ("dirName:dirname"));
                        psValueResult[  strlen ("dirName:dirname") + (psDirNameLoc - pValue) ] = '\0';
                        psDirNameResult = (char *)malloc ( strlen(psDirNameLoc ) +1);
                        strcpy(psDirNameResult,psDirNameLoc);
                    }

            }
                g_pILog->logDebug(__FILE__,__LINE__, rc, "addDirNametoCSR_SAN() -  dirName field: [%s], Final string is [%s]", psDirNameResult, psValueResult);
    }// if (  ( psDirNameLoc = strstr(pValue , psDirNameVal )) != NULL ) // handle dirname
    else
    {
        g_pILog->logWarn(__FILE__,__LINE__, rc, "addDirNametoCSR_SAN() - dirName not found. this method only handles dirName so it will do nothing.");
        return rc;
    }

			15.2.3.2


		15.2.4

	15.3

16.
```
