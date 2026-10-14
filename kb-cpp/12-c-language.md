---
type: reference
title: C language
description: "C language reference for time.h: variables, definitions and asctime."
tags: [c, cpp, legacy, reference, examples]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-cpp#12"
---

# C language

[↑ kb-cpp](/kb-cpp/README.md)

## 12.1 Time

```text
	http://www.acm.uiuc.edu/webmonkeys/book/c_guide/2.15.html
 The time header provides several functions useful for reading and converting the current time and date. Some functions behavior is defined by the LC_TIME category of the location setting.

Macros:

    NULL
    CLOCKS_PER_SEC 

Variables:

    typedef size_t
    typedef clock_t
    typedef size_t
    struct tm 

Functions:

    asctime();
    clock();
    ctime();
    difftime();
    gmtime();
    localtime();
    mktime();
    strftime();
    time(); 
```

### 12.1.1 Variables and Definitions

```text
    NULL is the value of a null pointer constant.
    CLOCKS_PER_SEC is the number of processor clocks per second.

    size_t is the unsigned integer result of the sizeof keyword.
    clock_t is a type suitable for storing the processor time.
    time_t is a type suitable for storing the calendar time.

    struct tm is a structure used to hold the time and date. Its members are as follows:

         int tm_sec;    /* seconds after the minute (0 to 61) */
         int tm_min;    /* minutes after the hour (0 to 59) */
         int tm_hour;   /* hours since midnight (0 to 23) */
         int tm_mday;   /* day of the month (1 to 31) */
         int tm_mon;    /* months since January (0 to 11) */
         int tm_year;   /* years since 1900 */
         int tm_wday;   /* days since Sunday (0 to 6 Sunday=0) */
         int tm_yday;   /* days since January 1 (0 to 365) */
         int tm_isdst;  /* Daylight Savings Time */

If tm_isdst is zero, then Daylight Savings Time is not in effect. If it is a positive value, then Daylight Savings Time is in effect. If it is negative, then the function using it is requested to attempt to calculate whether or not Daylight Savings Time is in effect for the given time.

Note that tm_sec may go as high as 61 to allow for up to two leap seconds.
```

### 12.1.2 asctime

```text
Declaration:

    char *asctime(const struct tm *timeptr); 

Returns a pointer to a string which represents the day and time of the structure timeptr. The string is in the following format:

    DDD MMM dd hh:mm:ss YYYY 

DDD	Day of the week (Sun, Mon, Tue, Wed, Thu, Fri, Sat)
MMM	Month of the year (Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec)
dd	Day of the month (1,...,31)
hh	Hour (0,...,23)
mm 	Minute (0,...,59)
ss	Second (0,...,59)
YYYY	Year
The string is terminated with a newline character and a null character. The string is always 26 characters long (including the terminating newline and null characters).

A pointer to the string is returned.

Example:

    #include<time.h>
    #include<stdio.h>

    int main(void)
    {
      time_t timer;

      timer=time(NULL);
      printf("The current time is %s.\n",asctime(localtime(&timer)));
      return 0;
    }
```

### 12.1.3 clock

```text
Declaration:

    clock_t clock(void); 

Returns the processor clock time used since the beginning of an implementation-defined era (normally the beginning of the program). The returned value divided by CLOCKS_PER_SEC results in the number of seconds. If the value is unavailable, then -1 is returned.

Example:

    #include<time.h>
    #include<stdio.h>

    int main(void)
    {
      clock_t ticks1, ticks2;

      ticks1=clock();
      ticks2=ticks1;
      while((ticks2/CLOCKS_PER_SEC-ticks1/CLOCKS_PER_SEC)<1)
        ticks2=clock();

      printf("Took %ld ticks to wait one second.\n",ticks2-ticks1);
      printf("This value should be the same as CLOCKS_PER_SEC which is %ld.\n",CLOCKS_PER_SEC);
      return 0;
    }
```

