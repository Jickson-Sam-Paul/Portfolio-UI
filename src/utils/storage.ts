/**
 * Utility for localStorage persistence
 * Handles saving and loading messages from localStorage
 */

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const STORAGE_KEY = "portfolio-chat-messages";

/**
 * Save messages to localStorage
 * @param messages - Array of messages to save
 */
export function saveMessages(messages: Message[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch (error) {
    console.error("Failed to save messages to localStorage:", error);
  }
}

/**
 * Load messages from localStorage
 * @returns Array of messages or empty array if none found
 */
export function loadMessages(): Message[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Failed to load messages from localStorage:", error);
  }
  return [];
}

/**
 * Clear all messages from localStorage
 */
export function clearMessages(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear messages from localStorage:", error);
  }
}

