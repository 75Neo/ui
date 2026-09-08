<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Select as Ark } from "@ark-ui/vue/select";
import { cn } from "cn";
import { select } from "@/registry/shared/lib/select.styles";

interface SelectControlProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<SelectControlProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = select();
</script>

<template>
  <Ark.Control :class="cn(styles.control(), props.class)">
    <slot />
  </Ark.Control>
</template>
