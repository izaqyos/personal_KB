---
type: reference
title: "string, std::string"
description: "Subsection 4.1 of Standard template library, STL, namespace std."
tags: [kb-cpp]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-cpp#4.1"
---

# 4.1 string, std::string

[↑ Standard template library, STL, namespace std](/kb-cpp/04-standard-template-library-stl-namespace-std/README.md)

### 4.1.1 check for equality, compare

```text
		use oprator ==
		or use compare:
		 Syntax:

		  #include <string>
		  int compare( const string& str );
		  int compare( const char* str );
		  int compare( size_type index, size_type length, const string& str );
		  int compare( size_type index, size_type length, const string& str, size_type index2,
		  size_type length2 );
		  int compare( size_type index, size_type length, const char* str, size_type length2 );

		The compare() function either compares str to the current string in a variety of ways, returning
		Return Value 	Case
		less than zero 	this < str
		zero 	this == str
		greater than zero 	this > str

		The various functions either:

		    * compare str to the current string,
		    * compare str to a substring of the current string, starting at index for length characters,
		    * compare a substring of str to a substring of the current string, where index2 and length2 refer to str and index and length refer to the current string,
		    * or compare a substring of str to a substring of the current string, where the substring of str begins at zero and is length2 characters long, and the substring of the current string begins at index and is length characters long.

		For example, the following code uses compare() to compare four strings with eachother:

		 string names[] = {"Homer", "Marge", "3-eyed fish", "inanimate carbon rod"};            

		 for( int i = 0; i < 4; i++ ) {
		   for( int j = 0; j < 4; j++ ) {
		     cout << names[i].compare( names[j] ) << " ";
		   }
		   cout << endl;
		 }              

		Data from the above code was used to generate this table, which shows how the various strings compare to eachother:
							Homer 	Marge 	3-eyed fish 	inanimate carbon rod
		"Homer".compare( x )			0 	-1 	1 	-1
		"Marge".compare( x ) 			1 	0 	1 	-1
		"3-eyed fish".compare( x ) 		-1 	-1 	0 	-1
		"inanimate carbon rod".compare( x ) 	1 	1 	1 	0

		For char * types use strcmp or better, the safer strncmp.
		Syntax:

		  #include <string.h>
		  int strncmp( const char *str1, const char *str2, size_t count );

		The strncmp() function compares at most count characters of str1 and str2. The return value is as follows:
		Return value 	Explanation
		less than 0 	''str1'' is less than ''str2''
		equal to 0 	''str1'' is equal to ''str2''
		greater than 0 	''str1'' is greater than str2''

		If there are less than count characters in either string, then the comparison will stop after the first null termination is encountered.

		"
```

### 4.1.2 STL String Examples

```text
By William R Speirs
First, it is important to know that strings take care of all the memory creation and deletion for you. There is no need to call malloc and you will never forget to call free. Also when you include the header file for STL strings you use the following command: #include <string> notice you don't put the .h in there. You will also need to include the proper namespace: using std::string;
Second, if you have any questions about how to use any part of STL strings the best site to consult is the creators of STL strings: SGI. You can find information on all of STL here. If you have any questions about any of the other C++ libraries, like the IOStreams library, you can consult these 2 sites: MSDN or CPlusPlus.com

Let's take a look at what some routine string manipulation functions looks like with normal C calls and then the same manipulation with STL calls.

First a few common commands to get the size of a string, and to pass a string as a character pointer to some function foo(char *arg).
C Code	C++ with STL Strings

{
	char *str = "Hello"

	printf("LENGTH: %d\n", strlen(str));

	// pass to function foo
	foo(str);
}

	

{
	string str = "Hello";

	cout << "LENGTH: " << str.length() << endl;

	// pass to function foo
	foo(str.c_str());
}


This example is of simply copying one string to another, and showing that equal (=) copies a string in STL; whereas in C you only copy the pointer, not the data. This is an important distinction.
C Code	C++ with STL Strings

{
	// have to do this so we have enough memory allocated
	char str1[12] = {'H', 'e', 'l', 'l', 'o'}; // 12 because strcat adds a null!!!
	char *str2 = str1; // sets only the pointer, doesn't copy data

	// very dangerous, could overflow the buffer if not enough memory
	strcat(str2, " World"); 

	printf("STR1: %s\n", str1);
	printf("STR2: %s\n", str2);
}

	

{
	// don't have to call malloc, memory made for us
	string str1 = "Hello";
	string str2 = str1; // copy the actual data

	// makes the right amount of memory for us
	str2 += " World";

	cout << "STR1: " << str1 << endl;
	cout << "STR2: " << str2 << endl;
}

Output

STR1: Hello World
STR2: Hello World

	

STR1: Hello
STR2: Hello World


This example shows the use of the + operator to concatenate strings together. The output of these two programs is the same; however, the C++ with STL strings is only 4 lines long, and a lot easier to read.
C Code	C++ with STL Strings

{
	char *str1 = "Hello"; 
	char *str2 = "World";
	// + 2 for the space & null
	char *finalStr = (char *)malloc(strlen(str1) + strlen(str2) + 2);

	strcpy(finalStr, str1); // copy on the first word
	strcat(finalStr, " ");  // add a space between the words
	strcat(finalStr, str2); // add on the second word

	printf("FINAL: %s\n", finalStr);

	free(finalStr); // need to free our memory
}

	

{
	string str1 = "Hello";
	string str2 = "World";
	// makes and frees the memory for us
	string finalStr = str1 + " " + str2;

	cout << "FINAL: " << finalStr << endl;
}


This example is almost the same as the one above except now we deal with char * in both of them, and show the use of an anonymous strings, because you are not allowed to use the plus operator (+) on char *s to create a string. So instead anonymous strings are made out of the char *s.
C Code	C++ with STL Strings

int main(int argc, char **argv)
{
	// + 2 for the space & null
	char *finalStr = (char *)malloc(strlen(argv[0]) + strlen(argv[1]) + 2);

	strcpy(finalStr, argv[0]); // copy on the first word
	strcat(finalStr, " ");     // add a space between the words
	strcat(finalStr, argv[1]); // add on the second word

	printf("FINAL: %s\n", finalStr);

	free(finalStr); // need to free our memory
}

	

int main(int argc, char **argv)
{
	// makes and frees the memory for us, using anonymous strings
	string finalStr = string(argv[0]) + " " + string(argv[1]);

	cout << "FINAL: " << finalStr << endl;
}


The strtok function is often used to parse strings. While STL strings do not have that exact function it has find and find_first_of. The only difference is that find searches for a particular string while find_first_of can find any one of a number of strings. Also the find functions do not modify your original string in any way. Since it does not break the string into a token you can take the characters from that point towards the end, or the characters from the beginning to that character... you have full control over this. You do not have that same control with strtok and you need to make a copy of your original string if you want to ever use it again.
C Code	C++ with STL Strings

{
	char str[] = "hello world";
	// modifies str with call to strtok
	char *hello = strtok(str, " ");
	// won't get "world" because it takes off the 'w'
	char *world = strtok(NULL, "wx");
	
	printf("HELLO: %s\n", hello);
	printf("WORLD: %s\n", world);
	printf("STR: %s\n", str);
}

	

{
	string str = "hello world";
	// this won't modify str
	string hello(str.begin(), str.begin() + str.find(" "));
	// search for the first 'w' or 'x'
	string world(str.begin() + str.find_first_of("wx"), str.end());

	cout << "HELLO: " << hello << endl;
	cout << "WORLD: " << world << endl;
	cout << "STR: " << str << endl;
}

Output

HELLO: hello
WORLD: orld
STR: hello

	

HELLO: hello
WORLD: world
STR: hello world


Once you get over the initial learning curve of using STL strings you will find them much easier to use then character pointers and arrays of characters. The code becomes a lot easier to read, and a lot smaller. You will find you make a lot less mistakes, and your code will not have as many, if any, buffer overflows.

NEW!!!
I have gotten a few questions on converting other data types into strings. While the obvious ones like char * are done for you, numbers are not. To solve this problem you can use an ostringstream. This is done by sending the variable to the stream, and then returning the stream as a string. Included below is a function called ToString(const T &arg); that takes an argument of ANY type and converts it into a string if such a conversion is allowed. The function and an example use of it are shown below:

#include < string >
#include < sstream >
#include < iostream >

using std::cout;
using std::endl;
using std::string;
using std::ostringstream;

template < class T >
string ToString(const T &arg)
{
	ostringstream	out;

	out << arg;

	return(out.str());
}

int main(int argc, char **argv)
{
	string integer = ToString(1234);
	string floating_point = ToString(1238.1239);
	string some_string = ToString("Why would you do this?");

	cout << integer << floating_point << some_string << endl;

	string combine_all = integer + floating_point + some_string;

	cout << combine_all << endl;

	return(0);
}
```

