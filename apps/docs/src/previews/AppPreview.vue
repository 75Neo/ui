<script setup lang="ts">
import { App, Button, Switch } from "@75neo/vue";

const frame = "flex flex-col gap-3 rounded-lg p-4 ring ring-default";
const locales = ["en-US", "ar-EG"] as const;
</script>

<template>
  <div class="grid gap-4 sm:grid-cols-2">
    <App v-for="locale in locales" :key="locale" :locale="locale" :class="frame">
      <p class="font-mono text-xs text-dimmed">{{ locale }}</p>
      <Switch label="Notifications" default-checked />
      <Button>Continue</Button>
    </App>
  </div>
</template>
