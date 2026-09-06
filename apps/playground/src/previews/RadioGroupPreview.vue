<script setup lang="ts">
import { RadioGroup } from "@75neo/vue/radio-group";
import { radioGroupSchema } from "@75neo/themes";

const sizes = radioGroupSchema.size.values;
const colors = radioGroupSchema.color.values;

const items = [
  { value: "email", label: "Email", description: "Mention me by mail." },
  { value: "sms", label: "SMS", description: "Mention me by text." },
];

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";
const rowItems = "min-w-0 max-w-xs";
const group = "flex flex-col gap-5";
const rule = "border-muted my-6";
</script>

<template>
  <div class="@container">
    <div :class="group">
      <div v-for="size in sizes" :key="size" :class="row">
        <p :class="rowLabel" data-identifier>{{ size }}</p>
        <div :class="rowItems">
          <RadioGroup :size="size" :items="items" legend="Notify me" default-value="email" />
        </div>
      </div>
    </div>

    <hr :class="rule" />

    <div :class="group">
      <div :class="row">
        <p :class="rowLabel" data-identifier>colors</p>
        <div :class="[rowItems, 'flex flex-col gap-2']">
          <RadioGroup
            v-for="color in colors"
            :key="color"
            :color="color"
            :items="items"
            default-value="email"
          />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>horizontal</p>
        <div :class="rowItems">
          <RadioGroup :items="items" orientation="horizontal" default-value="email" />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>disabled</p>
        <div :class="rowItems">
          <RadioGroup :items="items" disabled />
        </div>
      </div>
    </div>
  </div>
</template>
