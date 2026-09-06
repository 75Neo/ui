<script setup lang="ts">
import {
  Accordion,
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
} from "@75neo/vue/accordion";
import { accordionSchema } from "@75neo/themes";
import { Star } from "@lucide/vue";

const variants = accordionSchema.variant.values;
const sizes = accordionSchema.size.values;

const rows = [
  {
    value: "cascade",
    label: "What settles a class?",
    content: "One layer: the call-site class over the part classes.",
  },
  {
    value: "slots",
    label: "Why one word per slot?",
    content: "The export, the file and the data-slot share it.",
  },
  {
    value: "tokens",
    label: "Where does dark mode live?",
    content: "In the tokens, not the classes.",
  },
];

/*
 * Both adapters render this scaffold, so the two stages line up row for row and
 * any divergence between React and Vue shows as a break in the rhythm rather
 * than as something you have to hunt for.
 */
const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";
const rowItems = "min-w-0";
const group = "flex flex-col gap-5";
const rule = "border-muted my-6";
</script>

<template>
  <div class="@container">
    <div :class="group">
      <div v-for="variant in variants" :key="variant" :class="row">
        <p :class="rowLabel" data-identifier>{{ variant }}</p>
        <div :class="rowItems">
          <Accordion :variant="variant">
            <AccordionItem v-for="item in rows" :key="item.value" :value="item.value">
              <AccordionItemTrigger>{{ item.label }}</AccordionItemTrigger>
              <AccordionItemContent>{{ item.content }}</AccordionItemContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>

    <hr :class="rule" />

    <div :class="group">
      <div v-for="size in sizes" :key="size" :class="row">
        <p :class="rowLabel" data-identifier>{{ size }}</p>
        <div :class="rowItems">
          <Accordion :size="size">
            <AccordionItem v-for="item in rows" :key="item.value" :value="item.value">
              <AccordionItemTrigger>{{ item.label }}</AccordionItemTrigger>
              <AccordionItemContent>{{ item.content }}</AccordionItemContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>

    <hr :class="rule" />

    <div :class="group">
      <div :class="row">
        <p :class="rowLabel" data-identifier>multiple</p>
        <div :class="rowItems">
          <Accordion multiple>
            <AccordionItem v-for="item in rows" :key="item.value" :value="item.value">
              <AccordionItemTrigger>{{ item.label }}</AccordionItemTrigger>
              <AccordionItemContent>{{ item.content }}</AccordionItemContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>collapsible</p>
        <div :class="rowItems">
          <Accordion collapsible>
            <AccordionItem v-for="item in rows" :key="item.value" :value="item.value">
              <AccordionItemTrigger>{{ item.label }}</AccordionItemTrigger>
              <AccordionItemContent>{{ item.content }}</AccordionItemContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>disabled</p>
        <div :class="rowItems">
          <Accordion disabled>
            <AccordionItem v-for="item in rows" :key="item.value" :value="item.value">
              <AccordionItemTrigger>{{ item.label }}</AccordionItemTrigger>
              <AccordionItemContent>{{ item.content }}</AccordionItemContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>icons</p>
        <div :class="rowItems">
          <Accordion>
            <AccordionItem value="star">
              <AccordionItemTrigger :leading-icon="Star" :trailing-icon="Star">
                Both slots
              </AccordionItemTrigger>
              <AccordionItemContent>
                The trigger owns its indicator; both props are glyphs, not parts.
              </AccordionItemContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>horizontal</p>
        <div :class="rowItems">
          <div class="h-44">
            <Accordion orientation="horizontal">
              <AccordionItem v-for="item in rows" :key="item.value" :value="item.value">
                <AccordionItemTrigger>{{ item.label }}</AccordionItemTrigger>
                <AccordionItemContent>{{ item.content }}</AccordionItemContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
