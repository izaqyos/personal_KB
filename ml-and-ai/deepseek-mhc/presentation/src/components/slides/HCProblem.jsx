import AmplificationChart from '../infographics/AmplificationChart'

export default function HCProblem() {
  return (
    <div>
      <span className="slide-tag red">THE PROBLEM</span>
      <h2>HC Blows Up at Scale — <span className="gradient-text red">3000x Signal Amplification</span></h2>

      <div className="two-col" style={{ marginTop: 16 }}>
        <div>
          <p>
            HC's mixing matrix H<sup>res</sup> is <strong>unconstrained</strong> — nothing prevents
            its values from amplifying signals. When you multiply unconstrained matrices
            across 30+ layers, small amplifications compound exponentially.
          </p>

          <div className="warning-box" style={{ marginTop: 16 }}>
            <div className="label">The Math Behind the Blow-Up</div>
            <p style={{ fontSize: 14 }}>
              The composite mapping after L layers is the product of all H<sup>res</sup> matrices:
            </p>
            <div className="equation" style={{ fontSize: 14, margin: '8px 0' }}>
              ∏(H<span className="subscript">l</span><span className="superscript">res</span>) from l=1 to L
            </div>
            <p style={{ fontSize: 14 }}>
              If the spectral norm of H<sup>res</sup> is even slightly above 1 (say 1.05),
              after 30 layers: 1.05<sup>30</sup> ≈ <strong>4.3x amplification</strong>.
              In practice, DeepSeek measured peaks up to <strong>~3000x</strong> at 27B.
            </p>
          </div>

          <h3 style={{ marginTop: 20 }}>What happens in training:</h3>
          <div className="timeline">
            <div className="timeline-item">
              <strong>Steps 0–10k:</strong> Training looks normal. H<sup>res</sup> values are small
              (initialized near identity). Loss decreases smoothly.
            </div>
            <div className="timeline-item warn">
              <strong>~Step 12k:</strong> Loss spike! Gradient norms explode. H<sup>res</sup> matrices
              have drifted far enough that composite gain hits ~3000x. Training becomes erratic.
            </div>
            <div className="timeline-item warn">
              <strong>Steps 12k+:</strong> Even if training recovers, the model never catches up.
              Final performance is permanently degraded.
            </div>
          </div>

          <div className="analogy-box" style={{ marginTop: 16 }}>
            <div className="label">Analogy</div>
            <p style={{ fontSize: 14 }}>
              Imagine a game of telephone with 30 people. Each person is allowed to
              <em> amplify</em> the message however they want. By person #30, "hello"
              has become a deafening scream. That's unconstrained HC. mHC says:
              "you can rephrase, but you can't get louder."
            </p>
          </div>
        </div>

        <div>
          <AmplificationChart />

          <div className="metric-row" style={{ marginTop: 16 }}>
            <div className="metric">
              <div className="metric-value" style={{ color: 'var(--accent-red)' }}>~3000x</div>
              <div className="metric-label">HC Peak Gain</div>
            </div>
            <div className="metric">
              <div className="metric-value" style={{ color: 'var(--accent-green)' }}>~1.6x</div>
              <div className="metric-label">mHC Peak Gain</div>
            </div>
          </div>

          <div className="metric-row">
            <div className="metric">
              <div className="metric-value" style={{ color: 'var(--accent-red)' }}>+0.030</div>
              <div className="metric-label">HC Loss Spike</div>
            </div>
            <div className="metric">
              <div className="metric-value" style={{ color: 'var(--accent-green)' }}>−0.021</div>
              <div className="metric-label">mHC vs Baseline</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
