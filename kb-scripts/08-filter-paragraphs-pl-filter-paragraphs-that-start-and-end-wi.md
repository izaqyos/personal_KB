---
type: reference
title: "filter_paragraphs.pl filter paragraphs that start and end with specific patterns, example"
description: "Perl script filter_paragraphs.pl for filtering paragraphs by start and end patterns, with example on logs."
tags: [perl, examples, debugging, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-scripts#8"
---

# filter_paragraphs.pl filter paragraphs that start and end with specific patterns, example:

[↑ kb-scripts](/kb-scripts/README.md)

```text
$ filter_paragraphs.pl NoClientHello.log "Incoming EAP Message"  PST_  > Client_messages
$ filter_paragraphs.pl NoClientHello.log "Tunneled Incoming Packet"  PST_  >> Client_messages
Will filter from ACS log files all packets that incoming from EAP-FAST client.
```
