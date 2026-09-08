<script setup lang="ts">
import { Minus, Plus } from "@lucide/vue";
import {
  NumberInput,
  NumberInputControl,
  NumberInputDecrementTrigger,
  NumberInputIncrementTrigger,
  NumberInputInput,
  NumberInputLabel,
} from "@/components/vue";

const sizes = ["sm", "md", "lg"] as const;
</script>

<template>
  <div class="flex max-w-56 flex-col gap-5">
    <NumberInput v-for="size in sizes" :key="size" :size="size" default-value="3">
      <NumberInputLabel>{{ size }}</NumberInputLabel>
      <NumberInputControl>
        <NumberInputDecrementTrigger>
          <Minus />
        </NumberInputDecrementTrigger>
        <NumberInputInput />
        <NumberInputIncrementTrigger>
          <Plus />
        </NumberInputIncrementTrigger>
      </NumberInputControl>
    </NumberInput>
  </div>
</template>
