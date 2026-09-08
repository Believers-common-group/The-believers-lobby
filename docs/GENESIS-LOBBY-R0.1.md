# GENESIS-LOBBY-R0.1

Status: TDD-RED contract freeze

## Purpose

Genesis Lobby is the governed enterprise reception and routing surface behind Sgate. It discovers Genesis Areas, creates bounded arrival sessions, requests Warden admission, records evidence through River, and routes admitted sessions into Synnergyze workflows.

LineMe is an optional reception adapter only. It is not Genesis, identity, authority, or the system of record.

## Authority boundaries

- Sgate: public entrance.
- Genesis Lobby: reception, discovery, session creation, routing coordination.
- DigitalMe: principal identity.
- Warden: sole admission authority.
- Genesis Registry: area/address authority.
- GitHub repository: governed capability/code territory.
- Synnergyze: orchestration/workflow execution.
- River: evidence and continuity.
- LineMe: optional scheduling/queue/notification adapter.
- WhatsApp: external communication channel only.

## Required session state machine

ARRIVED -> DISCOVERING -> DESTINATION_SELECTED -> IDENTIFIED -> ADMISSION_REQUESTED -> WARDEN_PENDING

From WARDEN_PENDING:
- DENIED
- MORE_INFORMATION_REQUIRED
- ADMITTED

From ADMITTED:
- ROUTED -> ACTIVE -> CLOSED

## Invariant: LineMe has zero admission authority

No LineMe callback, webhook, appointment state, queue state, message, or external reference may cause a session to transition into ADMITTED. Only a valid Warden decision can cause WARDEN_PENDING -> ADMITTED.

## Initial API contract

- GET /v1/lobby/areas
- POST /v1/lobby/sessions
- POST /v1/lobby/sessions/{session_id}/admission
- POST /v1/lobby/sessions/{session_id}/assistance

## Repository discovery

Each participating repository may publish a `.genesis/area.json` manifest conforming to `.genesis/area.schema.json`. The Lobby must not hard-code a finite list of repositories or areas.

## R0.1 acceptance gates

1. At least one repository can publish a valid Genesis Area manifest.
2. Lobby discovery can consume manifests without hard-coded UI entries.
3. Each arrival receives a unique Sgate session identifier.
4. Principal identity and destination Area are recorded independently.
5. Warden decision is required before routing.
6. River evidence is required for admission and routing.
7. LineMe failure cannot stop Genesis admission.
8. WhatsApp must not carry authority-bearing secrets.
9. One Area can contain multiple principals and workspaces without new repositories.
10. Adding repository #201 requires no lobby-code change.

## TDD-RED target

The first executable test asserts that a LineMe-originated event cannot produce ADMITTED. The test is intentionally RED until the Lobby state-transition module is implemented.