<script setup lang="ts">
import { computed } from "vue";
import { Pagination as Ark } from "@ark-ui/vue/pagination";
import { cva } from "class-variance-authority";
import {
  cn,
  paginationDefaults,
  paginationItemCompoundData,
  paginationSizeData,
  type PaginationItemProps,
} from "@75neo/themes";
import { usePaginationVariants } from "./variants";

const paginationItem = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md font-medium text-toned tabular-nums transition-colors outline-none select-none hover:not-data-selected:bg-elevated hover:not-data-selected:text-highlighted data-selected:text-inverted",
  {
    variants: {
      color: {
        primary: "",
        secondary: "",
        success: "",
        info: "",
        warning: "",
        error: "",
        neutral: "",
      },
      size: paginationSizeData.item,
    },
    compoundVariants: paginationItemCompoundData,
    defaultVariants: paginationDefaults,
  },
);

const props = defineProps<
  PaginationItemProps & {
    class?: unknown;
  }
>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = usePaginationVariants();
const itemClass = computed(() => cn(paginationItem(variants), props.class as string | undefined));
</script>

<template>
  <!-- Ark hands the part the right props for the mode but always renders a button. -->
  <Ark.Item type="page" :value="props.value" as-child>
    <component
      :is="variants.linked ? 'a' : 'button'"
      :type="variants.linked ? undefined : 'button'"
      data-slot="pagination-item"
      :class="itemClass"
    >
      <slot>{{ props.value }}</slot>
    </component>
  </Ark.Item>
</template>
