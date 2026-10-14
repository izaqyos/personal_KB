---
type: reference
title: "FAQ, Cookbook"
description: "C++ FAQ and cookbook, including a worked example of parsing a simple text file."
tags: [cpp, faq, examples, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-cpp#20"
---

# FAQ, Cookbook

[↑ kb-cpp](/kb-cpp/README.md)

## 20.1 How to parse a simple text file

### 20.1.1 my example

```text
/*
 * =====================================================================================
 *
 *       Filename:  parseSimpleFile.cpp
 *
 *    Description:  parse simple text file - diskQuotas.cfg example
 *
 *        Version:  1.0
 *        Created:  01/10/12 14:24:06
 *       Revision:  none
 *       Compiler:  gcc
 *
 *         Author:  Yosi Izaq (), <email>
 *        Company:  <employer>
 *
 * =====================================================================================
 */
#include <iostream>
#include <fstream>
#include <string>
#include <vector>

using namespace std;


//split for single length 1 delimiter
int split( vector<string> & theStringVector,  /* Altered/returned value */ const  string  & theString, const  string  & theDelimiter )
{
  assert( (theDelimiter.size() > 0 ) &&  "Delimiter must be longer than 0" ); 

  size_t  start = 0, end = 0;

  while ( end != string::npos )
  {
    end = theString.find( theDelimiter, start );

      // If at end, use length=maxLength.  Else use length=end-start.
    theStringVector.push_back( theString.substr( start,
                   (end == string::npos) ? string::npos : end - start ) );

      // If at end, use start=maxSize.  Else use start=end+delimiter.
    start = (   ( end > (string::npos - theDelimiter.size()) )
              ?  string::npos  :  end + theDelimiter.size()    );
  }
}

/* 
//--------------------------------------------------------------------------------
//tokenizer for multiple delimiters, like all whitespace
//Header file
class Tokenizer 
{
    public:
        static const std::string DELIMITERS;
        Tokenizer(const std::string& str);
        Tokenizer(const std::string& str, const std::string& delimiters);
        bool NextToken();
        bool NextToken(const std::string& delimiters);
        const std::string GetToken() const;
        void Reset();
    protected:
        size_t m_offset;
        const std::string m_string;
        std::string m_token;
        std::string m_delimiters;
}

//CPP file
const string Tokenizer::DELIMITERS(" \t\n\r");

Tokenizer::Tokenizer(const std::string& s) :
    m_string(s), 
    m_offset(0), 
    m_delimiters(DELIMITERS) {}

Tokenizer::Tokenizer(const std::string& s, const std::string& delimiters) :
    m_string(s), 
    m_offset(0), 
    m_delimiters(delimiters) {}

bool Tokenizer::NextToken() 
{
    return NextToken(m_delimiters);
}

bool Tokenizer::NextToken(const std::string& delimiters) 
{
    size_t i = m_string.find_first_not_of(delimiters, m_offset);
    if (string::npos == i) 
    {
        m_offset = m_string.length();
        return false;
    }

    size_t j = m_string.find_first_of(delimiters, i);
    if (string::npos == j) 
    {
        m_token = m_string.substr(i);
        m_offset = m_string.length();
        return true;
    }

    m_token = m_string.substr(i, j - i);
    m_offset = j;
    return true;
}

//--------------------------------------------------------------------------------
 */

int main()
{
	cout << "Starting Parser\n";
	const string fname = "diskQuotas.cfg";
	string word1, word2, line;
	int num;
	//
  //check to see if the file is opened:
	ifstream myfile(fname.c_str());
  if (myfile.is_open())
  {
    //while there are still lines in the
    //file, keep reading:
    while (! myfile.eof() )
    {
      //place the line from myfile into the
      //line variable:
      getline (myfile,line);

      if (line[0] == '#') // ~='^#'
      {
	      cout <<"found comment line: "<<endl<<line<<endl;
      }
      else
      {

	//ToDo, if not start # then sscanf %s %s %d
      	//display the line we gathered:
      	cout << line << endl;

	 vector<string> v;

	 // using split - work 4 single space
	  //split( v, line , " " );

//      //using tokenizer
//	Tokenizer s(line);
//	while (s.NextToken())
//	{
//		v.push_back(s.GetToken());
//	}
//
//
//#define SHOW(I,X)   cout << "[" << (I) << "]\t " # X " = \"" << (X) << "\"" << endl
//	  for( unsigned int i = 0;  i < v.size();   i++ )
//	    SHOW( i, v[i] );

	 int length = 0;
	 char buffer[256];
	 int token_num = 0;
	 string LOCAL_STORE_KEYWORD="local-store";
	 length = line.copy(buffer, line.length());
	char *p = strtok(buffer, " \t\n\r");
	if ( ! LOCAL_STORE_KEYWORD.compare(p) )
	{
		printf ("Found local store configuration line");

		while (p) {
		    printf ("Token: %s\n", p);
		    token_num++;
		    if (token_num == 3){
			    printf ("Local store quota is %d \n", atoi(p));
		    }
		    p = strtok(NULL, " ");
		}
	}

// Print all words in all lines
//	while (p) {
//	    printf ("Token: %s\n", p);
//	    p = strtok(NULL, " ");
//	}
      }
    }

    //close the stream:
    myfile.close();
  }

  else cout << "Unable to open file";

	//ifstream ifs(fname.c_str());
	/*
	if (!ifs){
		cout<< "can't open file "<< fname <<" \n";
		return 1;
	}

	// read a line using the extraction operator
	if(ifs >> word1 >> word2 >> num) {
		cout << "reading content line\n";

		cout << "[ "
		<< word1 << ' '
		<< word2 << ' '
		<< num << " ]"
		<< endl;
	}
	else {

		char line_s [255];
		cout << "reading line\n";
		ifs.getline(line_s, 255) ;
		if (ifs) cout << "[ " << line_s << " ]" << endl;
	
	}
	// discard whitespace
	//ifs.ignore(10000,'\n');
	// read a line using getline
	if(getline(ifs,line)) {
		cout << "[ " << line << " ]" << endl;
	}
  */
	return 0;
}

running output:

$ a.exe 
Starting Parser
found comment line: 
#File type,     The limit ( of disk size) or Fix, The actual limit
ade-log Fix 50
monit-log Fix 55
mgmt-audit-log 0.015 55
mgmt-log 0.281 1000
apache-log Fix 55
rt-log 0.281 1000
rt-config-cache Fix 1000
rt-core Fix 2000
local-store 26.74 95000
Found local store configuration lineToken: local-store
Token: 26.74
Token: 950000
Local store quota is 950000 
acs-db Fix 3000
acs-db-log Fix 100
acs-db-err-log Fix 100
view-log Fix 155
view-db 42.23 150000
view-db-log Fix 100
centrify-system Fix 50
ad-agent-log Fix 55
backup 29.562 105000
backup-log Fix 50
backup-success-log Fix 50
patch Fix 1000
upgrade-log Fix 55

		20.1.2
```

## 20.2 Compilation errors

### 20.2.1 stray '\xxx' in program

```text
$ g++ buffer_overflow.cpp 
buffer_overflow.cpp:1: error: stray '\239' in program
buffer_overflow.cpp:1: error: stray '\187' in program
buffer_overflow.cpp:1: error: stray '\191' in program

xxx is decimal value. 
convert to hex (239 -> ef) and search & remove in hex editor
Transform vim into a hex editor by doing [escape] :%!xxd
you need to do switch back to ASCII using ´:%!xxd -r´ before you save

didn't work for me. I used hexedit, TAB to go to ascii, overwrite the (windows Notepad inserted UTF-8) three bytes w/ spaces. F2, ctrl-x
```

## 20.3 Initializing private static members

```text
in header put declaration:
static string               m_hostname; 

in cpp put initialization:
string LdapSslContext::m_hostname = "";

	20.4 Is there a GCC preprocessor directive to check if the code is being compiled on a 64 bit machine?
 10 down vote favorite
3
	

I am trying to do something like the following;

#ifdef 64-bit
    #define DECIMAL_FORMAT %ld
#else
    #define DECIMAL_FORMAT %d
#endif
.
intptr_t d;  
.
printf(“Some message with DECIMAL_FORMAT in the middle of it\n”, d);

The variable 'd' being of the type 'intptr_t' needs '%d' format specifier on 32 bit machines and format specifier '%ld' on 64 bit machines. I am looking a solution to be able to compile the code on both 32 bit machines and 64 bit machines without making changes to the GCC command line or the source code.

-------------                 ---------------    -----------------------
I think __LP64__ might be what you're looking for. See http://gcc.gnu.org/onlinedocs/gcc-4.1.2/cpp/Common-Predefined-Macros.html

Maybe a better way to go, though, is to use the %p specifier to printf() instead of %ld or %d. Then you don't even have to worry what your pointer size is.

-------------                 ---------------    -----------------------
 6 down vote
	

You want to use the PRI* macros defined in inttypes.h. You enable them by defining __STDC\_FORMAT\_MACROS. You can then use

 intptr_t d = ... ;
 printf("This is an intptr_t: %" PRIxPTR "\n", d);

The PRIxPTR macro will expand to llx if __WORDSIZE == 64, and lx or x otherwise.
share|improve this answer
	
edited Oct 8 '11 at 12:18
TonyK
6,845830
	
answered Mar 25 '09 at 22:05
JesperE
27.4k260117
	
	
+1 really cool. However, the results on my x86-64 Debian system are slightly different. "echo __WORDSIZE | g++ -xc++ -include limits.h -P -E -" returns 64. "echo PRIxPTR | g++ -xc++ -D__STDC_FORMAT_MACROS -include inttypes.h -E - | tail -1" returns "l" "x". – sigjuice Mar 26 '09 at 8:41

-------------                 ---------------    -----------------------
```

## 20.5 list .so symbols

```text
The standard tool for listing symbols is nm, you can use it simply like this:

nm -g yourLib.so
If you want to see symbols of a C++ library, add the "-C" option which demangle the symbols (it's far more readable demangled).

nm -gC yourLib.so
If your .so file is in elf format, you will have to use readelf program to extract symbol information from the binary.

readelf -Ws /usr/lib/libexample.so
You only should extract those that are defined in this .so file, not in the libraries referenced by it. Seventh column should contain a number in this case. You can extract the corresponding lines with awk:

readelf -Ws /usr/lib/libstdc++.so.6 | awk '{print $8}';
```

## 20.6 Link/Load errors

### 20.6.1 error while loading shared libraries

```text
$ diag_test 
diag_test: error while loading shared libraries: libCiscoAD.so: cannot open shared object file: No such file or directory
$ ldd diag_test
        libCiscoAD.so => not found
        libstdc++.so.6 => /usr/lib64/libstdc++.so.6 (0x0000003c6b600000)
        libm.so.6 => /lib64/libm.so.6 (0x0000003c6ba00000)
        libgcc_s.so.1 => /lib64/libgcc_s.so.1 (0x0000003ef7c00000)
        libc.so.6 => /lib64/libc.so.6 (0x0000003ee6e00000)
        /lib64/ld-linux-x86-64.so.2 (0x0000003ee6a00000)

Fix, export LD_LIBRARY_PATH value so that ld sees it
ex: export LD_LIBRARY_PATH=".:/usr/local/lib:/usr/X11R6/lib:"
		20.6.2
```

## 20.7 popen2

```text
#include <sys/types.h>
#include <unistd.h>

struct popen2 {
    pid_t child_pid;
    int   from_child, to_child;
};

int popen2(const char *cmdline, struct popen2 *childinfo) {
    pid_t p;
    int pipe_stdin[2], pipe_stdout[2];

    if(pipe(pipe_stdin)) return -1;
    if(pipe(pipe_stdout)) return -1;

    printf("pipe_stdin[0] = %d, pipe_stdin[1] = %d\n", pipe_stdin[0], pipe_stdin[1]);
    printf("pipe_stdout[0] = %d, pipe_stdout[1] = %d\n", pipe_stdout[0], pipe_stdout[1]);

    p = fork();
    if(p < 0) return p; /* Fork failed */
    if(p == 0) { /* child */
        close(pipe_stdin[1]);
        dup2(pipe_stdin[0], 0);
        close(pipe_stdout[0]);
        dup2(pipe_stdout[1], 1);
        execl("/bin/sh", "sh", "-c", cmdline, 0);
        perror("execl"); exit(99);
    }
    childinfo->child_pid = p;
    childinfo->to_child = pipe_stdin[1];
    childinfo->from_child = pipe_stdout[0];
    return 0; 
}

#define TESTING
#ifdef TESTING
int main(void) {
    char buf[1000];
    struct popen2 kid;
    popen2("tr a-z A-Z", &kid);
    write(kid.to_child, "testing\n", 8);
    close(kid.to_child);
    memset(buf, 0, 1000);
    read(kid.from_child, buf, 1000);
    printf("kill(%d, 0) -> %d\n", kid.child_pid, kill(kid.child_pid, 0)); 
    printf("from child: %s", buf); 
    printf("waitpid() -> %d\n", waitpid(kid.child_pid, NULL, 0));
    printf("kill(%d, 0) -> %d\n", kid.child_pid, kill(kid.child_pid, 0)); 
    return 0;
}
#endif
```

## 20.8 What's the scope of the “using” declaration in C++?

```text
I'm using the 'using' declaration in C++ to add std::string and std::vector to the local namespace (to save typing unnecessary 'std::'s).

using std::string;
using std::vector;

class Foo { /*...*/ };
What is the scope on this declaration? If I do this in a header, will it inject these 'using' declarations into every cpp file that includes the header?


When you #include a header file in C++, it places the whole contents of the header file into the spot that you included it in the source file. So including a file that has a using declaration has the exact same effect of placing the using declaration at the top of each file that includes that header file.

Just in case it's not clear from the other answers here: - Do not put a using declaration (or using directive) at file scope in an include file/header! That will cause headaches for users of the header

But if you put the using declaration inside a namespace it's limited to the scope of that namespace, so is generally OK (with the usual caveats on your particular needs and style)
There's nothing special about header files that would keep the using declaration out. It's a simple text substitution before the compilation even starts.

You can limit a using declaration to a scope:

void myFunction()
{
   using namespace std; // only applies to the function's scope
   vector<int> myVector;
}
```

## 20.9 Why “using namespace X;” is not allowed inside class/struct level?

```text
Because the C++ standard explicitly forbids it. From C++03 §7.3.4 [namespace.udir]:

using-directive:
    using namespace ::opt nested-name-specifieropt namespace-name ;
A using-directive shall not appear in class scope, but may appear in namespace scope or in block scope. [Note: when looking up a namespace-name in a using-directive, only namespace names are considered, see 3.4.6. ]

I believe that the rationale is that it would probably be confusing. Currently, while processing a class level identifier, lookup will first search in the class scope and then in the enclosing namespace. Allowing the using namespace at class level would have quite some side effects on how the lookup is now performed. In particular, it would have to be performed sometime between checking that particular class scope and checking the enclosing namespace. That is: 1) merge the class level and used namespace level lookups, 2) lookup the used namespace after the class scope but before any other class scope, 3) lookup the used namespace right before the enclosing namespace. 4) lookup merged with the enclosing namespace.

This would make a big difference, where an identifier at class level would shadow any identifier in the enclosing namespace, but it would not shadow a used namespace. The effect would be strange, in that access to the used namespace from a class in a different namespace and from the same namespace would differ:
.

namespace A {
   void foo() {}
   struct B {
      struct foo {};
      void f() {
         foo();      // value initialize a A::B::foo object (current behavior)
      }
   };
}
struct C {
   using namespace A;
   struct foo {};
   void f() {
      foo();         // call A::foo
   }
};
Lookup right after this class scope. This would have the strange effect of shadowing base classes' members. The current lookup does not mix class and namespace level lookups, and when performing class lookup it will go all the way to the base classes before considering the enclosing namespace. The behavior would be surprising in that it would not consider the namespace in a similar level to the enclosing namespace. Again, the used namespace would be prioritized over the enclosing namespace.
.

namespace A {
   void foo() {}
}
void bar() {}
struct base {
   void foo();
   void bar();
};
struct test : base {
   using namespace A;
   void f() {
      foo();           // A::foo()
      bar();           // base::bar()
   }
};
Lookup right before the enclosing namespace. The problem with this approach is again that it would be surprising to many. Consider that the namespace is defined in a different translation unit, so that the following code cannot be seen all at once:
.

namespace A {
   void foo( int ) { std::cout << "int"; }
}
void foo( double ) { std::cout << "double"; }
struct test {
   using namespace A;
   void f() {
      foo( 5.0 );          // would print "int" if A is checked *before* the
                           // enclosing namespace
   }
};
Merge with the enclosing namespace. This would have the exact same effect that applying the using declaration at the namespace level. It would not add any new value to that, but will on the other hand complicate lookup for compiler implementors. Namespace identifier lookup is now independent from where in the code the lookup is triggered. When inside a class, if lookup does not find the identifier at class scope it will fall back to namespace lookup, but that is exactly the same namespace lookup that is used in a function definition, there is no need to maintain new state. When the using declaration is found at namespace level, the contents of the used namespace are brought into that namespace for all lookups involving the namespace. If using namespace was allowed at class level, there would be different outcomes for namespace lookup of the exact same namespace depending on where the lookup was triggered from, and that would make the implementation of the lookup much more complex for no additional value.
Anyway, my recommendation is not to employ the using namespace declaration at all. It makes code simpler to reason with without having to keep all namespaces' contents in mind.
```

## 20.10 Why do you use typedef when declaring an enum in C++?

```text
I haven't written any C++ in years and now I'm trying to get back into it. I then ran across this and thought about giving up:

typedef enum TokenType
{
    blah1   = 0x00000000,
    blah2   = 0X01000000,
    blah3   = 0X02000000
} TokenType;
What is this? Why is the typedef keyword used here? Why does the name TokenType appear twice in this declaration? How are the semantics different from this:

enum TokenType
{
    blah1 = 0x00000000,
    blah2=0x01000000,
    blah3=0x02000000
};

----------------------------------------------------------------------------------------------------

In C, declaring your enum the first way allows you to use it like so:

TokenType my_type;
If you use the second style, you'll be forced to declare your variable like this:

enum TokenType my_type;
As mentioned by others, this doesn't make a difference in C++. My guess is that either the person who wrote this is a C programmer at heart, or you're compiling C code as C++. Either way, it won't affect the behaviour of your code.
----------------------------------------------------------------------------------------------------
It's a C heritage, in C, if you do :

enum TokenType
{
    blah1   = 0x00000000,
    blah2   = 0X01000000,
    blah3   = 0X02000000
};
you'll have to use it doing something like :

enum TokenType foo;
But if you do this :

typedef enum e_TokenType
{
    blah1   = 0x00000000,
    blah2   = 0X01000000,
    blah3   = 0X02000000
} TokenType;
You'll be able to declare :

TokenType foo;
But in C++, you can use only the former definition and use it as if it were in a C typedef.
----------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------
```

## 20.11 Class members function pointers

### 20.11.1 My example

```text
- declaration:
typedef int (CAD_DNS_DIAG::*dns_testfunc)(const CAD_Test_Params & test_params, CAD_Test_Results & test_res);
typedef std::map<std::string, dns_testfunc> DNS_Test_Func_Map;
/*
 * =====================================================================================
 *        Class:  CAD_Diag_Tests
 *  Description:  AD Domain DNS relates tests and queries provider
 * =====================================================================================
 */
class CAD_Diag_Tests : public CAD_DIAG
{
        public:
                /* ====================  LIFECYCLE     ======================================= */

                ~CAD_Diag_Tests ()                             /* desstructor */
                {
                        m_pInstance = NULL;
                }
                /* ====================  ACCESSORS     ======================================= */
                static CAD_Diag_Tests * getInstance() ;

                /* ====================  MUTATORS      ======================================= */

                /* ====================  OPERATORS     ======================================= */
                virtual int init();
                virtual int shutdown();
                virtual CTS_Vec  getListOfTests();
                virtual CTR_Vec doTests(const CTP_Vec & tests);
                virtual CAD_Test_Results doTest(const CAD_Test_Params & test);

        protected:
                /* ====================  METHODS       ======================================= */

                /* ====================  DATA MEMBERS  ======================================= */

        private:
                /* ====================  METHODS       ======================================= */

                CAD_Diag_Tests ();                             /* constructor */

                /* ====================  DATA MEMBERS  ======================================= */
                static CAD_Diag_Tests *m_pInstance ;
                DNS_Test_Func_Map m_dns_tests_map;

}; /* -----  end of class CAD_Diag_Tests  ----- */

- Init map
int CAD_Diag_Tests::init()
{
        CAD_DNS_DIAG::getInstance()->init();
        m_dns_tests_map["DNS_A_REC_DEF_CFG"] =  &CAD_DNS_DIAG::queryDomainArecordInAllNS;
        m_dns_tests_map["DNS_RES_Q_A_REC_DEF_CFG"] =  &CAD_DNS_DIAG::res_queryDomainArecordInAllNS;
}

- Usage:
        string s_dns_pref = "DNS";
        if (test_params.s_testname.substr(0,s_dns_pref.size()) == s_dns_pref )
        {
                printf ("CAD_Diag_Tests::doTest() - Performing test %s of DNS test suite\n", test_params.s_testname.c_str() );

                dns_testfunc p_dns_testfunc  = m_dns_tests_map[test_params.s_testname]; 
                (CAD_DNS_DIAG::getInstance()->*p_dns_testfunc)(test_params, test_res);
                printf ("CAD_Diag_Tests::doTest() - Completed running test %s\n", test_params.s_testname.c_str() );
```

## 20.12 c++ simple command line parser

### 20.12.1 boost::program_options

#### 20.12.1.1 Tutorial

```text
Tutorial

Getting Started
Option Details
Multiple Sources
In this section, we'll take a look at the most common usage scenarios of the program_options library, starting with the simplest one. The examples show only the interesting code parts, but the complete programs can be found in the "BOOST_ROOT/libs/program_options/example" directory. Through all the examples, we'll assume that the following namespace alias is in effect:

namespace po = boost::program_options;
Getting Started
The first example is the simplest possible: it only handles two options. Here's the source code (the full program is in "example/first.cpp"):

// Declare the supported options.
po::options_description desc("Allowed options");
desc.add_options()
    ("help", "produce help message")
    ("compression", po::value<int>(), "set compression level")
;

po::variables_map vm;
po::store(po::parse_command_line(ac, av, desc), vm);
po::notify(vm);    

if (vm.count("help")) {
    cout << desc << "\n";
    return 1;
}

if (vm.count("compression")) {
    cout << "Compression level was set to " 
 << vm["compression"].as<int>() << ".\n";
} else {
    cout << "Compression level was not set.\n";
}
We start by declaring all allowed options using the options_description class. The add_options method of that class returns a special proxy object that defines operator(). Calls to that operator actually declare options. The parameters are option name, information about value, and option description. In this example, the first option has no value, and the second one has a value of type int.

After that, an object of class variables_map is declared. That class is intended to store values of options, and can store values of arbitrary types. Next, the calls to store, parse_command_line and notify functions cause vm to contain all the options found on the command line.

And now, finally, we can use the options as we like. The variables_map class can be used just like std::map, except that values stored there must be retrieved with the as method shown above. (If the type specified in the call to the as method is different from the actually stored type, an exception is thrown.)

It's now a good time to try compiling the code yourself, but if you're not yet ready, here's an example session:

$ bin/gcc/debug/first
Compression level was not set.
$ bin/gcc/debug/first --help
Allowed options:
  --help                 : produce help message
  --compression arg      : set compression level
$ bin/gcc/debug/first --compression 10
Compression level was set to 10.
    
Option Details
An option value, surely, can have other types than int, and can have other interesting properties, which we'll discuss right now. The complete version of the code snipped below can be found in example/options_description.cpp.

Imagine we're writing a compiler. It should take the optimization level, a number of include paths, and a number of input files, and perform some interesting work. Let's describe the options:

int opt;
po::options_description desc("Allowed options");
desc.add_options()
    ("help", "produce help message")
    ("optimization", po::value<int>(&opt)->default_value(10), 
  "optimization level")
    ("include-path,I", po::value< vector<string> >(), 
  "include path")
    ("input-file", po::value< vector<string> >(), "input file")
;
The "help" option should be familiar from the previous example. It's a good idea to have this option in all cases.

The "optimization" option shows two new features. First, we specify the address of the variable(&opt). After storing values, that variable will have the value of the option. Second, we specify a default value of 10, which will be used if no value is specified by the user.

The "include-path" option is an example of the only case where the interface of the options_description class serves only one source -- the command line. Users typically like to use short option names for common options, and the "include-path,I" name specifies that short option name is "I". So, both "--include-path" and "-I" can be used.

Note also that the type of the "include-path" option is std::vector. The library provides special support for vectors -- it will be possible to specify the option several times, and all specified values will be collected in one vector.

The "input-file" option specifies the list of files to process. That's okay for a start, but, of course, writing something like:

compiler --input-file=a.cpp
    
is a little non-standard, compared with

compiler a.cpp
    
We'll address this in a moment.

The command line tokens which have no option name, as above, are called "positional options" by this library. They can be handled too. With a little help from the user, the library can decide that "a.cpp" really means the same as "--input-file=a.cpp". Here's the additional code we need:

po::positional_options_description p;
p.add("input-file", -1);

po::variables_map vm;
po::store(po::command_line_parser(ac, av).
          options(desc).positional(p).run(), vm);
po::notify(vm);
    
The first two lines say that all positional options should be translated into "input-file" options. Also note that we use the command_line_parser class to parse the command line, not the parse_command_line function. The latter is a convenient wrapper for simple cases, but now we need to pass additional information.

By now, all options are described and parsed. We'll save ourselves the trouble of implementing the rest of the compiler logic and only print the options:

if (vm.count("include-path"))
{
    cout << "Include paths are: " 
         << vm["include-path"].as< vector<string> >() << "\n";
}

if (vm.count("input-file"))
{
    cout << "Input files are: " 
         << vm["input-file"].as< vector<string> >() << "\n";
}

cout << "Optimization level is " << opt << "\n";                
Here's an example session:

$ bin/gcc/debug/options_description --help
Usage: options_description [options]
Allowed options:
  --help                 : produce help message
  --optimization arg     : optimization level
  -I [ --include-path ] arg : include path
  --input-file arg       : input file
$ bin/gcc/debug/options_description
Optimization level is 10
$ bin/gcc/debug/options_description --optimization 4 -I foo a.cpp
Include paths are: foo
Input files are: a.cpp
Optimization level is 4
Oops, there's a slight problem. It's still possible to specify the "--input-file" option, and usage message says so, which can be confusing for the user. It would be nice to hide this information, but let's wait for the next example.

Multiple Sources
It's quite likely that specifying all options to our compiler on the command line will annoy users. What if a user installs a new library and wants to always pass an additional command line element? What if he has made some choices which should be applied on every run? It's desirable to create a config file with common settings which will be used together with the command line.

Of course, there will be a need to combine the values from command line and config file. For example, the optimization level specified on the command line should override the value from the config file. On the other hand, include paths should be combined.

Let's see the code now. The complete program is in "examples/multiple_sources.cpp". The option definition has two interesting details. First, we declare several instances of the options_description class. The reason is that, in general, not all options are alike. Some options, like "input-file" above, should not be presented in an automatic help message. Some options make sense only in the config file. Finally, it's nice to have some structure in the help message, not just a long list of options. Let's declare several option groups:

// Declare a group of options that will be 
// allowed only on command line
po::options_description generic("Generic options");
generic.add_options()
    ("version,v", "print version string")
    ("help", "produce help message")    
    ;
    
// Declare a group of options that will be 
// allowed both on command line and in
// config file
po::options_description config("Configuration");
config.add_options()
    ("optimization", po::value<int>(&opt)->default_value(10), 
          "optimization level")
    ("include-path,I", 
         po::value< vector<string> >()->composing(), 
         "include path")
    ;

// Hidden options, will be allowed both on command line and
// in config file, but will not be shown to the user.
po::options_description hidden("Hidden options");
hidden.add_options()
    ("input-file", po::value< vector<string> >(), "input file")
    ;        
Note the call to the composing method in the declaration of the "include-path" option. It tells the library that values from different sources should be composed together, as we'll see shortly.

The add method of the options_description class can be used to further group the options:

po::options_description cmdline_options;
cmdline_options.add(generic).add(config).add(hidden);

po::options_description config_file_options;
config_file_options.add(config).add(hidden);

po::options_description visible("Allowed options");
visible.add(generic).add(config);
      
The parsing and storing of values follows the usual pattern, except that we additionally call parse_config_file, and call the store function twice. But what happens if the same value is specified both on the command line and in config file? Usually, the value stored first is preferred. This is what happens for the "--optimization" option. For "composing" options, like "include-file", the values are merged.

Here's an example session:

$ bin/gcc/debug/multiple_sources
Include paths are: /opt
Optimization level is 1
$ bin/gcc/debug/multiple_sources --help
Allows options:

Generic options:
  -v [ --version ]       : print version string
  --help                 : produce help message

Configuration:
  --optimization n       : optimization level
  -I [ --include-path ] path : include path

$ bin/gcc/debug/multiple_sources --optimization=4 -I foo a.cpp b.cpp
Include paths are: foo /opt
Input files are: a.cpp b.cpp
Optimization level is 4
The first invocation uses values from the configuration file. The second invocation also uses values from command line. As we see, the include paths on the command line and in the configuration file are merged, while optimization is taken from the command line.
```

#### 20.12.1.2 first.cpp

```text
// Copyright Vladimir Prus 2002-2004.
// Distributed under the Boost Software License, Version 1.0.
// (See accompanying file LICENSE_1_0.txt
// or copy at http://www.boost.org/LICENSE_1_0.txt)

/* The simplest usage of the library.
 */

#include <boost/program_options.hpp>
namespace po = boost::program_options;

#include <iostream>
#include <iterator>
using namespace std;

int main(int ac, char* av[])
{
    try {

        po::options_description desc("Allowed options");
        desc.add_options()
            ("help", "produce help message")
            ("compression", po::value<int>(), "set compression level")
        ;

        po::variables_map vm;        
        po::store(po::parse_command_line(ac, av, desc), vm);
        po::notify(vm);    

        if (vm.count("help")) {
            cout << desc << "\n";
            return 1;
        }

        if (vm.count("compression")) {
            cout << "Compression level was set to " 
                 << vm["compression"].as<int>() << ".\n";
        } else {
            cout << "Compression level was not set.\n";
        }
    }
    catch(exception& e) {
        cerr << "error: " << e.what() << "\n";
        return 1;
    }
    catch(...) {
        cerr << "Exception of unknown type!\n";
    }

    return 0;
} 
```

#### 20.12.1.3 My example

```text
- To link:
-lboost_program_options
int main ( int ac, char *av[] )
{
    po::options_description desc("Allowed options");
    StrVec v_tests , v_params;
    string s_domain;

    desc.add_options()
        ("help,h", "produce help message")
        ("domain,d", po::value< string >( &s_domain), "Domain to test")
        ("tests,t", po::value< vector<string> >( &v_tests), "One or more test names, choose one of all/dns/ldap/kerb to run all or full suite. Use multiple times for multiple tests")
        ("params,p", po::value<  vector <string > >( &v_params), "Test parameters, in name-value pairs. Use multiple times for multiple params")
    ;
    
    stringstream ss_desc;
    ss_desc << desc << endl;

    po::variables_map vm;
    po::store(po::parse_command_line(ac, av, desc), vm);
    po::notify(vm);    
    
    if (vm.count("help")) {
        printf("%s\n", ss_desc.str().c_str());
        return 1;
    }
    //if (vm.count("tests"))
    if (v_tests.size() > 0)
    {
            //= vm["test"].as< vector<string> >(); 
            printf ("test/s are: \n" );
            for ( StrVec::iterator i = v_tests.begin(); i != v_tests.end() ; ++i) {
                    printf("%s; ", (*i).c_str());
            }
            printf ("\n" );
    }
    if (v_params.size() > 0)
    {
            printf ("Param/s are: \n" );
            for ( StrVec::iterator i = v_params.begin(); i != v_params.end() ; ++i) {
                    printf("%s; ", (*i).c_str());
            }
            printf ("\n" );
    }
        printf("Domain is %s\n", s_domain.c_str()); 
```

#### 20.12.1.4 http://www.radmangames.com/programming/how-to-use-boost-program_options

```text
If it so happens that you’re writing a console application, then chances are you will (or should) want to pass it some parameters at the command line. By default C++ has only the argc and argv parameters to the main function to facilitate this and I can assure you that working with them directly is less than fun. If you have worked with any number of command line programs you would be well aware of a common form that they take and that users expect. To get this expected behavior you should use another favourite boost library of mine: Program options.

Quite simply, Boost.Program_options is the way to do industry standard command line processing in C++, if you’re trying to implement command line arguments in your application then you should be using this library. This tutorial will take you through how to get set up and productive using boost program options with a minimum of fuss.

Obtaining, compiling and linking to boost is not covered.

Application Template

So you have an program that you want to be able to accept command line parameters? Then replace (or merge) the contents of your main.cpp with the code below. This code forms the foundation of the rest of the tutorial and is boiler plate that you will find yourself writing every time you create a new command line application.

Note: the rest of the examples reference the names of objects in the code below.

 
#include "boost/program_options.hpp" 
 
#include <iostream> 
#include <string> 
 
namespace 
{ 
  const size_t ERROR_IN_COMMAND_LINE = 1; 
  const size_t SUCCESS = 0; 
  const size_t ERROR_UNHANDLED_EXCEPTION = 2; 
 
} // namespace 
 
int main(int argc, char** argv) 
{ 
  try 
  { 
    /** Define and parse the program options 
     */ 
    namespace po = boost::program_options; 
    po::options_description desc("Options"); 
    desc.add_options() 
      ("help", "Print help messages") 
      ("add", "additional options") 
      ("like", "this"); 
 
    po::variables_map vm; 
    try 
    { 
      po::store(po::parse_command_line(argc, argv, desc),  
                vm); // can throw 
 
      /** --help option 
       */ 
      if ( vm.count("help")  ) 
      { 
        std::cout << "Basic Command Line Parameter App" << std::endl 
                  << desc << std::endl; 
        return SUCCESS; 
      } 
 
      po::notify(vm); // throws on error, so do after help in case 
                      // there are any problems 
    } 
    catch(po::error& e) 
    { 
      std::cerr << "ERROR: " << e.what() << std::endl << std::endl; 
      std::cerr << desc << std::endl; 
      return ERROR_IN_COMMAND_LINE; 
    } 
 
    // application code here // 
 
  } 
  catch(std::exception& e) 
  { 
    std::cerr << "Unhandled Exception reached the top of main: " 
              << e.what() << ", application will now exit" << std::endl; 
    return ERROR_UNHANDLED_EXCEPTION; 
 
  } 
 
  return SUCCESS; 
 
} // main 
Basic option configuration

All of the below options should be added as additional lines in the desc.add_options() call in the application template.
Add the most simple of options
--option

 
("option", "Info message about option") 
Add a shorthand for an option
--option or -o

 
("option,o", "Info message about option") // can use -o 
Add an option with shorthand only
-o

 
(",o", "Info message about option") // must use -o 
Add an option that has an associated value
--option <value>

 
("option", po::value<arg_type>(), "Info message about option") 
Specify that an option is required
The call to po::notify(vm) will throw if the option is not specified.
 
("option", po::value<arg_type>()->required(), "Info message") 
Specify an option that can be specified multiple times
--option <value1> --option <value2> --option <value3>

 
("option", po::value<std::vector<arg_type> >(), "a list of values") 
Accessing option values

Have the option set directly into an existing variable
I find this to be the most convenient method to use

 
("option", po::value<arg_type>(&existingVariable), "info message") 
Check if an option was passed in the command line
 
if ( vm.count("option") ) 
To extract the value for an option manually
 
vm["option"].as<arg_type>() 
Specifying Positional Options

A positional option is a value given on the command line that is not preceded by an option switch like -o or --option. An example is the following:

user@computer:$ g++ -o main main.cpp
In this case main.cpp is the positional option, and as you can see it is not associated with any option explicitly specified. Instead of being identified by an option switch (like --option) they are identified by the lack of one. When multiple positional options are available the option the value is assigned to is designated by the order in which the values appear in the command line.

user@computer:$ hg help commit -v
In this case 'help' is the first positional option and 'commit' is the second. The command will print help info for the commit subcommand. Now if the order were to be reversed:

user@computer:$ hg commit help -v
The position of the options is now reversed and the command will now try to 'commit' the location 'help'. Again the order in which values are specified determines which positional option the value is assigned to.

Example code for positional options
To specify these with boost program options add a po::positional_options_description object and specify the names of the options that you want to parse as positional. Add the following code block directly below the last option in the desc.add_options() call:
 
po::positional_options_description positionalOptions; 
positionalOptions.add("option_name_1", <num_occurrences>); 
positionalOptions.add("option_name_2", <num_occurrences>); 
The option name specified as the first parameter must correspond to the name of an option already specified in the regular options description. The second parameter specifies the number of values to be associated with the option, in the simple case you will always set this to 1. The positional order of options is implied by the order in which they are added to the description, in this case 'option_name_1' is first and 'option_name_2' is second.

Next you need to make sure that the positional options are parsed along with the others and stored in the variable map. Change the po::store() call to the following:
 
po::store(po::command_line_parser(argc, argv).options(desc) 
            .positional(positionalOptions).run(), 
          vm); 
Putting it all together

With just the information above you can create quite sophisticated command line applications, but sometimes knowing the parts does not give a good enough picture of what can be achieved. Check out below for a full example of the options implemented in a demo application. This should help to give you an idea of how things look when it’s all put together. Be aware that I have implemented some custom parsing for printing the available options in posix style which I include as part of the source package for the example application and an example of that usage output is shown immediately below. The information is parsed generically from the specified options and this prevents you from having to manually update help text when you update options (which is pretty awesome).

Best of luck, and please let me know if you have any issues.

Please not you will need version 1.50.0 of boost to compile the extended example

Usage Output
user@computer:$ ./test_bed --help
This is just a template app that should be modified and added to in order to create a useful command line application

USAGE: test_bed [-hvt] [-w ARG] [-m ARG] -n ARG add like 

-- Option Descriptions --

Positional arguments:
add "additional options"
like "this"

Option Arguments:
-h [ --help ] Print help messages
-v [ --verbose ] print words with verbosity
-w [ --word ] words for the sentence, specify multiple times
-t just a temp option that does very little
-n [ --necessary ] give me anything
-m [ --manual ] extract value manually
Example Application
 
#include "PrettyOptionPrinter.hpp" 
 
#include "boost/program_options.hpp" 
#include "boost/filesystem.hpp" 
 
#include <iostream> 
#include <string> 
 
namespace 
{ 
  const size_t ERROR_IN_COMMAND_LINE = 1; 
  const size_t SUCCESS = 0; 
  const size_t ERROR_UNHANDLED_EXCEPTION = 2; 
 
} // namespace 
 
//------------------------------------------------------------------------ 
int main(int argc, char** argv) 
{ 
  try 
  { 
    std::string appName = boost::filesystem::basename(argv[0]); 
    int add = 0; 
    int like = 0; 
    std::vector<std::string> sentence; 
 
    /** Define and parse the program options 
     */ 
    namespace po = boost::program_options; 
    po::options_description desc("Options"); 
    desc.add_options() 
      ("help,h", "Print help messages") 
      ("verbose,v", "print words with verbosity") 
      ("word,w", po::value<std::vector<std::string> >(&sentence), 
       "words for the sentence, specify multiple times") 
      (",t", "just a temp option that does very little") 
      ("necessary,n", po::value<std::string>()->required(), "necessary!") 
      ("manual,m", po::value<std::string>(), "extract value manually") 
      ("add", po::value<int>(&add)->required(), "additional options") 
      ("like", po::value<int>(&like)->required(), "this"); 
 
    po::positional_options_description positionalOptions; 
    positionalOptions.add("add", 1); 
    positionalOptions.add("like", 1); 
 
    po::variables_map vm; 
 
    try 
    { 
      po::store(po::command_line_parser(argc, argv).options(desc) 
                  .positional(positionalOptions).run(), 
                vm); // throws on error 
 
      /** --help option 
       */ 
      if ( vm.count("help")  ) 
      { 
        std::cout << "This is just a template app that should be modified" 
                  << " and added to in order to create a useful command" 
                  << " line application" << std::endl << std::endl; 
        rad::OptionPrinter::printStandardAppDesc(appName, 
                                                 std::cout, 
                                                 desc, 
                                                 &positionalOptions); 
        return SUCCESS; 
      } 
 
      po::notify(vm); // throws on error, so do after help in case 
                      // there are any problems 
    } 
    catch(boost::program_options::required_option& e) 
    { 
      rad::OptionPrinter::formatRequiredOptionError(e); 
      std::cerr << "ERROR: " << e.what() << std::endl << std::endl; 
      rad::OptionPrinter::printStandardAppDesc(appName, 
                                               std::cout, 
                                               desc, 
                                               &positionalOptions); 
      return ERROR_IN_COMMAND_LINE; 
    } 
    catch(boost::program_options::error& e) 
    { 
      std::cerr << "ERROR: " << e.what() << std::endl << std::endl; 
      rad::OptionPrinter::printStandardAppDesc(appName, 
                                               std::cout, 
                                               desc, 
                                               &positionalOptions); 
      return ERROR_IN_COMMAND_LINE; 
    } 
 
    // can do this without fear because it is required to be present 
    std::cout << "Necessary = " 
              << vm["necessary"].as<std::string>() << std::endl; 
 
    if ( vm.count("verbose") ) 
    { 
      std::cout << "VERBOSE PRINTING" << std::endl; 
    } 
    if (vm.count("verbose") && vm.count("t")) 
    { 
      std::cout << "heeeeyahhhhh" << std::endl; 
    } 
 
    std::cout << "Required Positional, add: " << add 
              << " like: " << like << std::endl; 
 
    if ( sentence.size() > 0 ) 
    { 
      std::cout << "The specified words: "; 
      std::string separator = " "; 
      if (vm.count("verbose")) 
      { 
        separator = "__**__"; 
      } 
      for(size_t i=0; i<sentence.size(); ++i) 
      { 
        std::cout << sentence[i] << separator; 
      } 
      std::cout << std::endl; 
 
    } 
 
    if ( vm.count("manual") ) 
    { 
      std::cout << "Manually extracted value: " 
                << vm["manual"].as<std::string>() << std::endl; 
    } 
 
  } 
  catch(std::exception& e) 
  { 
    std::cerr << "Unhandled Exception reached the top of main: " 
              << e.what() << ", application will now exit" << std::endl; 
    return ERROR_UNHANDLED_EXCEPTION; 
 
  } 
 
  return SUCCESS; 
 
} // main 
 
//------------------------------------------------------------------------ 
 
			20.12.1.5
		20.12.2
```

## 20.13 c++ print source file name and line

```text
__FILE__ , __LINE_ 
A C/C++ feature that helped me to log better
I read an article some time ago where it claims that you take at least 10 years to learn C/C++ entirely. I don’t remember if was Bjarne Stroustrup or someone else that said that but I completely agree!

I program professionally for about 8 years and most of my career was developing in C/C++, still I don’t consider I know everything about this terrific language. One prove is that I found an interesting feature available regarding #define macros!

 

Let’s LOG

One important thing of every program is log. It’s used to trace program’s flow or even debug on some cases where you cannot use GDB/DBX.

That being said, one important thing to put on your logs is the file name and line number where the it occurs. On my early days I though to have found a smart way to do it!

Well, I created a log function that here I’ll simplify it a little:

#include
#include 
 
void log(const char* fileName, int line, const char* msg, ...)
{
    va_list args;
    va_start(args, msg);
 
    fprintf(stdout, "%s, %d:", fileName, line);
    vfprintf(stdout, msg, args);
    fprintf(stdout, "n");
 
    va_end(args);
}
Now I can use this just like a simple printf:


int var = 50;
log("MyFile.cpp", 11, "Hello var: %d", var);
The problem with this, show up when I add couple lines before it:


// trace var value
int var = 50;
 
log("MyFile.cpp", 11, "Hello var: %d", var);
This time the output of this will still be:


MyFile.cpp, 11: Hello var: 50
The problem is this line is wrong now! And imagine fixing all the logs of a 1000 LOC file if you just add an include?

How to solve this?

Standard Predefined Macros

If you check The GNU C Preprocessor page that talks about Standard Predefined Macros you’ll find two interesting macros that solve our problem:

__FILE__ – This macro expands to the name of the current input file, in the form of a C string constant.
__LINE__ – This macro expands to the current input line number, in the form of a decimal integer constant.
Well, now if we use our log function with this macros we’re safe:


// trace var value
int var = 50;
 
log(__FILE__, __LINE__, "Hello var: %d", var);
This time the output of this will be:


MyFile.cpp, 13: Hello var: 50
Cool right?

Yes but if you start working with a bunch of people you’ll realize that use this standard macros might confuse some folks and others tend to use plain printf just because they don’t know how to use it.

Now, how to solve THIS problem?

#define Macros to save us

It turns out there is a feature on standard C called Variadic Macros that I didn’t know before this week that simply solve this issue and make log functions elegant and efficient. I’ll point you again to the The GNU C Preprocessor on the Variadic Macros page so you can read the details, but in a glimpse here is its syntax:


#define MACRO_NAME(arg, ...) somefunc(arg, __VA_ARGS__)
One thing to notice though is that with this syntax you must pass at least one argument as variable arguments due the comma on your macro definition. But don’t look to this post with this face! There is a second syntax of Variadic Macros that will calm you down:


#define MACRO_NAME(arg, ...) somefunc(arg, ##__VA_ARGS__)
With those double pounds before the __VA_ARGS\__ keyword, the C preprocessor will know if you don’t add variable arguments and will take the comma out.

Now, how this will help us on our log function?

Easy, we create this macro:


#define LOG(msg, ...) log(__FILE__, __LINE__, msg, ##__VA_ARGS__)
Now our code snippet can be re-writen to use this new macro:


// trace var value
int var = 50;
 
LOG("Hello var: %d", var);
As I said: cleaner and more elegant ;-) !
```

## 20.14 initialization list question, with emphasis on std vector

```text
 how do I initialise a std::vector?

Is this the way, ie just putting a 0 in brackets? My header:

class Blade;
class Postpro {
   public:
     Postpro(string fName) : theFileName(fName),
                             blade(NULL),
                             sizes(10),
                             t(std::vector<double>(0){};
     ~Postpro(){};
     void test();

   private:
     string theFileName;
     Blade* blade;
     int sizes;
     std::vector<double> t;
}
And then in the cpp I just resize the vector if I want to use it?

void Postpro::test() {
    blade = new Blade;
    t.resize(37);
}


----------------------------------------------------------------------------------------------------
It does not take that much time to type, because you have typed too much:

Instead of

t(std::vector<double>(0))
you could write

t(0)
which should be the same as

t()
The warning might be a bit too pedantic. Classes with a default constructor will be automatically initialized anyway. A warning flag to alert you only of uninitialized POD members would seem more valuable (otherwise you get too much noise).

May-be the use is that it shows the reader that you indeed meant to use the default constructor to initialize that member.
----------------------------------------------------------------------------------------------------
```

## 20.15 boost regex

```text
- Source:
/Users/<user>/Desktop/Work/code/CPP/tests/string/regexp.cpp


/*
 * =====================================================================================
 *
 *       Filename:  regexp.cpp
 *
 *    Description:  
 *  email: I’m thinking of putting in place a simple workaround. 
 *  email: Check for offending user name (regexp:  .*@.*\.\..* Or .*@.*\.$) ; if match make ISE drop the auth. 
 *  email: I plan to put the check and set auth res. To drop in AD ID store.*
 *        Version:  1.0
 *        Created:  02/24/2014 10:41:12
 *       Revision:  none
 *       Compiler:  gcc
 *       $ g++ -L/usr/local/Cellar/boost/1.55.0/lib -lboost_regex-mt -lboost_filesystem-mt -lboost_thread-mt    regexp.cpp 
 *
 *         Author:  Yosi Izaq
 *   Organization:  
 *
 * =====================================================================================
 */
#include <stdlib.h>
#include <stdio.h>
#include <string>
#include <iostream>
#include <boost/regex.hpp>

using namespace std;
using namespace boost;

int main(int argc, const char *argv[])
{
	string inp1 = "<email>";	
	string inp2 = "<email>.";	
	string inp3 = "";	

	const regex re1(  ".*\\@.*\\.\\..*" );
	const regex re2(  ".*\\@.*\\.$" );

	cout<<"Please enter pattern"<<endl;
	cin>>inp3;
	cout<<"You entered pattern "<<inp3<<endl;

	if (regex_match(inp1,re1)) {
	    cout<<inp1<<" match pattern 1"<<endl;
	}
	else {
	    cout<<inp1<<" does not match pattern 1"<<endl;
		
	}
	if (regex_match(inp1,re2)) {
	    cout<<inp1<<" match pattern 2"<<endl;
	}
	else {
	    cout<<inp1<<" does not match pattern 2"<<endl;
		
	}

	if (regex_match(inp2,re1)) {
	    cout<<inp2<<" match pattern 1"<<endl;
	}
	else {
	    cout<<inp2<<" does not match pattern 1"<<endl;
		
	}
	if (regex_match(inp2,re2)) {
	    cout<<inp2<<" match pattern 2"<<endl;
	}
	else {
	    cout<<inp2<<" does not match pattern 2"<<endl;
		
	}

	if (regex_match(inp3,re1)) {
	    cout<<inp3<<" match pattern 1"<<endl;
	}
	else {
	    cout<<inp3<<" does not match pattern 1"<<endl;
		
	}
	if (regex_match(inp3,re2)) {
	    cout<<inp3<<" match pattern 2"<<endl;
	}
	else {
	    cout<<inp3<<" does not match pattern 2"<<endl;
		
	}

	return 0;
}
- Ex:
$ g++ -L/usr/local/Cellar/boost/1.55.0/lib -lboost_regex-mt -lboost_filesystem-mt -lboost_thread-mt    regexp.cpp 
$ a.out
Please enter pattern
y@a.b.
You entered pattern y@a.b.
<email> match pattern 1
<email> does not match pattern 2
<email>. does not match pattern 1
<email>. match pattern 2
y@a.b. does not match pattern 1
y@a.b. match pattern 2
$ a.out
Please enter pattern
y@a..b
You entered pattern y@a..b
<email> match pattern 1
<email> does not match pattern 2
<email>. does not match pattern 1
<email>. match pattern 2
y@a..b match pattern 1
y@a..b does not match pattern 2


		20.15.1 


	20.16 Translate IPv6 address from string to binary and back to string (normalizing it on the way)
r ~/Desktop/Work/code/CPP/networking/normalizeIPv6Addr.cpp
/*
 * =====================================================================================
 *
 *       Filename:  normalizeIPv6Addr.cpp
 *
 *    Description:  
 *
 *
 *        Version:  1.0
 *        Created:  08/06/15 13:58:52
 *       Revision:  none
 *       Compiler:  gcc
 *
 *         Author:  YOSI IZAQ
 *   Organization:  
 *
 * =====================================================================================
 */

#include <arpa/inet.h>
#include <stdio.h>
#include <stdlib.h>
#include <iostream>
#include <string>

using namespace std;

int normalizeIPV6Addr(const string & ipv6addr, string & normalizedaddr )
{
	cout<<"Got address "<<ipv6addr <<endl;
	unsigned char buf[sizeof(struct in6_addr)];
	int res;
	inet_pton(AF_INET6, ipv6addr.c_str(), buf);
	char str[INET6_ADDRSTRLEN];
	normalizedaddr = "";
	if (res <=0) 
	{
	    if (res == 0 ) 
	    {
	    	cout<<"Address not in presentation format"<<endl;
	    }
	    else
	    {
		    perror("inet_pton");
	    }
	}
	else
	{
		cout<<"Address trandlated to binary"<<endl;
	}

	if (inet_ntop(AF_INET6, buf, str, INET6_ADDRSTRLEN) == NULL ) 
	{
            perror("inet_ntop");
	}

	string sTemp(str);
	normalizedaddr = sTemp;
        cout<<"Normalized address: " << normalizedaddr << " res: "<< res<<endl; 
	return res;
}

int main(int argc, const char *argv[])
{
	string saddr, snormaddr;
	cout<<"Please enter address in IPV6 format"<<endl;
	cin>>saddr;
	cout<<"Got address in IPV6 format:"<<saddr<<endl;

	if ( normalizeIPV6Addr(saddr , snormaddr )  > 0)
	{
           cout<<"Normalized address: " << snormaddr << endl; 
	}
	return 0;
}

$ g++ normalizeIPv6Addr.cpp -o normalizeIPv6Addr
$ ./normalizeIPv6Addr 
Please enter address in IPV6 format
2001:0db8:0000:0000:1111:2222:3333:4444
Got address in IPV6 format:2001:0db8:0000:0000:1111:2222:3333:4444
Got address 2001:0db8:0000:0000:1111:2222:3333:4444
Address trandlated to binary
Normalized address: 2001:db8::1111:2222:3333:4444 res: 32767
Normalized address: 2001:db8::1111:2222:3333:4444


	20.17
```
