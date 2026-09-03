<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { progress, variantValues } from "@75neo/themes";
import { Progress } from "@75neo/vue";

const sizes = variantValues(progress, "size");
const colors = variantValues(progress, "color");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-center @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

// A bar that moves, so the range's own transition can be seen doing it.
const done = ref(12);
let timer: ReturnType<typeof setInterval> | undefined;

onMounted(() => {
  timer = setInterval(() => {
    done.value = done.value >= 100 ? 0 : done.value + 11;
  }, 1200);
});

onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>

<template>
  <div class="@container flex flex-col gap-6">
    <div v-for="size in sizes" :key="size" :class="row">
      <p :class="rowLabel" data-identifier>{{ size }}</p>
      <Progress :size="size" :default-value="62" />
    </div>

    <hr class="border-muted" />

    <div v-for="color in colors" :key="color" :class="row">
      <p :class="rowLabel" data-identifier>{{ color }}</p>
      <Progress :color="color" :default-value="62" />
    </div>

    <hr class="border-muted" />

    <div :class="row">
      <p :class="rowLabel" data-identifier>labelled</p>
      <Progress label="Uploading" show-value :default-value="45" />
    </div>

    <!-- Null is the indeterminate state: nothing to measure, so the range sweeps. -->
    <div :class="row">
      <p :class="rowLabel" data-identifier>indeterminate</p>
      <Progress label="Working" :model-value="null" />
    </div>

    <div :class="row">
      <p :class="rowLabel" data-identifier>moving</p>
      <Progress v-model="done" label="Restoring" show-value color="success" />
    </div>

    <!--
      Ark writes out how far along the bar is, not the raw number, so a `max` other than
      a hundred still reads as a percentage.
    -->
    <div :class="row">
      <p :class="rowLabel" data-identifier>out of twelve</p>
      <Progress label="Step 7 of 12" show-value :model-value="7" :max="12" color="info" />
    </div>

    <hr class="border-muted" />

    <div :class="row">
      <p :class="rowLabel" data-identifier>vertical</p>
      <div class="flex h-40 items-stretch gap-4">
        <Progress orientation="vertical" :default-value="62" />
        <Progress orientation="vertical" color="warning" :default-value="28" />
        <Progress orientation="vertical" color="error" :model-value="null" />
      </div>
    </div>
  </div>
</template>
