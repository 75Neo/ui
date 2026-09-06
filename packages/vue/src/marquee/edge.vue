<script setup lang="ts">
import { Marquee as Ark } from "@ark-ui/vue/marquee";
import { cn, type MarqueeEdgeProps } from "@75neo/themes";

const props = defineProps<
  MarqueeEdgeProps & {
    class?: unknown;
  }
>();
</script>

<template>
  <Ark.Edge
    :side="props.side"
    data-slot="marquee-edge"
    :class="
      cn(
        'pointer-events-none z-10 data-[side=bottom]:h-[15%] data-[side=bottom]:[background:linear-gradient(to_top,var(--ui-bg),transparent)] data-[side=end]:w-[15%] data-[side=end]:[background:linear-gradient(to_left,var(--ui-bg),transparent)] data-[side=start]:w-[15%] data-[side=start]:[background:linear-gradient(to_right,var(--ui-bg),transparent)] data-[side=top]:h-[15%] data-[side=top]:[background:linear-gradient(to_bottom,var(--ui-bg),transparent)] rtl:data-[side=end]:[background:linear-gradient(to_right,var(--ui-bg),transparent)] rtl:data-[side=start]:[background:linear-gradient(to_left,var(--ui-bg),transparent)]',
        props.class as string | undefined,
      )
    "
  />
</template>
