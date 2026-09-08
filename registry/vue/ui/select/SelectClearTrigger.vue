<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Select as Ark } from "@ark-ui/vue/select";
import { cn } from "cn";
import { select } from "@/registry/shared/lib/select.styles";

interface SelectClearTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<SelectClearTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = select();
</script>

<template>
  <Ark.ClearTrigger :class="cn(styles.clearTrigger(), props.class)">
    <slot />
  </Ark.ClearTrigger>
</template>
