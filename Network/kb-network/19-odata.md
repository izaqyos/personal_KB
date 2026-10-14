---
type: reference
title: odata
description: Section 18 of the legacy NetworkKB notes.
tags: [kb-network]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "Network/NetworkKB#18"
---

# odata

[↑ NetworkKB](/Network/kb-network/README.md)

## 18.1 Intro

```text
standard for RESTful APIs. 

Architecture
OData is a protocol for the creation and consumption of RESTful APIs. Thus, as common practices of REST, OData builds on HTTP, AtomPub, and JSON using URIs to address and access data feed resources.

Resource identification
OData uses URIs to identify resources. For every OData service whose service root is abbreviated as http://host/service/, the following fixed resources can be found:

The service document
The service document lists entity sets, functions, and singletons that can be retrieved. Clients can use the service document to navigate the model in a hypermedia-driven fashion.
The service document is available at http://host/service/.

The metadata document
The metadata document describes the types, sets, functions and actions understood by the OData service. Clients can use the metadata document to understand how to query and interact with entities in the service.
The metadata document is available at http://host/service/$metadata.

Dynamic resources
The URIs for the dynamic resources may be computed from the hypermedia information in the service document and metadata document.

Resource operation
OData uses the HTTP verbs to indicate the operations on the resources.
GET: Get the resource (a collection of entities, a single entity, a structural property, a navigation property, a stream, etc.).
POST: Create a new resource.
PUT: Update an existing resource by replacing it with a complete instance.
PATCH: Update an existing resource by replacing part of its properties with a partial instance.
DELETE: Remove the resource.

Resource representation
OData uses different formats for representing data and the data model. In OData protocol version 4.0, JSON format is the standard for representing data, with the Atom format still being in committee specification stage. For representing the data model, the Common Schema Definition Language (CSDL) is used, which defines an XML representation of the entity data model exposed by OData services.
A sample OData JSON data payload[edit]
A collection of products:
{
  "@odata.context": "http://services.odata.org/V4/OData/OData.svc/$metadata#Products",
  "value": [
    {
      "ID": 0,
      "Name": "Meat",
      "Description": "Red Meat",
      "ReleaseDate": "1992-01-01T00:00:00Z",
      "DiscontinuedDate": null,
      "Rating": 14,
      "Price": 2.5
    },
    {
      "ID": 1,
      "Name": "Milk",
      "Description": "Low fat milk",
      "ReleaseDate": "1995-10-01T00:00:00Z",
      "DiscontinuedDate": null,
      "Rating": 3,
      "Price": 3.5
    },
    ...
  ]
}
```

## 18.2 https://www.odata.org/getting-started/understand-odata-in-6-steps/

### 18.2.1 step 1, request all resources

