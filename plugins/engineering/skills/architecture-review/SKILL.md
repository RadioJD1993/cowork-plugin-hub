---
name: architecture-review
description: Reviews system architecture, design documents, or technical proposals for scalability, reliability, security, and operational concerns. Fires when the user describes or shares an architecture.
triggers:
  - architecture review
  - review this design
  - system design feedback
  - design doc review
  - is this architecture scalable
  - technical design review
  - infrastructure review
  - ADR review
---

# Architecture Review Skill

When this skill fires, perform a structured architecture review of the described or shared system design.

## Review Dimensions

### Scalability
- Identify single points of failure and bottlenecks
- Evaluate horizontal vs. vertical scaling options
- Assess data partitioning and sharding strategy
- Review caching layers and their invalidation strategies

### Reliability & Resilience
- Circuit breakers, retries, and timeout configurations
- Data replication and backup strategy
- Disaster recovery and RTO/RPO targets
- Graceful degradation patterns

### Security
- Authentication and authorization model
- Network segmentation and firewall rules
- Data encryption (at rest and in transit)
- Secrets management approach
- Audit logging

### Operational Concerns
- Observability: metrics, logs, traces
- Deployment strategy (blue/green, canary, rolling)
- Runbook and incident response readiness
- Cost and resource efficiency

### Trade-offs
- Identify the key architectural trade-offs made
- Note what was optimized for and what was sacrificed
- Flag any trade-offs that may cause problems at scale

## Output Format

- **Architecture Summary**: What was built and why (as understood)
- **Strengths**: What the architecture does well
- **Concerns Table**: | Severity | Dimension | Concern | Recommendation |
- **Key Trade-offs**: (bulleted)
- **Verdict**: Approved / Approved with Conditions / Needs Rework
