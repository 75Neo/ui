<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Popover as Ark } from "@ark-ui/vue/popover";
import { cn } from "cn";
import { popover } from "@/registry/shared/lib/popover.styles";

interface PopoverDescriptionProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<PopoverDescriptionProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = popover();
</script>

<template>
  <Ark.Description :class="cn(styles.description(), props.class)">
    <slot />
  </Ark.Description>
</template>
