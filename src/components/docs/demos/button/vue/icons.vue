<script setup lang="ts">
import { ArrowRight, Download } from "@lucide/vue";
import { Button } from "@/components/vue";
</script>

<template>
  <div class="flex flex-wrap items-center gap-2">
    <Button variant="outline">
      <template #leading>
        <Download />
      </template>
      Download
    </Button>

    <Button>
      Continue
      <template #trailing>
        <ArrowRight />
      </template>
    </Button>
  </div>
</template>
