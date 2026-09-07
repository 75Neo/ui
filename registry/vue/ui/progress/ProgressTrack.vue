<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Progress as Ark } from "@ark-ui/vue/progress";
import { cn } from "cn";
import { progress } from "@/registry/shared/lib/progress.styles";

interface ProgressTrackProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ProgressTrackProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = progress();
</script>

<template>
  <Ark.Track :class="cn(styles.track(), props.class)">
    <slot />
  </Ark.Track>
</template>
