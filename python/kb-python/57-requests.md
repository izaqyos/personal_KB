---
type: reference
title: requests
description: Section 51 of the legacy KB_python notes.
tags: [kb-python]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "python/KB_python#51"
---

# requests

[↑ KB_python](/python/kb-python/README.md)

## 51.1 https://realpython.com/python-requests/

### 51.1.1 install

```text
Let’s begin by installing the requests library. To do so, run the following command:

$ pip install requests
If you prefer to use Pipenv for managing Python packages, you can run the following:

$ pipenv install requests
Once requests is installed, you can use it in your application. Importing requests looks like this:

import requests
Now that you’re all set up, it’s time to begin your journey through requests. Your first goal will be learning how to make a GET request.
```

### 51.1.2 basic

```text
 http get, requests.get('https://api.github.com')

raise exception for invalid status code
import requests
from requests.exceptions import HTTPError

for url in ['https://api.github.com', 'https://api.github.com/invalid']:
    try:
        response = requests.get(url)

        # If the response was successful, no Exception will be raised
        response.raise_for_status()
    except HTTPError as http_err:
        print(f'HTTP error occurred: {http_err}')  # Python 3.6
    except Exception as err:
        print(f'Other error occurred: {err}')  # Python 3.6
    else:
        print('Success!')
```

### 51.1.3 response object

```text
raw response content: response.content
content converted to utf-8: response.text

can give python a hint re. encoding
response.encoding = 'utf-8' # Optional: requests infers this internally

if the response contains json it can be parsed using json.loads or more simply:
    response.json()

headers:
 response.headers
 .headers returns a dictionary-like object, allowing you to access header values by key. For example, to see the content type of the response payload, you can access Content-Type:

>>> response.headers['Content-Type']
'application/json; charset=utf-8'
There is something special about this dictionary-like headers object, though. The HTTP spec defines headers to be case-insensitive, which means we are able to access these headers without worrying about their capitalization:

>>> response.headers['content-type']
'application/json; charset=utf-8'
```

### 51.1.4 Query params

```text
One common way to customize a GET request is to pass values through query string parameters in the URL. To do this using get(), you pass data to params. For example, you can use GitHub’s Search API to look for the requests library:

import requests

# Search GitHub's repositories for requests
response = requests.get(
    'https://api.github.com/search/repositories',
    params={'q': 'requests+language:python'},
)

# Inspect some attributes of the `requests` repository
json_response = response.json()
repository = json_response['items'][0]
print(f'Repository name: {repository["name"]}')  # Python 3.6+
print(f'Repository description: {repository["description"]}')  # Python 3.6+

By passing the dictionary {'q': 'requests+language:python'} to the params parameter of .get(), you are able to modify the results that come back from the Search API.

You can pass params to get() in the form of a dictionary, as you have just done, or as a list of tuples:

>>> requests.get(
...     'https://api.github.com/search/repositories',
...     params=[('q', 'requests+language:python')],
... )
<Response [200]>

ou can even pass the values as bytes:

>>> requests.get(
...     'https://api.github.com/search/repositories',
...     params=b'q=requests+language:python',
... )
<Response [200]>
Query strings are useful for parameterizing GET requests. You can also customize your requests by adding or modifying the headers you send
```

### 51.1.5 Request Headers

```text
To customize headers, you pass a dictionary of HTTP headers to get() using the headers parameter. For example, you can change your previous search request to highlight matching search terms in the results by specifying the text-match media type in the Accept header:

import requests

response = requests.get(
    'https://api.github.com/search/repositories',
    params={'q': 'requests+language:python'},
    headers={'Accept': 'application/vnd.github.v3.text-match+json'},
)

# View the new `text-matches` array which provides information
# about your search term within the results
json_response = response.json()
repository = json_response['items'][0]
print(f'Text matches: {repository["text_matches"]}')
The Accept header tells the server what content types your application can handle. In this case, since you’re expecting the matching search terms to be highlighted, you’re using the header value application/vnd.github.v3.text-match+json, which is a proprietary GitHub Accept header where the content is a special JSON format.

Before you learn more ways to customize requests, let’s broaden the horizon by exploring other HTTP methods.
```

### 51.1.6 Other HTTP Methods

```text
Aside from GET, other popular HTTP methods include POST, PUT, DELETE, HEAD, PATCH, and OPTIONS. requests provides a method, with a similar signature to get(), for each of these HTTP methods:

>>> requests.post('https://httpbin.org/post', data={'key':'value'})
>>> requests.put('https://httpbin.org/put', data={'key':'value'})
>>> requests.delete('https://httpbin.org/delete')
>>> requests.head('https://httpbin.org/get')
>>> requests.patch('https://httpbin.org/patch', data={'key':'value'})
>>> requests.options('https://httpbin.org/get')
```

