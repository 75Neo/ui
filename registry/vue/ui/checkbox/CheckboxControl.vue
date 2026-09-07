<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Checkbox as Ark } from "@ark-ui/vue/checkbox";
import { cn } from "cn";
import { checkbox } from "@/registry/shared/lib/checkbox.styles";

interface CheckboxControlProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<CheckboxControlProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = checkbox();
</script>

<template>
  <Ark.Control :class="cn(styles.control(), props.class)">
    <slot />
  </Ark.Control>
</template>
