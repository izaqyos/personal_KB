const tocItems = [
  { n: '01', title: 'Residual Connections — The Foundation', slide: 2 },
  { n: '02', title: 'Hyper-Connections (HC) — The Upgrade', slide: 3 },
  { n: '03', title: 'The Problem — HC Blows Up at Scale', slide: 4 },
  { n: '04', title: 'The Fix — mHC & Doubly Stochastic Matrices', slide: 5 },
  { n: '05', title: 'Sinkhorn-Knopp — The Projection Algorithm', slide: 6 },
  { n: '06', title: 'Why It Works — Mathematical Guarantees', slide: 7 },
  { n: '07', title: 'Architecture Integration', slide: 8 },
  { n: '08', title: 'Results & Benchmarks', slide: 9 },
  { n: '09', title: 'Stability Deep Dive', slide: 10 },
  { n: '10', title: 'Infrastructure Optimizations', slide: 11 },
  { n: '11', title: 'TL;DR — The Big Picture', slide: 12 },
  { n: '12', title: "What's Next — Further Reading", slide: 13 },
]

export default function TableOfContents({ goTo }) {
  return (
    <div>
      <span className="slide-tag purple">OVERVIEW</span>
      <h2>What We'll Cover</h2>
      <p>Click any section to jump directly to it.</p>

      <div className="toc-list">
        {tocItems.map((item) => (
          <div
            key={item.n}
            className="toc-item"
            onClick={() => goTo(item.slide)}
          >
            <span className="toc-number">{item.n}</span>
            <span className="toc-title">{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
