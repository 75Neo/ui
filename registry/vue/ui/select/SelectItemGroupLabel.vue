<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Select as Ark } from "@ark-ui/vue/select";
import { cn } from "cn";
import { select } from "@/registry/shared/lib/select.styles";

interface SelectItemGroupLabelProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<SelectItemGroupLabelProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = select();
</script>

<template>
  <Ark.ItemGroupLabel :class="cn(styles.itemGroupLabel(), props.class)">
    <slot />
  </Ark.ItemGroupLabel>
</template>
