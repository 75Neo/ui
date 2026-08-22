<script setup lang="ts">
import { ark } from "@ark-ui/vue/factory";
import { computed } from "vue";
import { useComponentTheme } from "../theme";
import { useSplitAttrs } from "../utils";
import { buttonProps } from "./props";

/**
 * Ark's polymorphic `button` (so `asChild` works) wearing the shared `button` theme.
 */
defineOptions({ name: "NeoButton", inheritAttrs: false });

const props = defineProps(buttonProps);

const { attrsClass, otherAttrs } = useSplitAttrs();
const theme = useComponentTheme("button");

// The factory caches per tag, so this is the same component object for every instance.
const ArkButton = ark.button;

const className = computed(() =>
  theme
    .value({
      variant: props.variant,
      size: props.size,
      colorPalette: props.colorPalette,
      fullWidth: props.fullWidth,
    })
    .base({ class: [props.ui?.base, attrsClass.value] }),
);
</script>

<template>
  <ArkButton v-bind="otherAttrs" :class="className">
    <slot />
  </ArkButton>
</template>
