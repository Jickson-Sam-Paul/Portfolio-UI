<template>
  <div v-if="visible" class="flex flex-wrap justify-center gap-3">
    <button
      v-for="suggestion in suggestions"
      :key="suggestion"
      class="rounded-full border border-gray-600 bg-gray-800 px-4 py-2 text-sm text-gray-300 transition-colors hover:border-cyan-500 hover:bg-gray-700 hover:text-white"
      @click="handleSuggestionClick(suggestion)"
    >
      {{ suggestion }}
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  visible: boolean;
}

interface Emits {
  (e: "select", suggestion: string): void;
}

defineProps<Props>();

const emit = defineEmits<Emits>();

const suggestions = [
  "Tell me about your experience",
  "What projects have you built?",
  "What tech stack do you specialize in?",
  "What roles are you looking for?",
];

/**
 * Handle suggestion chip click
 * Emits the suggestion text to be sent as a message
 */
const handleSuggestionClick = (suggestion: string) => {
  emit("select", suggestion);
};
</script>
