---
type: reference
title: "Important packages, modules"
description: "Legacy Python KB section: Important packages, modules (flask, lightweight web framework, flask tutorial, pramiko, ssh, ftp, execute commands remotely)"
tags: [packaging, python, legacy]
generated: { by: "human:izaqyos", at: "2026-10-14T00:00:00Z" }
stale_after: "2028-10-14T00:00:00Z"
sources:
  - { id: paramiko-client, resource: "https://docs.paramiko.org/en/stable/api/client.html", title: "Paramiko docs: SSHClient" }
  - { id: py3-whatsnew, resource: "https://docs.python.org/3/whatsnew/3.0.html", title: "What's New In Python 3.0" }
status: stable
capture_type: source
legacy_source: "python/KB_python#42"
---

# Important packages, modules, tags: Important packages, modules libraries

[↑ KB_python](/python/kb-python/README.md)

## 42.1 flask, lightweight web framework

### 42.1.1 http://flask.pocoo.org/docs/1.0/tutorial/

### 42.1.2 https://www.tutorialspoint.com/flask

```text
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
   return 'Hello World’

if __name__ == '__main__':
   app.run()

run example:
ipython:
edit
(paste code)
$ ipython 
Python 3.7.3 (default, Mar 27 2019, 09:23:15) 
Type 'copyright', 'credits' or 'license' for more information
IPython 7.5.0 -- An enhanced Interactive Python. Type '?' for help.
history file:  /Users/<user>/.python_history
Welcome <user>, time is 16:44:24 05/29/19 IDT,  Have a good session :-) 

In [1]: edit                                                                                                                                                                                   
IPython will make a temporary file named: /var/folders/k4/zgbbn6ms2xv0d_4g85qw60vc0000gn/T/ipython_edit_vb8t0uf5/ipython_edit_fjsfx8k_.py
Editing... done. Executing edited code...
 * Serving Flask app "__main__" (lazy loading)
 * Environment: production
   WARNING: This is a development server. Do not use it in a production deployment.
   Use a production WSGI server instead.
 * Debug mode: off
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
```

#### 127.0.0.1 - - [29/May/2019 16:45:30] "GET / HTTP/1.1" 200 -

```text
From browser:
http://localhost:5000/
```

### 42.1.3 flask tutorial

#### 42.1.3.1 https://www.tutorialspoint.com/flask/index.htm

#### 42.1.3.1.1 basics

```text
my code: /Users/<user>/work/code/python/web/flask/flask_tutorial
```

#### 42.1.3.1.1.1 hello flask

```text
- code: $ cat !$
cat helloWorldFlask.py
from flask import Flask
app = Flask(__name__)

@app.route('/')
def is_alive():
    return "Hello Flask server is alive"

@app.route('/hello/<name>')
def hello_name(name):
    return f"Hello {name}"

def main():
    app.run(port=3333, debug=True)
if __name__=="__main__":
    main()

- run server 

- run client
                    42.1.3.1.1.2

            42.1.3.2

        42.1.4
```

## 42.2 pramiko, ssh, ftp, execute commands remotely

### 42.2.1 https://medium.com/@keagileageek/paramiko-how-to-ssh-and-file-transfers-with-python-75766179de73

