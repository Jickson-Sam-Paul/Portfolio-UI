<template>
  <div class="w-full border-t border-gray-700 bg-gray-900 py-4">
    <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex items-end gap-3">
        <textarea
          ref="textareaRef"
          v-model="inputText"
          :disabled="isTyping"
          :placeholder="placeholder"
          class="flex-1 resize-none rounded-lg border border-gray-600 bg-gray-800 px-4 py-3 text-gray-100 placeholder-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50"
          rows="1"
          @keydown="handleKeyDown"
          @input="handleInput"
        ></textarea>
        <button
          :disabled="!canSend"
          class="rounded-lg bg-cyan-600 px-6 py-3 font-medium text-white transition-colors hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50"
          @click="handleSend"
        >
          Send
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from "vue";

interface Props {
  isTyping?: boolean;
  placeholder?: string;
}

interface Emits {
  (e: "send", message: string): void;
}

const props = withDefaults(defineProps<Props>(), {
  isTyping: false,
  placeholder: "Ask me about my work, skills, or projects…",
});

const emit = defineEmits<Emits>();

const inputText = ref("");
const textareaRef = ref<HTMLTextAreaElement | null>(null);

const canSend = computed(() => {
  return inputText.value.trim().length > 0 && !props.isTyping;
});

const adjustTextareaHeight = async () => {
  await nextTick();
  if (textareaRef.value) {
    textareaRef.value.style.height = "auto";
    textareaRef.value.style.height = `${textareaRef.value.scrollHeight}px`;
  }
};

const handleInput = () => {
  adjustTextareaHeight();
};

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    if (canSend.value) {
      handleSend();
    }
  }
};

const handleSend = () => {
  if (!canSend.value) return;

  const message = inputText.value.trim();
  if (message) {
    emit("send", message);
    inputText.value = "";
    adjustTextareaHeight();
  }
};

defineExpose({
  focus: () => {
    textareaRef.value?.focus();
  },
});
</script>
