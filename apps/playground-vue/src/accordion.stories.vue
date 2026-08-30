<script setup lang="ts">
import { Accordion, Theme } from "@75neo/vue";
import { Sparkles } from "@lucide/vue";

const items = [
  {
    label: "What is 75NeoUI?",
    content:
      "75NeoUI harnesses Ark UI, Tailwind CSS and Tailwind Variants to offer a refined set of tools for building sophisticated, accessible and highly performant interfaces.",
    value: "item-1",
  },
  {
    label: "How do I customize the theme?",
    content:
      "Use CSS variables like --ui-primary, --ui-radius and the Theme provider with ui slot overrides per component.",
    value: "item-2",
  },
  {
    label: "Is it accessible?",
    content:
      "Yes — built on top of Ark UI (Zag.js) with correct ARIA, keyboard navigation and focus management.",
    value: "item-3",
  },
];
</script>

<template>
  <Stories title="Accordion" :component="Accordion">
    <Story title="Default">
      <div class="w-full max-w-xl">
        <Accordion :items="items" :default-value="['item-1']" collapsible />
      </div>
    </Story>

    <Story title="Multiple">
      <div class="w-full max-w-xl">
        <Accordion :items="items" :default-value="['item-1', 'item-2']" type="multiple" />
      </div>
    </Story>

    <Story title="Disabled">
      <div class="w-full max-w-xl">
        <Accordion :items="items" :default-value="['item-1']" collapsible disabled />
      </div>
    </Story>

    <Story title="Slots">
      <div class="w-full max-w-xl">
        <Accordion :items="items" :default-value="['item-1']" collapsible>
          <template #leading="{ index }">
            <Sparkles :data-index="index" />
          </template>
          <template #content="{ item }">
            <div class="flex flex-col gap-2">
              <p>{{ item.content }}</p>
              <span class="text-muted text-xs">Rendered through the content slot</span>
            </div>
          </template>
        </Accordion>
        <p class="text-muted mt-2 text-xs">
          <code>#leading</code> and <code>#content</code> scoped slots — the Vue counterpart of
          React's <code>leading</code> / <code>content</code> render props
        </p>
      </div>
    </Story>

    <Story title="Themed">
      <div class="w-full max-w-xl">
        <Theme
          :ui="{
            accordion: { root: 'rounded-lg border border-default p-2', trigger: 'text-primary' },
          }"
        >
          <Accordion :items="items" :default-value="['item-1']" collapsible />
        </Theme>
        <p class="text-muted mt-2 text-xs">
          Themed via <code>Theme</code> — root border and primary trigger
        </p>
      </div>
    </Story>
  </Stories>
</template>
