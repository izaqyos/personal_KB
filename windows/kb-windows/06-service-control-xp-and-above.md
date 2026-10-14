---
type: reference
title: Service control (XP and above)
description: "Legacy Windows KB section: Service control (XP and above) (SC.exe)"
tags: [windows, legacy, reference]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "windows/kb-windows#6"
---

# Service control (XP and above)

[↑ kb-windows](/windows/kb-windows/README.md)

## 6.1 SC.exe

```text
		Service Control - Create, Start, Stop, Query or Delete any Windows SERVICE. The command options for SC are case sensitive.

		Syntax
		      SC [\\server] [command] [service_name] [Options]

		Key
		   server       : The machine where the service is running

		   service_name : The KeyName of the service, this is often but not always
				  the same as the DisplayName shown in Control Panel, Services.
				  You can get the KeyName by running: 
				     SC GetKeyName <DisplayName>

		   commands:
			  query  [qryOpt]   Show status
			  queryEx [qryOpt]  Show extended info - pid, flags
			  GetDisplayName    Show the DisplayName
			  GetKeyName        Show the ServiceKeyName
			  EnumDepend        Show Dependencies
			  qc                Show config - dependencies, full path etc
			  start          START a service.
			  stop           STOP a service
			  pause          PAUSE a service.
			  continue       CONTINUE a service.
			  create         Create a service. (add it to the registry)
			  config         permanently change the service configuration
			  delete         Delete a service (from the registry)
			  control        Send a control to a service
			  interrogate    Send an INTERROGATE control request to a service
			  Qdescription   Query the description of a service
			  description    Change the description of a service
			  Qfailure       Query the actions taken by a service upon failure
			  failure        Change the actions taken by a service upon failure
			  sdShow         Display a service's security descriptor using SDDL
			  SdSet          Sets a service's security descriptor using SDDL

		   qryopt:
			  type= driver|service|all
					 query specific types of service
			  state= active|inactive|all
					 query services in a particular state only
			  bufsize= bytes 
			  ri= resume_index_number (default=0)
			  group= groupname
					 query services in a particular group

		   misc commands that don't require a service name:
			  sc  querylock  query the lockstatus for the servicemanager database.
					 this will show if a service request is running
			  sc  lock       lock the service database
			  sc  boot       values are {ok | bad} indicates whether to save  
					 the last restart configuration as the `last-known-good`
					 restart configuration
		   Options
		     The CREATE and CONFIG commands allow additional options to be set
		     see the build-in help: 'SC create' and 'SC config'

		Note the qryOpt options above are case sensitive - they must be entered in lower case, also the position of spaces and = must be exactly as shown.

		The SC command duplicates some aspects of the NET command but adds the ability to create a service.
		SC query will display if a service is running, giving output like this:

			SERVICE_NAME       : messenger
			TYPE               : 20  WIN32_SHARE_PROCESS
			STATE              : 4  RUNNING
						(STOPPABLE,NOT_PAUSABLE,ACCEPTS_SHUTDOWN)
			WIN32_EXIT_CODE    : 0  (0x0)
			SERVICE_EXIT_CODE  : 0  (0x0)
			CHECKPOINT         : 0x0
			WAIT_HINT          : 0x0

		To retrieve specific information from SC's output, pipe into FIND or FindStr
		e.g.

		   SC query messenger | FIND "STATE"
		   SC QUERY state= all |FINDSTR "DISPLAY_NAME STATE"

		In the statement above the FIND command will set the ERRORLEVEL as follows

		ERRORLEVEL 0 = Running
		ERRORLEVEL 1 = Stopped or Paused

		The NET START command can be used in a similar way to check if a service is running:

		   NET START | FIND "Service name" > nul
		   IF errorlevel 1 GOTO :s_not_running

		The service control manager will normally wait up to 30 seconds to allow a service to start - you can modify this time (30,000 milliseconds) in the registry

		HKLM\SYSTEM\CurrentControlSet\Control
		ServicesPipeTimeout (REG_DWORD)

		Some options only take effect at the point when the service is started e.g. the SC config command allows the executable of a service to be changed. When the service next starts up it will run the new executable. Config changes requires the current user to have ¿permission to configure the service¿.

		Examples:

		 SC GetKeyName "task scheduler"
		 SC GetDisplayName schedule 
		 SC start schedule
		 SC QUERY schedule
		 SC QUERY type= driver
		 SC QUERY state= all |findstr "DISPLAY_NAME STATE" >svc_installed.txt 
		 SC \\myServer CONFIG myService obj= LocalSystem password= mypassword
		 SC CONFIG MyService binPath=c:\myprogram.exe obj=".\LocalSystem" password=""  

		Watch out for extra spaces:
		SC QUERY state= all Works
		SC QUERY sTate =all Fails!

		"There is always room at the top" - Daniel Webster

		Related Commands:

		NET - manage network resources
		SCLIST - Display NT Services
		NETSVC - Command-line Service Controller (Win 2K ResKit)
		START /HIGH - Start a specified program or command.
		INSTSRV - Install an NT service (run under a specific account)
		DELSRV - Delete NT service
		SUBINACL - Set service permissions
		Svcmon - Monitor services and raise an alert if they stop. (Win 2K ResKit)
		Svcacls - Service ACL Editor (Win 2K ResKit)
		WMIC SERVICE - WMI access to services.
		List of Windows Services

		Q251192 - Create a Windows Service using SC
		Q166819 - Control Services Remotely
		Q170738 - Debugging a Windows NT Service
		TechNet - Using SC.EXE to develop Windows NT Services

		Equivalent Linux BASH commands:

		nice - Change job scheduling priority
```