### 4.1.3 More string examples

```text
constructors 1.

#include <iostream>
#include <string>
using namespace std;

int main () 
{
    char *line = "short line for testing";
    
    // with no arguments
    string s1;
    s1 = "Anatoliy";
    cout << "s1  is: " << s1 << endl;

    // copy constructor
    string s2 (s1);
    cout << "s2  is: " << s2 << endl;

    // one argumen
    string s3 (line);
    cout << "s3  is: " << s3 << endl;

    // first argumen C string
    // second number of characters
    string s4 (line,10);
    cout << "s4  is: " << s4 << endl;

    // 1 - C++ string
    // 2 - start position
    // 3 - number of characters
    string s5 (s3,6,4); // copy word 'line' from s3
    cout << "s5  is: " << s5 << endl;

    // 1 - number characters
    // 2 - character itself
    string s6 (15,'*');
    cout << "s6  is: " << s6 << endl;

    // 1 - start iterator
    // 2 - end iterator
    string s7 (s3.begin(),s3.end()-5);
    cout << "s7  is: " << s7 << endl;

    // you can instantiate string with assignment
    string s8 = "Anatoliy";
    cout << "s8  is: " << s8 << endl;

    return 0;
}
OUTPUT:
// s1  is: Anatoliy
// s2  is: Anatoliy
// s3  is: short line for testing
// s4  is: short line
// s5  is: line
// s6  is: ***************
// s7  is: short line for te
// s8  is: Anatoliy


getline 1.

/* 1 getline ( intut_stream, str, delim ); Extracts characters from intut_stream and stores them in str until s.max_size() characters have been extracted, the end of file occurs, or delim is encountered, in which case delim is extracted from istr but is not stored in s 2 getline( Iter, str ) Inputs a string value for str as in the preceding funcï¿½ tion with delim = */

#include <iostream>
#include <string>
#include <vector>
#include <fstream>
using namespace std;

int main () 
{
    string str;
    cout << "Enter string (EOL = $) : ";
    getline (cin, str, '$');
    cout << "Str is : " << str << endl;

    ifstream In("data.dat");
    vector v;

    cout << endl << "Read data from file" << endl;
    while ( ! In.eof() )
    {
    	getline (In, str);
    	v.push_back(str);
    }

    copy (v.begin(),v.end(),
    		ostream_iterator(cout,"\n"));
    cout << endl;
    	

    return 0;
}
OUTPUT:
// Enter string (EOL = $) : Str is : first line
// second line$
// 
// Read data from file
// file: "data.dat"
// second line
// last line


 << >> operators 1.

#include <iostream>
#include <string>
using namespace std;

int main () 
{
    string str;

    cout << "Enter string for testing : ";
    cin  >> str;
    cout << "\nString is : " << str << endl;

    cout << "Enter string for testing "
    	 << "(d to quit) : ";
    while ( cin >> str )
    {
    	cout << endl;
    	cout << "String is : " << str << endl;
    	cout << "Enter string for testing "
             << "(d to quit) : ";
    }

    return 0;
}
OUTPUT:
// Enter string for testing : first
// String is : first
// Enter string for testing (d to quit) : second
// String is : second
// Enter string for testing (d to quit) : third
// String is : third
// Enter string for testing (d to quit) : 


 + += = operators 1.

#include <iostream>
#include <string>
using namespace std;

int main () 
{
    string str = "Hello";
    cout << "str is : " << str << endl;
    str += ",";
    str += ' ';
    cout << "str is : " << str << endl;

    string s;
    s = str + "World";
    cout << "s is : " << s << endl;

    char ch = '!';
    s += ch;
    cout << "s is : " << s << endl;

    return 0;
}
OUTPUT:
// str is : Hello
// str is : Hello, 
// s is : Hello, World
// s is : Hello, World!


append 1.

#include <iostream>
#include <string>
using namespace std;

int main () 
{
    string str = "Nobody is perfect";
    string s   = ""; // empty string
    char *ch   = "abcdef";

    // append string str at the end of s; 
    // return s
    
    // appends at the end of s a copy of the n characters
    // in str, starting at position pos; if n is too
    // large, characters are copied only until the end  
    // of str is reached;
    // returns s
    s.append(str,0,6);
    cout << "s is : " << s << endl;

    // appends copies of the characters in the range [inpIt1,
    // inpIt2] to s; returns s
    string::iterator inpIt1 = str.begin()+6;
                    //start from ' is'
    string::iterator inpIt2 = str.end();

    s.append(inpIt1,inpIt2);
    cout << "s is : " << s << endl;

    // appends three !
    s.append(3,'!');
    cout << "s is : " << s << endl;
    
    // appends the first n characters in ch at the end
    // of s; returns s
    s.append(ch,3);
    cout << "s is : " << s << endl;
    
    // appends charArray at the end of s; returns s
    s.append(ch,3);
    cout << "s is : " << s << endl;

    return 0;
}
OUTPUT:
// s is : Nobody
// s is : Nobody is perfect
// s is : Nobody is perfect!!!
// s is : Nobody is perfect!!!abc
// s is : Nobody is perfect!!!abcabc


assign 1.

#include <iostream>
#include <string>
using namespace std;

int main () 
{
    string str = "Nobody is perfect";
    string s   = "";
    char *ch   = "Robert Frost";

    // assigns a copy of str to s; returns s
    s.assign(str);
    cout << "s is : " << s << endl;

    
    // assigns to s a copy of the n characters in str, startï¿½
    // ing at position 10: if n is too large, characters are
    // copied only until the end of str is reached: returns s
    s.assign(str,10,7); // perfect
    cout << "s is : " << s << endl;

    // assigns to s a string consisting of the first n characï¿½
    // ters in ch: returns s
    s.assign(ch,6);
    cout << "s is : " << s << endl;

    // assigns to s a copy of ch: returns s
    s.assign(ch);
    cout << "s is : " << s << endl;

    // assigns  to s a string consisting of the characters in
    // the range str.begin(), str.end(); returns s
    s.assign(str.begin(),str.end());
    cout << "s is : " << s << endl;

    // assigns to s a string consisting of n copies of ch;
    // returns s
    s.assign(17,'*');
    cout << "s is : " << s << endl;

    return 0;
}
OUTPUT:
// s is : Nobody is perfect
// s is : perfect
// s is : Robert
// s is : Robert Frost
// s is : Nobody is perfect
// s is : *****************


at 1.

// returns s[pos]

#include <iostream>
#include <string>
using namespace std;

int main () 
{
    string s = "Nobody is perfect";

    // Returns s[pos]
    for ( int pos = 0; pos < s.length(); ++pos )
    	cout << s.at(pos) << " ";
    cout << endl;

    return 0;
}
OUTPUT:
// N o b o d y   i s   p e r f e c t 


begin 1.

// Returns an iterator positioned at the // first character in a string

#include <iostream>
#include <string>
using namespace std;

int main () 
{
    string str = "C++ is best computer language";

    string::iterator It = str.begin();

    while ( It != str.end() )
    {
    	if ( *It == ' ' )
    		*It = '\n';
    	cout << *It++;
    }
    cout << endl;
    
    return 0;
}
OUTPUT:
// C++
// is
// best
// computer
// language


c_str 1.

// returns (the base address of) a char // array containing the characters stored in s, // terminated by a null character.

#include <iostream>
#include <string>
using namespace std;

int main () 
{
    string str = "Anatoliy";
    char *ary = new char[str.length()+1];

    // strcpy ( ary, str ); that is wrong way
    strcpy ( ary, str.c_str() ); // that is correct

    cout << ary << endl;
    
    return 0;
}
OUTPUT:
// Anatoliy


capacity 1.

// returns the size (of type size_type) // of the storage allocated in string

#include <iostream>
#include <string>
using namespace std;

int main () 
{
    string str = "C++ is best computer language";

    string::size_type cap;
    cap = str.capacity();

    cout << "Capacity of str is: " << cap << endl;
    cout << "Size of str is    : " << str.size() 
         << endl;
    cout << "Length of str is  : " << str.length() 
         << endl;

    cout << "Resize the str for 50 character" << endl;
    str.resize(50);
    cap = str.capacity();
    
    cout << "Capacity of str is: " << cap << endl;
    cout << "Size of str is    : " << str.size() 
         << endl;
    cout << "Length of str is  : " << str.length() 
         << endl;

    return 0;
}
OUTPUT:
// Capacity of str is: 32
// Size of str is    : 29
// Length of str is  : 29
// Resize the str for 50 character
// Capacity of str is: 64
// Size of str is    : 50
// Length of str is  : 50


compare 1.

#include <iostream>
#include <string>
using namespace std;

int main () 
{
    string str1 = "string";
    string str2 = "String";
    string str3 = "second string";
    char ch[]   = "first string";

    cout << "string str1 is : " << str1 << endl;
    cout << "string str2 is : " << str2 << endl;
    cout << "char ary ch is : " << ch   << endl;
    cout << "string str3 is : " << str3 << endl;
    cout << endl;

    // compare str1 and str2
    cout << "1." << endl;
    size_t comp = str1.compare(str2);
    cout << "String str1 is ";
    ( comp == 0 ) ? cout << "equal" : cout 
         << "not equal";
    cout << " to string str2" << endl;

    // compare str1 and literal string "string"
    cout << "2." << endl;
    comp = str1.compare("string");
    cout << "String str1 is ";
    ( comp == 0 ) ? cout << "equal" : cout 
        << "not equal";
    cout << " to array of char \"string\"" << endl;

    // 3. and 4. doesn't work with Microsoft 
    // Visual Studio compiler
	
    // compare str3 start from pos 7 to 5
    // with str1
    cout << "3." << endl;
    comp = str3.compare(str1,7,5);
    cout << "Part of string str3 is ";
    ( comp == 0 ) ? cout << "equal" : cout 
        << "not equal";
    cout << " to str1" << endl;

    // compare str3 start from pos 7
    // with literal string "string"
    cout << "4." << endl;
    comp = str3.compare("string",7);
    cout << "Part of string str3 is ";
    ( comp == 0 ) ? cout << "equal" : cout 
        << "not equal";
    cout << " to C string \"string\"" << endl;

    // next 4 'compare' functions
    // doesn't work with GNU compiler
	
    cout << "5." << endl;
    comp = str1.compare(6,10,ch);
    cout << "String str1 is ";
    ( comp == 0 ) ? cout << "equal" : cout 
    << "not equal";
    cout << " to part of char ary \"first string\"" 
    << endl;

    cout << "6." << endl;
    comp = str1.compare(0,3,str3);
    cout << "Part of str1 is ";
    ( comp == 0 ) ? cout << "equal" : cout 
    << "not equal";
    cout << " to string \"second string\"" 
    << endl;

    cout << "7." << endl;
    comp = str1.compare(1,3,str2,1,3);
    cout << "String str1 is ";
    ( comp == 0 ) ? cout << "equal" : cout 
    << "not equal";
    cout << " to part of string \"second string\"" 
    << endl;

    cout << "8." << endl;
    comp = str1.compare(1,3,str2,1,3);
    cout << "String str1 is ";
    ( comp == 0 ) ? cout << "equal" : cout 
    << "not equal";
    cout << " to part of string \"second string\"" 
    << endl;

    return 0;
}
OUTPUT: GNU compiler
// string str1 is : string
// string str2 is : String
// char ary ch is : first string
// string str3 is : second string
// 
// 1.
// String str1 is not equal to string str2
// 2.
// String str1 is equal to array of char "string"
// 3.
// Part of string str3 is equal to str1
// 4.
// Part of string str3 is equal to C string "string"
// 5.
// 6.
// 7.
// 8.

OUTPUT: Microsoft Visual Studio compiler
// string str1 is : string
// string str2 is : String
// char ary ch is : first string
// string str3 is : second string
//
// 1.
// String str1 is not equal to string str2
// 2.
// String str1 is equal to array of char "string"
// 3.
// 4.
// 5.
// String str1 is not equal to part of char ary "first
// string"
// 6.
// Part of str1 is not equal to string "second string"
// 7.
// String str1 is equal to part of string "second string"
// 8.
// String str1 is equal to part of string "second string"
// Press any key to continue


copy 1.

#include <iostream>
#include <string>
using namespace std;

int main () 
{
    string str = "First Name: Robert";
    char fname[255];
    cout << "str is: " << str << endl;

    int n = str.find(':');

    str.copy(fname, // copy to array
            n+1,    // how many char
            0);     // start position from str
    
    // must terminate fname with '\0';
    fname[n+1] = 0;
    
    cout << "fname is: " << fname << endl;

    return 0;
}
OUTPUT:
// str is: First Name: Robert
// fname is: First Name:


empty 1.

#include <iostream>
#include <string>
using namespace std;

int main () 
{
    string str = "*******";

    while ( ! str.empty() )
    {
    	cout << str << endl;
    	str.erase(str.end()-1);
    }
    cout << endl;

    return 0;
}
OUTPUT:
// *******
// ******
// *****
// ****
// ***
// **
// *


end 1.

// returns an iterator porsitioned immediately // after the last character in string

#include <iostream>
#include <string>
using namespace std;

int main () 
{
    string s;
    string str = "*************************";
    size_t pos = str.length();

    while ( pos )
    {
    	s.assign ( str.begin(),str.end() - pos+1);
    	cout << s << endl;
    	pos -= 5;
    }

    return 0;
}
OUTPUT:
// *
// ******
// ***********
// ****************
// *********************


erase 1.

#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main () 
{
    string str, s;

    for ( char ch = 'a'; ch <= 'z'; ch++ )
        str.append(1,ch);
    s = str;
    cout << "str is: " << str << endl;
    cout << "s   is: " << str << endl;
    
    // removes 13 characters from the beginning
    str.erase(0,13);
    cout << "Erased range fron str : " << str << endl; 
    // removes 13 characters starts from 14
    str = s.erase(13,13);
    cout << "Erased range from s   : " << str << endl;

    // removes one character pointed by s.begin()
    cout << endl << "Erase one, second character from s"
         << endl;
    s.erase(s.begin()+1);
    cout << "s     is: " << s << endl;
    
    // removes range of characters
    s.erase(s.begin(),s.begin()+4);
    cout << "s     is: " << s << endl;

    return 0;
}
OUTPUT:
// str is: abcdefghijklmnopqrstuvwxyz
// s   is: abcdefghijklmnopqrstuvwxyz
// Erased range fron str : nopqrstuvwxyz
// Erased range from s   : abcdefghijklm
// 
// Erase one, second character from s
// s     is: acdefghijklm
// s     is: fghijklm


find 1.

#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main () 
{
    string  str("C++ is best language");
    int pos1, pos2; // size_t or size_type 
                    // work not correct
    // search for first string "best" inside of str
    // default position is 0
    pos1 = str.find ("best");
    cout << "Word best is found on position " << pos1+1 
         << endl;
    
    // if pattern is not found - return -1
    pos2 = str.find ("best",pos1+1);
    cout << "Word best is found on position " << pos2+1 
         << endl;

    // search for first occurrence of character
    pos1 = str.find('g');
    cout << "First character 'g' found on position " 
         << pos1
    	 << endl;

    // search for first occurrence of string
    string s = "is";
    pos1 = str.find (s);
    cout << "Word 'is' is found on position " << pos1+1 
         << endl;
    
    return 0;
}
OUTPUT:
// Word best is found on position 8
// Word best is found on position 0
// First character 'g' found on position 15
// Word 'is' is found on position 5


find_first_not_of 1.

#include <iostream>
#include <string>
using namespace std;

int main () 
{
    string  str("C++ is best language");
    cout << "str is: " << str << endl;

    int n = str.find_first_not_of("aeiouAEIOU");

    cout << "First consonant found at " << n+1
    	 << " position" << endl;
    
    return 0;
}
OUTPUT:
// str is: C++ is best language
// First consonant found at 1 position


find_first_not_of 2.

#include <iostream>
#include <string>
using namespace std;

int main () 
{
    string  str("C++ is best language");
    cout << "str is: " << str << endl;

    // search first not ' ',
    // start from position 7
    int n = str.find_first_not_of(' ',7);
    cout << "first not of space character "
    	 << "found at position " << n+1 << endl;
    
    return 0;
}
OUTPUT:
// str is: C++ is best language
// first not of space character found at position 8


find_first_not_of 3.

#include <iostream>
#include <string>
using namespace std;

int main () 
{
    string  str("C++ is best language");
    string  s = "C++";
    
    cout << "str is: " << str << endl;
    
    // search character from pattern 
    // using the first x chï¿½racters in pattern.
    // the value position must be given
    int n = str.find_first_not_of("CBCD",0,3);
    cout << "first not 'C' is found at position "
    	 << n+1 << endl;
    
    // search first not of 
    // pattern is string
    n = str.find_first_not_of(s);
    cout << "first not of C++ is found "
    	 << "at position " << n+1 << endl;
    
    return 0;
}
OUTPUT:
// str is: C++ is best language
// first not 'C' is found at position 2
// first not of C++ is found at position 4


find_first_of 1.

#include <iostream>
#include <string>
using namespace std;

int main () 
{
    string  str("C++ is best language");
    string  s = "be";
    
    cout << "str is: " << str << endl;

    // search be start from position 2
    // if position is ommited - default is 0
    int n = str.find_first_of(s,2);
    cout << "first 'be' found at position "
    	 << n+1 << endl;

    // same as above but search for character
    n = str.find_first_of('l');
    cout << "first character 'l' found at "
    	 << "position " << n+1 << endl;

    // search 'first of' for the characters in
    // charary
    char charary[] = " bea";
    cout << "charary[] = \" bea\"" << endl;
    n = str.find_first_of(charary,0);
    cout << "first character from charary "
    	 << "found at position " << n+1 << endl;
    cout << "Note: position 4 is space" << endl;

    // same as above but third argumen is
    // number of character from which searching
    // starts
    // this variant of find_first_of dosn't
    // work properly with GNU compiler
    n = str.find_first_of(" bae",0,3);
    cout << "first character from charary "
    	 << "found at position " << n+1 << endl;

    return 0;
}
OUTPUT:
// str is: C++ is best language
// first 'be' found at position 8
// first character 'l' found at position 13
// charary[] = " bea"
// first character from charary found at position 4
// Note: position 4 is space
// first character from charary found at position 4


find_last_not_of 1.

#include <iostream>
#include <string>
using namespace std;

int main () 
{
    string  str("C++ is best language");
    string  s  = "langue";
    int pos = str.length()-1;
    cout << "str is: " << str << endl;
    
    // returns the highest position <= pos of a character
    // in str that does not match any charcter in s; 
    // returns nopos if there  is  no such position:
    // npos is the default value for pos
    int n =  str.find_last_not_of(s, pos);
    cout << "last_not_of 'langue' found at position "
    	 << n+1 << endl;

    // same as above but search for single character
    n = str.find_last_not_of('e');
    cout << "last_not_of 'e' found at position "
    	 << n+1 << endl;

    char ary[] = "be";
    // seawrch for occurence last_not_of
    // from pattern ary in str
    n = str.find_last_not_of(ary);
    cout << "last_not_of 'be' found at position "
    	 << n+1 << endl;
    
    return 0;
}
OUTPUT:
// str is: C++ is best language
// last_not_of 'langue' found at position 12
// last_not_of 'e' found at position 19
// last_not_of 'be' found at position 19


find_last_of 1.

#include <iostream>
#include <string>
using namespace std;

int main () 
{
    string  str("C++ is best language");
    string  s  = "g";
    cout << "str is: " << str << endl;
    cout << "s   is: " << s   << endl;

 	int n = str.find_last_of(s);
 	cout << "last_of '" << s << "' faund"
 		 << " at position " << n+1 << endl;

    n = str.find_last_of(' ');
    cout << "last_of ' ' faund"
    	 << " at position " << n+1 << endl;

    n = str.find_last_of(" la");
    cout << "last_of \" la\" faund"
    	 << " at position " << n+1 << endl;
    
    return 0;
}
OUTPUT:
// str is: C++ is best language
// s   is: g
// last_of 'g' faund at position 19
// last_of ' ' faund at position 12
// last_of " la" faund at position 18


insert 1.

#include <iostream>
#include <string>
using namespace std;

int main () 
{
    string str = "C++ language";
    string s   = "is best";
    char ch[]  = "C++ language";
    
    cout << "str is: " << str << endl;
    cout << "s   is: " << s   << endl;
    cout << "ch  is: " << s   << endl;
    
    // insert a copy of s into str
    // at position pos;
    string::size_type pos = 4;
    str.insert(pos,s);
    cout << "str is: " << str << endl;
    
    // insert a copy of ch into str at
    // the position specified by iterator
    // return an iterator positioned at
    // this copy
    int n = str.find('l');
    str.insert(str.begin() + n,' ');
    cout << "str is: " << str << endl;
    
    // like above but n x copies of char
    str.insert(str.end(),3,'!');
    cout << "str is: " << str << endl;
    
    // insert 4 char from ch into s
    // at the position 0
    s.insert(0,ch,4);
    cout << "s   is: " << s   << endl;
    
    // insert 8 characters from str
    // start from position n ('langu...')
    // into s at position x (end string)
    n = str.find('l');
    int x = s.length();
    s.insert(x,str,n,8);
    cout << "s   is: " << s   << endl;
    
    n = s.find('l');
    s.insert(s.begin()+n,' ');
    cout << "s   is: " << s   << endl;
    
    // insert range (begin - begin+7) of str 
    // into s at position begin+4
    s.insert(s.begin()+4,str.begin(),str.begin()+7);
    cout << "s   is: " << s   << endl;
    return 0;
}
OUTPUT:
// str is: C++ language
// s   is: is best
// ch  is: is best
// str is: C++ is bestlanguage
// str is: C++ is best language
// str is: C++ is best language!!!
// s   is: C++ is best
// s   is: C++ is bestlanguage
// s   is: C++ is best language
// s   is: C++ C++ is is best language


length 1.

#include <iostream>
#include <string>
using namespace std;

int main () 
{
    string str = "C++ is best computer language";
    cout << "str is: " << str << endl;
    
    cout << "Length of str is : "
         << str.length() << endl;
    
    return 0;
}
OUTPUT:
// str is: C++ is best computer language
// Length of str is : 29


max_size 1.

// returns a reverse iterator positioned // at the last character in string


#include <iostream>
#include <string>
using namespace std;

int main () 
{
    string str = "C++ is best computer language";
    cout << "str is: " << str << endl;

    cout << "max_size of str is: "
         << str.max_size() << endl;

    return 0;
}
OUTPUT:
// str is: C++ is best computer language
// max_size of str is: 4294967294


rbegin 1.

#include <iostream>
#include <string>
using namespace std;

int main () 
{
    string str = "C++ is best computer language";
    cout << "str is: " << str << endl;

    // usual iterator doesn't work
    string::reverse_iterator It = str.rbegin();
    while ( It != str.rend() )
        cout << *It++;
    cout << endl;

    return 0;
}
OUTPUT:
// str is: C++ is best computer language
// egaugnal retupmoc tseb si ++C


replace 1.

#include <iostream>
#include <string>
using namespace std;

int main () 
{
    string str = "STL is created from Dennis Ritchie";
    string s1  = "was";
    string s2  = "developed";
    string s3  = "Stepanov alexander";
    cout << "str is: " << str << endl;

    cout << "replace 'is' for 'was'" << endl;
    str.replace(4, // start position in str
            2,     // how many characters
            s1);   // source for replasment
    
    cout << "str is: " << str << endl;
    
    cout <<"replace 'created' for 'developed'" << endl;
    int n = str.find('c'); // pos of 'created'
    int x = str.find("from") -1;

    str.replace(str.begin()+n,// start pointer
            str.begin()+x,    // end pointer
            s2);              // source
    
    cout << "str is: " << str << endl;

    cout << "replace 'Dennis' for 'alexander'" << endl;
    int x1 = str.find('D'); // search Dennis
    int x2 = str.find(' ',x1+1); // space after
    int y1 = s3.find("alex"); // search 'alex'
    int y2 = strlen("alexander");

    str.replace(x1, // start position in str
            x2-x1,  // how characters to replace
            s3,     // source for replacement
            y1,     // start positio from source
            y2);    // how chracter start from y1
    
    cout << "str is: " << str << endl;

    cout << "replace 'from' for 'by'" << endl;
    char ary[] = "bytes";
    n = str.find("from");

    // same variant possible with iterators
    // instead of number of position
    str.replace(n, // start position in str
            4,     // how many characters
            ary,   // source
            2);    // first 2 characters from source
    
    cout << "str is: " << str << endl;

    cout << "replace 'a' for 'A' (alexander)" << endl;
    n = str.find("alexander");

    str.replace(n,  // start position in str
            1,      // how character(s)
            1,      // how many copies of character
            'A');   // character for replasment
    cout << "str is: " << str << endl;

    cout << "replace 'Ritchie' for 'Stepanov'" << endl;
    x1 = str.find('R');
    y1 = s3.find(' ');

    str.replace(str.begin()+x1, // start pointer
            str.end(), // to the end of str
            s3.begin(), // start pointer from source
            s3.begin()+y1 // end pointer from
            );              // source
    cout << "str is: " << str << endl;

    return 0;
}
OUTPUT:
// str is: STL is created from Dennis Ritchie
// replace 'is' for 'was'
// str is: STL was created from Dennis Ritchie
// replace 'created' for 'developed'
// str is: STL was developed from Dennis Ritchie
// replace 'Dennis' for 'alexander'
// str is: STL was developed from alexander Ritchie
// replace 'from' for 'by'
// str is: STL was developed by alexander Ritchie
// replace 'a' for 'A' (alexander)
// str is: STL was developed by Alexander Ritchie
// replace 'Ritchie' for 'Stepanov'
// str is: STL was developed by Alexander Stepanov


reverse 1.

#include <iostream>
#include <string>
using namespace std;

int main () 
{
    string str = "Anatoliy Urbanskiy";
    cout << str.reverse() << endl;

    return 0;
}
OUTPUT:


resize 1.

// if <=s.size(), truncates rightmost // character in s to make it of size n; otherwise, adds // copies of character ch to end of s to increase it size // to n, or adds a default character value (usually a // blank) if ch is omitted; return type is void


#include <iostream>
#include <string>
using namespace std;

int main () 
{
    string str = "Alexander Stepanov";
    cout << "str is: " << str << endl;
    cout << "size of str is: "
         << str.size() << endl;

    str.resize(11);

    cout << "after str.resize(11)" << endl;
    cout << "str is: " << str << endl;
    cout << "size of str is: "
         << str.size() << endl;

    str.resize(20,'.');

    cout << "after str.resize(20,'.')" << endl;
    cout << "str is: " << str << endl;
    cout << "size of str is: "
         << str.size() << endl;

    return 0;
}
OUTPUT:
// str is: Alexander Stepanov
// size of str is: 18
// after str.resize(11)
// str is: Alexander S
// size of str is: 11
// after str.resize(9,'.')
// str is: Alexander S.........
// size of str is: 20


rfind 1.

#include <iostream>
#include <string>
using namespace std;

int main () 
{
    string str = "We go step by step to the target";
    string s1  = "step";
    cout << "str is: " << str << endl;
    cout << "s1  is: " << s1  << endl;

    cout << "int n1 = str.find(s1)" << endl;
    int n1 = str.find(s1);
    cout << "n1 = " << n1+1 << endl;
    
    cout << "int n2 = str.rfind(s1)" << endl;
    int n2 = str.rfind(s1);
    cout << "n2 = " << n2+1 << endl;
    
    cout << "n3 = str.rfind(s1,n2-1)" << endl;
    int n3 = str.rfind(s1,n2-1);
    cout << "n3 = " << n3+1 << endl;

    cout << "n1 = str.rfind('t')" << endl;
    n1 = str.rfind('t');
    cout << "n1 = " << n1+1 << endl;
    
    cout << "n2 = str.rfind('t',n1-1)" << endl;
    n2 = str.rfind('t',n1-1);
    cout << "n2 = " << n2+1 << endl;
    
    char ch[] = "step";
    cout << "char ch[] = \"step\"" << endl;
    cout << "n1 = str.rfind(ch)" << endl;
    n1 = str.rfind(ch);
    cout << "n1 = " << n1+1 << endl;
    
    cout << "n2 = str.rfind(\"stabc\",10,2)" << endl;
    n2 = str.rfind("stabc", // pattern
            10,             // start position
            2);             // for first 2 char
                            // in pattern
    cout << "n2 = " << n2+1 << endl;
    
    return 0;
}
OUTPUT:
// str is: We go step by step to the target
// s1  is: step
// int n1 = str.find(s1)
// n1 = 7
// int n2 = str.rfind(s1)
// n2 = 15
// n3 = str.rfind(s1,n2-1)
// n3 = 7
// n1 = str.rfind('t')
// n1 = 32
// n2 = str.rfind('t',n1-1)
// n2 = 27
// char ch[] = "step"
// n1 = str.rfind(ch)
// n1 = 15
// n2 = str.rfind("stabc",10,2)
// n2 = 7


size 1.

#include <iostream>
#include <string>
using namespace std;

int main () 
{
    string str = "We go step by step to the target";
    string::size_type size = str.size();

    cout << "str is: " << str << endl;
    cout << "size of str = " << size << endl;
    
    return 0;
}
OUTPUT:
// str is: We go step by step to the target
// size of str = 32


substr 1.

// str.subsr(pos,n); // returns a copy of the substring consisting // of n characters from str, beginning at position pos // (default value 0); if n is too large or is omitted, // characters are copied only until the end of s is // reached

#include <iostream>
#include <string>
using namespace std;

int main () 
{
    string str = "We go step by step to the target";
    cout << "str is: " << str << endl;

    int n = str.find("step");
    
    string s = str.substr(n);
    cout << "s   is: " << s << endl;

    s = str.substr(n,12);
    cout << "s   is: " << s << endl;
    
    return 0;
}
OUTPUT:
// str is: We go step by step to the target
// s   is: step by step to the target
// s   is: step by step


swap 1.

#include <iostream>
#include <string>
using namespace std;

int main () 
{
    string str1 = "Robert";
    string str2 = "Forest";
    cout << "str1 is: " << str1 << endl;
    cout << "str2 is: " << str2 << endl;
    cout << endl;

    cout << "str1.swap(str2)" << endl;
    cout << endl;

    str1.swap(str2);
    cout << "str1 is: " << str1 << endl;
    cout << "str2 is: " << str2 << endl;
    
    return 0;
}
OUTPUT:
// str1 is: Robert
// str2 is: Forest
// 
// str1.swap(str2)
// 
// str1 is: Forest
// str2 is: Robert

"
```

