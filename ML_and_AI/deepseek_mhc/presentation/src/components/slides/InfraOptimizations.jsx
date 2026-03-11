export default function InfraOptimizations() {
  return (
    <div>
      <span className="slide-tag orange">INFRASTRUCTURE</span>
      <h2>How They Made It Fast — <span className="gradient-text">Only 6.7% Overhead</span></h2>

      <p style={{ marginTop: 8 }}>
        A 4x wider residual stream should cost 4x more communication and memory.
        Three engineering tricks bring it down to just 6.7% extra training time.
      </p>

      <div className="card-grid cols-3" style={{ marginTop: 20 }}>
        <div className="card highlight-blue">
          <div className="card-icon">⚡</div>
          <h3>Kernel Fusion</h3>
          <p style={{ fontSize: 13 }}>
            All mHC operations (computing H<sup>pre</sup>, H<sup>res</sup>, H<sup>post</sup>,
            Sinkhorn-Knopp iterations, application) are fused into <strong>5 custom CUDA kernels</strong>.
            Eliminates GPU launch overhead and redundant memory reads.
          </p>
          <ul className="bullet-list" style={{ fontSize: 13 }}>
            <li>Sinkhorn: all 20 iterations in 1 kernel</li>
            <li>Application: reduces memory reads from (3n+1)C to (n+1)C</li>
            <li>Backward: recomputes on-chip instead of storing</li>
          </ul>
        </div>

        <div className="card highlight-green">
          <div className="card-icon">♻️</div>
          <h3>Selective Recomputation</h3>
          <p style={{ fontSize: 13 }}>
            Instead of storing all intermediate activations (massive with 4x streams),
            they <strong>discard intermediates and recompute during backward pass</strong>.
            Only the expensive parts (attention/FFN) are cached.
          </p>
          <ul className="bullet-list" style={{ fontSize: 13 }}>
            <li>Stores: first layer input + F outputs only</li>
            <li>Recomputes: H<sup>pre</sup>·x, RMSNorm, coefficients</li>
            <li>Block size L<sub>r</sub> ≈ √(nL/(n+2)) ≈ 4–5 layers</li>
          </ul>
        </div>

        <div className="card highlight-purple">
          <div className="card-icon">🔄</div>
          <h3>DualPipe Overlap</h3>
          <p style={{ fontSize: 13 }}>
            n-stream residual means n× more pipeline communication. They extend
            DualPipe to <strong>overlap communication with computation</strong>:
          </p>
          <ul className="bullet-list" style={{ fontSize: 13 }}>
            <li>MLP ops on dedicated high-priority stream</li>
            <li>Recomputation decoupled from pipeline comm</li>
            <li>No persistent kernels (enables preemption)</li>
            <li>Result: comm latency fully hidden</li>
          </ul>
        </div>
      </div>

      <div className="analogy-box" style={{ marginTop: 20 }}>
        <div className="label">Analogy: Why Naive Implementation Would Be 50–100% Overhead</div>
        <p style={{ fontSize: 14 }}>
          Imagine you need to paint 4 rooms (streams) instead of 1. The naive approach:
          buy 4x paint, make 4x trips. The optimized approach: buy paint in bulk (kernel fusion),
          don't store photos of each room mid-painting — just look again when needed (recomputation),
          and paint one room while the delivery truck brings supplies for the next (overlap).
          The 4 rooms still take more work, but only 6.7% more — not 400%.
        </p>
      </div>

      <div className="metric-row" style={{ marginTop: 16 }}>
        <div className="metric">
          <div className="metric-value" style={{ color: 'var(--accent-orange)' }}>5</div>
          <div className="metric-label">Custom CUDA Kernels</div>
        </div>
        <div className="metric">
          <div className="metric-value" style={{ color: 'var(--accent-green)' }}>3x</div>
          <div className="metric-label">Memory Read Reduction</div>
        </div>
        <div className="metric">
          <div className="metric-value" style={{ color: 'var(--accent-cyan)' }}>6.7%</div>
          <div className="metric-label">Total Overhead (n=4)</div>
        </div>
        <div className="metric">
          <div className="metric-value" style={{ color: 'var(--accent-purple)' }}>100%</div>
          <div className="metric-label">Comm Latency Hidden</div>
        </div>
      </div>
    </div>
  )
}
