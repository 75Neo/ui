<script setup lang="ts">
import { type Component, computed } from "vue";
import { LoaderCircle } from "@lucide/vue";
import { type ButtonProps, button, resolveButtonIcons } from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";

const props = defineProps<
  ButtonProps<Component> & {
    type?: "button" | "submit" | "reset";
    class?: unknown;
  }
>();

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

const icons = computed(() =>
  resolveButtonIcons({
    loading: props.loading,
    leading: props.leading,
    trailing: props.trailing,
    hasLeading: !!props.leadingIcon || !!slots.leading,
    hasTrailing: !!props.trailingIcon || !!slots.trailing,
  }),
);

const theme = useResolvedTheme(
  button,
  "button",
  () => ({
    ...props,
    // An icon with no label wants equal padding, which is worth not having to say.
    square: props.square ?? !slots.default,
    leading: icons.value.leading,
    trailing: icons.value.trailing,
  }),
  () => props.class as string | undefined,
);
</script>

<template>
  <button
    :type="type ?? 'button'"
    data-slot="base"
    :class="theme.class.base"
    :disabled="props.disabled || props.loading"
    :aria-busy="props.loading || undefined"
  >
    <!--
      The recipe puts `animate-spin` on whichever icon slot is showing, so the spinner
      only has to be placed in the same one.
    -->
    <span v-if="icons.leading" data-slot="leadingIcon" :class="theme.class.leadingIcon">
      <template v-if="props.loading">
        <slot name="loadingIcon">
          <component :is="loadingIcon ?? LoaderCircle" />
        </slot>
      </template>
      <slot v-else name="leading">
        <component :is="leadingIcon" v-if="leadingIcon" />
      </slot>
    </span>
    <span v-if="slots.default" data-slot="label" :class="theme.class.label">
      <slot />
    </span>
    <span v-if="icons.trailing" data-slot="trailingIcon" :class="theme.class.trailingIcon">
      <template v-if="props.loading && !icons.leading">
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
