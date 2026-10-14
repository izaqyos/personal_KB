---
type: reference
title: Server side programming
description: "Java server-side programming: servlet basic example with Eclipse (duplicate copy of an earlier note)."
tags: [java, backend, web, tutorial, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "java-kb#11"
---

# Server side programming

[↑ java-kb](/kb-java/README.md)

## 11.1 Servlet

### 11.1.1 Basic example & walkthrough

#### 11.1.1.1 Eclipse

```text
- DL + deploy Eclipse (I use "Luna")
- Run it -> New "dynamic web project" -> Name it, say "test"

- Copy Servlet.jar:
$ cp /usr/share/java/servlet.jar /ws/<user>-csi/workspace/test/WebContent/WEB-INF/lib/

-  Under Java Resources, src
default package create new servlet. say "myservlet.java"

code:

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class myservlet
 */
//@WebServlet("/myservlet")
public class myservlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * Default constructor. 
     */
    public myservlet() {
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
	      response.setContentType("text/html");

	      // Actual logic goes here.
	      PrintWriter out = response.getWriter();
	      out.println("{AD:\"AD1\"}");
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

}

This code handles get. Can add code to handle post.

-  Edit WEB-INF/lib/web.xml to include the servlet
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://java.sun.com/xml/ns/javaee" xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd" id="WebApp_ID" version="3.0">
  <display-name>test</display-name>
  <welcome-file-list>
    <welcome-file>index.html</welcome-file>
    <welcome-file>index.htm</welcome-file>
    <welcome-file>index.jsp</welcome-file>
    <welcome-file>default.html</welcome-file>
    <welcome-file>default.htm</welcome-file>
    <welcome-file>default.jsp</welcome-file>
  </welcome-file-list>




 <servlet>
        <servlet-name>myservlet</servlet-name>
        <servlet-class>myservlet</servlet-class>
    </servlet>

    <servlet-mapping>
        <servlet-name>myservlet</servlet-name>
        <url-pattern>/myservlet</url-pattern>
    </servlet-mapping>
</web-app>

- Add index.html w/ jquery javasript code:
<!DOCTYPE html>
<html>
<head>

<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js"></script>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>

<script type="text/javascript">
 
$(document).ready(function(){
 $("#msgid").html("This is Hello World by JQuery");
 
 
 $.ajax({
	   url: '  http://<internal-host>:8080/test/myservlet',
	   
		 
	   data: {
	        id: 123
	    },
	 
	    // whether this is a POST or GET request
	    type: "GET",
	 
	    // the type of data we expect back
	    dataType : "json",
	 
	    // code to run if the request succeeds;
	    // the response is passed to the function
	    success: function( json ) {
	    	 alert( json );
	    },
	 
	    // code to run if the request fails; the raw request and
	    // status codes are passed to the function
	    error: function( xhr, status, errorThrown ) {
	        alert( "Sorry, there was a problem!" );
	        
	    },
	 
	    // code to run regardless of success or failure
	    complete: function( xhr, status ) {
	        alert( "The request is complete!" );
	    }
 
});
});

</script>
 
This is Hello World by HTML
 
<div id="msgid">
</div>
 
 
</body>
</html>
			11.1.1.2

		11.1.2

	11.2
```
