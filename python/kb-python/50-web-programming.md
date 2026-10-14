---
type: reference
title: Web programming
description: "Legacy Python KB section: Web programming (graphql, graphql flask tutorial)"
tags: [web, python, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "python/KB_python#44"
---

# Web programming

[↑ KB_python](/python/kb-python/README.md)

## 44.1 graphql

### 44.1.1 graphql flask tutorial

#### 44.1.1.1 Creating a GraphQL server with flask

```text
https://medium.com/@marvinkome/creating-a-graphql-server-with-flask-ae767c7e2525
Go to the profile of Marvin Kome
Marvin Kome
May 29, 2018

flask + GraphQL image
In the last two months, I have been working on a project which I used GraphQL to send data to the client-side. So I thought of writing a post on how I did this.

GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.
You can read more about GraphQL here
So let us get to implementing it in your flask project.
```

#### 44.1.1.1.1 Setting up your project

```text
First lets setup your flask projects. Create a directory

$ mkdir flask-graphql-project
$ cd flask-graphql-project
Now create a virtual environment. This helps keep your project dependencies in one place by giving you a custom python installation. If you don’t have it installed already, install it.

$ pip install virtualenv
Now create a virtual environment for your project and activate the virtualenv.

$ virtualenv venv
$ source venv/bin/activate
This creates a virtual environment inside your project folder. Then install your project dependencies.

$ pip install flask flask-graphql flask-migrate flask-sqlalchemy graphene graphene-sqlalchemy
Now create an app.py file in your folder root directory. Add the following code to the file

# Imports
from flask import Flask
# app initialization
app = Flask(__name__)
app.debug = True
# Configs
# TO-DO
# Modules
# TO-DO
# Models
# TO-DO
# Schema Objects
# TO-DO
# Routes
# TO-DO
@app.route('/')
def index():
    return '<p> Hello World</p>'
if __name__ == '__main__':
     app.run()
Note, the to-do comments will be filled as we progress.

Now from the terminal run python app.py runserver this will set up a debug server, then visit 127.0.0.1:5000 If you see hello world written on the page then you’re good to go.

Adding a database
Now, let's add a database to our application. We’re going to be using Sqlalchemy to create our DB models and SQLite for our demo DB.

Add the following code to app.py file.

# Imports
...
from flask_sqlalchemy import SQLAlchemy
import os
basedir = os.path.abspath(os.path.dirname(__file__))
...
# Configs
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' +    os.path.join(basedir, 'data.sqlite')
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
# Modules
db = SQLAlchemy(app)
...
Now lets create our models. Add the following code to app.py:

...
# Models
class User(db.Model):
    __tablename__ = 'users'
    uuid = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(256), index=True, unique=True)
    posts = db.relationship('Post', backref='author')
    
    def __repr__(self):
        return '<User %r>' % self.username
class Post(db.Model):
    __tablename__ = 'posts'
    uuid = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(256), index=True)
    body = db.Column(db.Text)
    author_id = db.Column(db.Integer, db.ForeignKey('users.uuid'))
    def __repr__(self):
        return '<Post %r>' % self.title
...
In the code above we created two models Posts and User and created a relationship between the two. Now let's create some demo data.

$ python
>>> from app import db, User, Post
>>> db.create_all()
>>> john = User(username='johndoe')
>>> post = Post()
>>> post.title = "Hello World"
>>> post.body = "This is the first post"
>>> post.author = john
>>> db.session.add(post)
>>> db.session.add(john)
>>> db.session.commit()
>>> User.query.all()
[<User 'johndoe'>]
>>> Post.query.all()
[<Post 'Hello World'>
Adding GraphQL
Now let’s get to business.

Schemas
GraphQL presents your objects to the world as a graph structure rather than a more hierarchical structure to which you may be accustomed. So we need to show which type of object will be shown in the graph. That’s where schemas come in. Schemas are used to describe your data. So let's create a schema for our models.

Add the following content to app.py:

# Imports
...
import graphene
from graphene_sqlalchemy import SQLAlchemyObjectType, SQLAlchemyConnectionField
...
# Schema Objects
class PostObject(SQLAlchemyObjectType):
    class Meta:
        model = Post
        interfaces = (graphene.relay.Node, )
class UserObject(SQLAlchemyObjectType):
   class Meta:
       model = User
       interfaces = (graphene.relay.Node, )
class Query(graphene.ObjectType):
    node = graphene.relay.Node.Field()
    all_posts = SQLAlchemyConnectionField(PostObject)
    all_users = SQLAlchemyConnectionField(UserObject)
schema = graphene.Schema(query=Query)
...
Now add the route to check out our GraphQL interface

# Imports
...
from flask_graphql import GraphQLView
...
# Routes
...
app.add_url_rule(
    '/graphql',
    view_func=GraphQLView.as_view(
        'graphql',
        schema=schema,
        graphiql=True # for having the GraphiQL interface
    )
)
...
Now if you navigate to 127.0.0.1:5000/graphql you’ll see the GraphQLi view. Write your GraphQL query

{
  allPosts{
    edges{
      node{
        title
        body
        author{
          username
        }
      }
    }
  }
}
Mutations
To be able to create posts and users you’ll need mutations. So let's add that to our app.

...
# Schema Objects
...
class CreatePost(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)
        body = graphene.String(required=True) 
        username = graphene.String(required=True)
    post = graphene.Field(lambda: PostObject)
    def mutate(self, info, title, body, username):
        user = User.query.filter_by(username=username).first()
        post = Post(title=title, body=body)
        if user is not None:
            post.author = user
        db.session.add(post)
        db.session.commit()
        return CreatePost(post=post)
class Mutation(graphene.ObjectType):
    create_post = CreatePost.Field()
schema = graphene.Schema(query=Query, mutation=Mutation)
Now, let's add a new post with GraphQL mutations:

mutation {
  createPost(username:"johndoe", title:"Hello 2", body:"Hello body 2"){
    post{
      title
      body
      author{
        username
      }
    }
  }
}
You have successfully started a GraphQL server with Flask 👏. The post is open to improvements so if there’s anything you’d like to add please comment about it 😄

If this post was helpful click the clap button as much as possible 😃. Thank You.

        44.1.2
```

## 44.2 tags: local Web server

### 44.2.1 one liner http

```text
python3 -m http.server

    python -m http.server port
```

## 44.3 authentication

### 44.3.1 JWT based authentication

#### 44.3.1.1 https://realpython.com/token-based-authentication-with-flask/

#### 44.3.1.1.1 Introduction

```text
JSON Web Tokens (or JWTs) provide a means of transmitting information from the client to the server in a stateless, secure way.

On the server, JWTs are generated by signing user information via a secret key, which are then securely stored on the client. This form of auth works well with modern, single page applications. For more on this, along with the pros and cons of using JWTs vs. session and cookie-based auth, please review the following articles:

Cookies vs Tokens: The Definitive Guide. https://auth0.com/blog/cookies-vs-tokens-definitive-guide/
Token Authentication vs. Cookies. http://stackoverflow.com/questions/17000835/token-authentication-vs-cookies
How do sessions work in Flask? https://www.reddit.com/r/flask/comments/5l2gmf/af_eli5_how_sessions_work_in_flask/
```

#### 44.3.1.1.2 Project Setup

```text
Start by cloning the project boilerplate and then create a new branch:

$ git clone https://github.com/realpython/flask-jwt-auth.git
$ cd flask-jwt-auth
$ git checkout tags/1.0.0 -b jwt-auth
Create and activate a virtualenv and install the dependencies:

$ python3.6 -m venv env
$ source env/bin/activate
(env)$ pip install -r requirements.txt
This is optional, but it’s a good idea to create a new Github repository and update the remote:

(env)$ git remote set-url origin <newurl>

my setup.
cd /Users/<user>/work/code/python/web/tutorials/jwt_based_auth

(env)$ git remote set-url origin <user>_flask_jwt_auth_tutorial

                44.3.1.1.3
```

#### 44.3.1.2 JWT based authentication step by step

```text
            44.3.1.3
```

### 44.3.2 HTTP basic authentication

#### 44.3.2.1 HTTP basic authentication step by step

```text
/Users/<user>/work/code/python/web/tutorials/basic_auth

            44.3.2.2

        44.3.3
```

## 44.4 making http requests, tags: making http requests

### 44.4.1 Chatgpt

```text
User
python code to get a json response from https://a.com

ChatGPT
To get a JSON response from a URL using Python, you can use the requests module. Here's an example code that sends a GET request to the specified URL and prints the JSON response:

import requests

url = 'https://a.com'
response = requests.get(url)

if response.status_code == 200:
    json_response = response.json()
    print(json_response)
else:
    print(f'Request failed with status code: {response.status_code}')
In this example, we first import the requests module. Then, we define the URL we want to request (url). We use the requests.get() method to send a GET request to the URL and store the response in the response variable.

Next, we check if the response status code is 200, which indicates a successful request. If the request is successful, we use the response.json() method to parse the JSON response and store it in the json_response variable. Finally, we print the JSON response.

If the request fails for some reason, we print an error message that includes the status code returned by the server.





User
alternative way
ChatGPT
Yes, there are alternative ways to get a JSON response from a URL using Python. Here's an example using the urllib module:

import urllib.request
import json

url = 'https://a.com'
response = urllib.request.urlopen(url)

if response.status == 200:
    json_response = json.loads(response.read())
    print(json_response)
else:
    print(f'Request failed with status code: {response.status}')
In this example, we first import the urllib.request module and the built-in json module. We define the URL we want to request (url) and use the urllib.request.urlopen() method to send a GET request to the URL and store the response in the response variable.

Next, we check if the response status code is 200, which indicates a successful request. If the request is successful, we use the response.read() method to read the response body and the json.loads() method to parse the JSON response and store it in the json_response variable. Finally, we print the JSON response.

If the request fails for some reason, we print an error message that includes the status code returned by the server.





User
more ways
ChatGPT
There are several ways to get a JSON response from a URL using Python. Here are some additional examples:

Using the http.client module
import http.client
import json

conn = http.client.HTTPSConnection("a.com")
conn.request("GET", "/")
response = conn.getresponse()

if response.status == 200:
    json_response = json.loads(response.read())
    print(json_response)
else:
    print(f'Request failed with status code: {response.status}')
conn.close()
In this example, we use the http.client module to send an HTTPS GET request to the specified URL. We create an instance of http.client.HTTPSConnection and use the request() method to send the GET request. We then use the getresponse() method to get the response object.

Next, we check if the response status code is 200, which indicates a successful request. If the request is successful, we use the response.read() method to read the response body and the json.loads() method to parse the JSON response and store it in the json_response variable. Finally, we print the JSON response.

Using the urllib3 module
import urllib3
import json

http = urllib3.PoolManager()
response = http.request('GET', 'https://a.com')

if response.status == 200:
    json_response = json.loads(response.data.decode('utf-8'))
    print(json_response)
else:
    print(f'Request failed with status code: {response.status}')
In this example, we use the urllib3 module to send an HTTPS GET request to the specified URL. We create an instance of urllib3.PoolManager and use its request() method to send the GET request. We then use the status and data attributes of the response object to check if the request was successful and to read the response body.

Next, we check if the response status code is 200, which indicates a successful request. If the request is successful, we use the response.data.decode() method to decode the response body from bytes to a string, and then use the json.loads() method to parse the JSON response and store it in the json_response variable. Finally, we print the JSON response.
        44.4.2


    44.5
```
