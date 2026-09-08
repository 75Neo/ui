<script setup lang="ts">
import { PinInput, PinInputControl, PinInputInput, PinInputLabel } from "@/components/vue";

const sizes = ["sm", "md", "lg"] as const;
</script>

<template>
  <div class="flex flex-col gap-5">
    <PinInput v-for="size in sizes" :key="size" :size="size" placeholder="0">
      <PinInputLabel>{{ size }}</PinInputLabel>
      <PinInputControl>
        <PinInputInput v-for="index in [0, 1, 2, 3]" :key="index" :index="index" />
      </PinInputControl>
    </PinInput>
  </div>
</template>
