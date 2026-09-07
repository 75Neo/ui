<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Tooltip as Ark } from "@ark-ui/vue/tooltip";
import { cn } from "cn";
import { tooltip } from "@/registry/shared/lib/tooltip.styles";

interface TooltipArrowTipProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TooltipArrowTipProps>();

const styles = tooltip();
</script>

<template>
  <Ark.ArrowTip :class="cn(styles.arrowTip(), props.class)" />
</template>
