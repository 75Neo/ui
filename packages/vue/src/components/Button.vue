<script setup lang="ts">
import { computed } from "vue";
import { button, type ButtonVariants, type SlotClass } from "@75neo/styles";
import { useComponentUI } from "../composables/useComponentUI";
import { Loader2 } from "@lucide/vue";
import type { Component } from "vue";

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariants["variant"];
    size?: ButtonVariants["size"];
    color?: ButtonVariants["color"];
    compact?: ButtonVariants["compact"];
    ui?: {
      base?: SlotClass;
      leadingIcon?: SlotClass;
      label?: SlotClass;
      trailingIcon?: SlotClass;
    };
    loading?: boolean;
    loadingIcon?: Component | object;
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
  loading?: (props: Record<string, never>) => unknown;
}>();

const tvSlots = computed(() =>
  button({
    variant: props.variant,
    size: props.size,
    color: props.color,
    compact: props.compact,
  }),
);

const resolved = useComponentUI(
  "button",
  tvSlots,
  computed(() => props.ui),
);
</script>

<template>
  <button
    :type="type"
    :class="resolved.base()"
    :disabled="disabled || loading"
    :aria-busy="loading || undefined"
    :aria-disabled="loading || undefined"
  >
    <span v-if="loading || slots.leading" :class="resolved.leadingIcon()">
      <template v-if="loading">
        <slot name="loading">
          <component :is="loadingIcon" v-if="loadingIcon" />
          <Loader2 v-else class="animate-spin" />
        </slot>
      </template>
      <slot v-else name="leading" />
    </span>
    <span v-if="slots.default" :class="resolved.label()">
      <slot />
    </span>
    <span v-if="slots.trailing" :class="resolved.trailingIcon()">
      <slot name="trailing" />
    </span>
  </button>
</template>
