---
type: reference
title: "Virtual Environment, venv"
description: Section 45 of the legacy KB_python notes.
tags: [kb-python]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "python/KB_python#45"
---

# Virtual Environment, venv

[↑ KB_python](/python/kb-python/README.md)

## 45.1 tutorial

### 45.1.1 https://realpython.com/python-virtual-environments-a-primer/

#### 45.1.1.1 venv

```text
Global env:
In [1]: import site                                                                                                                                  

In [2]: site.getsitepackages()                                                                                                                       
Out[2]: ['/usr/local/Cellar/python/3.7.3/Frameworks/Python.framework/Versions/3.7/lib/python3.7/site-packages']

install venv:
$ pip install virtualenv

Start by making a new directory to work with:

$ mkdir python-virtual-environments && cd python-virtual-environments
Create a new virtual environment inside the directory:

# Python 2:
$ virtualenv env

# Python 3
$ python3 -m venv env

In order to use this environment’s packages/resources in isolation, you need to “activate” it. To do this, just run the following:

$ source env/bin/activate
(env) $
Notice how your prompt is now prefixed with the name of your environment (env, in our case). This is the indicator that env is currently active, which means the python executable will only use this environment’s packages and settings.

To show the package isolation in action, we can use the bcrypt module as an example. Let’s say we have bcrypt installed system-wide but not in our virtual environment.

Before we test this, we need to go back to the “system” context by executing deactivate:

(env) $ deactivate
$
Now your shell session is back to normal, and the python command refers to the global Python install. Remember to do this whenever you’re done using a specific virtual environment.
```

#### 45.1.1.2 virtualenvwrapper

```text
While some of these features may seem small or insignificant, you’ll soon learn that they’re important tools to add to your workflow.

To get started, you can download the wrapper with pip:

$ pip install virtualenvwrapper
Note: For Windows, you should use virtualenvwrapper-win instead.
Once it’s installed, we’ll need to activate its shell functions. We can do this by running source on the installed virtualenvwrapper.sh script. When you first install it with pip, the output of the installation will tell you the exact location of virtualenvwrapper.sh. Or you can simply run the following:

$ which virtualenvwrapper.sh
/usr/local/bin/virtualenvwrapper.sh
Using that path, add the following three lines to your shell’s startup file. If you’re using the Bash shell, you would place these lines in either the ~/.bashrc file or the ~/.profile file. For other shells, like zsh, csh, or fish, you would need to use the startup files specific to that shell. All that matters is that these commands are executed when you log in or open a new shell:

export WORKON_HOME=$HOME/.virtualenvs   # Optional
export PROJECT_HOME=$HOME/projects      # Optional
source /usr/local/bin/virtualenvwrapper.sh
Note: It’s not required to define the WORKON_HOME and PROJECT_HOME environment variables. virtualenvwrapper has default values for those, but you can override them by defining values.
Finally, reload the startup file:

$ source ~/.bashrc
There should now be a directory located at $WORKON_HOME that contains all of the virtualenvwrapper data/files:

$ echo $WORKON_HOME
/Users/michaelherman/.virtualenvs
You’ll also now have the shell commands available to you to help you manage the environments. Here are just a few of the ones available:

workon
deactivate
mkvirtualenv
cdvirtualenv
rmvirtualenv
For more info on commands, installation, and configuring virtualenvwrapper, check out the documentation.

Now, anytime you want to start a new project, you just have to do this:

$ mkvirtualenv my-new-project
(my-new-project) $
This will create and activate a new environment in the directory located at $WORKON_HOME, where all virtualenvwrapper environments are stored.

To stop using that environment, you just need to deactivate it like before:

(my-new-project) $ deactivate
$
If you have many environments to choose from, you can list them all with the workon function:

$ workon
my-new-project
my-django-project
web-scraper
Finally, here’s how to activate:

$ workon web-scraper
(web-scraper) $
If you would like to be able to use a single tool and switch between Python versions, virtualenv will allow you to do just that. virtualenv has a parameter -p that allows you to select which version of Python to use. Combine that with the which command, and we can easily select your preferred version of Python to use in a simple manner. For example, let’s say that we want Python 3 as our preferred version:

$ virtualenv -p $(which python3) blog_virtualenv
This will create a new Python 3 environment.

How does this work? The which command is used for finding a given command in your $PATH variable and returning the full path to that command. So, the full path to python3 was returned, to the -p parameter which takes a PYTHON_EXE. This could also be used for python2 as well. Just substitute python3 for python2 (or python if you system defaults to python2).

Now you don’t have to remember where you installed your environments. You can easily delete or copy them as you wish, and your project directory is less cluttered!
```

