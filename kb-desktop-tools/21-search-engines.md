---
type: reference
title: Search engines
description: Section 23 of the legacy kb-desktop-tools notes.
tags: [kb-desktop-tools]
generated: { by: "human:izaqyos", at: "2026-10-14T11:12:50Z" }
status: stable
capture_type: source
legacy_source: "kb-desktop-tools#23"
---

# Search engines

[↑ kb-desktop-tools](/kb-desktop-tools/README.md)

## 23.1. Harddisk Search & Stats

## 23.2 Windows search

```text
http://www.microsoft.com/windows/products/winfamily/desktopsearch/default.mspx
```

### 23.2.1 Syntax

```text
Tips for narrowing your search
Microsoft Windows Search recognizes many advanced query operators that can help you to narrow your search. These are particularly useful when you're searching a large number of files.
Type this To find this 
granny Items containing granny, GRANNY, GrANnY, or any other combination of uppercase and lowercase letters. 
granny smith Items containing both granny and smith, but not necessarily in that order. 
granny NOT smith Items containing granny, but not smith. 
granny OR smith Items containing granny, smith, or both. 
"granny smith" Items containing the exact phrase granny smith. 
granny hasattachment:true Items that have attachments containing granny. 
granny isattachment:true Items that are attachments containing granny. 
granny date:yesterday Items containing granny whose date is yesterday.

Windows Search also recognizes the follow date values:

Relative dates: For example, today, tomorrow, yesterday 
Multi-word relative dates: For example, this week, next month, last week, past month, coming year 
Days: Sunday, Monday ... Saturday 
Months: January, February ... December 
 
author:granny Items created by someone whose name contains granny. 
author:"granny smith" Items created by granny smith. 
subject:"granny smith" Items whose subject contains the phrase granny smith. 
subject:granny smith Items with granny in the subject line and with smith anywhere else in the document. 

to:aaa email sent to aaa
from:aaa email sent from aaa
```

### 23.2.2 AQA, Advanced Query Syntax

```text
http://www.microsoft.com/windows/products/winfamily/desktopsearch/technicalresources/advquery.mspx

Property		Example			Function	
---------------------------------------------------------------------------------
author:name		author:patrick		Finds items with patrick in the author property.
author:(name)		author:(patrick hines)	Finds items with patrick in the Author property.
author:(name OR name)	author:(patrick OR bob) Finds items with patrick or bob in the Author property.
author:name name	author:patrick bob	Finds items with patrick in the Author property and bob anywhere in the document.
from:name		from:patrick		Finds items with patrick in either fromName OR fromAddress, since "from" is a property name for both fromName and fromAddress.
before:date		before:10/9/2007	Finds items whose PrimaryDate field contains a date before 10/9/2007.
after:date		after:10/9/2007		Finds items whose PrimaryDate field contains a date after 10/9/2007.
has:attachment		report has:attachment	Finds items containing the word report that have attachments. Same as hasattachment:true
is:attachment		report is:attachment	Finds items that have attachments containing the word report. Same as isattachment:true
```

### 23.2.3 Numbers and ranges

```text
To specify a date range, type the property followed by two dates. For example, type from:david sent:11/05/06..11/05/07. Windows Search recognizes all Windows date formats and also recognizes the following values:

    * Relative dates: Today, tomorrow, yesterday
    * Multi-word relative dates: week, next month, last week, past month, or coming year. The values can also be entered contracted, as follows: thisweek, nextmonth, lastweek, pastmonth, comingyear.
    * Days: Sunday, Monday ... Saturday
    * Months: January, February ... December
```

### 23.2.4 Size and date ranges

```text
Syntax			Results	
size:>50KB <70KB	Searches for files with a value in the Size between50 KB and 70 KB, excluding the end values.  
size:>=50KB <=70KB	Searches for files with a value in the Size property between 50 KB and 70 KB, including the end values.  
size:50KB..70KB		Same as size:>=50KB <=70KB 
date:>2/7/05<2/10/05	Searches for a date in the Date property between the values 2/7/05 and 2/10/05, excluding the end dates.
date:>=2/7/05<=2/10/05	Searches for a date in the Date property between the values 2/7/05 and 2/10/05, including the end dates.  
date:2/7/05 .. 2/10/05	Same as date:>=2/7/05<=2/10/05
	

Note: on Windows Vista and higher, search syntax supports dates in the user¿s current calendar. A query can use any of the formats defined in their Regional Options.
```

### 23.2.5 Common file properties

```text
The terms listed in the preceding table can be used with any of the following file properties. For example, to find e-mail from "patrick" that was sent in 2008, your query would look like this: kind:email author:patrick after:12/31/2007.

To restrict by file type	Use	Example	
Communications communications kind:communications
Contacts contacts kind:person
	person    kind:contacts
E-mail email kind:email
Instant Messenger conversations im kind:im
Meetings meetings kind:meetings
Tasks tasks kind:tasks
Notes notes kind:notes
Documents docs kind:docs
Music music kind:music
      song  kind:song
Pictures pics     kind:pics     
         pictures kind:pictures
Videos videos kind:videos
Folders folders kind:folders
Folder name foldername foldername:mydocs
Programs programs kind:programs
Recorded TV tv kind:tv
Link link kind:link
Journal entry journal kind:journal
```

### 23.2.6 To restrict by file store

