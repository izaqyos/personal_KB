---
type: reference
title: C time and date utilities
description: Section 2 of the legacy c-kb notes.
tags: [kb-c]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "c-kb#2"
---

# C time and date utilities

[↑ c-kb](/kb-c/README.md)

## 2.1 CTime, time.h

```text
	Functions
	Time manipulation
	clock	Clock program (function)
	difftime	Return difference between two times (function)
	mktime	Convert tm structure to time_t (function)
	time	Get current time (function)

	Conversion:
	asctime	Convert tm structure to string (function)
	ctime	Convert time_t value to string (function)
	gmtime	Convert time_t to tm as UTC time (function)
	localtime	Convert time_t to tm as local time (function)
	strftime	Format time to string (function)

	Macros
	CLOCKS_PER_SEC	Clock ticks per second (macro)
	NULL	Null pointer (macro)

	types
	clock_t	Clock type (type)
	size_t	Unsigned integral type (type)
	time_t	Time type (type)
	struct tm	Time structure (type)
```

### 2.1.1 Elapsed time

```text
Elapsed Time

One way to represent an elapsed time is with a simple arithmetic data type, as with the following function to compute the elapsed time between two calendar times. This function is declared in time.h.

Function: double difftime (time_t time1, time_t time0)
Preliminary: | MT-Safe | AS-Safe | AC-Safe | See POSIX Safety Concepts.

The difftime function returns the number of seconds of elapsed time between calendar time time1 and calendar time time0, as a value of type double. The difference ignores leap seconds unless leap second support is enabled.

In the GNU C Library, you can simply subtract time_t values. But on other systems, the time_t data type might use some other encoding where subtraction doesn’t work directly.

The GNU C Library provides two data types specifically for representing an elapsed time. They are used by various GNU C Library functions, and you can use them for your own purposes too. They’re exactly the same except that one has a resolution in microseconds, and the other, newer one, is in nanoseconds.

Data Type: struct timeval
The struct timeval structure represents an elapsed time. It is declared in sys/time.h and has the following members:

time_t tv_sec
This represents the number of whole seconds of elapsed time.

long int tv_usec
This is the rest of the elapsed time (a fraction of a second), represented as the number of microseconds. It is always less than one million.

Data Type: struct timespec
The struct timespec structure represents an elapsed time. It is declared in time.h and has the following members:

time_t tv_sec
This represents the number of whole seconds of elapsed time.

long int tv_nsec
This is the rest of the elapsed time (a fraction of a second), represented as the number of nanoseconds. It is always less than one billion.

It is often necessary to subtract two values of type struct timeval or struct timespec. Here is the best way to do this. It works even on some peculiar operating systems where the tv_sec member has an unsigned type.

/* Subtract the ‘struct timeval’ values X and Y,
   storing the result in RESULT.
   Return 1 if the difference is negative, otherwise 0. */

int
timeval_subtract (result, x, y)
     struct timeval *result, *x, *y;
{
  /* Perform the carry for the later subtraction by updating y. */
  if (x->tv_usec < y->tv_usec) {
    int nsec = (y->tv_usec - x->tv_usec) / 1000000 + 1;
    y->tv_usec -= 1000000 * nsec;
    y->tv_sec += nsec;
  }
  if (x->tv_usec - y->tv_usec > 1000000) {
    int nsec = (x->tv_usec - y->tv_usec) / 1000000;
    y->tv_usec += 1000000 * nsec;
    y->tv_sec -= nsec;
  }

  /* Compute the time remaining to wait.
     tv_usec is certainly positive. */
  result->tv_sec = x->tv_sec - y->tv_sec;
  result->tv_usec = x->tv_usec - y->tv_usec;

  /* Return 1 if result is negative. */
  return x->tv_sec < y->tv_sec;
}
Common functions that use struct timeval are gettimeofday and settimeofday.

There are no GNU C Library functions specifically oriented toward dealing with elapsed times, but the calendar time, processor time, and alarm and sleeping functions have a lot to do with them.

example:
#include <iostream>
#include <sys/time.h>                // for gettimeofday()
using namespace std;

int main()
{
    struct timeval t1, t2;
    double elapsedTime;

    // start timer
    gettimeofday(&t1, NULL);

    // do something
    // ...

    // stop timer
    gettimeofday(&t2, NULL);

    // compute and print the elapsed time in millisec
    elapsedTime = (t2.tv_sec - t1.tv_sec) * 1000.0;      // sec to ms
    elapsedTime += (t2.tv_usec - t1.tv_usec) / 1000.0;   // us to ms
    cout << elapsedTime << " ms.\n";

    return 0;
}
```

