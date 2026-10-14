---
type: reference
title: FAQ
description: Section 4 of the legacy javascript-kb notes.
tags: [kb-javascript, json, schema]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "javascript-kb#4"
---

# FAQ

[↑ javascript-kb](/kb-javascript/README.md)

## 4.1 JSON, tags: JSON, schema

### 4.1.1 Parsing JSON string in Java

```text
need to include the full org.json library when running as android.jar only contains stubs to compile against.

In addition, you must remove the two instances of extra } in your JSON data following longitude.

   private final static String JSON_DATA =
     "{" 
   + "  \"geodata\": [" 
   + "    {" 
   + "      \"id\": \"1\"," 
   + "      \"name\": \"Julie Sherman\","                  
   + "      \"gender\" : \"female\"," 
   + "      \"latitude\" : \"37.33774833333334\"," 
   + "      \"longitude\" : \"-121.88670166666667\""
   + "    }," 
   + "    {" 
   + "      \"id\": \"2\"," 
   + "      \"name\": \"Johnny Depp\","          
   + "      \"gender\" : \"male\"," 
   + "      \"latitude\" : \"37.336453\"," 
   + "      \"longitude\" : \"-121.884985\""
   + "    }" 
   + "  ]" 
   + "}"; 
Apart from that, geodata is in fact not a JSONObject but a JSONArray.

Here is the fully working and tested corrected code:

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class ShowActivity {


  private final static String JSON_DATA =
     "{" 
   + "  \"geodata\": [" 
   + "    {" 
   + "      \"id\": \"1\"," 
   + "      \"name\": \"Julie Sherman\","                  
   + "      \"gender\" : \"female\"," 
   + "      \"latitude\" : \"37.33774833333334\"," 
   + "      \"longitude\" : \"-121.88670166666667\""
   + "    }," 
   + "    {" 
   + "      \"id\": \"2\"," 
   + "      \"name\": \"Johnny Depp\","          
   + "      \"gender\" : \"male\"," 
   + "      \"latitude\" : \"37.336453\"," 
   + "      \"longitude\" : \"-121.884985\""
   + "    }" 
   + "  ]" 
   + "}"; 

  public static void main(final String[] argv) throws JSONException {
    final JSONObject obj = new JSONObject(JSON_DATA);
    final JSONArray geodata = obj.getJSONArray("geodata");
    final int n = geodata.length();
    for (int i = 0; i < n; ++i) {
      final JSONObject person = geodata.getJSONObject(i);
      System.out.println(person.getInt("id"));
      System.out.println(person.getString("name"));
      System.out.println(person.getString("gender"));
      System.out.println(person.getDouble("latitude"));
      System.out.println(person.getDouble("longitude"));
    }
  }
}
Here's the output:

|C:\dev\scrap>java -cp json.jar;. ShowActivity
|1
|Julie Sherman
|female
|37.33774833333334
|-121.88670166666667
|2
|Johnny Depp
|male
|37.336453
|-121.884985
```

### 4.1.2 How do I pull the string array from this json object?

```text
 trying to get a list of available numbers from the following json object, using the class from org.json

    {
        "response":true,
        "state":1,
        "data":
        {
            "CALLERID":"81101099",
            "numbers":
                [
                       "21344111","21772917",
                       "28511113","29274472",
                       "29843999","29845591",
                       "30870001","30870089",
                       "30870090","30870091"
                ]
        }
    }

use:
jsonObj = new JSONObject(response);
jsonData = jsonObj.optJSONObject("data");
JSONArray jsonArr= jsonObj.getJSONArray("numbers");
String[] arr=new String[arrJson.lLength()];
for(int i=0;i<arrJson.length();i++)
    arr[i]=arrJson.get(i);

		4.1.3
	4.2    JSON Schema

	    4.2.1    Chatgpt json Schema questios

	        4.2.1.1    Q. explain about example property in json shcema
A.  In JSON Schema, the "example" property is used to provide an example value for a particular JSON Schema. This property is intended to demonstrate what the JSON data that conforms to the schema would look like.

For example, let's say we have a schema that describes a person object with properties like name, age, and email. We can provide an example object that conforms to this schema by using the "example" property as follows:

perl
Copy code
{
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "age": { "type": "integer" },
    "email": { "type": "string", "format": "email" }
  },
  "example": {
    "name": "John Doe",
    "age": 30,
    "email": "johndoe@example.com"
  }
}
In this example, the "example" property provides a sample object that adheres to the schema. It shows that the person object should have a name of "John Doe", an age of 30, and an email address of "johndoe@example.com".

Providing an example object can be helpful for both humans and machines in understanding how to use the schema correctly. It can also help with testing and validating the schema.

	    4.2.2

	4.3   
	4.4   
	4.5   
	4.6   
	4.7   
	4.8   
	4.9   
	4.10  
	4.11  
	4.12  
	4.13  
	4.14  
	4.15  
	4.16  
	4.17  
	4.18  
	4.19  
	4.20  
	4.21  
	4.22  
	4.23  
	4.24  
	4.25  
	4.26  
	4.27  
	4.28  
	4.29  
	4.30  
	4.31  
	4.32  
	4.33  
	4.34  
	4.35  
	4.36  
	4.37  
	4.38  
	4.39  
	4.40  
	4.41  
	4.42  
	4.43  
	4.44  
	4.45  
	4.46  
	4.47  
	4.48  
	4.49  
	4.50  
	4.51  
	4.52  
	4.53  
	4.54  
	4.55  
	4.56  
	4.57  
	4.58  
	4.59  
	4.60  
	4.61  
	4.62  
	4.63  
	4.64  
	4.65  
	4.66  
	4.67  
	4.68  
	4.69  
	4.70  
	4.71  
	4.72  
	4.73  
	4.74  
	4.75  
	4.76  
	4.77  
	4.78  
	4.79  
	4.80  
	4.81  
	4.82  
	4.83  
	4.84  
	4.85  
	4.86  
	4.87  
	4.88  
	4.89  
	4.90  
	4.91  
	4.92  
	4.93  
	4.94  
	4.95  
	4.96  
	4.97  
	4.98  
	4.99  
	4.100 
	4.101 
```
