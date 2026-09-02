<script setup lang="ts">
import { DatePicker, parseDate } from "@75neo/vue";
</script>

<template>
  <DatePicker label="Due" open-on-click :default-value="parseDate(['2026-03-14'])" />
</template>
