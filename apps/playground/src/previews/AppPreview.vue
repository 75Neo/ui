<script setup lang="ts">
import { ArrowRight } from "@lucide/vue";
import { App, Button, Switch } from "@75neo/vue";

const frame = "flex flex-col gap-3 rounded-lg p-4 ring ring-default";
const label = "text-dimmed font-mono text-[0.6875rem] leading-none";

const locales = ["en-US", "ar-EG"] as const;

const themed = {
  app: { ui: { base: `${frame} bg-muted` } },
  button: { ui: { base: "rounded-full" } },
};
</script>

<template>
  <!--
    Two Apps, one per direction. The `rtl:` utilities inside every recipe read the `dir`
    attribute the App writes, so the second pair is the same markup mirrored with no
    component knowing anything about it.
  -->
  <div class="flex flex-col gap-6">
    <div class="grid gap-4 @md:grid-cols-2">
      <App v-for="locale in locales" :key="locale" :locale="locale" :class="frame">
        <p :class="label" data-identifier>{{ locale }}</p>
        <Switch label="Notifications" default-checked />
        <Button :trailing-icon="ArrowRight">Continue</Button>
      </App>
    </div>

    <hr class="border-muted" />

    <!-- The theme an App publishes reaches everything below it, itself included. -->
    <App :theme="themed">
      <p :class="label" data-identifier>themed</p>
      <Button>Rounded by the App above it</Button>
    </App>
  </div>
</template>