```text
req:
GET https://services.odata.org/v4/TripPinServiceRW/People HTTP/1.1
OData-Version: 4.0
OData-MaxVersion: 4.0

node:
var http = require('http');
var serviceRoot = 'https://services.odata.org/v4/TripPinServiceRW/';
getURL(serviceRoot + 'People');
function getURL(url) {
    var body = '';
    http.get(url, function (response) {
        response.on('data', function (chunk) {
            body+=chunk;
        });
        response.on('end', function () {
            console.log(body);
        });
    }).on('error', function(e) {
        console.log('ERROR: ' + e.message);
    });
}

resp:
HTTP/1.1 200 OK
Content-Length: 1007
Content-Type: application/json; odata.metadata=minimal
OData-Version: 4.0
{
'@odata.context': 'https://services.odata.org/V4/(S(a2k31bgwiyejn2j2iiybvq4p))/TripPinServiceRW/$metadata#People',
'@odata.nextLink': 'https://services.odata.org/V4/(S(a2k31bgwiyejn2j2iiybvq4p))/TripPinServiceRW/People?%24skiptoken=8',
'value': [
    {
        '@odata.id': 'https://services.odata.org/V4/(S(a2k31bgwiyejn2j2iiybvq4p))/TripPinServiceRW/People('russellwhyte')',
        '@odata.etag': 'W/'08D1D5BD423E5158'',
        '@odata.editLink': 'https://services.odata.org/V4/(S(a2k31bgwiyejn2j2iiybvq4p))/TripPinServiceRW/People('russellwhyte')',
        'UserName': 'russellwhyte',
        'FirstName': 'Russell',
        'LastName': 'Whyte',
        'Emails': [
            'Russell@example.com',
            'Russell@contoso.com',
            null
        ],
        'AddressInfo': [
            {
'Address': '187 Suffolk Ln.',
'City': {
'CountryRegion': 'United States',
'Name': 'Boise',
'Region': 'ID'
}
            },
            null
        ],
        'Gender': 'Male',
        'Concurrency': 635524031272866200
    },
    {
        '@odata.id': 'https://services.odata.org/V4/(S(a2k31bgwiyejn2j2iiybvq4p))/TripPinServiceRW/People('scottketchum')',
        '@odata.etag': 'W/'08D1D5BD423E5158'',
        '@odata.editLink': 'https://services.odata.org/V4/(S(a2k31bgwiyejn2j2iiybvq4p))/TripPinServiceRW/People('scottketchum')',
        'UserName': 'scottketchum',
        'FirstName': 'Scott',
        'LastName': 'Ketchum',
        'Emails': [
            'Scott@example.com'
        ],
        'AddressInfo': [
            {
'Address': '2817 Milton Dr.',
'City': {
'CountryRegion': 'United States',
'Name': 'Albuquerque',
'Region': 'NM'
}
            }
        ],
        'Gender': 'Male',
        'Concurrency': 635524031272866200
    },
    {
        '@odata.id': 'https://services.odata.org/V4/(S(a2k31bgwiyejn2j2iiybvq4p))/TripPinServiceRW/People('ronaldmundy')',
        '@odata.etag': 'W/'08D1D5BD423E5158'',
        '@odata.editLink': 'https://services.odata.org/V4/(S(a2k31bgwiyejn2j2iiybvq4p))/TripPinServiceRW/People('ronaldmundy')',
        'UserName': 'ronaldmundy',
        'FirstName': 'Ronald',
        'LastName': 'Mundy',
        'Emails': [
            'Ronald@example.com',
            'Ronald@contoso.com'
        ],
        'AddressInfo': [ ],
        'Gender': 'Male',
        'Concurrency': 635524031272866200
    },
    {
        '@odata.id': 'https://services.odata.org/V4/(S(a2k31bgwiyejn2j2iiybvq4p))/TripPinServiceRW/People('javieralfred')',
        '@odata.etag': 'W/'08D1D5BD423E5158'',
        '@odata.editLink': 'https://services.odata.org/V4/(S(a2k31bgwiyejn2j2iiybvq4p))/TripPinServiceRW/People('javieralfred')',
        'UserName': 'javieralfred',
        'FirstName': 'Javier',
        'LastName': 'Alfred',
        'Emails': [
            'Javier@example.com',
            'Javier@contoso.com'
        ],
        'AddressInfo': [
            {
'Address': '89 Jefferson Way Suite 2',
'City': {
'CountryRegion': 'United States',
'Name': 'Portland',
'Region': 'WA'
}
            }
        ],
        'Gender': 'Male',
        'Concurrency': 635524031272866200
    },
    {
        '@odata.id': 'https://services.odata.org/V4/(S(a2k31bgwiyejn2j2iiybvq4p))/TripPinServiceRW/People('willieashmore')',
        '@odata.etag': 'W/'08D1D5BD423E5158'',
        '@odata.editLink': 'https://services.odata.org/V4/(S(a2k31bgwiyejn2j2iiybvq4p))/TripPinServiceRW/People('willieashmore')',
        'UserName': 'willieashmore',
        'FirstName': 'Willie',
        'LastName': 'Ashmore',
        'Emails': [
            'Willie@example.com',
            'Willie@contoso.com'
        ],
        'AddressInfo': [ ],
        'Gender': 'Male',
        'Concurrency': 635524031272866200
    },
    {
        '@odata.id': 'https://services.odata.org/V4/(S(a2k31bgwiyejn2j2iiybvq4p))/TripPinServiceRW/People('vincentcalabrese')',
        '@odata.etag': 'W/'08D1D5BD423E5158'',
        '@odata.editLink': 'https://services.odata.org/V4/(S(a2k31bgwiyejn2j2iiybvq4p))/TripPinServiceRW/People('vincentcalabrese')',
        'UserName': 'vincentcalabrese',
        'FirstName': 'Vincent',
        'LastName': 'Calabrese',
        'Emails': [
            'Vincent@example.com',
            'Vincent@contoso.com'
        ],
        'AddressInfo': [
            {
'Address': '55 Grizzly Peak Rd.',
'City': {
'CountryRegion': 'United States',
'Name': 'Butte',
'Region': 'MT'
}
            }
        ],
        'Gender': 'Male',
        'Concurrency': 635524031272866200
    },
    {
        '@odata.id': 'https://services.odata.org/V4/(S(a2k31bgwiyejn2j2iiybvq4p))/TripPinServiceRW/People('clydeguess')',
        '@odata.etag': 'W/'08D1D5BD423E5158'',
        '@odata.editLink': 'https://services.odata.org/V4/(S(a2k31bgwiyejn2j2iiybvq4p))/TripPinServiceRW/People('clydeguess')',
        'UserName': 'clydeguess',
        'FirstName': 'Clyde',
        'LastName': 'Guess',
        'Emails': [
            'Clyde@example.com'
        ],
        'AddressInfo': [ ],
        'Gender': 'Male',
        'Concurrency': 635524031272866200
    },
    {
        '@odata.id': 'https://services.odata.org/V4/(S(a2k31bgwiyejn2j2iiybvq4p))/TripPinServiceRW/People('keithpinckney')',
        '@odata.etag': 'W/'08D1D5BD423E5158'',
        '@odata.editLink': 'https://services.odata.org/V4/(S(a2k31bgwiyejn2j2iiybvq4p))/TripPinServiceRW/People('keithpinckney')',
        'UserName': 'keithpinckney',
        'FirstName': 'Keith',
        'LastName': 'Pinckney',
        'Emails': [
            'Keith@example.com',
            'Keith@contoso.com'
        ],
        'AddressInfo': [ ],
        'Gender': 'Male',
        'Concurrency': 635524031272866200
    }
]
}
```

### 18.2.2 step 2 , Requesting an individual resource

```text
req:
GET https://services.odata.org/v4/TripPinServiceRW/People('russellwhyte') HTTP/1.1
OData-Version: 4.0
OData-MaxVersion: 4.0

node:

resp:
```

### 18.2.3 step 3

```text
    18.3
```
