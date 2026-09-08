<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Progress as Ark } from "@ark-ui/vue/progress";
import { cn } from "cn";
import { progressStyles as styles } from "@/registry/shared/lib/progress.styles";

interface ProgressValueTextProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ProgressValueTextProps>();
</script>

<template>
  <Ark.ValueText :class="cn(styles.valueText(), props.class)" />
</template>