### 51.1.7 The Message Body

```text
According to the HTTP specification, POST, PUT, and the less common PATCH requests pass their data through the message body rather than through parameters in the query string. Using requests, you’ll pass the payload to the corresponding function’s data parameter.

data takes a dictionary, a list of tuples, bytes, or a file-like object. You’ll want to adapt the data you send in the body of your request to the specific needs of the service you’re interacting with.

For example, if your request’s content type is application/x-www-form-urlencoded, you can send the form data as a dictionary:

>>> requests.post('https://httpbin.org/post', data={'key':'value'})
<Response [200]>
You can also send that same data as a list of tuples:

>>> requests.post('https://httpbin.org/post', data=[('key', 'value')])
<Response [200]>

If, however, you need to send JSON data, you can use the json parameter. When you pass JSON data via json, requests will serialize your data and add the correct Content-Type header for you.

httpbin.org is a great resource created by the author of requests, Kenneth Reitz. It’s a service that accepts test requests and responds with data about the requests. For instance, you can use it to inspect a basic POST request:

>>> response = requests.post('https://httpbin.org/post', json={'key':'value'})
>>> json_response = response.json()
>>> json_response['data']
'{"key": "value"}'
>>> json_response['headers']['Content-Type']
'application/json'
You can see from the response that the server received your request data and headers as you sent them. requests also provides this information to you in the form of a PreparedRequest.
```

### 51.1.8 Inspecting Your Request

```text
When you make a request, the requests library prepares the request before actually sending it to the destination server. Request preparation includes things like validating headers and serializing JSON content.

You can view the PreparedRequest by accessing .request:

>>> response = requests.post('https://httpbin.org/post', json={'key':'value'})
>>> response.request.headers['Content-Type']
'application/json'
>>> response.request.url
'https://httpbin.org/post'
>>> response.request.body
b'{"key": "value"}'
Inspecting the PreparedRequest gives you access to all kinds of information about the request being made such as payload, URL, headers, authentication, and more.

So far, you’ve made a lot of different kinds of requests, but they’ve all had one thing in common: they’re unauthenticated requests to public APIs. Many services you may come across will want you to authenticate in some way.
```

### 51.1.9 Authentication

```text
Authentication helps a service understand who you are. Typically, you provide your credentials to a server by passing data through the Authorization header or a custom header defined by the service. All the request functions you’ve seen to this point provide a parameter called auth, which allows you to pass your credentials.

One example of an API that requires authentication is GitHub’s Authenticated User API. This endpoint provides information about the authenticated user’s profile. To make a request to the Authenticated User API, you can pass your GitHub username and password in a tuple to get():

>>> from getpass import getpass
>>> requests.get('https://api.github.com/user', auth=('username', getpass()))
<Response [200]>
The request succeeded if the credentials you passed in the tuple to auth are valid. If you try to make this request with no credentials, you’ll see that the status code is 401 Unauthorized:

>>> requests.get('https://api.github.com/user')
<Response [401]>
When you pass your username and password in a tuple to the auth parameter, requests is applying the credentials using HTTP’s Basic access authentication scheme under the hood.

Therefore, you could make the same request by passing explicit Basic authentication credentials using HTTPBasicAuth:

>>> from requests.auth import HTTPBasicAuth
>>> from getpass import getpass
>>> requests.get(
...     'https://api.github.com/user',
...     auth=HTTPBasicAuth('username', getpass())
... )
<Response [200]>
Though you don’t need to be explicit for Basic authentication, you may want to authenticate using another method. requests provides other methods of authentication out of the box such as HTTPDigestAuth and HTTPProxyAuth.

You can even supply your own authentication mechanism. To do so, you must first create a subclass of AuthBase. Then, you implement __call__():

import requests
from requests.auth import AuthBase

class TokenAuth(AuthBase):
    """Implements a custom authentication scheme."""

    def __init__(self, token):
        self.token = token

    def __call__(self, r):
        """Attach an API token to a custom auth header."""
        r.headers['X-TokenAuth'] = f'{self.token}'  # Python 3.6+
        return r


requests.get('https://httpbin.org/get', auth=TokenAuth('12345abcde-token'))
Here, your custom TokenAuth mechanism receives a token, then includes that token in the X-TokenAuth header of your request.

Bad authentication mechanisms can lead to security vulnerabilities, so unless a service requires a custom authentication mechanism for some reason, you’ll always want to use a tried-and-true auth scheme like Basic or OAuth.

While you’re thinking about security, let’s consider dealing with SSL Certificates using requests.
```

### 51.1.10 SSL Certificate Verification

