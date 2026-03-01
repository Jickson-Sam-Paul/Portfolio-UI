<template>
  <section
    id="experience"
    class="py-14 px-4 sm:px-6 lg:px-8 bg-slate-900/50 mb-20"
  >
    <div class="max-w-7xl mx-auto">
      <h2 class="text-3xl md:text-5xl font-bold text-white mb-12">
        <span class="text-cyan-400 font-mono text-xl">03.</span> Experience
      </h2>
      <div class="space-y-12">
        <div
          v-for="(exp, index) in experiences"
          :key="exp.company"
          class="relative pl-8 border-l-2 border-slate-700 hover:border-cyan-400 transition-colors"
        >
          <div
            class="absolute -left-2 top-0 w-4 h-4 rounded-full bg-cyan-400"
          ></div>
          <div class="mb-2">
            <div class="flex flex-wrap items-baseline gap-2 mb-1">
              <h3 class="text-2xl font-medium text-white">{{ exp.role }}</h3>
              <span class="text-cyan-400 font-bold">@{{ exp.company }}</span>
            </div>
            <div class="text-sm text-slate-400">{{ exp.period }}</div>
          </div>
          <ul class="space-y-2">
            <li
              v-for="point in exp.points"
              :key="point"
              class="flex gap-3 text-slate-300"
            >
              <span class="text-cyan-400 flex-shrink-0">▹</span>
              <span v-html="point"></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const experiences = [
  {
    role: "Frontend Engineer",
    company: "Intellect Design Arena",
    period: "Feb 2024 – Present",
    points: [
      `Worked on <span class="text-cyan-300">Purple Fabric</span>, building a GenAI Studio interface using Vue 3 with dynamic, <span class="text-cyan-300">configuration-driven layouts</span> and modular UI architecture.`,

      `Built rich conversational interfaces capable of rendering <span class="text-cyan-300">markdown</span> content including tables, code blocks, and media, focusing on performance and UX stability using markdown-it.`,

      `Developed reusable frontend components leveraging browser APIs such as <span class="text-cyan-300">Speech-to-Text</span> to support accessibility and voice-driven interactions.`,

      "Designed interactive chat interfaces for AI-driven products, enabling non-technical users to work with generic AI agents effectively.",

      `Implemented benchmarking and evaluation screens to compare AI model configurations using <span class="text-cyan-300">dynamic rendering techniques</span>.`,

      `Built file upload flows with progress tracking and cancellation support using <span class="text-cyan-300">axios cancel token</span>, improving reliability and user feedback.`,

      `Integrated analytics and session replay tools like <span class="text-cyan-300">Microsoft Clarity</span> and <span class="text-cyan-300">Google Tag Manager</span> to observe user behavior and identify frontend issues.`,

      `Contributed to no-code workflow orchestration interfaces using <span class="text-cyan-300">React</span> and <span class="text-cyan-300">React Flow</span> for business-facing automation tools.`,
    ],
  },
  {
    role: "Frontend Engineer",
    company: "Intellect Design Arena",
    period: "Jul 2023 – Feb 2024",
    points: [
      `Worked on <span class="text-cyan-300">Magic Submission</span>, integrating <span class="text-cyan-300">AG Grid</span> into Vue 3 modules to display and manage real-time insurance submission data.`,

      "Built collaborative UI features including threaded notes, editing, and timestamps to support team workflows.",

      `Participated in migrating <span class="text-cyan-300">legacy Vue 2 components</span> and UI libraries to <span class="text-cyan-300">Vue 3</span>, improving maintainability and long-term scalability.`,

      "Actively collaborated with QA and backend teams to stabilize user workflows and resolve UI issues across internal tools.",
    ],
  },
];
</script>

<style scoped>
.text-cyan-400 {
  color: rgb(103, 232, 249);
}
</style>
