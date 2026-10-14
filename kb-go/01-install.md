---
type: reference
title: install
description: Installing Go on macOS with Homebrew and other methods.
tags: [go, macos, howto, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "go-kb#1"
---

# install

[↑ go-kb](/kb-go/README.md)

## 1.1 mac

### 1.1.1 brew

```text
        https://ahmadawais.com/install-go-lang-on-macos-with-homebrew/
# Go development
export GOPATH="${HOME}/.go"
export GOROOT="$(brew --prefix golang)/libexec"
export PATH="$PATH:${GOPATH}/bin:${GOROOT}/bin"
test -d "${GOPATH}" || mkdir "${GOPATH}"
test -d "${GOPATH}/src/github.com" || mkdir -p "${GOPATH}/src/github.com"
Then finally install go, with Homebrew.

brew install go

Also a bunch of dev tools!
Current way:
$ go install golang.org/x/tools/cmd/godoc@latest
go install github.com/golang/lint/golint@latest

old way:
go get golang.org/x/tools/cmd/godoc
go get github.com/golang/lint/golint

    1.2
```
