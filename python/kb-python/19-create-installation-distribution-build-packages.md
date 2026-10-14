---
type: reference
title: "Create installation, distribution, build, packages"
description: Section 19 of the legacy KB_python notes.
tags: [kb-python, create, installation, distribution, build, packages, creating, package, python3]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "python/KB_python#19"
---

# tags: Create installation, distribution, build, packages

[↑ KB_python](/python/kb-python/README.md)

## 19.1 Tutorial

### 19.1.1 Python 2.3 documentation

```text
		 Concepts & Terminology

Using the Distutils is quite simple, both for module developers and for users/administrators installing third-party modules. As a developer, your responsibilities (apart from writing solid, well-documented and well-tested code, of course!) are:

    * write a setup script (setup.py by convention)
    * (optional) write a setup configuration file
    * create a source distribution
    * (optional) create one or more built (binary) distributions

Each of these tasks is covered in this document.

Not all module developers have access to a multitude of platforms, so it's not always feasible to expect them to create a multitude of built distributions. It is hoped that a class of intermediaries, called packagers, will arise to address this need. Packagers will take source distributions released by module developers, build them on one or more platforms, and release the resulting built distributions. Thus, users on the most popular platforms will be able to install most popular Python module distributions in the most natural way for their platform, without having to run a single setup script or compile a line of code.
```

### 19.1.2 A Simple Example

```text
The setup script is usually quite simple, although since it's written in Python, there are no arbitrary limits to what you can do with it, though you should be careful about putting arbitrarily expensive operations in your setup script. Unlike, say, Autoconf-style configure scripts, the setup script may be run multiple times in the course of building and installing your module distribution.

If all you want to do is distribute a module called foo, contained in a file foo.py, then your setup script can be as simple as this:

from distutils.core import setup
setup(name="foo",
      version="1.0",
      py_modules=["foo"])

Some observations:

    * most information that you supply to the Distutils is supplied as keyword arguments to the setup() function
    * those keyword arguments fall into two categories: package metadata (name, version number) and information about what's in the package (a list of pure Python modules, in this case)
    * modules are specified by module name, not filename (the same will hold true for packages and extensions)
    * it's recommended that you supply a little more metadata, in particular your name, email address and a URL for the project (see section 3 for an example)

To create a source distribution for this module, you would create a setup script, setup.py, containing the above code, and run:

python setup.py sdist

which will create an archive file (e.g., tarball on Unix, ZIP file on Windows) containing your setup script setup.py, and your module foo.py. The archive file will be named foo-1.0.tar.gz (or .zip), and will unpack into a directory foo-1.0.

If an end-user wishes to install your foo module, all she has to do is download foo-1.0.tar.gz (or .zip), unpack it, and--from the foo-1.0 directory--run

python setup.py install

which will ultimately copy foo.py to the appropriate directory for third-party modules in their Python installation.

This simple example demonstrates some fundamental concepts of the Distutils. First, both developers and installers have the same basic user interface, i.e. the setup script. The difference is which Distutils commands they use: the sdist command is almost exclusively for module developers, while install is more often for installers (although most developers will want to install their own code occasionally).

If you want to make things really easy for your users, you can create one or more built distributions for them. For instance, if you are running on a Windows machine, and want to make things easy for other Windows users, you can create an executable installer (the most appropriate type of built distribution for this platform) with the bdist_wininst command. For example:
```

### 19.1.3 Determine the package installation path.

