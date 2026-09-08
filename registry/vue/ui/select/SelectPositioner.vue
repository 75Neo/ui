<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Select as Ark } from "@ark-ui/vue/select";
import { cn } from "cn";
import { selectStyles as styles } from "@/registry/shared/lib/select.styles";

interface SelectPositionerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<SelectPositionerProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Positioner :class="cn(styles.positioner(), props.class)">
    <slot />
  </Ark.Positioner>
</template>
