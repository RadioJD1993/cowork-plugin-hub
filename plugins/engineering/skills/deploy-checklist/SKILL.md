---
name: deploy-checklist
description: Generates a pre-deployment checklist and post-deployment verification steps tailored to the user's deployment type. Fires when the user describes an upcoming or in-progress deployment.
---

# Deploy Checklist Skill

When this skill fires, generate a tailored deployment checklist based on the described deployment.

## Checklist Generation

First, determine the deployment type:
- **Application code** (new feature, bug fix, refactor)
- **Database migration** (schema change, data backfill)
- **Infrastructure change** (Terraform, Kubernetes, cloud config)
- **Dependency upgrade** (library, runtime, OS)
- **Configuration change** (env vars, feature flags, secrets)

## Pre-Deploy Checklist

- [ ] All automated tests passing (unit, integration, e2e)
- [ ] Code reviewed and approved
- [ ] Feature flags in place for risky changes
- [ ] Database migrations tested on staging with production-size data
- [ ] Rollback plan documented and tested
- [ ] Deployment window communicated to stakeholders
- [ ] On-call engineer identified and briefed
- [ ] Monitoring dashboards bookmarked and baseline noted
- [ ] Alert thresholds reviewed for the change
- [ ] Dependencies (downstream services) notified if breaking changes

## Deploy Steps

1. Deploy to staging, verify, then production
2. Use canary or blue-green if traffic > 1k rps
3. Monitor error rate, latency, and key business metrics for 15 minutes post-deploy
4. Keep rollback ready for 1 hour

## Post-Deploy Verification

- [ ] Health checks passing
- [ ] Error rate within baseline
- [ ] Key user flows working (smoke test)
- [ ] Logs show no unexpected errors
- [ ] Metrics match expected behavior
- [ ] Stakeholders notified of successful deployment

## Output Format

Return a formatted, copy-paste-ready checklist in Markdown with checkboxes, tailored to the specific deployment type described.
