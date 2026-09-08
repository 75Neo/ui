<script setup lang="ts">
import { Button } from "@/components/vue";

const colors = ["primary", "secondary", "success", "info", "warning", "error"] as const;
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex flex-wrap items-center gap-2">
      <Button v-for="color in colors" :key="color" :color="color">
        {{ color }}
      </Button>
    </div>

    <div class="flex flex-wrap items-center gap-2">
      <Button v-for="color in colors" :key="color" :color="color" variant="soft">
        {{ color }}
      </Button>
    </div>
  </div>
</template>
