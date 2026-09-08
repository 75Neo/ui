<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Marquee as Ark } from "@ark-ui/vue/marquee";
import type { MarqueeEdgeProps as ArkEdgeProps } from "@ark-ui/vue/marquee";
import { cn } from "cn";
import { marquee } from "@/registry/shared/lib/marquee.styles";

interface MarqueeEdgeProps {
  side: ArkEdgeProps["side"];
  class?: HTMLAttributes["class"];
}

const props = defineProps<MarqueeEdgeProps>();

const styles = marquee();
</script>

<template>
  <Ark.Edge :side="props.side" :class="cn(styles.edge(), props.class)" />
</template>
