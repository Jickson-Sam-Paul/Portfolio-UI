import { defineStore } from "pinia";
import type { Message } from "@/utils/storage";
import {
  saveMessages,
  loadMessages,
  clearMessages as clearStorage,
} from "@/utils/storage";
import { generateId } from "@/utils/idGenerator";
import { sendChat, checkHealth } from "@/services/chat.service";
import { readStream } from "@/utils/streamReader";

const initialState = {
  messages: [] as Message[],
  isTyping: false,
  error: null as string | null,
  chatAvailable: false,
};

export const useChatStore = defineStore("chat", {
  state: () => ({ ...initialState }),

  getters: {
    allMessages: (state): Message[] => state.messages,
    hasMessages: (state): boolean => state.messages.length > 0,
    getChatAvailable: (state): boolean => state.chatAvailable,
  },

  actions: {
    initialize() {
      this.messages = loadMessages();
    },
    persistMessages() {
      saveMessages(this.messages);
    },
    addUserMessage(content: string): void {
      if (!content.trim()) return;

      const message: Message = {
        id: generateId(),
        role: "user",
        content: content.trim(),
      };

      this.messages.push(message);
    },
    createAssistantMessage(): Message {
      const message: Message = {
        id: generateId(),
        role: "assistant",
        content: "",
      };

      this.messages.push(message);
      return message;
    },
    appendAssistantChunk(messageId: string, chunk: string): void {
      const message = this.messages.find((msg) => msg.id === messageId);
      if (message?.role === "assistant") {
        message.content += chunk;
      }
    },
    setLoadingState(isLoading: boolean): void {
      this.isTyping = isLoading;
    },
    setError(error: string | null): void {
      this.error = error;
    },
    async checkAPIHealth() {
      try {
        this.chatAvailable = await checkHealth();
      } catch {
        this.chatAvailable = false;
      }
    },
    handleStreamError(messageId: string): void {
      const message = this.messages.find((msg) => msg.id === messageId);
      if (message?.role === "assistant") {
        message.content = "The AI assistant is currently unavailable.";
      }
      this.setLoadingState(false);
    },
    async sendMessage(userContent: string): Promise<void> {
      this.addUserMessage(userContent);

      this.setLoadingState(true);
      this.setError(null);

      const assistantMessage = this.createAssistantMessage();
      const assistantMessageId = assistantMessage.id;

      try {
        const messagesForApi = this.messages.filter(
          (msg) => msg.id !== assistantMessageId
        );

        const stream = await sendChat(messagesForApi);

        await readStream(stream, (chunk: string) => {
          this.appendAssistantChunk(assistantMessageId, chunk);
        });

        this.setLoadingState(false);
      } catch (error) {
        this.handleStreamError(assistantMessageId);
        this.setError(error instanceof Error ? error.message : "Unknown error");
      }
    },
    clearMessages(): void {
      this.messages = [];
      clearStorage();
      this.setError(null);
    },
  },
});
