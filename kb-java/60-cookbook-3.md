---
type: reference
title: Cookbook
description: "Java cookbook: file reading and writing recipes and other tasks (duplicate copy of an earlier note)."
tags: [java, examples, howto, legacy]
generated: { by: "human:izaqyos", at: "2026-10-14T00:00:00Z" }
stale_after: "2028-10-14T00:00:00Z"
status: stable
capture_type: source
legacy_source: "java-kb#9"
sources:
  - { id: java-files, resource: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/nio/file/Files.html", title: "Java SE 21 API: java.nio.file.Files" }
  - { id: jep-400, resource: "https://openjdk.org/jeps/400", title: "JEP 400: UTF-8 by Default" }
---

# Cookbook

[↑ java-kb](/kb-java/README.md)

## 9.1 Files

### 9.1.1 read file content java

#### 9.1.1.1 Reading and writing text files

> Updated 2026-10 to current practice.[^java-files]

The original notes (JDK 1.4/1.5 era) used `FileReader`/`FileWriter`, `Scanner` and explicit `try { ... } finally { close(); }`. On a current JDK (11+, and the LTS releases 21 and 25) use `java.nio.file.Files` plus try-with-resources:[^java-files]

- **Small files:** `Files.readString(path)` / `Files.writeString(path, text)` (Java 11), or `Files.readAllLines(path)`.
- **Large files / line-by-line:** `Files.newBufferedReader(path)` or `Files.lines(path)` (a lazy `Stream<String>` - close it with try-with-resources).
- **Writing:** `Files.writeString` / `Files.newBufferedWriter` create or truncate the file by default (`CREATE`, `TRUNCATE_EXISTING`, `WRITE`); pass `StandardOpenOption.APPEND` to append.
- **Encoding:** all these `Files` methods default to UTF-8, and since JDK 18 the platform default charset is UTF-8 too (JEP 400), so `FileReader`/`FileWriter`/`Scanner` no longer silently use a locale-dependent encoding.[^jep-400] Pass a `Charset` explicitly (e.g. `StandardCharsets.ISO_8859_1`) only when the file is *not* UTF-8.
- **Closing:** try-with-resources closes everything (and flushes writers) even when an exception is thrown; no `finally` blocks needed. Buffering is built into `newBufferedReader`/`newBufferedWriter`.

Read and write a whole file, with an explicit encoding (replaces "Example 1" and "Example 2"):

```java
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;

public final class ReadWriteTextFile {

    private static final String FIXED_TEXT = "But soft! what code in yonder program breaks?";

    /** Usage: java ReadWriteTextFile <file> [encoding]  (default UTF-8) */
    public static void main(String... args) throws IOException {
        Path file = Path.of(args[0]);
        Charset cs = args.length > 1 ? Charset.forName(args[1]) : StandardCharsets.UTF_8;

        // write (creates or overwrites)
        Files.writeString(file, FIXED_TEXT + System.lineSeparator(), cs);

        // append
        Files.writeString(file, "appended line" + System.lineSeparator(), cs,
                StandardOpenOption.APPEND);

        // read everything
        String text = Files.readString(file, cs);
        System.out.println("Text read in: " + text);
    }
}
```

Process a (possibly large) file line by line, e.g. `name = value` pairs (replaces "Example 3", which used two `Scanner`s):

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.stream.Stream;

public final class ReadNameValuePairs {

    public static void main(String... args) throws IOException {
        Path file = Path.of(args[0]);

        // Option 1: BufferedReader + try-with-resources
        try (BufferedReader in = Files.newBufferedReader(file)) {
            String line;
            while ((line = in.readLine()) != null) {   // readLine() strips the newline
                processLine(line);
            }
        }

        // Option 2: lazy Stream<String>; must be closed, hence try-with-resources
        try (Stream<String> lines = Files.lines(file)) {
            lines.filter(l -> !l.isBlank()).forEach(ReadNameValuePairs::processLine);
        }
    }

    static void processLine(String line) {
        String[] parts = line.split("=", 2);
        if (parts.length == 2) {
            System.out.printf("Name is : '%s', and Value is : '%s'%n",
                    parts[0].strip(), parts[1].strip());
        } else {
            System.out.println("Empty or invalid line. Unable to process.");
        }
    }
}
```

With input lines like `height = 167cm`, `mass =  65kg`, `disposition =  "grumpy"` this prints:

```text
Name is : 'height', and Value is : '167cm'
Name is : 'mass', and Value is : '65kg'
Name is : 'disposition', and Value is : '"grumpy"'
```

Notes from the original that still apply: `readLine()` returns the line *without* the terminator, returns `""` for an empty line and `null` only at end of stream. `IOException` (including `NoSuchFileException`, the NIO counterpart of `FileNotFoundException`) is checked, so either declare it or handle it.

#### 9.1.1.2 BufferedReader

> Updated 2026-10 to current practice.[^java-files]

Print a file line by line. try-with-resources replaces the nested `finally { if (br != null) br.close(); }` dance:

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class SimpleFileReader {
    public static void main(String[] args) {
        try (BufferedReader br = Files.newBufferedReader(Path.of("license.txt"))) {
            String line;
            while ((line = br.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

### 9.1.2 Edit files

#### 9.1.2.1 Java – Edit File Example, Modify File java

> Updated 2026-10 to current practice.[^java-files]

To "edit" a text file in Java you read it, change the content in memory, and write it back. The old example used `StringBuffer.indexOf` + `replace` (and threw `StringIndexOutOfBoundsException` if the text was not found) and also dropped all line breaks. With `Files` it is a few lines; this replaces the first occurrence of each search string, like the original:

```java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class EditFileExample {
    public static void main(String[] args) throws IOException {
        Path f = Path.of("appendOldFile.txt");

        String content = Files.readString(f);
        content = content.replaceFirst("abc", "New Append text")       // regex; use
                         .replaceFirst("xyz", "Second new edit text"); // Pattern.quote() for literal text
        // content.replace("abc", "...") would replace ALL occurrences, literally

        Files.writeString(f, content);
    }
}
```

Input: `Content in this text, abc change xyz with new content by java io package`

Output: `Content in this text, New Append text change Second new edit text with new content by java io package`

For very large files, stream lines from `Files.newBufferedReader` into a temporary file with `Files.newBufferedWriter`, then `Files.move(tmp, f, StandardCopyOption.REPLACE_EXISTING, StandardCopyOption.ATOMIC_MOVE)`.

[^java-files]: Java SE 21 API: java.nio.file.Files
[^jep-400]: JEP 400: UTF-8 by Default
