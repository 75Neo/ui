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
</script>

<template>
  <div class="max-w-56">
    <NumberInput default-value="3" :min="0" :max="12">
      <NumberInputLabel>Seats</NumberInputLabel>
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
