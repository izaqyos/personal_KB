---
type: reference
title: wiki
description: Section 4 of the legacy general-kb notes.
tags: [kb-general]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "general-kb#4"
---

# wiki

[↑ general-kb](/kb-general/README.md)

## 4.1 wiki markup

### 4.1.1 https://confluence.atlassian.com/bitbucketserver/markdown-syntax-guide-776639995.html Markdown syntax guide

````text
|      On this page
|      
|      Markdown syntax
|      Headings
|      Paragraphs
|      Character styles
|      Unordered list
|      Ordered list
|      List in list
|      Quotes or citations
|      Inline code characters
|      Code blocks
|      Links to external websites
|      Linking issue keys to JIRA applications
|      Linking to pull requests
|      Images
|      Tables
|      Backslash escapes
|      README files
|      Related content
|      
|      Creating a Contributions guidelines file
|      Review and discuss a pull request
|      Jira integration
|      Using Smart Commits in Bitbucket Server
|      Event payload
|      Still need help?
|      The Atlassian Community is here for you.
|      Ask the community
|      Bitbucket Server uses Markdown for formatting text, as specified in CommonMark (with a few extensions). You can use Markdown in the following places:
|      any pull request's descriptions or comments, or
|      in README files (if they have the .md file extension).
|      Use Control-Shift-P or Command-Shift-P to preview your markdown.
|      Markdown syntax
|      The page below contains examples of Markdown syntax. For a full list of all the Markdown syntax, consult the CommonMark help or specification.
|      Headings
|      # This is an H1
|      ## This is an H2
|      ###### This is an H6
|      
|      This is also an H1
|      ==================
|      
|      This is also an H2
|      ------------------
|      Paragraphs
|      Paragraphs are separated by empty lines. To create a new paragraph, press <return> twice.
|      Paragraph 1
|      
|      Paragraph 2
|      Character styles
|      *Italic characters* 
|      _Italic characters_
|      **bold characters**
|      __bold characters__
|      ~~strikethrough text~~
|      Unordered list
|      *  Item 1
|      *  Item 2
|      *  Item 3
|          *  Item 3a
|          *  Item 3b
|          *  Item 3c
|      Ordered list
|      1.  Step 1
|      2.  Step 2
|      3.  Step 3
|          1.  Step 3.1
|          2.  Step 3.2
|          3.  Step 3.3
|      List in list
|      1.  Step 1
|      2.  Step 2
|      3.  Step 3
|          *  Item 3a
|      	*  Item 3b
|      	*  Item 3c
|      Quotes or citations
|      Introducing my quote:
|      
|      > Neque porro quisquam est qui 
|      > dolorem ipsum quia dolor sit amet, 
|      > consectetur, adipisci velit...
|      Inline code characters
|      Use the backtick to refer to a `function()`.
|       
|      There is a literal ``backtick (`)`` here.
|      Code blocks
|      Indent every line of the block by at least 4 spaces.
|      
|      This is a normal paragraph:
|      
|          This is a code block.
|          With multiple lines.
|      
|      Alternatively, you can use 3 backtick quote marks before and after the block, like this:
|      
|      ```
|      This is a code block
|      ```
|      
|      To add syntax highlighting to a code block, add the name of the language immediately
|      after the backticks: 
|      
|      ```javascript
|      var oldUnload = window.onbeforeunload;
|      window.onbeforeunload = function() {
|          saveCoverage();
|          if (oldUnload) {
|              return oldUnload.apply(this, arguments);
|          }
|      };
|      ```
|      Bitbucket Server uses CodeMirror to apply syntax highlighting to the rendered markdown in comments, READMEs and pull request descriptions. All the common coding languages are supported, including C, C++, Java, Scala, Python and JavaScript. See Configuring syntax highlighting for file extensions.
|      Within a code block, ampersands (&) and angle brackets (< and >) are automatically converted into HTML entities.
|      Links to external websites
|      This is [an example](http://www.example.com/) inline link.
|      
|      [This link](http://example.com/ "Title") has a title attribute.
|      
|      Links are also auto-detected in text: http://example.com/
|      Linking issue keys to JIRA applications
|      When you use Jira application issue keys (of the default format) in comments and pull request descriptions Bitbucket Server automatically links them to the Jira application instance.
|      The default Jira application issue key format is two or more uppercase letters ([A-Z][A-Z]+), followed by a hyphen and the issue number, for example TEST-123.
|      Linking to pull requests
|      Introduced with Bitbucket Server 4.9, you can reference pull requests from comments and descriptions in other pull requests. The syntax for linking to pull request looks like this: 
|      projectkey/repo-slug#pr_id
|      To link to a pull request in the same project and repository, you only need to include the pull request ID. 
|      #123
|      To link to a pull request in the same project but a different repository, include the repository slug before the pull request ID.
|      example-repo#123
|      To link to a pull request in a different project and repository, include the project key and the repository slug before the pull request ID.
|      PROJ/example-repo#123
|      Images
|      Inline image syntax looks like this:
|      ![Alt text](/path/to/image.jpg)
|      ![Alt text](/path/to/image.png "Optional title attribute")
|      ![Alt text](/url/to/image.jpg)
|      For example:
|      ...
|      ![Mockup for feature A](http://monosnap.com/image/bOcxxxxLGF.png)
|      ...
|      Reference image links look like this:
|      ![Alt text][id]
|      where 'id' is the name of a previously defined image reference, using syntax similar to link references:
|      [id]: url/to/image.jpg "Optional title attribute"
|      For example:
|      ...
|      <--Collected image definitions-->
|      [MockupA]: http://monosnap.com/image/bOcxxxxLGF.png "Screenshot of Feature A mockup" 
|      ...
|      <!--Using an image reference-->
|      ![Mockup for feature A][MockupA]
|      ...
|      Tables
|      | Day     | Meal    | Price |
|      | --------|---------|-------|
|      | Monday  | pasta   | $6    |
|      | Tuesday | chicken | $8    |
|      Backslash escapes
|      Certain characters can be escaped with a preceding backslash to preserve the literal display of a character instead of its special Markdown meaning. This applies to the following characters:
|      \  backslash 
|      `  backtick 
|      *  asterisk 
|      _  underscore 
|      {} curly braces 
|      [] square brackets 
|      () parentheses 
|      #  hash mark 
|      >  greater than 
|      +  plus sign 
|      -  minus sign (hyphen) 
|      .  dot 
|      !  exclamation mark
|      README files
|      If your repository contains a README.md file at the root level, Bitbucket Server displays its contents on the repository's Source page if the file has the .md extension. The file can containMarkdown and a restricted set of HTML tags.
|      
````

### 4.1.2 links, anchors

#### 4.1.2.1 internal links, anchors

```text
|            Using Anchors in Pages
|            Skip to end of metadata
|            Created by Jonathan Bird (Local Admin), last modified on Jan 06, 2011
|            Go to start of metadata
|            Using Anchors
|            Creating an Anchor
|            To create an anchor
|            To link to a specific section on a different page
|            An anchor used in a wiki article can allow readers to jump to their desired information. Instead of scrolling through an entire article, the reader can click on the word or phrase which takes them to the desired section of the article. There are already anchors automatically placed within the table of contents on a page (if a table of contents has been added), which will take the reader from main heading listed in the table of contents to desired section. However, anchors may be used in several other different ways to maximize readers' ease of navigation through the articles on the Wiki.
|            Using Anchors
|            Here are a few ways to use anchors in articles:
|            FAQs pages- with anchors, the user can click a question from a list and be directed to the answer in a list below.
|            References- Using references in articles maintains accuracy and credibility. With anchors you can link from a reference number down to the reference section where information about the source may be expanded.
|            Linking to Previous Stated Information- for example, if you are writing some instructions and you need to refer back to some preliminary steps. Creating an anchor at that section and then linking to the section with a phrase will make writing the article easier.
|            Skipping Steps- for longer articles and for instructions where users may not need to complete every step in some situations, anchors provide a way for the user to skip steps they don't need to complete and go on to a later one.
|            Creating an Anchor
|            Creating an anchor is a simple task. Just be sure that you have the correct titles for all anchors in the links that you create for them. To create the linking anchor, you first create the anchor at the point you want the link to go to. For example, if you want the words, "Getting Started" to be your go to point in an article so that you do not have to repeadtedly refer to the steps, that would be your anchor.
|            To create an anchor

            1. Go to the portion of text where you would like to create your anchor.
|            2. Before the text, type:
|            {anchor: NameofAnchor}
|            3. In the place where you want to insert a link to the anchor, type the following:
|            [TitleofLink|# NameofAnchor]
|            In the "TitleofLink" area, type the title you wish to call your link. If you are using anchors for references, numbers are useful to organize sources. If you are linking to a previous or later section, the title of that section would be appropriate.
|            To link to a specific section on a different page
|            1. On the wiki page where you want to link, click the Wiki Markup tab.
|            2. Find the section you want to create an anchor to, and then type:
|            {anchor:NameofAnchor}
|            3. Save the wiki page, and then go to the page where you want to create the link.
|            4. Click the Wiki Markup tab, and then scroll to the area to create the link.
|            5. Type the following
|            [Link Title|Space tag: Page Name #Nameof Anchor]
|            6. Save you page, and then test your anchor.

            4.1.2.2


        4.1.3
    4.2
5.
```
