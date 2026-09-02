<script setup lang="ts">
import { Collapsible } from "@75neo/vue";
</script>

<template>
  <div class="flex flex-col gap-4">
    <Collapsible label="What is 75NeoUI?" default-open>
      One set of styles in @75neo/themes, shipped for React and Vue by two thin adapters.
    </Collapsible>
    <Collapsible label="Show more" collapsed-height="2.5rem" variant="soft">
      <p>A collapsed height clips the panel instead of hiding it.</p>
      <p class="mt-2">
        The first lines stay on the page, and the rest slides in behind them when the trigger is
        pressed.
      </p>
    </Collapsible>
  </div>
</template>