```text
		This is sometimes needed in cases where there are interdependencies in the package 
		and this path is needed to be resolved in runtime.

		Packages in Multiple Directories

Packages support one more special attribute, __path__. This is initialized to be a list containing the name of the directory holding the package's __init__.py before the code in that file is executed. This variable can be modified; doing so affects future searches for modules and subpackages contained in the package.

While this feature is not often needed, it can be used to extend the set of modules found in a package.

python setup.py bdist_wininst

will create an executable installer, foo-1.0.win32.exe, in the current directory.

Other useful built distribution formats are RPM, implemented by the bdist_rpm command, Solaris pkgtool (bdist_pkgtool), and HP-UX swinstall (bdist_sdux). For example, the following command will create an RPM file called foo-1.0.noarch.rpm:

python setup.py bdist_rpm

(The bdist_rpm command uses the rpm executable, therefore this has to be run on an RPM-based system such as Red Hat Linux, SuSE Linux, or Mandrake Linux.)

You can find out what distribution formats are available at any time by running

python setup.py bdist --help-formats

-> General Python terminology

If you're reading this document, you probably have a good idea of what modules, extensions, and so forth are. Nevertheless, just to be sure that everyone is operating from a common starting point, we offer the following glossary of common Python terms:

module
    the basic unit of code reusability in Python: a block of code imported by some other code. Three types of modules concern us here: pure Python modules, extension modules, and packages.

      
pure Python module
    a module written in Python and contained in a single .py file (and possibly associated .pyc and/or .pyo files). Sometimes referred to as a ``pure module.''

      
extension module
    a module written in the low-level language of the Python implementation: C/C++ for Python, Java for Jython. Typically contained in a single dynamically loadable pre-compiled file, e.g. a shared object (.so) file for Python extensions on Unix, a DLL (given the .pyd extension) for Python extensions on Windows, or a Java class file for Jython extensions. (Note that currently, the Distutils only handles C/C++ extensions for Python.)

      
package
    a module that contains other modules; typically contained in a directory in the filesystem and distinguished from other directories by the presence of a file __init__.py.

      
root package
    the root of the hierarchy of packages. (This isn't really a package, since it doesn't have an __init__.py file. But we have to call it something.) The vast majority of the standard library is in the root package, as are many small, standalone third-party modules that don't belong to a larger module collection. Unlike regular packages, modules in the root package can be found in many directories: in fact, every directory listed in sys.path contributes modules to the root package.

-> Distutils-specific terminology

The following terms apply more specifically to the domain of distributing Python modules using the Distutils:

module distribution
    a collection of Python modules distributed together as a single downloadable resource and meant to be installed en masse. Examples of some well-known module distributions are Numeric Python, PyXML, PIL (the Python Imaging Library), or mxBase. (This would be called a package, except that term is already taken in the Python context: a single module distribution may contain zero, one, or many Python packages.)

      
pure module distribution
    a module distribution that contains only pure Python modules and packages. Sometimes referred to as a ``pure distribution.''

      
non-pure module distribution
    a module distribution that contains at least one extension module. Sometimes referred to as a ``non-pure distribution.''

      
distribution root
    the top-level directory of your source tree (or source distribution); the directory where setup.py exists. Generally setup.py will be run from this directory.
```

### 19.1.4 Package lore

