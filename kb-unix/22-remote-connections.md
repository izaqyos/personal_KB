---
type: reference
title: Remote connections
description: Section 21 of the legacy unix-kb notes.
tags: [kb-unix]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "unix-kb#21"
---

# Remote connections

[↑ unix-kb](/kb-unix/README.md)

## 21.1 reflection,

```text
	Allows to connext using xindoes
```

## 21.2 VNC

```text
		First start vncserver, $vncserver
		Then (if first time), $vncpasswd
		set password

		use vnc viewer to connect to server.

		This method is better than reflection since its faster, graphical and keeps the session alive w/o dependency on connection to machine (meaning resume is supported)

	If you are using VNC to access your linux and would like to have clipboard shared between your PC and linux, do the following.
From your linux session run:
    vncconfig &
UltraVNC will then pass clipboard text between you windows and linux.
```