### 4.1.4 String class example

```text
Simple example of a program using string class and comparison with C char:

    view source
    print?
    01	#include <string>
    02	#include <iostream>
    03	#include <string.h>   // Required by strcpy()
    04	#include <stdlib.h>   // Required by malloc()
    05	 
    06	using namespace std;
    07	 
    08	main()
    09	{
    10	   string SS;     // C++ STL string
    11	   char CC[17];   // C character string (16 characters + NULL termination)
    12	                  // Storage pre-allocated
    13	   char *CC2;     // C character string. No storage allocated.
    14	 
    15	   SS = "This is a string";
    16	   strcpy(CC,"This is a string");
    17	 
    18	   CC2 = (char *) malloc(17);    // Allocate memory for storage of string.
    19	   strcpy(CC2,"This is a string");
    20	  
    21	   cout << SS << endl;
    22	   cout << CC << endl;
    23	   cout << CC2 << endl;
    24	}
    Results:

    This is a string
    This is a string
    This is a string

    The C and C++ methods of managing a character data type are both valid but we will see that the C++ string class offers more functionality and convenience. The STL string does not require memory to be pre-allocated nor allocated manually. The STL string class also provides many methods of string assignment. 

Example of a program using many of the build-in functions of the string class:

    view source
    print?
    01	#include <string>
    02	#include <iostream>
    03	 
    04	using namespace std;
    05	 
    06	main()
    07	{
    08	   string a("abcd efg");
    09	   string b("xyz ijk");
    10	   string c;
    11	 
    12	   cout << a << " " << b << endl;                        // Output: abcd efg xyz ijk
    13	 
    14	   cout << "String empty: "    << c.empty()    << endl;  // String empty: 1
    15	                                                         // Is string empty? Yes it is empty. (TRUE)
    16	   c = a + b;                                            // concatenation
    17	   cout << c << endl;                                    // abcd efgxyz ijk
    18	   cout << "String length: "   << c.length()   << endl;  // String length: 15
    19	   cout << "String size: "     << c.size()     << endl;  // String size: 15
    20	   cout << "String capacity: " << c.capacity() << endl;  // String capacity: 15
    21	   cout << "String empty: "    << c.empty()    << endl;  // String empty: 0
    22	                                                         // Is string empty? No it is NOT empty. (FALSE)
    23	   string d = c;
    24	   cout << d << endl;                                    // abcd efgxyz ijk
    25	 
    26	                                                         // First character: a
    27	   cout << "First character: " << c[0] << endl;          // Strings start with index 0 just like C.
    28	 
    29	   string f("    Leading and trailing blanks      ");
    30	   cout << "String f:" << f << endl;
    31	   cout << "String length: " << f.length() << endl;      // String length: 37
    32	   cout << "String f:" << f.append("ZZZ") << endl;       // String f:    Leading and trailing blanks      ZZZ
    33	   cout << "String length: " << f.length() << endl;      // String length: 40
    34	 
    35	   string g("abc abc abd abc");
    36	   cout << "String g: " << g << endl;                    // String g: abc abc abd abc
    37	   cout << "Replace 12,1,\"xyz\",3: " << g.replace(12,1,"xyz",3) << endl;  // Replace 12,1,"xyz",3: abc abc abd xyzbc
    38	   cout << g.replace(0,3,"xyz",3) << endl;               // xyz abc abd xyzbc
    39	   cout << g.replace(4,3,"xyz",3) << endl;               // xyz xyz abd xyzbc
    40	   cout << g.replace(4,3,"ijk",1) << endl;               // xyz i abd xyzbc
    41	   cout << "Find: " << g.find("abd",1) << endl;          // Find: 6
    42	   cout << g.find("qrs",1) << endl;
    43	 
    44	   string h("abc abc abd abc");
    45	   cout << "String h: " << h << endl;
    46	   cout << "Find \"abc\",0: " << h.find("abc",0) << endl; // Find "abc",0: 0
    47	   cout << "Find \"abc\",1: " << h.find("abc",1) << endl; // Find "abc",1: 4
    48	   cout << "Find_first_of \"abc\",0: " << h.find_first_of("abc",0) << endl; // Find_first_of "abc",0: 0
    49	   cout << "Find_last_of \"abc\",0: " << h.find_last_of("abc",0) << endl;   // Find_last_of "abc",0: 0
    50	   cout << "Find_first_not_of \"abc\",0: " << h.find_first_not_of("abc",0) << endl;  // Find_first_not_of "abc",0: 3
    51	   cout << "Find_first_not_of \" \": " << h.find_first_not_of(" ") << endl;  // Find_first_not_of " ": 0
    52	   cout << "Substr 5,9: " << h.substr(5,9) << endl;       // Substr 5,9: bc abd ab
    53	   cout << "Compare 0,3,\"abc\": " << h.compare(0,3,"abc") << endl;  // Compare 0,3,"abc": 0
    54	   cout << "Compare 0,3,\"abd\": " << h.compare(0,3,"abd") << endl;  // Compare 0,3,"abd": -1
    55	   cout << h.assign("xyz",0,3) << endl;                   // xyz
    56	   cout << "First character: " << h[0] << endl; // Strings start with 0 // First character: x
    57	 
    58	 
    59	}

Compile: g++ program.cpp

[Potential Pitfall]: In Red Hat Linux versions 7.x one could omit the "using namespace std;" statement. Use of this statement is good programming practice and is required in Red Hat 8.0.

[Potential Pitfall]: Red Hat 8.0 requires the reference to "#include <iostream>". Red Hat versions 7.x used "#include <iostream.h>". (Also fstream, ...)

	Output: ./a.out

    abcd efg xyz ijk
    String empty: 1
    abcd efgxyz ijk
    String length: 15
    String size: 15
    String capacity: 15
    String empty: 0
    abcd efgxyz ijk
    First character: a
    String f:    Leading and trailing blanks      
    String length: 37
    String f:    Leading and trailing blanks      ZZZ
    String length: 40
    String g: abc abc abd abc
    Replace 12,1,"xyz",3: abc abc abd xyzbc
    xyz abc abd xyzbc
    xyz xyz abd xyzbc
    xyz i abd xyzbc
    Find: 6
    4294967295
    String h: abc abc abd abc
    Find "abc",0: 0
    Find "abc",1: 4
    Find_first_of "abc",0: 0
    Find_last_of "abc",0: 0
    Find_first_not_of "abc",0: 3
    Find_first_not_of " ": 0
    Substr 5,9: bc abd ab
    Compare 0,3,"abc": 0
    Compare 0,3,"abd": -1
    xyz
    First character: x

	
[Potential Pitfall]: There have been some changes in the behavior of the string class from Red Hat 7.x to Red Hat 8.0:

    * The compare function arguments have changed from X.compare("string",int-1, int-2); to X.compare(int-1, int-2, "string");
    * The return value of the compare function call h.compare("abc",0,3) in 7.x was 12. In Red Hat 8.0 h.compare(0,3,"abc") it is 0.
    * String capacity function call "c.capacity()" is 15. The returned value in Red Hat 7.x was 16.

String class functions:

    * Constructors:

          view source
          print?
          1	string sVar1("abc");
          2	string sVar1(C-string-variable);
          3	string sVar2(10," ");  // Generate string initialized to 10 blanks.
          4	string sVar3(Var1, string-index);  // Initialize with characters from string starting with index string-index.
          5	string sVar4(iterator-index-begin, iterator-index-end)

    * Destructor:

          view source
          print?
          1	Var.~string();         // Destructor

    * Replace:
          o Var.replace(beginning,end-position,string-class-variable)
          o Var.replace(beginning,end-position,C-char-variable)
          o Var.replace(beginning,end-position,string-class-variable,length)
          o Var.replace(beginning,end-position,integer-number,single-char)
          o Var.replace(beginning,end-position,new-beginning-porition,new-end-position)

      Code samples:

          view source
          print?
          01	string g("abc abc abd abc");
          02	cout << g.replace(4,1,"ijk",3) << endl;
          03	 
          04	string h("abc abc abd abc");
          05	cout << h.replace(4,6,"ijk",3) << endl;
          06	 
          07	string k("abc abc abd abc");
          08	cout << k.replace(4,3,"ijk",3) << endl;
          09	  
          10	string l("abc abc abd abc");
          11	cout << k.replace(12,1,"xyz",3) << endl;

      Output:

          abc ijkbc abd abc - Beginning with the 4th index (character number 5) replace one character with 3 characters from string "ijk"
          abc ijkd abc
          abc ijk abd abc
          abc abc abd xyzbc 

    * Find: (also rfind(), find_first_of(), find_last_of(), find_first_not_of(), find_last_not_of())

      Arguments/parameters:
          o Val.find(const string& argument)
            Find first occurence of argument within string Val
          o find(const string& argument, size_type index)
            Find first occurence of argument within string Val starting search from position index.
          o find(const char* argument)
          o find(const char* argument, size_type index)
          o find(const char* argument, size_type index, size_type length)
            Find first occurence of argument within string Val starting search from position index and search for length number of characters.

STL C++ string functions:
Assuming declaration: string Var;

    Function/Operation 	Description
    Var = string2
    Var.assign("string-to-assign") 	Assignment of value to string. When assigning a C "char" data type, first check if NULL to avoid failure/crash.
    i.e.: if( szVar ) sVar.assign( szVar );
    where szVar is a C "char *" data type and sVar is of type "string".
    Var.swap(string2)
    swap(string1,string2) 	Swap with value held in string2.
    Function swap will exchange contents of two string class variables.
    Var += string2
    Var.append()
    Var.push_back() 	Append string/characters.
    Var.insert() 	Insert characters
    Var.erase()
    Var = "" 	Clear string variable. No arguments necessary.
    + 	Concatenate
    ==, !=, <, <=, >, >= 	Compare strings.
    Var.compare(string)
    Var.compare( size_t pos1, size_t len, string ) const;
    Var.compare( size_t pos1, size_t len1, const string, size_t pos2, size_t len2 ) const; 	Compare strings. Returns int:

        * 0: if equal.
        * -1: Not equal. 1st non matching character in Var is less in value based on ASCII table than in compare string.
        * +1: Not equal. 1st non matching character is greater in value based on ASCII table.

    Where string is another STL string or null terminated C string.
    Var.length() 	Return length of string. No arguments necessary. The methods length(), size() and capacity() all return the same value.
    Var.size() 	Return length of string. No arguments necessary.
    Var.capacity() 	Return length of string + 1. Red Hat 7.x. Red Hat 8.0+ returns the number of characters without the "+1". Number of characters that can be held without re-allocation.
    No arguments necessary.
    Var.max_size() 	Returns a very large number. No arguments necessary.
    Var.empty() 	Returns 1 if an empty string.
    Returns 0 if not empty.
    << 	Output stream
    >>
    getline() 	Input stream
    Var.c_str() 	Returns C string pointer. C char string is null terminated. Do not free memory using this pointer!
    Var.data() 	Returns C string pointer. C char string is NOT null terminated. Do not free memory using this pointer!
    Var[]
    Var.at(integer) 	Access individual characters. Return single character at specified position (integer).
    Var.find(string)
    Var.find(string, positionFirstChar)
    Var.find(string, positionFirstChar, len) 	Find first occurance of string or substring. Returns int position of first occurance in string. Where len is the length of the sequence to search for.
    Returns string::npos if not found.
    i.e. if(Var.find("abc") == string::npos) cout << "Not found" << endl;
    Var.rfind() 	Find last occurance of string or substring.
    Var.find_first_of(string, position)
    Var.find_first_of( string, size_t position, size_t len ) 	Find strings and substrings.
    Where string is another STL string or null terminated C string.
    If position = 0, than start at beginning of string.
    Var.find_last_of() 	Find strings and substrings.
    Var.find_first_not_of()
    Var.find_last_not_of() 	Find strings and substrings.
    Var.replace(pos1, len1, string)
    Var.replace(itterator1, itterator2, const string)
    Var.replace(pos1, len1, string, pos2, len2) 	Replace section of string with new characters.
    pos2 and len2 are given when using only a substring of string. Where string is another STL string or null terminated C string.
    Var.substr(pos, len) 	Return substring of text given a start position in string object and length.
    Var.begin()
    Var.end() 	Iterators
    Var.rbegin()
    Var.rend() 	Reverse iterators

Note that in most cases the string functions have been overloaded to accept both string class arguments and C char variables.

ANSI C++ string class iterators:

Iterators provide the ability to access the individual characters in a string.

    view source
    print?
    01	#include <iostream>
    02	#include <string>
    03	using namespace std;
    04	    
    05	int main()
    06	{
    07	   string alphabetLC="abcdefghijklmnopqrstuvwxyz";
    08	 
    09	   string::const_iterator cii;
    10	   int ii;
    11	 
    12	   for(cii=alphabetLC.begin(); cii!=alphabetLC.end(); cii++)
    13	   {
    14	      cout << ii++ << " " << *cii << endl;
    15	   }
    16	}
    This will print the integer position in the string followed by the letter for all characters in the alphabet.

    0 a
    1 b
    2 c
    3 d
    4 e
    5 f
    6 g
    7 h
    ...
    ..

Iterator types:

    * string::traits_type
    * string::value_type
    * string::size_type
    * string::difference_type
    * string::reference
    * string::const_reference
    * string::pointer
    * string::const_pointer
    * string::iterator
    * string::const_iterator
    * string::reverse_iterator
    * string::const_reverse_iterator
    * string::npos

ANSI C++ string class and the C standard library:

The full use of the C standard library is available for use by utilizing the ".c_str" function return of the string class.

    view source
    print?
    01	#include <strings.h>
    02	#include <string>
    03	#include <stdio.h>
    04	using namespace std;
    05	    
    06	int main()
    07	{
    08	   char *phrase1="phrase";
    09	   string phrase2("Second phrase");
    10	   char  phraseA[128];
    11	   char  *phraseB;
    12	    
    13	   strcpy(phraseA,phrase2.c_str());
    14	   phraseB = strstr(phrase2.c_str(),phrase1);
    15	 
    16	   printf("phraseA: %s\n",phraseA);
    17	   printf("phraseB: %s\n",phraseB);
    18	   printf("phrase2: %s\n",phrase2.c_str());
    19	}  

Compile and run:

    [prompt]$ g++ test.cpp
    [prompt]$ ./a.out
    phraseA: Second phrase
    phraseB: phrase
    phrase2: Second phrase

Using ostringstream and an internal write:

In memory I/O string processing used as a data type conversion. This can also be used to make use of formatting of output in memory.

File: int2string.cpp

    view source
    print?
    01	#include <iostream>
    02	#include <sstream>
    03	#include <string>
    04	using namespace std;
    05	  
    06	string int2string(const int& number)
    07	{
    08	   ostringstream oss;
    09	   oss << number;
    10	   return oss.str();
    11	}
    12	  
    13	main()
    14	{
    15	   int number=7878;
    16	   string test="SSSSS";
    17	   test += int2string(number);
    18	   cout << test << endl;
    19	}

Compile and run:

        [prompt]$ g++ int2string.cpp
        [prompt]$ a.out
        SSSSS7878
        

[Potential Pitfall]: Returned string value must be used right away without other memory being set as string destructor will free the memory associated with its contents. It is much safer for the function to return a char data type or pass the string reference as an argument. 	
Using istringstream and an internal read:

This is used to make use of reading and parsing a string in memory. It will also allow data type conversion from a string to the type read.

File: test.cpp

    view source
    print?
    01	#include <iostream>
    02	#include <sstream>
    03	#include <string>
    04	using namespace std;
    05	  
    06	main()
    07	{
    08	   string test="AAA 123 SSSSS 3.141592654";
    09	   istringstream totalSString( test );
    10	   string string1, string2;
    11	   int    integer1;
    12	   double PI;
    13	 
    14	   totalSString >> string1 >> integer1 >> string2 >> PI;
    15	    
    16	   cout << "Individual parsed variables:" << endl;
    17	   cout << "First string:  " << string1   << endl;
    18	   cout << "First integer: " << integer1  << endl;
    19	   cout << "Value of PI:   " << PI        << endl;
    20	}

Compile and run:

        [prompt]$ g++ test.cpp
        [prompt]$ a.out
        Individual parsed variables:
        First string:  AAA
        First integer: 123
        Value of PI:   3.14159
        

Code snipets:

    * Read lines from standard input:
      view source
      print?
      01	while( getline(std::cin, sLine) )
      02	{
      03	   if( sLine.empty() );                     // Ignore empty lines
      04	   else
      05	   {
      06	      cout << sLine[0] << sLine[1] << endl;
      07	      ....
      08	      ...
      09	   }
      10	}
    * Read lines from input file:
      view source
      print?
      01	#define SYS_CONFIG_FILE "/etc/file.conf"
      02	#include <string>
      03	#include <algorithm>
      04	#include <vector>
      05	#include <cctype>
      06	#include <iostream>
      07	#include <fstream>
      08	 
      09	using namespace std;
      10	 
      11	string::size_type posBeginIdx, posEndIdx;
      12	string::size_type ipos=0;
      13	string            sLine, sValue;
      14	string            sKeyWord;
      15	const string      sDelim( ":" );
      16	 
      17	ifstream myInputFile(SYS_CONFIG_FILE, ios::in);
      18	if( !myInputFile )
      19	{
      20	   sError = "File SYS_CONFIG_FILE could not be opened";
      21	   return sError; // ERROR
      22	}
      23	 
      24	while( getline(myInputFile,sLine) )
      25	{
      26	   if( sLine.empty() );                     // Ignore empty lines
      27	   else
      28	   {
      29	      posEndIdx = sLine.find_first_of( sDelim );
      30	      sKeyWord  = sLine.substr( ipos, posEndIdx ); // Extract word
      31	      posBeginIdx = posEndIdx + 1;  // Beginning of next word (after ':')
      32	   ....
      33	   ...
      34	   }
      35	}
    * Strip blank characters:
      view source
      print?
      01	void
      02	stripLeadingAndTrailingBlanks(string& StringToModify)
      03	{
      04	   if(StringToModify.empty()) return;
      05	 
      06	   int startIndex = StringToModify.find_first_not_of(" ");
      07	   int endIndex = StringToModify.find_last_not_of(" ");
      08	   string tempString = StringToModify;
      09	   StringToModify.erase();
      10	 
      11	   StringToModify = tempString.substr(startIndex, (endIndex-startIndex+ 1) );
      12	}

The String Class and Debugging in GDB:

The first thing you will notice when using the C++ string class is that you can't de-reference any of the string class variables directly with GDB, ddd,... One must create a helper routine (for older versions of gdb) or use string class funtions (newer versions of gdb) to print out the value of the string variable.

    view source
    print?
    01	#include <string>
    02	#include <iostream>
    03	 
    04	using namespace std;
    05	 
    06	// Helper routine ps to print a string class variable.
    07	 
    08	void ps(string& s){ cout << s << endl; }
    09	 
    10	int main()
    11	{
    12	   string a("String A");
    13	   string b;
    14	 
    15	   b = "String B";
    16	 
    17	   cout << "Hello!" << endl;
    18	}

Compile program with symbolic code for the debugger: g++ -g testprog.cpp

Start gdb debugger: gdb ./a.out

    (gdb) l 1,18                             - List lines 1 to 18
    1       #include <string>
    2       #include <iostream>
    3
    4       using namespace std;
    5
    6       // Helper routine ps to print a string class variable.
    7
    8       void ps(string& s){ cout << s << endl; }
    9
    10      int main()
    11      {
    12         string a("String A");
    13         string b;
    14
    15         b = "String B";
    16
    17         cout << "Hello!" << endl;
    18      }
    (gdb) break 17
    Breakpoint 1 at 0x804893b: file testprog.cpp, line 17.
    (gdb) run
    Starting program: /home/user1/a.out

    Breakpoint 1, main () at testprog.cpp:17
    17         cout << "Hello!" << endl;
    (gdb) p a                                - Gdb can't de-reference string class variable "a" 
    $1 = {static npos = Cannot access memory at address 0x83a32d0
    (gdb) call ps(a)
    String A                                 - Call helper function ps to print string conents.
    (gdb) call ps(b)
    String B
    (gdb) c
    Continuing.
    Hello!

    Program exited normally.
    (gdb) quit
        

With newer versions of gdb, one may use built-in string class functions:

    (gdb) p a.c_str()
    $1 = 0x8049e34 "String A"
    (gdb) p b.c_str()
    $3 = 0x8049e4c "String B"
    (gdb) p b.empty()
    $2 = false
    (gdb) p b.size()
    $4 = 8
        

Dereference string and wstring using GDB macro functions. See YoLinux.com GDB tutorial on dereferencing STL strings and containers.

Tips:

    * The string class is NOT a native data type, it is an object class and thus can not be handled like the traditional pointer to variable in gdb.
    * One can pass strings by reference (i.e. argument declarations using (string& variable-name )), by value (string variable-name ), and by pointer (string *variable-name ).
    * When using a reference, one may mimic the protection of a variable that passing by value enables by using (const string& variable-name )
```

