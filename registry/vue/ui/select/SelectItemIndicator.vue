<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Select as Ark } from "@ark-ui/vue/select";
import { cn } from "cn";
import { select } from "@/registry/shared/lib/select.styles";

interface SelectItemIndicatorProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<SelectItemIndicatorProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = select();
</script>

<template>
  <Ark.ItemIndicator :class="cn(styles.itemIndicator(), props.class)">
    <slot />
  </Ark.ItemIndicator>
</template>
