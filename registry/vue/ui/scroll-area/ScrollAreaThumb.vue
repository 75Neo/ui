<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ScrollArea as Ark } from "@ark-ui/vue/scroll-area";
import { cn } from "cn";
import { scrollArea } from "@/registry/shared/lib/scroll-area.styles";

interface ScrollAreaThumbProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ScrollAreaThumbProps>();

const styles = scrollArea();
</script>

<template>
  <Ark.Thumb :class="cn(styles.thumb(), props.class)" />
</template>