```text
Paramiko- How to SSH and transfer files with python
Go to the profile of Mokgadi Rasekgala
Mokgadi RasekgalaFollow
Apr 11, 2017
So i’m employed at a social media type of company with a product working a lot like facebook and the past week had to sort out an issue with loosing the linking between video urls on our db with the actual content on the server. Some mismatch with Kaltura. But anyways long story short, I had to write a little script which would download videos from a remote server to upload to Kaltura to and get new urls to replace old ones int the db.
SSH is the method typically used to access a remote machine and run commands, retrieve files or upload files.
You can transfer files from the remote machine to the local or vice versa using SFTP (Secure File Transfer Protocol) and SCP(Secure Copy Protocol).
According to paramiko.org, The python paramiko model gives an abstraction of the SSHv2 protocol with both the client side and server side functionality. As a client, you can authenticate yourself using a password or key and as a server you can decide which users are allowed accesss and the channels you allow
In this blog I focus on the client side.
Let’s get on with it
The primary client of Paramiko as documented in the API, is Paramiko.SSHClient. An instance of the Paramiko.SSHClient can be used to make connections to the remote server and transfer files
MAKING A CONNECTION
import paramiko
ssh_client=paramiko.SSHClient()
ssh_client.connect(hostname=’hostname’,username=’mokgadi’,password=’mypassword’)
#Raises BadHostKeyException,AuthenticationException,SSHException,socket error
when you try this, you get the following error:
missing_host_key raise SSHException(‘Server %r not found in known_hosts’ % hostname) paramiko.ssh_exception.SSHException: Server ‘hostname’ not found in known_hosts
Understanding Known Hosts
You see this error because you have not informed your machine that the remote server you “trust” the server you are trying to access. If you go onto you command line or terminal and try to connect to a server for the first time, You will get a message similar to this:

The authenticity of host ‘hostname’ can’t be established.RSA key fingerprint is ‘key’. Are you sure you want to continue connecting (yes/no)?

When you select yes here, you let your machine know that it can trust the machine and you can now access it without the prompt until the key for that machine changes.
Paramiko similarly requires that you validate your trust with the machine. This validation is handled by calling set_missing_host_key_policy() on the SSHClient an passing the policy you want implemented when accessing a new remote machine. By default, the paramiko.SSHclient sets the policy to the RejectPolicy. The policy rejects connection without validating as we saw above. Paramiko does however give you a way to sort of “Trust all” key policy, the AutoAddPolicy. Parsing an instance of the AutoAddPolicy to set_missing_host_key_policy() changes it to allow any host.
import paramiko
ssh_client =paramiko.SSHClient()
ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh_client.connect(hostname=’hostname’,username=’mokgadi’,password=’mypassword’)
You should now be in the green
RUNNING COMMANDS ON THE REMOTE MACHINE
To run a command exec_command is called on the SSHClient with the command passed. The response is returned as a tuple (stdin,stdout,stderr)
For example to list all the files in a directory:
stdin,stdout,stderr=ssh_client.exec_command(“ls”)
Getting the type for each of the returned,
type(stdin) and type(stdout) is ‘paramiko.channel.ChannelFile’
type(stderr) is class ‘paramiko.channel.ChannelStderrFile’
According to paramiko.org they are all python file like objects.
The stdin is a write-only file which can be used for commands requiring input
The stdout file give the output of the command
The stderr gives the errors returned on executing the command. Will be empty if there is no error
for the command above
```

> Updated 2026-10 to current practice.[^paramiko-client][^py3-whatsnew]

The original snippet mixed Python 2 `print` statements and `u'...'` reprs with Python 3. In Python 3, `print` is a function and `readlines()` returns plain `str` lines. `SSHClient` can be used as a context manager, and `exec_command()` returns `(stdin, stdout, stderr)`.[^paramiko-client] For a command that needs input, such as `sudo`, write to `stdin`. Use `sudo -S` so sudo reads the password from stdin (or pass `get_pty=True`), and never hard-code the password:

```python
import getpass
import paramiko

with paramiko.SSHClient() as ssh:
    ssh.load_system_host_keys()                        # trust ~/.ssh/known_hosts
    ssh.connect(hostname="<host>", username="<user>")  # key/agent auth by default

    stdin, stdout, stderr = ssh.exec_command("ls")
    print(stdout.readlines())   # ['anaconda-ks.cfg\n', 'Desktop\n', ...]
    print(stderr.readlines())   # [] if no error

    # Command requiring input
    stdin, stdout, stderr = ssh.exec_command("sudo -S ls /root")
    stdin.write(getpass.getpass("sudo password: ") + "\n")
    stdin.flush()
    print(stdout.readlines())
```

