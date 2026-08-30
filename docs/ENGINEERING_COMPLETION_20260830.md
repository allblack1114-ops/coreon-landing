# COREON Safety AX Agent — Engineering Completion Snapshot

Date: 2026-08-30
Status: **Engineering Completion in progress / verified evidence only**

## Product definition

COREON Safety AX Agent is positioned as an **Industrial Safety Execution & Assurance Platform**.

Canonical safety execution:

`Detect → Verify → Assign → Control → Prove → Reassess → Close → (when required) Reopen`

The external website must only claim what the product actually performs. AI and public safety data remain supporting intelligence; controlled Human Review retains authority over final safety judgment, risk acceptance and closure.

## Verified engineering state frozen today

- Closed-loop / fail-closed safety execution architecture retained.
- Human Authority, residual-risk gate, evidence integrity, authorized closure and reopen principles retained.
- Legal Compliance Matrix verification cycle completed and frozen for the reviewed obligations.
- Separate Supabase staging project and production boundary established.
- Supply-chain security evidence hardened: SBOM contract aligned, dependency audit and security automation evidence passed in the reviewed local verification.
- Staging tenant/RLS isolation runtime evidence: PASS.
- Staging session refresh / rotation runtime evidence: PASS.
- MFA enrollment/challenge executor: CODE/LOCAL PASS with probe wiring regression PASS.
- Password recovery two-phase PREPARE/FINALIZE contract: CODE/LOCAL PASS.
- Password recovery failure atomic cleanup: PASS; synthetic users are deleted when recovery preparation fails.
- Real recovery email delivery to controlled COREON mailbox confirmed.
- Supabase Auth Site URL / redirect allowlist corrected from localhost toward the staging application boundary; final recovery callback validation remains pending.
- Rate-limit executor: real Staging LIVE PASS with HTTP 429 observed, productionTouched=false and residueCount=0.
- Rate-limit probe wiring: CODE/LOCAL PASS after relocation regression fix.

## Intentionally not declared complete

The following must not be represented as fully completed until independent/live evidence is closed:

- Full backup/restore and disaster-recovery drill.
- Final password-recovery callback/password-change live completion.
- Final SMTP/recovery/redirect convergence evidence chain.
- Remaining Staging Acceptance checks not yet live-executed.
- External/independent penetration or V&V evidence where required.
- Explicit production promotion and post-deploy verification for engineering changes.

## Homepage convergence rules

1. **Program = execution engine. Website = external product interface.**
2. Website promises only behavior supported by the product and evidence.
3. Public pricing numbers are removed; customer journey is `Contact Sales → scope/pilot/contract → account → entitlement → Workspace`.
4. Internal billing/contract/entitlement authority is not deleted merely because public pricing is removed.
5. KOSHA public data is presented as reference intelligence, not as an automatic safety decision.
6. Avoid claims such as “nuclear certified”, “aviation certified”, “DO-178C certified” or “world-best certified”. Accurate external language is that the architecture applies safety-critical engineering principles.
7. Maintain legal boundaries: no automatic legal-liability judgment and no guarantee of zero accidents or prevention outcome.
8. Korean and English homepages must express the same product architecture and safety boundaries.

## 2026-08-30 homepage release scope

- Reframed Hero around trustworthy safety execution and closure rather than generic AI safety management.
- Added explicit Human Authority, Fail-Closed Closure, Evidence Traceability, Residual Risk and Reopen language.
- Added executive-language view: Critical Open Risks, Overdue Actions, Evidence Gaps, Reopened Cases and Governance Gaps.
- Retained KOSHA Knowledge / Evidence / Freshness framing with reference-only and human-review boundaries.
- Added engineering-assurance section without overstating certification.
- Removed public numeric pricing and pricing offers from homepage structured data.
- Replaced public pricing pages with Contact Sales / Pilot / Demo routes and marked them `noindex`.
- Removed pricing URLs from sitemap.
- Added cache-busting version for homepage client-hardening script.

## Freeze principle

No engineering or marketing item is promoted to PASS solely because code or copy exists. Where runtime, field, third-party or production evidence is required, the item remains pending until that evidence is observed and recorded.
