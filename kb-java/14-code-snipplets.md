---
type: reference
title: Code Snipplets
description: "Java code snippets, e.g. encoding with UTF-8 and UTF-16."
tags: [java, examples, tips, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "java-kb#8"
---

# Code Snipplets

[↑ java-kb](/kb-java/README.md)

## 8.1 Encoding, utf-8, utf-16

```text
import java.io.ByteArrayInputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;


public class EncodingTester {

	/**
	Name: 
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		String original = new String("A" + "\u00ea" + "\u00f1" + "\u00fc" + "C");
		System.out.println("UTF-16 string:"+original);
		
		try {
			byte[] utf8bytes = original.getBytes("UTF8");
			String utf8str = new String(utf8bytes, "UTF8");
			System.out.println("UTF-8 string:"+utf8str);
			
			InputStreamReader isr = new InputStreamReader(new ByteArrayInputStream(original.getBytes()));
			System.out.println("String enoding is:"+isr.getEncoding());
			isr = new InputStreamReader(new ByteArrayInputStream(utf8str.getBytes()));
			System.out.println("String enoding is:"+isr.getEncoding());
			
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		

	}

}

	8.2
```
