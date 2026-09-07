<script setup lang="ts">
import { ChevronDown } from "@lucide/vue";
import Accordion from "@/registry/vue/ui/accordion/Accordion.vue";
import AccordionItem from "@/registry/vue/ui/accordion/AccordionItem.vue";
import AccordionItemContent from "@/registry/vue/ui/accordion/AccordionItemContent.vue";
import AccordionItemIndicator from "@/registry/vue/ui/accordion/AccordionItemIndicator.vue";
import AccordionItemTrigger from "@/registry/vue/ui/accordion/AccordionItemTrigger.vue";

const sections = [
  {
    value: "install",
    title: "How do I install a component?",
    body: "Point the shadcn CLI at the registry and run add. The source lands in your own repository.",
  },
  {
    value: "theme",
    title: "Can I change the colours?",
    body: "Override the --ui-* properties in your stylesheet. Every component follows without being touched.",
  },
  {
    value: "upgrade",
    title: "What happens on an upgrade?",
    body: "Re-running the CLI overwrites the file, so keep your edits in git and review the diff.",
  },
];
</script>

<template>
  <Accordion collapsible :default-value="['install']">
    <AccordionItem v-for="section in sections" :key="section.value" :value="section.value">
      <AccordionItemTrigger>
        {{ section.title }}
        <AccordionItemIndicator>
          <ChevronDown />
        </AccordionItemIndicator>
      </AccordionItemTrigger>
      <AccordionItemContent>{{ section.body }}</AccordionItemContent>
    </AccordionItem>
  </Accordion>
</template>
