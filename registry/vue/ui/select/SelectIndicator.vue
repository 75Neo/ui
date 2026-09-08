<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Select as Ark } from "@ark-ui/vue/select";
import { cn } from "cn";
import { select } from "@/registry/shared/lib/select.styles";

interface SelectIndicatorProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<SelectIndicatorProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = select();
</script>

<template>
  <Ark.Indicator :class="cn(styles.indicator(), props.class)">
    <slot />
  </Ark.Indicator>
</template>
