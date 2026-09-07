<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Progress as Ark } from "@ark-ui/vue/progress";
import { cn } from "cn";
import { progress } from "@/registry/shared/lib/progress.styles";

interface ProgressLabelProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ProgressLabelProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = progress();
</script>

<template>
  <Ark.Label :class="cn(styles.label(), props.class)">
    <slot />
  </Ark.Label>
</template>