### 4.1.5 Get bytes from std::string in C++

```text
If you just need read-only access, then c_str will do it:

char const *c = myString.c_str();

If you need read/write access, then you can copy the string into a vector. vectors manage dynamic memory for you. You don't have to mess with allocation/deallocation then:

std::vector<char> bytes(myString.begin(), myString.end());
bytes.push_back('\0');
char *c = &bytes[0];

-	If he wants a byte array does he need the terminating '\0'? In which case you can use data() for read only. 

- data()

public member function
std::string::data
<string>

const char* data() const;

Get string data
Returns a pointer to an array of characters with the same content as the string.

Notice that no terminating null character is appended (see member c_str for such a functionality).

The returned array points to an internal location which should not be modified directly in the program. Its contents are guaranteed to remain unchanged only until the next call to a non-constant member function of the string object.

Parameters
none

Return Value
Pointer to an internal array containing the same content as the string.

Example

// string::data
#include <iostream>
#include <string>
using namespace std;

int main ()
{
  int length;

  string str = "Test string";
  char* cstr = "Test string";

  if ( str.length() == strlen (cstr) )
  {
    cout << "str and cstr have the same length.\n";

    length = str.length();

    if ( memcmp (cstr, str.data(), length ) == 0 )
      cout << "str and cstr have the same content.\n";
  } 
  return 0;
}



Output:

str and cstr have the same length.
str and cstr have the same content.


Basic template member declaration
( basic_string<charT,traits,Allocator> )

 

	

const charT* data ( ) const;



See also

string::copy
    Copy sequence of characters from string (public member function)

string::c_str
    Get C string equivalent (public member function)

string::assign
    Assign content to string (public member function)


-
```

