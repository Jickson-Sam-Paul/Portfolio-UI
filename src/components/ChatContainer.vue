<template>
  <div class="flex h-full flex-col">
    <div
      ref="messagesContainerRef"
      class="chat-container flex-1 overflow-y-auto py-6"
    >
      <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          v-for="(message, index) in chatStore.allMessages"
          :key="message.id"
          :class="[
            index === 0
              ? 'mt-0'
              : isFirstInRoleGroup(index)
                ? 'mt-4'
                : 'mt-1',
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

const isFirstInRoleGroup = (index: number): boolean => {
  if (index === 0) return true;
  const current = chatStore.allMessages[index];
  const previous = chatStore.allMessages[index - 1];
  return current.role !== previous.role;
};
</script>
