<script setup lang="ts">
import { Button } from "@75neo/vue/button";
</script>

<template>
  <div class="flex flex-wrap items-center gap-2">
    <Button variant="solid" color="primary">Save</Button>
    <Button variant="outline" color="neutral">Cancel</Button>
    <Button variant="ghost" color="error">Delete</Button>
  </div>
</template>
