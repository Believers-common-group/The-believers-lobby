import test from 'node:test';
import assert from 'node:assert/strict';
import { transitionSession } from '../src/admission-policy.mjs';

test('valid Warden denial with River evidence transitions WARDEN_PENDING to DENIED', () => {
  const session = {
    session_id: 'SGL-TEST-000003',
    state: 'WARDEN_PENDING',
    area_id: 'GEN-AREA-001',
    principal_id: 'DM-TEST-003'
  };

  const event = {
    source: 'warden',
    type: 'admission.denied',
    decision_id: 'WDN-TEST-DENY-001',
    river_receipt_id: 'RIV-TEST-DENY-001'
  };

  const next = transitionSession(session, event);

  assert.equal(next.state, 'DENIED');
  assert.equal(next.warden_decision_id, event.decision_id);
  assert.equal(next.river_receipt_id, event.river_receipt_id);
});
