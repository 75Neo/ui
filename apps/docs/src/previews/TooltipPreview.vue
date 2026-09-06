<script setup lang="ts">
import { Button } from "@75neo/vue/button";
import { Tooltip } from "@75neo/vue/tooltip";
</script>

<template>
  <Tooltip text="Copied to the clipboard" arrow>
    <Button variant="outline" color="neutral">Hover me</Button>
  </Tooltip>
</template>
