---
type: reference
title: Conversions
description: "C++ conversions, such as hex string to integer using stringstream."
tags: [cpp, legacy, examples, howto, string-algorithms]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-cpp#6"
---

# Conversions

[↑ kb-cpp](/kb-cpp/README.md)

## 6.1 Hex string to integer

```text
	http://www.codeguru.com/forum/showthread.php?t=231054

Q: How to convert a string into a numeric type?

A: There is one thing that you are not allowed to ignore when you convert a string into a numeric type: the conversion might fail because the
string you are converting might not contain a valid representation of a number.

If, for example, you try to convert the string "Hello" to a number, the conversion must fail.

The old C way (deprecated):

Many people use the 'atoi()', 'atof()' and the other functions from this "family". They're easy to use but have a major drawback: they return 0 both on failure and when converting the string "0", thus making a consistent error detection as good as impossible. We give this little sample for the sake of completeness:

Code:

const char* str_int = "777"; const char* str_float = "333.3"; int i = atoi(str_int); float f = atof(str_float);



A better way:

A bit more complicated, but also more consistent way is to use 'sscanf()' in one of it's flavors:

Code:

const char* str_int = "777";
const char* str_float = "333.3";
int i;
float f;
if(EOF == sscanf(str_int, "%d", &i)) 
{
	//error 
}
if(EOF == sscanf(str_float, "%f", &f)) 
{
	//error 
}


Since 'sscanf()' takes a 'const char*' parameter, you can directly use a 'CString' with it:

Code:

CString str_int("777");
if(EOF == sscanf(str_int, '%d', &i)) 
{
	//error 
}


Be very careful with the format specifier (i.e. "%d" in this example). 'sscanf()' has no way to check whether the format specifier and the type of the passed variable match each other. If they don't you will get unexpected
results. Also note that 'sscanf()' is able to extract more than one numerical value from a string with one call. Have a look in e.g. MSDN for details.


The C++ way

Following sample shows a template function that uses Standard C++ classes to complete the task:

Code:

#include <string> 
#include <sstream> 
#include <iostream> 
template <class T> 
bool from_string(T& t, const std::string& s, std::ios_base& (*f)(std::ios_base&)) 
{
	std::istringstream iss(s);
	return !(iss >> f >> t).fail(); 
}

int main() {
	int i;
	float f;
	// the third parameter of from_string() should be 
	// one of std::hex, std::dec or std::oct 
	if(from_string<int>(i, std::string("ff"), std::hex)) {
		std::cout << i << std::endl; 
	}
	else {
		std::cout << "from_string failed" << std::endl; 
	}
	if(from_string<float>(f, std::string("123.456"), std::dec)) {
		std::cout << f << std::endl; 
	} 
	else {
		std::cout << "from_string failed" << std::endl; 
	}
	return 0; 
} /* output: 255 123.456 */


This method is not only elegant but also type safe, because the compiler will pick the proper 'std::istringstream::operator >>()' at compile time, according to the operand type.
```
