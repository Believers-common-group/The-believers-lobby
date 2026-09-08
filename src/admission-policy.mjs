export function transitionSession(session, event) {
  if (session?.state !== 'WARDEN_PENDING') {
    return { ...session };
  }

  if (event?.source === 'warden' &&
      event?.type === 'admission.approved' &&
      event?.decision_id &&
      event?.river_receipt_id) {
    return {
      ...session,
      state: 'ADMITTED',
      warden_decision_id: event.decision_id,
      river_receipt_id: event.river_receipt_id
    };
  }

  return { ...session };
}
