# ml-and-ai/theory

* [BitNet b1.58 — Ternary-Weight LLMs](/ml-and-ai/theory/bitnet-b1-58.md) - BitNet b1.58 is a transformer where every weight is a trit — one of {-1, 0, +1} — instead of an FP16 number. Three states need log₂(3) ≈ 1.58 bits to encode, hence the name. Microsoft's open-weights bitnet-b1.58-2B-4T (2B params, trained on 4T tokens) matches similarly-sized FP16 models on most benchmarks while using ~0.4 GB of memory (vs 2-5 GB), 29 ms CPU decoding latency (vs 41-124 ms), and ~10× less energy. The catch: GPUs aren't optimized for ternary GEMM, so the speedups only show up on CPUs running Microsoft's custom bitnet.cpp kernels — including Apple Silicon.
* [TurboQuant — Comprehensive Technical Overview](/ml-and-ai/theory/turboquant-doc.md)