```text
FILE TRANSFERS
File transfers are handled by the paramiko.SFTPClient which you get from calling open_sftp() on an instance of Paramiko.SSHClient.
Downloading a file from remote machine
ftp_client=ssh_client.open_sftp()
ftp_client.get(‘remotefileth’,’localfilepath’)
ftp_client.close()
Uploading file from local to remote machine
ftp_client=ssh.open_sftp()
ftp_client.put(‘localfilepath’,remotefilepath’)
ftp_client.close()

        42.2.2
```

## 42.3 Data science, AI, big data

### 42.3.1 overview

```text
These are the five most essential Data Science libraries you have to know:

Numpy
Pandas
Matplotlib
Scikit-Learn
Scipy
Let’s see them one by one!
```

#### 42.3.1.1 Numpy

```text
Numpy will help you to manage multi-dimensional arrays very efficiently. Maybe you won’t do that directly, but since the concept is a crucial part of data science, many other libraries (well, almost all of them) are built on Numpy. Simply put: without Numpy you won’t be able to use Pandas, Matplotlib, Scipy or Scikit-Learn. That’s why you need it on the first hand.

python libraries and packages - numpy array
3-dimensional numpy array
But on the other hand, it also has a few well-implemented methods. I quite often use Numpy’s random function, which I found slightly better than the random module of the standard library. And when it comes to simple predictive analytics tasks like linear or polynomial regression, Numpy’s polyfit function is my favorite. (More about that in another article.)

python libraries and packages - prediction with numpy polyfit
prediction with numpy’s polyfit
```

#### 42.3.1.2 Pandas, tags: Pandas

```text
documentation: https://pandas.pydata.org/

To analyze data, we like to use two-dimensional tables – like in SQL and in Excel. Originally, Python didn’t have this feature. Weird, isn’t it? But that’s why Pandas is so important! I like to say, Pandas is the “SQL of Python.” (Eh, I can’t wait to see what I will get for this sentence in the comment section… ;-)) Okay, to be more precise: Pandas is the library that will help us to handle two-dimensional data tables in Python. In many senses it’s really similar to SQL, though.

python libraries and packages - pandas dataframe
a pandas dataframe
With pandas, you can load your data into data frames, you can select columns, filter for specific values, group by values, run functions (sum, mean, median, min, max, etc.), merge dataframes and so on. You can also create multi-dimensional data-tables.

That’s a common misunderstanding, so let me clarify: Pandas is not a predictive analytics or machine learning library. It was created for data analysis, data cleaning, data handling and data discovery… By the way, these are the necessary steps before you run machine learning projects, and that’s why you will need pandas for every scientific project, too.

If you start with Python for Data Science and you learned the basics of Python, I recommend that you focus on learning Pandas next. These short article series of mine will help you: Pandas for Data Scientists.
```

#### 42.3.1.2.1 chatgpt overview of pandas, tags: chatgpt overview of pandas

````text
Pandas is a powerful and widely-used open-source data manipulation and analysis library for Python. It provides easy-to-use data structures and functions for efficiently manipulating large datasets. Here's an overview of key features and functionalities offered by the Pandas library:

### 1. **Data Structures:**
   - **Series:** A one-dimensional labeled array capable of holding any data type.
   - **DataFrame:** A two-dimensional labeled data structure with columns that can be of different data types. It can be thought of as a spreadsheet or SQL table.
   - **Panel (Less Commonly Used):** A three-dimensional data structure that can be used for handling 3D data.

### 2. **Key Features:**
   - **Data Cleaning:** Pandas provides methods for handling missing data, duplications, and outliers.
   - **Data Exploration:** Easily inspect and summarize data, compute descriptive statistics, and explore relationships between variables.
   - **Indexing and Selection:** Efficiently index, slice, and subset data using labels or integer-based indexing.
   - **Grouping and Aggregation:** Group data based on certain criteria and perform aggregations using functions like sum, mean, etc.
   - **Merging and Joining:** Combine datasets using SQL-like merge and join operations.
   - **Time Series Data:** Specialized tools for working with time series data, including date range generation and frequency conversion.
   - **Input/Output:** Read and write data in various formats, including CSV, Excel, SQL databases, and more.

