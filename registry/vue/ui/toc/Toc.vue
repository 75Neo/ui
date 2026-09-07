<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Toc as Ark, type TocItemData } from "@ark-ui/vue/toc";
import { cn } from "cn";
import { toc } from "@/registry/shared/lib/toc.styles";

interface TocProps {
  items: TocItemData[];
  defaultActiveIds?: string[];
  rootMargin?: string;
  threshold?: number | number[];
  autoScroll?: boolean;
  scrollBehavior?: ScrollBehavior;
  scrollEl?: () => HTMLElement | null;
  class?: HTMLAttributes["class"];
}

const props = defineProps<TocProps>();

const activeIds = defineModel<string[]>("activeIds");

defineSlots<{
  default?: () => unknown;
}>();

const styles = toc();
</script>

<template>
  <Ark.Root
    v-model:active-ids="activeIds"
    as-child
    :items="props.items"
    :default-active-ids="props.defaultActiveIds"
    :root-margin="props.rootMargin"
    :threshold="props.threshold"
    :auto-scroll="props.autoScroll"
    :scroll-behavior="props.scrollBehavior"
    :scroll-el="props.scrollEl"
  >
    <nav :class="cn(styles.root(), props.class)">
      <slot />
    </nav>
  </Ark.Root>
</template>
