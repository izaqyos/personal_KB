import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Rate, Trend, Counter } from 'k6/metrics';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

const errorRate = new Rate('errors');
const latencyTrend = new Trend('api_latency', true);
const totalErrors = new Counter('total_errors');

const BASE_URL = __ENV.TARGET_URL || 'http://localhost:8080';

export const options = {
  stages: [
    { duration: '5m', target: 30 },
    { duration: '110m', target: 30 },
    { duration: '5m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(50)<500', 'p(95)<1500', 'p(99)<3000'],
    errors: ['rate<0.02'],
    http_req_failed: ['rate<0.02'],
  },
};

const endpoints = [
  { method: 'GET', path: '/health', expected: 200 },
  { method: 'GET', path: '/api/v1/items?page=1&limit=10', expected: 200 },
  { method: 'GET', path: '/api/v1/items/{id}', expected: [200, 404] },
];

export default function () {
  const endpoint = endpoints[Math.floor(Math.random() * endpoints.length)];
  let path = endpoint.path;

  if (path.includes('{id}')) {
    const id = Math.floor(Math.random() * 100) + 1;
    path = path.replace('{id}', id);
  }

  const url = `${BASE_URL}${path}`;
  const res = http.get(url);

  let isExpected;
  if (Array.isArray(endpoint.expected)) {
    isExpected = endpoint.expected.includes(res.status);
  } else {
    isExpected = res.status === endpoint.expected;
  }

  check(res, { [`${path}: expected status`]: () => isExpected });
  latencyTrend.add(res.timings.duration);
  errorRate.add(!isExpected);

  if (!isExpected) {
    totalErrors.add(1);
  }

  sleep(Math.random() * 3 + 1);
}

export function handleSummary(data) {
  const metrics = data.metrics;

  const summary = {
    timestamp: new Date().toISOString(),
    type: 'soak',
    duration_minutes: 120,
    metrics: {
      http_req_duration_p50: metrics.http_req_duration ? metrics.http_req_duration.values['p(50)'] : null,
      http_req_duration_p95: metrics.http_req_duration ? metrics.http_req_duration.values['p(95)'] : null,
      http_req_duration_p99: metrics.http_req_duration ? metrics.http_req_duration.values['p(99)'] : null,
      http_req_duration_avg: metrics.http_req_duration ? metrics.http_req_duration.values.avg : null,
      total_requests: metrics.http_reqs ? metrics.http_reqs.values.count : null,
      total_errors: metrics.total_errors ? metrics.total_errors.values.count : 0,
      error_rate: metrics.errors ? metrics.errors.values.rate : null,
    },
  };

  return {
    'perf/soak-results.json': JSON.stringify(summary, null, 2),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}