### 3. **Data Visualization:**
   - Pandas integrates well with other Python visualization libraries like Matplotlib and Seaborn for creating insightful plots and graphs.

### 4. **Performance:**
   - Pandas is built on top of NumPy, a highly efficient and fast numerical computing library. It leverages vectorized operations to perform computations on entire arrays without the need for explicit looping.

### 5. **Community and Ecosystem:**
   - Pandas has a large and active community, making it easy to find help, tutorials, and resources.
   - It plays a crucial role in the broader Python data science ecosystem and is often used in conjunction with libraries like NumPy, Matplotlib, SciPy, and scikit-learn.

### Example Usage:
```python
import pandas as pd

# Creating a DataFrame
data = {'Name': ['Alice', 'Bob', 'Charlie'],
        'Age': [25, 30, 35],
        'City': ['New York', 'San Francisco', 'Los Angeles']}

df = pd.DataFrame(data)

# Basic operations
print(df.head())  # Display the first few rows
print(df.describe())  # Display summary statistics
```

Pandas is an essential tool for data scientists, analysts, and researchers working with tabular data in Python. Its versatility and ease of use make it a go-to choice for various data manipulation and analysis tasks.
````

#### 42.3.1.2.2 udemy 100 day python course pandas chapter (day 25)

#### 42.3.1.2.2.1 pandas101

````text
$ cat !$
cat ./pandas101.py
#!/opt/homebrew/bin/python3
import csv, pandas

def load_data_naive():
    data = []
    datafname = 'weather_data.csv'
    with open(datafname) as datafile:
        for line in datafile:
            data.append(line.split())

    print(f"loaded CSV data: {data}")
    return data

def load_dataframe():
    datafname = 'weather_data.csv'
    dataframe = pandas.read_csv(datafname)
    return dataframe

def load_csv_data():
    data = []
    datafname = 'weather_data.csv'
    with open(datafname) as datafile:
        csv_reader = csv.reader(datafile)
        for row in csv_reader:
            data.append(row)
    print(f"loaded CSV data: {data}")
    return data

def print_tempratures(data):
    print("printing all the temperatures in the dataset")
    for row in data:
        print(row[1])

def type_checks(data):
    print(f"dataframe type is {type(data)}, temperature column type is {type(data['temp'])}")
    
def columns_work_demo(data):
    print("Panda. work on columns")
    print(f"mean temperature: {data['temp'].mean()}")
    print(f"max temperature: {data.temp.max()}") #cal call column as a property (like in JS) or as dictionary by key as above

def rows_work_demo(data):
    print("Panda. work on rows")
    print(data[data.day == 'Monday'])
    print(f"day in which temp was maximal: {data[data.temp == data.temp.max()]}")
    print("Extract a specific column from a specific row. say Monday row...")
    monday = data[data.day == 'Monday']
    print(monday.condition)
    print(f"convert Monday temperature from celsios to fahrenheit: {monday.temp*(9/5)+32}")

def working_with_data_frames(data):
    print("Create a DataFrame (table) from a dictionary")
    df_dict = {
            "kids": ["Alice", "Bob", "Carol", "Dana"],
            "birthdates": ["15.01.2008", "20.05.2011", "03.09.2014", "10.11.2016"]
            }
    kids_df = pandas.DataFrame(df_dict)
    print(f"Created kids bdays DataFrame\n {kids_df}")
    print("Saving DataFrame to .csv file...")
    kids_df.to_csv("KidsBdays.csv")
    print("contents of csv file:")
    with open("KidsBdays.csv") as csv:
        lines = csv.readlines()
    print(lines)

def main():
    data = load_dataframe()
    print(data)
    type_checks(data)
    json_data = data.to_json()
    print(json_data)

    columns_work_demo(data)
    rows_work_demo(data)
    working_with_data_frames(data)

    



    #data = load_csv_data()
    #print_tempratures(data[1:])

    #data = load_data_naive()

