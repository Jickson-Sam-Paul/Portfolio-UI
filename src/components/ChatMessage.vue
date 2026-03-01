<template>
  <div
    :class="[
      'flex w-full animate-fade-in',
      message.role === 'user' ? 'justify-end' : 'justify-start',
    ]"
  >
    <div
      :class="[
        'flex max-w-[80%] items-end gap-2',
        message.role === 'user' ? 'flex-row-reverse' : 'flex-row',
      ]"
    >
      <div class="h-8 w-8 shrink-0">
        <template v-if="showAvatar">
          <img
            v-if="message.role === 'assistant'"
            src="../resources/jickson.png"
            alt="Jickson AI avatar"
            class="h-8 w-8 rounded-full object-cover ring-1 ring-white/20"
          />
          <div
            v-else
            class="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-200 text-xs font-semibold text-cyan-900"
          >
            {{ avatarLabel }}
          </div>
        </template>
      </div>

      <div
        :class="[
          'flex min-w-0 flex-col',
          message.role === 'user' ? 'items-end' : 'items-start',
        ]"
      >
        <span
          v-if="showAvatar"
          class="mb-1 px-1 text-xs font-medium text-gray-400"
        >
          {{ senderName }}
        </span>

        <div
          :class="[
            'rounded-2xl px-4 py-3 break-words',
            bubbleCornerClass,
            message.role === 'user'
              ? 'bg-cyan-600 text-white'
              : 'bg-gray-700 text-gray-100',
          ]"
        >
          <p v-if="message.role === 'user'" class="whitespace-pre-wrap">
            {{ message.content }}
          </p>

          <div
            v-else
            class="prose prose-invert prose-sm max-w-none"
            v-html="renderedMarkdown"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { marked } from "marked";
import type { Message } from "@/utils/storage";

// Configure marked for safe rendering
marked.setOptions({
  breaks: true,
  gfm: true,
});

interface Props {
  message: Message;
  showAvatar: boolean;
}

const props = defineProps<Props>();

const senderName = computed(() =>
  props.message.role === "user" ? "You" : "Jickson AI"
);

const avatarLabel = computed(() =>
  props.message.role === "user" ? "U" : "AI"
);

const bubbleCornerClass = computed(() => {
  if (!props.showAvatar) {
    return "rounded-2xl";
  }
  return props.message.role === "user" ? "rounded-br-md" : "rounded-bl-md";
});

/**
 * Render assistant message content as Markdown
 * User messages are displayed as plain text
 */
const renderedMarkdown = computed(() => {
  if (props.message.role === "user") {
    return props.message.content;
  }
  // marked.parse() is the correct method for marked v11+
  return marked.parse(props.message.content) as string;
});
</script>

<style scoped>
/* Fade-in animation for messages */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}

/* Customize prose styles for dark theme */
:deep(.prose) {
  color: rgb(243 244 246);
}

:deep(.prose p) {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

:deep(.prose p:first-child) {
  margin-top: 0;
}

:deep(.prose p:last-child) {
  margin-bottom: 0;
}

:deep(.prose strong) {
  color: rgb(243 244 246);
  font-weight: 600;
}

:deep(.prose code) {
  background-color: rgba(0, 0, 0, 0.3);
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
}

:deep(.prose pre) {
  background-color: rgba(0, 0, 0, 0.3);
  padding: 0.75rem;
  border-radius: 0.5rem;
  overflow-x: auto;
}

:deep(.prose ul),
:deep(.prose ol) {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  padding-left: 1.5em;
}

:deep(.prose li) {
  margin-top: 0.25em;
  margin-bottom: 0.25em;
}
</style>
