import ResidualDiagram from '../infographics/ResidualDiagram'

export default function ResidualPrimer() {
  return (
    <div>
      <span className="slide-tag blue">FOUNDATION</span>
      <h2>Residual Connections — Why They Matter</h2>

      <div className="two-col" style={{ marginTop: 16 }}>
        <div>
          <p>
            Before ResNets (2015), deep networks couldn't go much beyond 20 layers.
            Adding more layers actually <em>hurt</em> performance — gradients would
            vanish or explode during backpropagation, making training impossible.
          </p>

          <div className="equation" style={{ marginTop: 16 }}>
            x<span className="subscript">l+1</span> = x<span className="subscript">l</span> + F(x<span className="subscript">l</span>, W<span className="subscript">l</span>)
          </div>

          <p style={{ marginTop: 12 }}>
            The key insight: instead of learning the full transformation, learn only
            the <strong>residual</strong> (the difference from input). The input
            passes through unchanged via the <strong>identity shortcut</strong>.
          </p>

          <div className="analogy-box" style={{ marginTop: 16 }}>
            <div className="label">Analogy</div>
            <p style={{ fontSize: 14 }}>
              Imagine editing a document. Instead of rewriting the whole thing
              from scratch each round (hard!), you just write the <em>changes</em> (easy).
              The original document flows through untouched — you only learn what to add.
              That's a residual connection.
            </p>
          </div>

          <div className="key-insight" style={{ marginTop: 16 }}>
            <div className="label">Why this matters for mHC</div>
            <p style={{ fontSize: 14 }}>
              The <strong>identity mapping property</strong> is what makes this work.
              During backpropagation, the gradient flows directly through the shortcut —
              no matrix multiplications, no shrinking or growing. This is the property
              that HC accidentally broke, and mHC restores.
            </p>
          </div>
        </div>

        <div>
          <ResidualDiagram />
        </div>
      </div>
    </div>
  )
}