if __name__ == "__main__":
    main()
$ ./pandas101.py 
         day  temp condition
0     Monday    12     Sunny
1    Tuesday    14      Rain
2  Wednesday    15      Rain
3   Thursday    14    Cloudy
4     Friday    21     Sunny
5   Saturday    22     Sunny
6     Sunday    24     Sunny
dataframe type is <class 'pandas.core.frame.DataFrame'>, temperature column type is <class 'pandas.core.series.Series'>
{"day":{"0":"Monday","1":"Tuesday","2":"Wednesday","3":"Thursday","4":"Friday","5":"Saturday","6":"Sunday"},"temp":{"0":12,"1":14,"2":15,"3":14,"4":21,"5":22,"6":24},"condition":{"0":"Sunny","1":"Rain","2":"Rain","3":"Cloudy","4":"Sunny","5":"Sunny","6":"Sunny"}}
Panda. work on columns
mean temperature: 17.428571428571427
max temperature: 24
Panda. work on rows
      day  temp condition
0  Monday    12     Sunny
day in which temp was maximal:       day  temp condition
6  Sunday    24     Sunny
Extract a specific column from a specific row. say Monday row...
0    Sunny
Name: condition, dtype: object
convert Monday temperature from celsios to fahrenheit: 0    53.6
Name: temp, dtype: float64
Create a DataFrame (table) from a dictionary
Created kids bdays DataFrame
    kids  birthdates
0  Alice  15.01.2008
1    Bob  20.05.2011
2  Carol  03.09.2014
3   Dana  10.11.2016
Saving DataFrame to .csv file...
contents of csv file:
[',kids,birthdates\n', '0,Alice,15.01.2008\n', '1,Bob,20.05.2011\n', '2,Carol,03.09.2014\n', '3,Dana,10.11.2016\n']

                    42.3.1.2.2.2 chatgpt pandas count number of rows with a specific value in a DataFrame
To count the number of rows with a specific value in a DataFrame using pandas in Python, you can use the `sum()` function along with a boolean condition. Here's an example:

```python
import pandas as pd

# Create a sample DataFrame
data = {'Name': ['Alice', 'Bob', 'Charlie', 'David'],
        'Age': [25, 30, 25, 35],
        'City': ['New York', 'San Francisco', 'New York', 'Los Angeles']}

df = pd.DataFrame(data)

# Count the number of rows where the 'City' column has a specific value, e.g., 'New York'
specific_value = 'New York'
count_rows = (df['City'] == specific_value).sum()

print(f"Number of rows with '{specific_value}' in the 'City' column: {count_rows}")
```

In this example, `df['City'] == specific_value` creates a boolean Series where each element is `True` if the corresponding row has the specified value in the 'City' column and `False` otherwise. The `.sum()` function then counts the number of `True` values, which corresponds to the number of rows with the specific value.

Adjust the column name and specific value according to your DataFrame and requirements.

                    42.3.1.2.2.3
                42.3.1.2.3
````

#### 42.3.1.3 Matplotlib

```text
I hope I don’t have to detail why data visualization is important. Data visualization helps you to better understand your data, discover things that you wouldn’t discover in raw format and communicate your findings more efficiently to others.
The best and most well-known Python data visualization library is Matplotlib. I wouldn’t say it’s easy to use… But usually if you save for yourself the 4 or 5 most commonly used code blocks for basic line charts and scatter plots, you can create your charts pretty fast.

python libraries and packages - dataviz matplotlib
matplotlib dataviz example
Here’s another article that introduces Matplotlib more in-depth: How to use matplotlib.
```

#### 42.3.1.3.1 chatpgpt overview of matplotlib in python

````text
Matplotlib is a popular and widely-used 2D plotting library for Python. It provides a flexible and comprehensive set of tools for creating a wide range of static, animated, and interactive plots. Here's an overview of key features and functionalities offered by the Matplotlib library:

