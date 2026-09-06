<script setup lang="ts">
import { PasswordInput } from "@75neo/vue/password-input";
import { passwordInputSchema } from "@75neo/themes";

const sizes = passwordInputSchema.size.values;
const colors = passwordInputSchema.color.values;

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
          <PasswordInput :size="size" label="Password" placeholder="••••••" />
        </div>
      </div>
    </div>

    <hr :class="rule" />

    <div :class="group">
      <div :class="row">
        <p :class="rowLabel" data-identifier>colors</p>
        <div :class="[rowItems, 'flex flex-col gap-2']">
          <PasswordInput v-for="color in colors" :key="color" :color="color" placeholder="••••••" />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>visible</p>
        <div :class="rowItems">
          <PasswordInput placeholder="••••••" default-visible />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>disabled</p>
        <div :class="rowItems">
          <PasswordInput placeholder="••••••" disabled />
        </div>
      </div>
    </div>
  </div>
</template>
