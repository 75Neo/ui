<script setup lang="ts">
import { type Component, computed } from "vue";
import { Loader2 } from "@lucide/vue";
import { type ButtonProps, button, showButtonSlots } from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";

const props = defineProps<
  ButtonProps<Component> & {
    type?: "button" | "submit" | "reset";
    class?: unknown;
  }
>();

const slots = defineSlots<{
  default?: () => unknown;
  leading?: () => unknown;
  trailing?: () => unknown;
  loadingIcon?: () => unknown;
}>();

const theme = useResolvedTheme(
  button,
  "button",
  () => props,
  () => props.class as string | undefined,
);

const show = computed(() =>
  showButtonSlots({
    loading: props.loading,
    leading: props.leading,
    trailing: props.trailing,
    hasLeading: !!props.leadingIcon || !!slots.leading,
    hasTrailing: !!props.trailingIcon || !!slots.trailing,
  }),
);
</script>

<template>
  <button
    :type="type ?? 'button'"
    data-slot="base"
    :class="theme.class.base"
    :disabled="(props.disabled ?? false) || (props.loading ?? false)"
    :aria-busy="props.loading || undefined"
  >
    <span v-if="show.leading" data-slot="leading" :class="theme.class.leading">
      <template v-if="props.loading">
        <slot name="loadingIcon">
          <component :is="loadingIcon ?? Loader2" class="animate-spin" />
        </slot>
      </template>
      <slot v-else name="leading">
        <component :is="leadingIcon" v-if="leadingIcon" />
      </slot>
    </span>
    <span v-if="slots.default" data-slot="label" :class="theme.class.label">
      <slot />
    </span>
    <span v-if="show.trailing" data-slot="trailing" :class="theme.class.trailing">
      <slot name="trailing">
        <component :is="trailingIcon" v-if="trailingIcon" />
      </slot>
    </span>
  </button>
</template>
