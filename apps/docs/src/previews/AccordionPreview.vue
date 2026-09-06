<script setup lang="ts">
import {
  Accordion,
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
} from "@75neo/vue/accordion";
</script>

<template>
  <Accordion :default-value="['shipping']">
    <AccordionItem value="shipping">
      <AccordionItemTrigger>Shipping</AccordionItemTrigger>
      <AccordionItemContent>Two to four working days.</AccordionItemContent>
    </AccordionItem>
    <AccordionItem value="returns">
      <AccordionItemTrigger>Returns</AccordionItemTrigger>
      <AccordionItemContent>Thirty days, no questions.</AccordionItemContent>
    </AccordionItem>
  </Accordion>
</template>
