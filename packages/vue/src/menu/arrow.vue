<script setup lang="ts">
import { Menu as Ark } from "@ark-ui/vue/menu";
import { cn } from "@75neo/themes";

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Arrow
    data-slot="menu-arrow"
    :class="
      cn(
        '[--arrow-background:var(--ui-bg)] [--arrow-size:0.625rem]',
        props.class as string | undefined,
      )
    "
  >
    <Ark.ArrowTip data-slot="menu-arrow-tip" />
  </Ark.Arrow>
</template>
