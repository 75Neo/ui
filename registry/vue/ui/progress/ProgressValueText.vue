<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Progress as Ark } from "@ark-ui/vue/progress";
import { cn } from "cn";
import { progress } from "@/registry/shared/lib/progress.styles";

interface ProgressValueTextProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ProgressValueTextProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = progress();
</script>

<template>
  <Ark.ValueText :class="cn(styles.valueText(), props.class)">
    <slot />
  </Ark.ValueText>
</template>