### 1. **Plot Types:**
   - **Line Plots:** Visualize data points with connected lines.
   - **Scatter Plots:** Display individual data points without connecting lines.
   - **Bar Plots:** Represent data with rectangular bars.
   - **Histograms:** Visualize the distribution of a dataset.
   - **Pie Charts:** Display data as sectors of a circle.
   - **Box Plots:** Show the distribution of a dataset's summary statistics.

### 2. **Customization:**
   - **Labels and Titles:** Add titles, axis labels, and annotations to enhance plot clarity.
   - **Colors and Styles:** Customize colors, line styles, markers, and other visual elements.
   - **Legends and Annotations:** Provide additional information about data series in the plot.
   - **Subplots:** Create multiple plots in a single figure for side-by-side comparisons.

### 3. **Support for LaTeX:**
   - Matplotlib supports the use of LaTeX for mathematical expressions, making it suitable for scientific and technical plotting.

### 4. **3D Plotting:**
   - Matplotlib provides tools for creating 3D plots, including surface plots, scatter plots, and more.

### 5. **Integration with Pandas:**
   - Matplotlib seamlessly integrates with Pandas DataFrames, allowing for easy visualization of data stored in Pandas structures.

### 6. **Animation:**
   - Matplotlib can create animated plots, useful for visualizing changes over time or iterations.

### 7. **Extensibility:**
   - Matplotlib is highly extensible, allowing users to create custom plots and functionalities.

### Example Usage:
```python
import matplotlib.pyplot as plt
import numpy as np

# Creating a simple line plot
x = np.linspace(0, 2*np.pi, 100)
y = np.sin(x)

plt.plot(x, y, label='sin(x)')
plt.title('Simple Sinusoidal Plot')
plt.xlabel('x-axis')
plt.ylabel('y-axis')
plt.legend()
plt.grid(True)
plt.show()
```

This example creates a basic sine wave plot using Matplotlib. The library is versatile and can be used for a wide range of visualization tasks, from simple line plots to complex statistical graphics.

Matplotlib is often used in combination with other libraries like NumPy, Pandas, and Seaborn to create comprehensive data visualizations in scientific computing, data analysis, and machine learning.
                42.3.1.3.2
````

#### 42.3.1.4 Scikit-Learn

```text
Without any doubt the fanciest things in Python are Machine Learning and Predictive Analytics. And the best library for that is Scikit-Learn, which simply defines itself as “Machine Learning in Python.” Scikit-Learn has several methods, basically covering everything you might need in the first few years of your data career: regression methods, classification methods, and clustering, as well as model validation and model selection. You can also use it for dimensionality reduction and feature extraction.

python libraries and packages - scikit learn random forest
a simple classification with a random forest model in Scikit Learn
Note: You will see that machine learning with Scikit-Learn is nothing but importing the right modules and running the model fitting method of them… That’s not the challenging part – it’s rather the data cleaning, the data formatting, the data preparation, and finding the right input values and the right model. So before you start using Scikit-Learn, I suggest two things. First – as I already said – master your basic Python and pandas skills to become great at data preparation. Secondly, make sure you understand the theory and the mathematical background of the different prediction and classification models, so you know what happens with your data when you apply them.

machine Learning meme
source: pythonprogramming.net
```

#### 42.3.1.5 Scipy

```text
This is kind of confusing, but there is a Scipy library and there is a Scipy stack. Most of the libraries and packages I wrote about in this article are part of the Scipy stack (that is for scientific computing in Python). And one of these components is the Scipy library itself, which provides efficient solutions for numerical routines (the math stuff behind machine learning models). These are: integration, interpolation, optimization, etc.

Just like Numpy, you most probably won’t use Scipy itself, but the above-mentioned Scikit-Learn library highly relies on it. Scipy provides the core mathematical methods to do the complex machine learning processes in Scikit-learn. That’s why you have to know it.

        42.3.2
```

## 42.4 20 Python libraries you can’t live without

