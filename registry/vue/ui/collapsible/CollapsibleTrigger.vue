<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Collapsible as Ark } from "@ark-ui/vue/collapsible";
import { cn } from "cn";
import { collapsible } from "@/registry/shared/lib/collapsible.styles";

interface CollapsibleTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<CollapsibleTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = collapsible();
</script>

<template>
  <Ark.Trigger :class="cn(styles.trigger(), props.class)">
    <slot />
  </Ark.Trigger>
</template>
