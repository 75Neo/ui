<script setup lang="ts">
import { TriangleAlert } from "@lucide/vue";
import { Button, Error } from "@75neo/vue";
</script>

<template>
  <div class="overflow-hidden rounded-lg ring ring-default">
    <Error
      :ui="{ base: 'min-h-56 py-8' }"
      :icon="TriangleAlert"
      :status-code="404"
      status-message="Page not found"
      message="Nothing answers at that address. It may have moved, or never existed."
    >
      <Button>Back to home</Button>
      <Button variant="outline" color="neutral">Search the docs</Button>
    </Error>
  </div>
</template>
