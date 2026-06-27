# Yosi's Learning Pillars

> v1 — 2026-06-11. Subject-level mental model for all learning.
> `config/tracks.yaml` slices by *medium and cadence* (Udemy, LeetCode, ML, Python, Other);
> these pillars slice by *subject*. Tracks are the execution layer; pillars are the strategy layer.
> This file is informational — /learn does not read or mutate it for progress tracking.

## Pillar 1 — System Design & Systems Fundamentals

Databases, architectures, NFRs, message brokers, k8s/docker — **plus** the systems
fundamentals that were previously orphaned: networking (CCNA/CCNP), OS internals,
performance (CPU/memory/disk/network).

Maps to: `Other → System Design`, `Other → Performance`, `Other → Networking`, Udemy tier 3 (3 sys-design courses).

## Pillar 2 — Algorithms & Data Structures

LeetCode 16-topic ladder + fundamentals drills (merge sort, BFS/DFS, heaps from scratch).

Maps to: LeetCode track (schedule weeks 3 & 7).
Offline-capable: every topic has a self-sufficient bank + study notes in
`personal_code/code/interviewQs/leetcode/*.md` — designed for solo practice with no AI assistance.

## Pillar 3a — AI Engineering (usage)

Tools & models, cloud & local: Bedrock, Claude Code, prompt engineering, RAG, agents,
local inference, fine-tuning workflows. Product/engineering muscle.

Maps to: Udemy tier 1 (AI/Bedrock), `Other → Prompt Engineering`, ML track Phase 5.

## Pillar 3b — ML Theory (fundamentals)

Classic ML and the math under it: BOW, tf-idf, linear regression, MSE, gradient descent,
naive Bayes, embeddings, RNN/LSTM → attention → transformers. Math/fundamentals muscle.

Maps to: ML Models track Phases 1–4 + llm_components.

> 3a and 3b are deliberately separate: different muscles, different practice modes.
> Don't let tool fluency masquerade as theory understanding (or vice versa).

## Pillar 4 — Programming Languages

Python primary (48-week curriculum). Second-language cluster (Node/Go/C++/Rust/Java):
**one deliberate language per year** (current: Rust); the rest stay learn-on-the-job.

Maps to: Python track, `Other → Rust`, Udemy (Rust course, full-stack bootcamp for Node).

## Pillar 5 — Security  *(added 2026-06-11)*

Threat modeling, AppSec (OWASP-level fluency), crypto fundamentals, secure design review.
Rationale: Check Point TL doing security-sensitive PR reviews; compounds with Pillar 1;
career differentiator. **No track in tracks.yaml yet** — needs a human edit (e.g., a new
section under `Other Plans`) or a dedicated roadmap doc before it gets cadence time.

---

## Open items

- [ ] Add Security as a tracked section in `tracks.yaml` (human edit — agent must not restructure)
- [ ] Pick first Security resource (candidate: OWASP Top 10 deep-dive + threat-modeling primer)
- [ ] Decide whether leadership/communication becomes a 6th pillar or stays outside this system
