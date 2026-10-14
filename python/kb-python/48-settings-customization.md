---
type: reference
title: Settings Customization
description: Section 3 of the legacy KB_python notes.
tags: [kb-python, colorgram, pendulum, pypdf]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "python/KB_python#3"
---

# Settings Customization:

[↑ KB_python](/python/kb-python/README.md)

````text
We need to configure the settings for our Scrapy project to include the middleware and pipeline components we created.

```python
# myproject/settings.py
BOT_NAME = 'myproject'

SPIDER_MODULES = ['myproject.spiders']
NEWSPIDER_MODULE = 'myproject.spiders'

# Custom middleware
DOWNLOADER_MIDDLEWARES = {
    'myproject.middlewares.CustomUserAgentMiddleware': 543,
}

# Custom pipeline
ITEM_PIPELINES = {
    'myproject.pipelines.MongoDBPipeline': 300,
}

# MongoDB settings
MONGO_URI = 'mongodb://localhost:27017'
MONGO_DATABASE = 'mydatabase'

# Custom user agent
CUSTOM_USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
```

Now, with the setup complete, let's modify the `QuotesSpider` example from the previous response to use the middleware and pipeline:

```python
# myproject/spiders/quotes_spider.py
import scrapy


class QuotesSpider(scrapy.Spider):
    name = "quotes"
    start_urls = [
        'http://quotes.toscrape.com/page/1/',
    ]

    def parse(self, response):
        for quote in response.css('div.quote'):
            yield {
                'text': quote.css('span.text::text').get(),
                'author': quote.css('span small::text').get(),
            }

        next_page = response.css('li.next a::attr(href)').get()
        if next_page is not None:
            yield response.follow(next_page, self.parse)
```

To run the spider, execute the `scrapy
            42.4.2.3
````

### 42.4.3. wxPython. A gui toolkit for python. I have primarily used it in place of tkinter. You will really love it.

### 42.4.4. Pillow. A friendly fork of PIL (Python Imaging Library). It is more user friendly than PIL and is a must have for anyone who works with images.

### 42.4.5. SQLAlchemy. A database library. Many love it and many hate it. The choice is yours.

### 42.4.6. BeautifulSoup. I know it’s slow but this xml and html parsing library is very useful for beginners.

### 42.4.7. Twisted. The most important tool for any network application developer. It has a very beautiful api and is used by a lot of famous python developers.

### 42.4.8. NumPy. How can we leave this very important library ? It provides some advance math functionalities to python.

### 42.4.9. SciPy. When we talk about NumPy then we have to talk about scipy. It is a library of algorithms and mathematical tools for python and has caused many scientists to switch from ruby to python.

### 42.4.10. matplotlib. A numerical plotting library. It is very useful for any data scientist or any data analyzer.

### 42.4.11. Pygame. Which developer does not like to play games and develop them ? This library will help you achieve your goal of 2d game development.

### 42.4.12. Pyglet. A 3d animation and game creation engine. This is the engine in which the famous python port of minecraft was made

### 42.4.13. pyQT. A GUI toolkit for python. It is my second choice after wxpython for developing GUI’s for my python scripts.

### 42.4.14. pyGtk. Another python GUI library. It is the same library in which the famous Bittorrent client is created.

### 42.4.15. Scapy. A packet sniffer and analyzer for python made in python.

### 42.4.16. pywin32. A python library which provides some useful methods and classes for interacting with windows.

### 42.4.17. nltk. Natural Language Toolkit – I realize most people won’t be using this one, but it’s generic enough. It is a very useful library if you want to manipulate strings. But it’s capacity is beyond that. Do check it out.

### 42.4.18. nose. A testing framework for python. It is used by millions of python developers. It is a must have if you do test driven development.

### 42.4.19. SymPy. SymPy can do algebraic evaluation, differentiation, expansion, complex numbers, etc. It is contained in a pure Python distribution.

### 42.4.20. IPython. I just can’t stress enough how useful this tool is. It is a python prompt on steroids. It has completion, history, shell capabilities, and a lot more. Make sure that you take a look at it.

## 42.5 IPython

### 42.5.1 Introducing IPython

```text
You don’t need to know anything beyond Python to start using IPython – just type commands as you would at the standard Python prompt. But IPython can do much more than the standard prompt. Some key features are described here. For more information, check the tips page, or look at examples in the IPython cookbook.
If you haven’t done that yet see how to install ipython .
If you’ve never used Python before, you might want to look at the official tutorial or an alternative, Dive into Python.
Start IPython by issuing the ipython command from your shell, you should be greeted by the following:
Python 3.6.0 Type 'copyright', 'credits' or 'license' for more information
IPython 6.0.0.dev -- An enhanced Interactive Python. Type '?' for help.
In [1]: Unlike the Python REPL, you will see that the input prompt is In [N]: instead of >>>. The number N in the prompt will be used later in this tutorial but should usually not impact the computation.
You should be able to type single line expressions and press enter to evaluate them. If an expression is incomplete, IPython will automatically detect this and add a new line when you press Enter instead of executing right away.
Feel free to explore multi-line text input. Unlike many other REPLs, with IPython you can use the up and down arrow keys when editing multi-line code blocks.
Here is an example of a longer interaction with the IPython REPL, which we often refer to as an IPython session
In [1]: print('Hello IPython')
Hello IPython
In [2]: 21 * 2 Out[2]: 42
In [3]: def say_hello(name):
   ...:     print('Hello {name}'.format(name=name)) ...:
