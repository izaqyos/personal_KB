---
type: reference
title: "SAP JavaScript , SAPUI5"
description: Section 2 of the legacy javascript-kb notes.
tags: [kb-javascript]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "javascript-kb#2"
---

# SAP JavaScript , SAPUI5

[↑ javascript-kb](/kb-javascript/README.md)

## 2.1 Beginning

### 2.1.1 links

```text
<internal-url>
https://sapui5.hana.ondemand.com/#/topic
https://jsfiddle.net/93mx0yvt/505/
```

### 2.1.2 My tutorial

#### 2.1.2.1 Hello world SAP UI5 JS index.html

```text
r file://Users/<user>/work/code/javascript/SAP/tutorial/HelloWorld/index.html

<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta charset="utf-8">
	<title>Hello World App</title>
	<script src="https://sapui5.hana.ondemand.com/resources/sap-ui-core.js" 
		id="sap-ui-bootstrap"
		data-sap-ui-theme="sap_belize"
		data-sap-ui-libs="sap.m">
	</script>
        <script type="text/javascript">
		sap.ui.getCore().attachInit(function () {
			// create a mobile app and display page1 initially
			var app = new sap.m.App("myApp", {
				initialPage: "page1"
			});
// create the first page
			var page1 = new sap.m.Page("page1", {
				title : "Hello World",
				showNavButton : false,
				content : new sap.m.Button({
					text : "Go to Page 2",
					press : function () {
						// navigate to page2
						app.to("page2");
					}
				})
			});
			// create the second page with a back button
			var page2 = new sap.m.Page("page2", {
				title : "Hello Page 2",
				showNavButton : true,
				navButtonPress : function () {
					// go back to the previous page
					app.back();
				}
			});
			// add both pages to the app
			app.addPage(page1).addPage(page2);
			// place the app into the HTML document
			app.placeAt("content");
		});
	</script>
</head>
<body class="sapUiBody" id="content">
</body>
</html>

            2.1.2.2

        2.1.3
```

## 2.2 Debugging

### 2.2.1 Chrome

#### 2.2.1.1 MAC Chrome

```text
CMD+Option+j

              2.2.1.2

        2.2.2
```

## 2.3 Resources

### 2.3.1 tutorial

```text
https://sapui5.hana.ondemand.com/#/topic/8b49fc198bf04b2d9800fc37fecbb218
```

### 2.3.2 Icons library

```text
https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html#/overview/SAP-icons

        2.3.3
    2.4
```
