---
type: reference
title: NodeJS SSL
description: "Node.js certificate authorities: no built-in store, passing the ca option to https requests."
tags: [nodejs, ssl, certificates, faq, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "Network/sslKB#22"
---

# NodeJS SSL

[↑ sslKB](/Network/kb-ssl/README.md)

## 22.1 NodeJS certificate Authorities

### 22.1.1 https://stackoverflow.com/questions/21004645/where-is-nodes-certificate-store

```text
A1: 
There is not a store. You can pass a ca option to the https request to tell it what CAs you do trust.

From the docs:

The following options from tls.connect() can also be specified. However, a globalAgent silently ignores these.

ca: An authority certificate or array of authority certificates to check the remote host against.
In order to specify these options, use a custom Agent.

var options = {
  ...
  ca: CA or [array of CAs]
  ...
};

options.agent = new https.Agent(options);

var req = https.request(options, function(res) {
Ref: http://nodejs.org/api/https.html#https_https_request_options_callback

A2:
It seems that while there is no store, but there is a default list of CA's built into the source.

My search ultimately led me to the closest thing to a store, this file of CA's that node.js supports:

https://github.com/joyent/node/blob/master/src/node_root_certs.h

Thus, while it is true that it doesn't do a lookup on the system hosted CA's and that there is no "store" per se, there is a default list of CA's that it accepts.

As mentioned by @Joe and @damphat, you can add your own with the Agent.options.ca property, unfortunately that workaround isn't practical in my case.

        22.1.2

    22.2
23
```
