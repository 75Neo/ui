<script setup lang="ts">
import { ArrowRight, Check } from "@lucide/vue";
import { Button } from "@75neo/vue";
</script>

<!-- Weight down the left, meaning across the top: the two variants are independent. -->
<template>
  <div class="flex flex-wrap items-center gap-3">
    <Button :leading-icon="Check">Save</Button>
    <Button variant="outline" color="neutral">Cancel</Button>
    <Button variant="soft" color="success" :trailing-icon="ArrowRight">Continue</Button>
    <Button variant="ghost" color="error">Delete</Button>
    <Button variant="subtle" color="warning" loading>Retrying</Button>
    <Button variant="link" color="info">Learn more</Button>
  </div>
</template>
