<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Toc as Ark } from "@ark-ui/vue/toc";
import { cn } from "cn";
import { tocStyles as styles } from "@/registry/shared/lib/toc.styles";

interface TocTitleProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TocTitleProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Title :class="cn(styles.title(), props.class)">
    <slot />
  </Ark.Title>
</template>
