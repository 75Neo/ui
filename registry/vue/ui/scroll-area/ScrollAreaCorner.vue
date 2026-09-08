<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ScrollArea as Ark } from "@ark-ui/vue/scroll-area";
import { cn } from "cn";
import { scrollAreaStyles as styles } from "@/registry/shared/lib/scroll-area.styles";

interface ScrollAreaCornerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ScrollAreaCornerProps>();
</script>

<template>
  <Ark.Corner :class="cn(styles.corner(), props.class)" />
</template>
