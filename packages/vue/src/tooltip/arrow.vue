<script setup lang="ts">
import { Tooltip as Ark } from "@ark-ui/vue/tooltip";
import { cn } from "@75neo/themes";

const props = defineProps<{
  class?: unknown;
}>();
</script>

<template>
  <!--
    Two elements, because the tip has to rotate inside a box that does not. Ark reads
    the size and the background off these two variables, so they are the whole of the
    arrow's styling and the tip needs no classes.
  -->
  <Ark.Arrow
    data-slot="tooltip-arrow"
    :class="
      cn(
        '[--arrow-background:var(--ui-bg-inverted)] [--arrow-size:0.5rem]',
        props.class as string | undefined,
      )
    "
  >
    <Ark.ArrowTip data-slot="tooltip-arrow-tip" />
  </Ark.Arrow>
</template>
