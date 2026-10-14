---
type: reference
title: "Udemy course https://www.udemy.com/course/go-the-complete-developers-guide/learn/"
description: "Notes from the Udemy course Go: The Complete Developers Guide, with code repository link."
tags: [go, course-notes, tutorial, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "go-kb#2"
---

# Udemy course https://www.udemy.com/course/go-the-complete-developers-guide/learn/

[↑ go-kb](/kb-go/README.md)

## 2.1 intro

### 2.1.1 basics

```text
- complete code, https://github.com/StephenGrider/GoCasts

- ~/work/<employer>/gitexternal/go/GoCasts:]2097$ ls
README.md	code/		diagrams/

- my code examples
~/work/code/go/udemy/go_the_complete_develpor_guide

- editor, visual studio code, add extension: GO, rich development thingi...
in vs-code bottom right click "plain text", choose go, install all extra tools

- run hello world
$ cat main.go
package main

import "fmt"

func main() {
	fmt.Println("Hello Go")
}
$ go run !$
go run main.go
Hello Go

- build code
go build main.go
$ ls
main*		main.go

- Note that for building executable the package name must be 'main'
Also main() func must be included

- GO packages documentation
  https://golang.org/pkg/

- course diagrams
  https://github.com/StephenGrider/GoCasts/tree/master/diagrams
  Open the folder containing the set of diagrams you want to edit

Click on the ‘.xml’ file
Click the ‘raw’ button
Copy the URL
Go to https://www.draw.io/
On the ‘Save Diagrams To…’ window click ‘Decide later’ at the bottom
Click ‘File’ -> ‘Import From’ -> ‘URL’
Paste the link to the XML file
Tada!

-  go is staticaly typed language like C++, Java etc
  
- := shorthand form for declaring a var and inferring it's type from value
```

### 2.1.2 Cards project

#### 2.1.2.1 early stages

```text
/Users/<user>/work/code/go/udemy/go_the_complete_develpor_guide/cards

Data Structures. Array, Slice.
Array - fixed length
Slice - Dynamic length
Elements all share same type

slice example
cards := [] string {"card1", newCard()}

append returns a copy. ex:
	cards = append(cards, "appended card")

range iteration:
	for i, card := range cards {
		fmt.Println(i, card)
	}
   
-> Go is NOT OO. So no classes
Instead we use custom types like type deck []string
Now the equivaliant of methods are "receiver" functions

run:
~/work/code/go/udemy/go_the_complete_develpor_guide/cards:]2056$ go run main.go  deck.go 
[card1 Five of diamonds appended card]
0 card1
1 Five of diamonds
2 appended card

-> slices supported indices and subslices just like python
functions can return multiple values. ex:
func deal(d deck, handSize int) (deck, deck)  {
	return d[:handSize], d[handSize:]
}

-> GO supports type casting. ex:
[] byte ("a str") will convert the string to byte slice
```

#### 2.1.2.2 Cards implementation

```text
            $ cat !!:2 !!:3
cat main.go deck.go
package main

func main() {
	// // ver1
	// // var card string = "Ace of spades"
	// card := newCard() //shorthand form of above
	// fmt.Println(card)

	// ver2 pre types
	// cards := []string{"card1", newCard()}

	cards := newDeck()
	// // convert to string
	// fmt.Println(cards.toString())
	cards.shuffle()
	cards.saveToFile("saved.deck")

	cards2 := readFromFile("saved.deck")
	// cards2 := readFromFile("nofile")
	cards2.print()

	// // ver 3 deal cards
	// // cards.print()
	// hand, remainingCards := deal(cards, 5)
	// hand.print()
	// remainingCards.print()

}

func newCard() string {
	return "Five of diamonds"
}
package main

import (
	"fmt"
	"io/ioutil"
	"math/rand"
	"os"
	"strings"
	"time"
)

type deck []string

func newDeck() deck {

	cards := deck{}
	cardSuites := []string{"Clubs", "Hearts", "Diamonds", "Spades"}
	cardValues := []string{"Ace", "Two", "Three", "Four"}

	// _ instead of real name to avoid unused var error
	for _, suite := range cardSuites {
		for _, val := range cardValues {
			cards = append(cards, val+" of "+suite)
		}
	}
	return cards
}

// d - this, deck - type
// by convention a receiver is abbreviated to 1-2 letters. hence 'd'
func (d deck) print() { // a receiver function only works on deck type. sorta equivalent to deck.print() in OO
	for i, card := range d {
		fmt.Println(i, card)
	}
}

func deal(d deck, handSize int) (deck, deck) {
	return d[:handSize], d[handSize:]
}

func (d deck) toString() string {
	return strings.Join([]string(d), ",")
}

func (d deck) saveToFile(fname string) error {
	return ioutil.WriteFile(fname, []byte(d.toString()), 0666)
}

func readFromFile(fname string) deck {
	bs, err := ioutil.ReadFile(fname)
	if err != nil {
		fmt.Println("read file got error", err)
		os.Exit(1)
	}
	return deck(strings.Split(string(bs), ","))
}

func (d deck) shuffle() {

	src := rand.NewSource(time.Now().UnixNano())
	r := rand.New(src)
	for i := range d {
		j := r.Intn(len(d))
		d[i], d[j] = d[j], d[i]
	}
}

$ go run main.go  deck.go 
0 Four of Hearts
1 Three of Spades
2 Ace of Hearts
3 Ace of Clubs
4 Three of Hearts
5 Two of Hearts
6 Three of Diamonds
7 Ace of Spades
8 Ace of Diamonds
9 Two of Diamonds
10 Two of Spades
11 Two of Clubs
12 Three of Clubs
13 Four of Spades
14 Four of Clubs
15 Four of Diamonds
```

#### 2.1.2.3 Adding tests

```text
No test frameworks in go. No mocha, jasmine, selenium etc
any file ending w/ _test is considered a test file
go test will run all these files

$ go test
PASS
ok  	_/Users/<user>/work/code/go/udemy/go_the_complete_develpor_guide/cards	0.520s
$ cat deck_test.go 
package main

import (
	"os"
	"testing"
)

func TestNewDeck(t *testing.T) {
	cards := newDeck()
	size := len(cards)

	if size != 16 {
		t.Errorf("Expected size 16. Got %d ", size)
	}

	if "Ace of Clubs" != cards[0] {
		t.Errorf("Expected Ace of Clubs. Got %s ", cards[0])
	}
	if "Four of Spades" != cards[len(cards)-1] {
		t.Errorf("Expected Four of Spades. Got %s ", cards[len(cards)-1])
	}
}

func TestSaveToDeckAndNewDeckFromFile(t *testing.T) {
	os.Remove("_decktesting")
	d := newDeck()
	d.saveToFile("_decktesting")
	d1 := readFromFile("_decktesting")

	if len(d1) != len(d) {
		t.Errorf("Read deck len %d. Expected %d", len(d1), len(d))
	}
	os.Remove("_decktesting")
}
```

#### 2.1.2.4 practice

```text
$ go run main.go 
0  is even
1  is odd
2  is even
3  is odd
4  is even
5  is odd
6  is even
7  is odd
8  is even
9  is odd
10  is even
$ cat main.go 
package main

import "fmt"

func main() {
	nums := []int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10}

	for i := range nums {
		if i%2 != 0 {
			fmt.Println(i, " is odd")
		} else {
			fmt.Println(i, " is even")
		}
	}

}
```

#### 2.1.2.5 adding struct

#### 2.1.2.5.1 structs, pointers and pass by value all very similar to C lang.

```text
$ cat !$
cat main.go
package main

import "fmt"

type contactInfo struct {
	email string
	zip   int
}
type person struct {
	firstName string
	lastName  string
	contact   contactInfo //can also just declare type like below
	// contactInfo //can also just declare type
}

func main() {
	fmt.Println("Demo structs")

	yosi := person{
		firstName: "Yosi",
		lastName:  "Doe",
		contact: contactInfo{
			email: "izaqyos@gmail.com",
			zip:    12345,
		},
	} // order matters!!

	// deby := person{firstName: "Dana", lastName: "Doe"} // init by name is better
	deby := person{
		firstName: "Dana",
		lastName:  "Doe",
		contact: contactInfo{
			email: "dana@example.com",
			zip:    12345,
		},
	} // order matters!!
	var may person // assigns zero values (string "", num 0, etc)
	may.firstName = "Alice"
	//fmt.Println(yosi)
	// fmt.Println(deby)
	//fmt.Printf("%+v\n", may) //print by k,v

	yosi.updateName("Josepe")
	yosi.print()
	//or
	debyPtr := &deby
	debyPtr.updateName("Dana")
	deby.print()
}

func (p person) updateNameByVal(newName string) {
	p.firstName = newName //Note, no change will happen - pass by value
}

func (p *person) updateName(newName string) {
	p.firstName = newName // will work. below syntax also works
	(*p).firstName = newName
}

func (p person) print() {
	fmt.Printf("%+v\n", p) //print by k,v
}
$ go run main.go
Demo structs
{firstName:John lastName:Doe contact:{email:izaqyos@gmail.com zip: 12345}}
{firstName:Dana lastName:Doe contact:{email:dana@example.com zip: 12345}}
```

#### 2.1.2.5.2 pointer operators

```text
just like c/c++.
& - take reference (memory address)
* - dereference (value at pointed address)

Note that all primitive types (array, struct, int, string) are copied by value
Slices, are like std::vector in C++ so although they are passed by value changes to underlying array will take effect 
So 
  Memory
+---------------------------------------------------------------------------------+
|            ||  Slice1                                                           |     s1 := []int{0,1,2}
|            ||        +-----------------------------------------------+          |
|00000001    ||        |Capacity, length, * array|                     |          |     func modify(s: []int) {
|            ||        |                         |                     |          |      s1[0] = 3
|            ||        |                         |                     |          |     }
|            ||        +-----------------------------------------------+          |
|00000004    ||        |                         v                     |          |
|            ||        |                                               |          |
|            ||        |                                               |          |
|            ||        |                          ^                    |          |
|            ||        +-----------------------------------------------+          |
|            ||                                   |                               |
| 00000008   ||   S copy in modify                |                               |
|            ||        +------------------------------------------------+         |
|            ||        |capacity, length, * array |                     |         |
|            ||        +--------------------------+---------------------+         |
|            ||                                                                   |
|            ||                                                                   |
|            ||                                                                   |
|            ||                                                                   |
|            ||                                                                   |
|            ||                                                                   |
|            ||                                                                   |
|            ||                                                                   |
+---------------------------------------------------------------------------------+

(similiar to Jave pass by const ref)
In go terminology slices, maps, pointer, channels, functions and the rest of data structures that have an internal pointer to actuall data are refered to as Reference type

                2.1.2.5.3

id=__golang_maps__
```

#### 2.1.2.6 maps

```text
k,v data structure, like std::map in C++, dictionary in python etc
k,v types are static and same for all keys,values

maps vs stucts
maps:
Static typed keys/values same for all
memory fragmented, reference type
dynamic size
keys are indexed, supports iteration
can add/remove keys at runtime


structs
Dynamic type values
memory contingent, value type
fixed size
keys are not indexed, not supports iteration
compile time all keys are known
represent a new static type with a constant set of properties
```

#### 2.1.2.6.1 my maps example

```text
$ cat !$
cat gomaps_demo.go
package main
import "fmt"

func main()  {
	fmt.Println("golang map basic demo")
	var familyAges map[string]int
	familyAges = make(map[string]int)
	familyAges["yosi"] = 45
	familyAges["deby"] = 44
	familyAges["may"] = 15
	familyAges["itay"] = 11
	familyAges["kay"] = 8
	familyAges["aimy"] = 6
	familyAges["jandoe"] = 65
	fmt.Println("range iterate all k,v pairs in map:")
	for name := range familyAges{
		fmt.Println(name, "age is", familyAges[name])
	}
	fmt.Println("test key in map")
	var age, found = familyAges["Guy"]
	if (found) {
		fmt.Println("Guy, of age:",age, "exists in dict")
	} else {
		fmt.Println("Guy, of age:",age, "doesn't exist in dict")
	}
	var _, found1 = familyAges["yosi"]
	if (found1) {
		fmt.Println("yosi exists in dict")
	} else {
		fmt.Println("yosi doesn't exist in dict")
	}


	fmt.Println("delete from map by key. note jandoe is deleted")
	delete(familyAges, "jandoe")
	for name := range familyAges{
		fmt.Println(name, "age is", familyAges[name])
	}
	
	fmt.Println("declare and init a map in one line")
	var capitols = map[string]string{"usa":"washington", "israel":"tel-aviv", "france": "paris"}
	fmt.Println(capitols)
}$ go run gomaps_demo.go
golang map basic demo
range iterate all k,v pairs in map:
jandoe age is 65
yosi age is 45
deby age is 44
may age is 15
itay age is 11
kay age is 8
aimy age is 6
test key in map
Guy, of age: 0 doesn't exist in dict
yosi exists in dict
delete from map by key. note jandoe is deleted
aimy age is 6
yosi age is 45
deby age is 44
may age is 15
itay age is 11
kay age is 8
declare and init a map in one line
map[france:paris israel:tel-aviv usa:washington]
```

#### 2.1.2.6.2 my structs demo

```text
                2.1.2.6.3
```

#### 2.1.2.7 interfaces

```text
meant to extend functionality over different types. 
Solves a similar problem as in java generics, c++ templtes but they are not generics!

The mechanics is a bit different than other languages. in go you don't extend or implement.
instead every type in same program that has same methods as an interface is automatically considered as extending
interfaces are abstract, can't instantiate from them directly
$ cat main.go 
package main 

import "fmt"

type bot interface{
    getGreeting() string
}
type englishBot struct{}    
type spanishBot struct{}    


func main() {
    eb1 := englishBot{}
    printGreeting(eb1)
    sb1 := spanishBot{}
    printGreeting(sb1)
    
}

func ( englishBot) getGreeting() string {
    return "hello world"
}

//func ( sb spanishBot) getGreeting() string { //note when receiver ref is not used it can be ommited
func ( spanishBot) getGreeting() string {
    return "hola"
}


func  printGreeting(b bot) {
    fmt.Println(b.getGreeting())
}

// Demo why interfaces are needed
// func main() {
//     eb1 := englishBot{}
//     printGreeting(eb1)
//     sb1 := spanishBot{}
//     printGreeting(sb1)
//     
// }
// 
// func ( englishBot) getGreeting() string {
//     return "hello world"
// }
// 
// //func ( sb spanishBot) getGreeting() string { //note when receiver ref is not used it can be ommited
// func ( spanishBot) getGreeting() string {
//     return "hola"
// }
// 
// 
// func  printGreeting(eb englishBot) {
//     fmt.Println(eb.getGreeting())
// }
// 
// //printGreeting redeclared in this block error. no overloading in go!
// func  printGreeting(sb spanishBot) {
//     fmt.Println(sb.getGreeting())
// }








$ go run main.go
hello world
hola
```

#### 2.1.2.8 Http Client

```text
Go HTTP response struct
+-------------------------------------------+
|                                           |
|                                           |
|  +----------+          +------------+     |
|  | Status   |          | string     |     |
|  |          +---------->            |     |
|  +----------+          +------------+     |
|                                           |
|  +----------+         +-------------+     |          io.ReadCloser interface
|  |StatusCode+--------->int          |     |                                                    io.Reader interface
|  +----------+         +-------------+     |         +-----------------------------+           +-------------------+
|                                           |         |   +----------------+        |           |                   |
|  +----------+         +-------------+     |         |   | Reader         |        |           |  Read([]byte) (int, error)
|  |          |         |             |     |         |   |                +-------------------->                   |
|  | Body     +-------->+io.ReadCloser|     |         |   +----------------+        |           +-------------------+
|  |          |         +-------------+     |         |   +-----------------+       |            io.Closer interface
|  +----------+                             |         |   | Closer          +-------------------^-------------------+
+-------------------------------------------+         +---+-------------------------+           |                   |
                                                                                                |   Close() (error) |
                                                                                                |                   |
                                                                                                +-------------------+

interfaces can also be composed of other interfaces
Reader interface is used to cannonize different inputs (HTTP, disk, RAM etc) and output byte slice
it take p []byte as argument and then fills it with actual data that was read. return n - # bytes read, error if there was an error
its the caller responsibility to allocate enough space in the slice (use make([]byte, 99999))

opposite of Reader interface is Writer interface which gets []byte and writes it to any kind of output
io.Copy(dst Writer, src Reader) will copy all data from src to dst


$ go run main.go
<!doctype html><html ... html">
script> ...       </body></html>
Wrote 15503 bytes
```

#### 2.1.2.9 Channels and go-routines

#### 2.1.2.9.1 status checker demo

#### 2.1.2.9.1.1 dumb implementation

```text
duh, runs serially...
mostly waits for get responses

$ cat main.go
package main

import (
	"fmt"
	"net/http"
)

func main() {
	links := []string{
		"http://google.com",
		"http://facebook.com",
		"http://golang.org",
		"http://amazon.com",
		"http://stackoverflow.com",
	}

	for _, link := range links {
        checklink(link)
	}
}

func checklink(link string) {
	_, err := http.Get(link)
	if err != nil {
		fmt.Println(link, "is not responding")
	}

	fmt.Println(link, "is responding")
}
$ go run main.go
http://google.com is responding
http://facebook.com is responding
http://golang.org is responding
http://amazon.com is responding
http://stackoverflow.com is responding
```

#### 2.1.2.9.1.2 go-routines

```text
syntax go func()
func() will be executed in a separate routine
Go has a CPU scheduler that by default will be single threaded and run on a single core (affinity?)
Its possible to run the scheduler so it used one thread per core.
The scheduler runs a routine from Q until it finishes/sleeps/blocks then it rotates and lets another routine from Q run on core.
"concurrentcy is not parallelism"
concurrent - allow multiple threads to be run on CPU (by scheduler) so that if one is blocked another is running
parallelism - requires multi cores. threads truly run at same time.
So there's one main routine and child routines invoked with the go keyword
Note that just like w/ main thread and spawned threads, the main thread must wait form spawned threads to end (join) before it terminates.
In go, this is acheived via channels. Which are a communication mechanism for routines
channels are staticaly typed
```

#### 2.1.2.9.2 channels

```text
syntax:
declare and pass:
    c := make(chan string)
	for _, link := range links {
        go checklink(link, c)
	}


pass as function param:
func checklink(link string, c chan string) {

pass value into channel
channel<-'a'
resp<-channel (var resp awaits for a value to be sent to channel which is then used to initialize var resp)
fmt.Println(<-channel)

implementation with channels
$ cat !$
cat main.go
package main

import (
	"fmt"
	"net/http"
)

func main() {
	links := []string{
		"http://google.com",
		"http://facebook.com",
		"http://golang.org",
		"http://amazon.com",
		"http://stackoverflow.com",
	}

    c := make(chan string)
	for _, link := range links {
        go checklink(link, c)
        // fmt.Println(link, <-c) // also serial, since it blocks for input
	}

    // // Demo, how to get the five expected inputs from channel
    // fmt.Println(<-c)
    // fmt.Println(<-c)
    // fmt.Println(<-c)
    // fmt.Println(<-c)
    // fmt.Println(<-c)
    // // fmt.Println(<-c) // This line will block forever

    for i:=0; i<len(links); i++ {
        fmt.Println(<-c)
    }
}

func checklink(link string, c chan string) {
	_, err := http.Get(link)
	if err != nil {
		c<-link + " is not responding"
	}

	c <- link + " is up"
}
$ go run main.go
http://google.com is up
http://golang.org is up
http://stackoverflow.com is up
http://facebook.com is up
http://amazon.com is up
```

#### 2.1.2.9.3 "deamon" thread, ping every n seconds

```text
note, adding function-literals (lambdas). syntax
    for l:= range c { 
        go func(){ //labmda
            time.Sleep(1*time.Second) 
            checklink(l,c)
        }()

Final Code:
$ cat !$
cat main.go
package main

import (
	"fmt"
	"net/http"
    "time"
)

func main() {
	links := []string{
		"http://google.com",
		"http://facebook.com",
		"http://golang.org",
		"http://amazon.com",
		"http://stackoverflow.com",
	}

    c := make(chan string)
	for _, link := range links {
        go checklink(link, c)
        // fmt.Println(link, <-c) // also serial, since it blocks for input
	}

    // // Variant 1. for loop that contains a call blocking on channel
    // for { 
    //     go checklink(<-c, c)
    // }

    //// Variant 2. Prefered syntax for loop that contains a call blocking on channel
    //for l:= range c { 
    //    time.Sleep(1*time.Second) // wrong place to sleep. sleeps main routine so it will only process one value on channel every 5 seconds
    //    go checklink(l, c)
    //}

    // // Variant 3. use function-literal to sleep after response on channel
    // for l:= range c { 
    //     go func(){
    //         time.Sleep(1*time.Second) 
    //         checklink(l,c) // l variable is referencing outer scope variable. That's a big problem since both main routine and child
    //         // routines reference the same var. This will lead to race condition and unexpected results.
    //     }()
    // }

    // Variant 4. use function-literal to sleep after response on channel
    for l:= range c { 
        go func(link string ){
            time.Sleep(1*time.Second) 
            checklink(link,c) 
        }(l)// fix l variable is referencing outer scope variable. pass by value. now main and sub routines have separate copies
    }




}

func checklink(link string, c chan string) {
    // time.Sleep(1*time.Second) // another wrong place to sleep. each sub routine will wait 5 seconds before it starts 
	_, err := http.Get(link)
	if err != nil {
        fmt.Println(link,  " is not responding")
		c<-link
	}

    fmt.Println(link, " is up")
	c <- link
}
$ go run !$
go run main.go
http://google.com  is up
http://golang.org  is up
http://stackoverflow.com  is up
http://amazon.com  is up
http://google.com  is up
http://facebook.com  is up
http://stackoverflow.com  is up
http://golang.org  is up
http://amazon.com  is up
http://google.com  is up
http://stackoverflow.com  is up
http://facebook.com  is up
http://golang.org  is up
^Csignal: interrupt


                2.1.2.9.4

            2.1.2.10
        2.1.3
    2.2
```
