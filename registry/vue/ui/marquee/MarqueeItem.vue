<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Marquee as Ark } from "@ark-ui/vue/marquee";
import { cn } from "cn";
import { marquee } from "@/registry/shared/lib/marquee.styles";

interface MarqueeItemProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<MarqueeItemProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = marquee();
</script>

<template>
  <Ark.Item :class="cn(styles.item(), props.class)">
    <slot />
  </Ark.Item>
</template>
