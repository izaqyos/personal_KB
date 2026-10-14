---
type: reference
title: Diagrams
description: "Diagram notation notes, e.g. websequencediagrams sequence diagram examples."
tags: [architecture, reference, examples, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "general-kb#3"
---

# Diagrams

[↑ general-kb](/kb-general/README.md)

## 3.1 https://www.websequencediagrams.com/examples.html

### 3.1.1 examples

```text
Basic:


Browser->ActionServlet: Authentication Request
activate ActionServlet
note right of ActionServlet: Dispatches to custom actions.
ActionServlet-->Browser: Authentication Response 
deactivate ActionServlet

Browser->ActionServlet \nController: Authentication Request
activate ActionServlet \nController
note right of ActionServlet \nController: Dispatches to custom actions.
ActionServlet \nController-->Browser: Authentication Response 
deactivate ActionServlet \nController

entity User
entity Computer

Browser->ActionServlet: Authentication Request
activate ActionServlet
note right of ActionServlet: Dispatches to custom actions.
ActionServlet-->Browser: Authentication Response 
deactivate ActionServlet


Positive:

participant "Client Side \nSite Directory" as Client
participant "Semantic Service" as Semantic
participant "Activation Service" as Runtime
participant "CDM Store" as Store
Client->Semantic: DeleteSite (contextId, JWT token) 
Semantic->Runtime: Delete (tenantId, instanceId, siteId in token)
Runtime->Semantic: Delete OK
Semantic->Store: Delete (entityType site, entityId==ContextID)
Store->Store: Delete from DB all objects with this contextId
Store->Semantic: Delete OK
Semantic->Client: Delete OK
Client->Client: remove site from UI

Negative. RT error:

participant "Client Side \nSite Directory" as Client
participant "Semantic Service" as Semantic
participant "Activation Service" as Runtime
participant "CDM Store" as Store
Client->Semantic: DeleteSite (contextId, JWT token) 
Semantic->Runtime: Delete (tenantId, instanceId, siteId in token)
Runtime->Runtime: Delete error encountered
Runtime->Semantic: Delete Error
Semantic->Client: Delete Error
Client->Client: prompt user 

Negative: store error
participant "Client Side \nSite Directory" as Client
participant "Semantic Service" as Semantic
participant "Activation Service" as Runtime
participant "CDM Store" as Store
Client->Semantic: DeleteSite (contextId, JWT token) 
Semantic->Runtime: Delete (tenantId, instanceId, siteId in token)
Runtime->Semantic: Delete OK
Semantic->Store: Delete (entityType site, entityId==ContextID)
Store->Store: Delete error encountered
Store->Semantic: Delete Error
Semantic->Client: Delete Error
Client->Client: prompt user

advanced:
entity User
entity Computer

Browser->ActionServlet: Authentication Request
activate ActionServlet
note right of ActionServlet: Dispatches to custom actions.
ActionServlet-->Browser: Authentication Response 
deactivate ActionServlet

A->B: text

A-->B: text

alt text1
    A->B: text
else text2
    A->B: text
end

A->ref over B: input
    text
end ref -> A: output

note over A,B: text1
note left of A: text2
note right of A
    multiline
    text
end note

    3.2
```
