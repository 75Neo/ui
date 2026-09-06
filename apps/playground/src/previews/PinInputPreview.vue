<script setup lang="ts">
import { PinInput } from "@75neo/vue/pin-input";
import { pinInputSchema } from "@75neo/themes";

const sizes = pinInputSchema.size.values;
const colors = pinInputSchema.color.values;

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
          <PinInput :size="size" label="Code" :default-value="['1', '2', '3']" />
        </div>
      </div>
    </div>

    <hr :class="rule" />

    <div :class="group">
      <div :class="row">
        <p :class="rowLabel" data-identifier>colors</p>
        <div :class="[rowItems, 'flex flex-col gap-2']">
          <PinInput
            v-for="color in colors"
            :key="color"
            :color="color"
            :default-value="['1', '2', '3']"
          />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>length</p>
        <div :class="rowItems">
          <PinInput :length="4" label="Four boxes" />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>mask</p>
        <div :class="rowItems">
          <PinInput mask :default-value="['1', '2', '3']" label="Hidden" />
        </div>
      </div>
    </div>
  </div>
</template>
