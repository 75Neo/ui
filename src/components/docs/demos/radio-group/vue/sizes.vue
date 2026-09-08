<script setup lang="ts">
import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemHiddenInput,
  RadioGroupItemText,
} from "@/components/vue";

const sizes = ["sm", "md", "lg"] as const;
</script>

<template>
  <div class="flex flex-col gap-6">
    <RadioGroup
      v-for="size in sizes"
      :key="size"
      :size="size"
      default-value="a"
      orientation="horizontal"
    >
      <RadioGroupItem value="a">
        <RadioGroupItemControl />
        <RadioGroupItemText>{{ size }}</RadioGroupItemText>
        <RadioGroupItemHiddenInput />
      </RadioGroupItem>
      <RadioGroupItem value="b">
        <RadioGroupItemControl />
        <RadioGroupItemText>Second</RadioGroupItemText>
        <RadioGroupItemHiddenInput />
      </RadioGroupItem>
    </RadioGroup>
  </div>
</template>