### 4.1.7 std::string reference

```text
typedef basic_string<char> string;
String class
Strings are objects that represent sequences of characters.

The standard string class provides support for such objects with an interface similar to that of a standard container of bytes, but adding features specifically designed to operate with strings of single-byte characters.

The string class is an instantiation of the basic_string class template that uses char (i.e., bytes) as its character type, with its default char_traits and allocator types (see basic_string for more info on the template).

Note that this class handles bytes independently of the encoding used: If used to handle sequences of multi-byte or variable-length characters (such as UTF-8), all members of this class (such as length or size), as well as its iterators, will still operate in terms of bytes (not actual encoded characters).

Member types
member type	definition
value_type	char
traits_type	char_traits<char>
allocator_type	allocator<char>
reference	char&
const_reference	const char&
pointer	char*
const_pointer	const char*
iterator	a random access iterator to char (convertible to const_iterator)
const_iterator	a random access iterator to const char
reverse_iterator	reverse_iterator<iterator>
const_reverse_iterator	reverse_iterator<const_iterator>
difference_type	ptrdiff_t
size_type	size_t

Member functions
(constructor)
Construct string object (public member function )
(destructor)
String destructor (public member function )
operator=
String assignment (public member function )

Iterators:
begin
Return iterator to beginning (public member function )
end
Return iterator to end (public member function )
rbegin
Return reverse iterator to reverse beginning (public member function )
rend
Return reverse iterator to reverse end (public member function )
cbegin 
Return const_iterator to beginning (public member function )
cend 
Return const_iterator to end (public member function )
crbegin 
Return const_reverse_iterator to reverse beginning (public member function )
crend 
Return const_reverse_iterator to reverse end (public member function )

Capacity:
size
Return length of string (public member function )
length
Return length of string (public member function )
max_size
Return maximum size of string (public member function )
resize
Resize string (public member function )
capacity
Return size of allocated storage (public member function )
reserve
Request a change in capacity (public member function )
clear
Clear string (public member function )
empty
Test if string is empty (public member function )
shrink_to_fit 
Shrink to fit (public member function )

Element access:
operator[]
Get character of string (public member function )
at
Get character in string (public member function )
back 
Access last character (public member function )
front 
Access first character (public member function )

Modifiers:
operator+=
Append to string (public member function )
append
Append to string (public member function )
push_back
Append character to string (public member function )
assign
Assign content to string (public member function )
insert
Insert into string (public member function )
erase
Erase characters from string (public member function )
replace
Replace portion of string (public member function )
swap
Swap string values (public member function )
pop_back 
Delete last character (public member function )

String operations:
c_str
Get C string equivalent (public member function )
data
Get string data (public member function )
get_allocator
Get allocator (public member function )
copy
Copy sequence of characters from string (public member function )
find
Find content in string (public member function )
rfind
Find last occurrence of content in string (public member function )
find_first_of
Find character in string (public member function )
find_last_of
Find character in string from the end (public member function )
find_first_not_of
Find absence of character in string (public member function )
find_last_not_of
Find non-matching character in string from the end (public member function )
substr
Generate substring (public member function )
compare
Compare strings (public member function )

Member constants
npos
Maximum value for size_t (public static member constant )

Non-member function overloads
operator+
Concatenate strings (function )
relational operators
Relational operators for string (function )
swap
Exchanges the values of two strings (function )
operator>>
Extract string from stream (function )
operator<<
Insert string into stream (function )
getline
Get line from stream into string (function )
		4.1.8
```
