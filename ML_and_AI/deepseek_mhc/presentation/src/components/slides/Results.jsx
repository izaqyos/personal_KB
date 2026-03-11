export default function Results() {
  const benchmarks = [
    { name: 'BBH', shot: '3-shot', baseline: 43.8, hc: 48.9, mhc: 51.0 },
    { name: 'DROP', shot: '3-shot', baseline: 47.0, hc: 51.6, mhc: 53.9 },
    { name: 'GSM8K', shot: '8-shot', baseline: 46.7, hc: 53.2, mhc: 53.8 },
    { name: 'MMLU', shot: '5-shot', baseline: 59.0, hc: 63.0, mhc: 63.4 },
    { name: 'HellaSwag', shot: '10-shot', baseline: 73.7, hc: 74.3, mhc: 74.7 },
    { name: 'MATH', shot: '4-shot', baseline: 22.0, hc: 26.4, mhc: 26.0 },
    { name: 'PIQA', shot: '0-shot', baseline: 78.5, hc: 79.9, mhc: 80.5 },
    { name: 'TriviaQA', shot: '5-shot', baseline: 54.3, hc: 56.3, mhc: 57.6 },
  ]

  return (
    <div>
      <span className="slide-tag green">RESULTS</span>
      <h2>Benchmark Performance — <span className="gradient-text green">27B Model</span></h2>

      <div className="split-60-40" style={{ marginTop: 16 }}>
        <div>
          <table className="results-table">
            <thead>
              <tr>
                <th>Benchmark</th>
                <th>Baseline</th>
                <th>HC</th>
                <th>mHC</th>
                <th>Δ vs HC</th>
              </tr>
            </thead>
            <tbody>
              {benchmarks.map(b => {
                const delta = (b.mhc - b.hc).toFixed(1)
                const isWin = b.mhc >= b.hc
                const best = Math.max(b.baseline, b.hc, b.mhc)
                return (
                  <tr key={b.name}>
                    <td>
                      <strong>{b.name}</strong>
                      <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 6 }}>{b.shot}</span>
                    </td>
                    <td>{b.baseline}</td>
                    <td>{b.hc}</td>
                    <td className={b.mhc === best ? 'best' : ''}>{b.mhc}</td>
                    <td style={{ color: isWin ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                      {isWin ? '+' : ''}{delta}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          <p style={{ fontSize: 13, marginTop: 12 }}>
            mHC beats baseline on <strong>all 8 benchmarks</strong> and outperforms HC on <strong>7 of 8</strong>.
            The only exception is MATH where mHC is −0.4% behind HC (within noise).
          </p>
        </div>

        <div>
          <div className="diagram-container">
            <div className="diagram-label">Biggest Wins (mHC vs Baseline)</div>
            <div className="bar-chart">
              {[
                { name: 'BBH', val: 7.2, max: 8 },
                { name: 'DROP', val: 6.9, max: 8 },
                { name: 'GSM8K', val: 7.1, max: 8 },
                { name: 'MMLU', val: 4.4, max: 8 },
                { name: 'MATH', val: 4.0, max: 8 },
                { name: 'TriviaQA', val: 3.3, max: 8 },
                { name: 'PIQA', val: 2.0, max: 8 },
                { name: 'HellaSwag', val: 1.0, max: 8 },
              ].map(item => (
                <div className="bar-row" key={item.name}>
                  <span className="bar-label">{item.name}</span>
                  <div className="bar-track">
                    <div
                      className="bar-fill"
                      style={{
                        width: `${(item.val / item.max) * 100}%`,
                        background: item.val > 5 ? 'var(--gradient-green)' : 'var(--gradient-blue)'
                      }}
                    >
                      +{item.val}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="key-insight" style={{ marginTop: 16 }}>
            <div className="label">Scaling Pattern</div>
            <p style={{ fontSize: 14 }}>
              Performance advantage is maintained across 3B → 9B → 27B with minimal attenuation.
              The paper suggests benefits extend to 100B+ models. On 1T token runs (3B),
              gains hold steady throughout training — no degradation.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
