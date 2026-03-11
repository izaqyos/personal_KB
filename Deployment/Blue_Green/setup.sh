#!/bin/bash
# Run from repo root to create the directory structure
# Then copy each file content from the Claude artifacts

mkdir -p docs
mkdir -p .github/workflows
mkdir -p .github/actions/slack-notify
mkdir -p .github/actions/jira-qa-ticket
mkdir -p infra/terraform/modules/blue-green-alb
mkdir -p infra/terraform/modules/canary-alarms
mkdir -p infra/terraform/environments/prod
mkdir -p perf

# Create empty files
touch docs/PIPELINE-SPEC.md
touch .github/workflows/build-and-deploy-dev.yml
touch .github/workflows/promote-to-env.yml
touch .github/workflows/release-to-prod.yml
touch .github/actions/slack-notify/action.yml
touch .github/actions/jira-qa-ticket/action.yml
touch infra/terraform/modules/blue-green-alb/main.tf
touch infra/terraform/modules/canary-alarms/main.tf
touch infra/terraform/environments/prod/main.tf
touch perf/load-test.js
touch perf/soak-test.js
touch perf/compare-baseline.js

echo "✅ Directory structure + empty files created."
echo ""
echo "Next: copy each artifact's content from Claude into the matching file."
