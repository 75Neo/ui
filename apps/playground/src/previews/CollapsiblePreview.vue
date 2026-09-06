<script setup lang="ts">
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@75neo/vue/collapsible";
import { collapsibleSchema } from "@75neo/themes";

const variants = collapsibleSchema.variant.values;
const sizes = collapsibleSchema.size.values;

const body =
  "A named value for a design decision, so the decision is made once and spent everywhere.";

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";
const rowItems = "min-w-0 max-w-sm";
const group = "flex flex-col gap-5";
const rule = "border-muted my-6";
</script>

<template>
  <div class="@container">
    <div :class="group">
      <div v-for="variant in variants" :key="variant" :class="row">
        <p :class="rowLabel" data-identifier>{{ variant }}</p>
        <div :class="rowItems">
          <Collapsible :variant="variant" :default-open="true">
            <CollapsibleTrigger>What is a design token?</CollapsibleTrigger>
            <CollapsibleContent>{{ body }}</CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </div>

    <hr :class="rule" />

    <div :class="group">
      <div v-for="size in sizes" :key="size" :class="row">
        <p :class="rowLabel" data-identifier>{{ size }}</p>
        <div :class="rowItems">
          <Collapsible :size="size" :default-open="true">
            <CollapsibleTrigger>What is a design token?</CollapsibleTrigger>
            <CollapsibleContent>{{ body }}</CollapsibleContent>
          </Collapsible>
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>disabled</p>
        <div :class="rowItems">
          <Collapsible disabled>
            <CollapsibleTrigger>What is a design token?</CollapsibleTrigger>
            <CollapsibleContent>{{ body }}</CollapsibleContent>
          </Collapsible>
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>show more</p>
        <div :class="rowItems">
          <Collapsible :collapsed-height="40">
            <CollapsibleTrigger>Read the whole answer</CollapsibleTrigger>
            <CollapsibleContent>{{ body }}</CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </div>
  </div>
</template>
