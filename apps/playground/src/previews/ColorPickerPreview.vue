<script setup lang="ts">
import { ref } from "vue";
import { colorPicker, variantValues } from "@75neo/themes";
import { ColorPicker, parseColor } from "@75neo/vue";

const sizes = variantValues(colorPicker, "size");
const colors = variantValues(colorPicker, "color");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

const presets = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#a855f7", "#64748b"];

const color = ref(parseColor("#3b82f6"));
</script>

<template>
  <div class="@container flex flex-col gap-6">
    <div v-for="size in sizes" :key="size" :class="row">
      <p :class="rowLabel" data-identifier>{{ size }}</p>
      <ColorPicker :size="size" :default-value="parseColor('#eb5e41')" />
    </div>

    <hr class="border-muted" />

    <!--
      The variant is the accent, not the value: it reaches the focus halos and the ring
      on the selected preset, so tab through one to see it.
    -->
    <div v-for="accent in colors" :key="accent" :class="row">
      <p :class="rowLabel" data-identifier>{{ accent }}</p>
      <ColorPicker
        :color="accent"
        size="sm"
        :default-value="parseColor('#8b5cf6')"
        :swatches="presets"
      />
    </div>

    <hr class="border-muted" />

    <div class="flex flex-wrap items-start gap-8">
      <ColorPicker
        label="Alpha and eyedropper"
        alpha
        eye-dropper
        :default-value="parseColor('rgba(59, 130, 246, 0.6)')"
      />
      <ColorPicker
        label="No hex field"
        :show-input="false"
        :default-value="parseColor('#22c55e')"
      />
      <ColorPicker label="Disabled" disabled :default-value="parseColor('#eab308')" />
    </div>

    <hr class="border-muted" />

    <!-- Controlled: the value is a Color object, so nothing reparses a string on drag. -->
    <div class="flex flex-wrap items-start gap-8">
      <ColorPicker v-model="color" label="Controlled" alpha :swatches="presets" />
      <output class="font-mono text-sm text-toned">{{ color.toString("hex") }}</output>
    </div>
  </div>
</template>
