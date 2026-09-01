<script setup lang="ts">
import { accordion, variantValues } from "@75neo/themes";
import { Accordion } from "@75neo/vue";

const variants = variantValues(accordion, "variant");
const sizes = variantValues(accordion, "size");

const items = [
  { value: "cascade", label: "What settles a class?", content: "Four layers, weakest first." },
  { value: "slots", label: "Why one word per slot?", content: "Recipe, data-slot and ui key." },
  {
    value: "tokens",
    label: "Where does dark mode live?",
    content: "In the tokens, not the classes.",
  },
];

const itemsWithOneOff = items.map((item, i) => (i === 1 ? { ...item, disabled: true } : item));

/*
 * Kept identical to AccordionPreview.tsx on purpose: matching scaffolds are what
 * make a React/Vue divergence visible as a break in the shared rhythm.
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
          <Accordion :items="items" :variant="variant" />
        </div>
      </div>
    </div>

    <hr :class="rule" />

    <div :class="group">
      <div v-for="size in sizes" :key="size" :class="row">
        <p :class="rowLabel" data-identifier>{{ size }}</p>
        <div :class="rowItems">
          <Accordion :items="items" :size="size" />
        </div>
      </div>
    </div>

    <hr :class="rule" />

    <div :class="group">
      <div :class="row">
        <p :class="rowLabel" data-identifier>multiple</p>
        <div :class="rowItems"><Accordion :items="items" multiple /></div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>collapsible</p>
        <div :class="rowItems"><Accordion :items="items" collapsible /></div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>disabled</p>
        <div :class="rowItems"><Accordion :items="items" disabled /></div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>item off</p>
        <div :class="rowItems"><Accordion :items="itemsWithOneOff" /></div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>render</p>
        <div :class="rowItems">
          <Accordion :items="items">
            <template #content="{ item }">
              <code class="font-mono text-xs text-toned" data-identifier>{{ item.value }}</code>
            </template>
          </Accordion>
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>horizontal</p>
        <div :class="rowItems">
          <div class="h-44">
            <Accordion :items="items" orientation="horizontal" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
