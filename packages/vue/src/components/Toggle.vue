<script setup lang="ts">
import { type Component } from "vue";
import { Toggle as Ark } from "@ark-ui/vue/toggle";
import { type ToggleProps, toggle as toggleRecipe } from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";

/**
 * The pressed state lives outside the shared contract, because React and Vue spell a
 * controlled value too differently to share one type. Here it is `v-model:pressed`,
 * with `defaultPressed` as the uncontrolled counterpart Ark's root already takes.
 */
const props = defineProps<
  ToggleProps<Component> & {
    class?: unknown;
    defaultPressed?: boolean;
  }
>();

const emit = defineEmits<{
  /** Fired whenever the toggle is pressed or released. */
  pressedChange: [pressed: boolean];
}>();

defineSlots<{
  /** The toggle's label. */
  default?: () => unknown;
  /** Replaces the `leadingIcon` prop. */
  leadingIcon?: () => unknown;
  /** Replaces the `trailingIcon` prop. */
  trailingIcon?: () => unknown;
}>();

/*
 * `default: undefined` is load-bearing, and `undefined` in the type argument is what
 * lets it typecheck. `defineModel` declares `pressed` as a Boolean prop, and Vue casts
 * an absent Boolean prop to `false` unless the declaration carries a default — which
 * would pin every toggle to a controlled `false` and leave `defaultPressed` with
 * nothing to do. Ark's own root carries the same defaults.
 */
const pressed = defineModel<boolean | undefined>("pressed", { default: undefined });

const theme = useResolvedTheme(
  toggleRecipe,
  "toggle",
  () => props,
  () => props.class as string | undefined,
);
</script>

<template>
  <Ark.Root
    v-model:pressed="pressed"
    data-slot="base"
    :class="theme.class.base"
    :default-pressed="props.defaultPressed"
    :disabled="props.disabled"
    @pressed-change="emit('pressedChange', $event)"
  >
    <span
      v-if="props.leadingIcon != null || $slots.leadingIcon"
      data-slot="leadingIcon"
      :class="theme.class.leadingIcon"
    >
      <slot name="leadingIcon">
        <component :is="props.leadingIcon" />
      </slot>
    </span>
    <span v-if="$slots.default" data-slot="label" :class="theme.class.label">
      <slot />
    </span>
    <span
      v-if="props.trailingIcon != null || $slots.trailingIcon"
      data-slot="trailingIcon"
      :class="theme.class.trailingIcon"
    >
      <slot name="trailingIcon">
        <component :is="props.trailingIcon" />
      </slot>
    </span>
  </Ark.Root>
</template>