```text
Any time the data you are trying to send or receive is sensitive, security is important. The way that you communicate with secure sites over HTTP is by establishing an encrypted connection using SSL, which means that verifying the target server’s SSL Certificate is critical.

The good news is that requests does this for you by default. However, there are some cases where you might want to change this behavior.

If you want to disable SSL Certificate verification, you pass False to the verify parameter of the request function:

>>> requests.get('https://api.github.com', verify=False)
InsecureRequestWarning: Unverified HTTPS request is being made. Adding certificate verification is strongly advised. See: https://urllib3.readthedocs.io/en/latest/advanced-usage.html#ssl-warnings
  InsecureRequestWarning)
<Response [200]>
requests even warns you when you’re making an insecure request to help you keep your data safe!

Note: requests uses a package called certifi to provide Certificate Authorities. This lets requests know which authorities it can trust. Therefore, you should update certifi frequently to keep your connections as secure as possible.
```

### 51.1.11 Performance

```text
When using requests, especially in a production application environment, it’s important to consider performance implications. Features like timeout control, sessions, and retry limits can help you keep your application running smoothly.

Timeouts
When you make an inline request to an external service, your system will need to wait upon the response before moving on. If your application waits too long for that response, requests to your service could back up, your user experience could suffer, or your background jobs could hang.

By default, requests will wait indefinitely on the response, so you should almost always specify a timeout duration to prevent these things from happening. To set the request’s timeout, use the timeout parameter. timeout can be an integer or float representing the number of seconds to wait on a response before timing out:

>>> requests.get('https://api.github.com', timeout=1)
<Response [200]>
>>> requests.get('https://api.github.com', timeout=3.05)
<Response [200]>
In the first request, the request will timeout after 1 second. In the second request, the request will timeout after 3.05 seconds.

You can also pass a tuple to timeout with the first element being a connect timeout (the time it allows for the client to establish a connection to the server), and the second being a read timeout (the time it will wait on a response once your client has established a connection):

>>> requests.get('https://api.github.com', timeout=(2, 5))
<Response [200]>
If the request establishes a connection within 2 seconds and receives data within 5 seconds of the connection being established, then the response will be returned as it was before. If the request times out, then the function will raise a Timeout exception:

import requests
from requests.exceptions import Timeout

try:
    response = requests.get('https://api.github.com', timeout=1)
except Timeout:
    print('The request timed out')
else:
    print('The request did not time out')
Your program can catch the Timeout exception and respond accordingly.
```

### 51.1.12 The Session Object

```text
Until now, you’ve been dealing with high level requests APIs such as get() and post(). These functions are abstractions of what’s going on when you make your requests. They hide implementation details such as how connections are managed so that you don’t have to worry about them.

Underneath those abstractions is a class called Session. If you need to fine-tune your control over how requests are being made or improve the performance of your requests, you may need to use a Session instance directly.

Sessions are used to persist parameters across requests. For example, if you want to use the same authentication across multiple requests, you could use a session:

import requests
from getpass import getpass

# By using a context manager, you can ensure the resources used by
# the session will be released after use
with requests.Session() as session:
    session.auth = ('username', getpass())

    # Instead of requests.get(), you'll use session.get()
    response = session.get('https://api.github.com/user')

# You can inspect the response just like you did before
print(response.headers)
print(response.json())
Each time you make a request with session, once it has been initialized with authentication credentials, the credentials will be persisted.

The primary performance optimization of sessions comes in the form of persistent connections. When your app makes a connection to a server using a Session, it keeps that connection around in a connection pool. When your app wants to connect to the same server again, it will reuse a connection from the pool rather than establishing a new one.
```

### 51.1.13 Max Retries

```text
When a request fails, you may want your application to retry the same request. However, requests will not do this for you by default. To apply this functionality, you need to implement a custom Transport Adapter.

Transport Adapters let you define a set of configurations per service you’re interacting with. For example, let’s say you want all requests to https://api.github.com to retry three times before finally raising a ConnectionError. You would build a Transport Adapter, set its max_retries parameter, and mount it to an existing Session:

import requests
from requests.adapters import HTTPAdapter
from requests.exceptions import ConnectionError

github_adapter = HTTPAdapter(max_retries=3)

session = requests.Session()

# Use `github_adapter` for all requests to endpoints that start with this URL
session.mount('https://api.github.com', github_adapter)

try:
    session.get('https://api.github.com')
except ConnectionError as ce:
    print(ce)
When you mount the HTTPAdapter, github_adapter, to session, session will adhere to its configuration for each request to https://api.github.com.

Timeouts, Transport Adapters, and sessions are for keeping your code efficient and your application resilient.

        51.1.14
    51.2
```
