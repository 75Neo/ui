<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { HoverCard as Ark } from "@ark-ui/vue/hover-card";
import { cn } from "cn";
import { hoverCard } from "@/registry/shared/lib/hover-card.styles";

interface HoverCardArrowTipProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<HoverCardArrowTipProps>();

const styles = hoverCard();
</script>

<template>
  <Ark.ArrowTip :class="cn(styles.arrowTip(), props.class)" />
</template>
