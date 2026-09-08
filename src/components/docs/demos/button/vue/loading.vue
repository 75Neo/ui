<script setup lang="ts">
import { Button } from "@/components/vue";
</script>

<template>
  <div class="flex flex-wrap items-center gap-2">
    <Button loading>Saving</Button>
    <Button loading variant="outline">Saving</Button>
    <Button loading variant="soft" color="error">Deleting</Button>
    <Button disabled>Disabled</Button>
  </div>
</template>
