/**
 * @deprecated This composable has been replaced by the Pinia store (store/chat.store.ts)
 * Please use useChatStore from '@/store/chat.store' instead
 *
 * This file is kept for backwards compatibility but should not be used in new code.
 */

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

/**
 * @deprecated Use useChatStore from '@/store/chat.store' instead
 */
export function useChat() {
  console.warn(
    "useChat composable is deprecated. Please use useChatStore from '@/store/chat.store' instead."
  );

  // Return empty implementation to prevent runtime errors
  return {
    messages: { value: [] },
    isTyping: { value: false },
    hasMessages: { value: false },
    sendMessage: async () => {},
    clearMessages: () => {},
  };
}
