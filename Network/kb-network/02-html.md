---
type: reference
title: HTML
description: Section 2 of the legacy NetworkKB notes.
tags: [kb-network]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "Network/NetworkKB#2"
---

# HTML

[↑ NetworkKB](/Network/kb-network/README.md)

## 2.1 HTML Tutorial

```text
http://www.w3schools.com/HTML/
```

### 2.1.1 Basic

#### 2.1.1.1 Introduction

```text
Type in the following text:

<html>
<head>
<title>Title of page</title>
</head>
<body>
This is my first homepage. <b>This text is bold</b>
</body>
</html>

Save the file as "mypage.htm". 

Start your Internet browser. Select "Open" (or "Open Page") in the File menu of your browser. A dialog box will appear. Select "Browse" (or "Choose File") and locate the HTML file you just created - "mypage.htm" - select it and click "Open". Now you should see an address in the dialog box, for example "C:\MyDocuments\mypage.htm". Click OK, and the browser will display the page.
Example Explained

The first tag in your HTML document is <html>. This tag tells your browser that this is the start of an HTML document. The last tag in your document is </html>. This tag tells your browser that this is the end of the HTML document.

The text between the <head> tag and the </head> tag is header information. Header information is not displayed in the browser window.

The text between the <title> tags is the title of your document. The title is displayed in your browser's caption.

The text between the <body> tags is the text that will be displayed in your browser.

The text between the <b> and </b> tags will be displayed in a bold font.
HTM or HTML Extension?

When you save an HTML file, you can use either the .htm or the .html extension. We have used .htm in our examples. It might be a bad habit inherited from the past when some of the commonly used software only allowed three letter extensions.

With newer software we think it will be perfectly safe to use .html.
Note on HTML Editors:

You can easily edit HTML files using a WYSIWYG (what you see is what you get) editor like FrontPage or Dreamweaver, instead of writing your markup tags in a plain text file.

However, if you want to be a skillful Web developer, we strongly recommend that you use a plain text editor to learn your primer HTML.
Frequently Asked Questions

Q: After I have edited an HTML file, I cannot view the result in my browser. Why?
A: Make sure that you have saved the file with a proper name and extension like "c:\mypage.htm". Also make sure that you use the same name when you open the file in your browser.

Q: I have edited an HTML file, but the changes don't show in the browser. Why?
A: A browser caches pages so it doesn't have to read the same page twice. When you have modified a page, the browser doesn't know that. Use the browser's refresh/reload button to force the browser to reload the page.

Q: What browser should I use?
A: You can do all the training with all of the well-known browsers, like Internet Explorer, Firefox, Netscape, or Opera. However, some of the examples in our advanced classes require the latest versions of the browsers.

Q: Does my computer have to run Windows? What about a Mac?
A: You can do all your training on a non-Windows computer like a Mac.
```

#### 2.1.1.2 HTML Elements

```text
HTML documents are text files made up of HTML elements.

HTML elements are defined using HTML tags.
HTML Tags

    * HTML tags are used to mark-up HTML elements
    * HTML tags are surrounded by the two characters < and >
    * The surrounding characters are called angle brackets
    * HTML tags normally come in pairs like <b> and </b>
    * The first tag in a pair is the start tag, the second tag is the end tag
    * The text between the start and end tags is the element content
    * HTML tags are not case sensitive, <b> means the same as <B>

HTML Elements

Remember the HTML example from the previous page:

<html>
<head>
<title>Title of page</title>
</head>
<body>
This is my first homepage. <b>This text is bold</b>
</body>
</html>

This is an HTML element:

<b>This text is bold</b>

The HTML element starts with a start tag: <b>
The content of the HTML element is: This text is bold
The HTML element ends with an end tag: </b>

The purpose of the <b> tag is to define an HTML element that should be displayed as bold.

This is also an HTML element:

<body>
This is my first homepage. <b>This text is bold</b>
</body>

This HTML element starts with the start tag <body>, and ends with the end tag </body>.

The purpose of the <body> tag is to define the HTML element that contains the body of the HTML document.
Why do We Use Lowercase Tags?

We have just said that HTML tags are not case sensitive: <B> means the same as <b>. If you surf the Web, you will notice that plenty of web sites use uppercase HTML tags in their source code. We always use lowercase tags. Why?

If you want to follow the latest web standards, you should always use lowercase tags. The World Wide Web Consortium (W3C) recommends lowercase tags in their HTML 4 recommendation, and XHTML (the next generation HTML) demands lowercase tags.
```

