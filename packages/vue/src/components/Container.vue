<script setup lang="ts">
import { container, type ContainerProps } from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";

/**
 * A `div`, deliberately. The landmark elements are the Header, the Main and the Footer;
 * a Container is a measurement and carries no meaning of its own.
 */
const props = defineProps<ContainerProps & { class?: unknown }>();

defineSlots<{
  /** The content held to the measure. */
  default?: () => unknown;
}>();

const theme = useResolvedTheme(
  container,
  "container",
  () => props,
  () => props.class as string | undefined,
);
</script>

<template>
  <div data-slot="base" :class="theme.class.base">
    <slot />
  </div>
</template>
