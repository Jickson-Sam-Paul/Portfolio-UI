<template>
  <div class="bg-slate-900 min-h-screen">
    <Navigation
      :active-section="activeSection"
      :mobile-menu-open="mobileMenuOpen"
      :mode="mode"
      @toggle-mobile-menu="mobileMenuOpen = !mobileMenuOpen"
      @set-mode="handleSetMode"
    />
    <div v-show="mode === 'portfolio'">
      <Hero @toggle-chat-mode="handleSetMode" />
      <About />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </div>
    <ChatContainer class="pt-16" v-show="mode === 'chat'" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { storeToRefs } from "pinia";
import Navigation from "./components/Navigation.vue";
import Hero from "./components/Hero.vue";
import About from "./components/About.vue";
import Projects from "./components/Projects.vue";
import Experience from "./components/Experience.vue";
import Contact from "./components/Contact.vue";
import Footer from "./components/Footer.vue";
import ChatContainer from "./components/ChatContainer.vue";
import { useChatStore } from "./store/chat.store";

const chatStore = useChatStore();

const { getChatAvailable } = storeToRefs(chatStore);

const mobileMenuOpen = ref(false);
const activeSection = ref("home");
const mode = ref("portfolio");
const pollCheck = ref(null);

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

const handleSetMode = (value) => {
  mode.value = value;
};

const handleScroll = () => {
  const sections = navItems.map((item) => item.id);
  const scrollPosition = window.scrollY + 100;

  for (const section of sections) {
    const element = document.getElementById(section);
    if (element) {
      const offsetTop = element.offsetTop;
      const offsetBottom = offsetTop + element.offsetHeight;
      if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
        activeSection.value = section;
        break;
      }
    }
  }
};

const startHealthPolling = () => {
  if (pollCheck.value) return;

  pollCheck.value = setInterval(async () => {
    await chatStore.checkAPIHealth();

    if (getChatAvailable.value && pollCheck.value) {
      clearInterval(pollCheck.value);
      pollCheck.value = null;
    }
  }, 5000);
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  if (!pollCheck.value) {
    startHealthPolling();
  }
  // Check if the API is supported by the browser
  if ("speechSynthesis" in window) {
    // Create a new SpeechSynthesisUtterance object with the text you want to speak
    const utterance = new SpeechSynthesisUtterance(
      "Hello, this is your browser speaking."
    );

    // (Optional) Customize properties
    // utterance.voice = voices[0]; // Choose a specific voice
    // utterance.pitch = 1.5;
    // utterance.rate = 1.2;

    // Speak the utterance
    window.speechSynthesis.speak(utterance);
  } else {
    console.error("Text-to-speech not supported by your browser.");
  }
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