#### 2.1.1.3 Basic HTML Tags

```text
he most important tags in HTML are tags that define headings, paragraphs and line breaks.

The best way to learn HTML is to work with examples. We have created a very nice HTML editor for you. With this editor, you can edit the HTML source code if you like, and click on a test button to view the result.
Try it Yourself - Examples

A very simple HTML document
This example is a very simple HTML document, with only a minimum of HTML tags. It demonstrates how the text inside a body element is displayed in the browser. 

Simple paragraphs
This example demonstrates how the text inside paragraph elements is displayed in the browser.

(You can find more examples at the bottom of this page)
Headings

Headings are defined with the <h1> to <h6> tags. <h1> defines the largest heading. <h6> defines the smallest heading.

<h1>This is a heading</h1>
<h2>This is a heading</h2>
<h3>This is a heading</h3>
<h4>This is a heading</h4>
<h5>This is a heading</h5>
<h6>This is a heading</h6>

HTML automatically adds an extra blank line before and after a heading.
Paragraphs

Paragraphs are defined with the <p> tag.

<p>This is a paragraph</p>
<p>This is another paragraph</p>

HTML automatically adds an extra blank line before and after a paragraph.
Don't Forget the Closing Tag

You might have noticed that paragraphs can be written without end tags </p>:

<p>This is a paragraph
<p>This is another paragraph

The example above will work in most browsers, but don't rely on it. Future version of HTML will not allow you to skip ANY end tags.

Closing all HTML elements with an end tag is a future-proof way of writing HTML. It also makes the code easier to understand (read and browse) when you mark both where an element starts and where it ends.
Line Breaks

The <br> tag is used when you want to break a line, but don't want to start a new paragraph. The <br> tag forces a line break wherever you place it.

<p>This <br> is a para<br>graph with line breaks</p>

Try it yourself

The <br> tag is an empty tag. It has no end tag like </br>, since a closing tag doesn't make any sense.
<br> or <br />

More and more often you will see the <br> tag written like this: <br />

Because the <br> tag has no end tag (or closing tag), it breaks one of the rules for future HTML (the XML based XHTML), namely that all elements must be closed.

Writing it like <br /> is a future proof way of closing (or ending) the tag inside the opening tag, accepted by both HTML and XML.
Comments in HTML

The comment tag is used to insert a comment in the HTML source code. A comment will be ignored by the browser. You can use comments to explain your code, which can help you when you edit the source code at a later date.

<!-- This is a comment -->

Note that you need an exclamation point after the opening bracket, but not before the closing bracket.
Recap on HTML Elements

    * Each HTML element has an element name (body, h1, p, br)
    * The start tag is the name surrounded by angle brackets: <h1>
    * The end tag is a slash and the name surrounded by angle brackets </h1>
    * The element content occurs between the start tag and the end tag
    * Some HTML elements have no content
    * Some HTML elements have no end tag

Basic Notes - Useful Tips

When you write HTML text, you can never be sure how the text is displayed in another browser. Some people have large computer displays, some have small. The text will be reformatted every time the user resizes his window. Never try to format the text in your editor by adding empty lines and spaces to the text.

HTML will truncate the spaces in your text. Any number of spaces count as one. Some extra information: In HTML a new line counts as one space. 

Using empty paragraphs <p> to insert blank lines is a bad habit. Use the <br> tag instead. (But don't use the <br> tag to create lists. Wait until you have learned about HTML lists.)

HTML automatically adds an extra blank line before and after some elements, like before and after a paragraph, and before and after a heading.

We use a horizontal rule (the <hr> tag), to separate the sections in our tutorials.


	    	    	2.1.1.4
```

### 2.1.2 Advanced
