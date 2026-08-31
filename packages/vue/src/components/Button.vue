<script setup lang="ts">
import { type Component, computed } from "vue";
import { Loader2 } from "@lucide/vue";
import { button } from "@75neo/themes";
import { ButtonKey, type ButtonProps } from "@75neo/core";
import { useComponentTheme } from "../composables/useTheme";

/**
 * Every themeable prop is left without a default on purpose: `undefined` is what tells the
 * resolver that the theme may fill the value in. Explicit props still win.
 */
const props = withDefaults(
  defineProps<
    ButtonProps<Component> & {
      type?: "button" | "submit" | "reset";
      class?: unknown;
    }
  >(),
  // Vue casts an absent `Boolean` prop to `false` unless a default is declared. Declaring
  // `undefined` keeps "not passed" distinguishable from "passed as false", which is what lets
  // a theme supply the value.
  { disabled: undefined, loading: undefined, leading: undefined, trailing: undefined },
);

const slots = defineSlots<{
  default?: () => unknown;
  leading?: () => unknown;
  trailing?: () => unknown;
  /** Replaces the spinner shown while `loading` is set. */
  loadingIcon?: () => unknown;
}>();

const theme = useComponentTheme(ButtonKey, () => props.ui);

const resolved = computed(() => {
  const defaults = theme.value.props;
  return {
    variant: props.variant ?? defaults.variant,
    size: props.size ?? defaults.size,
    color: props.color ?? defaults.color,
    disabled: props.disabled ?? defaults.disabled ?? false,
    loading: props.loading ?? defaults.loading ?? false,
    leading: props.leading ?? defaults.leading ?? false,
    trailing: props.trailing ?? defaults.trailing ?? false,
  };
});

const classes = computed(() => {
  const { class: apply } = theme.value;
  const tv = button({
    variant: resolved.value.variant,
    size: resolved.value.size,
    color: resolved.value.color,
  });

  return {
    base: apply("base", tv.base({ class: props.class as string })),
    leading: apply("leading", tv.leading()),
    label: apply("label", tv.label()),
    trailing: apply("trailing", tv.trailing()),
  };
});

const showLeading = computed(
  () => resolved.value.loading || resolved.value.leading || !!props.leadingIcon || !!slots.leading,
);
const showTrailing = computed(
  () => resolved.value.trailing || !!props.trailingIcon || !!slots.trailing,
);
</script>

<template>
  <button
    :type="type ?? 'button'"
    data-slot="base"
    :class="classes.base"
    :disabled="resolved.disabled || resolved.loading"
    :aria-busy="resolved.loading || undefined"
  >
    <span v-if="showLeading" data-slot="leading" :class="classes.leading">
      <template v-if="resolved.loading">
        <slot name="loadingIcon">
          <component :is="loadingIcon ?? Loader2" class="animate-spin" />
        </slot>
      </template>
      <slot v-else name="leading">
        <component :is="leadingIcon" v-if="leadingIcon" />
      </slot>
    </span>
    <span v-if="slots.default" data-slot="label" :class="classes.label">
      <slot />
    </span>
    <span v-if="showTrailing" data-slot="trailing" :class="classes.trailing">
      <slot name="trailing">
        <component :is="trailingIcon" v-if="trailingIcon" />
      </slot>
    </span>
  </button>
</template>
