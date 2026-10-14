---
type: reference
title: Pipelines
description: Section 2 of the legacy KB_python notes.
tags: [kb-python]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "python/KB_python#2"
---

# Pipelines:

[↑ KB_python](/python/kb-python/README.md)

````text
Pipelines in Scrapy are used for processing scraped items. They can perform tasks such as data validation, cleaning, or storing the items in a database. Let's create a pipeline that stores scraped quotes in a MongoDB database.

```python
# myproject/pipelines.py
from pymongo import MongoClient

class MongoDBPipeline:
    collection_name = 'quotes'

    def __init__(self, mongo_uri, mongo_db):
        self.mongo_uri = mongo_uri
        self.mongo_db = mongo_db

    @classmethod
    def from_crawler(cls, crawler):
        mongo_uri = crawler.settings.get('MONGO_URI')
        mongo_db = crawler.settings.get('MONGO_DATABASE')
        return cls(mongo_uri, mongo_db)

    def open_spider(self, spider):
        self.client = MongoClient(self.mongo_uri)
        self.db = self.client[self.mongo_db]

    def close_spider(self, spider):
        self.client.close()

    def process_item(self, item, spider):
        self.db[self.collection_name].insert_one(dict(item))
        return item
```
````
