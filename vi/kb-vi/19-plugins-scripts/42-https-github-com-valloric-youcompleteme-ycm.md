---
type: reference
title: "https://github.com/Valloric/YouCompleteMe, YCM"
description: "Subsection 19.39 of PLUGINS, Scripts."
tags: [kb-vi, plugins, scripts, extensions, colorschemes, list, active]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#19.39"
---

# 19.39 https://github.com/Valloric/YouCompleteMe, YCM

[↑ PLUGINS, Scripts](/vi/kb-vi/19-plugins-scripts/README.md)

### 19.39.1 Install

```text
https://valloric.github.io/YouCompleteMe/

$ git clone git://github.com/valloric/YouCompleteMe/
$ cd YouCompleteMe/
	$ git submodule update --init --recursive

-> On linux: $ ./install.sh --clang-completer
-> On Mac: 
$ brew install cmake
$ ./install.py --clang-completer

----->> On linux this has issue w/ validating server cert. fix:
$ ./install.sh --clang-completer
File /users/<user>/.vim/bundle/YouCompleteMe/third_party/ycmd/build.sh doesn't exist; you probably forgot to run:

        git submodule update --init --recursive

$  git submodule update --init --recursive
Cloning into 'third_party/requests'...
fatal: unable to access 'https://github.com/kennethreitz/requests/': SSL certificate problem, verify that the CA cert is OK. Details:
error:14090086:SSL routines:SSL3_GET_SERVER_CERTIFICATE:certificate verify failed
Clone of 'https://github.com/kennethreitz/requests' into submodule path 'third_party/requests' failed
$ git --version
git version 1.9.2
$ git config --global http.sslVerify false
$ ./install.sh --clang-completer
File /users/<user>/.vim/bundle/YouCompleteMe/third_party/ycmd/build.sh doesn't exist; you probably forgot to run:

        git submodule update --init --recursive

$ git submodule update --init --recursive
Cloning into 'third_party/requests'...

----->> On linux this has issue w/ validating server cert. fix:
- 
```

### 19.39.2 languages support

```text
The following additional language support options are available:

    C# support: install Mono with Homebrew or by downloading the Mono Mac package and add --cs-completer when calling install.py.
    Go support: install Go and add --go-completer when calling install.py.
    JavaScript and TypeScript support: install Node.js and npm then install the TypeScript SDK with npm install -g typescript.
    Rust support: install Rust and add --rust-completer when calling install.py.
    Java support: install JDK8 (version 8 required) and add --java-completer when calling install.py.

To simply compile with everything enabled, there's a --all flag. So, to install with all language features, ensure xbuild, go, tsserver, node, npm, rustc, and cargo tools are installed and in your PATH, then simply run:

cd ~/.vim/bundle/YouCompleteMe
./install.py --all

		19.39.3
```
