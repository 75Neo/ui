<script setup lang="ts">
import { ColorPicker, parseColor } from "@75neo/vue/color-picker";
import { colorPickerSchema } from "@75neo/themes";

const sizes = colorPickerSchema.size.values;

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
          <ColorPicker :size="size" label="Brand" :default-value="parseColor('#3b82f6')" />
        </div>
      </div>
    </div>

    <hr :class="rule" />

    <div :class="group">
      <div :class="row">
        <p :class="rowLabel" data-identifier>alpha</p>
        <div :class="rowItems">
          <ColorPicker label="Brand" alpha :default-value="parseColor('#3b82f680')" />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>swatches</p>
        <div :class="rowItems">
          <ColorPicker
            label="Brand"
            :default-value="parseColor('#3b82f6')"
            :swatches="['#ef4444', '#22c55e', '#3b82f6']"
          />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>eye dropper</p>
        <div :class="rowItems">
          <ColorPicker label="Brand" eye-dropper :default-value="parseColor('#3b82f6')" />
        </div>
      </div>
    </div>
  </div>
</template>
