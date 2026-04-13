<template>
  <section id="projects" class="py-14 px-4 sm:px-6 lg:px-8 mb-20">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-3xl md:text-5xl font-bold text-white mb-12">
        <span class="text-cyan-400 font-mono text-xl">02.</span> Featured
        Projects
      </h2>
      <div class="space-y-24">
        <div
          v-for="(project, index) in projects"
          :key="project.title"
          class="grid md:grid-cols-2 gap-8 items-center"
        >
          <div :class="index % 2 === 1 ? 'md:order-last' : ''">
            <div
              class="relative aspect-video border border-slate-700 rounded-lg bg-slate-800/50 overflow-hidden"
            >
              <template v-if="project.images?.length">
                <img
                  :src="project.images[currentImageIndexes[index]]"
                  :alt="`${project.title} preview ${
                    currentImageIndexes[index] + 1
                  }`"
                  class="h-full w-full object-cover"
                />

                <button
                  type="button"
                  class="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-slate-900/70 p-2 text-white hover:bg-slate-900"
                  @click="prevImage(index)"
                  aria-label="Previous image"
                >
                  <svg
                    class="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <button
                  type="button"
                  class="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-slate-900/70 p-2 text-white hover:bg-slate-900"
                  @click="nextImage(index)"
                  aria-label="Next image"
                >
                  <svg
                    class="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                <div
                  class="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-slate-900/70 px-3 py-1"
                >
                  <button
                    v-for="(_, dotIndex) in project.images"
                    :key="`${project.title}-dot-${dotIndex}`"
                    type="button"
                    class="h-2.5 w-2.5 rounded-full transition-colors"
                    :class="
                      dotIndex === currentImageIndexes[index]
                        ? 'bg-cyan-300'
                        : 'bg-slate-400 hover:bg-slate-200'
                    "
                    :aria-label="`Go to image ${dotIndex + 1}`"
                    @click="goToImage(index, dotIndex)"
                  ></button>
                </div>
              </template>

              <div
                v-else
                class="h-full w-full flex items-center justify-center"
              >
                <svg
                  class="w-20 h-20 text-slate-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div>
            <div class="text-cyan-400 font-mono text-sm mb-2">
              Featured Project
            </div>
            <h3 class="text-3xl font-bold text-white mb-4">
              {{ project.title }}
            </h3>
            <div
              class="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mb-4"
            >
              <p class="text-slate-300">
                {{ project.description }}
              </p>
            </div>
            <div class="flex flex-wrap gap-4 mb-4">
              <span
                v-for="tech in project.tech"
                :key="tech"
                class="text-sm font-mono text-cyan-400"
              >
                {{ tech }}
              </span>
            </div>
            <div class="flex gap-4">
              <a
                v-if="project.github"
                :href="project.github"
                target="_blank"
                rel="noopener noreferrer"
                class="text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                  />
                </svg>
              </a>
              <span
                v-else
                class="text-slate-600"
                title="GitHub link coming soon"
              >
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                  />
                </svg>
              </span>
              <a
                v-if="project.website"
                :href="project.website"
                target="_blank"
                rel="noopener noreferrer"
                class="text-slate-400 hover:text-cyan-400 transition-colors"
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
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const advancedVueComponentImages = [
  new URL(
    "../resources/advanced_vue_components/Screenshot 2026-03-01 at 5.49.38 PM.png",
    import.meta.url
  ).href,
  new URL(
    "../resources/advanced_vue_components/Screenshot 2026-03-01 at 5.50.02 PM.png",
    import.meta.url
  ).href,
  new URL(
    "../resources/advanced_vue_components/Screenshot 2026-03-01 at 5.50.20 PM.png",
    import.meta.url
  ).href,
  new URL(
    "../resources/advanced_vue_components/Screenshot 2026-03-01 at 5.50.43 PM.png",
    import.meta.url
  ).href,
  new URL(
    "../resources/advanced_vue_components/Screenshot 2026-03-01 at 5.50.55 PM.png",
    import.meta.url
  ).href,
  new URL(
    "../resources/advanced_vue_components/Screenshot 2026-03-01 at 5.51.10 PM.png",
    import.meta.url
  ).href,
];

const flowcraftImages = [
  new URL(
    "../resources/flowcraft/Screenshot 2026-03-27 at 12.34.06 PM.png",
    import.meta.url
  ).href,
  new URL(
    "../resources/flowcraft/Screenshot 2026-03-27 at 11.21.59 PM.png",
    import.meta.url
  ).href,
  new URL(
    "../resources/flowcraft/Screenshot 2026-03-27 at 12.43.16 PM.png",
    import.meta.url
  ).href,
];

const projects = [
  {
    title: "Advanced Vue Component Library",
    description:
      "A modern Vue component library with polished, reusable UI patterns and rich interactions. Built to demonstrate production-grade component architecture, composability, and developer-friendly APIs.",
    tech: ["Vue 3", "TypeScript", "Vite", "Storybook", "Vitest"],
    website: "https://jickson-advanced-vue-components.jsp4sbk.workers.dev/",
    github: "",
    images: advancedVueComponentImages,
  },
  {
    title: "FlowCraft - Visual Workflow Builder",
    description:
      "Built a drag-and-drop workflow builder with 11 configurable node types (triggers, actions, conditions, outputs), topological execution simulation with animated state transitions, and persistent workflow storage. Implemented a Zustand-powered state architecture with topological sort-based execution ordering, node configuration panels, and JSON export; deployed on Cloudflare Pages.",
    tech: ["ReactJS", "TypeScript", "React Flow", "Zustand", "Tailwind CSS"],
    website: "https://react-flow-ui-demo.jsp4sbk.workers.dev/",
    github: "",
    images: flowcraftImages,
  },
  {
    title: "Intentional Browsing",
    description:
      "A minimal Chrome extension that helps reduce distracting browsing with supportive controls instead of harsh blocking. Built Hard Mode for full site blocking, Timed Mode for custom usage allowances, an in-page pause overlay, and local-only browser storage with no tracking or external server.",
    tech: ["JavaScript", "Chrome Extension", "Manifest V3", "HTML", "CSS"],
    website: "",
    github: "https://github.com/Jickson-Sam-Paul/Intentional-Browsing",
    images: [],
  },
];

const currentImageIndexes = ref(projects.map(() => 0));

const nextImage = (projectIndex) => {
  const images = projects[projectIndex].images || [];
  if (images.length <= 1) return;
  currentImageIndexes.value[projectIndex] =
    (currentImageIndexes.value[projectIndex] + 1) % images.length;
};

const prevImage = (projectIndex) => {
  const images = projects[projectIndex].images || [];
  if (images.length <= 1) return;
  currentImageIndexes.value[projectIndex] =
    (currentImageIndexes.value[projectIndex] - 1 + images.length) %
    images.length;
};

const goToImage = (projectIndex, imageIndex) => {
  currentImageIndexes.value[projectIndex] = imageIndex;
};
</script>

<style scoped>
.text-cyan-400 {
  color: rgb(103, 232, 249);
}
</style>
