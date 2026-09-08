<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Marquee as Ark } from "@ark-ui/vue/marquee";
import { cn } from "cn";
import { marquee } from "@/registry/shared/lib/marquee.styles";

interface MarqueeContentProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<MarqueeContentProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = marquee();
</script>

<template>
  <Ark.Content :class="cn(styles.content(), props.class)">
    <slot />
  </Ark.Content>
</template>
