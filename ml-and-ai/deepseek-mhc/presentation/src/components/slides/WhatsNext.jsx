export default function WhatsNext() {
  const articles = [
    {
      title: 'Hyper-Connections (Original HC Paper)',
      desc: 'The predecessor to mHC. Introduces multi-stream residual expansion. Understanding what HC does (and breaks) gives you full context for why mHC exists.',
      url: 'https://arxiv.org/abs/2409.19606',
      meta: 'arXiv: 2409.19606 | 2024',
      tag: 'prerequisite',
    },
    {
      title: 'mHC-lite: You Don\'t Need 20 Sinkhorn-Knopp Iterations',
      desc: 'Uses Birkhoff-von Neumann theorem to guarantee exact doubly stochasticity by construction — no iterative projection needed. Eliminates dependency on specialized CUDA kernels.',
      url: 'https://arxiv.org/abs/2601.05732',
      meta: 'arXiv: 2601.05732 | Jan 2026',
      tag: 'follow-up',
    },
    {
      title: 'DeepSeek-V3 Technical Report',
      desc: 'The base architecture mHC builds on. Multi-Head Latent Attention (MLA), Mixture of Experts (MoE), loss-free load balancing. Essential for understanding the model configs.',
      url: 'https://arxiv.org/abs/2412.19437',
      meta: 'arXiv: 2412.19437 | 671B total params, 37B active',
      tag: 'context',
    },
    {
      title: 'Geometric Information Engineering (Substack)',
      desc: 'Broader perspective on using geometric constraints (manifolds, convex hulls, conservation laws) as architectural design principles beyond just residual connections.',
      url: 'https://vinvashishta.substack.com/p/geometric-information-engineering',
      meta: 'Vin Vashishta | Substack',
      tag: 'broader',
    },
    {
      title: 'The Manifold Dial: Visualizing Why mHC Stabilizes Deep Networks',
      desc: 'Interactive visualization showing how increasing Sinkhorn iterations (5→20) transitions from unstable to stable. Great intuition builder for the "manifold dial" concept.',
      url: 'https://subhadipmitra.com/blog/2026/deepseek-mhc-manifold-constrained-hyper-connections/',
      meta: 'Subhadip Mitra | Blog',
      tag: 'visual',
    },
    {
      title: 'Sinkhorn Distances: Lightspeed Computation of Optimal Transport',
      desc: 'The original theory behind Sinkhorn normalization for optimal transport. Shows how entropic regularization + Sinkhorn iterations appear across ML — not just residual connections.',
      url: 'https://arxiv.org/abs/1306.0895',
      meta: 'arXiv: 1306.0895 | Cuturi 2013',
      tag: 'theory',
    },
    {
      title: 'Deep Residual Learning for Image Recognition (ResNet)',
      desc: 'The paper that started it all. He et al. 2015. The identity mapping property that mHC restores was first formalized here. Still foundational reading.',
      url: 'https://arxiv.org/abs/1512.03385',
      meta: 'arXiv: 1512.03385 | He et al. 2015 | 200k+ citations',
      tag: 'classic',
    },
  ]

  const tagColors = {
    prerequisite: 'var(--accent-orange)',
    'follow-up': 'var(--accent-green)',
    context: 'var(--accent-blue)',
    broader: 'var(--accent-purple)',
    visual: 'var(--accent-cyan)',
    theory: 'var(--accent-pink)',
    classic: 'var(--accent-yellow)',
  }

  return (
    <div>
      <span className="slide-tag cyan">FURTHER READING</span>
      <h2>What's Next — <span className="gradient-text">Keep Exploring</span></h2>
      <p>Curated reading list, ordered by relevance to this paper.</p>

      <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {articles.map((a, i) => (
          <a
            key={i}
            className="article-link"
            href={a.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                padding: '2px 8px',
                borderRadius: 3,
                background: `${tagColors[a.tag]}22`,
                color: tagColors[a.tag],
              }}>
                {a.tag}
              </span>
              <span className="link-title">{a.title}</span>
            </div>
            <div className="link-desc">{a.desc}</div>
            <div className="link-meta">{a.meta}</div>
          </a>
        ))}
      </div>

      <div className="analogy-box" style={{ marginTop: 20, textAlign: 'center' }}>
        <p style={{ fontSize: 15 }}>
          <strong>The pattern to watch:</strong> geometric constraints as architectural guarantees.
          <br />
          mHC uses doubly stochastic matrices. What other manifolds could stabilize other components?
          <br />
          Routing matrices in MoE, attention weights, multi-modal fusion —
          the same principle may apply broadly.
        </p>
      </div>
    </div>
  )
}
