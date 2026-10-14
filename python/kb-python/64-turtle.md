---
type: reference
title: turtle
description: Section 58 of the legacy KB_python notes.
tags: [kb-python, turtle]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "python/KB_python#58"
---

# turtle, tags: turtle

[↑ KB_python](/python/kb-python/README.md)

## 58.1 documentation

### 58.1.1 https://docs.python.org/3/library/turtle.html

### 58.1.2 Chatgpt

#### 58.1.2.1 python turtle most used API

```text
Python's Turtle library provides a variety of APIs for creating graphics and animations using a turtle graphics metaphor. Some of the most commonly used APIs in the Turtle library include:

Turtle(): Creates a new turtle object to draw on the screen.

forward(distance): Moves the turtle forward by the specified distance.

backward(distance): Moves the turtle backward by the specified distance.

right(angle): Turns the turtle to the right by the specified angle.

left(angle): Turns the turtle to the left by the specified angle.

penup(): Lifts the turtle's pen off the screen so that it no longer draws.

pendown(): Puts the turtle's pen back on the screen so that it can draw.

pencolor(color): Sets the color of the turtle's pen.

fillcolor(color): Sets the color of the turtle's fill.

begin_fill(): Begins a new shape to fill.

end_fill(): Fills the shape that was begun with begin_fill().

speed(speed): Sets the speed of the turtle's animation.

circle(radius): Draws a circle with the specified radius.

dot(size): Draws a dot with the specified size.

setposition(x, y): Moves the turtle to the specified position.

These are just a few of the most commonly used APIs in the Turtle library. There are many others that can be used to create more complex graphics and animations.
```

#### 58.1.2.2 begin_fill example

```text
            Sure, here's an example of using the begin_fill() and end_fill() methods in the Turtle library to fill a shape with a specified color:

import turtle

# Create a turtle object
t = turtle.Turtle()

# Set the fill color to blue
t.fillcolor("blue")

# Begin filling a shape
t.begin_fill()

# Draw a square
for i in range(4):
    t.forward(50)
    t.left(90)

# End the fill
t.end_fill()

# Exit the turtle window
turtle.done()
In this example, the begin_fill() method is called before drawing the square, which signals that any subsequent drawing should be filled with the specified color (in this case, blue). The end_fill() method is called after drawing the square to indicate that the filling should stop.

When you run this code, you'll see a blue square with filled color on the screen.
```

### 58.1.3 circle star example

```text
$ cat !$ |pbcopy
cat turtle_star_circle.py |pbcopy
from turtle import *
color('blue', 'green')
begin_fill()
while True:
    forward(600)
    left(170)
    if abs(pos()) < 1:
        break
end_fill()
done()

This code uses the Turtle library to draw a complex shape filled with a gradient color.

Here's a breakdown of the code:

from turtle import *
This line imports everything from the Turtle library, making all its functions and classes available in the current program.

color('blue', 'green')
This line sets the color of the turtle's pen and fill. The first argument, 'blue', sets the pen color to blue, and the second argument, 'green', sets the fill color to green.

begin_fill()
This line signals that the shape being drawn should be filled with the specified color. Any subsequent drawing commands will fill the shape until end_fill() is called.

while True:
    forward(600)
    left(170)
    if abs(pos()) < 1:
        break
This is the core of the code, where the shape is drawn. The forward(600) command moves the turtle forward by 600 units, and left(170) rotates the turtle to the left by 170 degrees. This combination of commands creates a complex, looping shape. The if abs(pos()) < 1: line checks if the turtle has returned to its starting position (within a very small tolerance), and if so, the loop is exited with break.

end_fill()
This line signals that the filling of the shape should stop. The shape created by the loop will be filled with the color specified earlier.

done()
This line tells the Turtle library that the drawing is complete and it should exit and close the turtle window.

When you run this code, you'll see a looping shape filled with a gradient from blue to green.
```

### 58.1.4 spiral

```text
import turtle

# Create a turtle object
t = turtle.Turtle()

from turtle import color, begin_fill, end_fill
color('blue', 'green')
begin_fill()

# Draw a spiral
for i in range(50):
    t.forward(i * 10)
    t.right(144)

# Exit the turtle window
end_fill()
turtle.done()
```

### 58.1.5 rainbound circle

```text
import turtle

# Create a turtle object
t = turtle.Turtle()

# Draw a circle with rainbow colors
colors = ["red", "orange", "yellow", "green", "blue", "purple", "pink", "brown", "black", "gray", ]
n = len(colors)
for i in range(n):
    t.pencolor(colors[i % n])
    t.fillcolor(colors[i % n])
    t.begin_fill()
    t.circle(200)
    t.end_fill()
    t.right(360//n)

# Exit the turtle window
turtle.done()

        58.1.6
```

## 58.2 turtle examples

## 58.3 turtle shapes

```text
import turtle

# Get a list of all supported shapes
shapes = turtle.getshapes()

# Print the list of shapes
print(shapes)

['arrow', 'turtle', 'circle', 'square', 'triangle', 'classic']

turtle.shape("circle")
```

## 58.4 turtle colors

```text
turtle.color(*args)
Return or set pencolor and fillcolor.

Several input formats are allowed. They use 0 to 3 arguments as follows:

color()
Return the current pencolor and the current fillcolor as a pair of color specification strings or tuples as returned by pencolor() and fillcolor().

color(colorstring), color((r,g,b)), color(r,g,b)
Inputs as in pencolor(), set both, fillcolor and pencolor, to the given value.

color(colorstring1, colorstring2), color((r1,g1,b1), (r2,g2,b2))
Equivalent to pencolor(colorstring1) and fillcolor(colorstring2) and analogously if the other input format is used.

If turtleshape is a polygon, outline and interior of that polygon is drawn with the newly set colors.

 >>> turtle.color("red", "green")
 >>> turtle.color()
 ('red', 'green')
 >>> color("#285078", "#a0c8f0")
 >>> color()
 ((40.0, 80.0, 120.0), (160.0, 200.0, 240.0))

https://cs111.wellesley.edu/labs/lab02/colors

- online resources for rgb colors
RGB Color Picker: This website allows you to choose colors using a color picker tool. You can adjust the RGB values of the selected color, and the website will display the resulting color in real-time. https://www.rgbcolorpicker.com/

ColorHexa: This website provides detailed information about RGB colors, including their hexadecimal codes, HSL values, and CMYK values. You can browse colors by name, or search for specific colors by entering their RGB values. https://www.colorhexa.com/

Adobe Color: This website allows you to create and save custom color palettes, and provides a variety of tools for working with RGB colors. You can browse existing color palettes, or create your own by adjusting the RGB values of the colors. https://color.adobe.com/create/color-wheel/

W3Schools Color Picker: This website provides a simple color picker tool that allows you to choose colors by adjusting their RGB values. You can also preview how the selected color will look on different types of backgrounds. https://www.w3schools.com/colors/colors_rgb.asp
-
    58.5
```