```text
|      Hi there fellas. Today i am going to list 20 python libraries which have been a part of my toolbelt and should be a part of yours as well. So here they are:
|      
        42.4.1 Requests. The most famous http library written by kenneth reitz. It’s a must have for every python developer.
```

#### 42.4.1.1 q. provide explanation about python requests package with some code examples

````text
a.  The Python `requests` package is a popular HTTP library that simplifies making HTTP requests in Python. It provides a convenient and intuitive API for interacting with web services and retrieving data from web servers. Here's an explanation of the `requests` package with some code examples:

Installation:
Before using the `requests` package, you need to install it. You can install it using pip by running the following command:

```
pip install requests
```

Basic GET Request:
To make a GET request to a URL and retrieve the response, you can use the `get` function from the `requests` module. Here's an example:

```python
import requests

response = requests.get("https://api.example.com/data")
print(response.status_code)  # Status code of the response
print(response.text)  # Content of the response
```

Sending Query Parameters:
You can send query parameters along with the URL using the `params` parameter. Here's an example:

```python
import requests

parameters = {"key1": "value1", "key2": "value2"}
response = requests.get("https://api.example.com/data", params=parameters)
print(response.url)  # Full URL with query parameters
```

Sending Headers:
You can send custom headers in the request using the `headers` parameter. Here's an example:

```python
import requests

headers = {"User-Agent": "Mozilla/5.0"}
response = requests.get("https://api.example.com/data", headers=headers)
print(response.text)
```

Sending POST Request with Data:
To send a POST request and include data in the request body, you can use the `post` function and provide the data as a dictionary using the `data` parameter. Here's an example:

```python
import requests

data = {"key1": "value1", "key2": "value2"}
response = requests.post("https://api.example.com/submit", data=data)
print(response.status_code)
```

Handling JSON Response:
When working with JSON responses, you can use the `json` method of the response object to parse the JSON data into a Python dictionary. Here's an example:

```python
import requests

response = requests.get("https://api.example.com/data")
data = response.json()  # Parsed JSON response
print(data["key"])  # Accessing a specific value from the JSON
```

Handling Errors:
The `requests` package raises exceptions for certain errors, such as network issues or invalid URLs. You can handle these exceptions using try-except blocks. Here's an example:

```python
import requests

try:
    response = requests.get("https://api.example.com/data")
    response.raise_for_status()  # Raise exception for non-2xx status codes
except requests.exceptions.RequestException as e:
    print("An error occurred:", e)
```

These are just some basic examples of using the `requests` package. The library provides many more features, such as handling authentication, sending cookies, working with sessions, and more. You can refer to the official `requests` documentation for detailed information on all the available features and options: https://docs.python-requests.org/
````

#### 42.4.1.2 perform outh2 authentication using requests

````text
To perform OAuth2 authentication using the `requests` library in Python, you need to include the appropriate authorization headers in your requests. Here's an example of how you can perform OAuth2 authentication using the `requests` library:

```python
import requests

# OAuth2 credentials
client_id = "your_client_id"
client_secret = "your_client_secret"
access_token_url = "https://example.com/oauth2/token"

# Fetch access token
data = {
    "grant_type": "client_credentials",
    "client_id": client_id,
    "client_secret": client_secret
}
response = requests.post(access_token_url, data=data)

if response.status_code == 200:
    access_token = response.json()["access_token"]
    # Make authenticated requests using the access token
    api_url = "https://example.com/api"
    headers = {"Authorization": f"Bearer {access_token}"}
    response = requests.get(api_url, headers=headers)
    if response.status_code == 200:
        print(response.json())
    else:
        print("Request failed with status code:", response.status_code)
else:
    print("Access token request failed with status code:", response.status_code)
```

In this example, you first obtain the access token by making a POST request to the OAuth2 token endpoint (`access_token_url`). You pass the `grant_type`, `client_id`, and `client_secret` as data in the request body. The response contains the access token.

Once you have the access token, you can include it in the `Authorization` header of your authenticated requests. In this example, a GET request is made to an API endpoint (`api_url`) with the access token in the `Authorization` header.

