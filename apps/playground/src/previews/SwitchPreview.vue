<script setup lang="ts">
import { Switch } from "@75neo/vue/switch";
import { switchSchema } from "@75neo/themes";

const sizes = switchSchema.size.values;
const colors = switchSchema.color.values;

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";
const rowItems = "flex min-w-0 flex-col gap-2";
const group = "flex flex-col gap-5";
const rule = "border-muted my-6";
</script>

<template>
  <div class="@container">
    <div :class="group">
      <div v-for="size in sizes" :key="size" :class="row">
        <p :class="rowLabel" data-identifier>{{ size }}</p>
        <div :class="rowItems">
          <Switch :size="size" label="Notifications" description="Email me about mentions." />
        </div>
      </div>
    </div>

    <hr :class="rule" />

    <div :class="group">
      <div :class="row">
        <p :class="rowLabel" data-identifier>colors</p>
        <div :class="rowItems">
          <Switch
            v-for="color in colors"
            :key="color"
            :color="color"
            :label="color"
            default-checked
          />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>checked</p>
        <div :class="rowItems">
          <Switch label="On" default-checked />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>loading</p>
        <div :class="rowItems">
          <Switch label="Working" loading />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>disabled</p>
        <div :class="rowItems">
          <Switch label="Off" disabled />
        </div>
      </div>
    </div>
  </div>
</template>