We won’t get into details right now, but you may notice a few differences to the standard Python REPL. First, your code should be syntax-highlighted as you type. Second, you will see that some results will have an Out[N]: prompt, while some other do not. We’ll come to this later.
Depending on the exact command you are typing you might realize that sometimes Enter will add a new line, and sometimes it will execute the current statement. IPython tries to guess what you are doing, so most of the time you should not have to care. Though if by any chance IPython does not the right thing you can force execution of the current code block by pressing in sequence Esc and Enter. You can also force the insertion of a new line at the position of the cursor by using Ctrl-o.
The four most helpful commands

The four most helpful commands, as well as their brief description, is shown to you in a banner, every time you start IPython:

command

description

?
Introduction and overview of IPython’s features.
%quickref
Quick reference.
help
Python’s own help system.
object?
Details about ‘object’, use ‘object??’ for extra details.
Tab completion

Tab completion, especially for attributes, is a convenient way to explore the structure of any object you’re dealing with. Simply type object_name.<TAB> to view the object’s attributes. Besides Python objects and keywords, tab completion also works on file and directory names.

Starting with IPython 6.0, if jedi is installed, IPython will try to pull completions from Jedi as well. This allows to not only inspect currently existing objects, but also to infer completion statically without executing code. There is nothing particular need to get this to work, simply use tab completion on more complex expressions like the following:

>>> data = ['Number of users', 123456]
... data[0].<tab>
IPython and Jedi will be able to infer that data[0] is actually a string and should show relevant completions like upper(), lower() and other string methods. You can use the Tab key to cycle through completions, and while a completion is highlighted, its type will be shown as well. When the type of the completion is a function, the completer will also show the signature of the function when highlighted.

Exploring your objects

Typing object_name? will print all sorts of details about any object, including docstrings, function definition lines (for call arguments) and constructor details for classes. To get specific information on an object, you can use the magic commands %pdoc, %pdef, %psource and %pfile

Magic functions

IPython has a set of predefined ‘magic functions’ that you can call with a command line style syntax. There are two kinds of magics, line-oriented and cell-oriented. Line magics are prefixed with the % character and work much like OS command-line calls: they get as an argument the rest of the line, where arguments are passed without parentheses or quotes. Lines magics can return results and can be used in the right hand side of an assignment. Cell magics are prefixed with a double %%, and they are functions that get as an argument not only the rest of the line, but also the lines below it in a separate argument.

Magics are useful as convenient functions where Python syntax is not the most natural one, or when one want to embed invalid python syntax in their work flow.

The following examples show how to call the built-in %timeit magic, both in line and cell mode:

In [1]: %timeit range(1000)
100000 loops, best of 3: 7.76 us per loop

In [2]: %%timeit x = range(10000)
...: max(x)
...:
1000 loops, best of 3: 223 us per loop
The built-in magics include:

Functions that work with code: %run, %edit, %save, %macro, %recall, etc.
Functions which affect the shell: %colors, %xmode, %automagic, etc.
Other functions such as %reset, %timeit, %%writefile, %load, or %paste.
You can always call magics using the % prefix, and if you’re calling a line magic on a line by itself, as long as the identifier is not defined in your namespace, you can omit even that:

run thescript.py
You can toggle this behavior by running the %automagic magic. Cell magics must always have the %% prefix.

A more detailed explanation of the magic system can be obtained by calling %magic, and for more details on any magic function, call %somemagic? to read its docstring. To see all the available magic functions, call %lsmagic.

See also

The Magic command system section of the documentation goes more in depth into how the magics works and how to define your own, and Built-in magic commands for a list of built-in magics.

