<template>
  <div v-if="isTyping" class="flex w-full justify-start animate-fade-in">
    <div class="max-w-[70%] rounded-2xl bg-gray-700 px-4 py-3">
      <div class="flex items-center gap-1.5">
        <span
          v-for="i in 3"
          :key="i"
          :class="[
            'h-2 w-2 rounded-full bg-gray-400',
            `animate-bounce-${i}`,
          ]"
          :style="{ animationDelay: `${(i - 1) * 0.15}s` }"
        ></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  isTyping: boolean
}

defineProps<Props>()
</script>

<style scoped>
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

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
    opacity: 0.7;
  }
  50% {
    transform: translateY(-8px);
    opacity: 1;
  }
}

.animate-bounce-1,
.animate-bounce-2,
.animate-bounce-3 {
  animation: bounce 1.4s ease-in-out infinite;
}
</style>

