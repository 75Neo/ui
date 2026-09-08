<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Tour as Ark } from "@ark-ui/vue/tour";
import type { StepActionTriggerProps } from "@ark-ui/vue/tour";
import { cn } from "cn";
import { tour } from "@/registry/shared/lib/tour.styles";

interface TourActionTriggerProps {
  action: StepActionTriggerProps;
  class?: HTMLAttributes["class"];
}

const props = defineProps<TourActionTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = tour();
</script>

<template>
  <Ark.ActionTrigger :action="props.action" :class="cn(styles.actionTrigger(), props.class)">
    <slot />
  </Ark.ActionTrigger>
</template>
