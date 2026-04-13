<template>
  <div class="flex h-full flex-col">
    <div
      v-if="assistantNoticeVisible || chatStore.hasMessages"
      class="mx-auto mt-3 flex w-full max-w-7xl items-start gap-3 px-4 sm:px-6 lg:px-8"
    >
      <div
        v-if="assistantNoticeVisible"
        class="flex min-w-0 flex-1 items-start gap-3 rounded-lg bg-amber-400/10 px-3 py-2"
      >
        <svg
          class="mt-0.5 h-4 w-4 flex-none text-amber-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
          />
        </svg>

        <p class="min-w-0 flex-1 text-sm leading-5 text-amber-100">
          Responses are context-aware but may not always be accurate - verify
          critical details.
        </p>

        <button
          type="button"
          class="rounded p-1 text-amber-200 transition-colors hover:bg-amber-400/10 hover:text-amber-100"
          aria-label="Hide AI assistant notice"
          @click="assistantNoticeVisible = false"
        >
          <svg
            class="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <button
        v-if="chatStore.hasMessages"
        type="button"
        class="ml-auto flex-none rounded-lg border border-slate-700 px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-red-400/50 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
        :disabled="chatStore.isTyping"
        @click="handleClearChat"
      >
        Clear chat
      </button>
    </div>

    <div
      ref="messagesContainerRef"
      class="chat-container flex-1 overflow-y-auto py-6"
    >
      <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          v-for="(message, index) in chatStore.allMessages"
          :key="message.id"
          :class="[
            index === 0 ? 'mt-0' : isFirstInRoleGroup(index) ? 'mt-4' : 'mt-1',
          ]"
        >
          <TypingIndicator
            v-if="
              !message?.content?.length &&
              message.role === 'assistant' &&
              index === chatStore.allMessages?.length - 1
            "
            :is-typing="true"
          />
          <ChatMessage
            v-else-if="message.role === 'user' || message.role === 'assistant'"
            :message="message"
            :show-avatar="isFirstInRoleGroup(index)"
          />
        </div>
      </div>
    </div>

    <div v-if="!chatStore.hasMessages" class="pb-4">
      <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SuggestionChips visible @select="handleSuggestionSelect" />
      </div>
    </div>

    <ChatInput
      ref="chatInputRef"
      :is-typing="chatStore.isTyping"
      @send="handleSend"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted } from "vue";
import { useChatStore } from "@/store/chat.store";
import ChatMessage from "./ChatMessage.vue";
import ChatInput from "./ChatInput.vue";
import TypingIndicator from "./TypingIndicator.vue";
import SuggestionChips from "./SuggestionChips.vue";

const chatStore = useChatStore();

const messagesContainerRef = ref<HTMLElement | null>(null);
const chatInputRef = ref<InstanceType<typeof ChatInput> | null>(null);
const assistantNoticeVisible = ref(true);

onMounted(() => {
  chatStore.initialize();
  scrollToBottom();
});

watch(
  () => chatStore.allMessages,
  () => {
    chatStore.persistMessages();
  },
  { deep: true }
);

const scrollToBottom = async () => {
  await nextTick();
  if (messagesContainerRef.value) {
    messagesContainerRef.value.scrollTop =
      messagesContainerRef.value.scrollHeight;
  }
};

watch(
  () => chatStore.allMessages.length,
  () => {
    scrollToBottom();
  }
);

watch(
  () => chatStore.isTyping,
  (newValue) => {
    if (!newValue) {
      scrollToBottom();
    }
  }
);

const handleSend = async (content: string) => {
  await chatStore.sendMessage(content);
};

const handleSuggestionSelect = async (suggestion: string) => {
  await handleSend(suggestion);
};

const handleClearChat = () => {
  chatStore.clearMessages();
};

const isFirstInRoleGroup = (index: number): boolean => {
  if (index === 0) return true;
  const current = chatStore.allMessages[index];
  const previous = chatStore.allMessages[index - 1];
  return current.role !== previous.role;
};
</script>
