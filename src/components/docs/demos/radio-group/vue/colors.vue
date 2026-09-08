<script setup lang="ts">
import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemHiddenInput,
  RadioGroupItemText,
} from "@/components/vue";

const colors = ["primary", "secondary", "success", "info", "warning", "error"] as const;
</script>

<template>
  <div class="flex flex-wrap gap-6">
    <RadioGroup v-for="color in colors" :key="color" :color="color" default-value="on">
      <RadioGroupItem value="on">
        <RadioGroupItemControl />
        <RadioGroupItemText>{{ color }}</RadioGroupItemText>
        <RadioGroupItemHiddenInput />
      </RadioGroupItem>
    </RadioGroup>
  </div>
</template>
