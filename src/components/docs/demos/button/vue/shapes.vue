<script setup lang="ts">
import { Plus } from "@lucide/vue";
import { Button } from "@/components/vue";
</script>

<template>
  <div class="flex flex-col gap-3">
    <Button block>Block</Button>

    <div class="flex flex-wrap items-center gap-2">
      <Button square aria-label="Add" size="sm">
        <Plus />
      </Button>
      <Button square aria-label="Add" variant="outline">
        <Plus />
      </Button>
      <Button square aria-label="Add" variant="soft" size="lg">
        <Plus />
      </Button>
    </div>
  </div>
</template>
