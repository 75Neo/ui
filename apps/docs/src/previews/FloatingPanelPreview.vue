<script setup lang="ts">
import { FloatingPanel } from "@75neo/vue/floating-panel";
</script>

<template>
  <FloatingPanel
    title="Notes"
    body="Drag the header, stage the window, pull a corner to resize."
    default-open
  >
    <button type="button">Notes</button>
  </FloatingPanel>
</template>
