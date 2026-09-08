<script setup lang="ts">
import { Button } from "@/components/vue";

const variants = ["solid", "outline", "soft", "subtle", "ghost", "link"] as const;
</script>

<template>
  <div class="flex flex-wrap items-center gap-2">
    <Button v-for="variant in variants" :key="variant" :variant="variant">
      {{ variant }}
    </Button>
  </div>
</template>
