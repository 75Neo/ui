<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { RadioGroup as Ark } from "@ark-ui/vue/radio-group";
import { cn } from "cn";
import { radioGroup, type RadioGroupSize } from "@/registry/shared/lib/radio-group.styles";

interface RadioGroupProps {
  defaultValue?: string | null;
  disabled?: boolean;
  readOnly?: boolean;
  orientation?: "horizontal" | "vertical";
  name?: string;
  form?: string;
  size?: RadioGroupSize;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<RadioGroupProps>(), {
  disabled: undefined,
  readOnly: undefined,
  size: "md",
});

const value = defineModel<string | null>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = radioGroup();
</script>

<template>
  <Ark.Root
    v-model="value"
    :default-value="props.defaultValue"
    :disabled="props.disabled"
    :read-only="props.readOnly"
    :orientation="props.orientation"
    :name="props.name"
    :form="props.form"
    :data-size="props.size"
    :class="cn(styles.root(), props.class)"
  >
    <slot />
  </Ark.Root>
</template>
