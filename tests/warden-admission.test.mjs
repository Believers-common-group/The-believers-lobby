import test from 'node:test';
import assert from 'node:assert/strict';
import { transitionSession } from '../src/admission-policy.mjs';

test('valid Warden approval with River evidence transitions WARDEN_PENDING to ADMITTED', () => {
  const session = {
    session_id: 'SGL-TEST-000002',
    state: 'WARDEN_PENDING',
    area_id: 'GEN-AREA-001',
    principal_id: 'DM-TEST-002'
  };

  const event = {
    source: 'warden',
    type: 'admission.approved',
    decision_id: 'WDN-TEST-000001',
    river_receipt_id: 'RIV-TEST-000001'
  };

  const next = transitionSession(session, event);

  assert.equal(next.state, 'ADMITTED');
  assert.equal(next.warden_decision_id, 'WDN-TEST-000001');
  assert.equal(next.river_receipt_id, 'RIV-TEST-000001');
});
