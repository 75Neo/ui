<script setup lang="ts">
import { ChevronDown } from "@lucide/vue";
import {
  Accordion,
  AccordionItem,
  AccordionItemContent,
  AccordionItemIndicator,
  AccordionItemTrigger,
} from "@/components/vue";

const sections = [
  { value: "react", title: "React", body: "Icons are props and the class prop is className." },
  { value: "vue", title: "Vue", body: "Icons are slots and the class prop is class." },
];
</script>

<template>
  <Accordion multiple :default-value="['react', 'vue']">
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
