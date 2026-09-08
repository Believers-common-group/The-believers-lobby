import test from 'node:test';
import assert from 'node:assert/strict';
import { transitionSession } from '../src/admission-policy.mjs';

test('valid Synnergyze routing with River evidence transitions ADMITTED to ROUTED', () => {
  const session = {
    session_id: 'SGL-TEST-000005',
    state: 'ADMITTED',
    area_id: 'GEN-AREA-001',
    principal_id: 'DM-TEST-005',
    warden_decision_id: 'WDN-TEST-APPROVE-005',
    river_receipt_id: 'RIV-TEST-ADMISSION-005'
  };

  const event = {
    source: 'synnergyze',
    type: 'routing.completed',
    workflow_id: 'SYN-WF-TEST-005',
    destination_area_id: 'GEN-AREA-001',
    river_receipt_id: 'RIV-TEST-ROUTING-005'
  };

  const next = transitionSession(session, event);

  assert.equal(next.state, 'ROUTED');
  assert.equal(next.workflow_id, event.workflow_id);
  assert.equal(next.destination_area_id, event.destination_area_id);
  assert.equal(next.routing_river_receipt_id, event.river_receipt_id);
});
