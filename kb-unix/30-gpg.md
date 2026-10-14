---
type: reference
title: gpg
description: Section 30 of the legacy unix-kb notes.
tags: [kb-unix]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "unix-kb#30"
---

# gpg

[↑ unix-kb](/kb-unix/README.md)

## 30.1 open, decrypt .tar.gpg file

```text
$ cat pass
Bastien123
$ gpg -d -q --batch --no-mdc-warning --output ise-support-bundle-ise1-biawifi-1-admin-02-25-2015-11-37.tar  --passphrase-file ./pass ise-support-bundle-ise1-biawifi-1-admin-02-25-2015-11-37.tar.gpg 

	30.2
```
