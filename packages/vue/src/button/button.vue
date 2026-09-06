<script setup lang="ts">
import { type Component, computed } from "vue";
import { cva } from "class-variance-authority";
import { LoaderCircle } from "@lucide/vue";
import {
  buttonBaseCompoundData,
  buttonDefaults,
  buttonLeadingIconCompoundData,
  buttonSizeData,
  buttonTrailingIconCompoundData,
  cn,
  resolveButtonIcons,
  type ButtonProps,
} from "@75neo/themes";

const buttonBase = cva(
  "inline-flex cursor-pointer items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-3 disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:cursor-not-allowed aria-disabled:opacity-75",
  {
    variants: {
      variant: { solid: "", outline: "", soft: "", subtle: "", ghost: "", link: "" },
      color: {
        primary: "",
        secondary: "",
        success: "",
        info: "",
        warning: "",
        error: "",
        neutral: "",
      },
      size: buttonSizeData.base,
      block: { true: "w-full justify-center" },
      square: { true: "" },
      leading: { true: "" },
      trailing: { true: "" },
      loading: { true: "" },
    },
    compoundVariants: buttonBaseCompoundData,
    defaultVariants: buttonDefaults,
  },
);

const buttonLeadingIcon = cva("shrink-0 [&>svg]:size-full", {
  variants: {
    size: buttonSizeData.leadingIcon,
    loading: { true: "" },
    leading: { true: "" },
  },
  compoundVariants: buttonLeadingIconCompoundData,
  defaultVariants: buttonDefaults,
});

const buttonTrailingIcon = cva("shrink-0 [&>svg]:size-full", {
  variants: {
    size: buttonSizeData.trailingIcon,
    block: { true: "ms-auto" },
    loading: { true: "" },
    leading: { true: "" },
    trailing: { true: "" },
  },
  compoundVariants: buttonTrailingIconCompoundData,
  defaultVariants: buttonDefaults,
});

const props = withDefaults(
  defineProps<
    ButtonProps<Component> & {
      type?: "button" | "submit" | "reset";
      class?: unknown;
    }
  >(),
  // `square` defaults to whether the button has a label, so the default is
  // declared — as `undefined` — to skip Vue's absent-boolean cast, which would
  // otherwise pin it to `false` and kill the fallback below.
  { square: undefined },
);

const slots = defineSlots<{
  /** The label. */
  default?: () => unknown;
  /** Content before the label. Falls back to `leadingIcon`. */
  leading?: () => unknown;
  /** Content after the label. Falls back to `trailingIcon`. */
  trailing?: () => unknown;
  /** Replaces the spinner shown while loading. */
  loadingIcon?: () => unknown;
}>();

const isLoading = computed(() => props.loading ?? false);
const icons = computed(() =>
  resolveButtonIcons({
    loading: isLoading.value,
    leading: props.leading,
    trailing: props.trailing,
    hasLeading: props.leadingIcon != null || !!slots.leading,
    hasTrailing: props.trailingIcon != null || !!slots.trailing,
  }),
);
// An icon with no label wants equal padding, which is worth not having to say.
const squareResolved = computed(() => props.square ?? slots.default == null);
const shared = computed(() => ({
  variant: props.variant,
  size: props.size,
  color: props.color,
  block: props.block,
  square: squareResolved.value,
  loading: isLoading.value,
  leading: icons.value.leading,
  trailing: icons.value.trailing,
}));

const baseClass = computed(() => cn(buttonBase(shared.value), props.class as string | undefined));
const leadingClass = computed(() => cn(buttonLeadingIcon(shared.value)));
const trailingClass = computed(() => cn(buttonTrailingIcon(shared.value)));
</script>

<template>
  <button
    :type="type ?? 'button'"
    data-slot="button"
    :class="baseClass"
    :disabled="props.disabled || isLoading"
    :aria-busy="isLoading || undefined"
  >
    <!--
      The icon recipe puts `animate-spin` on whichever slot is showing, so the
      spinner only has to be placed in the same one.
    -->
    <span v-if="icons.leading" data-slot="button-leading-icon" :class="leadingClass">
      <template v-if="isLoading">
        <slot name="loadingIcon">
          <component :is="loadingIcon ?? LoaderCircle" />
        </slot>
      </template>
      <slot v-else name="leading">
        <component :is="leadingIcon" v-if="leadingIcon" />
      </slot>
    </span>
    <span v-if="slots.default" data-slot="button-label" class="truncate">
      <slot />
    </span>
    <span v-if="icons.trailing" data-slot="button-trailing-icon" :class="trailingClass">
      <template v-if="isLoading && !icons.leading">
        <slot name="loadingIcon">
          <component :is="loadingIcon ?? LoaderCircle" />
        </slot>
      </template>
      <slot v-else name="trailing">
        <component :is="trailingIcon" v-if="trailingIcon" />
      </slot>
    </span>
  </button>
</template>
