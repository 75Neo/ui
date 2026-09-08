<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Select as Ark } from "@ark-ui/vue/select";
import { cn } from "cn";
import { select } from "@/registry/shared/lib/select.styles";

interface SelectLabelProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<SelectLabelProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = select();
</script>

<template>
  <Ark.Label :class="cn(styles.label(), props.class)">
    <slot />
  </Ark.Label>
</template>