### 12.1.4 ctime

```text
Declaration:

    char *ctime(const time_t *timer); 

Returns a string representing the localtime based on the argument timer. This is equivalent to:

    asctime(locatime(timer)); 

The returned string is in the following format:

    DDD MMM dd hh:mm:ss YYYY 

DDD	Day of the week (Sun, Mon, Tue, Wed, Thu, Fri, Sat)
MMM	Month of the year (Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec)
dd	Day of the month (1,...,31)
hh	Hour (0,...,23)
mm	Minute (0,...,59)
ss	Second (0,...,59)
YYYY	Year
The string is terminated with a newline character and a null character. The string is always 26 characters long (including the terminating newline and null characters).

A pointer to the string is returned.
```

### 12.1.5 difftime

```text
Declaration:

    double difftime(time_t time1, time_t time2); 

Calculates the difference of seconds between time1 and time2 (time1-time2).

Returns the number of seconds.
```

### 12.1.6 gmtime

```text
Declaration:

    struct tm *gmtime(const time_t *timer); 

The value of timer is broken up into the structure tm and expressed in Coordinated Universal Time (UTC) also known as Greenwich Mean Time (GMT).

A pointer to the structure is returned. A null pointer is returned if UTC is not available.
```

### 12.1.7 localtime

```text
Declaration:

    struct tm *localtime(const time_t *timer); 

The value of timer is broken up into the structure tm and expressed in the local time zone.

A pointer to the structure is returned.

Example:

    #include<time.h>
    #include<stdio.h>

    int main(void)
    {
      time_t timer;

      timer=time(NULL);
      printf("The current time is %s.\n",asctime(localtime(&timer)));
      return 0;
    }
```

### 12.1.8 mktime

```text
Declaration:

    time_t mktime(struct tm *timeptr); 

Converts the structure pointed to by timeptr into a time_t value according to the local time zone. The values in the structure are not limited to their constraints. If they exceed their bounds, then they are adjusted accordingly so that they fit within their bounds. The original values of tm_wday (day of the week) and tm_yday (day of the year) are ignored, but are set correctly after the other values have been constrained. tm_mday (day of the month) is not corrected until after tm_mon and tm_year are corrected.

After adjustment the structure still represents the same time.

The encoded time_t value is returned. If the calendar time cannot be represented, then -1 is returned.

Example:

    #include<time.h>
    #include<stdio.h>

    /* find out what day of the week is January 1, 2001 
      (first day of the 21st century) */

    int main(void)
    {
      struct tm time_struct;
      char days[7][4]={"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"};

      time_struct.tm_year=2001-1900;
      time_struct.tm_mon=0;
      time_struct.tm_mday=1;
      time_struct.tm_sec=0;
      time_struct.tm_min=0;
      time_struct.tm_hour=0;
      time_struct.tm_isdst=-1;

      if(mktime(&time_struct)==-1)
       {
        printf("Error getting time.\n");
        exit(0);
       }

      printf("January 1, 2001 is a %s.\n",days[time_struct.tm_wday]);
      return 0;
    }
```

### 12.1.9 strftime

```text
Declaration:

    size_t strftime(char *str, size_t maxsize, const char *format, const struct tm *timeptr); 

Formats the time represented in the structure timeptr according to the formatting rules defined in format and stored into str. No more than maxsize characters are stored into str (including the terminating null character).

All characters in the format string are copied to the str string, including the terminating null character, except for conversion characters. A conversion character begins with the % sign and is followed by another character which defines a special value that it is to be replaced by.
Conversion
Character	What it is replaced by
%a	abbreviated weekday name
%A	full weekday name
%b	abbreviated month name
%B	full month name
%c	appropriate date and time representation
%d	day of the month (01-31)
%H	hour of the day (00-23)
%I	hour of the day (01-12)
%j	day of the year (001-366)
%m	month of the year (01-12)
%M	minute of the hour (00-59)
%p	AM/PM designator
%S	second of the minute (00-61)
%U	week number of the year where Sunday is the first day of week 1 (00-53)
%w	weekday where Sunday is day 0 (0-6)
%W	week number of the year where Monday is the first day of week 1 (00-53)
%x	appropriate date representation
%X	appropriate time representation
%y	year without century (00-99)
%Y	year with century
%Z	time zone (possibly abbreviated) or no characters if time zone isunavailable
%%	%
Returns the number of characters stored into str not including the terminating null character. On error zero is returned.
```

