---
type: reference
title: Guides
description: "Legacy Windows KB section: Guides"
tags: [windows, legacy, reference]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: deprecated
capture_type: source
legacy_source: "windows/kb-windows#14"
---

# Guides

> **Deprecated (2026-10):** Win7 EOL Jan 2020. Current: -. Source: <https://endoflife.date/windows>

[↑ kb-windows](/windows/kb-windows/README.md)

## 14.1 Guide to Freeing up Disk Space under Windows 7

```text
Guide to Freeing up Disk Space under Windows 7
November 26, 2011 6:50 AM Comments [30] Posted in Tools

This is an "updated for Windows 7" version of my popular original article Guide to Freeing up Disk Space under Windows Vista.

I've got a 256 gig C: drive, but noticed that in the last week or so I'd had only 20 gigs free. Not cool and it was getting tight. A few hours later, I have 91G free. Here's how.

Warranty: There is none. Please read carefully and with all things you find on a random blog, be careful because you have no one to blame but yourself. However, if you take a few minutes, read carefully and do even a few of these tips or just run Disk Cleanup, you'll get lots of space back.

    Win 7 SP1 Disk Cleanup - removing Service Pack Backup Files Clean up after Windows 7 SP1 (Service Pack 1) - After you install Windows 7 SP1, it leaves around the original files so you can uninstall the Service Pack if you want. After a few months with the Service Pack, I've decided for myself that it's a good thing and decided I don't need the option. In Vista there was a command line tool called "vsp1cln.exe" but in Windows 7 you can run Disk Cleanup and check "Service Pack Backup Files" and get back almost a gig of space.
    The only thing, again is that you can't uninstall SP1. Fine with me.
    Disk Cleanup - It's amazing to me the number of people who DON'T run Disk Cleanup. It's even better in Windows 7. Just run it. Often. After you run it, run it again and click Clean Up System Files to get files that you need to be admin to delete.
    Disable Hibernate - I have a desktop, and I prefer just three power states, sleeping, on or off. I don't use Hibernate. Plus, I have 12 gigs of RAM, and hibernation uses as much disk space as you have RAM. From an administrative command prompt, type "powercfg -h off" to get that space back. Got me back 12 gigs. It's up to you. Don't turn it off if you use the feature.
    %TEMP% Files - Even though Disk Cleanup is great, sometimes for whatever reason it doesn't always get stuff out of the TEMP folder. I recommend you try to delete the TEMP folder. I do this from the command line. Open up an administrative console, type "cd /d %TEMP%" (without the quotes, of course). Then, go up one folder with "cd .." and type "rd /s temp"
    Do be warned, this command says to TRY to delete the whole folder and everything underneath it. It's very unambiguous. If you don't feel comfortable, don't do it. If you feel in over your head, don't do it. If it screws up your computer, don't email me. Next, I do a "dir temp" to see if the folder really got deleted. It usually doesn't because almost always some other program has a temp file open and the command can't get remove everything. If it DOES remove the folder, just "md temp" to get it back fresh and empty. This got me back 12 gigs. I'm sure you'll be surprised and get lots back.
    Delete your Browser Cache - Whether you use Chrome, IE9 or Firefox, your browser is saving probably a gig or more of temporary files. Consider clearing it out manually (or use the CCleaner mentioned below) occasionally or move the cache from your browser's settings to another drive with more space.
    System Protection for Local Disk Clean up System Restore - Windows 7 keeps backups of lots of system files every time something major (driver installation, some software installations, etc) happens, and after a while this can take up lots of space. It uses a service/subsystem called ShadowCopies and can be administered with a tool called vssadmin.
    Now, the EASIEST way to handle this is just to run Disk Cleanup, then click More Options and "Clean up…" which will delete all but the most recent System Restore data. That's what I did. That got me back lots of space back on my C: drive.
    You can also go to System Properties, then System Protection, then Configure and not only control how much space to allow for System Protection but also delete preview restore points as seen in the screenshot at left.
    Alternatively, you can use the vssadmin tool from an admin command prompt to to do important things. One, you can set a max size for the System Restore to get. Two, you can set an alternative drive. For example, you could have the D: drive be responsible for System Restore for the C: drive.
    You can use the commands like this. Note that you can put whatever drive letters you have in there. I ran it for each of my three drives. Note that this isn't just used for System Restore, it's also used for the "Previous Versions" feature of Windows that keeps some number of Shadow Backups in case you delete something and didn't mean it. Kind of a mini, local time machine. Point is, this isn't a feature you probably want off, just one you want kept to a max.
    Here's the command line I used. Your mileage may vary.
    vssadmin Resize ShadowStorage /On=C: /For=C: /MaxSize=15GB
    SpaceSniffer 1.1.0.0 - www.uderzo.it Understand what's taking up all that space with SpaceSniffer or WinDirStat - I've used a large number of Windows Folder Size checkers, and the one I keep coming back to is WinDirStat. WinDirStat is actively developed, it's Open Source, and it works great in Windows. It's wonderfully multi-threaded and is generally fabulous. It'll help you find those crazy large log files you've forgotten about deep in %APPDATA%. It saved me 10 gigs of random goo. SpaceSniffer is also amazing and really lets you drill into what's going on space-wise in your disk.
    Remove Old Stuff - Just go into Add/Remove Programs or Programs and Features and tidy up. There's likely a pile of old crap in there that's taking up space. I removed some Games and Game Demos and got back 5 gigs.
    Uninstall anything evil - If you want to get a quick look at what's on a machine and uninstall LOTS of stuff quickly, look no further than NirSoft's My Uninstaller (download). Remove Toolbars (they think they need them and they never do and won't miss them), and anything that looks like it might destabilize their system. I check out toolbars, add-ins, etc
    Wasteful TempFiles/ScratchFiles Settings in Popular Programs - Most programs that need scratch space have a way to set a ceiling on that Max Space. Go into Internet Explorer or Firefox, into the options and delete the Temporary Internet Files. Set a reasonable size like 250 megs or 500 megs. I've seen those cache sizes set to gigs. If you've got a speedy connection to the internet, that's just overkill. Check other programs like Adobe Photoshop and other editors and see where they store their temporary files and how large they've become. I used SpaceSniffer (mentioned above) and was shocked to find 5 gigs of old temp files from a year ago in little used programs.
    A nicely compressed directoryNTFS Compression - That's right, baby, Stacker (kidding). This is a great feature of NTFS that more people should use. If you've got a bunch of folders with old crap in them, but you don't want to delete them, compress. If you've got a folder that fills up with text files or other easily compressed and frequently access stuff, compress 'em. I typically compress any and all folders that are infrequently accessed, but I'm not ready to toss. That is about 30-40% of my hard drive. Why bother to compress when Disk Space is so cheap? Well, C: drive space usually isn't. I've got an SSD, and it's small. I'd like to get as much out of it as I can without the hassle of moving my Program Files to D:. More importantly, Why the heck not? Why shouldn't I compress? It's utterly painless. Just right click a folder, hit Properties, then Advanced, then Compress. Then forget about it. As long as you're not compressing a bunch of ZIP files (won't do much) then you're all set. You might consider defragging when you're done, just to tidy up if you don't have an SSD.
    Find Fat Temp File Apps and squash them - Google Earth and Microsoft Virtual Earth 3D are really fast and loose with the disk space. You can poke around for a while and next thing you know you're down 2 gigs or more. If you don't use the app a lot, delete the caches when you exit, or better yet, make the cache size for each app small.
    Remove Crap with CrapCleaner (CLeaner) - This is a brilliant utility that removes crapware, unneeded programs, toolbars and other things that might litter up your machine.
    works-on-my-machine-starburst ADVANCED: Use Junction Points/Hard Links/Reparse Points to move temp file folders - This is an advanced technique. If this technique kills your beloved pet cat, don't email me. You have been warned. Also, note that I'm only saying it works for me.
    I reclaimed 25 gigs just today by moving the MobileSync Backup folder from iTunes to a spinning rust disk off my SSD.
    Here's the idea. You'll move it to a drive with more space, but you'll LIE to iTunes using a little-used Windows Utility that will make a LINK between the folder iTunes expects to find and the folder you want your backups in. See? It's advanced but VERY powerful, especially when you

    C:\Users\Scott\AppData\Roaming\Apple Computer\MobileSync>dir

     Directory of C:\Users\Scott\AppData\Roaming\Apple Computer\MobileSync

    11/25/2011  10:10 PM    <DIR>          .
    11/25/2011  10:10 PM    <DIR>          ..
    11/25/2011  10:10 PM    <JUNCTION>     Backup [f:\iTunesMobileSync\Backup]
                   0 File(s)              0 bytes
                   3 Dir(s)  97,594,851,328 bytes free

While your are in there, why not do some more maintenance on your machine, blow out that dust and install some updates? Check out the The Technical Friend's Essential Maintenance Checklist for Non-Technical Friend's Windows Computer.

Hope this helps!

	14.2
```
