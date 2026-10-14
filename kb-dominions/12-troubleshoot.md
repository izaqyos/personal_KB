---
type: reference
title: Troubleshoot
description: Section 11 of the legacy dominions-kb notes.
tags: [kb-dominions]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "dominions-kb#11"
---

# Troubleshoot

[↑ dominions-kb](/kb-dominions/README.md)

## 11.1 Command line

### 11.1.1 Why doesn't my command line parameters apply?

```text
		It happens b/c dominions stores previous CLI configuration in a file, dom3config
		rename or delete that file and your parameters will appy.
```

### 12.1.2 comptrn

```text
MaxWilson:
Instead of typing "dom3.exe" at the command prompt, type "dom3.exe --comptrn". If you're accessing dom3 through a shortcut on Windows, right-click on the shortcut and select "Properties," and on the window that pops up, on the "Shortcut" tab (which is where it should start out) there's an entry that says "Target:" and has something like "c:\Program Files\Dominions3\dom3.exe" in it. Add " --comptrn" to the end. If you're using Linux it's different, but if you're using Linux you know enough to adapt the procedure anyway.

Now, every time you play a turn in SP, it will generate a file for every computer player that lets you see their empire as if it were a human player's empire, except that for some reason you don't get scouting reports. You can see how many troops they have, what battles they fought against other AIs, what their gem income is, etc.


	11.2
```