Cell magics example notebook
Running and Editing

The %run magic command allows you to run any python script and load all of its data directly into the interactive namespace. Since the file is re-read from disk each time, changes you make to it are reflected immediately (unlike imported modules, which have to be specifically reloaded). IPython also includes dreload, a recursive reload function.

%run has special flags for timing the execution of your scripts (-t), or for running them under the control of either Python’s pdb debugger (-d) or profiler (-p).

The %edit command gives a reasonable approximation of multi-line editing, by invoking your favorite editor on the spot. IPython will execute the code you type in there as if it were typed interactively. Note that for %edit to work, the call to startup your editor has to be a blocking call. In a GUI environment, your editor likely will have such an option.

Debugging

After an exception occurs, you can call %debug to jump into the Python debugger (pdb) and examine the problem. Alternatively, if you call %pdb, IPython will automatically start the debugger on any uncaught exception. You can print variables, see code, execute statements and even walk up and down the call stack to track down the true source of the problem. This can be an efficient way to develop and debug code, in many cases eliminating the need for print statements or external debugging tools.

You can also step through a program from the beginning by calling %run -d theprogram.py.

History

IPython stores both the commands you enter, and the results it produces. You can easily go through previous commands with the up- and down-arrow keys, or access your history in more sophisticated ways.

Input and output history are kept in variables called In and Out, keyed by the prompt numbers, e.g. In[4]. The last three objects in output history are also kept in variables named _, __ and ___.

You can use the %history magic function to examine past input and output. Input history from previous sessions is saved in a database, and IPython can be configured to save output history.

Several other magic functions can use your input history, including %edit, %rerun, %recall, %macro, %save and %pastebin. You can use a standard format to refer to lines:

%pastebin 3 18-20 ~1/1-5
This will take line 3 and lines 18 to 20 from the current session, and lines 1-5 from the previous session.

System shell commands

To run any command at the system shell, simply prefix it with !, e.g.:

