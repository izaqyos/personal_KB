---
type: primer
title: Bag-of-Words, TF-IDF and LDA — Classic Text Features
description: "Bag-of-words turns a document into a vector of word counts. TF-IDF reweights those counts so words common across the corpus count less and rare, distinctive words count more. LDA (Latent Dirichlet Allocation) is an unsupervised topic model over the same counts: each document is a mix of k topics and each topic is a distribution over words. Together they make a cheap, deterministic, explainable text-classification and drift-detection baseline that still beats or matches embeddings when labels are few."
resource: "https://www.jmlr.org/papers/volume3/blei03a/blei03a.pdf"
tags: [nlp, text-classification, tf-idf, topic-modeling, lda, scikit-learn, gensim]
generated: { by: "human:izaqyos", at: "2026-10-14T00:00:00Z" }
author: Yosi Izaq (compiled)
status: stable
capture_type: compiled
---

# Bag-of-Words, TF-IDF and LDA — Classic Text Features

> **Source:** Blei, Ng & Jordan, *Latent Dirichlet Allocation* (JMLR 2003) + scikit-learn and gensim docs + personal notes
> **Author:** Yosi Izaq (compiled)
> **Captured:** 2026-10-14
> **Status:** Active
> **Type:** compiled

---

## TL;DR

| | What it produces | Supervised? | Main use |
|---|---|---|---|
| **BoW** | count vector of size \|V\| per doc | no | raw features |
| **TF-IDF** | reweighted BoW vector (sparse) | no | features for linear classifiers, keyword search, baselines |
| **LDA** | k-dim topic mix per doc + top words per topic | no (unsupervised) | explainable topics, drift detection, extra features, cold start |

Pipeline: `text → tokens → BoW counts → (TF-IDF → linear model)` and `BoW counts → LDA → topic mix`.

---

## Table of Contents

