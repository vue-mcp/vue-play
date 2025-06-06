export function formatUserDisplayName(user) {
  if (!user || typeof user !== 'object') {
    return 'Unknown User';
  }
  const { firstName, lastName } = user;
  if (!firstName && !lastName) {
    return 'Unknown User';
  }
  return `${firstName || ''} ${lastName || ''}`.trim();
}