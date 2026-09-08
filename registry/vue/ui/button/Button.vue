<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import { LoaderCircle } from "@lucide/vue";
import { cn } from "cn";
import { button, type ButtonVariants } from "@/registry/shared/lib/button.styles";

interface ButtonProps {
  variant?: ButtonVariants["variant"];
  color?: ButtonVariants["color"];
  size?: ButtonVariants["size"];
  block?: ButtonVariants["block"];
  square?: ButtonVariants["square"];
  disabled?: ButtonVariants["disabled"];
  loading?: boolean;
  class?: HTMLAttributes["class"];
}

const props = defineProps<ButtonProps>();

defineSlots<{
  leading?: () => unknown;
  default?: () => unknown;
  trailing?: () => unknown;
}>();

const inactive = computed(() => props.disabled || props.loading);

const styles = computed(() =>
  button({
    variant: props.variant,
    color: props.color,
    size: props.size,
    block: props.block,
    square: props.square,
    disabled: inactive.value,
  }),
);
</script>

<template>
  <button
    :class="cn(styles.base(), props.class)"
    :disabled="inactive"
    :aria-busy="loading || undefined"
  >
    <LoaderCircle v-if="loading" :class="styles.spinner()" aria-hidden="true" />
    <span v-else-if="$slots.leading" :class="styles.leading()">
      <slot name="leading" />
    </span>

    <slot />

    <span v-if="$slots.trailing" :class="styles.trailing()">
      <slot name="trailing" />
    </span>
  </button>
</template>