```text
If you use multiple e-mail accounts and you want to limit a query to either Microsoft Office Outlook or Outlook Express, you can use the store: indicator to narrow your search scope.
	Store	Use	Example	
	Files file store:file
	Offline Files csc store:csc
	Outlook mapi store:mapi
	Outlook Express outlookexpress store:outlookexpress
```

### 23.2.7 Properties for file type: All

```text
Property	Use	Example	
Title title, subject, about title:manager
Status status status:active
Date date date:lastweek
Date modified datemodified, modified modified:lastweek
Importance importance, priority importance:high
Size size size:>50MB
Deleted deleted,isdeleted isdeleted:true
Is attachment isattachment isattachment:false
To to, toname to:johnsmith
Cc cc, ccname cc:david
Company company company:adventure-works
Category category category:business
Keywords keywords keywords:sports
Album album album:greatest
File name filename, file filename:2006hits
Genre genre genre:jazz
Author author, by author:david
Folder folder, under, path folder:adminstration
Ext ext, fileext ext:.rtf
Tags tag, keyword tag:personal
Type type type:image
```

### 23.2.8 Properties for file type: Contact

```text
	Property	Use	Example	
	Job title jobtitle jobtitle:manager
	IM address imaddress imaddress:luis@adventure-works.com
	Assistant's phone assistantsphone assistantsphone:555-1212
	Assistant name assistantname assistantname:roberto
	Profession profession profession:accountant
	Nickname nickname nickname:louis
	Spouse spouse spouse:susana
	Business city businesscity businesscity:redmond
	Business postal code businesspostalcode businesspostalcode:98052
	Business home page businesshomepage businesshomepage:www.adventure-works.com
	Callback phone number callbacknumber callbacknumber:882-8080
	Car phone carphone carphone:555-1212
	Children children children:anna
	First name firstname firstname:maria
	Last name lastname lastname
	Home fax homefax homefax:555-1212
	Manager's name manager manager:carlos
	Pager pager pager:882-8080
	Business phone businessphone businessphone:555-1212
	Home phone homephone homephone:555-1212
	Mobile phone mobilephone mobilephone:882-8080
	Office officelocation officelocation:red/101
	Anniversary anniversary anniversary:yesterday
	Birthday birthday birthday:tomorrow
```

### 23.2.9 Properties for file type: Communications (e-mail, appointments)

```text
	Property	Use	Example	
	From from, organizer from:simon
Received received, sent sent:yesterday
Subject subject, title subject:budget
Has attachment hasattachment, hasattachments hasattachment:true
Attachments attachments, attachment attachment:presentation.ppt
Bcc bcc, bccname bcc:michael
Bcc address bccaddress, bcc bccaddress:mike@contoso.com
Cc address ccaddress, cc ccaddress:mike@contoso.com
Follow-up flag flagstatus           flagstatus:unflagged
		flagstatus:followup flagstatus:completed

To address toaddress, to toaddress:mike@contoso.com
Due date duedate, due due:10/15/2008
Read read, isread isread:false
Is completed iscompleted iscompleted:true
Incomplete incomplete incomplete:true
Has flag hasflag, isflagged hasflag:false
Duration duration duration:>120
```

### 23.2.10 Properties for file type: Calendar

```text
	Property	Use	Example	
	Recurring isrecurring isrecurring:true
		recurring     recurring:true
	Organizer organizer, by, from organizer:jonas
	Location location location:calgary
```

### 23.2.11 Properties for file type: Documents

```text
	Property	Use	Example	
	Comments comments comments:excellent
	Last saved by lastsavedby lastsavedby:josh
	Document manager documentmanager documentmanager:jonas
	Revision number revisionnumber revisionnumber:4a
	Date last printed datelastprinted datelastprinted:yesterday
	Slide count slides slides:>20
```

### 23.2.12 Properties for file type: Music

```text
	Property	Use	Example	
	Bit rate bitrate bitrate:>150kbps
	Artist artist, by artist:U2
	Year year year:1977..1987
	Album album album:"greatest hits"
	Genre genre genre:rock
	Lyrics lyrics lyrics:"happy birthday to you"
	Track #, track track:12
	Year year year:>1980<1990
```

### 23.2.13 Properties for file type: Picture

```text
	Property	Use	Example	
	Camera make cameramake cameramake:nikon
	Camera model cameramodel cameramodel:eclipse
	Dimensions dimensions dimensions:8x10
	Orientation orientation orientation:landscape
	Date taken taken     taken:last
		   datetaken datetaken:6/12/2006
	Width width width:33
	Height height height:66
	Flash mode flashmode flashmode:no flash
```

### 23.2.14 Properties for file type: Recorded TV

```text
	Property	Use	Example	
	Broadcast date broadcastdate broadcastdate:2005
	Channel number channel channel:7
	Closed captioning closedcaptioning closedcaptioning:true
	Date released datereleased datereleased:2007
	Episode name episodename episodename:zeppo
```

### 23.2.15 Properties for file type: Video

```text
	Property	Use	Example	
	Name	name    name:vacation
		subject subject:hawaii 
	Ext Ext         ext:wma
	    filext      filext:wma
```

### 23.2.16 Favorite queries

```text
query					Result
name type:dir				find directory/ies named name
pattern from:name date:last month	find emails from name sent last month containing pattern
kind:pic size:1M..2M			find pictures of 1M <= size <= 2M
active directory *.doc			all the word documents containing words active directory

		23.2.17
```

## 23.3 lookup X1 professional

```text
from <internal-url> , 
```
