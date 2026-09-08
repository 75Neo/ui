<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { RadioGroup as Ark } from "@ark-ui/vue/radio-group";
import { cn } from "cn";
import { radioGroupStyles as styles } from "@/registry/shared/lib/radio-group.styles";

interface RadioGroupItemProps {
  value: string;
  disabled?: boolean;
  invalid?: boolean;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<RadioGroupItemProps>(), {
  disabled: undefined,
  invalid: undefined,
});

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Item
    :value="props.value"
    :disabled="props.disabled"
    :invalid="props.invalid"
    :class="cn(styles.item(), props.class)"
  >
    <slot />
  </Ark.Item>
</template>
