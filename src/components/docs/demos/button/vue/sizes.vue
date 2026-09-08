<script setup lang="ts">
import { Button } from "@/components/vue";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
</script>

<template>
  <div class="flex flex-wrap items-end gap-2">
    <Button v-for="size in sizes" :key="size" :size="size">
      {{ size }}
    </Button>
  </div>
</template>
