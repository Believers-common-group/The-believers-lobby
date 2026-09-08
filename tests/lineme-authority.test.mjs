import test from 'node:test';
import assert from 'node:assert/strict';

async function loadAdmissionPolicy() {
  try {
    return await import('../src/admission-policy.mjs');
  } catch (error) {
    assert.fail(`Genesis admission policy is not implemented yet: ${error.message}`);
  }
}

test('LineMe-originated events cannot transition WARDEN_PENDING to ADMITTED', async () => {
  const { transitionSession } = await loadAdmissionPolicy();

  const session = {
    session_id: 'SGL-TEST-000001',
    state: 'WARDEN_PENDING',
    area_id: 'GEN-AREA-001',
    principal_id: 'DM-TEST-001'
  };

  const event = {
    source: 'lineme',
    type: 'appointment.confirmed',
    external_reference: 'LM-TEST-001'
  };

  const next = transitionSession(session, event);

  assert.notEqual(
    next.state,
    'ADMITTED',
    'LineMe is a reception adapter and must have zero admission authority'
  );
});
