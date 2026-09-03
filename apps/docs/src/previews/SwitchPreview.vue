<script setup lang="ts">
import { Moon, Sun } from "@lucide/vue";
import { Switch } from "@75neo/vue";
</script>

<template>
  <div class="flex flex-col gap-4">
    <Switch label="Airplane mode" default-checked />
    <Switch
      label="Weekly digest"
      description="One email on Monday with everything that changed."
      color="success"
      default-checked
    />
    <Switch label="Dark theme" :checked-icon="Moon" :unchecked-icon="Sun" size="lg" />
    <Switch label="Saving" loading default-checked />
  </div>
</template>
