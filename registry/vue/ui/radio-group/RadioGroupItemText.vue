<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { RadioGroup as Ark } from "@ark-ui/vue/radio-group";
import { cn } from "cn";
import { radioGroupStyles as styles } from "@/registry/shared/lib/radio-group.styles";

interface RadioGroupItemTextProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<RadioGroupItemTextProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.ItemText :class="cn(styles.itemText(), props.class)">
    <slot />
  </Ark.ItemText>
</template>
