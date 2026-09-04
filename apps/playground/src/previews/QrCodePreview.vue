<script setup lang="ts">
import { qrCode, variantValues } from "@75neo/themes";
import { QrCode } from "@75neo/vue";

const sizes = variantValues(qrCode, "size");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-center @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";
</script>

<template>
  <div class="@container flex flex-col gap-6">
    <div v-for="size in sizes" :key="size" :class="row">
      <p :class="rowLabel" data-identifier>{{ size }}</p>
      <QrCode :size="size" default-value="https://75neo.design" />
    </div>
  </div>
</template>
