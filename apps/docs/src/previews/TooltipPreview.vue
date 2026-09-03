<script setup lang="ts">
import { Button, Tooltip } from "@75neo/vue";
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Tooltip text="Saves without leaving the page" :open-delay="150">
      <Button variant="outline" color="neutral">Hover me</Button>
    </Tooltip>
    <Tooltip text="Points back at its trigger" placement="bottom" arrow :open-delay="150">
      <Button variant="soft" color="neutral">With an arrow</Button>
    </Tooltip>
    <Tooltip text="Stays open while the pointer is over it" interactive :open-delay="150">
      <Button variant="ghost" color="neutral">Interactive</Button>
    </Tooltip>
  </div>
</template>
