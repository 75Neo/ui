<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Tour as Ark } from "@ark-ui/vue/tour";
import { cn } from "cn";
import { tour } from "@/registry/shared/lib/tour.styles";

interface TourProgressTextProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TourProgressTextProps>();

const styles = tour();
</script>

<template>
  <Ark.ProgressText :class="cn(styles.progressText(), props.class)" />
</template>
