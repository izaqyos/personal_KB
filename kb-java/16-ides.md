---
type: reference
title: IDEs
description: "Java IDEs: Eclipse quick references, keyboard shortcuts and Emacs configuration."
tags: [eclipse, java, ide, cheatsheet, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "java-kb#10"
---

# IDEs

[↑ java-kb](/kb-java/README.md)

## 10.1 Eclipse

### 10.1.1 Quick references

#### 10.1.1.1 official

```text
Keyboard Shortcuts Eclipse 3.1
Emacs configuration

Edit
Content Assist		Alt+/	In Dialogs and Windows
Context Information		Alt+?		In Windows
Context Information		Shift+Alt+?	In Windows
Context Information		Shift+Ctrl+Space	In Windows
Copy			Alt+W	In Dialogs and Windows
Copy			Ctrl+C	In Dialogs and Windows
Copy			Ctrl+Insert	In Dialogs and Windows
Copy			Esc W	In Dialogs and Windows
Cut			Ctrl+W	In Dialogs and Windows
Cut			Ctrl+X	In Dialogs and Windows
Cut			Shift+Del	In Dialogs and Windows
Delete			Delete		In Windows
Find Previous		Shift+Ctrl+K	Editing Text
Find and Replace		Alt+R		In Windows
Find and Replace		Esc R		In Windows
Incremental Find		Ctrl+J		Editing Text
Incremental Find		Ctrl+S		Editing Text
Incremental Find Reverse	Ctrl+R		Editing Text
Incremental Find Reverse	Shift+Ctrl+J	Editing Text
Paste			Ctrl+Y	In Dialogs and Windows
Paste			Shift+Ins	In Dialogs and Windows
Quick Diff Toggle		Shift+Ctrl+Q	Editing Text
Quick Fix			Ctrl+1		In Windows
Redo			Ctrl+X R		In Windows
Redo			F10		In Windows
Redo			Shift+Ctrl++	In Windows
Restore Last Selection	Shift+Alt+Down	Editing Java Source
Select All			Ctrl+X H	In Dialogs and Windows
Select Enclosing Element	Shift+Alt+Up	Editing Java Source
Select Next Element		Shift+Alt+Right	Editing Java Source
Select Previous Element	Shift+Alt+Left	Editing Java Source
Show Tooltip Description	F2		Editing Java Source
Toggle Insert Mode		Shift+Ctrl+Insert	Editing Text
Undo			Ctrl+X U		In Windows
Undo			F9		In Windows
Undo			Shift+Ctrl+-	In Windows






© 2005 Carsten Ullrich.
Creative Commons Attribution-ShareAlike 2.5 License
http://creativecommons.org/licenses/by-sa/2.5/


File
Close			Ctrl+F4		In Windows
Close			Ctrl+X K		In Windows
Close All			Ctrl+X Ctrl+C	In Windows
Close All			Shift+Ctrl+F4	In Windows
Close All			Shift+Ctrl+W	In Windows
New menu			Shift+Alt+N	In Windows
Print			Alt+F9		In Windows
Print			Esc F9		In Windows
Properties			Alt+Enter		In Windows
Refresh			F5		In Windows
Rename			F2		In Windows
Save			Ctrl+X Ctrl+S	In Windows
Save All			Ctrl+X S		In Windows
Save All			Shift+Ctrl+S	In Windows

Navigate
Backward History		Alt+Left		In Windows
Forward History		Alt+Right		In Windows
Go to Line			Ctrl+L		Editing Text
Go to Line			Ctrl+X G		Editing Text
Go to Matching Bracket	Shift+Ctrl+P	Editing Java Source
Go to Next Member		Shift+Ctrl+Down	Editing Java Source
Go to Previous Member	Shift+Ctrl+Up	Editing Java Source
Last Edit Location		Ctrl+Q		In Windows
Next			Ctrl+.		In Windows
Open Call Hierarchy		Ctrl+Alt+H		In Windows
Open Declaration		F3		In Windows
Open External Javadoc	Shift+F2		In Windows
Open Resource		Shift+Ctrl+R	In Windows
Open Structure		Ctrl+F3		Editing Java Source
Open Type			Shift+Ctrl+T	In Windows
Open Type Hierarchy		F4		In Windows
Open Type in Hierarchy	Shift+Ctrl+H	In Windows
Previous			Ctrl+		In Windows
Quick Hierarchy		Ctrl+T		Editing Java Source
Quick Outline		Ctrl+O		Editing Java Source
Show In menu		Shift+Alt+W	In Windows

Refactor - Java
Change Method Signature	Shift+Alt+C	In Windows
Convert Local Variable to Field	Shift+Alt+F	Editing Java Source
Extract Local Variable		Shift+Alt+L	In Windows
Extract Method		Shift+Alt+M	In Windows
Inline			Shift+Alt+I		In Windows
Move - Refactoring 		Shift+Alt+V	In Windows
Redo - Refactoring 		Shift+Alt+Y	In Windows
Rename - Refactoring 	Shift+Alt+R	In Windows
Show Refactor Quick Menu	Shift+Alt+T	In Windows
Undo - Refactoring		Shift+Alt+Z	In Windows



Run/Debug
Debug Ant Build		Shift+Alt+D Q	In Windows
Debug Eclipse Application	Shift+Alt+D E	In Windows
Debug JUnit Plug-in Test	Shift+Alt+D P	In Windows
Debug JUnit Test		Shift+Alt+D T	In Windows
Debug Java Applet		Shift+Alt+D A	In Windows
Debug Java Application	Shift+Alt+D J	In Windows
Debug Last Launched		F11		In Windows
Debug SWT Application	Shift+Alt+D S	In Windows
Display			Shift+Ctrl+D	In Dialogs&Windows
Display			Shift+Ctrl+V	In Dialogs&Windows
Execute			Ctrl+U		In Windows
Inspect			Shift+Ctrl+I	In Dialogs&Windows
Resume			F8		Debugging
Run Ant Build		Shift+Alt+X Q	In Windows
Run Eclipse Application	Shift+Alt+X E	In Windows
Run JUnit Plug-in Test	Shift+Alt+X P	In Windows
Run JUnit Test		Shift+Alt+X T	In Windows
Run Java Applet		Shift+Alt+X A	In Windows
Run Java Application		Shift+Alt+X J	In Windows
Run Last Launched		Ctrl+F11		In Windows
Run SWT Application		Shift+Alt+X S	In Windows
Step Into			F5		Debugging
Step Into Selection		Ctrl+F5		Debugging
Step Over			F6		Debugging
Step Return		F7		Debugging
Toggle Line Breakpoint	Shift+Ctrl+B	In Windows
Toggle Step Filters		Shift+F5		In Windows

Search
Open Search Dialog		Ctrl+H		In Windows
References in Workspace	Shift+Ctrl+G	In Windows
Show Occurrences in File Quick Menu	Shift+Ctrl+U In Windows


















Source
Add Block Comment		Shift+Ctrl+/	Editing Java Source
Add Import			Shift+Ctrl+M	Editing Java Source
Add Javadoc Comment	Shift+Alt+J	In Windows
Format			Esc Ctrl+F		Editing Java Source
Format			Shift+Ctrl+F	Editing Ant Buildfiles
Indent Line			Ctrl+I		Editing Java Source
Open External Documentation	Shift+F2		Editing Ant Buildfiles
Organize Imports		Shift+Ctrl+O	In Windows
Quick Assist - Assign to field	Ctrl+2 F		Editing Java Source
Quick Assist - Assign to local variable Ctrl+2 L	Editing Java Source
Quick Assist - Rename in file	Ctrl+2 R		Editing Java Source
Remove Block Comment	Shift+Ctrl+\	Editing Java Source
Remove Occurrence Annotations	Shift+Alt+U	Editing Java Source
Rename In File		Shift+Alt+R	Editing Ant Buildfiles
Show Source Quick Menu	Shift+Alt+S	In Windows
Show Tooltip Description	F2		Editing Ant Buildfiles
Toggle Ant Mark Occurrences	Shift+Alt+O	Editing Ant Buildfiles
Toggle Comment		Ctrl+/		Editing Java Source
Toggle Comment		Ctrl+7		Editing Java Source
Toggle Comment		Esc Ctrl+C	Editing Java Source
Toggle Mark Occurrences	Shift+Alt+O	Editing Java Source


Text Editing
Clear Mark			Ctrl+G		Editing Text
Collapse			Ctrl+Numpad_SubtractEditing Text
Copy Lines			Ctrl+Alt+Down	Editing Text
Cut to Beginning of Line	Alt+0 Ctrl+K	Editing Text
Cut to Beginning of Line	Esc 0 Ctrl+K	Editing Text
Cut to End of Line		Ctrl+K		Editing Text
Delete Next		Ctrl+D		Editing Text
Delete Next Word		Alt+D		Editing Text
Delete Next Word		Ctrl+Delete	Editing Text
Delete Next Word		Esc D		Editing Text
Delete Previous Word		Alt+Backspace	Editing Text
Delete Previous Word		Ctrl+Backspace	Editing Text
Delete Previous Word		Esc Backspace	Editing Text
Delete to End of Line		Shift+Ctrl+Delete	Editing Text
Duplicate Lines		Ctrl+Alt+Up	Editing Text
Expand			Ctrl+Numpad_Add	Editing Text
Expand All			Ctrl+Numpad_Multiply Editing Text
Insert Line Above Current Line	Shift+Ctrl+Enter	Editing Text
Insert Line Below Current Line	Shift+Enter	Editing Text
Line Down			Ctrl+N		Editing Text
Line End			Ctrl+E		Editing Text
Line Start			Ctrl+A		Editing Text
Line Up			Ctrl+P		Editing Text
Move Lines Down		Alt+Down		Editing Text
Move Lines Up		Alt+Up		Editing Text
Next Column		Ctrl+F		Editing Text
Next Word			Alt+F		Editing Text
Next Word			Ctrl+Right		Editing Text
Next Word			Esc F		Editing Text
Page Down		Ctrl+V		Editing Text
Page Up			Alt+V		Editing Text
Page Up			Esc V		Editing Text
Previous Column		Ctrl+B		Editing Text
Previous Word		Alt+B		Editing Text
Previous Word		Ctrl+Left		Editing Text
Previous Word		Esc B		Editing Text
Scroll Line Down		Ctrl+Down		Editing Text
Scroll Line Down		Ctrl+Z		Editing Text
Scroll Line Up		Alt+Z		Editing Text
Scroll Line Up		Ctrl+Up		Editing Text
Scroll Line Up		Esc Z		Editing Text
Select Next Word		Shift+Ctrl+Right	Editing Text
Select Previous Word		Shift+Ctrl+Left	Editing Text
Set Mark			Ctrl+2		Editing Text
Set Mark			Ctrl+Space	Editing Text
Swap Mark			Ctrl+X Ctrl+X	Editing Text
Text End			Alt+>		Editing Text
Text End			Ctrl+X ]		Editing Text
Text End			Esc >		Editing Text
Text End			Esc Shift+>	Editing Text
Text End			Shift+Alt+>	Editing Text
Text Start			Alt+<		Editing Text
Text Start			Ctrl+X [		Editing Text
Text Start			Esc <		Editing Text
Text Start			Esc Shift+<	Editing Text
Text Start			Shift+Alt+<	Editing Text
To Lower Case		Shift+Ctrl+Y	Editing Text
To Upper Case		Shift+Ctrl+X	Editing Text
Toggle Folding		Ctrl+Numpad_Divide	Editing Text
Toggle Overwrite		Insert		Editing Text




















Views
Breakpoints		Shift+Alt+Q B	In Windows
Cheat Sheets		Shift+Alt+Q H	In Windows
Console			Shift+Alt+Q C	In Windows
Java Declaration		Shift+Alt+Q D	In Windows
Java Package Explorer	Shift+Alt+Q P	In Windows
Java Type Hierarchy		Shift+Alt+Q T	In Windows
Javadoc			Shift+Alt+Q J	In Windows
Search			Shift+Alt+Q S	In Windows
Show View (View: Outline)	Shift+Alt+Q O	In Windows
Show View (View: Problems)	Shift+Alt+Q X	In Windows
Synchronize		Shift+Alt+Q Y	In Windows
Variables			Shift+Alt+Q V	In Windows

Window
Activate Editor		F12		In Windows
Maximize Active View or Editor	Ctrl+M		In Windows
Next Editor			Ctrl+F6		In Windows
Next Perspective		Ctrl+F8		In Windows
Next View			Ctrl+F7		In Windows
Open Editor Drop Down	Ctrl+X B		In Windows
Previous Editor		Shift+Ctrl+F6	In Windows
Previous Perspective		Shift+Ctrl+F8	In Windows
Previous View		Shift+Ctrl+F7	In Windows
Show Key Assist		Shift+Ctrl+L	In Dialogs&Windows
Show Ruler Context Menu	Ctrl+F10		Editing Text
Show System Menu		Alt+-		In Windows
Show View Menu		Ctrl+F10		In Windows
Switch to Editor		Ctrl+X Ctrl+B	In Windows
Switch to Editor		Esc Ctrl+E	In Windows

			10.1.1.2
```

### 10.1.2 FAQ

#### 10.1.2.1 error log

```text
$ eclipse   -consolelog
!SESSION 2013-06-12 13:50:24.032 -----------------------------------------------
eclipse.buildId=M20120208-0800
java.version=1.6.0_21
java.vendor=Sun Microsystems Inc.
BootLoader constants: OS=linux, ARCH=x86, WS=gtk, NL=en_US
Framework arguments:  -product org.eclipse.epp.package.jee.product
Command-line arguments:  -os linux -ws gtk -arch x86 -product org.eclipse.epp.package.jee.product -consolelog

!ENTRY org.eclipse.osgi 4 0 2013-06-12 13:50:25.772
!MESSAGE Application error
!STACK 1
java.lang.UnsatisfiedLinkError: Cannot load 32-bit SWT libraries on 64-bit JVM
        at org.eclipse.swt.internal.Library.loadLibrary(Library.java:217)
        at org.eclipse.swt.internal.Library.loadLibrary(Library.java:194)
        at org.eclipse.swt.internal.C.<clinit>(C.java:21)
        at org.eclipse.swt.internal.Converter.wcsToMbcs(Converter.java:63)
        at org.eclipse.swt.internal.Converter.wcsToMbcs(Converter.java:54)
        at org.eclipse.swt.widgets.Display.<clinit>(Display.java:132)
        at org.eclipse.ui.internal.Workbench.createDisplay(Workbench.java:695)
        at org.eclipse.ui.PlatformUI.createDisplay(PlatformUI.java:161)
        at org.eclipse.ui.internal.ide.application.IDEApplication.createDisplay(IDEApplication.java:153)
        at org.eclipse.ui.internal.ide.application.IDEApplication.start(IDEApplication.java:95)
        at org.eclipse.equinox.internal.app.EclipseAppHandle.run(EclipseAppHandle.java:196)
        at org.eclipse.core.runtime.internal.adaptor.EclipseAppLauncher.runApplication(EclipseAppLauncher.java:110)
        at org.eclipse.core.runtime.internal.adaptor.EclipseAppLauncher.start(EclipseAppLauncher.java:79)
        at org.eclipse.core.runtime.adaptor.EclipseStarter.run(EclipseStarter.java:344)
        at org.eclipse.core.runtime.adaptor.EclipseStarter.run(EclipseStarter.java:179)
        at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
        at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:39)
        at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:25)
        at java.lang.reflect.Method.invoke(Method.java:597)
        at org.eclipse.equinox.launcher.Main.invokeFramework(Main.java:622)
        at org.eclipse.equinox.launcher.Main.basicRun(Main.java:577)
        at org.eclipse.equinox.launcher.Main.run(Main.java:1410)
        at org.eclipse.equinox.launcher.Main.main(Main.java:1386)
```

#### 10.1.2.2 java.lang.UnsatisfiedLinkError: Cannot load 32-bit SWT libraries on 64-bit JVM

```text
- debug:
$ ./eclipse  -consolelog -debug
- fix 
: yum install libswt3-gtk2.x86_64
: mv /usr/share/eclipse /usr/share/eclipse-bak

			10.1.2.3
		10.1.3

	10.2
```