Note: The specific OAuth2 authentication process may vary depending on the OAuth2 provider and their authentication flow. The example above assumes the use of the client credentials grant type for obtaining the access token.
````

#### 42.4.1.3 upload a file using requests

````text
To upload a file using the `requests` library in Python, you can utilize the `multipart/form-data` content type and include the file as part of the request payload. Here's an example:

```python
import requests

# File to upload
file_path = "path_to_file/file.txt"
upload_url = "https://example.com/upload"

# Create a file object
with open(file_path, "rb") as file:
    files = {"file": file}

    # Make the upload request
    response = requests.post(upload_url, files=files)

    if response.status_code == 200:
        print("File uploaded successfully.")
    else:
        print("File upload failed with status code:", response.status_code)
```

In this example, you need to specify the file path (`file_path`) and the URL where you want to upload the file (`upload_url`).

The file is opened in binary mode (`"rb"`) and passed as part of the `files` parameter in the `requests.post()` method. The file object is assigned to the key `"file"` in the `files` dictionary. If you have multiple files to upload, you can include them in the `files` dictionary with different keys.

The `requests.post()` method sends the file as a `multipart/form-data` request to the specified URL. The server should handle the file upload and respond with an appropriate status code. In the example, a successful response is indicated by a status code of `200`.

Make sure to replace `"path_to_file/file.txt"` with the actual path to the file you want to upload, and `"https://example.com/upload"` with the URL of the upload endpoint.

            42.4.1.4
        42.4.2. Scrapy. If you are involved in webscraping then this is a must have library for you. After using this library you won’t use any other.
````

#### 42.4.2.1 provide explanation about python Scrapy package with some code examples

````text
Scrapy is a powerful Python framework used for web scraping and crawling. It provides a high-level interface to extract data from websites and automate the process of navigating through web pages, submitting forms, and following links. Scrapy is built on top of the Twisted asynchronous networking library, making it efficient and capable of handling thousands of concurrent requests.

To use Scrapy, you need to install it first. You can do this by running the following command in your terminal:

```bash
pip install scrapy
```

Once installed, you can create a Scrapy project using the `scrapy startproject` command. This will generate a basic project structure with the necessary files and directories. Here's an example:

```bash
scrapy startproject myproject
```

This command will create a directory named `myproject` containing the initial project files.

Next, navigate into the project directory:

```bash
cd myproject
```

Within the project, you'll find a file called `spiders.py` inside the `myproject/spiders` directory. This is where you define your spiders, which are responsible for extracting data from websites. Let's create a spider to scrape quotes from http://quotes.toscrape.com.

Open the `spiders.py` file and replace the contents with the following code:

```python
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

In this example, we define a spider class called `QuotesSpider` that inherits from `scrapy.Spider`. We set the `name` attribute to "quotes" and define the `start_urls` list with the initial URLs to scrape.

The `parse` method is the entry point for the spider. It receives the `response` object representing the web page and extracts the desired data using CSS selectors. In this case, we extract the quote text and author. The extracted data is yielded as a dictionary.

We also check if there's a "Next" button on the page and follow the link if it exists using the `response.follow` method. This allows the spider to scrape multiple pages.

To run the spider, use the `scrapy crawl` command followed by the spider name:

```bash
scrapy crawl quotes
```

The scraped data will be displayed in the console. You can also store it in various formats such as CSV or JSON using Scrapy's built-in features.

This is just a basic example of using Scrapy. The framework offers many powerful features and options for handling more complex scraping scenarios, including middleware, pipelines, and settings customization. You can refer to the official Scrapy documentation for more information on these advanced topics.
````

#### 42.4.2.2 provide a more complex example using middleware pipeline and settings customization

```text
Certainly! Here's a more complex example that demonstrates the usage of middleware, pipelines, and settings customization in Scrapy.
```

[^paramiko-client]: Paramiko docs: SSHClient
[^py3-whatsnew]: What's New In Python 3.0
