<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Progress as Ark } from "@ark-ui/vue/progress";
import { cn } from "cn";
import { progressStyles as styles } from "@/registry/shared/lib/progress.styles";

interface ProgressRangeProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ProgressRangeProps>();
</script>

<template>
  <Ark.Range :class="cn(styles.range(), props.class)" />
</template>
