<template>
  <nav
    class="fixed top-0 left-0 right-0 bg-slate-950/90 backdrop-blur-sm border-b border-slate-800 z-50"
  >
    <div class="mx-auto w-full max-w-7xl">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center gap-4">
          <div class="text-2xl font-bold">
            <span class="text-white">Jickson</span
            ><span class="text-cyan-400">.</span>
          </div>
        </div>

        <!-- CENTER: Nav items (ONLY in portfolio mode) -->
        <div v-if="mode === 'portfolio'" class="hidden md:flex space-x-1">
          <button
            v-for="item in navItems"
            :key="item.id"
            @click="scrollToSection(item.id)"
            :class="[
              'px-4 py-2 text-sm font-medium transition-colors rounded-md',
              activeSection === item.id
                ? 'text-cyan-400'
                : 'text-slate-300 hover:text-white',
            ]"
          >
            {{ item.label }}
          </button>
        </div>

        <!-- RIGHT: Nav items-->
        <div
          class="flex items-center bg-slate-900 border border-slate-800 rounded-full p-1 text-sm"
        >
          <button
            @click="emits('set-mode', 'portfolio')"
            :class="[
              'flex items-center gap-1.5 px-3 py-1 rounded-full transition',
              mode === 'portfolio'
                ? 'bg-slate-800 text-cyan-400'
                : 'text-slate-400 hover:text-white',
            ]"
          >
            <Squares2X2Icon class="w-4 h-4" />
            View My Portfolio
          </button>

          <button
            @click="emits('set-mode', 'chat')"
            :class="[
              'flex items-center gap-1.5 px-3 py-1 rounded-full transition',
              mode === 'chat'
                ? 'bg-slate-800 text-cyan-400'
                : 'text-slate-400 hover:text-white',
            ]"
          >
            <ChatBubbleLeftRightIcon class="w-4 h-4" />
            Ask My Portfolio
          </button>
        </div>

        <!-- MOBILE MENU -->
        <button
          v-if="mode === 'portfolio'"
          @click="emits('toggle-mobile-menu')"
          class="md:hidden text-slate-300 hover:text-white p-2"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </div>

    <div
      v-if="mobileMenuOpen && mode === 'portfolio'"
      class="md:hidden fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-sm"
      @click="emits('toggle-mobile-menu')"
    >
      <div class="flex flex-col items-center justify-center h-full space-y-8">
        <button
          v-for="item in navItems"
          :key="item.id"
          @click="scrollToSection(item.id)"
          :class="[
            'text-2xl font-medium transition-colors',
            activeSection === item.id ? 'text-cyan-400' : 'text-slate-300',
          ]"
        >
          {{ item.label }}
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import {
  Squares2X2Icon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/vue/24/outline";

defineProps({
  activeSection: String,
  mobileMenuOpen: Boolean,
  mode: {
    type: String,
    default: "portfolio", // 'portfolio' | 'chat'
  },
});
const emits = defineEmits(["toggle-mobile-menu", "set-mode"]);

const handleModeSwitch = (value) => {
  emits("set-mode", mode === "portfolio" ? "chat" : "portfolio");
};

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (!element) return;

  const offset = 80;
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
};
</script>