!ping www.bbc.co.uk
You can capture the output into a Python list, e.g.: files = !ls. To pass the values of Python variables or expressions to system commands, prefix them with $: !grep -rF $pattern ipython/* or wrap in {braces}. See our shell section for more details.

Define your own system aliases

It’s convenient to have aliases to the system commands you use most often. This allows you to work seamlessly from inside IPython with the same commands you are used to in your system shell. IPython comes with some pre-defined aliases and a complete system for changing directories, both via a stack (see %pushd, %popd and %dhist) and via direct %cd. The latter keeps a history of visited directories and allows you to go to any previously visited one.

Configuration

Much of IPython can be tweaked through configuration. To get started, use the command ipython profile create to produce the default config files. These will be placed in ~/.ipython/profile_default, and contain comments explaining what the various options do.

Profiles allow you to use IPython for different tasks, keeping separate config files and history for each one. More details in the profiles section.

Startup Files

If you want some code to be run at the beginning of every IPython session, the easiest way is to add Python (.py) or IPython (.ipy) scripts to your profile_default/startup/ directory. Files here will be executed as soon as the IPython shell is constructed, before any other code or scripts you have specified. The files will be run in order of their names, so you can control the ordering with prefixes, like 10-myimports.py.
```

## 42.6 colorgram, tags: colorgram

```text
    https://pypi.org/project/colorgram.py/
 pip3 install colorgram.py
```

## 42.7 pendulum, tags: pendulum

```text
$ cat pendulum_examples.py 
#!/opt/homebrew/bin/python3

import pendulum
now_israel = pendulum.now("Asia/Jerusalem") 
print(f"now in israel {now_israel}")

same_time_in_other_tz = now_israel.in_timezone('UTC')
print(f"same now of israel in UTC {same_time_in_other_tz}")

tomorrow = pendulum.now().add(days=1)
last_week = pendulum.now().subtract(weeks=1)
print(f"tomorrow={tomorrow}, last_week={last_week}")


past = pendulum.now().subtract(minutes=2)
print(f"past 2 minuts: {past.diff_for_humans()}")

delta = past - last_week

print(f"delta in hours={delta.hours}, delta in words={delta.in_words(locale='en')}")

## Proper handling of datetime normalization
#>>> pendulum.datetime(2013, 3, 31, 2, 30, tz='Europe/Paris')
#'2013-03-31T03:30:00+02:00' # 2:30 does not exist (Skipped time)
#
## Proper handling of dst transitions
#>>> just_before = pendulum.datetime(2013, 3, 31, 1, 59, 59, 999999, tz='Europe/Paris')
#'2013-03-31T01:59:59.999999+01:00'
#>>> just_before.add(microseconds=1)
#'2013-03-31T03:00:00+02:00'


$ ./pendulum_examples.py 
now in israel 2023-10-03T18:24:07.751636+03:00
same now of israel in UTC 2023-10-03T15:24:07.751636+00:00
tomorrow=2023-10-04T18:24:07.754404+03:00, last_week=2023-09-26T18:24:07.754426+03:00
past 2 minuts: 2 minutes ago
delta in hours=23, delta in words=6 days 23 hours 58 minutes
```

## 42.8 pypdf, tags: pypdf

```text
https://pypi.org/project/pypdf/
$ cat pypdf_demo.py 
#!/opt/homebrew/bin/python3
from pypdf import PdfReader

reader = PdfReader("Afeka_Challenge_Answers.pdf")
number_of_pages = len(reader.pages)
page = reader.pages[1]
text = page.extract_text()
print(f"The text in page 1 is: {text}")
$ ./pypdf_demo.py 
The text in page 1 is: count = 0while (n):n &= (n-1)count+= 1return countO(log(n)) / O(1)Arrays, hash tables: https://leetcode.com/problems/two-sum/Naive o(n^2)/0(1)  double loop Better o(n)/o(n) use hash table one loopcode:$ cat !$cat twoSum.py#!/usr/local/bin/python3import pdbfrom random import randintfrom timeit import default_timer as timerdef time_func_decorator(func):    def wrapper(*args, **kwargs):        start = timer()        ret = func(*args, **kwargs)        end = timer()        print('function {} took {} seconds'.format(func, end-start))        return ret    return wrapper"""Given an array of integers, return indices of the two numbers such that they add up to a specific target.You may assume that each input would have exactly one solution, and you may not use the same element twice.Example:Given nums = [2, 7, 11, 15], target = 9,Because nums[0] + nums[1] = 2 + 7 = 9,return [0, 1].
```

## 42.9 CSV

### 42.9.1 csv description from ChatGPT

````text
In Python, the `csv` module is a standard library module that provides functionality for reading and writing CSV (Comma-Separated Values) files. It makes it easy to work with tabular data in a plain text format. Here's a basic overview of how you can use the `csv` module:

### Reading CSV Files:

```python
import csv

file_path = 'example.csv'

# Reading from a CSV file
with open(file_path, 'r') as file:
    reader = csv.reader(file)
    for row in reader:
        print(row)
```

In this example, the `csv.reader` object is used to read the rows from a CSV file. Each row is represented as a list of values.

### Writing to CSV Files:

```python
import csv

file_path = 'example.csv'

# Writing to a CSV file
data_to_write = [
    ['Name', 'Age', 'City'],
    ['Alice', 28, 'New York'],
    ['Bob', 35, 'San Francisco'],
    ['Charlie', 22, 'Los Angeles']
]

with open(file_path, 'w', newline='') as file:
    writer = csv.writer(file)
    for row in data_to_write:
        writer.writerow(row)
```

In this example, the `csv.writer` object is used to write rows to a CSV file. The `writerow()` method is used to write a single row, and each element in the row is separated by the appropriate delimiter (a comma by default).

### Other Options:

- The `csv` module supports various dialects (e.g., 'excel', 'excel-tab', 'unix') and allows you to customize the delimiter and other parameters.
- You can also use the `DictReader` and `DictWriter` classes for working with dictionaries instead of lists.

Remember to check the Python documentation for the `csv` module for more details and options: [csv — CSV File Reading and Writing](https://docs.python.org/3/library/csv.html).

        42.9.2
````

## 42.10 seaborn

### 42.10.1 chatgpt overview of seaborn library in python

````text
Seaborn is a statistical data visualization library in Python that is built on top of Matplotlib. It provides a high-level interface for drawing attractive and informative statistical graphics. Seaborn simplifies the process of creating complex visualizations, especially for statistical relationships in datasets. Here's an overview of key features and functionalities offered by the Seaborn library:

### 1. **Statistical Plotting:**
   - Seaborn comes with several high-level functions for creating statistical visualizations, such as:
     - **`sns.scatterplot`:** Scatter plots with options for color and size.
     - **`sns.lineplot`:** Line plots with options for different aggregation functions.
     - **`sns.barplot`:** Bar plots for showing the mean of a quantitative variable across different categories.
     - **`sns.boxplot`:** Box plots for displaying the distribution of quantitative data.
     - **`sns.violinplot`:** Violin plots that combine aspects of box plots and kernel density plots.
     - **`sns.heatmap`:** Heatmaps for displaying matrix-like data.

### 2. **Data Exploration and Relationships:**
   - Seaborn provides functions like `sns.pairplot` and `sns.heatmap` for exploring relationships between variables in a dataset.

### 3. **Categorical Plots:**
   - Seaborn includes functions for visualizing relationships in categorical data, such as:
     - **`sns.catplot`:** Categorical plots that can represent various relationships in long-form data.
     - **`sns.countplot`:** Count plots for showing the count of observations in each category.

### 4. **Color Palettes and Styling:**
   - Seaborn offers a variety of color palettes to enhance the aesthetics of plots.
   - It provides easy-to-use functions for styling plots and controlling plot aesthetics.

### 5. **Distribution Plots:**
   - Seaborn includes functions like `sns.distplot` for visualizing univariate distributions, combining a histogram and a kernel density estimate.

### 6. **Regression Plots:**
   - `sns.regplot` and `sns.lmplot` are used for visualizing the relationships between variables with linear regression models.

### Example Usage:
```python
import seaborn as sns
import matplotlib.pyplot as plt

# Load the example tips dataset
tips = sns.load_dataset("tips")

# Create a scatter plot with a linear fit
sns.lmplot(x="total_bill", y="tip", data=tips, hue="smoker", markers=["o", "x"], palette="Set1")
plt.title('Scatter Plot with Linear Fit')
plt.show()
```

In this example, Seaborn is used to create a scatter plot with a linear fit, visualizing the relationship between the total bill and the tip in a dataset of restaurant tips.

Seaborn is particularly useful for creating visually appealing and informative statistical graphics with minimal code. It complements Matplotlib by providing a higher-level interface tailored for statistical data visualization.
        42.10.2

    42.11 Streamlit

        42.11.1 gemini descrition of Streamlit


| Absolutely! Let's describe the Python Streamlit library and its use cases for development:
| 
| **What is Streamlit?**
| 
| * **Open-Source Framework:**  Streamlit is a powerful and intuitive Python library designed to simplify the process of creating web apps for data science and machine learning projects.
| * **Key Differentiator:** Streamlit's defining feature is its ability to transform your Python scripts into interactive web applications in a remarkably fast and straightforward way.
| * **Minimal Front-End Knowledge:**  Streamlit allows developers, data scientists, and machine learning engineers to build beautiful, interactive data-driven apps without requiring extensive web development experience.  
| 
| **Core Strengths**
| 
| * **Rapid Development:** Build apps in pure Python with a minimal learning curve. 
| * **Interactive Widgets:** Easily add sliders, dropdown menus, text boxes, and more for user input.
| * **Dynamic Updates:** Streamlit apps are reactive; when code or data changes, the app automatically updates to reflect the changes, providing a seamless user experience.
| * **Data & ML Focused:** Works seamlessly with popular Python libraries like NumPy, pandas, matplotlib, scikit-learn, and more.
| 
| **Common Use Cases**
| 
| 1. **Data Exploration & Visualization:**  Create dashboards and tools to analyze, visualize, and interact with datasets in an intuitive way.
| 
| 2. **Machine Learning Model Demos:**  Build interactive applications to showcase your machine learning models, enable users to input data, and observe predictions in real-time.
| 
| 3. **Internal Tools:**  Develop custom internal tools for your team to streamline processes, monitor data, or share analysis results
| 
| 4. **Educational Prototypes:** Quickly prototype machine learning and data science concepts and create visual educational tools.
| 
| **Development Flow**
| 
| 1. **Write Python Code:**  Your Streamlit app is essentially a Python script using Streamlit's provided functions (e.g., `st.write`, `st.dataframe`, `st.slider`).
| 
| 2. **App Structure:** Streamlit offers layout elements and interactive widgets to structure your app
| 
| 3. **Run the Script:** Streamlit runs your script and automatically spins up a local development server, rendering your app in the web browser.
| 
| **Example Code Snippet**
| 
| ```python
| import streamlit as st
| import pandas as pd
| 
| st.title("Interactive Data Explorer")
| 
| data = pd.read_csv("your_data.csv")
| st.dataframe(data)
| 
| selected_column = st.selectbox("Select a column", data.columns)
| st.line_chart(data[selected_column])
| ```
| 
| **Let me know if you'd like to dive deeper into any of these use cases, learn about specific Streamlit components, or see more complex examples!**

        42.11.2
    42.12
````