### 12.1.10 time

```text
Declaration:

    time_t time(time_t *timer); 

Calculates the current calender time and encodes it into time_t format.

The time_t value is returned. If timer is not a null pointer, then the value is also stored into the object it points to. If the time is unavailable, then -1 is returned. 
```

## 12.2 more time APIs

### 12.2.1 std::clock vs. chrono

```text
  C++  Utilities library Date and time utilities C-style date and time utilities 
Defined in header <ctime>
std::clock_t clock();
Returns the approximate processor time used by the process since the beginning of an implementation-defined era related to the program's execution. To convert result value to seconds divide it by CLOCKS_PER_SEC.
Only the difference between two values returned by different calls to std::clock is meaningful, as the beginning of the std::clock era does not have to coincide with the start of the program. std::clock time may advance faster or slower than the wall clock, depending on the execution resources given to the program by the operating system. For example, if the CPU is shared by other processes, std::clock time may advance slower than wall clock. On the other hand, if the current process is multithreaded and more than one execution core is available, std::clock time may advance faster than wall clock.
Parameters
(none)
Return value
Processor time used by the program so far or (clock_t)(-1) if that information is unavailable.
Notes
On POSIX-compatible systems, clock_gettime with clock id CLOCK_PROCESS_CPUTIME_ID offers better resolution.
The value returned by clock() may wrap around on some implementations. For example, on a machine with 32-bit std::clock_t, it wraps after 2147 seconds or 36 minutes.
Example
This example demonstrates the difference between clock() time and real time
#include <iostream>
#include <chrono>
#include <ctime>
#include <thread>
 
// the function f() does some time-consuming work
void f()
{
    volatile double d;
    for(int n=0; n<10000; ++n)
       for(int m=0; m<10000; ++m)
           d += d*n*m;
}
 
int main()
{
    std::clock_t c_start = std::clock();
    auto t_start = std::chrono::high_resolution_clock::now();
    std::thread t1(f); 
    std::thread t2(f); // f() is called on two threads
    t1.join();
    t2.join();
    std::clock_t c_end = std::clock();
    auto t_end = std::chrono::high_resolution_clock::now();
 
    std::cout << "CPU time used: "
              << 1000.0 * (c_end-c_start) / CLOCKS_PER_SEC
              << " ms\n";
    std::cout << "Wall clock time passed: "
              << std::chrono::duration_cast<std::chrono::milliseconds>(t_end - t_start).count()
              << " ms\n";
}
Output:
CPU time used: 1520 ms
Wall clock time passed: 769 ms
```

### 12.2.2 gettimeofday

#### 12.2.2.1 time.c

```text
 #include <time.h>
#include <sys/time.h>
#include <stdlib.h>
#include <stdio.h>

int main(int argc, char **argv)
{
  if (argc < 2)
    {
      printf("USAGE: %s loop-iterations\n", argv[0]);
      return 1;
    }

  int iterations = atoi(argv[1]);

  struct timeval start, end;

  gettimeofday(&start, NULL);

  for (int i = 0; i < iterations; i++)
    {
    }

  gettimeofday(&end, NULL);

  printf("%ld\n", ((end.tv_sec * 1000000 + end.tv_usec)
		  - (start.tv_sec * 1000000 + start.tv_usec)));

  return 0;
}
```

#### 12.2.2.2 GETTIMEOFDAY(2) Linux Programmer's Manual GETTIMEOFDAY(2)

