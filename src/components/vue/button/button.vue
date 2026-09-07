<script setup lang="ts">
import { computed, type ButtonHTMLAttributes } from "vue";
import { cn } from "cn";
import { button, type ButtonVariants } from "@components/shared/button.styles";

const props = defineProps<{
  variant?: ButtonVariants["variant"];
  color?: ButtonVariants["color"];
  size?: ButtonVariants["size"];
  disabled?: ButtonVariants["disabled"];
  class?: ButtonHTMLAttributes["class"];
  type?: ButtonHTMLAttributes["type"];
  name?: ButtonHTMLAttributes["name"];
  value?: ButtonHTMLAttributes["value"];
  form?: ButtonHTMLAttributes["form"];
  formaction?: ButtonHTMLAttributes["formaction"];
  formenctype?: ButtonHTMLAttributes["formenctype"];
  formmethod?: ButtonHTMLAttributes["formmethod"];
  formnovalidate?: ButtonHTMLAttributes["formnovalidate"];
  formtarget?: ButtonHTMLAttributes["formtarget"];
  autofocus?: ButtonHTMLAttributes["autofocus"];
}>();

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

const attrs = computed(() => {
  const { variant, color, size, class: _class, ...rest } = props;
  return rest;
});
</script>

<template>
  <button v-bind="attrs" :class="cn(styles.base(), props.class)">
    <span v-if="$slots.leading" :class="styles.leadingIcon()">
      <slot name="leading" />
    </span>

    <slot />

    <span v-if="$slots.trailing" :class="styles.trailingIcon()">
      <slot name="trailing" />
    </span>
  </button>
</template>
