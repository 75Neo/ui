<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ScrollArea as Ark } from "@ark-ui/vue/scroll-area";
import { cn } from "cn";
import { scrollArea } from "@/registry/shared/lib/scroll-area.styles";

interface ScrollAreaCornerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ScrollAreaCornerProps>();

const styles = scrollArea();
</script>

<template>
  <Ark.Corner :class="cn(styles.corner(), props.class)" />
</template>
