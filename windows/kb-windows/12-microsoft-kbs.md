---
type: reference
title: Microsoft KBs
description: "Legacy Windows KB section: Microsoft KBs (Active Directory Articles)"
tags: [windows, legacy, reference]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: deprecated
capture_type: source
legacy_source: "windows/kb-windows#12"
---

# Microsoft KBs

> **Deprecated (2026-10):** EOL Windows Server KBs. Current: See current Microsoft docs. Source: <https://python.org/doc/sunset-python-2/>

[↑ kb-windows](/windows/kb-windows/README.md)

## 12.1 Active Directory Articles

### 12.1.1 Enable net logon debug, http://support.microsoft.com/kb/109626

```text
This article details the steps to enable logging of debug information by using a debug version of Net Logon and the required debug DLLs.
MORE INFORMATION
Important This section, method, or task contains steps that tell you how to modify the registry. However, serious problems might occur if you modify the registry incorrectly. Therefore, make sure that you follow these steps carefully. For added protection, back up the registry before you modify it. Then, you can restore the registry if a problem occurs. For more information about how to back up and restore the registry, click the following article number to view the article in the Microsoft Knowledge Base:
322756  How to back up and restore the registry in Windows
The version of Netlogon.dll that has tracing included is installed by default. To enable debug logging, set the debug flag that you want in the registry and restart the service by using the following steps:
Start the Regedt32 program.
Delete the Reg_SZ value of the following registry entry, create a REG_DWORD value with the same name, and then add the 2080FFFF hexadecimal value.
HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\Netlogon\Parameters\DBFlag
At a command prompt, type net stop netlogon, and then type net start netlogon. This enables debug logging.
To disable debug logging, change the data value to 0x0 in the following registry key:
HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\Netlogon\Parameters\DBFlag
Quit Regedt32.
Stop Net Logon, and then restart Net Logon.

Notes
After you restart Net Logon, Net Logon-related activity may be logged to %windir%\debug\netlogon.log.
The MaximumLogFileSize registry entry can be used to specify the maximum size of the Netlogon.log file. By default, this registry entry does not exist, and the default maximum size of the Netlogon.log file is 20 MB. When the file reaches 20 MB, it is renamed to Netlogon.bak, and a new Netlogon.log file is created. This registry entry has the following parameters:

Path: HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\Netlogon\Parameters 
Value Name: MaximumLogFileSize 
Value Type: REG_DWORD 
Value Data: <maximum log file size in bytes>
On Windows Server 2003-based computers, you can use the following Group Policy to configure the log file size:
\Computer Configuration\Administrative Templates\System\Net Logon\Maximum Log File Size
Note As an alternate method, you can set the dbflag without using the registry. To do this run the following command from a command prompt:
nltest /dbflag:0x2080ffff
Nltest is included as part of Windows Server 2008 and is also available as part of the Support Tools packages on the installation media for Windows Server 2003, Windows XP, and Windows 2000. 

After you finish debugging, you can run the nltest /dbflag:0x0 command from a command prompt to reset the debug flag to 0. For more information, click the following article numbers to view the articles in the Microsoft Knowledge Base:
247811  How domain controllers are located in Windows
189541  Using the checked Netlogon.dll to track account lockouts
Note This is the public version of this article.
//////////////////////////////////////////////////////////////////////// 
// Windows Server 2008, Windows Vista, Windows Server 2003, Windows 2000 Debug flags and their values
//////////////////////////////////////////////////////////////////////// 


#define NL_INIT          0x00000001 // Initialization
#define NL_MISC          0x00000002 // Misc debug
#define NL_LOGON         0x00000004 // Logon processing
#define NL_SYNC          0x00000008 // Synchronization and replication
#define NL_MAILSLOT      0x00000010 // Mailslot messages
#define NL_SITE          0x00000020 // Sites
#define NL_CRITICAL      0x00000100 // Only real important errors
#define NL_SESSION_SETUP 0x00000200 // Trusted Domain maintenance
#define NL_DOMAIN        0x00000400 // Hosted Domain maintenance
#define NL_2             0x00000800
#define NL_SERVER_SESS   0x00001000 // Server session maintenance
#define NL_CHANGELOG     0x00002000 // Change Log references
#define NL_DNS           0x00004000 // DNS name registration

// 
// Very verbose bits
// 

#define NL_WORKER        0x00010000 // Debug worker thread
#define NL_DNS_MORE      0x00020000 // Verbose DNS name registration
#define NL_PULSE_MORE    0x00040000 // Verbose pulse processing
#define NL_SESSION_MORE  0x00080000 // Verbose session management
#define NL_REPL_TIME     0x00100000 // replication timing output
#define NL_REPL_OBJ_TIME 0x00200000 // replication objects get/set timing output
#define NL_ENCRYPT       0x00400000 // debug encrypt and decrypt across net
#define NL_SYNC_MORE     0x00800000 // additional replication dbgprint
#define NL_PACK_VERBOSE  0x01000000 // Verbose Pack/Unpack
#define NL_MAILSLOT_TEXT 0x02000000 // Verbose Mailslot messages
#define NL_CHALLENGE_RES 0x04000000 // challenge response debug
#define NL_SITE_MORE     0x08000000 // Verbose sites

// 
// Control bits.
// 

#define NL_INHIBIT_CANCEL 0x10000000 // Don't cancel API calls
#define NL_TIMESTAMP      0x20000000 // TimeStamp each output line
#define NL_ONECHANGE_REPL 0x40000000 // Only replicate one change per call
#define NL_BREAKPOINT     0x80000000 // Enter debugger on startup

	12.2
```
