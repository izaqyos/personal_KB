import ArchDiagram from '../infographics/ArchDiagram'

export default function Architecture() {
  return (
    <div>
      <span className="slide-tag blue">ARCHITECTURE</span>
      <h2>How mHC Integrates Into the Transformer</h2>

      <div className="two-col" style={{ marginTop: 16 }}>
        <div>
          <p>
            mHC wraps around every residual connection in the transformer.
            The base architecture is DeepSeek-V3 style: MoE with Multi-Head Latent
            Attention (MLA).
          </p>

          <h3 style={{ marginTop: 20 }}>The mHC Processing Pipeline:</h3>

          <div className="flow-horizontal" style={{ marginTop: 12, flexWrap: 'wrap', gap: 4, justifyContent: 'flex-start' }}>
            <div className="flow-node">
              <div className="node-title">x̃<sub>l</sub></div>
              <div className="node-sub">4 streams, C dims each</div>
            </div>
            <span className="flow-arrow">→</span>
            <div className="flow-node active">
              <div className="node-title">Compute H's</div>
              <div className="node-sub">pre, res, post from x̃</div>
            </div>
            <span className="flow-arrow">→</span>
            <div className="flow-node">
              <div className="node-title">Sinkhorn(H<sup>res</sup>)</div>
              <div className="node-sub">project to DS</div>
            </div>
            <span className="flow-arrow">→</span>
            <div className="flow-node">
              <div className="node-title">Layer F</div>
              <div className="node-sub">attn or FFN</div>
            </div>
            <span className="flow-arrow">→</span>
            <div className="flow-node">
              <div className="node-title">x̃<sub>l+1</sub></div>
              <div className="node-sub">mix + project back</div>
            </div>
          </div>

          <h3 style={{ marginTop: 24 }}>Step by Step:</h3>
          <ul className="bullet-list">
            <li><strong>Flatten</strong> the 4 streams into one vector (4×C → vec of 4C)</li>
            <li><strong>Compute coefficients</strong> via small linear layers + tanh activation:
              H̃<sup>pre</sup>, H̃<sup>res</sup>, H̃<sup>post</sup></li>
            <li><strong>Apply manifold projections:</strong>
              H<sup>pre</sup> = sigmoid(H̃<sup>pre</sup>),
              H<sup>post</sup> = 2·sigmoid(H̃<sup>post</sup>),
              H<sup>res</sup> = Sinkhorn(H̃<sup>res</sup>)</li>
            <li><strong>Aggregate</strong>: H<sup>pre</sup> · x̃ → single stream for the layer</li>
            <li><strong>Process</strong>: Attention or FFN on the aggregated stream</li>
            <li><strong>Expand + Mix</strong>: H<sup>post</sup> projects output back,
              H<sup>res</sup> mixes residual streams</li>
          </ul>

          <div className="key-insight" style={{ marginTop: 16 }}>
            <div className="label">Why only H<sup>res</sup> gets the constraint?</div>
            <p style={{ fontSize: 14 }}>
              Ablations showed H<sup>res</sup> contributes −0.022 loss reduction (82% of total benefit).
              H<sup>pre</sup> and H<sup>post</sup> are "one-shot" — applied once per layer, not compounded.
              Only H<sup>res</sup> is multiplied across all layers, so only it needs the stability constraint.
            </p>
          </div>
        </div>

        <div>
          <ArchDiagram />
        </div>
      </div>
    </div>
  )
}