### 2.1.2 My elapsed time + timer example

```text
r ~/Desktop/Work/code/C/elapsed_time.c
/*
 * =====================================================================================
 *
 *       Filename:  elapsed_time.c
 *
 *    Description:  Timer
 *
 *        Version:  1.0
 *        Created:  10/06/2015 18:02:41
 *       Revision:  none
 *       Compiler:  gcc
 *
 *         Author:  YOSI IZAQ
 *   Organization:  
 *
 * =====================================================================================
 */
#include <stdlib.h>
#include <stdio.h>
#include <sys/time.h> // for gettimeofday 
#include <time.h> // for nanosleep

int main()
{
	
	printf("Enter number of seconds for timer\n");
	double sec =0;
	double elapsed =0;
	scanf("%lf",&sec);


	printf("Starting timer for %lf seconds \n", sec);

	struct timeval t1,t2;

	//start timer
	gettimeofday(&t1, NULL);

	struct timespec time2sleep;
        time2sleep.tv_nsec = 1000000*1 ; // 1 ms = 100k nano sec
        time2sleep.tv_sec = 0; 
	
        int wholesecpassed = 1;
	while (1)
	{

	    nanosleep(&time2sleep , NULL);
	    gettimeofday(&t2, NULL);

	    elapsed = (t2.tv_sec-t1.tv_sec) *1000 ; // sec->ms
	    elapsed += (t2.tv_usec-t1.tv_usec) /1000 ; // microsec->ms

	    //printf("Elapsed time %lf milli seconds, counted whole seconds less than %d \n", elapsed, wholesecpassed);

	    if ( elapsed > (wholesecpassed * 1000) )
	    {
		    printf("%d\n",wholesecpassed);
		    wholesecpassed ++;
	    }

	    if (elapsed > (sec * 1000) )
	    {
		    printf("Timer has expired! \n");
		    exit(0);
	    }
	}


}

|    $ gcc elapsed_time.c  -o elapsed_time
|    $ ./elapsed_time 
|    Enter number of seconds for timer
|    5.6
|    Starting timer for 5.600000 seconds 
|    1
|    2
|    3
|    4
|    5
|    Timer has expired! 
```

### 2.1.3 http://stackoverflow.com/questions/1468596/calculating-elapsed-time-in-a-c-program-in-milliseconds

```text
#include <sys/time.h>
#include <stdlib.h>
#include <stdio.h>
#include <math.h>

/* Return 1 if the difference is negative, otherwise 0.  */
int timeval_subtract(struct timeval *result, struct timeval *t2, struct timeval *t1)
{
    long int diff = (t2->tv_usec + 1000000 * t2->tv_sec) - (t1->tv_usec + 1000000 * t1->tv_sec);
    result->tv_sec = diff / 1000000;
    result->tv_usec = diff % 1000000;

    return (diff<0);
}

void timeval_print(struct timeval *tv)
{
    char buffer[30];
    time_t curtime;

    printf("%ld.%06ld", tv->tv_sec, tv->tv_usec);
    curtime = tv->tv_sec;
    strftime(buffer, 30, "%m-%d-%Y  %T", localtime(&curtime));
    printf(" = %s.%06ld\n", buffer, tv->tv_usec);
}

int main()
{
    struct timeval tvBegin, tvEnd, tvDiff;

    // begin
    gettimeofday(&tvBegin, NULL);
    timeval_print(&tvBegin);

    // lengthy operation
    int i,j;
    for(i=0;i<999999L;++i) {
    	j=sqrt(i);
    }

    //end
    gettimeofday(&tvEnd, NULL);
    timeval_print(&tvEnd);

    // diff
    timeval_subtract(&tvDiff, &tvEnd, &tvBegin);
    printf("%ld.%06ld\n", tvDiff.tv_sec, tvDiff.tv_usec);

    return 0;
}

		2.1.4
```
