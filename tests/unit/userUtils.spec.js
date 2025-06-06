import { test, expect } from '@playwright/experimental-ct-vue';
import { formatUserDisplayName } from '../src/utils/userUtils.js';

test.describe('UserUtils', () => {
  test('formats full user name correctly', async () => {
    const user = { firstName: 'Test', lastName: 'User' };
    const result = formatUserDisplayName(user);
    expect(result).toBe('Test User');
  });

  test('handles only first name', async () => {
    const user = { firstName: 'Test' };
    const result = formatUserDisplayName(user);
    expect(result).toBe('Test');
  });

  test('handles only last name', async () => {
    const user = { lastName: 'User' };
    const result = formatUserDisplayName(user);
    expect(result).toBe('User');
  });

  test('returns Unknown User for empty object', async () => {
    const user = {};
    const result = formatUserDisplayName(user);
    expect(result).toBe('Unknown User');
  });

  test('returns Unknown User for null input', async () => {
    const result = formatUserDisplayName(null);
    expect(result).toBe('Unknown User');
  });

  test('returns Unknown User for non-object input', async () => {
    const result = formatUserDisplayName('invalid');
    expect(result).toBe('Unknown User');
  });
});