<script setup lang="ts">
import { button, type ButtonVariants } from "@75neo/styles";
import { Loader2 } from "@lucide/vue";

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariants["variant"];
    size?: ButtonVariants["size"];
    color?: ButtonVariants["color"];
    compact?: ButtonVariants["compact"];
    ui?: string;
    loading?: boolean;
    loadingIcon?: unknown;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
  }>(),
  {
    loading: false,
    disabled: false,
    type: "button",
  },
);

const slots = defineSlots<{
  leading?: (props: Record<string, never>) => unknown;
  default?: (props: Record<string, never>) => unknown;
  trailing?: (props: Record<string, never>) => unknown;
}>();

const {
  base: baseSlot,
  leadingIcon: leadingIconSlot,
  label: labelSlot,
  trailingIcon: trailingIconSlot,
} = button({
  variant: props.variant,
  size: props.size,
  color: props.color,
  compact: props.compact,
});
</script>

<template>
  <button
    :type="type"
    :class="baseSlot({ class: ui })"
    :disabled="disabled"
    :aria-busy="loading || undefined"
  >
    <span v-if="loading || slots.leading" :class="leadingIconSlot()">
      <slot v-if="!loading" name="leading" />
      <Loader2 v-else class="animate-spin" />
    </span>
    <span v-if="slots.default" :class="labelSlot()">
      <slot />
    </span>
    <span v-if="slots.trailing" :class="trailingIconSlot()">
      <slot name="trailing" />
    </span>
  </button>
</template>
