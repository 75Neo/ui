<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ScrollArea as Ark } from "@ark-ui/vue/scroll-area";
import { cn } from "cn";
import { scrollAreaStyles as styles } from "@/registry/shared/lib/scroll-area.styles";

interface ScrollAreaThumbProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ScrollAreaThumbProps>();
</script>

<template>
  <Ark.Thumb :class="cn(styles.thumb(), props.class)" />
</template>
