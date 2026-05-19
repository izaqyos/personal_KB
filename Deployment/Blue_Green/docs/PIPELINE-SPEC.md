# Blue-Green Deployment Pipeline Specification

> **Source:** Internal deployment design notes
> **Author:** Yosi Izaq
> **Captured:** 2026-05-07
> **Status:** Active
> **Type:** compiled

---

## Architecture Overview

```
  ┌─────────────────────────────────────────────────────────────────────────────────────────┐
  │                            Single-Artifact Promotion Pipeline                           │
  └─────────────────────────────────────────────────────────────────────────────────────────┘

  main commit
       │
       ▼
  ┌──────────┐    ┌──────────────┐    ┌───────────────┐
  │  Lint /   │───▶│  Unit Tests  │───▶│  Build Image  │
  │  SAST     │    │              │    │  Push to ECR  │
  └──────────┘    └──────────────┘    │  (SHA tag)    │
                                       └───────┬───────┘
                                               │
                    ┌──────────────────────────┘
                    │  Same SHA-tagged image promoted through all environments
                    ▼
  ┌─────────────────────────────────────────────────────────────────────────────────────┐
  │                                                                                     │
  │   ┌─────────┐        ┌───────────┐        ┌────────────┐        ┌──────────┐       │
  │   │   DEV   │───────▶│  STAGING  │───────▶│  PRE-PROD  │───────▶│   PROD   │       │
  │   └────┬────┘        └─────┬─────┘        └─────┬──────┘        └────┬─────┘       │
  │        │                   │                     │                    │              │
  │   ┌────┴────┐        ┌─────┴─────┐        ┌─────┴──────┐        ┌───┴──────┐       │
  │   │ Smoke   │        │ Smoke     │        │ Smoke      │        │ Deploy   │       │
  │   │ Integ   │        │ Integ     │        │ Integ      │        │ Green    │       │
  │   │ Contract│        │ Contract  │        │ Contract   │        │          │       │
  │   │         │        │ OWASP ZAP │        │ OWASP ZAP  │        │ Canary:  │       │
  │   │         │        │           │        │ k6 Load    │        │  5%→25%  │       │
  │   │ Auto-   │        │ Jira QA   │        │ 2h Soak    │        │  →50%    │       │
  │   │ promote │        │ ticket    │        │ Abbrev QA  │        │  →100%   │       │
  │   │         │        │ 48h bake  │        │ 48h bake   │        │          │       │
  │   │         │        │ 1 approver│        │ 2 approvers│        │ Tag rel  │       │
  │   └─────────┘        └───────────┘        └────────────┘        │ 2h cool  │       │
  │                                                                  │ Teardown │       │
  │                                                                  │ blue     │       │
  │                                                                  └──────────┘       │
  │                                                                                     │
  └─────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Environments

| Env | Purpose | Infra Parity | Data | Min Bake Time |
|---|---|---|---|---|
| **Dev** | Fast feedback on every commit | Scaled-down (smaller instance sizes, fewer replicas) | Synthetic data (seed scripts) | 0 (auto-promote on green) |
| **Staging** | Integration testing, QA sign-off | Mid-scale (2 replicas, production networking) | Anonymized prod snapshot refreshed weekly | 48 hours |
| **Pre-prod** | Prod mirror for perf validation | Prod-identical infra (same instance sizes, replica count, networking) | Anonymized prod snapshot refreshed daily | 48 hours |
| **Prod** | Live customer traffic | Production | Production | Canary bake: 30 min per ramp step |

---

## Stage Details

### Dev

**Trigger:** Push to `main` branch (automatic).

| Step | Details |
|---|---|
| Lint | `npm run lint` — ESLint with project config |
| SAST | Semgrep with `p/default` ruleset |
| Unit tests | `npm test --coverage` — coverage artifact uploaded |
| Build & push | Docker build → ECR push with `<short-sha>` tag + `dev-latest` tag |
| Deploy | ECS task definition rendered and deployed; wait for service stability (10 min) |
| Smoke tests | `npm run test:smoke` against dev URL |
| Integration tests | `npm run test:integration` against dev URL |
| Contract tests | `npm run test:contract` against dev URL (parallel with integration) |
| Promotion | **Automatic** — on all tests green, image is ready for staging promotion |

### Staging

**Trigger:** `workflow_dispatch` with `image_tag` input.

| Step | Details |
|---|---|
| Approval gate | GitHub Environment protection — **1 reviewer** required |
| Deploy | Same SHA-tagged image deployed to staging ECS |
| Smoke tests | `npm run test:smoke` against staging URL |
| Integration tests | `npm run test:integration` against staging URL |
| Contract tests | `npm run test:contract` against staging URL |
| Security scan | OWASP ZAP baseline scan — fail on findings |
| Jira QA ticket | Auto-created in QA project with **full checklist** (auth, core flows, UI/UX, edge cases, sign-off) |
| Bake time | **48 hours minimum** before promotion to pre-prod |

### Pre-prod

**Trigger:** `workflow_dispatch` with `image_tag` input.

| Step | Details |
|---|---|
| Approval gate | GitHub Environment protection — **2 reviewers** required |
| Deploy | Same SHA-tagged image deployed to pre-prod ECS |
| Smoke tests | `npm run test:smoke` against pre-prod URL |
| Integration tests | `npm run test:integration` against pre-prod URL |
| Contract tests | `npm run test:contract` against pre-prod URL |
| Security scan | OWASP ZAP baseline scan — fail on findings |
| Load test | k6 `load-test.js` with baseline comparison from S3 — **10% regression threshold** (p95 latency, error rate) |
| Soak test | k6 `soak-test.js` — **2-hour duration** at sustained load |
| Jira QA ticket | Auto-created with **abbreviated checklist** (critical paths only — staging had full QA) |
| Bake time | **48 hours minimum** before promotion to prod |

### Prod

**Trigger:** `workflow_dispatch` with `image_tag` input.

| Step | Details |
|---|---|
| Approval gate | GitHub Environment protection — **2 reviewers** required |
| Deploy green | New image deployed to green ECS service; wait for service stability (15 min) |
| Green smoke test | Smoke tests against internal green endpoint (not public) |
| Canary 5% | ALB weighted routing: blue 95% / green 5% — **30 min bake** with CloudWatch alarm monitoring |
| Canary 25% | ALB weighted routing: blue 75% / green 25% — **30 min bake** |
| Canary 50% | ALB weighted routing: blue 50% / green 50% — **30 min bake** |
| Full traffic 100% | ALB weighted routing: blue 0% / green 100% — **60 min extended bake** |
| Tag release | Git tag `release-YYYYMMDD-<sha>` pushed to origin |
| Cooldown | **2 hours** — blue environment kept running as instant rollback target |
| Teardown blue | Blue ECS service scaled to 0 desired count |
| Auto-rollback | At **any canary phase**, if CloudWatch alarm fires (`prod-green-5xx-rate` or `prod-green-p99-latency`), traffic shifts back to blue 100% and green scales to 0 |

---

## Rollback Strategy

| Scenario | Action | Time to Recover |
|---|---|---|
| Test failure in any pre-prod env | Block promotion — image never reaches next environment | Immediate (no recovery needed) |
| CloudWatch alarm during canary ramp | **Automatic rollback** — ALB listener updated to blue 100%, green scaled to 0 | < 30 seconds |
| Issue detected post-100% within 2h cooldown | **Manual trigger** — ALB listener updated to blue 100%, green scaled to 0 (blue still running) | < 30 seconds |
| Issue detected after blue teardown | Redeploy previous known-good image tag to ECS service | ~5 minutes |

---

## Observability

### Dashboards

All environments have CloudWatch dashboards with:

- **Request rate** — requests/sec by target group (blue vs green side-by-side in prod)
- **Error rate** — 4xx and 5xx rates per target group
- **Latency percentiles** — p50, p95, p99 per target group
- **CPU / Memory** — ECS task-level utilization
- **Blue vs Green comparison** — side-by-side panels during canary phases (prod)

### Alerting

| Env | Channel | Tool |
|---|---|---|
| Dev | `#deploy-dev` Slack channel | Slack webhook |
| Staging | `#deploy-staging` Slack channel | Slack webhook |
| Pre-prod | `#deploy-pre-prod` Slack channel | Slack webhook |
| Prod | `#deploy-prod` Slack channel + **PagerDuty / OpsGenie** on-call escalation | Slack webhook + PagerDuty/OpsGenie integration |

