<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Popover as Ark } from "@ark-ui/vue/popover";
import { cn } from "cn";
import { popover } from "@/registry/shared/lib/popover.styles";

interface PopoverContentProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<PopoverContentProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = popover();
</script>

<template>
  <Ark.Content :class="cn(styles.content(), props.class)">
    <slot />
  </Ark.Content>
</template>