- [Bag-of-Words (BoW)](#bag-of-words-bow)
- [TF-IDF](#tf-idf)
- [LDA — Latent Dirichlet Allocation](#lda--latent-dirichlet-allocation)
- [Code](#code)
- [Applied Example: Tiered Ticket / Bug Triage](#applied-example-tiered-ticket--bug-triage)
- [When to Use vs Embeddings](#when-to-use-vs-embeddings)
- [Interview Q&A](#interview-qa)
- [See Also](#see-also)

---

## Bag-of-Words (BoW)

- Build a vocabulary `V` from the corpus. Each document becomes a vector `x ∈ ℕ^|V|`, where `x[w]` = how many times word `w` appears.
- **Order is thrown away** ("dog bites man" = "man bites dog"). n-grams (1–2 or 1–3) recover a little local order.
- Vectors are huge and sparse (|V| = 10k–1M), stored as CSR sparse matrices.
- Preprocessing decides quality: lowercasing, tokenization, stop-word removal, stemming/lemmatization, `min_df` / `max_df` cutoffs.
- **Character n-grams** (`analyzer="char_wb"`, 3–5) handle typos, log tokens, error codes, and identifiers like `ERR_CONN_RESET` that word tokenizers split badly.
- **Hashing trick** (`HashingVectorizer`): hash words to a fixed-size space with no vocabulary to store. Good for streaming; you lose the inverse mapping (no "which word was this?").

Toy example, V = [cat, dog, sat, mat]:

```
"the cat sat on the mat"  → [1, 0, 1, 1]
"the dog sat"             → [0, 1, 1, 0]
```

---

## TF-IDF

Weight each count by how distinctive the word is across the corpus:

```
tfidf(t, d) = tf(t, d) · idf(t)
idf(t)      = log( N / df(t) )                 # textbook form
idf(t)      = ln( (1 + N) / (1 + df(t)) ) + 1  # scikit-learn default (smooth_idf=True)
```

- `tf(t, d)`: count of term `t` in doc `d` (or `1 + log(count)` with `sublinear_tf=True`, which damps repeated words).
- `df(t)`: number of docs containing `t`. `N`: number of docs.
- A word in every doc (`the`, or `steps to reproduce` in bug templates) gets idf ≈ 0 (textbook) or the minimum (sklearn) → it barely counts.
- Rows are then **L2-normalized**, so a dot product between two rows is their **cosine similarity**. That makes TF-IDF a solid keyword-retrieval baseline (BM25 is its tuned cousin, adding tf saturation and doc-length normalization).

Why it works with linear models: the features are high-dimensional and sparse, classes are often close to linearly separable in that space, and logistic regression / linear SVM train in seconds and give per-word weights you can read.

**Limits:** no semantics (`car` ≠ `automobile`), no word order beyond n-grams, vocabulary fixed at fit time (new words are ignored until you refit).

---

## LDA — Latent Dirichlet Allocation

A **generative** probabilistic topic model. (Not to be confused with *Linear Discriminant Analysis*, the supervised dimensionality-reduction method that shares the acronym.)

### Generative story

For `k` topics, with Dirichlet priors `α` (doc–topic) and `β` / `η` (topic–word):

1. For each topic `z`: draw a word distribution `φ_z ~ Dir(β)`.
2. For each document `d`: draw a topic mix `θ_d ~ Dir(α)`.
3. For each word slot in `d`: draw a topic `z ~ Cat(θ_d)`, then a word `w ~ Cat(φ_z)`.

Inference runs this in reverse: given only the words, estimate `θ_d` (what each doc is about) and `φ_z` (what each topic means). Exact inference is intractable; use **variational Bayes** (sklearn, gensim, online/minibatch) or **collapsed Gibbs sampling** (MALLET).

### Intuition for the priors

- Small `α` (< 1) → each doc uses **few** topics. Small `β` → each topic uses **few** words. Both make topics sharper and easier to read.
- `k` is a hyperparameter. Choose it with **topic coherence** (`c_v`, `u_mass`) plus a human reading the top words. Perplexity often keeps improving as `k` grows while topics get worse to read, so don't pick `k` by perplexity alone.

### What you get

- Per doc: `θ_d`, a k-dim probability vector → use it as dense features, or for clustering.
- Per topic: top-N words → human-readable labels ("certificate, saml, rotation, 401" = auth/cert issues).

### Practical gotchas

- Feed **raw counts (BoW)**, not TF-IDF. LDA's model assumes integer word counts.
- Aggressive stop lists matter a lot, including domain boilerplate (template headings, signatures, log prefixes). Otherwise a topic gets wasted on them.
- Short texts (tweets, titles) give weak topics. Concatenate, or use a short-text model / embeddings.
- Results vary between runs. Fix `random_state` and check topic stability.

---

## Code

```python
from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.calibration import CalibratedClassifierCV
from sklearn.decomposition import LatentDirichletAllocation
from sklearn.pipeline import make_pipeline, make_union

# TF-IDF: word 1-2 grams + char n-grams → calibrated linear classifier
tfidf = make_union(
    TfidfVectorizer(ngram_range=(1, 2), min_df=2, max_df=0.9, sublinear_tf=True),
    TfidfVectorizer(analyzer="char_wb", ngram_range=(3, 5), min_df=3),
)
clf = make_pipeline(tfidf, CalibratedClassifierCV(LogisticRegression(max_iter=2000), method="isotonic"))
clf.fit(train_texts, train_labels)
proba = clf.predict_proba(new_texts)          # calibrated → thresholds mean something

# LDA on raw counts
cv = CountVectorizer(stop_words="english", min_df=5, max_df=0.5)
X = cv.fit_transform(corpus)
lda = LatentDirichletAllocation(n_components=30, learning_method="online", random_state=0)
theta = lda.fit_transform(X)                  # doc-topic mix, shape (n_docs, 30)

vocab = cv.get_feature_names_out()
for z, row in enumerate(lda.components_):
    print(z, [vocab[i] for i in row.argsort()[-8:][::-1]])
```

gensim variant (gives coherence scoring for choosing `k`):

```python
from gensim.corpora import Dictionary
from gensim.models import LdaModel, CoherenceModel

dic = Dictionary(tokenized_docs); dic.filter_extremes(no_below=5, no_above=0.5)
bow = [dic.doc2bow(d) for d in tokenized_docs]
lda = LdaModel(bow, id2word=dic, num_topics=30, passes=10, random_state=0)
CoherenceModel(model=lda, texts=tokenized_docs, dictionary=dic, coherence="c_v").get_coherence()
```

---

## Applied Example: Tiered Ticket / Bug Triage

A common production design uses these as **Stage 1** of a tiered classifier, with an LLM only for what Stage 1 can't handle:

1. **Normalize and dedupe**: canonicalize stack traces into a signature hash. Exact-hash and near-duplicate matches are linked, not triaged again.
2. **Stage 1 (classical, no LLM cost):** BoW → TF-IDF (word + char n-grams) → logistic regression / linear SVM, one per output head (component, severity, owner). LDA topic mix (k ≈ 20–50) is added as extra features.
3. **Calibrate** (Platt / isotonic) so the confidence is a real probability.
4. **Confidence router:** high top-1 with a large margin → accept cheaply. Otherwise escalate to an LLM / expert stage. Tune the threshold on a held-out set to keep a precision target (e.g. ≥ 97%) on the cheap path.

What LDA adds in this setting:

- **Explainability:** "classified as auth because topic 7 (certificate, saml, rotation, 401) dominates".
- **Drift / emerging-issue detection:** track the topic mix per week. A topic growing fast signals a new regression before classifier accuracy drops.
- **Cold start:** unsupervised, so it's useful before many labels exist.

---

## When to Use vs Embeddings

| Prefer TF-IDF / LDA | Prefer embeddings (+ BERTopic, kNN, fine-tuned encoders) |
|---|---|
| Few labels, need a strong baseline fast | Semantics / synonyms matter (`car` vs `automobile`) |
| Exact tokens carry the signal (error codes, product names, logs) | Short, paraphrase-heavy text |
| Need determinism, explainability, CPU-only, ms latency | Multilingual corpora |
| Cost-sensitive high-volume first stage | You can afford GPU / API inference |

In practice: **A/B them rather than assume.** Hybrid retrieval (BM25/TF-IDF + dense) usually beats either alone, and TF-IDF is the baseline any embedding system should be measured against.

---

## Interview Q&A

| Q | A |
|---|---|
| Why TF-IDF in 2026? | Fast, cheap, deterministic, explainable, strong with few labels; exact-token signals (codes, IDs) that embeddings blur. It's the baseline you must beat. |
| BoW vs TF-IDF? | BoW = raw counts; TF-IDF downweights corpus-wide common terms so distinctive words dominate. |
| Why L2-normalize TF-IDF rows? | Removes doc-length bias; dot product becomes cosine similarity. |
| TF-IDF into LDA? | No. LDA models integer word counts. Feed BoW. |
| How to pick k for LDA? | Coherence (`c_v`) sweep + human reading of top words; check stability across seeds. Not perplexity alone. |
| LDA limits? | Ignores order, needs k tuning, weak on short texts, sensitive to stop lists, unstable across runs. |
| Modern alternative to LDA? | BERTopic: sentence embeddings → UMAP → HDBSCAN clusters → c-TF-IDF for topic words. |
| LDA vs Linear Discriminant Analysis? | Same acronym. Latent Dirichlet = unsupervised topic model; Linear Discriminant = supervised projection maximizing class separation. |
| Cold start for a classifier? | LDA topics + retrieval over existing history + human review of everything at first; the review loop creates labels. |

---

## See Also

- [Master learning roadmap — Track C: ML Models (LDA, BERT)](/learning/master-learning-roadmap.md)
- [Learning pillars](/learning/PILLARS.md)
- [Agentic learning curriculum](/ml-and-ai/agentic/agentic-learning-curriculum.md)
- [Local LLMs 2026 — Novel Architectures](/ml-and-ai/llm-kb/local-llms-2026-novel-architectures.md)
