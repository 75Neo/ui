<script setup lang="ts">
import { computed } from "vue";
import { Toc as Ark } from "@ark-ui/vue/toc";
import { cva } from "class-variance-authority";
import {
  cn,
  tableOfContentsDefaults,
  tableOfContentsLinkData,
  tableOfContentsSizeData,
} from "@75neo/themes";
import { useTableOfContentsVariants } from "./variants";

const tableOfContentsLink = cva(
  "block truncate rounded-e-sm py-1 ps-3 text-muted outline-primary/25 transition-colors hover:text-highlighted focus-visible:outline-3",
  {
    variants: {
      color: tableOfContentsLinkData,
      size: tableOfContentsSizeData.link,
    },
    defaultVariants: tableOfContentsDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useTableOfContentsVariants();
const linkClass = computed(() =>
  cn(tableOfContentsLink(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.Link data-slot="table-of-contents-link" :class="linkClass">
    <slot />
  </Ark.Link>
</template>