```text
		Packages are a way of structuring Python's module namespace by using "dotted module names". For example, the module name Â¿A.BÂ¿ designates a submodule named Â¿BÂ¿ in a package named Â¿AÂ¿. Just like the use of modules saves the authors of different modules from having to worry about each other's global variable names, the use of dotted module names saves the authors of multi-module packages like NumPy or the Python Imaging Library from having to worry about each other's module names.

Suppose you want to design a collection of modules (a "package") for the uniform handling of sound files and sound data. There are many different sound file formats (usually recognized by their extension, for example: Â¿.wavÂ¿, Â¿.aiffÂ¿, Â¿.auÂ¿), so you may need to create and maintain a growing collection of modules for the conversion between the various file formats. There are also many different operations you might want to perform on sound data (such as mixing, adding echo, applying an equalizer function, creating an artificial stereo effect), so in addition you will be writing a never-ending stream of modules to perform these operations. Here's a possible structure for your package (expressed in terms of a hierarchical filesystem):

    Sound/                             Top-level package
          __init__.py       Initialize the sound package
          Formats/           Subpackage for file formats
                  __init__.py
                  wavread.py
                  wavwrite.py
                  aiffread.py
                  aiffwrite.py
                  auread.py
                  auwrite.py
                  ...
          Effects/          Subpackage for sound effects
                  __init__.py
                  echo.py
                  surround.py
                  reverse.py
                  ...
          Filters/                Subpackage for filters
                  __init__.py
                  equalizer.py
                  vocoder.py
                  karaoke.py
                  ...

When importing the package, Python searches through the directories on sys.path looking for the package subdirectory.

The Â¿__init__.pyÂ¿ files are required to make Python treat the directories as containing packages; this is done to prevent directories with a common name, such as Â¿stringÂ¿, from unintentionally hiding valid modules that occur later on the module search path. In the simplest case, Â¿__init__.pyÂ¿ can just be an empty file, but it can also execute initialization code for the package or set the __all__ variable, described later.

Users of the package can import individual modules from the package, for example:

    import Sound.Effects.echo

This loads the submodule Â¿Sound.Effects.echoÂ¿. It must be referenced with its full name.

    Sound.Effects.echo.echofilter(input, output, delay=0.7,
                                  atten=4)

An alternative way of importing the submodule is:

    from Sound.Effects import echo

This also loads the submodule Â¿echoÂ¿, and makes it available without its package prefix, so it can be used as follows:

    echo.echofilter(input, output, delay=0.7, atten=4)

Yet another variation is to import the desired function or variable directly:

    from Sound.Effects.echo import echofilter

Again, this loads the submodule Â¿echoÂ¿, but this makes its function echofilter() directly available:

    echofilter(input, output, delay=0.7, atten=4)

Note that when using from package import item, the item can be either a submodule (or subpackage) of the package, or some other name defined in the package, like a function, class or variable. The import statement first tests whether the item is defined in the package; if not, it assumes it is a module and attempts to load it. If it fails to find it, an ImportError exception is raised.

Contrarily, when using syntax like import item.subitem.subsubitem, each item except for the last must be a package; the last item can be a module or a package but can't be a class or function or variable defined in the previous item.

	-> Importing From a Package

Now what happens when the user writes from Sound.Effects import *? Ideally, one would hope that this somehow goes out to the filesystem, finds which submodules are present in the package, and imports them all. Unfortunately, this operation does not work very well on Mac and Windows platforms, where the filesystem does not always have accurate information about the case of a filename! On these platforms, there is no guaranteed way to know whether a file Â¿ECHO.PYÂ¿ should be imported as a module Â¿echoÂ¿, Â¿EchoÂ¿ or Â¿ECHOÂ¿. (For example, Windows 95 has the annoying practice of showing all file names with a capitalized first letter.) The DOS 8+3 filename restriction adds another interesting problem for long module names.

The only solution is for the package author to provide an explicit index of the package. The import statement uses the following convention: if a package's Â¿__init__.pyÂ¿ code defines a list named __all__, it is taken to be the list of module names that should be imported when from package import * is encountered. It is up to the package author to keep this list up-to-date when a new version of the package is released. Package authors may also decide not to support it, if they don't see a use for importing * from their package. For example, the file Â¿Sounds/Effects/__init__.pyÂ¿ could contain the following code:

    __all__ = ["echo", "surround", "reverse"]

This would mean that from Sound.Effects import * would import the three named submodules of the Â¿SoundÂ¿ package.

If __all__ is not defined, the statement from Sound.Effects import * does not import all submodules from the package Â¿Sound.EffectsÂ¿ into the current namespace; it only ensures that the package Â¿Sound.EffectsÂ¿ has been imported (possibly running any initialization code in Â¿__init__.pyÂ¿) and then imports whatever names are defined in the package. This includes any names defined (and submodules explicitly loaded) by Â¿__init__.pyÂ¿. It also includes any submodules of the package that were explicitly loaded by previous import statements. Consider this code:

    import Sound.Effects.echo
    import Sound.Effects.surround
    from Sound.Effects import *

In this example, the echo and surround modules are imported in the current namespace because they are defined in the Â¿Sound.EffectsÂ¿ package when the from...import statement is executed. (This also works when __all__ is defined.)

Note that in general the practice of importing * from a module or package is frowned upon, since it often causes poorly readable code. However, it is okay to use it to save typing in interactive sessions, and certain modules are designed to export only names that follow certain patterns.

Remember, there is nothing wrong with using from Package import specific_submodule! In fact, this is the recommended notation unless the importing module needs to use submodules with the same name from different packages. 
```

### 19.1.5 Manual, http://docs.python.org/dist/intro.html

### 19.1.6 tags: creating package python3

#### 19.1.6.1 https://packaging.python.org/en/latest/tutorials/packaging-projects/

```text
		    19.1.6.2
		19.1.7
```

## 19.2 PIP

### 19.2.1 installation guide

```text
https://packaging.python.org/tutorials/installing-packages/
http://dcjtech.info/wp-content/uploads/2015/10/Pip-Cheatsheet.pdf

General Parameters Description
-v,--verbose Verbose mode (More output)
-q,--quiet Quiet mode (Less output)
-h,--help Help/Options
-V,--version Display version info
--isolated Ignore environment variables and

user configuration
--log PATH Log file
--proxy PROXY USER:PSWD@SERVER:PORT
--retries X Retry connection X times
--timeout SECONDS Try for X seconds before retry
--cache-dir DIR Cache directory
--no-cache-dir Disable cache
--disable-pip-version-check Do not check Pip version
--cert PATH Path to secondary CA bundle
--client-cert CERT Path to SSL certificate
--trusted-host HOSTNAME Consider the host trusted

List Description
pip list List packages
-o,--outdated List outdated packages
-u,--uptodate List current packages
-e,--editable List editable items
-l,--local List local virtualenv packages
--user List user-site packages
--pre Include developmental packages
-i URL,--index-url URL PyPI URL
--extra-index-url URL Additional package repos
--no-index Ignore package index
-f URL,--find-links URL Search for archives at the URL
--allow-external PKG Allow package installation
--allow-all-external Allow externally hosted packages to
be installed
--allow-unverified PKG Install insecure package
--process-dependency-links Process links for dependencies
Show Description
pip show PKG Display package info
-f, --files List package's files
Search Description
pip search KEYWORD Search PyPI for keyword
--index URL Repo to search

Uninstall Description
pip uninstall PKG Uninstall/remove package
-r FILE,--requirement FILE Uninstall packages listed in
requirements file
-y,--yes Assume “yes” for questions

Freeze Description
pip freeze Generate requirements file
-r FILE,--requirement FILE Use the order given in the file
-f URL,--find-links URL URL for finding packages
-l,--local Only list virtualenv packages
--user Only list user-site packages

Install Description
pip install PKG Install package
pip install PKG==1.0 Install specific version
pip install 'PKG>=1.0' At least, install version X
-r FILE,--requirement FILE Install listed packages in the

requirements file
-b DIR,--build DIR Directory for building packages
-t DIR,--target DIR Install in directory
-d DIR, --download DIR Download only
-U,--upgrade Update listed packages
--force-reinstall Re-install packages when updating
-I,--ignore-installed Re-install
--no-deps Do not install dependencies
--egg Install as an Egg
--compile Compile *.py to *.pyc
--no-compile Do not compile
--no-use-wheel Do not use wheels
--pre Include developmental versions
--no-clean Do not clean build directories
-i URL,--index-url URL PyPI URL
--extra-index-url URL Additional URLs
--no-index Only use --find-links URLs
-f URL,--find-links URL Parse links for archives
--allow-external PKG Install 3rd-party package
--allow-all-external Install 3rd-party packages
--allow-unverified PKG Install unverified package
--process-dependency-links Process links for dependencies
```

