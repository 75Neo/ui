<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Progress as Ark } from "@ark-ui/vue/progress";
import { cn } from "cn";
import { progressStyles as styles } from "@/registry/shared/lib/progress.styles";

interface ProgressLabelProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ProgressLabelProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Label :class="cn(styles.label(), props.class)">
    <slot />
  </Ark.Label>
</template>
