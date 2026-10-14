---
type: reference
title: Troubleshooting
description: "Legacy Windows KB section: Troubleshooting (Searching and indexing, Install apple's trackpad on windows)"
tags: [troubleshooting, windows, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "windows/kb-windows#15"
---

# Troubleshooting

[↑ kb-windows](/windows/kb-windows/README.md)

## 15.1 Searching and indexing

```text
		15.1.1  Question - Win 7 and Outlook search not working: "no items match your search"
Applies To:

    Windows
    Windows 7
    Files, Folders, and Search

Greetings,

After reviewing several posts and "solutions" on the forum about the issue I'm having with Win 7 and Outlook search not working, my issue hasn't been resolved. Thought I would submit a question here.
Symptoms:

|1.      First symptom: Could no longer search for items in Outlook. When I typed a value in the search field for mail or contacts Outlook would search, but never stop. When I went to the Search ribbon> Search Tools > Indexing Status the message said “Outlook is currently indexing your items. 2810 items remaining to be indexed.”

|2.      Second symptom: could no longer search Windows 7 using the Start menu or an Explorer window. Windows would immediately return: “No items match your search” even though I know many items exist.

|3.      Third symptom: could no longer search OneNote. As soon as I open OneNote, I receive the message: "The Microsoft Windows Desktop Search system component is not properly installed."
Troubleshooting Steps

|1.      Ran the Search and Indexing troubleshooter.

a.      Start > Control Panel > in search box typed “Troubleshooter” > clicked Troubleshooting > then clicked View All > Search and Indexing.

b.     Received the "What problems do you notice" message box and I chose Files don't appear in search results, Email doesn't appear in search results, and Search or indexing is slowing down the computer. 

c.      After running the troubleshooter, I received this message: "Windows Search service is not running" 

d.     I clicked “Try these repairs as an administrator” and it ran through the troubleshooter again, asking me the same questions as step b above. The result was the "Troubleshooting has Completed" window saying "Windows Search service not running". 

e.     When I click Explore additional options, I got the window suggesting that I Search Helpa nd Support, Windows Communities, or Find related Troubleshooters.

|2.      Tried to resolve issue on my own.

a.      Went to Control Panel. Performed a search for “Search” and found Indexing Options window. Launched Indexing Options and discovered that Indexing is not running.

b.     The only option I had at this point was to click the Advanced button. And then Rebuild Index. But nothing happened other than a quick warning that it will take a long time.

 

|3.      Tried the FixIt button (http://windows.microsoft.com/en-US/windows7/Searching-in-Windows-frequently-asked-questions) and but it did not fix the issue.

 

a.      I did print the report to PDF to document the FixIt troubleshooter.

 Any suggestions on what I should do at this point?  Thanks in advance for your assistance.

5 People had
this question

vsevans
vsevans

Was this helpful?

Answer

Issue has been resolved. Thanks to Rick Stromberg with Verus Technologies out of Dallas. He turned off/on Windows Search feature which created the missing .edb file that we needed.  And thank you all who provided possible solutions. I really appreciate everyone's input!

Here were the exact steps:

Pre-steps

    Go to Control Panel and search for "Index".
    Click Indexing Options. Note that there is nothing listed in the window under "Index these locations"
    When you click Advanced, "Current Location" is completely blank
    Close out of the Indexing Options window
    Navigate to the Windows Search folder where the .edb file is stored: c:\ProgramData\Microsoft\Search\Data\Applications\Windows. The .edb file is not there. The only two files that were there were: MSS.log and MSS05AB6.log
    Now follow the steps below to fix the issue 

Solution

    Go to Control Panel and search for "Features" in the Programs and Features
    Click on "Turn Windows Features on or off"
    Uncheck Windows Search and reboot as requred
    Go to c:\ProgramData\Microsoft\Search\Data\Applications and rename the Windows folder to Windows_ORIG
    Return to Windows Search feature to turn it back on (see steps 1-2)
    Reboot as required 

Confirmation

    Go to c:\ProgramData\Microsoft\Search\Data\Applications and notice the new Windows folder. Examine the contents of the Windows folder and you should see the .edb Indexing database file that was missing in the Windows_ORIG folder.
    Go to Control Panel and search for "Index".
    Click Indexing Options. Note that there are now location listed under "Index these locations"
    When you click Advanced, "Current Location" is now filled in.
    Close out of the Indexing Options window 

Happy Searching!

-Vickie

 

vsevans
vsevans

    All Replies (9)
    More Help

Was this helpful?

Hi Vsevans,

 

    Which version of Outlook is installed on your computer?
    Did you may any change to the computer before this issue started?

 

You may check if the windows search service is set to automatic and started and change it accordingly. To do this, follow the steps below:

 

   a.   Click on Start.

   b.   In the start search box type services.msc and press enter

   c.   In the services Window, scroll down to Windows Search.

   d.   Right click on it and click on Properties.

   e.   Check if the startup type is set to Automatic, if not set it to automatic.

   f.   Click on start button, this will start the windows installer services.

   g.   Click on Apply and Ok.

 

 

Later rebuild Index again on the computer after checking the Windows search service and check if it helps.

 

To rebuild the index:

 

a.       Open the Control Panel from the Start menu.

b.       OpenIndexing Options in the Control Panel.

c.      Note: If Indexing Options is not available, change View by to  Large icons at the top right of the Control Panel.

d.       Select the Advanced button in the Indexing Options window.

e.       Select Rebuild in the Troubleshooting section of the Advanced Options window.

f.       Select OK when asked if you’re sure you want to re-build the search index.

 

In addition to the above steps you may access the link below and follow the suggestions and check if it helps.

http://blogs.msdn.com/b/quenth/archive/2007/07/09/outlook-search-results-may-be-incomplete-because-items-are-still-being-indexed.aspx

http://blogs.msdn.com/b/outlook/archive/2009/06/17/google-apps-sync-disables-outlook-search.aspx 

 

Hope this helps. Let us know the results.

 

Thanks and Regards,

 

Srinivas R

Microsoft Support.

Visit our Microsoft Answers Feedback Forum and let us know what you think.

Arya S Asok
Support Engineer
Arya S Asok
Community Star

Was this helpful?

Hi Srinivas,

Thanks for your help. To answer your question, I am using Outlook 2010 with Win 7. And I recently switched from a local POP setup to BPOS Exchange. But I'm pretty sure the search issue started before I made the switch.

Here are the results of the steps you suggested:

Services.msc

    Went to the Windows Search Properties and immediately noticed that the Windows Search service was stopped. I started it and received the error message: "The Windows Search service on Local Computer started and then stopped. Some services stop automatically if they are not in use by other services or programs." I then clicked OK. and noticed that the service was still stopped (which I expected b/c of the msg)
    Then I went to the properties of Windows Search as you suggested in step c above and the startup type was set to Automatic (Delayed Start). I changed that to Automatic.

Rebuild Index

    After setting the service to automatic, I went to the Indexing Options window to Rebuild the Index and received the same "Rebuilding the index might take a long time..." message. I clicked OK and then nothing happened. It doesn't look like it's running in the background, even after a check in the Windows Task Manager.

 Windows Search status in Services.msc still shows it as stopped.

I reviewed the links you suggested. Here are the results:

    my power setting is saved to 'Balanced' so the first link doesn't apply to me (at least I don't think) and
    when I try to navigate to the Registry for Windows Search as suggested in the 2nd link, I don't have a "Windows Search" level. After the SOFTWARE\Policies\Microsoft\Windows level I have:

    CurrentVersion
    Installer
    IPSec
    NetworkConnections
    NetworkConnectivityStatusIndicator
    safer
    System
    WSDAPI 

Does that indicate an issue if Windows Search isn't listed?

Thanks,

Vickie

vsevans
vsevans

Was this helpful?

Hi there.

I'm still unable to use Windows 7 search to search my computer, Outlook or in OneNote. Are there any other solutions I could try? So far nothing proposed has worked.

Thanks in advance for your help.

Vickie

vsevans
vsevans

Was this helpful?

    Went to the Windows Search Properties and immediately noticed that the Windows Search service was stopped. I started it and received the error message: "The Windows Search service on Local Computer started and then stopped. Some services stop automatically if they are not in use by other services or programs."

Hello vsevans,

What has changed in the time since the issue started? Please have a look at the following KB article and follow the steps included:

Windows Search Service will not start, Error: "The Windows Search service on local computer started and then stopped. Some services stop automatically if they are not in use by other services or programs"
Lisa
Microsoft Answers Support Engineer
Visit our Microsoft Answers Feedback Forum and let us know what you think.

Lisa M.
Lisa M.
Only the Sith deal in absolutes

Was this helpful?

Hi Lisa,

Thank you for submitting a suggestion. The KB article recommends deleting all the files with .BLF and .REGTRANS-MS extension in the C:\windows\system32\config\TxR directory. But when I try to delete the files I get the following "File in Use" mesage: "The action can't be completed because the file is open in System. Close the file and try again." This message occurs for all 6 files I have in there.

As for your first question, nothing has changed since this started in December as far as I know. But then again, I'm an Office MCT and teach from this laptop regularly. It would be difficult for me to pinpoint any specific action I took that may have caused this or been affected by this.

I just checked the Windows Search service under "Services" and it will not start. It shows that the Indexing Service has started but Windows Search is not running. When I try to start the service I get the message: "The Windows Search service on Local Computer started and then stopped. Some services stop automatically if they are not in use by other services or programs."

I'd like to escalate the issue to an actual support call. What is the best number to call to help get this resolved? Would this be a consumer support issue?

Thanks for your assitance.

Vickie

vsevans
vsevans

Was this helpful?

HI Vickie,

Sorry about the delay. Please see the following article for support information:

http://support.microsoft.com/kb/319726
Lisa
Microsoft Answers Support Engineer
Visit our Microsoft Answers Feedback Forum and let us know what you think.

Lisa M.
Lisa M.
Only the Sith deal in absolutes

Was this helpful?

Answer

Issue has been resolved. Thanks to Rick Stromberg with Verus Technologies out of Dallas. He turned off/on Windows Search feature which created the missing .edb file that we needed.  And thank you all who provided possible solutions. I really appreciate everyone's input!

Here were the exact steps:

Pre-steps

    Go to Control Panel and search for "Index".
    Click Indexing Options. Note that there is nothing listed in the window under "Index these locations"
    When you click Advanced, "Current Location" is completely blank
    Close out of the Indexing Options window
    Navigate to the Windows Search folder where the .edb file is stored: c:\ProgramData\Microsoft\Search\Data\Applications\Windows. The .edb file is not there. The only two files that were there were: MSS.log and MSS05AB6.log
    Now follow the steps below to fix the issue 

Solution

    Go to Control Panel and search for "Features" in the Programs and Features
    Click on "Turn Windows Features on or off"
    Uncheck Windows Search and reboot as requred
    Go to c:\ProgramData\Microsoft\Search\Data\Applications and rename the Windows folder to Windows_ORIG
    Return to Windows Search feature to turn it back on (see steps 1-2)
    Reboot as required 

Confirmation

    Go to c:\ProgramData\Microsoft\Search\Data\Applications and notice the new Windows folder. Examine the contents of the Windows folder and you should see the .edb Indexing database file that was missing in the Windows_ORIG folder.
    Go to Control Panel and search for "Index".
    Click Indexing Options. Note that there are now location listed under "Index these locations"
    When you click Advanced, "Current Location" is now filled in.
    Close out of the Indexing Options window 

Happy Searching!

-Vickie

 

vsevans
vsevans

Was this helpful?

NO SEARCH RESULTS IN OUTLOOK 2007 in Windows 7 - I FOUND an answer that worked!
Applies To: Windows | Windows 7 | Files, Folders, and Search

This is an ANSWER.

So frustrated for days because I couldn't find a solution that worked through researching Miscrosoft sites:

THIS ONE by RMcCune WORKED!!! I can search my hundreds of emals.... oh, thank God!

1) open the Outlook search option panel and unselect all folders for indexing.

2) Exit Outlook and without doing anything else wait a good while, it was suggested that you allow time for the index to be removed.

3) reboot

4) go directly to the control panel, go to System and Maintenance, then to Indexing Options, then to Advanced Options.

5) Press the Reset Defaults button (yes if you have special options you will lose them)

6) Reboot and wait for the indexes to rebuild (this may take quite a long time.)

7) When you return to Outlook you will see the Indexing Status now actually works its way through the items and when it completes the Instant search works.

Pasted from <http://www.techspot.com/vb/topic72723.html>

I had done this before, but what worked was unchecking ALL the folders.

Thank you, Jesus, and RMcCune at TECHSPOT!

JJNotes
JJNotes

Was this helpful?

    Hi, vsevans,

    This does not work on my computer, sadly. Any other option? Thanks in advance,

    Stephane



    Issue has been resolved. Thanks to Rick Stromberg with Verus Technologies out of Dallas. He turned off/on Windows Search feature which created the missing .edb file that we needed.  And thank you all who provided possible solutions. I really appreciate everyone's input!

    Here were the exact steps:

    Pre-steps

        Go to Control Panel and search for "Index".
        Click Indexing Options. Note that there is nothing listed in the window under "Index these locations"
        When you click Advanced, "Current Location" is completely blank
        Close out of the Indexing Options window
        Navigate to the Windows Search folder where the .edb file is stored: c:\ProgramData\Microsoft\Search\Data\Applications\Windows. The .edb file is not there. The only two files that were there were: MSS.log and MSS05AB6.log
        Now follow the steps below to fix the issue 

    Solution

        Go to Control Panel and search for "Features" in the Programs and Features
        Click on "Turn Windows Features on or off"
        Uncheck Windows Search and reboot as requred
        Go to c:\ProgramData\Microsoft\Search\Data\Applications and rename the Windows folder to Windows_ORIG
        Return to Windows Search feature to turn it back on (see steps 1-2)
        Reboot as required 

    Confirmation

        Go to c:\ProgramData\Microsoft\Search\Data\Applications and notice the new Windows folder. Examine the contents of the Windows folder and you should see the .edb Indexing database file that was missing in the Windows_ORIG folder.
        Go to Control Panel and search for "Index".
        Click Indexing Options. Note that there are now location listed under "Index these locations"
        When you click Advanced, "Current Location" is now filled in.
        Close out of the Indexing Options window 

    Happy Searching!

    -Vickie

     

		15.1.2
```

## 15.2 Install apple's trackpad on windows

```text
https://www.labnol.org/software/apple-magic-trackpad-with-windows/14158/

Extracted Driver: !ls /cygdrive/c/Users/<user>/Desktop/Yosi/Work/Important/Applemagictrackpadwindowsdriver/


16.
```