**Prod alert rules:**

- 5xx rate > 1% for 2 minutes → PagerDuty page
- p99 latency > baseline × 1.5 for 5 minutes → PagerDuty page
- Task health check failure → PagerDuty page
- Any canary alarm → auto-rollback + PagerDuty page + Slack alert

---

## Config Management

| Concern | Tool | Details |
|---|---|---|
| Application config | **AWS AppConfig / SSM Parameter Store** | Hierarchical parameters: `/<env>/your-app/<key>`. Versioned, supports gradual rollout via AppConfig deployment strategies. |
| Secrets | **AWS Secrets Manager** | Rotated automatically. Referenced in ECS task definition as `valueFrom` secret ARNs. Never baked into images. |
| Feature flags | **LaunchDarkly or AWS AppConfig** | Runtime feature toggles decoupled from deploys. Per-environment targeting. Kill switches for new features. |
| Infrastructure | **Terraform** | Shared modules in `infra/modules/`. Per-environment variable files: `infra/envs/dev.tfvars`, `staging.tfvars`, `pre-prod.tfvars`, `prod.tfvars`. State stored in S3 with DynamoDB locking. |

---

## Prerequisites

| Component | Tool | Priority | Notes |
|---|---|---|---|
| Container build pipeline | GitHub Actions + Amazon ECR | **P0** | Core CI — must be in place before any deployment |
| Infrastructure as Code | Terraform | **P0** | ECS clusters, ALBs, target groups, security groups, IAM roles |
| Test suites | Jest / custom (smoke, integration, contract) | **P0** | Minimum: unit + smoke. Integration and contract added iteratively |
| GitHub Environments | GitHub Environment protection rules | **P0** | Approval gates and environment secrets |
| Performance tests | k6 + S3 (baseline storage) | **P1** | Required before pre-prod promotion is enabled |
| CloudWatch alarms | CloudWatch | **P1** | 5xx rate + p99 latency alarms for canary auto-rollback |
| ALB traffic automation | AWS CLI / ALB weighted target groups | **P1** | Required for prod canary deployment |
| Slack notifications | Slack Incoming Webhooks | **P1** | Deploy status, test results, rollback alerts |
| Jira integration | Jira REST API v3 | **P2** | Auto-created QA tickets with checklists |
| Chaos testing | AWS Fault Injection Simulator (FIS) | **P2** | Validate resilience — run in pre-prod after pipeline is stable |
| Soak test infra | k6 + dedicated runner | **P2** | 2h sustained load — needs long-running GitHub runner or external executor |
