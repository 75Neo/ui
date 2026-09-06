<script setup lang="ts">
import { type Component, computed } from "vue";
import { Toggle as Ark } from "@ark-ui/vue/toggle";
import { cva } from "class-variance-authority";
import {
  cn,
  toggleBaseCompoundData,
  toggleDefaults,
  toggleSizeData,
  type ToggleProps,
} from "@75neo/themes";

const toggleBase = cva(
  "inline-flex cursor-pointer items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-3 disabled:cursor-not-allowed disabled:opacity-75",
  {
    variants: {
      variant: { solid: "", outline: "", soft: "", subtle: "", ghost: "" },
      color: {
        primary: "",
        secondary: "",
        success: "",
        info: "",
        warning: "",
        error: "",
        neutral: "",
      },
      size: toggleSizeData.base,
    },
    compoundVariants: toggleBaseCompoundData,
    defaultVariants: toggleDefaults,
  },
);

const props = defineProps<
  ToggleProps<Component> & {
    class?: unknown;
  }
>();

const emit = defineEmits<{
  /** Fired whenever the toggle is pressed or released. */
  pressedChange: [pressed: boolean];
}>();

defineSlots<{
  default?: () => unknown;
}>();

/*
 * `default: undefined` keeps an absent `v-model:pressed` absent. Without it the
 * declared prop would reach Ark as an explicit `false` and pin the toggle off.
 */
const pressed = defineModel<boolean | undefined>("pressed", { default: undefined });

const baseClass = computed(() =>
  cn(
    toggleBase({ variant: props.variant, size: props.size, color: props.color }),
    props.class as string | undefined,
  ),
);
const resolvedSize = computed(() => props.size ?? toggleDefaults.size);
const leadingClass = computed(() =>
  cn("shrink-0 [&>svg]:size-full", toggleSizeData.leadingIcon[resolvedSize.value]),
);
const trailingClass = computed(() =>
  cn("shrink-0 [&>svg]:size-full", toggleSizeData.trailingIcon[resolvedSize.value]),
);
</script>

<template>
  <Ark.Root
    data-slot="toggle"
    :class="baseClass"
    :data-variant="props.variant ?? 'soft'"
    :data-size="resolvedSize"
    :data-color="props.color ?? 'primary'"
    v-model:pressed="pressed"
    @pressed-change="emit('pressedChange', $event)"
    :disabled="props.disabled"
  >
    <span v-if="props.leadingIcon != null" data-slot="toggle-leading-icon" :class="leadingClass">
      <component :is="props.leadingIcon" />
    </span>
    <span v-if="$slots.default" data-slot="toggle-label" :class="cn('truncate')">
      <slot />
    </span>
    <span v-if="props.trailingIcon != null" data-slot="toggle-trailing-icon" :class="trailingClass">
      <component :is="props.trailingIcon" />
    </span>
  </Ark.Root>
</template>
