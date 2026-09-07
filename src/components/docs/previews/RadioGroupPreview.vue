<script setup lang="ts">
import RadioGroup from "@/registry/vue/ui/radio-group/RadioGroup.vue";
import RadioGroupItem from "@/registry/vue/ui/radio-group/RadioGroupItem.vue";
import RadioGroupItemControl from "@/registry/vue/ui/radio-group/RadioGroupItemControl.vue";
import RadioGroupItemHiddenInput from "@/registry/vue/ui/radio-group/RadioGroupItemHiddenInput.vue";
import RadioGroupItemText from "@/registry/vue/ui/radio-group/RadioGroupItemText.vue";
import RadioGroupLabel from "@/registry/vue/ui/radio-group/RadioGroupLabel.vue";

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
