<script setup lang="ts">
import { ref } from "vue";
import { AngleSlider, Theme } from "@75neo/vue";

const denseMarkers = Array.from({ length: 12 }, (_, i) => i * 30);

// `<script setup>` runs once per story, so this ref is not shared between them.
const value = ref(90);
</script>

<template>
  <Stories title="AngleSlider" :component="AngleSlider">
    <Story title="Default">
      <div class="flex flex-col items-center gap-8 py-8">
        <AngleSlider label="Rotation" :default-value="45" />
      </div>
    </Story>

    <Story title="Controlled">
      <div class="flex flex-col items-center gap-4 py-8">
        <AngleSlider v-model="value" label="Rotation" />
        <div class="text-muted text-sm">
          Value: <span class="text-default font-mono font-semibold">{{ value }}°</span>
        </div>
      </div>
    </Story>

    <Story title="Sizes">
      <div class="flex items-end gap-8 py-8">
        <AngleSlider size="sm" label="Small" :default-value="30" />
        <AngleSlider size="md" label="Medium" :default-value="30" />
        <AngleSlider size="lg" label="Large" :default-value="30" />
      </div>
    </Story>

    <Story title="Markers">
      <div class="flex items-center gap-8 py-8">
        <AngleSlider label="No markers" :default-value="75" :markers="[]" />
        <AngleSlider label="Custom" :default-value="90" :markers="[0, 90, 180, 270]" />
        <AngleSlider label="Dense" :default-value="45" :markers="denseMarkers" />
      </div>
    </Story>

    <Story title="States">
      <div class="flex items-center gap-8 py-8">
        <AngleSlider label="Disabled" :default-value="120" disabled />
        <AngleSlider label="Read only" :default-value="200" read-only />
        <AngleSlider label="Invalid" :default-value="10" invalid />
      </div>
    </Story>

    <Story title="Slots">
      <div class="flex flex-col items-center gap-8 py-8">
        <AngleSlider :default-value="90" size="lg" :markers="[0, 90, 180, 270]">
          <template #label><span class="text-primary">Custom label slot</span></template>
          <template #valueText="{ value: angle }">
            <span class="tabular-nums">{{ angle }}° rotation</span>
          </template>
        </AngleSlider>
        <p class="text-muted text-xs">
          <code>#label</code> and <code>#valueText</code> slots — <code>#valueText</code> receives
          <code>{ value, valueAsDegree }</code>
        </p>
      </div>
    </Story>

    <Story title="Themed">
      <div class="flex flex-col items-center gap-4 py-8">
        <AngleSlider label="Default" :default-value="45" />
        <Theme :ui="{ 'angle-slider': { control: 'ring-2 ring-primary' } }">
          <AngleSlider label="Themed" :default-value="45" />
        </Theme>
      </div>
    </Story>
  </Stories>
</template>
