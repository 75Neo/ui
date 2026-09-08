<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Tour as Ark } from "@ark-ui/vue/tour";
import { cn } from "cn";
import { tour } from "@/registry/shared/lib/tour.styles";

interface TourDescriptionProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TourDescriptionProps>();

const styles = tour();
</script>

<template>
  <Ark.Description :class="cn(styles.description(), props.class)" />
</template>
