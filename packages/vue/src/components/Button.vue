<script setup lang="ts">
import { computed } from "vue";
import { Loader2 } from "@lucide/vue";
import { button, type ButtonVariants } from "@75neo/styles";
import { buttonKey, type ButtonUI } from "@75neo/core";
import { useComponentUI } from "../composables/useComponentUI";

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariants["variant"];
    size?: ButtonVariants["size"];
    color?: ButtonVariants["color"];
    compact?: ButtonVariants["compact"];
    ui?: ButtonUI;
    loading?: boolean;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    class?: unknown;
  }>(),
  {
    variant: undefined,
    size: undefined,
    color: undefined,
    compact: undefined,
    ui: undefined,
    loading: false,
    disabled: false,
    type: "button",
    class: undefined,
  },
);

const slots = defineSlots<{
  default?: () => unknown;
  leading?: () => unknown;
  trailing?: () => unknown;
  /** Replaces the default spinner while `loading` is set. */
  loadingIcon?: () => unknown;
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
  buttonKey,
  tvSlots,
  computed(() => props.ui),
);
</script>

<template>
  <button
    :type="type"
    data-slot="base"
    :class="resolved.base({ class: props.class as string })"
    :disabled="disabled || loading"
    :aria-busy="loading ? true : undefined"
    :aria-disabled="disabled || loading ? true : undefined"
  >
    <span v-if="loading || slots.leading" data-slot="leading" :class="resolved.leading()">
      <template v-if="loading">
        <slot name="loadingIcon">
          <Loader2 class="animate-spin" />
        </slot>
      </template>
      <slot v-else name="leading" />
    </span>
    <span v-if="slots.default" data-slot="label" :class="resolved.label()">
      <slot />
    </span>
    <span v-if="slots.trailing" data-slot="trailing" :class="resolved.trailing()">
      <slot name="trailing" />
    </span>
  </button>
</template>
