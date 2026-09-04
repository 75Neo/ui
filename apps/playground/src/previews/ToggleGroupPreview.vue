<script setup lang="ts">
import { ref, type Component } from "vue";
import { toggleGroup, variantValues, type ToggleGroupItem } from "@75neo/themes";
import { ToggleGroup } from "@75neo/vue";
import { AlignCenter, AlignLeft, AlignRight, Bold, Italic, Underline } from "@lucide/vue";

const variants = variantValues(toggleGroup, "variant");

const formatting: ToggleGroupItem<Component>[] = [
  { value: "bold", icon: Bold },
  { value: "italic", icon: Italic },
  { value: "underline", icon: Underline },
];

const alignment: ToggleGroupItem<Component>[] = [
  { value: "left", label: "Left", icon: AlignLeft },
  { value: "center", label: "Center", icon: AlignCenter },
  { value: "right", label: "Right", icon: AlignRight },
];

const value = ref<string[]>(["center"]);

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-center @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";
</script>

<template>
  <div class="@container flex flex-col gap-6">
    <div :class="row">
      <p :class="rowLabel" data-identifier>single</p>
      <ToggleGroup :items="formatting" :default-value="['italic']" aria-label="Text formatting" />
    </div>

    <div :class="row">
      <p :class="rowLabel" data-identifier>multiple</p>
      <ToggleGroup
        :items="formatting"
        multiple
        :default-value="['bold', 'underline']"
        aria-label="Text formatting"
      />
    </div>

    <div v-for="variant in variants" :key="variant" :class="row">
      <p :class="rowLabel" data-identifier>{{ variant }}</p>
      <ToggleGroup
        :variant="variant"
        :items="alignment"
        :default-value="['center']"
        :aria-label="`${variant} alignment`"
      />
    </div>

    <hr class="border-muted" />

    <div :class="row">
      <p :class="rowLabel" data-identifier>vertical</p>
      <ToggleGroup
        orientation="vertical"
        :items="alignment"
        :default-value="['left']"
        aria-label="Vertical alignment"
      />
    </div>

    <div :class="row">
      <p :class="rowLabel" data-identifier>stuck</p>
      <div class="flex flex-wrap items-center gap-4">
        <ToggleGroup v-model="value" :items="alignment" aria-label="Controlled alignment" />
        <p class="text-sm text-muted">Controlled: {{ value.join(", ") || "nothing" }}</p>
        <ToggleGroup
          :items="alignment"
          disabled
          :default-value="['center']"
          aria-label="Disabled alignment"
        />
      </div>
    </div>
  </div>
</template>