### 19.2.2 creating a pip package

```text
https://packaging.python.org/tutorials/packaging-projects/

Packaging Python Projects¶
This tutorial walks you through how to package a simple Python project. It will show you how to add the necessary files and structure to create the package, how to build the package, and how to upload it to the Python Package Index.

A simple project
This tutorial uses a simple project named example_pkg. If you are unfamiliar with Python’s modules and import packages, take a few minutes to read over the Python documentation for packages and modules. Even if you already have a project that you want to package up, we recommend following this tutorial as-is using this example package and then trying with your own package.

To create this project locally, create the following file structure:

/packaging_tutorial
  /example_pkg
    __init__.py
Once you create this structure, you’ll want to run all of the commands in this tutorial within the top-level folder - so be sure to cd packaging_tutorial.

You should also edit example_pkg/__init__.py and put the following code in there:

name = "example_pkg"
This is just so that you can verify that it installed correctly later in this tutorial and is not used by PyPI.

Creating the package files
You will now create a handful of files to package up this project and prepare it for distribution. Create the new files listed below - you will add content to them in the following steps.

/packaging_tutorial
  /example_pkg
    __init__.py
  setup.py
  LICENSE
  README.md
Creating setup.py
setup.py is the build script for setuptools. It tells setuptools about your package (such as the name and version) as well as which code files to include.

Open setup.py and enter the following content. Update the package name to include your username (for example, example-pkg-theacodes), this ensures that you have a unique package name and that your package doesn’t conflict with packages uploaded by other people following this tutorial.

import setuptools

with open("README.md", "r") as fh:
    long_description = fh.read()

setuptools.setup(
    name="example-pkg-your-username",
    version="0.0.1",
    author="Example Author",
    author_email="author@example.com",
    description="A small example package",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/pypa/sampleproject",
    packages=setuptools.find_packages(),
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
)
setup() takes several arguments. This example package uses a relatively minimal set:

name is the distribution name of your package. This can be any name as long as only contains letters, numbers, _ , and -. It also must not already taken on pypi.org. Be sure to update this with your username, as this ensures you won’t try to upload a package with the same name as one which already exists when you upload the package.
version is the package version see PEP 440 for more details on versions.
author and author_email are used to identify the author of the package.
description is a short, one-sentence summary of the package.
long_description is a detailed description of the package. This is shown on the package detail package on the Python Package Index. In this case, the long description is loaded from README.md which is a common pattern.
long_description_content_type tells the index what type of markup is used for the long description. In this case, it’s Markdown.
url is the URL for the homepage of the project. For many projects, this will just be a link to GitHub, GitLab, Bitbucket, or similar code hosting service.
packages is a list of all Python import packages that should be included in the distribution package. Instead of listing each package manually, we can use find_packages() to automatically discover all packages and subpackages. In this case, the list of packages will be example_pkg as that’s the only package present.
classifiers gives the index and pip some additional metadata about your package. In this case, the package is only compatible with Python 3, is licensed under the MIT license, and is OS-independent. You should always include at least which version(s) of Python your package works on, which license your package is available under, and which operating systems your package will work on. For a complete list of classifiers, see https://pypi.org/classifiers/.
There are many more than the ones mentioned here. See Packaging and distributing projects for more details.

Creating README.md
Open README.md and enter the following content. You can customize this if you’d like.

# Example Package

This is a simple example package. You can use
[Github-flavored Markdown](https://guides.github.com/features/mastering-markdown/)
to write your content.
Creating a LICENSE
It’s important for every package uploaded to the Python Package Index to include a license. This tells users who install your package the terms under which they can use your package. For help picking a license, see https://choosealicense.com/. Once you have chosen a license, open LICENSE and enter the license text. For example, if you had chosen the MIT license:

Copyright (c) 2018 The Python Packaging Authority

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
Generating distribution archives
The next step is to generate distribution packages for the package. These are archives that are uploaded to the Package Index and can be installed by pip.

Make sure you have the latest versions of setuptools and wheel installed:

python3 -m pip install --user --upgrade setuptools wheel
Tip IF you have trouble installing these, see the Installing Packages tutorial.
Now run this command from the same directory where setup.py is located:

python3 setup.py sdist bdist_wheel
This command should output a lot of text and once completed should generate two files in the dist directory:

dist/
  example_pkg_your_username-0.0.1-py3-none-any.whl
  example_pkg_your_username-0.0.1.tar.gz
Note If you run into trouble here, please copy the output and file an issue over on packaging problems and we’ll do our best to help you!
The tar.gz file is a source archive whereas the .whl file is a built distribution. Newer pip versions preferentially install built distributions, but will fall back to source archives if needed. You should always upload a source archive and provide built archives for the platforms your project is compatible with. In this case, our example package is compatible with Python on any platform so only one built distribution is needed.

Uploading the distribution archives
Finally, it’s time to upload your package to the Python Package Index!

The first thing you’ll need to do is register an account on Test PyPI. Test PyPI is a separate instance of the package index intended for testing and experimentation. It’s great for things like this tutorial where we don’t necessarily want to upload to the real index. To register an account, go to https://test.pypi.org/account/register/ and complete the steps on that page. You will also need to verify your email address before you’re able to upload any packages. For more details on Test PyPI, see Using TestPyPI.

Now that you are registered, you can use twine to upload the distribution packages. You’ll need to install Twine:

python3 -m pip install --user --upgrade twine
Once installed, run Twine to upload all of the archives under dist:

python3 -m twine upload --repository-url https://test.pypi.org/legacy/ dist/*
You will be prompted for the username and password you registered with Test PyPI. After the command completes, you should see output similar to this:

Uploading distributions to https://test.pypi.org/legacy/
Enter your username: [your username]
Enter your password:
Uploading example_pkg_your_username-0.0.1-py3-none-any.whl
100%|█████████████████████| 4.65k/4.65k [00:01<00:00, 2.88kB/s]
Uploading example_pkg_your_username-0.0.1.tar.gz
100%|█████████████████████| 4.25k/4.25k [00:01<00:00, 3.05kB/s]
Once uploaded your package should be viewable on TestPyPI, for example, https://test.pypi.org/project/example-pkg-your-username

Installing your newly uploaded package
You can use pip to install your package and verify that it works. Create a new virtualenv (see Installing Packages for detailed instructions) and install your package from TestPyPI:

python3 -m pip install --index-url https://test.pypi.org/simple/ --no-deps example-pkg-your-username
Make sure to specify your username in the package name!

pip should install the package from Test PyPI and the output should look something like this:

Collecting example-pkg-your-username
  Downloading https://test-files.pythonhosted.org/packages/.../example-pkg-your-username-0.0.1-py3-none-any.whl
Installing collected packages: example-pkg-your-username
Successfully installed example-pkg-your-username-0.0.1
Note This example uses --index-url flag to specify TestPyPI instead of live PyPI. Additionally, it specifies --no-deps. Since TestPyPI doesn’t have the same packages as the live PyPI, it’s possible that attempting to install dependencies may fail or install something unexpected. While our example package doesn’t have any dependencies, it’s a good practice to avoid installing dependencies when using TestPyPI.
You can test that it was installed correctly by importing the module and referencing the name property you put in __init__.py earlier.

Run the Python interpreter (make sure you’re still in your virtualenv):

python
And then import the module and print out the name property. This should be the same regardless of what you name you gave your distribution package in setup.py (in this case, example-pkg-your-username) because your import package is example_pkg.

>>>
>>> import example_pkg
>>> example_pkg.name
'example_pkg'
Next steps
Congratulations, you’ve packaged and distributed a Python project! ✨ 🍰 ✨

Keep in mind that this tutorial showed you how to upload your package to Test PyPI, which isn’t a permanent storage. The Test system occasionally deletes packages and accounts. It is best to use Test PyPI for testing and experiments like this tutorial.

When you are ready to upload a real package to the Python Package Index you can do much the same as you did in this tutorial, but with these important differences:

Choose a memorable and unique name for your package. You don’t have to append your username as you did in the tutorial.
Register an account on https://pypi.org - note that these are two separate servers and the login details from the test server are not shared with the main server.
Use twine upload dist/* to upload your package and enter your credentials for the account you registered on the real PyPI.
Install your package from the real PyPI using pip install [your-package].
At this point if you want to read more on packaging Python libraries here are some things you can do:

Read more about using setuptools to package libraries in Packaging and distributing projects.
Read about Packaging binary extensions.
Consider alternatives to setuptools such as flit, hatch, and poetry.

        19.2.3
```

