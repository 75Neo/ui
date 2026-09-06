<script setup lang="ts">
import { Progress } from "@75neo/vue/progress";
import { progressSchema } from "@75neo/themes";

const sizes = progressSchema.size.values;
const colors = progressSchema.color.values;

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";
const rowItems = "flex min-w-0 flex-wrap items-center gap-2";
const group = "flex flex-col gap-5";
const rule = "border-muted my-6";
</script>

<template>
  <div class="@container">
    <div :class="group">
      <div v-for="size in sizes" :key="size" :class="row">
        <p :class="rowLabel" data-identifier>{{ size }}</p>
        <div :class="rowItems">
          <Progress :size="size" label="Uploading" :default-value="42" />
        </div>
      </div>
    </div>

    <hr :class="rule" />

    <div :class="group">
      <div :class="row">
        <p :class="rowLabel" data-identifier>colors</p>
        <div :class="rowItems">
          <Progress v-for="color in colors" :key="color" :color="color" :default-value="66" />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>circle</p>
        <div :class="rowItems">
          <Progress circle label="Syncing" :default-value="75" />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>indeterminate</p>
        <div :class="rowItems">
          <Progress label="Waiting" :value="null" />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>no value</p>
        <div :class="rowItems">
          <Progress label="Quiet" :default-value="30" :show-value="false" />
        </div>
      </div>
    </div>
  </div>
</template>