#### 45.1.1.3 pyenv

```text
Unlike the old virtualenv tool, pyvenv doesn’t support creating environments with arbitrary versions of Python, which means you’re stuck using the default Python 3 installation for all of the environments you create. While you can upgrade an environment to the latest system version of Python (via the --upgrade option), if it changes, you still can’t actually specify a particular version.

There are quite a few ways to install Python, but few of them are easy enough or flexible enough to frequently uninstall and re-install different versions of the binary.

This is where pyenv comes in to play.

Despite the similarity in names (pyvenv vs pyenv), pyenv is different in that its focus is to help you switch between Python versions on a system-level as well as a project-level. While the purpose of pyvenv is to separate out modules, the purpose of pyenv is to separate Python versions.

You can start by installing pyenv with either Homebrew (on OS X) or the pyenv-installer project:

Homebrew

$ brew install pyenv
pyenv-installer

$ curl -L https://raw.githubusercontent.com/yyuu/pyenv-installer/master/bin/pyenv-installer | bash
Note: Unfortunately, pyenv does not support Windows. A few alternatives to try are pywin and anyenv.
Once you have pyenv on your system, here are a few of the basic commands you’re probably interested in:

$ pyenv install 3.5.0   # Install new version
$ pyenv versions        # List installed versions
$ pyenv exec python -V  # Execute 'python -V' using pyenv version
In these few lines, we install the 3.5.0 version of Python, ask pyenv to show us all of the versions available to us, and then execute the python -V command using the pyenv-specified version.

To give you even more control, you can then use any of the available versions for either “global” use or “local” use. Using pyenv with the local command sets the Python version for a specific project or directory by storing the version number in a local .python-version file. We can set the “local” version like this:

$ pyenv local 2.7.11
This creates the .python-version file in our current directory, as you can see here:

$ ls -la
total 16
drwxr-xr-x  4 michaelherman  staff  136 Feb 22 10:57 .
drwxr-xr-x  9 michaelherman  staff  306 Jan 27 20:55 ..
-rw-r--r--  1 michaelherman  staff    7 Feb 22 10:57 .python-version
-rw-r--r--  1 michaelherman  staff   52 Jan 28 17:20 main.py
This file only contains the contents “2.7.11”. Now, when you execute a script using pyenv, it’ll load this file and use the specified version, assuming it’s valid and exists on your system.

Moving on with our example, let’s say we have a simple script called main.py in our project directory that looks like this:

import sys
print('Using version:', sys.version[:5])
All it does is print out the version number of the Python executable being used. Using pyenv and the exec command, we can run the script with any of the different versions of Python we have installed.

$ python main.py
Using version: 2.7.5
$ pyenv global 3.5.0
$ pyenv exec python main.py
Using version: 3.5.0
$ pyenv local 2.7.11
$ pyenv exec python main.py
Using version: 2.7.11
Notice how pyenv exec python main.py uses our “global” Python version by default, but then it uses the “local” version after one is set for the current directory.

This can be very powerful for developers who have lots of projects with varying version requirements. Not only can you easily change the default version for all projects (via global), but you can also override it to specify special cases.


            45.1.1.4

        45.1.2
    45.2
```