## 19.3 pipenv

```text
$ brew install pipenv
```

### 19.3.1 Basic

```text
https://docs.pipenv.org/en/latest/basics/
Basic Usage of Pipenv
https://farm4.staticflickr.com/3931/33173826122_b7ee8f1a26_k_d.jpg
This document covers some of Pipenv’s more basic features.

☤ Example Pipfile & Pipfile.lock
Here is a simple example of a Pipfile and the resulting Pipfile.lock.

Example Pipfile
[[source]]
url = "https://pypi.python.org/simple"
verify_ssl = true
name = "pypi"

[packages]
requests = "*"


[dev-packages]
pytest = "*"
Example Pipfile.lock
{
    "_meta": {
        "hash": {
            "sha256": "8d14434df45e0ef884d6c3f6e8048ba72335637a8631cc44792f52fd20b6f97a"
        },
        "host-environment-markers": {
            "implementation_name": "cpython",
            "implementation_version": "3.6.1",
            "os_name": "posix",
            "platform_machine": "x86_64",
            "platform_python_implementation": "CPython",
            "platform_release": "16.7.0",
            "platform_system": "Darwin",
            "platform_version": "Darwin Kernel Version 16.7.0: Thu Jun 15 17:36:27 PDT 2017; root:xnu-3789.70.16~2/RELEASE_X86_64",
            "python_full_version": "3.6.1",
            "python_version": "3.6",
            "sys_platform": "darwin"
        },
        "pipfile-spec": 5,
        "requires": {},
        "sources": [
            {
                "name": "pypi",
                "url": "https://pypi.python.org/simple",
                "verify_ssl": true
            }
        ]
    },
    "default": {
        "certifi": {
            "hashes": [
                "sha256:54a07c09c586b0e4c619f02a5e94e36619da8e2b053e20f594348c0611803704",
                "sha256:40523d2efb60523e113b44602298f0960e900388cf3bb6043f645cf57ea9e3f5"
            ],
            "version": "==2017.7.27.1"
        },
        "chardet": {
            "hashes": [
                "sha256:fc323ffcaeaed0e0a02bf4d117757b98aed530d9ed4531e3e15460124c106691",
                "sha256:84ab92ed1c4d4f16916e05906b6b75a6c0fb5db821cc65e70cbd64a3e2a5eaae"
            ],
            "version": "==3.0.4"
        },
        "idna": {
            "hashes": [
                "sha256:8c7309c718f94b3a625cb648ace320157ad16ff131ae0af362c9f21b80ef6ec4",
                "sha256:2c6a5de3089009e3da7c5dde64a141dbc8551d5b7f6cf4ed7c2568d0cc520a8f"
            ],
            "version": "==2.6"
        },
        "requests": {
            "hashes": [
                "sha256:6a1b267aa90cac58ac3a765d067950e7dbbf75b1da07e895d1f594193a40a38b",
                "sha256:9c443e7324ba5b85070c4a818ade28bfabedf16ea10206da1132edaa6dda237e"
            ],
            "version": "==2.18.4"
        },
        "urllib3": {
            "hashes": [
                "sha256:06330f386d6e4b195fbfc736b297f58c5a892e4440e54d294d7004e3a9bbea1b",
                "sha256:cc44da8e1145637334317feebd728bd869a35285b93cbb4cca2577da7e62db4f"
            ],
            "version": "==1.22"
        }
    },
    "develop": {
        "py": {
            "hashes": [
                "sha256:2ccb79b01769d99115aa600d7eed99f524bf752bba8f041dc1c184853514655a",
                "sha256:0f2d585d22050e90c7d293b6451c83db097df77871974d90efd5a30dc12fcde3"
            ],
            "version": "==1.4.34"
        },
        "pytest": {
            "hashes": [
                "sha256:b84f554f8ddc23add65c411bf112b2d88e2489fd45f753b1cae5936358bdf314",
                "sha256:f46e49e0340a532764991c498244a60e3a37d7424a532b3ff1a6a7653f1a403a"
            ],
            "version": "==3.2.2"
        }
    }
}
☤ General Recommendations & Version Control
Generally, keep both Pipfile and Pipfile.lock in version control.
Do not keep Pipfile.lock in version control if multiple versions of Python are being targeted.
Specify your target Python version in your Pipfile’s [requires] section. Ideally, you should only have one target Python version, as this is a deployment tool.
pipenv install is fully compatible with pip install syntax, for which the full documentation can be found here.
Note that the Pipfile uses the TOML Spec.
☤ Example Pipenv Workflow
Clone / create project repository:

$ cd myproject
Install from Pipfile, if there is one:

$ pipenv install
Or, add a package to your new project:

$ pipenv install <package>
This will create a Pipfile if one doesn’t exist. If one does exist, it will automatically be edited with the new package you provided.

Next, activate the Pipenv shell:

$ pipenv shell
$ python --version
This will spawn a new shell subprocess, which can be deactivated by using exit.

☤ Example Pipenv Upgrade Workflow
Find out what’s changed upstream: $ pipenv update --outdated.
Upgrade packages, two options:
Want to upgrade everything? Just do $ pipenv update.
Want to upgrade packages one-at-a-time? $ pipenv update <pkg> for each outdated package.
☤ Importing from requirements.txt
If you only have a requirements.txt file available when running pipenv install, pipenv will automatically import the contents of this file and create a Pipfile for you.

You can also specify $ pipenv install -r path/to/requirements.txt to import a requirements file.

If your requirements file has version numbers pinned, you’ll likely want to edit the new Pipfile to remove those, and let pipenv keep track of pinning. If you want to keep the pinned versions in your Pipfile.lock for now, run pipenv lock --keep-outdated. Make sure to upgrade soon!

☤ Specifying Versions of a Package
You can specify versions of a package using the Semantic Versioning scheme (i.e. major.minor.micro).

For example, to install requests you can use:

$ pipenv install requests~=1.2   # equivalent to requests~=1.2.0
Pipenv will install version 1.2 and any minor update, but not 2.0.

This will update your Pipfile to reflect this requirement, automatically.

In general, Pipenv uses the same specifier format as pip. However, note that according to PEP 440 , you can’t use versions containing a hyphen or a plus sign.

To make inclusive or exclusive version comparisons you can use:

$ pipenv install "requests>=1.4"   # will install a version equal or larger than 1.4.0
$ pipenv install "requests<=2.13"  # will install a version equal or lower than 2.13.0
$ pipenv install "requests>2.19"   # will install 2.19.1 but not 2.19.0
Note
The use of double quotes around the package and version specification (i.e. "requests>2.19") is highly recommended to avoid issues with Input and output redirection in Unix-based operating systems.

The use of ~= is preferred over the == identifier as the latter prevents pipenv from updating the packages:

$ pipenv install "requests~=2.2"  # locks the major version of the package (this is equivalent to using ==2.*)
To avoid installing a specific version you can use the != identifier.

For an in depth explanation of the valid identifiers and more complex use cases check the relevant section of PEP-440.

☤ Specifying Versions of Python
To create a new virtualenv, using a specific version of Python you have installed (and on your PATH), use the --python VERSION flag, like so:

Use Python 3:

$ pipenv --python 3
Use Python3.6:

$ pipenv --python 3.6
Use Python 2.7.14:

$ pipenv --python 2.7.14
When given a Python version, like this, Pipenv will automatically scan your system for a Python that matches that given version.

If a Pipfile hasn’t been created yet, one will be created for you, that looks like this:

[[source]]
url = "https://pypi.python.org/simple"
verify_ssl = true

[dev-packages]

[packages]

[requires]
python_version = "3.6"
Note
The inclusion of [requires] python_version = "3.6" specifies that your application requires this version of Python, and will be used automatically when running pipenv install against this Pipfile in the future (e.g. on other machines). If this is not true, feel free to simply remove this section.

If you don’t specify a Python version on the command–line, either the [requires] python_full_version or python_version will be selected automatically, falling back to whatever your system’s default python installation is, at time of execution.

☤ Editable Dependencies (e.g. -e . )
You can tell Pipenv to install a path as editable — often this is useful for the current working directory when working on packages:

$ pipenv install --dev -e .

$ cat Pipfile
...
[dev-packages]
"e1839a8" = {path = ".", editable = true}
...
Note
All sub-dependencies will get added to the Pipfile.lock as well. Sub-dependencies are not added to the Pipfile.lock if you leave the -e option out.

☤ Environment Management with Pipenv
The three primary commands you’ll use in managing your pipenv environment are $ pipenv install, $ pipenv uninstall, and $ pipenv lock.

$ pipenv install
$ pipenv install is used for installing packages into the pipenv virtual environment and updating your Pipfile.

Along with the basic install command, which takes the form:

$ pipenv install [package names]
The user can provide these additional parameters:

--two — Performs the installation in a virtualenv using the system python2 link.
--three — Performs the installation in a virtualenv using the system python3 link.
--python — Performs the installation in a virtualenv using the provided Python interpreter.
Warning
None of the above commands should be used together. They are also destructive and will delete your current virtualenv before replacing it with an appropriately versioned one.

Note
The virtualenv created by Pipenv may be different from what you were expecting. Dangerous characters (i.e. $`!*@" as well as space, line feed, carriage return, and tab) are converted to underscores. Additionally, the full path to the current folder is encoded into a “slug value” and appended to ensure the virtualenv name is unique.