```text
NAME         top

       gettimeofday, settimeofday - get / set time
SYNOPSIS         top

       #include <sys/time.h>

       int gettimeofday(struct timeval *tv, struct timezone *tz);

       int settimeofday(const struct timeval *tv, const struct timezone *tz);

   Feature Test Macro Requirements for glibc (see feature_test_macros(7)):

       settimeofday(): _BSD_SOURCE
DESCRIPTION         top

       The functions gettimeofday() and settimeofday() can get and set the
       time as well as a timezone.  The tv argument is a struct timeval (as
       specified in <sys/time.h>):

           struct timeval {
               time_t      tv_sec;     /* seconds */
               suseconds_t tv_usec;    /* microseconds */
           };

       and gives the number of seconds and microseconds since the Epoch (see
       time(2)).  The tz argument is a struct timezone:

           struct timezone {
               int tz_minuteswest;     /* minutes west of Greenwich */
               int tz_dsttime;         /* type of DST correction */
           };

       If either tv or tz is NULL, the corresponding structure is not set or
       returned.  (However, compilation warnings will result if tv is NULL.)

       The use of the timezone structure is obsolete; the tz argument should
       normally be specified as NULL.  (See NOTES below.)

       Under Linux there are some peculiar "warp clock" semantics associated
       with the settimeofday() system call if on the very first call (after
       booting) that has a non-NULL tz argument, the tv argument is NULL and
       the tz_minuteswest field is nonzero.  (The tz_dsttime field should be
       zero for this case.)  In such a case it is assumed that the CMOS
       clock is on local time, and that it has to be incremented by this
       amount to get UTC system time.  No doubt it is a bad idea to use this
       feature.
RETURN VALUE         top

       gettimeofday() and settimeofday() return 0 for success, or -1 for
       failure (in which case errno is set appropriately).
ERRORS         top

       EFAULT One of tv or tz pointed outside the accessible address space.

       EINVAL Timezone (or something else) is invalid.

       EPERM  The calling process has insufficient privilege to call
              settimeofday(); under Linux the CAP_SYS_TIME capability is
              required.
CONFORMING TO         top

       SVr4, 4.3BSD.  POSIX.1-2001 describes gettimeofday() but not
       settimeofday().  POSIX.1-2008 marks gettimeofday() as obsolete,
       recommending the use of clock_gettime(2) instead.
NOTES         top

       The time returned by gettimeofday() is affected by discontinuous
       jumps in the system time (e.g., if the system administrator manually
       changes the system time).  If you need a monotonically increasing
       clock, see clock_gettime(2).

       Macros for operating on timeval structures are described in
       timeradd(3).

       Traditionally, the fields of struct timeval were of type long.

       The tz_dsttime field has never been used under Linux.  Thus, the
       following is purely of historic interest.

       On old systems, the field tz_dsttime contains a symbolic constant
       (values are given below) that indicates in which part of the year
       Daylight Saving Time is in force.  (Note: this value is constant
       throughout the year: it does not indicate that DST is in force, it
       just selects an algorithm.)  The daylight saving time algorithms
       defined are as follows:

           DST_NONE     /* not on DST */
           DST_USA      /* USA style DST */
           DST_AUST     /* Australian style DST */
           DST_WET      /* Western European DST */
           DST_MET      /* Middle European DST */
           DST_EET      /* Eastern European DST */
           DST_CAN      /* Canada */
           DST_GB       /* Great Britain and Eire */
           DST_RUM      /* Romania */
           DST_TUR      /* Turkey */
           DST_AUSTALT  /* Australian style with shift in 1986 */

       Of course it turned out that the period in which Daylight Saving Time
       is in force cannot be given by a simple algorithm, one per country;
       indeed, this period is determined by unpredictable political
       decisions.  So this method of representing timezones has been
       abandoned.
SEE ALSO         top

       date(1), adjtimex(2), clock_gettime(2), time(2), ctime(3), ftime(3),
       timeradd(3), capabilities(7), time(7)

			12.2.2.3
```

