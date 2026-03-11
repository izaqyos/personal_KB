const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
function getArg(name, defaultValue) {
  const idx = args.indexOf(`--${name}`);
  if (idx === -1 || idx + 1 >= args.length) return defaultValue;
  return args[idx + 1];
}

const baselinePath = getArg('baseline', 'perf/baseline.json');
const currentPath = getArg('current', 'perf/results.json');
const threshold = parseFloat(getArg('threshold', '10'));

let current;
try {
  current = JSON.parse(fs.readFileSync(currentPath, 'utf8'));
} catch (e) {
  console.error(`Error reading current results from ${currentPath}: ${e.message}`);
  process.exit(1);
}

let baseline;
try {
  baseline = JSON.parse(fs.readFileSync(baselinePath, 'utf8'));
} catch (e) {
  console.log('No previous baseline found — this run becomes the baseline');
  process.exit(0);
}

if (!baseline.metrics || Object.keys(baseline.metrics).length === 0) {
  console.log('Baseline is empty — this run becomes the baseline');
  process.exit(0);
}

const higherIsWorse = [
  { key: 'http_req_duration_p50', label: 'p50 latency' },
  { key: 'http_req_duration_p95', label: 'p95 latency' },
  { key: 'http_req_duration_p99', label: 'p99 latency' },
  { key: 'http_req_duration_avg', label: 'avg latency' },
  { key: 'error_rate', label: 'error rate' },
  { key: 'api_latency_p50', label: 'API p50' },
  { key: 'api_latency_p95', label: 'API p95' },
  { key: 'api_latency_p99', label: 'API p99' },
];

const higherIsBetter = [
  { key: 'http_reqs_rate', label: 'throughput (req/s)' },
];

console.log('╔════════════════════════════════════════════════════════════╗');
console.log(`║  Performance Baseline Comparison (threshold: ${threshold}%)`.padEnd(61) + '║');
console.log(`║  Baseline: ${(baseline.timestamp || 'unknown').substring(0, 19)}`.padEnd(61) + '║');
console.log(`║  Current:  ${(current.timestamp || 'unknown').substring(0, 19)}`.padEnd(61) + '║');
console.log('╚════════════════════════════════════════════════════════════╝');
console.log('');

const failures = [];
const warnings = [];

function formatNum(n) {
  if (n === null || n === undefined) return 'N/A';
  return typeof n === 'number' ? n.toFixed(2) : String(n);
}

console.log('Higher-is-worse metrics (latency, error rate):');
console.log('─────────────────────────────────────────────────────────────');

for (const { key, label } of higherIsWorse) {
  const baseVal = baseline.metrics[key];
  const currVal = current.metrics[key];

  if (baseVal == null || currVal == null) continue;
  if (baseVal === 0) continue;

  const pctChg = ((currVal - baseVal) / baseVal) * 100;
  const direction = pctChg > 0 ? '↑' : '↓';
  let icon;

  if (pctChg > threshold) {
    icon = '❌';
    failures.push({ label, baseline: baseVal, current: currVal, pctChg });
  } else if (pctChg > threshold / 2) {
    icon = '⚠️';
    warnings.push({ label, baseline: baseVal, current: currVal, pctChg });
  } else {
    icon = '✅';
  }

  console.log(`  ${icon} ${label.padEnd(20)} ${formatNum(baseVal).padStart(10)} → ${formatNum(currVal).padStart(10)}  ${direction} ${Math.abs(pctChg).toFixed(1)}%`);
}

console.log('');
console.log('Higher-is-better metrics (throughput):');
console.log('─────────────────────────────────────────────────────────────');

for (const { key, label } of higherIsBetter) {
  const baseVal = baseline.metrics[key];
  const currVal = current.metrics[key];

  if (baseVal == null || currVal == null) continue;
  if (baseVal === 0) continue;

  const pctChg = ((baseVal - currVal) / baseVal) * 100;
  const direction = currVal > baseVal ? '↑' : '↓';
  let icon;

  if (pctChg > threshold) {
    icon = '❌';
    failures.push({ label, baseline: baseVal, current: currVal, pctChg });
  } else if (pctChg > threshold / 2) {
    icon = '⚠️';
    warnings.push({ label, baseline: baseVal, current: currVal, pctChg });
  } else {
    icon = '✅';
  }

  console.log(`  ${icon} ${label.padEnd(20)} ${formatNum(baseVal).padStart(10)} → ${formatNum(currVal).padStart(10)}  ${direction} ${Math.abs(pctChg).toFixed(1)}%`);
}

console.log('');
console.log('─────────────────────────────────────────────────────────────');

if (warnings.length > 0) {
  console.log('');
  console.log(`⚠️  Warnings (>${threshold / 2}% regression):`);
  for (const w of warnings) {
    console.log(`  • ${w.label}: ${formatNum(w.baseline)} → ${formatNum(w.current)} (${w.pctChg.toFixed(1)}%)`);
  }
}

if (failures.length > 0) {
  console.log('');
  console.log(`❌ Failures (>${threshold}% regression):`);
  for (const f of failures) {
    console.log(`  • ${f.label}: ${formatNum(f.baseline)} → ${formatNum(f.current)} (${f.pctChg.toFixed(1)}%)`);
  }
  console.log('');
  console.log('FAILED — Performance regression detected');
  process.exit(1);
} else {
  console.log('');
  console.log('PASSED — All metrics within threshold');
  process.exit(0);
}
