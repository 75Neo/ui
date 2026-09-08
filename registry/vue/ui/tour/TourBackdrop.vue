<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Tour as Ark } from "@ark-ui/vue/tour";
import { cn } from "cn";
import { tour } from "@/registry/shared/lib/tour.styles";

interface TourBackdropProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TourBackdropProps>();

const styles = tour();
</script>

<template>
  <Ark.Backdrop :class="cn(styles.backdrop(), props.class)" />
</template>
