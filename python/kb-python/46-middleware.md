---
type: reference
title: Middleware
description: Section 1 of the legacy KB_python notes.
tags: [kb-python]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "python/KB_python#1"
---

# Middleware:

[↑ KB_python](/python/kb-python/README.md)

````text
Middleware components in Scrapy are responsible for processing requests and responses. They can be used for various purposes such as handling user agents, logging, proxy rotation, or custom authentication. Let's create a middleware component that adds a custom user agent to each request.

```python
# myproject/middlewares.py
from scrapy import signals

class CustomUserAgentMiddleware:
    def __init__(self, user_agent):
        self.user_agent = user_agent

    @classmethod
    def from_crawler(cls, crawler):
        user_agent = crawler.settings.get('CUSTOM_USER_AGENT')
        return cls(user_agent)

    def process_request(self, request, spider):
        request.headers['User-Agent'] = self.user_agent
```
````
