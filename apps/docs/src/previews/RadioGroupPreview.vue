<script setup lang="ts">
import { RadioGroup } from "@75neo/vue/radio-group";

const items = [
  { value: "email", label: "Email" },
  { value: "sms", label: "SMS" },
];
</script>

<template>
  <div class="max-w-xs">
    <RadioGroup :items="items" legend="Notify me" />
  </div>
</template>
