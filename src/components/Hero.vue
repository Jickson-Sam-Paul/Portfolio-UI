<template>
  <section
    id="home"
    class="min-h-screen flex items-center px-4 sm:px-6 lg:px-8 pt-16"
  >
    <div class="max-w-7xl mx-auto w-full">
      <div class="grid md:grid-cols-5 gap-12 items-center">
        <div class="md:col-span-3">
          <div class="font-mono text-cyan-400 text-2xl mb-6 h-6 cursor-pointer">
            {{ typedText }}<span class="cursor">|</span>
          </div>
          <h1 class="text-3xl md:text-5xl font-bold text-white mb-5">
            Jickson Sam Paul
          </h1>
          <p class="text-3xl md:text-4xl text-slate-300 mb-5">
            Frontend Engineer
          </p>
          <p class="text-lg text-slate-400 mb-8 max-w-xl leading-10">
            I specialise in Vue 3, React, and TypeScript, with hands-on
            experience building enterprise workflows, AI-assisted interfaces,
            and high-impact internal tools.
          </p>
          <div class="flex flex-wrap gap-4">
            <button
              @click="emits('toggle-chat-mode', 'chat')"
              class="px-8 py-3 bg-cyan-400 text-slate-950 fo4nt-medium rounded-md hover:bg-cyan-300 transition-colors"
            >
              Chat With My Portfolio
            </button>
            <button
              @click="scrollToSection('projects')"
              class="px-8 py-3 border border-cyan-400 text-cyan-400 font-medium rounded-md hover:bg-cyan-400/10 transition-colors"
            >
              View My Work
            </button>
          </div>
        </div>
        <div class="hidden md:flex md:col-span-2 items-center justify-end">
          <div class="relative flex justify-center items-center">
            <div
              class="absolute inset-0 rounded-2xl bg-cyan-500/15 blur-3xl"
            ></div>
            <img
              src="../resources/jickson.png"
              alt="Jickson Sam Paul"
              class="relative z-10 w-[320px] h-[400px] object-cover rounded-2xl border border-white/10 shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const phrases = [
  "Hello, I am",
  "Bonjour, I am",
  "Hallo, I am",
  "こんにちは, I am",
  "வணக்கம், I am",
  "नमस्ते, I am",
  "നമസ്കാരം, I am",
  "నమస్తే, I am",
];

const typedText = ref("");
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

const TYPING_SPEED = 80;
const DELETING_SPEED = 50;
const HOLD_AFTER_TYPE = 1200;
const HOLD_AFTER_DELETE = 300;

const typeLoop = () => {
  const currentPhrase = phrases[phraseIndex];
  if (isDeleting) {
    if (charIndex > 0) {
      typedText.value = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      setTimeout(typeLoop, DELETING_SPEED);
    } else {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typeLoop, HOLD_AFTER_DELETE);
    }
  } else if (charIndex < currentPhrase.length) {
    typedText.value = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    setTimeout(typeLoop, TYPING_SPEED);
  } else {
    isDeleting = true;
    setTimeout(typeLoop, HOLD_AFTER_TYPE);
  }
};

onMounted(typeLoop);

onUnmounted(() => {});

const emits = defineEmits(["toggle-chat-mode"]);
const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    const offset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};
</script>
<style>
.cursor {
  display: inline-block;
  margin-left: 2px;
  animation: blink 1s steps(1) infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
