<script setup lang="ts">
import { computed } from "vue";
import { Pagination as Ark } from "@ark-ui/vue/pagination";
import { cva } from "class-variance-authority";
import { ChevronLeft } from "@lucide/vue";
import { cn, paginationDefaults, paginationSizeData } from "@75neo/themes";
import { usePaginationVariants } from "./variants";

const paginationPrevTrigger = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md text-dimmed transition-colors outline-none hover:bg-elevated hover:text-highlighted data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50 [&>svg]:size-full",
  {
    variants: { size: paginationSizeData.trigger },
    defaultVariants: paginationDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = usePaginationVariants();
const triggerClass = computed(() =>
  cn(paginationPrevTrigger(variants), props.class as string | undefined),
);
</script>

<template>
  <!-- Ark hands the part the right props for the mode but always renders a button. -->
  <Ark.PrevTrigger as-child>
    <component
      :is="variants.linked ? 'a' : 'button'"
      :type="variants.linked ? undefined : 'button'"
      data-slot="pagination-prev-trigger"
      :class="triggerClass"
    >
      <slot>
        <component :is="ChevronLeft" />
      </slot>
    </component>
  </Ark.PrevTrigger>
</template>