### 12.2.3 Print date and time using gettimeofday

```text
gettimeofday: Wall-Clock Time

The gettimeofday system call gets the system's wall-clock time. It takes a pointer to a struct timeval variable. This structure represents a time, in seconds, split into two fields. The tv_sec field contains the integral number of seconds, and the tv_usec field contains an additional number of microseconds. This struct timeval value represents the number of seconds elapsed since the start of the UNIX epoch, on midnight UTC on January 1, 1970. The gettimeofday call also takes a second argument, which should be NULL. Include <sys/time.h> if you use this system call.

The number of seconds in the UNIX epoch isn't usually a very handy way of representing dates. The localtime and strftime library functions help manipulate the return value of gettimeofday. The localtime function takes a pointer to the number of seconds (the tv_sec field of struct timeval) and returns a pointer to a struct tm object. This structure contains more useful fields, which are filled according to the local time zone:

·         tm_hour, tm_min , tm_sec— The time of day, in hours, minutes, and seconds.

·         tm_year, tm_mon , tm_day— The year, month, and date.

·         tm_wday— The day of the week. Zero represents Sunday.

·         tm_yday— The day of the year.

·         tm_isdst— A flag indicating whether daylight savings time is in effect.

The strftime function additionally can produce from the struct tm pointer a customized, formatted string displaying the date and time. The format is specified in a manner similar to printf, as a string with embedded codes indicating which time fields to include. For example, this format string

 
"%Y-%m-%d %H:%M:%S" 
specifies the date and time in this form:

 
2001-01-14 13:09:42 
Pass strftime a character buffer to receive the string, the length of that buffer, the format string, and a pointer to a struct tm variable. See the strftime man page for a complete list of codes that can be used in the format string. Notice that neither localtime nor strftime handles the fractional part of the current time more precise than 1 second (the tv_usec field of struct timeval). If you want this in your formatted time strings, you'll have to include it yourself.

Include <time.h> if you call localtime or strftime.

The function in Listing 8.6 prints the current date and time of day, down to the millisecond.

Listing 8.6 (print-time.c) Print Date and Time

#include <stdio.h> 
#include <sys/time.h> 
#include <time.h> 
#include <unistd.h> 
 
void print_time () 
{
  struct timeval tv; 
  struct tm* ptm; 
  char time_string[40]; 
  long milliseconds; 
 
  /* Obtain the time of day, and convert it to a tm struct. */ 
  gettimeofday (&tv, NULL); 
  ptm = localtime (&tv.tv_sec); 
  /* Format the date and time, down to a single second. */ 
  strftime (time_string, sizeof (time_string), "%Y-%m-%d %H:%M:%S", ptm); 
  /* Compute milliseconds from microseconds. */ 
  milliseconds = tv.tv_usec / 1000; 
  /* Print the formatted time, in seconds, followed by a decimal point 
     and the milliseconds. */ 
  printf ("%s.%03ld\n", time_string, milliseconds); 
} 
```

#### 12.2.3.1 Getting Current Time with Milliseconds

```text
When you call gettimeofday it gives you the number of seconds since EPOCH too, so you don't need to call time again. And when you use output of localtime as input of strftime, you may omit the intermediate variable (not a very useful point though). So your code could be written like:

timeval curTime;
gettimeofday(&curTime, NULL);
int milli = curTime.tv_usec / 1000;

char buffer [80];
strftime(buffer, 80, "%Y-%m-%d %H:%M:%S", localtime(&curTime.tv_sec));

char currentTime[84] = "";
sprintf(currentTime, "%s:%d", buffer, milli);
printf("current time: %s \n", currentTime);
an important note to be considered is that functions like localtime are not thread-safe, and you'd better use localtime_r instead.

			12.2.3.2

		12.2.4
	12.3
```
