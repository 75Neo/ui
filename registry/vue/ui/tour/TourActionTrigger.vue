<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import {
  Tour as Ark,
  type TourActionTriggerProps as ArkActionTriggerProps,
} from "@ark-ui/vue/tour";
import { cn } from "cn";
import { tourStyles as styles } from "@/registry/shared/lib/tour.styles";

interface TourActionTriggerProps {
  action: ArkActionTriggerProps["action"];
  class?: HTMLAttributes["class"];
}

const props = defineProps<TourActionTriggerProps>();
</script>

<template>
  <Ark.ActionTrigger :action="props.action" :class="cn(styles.actionTrigger(), props.class)" />
</template>
