<template>
  <section id="about" class="py-14 px-4 sm:px-6 lg:px-8 bg-slate-900/50 mb-20">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-3xl md:text-5xl font-bold text-white mb-10">
        <span class="text-cyan-400 font-mono text-xl">01.</span> About Me
      </h2>

      <div class="max-w-7xl mb-16">
        <p class="text-lg text-slate-300 leading-relaxed mb-5">
          I’m a frontend engineer with
          <span class="text-cyan-300">2.5+ years</span> of hands-on experience
          building scalable, production-ready web applications for enterprise
          products and fast-moving teams. I focus on crafting clean UI, robust
          frontend architecture, and performance-focused user experiences.
        </p>

        <p class="text-lg text-slate-300 leading-relaxed mb-5">
          I’ve worked extensively with
          <span class="text-cyan-300"
            >Vue 2, Vue 3, React, and TypeScript,</span
          >
          contributing to complex systems involving AI workflows, document
          automation, dashboards, and real-time interfaces. I focus on writing
          clean, maintainable code and designing interfaces that stay intuitive
          as they scale.
        </p>

        <p class="text-lg text-slate-300 leading-relaxed">
          Beyond shipping features, I actively focus on deep JavaScript mastery,
          modern browser APIs, and frontend system design. I enjoy breaking down
          complex problems, improving developer experience, and continuously
          sharpening my technical depth.
        </p>
      </div>

      <div class="flex items-center gap-4 mb-16">
        <div class="h-px flex-1 bg-slate-800"></div>
        <span class="text-sm uppercase tracking-wider text-slate-400">
          Skills in Practice
        </span>
        <div class="h-px flex-1 bg-slate-800"></div>
      </div>

      <div class="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <div class="grid grid-cols-2 gap-3">
            <button
              v-for="skill in skills"
              :key="skill.id"
              @click="activeSkill = skill"
              :class="[
                'px-4 py-4 border rounded-md transition-all duration-200 flex items-center justify-center gap-2',
                activeSkill.id === skill.id
                  ? 'border-cyan-400 bg-slate-800 text-cyan-300'
                  : 'border-slate-700 text-slate-300 hover:bg-slate-800/50 hover:border-cyan-400',
              ]"
            >
              <span>{{ skill.label }}</span>
            </button>
          </div>
        </div>

        <div
          class="relative border border-slate-800 bg-slate-900/60 rounded-lg p-6"
        >
          <div class="mb-4 flex items-center gap-3">
            <div v-if="activeSkill.icon?.length" class="flex gap-1">
              <img
                v-for="value in activeSkill.icon"
                :src="value"
                :alt="activeSkill.label"
                class="w-6 h-6"
              />
            </div>
            <h3 class="text-2xl font-medium text-white flex items-center gap-3">
              {{ activeSkill.label }}
              <span
                class="text-xs text-slate-400 border border-slate-700 px-2 py-0.5 rounded-md"
              >
                {{ activeSkill.level }}
              </span>
            </h3>
          </div>

          <div class="space-y-3">
            <p
              v-for="(line, index) in activeSkill.content"
              :key="index"
              class="text-base text-slate-300 leading-relaxed"
            >
              {{ line }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import vueIcon from "../resources/vue.svg";
import jsIcon from "../resources/js.svg";
import tsIcon from "../resources/ts.svg";
import reactIcon from "../resources/react.svg";
import htmlIcon from "../resources/html.svg";
import cssIcon from "../resources/css.svg";
import scssIcon from "../resources/scss.svg";
import libIcon from "../resources/lib.svg";
import pythonIcon from "../resources/python.svg";
import performanceIcon from "../resources/optimisation.svg";

const skills = [
  {
    id: "js",
    label: "JavaScript",
    level: "Primary Stack",
    content: [
      "JavaScript is the foundation of how I structure and control frontend behavior.",
      "I focus on async flows, closures, and execution order to keep logic predictable at scale.",
      "In practice, I’ve worked with Web APIs such as Speech-to-Text and IndexedDB, implemented debouncing using closures, and handled low-level DOM manipulation when needed.",
    ],
    icon: [jsIcon],
  },
  {
    id: "vue",
    label: "Vue.js",
    level: "Primary Stack",
    content: [
      "Vue.js is my primary framework, with most of my professional experience built on it.",
      "Built reusable, well-scoped components and validated them in isolation using Storybook before integrating them across multiple applications.",
      "My experience includes Vue 2 → Vue 3 migrations, Composition API with Pinia and Vuetify, and building Vue 3 micro-apps from scratch with complex features.",
    ],
    icon: [vueIcon],
  },
  {
    id: "react",
    label: "React",
    level: "Strong Experience",
    content: [
      "Hands-on experience building complex, interactive interfaces using React.",
      "Built a visual workflow orchestration UI for Purple Fabric assets using React and React Flow, enabling no-code process configuration for business users.",
      "Applied hooks like useReducer and other core hooks to simplify state management and optimize performance.",
    ],
    icon: [reactIcon],
  },
  {
    id: "typescript",
    label: "TypeScript",
    level: "Strong Experience",
    content: [
      "I use TypeScript to add strong type safety and structure to large frontend codebases.",
      "I’ve written reusable, well-typed utility classes to handle IndexedDB interactions and postMessage-based communication.",
      "I apply strict type validation to API payloads and responses to catch errors early and keep data flow predictable.",
    ],
    icon: [tsIcon],
  },
  {
    id: "webdev",
    label: "HTML · CSS · SCSS",
    level: "Core Strength",
    content: [
      "I use strong HTML fundamentals and scalable CSS/SCSS to solve UI problems beyond library defaults.",
      "I prioritize accessibility, layout stability, and clean style boundaries in large applications.",
      "For example, during AG Grid implementations, I handled unsupported layout and styling requirements using structured markup and scoped SCSS overrides without breaking grid behavior.",
    ],
    icon: [htmlIcon, cssIcon, scssIcon],
  },
  {
    id: "performance",
    label: "Performance · UX",
    level: "Engineering Focus",
    content: [
      "I focus on frontend performance and perceived speed in real-world user scenarios.",
      "My work includes render optimization, bundle size control, and maintaining responsive interactions.",
      "I’ve implemented optimizations such as markdown-based rendering for heavy text parsing and virtual scrolling to handle large datasets without degrading UX.",
    ],
    icon: [performanceIcon],
  },
  {
    id: "tools",
    label: "Tools · Libraries",
    level: "Daily Workflow",
    content: [
      "Hands-on experience with AI-assisted development using Copilot, Cursor, and Kiro, including agentic workflows and prompt engineering.",
      "Built ReAct and RAG agents for real use cases such as logging work to JIRA and internal automation.",
      "I've Worked with tools like ESLint, SonarQube, Vitest, Git, and libraries including Vuetify, React Flow, AG Grid, Prism.js, Markdown-it, Axios, and Split.js.",
    ],
    icon: [libIcon],
  },
  {
    id: "python",
    label: "Python",
    level: "Project Experience",
    content: [
      "I’ve used Python to build backend services as part of personal and experimental projects.",
      "Built FastAPI services for generating embeddings using open-source embedding models and implementing RAG pipelines.",
      "Developed lightweight backend services to support streaming responses for AI-driven workflows.",
    ],
    icon: [pythonIcon],
  },
];

const activeSkill = ref(skills[0]);
</script>

<style scoped>
.text-cyan-400 {
  color: rgb(103, 232, 249);
}
</style>
