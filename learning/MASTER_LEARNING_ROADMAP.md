# Master Learning Roadmap

> Single source of truth for all personal learning. Updated: 2026-03-23

---

## Dashboard

| Pri | Track | Focus | Status | Progress | Current Cycle Week |
|:---:|-------|-------|--------|----------|--------------------|
| 1 | [Udemy -- AI & Bedrock](#track-a-udemy-courses--ai--bedrock-focus) | Courses | In Progress | 1/12 courses done-ish (Claude Code 76%) | Weeks 1-2 |
| 2 | [LeetCode](#track-b-leetcode) | Interview Prep | Not Started | notes exist, no active schedule | Week 3 |
| 3 | [ML Models](#track-c-ml-models--lda-bert-and-beyond) | LDA, BERT, Transformers | Not Started | NLP roadmap + 12-week plan ready | Weeks 4-5 |
| 4 | [Python Practice](#track-d-python-practice) | Idioms, Algorithms | Paused | Week 1 Day 2 / 48 weeks | Week 6 |
| 5 | [Other](#track-e-other-plans) | Rust, SysDes, Perf, Net | Mixed | Rust 3%, rest not started | Week 8 |

**Legend:** Not Started | In Progress | Paused | Complete

**Current round-robin position:** Cycle 1, Week 1 (start date: ____-__-__)

---

## Round-Robin Schedule

8-week repeating cycle. Adjust cadence as needed.

```
Week 1-2  -->  Track A : Udemy AI/Bedrock (~1 hr/day, video + labs)
Week 3    -->  Track B : LeetCode (1-2 problems/day)
Week 4-5  -->  Track C : ML models (NLP roadmap phases, hands-on builds)
Week 6    -->  Track D : Python practice (follow 48-week curriculum)
Week 7    -->  Track B : LeetCode (second pass)
Week 8    -->  Track E : Rotate (Rust / System Design / other)
                         -------- repeat --------
```

### How to Use This Schedule

1. At the start of each cycle, update **Current round-robin position** above.
2. During each focus week, use the detailed plan linked in the track section.
3. At the end of each cycle, update the progress column in the Dashboard.
4. When a Udemy course is finished, check it off and move to the next one.

---

## Track A: Udemy Courses -- AI & Bedrock Focus

Courses ordered by priority. Finish the nearly-done course first, then focus on AI/Bedrock, then breadth.

### Tier 1 -- Finish & AI/Bedrock (do these first)

| # | Course | Instructor | Status | Notes |
|---|--------|-----------|--------|-------|
| 1 | Claude Code - The Practical Guide | Academind (Maximilian Schwarzmuller) | 76% complete | Finish this first |
| 2 | Amazon Bedrock - Complete Guide to AWS Generative AI | Alex Dan, Bryan Krausen | Not Started | 200K+ enrollments, top priority |
| 3 | LLM Concepts Deep Dive: Conceptual Mastery for Developers | Koushik Kothagal (JavaBrains) | Not Started | Theory foundation for LLMs |
| 4 | The AI Engineer Course 2026: Complete AI Engineer Bootcamp | 365 Careers | Not Started | Broad AI engineering |
| 5 | Full-Stack AI Engineer 2026: ML, Deep Learning, GenerativeAI | School of AI | Not Started | ML + DL + GenAI stack |

### Tier 2 -- Data Science & ML Depth

| # | Course | Instructor | Status | Notes |
|---|--------|-----------|--------|-------|
| 6 | Complete Data Science, ML, DL, NLP Bootcamp | Krish Naik, KRISHAI | Not Started | Complements Track C (ML models) |
| 7 | Machine Learning for Absolute Beginners - Level 1 | Idan Gabrieli | Not Started | Beginner-friendly entry point |

### Tier 3 -- System Design & Other

| # | Course | Instructor | Status | Notes |
|---|--------|-----------|--------|-------|
| 8 | Software Architecture & Design of Modern Large Scale Systems | Michael Pogrebinsky | Not Started | Architecture patterns |
| 9 | Mastering the System Design Interview | Frank Kane | Not Started | Interview-focused |
| 10 | Mastering System Design: From Basics to Cracking Interviews | Rahul Rajat Singh | Not Started | Basics to advanced |
| 11 | The Complete Full-Stack Web Development Bootcamp | Dr. Angela Yu | Not Started | Web dev breadth |
| 12 | Learn to Code with Rust | Boris Paskhaver | 3% complete | Pairs with Track E Rust plan |

### Suggested Pace

- During Udemy focus weeks (Weeks 1-2 of each cycle): aim for 1-2 sections/day.
- Between cycles: keep 15-20 min/day on active course to maintain momentum.

---

## Track B: LeetCode

### Current Status

- Notes and solutions exist but no active practice schedule.
- Two resource locations to draw from (see below).

### Resources

| Resource | Location | Description |
|----------|----------|-------------|
| LeetCode KB | `personal_KB/leetcodeKB` | 5K+ lines of problem notes, solutions, patterns |
| Full Export + Study Guides | `personal_code/code/interviewQs/full_leetcode_export/` | 16 topic folders, `PROGRESS.md`, `study-guides/INDEX.md` |
| Interview Knowledge Base | `personal_KB/interviews/*.md` | 14 files: algorithms, architecture, design patterns, concurrency, etc. |

### Study Guide Topics (from full export)

- [ ] Arrays & Strings
- [ ] Hash Maps
- [ ] Two Pointers
- [ ] Sliding Window
- [ ] Binary Search
- [ ] Linked Lists
- [ ] Stacks & Queues
- [ ] Trees & BST
- [ ] Graphs & BFS/DFS
- [ ] Dynamic Programming
- [ ] Greedy
- [ ] Backtracking
- [ ] Heap / Priority Queue
- [ ] Tries
- [ ] Union Find
- [ ] Intervals

### Suggested Pace

- During LeetCode weeks (Weeks 3 & 7): 1-2 problems/day, rotating through topics.
- Between cycles: 1 problem on weekends to stay warm.

---

## Track C: ML Models -- LDA, BERT, and Beyond

### Current Status

- Multiple detailed plans exist but none actively started.
- LLM Study Plan has some components completed (attention, positional encoding, FFN, layer norm, transformer block).

### Consolidated Roadmap

Follows the NLP roadmap progression: classical NLP --> embeddings --> sequences --> transformers.

#### Phase 1: Classical NLP (text as counts)
- [ ] Bag of Words (BOW) -- vectorize sentences in numpy
- [ ] TF-IDF -- implement from scratch, compare with sklearn
- [ ] Naive Bayes Classifier -- spam classifier from scratch
- [ ] **LDA (Latent Dirichlet Allocation)** -- use gensim, read Blei 2003 paper

#### Phase 2: From Counts to Meaning
- [ ] Word Embeddings / word2vec -- implement skip-gram from scratch
- [ ] GloVe -- understand differences, use pretrained vectors

#### Phase 3: Sequences
- [ ] RNNs -- character-level RNN from scratch (Karpathy makemore)
- [ ] LSTMs -- implement in PyTorch, understand gates

#### Phase 4: Attention & Transformers
- [ ] Attention mechanism -- scaled dot-product attention from scratch
- [ ] Transformer architecture -- follow Karpathy nanoGPT
- [ ] **BERT** -- fine-tune pretrained BERT on classification (HuggingFace)
- [ ] GPT -- train on tiny shakespeare with nanoGPT

#### Phase 5: Modern Practice
- [ ] HuggingFace ecosystem -- load, fine-tune, evaluate
- [ ] Fine-tuning + transfer learning -- LoRA, adapters
- [ ] RAG -- build a document Q&A system

### Hands-On Practice Plan (12 weeks, from ML_and_AI roadmap)

| Phase | Weeks | Topics | Status |
|-------|-------|--------|--------|
| Classical ML | 1-4 | sklearn, regression, classification, clustering, ensemble | Not Started |
| Deep Learning | 5-8 | PyTorch, neural nets, CNNs, RNNs | Not Started |
| Generative AI | 9-12 | Transformers, fine-tuning, RAG, agents | Not Started |

### LLM Components Progress (from StudyPlan)

| Component | Status |
|-----------|--------|
| Attention Mechanism | Done |
| Positional Encoding | Done |
| Feed-Forward Networks | Done |
| Layer Normalization | Done |
| Complete Transformer Block | Done |
| Tokenization | Planned |
| Training Loop | Planned |
| Inference Optimization | Planned |

### Detailed Plans (don't duplicate, follow these)

| Plan | Location | Scope |
|------|----------|-------|
| NLP Roadmap | `personal_code/code/AI/NLP/nlp_roadmap.md` | 5-phase BOW-to-GPT progression |
| ML/AI Practice Roadmap | `personal_code/code/practice/ML_and_AI/LEARNING_ROADMAP.md` | 12-week hands-on exercises |
| LLM Study Plan | `personal_code/code/AI/cursor/llm/StudyPlan.md` | Transformer components, training |
| BOW Learning Path | `personal_code/code/python/emoji_generator/BOW_LEARNING_PATH.md` | Deep dive into BOW/embeddings |
| ML Theory Guides | `personal_code/guides/ML_and_AI/` | Classical ML supervised/unsupervised |
| SLM Learning Guide | `personal_code/code/AI/projects/SLM/LEARNING_GUIDE.md` | Small language model build |
| ML & AI KB | `personal_KB/ML_and_AI/` | Prompts, presentations, references |
| ML KB (legacy) | `personal_KB/ML_kb` | Older ML notes (text file) |

### Suggested Pace

- During ML weeks (Weeks 4-5): follow NLP roadmap phases sequentially.
- Build one thing per phase (spam classifier, skip-gram, RNN, nanoGPT, fine-tuned BERT).

---

## Track D: Python Practice

### Current Status

- 48-week structured curriculum exists with content created through Week 12.
- Practicing position: Week 1, Day 2 (dict comprehensions & defaultdict).
- Content created but exercises not yet done for Weeks 3-12.

### Curriculum Overview

| Cycle | Weeks | Focus | Status |
|-------|-------|-------|--------|
| 1 | 1-12 | Foundation & Idioms | Week 1 in progress |
| 2 | 13-24 | Advanced Patterns & Libraries | Not started |
| 3 | 25-36 | Expert Topics & Specialization | Not started |
| 4 | 37-48 | Production & Architecture | Not started |

### Detailed Plans (don't duplicate, follow these)

| Plan | Location | Description |
|------|----------|-------------|
| Practice Plan | `personal_code/code/practice/python/PYTHON_PRACTICE_PLAN.md` | Full 48-week curriculum |
| Progress Tracker | `personal_code/code/practice/python/PROJECT_TODO.md` | Daily checkbox tracking |
| Exercise Files | `personal_code/code/practice/python/exercises/` | Week folders with .py files |
| Python KB | `personal_KB/python/KB_python.txt` | Reference notes, Udemy course notes |

### Suggested Pace

- During Python weeks (Week 6): 30-45 min/day on exercises.
- Complete one week of the curriculum per focus week.

---

## Track E: Other Plans

Lower priority tracks. Rotate one per cycle during Week 8.

### Rust

| Item | Detail |
|------|--------|
| Status | Midway through learning, Udemy course at 3% |
| 90-Day Plan | `personal_code/code/rust/learning/chatgptLearning/rust_learning_plan.md` |
| Learning Notes | `personal_code/code/rust/learning/chatgptLearning/rust_learning.md` |
| Udemy Course | Learn to Code with Rust (Boris Paskhaver) -- 3% complete |
| Goal | Ship a hot-path Rust lib, Axum service, and C++ FFI island |

### System Design

| Item | Detail |
|------|--------|
| Status | Materials ready, not started |
| 6-Week Plan | `personal_code/code/practice/system_design/LEARNING_ROADMAP.md` |
| Udemy Courses | Mastering the System Design Interview (Frank Kane), Mastering System Design (Rahul Rajat Singh), Software Architecture (Pogrebinsky) |
| KB | `personal_KB/system_design/` |

### Performance

| Item | Detail |
|------|--------|
| Status | Not started |
| 4-Week Plan | `personal_code/code/practice/performance/LEARNING_ROADMAP.md` |
| Focus | CPU, memory, disk, network estimations |

### Networking

| Item | Detail |
|------|--------|
| Status | Materials complete, ready when needed |
| CCNA Roadmap | `personal_code/code/networking/CCNA/ROADMAP.md` |
| CCNP Roadmap | `personal_code/code/networking/CCNP/ROADMAP.md` |

### Prompt Engineering

| Item | Detail |
|------|--------|
| Status | Started, has playground |
| Location | `personal_code/code/practice/ai/prompts/` |
| TODO | `personal_code/code/practice/ai/prompts/prompts_playground/TODO.md` |

---

## All Source Files Index

Every learning-related file consolidated into this roadmap, for reference.

| File | Repo | Track |
|------|------|-------|
| `personal_code/LEARNING_ROADMAP.md` | personal_code | Previous main hub (superseded by this file) |
| `personal_code/code/AI/NLP/nlp_roadmap.md` | personal_code | C |
| `personal_code/code/practice/ML_and_AI/LEARNING_ROADMAP.md` | personal_code | C |
| `personal_code/code/AI/cursor/llm/StudyPlan.md` | personal_code | C |
| `personal_code/code/python/emoji_generator/BOW_LEARNING_PATH.md` | personal_code | C |
| `personal_code/code/AI/projects/SLM/LEARNING_GUIDE.md` | personal_code | C |
| `personal_code/guides/ML_and_AI/` | personal_code | C |
| `personal_code/code/practice/python/PYTHON_PRACTICE_PLAN.md` | personal_code | D |
| `personal_code/code/practice/python/PROJECT_TODO.md` | personal_code | D |
| `personal_code/code/rust/learning/chatgptLearning/rust_learning_plan.md` | personal_code | E |
| `personal_code/code/practice/system_design/LEARNING_ROADMAP.md` | personal_code | E |
| `personal_code/code/practice/performance/LEARNING_ROADMAP.md` | personal_code | E |
| `personal_code/code/networking/CCNA/ROADMAP.md` | personal_code | E |
| `personal_code/code/networking/CCNP/ROADMAP.md` | personal_code | E |
| `personal_code/code/practice/ai/prompts/prompts_playground/TODO.md` | personal_code | E |
| `personal_KB/leetcodeKB` | personal_KB | B |
| `personal_KB/interviews/*.md` | personal_KB | B |
| `personal_KB/ML_and_AI/` | personal_KB | C |
| `personal_KB/ML_kb` | personal_KB | C |
| `personal_KB/python/KB_python.txt` | personal_KB | D |
| `personal_KB/system_design/` | personal_KB | E |
| `personal_code/code/interviewQs/full_leetcode_export/` | personal_code | B |
| `obsidian_notes/public_obsidian/obsidian/Learning hub.md` | obsidian_notes | (stub, superseded) |

---

## Update Log

| Date | Update |
|------|--------|
| 2026-03-23 | Created master roadmap. Consolidated 13+ scattered plans into single source of truth. |
