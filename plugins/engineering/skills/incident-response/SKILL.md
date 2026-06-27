---
name: incident-response
description: Guides engineers through a structured incident response process when an outage, degradation, or security event is detected. Fires on incident-related language.
triggers:
  - incident
  - outage
  - site is down
  - service degraded
  - production issue
  - p0
  - p1
  - on-call
  - incident response
  - postmortem
  - root cause
---

# Incident Response Skill

When this skill fires, guide the user through the incident response lifecycle.

## Phase 1: Triage (First 5 Minutes)

Ask or assess:
1. **What is the impact?** (Users affected, services down, data at risk)
2. **When did it start?** (First alert or report time)
3. **What changed recently?** (Deployments, config changes, infra changes in the last 24h)
4. **Severity classification**: P0 (total outage), P1 (major degradation), P2 (partial degradation), P3 (minor)

## Phase 2: Contain

- Identify the blast radius — what else might be affected
- Suggest immediate containment actions (rollback, feature flag off, traffic reroute, rate limiting)
- Confirm who is incident commander and who is comms lead

## Phase 3: Diagnose

- Walk through the 5 Whys or fault tree analysis
- Identify the root cause category: code bug, config error, infrastructure failure, dependency failure, or human error
- Request relevant logs, metrics, or traces to confirm

## Phase 4: Resolve

- Suggest the fix with rollback or forward-fix recommendation
- Confirm resolution criteria (what does “resolved” look like?)
- Verify monitoring shows recovery

## Phase 5: Postmortem (After Resolution)

Generate a postmortem draft with:
- **Incident Summary** (1 paragraph)
- **Timeline** (bullet list, times and events)
- **Root Cause**
- **Impact**
- **What Went Well**
- **What Went Wrong**
- **Action Items** (owner, due date, priority)

## Edge Cases

- If a security incident is suspected (breach, unauthorized access), immediately flag to escalate to security team before proceeding.
- For multi-team incidents, suggest a shared incident channel and a single source of truth document.
