<script setup lang="ts">
import { RadioGroup } from "@75neo/vue";

const items = [
  { value: "weekly", label: "Weekly", description: "One digest on Monday morning." },
  { value: "daily", label: "Daily", description: "One digest a day, at nine." },
  { value: "never", label: "Never", description: "Nothing at all, ever." },
];

const plans = [
  { value: "free", label: "Free" },
  { value: "pro", label: "Pro" },
  { value: "team", label: "Team", disabled: true },
];
</script>

<template>
  <div class="flex flex-col gap-6">
    <RadioGroup legend="Digest" :items="items" default-value="weekly" />
    <RadioGroup
      color="success"
      legend="Plan"
      orientation="horizontal"
      :items="plans"
      default-value="pro"
    />
  </div>
</template>
