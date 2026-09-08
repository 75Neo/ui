<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Marquee as Ark } from "@ark-ui/vue/marquee";
import { cn } from "cn";
import { marquee } from "@/registry/shared/lib/marquee.styles";

interface MarqueeViewportProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<MarqueeViewportProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = marquee();
</script>

<template>
  <Ark.Viewport :class="cn(styles.viewport(), props.class)">
    <slot />
  </Ark.Viewport>
</template>
