<script setup lang="ts">
import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemHiddenInput,
  RadioGroupItemText,
  RadioGroupLabel,
} from "@/components/vue";

const frameworks = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "both", label: "Both adapters" },
];
</script>

<template>
  <RadioGroup default-value="vue">
    <RadioGroupLabel>Which adapter should the CLI install?</RadioGroupLabel>
    <RadioGroupItem v-for="framework in frameworks" :key="framework.value" :value="framework.value">
      <RadioGroupItemControl />
      <RadioGroupItemText>{{ framework.label }}</RadioGroupItemText>
      <RadioGroupItemHiddenInput />
    </RadioGroupItem>
  </RadioGroup>
</template>
