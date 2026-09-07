<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Progress as Ark } from "@ark-ui/vue/progress";
import { cn } from "cn";
import { progress } from "@/registry/shared/lib/progress.styles";

interface ProgressRangeProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ProgressRangeProps>();

const styles = progress();
</script>

<template>
  <Ark.Range :class="cn(styles.range(), props.class)" />
</template>
