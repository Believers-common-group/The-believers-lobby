import test from 'node:test';
import assert from 'node:assert/strict';
import { transitionSession } from '../src/admission-policy.mjs';

test('valid Warden more-information decision with River evidence transitions WARDEN_PENDING to MORE_INFORMATION_REQUIRED', () => {
  const session = {
    session_id: 'SGL-TEST-000004',
    state: 'WARDEN_PENDING',
    area_id: 'GEN-AREA-001',
    principal_id: 'DM-TEST-004'
  };

  const event = {
    source: 'warden',
    type: 'admission.more_information_required',
    decision_id: 'WDN-TEST-MORE-001',
    river_receipt_id: 'RIV-TEST-MORE-001'
  };

  const next = transitionSession(session, event);

  assert.equal(next.state, 'MORE_INFORMATION_REQUIRED');
  assert.equal(next.warden_decision_id, event.decision_id);
  assert.equal(next.river_receipt_id, event.river_receipt_id);
});
