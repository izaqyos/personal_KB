---
type: reference
title: Graphs
description: "Legacy Python KB section: Graphs (networkx, Tutorial, graphviz)"
tags: [graph, python, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "python/KB_python#38"
---

# Graphs

[↑ KB_python](/python/kb-python/README.md)

## 38.1 networkx

### 38.1.1 Tutorial

```text
$ /usr/local/bin/python
Python 2.7.6 (default, Sep 14 2014, 15:59:27) 
[GCC 4.2.1 Compatible Apple LLVM 5.1 (clang-503.0.40)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> import networkx as nx
>>> G=nx.Graph()
>>> G.add_node(1)
>>> G.add_nodes_from([2,3])
>>> G.add_edge(1,2)
>>> e=(2,3)
>>> G.add_edge(*e) # unpack edge tuple*
>>> G.number_of_nodes()
3
>>> G.number_of_edges()
2
>>> G.nodes()
[1, 2, 3]
>>> G.edges()
[(1, 2), (2, 3)]
>>> import matplotlib.pyplot as plt


		38.1.2   
		38.1.3   
		38.1.4   
		38.1.5   
		38.1.6   
		38.1.7   
		38.1.8   
		38.1.9   
		38.1.10  
		38.1.11  
		38.1.12  
		38.1.13  
		38.1.14  
		38.1.15  
		38.1.16  
		38.1.17  
		38.1.18  
		38.1.19  
		38.1.20  
		38.1.21  
		38.1.22  
		38.1.23  
		38.1.24  
		38.1.25  
		38.1.26  
		38.1.27  
		38.1.28  
		38.1.29  
		38.1.30  
		38.1.31  
		38.1.32  
		38.1.33  
		38.1.34  
		38.1.35  
		38.1.36  
		38.1.37  
		38.1.38  
		38.1.39  
		38.1.40  
		38.1.41  
```

## 38.2 graphviz

```text
    use w/o python
$ cat sharedContent.dot 
digraph d {
 Site1 [label="Site1" fillcolor=red shape=circle fontcolor=blue]
 Site2 [label="Site2" fillcolor=red shape=circle fontcolor=blue]
 Site3 [label="Site3" fillcolor=red shape=circle fontcolor=blue]
 SiteRef1 [label="Site-References1" fillcolor=red shape=ellipse fontcolor=blue]
 SiteRef2 [label="Site-References2" fillcolor=red shape=ellipse fontcolor=blue]
 SiteRef3 [label="Site-References3" fillcolor=red shape=ellipse fontcolor=blue]
 Role1 [label="Role1" fillcolor=red shape=ellipse fontcolor=red]
 Role2 [label="Role2" fillcolor=red shape=ellipse fontcolor=red]
 Catalog1 [label="Catalog1" fillcolor=red shape=ellipse fontcolor=green]
 Catalog2 [label="Catalog2" fillcolor=red shape=ellipse fontcolor=green]
 Group1 [label="Group1" fillcolor=red shape=ellipse fontcolor=green]
 Group2 [label="Group2" fillcolor=red shape=ellipse fontcolor=green]
 BussinessApp1 [label="BussinessApp1" fillcolor=red shape=ellipse fontcolor=red]
 BussinessApp2 [label="BussinessApp2" fillcolor=red shape=ellipse fontcolor=red]
 BussinessApp3 [label="BussinessApp3" fillcolor=red shape=ellipse fontcolor=red]
 BussinessApp4 [label="BussinessApp4" fillcolor=red shape=ellipse fontcolor=red]
 Site1 -> {SiteRef1} [style = dotted label="contextId"] 
 Site2 -> {SiteRef2} [style = dotted label="contextId"]
 Site3 -> {SiteRef3} [style = dotted label="contextId"]
 SiteRef1 -> {Role1} [label="relation"]
 SiteRef2 -> {Role1} [label="relation"]
 SiteRef3 -> {Role2} [label="relation"]
 Role1 -> {BussinessApp1} [label="relation"]
 Role1 -> {BussinessApp2} [label="relation"]
 Role2 -> {BussinessApp2} [label="relation"]
 Role2 -> {BussinessApp3} [label="relation"]
 Role2 -> {BussinessApp4} [label="relation"]
 Catalog1 -> {BussinessApp1} [label="relation"]
 Catalog1 -> {BussinessApp2} [label="relation"]
 Group2 -> {BussinessApp3} [label="relation"]
 Group2 -> {BussinessApp4} [label="relation"]
}

$ dot -T png -O sharedContent.dot  && open sharedContent.dot.png


	38.3  
	38.4  
	38.5  
	38.6  
	38.7  
	38.8  
	38.9  
	38.10 
	38.11 
	38.12 
	38.13 
	38.14 
	38.15 
	38.16 
	38.17 
	38.18 
	38.19 
	38.20 
	38.21 
	38.22 
	38.23 
	38.24 
	38.25 
	38.26 
	38.27 
	38.28 
	38.29 
	38.30 
	38.31 
```
