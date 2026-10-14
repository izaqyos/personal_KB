---
type: reference
title: Cookbook
description: "Java cookbook: file reading and writing recipes and other tasks (duplicate copy of an earlier note)."
tags: [java, examples, howto, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "java-kb#9"
---

# Cookbook

[↑ java-kb](/kb-java/README.md)

## 9.1 Files

### 9.1.1 read file content java

#### 9.1.1.1 Reading and writing text files

```text
When reading and writing text files :

    it's almost always a good idea to use buffering (default size is 8K)
    it's often possible to use references to abstract base classes, instead of references to specific concrete classes
    there is always a need to pay attention to exceptions (in particular, IOException and FileNotFoundException)

The close method :

    always needs to be called, or else resources will leak
    will automatically flush the stream, if necessary
    calling close on a "wrapper" stream will automatically call close on its underlying stream
    closing a stream a second time has no consequence
    when called on a Scanner, the close operation only works if the item passed to its constructor implements Closeable. Warning: if you pass a File to a Scanner, you will not be able to close it! Try using a FileReader instead. 

Commonly used items :

    Scanner - allows reading files in a compact way
    BufferedReader - readLine
    BufferedWriter - write + newLine

The FileReader and FileWriter classes are a bit tricky, since they implicitly use the system's default character encoding. If this default is not appropriate (for example, when reading an XML file which specifies its own encoding), the recommended alternatives are, for example :

FileInputStream fis = new FileInputStream("test.txt");
InputStreamReader in = new InputStreamReader(fis, "UTF-8");

FileOutputStream fos = new FileOutputStream("test.txt");
OutputStreamWriter out = new OutputStreamWriter(fos, "UTF-8");

Scanner scanner = new Scanner(file, "UTF-8");

Example 1

Here is a fairly compact example (for JDK 1.5) of reading and writing a text file, using an explicit encoding. If you remove all references to encoding from this class, it will still work -- the system's default encoding will simply be used instead.

import java.io.*;
import java.util.Scanner;

/** 
 Read and write a file using an explicit encoding.
 Removing the encoding from this code will simply cause the 
 system's default encoding to be used instead.  
*/
public final class ReadWriteTextFileWithEncoding {

  /** Requires two arguments - the file name, and the encoding to use.  */
  public static void main(String... aArgs) throws IOException {
    String fileName = aArgs[0];
    String encoding = aArgs[1];
    ReadWriteTextFileWithEncoding test = new ReadWriteTextFileWithEncoding(
      fileName, encoding
    );
    test.write();
    test.read();
  }
  
  /** Constructor. */
  ReadWriteTextFileWithEncoding(String aFileName, String aEncoding){
    fEncoding = aEncoding;
    fFileName = aFileName;
  }
  
  /** Write fixed content to the given file. */
  void write() throws IOException  {
    log("Writing to file named " + fFileName + ". Encoding: " + fEncoding);
    Writer out = new OutputStreamWriter(new FileOutputStream(fFileName), fEncoding);
    try {
      out.write(FIXED_TEXT);
    }
    finally {
      out.close();
    }
  }
  
  /** Read the contents of the given file. */
  void read() throws IOException {
    log("Reading from file.");
    StringBuilder text = new StringBuilder();
    String NL = System.getProperty("line.separator");
    Scanner scanner = new Scanner(new FileInputStream(fFileName), fEncoding);
    try {
      while (scanner.hasNextLine()){
        text.append(scanner.nextLine() + NL);
      }
    }
    finally{
      scanner.close();
    }
    log("Text read in: " + text);
  }
  
  // PRIVATE 
  private final String fFileName;
  private final String fEncoding;
  private final String FIXED_TEXT = "But soft! what code in yonder program breaks?";
  
  private void log(String aMessage){
    System.out.println(aMessage);
  }
}
 



Example 2

This example uses FileReader and FileWriter, which implicitly use the system's default encoding. To make this example compatible with JDK 1.4, just change StringBuilder to StringBuffer:

import java.io.*;

public class ReadWriteTextFile {

  /**
  * Fetch the entire contents of a text file, and return it in a String.
  * This style of implementation does not throw Exceptions to the caller.
  *
  * @param aFile is a file which already exists and can be read.
  */
  static public String getContents(File aFile) {
    //...checks on aFile are elided
    StringBuilder contents = new StringBuilder();
    
    try {
      //use buffering, reading one line at a time
      //FileReader always assumes default encoding is OK!
      BufferedReader input =  new BufferedReader(new FileReader(aFile));
      try {
        String line = null; //not declared within while loop
        /*
        * readLine is a bit quirky :
        * it returns the content of a line MINUS the newline.
        * it returns null only for the END of the stream.
        * it returns an empty String if two newlines appear in a row.
        */
        while (( line = input.readLine()) != null){
          contents.append(line);
          contents.append(System.getProperty("line.separator"));
        }
      }
      finally {
        input.close();
      }
    }
    catch (IOException ex){
      ex.printStackTrace();
    }
    
    return contents.toString();
  }

  /**
  * Change the contents of text file in its entirety, overwriting any
  * existing text.
  *
  * This style of implementation throws all exceptions to the caller.
  *
  * @param aFile is an existing file which can be written to.
  * @throws IllegalArgumentException if param does not comply.
  * @throws FileNotFoundException if the file does not exist.
  * @throws IOException if problem encountered during write.
  */
  static public void setContents(File aFile, String aContents)
                                 throws FileNotFoundException, IOException {
    if (aFile == null) {
      throw new IllegalArgumentException("File should not be null.");
    }
    if (!aFile.exists()) {
      throw new FileNotFoundException ("File does not exist: " + aFile);
    }
    if (!aFile.isFile()) {
      throw new IllegalArgumentException("Should not be a directory: " + aFile);
    }
    if (!aFile.canWrite()) {
      throw new IllegalArgumentException("File cannot be written: " + aFile);
    }

    //use buffering
    Writer output = new BufferedWriter(new FileWriter(aFile));
    try {
      //FileWriter always assumes default encoding is OK!
      output.write( aContents );
    }
    finally {
      output.close();
    }
  }

  /** Simple test harness.   */
  public static void main (String... aArguments) throws IOException {
    File testFile = new File("C:\\Temp\\blah.txt");
    System.out.println("Original file contents: " + getContents(testFile));
    setContents(testFile, "The content of this file has been overwritten...");
    System.out.println("New file contents: " + getContents(testFile));
  }
} 



Example 3

This example demonstrates using Scanner to read a file containing lines of structured data. Each line is then parsed using a second Scanner and a simple delimiter character, used to separate each line into a name-value pair. The Scanner class is used only for reading, not for writing.

import java.io.*;
import java.util.Scanner;

public class ReadWithScanner {

  public static void main(String... aArgs) throws FileNotFoundException {
    ReadWithScanner parser = new ReadWithScanner("C:\\Temp\\test.txt");
    parser.processLineByLine();
    log("Done.");
  }
  
  /**
   Constructor.
   @param aFileName full name of an existing, readable file.
  */
  public ReadWithScanner(String aFileName){
    fFile = new File(aFileName);  
  }
  
  /** Template method that calls {@link #processLine(String)}.  */
  public final void processLineByLine() throws FileNotFoundException {
    //Note that FileReader is used, not File, since File is not Closeable
    Scanner scanner = new Scanner(new FileReader(fFile));
    try {
      //first use a Scanner to get each line
      while ( scanner.hasNextLine() ){
        processLine( scanner.nextLine() );
      }
    }
    finally {
      //ensure the underlying stream is always closed
      //this only has any effect if the item passed to the Scanner
      //constructor implements Closeable (which it does in this case).
      scanner.close();
    }
  }
  
  /** 
   Overridable method for processing lines in different ways.
    
   <P>This simple default implementation expects simple name-value pairs, separated by an 
   '=' sign. Examples of valid input : 
   <tt>height = 167cm</tt>
   <tt>mass =  65kg</tt>
   <tt>disposition =  "grumpy"</tt>
   <tt>this is the name = this is the value</tt>
  */
  protected void processLine(String aLine){
    //use a second Scanner to parse the content of each line 
    Scanner scanner = new Scanner(aLine);
    scanner.useDelimiter("=");
    if ( scanner.hasNext() ){
      String name = scanner.next();
      String value = scanner.next();
      log("Name is : " + quote(name.trim()) + ", and Value is : " + quote(value.trim()) );
    }
    else {
      log("Empty or invalid line. Unable to process.");
    }
    //no need to call scanner.close(), since the source is a String
  }
  
  // PRIVATE 
  private final File fFile;
  
  private static void log(Object aObject){
    System.out.println(String.valueOf(aObject));
  }
  
  private String quote(String aText){
    String QUOTE = "'";
    return QUOTE + aText + QUOTE;
  }
} 



Example run of this class :

Name is : 'height', and Value is : '167cm'
Name is : 'mass', and Value is : '65kg'
Name is : 'disposition', and Value is : '"grumpy"'
Name is : 'this is the name', and Value is : 'this is the value'
Done.
```

#### 9.1.1.2 BufferedReader

```text
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class SimpleFileReader {
	public static void main(String[] args) {
		 
		BufferedReader br = null;
 
		try {
 
			String sCurrentLine;
 
			br = new BufferedReader(new FileReader("C:\\license"));
 
			while ((sCurrentLine = br.readLine()) != null) {
				System.out.println(sCurrentLine);
			}
 
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				if (br != null)br.close();
			} catch (IOException ex) {
				ex.printStackTrace();
			}
		}
 
	}
}
			9.1.1.3
```

### 9.1.2 Edit files

#### 9.1.2.1 Java – Edit File Example, Modify File java

```text
File can be appended by File class and other input output stream. To write content in a file in java we need to use java.io package. File class is used to create a file at specific path. We can use either StringBuffer for text and content to store in file. In java we can write file with FileWriter class with BufferedWriter class. write() method is used to create file and write the content in file.

To edit file in java we need to search text which replace with new text. indexOf() method will search text in java and append() method will modify old content in string.

This example will explain how to edit file in java and modify text in file by java.

text file in c drive

Content in this text, abc change xyz with new content by java io package

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;

public class JavaIOEditFileExample {

    public static void main(String[] args) {

        File f=new File("c:\\appendOldFile.txt");

        FileInputStream fs = null;
        InputStreamReader in = null;
        BufferedReader br = null;

        StringBuffer sb = new StringBuffer();

        String textinLine;

        try {
             fs = new FileInputStream(f);
             in = new InputStreamReader(fs);
             br = new BufferedReader(in);

            while(true)
            {
                textinLine=br.readLine();
                if(textinLine==null)
                    break;
                sb.append(textinLine);
            }
              String textToEdit1 = "abc";
              int cnt1 = sb.indexOf(textToEdit1);
              sb.replace(cnt1,cnt1+textToEdit1.length(),"New Append text");

              String textToEdit2 = "xyz";
              int cnt2 = sb.indexOf(textToEdit2);
              sb.replace(cnt2,cnt2+textToEdit2.length(),"Second new edit text");

              fs.close();
              in.close();
              br.close();

            } catch (FileNotFoundException e) {
              e.printStackTrace();
            } catch (IOException e) {
              e.printStackTrace();
            }

            try{
                FileWriter fstream = new FileWriter(f);
                BufferedWriter outobj = new BufferedWriter(fstream);
                outobj.write(sb.toString());
                outobj.close();

            }catch (Exception e){
              System.err.println("Error: " + e.getMessage());
            }
    }
}

Output

Content in this text, New Append text change Second new edit text with new content by java io package

			9.1.2.2

		9.1.3
	9.2
```
