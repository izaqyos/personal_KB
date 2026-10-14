---
type: reference
title: Intermediate and Advanced topics
description: Section 9 of the legacy javascript-kb notes.
tags: [kb-javascript]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "javascript-kb#9"
---

# Intermediate and Advanced topics

[↑ javascript-kb](/kb-javascript/README.md)

## 9.1 performance related

### 9.1.1 throttle and debounce

```text
Debounce and throttle build JavaScript example 
https://www.youtube.com/watch?v=cjIswDCKgu0&t=22s
https://github.com/WebDevSimplified/debounce-throttle-js
https://blog.webdevsimplified.com/2022-03/debounce-vs-throttle/

local folder: /Users/<user>/work/code/javascript/debounce_throttle
test:
a. load web Server
$ python3 -m http.server

b. run from chrome 
http://localhost:8000/index.html
```

#### 9.1.1.1 c. source code

#### 9.1.1.1.1 index.html

```text
$ cat index.html 
<!DOCTYPE html>
<html lang="eng">
<head>
<meta charset="utf8">
<title>Debounce Throttle Example</title>
<script src="script.js" defer></script>
</head>

<body>
    <input type="text">
    <div>
        <b>Default:</b>
        <span id="default"></span>
    </div>
    <div>
        <b>Naive_Debounce:</b>
        <span id="naive_debounce"></span>
    </div>
    <div>
        <b>Debounce:</b>
        <span id="debounce"></span>
    </div>
    <div>
        <b>Throttle:</b>
        <span id="throttle"></span>
    </div>
    <div>
        <b>mouse counter:</b>
        <span id="mousecounter"></span>
    </div>
</body>
```

#### 9.1.1.1.2 script.js

```text
</html>$ cat script.js 
const input = document.querySelector("input")
const defaultText = document.getElementById("default")
const debounceText = document.getElementById("debounce")
const naiveDebounceText = document.getElementById("naive_debounce")
const throttleText = document.getElementById("throttle")
const mouseCounterText = document.getElementById("mousecounter")

input.addEventListener("input", e => {
   //console.log("got event", e);
   //console.log("defaultText element", defaultText);
    defaultText.textContent = e.target.value;
    updateDebounce(e.target.value);
    updateNaiveDebounce(e.target.value);
    updateThrottle(e.target.value);
});

const updateNaiveDebounce = naive_debounce( txt => {
   //console.log("updateNaiveDebounce called with text", txt);
    naiveDebounceText.textContent = txt;
    incrementCount(naiveDebounceText);
}, 990);

const updateThrottle = throttle( txt => {
   console.log("updateThrottle called with text", txt);
    throttleText.textContent = txt;
    incrementCount(throttleText);
}, 100);

const updateDebounce = debounce( txt => {
   //console.log("updateDebounce called with text", txt);
    debounceText.textContent = txt;
    incrementCount(debounceText);
}, 990);

// factory method, that creates debounce method. vanilla version. will run in delay of 1 sec instead of waiting for no events 1 sec
function naive_debounce(cb, delay=1000) {
    return (...args) => {
        setTimeout( () => {
            cb(...args);
        }, 1000);
    }
}

// throttle sends a request and then every delay time sends another w/ updated args
// This naive version will send the first input in the time window. Not the last
// function throttle_naive(cb, delay=1000) {
//     let shouldWait = false;
//     let counter = 0;
// 
//     return (...args) => {
//         console.log(`throttle shouldWait = ${shouldWait}`)
//         if (shouldWait) return;
//         counter++;
//         console.log('throttle call number', counter,' cb with args = ', args);
//         cb(...args);
//         shouldWait = true;
//         setTimeout( () => { 
//             shouldWait = false;
//         }, delay);
//     }
// }

function throttle(cb, delay=1000) {
    let shouldWait = false;
    let counter = 0;
    let lastArgs;
    const timeoutFunc = () => { 
            console.log('TO func called w/ args', lastArgs);
            if (lastArgs === null) {
                shouldWait = false;
            }
            else {
                cb(...lastArgs);
                lastArgs = null;
                setTimeout(timeoutFunc, delay); //retrigger setTO func after call
            }
        }

    return (...args) => {
        console.log(`throttle shouldWait = ${shouldWait}`)
        if (shouldWait) {
            lastArgs = args;
            console.log(`setting lastArgs to = ${lastArgs}`);
            return;
        }
        counter++;
        console.log('throttle call number', counter,' cb with args = ', args);
        cb(...args);
        shouldWait = true;
        setTimeout( timeoutFunc, delay);
    }
}

//Debounce is gr8 4 when there's a lot of user activity and we want to send a single request when the user stops. e.g. user input search term
function debounce(cb, delay=1000) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout); //every time new method is created clear timeout and start wait again for delay time
        timeout = setTimeout( () => {
            cb(...args);
        }, 1000);
    }
}

document.addEventListener("mousemove", evt => {
    incrementCount(mouseCounterText);
    updateNaiveDebounce(naiveDebounceText);
    updateThrottle(throttleText);
    updateDebounce(debounceText);
})

function incrementCount(elem) {
    console.log(`incrementing count of ${elem}`);
    elem.textContent =  (parseInt(elem.innerText) || 0) +1;
}

                9.1.1.1.3
            9.1.1.2
d.

        9.1.2

    9.2

10.
```
