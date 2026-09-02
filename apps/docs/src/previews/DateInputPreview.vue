<script setup lang="ts">
import { CalendarDays } from "@lucide/vue";
import { DateInput, parseDate } from "@75neo/vue";
</script>

<template>
  <DateInput
    label="Published"
    :leading-icon="CalendarDays"
    :default-value="parseDate(['2026-03-14'])"
  />
</template>
