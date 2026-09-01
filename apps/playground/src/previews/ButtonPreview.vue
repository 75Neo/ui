<script setup lang="ts">
import { ArrowRight, Plus } from "@lucide/vue";
import { button, variantValues } from "@75neo/themes";
import { Button } from "@75neo/vue";

const variants = variantValues(button, "variant");
const sizes = variantValues(button, "size");
const colors = variantValues(button, "color");

/*
 * Kept identical to ButtonPreview.tsx on purpose: matching scaffolds are what
 * make a React/Vue divergence visible as a break in the shared rhythm.
 */
const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:items-center @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";
const rowItems = "flex flex-wrap items-center gap-2";
const group = "flex flex-col gap-5";
const rule = "border-muted my-6";
</script>

<template>
  <div class="@container">
    <div :class="group">
      <div v-for="variant in variants" :key="variant" :class="row">
        <p :class="rowLabel" data-identifier>{{ variant }}</p>
        <div :class="rowItems">
          <Button v-for="color in colors" :key="color" :variant="variant" :color="color">
            {{ color }}
          </Button>
        </div>
      </div>
    </div>

    <hr :class="rule" />

    <div :class="group">
      <div :class="row">
        <p :class="rowLabel" data-identifier>size</p>
        <div :class="rowItems">
          <Button v-for="size in sizes" :key="size" :size="size">{{ size }}</Button>
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>state</p>
        <div :class="rowItems">
          <Button>default</Button>
          <Button disabled>disabled</Button>
          <Button loading>loading</Button>
          <Button :leading-icon="Plus">leading</Button>
          <Button :trailing-icon="ArrowRight">trailing</Button>
        </div>
      </div>
    </div>
  </div>
</template>
