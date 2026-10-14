---
type: reference
title: "Querying Indexed Data : Whoosh"
description: "Legacy Python KB section: Querying Indexed Data : Whoosh"
tags: [python, legacy, reference]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "python/KB_python#2"
---

# Querying Indexed Data : Whoosh

[↑ KB_python](/python/kb-python/README.md)

```text
Querying a indexed data has two important parts which you may like to look upon.

Query String : It is passed while searching the indexed data. Query string can be a single word, a single sentence to be matched exactly, multiple words with ‘AND’, multiple words with ‘OR’ etc. For examples –

Query : politics (returns if the word occurs)Query : sports OR games OR play (returns if any one of the strings occur)
Query : alpha beta gamma (return if a document contains all strings)
Query : “alpha beta gamma“ (returns if all strings occur together in a document).

Scoring : Each document is ranked according to a scoring function. There are quite a few types of scoring function supported by whoosh.

Frequency : It simply returns the count of the terms occurred in the document. It does not perform any normalization or weighting.
Tf-Idf scores : It returns tf * idf scores of each document. To know more read here or wiki page here.
BM25F scoring : It is the by default ranking function used by whoosh. BM stands for best matching. It is based on tf-idf along with bunch of factors like length of document in words, average length of documents in the collection. It also has free parameters k = 1.2 and b = 0.75. To read more check here.
Cosine scoring : It is useful for finding document similar to your search query.
There are few more scoring algorithms which has been implemented. Check here to know more.

Below is the python implementation for searching a query in the indexed database.

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
from whoosh.qparser import QueryParser
from whoosh import scoring
from whoosh.index import open_dir
 
ix = open_dir("indexdir")
 
# query_str is query string
query_str = sys.argv[1]
# Top 'n' documents as result
topN = int(sys.argv[2])
 
with ix.searcher(weighting=scoring.Frequency) as searcher:
    query = QueryParser("content", ix.schema).parse(query_str)
results = searcher.search(query,limit=topN)
for i in range(topN):
    print(results[i]['title'], str(results[i].score), results[i]['textdata'])
QueryParser class of whoosh implements query language very similar to java Lucene’s.
```
