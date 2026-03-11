import HCDiagram from '../infographics/HCDiagram'

export default function HCExplained() {
  return (
    <div>
      <span className="slide-tag cyan">THE UPGRADE</span>
      <h2>Hyper-Connections (HC) — Multiple Streams</h2>

      <div className="two-col" style={{ marginTop: 16 }}>
        <div>
          <p>
            Standard residual connections pass info through <strong>one single path</strong>.
            As models scale to billions of parameters, this becomes a bottleneck —
            one highway lane for all information.
          </p>

          <p>
            <strong>Hyper-Connections</strong> (arXiv: 2409.19606) expand the residual
            stream by a factor of <em>n</em> (typically n=4). Instead of one path,
            you get 4 parallel streams that can <em>mix</em> and exchange information.
          </p>

          <div className="equation">
            x<span className="subscript">l+1</span> = H<span className="superscript">res</span> · x<span className="subscript">l</span> + H<span className="superscript">post⊤</span> · F(H<span className="superscript">pre</span> · x<span className="subscript">l</span>, W<span className="subscript">l</span>)
          </div>

          <div className="card-grid cols-3" style={{ marginTop: 16 }}>
            <div className="card highlight-blue">
              <h3 style={{ fontSize: 14 }}>H<sup>pre</sup></h3>
              <p style={{ fontSize: 13 }}>Aggregates streams before feeding into the layer (attention/FFN)</p>
            </div>
            <div className="card highlight-purple">
              <h3 style={{ fontSize: 14 }}>H<sup>res</sup></h3>
              <p style={{ fontSize: 13 }}>Mixes residual streams — <strong>the critical one</strong>. Controls how info routes between streams</p>
            </div>
            <div className="card highlight-green">
              <h3 style={{ fontSize: 14 }}>H<sup>post</sup></h3>
              <p style={{ fontSize: 13 }}>Projects layer output back into the multi-stream space</p>
            </div>
          </div>

          <div className="analogy-box" style={{ marginTop: 16 }}>
            <div className="label">Analogy</div>
            <p style={{ fontSize: 14 }}>
              Think of a 4-lane highway (n=4) instead of a single road.
              At each junction (layer), cars can switch lanes (H<sup>res</sup> mixing),
              a traffic summary is created for the junction to process (H<sup>pre</sup>),
              and the junction's output feeds back into the highway (H<sup>post</sup>).
              More lanes = more capacity = better throughput.
            </p>
          </div>
        </div>

        <div>
          <HCDiagram />

          <div className="key-insight" style={{ marginTop: 16 }}>
            <div className="label">Key Point</div>
            <p style={{ fontSize: 14 }}>
              All three matrices (H<sup>pre</sup>, H<sup>res</sup>, H<sup>post</sup>)
              are <strong>learned per-token</strong> — they're not static. They're computed
              from the input via small linear projections with tanh activation.
              This makes them <em>input-dependent</em> (dynamic routing).
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
