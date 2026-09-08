<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Select as Ark } from "@ark-ui/vue/select";
import { cn } from "cn";
import { selectStyles as styles } from "@/registry/shared/lib/select.styles";

interface SelectTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<SelectTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Trigger :class="cn(styles.trigger(), props.class)">
    <slot />
  </Ark.Trigger>
</template>
