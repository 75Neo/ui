<script setup lang="ts">
import { computed, type ButtonHTMLAttributes } from "vue";
import { cn } from "cn";
import { button, type ButtonVariants } from "@components/shared/button.styles";

interface ButtonProps extends /* @vue-ignore */ ButtonHTMLAttributes {
  variant?: ButtonVariants["variant"];
  color?: ButtonVariants["color"];
  size?: ButtonVariants["size"];
  disabled?: ButtonVariants["disabled"];
  class?: ButtonHTMLAttributes["class"];
}

const props = defineProps<ButtonProps>();

defineSlots<{
  leading?: () => unknown;
  default?: () => unknown;
  trailing?: () => unknown;
}>();

const styles = computed(() =>
  button({
    variant: props.variant,
    color: props.color,
    size: props.size,
    disabled: props.disabled,
  }),
);
</script>

<template>
  <button :class="cn(styles.base(), props.class)" :disabled="disabled">
    <span v-if="$slots.leading" :class="styles.leadingIcon()">
      <slot name="leading" />
    </span>

    <slot />

    <span v-if="$slots.trailing" :class="styles.trailingIcon()">
      <slot name="trailing" />
    </span>
  </button>
</template>
