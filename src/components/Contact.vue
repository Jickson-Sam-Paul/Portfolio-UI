<template>
  <section id="contact" class="py-14 px-4 sm:px-6 lg:px-8">
    <div class="max-w-2xl mx-auto text-center">
      <div class="text-cyan-400 font-mono mb-4">04. What's Next?</div>
      <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">
        Get In Touch
      </h2>
      <p class="text-lg text-slate-300 mb-8">
        I'm currently looking for new opportunities. Whether you have a question
        or just want to say hi, my inbox is always open. I'll try my best to get
        back to you!
      </p>
      <button
        class="px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-medium rounded-md hover:bg-cyan-400/10 transition-colors text-lg"
      >
        Say Hello
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted } from "vue";
import { useChatStore } from "@/store/chat.store";

const chatStore = useChatStore();

const messagesContainerRef = ref<HTMLElement | null>(null);

onMounted(() => {
  chatStore.initialize();
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
</script>

<style scoped>
.text-cyan-400 {
  color: rgb(103, 232, 249);
}
</style>
