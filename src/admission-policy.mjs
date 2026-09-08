export function transitionSession(session, event) {
  if (session?.state === 'WARDEN_PENDING' && event?.source === 'lineme') {
    return { ...session };
  }

  return { ...session };
}
