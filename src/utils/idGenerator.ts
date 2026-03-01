/**
 * Utility for generating unique IDs
 */

/**
 * Generate a unique ID for messages
 * @returns Unique string ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