--dev — Install both develop and default packages from Pipfile.
--system — Use the system pip command rather than the one from your virtualenv.
--ignore-pipfile — Ignore the Pipfile and install from the Pipfile.lock.
--skip-lock — Ignore the Pipfile.lock and install from the Pipfile. In addition, do not write out a Pipfile.lock reflecting changes to the Pipfile.
$ pipenv uninstall
$ pipenv uninstall supports all of the parameters in pipenv install, as well as two additional options, --all and --all-dev.

--all — This parameter will purge all files from the virtual environment, but leave the Pipfile untouched.
--all-dev — This parameter will remove all of the development packages from the virtual environment, and remove them from the Pipfile.
$ pipenv lock
$ pipenv lock is used to create a Pipfile.lock, which declares all dependencies (and sub-dependencies) of your project, their latest available versions, and the current hashes for the downloaded files. This ensures repeatable, and most importantly deterministic, builds.

☤ About Shell Configuration
Shells are typically misconfigured for subshell use, so $ pipenv shell --fancy may produce unexpected results. If this is the case, try $ pipenv shell, which uses “compatibility mode”, and will attempt to spawn a subshell despite misconfiguration.

A proper shell configuration only sets environment variables like PATH during a login session, not during every subshell spawn (as they are typically configured to do). In fish, this looks like this:

if status --is-login
    set -gx PATH /usr/local/bin $PATH
end
You should do this for your shell too, in your ~/.profile or ~/.bashrc or wherever appropriate.

Note
The shell launched in interactive mode. This means that if your shell reads its configuration from a specific file for interactive mode (e.g. bash by default looks for a ~/.bashrc configuration file for interactive mode), then you’ll need to modify (or create) this file.

If you experience issues with $ pipenv shell, just check the PIPENV_SHELL environment variable, which $ pipenv shell will use if available. For detail, see configuration-with-environment-variables.

☤ A Note about VCS Dependencies
You can install packages with pipenv from git and other version control systems using URLs formatted according to the following rule:

<vcs_type>+<scheme>://<location>/<user_or_organization>/<repository>@<branch_or_tag>#egg=<package_name>
The only optional section is the @<branch_or_tag> section. When using git over SSH, you may use the shorthand vcs and scheme alias git+git@<location>:<user_or_organization>/<repository>@<branch_or_tag>#<package_name>. Note that this is translated to git+ssh://git@<location> when parsed.

Note that it is strongly recommended that you install any version-controlled dependencies in editable mode, using pipenv install -e, in order to ensure that dependency resolution can be performed with an up to date copy of the repository each time it is performed, and that it includes all known dependencies.

