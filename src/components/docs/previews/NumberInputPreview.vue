<script setup lang="ts">
import { Minus, Plus } from "@lucide/vue";
import NumberInput from "@/registry/vue/ui/number-input/NumberInput.vue";
import NumberInputControl from "@/registry/vue/ui/number-input/NumberInputControl.vue";
import NumberInputDecrementTrigger from "@/registry/vue/ui/number-input/NumberInputDecrementTrigger.vue";
import NumberInputIncrementTrigger from "@/registry/vue/ui/number-input/NumberInputIncrementTrigger.vue";
import NumberInputInput from "@/registry/vue/ui/number-input/NumberInputInput.vue";
import NumberInputLabel from "@/registry/vue/ui/number-input/NumberInputLabel.vue";
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
