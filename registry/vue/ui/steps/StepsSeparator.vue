<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Steps as Ark } from "@ark-ui/vue/steps";
import { cn } from "cn";
import { stepsStyles as styles } from "@/registry/shared/lib/steps.styles";

interface StepsSeparatorProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<StepsSeparatorProps>();
</script>

<template>
  <Ark.Separator :class="cn(styles.separator(), props.class)" />
</template>
