<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Popover as Ark } from "@ark-ui/vue/popover";
import { cn } from "cn";
import { popover } from "@/registry/shared/lib/popover.styles";

interface PopoverArrowTipProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<PopoverArrowTipProps>();

const styles = popover();
</script>

<template>
  <Ark.ArrowTip :class="cn(styles.arrowTip(), props.class)" />
</template>
