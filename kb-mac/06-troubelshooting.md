---
type: reference
title: Troubelshooting
description: "Mac troubleshooting, including fixing iPhoto not importing iPhone media."
tags: [macos, ios, troubleshooting, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-mac#6"
---

# Troubelshooting

[↑ kb-mac](/kb-mac/README.md)

## 6.1 Iphone - MAC

```text
IPHOTO WON’T IMPORT IPHONE 4 MEDIA: A FIX
JUNE 23, 2010 CALPERNIA ADDAMS 11 COMMENTS

iPhoto blank when you plug in your iPhone 4 ?
Has this happened to anyone else? My old iPhone 3G and 3GS always connected fine with iPhoto 9 (v 8.1.2 424). You plug in the phone, it shows as a device in the left side of iPhoto and the images/video are there to be imported. With my new iPhone 4, i plug it in, open iPhoto, it shows as a device BUT there is no media to be imported, even though the camera roll has items in it.

By following the steps below, I am able to get iPhoto to see my iPhone 4 and its contents for ONE TIME ONLY. Then the process below must be repeated and the computer restarted before iPhone 4 media can be accessed in iPhoto again. It appears that you do not always need to restart the computer.

Quit iPhoto
Open Activity Monitor (Applications > Utilities > Activity Monitor.app)
In the search window at the top right, search for PTPCamera
Click on PTPCamera in the list of results to highlight it
Click on Quit Process (the red stopsign icon in the upper left of Activity Monitor)
Choose “Quit”
If you don’t already see “Image Capture Extension” in the list, search for it in the search box. Click on “Image Capture Extension” in the list of results to highlight it
Click on Quit Process (the red stopsign icon in the upper left of Activity Monitor)
Choose “Quit”
Go to Macintosh HD > System > Library > Image Capture > Devices and double click PTPCamera.app to open it back up.
Unplug and re-plug the iPhone 4. iPhoto should open, if you’ve set it to do so when a camera is plugged in. Otherwise, open it. You should see your media available for import from the iPhone 4 when you click on the iPhone 4 in the devices list.

	6.2
```
