<script setup lang="ts">
import { Toggle } from "@75neo/vue/toggle";
import { toggleSchema } from "@75neo/themes";

const variants = toggleSchema.variant.values;
const colors = toggleSchema.color.values;
const sizes = toggleSchema.size.values;

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";
const rowItems = "flex min-w-0 flex-wrap items-center gap-2";
const group = "flex flex-col gap-5";
const rule = "border-muted my-6";
</script>

<template>
  <div class="@container">
    <div :class="group">
      <div v-for="variant in variants" :key="variant" :class="row">
        <p :class="rowLabel" data-identifier>{{ variant }}</p>
        <div :class="rowItems">
          <Toggle :variant="variant" default-pressed>{{ variant }}</Toggle>
          <Toggle :variant="variant">{{ variant }}</Toggle>
        </div>
      </div>
    </div>

    <hr :class="rule" />

    <div :class="group">
      <div :class="row">
        <p :class="rowLabel" data-identifier>colors</p>
        <div :class="rowItems">
          <Toggle v-for="color in colors" :key="color" :color="color" default-pressed>
            {{ color }}
          </Toggle>
        </div>
      </div>

      <div v-for="size in sizes" :key="size" :class="row">
        <p :class="rowLabel" data-identifier>{{ size }}</p>
        <div :class="rowItems">
          <Toggle :size="size" default-pressed>Save</Toggle>
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>disabled</p>
        <div :class="rowItems">
          <Toggle disabled>Save</Toggle>
        </div>
      </div>
    </div>
  </div>
</template>
