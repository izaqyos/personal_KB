---
type: reference
title: my scripts
description: Section 53 of the legacy KB_python notes.
tags: [kb-python, scripts, tools]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "python/KB_python#53"
---

# my scripts, tags: scripts, tools

[↑ KB_python](/python/kb-python/README.md)

## 53.1 tocify.py

```text
$ cat tocify.py | pbcopy 
<url:~/work/scripts/python/util/tocify.py>
#!/usr/bin/python3


# Description, create TOC for my kb files.
# Their format is (example):
# start new section                      ****************
# section number                         1. section1
# subsections                                   1.1 subsection1_1
#                                                             1.2 subsection1_2
#                                                             1.2.1 subsubsection 1_2_1
# end section                                   ****************

# Author Yosi Izaq

#Note that since most of the KB files are in the following format:
# 1. subject
# 1.1 example1
# 1.2 example2.
# ...
# 
# It makes more sense to build a TOC only based on the subjects. So for now that's what the script does.

# Future ideas.
# 1. update flag, remove old TOC and create a new one.
# 2. support multiple nesting levels.  with correct indentation.

import optparse
import re
import os

def tocify(filename, embed_util_links=True):
    toc_pref = ".........................................Table Of Contents...............................................................";
    toc_pref_re = '^.*\.\.Table Of Contents\.\..*$'
    toc_suff  = ".................................................END TOC..............................................";
    toc_suff_re = '^.*\.\.END TOC\.\..*$'

    newlines = [toc_pref+os.linesep]
    old_toc_detected = False
    old_toc_start, old_toc_end = -1, -1
    newtoc = []
    with open(filename, "r+") as infile:
        filelines = infile.readlines()
        for i, line in enumerate(filelines):
            #print(f"scanning line {line}")
            #remove non utf8 characters
            #line = bytes(line, 'utf-8').decode('utf-8', 'ignore')
            if old_toc_end == -1 and re.match(toc_pref_re, line):
                #print('Found old ToC start at line', i)
                old_toc_detected = True
                old_toc_start = i
            elif re.match(toc_suff_re, line):
                #print('Found old ToC end at line', i)
                if old_toc_detected:
                    old_toc_detected = False
                    old_toc_end = i
            else:
                if not old_toc_detected:
                    #print(f"Found content line {i}")
                    matches = re.match('^(\s)*(\d+\.)+', line)
                    if matches:
                        #remove non utf8 characters
                        normazlized_line = bytes(line, 'utf-8').decode('utf-8', 'ignore')
                        normazlized_line = normazlized_line.rstrip()
                        #print(f"Found header line {i}:{normazlized_line}")
                        if embed_util_links:
                            newtoc.append(f"{normazlized_line} <URL:#tn={normazlized_line}>{os.linesep}")
                        else:
                            newtoc.append(normazlized_line+os.linesep)

        filelines = filelines[:old_toc_start]+filelines[old_toc_end+1:]
        newtoc.append(toc_suff+os.linesep)
        #insert new toc at 0
        newlines = newlines+newtoc  
        outputlines = newlines+filelines
        infile.seek(0)
        infile.writelines(outputlines)
        infile.truncate()

    #    #write back to file
    #with open(filename, 'w') outfile:
    #    outfile.writelines(outputlines)
    


def main():
    parser = optparse.OptionParser()
    parser.add_option('-f', '--filename', action="store", dest="filename", help="file for which to create ToC")
    options, args = parser.parse_args()
    filename = options.filename
    if not filename:
        print('Please provide a file name')
        exit(0)
    print('Creating ToC for file', filename)
    tocify(filename)

if __name__ == "__main__":
    main()
```

## 53.2 pdf to text

```text
    based on: https://apple.stackexchange.com/questions/2487/how-to-convert-a-pdf-file-into-a-text-file
   $ cat  pdf2txt.py 
#!/usr/local/bin/python3
# coding: utf-8

import os, sys

#To install Quartz, $pip3 install pyobjc-framework-Quartz
from Quartz import PDFDocument
from CoreFoundation import (NSURL, NSString)
NSUTF8StringEncoding = 4

def pdf2txt(printToScreen=True):
    for filename in sys.argv[1:]:   
        inputfile =filename
        shortName = os.path.splitext(filename)[0]
        outputfile = shortName+".txt"
        print(inputfile, shortName)
        pdfURL = NSURL.fileURLWithPath_(inputfile)
        pdfDoc = PDFDocument.alloc().initWithURL_(pdfURL)
        if pdfDoc :
            pdfString = NSString.stringWithString_(pdfDoc.string())
            pdfString.writeToFile_atomically_encoding_error_(outputfile, True, NSUTF8StringEncoding, None)
        if printToScreen:
            print(outputfile)
            with open(outputfile, 'r') as output:
                lines = output.readlines()
                print(lines)

if __name__ == "__main__":
    pdf2txt(True) 
    53.3
```
