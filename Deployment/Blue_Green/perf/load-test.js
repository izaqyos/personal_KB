import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Rate, Trend } from 'k6/metrics';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

const errorRate = new Rate('errors');
const apiLatency = new Trend('api_latency', true);

const BASE_URL = __ENV.TARGET_URL || 'http://localhost:8080';

export const options = {
  stages: [
    { duration: '2m', target: 50 },
    { duration: '5m', target: 50 },
    { duration: '2m', target: 100 },
    { duration: '3m', target: 50 },
    { duration: '1m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(50)<300', 'p(95)<800', 'p(99)<2000'],
    errors: ['rate<0.01'],
    http_req_failed: ['rate<0.01'],
  },
};

function getHeaders() {
  return {
    'Content-Type': 'application/json',
    // Add Bearer token here: 'Authorization': `Bearer ${__ENV.AUTH_TOKEN}`
  };
}

function readFlow(headers) {
  group('Read Flow', () => {
    const healthRes = http.get(`${BASE_URL}/health`);
    check(healthRes, { 'health: status 200': (r) => r.status === 200 });
    errorRate.add(healthRes.status !== 200);

    const listRes = http.get(`${BASE_URL}/api/v1/items?page=1&limit=20`, { headers });
    check(listRes, { 'list: status 200': (r) => r.status === 200 });

    let hasData = false;
    try {
      const body = JSON.parse(listRes.body);
      hasData = Array.isArray(body.data) && body.data.length > 0;
    } catch (e) {
      hasData = false;
    }
    check(listRes, { 'list: has data array with items': () => hasData });

    apiLatency.add(listRes.timings.duration);
    errorRate.add(listRes.status !== 200);
  });
}

function detailFlow(headers) {
  group('Detail Flow', () => {
    const id = Math.floor(Math.random() * 1000) + 1;
    const res = http.get(`${BASE_URL}/api/v1/items/${id}`, { headers });

    check(res, { 'detail: status 200 or 404': (r) => r.status === 200 || r.status === 404 });
    apiLatency.add(res.timings.duration);
    errorRate.add(res.status >= 500);
  });
}

function writeFlow(headers) {
  group('Write Flow', () => {
    const payload = JSON.stringify({
      name: `load-test-${Date.now()}`,
      description: 'k6 load test item',
    });

    const createRes = http.post(`${BASE_URL}/api/v1/items`, payload, {
      headers: { ...headers, 'Content-Type': 'application/json' },
    });

    check(createRes, { 'create: status 201': (r) => r.status === 201 });
    apiLatency.add(createRes.timings.duration);
    errorRate.add(createRes.status !== 201);

    if (createRes.status === 201) {
      try {
        const body = JSON.parse(createRes.body);
        if (body.id) {
          http.del(`${BASE_URL}/api/v1/items/${body.id}`, null, { headers });
        }
      } catch (e) {
        // best effort cleanup
      }
    }
  });
}

function searchFlow(headers) {
  group('Search Flow', () => {
    const queries = ['test', 'load', 'item', 'prod', 'demo'];
    const query = queries[Math.floor(Math.random() * queries.length)];

    const res = http.get(`${BASE_URL}/api/v1/search?q=${query}&limit=50`, { headers });
    check(res, { 'search: status 200': (r) => r.status === 200 });
    apiLatency.add(res.timings.duration);
    errorRate.add(res.status !== 200);
  });
}

export default function () {
  const headers = getHeaders();
  const rand = Math.random() * 100;

  if (rand < 40) {
    readFlow(headers);
  } else if (rand < 70) {
    detailFlow(headers);
  } else if (rand < 90) {
    writeFlow(headers);
  } else {
    searchFlow(headers);
  }

  sleep(Math.random() * 2 + 0.5);
}

export function handleSummary(data) {
  const metrics = data.metrics;

  const thresholds = {};
  for (const [key, metric] of Object.entries(metrics)) {
    if (metric.thresholds) {
      thresholds[key] = metric.thresholds;
    }
  }

  const summary = {
    timestamp: new Date().toISOString(),
    image_tag: __ENV.IMAGE_TAG || 'unknown',
    metrics: {
      http_req_duration_p50: metrics.http_req_duration ? metrics.http_req_duration.values['p(50)'] : null,
      http_req_duration_p95: metrics.http_req_duration ? metrics.http_req_duration.values['p(95)'] : null,
      http_req_duration_p99: metrics.http_req_duration ? metrics.http_req_duration.values['p(99)'] : null,
      http_req_duration_avg: metrics.http_req_duration ? metrics.http_req_duration.values.avg : null,
      http_reqs_rate: metrics.http_reqs ? metrics.http_reqs.values.rate : null,
      error_rate: metrics.errors ? metrics.errors.values.rate : null,
      api_latency_p50: metrics.api_latency ? metrics.api_latency.values['p(50)'] : null,
      api_latency_p95: metrics.api_latency ? metrics.api_latency.values['p(95)'] : null,
      api_latency_p99: metrics.api_latency ? metrics.api_latency.values['p(99)'] : null,
      vus_max: metrics.vus_max ? metrics.vus_max.values.max : null,
    },
    thresholds,
  };

  return {
    'perf/results.json': JSON.stringify(summary, null, 2),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}