Below is an example usage which installs the git repository located at https://github.com/requests/requests.git from tag v2.20.1 as package name requests:

$ pipenv install -e git+https://github.com/requests/requests.git@v2.20.1#egg=requests
Creating a Pipfile for this project...
Installing -e git+https://github.com/requests/requests.git@v2.20.1#egg=requests...
[...snipped...]
Adding -e git+https://github.com/requests/requests.git@v2.20.1#egg=requests to Pipfile's [packages]...
[...]

$ cat Pipfile
[packages]
requests = {git = "https://github.com/requests/requests.git", editable = true, ref = "v2.20.1"}
Valid values for <vcs_type> include git, bzr, svn, and hg. Valid values for <scheme> include http, https, ssh, and file. In specific cases you also have access to other schemes: svn may be combined with svn as a scheme, and bzr can be combined with sftp and lp.

You can read more about pip’s implementation of VCS support here. For more information about other options available when specifying VCS dependencies, please check the Pipfile spec.

☤ Pipfile.lock Security Features
Pipfile.lock takes advantage of some great new security improvements in pip. By default, the Pipfile.lock will be generated with the sha256 hashes of each downloaded package. This will allow pip to guarantee you’re installing what you intend to when on a compromised network, or downloading dependencies from an untrusted PyPI endpoint.

We highly recommend approaching deployments with promoting projects from a development environment into production. You can use pipenv lock to compile your dependencies on your development environment and deploy the compiled Pipfile.lock to all of your production environments for reproducible builds.

        19.3.2
    19.4
```
